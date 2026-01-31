import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Globe, Database, Smartphone, Bot, Cog, Monitor,
  Users, TrendingUp, Award, Clock, Zap, Shield,
  ArrowRight, Quote, Sparkles, Play, Code, Cpu, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GDPRBanner from "@/components/GDPRBanner";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import TeamSection from "@/components/TeamSection";
import PortfolioSection from "@/components/PortfolioSection";

// Minimal Cyber-Tech Background - VERSION 4 (High Visibility, Fluid Trails)
const WowCyberBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Base Layer: Deep Dark Gradient with more color depth */}
      <div className="absolute inset-0 bg-[#020205]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#0f172a_0%,#020205_100%)] opacity-100" />

      {/* 2. Abstract "Light Trails" and Mesh Gradients - INCREASED INTENSITY */}
      <div className="absolute inset-0">
        {/* Left Glow Mesh - More Cyan */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [-30, 30, -30]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[15%] top-[10%] w-[60%] h-[80%] bg-cyan-500/20 blur-[130px] rounded-full"
        />

        {/* Right Glow Mesh - More Purple */}
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.6, 0.3],
            x: [30, -30, 30]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[15%] top-[20%] w-[60%] h-[80%] bg-purple-600/15 blur-[130px] rounded-full"
        />

        {/* Bottom Horizon Glow - Stronger */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent blur-[100px] opacity-60" />
      </div>

      {/* 3. Fluid Circuit Lines & Trails (Visible at Edges) */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="hyper-glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Light Trails - CYAN (Left) */}
        <motion.path
          d="M -10 100 Q 200 400 -10 700"
          stroke="#00F2FF"
          strokeWidth="2"
          strokeOpacity="0.4"
          fill="none"
          filter="url(#hyper-glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M 20 50 Q 150 450 20 850"
          stroke="#00F2FF"
          strokeWidth="1"
          strokeOpacity="0.2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Dynamic Light Trails - PURPLE (Right) */}
        <motion.path
          d="M calc(100% + 10px) 150 Q calc(100% - 200px) 450 calc(100% + 10px) 750"
          stroke="#BC13FE"
          strokeWidth="2"
          strokeOpacity="0.3"
          fill="none"
          filter="url(#hyper-glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Flying Particles (Enhanced) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.circle
            key={i}
            r={Math.random() * 2 + 1}
            fill={Math.random() > 0.5 ? "#00F2FF" : "#BC13FE"}
            initial={{
              cx: Math.random() < 0.5 ? (Math.random() * 15 + "%") : (Math.random() * 15 + 85 + "%"),
              cy: "-10%",
              opacity: 0
            }}
            animate={{
              cy: "110%",
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 8,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
          />
        ))}
      </svg>

      {/* 4. Minimal HUD Detail (More Visible) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            opacity: [0.08, 0.15, 0.08]
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -right-60 top-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[1px] border-cyan-500/30 rounded-full border-dashed"
        />
        <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent opacity-40" />
      </div>

      {/* 5. Fluid Scanning Block */}
      <motion.div
        animate={{ y: ['-20%', '120%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[150px] bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-30"
      />
    </div>
  );
};

const Index = () => {
  const stats = [
    { icon: <Globe className="text-cyan-400" />, value: '150+', label: 'Attività Aiutate' },
    { icon: <TrendingUp className="text-purple-400" />, value: '98%', label: 'Clienti Soddisfatti' },
    { icon: <Zap className="text-blue-400" />, value: '24/7', label: 'Supporto Attivo' },
  ]

  return (
    <div className="text-foreground relative min-h-screen bg-[#020205]">
      <WowCyberBackground />

      <main className="relative z-10 w-full overflow-hidden">
        {/* Navigation spacer */}
        <div className="h-24" />

        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-12 pb-24 text-center flex flex-col items-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-black tracking-[0.2em] uppercase backdrop-blur-xl hover:bg-cyan-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#00F2FF]" />
              Innovazione Minimalista
              <span className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-10 blur-sm" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black mb-12 leading-[0.9] tracking-tighter max-w-7xl"
          >
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">Il Tuo Business</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] animate-gradient-shift drop-shadow-[0_0_20px_rgba(0,242,255,0.2)]">
              Online, Semplice
            </span> <br />
            <span className="text-white">e di </span>
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">Successo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.5 }}
            className="text-gray-400 text-xl md:text-3xl max-w-4xl mb-16 leading-relaxed font-medium tracking-tight"
          >
            Automazione strategica e design minimalista. <br className="hidden md:block" />
            Costruiamo la tua presenza digitale senza distrazioni, focalizzati sui risultati.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24"
          >
            {/* Primary CTA - Sleek Glow */}
            <a
              href="#contatti"
              className="relative group h-16 px-10 rounded-2xl font-black text-white transition-all duration-500 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,242,255,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-700 w-[110%] h-[110%] group-hover:translate-x-[-2%] transition-transform" />
              <div className="relative flex items-center gap-3">
                Parliamo del Tuo Progetto
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 opacity-80" />
            </a>

            {/* Secondary CTA - Minimal Glass */}
            <Link
              to="/come-funziona"
              className="h-16 px-10 rounded-2xl font-bold text-white flex items-center gap-4 bg-white/5 border border-white/10 hover:border-cyan-500/30 backdrop-blur-3xl transition-all duration-500 group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-500 transition-colors">
                <Play size={14} className="fill-white" />
              </div>
              Come Funziona
            </Link>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="relative p-12 rounded-[40px] bg-white/[0.03] border border-white/10 group hover:border-cyan-500/30 backdrop-blur-lg transition-all duration-500"
              >
                <div className="text-6xl font-black mb-4 text-white tracking-tighter group-hover:text-cyan-400 transition-colors duration-500">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-black group-hover:text-gray-400 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <PortfolioSection />
        <AboutSection />
        <TeamSection />
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
