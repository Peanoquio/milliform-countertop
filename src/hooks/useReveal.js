import { useEffect, useRef } from 'react';
import config from '../config/siteConfig';

// Adds `.is-visible` to elements with the `.reveal` class as they scroll
// into view. No-ops gracefully when scroll animations are disabled or when
// IntersectionObserver is unavailable.
export default function useReveal(deps = []) {
  const scopeRef = useRef(null);

  useEffect(() => {
    const enabled = config.animationConfig.enabled && config.animationConfig.scrollAnimations;
    const scope = scopeRef.current || document;
    const nodes = scope.querySelectorAll('.reveal');

    if (!enabled || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
