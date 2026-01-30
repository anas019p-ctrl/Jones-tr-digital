import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Sparkles, Trash2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function AdminBlog() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (error) {
            toast.error("Errore durante l'eliminazione");
        } else {
            toast.success("Articolo eliminato");
            fetchPosts();
        }
    };

    return (
        <AdminLayout title="Gestione Blog AI">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-lg font-medium text-foreground">Articoli Pubblicati</h2>
                        <p className="text-muted-foreground">Gestisci i contenuti generati dall'AI o scrivine di nuovi.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10">
                            <Sparkles size={16} /> AI Generate (Auto)
                        </Button>
                        <Button className="gap-2 bg-cyber-purple hover:bg-cyber-purple/80 text-white">
                            <Plus size={16} /> Scrivi Manualmente
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {loading ? (
                        <p className="text-center py-20 text-muted-foreground">Caricamento contenuti...</p>
                    ) : posts.length === 0 ? (
                        <Card className="p-10 border-dashed border-2 bg-transparent flex flex-col items-center justify-center text-center text-muted-foreground min-h-[300px]">
                            <p className="mb-4">Nessun articolo presente ancora.</p>
                            <Button variant="outline">Inizia a scrivere</Button>
                        </Card>
                    ) : (
                        posts.map((post) => (
                            <Card key={post.id} className="p-6 glass-card hover:bg-card/80 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-0.5 rounded-full bg-cyber-cyan/10 text-cyber-cyan text-[10px] font-bold uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">{post.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <Link to={`/blog/${post.slug}`} target="_blank">
                                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-cyber-cyan">
                                            <ExternalLink size={18} />
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="icon" className="text-white/40 hover:text-red-500" onClick={() => handleDelete(post.id)}>
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
