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

const stayActivities: HeroCarouselItem[] = [
  {
    id: 'cooking-classes',
    title: 'Traditional Kerala\nCooking Classes',
    subtitle: 'Activity 01 · Culinary Heritage',
    image: '/images/experiences/kerala-sadhya-dining.jpg',
    meta: ['HERITAGE RECIPES', 'CLAY POT COOKING', 'FARM-TO-TABLE'],
    accent: '#8c6754',
  },
  // {
  //   id: 'working-fields',
  //   title: 'Farming &\nFieldwork Activities',
  //   subtitle: 'Activity 02 · Hands-on Farming',
  //   image: '/images/experiences/working-fields.jpg',
  //   meta: ['WORKING IN FIELDS', 'ORGANIC CULTIVATION', 'SOIL IMMERSION'],
  //   accent: '#4e5d42',
  // },
  // {
  //   id: 'nearby-tours',
  //   title: 'Curated Tours to\nNearby Places',
  //   subtitle: 'Activity 03 · Guided Excursions',
  //   image: '/images/weddings/architecture-corridor.jpg',
  //   meta: ['SCENIC TRAILS', 'HERITAGE SITES', 'LOCAL EXPLORATION'],
  //   accent: '#82533e',
  // },
  {
    id: 'paddy-farming',
    title: 'Paddy Field & Rice\nFarming Experience',
    subtitle: 'Activity 04 · Ancestral Soil',
    image: '/images/experiences/working-fields.jpg',
    meta: ['TRADITIONAL FARMING', 'EMERALD FIELDS', 'HARVEST RITUALS'],
    accent: '#4e5d42',
  },
  {
    id: 'kumbidi-village',
    title: 'Kumbidi Village\nLife',
    subtitle: 'Activity 05 · Rural Immersion',
    image: '/images/experiences/paddy-farming-experience.jpg',
    meta: ['VILLAGE LIFE', 'POTTERY & WEAVING', 'WARM HOSPITALITY'],
    accent: '#7c402e',
  },
  {
    id: 'temple-experience',
    title: 'Temple\nTrails',
    subtitle: 'Activity 06 · Spiritual Heritage',
    image: '/images/experiences/temple-heritage-experience.jpg',
    meta: ['ANCIENT ARCHITECTURE', 'RITUAL BLESSINGS', 'SOULFUL SERENITY'],
    accent: '#7a5a43',
  },
  {
    id: 'fishing-experience',
    title: 'Fishing life\nin harbour',
    subtitle: 'Activity 07 · Waters & Catch',
    image: '/images/experiences/fishing-harbor-experience.jpg',
    meta: ['RIVERBANK CASTING', 'DAWN HARBOR', 'FRESHWATER NETS'],
    accent: '#455a64',
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
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative">
        {/* Authentic Kerala Vallam Fisherman Caricature - 200% Accuracy Recreation */}
        <div
          className="hidden lg:block absolute bottom-[-15px] xl:bottom-[-25px] left-[32%] xl:left-[34%] 2xl:left-[35%] w-[660px] xl:w-[760px] 2xl:w-[820px] pointer-events-none z-0 select-none"
          aria-hidden="true"
        >
          <img
            src="/images/fisherman-caricature.png"
            alt=""
            className="w-full h-auto object-contain block opacity-95 mix-blend-multiply"
            loading="lazy"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 items-start">
          {/* Left Column: Title, Heading, Desc, CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-[600px] relative z-10">
            {/* Eyebrow / Section Title */}
            <p className="m-0 mb-2.5 sm:mb-4 uppercase tracking-[0.22em] text-[10px] sm:text-[11.5px] font-semibold text-muted text-left">
              ACTIVITIES IN THE STAY · KERALA
            </p>

            {/* Main Heading */}
            <motion.h2
              id="stay-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUpVariants}
              className="font-jakarta font-normal text-[clamp(19px,2.1vw,35px)] leading-[1.28] tracking-[-0.02em] uppercase text-ink text-left m-0"
            >
              <span className="block sm:whitespace-nowrap">ACTIVITIES IN THE STAY</span>
              <span className="block sm:whitespace-nowrap">CONNECTED TO THE SOIL</span>
              <span className="block sm:whitespace-nowrap">AND TIMELESS TRADITIONS</span>
            </motion.h2>

            {/* Supporting Paragraph / Section Summary */}
            <div className="w-full text-left mt-3.5 sm:mt-5">
              <ScrollReveal
                as="p"
                baseOpacity={0.15}
                enableBlur={true}
                blurStrength={4}
                stagger={0.022}
                containerClassName="!my-0 w-full text-left flex flex-col items-start justify-start"
              >
                <span className="block !font-sans !font-normal !text-[clamp(14.5px,1vw,16.5px)] !leading-[1.75] !text-muted text-left">
                  <span className="word">Discover</span>{' '}
                  <span className="word">enriching</span>{' '}
                  <span className="word">activities</span>{' '}
                  <span className="word">woven</span>{' '}
                  <span className="word">into</span>{' '}
                  <span className="word">your</span>{' '}
                  <span className="word">stay</span>{' '}
                  <span className="word">at</span>{' '}
                  <span className="word">Idanazhi.</span>{' '}
                  <span className="word">From</span>{' '}
                  <span className="word">traditional</span>{' '}
                  <span className="word">cooking</span>{' '}
                  <span className="word">classes</span>{' '}
                  <span className="word">and</span>{' '}
                  <span className="word">hands-on</span>{' '}
                  <span className="word">fieldwork</span>{' '}
                  <span className="word">to</span>{' '}
                  <span className="word">emerald</span>{' '}
                  <span className="word">paddy</span>{' '}
                  <span className="word">farming,</span>{' '}
                  <span className="word">immersive</span>{' '}
                  <span className="word">Kumbidi</span>{' '}
                  <span className="word">village</span>{' '}
                  <span className="word">walks,</span>{' '}
                  <span className="word">sacred</span>{' '}
                  <span className="word">temple</span>{' '}
                  <span className="word">visits,</span>{' '}
                  <span className="word">live</span>{' '}
                  <span className="word">fishing</span>{' '}
                  <span className="word">harbor</span>{' '}
                  <span className="word">excursions,</span>{' '}
                  <span className="word">and</span>{' '}
                  <span className="word">curated</span>{' '}
                  <span className="word">tours</span>{' '}
                  <span className="word">to</span>{' '}
                  <span className="word">nearby</span>{' '}
                  <span className="word">cultural</span>{' '}
                  <span className="word">places—experience</span>{' '}
                  <span className="word">the</span>{' '}
                  <span className="word">living</span>{' '}
                  <span className="word">soul</span>{' '}
                  <span className="word">of</span>{' '}
                  <span className="word">Kerala.</span>
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
                href="/experiences"
                className="luxury-cta focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
                aria-label="Explore Activities - Discover experiences and activities at Idanazhi"
              >
                <span className="cta-text">
                  Explore Activities
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
          <div className="lg:col-span-6 w-full overflow-hidden relative z-10">
            <HeroCarousel
              items={stayActivities}
              mode="cards-only"
              theme="dark"
              defaultIndex={0}
              cardHeight={420}
              actionLabel="ENQUIRE NOW"
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
