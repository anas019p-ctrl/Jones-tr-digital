import { motion } from 'framer-motion';
import { Cpu, Code, Activity, Zap, CheckCircle2, Search, Settings, Rocket, MessageSquareCode } from 'lucide-react';

const steps = [
    { num: 1, title: 'Consulenza Gratuita', desc: 'Call di 15 min per capire le tue esigenze e obiettivi.', icon: <MessageSquareCode className="text-cyan-400" /> },
    { num: 2, title: 'Proposta Personalizzata', desc: 'Ricevi una quotazione dettagliata in meno di 24 ore.', icon: <Search className="text-purple-400" /> },
    { num: 3, title: 'Sviluppo & Design', desc: 'Lavoriamo al tuo progetto con feedback costanti (2-4 settimane).', icon: <Code className="text-blue-400" /> },
    { num: 4, title: 'Revisione & Testing', desc: 'Controllo qualità completo su tutti i dispositivi e browser.', icon: <Settings className="text-cyan-400" /> },
    { num: 5, title: 'Lancio & Supporto', desc: 'Messa online definitiva e supporto tecnico continuo.', icon: <Rocket className="text-white" /> },
];

const TechBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[#030305]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-10 cyber-circuit-bg" />

        {/* Side tech lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <motion.path
                d="M 50 0 L 50 200 L 0 250 M 50 400 L 100 450 L 100 800"
                stroke="#00F2FF" strokeWidth="1" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.path
                d="M 950 100 L 900 150 L 900 400 L 950 450 L 950 1000"
                stroke="#BC13FE" strokeWidth="1" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            />
        </svg>

        {/* Glow orbs */}
        <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
    </div>
);

export default function HowItWorks() {
    return (
        <section className="py-24 md:py-40 relative min-h-screen overflow-hidden">
            <TechBackground />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Process Workflow
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black font-display mb-8 text-white tracking-tighter"
                    >
                        Il Nostro <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-100 drop-shadow-[0_0_20px_rgba(0,242,255,0.4)]">Processo</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                        Dalla visione alla realtà. Ecco come trasformiamo la tua attività
                        in un successo digitale.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Animated Vertical Line */}
                    <div className="absolute left-[35px] md:left-[55px] top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
                        <motion.div
                            animate={{ top: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute w-full h-40 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                        />
                    </div>

                    <div className="space-y-24">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="flex gap-8 md:gap-16 relative group"
                            >
                                {/* Connector Dot */}
                                <div className="absolute left-[34px] md:left-[54px] top-10 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F2FF] z-20 group-hover:scale-150 transition-transform" />

                                {/* Step Visual */}
                                <div className="flex-shrink-0 z-10">
                                    <div className="w-[70px] h-[70px] md:w-[110px] md:h-[110px] rounded-[30px] bg-[#0a0a15] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                {step.icon}
                                            </div>
                                            <div className="text-2xl md:text-3xl font-black text-white/20 group-hover:text-cyan-400 transition-colors">
                                                0{step.num}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="pt-2 md:pt-6">
                                    <motion.div
                                        whileHover={{ x: 10 }}
                                        className="transition-transform"
                                    >
                                        <h3 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                                            {step.desc}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
