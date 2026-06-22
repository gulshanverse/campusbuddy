import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Home, 
  User as UserIcon, 
  Terminal, 
  Compass, 
  Calendar, 
  MessageSquare, 
  ShieldAlert, 
  LogOut, 
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const activePath = location.pathname;

  const unreadMessagesCount = 0; // Simplified

  const navItems = [
    { section: 'Personal', items: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> },
      { id: 'profile', label: 'My Profile', path: '/profile', icon: <UserIcon size={18} /> }
    ]},
    { section: 'Discover', items: [
      { id: 'study-buddy', label: 'Study Buddy', path: '/study-buddy', icon: <BookOpen size={18} /> },
      { id: 'hackathon', label: 'Teammates', path: '/hackathon', icon: <Terminal size={18} /> }
    ]},
    { section: 'Community', items: [
      { id: 'clubs', label: 'Clubs', path: '/clubs', icon: <Compass size={18} /> },
      { id: 'events', label: 'Events', path: '/events', icon: <Calendar size={18} /> },
      { id: 'chat', label: 'Chat', path: '/chat', icon: <MessageSquare size={18} />, badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined }
    ]}
  ];

  // Add Admin item if role is admin
  if (user && (user.role === 'admin' || user.id === 'admin')) {
    navItems.push({
      section: 'Management',
      items: [
        { id: 'admin', label: 'Admin Panel', path: '/admin', icon: <ShieldAlert size={18} /> }
      ]
    });
  }

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside
      className="glass"
      style={{
        width: collapsed ? '80px' : 'var(--sidebar-width)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        transition: 'all var(--transition-normal)',
        background: 'var(--bg-secondary)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {/* Brand Header */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{
          height: 'var(--topbar-height)',
          display: 'flex',
          alignItems: 'center',
          padding: collapsed ? '0' : '0 24px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid var(--border)',
          cursor: 'pointer',
          gap: '12px'
        }}
      >
        <div
          style={{
            background: 'var(--gradient-primary)',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.25rem',
            color: '#fff',
            flexShrink: 0
          }}
        >
          C
        </div>
        {!collapsed && (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '800',
              fontSize: '1.2rem',
              letterSpacing: '-0.5px'
            }}
          >
            Campus<span className="gradient-text">Buddy</span>
          </span>
        )}
      </div>

      {/* Navigation Sections */}
      <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {navItems.map((section) => (
          <div key={section.section} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {!collapsed && (
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  letterSpacing: '1px',
                  paddingLeft: '8px',
                  marginBottom: '4px'
                }}
              >
                {section.section}
              </span>
            )}
            {section.items.map((item) => {
              const isActive = activePath === item.path || activePath.startsWith(item.path + '/');
              return (
                <div
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: isActive ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'rgba(124, 58, 237, 0.15)' : 'transparent'}`
                  }}
                  onMouseEnter={(e) => {
                    if (isActive) return;
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    if (isActive) return;
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: isActive ? 'var(--accent-purple)' : 'inherit', display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </div>
                    {!collapsed && <span style={{ fontSize: '0.92rem', fontWeight: isActive ? '600' : '500' }}>{item.label}</span>}
                  </div>
                  {!collapsed && item.badge !== undefined && (
                    <span
                      style={{
                        backgroundColor: 'var(--accent-rose)',
                        color: '#fff',
                        borderRadius: '50px',
                        padding: '2px 6px',
                        fontSize: '0.7rem',
                        fontWeight: '700'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Logout Footer */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
        <div
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-rose)';
            e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut size={18} />
          {!collapsed && <span style={{ fontSize: '0.92rem', fontWeight: '500' }}>Log Out</span>}
        </div>
      </div>
    </aside>
  );
};
