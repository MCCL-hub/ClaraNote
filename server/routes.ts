import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { insertAudioFileSchema, updateAudioFileSchema } from "@shared/schema";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.mp3', '.wav', '.m4a'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP3, WAV, and M4A files are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // File upload endpoint
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const audioFile = await storage.createAudioFile({
        filename: req.file.filename,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        filePath: req.file.path,
        status: "uploaded",
      });

      res.json(audioFile);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Transcription endpoint
  app.post("/api/transcribe", async (req, res) => {
    try {
      const { fileId } = req.body;
      
      if (!fileId) {
        return res.status(400).json({ error: "File ID is required" });
      }

      const audioFile = await storage.getAudioFile(fileId);
      if (!audioFile) {
        return res.status(404).json({ error: "File not found" });
      }

      // Update status to transcribing
      await storage.updateAudioFile(fileId, { status: "transcribing" });

      // Call external transcription service (Whisper)
      const transcriptionResponse = await fetch("http://localhost:8000/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: audioFile.filePath }),
      });

      if (!transcriptionResponse.ok) {
        throw new Error("Transcription service failed");
      }

      const { transcription } = await transcriptionResponse.json();

      // Update file with transcription
      const updatedFile = await storage.updateAudioFile(fileId, {
        transcription,
        status: "transcribed",
      });

      res.json(updatedFile);
    } catch (error) {
      console.error("Transcription error:", error);
      res.status(500).json({ error: "Failed to transcribe audio" });
    }
  });

  // Summary generation endpoint
  app.post("/api/summary", async (req, res) => {
    try {
      const { fileId } = req.body;
      
      if (!fileId) {
        return res.status(400).json({ error: "File ID is required" });
      }

      const audioFile = await storage.getAudioFile(fileId);
      if (!audioFile || !audioFile.transcription) {
        return res.status(400).json({ error: "File not found or not transcribed" });
      }

      // Call external summary service
      const summaryResponse = await fetch("http://localhost:8000/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: audioFile.transcription }),
      });

      if (!summaryResponse.ok) {
        throw new Error("Summary service failed");
      }

      const { summary } = await summaryResponse.json();

      // Update file with summary
      const updatedFile = await storage.updateAudioFile(fileId, {
        summary,
        status: "summarized",
      });

      res.json(updatedFile);
    } catch (error) {
      console.error("Summary error:", error);
      res.status(500).json({ error: "Failed to generate summary" });
    }
  });

  // PDF export endpoint
  app.post("/api/export-pdf", async (req, res) => {
    try {
      const { fileId } = req.body;
      
      if (!fileId) {
        return res.status(400).json({ error: "File ID is required" });
      }

      const audioFile = await storage.getAudioFile(fileId);
      if (!audioFile || !audioFile.summary) {
        return res.status(400).json({ error: "File not found or no summary available" });
      }

      // Call external PDF generation service
      const pdfResponse = await fetch("http://localhost:8000/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: audioFile.summary }),
      });

      if (!pdfResponse.ok) {
        throw new Error("PDF generation failed");
      }

      const { file_url } = await pdfResponse.json();

      // Update file with PDF path
      const updatedFile = await storage.updateAudioFile(fileId, {
        pdfPath: file_url,
        status: "exported",
      });

      res.json({ downloadUrl: file_url, audioFile: updatedFile });
    } catch (error) {
      console.error("PDF export error:", error);
      res.status(500).json({ error: "Failed to export PDF" });
    }
  });

  // Get all files endpoint
  app.get("/api/files", async (req, res) => {
    try {
      const files = await storage.getAllAudioFiles();
      res.json(files);
    } catch (error) {
      console.error("Get files error:", error);
      res.status(500).json({ error: "Failed to get files" });
    }
  });

  // Get single file endpoint
  app.get("/api/files/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const file = await storage.getAudioFile(id);
      
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      res.json(file);
    } catch (error) {
      console.error("Get file error:", error);
      res.status(500).json({ error: "Failed to get file" });
    }
  });

  // Delete file endpoint
  app.delete("/api/files/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const file = await storage.getAudioFile(id);
      
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      // Delete physical file
      try {
        await fs.unlink(file.filePath);
      } catch (error) {
        console.warn("Failed to delete physical file:", error);
      }

      // Delete from storage
      const deleted = await storage.deleteAudioFile(id);
      
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "File not found" });
      }
    } catch (error) {
      console.error("Delete file error:", error);
      res.status(500).json({ error: "Failed to delete file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
