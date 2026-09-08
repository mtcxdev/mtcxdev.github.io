import React from 'react';
import { Terminal, Compass, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '120px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
            05 // THE STUDIO
          </span>
          <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <span className="tech-badge">CORE PRINCIPLES</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '48px',
            alignItems: 'start'
          }}
          className="about-grid"
        >
          {/* Left: Statement */}
          <div style={{ gridColumn: 'span 7' }} className="about-left-col">
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.55rem, 4vw, 3.6rem)',
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '28px'
              }}
            >
              WE BELIEVE A GOOD IDEA<br />
              DESERVES A GREAT<br />
              DIGITAL HOME.
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#d4d4d8',
                marginBottom: '20px'
              }}
            >
              MTCX Dev is a web development and design studio focused on turning ambitious ideas into fast, thoughtful, and memorable digital experiences.
            </p>

            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: '#a1a1aa'
              }}
            >
              We don't operate like an agency with layers of account managers. You work directly with engineers and designers who obsess over typographic precision, sub-second latency, deterministic smart contracts, and micro-interactions.
            </p>
          </div>

          {/* Right: Three Pillars */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
            className="about-right-col"
          >
            {[
              {
                icon: <Terminal size={18} />,
                title: 'Technical Excellence',
                desc: 'Architecture built on rock-solid foundations: type-safe schemas, idempotent transaction handling, and resilient edge APIs.'
              },
              {
                icon: <Sparkles size={18} />,
                title: 'Artistic Intent',
                desc: 'Every layout has deliberate rhythm. We leverage asymmetric composition, generous negative space, and curated typography.'
              },
              {
                icon: <Compass size={18} />,
                title: 'Direct Execution',
                desc: 'Rapid iteration cycles with transparent milestones. We turn complex requirements into clean, intuitive products that ship on schedule.'
              }
            ].map((pillar) => (
              <div
                key={pillar.title}
                style={{
                  backgroundColor: '#0c0c0f',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: '24px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ color: '#ffffff' }}>{pillar.icon}</div>
                  <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fafafa' }}>
                    {pillar.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#a1a1aa', lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-left-col,
          .about-right-col {
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
