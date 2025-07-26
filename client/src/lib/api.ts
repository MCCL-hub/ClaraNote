import { apiRequest } from "./queryClient";

export interface UploadResponse {
  id: string;
  filename: string;
  originalName: string;
  fileSize: number;
  status: string;
}

export interface TranscriptionResponse {
  id: string;
  transcription: string;
  status: string;
}

export interface SummaryResponse {
  id: string;
  summary: string;
  status: string;
}

export interface ExportResponse {
  downloadUrl: string;
  audioFile: {
    id: string;
    pdfPath: string;
    status: string;
  };
}

export const api = {
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Upload failed");
    }
    
    return response.json();
  },

  transcribeFile: async (fileId: string): Promise<TranscriptionResponse> => {
    const response = await apiRequest("POST", "/api/transcribe", { fileId });
    return response.json();
  },

  generateSummary: async (fileId: string): Promise<SummaryResponse> => {
    const response = await apiRequest("POST", "/api/summary", { fileId });
    return response.json();
  },

  exportPdf: async (fileId: string): Promise<ExportResponse> => {
    const response = await apiRequest("POST", "/api/export-pdf", { fileId });
    return response.json();
  },

  updateTranscription: async (fileId: string, transcription: string) => {
    const response = await apiRequest("PATCH", `/api/files/${fileId}`, { transcription });
    return response.json();
  },
};
