
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Produk from "./pages/Produk";
import FundaxAdvisor from "./pages/FundaxAdvisor";
import Kalkulator from "./pages/Kalkulator";
import WhyFundax from "./pages/WhyFundax";
import Bisnis from "./pages/Bisnis";
import Berita from "./pages/Berita";
import TentangKami from "./pages/TentangKami";
import Ajukan from "./pages/Ajukan";
import ApplicationTracking from "./pages/ApplicationTracking";
import Karir from "./pages/Karir";
import Referral from "./pages/Referral";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/fundax-advisor" element={<FundaxAdvisor />} />
          <Route path="/kalkulator" element={<Kalkulator />} />
          <Route path="/why-fundax" element={<WhyFundax />} />
          <Route path="/bisnis" element={<Bisnis />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/ajukan" element={<Ajukan />} />
          <Route path="/application-tracking" element={<ApplicationTracking />} />
          <Route path="/karir" element={<Karir />} />
          <Route path="/referral" element={<Referral />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
