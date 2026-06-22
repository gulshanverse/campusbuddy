import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/shared/Toast';
import { ArrowLeft, Sparkles, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const ClubDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id: clubId } = useParams<{ id: string }>();
  const { profile } = useAuthStore();
  const { clubs, clubApplications, events, profiles, applyToClub, followClub } = useAppStore();
  const toast = useToast();
  
  const [activeTab, setActiveTab] = useState('about');
  
  // Application form state
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const club = clubs.find(c => c.id === clubId);
  if (!club || !profile) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Club Not Found</h2>
        <Button onClick={() => navigate('/clubs')}>Back to Clubs</Button>
      </div>
    );
  }

  const isMember = club.memberIds.includes(profile.userId);
  const clubLeader = profiles.find(p => p.userId === club.leaderId);
  const clubEvents = events.filter(e => e.clubId === club.id);
  
  // Check if user has an existing application
  const existingApp = clubApplications.find(
    (app) => app.clubId === club.id && app.userId === profile.userId
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      applyToClub(club.id, profile.userId, reason);
      setSubmitting(false);
      setReason('');
      toast.success('Application Submitted!', 'The club leader will review your application soon.');
    }, 1000);
  };

  const tabOptions = [
    { id: 'about', label: 'About Club' },
    { id: 'members', label: `Members (${club.memberIds.length})` },
    { id: 'events', label: `Events (${clubEvents.length})` }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/clubs')}>
          <ArrowLeft size={18} /> Back to Clubs
        </Button>
      </div>

      {/* Club Banner Head */}
      <Card padding="none" style={{ overflow: 'hidden' }}>
        <div style={{ height: '160px', position: 'relative' }}>
          <img src={club.banner} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute',
            bottom: '-28px',
            left: '24px',
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-tertiary)',
            border: '2px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            {club.logo}
          </div>
        </div>

        <div style={{ padding: '40px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                {club.name}
              </h1>
              {club.isRecruiting && <Badge variant="success">Recruiting</Badge>}
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', textTransform: 'capitalize', display: 'block', marginTop: '4px' }}>
              Category: {club.category} Professional Chapter
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant={isMember ? 'outline' : 'primary'}
              onClick={() => {
                followClub(club.id, profile.userId);
                if (isMember) {
                  toast.info('Unfollowed', `No longer following ${club.name}.`);
                } else {
                  toast.success('Following!', `You\'ll receive updates from ${club.name}.`);
                }
              }}
            >
              {isMember ? 'Unfollow' : 'Follow Updates'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Core Split Detail Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.3fr', gap: '24px' }} className="grid-cols-2">
        {/* Left Side: Detail Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card padding="md" hoverEffect={false}>
            <Tabs options={tabOptions} activeTab={activeTab} onChange={setActiveTab} />

            <div style={{ marginTop: '20px' }}>
              {activeTab === 'about' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.98rem' }}>
                    {club.description}
                  </p>
                  
                  {clubLeader && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '8px' }}>
                      <Avatar src={clubLeader.avatar} name={clubLeader.name} size="md" isVerified={true} />
                      <div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>CLUB LEADER</span>
                        <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{clubLeader.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>{clubLeader.branch} • Year {clubLeader.year}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'members' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {club.memberIds.map((memId) => {
                    const member = profiles.find(p => p.userId === memId);
                    if (!member) return null;
                    return (
                      <div key={memId} className="glass" style={{ padding: '10px 16px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Avatar src={member.avatar} name={member.name} size="sm" isVerified={true} />
                          <div>
                            <span style={{ fontWeight: '700', fontSize: '0.92rem' }}>{member.name}</span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>{member.branch} • Year {member.year}</span>
                          </div>
                        </div>
                        {club.leaderId === memId ? (
                          <Badge variant="warning" style={{ fontSize: '0.7rem' }}>Leader</Badge>
                        ) : (
                          <Badge variant="default" style={{ fontSize: '0.7rem' }}>Member</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'events' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {clubEvents.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No events listed for this club yet.</p>
                  ) : (
                    clubEvents.map((ev) => (
                      <div key={ev.id} className="glass" style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ fontWeight: '700', fontSize: '0.95rem' }}>{ev.title}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(ev.date).toLocaleDateString()} • {ev.venue}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/events`)}>
                          Register
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Side: Recruitment Portal Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {club.isRecruiting ? (
            <Card padding="md" hoverEffect={false} style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(59, 130, 246, 0.02) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={18} style={{ color: 'var(--accent-emerald)' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>Recruitment Portal</h3>
              </div>

              {existingApp ? (
                <div className="glass" style={{ padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent-amber)' }}>
                    Application Pending Review
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Your application submitted on {new Date(existingApp.createdAt).toLocaleDateString()} is being evaluated by the club board.
                  </p>
                  <Badge variant="warning" style={{ alignSelf: 'center', textTransform: 'capitalize' }}>
                    {existingApp.status}
                  </Badge>
                </div>
              ) : isMember ? (
                <div className="glass" style={{ padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--accent-emerald)', fontWeight: '600' }}>
                  ✓ You are already a member of this club
                </div>
              ) : (
                <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    Introduce yourself and explain why you want to join the {club.name}. List any relevant technical skills or project experience.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <textarea
                      placeholder="Why do you want to join this club?..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        height: '100px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 16px',
                        color: 'var(--text-primary)',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        outline: 'none',
                        resize: 'none'
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
                  </div>

                  <Button type="submit" variant="primary" style={{ width: '100%' }} loading={submitting} rightIcon={<Send size={14} />}>
                    Submit Application
                  </Button>
                </form>
              )}
            </Card>
          ) : (
            <Card padding="md" hoverEffect={false} style={{ color: 'var(--text-secondary)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Recruitments Closed</h3>
              <p style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                Recruitments for {club.name} are currently closed. Check back next semester or follow for updates!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
