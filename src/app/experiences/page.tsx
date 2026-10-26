'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ArrowUpRight,
  Clock,
  Sun,
  Check,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { experienceSubCategories } from '@/data/navigation';
import { BookingPanel } from '@/components/sections/booking-panel';

const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds per activity transition

// Motion animation variants for slow, silky-smooth vertical transitions
const mainImageVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '8%' : '-8%',
    opacity: 0,
    scale: 1.04,
  }),
  center: {
    y: '0%',
    opacity: 1,
    scale: 1,
    transition: {
      y: { duration: 1.25, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 1.15, ease: [0.25, 1, 0.5, 1] },
      scale: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? '-8%' : '8%',
    opacity: 0,
    scale: 0.98,
    transition: {
      y: { duration: 1.15, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 1.05, ease: [0.25, 1, 0.5, 1] },
    },
  }),
};

const textVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 16 : -16,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: {
      y: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -16 : 16,
    opacity: 0,
    transition: {
      y: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  }),
};

const vignetteVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '20%' : '-20%',
    opacity: 0,
    scale: 1.03,
  }),
  center: {
    y: '0%',
    opacity: 1,
    scale: 1,
    transition: {
      y: { duration: 1.25, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 1.15, ease: [0.25, 1, 0.5, 1] },
      scale: { duration: 1.35, ease: [0.25, 1, 0.5, 1] },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? '-20%' : '20%',
    opacity: 0,
    scale: 0.97,
    transition: {
      y: { duration: 1.15, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 1.05, ease: [0.25, 1, 0.5, 1] },
    },
  }),
};

export default function ExperiencesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const total = experienceSubCategories.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const prevExperience = experienceSubCategories[prevIndex];
  const activeExperience = experienceSubCategories[currentIndex];
  const nextExperience = experienceSubCategories[nextIndex];

  // Auto-scrolling continuous vertical transition loop
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [total, currentIndex]);

  const goToPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleBookExperience = (expTitle: string) => {
    setSelectedExperience(expTitle);
    setBookingOpen(true);
  };

  return (
    <main className="bg-paper min-h-screen text-ink overflow-x-hidden">
      {/* =========================================================================
          HERO SPLIT-SCREEN
          Left: Warm Paper Panel with Brand Crest, Vertical-Animated Editorial Quote, Button
          Right: Full-Bleed Photograph (Matches Middle Vignette Exactly!)
          Center Seam:
            - Top Vignette: Previous Activity (Click to slide vertically up)
            - Middle Vignette: Active Activity (IDENTICAL to Main Right Photo!)
            - Bottom Vignette: Next Activity (Click to slide vertically down)
          ========================================================================= */}
      <section
        className="relative w-full min-h-screen lg:min-h-[100svh] flex flex-col lg:flex-row bg-[#F4EFE6] border-b border-ink/10 select-none group/hero"
      >
        {/* Left Column: Editorial & Brand Core */}
        <div className="w-full lg:w-[48%] xl:w-[46%] bg-[#F4EFE6] flex flex-col justify-between items-center text-center px-6 sm:px-12 lg:px-16 pt-[125px] sm:pt-[140px] pb-10 lg:pb-14 min-h-[580px] lg:min-h-screen relative z-10 box-border">
          {/* Top Brand Crest / Emblem */}
          <div className="flex flex-col items-center">
            <span className="font-sans text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.32em] text-[#7A5A43] font-semibold mb-2">
              FARM STAY &amp; HERITAGE EXPERIENCES
            </span>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center my-1">
              <img
                src="/images/weddings/logo/smy_mark_hd.png"
                alt="Idanazhi Heritage Emblem"
                className="w-full h-full object-contain opacity-90 drop-shadow-xs"
              />
            </div>
            <span className="font-serif text-[17px] sm:text-[19px] tracking-[0.24em] text-[#3E1A10] font-normal uppercase mt-1">
              IDANAZHI
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.28em] text-[#7A5A43] uppercase font-light">
              KUMBIDI · KERALA
            </span>
          </div>

          {/* Middle Main Editorial Headline & Framed Action Button with Vertical Motion */}
          <div className="my-auto py-6 max-w-[460px] w-full mx-auto flex flex-col items-center text-center min-h-[230px] justify-center overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`headline-${activeExperience.id}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center w-full"
              >
                <span className="inline-block font-sans text-[9px] uppercase tracking-[0.22em] text-[#84382B] font-semibold mb-3">
                  Immersion 0{currentIndex + 1} of 0{total}
                </span>

                <h1 className="font-serif text-[clamp(24px,2.4vw,36px)] font-normal text-[#381E15] leading-[1.38] sm:leading-[1.42] tracking-[-0.015em] m-0 mb-7 text-center">
                  {activeExperience.heroHeadline || activeExperience.title}
                </h1>

                <button
                  type="button"
                  onClick={() => handleBookExperience(activeExperience.title)}
                  className="inline-block border border-[#4E2418]/45 px-7 py-2.5 text-[10.5px] font-sans font-medium uppercase tracking-[0.22em] text-[#4E2418] bg-transparent hover:bg-[#4E2418] hover:text-white transition-all duration-300 cursor-pointer active:scale-95 shadow-2xs"
                  aria-label={`Explore ${activeExperience.title}`}
                >
                  EXPLORE {activeExperience.shortTitle.toUpperCase()}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Quotation Mark, Micro-Copy & Navigation Timer */}
          <div className="max-w-[440px] w-full mx-auto flex flex-col items-center text-center pt-2">
            <span className="block font-serif text-[26px] sm:text-[28px] leading-none text-[#84382B]/60 select-none mb-1">
              “
            </span>

            <div className="min-h-[46px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={`quote-${activeExperience.id}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="font-sans text-[11px] sm:text-[12px] font-light text-[#5C2E20]/80 leading-relaxed m-0 italic"
                >
                  {activeExperience.poeticQuote ||
                    'At Idanazhi, time slows to the whisper of emerald paddy fields, the chime of temple bells, and the timeless warmth of village living.'}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Subtle Progress Bar & Vertical Controls */}
            <div className="flex items-center justify-center gap-3 mt-6 pt-3 border-t border-[#4E2418]/10 w-full max-w-[260px]">
              <button
                type="button"
                onClick={goToPrev}
                className="p-1.5 text-[#4E2418]/60 hover:text-[#4E2418] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                title={`Previous: ${prevExperience.shortTitle}`}
                aria-label="Previous Activity"
              >
                <ChevronUp size={16} />
              </button>

              {/* Progress Line */}
              <div className="flex-1 h-[2px] bg-[#4E2418]/15 relative overflow-hidden rounded-full">
                <motion.div
                  key={`progress-${currentIndex}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: AUTO_SLIDE_INTERVAL / 1000,
                    ease: 'linear',
                  }}
                  className="h-full bg-[#84382B]"
                />
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="p-1.5 text-[#4E2418]/60 hover:text-[#4E2418] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                title={`Next: ${nextExperience.shortTitle}`}
                aria-label="Next Activity"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed Main Photograph (MATCHES MIDDLE VIGNETTE EXACTLY) */}
        <div className="w-full lg:w-[52%] xl:w-[54%] relative overflow-hidden h-[460px] sm:h-[560px] lg:h-auto lg:min-h-full bg-[#351e15]">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.img
              key={`main-photo-${activeExperience.id}`}
              custom={direction}
              variants={mainImageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              src={activeExperience.image}
              alt={activeExperience.title}
              className="w-full h-full object-cover object-center absolute inset-0"
            />
          </AnimatePresence>

          {/* Subtle gradient wash over bottom/edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none z-1" />
        </div>

        {/* =====================================================================
            CENTER 3 FLOATING COLLAGE VIGNETTES
            - Top Vignette: Previous activity picture (Click -> vertical transition)
            - Middle Vignette: Current activity picture (IDENTICAL to main right picture!)
            - Bottom Vignette: Next activity picture (Click -> vertical transition)
            ===================================================================== */}
        {/* Desktop Positioning */}
        <div className="hidden lg:block pointer-events-none z-20">
          {/* Top Vignette (PREVIOUS Activity Image - Clickable, No Border) */}
          <div
            onClick={goToPrev}
            className="absolute top-[8%] xl:top-[10%] left-[48%] xl:left-[46%] -translate-x-1/2 w-[120px] xl:w-[135px] h-[140px] xl:h-[160px] overflow-hidden shadow-[0_16px_36px_rgba(45,25,18,0.22)] pointer-events-auto cursor-pointer transition-transform duration-500 ease-out hover:scale-105 group bg-[#EAE3D6]"
            title={`Click to view previous: ${prevExperience.shortTitle}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && goToPrev()}
            aria-label={`Previous activity: ${prevExperience.shortTitle}`}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.img
                key={`top-prev-${prevExperience.id}`}
                custom={direction}
                variants={vignetteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                src={prevExperience.image}
                alt={`Previous: ${prevExperience.title}`}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>

            {/* Hover overlay indicator */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2 text-center pointer-events-none">
              <ChevronUp size={20} className="mb-0.5 text-white animate-bounce" />
              <span className="font-sans text-[8.5px] uppercase tracking-[0.18em] font-semibold">
                PREV
              </span>
              <span className="font-serif text-[11px] leading-tight line-clamp-1 mt-0.5">
                {prevExperience.shortTitle}
              </span>
            </div>

            {/* Subtle corner badge */}
            <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 text-[8px] font-sans font-medium text-white tracking-widest uppercase rounded-2xs z-10">
              0{prevIndex + 1}
            </div>
          </div>

          {/* Middle Vignette (CURRENT Activity Image - SAME AS RIGHT MAIN PICTURE, No Border) */}
          <div
            onClick={() => handleBookExperience(activeExperience.title)}
            className="absolute top-[42%] xl:top-[44%] left-[44%] xl:left-[42%] -translate-x-1/2 w-[138px] xl:w-[158px] h-[138px] xl:h-[158px] overflow-hidden shadow-[0_22px_48px_rgba(45,25,18,0.30)] pointer-events-auto cursor-pointer transition-transform duration-500 ease-out hover:scale-105 group bg-[#EAE3D6]"
            title={`Current: ${activeExperience.shortTitle} (Click to explore)`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleBookExperience(activeExperience.title)}
            aria-label={`Current activity: ${activeExperience.shortTitle}`}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.img
                key={`mid-active-${activeExperience.id}`}
                custom={direction}
                variants={vignetteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                src={activeExperience.image}
                alt={`Current: ${activeExperience.title}`}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>

            {/* Active Tag */}
            <div className="absolute top-1.5 right-1.5 bg-[#84382B] text-white px-2 py-0.5 text-[7.5px] font-sans font-bold tracking-[0.2em] uppercase shadow-xs z-10">
              ACTIVE
            </div>

            {/* Hover details overlay */}
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2.5 text-center pointer-events-none">
              <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#FAF7F2]/90 font-medium mb-1">
                IMMERSION 0{currentIndex + 1}
              </span>
              <span className="font-serif text-[12px] leading-tight line-clamp-2">
                {activeExperience.shortTitle}
              </span>
            </div>
          </div>

          {/* Bottom Vignette (NEXT Activity Image - Clickable, No Border) */}
          <div
            onClick={goToNext}
            className="absolute top-[72%] xl:top-[74%] left-[49%] xl:left-[47%] -translate-x-1/2 w-[125px] xl:w-[145px] h-[125px] xl:h-[145px] overflow-hidden shadow-[0_18px_38px_rgba(45,25,18,0.24)] pointer-events-auto cursor-pointer transition-transform duration-500 ease-out hover:scale-105 group bg-[#EAE3D6]"
            title={`Click to view next: ${nextExperience.shortTitle}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && goToNext()}
            aria-label={`Next activity: ${nextExperience.shortTitle}`}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.img
                key={`bot-next-${nextExperience.id}`}
                custom={direction}
                variants={vignetteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                src={nextExperience.image}
                alt={`Next: ${nextExperience.title}`}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>

            {/* Hover overlay indicator */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2 text-center pointer-events-none">
              <ChevronDown size={20} className="mt-0.5 text-white animate-bounce" />
              <span className="font-sans text-[8.5px] uppercase tracking-[0.18em] font-semibold">
                NEXT
              </span>
              <span className="font-serif text-[11px] leading-tight line-clamp-1 mt-0.5">
                {nextExperience.shortTitle}
              </span>
            </div>

            {/* Subtle corner badge */}
            <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 text-[8px] font-sans font-medium text-white tracking-widest uppercase rounded-2xs z-10">
              0{nextIndex + 1}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Inset Vignette Row (No Borders) */}
        <div className="lg:hidden flex items-center justify-center gap-3 px-4 py-4 bg-[#F4EFE6] border-t border-ink/10 overflow-x-auto">
          {/* Prev thumbnail */}
          <div
            onClick={goToPrev}
            className="w-[95px] h-[105px] shrink-0 overflow-hidden shadow-md bg-linen relative cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <img
              src={prevExperience.image}
              alt={prevExperience.shortTitle}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-white text-[8px] font-sans uppercase tracking-widest">
              <ChevronUp size={14} />
              <span>PREV</span>
            </div>
          </div>

          {/* Active thumbnail (SAME as main photo, No Border) */}
          <div
            className="w-[115px] h-[115px] shrink-0 overflow-hidden shadow-lg bg-linen relative"
          >
            <img
              src={activeExperience.image}
              alt={activeExperience.shortTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 right-1 bg-[#84382B] text-white px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider">
              ACTIVE
            </div>
          </div>

          {/* Next thumbnail */}
          <div
            onClick={goToNext}
            className="w-[95px] h-[105px] shrink-0 overflow-hidden shadow-md bg-linen relative cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <img
              src={nextExperience.image}
              alt={nextExperience.shortTitle}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-white text-[8px] font-sans uppercase tracking-widest">
              <ChevronDown size={14} />
              <span>NEXT</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ACTIVITY SELECTOR BAR (Fast interactive switching across all 7 activities)
          ========================================================================= */}
      <nav
        aria-label="Experience Activities Navigation"
        className="sticky top-0 z-30 bg-paper/95 backdrop-blur-md border-b border-ink/10 py-3.5 px-4 sm:px-8 shadow-xs"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-start lg:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
          {experienceSubCategories.map((exp, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  const el = document.getElementById(exp.slug);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 text-[10.5px] uppercase tracking-[0.16em] font-sans transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#4E2418] text-white font-medium shadow-xs'
                    : 'bg-transparent text-[#4E2418]/80 hover:text-[#4E2418] hover:bg-black/5'
                }`}
              >
                0{index + 1}. {exp.shortTitle}
              </button>
            );
          })}
        </div>
      </nav>

      {/* =========================================================================
          DETAILED ACTIVITY CHAPTERS (Deep Storytelling, Timing & Full Photography)
          ========================================================================= */}
      <section className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto py-20 lg:py-28 space-y-28 lg:space-y-36">
        {experienceSubCategories.map((exp, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={exp.id}
              id={exp.slug}
              className={`scroll-mt-[100px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isEven ? '' : 'lg:[&>*:first-child]:order-2'
              }`}
            >
              {/* Photo & Collage Column */}
              <div className="lg:col-span-7 space-y-4">
                {/* Main Large Photograph */}
                <div className="relative group overflow-hidden border border-ink/10 shadow-[0_16px_44px_rgba(45,25,18,0.1)] aspect-[16/10] bg-linen">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Number Tag */}
                  <div className="absolute top-4 left-4 bg-paper/95 backdrop-blur-xs px-3 py-1 border border-ink/10 text-[9px] uppercase tracking-[0.24em] font-semibold text-[#84382B]">
                    Activity 0{index + 1}
                  </div>
                </div>

                {/* Micro Collage Vignette Thumbnails (No Border) */}
                <div className="grid grid-cols-3 gap-3">
                  {exp.vignette1 && (
                    <div className="aspect-[4/3] overflow-hidden bg-linen shadow-2xs group">
                      <img
                        src={exp.vignette1}
                        alt={`${exp.title} thumbnail 1`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {exp.vignette2 && (
                    <div className="aspect-[4/3] overflow-hidden bg-linen shadow-2xs group">
                      <img
                        src={exp.vignette2}
                        alt={`${exp.title} thumbnail 2`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {exp.vignette3 && (
                    <div className="aspect-[4/3] overflow-hidden bg-linen shadow-2xs group">
                      <img
                        src={exp.vignette3}
                        alt={`${exp.title} thumbnail 3`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Text & Activity Narrative Column */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <p className="m-0 mb-2 uppercase tracking-[0.22em] text-[10px] font-semibold text-[#84382B]">
                  {exp.subtitle}
                </p>
                <h2 className="font-serif text-[clamp(28px,3.2vw,44px)] font-normal text-[#2D1912] leading-[1.14] m-0 mb-4 tracking-[-0.02em]">
                  {exp.title}
                </h2>
                <p className="font-sans text-[14.5px] text-[#5A3828]/95 leading-relaxed font-light m-0 mb-6">
                  {exp.longDescription}
                </p>

                {/* Meta details: Duration & Optimal Time */}
                <div className="grid grid-cols-2 gap-3 py-3.5 mb-6 border-y border-ink/12">
                  {exp.duration && (
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-[#84382B] shrink-0" />
                      <div>
                        <span className="block text-[8.5px] uppercase tracking-[0.16em] text-muted font-medium">
                          Duration
                        </span>
                        <span className="text-[12px] font-medium text-[#2D1912]">{exp.duration}</span>
                      </div>
                    </div>
                  )}
                  {exp.bestTime && (
                    <div className="flex items-center gap-2">
                      <Sun size={15} className="text-[#84382B] shrink-0" />
                      <div>
                        <span className="block text-[8.5px] uppercase tracking-[0.16em] text-muted font-medium">
                          Optimal Timing
                        </span>
                        <span className="text-[12px] font-medium text-[#2D1912]">{exp.bestTime}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Highlights List */}
                <div className="mb-8">
                  <p className="m-0 mb-2.5 text-[10px] uppercase tracking-[0.18em] font-semibold text-muted">
                    Activity Highlights
                  </p>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[13px] text-[#4E2418]/90 font-light leading-snug"
                      >
                        <Check size={14} className="text-[#84382B] mt-[2px] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleBookExperience(exp.title)}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#4E2418] text-white font-sans text-[10.5px] font-medium tracking-[0.18em] uppercase transition-all duration-200 hover:bg-[#84382B] active:scale-95 cursor-pointer shadow-xs"
                  >
                    RESERVE THIS EXPERIENCE
                  </button>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.14em] text-[#84382B] hover:text-[#4E2418] transition-colors"
                  >
                    <span>General Inquiry</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* =========================================================================
          BOOKING & ENQUIRY MODAL (Full custom modal integration)
          ========================================================================= */}
      {bookingOpen && (
        <BookingPanel
          defaultOccasion={
            selectedExperience?.toLowerCase().includes('stay')
              ? 'heritage-stay'
              : 'celebration'
          }
          close={() => {
            setBookingOpen(false);
            setSelectedExperience(null);
          }}
        />
      )}
    </main>
  );
}
