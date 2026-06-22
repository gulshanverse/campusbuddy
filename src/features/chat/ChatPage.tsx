import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../../components/ui/Avatar';
import { Send, MessageSquare, BookOpen, Terminal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { user: currentUser, profile: currentProfile } = useAuthStore();
  const { conversations, messages, sendMessage, profiles } = useAppStore();

  const [activeConvId, setActiveConvId] = useState<string>('');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  if (!currentUser || !currentProfile) return null;

  const location = useLocation();

  // Auto-select first conversation if none selected, or focus conversation from state
  useEffect(() => {
    const state = location.state as { activeConvId?: string } | null;
    if (state?.activeConvId) {
      setActiveConvId(state.activeConvId);
      // Clean up navigation state so refresh works normally
      navigate(location.pathname, { replace: true, state: {} });
    } else if (conversations.length > 0 && !activeConvId) {
      setActiveConvId(conversations[0].id);
    }
  }, [conversations, activeConvId, location.state]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConvId]);

  const activeConv = conversations.find(c => c.id === activeConvId);
  const activeMessages = messages.filter(m => m.conversationId === activeConvId);

  // Get recipient profile for DMs
  const getDMRecipient = (conv: typeof conversations[0]) => {
    const recipientId = conv.participantIds.find(id => id !== currentUser.id);
    return profiles.find(p => p.userId === recipientId);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;
    sendMessage(activeConvId, currentUser.id, inputText);
    setInputText('');
  };

  // Get active conversation name
  const getConvName = (conv: typeof conversations[0]) => {
    if (conv.type === 'direct') {
      const rec = getDMRecipient(conv);
      return rec ? rec.name : 'Unknown Student';
    }
    return conv.name || 'Group Chat';
  };

  // Get active conversation avatar
  const getConvAvatar = (conv: typeof conversations[0]) => {
    if (conv.type === 'direct') {
      const rec = getDMRecipient(conv);
      return rec ? rec.avatar : '';
    }
    return '';
  };

  // Participant profiles
  const activeParticipants = activeConv 
    ? profiles.filter(p => activeConv.participantIds.includes(p.userId))
    : [];

  return (
    <div
      className="glass"
      style={{
        height: 'calc(100vh - var(--topbar-height) - 48px)',
        display: 'grid',
        gridTemplateColumns: '260px 1fr 200px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }}
    >
      {/* 1. Left Channel/Direct Messages List */}
      <div
        style={{
          borderRight: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>Chats & Channels</h3>
        </div>

        {/* Categories */}
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Direct Messages */}
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '8px' }}>
              Direct Messages
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              {conversations.filter(c => c.type === 'direct').map(conv => {
                const rec = getDMRecipient(conv);
                const isActive = conv.id === activeConvId;
                if (!rec) return null;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      background: isActive ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(124, 58, 237, 0.15)' : 'transparent'}`,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    <Avatar src={rec.avatar} name={rec.name} size="sm" isVerified={true} />
                    <span style={{ fontSize: '0.85rem', fontWeight: isActive ? '600' : '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {rec.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Study Groups */}
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '8px' }}>
              Study Channels
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              {conversations.filter(c => c.type === 'study_group').map(conv => {
                const isActive = conv.id === activeConvId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      background: isActive ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent'}`,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ color: isActive ? 'var(--accent-blue)' : 'inherit' }}><BookOpen size={16} /></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: isActive ? '600' : '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {conv.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hackathon Teams */}
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '8px' }}>
              Team Channels
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              {conversations.filter(c => c.type === 'team').map(conv => {
                const isActive = conv.id === activeConvId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      background: isActive ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent'}`,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ color: isActive ? 'var(--accent-emerald)' : 'inherit' }}><Terminal size={16} /></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: isActive ? '600' : '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {conv.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Messages Area */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)' }}>
        {/* Active conversation Header */}
        {activeConv && (
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {activeConv.type === 'direct' ? (
              <Avatar src={getConvAvatar(activeConv)} name={getConvName(activeConv)} size="sm" isVerified={true} />
            ) : activeConv.type === 'study_group' ? (
              <BookOpen size={18} style={{ color: 'var(--accent-blue)' }} />
            ) : (
              <Terminal size={18} style={{ color: 'var(--accent-emerald)' }} />
            )}
            <div>
              <span style={{ fontWeight: '700', fontSize: '0.98rem' }}>{getConvName(activeConv)}</span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {activeConv.type === 'direct' ? 'Direct conversation' : `${activeConv.type.replace('_', ' ')} workspace`}
              </span>
            </div>
          </div>
        )}

        {/* Message Feed */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeMessages.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <MessageSquare size={32} style={{ marginBottom: '12px' }} />
              <span>Send a message to start this connection.</span>
            </div>
          ) : (
            activeMessages.map((msg) => {
              const sender = profiles.find(p => p.userId === msg.senderId);
              return (
                <div key={msg.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Avatar src={sender?.avatar} name={sender?.name} size="sm" isVerified={true} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>{sender?.name}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <form onSubmit={handleSend} style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder={`Message #${activeConv ? getConvName(activeConv) : 'channel'}`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 48px 12px 16px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.92rem',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--border-focus)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '12px',
                color: inputText.trim() ? 'var(--accent-purple)' : 'var(--text-muted)',
                cursor: inputText.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* 3. Right Members Sidebar */}
      <div
        style={{
          borderLeft: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-secondary)' }}>Members</span>
        </div>
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activeParticipants.map((p) => (
            <div
              key={p.userId}
              onClick={() => navigate(`/profile/${p.userId}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'background var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Avatar src={p.avatar} name={p.name} size="sm" isVerified={true} status="online" />
              <div style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </span>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Year {p.year} {p.branch.substring(0, 3)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
