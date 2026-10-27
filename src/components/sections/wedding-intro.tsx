'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import {
  weddingIntroData,
  type WeddingSectionData,
  type WeddingCard,
} from '@/data/weddings';


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
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hoverRatio, setHoverRatio] = useState<number>(0);
  const [showNumberPicker, setShowNumberPicker] = useState<boolean>(false);

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

  // Jump to specific card index
  const jumpToCard = useCallback(
    (targetCardIdx: number) => {
      if (timerRef.current) timerRef.current.kill();
      const currentNorm = ((currentIndexRef.current % cardsCount) + cardsCount) % cardsCount;
      let diff = ((targetCardIdx - currentNorm + cardsCount) % cardsCount);
      if (diff > cardsCount / 2) diff -= cardsCount;
      const targetIndex = currentIndexRef.current + diff;
      slideTo(targetIndex, 0.75, 'power2.out');
    },
    [cardsCount, slideTo]
  );

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

  return (
    <section
      id="weddings"
      className={`relative bg-paper py-[clamp(54px,7.5vh,110px)] max-[720px]:py-[44px] overflow-hidden ${className}`}
      aria-labelledby="wedding-intro-heading"
    >
      <div className="w-full flex flex-col items-center">
        {/* Section Header: Centered Eyebrow, Heading, Description & CTA */}
        <div className="flex flex-col items-center text-center max-w-[940px] mx-auto px-4 sm:px-6 mb-8 sm:mb-16 md:mb-20 min-[1280px]:mb-24 shrink-0">
          {data.eyebrow && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariants}
              className="m-0 mb-2.5 sm:mb-4 uppercase tracking-[0.22em] text-[10px] sm:text-[11.5px] font-semibold text-muted text-center"
            >
              {data.eyebrow}
            </motion.p>
          )}

          {/* Symmetrical Heading */}
          <div className="w-full flex justify-center items-center text-center">
            <motion.h2
              id="wedding-intro-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUpVariants}
              className="font-jakarta font-normal text-[clamp(18px,2.5vw,38px)] leading-[1.32] tracking-[-0.02em] uppercase text-ink text-center max-w-[940px] mx-auto m-0"
            >
              {data.heading}
            </motion.h2>
          </div>

          {data.description && (
            <div className="w-full flex justify-center items-center text-center mt-3 sm:mt-5">
              <ScrollReveal
                as="p"
                baseOpacity={0.15}
                enableBlur={true}
                blurStrength={4}
                stagger={0.022}
                containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              >
                <span className="block !font-sans !font-normal !text-[clamp(14.5px,1.05vw,17px)] !leading-[1.7] !text-muted text-center max-w-[840px] mx-auto">
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
              className="mt-5 sm:mt-8"
            >
              <Link
                href={data.ctaHref}
                className="luxury-cta focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
                aria-label={`${data.ctaText} - View wedding celebrations and offerings`}
              >
                <span className="cta-text">
                  {data.ctaText}
                </span>
                <ArrowUpRight
                  size={15}
                  className="cta-arrow"
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
                        className="card-cta focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[3px]"
                        aria-label={`${card.linkText} - Discover wedding celebrations`}
                      >
                        <span className="cta-text">{card.linkText}</span>
                        <ArrowUpRight
                          className="cta-arrow"
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

        {/* Centered Slider Indicator with Hover Scrub & Number Selection */}
        <div className="relative flex items-center justify-center gap-3 mt-6 sm:mt-8">
          {/* Number Selector Popover to select card by number */}
          <AnimatePresence>
            {showNumberPicker && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-[#fbfaf7] text-ink border border-ink/20 shadow-2xl rounded-[6px] p-1.5 flex items-center gap-1 z-50 whitespace-nowrap"
              >
                <span className="text-[10px] uppercase font-mono text-muted tracking-wider px-1.5">
                  Card:
                </span>
                {data.cards.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      jumpToCard(idx);
                      setShowNumberPicker(false);
                    }}
                    onMouseEnter={() => jumpToCard(idx)}
                    className={cn(
                      "w-7 h-7 rounded-[3px] font-mono text-[11px] font-medium transition-colors flex items-center justify-center cursor-pointer",
                      activeCard === idx
                        ? "bg-ink text-white font-semibold shadow-sm"
                        : "text-ink/70 hover:bg-ink/10 hover:text-ink"
                    )}
                    title={c.type === 'photo' ? c.overlayLabel : c.eyebrow}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Number Button: Click to select card by number */}
          <button
            type="button"
            onClick={() => setShowNumberPicker((v) => !v)}
            title="Click to select card by number"
            className="font-mono text-[11px] tracking-[0.16em] text-ink font-semibold tabular-nums cursor-pointer transition-all hover:scale-110 hover:text-forest"
          >
            {String((hoveredCardIndex !== null ? hoveredCardIndex : activeCard) + 1).padStart(2, '0')}
          </button>

          {/* Interactive Progress Line: hover along the line to scrub/get the card, click to select */}
          <div
            role="slider"
            aria-valuemin={1}
            aria-valuemax={cardsCount}
            aria-valuenow={activeCard + 1}
            tabIndex={0}
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              if (!rect.width) return;
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const targetIdx = Math.min(cardsCount - 1, Math.floor(ratio * cardsCount));
              setHoverRatio(ratio);
              setHoveredCardIndex(targetIdx);
              jumpToCard(targetIdx);
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              if (!rect.width) return;
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const targetIdx = Math.min(cardsCount - 1, Math.floor(ratio * cardsCount));
              setHoverRatio(ratio);
              setHoveredCardIndex(targetIdx);
              jumpToCard(targetIdx);
            }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              if (!rect.width) return;
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const targetIdx = Math.min(cardsCount - 1, Math.floor(ratio * cardsCount));
              setHoverRatio(ratio);
              setHoveredCardIndex(targetIdx);
              jumpToCard(targetIdx);
            }}
            onPointerLeave={() => {
              setHoveredCardIndex(null);
              scheduleNext();
            }}
            onMouseLeave={() => {
              setHoveredCardIndex(null);
              scheduleNext();
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              if (!rect.width) return;
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const targetIdx = Math.min(cardsCount - 1, Math.floor(ratio * cardsCount));
              jumpToCard(targetIdx);
            }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              if (!touch) return;
              const rect = e.currentTarget.getBoundingClientRect();
              if (!rect.width) return;
              const ratio = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
              const targetIdx = Math.min(cardsCount - 1, Math.floor(ratio * cardsCount));
              jumpToCard(targetIdx);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              if (!touch) return;
              const rect = e.currentTarget.getBoundingClientRect();
              if (!rect.width) return;
              const ratio = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
              const targetIdx = Math.min(cardsCount - 1, Math.floor(ratio * cardsCount));
              jumpToCard(targetIdx);
            }}
            className="relative py-2.5 -my-2.5 cursor-pointer flex items-center touch-pan-x"
          >
            {/* Floating Card Preview on Hovering the line */}
            <AnimatePresence>
              {hoveredCardIndex !== null && data.cards[hoveredCardIndex] && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-full mb-3 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center"
                  style={{ left: `${hoverRatio * 100}%` }}
                >
                  {(() => {
                    const hoveredCard = data.cards[hoveredCardIndex];
                    if (!hoveredCard) return null;
                    return (
                      <div className="bg-[#fbfaf7] text-ink border border-ink/20 shadow-2xl rounded-[4px] p-1.5 flex flex-col gap-1 w-36">
                        {hoveredCard.type === 'photo' ? (
                          <img
                            src={hoveredCard.image}
                            alt=""
                            className="w-full h-20 object-cover rounded-[2px]"
                          />
                        ) : (
                          <div className="w-full h-20 bg-paper-subtle rounded-[2px] p-2 flex items-center justify-center text-center text-[10px] text-muted">
                            {hoveredCard.eyebrow}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-[10px] font-mono font-semibold px-0.5 pt-0.5">
                          <span className="text-ink font-bold">#{String(hoveredCardIndex + 1).padStart(2, '0')}</span>
                          <span className="truncate text-[9.5px] font-sans font-normal text-muted max-w-[85px]">
                            {hoveredCard.type === 'photo'
                              ? hoveredCard.overlayLabel
                              : hoveredCard.eyebrow}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                  <div className="w-2 h-2 rotate-45 bg-[#fbfaf7] border-r border-b border-ink/20 -mt-1" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-28 sm:w-40 h-[2px] bg-ink/15 rounded-full overflow-hidden transition-all duration-200 hover:h-[3.5px]">
              <div
                className="h-full bg-ink rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${(((hoveredCardIndex !== null ? hoveredCardIndex : activeCard) + 1) / cardsCount) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Total Number Button: Click to jump directly to the last card */}
          <button
            type="button"
            onClick={() => jumpToCard(cardsCount - 1)}
            title={`Click to select card ${cardsCount}`}
            className="font-mono text-[11px] tracking-[0.16em] text-muted font-medium tabular-nums cursor-pointer transition-all hover:scale-110 hover:text-ink"
          >
            {String(cardsCount).padStart(2, '0')}
          </button>
        </div>
      </div>
    </section>
  );
}
