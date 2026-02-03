import React, { useState } from 'react';
import { Mail, Phone, Calendar as CalendarIcon, MessageSquare, Trash2, ArrowRight, Eye, XCircle, User, FileText } from 'lucide-react';
import { Lead } from '../types';
import { toast } from 'react-hot-toast';

interface AdminLeadsProps {
  leads: Lead[];
  onUpdateStatus: (id: string, status: Lead['status']) => void;
  onDelete: (id: string) => void;
}

export const AdminLeads: React.FC<AdminLeadsProps> = ({ leads, onUpdateStatus, onDelete }) => {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  const columns: { id: Lead['status'], title: string, color: string }[] = [
    { id: 'new', title: 'Novos Interessados', color: 'bg-blue-50/50 border-blue-200' },
    { id: 'contacted', title: 'Em Negociação', color: 'bg-orange-50/50 border-orange-200' },
    { id: 'converted', title: 'Fechados / Pagos', color: 'bg-green-50/50 border-green-200' }
  ];

  const handleDragStart = (lead: Lead) => setDraggedLead(lead);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  
  const handleDrop = (status: Lead['status']) => {
    if (draggedLead && draggedLead.status !== status) {
      onUpdateStatus(draggedLead.id, status);
      setDraggedLead(null);
    }
  };

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/55${phone.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <div className="h-[calc(100vh-200px)] overflow-hidden flex gap-6 animate-fade-in relative">
      {columns.map(col => (
        <div 
          key={col.id} 
          className={`flex-1 rounded-2xl flex flex-col h-full border ${col.color}`}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(col.id)}
        >
          <div className="p-4 border-b border-slate-200/50 flex justify-between items-center bg-white/50 backdrop-blur-sm rounded-t-2xl">
            <h3 className="font-bold text-slate-700">{col.title}</h3>
            <span className="bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm text-slate-500">
              {leads.filter(l => l.status === col.id).length}
            </span>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {leads.filter(l => l.status === col.id).map(lead => (
              <div 
                key={lead.id}
                draggable
                onDragStart={() => handleDragStart(lead)}
                onClick={() => setSelectedLead(lead)}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all group relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-slate-800">{lead.name}</h4>
                  <span className="text-[10px] text-slate-400">{new Date(lead.date).toLocaleDateString()}</span>
                </div>
                
                <p className="text-xs text-slate-500 mb-4 line-clamp-2 bg-slate-50 p-2 rounded-lg italic">"{lead.interest}"</p>
                
                <div className="flex flex-col gap-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2"><Mail size={12}/> {lead.email}</div>
                  <div className="flex items-center gap-2"><Phone size={12}/> {lead.phone}</div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                   <button 
                      onClick={(e) => { e.stopPropagation(); openWhatsApp(lead.phone); }} 
                      className="flex-1 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                   >
                     <MessageSquare size={12} /> WhatsApp
                   </button>
                   <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                      className="p-1.5 text-apcef-blue hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver Detalhes"
                   >
                      <Eye size={14} />
                   </button>
                </div>

                {/* Quick actions on hover */}
                {lead.status !== 'converted' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onUpdateStatus(lead.id, lead.status === 'new' ? 'contacted' : 'converted'); }}
                    className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-apcef-blue text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 z-10"
                    title="Avançar etapa"
                  >
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            ))}
            {leads.filter(l => l.status === col.id).length === 0 && (
               <div className="text-center py-10 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                 Nenhum lead nesta etapa
               </div>
            )}
          </div>
        </div>
      ))}

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-white p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-apcef-blue text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedLead.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <CalendarIcon size={14} /> Criado em {new Date(selectedLead.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700">
                <XCircle size={28} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto space-y-8 bg-slate-50/50">
              {/* Status Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Etapa Atual</span>
                <div className="flex gap-2">
                   <button 
                     onClick={() => { onUpdateStatus(selectedLead.id, 'new'); setSelectedLead({...selectedLead, status: 'new'}); }}
                     className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedLead.status === 'new' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                   >
                     Novo
                   </button>
                   <button 
                     onClick={() => { onUpdateStatus(selectedLead.id, 'contacted'); setSelectedLead({...selectedLead, status: 'contacted'}); }}
                     className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedLead.status === 'contacted' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                   >
                     Negociação
                   </button>
                   <button 
                     onClick={() => { onUpdateStatus(selectedLead.id, 'converted'); setSelectedLead({...selectedLead, status: 'converted'}); }}
                     className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedLead.status === 'converted' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                   >
                     Fechado
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><User size={18} className="text-apcef-orange"/> Dados de Contato</h4>
                   <div className="space-y-4">
                     <div>
                       <label className="text-xs font-bold text-slate-400 uppercase">Email</label>
                       <p className="font-medium text-slate-700 select-all">{selectedLead.email}</p>
                     </div>
                     <div>
                       <label className="text-xs font-bold text-slate-400 uppercase">Telefone / WhatsApp</label>
                       <p className="font-medium text-slate-700 select-all">{selectedLead.phone}</p>
                     </div>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText size={18} className="text-apcef-orange"/> Interesse</h4>
                   <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 leading-relaxed whitespace-pre-wrap border border-slate-100 h-full">
                     {selectedLead.interest}
                   </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-white flex justify-between items-center">
              <button 
                onClick={() => { onDelete(selectedLead.id); setSelectedLead(null); }}
                className="text-red-500 hover:text-red-700 font-bold text-sm flex items-center gap-2"
              >
                <Trash2 size={18} /> Excluir Lead
              </button>
              <button 
                onClick={() => openWhatsApp(selectedLead.phone)}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center gap-2"
              >
                <MessageSquare size={18} /> Conversar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};