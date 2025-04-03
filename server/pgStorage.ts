import { db } from "./db";
import { eq } from "drizzle-orm";
import { 
  users, 
  culturalHeritageItems, 
  promptTemplates,
  type User, 
  type InsertUser, 
  type CulturalHeritageItem, 
  type InsertCulturalHeritageItem, 
  type PromptTemplate, 
  type InsertPromptTemplate 
} from "@shared/schema";
import { IStorage } from "./storage";

export class PgStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
  
  // Cultural Heritage Item methods
  async getCulturalHeritageItems(): Promise<CulturalHeritageItem[]> {
    return await db.select().from(culturalHeritageItems);
  }

  async getCulturalHeritageItemById(id: number): Promise<CulturalHeritageItem | undefined> {
    const result = await db.select().from(culturalHeritageItems).where(eq(culturalHeritageItems.id, id));
    return result[0];
  }

  async getCulturalHeritageItemsByCategory(category: string): Promise<CulturalHeritageItem[]> {
    return await db.select().from(culturalHeritageItems).where(eq(culturalHeritageItems.category, category));
  }

  async createCulturalHeritageItem(item: InsertCulturalHeritageItem): Promise<CulturalHeritageItem> {
    const result = await db.insert(culturalHeritageItems).values(item).returning();
    return result[0];
  }
  
  // Prompt Template methods
  async getPromptTemplates(): Promise<PromptTemplate[]> {
    return await db.select().from(promptTemplates);
  }

  async getPromptTemplateById(id: number): Promise<PromptTemplate | undefined> {
    const result = await db.select().from(promptTemplates).where(eq(promptTemplates.id, id));
    return result[0];
  }

  async getPromptTemplatesByCategory(category: string): Promise<PromptTemplate[]> {
    return await db.select().from(promptTemplates).where(eq(promptTemplates.category, category));
  }

  async createPromptTemplate(template: InsertPromptTemplate): Promise<PromptTemplate> {
    const result = await db.insert(promptTemplates).values(template).returning();
    return result[0];
  }
}