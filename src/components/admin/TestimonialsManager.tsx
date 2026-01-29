import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Star, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
    id: string;
    client_name: string;
    company: string;
    rating: number;
    quote: string;
    avatar: string;
}

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from("testimonials" as any)
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setTestimonials(data || []);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            toast.error("Failed to load testimonials");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        const newTestimonial: Testimonial = {
            id: "temp-" + Date.now(),
            client_name: "Nuovo Cliente",
            company: "",
            rating: 5,
            quote: "",
            avatar: "",
        };
        setTestimonials([newTestimonial, ...testimonials]);
    };

    const handleSave = async (testimonial: Testimonial) => {
        setIsSaving(true);
        try {
            const isNew = testimonial.id.startsWith("temp-");
            const testimonialData = { ...testimonial };
            if (isNew) {
                // @ts-ignore
                delete testimonialData.id;
            }

            const { error } = isNew
                ? await supabase.from("testimonials" as any).insert([testimonialData])
                : await supabase.from("testimonials" as any).update(testimonialData).eq("id", testimonial.id);

            if (error) throw error;

            toast.success(isNew ? "Recensione creata!" : "Recensione aggiornata!");
            fetchTestimonials();
        } catch (error) {
            console.error("Error saving testimonial:", error);
            toast.error("Errore durante il salvataggio");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (id.startsWith("temp-")) {
            setTestimonials(testimonials.filter((t) => t.id !== id));
            return;
        }

        if (!confirm("Eliminare questa recensione?")) return;

        try {
            const { error } = await supabase.from("testimonials" as any).delete().eq("id", id);
            if (error) throw error;
            toast.success("Recensione eliminata");
            setTestimonials(testimonials.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            toast.error("Errore durante l'eliminazione");
        }
    };

    const updateLocal = (id: string, field: keyof Testimonial, value: any) => {
        setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Gestione Testimonianze</h2>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus size={18} /> Aggiungi Recensione
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {testimonials.map((t) => (
                    <Card key={t.id} className="p-6 glass-card flex flex-col">
                        <div className="space-y-4 flex-grow">
                            <div className="flex gap-4">
                                <div className="flex-grow">
                                    <label className="text-sm font-medium mb-1 block">Nome Cliente</label>
                                    <Input
                                        value={t.client_name}
                                        onChange={(e) => updateLocal(t.id, "client_name", e.target.value)}
                                    />
                                </div>
                                <div className="w-24">
                                    <label className="text-sm font-medium mb-1 block">Rating (1-5)</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={t.rating}
                                        onChange={(e) => updateLocal(t.id, "rating", parseInt(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Azienda</label>
                                <Input
                                    value={t.company}
                                    onChange={(e) => updateLocal(t.id, "company", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Testo Recensione</label>
                                <Textarea
                                    value={t.quote}
                                    onChange={(e) => updateLocal(t.id, "quote", e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Avatar URL / Emoji</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={t.avatar}
                                        onChange={(e) => updateLocal(t.id, "avatar", e.target.value)}
                                        placeholder="Es: 👨‍💼 o https://..."
                                    />
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                        {t.avatar ? (t.avatar.length < 5 ? t.avatar : <User size={20} />) : <User size={20} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-6 border-t mt-4">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(t.id)}
                                className="gap-1"
                            >
                                <Trash2 size={16} />
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => handleSave(t)}
                                disabled={isSaving}
                                className="gap-1"
                            >
                                <Save size={16} /> Salva
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsManager;
