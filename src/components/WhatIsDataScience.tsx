import React, { useState } from 'react';
import { CORE_DEFINITION } from '../data/content';
import { Binary, Sigma, Briefcase, ChevronRight } from 'lucide-react';

export const WhatIsDataScience: React.FC = () => {
  const [selectedForce, setSelectedForce] = useState<number | null>(null);

  const forceIcons = [Sigma, Binary, Briefcase];

  return (
    <section id="what" className="py-24 px-4 md:px-8 bg-[#08090d] text-[#f1efe8] border-t border-[rgba(241,239,232,0.1)]">
      <div className="w-full max-w-[1140px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-mono-code text-[#d7ff54] tracking-widest uppercase mb-2">
              01 / The field
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.9]">
              What Is{' '}
              <em className="font-serif-display italic font-normal text-[#d7ff54]">
                Data Science?
              </em>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#9b9da4] max-w-sm">
            An interdisciplinary discipline built at the intersection of mathematical evidence,
            computational engineering, and context.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
          {/* Definition Panel */}
          <article className="min-h-[28rem] p-6 sm:p-10 border border-[rgba(241,239,232,0.15)] bg-gradient-to-br from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.01)] rounded-sm flex flex-col justify-between">
            <div>
              <span className="inline-block text-xs font-mono-code text-[#d7ff54] tracking-wider uppercase mb-6">
                Core definition
              </span>

              <p className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#f1efe8] leading-tight">
                Data Science turns{' '}
                <em className="font-serif-display italic text-[#d7ff54]">scattered data</em> into a
                coherent, actionable story.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[rgba(241,239,232,0.12)]">
              <p className="text-sm sm:text-base text-[#9b9da4] leading-relaxed">
                {CORE_DEFINITION.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono-code text-[#f1efe8]">
                <span className="px-2.5 py-1 rounded bg-[rgba(215,255,84,0.1)] text-[#d7ff54] border border-[rgba(215,255,84,0.3)]">
                  Statistics
                </span>
                <span className="px-2.5 py-1 rounded bg-[rgba(168,231,249,0.1)] text-[#a8e7f9] border border-[rgba(168,231,249,0.3)]">
                  Machine Learning
                </span>
                <span className="px-2.5 py-1 rounded bg-[rgba(255,128,109,0.1)] text-[#ff806d] border border-[rgba(255,128,109,0.3)]">
                  Artificial Intelligence
                </span>
                <span className="px-2.5 py-1 rounded bg-[rgba(255,255,255,0.06)] text-[#9b9da4] border border-[rgba(255,255,255,0.1)]">
                  Data Engineering
                </span>
              </div>
            </div>
          </article>

          {/* Triad Forces Interactive Visual */}
          <article className="relative min-h-[28rem] p-6 sm:p-8 border border-[rgba(241,239,232,0.15)] bg-gradient-to-br from-[rgba(168,231,249,0.03)] to-transparent rounded-sm flex flex-col justify-between overflow-hidden">
            {/* Ambient triad glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none filter blur-3xl opacity-20 bg-[#d7ff54]"
              aria-hidden="true"
            />

            <div className="flex items-center justify-between text-xs font-mono-code text-[#9b9da4] uppercase z-10">
              <span>The Interdisciplinary Venn</span>
              <span className="text-[#d7ff54]">Click a pillar to inspect</span>
            </div>

            {/* Triad Nodes Display */}
            <div className="relative my-8 grid grid-cols-1 sm:grid-cols-3 gap-4 z-10">
              {CORE_DEFINITION.triadForces.map((force, index) => {
                const Icon = forceIcons[index];
                const isSelected = selectedForce === index;
                const colors = [
                  { text: 'text-[#d7ff54]', border: 'border-[#d7ff54]', bg: 'bg-[rgba(215,255,84,0.08)]' },
                  { text: 'text-[#a8e7f9]', border: 'border-[#a8e7f9]', bg: 'bg-[rgba(168,231,249,0.08)]' },
                  { text: 'text-[#ff806d]', border: 'border-[#ff806d]', bg: 'bg-[rgba(255,128,109,0.08)]' },
                ];
                const activeColor = colors[index];

                return (
                  <div
                    key={force.force}
                    id={`triad-force-${index}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedForce(isSelected ? null : index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedForce(isSelected ? null : index);
                      }
                    }}
                    className={`p-4 rounded-sm border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? `${activeColor.border} ${activeColor.bg} shadow-lg scale-[1.02]`
                        : 'border-[rgba(241,239,232,0.15)] bg-[rgba(8,9,13,0.7)] hover:border-[rgba(241,239,232,0.4)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono-code uppercase tracking-wider ${activeColor.text}`}>
                        {force.force}
                      </span>
                      <Icon className={`w-4 h-4 ${activeColor.text}`} />
                    </div>

                    <strong className="block text-base sm:text-lg font-medium text-[#f1efe8] mt-2">
                      {force.name}
                    </strong>

                    <p className="mt-2 text-xs text-[#9b9da4] leading-relaxed">
                      {force.detail}
                    </p>

                    <div className="mt-3 flex items-center gap-1 text-[11px] font-mono-code text-[#9b9da4]">
                      <span>View focus</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Force Detail Box or Default Summary */}
            <div className="z-10 p-4 rounded-sm border border-[rgba(241,239,232,0.12)] bg-[rgba(8,9,13,0.85)]">
              {selectedForce !== null ? (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#d7ff54]"></span>
                    <span className="text-xs font-mono-code text-[#d7ff54] uppercase tracking-wider">
                      Synthesis / {CORE_DEFINITION.triadForces[selectedForce].name}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#f1efe8]">
                    {selectedForce === 0 &&
                      'Without statistics, machine learning is prone to overfitting, false correlations, and unquantified uncertainty.'}
                    {selectedForce === 1 &&
                      'Without computational scale and production engineering, mathematical proofs remain confined to notebooks and cannot serve live users.'}
                    {selectedForce === 2 &&
                      'Without domain context, algorithms solve the wrong problems or deliver metrics that do not translate to meaningful organizational value.'}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-[#9b9da4]">
                  <span className="font-mono-code">One unified field: Math + Code + Domain context</span>
                  <span className="text-[#d7ff54] font-mono-code">True Data Science</span>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
