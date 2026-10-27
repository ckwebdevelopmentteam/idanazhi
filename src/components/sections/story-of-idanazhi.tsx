'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const ACTIVITY_IMAGES_PRIMARY = [
  {
    src: '/images/experiences/activity-rice-farming-8k.jpg',
    alt: 'Traditional barefoot heirloom paddy field seedling planting in Kerala',
  },
  {
    src: '/images/experiences/activity-live-fishing-8k.jpg',
    alt: 'Traditional live riverbank casting net fishing from wooden canoe at sunrise',
  },
  {
    src: '/images/experiences/fishing-harbor-experience.jpg',
    alt: 'Live riverbank casting net and early morning canoe expedition',
  },
];

const ACTIVITY_IMAGES_SECONDARY = [
  {
    src: '/images/experiences/kumbidi-village-experience.jpg',
    alt: 'Authentic Kumbidi village path and cultural immersion',
  },
  {
    src: '/images/experiences/activity-temple-ritual-8k.jpg',
    alt: 'Sacred evening Nilavilakku brass oil lamp lighting ritual with floral offerings',
  },
  {
    src: '/images/experiences/working-fields.jpg',
    alt: 'Traditional Kerala agricultural fieldwork with working oxen in emerald soil',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export interface StoryOfIdanazhiProps {
  className?: string;
}

export function StoryOfIdanazhi({ className = '' }: StoryOfIdanazhiProps) {
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  // Auto transition images in continuous loop
  useEffect(() => {
    const topTimer = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % ACTIVITY_IMAGES_PRIMARY.length);
    }, 4000);

    const bottomTimer = setInterval(() => {
      setBottomIndex((prev) => (prev + 1) % ACTIVITY_IMAGES_SECONDARY.length);
    }, 4500);

    return () => {
      clearInterval(topTimer);
      clearInterval(bottomTimer);
    };
  }, []);

  return (
    <section
      id="story"
      className={`relative bg-paper py-14 pb-20 sm:py-20 lg:py-32 px-5 sm:px-10 lg:px-16 overflow-hidden ${className}`}
      aria-labelledby="story-of-idanazhi-heading"
    >
      {/* Minimal Monochrome Caricature Lotus Accent - Behind content in Left Bottom Corner */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none z-0 w-[65px] sm:w-[90px] md:w-[120px] lg:w-[150px] xl:w-[170px] select-none"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-auto origin-bottom-left"
        >
          <img
            src="/images/corner-lotus.png"
            alt=""
            className="w-full h-auto object-contain block opacity-80"
            loading="lazy"
          />
        </motion.div>
      </div>

      <div className="w-full max-w-[1360px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Text, Mobile Overlapping Images, & Editorial CTAs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Eyebrow Label matching home page sections */}
            <motion.p
              variants={fadeUpVariants}
              className="m-0 mb-3 sm:mb-5 font-sans text-[10px] sm:text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#6E3020]/80 lg:text-muted text-left"
            >
              THE STORY OF IDANAZHI
            </motion.p>

            {/* Main Heading in warm serif style */}
            <motion.h2
              id="story-of-idanazhi-heading"
              variants={fadeUpVariants}
              className="font-serif font-normal text-[clamp(24px,6.8vw,38px)] leading-[1.22] sm:leading-[1.3] tracking-[-0.015em] uppercase text-[#6E3020] lg:text-ink m-0 mb-4 sm:mb-6 text-left"
            >
              A place rooted in Kerala’s landscape, rural life, and living heritage.
            </motion.h2>

            {/* Mobile Dual Overlapping Images - Compact, elegant composition (< lg) */}
            <motion.div
              variants={imageVariants}
              className="block lg:hidden relative w-full aspect-[4/3.1] max-w-[280px] sm:max-w-[320px] mx-auto my-4 sm:my-6"
              aria-label="Idanazhi living heritage and paddy farming scenes"
            >
              {/* Activity Image (Top Right - Paddy Farming in Loop) */}
              <div className="absolute top-0 right-0 w-[58%] aspect-[3/3.7] overflow-hidden shadow-md bg-[#ECE6DF]">
                {ACTIVITY_IMAGES_PRIMARY.map((img, idx) => (
                  <img
                    key={`mob-top-${img.src}`}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                      idx === topIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>

              {/* Activity Image (Bottom Left - Traditional Village Life in Loop) */}
              <div className="absolute bottom-0 left-0 w-[56%] aspect-[4/3.1] overflow-hidden shadow-[0_10px_25px_rgba(45,25,18,0.22)] z-10 bg-[#ECE6DF]">
                {ACTIVITY_IMAGES_SECONDARY.map((img, idx) => (
                  <img
                    key={`mob-bot-${img.src}`}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                      idx === bottomIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            </motion.div>

            {/* Body Paragraph 1 */}
            <motion.p
              variants={fadeUpVariants}
              className="m-0 mb-3.5 sm:mb-4 font-sans font-normal text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#5A453D] lg:text-muted text-left"
            >
              Idanazhi is a farm stay and heritage destination in Kerala, created to bring people closer to the region’s landscapes, rural life, and cultural traditions.
            </motion.p>

            {/* Body Paragraph 2 */}
            <motion.p
              variants={fadeUpVariants}
              className="m-0 mb-6 sm:mb-8 font-sans font-normal text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#5A453D] lg:text-muted text-left"
            >
              From experiencing time-honoured paddy farming and generational craft to discovering local village customs, sacred temple trails, and peaceful open-sky courtyards, Idanazhi offers an authentic, unhurried look at the everyday life and living heritage that make Kerala unique.
            </motion.p>

            {/* Brand Action Buttons: Heritage Story & Curated Experiences (Positioned above background lotus with z-20) */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto pt-1 relative z-20"
            >
              <Link
                href="/story"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#6E3020] hover:bg-[#582417] text-white text-[10px] sm:text-[10.5px] font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-xs hover:shadow-sm cursor-pointer no-underline active:scale-[0.98] relative z-20"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/experiences"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-paper border border-[#6E3020]/80 text-[#6E3020] hover:bg-[#6E3020] hover:text-white text-[10px] sm:text-[10.5px] font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer no-underline active:scale-[0.98] relative z-20 shadow-xs"
              >
                <span>EXPLORE EXPERIENCES</span>
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Dual Overlapping Framed Photographs for Desktop (hidden on mobile, visible on lg) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
            className="hidden lg:flex lg:col-span-7 justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[580px] sm:max-w-[650px] lg:max-w-[700px] aspect-[4/4.5] sm:aspect-[4/4.2]">
              {/* Activity Image (Top Right - Paddy Farming in Loop) */}
              <motion.div
                variants={imageVariants}
                className="absolute -top-7 sm:-top-10 lg:-top-12 right-0 w-[72%] sm:w-[70%] aspect-[3/4.2] overflow-hidden shadow-[0_24px_55px_rgba(45,25,18,0.16)]"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#ECE6DF]">
                  {ACTIVITY_IMAGES_PRIMARY.map((img, idx) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                        idx === topIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  ))}

                  {/* Subtle loop indicators */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20 bg-black/35 backdrop-blur-[4px] px-2 py-1 rounded-full">
                    {ACTIVITY_IMAGES_PRIMARY.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setTopIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === topIndex
                            ? 'w-4 bg-white'
                            : 'w-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`View activity image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Activity Image (Bottom Left - Village Life in Loop) */}
              <motion.div
                variants={imageVariants}
                className="absolute bottom-0 left-0 w-[68%] sm:w-[66%] aspect-[1/1] sm:aspect-[4/4.2] overflow-hidden shadow-[0_28px_65px_rgba(45,25,18,0.22)] z-10"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#ECE6DF]">
                  {ACTIVITY_IMAGES_SECONDARY.map((img, idx) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                        idx === bottomIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  ))}

                  {/* Subtle loop indicators */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20 bg-black/35 backdrop-blur-[4px] px-2 py-1 rounded-full">
                    {ACTIVITY_IMAGES_SECONDARY.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setBottomIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === bottomIndex
                            ? 'w-4 bg-white'
                            : 'w-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`View activity image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
