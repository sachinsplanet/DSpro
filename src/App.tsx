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
import { ROLES, Role } from './data/rolesData';
import { ChevronDown } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('Begin Journey');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 600, y: 400 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setScrollProgress(progress);
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

  const handleAction = (action: string) => {
    if (action === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (action === 'Begin Journey') {
      return;
    }
    if (action === 'Explore the field' || action === 'What') {
      const whatEl = document.getElementById('what');
      if (whatEl) {
        whatEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (action === 'Careers' || action === 'Studio') {
      const carouselEl = document.getElementById('dsce-career-explorer');
      if (carouselEl) {
        carouselEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (action === 'Value' || action === 'Why') {
      const el = document.getElementById('importance');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (action === 'Industries') {
      const el = document.getElementById('industries');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (action === 'Future') {
      const el = document.getElementById('future');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (action === 'Skills') {
      const el = document.getElementById('skills');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (action === 'Journey') {
      const el = document.getElementById('journey');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (action === 'Presenter' || action === 'Details') {
      const el = document.getElementById('details');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    setModalTopic(action);
    setModalOpen(true);
  };

  const handleSelectRole = (roleId: string) => {
    const found = ROLES.find((r) => r.id === roleId) || ROLES[0];
    setSelectedRole(found);
    setRoleModalOpen(true);
  };

  const scrollToExplorer = () => {
    const el = document.getElementById('top-interactive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground selection:bg-[#d7ff54] selection:text-[#08090d]">
      {/* Top Scroll Progress Indicator */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 w-full h-[3px] bg-[#d7ff54] origin-left z-50 pointer-events-none shadow-[0_0_10px_#d7ff54]"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* SECTION 1: Top Hero Section with Looping Video */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Fullscreen Looping Background Video */}
        <video
          ref={videoRef}
          id="bg-hero-video"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />

        {/* Glassmorphic Navigation Bar */}
        <Navigation onActionClick={handleAction} />

        {/* Cinematic Centered Hero Section */}
        <main className="flex-1 flex items-center justify-center">
          <HeroSection onBeginJourney={() => handleAction('Begin Journey')} />
        </main>

        {/* Scroll Indicator down to 3D Data Model & Field Overview */}
        <div className="relative z-10 pb-6 flex flex-col items-center justify-center">
          <button
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
      <div id="top-interactive">
        <Hero cursorX={cursor.x} cursorY={cursor.y} />
      </div>

      {/* SECTION 3: What Is Data Science? (01 / The field) */}
      <WhatIsDataScience />

      {/* SECTION 4: Why Is Data Science Important? (02 / The value) */}
      <WhyImportant />

      {/* SECTION 5: DSCE Career Role Carousel ("DSCE Career Explorer" 03 / The roles Showcase) */}
      <DSCECareerCarousel onSelectRole={handleSelectRole} />

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

      {/* SECTION 12: Presentation Details & Footer (09 / Student details: Sachin Gupta) */}
      <Footer />

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
      />
    </div>
  );
}
