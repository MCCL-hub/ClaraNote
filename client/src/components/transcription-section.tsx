import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface TranscriptionSectionProps {
  fileData: any;
  onTranscriptionComplete: (updatedFile: any) => void;
  onReset: () => void;
}

export function TranscriptionSection({ 
  fileData, 
  onTranscriptionComplete, 
  onReset 
}: TranscriptionSectionProps) {
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (fileData && !fileData.transcription) {
      startTranscription();
    } else if (fileData?.transcription) {
      setTranscription(fileData.transcription);
      setProgress(100);
    }
  }, [fileData]);

  const startTranscription = async () => {
    setIsTranscribing(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 500);

    try {
      const result = await api.transcribeFile(fileData.id);
      setTranscription(result.transcription);
      setProgress(100);
      
      toast({
        title: "Transcription terminée",
        description: "Vous pouvez maintenant éditer le texte avant de générer le résumé.",
      });
      
      onTranscriptionComplete(result);
    } catch (error) {
      toast({
        title: "Erreur de transcription",
        description: error instanceof Error ? error.message : "Échec de la transcription.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsTranscribing(false);
    }
  };

  const handleGenerateSummary = async () => {
    try {
      // Update transcription if it was edited
      if (transcription !== fileData.transcription) {
        await api.updateTranscription(fileData.id, transcription);
      }
      
      const result = await api.generateSummary(fileData.id);
      onTranscriptionComplete(result);
    } catch (error) {
      toast({
        title: "Erreur de résumé",
        description: error instanceof Error ? error.message : "Échec de la génération du résumé.",
        variant: "destructive",
      });
    }
  };

  const getStatusText = () => {
    if (isTranscribing) return "En cours...";
    if (progress === 100) return "Terminé";
    return "En attente...";
  };

  const getStatusColor = () => {
    if (isTranscribing) return "text-warning-500";
    if (progress === 100) return "text-success-500";
    return "text-gray-500";
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Transcription</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isTranscribing ? 'bg-warning-500 animate-pulse' : progress === 100 ? 'bg-success-500' : 'bg-gray-400'}`} />
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="border border-gray-200 rounded-lg p-4 min-h-[300px] bg-gray-50">
          <Textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            placeholder="La transcription apparaîtra ici..."
            className="w-full h-full min-h-[280px] resize-none border-none bg-transparent text-gray-700 leading-relaxed focus-visible:ring-0"
            disabled={isTranscribing}
          />
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="ghost" onClick={onReset} className="text-gray-600 hover:text-gray-800">
            <RotateCcw className="mr-2" size={16} />
            Recommencer
          </Button>
          <Button 
            onClick={handleGenerateSummary}
            disabled={isTranscribing || !transcription.trim()}
            className="bg-secondary hover:bg-secondary-600"
          >
            <Wand2 className="mr-2" size={16} />
            Générer le résumé
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
