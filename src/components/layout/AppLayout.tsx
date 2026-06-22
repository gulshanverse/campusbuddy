import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar Navigation */}
      <Sidebar collapsed={collapsed} />

      {/* Main Shell Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: collapsed ? '80px' : 'var(--sidebar-width)',
          transition: 'margin-left var(--transition-normal)',
          minWidth: 0 // Prevent flex blowout
        }}
      >
        {/* Header bar */}
        <TopBar onToggleSidebar={toggleSidebar} collapsed={collapsed} />

        {/* Content Area */}
        <main
          style={{
            flex: 1,
            padding: '24px',
            marginTop: 'var(--topbar-height)',
            overflowY: 'auto',
            background: 'var(--bg-primary)'
          }}
        >
          <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
