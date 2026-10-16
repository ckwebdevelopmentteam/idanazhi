"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
  titleWords = ["CHERISHED", "MEMORIES", "OF", "TIMELESS", "CELEBRATIONS"],
  subtitle = "Memories and reflections from couples, families, and travelers who have experienced the warmth, heritage, and quiet luxury of Idanazhi.",
  items = defaultTestimonials,
  className = "",
}: TestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <section
      id="testimonials"
      className={`relative bg-paper py-[clamp(64px,8.5vh,110px)] overflow-hidden border-t border-ink/10 ${className}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header matching Idanazhi's luxury editorial design aesthetics */}
        <div className="flex flex-col items-center text-center max-w-[940px] mx-auto mb-12 sm:mb-16">
          <p className="m-0 mb-4 sm:mb-5 uppercase tracking-[0.22em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-center">
            {eyebrow}
          </p>

          <div className="w-full flex justify-center items-center text-center">
            <ScrollReveal
              as="h2"
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              wordAnimationStart="top 85%"
              wordAnimationEnd="bottom 55%"
            >
              <span
                id="testimonials-heading"
                className="block !font-jakarta !font-normal !text-[clamp(20px,2.5vw,38px)] !leading-[1.36] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
              >
                {titleWords.map((word, i) => (
                  <React.Fragment key={i}>
                    <span className="word">{word}</span>
                    {i < titleWords.length - 1 ? " " : ""}
                  </React.Fragment>
                ))}
              </span>
            </ScrollReveal>
          </div>

          {subtitle && (
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
                  {subtitle}
                </span>
              </ScrollReveal>
            </div>
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
                  <div className="h-full bg-gradient-to-b from-linen/50 via-linen/25 to-paper/80 border border-ink/15 rounded-[3px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-ink/35 hover:shadow-[0_12px_32px_rgba(40,20,10,0.08)] group">
                    <div>
                      {/* Top row: Quote mark + Rating */}
                      <div className="flex items-center justify-between mb-5">
                        <Quote
                          size={24}
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
                      <h3 className="font-serif text-[20px] sm:text-[22px] font-normal text-ink leading-tight tracking-[-0.015em] mb-3">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[13.5px] sm:text-[14px] leading-[1.75] text-muted font-light mb-6">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="flex items-center gap-3.5 pt-4 border-t border-ink/10 mt-auto">
                      <Avatar className="h-10 w-10 border border-ink/20 shrink-0">
                        <AvatarImage src={item.avatar} alt={item.author} />
                        <AvatarFallback className="bg-linen text-ink font-mono text-xs">
                          {item.initials || "ID"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans font-medium text-[13.5px] text-ink truncate">
                          {item.author}
                        </span>
                        {item.role && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted/80 truncate">
                            {item.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <div className="flex justify-center items-center gap-4 mt-8 sm:mt-10">
              <CarouselPrevious className="static translate-y-0 translate-x-0 h-9 w-9 rounded-full border-ink/20 text-ink hover:bg-ink hover:text-white transition-colors" />
              <div className="flex items-center gap-2">
                {items.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => api?.scrollTo(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      (api ? api.selectedScrollSnap() : current) === dotIdx
                        ? "w-6 bg-ink"
                        : "w-1.5 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                ))}
              </div>
              <CarouselNext className="static translate-y-0 translate-x-0 h-9 w-9 rounded-full border-ink/20 text-ink hover:bg-ink hover:text-white transition-colors" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export { Testimonials };
export default Testimonials;
