'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Move } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import {
  DraggableContainer,
  GridBody,
  GridItem,
} from '@/components/ui/infinite-drag-scroll';

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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
  eyebrow?: string;
  headingWords?: string[][];
}

export function ExperiencesGallery({
  className = '',
  images = galleryImages,
  eyebrow = 'EXPERIENCES GALLERY',
  headingWords,
}: ExperiencesGalleryProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let isAutoSnapping = false;
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY;
      lastY = currentY;

      if (isAutoSnapping) return;

      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // When user scrolls down from Stay at Idanazhi into Gallery:
      // If gallery top enters the trigger window (20px to 45% of viewport height)
      if (scrollingDown && rect.top > 20 && rect.top < vh * 0.45) {
        isAutoSnapping = true;
        const targetTop = window.scrollY + rect.top;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          isAutoSnapping = false;
        }, 750);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-label="Idanazhi Gallery Infinite Canvas"
      className={`sticky top-0 z-10 h-screen min-h-[100svh] max-h-[100svh] w-full overflow-hidden bg-paper select-none flex flex-col pt-10 sm:pt-14 md:pt-16 ${className}`}
      style={{ scrollSnapAlign: 'start', scrollMarginTop: 0 }}
    >
      {/* Section Header: Eyebrow Title positioned cleanly ABOVE the gallery component */}
      {eyebrow && (
        <div className="flex flex-col items-center text-center max-w-[940px] mx-auto px-6 mb-10 sm:mb-14 md:mb-16 shrink-0 z-30">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="m-0 uppercase tracking-[0.24em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-center"
          >
            {eyebrow}
          </motion.p>

          {headingWords && headingWords.length > 0 && (
            <div className="w-full flex justify-center items-center text-center mt-2.5">
              <ScrollReveal
                as="h2"
                baseOpacity={0.08}
                enableBlur={true}
                baseRotation={0}
                blurStrength={8}
                containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
                textClassName="!font-jakarta !font-normal !text-[clamp(20px,2.5vw,36px)] !leading-[1.25] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
                wordAnimationStart="top 85%"
                wordAnimationEnd="bottom 55%"
              >
                <span
                  id="gallery-heading"
                  className="block !font-jakarta !font-normal !text-[clamp(20px,2.5vw,36px)] !leading-[1.25] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
                >
                  {headingWords.map((lineWords, lineIdx) => (
                    <span key={lineIdx} className="block sm:whitespace-nowrap">
                      {lineWords.map((word, wordIdx) => (
                        <React.Fragment key={wordIdx}>
                          <span className="word">{word}</span>
                          {wordIdx < lineWords.length - 1 && ' '}
                        </React.Fragment>
                      ))}
                    </span>
                  ))}
                </span>
              </ScrollReveal>
            </div>
          )}
        </div>
      )}

      {/* Infinite Draggable Grid Canvas Component below the Header */}
      <div className="relative flex-1 min-h-0 w-full overflow-hidden">
        <DraggableContainer variant="masonry">
          <GridBody>
            {images.map((photo) => (
              <GridItem
                key={photo.id}
                className="relative h-64 w-44 sm:h-80 sm:w-56 md:h-[380px] md:w-[270px] rounded-none"
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

        {/* Bottom Floating Explore More HUD */}
        <div className="pointer-events-none absolute bottom-6 inset-x-0 z-30 flex flex-col items-center justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-line/35 bg-paper/92 px-6 py-3 shadow-xl backdrop-blur-md transition-all duration-200 hover:bg-paper hover:shadow-[0_16px_48px_rgba(124,64,46,0.2)]">
            <span className="font-serif text-[14.5px] sm:text-[15.5px] text-ink font-medium tracking-tight hidden sm:inline">
              Curated Destination Moments
            </span>
            <span className="h-4 w-[1px] bg-ink/25 hidden sm:inline" />
            <Link
              href="/singapore/experiences/"
              className="luxury-cta text-[11.5px] font-bold tracking-[0.18em]"
            >
              <span className="cta-text">EXPLORE MORE</span>
              <ArrowUpRight
                size={14}
                className="cta-arrow"
              />
            </Link>
          </div>

          <div className="mt-2 flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-muted/80">
            <Move size={10} className="text-ink/60" />
            <span>DRAG CANVAS IN ANY DIRECTION</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperiencesGallery;
