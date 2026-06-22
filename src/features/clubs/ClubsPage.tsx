import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../components/shared/Toast';
import { Search, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClubsPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const { clubs, followClub } = useAppStore();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  if (!profile) return null;

  const filteredClubs = clubs.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
          Campus Club Ecosystem
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Explore professional societies, arts clubs, and technical student chapters.
        </p>
      </div>

      {/* Filters */}
      <div className="glass" style={{ padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Input
          placeholder="Search clubs by name or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={16} />}
          style={{ flexGrow: 1, minWidth: '240px' }}
        />

        <Select
          options={[
            { value: 'All', label: 'All Categories' },
            { value: 'technical', label: 'Technical Clubs' },
            { value: 'cultural', label: 'Cultural & Art' },
            { value: 'sports', label: 'Sports & Athletics' },
            { value: 'social', label: 'Social & NGO' }
          ]}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ width: '200px' }}
        />
      </div>

      {/* Grid of Clubs */}
      {filteredClubs.length === 0 ? (
        <Card padding="lg" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          No clubs matching your filter criteria were found.
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="grid-cols-3">
          {filteredClubs.map((club) => {
            const isMember = club.memberIds.includes(profile.userId);
            
            return (
              <Card key={club.id} padding="none" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Banner image */}
                <div style={{ height: '100px', position: 'relative' }}>
                  <img
                    src={club.banner}
                    alt={club.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '16px',
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {club.logo}
                  </div>
                </div>

                {/* Info body */}
                <div style={{ padding: '32px 16px 20px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                  <div className="flex-between">
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                      {club.name}
                    </h3>
                    <Badge variant={club.category === 'technical' ? 'verified' : 'default'} style={{ textTransform: 'capitalize' }}>
                      {club.category}
                    </Badge>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', flexGrow: 1 }}>
                    {club.description.substring(0, 100)}...
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={14} /> {club.memberIds.length} Members
                    </span>
                    {club.isRecruiting && (
                      <Badge variant="success" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>Recruiting</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/clubs/${club.id}`)}>
                      Club Page
                    </Button>
                    <Button
                      variant={isMember ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => {
                        followClub(club.id, profile.userId);
                        if (isMember) {
                          toast.info('Unfollowed', `No longer following ${club.name}`);
                        } else {
                          toast.success('Following!', `You\'ll receive updates from ${club.name}.`);
                        }
                      }}
                    >
                      {isMember ? 'Unfollow' : 'Follow'}
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
