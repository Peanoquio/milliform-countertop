import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './AmbientBackground.css';

const AmbientBackground = ({ enabled = true }) => {
  const { colors } = useTheme();

  if (!enabled) return null;

  return (
    <div
      className="ambient-background"
      aria-hidden="true"
      style={{
        '--accent-color': colors?.accent || '#878787',
        '--secondary-color': colors?.secondary || '#8b8680',
      }}
    >
      {/* Animated gradient orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Gradient backdrop */}
      <div className="ambient-gradient" />
    </div>
  );
};

export default AmbientBackground;
