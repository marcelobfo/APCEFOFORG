import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Spaces } from './pages/Spaces';
import { SpaceDetails } from './pages/SpaceDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { Sitemap } from './pages/Sitemap';

// Wrapper for pages that need the standard layout
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout>{children}</Layout>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#059669', // Green
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#059669',
            },
          },
          error: {
            style: {
              background: '#DC2626', // Red
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        
        {/* SEO Friendly Routes in Portuguese */}
        <Route path="/espacos" element={<PublicRoute><Spaces /></PublicRoute>} />
        <Route path="/espacos/:id" element={<PublicRoute><SpaceDetails /></PublicRoute>} />
        <Route path="/sobre" element={<PublicRoute><About /></PublicRoute>} />
        <Route path="/contato" element={<PublicRoute><Contact /></PublicRoute>} />
        <Route path="/mapa-do-site" element={<PublicRoute><Sitemap /></PublicRoute>} />
        
        {/* Auth Routes */}
        <Route path="/login-cliente" element={<Login />} />
        <Route path="/login-admin" element={<Login />} />
        
        {/* Protected Mock Routes */}
        <Route path="/painel-cliente" element={<ClientDashboard />} />
        <Route path="/painel-admin" element={<AdminDashboard />} />

        {/* Redirect old routes or 404s */}
        <Route path="/spaces" element={<Navigate to="/espacos" replace />} />
        <Route path="/about" element={<Navigate to="/sobre" replace />} />
        <Route path="/contact" element={<Navigate to="/contato" replace />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;