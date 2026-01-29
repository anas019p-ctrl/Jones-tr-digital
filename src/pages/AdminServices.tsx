import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Wrench, Check, X } from "lucide-react";
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

export default function AdminServices() {
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
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("order_index", { ascending: true });

            if (error) throw error;
            setServices(data || []);
        } catch (error: any) {
            console.error("Error fetching services:", error);
            toast.error("Errore nel caricamento dei servizi: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            price: "€0",
            order_index: services.length,
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
                toast.success("Servizio aggiornato con successo");
            } else {
                const { error } = await supabase
                    .from("services")
                    .insert([payload]);
                if (error) throw error;
                toast.success("Servizio creato con successo");
            }
            setModalOpen(false);
            fetchServices();
        } catch (error: any) {
            toast.error("Errore durante il salvataggio: " + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Sei sicuro di voler eliminare questo servizio?")) return;

        try {
            const { error } = await supabase
                .from("services")
                .delete()
                .eq("id", id);
            if (error) throw error;
            toast.success("Servizio eliminato");
            fetchServices();
        } catch (error: any) {
            toast.error("Errore durante l'eliminazione: " + error.message);
        }
    };

    return (
        <AdminLayout title="Gestione Servizi">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Servizi Core</h2>
                        <p className="text-muted-foreground">Gestisci i servizi principali e i pacchetti.</p>
                    </div>
                    <Button onClick={() => { resetForm(); setModalOpen(true); }} className="gap-2">
                        <Plus size={16} /> Nuovo Servizio
                    </Button>
                </div>

                <Card className="glass-card border-border/50 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead>Ordine</TableHead>
                                <TableHead>Servizio</TableHead>
                                <TableHead>Prezzo</TableHead>
                                <TableHead>In Risalto</TableHead>
                                <TableHead className="text-right">Azioni</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">Caricamento...</TableCell>
                                </TableRow>
                            ) : services.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        Nessun servizio trovato.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                services.map((service) => (
                                    <TableRow key={service.id} className="hover:bg-primary/5 border-border/50">
                                        <TableCell className="w-16 font-mono font-bold text-primary">#{service.order_index}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                    <Wrench size={16} />
                                                </div>
                                                <span className="font-semibold">{service.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {service.price}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={service.highlighted ? "default" : "secondary"}>
                                                {service.highlighted ? "Sì" : "No"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                                                    <Edit size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(service.id)}>
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="glass-card border-border w-full max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Modifica Servizio" : "Nuovo Servizio"}</DialogTitle>
                            <DialogDescription>Configura i dettagli del servizio o pacchetto.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Nome Servizio</Label>
                                    <Input
                                        placeholder="Es. Sviluppo Web"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Prezzo (Display)</Label>
                                    <Input
                                        placeholder="Es. €590"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Ordine</Label>
                                    <Input
                                        type="number"
                                        value={formData.order_index}
                                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        variant={formData.highlighted ? "default" : "outline"}
                                        onClick={() => setFormData({ ...formData, highlighted: !formData.highlighted })}
                                        className="w-full gap-2"
                                    >
                                        {formData.highlighted ? <Check size={16} /> : <X size={16} />}
                                        In Risalto
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Caratteristiche (Una per riga)</Label>
                                <Textarea
                                    placeholder="Sito Responsive&#10;SEO Base..."
                                    className="min-h-[150px]"
                                    value={featuresText}
                                    onChange={(e) => setFeaturesText(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave}>{editingId ? "Aggiorna" : "Crea"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
