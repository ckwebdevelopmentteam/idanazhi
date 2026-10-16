'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PolaroidLineCarousel, { type Slide } from '@/components/ui/polaroid-line-carousel';


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

const celebrationSlides: Slide[] = [
  {
    image: '/images/weddings/stage-heritage-mandapam.jpg',
    title: 'Sacred Mandapam',
    caption: 'Traditional carved wood setting adorned with fresh florals and brass lamps.',
    alt: 'Carved wooden Kerala heritage wedding mandapam',
  },
  {
    image: '/images/weddings/spaces/space-dinner-1.jpg',
    title: 'Starlit Feast',
    caption: 'Bespoke banquet tables beneath Kerala night skies and warm canopy lights.',
    alt: 'Curated outdoor evening dining banquet setting',
  },
  {
    image: '/images/weddings/spaces/stage-decor-wiki.jpg',
    title: 'Floral Garlands',
    caption: 'Handcrafted marigold garlands and sacred floral arrangements for ceremonies.',
    alt: 'Traditional floral wedding altar decor',
  },
  {
    image: '/images/weddings/architecture-corridor.jpg',
    title: 'Heritage Colonnades',
    caption: 'Carved teak pillars and tranquil breezeways of traditional architecture.',
    alt: 'Traditional Kerala wooden corridor with carved pillars',
  },
  {
    image: '/images/weddings/spaces/space-dinner-2.jpg',
    title: 'Candlelit Dining',
    caption: 'Intimate dining arrangements framed by soft candlelight and crystal glassware.',
    alt: 'Candlelit dinner table arrangement with floral accents',
  },
  {
    image: '/images/weddings/stage-grand-reception.jpg',
    title: 'Grand Reception',
    caption: 'Luminous celebratory stage designed for memorable evening gatherings.',
    alt: 'Grand wedding reception stage and floral backdrop',
  },
  {
    image: '/images/weddings/kerala-courtyard-planter.jpg',
    title: 'Nadumuttam Courtyard',
    caption: 'Open-to-sky heritage courtyard filled with soft natural light and greenery.',
    alt: 'Traditional Kerala open courtyard with stone planter',
  },
  {
    image: '/images/weddings/stage-coastal-mandapam.jpg',
    title: 'Coastal Mandapam',
    caption: 'Breezy oceanfront floral canopy designed for sacred matrimonial vows.',
    alt: 'Coastal wedding mandapam with floral canopy',
  },
  {
    image: '/images/weddings/spaces/space-outdoor-1.jpg',
    title: 'Garden Lawns',
    caption: 'Verdant outdoor estate lawns prepared for dusk celebrations and rituals.',
    alt: 'Outdoor celebration garden estate lawn setup',
  },
  {
    image: '/images/weddings/spaces/space-dinner-3.jpg',
    title: 'Artisanal Banquets',
    caption: 'Authentic celebratory dining tables crafted for shared family feasts.',
    alt: 'Heritage banquet dining setup for celebrations',
  },
  {
    image: '/images/weddings/varikkasseri.jpg',
    title: 'Historic Mana',
    caption: 'Majestic Kerala heritage estate architecture with sloping tiled gables.',
    alt: 'Traditional Kerala heritage manor architecture',
  },
  {
    image: '/images/weddings/spaces/stage-2.jpg',
    title: 'Botanical Stage',
    caption: 'Lush floral arrangements and elegant brass lamps framing celebratory stages.',
    alt: 'Lush floral stage backdrop for evening wedding celebrations',
  },
];

export interface CelebrationsAndExperienceProps {
  className?: string;
}

export function CelebrationsAndExperience({ className = '' }: CelebrationsAndExperienceProps) {
  return (
    <section
      id="celebrations-and-experience"
      className={`relative w-full bg-[#3d1e16] text-white py-[clamp(64px,8.5vh,110px)] max-[720px]:py-[50px] border-t border-white/10 overflow-hidden flex flex-col ${className}`}
      aria-label="Celebrations and Experiences"
    >
      {/* Background Texture Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/celebrations-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Subtle tonal grading for depth and text legibility */}
        <div className="absolute inset-0 bg-[#28130d]/15 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 w-full flex flex-col">
        {/* Row: CELEBRATIONS (Left) | AND (Center) | EXPERIENCES (Right) with Scroll Reveal Effect */}
        <ScrollReveal
          as="div"
          baseOpacity={0.08}
          enableBlur={true}
          baseRotation={0}
          blurStrength={8}
          stagger={0.09}
          wordAnimationStart="top bottom-=5%"
          wordAnimationEnd="bottom 55%"
          containerClassName="!m-0 w-full px-[5.4vw] max-[720px]:px-6 grid grid-cols-3 items-center gap-2 sm:gap-6 pb-6 sm:pb-8 md:pb-10 shrink-0"
        >
          {/* Left: CELEBRATIONS */}
          <div className="flex items-center justify-start">
            <span className="word font-jakarta font-normal text-[clamp(20px,2.5vw,38px)] max-[480px]:text-[16px] leading-[1.36] tracking-[-0.015em] uppercase text-white whitespace-nowrap">
              Celebrations
            </span>
          </div>

          {/* Center: AND */}
          <div className="flex items-center justify-center text-center">
            <span className="word font-jakarta font-normal text-[clamp(20px,2.5vw,38px)] max-[480px]:text-[16px] leading-[1.36] tracking-[-0.015em] uppercase text-white whitespace-nowrap">
              And
            </span>
          </div>

          {/* Right: EXPERIENCES */}
          <div className="flex items-center justify-end">
            <span className="word font-jakarta font-normal text-[clamp(20px,2.5vw,38px)] max-[480px]:text-[16px] leading-[1.36] tracking-[-0.015em] uppercase text-white whitespace-nowrap">
              Experiences
            </span>
          </div>
        </ScrollReveal>

        {/* Polaroid Line Carousel with balanced height and spacing */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUpVariants}
          className="w-full flex flex-col"
        >
          <PolaroidLineCarousel
            slides={celebrationSlides}
            height="clamp(470px, 56vh, 540px)"
            className="w-full"
            cardWidth={330}
            sag={34}
            swing={1}
            autoplay={4500}
            string="#c6a77d"
            background="transparent"
            ink="#ffffff"
            ariaLabel="Celebrations and Experiences photo carousel"
          />
        </motion.div>
      </div>
    </section>
  );
}

