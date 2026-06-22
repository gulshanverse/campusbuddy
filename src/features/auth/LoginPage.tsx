import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email);
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  const handleQuickLogin = (mockEmail: string) => {
    login(mockEmail);
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
            Welcome Back
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Sign in to access your campus dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="College Email"
            type="email"
            placeholder="student@college.edu"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            leftIcon={<Mail size={16} />}
            error={error}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
          />

          <Button type="submit" variant="primary" loading={loading} style={{ width: '100%', marginTop: '8px' }}>
            Sign In
          </Button>
        </form>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
          <span style={{ position: 'absolute', background: 'var(--bg-secondary)', padding: '0 10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            OR QUICK LOGIN FOR PREVIEW
          </span>
          <div style={{ borderBottom: '1px solid var(--border)', width: '100%' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button variant="secondary" size="sm" onClick={() => handleQuickLogin('aarav.sharma@college.edu')}>
            Aarav Sharma (Student - CS 3rd Yr)
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleQuickLogin('kabir.verma@college.edu')}>
            Kabir Verma (Club Leader - Coding Club)
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleQuickLogin('admin@college.edu')}>
            Administrator Panel Access
          </Button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: 'var(--accent-purple)', fontWeight: '600', cursor: 'pointer' }}
          >
            Create one
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};
