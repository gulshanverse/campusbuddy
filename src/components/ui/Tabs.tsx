import React from 'react';

interface TabOption {
  id: string;
  label: string | React.ReactNode;
}

interface TabsProps {
  options: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'line' | 'pill';
  style?: React.CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({
  options,
  activeTab,
  onChange,
  variant = 'line',
  style
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: variant === 'line' ? '24px' : '8px',
        borderBottom: variant === 'line' ? '1px solid var(--border)' : 'none',
        paddingBottom: variant === 'line' ? '0' : '8px',
        width: '100%',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        ...style
      }}
    >
      {options.map((option) => {
        const isActive = option.id === activeTab;
        
        const tabStyle: React.CSSProperties = {
          padding: variant === 'line' ? '12px 4px' : '8px 16px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.92rem',
          transition: 'all var(--transition-fast)',
          whiteSpace: 'nowrap',
          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
          position: 'relative',
          borderRadius: variant === 'pill' ? 'var(--radius-md)' : '0',
          borderBottom: variant === 'line' && isActive ? '2px solid var(--accent-purple)' : '2px solid transparent',
          backgroundColor: variant === 'pill' && isActive ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
          border: variant === 'pill' ? `1px solid ${isActive ? 'rgba(124, 58, 237, 0.25)' : 'transparent'}` : 'none'
        };

        const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
          if (isActive) return;
          e.currentTarget.style.color = 'var(--text-primary)';
          if (variant === 'pill') {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
          }
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
          if (isActive) return;
          e.currentTarget.style.color = 'var(--text-secondary)';
          if (variant === 'pill') {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        };

        return (
          <div
            key={option.id}
            style={tabStyle}
            onClick={() => onChange(option.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};
