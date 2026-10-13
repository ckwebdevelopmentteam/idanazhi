'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
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

const cardGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
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

  return (
    <section
      className={`py-[120px] px-[5.4vw] pb-[140px] bg-paper relative w-full max-[980px]:py-[95px] max-[980px]:pb-[110px] max-[720px]:py-[75px] max-[720px]:px-6 max-[720px]:pb-[85px] ${className}`}
      aria-labelledby="wedding-intro-heading"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-7 mb-14 max-[720px]:gap-6 max-[720px]:mb-10">
          <motion.h2
            id="wedding-intro-heading"
            className="font-jakarta font-extralight text-[clamp(28px,3vw,46px)] leading-[1.22] tracking-[-0.01em] uppercase text-ink m-0 max-w-[1100px] text-center max-[720px]:text-[32px] max-[480px]:text-[28px]"
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
              className="group inline-flex items-center justify-center gap-2 font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-ink border border-ink px-[24px] py-3.5 bg-transparent whitespace-nowrap transition-all duration-[180ms] ease-in-out hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[3px]"
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

        {/* Four-Card Grid */}
        <motion.div
          className="grid grid-cols-4 gap-[22px] items-stretch max-[980px]:grid-cols-2 max-[720px]:grid-cols-1 max-[720px]:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardGridVariants}
        >
          {data.cards.map((card: WeddingCard, index: number) => {
            if (card.type === 'editorial') {
              return (
                <motion.article
                  key={`wedding-card-${index}`}
                  variants={cardItemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="relative flex flex-col bg-[#eae5dc] border border-ink/14 p-[clamp(30px,2.4vw,40px)_clamp(22px,2vw,30px)] justify-between aspect-[4/5] min-h-[440px] box-border transition-[colors,box-shadow] duration-300 ease-in-out hover:border-ink/32 hover:shadow-lg max-[980px]:min-h-[380px] max-[980px]:aspect-auto max-[720px]:min-h-auto max-[720px]:p-[34px_24px] max-[720px]:aspect-auto"
                  aria-label={card.eyebrow}
                >
                  <div className="flex flex-col">
                    <p className="m-0 mb-[18px] text-[10px] tracking-[0.18em] font-semibold uppercase text-muted">
                      {card.eyebrow}
                    </p>
                    <p className="m-0 font-sans text-[clamp(14px,1.05vw,15px)] leading-[1.68] text-[#2e3e37] tracking-[-0.01em]">
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
                variants={cardItemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                className="relative flex flex-col bg-linen group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-full aspect-[4/5] min-h-[440px] overflow-hidden bg-linen max-[980px]:min-h-[380px] max-[980px]:aspect-auto max-[720px]:aspect-[4/5] max-[720px]:min-h-[380px]">
                  <img
                    src={card.image}
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.038]"
                  />
                  {card.overlayLabel && (
                    <div className="absolute inset-0 flex items-end p-[24px_22px] bg-gradient-to-b from-transparent via-transparent to-[rgba(14,32,28,0.68)] pointer-events-none">
                      <span className="text-white font-sans text-[11px] font-semibold tracking-[0.16em] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
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
    </section>
  );
}
