'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { IdanazhiSymbol } from '@/components/layout/idanazhi-symbol';

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
      {/* Background caricature illustration with smooth fade & subtle parallax scale */}
      <motion.div
        variants={bgVariants}
        className="absolute inset-0 w-full h-full bg-bottom bg-cover bg-no-repeat pointer-events-none origin-bottom"
        style={{
          backgroundImage: "url('/images/guruvayoor-footer-bg.jpg')",
        }}
      />

      {/* Footer Main Content positioned in the upper blank space */}
      <motion.div
        variants={containerVariants}
        className="relative z-10 w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-28 sm:pb-36 md:pb-48 lg:pb-60 xl:pb-72"
      >
        {/* 4-Column Responsive Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#7C402E]/20">
          
          {/* Column 1: Brand & Guruvayoor heritage */}
          <motion.div variants={columnVariants} className="flex flex-col items-center text-center lg:px-6 xl:px-8 first:pl-0">
            <img
              src="/images/weddings/logo/smy_mark_hd.png"
              alt="IDANAZHI Mark"
              className="h-7 w-auto object-contain mb-2.5 drop-shadow-sm transition-transform duration-300 hover:scale-105"
            />
            <h2 className="font-serif text-[20px] sm:text-[22px] tracking-[0.22em] text-[#7C402E] font-medium uppercase leading-tight">
              IDANAZHI
            </h2>
            <span className="text-[10px] tracking-[0.25em] text-[#7C402E] font-light uppercase mt-0.5 mb-2">
              FARM STAY
            </span>
            <div className="flex items-center justify-center gap-2.5 w-full max-w-[170px] my-1">
              <span className="h-[1px] flex-1 bg-[#7C402E]/25" />
              <IdanazhiSymbol className="h-2.5 w-auto text-[#7C402E]/80" />
              <span className="h-[1px] flex-1 bg-[#7C402E]/25" />
            </div>
            <p className="font-serif text-[13px] sm:text-[13.5px] leading-relaxed text-[#6E4230] mt-2 max-w-[220px]">
              A serene stay near
              <br />
              <span className="italic font-normal">Sree Krishna&apos;s abode, Guruvayoer.</span>
            </p>
          </motion.div>

          {/* Column 2: EXPLORE */}
          <motion.div variants={columnVariants} className="flex flex-col items-start lg:px-8 xl:px-10">
            <span className="h-[2px] w-6 bg-[#84382B] mb-2.5 rounded-full" />
            <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-3.5">
              EXPLORE
            </h3>
            <ul className="space-y-2 text-[13px] sm:text-[13.5px] font-serif text-[#5A3828]">
              <li>
                <Link href="/hotels-resorts/#story" className="transition-colors hover:text-[#84382B]">
                  Story
                </Link>
              </li>
              <li>
                <Link href="/hotels-resorts/#gallery" className="transition-colors hover:text-[#84382B]">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/singapore/experiences/" className="transition-colors hover:text-[#84382B]">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/hotels-resorts/#offers" className="transition-colors hover:text-[#84382B]">
                  Offers
                </Link>
              </li>
              <li>
                <Link href="/hotels-resorts/#rooms" className="transition-colors hover:text-[#84382B]">
                  Rooms
                </Link>
              </li>
              <li>
                <Link href="/hotels-resorts/#celebration" className="transition-colors hover:text-[#84382B]">
                  Celebrations
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: YOUR STAY */}
          <motion.div variants={columnVariants} className="flex flex-col items-start lg:px-8 xl:px-10">
            <span className="h-[2px] w-6 bg-[#84382B] mb-2.5 rounded-full" />
            <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#7C402E] uppercase mb-3.5">
              YOUR STAY
            </h3>
            <ul className="space-y-2 text-[13px] sm:text-[13.5px] font-serif text-[#5A3828]">
              <li>
                <a href="mailto:hello@idanazhi.com" className="transition-colors hover:text-[#84382B]">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/hotels-resorts/" className="transition-colors hover:text-[#84382B]">
                  Manage Reservation
                </Link>
              </li>
              <li>
                <Link href="/hotels-resorts/" className="transition-colors hover:text-[#84382B]">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/hotels-resorts/" className="transition-colors hover:text-[#84382B]">
                  Loyalty
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: STAY IN TOUCH */}
          <motion.div variants={columnVariants} className="flex flex-col items-start lg:px-8 xl:px-10">
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
                className="hover:text-[#84382B] transition-colors"
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
                className="hover:text-[#84382B] transition-colors"
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

      {/* Bottom Copyright & Legal Links Bar with Soft Fade-In */}
      <motion.div
        variants={bottomBarVariants}
        className="relative z-10 w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-4 sm:pb-5"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10.5px] sm:text-[11px] text-[#6E4230]/80 tracking-[0.04em] gap-2">
          <p className="m-0 text-center sm:text-left">
            &copy; 2026 Idanazhi Farm Stay, Guruvayoor. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link href="/privacy" className="hover:text-[#7C402E] transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#7C402E] transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="/accessibility" className="hover:text-[#7C402E] transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
