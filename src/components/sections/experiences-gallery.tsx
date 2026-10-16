'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight, Sparkles } from 'lucide-react';
import { ScrollableCardStack, CardItem } from '@/components/ui/scrollable-card-stack';

export interface ExperienceCardItem extends CardItem {
  tag: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
  linkText: string;
  linkHref: string;
}

export const experiencesSlides: ExperienceCardItem[] = [
  {
    id: 'savour',
    tag: 'GASTRONOMY & CELLAR',
    title: 'Savour',
    subtitle: 'Royal Travancore Flavours & Open-Air Twilight Banquets',
    name: 'Culinary Pavilions',
    handle: '@idanazhi.dining',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/experiences/savour-dining.jpg',
    href: '/singapore/#dining',
    linkText: 'Explore Dining',
    linkHref: '/singapore/#dining',
    description:
      'Celebrated culinary artisans, immersive ancestral journeys, and a spirit of farm-fresh innovation define our open-air pavilions and starlit banquet halls. Here, organic estate harvest meets time-honoured Travancore royal recipes, woodfired earthen spices, and bespoke sommelier pairings crafted to turn every feast into a luminous memory.',
    highlights: [
      'Farm-to-Table Organic Harvest',
      'Royal Travancore Recipes',
      'Twilight Sommelier Cellar',
    ],
  },
  {
    id: 'reset',
    tag: 'AYURVEDA & RETREAT',
    title: 'Reset',
    subtitle: 'Holistic Ayurvedic Sanctuaries & Ancient Herbal Healing',
    name: 'Ayurveda & Retreat',
    handle: '@idanazhi.wellness',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/experiences/reset-wellness.jpg',
    href: '/singapore/experiences/',
    linkText: 'Explore Wellness',
    linkHref: '/singapore/experiences/',
    description:
      'Surrender to the restorative rhythm of Kerala’s ancient medicinal gardens, tranquil reflecting pools, and therapeutic herbal steam sanctuaries. Guided by master Vaidyas and certified wellness practitioners, our bespoke Ayurvedic therapies and mindful meditation pavilions restore harmonious vitality to body, mind, and spirit from within.',
    highlights: [
      'Authentic Panchakarma & Vaidya Care',
      'Herbal Medicinal Flora',
      'Serene Reflecting Pools',
    ],
  },
  {
    id: 'celebrate',
    tag: 'DESTINATION WEDDINGS',
    title: 'Celebrate',
    subtitle: 'Grand Floral Mandapams & Regal Landmark Receptions',
    name: 'Grand Mandapams',
    handle: '@idanazhi.weddings',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/weddings/stage-grand-reception.jpg',
    href: '/#celebrations-and-experience',
    linkText: 'Explore Celebrations',
    linkHref: '/#celebrations-and-experience',
    description:
      'The stage is yours to enchant. Host showstopping wedding ceremonies, auspicious dawn rituals, and landmark family reunions beneath opulent floral mandapams and twinkling banyan canopies. From majestic procession motifs and temple drum crescendos to midnight banquet feasts, our dedicated wedding concierge orchestrates every milestone with impeccable grace.',
    highlights: [
      'Bespoke Floral Mandapams',
      '1,500+ Guest Capacity Arenas',
      'Dedicated Wedding Concierge',
    ],
  },
  {
    id: 'sanctuary',
    tag: 'HERITAGE SUITES',
    title: 'Sanctuary',
    subtitle: 'Artful Teakwood Illams, Courtyards & Breezy Verandas',
    name: 'Heritage Illams',
    handle: '@idanazhi.stays',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/weddings/architecture-corridor.jpg',
    href: '/#stay',
    linkText: 'Explore Stays',
    linkHref: '/#stay',
    description:
      'Artful suites and private heritage illams crafted with centuries-old teak columns, brass Urulis, and terracotta-tiled breezeways offer an oasis of unhurried seclusion. Awaken to morning birdcalls across coconut groves, take afternoon tea on shaded colonnades, and immerse in private plunge pools wrapped in lush tropical foliage.',
    highlights: [
      'Centuries-Old Teak Architecture',
      'Shaded Courtyard Colonnades',
      'Private Veranda Plunge Pools',
    ],
  },
  {
    id: 'discover',
    tag: 'CURATED ENCOUNTERS',
    title: 'Discover',
    subtitle: 'Historic Manor Architecture, Backwaters & Living Culture',
    name: 'Varikkasseri Manor',
    handle: '@idanazhi.estate',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/weddings/varikkasseri.jpg',
    href: '/singapore/experiences/',
    linkText: 'Explore Encounters',
    linkHref: '/singapore/experiences/',
    description:
      'Venture beyond the ordinary with curated estate adventures on land and water. Uncover centuries of Travancore history at the historic Varikkasseri Manor, drift through serene palm-fringed backwater canals at golden hour, and immerse your evenings in dramatic Kathakali dance performances and classical percussion rhythms under starlit canopies.',
    highlights: [
      'Historic Manor Excursions',
      'Sunset Backwater Cruises',
      'Classical Kathakali Soirées',
    ],
  },
  {
    id: 'cherish',
    tag: 'SACRED UNION',
    title: 'Cherish',
    subtitle: 'Auspicious Dawn Rituals, Thalappoli & Sacred Bonds',
    name: 'Sacred Moments',
    handle: '@idanazhi.moments',
    avatar: '/images/weddings/logo/smy_mark_hd.png',
    image: '/images/weddings/card-togetherness-couple.jpg',
    href: '/singapore/experiences/',
    linkText: 'Explore Rituals',
    linkHref: '/singapore/experiences/',
    description:
      'From the fragrant jasmine garlands and traditional dawn Thalappoli processions to sacred Vedic vows recited around ceremonial flames, celebrate eternal union enveloped in the spiritual warmth of Kerala. Every cherished tradition is honoured with authenticity, profound joy, and timeless elegance that echoes across generations.',
    highlights: [
      'Traditional Dawn Thalappoli',
      'Sacred Vedic Ceremonies',
      'Generational Keepsake Photography',
    ],
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
      className={`relative w-full bg-paper py-[clamp(72px,10vh,130px)] overflow-hidden border-t border-line/25 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient luxury lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-linen/50 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-linen/40 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-14">
        {/* Top Header Row */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-line/20 pb-6">
          <div className="flex items-center gap-3.5">
            <span className="h-[2px] w-9 bg-ink/75" />
            <span className="font-sans text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.24em] text-ink">
              CURATED RESORT EXPERIENCES
            </span>
          </div>

          <Link
            href="/singapore/experiences/"
            className="group inline-flex items-center gap-1.5 font-sans text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:text-forest"
          >
            <span>Explore All</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* 2-Column Responsive Layout:
            PHOTO ON THE LEFT, TEXT ON THE RIGHT (swapped per request) */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.14fr_1.1fr] lg:gap-16">
          {/* LEFT SIDE: Gallery Images in 3D Card Stack (Enlarged) */}
          <div className="relative flex w-full items-center justify-center overflow-visible py-4 order-2 lg:order-1">
            <ScrollableCardStack
              items={items}
              currentIndex={activeIndex}
              onIndexChange={setActiveIndex}
              autoPlay={false}
              cardHeight={420}
              showIndicators={false}
              perspective={1200}
              transitionDuration={220}
              className="w-full"
            />
          </div>

          {/* RIGHT SIDE: Rich Editorial Text & Controls (Enlarged) */}
          <div className="flex flex-col justify-center order-1 lg:order-2 pl-0 lg:pl-4">
            {/* Tag / Category and Counter */}
            <div className="mb-5 flex items-center gap-4">
              <span className="rounded-full bg-linen/80 px-4 py-1.5 font-sans text-[11.5px] sm:text-[12.5px] font-semibold uppercase tracking-[0.2em] text-ink border border-line/30 shadow-xs">
                {current.tag}
              </span>
              <span className="font-sans text-[13px] sm:text-[14px] font-semibold tracking-[0.14em] text-muted">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Animated Title, Subtitle, Description & Highlights */}
            <div className="min-h-[290px] sm:min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${current.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col"
                >
                  {/* Primary Headline - Enlarged */}
                  <h3 className="m-0 font-serif text-[clamp(40px,4.6vw,66px)] font-normal leading-[1.0] tracking-[-0.035em] text-ink">
                    {current.title}
                  </h3>

                  {/* Subtitle - Enlarged */}
                  {current.subtitle && (
                    <p className="m-0 mt-3 font-serif text-[20px] sm:text-[23px] italic text-ink/85 leading-snug">
                      {current.subtitle}
                    </p>
                  )}

                  {/* Rich Narrative Description - Enlarged & Expanded */}
                  <p className="m-0 mt-5 max-w-[620px] font-sans text-[16px] sm:text-[17.5px] leading-[1.8] text-muted">
                    {current.description}
                  </p>

                  {/* Key Experience Highlights */}
                  {current.highlights && current.highlights.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {current.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 font-sans text-[11.5px] sm:text-[12px] font-medium text-ink/90 border border-line/25"
                        >
                          <Sparkles size={11} className="text-ink/60" />
                          <span>{highlight}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action CTA Link with Luxury Underline - Enlarged */}
                  <div className="mt-7 sm:mt-9">
                    <Link
                      href={current.linkHref || current.href}
                      className="group relative inline-flex items-center gap-2 pb-1.5 font-sans text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:text-forest"
                    >
                      <span>{current.linkText || 'Explore Experience'}</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-ink/40 transition-all duration-200 group-hover:bg-forest" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 2-Second Visual Progress Bar */}
            <div className="mt-9 max-w-[540px]">
              <div className="flex items-center justify-between pb-2 text-[11px] uppercase tracking-[0.18em] text-muted font-medium">
                <span>Auto-playing • 2s Interval</span>
                <span>{isPaused ? 'Paused' : 'Playing'}</span>
              </div>
              <div className="h-[2.5px] w-full overflow-hidden rounded-full bg-ink/15">
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
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white active:scale-95 cursor-pointer shadow-xs"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
                  title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white active:scale-95 cursor-pointer shadow-xs"
                >
                  {isPaused ? <Play size={14} className="ml-0.5" /> : <Pause size={14} />}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white active:scale-95 cursor-pointer shadow-xs"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Quick Tab/Dot Selectors */}
              <div className="flex items-center gap-2 pl-2" role="tablist">
                {items.map((item, idx) => (
                  <button
                    key={`dot-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                    onClick={() => handleSelect(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex
                        ? 'w-8 bg-ink'
                        : 'w-2.5 bg-ink/25 hover:bg-ink/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperiencesGallery;
