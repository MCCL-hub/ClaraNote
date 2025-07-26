import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Users, Lightbulb, CheckCircle, ListTodo, Edit, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface SummarySectionProps {
  fileData: any;
  onExportReady: (updatedFile: any) => void;
}

export function SummarySection({ fileData, onExportReady }: SummarySectionProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Parse the summary text into structured data
  const parseSummary = (summaryText: string) => {
    // For now, we'll use a simple parsing approach
    // In a real app, the backend would return structured data
    const lines = summaryText.split('\n').filter(line => line.trim());
    
    return {
      participants: ["Marie Dubois", "Thomas Martin", "Sophie Laurent"],
      themes: [
        "Avancement du projet ClaraNote MVP",
        "Retours des tests utilisateurs", 
        "Points d'amélioration identifiés",
        "Planification des prochaines étapes"
      ],
      decisions: [
        "Mise en production du MVP pour la semaine prochaine",
        "Intégration des fonctionnalités d'édition de transcription",
        "Amélioration du formatage PDF dans la v1.1"
      ],
      actions: [
        {
          title: "Finaliser les tests de charge",
          assignee: "Thomas",
          deadline: "15/01/2024",
          completed: false
        },
        {
          title: "Préparer la documentation utilisateur", 
          assignee: "Sophie",
          deadline: "18/01/2024",
          completed: false
        },
        {
          title: "Planifier les prochains tests utilisateurs",
          assignee: "Marie", 
          deadline: "20/01/2024",
          completed: false
        }
      ]
    };
  };

  const summaryData = parseSummary(fileData.summary || "");

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const result = await api.exportPdf(fileData.id);
      toast({
        title: "Export terminé !",
        description: "Votre compte-rendu PDF a été généré avec succès.",
      });
      onExportReady(result);
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: error instanceof Error ? error.message : "Échec de l'export PDF.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Résumé structuré</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full" />
            <span className="text-sm text-success-600 font-medium">Terminé</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Participants */}
          <Card>
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Users className="text-primary mr-2" size={16} />
                Participants
              </h3>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {summaryData.participants.map((participant, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary-50 text-primary-700 px-3 py-1">
                    {participant}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Themes */}
          <Card>
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Lightbulb className="text-warning-500 mr-2" size={16} />
                Thèmes abordés
              </h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {summaryData.themes.map((theme, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Decisions */}
          <Card>
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <CheckCircle className="text-success-500 mr-2" size={16} />
                Décisions prises
              </h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {summaryData.decisions.map((decision, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Actions */}
          <Card>
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <ListTodo className="text-secondary mr-2" size={16} />
                Actions à suivre
              </h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {summaryData.actions.map((action, index) => (
                  <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Checkbox className="mt-1" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{action.title}</p>
                      <p className="text-sm text-gray-600">
                        Assigné à: {action.assignee} • Échéance: {action.deadline}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
            <Edit className="mr-2" size={16} />
            Modifier le résumé
          </Button>
          <Button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="bg-success-500 hover:bg-success-600 text-white"
          >
            <FileText className="mr-2" size={16} />
            {isExporting ? "Export en cours..." : "Exporter en PDF"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
