import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Hero3DCard } from './Hero3DCard';
import { Link } from '../router';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 24px 60px 24px',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          columnGap: '28px',
          rowGap: '48px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
        className="hero-grid"
      >
        {/* Left Column (Editorial Asymmetric Hero Text): 7 columns on desktop */}
        <div
          style={{
            gridColumn: 'span 7'
          }}
          className="hero-text-col"
        >
          {/* Top Micro-Details */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '28px'
            }}
          >
            <span className="tech-label">
              BASED ONLINE // WORKING GLOBALLY
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1
            className="font-display hero-headline"
            style={{
              fontSize: 'clamp(1.95rem, 4.4vw, 4.1rem)',
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              marginBottom: '28px',
              maxWidth: '100%'
            }}
          >
            WE BUILD<br />
            DIGITAL<br />
            <span className="hero-word-experiences">EXPERIENCES.</span>
          </h1>

          {/* Supporting Copy */}
          <p
            style={{
              fontSize: 'clamp(1.02rem, 1.35vw, 1.25rem)',
              lineHeight: 1.55,
              color: '#a1a1aa',
              maxWidth: '560px',
              marginBottom: '38px'
            }}
          >
            MTCX Dev designs and builds websites, digital products, and interactive platforms for founders, startups, and ambitious teams turning ideas into enduring digital craft.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '48px'
            }}
          >
            <button onClick={onOpenContact} className="btn-primary">
              Start a project
              <ArrowRight size={14} />
            </button>
            <Link to="/work" className="btn-secondary">
              Explore our work
              <ArrowDown size={14} />
            </Link>
          </div>

          {/* Technical Metadata Strip */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 24px'
            }}
          >
            {['WEB ARCHITECTURE', 'UI / UX CRAFT', 'SAAS PLATFORMS', 'FINTECH & WEB3', 'CUSTOM COMMERCE'].map(
              (label) => (
                <span key={label} className="tech-label" style={{ color: '#71717a' }}>
                  {label}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right Column: Signature 3D Rotating Artifact Card (5 columns) */}
        <div
          style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="hero-card-col"
        >
          <Hero3DCard />
          <div
            style={{
              marginTop: '20px',
              textAlign: 'center'
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.68rem', color: '#52525b', letterSpacing: '0.08em' }}>
              [ HOVER TO PAUSE & ROTATE // PURE CSS 3D ]
            </span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Scroll Indicator */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '40px auto 0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '20px'
        }}
      >
        <Link
          to="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#71717a'
          }}
        >
          <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
            VIEW ALL WORK → 01 // WORK
          </span>
        </Link>
        <span className="font-mono" style={{ fontSize: '0.72rem', color: '#3f3f46' }}>
          LAT 6.5244° N / 3.3792° E
        </span>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-text-col,
          .hero-card-col {
            grid-column: auto !important;
          }
          .hero-card-col {
            margin-top: 24px;
          }
        }
      `}</style>
    </section>
  );
};
