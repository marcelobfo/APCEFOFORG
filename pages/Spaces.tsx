import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Filter, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Space, SiteConfig } from '../types';
import { INITIAL_SITE_CONFIG } from '../constants';

export const Spaces: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [minCapacity, setMinCapacity] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [spacesRes, configRes] = await Promise.all([
        supabase.from('spaces').select('*'),
        supabase.from('site_settings').select('*').single()
      ]);

      if (spacesRes.data) setSpaces(spacesRes.data);
      if (configRes.data) setConfig(configRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSpaces = spaces.filter(space => {
    const matchesType = filterType === 'all' || space.type === filterType;
    const matchesCapacity = space.capacity >= minCapacity;
    return matchesType && matchesCapacity;
  });

  const uniqueTypes = Array.from(new Set(spaces.map(s => s.type)));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dynamic Header */}
      <div className="relative bg-apcef-blue py-20 px-4 mb-10 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <img src={config.spaces_banner || "https://picsum.photos/id/16/1920/600"} className="w-full h-full object-cover" alt="Banner" />
         </div>
         <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">{config.spaces_title}</h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              {config.spaces_subtitle}
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-apcef-blue font-bold text-lg border-b pb-4">
                <Filter size={20} /> Filtros
              </div>
              
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Tipo de Evento</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={filterType === 'all'} 
                      onChange={() => setFilterType('all')}
                      className="accent-apcef-orange"
                    />
                    <span className={`text-sm ${filterType === 'all' ? 'text-apcef-blue font-medium' : 'text-gray-600 group-hover:text-apcef-blue'}`}>Todos</span>
                  </label>
                  {uniqueTypes.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="type" 
                        checked={filterType === type} 
                        onChange={() => setFilterType(type)}
                        className="accent-apcef-orange"
                      />
                      <span className={`text-sm ${filterType === type ? 'text-apcef-blue font-medium' : 'text-gray-600 group-hover:text-apcef-blue'}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Capacidade Mínima</h3>
                <input 
                  type="range" 
                  min="0" 
                  max="4000" 
                  step="50" 
                  value={minCapacity} 
                  onChange={(e) => setMinCapacity(Number(e.target.value))}
                  className="w-full accent-apcef-orange h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-2 text-sm text-apcef-blue font-medium text-right">
                  {minCapacity > 0 ? `${minCapacity}+ pessoas` : 'Qualquer capacidade'}
                </div>
              </div>
            </div>
          </div>

          {/* Grid Results */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apcef-blue"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSpaces.length > 0 ? (
                  filteredSpaces.map(space => (
                    <Link to={`/espacos/${space.id}`} key={space.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                      <div className="relative h-56 overflow-hidden">
                        <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-apcef-blue shadow-sm">
                          {space.type}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-apcef-orange transition-colors">{space.name}</h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                          <Users size={16} className="text-apcef-teal" />
                          <span>Até {space.capacity} convidados</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">{space.description}</p>
                        
                        {space.availability && (
                           <div className="mb-4 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 flex items-start gap-2">
                             <Clock size={14} className="mt-0.5 text-apcef-blue"/>
                             <span>{space.availability}</span>
                           </div>
                        )}
                        
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                          <span className="px-4 py-2 bg-apcef-blue text-white text-sm font-medium rounded-lg group-hover:bg-apcef-orange transition-colors">
                            Ver Detalhes
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-20">
                    <div className="inline-block p-4 rounded-full bg-blue-50 text-apcef-blue mb-4">
                      <Filter size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Nenhum espaço encontrado</h3>
                    <p className="text-gray-500">Tente ajustar os filtros para encontrar o que procura.</p>
                    <button onClick={() => { setFilterType('all'); setMinCapacity(0); }} className="mt-4 text-apcef-orange font-medium hover:underline">
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};