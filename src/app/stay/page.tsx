'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Check,
  Maximize2,
  Users,
  BedDouble,
  X,
  Droplets,
  Compass,
  Trees,
  Coffee,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';
import { BookingPanel } from '@/components/sections/booking-panel';

export interface TraditionalRoom {
  id: string;
  category: 'all' | 'nalukettu' | 'suites' | 'villas';
  categoryName: string;
  title: string;
  malayalamTitle: string;
  tagline: string;
  badge?: string;
  sqft: number;
  sqm: number;
  occupancy: string;
  bed: string;
  view: string;
  leadImage: string;
  gallery: string[];
  description: string;
  architectureDetails: string;
  highlights: string[];
  inclusions: string[];
}

const traditionalRooms: TraditionalRoom[] = [
  {
    id: 'nalukettu-master-suite',
    category: 'nalukettu',
    categoryName: 'Nalukettu Courtyard',
    title: 'The Nalukettu Master Suite',
    malayalamTitle: 'നാലുകെട്ട് മാസ്റ്റർ സ്യൂട്ട്',
    tagline: 'Ancestral courtyard-facing master suite crafted with seasoned teakwood and antique rosewood',
    badge: 'SIGNATURE SANCTUARY',
    sqft: 1200,
    sqm: 111,
    occupancy: '2 – 4 Guests',
    bed: 'Hand-Carved Teak King Bed',
    view: 'Central Open-Sky Nadumuttam Courtyard',
    leadImage: '/images/weddings/idanazhi-room.jpg',
    gallery: [
      '/images/weddings/idanazhi-room.jpg',
      '/images/weddings/kerala-courtyard-planter.jpg',
      '/images/weddings/spaces/space-dinner-2.jpg',
    ],
    description:
      'Situated in the prime auspicious quadrant of the manor, the Nalukettu Master Suite is the crown jewel of Idanazhi. Hand-carved teakwood pillars flank an expansive master chamber that opens directly onto the central rain courtyard, where morning mist and birdsong awaken you with unmatched serenity.',
    architectureDetails:
      'Constructed strictly according to the ancient canons of Thachu Shastra, utilizing porous laterite stone and century-old timber joinery without synthetic sealants. The room maintains a gentle, natural microclimate throughout the day.',
    highlights: [
      'Private veranda overlooking the Nadumuttam rain court',
      'Hand-carved teakwood four-poster king bed with Kerala organic cottons',
      'Open-to-sky laterite rain shower with brass Uruli floral bath',
      'Handcrafted rosewood writing bureau and antique planter lounge chair',
    ],
    inclusions: [
      'Farm-fresh Sattvic Kerala breakfast & afternoon tea on your veranda',
      'Complimentary authentic banana-leaf Sadhya culinary experience',
      '24/7 dedicated personal heritage butler service',
      'Daily brass Uruli fresh jasmine floral floating arrangement',
      'Bespoke Ayurvedic herbal bath amenities & essential oils',
      'Chauffeured airport & Guruvayoor temple station transfers',
    ],
  },
  {
    id: 'nadumuttam-chamber',
    category: 'nalukettu',
    categoryName: 'Nalukettu Courtyard',
    title: 'The Nadumuttam Courtyard Chamber',
    malayalamTitle: 'നടുമുറ്റം ചേമ്പർ',
    tagline: 'Breezy courtyard sanctuary where gentle monsoon rains and natural daylight touch living timber',
    badge: 'CENTRAL RAIN COURT',
    sqft: 850,
    sqm: 79,
    occupancy: '2 Guests',
    bed: 'Four-Poster Heritage King Bed',
    view: 'Sacred Tulasi Courtyard & Rain Court',
    leadImage: '/images/weddings/kerala-courtyard-planter.jpg',
    gallery: [
      '/images/weddings/kerala-courtyard-planter.jpg',
      '/images/weddings/architecture-corridor.jpg',
      '/images/weddings/idanazhi-room.jpg',
    ],
    description:
      'A luminous sanctuary built around the sacred heartbeat of Kerala living: the Nadumuttam. Watch tropical rains nourish the central planter from your private wooden threshold, while soothing sandalwood breezes circulate freely through carved wooden louvers.',
    architectureDetails:
      'Features authentic wooden thoppu ceiling beams and a natural granite basin floor. Positioned to catch morning sunbeams and ambient afternoon cross-winds.',
    highlights: [
      'Step-out wooden threshold facing the ancient courtyard planter',
      'Natural granite soak basin with fresh herbal Ramacham infusions',
      'Bespoke hand-loomed linens dyed with natural Ayurvedic herbs',
      'Uninterrupted courtyard vistas with acoustic tranquility',
    ],
    inclusions: [
      'Fresh tender coconut water delivered at dawn',
      'Farm-to-veranda breakfast & signature herbal brews',
      'Evening brass oil lamp (Nilavilakku) lighting ritual in your veranda',
      'Herbal foot soak and welcome wellness elixir',
    ],
  },
  {
    id: 'illam-royal-retreat',
    category: 'suites',
    categoryName: 'Heritage Suites',
    title: 'The Illam Royal Retreat',
    malayalamTitle: 'ഇല്ലം റോയൽ സ്യൂട്ട്',
    tagline: 'A majestic high-ceiling wooden chamber honouring ancient Kerala Illam manor architecture',
    badge: 'ROYAL HERITAGE',
    sqft: 1050,
    sqm: 98,
    occupancy: '2 – 3 Guests',
    bed: 'Antique Rosewood King Bed',
    view: 'Emerald Coconut Groves & Estate Vista',
    leadImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
      '/images/weddings/architecture-corridor.jpg',
      '/images/weddings/varikkasseri.jpg',
    ],
    description:
      'Echoing the aristocratic grace of Travancore and Malabar manors, the Illam Royal Retreat features high terracotta gables, intricately fluted wooden brackets, and antique cane planter chairs where hours drift by in unhurried contemplation.',
    architectureDetails:
      'Double-height ceiling structure with interlocking aged rosewood joinery and hand-pressed terracotta floor tiles that remain naturally cool even on the warmest tropical afternoons.',
    highlights: [
      'Soaring timber gabled ceilings with antique brass ceiling pendants',
      'Private cantilevered balcony overlooking coconut palm canopies',
      'Free-standing copper soaking tub with mountain water supply',
      'Ancestral daybed (Thinnai) for reading and quiet reflection',
    ],
    inclusions: [
      'Daily personalized chef breakfast consultation',
      'Evening temple sunset walkthrough in Guruvayoor with private guide',
      'Pure brass tea service with organic Kerala estate spices',
      'Full concierge privileges and late check-out priority',
    ],
  },
  {
    id: 'thinnai-veranda-suite',
    category: 'suites',
    categoryName: 'Heritage Suites',
    title: 'The Thinnai Breezeway Suite',
    malayalamTitle: 'തിണ്ണ വരാന്ത സ്യൂട്ട്',
    tagline: 'Named after the iconic Idanazhi breezeway corridor that unites family life with nature',
    badge: 'BREEZEWAY LIVING',
    sqft: 950,
    sqm: 88,
    occupancy: '2 – 4 Guests',
    bed: 'King Bed + Built-in Wooden Thinnai Daybed',
    view: 'Colonnaded Heritage Breezeway & Gardens',
    leadImage: '/images/weddings/architecture-corridor.jpg',
    gallery: [
      '/images/weddings/architecture-corridor.jpg',
      '/images/weddings/idanazhi-room.jpg',
      '/images/weddings/spaces/space-dinner-2.jpg',
    ],
    description:
      'Inspired by the defining feature of Idanazhi—the sheltered breezeway connecting quiet family chambers with open colonnades. This expansive suite incorporates an authentic raised wooden Thinnai daybed, perfect for afternoons spent listening to tropical rain.',
    architectureDetails:
      'Features carved round teakwood colonnade pillars and traditional tongue-and-groove timber paneling that allows natural air circulation without mechanical noise.',
    highlights: [
      'Expansive wooden colonnade veranda with antique cane armchairs',
      'Traditional built-in Thinnai platform cushioned with handwoven khadi',
      'Twin brass washbasins and outdoor garden-facing vanity',
      'Direct covered access to private dining courtyards and library',
    ],
    inclusions: [
      'Authentic Kerala morning Sadya breakfast on your private veranda',
      'Artisanal pottery tea service with homegrown ginger and cardamoms',
      'High-speed WiFi seamlessly woven into heritage wooden paneling',
      'Dedicated concierge for tailored wedding and celebration itineraries',
    ],
  },
  {
    id: 'machakam-garden-villa',
    category: 'villas',
    categoryName: 'Garden Villas',
    title: 'The Machakam Garden Villa',
    malayalamTitle: 'മച്ചകം ഗാർഡൻ വില്ല',
    tagline: 'Secluded private pool sanctuary nestled amidst fragrant organic spice groves and banyans',
    badge: 'PRIVATE PLUNGE POOL',
    sqft: 1450,
    sqm: 135,
    occupancy: '2 – 4 Guests',
    bed: 'Grand Heritage Teak King Bed',
    view: 'Private Enclosed Garden & Stone Plunge Pool',
    leadImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85',
      '/images/weddings/spaces/space-outdoor-1.jpg',
      '/images/weddings/kerala-courtyard-planter.jpg',
    ],
    description:
      'For those desiring complete privacy, the Machakam Garden Villa offers an isolated ancestral pavilion surrounded by lush bamboo and flowering champak trees. Step through your private courtyard into a cooling stone plunge pool fed by natural spring water.',
    architectureDetails:
      'Constructed with exposed laterite stone walls and reclaimed temple gateway timbers. Designed as a self-contained ecological haven with total acoustic privacy.',
    highlights: [
      'Private secluded walled courtyard with natural stone plunge pool',
      'Open-air rain shower set under lush tropical greenery',
      'Independent outdoor dining pavilion for private candlelit dinners',
      'Expansive walk-in wardrobe and luxury bridal preparation salon',
    ],
    inclusions: [
      'Dedicated 24/7 personal villa butler & private chef options',
      'Floating floral breakfast in your private plunge pool',
      'Private sunset yoga and Ayurvedic consultation session',
      'Round-trip luxury chauffeured transfer coordination',
    ],
  },
  {
    id: 'tharavadu-heritage-chamber',
    category: 'villas',
    categoryName: 'Garden Villas',
    title: 'The Tharavadu Heritage Chamber',
    malayalamTitle: 'തറവാട് ചേമ്പർ',
    tagline: 'Timeless ancestral intimacy and heritage warmth designed for quiet restorative rest',
    badge: 'ESTATE HIDEAWAY',
    sqft: 800,
    sqm: 74,
    occupancy: '2 Guests',
    bed: 'Four-Poster Rosewood King Bed',
    view: 'Reflecting Water Lily Pond & Inner Grove',
    leadImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=85',
      '/images/weddings/spaces/space-dinner-2.jpg',
      '/images/weddings/architecture-corridor.jpg',
    ],
    description:
      'A cherished corner of the estate that captures the pure simplicity of old Kerala Tharavadu homes. Soft linen drapes, hand-carved floral ceiling rosettes, and the gentle chime of temple bells across the groves make this an unforgettable retreat.',
    architectureDetails:
      'Acoustically shielded with double-thick laterite masonry and deep veranda eaves that protect against tropical glare while catching cooling breezes.',
    highlights: [
      'Hand-carved ceiling motifs and antique brass ornamental fittings',
      'River-pebble rain shower with natural skylight illumination',
      'Private sit-out overlooking a quiet water lily pond',
      'Bespoke Ayurvedic herbal pillow menu for restorative sleep',
    ],
    inclusions: [
      'Traditional Ayurvedic morning beverage ritual',
      'Farm-fresh Kerala country breakfast served on your sit-out',
      'Twilight oil lamp lighting service with sacred Vedic chants',
      'Complimentary access to the estate library and herbarium',
    ],
  },
];

const categoryTabs = [
  { id: 'all', label: 'All Sanctuaries' },
  { id: 'nalukettu', label: 'Nalukettu Courtyards' },
  { id: 'suites', label: 'Heritage Suites' },
  { id: 'villas', label: 'Garden Villas' },
] as const;

export default function TraditionalStayPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<TraditionalRoom | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const filteredRooms = useMemo(() => {
    if (activeTab === 'all') return traditionalRooms;
    return traditionalRooms.filter((r) => r.category === activeTab);
  }, [activeTab]);

  const openRoomDetail = (room: TraditionalRoom) => {
    setSelectedRoom(room);
    setActiveGalleryIndex(0);
  };

  return (
    <main className="min-h-screen bg-paper text-ink pt-[90px] pb-24 selection:bg-[#7C402E] selection:text-white">
      {/* Editorial Page Header & Hero Banner */}
      <section className="relative w-full border-b border-[#7C402E]/15 bg-gradient-to-b from-[#FAF4EC] via-paper to-paper py-14 sm:py-24 px-6 sm:px-12 overflow-hidden">
        {/* Subtle Decorative Background Motif */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(124,64,46,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(124,64,46,0.04),transparent_70%)] pointer-events-none" />

        <div className="max-w-[1320px] mx-auto flex flex-col items-center text-center relative z-10">
          {/* Breadcrumb Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#7C402E] hover:text-[#52291D] transition-colors mb-6 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Idanazhi Home
          </Link>

          <p className="m-0 mb-3 uppercase tracking-[0.28em] text-[10.5px] sm:text-[12px] font-semibold text-[#84382B]">
            HERITAGE LIVING · GURUVAYOOR, KERALA
          </p>

          <h1 className="font-serif uppercase text-[clamp(30px,4.2vw,58px)] font-normal leading-[1.12] tracking-[-0.02em] text-ink m-0 mb-6 max-w-[1020px]">
            Ancestral Timber Sanctuaries &amp; Courtyard Suites
          </h1>

          <p className="font-sans text-[16px] sm:text-[18.5px] text-[#5A3828] max-w-[760px] leading-relaxed m-0 mb-10 font-light">
            Conceived according to the ancient canons of Thachu Shastra and Nalukettu craftsmanship.
            Reclaimed aged teak, sacred rain-courts, open-sky baths, and private verandas that breathe with nature.
          </p>

          {/* Quick Booking HUD Strip */}
          <div className="w-full max-w-[960px] bg-paper/95 border border-[#7C402E]/25 shadow-xl backdrop-blur-md p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-left">
              <div>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7C402E]/80">
                  ESTATE LOCATION
                </span>
                <span className="font-serif text-[15px] sm:text-[16px] text-ink font-medium">
                  Guruvayoor, Kerala
                </span>
              </div>
              <div className="hidden sm:block h-8 w-[1px] bg-[#7C402E]/20" />
              <div>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7C402E]/80">
                  SANCTUARY TYPES
                </span>
                <span className="font-serif text-[15px] sm:text-[16px] text-ink font-medium">
                  6 Heritage Suites &amp; Villas
                </span>
              </div>
              <div className="hidden md:block h-8 w-[1px] bg-[#7C402E]/20" />
              <div className="hidden md:block">
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7C402E]/80">
                  AUTHENTIC LIVING
                </span>
                <span className="font-serif text-[15px] sm:text-[16px] text-ink font-medium">
                  100% Sattvic &amp; Ayurvedic
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="w-full sm:w-auto bg-[#7C402E] hover:bg-[#5E2B1D] text-white px-7 py-3 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              RESERVE A SUITE
            </button>
          </div>
        </div>
      </section>

      {/* Heritage Architectural Hallmarks Bar */}
      <section className="w-full bg-[#FAF4EC]/80 border-b border-[#7C402E]/10 py-5 px-6 sm:px-12">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4 text-center sm:text-left text-[#6E4232] text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.18em] font-medium">
          <div className="flex items-center gap-2">
            <Compass size={14} className="text-[#84382B]" />
            <span>Thachu Shastra Alignments</span>
          </div>
          <span className="hidden sm:inline text-[#7C402E]/30">•</span>
          <div className="flex items-center gap-2">
            <Droplets size={14} className="text-[#84382B]" />
            <span>Open-to-Sky Rain Courtyards</span>
          </div>
          <span className="hidden sm:inline text-[#7C402E]/30">•</span>
          <div className="flex items-center gap-2">
            <Trees size={14} className="text-[#84382B]" />
            <span>Reclaimed Aged Teak &amp; Rosewood</span>
          </div>
          <span className="hidden sm:inline text-[#7C402E]/30">•</span>
          <div className="flex items-center gap-2">
            <Coffee size={14} className="text-[#84382B]" />
            <span>Farm-to-Veranda Sadya Feasts</span>
          </div>
        </div>
      </section>

      {/* Main Rooms Showcase Section */}
      <section id="rooms" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#7C402E]/15">
          <div>
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#84382B] block mb-2">
              CURATED HERITAGE LIVING
            </span>
            <h2 className="font-serif text-[clamp(28px,3.2vw,44px)] font-normal text-ink m-0 tracking-tight">
              Select Your Sanctuary
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#FAF4EC] p-1.5 border border-[#7C402E]/20 rounded-full">
            {categoryTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2 text-[10.5px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.16em] rounded-full transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#7C402E] text-white shadow-sm'
                      : 'text-[#5A3828] hover:text-[#7C402E] bg-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Room Cards Grid (2-column luxury editorial layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14">
          {filteredRooms.map((room) => (
            <article
              key={room.id}
              className="group flex flex-col bg-paper border border-[#7C402E]/20 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Card Image Area with Zoom & Badges */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-[#2D1912]">
                <img
                  src={room.leadImage}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Top Badge */}
                {room.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#FAF4EC]/95 text-[#4E2418] text-[9.5px] font-sans font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 border border-[#7C402E]/30 shadow-sm backdrop-blur-sm">
                      {room.badge}
                    </span>
                  </div>
                )}

                {/* Bottom Overlay on Image: Title & Malayalam Name */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-white/80 block mb-1">
                      {room.categoryName}
                    </span>
                    <h3 className="font-serif text-[24px] sm:text-[28px] font-normal m-0 leading-tight drop-shadow-sm">
                      {room.title}
                    </h3>
                  </div>
                  <span className="font-sans text-[12px] text-white/70 italic hidden sm:block shrink-0">
                    {room.malayalamTitle}
                  </span>
                </div>
              </div>

              {/* Card Content & Specifications */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  {/* Metric Chips Bar */}
                  <div className="grid grid-cols-3 gap-2 pb-5 mb-5 border-b border-[#7C402E]/15 text-center text-[#5A3828]">
                    <div className="flex flex-col items-center">
                      <Maximize2 size={15} className="text-[#84382B] mb-1" />
                      <span className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-muted">
                        SPACE
                      </span>
                      <strong className="text-[12.5px] font-serif font-medium text-ink">
                        {room.sqft} SQ FT
                      </strong>
                    </div>

                    <div className="flex flex-col items-center border-l border-r border-[#7C402E]/15 px-2">
                      <BedDouble size={15} className="text-[#84382B] mb-1" />
                      <span className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-muted">
                        BEDDING
                      </span>
                      <strong className="text-[12.5px] font-serif font-medium text-ink truncate w-full text-center">
                        {room.bed.split(' ')[0]} {room.bed.split(' ')[1]}
                      </strong>
                    </div>

                    <div className="flex flex-col items-center">
                      <Users size={15} className="text-[#84382B] mb-1" />
                      <span className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-muted">
                        CAPACITY
                      </span>
                      <strong className="text-[12.5px] font-serif font-medium text-ink">
                        {room.occupancy}
                      </strong>
                    </div>
                  </div>

                  {/* Room Description */}
                  <p className="font-sans text-[14px] text-[#5A3828] leading-relaxed mb-6 font-light">
                    {room.tagline}.
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    {room.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[12.5px] text-[#4A2618]">
                        <Check size={14} className="text-[#84382B] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-5 border-t border-[#7C402E]/15 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingOpen(true);
                    }}
                    className="flex-1 bg-[#7C402E] hover:bg-[#5E2B1D] text-white py-3 px-4 text-[10.5px] font-sans font-semibold tracking-[0.18em] uppercase transition-all text-center cursor-pointer shadow-sm active:scale-95"
                  >
                    RESERVE SANCTUARY
                  </button>

                  <button
                    type="button"
                    onClick={() => openRoomDetail(room)}
                    className="border border-[#7C402E]/35 text-[#4E2418] hover:bg-[#7C402E]/10 py-3 px-4 text-[10.5px] font-sans font-semibold tracking-[0.16em] uppercase transition-all text-center cursor-pointer"
                  >
                    CHAMBER STORY
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Traditional Kerala Heritage Architecture Feature Section */}
      <section className="w-full bg-[#FAF4EC] border-t border-b border-[#7C402E]/15 py-16 sm:py-24 px-6 sm:px-12">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#84382B] block mb-2.5">
              THE SCIENCE OF NALUKETTU
            </span>
            <h2 className="font-serif text-[clamp(28px,3.4vw,46px)] font-normal text-ink m-0 leading-tight mb-6">
              Architecture that Breathes with the Tropical Monsoon
            </h2>
            <p className="font-sans text-[15px] sm:text-[16px] text-[#5A3828] leading-relaxed mb-6 font-light">
              In modern construction, walls are designed to seal nature out. At Idanazhi, our suites are crafted according to the ancient Thachu Shastra guidelines—where sunlight, tropical breezes, and rain are welcomed as living elements of hospitality.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#7C402E]/10 text-[#7C402E] flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets size={15} />
                </div>
                <div>
                  <h4 className="font-serif text-[17px] font-medium text-ink m-0 mb-1">
                    The Central Nadumuttam Rain Court
                  </h4>
                  <p className="font-sans text-[13.5px] text-muted m-0 leading-normal font-light">
                    An open-to-sky central courtyard that draws cooling drafts down and allows tropical monsoons to cascade naturally into the stone planter.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#7C402E]/10 text-[#7C402E] flex items-center justify-center shrink-0 mt-0.5">
                  <Trees size={15} />
                </div>
                <div>
                  <h4 className="font-serif text-[17px] font-medium text-ink m-0 mb-1">
                    Seasoned Reclaimed Teak &amp; Rosewood
                  </h4>
                  <p className="font-sans text-[13.5px] text-muted m-0 leading-normal font-light">
                    Hand-carved pillars and high gabled terracotta tile roofs that release warm air and keep chambers naturally temperate year-round.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#7C402E]/10 text-[#7C402E] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={15} />
                </div>
                <div>
                  <h4 className="font-serif text-[17px] font-medium text-ink m-0 mb-1">
                    Authentic Kerala Sattvic Dining &amp; Sadya
                  </h4>
                  <p className="font-sans text-[13.5px] text-muted m-0 leading-normal font-light">
                    Every stay includes traditional culinary experiences served on fresh emerald plantain leaves in our shaded dining verandahs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#7C402E]/20 shadow-lg">
              <img
                src="/images/weddings/architecture-corridor.jpg"
                alt="Idanazhi traditional carved wooden breezeway colonnade"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-sans tracking-widest uppercase">
                THE IDANAZHI CORRIDOR
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#7C402E]/20 shadow-lg">
                <img
                  src="/images/weddings/kerala-courtyard-planter.jpg"
                  alt="Open-to-sky central Nalukettu rain court with sacred Tulasi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-sans tracking-widest uppercase">
                  THE NADUMUTTAM
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#7C402E]/20 shadow-lg">
                <img
                  src="/images/experiences/savour-dining.jpg"
                  alt="Authentic veranda Sadya dining at Idanazhi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-sans tracking-widest uppercase">
                  VERANDA DINING
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Experience & Inclusions Grid */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#84382B] block mb-2">
            EVERY SANCTUARY INCLUDES
          </span>
          <h2 className="font-serif text-[clamp(28px,3.2vw,44px)] font-normal text-ink m-0 tracking-tight mb-4">
            The Idanazhi Hospitality Standard
          </h2>
          <p className="font-sans text-[15px] text-[#5A3828] font-light leading-relaxed m-0">
            Thoughtful heritage privileges included with every overnight stay to ensure effortless grace, peace of mind, and restorative wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 bg-[#FAF4EC]/60 border border-[#7C402E]/15 flex flex-col justify-start">
            <Coffee size={24} className="text-[#84382B] mb-4" />
            <h3 className="font-serif text-[20px] font-normal text-ink m-0 mb-2">
              Sattvic Morning Sadya
            </h3>
            <p className="font-sans text-[13px] text-muted m-0 font-light leading-relaxed">
              Wholesome heirloom Kerala breakfast prepared with organic produce from our groves, served on banana leaves.
            </p>
          </div>

          <div className="p-7 bg-[#FAF4EC]/60 border border-[#7C402E]/15 flex flex-col justify-start">
            <Sparkles size={24} className="text-[#84382B] mb-4" />
            <h3 className="font-serif text-[20px] font-normal text-ink m-0 mb-2">
              Twilight Vilakku Ritual
            </h3>
            <p className="font-sans text-[13px] text-muted m-0 font-light leading-relaxed">
              Daily lighting of auspicious brass Nilavilakku lamps with pure ghee and fresh marigolds across all corridors.
            </p>
          </div>

          <div className="p-7 bg-[#FAF4EC]/60 border border-[#7C402E]/15 flex flex-col justify-start">
            <HeartHandshake size={24} className="text-[#84382B] mb-4" />
            <h3 className="font-serif text-[20px] font-normal text-ink m-0 mb-2">
              Dedicated Heritage Butler
            </h3>
            <p className="font-sans text-[13px] text-muted m-0 font-light leading-relaxed">
              Attentive personal care assisting with itinerary planning, bridal room preparations, and private dining.
            </p>
          </div>

          <div className="p-7 bg-[#FAF4EC]/60 border border-[#7C402E]/15 flex flex-col justify-start">
            <ShieldCheck size={24} className="text-[#84382B] mb-4" />
            <h3 className="font-serif text-[20px] font-normal text-ink m-0 mb-2">
              Ayurvedic Elixirs
            </h3>
            <p className="font-sans text-[13px] text-muted m-0 font-light leading-relaxed">
              In-suite herbal bath formulations, Ramacham vetiver infusions, and calming bedtime tisanes.
            </p>
          </div>
        </div>
      </section>

      {/* Stay Guidelines & Enquiries Accordion Strip */}
      <section className="w-full bg-[#FAF4EC] border-t border-b border-[#7C402E]/15 py-16 px-6 sm:px-12">
        <div className="max-w-[1080px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#84382B] block mb-1.5">
              ESSENTIAL INFORMATION
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] font-normal text-ink m-0">
              Chamber Guidelines &amp; Enquiries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#4E2418]">
            <div className="p-6 bg-paper border border-[#7C402E]/20">
              <strong className="block font-serif text-[18px] mb-1.5 text-ink">
                Check-in &amp; Check-out Timings
              </strong>
              <p className="text-[13.5px] text-[#5A3828] font-light leading-relaxed m-0">
                Check-in is welcomed from 14:00 onwards. Check-out is at 11:00. Early arrival or unhurried late departure may be coordinated with our concierge based on availability.
              </p>
            </div>

            <div className="p-6 bg-paper border border-[#7C402E]/20">
              <strong className="block font-serif text-[18px] mb-1.5 text-ink">
                Wedding &amp; Celebration Takeovers
              </strong>
              <p className="text-[13.5px] text-[#5A3828] font-light leading-relaxed m-0">
                For destination weddings and family ceremonies, Idanazhi offers exclusive estate buyouts accommodating 60 to 80 residential guests across all suites with private event coordination.
              </p>
            </div>

            <div className="p-6 bg-paper border border-[#7C402E]/20">
              <strong className="block font-serif text-[18px] mb-1.5 text-ink">
                Pure Vegetarian &amp; Dietary Requests
              </strong>
              <p className="text-[13.5px] text-[#5A3828] font-light leading-relaxed m-0">
                Our kitchen operates strictly according to authentic traditional standards. Pure vegetarian, Sattvic, Jain, and gluten-free dietary requirements are handled with utmost devotion and hygiene.
              </p>
            </div>

            <div className="p-6 bg-paper border border-[#7C402E]/20">
              <strong className="block font-serif text-[18px] mb-1.5 text-ink">
                Chauffeur Airport Pickups
              </strong>
              <p className="text-[13.5px] text-[#5A3828] font-light leading-relaxed m-0">
                Private transfers from Cochin International Airport (75–85 min) and Calicut Airport (70 min) can be reserved directly with our estate concierge team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Bottom Call to Action */}
      <section className="w-full py-16 sm:py-24 px-6 sm:px-12 text-center bg-paper">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[11px] font-semibold text-[#84382B]">
            EXPERIENCE THE SACRED THRESHOLD
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,52px)] font-normal text-ink m-0 mb-6 leading-tight">
            Reserve Your Sanctuary at Idanazhi
          </h2>
          <p className="font-sans text-[16px] text-[#5A3828] font-light leading-relaxed m-0 mb-9 max-w-[620px]">
            Whether joining us for an intimate destination wedding, ancestral contemplation, or unhurried family holidays, let us prepare your chamber with unmatched grace.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="bg-[#7C402E] hover:bg-[#5E2B1D] text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95"
            >
              BOOK YOUR STAY
            </button>
            <a
              href="mailto:hello@idanazhi.com"
              className="border border-[#7C402E]/35 text-[#4E2418] hover:bg-[#7C402E]/10 px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all"
            >
              SPEAK TO CONCIERGE
            </a>
          </div>
        </div>
      </section>

      {/* Chamber Story & Detail Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="bg-paper text-ink max-w-[880px] w-full border border-[#7C402E]/30 shadow-2xl relative overflow-hidden my-8 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                type="button"
                onClick={() => setSelectedRoom(null)}
                aria-label="Close suite details"
                className="absolute top-4 right-4 z-20 bg-paper/90 hover:bg-paper text-ink p-2 rounded-full border border-[#7C402E]/30 shadow-md cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
                {/* Image Gallery Viewer */}
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/10 border border-[#7C402E]/20 mb-3">
                    <img
                      src={selectedRoom.gallery[activeGalleryIndex] || selectedRoom.leadImage}
                      alt={selectedRoom.title}
                      className="w-full h-full object-cover"
                    />
                    {selectedRoom.badge && (
                      <span className="absolute top-3 left-3 bg-[#FAF4EC]/95 text-[#4E2418] text-[9.5px] font-sans font-bold uppercase tracking-[0.2em] px-3 py-1 border border-[#7C402E]/30">
                        {selectedRoom.badge}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {selectedRoom.gallery.length > 1 && (
                    <div className="flex gap-2.5">
                      {selectedRoom.gallery.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveGalleryIndex(i)}
                          className={`relative aspect-[16/10] w-20 overflow-hidden border cursor-pointer transition-all ${
                            activeGalleryIndex === i
                              ? 'border-[#7C402E] ring-2 ring-[#7C402E]/40'
                              : 'border-transparent opacity-65 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Header Info */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#84382B]">
                      {selectedRoom.categoryName}
                    </span>
                    <span className="text-[14px] font-sans text-muted italic">
                      {selectedRoom.malayalamTitle}
                    </span>
                  </div>
                  <h3 className="font-serif text-[28px] sm:text-[34px] font-normal text-ink m-0 mb-3">
                    {selectedRoom.title}
                  </h3>
                  <p className="font-sans text-[15px] text-[#5A3828] leading-relaxed font-light m-0">
                    {selectedRoom.description}
                  </p>
                </div>

                {/* Architecture & Specifications */}
                <div className="p-5 bg-[#FAF4EC] border border-[#7C402E]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <span className="block text-[10px] font-sans uppercase tracking-[0.16em] text-muted mb-0.5">
                      AREA
                    </span>
                    <strong className="text-[14px] font-serif text-ink">{selectedRoom.sqft} SQ FT</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans uppercase tracking-[0.16em] text-muted mb-0.5">
                      BED
                    </span>
                    <strong className="text-[14px] font-serif text-ink">{selectedRoom.bed.split(' ')[0]} King</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans uppercase tracking-[0.16em] text-muted mb-0.5">
                      CAPACITY
                    </span>
                    <strong className="text-[14px] font-serif text-ink">{selectedRoom.occupancy}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans uppercase tracking-[0.16em] text-muted mb-0.5">
                      VIEW
                    </span>
                    <strong className="text-[14px] font-serif text-ink truncate block">Courtyard</strong>
                  </div>
                </div>

                {/* Traditional Inclusions */}
                <div>
                  <h4 className="font-serif text-[20px] font-normal text-ink m-0 mb-4 pb-2 border-b border-[#7C402E]/15">
                    Traditional Suite Inclusions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedRoom.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#4E2418]">
                        <Check size={15} className="text-[#84382B] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="pt-6 border-t border-[#7C402E]/15 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-muted block">
                      RESERVATIONS &amp; ENQUIRIES
                    </span>
                    <span className="font-serif text-[17px] text-[#7C402E] font-medium">
                      Bespoke Guruvayoor Hospitality
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRoom(null);
                      setBookingOpen(true);
                    }}
                    className="bg-[#7C402E] hover:bg-[#5E2B1D] text-white px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all shadow-md cursor-pointer"
                  >
                    RESERVE THIS SUITE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Panel Modal */}
      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </main>
  );
}
