import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Database, Cpu, TrendingUp, Lightbulb } from 'lucide-react';

interface HeroProps {
  cursorX: number;
  cursorY: number;
}

export const Hero: React.FC<HeroProps> = ({ cursorX, cursorY }) => {
  const [activeTag, setActiveTag] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Calculate 3D tilt based on cursor coordinates relative to center
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;
    const normX = cursorX / width - 0.5;
    const normY = cursorY / height - 0.5;
    setTilt({
      x: normY * -6,
      y: normX * 8,
    });
  }, [cursorX, cursorY]);

  const tags = [
    {
      id: 1,
      code: '01 / Input',
      title: 'Raw data',
      detail: 'Sensors, user logs, clinical EHR, financial transactions',
      icon: Database,
      className: 'top-[10%] left-[2%] -rotate-6',
    },
    {
      id: 2,
      code: '02 / Process',
      title: 'Machine learning',
      detail: 'Neural networks, regression trees, LLM embeddings',
      icon: Cpu,
      className: 'top-[20%] right-[0%] rotate-6',
    },
    {
      id: 3,
      code: '03 / Output',
      title: 'Actionable insight',
      detail: 'Predictive risk scores, forecast graphs, decision matrices',
      icon: TrendingUp,
      className: 'bottom-[12%] right-[4%] -rotate-3',
    },
    {
      id: 4,
      code: '04 / Impact',
      title: 'Real-world change',
      detail: 'Prevented failures, personalized therapies, optimized cities',
      icon: Lightbulb,
      className: 'bottom-[18%] left-[2%] rotate-3',
    },
  ];

  return (
    <section id="top" className="relative min-h-[100svh] pt-32 md:pt-36 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Decorative angled background gradient lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(115deg, transparent 0 48%, rgba(215,255,84,0.06) 48.1%, transparent 48.3%),
            linear-gradient(20deg, transparent 0 70%, rgba(168,231,249,0.05) 70.1%, transparent 70.3%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] items-center gap-12 lg:gap-16 min-h-[calc(100svh-12rem)]">
          {/* Left Hero Copy */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-5 text-[#d7ff54] font-mono-code text-xs tracking-widest uppercase">
              <span className="w-10 h-[1px] bg-current"></span>
              <span>Career Opportunities / Future Scope</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-medium tracking-tight text-[#f1efe8] leading-[0.88] max-w-[12ch]">
              Data{' '}
              <em className="font-serif-display font-normal text-[#d7ff54] tracking-normal italic">
                Science
              </em>{' '}
              Futures
            </h1>

            <p className="mt-7 text-lg md:text-xl xl:text-2xl text-[#f1efe8] font-normal leading-snug max-w-xl">
              Turning Data into Decisions, Insights &amp; Innovation
            </p>

            <p className="mt-4 text-sm md:text-base text-[#9b9da4] leading-relaxed max-w-lg">
              From raw numbers to real-world impact — explore how Data Science is reshaping careers,
              multitrillion-dollar industries, and the technological horizon.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                id="hero-cta-explore"
                href="#what"
                className="inline-flex items-center justify-center min-h-[2.9rem] px-5 py-3 rounded-full border border-[#d7ff54] bg-[#d7ff54] text-[#08090d] font-mono-code text-xs font-semibold uppercase tracking-wider hover:bg-transparent hover:text-[#d7ff54] transition-all hover:-translate-y-0.5 shadow-[0_0_25px_rgba(215,255,84,0.25)]"
              >
                <span>Explore the field</span>
              </a>

              <a
                id="hero-cta-careers"
                href="#careers"
                className="inline-flex items-center justify-center min-h-[2.9rem] px-5 py-3 rounded-full border border-[rgba(241,239,232,0.25)] text-[#f1efe8] font-mono-code text-xs uppercase tracking-wider hover:border-[#d7ff54] hover:text-[#d7ff54] transition-all hover:-translate-y-0.5"
              >
                <span>View 7 key careers</span>
              </a>

              <a
                id="hero-cta-student"
                href="#details"
                className="inline-flex items-center gap-1.5 min-h-[2.9rem] px-4 py-3 rounded-full text-[#9b9da4] hover:text-[#f1efe8] font-mono-code text-xs uppercase transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d7ff54]" />
                <span>Student Info</span>
              </a>
            </div>

            {/* Note & Quick Stats */}
            <div className="mt-12 pt-6 border-t border-[rgba(241,239,232,0.1)] flex flex-wrap items-center gap-6 text-xs text-[#9b9da4] font-mono-code">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-6 h-[1px] bg-[#ff806d]"></span>
                <span className="text-[#ff806d] font-medium">Scroll to enter data layer</span>
              </div>
              <div className="text-[11px] text-[#9b9da4]">
                Presenter: <strong className="text-[#f1efe8]">Sachin Gupta</strong> (Roll: 1063)
              </div>
            </div>
          </div>

          {/* Right Hero Visual (Interactive 3D Stage) */}
          <div
            ref={containerRef}
            className="relative w-full h-[28rem] sm:h-[34rem] lg:h-[38rem] perspective-[1200px] flex items-center justify-center select-none"
            aria-label="Interactive 3D Data Science visual model"
          >
            <div
              className="relative w-full h-full transform-style-3d transition-transform duration-700 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Radial glow halo */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] sm:w-[28rem] aspect-square rounded-full pointer-events-none filter blur-2xl opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(215,255,84,0.18), rgba(168,231,249,0.06) 50%, transparent 70%)',
                  transform: 'translateZ(-40px)',
                }}
              />

              {/* 3D perspective floor grid */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-[36%] origin-bottom pointer-events-none opacity-40"
                style={{
                  transform: 'translateX(-50%) rotateX(66deg) translateZ(-30px)',
                  backgroundImage: `
                    linear-gradient(rgba(215, 255, 84, 0.22) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(215, 255, 84, 0.22) 1px, transparent 1px)
                  `,
                  backgroundSize: '2.2rem 2.2rem',
                  maskImage: 'linear-gradient(to top, black, transparent)',
                }}
              />

              {/* Orbit Ring A (Coral bead) */}
              <div
                className="absolute top-1/2 left-1/2 w-[82%] aspect-square rounded-full border border-[rgba(215,255,84,0.38)] animate-orbit-spin pointer-events-none"
                style={{
                  transform: 'translate(-50%, -50%) rotateX(69deg) rotateZ(13deg) translateZ(45px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <span
                  className="absolute top-1/2 left-0 w-2.5 h-2.5 rounded-full bg-[#ff806d] shadow-[0_0_15px_#ff806d]"
                  aria-hidden="true"
                />
              </div>

              {/* Orbit Ring B (Cyan bead) */}
              <div
                className="absolute top-1/2 left-1/2 w-[70%] aspect-square rounded-full border border-[rgba(168,231,249,0.35)] animate-orbit-spin-reverse pointer-events-none"
                style={{
                  transform: 'translate(-50%, -50%) rotateX(69deg) rotateZ(-40deg) translateZ(70px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <span
                  className="absolute top-0 left-1/2 w-2.5 h-2.5 rounded-full bg-[#a8e7f9] shadow-[0_0_15px_#a8e7f9]"
                  aria-hidden="true"
                />
              </div>

              {/* Orbit Ring C (Acid bead) */}
              <div
                className="absolute top-1/2 left-1/2 w-[58%] aspect-square rounded-full border border-[rgba(255,128,109,0.35)] animate-orbit-spin-outer pointer-events-none"
                style={{
                  transform: 'translate(-50%, -50%) rotateX(69deg) rotateZ(78deg) translateZ(95px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <span
                  className="absolute bottom-1/2 right-0 w-2.5 h-2.5 rounded-full bg-[#d7ff54] shadow-[0_0_15px_#d7ff54]"
                  aria-hidden="true"
                />
              </div>

              {/* Core 3D Sphere */}
              <div
                className="absolute top-1/2 left-1/2 w-[13rem] sm:w-[17rem] md:w-[19rem] aspect-square rounded-full border border-[rgba(215,255,84,0.7)] animate-core-float flex items-center justify-center text-center shadow-[0_0_0_1rem_rgba(215,255,84,0.03),0_0_70px_rgba(215,255,84,0.22),inset_-2rem_-2rem_4rem_rgba(0,0,0,0.75)]"
                style={{
                  transform: 'translate(-50%, -50%) translateZ(80px)',
                  background: `
                    radial-gradient(circle at 33% 28%, rgba(255, 255, 255, 0.85), transparent 6%),
                    radial-gradient(circle at 67% 31%, rgba(168, 231, 249, 0.65), transparent 12%),
                    radial-gradient(circle at 40% 70%, rgba(255, 128, 109, 0.5), transparent 20%),
                    radial-gradient(circle at 50% 50%, #25351e 0%, #101510 48%, #07080b 74%)
                  `,
                }}
              >
                {/* Internal tilted gyroscopic rings */}
                <div
                  className="absolute inset-[10%] rounded-full border border-[rgba(168,231,249,0.4)] pointer-events-none"
                  style={{ transform: 'rotate(38deg) scaleY(0.34)' }}
                />
                <div
                  className="absolute inset-[10%] rounded-full border border-[rgba(255,128,109,0.35)] pointer-events-none"
                  style={{ transform: 'rotate(-46deg) scaleY(0.46)' }}
                />

                {/* Core Label */}
                <div className="relative z-10 font-mono-code text-xs sm:text-sm tracking-widest text-[#f1efe8] uppercase leading-relaxed px-4">
                  <strong className="block text-[#d7ff54] text-base sm:text-lg tracking-wider font-semibold">
                    DATA
                  </strong>
                  <span>intelligence</span>
                  <br />
                  <span className="text-[#9b9da4] text-[10px] sm:text-xs">in motion</span>
                </div>
              </div>

              {/* Interactive Floating Data Pipeline Tags */}
              {tags.map((tag) => {
                const isSelected = activeTag === tag.id;
                const Icon = tag.icon;
                return (
                  <div
                    key={tag.id}
                    id={`hero-tag-${tag.id}`}
                    onMouseEnter={() => setActiveTag(tag.id)}
                    onMouseLeave={() => setActiveTag(null)}
                    onClick={() => setActiveTag(isSelected ? null : tag.id)}
                    className={`absolute z-30 min-w-[7.5rem] sm:min-w-[9.5rem] p-2.5 sm:p-3 border rounded-sm transition-all duration-300 cursor-pointer backdrop-blur-md ${tag.className} ${
                      isSelected
                        ? 'border-[#d7ff54] bg-[rgba(8,9,13,0.95)] shadow-[0_0_20px_rgba(215,255,84,0.35)] scale-105'
                        : 'border-[rgba(241,239,232,0.2)] bg-[rgba(8,9,13,0.8)] shadow-lg hover:border-[#d7ff54]'
                    }`}
                    style={{ transformStyle: 'preserve-3d', transform: 'translateZ(110px)' }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono-code text-[10px] uppercase text-[#d7ff54] tracking-wider">
                        {tag.code}
                      </span>
                      <Icon className="w-3 h-3 text-[#d7ff54]" />
                    </div>
                    <span className="block text-xs sm:text-sm font-medium text-[#f1efe8] mt-0.5">
                      {tag.title}
                    </span>

                    {isSelected && (
                      <p className="mt-1 text-[11px] text-[#9b9da4] leading-tight border-t border-[rgba(241,239,232,0.1)] pt-1">
                        {tag.detail}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="#what"
          className="w-10 h-10 rounded-full border border-[rgba(241,239,232,0.2)] grid place-items-center text-[#9b9da4] hover:text-[#d7ff54] hover:border-[#d7ff54] transition-colors"
          aria-label="Scroll to definition section"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
