import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, TrendingUp, DollarSign, Award, Layers } from 'lucide-react';
import { Role } from '../data/rolesData';

interface RoleExplorerModalProps {
  role: Role | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RoleExplorerModal: React.FC<RoleExplorerModalProps> = ({
  role,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !role) return null;

  return (
    <div
      id="role-explorer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[rgba(0,0,0,0.85)] backdrop-blur-md animate-fade-rise"
      onClick={onClose}
    >
      <div
        id="role-explorer-dialog"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-[#0b121e] border border-white/20 shadow-2xl text-white selection:bg-white selection:text-black"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Close Button */}
        <button
          id="close-role-explorer-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Eyebrow & Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] rounded-full"
            style={{ backgroundColor: `${role.bg}33`, color: role.panel }}
          >
            DSCE Role Profile
          </span>
          {role.growthRate && (
            <span className="flex items-center text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              {role.growthRate}
            </span>
          )}
        </div>

        {/* Role Title */}
        <h2
          id="role-modal-title"
          className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {role.title}
        </h2>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-normal">
          {role.tagline}
        </p>

        {/* Quick Stat Pill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
            <DollarSign className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/50">Market Compensation</p>
              <p className="text-sm font-semibold text-white">{role.salaryRange || '$110,000 - $170,000'}</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
            <Award className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/50">Experience Tier</p>
              <p className="text-sm font-semibold text-white">{role.experienceLevel || 'All Experience Levels'}</p>
            </div>
          </div>
        </div>

        {/* Core Competencies & Tools */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {(role.skills || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-white/10 border border-white/20 text-white"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-2 flex items-center gap-1.5">
              <span className="font-mono text-xs">⚙</span> Key Tools & Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {(role.tools || []).map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-white/10 border border-white/20 text-white"
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

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-6">
          <span className="text-xs text-white/50">DSCE Career Framework</span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-white/90 transition-transform active:scale-95 cursor-pointer"
          >
            <span>Close Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
