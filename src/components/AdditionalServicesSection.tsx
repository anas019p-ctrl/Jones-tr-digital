import { useState, useEffect } from "react";
import AdditionalServiceCard from "./AdditionalServiceCard";
import { supabase } from "@/integrations/supabase/client";
import {
  RefreshCw,
  Headphones,
  Layout,
  Workflow,
  Megaphone,
  Video,
  Wrench
} from "lucide-react";

const iconMap: Record<string, any> = {
  "Manutenzione": RefreshCw,
  "Assistenza": Headphones,
  "Template": Layout,
  "Automazione": Workflow,
  "Pubblicità": Megaphone,
  "Contenuti": Video
};

const AdditionalServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) throw error;

        // Map database records to UI structure
        const mappedServices = data?.filter(s => !s.highlighted).map(s => ({
          icon: iconMap[s.name.split(' ')[0]] || Wrench,
          title: s.name,
          description: s.features?.join(". ") || "Servizio professionale personalizzato."
        })) || [];

        setServices(mappedServices);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading || services.length === 0) return null;

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
          {services.map((service) => (
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
