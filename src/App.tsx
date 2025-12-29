import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BinaryBackground from "./components/BinaryBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import IceBear from "./components/IceBear";
import Index from "./pages/Index";
import About from "./pages/About";
import Sponsors from "./pages/Sponsors";
import IIITs from "./pages/IIITs";
import IIITProfile from "./pages/IIITProfile";
import LeaderboardRound2 from "./pages/LeaderboardRound2";
import LeaderboardRound3 from "./pages/LeaderboardRound3";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col relative">
          <BinaryBackground />
          
          <Navbar />
          <main className="flex-1 relative z-10">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/iiits" element={<IIITs />} />
                <Route path="/iiits/:id" element={<IIITProfile />} />
                <Route path="/leaderboard/round-2" element={<LeaderboardRound2 />} />
                <Route path="/leaderboard/round-3" element={<LeaderboardRound3 />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <IceBear />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
