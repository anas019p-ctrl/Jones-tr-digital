import { Target, Lightbulb, Users, Rocket, Shield, Heart, Cpu, Code, Cog, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import aboutTech from "@/assets/about-tech.png";

const values = [
  {
    icon: Target,
    title: "Risultati Concreti",
    description: "Ogni progetto ha obiettivi chiari e misurabili.",
  },
  {
    icon: Lightbulb,
    title: "Semplicità",
    description: "Tecnologia complessa resa semplice per te.",
  },
  {
    icon: Users,
    title: "Ascoltiamo",
    description: "Capiamo le tue esigenze prima di agire.",
  },
  {
    icon: Zap,
    title: "Velocità",
    description: "Consegniamo rapidamente senza compromessi.",
  },
  {
    icon: Shield,
    title: "Affidabilità",
    description: "Supporto costante per ogni tua necessità.",
  },
  {
    icon: Activity,
    title: "Performance",
    description: "Ottimizzazione continua per il massimo impatto.",
  },
];

const AboutSection = () => {
  return (
    <section id="chi-siamo" className="relative py-24 md:py-40 overflow-hidden bg-[#030305]">
      {/* Enhanced Cyber Background for this section */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Left - Content */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
            >
              <Cpu size={16} className="text-cyan-400 animate-pulse" />
              <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em]">Next-Gen Digital Hub</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-7xl font-black text-white leading-[1] tracking-tighter"
            >
              Automazione <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                & Design Creativo.
              </span>
            </motion.h2>

            <div className="space-y-6 text-gray-400 text-xl font-medium leading-relaxed max-w-xl">
              <p>
                In <strong className="text-white">JONES TR DIGITAL</strong> non creiamo solo siti.
                Costruiamo motori di business automatizzati che lavorano 24/7 per te.
              </p>
              <p>
                Utilizziamo l'Intelligenza Artificiale per ottimizzare ogni processo,
                garantendoti scalabilità infinita e una presenza online che domina il mercato.
              </p>
            </div>

            {/* Tech Stats Bar */}
            <div className="flex flex-wrap gap-6">
              {[
                { val: "24/7", label: "AUTO_OPS" },
                { val: "100%", label: "SYNC_HUB" },
                { val: "∞", label: "SCALE_UP" }
              ].map((s, i) => (
                <div key={i} className="px-8 py-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[140px] group hover:border-cyan-500/30 transition-all">
                  <span className="text-3xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors">{s.val}</span>
                  <span className="text-[10px] font-black text-gray-600 tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual Interface */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              className="relative z-10 p-4 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden group shadow-2xl"
            >
              <img
                src={aboutTech}
                alt="Cyber-Tech Interface"
                className="w-full rounded-[30px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Scanline Effect */}
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_#00F2FF] z-20 pointer-events-none opacity-50"
              />

              {/* Overlay HUD */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305]/80 via-transparent to-transparent opacity-60" />
            </motion.div>

            {/* Decorative Tech Nodes */}
            <div className="absolute -top-12 -right-12 w-32 h-32 border border-cyan-500/20 rounded-full animate-spin-slow opacity-30" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border-dashed border-purple-500/30 rounded-full animate-reverse-spin opacity-20" />
          </div>
        </div>

        {/* Values - Tech Grid */}
        <div className="pt-24 border-t border-white/5">
          <div className="text-center mb-20">
            <h3 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
              I Nostri <span className="text-cyan-400">Core Values</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <v.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h4 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {v.title}
                </h4>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
