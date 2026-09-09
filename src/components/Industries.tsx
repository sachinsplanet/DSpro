import React, { useState } from 'react';
import { INDUSTRIES } from '../data/content';
import { 
  Laptop, Landmark, HeartPulse, ShoppingCart, 
  Building2, Factory, Megaphone, GraduationCap, 
  Car, ShieldAlert 
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
    <section id="industries" className="py-24 px-4 md:px-8 bg-[#f1efe8] text-[#08090d]">
      <div className="w-full max-w-[1140px] mx-auto">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-end mb-14">
          <div>
            <p className="text-xs font-mono-code text-[#a54f40] tracking-widest uppercase mb-2">
              04 / Sector adoption
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.85]">
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

        {/* 10-Card Grid (5 across on desktop, 3 on tablet, 2 on mobile, 1 on small) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {INDUSTRIES.map((ind) => {
            const Icon = icons[ind.id] || Laptop;
            const isHovered = hoveredIndex === ind.id;

            return (
              <article
                key={ind.id}
                id={`industry-card-${ind.id}`}
                onMouseEnter={() => setHoveredIndex(ind.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`min-h-[14rem] p-5 border border-[rgba(8,9,13,0.12)] rounded-sm flex flex-col justify-between transition-all duration-300 cursor-default ${
                  isHovered
                    ? 'bg-[#08090d] text-[#f1efe8] -translate-y-1 shadow-xl'
                    : 'bg-[rgba(255,255,255,0.4)] text-[#08090d] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-mono-code ${
                      isHovered ? 'text-[#d7ff54]' : 'text-[#85878c]'
                    }`}
                  >
                    {ind.number} / Sector
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isHovered ? 'text-[#d7ff54]' : 'text-[#a54f40]'
                    }`}
                  />
                </div>

                <div className="my-3">
                  <h3 className="text-lg font-semibold tracking-tight mb-2">
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

                {/* Example Use Cases snippet on hover */}
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
