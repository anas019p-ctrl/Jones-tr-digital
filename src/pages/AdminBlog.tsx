import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Sparkles, Trash2, ExternalLink, X, Save, Image as ImageIcon, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminBlog() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPost, setNewPost] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        category: "AI Technology",
        image_url: "",
        video_url: "",
        is_published: true
    });

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setPosts(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Sei sicuro di voler eliminare questo articolo?")) return;
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (error) {
            toast.error("Errore durante l'eliminazione");
        } else {
            toast.success("Articolo eliminato");
            fetchPosts();
        }
    };

    const handleCreatePost = async () => {
        if (!newPost.title || !newPost.content) {
            toast.error("Titolo e contenuto sono obbligatori");
            return;
        }

        const slug = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
        const finalSlug = `${slug}-${Date.now()}`;

        const { error } = await supabase.from('blog_posts').insert([{
            ...newPost,
            slug: finalSlug,
            author: "Admin"
        }]);

        if (error) {
            toast.error("Errore nella pubblicazione: " + error.message);
        } else {
            toast.success("Articolo pubblicato con successo!");
            setIsDialogOpen(false);
            setNewPost({
                title: "",
                slug: "",
                content: "",
                excerpt: "",
                category: "AI Technology",
                image_url: "",
                video_url: "",
                is_published: true
            });
            fetchPosts();
        }
    };

    return (
        <AdminLayout title="Gestione Blog Completa">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-lg font-medium text-foreground">Articoli e Media</h2>
                        <p className="text-muted-foreground">Gestisci articoli, immagini e video dal centro di controllo.</p>
                    </div>
                    <div className="flex gap-3">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-cyber-purple hover:bg-cyber-purple/80 text-white">
                                    <Plus size={16} /> Nuovo Articolo
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/10 text-foreground">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold gradient-text">Crea Nuovo Articolo</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Titolo</label>
                                            <Input
                                                placeholder="Titolo dell'articolo..."
                                                value={newPost.title}
                                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                                className="bg-background/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Categoria</label>
                                            <Input
                                                placeholder="es. Automazione, Sicurezza..."
                                                value={newPost.category}
                                                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                                className="bg-background/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Riassunto (Excerpt)</label>
                                        <Textarea
                                            placeholder="Breve descrizione per l'anteprima..."
                                            value={newPost.excerpt}
                                            onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                                            className="bg-background/50 h-20"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <ImageIcon size={14} /> URL Immagine
                                            </label>
                                            <Input
                                                placeholder="https://..."
                                                value={newPost.image_url}
                                                onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
                                                className="bg-background/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <Video size={14} /> URL Video (YouTube/Vimeo)
                                            </label>
                                            <Input
                                                placeholder="https://..."
                                                value={newPost.video_url}
                                                onChange={(e) => setNewPost({ ...newPost, video_url: e.target.value })}
                                                className="bg-background/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Contenuto (Markdown supportato)</label>
                                        <Textarea
                                            placeholder="Scrivi l'articolo qui. Usa ## per i titoli..."
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            className="bg-background/50 min-h-[300px] font-mono text-sm"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annulla</Button>
                                        <Button className="bg-cyber-cyan text-void font-bold" onClick={handleCreatePost}>
                                            <Save size={16} className="mr-2" /> Pubblica Ora
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="grid gap-4">
                    {loading ? (
                        <p className="text-center py-20 text-muted-foreground animate-pulse">Sincronizzazione contenuti...</p>
                    ) : posts.length === 0 ? (
                        <Card className="p-10 border-dashed border-2 bg-transparent flex flex-col items-center justify-center text-center text-muted-foreground min-h-[300px]">
                            <p className="mb-4">Il tuo database articoli è vuoto.</p>
                            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Crea il primo post</Button>
                        </Card>
                    ) : (
                        posts.map((post) => (
                            <Card key={post.id} className="p-6 glass-card hover:bg-card/80 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-0.5 rounded-full bg-cyber-purple/10 text-cyber-purple text-[10px] font-bold uppercase tracking-wider border border-cyber-purple/20">
                                            {post.category}
                                        </span>
                                        {post.video_url && (
                                            <span className="flex items-center gap-1 text-[10px] text-accent font-bold uppercase tracking-widest">
                                                <Video size={10} /> Video Inclusivo
                                            </span>
                                        )}
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                            {new Date(post.created_at).toLocaleDateString('it-IT')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-cyber-cyan transition-colors">{post.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1 italic">{post.excerpt || "Nessun riassunto..."}</p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <Link to={`/blog/${post.slug}`} target="_blank">
                                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-cyber-cyan hover:bg-cyber-cyan/10">
                                            <ExternalLink size={18} />
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="icon" className="text-white/40 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(post.id)}>
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
