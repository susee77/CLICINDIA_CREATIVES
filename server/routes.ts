import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { registerImageRoutes } from "./replit_integrations/image";
import { openai } from "./replit_integrations/image/client";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Register image generation routes from integration
  registerImageRoutes(app);

  // Design Ideas
  app.get(api.designIdeas.list.path, async (req, res) => {
    const ideas = await storage.getDesignIdeas();
    res.json(ideas);
  });

  app.post(api.designIdeas.create.path, async (req, res) => {
    try {
      const input = api.designIdeas.create.input.parse(req.body);
      
      // Auto-generate image based on title/description if not provided (though this route is mainly for metadata)
      // In a real app, you might trigger this separately or queue it. 
      // For now, we'll just save the idea. The actual generation is handled by the dedicated generate endpoint.
      
      const idea = await storage.createDesignIdea(input);
      res.status(201).json(idea);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.designIdeas.generateImage.path, async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ message: "Prompt is required" });

        const response = await openai.images.generate({
            model: "gpt-image-1",
            prompt,
            n: 1,
            size: "1024x1024",
        });

        const imageUrl = response.data[0].url;
        if (!imageUrl) throw new Error("Failed to generate image URL");
        
        res.json({ imageUrl });

    } catch (error) {
        console.error("Image generation error:", error);
        res.status(500).json({ message: "Failed to generate image" });
    }
  });

  // Orders
  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
    const existingIdeas = await storage.getDesignIdeas();
    if (existingIdeas.length === 0) {
        await storage.createDesignIdea({
            title: "Modern Minimalist Poster",
            description: "A clean, typography-focused poster design for a tech conference.",
            category: "Poster",
            generatedImageUrl: "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhcGhpYyUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D" 
        });
         await storage.createDesignIdea({
            title: "Vibrant Social Media Ad",
            description: "Colorful and energetic social media post for a summer sale.",
            category: "Social Media",
            generatedImageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JhcGhpYyUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
        });
    }
}
