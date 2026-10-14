'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  weddingIntroData,
  type WeddingSectionData,
  type WeddingCard,
} from '@/data/weddings';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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

const ctaVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export interface WeddingIntroProps {
  data?: WeddingSectionData;
  className?: string;
}

export function WeddingIntro({
  data = weddingIntroData,
  className = '',
}: WeddingIntroProps) {
  const words = data.heading.split(' ');

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const distance = Math.max(0, trackWidth - windowWidth);
        setScrollRange(distance);
      }
    };

    calculateDistance();
    window.addEventListener('resize', calculateDistance);
    return () => window.removeEventListener('resize', calculateDistance);
  }, [data.cards.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out scroll progress with responsive spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0001,
  });

  // Animate horizontal travel smoothly across full [0, 1] of the pinned scroll with zero dead space
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange], {
    clamp: true,
  });
  const progressBarScale = useTransform(smoothProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  return (
    <section
      ref={containerRef}
      className={`relative h-[210vh] max-[720px]:h-[230vh] bg-paper ${className}`}
      aria-labelledby="wedding-intro-heading"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-[calc(48px+1vh)] pb-2 max-[720px]:pt-[54px] max-[720px]:pb-2">
        {/* Section Header: Centered Eyebrow, Heading, Description & CTA */}
        <div className="flex flex-col items-center text-center max-w-[860px] mx-auto px-6 mb-4 min-[1280px]:mb-6 shrink-0 max-[720px]:mb-3">
          {data.eyebrow && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariants}
              className="m-0 mb-3 uppercase tracking-[0.18em] text-[10px] font-semibold text-muted text-center max-[720px]:mb-2"
            >
              {data.eyebrow}
            </motion.p>
          )}

          <motion.h2
            id="wedding-intro-heading"
            className="font-jakarta font-normal text-[clamp(24px,2.5vw,40px)] leading-[1.25] tracking-[-0.01em] uppercase text-ink m-0 max-w-[860px] text-center max-[720px]:text-[24px] max-[480px]:text-[20px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            {words.map((word, index) => (
              <motion.span
                key={`word-${word}-${index}`}
                variants={wordVariants}
                className="inline-block mr-[0.28em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {data.description && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariants}
              className="m-0 mt-3.5 max-w-[600px] mx-auto text-muted text-[clamp(13px,0.95vw,15px)] leading-[1.65] text-center max-[720px]:text-[13px] max-[720px]:mt-2.5"
            >
              {data.description}
            </motion.p>
          )}

          {data.ctaText && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={ctaVariants}
              className="mt-4 max-[720px]:mt-3"
            >
              <Link
                href={data.ctaHref}
                className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold uppercase text-ink border-b border-ink pb-1.5 hover:text-forest transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[3px]"
                aria-label={`${data.ctaText} - View wedding celebrations and offerings`}
              >
                <span>{data.ctaText}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Horizontal Scrolling Cards Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-[22px] pl-[5.4vw] pr-[5.4vw] w-max items-stretch will-change-transform max-[980px]:gap-6 max-[720px]:gap-5 max-[720px]:pl-6 max-[720px]:pr-6"
          >
            {data.cards.map((card: WeddingCard, index: number) => {
              if (card.type === 'editorial') {
                return (
                  <motion.article
                    key={`wedding-card-${index}`}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="relative flex flex-col bg-linen border border-ink/14 p-[clamp(24px,2vw,36px)_clamp(20px,1.8vw,28px)] justify-between shrink-0 w-[calc((100vw-10.8vw-66px)/4)] aspect-[4/5] box-border transition-[colors,box-shadow] duration-300 ease-in-out hover:border-ink/32 hover:shadow-lg max-[980px]:w-[calc((100vw-10.8vw-24px)/2)] max-[720px]:w-[calc(100vw-48px)] max-[720px]:aspect-[4/4.8] max-[720px]:p-[28px_20px]"
                    aria-label={card.eyebrow}
                  >
                    <div className="flex flex-col">
                      <p className="m-0 mb-[18px] text-[10px] tracking-[0.18em] font-semibold uppercase text-muted">
                        {card.eyebrow}
                      </p>
                      <p className="m-0 font-sans text-[clamp(14px,1.05vw,15px)] leading-[1.68] text-ink tracking-[-0.01em]">
                        {card.copy}
                      </p>
                    </div>
                    <div className="mt-7 pt-[18px] border-t border-ink/15">
                      <Link
                        href={card.linkHref}
                        className="group/link inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] font-semibold uppercase text-ink transition-colors duration-200 ease-in-out hover:text-forest focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[3px]"
                        aria-label={`${card.linkText} - Discover wedding celebrations`}
                      >
                        <span>{card.linkText}</span>
                        <ArrowUpRight
                          className="transition-transform duration-[250ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/link:translate-x-[3px] group-hover/link:-translate-y-[3px]"
                          size={14}
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </motion.article>
                );
              }

              return (
                <motion.article
                  key={`wedding-card-${index}`}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="relative flex flex-col bg-linen group hover:shadow-xl transition-shadow duration-300 shrink-0 w-[calc((100vw-10.8vw-66px)/4)] aspect-[4/5] overflow-hidden max-[980px]:w-[calc((100vw-10.8vw-24px)/2)] max-[720px]:w-[calc(100vw-48px)] max-[720px]:aspect-[4/4.8]"
                >
                  <div className="relative w-full h-full overflow-hidden bg-linen">
                    <img
                      src={card.image}
                      alt={card.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.038]"
                    />
                    {card.overlayLabel && (
                      <div className="absolute inset-0 flex items-end p-[24px_22px] bg-gradient-to-b from-transparent via-transparent to-[rgba(14,32,28,0.72)] pointer-events-none">
                        <span className="text-white font-sans text-[11px] font-semibold tracking-[0.16em] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                          {card.overlayLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="flex items-center justify-center gap-3 mt-5 min-[1400px]:mt-7 shrink-0">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-muted">01</span>
          <div className="w-36 h-[2px] bg-ink/15 overflow-hidden rounded-full">
            <motion.div
              style={{ scaleX: progressBarScale, transformOrigin: 'left' }}
              className="w-full h-full bg-ink"
            />
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-muted">08</span>
        </div>
      </div>
    </section>
  );
}
