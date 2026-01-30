import { useState, useEffect } from "react";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  Zap,
  Sparkles,
  Crown
};

const PricingSection = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) throw error;

        // Map database records to UI structure
        const mappedPlans = data?.map(pkg => ({
          name: pkg.name,
          icon: iconMap[pkg.name] || (pkg.highlighted ? Crown : Sparkles),
          price: pkg.price,
          description: pkg.name === "Enterprise" ? "Soluzioni su misura per grandi volumi" : "Piano professionale gestito",
          features: pkg.features || [],
          popular: pkg.highlighted || false,
          isCustom: pkg.price?.toLowerCase().includes("misura") || pkg.price?.toLowerCase().includes("custom"),
          cta: pkg.name === "Start" ? "Inizia Ora" :
            pkg.name === "Pro" ? "Più Scelto" :
              pkg.name === "Enterprise" ? "Contattaci" : "Scegli Piano"
        })) || [];

        setPlans(mappedPlans);
      } catch (err) {
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section id="prezzi" className="py-24 text-center">
        <div className="animate-pulse text-muted-foreground">Caricamento prezzi...</div>
      </section>
    );
  }

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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${plans.length > 3 ? 'xl:grid-cols-5' : ''} gap-6 max-w-[95%] mx-auto`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass-card p-8 flex flex-col hover-lift ${plan.popular ? "border-primary/50 scale-105 lg:scale-110" : ""
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                  <div className="px-5 py-1.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full shadow-[0_0_20px_rgba(0,242,255,0.4)] border border-white/20">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white">
                      Consigliato
                    </span>
                  </div>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${plan.popular
                  ? "bg-gradient-to-br from-primary to-accent"
                  : "bg-primary/20"
                  }`}
              >
                {typeof plan.icon === 'string' ? (
                  <span className="text-2xl">{plan.icon}</span>
                ) : (
                  <plan.icon
                    className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"
                      }`}
                  />
                )}
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
                    {!plan.price?.includes("€") && <span className="text-muted-foreground">€</span>}
                    <span className="font-display text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">/progetto</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature: string, index: number) => (
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
