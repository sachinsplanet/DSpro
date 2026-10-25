import React, { useState } from 'react';
import { INDUSTRIES } from '../data/content';
import {
  Laptop,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Building2,
  Factory,
  Megaphone,
  GraduationCap,
  Car,
  ShieldAlert,
} from 'lucide-react';

export const Industries: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const icons: Record<string, React.ElementType> = {
    tech: Laptop,
    finance: Landmark,
    healthcare: HeartPulse,
    ecommerce: ShoppingCart,
    banking: Building2,
    manufacturing: Factory,
    marketing: Megaphone,
    education: GraduationCap,
    automotive: Car,
    government: ShieldAlert,
  };

  return (
    <section
      id="industries"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#f1efe8] text-[#08090d]"
    >
      <div className="w-full max-w-[1140px] mx-auto">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-4 sm:gap-8 items-end mb-10 sm:mb-14">
          <div>
            <p className="text-xs font-mono-code text-[#a54f40] tracking-widest uppercase mb-2">
              04 / Sector adoption
            </p>
            <h2 className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.9] [text-wrap:balance]">
              Data Is{' '}
              <em className="font-serif-display italic font-normal text-[#a54f40]">
                Everywhere
              </em>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#63656c] leading-relaxed max-w-xl">
            Every modern industry produces continuous telemetry and behavioral signals. Data Science
            provides organizations with the statistical rigor and scalable pipelines to transform
            those signals into decisive business advantage.
          </p>
        </div>

        {/* 10-Card Responsive Grid (1 col tiny, 2 col mobile/sm, 3 col md, 5 col lg) */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {INDUSTRIES.map((ind) => {
            const Icon = icons[ind.id] || Laptop;
            const isHovered = hoveredIndex === ind.id;

            return (
              <article
                key={ind.id}
                id={`industry-card-${ind.id}`}
                onMouseEnter={() => setHoveredIndex(ind.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex((prev) => (prev === ind.id ? null : ind.id))}
                className={`min-h-[12rem] sm:min-h-[14rem] p-4 sm:p-5 border border-[rgba(8,9,13,0.12)] rounded-sm flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? 'bg-[#08090d] text-[#f1efe8] sm:-translate-y-1 shadow-xl'
                    : 'bg-[rgba(255,255,255,0.4)] text-[#08090d] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-mono-code tabular-nums ${
                      isHovered ? 'text-[#d7ff54]' : 'text-[#85878c]'
                    }`}
                  >
                    {ind.number} / Sector
                  </span>
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isHovered ? 'text-[#d7ff54]' : 'text-[#a54f40]'
                    }`}
                  />
                </div>

                <div className="my-3">
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight mb-1.5 sm:mb-2 leading-snug">
                    {ind.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isHovered ? 'text-[rgba(241,239,232,0.75)]' : 'text-[#65676d]'
                    }`}
                  >
                    {ind.description}
                  </p>
                </div>

                {/* Example Use Cases snippet */}
                <div className="pt-2 border-t border-current border-opacity-10">
                  <span
                    className={`text-[10px] font-mono-code uppercase block truncate ${
                      isHovered ? 'text-[#a8e7f9]' : 'text-[#85878c]'
                    }`}
                  >
                    Ex: {ind.exampleUseCases?.[0] || 'Predictive modeling'}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
