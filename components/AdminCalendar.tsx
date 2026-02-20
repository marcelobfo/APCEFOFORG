import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, X, Clock, MapPin, User, CheckCircle, AlertCircle, Plus, Calendar, Save, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Booking, Space } from '../types';

interface AdminCalendarProps {
  bookings: Booking[];
  spaces: Space[];
  onAddBooking?: (booking: Booking) => void;
}

export const AdminCalendar: React.FC<AdminCalendarProps> = ({ bookings, spaces, onAddBooking }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterSpaceId, setFilterSpaceId] = useState<string | 'all'>('all');
  
  // State for Day Details Modal
  const [selectedDay, setSelectedDay] = useState<{ day: number, bookings: Booking[] } | null>(null);

  // State for Add Booking Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBookingData, setNewBookingData] = useState({
    clientName: '',
    spaceId: '',
    date: '',
    email: '',
    phone: '',
    status: 'confirmed' as 'confirmed' | 'pending' | 'cancelled'
  });

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

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/55${phone.replace(/\D/g, '')}`, '_blank');
  };

  const handleDayClick = (day: number) => {
    const dayBookings = getBookingsForDay(day);
    setSelectedDay({ day, bookings: dayBookings });
  };

  const openAddModal = (date?: string) => {
    const initialDate = date || new Date().toISOString().split('T')[0];
    setNewBookingData({
        clientName: '',
        spaceId: spaces[0]?.id || '',
        date: initialDate,
        email: '',
        phone: '',
        status: 'confirmed'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveBooking = async () => {
    if (!newBookingData.clientName || !newBookingData.spaceId || !newBookingData.date) {
        toast.error("Preencha todos os campos obrigatórios.");
        return;
    }

    const toastId = toast.loading("Salvando reserva...");

    try {
        const payload = {
            clientName: newBookingData.clientName,
            spaceId: newBookingData.spaceId,
            date: newBookingData.date,
            status: newBookingData.status,
            email: newBookingData.email,
            phone: newBookingData.phone
        };

        const { data, error } = await supabase.from('bookings').insert([payload]).select().single();

        if (error) throw error;

        if (data && onAddBooking) {
            onAddBooking(data as Booking);
            
            // If the added booking matches the currently selected day view, update that view too
            if (selectedDay) {
                const bookingDate = new Date(data.date);
                if (bookingDate.getDate() === selectedDay.day && bookingDate.getMonth() === currentDate.getMonth()) {
                     setSelectedDay(prev => prev ? ({...prev, bookings: [...prev.bookings, data as Booking]}) : null);
                }
            }
        }

        toast.success("Reserva adicionada com sucesso!", { id: toastId });
        setIsAddModalOpen(false);
    } catch (error: any) {
        console.error("Error creating booking", error);
        toast.error("Erro ao salvar: " + error.message, { id: toastId });
    }
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

        <div className="flex items-center gap-2">
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
            <button 
                onClick={() => openAddModal()}
                className="flex items-center gap-2 px-4 py-2 bg-apcef-blue text-white rounded-xl text-sm font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/10"
            >
                <Plus size={18} /> Nova Reserva
            </button>
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
              className={`min-h-[120px] p-3 rounded-xl border transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02] group
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
                   <div className="h-full flex items-center justify-center pt-4">
                      <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            const dateStr = new Date(year, currentDate.getMonth(), day).toISOString().split('T')[0];
                            openAddModal(dateStr);
                        }}
                        className="text-xs text-slate-300 font-medium hover:text-apcef-orange hover:bg-orange-50 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                      >
                          + Adicionar
                      </button>
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
                         
                         {/* Contact Info Section */}
                         {(booking.email || booking.phone) && (
                            <div className="col-span-2 pt-3 mt-1 border-t border-slate-100 flex items-center justify-between">
                                <div className="space-y-1">
                                    {booking.email && <div className="flex items-center gap-2 text-xs text-slate-500"><Mail size={12}/> {booking.email}</div>}
                                    {booking.phone && <div className="flex items-center gap-2 text-xs text-slate-500"><Phone size={12}/> {booking.phone}</div>}
                                </div>
                                {booking.phone && (
                                    <button 
                                        onClick={() => openWhatsApp(booking.phone!)}
                                        className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200 transition-colors flex items-center gap-1"
                                    >
                                        <MessageSquare size={14}/> WhatsApp
                                    </button>
                                )}
                            </div>
                         )}

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
            
            <div className="p-4 bg-white border-t border-slate-100 flex justify-end gap-3">
                <button 
                 onClick={() => {
                    const dateStr = new Date(year, currentDate.getMonth(), selectedDay.day).toISOString().split('T')[0];
                    openAddModal(dateStr);
                 }}
                 className="px-6 py-2 bg-apcef-blue text-white hover:bg-blue-800 font-bold rounded-lg transition-colors flex items-center gap-2"
               >
                 <Plus size={16} /> Adicionar Reserva
               </button>
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

      {/* Manual Booking Add Modal */}
      {isAddModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto">
                <div className="bg-white p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
                   <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Plus size={20} className="text-apcef-blue"/> Nova Reserva
                   </h3>
                   <button 
                    onClick={() => setIsAddModalOpen(false)} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700"
                   >
                     <X size={20} />
                   </button>
                </div>

                <div className="p-8 space-y-5">
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Cliente / Evento</label>
                      <input 
                         type="text" 
                         value={newBookingData.clientName}
                         onChange={(e) => setNewBookingData({...newBookingData, clientName: e.target.value})}
                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                         placeholder="Ex: Aniversário João"
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Telefone</label>
                          <input 
                             type="text" 
                             value={newBookingData.phone}
                             onChange={(e) => setNewBookingData({...newBookingData, phone: e.target.value})}
                             className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                             placeholder="(27) 99999-9999"
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                          <input 
                             type="email" 
                             value={newBookingData.email}
                             onChange={(e) => setNewBookingData({...newBookingData, email: e.target.value})}
                             className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                             placeholder="cliente@email.com"
                          />
                       </div>
                   </div>

                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Espaço</label>
                     <select 
                       value={newBookingData.spaceId}
                       onChange={(e) => setNewBookingData({...newBookingData, spaceId: e.target.value})}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                     >
                        <option value="" disabled>Selecione um espaço...</option>
                        {spaces.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                     </select>
                   </div>

                   <div className="grid grid-cols-1 gap-4">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Data</label>
                          <input 
                             type="date"
                             value={newBookingData.date}
                             onChange={(e) => setNewBookingData({...newBookingData, date: e.target.value})}
                             className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                          />
                       </div>
                   </div>

                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Status Inicial</label>
                     <div className="flex gap-2">
                        <button 
                          onClick={() => setNewBookingData({...newBookingData, status: 'confirmed'})}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${newBookingData.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white text-slate-500 border-slate-200'}`}
                        >
                           Confirmado
                        </button>
                        <button 
                          onClick={() => setNewBookingData({...newBookingData, status: 'pending'})}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${newBookingData.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-white text-slate-500 border-slate-200'}`}
                        >
                           Pendente
                        </button>
                     </div>
                   </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                   <button 
                     onClick={() => setIsAddModalOpen(false)}
                     className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors"
                   >
                     Cancelar
                   </button>
                   <button 
                     onClick={handleSaveBooking}
                     className="px-8 py-3 bg-apcef-blue text-white font-bold rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-900/10 transition-transform active:scale-95 flex items-center gap-2"
                   >
                     <Save size={18} /> Salvar Reserva
                   </button>
                </div>
             </div>
          </div>
      )}
    </div>
  );
};