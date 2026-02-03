import React, { useState } from 'react';
import { UserPlus, Shield, Mail, User, CheckCircle, XCircle } from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { toast } from 'react-hot-toast';

interface AdminUsersProps {
  users: UserProfile[];
  currentUserRole: UserRole;
  onUpdateRole: (id: string, role: UserRole) => void;
  onCreateUser: (user: {full_name: string, email: string, role: UserRole}) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ users, currentUserRole, onUpdateRole, onCreateUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ full_name: '', email: '', role: 'user' as UserRole });

  const handleSubmit = () => {
    onCreateUser(newUser);
    setIsModalOpen(false);
    setNewUser({ full_name: '', email: '', role: 'user' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Gerenciamento de Usuários</h2>
          <p className="text-sm text-slate-500">Controle quem tem acesso ao sistema e suas permissões.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-apcef-blue text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all"
        >
          <UserPlus size={18} /> Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="p-6">Usuário</th>
              <th className="p-6">Email</th>
              <th className="p-6">Função</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 font-bold text-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                    {user.full_name?.charAt(0) || 'U'}
                  </div>
                  {user.full_name}
                </td>
                <td className="p-6 text-slate-600 text-sm">{user.email}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    user.role === 'super_admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    user.role === 'editor' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {user.role === 'super_admin' ? 'Super Admin' : user.role === 'editor' ? 'Editor' : 'Cliente'}
                  </span>
                </td>
                <td className="p-6">
                  <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                    <CheckCircle size={14} /> Ativo
                  </span>
                </td>
                <td className="p-6 text-right">
                  <select 
                    value={user.role}
                    disabled={currentUserRole !== 'super_admin'}
                    onChange={(e) => onUpdateRole(user.id, e.target.value as UserRole)}
                    className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-apcef-blue disabled:opacity-50 disabled:cursor-not-allowed input-premium"
                  >
                    <option value="user">Cliente</option>
                    <option value="editor">Editor</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <UserPlus size={20} className="text-apcef-blue"/> Novo Usuário
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors bg-slate-100 p-2 rounded-full">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nome Completo</label>
                <input 
                  type="text" 
                  value={newUser.full_name}
                  onChange={e => setNewUser({...newUser, full_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Corporativo</label>
                <input 
                  type="email" 
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Função</label>
                <select 
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-apcef-blue input-premium"
                >
                  <option value="user">Cliente</option>
                  <option value="editor">Editor</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-slate-600 font-bold hover:bg-slate-200 transition-colors">Cancelar</button>
              <button onClick={handleSubmit} className="px-6 py-3 bg-apcef-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg">Criar Usuário</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};