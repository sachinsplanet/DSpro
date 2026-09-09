import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ROLES, Role } from '../data/rolesData';

interface DSCECareerCarouselProps {
  onSelectRole?: (roleId: string) => void;
}

export const DSCECareerCarousel: React.FC<DSCECareerCarouselProps> = ({ onSelectRole }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Text crossfade states: 300ms fade-out, text-swap, 350ms fade-in
  const [displayedTitle, setDisplayedTitle] = useState(ROLES[0].title);
  const [titleFading, setTitleFading] = useState(false);

  const titleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  // Cleanup pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  // Preload all 7 images on mount
  useEffect(() => {
    ROLES.forEach((role) => {
      const img = new Image();
      img.src = role.src;
    });
  }, []);

  // Screen width detection for mobile calculations (< 640px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handler
  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex =
      direction === 'next'
        ? (activeIndex + 1) % ROLES.length
        : (activeIndex + ROLES.length - 1) % ROLES.length;

    // Start title crossfade: fade out old title over 300ms
    setTitleFading(true);

    if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
    titleTimeoutRef.current = setTimeout(() => {
      // Swap text content at 300ms
      setDisplayedTitle(ROLES[nextIndex].title);
      // Fade in new title over 350ms
      setTitleFading(false);
      titleTimeoutRef.current = null;
    }, 300);

    setActiveIndex(nextIndex);

    // Release animation lock after 650ms
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      animTimeoutRef.current = null;
    }, 650);
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isAnimating]);

  // Derived visible role slot indices
  const centerIndex = activeIndex;
  const leftIndex = (activeIndex + ROLES.length - 1) % ROLES.length;
  const rightIndex = (activeIndex + 1) % ROLES.length;
  const backIndex = (activeIndex + 2) % ROLES.length;

  // Fractal noise grain data URI
  const grainDataUri =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23noise)' opacity='0.08'/></svg>";

  const activeRole = ROLES[activeIndex] || ROLES[0];

  return (
    <section
      id="dsce-career-explorer"
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: activeRole.bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full h-screen overflow-hidden">
        {/* 1. Grain overlay (z-50) */}
        <div
          id="grain-overlay"
          className="absolute inset-0 pointer-events-none z-50 opacity-40"
          style={{
            backgroundImage: `url("${grainDataUri}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
          aria-hidden="true"
        />

        {/* 2. Giant ghost text — active role's title (z-2) */}
        <div
          id="ghost-title-container"
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]"
          style={{ top: '18%' }}
          aria-hidden="true"
        >
          <h2
            id="ghost-role-title"
            className="font-black text-white uppercase text-center max-w-[90vw]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(50px, 9vw, 140px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              whiteSpace: 'normal',
              opacity: titleFading ? 0 : 1,
              transition: titleFading
                ? 'opacity 300ms ease-out'
                : 'opacity 350ms ease-in',
            }}
          >
            {displayedTitle}
          </h2>
        </div>

        {/* 3. Top-left brand label "DSCE" (z-60) */}
        <div
          id="dsce-brand-label"
          className="absolute top-6 left-4 sm:left-8 z-[60] text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em]"
        >
          DSCE
        </div>

        {/* 4. Carousel figurines (z-3) */}
        <div id="carousel-viewport" className="absolute inset-0 z-[3]">
          {ROLES.map((role, idx) => {
            let slotStyle: React.CSSProperties = {};

            if (idx === centerIndex) {
              // center
              slotStyle = {
                transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
                filter: 'blur(0px)',
                opacity: 1,
                zIndex: 20,
                left: '50%',
                height: isMobile ? '60%' : '92%',
                bottom: isMobile ? '22%' : 0,
                pointerEvents: 'auto',
              };
            } else if (idx === leftIndex) {
              // left
              slotStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(2px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '20%' : '30%',
                height: isMobile ? '16%' : '28%',
                bottom: isMobile ? '32%' : '12%',
                pointerEvents: 'auto',
              };
            } else if (idx === rightIndex) {
              // right
              slotStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(2px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '80%' : '70%',
                height: isMobile ? '16%' : '28%',
                bottom: isMobile ? '32%' : '12%',
                pointerEvents: 'auto',
              };
            } else if (idx === backIndex) {
              // back
              slotStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(4px)',
                opacity: 1,
                zIndex: 5,
                left: '50%',
                height: isMobile ? '13%' : '22%',
                bottom: isMobile ? '32%' : '12%',
                pointerEvents: 'none',
              };
            } else {
              // far (hidden, remaining 3 roles)
              slotStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(4px)',
                opacity: 0,
                pointerEvents: 'none',
                zIndex: 0,
                left: '50%',
                height: isMobile ? '13%' : '22%',
                bottom: isMobile ? '32%' : '12%',
              };
            }

            return (
              <div
                key={role.id}
                id={`carousel-item-${role.id}`}
                className="absolute cursor-pointer"
                onClick={() => {
                  if (idx === leftIndex) navigate('prev');
                  else if (idx === rightIndex) navigate('next');
                }}
                style={{
                  ...slotStyle,
                  aspectRatio: '0.6 / 1',
                  transition:
                    'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, filter, opacity',
                }}
              >
                <img
                  src={role.src}
                  alt={role.title}
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left info panel (z-60) */}
        <div
          id="role-info-panel"
          className="absolute bottom-6 left-4 sm:bottom-16 sm:left-24 z-[60] max-w-[360px]"
        >
          {/* Eyebrow label */}
          <p
            id="role-eyebrow-label"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white opacity-70 mb-2"
          >
            CAREER PROFILE
          </p>

          {/* Role Name */}
          <p
            id="role-name-display"
            className="font-bold uppercase text-lg sm:text-2xl text-white opacity-[0.98] mb-2"
            style={{
              opacity: titleFading ? 0 : 0.98,
              transition: titleFading
                ? 'opacity 300ms ease-out'
                : 'opacity 350ms ease-in',
            }}
          >
            {displayedTitle}
          </p>

          {/* Tagline (hidden on mobile) */}
          <p
            id="role-tagline"
            className="hidden sm:block text-xs sm:text-sm text-white opacity-85 leading-[1.6] mb-3 font-normal"
          >
            {activeRole.tagline}
          </p>

          {/* Skills Row */}
          <div
            id="role-skills-row"
            className="flex flex-wrap gap-1.5 mb-2"
            aria-label="Core Skills"
          >
            {activeRole.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-[10px] border border-white/40 rounded-sm text-white bg-white/10 select-none"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Tools Row */}
          <div
            id="role-tools-row"
            className="flex flex-wrap gap-1.5 mb-4 sm:mb-5"
            aria-label="Primary Tools"
          >
            {activeRole.tools.map((tool, index) => (
              <span
                key={index}
                className="px-2 py-1 text-[10px] border border-white/40 rounded-sm text-white bg-white/10 select-none"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Circular Navigation Buttons */}
          <div id="carousel-nav-controls" className="flex items-center space-x-3">
            <button
              id="carousel-prev-btn"
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-white flex items-center justify-center text-white cursor-pointer hover:scale-[1.08] hover:bg-white/12 transition-all duration-150 disabled:opacity-60"
              aria-label="Previous Career Role"
            >
              <ArrowLeft className="w-[26px] h-[26px]" strokeWidth={2.25} />
            </button>
            <button
              id="carousel-next-btn"
              onClick={() => navigate('next')}
              disabled={isAnimating}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-white flex items-center justify-center text-white cursor-pointer hover:scale-[1.08] hover:bg-white/12 transition-all duration-150 disabled:opacity-60"
              aria-label="Next Career Role"
            >
              <ArrowRight className="w-[26px] h-[26px]" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right CTA "EXPLORE ROLE" (z-60) */}
        <div
          id="explore-role-cta"
          className="absolute bottom-6 right-4 sm:bottom-16 sm:right-10 z-[60]"
        >
          <button
            id="explore-role-button"
            onClick={() => {
              if (onSelectRole) {
                onSelectRole(activeRole.id);
              }
            }}
            className="flex items-center space-x-2 text-white opacity-95 hover:opacity-100 uppercase transition-opacity duration-200 cursor-pointer group"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(16px, 2.6vw, 34px)',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              textDecoration: 'none',
            }}
          >
            <span className="group-hover:translate-x-0.5 transition-transform duration-150">
              EXPLORE ROLE
            </span>
            <ArrowRight
              className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-1.5 transition-transform duration-150"
              strokeWidth={2.25}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
