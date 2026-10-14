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
  wordAnimationEnd?: string;
  transformOrigin?: string;
  as?: React.ElementType;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  transformOrigin = '50% 50%',
  as: Component = 'h2',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    const lines = text
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    return lines.map((line, lineIdx) => {
      const words = line.split(/(\s+)/).map((word, wordIdx) => {
        if (word.match(/^\s+$/)) return word;
        return (
          <span className="word" key={`w-${lineIdx}-${wordIdx}`}>
            {word}
          </span>
        );
      });

      return (
        <span
          key={`line-${lineIdx}`}
          className="block w-full text-center sm:whitespace-nowrap mx-auto"
        >
          {words}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const ctx = gsap.context(() => {
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
              scrub: true,
            },
          }
        );
      }

      const wordElements = el.querySelectorAll('.word');

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity, filter' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=15%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=15%',
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    transformOrigin,
  ]);

  return (
    <Component
      ref={containerRef}
      className={`scroll-reveal text-center mx-auto ${containerClassName}`}
    >
      <p className={`scroll-reveal-text text-center mx-auto ${textClassName}`}>{splitText}</p>
    </Component>
  );
};

export default ScrollReveal;
