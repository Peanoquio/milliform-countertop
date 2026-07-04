import React from 'react';
import { Link } from 'react-router-dom';
import { siteInfo, contactInfo, navigation } from '../config/siteConfig';
import './Footer.css';

const year = 2026; // bump as needed; kept static to avoid runtime Date dependence

const SocialIcon = ({ name }) => {
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.428-.659 1.19-1.598 2.895-1.598 2.117 0 3.704 1.385 3.704 4.362v5.589zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.706 0-.954.77-1.706 1.954-1.706 1.185 0 1.915.752 1.94 1.706 0 .948-.755 1.706-1.979 1.706zm1.585 11.019H3.516V9.724h3.406v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48C18.25 1.23 15.31 0 12 0 5.48 0 .16 5.32.16 11.84c0 2.09.54 4.13 1.57 5.93L.27 24l6.37-2.06c1.73.95 3.69 1.45 5.73 1.45 6.52 0 11.84-5.32 11.84-11.84 0-3.15-1.23-6.11-3.48-8.37zM12 21.77c-1.74 0-3.43-.45-4.93-1.3l-.35-.21-3.64 1.18 1.2-3.6-.22-.36c-.98-1.57-1.5-3.38-1.5-5.25 0-5.41 4.4-9.81 9.81-9.81 2.62 0 5.08 1.02 6.93 2.87 1.85 1.85 2.87 4.31 2.87 6.93 0 5.41-4.4 9.81-9.81 9.81zm5.37-7.37c-.29-.15-1.73-.86-2-.95-.27-.1-.47-.15-.67.15-.2.29-.77.95-.94 1.15-.17.19-.35.21-.64.07-.29-.15-.99-.37-1.88-.97-.7-.6-1.17-1.35-1.31-1.64-.14-.29-.02-.44.1-.58.1-.1.23-.25.34-.38.12-.13.15-.22.23-.37.08-.14.04-.27-.02-.38-.06-.11-.67-1.59-.92-2.18-.24-.59-.48-.51-.67-.52-.17-.01-.36-.01-.56-.01-.2 0-.51.07-.78.36-.27.29-1.02.99-1.02 2.42 0 1.43 1.04 2.81 1.19 3 .14.18 2.06 3.14 4.98 4.39.71.3 1.26.48 1.69.61.71.23 1.35.2 1.86.12.57-.08 1.75-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.08-.13-.27-.2-.56-.34z" />
      </svg>
    ),
  };

  return icons[name] || null;
};

const Footer = () => {
  const { company, services } = navigation.footerLinks;
  const social = Object.entries(contactInfo.social).filter(([, url]) => url);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">{siteInfo.companyName}</span>
          <p>{siteInfo.tagline}</p>
          {social.length > 0 && (
            <div className="footer-social">
              {social.map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  title={name.charAt(0).toUpperCase() + name.slice(1)}
                  aria-label={name}
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          )}
        </div>

        {company && company.length > 0 && (
          <div className="footer-col">
            <h4>Studio</h4>
            <ul>
              {company.map((l) => (
                <li key={l.path}>
                  <Link to={l.path}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {services && services.length > 0 && (
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              {services.map((l) => (
                <li key={l.path}>
                  <Link to={l.path}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="footer-col">
          <h4>Visit</h4>
          <ul className="footer-contact">
            <li>{contactInfo.address.full}</li>
            <li>
              <a href={contactInfo.phone.link}>{contactInfo.phone.display}</a>
            </li>
            <li>
              <a href={contactInfo.email.link}>{contactInfo.email.display}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {year} {siteInfo.companyName}. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
