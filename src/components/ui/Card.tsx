import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  padding = 'md',
  style,
  className = '',
  ...props
}) => {
  const getPadding = () => {
    switch (padding) {
      case 'none': return '0';
      case 'sm': return '12px';
      case 'md': return '20px';
      case 'lg': return '28px';
    }
  };

  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: 'var(--radius-md)',
    padding: getPadding(),
    transition: 'all var(--transition-normal)',
    boxShadow: 'var(--shadow-md)',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect) return;
    const el = e.currentTarget;
    el.style.transform = 'translateY(-2px)';
    el.style.borderColor = 'rgba(255, 255, 255, 0.12)';
    el.style.boxShadow = '0 12px 30px -10px rgba(124, 58, 237, 0.15)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'none';
    el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
    el.style.boxShadow = 'var(--shadow-md)';
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};
