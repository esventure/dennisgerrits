import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import MovedBanner from "@/components/MovedBanner";
import ScrollToTop from "@/components/ScrollToTop";

const Layout = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Sonner />
        <MovedBanner />
        <Header />
        <Outlet />
        <Footer />
        <FloatingCTA />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Layout;
