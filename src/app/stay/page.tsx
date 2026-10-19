'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  BedDouble,
  Users,
  Maximize2,
  Coffee,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { BookingPanel } from '@/components/sections/booking-panel';

export interface RoomItem {
  id: string;
  category: 'all' | 'courtyard' | 'villas';
  categoryName?: string;
  title: string;
  subtitle: string;
  sqft: number;
  occupancy: string;
  bed: string;
  image: string;
  description: string;
  highlights: string[];
}

const rooms: RoomItem[] = [
  {
    id: 'nalukettu-suite',
    category: 'courtyard',
    title: 'The Nalukettu Master Suite',
    subtitle: 'Ancestral Courtyard View · 1,200 sq.ft',
    sqft: 1200,
    occupancy: '2 – 4 Guests',
    bed: 'Teakwood King Bed',
    image: '/images/weddings/idanazhi-room.jpg',
    description:
      'Set in the prime auspicious quadrant of the manor, opening directly onto the central open-sky rain court with hand-carved teak colonnades and antique rosewood furnishings.',
    highlights: [
      'Private veranda overlooking the central Nadumuttam rain court',
      'Open-to-sky laterite stone shower and brass soaking tub',
      'Handcrafted planter lounge chairs and antique writing bureau',
      'Farm-fresh Kerala Sadya breakfast & 24/7 dedicated butler',
    ],
  },
  {
    id: 'nadumuttam-chamber',
    category: 'courtyard',
    title: 'The Nadumuttam Chamber',
    subtitle: 'Rain Court Sanctum · 850 sq.ft',
    sqft: 850,
    occupancy: '2 Guests',
    bed: 'Heritage King Bed',
    image: '/images/weddings/kerala-courtyard-planter.jpg',
    description:
      'A serene sanctuary framing the sacred Tulasi courtyard. Watch morning mist and tropical rain cascade naturally into the stone planter from your private threshold.',
    highlights: [
      'Step-out wooden threshold facing the ancient rain court',
      'Natural granite soak basin with fresh Ramacham herbal infusions',
      'Hand-loomed cotton linens dyed with organic herbs',
      'Twilight Nilavilakku brass lamp lighting ritual on your veranda',
    ],
  },
  {
    id: 'illam-retreat',
    category: 'courtyard',
    title: 'The Illam Royal Retreat',
    subtitle: 'High Gabled Ceiling · 1,050 sq.ft',
    sqft: 1050,
    occupancy: '2 – 3 Guests',
    bed: 'Carved Rosewood King Bed',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Honouring traditional Kerala Illam manor architecture with soaring terracotta gabled roofs, antique brass pendants, and a private balcony over emerald coconut groves.',
    highlights: [
      'Double-height timber gables with natural cross-breeze cooling',
      'Private cantilevered balcony overlooking coconut palm canopies',
      'Free-standing copper soaking tub with Ayurvedic herbal bath salts',
      'Ancestral wooden Thinnai daybed for unhurried afternoons',
    ],
  },
  {
    id: 'thinnai-suite',
    category: 'courtyard',
    title: 'The Thinnai Breezeway Suite',
    subtitle: 'Heritage Breezeway Corridor · 950 sq.ft',
    sqft: 950,
    occupancy: '2 – 4 Guests',
    bed: 'King Bed + Daybed',
    image: '/images/weddings/architecture-corridor.jpg',
    description:
      'Inspired by the sheltered Idanazhi breezeway corridor that unites family living. Features an expansive colonnaded veranda with authentic wooden Thinnai daybed seating.',
    highlights: [
      'Wide colonnaded teakwood veranda with handcrafted cane armchairs',
      'Built-in wooden Thinnai daybed platform cushioned in soft khadi',
      'Garden-facing double vanity with brass fixtures',
      'Direct covered walk to private dining courtyards and library',
    ],
  },
  {
    id: 'machakam-villa',
    category: 'villas',
    categoryName: 'Garden Villa',
    title: 'The Machakam Garden Villa',
    subtitle: 'Private Plunge Pool · 1,450 sq.ft',
    sqft: 1450,
    occupancy: '2 – 4 Guests',
    bed: 'Grand Teak King Bed',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    description:
      'A completely private garden pavilion hidden among bamboo and flowering trees. Features an enclosed courtyard with a natural stone plunge pool and open-air rain shower.',
    highlights: [
      'Secluded walled garden courtyard with private stone plunge pool',
      'Open-air rain shower immersed in tropical foliage',
      'Private outdoor dining pavilion for candlelit evening dinners',
      'Dedicated personal butler and tailored wellness consultation',
    ],
  },
  {
    id: 'tharavadu-chamber',
    category: 'villas',
    categoryName: 'Garden Villa',
    title: 'The Tharavadu Chamber',
    subtitle: 'Pond & Grove View · 800 sq.ft',
    sqft: 800,
    occupancy: '2 Guests',
    bed: 'Rosewood King Bed',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    description:
      'A peaceful hideaway capturing the pure simplicity of old Kerala Tharavadu homes. Features river-pebble bath floors, soft linen drapes, and water lily pond views.',
    highlights: [
      'Carved floral ceiling motifs and antique brass fittings',
      'Private sit-out overlooking a quiet water lily pond',
      'River-pebble rain shower illuminated by a natural skylight',
      'Farm-fresh Kerala country breakfast served on your sit-out',
    ],
  },
];

export default function TraditionalStayPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'courtyard' | 'villas'>('all');
  const [bookingOpen, setBookingOpen] = useState(false);

  const filteredRooms = useMemo(() => {
    if (activeTab === 'all') return rooms;
    return rooms.filter((r) => r.category === activeTab);
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-paper text-ink pt-[95px] pb-24 selection:bg-[#7C402E] selection:text-white">
      {/* Editorial Header Section */}
      <section className="relative w-full border-b border-[#7C402E]/15 bg-gradient-to-b from-[#FAF4EC] via-paper to-paper pt-8 sm:pt-12 pb-14 sm:pb-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1360px] mx-auto flex flex-col">
          {/* Top Bar: Back Link & Location Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#7C402E]/15 text-[11px] font-sans tracking-[0.2em] uppercase">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#7C402E] hover:text-[#4A2618] transition-colors group"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <span className="text-[#84382B] font-semibold">
              GURUVAYOOR, KERALA · HERITAGE STAY
            </span>
          </div>

          {/* Headline & Brief Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-8 sm:py-14 items-center">
            <div className="lg:col-span-8 flex flex-col">
              <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10.5px] sm:text-[11.5px] font-semibold text-[#84382B]">
                TRADITIONAL STAY AT IDANAZHI
              </p>
              <h1 className="font-jakarta uppercase text-[clamp(28px,3.8vw,52px)] font-normal leading-[1.18] tracking-[-0.02em] text-ink m-0">
                Ancestral Chambers &amp; Courtyard Suites
              </h1>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="font-sans font-light text-[15px] sm:text-[16.5px] leading-[1.7] text-[#5A3828] m-0 border-l-2 border-[#84382B]/35 pl-5">
                Hand-carved teak, central open-sky rain courts, and breezy wooden verandas rooted in
                traditional Kerala Nalukettu craftsmanship.
              </p>
            </div>
          </div>

          {/* Hero Photography Banner */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] max-h-[520px] overflow-hidden border border-[#7C402E]/20 bg-[#FAF4EC] shadow-xl">
            <img
              src="/images/weddings/architecture-corridor.jpg"
              alt="Idanazhi traditional carved wooden breezeway colonnade"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 text-white max-w-[500px]">
              <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.24em] text-white/80 block mb-1">
                LIVING HERITAGE
              </span>
              <p className="font-serif text-[18px] sm:text-[22px] font-normal m-0 leading-tight">
                Quiet spaces shaped by wood, earth, and sacred winds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Category Tabs */}
      <section className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 pt-12 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7C402E]/15 pb-5">
          <div>
            <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-ink m-0">
              Our Chambers &amp; Suites
            </h2>
            <p className="font-sans text-[13.5px] text-[#5A3828] font-light m-0 mt-1">
              Select a room below to view details and check availability.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#FAF4EC] p-1 border border-[#7C402E]/20 rounded-full">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] rounded-full transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#7C402E] text-white shadow-sm'
                  : 'text-[#5A3828] hover:text-[#7C402E] bg-transparent'
              }`}
            >
              All Rooms ({rooms.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('courtyard')}
              className={`px-4 py-2 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] rounded-full transition-all cursor-pointer ${
                activeTab === 'courtyard'
                  ? 'bg-[#7C402E] text-white shadow-sm'
                  : 'text-[#5A3828] hover:text-[#7C402E] bg-transparent'
              }`}
            >
              Courtyard Suites (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('villas')}
              className={`px-4 py-2 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] rounded-full transition-all cursor-pointer ${
                activeTab === 'villas'
                  ? 'bg-[#7C402E] text-white shadow-sm'
                  : 'text-[#5A3828] hover:text-[#7C402E] bg-transparent'
              }`}
            >
              Garden Villas (2)
            </button>
          </div>
        </div>
      </section>

      {/* Clean, Spacious Room Cards */}
      <section className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 py-8 space-y-12 sm:space-y-16">
        {filteredRooms.map((room) => (
          <article
            key={room.id}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 p-6 sm:p-8 bg-paper border border-[#7C402E]/20 shadow-sm hover:shadow-xl transition-all duration-300 items-center"
          >
            {/* Image Column */}
            <div className="lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden border border-[#7C402E]/15 bg-[#2D1912]">
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                {/* Room Title & Subtitle */}
                <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#84382B] m-0 mb-1.5">
                  {room.subtitle}
                </p>
                <h3 className="font-serif text-[26px] sm:text-[32px] font-normal text-ink m-0 mb-3 leading-tight">
                  {room.title}
                </h3>

                {/* Quick Spec Pills */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 text-[11.5px] font-sans text-[#5A3828]">
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF4EC] px-3 py-1 border border-[#7C402E]/15 rounded-sm">
                    <Maximize2 size={13} className="text-[#84382B]" />
                    {room.sqft} sq.ft
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF4EC] px-3 py-1 border border-[#7C402E]/15 rounded-sm">
                    <BedDouble size={13} className="text-[#84382B]" />
                    {room.bed}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF4EC] px-3 py-1 border border-[#7C402E]/15 rounded-sm">
                    <Users size={13} className="text-[#84382B]" />
                    {room.occupancy}
                  </span>
                </div>

                {/* Room Description */}
                <p className="font-sans text-[14.5px] text-[#5A3828] font-light leading-relaxed m-0 mb-6">
                  {room.description}
                </p>

                {/* Room Highlights Checkmarks */}
                <div className="space-y-2 mb-8 border-t border-[#7C402E]/15 pt-5">
                  {room.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#4A2618]">
                      <Check size={14} className="text-[#84382B] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Single Clear Action Button */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="bg-[#7C402E] hover:bg-[#5E2B1D] text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95 inline-flex items-center gap-2"
                >
                  <span>RESERVE THIS SUITE</span>
                  <ChevronRight size={14} />
                </button>

                <a
                  href="mailto:hello@idanazhi.com"
                  className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#7C402E] hover:text-[#52291D] transition-colors"
                >
                  Enquire via Concierge
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Simple Inclusions Bar */}
      <section className="w-full bg-[#FAF4EC] border-t border-b border-[#7C402E]/15 py-12 px-5 sm:px-8 mt-12">
        <div className="max-w-[1360px] mx-auto">
          <p className="text-center font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#84382B] mb-2">
            EVERY STAY INCLUDES
          </p>
          <h2 className="text-center font-serif text-[24px] sm:text-[30px] font-normal text-ink m-0 mb-8">
            Traditional Idanazhi Hospitality
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3.5 p-4">
              <Coffee size={22} className="text-[#84382B] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-serif text-[16px] text-ink mb-1">
                  Farm-Fresh Sadya Breakfast
                </strong>
                <p className="font-sans text-[12.5px] text-[#5A3828] font-light leading-normal m-0">
                  Wholesome traditional morning breakfast served on banana leaves.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4">
              <Sparkles size={22} className="text-[#84382B] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-serif text-[16px] text-ink mb-1">
                  Twilight Vilakku Ritual
                </strong>
                <p className="font-sans text-[12.5px] text-[#5A3828] font-light leading-normal m-0">
                  Auspicious brass Nilavilakku lamp lighting ceremony in the courtyard.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4">
              <HeartHandshake size={22} className="text-[#84382B] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-serif text-[16px] text-ink mb-1">
                  Dedicated Personal Butler
                </strong>
                <p className="font-sans text-[12.5px] text-[#5A3828] font-light leading-normal m-0">
                  Attentive heritage care for room requests, tea service, and dining.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4">
              <ShieldCheck size={22} className="text-[#84382B] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-serif text-[16px] text-ink mb-1">
                  Ayurvedic Herbal Baths
                </strong>
                <p className="font-sans text-[12.5px] text-[#5A3828] font-light leading-normal m-0">
                  Fresh jasmine Uruli water baths and restorative vetiver infusions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Friendly Bottom Reservation Prompt */}
      <section className="w-full py-16 px-5 sm:px-8 text-center bg-paper">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-serif text-[28px] sm:text-[36px] font-normal text-ink m-0 mb-4">
            Plan Your Stay in Guruvayoor
          </h2>
          <p className="font-sans text-[15px] text-[#5A3828] font-light leading-relaxed m-0 mb-8">
            Whether visiting for an intimate wedding, spiritual retreat, or peaceful family holiday,
            our team is here to assist with dates and customized arrangements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="bg-[#7C402E] hover:bg-[#5E2B1D] text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              BOOK YOUR STAY
            </button>
            <a
              href="mailto:hello@idanazhi.com"
              className="border border-[#7C402E]/35 text-[#4E2418] hover:bg-[#7C402E]/10 px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all"
            >
              CONTACT CONCIERGE
            </a>
          </div>
        </div>
      </section>

      {/* Booking Panel Modal */}
      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </main>
  );
}
