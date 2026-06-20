export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Annu Domain Exports</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted platform for connecting with verified service providers and consultants.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#request" className="hover:text-primary transition-colors">Custom Request</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Taxation</li>
              <li>Health Consultation</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: main@annudomainexports.com</li>
              <li>Phone: +91 6382 368 791</li>
              <li>Hours: 24/7 Support</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Annu Domain Exports. All rights reserved.</p>
        </div>
        
        {/* Credit */}
        <div className="flex justify-center">
          <div className="text-muted-foreground text-sm">
            Developed by{" "}
            <a
              href="https://portfolio-samiq-khan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80 inline-flex items-center"
            >
              <span className="font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Samiq
              </span>
              <span className="relative flex h-2 w-2 ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
