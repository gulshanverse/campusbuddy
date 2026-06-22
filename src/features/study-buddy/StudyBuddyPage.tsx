import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs } from '../../components/ui/Tabs';
import { Modal } from '../../components/ui/Modal';
import { Search, Plus, BookOpen, Clock, Users, ArrowRight, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudyBuddyPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const { studyGroups, profiles, joinStudyGroup, leaveStudyGroup, createStudyGroup } = useAppStore();
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('groups'); // 'groups' | 'partners'
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupSubject, setNewGroupSubject] = useState('DSA');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupSchedule, setNewGroupSchedule] = useState('Mon, Wed at 6:00 PM');
  const [newGroupMax, setNewGroupMax] = useState('5');

  if (!profile) return null;

  const handleCreateGroup = () => {
    if (!newGroupName) return;
    createStudyGroup({
      name: newGroupName,
      subject: newGroupSubject,
      description: newGroupDesc,
      schedule: newGroupSchedule,
      maxMembers: Number(newGroupMax),
      creatorId: profile.userId
    });
    setIsModalOpen(false);
    setNewGroupName('');
    setNewGroupDesc('');
  };

  // Filter study groups
  const filteredGroups = studyGroups.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) || 
                          g.description.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === 'All' || g.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  // Filter students looking for study partners
  const filteredPartners = profiles.filter((p) => {
    if (p.userId === profile.userId) return false; // exclude self
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesYear = yearFilter === 'All' || String(p.year) === yearFilter;
    const isLookingForStudyPartner = p.lookingFor.includes('Study Partners');
    return matchesSearch && matchesYear && isLookingForStudyPartner;
  });

  const subjectOptions = [
    { value: 'All', label: 'All Subjects' },
    { value: 'DSA', label: 'Data Structures (DSA)' },
    { value: 'AI/ML', label: 'Artificial Intelligence (AI/ML)' },
    { value: 'DBMS', label: 'Database Systems (DBMS)' },
    { value: 'OS', label: 'Operating Systems (OS)' },
    { value: 'CN', label: 'Computer Networks (CN)' },
    { value: 'Aptitude', label: 'Aptitude & Prep' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
            Study Buddy Finder
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Find subject study partners or collaborate in active exam groups.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus size={16} />}>
          Create Study Group
        </Button>
      </div>

      {/* Navigation tabs between groups and partners */}
      <div className="flex-between" style={{ borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '16px' }}>
        <Tabs
          options={[
            { id: 'groups', label: 'Active Study Groups' },
            { id: 'partners', label: 'Find Study Partners' }
          ]}
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setSearch('');
          }}
          style={{ borderBottom: 'none', width: 'auto' }}
        />

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={16} />}
            style={{ width: '200px' }}
          />

          {activeTab === 'groups' ? (
            <Select
              options={subjectOptions}
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              style={{ width: '160px' }}
            />
          ) : (
            <Select
              options={[
                { value: 'All', label: 'All Years' },
                { value: '1', label: '1st Year' },
                { value: '2', label: '2nd Year' },
                { value: '3', label: '3rd Year' },
                { value: '4', label: '4th Year' }
              ]}
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              style={{ width: '130px' }}
            />
          )}
        </div>
      </div>

      {/* Grid Content */}
      {activeTab === 'groups' ? (
        filteredGroups.length === 0 ? (
          <Card padding="lg" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            No study groups match your search or filter. Create one to get started!
          </Card>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="grid-cols-3">
            {filteredGroups.map((g) => {
              const isMember = g.memberIds.includes(profile.userId);
              const isFull = g.memberIds.length >= g.maxMembers;
              
              return (
                <Card key={g.id} padding="md" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Badge variant="info">{g.subject}</Badge>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={14} /> {g.memberIds.length} / {g.maxMembers}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                    {g.name}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', flexGrow: 1 }}>
                    {g.description}
                  </p>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                    <Clock size={14} /> {g.schedule}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    {isMember ? (
                      <Button variant="danger" size="sm" style={{ width: '100%' }} onClick={() => leaveStudyGroup(g.id, profile.userId)}>
                        Leave Group
                      </Button>
                    ) : (
                      <Button
                        variant={isFull ? 'outline' : 'primary'}
                        size="sm"
                        style={{ width: '100%' }}
                        disabled={isFull}
                        onClick={() => {
                          joinStudyGroup(g.id, profile.userId);
                          alert(`Joined study group ${g.name}! Check group chats.`);
                        }}
                      >
                        {isFull ? 'Group Full' : 'Join Group'}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )
      ) : (
        filteredPartners.length === 0 ? (
          <Card padding="lg" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            No students are currently listed looking for study partners matching your criteria.
          </Card>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="grid-cols-3">
            {filteredPartners.map((p) => (
              <Card key={p.userId} padding="md" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar src={p.avatar} name={p.name} size="md" isVerified={true} />
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                      {p.name}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {p.branch} • Year {p.year}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', flexGrow: 1 }}>
                  {p.bio || "Looking for study partners to tackle core engineering courses together."}
                </p>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    SKILLS & TOPICS
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.skills.slice(0, 4).map((s) => (
                      <span key={s} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '4px' }}>
                  <Button variant="outline" size="sm" style={{ flex: 1 }} onClick={() => navigate(`/profile?id=${p.userId}`)}>
                    View Profile
                  </Button>
                  <Button variant="primary" size="sm" style={{ flex: 1 }} onClick={() => navigate(`/chat`)} leftIcon={<UserPlus size={14} />}>
                    Connect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )
      )}

      {/* Create Group Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Study Group"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateGroup}>Create Group</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Group Name"
            placeholder="DSA Leetcode Grinders"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Select
            label="Subject Category"
            value={newGroupSubject}
            onChange={(e) => setNewGroupSubject(e.target.value)}
            options={[
              { value: 'DSA', label: 'Data Structures (DSA)' },
              { value: 'AI/ML', label: 'Artificial Intelligence (AI/ML)' },
              { value: 'DBMS', label: 'Database Systems (DBMS)' },
              { value: 'OS', label: 'Operating Systems (OS)' },
              { value: 'CN', label: 'Computer Networks (CN)' },
              { value: 'Aptitude', label: 'Aptitude & Prep' }
            ]}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Description</label>
            <textarea
              placeholder="What are the goals of this study group? What times do you meet?"
              value={newGroupDesc}
              onChange={(e) => setNewGroupDesc(e.target.value)}
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }} className="grid-cols-2">
            <Input
              label="Schedule"
              placeholder="Mon, Wed, Fri at 6:00 PM"
              value={newGroupSchedule}
              onChange={(e) => setNewGroupSchedule(e.target.value)}
            />
            <Input
              label="Max Members"
              type="number"
              min="2"
              max="15"
              value={newGroupMax}
              onChange={(e) => setNewGroupMax(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
