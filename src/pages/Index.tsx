import { motion } from 'framer-motion';
import {
  Globe, Database, Smartphone, Bot, Cog, Monitor,
  Users, TrendingUp, Award, Clock, Zap, Shield,
  ArrowRight, Quote, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GDPRBanner from "@/components/GDPRBanner";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

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
    <div className="text-foreground relative min-h-screen overflow-hidden">
      <AnimatedHUD />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-32 pb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
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
            className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight max-w-4xl"
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
            className="text-foreground/60 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            Non serve essere esperti di tecnologia. Creiamo il tuo sito web, <br className="hidden md:block" />
            automatizziamo le tue attività e ti aiutiamo a trovare nuovi clienti online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-16 max-w-3xl"
          >
            <div className="flex items-center gap-2 text-sm text-foreground/50">
              <span className="text-cyber-cyan">✓</span> Nessuna competenza tecnica richiesta
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/50">
              <span className="text-cyber-cyan">✓</span> Prezzi chiari e onesti
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/50">
              <span className="text-cyber-cyan">✓</span> Assistenza in italiano
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="btn-gradient px-8 py-4 rounded-xl flex items-center gap-2 text-white font-bold group transition-all duration-300">
              Parliamo del Tuo Progetto
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <Link to="/come-funziona" className="btn-play-cyber group">
              <div className="play-icon-container">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 text-cyber-cyan fill-current">
                  <path d="M1 1L11 7L1 13V1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-medium">Come Funziona</span>
            </Link>
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
                <div className="text-foreground/40 text-[11px] uppercase tracking-[0.3em] font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <GDPRBanner />
    </div>
  );
};

export default Index;
