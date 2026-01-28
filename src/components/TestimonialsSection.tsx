import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "CEO, TechStart Italia",
    content:
      "JONES TR DIGITAL ha trasformato completamente la nostra presenza online. Il nuovo sito ha aumentato le conversioni del 150% in soli 3 mesi. Professionali e innovativi!",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Sofia Bianchi",
    role: "Founder, Bella Moda",
    content:
      "L'assistente AI che hanno integrato nel nostro e-commerce è incredibile. I clienti adorano l'esperienza e il nostro customer service è migliorato drasticamente.",
    rating: 5,
    avatar: "SB",
  },
  {
    name: "Alessandro Verdi",
    role: "Direttore, Gruppo Verdi",
    content:
      "Le automazioni sviluppate hanno ottimizzato i nostri processi interni, risparmiando ore di lavoro manuale ogni settimana. Investimento che si è ripagato in un mese.",
    rating: 5,
    avatar: "AV",
  },
  {
    name: "Elena Conti",
    role: "Marketing Manager, InnovaHub",
    content:
      "Creatività e competenza tecnica al top. Il team ha capito perfettamente la nostra vision e l'ha tradotta in un design futuristico che ci distingue dalla concorrenza.",
    rating: 5,
    avatar: "EC",
  },
  {
    name: "Lorenzo Ferrari",
    role: "CTO, DataFlow Solutions",
    content:
      "La gestione del database che ci hanno costruito è solida e sicura. Supporto eccellente e sempre disponibili per nuove implementazioni. Partner affidabile!",
    rating: 5,
    avatar: "LF",
  },
  {
    name: "Giulia Martini",
    role: "Owner, Studio Creativo GM",
    content:
      "Dal primo contatto alla consegna, tutto impeccabile. Il CMS è intuitivo e posso aggiornare il sito in autonomia. Consiglio vivamente a tutti!",
    rating: 5,
    avatar: "GM",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-background to-card/20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Cosa Dicono di Noi</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Clienti Soddisfatti
            <span className="gradient-text-accent"> in Tutta Italia</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Le parole dei nostri clienti sono la nostra miglior presentazione. 
            Scopri le loro esperienze.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card p-6 hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-bold text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 text-center">
            <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
              4.9/5
            </div>
            <p className="text-sm text-muted-foreground">Rating medio</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
              150+
            </div>
            <p className="text-sm text-muted-foreground">Progetti completati</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
              98%
            </div>
            <p className="text-sm text-muted-foreground">Clienti soddisfatti</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
              5+
            </div>
            <p className="text-sm text-muted-foreground">Anni di esperienza</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
