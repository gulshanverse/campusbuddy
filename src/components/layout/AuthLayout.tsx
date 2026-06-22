import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        background: 'var(--bg-primary)',
        overflow: 'hidden'
      }}
    >
      {/* Left visual panel - Hidden on smaller screens */}
      <div
        style={{
          flex: 1.2,
          background: 'linear-gradient(225deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="auth-left-panel"
      >
        {/* Top Branding logo */}
        <div 
          onClick={() => navigate('/')} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div
            style={{
              background: 'var(--gradient-primary)',
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1rem',
              color: '#fff'
            }}
          >
            C
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.5px' }}>
            Campus<span className="gradient-text">Buddy</span>
          </span>
        </div>

        {/* Center Tagline */}
        <div style={{ maxWidth: '440px', zIndex: 2 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '20px',
              letterSpacing: '-1px'
            }}
          >
            The Operating System for <span className="gradient-text">College Life</span>.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Discover projects, events, clubs, study partners, hackathon teams, mentors, and build verified connections within your university.
          </p>
        </div>

        {/* Bottom footer tips/stats */}
        <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid var(--border)', paddingTop: '24px', zIndex: 2 }}>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>100%</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Verified Profiles</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>0%</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dating Clutter</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>8+ Modules</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fully Integrated</span>
          </div>
        </div>

        {/* Backdrop visual elements */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--accent-purple-glow) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--accent-blue-glow) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Right form panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative'
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {children}
        </div>
      </div>

      {/* Responsive Styles Injection */}
      <style>{`
        @media (max-width: 820px) {
          .auth-left-panel {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
