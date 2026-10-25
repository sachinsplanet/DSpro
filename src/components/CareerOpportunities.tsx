import React, { useState, useRef } from 'react';
import { CAREER_ROLES } from '../data/content';
import { Search, ChevronDown, Wrench, Award, Check, X } from 'lucide-react';

interface CareerOpportunitiesProps {
  onSelectRole?: (roleId: string) => void;
}

export const CareerOpportunities: React.FC<CareerOpportunitiesProps> = ({ onSelectRole }) => {
  const [openId, setOpenId] = useState<string | null>('data-scientist');
  const [searchQuery, setSearchQuery] = useState('');
  const listContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const filteredRoles = CAREER_ROLES.filter((role) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      role.name.toLowerCase().includes(q) ||
      role.oneliner.toLowerCase().includes(q) ||
      role.keySkills.some((s) => s.toLowerCase().includes(q)) ||
      role.typicalTools.some((t) => t.toLowerCase().includes(q))
    );
  });

  const toggleRole = (id: string) => {
    const nextId = openId === id ? null : id;
    setOpenId(nextId);

    // Ensure the clicked role and accordion list fit cleanly inside the current screen
    if (nextId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const cardEl = cardRefs.current[id];
          const listEl = listContainerRef.current;

          if (window.innerWidth < 1024 && listEl) {
            const listRect = listEl.getBoundingClientRect();
            // If the list fit height is within the viewport, align the list nicely on screen
            if (listRect.height <= window.innerHeight - 24) {
              listEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              return;
            }
          }

          if (cardEl) {
            const rect = cardEl.getBoundingClientRect();
            const isOutOfBounds = rect.top < 16 || rect.bottom > window.innerHeight - 16;
            if (isOutOfBounds) {
              cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }, 60);
      });
    }
  };

  const quickTools = ['Python', 'SQL', 'Tableau', 'Airflow', 'Docker'];

  return (
    <section
      id="careers"
      className="min-h-[100svh] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 md:px-8 bg-[#08090d] text-[#f1efe8] border-t border-[rgba(241,239,232,0.1)] flex items-center"
    >
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="w-full">
            <p className="text-xs font-mono-code text-[#d7ff54] tracking-widest uppercase mb-1.5">
              03 / The roles
            </p>

            <h2 className="text-3xl min-[400px]:text-4xl sm:text-5xl font-medium tracking-tight leading-[0.9] [text-wrap:balance]">
              Career{' '}
              <em className="font-serif-display italic font-normal text-[#d7ff54]">
                Opportunities
              </em>
            </h2>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#9b9da4] leading-relaxed max-w-xl lg:max-w-md">
              Data Science is an interdependent ecosystem of roles spanning research, engineering,
              mathematical modeling, executive communication, and product strategy.
            </p>

            {/* Quick Search */}
            <div className="mt-4 sm:mt-6 relative w-full sm:max-w-md lg:max-w-sm">
              <Search className="w-4 h-4 text-[#9b9da4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="career-roles-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by role, tool, or skill (e.g., Python, SQL)..."
                className="w-full min-h-[40px] pl-10 pr-9 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(241,239,232,0.18)] text-xs text-[#f1efe8] placeholder-[#9b9da4] focus:outline-none focus:border-[#d7ff54] transition-colors font-mono-code"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search filter"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 grid place-items-center rounded-md text-[#9b9da4] hover:text-[#f1efe8] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Tool Filter Buttons */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {quickTools.map((tool) => {
                const isSelected = searchQuery.toLowerCase() === tool.toLowerCase();
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => setSearchQuery(isSelected ? '' : tool)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-code transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#d7ff54] text-[#08090d] font-semibold'
                        : 'bg-white/5 text-[#9b9da4] border border-white/10 hover:border-[#d7ff54]/50 hover:text-[#f1efe8]'
                    }`}
                  >
                    {tool}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4 text-[11px] font-mono-code text-[#9b9da4]">
              <span className="tabular-nums">
                Showing {filteredRoles.length} of {CAREER_ROLES.length} career tracks
              </span>
              {filteredRoles.length > 0 && (
                <button
                  type="button"
                  onClick={() => setOpenId(openId ? null : filteredRoles[0].id)}
                  className="text-[#d7ff54] hover:underline py-0.5 cursor-pointer"
                >
                  {openId ? 'Collapse active' : 'Expand first'}
                </button>
              )}
            </div>
          </div>

          {/* Right Accordion List — Sized to fit all 7 roles + 1 open drawer in a single viewport */}
          <div
            ref={listContainerRef}
            id="careers-accordion-list"
            className="flex flex-col gap-1.5 sm:gap-2 w-full min-w-0"
          >
            {filteredRoles.map((role) => {
              const isOpen = openId === role.id;

              return (
                <article
                  key={role.id}
                  ref={(el) => {
                    cardRefs.current[role.id] = el;
                  }}
                  id={`role-accordion-${role.id}`}
                  className={`border rounded-sm transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[rgba(215,255,84,0.65)] bg-[rgba(215,255,84,0.04)] shadow-lg'
                      : 'border-[rgba(241,239,232,0.15)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(215,255,84,0.3)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleRole(role.id)}
                    aria-expanded={isOpen}
                    aria-controls={`role-content-${role.id}`}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-2.5 flex items-center justify-between text-left gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <span className="font-mono-code text-[11px] sm:text-xs text-[#d7ff54] font-semibold tracking-wider shrink-0 tabular-nums">
                        {role.number}
                      </span>
                      <h3 className="text-sm min-[380px]:text-base sm:text-lg md:text-xl font-medium tracking-tight text-[#f1efe8] whitespace-nowrap truncate">
                        {role.name}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[rgba(241,239,232,0.2)] grid place-items-center text-[#d7ff54] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[rgba(215,255,84,0.1)] border-[#d7ff54]' : ''
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {/* Expanded Content Drawer — Compacted to fit screen alongside the other 6 roles */}
                  {isOpen && (
                    <div
                      id={`role-content-${role.id}`}
                      className="px-3.5 sm:px-5 pb-3.5 sm:pb-4 pt-2.5 sm:pl-11 border-t border-[rgba(241,239,232,0.08)]"
                    >
                      <p className="text-[11px] font-mono-code text-[#d7ff54] uppercase tracking-wider mb-1 leading-snug">
                        {role.oneliner}
                      </p>

                      <p className="text-xs sm:text-sm text-[#9b9da4] leading-snug max-w-2xl mb-3">
                        {role.description}
                      </p>

                      {/* Skills and Tools Compact 2-Column Grid */}
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-2.5 border-t border-[rgba(241,239,232,0.08)]">
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-code text-[#f1efe8] uppercase mb-1.5">
                            <Award className="w-3 h-3 text-[#d7ff54] shrink-0" />
                            <span className="truncate">Core Competencies</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {role.keySkills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono-code px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(241,239,232,0.15)] text-[#f1efe8]"
                              >
                                <Check className="w-2.5 h-2.5 text-[#d7ff54] shrink-0" />
                                <span>{skill}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-code text-[#f1efe8] uppercase mb-1.5">
                            <Wrench className="w-3 h-3 text-[#a8e7f9] shrink-0" />
                            <span className="truncate">Primary Tech Stack</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {role.typicalTools.map((tool) => (
                              <span
                                key={tool}
                                className="text-[10px] sm:text-[11px] font-mono-code px-2 py-0.5 rounded bg-[rgba(168,231,249,0.08)] border border-[rgba(168,231,249,0.25)] text-[#a8e7f9]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {onSelectRole && (
                        <div className="mt-3 pt-2.5 border-t border-[rgba(241,239,232,0.08)] flex flex-col min-[440px]:flex-row min-[440px]:items-center justify-between gap-2">
                          <span className="text-[10px] sm:text-[11px] font-mono-code text-[#9b9da4]">
                            Explore salary, roadmap &amp; responsibilities
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectRole(role.id);
                            }}
                            className="w-full min-[440px]:w-auto min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#d7ff54] bg-[rgba(215,255,84,0.1)] text-[#d7ff54] font-mono-code text-[11px] uppercase tracking-wider hover:bg-[#d7ff54] hover:text-[#08090d] transition-all cursor-pointer shrink-0 whitespace-nowrap"
                          >
                            <span>Open Role Profile &amp; 3D Model</span>
                            <span aria-hidden="true">&rarr;</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}

            {filteredRoles.length === 0 && (
              <div className="p-6 text-center border border-dashed border-[rgba(241,239,232,0.2)] rounded-sm text-[#9b9da4]">
                <p className="text-xs sm:text-sm">
                  No career role found matching &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-2.5 min-h-[36px] px-4 py-1 rounded-full border border-[#d7ff54]/40 text-xs font-mono-code text-[#d7ff54] hover:bg-[#d7ff54]/10 transition-colors cursor-pointer"
                >
                  Reset search filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
