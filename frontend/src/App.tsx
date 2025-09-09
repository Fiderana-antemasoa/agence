import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgencyDashboard from "./pages/agency/AgencyDashboard";
import ClientsList from "./pages/agency/ClientsList";
import ClientProfile from "./pages/agency/ClientProfile";
import AgencyOffers from "./pages/agency/AgencyOffers";
import AgencySettings from "./pages/agency/AgencySettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agency" element={<AgencyDashboard />} />
          <Route path="/agency/clients" element={<ClientsList />} />
          <Route path="/agency/clients/:id" element={<ClientProfile />} />
          <Route path="/agency/offers" element={<AgencyOffers />} />
          <Route path="/agency/settings" element={<AgencySettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
