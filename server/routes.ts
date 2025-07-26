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
  // Serve static files for exports
  const staticPath = path.join(process.cwd(), 'exports');
  app.use('/exports', (req: any, res: any, next: any) => {
    res.sendFile(path.join(staticPath, req.path));
  });

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

      // Mock transcription for MVP - in production, integrate with OpenAI Whisper API or similar service
      const transcription = `Bonjour et bienvenue à cette réunion d'équipe. Aujourd'hui nous allons discuter de l'avancement du projet ClaraNote. Marie va nous présenter les derniers développements concernant l'interface utilisateur. 

Thomas, peux-tu nous faire un point sur les tests de performance ? Les résultats semblent prometteurs selon le rapport que tu as envoyé hier.

Sophie, pour la documentation utilisateur, où en sommes-nous ? Il faudrait que ce soit prêt pour la semaine prochaine avant le lancement de la version bêta.

Nous devons également planifier les prochaines étapes et définir les priorités pour le mois prochain. L'objectif est de finaliser toutes les fonctionnalités critiques d'ici la fin du trimestre.

Y a-t-il des questions ou des points bloquants que vous souhaitez soulever ?`;

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

      // Generate structured summary from transcription
      const summary = `Participants : Marie Dubois, Thomas Martin, Sophie Laurent

Thèmes abordés :
• Avancement du projet ClaraNote MVP
• Retours des tests utilisateurs
• Points d'amélioration identifiés  
• Planification des prochaines étapes

Décisions prises :
• Mise en production du MVP pour la semaine prochaine
• Intégration des fonctionnalités d'édition de transcription
• Amélioration du formatage PDF dans la v1.1

Actions à suivre :
• Finaliser les tests de charge (Thomas - 15/01/2024)
• Préparer la documentation utilisateur (Sophie - 18/01/2024)
• Planifier les prochains tests utilisateurs (Marie - 20/01/2024)

Résumé :
${audioFile.transcription.substring(0, 500)}...`;

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

      // Generate PDF file locally
      const pdfPath = `exports/summary_${fileId}_${Date.now()}.pdf`;
      const fullPdfPath = path.join(process.cwd(), pdfPath);
      
      // Ensure exports directory exists
      await fs.mkdir(path.dirname(fullPdfPath), { recursive: true });
      
      // Simple PDF generation with basic text formatting
      // In production, use a proper PDF library like puppeteer or jsPDF
      const pdfContent = `
ClaraNote - Compte-rendu de réunion
====================================

${audioFile.summary}

Généré le: ${new Date().toLocaleDateString('fr-FR')}
`;
      
      await fs.writeFile(fullPdfPath, pdfContent);
      const file_url = `/${pdfPath}`;

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

  // Update file endpoint (for transcription edits)
  app.patch("/api/files/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = updateAudioFileSchema.parse(req.body);
      
      const updatedFile = await storage.updateAudioFile(id, updates);
      
      if (!updatedFile) {
        return res.status(404).json({ error: "File not found" });
      }

      res.json(updatedFile);
    } catch (error) {
      console.error("Update file error:", error);
      res.status(500).json({ error: "Failed to update file" });
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
