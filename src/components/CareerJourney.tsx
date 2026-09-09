import React, { useState } from 'react';
import { JOURNEY_STAGES } from '../data/content';
import { Compass, BookOpen, Search, Wrench, Rocket, Sparkles } from 'lucide-react';

export const CareerJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const icons = [BookOpen, Search, Wrench, Rocket, Sparkles];

  return (
    <section id="journey" className="py-24 px-4 md:px-8 bg-[#08090d] text-[#f1efe8] border-t border-[rgba(241,239,232,0.1)]">
      <div className="w-full max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-mono-code text-[#d7ff54] tracking-widest uppercase mb-2">
              07 / The path
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.85]">
              Career{' '}
              <em className="font-serif-display italic font-normal text-[#d7ff54]">
                Journey
              </em>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#9b9da4] max-w-sm">
            A career develops through cumulative mastery: learn the foundations, interrogate real
            data, build predictive tools, and ship scalable systems.
          </p>
        </div>

        {/* 5-Stage Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-t border-[rgba(215,255,84,0.7)]">
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
                className={`relative min-h-[17rem] p-5 border-l border-[rgba(241,239,232,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  idx === JOURNEY_STAGES.length - 1 ? 'border-r border-[rgba(241,239,232,0.15)]' : ''
                } ${
                  isSelected
                    ? 'bg-[rgba(215,255,84,0.06)]'
                    : 'hover:bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                {/* Glowing bead on timeline line */}
                <span
                  className={`absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-[#d7ff54] border-[#d7ff54] shadow-[0_0_12px_#d7ff54]'
                      : 'bg-[#08090d] border-[#d7ff54]'
                  }`}
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-xs text-[#d7ff54]">
                      {stage.step} / {stage.phase}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-[#d7ff54]' : 'text-[#9b9da4]'
                      }`}
                    />
                  </div>

                  <h3 className="mt-8 text-2xl sm:text-3xl font-medium tracking-tight text-[#f1efe8]">
                    {stage.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#9b9da4] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(241,239,232,0.08)]">
                  <span className="text-[10px] font-mono-code uppercase text-[#d7ff54] block mb-1">
                    Key Milestone:
                  </span>
                  <p className="text-[11px] text-[#f1efe8] leading-tight">
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
