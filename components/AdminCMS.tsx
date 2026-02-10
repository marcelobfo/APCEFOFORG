import React, { useState } from 'react';
import { Settings, Layout as LayoutIcon, Save, Plus, Edit, Trash2, Calendar as CalendarIcon, ChevronLeft, Image as ImageIcon, XCircle, Video, Link as LinkIcon, Clock, List, RefreshCw, BarChart } from 'lucide-react';
import { SiteConfig, Space, SpaceType } from '../types';

interface AdminCMSProps {
  siteConfig: SiteConfig;
  setSiteConfig: (config: SiteConfig) => void;
  handleSaveConfig: () => void;
  spaces: Space[];
  handleEditSpace: (space: Space) => void;
  handleDeleteSpace: (id: string) => void;
  handleNewSpace: () => void;
  isSpaceModalOpen: boolean;
  setIsSpaceModalOpen: (open: boolean) => void;
  currentSpace: Partial<Space>;
  setCurrentSpace: (space: Partial<Space>) => void;
  handleSaveSpace: () => void;
  handleSeedSpaces?: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  siteConfig, setSiteConfig, handleSaveConfig,
  spaces, handleEditSpace, handleDeleteSpace, handleNewSpace,
  isSpaceModalOpen, setIsSpaceModalOpen, currentSpace, setCurrentSpace, handleSaveSpace,
  handleSeedSpaces
}) => {
  const [cmsSection, setCmsSection] = useState<'pages' | 'spaces'>('pages');
  const [activePageEditor, setActivePageEditor] = useState<'general' | 'marketing' | 'home' | 'about' | 'contact' | 'spaces'>('general');
  const [newGalleryImage, setNewGalleryImage] = useState('');

  // Helper for Gallery Management
  const addGalleryImage = () => {
    if (!newGalleryImage) return;
    const currentGallery = currentSpace.gallery || [];
    setCurrentSpace({ ...currentSpace, gallery: [...currentGallery, newGalleryImage] });
    setNewGalleryImage('');
  };

  const removeGalleryImage = (index: number) => {
    const currentGallery = currentSpace.gallery || [];
    setCurrentSpace({ ...currentSpace, gallery: currentGallery.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sub-navigation */}
      <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex gap-2 w-fit sticky top-0 z-10">
        <button 
          onClick={() => setCmsSection('pages')} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${cmsSection === 'pages' ? 'bg-apcef-blue text-white shadow-md' : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'}`}
        >
          <Settings size={16} /> Configuração Global
        </button>
        <button 
          onClick={() => setCmsSection('spaces')} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${cmsSection === 'spaces' ? 'bg-apcef-blue text-white shadow-md' : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'}`}
        >
          <LayoutIcon size={16} /> Catálogo de Espaços
        </button>
      </div>

      {cmsSection === 'pages' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden pb-12">
           <div className="border-b border-slate-100 p-6 bg-slate-50/50">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Selecione a Seção</label>
             <div className="flex flex-wrap gap-2">
                {[
                  { id: 'general', label: 'Identidade & SEO' },
                  { id: 'marketing', label: 'Analytics & Pixel' },
                  { id: 'home', label: 'Página Inicial' },
                  { id: 'about', label: 'Sobre Nós' },
                  { id: 'contact', label: 'Contato' },
                  { id: 'spaces', label: 'Listagem de Espaços' },
                ].map(page => (
                  <button
                    key={page.id}
                    onClick={() => setActivePageEditor(page.id as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${activePageEditor === page.id ? 'bg-apcef-blue text-white border-apcef-blue shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                  >
                    {page.label}
                  </button>
                ))}
             </div>
           </div>

           <div className="p-8">
             {/* GENERAL / SEO */}
             {activePageEditor === 'general' && (
               <div className="space-y-6 max-w-3xl animate-fade-in">
                  <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2 mb-6">Configurações Globais</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Site</label>
                    <input 
                      type="text" 
                      value={siteConfig.site_name}
                      onChange={(e) => setSiteConfig({...siteConfig, site_name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Título SEO (Meta Title)</label>
                    <input 
                      type="text" 
                      value={siteConfig.seo_title}
                      onChange={(e) => setSiteConfig({...siteConfig, seo_title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Descrição SEO</label>
                    <textarea 
                      value={siteConfig.seo_description}
                      onChange={(e) => setSiteConfig({...siteConfig, seo_description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none h-24 resize-none input-premium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">URL do Logo</label>
                      <input 
                        type="text" 
                        value={siteConfig.logo_url}
                        onChange={(e) => setSiteConfig({...siteConfig, logo_url: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">URL do Favicon</label>
                      <input 
                        type="text" 
                        value={siteConfig.favicon_url}
                        onChange={(e) => setSiteConfig({...siteConfig, favicon_url: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                    </div>
                  </div>
               </div>
             )}

             {/* MARKETING / ANALYTICS */}
             {activePageEditor === 'marketing' && (
               <div className="space-y-6 max-w-3xl animate-fade-in">
                  <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2 mb-6 flex items-center gap-2">
                    <BarChart className="text-apcef-orange" /> Marketing & Analytics
                  </h3>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 text-sm text-blue-800">
                    <p>Insira abaixo os identificadores das plataformas de rastreamento. As tags serão injetadas automaticamente no site.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Google Analytics ID (GA4)</label>
                    <input 
                      type="text" 
                      value={siteConfig.google_analytics_id || ''}
                      onChange={(e) => setSiteConfig({...siteConfig, google_analytics_id: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium font-mono text-sm"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6 mt-6">
                    <h4 className="font-bold text-slate-800 mb-4">Facebook / Meta</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Facebook Pixel ID</label>
                        <input 
                          type="text" 
                          value={siteConfig.facebook_pixel_id || ''}
                          onChange={(e) => setSiteConfig({...siteConfig, facebook_pixel_id: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium font-mono text-sm"
                          placeholder="Ex: 1234567890"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Conversion API Access Token</label>
                        <textarea 
                          value={siteConfig.facebook_access_token || ''}
                          onChange={(e) => setSiteConfig({...siteConfig, facebook_access_token: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium font-mono text-xs h-24"
                          placeholder="Cole o token de acesso da Graph API aqui..."
                        />
                        <p className="text-xs text-slate-400 mt-1">Usado para enviar eventos via API (Server-side/CAPI).</p>
                      </div>
                    </div>
                  </div>
               </div>
             )}

             {/* HOME EDITOR */}
             {activePageEditor === 'home' && (
               <div className="space-y-6 max-w-3xl animate-fade-in">
                  <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2 mb-6">Conteúdo da Home</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Título Principal (Hero)</label>
                    <input 
                      type="text" 
                      value={siteConfig.hero_title}
                      onChange={(e) => setSiteConfig({...siteConfig, hero_title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subtítulo</label>
                    <textarea 
                      value={siteConfig.hero_subtitle}
                      onChange={(e) => setSiteConfig({...siteConfig, hero_subtitle: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none h-28 resize-none input-premium" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Imagem de Fundo (Hero)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={siteConfig.hero_background || ''}
                        onChange={(e) => setSiteConfig({...siteConfig, hero_background: e.target.value})}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                      {siteConfig.hero_background && <img src={siteConfig.hero_background} className="h-12 w-20 object-cover rounded-lg border border-slate-200" />}
                    </div>
                  </div>
               </div>
             )}

             {/* ABOUT EDITOR */}
             {activePageEditor === 'about' && (
               <div className="space-y-6 max-w-3xl animate-fade-in">
                  <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2 mb-6">Página Sobre</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Imagem de Banner (URL)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={siteConfig.about_banner || ''}
                        onChange={(e) => setSiteConfig({...siteConfig, about_banner: e.target.value})}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                      {siteConfig.about_banner && <img src={siteConfig.about_banner} className="h-12 w-20 object-cover rounded-lg border border-slate-200" />}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Título</label>
                      <input 
                        type="text" 
                        value={siteConfig.about_title || ''}
                        onChange={(e) => setSiteConfig({...siteConfig, about_title: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Subtítulo</label>
                      <input 
                        type="text" 
                        value={siteConfig.about_subtitle || ''}
                        onChange={(e) => setSiteConfig({...siteConfig, about_subtitle: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Título da História</label>
                    <input 
                      type="text" 
                      value={siteConfig.about_history_title || ''}
                      onChange={(e) => setSiteConfig({...siteConfig, about_history_title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Texto da História</label>
                    <textarea 
                      value={siteConfig.about_history_text || ''}
                      onChange={(e) => setSiteConfig({...siteConfig, about_history_text: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none h-40 resize-none input-premium" 
                    />
                  </div>
               </div>
             )}

             {/* CONTACT EDITOR */}
             {activePageEditor === 'contact' && (
               <div className="space-y-6 max-w-3xl animate-fade-in">
                  <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2 mb-6">Página Contato</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Imagem de Banner (URL)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={siteConfig.contact_banner || ''}
                        onChange={(e) => setSiteConfig({...siteConfig, contact_banner: e.target.value})}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                      {siteConfig.contact_banner && <img src={siteConfig.contact_banner} className="h-12 w-20 object-cover rounded-lg border border-slate-200" />}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Título</label>
                    <input 
                      type="text" 
                      value={siteConfig.contact_title || ''}
                      onChange={(e) => setSiteConfig({...siteConfig, contact_title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subtítulo</label>
                    <input 
                      type="text" 
                      value={siteConfig.contact_subtitle || ''}
                      onChange={(e) => setSiteConfig({...siteConfig, contact_subtitle: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email de Contato</label>
                      <input 
                        type="email" 
                        value={siteConfig.contact_email}
                        onChange={(e) => setSiteConfig({...siteConfig, contact_email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp / Telefone</label>
                      <input 
                        type="text" 
                        value={siteConfig.contact_whatsapp}
                        onChange={(e) => setSiteConfig({...siteConfig, contact_whatsapp: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                    </div>
                  </div>
               </div>
             )}

             {/* SPACES LISTING EDITOR */}
             {activePageEditor === 'spaces' && (
               <div className="space-y-6 max-w-3xl animate-fade-in">
                  <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2 mb-6">Página de Listagem</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Imagem de Banner (URL)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={siteConfig.spaces_banner || ''}
                        onChange={(e) => setSiteConfig({...siteConfig, spaces_banner: e.target.value})}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                      />
                      {siteConfig.spaces_banner && <img src={siteConfig.spaces_banner} className="h-12 w-20 object-cover rounded-lg border border-slate-200" />}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Título</label>
                    <input 
                      type="text" 
                      value={siteConfig.spaces_title || ''}
                      onChange={(e) => setSiteConfig({...siteConfig, spaces_title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none input-premium" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subtítulo</label>
                    <textarea 
                      value={siteConfig.spaces_subtitle || ''}
                      onChange={(e) => setSiteConfig({...siteConfig, spaces_subtitle: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-apcef-blue focus:outline-none h-24 resize-none input-premium" 
                    />
                  </div>
               </div>
             )}

             <div className="mt-8 flex justify-end">
                <button onClick={handleSaveConfig} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-bold shadow-lg shadow-green-900/10 transition-transform active:scale-95">
                  <Save size={18} /> Salvar Conteúdo
                </button>
             </div>
           </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden pb-12">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
             <div>
               <h3 className="font-bold text-slate-800 text-xl">Catálogo de Espaços</h3>
               <p className="text-slate-500 text-sm mt-1">Gerencie fotos e disponibilidade.</p>
             </div>
             <div className="flex gap-3">
               {handleSeedSpaces && (
                 <button onClick={handleSeedSpaces} className="px-4 py-3 bg-orange-100 text-orange-700 rounded-xl text-sm font-bold hover:bg-orange-200 flex items-center gap-2 transition-colors">
                   <RefreshCw size={18} /> Restaurar Padrões
                 </button>
               )}
               <button onClick={handleNewSpace} className="px-6 py-3 bg-apcef-blue text-white rounded-xl text-sm font-bold hover:bg-blue-800 flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                 <Plus size={18} /> Novo Espaço
               </button>
             </div>
           </div>
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
               <tr>
                 <th className="p-6 pl-8">Espaço</th>
                 <th className="p-6">Capacidade</th>
                 <th className="p-6">Tipo</th>
                 <th className="p-6 text-right pr-8">Ações</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {spaces.map(space => (
                 <tr key={space.id} className="hover:bg-slate-50/80 transition-colors group">
                   <td className="p-6 pl-8">
                     <div className="flex items-center gap-4">
                       <img src={space.image} className="w-16 h-16 rounded-lg object-cover shadow-sm border border-slate-200" alt="" />
                       <div>
                         <span className="font-bold text-slate-800 block text-base">{space.name}</span>
                       </div>
                     </div>
                   </td>
                   <td className="p-6 text-slate-600 font-medium">{space.capacity} pax</td>
                   <td className="p-6">
                     <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                       {space.type}
                     </span>
                   </td>
                   <td className="p-6 text-right pr-8">
                     <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleEditSpace(space)} className="p-2 text-apcef-blue hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                         <Edit size={18} />
                       </button>
                       <button onClick={() => handleDeleteSpace(space.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                         <Trash2 size={18} />
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
               {spaces.length === 0 && (
                 <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">
                       Nenhum espaço cadastrado. Utilize o botão "Restaurar Padrões" para carregar a lista inicial.
                    </td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      )}

      {/* MODAL FOR SPACE EDIT/CREATE */}
      {isSpaceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                {currentSpace.id ? <Edit size={20} className="text-apcef-blue"/> : <Plus size={20} className="text-apcef-blue"/>}
                {currentSpace.id ? 'Editar Espaço' : 'Novo Espaço'}
              </h3>
              <button onClick={() => setIsSpaceModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors bg-slate-100 p-2 rounded-full">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-10 overflow-y-auto flex-1 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Espaço</label>
                     <input 
                       type="text" 
                       value={currentSpace.name || ''}
                       onChange={e => setCurrentSpace({...currentSpace, name: e.target.value})}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                       placeholder="Ex: Salão Nobre"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Tipo de Evento</label>
                     <div className="relative">
                       <select 
                         value={currentSpace.type || SpaceType.SOCIAL}
                         onChange={e => setCurrentSpace({...currentSpace, type: e.target.value as SpaceType})}
                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue appearance-none input-premium"
                       >
                         {Object.values(SpaceType).map(t => <option key={t} value={t}>{t}</option>)}
                       </select>
                       <ChevronLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-slate-400 pointer-events-none"/>
                     </div>
                   </div>
                   
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Capacidade</label>
                      <input 
                        type="number" 
                        value={currentSpace.capacity || ''}
                        onChange={e => setCurrentSpace({...currentSpace, capacity: Number(e.target.value)})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                      />
                   </div>
                   
                   {/* NEW: Availability */}
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Disponibilidade / Funcionamento</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          value={currentSpace.availability || ''}
                          onChange={e => setCurrentSpace({...currentSpace, availability: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                          placeholder="Ex: Seg a Sex, 08h às 18h"
                        />
                      </div>
                   </div>

                   {/* NEW: Items Included */}
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Itens Inclusos <span className="text-xs font-normal text-slate-400 ml-1">(separar por vírgula)</span></label>
                      <div className="relative">
                        <List className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          value={currentSpace.itemsIncluded?.join(', ') || ''}
                          onChange={e => setCurrentSpace({...currentSpace, itemsIncluded: e.target.value.split(',').map(s => s.trim())})}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                          placeholder="Mesas, Cadeiras, Grelha..."
                        />
                      </div>
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Diferenciais <span className="text-xs font-normal text-slate-400 ml-1">(separar por vírgula)</span></label>
                      <input 
                        type="text" 
                        value={currentSpace.features?.join(', ') || ''}
                        onChange={e => setCurrentSpace({...currentSpace, features: e.target.value.split(',').map(s => s.trim())})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                        placeholder="Ar condicionado, Wifi, Palco..."
                      />
                   </div>
                   
                   {/* Video Integration */}
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Link do Vídeo (Opcional)</label>
                      <div className="relative">
                        <Video className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          value={currentSpace.video_url || ''}
                          onChange={e => setCurrentSpace({...currentSpace, video_url: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                          placeholder="https://youtube.com/..."
                        />
                      </div>
                   </div>
                </div>
                
                <div className="space-y-6">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Imagem Principal</label>
                     <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={currentSpace.image || ''}
                         onChange={e => setCurrentSpace({...currentSpace, image: e.target.value})}
                         className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                         placeholder="https://..."
                       />
                       <button className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200"><ImageIcon size={20} /></button>
                     </div>
                   </div>
                   <div className="aspect-video bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center relative shadow-inner group">
                      {currentSpace.image ? (
                        <img src={currentSpace.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" alt="Preview" />
                      ) : (
                        <div className="text-slate-400 text-sm flex flex-col items-center">
                          <ImageIcon size={40} className="mb-2 opacity-50" />
                          Preview
                        </div>
                      )}
                   </div>

                   {/* Gallery Management */}
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Galeria de Fotos</label>
                     <div className="flex gap-2 mb-3">
                       <input 
                         type="text" 
                         value={newGalleryImage}
                         onChange={e => setNewGalleryImage(e.target.value)}
                         className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium text-sm"
                         placeholder="URL da imagem..."
                       />
                       <button onClick={addGalleryImage} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 text-xs">Adicionar</button>
                     </div>
                     <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100 max-h-32 overflow-y-auto">
                        {(currentSpace.gallery || []).map((img, idx) => (
                          <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button 
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                            >
                              <XCircle size={14} />
                            </button>
                          </div>
                        ))}
                        {(currentSpace.gallery || []).length === 0 && (
                          <span className="col-span-4 text-xs text-slate-400 text-center py-4">Nenhuma foto na galeria</span>
                        )}
                     </div>
                   </div>

                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Descrição Completa</label>
                     <textarea 
                       value={currentSpace.description || ''}
                       onChange={e => setCurrentSpace({...currentSpace, description: e.target.value})}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue h-24 resize-none input-premium"
                     />
                   </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
              <button onClick={() => setIsSpaceModalOpen(false)} className="px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-200 font-bold transition-colors">Cancelar</button>
              <button onClick={handleSaveSpace} className="px-8 py-3 bg-apcef-blue text-white rounded-xl hover:bg-blue-800 font-bold shadow-lg shadow-blue-900/10 transition-all transform active:scale-95">Salvar Espaço</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
