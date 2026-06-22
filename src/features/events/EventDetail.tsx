import React from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ArrowLeft, Calendar, MapPin, Users, Share2, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EventDetail: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const { events, profiles, registerForEvent, unregisterFromEvent } = useAppStore();

  const hash = window.location.hash;
  const queryParams = new URLSearchParams(hash.split('?')[1]);
  const eventId = queryParams.get('id');

  const event = events.find(e => e.id === eventId);

  if (!event || !profile) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Event Not Found</h2>
        <Button onClick={() => navigate('/events')}>Back to Events</Button>
      </div>
    );
  }

  const isRegistered = event.registeredIds.includes(profile.userId);
  const registeredProfiles = profiles.filter(p => event.registeredIds.includes(p.userId));

  const handleRegister = () => {
    if (isRegistered) {
      unregisterFromEvent(event.id, profile.userId);
      alert('Unregistered from event successfully.');
    } else {
      registerForEvent(event.id, profile.userId);
      alert('Registration confirmed! You will receive updates about this event.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/events')}>
          <ArrowLeft size={18} /> Back to Events
        </Button>
      </div>

      {/* Main card */}
      <Card padding="none" style={{ overflow: 'hidden' }}>
        <div style={{ height: '240px' }}>
          <img src={event.banner} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: '700', textTransform: 'uppercase' }}>
                {event.category} Event
              </span>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
                {event.title}
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="outline" size="sm" onClick={() => alert('Event link copied to clipboard!')}>
                <Share2 size={16} />
              </Button>
              <Button
                variant={isRegistered ? 'danger' : 'primary'}
                onClick={handleRegister}
              >
                {isRegistered ? 'Unregister' : 'Register Now'}
              </Button>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid var(--border)', width: '100%', margin: '8px 0' }} />

          {/* Details split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '32px' }} className="grid-cols-2">
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                Event Description
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {event.description}
              </p>
              
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
                  Registered Students ({registeredProfiles.length})
                </h3>
                {registeredProfiles.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Be the first student to register!</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {registeredProfiles.map((p) => (
                      <div key={p.userId} className="glass" style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar src={p.avatar} name={p.name} size="sm" isVerified={true} />
                        <div>
                          <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{p.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{p.branch} • Year {p.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Event sidebar details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Card padding="md" hoverEffect={false}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
                  Schedule & Venue
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ color: 'var(--accent-purple)' }}><Calendar size={18} /></div>
                    <div>
                      <span style={{ display: 'block', fontWeight: '600' }}>Date & Time</span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>
                        {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ color: 'var(--accent-blue)' }}><MapPin size={18} /></div>
                    <div>
                      <span style={{ display: 'block', fontWeight: '600' }}>Venue location</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{event.venue}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ color: 'var(--accent-emerald)' }}><Users size={18} /></div>
                    <div>
                      <span style={{ display: 'block', fontWeight: '600' }}>Capacity limit</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{event.maxCapacity} seats max</span>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>
                        {event.maxCapacity - event.registeredIds.length} spots remaining
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card padding="md" hoverEffect={false} style={{ background: 'rgba(255,255,255,0.01)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>ORGANIZER</span>
                <span style={{ fontWeight: '700', display: 'block', marginTop: '4px' }}>{event.organizer}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  Official student club of Engineering Institute of Tech. All attendance records are verified.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
