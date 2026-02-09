import React from 'react';
import { Layout } from '../components/Layout';
import { Calendar, Download, Clock, MapPin, CheckCircle } from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-apcef-blue to-blue-900 px-10 py-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <h1 className="text-3xl font-bold text-white relative z-10">Minhas Reservas</h1>
              <p className="text-blue-200 text-sm mt-1 relative z-10 flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                 Olá, João Silva
              </p>
            </div>
            
            <div className="p-10">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-bold text-slate-800">Próximos Eventos</h2>
                 <button className="text-sm text-apcef-blue font-bold hover:underline">Ver Histórico</button>
               </div>
               
               <div className="space-y-6">
                 {/* Confirmed Item */}
                 <div className="flex flex-col md:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="w-full md:w-64 bg-slate-200 h-48 md:h-auto overflow-hidden relative">
                      <img src="https://picsum.photos/id/1080/400/300" alt="Space" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <CheckCircle size={12} /> Confirmado
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                       <div>
                         <div className="flex justify-between items-start mb-3">
                           <h3 className="font-bold text-xl text-slate-800">Pequenas Confraternizações</h3>
                         </div>
                         <div className="flex flex-col gap-2 text-slate-500 text-sm mb-4">
                           <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-apcef-orange"/> 
                              <span className="font-medium text-slate-700">15 de Junho, 2026</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-apcef-teal"/> 
                              <span>Área das Churrasqueiras</span>
                           </div>
                         </div>
                       </div>
                       <div className="mt-4 flex gap-4 border-t border-slate-100 pt-4">
                         <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors">
                           <Download size={14} /> Baixar Contrato
                         </button>
                       </div>
                    </div>
                 </div>

                 {/* Pending Item */}
                 <div className="flex flex-col md:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 opacity-90 group">
                    <div className="w-full md:w-64 bg-slate-200 h-48 md:h-auto overflow-hidden relative">
                      <img src="https://picsum.photos/id/10/400/300" alt="Space" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.3]" />
                      <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Clock size={12} /> Em Análise
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                       <div>
                         <div className="flex justify-between items-start mb-3">
                           <h3 className="font-bold text-xl text-slate-800">Choupana Garden</h3>
                         </div>
                         <div className="flex flex-col gap-2 text-slate-500 text-sm mb-4">
                           <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-apcef-orange"/> 
                              <span className="font-medium text-slate-700">20 de Julho, 2026</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-apcef-teal"/> 
                              <span>Área Externa</span>
                           </div>
                         </div>
                       </div>
                       <div className="mt-4 flex items-center gap-2 text-xs font-medium text-yellow-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                          <Clock size={16} className="flex-shrink-0" /> Aguardando aprovação da administração. Você receberá um email em breve.
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};