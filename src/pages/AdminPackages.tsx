import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAdminStore } from "@/store/adminStore";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminPackages() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        features: "",
    });

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const { data, error } = await supabase
                .from("services") // Assuming we store packages in services for now, or create a 'packages' table
                .select("*")
                .order("order_index", { ascending: true });

            if (error) throw error;
            setPackages(data || []);
        } catch (error) {
            console.error("Errore caricamento pacchetti:", error);
            toast.error("Impossibile caricare i pacchetti");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (pkg: any = null) => {
        setEditingPackage(pkg);
        if (pkg) {
            setFormData({
                name: pkg.name,
                price: pkg.price,
                description: pkg.description || "",
                features: Array.isArray(pkg.features) ? pkg.features.join("\n") : "",
            });
        } else {
            setFormData({ name: "", price: "", description: "", features: "" });
        }
        setModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const featuresArray = formData.features.split("\n").filter(f => f.trim() !== "");
            const payload = {
                name: formData.name,
                price: formData.price,
                features: featuresArray,
                // description: formData.description 
            };

            let error;
            if (editingPackage) {
                const { error: err } = await supabase
                    .from("services")
                    .update(payload)
                    .eq("id", editingPackage.id);
                error = err;
                toast.success("Pacchetto aggiornato con successo");
            } else {
                const { error: err } = await supabase
                    .from("services")
                    .insert([payload]);
                error = err;
                toast.success("Pacchetto creato con successo");
            }

            if (error) throw error;
            setModalOpen(false);
            fetchPackages();
        } catch (error: any) {
            console.error("Errore salvataggio:", error);
            toast.error(`Errore: ${error.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Sei sicuro di voler eliminare questo pacchetto?")) return;

        try {
            const { error } = await supabase.from("services").delete().eq("id", id);
            if (error) throw error;
            toast.success("Pacchetto eliminato");
            fetchPackages();
        } catch (error) {
            toast.error("Errore durante l'eliminazione");
        }
    }

    return (
        <AdminLayout title="Gestione Pacchetti">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-medium text-foreground">Pacchetti Servizi</h2>
                        <p className="text-muted-foreground">Gestisci i piani offerti ai clienti (Start, Standard, Pro...)</p>
                    </div>
                    <Button onClick={() => handleOpenModal()} className="gap-2">
                        <Plus size={16} /> Nuovo Pacchetto
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <Card key={pkg.id} className="p-6 glass-card flex flex-col justify-between hover-lift">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-xl text-foreground">{pkg.name}</h3>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                        {pkg.price}
                                    </span>
                                </div>

                                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                                    {pkg.features?.slice(0, 4).map((f: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {f}
                                        </li>
                                    ))}
                                    {pkg.features?.length > 4 && <li>...e molto altro</li>}
                                </ul>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-border/50">
                                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleOpenModal(pkg)}>
                                    <Edit size={16} /> Modifica
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(pkg.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Modal Dialog */}
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="sm:max-w-[500px] glass-card border-border">
                        <DialogHeader>
                            <DialogTitle>{editingPackage ? "Modifica Pacchetto" : "Nuovo Pacchetto"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Nome Pacchetto</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Es. Standard"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Prezzo Display</Label>
                                <Input
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="Es. €1290"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Caratteristiche (una per riga)</Label>
                                <Textarea
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    placeholder="Sito Responsive&#10;SEO Base&#10;..."
                                    className="min-h-[150px]"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setModalOpen(false)}>Annulla</Button>
                            <Button onClick={handleSave}>Salva</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
