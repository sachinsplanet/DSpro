import React from 'react';
import { Quote } from 'lucide-react';

export const ClosingQuote: React.FC = () => {
  return (
    <section id="quote" className="py-28 px-4 md:px-8 bg-[#ff806d] text-[#08090d] flex items-center justify-center text-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 font-mono-code text-xs uppercase tracking-widest text-[#08090d] opacity-70">
          <Quote className="w-4 h-4" />
          <span>08 / Closing thought</span>
        </div>

        <blockquote className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.85] font-normal max-w-3xl mx-auto">
          &ldquo;Data is the new resource. Data Science transforms it into intelligence.&rdquo;
        </blockquote>

        <p className="mt-8 font-mono-code text-xs sm:text-sm uppercase tracking-widest text-[#08090d] opacity-75">
          The value is not in the data alone — but in what you choose to do with it.
        </p>
      </div>
    </section>
  );
};
