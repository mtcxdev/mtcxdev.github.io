import React from 'react';
import { Maximize2, Layers } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import type { Project } from '../data/projects';
import type { LightboxItem } from './LightboxModal';

interface PortfolioProps {
  onOpenLightbox: (items: LightboxItem[], startIndex: number) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenLightbox }) => {
  const handleInspect = (project: Project, index = 0) => {
    const items: LightboxItem[] = project.gallery.map((g) => ({
      src: g.src,
      caption: g.caption,
      projectName: project.name,
      category: project.category
    }));
    onOpenLightbox(items, index);
  };

  return (
    <section
      id="work"
      style={{
        position: 'relative',
        padding: '120px 24px',
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
            marginBottom: '72px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
              01 // SELECTED WORK
            </span>
            <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span className="tech-badge">AUTHENTIC REPOSITORY WORK</span>
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
                maxWidth: '700px'
              }}
            >
              BUILT WITH<br />PURPOSE.
            </h2>
            <p
              style={{
                fontSize: '0.95rem',
                color: '#a1a1aa',
                maxWidth: '440px',
                lineHeight: 1.6
              }}
            >
              A selection of digital products, web applications, and fintech systems engineered from the ground up. Click any project to inspect the interface.
            </p>
          </div>
        </div>

        {/* Projects List - Asymmetric Editorial Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <article
                key={project.id}
                className="project-item"
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '48px'
                }}
              >
                {/* Project Metadata Eyebrow */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '28px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 600, color: '#fafafa' }}>
                      {project.number}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                    <h3 className="font-display" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                      {project.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                    <span className="tech-badge">{project.category}</span>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: '#71717a' }}>
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Body: Grid with Asymmetric Composition */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    columnGap: '32px',
                    rowGap: '32px',
                    alignItems: 'start'
                  }}
                  className="project-grid"
                >
                  {/* Visual Presentation Area: 7 or 8 columns depending on index */}
                  <div
                    style={{
                      gridColumn: isEven ? 'span 7' : 'span 8',
                      order: isEven ? 2 : 1
                    }}
                    className="project-visual-col"
                  >
                    {/* Primary Featured Screenshot */}
                    <div
                      className="project-image-container"
                      style={{
                        height: '420px',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                      onClick={() => handleInspect(project, 0)}
                      title="Click to inspect interface"
                    >
                      <img
                        src={project.featuredImage}
                        alt={`${project.name} Interface Screenshot`}
                        loading="lazy"
                      />
                      {/* Inspect Overlay Trigger */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '16px',
                          right: '16px',
                          background: 'rgba(8, 8, 10, 0.85)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#fafafa',
                          padding: '8px 14px',
                          borderRadius: '2px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        <Maximize2 size={13} />
                        INSPECT INTERFACE
                      </div>
                    </div>

                    {/* Gallery Thumbnails Strip */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${Math.min(project.gallery.length, 3)}, 1fr)`,
                        gap: '12px',
                        marginTop: '12px'
                      }}
                    >
                      {project.gallery.slice(1, 4).map((g, thumbIdx) => (
                        <div
                          key={thumbIdx}
                          onClick={() => handleInspect(project, thumbIdx + 1)}
                          style={{
                            height: '90px',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            borderRadius: '2px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            backgroundColor: '#0c0c0f'
                          }}
                          className="project-thumb"
                        >
                          <img
                            src={g.src}
                            alt={g.caption}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              opacity: 0.85,
                              transition: 'opacity 0.2s ease, transform 0.3s ease'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Details & Technical Narrative: 5 or 4 columns */}
                  <div
                    style={{
                      gridColumn: isEven ? 'span 5' : 'span 4',
                      order: isEven ? 1 : 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px'
                    }}
                    className="project-info-col"
                  >
                    <div>
                      <h4
                        className="font-display"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          lineHeight: 1.25,
                          color: '#fafafa',
                          marginBottom: '14px'
                        }}
                      >
                        {project.headline}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.88rem',
                          lineHeight: 1.65,
                          color: '#a1a1aa'
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Architectural Highlights */}
                    <div
                      style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '18px'
                      }}
                    >
                      <span className="tech-label" style={{ display: 'block', marginBottom: '12px' }}>
                        ENGINEERING HIGHLIGHTS
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {project.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            style={{
                              fontSize: '0.8rem',
                              color: '#d4d4d8',
                              display: 'flex',
                              alignItems: 'baseline',
                              gap: '8px'
                            }}
                          >
                            <span style={{ color: '#71717a', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                              +
                            </span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Used */}
                    <div
                      style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '18px'
                      }}
                    >
                      <span className="tech-label" style={{ display: 'block', marginBottom: '10px' }}>
                        TECHNOLOGY STACK
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="font-mono"
                            style={{
                              fontSize: '0.68rem',
                              color: '#e4e4e7',
                              padding: '3px 8px',
                              backgroundColor: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '2px'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Inspect Action */}
                    <div style={{ paddingTop: '8px' }}>
                      <button
                        onClick={() => handleInspect(project, 0)}
                        className="btn-secondary"
                        style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }}
                      >
                        <Layers size={13} />
                        Inspect Case Study Screenshots
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .project-grid {
            grid-template-columns: 1fr !important;
          }
          .project-visual-col,
          .project-info-col {
            grid-column: auto !important;
            order: initial !important;
          }
          .project-image-container {
            height: 280px !important;
          }
        }
        .project-thumb:hover img {
          opacity: 1 !important;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};
