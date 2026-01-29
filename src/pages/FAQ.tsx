import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
    const [openId, setOpenId] = useState<number | null>(null);

    const faqs = [
        {
            id: 1,
            question: 'Quanto costa il mantenimento del sito?',
            answer: 'Il mantenimento base è incluso per il primo anno. Successivamente, offriamo pacchetti flessibili per hosting, sicurezza e aggiornamenti a partire da €20/mese.'
        },
        {
            id: 2,
            question: 'Posso modificare il sito da solo?',
            answer: 'Assolutamente sì! I piani Pro e E-commerce includono un CMS intuitivo che ti permette di aggiornare testi, immagini e prodotti in totale autonomia.'
        },
        {
            id: 3,
            question: 'É incluso il nome dominio?',
            answer: 'Sì, includiamo la registrazione di un dominio .it o .com per il primo anno in tutti i nostri pacchetti.'
        },
        {
            id: 4,
            question: 'Quanto tempo ci vuole?',
            answer: 'I tempi variano in base alla complessità: Start (2 settimane), Standard (3-4 settimane), Pro/E-commerce (4-8 settimane).'
        },
        {
            id: 5,
            question: 'Che garanzie offrite?',
            answer: 'Offriamo una garanzia di soddisfazione del 100%. Lavoriamo a stretto contatto con te durante tutto il processo di design per assicurarci che il risultato finale superi le tue aspettative.'
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-background min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Supporto</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                        Domande <span className="gradient-text">Frequenti</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Tutto quello che devi sapere per iniziare il tuo percorso digitale con noi.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="glass-card border-none">
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full px-8 py-6 flex justify-between items-center transition-all group"
                            >
                                <span className="font-bold text-foreground text-left text-lg group-hover:text-primary transition-colors">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={24}
                                    className={`text-primary transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-8 text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="glass-card inline-block px-10 py-8">
                        <p className="text-muted-foreground mb-6">
                            Hai ancora dubbi? Siamo a tua completa disposizione.
                        </p>
                        <a
                            href="/#contatti"
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all inline-block"
                        >
                            Parla con un Esperto
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
