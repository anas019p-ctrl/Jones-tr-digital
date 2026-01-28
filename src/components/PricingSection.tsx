import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Start",
    icon: Zap,
    price: "590",
    description: "La vetrina essenziale per professionisti",
    features: [
      "Sito Landing Page (1 pagina)",
      "Design Futuristico Responsive",
      "Form Contatti Base",
      "SEO Base",
      "Hosting 1 anno incluso",
      "Certificato SSL Sicuro",
    ],
    popular: false,
    cta: "Inizia Ora",
  },
  {
    name: "Standard",
    icon: Sparkles,
    price: "1.290",
    description: "Sito completo per piccole attività",
    features: [
      "Sito Multi-pagina (fino a 5)",
      "Integrazione AI Base",
      "Dashboard Gestione Contatti",
      "Google Business Setup",
      "Assistenza Standard",
      "Training sull'uso",
    ],
    popular: false,
    cta: "Scegli Standard",
  },
  {
    name: "Pro",
    icon: Crown,
    price: "2.890",
    description: "Il top per aziende in crescita",
    features: [
      "Sito Premium Illimitato",
      "Assistente AI 24/7 Avanzato",
      "Automazioni Workflows",
      "SEO Avanzato Local",
      "Supporto Prioritario",
      "Social Media Integration",
    ],
    popular: true,
    cta: "Più Scelto",
  },
  {
    name: "E-Commerce",
    icon: Sparkles,
    price: "4.500",
    description: "Vendi ovunque, in ogni momento",
    features: [
      "Negozio Online Completo",
      "Gestione Inventario AI",
      "Pagamenti Sicuri (Stripe/PayPal)",
      "Recupero Carrelli Abbandonati",
      "Report Vendite Avanzati",
      "1 Anno di Manutenzione",
    ],
    popular: false,
    cta: "Apri il tuo Shop",
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "Su Misura",
    isCustom: true,
    description: "Soluzioni su misura per grandi volumi",
    features: [
      "Infrastruttura Scalabile Cloud",
      "Sistemi ERP/CRM Custom",
      "Analisi Predittiva AI",
      "Sicurezza Livello Militare",
      "Consulente Dedicato 24/7",
      "SLA Garantito",
    ],
    popular: false,
    cta: "Contattaci",
  },
];

const PricingSection = () => {
  return (
    <section id="prezzi" className="relative py-24 md:py-32 overflow-hidden bg-card/20">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Prezzi Chiari</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Sai Sempre Quanto
            <span className="gradient-text"> Spendi</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Niente sorprese o costi nascosti. Prezzi onesti e tutto incluso.
            Paghi solo quello che ti serve.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-[95%] mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass-card p-8 flex flex-col hover-lift ${plan.popular ? "border-primary/50 scale-105 lg:scale-110" : ""
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full">
                  <span className="text-xs font-semibold text-primary-foreground">
                    Consigliato
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${plan.popular
                    ? "bg-gradient-to-br from-primary to-accent"
                    : "bg-primary/20"
                  }`}
              >
                <plan.icon
                  className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"
                    }`}
                />
              </div>

              {/* Plan Info */}
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                {plan.isCustom ? (
                  <span className="font-display text-3xl font-bold gradient-text">
                    {plan.price}
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-muted-foreground">€</span>
                    <span className="font-display text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">/progetto</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                className="w-full"
                asChild
              >
                <a href="#contatti">{plan.cta}</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
          <div className="glass-card px-6 py-3">
            <span className="text-muted-foreground text-sm">💳 Pagamento sicuro</span>
          </div>
          <div className="glass-card px-6 py-3">
            <span className="text-muted-foreground text-sm">✅ Soddisfatto o rimborsato</span>
          </div>
          <div className="glass-card px-6 py-3">
            <span className="text-muted-foreground text-sm">🇮🇹 Assistenza in italiano</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
