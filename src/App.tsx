import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTracker } from "@/components/PageTracker";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";

const About = React.lazy(() => import("./pages/About"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const GetStarted = React.lazy(() => import("./pages/GetStarted"));
const Workshop = React.lazy(() => import("./pages/Workshop"));
const AiOperatorKit = React.lazy(() => import("./pages/AiOperatorKit"));
const Services = React.lazy(() => import("./pages/Services"));
const AIAgents = React.lazy(() => import("./pages/AIAgents"));
const Automations = React.lazy(() => import("./pages/Automations"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Funnel = React.lazy(() => import("./pages/Funnel"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnnouncementBanner />
        <ScrollToTop />
        <PageTracker />
        <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/ai-operator-kit" element={<AiOperatorKit />} />
          <Route path="/services" element={<Services />} />
          <Route path="/websites" element={<Services />} />
          <Route path="/ai-agents" element={<AIAgents />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/funnel" element={<Funnel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
