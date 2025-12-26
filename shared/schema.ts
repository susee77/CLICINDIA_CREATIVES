// Static website schema - no CRUD needed
// This schema is minimal as the website is static
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Simple table for any future needs
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertPageSchema = createInsertSchema(pages).omit({ id: true });

export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
