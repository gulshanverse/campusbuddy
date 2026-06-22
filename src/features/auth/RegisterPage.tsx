import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [step, setStep] = useState(1);
  
  // Step 1 State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Step 2 State
  const [branch, setBranch] = useState('Computer Science');
  const [year, setYear] = useState('3');
  const [bio, setBio] = useState('');

  // Step 3 State
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);

  const skillOptions = ['React', 'Node.js', 'Python', 'TypeScript', 'Figma', 'System Design', 'C++', 'Java', 'TensorFlow', 'UI/UX'];
  const lookingForOptions = ['Study Partners', 'Hackathon Teammates', 'Club Members', 'Mentors', 'Project Teammates'];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleLookingFor = (option: string) => {
    if (selectedLookingFor.includes(option)) {
      setSelectedLookingFor(selectedLookingFor.filter(o => o !== option));
    } else {
      setSelectedLookingFor([...selectedLookingFor, option]);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(
      { email },
      {
        name,
        branch,
        year: Number(year),
        bio,
        skills: selectedSkills,
        lookingFor: selectedLookingFor
      }
    );
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <div
        className="glass"
        style={{
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: '800', marginBottom: '8px' }}>
            Join CampusBuddy
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: step >= 1 ? 'var(--accent-purple)' : 'var(--border)' }} />
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: step >= 2 ? 'var(--accent-purple)' : 'var(--border)' }} />
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: step >= 3 ? 'var(--accent-purple)' : 'var(--border)' }} />
          </div>
        </div>

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Full Name"
              placeholder="Aarav Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User size={16} />}
            />
            <Input
              label="College Email"
              type="email"
              placeholder="student@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={16} />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={16} />}
            />
            <Button variant="primary" onClick={handleNext} style={{ width: '100%', marginTop: '8px' }} rightIcon={<ArrowRight size={16} />}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                { value: '1', label: '1st Year (Freshman)' },
                { value: '2', label: '2nd Year (Sophomore)' },
                { value: '3', label: '3rd Year (Junior)' },
                { value: '4', label: '4th Year (Senior)' }
              ]}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Bio / Description</label>
              <textarea
                placeholder="Tell other students about yourself, what you are building, or what classes you enjoy..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <Button variant="secondary" onClick={handlePrev} style={{ flex: 1 }} leftIcon={<ArrowLeft size={16} />}>
                Back
              </Button>
              <Button variant="primary" onClick={handleNext} style={{ flex: 1.5 }} rightIcon={<ArrowRight size={16} />}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                Select Your Skills
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skillOptions.map((skill) => {
                  const selected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
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
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                What are you looking for?
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {lookingForOptions.map((opt) => {
                  const selected = selectedLookingFor.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleLookingFor(opt)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        border: `1px solid ${selected ? 'rgba(59, 130, 246, 0.4)' : 'var(--border)'}`,
                        backgroundColor: selected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.01)',
                        color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <Button variant="secondary" onClick={handlePrev} style={{ flex: 1 }} leftIcon={<ArrowLeft size={16} />}>
                Back
              </Button>
              <Button variant="primary" onClick={handleSubmit} style={{ flex: 1.5 }}>
                Submit Registration
              </Button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: 'var(--accent-purple)', fontWeight: '600', cursor: 'pointer' }}
          >
            Sign In
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};
