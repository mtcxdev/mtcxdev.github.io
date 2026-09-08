import React from 'react';
import { TECH_STACK } from '../data/projects';
import { ShieldCheck, Cpu, Zap, Lock, Gauge, Code2 } from 'lucide-react';

export const TechnicalCredibility: React.FC = () => {
  return (
    <section
      id="engineering"
      style={{
        position: 'relative',
        padding: '120px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
              04 // TECHNICAL DISCIPLINE
            </span>
            <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px'
            }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.6rem, 4.8vw, 4.2rem)',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                maxWidth: '780px'
              }}
            >
              DESIGNED BEAUTIFULLY.<br />
              ENGINEERED PROPERLY.
            </h2>
            <p
              style={{
                fontSize: '0.95rem',
                color: '#a1a1aa',
                maxWidth: '460px',
                lineHeight: 1.6
              }}
            >
              We write maintainable, modular TypeScript and SQL. No bloated templates, no unnecessary dependencies, and zero speculative fluff.
            </p>
          </div>
        </div>

        {/* Engineering Standards Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '16px',
            marginBottom: '48px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '32px'
          }}
          className="standards-grid"
        >
          {[
            { icon: <Zap size={16} />, title: 'SUB-SECOND LCP', detail: 'Optimized hydration & assets' },
            { icon: <ShieldCheck size={16} />, title: 'WCAG AA A11Y', detail: 'Keyboard & screen-reader parity' },
            { icon: <Gauge size={16} />, title: 'ZERO BLOAT', detail: 'Deterministic code architecture' },
            { icon: <Lock size={16} />, title: 'SECURE FLOWS', detail: 'HMAC webhooks & row-locks' },
            { icon: <Cpu size={16} />, title: 'AI PROTOCOLS', detail: 'Model Context Protocol (MCP)' },
            { icon: <Code2 size={16} />, title: '100% RESPONSIVE', detail: 'Fluid typography clamp' }
          ].map((std) => (
            <div
              key={std.title}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '3px',
                padding: '20px 16px'
              }}
            >
              <div style={{ color: '#fafafa', marginBottom: '12px' }}>{std.icon}</div>
              <h4 className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fafafa', marginBottom: '4px' }}>
                {std.title}
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#71717a' }}>{std.detail}</p>
            </div>
          ))}
        </div>

        {/* Real Technology Grid */}
        <div
          style={{
            backgroundColor: '#0a0a0d',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            padding: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}
          className="tech-matrix-grid"
        >
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                paddingBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <span className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fafafa' }}>
                  {tech.name}
                </span>
                <span className="font-mono" style={{ fontSize: '0.64rem', color: '#52525b' }}>
                  {tech.category}
                </span>
              </div>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#71717a' }}>
                {tech.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .standards-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .tech-matrix-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .standards-grid {
            grid-template-columns: 1fr !important;
          }
          .tech-matrix-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};
