import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import Claranote from "./pages/Claranote";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <div className="min-h-screen bg-gray-50 text-gray-800">
            <nav className="flex justify-between items-center p-4 shadow bg-white">
              <h1 className="text-xl font-bold">ClaraNote</h1>
              <div className="space-x-4">
                <Link to="/" className="hover:underline">Accueil</Link>
                <Link to="/app" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Tester</Link>
              </div>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app" element={<Claranote />} />
            </Routes>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
