import React, { useState } from 'react';
import { SKILL_ITEMS } from '../data/content';

export const SkillsToolkit: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'technical' | 'soft'>(
    'all'
  );
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  const filteredSkills = SKILL_ITEMS.filter((skill) => {
    if (selectedCategory === 'all') return true;
    return skill.category === selectedCategory;
  });

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#f1efe8] text-[#08090d]"
    >
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Orbital Visual */}
          <div
            className="relative min-h-[21rem] min-[400px]:min-h-[24rem] sm:min-h-[30rem] lg:min-h-[32rem] border border-[rgba(8,9,13,0.15)] rounded-sm overflow-hidden flex items-center justify-center p-4 sm:p-6"
            style={{
              background: `
                radial-gradient(circle at 50% 45%, rgba(215, 255, 84, 0.25), transparent 14rem),
                linear-gradient(145deg, rgba(8, 9, 13, 0.04), rgba(8, 9, 13, 0.12))
              `,
            }}
          >
            {/* Concentric radar rings */}
            <div
              className="absolute w-44 min-[400px]:w-52 sm:w-64 aspect-square rounded-full border border-[rgba(8,9,13,0.2)] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute w-64 min-[400px]:w-72 sm:w-96 aspect-square rounded-full border border-dashed border-[rgba(8,9,13,0.2)] pointer-events-none animate-[spin_60s_linear_infinite]"
              aria-hidden="true"
            />

            {/* Central Orb */}
            <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#08090d] text-[#f1efe8] grid place-items-center text-center p-3 sm:p-4 font-mono-code text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_0_0_0.75rem_rgba(215,255,84,0.15),0_1.5rem_4rem_rgba(8,9,13,0.3)]">
              <div>
                <strong className="block text-[#d7ff54] text-base sm:text-xl font-bold tracking-tight">
                  BUILD
                </strong>
                <span>the stack</span>
              </div>
            </div>

            {/* Floating Tags */}
            <button
              type="button"
              aria-pressed={highlightedSkill === 'python'}
              onClick={() =>
                setHighlightedSkill((prev) => (prev === 'python' ? null : 'python'))
              }
              className={`absolute top-[10%] sm:top-[16%] left-[5%] sm:left-[10%] px-2.5 sm:px-3 py-1.5 min-h-[36px] rounded border text-[11px] sm:text-xs font-mono-code uppercase tracking-wider cursor-pointer backdrop-blur-md transition-all z-20 ${
                highlightedSkill === 'python'
                  ? 'bg-[#08090d] text-[#d7ff54] border-[#08090d] shadow-lg scale-105'
                  : 'bg-[rgba(241,239,232,0.9)] text-[#08090d] border-[rgba(8,9,13,0.2)] hover:border-[#08090d]'
              }`}
            >
              Python
            </button>

            <button
              type="button"
              aria-pressed={highlightedSkill === 'sql'}
              onClick={() => setHighlightedSkill((prev) => (prev === 'sql' ? null : 'sql'))}
              className={`absolute top-[10%] sm:top-[14%] right-[5%] sm:right-[10%] px-2.5 sm:px-3 py-1.5 min-h-[36px] rounded border text-[11px] sm:text-xs font-mono-code uppercase tracking-wider cursor-pointer backdrop-blur-md transition-all z-20 ${
                highlightedSkill === 'sql'
                  ? 'bg-[#08090d] text-[#d7ff54] border-[#08090d] shadow-lg scale-105'
                  : 'bg-[rgba(241,239,232,0.9)] text-[#08090d] border-[rgba(8,9,13,0.2)] hover:border-[#08090d]'
              }`}
            >
              SQL
            </button>

            <button
              type="button"
              aria-pressed={highlightedSkill === 'ml'}
              onClick={() => setHighlightedSkill((prev) => (prev === 'ml' ? null : 'ml'))}
              className={`absolute bottom-[10%] sm:bottom-[20%] right-[5%] sm:right-[8%] px-2.5 sm:px-3 py-1.5 min-h-[36px] rounded border text-[11px] sm:text-xs font-mono-code uppercase tracking-wider cursor-pointer backdrop-blur-md transition-all z-20 ${
                highlightedSkill === 'ml'
                  ? 'bg-[#08090d] text-[#d7ff54] border-[#08090d] shadow-lg scale-105'
                  : 'bg-[rgba(241,239,232,0.9)] text-[#08090d] border-[rgba(8,9,13,0.2)] hover:border-[#08090d]'
              }`}
            >
              Machine Learning
            </button>

            <button
              type="button"
              aria-pressed={highlightedSkill === 'communication'}
              onClick={() =>
                setHighlightedSkill((prev) =>
                  prev === 'communication' ? null : 'communication'
                )
              }
              className={`absolute bottom-[10%] sm:bottom-[12%] left-[5%] sm:left-[10%] px-2.5 sm:px-3 py-1.5 min-h-[36px] rounded border text-[11px] sm:text-xs font-mono-code uppercase tracking-wider cursor-pointer backdrop-blur-md transition-all z-20 ${
                highlightedSkill === 'communication'
                  ? 'bg-[#08090d] text-[#d7ff54] border-[#08090d] shadow-lg scale-105'
                  : 'bg-[rgba(241,239,232,0.9)] text-[#08090d] border-[rgba(8,9,13,0.2)] hover:border-[#08090d]'
              }`}
            >
              Communication
            </button>
          </div>

          {/* Right Skills Grid */}
          <div>
            <div className="mb-6 sm:mb-8">
              <p className="text-xs font-mono-code text-[#a54f40] tracking-widest uppercase mb-2">
                06 / The toolkit
              </p>
              <h2 className="text-3xl min-[400px]:text-4xl sm:text-5xl font-medium tracking-tight leading-[0.9] [text-wrap:balance]">
                Skills to Build a{' '}
                <em className="font-serif-display italic font-normal text-[#a54f40]">
                  Career
                </em>
              </h2>

              {/* Category Filter Controls */}
              <div className="flex flex-wrap gap-2 mt-5 sm:mt-6">
                {[
                  { id: 'all', label: 'All 9 Skills' },
                  { id: 'technical', label: 'Technical' },
                  { id: 'core', label: 'Mathematical & Core' },
                  { id: 'soft', label: 'Human & Strategic' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`px-3.5 py-2 min-h-[38px] rounded-full text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === tab.id
                        ? 'bg-[#08090d] text-[#f1efe8]'
                        : 'bg-[rgba(8,9,13,0.06)] text-[#63656c] hover:bg-[rgba(8,9,13,0.12)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive 1 -> 2 -> 3 Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredSkills.map((skill) => {
                const isHighlighted = highlightedSkill === skill.id;

                return (
                  <article
                    key={skill.id}
                    id={`skill-card-${skill.id}`}
                    onMouseEnter={() => setHighlightedSkill(skill.id)}
                    onMouseLeave={() => setHighlightedSkill(null)}
                    onClick={() =>
                      setHighlightedSkill((prev) => (prev === skill.id ? null : skill.id))
                    }
                    className={`min-h-[9.5rem] sm:min-h-[10.5rem] p-4 border rounded-sm flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#08090d] text-[#f1efe8] sm:-translate-y-1 shadow-lg border-[#08090d]'
                        : 'bg-[rgba(8,9,13,0.035)] text-[#08090d] border-[rgba(8,9,13,0.12)] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <strong className="text-base font-semibold tracking-tight leading-snug">
                        {skill.name}
                      </strong>
                      <span
                        className={`text-[9px] font-mono-code uppercase px-1.5 py-0.5 rounded shrink-0 ${
                          isHighlighted
                            ? 'bg-[rgba(215,255,84,0.15)] text-[#d7ff54]'
                            : 'bg-[rgba(8,9,13,0.06)] text-[#85878c]'
                        }`}
                      >
                        {skill.category}
                      </span>
                    </div>

                    <p
                      className={`text-xs leading-relaxed mt-3 sm:mt-4 ${
                        isHighlighted ? 'text-[rgba(241,239,232,0.8)]' : 'text-[#65676d]'
                      }`}
                    >
                      {skill.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
