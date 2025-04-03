import type { Express } from "express";
import { createServer, type Server } from "http";
import { PgStorage } from "./pgStorage";
import { insertCulturalHeritageItemSchema, insertPromptTemplateSchema } from "@shared/schema";

// Use PostgreSQL storage
const storage = new PgStorage();

export async function registerRoutes(app: Express): Promise<Server> {
  // Cultural Heritage Item Routes
  app.get("/api/cultural-heritage", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      if (category) {
        const items = await storage.getCulturalHeritageItemsByCategory(category);
        return res.json(items);
      }
      
      const items = await storage.getCulturalHeritageItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cultural heritage items" });
    }
  });

  app.get("/api/cultural-heritage/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const item = await storage.getCulturalHeritageItemById(id);
      if (!item) {
        return res.status(404).json({ error: "Cultural heritage item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cultural heritage item" });
    }
  });

  app.post("/api/cultural-heritage", async (req, res) => {
    try {
      const parseResult = insertCulturalHeritageItemSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid cultural heritage item data", details: parseResult.error });
      }
      
      const newItem = await storage.createCulturalHeritageItem(parseResult.data);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to create cultural heritage item" });
    }
  });

  // Prompt Template Routes
  app.get("/api/prompt-templates", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      if (category) {
        const templates = await storage.getPromptTemplatesByCategory(category);
        return res.json(templates);
      }
      
      const templates = await storage.getPromptTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompt templates" });
    }
  });

  app.get("/api/prompt-templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const template = await storage.getPromptTemplateById(id);
      if (!template) {
        return res.status(404).json({ error: "Prompt template not found" });
      }
      
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompt template" });
    }
  });

  app.post("/api/prompt-templates", async (req, res) => {
    try {
      const parseResult = insertPromptTemplateSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid prompt template data", details: parseResult.error });
      }
      
      const newTemplate = await storage.createPromptTemplate(parseResult.data);
      res.status(201).json(newTemplate);
    } catch (error) {
      res.status(500).json({ error: "Failed to create prompt template" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
