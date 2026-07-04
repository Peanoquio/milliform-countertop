import React, { useState, useRef } from 'react';
import { contactInfo, siteInfo } from '../config/siteConfig';
import SocialIcon from '../components/SocialIcon';
import TurnstileWidget from '../components/TurnstileWidget';
import Modal from '../components/Modal';
import useReveal from '../hooks/useReveal';
import './Contact.css';

const initialForm = { name: '', email: '', phone: '', project: '', message: '' };

const Contact = () => {
  const scope = useReveal();
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const turnstileRef = useRef(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate Turnstile token
    if (!turnstileToken) {
      setShowErrorModal(true);
      return;
    }

    // No backend in a static site. Hand off to the studio inbox via a
    // pre-filled mailto so the submission is never silently lost.
    const subject = encodeURIComponent(`New enquiry — ${form.name || 'Website'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n` +
        `Project type: ${form.project}\n\n${form.message}`
    );
    window.location.href = `${contactInfo.email.link}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="page contact" ref={scope}>
      <div className="container">
        <div className="page-head">
          <span className="eyebrow">Get in touch</span>
          <h1>Start your project</h1>
          <p>
            Send us drawings or a few photos with rough dimensions, and we’ll come back
            with options and an estimate.
          </p>
        </div>

        <div className="contact-grid">
          {/* Details */}
          <aside className="contact-details reveal">
            <div className="detail-block">
              <h4>Visit the workshop</h4>
              <div className="contact-item">
                <span className="contact-icon">
                  <SocialIcon name="address" />
                </span>
                <p>{contactInfo.address.full}</p>
              </div>
            </div>
            <div className="detail-block">
              <h4>Talk to us</h4>
              <div className="contact-item">
                <span className="contact-icon">
                  <SocialIcon name="phone" />
                </span>
                <p>
                  <a href={contactInfo.phone.link}>{contactInfo.phone.display}</a>
                </p>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <SocialIcon name="email" />
                </span>
                <p>
                  <a href={contactInfo.email.link}>{contactInfo.email.display}</a>
                </p>
              </div>
            </div>
            <div className="detail-block">
              <h4>Opening hours</h4>
              <p>{contactInfo.hours.weekday}</p>
              <p>{contactInfo.hours.saturday}</p>
              <p>{contactInfo.hours.sunday}</p>
            </div>
            {Object.entries(contactInfo.social).some(([, v]) => v) && (
              <div className="detail-block">
                <h4>Follow</h4>
                <div className="contact-social">
                  {Object.entries(contactInfo.social)
                    .filter(([, v]) => v)
                    .map(([name, url]) => (
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
              </div>
            )}
          </aside>

          {/* Form */}
          <div className="contact-form-wrap reveal">
            {sent ? (
              <div className="form-success">
                <span className="success-icon">◈</span>
                <h3>Thank you.</h3>
                <p>
                  Your email client should have opened with your enquiry ready to send.
                  We’ll reply within one business day.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSent(false);
                    setForm(initialForm);
                    setTurnstileToken(null);
                    if (typeof window.turnstile !== 'undefined') {
                      window.turnstile.reset();
                    }
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="field-row">
                  <label className="field">
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="field">
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="field">
                  <span>Project type</span>
                  <select name="project" value={form.project} onChange={handleChange}>
                    <option value="">Select…</option>
                    <option>Residential kitchen</option>
                    <option>Hospitality / bar</option>
                    <option>Commercial / lab</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="field">
                  <span>Tell us about your space</span>
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </label>
                <TurnstileWidget
                  ref={turnstileRef}
                  onTokenChange={setTurnstileToken}
                />
                <button type="submit" className="btn btn-primary">
                  Send enquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        {contactInfo.map.embedUrl && (
          <div className="contact-map reveal">
            <iframe
              title={`${siteInfo.companyName} location`}
              src={contactInfo.map.embedUrl}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        <Modal
          isOpen={showErrorModal}
          icon="🔒"
          title="Captcha Verification Required"
          message="Please complete the captcha verification before submitting the form."
          onClose={() => setShowErrorModal(false)}
        />
      </div>
    </div>
  );
};

export default Contact;
