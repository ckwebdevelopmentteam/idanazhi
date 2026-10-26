'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, CheckCircle2, Calendar, Users, MapPin } from 'lucide-react';
import { BookingPanel } from '@/components/sections/booking-panel';
import { CelebrationsAndExperience } from '@/components/sections/celebrations-and-experience';

const eventSpaces = [
  {
    title: 'Heritage Teak Mandapam',
    subtitle: 'Sacred Vows & Traditional Ceremonies',
    capacity: 'Up to 350 Guests',
    image: '/images/weddings/stage-heritage-mandapam.jpg',
    description:
      'Hand-carved teakwood mandapam adorned with fresh jasmine, marigolds, and glowing brass Nilavilakku oil lamps. Perfect for auspicious Muhurtham rituals.',
    features: ['Ancestral woodcraft joinery', 'Vedic fire altar provision', 'Dedicated priest seating'],
  },
  {
    title: 'Lakeside Palm Lawn',
    subtitle: 'Sunset Receptions & Starlit Banquets',
    capacity: 'Up to 600 Guests',
    image: '/images/weddings/spaces/space-dinner-2.jpg',
    description:
      'Expansive manicured lawn framed by swaying coconut palms and water reflections. An enchanting open-air backdrop for evening banquets and musical celebrations.',
    features: ['Open-air starlit canopy', 'Custom banquet layouts', 'Waterfront photo vantage'],
  },
  {
    title: 'Grand Reception Pavilion',
    subtitle: 'Opulent Feasting & Gatherings',
    capacity: 'Up to 500 Guests',
    image: '/images/weddings/stage-grand-reception.jpg',
    description:
      'A climate-controlled luxury hall blending modern acoustic comfort with Kerala heritage elegance, floral backdrops, and majestic chandelier lighting.',
    features: ['Grand floral archways', 'Bridal entrance avenue', 'High-fidelity acoustics'],
  },
  {
    title: 'Nadumuttam Courtyard',
    subtitle: 'Intimate Pujan & Family Milestones',
    capacity: 'Up to 80 Guests',
    image: '/images/weddings/kerala-courtyard-planter.jpg',
    description:
      'The open-sky heart of the Nalukettu mansion, where rain and sunlight bless your closest family gatherings, mehendi ceremonies, and sacred chants.',
    features: ['Natural sky illumination', 'Colonnaded verandah seating', 'Intimate ancestral warmth'],
  },
];

export default function EventsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <main className="bg-paper min-h-screen text-ink">
      {/* Title Hero */}
      <section className="relative pt-[160px] pb-[80px] md:pt-[190px] md:pb-[110px] px-6 text-center max-w-[1240px] mx-auto">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-ink/15 bg-linen/50 text-[10px] uppercase font-sans font-semibold tracking-[0.22em] text-[#84382B]">
          <Sparkles size={12} />
          <span>CELEBRATIONS & GATHERINGS</span>
        </div>
        <h1 className="font-serif text-[clamp(36px,5.2vw,72px)] font-normal leading-[1.08] tracking-[-0.035em] text-[#2D1912] m-0 mb-6 max-w-[920px] mx-auto">
          Extraordinary Events in Sacred Surroundings
        </h1>
        <p className="font-sans text-[15px] sm:text-[17px] text-[#5A3828]/90 max-w-[640px] mx-auto font-light leading-relaxed m-0 mb-8">
          From majestic destination weddings and family milestones to curated corporate retreats, Idanazhi provides an unmatched heritage canvas in Kerala.
        </p>
        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="inline-flex items-center justify-center px-7 py-3.5 bg-[#4E2418] text-white font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:bg-[#84382B] active:scale-95 cursor-pointer shadow-md"
        >
          PLAN YOUR EVENT
        </button>
      </section>

      {/* Venues Grid */}
      <section className="px-6 md:px-12 max-w-[1360px] mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {eventSpaces.map((space) => (
            <article
              key={space.title}
              className="bg-linen/40 border border-ink/12 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-ink/30"
            >
              <div className="aspect-[16/10] overflow-hidden bg-linen relative">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-sans">
                  {space.capacity}
                </span>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <p className="m-0 mb-1 text-[10px] uppercase tracking-[0.18em] font-semibold text-[#84382B]">
                    {space.subtitle}
                  </p>
                  <h2 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#2D1912] m-0 mb-3">
                    {space.title}
                  </h2>
                  <p className="font-sans text-[13.5px] text-[#5A3828]/90 leading-relaxed font-light m-0 mb-5">
                    {space.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-ink/12 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {space.features.map((f, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-[0.1em] text-muted font-medium">
                        • {f}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    className="text-[10.5px] uppercase font-sans font-semibold tracking-[0.16em] text-[#84382B] hover:text-[#4E2418] transition-colors shrink-0 ml-4 cursor-pointer"
                  >
                    Reserve Space →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Celebrations Carousel */}
      <CelebrationsAndExperience />

      {/* Booking Dialog */}
      {bookingOpen && (
        <BookingPanel
          close={() => setBookingOpen(false)}
        />
      )}
    </main>
  );
}
