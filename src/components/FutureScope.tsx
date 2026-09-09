import React, { useState } from 'react';
import { FUTURE_TRENDS } from '../data/content';
import { Sparkles, Network, Radio, Dna, Bot, ShieldCheck, Building } from 'lucide-react';

export const FutureScope: React.FC = () => {
  const [activeTrend, setActiveTrend] = useState<string | null>(null);

  const icons: Record<string, React.ElementType> = {
    genai: Sparkles,
    bigdata: Network,
    iot: Radio,
    biotech: Dna,
    autonomous: Bot,
    cybersecurity: ShieldCheck,
    smartcities: Building,
  };

  return (
    <section id="future" className="py-24 px-4 md:px-8 bg-[#08090d] text-[#f1efe8] border-t border-[rgba(241,239,232,0.1)]">
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Sticky Left Title */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-mono-code text-[#ff806d] tracking-widest uppercase mb-2">
              05 / The horizon
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.85]">
              Future Scope of{' '}
              <em className="font-serif-display italic font-normal text-[#ff806d]">
                Data Science
              </em>
            </h2>

            <p className="mt-6 text-sm md:text-base text-[#9b9da4] leading-relaxed max-w-md">
              The next generation of data work will be more connected, more autonomous, and more
              deeply embedded in physical and biological systems.
            </p>

            <div className="mt-8 p-5 rounded-sm border border-[rgba(255,128,109,0.25)] bg-[rgba(255,128,109,0.05)] max-w-sm">
              <span className="text-[11px] font-mono-code text-[#ff806d] uppercase tracking-wider block mb-1">
                Strategic takeaway
              </span>
              <p className="text-xs text-[#f1efe8] leading-relaxed">
                As AI models commoditize simple coding, the premium shifts toward domain framing,
                data lineage integrity, and ethical governance.
              </p>
            </div>
          </div>

          {/* Right Cards List */}
          <div className="flex flex-col">
            {FUTURE_TRENDS.map((trend) => {
              const Icon = icons[trend.id] || Sparkles;
              const isActive = activeTrend === trend.id;

              return (
                <article
                  key={trend.id}
                  id={`future-trend-${trend.id}`}
                  onMouseEnter={() => setActiveTrend(trend.id)}
                  onMouseLeave={() => setActiveTrend(null)}
                  className={`group py-6 px-4 border-t border-[rgba(241,239,232,0.12)] transition-all duration-300 grid grid-cols-[3.2rem_1fr] gap-4 items-start cursor-default ${
                    isActive
                      ? 'bg-[rgba(255,128,109,0.04)] pl-7'
                      : 'hover:bg-[rgba(255,255,255,0.02)]'
                  }`}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-mono-code text-xs text-[#ff806d] font-semibold">
                      {trend.number}
                    </span>
                    <Icon className="w-4 h-4 text-[#ff806d] opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#f1efe8] group-hover:text-[#ff806d] transition-colors">
                        {trend.title}
                      </h3>
                      <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(241,239,232,0.12)] text-[#9b9da4]">
                        {trend.impactArea}
                      </span>
                    </div>

                    <p className="text-sm text-[#9b9da4] leading-relaxed max-w-2xl">
                      {trend.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
