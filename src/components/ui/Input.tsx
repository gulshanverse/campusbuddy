import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  style,
  ...props
}) => {
  const inputId = id || 'input_' + Math.random().toString(36).substr(2, 9);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...style }} className={className}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            display: 'inline-flex'
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        {leftIcon && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
              pointerEvents: 'none'
            }}
          >
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${error ? 'var(--accent-rose)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            paddingLeft: leftIcon ? '40px' : '16px',
            paddingRight: rightIcon ? '40px' : '16px',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            transition: 'all var(--transition-fast)',
            outline: 'none'
          }}
          onFocus={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = 'var(--accent-purple)';
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--border-focus)';
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
          {...props}
        />
        {rightIcon && (
          <div
            style={{
              position: 'absolute',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)'
            }}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', fontWeight: '500' }}>
          {error}
        </span>
      )}
      {!error && helperText && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {helperText}
        </span>
      )}
    </div>
  );
};
