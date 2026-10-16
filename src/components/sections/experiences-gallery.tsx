'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Move } from 'lucide-react';
import {
  DraggableContainer,
  GridBody,
  GridItem,
} from '@/components/ui/infinite-drag-scroll';

export interface GalleryPhotoItem {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
}

export const galleryImages: GalleryPhotoItem[] = [
  {
    id: 1,
    title: 'Savour Dining',
    category: 'GASTRONOMY',
    src: '/images/experiences/savour-dining.jpg',
    alt: 'Outdoor dining banquet and twilight pavilions at Idanazhi',
  },
  {
    id: 2,
    title: 'Ayurvedic Sanctuary',
    category: 'WELLBEING',
    src: '/images/experiences/reset-wellness.jpg',
    alt: 'Ayurvedic wellness sanctuary and reflecting pool',
  },
  {
    id: 3,
    title: 'Grand Floral Mandapam',
    category: 'WEDDINGS',
    src: '/images/weddings/stage-grand-reception.jpg',
    alt: 'Grand wedding reception stage and floral backdrop',
  },
  {
    id: 4,
    title: 'Heritage Teak Corridor',
    category: 'ARCHITECTURE',
    src: '/images/weddings/architecture-corridor.jpg',
    alt: 'Traditional Kerala teakwood illam corridor',
  },
  {
    id: 5,
    title: 'Varikkasseri Manor',
    category: 'ENCOUNTERS',
    src: '/images/weddings/varikkasseri.jpg',
    alt: 'Historic Varikkasseri heritage estate manor',
  },
  {
    id: 6,
    title: 'Sacred Togetherness',
    category: 'MOMENTS',
    src: '/images/weddings/card-togetherness-couple.jpg',
    alt: 'Wedding couple in traditional Kerala wedding attire',
  },
  {
    id: 7,
    title: 'Coastal Mandapam',
    category: 'WEDDINGS',
    src: '/images/weddings/stage-coastal-mandapam.jpg',
    alt: 'Coastal mandapam with breeze and floral decor',
  },
  {
    id: 8,
    title: 'Paliam Heritage',
    category: 'ESTATES',
    src: '/images/weddings/paliam.jpg',
    alt: 'Historic Paliam heritage estate palace',
  },
  {
    id: 9,
    title: 'Vedic Pujan Rituals',
    category: 'RITUALS',
    src: '/images/weddings/pair-pujan.jpg',
    alt: 'Traditional Vedic wedding fire ceremony and pujan',
  },
  {
    id: 10,
    title: 'Heritage Mandapam',
    category: 'WEDDINGS',
    src: '/images/weddings/stage-heritage-mandapam.jpg',
    alt: 'Carved teakwood heritage mandapam stage',
  },
  {
    id: 11,
    title: 'Outdoor Banquets',
    category: 'CELEBRATIONS',
    src: '/images/weddings/spaces/space-outdoor-1.jpg',
    alt: 'Banquets under starlit banyan canopies',
  },
  {
    id: 12,
    title: 'Twilight Courtyard Dinner',
    category: 'DINING',
    src: '/images/weddings/spaces/space-dinner-1.jpg',
    alt: 'Candlelit courtyard dinner under tropical trees',
  },
  {
    id: 13,
    title: 'Celebration Stage',
    category: 'WEDDINGS',
    src: '/images/weddings/spaces/stage-1.jpg',
    alt: 'Grand wedding stage with warm lighting',
  },
  {
    id: 14,
    title: 'Joyous Evenings',
    category: 'CELEBRATIONS',
    src: '/images/weddings/celebration-1.jpg',
    alt: 'Luminous celebration and festive laughter',
  },
  {
    id: 15,
    title: 'Traditional Thalappoli',
    category: 'RITUALS',
    src: '/images/weddings/hindu-rituals.jpg',
    alt: 'Traditional Kerala wedding rituals with brass oil lamps',
  },
  {
    id: 16,
    title: 'South Indian Wedding',
    category: 'MOMENTS',
    src: '/images/weddings/celebration-2.jpg',
    alt: 'Joyful celebration and bridal moments',
  },
  {
    id: 17,
    title: 'Private Illam Veranda',
    category: 'STAYS',
    src: '/images/weddings/spaces/space-dinner-2.jpg',
    alt: 'Quiet breezy veranda dining space',
  },
  {
    id: 18,
    title: 'Floral Splendour',
    category: 'DECOR',
    src: '/images/weddings/spaces/stage-2.jpg',
    alt: 'Floral mandapam styling with jasmine and marigold',
  },
];

export interface ExperiencesGalleryProps {
  className?: string;
  images?: GalleryPhotoItem[];
}

export function ExperiencesGallery({
  className = '',
  images = galleryImages,
}: ExperiencesGalleryProps) {
  return (
    <div className={`relative z-30 w-full ${className}`}>
      {/* 1 Viewport Full Screen Infinite Drag Canvas */}
      <section
        id="gallery"
        aria-label="Idanazhi Gallery Infinite Canvas"
        className="relative z-30 h-screen min-h-[100svh] max-h-[100svh] w-full overflow-hidden bg-paper select-none border-t border-line/35 shadow-[0_-30px_70px_rgba(40,20,10,0.18)]"
      >
        {/* Top Floating Badge */}
        <div className="pointer-events-none absolute top-7 inset-x-0 z-30 flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-line/30 bg-paper/90 px-5 py-2 shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">
              GALLERY • LIVING HERITAGE
            </span>
          </div>
        </div>

        {/* Bottom Floating Explore More HUD */}
        <div className="pointer-events-none absolute bottom-8 inset-x-0 z-30 flex flex-col items-center justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-line/35 bg-paper/92 px-6 py-3.5 shadow-2xl backdrop-blur-md transition-all duration-200 hover:bg-paper hover:shadow-[0_16px_48px_rgba(124,64,46,0.2)]">
            <span className="font-serif text-[15px] sm:text-[16px] text-ink font-medium tracking-tight hidden sm:inline">
              Curated Destination Moments
            </span>
            <span className="h-4 w-[1px] bg-ink/25 hidden sm:inline" />
            <Link
              href="/singapore/experiences/"
              className="group inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:text-forest"
            >
              <span>EXPLORE MORE</span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 font-sans text-[10.5px] uppercase tracking-[0.2em] text-muted/80">
            <Move size={11} className="text-ink/60" />
            <span>DRAG CANVAS IN ANY DIRECTION</span>
          </div>
        </div>

        {/* Infinite Draggable Grid */}
        <DraggableContainer variant="masonry">
          <GridBody>
            {images.map((photo) => (
              <GridItem
                key={photo.id}
                className="relative h-64 w-44 sm:h-80 sm:w-56 md:h-[400px] md:w-[280px]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                {/* Subtle luxury photo vignette */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Hover title badge */}
                <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-md opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <span className="truncate font-serif text-[14px]">
                    {photo.title}
                  </span>
                  <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.16em] opacity-80">
                    {photo.category}
                  </span>
                </div>
              </GridItem>
            ))}
          </GridBody>
        </DraggableContainer>
      </section>

      {/* Explore More Option after 1 Viewport Height */}
      <div className="w-full bg-linen/40 py-12 px-6 sm:px-12 border-b border-line/20">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/75 block mb-1.5">
              DESTINATION EXPERIENCES
            </span>
            <h3 className="font-serif text-[clamp(26px,3vw,38px)] text-ink font-normal tracking-tight m-0">
              Adventures and encounters crafted for the curious traveller
            </h3>
          </div>
          <Link
            href="/singapore/experiences/"
            className="flex-shrink-0 group inline-flex items-center gap-2.5 border border-ink bg-ink px-7 py-3.5 text-[11.5px] font-sans font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-forest hover:border-forest shadow-md"
          >
            <span>EXPLORE ALL EXPERIENCES</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExperiencesGallery;
