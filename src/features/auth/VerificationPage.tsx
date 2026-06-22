import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck, Mail, FileText, Check, Info } from 'lucide-react';

export const VerificationPage: React.FC = () => {
  const { user, verifyUser } = useAuthStore();
  const { notifications } = useAppStore();
  const [emailStatus, setEmailStatus] = useState<'unverified' | 'sent' | 'verified'>(
    user?.isVerified ? 'verified' : 'unverified'
  );
  const [file, setFile] = useState<File | null>(null);
  const [idStatus, setIdStatus] = useState<'none' | 'uploading' | 'pending' | 'verified'>(
    user?.isVerified ? 'verified' : 'none'
  );

  const handleSendEmail = () => {
    setEmailStatus('sent');
    // Mock verification complete after 3 seconds
    setTimeout(() => {
      setEmailStatus('verified');
      if (idStatus === 'verified' || idStatus === 'pending') {
        verifyUser();
      }
      // Add notification
      notifications.unshift({
        id: 'n_v1_' + Date.now(),
        userId: user?.id || '',
        type: 'success',
        title: 'Email Verified',
        message: 'Your official college email has been verified successfully.',
        isRead: false,
        createdAt: new Date().toISOString()
      });
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIdStatus('uploading');
      
      setTimeout(() => {
        setIdStatus('pending');
        // Let's auto-verify in 4 seconds for a seamless demo!
        setTimeout(() => {
          setIdStatus('verified');
          verifyUser();
          
          notifications.unshift({
            id: 'n_v2_' + Date.now(),
            userId: user?.id || '',
            type: 'success',
            title: 'Identity Verified',
            message: 'Your Student ID has been verified! You now have the Verified Student Badge.',
            isRead: false,
            createdAt: new Date().toISOString()
          });
        }, 3000);
      }, 1500);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
          Student Verification
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Verify your student status to unlock trust points, badge markings, and access hackathon/club recruitments.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px' }} className="grid-cols-2">
        {/* Verification Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Step 1: Email */}
          <Card padding="lg" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{
              color: 'var(--accent-purple)',
              background: 'var(--accent-purple-glow)',
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Mail size={20} />
            </div>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                  1. College Email Verification
                </h3>
                {emailStatus === 'verified' ? (
                  <Badge variant="success" dot>Verified</Badge>
                ) : emailStatus === 'sent' ? (
                  <Badge variant="warning" dot>Email Sent</Badge>
                ) : (
                  <Badge variant="danger" dot>Unverified</Badge>
                )}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Verify ownership of your official university email domain (e.g., <code>student@college.edu</code>). 
                An activation link will be sent to your inbox.
              </p>
              
              {emailStatus === 'unverified' && (
                <Button variant="outline" size="sm" onClick={handleSendEmail} style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                  Send Verification Link
                </Button>
              )}
              {emailStatus === 'sent' && (
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: '600', marginTop: '4px' }}>
                  ⏳ Checking inbox... Link sent. Click active link simulation.
                </p>
              )}
              {emailStatus === 'verified' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: '600', marginTop: '6px' }}>
                  <Check size={14} /> Domain verified: {user?.email}
                </div>
              )}
            </div>
          </Card>

          {/* Step 2: Student ID Upload */}
          <Card padding="lg" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{
              color: 'var(--accent-blue)',
              background: 'var(--accent-blue-glow)',
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileText size={20} />
            </div>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                  2. Student ID Upload
                </h3>
                {idStatus === 'verified' ? (
                  <Badge variant="success" dot>Approved</Badge>
                ) : idStatus === 'pending' ? (
                  <Badge variant="warning" dot>Pending Review</Badge>
                ) : idStatus === 'uploading' ? (
                  <Badge variant="info">Uploading...</Badge>
                ) : (
                  <Badge variant="danger" dot>Missing ID</Badge>
                )}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Upload a clear image of your active student ID card (front side). 
                Our administrators will verify the name, branch, and validity year.
              </p>

              {idStatus === 'none' && (
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="file"
                    id="id-file-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="id-file-upload">
                    <Button variant="outline" size="sm" as="span" style={{ alignSelf: 'flex-start' }}>
                      Select ID Card Image
                    </Button>
                  </label>
                </div>
              )}
              {idStatus === 'pending' && (
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: '600', marginTop: '4px' }}>
                  ⏳ ID pending manual admin review. (Auto-approving in seconds for demonstration...)
                </p>
              )}
              {idStatus === 'verified' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: '600', marginTop: '6px' }}>
                  <Check size={14} /> Student ID confirmed by administrator.
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Verification Status Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Trust points card */}
          <Card padding="md" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
              Trust Metrics
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: user?.isVerified ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                {user?.trustScore}%
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600' }}>Trust Score</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Score increases upon active verifications</span>
              </div>
            </div>

            <div style={{ borderBottom: '1px solid var(--border)', width: '100%' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Email Domain Check</span>
                <span style={{ fontWeight: '600', color: emailStatus === 'verified' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                  {emailStatus === 'verified' ? '+25%' : '+0%'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Student ID Match</span>
                <span style={{ fontWeight: '600', color: idStatus === 'verified' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                  {idStatus === 'verified' ? '+74%' : '+0%'}
                </span>
              </div>
            </div>
          </Card>

          {/* Guidelines Box */}
          <Card padding="md" style={{ display: 'flex', gap: '12px', background: 'rgba(59, 130, 246, 0.03)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
            <div style={{ color: 'var(--accent-blue)', marginTop: '2px' }}><Info size={16} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>Why Verify?</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Verified students receive a blue checkmark badge on their profiles. Study groups and hackathon leaders can filter applicants to only allow verified students to join.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
