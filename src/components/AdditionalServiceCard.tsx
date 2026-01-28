import { LucideIcon } from "lucide-react";

interface AdditionalServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const AdditionalServiceCard = ({ icon: Icon, title, description }: AdditionalServiceCardProps) => {
  return (
    <div className="group flex items-start gap-4 p-6 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h4 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AdditionalServiceCard;
