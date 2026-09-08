import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#040405',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '80px 24px 40px 24px'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Top Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            marginBottom: '64px'
          }}
          className="footer-grid"
        >
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 5' }} className="footer-brand-col">
            <h3
              className="font-display"
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '10px'
              }}
            >
              MTCX DEV
            </h3>
            <p className="font-mono" style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '16px' }}>
              WEB DEVELOPMENT & DESIGN STUDIO
            </p>
            <p style={{ fontSize: '0.88rem', color: '#a1a1aa', maxWidth: '340px', lineHeight: 1.6 }}>
              Helping people bring their ideas to life online through uncompromising engineering and artistic direction.
            </p>
          </div>

          {/* Navigation Col */}
          <div style={{ gridColumn: 'span 3' }} className="footer-nav-col">
            <span className="tech-label" style={{ display: 'block', marginBottom: '16px' }}>
              NAVIGATION
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#work" className="nav-link">01 // Work</a>
              <a href="#services" className="nav-link">02 // Services</a>
              <a href="#process" className="nav-link">03 // Process</a>
              <a href="#engineering" className="nav-link">04 // Engineering</a>
              <a href="#about" className="nav-link">05 // About</a>
            </div>
          </div>

          {/* Connectivity / Links Col */}
          <div style={{ gridColumn: 'span 4' }} className="footer-links-col">
            <span className="tech-label" style={{ display: 'block', marginBottom: '16px' }}>
              CONNECTIVITY
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://github.com/mtcxdev"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#fafafa',
                  textDecoration: 'none'
                }}
              >
                github.com/mtcxdev
                <ArrowUpRight size={13} style={{ color: '#71717a' }} />
              </a>
              <a
                href="mailto:dev@mtcx.store"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#a1a1aa',
                  textDecoration: 'none'
                }}
              >
                dev@mtcx.store
              </a>
              <a
                href="mailto:devmtcx@gmail.com"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#a1a1aa',
                  textDecoration: 'none'
                }}
              >
                devmtcx@gmail.com
              </a>
              <button
                onClick={onOpenContact}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fafafa',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  marginTop: '8px',
                  textDecoration: 'underline'
                }}
              >
                Start an inquiry →
              </button>
            </div>
          </div>
        </div>

        {/* Giant Typographic Monogram Watermark */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '32px',
            marginBottom: '32px',
            overflow: 'hidden'
          }}
          aria-hidden="true"
        >
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(3.5rem, 14vw, 12rem)',
              lineHeight: 0.82,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              color: 'rgba(255, 255, 255, 0.03)',
              userSelect: 'none',
              textAlign: 'center'
            }}
          >
            MTCX DEV
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '24px'
          }}
        >
          <span className="font-mono" style={{ fontSize: '0.74rem', color: '#52525b' }}>
            © 2026 MTCX DEV. ALL RIGHTS RESERVED.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="tech-badge" style={{ fontSize: '0.65rem' }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              SYSTEMS NORMAL
            </span>
            <span className="font-mono" style={{ fontSize: '0.74rem', color: '#71717a' }}>
              BUILT WITH CRAFT & TS
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-brand-col,
          .footer-nav-col,
          .footer-links-col {
            grid-column: auto !important;
          }
        }
      `}</style>
    </footer>
  );
};
