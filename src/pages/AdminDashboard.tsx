import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Users, MessageSquare, LayoutDashboard, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
    const [session, setSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate("/login");
            } else {
                setSession(session);
            }
            setIsLoading(false);
        });
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.success("Logged out");
        navigate("/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-64 bg-card/50 border-r border-border p-6 hidden md:block">
                <div className="mb-10">
                    <h2 className="font-display font-bold text-xl gradient-text">JONES TR</h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Admin Control</p>
                </div>

                <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-2 bg-primary/10 text-primary">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <MessageSquare className="w-4 h-4" /> Richieste
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Users className="w-4 h-4" /> Clienti
                    </Button>
                </nav>

                <div className="mt-auto pt-10">
                    <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/20 hover:bg-destructive/10" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold font-display">Bentornato, Admin</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium">{session?.user?.email}</p>
                            <p className="text-xs text-muted-foreground">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="glass-card p-6">
                        <p className="text-sm text-muted-foreground mb-1">Totale Richieste</p>
                        <h3 className="text-4xl font-bold font-display">24</h3>
                    </div>
                    <div className="glass-card p-6">
                        <p className="text-sm text-muted-foreground mb-1">Nuovi Messaggi</p>
                        <h3 className="text-4xl font-bold font-display text-primary">12</h3>
                    </div>
                    <div className="glass-card p-6">
                        <p className="text-sm text-muted-foreground mb-1">Tasso Conversione</p>
                        <h3 className="text-4xl font-bold font-display text-accent">18%</h3>
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold font-display mb-6">Attività Recenti</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Nuova richiesta da Rossi Web S.r.l.</p>
                                        <p className="text-xs text-muted-foreground">Piano Pro • 2 ore fa</p>
                                    </div>
                                </div>
                                <Button variant="link" className="text-primary hover:text-primary/80">Dettagli</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
