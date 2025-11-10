import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { FeatureCard } from "@/components/FeatureCard";
import { CustomRequestForm } from "@/components/CustomRequestForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OtherServices } from "@/components/OtherServices";
import {
  Zap,
  Wrench,
  Sparkles,
  Stethoscope,
  GraduationCap,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Star,
  Award,
  HeartHandshake,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
          <div className="inline-flex items-center gap-2 bg-primary-lighter/50 px-6 py-2 rounded-full mb-6">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Trusted by 10,000+ Customers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Welcome to <span className="text-primary">OWNSTORE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your first step to finding the help you need
          </p>
          
          <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
            Connect with verified experts for services & consultancies. From electricians to doctors, we've got you covered 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              Browse Services
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("request")?.scrollIntoView({ behavior: "smooth" })}>
              Custom Request
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Verified Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Best Prices</span>
            </div>
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
              Professional help at your fingertips. Choose from our most popular services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <ServiceCard
              icon={Zap}
              title="Electrician"
              description="Expert electrical repairs and installations"
            />
            <ServiceCard
              icon={Wrench}
              title="Plumber"
              description="Fast and reliable plumbing solutions"
            />
            <ServiceCard
              icon={Sparkles}
              title="Maid"
              description="Professional cleaning services"
            />
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Consultancies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get expert advice from certified professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <ServiceCard
              icon={Stethoscope}
              title="Doctor"
              description="Medical consultation and health advice"
            />
            <ServiceCard
              icon={GraduationCap}
              title="Tutor"
              description="Expert tutoring for all subjects"
            />
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <OtherServices />

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose OWNSTORE?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find and hire the right professional for any job.
            </p>
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
      <section id="about" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <HeartHandshake className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About OWNSTORE
            </h2>
          </div>

          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              OWNSTORE is your trusted platform for connecting with verified service providers
              and professional consultants. We understand that finding reliable help for everyday
              tasks and specialized needs can be challenging, so we've created a solution that
              puts quality and trust first.
            </p>
            
            <p>
              Our platform carefully vets every professional, from electricians and plumbers to
              doctors and tutors, ensuring you always get the best service. Whether you need
              immediate assistance with a household emergency or expert consultation for personal
              growth, OWNSTORE connects you with the right person at the right time.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-12">
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">10,000+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">500+</div>
                <div className="text-muted-foreground">Verified Experts</div>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">4.9/5</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
            </div>

            <p>
              Our mission is simple: to make hiring professionals as easy as a few clicks while
              maintaining the highest standards of quality and reliability. Join thousands of
              satisfied customers who trust OWNSTORE for all their service needs.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Request Section */}
      <section id="request" className="py-20 px-4 bg-primary-lighter/20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Need Something Specific?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Can't find what you're looking for? Tell us what you need, and we'll match you with
              the perfect professional. Whether it's flowers from a specific shop, emergency
              repairs, or anything else - we've got you covered.
            </p>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-xl">
            <CustomRequestForm />
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>We typically respond to custom requests within 30 minutes during business hours.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
