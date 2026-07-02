import React from 'react';
import { Link } from 'react-router-dom';
import { about } from '../config/siteConfig';
import SteelImage from '../components/SteelImage';
import useReveal from '../hooks/useReveal';
import './About.css';

const About = () => {
  const scope = useReveal();
  const { title, subtitle, introduction, timeline, values } = about;

  return (
    <div className="page about" ref={scope}>
      <div className="container">
        <div className="page-head">
          <span className="eyebrow">Our story</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {/* Intro split */}
        <section className="about-intro">
          <div className="about-intro-text reveal">
            <h2>{introduction.title}</h2>
            {introduction.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="about-intro-media reveal">
            <SteelImage src={introduction.image} alt={introduction.title} label="The workshop" />
          </div>
        </section>

        {/* Values */}
        <section className="about-values">
          {values.map((v) => (
            <div className="value reveal" key={v.title}>
              <span className="value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </section>

        {/* Timeline */}
        <section className="about-timeline">
          <div className="section-head">
            <span className="eyebrow">Milestones</span>
            <h2>How we got here</h2>
          </div>
          <div className="timeline">
            {timeline.map((t) => (
              <div className="timeline-item reveal" key={t.year}>
                <span className="timeline-year">{t.year}</span>
                <div className="timeline-content">
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="about-cta reveal">
          <h2>Let’s build something that lasts.</h2>
          <Link to="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
