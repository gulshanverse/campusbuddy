import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { 
  Users, 
  Terminal, 
  Compass, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  const modules = [
    { icon: <ShieldCheck size={24} />, title: 'Student Verification', desc: 'Secure verification using your official college email and student ID for a trusted community.' },
    { icon: <Compass size={24} />, title: 'Smart Profiles', desc: 'Detail your branch, year, skills, interests, tech stack, and career goals in one premium resume-ready profile.' },
    { icon: <BookOpen size={24} />, title: 'Study Buddy Finder', desc: 'Search and connect with study partners or create study groups based on subject topics and availability.' },
    { icon: <Terminal size={24} />, title: 'Hackathon Partner Finder', desc: 'Form or join teams for hackathons, filtering partners by roles: Frontend, Backend, UI/UX, AI/ML.' },
    { icon: <Users size={24} />, title: 'Club Ecosystem', desc: 'Explore club profiles, track their updates, and apply directly to join their leadership teams.' },
    { icon: <Calendar size={24} />, title: 'Campus Events', desc: 'Discover cultural and technical events, sign up for workshops, and track schedules.' },
    { icon: <MessageSquare size={24} />, title: 'Real-Time Chat', desc: 'Direct message connection, team channels, and study group group chats in a Discord-style layout.' },
    { icon: <Brain size={24} />, title: 'AI Matching Engine', desc: 'Smart matches suggesting study partners, mentors, and hackathon teams matching your skill profile.' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      {/* Top Header */}
      <header
        className="glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              background: 'var(--gradient-primary)',
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.25rem',
              color: '#fff'
            }}
          >
            C
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
            Campus<span className="gradient-text">Buddy</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/login')}>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '80px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Glow rings */}
        <div style={{
          position: 'absolute',
          top: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, var(--accent-purple-glow) 0%, transparent 60%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div className="container animate-slide-up" style={{ zIndex: 1, position: 'relative' }}>
          <Badge variant="verified" style={{ marginBottom: '24px' }}>
            <TrendingUp size={12} /> Launching for engineering campuses
          </Badge>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4rem',
              fontWeight: '800',
              lineHeight: '1.15',
              maxWidth: '850px',
              margin: '0 auto 24px',
              letterSpacing: '-1.5px'
            }}
          >
            The Operating System for <span className="gradient-text">College Life</span>.
          </h1>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 36px',
              lineHeight: '1.6'
            }}
          >
            Stop guessing. Meet the right study partners, project teammates, clubs, events, and mentors on your campus. Fully verified and strictly professional.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Button variant="primary" size="lg" onClick={handleStart} rightIcon={<ArrowRight size={18} />}>
              Enter CampusBuddy
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('problem')?.scrollIntoView()}>
              Explore Modules
            </Button>
          </div>
        </div>
      </section>

      {/* Core Problem Statement */}
      <section
        id="problem"
        style={{
          padding: '80px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-secondary)'
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--accent-purple)', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '12px' }}>
            The Core Problem
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: '800',
              maxWidth: '750px',
              marginBottom: '20px',
              letterSpacing: '-0.8px'
            }}
          >
            "Opportunities exist on campus, but we don't know the right people."
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', lineHeight: '1.7' }}>
            College groups are siloed in fragmented WhatsApp chats, inactive Discord servers, and unverified social media profiles. 
            CampusBuddy acts as the centralized directory and bridge that connects students directly based on skills, schedule compatibility, and shared career goals.
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--accent-blue)', fontWeight: '700', letterSpacing: '1.5px', display: 'block', marginBottom: '12px' }}>
              Product Ecosystem
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.8px' }}>
              Everything you need, in one place.
            </h2>
          </div>

          <div className="grid-cols-4">
            {modules.map((mod, idx) => (
              <Card key={idx} padding="md" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  color: 'var(--accent-purple)',
                  background: 'var(--accent-purple-glow)',
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {mod.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  {mod.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', flexGrow: 1 }}>
                  {mod.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Trust Metrics */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '40px', textAlign: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '3rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-display)' }}>1,400+</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Active Campus Students</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '3rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-display)' }}>420+</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Study Groups Created</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '3rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-display)' }}>85+</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Hackathon Teams Formed</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '3rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-display)' }}>100%</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Verified .edu Registration</span>
          </div>
        </div>
      </section>

      {/* Premium Call to Action */}
      <section style={{ padding: '120px 0', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--accent-blue-glow) 0%, transparent 60%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />
        
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              fontWeight: '800',
              maxWidth: '800px',
              marginBottom: '20px',
              letterSpacing: '-1px'
            }}
          >
            Ready to build your <span className="gradient-text">campus network</span>?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '500px', marginBottom: '36px', lineHeight: '1.6' }}>
            Create your account in 2 minutes using your college email and start finding teammates.
          </p>
          <Button variant="primary" size="lg" onClick={handleStart}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
        <div className="container flex-between" style={{ flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--gradient-primary)', width: '24px', height: '24px', borderRadius: '4px', flexShrink: 0 }} />
            <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>CampusBuddy</span>
          </div>
          <span style={{ fontSize: '0.85rem' }}>© 2026 CampusBuddy. All rights reserved. Build for engineering excellence.</span>
        </div>
      </footer>
    </div>
  );
};
