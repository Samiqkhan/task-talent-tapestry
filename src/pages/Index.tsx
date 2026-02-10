import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { FeatureCard } from "@/components/FeatureCard";
import { CustomRequestForm } from "@/components/CustomRequestForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OtherServices } from "@/components/OtherServices";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Zap,
  Wrench,
  Sparkles,
  Stethoscope,
  GraduationCap,
  Shield,
  Clock,
  Award,
  HeartHandshake,
  Target,
  ShoppingBag,
  Music,
} from "lucide-react";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const openServiceForm = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsFormOpen(true);
  };

  const toggleMusic = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Music Element */}
      <audio id="bg-music" loop>
        <source src="/mysong.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Toggle Button */}
      {/* <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={toggleMusic}
          size="icon"
          className={`rounded-full shadow-lg w-12 h-12 transition-all ${
            isPlaying ? "bg-primary animate-pulse" : "bg-secondary text-foreground"
          }`}
        >
          <Music className={`w-6 h-6 ${isPlaying ? "animate-spin" : ""}`} />
        </Button>
      </div> */}

      <Navbar />

      {/* Service Request Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
          <div className="bg-primary p-6 text-white text-center relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <DialogHeader className="relative z-10">
              <div className="mx-auto bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                 <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center text-white">
                {selectedService === "Custom Request" ? "Place an Order" : `Book ${selectedService}`}
              </DialogTitle>
              <DialogDescription className="text-white/80 text-center text-base">
                {selectedService === "Custom Request" 
                  ? "We'll handle the purchase and delivery for you." 
                  : "Fill in the details below"}
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="p-6 bg-background overflow-y-auto">
            <CustomRequestForm
              serviceName={selectedService}
              onSuccess={() => setIsFormOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 relative overflow-hidden bg-gradient-to-br from-primary-lighter/30 to-background">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Welcome to <span className="text-primary">OWNSTORE</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your personal concierge for services & delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 h-12 text-lg shadow-md hover:scale-105" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              Browse Services
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-lg border-2" onClick={() => openServiceForm("Custom Request")}>
              Order Anything
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          {/* <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Top Services</h2>
            <p className="text-muted-foreground">Professional help at transparent prices</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <ServiceCard
              icon={Zap}
              title="Electrician"
              description="Expert electrical repairs and installations"
              price="₹199"
              onClick={() => openServiceForm("Electrician")}
            />
            <ServiceCard
              icon={Wrench}
              title="Plumber"
              description="Fast and reliable plumbing solutions"
              price="₹149"
              onClick={() => openServiceForm("Plumber")}
            />
            <ServiceCard
              icon={Sparkles}
              title="Maid"
              description="Professional cleaning services"
              price="₹299"
              onClick={() => openServiceForm("Maid")}
            />
          </div> */}

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Consultancies</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <ServiceCard
              icon={Stethoscope}
              title="Doctor"
              description="Medical consultation and health advice"
              price="₹499"
              onClick={() => openServiceForm("Doctor")}
            />
            <ServiceCard
              icon={GraduationCap}
              title="EduTech"
              description="A full-edge educational consultancy for all your learning needs"
              price="₹4,999"
              onClick={() => openServiceForm("EduTech")}
            />
          </div>
        </div>
      </section>

      {/* Custom Request Section */}
      <section id="request" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-foreground mb-4">Super Pack</h2>
            <p className="text-muted-foreground">Order food, medicine, or any custom delivery</p>
          </div>
          <div className="bg-white dark:bg-card rounded-2xl shadow-xl overflow-hidden border border-border p-8">
             <CustomRequestForm serviceName="Custom Request" />
          </div>
        </div>
      </section>

      <OtherServices onServiceClick={openServiceForm} />

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <FeatureCard icon={Shield} title="Verified Experts" description="Thoroughly vetted professionals." />
            <FeatureCard icon={Clock} title="24/7 Availability" description="Help whenever you need it." />
            <FeatureCard icon={Award} title="Best Quality" description="Top-rated professionals only." />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;