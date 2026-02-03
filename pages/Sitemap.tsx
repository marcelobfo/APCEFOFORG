import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Space } from '../types';

export const Sitemap: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);

  useEffect(() => {
    supabase.from('spaces').select('id, name, type').then(({ data }) => {
      if (data) setSpaces(data);
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-apcef-blue mb-8">Mapa do Site</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Páginas Institucionais</h2>
            <ul className="space-y-3">
              <li><Link to="/" className="text-apcef-blue hover:underline hover:text-apcef-orange">Página Inicial</Link></li>
              <li><Link to="/about" className="text-apcef-blue hover:underline hover:text-apcef-orange">Sobre a APCEF</Link></li>
              <li><Link to="/contact" className="text-apcef-blue hover:underline hover:text-apcef-orange">Fale Conosco</Link></li>
              <li><Link to="/spaces" className="text-apcef-blue hover:underline hover:text-apcef-orange">Listagem de Espaços</Link></li>
              <li><Link to="/client-login" className="text-apcef-blue hover:underline hover:text-apcef-orange">Área do Cliente</Link></li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Nossos Espaços</h2>
            <ul className="space-y-3">
              {spaces.map(space => (
                <li key={space.id}>
                  <Link to={`/spaces/${space.id}`} className="text-apcef-blue hover:underline hover:text-apcef-orange flex items-center gap-2">
                    <span>{space.name}</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{space.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};