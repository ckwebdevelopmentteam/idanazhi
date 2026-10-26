'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { HeroCarousel, type HeroCarouselItem } from '@/components/ui/hero-carousel';
import { BookingPanel } from '@/components/sections/booking-panel';

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
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

const stayRooms: HeroCarouselItem[] = [
  {
    id: 'heritage-suite',
    title: 'The Nalukettu\nMaster Suite',
    subtitle: 'Chamber 01',
    image: '/images/weddings/spaces/stay1.png',
    meta: ['MAIN NALUKETTU', 'KING BED', 'HERITAGE TIMBER'],
    accent: '#8c6754',
  },
  {
    id: 'nadumuttam-chamber',
    title: 'The Nadumuttam\nChamber',
    subtitle: 'Chamber 02',
    image: '/images/weddings/spaces/stay3.png',
    meta: ['COURTYARD VISTA', 'OPEN ATRIUM', 'EN-SUITE'],
    accent: '#7c402e',
  },
  {
    id: 'garden-villa',
    title: 'The Garden\nVilla',
    subtitle: 'Chamber 03',
    image: '/images/weddings/spaces/stay2.png',
    meta: ['GARDEN GROUNDS', 'WOODEN PILLARS', 'LOUNGE'],
    accent: '#6b4f3b',
  },
  {
    id: 'estate-courtyard',
    title: 'The Central\nNadumuttam',
    subtitle: 'Estate Courtyard',
    image: '/images/weddings/kerala-courtyard-planter.jpg',
    meta: ['OPEN SKY ATRIUM', 'CLAY ROOF TILES', 'ESTATE HEART'],
    accent: '#7a5a43',
  },
  {
    id: 'estate-pool',
    title: 'Private\nSwimming Pool',
    subtitle: 'Compound Leisure',
    image: '/images/stay/swimming-pool.jpg',
    meta: ['GARDEN RETREAT', 'PRIVATE LEISURE', 'RELAXATION'],
    accent: '#82533e',
  },
];


export interface StayAtIdanazhiProps {
  className?: string;
}

export function StayAtIdanazhi({ className = '' }: StayAtIdanazhiProps) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section
      id="stay"
      className={`relative z-20 bg-paper min-h-[80vh] lg:min-h-[92vh] flex flex-col justify-center py-[clamp(60px,9vh,140px)] max-[720px]:py-[54px] overflow-hidden ${className}`}
      aria-labelledby="stay-heading"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 items-start">
          {/* Left Column: Title, Heading, Desc, CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-[600px]">
            {/* Eyebrow / Section Title */}
            <p className="m-0 mb-2.5 sm:mb-4 uppercase tracking-[0.22em] text-[10px] sm:text-[11.5px] font-semibold text-muted text-left">
              SINGLE PRIVATE COMPOUND · GURUVAYOOR
            </p>

            {/* Scroll Reveal Heading */}
            <div className="w-full text-left">
              <ScrollReveal
                as="h2"
                baseOpacity={0.08}
                enableBlur={true}
                baseRotation={0}
                blurStrength={8}
                containerClassName="!my-0 w-full text-left flex flex-col items-start justify-start"
                wordAnimationStart="top 85%"
                wordAnimationEnd="bottom 55%"
              >
                <span
                  id="stay-heading"
                  className="block !font-jakarta !font-normal !text-[clamp(19px,2.1vw,35px)] !leading-[1.28] !tracking-[-0.02em] !uppercase !text-ink text-left"
                >
                  <span className="block sm:whitespace-nowrap">
                    <span className="word">A</span>{' '}
                    <span className="word">SANCTUARY</span>
                  </span>
                  <span className="block sm:whitespace-nowrap">
                    <span className="word">OF</span>{' '}
                    <span className="word">QUIET</span>{' '}
                    <span className="word">CHARACTER</span>
                  </span>
                  <span className="block sm:whitespace-nowrap">
                    <span className="word">AND</span>{' '}
                    <span className="word">TIMELESS</span>{' '}
                    <span className="word">UNHURRIED</span>{' '}
                    <span className="word">LIVING</span>
                  </span>
                </span>
              </ScrollReveal>
            </div>

            {/* Supporting Paragraph */}
            <div className="w-full text-left mt-3.5 sm:mt-5">
              <ScrollReveal
                as="p"
                baseOpacity={0.35}
                enableBlur={true}
                baseRotation={0}
                blurStrength={3}
                containerClassName="!my-0 w-full text-left flex flex-col items-start justify-start"
                wordAnimationStart="top 85%"
                wordAnimationEnd="top 60%"
              >
                <span className="block !font-sans !font-normal !text-[clamp(14.5px,1vw,16.5px)] !leading-[1.75] !text-muted text-left">
                  <span className="word">Discover</span>{' '}
                  <span className="word">a</span>{' '}
                  <span className="word">different</span>{' '}
                  <span className="word">pace</span>{' '}
                  <span className="word">of</span>{' '}
                  <span className="word">living,</span>{' '}
                  <span className="word">surrounded</span>{' '}
                  <span className="word">by</span>{' '}
                  <span className="word">the</span>{' '}
                  <span className="word">character</span>{' '}
                  <span className="word">of</span>{' '}
                  <span className="word">a</span>{' '}
                  <span className="word">heritage</span>{' '}
                  <span className="word">home.</span>{' '}
                  <span className="word">From</span>{' '}
                  <span className="word">quiet</span>{' '}
                  <span className="word">moments</span>{' '}
                  <span className="word">to</span>{' '}
                  <span className="word">time</span>{' '}
                  <span className="word">shared</span>{' '}
                  <span className="word">with</span>{' '}
                  <span className="word">those</span>{' '}
                  <span className="word">who</span>{' '}
                  <span className="word">matter,</span>{' '}
                  <span className="word">experience</span>{' '}
                  <span className="word">the</span>{' '}
                  <span className="word">warmth</span>{' '}
                  <span className="word">and</span>{' '}
                  <span className="word">individuality</span>{' '}
                  <span className="word">of</span>{' '}
                  <span className="word">Idanazhi.</span>
                </span>
              </ScrollReveal>
            </div>

            {/* CTA Link */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="mt-6 sm:mt-8"
            >
              <Link
                href="/stay"
                className="luxury-cta focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
                aria-label="Explore Your Stay - Discover traditional accommodation at Idanazhi"
              >
                <span className="cta-text">
                  Explore Your Stay
                </span>
                <ArrowUpRight
                  size={15}
                  className="cta-arrow"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Card component */}
          <div className="lg:col-span-6 w-full overflow-hidden">
            <HeroCarousel
              items={stayRooms}
              mode="cards-only"
              theme="dark"
              defaultIndex={1}
              cardHeight={420}
              actionLabel="BOOK NOW"
              onCardAction={() => setBookingOpen(true)}
            />
          </div>
        </div>
      </div>

      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </section>
  );
}

export default StayAtIdanazhi;
