'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

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

interface ColumnSetup {
  direction: 'down' | 'up';
  duration: number;
  delay: number;
  images: GalleryPhotoItem[];
}

export interface ExperiencesGalleryProps {
  className?: string;
  images?: GalleryPhotoItem[];
  eyebrow?: string;
  heading?: string;
  headingWords?: string[][];
}

export function ExperiencesGallery({
  className = '',
  images = galleryImages,
  eyebrow,
  heading = 'EXPERIENCES GALLERY',
  headingWords,
}: ExperiencesGalleryProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);

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

  // 6 Columns matching the original layout & screenshot distribution:
  // Col 1 (index 0): Downwards (Up to Down)
  // Col 2 (index 1): Upwards (Down to Up), with masonry stagger offset
  // Col 3 (index 2): Downwards (Up to Down)
  // Col 4 (index 3): Upwards (Down to Up), with masonry stagger offset
  // Col 5 (index 4): Downwards (Up to Down)
  // Col 6 (index 5): Upwards (Down to Up), with masonry stagger offset
  const columns: ColumnSetup[] = useMemo(() => {
    const list = images.length >= 18 ? images : galleryImages;

    // Col 1: Heritage mandapam, couple with balloons, Varikkasseri roof
    const col1 = [list[9], list[13], list[4]];
    // Col 2: Wellness/flowers, chairs on lawn, courtyard dinner
    const col2 = [list[1], list[16], list[11]];
    // Col 3: Savour dining, couple holding hands, outdoor banquets
    const col3 = [list[0], list[5], list[10]];
    // Col 4: Coastal mandapam aisle, pujan ritual couple, celebration stage
    const col4 = [list[6], list[8], list[12]];
    // Col 5: Paliam manor, confetti wedding, grand reception chandeliers
    const col5 = [list[7], list[15], list[2]];
    // Col 6: Traditional Thalappoli, floral mandapam, teak corridor
    const col6 = [list[14], list[17], list[3]];

    return [
      {
        direction: 'down',
        duration: 74,
        delay: 0,
        images: [...col1, ...col1], // 6 cards per set
      },
      {
        direction: 'up',
        duration: 68,
        delay: -17, // Staggered masonry offset so even columns start offset by 50%
        images: [...col2, ...col2],
      },
      {
        direction: 'down',
        duration: 78,
        delay: -5,
        images: [...col3, ...col3],
      },
      {
        direction: 'up',
        duration: 70,
        delay: -21, // Staggered masonry offset
        images: [...col4, ...col4],
      },
      {
        direction: 'down',
        duration: 76,
        delay: -9,
        images: [...col5, ...col5],
      },
      {
        direction: 'up',
        duration: 69,
        delay: -19, // Staggered masonry offset
        images: [...col6, ...col6],
      },
    ];
  }, [images]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-label="Idanazhi Gallery Infinite Canvas"
      className={`sticky top-0 z-10 h-screen min-h-[100svh] max-h-[100svh] w-full overflow-hidden bg-paper select-none relative ${className}`}
      style={{ scrollSnapAlign: 'start', scrollMarginTop: 0 }}
    >
      {/* 6-Column Infinite Marquee Canvas matching original card dimensions & spacing */}
      <div className="absolute inset-0 h-full w-full overflow-hidden flex items-center justify-center pointer-events-auto">
        <div className="flex justify-center items-start gap-x-10 md:gap-x-16 px-5 md:px-10 h-full w-fit shrink-0">
          {columns.map((col, colIdx) => {
            const isDown = col.direction === 'down';

            return (
              <div
                key={colIdx}
                className="w-44 sm:w-56 md:w-[270px] shrink-0 h-full overflow-hidden"
              >
                {/* Moving column track */}
                <div
                  className={`flex flex-col w-full pause-on-hover ${
                    isDown ? 'animate-marquee-down' : 'animate-marquee-up'
                  }`}
                  style={
                    {
                      '--marquee-duration': `${col.duration}s`,
                      animationDelay: `${col.delay}s`,
                    } as React.CSSProperties
                  }
                >
                  {/* Set 1: Original card dimensions & styling */}
                  {col.images.map((photo, itemIdx) => (
                    <div
                      key={`set1-${colIdx}-${photo.id}-${itemIdx}`}
                      onClick={() => setSelectedPhoto(photo)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedPhoto(photo);
                        }
                      }}
                      className="group relative h-64 w-44 sm:h-80 sm:w-56 md:h-[380px] md:w-[270px] rounded-none overflow-hidden border border-line/30 shadow-lg hover:shadow-2xl bg-white mb-20 sm:mb-28 md:mb-[140px] lg:mb-[150px] shrink-0 cursor-pointer transition-all duration-300"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Subtle luxury photo vignette */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden="true"
                      />

                      {/* Hover title badge */}
                      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="truncate font-serif text-[14px]">
                          {photo.title}
                        </span>
                        <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.16em] opacity-80">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Set 2 (Identical duplicate for seamless 100% infinite loop) */}
                  {col.images.map((photo, itemIdx) => (
                    <div
                      key={`set2-${colIdx}-${photo.id}-${itemIdx}`}
                      aria-hidden="true"
                      onClick={() => setSelectedPhoto(photo)}
                      role="button"
                      tabIndex={-1}
                      className="group relative h-64 w-44 sm:h-80 sm:w-56 md:h-[380px] md:w-[270px] rounded-none overflow-hidden border border-line/30 shadow-lg hover:shadow-2xl bg-white mb-20 sm:mb-28 md:mb-[140px] lg:mb-[150px] shrink-0 cursor-pointer transition-all duration-300"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Subtle luxury photo vignette */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden="true"
                      />

                      {/* Hover title badge */}
                      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="truncate font-serif text-[14px]">
                          {photo.title}
                        </span>
                        <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.16em] opacity-80">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent Fog Spread Overlay: Atmospheric misty canopy without opaque blocking */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 sm:h-56 md:h-64 z-20 overflow-hidden"
      >
        {/* Progressive fog backdrop blur (diffuses photos drifting underneath) */}
        <div
          className="absolute inset-0 backdrop-blur-[10px]"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Truly transparent mist diffusion with ethereal feathering */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, 
                rgba(247, 243, 239, 0.42) 0%, 
                rgba(247, 243, 239, 0.22) 35%, 
                rgba(247, 243, 239, 0.06) 70%, 
                transparent 100%
              ),
              radial-gradient(ellipse 90% 65% at 50% 0%, 
                rgba(255, 255, 255, 0.35) 0%, 
                rgba(247, 243, 239, 0.12) 55%, 
                transparent 100%
              )
            `,
          }}
        />
      </div>

      {/* Bottom Mist Feather */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-44 z-20 overflow-hidden"
      >
        <div
          className="absolute inset-0 backdrop-blur-[8px]"
          style={{
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(247, 243, 239, 0.55) 0%, rgba(247, 243, 239, 0.22) 45%, transparent 100%)',
          }}
        />
      </div>

      {/* Section Header: positioned over the canvas with pointer-events-none */}
      {(eyebrow || heading || headingWords) && (
        <div className="pointer-events-none absolute top-7 sm:top-10 md:top-12 inset-x-0 z-30 flex flex-col items-center text-center max-w-[940px] mx-auto px-6">
          {eyebrow && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariants}
              className="m-0 uppercase tracking-[0.24em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-center mb-2 sm:mb-2.5"
            >
              {eyebrow}
            </motion.p>
          )}

          {headingWords && headingWords.length > 0 ? (
            <div className="w-full flex justify-center items-center text-center mt-1">
              <ScrollReveal
                as="h2"
                baseOpacity={0.08}
                enableBlur={true}
                baseRotation={0}
                blurStrength={8}
                containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
                textClassName="!font-jakarta !font-normal !text-[clamp(24px,3.2vw,44px)] !leading-[1.22] !tracking-[0.08em] sm:!tracking-[0.14em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
                wordAnimationStart="top 85%"
                wordAnimationEnd="bottom 55%"
              >
                <span
                  id="gallery-heading"
                  className="block !font-jakarta !font-normal !text-[clamp(24px,3.2vw,44px)] !leading-[1.22] !tracking-[0.08em] sm:!tracking-[0.14em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
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
          ) : (
            <motion.h2
              id="gallery-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariants}
              className="m-0 font-jakarta font-normal text-[clamp(24px,3.2vw,44px)] leading-[1.22] tracking-[0.08em] sm:tracking-[0.14em] uppercase text-ink text-center drop-shadow-sm"
            >
              {heading}
            </motion.h2>
          )}
        </div>
      )}

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
          <Sparkles size={11} className="text-ink/60" />
          <span>HOVER ANY CARD TO PAUSE &amp; EXPLORE</span>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[rgba(35,19,14,0.75)] backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-paper border border-line/40 overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-paper/90 text-ink border border-line/40 flex items-center justify-center hover:bg-ink hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/5">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-muted mb-1">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-serif text-[24px] sm:text-[28px] text-ink m-0 leading-tight">
                    {selectedPhoto.title}
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[14px] text-muted m-0 mt-1">
                    {selectedPhoto.alt}
                  </p>
                </div>

                <Link
                  href="/singapore/experiences/"
                  onClick={() => setSelectedPhoto(null)}
                  className="bg-ink text-white px-5 py-2.5 text-[10.5px] uppercase tracking-[0.16em] font-medium hover:bg-forest transition-colors shrink-0"
                >
                  DISCOVER EXPERIENCES
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ExperiencesGallery;
