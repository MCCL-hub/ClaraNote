import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CloudUpload, FileAudio, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface FileUploadProps {
  onFileUploaded: (fileData: any) => void;
}

export function FileUpload({ onFileUploaded }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((file: File) => {
    const allowedTypes = ["audio/mp3", "audio/wav", "audio/x-m4a", "audio/mp4"];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!allowedTypes.some(type => file.type === type || file.name.toLowerCase().endsWith(type.split('/')[1]))) {
      toast({
        title: "Type de fichier non supporté",
        description: "Veuillez sélectionner un fichier MP3, WAV ou M4A.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximale autorisée est de 100MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const result = await api.uploadFile(selectedFile);
      toast({
        title: "Fichier envoyé avec succès",
        description: "La transcription va commencer automatiquement.",
      });
      onFileUploaded(result);
    } catch (error) {
      toast({
        title: "Erreur lors de l'upload",
        description: error instanceof Error ? error.message : "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Importer un fichier audio</h2>
        
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-primary-50 transition-all duration-200 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center">
              <CloudUpload className="text-primary text-2xl" size={32} />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Glissez votre fichier audio ici</p>
              <p className="text-sm text-gray-500">ou cliquez pour sélectionner</p>
            </div>
            <p className="text-xs text-gray-400">Formats supportés: MP3, WAV, M4A (max 100MB)</p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".mp3,.wav,.m4a"
          onChange={handleInputChange}
        />

        {selectedFile && (
          <div className="mt-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileAudio className="text-primary" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile} className="text-destructive hover:bg-destructive/10">
                <X size={16} />
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isUploading}
            className="bg-primary hover:bg-primary-600"
          >
            <Upload className="mr-2" size={16} />
            {isUploading ? "Envoi en cours..." : "Commencer la transcription"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
