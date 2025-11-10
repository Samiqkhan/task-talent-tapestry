import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

export const CustomRequestForm = () => {
  const [request, setRequest] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim() || !name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Request submitted! We'll get back to you soon.");
    setRequest("");
    setName("");
    setEmail("");
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
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl h-12"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="request">Describe Your Request</Label>
        <Textarea
          id="request"
          placeholder="E.g., 'Need flowers from a specific shop', 'Fix my broken window', 'Need emergency plumbing', or anything else!"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className="min-h-[120px] rounded-xl resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full md:w-auto">
        <Send className="w-5 h-5 mr-2" />
        Submit Request
      </Button>
    </form>
  );
};
