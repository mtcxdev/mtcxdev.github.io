import React, { useRef, useState, useEffect } from 'react';

export const Hero3DCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Restrained tilt max 12 deg
    const tiltX = -(y / (rect.height / 2)) * 10;
    const tiltY = (x / (rect.width / 2)) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const transformStyle = isHovered && !isMobile
    ? {
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`,
        boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 255, 255, 0.05)'
      }
    : undefined;

  return (
    <div
      className="card-3d-scene"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="MTCX Dev Interactive 3D Artifact Card"
    >
      <div className="card-3d-wrapper">
        <div className="card-3d-inner" style={transformStyle}>
          {/* ================= FRONT FACE ================= */}
          <div className="card-face card-face-front">
            <span className="corner-mark corner-tl">+</span>
            <span className="corner-mark corner-tr">+</span>
            <span className="corner-mark corner-bl">+</span>
            <span className="corner-mark corner-br">+</span>

            {/* Top metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
              <div>
                <span className="tech-label" style={{ display: 'block', marginBottom: '2px', color: '#a1a1aa' }}>
                  STUDIO ARTIFACT
                </span>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: '#71717a' }}>
                  SYS://MTCX-2026.01
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fafafa', letterSpacing: '0.05em' }}>
                  01 / 06
                </span>
                <span className="tech-label" style={{ display: 'block', fontSize: '0.62rem', color: '#52525b' }}>
                  EDITION
                </span>
              </div>
            </div>

            {/* Center Typographic Display */}
            <div style={{ position: 'relative', zIndex: 2, padding: '24px 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                <span className="tech-label" style={{ color: '#d4d4d8', letterSpacing: '0.12em' }}>
                  MTCX DEV
                </span>
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: '1.75rem',
                  lineHeight: 1.1,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  marginBottom: '10px'
                }}
              >
                DIGITAL<br />
                EXPERIENCES.
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#a1a1aa', maxWidth: '240px', lineHeight: 1.4 }}>
                Architectural engineering meets fine digital art direction.
              </p>
            </div>

            {/* Bottom details & barcode */}
            <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <span className="tech-label" style={{ display: 'block', fontSize: '0.65rem', marginBottom: '4px', color: '#71717a' }}>
                    CAPABILITIES
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: '#e4e4e7', display: 'block' }}>
                    WEB DEV & DESIGN
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.65rem', color: '#a1a1aa' }}>
                    SAAS · E-COM · WEB3
                  </span>
                </div>
                {/* Visual barcode glyph */}
                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '24px' }} aria-hidden="true">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: i % 3 === 0 ? '2px' : '1px',
                        height: `${8 + h * 1.6}px`,
                        backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= BACK FACE ================= */}
          <div className="card-face card-face-back">
            <span className="corner-mark corner-tl">+</span>
            <span className="corner-mark corner-tr">+</span>
            <span className="corner-mark corner-bl">+</span>
            <span className="corner-mark corner-br">+</span>

            {/* Back Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              <span className="tech-label" style={{ color: '#a1a1aa' }}>
                THE PIPELINE
              </span>
              <span className="font-mono" style={{ fontSize: '0.68rem', color: '#52525b' }}>
                [ DETERMINISTIC ]
              </span>
            </div>

            {/* Center Flow Steps */}
            <div style={{ position: 'relative', zIndex: 2, padding: '16px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { step: '01', title: 'IDEA', detail: 'Deconstruct & Architect' },
                  { step: '02', title: 'DESIGN', detail: 'Art Direction & Systems' },
                  { step: '03', title: 'DEVELOPMENT', detail: 'Full-Stack Engineering' },
                  { step: '04', title: 'EXPERIENCE', detail: 'Production Hardened' }
                ].map((item, idx, arr) => (
                  <div key={item.step} style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <span className="font-mono" style={{ fontSize: '0.68rem', color: '#71717a' }}>{item.step}</span>
                      <span className="font-display" style={{ fontSize: '0.92rem', fontWeight: 700, letterSpacing: '0.04em', color: '#fafafa' }}>
                        {item.title}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.65rem', color: '#a1a1aa', marginLeft: 'auto' }}>
                        {item.detail}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div style={{ paddingLeft: '14px', margin: '3px 0' }}>
                        <span className="font-mono" style={{ fontSize: '0.65rem', color: '#3f3f46' }}>↓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Back Footer */}
            <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                {['WEB', 'SAAS', 'FINTECH', 'E-COMMERCE', 'UI/UX', '3D'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono"
                    style={{
                      fontSize: '0.62rem',
                      color: '#a1a1aa',
                      padding: '2px 6px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '2px'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.62rem', color: '#52525b' }}>
                  VERIFIED BY MTCX DEV
                </span>
                <span className="font-mono" style={{ fontSize: '0.62rem', color: '#71717a' }}>
                  2026 // PROD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
