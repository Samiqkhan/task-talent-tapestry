import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Send, Sparkles, ArrowRight, ArrowLeft, Upload, QrCode, Banknote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface CustomRequestFormProps {
  serviceName?: string;
  onSuccess?: () => void;
}

export const CustomRequestForm = ({ serviceName, onSuccess }: CustomRequestFormProps) => {
  const [step, setStep] = useState(1); // 1 = Details, 2 = Payment
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [request, setRequest] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick tags for users to click
  const quickTags = [
    "Food Delivery", 
    "Medicine", 
    "Gift Pickup", 
    "House Cleaning",
    "Courier",
    "Repair"
  ];

  // Your Specific Details
  const UPI_ID = "jonesarock79703-1@okaxis"; 
  const QR_CODE_IMAGE = "/Qr_code.jpeg"; 

  useEffect(() => {
    if (serviceName && serviceName !== "Custom Request") {
      setRequest(`I'm interested in the ${serviceName} service. `);
    } else if (serviceName === "Custom Request") {
      setRequest("");
    }
  }, [serviceName]);

  const addTag = (tag: string) => {
    setRequest((prev) => prev ? `${prev}, ${tag}` : `I need ${tag}`);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim() || !name.trim() || !phone.trim()) {
      toast.error("Please fill in all fields first");
      return;
    }
    setStep(2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    // Only require file if payment is online
    if (paymentMethod === "online" && !file) {
      toast.error("Please upload the payment screenshot");
      return;
    }

    setIsSubmitting(true);
    try {
      let publicUrl = null;

      // 1. Upload Image only if Online Payment is selected
      if (paymentMethod === "online" && file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('payment_uploads')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('payment_uploads')
          .getPublicUrl(fileName);
        
        publicUrl = url;
      }

      // 2. Save to Database
      const { error: dbError } = await supabase
        .from("custom_requests")
        .insert([{ 
          name, 
          phone, 
          request: request || serviceName || "General Inquiry",
          payment_screenshot_url: publicUrl,
          status: paymentMethod === "cod" ? "COD - Pending" : "Online - Pending"
        }]);

      if (dbError) throw dbError;

      // 3. Send Email
      await fetch("https://formsubmit.co/ajax/main@ownstore.org", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Title: "New Order Request", 
            PaymentMethod: paymentMethod.toUpperCase(),
            Name: name,
            Phone: phone,
            Request: request,
            PaymentProof: publicUrl || "N/A (Cash on Delivery)"
        })
      });

      toast.success("Request submitted successfully!");
      
      // Reset Form
      setRequest("");
      setName("");
      setPhone("");
      setFile(null);
      setStep(1);
      onSuccess?.();

    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* STEP 1: DETAILS */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
          
          {(!serviceName || serviceName === "Custom Request") && (
            <div className="space-y-3">
              <Label className="text-muted-foreground text-sm">Quick Select</Label>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="text-xs bg-secondary/50 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all rounded-full px-3 py-1.5 font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="request" className="text-base font-semibold">What do you need?</Label>
            <Textarea
              id="request"
              placeholder="e.g., I need 2 Chicken Biryanis..."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className="min-h-[120px] rounded-xl resize-none text-base border-2 focus-visible:ring-primary/20 focus-visible:border-primary"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl h-12 bg-secondary/20 border-transparent focus:border-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label> 
              <Input
                id="phone"
                required
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl h-12 bg-secondary/20 border-transparent focus:border-input"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Next: Payment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      )}

      {/* STEP 2: PAYMENT */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          
          {/* Payment Method Selector */}
          <div className="flex p-1 bg-secondary rounded-xl gap-1">
            <button 
              onClick={() => setPaymentMethod("online")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                paymentMethod === "online" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <QrCode className="w-4 h-4" /> Online
            </button>
            <button 
              onClick={() => setPaymentMethod("cod")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                paymentMethod === "cod" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Banknote className="w-4 h-4" /> Cash on Delivery
            </button>
          </div>

          {paymentMethod === "online" ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-4 bg-secondary/20 p-6 rounded-2xl border border-dashed border-primary/30">
                <h3 className="font-semibold text-lg">Scan & Pay</h3>
                <div className="bg-white p-3 w-fit mx-auto rounded-lg shadow-sm">
                  <img 
                    src={QR_CODE_IMAGE} 
                    alt="Payment QR" 
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">UPI ID</p>
                  <div className="font-mono bg-background py-2 px-4 rounded-md border inline-flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-primary" />
                    {UPI_ID}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="screenshot">Upload Payment Screenshot *</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="screenshot" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors border-muted-foreground/25">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {file ? <span className="text-primary font-semibold">{file.name}</span> : "Click to upload screenshot"}
                      </p>
                    </div>
                    <Input 
                      id="screenshot" 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-secondary/20 rounded-2xl border border-dashed border-primary/30 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Banknote className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Cash on Delivery</h3>
              <p className="text-muted-foreground">
                Pay in cash directly to our delivery executive when you receive your order.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={() => setStep(1)}
              className="flex-1 h-12 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-[2] h-12 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? "Submitting..." : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {paymentMethod === "cod" ? "Place COD Order" : "Confirm Order"}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};