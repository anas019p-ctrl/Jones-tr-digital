import { motion } from 'framer-motion';
import {
  Globe, Database, Smartphone, Bot, Cog, Monitor,
  Users, TrendingUp, Award, Clock, Zap, Shield,
  ArrowRight, Quote, Sparkles
} from 'lucide-react';
import GDPRBanner from "@/components/GDPRBanner";

const AnimatedHUD = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* HUD Circles Left */}
      <motion.div
        className="hud-circle w-[600px] h-[600px] -left-[300px] top-1/2 -translate-y-1/2 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-10 border border-cyber-cyan/5 rounded-full" />
        <div className="absolute inset-20 border border-cyber-cyan/10 rounded-full border-dashed" />
      </motion.div>

      {/* HUD Circles Right */}
      <motion.div
        className="hud-circle w-[800px] h-[800px] -right-[400px] top-[10%] opacity-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-20 border border-cyber-purple/10 rounded-full" />
        <div className="absolute inset-[100px] border border-cyber-cyan/5 rounded-full border-dashed" />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

      {/* Light Streaks */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

const Index = () => {
  const stats = [
    { value: '150+', label: 'Attività Aiutate' },
    { value: '98%', label: 'Clienti Soddisfatti' },
    { value: '24/7', label: 'Supporto Attivo' },
  ]

  return (
    <div className="bg-void text-white relative min-h-screen overflow-hidden">
      <AnimatedHUD />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <span className="badge-cyber">
              <span className="w-2 h-2 bg-cyber-cyan rounded-full inline-block mr-2 animate-pulse" />
              Per Piccole e Medie Imprese
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            Il Tuo Business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-400">
              Online, Semplice
            </span> <br />
            e di Successo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Non serve essere esperti di tecnologia. Creiamo il tuo sito web, <br className="hidden md:block" />
            automatizziamo le tue attività e ti aiutiamo a trovare nuovi clienti online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
          >
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span className="text-cyber-cyan">✓</span> Nessuna competenza tecnica richiesta
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span className="text-cyber-cyan">✓</span> Prezzi chiari e onesti
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span className="text-cyber-cyan">✓</span> Assistenza in italiano
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="btn-gradient w-full sm:w-auto">
              Parliamo del Tuo Progetto
              <ArrowRight size={20} />
            </button>
            <button className="btn-ghost-cyber w-full sm:w-auto">
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mr-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              Come Funziona
            </button>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-cyber-cyan transition-colors">{stat.value}</div>
                <div className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <GDPRBanner />
    </div>
  );
};

export default Index;
