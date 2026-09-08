import React, { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { SERVICES } from '../data/projects';

export const ServicesSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const toggleService = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: '120px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Heading */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: '64px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
                02 // CAPABILITIES
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
                color: '#ffffff'
              }}
            >
              FROM IDEA<br />TO INTERFACE.
            </h2>
          </div>

          <p
            style={{
              fontSize: '0.95rem',
              color: '#a1a1aa',
              maxWidth: '460px',
              lineHeight: 1.6
            }}
          >
            We operate at the exact intersection of design and engineering. Every engagement is tailored to solve specific business and architectural challenges without templates.
          </p>
        </div>

        {/* Editorial List */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
          {SERVICES.map((srv, idx) => {
            const isOpen = activeIdx === idx;

            return (
              <div
                key={srv.number}
                className="service-row hairline-b"
                style={{
                  padding: '32px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
                onClick={() => toggleService(idx)}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1.2fr 1fr 40px',
                    alignItems: 'center',
                    gap: '24px'
                  }}
                  className="service-header-grid"
                >
                  {/* Number */}
                  <span className="font-mono" style={{ fontSize: '0.95rem', color: '#71717a' }}>
                    {srv.number}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.85rem)',
                      fontWeight: 700,
                      color: isOpen ? '#ffffff' : '#ededed',
                      letterSpacing: '-0.02em',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {srv.title}
                  </h3>

                  {/* Tagline snippet */}
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: '#a1a1aa',
                      display: 'none'
                    }}
                    className="service-tagline-desktop"
                  >
                    {srv.tagline}
                  </span>

                  {/* Expand icon */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', color: '#71717a' }}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                {/* Expanded Drawer Details */}
                {isOpen && (
                  <div
                    style={{
                      marginTop: '28px',
                      paddingTop: '24px',
                      borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      gap: '24px',
                      animation: 'fadeIn 0.25s ease-out'
                    }}
                    className="service-expanded-grid"
                  >
                    <div style={{ gridColumn: 'span 5' }} className="service-desc-col">
                      <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
                        OVERVIEW
                      </span>
                      <p style={{ fontSize: '0.9rem', color: '#d4d4d8', lineHeight: 1.6 }}>
                        {srv.tagline}
                      </p>
                    </div>

                    <div style={{ gridColumn: 'span 4' }} className="service-deliverables-col">
                      <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
                        DELIVERABLES
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {srv.deliverables.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: '0.82rem',
                              color: '#a1a1aa',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <ArrowUpRight size={12} style={{ color: '#71717a' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ gridColumn: 'span 3' }} className="service-tech-col">
                      <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
                        CORE STACK
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {srv.technologies.map((tech) => (
                          <span key={tech} className="tech-badge" style={{ fontSize: '0.64rem' }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .service-tagline-desktop {
            display: block !important;
          }
        }
        @media (max-width: 860px) {
          .service-header-grid {
            grid-template-columns: 48px 1fr 32px !important;
          }
          .service-expanded-grid {
            grid-template-columns: 1fr !important;
          }
          .service-desc-col,
          .service-deliverables-col,
          .service-tech-col {
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
