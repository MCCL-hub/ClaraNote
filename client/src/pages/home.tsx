import { useState } from "react";
import { Header } from "@/components/header";
import { ProcessStepper } from "@/components/process-stepper";
import { FileUpload } from "@/components/file-upload";
import { TranscriptionSection } from "@/components/transcription-section";
import { SummarySection } from "@/components/summary-section";
import { ExportSection } from "@/components/export-section";
import { FileHistory } from "@/components/file-history";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [fileData, setFileData] = useState<any>(null);
  const [exportData, setExportData] = useState<any>(null);

  const handleFileUploaded = (uploadedFile: any) => {
    setFileData(uploadedFile);
    setCurrentStep(2);
  };

  const handleTranscriptionComplete = (updatedFile: any) => {
    setFileData(updatedFile);
    if (updatedFile.summary) {
      setCurrentStep(3);
    }
  };

  const handleExportReady = (exportResult: any) => {
    setExportData(exportResult);
    setCurrentStep(4);
  };

  const handleStartNew = () => {
    setCurrentStep(1);
    setFileData(null);
    setExportData(null);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFileData(null);
    setExportData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProcessStepper currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Workspace */}
          <div className="lg:col-span-8">
            {currentStep === 1 && (
              <FileUpload onFileUploaded={handleFileUploaded} />
            )}

            {currentStep === 2 && fileData && (
              <TranscriptionSection
                fileData={fileData}
                onTranscriptionComplete={handleTranscriptionComplete}
                onReset={handleReset}
              />
            )}

            {currentStep === 3 && fileData && (
              <SummarySection
                fileData={fileData}
                onExportReady={handleExportReady}
              />
            )}

            {currentStep === 4 && exportData && (
              <ExportSection
                exportData={exportData}
                onStartNew={handleStartNew}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <FileHistory />

            {/* Help & Tips */}
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Lightbulb className="mr-2" size={20} />
                  Conseils d'utilisation
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Assurez-vous que l'audio est clair et sans trop de bruit de fond</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Les fichiers de moins de 10MB sont traités plus rapidement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Vous pouvez éditer la transcription avant de générer le résumé</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Le résumé structuré peut être personnalisé selon vos besoins</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
