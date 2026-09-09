import React, { useState } from 'react';
import { IMPORTANCE_REASONS } from '../data/content';
import { CheckCircle2, TrendingUp, Sparkles, SlidersHorizontal, RefreshCw, Zap } from 'lucide-react';

export const WhyImportant: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    '01': CheckCircle2,
    '02': SlidersHorizontal,
    '03': TrendingUp,
    '04': RefreshCw,
    '05': Zap,
    '06': Sparkles,
  };

  return (
    <section id="importance" className="py-24 px-4 md:px-8 bg-[#f1efe8] text-[#08090d] relative">
      <div className="w-full max-w-[1140px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-mono-code text-[#a54f40] tracking-widest uppercase mb-2">
              02 / The value
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.9]">
              Why Is Data Science{' '}
              <em className="font-serif-display italic font-normal text-[#a54f40]">
                Important?
              </em>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#63656c] max-w-sm">
            The discipline connects evidence to high-stakes decisions across nearly every modern
            enterprise and public institution.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(8,9,13,0.15)] border border-[rgba(8,9,13,0.15)] rounded-sm overflow-hidden">
          {IMPORTANCE_REASONS.map((reason) => {
            const Icon = iconMap[reason.number] || Sparkles;
            const isHovered = activeCard === reason.number;

            return (
              <article
                key={reason.number}
                id={`reason-card-${reason.number}`}
                onMouseEnter={() => setActiveCard(reason.number)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative min-h-[19rem] p-7 overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-default ${
                  isHovered
                    ? 'bg-[#08090d] text-[#f1efe8]'
                    : 'bg-[#f1efe8] text-[#08090d]'
                }`}
              >
                {/* Decorative expanding circular ring on hover */}
                <div
                  className={`absolute -right-12 -bottom-12 w-36 h-36 rounded-full border border-current pointer-events-none transition-all duration-500 ease-out ${
                    isHovered ? 'scale-150 opacity-20' : 'scale-100 opacity-10'
                  }`}
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono-code text-xs tracking-wider font-medium ${
                      isHovered ? 'text-[#d7ff54]' : 'text-[#85878c]'
                    }`}
                  >
                    {reason.number}
                  </span>
                  <span
                    className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded ${
                      isHovered
                        ? 'bg-[rgba(215,255,84,0.15)] text-[#d7ff54]'
                        : 'bg-[rgba(8,9,13,0.06)] text-[#63656c]'
                    }`}
                  >
                    {reason.category}
                  </span>
                </div>

                <div className="my-auto py-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isHovered ? 'text-[#d7ff54]' : 'text-[#a54f40]'
                      }`}
                    />
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
                      {reason.title}
                    </h3>
                  </div>

                  <p
                    className={`text-sm leading-relaxed transition-colors duration-200 ${
                      isHovered ? 'text-[rgba(241,239,232,0.8)]' : 'text-[#65676d]'
                    }`}
                  >
                    {reason.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div
                  className={`w-full h-[1px] transition-colors duration-200 ${
                    isHovered ? 'bg-[rgba(215,255,84,0.3)]' : 'bg-[rgba(8,9,13,0.15)]'
                  }`}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
