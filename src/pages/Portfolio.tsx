import { motion } from 'framer-motion';

export default function Portfolio() {
    const projects = [
        {
            id: 1,
            title: 'E-commerce Gioielleria',
            category: 'E-commerce',
            image: '/projects/gioielleria.jpg',
            result: '+€150K vendite online',
            testimonial: '"Abbiamo triplicato le vendite in 3 mesi"',
            client: 'Gioielleria Rossi'
        },
        {
            id: 2,
            title: 'Studio Legale Moderno',
            category: 'Professionale',
            image: '/projects/studio-legale.jpg',
            result: '+80 contatti/mese',
            testimonial: '"Il sito ha trasformato il nostro business"',
            client: 'Studio Legale De Luca'
        },
        {
            id: 3,
            title: 'Agenzia Marketing',
            category: 'B2B',
            image: '/projects/agenzia.jpg',
            result: '+200% visibilità online',
            testimonial: '"Professionalità e risultati concreti"',
            client: 'Digital Agency Nexus'
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-background min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                        I Nostri <span className="gradient-text">Progetti</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Una selezione dei nostri migliori lavori. Ogni progetto è una storia di successo
                        e trasformazione digitale.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass-card hover-lift group"
                        >
                            {/* Image Placeholder */}
                            <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 
                            flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/10 group-hover:scale-110 transition-transform duration-500" />
                                <span className="text-primary text-6xl relative z-10 group-hover:scale-110 transition-transform">📱</span>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-primary font-medium mb-4 uppercase tracking-widest">{project.category}</p>

                                <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                    <p className="text-primary font-bold">
                                        {project.result}
                                    </p>
                                </div>

                                <p className="italic text-muted-foreground mb-6 leading-relaxed">
                                    {project.testimonial}
                                </p>

                                <div className="pt-6 border-t border-border/50">
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Cliente</span>
                                    <span className="font-bold text-foreground">{project.client}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
