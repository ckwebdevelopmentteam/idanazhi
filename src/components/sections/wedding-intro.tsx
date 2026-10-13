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
      delay: 0.45,
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
  const line1 = words.slice(0, -2);
  const line2 = words.slice(-2);

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

  // Animate horizontal travel across [0, 0.9] of the pinned scroll; [0.9, 1] acts as a smooth buffer before unpinning
  const x = useTransform(smoothProgress, [0, 0.9], [0, -scrollRange], {
    clamp: true,
  });
  const progressBarScale = useTransform(smoothProgress, [0, 0.9], [0, 1], {
    clamp: true,
  });

  return (
    <section
      ref={containerRef}
      className={`relative h-[320vh] bg-paper ${className}`}
      aria-labelledby="wedding-intro-heading"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-[calc(52px+1.5vh)] pb-[2.5vh] max-[720px]:pt-[64px] max-[720px]:pb-4">
        {/* Section Header: Centered Heading & CTA */}
        <div className="flex flex-col items-center text-center gap-7 mb-12 min-[1280px]:mb-16 min-[1600px]:mb-20 shrink-0 px-6 max-[720px]:gap-4 max-[720px]:mb-7">
          <motion.h2
            id="wedding-intro-heading"
            className="font-jakarta font-normal text-[clamp(26px,2.8vw,44px)] leading-[1.2] tracking-[-0.01em] uppercase text-ink m-0 max-w-[1100px] text-center max-[720px]:text-[28px] max-[480px]:text-[24px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            <span className="block min-[920px]:whitespace-nowrap">
              {line1.map((word, index) => (
                <motion.span
                  key={`line1-${word}-${index}`}
                  variants={wordVariants}
                  className="inline-block mr-[0.28em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block mt-1 max-[720px]:mt-0.5 whitespace-nowrap">
              {line2.map((word, index) => (
                <motion.span
                  key={`line2-${word}-${index}`}
                  variants={wordVariants}
                  className="inline-block mr-[0.28em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={ctaVariants}
          >
            <Link
              href={data.ctaHref}
              className="group inline-flex items-center justify-center gap-2 font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-ink border border-ink px-[24px] py-3 bg-transparent whitespace-nowrap transition-all duration-[180ms] ease-in-out hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[3px]"
              aria-label={`${data.ctaText} - View wedding celebrations and offerings`}
            >
              <span>{data.ctaText}</span>
              <ArrowUpRight
                className="transition-transform duration-[250ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                size={15}
                aria-hidden="true"
              />
            </Link>
          </motion.div>
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
                    className="relative flex flex-col bg-linen border border-ink/14 p-[clamp(30px,2.4vw,40px)_clamp(22px,2vw,30px)] justify-between shrink-0 w-[calc((100vw-10.8vw-66px)/4)] aspect-[4/5] min-h-[440px] box-border transition-[colors,box-shadow] duration-300 ease-in-out hover:border-ink/32 hover:shadow-lg max-[980px]:w-[calc((100vw-10.8vw-24px)/2)] max-[980px]:min-h-[380px] max-[720px]:w-[calc(100vw-48px)] max-[720px]:min-h-[380px] max-[720px]:p-[34px_24px]"
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
                  className="relative flex flex-col bg-linen group hover:shadow-xl transition-shadow duration-300 shrink-0 w-[calc((100vw-10.8vw-66px)/4)] aspect-[4/5] min-h-[440px] overflow-hidden max-[980px]:w-[calc((100vw-10.8vw-24px)/2)] max-[980px]:min-h-[380px] max-[720px]:w-[calc(100vw-48px)] max-[720px]:min-h-[380px]"
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
        <div className="flex items-center justify-center gap-3 mt-8 min-[1400px]:mt-10 shrink-0">
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
