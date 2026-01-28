import { Target, Lightbulb, Users, Rocket, Shield, Heart } from "lucide-react";
import logo3D from "@/assets/logo-3d.png";

const values = [
  {
    icon: Target,
    title: "Risultati Concreti",
    description: "Non vendiamo fumo. Ogni progetto ha obiettivi chiari e misurabili.",
  },
  {
    icon: Lightbulb,
    title: "Semplicità",
    description: "Tecnologia complessa resa semplice. Ti spieghiamo tutto passo passo.",
  },
  {
    icon: Users,
    title: "Ascoltiamo",
    description: "Capiamo le tue esigenze prima di proporre soluzioni. Tu sei l'esperto del tuo business.",
  },
  {
    icon: Rocket,
    title: "Velocità",
    description: "Il tuo tempo è prezioso. Consegniamo in tempi rapidi senza sacrificare la qualità.",
  },
  {
    icon: Shield,
    title: "Affidabilità",
    description: "Siamo sempre disponibili. Se hai un problema, lo risolviamo insieme.",
  },
  {
    icon: Heart,
    title: "Passione",
    description: "Amiamo vedere le piccole attività crescere grazie alla tecnologia.",
  },
];

const AboutSection = () => {
  return (
    <section id="chi-siamo" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">Chi Siamo</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Rendiamo la Tecnologia
              <br />
              <span className="gradient-text">Accessibile a Tutti</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                <strong className="text-foreground">JONES TR DIGITAL</strong> aiuta le piccole 
                e medie imprese a crescere online. Sappiamo che la tecnologia può sembrare 
                complicata, per questo la rendiamo semplice.
              </p>
              <p>
                Non serve essere esperti di computer. Tu ci racconti cosa ti serve 
                per la tua attività, noi creiamo gli strumenti giusti e ti insegniamo 
                ad usarli.
              </p>
              <p>
                <strong className="text-foreground">Il nostro obiettivo?</strong> Farti 
                risparmiare tempo, trovare nuovi clienti e far crescere il tuo business.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="font-display text-3xl font-bold gradient-text">2019</div>
                <p className="text-sm text-muted-foreground">Dal 2019 al tuo fianco</p>
              </div>
              <div>
                <div className="font-display text-3xl font-bold gradient-text">150+</div>
                <p className="text-sm text-muted-foreground">Attività aiutate</p>
              </div>
              <div>
                <div className="font-display text-3xl font-bold gradient-text">100%</div>
                <p className="text-sm text-muted-foreground">In italiano</p>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="glass-card p-8 md:p-12">
              {/* Decorative Grid */}
              <div className="absolute inset-0 cyber-grid opacity-20 rounded-2xl" />
              
              {/* Logo Large */}
              <div className="relative text-center py-12">
                <div className="inline-flex items-center justify-center w-40 h-40 rounded-2xl mb-6 overflow-hidden">
                  <img 
                    src={logo3D} 
                    alt="JONES TR DIGITAL" 
                    className="w-full h-full object-cover animate-float"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  JONES TR DIGITAL
                </h3>
                <p className="text-muted-foreground">
                  Semplice • Affidabile • Vicino a Te
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 glass-card flex items-center justify-center animate-float">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 glass-card flex items-center justify-center animate-float" style={{ animationDelay: "-2s" }}>
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="pt-12 border-t border-border/30">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Perché <span className="gradient-text">Sceglierci</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="glass-card p-6 flex items-start gap-4 hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
