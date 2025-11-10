import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onClick?: () => void;
}

export const ServiceCard = ({ icon: Icon, title, description, onClick }: ServiceCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 group-hover:bg-primary-light transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary-foreground" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground text-center">{description}</p>
      )}
    </div>
  );
};