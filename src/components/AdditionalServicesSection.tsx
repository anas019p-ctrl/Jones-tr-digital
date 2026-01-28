import AdditionalServiceCard from "./AdditionalServiceCard";
import { 
  RefreshCw, 
  Headphones, 
  Layout, 
  Workflow, 
  Languages, 
  Megaphone,
  Video 
} from "lucide-react";

const additionalServices = [
  {
    icon: RefreshCw,
    title: "Manutenzione Mensile",
    description: "Ci occupiamo noi di tutto: aggiornamenti, backup e sicurezza. Tu concentrati sul tuo business.",
  },
  {
    icon: Headphones,
    title: "Assistenza Dedicata",
    description: "Hai un problema? Ti rispondiamo subito. Supporto tecnico veloce e in italiano.",
  },
  {
    icon: Layout,
    title: "Template Pronti all'Uso",
    description: "Siti web già pronti da personalizzare. Lanci il tuo business online in pochi giorni.",
  },
  {
    icon: Workflow,
    title: "Automazione Business",
    description: "Automatizziamo i tuoi processi: fatture, email, appuntamenti. Risparmi tempo e soldi.",
  },
  {
    icon: Megaphone,
    title: "Pubblicità Social",
    description: "Campagne Facebook, Instagram, Google. Raggiungi i tuoi clienti dove passano il tempo.",
  },
  {
    icon: Video,
    title: "Contenuti & Branding",
    description: "Logo, video, post social. Tutto il materiale per far conoscere la tua attività.",
  },
];

const AdditionalServicesSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-card/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-sm font-medium text-accent">Servizi Extra</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Facciamo Crescere il Tuo
            <span className="gradient-text-accent"> Business</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Non devi essere un esperto di tecnologia. Pensiamo a tutto noi, 
            tu pensa ai tuoi clienti.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalServices.map((service) => (
            <AdditionalServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServicesSection;
