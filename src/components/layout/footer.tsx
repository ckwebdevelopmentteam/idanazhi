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
      className="relative z-30 w-full bg-[#FCF2E7] text-[#5A3828] overflow-hidden border-t border-[#7C402E]/10"
    >
      {/* Upper Content Area with Background Wedding Illustration */}
      <div className="relative w-full">
        {/* Background wedding illustration: Mobile portrait crop vs Desktop/Tablet landscape */}
        <motion.div
          variants={bgVariants}
          className="block sm:hidden absolute inset-0 w-full h-full bg-bottom bg-no-repeat pointer-events-none origin-bottom"
          style={{
            backgroundImage: "url('/images/mobile-footer.png')",
            backgroundSize: '100% auto',
            backgroundPosition: 'center bottom',
          }}
        />
        <motion.div
          variants={bgVariants}
          className="hidden sm:block absolute inset-0 w-full h-full bg-bottom bg-no-repeat pointer-events-none origin-bottom"
          style={{
            backgroundImage: "url('/images/footer.png')",
            backgroundSize: '100% auto',
            backgroundPosition: 'center bottom',
          }}
        />

        {/* Footer Main Content positioned in the upper blank space */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 pt-6 sm:pt-8 lg:pt-10 pb-40 sm:pb-24 md:pb-28 lg:pb-36 xl:pb-40"
        >
          {/* Responsive Grid:
              - Mobile (<640px): Centered, balanced luxury stack.
                - Logo: Centered at top, moved lower
                - Explore & Your Stay: 2 symmetrical columns (centered in each half)
                - Stay In Touch: Centered minimal CTA
              - Tablet (640px-1023px): 12 columns. Logo (12 cols), Explore (4 cols), Your Stay (4 cols), Stay In Touch (4 cols)
              - Desktop (1024px+): 12 columns. Logo (4 cols), Explore (2 cols), Your Stay (2 cols), Stay In Touch (4 cols on right)
          */}
          <div className="grid grid-cols-2 sm:grid-cols-12 lg:grid-cols-12 gap-x-6 sm:gap-x-8 lg:gap-x-8 gap-y-6 sm:gap-y-7">
            
            {/* Column 1: Brand Logo (moved lower for natural balance) */}
            <motion.div
              variants={columnVariants}
              className="col-span-2 sm:col-span-12 lg:col-span-4 xl:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left pr-0 sm:pr-4 lg:pr-6 pt-2 sm:pt-3 lg:pt-4"
            >
              <Link
                href="/"
                aria-label="IDANAZHI Farm Stay"
                className="inline-block transition-transform duration-300 hover:scale-[1.03] mt-2 sm:mt-3 lg:mt-4 mx-auto sm:mx-0"
              >
                <BrandLogo className="h-16 sm:h-22 md:h-26 lg:h-28 xl:h-32 w-auto max-w-[230px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[380px]" />
              </Link>
            </motion.div>

            {/* Column 2: EXPLORE */}
            <motion.div
              variants={columnVariants}
              className="relative col-span-1 sm:col-span-4 lg:col-span-2 xl:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 md:px-6 lg:px-6 xl:px-8"
            >
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-0 top-1.5 h-1/2 w-[1px] bg-[#7C402E]/20"
              />
              <span className="h-[2px] w-6 bg-[#84382B] mb-2.5 rounded-full mx-auto sm:mx-0" />
              <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-3.5">
                EXPLORE
              </h3>
              <ul className="space-y-2.5 text-[13px] sm:text-[13.5px] font-serif text-[#5A3828]">
                <li>
                  <Link href="/story" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Story
                  </Link>
                </li>
                <li>
                  <Link href="/#stay" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Stay
                  </Link>
                </li>
                <li>
                  <Link href="/#celebrations-and-experience" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Blogs
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 3: YOUR STAY */}
            <motion.div
              variants={columnVariants}
              className="relative col-span-1 sm:col-span-4 lg:col-span-2 xl:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 md:px-6 lg:px-6 xl:px-8"
            >
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-0 top-1.5 h-1/2 w-[1px] bg-[#7C402E]/20"
              />
              <span className="h-[2px] w-6 bg-[#84382B] mb-2.5 rounded-full mx-auto sm:mx-0" />
              <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-3.5">
                YOUR STAY
              </h3>
              <ul className="space-y-2.5 text-[13px] sm:text-[13.5px] font-serif text-[#5A3828]">
                <li>
                  <a href="mailto:hello@idanazhi.com" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link href="/#stay" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Accommodations
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 4: STAY IN TOUCH (Centered on mobile, right side on desktop) */}
            <motion.div
              variants={columnVariants}
              className="relative col-span-2 sm:col-span-4 lg:col-span-4 xl:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10"
            >
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-0 top-1.5 h-1/2 w-[1px] bg-[#7C402E]/20"
              />
              <span className="h-[2px] w-6 bg-[#84382B] mb-2 rounded-full mx-auto sm:mx-0" />
              <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-1.5">
                STAY IN TOUCH
              </h3>
              <p className="font-serif text-[11.5px] sm:text-[12px] leading-relaxed text-[#5A3828]/85 mb-2.5 max-w-[260px] mx-auto sm:mx-0">
                Get inspiration, offers and stories from Idanazhi.
              </p>

              {/* Sleek, Minimal Pill Input Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-[280px] sm:max-w-[260px] mx-auto sm:mx-0" noValidate>
                <div className="relative flex items-center rounded-full bg-white/75 hover:bg-white/90 focus-within:bg-white border border-[#7C402E]/20 focus-within:border-[#84382B] py-1 pl-3.5 pr-1 shadow-xs transition-all duration-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSent(false);
                    }}
                    placeholder="Your email address"
                    aria-label="Your email address"
                    className="w-full bg-transparent text-[11.5px] sm:text-[12px] text-[#5A3828] placeholder:text-[#8C6D5F]/65 placeholder:font-serif outline-none pr-2 font-serif text-center sm:text-left"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="w-6 h-6 rounded-full bg-[#84382B] hover:bg-[#6E2E20] text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
                {sent && (
                  <p className="text-[11px] text-[#7C402E] font-serif mt-1.5 text-center sm:text-left">
                    <span>✓</span> Subscribed. Thank you!
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Copyright & Legal Links Bar with Rich Terracotta Grounding */}
      <motion.div
        variants={bottomBarVariants}
        className="relative z-20 w-full bg-[#543224] text-[#F6F0E9] border-t border-[#7C402E]/20"
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[10.5px] sm:text-[11.5px] text-[#F6F0E9]/90 tracking-[0.04em] gap-2.5">
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
