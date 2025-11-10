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
  const [phone, setPhone] = useState(""); // Changed from email
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
    if (!request.trim() || !name.trim() || !phone.trim()) { // Changed from email
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("custom_requests")
        .insert([{ name, phone, request: request || serviceName || "General Inquiry" }]); // Changed from email

      if (error) throw error;

      toast.success("Request submitted! We'll get back to you soon.");
      setRequest("");
      setName("");
      setPhone(""); // Changed from email
      onSuccess?.(); // Call the success callback to close the modal
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
            type="tel" // Changed from email
            placeholder="Enter your phone number" // Changed placeholder
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Changed from email
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