'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

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

export interface StoryOfIdanazhiProps {
  className?: string;
}

export function StoryOfIdanazhi({ className = '' }: StoryOfIdanazhiProps) {
  return (
    <section
      id="story"
      className={`relative bg-paper py-[clamp(72px,10vh,135px)] px-[5.4vw] max-[720px]:px-6 max-[720px]:py-[60px] overflow-hidden ${className}`}
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
            className="m-0 mb-4 sm:mb-5 uppercase tracking-[0.22em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-center"
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
              textClassName="!font-jakarta !font-normal !text-[clamp(20px,2.5vw,38px)] !leading-[1.36] !tracking-[-0.015em] !uppercase !text-ink text-center w-full mx-auto"
              rotationEnd="bottom 65%"
              wordAnimationEnd="bottom 50%"
            >
{`A HERITAGE THAT BRINGS US TOGETHER,
SHAPED BY THE BEAUTY OF TRADITIONAL ARCHITECTURE,
WHERE SACRED TRADITIONS MEET THE WARMTH OF SHARED MOMENTS,
CRAFTED AS A DISTINCTIVE TIMELESS SETTING
FOR MEANINGFUL EXPERIENCES.`}
            </ScrollReveal>
          </div>

          {/* Minimal Text CTA directly below */}
          <motion.div
            variants={fadeUpVariants}
            className="flex justify-center mt-8 sm:mt-10"
          >
            <Link
              href="/singapore/#story"
              className="group inline-flex items-center gap-2 text-[13.5px] sm:text-[14px] font-sans tracking-[0.05em] uppercase text-ink focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
              aria-label="Discover Our Story - Read more about Idanazhi heritage"
            >
              <span className="relative pb-1 transition-colors duration-300 ease-out group-hover:text-forest">
                Discover Our Story
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-ink/30 transition-colors duration-300" />
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-forest origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </span>
              <ArrowUpRight
                size={15}
                className="text-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-forest group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
