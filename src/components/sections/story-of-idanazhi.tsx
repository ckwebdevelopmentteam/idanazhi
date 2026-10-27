'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ui/ScrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

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

const storyCards = [
  {
    image: '/images/weddings/architecture-corridor.jpg',
    alt: 'Traditional Kerala Idanazhi wooden corridor with carved pillars',
    eyebrow: 'TRADITIONAL CORRIDORS',
    title: 'The Soul of Idanazhi',
    description:
      'Inspired by authentic Kerala architectural passageways, connecting quiet family chambers with open colonnades and sacred breezes.',
    linkText: 'EXPLORE ARCHITECTURE',
    linkHref: '/story',
  },
  {
    image: '/images/weddings/kerala-courtyard-planter.jpg',
    alt: 'Heritage Kerala courtyard with stone tulasi planter',
    eyebrow: 'SACRED COURTYARDS',
    title: 'Open Sky Sanctuary',
    description:
      'Centered around the timeless Nadumuttam courtyard, where sunlight and tropical rain bring nature directly into living celebrations.',
    linkText: 'DISCOVER COURTYARDS',
    linkHref: '/story',
  },
  {
    image: '/images/weddings/stage-heritage-mandapam.jpg',
    alt: 'Traditional Kerala heritage wedding mandapam with floral decor and brass lamps',
    eyebrow: 'SACRED CELEBRATIONS',
    title: 'Cherished Beginnings',
    description:
      'A luminous setting for destination weddings and family rituals, celebrating sacred beginnings with unmatched grace and hospitality.',
    linkText: 'VIEW CELEBRATIONS',
    linkHref: '/celebrations',
  },
];

export interface StoryOfIdanazhiProps {
  className?: string;
}

export function StoryOfIdanazhi({ className = '' }: StoryOfIdanazhiProps) {
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.story-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet: 1st card comes down to up, then 2nd, then 3rd
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          cards,
          {
            y: 110,
            opacity: 0,
            filter: 'blur(8px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            stagger: 0.35,
            scrollTrigger: {
              trigger: container,
              start: 'top bottom-=10%',
              end: 'bottom 75%',
              scrub: 1.2,
            },
          }
        );
      });

      // Mobile: each card rises from down to up as you scroll to it
      mm.add('(max-width: 767px)', () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 70,
              opacity: 0,
              filter: 'blur(6px)',
            },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom-=5%',
                end: 'top 55%',
                scrub: 1,
              },
            }
          );
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      className={`relative bg-paper pt-0 pb-[clamp(60px,8vh,135px)] px-4 sm:px-[5.4vw] max-[720px]:pt-0 max-[720px]:pb-[48px] overflow-hidden ${className}`}
      aria-labelledby="story-of-idanazhi-heading"
    >
      <div className="w-full max-w-[1480px] mx-auto text-center flex flex-col items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="flex flex-col items-center justify-center text-center w-full"
        >
          {/* Eyebrow Label */}
          <motion.p
            variants={fadeUpVariants}
            className="m-0 mb-3 sm:mb-5 uppercase tracking-[0.22em] text-[10px] sm:text-[11.5px] font-semibold text-muted text-center"
          >
            THE STORY OF IDANAZHI
          </motion.p>

          {/* Symmetrical Hexagon Structured Statement */}
          <div className="w-full flex justify-center items-center text-center">
            <ScrollReveal
              as="h2"
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              textClassName="!font-jakarta !font-normal !text-[clamp(16px,2.4vw,38px)] max-[480px]:!text-[15px] !leading-[1.38] !tracking-[-0.015em] !uppercase !text-ink text-center w-full mx-auto"
              rotationEnd="bottom 65%"
              wordAnimationEnd="bottom 50%"
            >
              {`IDANAZHI IS A FARM STAY AND HERITAGE DESTINATION IN KERALA,
CREATED TO BRING PEOPLE CLOSER TO THE REGION'S LANDSCAPES,
RURAL LIFE, AND CULTURAL TRADITIONS.
FROM EXPERIENCING FARMING TO DISCOVERING LOCAL CUSTOMS,
IDANAZHI OFFERS A CLOSER LOOK AT THE EVERYDAY LIFE.`}
            </ScrollReveal>
          </div>

          {/* Minimal Text CTA directly below */}
          <motion.div
            variants={fadeUpVariants}
            className="flex justify-center mt-6 sm:mt-10"
          >
            <Link
              href="/story"
              className="luxury-cta focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
              aria-label="Discover Our Story - Read more about Idanazhi heritage"
            >
              <span className="cta-text">
                Discover Our Full Story
              </span>
              <ArrowUpRight
                size={15}
                className="cta-arrow"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Three Story Cards with Sequential Down-to-Up Scroll Reveal */}
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full max-w-[1280px] mx-auto mt-10 sm:mt-16 md:mt-20 text-left"
          >
            {storyCards.map((card, idx) => (
              <article
                key={`story-card-${idx}`}
                className="story-card group flex flex-col bg-linen/50 border border-ink/15 overflow-hidden transition-[border-color,box-shadow] duration-500 ease-out hover:border-ink/35 hover:shadow-xl will-change-transform"
              >
                {/* Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-linen">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-7 flex flex-col flex-1 justify-between bg-paper/60 backdrop-blur-[2px]">
                  <div>
                    <p className="m-0 mb-2 text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] font-semibold text-muted">
                      {card.eyebrow}
                    </p>
                    <h3 className="font-serif text-[20px] sm:text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-ink m-0 mb-2.5 group-hover:text-forest transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="m-0 text-[13px] sm:text-[13.5px] leading-[1.65] text-muted font-sans font-light">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 sm:mt-6 sm:pt-4 border-t border-ink/12">
                    <Link
                      href={card.linkHref}
                      className="card-cta focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[3px]"
                      aria-label={`${card.linkText} - ${card.title}`}
                    >
                      <span className="cta-text">
                        {card.linkText}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="cta-arrow"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
