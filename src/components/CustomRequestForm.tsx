import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PhoneCall } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CustomRequestFormProps {
  serviceName?: string;
  onSuccess?: () => void;
}

export const CustomRequestForm = ({ serviceName, onSuccess }: CustomRequestFormProps) => {
  const [items, setItems] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);



  useEffect(() => {
    if (serviceName && serviceName !== "Custom Request") {
      setItems([serviceName]);
    } else {
      setItems([]);
    }
  }, [serviceName]);



  const addItem = () => {
    if (currentItem.trim()) {
      if (!items.includes(currentItem.trim())) {
        setItems([...items, currentItem.trim()]);
      }
      setCurrentItem("");
    }
  };

  const removeItem = (indexToRemove: number) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0 && !currentItem.trim()) {
      toast.error("Please add at least one item to your request");
      return;
    }

    // Include the current typed item if they forgot to press Enter/+
    let finalItems = [...items];
    if (currentItem.trim() && !finalItems.includes(currentItem.trim())) {
      finalItems.push(currentItem.trim());
      setItems(finalItems);
      setCurrentItem("");
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in your name, phone number, and address");
      return;
    }

    setIsSubmitting(true);
    const compiledRequest = `${finalItems.join(", ")} | Address: ${address}`;

    try {
      // 1. Save to Database
      const { error: dbError } = await supabase
        .from("custom_requests")
        .insert([{ 
          name, 
          phone, 
          request: compiledRequest || "General Inquiry",
          payment_screenshot_url: null,
          status: "Order Placed"
        }]);

      if (dbError) throw dbError;

      // 2. Send Email
      await fetch("https://formsubmit.co/ajax/main@ownstore.org", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Title: "New Order Request (No Payment)", 
            Name: name,
            Phone: phone,
            Request: compiledRequest,
            CallInstruction: "For further order, call on +91 63823 68791"
        })
      });

      toast.success("Order submitted successfully!");
      setIsSubmitted(true);
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

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-4 space-y-6 animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Order Placed!</h3>
          <p className="text-muted-foreground">
            Thank you for ordering with Annu Domain Exports. We are processing your request.
          </p>
        </div>
        
        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 space-y-3">
          <p className="text-sm text-muted-foreground">For further orders or urgent updates, call us:</p>
          <a 
            href="tel:+916382368791" 
            className="text-xl font-bold text-primary hover:underline flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <PhoneCall className="w-5 h-5" />
            +91 63823 68791
          </a>
        </div>

        <Button 
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setItems([]);
            setName("");
            setPhone("");
            setAddress("");
          }}
          className="w-full h-12 rounded-xl"
        >
          Place Another Order
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
      


      {(!serviceName || serviceName === "Custom Request") && (
        <div className="space-y-3">
          <Label htmlFor="item-input" className="text-base font-semibold">What do you need?</Label>
          <div className="flex gap-2">
            <Input
              id="item-input"
              type="text"
              placeholder='Type an item (e.g. "chicken", "rice") and press Enter'
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-xl h-12 bg-secondary/20 border-transparent focus:border-input flex-1"
            />
            <Button 
              type="button" 
              onClick={addItem}
              className="rounded-xl h-12 px-4 bg-primary text-white hover:bg-primary/90 font-bold text-lg"
            >
              +
            </Button>
          </div>

          {/* List of items */}
          {items.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {items.map((item, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1.5 text-sm font-medium animate-fade-in"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors text-xs font-bold text-primary"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

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

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label> 
        <Input
          id="address"
          required
          placeholder="Enter your full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-xl h-12 bg-secondary/20 border-transparent focus:border-input"
        />
      </div>

      <div className="space-y-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          size="lg" 
          className="w-full h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          {isSubmitting 
            ? "Submitting..." 
            : (!serviceName || serviceName === "Custom Request" ? "Place Order" : "Book Service")}
        </Button>
      </div>
    </form>
  );
};