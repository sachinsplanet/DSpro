import React, { useEffect } from 'react';
import { X, ArrowRight, Compass, Sparkles, Database, Code2, Globe } from 'lucide-react';
import { Button } from './ui/button';

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const JourneyModal: React.FC<JourneyModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'Begin Journey',
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

  if (!isOpen) return null;

  const contentMap: Record<
    string,
    { title: string; subtitle: string; description: string; points: string[] }
  > = {
    'Begin Journey': {
      title: 'Embark on Data Discovery',
      subtitle: 'Transform raw noise into predictive clarity',
      description:
        'Step into the algorithmic frontier where statistical modeling, machine intelligence, and high-dimensional analytics converge.',
      points: [
        'Exploratory Data Architecture & Feature Synthesis',
        'Deep Neural Architectures & Transformer Systems',
        'Real-Time Ingestion & Streaming Inference Engines',
        'Executive Decision Dashboards & Insight Distillation',
      ],
    },
    Studio: {
      title: 'The DSpro Creative Studio',
      subtitle: 'Where empirical rigor meets cinematic presentation',
      description:
        'Our laboratory designs bespoke data platforms, specialized neural pipelines, and executive intelligence portals for modern organizations.',
      points: [
        'Bespoke Interactive Visual Interfaces',
        'Large-Scale Predictive Model Deployments',
        'Automated ETL and Vector Retrieval Systems',
      ],
    },
    About: {
      title: 'About DSpro',
      subtitle: 'Architected for visionary practitioners',
      description:
        'We believe data without perspective is mere noise. DSpro was forged to bridge deep mathematical foundations with intuitive human insight.',
      points: [
        'Engineered for clarity and latency minimization',
        'Rooted in empirical verification and reproducibility',
        'Committed to ethical and explainable artificial intelligence',
      ],
    },
    Journal: {
      title: 'Research & Field Notes',
      subtitle: 'Dispatches from the bleeding edge of data science',
      description:
        'Read our ongoing technical documentation, exploratory case studies, and insights into next-generation computational frameworks.',
      points: [
        'Vol. 14: Beyond Gradient Descent in High Dimensions',
        'Vol. 13: Latency Profiling in Edge Neural Quantization',
        'Vol. 12: Turning Sparse Signals into Robust Decisions',
      ],
    },
    'Reach Us': {
      title: 'Connect with the Collective',
      subtitle: 'Initiate a dialogue or schedule a deep dive',
      description:
        'Have a query regarding platform collaboration, technical advisory, or enterprise intelligence integration? Our team is available.',
      points: [
        'General Inquiries: hello@dspro-intelligence.io',
        'Direct Research: labs@dspro-intelligence.io',
        'Global Studio: San Francisco • Tokyo • Zurich',
      ],
    },
  };

  const current = contentMap[initialTopic] || contentMap['Begin Journey'];

  return (
    <div
      id="journey-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(1,10,18,0.85)] backdrop-blur-md animate-fade-rise"
      onClick={onClose}
    >
      <div
        id="journey-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl p-8 rounded-3xl liquid-glass bg-[rgba(3,18,32,0.95)] border border-[rgba(255,255,255,0.15)] shadow-2xl text-foreground"
      >
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
          <Compass className="w-4 h-4" />
          <span>DSpro Portal • {initialTopic}</span>
        </div>

        <h2
          id="modal-title"
          className="text-3xl sm:text-4xl font-normal leading-tight mb-2 text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {current.title}
        </h2>

        <p className="text-sm text-muted-foreground font-normal mb-6">
          {current.subtitle}
        </p>

        <p className="text-sm sm:text-base leading-relaxed text-foreground/90 mb-6">
          {current.description}
        </p>

        {/* Feature Points */}
        <div className="space-y-2.5 mb-8">
          {current.points.map((point, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 text-sm text-muted-foreground"
            >
              <Sparkles className="w-4 h-4 text-foreground/80 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
          <span className="text-xs text-muted-foreground">
            © DSpro Intelligence Systems
          </span>
          <Button
            id="modal-primary-action"
            variant="liquid"
            size="sm"
            onClick={onClose}
            className="liquid-glass rounded-full px-6 py-2.5 text-xs sm:text-sm text-foreground hover:scale-[1.03] cursor-pointer"
          >
            <span>Proceed to Experience</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
