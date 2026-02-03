import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Booking, Space } from '../types';

interface AdminCalendarProps {
  bookings: Booking[];
  spaces: Space[];
}

export const AdminCalendar: React.FC<AdminCalendarProps> = ({ bookings, spaces }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterSpaceId, setFilterSpaceId] = useState<string | 'all'>('all');

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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-fade-in">
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
            className="bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer"
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
        {blanks.map((b) => <div key={`blank-${b}`} className="min-h-[120px] bg-slate-50/50 rounded-xl"></div>)}
        {days.map((day) => {
          const dayBookings = getBookingsForDay(day);
          const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
          
          return (
            <div key={day} className={`min-h-[120px] p-3 rounded-xl border transition-all hover:shadow-md ${isToday ? 'bg-blue-50/50 border-blue-200 ring-2 ring-blue-100' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-sm font-bold ${isToday ? 'text-apcef-blue' : 'text-slate-700'}`}>{day}</span>
                {dayBookings.length > 0 && <span className="text-[10px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded-md">{dayBookings.length}</span>}
              </div>
              <div className="space-y-1">
                {dayBookings.slice(0, 3).map((booking, idx) => (
                  <div key={idx} className={`text-[10px] truncate p-1.5 rounded-md font-medium border-l-2 ${booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-500' : booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-500' : 'bg-red-50 text-red-700 border-red-500'}`}>
                    {booking.clientName}
                  </div>
                ))}
                {dayBookings.length > 3 && (
                  <div className="text-[10px] text-center text-slate-400 font-medium pt-1">+ {dayBookings.length - 3} mais</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};