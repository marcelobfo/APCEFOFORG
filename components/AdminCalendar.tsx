import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, X, Clock, MapPin, User, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { Booking, Space } from '../types';

interface AdminCalendarProps {
  bookings: Booking[];
  spaces: Space[];
}

export const AdminCalendar: React.FC<AdminCalendarProps> = ({ bookings, spaces }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterSpaceId, setFilterSpaceId] = useState<string | 'all'>('all');
  
  // State for Day Details Modal
  const [selectedDay, setSelectedDay] = useState<{ day: number, bookings: Booking[] } | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    return { days, blanks, monthName: date.toLocaleString('pt-BR', { month: 'long' }), year };
  };

  const { days, blanks, monthName, year } = getDaysInMonth(currentDate);

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const getBookingsForDay = (day: number) => {
    const dateStr = new Date(year, currentDate.getMonth(), day).toISOString().split('T')[0];
    let dayBookings = bookings.filter(b => b.date === dateStr);
    if (filterSpaceId !== 'all') {
      dayBookings = dayBookings.filter(b => b.spaceId === filterSpaceId);
    }
    return dayBookings;
  };

  const getSpaceName = (id: string) => {
    return spaces.find(s => s.id === id)?.name || 'Espaço Desconhecido';
  };

  const handleDayClick = (day: number) => {
    const dayBookings = getBookingsForDay(day);
    setSelectedDay({ day, bookings: dayBookings });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-fade-in relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl font-bold text-slate-800 capitalize tracking-tight">
            {monthName} <span className="text-slate-400 font-light">{year}</span>
          </h2>
          <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-inner">
            <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg shadow-sm text-slate-600 transition-all hover:text-apcef-blue"><ChevronLeft size={20} /></button>
            <div className="w-px h-6 bg-slate-300 mx-2"></div>
            <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg shadow-sm text-slate-600 transition-all hover:text-apcef-blue"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <Filter size={18} className="text-slate-400" />
          <select 
            value={filterSpaceId}
            onChange={(e) => setFilterSpaceId(e.target.value)}
            className="bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer outline-none"
          >
            <option value="all">Todos os Espaços</option>
            {spaces.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-4">
        {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map(day => (
          <div key={day} className="text-center font-bold text-slate-400 text-xs uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4 auto-rows-fr">
        {blanks.map((b) => <div key={`blank-${b}`} className="min-h-[120px] bg-slate-50/50 rounded-xl border border-transparent"></div>)}
        {days.map((day) => {
          const dayBookings = getBookingsForDay(day);
          const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
          const hasConfirmed = dayBookings.some(b => b.status === 'confirmed');
          
          return (
            <div 
              key={day} 
              onClick={() => handleDayClick(day)}
              className={`min-h-[120px] p-3 rounded-xl border transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02] 
                ${isToday ? 'bg-blue-50/50 border-blue-200 ring-2 ring-blue-100' : 'bg-white border-slate-100 hover:border-apcef-blue/30'}
                ${hasConfirmed && !isToday ? 'border-l-4 border-l-green-500' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-apcef-blue text-white' : 'text-slate-700'}`}>{day}</span>
                {dayBookings.length > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${hasConfirmed ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {dayBookings.length} eventos
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                {dayBookings.slice(0, 3).map((booking, idx) => (
                  <div key={idx} className={`text-[10px] truncate p-1.5 rounded-md font-medium border-l-2 flex items-center justify-between ${booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-500' : booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-500' : 'bg-red-50 text-red-700 border-red-500'}`}>
                    <span className="truncate flex-1">{booking.clientName}</span>
                  </div>
                ))}
                {dayBookings.length > 3 && (
                  <div className="text-[10px] text-center text-slate-400 font-medium pt-1">+ {dayBookings.length - 3} mais</div>
                )}
                {dayBookings.length === 0 && (
                  <div className="h-full flex items-center justify-center pt-4 opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-xs text-slate-300 font-medium">+ Adicionar</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day Details Modal */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-white p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 capitalize">
                  {selectedDay.day} de {monthName}
                </h3>
                <p className="text-sm text-slate-500">{year}</p>
              </div>
              <button 
                onClick={() => setSelectedDay(null)} 
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto bg-slate-50 flex-1">
              {selectedDay.bookings.length > 0 ? (
                <div className="space-y-4">
                  {selectedDay.bookings.map(booking => (
                    <div key={booking.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${booking.status === 'confirmed' ? 'bg-green-500' : booking.status === 'pending' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                      
                      <div className="flex justify-between items-start mb-3 pl-2">
                        <div>
                          <h4 className="font-bold text-lg text-slate-800">{booking.clientName}</h4>
                          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full mt-1 ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {booking.status === 'confirmed' ? <CheckCircle size={10}/> : <AlertCircle size={10}/>}
                            {booking.status === 'confirmed' ? 'Aprovado / Confirmado' : booking.status === 'pending' ? 'Pendente' : 'Cancelado'}
                          </span>
                        </div>
                        <div className="text-right">
                           <span className="block text-xs text-slate-400 uppercase font-bold">Valor</span>
                           <span className="text-lg font-bold text-slate-700">R$ {booking.totalValue.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pl-2 text-sm text-slate-600">
                         <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-apcef-blue"/>
                            <span className="truncate font-medium">{getSpaceName(booking.spaceId)}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <Clock size={16} className="text-apcef-orange"/>
                            <span>Dia Todo</span>
                         </div>
                         <div className="col-span-2 flex items-center gap-2 pt-2 border-t border-slate-100 mt-1">
                            <User size={16} className="text-slate-400"/>
                            <span className="text-xs text-slate-500">ID da Reserva: {booking.id}</span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 flex flex-col items-center justify-center opacity-60">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Clock size={32} />
                  </div>
                  <h3 className="font-bold text-slate-600 text-lg">Sem eventos agendados</h3>
                  <p className="text-sm text-slate-400">Nenhuma reserva confirmada ou pendente para este dia.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
               <button 
                 onClick={() => setSelectedDay(null)}
                 className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
               >
                 Fechar
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};