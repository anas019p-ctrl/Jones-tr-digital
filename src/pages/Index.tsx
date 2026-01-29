import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import AdditionalServicesSection from "@/components/AdditionalServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import QRCodeSection from "@/components/QRCodeSection";
import ContactForm from "@/components/ContactForm";
import GDPRBanner from "@/components/GDPRBanner";

const Index = () => {
  return (
    <div className="relative">
      <ParticleBackground />
      <HeroSection />

      {/* About & Why Us are combined in AboutSection */}
      <AboutSection />

      {/* Services/Pricing - Standardizing on PricingSection which is the dark version */}
      <PricingSection />

      <AdditionalServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <QRCodeSection />

      <section id="contatti" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 blur-3xl rounded-full -z-10 transform translate-y-1/2 scale-150" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Inizia la Tua <span className="gradient-text">Trasformazione</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Compila il modulo qui sotto per richiedere un consulto gratuito.
              Rispondiamo solitamente entro 2 ore lavorative.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <GDPRBanner />
    </div>
  );
};

export default Index;
