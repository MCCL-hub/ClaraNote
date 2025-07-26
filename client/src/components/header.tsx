import { Mic } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Mic className="text-white text-sm" size={16} />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">ClaraNote</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Accueil
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Historique
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Paramètres
            </a>
          </nav>
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
