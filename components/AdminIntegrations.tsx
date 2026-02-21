import React, { useState } from 'react';
import { Plus, Key, Webhook, Activity, Copy } from 'lucide-react';
import { ApiKey, WebhookConfig, ApiLog } from '../types';
import { toast } from 'react-hot-toast';

interface AdminIntegrationsProps {
  apiKeys: ApiKey[];
  webhooks: WebhookConfig[];
  apiLogs: ApiLog[];
  generateApiKey: () => void;
  addWebhook: (url: string) => void;
  triggerTestWebhook: (id: string, payload?: any) => void;
}

export const AdminIntegrations: React.FC<AdminIntegrationsProps> = ({ 
  apiKeys, webhooks, apiLogs, generateApiKey, addWebhook, triggerTestWebhook 
}) => {
  const [newWebhookUrl, setNewWebhookUrl] = useState('');

  const handleAddWebhook = () => {
    if (!newWebhookUrl) return;
    addWebhook(newWebhookUrl);
    setNewWebhookUrl('');
  };

  const handleTriggerTest = async (id: string) => {
    const hook = webhooks.find(w => w.id === id);
    if (!hook) return;

    // Simulate a complete Lead Payload
    const testPayload = {
      event: 'test_lead_simulation',
      timestamp: new Date().toISOString(),
      data: {
        id: `test_${Math.random().toString(36).substr(2, 9)}`,
        name: "Fabrício Teste (Simulação)",
        email: "teste.integracao@apcef.com.br",
        phone: "(27) 99999-8888",
        interest: "SIMULAÇÃO: Gostaria de orçar o Salão Nobre para um evento corporativo de 150 pessoas.",
        date: new Date().toISOString().split('T')[0],
        status: "new",
        source: "admin_panel_test_button",
        meta: {
          space_id: "space_123",
          space_name: "Salão Nobre",
          origin_url: "https://apcef-eventos.com/admin"
        }
      }
    };

    triggerTestWebhook(id, testPayload);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in pb-12">
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><Key size={20} className="text-apcef-orange"/> Chaves de API</h3>
              <p className="text-sm text-slate-500">Gerencie o acesso externo aos dados.</p>
            </div>
            <button onClick={generateApiKey} className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors">
              Nova Chave
            </button>
          </div>
          <div className="space-y-3">
            {apiKeys.map(key => (
              <div key={key.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center group">
                <div>
                  <p className="font-bold text-slate-700 text-sm">{key.name}</p>
                  <code className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 mt-1 block w-fit">{key.prefix}</code>
                </div>
                <button 
                  onClick={() => toast.success('Copiado!')} 
                  className="p-2 text-slate-400 hover:text-apcef-blue hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><Webhook size={20} className="text-apcef-blue"/> Webhooks</h3>
              <p className="text-sm text-slate-500">Notificações em tempo real.</p>
            </div>
          </div>
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="https://seu-endpoint.com/webhook" 
              value={newWebhookUrl}
              onChange={(e) => setNewWebhookUrl(e.target.value)}
              className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-apcef-blue input-premium"
            />
            <button onClick={handleAddWebhook} className="bg-apcef-blue text-white p-2 rounded-lg hover:bg-blue-800 transition-colors">
              <Plus size={20} />
            </button>
          </div>
          <div className="space-y-3">
            {webhooks.map(hook => (
              <div key={hook.id} className="border border-slate-100 rounded-xl p-4 hover:border-blue-200 transition-colors bg-white">
                 <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">{hook.event}</span>
                   <div className="flex items-center gap-2">
                     <span className={`w-2 h-2 rounded-full ${hook.active ? 'bg-green-500' : 'bg-red-300'}`}></span>
                     <span className="text-xs font-bold text-slate-600">{hook.active ? 'Ativo' : 'Inativo'}</span>
                   </div>
                 </div>
                 <p className="text-sm font-medium text-slate-800 truncate mb-3">{hook.url}</p>
                 <div className="flex justify-between items-center text-xs text-slate-500">
                   <span>Último disparo: {hook.lastTriggered}</span>
                   <button onClick={() => handleTriggerTest(hook.id)} className="text-apcef-blue hover:underline font-bold">Testar Envio (Simular Lead)</button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl shadow-xl flex flex-col h-full">
         <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-6"><Activity size={20} className="text-green-400"/> Logs de API</h3>
         <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs custom-scrollbar">
            {apiLogs.map(log => (
              <div key={log.id} className="flex gap-3 p-3 hover:bg-white/5 rounded-lg border-b border-white/5 last:border-0">
                <span className="text-slate-500 w-16">{log.timestamp}</span>
                <span className={`font-bold ${log.method === 'POST' ? 'text-blue-400' : 'text-green-400'} w-10`}>{log.method}</span>
                <span className={`font-bold ${log.status >= 400 ? 'text-red-400' : 'text-slate-200'} w-8`}>{log.status}</span>
                <span className="text-slate-400 flex-1 truncate">{log.endpoint}</span>
                <span className="text-slate-600">{log.latency}</span>
              </div>
            ))}
            {apiLogs.length === 0 && (
                <div className="text-slate-600 text-center py-10 italic">Nenhum log registrado ainda.</div>
            )}
         </div>
      </div>
    </div>
  );
};