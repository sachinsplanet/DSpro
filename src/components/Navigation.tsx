import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Menu, X, ChevronDown, ExternalLink, Compass } from 'lucide-react';

export interface NavSectionItem {
  num: string;
  label: string;
  shortLabel: string;
  action: string;
  href: string;
  matchIds: string[];
}

export const ALL_SECTIONS: NavSectionItem[] = [
  {
    num: '01',
    label: 'The Field',
    shortLabel: '01 · Field',
    action: 'What',
    href: '#what',
    matchIds: ['what'],
  },
  {
    num: '02',
    label: 'Why It Matters',
    shortLabel: '02 · Value',
    action: 'Why',
    href: '#importance',
    matchIds: ['importance'],
  },
  {
    num: '03',
    label: 'The Roles',
    shortLabel: '03 · Roles',
    action: 'Careers',
    href: '#dsce-career-explorer',
    matchIds: ['dsce-career-explorer', 'careers'],
  },
  {
    num: '04',
    label: 'Industry Reach',
    shortLabel: '04 · Industries',
    action: 'Industries',
    href: '#industries',
    matchIds: ['industries'],
  },
  {
    num: '05',
    label: 'Future Scope',
    shortLabel: '05 · Horizon',
    action: 'Future',
    href: '#future',
    matchIds: ['future'],
  },
  {
    num: '06',
    label: 'Skills Toolkit',
    shortLabel: '06 · Toolkit',
    action: 'Skills',
    href: '#skills',
    matchIds: ['skills'],
  },
  {
    num: '07',
    label: 'Career Journey',
    shortLabel: '07 · Path',
    action: 'Journey',
    href: '#journey',
    matchIds: ['journey'],
  },
  {
    num: '08',
    label: 'Closing Thought',
    shortLabel: '08 · Quote',
    action: 'Quote',
    href: '#quote',
    matchIds: ['quote'],
  },
  {
    num: '09',
    label: 'Student Details',
    shortLabel: '09 · Credits',
    action: 'Details',
    href: '#details',
    matchIds: ['details'],
  },
];

interface NavigationProps {
  onActionClick?: (action: string) => void;
  activeSection?: string;
  isScrolled?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onActionClick,
  activeSection = 'home',
  isScrolled = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const indexDropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop section index popover on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (indexDropdownRef.current && !indexDropdownRef.current.contains(e.target as Node)) {
        setIndexOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIndexOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    action: string,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setIndexOpen(false);
    if (onActionClick) {
      onActionClick(action);
    } else {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeChapter = ALL_SECTIONS.find((sec) => sec.matchIds.includes(activeSection));

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050d1a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
          : 'bg-gradient-to-b from-[#050d1a]/80 via-[#050d1a]/40 to-transparent backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <nav
        id="main-navigation"
        aria-label="Primary presentation navigation"
        className="relative z-30 flex flex-row items-center justify-between gap-3 px-4 sm:px-8 py-3.5 sm:py-4 max-w-7xl mx-auto w-full"
      >
        {/* Zone 1: Brand Logo */}
        <a
          id="nav-logo"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            setIndexOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (onActionClick) {
              onActionClick('Home');
            }
          }}
          className="text-2xl sm:text-3xl tracking-tight text-foreground hover:text-[#d7ff54] transition-colors select-none cursor-pointer whitespace-nowrap shrink-0"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          DSpro<sup className="text-xs">®</sup>
        </a>

        {/* Zone 2: Desktop & Tablet Navigation Links + All 9 Sections Quick-Jump */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5 xl:gap-2 text-xs font-medium text-foreground/80">
          {ALL_SECTIONS.slice(0, 7).map((item) => {
            const isItemActive = item.matchIds.includes(activeSection);
            return (
              <a
                key={item.action}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.action, item.href)}
                aria-current={isItemActive ? 'location' : undefined}
                className={`relative px-2.5 lg:px-3 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isItemActive
                    ? 'text-[#d7ff54] bg-[rgba(215,255,84,0.1)] border border-[rgba(215,255,84,0.3)] font-semibold shadow-[0_0_15px_rgba(215,255,84,0.12)]'
                    : 'text-foreground/80 hover:text-[#d7ff54] hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="hidden xl:inline font-mono-code text-[10px] opacity-65 tabular-nums">
                  {item.num}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}

          {/* Full 9-Section Index Popover Trigger */}
          <div ref={indexDropdownRef} className="relative">
            <button
              id="nav-sections-index-btn"
              type="button"
              onClick={() => setIndexOpen((prev) => !prev)}
              aria-expanded={indexOpen}
              aria-haspopup="true"
              className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                indexOpen || ['quote', 'details'].includes(activeSection)
                  ? 'text-[#d7ff54] bg-[rgba(215,255,84,0.12)] border-[rgba(215,255,84,0.35)]'
                  : 'text-foreground/75 hover:text-[#d7ff54] bg-white/5 border-white/10 hover:border-white/25'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#d7ff54] shrink-0" />
              <span className="tabular-nums">
                {activeChapter ? `${activeChapter.num}/09` : '01–09'}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  indexOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {indexOpen && (
              <div
                id="nav-sections-index-popover"
                role="menu"
                aria-label="All 9 presentation sections"
                className="absolute right-0 top-full mt-2.5 w-72 p-2.5 rounded-2xl bg-[#08090d]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.75)] grid grid-cols-1 gap-1 z-50"
              >
                <div className="px-3 py-1.5 flex items-center justify-between text-[10px] font-mono-code uppercase tracking-widest text-[#9b9da4] border-b border-white/10 mb-1">
                  <span>Presentation Index</span>
                  <span className="text-[#d7ff54]">All 9 Chapters</span>
                </div>
                {ALL_SECTIONS.map((item) => {
                  const isItemActive = item.matchIds.includes(activeSection);
                  return (
                    <a
                      key={item.action}
                      role="menuitem"
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.action, item.href)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono-code transition-colors flex items-center justify-between gap-2 ${
                        isItemActive
                          ? 'bg-[rgba(215,255,84,0.14)] text-[#d7ff54] border border-[rgba(215,255,84,0.3)] font-semibold'
                          : 'text-[#f1efe8] hover:bg-white/10 hover:text-[#d7ff54] border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <span className="text-[11px] text-[#d7ff54] tabular-nums shrink-0">
                          {item.num}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </span>
                      {isItemActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d7ff54] shadow-[0_0_8px_#d7ff54] shrink-0" />
                      ) : (
                        <span className="text-white/40 text-[10px] shrink-0">&rarr;</span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Zone 3: Primary Action & Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            asChild
            id="nav-cta-button"
            variant="liquid"
            size="nav"
            className="liquid-glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 min-h-[40px] text-xs sm:text-sm text-foreground hover:text-[#d7ff54] hover:scale-[1.03] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            <a
              href="https://roadmap.sh/ai-data-scientist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <span>Begin Journey</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75 shrink-0" aria-hidden="true" />
            </a>
          </Button>

          <button
            id="mobile-hero-menu-btn"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle section navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-10 h-10 min-w-[40px] min-h-[40px] rounded-full liquid-glass flex items-center justify-center text-foreground hover:text-[#d7ff54] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer — Full 9-Section Coverage */}
        {mobileMenuOpen && (
          <div
            id="mobile-hero-nav-drawer"
            className="absolute top-full left-3 right-3 mt-2 p-3 rounded-2xl bg-[#08090d]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-1 md:hidden z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-3 py-1.5 flex items-center justify-between text-[10px] font-mono-code uppercase tracking-widest text-[#9b9da4] border-b border-white/10 mb-1">
              <span>Jump to Chapter</span>
              <span className="text-[#d7ff54]">01 – 09</span>
            </div>
            {ALL_SECTIONS.map((item) => {
              const isItemActive = item.matchIds.includes(activeSection);
              return (
                <a
                  key={item.action}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.action, item.href)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-mono-code uppercase tracking-wider transition-colors flex items-center justify-between ${
                    isItemActive
                      ? 'bg-[rgba(215,255,84,0.14)] text-[#d7ff54] border border-[rgba(215,255,84,0.3)] font-semibold'
                      : 'text-[#f1efe8] hover:bg-white/10 hover:text-[#d7ff54]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[#d7ff54] tabular-nums">{item.num}</span>
                    <span>{item.label}</span>
                  </span>
                  <span className="text-[#d7ff54]">&rarr;</span>
                </a>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

