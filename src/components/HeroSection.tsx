import { useState, useEffect } from "react";
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export default function HeroSection() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .single();

        if (error) throw error;
        setSettings(data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Title rendering logic for gradients
  const renderTitle = (title: string) => {
    if (!title) return (
      <>
        Il Tuo Business <br />
        <span className="gradient-text">Online</span>, Semplice <br />
        e di <span className="gradient-text-accent">Successo</span>
      </>
    );

    // Basic logic to wrap words in gradients if they match keywords (case insensitive)
    const keywords = ["Online", "Successo", "Digitale", "Design"];
    const words = title.split(" ");

    return words.map((word, i) => {
      const cleanWord = word.replace(/[^\w]/g, "");
      if (keywords.some(k => k.toLowerCase() === cleanWord.toLowerCase())) {
        return (
          <span key={i} className={cleanWord.toLowerCase() === "successo" ? "gradient-text-accent" : "gradient-text"}>
            {word}{" "}
          </span>
        );
      }
      return <span key={i}>{word} </span>;
    });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-background text-foreground overflow-hidden pt-20">

      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {settings?.site_name || "Per Piccole e Medie Imprese"}
            </span>
          </motion.div>

          {/* Headline principale */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold mb-8 leading-[1.05] tracking-tight font-display"
          >
            {loading ? "..." : renderTitle(settings?.hero_title)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl leading-relaxed"
          >
            {loading ? "..." : (settings?.hero_subtitle ||
              "Non serve essere esperti di tecnologia. Creiamo il tuo sito web, automatizziamo le tue attività e ti aiutiamo a trovare nuovi clienti online.")}
          </motion.p>

          {/* Features check */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 mb-12 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-[10px]">✓</span>
              </div>
              Nessuna competenza tecnica richiesta
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-[10px]">✓</span>
              </div>
              Prezzi chiari e onesti
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-[10px]">✓</span>
              </div>
              Assistenza in italiano
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <a href="#contatti" className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-10 py-5 
                             rounded-xl font-bold flex items-center justify-center gap-3
                             hover:scale-105 transition-all shadow-xl shadow-primary/20 text-lg">
              Parliamo del Tuo Progetto <ArrowRight size={22} />
            </a>
            <Link to="/come-funziona" className="glass-card px-10 py-5 
                             rounded-xl font-bold flex items-center justify-center gap-3
                             hover:bg-primary/5 transition-all text-center text-lg border border-border/50">
              <Play size={22} className="fill-current" /> Come Funziona
            </Link>
          </motion.div>

          {/* Quick Stats Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-border/20 max-w-2xl"
          >
            <div>
              <div className="text-3xl font-bold text-foreground">150+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Attività Aiutate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">98%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Clienti Soddisfatti</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">24/7</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Supporto Attivo</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
