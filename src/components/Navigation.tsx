import React from 'react';
import { Button } from './ui/button';

interface NavigationProps {
  onActionClick?: (action: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onActionClick }) => {
  return (
    <nav
      id="main-navigation"
      className="relative z-10 flex flex-row items-center justify-between px-6 sm:px-8 py-6 max-w-7xl mx-auto w-full"
    >
      {/* Brand Logo */}
      <a
        id="nav-logo"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (onActionClick) {
            onActionClick('Home');
          }
        }}
        className="text-3xl tracking-tight text-foreground select-none cursor-pointer"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        DSpro<sup className="text-xs">®</sup>
      </a>

      {/* CTA Button */}
      <div>
        <Button
          asChild
          id="nav-cta-button"
          variant="liquid"
          size="nav"
          className="liquid-glass rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
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
      </div>
    </nav>
  );
};

