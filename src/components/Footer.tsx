import { Mail, Linkedin, Instagram, Twitter, Shield, Facebook, Youtube } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
    // Optionally add a toast here
  };

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 mt-auto relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display text-foreground tracking-tight">
              JONES TR <span className="text-primary">DIGITAL</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Trasformiamo il tuo business online con siti web professionali,
              automazioni intelligenti e un design che lascia il segno.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
                <Linkedin size={18} className="group-hover:scale-110" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
                <Facebook size={18} className="group-hover:scale-110" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
                <Instagram size={18} className="group-hover:scale-110" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
                <Twitter size={18} className="group-hover:scale-110" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
                <Youtube size={18} className="group-hover:scale-110" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
                <div className="group-hover:scale-110">
                  {/* Custom TikTok SVG since older Lucide might not have it or as fallback */}
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </div>
              </a>
            </div>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-[0.2em]">Servizi</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link to="/#prezzi" className="hover:text-primary transition-colors">Start</Link></li>
              <li><Link to="/#prezzi" className="hover:text-primary transition-colors">Standard</Link></li>
              <li><Link to="/#prezzi" className="hover:text-primary transition-colors">Pro</Link></li>
              <li><Link to="/#prezzi" className="hover:text-primary transition-colors">E-commerce</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-[0.2em]">Azienda</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/#chi-siamo" className="hover:text-primary transition-colors">Chi Siamo</Link></li>
              <li><Link to="/#faq" className="hover:text-primary transition-colors">Domande Frequenti</Link></li>
              <li><Link to="/#contatti" className="hover:text-primary transition-colors">Contatti</Link></li>
            </ul>
          </div>

          {/* Newsletter (PDF Requirement) */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-[0.2em]">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Iscriviti per ricevere consigli su come far crescere la tua attività.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                placeholder="La tua migliore email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-card border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                required
              />
              <button type="submit" className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl 
                                font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/10">
                Iscriviti Ora
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>© 2026 JONES TR DIGITAL</span>
            <Link to="/admin" className="hover:text-primary flex items-center gap-2">
              <Shield size={14} /> Admin Area
            </Link>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/faq" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">Termini di Servizio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
