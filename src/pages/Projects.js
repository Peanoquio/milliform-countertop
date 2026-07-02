import React, { useState, useEffect, useCallback } from 'react';
import { projects } from '../config/siteConfig';
import SteelImage from '../components/SteelImage';
import useReveal from '../hooks/useReveal';
import './Projects.css';

const Projects = () => {
  const [active, setActive] = useState(null);
  const scope = useReveal();

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close]);

  return (
    <div className="page projects" ref={scope}>
      <div className="container">
        <div className="page-head">
          <span className="eyebrow">Portfolio</span>
          <h1>{projects.title}</h1>
          <p>{projects.subtitle}</p>
        </div>

        <div className="projects-grid">
          {projects.items.map((p) => (
            <button className="project-card reveal" key={p.id} onClick={() => setActive(p)}>
              <div className="project-media">
                <SteelImage src={p.image} alt={p.title} label={p.title} />
                <span className="project-year">{p.year}</span>
              </div>
              <div className="project-body">
                <span className="project-cat">{p.category}</span>
                <h3>{p.title}</h3>
                <span className="project-loc">{p.location}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="modal-overlay" onClick={close}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={close} aria-label="Close">
              ×
            </button>
            <div className="modal-media">
              <SteelImage src={active.image} alt={active.title} label={active.title} />
            </div>
            <div className="modal-body">
              <span className="project-cat">
                {active.category} · {active.location} · {active.year}
              </span>
              <h2>{active.title}</h2>
              <p>{active.description}</p>
              {active.details && active.details.length > 0 && (
                <ul className="modal-details">
                  {active.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
