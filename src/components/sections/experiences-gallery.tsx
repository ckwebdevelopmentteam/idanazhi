'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from 'lucide-react';
import { ScrollableCardStack, CardItem } from '@/components/ui/scrollable-card-stack';

export interface ExperienceCardItem extends CardItem {
  tag: string;
  title: string;
  subtitle?: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export const experiencesSlides: ExperienceCardItem[] = [
  {
    id: 'savour',
    tag: 'GASTRONOMY',
    title: 'Savour',
    subtitle: 'Royal Flavours & Twilight Banquets',
    name: 'Culinary Pavilions',
    handle: '@idanazhi.dining',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/experiences/savour-dining.jpg',
    href: '/singapore/#dining',
    linkText: 'Explore Dining',
    linkHref: '/singapore/#dining',
    description:
      'Celebrated chefs, immersive culinary journeys and a spirit of farm-fresh innovation define our open-air dining pavilions and banquet outposts, where local harvest meets royal Travancore recipes.',
  },
  {
    id: 'reset',
    tag: 'WELLBEING',
    title: 'Reset',
    subtitle: 'Holistic Ayurvedic Sanctuaries',
    name: 'Ayurveda & Retreat',
    handle: '@idanazhi.wellness',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/experiences/reset-wellness.jpg',
    href: '/singapore/experiences/',
    linkText: 'Explore Wellness',
    linkHref: '/singapore/experiences/',
    description:
      'Balance body, mind and spirit at world-leading sanctuaries, where herbal medicinal gardens, natural reflecting pools and ancient Ayurvedic therapies champion rejuvenation from the inside out.',
  },
  {
    id: 'celebrate',
    tag: 'CELEBRATIONS',
    title: 'Celebrate',
    subtitle: 'Grand Stages & Floral Mandapams',
    name: 'Grand Mandapams',
    handle: '@idanazhi.weddings',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/weddings/stage-grand-reception.jpg',
    href: '/#celebrations-and-experience',
    linkText: 'Explore Celebrations',
    linkHref: '/#celebrations-and-experience',
    description:
      'The stage is yours to set. Host showstopping grand receptions, intimate bridal rituals and landmark reunions with us, orchestrated with majestic floral backdrops and legendary hospitality.',
  },
  {
    id: 'sanctuary',
    tag: 'HERITAGE STAYS',
    title: 'Sanctuary',
    subtitle: 'Artful Teakwood Illams & Verandas',
    name: 'Heritage Illams',
    handle: '@idanazhi.stays',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/weddings/architecture-corridor.jpg',
    href: '/#stay',
    linkText: 'Explore Stays',
    linkHref: '/#stay',
    description:
      'Artful suites and private heritage illams crafted with traditional teak columns, brass urulis and natural terracotta breezeways, promising soulful space and peaceful shade to connect.',
  },
  {
    id: 'discover',
    tag: 'ESTATE TRAILS',
    title: 'Discover',
    subtitle: 'Centuries of Architecture & Culture',
    name: 'Varikkasseri Manor',
    handle: '@idanazhi.estate',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/weddings/varikkasseri.jpg',
    href: '/singapore/experiences/',
    linkText: 'Explore Encounters',
    linkHref: '/singapore/experiences/',
    description:
      'Venture outside the ordinary with curated estate adventures on land and water. Uncover centuries of Travancore architectural wonders, classical Kathakali performances and temple drum rhythms.',
  },
  {
    id: 'cherish',
    tag: 'SACRED UNION',
    title: 'Cherish',
    subtitle: 'Auspicious Dawn Rituals & Togetherness',
    name: 'Sacred Moments',
    handle: '@idanazhi.moments',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/weddings/card-togetherness-couple.jpg',
    href: '/singapore/experiences/',
    linkText: 'Explore Rituals',
    linkHref: '/singapore/experiences/',
    description:
      'From the fragrant jasmine malas and traditional thalappoli procession to starlit banquet laughter, celebrate eternal bonds enveloped in the authentic spiritual soul of Kerala.',
  },
];

export interface ExperiencesGalleryProps {
  className?: string;
  items?: ExperienceCardItem[];
  autoPlayInterval?: number;
}

export function ExperiencesGallery({
  className = '',
  items = experiencesSlides,
  autoPlayInterval = 2000,
}: ExperiencesGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const total = items.length;
  const current = items[activeIndex] || items[0];

  // Auto-advance with exactly 2 seconds delay
  useEffect(() => {
    if (isPaused || isHovered || total <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, isHovered, total, autoPlayInterval, activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  return (
    <section
      id="gallery"
      aria-label="Idanazhi Resort Experiences Gallery"
      className={`relative w-full bg-paper py-[clamp(64px,8.5vh,110px)] overflow-hidden border-t border-line/25 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-linen/50 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-0 h-[480px] w-[480px] rounded-full bg-linen/40 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1380px] px-6 sm:px-10 lg:px-14">
        {/* Top Header Row */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line/20 pb-5">
          <div className="flex items-center gap-3">
            <span className="h-[1.5px] w-7 bg-ink/70" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
              CURATED EXPERIENCES
            </span>
          </div>

          <Link
            href="/singapore/experiences/"
            className="group inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-forest"
          >
            <span>Explore All</span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* 2-Column Responsive Layout: Text on Left, Gallery Images on Right */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_1.12fr] lg:gap-16">
          {/* LEFT SIDE: Text changing automatically with 2 sec delay */}
          <div className="flex flex-col justify-center">
            {/* Tag / Category and Counter */}
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-linen/70 px-3 py-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink">
                {current.tag}
              </span>
              <span className="font-sans text-[12px] font-medium tracking-[0.12em] text-muted">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Animated Title & Description */}
            <div className="min-h-[220px] sm:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${current.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col"
                >
                  <h3 className="m-0 font-serif text-[clamp(34px,4.2vw,56px)] font-normal leading-[1.05] tracking-[-0.03em] text-ink">
                    {current.title}
                  </h3>

                  {current.subtitle && (
                    <p className="m-0 mt-2 font-serif text-[18px] sm:text-[20px] italic text-ink/80">
                      {current.subtitle}
                    </p>
                  )}

                  <p className="m-0 mt-4 max-w-[520px] font-sans text-[15px] sm:text-[16px] leading-[1.75] text-muted">
                    {current.description}
                  </p>

                  {/* Action Link with Luxury Underline */}
                  <div className="mt-6 sm:mt-8">
                    <Link
                      href={current.linkHref || current.href}
                      className="group relative inline-flex items-center gap-2 pb-1 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-forest"
                    >
                      <span>{current.linkText || 'Explore'}</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-ink/35 transition-all duration-200 group-hover:bg-forest" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 2-Second Visual Progress Bar */}
            <div className="mt-8 max-w-[480px]">
              <div className="flex items-center justify-between pb-2 text-[10px] uppercase tracking-[0.16em] text-muted">
                <span>Auto-playing • 2s</span>
                <span>{isPaused ? 'Paused' : 'Active'}</span>
              </div>
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-ink/15">
                <motion.div
                  key={`progress-${activeIndex}-${isPaused || isHovered}`}
                  className="h-full bg-ink origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPaused || isHovered ? 0 : 1 }}
                  transition={{
                    duration: isPaused || isHovered ? 0 : autoPlayInterval / 1000,
                    ease: 'linear',
                  }}
                />
              </div>
            </div>

            {/* Interactive Controls: Previous / Play-Pause / Next / Indicator Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
                  title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white active:scale-95 cursor-pointer"
                >
                  {isPaused ? <Play size={13} className="ml-0.5" /> : <Pause size={13} />}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Quick Tab/Dot Selectors */}
              <div className="flex items-center gap-1.5 pl-2" role="tablist">
                {items.map((item, idx) => (
                  <button
                    key={`dot-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                    onClick={() => handleSelect(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex
                        ? 'w-7 bg-ink'
                        : 'w-2 bg-ink/25 hover:bg-ink/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Gallery Images in 3D Card Stack */}
          <div className="relative flex w-full items-center justify-center overflow-visible py-4">
            <ScrollableCardStack
              items={items}
              currentIndex={activeIndex}
              onIndexChange={setActiveIndex}
              autoPlay={false}
              cardHeight={350}
              showIndicators={false}
              perspective={1100}
              transitionDuration={220}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperiencesGallery;
