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
    title: 'The Heritage\nSuite',
    subtitle: 'Suite 01',
    image: '/images/weddings/idanazhi-room.jpg',
    meta: ['GARDEN VIEW', 'KING BED', 'HERITAGE TIMBER'],
    accent: '#8c6754',
  },
  {
    id: 'nalukettu-chamber',
    title: 'The Nalukettu\nChamber',
    subtitle: 'Chamber 02',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    meta: ['VERANDAH ACCESS', 'COURTYARD VISTA', 'EN-SUITE'],
    accent: '#7c402e',
  },
  {
    id: 'colonnaded-sanctuary',
    title: 'Verandah\nSanctuary',
    subtitle: 'Sanctuary 03',
    image: '/images/weddings/architecture-corridor.jpg',
    meta: ['NATURAL BREEZE', 'WOODEN PILLARS', 'LOUNGE'],
    accent: '#6b4f3b',
  },
  {
    id: 'courtyard-pavilions',
    title: 'Courtyard\nPavilions',
    subtitle: 'Pavilion 04',
    image: '/images/weddings/kerala-courtyard-planter.jpg',
    meta: ['ATRIUM VIEW', 'NATURAL LIGHT', 'RAIN COURT'],
    accent: '#7a5a43',
  },
  {
    id: 'illam-retreat',
    title: 'The Illam\nRetreat',
    subtitle: 'Retreat 05',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    meta: ['ESTATE VISTA', 'TEAK CARVINGS', 'PRIVATE BALCONY'],
    accent: '#82533e',
  },
  {
    id: 'tharavadu-suite',
    title: 'The Tharavadu\nMaster Suite',
    subtitle: 'Suite 06',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    meta: ['EXPANSIVE LIVING', 'HERITAGE COMFORT', 'SUITE'],
    accent: '#664132',
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
      className={`relative z-10 bg-paper py-[clamp(64px,8.5vh,110px)] overflow-hidden ${className}`}
      aria-labelledby="stay-heading"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* Left Column: Title, Heading, Desc, CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-[600px]">
            {/* Eyebrow / Section Title */}
            <p className="m-0 mb-3 sm:mb-4 uppercase tracking-[0.22em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-left">
              STAY AT IDANAZHI
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
                  className="block !font-jakarta !font-normal !text-[clamp(22px,2.1vw,35px)] !leading-[1.28] !tracking-[-0.02em] !uppercase !text-ink text-left"
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
            <div className="w-full text-left mt-4 sm:mt-5">
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
                href="/singapore/#stay"
                className="luxury-cta focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
                aria-label="Explore Your Stay - Discover accommodation at Idanazhi"
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
