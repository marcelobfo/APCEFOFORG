
import { Space, SpaceType, Booking, Lead, SiteConfig } from './types';

export const SPACES: Space[] = [
  {
    id: '1',
    name: 'Pequenas Confraternizações',
    description: 'Churrasqueiras ideais para encontros intimistas de empresas e famílias.',
    capacity: 50,
    price: 800,
    type: SpaceType.INTIMATE,
    image: 'https://picsum.photos/id/1080/800/600',
    gallery: ['https://picsum.photos/id/1080/800/600', 'https://picsum.photos/id/1081/800/600'],
    features: ['Churrasqueira', 'Freezer', 'Mesas Rústicas', 'Área Coberta']
  },
  {
    id: '2',
    name: 'Mega Eventos (Ginásio)',
    description: 'Quadra poliesportiva ampla para grandes convenções e shows.',
    capacity: 4000,
    price: 15000,
    type: SpaceType.SPORTS,
    image: 'https://picsum.photos/id/1059/800/600',
    gallery: [],
    features: ['Arquibancada', 'Palco Modulável', 'Vestiários', 'Iluminação de Arena']
  },
  {
    id: '3',
    name: 'Salão Climatizado',
    description: 'Sofisticação e conforto para casamentos, bodas e jantares corporativos.',
    capacity: 600,
    price: 5000,
    type: SpaceType.SOCIAL,
    image: 'https://picsum.photos/id/203/800/600',
    gallery: [],
    features: ['Ar Condicionado Central', 'Cozinha Industrial', 'Palco', 'Camarim']
  },
  {
    id: '4',
    name: 'Choupana Garden',
    description: 'Ambiente ao ar livre com gramado, perfeito para cerimônias e festas leves.',
    capacity: 200,
    price: 2500,
    type: SpaceType.OUTDOOR,
    image: 'https://picsum.photos/id/10/800/600',
    gallery: [],
    features: ['Gramado', 'Iluminação Decorativa', 'Tenda Opcional', 'Área Verde']
  },
  {
    id: '5',
    name: 'Social Descontraído',
    description: 'Área de bar próxima à piscina para happy hours e celebrações informais.',
    capacity: 150,
    price: 1200,
    type: SpaceType.SOCIAL,
    image: 'https://picsum.photos/id/437/800/600',
    gallery: [],
    features: ['Balcão de Bar', 'Proximidade Piscina', 'Som Ambiente', 'Mesas Bistrô']
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    spaceId: '3',
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
    totalValue: 800
  },
  {
    id: 'b3',
    spaceId: '2',
    date: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString().split('T')[0],
    clientName: 'Formatura Medicina UVV',
    status: 'confirmed',
    totalValue: 15000
  },
  {
    id: 'b4',
    spaceId: '4',
    date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
    clientName: 'Casamento Marina e Pedro',
    status: 'confirmed',
    totalValue: 2500
  },
  {
    id: 'b5',
    spaceId: '5',
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
    clientName: 'Aniversário 30 anos',
    status: 'cancelled',
    totalValue: 1200
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
  },
  {
    id: 'l2',
    name: 'Carlos Santos',
    email: 'carlos@tech.com',
    phone: '(27) 98888-8888',
    interest: 'Convenção Anual',
    date: '2025-05-12',
    status: 'contacted'
  },
  {
    id: 'l3',
    name: 'Fernanda Lima',
    email: 'fernanda.l@agencia.com',
    phone: '(27) 97777-7777',
    interest: 'Locação para Gravação',
    date: '2025-05-14',
    status: 'new'
  },
  {
    id: 'l4',
    name: 'Roberto Dias',
    email: 'beto@show.com',
    phone: '(27) 96666-6666',
    interest: 'Show de Verão',
    date: '2025-05-01',
    status: 'converted'
  },
  {
    id: 'l5',
    name: 'Julia Roberts',
    email: 'julia@hollywood.com',
    phone: '(27) 95555-5555',
    interest: 'Festa de 15 anos',
    date: '2025-05-18',
    status: 'contacted'
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
  spaces_banner: 'https://picsum.photos/id/16/1920/600', // Default placeholder
  spaces_title: 'Nossos Espaços',
  spaces_subtitle: 'Conheça nossa estrutura completa. Do churrasco em família à convenção para milhares de pessoas.'
};