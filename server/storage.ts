import {
  type DesignIdea,
  type InsertDesignIdea,
  type Order,
  type InsertOrder,
} from "@shared/schema";
import { designIdeas, orders } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Design Ideas
  getDesignIdeas(): Promise<DesignIdea[]>;
  createDesignIdea(idea: InsertDesignIdea & { generatedImageUrl?: string }): Promise<DesignIdea>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  async getDesignIdeas(): Promise<DesignIdea[]> {
    return await db.select().from(designIdeas);
  }

  async createDesignIdea(idea: InsertDesignIdea & { generatedImageUrl?: string }): Promise<DesignIdea> {
    const [newIdea] = await db.insert(designIdeas).values(idea).returning();
    return newIdea;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
}

export const storage = new DatabaseStorage();
