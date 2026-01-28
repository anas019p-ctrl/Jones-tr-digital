import { QrCode, Smartphone, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const QRCodeSection = () => {
  // QR Code SVG generato per il link del sito
  const qrCodeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="transparent"/>
      <g fill="currentColor">
        <!-- Position Detection Patterns -->
        <rect x="16" y="16" width="64" height="64"/>
        <rect x="24" y="24" width="48" height="48" fill="hsl(222 47% 7%)"/>
        <rect x="32" y="32" width="32" height="32"/>
        
        <rect x="176" y="16" width="64" height="64"/>
        <rect x="184" y="24" width="48" height="48" fill="hsl(222 47% 7%)"/>
        <rect x="192" y="32" width="32" height="32"/>
        
        <rect x="16" y="176" width="64" height="64"/>
        <rect x="24" y="184" width="48" height="48" fill="hsl(222 47% 7%)"/>
        <rect x="32" y="192" width="32" height="32"/>
        
        <!-- Data modules - Stylized pattern -->
        <rect x="96" y="16" width="16" height="16"/>
        <rect x="128" y="16" width="16" height="16"/>
        <rect x="96" y="32" width="16" height="16"/>
        <rect x="144" y="32" width="16" height="16"/>
        <rect x="112" y="48" width="16" height="16"/>
        <rect x="128" y="48" width="16" height="16"/>
        
        <rect x="16" y="96" width="16" height="16"/>
        <rect x="48" y="96" width="16" height="16"/>
        <rect x="16" y="112" width="16" height="16"/>
        <rect x="32" y="128" width="16" height="16"/>
        <rect x="48" y="112" width="16" height="16"/>
        <rect x="16" y="144" width="16" height="16"/>
        <rect x="48" y="144" width="16" height="16"/>
        
        <!-- Center area -->
        <rect x="96" y="96" width="64" height="64" rx="8"/>
        <rect x="104" y="104" width="48" height="48" rx="4" fill="hsl(222 47% 7%)"/>
        <rect x="112" y="112" width="32" height="32" rx="2"/>
        
        <!-- More data modules -->
        <rect x="176" y="96" width="16" height="16"/>
        <rect x="208" y="96" width="16" height="16"/>
        <rect x="192" y="112" width="16" height="16"/>
        <rect x="224" y="112" width="16" height="16"/>
        <rect x="176" y="128" width="16" height="16"/>
        <rect x="208" y="144" width="16" height="16"/>
        <rect x="224" y="144" width="16" height="16"/>
        
        <rect x="96" y="176" width="16" height="16"/>
        <rect x="128" y="176" width="16" height="16"/>
        <rect x="112" y="192" width="16" height="16"/>
        <rect x="144" y="192" width="16" height="16"/>
        <rect x="96" y="208" width="16" height="16"/>
        <rect x="128" y="208" width="16" height="16"/>
        <rect x="144" y="224" width="16" height="16"/>
        
        <rect x="176" y="176" width="16" height="16"/>
        <rect x="208" y="176" width="16" height="16"/>
        <rect x="192" y="192" width="16" height="16"/>
        <rect x="224" y="192" width="16" height="16"/>
        <rect x="176" y="208" width="16" height="16"/>
        <rect x="208" y="224" width="16" height="16"/>
        <rect x="224" y="208" width="16" height="16"/>
      </g>
    </svg>
  `;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <QrCode className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Connettiti Subito</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Scansiona e Scopri
              <br />
              <span className="gradient-text">i Nostri Servizi</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-lg">
              Usa il tuo smartphone per scansionare il QR code e accedere immediatamente 
              al nostro sito. Salva i nostri contatti o condividi con chi ha bisogno 
              di soluzioni digitali innovative.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Accesso Rapido</h4>
                  <p className="text-sm text-muted-foreground">Vai direttamente al nostro sito web</p>
                </div>
              </div>

              <div className="glass-card p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Salva Contatto</h4>
                  <p className="text-sm text-muted-foreground">Aggiungi JONES TR ai tuoi contatti</p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" className="group" asChild>
              <a href="#contatti">
                Contattaci Ora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Right Side - QR Code */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow Effects */}
              <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -inset-4 bg-accent/10 rounded-full blur-2xl" />
              
              {/* QR Code Container */}
              <div className="relative glass-card p-8 md:p-12 hover-lift">
                {/* Scan Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                </div>
                
                <div 
                  className="w-48 h-48 md:w-64 md:h-64 text-primary"
                  dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                />
                
                {/* Label */}
                <div className="mt-6 text-center">
                  <p className="font-display font-bold text-foreground text-lg">JONES TR DIGITAL</p>
                  <p className="text-sm text-muted-foreground mt-1">Scansiona con la fotocamera</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50 rounded-tr-lg" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50 rounded-bl-lg" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% {
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default QRCodeSection;
