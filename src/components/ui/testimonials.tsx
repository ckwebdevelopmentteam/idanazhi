"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

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

export interface TestimonialItem {
  title: string;
  quote: string;
  author: string;
  role?: string;
  avatar: string;
  initials?: string;
  rating?: number;
}

export interface TestimonialsProps {
  eyebrow?: string;
  titleWords?: string[];
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  items?: TestimonialItem[];
  className?: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    title: "An Unforgettable Destination Wedding",
    quote:
      "Our wedding at Idanazhi was beyond anything we imagined. The ancestral courtyards, the gentle amber lighting, and the warm hospitality created an atmosphere our families still speak of with wonder.",
    author: "Aarav & Meera Kapoor",
    role: "Three-Day Wedding Celebration",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
    initials: "AM",
    rating: 5,
  },
  {
    title: "Soulful Heritage and Gracious Service",
    quote:
      "Every detail was attended to with effortless grace. From the morning dew on the verandas to the candlelit evening sangeet by the pool, Idanazhi felt like our personal private palace.",
    author: "Rohan & Priya Menon",
    role: "Courtyard Ceremony & Sangeet",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
    initials: "RP",
    rating: 5,
  },
  {
    title: "A Sanctuary of Pure Peace",
    quote:
      "We stayed in the Nalukettu Chamber for a post-wedding family retreat. The traditional architecture combined with discreet luxury gave us the most peaceful five days we've ever experienced.",
    author: "Ananya & Siddharth Nair",
    role: "Family Heritage Stay",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80",
    initials: "AS",
    rating: 5,
  },
  {
    title: "The Warmth of Idanazhi",
    quote:
      "What makes Idanazhi extraordinary is its authenticity. The traditional feasts, the teakwood carvings, and the heartfelt warmth of the staff made every single guest feel genuinely cherished.",
    author: "Dev & Sunita Nambiar",
    role: "Golden Anniversary Celebration",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
    initials: "DS",
    rating: 5,
  },
  {
    title: "Magical in Every Sense",
    quote:
      "The evening mandap setup under the starlit sky amidst the swaying coconut palms was sheer poetry. If you are looking for an intimate wedding with royal serenity, Idanazhi is unmatched.",
    author: "Kavya & Arjun Varma",
    role: "Sunset Wedding Rituals",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
    initials: "KA",
    rating: 5,
  },
  {
    title: "Timeless Memories with Loved Ones",
    quote:
      "From initial coordination to the final farewell breakfast on the lawn, the team was impeccable. Our guests traveled from four continents and all fell in love with this magical sanctuary.",
    author: "Vikram & Elena Rao",
    role: "Destination Wedding & Escape",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&h=160&q=80",
    initials: "VE",
    rating: 5,
  },
];

function Testimonials({
  eyebrow = "GUEST STORIES & REFLECTIONS",
  subtitle = "Memories and reflections from couples, families, and travelers who have experienced the warmth, heritage, and quiet luxury of Idanazhi.",
  ctaText = "EXPLORE GUEST EXPERIENCES",
  ctaHref = "#testimonials",
  items = defaultTestimonials,
  className = "",
}: TestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverRatio, setHoverRatio] = useState<number>(0);
  const [showNumberPicker, setShowNumberPicker] = useState<boolean>(false);

  const descLines = [
    "Memories and reflections from couples, families, and travelers who have experienced",
    "the warmth, heritage, and quiet luxury of Idanazhi.",
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <section
      id="testimonials"
      className={`relative z-30 bg-paper py-[clamp(54px,7.5vh,110px)] max-[720px]:py-[44px] overflow-hidden border-t border-line/40 ${className}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header: Centered Eyebrow, Heading, Description & CTA matching Wedding Intro */}
        <div className="flex flex-col items-center text-center max-w-[940px] mx-auto px-4 sm:px-6 mb-8 sm:mb-16 md:mb-20 min-[1280px]:mb-24 shrink-0">
          {eyebrow && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariants}
              className="m-0 mb-2.5 sm:mb-4 uppercase tracking-[0.22em] text-[10px] sm:text-[11.5px] font-semibold text-muted text-center"
            >
              {eyebrow}
            </motion.p>
          )}

          {/* Symmetrical Scroll Reveal Heading matching Wedding Intro */}
          <div className="w-full flex justify-center items-center text-center">
            <ScrollReveal
              as="h2"
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              textClassName="!font-jakarta !font-normal !text-[clamp(18px,2.5vw,38px)] !leading-[1.32] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
              wordAnimationStart="top 85%"
              wordAnimationEnd="bottom 55%"
            >
              <span
                id="testimonials-heading"
                className="block !font-jakarta !font-normal !text-[clamp(18px,2.5vw,38px)] !leading-[1.28] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
              >
                <span className="block sm:whitespace-nowrap">
                  <span className="word">CHERISHED</span>{' '}
                  <span className="word">MEMORIES</span>
                </span>
                <span className="block sm:whitespace-nowrap">
                  <span className="word">OF</span>{' '}
                  <span className="word">TIMELESS</span>{' '}
                  <span className="word">CELEBRATIONS</span>
                </span>
              </span>
            </ScrollReveal>
          </div>

          {subtitle && (
            <div className="w-full flex justify-center items-center text-center mt-3 sm:mt-5">
              <ScrollReveal
                as="p"
                baseOpacity={0.12}
                enableBlur={true}
                baseRotation={0}
                blurStrength={5}
                containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
                wordAnimationStart="top 85%"
                wordAnimationEnd="bottom 55%"
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

          {ctaText && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={ctaVariants}
              className="mt-5 sm:mt-8"
            >
              <Link
                href={ctaHref}
                className="luxury-cta focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-[4px]"
                aria-label={`${ctaText} - View guest stories and reflections`}
              >
                <span className="cta-text">
                  {ctaText}
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

        {/* Testimonials Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:pl-6 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
                >
                  <div className="h-full bg-gradient-to-b from-linen/50 via-linen/25 to-paper/80 border border-ink/15 rounded-[3px] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-ink/35 hover:shadow-[0_12px_32px_rgba(40,20,10,0.08)] group">
                    <div>
                      {/* Top row: Quote mark + Rating */}
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <Quote
                          size={22}
                          className="text-ink/40 transition-colors duration-300 group-hover:text-ink/70"
                        />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: item.rating ?? 5 }).map((_, rIdx) => (
                            <Star
                              key={rIdx}
                              size={12}
                              className="fill-ink/70 text-ink/70"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Title & Quote */}
                      <h3 className="font-serif text-[18px] sm:text-[22px] font-normal text-ink leading-tight tracking-[-0.015em] mb-2.5 sm:mb-3">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[13px] sm:text-[14px] leading-[1.7] text-muted font-light mb-5 sm:mb-6">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="flex items-center gap-3 sm:gap-3.5 pt-3.5 sm:pt-4 border-t border-ink/10 mt-auto">
                      <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-ink/20 shrink-0">
                        <AvatarImage src={item.avatar} alt={item.author} />
                        <AvatarFallback className="bg-linen text-ink font-mono text-xs">
                          {item.initials || "ID"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans font-medium text-[13px] sm:text-[13.5px] text-ink truncate">
                          {item.author}
                        </span>
                        {item.role && (
                          <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.12em] text-muted/80 truncate">
                            {item.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Centered Slider Indicator with Hover Scrub & Number Selection */}
            <div className="relative flex items-center justify-center gap-3 mt-8 sm:mt-10">
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
                    {items.map((it, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          api?.scrollTo(idx);
                          setShowNumberPicker(false);
                        }}
                        onMouseEnter={() => api?.scrollTo(idx)}
                        className={cn(
                          "w-7 h-7 rounded-[3px] font-mono text-[11px] font-medium transition-colors flex items-center justify-center cursor-pointer",
                          (current % items.length) === idx
                            ? "bg-ink text-white font-semibold shadow-sm"
                            : "text-ink/70 hover:bg-ink/10 hover:text-ink"
                        )}
                        title={it.author}
                      >
                        {String(idx + 1).padStart(2, "0")}
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
                {String((hoveredIndex !== null ? hoveredIndex : current % items.length) + 1).padStart(2, "0")}
              </button>

              {/* Interactive Progress Line: hover along the line to scrub/get the card, click to select */}
              <div
                role="slider"
                aria-valuemin={1}
                aria-valuemax={items.length}
                aria-valuenow={(current % items.length) + 1}
                tabIndex={0}
                onPointerMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (!rect.width) return;
                  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length));
                  setHoverRatio(ratio);
                  setHoveredIndex(targetIdx);
                  api?.scrollTo(targetIdx);
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (!rect.width) return;
                  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length));
                  setHoverRatio(ratio);
                  setHoveredIndex(targetIdx);
                  api?.scrollTo(targetIdx);
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (!rect.width) return;
                  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length));
                  setHoverRatio(ratio);
                  setHoveredIndex(targetIdx);
                  api?.scrollTo(targetIdx);
                }}
                onPointerLeave={() => {
                  setHoveredIndex(null);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (!rect.width) return;
                  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length));
                  api?.scrollTo(targetIdx);
                }}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  if (!touch) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (!rect.width) return;
                  const ratio = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
                  const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length));
                  api?.scrollTo(targetIdx);
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  if (!touch) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (!rect.width) return;
                  const ratio = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
                  const targetIdx = Math.min(items.length - 1, Math.floor(ratio * items.length));
                  api?.scrollTo(targetIdx);
                }}
                className="relative py-2.5 -my-2.5 cursor-pointer flex items-center touch-pan-x"
              >
                {/* Floating Card Preview on Hovering the line */}
                <AnimatePresence>
                  {hoveredIndex !== null && items[hoveredIndex] && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute bottom-full mb-3 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center"
                      style={{ left: `${hoverRatio * 100}%` }}
                    >
                      <div className="bg-[#fbfaf7] text-ink border border-ink/20 shadow-2xl rounded-[4px] p-2 flex flex-col gap-1 w-44">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 rounded-full border border-ink/20">
                            <AvatarImage src={items[hoveredIndex].avatar} alt={items[hoveredIndex].author} />
                            <AvatarFallback className="text-[9px] font-mono bg-paper-subtle text-ink">
                              {items[hoveredIndex].author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="text-[10.5px] font-sans font-medium text-ink truncate leading-tight">
                              {items[hoveredIndex].author}
                            </div>
                            <div className="text-[8.5px] font-mono uppercase tracking-wider text-muted truncate">
                              #{String(hoveredIndex + 1).padStart(2, "0")} • {items[hoveredIndex].role || "Guest"}
                            </div>
                          </div>
                        </div>
                        <p className="text-[9.5px] font-sans text-muted line-clamp-2 leading-relaxed italic pt-0.5 border-t border-ink/10">
                          &ldquo;{items[hoveredIndex].quote}&rdquo;
                        </p>
                      </div>
                      <div className="w-2 h-2 rotate-45 bg-[#fbfaf7] border-r border-b border-ink/20 -mt-1" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-28 sm:w-40 h-[2px] bg-ink/15 rounded-full overflow-hidden transition-all duration-200 hover:h-[3.5px]">
                  <div
                    className="h-full bg-ink rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${(((hoveredIndex !== null ? hoveredIndex : current % items.length) + 1) / items.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Total Number Button: Click to jump directly to the last card */}
              <button
                type="button"
                onClick={() => api?.scrollTo(items.length - 1)}
                title={`Click to select card ${items.length}`}
                className="font-mono text-[11px] tracking-[0.16em] text-muted font-medium tabular-nums cursor-pointer transition-all hover:scale-110 hover:text-ink"
              >
                {String(items.length).padStart(2, "0")}
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export { Testimonials };
export default Testimonials;
