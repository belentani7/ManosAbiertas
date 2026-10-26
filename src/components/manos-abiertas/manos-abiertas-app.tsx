'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { NavBar } from './nav-bar';
import { Footer } from './footer';
import { HomeSection } from './home-section';
import { LearnAISection } from './learn-ai-section';
import { AIAssistant } from './ai-assistant';
import { WelcomePortal } from './welcome-portal';
import { Button } from '@/components/ui/button';
import { ArrowUp, Heart } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { PWAStatus } from './pwa-status';
import { useAppStore, sectionFromHash } from '@/stores/app-store';
import { PORTAL_EVENT, PORTAL_STORAGE_KEY } from '@/lib/version';

// Heavy/later sections are lazy-loaded to shrink the initial bundle.
const CVSection = dynamic(() => import('./cv-section').then((m) => m.CVSection));
const OfficeSection = dynamic(() => import('./office-section').then((m) => m.OfficeSection));
const ResourcesSection = dynamic(() => import('./resources-section').then((m) => m.ResourcesSection));
const RightsSection = dynamic(() => import('./rights-section').then((m) => m.RightsSection));
const ContactsSection = dynamic(() => import('./contacts-section').then((m) => m.ContactsSection));
const ToolsSection = dynamic(() => import('./tools-section').then((m) => m.ToolsSection));
const EventsSection = dynamic(() => import('./events-section').then((m) => m.EventsSection));
const CoursesLibrarySection = dynamic(() => import('./courses-library-section').then((m) => m.CoursesLibrarySection));
const CommunitySection = dynamic(() => import('./community-section').then((m) => m.CommunitySection));
const PricingSection = dynamic(() => import('./pricing-section').then((m) => m.PricingSection));
const DatosSection = dynamic(() => import('./datos-section').then((m) => m.DatosSection));

function PortalSplash() {
  return (
    <div className='portal-splash' role='status' aria-label='Manos Abiertas'>
      <div className='portal-splash-mark' aria-hidden='true'>
        <Heart className='h-7 w-7' />
      </div>
      <span className='portal-display'>Manos Abiertas</span>
    </div>
  );
}

export function ManosAbiertasApp() {
  const [portalPhase, setPortalPhase] = useState<'loading' | 'portal' | 'app'>('loading');
  const { activeSection, setActiveSection, readingMode } = useAppStore();
  const [showTop, setShowTop] = useState(false);
  const reduceMotion = useReducedMotion();

  // Hash-based routing: read the initial hash and stay in sync with it.
  useEffect(() => {
    const initial = sectionFromHash(window.location.hash);
    if (initial) {
      setActiveSection(initial);
    }

    const onHashChange = () => {
      const next = sectionFromHash(window.location.hash);
      if (next) {
        useAppStore.setState({ activeSection: next });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [setActiveSection]);

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

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get('portal') === '1';
    let seen = false;
    try {
      seen = Boolean(localStorage.getItem(PORTAL_STORAGE_KEY));
    } catch {
      seen = false;
    }
    setPortalPhase(forced || !seen ? 'portal' : 'app');
    const openPortal = () => setPortalPhase('portal');
    window.addEventListener(PORTAL_EVENT, openPortal);
    return () => window.removeEventListener(PORTAL_EVENT, openPortal);
  }, []);

  const closePortal = useCallback((section: 'home' | 'keep') => {
    setPortalPhase('app');
    if (section === 'home') setActiveSection('home');
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('portal')) {
        url.searchParams.delete('portal');
        window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
      }
    } catch {
      /* La navegación principal sigue funcionando sin reescribir la URL. */
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [setActiveSection]);

  const handlePortalEnter = useCallback(() => closePortal('home'), [closePortal]);
  const handlePortalSkip = useCallback(() => closePortal('keep'), [closePortal]);

  if (portalPhase === 'loading') return <PortalSplash />;
  if (portalPhase === 'portal') {
    return <WelcomePortal onEnter={handlePortalEnter} onSkip={handlePortalSkip} />;
  }

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
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
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
            {activeSection === 'pricing' && <PricingSection />}
            {activeSection === 'datos' && <DatosSection />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Back to top - positioned to not collide with AI assistant */}
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={reduceMotion ? { duration: 0 } : undefined}
            className="fixed bottom-20 right-4 z-30 print:hidden"
          >
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
              size="icon"
              variant="outline"
              className="rounded-full shadow-lg h-11 w-11 bg-card/90 backdrop-blur"
              aria-label="Volver arriba"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant - floating chat widget */}
      <AIAssistant />

    </div>
  );
}
