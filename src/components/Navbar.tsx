import React, { useState, useEffect } from 'react';
import { Menu, X, UserCheck } from 'lucide-react';

interface NavbarProps {
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollProgress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('top');

  const navItems = [
    { label: 'What', href: '#what' },
    { label: 'Why', href: '#importance' },
    { label: 'Careers', href: '#careers' },
    { label: 'Industries', href: '#industries' },
    { label: 'Future', href: '#future' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Disappear while scrolling down, reappear when scrolling up or at top
      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 4) {
        // Scrolling down -> hide header
        setIsVisible(false);
        setIsOpen(false);
      } else if (lastScrollY - currentScrollY > 6) {
        // Scrolling up -> show header
        setIsVisible(true);
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;

      const sections = ['top', 'what', 'importance', 'careers', 'industries', 'future', 'skills', 'journey', 'details'];
      const scrollPosition = currentScrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top scroll progress indicator bar */}
      <div
        id="nav-scroll-progress"
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#d7ff54] z-50 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Floating pill navigation */}
      <header
        id="main-navigation"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[min(1140px,calc(100%-2rem))] min-h-[3.8rem] px-4 md:px-5 py-2.5 rounded-full border border-[rgba(241,239,232,0.16)] bg-[rgba(8,9,13,0.85)] backdrop-blur-xl shadow-2xl flex items-center justify-between transition-all duration-300 ease-in-out ${
          isVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-28 opacity-0 pointer-events-none'
        }`}
      >
        <a
          id="brand-home-link"
          href="#top"
          className="inline-flex items-center gap-2.5 text-xs tracking-wider uppercase font-mono-code text-[#f1efe8] hover:text-[#d7ff54] transition-colors"
          aria-label="Data Science home"
        >
          <span className="w-7 h-7 rounded-full bg-[#d7ff54] text-[#08090d] font-bold grid place-items-center text-xs">
            DS
          </span>
          <span className="font-medium">Data Science / 01</span>
        </a>

        {/* Desktop nav links */}
        <nav
          id="desktop-nav-menu"
          className="hidden md:flex items-center gap-5 text-xs tracking-wider uppercase font-mono-code text-[#9b9da4]"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                id={`nav-link-${item.label.toLowerCase()}`}
                href={item.href}
                className={`transition-colors py-1 px-1.5 rounded ${
                  isActive
                    ? 'text-[#d7ff54] font-semibold'
                    : 'hover:text-[#d7ff54]'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <a
            id="nav-student-btn"
            href="#details"
            className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(215,255,84,0.35)] text-[#d7ff54] hover:bg-[#d7ff54] hover:text-[#08090d] transition-all text-[11px]"
          >
            <UserCheck className="w-3 h-3" />
            <span>Roll 1063</span>
          </a>
        </nav>

        {/* Mobile menu hamburger toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            id="mobile-student-quick"
            href="#details"
            className="text-[10px] uppercase font-mono-code px-2 py-1 rounded-full border border-[rgba(215,255,84,0.4)] text-[#d7ff54]"
          >
            1063
          </a>
          <button
            id="mobile-nav-toggle"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            className="w-9 h-9 grid place-items-center rounded-full border border-[rgba(241,239,232,0.2)] text-[#f1efe8] hover:border-[#d7ff54] transition-colors"
          >
            {isOpen ? <X className="w-4 h-4 text-[#d7ff54]" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <nav
            id="mobile-nav-drawer"
            className="absolute top-[calc(100%+0.6rem)] left-0 right-0 p-3 rounded-2xl border border-[rgba(241,239,232,0.18)] bg-[rgba(8,9,13,0.96)] shadow-2xl backdrop-blur-2xl flex flex-col gap-1 md:hidden"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                id={`mobile-nav-${item.label.toLowerCase()}`}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-lg text-xs uppercase font-mono-code text-[#f1efe8] hover:bg-[rgba(215,255,84,0.1)] hover:text-[#d7ff54] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              id="mobile-nav-details"
              href="#details"
              onClick={() => setIsOpen(false)}
              className="mt-1 px-4 py-2.5 rounded-lg text-xs uppercase font-mono-code text-[#d7ff54] bg-[rgba(215,255,84,0.1)] border border-[rgba(215,255,84,0.3)] flex items-center justify-between"
            >
              <span>Student Details</span>
              <span>Sachin Gupta (1063)</span>
            </a>
          </nav>
        )}
      </header>
    </>
  );
};
