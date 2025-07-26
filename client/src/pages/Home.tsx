import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, FileAudio, FileText, Download, Users, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Mic className="text-white" size={32} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ClaraNote
        </h1>
        <h2 className="text-2xl text-gray-600 mb-6">
          Générateur de compte-rendu de réunion par IA
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Transformez vos enregistrements audio en comptes-rendus structurés et professionnels 
          en quelques clics. Intelligence artificielle, transcription automatique et export PDF.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/app">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Essayer gratuitement
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Voir les forfaits
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
          Comment ça marche ?
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileAudio className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Upload</h4>
              <p className="text-gray-600 text-sm">
                Importez votre fichier audio (MP3, WAV, M4A)
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Transcription</h4>
              <p className="text-gray-600 text-sm">
                L'IA transcrit automatiquement en français
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-purple-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Résumé</h4>
              <p className="text-gray-600 text-sm">
                Génération d'un résumé structuré avec participants et actions
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-orange-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Export</h4>
              <p className="text-gray-600 text-sm">
                Téléchargez votre compte-rendu au format PDF
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
          Pourquoi choisir ClaraNote ?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Rapide et efficace</h4>
              <p className="text-gray-600">
                Générez vos comptes-rendus en moins de 5 minutes, 
                contre plusieurs heures de rédaction manuelle.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Format professionnel</h4>
              <p className="text-gray-600">
                Résumés structurés avec participants, décisions prises 
                et actions à suivre clairement identifiées.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-purple-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sécurisé et privé</h4>
              <p className="text-gray-600">
                Vos données sont traitées de manière sécurisée 
                et ne sont pas conservées après traitement.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12">
        <h3 className="text-3xl font-bold mb-4">
          Prêt à transformer vos réunions ?
        </h3>
        <p className="text-xl mb-8 opacity-90">
          Essayez ClaraNote gratuitement et découvrez la puissance de l'IA 
          pour vos comptes-rendus de réunion.
        </p>
        <Link to="/app">
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Commencer maintenant
          </Button>
        </Link>
      </section>
    </div>
  );
}