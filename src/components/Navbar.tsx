import { Menu, X, Shield, Moon, Sun, Smartphone, Zap, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "next-themes";

const Logo3D = () => (
    <motion.div
        className="relative group cursor-pointer"
        whileHover={{ scale: 1.05 }}
    >
        <motion.div
            className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#0a0a1f] border border-cyan-500/30 overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.2)]"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
            animate={{
                rotateY: [0, 15, -15, 0],
                rotateX: [0, -10, 10, 0]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {/* 3D layers for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* Floating Letters */}
            <motion.span
                className="text-2xl font-black text-white relative z-10 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                animate={{ translateZ: [10, 20, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                JT
            </motion.span>

            {/* Glow highlight that moves */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                animate={{
                    x: ['-100%', '100%'],
                    y: ['-100%', '100%']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>

        {/* Particle-like orbit */}
        <motion.div
            className="absolute -inset-2 border border-cyan-400/20 rounded-xl"
            animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
    </motion.div>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Servizi', href: '/#servizi' },
        { label: 'Chi Siamo', href: '/#chi-siamo' },
        { label: 'Prezzi', href: '/#prezzi' },
        { label: 'FAQ', href: '/#faq' },
        { label: 'Contatti', href: '/#contatti' },
    ];

    const scrollToSection = (href: string) => {
        setIsOpen(false);
        if (!href.startsWith('/#')) return;
        const id = href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isOpen ? 'bg-[#030305]/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
            }`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-4 group">
                    <Logo3D />
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter text-white leading-none">
                            JONES TR
                        </span>
                        <span className="text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase mt-0.5">
                            Digital
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8 mr-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className="text-xs font-bold tracking-[0.15em] uppercase text-white/60 hover:text-cyan-400 transition-all duration-300 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 border-l border-white/10 pl-10">
                        <Link to="/come-funziona" className="text-xs font-bold uppercase tracking-widest text-white/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                            <Zap size={14} className="text-cyan-400" /> Come Funziona
                        </Link>
                        <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-white/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                            <Globe size={14} className="text-cyan-400" /> Blog
                        </Link>

                        <button
                            onClick={() => scrollToSection('/#prezzi')}
                            className="relative group px-6 py-2.5 bg-cyan-500 rounded-lg text-[#030305] font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-white">Inizia Ora</span>
                            <div className="absolute inset-0 bg-[#030305] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-cyan-400 p-2 relative"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={28} /></motion.div> :
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu size={28} /></motion.div>}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden absolute top-full left-0 w-full bg-[#030305]/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="p-8 flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-sm font-black uppercase tracking-[0.2em] text-white/80 hover:text-cyan-400 transition-colors inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-4"
                            >
                                <button
                                    onClick={() => scrollToSection('/#prezzi')}
                                    className="w-full bg-cyan-400 text-[#030305] font-black py-4 rounded-xl shadow-[0_0_30px_rgba(0,242,255,0.2)]"
                                >
                                    INIZIA ORA
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
