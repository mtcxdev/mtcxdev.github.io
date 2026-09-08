import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Mail } from 'lucide-react';

interface CtaProps {
  onOpenContact: () => void;
}

export const CtaSection: React.FC<CtaProps> = ({ onOpenContact }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '160px 24px 120px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#060608'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '24px',
            maxWidth: '900px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="font-mono" style={{ fontSize: '0.82rem', color: '#71717a' }}>
              // NEXT STEPS
            </span>
            <span style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span className="tech-badge">CURRENTLY BOOKING</span>
          </div>

          <span
            className="font-mono"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              color: '#a1a1aa',
              letterSpacing: '0.04em'
            }}
          >
            HAVE AN IDEA?
          </span>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.8rem, 6.8vw, 6.2rem)',
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: '8px'
            }}
          >
            LET'S BRING IT<br />
            TO LIFE.
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.4vw, 1.28rem)',
              lineHeight: 1.6,
              color: '#a1a1aa',
              maxWidth: '560px',
              marginBottom: '24px'
            }}
          >
            Tell us what you're building. We'll engineer the architecture, design the interface, and take it live.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '36px'
            }}
          >
            <button onClick={onOpenContact} className="btn-primary" style={{ padding: '14px 28px', fontSize: '0.85rem' }}>
              Start a project
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Direct Email Cards */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '28px',
              width: '100%'
            }}
          >
            {[
              { email: 'dev@mtcx.store', label: 'OFFICIAL DEV DESK' },
              { email: 'devmtcx@gmail.com', label: 'DIRECT INQUIRIES' }
            ].map(({ email, label }) => (
              <div
                key={email}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#0d0d10',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '3px',
                  padding: '10px 16px'
                }}
              >
                <Mail size={14} style={{ color: '#71717a' }} />
                <div>
                  <span className="tech-label" style={{ display: 'block', fontSize: '0.6rem' }}>
                    {label}
                  </span>
                  <a
                    href={`mailto:${email}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: '#fafafa',
                      textDecoration: 'none'
                    }}
                  >
                    {email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(email)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedEmail === email ? '#22c55e' : '#71717a',
                    cursor: 'pointer',
                    padding: '4px',
                    marginLeft: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Copy email to clipboard"
                  aria-label={`Copy ${email} to clipboard`}
                >
                  {copiedEmail === email ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
