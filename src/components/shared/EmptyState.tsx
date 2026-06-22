import React from 'react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  style
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--border)',
        background: 'rgba(255, 255, 255, 0.01)',
        minHeight: '240px',
        ...style
      }}
    >
      {icon ? (
        <div style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--text-muted)' }}>
          {icon}
        </div>
      ) : (
        <div style={{ marginBottom: '16px', color: 'var(--accent-purple)', opacity: 0.8 }}>
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
      )}
      <h4
        style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '8px',
          fontFamily: 'var(--font-display)'
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          maxWidth: '380px',
          marginBottom: '20px',
          lineHeight: '1.5'
        }}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
