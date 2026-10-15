'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import ScrollReveal from '@/components/ui/ScrollReveal';
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
  const headingText = data.heading.includes('\n')
    ? data.heading
    : data.heading.replace(/\s+(meaningful\s+moments)/i, '\n$1');

  const descLines = React.useMemo(() => {
    if (!data.description) return [];
    if (data.description.includes('\n')) return data.description.split('\n');
    const parts = data.description.match(
      /^(.*?character,)\s*(.*?together)\s*(and.*)$/i
    );
    if (parts) {
      return [parts[1], parts[2], parts[3]];
    }
    const words = data.description.split(' ');
    const third = Math.ceil(words.length / 3);
    return [
      words.slice(0, third).join(' '),
      words.slice(third, third * 2).join(' '),
      words.slice(third * 2).join(' '),
    ];
  }, [data.description]);

  const cardsCount = data.cards.length;
  // 3 sets of cards for seamless infinite looping: [cloneBefore, original, cloneAfter]
  const extendedCards = [...data.cards, ...data.cards, ...data.cards];

  const [activeCard, setActiveCard] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(cardsCount);
  const cardStepRef = useRef(320);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const timerRef = useRef<gsap.core.Tween | null>(null);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const startXRef = useRef(0);
  const dragStartTrackXRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const velocityRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Compute card step width (card width + gap)
  const measureStep = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth <= 720;
      const gap = isMobile ? 16 : 22;
      const step = rect.width + gap;
      cardStepRef.current = step;
      return step;
    }
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    if (w <= 720) return w - 48 - 24 + 16;
    if (w <= 980) return (w * 0.892 - 24) / 2 + 22;
    return (w * 0.892 - 66) / 4 + 22;
  }, []);

  // Smooth slide to index with GSAP
  const slideTo = useCallback(
    (targetIndex: number, duration = 1.15, ease = 'power2.inOut') => {
      const track = trackRef.current;
      if (!track) return;

      const step = cardStepRef.current || measureStep();
      const targetX = -(targetIndex * step);

      if (tweenRef.current) tweenRef.current.kill();

      const normCard = ((targetIndex % cardsCount) + cardsCount) % cardsCount;
      setActiveCard(normCard);

      tweenRef.current = gsap.to(track, {
        x: targetX,
        duration,
        ease,
        overwrite: 'auto',
        onComplete: () => {
          let finalIndex = targetIndex;
          // Flawless infinite loop wrap check
          if (finalIndex >= cardsCount * 2) {
            finalIndex = finalIndex - cardsCount;
            gsap.set(track, { x: -(finalIndex * step) });
          } else if (finalIndex < cardsCount) {
            finalIndex = finalIndex + cardsCount;
            gsap.set(track, { x: -(finalIndex * step) });
          }
          currentIndexRef.current = finalIndex;
          setActiveCard(((finalIndex % cardsCount) + cardsCount) % cardsCount);

          scheduleNext();
        },
      });

      currentIndexRef.current = targetIndex;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardsCount, measureStep]
  );

  // Schedule next auto scroll advance using GSAP delayedCall
  const scheduleNext = useCallback(() => {
    if (timerRef.current) timerRef.current.kill();
    if (isPausedRef.current || isDraggingRef.current) return;

    timerRef.current = gsap.delayedCall(2.0, () => {
      if (isPausedRef.current || isDraggingRef.current) return;
      slideTo(currentIndexRef.current + 1, 1.15, 'power2.inOut');
    });
  }, [slideTo]);

  // Initial position and resize observer
  useEffect(() => {
    const step = measureStep();
    cardStepRef.current = step;

    if (trackRef.current) {
      gsap.set(trackRef.current, { x: -(cardsCount * step) });
    }

    scheduleNext();

    const handleResize = () => {
      const newStep = measureStep();
      cardStepRef.current = newStep;
      if (trackRef.current && !isDraggingRef.current) {
        gsap.set(trackRef.current, { x: -(currentIndexRef.current * newStep) });
      }
    };

    window.addEventListener('resize', handleResize);
    const el = cardRef.current;
    const ro = el ? new ResizeObserver(handleResize) : null;
    if (el && ro) ro.observe(el);

    return () => {
      if (timerRef.current) timerRef.current.kill();
      if (tweenRef.current) tweenRef.current.kill();
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, [cardsCount, measureStep, scheduleNext]);

  // Pointer / Drag gesture handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (timerRef.current) timerRef.current.kill();
    if (tweenRef.current) tweenRef.current.kill();

    const track = trackRef.current;
    const step = cardStepRef.current || 320;
    const currentX = track
      ? (gsap.getProperty(track, 'x') as number) || -(currentIndexRef.current * step)
      : -(currentIndexRef.current * step);

    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    dragStartTrackXRef.current = currentX;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;
    hasDraggedRef.current = false;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    velocityRef.current = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
    }

    gsap.set(trackRef.current, { x: dragStartTrackXRef.current + deltaX });

    const step = cardStepRef.current || 320;
    const approxIndex = Math.round(-(dragStartTrackXRef.current + deltaX) / step);
    const norm = ((approxIndex % cardsCount) + cardsCount) % cardsCount;
    setActiveCard(norm);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // fallback
    }

    const track = trackRef.current;
    const step = cardStepRef.current || 320;
    const currentX = track
      ? (gsap.getProperty(track, 'x') as number) || -(currentIndexRef.current * step)
      : -(currentIndexRef.current * step);

    const fractionalIndex = -currentX / step;
    let targetIndex = Math.round(fractionalIndex);

    if (velocityRef.current < -3) {
      targetIndex = Math.ceil(fractionalIndex);
    } else if (velocityRef.current > 3) {
      targetIndex = Math.floor(fractionalIndex);
    }

    slideTo(targetIndex, 0.85, 'power2.out');

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    if (timerRef.current) timerRef.current.pause();
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    if (!isDraggingRef.current) {
      if (timerRef.current && timerRef.current.paused()) {
        timerRef.current.resume();
      } else {
        scheduleNext();
      }
    }
  };

  const isDefaultHeading =
    !data.heading ||
    data.heading.toLowerCase().includes('meaningful moments');

  const headingContent = isDefaultHeading ? (
    <span className="block !font-jakarta !font-normal !text-[clamp(20px,2.5vw,38px)] !leading-[1.36] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto sm:whitespace-nowrap">
      <span className="word">A</span>{' '}
      <span className="word">TIMELESS</span>{' '}
      <span className="word">SETTING</span>{' '}
      <span className="word">FOR</span>{' '}
      <span className="word">YOUR</span>
      <br className="sm:hidden" />
      {' '}
      <span className="word">MOST</span>
      <br className="hidden sm:block" />
      {' '}
      <span className="word">MEANINGFUL</span>
      <br className="sm:hidden" />
      {' '}
      <span className="word">MOMENTS</span>
    </span>
  ) : (
    headingText
  );

  return (
    <section
      id="weddings"
      className={`relative bg-paper py-[clamp(64px,8.5vh,110px)] max-[720px]:py-[50px] overflow-hidden ${className}`}
      aria-labelledby="wedding-intro-heading"
    >
      <div className="w-full flex flex-col items-center">
        {/* Section Header: Centered Eyebrow, Heading, Description & CTA */}
        <div className="flex flex-col items-center text-center max-w-[940px] mx-auto px-6 mb-12 sm:mb-16 md:mb-20 min-[1280px]:mb-24 shrink-0">
          {data.eyebrow && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariants}
              className="m-0 mb-3 sm:mb-4 uppercase tracking-[0.22em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-center"
            >
              {data.eyebrow}
            </motion.p>
          )}

          {/* Symmetrical Scroll Reveal Heading matching Story of Idanazhi */}
          <div className="w-full flex justify-center items-center text-center">
            <ScrollReveal
              as="h2"
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              textClassName="!font-jakarta !font-normal !text-[clamp(20px,2.5vw,38px)] !leading-[1.36] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
              wordAnimationStart="top 85%"
              wordAnimationEnd="bottom 55%"
            >
              {headingContent}
            </ScrollReveal>
          </div>

          {data.description && (
            <div className="w-full flex justify-center items-center text-center mt-3.5 sm:mt-5">
              <ScrollReveal
                as="p"
                baseOpacity={0.12}
                enableBlur={true}
                baseRotation={0}
                blurStrength={5}
                containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
                wordAnimationStart="top 53%"
                wordAnimationEnd="bottom 28%"
              >
                <span className="block !font-sans !font-normal !text-[clamp(15px,1.05vw,17px)] !leading-[1.75] !text-muted text-center max-w-[840px] mx-auto">
                  {descLines.map((line, lineIdx) => {
                    const words = line.trim().split(/\s+/);
                    return (
                      <React.Fragment key={lineIdx}>
                        <span className="sm:block sm:whitespace-nowrap">
                          {words.map((word, wordIdx) => (
                            <React.Fragment key={wordIdx}>
                              <span className="word">{word}</span>
                              {wordIdx < words.length - 1 && ' '}
                            </React.Fragment>
                          ))}
                        </span>
                        {lineIdx < descLines.length - 1 && ' '}
                      </React.Fragment>
                    );
                  })}
                </span>
              </ScrollReveal>
            </div>
          )}

          {data.ctaText && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={ctaVariants}
              className="mt-6 sm:mt-8"
            >
              <Link
                href={data.ctaHref}
                className="group inline-flex items-center gap-2 text-[13.5px] sm:text-[14px] font-sans tracking-[0.05em] uppercase text-ink focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
                aria-label={`${data.ctaText} - View wedding celebrations and offerings`}
              >
                <span className="relative pb-1 transition-colors duration-300 ease-out group-hover:text-forest">
                  {data.ctaText}
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
          )}
        </div>

        {/* Carousel Viewport Container with Drag & Touch Support */}
        <div
          className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            ref={trackRef}
            className="flex gap-[22px] pl-[5.4vw] pr-[5.4vw] max-[720px]:gap-4 max-[720px]:pl-6 max-[720px]:pr-6 w-max will-change-transform"
          >
            {extendedCards.map((card: WeddingCard, index: number) => {
              const isReferenceCard = index === 0;

              if (card.type === 'editorial') {
                return (
                  <article
                    key={`wedding-card-${index}`}
                    ref={isReferenceCard ? cardRef : undefined}
                    className="relative flex flex-col bg-linen border border-ink/14 p-[clamp(24px,2vw,36px)_clamp(20px,1.8vw,28px)] justify-between shrink-0 w-[calc((100vw-10.8vw-66px)/4)] aspect-[4/5] box-border transition-[border-color,box-shadow] duration-300 ease-in-out hover:border-ink/32 hover:shadow-lg max-[980px]:w-[calc((100vw-10.8vw-22px)/2)] max-[720px]:w-[calc(100vw-48px-24px)] max-[720px]:max-w-[340px] max-[720px]:aspect-[4/4.8] max-[720px]:p-[28px_20px]"
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
                        onClick={(e) => {
                          if (hasDraggedRef.current) {
                            e.preventDefault();
                          }
                        }}
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
                  </article>
                );
              }

              return (
                <article
                  key={`wedding-card-${index}`}
                  ref={isReferenceCard ? cardRef : undefined}
                  className="relative flex flex-col bg-linen group hover:shadow-xl transition-shadow duration-300 shrink-0 w-[calc((100vw-10.8vw-66px)/4)] aspect-[4/5] overflow-hidden max-[980px]:w-[calc((100vw-10.8vw-22px)/2)] max-[720px]:w-[calc(100vw-48px-24px)] max-[720px]:max-w-[340px] max-[720px]:aspect-[4/4.8]"
                >
                  <div className="relative w-full h-full overflow-hidden bg-linen">
                    <img
                      src={card.image}
                      alt={card.alt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.038] pointer-events-none"
                    />
                    {card.overlayLabel && (
                      <div className="absolute inset-0 flex items-end p-[24px_22px] bg-gradient-to-b from-transparent via-transparent to-[rgba(14,32,28,0.72)] pointer-events-none">
                        <span className="text-white font-sans text-[11px] font-semibold tracking-[0.16em] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                          {card.overlayLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Centered Slider Indicator */}
        <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
          <span className="font-mono text-[11px] tracking-[0.16em] text-ink font-semibold">
            {String(activeCard + 1).padStart(2, '0')}
          </span>
          <div className="w-28 sm:w-40 h-[2px] bg-ink/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-ink transition-all duration-500 ease-out"
              style={{
                width: `${((activeCard + 1) / cardsCount) * 100}%`,
              }}
            />
          </div>
          <span className="font-mono text-[11px] tracking-[0.16em] text-muted font-medium">
            {String(cardsCount).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
