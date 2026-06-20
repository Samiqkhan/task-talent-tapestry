import { ServiceCard } from "@/components/ServiceCard";
import { Calculator, Stethoscope } from "lucide-react";

interface OtherServicesProps {
  onServiceClick: (serviceName: string) => void;
}

export const OtherServices = ({ onServiceClick }: OtherServicesProps) => {
  const services = [
    {
      icon: Calculator,
      title: "Taxation",
      description: "Professional tax and financial consultation",
    },
    {
      icon: Stethoscope,
      title: "Health Consultation",
      description: "Get professional medical advice and consultation",
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