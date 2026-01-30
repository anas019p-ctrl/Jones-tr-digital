import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalBackground from "./components/GlobalBackground";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPackages from "./pages/AdminPackages";
import AdminPrices from "./pages/AdminPrices";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminErrors from "./pages/AdminErrors";
import AdminSettings from "./pages/AdminSettings";
import AdminBlog from "./pages/AdminBlog";
import AdminServices from "./pages/AdminServices";
import AdminContacts from "./pages/AdminContacts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatAssistant from "./components/ChatAssistant";

import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <GlobalBackground />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/come-funziona" element={<HowItWorks />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/testimonianze" element={<Testimonials />} />
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/packages" element={<AdminPackages />} />
                <Route path="/admin/prices" element={<AdminPrices />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/customers" element={<AdminCustomers />} />
                <Route path="/admin/errors" element={<AdminErrors />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/contacts" element={<AdminContacts />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ChatAssistant />
          <SpeedInsights />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
