'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { NavBar } from './nav-bar';
import { Footer } from './footer';
import { HomeSection } from './home-section';
import { LearnAISection } from './learn-ai-section';
import { CVSection } from './cv-section';
import { OfficeSection } from './office-section';
import { ResourcesSection } from './resources-section';
import { RightsSection } from './rights-section';
import { ContactsSection } from './contacts-section';
import { AIAssistant } from './ai-assistant';
import { OnboardingWizard } from './onboarding-wizard';
import { ToolsSection } from './tools-section';
import { EventsSection } from './events-section';
import { CoursesLibrarySection } from './courses-library-section';
import { CommunitySection } from './community-section';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PWAStatus } from './pwa-status';

export function ManosAbiertasApp() {
  const { activeSection, readingMode } = useAppStore();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Apply reading mode to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-reading-mode', readingMode);
    }
  }, [readingMode]);

  return (
    <div className="min-h-screen flex flex-col">
      <PWAStatus />
      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <NavBar />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'home' && <HomeSection />}
            {activeSection === 'learn-ai' && <LearnAISection />}
            {activeSection === 'cv' && <CVSection />}
            {activeSection === 'office' && <OfficeSection />}
            {activeSection === 'resources' && <ResourcesSection />}
            {activeSection === 'rights' && <RightsSection />}
            {activeSection === 'tools' && <ToolsSection />}
            {activeSection === 'events' && <EventsSection />}
            {activeSection === 'courses' && <CoursesLibrarySection />}
            {activeSection === 'community' && <CommunitySection />}
            {activeSection === 'contacts' && <ContactsSection />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Back to top - positioned to not collide with AI assistant */}
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-20 right-4 z-30 print:hidden"
          >
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              size="icon"
              variant="outline"
              className="rounded-full shadow-lg h-10 w-10 bg-card/90 backdrop-blur"
              aria-label="Volver arriba"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant - floating chat widget */}
      <AIAssistant />

      {/* Onboarding wizard - shows on first visit */}
      <OnboardingWizard />
    </div>
  );
}
