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
      className={`relative bg-paper py-[clamp(64px,8.5vh,110px)] overflow-hidden ${className}`}
      aria-labelledby="stay-heading"
    >
      <div className="w-full flex flex-col items-center">
        {/* Centered Section Header matching Story & Wedding Intro */}
        <div className="flex flex-col items-center text-center max-w-[940px] mx-auto px-6 mb-10 sm:mb-14 lg:mb-16">
          {/* Eyebrow / Section Title matching Story of Idanazhi */}
          <p className="m-0 mb-4 sm:mb-5 uppercase tracking-[0.22em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-center">
            STAY AT IDANAZHI
          </p>

          {/* Symmetrical Scroll Reveal Heading matching Wedding Intro */}
          <div className="w-full flex justify-center items-center text-center">
            <ScrollReveal
              as="h2"
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              wordAnimationStart="top 85%"
              wordAnimationEnd="bottom 55%"
            >
              <span
                id="stay-heading"
                className="block !font-jakarta !font-normal !text-[clamp(20px,2.5vw,38px)] !leading-[1.36] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto sm:whitespace-nowrap"
              >
                <span className="word">A</span>{' '}
                <span className="word">SANCTUARY</span>{' '}
                <span className="word">OF</span>{' '}
                <span className="word">QUIET</span>{' '}
                <span className="word">CHARACTER</span>
                <br className="hidden sm:block" />
                {' '}
                <span className="word">AND</span>{' '}
                <span className="word">UNHURRIED</span>{' '}
                <span className="word">LIVING</span>
              </span>
            </ScrollReveal>
          </div>

          {/* Centered Supporting Paragraph */}
          <div className="w-full flex justify-center items-center text-center mt-3.5 sm:mt-5">
            <ScrollReveal
              as="p"
              baseOpacity={0.12}
              enableBlur={true}
              baseRotation={0}
              blurStrength={5}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              wordAnimationStart="top 53%"
              wordAnimationEnd="bottom 28%"
            >
              <span className="block !font-sans !font-normal !text-[clamp(15px,1.05vw,17px)] !leading-[1.75] !text-muted text-center max-w-[840px] mx-auto">
                <span className="sm:block sm:whitespace-nowrap">
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
                  <span className="word">home.</span>
                </span>{' '}
                <span className="sm:block sm:whitespace-nowrap">
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
              </span>
            </ScrollReveal>
          </div>

          {/* CTA Link */}
          <motion.div variants={fadeUpVariants} className="mt-6 sm:mt-8">
            <Link
              href="/singapore/#stay"
              className="group inline-flex items-center gap-2 text-[13.5px] sm:text-[14px] font-sans tracking-[0.05em] uppercase text-ink focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
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
          </motion.div>
        </div>

        {/* Filmstrip Card Carousel (Cards Only - without background swap or large hero text) */}
        <div className="w-full overflow-hidden">
          <HeroCarousel
            items={stayRooms}
            mode="cards-only"
            theme="dark"
            defaultIndex={1}
            actionLabel="BOOK NOW"
            onCardAction={() => setBookingOpen(true)}
          />
        </div>
      </div>

      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </section>
  );
}

export default StayAtIdanazhi;
