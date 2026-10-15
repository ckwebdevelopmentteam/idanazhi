'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

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
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stayDetails = [
  {
    index: '01',
    label: 'The Rooms',
    description:
      'Tranquil sanctuaries shaped by traditional woodwork, gentle natural light, and quiet heritage comfort.',
  },
  {
    index: '02',
    label: 'Shared Spaces',
    description:
      'Open-air colonnaded verandahs and breezy courtyards designed for unhurried conversations and gathering.',
  },
  {
    index: '03',
    label: 'The Experience',
    description:
      'A grounded pace of living rooted in traditional Kerala architecture and gracious, thoughtful hospitality.',
  },
];

export interface StayAtIdanazhiProps {
  className?: string;
}

export function StayAtIdanazhi({ className = '' }: StayAtIdanazhiProps) {
  return (
    <section
      id="stay"
      className={`relative bg-paper py-[clamp(72px,10vh,135px)] px-[5.4vw] max-[720px]:px-6 max-[720px]:py-[60px] border-t border-ink/10 overflow-hidden ${className}`}
      aria-labelledby="stay-heading"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {/* Asymmetrical Two-Column Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* Left Column — Photography Composition */}
            <motion.div
              variants={fadeUpVariants}
              className="lg:col-span-7 relative w-full pr-0 sm:pr-8 pb-0 sm:pb-8"
            >
              {/* Primary Image: Authentic Guest Room Sanctuary */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen border border-ink/12 shadow-[0_4px_24px_-8px_rgba(61,30,22,0.12)]">
                <img
                  src="/images/weddings/idanazhi-room.jpg"
                  alt="Authentic Idanazhi heritage guest room interior with four-poster teak bed, terracotta tiles, and natural light"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>

              {/* Secondary Image: Authentic Colonnaded Verandah Detail (Tasteful offset) */}
              <div className="hidden sm:block absolute right-0 bottom-0 w-[42%] max-w-[260px] aspect-[4/5] overflow-hidden bg-linen p-2 bg-paper border border-ink/15 shadow-[0_12px_32px_-10px_rgba(61,30,22,0.2)]">
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/images/weddings/card-heritage.jpg"
                    alt="Traditional Kerala colonnaded verandah with carved teak pillars and garden breeze"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column — Stay Introduction */}
            <motion.div
              variants={fadeUpVariants}
              className="lg:col-span-5 flex flex-col items-start justify-center text-left"
            >
              {/* Eyebrow Label */}
              <p className="m-0 mb-3 sm:mb-4 uppercase tracking-[0.2em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted">
                A PLACE TO UNWIND
              </p>

              {/* Heading */}
              <h2
                id="stay-heading"
                className="font-serif text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.035em] text-ink m-0 mb-5 sm:mb-6"
              >
                Stay at Idanazhi
              </h2>

              {/* Supporting Paragraph */}
              <p className="font-sans text-[clamp(15px,1.05vw,16.5px)] leading-[1.72] text-muted font-normal max-w-[480px] m-0 mb-7 sm:mb-9">
                Discover a different pace of living, surrounded by the character of a heritage
                home. From quiet moments to time shared with those who matter, experience the
                warmth and individuality of Idanazhi.
              </p>

              {/* CTA Link */}
              <div>
                <Link
                  href="/singapore/#stay"
                  className="group inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-sans tracking-[0.06em] uppercase text-ink focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
                  aria-label="Explore Your Stay - Discover accommodation at Idanazhi"
                >
                  <span className="relative pb-1 transition-colors duration-300 ease-out group-hover:text-forest">
                    Explore Your Stay
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-ink/30 transition-colors duration-300" />
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-forest origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-forest group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stay Details Strip */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-14 sm:mt-20 lg:mt-24 pt-8 sm:pt-12 border-t border-ink/15 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-0"
          >
            {stayDetails.map((item, idx) => (
              <div
                key={item.label}
                className={`flex flex-col text-left md:px-8 first:md:pl-0 last:md:pr-0 ${
                  idx < stayDetails.length - 1 ? 'md:border-r md:border-ink/15' : ''
                } ${idx > 0 ? 'max-md:pt-5 max-md:border-t max-md:border-ink/12' : ''}`}
              >
                <div className="flex items-center gap-2.5 mb-2 sm:mb-2.5">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted/70">
                    {item.index}
                  </span>
                  <span className="text-[11px] sm:text-[11.5px] tracking-[0.18em] uppercase font-semibold text-ink">
                    {item.label}
                  </span>
                </div>
                <p className="m-0 text-[13px] sm:text-[13.5px] leading-[1.65] text-muted font-normal max-w-[340px]">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
