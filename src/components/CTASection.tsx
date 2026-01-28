import { forwardRef, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";
import ChatAssistant from "./ChatAssistant";

const CTASection = forwardRef<HTMLElement>((_, ref) => {
  const chatRef = useRef<{ open: () => void }>(null);

  const handleOpenChat = () => {
    chatRef.current?.open();
  };

  return (
    <>
      <section ref={ref} id="contatti" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/20 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - CTA Text */}
            <div className="lg:sticky lg:top-32">
              <div className="glass-card p-8 md:p-12">
                {/* Glow Effect */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
                
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 relative">
                  Pronto a Portare il Tuo Business
                  <br />
                  <span className="gradient-text">al Livello Successivo?</span>
                </h2>
                
                <p className="text-muted-foreground text-lg mb-8">
                  Contattaci oggi per una consulenza gratuita. Analizzeremo insieme le tue esigenze 
                  e ti proporremo la soluzione perfetta per il tuo progetto.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button variant="outline" size="lg" className="group" onClick={handleOpenChat}>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chatta con l'Assistente AI
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Risposta garantita entro 24 ore • Nessun impegno
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="glass-card p-8 md:p-12">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Richiedi Preventivo Gratuito
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <ChatAssistant ref={chatRef} />
    </>
  );
});

CTASection.displayName = "CTASection";

export default CTASection;
