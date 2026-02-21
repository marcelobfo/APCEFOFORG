import React from 'react';
import { Calendar as CalendarIcon, Users, TrendingUp } from 'lucide-react';
import { Booking, Lead } from '../types';

interface AdminOverviewProps {
  bookings: Booking[];
  leads: Lead[];
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ bookings, leads }) => {
  const stats = [
    { label: 'Reservas do Mês', value: String(bookings.length), icon: CalendarIcon, color: 'text-blue-600', bg: 'bg-blue-50 border border-blue-100' },
    { label: 'Novos Leads', value: String(leads.filter(l => l.status === 'new').length), icon: Users, color: 'text-orange-600', bg: 'bg-orange-50 border border-orange-100' },
    { label: 'Taxa Ocupação', value: '68%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50 border border-purple-100' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-6">Últimas Atividades</h3>
           <div className="space-y-4">
             {bookings.slice(0, 5).map(booking => (
               <div key={booking.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                 <div className={`w-2 h-12 rounded-full ${booking.status === 'confirmed' ? 'bg-green-500' : booking.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                 <div className="flex-1">
                   <p className="font-bold text-slate-800">{booking.clientName}</p>
                   <p className="text-sm text-slate-500">{new Date(booking.date).toLocaleDateString()} • {booking.spaceId}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-6">Novos Interessados</h3>
           <div className="space-y-4">
              {leads.slice(0, 5).map(lead => (
                 <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.interest.substring(0, 30)}...</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {lead.status === 'new' ? 'Novo' : 'Em andamento'}
                    </span>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};