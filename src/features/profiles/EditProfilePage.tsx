import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Trash, Plus, Save, ArrowLeft } from 'lucide-react';

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useAuthStore();

  if (!profile) return null;

  const [name, setName] = useState(profile.name);
  const [branch, setBranch] = useState(profile.branch);
  const [year, setYear] = useState(String(profile.year));
  const [bio, setBio] = useState(profile.bio);
  
  const [skillsText, setSkillsText] = useState(profile.skills.join(', '));
  const [techText, setTechText] = useState(profile.techStack.join(', '));
  const [goalsText, setGoalsText] = useState(profile.careerGoals.join('\n'));

  // Projects list state
  const [projects, setProjects] = useState(profile.projects || []);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');

  // Availability schedule
  const [availability, setAvailability] = useState(profile.availability || []);
  const [newDay, setNewDay] = useState('Monday');
  const [newTime, setNewTime] = useState('Morning');

  const handleAddProject = () => {
    if (!newProjTitle) return;
    setProjects([
      ...projects,
      {
        title: newProjTitle,
        description: newProjDesc,
        techStack: newProjTech.split(',').map(s => s.trim()).filter(Boolean)
      }
    ]);
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjTech('');
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, idx) => idx !== index));
  };

  const handleAddAvailability = () => {
    // Check if slot already exists
    const exists = availability.some(av => av.day === newDay && av.time === newTime);
    if (exists) return;
    setAvailability([...availability, { day: newDay, time: newTime }]);
  };

  const handleRemoveAvailability = (index: number) => {
    setAvailability(availability.filter((_, idx) => idx !== index));
  };

  const handleSave = () => {
    updateProfile({
      name,
      branch,
      year: Number(year),
      bio,
      skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
      techStack: techText.split(',').map(t => t.trim()).filter(Boolean),
      careerGoals: goalsText.split('\n').map(g => g.trim()).filter(Boolean),
      projects,
      availability
    });
    alert('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
          <ArrowLeft size={18} />
        </Button>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
          Edit Profile
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px' }} className="grid-cols-2">
        {/* Left Side: General Profile Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card padding="md" hoverEffect={false}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              General Information
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-cols-2">
                <Select
                  label="Branch / Major"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  options={[
                    { value: 'Computer Science', label: 'Computer Science (CSE)' },
                    { value: 'Information Technology', label: 'Information Technology (IT)' },
                    { value: 'Electronics Engineering', label: 'Electronics (ECE)' },
                    { value: 'Mechanical Engineering', label: 'Mechanical (ME)' },
                    { value: 'Civil Engineering', label: 'Civil (CE)' }
                  ]}
                />
                <Select
                  label="Year of Study"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  options={[
                    { value: '1', label: '1st Year' },
                    { value: '2', label: '2nd Year' },
                    { value: '3', label: '3rd Year' },
                    { value: '4', label: '4th Year' }
                  ]}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Bio / Description</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100px',
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
            </div>
          </Card>

          {/* Skills & Goals Card */}
          <Card padding="md" hoverEffect={false}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Skills, Technology & Goals
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Skills (Comma-separated)"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                helperText="Example: React, Python, C++, Docker"
              />
              <Input
                label="Tech Stack (Comma-separated)"
                value={techText}
                onChange={(e) => setTechText(e.target.value)}
                helperText="Example: MERN, Next.js, Django, PostgreSQL"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  Career Goals (One per line)
                </label>
                <textarea
                  value={goalsText}
                  onChange={(e) => setGoalsText(e.target.value)}
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
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </Card>

          {/* Projects Card */}
          <Card padding="md" hoverEffect={false}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Projects
            </h3>
            
            {/* Added projects list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {projects.map((proj, idx) => (
                <div key={idx} className="glass" style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: '700', fontSize: '0.92rem' }}>{proj.title}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{proj.techStack.join(', ')}</span>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveProject(idx)} style={{ padding: '6px' }}>
                    <Trash size={14} />
                  </Button>
                </div>
              ))}
            </div>

            {/* Project addition form */}
            <div style={{ padding: '16px', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Add New Project</h4>
              <Input placeholder="Project Title" value={newProjTitle} onChange={(e) => setNewProjTitle(e.target.value)} />
              <Input placeholder="Project Description" value={newProjDesc} onChange={(e) => setNewProjDesc(e.target.value)} />
              <Input placeholder="Tech Stack (comma separated)" value={newProjTech} onChange={(e) => setNewProjTech(e.target.value)} />
              <Button variant="secondary" size="sm" onClick={handleAddProject} leftIcon={<Plus size={14} />}>
                Add Project to Profile
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Side: Availability & Save Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Submit Action Card */}
          <Card padding="md" hoverEffect={false} style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              Save Profile Changes
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
              Submitting updates will instantly update your listings across the study finder, hackathon channels, and clubs directory.
            </p>
            <Button variant="primary" onClick={handleSave} style={{ width: '100%' }} leftIcon={<Save size={16} />}>
              Save Profile
            </Button>
          </Card>

          {/* Weekly Availability Card */}
          <Card padding="md" hoverEffect={false}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Weekly Availability
            </h3>
            
            {/* Added availability list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {availability.map((av, idx) => (
                <div key={idx} className="glass" style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <span>{av.day} • <span style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>{av.time}</span></span>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveAvailability(idx)} style={{ padding: '4px' }}>
                    <Trash size={12} />
                  </Button>
                </div>
              ))}
            </div>

            {/* Availability addition form */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} className="grid-cols-2">
                <Select
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                  options={[
                    { value: 'Monday', label: 'Monday' },
                    { value: 'Tuesday', label: 'Tuesday' },
                    { value: 'Wednesday', label: 'Wednesday' },
                    { value: 'Thursday', label: 'Thursday' },
                    { value: 'Friday', label: 'Friday' },
                    { value: 'Saturday', label: 'Saturday' },
                    { value: 'Sunday', label: 'Sunday' }
                  ]}
                />
                <Select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  options={[
                    { value: 'Morning', label: 'Morning' },
                    { value: 'Afternoon', label: 'Afternoon' },
                    { value: 'Evening', label: 'Evening' }
                  ]}
                />
              </div>
              <Button variant="secondary" size="sm" onClick={handleAddAvailability} leftIcon={<Plus size={14} />}>
                Add Slot
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
