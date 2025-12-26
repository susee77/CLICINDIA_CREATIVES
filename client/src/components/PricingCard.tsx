import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCreateOrder } from "@/hooks/use-orders";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface PricingItem {
  name: string;
  price: number;
}

interface PricingCardProps {
  title: string;
  items: PricingItem[];
  color?: string;
  icon?: React.ReactNode;
}

export function PricingCard({ title, items, color = "bg-primary", icon }: PricingCardProps) {
  const [selectedItem, setSelectedItem] = useState<PricingItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const createOrder = useCreateOrder();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    if (!formData.name || !formData.email) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }

    createOrder.mutate({
      customerName: formData.name,
      customerEmail: formData.email,
      serviceType: title,
      packageDetails: selectedItem.name,
      totalAmount: selectedItem.price,
    }, {
      onSuccess: () => {
        setFormOpen(false);
        setFormData({ name: "", email: "" });
      }
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 shadow-2xl backdrop-blur-sm group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`} />
      
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-20 text-white`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold font-display tracking-tight">{title}</h3>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors border border-transparent hover:border-white/5 cursor-default">
            <span className="text-muted-foreground font-medium">{item.name}</span>
            <span className="text-lg font-bold text-foreground">₹{item.price.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogTrigger asChild>
          <button className={`w-full py-4 rounded-xl font-bold text-white shadow-lg ${color} hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group-hover:shadow-${color.replace('bg-', '')}/50`}>
            Choose Plan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-display gradient-text">Order {title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Select Package</label>
              <div className="grid gap-2">
                {items.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedItem?.name === item.name ? `border-primary bg-primary/10 ring-1 ring-primary` : 'border-border hover:border-primary/50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold">₹{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Your Name</label>
                <input
                  id="name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={createOrder.isPending || !selectedItem}
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createOrder.isPending ? "Processing..." : `Place Order${selectedItem ? ` • ₹${selectedItem.price}` : ''}`}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
