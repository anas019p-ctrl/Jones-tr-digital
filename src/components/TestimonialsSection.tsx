import { motion } from "framer-motion";
import { Quote, Star, Users, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Proprietario, Rossi Arredamenti",
    content: "JONES TR DIGITAL ha trasformato completamente la nostra presenza online. Il funnel di vendita automatizzato ha raddoppiato i nostri lead in soli 3 mesi.",
    avatar: "https://i.pravatar.cc/150?u=marco",
    rating: 5
  },
  {
    name: "Elena Bianchi",
    role: "CEO, Tech Solutions",
    content: "L'integrazione dell'AI nel nostro sito è stata una svolta. I clienti ricevono risposte istantanee e noi risparmiamo ore di lavoro manuale ogni giorno.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5
  },
  {
    name: "Luca Verdi",
    role: "Libero Professionista",
    content: "Finalmente un'agenzia che parla chiaro e mantiene le promesse. Il mio sito è veloce, sicuro e soprattutto semplice da gestire.",
    avatar: "https://i.pravatar.cc/150?u=luca",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-[#030305]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Users size={14} /> Social Proof
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8">
            Dicono di <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Noi</span>
          </h2>
          <p className="text-gray-400 text-xl font-medium max-w-2xl mx-auto">
            Aiutiamo le imprese a prosperare nell'era digitale. La loro crescita è il nostro miglior biglietto da visita.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative p-10 rounded-[40px] bg-white/[0.03] border border-white/5 backdrop-blur-3xl group hover:border-purple-500/30 transition-all duration-700"
            >
              <div className="absolute -top-6 -right-6 text-purple-500/20 group-hover:text-purple-400/40 transition-colors">
                <Quote size={80} />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-purple-400 text-purple-400" />
                ))}
              </div>

              <p className="text-gray-300 text-lg font-medium leading-relaxed mb-10 italic relative z-10">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl border-2 border-purple-500/30 overflow-hidden group-hover:border-purple-500 transition-all">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-black">{t.name}</h4>
                  <p className="text-purple-400 text-xs font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
