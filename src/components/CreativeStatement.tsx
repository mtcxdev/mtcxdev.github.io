import React from 'react';

export const CreativeStatement: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        padding: '160px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        backgroundColor: '#070709'
      }}
      aria-label="Studio Creative Manifesto"
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
            // MANIFESTO
          </span>
          <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <span className="tech-badge">EST. 2026</span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 7.8vw, 7.5rem)',
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            maxWidth: '1200px',
            marginBottom: '40px'
          }}
        >
          YOU BRING<br />
          THE IDEA.<br />
          <span style={{ color: '#71717a' }}>WE BUILD</span><br />
          THE WORLD<br />
          AROUND IT.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '32px'
          }}
          className="manifesto-bottom-grid"
        >
          <div style={{ gridColumn: 'span 4' }} className="manifesto-col">
            <span className="tech-label" style={{ display: 'block', marginBottom: '6px' }}>
              PERSPECTIVE
            </span>
            <p style={{ fontSize: '0.88rem', color: '#a1a1aa', lineHeight: 1.6 }}>
              A good idea deserves more than an off-the-shelf template. It requires careful art direction, considered typography, and engineering that endures real-world scale.
            </p>
          </div>

          <div style={{ gridColumn: 'span 4' }} className="manifesto-col">
            <span className="tech-label" style={{ display: 'block', marginBottom: '6px' }}>
              ENGINEERING
            </span>
            <p style={{ fontSize: '0.88rem', color: '#a1a1aa', lineHeight: 1.6 }}>
              Every interface we build is fast, accessible, and dependable. We treat technical performance as a fundamental component of visual luxury.
            </p>
          </div>

          <div style={{ gridColumn: 'span 4' }} className="manifesto-col">
            <span className="tech-label" style={{ display: 'block', marginBottom: '6px' }}>
              COLLABORATION
            </span>
            <p style={{ fontSize: '0.88rem', color: '#a1a1aa', lineHeight: 1.6 }}>
              We partner with founders, brands, and teams who value craft over haste. High autonomy, direct communication, and zero corporate overhead.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .manifesto-bottom-grid {
            grid-template-columns: 1fr !important;
          }
          .manifesto-col {
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
