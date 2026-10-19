'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Compass, Sparkles, Feather, Sun, Heart, Check, Flower2 } from 'lucide-react';
import { BookingPanel } from '@/components/sections/booking-panel';

const chapters = [
  {
    number: '01',
    era: 'THE INSPIRATION',
    title: 'The Meaning of Idanazhi',
    lead: 'In the timeless vernacular of Kerala’s ancestral Nalukettu manors, the "Idanazhi" (ഇടനാഴി) is the sheltered breezeway—the connecting corridor between private chambers and the open sky.',
    description:
      'It is where generations of families gathered as twilight softened into night, watching rain fall into the central courtyard while sharing stories that bound them together. We founded Idanazhi Farm Stay to recreate this sacred threshold in a world that moves too quickly.',
    image: '/images/weddings/architecture-corridor.jpg',
    imageAlt: 'Idanazhi traditional carved wooden colonnaded corridor',
  },
  {
    number: '02',
    era: 'SACRED ARCHITECTURE',
    title: 'Built with Wood, Earth & Sky',
    lead: 'Constructed according to the ancient canons of Thachu Shastra, Idanazhi does not wall out nature; it breathes with it.',
    description:
      'Master carpenter artisans (Thachans) crafted the estate using reclaimed aged teak, rosewood, and natural porous laterite stone. Without a single harsh industrial finish, our high-gabled terracotta roofs and Nadumuttam rain-courts maintain a gentle natural microclimate even during the warmest tropical afternoons.',
    image: '/images/weddings/kerala-courtyard-planter.jpg',
    imageAlt: 'Heritage open sky courtyard with sacred tulasi planter',
  },
  {
    number: '03',
    era: 'THE GURUVAYOOR ROOTS',
    title: 'The Sanctum of Guruvayoor',
    lead: 'Rooted in the spiritual soil of Guruvayoor, our farm stay carries the sacred grace and devotional purity of Kerala’s heartland.',
    description:
      'Mornings here begin with the distant chime of temple bells and the soothing fragrance of fresh tulsi and damp soil. Whether solemnising sacred matrimonial vows at our carved heritage mandapam or resting in quiet contemplation, guests feel enveloped in a serenity that is ancient and deeply restorative.',
    image: '/images/weddings/stage-heritage-mandapam.jpg',
    imageAlt: 'Carved heritage wedding mandapam adorned with fresh marigolds and brass lamps',
  },
  {
    number: '04',
    era: 'FARM-TO-TABLE LIVING',
    title: 'Nourishment from the Earth',
    lead: 'True hospitality begins in the soil. At Idanazhi, living is entwined with the rhythm of our surrounding organic groves.',
    description:
      'From tender coconut water harvested fresh at dawn to traditional Sadya feasts served on emerald plantain leaves, our cuisine celebrates heirloom Kerala recipes. We honor the Ayurvedic principle of Shadrasa—the harmony of the six tastes—creating food that nourishes the body and comforts the soul.',
    image: '/images/experiences/savour-dining.jpg',
    imageAlt: 'Authentic Kerala traditional farm-to-table Sadya feast served on plantain leaves in a heritage verandah',
  },
];

const pillars = [
  {
    icon: Compass,
    title: 'Sacred Vastu & Geometry',
    description:
      'Every doorway, courtyard, and breezeway is aligned with the cardinal directions to optimize natural light, cross-ventilation, and positive energetic flow.',
  },
  {
    icon: Feather,
    title: 'Living Timber Craftsmanship',
    description:
      'Carved teak and rosewood joinery assembled with traditional tongue-and-groove wooden pegs that breathe and age gracefully with the monsoon.',
  },
  {
    icon: Sun,
    title: 'The Open Sky Nadumuttam',
    description:
      'Central open-to-sky courtyards that invite morning dew, cooling rainfall, and starry night skies directly into the center of family life.',
  },
  {
    icon: Heart,
    title: 'Gracious Kerala Hospitality',
    description:
      'Attentive, discreet, and deeply personal care where guests are welcomed not as tourists, but as cherished members of an ancestral home.',
  },
];

export default function StoryPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-paper text-ink pt-[95px] pb-24 selection:bg-[#7C402E] selection:text-white">
      {/* Editorial Page Header & Hero */}
      <section className="relative w-full border-b border-[#7C402E]/15 bg-gradient-to-b from-[#FAF4EC] to-paper py-14 sm:py-24 px-6 sm:px-12 overflow-hidden">
        {/* Subtle Decorative Background Motif */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(124,64,46,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center relative z-10">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#7C402E] hover:text-[#52291D] transition-colors mb-6 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Idanazhi Home
          </Link>

          <p className="m-0 mb-3 uppercase tracking-[0.26em] text-[10.5px] sm:text-[12px] font-semibold text-[#84382B]">
            THE STORY OF IDANAZHI · GURUVAYOOR, KERALA
          </p>

          <h1 className="font-jakarta uppercase text-[clamp(28px,3.8vw,52px)] font-normal leading-[1.28] tracking-[-0.015em] text-ink m-0 mb-6 max-w-[960px]">
            Where Ancestral Timber Breathes &amp; Sacred Moments Unfold
          </h1>

          <p className="font-sans text-[16px] sm:text-[18px] text-[#5A3828] max-w-[720px] leading-relaxed m-0 mb-10 font-light">
            An unhurried journey through traditional Kerala Nalukettu architecture, sacred family corridors,
            and the timeless art of hospitality in the heart of Guruvayoor.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="bg-[#7C402E] hover:bg-[#5E2B1D] text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              RESERVE YOUR STAY
            </button>
            <Link
              href="/#celebrations-and-experience"
              className="border border-[#7C402E]/35 text-[#4E2418] hover:bg-[#7C402E]/10 px-6 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all"
            >
              VIEW CELEBRATIONS
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Full-Width Panorama */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 -mt-6 sm:-mt-10 mb-20 relative z-20">
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden border border-[#7C402E]/20 shadow-2xl bg-[#FAF4EC]">
          <img
            src="/images/weddings/architecture-corridor.jpg"
            alt="Idanazhi Kerala heritage breezeway and carved wooden colonnade"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-[600px]">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-medium text-white/80 m-0 mb-1">
              THE SACRED CORRIDOR
            </p>
            <p className="font-jakarta text-[16px] sm:text-[20px] font-normal leading-snug m-0">
              &ldquo;The Idanazhi is not simply a passageway; it is the soul of the home where family, breeze, and sky convene.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Statement of Philosophy Section */}
      <section className="max-w-[1040px] mx-auto px-6 sm:px-12 mb-24 text-center">
        <span className="inline-block h-[2px] w-12 bg-[#84382B] mb-5 rounded-full" />
        <h2 className="font-jakarta uppercase text-[clamp(22px,2.6vw,38px)] font-normal leading-[1.32] tracking-[-0.015em] text-ink m-0 mb-6 max-w-[900px] mx-auto">
          A Sanctuary Built Upon the Conviction That True Luxury is Unhurried
        </h2>
        <p className="font-sans text-[15px] sm:text-[17px] text-[#5A3828] leading-[1.8] font-light max-w-[820px] mx-auto m-0 mb-6">
          In an era where hotels often feel interchangeable and hurried, Idanazhi was conceived as an authentic return to the roots.
          Here in Guruvayoor, Kerala, surrounded by lush palm groves and spiritual serenity, we created a living estate where every pillar was hand-carved,
          every courtyard celebrates the rain, and every celebration is treated as a sacred beginning.
        </p>
      </section>

      {/* Chapters of the Story: Alternating Editorial Spreads */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-20 sm:space-y-28 mb-28">
        {chapters.map((ch, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <article
              key={ch.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Side */}
              <div
                className={`lg:col-span-6 flex flex-col justify-center text-left ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="flex items-center gap-3 text-[11px] font-sans tracking-[0.22em] uppercase text-[#84382B] mb-3 font-semibold">
                  <span>CHAPTER {ch.number}</span>
                  <span>·</span>
                  <span>{ch.era}</span>
                </div>

                <h2 className="font-jakarta uppercase text-[clamp(21px,2.4vw,34px)] font-normal text-ink leading-[1.28] tracking-[-0.015em] m-0 mb-4">
                  {ch.title}
                </h2>

                <p className="font-sans text-[16px] sm:text-[17.5px] italic text-[#7C402E] leading-relaxed m-0 mb-4 font-light">
                  {ch.lead}
                </p>

                <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#5A3828] leading-[1.8] font-light m-0 mb-6">
                  {ch.description}
                </p>
              </div>

              {/* Photo Side */}
              <div
                className={`lg:col-span-6 relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden border border-[#7C402E]/20 shadow-xl bg-[#FAF4EC] ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <img
                  src={ch.image}
                  alt={ch.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </article>
          );
        })}
      </section>

      {/* Four Architectural Pillars */}
      <section className="bg-[#FAF4EC] border-y border-[#7C402E]/20 py-20 px-6 sm:px-12 mb-28">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10.5px] font-semibold text-[#84382B]">
            FOUNDATIONS OF IDANAZHI
          </p>
          <h2 className="font-jakarta uppercase text-[clamp(24px,2.8vw,38px)] font-normal text-ink m-0 mb-14 leading-[1.28] tracking-[-0.015em]">
            The Architectural &amp; Living Pillars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {pillars.map((pillar, pIdx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pIdx}
                  className="bg-paper p-7 sm:p-8 border border-[#7C402E]/15 hover:border-[#7C402E]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#7C402E]/10 text-[#7C402E] flex items-center justify-center mb-5">
                      <IconComp size={22} />
                    </div>
                    <h3 className="font-jakarta uppercase text-[17px] sm:text-[18px] font-normal text-ink m-0 mb-3 tracking-[-0.015em]">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-[13.5px] leading-[1.7] text-[#5A3828] font-light m-0">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custodians' Note & Vision */}
      <section className="max-w-[880px] mx-auto px-6 sm:px-12 mb-24 text-center">
        <div className="border border-[#7C402E]/25 bg-white/70 backdrop-blur-xs p-8 sm:p-14 shadow-sm relative">
          <Flower2 size={28} className="mx-auto text-[#7C402E] mb-6 opacity-75" />
          <blockquote className="font-sans text-[18px] sm:text-[22px] text-[#2D1912] italic leading-[1.65] font-light m-0 mb-6">
            &ldquo;We built Idanazhi not to be admired from afar, but to be lived in—to hear the rain on clay tiles,
            to smell the crushed marigold garlands at dawn, and to share sacred beginnings with those who matter most.&rdquo;
          </blockquote>
          <div className="pt-4 border-t border-[#7C402E]/15">
            <p className="font-sans text-[14.5px] font-semibold text-[#7C402E] m-0">
              The Custodians of Idanazhi
            </p>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted m-0 mt-0.5">
              Farm Stay &amp; Heritage Sanctum, Guruvayoor
            </p>
          </div>
        </div>
      </section>

      {/* Final Action Invitation */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-br from-[#4E2418] to-[#2D1912] text-white p-10 sm:p-16 text-center flex flex-col items-center shadow-xl">
          <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10.5px] font-semibold text-[#E5B59C]">
            EXPERIENCE THE STORY FIRSTHAND
          </p>
          <h2 className="font-jakarta uppercase text-[clamp(24px,3vw,38px)] font-normal text-white m-0 mb-4 max-w-[680px] leading-[1.28] tracking-[-0.015em]">
            Begin Your Unhurried Chapter at Idanazhi
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-white/80 max-w-[540px] leading-relaxed m-0 mb-8 font-light">
            Whether for a sacred destination wedding, an intimate family gathering, or a quiet retreat away from the world.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="bg-white hover:bg-[#FCF2E7] text-[#4E2418] px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors shadow-sm cursor-pointer"
            >
              RESERVE YOUR STAY
            </button>
            <Link
              href="/blogs"
              className="border border-white/50 text-white hover:bg-white/10 px-6 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors"
            >
              READ OUR STORIES
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Panel Modal */}
      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </main>
  );
}
