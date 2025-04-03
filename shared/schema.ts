import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the Cultural Heritage Item schema
export const culturalHeritageItems = pgTable("cultural_heritage_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
});

export const insertCulturalHeritageItemSchema = createInsertSchema(culturalHeritageItems).pick({
  title: true,
  description: true,
  imageUrl: true,
  category: true,
});

// Define the Prompt Template schema
export const promptTemplates = pgTable("prompt_templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  category: text("category").notNull(),
});

export const insertPromptTemplateSchema = createInsertSchema(promptTemplates).pick({
  title: true,
  text: true,
  category: true,
});

// Define the User schema (from the original file)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCulturalHeritageItem = z.infer<typeof insertCulturalHeritageItemSchema>;
export type CulturalHeritageItem = typeof culturalHeritageItems.$inferSelect;

export type InsertPromptTemplate = z.infer<typeof insertPromptTemplateSchema>;
export type PromptTemplate = typeof promptTemplates.$inferSelect;
