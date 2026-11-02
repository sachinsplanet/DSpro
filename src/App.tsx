/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { Hero } from './components/Hero';
import { WhatIsDataScience } from './components/WhatIsDataScience';
import { WhyImportant } from './components/WhyImportant';
import { DSCECareerCarousel } from './components/DSCECareerCarousel';
import { CareerOpportunities } from './components/CareerOpportunities';
import { Industries } from './components/Industries';
import { FutureScope } from './components/FutureScope';
import { SkillsToolkit } from './components/SkillsToolkit';
import { CareerJourney } from './components/CareerJourney';
import { ClosingQuote } from './components/ClosingQuote';
import { Footer } from './components/Footer';
import { JourneyModal } from './components/JourneyModal';
import { RoleExplorerModal } from './components/RoleExplorerModal';
import { RevealOnScroll } from './components/RevealOnScroll';
import { CursorParticleTrail } from './components/CursorParticleTrail';
import { ROLES, Role } from './data/rolesData';
import { ChevronDown } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('Begin Journey');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [cursor, setCursor] = useState({ x: 600, y: 400 });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload all 7 role figurine assets as soon as the app mounts
  useEffect(() => {
    ROLES.forEach((role) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = role.src;
    });
  }, []);

  useEffect(() => {
    const trackedSectionIds = [
      'home',
      'top-interactive',
      'what',
      'importance',
      'dsce-career-explorer',
      'careers',
      'industries',
      'future',
      'skills',
      'journey',
      'quote',
      'details',
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? scrollY / scrollable : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollY > 24);

      // Determine which section occupies the upper-middle reading focal line (35% of viewport height)
      const focalLine = window.innerHeight * 0.35;
      let currentId = 'home';

      for (const id of trackedSectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom >= 80) {
          currentId = id;
        }
      }

      // If scrolled to the very bottom of the page, highlight 09 / Student details
      if (scrollable > 0 && scrollY >= scrollable - 40) {
        currentId = 'details';
      }

      setActiveSection(currentId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  };

  const handleAction = (action: string) => {
    if (action === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (action === 'Begin Journey' || action === 'Overview') {
      if (scrollToElement('top-interactive')) return;
    }
    if (action === 'Explore the field' || action === 'What') {
      if (scrollToElement('what')) return;
    }
    if (action === 'Value' || action === 'Why') {
      if (scrollToElement('importance')) return;
    }
    if (action === 'Careers' || action === 'Studio') {
      if (scrollToElement('dsce-career-explorer')) return;
    }
    if (action === 'RolesDirectory') {
      if (scrollToElement('careers')) return;
    }
    if (action === 'Industries') {
      if (scrollToElement('industries')) return;
    }
    if (action === 'Future') {
      if (scrollToElement('future')) return;
    }
    if (action === 'Skills') {
      if (scrollToElement('skills')) return;
    }
    if (action === 'Journey') {
      if (scrollToElement('journey')) return;
    }
    if (action === 'Quote') {
      if (scrollToElement('quote')) return;
    }
    if (action === 'Presenter' || action === 'Details') {
      if (scrollToElement('details')) return;
    }

    setModalTopic(action);
    setModalOpen(true);
  };

  const handleSelectRole = (roleId: string) => {
    const found = ROLES.find((r) => r.id === roleId) || ROLES[0];
    setSelectedRole(found);
    setRoleModalOpen(true);
  };

  const handleNavigateRole = (direction: 'next' | 'prev') => {
    if (!selectedRole) {
      setSelectedRole(ROLES[0]);
      return;
    }
    const currentIndex = ROLES.findIndex((r) => r.id === selectedRole.id);
    const validIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex =
      direction === 'next'
        ? (validIndex + 1) % ROLES.length
        : (validIndex + ROLES.length - 1) % ROLES.length;
    setSelectedRole(ROLES[nextIndex]);
  };

  const scrollToExplorer = () => {
    scrollToElement('top-interactive');
  };

  return (
    <div className="relative w-full max-w-full min-h-screen bg-background text-foreground selection:bg-[#d7ff54] selection:text-[#08090d] overflow-x-clip">
      {/* Top Scroll Progress Indicator */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 w-full h-[3px] bg-[#d7ff54] origin-left z-50 pointer-events-none shadow-[0_0_10px_#d7ff54]"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Subtle Data-Themed Cursor Particle Trail */}
      <CursorParticleTrail />

      {/* Persistent Sticky Glassmorphic Navigation Bar */}
      <Navigation
        onActionClick={handleAction}
        activeSection={activeSection}
        isScrolled={isScrolled}
      />

      {/* SECTION 1: Top Hero Section with Looping Video & Atmospheric Fallback */}
      <section
        id="home"
        className="relative min-h-screen -mt-[68px] sm:-mt-[76px] pt-[68px] sm:pt-[76px] w-full overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#050d1a] via-[#09152a] to-[#050d1a]"
      >
        {/* Atmospheric Fallback & Poster Backdrop (Always rendered for instant visual presence) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 50% 38%, rgba(215, 255, 84, 0.11) 0%, rgba(168, 231, 249, 0.08) 28%, rgba(5, 13, 26, 0.92) 70%),
              linear-gradient(180deg, #050d1a 0%, #09152a 52%, #050d1a 100%)
            `,
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(215, 255, 84, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168, 231, 249, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '3.5rem 3.5rem',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            }}
          />
        </div>

        {/* Fullscreen Looping Background Video with Smooth Fade-In */}
        {!videoError && (
          <video
            ref={videoRef}
            id="bg-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-1000 ease-out ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          />
        )}

        {/* Cinematic Centered Hero Section */}
        <main className="flex-1 flex items-center justify-center">
          <HeroSection />
        </main>

        {/* Scroll Indicator down to 3D Data Model & Field Overview */}
        <div className="relative z-10 pb-6 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={scrollToExplorer}
            className="flex flex-col items-center text-muted-foreground/80 hover:text-foreground transition-colors cursor-pointer group"
            aria-label="Scroll to 3D Data Intelligence & Overview"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium mb-1.5 opacity-80 group-hover:opacity-100">
              Enter Data Layer
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce opacity-70 group-hover:opacity-100" />
          </button>
        </div>
      </section>

      {/* SECTION 2: 3D Interactive Data Model & Overview Hero */}
      <div
        id="top-interactive"
        className="relative w-full max-w-full overflow-hidden bg-[#050d1a] scroll-mt-16"
      >
        <RevealOnScroll>
          <Hero cursorX={cursor.x} cursorY={cursor.y} />
        </RevealOnScroll>
      </div>

      {/* SECTION 3: What Is Data Science? (01 / The field) */}
      <WhatIsDataScience />

      {/* SECTION 4: Why Is Data Science Important? (02 / The value) */}
      <WhyImportant />

      {/* SECTION 5: DSCE Career Role Carousel ("DSCE Career Explorer" 03 / The roles Showcase) */}
      <RevealOnScroll>
        <DSCECareerCarousel
          selectedRoleId={selectedRole?.id}
          onSelectRole={handleSelectRole}
        />
      </RevealOnScroll>

      {/* SECTION 6: Career Opportunities Directory & Competencies */}
      <CareerOpportunities onSelectRole={handleSelectRole} />

      {/* SECTION 7: Sector Adoption / Data Is Everywhere (04 / Industry reach) */}
      <Industries />

      {/* SECTION 8: Future Scope of Data Science (05 / The horizon) */}
      <FutureScope />

      {/* SECTION 9: Skills to Build a Career (06 / The toolkit) */}
      <SkillsToolkit />

      {/* SECTION 10: Career Journey (07 / The path) */}
      <CareerJourney />

      {/* SECTION 11: Closing Thought Quote (08 / Closing thought) */}
      <ClosingQuote />

      {/* SECTION 12: Presentation Details & Footer (09 / Student details) */}
      <RevealOnScroll>
        <Footer />
      </RevealOnScroll>

      {/* Interactive Detail Modal for Nav */}
      <JourneyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTopic={modalTopic}
      />

      {/* Interactive Deep Profile for Career Roles */}
      <RoleExplorerModal
        role={selectedRole}
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onNavigate={handleNavigateRole}
      />
    </div>
  );
}
