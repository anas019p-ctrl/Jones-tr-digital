import { useState, useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const GDPRBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("gdpr-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("gdpr-consent", "accepted");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 animate-fade-in-up">
            <div className="glass-card p-6 shadow-2xl border-primary/20 bg-background/95 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-display font-bold text-foreground mb-2">Privacy & Cookie</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Usiamo i cookie per migliorare la tua esperienza futuristica sul nostro sito.
                            Accettando, consenti l'uso di tecnologie per analisi e personalizzazione.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button size="sm" variant="hero" onClick={handleAccept}>
                                Accetta Tutto
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setIsVisible(false)}>
                                Rifiuta
                            </Button>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GDPRBanner;
