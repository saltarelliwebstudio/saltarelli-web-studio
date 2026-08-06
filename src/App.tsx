import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTracker } from "@/components/PageTracker";
import { StickyBookButton } from "@/components/StickyBookButton";
// import { AnnouncementBanner } from "@/components/AnnouncementBanner"; // temporarily hidden
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";

const About = React.lazy(() => import("./pages/About"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const GetStarted = React.lazy(() => import("./pages/GetStarted"));
const Workshop = React.lazy(() => import("./pages/Workshop"));
const AiOperatorKit = React.lazy(() => import("./pages/AiOperatorKit"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const WebDesignPortColborne = React.lazy(() => import("./pages/WebDesignPortColborne"));
const WebDesignWelland = React.lazy(() => import("./pages/WebDesignWelland"));
const WebDesignStCatharines = React.lazy(() => import("./pages/WebDesignStCatharines"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Temporarily hidden — monthly Live Q&A banner. Restore by uncommenting. */}
        {/* <AnnouncementBanner /> */}
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

          {/* Niagara city landing pages. Also listed in scripts/routes.mjs,
              which drives both prerendering and sitemap.xml. */}
          <Route path="/web-design-port-colborne" element={<WebDesignPortColborne />} />
          <Route path="/web-design-welland" element={<WebDesignWelland />} />
          <Route path="/web-design-st-catharines" element={<WebDesignStCatharines />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <StickyBookButton />
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
