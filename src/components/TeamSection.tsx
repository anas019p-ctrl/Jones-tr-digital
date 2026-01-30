import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Cpu, CheckCircle2 } from 'lucide-react';

const TeamSection = () => {
    const images = [
        {
            url: "/images/team/team.png",
            title: "Il Nostro Team",
            desc: "Esperti in AI, Sviluppo e Design Creativo.",
            icon: Users
        },
        {
            url: "/images/team/office.png",
            title: "Headquarters",
            desc: "Dove l'innovazione prende forma ogni giorno.",
            icon: Building2
        },
        {
            url: "/images/team/workstation.png",
            title: "AI Lab",
            desc: "Tecnologia all'avanguardia per risultati d'eccellenza.",
            icon: Cpu
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-void/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 mb-6">
                        <CheckCircle2 size={14} className="text-cyber-cyan" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyber-cyan">
                            Affidabilità & Trasparenza
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
                        DIETRO LA <span className="gradient-text">TECNOLOGIA</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Siamo una digital agency reale, con persone reali e uffici progettati per massimizzare la creatività e l'efficienza tecnologica.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {images.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="glass-card overflow-hidden h-full flex flex-col">
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4 p-2 bg-cyber-cyan/20 backdrop-blur-md rounded-lg border border-cyber-cyan/30">
                                        <item.icon size={20} className="text-cyber-cyan" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-cyan transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-white/60">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* HUD Decoration */}
                                <div className="absolute top-0 right-0 w-4 h-4 opacity-30">
                                    <div className="absolute top-2 right-2 w-full h-[1px] bg-cyber-cyan" />
                                    <div className="absolute top-2 right-2 w-[1px] h-full bg-cyber-cyan" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
