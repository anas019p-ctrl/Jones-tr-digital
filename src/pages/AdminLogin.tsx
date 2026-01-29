import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Shield, Loader2, Mail, Lock } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        if (!email) {
            toast.error("Inserisci la tua email prima");
            return;
        }

        setIsResetting(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin`,
            });

            if (error) throw error;
            toast.success("Email di reset inviata! Controlla la tua casella di posta.");
        } catch (error: any) {
            toast.error(error.message || "Errore nell'invio dell'email");
        } finally {
            setIsResetting(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success("Accesso eseguito");
            navigate("/admin");
        } catch (error: any) {
            console.error("Login Error:", error);
            if (error.message.includes("Invalid login credentials")) {
                toast.error("Credenziali non valide. Controlla email e password.");
            } else if (error.message.includes("Email not confirmed")) {
                toast.error("Email non confermata. Controlla la tua casella di posta.");
            } else {
                toast.error(error.message || "Errore durante il login");
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="absolute top-4 left-4 z-50">
                <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                    <Shield className="w-4 h-4 mr-2" /> Torna al Sito
                </Button>
            </div>

            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md p-8 glass-card relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4">
                        <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-foreground">Admin Portal</h1>
                    <p className="text-sm text-muted-foreground">Area riservata JONES TR DIGITAL</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@jonestr.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Accedi"}
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full text-sm text-muted-foreground hover:text-primary"
                        onClick={handleForgotPassword}
                        disabled={isResetting}
                    >
                        {isResetting ? "Invio in corso..." : "Password Dimenticata?"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
