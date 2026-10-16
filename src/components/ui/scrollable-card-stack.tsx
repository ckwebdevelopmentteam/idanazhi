"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_TIMEOUT_OFFSET = 100;
const MIN_SCROLL_INTERVAL = 300;
const SCROLL_THRESHOLD = 20;
const TOUCH_SCROLL_THRESHOLD = 80;
const SCALE_FACTOR = 0.08;
const MIN_SCALE = 0.08;
const MAX_SCALE = 2;
const HOVER_SCALE_MULTIPLIER = 1.02;
const CARD_PADDING = 100;
const FRAME_OFFSET = -30;
const FRAMES_VISIBLE_LENGTH = 3;
const SNAP_DISTANCE = 50;

export interface CardItem {
  avatar: string;
  handle: string;
  href: string;
  id: string;
  image: string;
  name: string;
  tag?: string;
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
}

export interface ScrollableCardStackProps {
  cardHeight?: number;
  className?: string;
  items: CardItem[];
  perspective?: number;
  transitionDuration?: number;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  showIndicators?: boolean;
}

export const ScrollableCardStack: React.FC<ScrollableCardStackProps> = ({
  items,
  cardHeight = 360,
  perspective = 1100,
  transitionDuration = 220,
  className,
  currentIndex: externalIndex,
  onIndexChange,
  autoPlay = true,
  autoPlayInterval = 2000,
  pauseOnHover = true,
  loop = true,
  showIndicators = true,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const lastScrollTime = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Calculate the total number of items
  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - 1);

  // Clamp function - memoized
  const clamp = useCallback(
    (val: number, [min, max]: [number, number]): number =>
      Math.min(Math.max(val, min), max),
    [],
  );

  // Helper to change index safely
  const changeIndex = useCallback(
    (newIndex: number) => {
      if (newIndex !== currentIndex) {
        if (!isControlled) {
          setInternalIndex(newIndex);
        }
        onIndexChange?.(newIndex);
        scrollY.set(newIndex * SNAP_DISTANCE);
      }
    },
    [currentIndex, isControlled, onIndexChange, scrollY],
  );

  // Controlled scroll function to move exactly one card
  const scrollToCard = useCallback(
    (direction: 1 | -1) => {
      if (isScrolling || totalItems <= 1) {
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      if (timeSinceLastScroll < MIN_SCROLL_INTERVAL) {
        return;
      }

      let newIndex: number;
      if (loop) {
        newIndex =
          direction > 0
            ? (currentIndex + 1) % totalItems
            : (currentIndex - 1 + totalItems) % totalItems;
      } else {
        newIndex = clamp(currentIndex + direction, [0, maxIndex]);
      }

      if (newIndex !== currentIndex) {
        lastScrollTime.current = now;
        setIsScrolling(true);
        changeIndex(newIndex);

        setTimeout(() => {
          setIsScrolling(false);
        }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
      }
    },
    [
      isScrolling,
      totalItems,
      loop,
      currentIndex,
      maxIndex,
      clamp,
      changeIndex,
      transitionDuration,
    ],
  );

  // Auto-play timer with 2 second interval (configurable)
  useEffect(() => {
    if (!autoPlay || totalItems <= 1) {
      return;
    }

    if (pauseOnHover && isContainerHovered) {
      return;
    }

    if (isDragging) {
      return;
    }

    const timer = setInterval(() => {
      const nextIdx = loop
        ? (currentIndex + 1) % totalItems
        : clamp(currentIndex + 1, [0, maxIndex]);
      changeIndex(nextIdx);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [
    autoPlay,
    autoPlayInterval,
    pauseOnHover,
    isContainerHovered,
    isDragging,
    totalItems,
    loop,
    currentIndex,
    maxIndex,
    clamp,
    changeIndex,
  ]);

  // Handle scroll events with improved responsiveness
  const handleScroll = useCallback(
    (deltaY: number) => {
      if (isDragging || isScrolling) {
        return;
      }

      if (Math.abs(deltaY) < SCROLL_THRESHOLD) {
        return;
      }

      const scrollDirection = deltaY > 0 ? 1 : -1;
      scrollToCard(scrollDirection);
    },
    [isDragging, isScrolling, scrollToCard],
  );

  // Handle wheel events
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    },
    [handleScroll],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isScrolling) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft": {
          e.preventDefault();
          scrollToCard(-1);
          break;
        }
        case "ArrowDown":
        case "ArrowRight": {
          e.preventDefault();
          scrollToCard(1);
          break;
        }
        case "Home": {
          e.preventDefault();
          if (currentIndex !== 0) {
            setIsScrolling(true);
            changeIndex(0);
            setTimeout(() => {
              setIsScrolling(false);
            }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
          }
          break;
        }
        case "End": {
          e.preventDefault();
          if (currentIndex !== maxIndex) {
            setIsScrolling(true);
            changeIndex(maxIndex);
            setTimeout(() => {
              setIsScrolling(false);
            }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
          }
          break;
        }
        default: {
          break;
        }
      }
    },
    [
      isScrolling,
      currentIndex,
      maxIndex,
      scrollToCard,
      changeIndex,
      transitionDuration,
    ],
  );

  // Handle touch events for mobile
  const touchStartY = useRef(0);
  const touchMoved = useRef(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchMoved.current = false;
      setIsDragging(true);
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || isScrolling) {
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      if (Math.abs(deltaY) > TOUCH_SCROLL_THRESHOLD && !touchMoved.current) {
        const scrollDirection = deltaY > 0 ? 1 : -1;
        scrollToCard(scrollDirection);
        touchMoved.current = true;
      }
    },
    [isDragging, isScrolling, scrollToCard],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchMoved.current = false;
  }, []);

  // Set up wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // Snap to current index when not dragging
  useEffect(() => {
    if (!isDragging) {
      scrollY.set(currentIndex * SNAP_DISTANCE);
    }
  }, [currentIndex, isDragging, scrollY]);

  // Calculate transform for each card
  const getCardTransform = useCallback(
    (index: number) => {
      const offsetIndex = index - currentIndex;

      // Blur for cards behind current
      const isBehindCurrent = currentIndex > index;
      const blur = !shouldReduceMotion && isBehindCurrent ? 2 : 0;

      // Opacity based on position
      const opacity = currentIndex > index ? 0 : 1;

      // Scale
      const scale = shouldReduceMotion
        ? 1
        : clamp(1 - offsetIndex * SCALE_FACTOR, [MIN_SCALE, MAX_SCALE]);

      // Vertical offset
      const y = shouldReduceMotion
        ? 0
        : clamp(offsetIndex * FRAME_OFFSET, [
            FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
            Number.POSITIVE_INFINITY,
          ]);

      // Z-index for proper layering
      const zIndex = items.length - index;

      return {
        blur,
        opacity,
        scale,
        y,
        zIndex,
      };
    },
    [currentIndex, items.length, clamp, shouldReduceMotion],
  );

  const cardWidth = Math.min(520, Math.round(cardHeight * 1.52));

  return (
    <section
      aria-atomic="true"
      aria-label="Scrollable card stack"
      aria-live="polite"
      className={cn("relative mx-auto h-fit w-full max-w-[560px]", className)}
      onMouseEnter={() => setIsContainerHovered(true)}
      onMouseLeave={() => {
        setIsContainerHovered(false);
        setHoveredIndex(null);
      }}
    >
      {/* Scrollable card container */}
      <div
        aria-label="Scrollable card container"
        className="relative h-full w-full outline-none"
        onKeyDown={handleKeyDown}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={containerRef}
        role="application"
        style={{
          minHeight: `${cardHeight + CARD_PADDING}px`,
          perspective: `${perspective}px`,
          perspectiveOrigin: "center 60%",
          touchAction: "none",
        }}
        tabIndex={0}
      >
        {items.map((item, i) => {
          const transform = getCardTransform(i);
          const isActive = i === currentIndex;
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              animate={
                shouldReduceMotion
                  ? { x: "-50%" }
                  : {
                      scale: transform.scale,
                      x: "-50%",
                      y: `calc(-50% + ${transform.y}px)`,
                    }
              }
              aria-hidden={!isActive}
              className="absolute top-1/2 left-1/2 overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl transition-shadow duration-300"
              data-active={isActive}
              initial={false}
              key={`scrollable-card-${item.id}`}
              onBlur={() => setHoveredIndex(null)}
              onFocus={() => isActive && setHoveredIndex(i)}
              onMouseEnter={() => isActive && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                borderWidth: `${Math.max(1, 2 / transform.scale)}px`,
                filter: `blur(${transform.blur}px)`,
                height: `${cardHeight}px`,
                width: `min(90vw, ${cardWidth}px)`,
                opacity: transform.opacity,
                pointerEvents: isActive ? "auto" : "none",
                transformOrigin: "center center",
                transitionDuration: shouldReduceMotion ? "0ms" : "220ms",
                transitionProperty: shouldReduceMotion
                  ? "none"
                  : "opacity, filter",
                transitionTimingFunction:
                  "cubic-bezier(0.645, 0.045, 0.355, 1)",
                willChange: shouldReduceMotion
                  ? undefined
                  : "opacity, filter, transform",
                zIndex: transform.zIndex,
              }}
              tabIndex={isActive ? 0 : -1}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      damping: 22,
                      duration: 0.28,
                      mass: 0.5,
                      stiffness: 260,
                      type: "spring" as const,
                    }
              }
              whileHover={
                shouldReduceMotion || !isActive
                  ? {}
                  : {
                      scale: transform.scale * HOVER_SCALE_MULTIPLIER,
                      transition: {
                        damping: 20,
                        duration: 0.25,
                        mass: 0.5,
                        stiffness: 250,
                        type: "spring" as const,
                      },
                    }
              }
            >
              {/* Card Content */}
              <div
                className={cn(
                  "relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-paper transition-all duration-300",
                  isHovered && "shadow-2xl",
                  isScrolling &&
                    isActive &&
                    "ring-2 ring-ink/40 ring-opacity-60",
                )}
              >
                {/* Scroll indicator bar */}
                {isScrolling && isActive ? (
                  <div className="absolute top-2 left-1/2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-ink/80 shadow-md" />
                ) : null}

                {/* Image Container */}
                <div className="relative w-full flex-1 overflow-hidden bg-linen/50">
                  {/* Subtle placeholder blur */}
                  <img
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 text-transparent"
                    decoding="async"
                    draggable={false}
                    height={10}
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                    style={{
                      filter: "blur(32px)",
                      pointerEvents: "none",
                      scale: "1.2",
                      zIndex: 1,
                    }}
                    width={10}
                  />

                  {/* Primary Card Image */}
                  <img
                    alt={item.title || `${item.name}'s card`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    decoding="async"
                    draggable={false}
                    height={cardHeight}
                    src={item.image}
                    style={{
                      pointerEvents: "none",
                      userSelect: "none",
                      zIndex: 2,
                    }}
                    width={cardWidth}
                  />

                  {/* Luxury gradient vignette */}
                  <div
                    className="absolute inset-0 z-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Badge over photo */}
                  {item.tag && (
                    <div className="absolute top-3.5 left-3.5 z-4 rounded-full bg-white/85 backdrop-blur-md px-3 py-1 shadow-sm border border-white/50">
                      <span className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-ink">
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Footer: User / Experience Info */}
                <a
                  aria-label={`View ${item.name}`}
                  className={cn(
                    "relative z-10 flex items-center justify-between border-t border-line/40 bg-white/95 px-4 py-3 text-decoration-none text-inherit backdrop-blur-md transition-colors duration-200 hover:bg-white",
                  )}
                  href={item.linkHref || item.href}
                  rel={
                    item.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      alt={`${item.name}'s avatar`}
                      className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full object-cover border border-line"
                      draggable={false}
                      height={24}
                      src={item.avatar}
                      width={24}
                    />
                    <div className="min-w-0 flex flex-col">
                      <span className="truncate font-serif font-medium text-ink text-[14px] leading-tight">
                        {item.name}
                      </span>
                      <span className="truncate font-sans font-normal text-muted text-[11px] leading-tight">
                        {item.handle}
                      </span>
                    </div>
                  </div>

                  <span className="flex-shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/75 hover:text-ink pl-2">
                    {item.linkText || "View →"}
                  </span>
                </a>
              </div>
            </motion.div>
          );
        })}

        {/* Navigation indicators (dots) */}
        {showIndicators && totalItems > 1 && (
          <div
            aria-label="Card navigation"
            className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2.5 z-20"
            role="tablist"
          >
            {Array.from({ length: totalItems }, (_, i) => (
              <motion.button
                aria-label={`Go to card ${i + 1} of ${totalItems}`}
                aria-selected={i === currentIndex}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-ink focus:ring-offset-1",
                  i === currentIndex
                    ? "w-6 bg-ink scale-100"
                    : "bg-ink/25 hover:bg-ink/50",
                )}
                key={`scrollable-indicator-${items[i]?.id || i}`}
                onClick={() => {
                  if (i !== currentIndex && !isScrolling) {
                    setIsScrolling(true);
                    changeIndex(i);
                    setTimeout(() => {
                      setIsScrolling(false);
                    }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
                  }
                }}
                role="tab"
                transition={{
                  damping: 20,
                  mass: 0.5,
                  stiffness: 250,
                  type: "spring" as const,
                }}
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        )}

        {/* Instructions for screen readers */}
        <div aria-live="polite" className="sr-only">
          {`Card ${currentIndex + 1} of ${totalItems} selected. Use arrow keys to navigate one card at a time, or click the dots below.`}
        </div>
      </div>
    </section>
  );
};

export default ScrollableCardStack;
