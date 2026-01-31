import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Quanto tempo ci vuole per creare un sito?",
    a: "Dipende dalla complessità, ma solitamente un sito Standard è pronto in 2-3 settimane. I progetti più avanzati con integrazioni AI possono richiedere fino a 5-6 settimane."
  },
  {
    q: "Devo avere competenze tecniche?",
    a: "Assolutamente no. Il nostro obiettivo è semplificarti la vita. Gestiamo noi tutta la parte tecnica e ti forniamo strumenti facilissimi da usare per gestire i tuoi contenuti."
  },
  {
    q: "Cosa succede dopo il lancio?",
    a: "Non ti abbandoniamo. Forniamo supporto tecnico continuo, monitoraggio delle performance e aggiornamenti di sicurezza periodici inclusi nei nostri piani."
  },
  {
    q: "È possibile aggiungere l'AI al mio sito attuale?",
    a: "Sì, possiamo integrare assistenti AI, chatbot e automazioni su quasi tutte le piattaforme esistenti senza dover rifare tutto da capo."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 md:py-40 overflow-hidden bg-[#030305]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <HelpCircle size={14} /> Knowledge Base
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8">
            Domande <span className="text-cyan-400">Freqenti</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border transition-all duration-300 ${openIndex === i ? 'bg-white/5 border-cyan-500/30' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <span className={`text-xl font-bold transition-colors ${openIndex === i ? 'text-cyan-400' : 'text-white'}`}>
                  {faq.q}
                </span>
                <div className={`p-2 rounded-xl transition-all ${openIndex === i ? 'bg-cyan-400 text-[#030305] rotate-180' : 'bg-white/5 text-gray-500'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-gray-400 text-lg leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
