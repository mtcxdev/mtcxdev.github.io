import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { TechnicalCredibility } from './components/TechnicalCredibility';
import { CreativeStatement } from './components/CreativeStatement';
import { AboutSection } from './components/AboutSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import type { LightboxItem } from './components/LightboxModal';
import { ContactDrawer } from './components/ContactDrawer';

export function App() {
  const [contactOpen, setContactOpen] = useState(false);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (items: LightboxItem[], startIndex = 0) => {
    setLightboxItems(items);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxItems.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#08080a' }}>
      {/* Background Architectural Grid & Grain */}
      <div className="technical-grid-bg" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* Navigation Header */}
      <Header onOpenContact={() => setContactOpen(true)} />

      {/* Main Content */}
      <main id="main-content">
        <Hero onOpenContact={() => setContactOpen(true)} />
        <Portfolio onOpenLightbox={openLightbox} />
        <ServicesSection />
        <ProcessSection />
        <TechnicalCredibility />
        <CreativeStatement />
        <AboutSection />
        <CtaSection onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Interactive Screenshot Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />

      {/* Slide-In Project Inquiry Drawer */}
      <ContactDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

export default App;
