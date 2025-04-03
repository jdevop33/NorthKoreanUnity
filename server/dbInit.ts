import { db } from "./db";
import { 
  users, 
  culturalHeritageItems, 
  promptTemplates,
  type InsertCulturalHeritageItem,
  type InsertPromptTemplate
} from "@shared/schema";
import { sql } from "drizzle-orm";

// Sample data
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

export async function initializeDb() {
  try {
    console.log("Creating database schema...");
    
    // Create tables
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS cultural_heritage_items (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS prompt_templates (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        category TEXT NOT NULL
      );
    `);
    
    console.log("Database schema created successfully");
    
    // Insert sample data
    console.log("Inserting sample data...");
    
    // Insert cultural heritage items
    for (const item of heritageItems) {
      await db.insert(culturalHeritageItems).values(item).onConflictDoNothing();
    }
    
    // Insert prompt templates
    for (const template of templates) {
      await db.insert(promptTemplates).values(template).onConflictDoNothing();
    }
    
    console.log("Sample data inserted successfully");
    
    return { success: true };
  } catch (error) {
    console.error("Error initializing database:", error);
    return { success: false, error };
  }
}