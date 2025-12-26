import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type CreateDesignIdeaInput } from "@shared/routes";

export function useDesignIdeas() {
  return useQuery({
    queryKey: [api.designIdeas.list.path],
    queryFn: async () => {
      const res = await fetch(api.designIdeas.list.path);
      if (!res.ok) throw new Error("Failed to fetch design ideas");
      return api.designIdeas.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateDesignIdea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateDesignIdeaInput) => {
      const res = await fetch(api.designIdeas.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create design idea");
      return api.designIdeas.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.designIdeas.list.path] });
    },
  });
}

export function useGenerateImage() {
  return useMutation({
    mutationFn: async (prompt: string) => {
      const res = await fetch(api.designIdeas.generateImage.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Failed to generate image");
      return api.designIdeas.generateImage.responses[200].parse(await res.json());
    },
  });
}
