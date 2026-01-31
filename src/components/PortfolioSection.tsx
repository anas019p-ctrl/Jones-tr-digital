import { motion } from "framer-motion";
import { ExternalLink, Cpu, Layout, Activity } from "lucide-react";

const portfolioItems = [
    {
        title: "EcoSystem Dashboard",
        category: "Business Intelligence",
        image: "/images/showcase/dashboard.png",
        icon: <Layout size={20} className="text-cyan-400" />,
        desc: "Interfaccia analitica avanzata per il monitoraggio in tempo reale delle performance aziendali."
    },
    {
        title: "AI Automation Hub",
        category: "Intelligenza Artificiale",
        image: "/images/showcase/automation.png",
        icon: <Cpu size={20} className="text-purple-400" />,
        desc: "Sistema di automazione flussi di lavoro basato su nodi neurali per la massima efficienza."
    },
    {
        title: "Next-Gen Web Portal",
        category: "Design Responsivo",
        image: "/images/showcase/responsive.png",
        icon: <Activity size={20} className="text-blue-400" />,
        desc: "Esperienza web immersiva ottimizzata per ogni dispositivo, dal mobile al desktop 4K."
    }
];

const PortfolioSection = () => {
    return (
        <section id="portfolio" className="relative py-24 md:py-40 overflow-hidden bg-[#020205]">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full" />
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        Digital Showcase
                    </motion.div>
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 max-w-4xl mx-auto leading-[0.9]">
                        Soluzioni <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Immersive</span> per il tuo Business
                    </h2>
                    <p className="text-gray-400 text-xl font-medium max-w-2xl mx-auto">
                        Esplora come trasformiamo concetti complessi in interfacce digitali premium e funzionali.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {portfolioItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            {/* Image Container with Cyber Frame */}
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_40px_rgba(0,242,255,0.15)]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay with Glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                                {/* Decorative Tech Lines */}
                                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-cyan-500/50 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-cyan-500/50 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{item.category}</p>
                                        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-black text-white/40 group-hover:text-white transition-colors pt-2">
                                    <span>DISCOVER CASE STUDY</span>
                                    <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
