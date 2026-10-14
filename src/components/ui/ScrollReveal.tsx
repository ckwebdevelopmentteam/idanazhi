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
  wordAnimationStart = 'top bottom-=15%',
  wordAnimationEnd = 'bottom bottom',
  stagger = 0.05,
  transformOrigin = '50% 50%',
  as: Component = 'h2',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const isStringChildren = typeof children === 'string';

  const splitText = useMemo(() => {
    if (!isStringChildren) return null;
    const text = children as string;
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
  }, [children, isStringChildren]);

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
      if (wordElements.length === 0) return;

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity, filter' },
        {
          ease: 'none',
          opacity: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: wordAnimationStart,
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
            stagger: stagger,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: wordAnimationStart,
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
    wordAnimationStart,
    wordAnimationEnd,
    stagger,
    blurStrength,
    transformOrigin,
  ]);

  return (
    <Component
      ref={containerRef}
      className={`scroll-reveal ${isStringChildren ? 'text-center mx-auto' : ''} ${containerClassName}`}
    >
      {isStringChildren ? (
        <p className={`scroll-reveal-text text-center mx-auto ${textClassName}`}>{splitText}</p>
      ) : (
        children
      )}
    </Component>
  );
};

export default ScrollReveal;
