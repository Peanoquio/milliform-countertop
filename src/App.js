import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

// Base path resolves automatically per host:
//   • Cloudflare root / custom domain → PUBLIC_URL = '' → basename '/'
//   • GitHub Pages subpath           → build with PUBLIC_URL=/milliform-countertop
const basename = process.env.PUBLIC_URL || '/';

function App() {
  return (
    <ThemeProvider>
      <Router basename={basename}>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
