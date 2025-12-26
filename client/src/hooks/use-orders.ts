import { useMutation } from "@tanstack/react-query";
import { api, type CreateOrderInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateOrder() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      // Ensure amounts are numbers
      const payload = {
        ...data,
        totalAmount: Number(data.totalAmount)
      };

      const res = await fetch(api.orders.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }
      return api.orders.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Order Placed Successfully!",
        description: "We will contact you shortly to discuss details.",
      });
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
