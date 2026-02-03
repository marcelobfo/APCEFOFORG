
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SiteConfig } from '../types';
import { INITIAL_SITE_CONFIG } from '../constants';
import { SEO } from './SEO';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  
  const location = useLocation();
  const isLinkActive = (path: string) => location.pathname === path;

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) {
        setConfig(data);
      }
    } catch (err) {
      console.error('Error fetching site settings', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={config.seo_title}
        description={config.seo_description}
        keywords={config.keywords}
        favicon={config.favicon_url}
      />

      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                {config.logo_url ? (
                  <img src={config.logo_url} alt={config.site_name} className="h-12 object-contain" />
                ) : (
                  <>
                    <div className="w-10 h-10 bg-apcef-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      A
                    </div>
                    <span className="font-bold text-2xl text-apcef-blue tracking-tight">
                      APCEF <span className="text-apcef-orange">EVENTOS</span>
                    </span>
                  </>
                )}
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${isLinkActive('/') ? 'text-apcef-orange font-semibold' : 'text-gray-600 hover:text-apcef-blue'} transition-colors`}>Home</Link>
              <Link to="/spaces" className={`${isLinkActive('/spaces') ? 'text-apcef-orange font-semibold' : 'text-gray-600 hover:text-apcef-blue'} transition-colors`}>Espaços</Link>
              <Link to="/about" className={`${isLinkActive('/about') ? 'text-apcef-orange font-semibold' : 'text-gray-600 hover:text-apcef-blue'} transition-colors`}>Sobre o Clube</Link>
              <Link to="/contact" className={`${isLinkActive('/contact') ? 'text-apcef-orange font-semibold' : 'text-gray-600 hover:text-apcef-blue'} transition-colors`}>Contato</Link>
              
              <div className="border-l pl-6 flex items-center space-x-4">
                <Link to="/client-login" className="flex items-center gap-2 text-sm font-medium text-apcef-blue hover:text-apcef-orange transition-colors">
                  <User size={18} />
                  Área do Cliente
                </Link>
                <Link to="/spaces" className="flex items-center gap-2 px-4 py-2 bg-apcef-blue text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl">
                  Reservar Agora
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-apcef-blue"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-apcef-blue hover:bg-gray-50">Home</Link>
              <Link to="/spaces" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-apcef-blue hover:bg-gray-50">Espaços</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-apcef-blue hover:bg-gray-50">Sobre</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-apcef-blue hover:bg-gray-50">Contato</Link>
              <Link to="/client-login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-apcef-teal hover:bg-teal-50">Área do Cliente</Link>
              <Link to="/admin-login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-apcef-blue hover:bg-blue-50">Área Administrativa</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-apcef-blue text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                {config.logo_url ? (
                   <img src={config.logo_url} className="h-8 bg-white rounded p-1" alt="Logo Footer" />
                ) : (
                   <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-apcef-blue font-bold">A</div>
                )}
                <span className="font-bold text-xl">{config.site_name.toUpperCase()}</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                {config.seo_description ? config.seo_description.substring(0, 120) + '...' : 'O cenário perfeito para seus momentos inesquecíveis.'}
              </p>
            </div>
            
            <div>
              <h3 className="text-apcef-orange font-semibold mb-4 uppercase text-sm tracking-wider">Links Rápidos</h3>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li><Link to="/spaces" className="hover:text-white transition-colors">Nossos Espaços</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">O Clube</Link></li>
                <li><Link to="/client-login" className="hover:text-white transition-colors">Minhas Reservas</Link></li>
                <li><Link to="/sitemap" className="hover:text-white transition-colors">Mapa do Site</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-apcef-orange font-semibold mb-4 uppercase text-sm tracking-wider">Contato</h3>
              <ul className="space-y-3 text-blue-100 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-apcef-teal" />
                  <span>Av. Bicanga, 2121 - Bicanga,<br/>Serra - ES, 29164-152</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-apcef-teal" />
                  <span>{config.contact_whatsapp}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-apcef-orange font-semibold mb-4 uppercase text-sm tracking-wider">Siga-nos</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-apcef-orange transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-apcef-orange transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
              <p className="mt-6 text-xs text-blue-300">
                CNPJ: 42.895.823/0001-72
              </p>
            </div>
          </div>
          
          <div className="border-t border-blue-800 pt-6 text-center text-xs text-blue-300">
            &copy; {new Date().getFullYear()} {config.site_name}. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};
