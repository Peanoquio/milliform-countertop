import React, { createContext, useContext, useEffect } from 'react';
import config from '../config/siteConfig';

const ThemeContext = createContext();

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const ThemeProvider = ({ children }) => {
  const { theme, animationConfig, typography } = config;

  useEffect(() => {
    const root = document.documentElement;

    // Colour tokens → CSS custom properties (--primary, --accent, ...)
    Object.entries(theme.colors).forEach(([key, value]) =>
      root.style.setProperty(`--${key}`, value)
    );

    // Fonts
    root.style.setProperty('--font-heading', typography.fonts.heading);
    root.style.setProperty('--font-body', typography.fonts.body);
    root.style.setProperty('--font-accent', typography.fonts.accent);

    // Animation tokens
    const on = animationConfig.enabled;
    root.style.setProperty('--speed-fast', `${on ? animationConfig.speeds.fast : 0}ms`);
    root.style.setProperty('--speed-normal', `${on ? animationConfig.speeds.normal : 0}ms`);
    root.style.setProperty('--speed-slow', `${on ? animationConfig.speeds.slow : 0}ms`);
    root.style.setProperty('--transition-speed', `${on ? animationConfig.speeds.normal : 0}ms`);
    root.style.setProperty('--transition-easing', animationConfig.easing.default);
    root.style.setProperty(
      '--transition',
      on ? `all ${animationConfig.speeds.normal}ms ${animationConfig.easing.default}` : 'none'
    );

    // Body classes for stateful styling hooks
    document.body.classList.toggle('animations-enabled', on);
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme.name.toLowerCase()}`);
  }, [theme, animationConfig, typography]);

  return (
    <ThemeContext.Provider
      value={{ theme, animationConfig, typography, colors: theme.colors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
