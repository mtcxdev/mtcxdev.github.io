import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from '../router';
import { useRouter } from '../routerContext';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease',
        backgroundColor: scrolled ? 'rgba(8, 8, 10, 0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        padding: scrolled ? '14px 24px' : '24px 24px'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left: Brand Wordmark */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: '#fafafa'
          }}
        >
          <span
            className="font-display"
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff'
            }}
          >
            MTCX DEV
          </span>
          <span
            className="tech-badge"
            style={{
              display: 'none',
              fontSize: '0.62rem',
              padding: '2px 6px',
              backgroundColor: 'rgba(255,255,255,0.03)'
            }}
            id="desktop-brand-badge"
          >
            STUDIO
          </span>
        </Link>

        {/* Center: Editorial Navigation (Desktop) */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
          className="desktop-nav"
        >
          <Link
            to="/work"
            className={`nav-link ${path === '/work' ? 'nav-link-active' : ''}`}
            style={{
              color: path === '/work' ? '#ffffff' : undefined,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {path === '/work' && (
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff'
                }}
              />
            )}
            01 // WORK
          </Link>
          <Link to="/#services" className="nav-link">02 // SERVICES</Link>
          <Link to="/#process" className="nav-link">03 // PROCESS</Link>
          <Link to="/#engineering" className="nav-link">04 // ENGINEERING</Link>
          <Link to="/#about" className="nav-link">05 // ABOUT</Link>
        </nav>

        {/* Right: CTA & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onOpenContact}
            className="btn-primary header-cta-btn"
            style={{
              fontSize: '0.74rem',
              padding: '9px 16px'
            }}
          >
            Start a project
            <ArrowRight size={13} />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fafafa',
              padding: '8px',
              borderRadius: '2px',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#08080a',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 24px 32px rgba(0,0,0,0.8)'
          }}
        >
          <Link
            to="/work"
            className="nav-link"
            style={{
              fontSize: '0.95rem',
              color: path === '/work' ? '#ffffff' : undefined,
              fontWeight: path === '/work' ? 600 : undefined
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            01 // WORK (PROJECTS PAGE)
          </Link>
          <Link
            to="/#services"
            className="nav-link"
            style={{ fontSize: '0.95rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            02 // SERVICES
          </Link>
          <Link
            to="/#process"
            className="nav-link"
            style={{ fontSize: '0.95rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            03 // PROCESS
          </Link>
          <Link
            to="/#engineering"
            className="nav-link"
            style={{ fontSize: '0.95rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            04 // ENGINEERING
          </Link>
          <Link
            to="/#about"
            className="nav-link"
            style={{ fontSize: '0.95rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            05 // ABOUT
          </Link>
          <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
              DIRECT INQUIRIES
            </span>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#e4e4e7' }}>
              dev@mtcx.store
            </span>
          </div>
        </div>
      )}

      {/* Inline responsive style hook for desktop vs mobile nav */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
        @media (min-width: 861px) {
          #desktop-brand-badge {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};
