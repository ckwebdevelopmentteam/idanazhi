'use client';

import React, { useEffect } from 'react';
import { X, Clock, Sun, Check, ArrowRight } from 'lucide-react';
import { ExperienceItem } from '@/data/experiences';

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
  onBookNow?: (experience: ExperienceItem) => void;
}

export function ExperienceModal({
  experience,
  onClose,
  onBookNow,
}: ExperienceModalProps) {
  useEffect(() => {
    if (!experience) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/65 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-modal-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[820px] max-h-[92vh] overflow-y-auto bg-[#FAF7F2] text-[#1C1917] rounded-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-[#7C402E]/20 flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close experience details"
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors border border-white/20 cursor-pointer"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Hero Image Container */}
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] shrink-0 overflow-hidden bg-black">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/30 to-transparent" />

          {/* Badge & Title on Image */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-12 text-white">
            <span className="inline-block px-2.5 py-1 text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.22em] bg-[#7C402E] text-white mb-2">
              {experience.category}
            </span>
            <h2
              id="experience-modal-title"
              className="font-serif text-[clamp(22px,3.2vw,34px)] font-normal leading-[1.15] text-white m-0"
            >
              {experience.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-6">
          {/* Metadata quick bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-6 border-b border-[#7C402E]/15 text-[12px] sm:text-[13px] text-[#554B43]">
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-[#7C402E] shrink-0" />
              <span>
                <strong className="text-[#1C1917] font-medium">Duration:</strong> {experience.duration}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sun size={16} className="text-[#7C402E] shrink-0" />
              <span>
                <strong className="text-[#1C1917] font-medium">Best Time:</strong> {experience.bestTime}
              </span>
            </div>
          </div>

          {/* Tagline / Subtitle */}
          <p className="font-serif italic text-[16px] sm:text-[18px] text-[#7C402E] leading-[1.4] m-0">
            &ldquo;{experience.tagline}&rdquo;
          </p>

          {/* Narrative Description */}
          <p className="font-sans text-[14px] sm:text-[15px] leading-[1.75] text-[#443B33] m-0">
            {experience.description}
          </p>

          {/* Experience Highlights */}
          <div>
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7C402E] m-0 mb-3.5">
              Experience Highlights
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 m-0 p-0 list-none">
              {experience.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13px] sm:text-[13.5px] text-[#332C26]"
                >
                  <span className="w-4 h-4 rounded-full bg-[#7C402E]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#7C402E]">
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#7C402E]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11.5px] text-[#6E2E1D] tracking-[0.05em] text-center sm:text-left">
              Tailored for guests staying at IDANAZHI Farm Stay
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 border border-[#7C402E]/30 text-[#1C1917] text-[10.5px] font-sans tracking-[0.16em] uppercase hover:bg-[#7C402E]/5 transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => {
                  onClose();
                  onBookNow?.(experience);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#7C402E] hover:bg-[#5E2B1E] text-white text-[10.5px] font-sans font-medium tracking-[0.18em] uppercase transition-colors inline-flex items-center justify-center gap-2 cursor-pointer no-underline"
              >
                <span>Reserve Experience</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
