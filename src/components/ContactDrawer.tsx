import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check, Copy, Mail } from 'lucide-react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Web Application');
  const [timeline, setTimeline] = useState('1–2 Months');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback generator for authentic transmission
    const subject = encodeURIComponent(`[MTCX Project Inquiry] ${projectType} - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nTimeline: ${timeline}\n\nProject Overview:\n${description}`
    );
    window.open(`mailto:dev@mtcx.store?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  const copyEmail = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedEmail(addr);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div
      className="contact-drawer-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Start a project inquiry"
    >
      <div
        className="contact-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '36px 32px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <span className="tech-label" style={{ display: 'block', marginBottom: '4px' }}>
              PROJECT INQUIRY
            </span>
            <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
              START A PROJECT
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fafafa',
              padding: '8px',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
            aria-label="Close inquiry drawer"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              textAlign: 'center',
              gap: '16px'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22c55e'
              }}
            >
              <Check size={24} />
            </div>
            <h4 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fafafa' }}>
              INQUIRY PREPARED
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#a1a1aa', lineHeight: 1.6, maxWidth: '360px' }}>
              Your email client was opened with your project brief. You can also contact us directly at{' '}
              <strong style={{ color: '#fafafa' }}>dev@mtcx.store</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-primary"
              style={{ marginTop: '16px' }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '0.85rem', color: '#a1a1aa', lineHeight: 1.5 }}>
              Share an overview of what you're looking to build. We review every brief within 24 hours.
            </p>

            {/* Scope selection */}
            <div>
              <label className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
                PROJECT SCOPE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  'Web Application',
                  'E-Commerce Store',
                  'FinTech / Web3',
                  'Custom Website',
                  'API & Backend',
                  'Design System'
                ].map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setProjectType(scope)}
                    style={{
                      padding: '10px 12px',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      textAlign: 'left',
                      backgroundColor: projectType === scope ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
                      border: projectType === scope ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '2px',
                      color: projectType === scope ? '#ffffff' : '#a1a1aa',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="tech-label" style={{ display: 'block', marginBottom: '6px' }}>
                YOUR NAME / COMPANY
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Vance, Founder"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: '#101014',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="tech-label" style={{ display: 'block', marginBottom: '6px' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: '#101014',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="tech-label" style={{ display: 'block', marginBottom: '6px' }}>
                TARGET TIMELINE
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: '#101014',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none'
                }}
              >
                <option value="Under 4 Weeks">Under 4 Weeks (Sprint)</option>
                <option value="1–2 Months">1–2 Months (Standard)</option>
                <option value="3+ Months">3+ Months (Large Scale)</option>
                <option value="Flexible">Flexible / Advisory</option>
              </select>
            </div>

            {/* Project Overview */}
            <div>
              <label className="tech-label" style={{ display: 'block', marginBottom: '6px' }}>
                PROJECT OVERVIEW
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the product, goals, and key features you want to bring online..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: '#101014',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '6px' }}>
              Send Inquiry
              <ArrowRight size={14} />
            </button>

            {/* Direct Email Contacts */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: '10px' }}>
              <span className="tech-label" style={{ display: 'block', marginBottom: '10px' }}>
                PREFER DIRECT EMAIL?
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { addr: 'dev@mtcx.store', label: 'OFFICIAL DEV' },
                  { addr: 'devmtcx@gmail.com', label: 'DIRECT INBOX' }
                ].map(({ addr, label }) => (
                  <div
                    key={addr}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      padding: '8px 12px',
                      borderRadius: '2px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={13} style={{ color: '#71717a' }} />
                      <div>
                        <span className="tech-label" style={{ fontSize: '0.6rem', display: 'block', color: '#71717a' }}>
                          {label}
                        </span>
                        <span className="font-mono" style={{ fontSize: '0.78rem', color: '#e4e4e7' }}>
                          {addr}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyEmail(addr)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: copiedEmail === addr ? '#22c55e' : '#71717a',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title="Copy email"
                    >
                      {copiedEmail === addr ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
