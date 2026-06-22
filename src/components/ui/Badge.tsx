import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'verified';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  dot = false,
  style,
  className = '',
  ...props
}) => {
  const getColors = () => {
    switch (variant) {
      case 'default':
        return {
          bg: 'rgba(255, 255, 255, 0.05)',
          color: 'var(--text-secondary)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        };
      case 'success':
        return {
          bg: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--accent-emerald)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        };
      case 'warning':
        return {
          bg: 'rgba(245, 158, 11, 0.1)',
          color: 'var(--accent-amber)',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        };
      case 'danger':
        return {
          bg: 'rgba(244, 63, 94, 0.1)',
          color: 'var(--accent-rose)',
          border: '1px solid rgba(244, 63, 94, 0.2)'
        };
      case 'info':
        return {
          bg: 'rgba(59, 130, 246, 0.1)',
          color: 'var(--accent-blue)',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        };
      case 'verified':
        return {
          bg: 'rgba(99, 102, 241, 0.15)',
          color: 'hsl(226, 96%, 67%)',
          border: '1px solid rgba(99, 102, 241, 0.25)'
        };
    }
  };

  const colors = getColors();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        borderRadius: '50px',
        fontSize: '0.78rem',
        fontWeight: '600',
        backgroundColor: colors.bg,
        color: colors.color,
        border: colors.border,
        whiteSpace: 'nowrap',
        ...style
      }}
      className={className}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: colors.color
          }}
        />
      )}
      {children}
    </span>
  );
};
