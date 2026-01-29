import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Wrench, Check, X, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminPrices() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        order_index: 0,
        highlighted: false
    });
    const [featuresText, setFeaturesText] = useState("");

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            // Fetch only extra services (non-highlighted) or all, 
            // but for "Prices/Management" we focus on non-highlighted extras like maintenance
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .eq("highlighted", false)
                .order("order_index", { ascending: true });

            if (error) throw error;
            setServices(data || []);
        } catch (error: any) {
            console.error("Error fetching extra services:", error);
            toast.error("Errore nel caricamento dei servizi di manutenzione: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            price: "€0/mese",
            order_index: services.length + 10,
            highlighted: false
        });
        setFeaturesText("");
        setEditingId(null);
    };

    const handleEdit = (service: any) => {
        setFormData({
            name: service.name || "",
            price: service.price || "",
            order_index: service.order_index || 0,
            highlighted: service.highlighted || false
        });
        setFeaturesText(Array.isArray(service.features) ? service.features.join("\n") : "");
        setEditingId(service.id);
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.name) {
            toast.error("Il nome è obbligatorio");
            return;
        }

        const payload = {
            ...formData,
            features: featuresText.split("\n").filter(f => f.trim() !== "")
        };

        try {
            if (editingId) {
                const { error } = await supabase
                    .from("services")
                    .update(payload)
                    .eq("id", editingId);
                if (error) throw error;
                toast.success("Servizio di manutenzione aggiornato");
            } else {
                const { error } = await supabase
                    .from("services")
                    .insert([payload]);
                if (error) throw error;
                toast.success("Nuovo servizio di manutenzione creato");
            }
            setModalOpen(false);
            fetchServices();
        } catch (error: any) {
            toast.error("Errore durante il salvataggio: " + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Sei sicuro di voler eliminare questo servizio di manutenzione?")) return;

        try {
            const { error } = await supabase
                .from("services")
                .delete()
                .eq("id", id);
            if (error) throw error;
            toast.success("Servizio rimosso");
            fetchServices();
        } catch (error: any) {
            toast.error("Errore durante l'eliminazione: " + error.message);
        }
    };

    return (
        <AdminLayout title="Gestione Manutenzione & Extra">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Servizi di Manutenzione</h2>
                        <p className="text-muted-foreground">Gestisci i prezzi e le caratteristiche per la manutenzione e i servizi extra.</p>
                    </div>
                    <Button onClick={() => { resetForm(); setModalOpen(true); }} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Plus size={16} /> Nuovo Servizio
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-muted-foreground animate-pulse">Caricamento in corso...</div>
                    ) : services.length === 0 ? (
                        <Card className="col-span-full p-12 text-center glass-card border-dashed">
                            <p className="text-muted-foreground">Nessun servizio di manutenzione trovato.</p>
                            <Button variant="link" onClick={() => { resetForm(); setModalOpen(true); }}>Aggiungine uno ora</Button>
                        </Card>
                    ) : (
                        services.map((service) => (
                            <Card key={service.id} className="glass-card p-6 flex flex-col justify-between hover-lift relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <ShieldCheck size={80} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                            <Wrench size={20} />
                                        </div>
                                        <h3 className="font-bold text-lg">{service.name}</h3>
                                    </div>
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold text-primary">{service.price}</span>
                                    </div>
                                    <ul className="space-y-2 mb-6">
                                        {service.features?.slice(0, 3).map((f: string, i: number) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                                <Check size={12} className="text-primary" /> {f}
                                            </li>
                                        ))}
                                        {service.features?.length > 3 && (
                                            <li className="text-xs text-muted-foreground italic">+{service.features.length - 3} altre caratteristiche...</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="flex gap-2 relative z-10 pt-4 border-t border-border/50">
                                    <Button variant="ghost" size="sm" className="flex-1 gap-2" onClick={() => handleEdit(service)}>
                                        <Edit size={14} /> Modifica
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(service.id)}>
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="glass-card border-border w-full max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Modifica Servizio" : "Nuovo Servizio Manutenzione"}</DialogTitle>
                            <DialogDescription>Imposta i dettagli per il servizio di manutenzione o extra.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Nome</Label>
                                    <Input
                                        placeholder="Es. Manutenzione Avanzata"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Prezzo (Es. €50/mese)</Label>
                                    <Input
                                        placeholder="Es. €50/mese"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Ordine Visualizzazione</Label>
                                    <Input
                                        type="number"
                                        value={formData.order_index}
                                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="flex items-end text-xs text-muted-foreground italic pb-2">
                                    Nota: Questi servizi appariranno nella sezione "Servizi Extra" del sito.
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Dettagli/Caratteristiche (Una per riga)</Label>
                                <Textarea
                                    placeholder="Backup Giornalieri&#10;Update Sicurezza&#10;Assistenza WhatsApp..."
                                    className="min-h-[150px]"
                                    value={featuresText}
                                    onChange={(e) => setFeaturesText(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">{editingId ? "Aggiorna Prezzo" : "Crea Servizio"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
