import { Menu, X, Shield, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo3d from '@/assets/logo-3d.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { label: 'Servizi', href: '/#prezzi' },
        { label: 'Chi Siamo', href: '/#chi-siamo' },
        { label: 'Prezzi', href: '/#prezzi' },
        { label: 'FAQ', href: '/#faq' },
        { label: 'Contatti', href: '/#contatti' },
    ];

    const scrollToSection = (href: string) => {
        setIsOpen(false);
        if (location.pathname !== '/') return;

        const id = href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-border/30 transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                        <img src={logo3d} alt="JONES TR" className="w-10 h-10 object-contain relative transition-transform duration-500 group-hover:rotate-[360deg]" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold font-display tracking-tight text-foreground">
                        JONES TR <span className="gradient-text">DIGITAL</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 border-l border-border/50 pl-8">
                        <ThemeToggle />

                        <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Accedi
                        </Link>

                        <button
                            onClick={() => scrollToSection('/#prezzi')}
                            className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                        >
                            Inizia Ora
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 lg:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border text-foreground hover:bg-accent transition-colors"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border animate-in slide-in-from-top duration-300 overflow-hidden">
                    <div className="flex flex-col p-6 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className="px-4 py-4 text-lg font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="h-px bg-border/50 my-4" />
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => scrollToSection('/#prezzi')}
                                className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-bold shadow-lg shadow-primary/10"
                            >
                                Inizia Ora
                            </button>
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 text-muted-foreground py-4 font-medium hover:text-foreground"
                            >
                                <Shield size={18} /> Area Riservata
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
