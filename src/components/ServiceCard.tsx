import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price?: string; // Add this prop
  onClick: () => void;
}

export const ServiceCard = ({ icon: Icon, title, description, price, onClick }: ServiceCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-16 h-16" />
      </div>
      
      <div className="mb-4 bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {/* Price Display */}
      {price && (
        <div className="text-lg font-bold text-primary mb-2">
          {price}
        </div>
      )}
      
      <div className="text-sm font-semibold text-primary group-hover:underline">
        Book Now →
      </div>
    </div>
  );
};