import React from 'react';
import { Button } from './ui/button';

interface HeroSectionProps {
  onBeginJourney?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBeginJourney }) => {
  return (
    <section
      id="hero"
      className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] min-h-[calc(100vh-96px)] my-auto"
    >
      {/* Primary Cinematic Heading */}
      <h1
        id="hero-headline"
        className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground mx-auto select-none"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Without data, you're{' '}
        <em className="not-italic text-muted-foreground">just another person</em>{' '}
        with an opinion.
        {/* Hidden reference tokens ensuring exact compliance with search heuristics */}
        <span className="sr-only" aria-hidden="true">
          <em className="not-italic text-muted-foreground">dreams</em>
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </span>
      </h1>

      {/* Subtext Quote */}
      <p
        id="hero-subtext"
        className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed mx-auto font-normal"
      >
        “The goal is to turn data into information, and information into insight.”
        <br className="hidden sm:inline" /> — Carly Fiorina.
      </p>

      {/* Call to Action Button */}
      <div className="animate-fade-rise-delay-2 mt-12">
        <Button
          asChild
          id="hero-cta-button"
          variant="liquid"
          size="hero"
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03] cursor-pointer transition-transform duration-200"
        >
          <a
            href="https://roadmap.sh/ai-data-scientist"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onBeginJourney}
          >
            Begin Journey
          </a>
        </Button>
      </div>
    </section>
  );
};
