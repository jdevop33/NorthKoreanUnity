import { users, type User, type InsertUser, type CulturalHeritageItem, type InsertCulturalHeritageItem, type PromptTemplate, type InsertPromptTemplate } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cultural Heritage Item methods
  getCulturalHeritageItems(): Promise<CulturalHeritageItem[]>;
  getCulturalHeritageItemById(id: number): Promise<CulturalHeritageItem | undefined>;
  getCulturalHeritageItemsByCategory(category: string): Promise<CulturalHeritageItem[]>;
  createCulturalHeritageItem(item: InsertCulturalHeritageItem): Promise<CulturalHeritageItem>;
  
  // Prompt Template methods
  getPromptTemplates(): Promise<PromptTemplate[]>;
  getPromptTemplateById(id: number): Promise<PromptTemplate | undefined>;
  getPromptTemplatesByCategory(category: string): Promise<PromptTemplate[]>;
  createPromptTemplate(template: InsertPromptTemplate): Promise<PromptTemplate>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private culturalHeritageItems: Map<number, CulturalHeritageItem>;
  private promptTemplates: Map<number, PromptTemplate>;
  private currentUserId: number;
  private currentCulturalHeritageItemId: number;
  private currentPromptTemplateId: number;

  constructor() {
    this.users = new Map();
    this.culturalHeritageItems = new Map();
    this.promptTemplates = new Map();
    this.currentUserId = 1;
    this.currentCulturalHeritageItemId = 1;
    this.currentPromptTemplateId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Cultural Heritage Item methods
  async getCulturalHeritageItems(): Promise<CulturalHeritageItem[]> {
    return Array.from(this.culturalHeritageItems.values());
  }

  async getCulturalHeritageItemById(id: number): Promise<CulturalHeritageItem | undefined> {
    return this.culturalHeritageItems.get(id);
  }

  async getCulturalHeritageItemsByCategory(category: string): Promise<CulturalHeritageItem[]> {
    return Array.from(this.culturalHeritageItems.values())
      .filter(item => item.category === category);
  }

  async createCulturalHeritageItem(item: InsertCulturalHeritageItem): Promise<CulturalHeritageItem> {
    const id = this.currentCulturalHeritageItemId++;
    const newItem: CulturalHeritageItem = { ...item, id };
    this.culturalHeritageItems.set(id, newItem);
    return newItem;
  }

  // Prompt Template methods
  async getPromptTemplates(): Promise<PromptTemplate[]> {
    return Array.from(this.promptTemplates.values());
  }

  async getPromptTemplateById(id: number): Promise<PromptTemplate | undefined> {
    return this.promptTemplates.get(id);
  }

  async getPromptTemplatesByCategory(category: string): Promise<PromptTemplate[]> {
    return Array.from(this.promptTemplates.values())
      .filter(template => template.category === category);
  }

  async createPromptTemplate(template: InsertPromptTemplate): Promise<PromptTemplate> {
    const id = this.currentPromptTemplateId++;
    const newTemplate: PromptTemplate = { ...template, id };
    this.promptTemplates.set(id, newTemplate);
    return newTemplate;
  }

  // Initialize with sample data
  private initializeSampleData() {
    // Cultural Heritage Items
    const heritageItems: InsertCulturalHeritageItem[] = [
      {
        title: "전통 미술",
        description: "민족의 영혼과 미학을 담은 조선의 전통 미술은 자연과의 조화, 세밀한 기법, 그리고 상징성이 풍부합니다.",
        imageUrl: "https://images.unsplash.com/photo-1601564358117-31d550417227?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        category: "art"
      },
      {
        title: "전통 음악",
        description: "독특한 선율과 리듬을 가진 조선의 음악은 국가적 자부심을 불러일으키는 문화적 보물입니다.",
        imageUrl: "https://images.unsplash.com/photo-1540998694023-760ad93888a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        category: "music"
      },
      {
        title: "전통 공예",
        description: "세대를 거쳐 전해진 공예 기술은 조선 장인들의 뛰어난 기술과 예술적 감각을 보여줍니다.",
        imageUrl: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        category: "craft"
      }
    ];

    heritageItems.forEach(item => {
      this.createCulturalHeritageItem(item);
    });

    // Prompt Templates
    const templates: InsertPromptTemplate[] = [
      {
        title: "전통 건축 프롬프트",
        text: "조선의 전통 건축물, 웅장한 궁전, 아름다운 정원, 전통적인 목조 구조, 자연과의 조화, 세밀한 장식, 4K 해상도, 사실적 렌더링, 자연광",
        category: "architecture"
      },
      {
        title: "현대 도시 프롬프트",
        text: "평양의 현대적 도시 경관, 웅장한 기념물, 넓은 광장, 현대적 건축물, 깨끗한 거리, 푸른 공원, 강변 풍경, 4K 해상도, 아침 햇살, 생동감 있는 색상",
        category: "urban"
      },
      {
        title: "전통 문화 프롬프트",
        text: "조선의 전통 문화 행사, 화려한 민속 의상, 전통 춤, 음악 공연, 다채로운 색상, 우아한 움직임, 공동체 정신, 명절 축하, 4K 해상도, 사실적 스타일",
        category: "culture"
      },
      {
        title: "자연 경관 프롬프트",
        text: "조선의 아름다운 자연 경관, 웅장한 산맥, 맑은 호수, 계절의 변화, 전통 가옥과 자연의 조화, 안개 낀 아침, 풍부한 식생, 평화로운 분위기, 높은 해상도, 사진같은 품질",
        category: "nature"
      }
    ];

    templates.forEach(template => {
      this.createPromptTemplate(template);
    });
  }
}

export const storage = new MemStorage();
