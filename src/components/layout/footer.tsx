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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
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
      viewport={{ once: true, amount: 0.08 }}
      className="relative z-30 w-full bg-[#F6EDE1] text-[#4A2618] overflow-hidden"
    >
      {/* Upper Content Area with Background Wedding Illustration */}
      <div className="relative w-full">
        {/* Background wedding illustration: Mobile portrait crop vs Desktop/Tablet landscape */}
        <motion.div
          variants={bgVariants}
          className="block sm:hidden absolute inset-0 w-full h-full bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: "url('/images/mobile-footer.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        />
        <motion.div
          variants={bgVariants}
          className="hidden sm:block absolute inset-0 w-full h-full bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: "url('/images/footer.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        />

        {/* Footer Main Content placed directly in the natural light space */}
        <motion.div
          variants={containerVariants}
          className="relative z-10 w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 pt-5 sm:pt-8 md:pt-10 lg:pt-14 pb-44 sm:pb-52 md:pb-56 lg:pb-64 min-h-[460px] sm:min-h-[460px] md:min-h-[480px] lg:min-h-[500px]"
        >
          {/* Responsive Grid:
              - Mobile (<640px): Centered, balanced luxury stack in light space.
                - Logo: Centered at top
                - Explore & Your Stay: 2 symmetrical columns (centered in each half)
                - Stay In Touch: Centered minimal CTA
              - Tablet (640px-1023px): 12 columns. Logo (12 cols), Explore (4 cols), Your Stay (4 cols), Stay In Touch (4 cols)
              - Desktop (1024px+): 12 columns. Logo (4 cols), Explore (2 cols), Your Stay (2 cols), Stay In Touch (4 cols on right)
          */}
          <div className="grid grid-cols-2 sm:grid-cols-12 lg:grid-cols-12 gap-x-6 sm:gap-x-8 lg:gap-x-8 gap-y-6 sm:gap-y-7 items-start">
            
            {/* Column 1: Brand Logo */}
            <motion.div
              variants={columnVariants}
              className="col-span-2 sm:col-span-12 lg:col-span-4 xl:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left pr-0 sm:pr-4 lg:pr-6"
            >
              <Link
                href="/"
                aria-label="IDANAZHI Farm Stay"
                className="inline-block transition-transform duration-300 hover:scale-[1.03] mx-auto sm:mx-0"
              >
                <BrandLogo className="h-16 sm:h-20 md:h-24 lg:h-26 xl:h-28 w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[340px]" />
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
              <span className="h-[2px] w-6 bg-[#84382B] mb-2 rounded-full mx-auto sm:mx-0" />
              <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-3">
                EXPLORE
              </h3>
              <ul className="space-y-2 text-[13px] sm:text-[13.5px] font-serif text-[#4A2618]">
                <li>
                  <Link href="/story" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Story
                  </Link>
                </li>
                <li>
                  <Link href="/stay" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Stay
                  </Link>
                </li>
                <li>
                  <Link href="/celebrations" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Celebrations
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Gallery
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
              <span className="h-[2px] w-6 bg-[#84382B] mb-2 rounded-full mx-auto sm:mx-0" />
              <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-3">
                YOUR STAY
              </h3>
              <ul className="space-y-2 text-[13px] sm:text-[13.5px] font-serif text-[#4A2618]">
                <li>
                  <Link href="/#contact" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/stay" className="transition-colors hover:text-[#84382B] inline-block py-0.5">
                    Accommodations
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 4: STAY IN TOUCH */}
            <motion.div
              variants={columnVariants}
              className="relative col-span-2 sm:col-span-4 lg:col-span-4 xl:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 md:px-6 lg:px-6 xl:px-8"
            >
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-0 top-1.5 h-1/2 w-[1px] bg-[#7C402E]/20"
              />
              <span className="h-[2px] w-6 bg-[#84382B] mb-2 rounded-full mx-auto sm:mx-0" />
              <h3 className="text-[10.5px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-1.5">
                STAY IN TOUCH
              </h3>
              <p className="font-serif text-[11.5px] sm:text-[12px] leading-relaxed text-[#4A2618]/90 mb-2.5 max-w-[260px] mx-auto sm:mx-0">
                Get inspiration, offers and stories from Idanazhi.
              </p>

              {/* Minimal Pill Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-[270px] sm:max-w-[250px] mx-auto sm:mx-0" noValidate>
                <div className="relative flex items-center rounded-full bg-white/80 hover:bg-white focus-within:bg-white border border-[#7C402E]/25 focus-within:border-[#84382B] py-1 pl-3.5 pr-1 shadow-xs transition-all duration-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSent(false);
                    }}
                    placeholder="Your email address"
                    aria-label="Your email address"
                    className="w-full bg-transparent text-[11.5px] sm:text-[12px] text-[#4A2618] placeholder:text-[#8C6D5F]/70 placeholder:font-serif outline-none pr-2 font-serif text-center sm:text-left"
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

      {/* Bottom Copyright */}
      <motion.div
        variants={bottomBarVariants}
        className="relative z-20 w-full py-2.5 sm:py-3.5"
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
          <p className="m-0 text-center text-[10.5px] sm:text-[11.5px] leading-normal text-[#543224] tracking-[0.04em] font-sans">
            &copy; 2026 Idanazhi Farm Stay. All rights reserved.
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
}
