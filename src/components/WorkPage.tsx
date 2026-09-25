import React, { useState } from 'react';
import { ArrowLeft, Maximize2, Layers, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import type { Project } from '../data/projects';
import type { LightboxItem } from './LightboxModal';
import { Link } from '../router';

interface WorkPageProps {
  onOpenLightbox: (items: LightboxItem[], startIndex: number) => void;
  onOpenContact: () => void;
}

type FilterCategory = 'ALL' | 'FINTECH' | 'COMMERCE' | 'TRAVEL' | 'TELECOM' | 'MARKETPLACE';

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenLightbox, onOpenContact }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'FINTECH') return project.category.toLowerCase().includes('fintech') || project.category.toLowerCase().includes('web3');
    if (activeFilter === 'COMMERCE') return project.category.toLowerCase().includes('commerce');
    if (activeFilter === 'TRAVEL') return project.category.toLowerCase().includes('travel');
    if (activeFilter === 'TELECOM') return project.category.toLowerCase().includes('telecom');
    if (activeFilter === 'MARKETPLACE') return project.category.toLowerCase().includes('storefront') || project.category.toLowerCase().includes('marketplace');
    return true;
  });

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
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#08080a', paddingTop: '100px' }}>
      {/* Background Architectural Grid & Noise */}
      <div className="technical-grid-bg" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* Main Page Container */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '40px 24px 100px 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Breadcrumb & Navigation Back */}
        <div style={{ marginBottom: '32px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: '#a1a1aa',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              transition: 'color 0.2s ease',
              padding: '6px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '2px'
            }}
            className="hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO STUDIO OVERVIEW</span>
          </Link>
        </div>

        {/* Page Header */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '56px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '48px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
              01 // PROJECT ARCHIVE
            </span>
            <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span className="tech-badge" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              AUTHENTIC REPOSITORIES & LIVE DEPLOYS
            </span>
            <span className="tech-badge" style={{ borderColor: 'rgba(52, 211, 153, 0.3)', color: '#34d399' }}>
              ● 5 ACTIVE SYSTEMS
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '32px'
            }}
          >
            <div>
              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(2.2rem, 5.2vw, 4.8rem)',
                  lineHeight: 1.02,
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  color: '#ffffff',
                  maxWidth: '820px',
                  marginBottom: '16px'
                }}
              >
                SELECTED WORK &<br />SYSTEM ARCHITECTURE.
              </h1>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#a1a1aa',
                  maxWidth: '640px',
                  lineHeight: 1.6
                }}
              >
                A comprehensive showcase of decentralized settlement engines, automated telecommunications portals, luxury e-commerce platforms, and high-volume utility marketplaces engineered with zero-template craft.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <button
                onClick={onOpenContact}
                className="btn-primary"
                style={{ whiteSpace: 'nowrap' }}
              >
                <span>Request custom build</span>
                <ArrowRight size={14} />
              </button>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#71717a' }}>
                DIRECT TURNKEY COMMISSIONING
              </span>
            </div>
          </div>

          {/* Interactive Filter Pills Strip */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              marginTop: '36px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#71717a', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginRight: '8px' }}>
              <Filter size={13} />
              <span>FILTER DOMAIN:</span>
            </div>

            {[
              { id: 'ALL', label: `ALL PROJECTS (${PROJECTS.length})` },
              { id: 'FINTECH', label: 'FINTECH & WEB3' },
              { id: 'COMMERCE', label: 'LUXURY COMMERCE' },
              { id: 'TRAVEL', label: 'TRAVEL TECH' },
              { id: 'TELECOM', label: 'TELECOM INFRA' },
              { id: 'MARKETPLACE', label: 'DIGITAL STOREFRONT' }
            ].map((f) => {
              const isSelected = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as FilterCategory)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.04em',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    border: isSelected ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.09)',
                    backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                    color: isSelected ? '#08080a' : '#a1a1aa',
                    fontWeight: isSelected ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* Projects List in Full Visual Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
          {filteredProjects.map((project, idx) => {
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
                    <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                      {project.name}
                    </h2>
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
                  {/* Visual Presentation Area: 7 or 8 columns */}
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
                          WebkitBackdropFilter: 'blur(8px)',
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
                      <h3
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
                      </h3>
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

        {/* Bottom Banner on Work Page */}
        <div
          style={{
            marginTop: '120px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '64px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '32px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#71717a', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              <Sparkles size={14} style={{ color: '#ffffff' }} />
              <span>DIRECT COLLABORATION</span>
            </div>
            <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              HAVE A PRODUCT TO ARCHITECT?
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', maxWidth: '520px', lineHeight: 1.6 }}>
              Whether you need high-conversion Web3 infrastructure, custom luxury storefronts, or high-throughput API gateways, let's build something lasting.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <button onClick={onOpenContact} className="btn-primary">
              <span>Start a project inquiry</span>
              <ArrowRight size={14} />
            </button>
            <Link to="/" className="btn-secondary">
              <span>Back to home</span>
            </Link>
          </div>
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
    </div>
  );
};
