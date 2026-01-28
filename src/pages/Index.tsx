import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import AdditionalServicesSection from "@/components/AdditionalServicesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QRCodeSection from "@/components/QRCodeSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import GDPRBanner from "@/components/GDPRBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AdditionalServicesSection />
        <PricingSection />
        <TestimonialsSection />
        <QRCodeSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <GDPRBanner />
    </div>
  );
};

export default Index;
