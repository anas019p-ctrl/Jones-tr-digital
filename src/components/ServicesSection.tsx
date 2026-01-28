import ServiceCard from "./ServiceCard";
import {
  Globe,
  Database,
  Bot,
  Workflow,
  FileCode,
  Monitor,
  Megaphone
} from "lucide-react";
import serviceWebdesign from "@/assets/service-webdesign.jpg";
import serviceDatabase from "@/assets/service-database.jpg";
import serviceAi from "@/assets/service-ai.jpg";
import serviceAutomation from "@/assets/service-automation.jpg";
import serviceApps from "@/assets/service-apps.jpg";
import servicesBg from "@/assets/futuristic_services.png";

const services = [
  {
    icon: Globe,
    title: "Sito Web Professionale",
    description: "Un sito bello e facile da usare che i tuoi clienti ameranno. Funziona perfettamente su telefono e computer.",
    image: serviceWebdesign,
  },
  {
    icon: Database,
    title: "Gestione Dati Semplice",
    description: "Organizziamo i tuoi dati in modo sicuro. Clienti, ordini, appuntamenti: tutto in ordine e sempre accessibile.",
    image: serviceDatabase,
  },
  {
    icon: Bot,
    title: "Assistente AI 24/7",
    description: "Un chatbot intelligente che risponde ai tuoi clienti anche quando dormi. Risparmia tempo prezioso.",
    image: serviceAi,
  },
  {
    icon: Workflow,
    title: "Automazione Completa",
    description: "Automatizziamo le attività ripetitive: email, fatture, promemoria. Tu lavori, il sistema fa il resto.",
    image: serviceAutomation,
  },
  {
    icon: Megaphone,
    title: "Marketing Digitale",
    description: "Campagne pubblicitarie su Facebook, Instagram e Google. Trova nuovi clienti ogni giorno.",
  },
  {
    icon: Monitor,
    title: "App Su Misura",
    description: "Applicazioni personalizzate per gestire il tuo business. Semplici da usare, potenti nei risultati.",
    image: serviceApps,
  },
];

const ServicesSection = () => {
  return (
    <section id="servizi" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${servicesBg})` }}
      />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Cosa Facciamo</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Soluzioni Digitali
            <span className="gradient-text"> Semplici</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Non serve essere esperti di tecnologia. Ti spieghiamo tutto in modo chiaro
            e creiamo gli strumenti giusti per far crescere la tua attività.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              image={service.image}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
