import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ROLES, Role } from '../data/rolesData';
import { RoleExplorerModal } from './RoleExplorerModal';

interface DSCECareerCarouselProps {
  selectedRoleId?: string;
  onSelectRole?: (roleId: string) => void;
}

export const DSCECareerCarousel: React.FC<DSCECareerCarouselProps> = ({
  selectedRoleId,
  onSelectRole,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [internalModalOpen, setInternalModalOpen] = useState(false);

  // Text crossfade states: 300ms fade-out, text-swap, 350ms fade-in
  const [displayedTitle, setDisplayedTitle] = useState(ROLES[0].title);
  const [titleFading, setTitleFading] = useState(false);

  const titleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  // Sync carousel with externally selected role
  useEffect(() => {
    if (!selectedRoleId) return;
    const foundIdx = ROLES.findIndex((r) => r.id === selectedRoleId);
    if (foundIdx !== -1 && foundIdx !== activeIndexRef.current) {
      setActiveIndex(foundIdx);
      setDisplayedTitle(ROLES[foundIdx].title);
    }
  }, [selectedRoleId]);

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

  const handleOpenProfile = () => {
    if (onSelectRole) {
      onSelectRole(activeRole.id);
    } else {
      setInternalModalOpen(true);
    }
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
                  else if (idx === centerIndex) handleOpenProfile();
                }}
                title={idx === centerIndex ? `Click to inspect ${role.title} Career Profile` : role.title}
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

        {/* 5. Non-overlapping Centralized Bottom Controls Bar (z-30) */}
        <div
          id="carousel-controls-bar"
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 px-4 sm:px-8 md:px-14 lg:px-20 z-30 flex flex-row justify-between items-center pointer-events-none"
        >
          {/* Left Navigation & Current Track Pill */}
          <div
            id="carousel-info-panel"
            className="flex items-center space-x-2.5 sm:space-x-4 pointer-events-auto bg-black/50 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/15 shadow-xl"
          >
            {/* Circular Navigation Buttons */}
            <div id="carousel-nav-controls" className="flex items-center space-x-1.5 sm:space-x-2">
              <button
                id="carousel-prev-btn"
                type="button"
                onClick={() => navigate('prev')}
                disabled={isAnimating}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/20 border border-white/30 hover:border-white flex items-center justify-center text-white cursor-pointer transition-all disabled:opacity-50 active:scale-95"
                aria-label="Previous Career Role"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.25} />
              </button>
              <button
                id="carousel-next-btn"
                type="button"
                onClick={() => navigate('next')}
                disabled={isAnimating}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/20 border border-white/30 hover:border-white flex items-center justify-center text-white cursor-pointer transition-all disabled:opacity-50 active:scale-95"
                aria-label="Next Career Role"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.25} />
              </button>
            </div>

            {/* Track indicator and current role label */}
            <div className="flex items-center space-x-2 border-l border-white/20 pl-2.5 sm:pl-3.5">
              <span className="text-[10px] sm:text-xs font-mono text-white/60 tracking-wider">
                0{activeIndex + 1}&nbsp;/&nbsp;0{ROLES.length}
              </span>
              <span
                id="role-name-display"
                className="text-xs sm:text-sm font-bold uppercase tracking-tight text-white whitespace-nowrap max-w-[130px] sm:max-w-[240px] truncate"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  opacity: titleFading ? 0 : 1,
                  transition: titleFading ? 'opacity 250ms ease-out' : 'opacity 300ms ease-in',
                }}
              >
                {displayedTitle}
              </span>
            </div>
          </div>

          {/* Right CTA Button: Opens the Deep Career Profile Modal */}
          <div
            id="explore-role-cta"
            className="pointer-events-auto bg-black/50 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-white/15 shadow-xl flex items-center"
          >
            <button
              id="explore-role-button"
              type="button"
              onClick={handleOpenProfile}
              className="flex items-center space-x-1.5 sm:space-x-2 text-white hover:text-[#d7ff54] uppercase transition-colors duration-200 cursor-pointer group"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(11px, 1.3vw, 15px)',
                letterSpacing: '0.04em',
              }}
            >
              <span>EXPLORE ROLE</span>
              <ArrowRight
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-150"
                strokeWidth={2.25}
              />
            </button>
          </div>
        </div>

        {/* Fallback Internal Modal when onSelectRole is not passed */}
        {!onSelectRole && (
          <RoleExplorerModal
            role={activeRole}
            isOpen={internalModalOpen}
            onClose={() => setInternalModalOpen(false)}
            onNavigate={(dir) => navigate(dir)}
          />
        )}
      </div>
    </section>
  );
};
