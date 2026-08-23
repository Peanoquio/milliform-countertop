import React, { useState, useRef, useEffect } from 'react';
import { contactInfo, siteInfo } from '../config/siteConfig';
import { useTheme } from '../context/ThemeContext';
import SocialIcon from '../components/SocialIcon';
import TurnstileWidget from '../components/TurnstileWidget';
import Modal from '../components/Modal';
import CountryPhoneInput, { COUNTRIES } from '../components/CountryPhoneInput';
import CustomSelect from '../components/CustomSelect';
import useReveal from '../hooks/useReveal';
import './Contact.css';

const initialForm = { name: '', email: '', phone: '', project: '', message: '' };

const Contact = () => {
  const scope = useReveal();
  const { currentTheme } = useTheme();
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const turnstileRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Remove old theme classes
      mapRef.current.classList.remove('dark-theme', 'light-theme');
      // Add the appropriate theme class
      const themeClass = currentTheme === 'darkNight' ? 'dark-theme' : 'light-theme';
      mapRef.current.classList.add(themeClass);
    }
  }, [currentTheme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Input validation and sanitization
    let sanitized = value;

    if (name === 'name' || name === 'email' || name === 'message') {
      // Limit input length
      const maxLength = name === 'message' ? 2000 : name === 'email' ? 254 : 100;
      sanitized = value.slice(0, maxLength);

      // Remove any HTML tags to prevent XSS
      sanitized = sanitized.replace(/<[^>]*>/g, '');
    }

    setForm((f) => ({ ...f, [name]: sanitized }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // SECURITY NOTE: Backend should implement:
    // 1. Verify Turnstile token validity via Cloudflare API
    // 2. Use parameterized queries/prepared statements to prevent SQL injection
    // 3. Validate and sanitize all input on server side (never trust client-side validation)
    // 4. Implement rate limiting (e.g., max 5 submissions per IP per hour)
    // 5. Store logs of submissions for audit trail
    // 6. Use HTTPS only (enforce HSTS headers)
    // 7. Validate email before sending confirmation
    // 8. Implement CSRF tokens if not using SameSite cookies

    // Validate Turnstile token
    if (!turnstileToken) {
      setShowErrorModal(true);
      return;
    }

    // Validate form input
    if (!form.name || !form.email || !form.phone || !form.project || !form.message) {
      setErrorMessage('Please fill in all required fields.');
      setShowErrorModal(true);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMessage('Please enter a valid email address.');
      setShowErrorModal(true);
      return;
    }

    // Validate phone format (basic: at least 7 digits)
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      setErrorMessage('Please enter a valid phone number.');
      setShowErrorModal(true);
      return;
    }

    // Validate message length
    if (form.message.trim().length < 10) {
      setErrorMessage('Please provide a message with at least 10 characters.');
      setShowErrorModal(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Find dial code for the selected country
    const selectedCountry = COUNTRIES.find((c) => c.code === countryCode) || { dialCode: '+1' };
    const phoneWithCode = `${selectedCountry.dialCode} ${form.phone}`.trim();

    // Prepare form data
    const submissionData = {
      name: form.name,
      email: form.email,
      phone: phoneWithCode,
      projectType: form.project,
      message: form.message,
      captchaToken: turnstileToken,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://milli-form.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      setSent(true);
      setForm(initialForm);
      setCountryCode('US');
      setTurnstileToken(null);
      if (typeof window.turnstile !== 'undefined') {
        window.turnstile.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage(error.message || 'Failed to send enquiry. Please try again.');
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
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
              {contactInfo.addresses && contactInfo.addresses.length > 0 && (
                <div className="contact-locations">
                  {contactInfo.addresses.map((addr) => (
                    <div key={addr.id} className="contact-item">
                      <span className="contact-icon">
                        <SocialIcon name="address" />
                      </span>
                      <div>
                        <p>{addr.full}</p>
                        {addr.country && <p className="location-country">{addr.country}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="detail-block">
              <h4>Talk to us</h4>
              {contactInfo.phones && contactInfo.phones.length > 0 && (
                <div className="contact-phones">
                  {contactInfo.phones.map((phone) => (
                    <div key={phone.link} className="contact-item">
                      <span className="contact-icon">
                        <SocialIcon name="phone" />
                      </span>
                      <div>
                        <p>
                          <a href={phone.link}>{phone.display}</a>
                        </p>
                        {phone.country && <p className="phone-country">{phone.country}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              {/* <p>{contactInfo.hours.weekday}</p> */}
              <p>{contactInfo.hours.workday}</p>
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
                  Awesome! It is great that you are reaching out to us.
                  Looking forward to your enquiry and we will respond to you the soonest.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSent(false);
                    setForm(initialForm);
                    setCountryCode('US');
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
                  <CountryPhoneInput
                    value={form.phone}
                    onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                    countryCode={countryCode}
                    onCountryChange={setCountryCode}
                  />
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
                <CustomSelect
                  label="Project type"
                  options={[
                    { value: 'Residential (HDB)', label: 'Residential (HDB)' },
                    { value: 'Residential (Condo)', label: 'Residential (Condo)' },
                    { value: 'Residential (Landed)', label: 'Residential (Landed)' },
                    { value: 'Hospitality', label: 'Hospitality' },
                    { value: 'Commercial', label: 'Commercial' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  value={form.project}
                  onChange={(value) => setForm((f) => ({ ...f, project: value }))}
                  placeholder="Select…"
                />
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        {contactInfo.map.embedUrl && (
          <div
            ref={mapRef}
            className="contact-map reveal"
          >
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
          icon={errorMessage ? '⚠' : '🔒'}
          title={errorMessage ? 'Submission Failed' : 'Captcha Verification Required'}
          message={
            errorMessage ||
            'Please complete the captcha verification before submitting the form.'
          }
          onClose={() => {
            setShowErrorModal(false);
            setErrorMessage('');
          }}
        />
      </div>
    </div>
  );
};

export default Contact;
