import { motion } from 'framer-motion';

export default function HowItWorks() {
    const steps = [
        { num: 1, title: 'Consulenza Gratuita', desc: 'Call di 15 min per capire le tue esigenze e obiettivi.' },
        { num: 2, title: 'Proposta Personalizzata', desc: 'Ricevi una quotazione dettagliata in meno di 24 ore.' },
        { num: 3, title: 'Sviluppo & Design', desc: 'Lavoriamo al tuo progetto con feedback costanti (2-4 settimane).' },
        { num: 4, title: 'Revisione & Testing', desc: 'Controllo qualità completo su tutti i dispositivi e browser.' },
        { num: 5, title: 'Lancio & Supporto', desc: 'Messa online definitiva e supporto tecnico continuo.' },
    ];

    return (
        <section className="py-24 md:py-32 bg-background min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                        Il Nostro <span className="gradient-text">Processo</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Dalla visione alla realtà. Ecco come trasformiamo la tua attività
                        in un successo digitale.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-7 md:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent opacity-30" />

                    <div className="space-y-16">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-10 md:gap-14 relative"
                            >
                                {/* Number */}
                                <div className="flex-shrink-0 z-10">
                                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-card border border-primary/50 text-primary font-bold text-2xl md:text-3xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover:scale-110 transition-all duration-500">
                                        {step.num}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="pt-2 md:pt-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
