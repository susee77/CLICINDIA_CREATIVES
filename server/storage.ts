import { type Page, type InsertPage } from "@shared/schema";

export interface IStorage {
  // Minimal storage for static site
  getStatus(): Promise<string>;
}

export class MemStorage implements IStorage {
  async getStatus(): Promise<string> {
    return "ok";
  }
}

export const storage = new MemStorage();
