import { Menu, X, Shield, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Servizi', href: '/#prezzi' },
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
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 border border-cyber-cyan/50 rounded-lg flex items-center justify-center bg-cyan-950/20 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00F2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold tracking-tight uppercase text-white">
                        JONES TR <span className="text-cyber-cyan">DIGITAL</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-8">
                        <Link to="/login" className="text-xs font-bold uppercase text-white/70 hover:text-cyber-cyan transition-colors">
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
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-cyber-cyan p-2"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
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
