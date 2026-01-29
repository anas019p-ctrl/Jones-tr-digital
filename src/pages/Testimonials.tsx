import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: 'Marco Rossi',
            company: 'Gioielleria Rossi',
            rating: 5,
            quote: 'Il sito è bellissimo e i risultati sono stati immediati. In 3 mesi +150K di vendite!',
            avatar: '👨‍💼'
        },
        {
            id: 2,
            name: 'Francesca Bianchi',
            company: 'Studio Legale De Luca',
            rating: 5,
            quote: 'Professionali, veloci e calorosi. Il sito ha trasformato come i clienti ci vedono.',
            avatar: '👩‍⚖️'
        },
        {
            id: 3,
            name: 'Luca Verdi',
            company: 'Digital Agency Nexus',
            rating: 5,
            quote: 'Incredibile come riescono a combinare design e funzionalità. Un vero valore aggiunto.',
            avatar: '👨‍💼'
        },
        {
            id: 4,
            name: 'Elena Ferrari',
            company: 'E-commerce Fashion',
            rating: 5,
            quote: 'Supporto eccezionale e soluzioni innovative. Consiglio JONES TR DIGITAL a tutti.',
            avatar: '👩‍💼'
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-background min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                        Storie di <span className="gradient-text">Successo</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        La nostra migliore pubblicità sono i sorrisi e i risultati dei nostri clienti.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-card p-10 relative group"
                        >
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="#22d3ee" className="text-primary" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-foreground text-xl leading-relaxed mb-8 italic relative z-10">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-foreground text-lg">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-primary uppercase tracking-widest font-medium">
                                        {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
