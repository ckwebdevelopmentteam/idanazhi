'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookingPanel } from '@/components/sections/booking-panel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    index: '01',
    title: 'The Heritage',
    description:
      'A closer look at the property’s Thachu Shastra architecture, hand-carved timber joinery, and distinctive ancestral character.',
    href: '/gallery',
    linkText: 'Explore Visual Gallery',
  },
  {
    index: '02',
    title: 'The Stay',
    description:
      'Discover quiet chambers, central open-air courtyards, and the unhurried rhythm of authentic Kerala living.',
    href: '/stay',
    linkText: 'Explore Your Stay',
  },
  {
    index: '03',
    title: 'The Celebrations',
    description:
      'Explore possibilities for intimate sacred weddings, family rituals, and meaningful milestones framed by timeless grace.',
    href: '/celebrations',
    linkText: 'Discover Celebrations',
  },
];

export default function StoryPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const pageContainerRef = useRef<HTMLElement>(null);
  const beginningSectionRef = useRef<HTMLElement>(null);
  const architectureSectionRef = useRef<HTMLElement>(null);
  const momentsSectionRef = useRef<HTMLElement>(null);
  const experiencesSectionRef = useRef<HTMLElement>(null);
  const closingSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Subtle editorial reveals on Desktop & Tablet
      mm.add('(min-width: 768px)', () => {
        // Section 02 reveal
        if (beginningSectionRef.current) {
          gsap.fromTo(
            beginningSectionRef.current.querySelectorAll('.editorial-reveal'),
            { y: 60, opacity: 0, filter: 'blur(6px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.1,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: beginningSectionRef.current,
                start: 'top bottom-=12%',
                end: 'top 45%',
                scrub: 1.1,
              },
            }
          );
        }

        // Section 03 Architecture visual elements reveal
        if (architectureSectionRef.current) {
          const archImages = architectureSectionRef.current.querySelectorAll('.arch-image-card');
          archImages.forEach((el, idx) => {
            gsap.fromTo(
              el,
              { y: 70 + idx * 20, opacity: 0, filter: 'blur(8px)' },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top bottom-=10%',
                  end: 'top 50%',
                  scrub: 1.2,
                },
              }
            );
          });
        }

        // Section 04 Moments reveal
        if (momentsSectionRef.current) {
          gsap.fromTo(
            momentsSectionRef.current.querySelectorAll('.moments-reveal'),
            { y: 60, opacity: 0, filter: 'blur(6px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.1,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: momentsSectionRef.current,
                start: 'top bottom-=10%',
                end: 'top 50%',
                scrub: 1.2,
              },
            }
          );
        }

        // Section 05 Experiences rows stagger
        if (experiencesSectionRef.current) {
          const expRows = experiencesSectionRef.current.querySelectorAll('.experience-editorial-row');
          gsap.fromTo(
            expRows,
            { y: 50, opacity: 0, filter: 'blur(6px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              stagger: 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: experiencesSectionRef.current,
                start: 'top bottom-=10%',
                end: 'bottom 75%',
                scrub: 1.1,
              },
            }
          );
        }

        // Section 06 Closing
        if (closingSectionRef.current) {
          gsap.fromTo(
            closingSectionRef.current.querySelectorAll('.closing-reveal'),
            { y: 50, opacity: 0, filter: 'blur(6px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: closingSectionRef.current,
                start: 'top bottom-=10%',
                end: 'top 50%',
                scrub: 1.1,
              },
            }
          );
        }
      });

      // Mobile: gentle sequential triggers
      mm.add('(max-width: 767px)', () => {
        const revealItems = document.querySelectorAll('.mobile-fade');
        revealItems.forEach((item) => {
          gsap.fromTo(
            item,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom-=5%',
                end: 'top 65%',
                scrub: 1,
              },
            }
          );
        });
      });
    }, pageContainerRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageContainerRef}
      className="min-h-screen bg-paper text-ink pt-[95px] pb-0 selection:bg-[#7C402E] selection:text-white"
    >
      {/* =========================================================================
          SECTION 01 — EDITORIAL STORY HERO
          ========================================================================= */}
      <section
        aria-labelledby="story-hero-heading"
        className="relative w-full border-b border-[#7C402E]/15 bg-gradient-to-b from-[#FAF4EC] via-paper to-paper pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-[1360px] mx-auto flex flex-col">
          {/* Top Meta Bar: Back Navigation + Location Identifier */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-[#7C402E]/15 text-[11px] font-sans tracking-[0.2em] uppercase">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#7C402E] hover:text-[#4A2618] transition-colors group"
              aria-label="Back to Idanazhi Home"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <span className="text-[#84382B] font-semibold">
              GURUVAYOOR, KERALA · HERITAGE SANCTUM
            </span>
          </div>

          {/* Asymmetrical Editorial Headline + Supporting Copy Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-10 sm:py-16 items-start">
            <div className="lg:col-span-8 flex flex-col">
              <p className="m-0 mb-4 uppercase tracking-[0.24em] text-[10.5px] sm:text-[11.5px] font-semibold text-[#84382B]">
                THE STORY OF IDANAZHI
              </p>
              <h1
                id="story-hero-heading"
                className="font-jakarta uppercase text-[clamp(28px,3.8vw,54px)] font-normal leading-[1.18] tracking-[-0.02em] text-ink m-0"
              >
                A Place Where Heritage Finds Its Way Into Every Moment.
              </h1>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end pt-2 lg:pt-10">
              <p className="font-sans font-light text-[15.5px] sm:text-[17px] leading-[1.8] text-[#5A3828] m-0 border-l-2 border-[#84382B]/35 pl-5 sm:pl-6">
                &ldquo;Some places carry a character of their own. Idanazhi invites you to discover
                a distinctive setting shaped by architecture, atmosphere, and the moments people
                share within it.&rdquo;
              </p>
            </div>
          </div>

          {/* Dominant Architectural Photograph */}
          <div className="relative w-full aspect-[21/10] sm:aspect-[2.3/1] max-h-[640px] overflow-hidden border border-[#7C402E]/20 bg-[#FAF4EC] shadow-xl group">
            <img
              src="/images/weddings/architecture-corridor.jpg"
              alt="Idanazhi traditional carved wooden colonnaded corridor overlooking palm groves"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            
            {/* Architectural Detail Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 text-white max-w-[560px]">
              <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.24em] font-medium text-white/80 block mb-1">
                ARCHITECTURAL SIGNATURE
              </span>
              <p className="font-jakarta text-[14px] sm:text-[17px] font-normal leading-snug m-0 text-white/95">
                The Idanazhi Breezeway · The connecting corridor between private chambers and the open sky
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — THE BEGINNING OF THE STORY
          ========================================================================= */}
      <section
        ref={beginningSectionRef}
        aria-labelledby="beginning-heading"
        className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-18 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 flex flex-col text-left editorial-reveal mobile-fade">
            <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10.5px] sm:text-[11.5px] font-semibold text-[#84382B]">
              A SENSE OF PLACE
            </p>
            <h2
              id="beginning-heading"
              className="font-jakarta uppercase text-[clamp(24px,2.8vw,42px)] font-normal text-ink leading-[1.24] tracking-[-0.015em] m-0 mb-6"
            >
              More Than a Place to Stay
            </h2>

            <p className="font-sans text-[16px] sm:text-[17.5px] text-[#5A3828] leading-[1.8] font-light m-0 mb-5">
              Every place has a feeling that stays with you long after you leave. At Idanazhi, the
              experience begins with its distinctive architectural character and the atmosphere of a
              place designed to be experienced, not simply passed through.
            </p>

            <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#5A3828]/90 leading-[1.8] font-light m-0">
              Rooted in the calm palm groves of Guruvayoor, Kerala, Idanazhi was conceived as an
              authentic sanctuary where time adopts a gentler rhythm. Here, every carved timber
              pillar, every terracotta threshold, and every courtyard breezeway welcomes you into an
              ancestral haven where silence and nature commune freely.
            </p>
          </div>

          {/* Authentic Architectural Photograph Column */}
          <div className="lg:col-span-6 editorial-reveal mobile-fade">
            <figure className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#7C402E]/20 bg-[#FAF4EC] shadow-xl group m-0">
              <img
                src="/images/weddings/kerala-courtyard-planter.jpg"
                alt="Traditional open-to-sky courtyard with sacred tulasi planter and ancient terracotta eaves"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <figcaption className="p-3.5 sm:p-4 bg-paper/95 border-t border-[#7C402E]/15 text-[11.5px] sm:text-[12px] font-sans text-[#5A3828] flex items-center justify-between">
                <span>The central Nadumuttam &amp; sacred tulasi courtyard</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#84382B] font-semibold">
                  Open Sky Court
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03 — ARCHITECTURE THAT TELLS A STORY
          ========================================================================= */}
      <section
        id="architecture"
        ref={architectureSectionRef}
        aria-labelledby="architecture-heading"
        className="w-full bg-[#FAF4EC] border-y border-[#7C402E]/20 py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-[1360px] mx-auto flex flex-col">
          {/* Section Heading & Introduction */}
          <div className="max-w-[820px] text-left mb-12 sm:mb-16">
            <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10.5px] sm:text-[11.5px] font-semibold text-[#84382B]">
              HERITAGE CRAFTSMANSHIP
            </p>
            <h2
              id="architecture-heading"
              className="font-jakarta uppercase text-[clamp(24px,3vw,44px)] font-normal text-ink leading-[1.22] tracking-[-0.015em] m-0 mb-5"
            >
              Character in Every Corner
            </h2>
            <p className="font-sans text-[15.5px] sm:text-[17px] text-[#5A3828] leading-[1.8] font-light m-0">
              From the rhythm of its corridors to the character of its traditional architectural
              details, Idanazhi offers a setting with a distinctive sense of place. Built with aged
              teak, rosewood, porous laterite, and earthen clay tiles, the estate breathes in harmony
              with Kerala&rsquo;s tropical microclimate.
            </p>
          </div>

          {/* Clean, Asymmetric Image Arrangement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Primary Large Architectural Photograph */}
            <div className="lg:col-span-7 flex flex-col arch-image-card mobile-fade">
              <figure className="relative h-full min-h-[380px] sm:min-h-[460px] overflow-hidden border border-[#7C402E]/20 bg-paper shadow-lg flex flex-col m-0 group">
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src="/images/weddings/architecture-1.jpg"
                    alt="Traditional Kerala Nalukettu architectural facade with high-gabled terracotta tiled roofs"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </div>
                <figcaption className="p-4 sm:p-5 bg-paper border-t border-[#7C402E]/15">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#84382B] font-semibold mb-1">
                    <span>Thachu Shastra Canons</span>
                    <span>Elevation</span>
                  </div>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-[#5A3828] leading-relaxed m-0 font-light">
                    High-gabled clay terracotta roofs and timber louvers designed to channel gentle
                    cross-ventilation throughout the estate.
                  </p>
                </figcaption>
              </figure>
            </div>

            {/* Asymmetrical Supporting Duo */}
            <div className="lg:col-span-5 flex flex-col gap-8 justify-between arch-image-card mobile-fade">
              {/* Supporting Photo 1: Timber Colonnades */}
              <figure className="relative overflow-hidden border border-[#7C402E]/20 bg-paper shadow-md m-0 group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/weddings/architecture-corridor.jpg"
                    alt="Hand-turned teak colonnades and wooden joinery along the verandah"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="p-3.5 sm:p-4 bg-paper border-t border-[#7C402E]/15">
                  <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.2em] text-[#84382B] font-semibold mb-1">
                    <span>Living Timber</span>
                    <span>Corridor Detail</span>
                  </div>
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-[#5A3828] leading-relaxed m-0 font-light">
                    Solid carved teak and rosewood joinery assembled with traditional tongue-and-groove
                    wooden pegs that age gracefully.
                  </p>
                </figcaption>
              </figure>

              {/* Supporting Photo 2: Courtyard Threshold */}
              <figure className="relative overflow-hidden border border-[#7C402E]/20 bg-paper shadow-md m-0 group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/weddings/paliam.jpg"
                    alt="Heritage stone paved courtyard threshold reflecting quiet stillness"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="p-3.5 sm:p-4 bg-paper border-t border-[#7C402E]/15">
                  <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.2em] text-[#84382B] font-semibold mb-1">
                    <span>Earth &amp; Stone</span>
                    <span>Courtyard Paving</span>
                  </div>
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-[#5A3828] leading-relaxed m-0 font-light">
                    Porous laterite stone and natural lime finishes that maintain a soothing, grounded
                    temperature through tropical afternoons.
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04 — THE MEANING OF TOGETHERNESS
          ========================================================================= */}
      <section
        ref={momentsSectionRef}
        aria-labelledby="moments-heading"
        className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-18 items-center">
          {/* Emotionally Engaging Photograph Column */}
          <div className="lg:col-span-6 lg:order-1 moments-reveal mobile-fade">
            <figure className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#7C402E]/20 bg-[#FAF4EC] shadow-xl group m-0">
              <img
                src="/images/weddings/stage-heritage-mandapam.jpg"
                alt="Traditional hand-carved heritage wedding mandapam with fresh marigold floral decor and brass lamps"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <figcaption className="p-3.5 sm:p-4 bg-paper/95 border-t border-[#7C402E]/15 text-[11.5px] sm:text-[12px] font-sans text-[#5A3828] flex items-center justify-between">
                <span>The Heritage Mandapam · Sacred Celebrations</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#84382B] font-semibold">
                  Intimate Weddings
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Text Column with Subtle Link */}
          <div className="lg:col-span-6 lg:order-2 flex flex-col text-left moments-reveal mobile-fade">
            <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10.5px] sm:text-[11.5px] font-semibold text-[#84382B]">
              SHARED MEMORIES
            </p>
            <h2
              id="moments-heading"
              className="font-jakarta uppercase text-[clamp(24px,2.8vw,42px)] font-normal text-ink leading-[1.24] tracking-[-0.015em] m-0 mb-6"
            >
              Made for Moments That Matter
            </h2>

            <p className="font-sans text-[16px] sm:text-[17.5px] text-[#5A3828] leading-[1.8] font-light m-0 mb-5">
              Some of life&rsquo;s most meaningful moments are the simplest ones: time with family,
              conversations that linger, and celebrations shared with the people closest to us.
              Idanazhi offers a distinctive backdrop for experiences worth remembering.
            </p>

            <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#5A3828]/90 leading-[1.8] font-light m-0 mb-8">
              Whether gathering on the sheltered colonnaded verandahs as dusk settles over
              Guruvayoor, sharing traditional plantain-leaf Sadya feasts, or celebrating sacred vows
              surrounded by heritage timber, the estate cradles family milestones in understated grace.
            </p>

            {/* Subtle Editorial Link */}
            <div>
              <Link
                href="/celebrations"
                className="inline-flex items-center gap-2 text-[12px] font-sans font-semibold tracking-[0.18em] uppercase text-[#7C402E] hover:text-[#4A2618] transition-colors group pb-1 border-b border-[#7C402E]/30 hover:border-[#7C402E]"
              >
                <span>Discover Wedding Experiences</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05 — A DIFFERENT WAY TO EXPERIENCE IDANAZHI
          ========================================================================= */}
      <section
        ref={experiencesSectionRef}
        aria-labelledby="experiences-heading"
        className="w-full bg-[#FAF4EC] border-y border-[#7C402E]/20 py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-[1360px] mx-auto flex flex-col">
          {/* Header */}
          <div className="max-w-[760px] text-left mb-12 sm:mb-16">
            <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10.5px] sm:text-[11.5px] font-semibold text-[#84382B]">
              WAYS TO EXPERIENCE
            </p>
            <h2
              id="experiences-heading"
              className="font-jakarta uppercase text-[clamp(24px,3vw,44px)] font-normal text-ink leading-[1.22] tracking-[-0.015em] m-0 mb-4"
            >
              Experience Idanazhi
            </h2>
            <p className="font-sans text-[15px] sm:text-[16.5px] text-[#5A3828] leading-[1.75] font-light m-0">
              Explore the different dimensions of the estate—from architectural immersion and restful
              stays to sacred wedding milestones.
            </p>
          </div>

          {/* Three Editorial Links */}
          <div className="flex flex-col border-t border-[#7C402E]/20">
            {experiences.map((item) => (
              <Link
                key={item.index}
                href={item.href}
                className="experience-editorial-row group block border-b border-[#7C402E]/20 py-8 sm:py-10 px-2 sm:px-4 -mx-2 sm:-mx-4 transition-all duration-300 hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-[#7C402E]"
                aria-label={`${item.title} - ${item.linkText}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                  {/* Left: Index + Title */}
                  <div className="md:col-span-5 flex items-baseline gap-5 sm:gap-7">
                    <span className="font-sans text-[12px] sm:text-[13px] font-semibold text-[#84382B] tracking-[0.2em] w-7 shrink-0">
                      {item.index}
                    </span>
                    <h3 className="font-jakarta uppercase text-[20px] sm:text-[23px] font-normal text-ink m-0 tracking-[-0.015em] group-hover:text-[#84382B] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle: Description */}
                  <div className="md:col-span-5 pl-12 md:pl-0">
                    <p className="font-sans text-[14px] sm:text-[15px] text-[#5A3828] leading-[1.75] font-light m-0 max-w-[500px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Right: Refined Arrow Link */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-end pl-12 md:pl-0 pt-2 md:pt-0">
                    <span className="inline-flex items-center gap-2 text-[11.5px] font-sans font-semibold tracking-[0.18em] uppercase text-[#7C402E] group-hover:text-[#4A2618] transition-colors">
                      <span className="pb-0.5 border-b border-[#7C402E]/30 group-hover:border-[#7C402E] transition-colors">
                        {item.linkText}
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 — A CLOSING VISUAL MOMENT
          ========================================================================= */}
      <section
        ref={closingSectionRef}
        aria-labelledby="closing-heading"
        className="relative w-full py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 overflow-hidden bg-paper"
      >
        <div className="max-w-[1120px] mx-auto flex flex-col items-center text-center">
          {/* Atmospheric Photograph */}
          <div className="w-full aspect-[21/9] sm:aspect-[2.4/1] overflow-hidden border border-[#7C402E]/20 bg-[#FAF4EC] shadow-2xl mb-12 sm:mb-16 closing-reveal mobile-fade group">
            <img
              src="/images/weddings/paliam.jpg"
              alt="Atmospheric view of the Idanazhi heritage estate with terracotta roofs"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
          </div>

          {/* Understated Closing Headline + Copy */}
          <div className="max-w-[780px] flex flex-col items-center closing-reveal mobile-fade">
            <h2
              id="closing-heading"
              className="font-jakarta uppercase text-[clamp(26px,3.4vw,46px)] font-normal text-ink leading-[1.22] tracking-[-0.015em] m-0 mb-5"
            >
              Some Places Stay With You.
            </h2>
            <p className="font-sans text-[15.5px] sm:text-[17px] text-[#5A3828] leading-[1.8] font-light m-0 mb-10 max-w-[620px]">
              Discover the character of Idanazhi and find the experience that feels right for you.
            </p>

            {/* Restrained Text Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pb-4">
              <Link
                href="/stay"
                className="inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-sans font-semibold tracking-[0.18em] uppercase text-[#7C402E] hover:text-[#4A2618] transition-colors group pb-1 border-b border-[#7C402E]/35 hover:border-[#7C402E]"
              >
                <span>Explore Your Stay</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/celebrations"
                className="inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-sans font-semibold tracking-[0.18em] uppercase text-[#7C402E] hover:text-[#4A2618] transition-colors group pb-1 border-b border-[#7C402E]/35 hover:border-[#7C402E]"
              >
                <span>Discover Wedding Experiences</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Panel Modal */}
      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </main>
  );
}
