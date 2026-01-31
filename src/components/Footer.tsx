import { Mail, Linkedin, Instagram, Twitter, Shield, Facebook, Youtube, QrCode } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // QR Code URL for the current site
  const siteUrl = window.location.origin;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    siteUrl
  )}&bgcolor=030305&color=00F2FF`;

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
    <footer className="bg-[#030305] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand & QR */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-cyan-500/30 rounded-xl flex items-center justify-center bg-cyan-950/20 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                <span className="text-xl font-black text-white">JT</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-black text-white tracking-tighter">
                  JONES TR DIGITAL
                </h3>
                <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold">
                  Next-Gen Innovation
                </span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-lg max-w-sm font-medium">
              Trasformiamo l'innovazione in risultati concreti. Il tuo partner strategico per l'era digitale.
            </p>

            <div className="flex items-start gap-8">
              {/* QR Code restored */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl relative group">
                <img
                  src={qrCodeUrl}
                  alt="QR Code Site"
                  className="w-24 h-24 object-contain rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute -top-2 -right-2 bg-cyan-500 text-[#030305] p-1 rounded-full shadow-[0_0_10px_#00F2FF]">
                  <QrCode size={12} />
                </div>
                <p className="text-[9px] text-center mt-2 text-cyan-400 font-black tracking-widest uppercase">SCAN TO VISIT</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/30">
                    <Mail size={14} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <a href="mailto:jonestrdigital@gmail.com" className="text-sm font-bold">
                    jonestrdigital@gmail.com
                  </a>
                </div>
                <div className="flex gap-4">
                  {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="text-xs font-black text-white tracking-[0.3em] mb-8 uppercase border-l-2 border-cyan-500 pl-4">Servizi</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><Link to="/#prezzi" className="hover:text-cyan-400 transition-colors">Web Development</Link></li>
              <li><Link to="/#prezzi" className="hover:text-cyan-400 transition-colors">AI & Automation</Link></li>
              <li><Link to="/#prezzi" className="hover:text-cyan-400 transition-colors">SEO Mastery</Link></li>
              <li><Link to="/#prezzi" className="hover:text-cyan-400 transition-colors">Cloud Strategy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white tracking-[0.3em] mb-8 uppercase border-l-2 border-purple-500 pl-4">Azienda</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><Link to="/#chi-siamo" className="hover:text-cyan-400 transition-colors">Chi Siamo</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog Tech</Link></li>
              <li><Link to="/#faq" className="hover:text-cyan-400 transition-colors">Domande Frequenti</Link></li>
              <li><Link to="/#contatti" className="hover:text-cyan-400 transition-colors">Lavora con noi</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-white tracking-[0.3em] mb-8 uppercase border-l-2 border-blue-500 pl-4">Insights</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Ricevi ogni settimana le ultime novità su AI e Web Automation.
            </p>
            {subscribed ? (
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-cyan-400 font-black text-xs text-center">
                BENVENUTO A BORDO 🚀
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="relative">
                <input
                  type="email"
                  placeholder="La tua email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-600"
                  required
                />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-cyan-500 text-[#030305] px-4 rounded-lg font-black text-[10px] tracking-widest hover:bg-white transition-all shadow-lg active:scale-95">
                  UNISCITI
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-10">
            <span className="text-[10px] font-black text-gray-600 tracking-[0.2em]">© 2024 JONES TR DIGITAL</span>
            <div className="flex gap-6 text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
          <Link to="/admin" className="text-[10px] font-black text-cyan-500/50 hover:text-cyan-400 flex items-center gap-2 border border-cyan-500/30 px-4 py-2 rounded-lg transition-all tracking-widest uppercase bg-cyan-500/5">
            <Shield size={12} /> Console Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
