import { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Projetos from "./pages/Projetos";
import Skills from "./pages/Skills";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const TransitionOverlay = () => {
  const location = useLocation();
  const [overlays, setOverlays] = useState<number[]>([]);
  const prevRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevRef.current) {
      prevRef.current = location.pathname;
      const id = Date.now();
      setOverlays((prev) => [...prev, id]);
      setTimeout(() => {
        setOverlays((prev) => prev.filter((o) => o !== id));
      }, 700);
    }
  }, [location.pathname]);

  return (
    <>
      {overlays.map((id) => (
        <div
          key={id}
          className="fixed inset-0 z-[500] pointer-events-none overflow-hidden"
        >
          <div className="cinematic-sweep" />
          <div className="cinematic-flash" />
        </div>
      ))}
    </>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="relative w-screen min-h-screen">
      <Navbar />
      <TransitionOverlay />
      <div key={location.pathname} className="animate-page-in min-h-screen w-full">
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
