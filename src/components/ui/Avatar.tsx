import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away';
  isVerified?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = '?',
  size = 'md',
  status,
  isVerified = false,
  className = '',
  style
}) => {
  const [error, setError] = useState(false);

  const getDimensions = () => {
    switch (size) {
      case 'sm': return { width: '32px', height: '32px', font: '0.85rem' };
      case 'md': return { width: '42px', height: '42px', font: '1rem' };
      case 'lg': return { width: '56px', height: '56px', font: '1.25rem' };
      case 'xl': return { width: '80px', height: '80px', font: '1.75rem' };
    }
  };

  const dims = getDimensions();
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: '50%',
    width: dims.width,
    height: dims.height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--border) 100%)',
    border: '1.5px solid var(--border)',
    overflow: 'visible',
    flexShrink: 0,
    ...style
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'var(--accent-emerald)';
      case 'offline': return 'var(--text-muted)';
      case 'away': return 'var(--accent-amber)';
    }
  };

  return (
    <div style={containerStyle} className={className}>
      {!error && src ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <span
          style={{
            fontWeight: '600',
            color: 'var(--text-secondary)',
            fontSize: dims.font
          }}
        >
          {initials}
        </span>
      )}

      {status && (
        <span
          style={{
            position: 'absolute',
            bottom: size === 'sm' ? '-1px' : '2px',
            right: size === 'sm' ? '-1px' : '2px',
            width: size === 'sm' ? '8px' : '12px',
            height: size === 'sm' ? '8px' : '12px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
            border: '2px solid var(--bg-secondary)',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        />
      )}

      {isVerified && (
        <div
          title="Verified Student"
          style={{
            position: 'absolute',
            top: size === 'sm' ? '-3px' : '-1px',
            right: size === 'sm' ? '-3px' : '-1px',
            background: 'var(--accent-blue)',
            color: '#fff',
            borderRadius: '50%',
            width: size === 'sm' ? '12px' : '16px',
            height: size === 'sm' ? '12px' : '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size === 'sm' ? '7px' : '9px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            border: '1.5px solid var(--bg-secondary)'
          }}
        >
          ✓
        </div>
      )}
    </div>
  );
};
