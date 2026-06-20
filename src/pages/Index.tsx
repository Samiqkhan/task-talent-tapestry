import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { CustomRequestForm } from "@/components/CustomRequestForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OtherServices } from "@/components/OtherServices";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Shield,
  Clock,
  Award,
  ShoppingBag,
} from "lucide-react";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const openServiceForm = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsFormOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
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
      <section id="home" className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/10 via-primary/5 to-background text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
        
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-none animate-in slide-in-from-top-8 duration-500">
            Welcome to <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Annu Domain Export</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium animate-in slide-in-from-top-12 duration-700">
            Your premium gateway for verified professional services. Seamlessly manage taxation filing and connect with certified health consultants.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in slide-in-from-bottom-8 duration-1000">
            <Button 
              onClick={() => scrollToSection("services")}
              size="lg" 
              className="h-12 px-6 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-all hover:scale-105 shadow-md shadow-primary/20"
            >
              Explore Services
            </Button>
            <Button 
              onClick={() => scrollToSection("request")}
              variant="outline" 
              size="lg" 
              className="h-12 px-6 rounded-xl font-bold border-primary/20 hover:bg-primary/5 transition-all hover:scale-105"
            >
              Custom Request
            </Button>
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

      <div id="services" className="scroll-mt-20">
        <OtherServices onServiceClick={openServiceForm} />
      </div>

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