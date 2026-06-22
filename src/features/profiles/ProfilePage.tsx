import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs } from '../../components/ui/Tabs';
import { ReportModal } from '../../components/shared/ReportModal';
import { 
  ShieldCheck, 
  MapPin, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Award, 
  Code,
  MessageSquare,
  AlertTriangle,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user: currentUser, profile: currentProfile } = useAuthStore();
  const { profiles, blockUser } = useAppStore();
  const [activeTab, setActiveTab] = useState('about');
  const [isReportOpen, setIsReportOpen] = useState(false);

  // For testing/preview: let's fetch profile based on query hash (e.g. #/profile?id=u2)
  const hash = window.location.hash;
  const queryParams = new URLSearchParams(hash.split('?')[1]);
  const queryId = queryParams.get('id');

  const profileUser = queryId 
    ? (profiles.find(p => p.userId === queryId) || currentProfile) 
    : currentProfile;

  if (!profileUser) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Profile not found</h2>
        <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </div>
    );
  }

  const isSelf = profileUser.userId === currentProfile?.userId;

  const tabOptions = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills & Goals' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' }
  ];

  const handleBlock = () => {
    if (currentUser && profileUser) {
      blockUser(currentUser.id, profileUser.userId);
      alert(`${profileUser.name} has been blocked. You will no longer see their posts or receive messages.`);
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Profile Header Card */}
      <Card padding="none" style={{ overflow: 'hidden' }}>
        {/* Banner */}
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)',
          opacity: 0.8
        }} />
        
        {/* Profile Info Overlay */}
        <div style={{ padding: '0 24px 24px', marginTop: '-48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
            <Avatar src={profileUser.avatar} name={profileUser.name} size="xl" isVerified={true} style={{ border: '4px solid var(--bg-secondary)', backgroundColor: 'var(--bg-tertiary)' }} />
            <div style={{ paddingBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                  {profileUser.name}
                </h1>
                <Badge variant="verified">Verified Student</Badge>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <BookOpen size={16} /> {profileUser.branch} • Year {profileUser.year}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <MapPin size={16} /> Engineering Institute of Tech
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', paddingBottom: '8px' }}>
            {isSelf ? (
              <Button variant="secondary" onClick={() => navigate('/profile/edit')} leftIcon={<Settings size={16} />}>
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="primary" onClick={() => navigate('/chat')} leftIcon={<MessageSquare size={16} />}>
                  Send Message
                </Button>
                <Button variant="ghost" onClick={() => setIsReportOpen(true)} style={{ color: 'var(--text-muted)' }}>
                  <AlertTriangle size={18} />
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Main split details grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px' }} className="grid-cols-2">
        {/* Left tabs container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card padding="md" hoverEffect={false}>
            <Tabs options={tabOptions} activeTab={activeTab} onChange={setActiveTab} />
            
            <div style={{ marginTop: '20px' }}>
              {activeTab === 'about' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Bio</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {profileUser.bio || "No bio added yet."}
                    </p>
                  </div>
                  
                  {profileUser.lookingFor.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Looking For</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {profileUser.lookingFor.map((lf) => (
                          <Badge key={lf} variant="info">{lf}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Skills & Expertise</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {profileUser.skills.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No skills listed.</p>
                      ) : (
                        profileUser.skills.map((skill) => (
                          <Badge key={skill} variant="default">{skill}</Badge>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Technology Stack</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {profileUser.techStack.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No tech stack details.</p>
                      ) : (
                        profileUser.techStack.map((tech) => (
                          <Badge key={tech} variant="verified">{tech}</Badge>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Career Goals</h3>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                      {profileUser.careerGoals.map((g, idx) => (
                        <li key={idx} style={{ marginBottom: '6px' }}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {profileUser.projects.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No projects listed yet.</p>
                  ) : (
                    profileUser.projects.map((proj, idx) => (
                      <div key={idx} style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.01)' }}>
                        <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>{proj.title}</h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '8px 0' }}>{proj.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {proj.techStack.map((t) => (
                            <span key={t} style={{ fontSize: '0.72rem', color: 'var(--accent-purple)', background: 'var(--accent-purple-glow)', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'achievements' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {profileUser.achievements.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No achievements listed yet.</p>
                  ) : (
                    profileUser.achievements.map((ach, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ color: 'var(--accent-amber)', marginTop: '4px' }}><Award size={18} /></div>
                        <div>
                          <h4 style={{ fontWeight: '700', fontSize: '0.95rem' }}>{ach.title}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ach.issuer} • {ach.date}</span>
                          {ach.description && <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{ach.description}</p>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right availability and trust scores panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Trust points card */}
          <Card padding="md" hoverEffect={false}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Verification Metrics
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--accent-emerald)' }}>
                98%
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600' }}>Trust Index Score</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>High community standing</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>DMs Blocked</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>0 Users</span>
              </div>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Violations Reported</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>None</span>
              </div>
            </div>
          </Card>

          {/* Availability schedule */}
          <Card padding="md" hoverEffect={false}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Weekly Availability
            </h3>
            
            {profileUser.availability.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No availability slots declared.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {profileUser.availability.map((av, idx) => (
                  <div key={idx} className="glass" style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span style={{ fontWeight: '600' }}>{av.day}</span>
                    <span style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>{av.time}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Safety Settings block option */}
          {!isSelf && (
            <Card padding="md" style={{ border: '1px solid rgba(244, 63, 94, 0.1)', background: 'rgba(244, 63, 94, 0.01)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-rose)', marginBottom: '8px' }}>
                Privacy & Safety
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
                If this user is harassing you, violating community guidelines, or using the platform for non-professional romantic matching, please block them or submit a report.
              </p>
              <Button variant="danger" size="sm" onClick={handleBlock} style={{ width: '100%' }}>
                Block Student
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Trust & Safety Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetId={profileUser.userId}
        targetType="user"
        targetName={profileUser.name}
      />
    </div>
  );
};
