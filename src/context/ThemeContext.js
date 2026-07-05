import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window === 'undefined') return 'darkNight';
    const stored = localStorage.getItem('milliform-theme');
    return stored || 'darkNight';
  });

  useEffect(() => {
    localStorage.setItem('milliform-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => {
      if (prev === 'light') return 'darkNight';
      return 'light';
    });
  };

  const setTheme = (theme) => {
    if (['light', 'darkNight'].includes(theme)) {
      setCurrentTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
