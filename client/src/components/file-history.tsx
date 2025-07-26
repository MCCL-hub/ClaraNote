import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileAudio, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FileHistory() {
  const { toast } = useToast();
  
  const { data: files = [], isLoading } = useQuery({
    queryKey: ["/api/files"],
  });

  const handleDownload = (file: any) => {
    if (file.pdfPath) {
      window.open(file.pdfPath, '_blank');
    } else {
      toast({
        title: "PDF non disponible",
        description: "Ce fichier n'a pas encore été exporté en PDF.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Il y a moins d'une heure";
    if (diffInHours < 24) return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  };

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fichiers récents</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fichiers récents</h3>
        <div className="space-y-3">
          {files.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucun fichier récent</p>
          ) : (
            files.slice(0, 3).map((file: any) => (
              <div key={file.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileAudio className="text-primary text-sm" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.originalName}</p>
                  <p className="text-xs text-gray-500">{formatDate(file.createdAt)}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(file)}
                    className="p-1 text-gray-400 hover:text-primary"
                    title="Télécharger"
                  >
                    <Download size={12} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-gray-400 hover:text-destructive"
                    title="Supprimer"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {files.length > 3 && (
          <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary-600 text-sm font-medium">
            Voir tous les fichiers
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
