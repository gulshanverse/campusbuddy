import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { Bell, User, LogOut } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  onToggleSidebar: () => void;
  collapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar, collapsed }) => {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuthStore();
  const { notifications, markAllNotificationsRead } = useAppStore();
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  const markAllRead = () => {
    markAllNotificationsRead();
    setShowNotifDropdown(false);
  };

  return (
    <header
      className="glass"
      style={{
        height: 'var(--topbar-height)',
        borderBottom: '1px solid var(--border)',
        position: 'fixed',
        top: 0,
        right: 0,
        left: collapsed ? '80px' : 'var(--sidebar-width)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        transition: 'left var(--transition-normal)',
        background: 'var(--bg-primary)'
      }}
    >
      {/* Sidebar Toggle & Path */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Global Search Bar */}
        <div style={{ position: 'relative', width: '280px', display: 'none' }}>
          {/* Note: In page view we have searches, this top bar one can be simple or hidden on mobile */}
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
        {/* Notifications Icon */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifDropdown(!showNotifDropdown);
              setShowProfileDropdown(false);
            }}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: unreadNotifs.length > 0 ? 'var(--accent-purple)' : 'var(--text-secondary)',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            {unreadNotifs.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-rose)'
                }}
              />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifDropdown && (
            <div
              className="glass-heavy"
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '320px',
                borderRadius: 'var(--radius-md)',
                zIndex: 110,
                overflow: 'hidden',
                animation: 'scaleIn var(--transition-fast) forwards'
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Notifications</span>
                {unreadNotifs.length > 0 && (
                  <button
                    onClick={markAllRead}
                    style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: '600' }}
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
                        backgroundColor: n.isRead ? 'transparent' : 'rgba(124, 58, 237, 0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.85rem', color: n.isRead ? 'var(--text-primary)' : 'var(--accent-blue)' }}>
                          {n.title}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Trigger */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifDropdown(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)'
            }}
          >
            {profile && (
              <>
                <Avatar src={profile.avatar} name={profile.name} size="sm" isVerified={user?.isVerified} />
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {profile.name}
                </span>
              </>
            )}
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div
              className="glass-heavy"
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '200px',
                borderRadius: 'var(--radius-md)',
                zIndex: 110,
                overflow: 'hidden',
                animation: 'scaleIn var(--transition-fast) forwards'
              }}
            >
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {profile?.name}
                </span>
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email}
                </span>
              </div>
              <div style={{ padding: '6px' }}>
                <div
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate('/profile');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <User size={14} />
                  View Profile
                </div>
                <div
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    color: 'var(--accent-rose)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut size={14} />
                  Log Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
