import React, { useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  spotlightColor?: string;
}

export const SpotlightButton: React.FC<SpotlightButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  spotlightColor,
  ...props
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const divRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Use Royal Blue spotlight in light mode, teal in dark mode
  const effectiveSpotlightColor = spotlightColor ?? (
    isLight ? 'rgba(66, 99, 235, 0.12)' : 'rgba(45, 212, 191, 0.15)'
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => setOpacity(1);
  const handleBlur = () => setOpacity(0);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const baseClasses = "relative rounded-full px-8 py-3 text-sm font-medium transition-transform active:scale-95 overflow-hidden group";

  const variantStyle = variant === 'primary'
    ? {
      backgroundColor: isLight ? '#ffffff' : '#18181b',
      color: isLight ? '#18181b' : '#ffffff',
      border: isLight ? '1px solid #d4d4d8' : '1px solid #3f3f46',
    }
    : {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
    };

  return (
    <button
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${className}`}
      style={variantStyle}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, ${effectiveSpotlightColor}, transparent 80%)`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{
            background: isLight
              ? 'linear-gradient(to right, rgba(66,99,235,0.15), rgba(66,99,235,0.08))'
              : 'linear-gradient(to right, rgba(45,212,191,0.2), rgba(34,211,238,0.2))',
          }}
        />
      )}
    </button>
  );
};