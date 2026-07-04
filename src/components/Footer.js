import React from 'react';
import { Link } from 'react-router-dom';
import { siteInfo, contactInfo, navigation } from '../config/siteConfig';
import SocialIcon from './SocialIcon';
import './Footer.css';

const year = 2026; // bump as needed; kept static to avoid runtime Date dependence

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
            <li className="footer-contact-item">
              <span className="footer-contact-icon">
                <SocialIcon name="address" />
              </span>
              <span>{contactInfo.address.full}</span>
            </li>
            <li className="footer-contact-item">
              <span className="footer-contact-icon">
                <SocialIcon name="phone" />
              </span>
              <a href={contactInfo.phone.link}>{contactInfo.phone.display}</a>
            </li>
            <li className="footer-contact-item">
              <span className="footer-contact-icon">
                <SocialIcon name="email" />
              </span>
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
