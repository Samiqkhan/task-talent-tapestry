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
  CardContent,
  CardHeader,
  CardTitle,
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
} from "lucide-react";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openServiceForm = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Service Request Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="bg-primary p-6 text-white text-center relative overflow-hidden">
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
          
          <div className="p-6 bg-background">
            <CustomRequestForm
              serviceName={selectedService}
              onSuccess={() => setIsFormOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-32 pb-20 px-4 relative overflow-hidden bg-gradient-to-br from-primary-lighter/30 to-background"
      >
        <div className="absolute top-20 right-10 opacity-10">
          <Zap className="w-32 h-32 text-primary" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-10">
          <Wrench className="w-24 h-24 text-primary" />
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Welcome to <span className="text-primary">OWNSTORE</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your personal concierge for services & delivery.
          </p>

          <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
            Connect with verified experts or order anything you need. From
            electricians to custom deliveries, we've got you covered 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full px-8 h-12 text-lg shadow-md transition-transform hover:scale-105"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Browse Services
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 text-lg border-2"
              onClick={() => openServiceForm("Custom Request")}
            >
              Order Anything
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Top Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional help at your fingertips.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <ServiceCard
              icon={Zap}
              title="Electrician"
              description="Expert electrical repairs and installations"
              onClick={() => openServiceForm("Electrician")}
            />
            <ServiceCard
              icon={Wrench}
              title="Plumber"
              description="Fast and reliable plumbing solutions"
              onClick={() => openServiceForm("Plumber")}
            />
            <ServiceCard
              icon={Sparkles}
              title="Maid"
              description="Professional cleaning services"
              onClick={() => openServiceForm("Maid")}
            />
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Consultancies
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <ServiceCard
              icon={Stethoscope}
              title="Doctor"
              description="Medical consultation and health advice"
              onClick={() => openServiceForm("Doctor")}
            />
            <ServiceCard
              icon={GraduationCap}
              title="Tutor"
              description="Career Guidance"
              onClick={() => openServiceForm("Tutor")}
            />
          </div>
        </div>
      </section>

      {/* Custom Request Section */}
      <section id="request" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Anything Else?
            </h2>
            <p className="text-lg text-muted-foreground">
              Food, Medicine, or a special gift? We'll get it for you.
            </p>
          </div>

          {/* Simple, Attractive Card for the Form */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
             <div className="h-2 bg-gradient-to-r from-primary to-purple-500"></div>
             <div className="p-8">
                <CustomRequestForm serviceName="Custom Request" />
             </div>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <OtherServices onServiceClick={openServiceForm} />

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose OWNSTORE?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Verified Experts"
              description="All our service providers are thoroughly vetted and verified for your safety and peace of mind."
            />
            <FeatureCard
              icon={Clock}
              title="24/7 Availability"
              description="Need help urgently? Our platform operates round the clock to connect you with available professionals."
            />
            <FeatureCard
              icon={Award}
              title="Best Quality"
              description="We ensure only top-rated professionals with excellent reviews join our platform."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <HeartHandshake className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About OWNSTORE
            </h2>
          </div>

          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p className="text-center">
              OWNSTORE is your trusted platform for connecting with verified
              service providers and professional consultants.
            </p>

            <Card className="bg-background border-primary/10 shadow-lg mt-8">
              <CardHeader className="flex flex-row items-center justify-center gap-4 pb-2">
                <Target className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl font-bold text-primary">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-lg text-foreground/90">
                  To make hiring professionals and getting deliveries as easy as
                  a few clicks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;