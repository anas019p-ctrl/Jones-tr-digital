import { Menu, X, Shield, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useTheme } from "next-themes";

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
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-void/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Purple/Blue Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 blur-xl rounded-full animate-pulse" />
                        <div className="relative w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center bg-void/50 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:border-cyber-cyan/50 transition-all duration-500">
                            <span className="text-xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent tracking-tighter">JT</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight uppercase dark:text-white text-void leading-none">
                            JONES TR
                        </span>
                        <span className="text-[10px] font-black tracking-[0.3em] text-cyber-cyan uppercase">
                            Digital
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className="text-[11px] font-medium tracking-[0.2em] uppercase dark:text-white/70 text-void/70 hover:dark:text-white hover:text-void transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-8">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-cyber-cyan"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        )}
                        <Link to="/login" className="text-xs font-bold uppercase dark:text-white/70 text-void/70 hover:text-cyber-cyan transition-colors">
                            Accedi
                        </Link>
                        <button
                            onClick={() => scrollToSection('/#prezzi')}
                            className="px-5 py-2.5 bg-cyber-cyan text-void font-bold text-xs rounded-lg shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:scale-105 transition-all"
                        >
                            Inizia Ora
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 lg:hidden">
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-cyber-cyan"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-cyber-cyan p-2"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-void/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className="text-sm font-bold uppercase tracking-widest text-white/70"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => scrollToSection('/#prezzi')}
                        className="w-full bg-cyber-cyan text-void font-bold py-4 rounded-xl shadow-lg shadow-cyber-cyan/20"
                    >
                        Inizia Ora
                    </button>
                </div>
            )}
        </nav>
    );
}
