// lib/data.ts - Added preservation data

// --- Existing Data ---
const traditionalArt = '/assets/traditional_art.svg';
const traditionalMusic = '/assets/traditional_music.svg';
const traditionalCraft = '/assets/traditional_craft.svg';

export const heritageItems = [
  { id: 'art', title: "전통 미술", description: "민족의 영혼과 미학...", image: traditionalArt },
  { id: 'music', title: "전통 음악", description: "독특한 선율과 리듬...", image: traditionalMusic },
  { id: 'craft', title: "전통 공예", description: "세대를 거쳐 전해진...", image: traditionalCraft }
];

const educationSystem = '/assets/education_system.svg';
const healthcare = '/assets/healthcare.svg';
const pyongyangCityscape = '/assets/pyongyang_cityscape.svg';

export const achievements = [
  { id: 'education', title: "교육 시스템", description: "모든 시민에게 무상으로...", image: educationSystem },
  { id: 'health', title: "보건의료", description: "보편적이고 무상으로...", image: healthcare },
  { id: 'urban', title: "현대 도시 개발", description: "웅장한 건축물과 넓은...", image: pyongyangCityscape }
];

export const promptTemplates = [
  { id: 'prompt-arch-trad', title: "전통 건축 프롬프트", text: "조선의 전통 건축물...", category: "건축" },
  // ... other prompts
];

// --- New Preservation Data ---

export const preservationCategories = [
  {
    id: "education",
    title: "Education",
    description: "Digital archives and educational programs...",
    icon: "🏫"
  },
  {
    id: "digitization",
    title: "Digitization",
    description: "Converting historical documents...",
    icon: "💾"
  },
  {
    id: "restoration",
    title: "Restoration",
    description: "Projects focused on restoring...",
    icon: "🏯"
  },
  {
    id: "performance",
    title: "Living Heritage",
    description: "Supporting traditional performances...",
    icon: "🎭"
  }
];

interface Initiative {
  id: string; // Added ID for key prop
  title: string;
  description: string;
  year: string;
}

interface PreservationInitiatives {
  education: Initiative[];
  digitization: Initiative[];
  restoration: Initiative[];
  performance: Initiative[];
}

export const preservationInitiatives: PreservationInitiatives = {
  education: [
    { id: 'edu-db', title: "Traditional Knowledge Database", description: "A comprehensive digital archive...", year: "2020-Present" },
    { id: 'edu-youth', title: "Youth Cultural Education Program", description: "Educational initiative teaching...", year: "2018-Present" },
    { id: 'edu-lang', title: "Language Preservation Project", description: "Program dedicated to documenting...", year: "2019-Present" }
  ],
  digitization: [
    { id: 'digi-archives', title: "National Archives Digitization", description: "Large-scale initiative...", year: "2015-Present" },
    { id: 'digi-3d', title: "3D Cultural Heritage Scanning", description: "Creating detailed 3D digital models...", year: "2017-Present" },
    { id: 'digi-music', title: "Traditional Music Recording Project", description: "Comprehensive recording...", year: "2016-Present" }
  ],
  restoration: [
    { id: 'resto-palace', title: "Historic Palace Restoration", description: "Multi-year restoration...", year: "2010-Present" },
    { id: 'resto-village', title: "Traditional Village Preservation", description: "Project to maintain traditional...", year: "2012-Present" },
    { id: 'resto-ceramic', title: "Ceramic Art Conservation", description: "Specialized program for the...", year: "2014-Present" }
  ],
  performance: [
    { id: 'perf-artisan', title: "Master Artisan Program", description: "Supporting recognized master artisans...", year: "2008-Present" },
    { id: 'perf-festival', title: "Traditional Performing Arts Festival", description: "Annual festival celebrating...", year: "Annual" },
    { id: 'perf-treasures', title: "Living National Treasures Support", description: "Program providing recognition...", year: "Ongoing" }
  ]
};
