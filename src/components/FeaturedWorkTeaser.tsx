import React from 'react';
import { ArrowRight, Layers, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { Link } from '../router';

export const FeaturedWorkTeaser: React.FC = () => {
  // Take top 3 projects for the home page showcase teaser
  const teaserProjects = PROJECTS.slice(0, 3);

  return (
    <section
      id="work-preview"
      style={{
        position: 'relative',
        padding: '120px 24px 100px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '64px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
              01 // SELECTED WORK PREVIEW
            </span>
            <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span className="tech-badge">5 PROJECTS MOVED TO DEDICATED /work ROUTE</span>
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
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(1.8rem, 4.4vw, 3.8rem)',
                  lineHeight: 1.05,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  maxWidth: '740px'
                }}
              >
                BUILT WITH PURPOSE.<br />ARCHITECTED FOR IMPACT.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#a1a1aa',
                  maxWidth: '440px',
                  lineHeight: 1.6
                }}
              >
                Explore our full case study archive, architecture breakdowns, and interactive screenshot lightbox on our dedicated projects page.
              </p>
              <Link
                to="/work"
                className="btn-primary"
                style={{ marginTop: '4px' }}
              >
                <span>View all 5 projects on /work</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Column Curated Teaser Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}
          className="teaser-grid"
        >
          {teaserProjects.map((p) => (
            <Link
              key={p.id}
              to="/work"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(18, 18, 22, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'border-color 0.25s ease, transform 0.25s ease',
                position: 'relative'
              }}
              className="teaser-card"
            >
              {/* Image Preview Container */}
              <div
                style={{
                  height: '240px',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#0c0c0f'
                }}
              >
                <img
                  src={p.featuredImage}
                  alt={p.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s var(--ease-out-expo)'
                  }}
                  className="teaser-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#fafafa',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      padding: '2px 8px',
                      borderRadius: '2px',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {p.number}
                  </span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    backgroundColor: 'rgba(8, 8, 10, 0.85)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '2px',
                    fontSize: '0.68rem',
                    color: '#fafafa',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <Layers size={11} />
                  <span>CASE STUDY</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="tech-badge" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                      {p.category.split('/')[0].trim()}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.7rem', color: '#71717a' }}>
                      {p.year}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '8px',
                      lineHeight: 1.25
                    }}
                  >
                    {p.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#a1a1aa',
                      lineHeight: 1.55,
                      marginBottom: '20px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {p.headline}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                    {p.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono"
                        style={{
                          fontSize: '0.64rem',
                          color: '#d4d4d8',
                          padding: '2px 6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: '2px'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.technologies.length > 3 && (
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.64rem',
                          color: '#71717a',
                          padding: '2px 6px'
                        }}
                      >
                        +{p.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Read Link */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '12px'
                    }}
                  >
                    <span>Inspect on /work</span>
                    <ArrowRight size={12} className="teaser-arrow" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Global Route Callout Bar */}
        <div
          style={{
            marginTop: '36px',
            padding: '20px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '4px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#e4e4e7' }}>
              Want to inspect all 5 systems, technical matrices & full-resolution UI galleries?
            </span>
          </div>

          <Link
            to="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            <span>GO TO /work</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .teaser-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .teaser-card:hover {
          border-color: rgba(255, 255, 255, 0.25) !important;
          transform: translateY(-2px);
        }
        .teaser-card:hover .teaser-img {
          transform: scale(1.04);
        }
        .teaser-card:hover .teaser-arrow {
          transform: translateX(4px);
        }
        .teaser-arrow {
          transition: transform 0.2s ease;
        }
      `}</style>
    </section>
  );
};
