import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Non sono bravo con la tecnologia. Posso usare comunque i vostri servizi?",
    answer:
      "Assolutamente sì! Tutto ciò che creiamo è pensato per essere semplice. Ti insegniamo passo passo come usare ogni strumento e siamo sempre disponibili se hai domande. Non devi essere un esperto di computer.",
  },
  {
    question: "Quanto tempo ci vuole per avere il mio sito online?",
    answer:
      "Un sito base è pronto in 2-3 settimane. Progetti più complessi richiedono 4-6 settimane. Ti diamo sempre una data precisa prima di iniziare, così sai esattamente quando sarà pronto.",
  },
  {
    question: "Cosa succede se ho bisogno di aiuto dopo?",
    answer:
      "Non ti lasciamo mai solo! Tutti i piani includono supporto. Puoi chiamarci, scriverci o inviarci un messaggio. Rispondiamo sempre in italiano e in tempi rapidi.",
  },
  {
    question: "Posso modificare il sito da solo?",
    answer:
      "Certo! Ti diamo accesso a un pannello semplice dove puoi cambiare testi e immagini senza bisogno di chiamarci. È facile come scrivere su WhatsApp. E se ti blocchi, ci siamo noi.",
  },
  {
    question: "Come funziona l'assistente AI per i clienti?",
    answer:
      "È come avere un dipendente che lavora 24 ore su 24. Risponde alle domande più comuni dei tuoi clienti, prende appuntamenti e raccoglie contatti. Tu poi vedi tutto dal telefono.",
  },
  {
    question: "Quanto costa e come pago?",
    answer:
      "I prezzi sono scritti chiari sul sito. Niente sorprese. Puoi pagare con bonifico, carta o PayPal. Per progetti grandi dividiamo il pagamento: 30% all'inizio, il resto alla consegna.",
  },
  {
    question: "Il mio sito sarà trovato su Google?",
    answer:
      "Sì! Tutti i nostri siti sono costruiti per essere trovati su Google. Usiamo le tecniche giuste perché i tuoi clienti ti trovino quando cercano i tuoi servizi.",
  },
  {
    question: "Lavorate solo con aziende grandi?",
    answer:
      "Al contrario! Siamo specializzati in piccole e medie imprese. Negozi, professionisti, artigiani, ristoranti... Capiamo le tue esigenze perché lavoriamo con attività come la tua ogni giorno.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden bg-card/20">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Domande
            <span className="gradient-text"> Frequenti</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Trova le risposte alle domande più comuni sui nostri servizi. 
            Non trovi quello che cerchi? Contattaci!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card border-none px-6 data-[state=open]:bg-primary/5"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center">
          <div className="glass-card inline-block px-8 py-6">
            <p className="text-muted-foreground mb-4">
              Hai altre domande? Siamo qui per aiutarti!
            </p>
            <a
              href="#contatti"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Contattaci ora
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
