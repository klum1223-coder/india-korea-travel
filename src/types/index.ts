// Tour Packages
export interface DayItinerary {
  day: number;
  theme: string;
  activities: string[];
  learningOutcome: string;
}

export interface PricingTier {
  hotelClass: string;
  pax15: number;
  pax20: number;
  pax25?: number;
  pax30: number;
  sglSupplement: number;
}

export interface TourPackage {
  slug: string;
  name: string;
  duration: string;
  cities: string[];
  tagline: string;
  badge: string | null;
  highlights: string[];
  optionalPrograms?: string[];
  itinerary: DayItinerary[];
  pricing: PricingTier[];
  inclusions: string[];
  exclusions: string[];
  hotels?: Record<string, string>;
}

// Experiences
export type ExperienceCategory = 'educational' | 'industrial' | 'cultural' | 'kwave' | 'sightseeing';

export interface Experience {
  id: string;
  name: string;
  category: ExperienceCategory;
  city: string;
  description: string;
  duration: string;
  includedInPackages: string[];
  image: string;
}

// Destinations
export interface Spot {
  name: string;
  type: string;
  description: string;
}

export interface Destination {
  slug: string;
  name: string;
  heroTagline: string;
  quickFacts: {
    population: string;
    language: string;
    currency: string;
    timezone: string;
    bestSeason: string;
  };
  spots: Spot[];
}

// Restaurants
export interface Restaurant {
  name: string;
  city: string;
  cuisine: string;
  capacity: number | null;
  vegetarian: boolean;
  halal: boolean;
  address: string | null;
  description: string;
}

// FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

// Contact / Enquiry
export interface EnquiryForm {
  role: 'principal' | 'teacher' | 'parent' | 'student' | 'agent';
  name: string;
  schoolName?: string;
  email: string;
  whatsapp: string;
  preferredPackage: string;
  groupSize: number;
  travelMonth: string;
  dietaryPreference: ('vegetarian' | 'halal' | 'jain' | 'any')[];
  message: string;
}

// Blog / AI Content
export interface BlogPost {
  slug: string;
  title: string;
  titleKo?: string;
  body: string;
  bodyKo?: string;
  excerpt: string;
  category: 'todays-korea' | 'travel-story' | 'seasonal' | 'k-culture' | 'student-tips' | 'school-spotlight';
  tags: string[];
  thumbnail: string;
  publishedAt: string;
  readTime: number;
  relatedPackageSlug?: string;
  naverBlogUrl?: string;
  isAIGenerated: boolean;
  viewCount: number;
}
