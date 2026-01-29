import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image_url: string;
    result: string;
    testimonial: string;
    client_name: string;
}

const ProjectsManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            // @ts-ignore
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error("Failed to load projects");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        const newProject: Project = {
            id: "temp-" + Date.now(),
            title: "Nuovo Progetto",
            category: "E-commerce",
            description: "",
            image_url: "",
            result: "",
            testimonial: "",
            client_name: "",
        };
        setProjects([newProject, ...projects]);
    };

    const handleSave = async (project: Project) => {
        setIsSaving(true);
        try {
            const isNew = project.id.startsWith("temp-");
            const projectData = { ...project };
            if (isNew) {
                // @ts-ignore
                delete projectData.id;
            }

            // @ts-ignore
            const { error } = isNew
                ? await supabase.from("projects").insert([projectData])
                : await supabase.from("projects").update(projectData).eq("id", project.id);

            if (error) throw error;

            toast.success(isNew ? "Progetto creato!" : "Progetto aggiornato!");
            fetchProjects();
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error("Errore durante il salvataggio");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (id.startsWith("temp-")) {
            setProjects(projects.filter((p) => p.id !== id));
            return;
        }

        if (!confirm("Sei sicuro di voler eliminare questo progetto?")) return;

        try {
            // @ts-ignore
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) throw error;
            toast.success("Progetto eliminato");
            setProjects(projects.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Errore durante l'eliminazione");
        }
    };

    const updateLocal = (id: string, field: keyof Project, value: string) => {
        setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
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
                <h2 className="text-2xl font-bold text-foreground">Gestione Portfolio</h2>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus size={18} /> Aggiungi Progetto
                </Button>
            </div>

            <div className="grid gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="p-6 glass-card">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Titolo</label>
                                    <Input
                                        value={project.title}
                                        onChange={(e) => updateLocal(project.id, "title", e.target.value)}
                                        placeholder="Es: E-commerce Gioielleria"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Categoria</label>
                                    <Input
                                        value={project.category}
                                        onChange={(e) => updateLocal(project.id, "category", e.target.value)}
                                        placeholder="Es: E-commerce, B2B, Professionale"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">URL Immagine</label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={project.image_url}
                                            onChange={(e) => updateLocal(project.id, "image_url", e.target.value)}
                                            placeholder="https://..."
                                        />
                                        <Button variant="outline" size="icon">
                                            <ImageIcon size={18} />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Descrizione</label>
                                    <Textarea
                                        value={project.description}
                                        onChange={(e) => updateLocal(project.id, "description", e.target.value)}
                                        placeholder="Descrizione breve del progetto..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Risultato Ottenuto</label>
                                    <Input
                                        value={project.result}
                                        onChange={(e) => updateLocal(project.id, "result", e.target.value)}
                                        placeholder="Es: +150K vendite, +80 contatti/mese"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Nome Cliente</label>
                                    <Input
                                        value={project.client_name}
                                        onChange={(e) => updateLocal(project.id, "client_name", e.target.value)}
                                        placeholder="Es: Mario Rossi"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Testimonianza</label>
                                    <Textarea
                                        value={project.testimonial}
                                        onChange={(e) => updateLocal(project.id, "testimonial", e.target.value)}
                                        placeholder="Cosa dice il cliente..."
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(project.id)}
                                        className="gap-1"
                                    >
                                        <Trash2 size={16} /> Elimina
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => handleSave(project)}
                                        disabled={isSaving}
                                        className="gap-1"
                                    >
                                        <Save size={16} /> {isSaving ? "Salvataggio..." : "Salva"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProjectsManager;
