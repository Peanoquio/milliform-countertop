import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../config/siteConfig';
import SteelImage from '../components/SteelImage';
import useReveal from '../hooks/useReveal';
import './Collections.css';

const Collections = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? collections.items
        : collections.items.filter((i) => i.category === activeFilter),
    [activeFilter]
  );

  const scope = useReveal([activeFilter]);

  return (
    <div className="page collections" ref={scope}>
      <div className="container">
        <div className="page-head">
          <span className="eyebrow">Finishes</span>
          <h1>{collections.title}</h1>
          <p>{collections.subtitle}</p>
        </div>

        <div className="filter-bar" role="tablist" aria-label="Filter finishes">
          {collections.filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="finish-grid">
          {filtered.map((item) => (
            <article className="finish-card reveal" key={item.id}>
              <div className="finish-media">
                <SteelImage src={item.image} alt={item.name} label={item.name} />
                <span className="finish-tag">{item.category}</span>
              </div>
              <div className="finish-body">
                <h3>{item.name}</h3>
                {item.spec && <span className="finish-spec">{item.spec}</span>}
                <p>{item.description}</p>
                {item.features && item.features.length > 0 && (
                  <ul className="finish-features">
                    {item.features.map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="empty-state">No finishes in this category yet.</p>
        )}

        <div className="collections-cta">
          <p>Not sure which finish suits your space?</p>
          <Link to="/contact" className="btn btn-primary">
            Talk to us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Collections;
