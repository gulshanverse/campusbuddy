import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Terminal, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { RecommendationsWidget } from '../ai/RecommendationsWidget';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const { events, studyGroups, teams, profiles } = useAppStore();

  if (!profile) return null;

  // Filter relevant mock statistics
  const connectionsCount = profiles.length - 1; // excluding self
  const myEvents = events.filter(e => e.registeredIds.includes(profile.userId));
  const myGroups = studyGroups.filter(g => g.memberIds.includes(profile.userId));
  const myTeams = teams.filter(t => t.memberIds.includes(profile.userId) || t.leaderId === profile.userId);

  // Recommendations will be handled by the RecommendationsWidget

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div
        className="glass"
        style={{
          padding: '24px 32px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
              Welcome back, {profile.name}
            </h1>
            {user?.isVerified && (
              <span style={{ color: 'var(--accent-blue)', display: 'inline-flex' }}>
                <ShieldCheck size={20} fill="rgba(59, 130, 246, 0.1)" />
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Branch: {profile.branch} • Year {profile.year} • Engineering Institute of Tech
          </p>
        </div>
        {!user?.isVerified && (
          <Button variant="primary" size="sm" onClick={() => navigate('/verify')}>
            Complete Verification
          </Button>
        )}
      </div>

      {/* Grid of counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="grid-cols-4">
        <Card padding="sm" style={{ display: 'flex', alignItems: 'center', gap: '16px' }} hoverEffect={false}>
          <div style={{ background: 'var(--accent-purple-glow)', color: 'var(--accent-purple)', width: '42px', height: '42px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
            <Users size={20} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.2' }}>{connectionsCount}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Campus Connections</span>
          </div>
        </Card>
        <Card padding="sm" style={{ display: 'flex', alignItems: 'center', gap: '16px' }} hoverEffect={false}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', width: '42px', height: '42px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.2' }}>{myGroups.length}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>My Study Groups</span>
          </div>
        </Card>
        <Card padding="sm" style={{ display: 'flex', alignItems: 'center', gap: '16px' }} hoverEffect={false}>
          <div style={{ background: 'var(--accent-blue-glow)', color: 'var(--accent-blue)', width: '42px', height: '42px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
            <Calendar size={20} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.2' }}>{myEvents.length}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Registered Events</span>
          </div>
        </Card>
        <Card padding="sm" style={{ display: 'flex', alignItems: 'center', gap: '16px' }} hoverEffect={false}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-amber)', width: '42px', height: '42px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
            <Terminal size={20} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.2' }}>{myTeams.length}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>My Hackathon Teams</span>
          </div>
        </Card>
      </div>

      {/* Main Widgets columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px' }} className="grid-cols-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Upcoming Events Widget */}
          <Card padding="md">
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>Upcoming Events</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/events')} rightIcon={<ArrowRight size={14} />}>
                Browse All
              </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {events.slice(0, 2).map((ev) => {
                const isRegistered = ev.registeredIds.includes(profile.userId);
                return (
                  <div
                    key={ev.id}
                    className="glass"
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-purple)', fontWeight: '700', textTransform: 'uppercase' }}>
                        {ev.category}
                      </span>
                      <h4 style={{ fontWeight: '700', fontSize: '0.98rem', margin: '4px 0' }}>{ev.title}</h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {new Date(ev.date).toLocaleDateString()} • {ev.venue}
                      </p>
                    </div>
                    {isRegistered ? (
                      <Badge variant="success">Registered</Badge>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => navigate(`/events`)}>
                        Register
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Active Study Groups Widget */}
          <Card padding="md">
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>Active Study Groups</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/study-buddy')} rightIcon={<ArrowRight size={14} />}>
                Find Groups
              </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {studyGroups.slice(0, 2).map((g) => (
                <div
                  key={g.id}
                  className="glass"
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontWeight: '700', fontSize: '0.98rem' }}>{g.name}</h4>
                      <Badge variant="info" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>{g.subject}</Badge>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Schedule: {g.schedule}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Members: {g.memberIds.length} / {g.maxMembers}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/study-buddy`)}>
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* AI Recommended Connections */}
          <RecommendationsWidget />

          {/* Guidelines Safety Widget */}
          <Card padding="md" style={{ background: 'rgba(124, 58, 237, 0.02)', border: '1px solid rgba(124, 58, 237, 0.08)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-purple)', marginBottom: '8px' }}>
              Campus Safety & Professionalism
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              CampusBuddy is a professional space. Dating matches, romantic solicitation, and harassment are strictly prohibited. 
              Always use respectful language in direct chats and group channels. Violations will result in an immediate trust score drop or suspension.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
