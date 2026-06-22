import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../components/shared/Toast';
import { Search, Calendar, MapPin, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const { events, registerForEvent, unregisterFromEvent } = useAppStore();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  if (!profile) return null;

  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          e.description.toLowerCase().includes(search.toLowerCase()) ||
                          e.organizer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = (eventId: string, isRegistered: boolean) => {
    if (isRegistered) {
      unregisterFromEvent(eventId, profile.userId);
      toast.info('Registration Cancelled', 'You have been removed from this event.');
    } else {
      registerForEvent(eventId, profile.userId);
      toast.success('Registered!', 'Event added to your dashboard.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
          Campus Events Calendar
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Discover hackathons, guest lectures, sports events, and cultural clashes on campus.
        </p>
      </div>

      {/* Filters */}
      <div className="glass" style={{ padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Input
          placeholder="Search events by title or organizers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={16} />}
          style={{ flexGrow: 1, minWidth: '240px' }}
        />

        <Select
          options={[
            { value: 'All', label: 'All Categories' },
            { value: 'technical', label: 'Technical' },
            { value: 'cultural', label: 'Cultural' },
            { value: 'sports', label: 'Sports & Games' },
            { value: 'workshop', label: 'Workshops' },
            { value: 'hackathon', label: 'Hackathons' }
          ]}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ width: '200px' }}
        />
      </div>

      {/* Grid of Events */}
      {filteredEvents.length === 0 ? (
        <Card padding="lg" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          No upcoming events matching your filters were found.
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="grid-cols-3">
          {filteredEvents.map((ev) => {
            const isRegistered = ev.registeredIds.includes(profile.userId);
            
            return (
              <Card key={ev.id} padding="none" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ height: '140px' }}>
                  <img
                    src={ev.banner}
                    alt={ev.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                  <div className="flex-between">
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-purple)', fontWeight: '700', textTransform: 'uppercase' }}>
                      {ev.category}
                    </span>
                    <Badge variant={isRegistered ? 'success' : 'default'}>
                      {isRegistered ? 'Registered' : `${ev.registeredIds.length}/${ev.maxCapacity} Seats`}
                    </Badge>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                    {ev.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', flexGrow: 1 }}>
                    {ev.description.substring(0, 110)}...
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} /> {new Date(ev.date).toLocaleDateString()} at {new Date(ev.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} /> {ev.venue}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/events/${ev.id}`)}>
                      Details
                    </Button>
                    <Button
                      variant={isRegistered ? 'danger' : 'primary'}
                      size="sm"
                      onClick={() => handleRegister(ev.id, isRegistered)}
                    >
                      {isRegistered ? 'Unregister' : 'Register'}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
