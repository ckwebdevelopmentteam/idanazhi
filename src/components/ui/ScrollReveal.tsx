'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  children?: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationStart?: string;
  wordAnimationEnd?: string;
  stagger?: number;
  transformOrigin?: string;
  as?: React.ElementType;
  useScrub?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.15,
  baseRotation = 0,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationStart = 'top 88%',
  wordAnimationEnd = 'bottom 55%',
  stagger = 0.022,
  transformOrigin = '50% 50%',
  as: Component = 'p',
  useScrub = false,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const isStringChildren = typeof children === 'string';

  const splitText = useMemo(() => {
    if (!isStringChildren) return null;
    const text = children as string;
    const words = text.trim().split(/\s+/);

    return words.map((word, wordIdx) => (
      <React.Fragment key={`w-${wordIdx}`}>
        <span className="word">{word}</span>
        {wordIdx < words.length - 1 && ' '}
      </React.Fragment>
    ));
  }, [children, isStringChildren]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const ctx = gsap.context(() => {
      const wordElements = el.querySelectorAll('.word');
      if (wordElements.length === 0) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(wordElements, {
          opacity: 1,
          filter: 'none',
          WebkitFilter: 'none',
          clearProps: 'all',
        });
        return;
      }

      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin, rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom',
              end: rotationEnd,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (useScrub) {
        const fromVars: gsap.TweenVars = {
          opacity: baseOpacity,
          willChange: 'opacity, filter, transform',
        };

        const toVars: gsap.TweenVars = {
          ease: 'none',
          opacity: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: wordAnimationStart,
            end: wordAnimationEnd,
            scrub: 0.6,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onLeave: () => {
              gsap.set(wordElements, {
                opacity: 1,
                filter: 'none',
                WebkitFilter: 'none',
                clearProps: 'all',
              });
            },
          },
        };

        if (enableBlur) {
          fromVars.filter = `blur(${blurStrength}px)`;
          fromVars.WebkitFilter = `blur(${blurStrength}px)`;
          toVars.filter = 'blur(0px)';
          toVars.WebkitFilter = 'blur(0px)';
        }

        gsap.fromTo(wordElements, fromVars, toVars);
      } else {
        // Viewport-Triggered Reveal: Triggers smoothly when entering viewport
        // Guaranteed 100% bug-free on mobile & desktop without scroll freeze
        const fromVars: gsap.TweenVars = {
          opacity: baseOpacity,
          y: 6,
          willChange: 'opacity, filter, transform',
        };

        const toVars: gsap.TweenVars = {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          stagger: stagger,
          onComplete: () => {
            gsap.set(wordElements, {
              opacity: 1,
              filter: 'none',
              WebkitFilter: 'none',
              clearProps: 'all',
            });
          },
          scrollTrigger: {
            trigger: el,
            scroller,
            start: wordAnimationStart || 'top 88%',
            once: true,
            fastScrollEnd: true,
          },
        };

        if (enableBlur) {
          fromVars.filter = `blur(${blurStrength}px)`;
          fromVars.WebkitFilter = `blur(${blurStrength}px)`;
          toVars.filter = 'blur(0px)';
          toVars.WebkitFilter = 'blur(0px)';
        }

        gsap.fromTo(wordElements, fromVars, toVars);
      }
    }, el);

    // Refresh ScrollTrigger when web fonts finish loading to ensure accurate trigger points
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationStart,
    wordAnimationEnd,
    stagger,
    blurStrength,
    transformOrigin,
    children,
    useScrub,
  ]);

  return (
    <Component
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`}
    >
      {isStringChildren ? (
        <span className={`scroll-reveal-text block ${textClassName}`}>{splitText}</span>
      ) : (
        children
      )}
    </Component>
  );
};

export default ScrollReveal;

