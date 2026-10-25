import React, { useState } from 'react';
import { JOURNEY_STAGES } from '../data/content';
import { Compass, BookOpen, Search, Wrench, Rocket, Sparkles } from 'lucide-react';

export const CareerJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const icons = [BookOpen, Search, Wrench, Rocket, Sparkles];

  return (
    <section
      id="journey"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#08090d] text-[#f1efe8] border-t border-[rgba(241,239,232,0.1)]"
    >
      <div className="w-full max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div>
            <p className="text-xs font-mono-code text-[#d7ff54] tracking-widest uppercase mb-2">
              07 / The path
            </p>
            <h2 className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.9] [text-wrap:balance]">
              Career{' '}
              <em className="font-serif-display italic font-normal text-[#d7ff54]">
                Journey
              </em>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#9b9da4] max-w-md md:max-w-sm">
            A career develops through cumulative mastery: learn the foundations, interrogate real
            data, build predictive tools, and ship scalable systems.
          </p>
        </div>

        {/* 5-Stage Responsive Timeline (1 col mobile, 2 col tablet, 5 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-0 lg:border-t lg:border-[rgba(215,255,84,0.7)]">
          {JOURNEY_STAGES.map((stage, idx) => {
            const Icon = icons[idx] || Compass;
            const isSelected = activeStage === idx;

            return (
              <div
                key={stage.step}
                id={`journey-step-${stage.step}`}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => setActiveStage(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStage(idx);
                  }
                }}
                className={`relative min-h-[12.5rem] sm:min-h-[15rem] lg:min-h-[17rem] p-5 rounded-sm lg:rounded-none border border-[rgba(241,239,232,0.15)] lg:border-y-0 lg:border-r-0 lg:border-l lg:border-[rgba(241,239,232,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  idx === JOURNEY_STAGES.length - 1
                    ? 'lg:border-r lg:border-[rgba(241,239,232,0.15)]'
                    : ''
                } ${
                  isSelected
                    ? 'bg-[rgba(215,255,84,0.07)] border-[#d7ff54]/50 lg:border-[rgba(241,239,232,0.15)]'
                    : 'hover:bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                {/* Glowing bead on desktop timeline line */}
                <span
                  className={`hidden lg:block absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-[#d7ff54] border-[#d7ff54] shadow-[0_0_12px_#d7ff54]'
                      : 'bg-[#08090d] border-[#d7ff54]'
                  }`}
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-xs text-[#d7ff54] tabular-nums">
                      {stage.step} / {stage.phase}
                    </span>
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-[#d7ff54]' : 'text-[#9b9da4]'
                      }`}
                    />
                  </div>

                  <h3 className="mt-5 sm:mt-8 text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-[#f1efe8]">
                    {stage.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#9b9da4] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[rgba(241,239,232,0.08)]">
                  <span className="text-[10px] font-mono-code uppercase text-[#d7ff54] block mb-1">
                    Key Milestone:
                  </span>
                  <p className="text-xs text-[#f1efe8] leading-snug">
                    {stage.milestone}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
