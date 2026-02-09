
import { Space, SpaceType, Booking, Lead, SiteConfig } from './types';

export const SPACES: Space[] = [
  {
    id: 'e1000000-0000-0000-0000-000000000001',
    name: 'Churrasqueiras',
    description: 'Área ideal para confraternizações informais.',
    capacity: 60,
    type: SpaceType.INTIMATE,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Coberta', 'Freezer'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil',
    itemsIncluded: ['Grelha', 'Mesas Rústicas']
  },
  {
    id: 'e2000000-0000-0000-0000-000000000002',
    name: 'Cabana',
    description: 'Espaço amplo e versátil.',
    capacity: 250,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Coberta'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil',
    itemsIncluded: []
  },
  {
    id: 'e3000000-0000-0000-0000-000000000003',
    name: 'Quadra (sem uso do Clube)',
    description: 'Espaço esportivo para grandes eventos.',
    capacity: 2000,
    type: SpaceType.SPORTS,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Iluminação', 'Arquibancada'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil',
    itemsIncluded: []
  },
  {
    id: 'e6000000-0000-0000-0000-000000000006',
    name: 'Cerimonial (Associado ou Não)',
    description: 'Salão nobre climatizado para festas de gala.',
    capacity: 800,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Ar Condicionado', 'Palco', 'Cozinha'],
    availability: 'Horário Noturno',
    itemsIncluded: ['Mesas', 'Cadeiras']
  },
  {
    id: 'e7000000-0000-0000-0000-000000000007',
    name: 'Sala de Reunião',
    description: 'Ambiente corporativo para reuniões.',
    capacity: 70,
    type: SpaceType.CORPORATE,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Projetor', 'Wifi', 'Climatizado'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil',
    itemsIncluded: ['Mesa de Reunião']
  },
  {
    id: 'e8000000-0000-0000-0000-000000000008',
    name: 'Bar (Associados/Alto Valor)',
    description: 'Área descontraída do bar.',
    capacity: 180,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Balcão', 'Freezer'],
    availability: 'Feriado, Dia Útil ou Noturno',
    itemsIncluded: []
  },
  {
    id: 'e9000000-0000-0000-0000-000000000009',
    name: 'Cachoeiro - Salão',
    description: 'Salão de festas unidade Cachoeiro.',
    capacity: 250,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Cozinha de apoio'],
    availability: 'Sábado, Domingo, Dia Útil e Feriado',
    itemsIncluded: []
  },
  {
    id: 'ea000000-0000-0000-0000-000000000010',
    name: 'Cachoeiro - Churrasqueiras',
    description: 'Área de churrasco unidade Cachoeiro.',
    capacity: 60,
    type: SpaceType.INTIMATE,
    image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Verde'],
    availability: 'Sábado, Domingo, Dia Útil e Feriado',
    itemsIncluded: []
  },
  {
    id: 'eb000000-0000-0000-0000-000000000011',
    name: 'salão de jogos*',
    description: 'Espaço recreativo.',
    capacity: 250,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Mesas de jogos', 'Área Coberta'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil',
    itemsIncluded: []
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    spaceId: 'e6000000-0000-0000-0000-000000000006',
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    clientName: 'Empresa X Ltda',
    status: 'confirmed'
  },
  {
    id: 'b2',
    spaceId: 'e1000000-0000-0000-0000-000000000001',
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
    clientName: 'João Silva',
    status: 'pending'
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    phone: '(27) 99999-9999',
    interest: 'Casamento em 2026',
    date: '2025-05-10',
    status: 'new'
  }
];

export const INITIAL_SITE_CONFIG: SiteConfig = {
  site_name: 'APCEF Eventos',
  seo_title: 'APCEF Eventos - Espaços para Festas e Eventos',
  seo_description: 'Cerimoniais, festas sociais e eventos corporativos na melhor estrutura do estado.',
  keywords: 'eventos, festas, casamento, corporativo, serra, espirito santo',
  logo_url: '',
  favicon_url: '',
  
  // Home
  hero_title: 'Seu Evento Merece Este Cenário',
  hero_subtitle: 'Cerimoniais, festas sociais e eventos corporativos na melhor estrutura do estado.',
  heroButtonText: 'Conhecer Espaços',
  hero_background: 'https://picsum.photos/id/16/1920/1080',
  
  // About
  about_banner: 'https://picsum.photos/id/124/1920/1080',
  about_title: 'Muito mais que um clube.',
  about_subtitle: 'Uma família.',
  about_history_title: 'Tradição em Bem-Receber',
  about_history_text: 'A Associação do Pessoal da Caixa Econômica Federal do Espírito Santo (APCEF/ES) foi fundada com o objetivo de criar um refúgio...',
  
  // Contact
  contact_banner: 'https://picsum.photos/id/42/1920/1080',
  contact_title: 'Vamos planejar seu evento?',
  contact_subtitle: 'Nossa equipe de especialistas está pronta para tirar suas dúvidas.',
  contact_whatsapp: '(27) 3333-3333',
  contact_email: 'eventos@apcefes.com.br',

  // Spaces
  spaces_banner: 'https://picsum.photos/id/16/1920/600', 
  spaces_title: 'Nossos Espaços',
  spaces_subtitle: 'Conheça nossa estrutura completa. Do churrasco em família à convenção para milhares de pessoas.'
};
