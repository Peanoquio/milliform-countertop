import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { homepage, siteInfo, collections } from '../config/siteConfig';
import SteelImage from '../components/SteelImage';
import useReveal from '../hooks/useReveal';
import './Home.css';

const Home = () => {
  const scope = useReveal();
  const { hero, aboutPreview, featuredCollections, features, cta } = homepage;
  const marqueeNames = collections.items.map((i) => i.name);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = hero.images || (hero.image ? [hero.image] : []);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, hero.imageTransitionInterval || 6000);

    return () => clearInterval(interval);
  }, [heroImages.length, hero.imageTransitionInterval]);

  return (
    <div className="home" ref={scope}>
      {/* HERO */}
      <section className="hero">
        <div className="hero-media">
          {hero.video && hero.video.enabled && hero.video.mp4 ? (
            <video
              className="hero-video"
              autoPlay={hero.video.autoplay}
              loop={hero.video.loop}
              muted={hero.video.muted}
              playsInline
              poster={hero.video.poster}
            >
              <source src={hero.video.mp4} type="video/mp4" />
            </video>
          ) : heroImages.length > 1 ? (
            <div className="hero-carousel">
              {heroImages.map((img, idx) => (
                <SteelImage
                  key={idx}
                  src={img}
                  alt=""
                  className={`hero-img ${idx === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          ) : (
            <SteelImage src={heroImages[0]} alt="" className="hero-img" />
          )}
          <div className="hero-scrim" />
        </div>

        <div className="hero-content container">
          <span className="hero-eyebrow">{siteInfo.companyName}</span>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          <div className="hero-actions">
            {hero.buttons.map((b) => (
              <Link key={b.text} to={b.link} className={`btn btn-${b.type}`}>
                {b.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="hero-scroll-cue" aria-hidden="true" />
      </section>

      {/* MARQUEE — finish names drift past */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeNames, ...marqueeNames].map((name, i) => (
            <span className="marquee-item" key={i}>
              {name}
              <span className="marquee-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES STRIP */}
      <section className="section features-strip">
        <div className="container features-grid">
          {features.map((f, i) => (
            <div
              className="feature reveal"
              key={f.title}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section section-alt about-preview">
        <div className="container about-preview-grid">
          <div className="about-preview-media reveal">
            <SteelImage src={aboutPreview.image} alt={aboutPreview.title} label="Workshop" />
          </div>
          <div className="about-preview-text reveal">
            <span className="eyebrow">The studio</span>
            <h2>{aboutPreview.title}</h2>
            {aboutPreview.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Link to={aboutPreview.buttonLink} className="btn btn-outline">
              {aboutPreview.buttonText}
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED FINISHES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Signature finishes</span>
            <h2>A surface for every space</h2>
          </div>
          <div className="featured-grid">
            {featuredCollections.map((c, i) => (
              <Link
                to="/collections"
                className="featured-card reveal"
                key={c.id}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <div className="featured-media">
                  <SteelImage src={c.image} alt={c.name} label={c.name} />
                </div>
                <div className="featured-body">
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                  <span className="featured-link">View finishes →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="container cta-inner reveal">
          <h2>{cta.title}</h2>
          <p>{cta.description}</p>
          <Link to={cta.buttonLink} className="btn btn-primary">
            {cta.buttonText}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
