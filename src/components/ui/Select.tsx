import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  id,
  className = '',
  style,
  ...props
}) => {
  const selectId = id || 'select_' + Math.random().toString(36).substr(2, 9);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...style }} className={className}>
      {label && (
        <label
          htmlFor={selectId}
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
        <select
          id={selectId}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${error ? 'var(--accent-rose)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            paddingRight: '40px',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            transition: 'all var(--transition-fast)',
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            cursor: 'pointer'
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
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        {/* Dropdown arrow icon */}
        <div
          style={{
            position: 'absolute',
            right: '16px',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-muted)'
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
      {error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', fontWeight: '500' }}>
          {error}
        </span>
      )}
    </div>
  );
};
