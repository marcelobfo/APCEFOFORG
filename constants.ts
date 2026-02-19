
import { Space, SpaceType, Booking, Lead, SiteConfig } from './types';

export const SPACES: Space[] = [
  {
    id: 'e1000000-0000-0000-0000-000000000001',
    name: 'Churrasqueiras',
    description: 'O cenário ideal para eventos intimistas e familiares. Foco em confraternização e bem-estar, proporcionando um ambiente descontraído para reunir quem você ama.',
    capacity: 60,
    type: SpaceType.INTIMATE,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Coberta', 'Freezer', 'Pia Independente'],
    itemsIncluded: ['Grelha', 'Mesas Rústicas', 'Bancos']
  },
  {
    id: 'e2000000-0000-0000-0000-000000000002',
    name: 'Choupana',
    description: 'Charme e natureza se encontram aqui. Um espaço aberto e arejado, sombreado pela beleza natural de um pé de caju, perfeito para eventos ao ar livre que buscam leveza.',
    capacity: 150,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Coberta', 'Iluminação Cênica', 'Entorno Natural'],
    itemsIncluded: ['Mesas', 'Cadeiras', 'Freezer']
  },
  {
    id: 'e3000000-0000-0000-0000-000000000003',
    name: 'Quadra Poliesportiva',
    description: 'Grandiosidade para sua produção. Com foco em grandes montagens, feiras, formaturas e eventos escolares, este espaço comporta até 3.000 pessoas com versatilidade total.',
    capacity: 3000,
    type: SpaceType.SPORTS,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Iluminação Profissional', 'Arquibancada', 'Pé direito alto'],
    itemsIncluded: ['Limpeza pré-evento']
  },
  {
    id: 'e6000000-0000-0000-0000-000000000006',
    name: 'Cerimonial',
    description: 'Sofisticação e climatização para grandes celebrações. O ambiente perfeito para casamentos, festas de 15 anos e eventos corporativos que exigem elegância e conforto.',
    capacity: 800,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['100% Climatizado', 'Palco Fixo', 'Cozinha Industrial', 'Camarim'],
    itemsIncluded: ['Mesas Redondas', 'Cadeiras Tiffany', 'Mesas de Buffet']
  },
  {
    id: 'e7000000-0000-0000-0000-000000000007',
    name: 'Sala de Reunião',
    description: 'Foco corporativo, treinamentos e privacidade. Uma estrutura completa e isolada para garantir a produtividade da sua equipe ou o sucesso da sua apresentação.',
    capacity: 70,
    type: SpaceType.CORPORATE,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Projetor HD', 'Sistema de Som', 'Climatização', 'Wifi Dedicado'],
    itemsIncluded: ['Mesa de Reunião', 'Cadeiras Executivas']
  },
  {
    id: 'e8000000-0000-0000-0000-000000000008',
    name: 'Bar Social',
    description: 'Descontração com vista privilegiada. Com paredes de vidro que integram o ambiente às piscinas, é o local ideal para coquetéis e eventos sociais relaxantes.',
    capacity: 180,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Balcão de Serviço', 'Vista para Piscina', 'Freezers'],
    itemsIncluded: ['Mesas de apoio', 'Banquetas']
  },
  {
    id: 'e9000000-0000-0000-0000-000000000009',
    name: 'Cachoeiro - Salão',
    description: 'Salão de festas versátil na unidade Cachoeiro, pronto para receber celebrações regionais com conforto.',
    capacity: 250,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Cozinha de apoio', 'Ventilação Natural'],
    itemsIncluded: ['Mesas', 'Cadeiras']
  },
  {
    id: 'ea000000-0000-0000-0000-000000000010',
    name: 'Cachoeiro - Churrasqueiras',
    description: 'Área de churrasco unidade Cachoeiro, integrada à natureza.',
    capacity: 60,
    type: SpaceType.INTIMATE,
    image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Verde'],
    itemsIncluded: ['Grelha']
  },
  {
    id: 'eb000000-0000-0000-0000-000000000011',
    name: 'Salão de Jogos',
    description: 'Ambiente interativo e complementar. Ideal para adicionar diversão ao seu evento principal ou para campeonatos recreativos.',
    capacity: 250,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Mesas de bilhar', 'Totó', 'Área Coberta'],
    itemsIncluded: ['Equipamentos de jogos']
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
  seo_title: 'APCEF Eventos - Espaços na Serra/ES',
  seo_description: 'Casamentos, eventos corporativos e sociais na maior estrutura do Espírito Santo. De 30 a 3.000 convidados.',
  keywords: 'eventos, festas, casamento, corporativo, serra, espirito santo, aluguel de espaço',
  logo_url: '',
  favicon_url: '',
  
  // Home
  hero_title: 'APCEF/ES Eventos: um espaço do tamanho do seu evento!',
  hero_subtitle: 'Casamentos, aniversários, eventos escolares, encontros religiosos, eventos corporativos e sociais na maior estrutura do Espírito Santo! De 30 a 3.000 convidados, com estrutura completa na Serra/ES.',
  hero_button_text: 'Conheça nossos espaços',
  hero_background: 'https://picsum.photos/id/16/1920/1080',
  
  // About
  about_banner: 'https://picsum.photos/id/124/1920/1080',
  about_title: 'Muito mais que um clube.',
  about_subtitle: 'Uma família.',
  about_history_title: 'Tradição em Bem-Receber',
  about_history_text: 'A Associação do Pessoal da Caixa Econômica Federal do Espírito Santo (APCEF/ES) foi fundada com o objetivo de criar um refúgio de lazer e integração para os funcionários da Caixa e seus familiares.\n\nAo longo das décadas, expandimos nossa infraestrutura e abrimos as portas para a comunidade capixaba, tornando-nos referência em eventos sociais e corporativos no estado. Nossa sede em Bicanga é um verdadeiro oásis com completa infraestrutura de esporte e lazer.',
  show_about_history: true,
  about_image_1: 'https://picsum.photos/id/433/400/500',
  about_image_2: 'https://picsum.photos/id/296/400/500',
  
  // Contact
  contact_banner: 'https://picsum.photos/id/42/1920/1080',
  contact_title: 'Solicite um orçamento',
  contact_subtitle: 'Nossa equipe de especialistas está pronta para apresentar a melhor solução para o seu evento.',
  contact_whatsapp: '(27) 3333-3333',
  contact_email: 'eventos@apcefes.com.br',

  // Spaces
  spaces_banner: 'https://picsum.photos/id/16/1920/600', 
  spaces_title: 'Nossos Espaços',
  spaces_subtitle: 'Versatilidade real: ambientes preparados para receber de reuniões intimistas a grandes convenções.'
};
