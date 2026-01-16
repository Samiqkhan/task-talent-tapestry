import { ServiceCard } from "@/components/ServiceCard";
import {
  ChefHat,
  Hammer,
  PaintBucket,
  Wrench,
  Car,
  Snowflake,
  ShieldCheck,
  Calculator, // Added for Taxation
  Sparkles, // Added for Beautician
  Stethoscope,
  Zap, // Added for Medician
} from "lucide-react";

interface OtherServicesProps {
  onServiceClick: (serviceName: string) => void;
}

export const OtherServices = ({ onServiceClick }: OtherServicesProps) => {
  const services = [
    { icon: Zap, title: "Electrician", description: "Expert electrical repairs and installations" },
    { icon: Hammer, title: "Carpenter", description: "Expert carpentry work" },
    { icon: PaintBucket, title: "Painter", description: "Quality painting services" },
    { icon: Wrench, title: "Mechanic", description: "Vehicle repairs" },
    { icon: Car, title: "Driver", description: "Professional driving" },
    { icon: Snowflake, title: "AC Tech", description: "AC repair & maintenance" },
    { icon: Wrench, title: "Plumber", description: "Fast and reliable plumbing solutions" },
    {
      icon: Calculator,
      title: "Taxation & Insurance",
      description: "Tax and insurance filing",
    },
    {
      icon: Sparkles,
      title: "Beautician",
      description: "Beauty & salon services",
    },
    {
      icon: Stethoscope,
      title: "Medician",
      description: "Home medical services",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Other Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More professionals ready to help with your everyday needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                onClick={() => onServiceClick(service.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};