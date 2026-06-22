import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'user' | 'message' | 'club' | 'event';
  targetName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetName
}) => {
  const { user } = useAuthStore();
  const { reportEntity } = useAppStore();
  const [reason, setReason] = useState('Spam or Solicitation');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!user) return;
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      reportEntity({
        reporterId: user.id,
        targetId,
        targetType,
        reason,
        description
      });
      setLoading(false);
      onClose();
      // Show success alert or similar
      alert('Thank you for reporting. Our moderators will review this content shortly.');
    }, 800);
  };

  const reasonOptions = [
    { value: 'Spam or Solicitation', label: 'Spam or Solicitation' },
    { value: 'Harassment or Bullying', label: 'Harassment or Bullying' },
    { value: 'Dating / Romantic Intentions', label: 'Dating / Romantic Intentions (Not Allowed)' },
    { value: 'Hate Speech / Discriminatory', label: 'Hate Speech / Discriminatory' },
    { value: 'Inappropriate Content', label: 'Inappropriate Content' },
    { value: 'Other', label: 'Other Reason' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Report ${targetType === 'user' ? 'Student' : targetType}`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit} loading={loading}>
            Submit Report
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          You are reporting <strong style={{ color: 'var(--text-primary)' }}>{targetName}</strong>. 
          Please specify the reason below. CampusBuddy maintains a strictly professional environment — dating, romantic, or anonymous harassment are forbidden.
        </p>
        
        <Select
          label="Reason for Report"
          options={reasonOptions}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            Additional Details (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide any relevant details, links, or timestamps..."
            style={{
              width: '100%',
              minHeight: '100px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              outline: 'none',
              resize: 'vertical',
              transition: 'all var(--transition-fast)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-purple)';
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--border-focus)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
