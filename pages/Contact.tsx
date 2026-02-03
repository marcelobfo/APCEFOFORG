import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { SiteConfig } from '../types';
import { INITIAL_SITE_CONFIG } from '../constants';

export const Contact: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Casamento',
    date: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    supabase.from('site_settings').select('*').single().then(({data}) => {
      if(data) setConfig(data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Construct the lead payload once to ensure consistency between DB and Webhook
    const leadPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      interest: `${formData.eventType} - ${formData.message}`,
      date: formData.date || new Date().toISOString().split('T')[0],
      status: 'new',
      source: 'website_contact_form'
    };

    try {
      // 1. Save to Database
      const { error } = await supabase.from('leads').insert([
        {
          name: leadPayload.name,
          email: leadPayload.email,
          phone: leadPayload.phone,
          interest: leadPayload.interest,
          date: leadPayload.date,
          status: leadPayload.status
        }
      ]);

      if (error) throw error;

      // 2. Send to Webhook (Integration)
      try {
        await fetch('https://n8n.apcef-eventos.com/webhook/new-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadPayload)
        });
      } catch (webhookError) {
          console.warn("Webhook failed (network/cors)", webhookError);
      }

      toast.success("Mensagem enviada com sucesso!");
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 5000);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: 'Casamento',
        date: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Erro ao enviar mensagem.");
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-apcef-sand min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={config.contact_banner || "https://picsum.photos/id/42/1920/1080"} 
            alt="Contato APCEF" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-apcef-blue/80 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            {config.contact_title}
          </h1>
          <p className="text-xl text-blue-50 font-light max-w-2xl mx-auto">
            {config.contact_subtitle}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Info Card */}
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-100">
              <h2 className="text-xl font-bold text-apcef-blue mb-6">Canais de Atendimento</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-blue-50 group-hover:bg-apcef-blue transition-colors rounded-full flex items-center justify-center text-apcef-blue group-hover:text-white flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Telefone & WhatsApp</p>
                    <p className="text-slate-600">{config.contact_whatsapp}</p>
                    <p className="text-xs text-slate-400 mt-1">Atendimento das 08h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-blue-50 group-hover:bg-apcef-blue transition-colors rounded-full flex items-center justify-center text-apcef-blue group-hover:text-white flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">E-mail</p>
                    <p className="text-slate-600">{config.contact_email}</p>
                    <p className="text-xs text-slate-400 mt-1">Respondemos em até 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-blue-50 group-hover:bg-apcef-blue transition-colors rounded-full flex items-center justify-center text-apcef-blue group-hover:text-white flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Endereço</p>
                    <p className="text-slate-600">Av. Bicanga, 2121 - Bicanga</p>
                    <p className="text-slate-600">Serra - ES, 29164-152</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed Card */}
            <div className="bg-white p-4 rounded-2xl shadow-soft border border-slate-100 overflow-hidden hover:shadow-lg transition-all h-[300px]">
               <iframe 
                 src="https://maps.google.com/maps?q=Av.+Bicanga,+2121+-+Bicanga,+Serra+-+ES&t=&z=15&ie=UTF8&iwloc=&output=embed"
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="rounded-xl w-full h-full"
               ></iframe>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm">
                <Clock size={16} />
                <span>Visitas técnicas: Seg a Sex, 09h às 16h</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-soft border border-slate-100 h-full">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Envie uma Mensagem</h2>
              <p className="text-slate-500 mb-8">Preencha o formulário abaixo e entraremos em contato com um orçamento preliminar.</p>

              {formStatus === 'success' ? (
                <div className="h-96 flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Send size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Mensagem Enviada!</h3>
                  <p className="text-slate-600 max-w-md">
                    Obrigado pelo contato. Nossa equipe comercial responderá sua solicitação em breve através do e-mail ou WhatsApp informado.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Seu Nome</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="input-premium w-full px-4 py-3 rounded-xl"
                        placeholder="Nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Seu E-mail</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-premium w-full px-4 py-3 rounded-xl"
                        placeholder="exemplo@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp / Telefone</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="input-premium w-full px-4 py-3 rounded-xl"
                        placeholder="(27) 99999-9999"
                      />
                    </div>
                    <div>
                       <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipo de Evento</label>
                       <div className="relative">
                         <select 
                            value={formData.eventType}
                            onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                            className="input-premium w-full px-4 py-3 rounded-xl appearance-none"
                         >
                           <option>Casamento</option>
                           <option>Aniversário</option>
                           <option>Corporativo / Empresa</option>
                           <option>Churrasco / Confraternização</option>
                           <option>Outro</option>
                         </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                         </div>
                       </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mensagem ou Detalhes</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="input-premium w-full px-4 py-3 rounded-xl h-32 resize-none"
                      placeholder="Conte um pouco mais sobre o que você planeja..."
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end pt-4">
                    <button 
                      type="submit" 
                      disabled={formStatus === 'sending'}
                      className="px-8 py-4 bg-apcef-orange hover:bg-apcef-orangeDark text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transform active:scale-95"
                    >
                      {formStatus === 'sending' ? 'Enviando...' : <><Send size={18} /> Enviar Mensagem</>}
                    </button>
                    {formStatus === 'error' && <span className="ml-4 text-red-500 font-bold">Erro ao enviar. Tente novamente.</span>}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Perguntas Frequentes</h2>
            <p className="text-slate-500">Tire suas dúvidas rápidas antes de entrar em contato.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'Preciso ser sócio para alugar?', a: 'Não! Nossos espaços estão disponíveis para locação tanto para associados quanto para o público externo (com tabela de preços diferenciada).' },
              { q: 'O buffet é incluso?', a: 'Não. Trabalhamos apenas com a locação do espaço. Você tem liberdade para contratar o buffet de sua preferência, desde que siga as normas do clube.' },
              { q: 'Posso agendar visita técnica?', a: 'Com certeza. As visitas podem ser realizadas de segunda a sexta, das 09h às 16h, sem agendamento prévio. Para fins de semana, consulte disponibilidade.' },
              { q: 'Qual a forma de pagamento?', a: 'Para garantir a reserva, solicitamos 50% do valor na assinatura do contrato e o restante até 10 dias antes do evento.' }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 hover:border-apcef-blue/30 shadow-sm transition-all hover:shadow-md">
                <h3 className="font-bold text-apcef-blue mb-2 flex items-start gap-2">
                  <MessageSquare size={18} className="mt-1 text-apcef-orange flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-slate-600 text-sm pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};