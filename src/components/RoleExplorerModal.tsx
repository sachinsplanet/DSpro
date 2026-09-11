import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, DollarSign, Award, Layers } from 'lucide-react';
import { Role } from '../data/rolesData';

interface RoleExplorerModalProps {
  role: Role | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (direction: 'next' | 'prev') => void;
}

export const RoleExplorerModal: React.FC<RoleExplorerModalProps> = ({
  role,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll cleanly when modal is active, compensating scrollbar width to prevent layout shift
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Keyboard navigation: Escape closes modal, Left/Right arrows navigate profiles
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigate) {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight' && onNavigate) {
        onNavigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  // Prevent rendering if closed, no role, or before DOM mount
  if (!mounted || !isOpen || !role) return null;

  return createPortal(
    <div
      id="role-explorer-modal"
      className="fixed inset-0 z-[9999] w-screen h-[100dvh] min-h-[100dvh] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 sm:bg-black/85 backdrop-blur-md animate-modal-backdrop overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-name-display"
    >
      <div
        id="role-explorer-dialog"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[86vh] overflow-y-auto overscroll-contain modal-scrollbar rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 bg-[#0b121e] border border-white/20 shadow-2xl text-white selection:bg-white selection:text-black animate-modal-card my-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Close Button */}
        <button
          id="close-role-explorer-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center z-10 active:scale-95"
          aria-label="Close career profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Eyebrow & Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3 pr-12">
          <span
            id="role-eyebrow-label"
            className="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] rounded-full"
            style={{ backgroundColor: `${role.bg}33`, color: role.panel }}
          >
            CAREER PROFILE
          </span>
          {role.growthRate && (
            <span className="flex items-center text-[10px] sm:text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              {role.growthRate}
            </span>
          )}
        </div>

        {/* Role Title */}
        <h2
          id="role-name-display"
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-2 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {role.title}
        </h2>

        {/* Tagline */}
        <p
          id="role-tagline"
          className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed mb-6 font-normal"
        >
          {role.tagline}
        </p>

        {/* Quick Stat Pill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
            <DollarSign className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Market Compensation</p>
              <p className="text-xs sm:text-sm font-semibold text-white">{role.salaryRange || '$110,000 - $170,000'}</p>
            </div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
            <Award className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Experience Tier</p>
              <p className="text-xs sm:text-sm font-semibold text-white">{role.experienceLevel || 'All Experience Levels'}</p>
            </div>
          </div>
        </div>

        {/* Core Competencies & Tools */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Core Competencies
            </h3>
            <div id="role-skills-row" className="flex flex-wrap gap-1.5 sm:gap-2">
              {(role.skills || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded bg-white/10 border border-white/20 text-white select-none whitespace-nowrap"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-2 flex items-center gap-1.5">
              <span className="font-mono text-xs">⚙</span> Primary Tools & Platforms
            </h3>
            <div id="role-tools-row" className="flex flex-wrap gap-1.5 sm:gap-2">
              {(role.tools || []).map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded bg-white/10 border border-white/20 text-white select-none whitespace-nowrap"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Typical Responsibilities */}
        {role.typicalTasks && role.typicalTasks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-2.5">
              Primary Responsibilities & Deliverables
            </h3>
            <div className="space-y-2">
              {role.typicalTasks.map((task, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer with Navigation Controls & Close Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-white/10 mt-6">
          {/* Circular Navigation Buttons to switch between career roles */}
          {onNavigate ? (
            <div id="modal-role-nav" className="flex items-center space-x-3 justify-between sm:justify-start">
              <div className="flex items-center space-x-2">
                <button
                  id="modal-prev-role-btn"
                  type="button"
                  onClick={() => onNavigate('prev')}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
                  aria-label="Previous Career Profile"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  id="modal-next-role-btn"
                  type="button"
                  onClick={() => onNavigate('next')}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
                  aria-label="Next Career Profile"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs font-mono text-white/60">
                Cycle Profiles
              </span>
            </div>
          ) : (
            <span className="text-xs text-white/50">DSCE Career Framework</span>
          )}

          <button
            id="modal-bottom-close-btn"
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[42px] flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-white/90 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <span>Close Profile</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

