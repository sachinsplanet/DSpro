import React, { useState } from 'react';
import { STUDENT_INFO } from '../data/content';
import { ArrowUp, Copy, Check, User, GraduationCap, Hash, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fallbackCopyText = (text: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Graceful degradation
    }
  };

  const handleCopyDetails = () => {
    const text = `Student Presentation:\nName: ${STUDENT_INFO.name}\nClass / Division: ${STUDENT_INFO.classDivision}\nRoll No.: ${STUDENT_INFO.rollNo}\nProject Subject: ${STUDENT_INFO.subject}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          fallbackCopyText(text);
        });
    } else {
      fallbackCopyText(text);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="details" className="pt-24 pb-12 px-4 md:px-8 bg-[#08090d] text-[#f1efe8] border-t border-[rgba(241,239,232,0.15)]">
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          {/* Left Title */}
          <div>
            <p className="text-xs font-mono-code text-[#d7ff54] tracking-widest uppercase mb-3">
              09 / Student details
            </p>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[0.82] max-w-[10ch]">
              Keep asking better{' '}
              <em className="font-serif-display italic font-normal text-[#d7ff54]">
                questions.
              </em>
            </h2>

            <p className="mt-6 text-sm text-[#9b9da4] leading-relaxed max-w-md">
              A comprehensive academic exploration of data science careers, algorithmic toolkits,
              and strategic trends across contemporary industry.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                id="copy-student-details-btn"
                onClick={handleCopyDetails}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[rgba(215,255,84,0.35)] text-xs font-mono-code uppercase text-[#d7ff54] hover:bg-[#d7ff54] hover:text-[#08090d] transition-all shadow-[0_0_15px_rgba(215,255,84,0.15)]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Details</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Presenter Info</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Student Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-sm border border-[rgba(241,239,232,0.15)] bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#9b9da4] uppercase mb-1.5">
                <User className="w-3.5 h-3.5 text-[#d7ff54]" />
                <span>Student Name</span>
              </div>
              <strong className="text-lg sm:text-xl font-medium text-[#f1efe8]">
                {STUDENT_INFO.name}
              </strong>
            </div>

            <div className="p-5 rounded-sm border border-[rgba(241,239,232,0.15)] bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#9b9da4] uppercase mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#a8e7f9]" />
                <span>Class / Division</span>
              </div>
              <strong className="text-lg sm:text-xl font-medium text-[#f1efe8]">
                {STUDENT_INFO.classDivision}
              </strong>
            </div>

            <div className="p-5 rounded-sm border border-[rgba(241,239,232,0.15)] bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#9b9da4] uppercase mb-1.5">
                <Hash className="w-3.5 h-3.5 text-[#ff806d]" />
                <span>Roll Number</span>
              </div>
              <strong className="text-lg sm:text-xl font-mono-code font-bold text-[#d7ff54]">
                {STUDENT_INFO.rollNo}
              </strong>
            </div>

            <div className="p-5 rounded-sm border border-[rgba(241,239,232,0.15)] bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#9b9da4] uppercase mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#ffa76f]" />
                <span>Project Subject</span>
              </div>
              <strong className="text-lg sm:text-xl font-medium text-[#f1efe8]">
                {STUDENT_INFO.subject}
              </strong>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-[rgba(241,239,232,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#9b9da4] uppercase">
          <div>
            <span>Career Opportunities &amp; Future Scope of Data Science</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#f1efe8] font-normal">Built from data, designed for humans.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(241,239,232,0.2)] text-[#f1efe8] hover:border-[#d7ff54] hover:text-[#d7ff54] transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
