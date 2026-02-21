
import { Space, SpaceType, Booking, Lead, SiteConfig } from './types';

export const SPACES: Space[] = [
  {
    id: 'e1000000-0000-0000-0000-000000000001',
    name: 'Churrasqueiras',
    description: 'O cenário ideal para eventos intimistas e familiares. Nossas churrasqueiras foram projetadas para proporcionar o máximo de conforto e integração. Com uma área coberta espaçosa e ventilada, você e seus convidados desfrutarão de momentos inesquecíveis. O espaço conta com pia independente e bancadas de apoio, facilitando o preparo e o serviço. É o ambiente perfeito para aquele churrasco de domingo, aniversários descontraídos ou reuniões de amigos, cercado pela natureza e com toda a infraestrutura que você precisa.',
    capacity: 60,
    type: SpaceType.INTIMATE,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Coberta', 'Freezer', 'Pia Independente', 'Iluminação Noturna', 'Tomadas 110v/220v'],
    itemsIncluded: ['Grelha', 'Mesas Rústicas', 'Bancos de Madeira', 'Kit Limpeza Básica'],
    availability: 'Terça a Domingo e Feriados'
  },
  {
    id: 'e2000000-0000-0000-0000-000000000002',
    name: 'Choupana',
    description: 'Charme e natureza se encontram aqui. A Choupana é um espaço singular, onde a rusticidade elegante se mistura com a beleza natural. Sombreada pela copa generosa de um cajueiro centenário, oferece um clima ameno e acolhedor, ideal para eventos ao ar livre que buscam leveza e sofisticação despretensiosa. Perfeito para luais, recepções diurnas, brunches e celebrações que pedem um contato direto com o verde, sem abrir mão do conforto de uma estrutura de apoio completa.',
    capacity: 150,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Coberta Rústica', 'Iluminação Cênica', 'Entorno Natural', 'Piso Nivelado', 'Pontos de Energia'],
    itemsIncluded: ['Mesas', 'Cadeiras', 'Freezer Horizontal', 'Caixa Térmica'],
    availability: 'Todos os dias'
  },
  {
    id: 'e3000000-0000-0000-0000-000000000003',
    name: 'Quadra Poliesportiva',
    description: 'Grandiosidade para sua produção. Com foco em grandes montagens, feiras, formaturas e eventos escolares, este espaço comporta até 3.000 pessoas com versatilidade total. Sua ampla área livre permite a instalação de palcos, estandes, estruturas de som e iluminação complexas. O pé direito alto garante excelente ventilação e acústica. É o local onde grandes ideias se tornam realidade, oferecendo segurança e robustez para eventos de grande porte.',
    capacity: 3000,
    type: SpaceType.SPORTS,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Iluminação Profissional LED', 'Arquibancada Lateral', 'Pé direito alto', 'Vestiários Próximos', 'Acesso para Caminhões'],
    itemsIncluded: ['Limpeza pré-evento', 'Traves/Redes (se solicitado)', 'Ponto de Energia Trifásico'],
    availability: 'Sob Consulta'
  },
  {
    id: 'e6000000-0000-0000-0000-000000000006',
    name: 'Cerimonial',
    description: 'Sofisticação e climatização para grandes celebrações. O nosso Cerimonial é a joia da coroa, projetado para impressionar. Com acabamento refinado, acústica tratada e climatização central, é o ambiente perfeito para casamentos de conto de fadas, festas de 15 anos deslumbrantes e eventos corporativos de alto nível. Possui palco fixo para bandas e apresentações, camarim privativo para noivas ou artistas, e uma cozinha industrial completa para atender aos buffets mais exigentes.',
    capacity: 800,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['100% Climatizado', 'Palco Fixo', 'Cozinha Industrial Completa', 'Camarim Privativo', 'Banheiros Internos de Luxo', 'Isolamento Acústico'],
    itemsIncluded: ['Mesas Redondas (8 lugares)', 'Cadeiras Tiffany Brancas', 'Mesas de Buffet', 'Gerador de Energia (Standby)'],
    availability: 'Sexta, Sábado e Domingo'
  },
  {
    id: 'e7000000-0000-0000-0000-000000000007',
    name: 'Sala de Reunião',
    description: 'Foco corporativo, treinamentos e privacidade. Uma estrutura completa e isolada para garantir a produtividade da sua equipe ou o sucesso da sua apresentação. Com mobiliário ergonômico e tecnologia audiovisual integrada, nossa Sala de Reunião oferece o ambiente profissional que você precisa, dentro de um complexo de lazer. Ideal para workshops, reuniões de diretoria, cursos e dinâmicas de grupo, com a possibilidade de coffee break exclusivo.',
    capacity: 70,
    type: SpaceType.CORPORATE,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Projetor HD', 'Sistema de Som Integrado', 'Climatização Split', 'Wifi Dedicado de Alta Velocidade', 'Quadro Branco'],
    itemsIncluded: ['Mesa de Reunião Modular', 'Cadeiras Executivas', 'Flipchart', 'Água e Café (Cortesia)'],
    availability: 'Segunda a Sexta'
  },
  {
    id: 'e8000000-0000-0000-0000-000000000008',
    name: 'Bar Social',
    description: 'Descontração com vista privilegiada. Com paredes de vidro que integram o ambiente às piscinas, o Bar Social é o local ideal para coquetéis, happy hours e eventos sociais relaxantes. A iluminação natural durante o dia e a vista para o parque aquático iluminado à noite criam atmosferas únicas. Equipado com balcão de serviço amplo e freezers, facilita a operação de barman e serviço de bebidas, garantindo que seu evento flua com elegância e animação.',
    capacity: 180,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Balcão de Serviço em Granito', 'Vista Panorâmica para Piscina', 'Freezers Verticais', 'TVs LED', 'Sistema de Som Ambiente'],
    itemsIncluded: ['Mesas de apoio', 'Banquetas Altas', 'Mesas Bistrô', 'Cervejeira'],
    availability: 'Todos os dias (exceto segundas)'
  },
  {
    id: 'e9000000-0000-0000-0000-000000000009',
    name: 'Cachoeiro - Salão',
    description: 'Salão de festas versátil na nossa unidade de Cachoeiro de Itapemirim. Um espaço amplo e arejado, pronto para receber celebrações regionais com todo o conforto e a qualidade APCEF. Ideal para casamentos, aniversários e confraternizações de empresas da região sul do estado. Conta com cozinha de apoio equipada e fácil acesso, garantindo praticidade para organizadores e convidados.',
    capacity: 250,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Cozinha de apoio', 'Ventilação Natural Cruzada', 'Iluminação Básica', 'Estacionamento Próprio'],
    itemsIncluded: ['Mesas Quadradas', 'Cadeiras Plásticas Reforçadas', 'Freezer'],
    availability: 'Finais de Semana'
  },
  {
    id: 'ea000000-0000-0000-0000-000000000010',
    name: 'Cachoeiro - Churrasqueiras',
    description: 'Área de churrasco na unidade Cachoeiro, perfeitamente integrada à natureza local. Um refúgio para quem busca tranquilidade e bons momentos em família. O espaço oferece privacidade e sombra, sendo equipado com tudo o que é necessário para um churrasco de qualidade. A proximidade com as áreas verdes da unidade proporciona um clima de sítio, ideal para relaxar e aproveitar o dia.',
    capacity: 60,
    type: SpaceType.INTIMATE,
    image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Área Verde Preservada', 'Sombra Natural', 'Pia de Apoio'],
    itemsIncluded: ['Grelha', 'Espetos', 'Mesas e Bancos'],
    availability: 'Terça a Domingo'
  },
  {
    id: 'eb000000-0000-0000-0000-000000000011',
    name: 'Salão de Jogos',
    description: 'Ambiente interativo e complementar. O Salão de Jogos é o espaço da diversão garantida. Ideal para adicionar uma camada extra de entretenimento ao seu evento principal ou para campeonatos recreativos e aniversários teen. Equipado com diversas mesas de jogos clássicos, é um ponto de encontro que agrada todas as idades, promovendo interação e competições saudáveis em um ambiente seguro e coberto.',
    capacity: 250,
    type: SpaceType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    features: ['Mesas de bilhar oficiais', 'Totó (Pebolim)', 'Área Coberta', 'Ping-Pong', 'Iluminação Direcionada'],
    itemsIncluded: ['Equipamentos de jogos (tacos, bolas, etc)', 'Mesas de apoio'],
    availability: 'Todos os dias'
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
