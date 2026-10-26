'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Sun, Sparkles, Check, ChevronDown } from 'lucide-react';
import { experienceSubCategories } from '@/data/navigation';
import { BookingPanel } from '@/components/sections/booking-panel';

export default function ExperiencesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const handleBookExperience = (expTitle: string) => {
    setSelectedExperience(expTitle);
    setBookingOpen(true);
  };

  return (
    <main className="bg-paper min-h-screen text-ink">
      {/* Editorial Title Hero */}
      <section className="relative pt-[160px] pb-[80px] md:pt-[190px] md:pb-[110px] px-6 text-center max-w-[1240px] mx-auto">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-ink/15 bg-linen/50 text-[10px] uppercase font-sans font-semibold tracking-[0.22em] text-[#84382B]">
          <Sparkles size={12} />
          <span>Curated Immersions</span>
        </div>
        <h1 className="font-serif text-[clamp(36px,5.2vw,72px)] font-normal leading-[1.08] tracking-[-0.035em] text-[#2D1912] m-0 mb-6 max-w-[920px] mx-auto">
          Adventures & Encounters Rooted in Kerala Heritage
        </h1>
        <p className="font-sans text-[15px] sm:text-[17px] text-[#5A3828]/90 max-w-[640px] mx-auto font-light leading-relaxed m-0 mb-10">
          In every encounter at Idanazhi, discover deeply personal experiences designed to connect your soul with the timeless rhythms of rural Kerala—from agrarian fields to ancient sanctums.
        </p>

        {/* Quick Anchor Navigation Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
          {experienceSubCategories.map((item) => (
            <a
              key={item.id}
              href={`#${item.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] font-sans font-medium border border-ink/20 text-[#4E2418] bg-paper hover:bg-[#84382B] hover:text-white hover:border-[#84382B] transition-all duration-200"
            >
              <span>{item.shortTitle}</span>
              <ChevronDown size={12} className="opacity-60" />
            </a>
          ))}
        </div>
      </section>

      {/* Experience Sub-Categories Section */}
      <section className="px-6 md:px-12 max-w-[1360px] mx-auto pb-[130px] space-y-24 md:space-y-32">
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
              {/* Image Column */}
              <div className="lg:col-span-7 relative group overflow-hidden border border-ink/10 shadow-[0_16px_40px_rgba(45,25,18,0.08)]">
                <div className="aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-linen">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Subtle Image Tag */}
                <div className="absolute top-4 left-4 bg-paper/92 backdrop-blur-xs px-3 py-1 border border-ink/10 text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#84382B]">
                  Experience 0{index + 1}
                </div>
              </div>

              {/* Text & Details Column */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <p className="m-0 mb-2 uppercase tracking-[0.2em] text-[10.5px] font-semibold text-[#84382B]">
                  {exp.subtitle}
                </p>
                <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-normal text-[#2D1912] leading-[1.12] m-0 mb-4 tracking-[-0.02em]">
                  {exp.title}
                </h2>
                <p className="font-sans text-[14.5px] text-[#5A3828]/95 leading-relaxed font-light m-0 mb-5">
                  {exp.longDescription}
                </p>

                {/* Meta details: Duration & Best Time */}
                <div className="grid grid-cols-2 gap-3 py-3.5 mb-5 border-y border-ink/12">
                  {exp.duration && (
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-[#84382B] shrink-0" />
                      <div>
                        <span className="block text-[9px] uppercase tracking-[0.14em] text-muted">Duration</span>
                        <span className="text-[12px] font-medium text-[#2D1912]">{exp.duration}</span>
                      </div>
                    </div>
                  )}
                  {exp.bestTime && (
                    <div className="flex items-center gap-2">
                      <Sun size={15} className="text-[#84382B] shrink-0" />
                      <div>
                        <span className="block text-[9px] uppercase tracking-[0.14em] text-muted">Optimal Time</span>
                        <span className="text-[12px] font-medium text-[#2D1912]">{exp.bestTime}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Highlights List */}
                <div className="mb-7">
                  <p className="m-0 mb-2.5 text-[10px] uppercase tracking-[0.16em] font-semibold text-muted">
                    Curated Highlights
                  </p>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-[#4E2418]/90 font-light leading-snug">
                        <Check size={14} className="text-[#84382B] mt-[2px] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleBookExperience(exp.title)}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#4E2418] text-white font-sans text-[10.5px] font-medium tracking-[0.18em] uppercase transition-all duration-200 hover:bg-[#84382B] active:scale-95 cursor-pointer"
                  >
                    RESERVE EXPERIENCE
                  </button>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.14em] text-[#84382B] hover:text-[#4E2418] transition-colors"
                  >
                    <span>Inquire Details</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Booking Dialog */}
      {bookingOpen && (
        <BookingPanel
          close={() => setBookingOpen(false)}
        />
      )}
    </main>
  );
}
