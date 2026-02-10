import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, User as UserIcon, Loader, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Check both old and new paths for admin detection
  const isAdminPath = location.pathname.includes('admin') || location.pathname.includes('area-administrativa');
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (isRecovering) {
        // --- PASSWORD RECOVERY LOGIC ---
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/#/update-password',
        });
        
        if (error) throw error;
        
        toast.success("Email de recuperação enviado!");
        setSuccessMessage('Email de recuperação enviado! Verifique sua caixa de entrada.');
        setLoading(false);
        return;
      }

      if (isRegistering) {
        // --- REGISTER LOGIC ---
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name } // Trigger will copy this to profiles table
          }
        });
        
        if (error) throw error;
        
        toast.success("Cadastro realizado com sucesso!");
        setSuccessMessage('Cadastro realizado! Verifique seu e-mail para confirmar a conta antes de entrar.');
        setIsRegistering(false);
      } else {
        // --- LOGIN LOGIC ---
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        
        if (authError) {
           if (authError.message.includes("Email not confirmed")) {
             throw new Error("Por favor, confirme seu e-mail antes de fazer login.");
           }
           if (authError.message.includes("Invalid login credentials")) {
             throw new Error("E-mail ou senha incorretos.");
           }
           throw authError;
        }

        if (authData.user) {
          toast.success("Bem-vindo de volta!");
          
          // --- HARDCODED SUPER ADMIN CHECK ---
          if (authData.user.email === 'marcelobfo@gmail.com') {
            navigate('/painel-admin');
            return;
          }

          // --- FETCH USER ROLE FROM DB ---
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authData.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            if (isAdminPath) {
               setError('Erro ao verificar permissões. Contate o suporte.');
            } else {
               navigate('/painel-cliente');
            }
            return;
          }

          const userRole = profileData?.role as UserRole;

          // Redirect Logic based on Role
          if (userRole === 'super_admin' || userRole === 'editor') {
            navigate('/painel-admin');
          } else {
            if (isAdminPath) {
              setError('Você não tem permissão para acessar a área administrativa.');
              await supabase.auth.signOut();
            } else {
              navigate('/painel-cliente');
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
      toast.error(err.message || "Erro na autenticação");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (mode: 'login' | 'register' | 'recover') => {
    setError('');
    setSuccessMessage('');
    if (mode === 'recover') {
      setIsRecovering(true);
      setIsRegistering(false);
    } else if (mode === 'register') {
      setIsRegistering(true);
      setIsRecovering(false);
    } else {
      setIsRegistering(false);
      setIsRecovering(false);
    }
  };

  // Dynamic Text Helpers
  const getTitle = () => {
    if (isRecovering) return 'Recuperar Senha';
    if (isAdminPath) return 'Portal Administrativo';
    if (isRegistering) return 'Crie sua conta';
    return 'Bem-vindo de volta';
  };

  const getSubtitle = () => {
    if (isRecovering) return 'Digite seu e-mail para redefinir';
    if (isAdminPath) return 'Acesso restrito a gestores';
    if (isRegistering) return 'Preencha os dados para começar';
    return 'Acesse suas reservas e contratos';
  };

  const getButtonText = () => {
    if (isRecovering) return 'Enviar Link';
    if (isAdminPath) return 'Acessar Painel';
    if (isRegistering) return 'Cadastrar';
    return 'Entrar na Conta';
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/16/1920/1080" 
          alt="Resort Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-apcef-blue/90 to-apcef-teal/80 mix-blend-multiply"></div>
      </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md p-4 animate-fade-in-up">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-apcef-blue text-white shadow-lg mb-6">
                 {isRecovering ? <Lock size={32} /> : <span className="font-bold text-2xl">A</span>}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {getTitle()}
              </h1>
              <p className="text-slate-500 mt-2 text-sm">
                {getSubtitle()}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-center font-medium shadow-sm animate-fade-in">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl text-center font-medium shadow-sm animate-fade-in flex flex-col items-center gap-2">
                <CheckCircle size={20} />
                {successMessage}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-5">
              {isRegistering && !isAdminPath && !isRecovering && (
                <div className="space-y-1 animate-fade-in">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider ml-1">Nome Completo</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-apcef-blue transition-colors" size={20} />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-apcef-blue/20 focus:border-apcef-blue outline-none transition-all placeholder:text-slate-400 font-medium"
                      placeholder="Seu nome"
                      required={isRegistering}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-apcef-blue transition-colors" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-apcef-blue/20 focus:border-apcef-blue outline-none transition-all placeholder:text-slate-400 font-medium"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {!isRecovering && (
                <div className="space-y-1 animate-fade-in">
                  <div className="flex justify-between items-center ml-1">
                     <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Senha</label>
                     {!isAdminPath && !isRegistering && (
                       <button 
                         type="button"
                         onClick={() => toggleMode('recover')}
                         className="text-xs text-apcef-blue hover:underline font-medium"
                       >
                         Esqueceu a senha?
                       </button>
                     )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-apcef-blue transition-colors" size={20} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-apcef-blue/20 focus:border-apcef-blue outline-none transition-all placeholder:text-slate-400 font-medium"
                      placeholder="••••••••"
                      required={!isRecovering}
                    />
                  </div>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={loading || (successMessage !== '' && isRecovering)}
                className="w-full py-3.5 bg-apcef-blue hover:bg-apcef-blueLight text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>{getButtonText()}</span>
                    {!isRecovering && <ArrowRight size={18} />}
                  </>
                )}
              </button>
            </form>

            {isRecovering && (
              <button 
                onClick={() => toggleMode('login')}
                className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-apcef-blue font-medium transition-colors"
              >
                <ArrowLeft size={16} /> Voltar para o Login
              </button>
            )}
          </div>
          
          {!isAdminPath && !isRecovering && (
            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
               <p className="text-sm text-slate-600">
                 {isRegistering ? 'Já possui uma conta?' : 'Primeira vez aqui?'} {' '}
                 <button 
                   onClick={() => toggleMode(isRegistering ? 'login' : 'register')}
                   className="text-apcef-orange font-bold cursor-pointer hover:underline focus:outline-none"
                 >
                   {isRegistering ? 'Fazer Login' : 'Criar conta'}
                 </button>
               </p>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            ← Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
};