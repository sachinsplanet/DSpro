import React, { useState } from 'react';
import { CAREER_ROLES } from '../data/content';
import { Search, ChevronDown, Wrench, Award, Check } from 'lucide-react';

interface CareerOpportunitiesProps {
  onSelectRole?: (roleId: string) => void;
}

export const CareerOpportunities: React.FC<CareerOpportunitiesProps> = ({ onSelectRole }) => {
  const [openId, setOpenId] = useState<string | null>('data-scientist');
  const [searchQuery, setSearchQuery] = useState('');

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
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="careers" className="py-24 px-4 md:px-8 bg-[#08090d] text-[#f1efe8] border-t border-[rgba(241,239,232,0.1)]">
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Sticky Left Column */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-mono-code text-[#d7ff54] tracking-widest uppercase mb-2">
              03 / The roles
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.85]">
              Career{' '}
              <em className="font-serif-display italic font-normal text-[#d7ff54]">
                Opportunities
              </em>
            </h2>

            <p className="mt-6 text-sm md:text-base text-[#9b9da4] leading-relaxed max-w-md">
              Data Science is not one monolithic job. It is an interdependent ecosystem of roles
              spanning research, engineering, mathematical modeling, executive communication, and
              long-term product strategy.
            </p>

            {/* Quick Search */}
            <div className="mt-8 relative max-w-sm">
              <Search className="w-4 h-4 text-[#9b9da4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="career-roles-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by role, tool, or skill (e.g., Python, SQL)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(241,239,232,0.18)] text-xs text-[#f1efe8] placeholder-[#9b9da4] focus:outline-none focus:border-[#d7ff54] transition-colors font-mono-code"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9b9da4] hover:text-[#f1efe8]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs font-mono-code text-[#9b9da4]">
              <span>Showing {filteredRoles.length} of {CAREER_ROLES.length} career tracks</span>
              {filteredRoles.length > 0 && (
                <button
                  type="button"
                  onClick={() => setOpenId(openId ? null : filteredRoles[0].id)}
                  className="text-[#d7ff54] hover:underline"
                >
                  {openId ? 'Collapse active' : 'Expand first'}
                </button>
              )}
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="flex flex-col gap-3">
            {filteredRoles.map((role) => {
              const isOpen = openId === role.id;

              return (
                <article
                  key={role.id}
                  id={`role-accordion-${role.id}`}
                  className={`border rounded-sm transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[rgba(215,255,84,0.6)] bg-[rgba(215,255,84,0.04)] shadow-lg'
                      : 'border-[rgba(241,239,232,0.15)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(215,255,84,0.3)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleRole(role.id)}
                    aria-expanded={isOpen}
                    aria-controls={`role-content-${role.id}`}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      <span className="font-mono-code text-xs text-[#d7ff54] font-semibold tracking-wider">
                        {role.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#f1efe8] truncate">
                        {role.name}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full border border-[rgba(241,239,232,0.2)] grid place-items-center text-[#d7ff54] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[rgba(215,255,84,0.1)] border-[#d7ff54]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expanded Content Drawer */}
                  {isOpen && (
                    <div
                      id={`role-content-${role.id}`}
                      className="px-4 sm:px-6 pb-6 pt-2 pl-12 sm:pl-16 border-t border-[rgba(241,239,232,0.08)]"
                    >
                      <p className="text-xs font-mono-code text-[#d7ff54] uppercase tracking-wider mb-3">
                        {role.oneliner}
                      </p>

                      <p className="text-sm sm:text-base text-[#9b9da4] leading-relaxed max-w-2xl mb-6">
                        {role.description}
                      </p>

                      {/* Skills and Tools Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[rgba(241,239,232,0.08)]">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#f1efe8] uppercase mb-2">
                            <Award className="w-3.5 h-3.5 text-[#d7ff54]" />
                            <span>Core Competencies</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {role.keySkills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center gap-1 text-[11px] font-mono-code px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(241,239,232,0.15)] text-[#f1efe8]"
                              >
                                <Check className="w-2.5 h-2.5 text-[#d7ff54]" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#f1efe8] uppercase mb-2">
                            <Wrench className="w-3.5 h-3.5 text-[#a8e7f9]" />
                            <span>Primary Tech Stack</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {role.typicalTools.map((tool) => (
                              <span
                                key={tool}
                                className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[rgba(168,231,249,0.08)] border border-[rgba(168,231,249,0.25)] text-[#a8e7f9]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {onSelectRole && (
                        <div className="mt-5 pt-4 border-t border-[rgba(241,239,232,0.08)] flex flex-wrap items-center justify-between gap-3">
                          <span className="text-[11px] font-mono-code text-[#9b9da4]">
                            Explore dynamic salary, roadmap & responsibilities
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectRole(role.id);
                            }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d7ff54] bg-[rgba(215,255,84,0.1)] text-[#d7ff54] font-mono-code text-xs uppercase tracking-wider hover:bg-[#d7ff54] hover:text-[#08090d] transition-all"
                          >
                            <span>Open Role Profile & 3D Model</span>
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
              <div className="p-8 text-center border border-dashed border-[rgba(241,239,232,0.2)] rounded-sm text-[#9b9da4]">
                <p>No career role found matching &ldquo;{searchQuery}&rdquo;</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs font-mono-code text-[#d7ff54] underline"
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
