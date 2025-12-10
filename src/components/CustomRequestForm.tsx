import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
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

  useEffect(() => {
    if (serviceName && serviceName !== "Custom Request") {
      setRequest(`I'm interested in the ${serviceName} service. `);
    } else if (serviceName === "Custom Request") {
      setRequest("");
    }
  }, [serviceName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim() || !name.trim() || !phone.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Save to Supabase (Keep your existing database logic)
      const { error } = await supabase
        .from("custom_requests")
        .insert([{ name, phone, request: request || serviceName || "General Inquiry" }]);

      if (error) throw error;

      // 2. Send Email via FormSubmit (Free, No Account Needed)
      // REPLACE "YOUR_EMAIL@GMAIL.COM" WITH YOUR ACTUAL BUSINESS EMAIL
      await fetch("https://formsubmit.co/ajax/main@ownstore.org", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            // These fields will appear in your email
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
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label> 
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-xl h-12"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="request">Describe Your Request</Label>
        <Textarea
          id="request"
          placeholder="Please provide any additional details here..."
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className="min-h-[120px] rounded-xl resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        <Send className="w-5 h-5 mr-2" />
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
};