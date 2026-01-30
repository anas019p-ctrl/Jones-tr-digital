import { Mail, Linkedin, Instagram, Twitter, Shield, Facebook, Youtube } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          // Already subscribed
          setSubscribed(true);
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
      }

      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
    }
  };

  return (
    <footer className="bg-void border-t border-white/5 pt-20 pb-10 mt-auto relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-cyber-cyan/50 rounded-lg flex items-center justify-center bg-cyan-950/20 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00F2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-display text-white tracking-tight">
                JONES TR <span className="text-cyber-cyan">DIGITAL</span>
              </h3>
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              Innovazione digitale e design d'avanguardia. Il tuo partner tecnologico per l'eccellenza online.
            </p>
            <div className="flex items-center gap-3 text-white/60 group">
              <Mail size={18} className="text-cyber-cyan group-hover:scale-110 transition-transform" />
              <a href="mailto:jonestrdigital@gmail.com" className="hover:text-cyber-cyan transition-colors text-sm font-medium">
                jonestrdigital@gmail.com
              </a>
            </div>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="font-mono text-[11px] text-cyber-cyan/50 tracking-[0.3em] mb-6 uppercase">Servizi</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><Link to="/#prezzi" className="hover:text-cyber-cyan transition-colors">Digital Strategy</Link></li>
              <li><Link to="/#prezzi" className="hover:text-cyber-cyan transition-colors">Web Development</Link></li>
              <li><Link to="/#prezzi" className="hover:text-cyber-cyan transition-colors">AI Integration</Link></li>
              <li><Link to="/#prezzi" className="hover:text-cyber-cyan transition-colors">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[11px] text-cyber-cyan/50 tracking-[0.3em] mb-6 uppercase">Azienda</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><Link to="/portfolio" className="hover:text-cyber-cyan transition-colors">Portfolio</Link></li>
              <li><Link to="/#chi-siamo" className="hover:text-cyber-cyan transition-colors">Chi Siamo</Link></li>
              <li><Link to="/#faq" className="hover:text-cyber-cyan transition-colors">FAQ</Link></li>
              <li><Link to="/#contatti" className="hover:text-cyber-cyan transition-colors">Contatti</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-mono text-[11px] text-cyber-cyan/50 tracking-[0.3em] mb-6 uppercase">Newsletter</h4>
            <p className="text-xs text-white/50 mb-6 leading-relaxed">
              Ricevi gli ultimi aggiornamenti sulle tecnologie emergenti.
            </p>
            {subscribed ? (
              <div className="bg-cyber-cyan/10 border border-cyber-cyan/20 p-4 rounded-xl text-cyber-cyan font-medium text-xs">
                ✅ Iscrizione completata.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyber-cyan outline-none transition-all"
                  required
                />
                <button type="submit" className="w-full bg-cyber-cyan text-void px-6 py-2.5 rounded-lg 
                                  font-bold hover:scale-[1.02] transition-all shadow-lg shadow-cyber-cyan/10 text-xs">
                  ISCRIVITI
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-white/40 tracking-widest uppercase">
            <span>© 2024 JONES TR DIGITAL</span>
            <Link to="/admin" className="hover:text-cyber-cyan flex items-center gap-2">
              <Shield size={12} /> Admin
            </Link>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-white/40 tracking-widest uppercase">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/cookie" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
