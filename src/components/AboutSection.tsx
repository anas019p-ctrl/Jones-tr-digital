import { Target, Lightbulb, Users, Rocket, Shield, Heart, Cpu, Code, Cog } from "lucide-react";
import { motion } from "framer-motion";
import logo3D from "@/assets/logo-3d.png";
import aboutTech from "@/assets/about-tech.png";

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

      {/* Floating Automation Nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 right-1/4"
        >
          <Cpu className="text-primary w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-1/3 left-1/4"
        >
          <Code className="text-accent w-10 h-10" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-10"
        >
          <Cog className="text-primary/50 w-16 h-16" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary uppercase tracking-widest">Digital Hub</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-[1.1]">
              Automazione & Design
              <br />
              <span className="gradient-text">Il Futuro è qui.</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                In <strong className="text-foreground">JONES TR DIGITAL</strong> trasformiamo la complessità in semplicità.
                Utilizziamo le ultime tecnologie di <span className="text-primary font-medium">automazione</span> e
                <span className="text-accent font-medium"> generazione AI</span> per creare siti ed app che lavorano per te.
              </p>
              <p>
                I nostri uffici digitali sono sempre attivi, pronti a sfornare soluzioni su misura
                che scalano il tuo business in modo automatico e ripetitivo.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="glass-card p-4 text-center min-w-[120px]">
                <div className="font-display text-3xl font-bold gradient-text">24/7</div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Automazione</p>
              </div>
              <div className="glass-card p-4 text-center min-w-[120px]">
                <div className="font-display text-3xl font-bold gradient-text">99%</div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Efficienza</p>
              </div>
              <div className="glass-card p-4 text-center min-w-[120px]">
                <div className="font-display text-3xl font-bold gradient-text">∞</div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Scalabilità</p>
              </div>
            </div>
          </div>

          {/* Right - Visual (New Image + Effects) */}
          <div className="relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="glass-card p-4 overflow-hidden rounded-3xl border-primary/20 shadow-2xl shadow-primary/10 transition-all duration-500 group-hover:border-primary/50">
                <img
                  src={aboutTech}
                  alt="Futuristic Workspace"
                  className="w-full rounded-2xl object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Scanning Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-primary/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 pointer-events-none"
                />
              </div>

              {/* Floating Tech Labels */}
              <div className="absolute -top-6 -left-6 bg-card border border-border px-4 py-2 rounded-xl text-xs font-bold text-primary shadow-lg animate-float">
                NODE_GEN_SITE
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card border border-border px-4 py-2 rounded-xl text-xs font-bold text-accent shadow-lg animate-float" style={{ animationDelay: "-2s" }}>
                AUTO_APP_SYNC
              </div>
            </motion.div>

            {/* Glow Background for image */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full scale-125 opacity-30 animate-pulse" />
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
