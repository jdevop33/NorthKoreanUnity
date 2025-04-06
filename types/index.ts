import { ReactNode } from 'react';

// Base props interface used across components
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Common section props
export interface SectionProps extends BaseComponentProps {
  id?: string;
  title: string;
  subtitle?: string;
}

// Cultural section specific props
export interface CulturalSectionProps extends SectionProps {
  description?: string;
  imageAlt?: string;
}

// Architecture section props
export interface ArchitectureSectionProps extends SectionProps {
  description: string;
  modernTitle: string;
  modernDescription: string;
  modernImageAlt: string;
  traditionalImageAlt: string;
  monumentImageAlt: string;
}

// Traditions section props
export interface TraditionsSectionProps extends SectionProps {
  calendarTitle: string;
  calendarDescription: string;
  calendarIconAlt: string;
  foodTitle: string;
  foodDescription: string;
  foodIconAlt: string;
  clothingTitle: string;
  clothingDescription1: string;
  clothingDescription2: string;
  clothingImageAlt: string;
}

// Unification section props
export interface UnificationSectionProps extends SectionProps {
  description: string;
  koreanPeninsulaAlt: string;
  pointCulturalExchange: string;
  pointPeaceSpirit: string;
  pointCulturalPreservation: string;
  pointEconomicCooperation: string;
}

// Form Data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Available languages
export type LanguageCode = 'en' | 'ko' | 'ru' | 'zh';

// Route type safety
export type AppRoute = 
  | '/'
  | '/cultural-heritage'
  | '/architecture'
  | '/traditions'
  | '/modern-achievements'
  | '/cultural-preservation'
  | '/unification'
  | '/contact';