
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, CheckCircle, Calendar as CalendarIcon, ArrowLeft, ChevronLeft, ChevronRight, X, Send, Image as ImageIcon, Phone, User, Building2, Mail, MessageSquare, ZoomIn, Video, Clock, List } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Space } from '../types';
import { trackEvent } from '../lib/tracking';

export const SpaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Calendar Navigation State
  const [displayDate, setDisplayDate] = useState(new Date());
  
  // Modal & Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    entityName: '', // Pessoa Física ou Jurídica
    observations: ''
  });

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();
  
  useEffect(() => {
    if (id) {
      fetchSpaceDetails();
    }
  }, [id]);

  const fetchSpaceDetails = async () => {
    try {
      const { data, error } = await supabase.from('spaces').select('*').eq('id', id).single();
      if (error) throw error;
      setSpace(data);
      
      // Track ViewContent for the Space
      trackEvent('ViewContent', {
        content_name: data.name,
        content_type: 'product',
        content_ids: [data.id],
        value: data.price || 0,
        currency: 'BRL'
      });

    } catch (error) {
      console.error('Error fetching space:', error);
      toast.error('Erro ao carregar detalhes do espaço');
    } finally {
      setLoading(false);
    }
  };

  // Calendar Generation Logic
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const isDateBooked = (day: number) => {
    return false;
  };

  const handleDateClick = (day: number) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const checkDate = new Date(currentYear, currentMonth, day);
    
    if (checkDate < today) {
        toast('Selecione uma data futura', { icon: '📅' });
        return; 
    }

    const date = new Date(currentYear, currentMonth, day, 12, 0, 0);
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  };

  const nextMonth = () => {
    setDisplayDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const prevMonth = () => {
    setDisplayDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const getFormattedSelectedDate = () => {
    if (!selectedDate) return '';
    return new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { dateStyle: 'full' });
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      if (!space) return;

      const message = `SOLICITAÇÃO DE RESERVA:
      Espaço: ${space.name}
      Data: ${new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR')}
      Responsável: ${formData.entityName}
      WhatsApp: ${formData.whatsapp}
      
      Observações:
      ${formData.observations}`;

      const newLead = {
        name: formData.name,
        email: formData.email,
        phone: formData.whatsapp,
        interest: message,
        date: selectedDate, // Store the specific requested date
        status: 'new'
      };

      const { error } = await supabase.from('leads').insert([newLead]);

      if (error) throw error;
      
      // Track Lead / Purchase Intent
      trackEvent('Lead', {
        content_name: space.name,
        content_category: 'Booking Request',
        value: space.price || 0,
        currency: 'BRL',
        date: selectedDate
      }, {
        email: formData.email,
        phone: formData.whatsapp,
        fullName: formData.name
      });

      try {
        await fetch('https://n8n.apcef-eventos.com/webhook/new-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             ...newLead,
             source: 'website_form',
             space_id: space.id,
             space_name: space.name
          })
        });
        console.log('Webhook triggered successfully');
      } catch (webhookError) {
        console.warn('Webhook trigger failed (network/cors):', webhookError);
      }

      toast.success('Solicitação enviada com sucesso!');
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setIsFormOpen(false);
        setFormData({ name: '', email: '', whatsapp: '', entityName: '', observations: '' });
        setSelectedDate('');
      }, 3000);

    } catch (error) {
      console.error('Error sending reservation request:', error);
      toast.error('Erro ao enviar solicitação.');
      setFormStatus('error');
    }
  };

  // Get Gallery Images logic
  const galleryImages = space && space.gallery && space.gallery.length > 0 
    ? space.gallery 
    : space ? [space.image] : [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apcef-blue"></div></div>;
  }

  if (!space) {
    return <div className="p-20 text-center">Espaço não encontrado. <Link to="/espacos" className="text-apcef-orange">Voltar</Link></div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 relative">
      {/* Hero Header */}
      <div className="relative h-[60vh] group">
        <img src={space.image} alt={space.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-apcef-blue via-apcef-blue/20 to-transparent opacity-90"></div>
        <div className="absolute top-0 left-0 p-6">
          <Link to="/espacos" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/30">
            <ArrowLeft size={18} /> Voltar para lista
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
           <div className="max-w-7xl mx-auto animate-fade-in-up">
             <div className="flex items-center gap-4 mb-4">
                <div className="inline-block px-3 py-1 bg-apcef-orange text-white text-sm font-bold rounded shadow-lg">
                  {space.type}
                </div>
                {space.video_url && (
                  <a 
                    href={space.video_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur text-white text-sm font-bold rounded border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <Video size={16} /> Ver Vídeo Tour
                  </a>
                )}
             </div>
             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 shadow-sm">{space.name}</h1>
             <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-white/90">
               <div className="flex items-center gap-2">
                 <Users size={20} className="text-apcef-teal" />
                 <span className="text-lg font-medium">Capacidade: {space.capacity} pessoas</span>
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery Section */}
            {galleryImages.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <ImageIcon className="text-apcef-orange" /> Galeria de Fotos
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => openLightbox(idx)}
                        className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative"
                      >
                        <img src={img} alt={`Galeria ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Sobre o Espaço
                <div className="h-1 w-12 bg-apcef-orange rounded-full ml-2"></div>
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8 whitespace-pre-wrap">
                {space.description}
              </p>
              
              {/* Features & Items Included */}
              <div className="grid grid-cols-1 gap-8">
                
                {/* Features */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Estrutura e Diferenciais:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {space.features && space.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-slate-700 border border-slate-100 hover:border-blue-200 transition-colors">
                        <CheckCircle size={20} className="text-apcef-teal flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items Included - Simplified List */}
                {space.itemsIncluded && space.itemsIncluded.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <List size={20} className="text-apcef-orange"/> O que oferecemos:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 pl-2">
                      {space.itemsIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-apcef-blue"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-soft sticky top-24 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <CalendarIcon className="text-apcef-orange" /> Disponibilidade
              </h3>

              <div className="mb-6 select-none">
                <div className="flex justify-between items-center mb-6">
                   <span className="font-bold text-slate-800 text-lg capitalize">{monthNames[currentMonth]} <span className="text-slate-400 font-light">{currentYear}</span></span>
                   <div className="flex gap-2">
                     <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronLeft size={20} /></button>
                     <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronRight size={20} /></button>
                   </div>
                </div>
                
                {/* Calendar Headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d} className="py-1">{d}</div>)}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {blanks.map(b => <div key={`b-${b}`} className="py-2"></div>)}
                  {days.map(day => {
                    const booked = false; // Forced to false per requirement
                    const dateToCheck = new Date(currentYear, currentMonth, day, 12, 0, 0).toISOString().split('T')[0];
                    const isSelected = selectedDate === dateToCheck;
                    
                    return (
                      <button 
                        key={day}
                        disabled={booked}
                        onClick={() => handleDateClick(day)}
                        className={`
                          w-10 h-10 mx-auto rounded-full font-medium transition-all flex items-center justify-center relative
                          ${booked 
                            ? 'bg-red-50 text-red-300 cursor-not-allowed' 
                            : 'hover:bg-blue-50 text-slate-700 hover:text-apcef-blue'
                          }
                          ${isSelected 
                            ? '!bg-apcef-blue !text-white shadow-md ring-2 ring-blue-100 transform scale-105' 
                            : ''
                          }
                        `}
                      >
                         {day}
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex gap-4 mt-6 text-xs justify-center text-slate-500 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300"></div> Livre</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-apcef-blue"></div> Selecionado</div>
                </div>
              </div>

              {selectedDate ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 text-green-800 text-sm shadow-sm">
                    <span className="font-bold block mb-1 text-green-700 flex items-center gap-2">
                      <CheckCircle size={16}/> Data Selecionada:
                    </span>
                    <span className="capitalize text-lg">{getFormattedSelectedDate()}</span>
                  </div>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="w-full block text-center py-4 bg-apcef-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200 transform active:scale-[0.98]"
                  >
                    Solicitar Reserva
                  </button>
                  <p className="text-xs text-center text-slate-400">Preencha o formulário para enviar sua solicitação.</p>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-500 text-sm border border-slate-100 border-dashed">
                  Selecione uma data no calendário para iniciar sua solicitação.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setIsFormOpen(false)} 
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <div className="p-8 overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-50 text-apcef-blue rounded-full flex items-center justify-center mx-auto mb-4">
                   <CalendarIcon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Solicitar Reserva</h3>
                <p className="text-slate-500 text-sm mt-1">Preencha seus dados para analisarmos sua solicitação.</p>
              </div>

              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-green-700 mb-2">Solicitação Enviada!</h4>
                  <p className="text-slate-600 text-sm">Nossa equipe entrará em contato em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  
                  {/* Pre-filled Date */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                     <CalendarIcon className="text-apcef-orange" size={20} />
                     <div>
                       <p className="text-xs font-bold text-slate-500 uppercase">Data Desejada</p>
                       <p className="font-bold text-slate-800">{getFormattedSelectedDate()}</p>
                     </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Seu Nome</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="input-premium w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                        placeholder="Nome completo"
                      />
                    </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Nome da Empresa / Pessoa</label>
                     <div className="relative">
                       <Building2 className="absolute left-3 top-3 text-slate-400" size={18} />
                       <input 
                         type="text" 
                         required
                         value={formData.entityName}
                         onChange={(e) => setFormData({...formData, entityName: e.target.value})}
                         className="input-premium w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                         placeholder="PF ou Razão Social"
                       />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="input-premium w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input 
                          type="tel" 
                          required
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                          className="input-premium w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                          placeholder="(27) 99999-9999"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">Observações (Opcional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
                      <textarea
                        value={formData.observations}
                        onChange={(e) => setFormData({...formData, observations: e.target.value})}
                        className="input-premium w-full pl-10 pr-4 py-2.5 rounded-xl text-sm h-24 resize-none"
                        placeholder="Detalhes adicionais sobre o evento..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'sending'}
                    className="w-full py-3.5 bg-apcef-blue hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                  >
                    {formStatus === 'sending' ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send size={18} /> Enviar Solicitação
                      </>
                    )}
                  </button>
                  {formStatus === 'error' && <p className="text-red-500 text-xs text-center font-bold">Erro ao enviar. Tente novamente.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal (Windowed) */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden">
             {/* Header */}
             <div className="flex justify-between items-center p-4 bg-white border-b border-slate-100 z-10">
               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <ImageIcon className="text-apcef-orange" size={20} />
                 Galeria de Fotos
               </h3>
               <button 
                 onClick={() => setLightboxOpen(false)} 
                 className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
               >
                 <X size={24} />
               </button>
             </div>
             
             {/* Image Container */}
             <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
                <img 
                  src={galleryImages[currentImageIndex]} 
                  alt="Gallery" 
                  className="max-h-full max-w-full object-contain"
                />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all"
                >
                  <ChevronRight size={24} />
                </button>
             </div>

             {/* Thumbnails Footer */}
             <div className="p-4 bg-white border-t border-slate-100 overflow-x-auto">
               <div className="flex gap-2 justify-center">
                 {galleryImages.map((img, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setCurrentImageIndex(idx)}
                     className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentImageIndex === idx ? 'border-apcef-orange opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                   >
                     <img src={img} className="w-full h-full object-cover" />
                   </button>
                 ))}
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
