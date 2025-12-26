import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const designIdeas = pgTable("design_ideas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  generatedImageUrl: text("generated_image_url"),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  serviceType: text("service_type").notNull(), // e.g. "Poster Design", "Meta Ads"
  packageDetails: text("package_details"), // e.g. "5 Posters"
  totalAmount: integer("total_amount").notNull(),
  status: text("status").default("pending"), // pending, completed
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===
// No complex relations for now

// === BASE SCHEMAS ===
export const insertDesignIdeaSchema = createInsertSchema(designIdeas).omit({ id: true, createdAt: true, generatedImageUrl: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, status: true });

// === EXPLICIT API CONTRACT TYPES ===

// Base types
export type DesignIdea = typeof designIdeas.$inferSelect;
export type InsertDesignIdea = z.infer<typeof insertDesignIdeaSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

// Request types
export type CreateDesignIdeaRequest = InsertDesignIdea;
export type CreateOrderRequest = InsertOrder;

// Response types
export type DesignIdeaResponse = DesignIdea;
export type OrderResponse = Order;

// Image Generation
export interface GenerateImageRequest {
  prompt: string;
}
export interface GenerateImageResponse {
  imageUrl: string;
}
