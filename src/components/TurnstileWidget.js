import React, { useEffect, useRef, forwardRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import './TurnstileWidget.css';

const TurnstileWidget = forwardRef(({
  onTokenChange = () => {},
  size = 'normal',
  appearance = 'always',
  language = 'en',
}, ref) => {
  const containerRef = useRef(null);
  const tokenRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const { currentTheme } = useTheme();

  const isDarkTheme = currentTheme === 'darkNight';

  const initializeTurnstile = useCallback(() => {
    if (typeof window.turnstile === 'undefined') {
      console.error('Turnstile script failed to load.');
      return;
    }

    const siteKey = process.env.REACT_APP_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.error('Turnstile site key not configured.');
      return;
    }

    // Warn if using test key in production
    if (siteKey === '1x00000000000000000000AA') {
      console.warn('Using Cloudflare Turnstile test key.');
    }

    const container = containerRef.current;
    if (!container) return;

    // Render Turnstile widget
    window.turnstile.render(container, {
      sitekey: siteKey,
      theme: isDarkTheme ? 'dark' : 'light',
      size,
      appearance,
      language,
      tabindex: 0,
      retry: 'auto',
      callback: (token) => {
        tokenRef.current = token;
        onTokenChange(token);
      },
      'error-callback': () => {
        tokenRef.current = null;
        onTokenChange(null);
      },
      'expired-callback': () => {
        tokenRef.current = null;
        onTokenChange(null);
      },
      'timeout-callback': () => {
        tokenRef.current = null;
        onTokenChange(null);
      },
      'before-interactive-callback': () => {
        // Widget is about to become interactive
      },
      'after-interactive-callback': () => {
        // Widget is now interactive and ready for input
      },
      'unsupported-callback': () => {
        console.warn('Turnstile is not supported in this browser');
      },
    });
  }, [isDarkTheme, onTokenChange, size, appearance, language]);

  useEffect(() => {
    const container = containerRef.current;

    // Remove old widget when theme changes
    if (container && window.turnstile) {
      try {
        window.turnstile.remove();
      } catch (e) {
        // Removal error
      }
    }

    // Load Turnstile script dynamically
    const loadScript = async () => {
      // Already loaded
      if (typeof window.turnstile !== 'undefined') {
        initializeTurnstile();
        return;
      }

      // Already loading
      if (scriptLoadedRef.current) return;
      scriptLoadedRef.current = true;

      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.onload = () => {
          initializeTurnstile();
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load Turnstile script');
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    loadScript();

    // Cleanup
    return () => {
      try {
        if (container && window.turnstile) {
          window.turnstile.remove();
        }
      } catch (e) {
        // Cleanup error
      }
    };
  }, [initializeTurnstile, currentTheme]);

  return <div ref={containerRef} className="turnstile-container" />;
});

TurnstileWidget.displayName = 'TurnstileWidget';

export default TurnstileWidget;
