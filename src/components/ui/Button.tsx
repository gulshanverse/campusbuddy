import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-fast)',
    gap: '8px',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    whiteSpace: 'nowrap'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--gradient-primary)',
          color: 'var(--text-primary)',
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
          border: 'none'
        };
      case 'secondary':
        return {
          background: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)'
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-hover)'
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: 'none'
        };
      case 'danger':
        return {
          background: 'rgba(244, 63, 94, 0.15)',
          color: 'var(--accent-rose)',
          border: '1px solid rgba(244, 63, 94, 0.3)'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '6px 12px', fontSize: '0.85rem' };
      case 'md':
        return { padding: '10px 18px', fontSize: '0.95rem' };
      case 'lg':
        return { padding: '14px 24px', fontSize: '1.05rem' };
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    const el = e.currentTarget;
    if (variant === 'primary') {
      el.style.transform = 'translateY(-1px)';
      el.style.boxShadow = '0 6px 18px rgba(124, 58, 237, 0.35)';
    } else if (variant === 'secondary' || variant === 'outline') {
      el.style.background = 'rgba(255, 255, 255, 0.05)';
      el.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    } else if (variant === 'ghost') {
      el.style.background = 'rgba(255, 255, 255, 0.03)';
      el.style.color = 'var(--text-primary)';
    } else if (variant === 'danger') {
      el.style.background = 'rgba(244, 63, 94, 0.25)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'none';
    const variantStyles = getVariantStyles();
    el.style.background = variantStyles.background;
    el.style.color = variantStyles.color;
    el.style.border = variantStyles.border;
    el.style.boxShadow = variantStyles.boxShadow || 'none';
  };

  const styles = {
    ...baseStyle,
    ...getVariantStyles(),
    ...getSizeStyles()
  };

  return (
    <button
      style={styles}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {loading && (
        <svg
          style={{
            animation: 'spin 1s linear infinite',
            width: '16px',
            height: '16px'
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            style={{ opacity: 0.25 }}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            style={{ opacity: 0.75 }}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </svg>
      )}
      {!loading && leftIcon && <span style={{ display: 'inline-flex' }}>{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span style={{ display: 'inline-flex' }}>{rightIcon}</span>}
    </button>
  );
};
