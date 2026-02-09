import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Lead, Booking, SiteConfig, Space, SpaceType, WebhookConfig, ApiKey, ApiLog, UserProfile, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { Bell, Shield, Edit } from 'lucide-react';
import { INITIAL_SITE_CONFIG, SPACES } from '../constants';

import { AdminSidebar } from '../components/AdminSidebar';
import { AdminOverview } from '../components/AdminOverview';
import { AdminCalendar } from '../components/AdminCalendar';
import { AdminLeads } from '../components/AdminLeads';
import { AdminCMS } from '../components/AdminCMS';
import { AdminUsers } from '../components/AdminUsers';
import { AdminIntegrations } from '../components/AdminIntegrations';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'leads' | 'cms' | 'integrations' | 'users'>('overview');
  
  // User Session Data
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('user');
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  
  // Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [loading, setLoading] = useState(true);
  
  // CMS States
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<Partial<Space>>({});
  
  // Integrations State
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Sistema Financeiro', prefix: 'apcef_live_fin...', created: '2025-01-10', lastUsed: 'Há 2 horas' }
  ]);
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin-login');
        return;
      }

      if (user.email === 'marcelobfo@gmail.com') {
        setCurrentUserRole('super_admin');
      } else {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (profile) setCurrentUserRole(profile.role as UserRole);
      }

      const leadsPromise = Promise.resolve(supabase.from('leads').select('*').order('date', { ascending: false }));
      const bookingsPromise = Promise.resolve(supabase.from('bookings').select('*').order('date', { ascending: false }));
      const spacesPromise = Promise.resolve(supabase.from('spaces').select('*').order('name', { ascending: true }));
      const profilesPromise = Promise.resolve(supabase.from('profiles').select('*').order('created_at', { ascending: false }));
      const configPromise = Promise.resolve(supabase.from('site_settings').select('*').single());
      const webhooksPromise = Promise.resolve(supabase.from('webhooks').select('*').order('created_at', { ascending: false }));

      const [leadsRes, bookingsRes, spacesRes, profilesRes, configRes, webhooksRes] = await Promise.all([
        leadsPromise.catch(e => ({ data: [], error: e })),
        bookingsPromise.catch(e => ({ data: [], error: e })),
        spacesPromise.catch(e => ({ data: [], error: e })),
        profilesPromise.catch(e => ({ data: [], error: e })),
        configPromise.catch(e => ({ data: null, error: e })),
        webhooksPromise.catch(e => ({ data: [], error: e }))
      ]);

      if (leadsRes.data) setLeads(leadsRes.data as Lead[]);
      if (bookingsRes.data) setBookings(bookingsRes.data as Booking[]);
      if (spacesRes.data) setSpaces(spacesRes.data as Space[]);
      if (profilesRes.data) setUserProfiles(profilesRes.data as UserProfile[]);
      if (configRes.data) setSiteConfig(configRes.data as SiteConfig);
      
      // Map Webhooks from DB (snake_case) to Frontend (camelCase)
      if (webhooksRes.data) {
        setWebhooks((webhooksRes.data as any[]).map((w: any) => ({
          id: w.id,
          url: w.url,
          event: w.event,
          active: w.active,
          lastTriggered: w.last_triggered || 'Nunca'
        })));
      }

    } catch (error) {
      console.error("Error fetching admin data", error);
      toast.error("Erro ao carregar dados do painel.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast('Sessão encerrada', { icon: '👋' });
    navigate('/admin-login');
  };

  // --- Handlers ---

  const handleSaveConfig = async () => {
    const saveAction = async () => {
      const { error } = await supabase
        .from('site_settings')
        .update(siteConfig)
        .eq('id', siteConfig.id);
      
      if (error) throw error;
    };

    await toast.promise(saveAction(), {
       loading: 'Salvando configurações...',
       success: 'Configurações atualizadas com sucesso!',
       error: 'Erro ao salvar. Verifique suas permissões.'
    });
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    const updatedLeads = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updatedLeads);
    await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    toast.success("Status atualizado!");
  };

  const handleDeleteLead = async (id: string) => {
      if(window.confirm("Deseja realmente excluir este lead?")) {
          setLeads(prev => prev.filter(l => l.id !== id));
          await supabase.from('leads').delete().eq('id', id);
          toast.success("Lead excluído.");
      }
  };

  // Booking Handlers
  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prev => [...prev, newBooking]);
  };

  const handleEditSpace = (space: Space) => {
    setCurrentSpace(space);
    setIsSpaceModalOpen(true);
  };

  const handleNewSpace = () => {
    setCurrentSpace({
      name: '',
      description: '',
      price: 0,
      capacity: 0,
      type: SpaceType.SOCIAL,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
      features: []
    });
    setIsSpaceModalOpen(true);
  };

  const handleDeleteSpace = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este espaço?')) {
      const { error } = await supabase.from('spaces').delete().eq('id', id);
      if (!error) {
        setSpaces(prev => prev.filter(s => s.id !== id));
        toast.success("Espaço excluído com sucesso.");
      } else {
        toast.error("Erro ao excluir espaço.");
      }
    }
  };

  // Function to Seed/Restore Database Spaces
  const handleSeedSpaces = async () => {
    if (!window.confirm("ATENÇÃO: Isso irá apagar TODOS os espaços e reservas atuais para restaurar a lista padrão. Continuar?")) {
        return;
    }

    const toastId = toast.loading("Restaurando espaços padrão...");

    try {
        // 1. Delete all bookings first (Foreign Key Constraint)
        // Using delete with neq filter which acts as "delete all" in Supabase if no simpler method is enabled
        const { error: bookingsError } = await supabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (bookingsError) console.warn("Warning clearing bookings:", bookingsError);
        setBookings([]);

        // 2. Delete all spaces
        const { error: spacesError } = await supabase.from('spaces').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (spacesError) throw spacesError;

        // 3. Insert constant spaces
        // We ensure 'price' is set to 0 to avoid DB Not Null errors, even if we don't use it in UI
        const spacesToInsert = SPACES.map(({ id, ...rest }) => ({
           ...rest,
           price: 0
        }));
        
        const { data, error } = await supabase.from('spaces').insert(spacesToInsert).select();
        
        if (error) throw error;

        if (data) {
            setSpaces(data as Space[]);
            toast.success("Banco de dados atualizado com sucesso!", { id: toastId });
        }
    } catch (error: any) {
        console.error("Seed error:", error);
        toast.error("Erro ao atualizar banco: " + error.message, { id: toastId });
    }
  };

  const handleSaveSpace = async () => {
    if (!currentSpace.name) {
        toast.error("O nome do espaço é obrigatório.");
        return;
    }

    const promise = (async () => {
        // Ensure price is set to 0 if undefined to satisfy DB
        const payload = { ...currentSpace, price: currentSpace.price || 0 };

        if (currentSpace.id) {
            const { data, error } = await supabase
                .from('spaces')
                .update(payload)
                .eq('id', currentSpace.id)
                .select();
            if (error) throw error;
            if (data) setSpaces(prev => prev.map(s => s.id === currentSpace.id ? data[0] as Space : s));
        } else {
            const { data, error } = await supabase
                .from('spaces')
                .insert([payload])
                .select();
            if (error) throw error;
            if (data) setSpaces(prev => [...prev, data[0] as Space]);
        }
        setIsSpaceModalOpen(false);
    })();

    await toast.promise(promise, {
        loading: 'Salvando espaço...',
        success: 'Espaço salvo com sucesso!',
        error: 'Erro ao salvar espaço.'
    });
  };

  const handleUpdateRole = async (userId: string, newRole: UserRole) => {
    if (currentUserRole !== 'super_admin') {
      toast.error("Apenas Super Admins podem alterar permissões.");
      return;
    }

    const updatePromise = async () => {
        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId);
        if (error) throw error;
        setUserProfiles(prev => prev.map(p => p.id === userId ? { ...p, role: newRole } : p));
    };

    toast.promise(updatePromise(), {
        loading: 'Atualizando permissão...',
        success: 'Permissão atualizada!',
        error: 'Erro ao atualizar permissão.'
    });
  };

  const handleCreateUser = async (newUser: {full_name: string, email: string, role: UserRole}) => {
    try {
      const mockId = crypto.randomUUID(); 
      const { data, error } = await supabase.from('profiles').insert([{
        id: mockId,
        email: newUser.email,
        full_name: newUser.full_name,
        role: newUser.role,
        created_at: new Date().toISOString()
      }]).select();

      if (error) throw error;

      if (data) {
        setUserProfiles(prev => [data[0] as UserProfile, ...prev]);
        toast.success("Perfil criado!", { duration: 5000 });
      }

    } catch (error: any) {
      console.error("Erro ao criar usuário", error);
      toast.error("Erro ao criar usuário: " + error.message);
    }
  };

  // Integration Functions
  const generateApiKey = () => {
    const newKey: ApiKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Nova Chave',
      prefix: `apcef_live_${Math.random().toString(36).substr(2, 6)}...`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Nunca'
    };
    setApiKeys([...apiKeys, newKey]);
    toast.success("Chave de API gerada com sucesso!");
  };

  const addWebhook = async (url: string) => {
    try {
      const newWebhookPayload = {
        url: url,
        event: 'booking.created',
        active: true,
        last_triggered: 'Nunca'
      };

      const { data, error } = await supabase.from('webhooks').insert([newWebhookPayload]).select();

      if (error) throw error;

      if (data) {
        const mappedWebhook: WebhookConfig = {
          id: data[0].id,
          url: data[0].url,
          event: data[0].event,
          active: data[0].active,
          lastTriggered: data[0].last_triggered
        };
        setWebhooks([...webhooks, mappedWebhook]);
        toast.success("Webhook salvo com sucesso!");
      }
    } catch (error) {
      console.error('Error adding webhook:', error);
      toast.error('Erro ao salvar Webhook.');
    }
  };

  const triggerTestWebhook = async (id: string, payload?: any) => {
    const hook = webhooks.find(w => w.id === id);
    if (!hook) return;

    const toastId = toast.loading('Disparando Webhook...');
    const startTime = Date.now();

    const body = payload || {
        event: 'test_ping',
        timestamp: new Date().toISOString(),
        message: 'This is a test event from APCEF Admin Panel'
    };

    try {
        const response = await fetch(hook.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const latency = Date.now() - startTime;
        const nowString = 'Agora mesmo (' + new Date().toLocaleTimeString() + ')';
        
        // Update DB
        await supabase.from('webhooks').update({ last_triggered: nowString }).eq('id', id);

        const newLog: ApiLog = {
          id: Math.random().toString(),
          endpoint: hook.url,
          method: 'POST',
          status: response.status as any || 200, 
          timestamp: new Date().toLocaleTimeString(),
          latency: `${latency}ms`
        };
        
        setApiLogs(prev => [newLog, ...prev]);
        setWebhooks(prev => prev.map(w => w.id === id ? {...w, lastTriggered: nowString} : w));
        
        toast.success('Webhook disparado com sucesso!', { id: toastId });

    } catch (error) {
        console.error("Webhook trigger failed", error);
        
        const latency = Date.now() - startTime;
        const newLog: ApiLog = {
            id: Math.random().toString(),
            endpoint: hook.url,
            method: 'POST',
            status: 500,
            timestamp: new Date().toLocaleTimeString(),
            latency: `${latency}ms`
        };
        setApiLogs(prev => [newLog, ...prev]);
        toast.error('Erro no envio (Provável bloqueio CORS do servidor destino)', { id: toastId });
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      <main className="flex-1 overflow-auto relative bg-slate-50">
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8 sticky top-0 z-20 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
            {activeTab === 'overview' && 'Visão Geral'}
            {activeTab === 'calendar' && 'Calendário de Reservas'}
            {activeTab === 'leads' && 'Gestão de Leads (CRM)'}
            {activeTab === 'users' && 'Gestão de Usuários'}
            {activeTab === 'cms' && 'Configurações do Site (SEO)'}
            {activeTab === 'integrations' && 'Integrações & API'}
          </h1>
          <div className="flex items-center gap-6">
            <button className="p-2 text-slate-400 hover:text-apcef-blue relative transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block leading-tight">
                <p className="text-sm font-bold text-slate-700">Olá, Gestor</p>
                <p className="text-xs text-slate-500 flex items-center justify-end gap-1">
                  {currentUserRole === 'super_admin' ? <Shield size={10} className="text-apcef-orange"/> : <Edit size={10}/>}
                  {currentUserRole === 'super_admin' ? 'Super Admin' : 'Editor'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-apcef-orange to-orange-400 text-white flex items-center justify-center font-bold shadow-md cursor-pointer ring-2 ring-white">
                {currentUserRole === 'super_admin' ? 'S' : 'E'}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto">
          {activeTab === 'overview' && <AdminOverview bookings={bookings} leads={leads} />}
          
          {activeTab === 'calendar' && <AdminCalendar bookings={bookings} spaces={spaces} onAddBooking={handleAddBooking} />}
          
          {activeTab === 'leads' && <AdminLeads leads={leads} onUpdateStatus={handleStatusChange} onDelete={handleDeleteLead} />}
          
          {activeTab === 'users' && <AdminUsers users={userProfiles} currentUserRole={currentUserRole} onUpdateRole={handleUpdateRole} onCreateUser={handleCreateUser} />}
          
          {activeTab === 'cms' && <AdminCMS 
             siteConfig={siteConfig} setSiteConfig={setSiteConfig} handleSaveConfig={handleSaveConfig}
             spaces={spaces} handleEditSpace={handleEditSpace} handleDeleteSpace={handleDeleteSpace} handleNewSpace={handleNewSpace}
             isSpaceModalOpen={isSpaceModalOpen} setIsSpaceModalOpen={setIsSpaceModalOpen}
             currentSpace={currentSpace} setCurrentSpace={setCurrentSpace} handleSaveSpace={handleSaveSpace}
             handleSeedSpaces={handleSeedSpaces}
          />}
          
          {activeTab === 'integrations' && <AdminIntegrations 
             apiKeys={apiKeys} webhooks={webhooks} apiLogs={apiLogs}
             generateApiKey={generateApiKey} addWebhook={addWebhook} triggerTestWebhook={triggerTestWebhook}
          />}
        </div>
      </main>
    </div>
  );
};
