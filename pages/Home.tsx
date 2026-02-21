
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, Layout, Star, MapPin, ShieldCheck, Sun } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Space, SiteConfig } from '../types';
import { INITIAL_SITE_CONFIG } from '../constants';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const [featuredSpaces, setFeaturedSpaces] = useState<Space[]>([]);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [spacesRes, configRes] = await Promise.all([
        supabase.from('spaces').select('*').limit(3),
        supabase.from('site_settings').select('*').single()
      ]);
      
      if (spacesRes.data) setFeaturedSpaces(spacesRes.data);
      if (configRes.data) setConfig(configRes.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apcef-blue"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <SEO 
        title={config.site_name}
        description={config.seo_description}
        keywords={config.keywords}
        favicon={config.favicon_url}
        image={config.hero_background}
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={config.hero_background || "https://picsum.photos/id/16/1920/1080"} 
            alt="Resort APCEF" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-apcef-blue/90 via-apcef-blue/60 to-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <div className="inline-block px-4 py-1 bg-apcef-orange/90 text-white rounded-full text-sm font-semibold mb-6 tracking-wide uppercase animate-fade-in-up">
            Referência em Eventos no ES
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {config.hero_title}
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            {config.hero_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/espacos" 
              className="px-8 py-4 bg-apcef-orange text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2"
            >
              {config.hero_button_text || 'Conhecer Espaços'} <ChevronRight size={20} />
            </Link>
            <Link 
              to="/contato" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Solicite um Orçamento
            </Link>
          </div>
        </div>
      </section>

      {/* Differentiators / Capacity Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-apcef-orange font-bold uppercase tracking-widest text-sm">Versatilidade Real</span>
            <h2 className="text-3xl font-bold text-apcef-blue mt-2">Aqui você encontra</h2>
            <div className="w-20 h-1 bg-apcef-teal mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Encontros Intimistas', range: '30 a 50 pessoas', desc: 'Ideal para reuniões familiares e pequenos comitês.' },
              { title: 'Eventos Sociais', range: 'Até 150 convidados', desc: 'Perfeito para aniversários e coquetéis em ambientes charmosos.' },
              { title: 'Grandes Celebrações', range: 'Até 600 pessoas', desc: 'Salão climatizado para casamentos e formaturas.' },
              { title: 'Formato Plateia', range: 'Até 1.000 pessoas', desc: 'Estrutura pronta para palestras, cultos e convenções.' },
              { title: 'Grandes Produções', range: 'Até 3.000 pessoas', desc: 'Quadra poliesportiva para feiras e shows.' },
              { title: 'Infraestrutura Completa', range: 'Todo o suporte', desc: 'Estacionamento, segurança e áreas de apoio.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-apcef-blue/30 transition-all hover:shadow-lg group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white rounded-full text-apcef-blue shadow-sm group-hover:bg-apcef-blue group-hover:text-white transition-colors">
                    <Users size={24} />
                  </div>
                  <span className="text-xs font-bold text-apcef-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                    {item.range}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-apcef-blue text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-apcef-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Sua ideia, <span className="text-apcef-orange">nosso espaço.</span>
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Nossa estrutura se adapta perfeitamente a diferentes perfis de evento. Do corporativo ao religioso, temos o ambiente certo para sua necessidade.
              </p>
              <Link to="/contato" className="inline-flex items-center gap-2 bg-white text-apcef-blue px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
                Falar com consultor <ChevronRight size={18} />
              </Link>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {[
                "Casamentos", "Corporativos", "Convenções", 
                "Festas Escolares", "Formaturas", "Aniversários", 
                "Eventos Religiosos", "Institucionais"
              ].map((type, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                  <Star size={16} className="text-apcef-orange" />
                  <span className="font-medium text-sm">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose APCEF */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800">Por que escolher a APCEF/ES?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center text-apcef-blue mb-4 rotate-3 hover:rotate-0 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Localização Estratégica</h3>
              <p className="text-slate-600 text-sm">Fácil acesso na Serra/ES, próximo aos principais centros urbanos.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center text-apcef-blue mb-4 -rotate-3 hover:rotate-0 transition-transform">
                <Layout size={32} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Ambientes Versáteis</h3>
              <p className="text-slate-600 text-sm">Opções internas climatizadas e áreas ao ar livre integradas à natureza.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center text-apcef-blue mb-4 rotate-3 hover:rotate-0 transition-transform">
                <Sun size={32} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Equipamentos & Lazer</h3>
              <p className="text-slate-600 text-sm">Estrutura completa para dar suporte logístico ao seu evento.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center text-apcef-blue mb-4 -rotate-3 hover:rotate-0 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Transparência</h3>
              <p className="text-slate-600 text-sm">Atendimento claro, contratos seguros e equipe dedicada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spaces Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-apcef-teal font-semibold tracking-wider uppercase text-sm">Nossos Ambientes</span>
              <h2 className="text-3xl md:text-4xl font-bold text-apcef-blue mt-2">Espaços em Destaque</h2>
            </div>
            <Link to="/espacos" className="hidden md:flex items-center gap-1 text-apcef-orange font-semibold hover:text-orange-600">
              Ver todos <ChevronRight size={18} />
            </Link>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apcef-blue"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredSpaces.map(space => (
                <Link to={`/espacos/${space.id}`} key={space.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 bg-apcef-blue/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {space.type}
                    </div>
                    <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-apcef-orange transition-colors">{space.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <Users size={16} className="text-apcef-teal" />
                      <span>{space.capacity} pessoas</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{space.description}</p>
                    <div className="flex items-center text-apcef-blue font-semibold text-sm">
                      Ver detalhes do espaço <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/espacos" className="inline-flex items-center gap-2 text-apcef-orange font-bold text-lg">
              Ver todos os espaços <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-apcef-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto para realizar seu evento?</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
            Não deixe para a última hora. Garanta a data ideal para sua celebração ou evento corporativo agora mesmo.
          </p>
          <Link to="/contato" className="inline-block px-10 py-4 bg-apcef-orange text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg">
            Falar no WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
};
