import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Space, SiteConfig } from '../types';
import { INITIAL_SITE_CONFIG } from '../constants';

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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={config.hero_background || "https://picsum.photos/id/16/1920/1080"} 
            alt="Resort APCEF" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-apcef-blue/90 via-apcef-blue/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <div className="inline-block px-4 py-1 bg-apcef-orange/90 text-white rounded-full text-sm font-semibold mb-6 tracking-wide uppercase animate-fade-in-up">
            Bem-vindo ao Clube
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {config.hero_title}
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            {config.hero_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/spaces" 
              className="px-8 py-4 bg-apcef-orange text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2"
            >
              {config.heroButtonText || 'Conhecer Espaços'} <ChevronRight size={20} />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-apcef-blue mb-4">Nossa História e Propósito</h2>
            <div className="w-20 h-1 bg-apcef-orange mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Desde 1958, oferecendo espaços de convivência, esporte e lazer. Agora, com uma estrutura completa para realizar o evento dos seus sonhos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Missão', icon: '🎯', desc: 'Ofertar a nossos clientes soluções de espaço para que ele possa realizar o evento de seus sonhos.' },
              { title: 'Visão', icon: '🔭', desc: 'Ser reconhecida como a melhor empresa para aluguéis de espaço da Serra, pela versatilidade, beleza dos ambientes e qualidade no atendimento.' },
              { title: 'Valores', icon: '💎', desc: 'Honestidade, Respeito e Diversidade. Somos uma entidade engajada e responsável social e ambientalmente.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow duration-300 text-center group">
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-apcef-blue mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-apcef-teal font-semibold tracking-wider uppercase text-sm">Portfólio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-apcef-blue mt-2">Espaços em Destaque</h2>
            </div>
            <Link to="/spaces" className="hidden md:flex items-center gap-1 text-apcef-orange font-semibold hover:text-orange-600">
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
                <Link to={`/spaces/${space.id}`} key={space.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 bg-apcef-blue/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {space.type}
                    </div>
                    <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-white text-sm font-medium">Valor da Diária</p>
                      <p className="text-white text-xl font-bold">R$ {space.price.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-apcef-orange transition-colors">{space.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <Users size={16} className="text-apcef-teal" />
                      <span>{space.capacity} pessoas</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{space.description}</p>
                    <div className="flex items-center text-apcef-blue font-semibold text-sm">
                      Detalhes e Disponibilidade <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/spaces" className="inline-flex items-center gap-2 text-apcef-orange font-bold text-lg">
              Ver todos os espaços <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-apcef-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Dúvidas sobre qual espaço escolher?</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
            Nossa equipe de eventos está pronta para te ajudar a planejar. Entre em contato com nossa consultora.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-apcef-orange text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg">
            Falar no WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
};