import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Tag, Share2, Clock } from "lucide-react";

const BlogPost = () => {
    const { slug } = useParams();

    const { data: post, isLoading } = useQuery({
        queryKey: ["blog_post", slug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("blog_posts")
                .select("*")
                .eq("slug", slug)
                .single();
            if (error) throw error;
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!post) return <div className="min-h-screen pt-32 text-center text-white">Articolo non trovato</div>;

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-cyber-cyan transition-colors text-xs font-mono tracking-widest uppercase mb-8">
                        <ArrowLeft size={14} /> Torna al Feed
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-cyber-cyan" />
                            {new Date(post.published_at!).toLocaleDateString('it-IT')}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User size={14} className="text-cyber-purple" />
                            {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-yellow-400" />
                            5 Min Lettura
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Tag size={12} className="text-cyber-cyan" />
                            <span className="text-white">{post.category}</span>
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Main Image */}
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/5 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <img
                            src={post.image_url || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"}
                            className="w-full h-full object-cover"
                            alt={post.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="glass-card p-8 md:p-12 relative">
                        {/* HUD decorative elements */}
                        <div className="absolute top-0 left-10 w-20 h-1 bg-gradient-to-r from-cyber-cyan to-transparent" />
                        <div className="absolute top-10 left-0 w-1 h-20 bg-gradient-to-b from-cyber-cyan to-transparent" />

                        <div className="prose prose-invert prose-cyan max-w-none 
                            prose-headings:font-display prose-headings:gradient-text
                            text-white/80 leading-relaxed text-lg">
                            {post.content.split('\n').map((paragraph, i) => (
                                <p key={i} className="mb-6">{paragraph}</p>
                            ))}
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                            <div className="flex gap-4">
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-cyber-cyan/20 transition-colors">
                                    <Share2 size={18} className="text-white/60" />
                                </button>
                            </div>
                            <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                                Intelligence Digest #1024
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPost;
