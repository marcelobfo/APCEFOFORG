
import { Space, SpaceType, Booking, Lead, SiteConfig } from './types';

export const SPACES: Space[] = [
  {
    id: '1',
    name: 'Churrasqueiras',
    description: 'Área ideal para confraternizações informais com amigos e família.',
    capacity: 60,
    price: 400, // Preço estimado, ajustar no admin
    type: SpaceType.INTIMATE,
    image: 'https://picsum.photos/id/1080/800/600',
    gallery: [],
    features: ['Área Coberta', 'Freezer'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil (08h às 17h)',
    itemsIncluded: ['Grelha', 'Mesas Rústicas']
  },
  {
    id: '2',
    name: 'Cabana ou Salão de Jogos',
    description: 'Espaço amplo e versátil para eventos médios e recreação.',
    capacity: 350,
    price: 1500,
    type: SpaceType.SOCIAL,
    image: 'https://picsum.photos/id/1081/800/600',
    gallery: [],
    features: ['Jogos', 'Área Coberta'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil (08h às 17h)',
    itemsIncluded: []
  },
  {
    id: '3',
    name: 'Quadra (sem uso do Clube)',
    description: 'Espaço esportivo amplo para eventos ou competições.',
    capacity: 2000,
    price: 2500,
    type: SpaceType.SPORTS,
    image: 'https://picsum.photos/id/1059/800/600',
    gallery: [],
    features: ['Iluminação', 'Arquibancada'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil (08h às 17h)',
    itemsIncluded: []
  },
  {
    id: '4',
    name: 'Clube (sem exclusividade)',
    description: 'Acesso às áreas comuns do clube para eventos compartilhados.',
    capacity: 500,
    price: 3000,
    type: SpaceType.OUTDOOR,
    image: 'https://picsum.photos/id/10/800/600',
    gallery: [],
    features: ['Piscinas', 'Área Verde'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil (08h às 17h)',
    itemsIncluded: []
  },
  {
    id: '5',
    name: 'Clube (com exclusividade)',
    description: 'Locação total do clube para grandes eventos privados.',
    capacity: 3000,
    price: 15000,
    type: SpaceType.CORPORATE,
    image: 'https://picsum.photos/id/16/800/600',
    gallery: [],
    features: ['Exclusividade Total', 'Todas as áreas'],
    availability: 'Feriado ou Dia Útil (08h às 17h)',
    itemsIncluded: []
  },
  {
    id: '6',
    name: 'Cerimonial (Associado ou Não)',
    description: 'Salão nobre climatizado para casamentos e festas de gala.',
    capacity: 800,
    price: 5000,
    type: SpaceType.SOCIAL,
    image: 'https://picsum.photos/id/203/800/600',
    gallery: [],
    features: ['Ar Condicionado', 'Palco', 'Cozinha'],
    availability: 'Horário Noturno (22h às 03h)',
    itemsIncluded: ['Mesas', 'Cadeiras']
  },
  {
    id: '7',
    name: 'Sala de Reunião',
    description: 'Ambiente corporativo para reuniões, treinamentos e workshops.',
    capacity: 70,
    price: 600,
    type: SpaceType.CORPORATE,
    image: 'https://picsum.photos/id/1/800/600',
    gallery: [],
    features: ['Projetor', 'Wifi', 'Climatizado'],
    availability: 'Sábado, Domingo, Feriado ou Dia Útil (08h às 17h)',
    itemsIncluded: ['Mesa de Reunião']
  },
  {
    id: '8',
    name: 'Bar (Associados/Alto Valor)',
    description: 'Área descontraída próxima às piscinas.',
    capacity: 180,
    price: 1200,
    type: SpaceType.SOCIAL,
    image: 'https://picsum.photos/id/437/800/600',
    gallery: [],
    features: ['Balcão', 'Freezer'],
    availability: 'Feriado/Dia Útil (11h às 16h) ou Noturno (19h às 00h)',
    itemsIncluded: []
  },
  {
    id: '9',
    name: 'Cachoeiro - Salão',
    description: 'Salão de festas na unidade de Cachoeiro.',
    capacity: 250,
    price: 1000,
    type: SpaceType.SOCIAL,
    image: 'https://picsum.photos/id/180/800/600',
    gallery: [],
    features: ['Cozinha de apoio'],
    availability: 'Sábado, Domingo, Dia Útil e Feriado (08h às 17h)',
    itemsIncluded: []
  },
  {
    id: '10',
    name: 'Cachoeiro - Churrasqueiras',
    description: 'Área de churrasco na unidade de Cachoeiro.',
    capacity: 60,
    price: 350,
    type: SpaceType.INTIMATE,
    image: 'https://picsum.photos/id/292/800/600',
    gallery: [],
    features: ['Área Verde'],
    availability: 'Sábado, Domingo, Dia Útil e Feriado (08h às 17h)',
    itemsIncluded: []
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    spaceId: '6',
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    clientName: 'Empresa X Ltda',
    status: 'confirmed',
    totalValue: 5000
  },
  {
    id: 'b2',
    spaceId: '1',
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
    clientName: 'João Silva',
    status: 'pending',
    totalValue: 400
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