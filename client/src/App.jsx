import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Initiative } from './components/Initiative';
import { ProblemSection } from './components/ProblemSection';
import { ProductShowcase } from './components/ProductShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { ResourceGrid } from './components/ResourceGrid';
import { SustainabilitySection } from './components/SustainabilitySection';
import { DemoSection } from './components/DemoSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ImageModal } from './components/ImageModal';
import { VideoModal } from './components/VideoModal';
import { DEMO_VIDEO_CONFIG } from './data/websiteContent';

export function App() {
  const [activeSection, setActiveSection] = useState('top');
  const [modalImage, setModalImage] = useState(null);
  const [videoModalConfig, setVideoModalConfig] = useState(null);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = ['top', 'initiative', 'problem', 'product', 'how-it-works', 'resources', 'sustainability', 'demo', 'team', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDemo = () => {
    const demoEl = document.getElementById('demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenVideo = (config = DEMO_VIDEO_CONFIG) => {
    setVideoModalConfig(config);
  };

  return (
    <div className="site-wrapper" id="page-root">
      {/* Navigation Bar */}
      <Navbar onOpenDemo={handleOpenDemo} activeSection={activeSection} />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onOpenDemo={handleOpenDemo}
          onOpenVideo={() => handleOpenVideo(DEMO_VIDEO_CONFIG)}
          onOpenImageModal={setModalImage}
        />

        {/* Section 6: Our Initiative */}
        <Initiative />

        {/* Section 7: The Problem */}
        <ProblemSection />

        {/* Section 8: Meet Weave Kiran */}
        <ProductShowcase
          onOpenDemo={handleOpenDemo}
          onOpenImageModal={setModalImage}
        />

        {/* Section 9: How It Works */}
        <WorkflowSection />

        {/* Section 10: Built with Limited Resources */}
        <ResourceGrid />

        {/* Section 11: Sustainability & Impact */}
        <SustainabilitySection />

        {/* Section 12: See Weave Kiran in Action (Interactive Workbench + Video) */}
        <DemoSection onOpenVideoModal={handleOpenVideo} />

        {/* Section 13: Team Swadeshi Innovators */}
        <TeamSection />

        {/* Section 14: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Image Lightbox Modal */}
      {modalImage && (
        <ImageModal data={modalImage} onClose={() => setModalImage(null)} />
      )}

      {/* Video Demonstration Modal */}
      {videoModalConfig && (
        <VideoModal
          config={videoModalConfig}
          onClose={() => setVideoModalConfig(null)}
          onLaunchSimulator={handleOpenDemo}
        />
      )}
    </div>
  );
}

export default App;
