import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onActionClick?: (action: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onActionClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'The Field', action: 'What', href: '#what' },
    { label: 'Why It Matters', action: 'Why', href: '#importance' },
    { label: '03 / The Roles', action: 'Careers', href: '#dsce-career-explorer' },
    { label: 'Skills', action: 'Skills', href: '#skills' },
    { label: 'Journey', action: 'Journey', href: '#journey' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, action: string, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onActionClick) {
      onActionClick(action);
    } else {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="main-navigation"
      className="relative z-30 flex flex-row items-center justify-between gap-4 px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full"
    >
      {/* Zone 1: Brand Logo */}
      <a
        id="nav-logo"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          setMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (onActionClick) {
            onActionClick('Home');
          }
        }}
        className="text-2xl sm:text-3xl tracking-tight text-foreground select-none cursor-pointer whitespace-nowrap shrink-0"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        DSpro<sup className="text-xs">®</sup>
      </a>

      {/* Zone 2: Desktop & Tablet Navigation Links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium text-foreground/80">
        {navLinks.map((item) => (
          <a
            key={item.action}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.action, item.href)}
            className="hover:text-[#d7ff54] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Zone 3: Primary Action & Mobile Menu Trigger */}
      <div className="flex items-center gap-2.5 shrink-0">
        <Button
          asChild
          id="nav-cta-button"
          variant="liquid"
          size="nav"
          className="liquid-glass rounded-full px-4 sm:px-6 py-2 sm:py-2.5 min-h-[40px] text-xs sm:text-sm text-foreground hover:scale-[1.03] transition-transform duration-200 cursor-pointer whitespace-nowrap shrink-0"
        >
          <a
            href="https://roadmap.sh/ai-data-scientist"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (onActionClick) {
                onActionClick('Begin Journey');
              }
            }}
          >
            Begin Journey
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

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-hero-nav-drawer"
          className="absolute top-full left-4 right-4 mt-2 p-3 rounded-2xl bg-[#08090d]/95 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col gap-1 md:hidden z-50"
        >
          {navLinks.map((item) => (
            <a
              key={item.action}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.action, item.href)}
              className="px-4 py-3 rounded-xl text-xs font-mono-code uppercase tracking-wider text-[#f1efe8] hover:bg-white/10 hover:text-[#d7ff54] transition-colors flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-[#d7ff54]">&rarr;</span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
