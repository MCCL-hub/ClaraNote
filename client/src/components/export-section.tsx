import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Plus } from "lucide-react";

interface ExportSectionProps {
  exportData: any;
  onStartNew: () => void;
}

export function ExportSection({ exportData, onStartNew }: ExportSectionProps) {
  const handleDownload = () => {
    if (exportData?.downloadUrl) {
      window.open(exportData.downloadUrl, '_blank');
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-success-500 text-2xl" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Export terminé !</h3>
          <p className="text-gray-600 mb-6">Votre compte-rendu de réunion a été généré avec succès.</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={handleDownload}
              className="bg-primary hover:bg-primary-600 text-white"
            >
              <Download className="mr-2" size={16} />
              Télécharger le PDF
            </Button>
            <Button 
              onClick={onStartNew}
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Plus className="mr-2" size={16} />
              Nouvelle transcription
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
