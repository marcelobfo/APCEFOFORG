import React from 'react';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Users, 
  UserCheck, 
  Settings, 
  Puzzle, 
  LogOut 
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  handleLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 transition-all z-30 shadow-xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900">
         <h2 className="font-bold text-xl tracking-tight flex items-center gap-2">
           <div className="w-8 h-8 bg-apcef-blue rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">A</div>
           <span>APCEF <span className="text-apcef-orange">ADM</span></span>
         </h2>
         <p className="text-xs text-slate-400 mt-2 ml-10">Painel de Gestão</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'overview' ? 'bg-apcef-blue text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <LayoutDashboard size={20} /> Visão Geral
        </button>
        <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'calendar' ? 'bg-apcef-blue text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <CalendarIcon size={20} /> Calendário Mestre
        </button>
        <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'leads' ? 'bg-apcef-blue text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <Users size={20} /> Leads & Kanban
        </button>
        <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'users' ? 'bg-apcef-blue text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <UserCheck size={20} /> Usuários & Permissões
        </button>
        <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'cms' ? 'bg-apcef-blue text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <Settings size={20} /> Configurações & SEO
        </button>
        <button onClick={() => setActiveTab('integrations')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'integrations' ? 'bg-apcef-blue text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <Puzzle size={20} /> Integrações
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors text-sm font-medium">
          <LogOut size={18} /> Sair do Sistema
        </button>
      </div>
    </aside>
  );
};