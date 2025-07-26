import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choisissez votre forfait
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Des solutions adaptées à tous vos besoins, de l'essai gratuit aux équipes professionnelles
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Free Plan */}
        <Card className="relative">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratuit</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">0€</span>
                <span className="text-gray-600">/mois</span>
              </div>
              <p className="text-gray-600 mb-6">
                Parfait pour découvrir ClaraNote
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>3 réunions par mois</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>20 minutes max par réunion</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Transcription automatique</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Résumé structuré basique</span>
              </li>
            </ul>

            <Link to="/app" className="block">
              <Button variant="outline" className="w-full">
                Commencer gratuitement
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border-2 border-blue-600 shadow-lg">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <Star className="mr-1" size={14} />
              Populaire
            </div>
          </div>
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">29€</span>
                <span className="text-gray-600">/mois</span>
              </div>
              <p className="text-gray-600 mb-6">
                Idéal pour les professionnels actifs
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Réunions illimitées</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Durée illimitée</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Export PDF professionnel</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Édition des transcriptions</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Support prioritaire</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Historique des réunions</span>
              </li>
            </ul>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              S'abonner maintenant
            </Button>
          </CardContent>
        </Card>

        {/* Business Plan */}
        <Card className="relative">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">79€</span>
                <span className="text-gray-600">/mois</span>
              </div>
              <p className="text-gray-600 mb-6">
                Pour les équipes et entreprises
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Tout du forfait Pro</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Multi-utilisateur (jusqu'à 10)</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Intégrations (Notion, Drive)</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>API personnalisée</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Formation équipe incluse</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={16} />
                <span>Support dédié</span>
              </li>
            </ul>

            <Button variant="outline" className="w-full">
              Nous contacter
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          Questions fréquentes
        </h3>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Puis-je changer de forfait à tout moment ?
              </h4>
              <p className="text-gray-600">
                Oui, vous pouvez passer à un forfait supérieur ou inférieur à tout moment. 
                Les changements prennent effet immédiatement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Mes données sont-elles sécurisées ?
              </h4>
              <p className="text-gray-600">
                Absolument. Toutes vos données sont chiffrées et stockées de manière sécurisée. 
                Nous respectons le RGPD européen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Quels formats audio sont supportés ?
              </h4>
              <p className="text-gray-600">
                Nous supportons les formats MP3, WAV, M4A et AAC. 
                La taille maximale est de 100MB par fichier.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Y a-t-il une période d'essai ?
              </h4>
              <p className="text-gray-600">
                Le forfait gratuit vous permet de tester ClaraNote sans engagement. 
                Les forfaits payants offrent 14 jours d'essai gratuit.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12">
        <h3 className="text-3xl font-bold mb-4">
          Prêt à transformer vos réunions ?
        </h3>
        <p className="text-xl mb-8 opacity-90">
          Commencez dès maintenant avec notre forfait gratuit
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/app">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Essayer gratuitement
            </Button>
          </Link>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
            Parler à un expert
          </Button>
        </div>
      </div>
    </div>
  );
}