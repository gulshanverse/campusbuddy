import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/shared/Toast';
import { Search, Plus } from 'lucide-react';

export const HackathonPage: React.FC = () => {
  const { profile } = useAuthStore();
  const { teams, profiles, createTeam, applyToRole } = useAppStore();
  const toast = useToast();
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newHackName, setNewHackName] = useState('VeloHack 2026');
  const [newTeamDesc, setNewTeamDesc] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [reqSkills, setReqSkills] = useState('');

  if (!profile) return null;

  const roleOptions = ['Frontend', 'Backend', 'AI/ML', 'UI/UX', 'Marketing'];

  const toggleRoleSelection = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleCreateTeam = () => {
    if (!newTeamName) return;
    createTeam({
      name: newTeamName,
      hackathonName: newHackName,
      description: newTeamDesc,
      leaderId: profile.userId,
      openRoles: selectedRoles,
      requiredSkills: reqSkills.split(',').map(s => s.trim()).filter(Boolean)
    });
    setIsModalOpen(false);
    setNewTeamName('');
    setNewTeamDesc('');
    setSelectedRoles([]);
    setReqSkills('');
  };

  const handleApply = (teamId: string, role: string) => {
    applyToRole(teamId, role, profile.userId);
    toast.success('Application Sent!', `Applied to join as ${role}. The team leader has been notified.`);
  };

  // Filter teams based on search query and role filter
  const filteredTeams = teams.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase()) ||
                          t.hackathonName.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || t.openRoles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
            Hackathon Partner Finder
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Form project teams, solicit specific roles, and compete in upcoming hackathons.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus size={16} />}>
          Create Project Team
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="glass" style={{ padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Input
          placeholder="Search teams or hackathons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={16} />}
          style={{ flexGrow: 1, minWidth: '240px' }}
        />

        <Select
          options={[
            { value: 'All', label: 'All Open Roles' },
            { value: 'Frontend', label: 'Frontend Developers' },
            { value: 'Backend', label: 'Backend Developers' },
            { value: 'AI/ML', label: 'AI/ML Engineers' },
            { value: 'UI/UX', label: 'UI/UX Designers' },
            { value: 'Marketing', label: 'Growth / Marketing' }
          ]}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ width: '220px' }}
        />
      </div>

      {/* Grid of Teams */}
      {filteredTeams.length === 0 ? (
        <Card padding="lg" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          No project teams found looking for members. Be the first to create one!
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="grid-cols-2">
          {filteredTeams.map((team) => {
            const isLeader = team.leaderId === profile.userId;
            const isMember = team.memberIds.includes(profile.userId);

            return (
              <Card key={team.id} padding="md" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Team meta */}
                <div className="flex-between">
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: '700', textTransform: 'uppercase' }}>
                      Competing in {team.hackathonName}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
                      {team.name}
                    </h3>
                  </div>
                  <Badge variant={team.status === 'complete' ? 'success' : 'warning'}>
                    {team.status === 'complete' ? 'Team Full' : 'Recruiting'}
                  </Badge>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {team.description}
                </p>

                {/* Team members */}
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    CURRENT TEAM ({team.memberIds.length})
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {team.memberIds.map((memId) => {
                      const member = profiles.find(p => p.userId === memId);
                      if (!member) return null;
                      return (
                        <div key={memId} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.02)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                          <Avatar src={member.avatar} name={member.name} size="sm" />
                          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{member.name}</span>
                          {team.leaderId === memId && <span title="Team Leader" style={{ fontSize: '0.7rem', color: 'var(--accent-amber)' }}>👑</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Skills needed */}
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    REQUIRED SKILLS
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {team.requiredSkills.map((sk) => (
                      <span key={sk} style={{ fontSize: '0.72rem', background: 'var(--accent-purple-glow)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent-purple)', fontWeight: '600' }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Open Positions */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    OPEN POSITIONS
                  </span>
                  {team.openRoles.length === 0 ? (
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      ✓ All positions filled
                    </span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {team.openRoles.map((role) => (
                        <div key={role} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                            {role} Developer
                          </span>
                          {!isLeader && !isMember && (
                            <Button variant="outline" size="sm" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => handleApply(team.id, role)}>
                              Apply
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Team Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Hackathon Project Team"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateTeam}>Create Team</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Team / Project Name"
            placeholder="NeuralByte AI"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <Input
            label="Hackathon Name"
            placeholder="VeloHack 2026"
            value={newHackName}
            onChange={(e) => setNewHackName(e.target.value)}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Project Description</label>
            <textarea
              placeholder="What are you building? Explain the stack, problem, and your goals..."
              value={newTeamDesc}
              onChange={(e) => setNewTeamDesc(e.target.value)}
              style={{
                width: '100%',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Select Open Roles Needed
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {roleOptions.map((role) => {
                const selected = selectedRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRoleSelection(role)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      border: `1px solid ${selected ? 'rgba(124, 58, 237, 0.4)' : 'var(--border)'}`,
                      backgroundColor: selected ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.01)',
                      color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          <Input
            label="Required Skills (Comma-separated)"
            placeholder="Node.js, PyTorch, Figma, WebSockets"
            value={reqSkills}
            onChange={(e) => setReqSkills(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};
