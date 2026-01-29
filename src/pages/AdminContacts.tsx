import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, User, Phone, Building, Calendar, MessageSquare, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AdminContacts() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("contact_requests")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setRequests(data || []);
        } catch (error: any) {
            console.error("Error fetching contact requests:", error);
            toast.error("Errore nel caricamento delle richieste: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Sei sicuro di voler eliminare questa richiesta?")) return;

        try {
            const { error } = await supabase
                .from("contact_requests")
                .delete()
                .eq("id", id);
            if (error) throw error;
            toast.success("Richiesta eliminata");
            fetchRequests();
        } catch (error: any) {
            toast.error("Errore durante l'eliminazione: " + error.message);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const { error } = await supabase
                .from("contact_requests")
                .update({ read: true })
                .eq("id", id);
            if (error) throw error;
            toast.success("Messaggio segnato come letto");
            fetchRequests();
        } catch (error: any) {
            toast.error("Errore: " + error.message);
        }
    };

    return (
        <AdminLayout title="Richieste di Contatto">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Messaggi Ricevuti</h2>
                        <p className="text-muted-foreground">Gestisci i lead e le richieste di contatto dal sito.</p>
                    </div>
                    <Button variant="outline" onClick={fetchRequests} className="gap-2">
                        <Calendar size={16} /> Ricarica
                    </Button>
                </div>

                {loading ? (
                    <div className="py-20 text-center animate-pulse text-muted-foreground">Caricamento messaggi...</div>
                ) : requests.length === 0 ? (
                    <Card className="p-12 text-center glass-card border-dashed">
                        <p className="text-muted-foreground">Nessuna richiesta di contatto trovata.</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {requests.map((req) => (
                            <Card key={req.id} className={cn(
                                "glass-card p-6 hover:bg-card/80 transition-all border-l-4",
                                req.read ? "border-l-border" : "border-l-primary"
                            )}>
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2 text-foreground font-bold">
                                                <User size={18} className="text-primary" />
                                                {req.name}
                                            </div>
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                                {req.service_interest || "Informazioni Generali"}
                                            </Badge>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar size={14} />
                                                {new Date(req.created_at).toLocaleString('it-IT')}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Mail size={16} />
                                                <a href={`mailto:${req.email}`} className="hover:text-primary transition-colors">{req.email}</a>
                                            </div>
                                            {req.phone && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Phone size={16} />
                                                    <a href={`tel:${req.phone}`} className="hover:text-primary transition-colors">{req.phone}</a>
                                                </div>
                                            )}
                                            {req.company && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Building size={16} />
                                                    {req.company}
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-background/50 p-4 rounded-xl border border-border/50 relative group">
                                            <MessageSquare size={16} className="absolute -top-2 -left-2 text-primary opacity-50" />
                                            <p className="text-foreground whitespace-pre-wrap">{req.message}</p>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col gap-2 justify-end">
                                        {!req.read && (
                                            <Button variant="outline" size="sm" className="gap-2" onClick={() => markAsRead(req.id)}>
                                                <CheckCircle2 size={16} /> Letto
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 gap-2" onClick={() => handleDelete(req.id)}>
                                            <Trash2 size={16} /> Elimina
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
