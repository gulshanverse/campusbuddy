import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs } from '../../components/ui/Tabs';
import { Input } from '../../components/ui/Input';
import {
  Users,
  Calendar,
  Compass,
  ShieldAlert,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    profiles,
    clubs,
    events,
    reports,
    studyGroups,
    teams,
    suspendStudent,
    resolveReport,
    deleteEvent,
    deleteClub
  } = useAppStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [userSearch, setUserSearch] = useState('');
  const [reportSearch, setReportSearch] = useState('');

  // Guard: only admin
  if (!user || user.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <ShieldAlert size={48} style={{ color: 'var(--accent-rose)', marginBottom: '16px' }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>
          Unauthorized Access
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          This area is restricted to platform administrators.
        </p>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const tabOptions = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: `Students (${profiles.length})` },
    { id: 'events', label: `Events (${events.length})` },
    { id: 'clubs', label: `Clubs (${clubs.length})` },
    { id: 'reports', label: `Reports (${reports.length})` }
  ];

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      p.branch.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredReports = reports.filter(
    (r) =>
      r.reason.toLowerCase().includes(reportSearch.toLowerCase()) ||
      r.description.toLowerCase().includes(reportSearch.toLowerCase())
  );

  const pendingReports = reports.filter((r) => r.status === 'pending');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
          Admin Control Panel
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage users, moderate reports, and monitor platform statistics.
        </p>
      </div>

      <Tabs options={tabOptions} activeTab={activeTab} onChange={setActiveTab} />

      {/* =========== OVERVIEW TAB =========== */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="grid-cols-4">
            {[
              { icon: <Users size={20} />, label: 'Total Students', value: profiles.length, color: 'var(--accent-purple)', bg: 'var(--accent-purple-glow)' },
              { icon: <Compass size={20} />, label: 'Active Clubs', value: clubs.length, color: 'var(--accent-blue)', bg: 'var(--accent-blue-glow)' },
              { icon: <Calendar size={20} />, label: 'Upcoming Events', value: events.length, color: 'var(--accent-emerald)', bg: 'rgba(16, 185, 129, 0.1)' },
              { icon: <ShieldAlert size={20} />, label: 'Pending Reports', value: pendingReports.length, color: 'var(--accent-rose)', bg: 'rgba(244, 63, 94, 0.1)' }
            ].map((stat, idx) => (
              <Card key={idx} padding="md" hoverEffect={false} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: stat.bg, color: stat.color, width: '46px', height: '46px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {stat.icon}
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '1.6rem', fontWeight: '800', lineHeight: '1.2' }}>{stat.value}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{stat.label}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="grid-cols-2">
            <Card padding="md" hoverEffect={false}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
                Platform Summary
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Study Groups', value: studyGroups.length },
                  { label: 'Hackathon Teams', value: teams.length },
                  { label: 'Total Reports Filed', value: reports.length },
                  { label: 'Resolved Reports', value: reports.filter(r => r.status !== 'pending').length }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', padding: '8px 0', borderBottom: idx < 3 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span style={{ fontWeight: '700' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="md" hoverEffect={false}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
                Recent Reports
              </h3>
              {pendingReports.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No pending reports. Platform is healthy! ✅</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pendingReports.slice(0, 3).map((r) => {
                    const reporter = profiles.find(p => p.userId === r.reporterId);
                    return (
                      <div key={r.id} className="glass" style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{r.reason}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                            By {reporter?.name || 'Unknown'} • {new Date(r.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge variant="warning">Pending</Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* =========== USERS TAB =========== */}
      {activeTab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            placeholder="Search students by name or branch..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            leftIcon={<Search size={16} />}
            style={{ maxWidth: '400px' }}
          />

          <Card padding="none" hoverEffect={false}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Student', 'Branch', 'Year', 'Skills', 'Status', 'Actions'].map((h) => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProfiles.map((p) => (
                    <tr key={p.userId} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar src={p.avatar} name={p.name} size="sm" isVerified={true} />
                          <span style={{ fontWeight: '600' }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{p.branch}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Year {p.year}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {p.skills.slice(0, 3).map((s) => (
                            <span key={s} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '1px 6px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge variant="success" style={{ fontSize: '0.7rem' }}>Verified</Badge>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <Button variant="ghost" size="sm" style={{ padding: '4px' }} onClick={() => navigate(`/profile/${p.userId}`)}>
                            <Eye size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" style={{ padding: '4px', color: 'var(--accent-rose)' }} onClick={() => {
                            if (confirm(`Remove ${p.name} from the platform?`)) {
                              suspendStudent(p.userId);
                            }
                          }}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* =========== EVENTS TAB =========== */}
      {activeTab === 'events' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card padding="none" hoverEffect={false}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Event', 'Category', 'Date', 'Venue', 'Registered', 'Actions'].map((h) => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600' }}>{ev.title}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge variant="info" style={{ textTransform: 'capitalize', fontSize: '0.7rem' }}>{ev.category}</Badge>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{new Date(ev.date).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{ev.venue}</td>
                      <td style={{ padding: '12px 16px' }}>{ev.registeredIds.length} / {ev.maxCapacity}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <Button variant="ghost" size="sm" style={{ padding: '4px', color: 'var(--accent-rose)' }} onClick={() => {
                          if (confirm(`Delete event "${ev.title}"?`)) {
                            deleteEvent(ev.id);
                          }
                        }}>
                          <Trash2 size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* =========== CLUBS TAB =========== */}
      {activeTab === 'clubs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card padding="none" hoverEffect={false}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Club', 'Category', 'Members', 'Recruiting', 'Actions'].map((h) => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clubs.map((club) => (
                    <tr key={club.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.2rem' }}>{club.logo}</span>
                          <span style={{ fontWeight: '600' }}>{club.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge variant="default" style={{ textTransform: 'capitalize', fontSize: '0.7rem' }}>{club.category}</Badge>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{club.memberIds.length}</td>
                      <td style={{ padding: '12px 16px' }}>
                        {club.isRecruiting ? <Badge variant="success" style={{ fontSize: '0.7rem' }}>Yes</Badge> : <Badge variant="danger" style={{ fontSize: '0.7rem' }}>No</Badge>}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Button variant="ghost" size="sm" style={{ padding: '4px', color: 'var(--accent-rose)' }} onClick={() => {
                          if (confirm(`Delete club "${club.name}"?`)) {
                            deleteClub(club.id);
                          }
                        }}>
                          <Trash2 size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* =========== REPORTS TAB =========== */}
      {activeTab === 'reports' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            placeholder="Search reports by reason..."
            value={reportSearch}
            onChange={(e) => setReportSearch(e.target.value)}
            leftIcon={<Search size={16} />}
            style={{ maxWidth: '400px' }}
          />

          {filteredReports.length === 0 ? (
            <Card padding="lg" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              No moderation reports found.
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredReports.map((r) => {
                const reporter = profiles.find(p => p.userId === r.reporterId);
                const target = profiles.find(p => p.userId === r.targetId);

                return (
                  <Card key={r.id} padding="md" hoverEffect={false}>
                    <div className="flex-between" style={{ marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Report #{r.id.substring(0, 8)} • {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                        <h4 style={{ fontWeight: '700', fontSize: '1.05rem', marginTop: '2px' }}>{r.reason}</h4>
                      </div>
                      <Badge variant={r.status === 'pending' ? 'warning' : r.status === 'resolved' ? 'success' : 'default'} style={{ textTransform: 'capitalize' }}>
                        {r.status}
                      </Badge>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
                      {r.description || 'No additional details provided.'}
                    </p>

                    <div style={{ display: 'flex', gap: '24px', fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                      <span>Reporter: <strong style={{ color: 'var(--text-primary)' }}>{reporter?.name || 'Unknown'}</strong></span>
                      <span>Target: <strong style={{ color: 'var(--text-primary)' }}>{target?.name || r.targetId}</strong> ({r.targetType})</span>
                    </div>

                    {r.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                        <Button variant="primary" size="sm" onClick={() => resolveReport(r.id, 'resolved')} leftIcon={<CheckCircle size={14} />}>
                          Resolve & Act
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => resolveReport(r.id, 'dismissed')} leftIcon={<XCircle size={14} />}>
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
