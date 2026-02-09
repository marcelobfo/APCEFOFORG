
export enum SpaceType {
  SOCIAL = 'Social',
  CORPORATE = 'Corporativo',
  OUTDOOR = 'Ao Ar Livre',
  SPORTS = 'Esportivo',
  INTIMATE = 'Intimista'
}

export type UserRole = 'super_admin' | 'editor' | 'user';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price?: number; // Agora opcional
  type: SpaceType;
  image: string;
  gallery: string[];
  video_url?: string;
  features: string[];
  availability?: string; // Funcionamento
  itemsIncluded?: string[]; // Itens Inclusos
}

export interface Booking {
  id: string;
  spaceId: string;
  date: string; // ISO Date YYYY-MM-DD
  clientName: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalValue?: number; // Agora opcional
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  date: string;
  status: 'new' | 'contacted' | 'converted';
}

export interface SiteConfig {
  id?: string;
  site_name: string;
  seo_title: string;
  seo_description: string;
  keywords: string;
  logo_url: string;
  favicon_url: string;
  
  // Home Content
  hero_title: string;
  hero_subtitle: string;
  heroButtonText?: string;
  hero_background?: string;
  
  // About Page Content
  about_banner: string;
  about_title: string;
  about_subtitle: string;
  about_history_title: string;
  about_history_text: string;

  // Contact Page Content
  contact_banner: string;
  contact_title: string;
  contact_subtitle: string;
  contact_whatsapp: string;
  contact_email: string;

  // Spaces Page Content
  spaces_banner: string;
  spaces_title: string;
  spaces_subtitle: string;
}

export interface WebhookConfig {
  id: string;
  url: string;
  event: 'booking.created' | 'booking.cancelled' | 'booking.updated';
  active: boolean;
  lastTriggered?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
}

export interface ApiLog {
  id: string;
  endpoint: string;
  method: 'POST' | 'GET';
  status: 200 | 201 | 400 | 401 | 500;
  timestamp: string;
  latency: string;
}

export type ViewState = 'PUBLIC' | 'CLIENT' | 'ADMIN';