'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface ExperienceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  details: {
    timing: string;
    duration: string;
    setting: string;
  };
  highlights: string[];
  image: string;
  secondaryImage?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 'rice-farming',
    number: '01',
    category: 'Agrarian Heritage',
    title: 'Traditional Rice Farming',
    subtitle: 'Walking the emerald bunds of ancestral paddy fields',
    description:
      'Step barefoot onto the cool, earthen ridges of Kerala’s historic paddy fields. Guided by generational farmers who have tended these soils for decades, you will experience the unhurried rhythms of traditional agriculture—from transplanting heirloom saplings and understanding ancient stone water channels to tasting sweet, fresh tender coconut under the morning sun.',
    details: {
      timing: 'Early Morning (6:30 AM – 9:00 AM)',
      duration: '2.5 Hours',
      setting: 'Idanazhi Organic Fields & Irrigation Bunds',
    },
    highlights: [
      'Barefoot mud-walk along ancient field bunds',
      'Hands-on planting of native heirloom paddy varieties',
      'Understanding traditional gravity-fed water channels',
      'Fresh tender coconut water served in the field',
    ],
    image: '/images/experiences/paddy-farming-experience.jpg',
    secondaryImage: '/images/experiences/working-fields.jpg',
  },
  {
    id: 'kumbidi-village',
    number: '02',
    category: 'Village & Craft',
    title: 'Kumbidi Village Life',
    subtitle: 'A stroll through quiet artisan hamlets and red-earth lanes',
    description:
      'Kumbidi is a living rural hamlet where craft and community remain gentle and unchanged. Wander along shaded village pathways flanked by betel nut palms, sit beside master potters shaping terracotta vessels on hand-turned wheels, observe local weavers at their wooden looms, and pause at a traditional village chayakada for steaming cardamom tea and quiet conversation.',
    details: {
      timing: 'Morning (9:00 AM) or Afternoon (3:30 PM)',
      duration: '3.0 Hours',
      setting: 'Kumbidi Artisan Quarter & Village Pathways',
    },
    highlights: [
      'Interactive clay pottery on traditional wheels',
      'Visits to generational handloom weaving ateliers',
      'Tea and warm snacks at a local village chayakada',
      'Unhurried conversations with village elders and artisans',
    ],
    image: '/images/experiences/kumbidi-village-experience.jpg',
  },
  {
    id: 'temple-experience',
    number: '03',
    category: 'Sacred Heritage',
    title: 'Temple Trails',
    subtitle: 'Timeless wooden architecture and the silence of evening oil lamps',
    description:
      'Centuries-old Kerala temples are sanctums of profound stillness, built with teak joinery, laterite stone, and cosmic geometric alignment. Accompanied by our resident cultural custodian, discover the sacred architecture of the region, listen to the resonant notes of Sopana Sangeetham, and witness the Deeparadhana as hundreds of brass oil lamps flicker to life against ancient stone.',
    details: {
      timing: 'Dawn (6:00 AM) or Twilight (6:00 PM)',
      duration: '2.0 Hours',
      setting: 'Historic Temple Sanctums of the Bharatapuzha Valley',
    },
    highlights: [
      'Architectural walk through historic teak wood gopurams',
      'Witnessing the Deeparadhana brass oil lamp ritual',
      'Traditional temple prasadam prepared by heritage cooks',
      'Insights into sacred Thachu Shastra design principles',
    ],
    image: '/images/experiences/temple-heritage-experience.jpg',
  },
  {
    id: 'fishing-harbor',
    number: '04',
    category: 'River & Waters',
    title: 'Fishing life in harbour',
    subtitle: 'Dawn canoe excursions and traditional throw-net craft',
    description:
      'As first light breaks through the river mist, board a traditional wooden country craft with local fishermen. Watch the graceful, practiced unfurling of the Veechu Vala (circular cast net), observe the morning sorting of fresh river pearl spot (Karimeen), and return to Idanazhi where our culinary team prepares the morning catch with freshly pressed coconut milk.',
    details: {
      timing: 'Sunrise Departure (5:30 AM – 8:00 AM)',
      duration: '2.5 Hours',
      setting: 'River Shore, Country Canoe & Landing Point',
    },
    highlights: [
      'Early morning wooden canoe excursion on quiet waters',
      'Live demonstration and practice of traditional throw-net casting',
      'Observing the morning river catch and native fish species',
      'Fresh catch preparation demonstration by Idanazhi chefs',
    ],
    image: '/images/experiences/fishing-harbor-experience.jpg',
  },
];

export default function ExperiencesPage() {
  const [activeSection, setActiveSection] = useState<string>('rice-farming');

  const handleOpenBooking = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
    }
  };

  // Redirect any legacy hash-based URLs (e.g. /experiences#kumbidi-village) to proper addressed clean URLs
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const validSlugs = ['rice-farming', 'kumbidi-village', 'temple-experience', 'fishing-harbor'];
      if (validSlugs.includes(hash)) {
        window.location.replace(`/experiences/${hash}`);
      }
    }
  }, []);

  // Scroll spy to highlight current section in navigation bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const exp of experiences) {
        const el = document.getElementById(exp.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(exp.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-[#FAF8F5] min-h-screen text-[#2D1912] selection:bg-[#7C402E] selection:text-white">
      {/* =========================================================================
          HERO: CALM, EDITORIAL & SPACIOUS
          ========================================================================= */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 sm:px-10 lg:px-16 max-w-[1360px] mx-auto">
        <div className="max-w-[860px]">
          <p className="text-[12px] uppercase font-sans tracking-[0.25em] text-[#84382B] mb-4 font-medium">
            Experiences &amp; Immersions
          </p>
          <h1 className="font-serif text-[clamp(36px,5.2vw,72px)] font-normal text-[#2D1912] leading-[1.08] tracking-[-0.025em] mb-6">
            Four unhurried ways to live with the soil, heritage, and quiet waters of Kumbidi.
          </h1>
          <p className="font-sans font-light text-[16px] sm:text-[18px] leading-relaxed text-[#5A4238] max-w-[680px]">
            Every experience at Idanazhi is hosted privately with generational custodians. No scripted tours, no crowds—just genuine encounters rooted in the living traditions of Kerala.
          </p>
        </div>

        {/* Dedicated Experience Navigation without Hash Tags */}
        <div className="mt-12 md:mt-16 pt-6 border-t border-[#E8E1D9] flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C7A70] font-sans">
            Jump to:
          </span>
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className={`text-[13px] font-sans transition-colors duration-200 no-underline ${activeSection === exp.id
                ? 'text-[#84382B] font-semibold border-b border-[#84382B] pb-0.5'
                : 'text-[#5A4238] hover:text-[#84382B]'
                }`}
            >
              <span className="text-[#8C7A70] mr-1.5 font-normal">{exp.number}</span>
              {exp.title}
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          EXPERIENCES: DEDICATED EDITORIAL SECTIONS
          ========================================================================= */}
      <div className="space-y-24 md:space-y-36 pb-28 md:pb-40">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 1;

          return (
            <section
              key={exp.id}
              id={exp.id}
              className="scroll-mt-28 md:scroll-mt-36 px-6 sm:px-10 lg:px-16 max-w-[1360px] mx-auto"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Visual Frame */}
                <div
                  className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                >
                  <div className="relative group overflow-hidden bg-[#ECE6DF] w-full h-[320px] sm:h-[450px] lg:h-[540px] xl:h-[580px] border border-[#7C402E]/10 shadow-sm">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                  {exp.secondaryImage && (
                    <div className="flex items-center gap-4 mt-4 text-[#7A6B63] text-[12px] font-sans">
                      <div className="w-16 h-12 overflow-hidden bg-[#ECE6DF] flex-shrink-0 border border-[#7C402E]/10">
                        <img
                          src={exp.secondaryImage}
                          alt="Detail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="m-0 italic">
                        Hands-on participation guided by local farming elders.
                      </p>
                    </div>
                  )}
                </div>

                {/* Narrative & Details */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                >
                  {/* Category & Number */}
                  <div className="flex items-center gap-3 mb-4 text-[#84382B] text-[11px] uppercase tracking-[0.22em] font-sans font-medium">
                    <span>{exp.number}</span>
                    <span className="w-6 h-[1px] bg-[#84382B]/40" />
                    <span>{exp.category}</span>
                  </div>

                  {/* Main Title */}
                  <h2 className="font-serif text-[clamp(28px,3.2vw,44px)] font-normal text-[#2D1912] leading-[1.15] tracking-[-0.02em] mb-3">
                    {exp.title}
                  </h2>

                  {/* Poetic Subtitle */}
                  <p className="font-serif italic text-[16px] sm:text-[18px] text-[#7A5A4D] mb-6 leading-snug">
                    {exp.subtitle}
                  </p>

                  {/* Body Paragraph */}
                  <p className="font-sans font-light text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#5A4238] mb-8">
                    {exp.description}
                  </p>

                  {/* Highlights List */}
                  <div className="mb-8 pt-6 border-t border-[#E8E1D9]">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#8C7A70] font-medium mb-3">
                      Experience Highlights
                    </p>
                    <ul className="space-y-2.5 p-0 m-0 list-none font-sans text-[13.5px] text-[#4A3730]">
                      {exp.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[#84382B] text-[12px] mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Details */}
                  <div className="grid grid-cols-2 gap-4 py-4 mb-8 border-y border-[#E8E1D9] text-[12.5px] font-sans">
                    <div>
                      <span className="block text-[#8C7A70] text-[10.5px] uppercase tracking-[0.16em] mb-1">
                        Timing
                      </span>
                      <span className="text-[#2D1912] font-medium">{exp.details.timing}</span>
                    </div>
                    <div>
                      <span className="block text-[#8C7A70] text-[10.5px] uppercase tracking-[0.16em] mb-1">
                        Duration
                      </span>
                      <span className="text-[#2D1912] font-medium">{exp.details.duration}</span>
                    </div>
                  </div>

                  {/* Clean Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/experiences/${exp.id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#4E2418] hover:bg-[#84382B] text-white text-[11px] font-sans uppercase tracking-[0.18em] font-medium transition-colors duration-200 cursor-pointer no-underline shadow-sm"
                    >
                      <span>Explore Full Experience</span>
                      <ArrowRight size={13} />
                    </Link>
                    <button
                      type="button"
                      onClick={handleOpenBooking}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#7C402E]/30 text-[#4E2418] hover:bg-[#7C402E]/5 text-[11px] font-sans uppercase tracking-[0.18em] font-medium transition-colors duration-200 cursor-pointer"
                    >
                      <span>Enquire Now</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* =========================================================================
          BESPOKE CURATION & PRIVATE GROUP CALLOUT (Clean & Understated)
          ========================================================================= */}
      <section className="bg-[#F3EFEA] border-t border-[#E5DDD2] py-20 md:py-28 px-6 sm:px-10 lg:px-16 text-center">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[11px] uppercase font-sans tracking-[0.24em] text-[#84382B] font-medium mb-3">
            Tailored Itineraries
          </p>
          <h2 className="font-serif text-[clamp(28px,3.4vw,46px)] font-normal text-[#2D1912] leading-[1.18] mb-5">
            Planning for a wedding group or private family retreat?
          </h2>
          <p className="font-sans font-light text-[15px] sm:text-[16.5px] text-[#5A4238] leading-relaxed mb-8">
            All experiences can be customized into private morning or twilight sessions for wedding parties, extended families, or cultural enthusiasts. Let our concierge design an unhurried itinerary aligned with your stay.
          </p>
          <button
            type="button"
            onClick={handleOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4E2418] hover:bg-[#683020] text-white text-[11.5px] font-sans uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer"
          >
            <span>Plan a Custom Experience</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </section>
    </main>
  );
}
