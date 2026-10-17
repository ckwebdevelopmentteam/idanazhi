'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { BrandLogo } from '@/components/layout/brand-logo';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) {
      setSent(true);
      setEmail('');
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      className="relative z-30 w-full overflow-hidden"
    >
      {/* ── TOP PRE-FOOTER COMMUNITY SECTION (Warm Cream / Paper Canvas) ── */}
      <section className="relative w-full bg-[#F7F3EF] pt-16 sm:pt-20 md:pt-24 pb-0 text-center">
        <motion.div variants={containerVariants} className="max-w-[760px] mx-auto px-5">
          {/* Cursive / Script Calligraphy Eyebrow */}
          <motion.p
            variants={fadeUpVariants}
            className="font-script text-[36px] sm:text-[46px] md:text-[54px] text-[#C25934] leading-none mb-1 select-none"
          >
            Join Our Community
          </motion.p>

          {/* Majestic Luxury Serif Hashtag */}
          <motion.h2
            variants={fadeUpVariants}
            className="font-serif font-normal text-[clamp(32px,5.4vw,66px)] leading-[1.08] tracking-[-0.015em] text-[#381810] m-0 mb-2 sm:mb-3"
          >
            #liveidanazhi
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans text-[13px] sm:text-[15px] text-[#79665E] max-w-lg mx-auto leading-relaxed m-0"
          >
            Share your cherished celebrations, ceremonies &amp; serene moments at Idanazhi using the hashtag
          </motion.p>

          {/* Center Vertical Hanging String */}
          <motion.div variants={fadeUpVariants} className="flex flex-col items-center justify-center mt-6 sm:mt-8">
            <div className="w-[1.5px] h-8 sm:h-12 bg-[#381810]/35" />
            {/* Hanging Pendant Sitting Over the Wave Trough */}
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#381810] text-[#F7F3EF] flex items-center justify-center shadow-lg border border-[#D8C4B4]/40 z-10 relative -mb-5 sm:-mb-6 transition-transform duration-300 hover:scale-110"
              aria-hidden="true"
            >
              {/* Sacred Kerala Nilavilakku / Temple Lotus Motif */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#E9DDD5]"
              >
                <path
                  d="M12 2C12 2 15 6 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 6 12 2 12 2Z"
                  fill="#D47145"
                  stroke="#D47145"
                />
                <path d="M7 16H17M9 19H15M10 22H14M12 12V16" stroke="#E9DDD5" strokeWidth="1.6" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* ── ORGANIC DUAL-ARCH WAVE BOUNDARY ── */}
        <div className="w-full overflow-hidden leading-none -mb-[1px]">
          <svg
            viewBox="0 0 1440 160"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-[65px] sm:h-[110px] md:h-[150px] block text-[#381810]"
          >
            <path
              d="M 0,90 C 120,60 220,15 340,15 C 460,15 600,95 720,95 C 840,95 980,15 1100,15 C 1220,15 1320,60 1440,90 L 1440,160 L 0,160 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ── MAIN FOOTER BODY (Deep Regal Kerala Terracotta Canvas) ── */}
      <div className="relative w-full bg-[#381810] text-[#F7F3EF] px-5 sm:px-8 lg:px-16 pt-3 sm:pt-6 pb-12 sm:pb-16">
        <motion.div variants={containerVariants} className="max-w-[1200px] mx-auto">
          {/* Centered Brand Logo */}
          <motion.div variants={fadeUpVariants} className="flex flex-col items-center justify-center text-center mb-10 sm:mb-14">
            <Link
              href="/"
              aria-label="IDANAZHI Farm Stay"
              className="inline-block transition-transform duration-300 hover:scale-105"
            >
              <BrandLogo className="brightness-0 invert opacity-95 hover:opacity-100 transition-opacity h-12 sm:h-16 md:h-20 w-auto max-w-[220px] sm:max-w-[280px]" />
            </Link>
            <p className="text-[9.5px] sm:text-[10px] tracking-[0.26em] text-[#D8C4B4]/70 uppercase font-sans mt-3">
              FARM STAY &amp; DESTINATION WEDDINGS · GURUVAYOOR
            </p>
          </motion.div>

          {/* 3 Navigation Columns */}
          <motion.div
            variants={fadeUpVariants}
            className="grid grid-cols-1 sm:grid-cols-3 max-w-[960px] mx-auto text-center gap-8 sm:gap-10 lg:gap-14 mb-10 sm:mb-12"
          >
            {/* Column 1: DESTINATIONS & STAYS */}
            <div>
              <h3 className="text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.22em] text-[#E8D7CA] uppercase mb-3.5 sm:mb-4">
                DESTINATIONS &amp; STAYS
              </h3>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-serif text-[#D8C4B4]">
                <li>
                  <Link href="/hotels-resorts/#rooms" className="transition-colors hover:text-white inline-block py-0.5">
                    The Heritage Suite
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#rooms" className="transition-colors hover:text-white inline-block py-0.5">
                    Nalukettu Chamber
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#rooms" className="transition-colors hover:text-white inline-flex items-center gap-1.5 py-0.5">
                    <span>Courtyard Pavilions</span>
                    <span className="bg-[#C25934] text-white text-[8.5px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#rooms" className="transition-colors hover:text-white inline-block py-0.5">
                    Verandah Sanctuary
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#rooms" className="transition-colors hover:text-white inline-block py-0.5">
                    Plantation Villas
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/" className="transition-colors hover:text-white inline-block py-0.5">
                    Exclusive Estate Buyout
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: WEDDINGS & CELEBRATIONS */}
            <div>
              <h3 className="text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.22em] text-[#E8D7CA] uppercase mb-3.5 sm:mb-4">
                WEDDINGS &amp; CELEBRATIONS
              </h3>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-serif text-[#D8C4B4]">
                <li>
                  <Link href="/hotels-resorts/#celebration" className="transition-colors hover:text-white inline-block py-0.5">
                    Nadumuttam Courtyard Vows
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#celebration" className="transition-colors hover:text-white inline-block py-0.5">
                    Amphitheatre Receptions
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#celebration" className="transition-colors hover:text-white inline-block py-0.5">
                    Sacred Kerala Rituals
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#celebration" className="transition-colors hover:text-white inline-block py-0.5">
                    Haldi &amp; Sangeet Lawns
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#celebration" className="transition-colors hover:text-white inline-block py-0.5">
                    Traditional Sadhya Feasts
                  </Link>
                </li>
                <li>
                  <a href="mailto:hello@idanazhi.com" className="transition-colors hover:text-white inline-block py-0.5">
                    Concierge &amp; Auspicious Dates
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: HERITAGE & ESSENCE */}
            <div>
              <h3 className="text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.22em] text-[#E8D7CA] uppercase mb-3.5 sm:mb-4">
                HERITAGE &amp; ESSENCE
              </h3>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-serif text-[#D8C4B4]">
                <li>
                  <Link href="/hotels-resorts/#story" className="transition-colors hover:text-white inline-block py-0.5">
                    The Story of Idanazhi
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#story" className="transition-colors hover:text-white inline-block py-0.5">
                    Kerala Timber Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/singapore/experiences/" className="transition-colors hover:text-white inline-block py-0.5">
                    Experiences Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="transition-colors hover:text-white inline-block py-0.5">
                    Guest Reflections
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/" className="transition-colors hover:text-white inline-block py-0.5">
                    Location &amp; Guruvayoor
                  </Link>
                </li>
                <li>
                  <a href="mailto:hello@idanazhi.com" className="transition-colors hover:text-white inline-block py-0.5">
                    Contact &amp; Walkthroughs
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Social Icons Row */}
          <motion.div variants={fadeUpVariants} className="flex items-center justify-center gap-3.5 sm:gap-4 mb-12 sm:mb-14">
            {/* Facebook */}
            <a
              href="https://facebook.com/idanazhi"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#D8C4B4]/25 flex items-center justify-center text-[#D8C4B4] hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 shadow-sm"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/idanazhi/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#D8C4B4]/25 flex items-center justify-center text-[#D8C4B4] hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 shadow-sm"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@idanazhi"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#D8C4B4]/25 flex items-center justify-center text-[#D8C4B4] hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/idanazhi"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#D8C4B4]/25 flex items-center justify-center text-[#D8C4B4] hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
          </motion.div>

          {/* ── ASSISTANCE & PRIVILEGES CARD (Lush Kerala Temple Green Banner) ── */}
          <motion.div variants={fadeUpVariants} className="max-w-[1040px] mx-auto relative mb-12 sm:mb-16">
            {/* Top Pinned Pill Badge */}
            <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#C25934] text-white text-[10px] sm:text-[11.5px] font-semibold tracking-[0.14em] uppercase px-4 sm:px-6 py-1 sm:py-1.5 rounded-full shadow-lg border border-white/20 whitespace-nowrap z-10 select-none">
              Reserve Auspicious Dates &amp; Bespoke Privileges
            </div>

            {/* Card Container */}
            <div className="rounded-[22px] sm:rounded-[32px] bg-gradient-to-r from-[#173A2B] via-[#1E4534] to-[#173A2B] border border-[#2B5E47]/70 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="font-serif font-normal text-white text-[23px] sm:text-[30px] md:text-[36px] leading-tight tracking-tight m-0">
                  We&apos;d be happy to assist you!
                </h3>
                <p className="font-sans text-[12px] sm:text-[13.5px] text-[#A8D3BE]/85 m-0 mt-1.5 max-w-md">
                  Connect with our wedding &amp; stay concierge for date availability and tailored estate proposals.
                </p>
              </div>

              {/* Integrated Pill Input Form */}
              <form onSubmit={handleSubmit} className="w-full lg:w-[440px] shrink-0" noValidate>
                <div className="relative flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/40 p-1.5 pl-4 sm:pl-5 transition-all focus-within:border-white focus-within:ring-2 focus-within:ring-white/20 shadow-inner">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSent(false);
                    }}
                    placeholder="Enter Email Address"
                    aria-label="Enter Email Address"
                    className="w-full bg-transparent text-white placeholder:text-white/65 text-[13px] sm:text-[14px] outline-none pr-3 font-sans"
                  />
                  <button
                    type="submit"
                    className="bg-[#F7F3EF] hover:bg-white text-[#173A2B] font-semibold text-[12px] sm:text-[13px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200 flex items-center gap-1 shadow-md shrink-0 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Submit</span>
                    <ChevronRight size={14} className="stroke-[2.5]" />
                  </button>
                </div>
                {sent && (
                  <p className="text-[11.5px] text-[#A8D3BE] font-sans mt-2 text-center lg:text-left">
                    ✓ Thank you! Our hospitality concierge will be in touch with you shortly.
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Bottom Copyright & Legal Links */}
          <motion.div
            variants={fadeUpVariants}
            className="max-w-[1040px] mx-auto pt-6 border-t border-[#D8C4B4]/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-[11px] sm:text-[12px] text-[#D8C4B4]/75 font-sans gap-3"
          >
            <p className="m-0">
              &copy; 2026 Idanazhi Farm Stay &amp; Weddings. All Rights Reserved. &nbsp;|&nbsp; Guruvayoor, Kerala
            </p>
            <div className="flex items-center gap-3 text-[#D8C4B4]/80">
              <Link href="/privacy" className="hover:text-white transition-colors py-0.5">
                Privacy
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-white transition-colors py-0.5">
                Terms
              </Link>
              <span>·</span>
              <Link href="/accessibility" className="hover:text-white transition-colors py-0.5">
                Accessibility
              </Link>
            </div>
          </motion.div>

          {/* Center Vertical Hanging String & Sacred Bottom Emblem Pendant */}
          <motion.div variants={fadeUpVariants} className="flex flex-col items-center justify-center mt-6">
            <div className="w-[1.5px] h-6 sm:h-8 bg-[#D8C4B4]/40" />
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F7F3EF] text-[#381810] shadow-xl flex items-center justify-center border border-[#D8C4B4]/50 -mt-1 hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            >
              {/* Idanazhi Sacred Emblem SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-[#381810]">
                <circle cx="12" cy="12" r="9" stroke="#7C402E" strokeWidth="1.4" />
                <path d="M12 6V18M6 12H18" stroke="#7C402E" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill="#7C402E" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
