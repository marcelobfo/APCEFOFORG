
-- ==============================================================================
-- SCRIPT DE CORREÇÃO DE SCHEMA E RESTAURAÇÃO DE DADOS (VERSÃO UUID CORRIGIDA)
-- Rode este script no Editor SQL do Supabase.
-- ==============================================================================

-- 1. CORREÇÃO DA ESTRUTURA (Adiciona colunas faltantes)
ALTER TABLE spaces ADD COLUMN IF NOT EXISTS availability text;
ALTER TABLE spaces ADD COLUMN IF NOT EXISTS "itemsIncluded" text[]; 
ALTER TABLE spaces ADD COLUMN IF NOT EXISTS price numeric DEFAULT 0;
ALTER TABLE spaces ADD COLUMN IF NOT EXISTS gallery text[] DEFAULT '{}';
ALTER TABLE spaces ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE spaces ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}';

-- NOVAS COLUNAS PARA RESERVAS (Contato direto no calendário)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS email text;

-- NOVAS COLUNAS PARA MARKETING (Analytics & Facebook)
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_analytics_id text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS facebook_pixel_id text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS facebook_access_token text;

-- NOVAS COLUNAS PARA PÁGINA SOBRE (Correção do Erro PGRST204)
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_banner text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_title text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_subtitle text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_history_title text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_history_text text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_image_1 text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_image_2 text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS show_about_history boolean DEFAULT true;

-- CORREÇÃO: COLUNAS PARA PÁGINA HOME (HERO) QUE ESTAVAM FALTANDO
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_background text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_button_text text;

-- CORREÇÃO: COLUNAS PARA PÁGINA CONTATO E LISTAGEM (Garantia)
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS contact_banner text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS spaces_banner text;

-- Forçar recarregamento do cache do schema
NOTIFY pgrst, 'reload config';

-- 2. LIMPEZA TOTAL (Remove dados antigos para evitar conflitos)
-- DELETE FROM bookings;
-- DELETE FROM spaces;

-- 3. INSERÇÃO DOS DADOS CORRETOS COM UUIDs VÁLIDOS
-- Substituímos os IDs '1', '2'... por UUIDs reais para satisfazer o tipo de coluna do banco.
INSERT INTO spaces (id, name, description, capacity, type, image, gallery, features, availability, "itemsIncluded", price) VALUES
(
    'e1000000-0000-0000-0000-000000000001', 
    'Churrasqueiras', 
    'Área ideal para confraternizações informais.', 
    60, 
    'Intimista', 
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Área Coberta', 'Freezer'], 
    'Sábado, Domingo, Feriado ou Dia Útil', 
    ARRAY['Grelha', 'Mesas Rústicas'], 
    0
),
(
    'e2000000-0000-0000-0000-000000000002', 
    'Cabana', 
    'Espaço amplo e versátil.', 
    250, 
    'Social', 
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Área Coberta'], 
    'Sábado, Domingo, Feriado ou Dia Útil', 
    ARRAY[]::text[], 
    0
),
(
    'e3000000-0000-0000-0000-000000000003', 
    'Quadra (sem uso do Clube)', 
    'Espaço esportivo para grandes eventos.', 
    2000, 
    'Esportivo', 
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Iluminação', 'Arquibancada'], 
    'Sábado, Domingo, Feriado ou Dia Útil', 
    ARRAY[]::text[], 
    0
),
(
    'e6000000-0000-0000-0000-000000000006', 
    'Cerimonial (Associado ou Não)', 
    'Salão nobre climatizado para festas de gala.', 
    800, 
    'Social', 
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Ar Condicionado', 'Palco', 'Cozinha'], 
    'Horário Noturno', 
    ARRAY['Mesas', 'Cadeiras'], 
    0
),
(
    'e7000000-0000-0000-0000-000000000007', 
    'Sala de Reunião', 
    'Ambiente corporativo para reuniões.', 
    70, 
    'Corporativo', 
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Projetor', 'Wifi', 'Climatizado'], 
    'Sábado, Domingo, Feriado ou Dia Útil', 
    ARRAY['Mesa de Reunião'], 
    0
),
(
    'e8000000-0000-0000-0000-000000000008', 
    'Bar (Associados/Alto Valor)', 
    'Área descontraída do bar.', 
    180, 
    'Social', 
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Balcão', 'Freezer'], 
    'Feriado, Dia Útil ou Noturno', 
    ARRAY[]::text[], 
    0
),
(
    'e9000000-0000-0000-0000-000000000009', 
    'Cachoeiro - Salão', 
    'Salão de festas unidade Cachoeiro.', 
    250, 
    'Social', 
    'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Cozinha de apoio'], 
    'Sábado, Domingo, Dia Útil e Feriado', 
    ARRAY[]::text[], 
    0
),
(
    'ea000000-0000-0000-0000-000000000010', 
    'Cachoeiro - Churrasqueiras', 
    'Área de churrasco unidade Cachoeiro.', 
    60, 
    'Intimista', 
    'https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Área Verde'], 
    'Sábado, Domingo, Dia Útil e Feriado', 
    ARRAY[]::text[], 
    0
),
(
    'eb000000-0000-0000-0000-000000000011', 
    'Salão de Jogos', 
    'Espaço recreativo.', 
    250, 
    'Social', 
    'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800', 
    ARRAY[]::text[], 
    ARRAY['Mesas de jogos', 'Área Coberta'], 
    'Sábado, Domingo, Feriado ou Dia Útil', 
    ARRAY[]::text[], 
    0
)
ON CONFLICT (id) DO NOTHING;
