'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { BrandLogo } from '@/components/layout/brand-logo';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const bottomBarVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.45,
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
      viewport={{ once: true, amount: 0.12 }}
      className="relative w-full bg-[#F6F0E9] text-[#5A3828] overflow-hidden border-t border-[#7C402E]/10"
    >
      {/* Upper Content Area with Background Caricature Illustration */}
      <div className="relative w-full">
        {/* Background caricature illustration with seamless responsive scaling anchored above bottom bar */}
        <motion.div
          variants={bgVariants}
          className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat pointer-events-none origin-bottom"
          style={{
            backgroundImage: "url('/images/guruvayoor-footer-bg.jpg')",
            backgroundSize: '100% auto',
          }}
        />

        {/* Footer Main Content positioned in the upper blank space */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 pt-10 sm:pt-14 lg:pt-16 pb-24 sm:pb-36 md:pb-44 lg:pb-56 xl:pb-64"
        >
          {/* Responsive Grid:
              - Mobile (<640px): 2 columns. Logo full width, Explore (col 1) & Your Stay (col 2), Stay In Touch full width
              - Tablet (640px-1023px): 12 columns. Logo centered on top (12 cols), Explore (4 cols), Your Stay (4 cols), Stay In Touch (4 cols) side-by-side!
              - Desktop (1024px+): 4 columns in 1 row with vertical hairline dividers
          */}
          <div className="grid grid-cols-2 sm:grid-cols-12 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-10 lg:gap-0 lg:divide-x lg:divide-[#7C402E]/20">
            
            {/* Column 1: Brand Logo */}
            <motion.div
              variants={columnVariants}
              className="col-span-2 sm:col-span-12 lg:col-span-1 flex flex-col items-center justify-center text-center lg:px-6 xl:px-8 first:pl-0 lg:self-start lg:pt-1 sm:mb-2 lg:mb-0"
            >
              <Link
                href="/"
                aria-label="IDANAZHI Farm Stay"
                className="inline-block transition-transform duration-300 hover:scale-105 -translate-y-1.5 sm:-translate-y-2 lg:-translate-y-4"
              >
                <BrandLogo className="h-16 sm:h-20 md:h-22 lg:h-28 xl:h-32 w-auto max-w-[220px] sm:max-w-[260px] md:max-w-[280px] lg:max-w-[320px]" />
              </Link>
            </motion.div>

            {/* Column 2: EXPLORE */}
            <motion.div
              variants={columnVariants}
              className="col-span-1 sm:col-span-4 lg:col-span-1 flex flex-col items-start px-1 sm:px-3 md:px-5 lg:px-8 xl:px-10"
            >
              <span className="h-[2px] w-6 bg-[#84382B] mb-2.5 rounded-full" />
              <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-3.5">
                EXPLORE
              </h3>
              <ul className="space-y-2 text-[13px] sm:text-[13.5px] font-serif text-[#5A3828]">
                <li>
                  <Link href="/hotels-resorts/#story" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Story
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#gallery" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/singapore/experiences/" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#offers" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Offers
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#rooms" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/#celebration" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Celebrations
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 3: YOUR STAY */}
            <motion.div
              variants={columnVariants}
              className="col-span-1 sm:col-span-4 lg:col-span-1 flex flex-col items-start px-1 sm:px-3 md:px-5 lg:px-8 xl:px-10"
            >
              <span className="h-[2px] w-6 bg-[#84382B] mb-2.5 rounded-full" />
              <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-3.5">
                YOUR STAY
              </h3>
              <ul className="space-y-2 text-[13px] sm:text-[13.5px] font-serif text-[#5A3828]">
                <li>
                  <a href="mailto:hello@idanazhi.com" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link href="/hotels-resorts/" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Manage Reservation
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link href="/hotels-resorts/" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Loyalty
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 4: STAY IN TOUCH */}
            <motion.div
              variants={columnVariants}
              className="col-span-2 sm:col-span-4 lg:col-span-1 flex flex-col items-start px-1 sm:px-3 md:px-5 lg:px-8 xl:px-10 pt-4 sm:pt-0 border-t border-[#7C402E]/15 sm:border-t-0"
            >
              <span className="h-[2px] w-6 bg-[#84382B] mb-2.5 rounded-full" />
              <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-2.5">
                STAY IN TOUCH
              </h3>
              <p className="font-serif text-[13px] sm:text-[13.5px] leading-relaxed text-[#5A3828] mb-4 max-w-[280px]">
                Get inspiration, offers and stories
                <br />
                from the world of Idanazhi.
              </p>

              <form onSubmit={handleSubmit} className="w-full max-w-[290px] mb-4" noValidate>
                <div className="relative flex items-center border-b border-[#7C402E]/35 pb-1 focus-within:border-[#7C402E]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSent(false);
                    }}
                    placeholder="Your email address"
                    aria-label="Your email address"
                    className="w-full bg-transparent text-[13px] text-[#5A3828] placeholder:text-[#8C6D5F]/60 placeholder:font-serif outline-none py-1 pr-9"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-0 w-7 h-7 rounded-full bg-[#84382B] hover:bg-[#6E2E20] text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
                {sent && (
                  <p className="text-[11px] text-[#7C402E] font-serif mt-1.5">
                    Thank you for subscribing to our stories.
                  </p>
                )}
              </form>

              <div className="flex items-center gap-3 text-[#7C402E]">
                <a
                  href="https://www.instagram.com/idanazhi/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#84382B] transition-colors p-1 -m-1"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <span className="h-3.5 w-[1px] bg-[#7C402E]/30" />
                <a
                  href="https://www.youtube.com/@idanazhi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="hover:text-[#84382B] transition-colors p-1 -m-1"
                >
                  <svg width="19" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Copyright & Legal Links Bar with Rich Terracotta Grounding */}
      <motion.div
        variants={bottomBarVariants}
        className="relative z-20 w-full bg-[#543224] text-[#F6F0E9] border-t border-[#7C402E]/20"
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-[11.5px] text-[#F6F0E9]/90 tracking-[0.04em] gap-2.5">
            <p className="m-0 text-center sm:text-left font-sans">
              &copy; 2026 Idanazhi Farm Stay, Guruvayoor. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-[#F6F0E9]/80 font-sans">
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
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
