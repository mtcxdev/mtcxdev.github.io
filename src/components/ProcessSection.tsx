import React from 'react';
import { PROCESS_STEPS } from '../data/projects';

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      style={{
        position: 'relative',
        padding: '120px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
              03 // METHODOLOGY
            </span>
            <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.6rem, 4.8vw, 4.2rem)',
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '20px'
            }}
          >
            HOW WE<br />BUILD.
          </h2>

          <p
            style={{
              fontSize: '0.95rem',
              color: '#a1a1aa',
              maxWidth: '520px',
              lineHeight: 1.6
            }}
          >
            A disciplined engineering pipeline that transforms ambiguous ideas into resilient, production-ready digital products.
          </p>
        </div>

        {/* 4-Step Technical Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            position: 'relative'
          }}
          className="process-grid"
        >
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              style={{
                backgroundColor: '#0c0c0f',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                minHeight: '280px'
              }}
              className="process-card"
            >
              {/* Card top */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingBottom: '12px'
                  }}
                >
                  <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fafafa' }}>
                    {step.number}
                  </span>
                  <span className="tech-badge">{step.phase}</span>
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#a1a1aa',
                    lineHeight: 1.6
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Card footer indicator */}
              <div
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.64rem', color: '#52525b' }}>
                  PHASE // 0{idx + 1}.0
                </span>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: '#71717a' }}>
                  {idx < 3 ? '→' : '✓'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .process-card {
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .process-card:hover {
          border-color: rgba(255, 255, 255, 0.22);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};
