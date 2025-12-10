import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CustomRequestFormProps {
  serviceName?: string;
  onSuccess?: () => void;
}

export const CustomRequestForm = ({ serviceName, onSuccess }: CustomRequestFormProps) => {
  const [request, setRequest] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick tags for users to click
  const quickTags = [
    "🍔 Food Delivery", 
    "💊 Medicine", 
    "🎁 Gift Pickup", 
    "🧹 House Cleaning",
    "📦 Courier",
    "🔧 Repair"
  ];

  useEffect(() => {
    if (serviceName && serviceName !== "Custom Request") {
      setRequest(`I'm interested in the ${serviceName} service. `);
    } else if (serviceName === "Custom Request") {
      setRequest("");
    }
  }, [serviceName]);

  const addTag = (tag: string) => {
    // Remove the emoji for the text input
    const cleanTag = tag.substring(2); 
    setRequest((prev) => prev ? `${prev}, ${cleanTag}` : `I need ${cleanTag}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim() || !name.trim() || !phone.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Save to Supabase
      const { error } = await supabase
        .from("custom_requests")
        .insert([{ name, phone, request: request || serviceName || "General Inquiry" }]);

      if (error) throw error;

      // 2. Send Email via FormSubmit
      // REPLACE "YOUR_EMAIL@GMAIL.COM" WITH YOUR ACTUAL BUSINESS EMAIL
      await fetch("https://formsubmit.co/ajax/admin@ownstore.org", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Title: "New Order Request", 
            Name: name,
            Phone: phone,
            Request: request || serviceName || "General Inquiry"
        })
      });

      toast.success("Request submitted! We'll get back to you soon.");
      setRequest("");
      setName("");
      setPhone("");
      onSuccess?.();
    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Quick Tags Section */}
      {(!serviceName || serviceName === "Custom Request") && (
        <div className="space-y-3">
          <Label className="text-muted-foreground text-sm">Quick Select (Click to add)</Label>
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
        <Label htmlFor="request" className="text-base font-semibold">
          What do you need?
        </Label>
        <Textarea
          id="request"
          placeholder="e.g., I need 2 Chicken Biryanis from XYZ Restaurant..."
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
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Send Request
          </>
        )}
      </Button>
    </form>
  );
};