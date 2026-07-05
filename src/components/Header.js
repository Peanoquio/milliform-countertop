import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { siteInfo, navigation, images } from '../config/siteConfig';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="brand" aria-label={`${siteInfo.companyName} home`}>
          {images.logo ? (
            <img src={images.logo} alt={siteInfo.companyName} className="brand-logo" />
          ) : (
            <span className="brand-text">{siteInfo.companyName}</span>
          )}
        </Link>

        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          {navigation.mainMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.name}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>

        <button
          className={`burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && <div className="nav-scrim" onClick={() => setOpen(false)} />}
    </header>
  );
};

export default Header;
