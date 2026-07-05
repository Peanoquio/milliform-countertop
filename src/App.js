import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import { animationConfig, getTheme } from './config/siteConfig';
import './App.css';

const basename = process.env.PUBLIC_URL || '/';

const AppContent = () => {
  const { currentTheme } = useTheme();

  useEffect(() => {
    const themeObj = getTheme(currentTheme);
    const root = document.documentElement;

    Object.entries(themeObj.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    if (themeObj.fonts) {
      Object.entries(themeObj.fonts).forEach(([key, value]) => {
        root.style.setProperty(`--font-${key}`, value);
      });
    }
  }, [currentTheme]);

  useEffect(() => {
    if (animationConfig.enabled) {
      document.body.classList.add('animations-enabled');
    } else {
      document.body.classList.remove('animations-enabled');
    }
  }, []);

  return (
    <Router basename={basename}>
      <AmbientBackground enabled={animationConfig.enabled && animationConfig.ambientAnimation} />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
