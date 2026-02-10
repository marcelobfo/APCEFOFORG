
import React, { useEffect, useState } from 'react';
import { Award, Users, Map, Shield, Heart, Sun } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SiteConfig } from '../types';
import { INITIAL_SITE_CONFIG } from '../constants';

export const About: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);

  useEffect(() => {
    supabase.from('site_settings').select('*').single().then(({data}) => {
      if(data) {
        // Merge with initial config to ensure no fields are undefined if DB has nulls
        setConfig(prev => ({...prev, ...data}));
      }
    });
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={config.about_banner || "https://picsum.photos/id/124/1920/1080"} 
            alt="Clube APCEF" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-apcef-blue/90 to-apcef-blue/50"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {config.about_title || "Muito mais que um clube."} <br/>
            <span className="text-apcef-orange">{config.about_subtitle || "Uma família."}</span>
          </h1>
          <p className="text-xl text-blue-100 font-light">
            Há mais de 60 anos promovendo qualidade de vida, lazer e integração para os economiários e toda a sociedade capixaba.
          </p>
        </div>
      </section>

      {/* History & Context */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-100 text-apcef-blue font-bold rounded-full text-sm mb-4 uppercase tracking-wider">
              Nossa História
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{config.about_history_title || "Tradição em Bem-Receber"}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-wrap">
              {config.about_history_text || "A Associação do Pessoal da Caixa Econômica Federal do Espírito Santo (APCEF/ES) foi fundada com o objetivo de criar um refúgio de lazer e integração para os funcionários da Caixa e seus familiares.\n\nAo longo das décadas, expandimos nossa infraestrutura e abrimos as portas para a comunidade capixaba, tornando-nos referência em eventos sociais e corporativos no estado. Nossa sede em Bicanga é um verdadeiro oásis com completa infraestrutura de esporte e lazer."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={config.about_image_1 || "https://picsum.photos/id/433/400/500"} 
              className="rounded-2xl shadow-lg mt-8 w-full h-auto object-cover" 
              alt="História 1" 
            />
            <img 
              src={config.about_image_2 || "https://picsum.photos/id/296/400/500"} 
              className="rounded-2xl shadow-lg w-full h-auto object-cover" 
              alt="História 2" 
            />
          </div>
        </div>
      </section>

      {/* Infrastructure Highlights */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-apcef-blue">Infraestrutura Completa</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Além dos espaços para eventos, nossa sede oferece uma estrutura de resort para o lazer dos associados e convidados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Parque Aquático', icon: Sun, desc: 'Piscinas adulto e infantil com toboáguas e área de sol.' },
              { title: 'Complexo Esportivo', icon: Award, desc: 'Ginásio, campos de futebol society e quadras de areia.' },
              { title: 'Acomodações', icon: Heart, desc: 'Chalés confortáveis para hospedagem de fim de semana.' },
              { title: 'Área Verde', icon: Map, desc: 'Ampla área preservada para contato com a natureza.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
                <div className="w-14 h-14 bg-blue-50 text-apcef-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values/Manifesto */}
      <section className="py-20 bg-apcef-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield size={48} className="mx-auto text-apcef-orange mb-6" />
          <h2 className="text-3xl font-bold mb-8">Nosso Compromisso</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-blue-700 rounded-xl bg-blue-900/30">
              <h3 className="text-xl font-bold text-apcef-orange mb-3">Segurança</h3>
              <p className="text-blue-100">Ambiente monitorado e portaria 24h para garantir a tranquilidade do seu evento.</p>
            </div>
            <div className="p-6 border border-blue-700 rounded-xl bg-blue-900/30">
              <h3 className="text-xl font-bold text-apcef-orange mb-3">Excelência</h3>
              <p className="text-blue-100">Manutenção impecável e equipe treinada para oferecer suporte de ponta.</p>
            </div>
            <div className="p-6 border border-blue-700 rounded-xl bg-blue-900/30">
              <h3 className="text-xl font-bold text-apcef-orange mb-3">Sustentabilidade</h3>
              <p className="text-blue-100">Práticas de gestão de resíduos e respeito à área ambiental onde estamos inseridos.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
