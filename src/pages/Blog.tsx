import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Blog = () => {
    useEffect(() => {
        document.title = "Intelligence Feed | JONES TR Digital Blog";
    }, []);

    const { data: posts, isLoading } = useQuery({
        queryKey: ["blog_posts"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("blog_posts")
                .select("*")
                .eq("is_published", true)
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    return (
        <div className="min-h-screen pt-32 pb-20 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-40 -left-20 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-40 -right-20 w-80 h-80 bg-cyber-purple/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyber-cyan">
                            Intelligence Feed
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                        JT <span className="gradient-text">BLOG</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Approfondimenti esclusivi, novità dal mondo dell'AI e strategie digitali per dominare il mercato.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(0,242,255,0.4)]" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts?.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="glass-card hover:border-cyber-cyan/50 transition-all duration-500 overflow-hidden flex flex-col h-full">
                                    {/* Post Image Placeholder or Real */}
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={post.image_url || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            alt={post.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-4 right-4 bg-cyber-cyan/20 backdrop-blur-md border border-cyber-cyan/30 px-3 py-1 rounded-full flex items-center gap-2">
                                            <Tag size={12} className="text-cyber-cyan" />
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{post.category}</span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-grow">
                                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 mb-4 uppercase tracking-[0.2em]">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-cyber-cyan" />
                                                {new Date(post.published_at!).toLocaleDateString('it-IT')}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <User size={12} className="text-cyber-purple" />
                                                {post.author}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold mb-4 group-hover:text-cyber-cyan transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-white/60 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-[11px] font-bold text-cyber-cyan uppercase tracking-widest mt-auto group/link"
                                        >
                                            Leggi Articolo
                                            <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>

                                    {/* HUD Decorative Corner */}
                                    <div className="absolute bottom-0 right-0 w-8 h-8 opacity-20 pointer-events-none">
                                        <div className="absolute bottom-1 right-1 w-full h-[1px] bg-cyber-cyan" />
                                        <div className="absolute bottom-1 right-1 w-[1px] h-full bg-cyber-cyan" />
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
