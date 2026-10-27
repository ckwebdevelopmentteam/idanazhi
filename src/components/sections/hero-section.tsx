'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLenis } from 'lenis/react';

function LushSurroundingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-5 h-5 text-white/90 shrink-0"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-2.5-3.5-6-2.5-6.5-1 0 4 4 6.5 6.5 6.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.5-3.5 6-2.5 6.5-1 0 4-4 6.5-6.5 6.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-1-3.5 0-6 0-8 1.5 2 2.5 4.5 1.5 8" />
    </svg>
  );
}

function ComfortableStaysIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-5 h-5 text-white/90 shrink-0"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 19V8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 19v-6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 15h20" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 11h20v4H2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 11V8.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 12 8.5V11" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11V8.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V11" />
    </svg>
  );
}

function MemorableCelebrationsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-5 h-5 text-white/90 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5c1.5 2.5 1.5 4.5 0 7-1.5-2.5-1.5-4.5 0-7Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.5c1.5 2.5 1.5 4.5 0 7-1.5-2.5-1.5-4.5 0-7Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12c2.5-1.5 4.5-1.5 7 0-2.5 1.5-4.5 1.5-7 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 12c2.5-1.5 4.5-1.5 7 0-2.5 1.5-4.5 1.5-7 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 3.5 3.5M14.5 14.5 18 18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m18 6-3.5 3.5M9.5 14.5 6 18" />
    </svg>
  );
}

export function HeroSection() {
  const lenis = useLenis();

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
    }
  };

  const handleExperiencesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('celebrations-and-experience') || document.getElementById('experiences');
    if (lenis && target) {
      lenis.scrollTo(target, { duration: 1.5, offset: -20 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/experiences';
    }
  };

  return (
    <section className="home-hero h-screen min-h-[100svh] relative bg-[#1c120c] text-white flex items-end overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover block"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="IDANAZHI Kerala Farm Stay & Event Space"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Ultra-subtle gradient overlay keeping the video bright, natural, and vibrant */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20 z-1" />

      {/* Hero Content Container - Center Aligned */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14 pb-8 sm:pb-18 lg:pb-22 pt-[80px] sm:pt-[110px] flex flex-col justify-between items-center h-full text-center">
        {/* Invisible spacer for vertical balance */}
        <div className="hidden sm:block h-4" />

        {/* Center Content Group */}
        <div className="max-w-[840px] w-full flex flex-col items-center text-center my-auto">
          {/* Eyebrow with centered symmetric lines */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-2.5 sm:mb-4">
            <div className="h-[1px] w-6 sm:w-16 bg-white/50 shrink-0" />
            <span className="font-sans text-[9px] sm:text-[11.5px] font-semibold tracking-[0.2em] sm:tracking-[0.24em] text-white/95 uppercase whitespace-nowrap drop-shadow-sm">
              A KERALA FARM STAY &amp; EVENT SPACE
            </span>
            <div className="h-[1px] w-6 sm:w-16 bg-white/50 shrink-0" />
          </div>

          {/* Main Headline - Centered */}
          <h1 className="font-serif text-[clamp(34px,7.5vw,82px)] font-normal text-white leading-[1.04] sm:leading-[1.06] tracking-[-0.02em] m-0 mb-3 sm:mb-4.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] text-center max-w-[780px]">
            Moments that stay <br /> with you
          </h1>

          {/* Subtitle Paragraph - Centered */}
          <p className="font-sans font-light text-[13px] sm:text-[16px] leading-[1.6] text-white/90 max-w-[92vw] sm:max-w-[620px] mx-auto m-0 mb-6 sm:mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] text-center">
            Experience the traditions, landscapes, and everyday life of Kerala through fishing, farming, and local cultural journeys.
          </p>

          {/* Dual Action CTA Buttons - Compact horizontal side-by-side on mobile, full size on desktop */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-[340px] sm:max-w-none mx-auto">
            {/* Primary CTA: White Pill "START PLANNING" */}
            <Link
              href="/contact"
              onClick={handleBookClick}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-3 pl-3 sm:pl-6 pr-1.5 sm:pr-2.5 py-1.5 sm:py-3 rounded-full bg-white text-[#1a382e] font-sans text-[8.5px] sm:text-[11px] font-semibold tracking-[0.06em] sm:tracking-[0.16em] uppercase transition-all duration-300 hover:bg-[#FAF7F2] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] shadow-md no-underline active:scale-95 cursor-pointer whitespace-nowrap"
              aria-label="START PLANNING Stay - Navigate to reservations"
            >
              <span>START PLANNING</span>
              <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#1a382e] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 sm:group-hover:translate-x-1">
                <ArrowRight size={9} strokeWidth={2.5} className="sm:hidden" />
                <ArrowRight size={13} strokeWidth={2.5} className="hidden sm:block" />
              </span>
            </Link>

            {/* Secondary CTA: White Pill "EXPLORE IDANAZHI" matching START PLANNING */}
            <Link
              href="/experiences"
              onClick={handleExperiencesClick}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-3 pl-3 sm:pl-6 pr-1.5 sm:pr-2.5 py-1.5 sm:py-3 rounded-full bg-white text-[#1a382e] font-sans text-[8.5px] sm:text-[11px] font-semibold tracking-[0.06em] sm:tracking-[0.16em] uppercase transition-all duration-300 hover:bg-[#FAF7F2] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] shadow-md no-underline active:scale-95 cursor-pointer whitespace-nowrap"
              aria-label="Explore Experiences"
            >
              <span>EXPLORE IDANAZHI</span>
              <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#1a382e] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 sm:group-hover:translate-x-1">
                <ArrowRight size={9} strokeWidth={2.5} className="sm:hidden" />
                <ArrowRight size={13} strokeWidth={2.5} className="hidden sm:block" />
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom 3 Feature Badges - Hidden on mobile screens, Symmetrical 3-Column Center Grid on desktop */}
        <div className="hidden sm:grid sm:grid-cols-3 items-center justify-center max-w-[860px] w-full mx-auto gap-3.5 sm:gap-4 pt-4">
          {/* Badge 1: Weddings */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <MemorableCelebrationsIcon />
            <span className="font-sans font-semibold text-[9.5px] sm:text-[10.5px] tracking-[0.18em] uppercase text-white/95 whitespace-nowrap drop-shadow-sm">
              WEDDINGS
            </span>
          </div>

          {/* Badge 2: Farm Stay - Exactly centered at 50% viewport width */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <ComfortableStaysIcon />
            <span className="font-sans font-semibold text-[9.5px] sm:text-[10.5px] tracking-[0.18em] uppercase text-white/95 whitespace-nowrap drop-shadow-sm">
              FARM STAY
            </span>
          </div>

          {/* Badge 3: Discover the Roots */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <LushSurroundingsIcon />
            <span className="font-sans font-semibold text-[9.5px] sm:text-[10.5px] tracking-[0.18em] uppercase text-white/95 whitespace-nowrap drop-shadow-sm">
              DISCOVER THE ROOTS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
