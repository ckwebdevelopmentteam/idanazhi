'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  Phone,
  Mail,
  Check,
} from 'lucide-react';
import { BookingPanel } from '@/components/sections/booking-panel';

export interface RoomItem {
  id: string;
  category: 'courtyard' | 'villas';
  categoryLabel: string;
  number: string;
  totalRooms: string;
  title: string;
  kicker: string;
  sqft: number;
  occupancy: string;
  bed: string;
  mainImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  buttonText: string;
  buttonAction: 'booking' | 'details';
  secondaryText: string;
  secondaryType: 'concierge' | 'details';
  architectureStory?: string;
  amenities?: string[];
}

export interface FacilityItem {
  id: string;
  category: string;
  heading: string;
  description: string;
  image: string;
  ctaText: string;
  ctaHref?: string;
  isConcierge?: boolean;
}

const roomsData: RoomItem[] = [
  {
    id: 'nalukettu-suite',
    category: 'courtyard',
    categoryLabel: 'Heritage Suite',
    number: '01',
    totalRooms: '03',
    title: 'The Nalukettu Master Suite',
    kicker: 'HERITAGE SUITE · MAIN NALUKETTU',
    sqft: 1200,
    occupancy: '2 – 4 Guests',
    bed: 'King-size Bed',
    mainImage: '/images/weddings/spaces/stay1.png',
    gallery: [
      '/images/weddings/spaces/stay1.png',
      '/images/weddings/spaces/stay2.png',
      '/images/weddings/spaces/stay3.png',
    ],
    description:
      'A spacious suite located in the main ancestral Nalukettu of our compound, featuring traditional wooden architecture, exposed rafters, elegant interiors, and a comfortable setting for a relaxing stay.',
    highlights: [
      'Air conditioning',
      'Attached bathroom',
      'Hot water',
      'King-size bed',
      'Wi-Fi',
      'Room service',
    ],
    buttonText: 'RESERVE THIS SUITE',
    buttonAction: 'booking',
    secondaryText: 'ENQUIRE NOW',
    secondaryType: 'concierge',
    architectureStory:
      'Crafted according to classical Kerala wooden architecture principles in the main house, featuring hand-carved pillars, spacious timber ceilings, and peaceful courtyard views that preserve an authentic ancestral character within our single compound.',
    amenities: [
      'Air conditioning',
      'Attached bathroom',
      'Hot water',
      'King-size bed',
      'Wi-Fi',
      'Room service',
    ],
  },
  {
    id: 'nadumuttam-chamber',
    category: 'courtyard',
    categoryLabel: 'Traditional Room',
    number: '02',
    totalRooms: '03',
    title: 'The Nadumuttam Chamber',
    kicker: 'TRADITIONAL ROOM · COURTYARD ENCLAVE',
    sqft: 850,
    occupancy: '2 Guests',
    bed: 'Comfortable Heritage Bed',
    mainImage: '/images/weddings/spaces/stay3.png',
    gallery: [
      '/images/weddings/spaces/stay3.png',
      '/images/weddings/spaces/stay1.png',
      '/images/weddings/spaces/stay2.png',
    ],
    description:
      'Opening directly onto the open-to-sky central courtyard of the compound, this room offers a calm atmosphere with heritage-inspired architecture and comfortable accommodation.',
    highlights: [
      'Air conditioning',
      'Attached bathroom',
      'Hot water',
      'Comfortable bed',
      'Wi-Fi',
      'Daily housekeeping',
    ],
    buttonText: 'RESERVE THIS ROOM',
    buttonAction: 'booking',
    secondaryText: 'VIEW DETAILS',
    secondaryType: 'details',
    architectureStory:
      'Centered directly along the tranquil open-air courtyard breezeways within our single estate, framing warm terracotta elements and natural light for a meditative and restorative stay.',
    amenities: [
      'Air conditioning',
      'Attached bathroom',
      'Hot water',
      'Comfortable bed',
      'Wi-Fi',
      'Daily housekeeping',
    ],
  },
  {
    id: 'garden-villa',
    category: 'villas',
    categoryLabel: 'Garden Villa',
    number: '03',
    totalRooms: '03',
    title: 'The Garden Villa',
    kicker: 'PRIVATE SUITE · COMPOUND GARDEN GROUNDS',
    sqft: 1450,
    occupancy: '2 – 4 Guests',
    bed: 'Comfortable Villa Bed',
    mainImage: '/images/weddings/spaces/stay2.png',
    gallery: [
      '/images/weddings/spaces/stay2.png',
      '/images/weddings/spaces/stay3.png',
      '/images/weddings/spaces/stay1.png',
    ],
    description:
      'Nestled within the lush garden grounds of our private compound, with comfortable interiors and a welcoming atmosphere for guests seeking a peaceful getaway.',
    highlights: [
      'Air conditioning',
      'Attached bathroom',
      'Hot water',
      'Comfortable bed',
      'Wi-Fi',
      'Room service',
    ],
    buttonText: 'EXPLORE VILLA',
    buttonAction: 'details',
    secondaryText: 'ENQUIRE NOW',
    secondaryType: 'concierge',
    architectureStory:
      'Tucked amid tropical foliage, bamboo, and fragrant flowering plants within the Idanazhi estate boundary, offering quiet privacy, spacious shaded verandas, and natural garden serenity just steps from the central courtyard and pool.',
    amenities: [
      'Air conditioning',
      'Attached bathroom',
      'Hot water',
      'Comfortable bed',
      'Wi-Fi',
      'Room service',
    ],
  },
];

const additionalFacilities: FacilityItem[] = [
  {
    id: 'swimming-pool',
    category: 'Swimming pool',
    heading: 'Private Swimming Pool',
    description: 'A serene open-air pool located within the private garden walls of our compound.',
    image: '/images/stay/swimming-pool.jpg',
    ctaText: 'Enquire via concierge',
    isConcierge: true,
  },
  {
    id: 'dining',
    category: 'Dining',
    heading: 'Traditional Dining Hall',
    description: 'Savour authentic Kerala meals and flavours prepared fresh right on the estate.',
    image: '/images/experiences/kerala-sadhya-dining.jpg',
    ctaText: 'Enquire via concierge',
    isConcierge: true,
  },
  {
    id: 'garden',
    category: 'Garden',
    heading: 'Lush Estate Grounds',
    description: 'Stroll through private green lawns and tropical coconut groves surrounding the rooms.',
    image: '/images/weddings/spaces/space-outdoor-1.jpg',
    ctaText: 'Explore outdoor grounds',
    isConcierge: true,
  },
  {
    id: 'events',
    category: 'Events',
    heading: 'Celebration Lawns & Mandapam',
    description: 'Dedicated open-air celebration venues right here on our single property.',
    image: '/images/weddings/stage-heritage-mandapam.jpg',
    ctaText: 'Explore celebrations venue',
    ctaHref: '/celebrations',
  },
  {
    id: 'guest-services',
    category: 'Guest services',
    heading: 'Dedicated Estate Concierge',
    description: 'Personalized, warm hospitality tailored specifically to your stay in our private compound.',
    image: '/images/stay/heritage-veranda-hero.jpg',
    ctaText: 'Speak to concierge',
    isConcierge: true,
  },
];

// Botanical Leaf Bullet Icon
function BotanicalLeafIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-3.5 h-3.5 text-[#8B4836] shrink-0 mt-[1px]"
      aria-hidden="true"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
    </svg>
  );
}

// Crisp Spec Icons
function SquareSpecIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6E2E1D] shrink-0"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  );
}

function BedSpecIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6E2E1D] shrink-0"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 19h20M2 19V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11M2 14h20M6 10h4M14 10h4"
      />
    </svg>
  );
}

function UsersSpecIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6E2E1D] shrink-0"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </svg>
  );
}

export default function TraditionalStayPage() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'nalukettu-suite' | 'nadumuttam-chamber' | 'garden-villa'
  >('all');
  const [activeImages, setActiveImages] = useState<Record<string, string>>({});
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState<RoomItem | null>(null);
  const [conciergeModalRoom, setConciergeModalRoom] = useState<{
    title: string;
    kicker?: string;
    description?: string;
  } | null>(null);

  const filteredRooms = useMemo(() => {
    if (activeTab === 'all') return roomsData;
    return roomsData.filter((r) => r.id === activeTab);
  }, [activeTab]);

  const handleSelectThumbnail = (roomId: string, imageSrc: string) => {
    setActiveImages((prev) => ({
      ...prev,
      [roomId]: imageSrc,
    }));
  };

  const scrollToRoom = (index: number) => {
    const target = document.getElementById(`room-card-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePrimaryButtonClick = (room: RoomItem) => {
    if (room.buttonAction === 'details') {
      setSelectedRoomDetails(room);
    } else {
      setBookingOpen(true);
    }
  };

  const handleFacilityAction = (facility: FacilityItem) => {
    if (facility.isConcierge) {
      setConciergeModalRoom({
        title: facility.heading,
        kicker: facility.category.toUpperCase(),
        description: facility.description,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1C1917] pt-[76px] sm:pt-[85px] lg:pt-[95px] selection:bg-[#6E2E1D] selection:text-white overflow-x-hidden">
      {/* Editorial Hero Section */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-start lg:items-stretch">
          {/* Left Column: Back Link, Kicker, Title, Description, and Underlined Filter Tabs */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Back to Home Link with Subtle Hairline Divider */}
              <div className="pb-2.5 sm:pb-3 border-b border-[#E6DFD5] mb-5 sm:mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.2em] sm:tracking-[0.22em] uppercase text-[#6E2E1D] hover:text-[#441C11] transition-colors group"
                >
                  <span className="transition-transform duration-200 group-hover:-translate-x-1">
                    ←
                  </span>
                  <span>BACK TO HOME</span>
                </Link>
              </div>

              {/* Kicker */}
              <p className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#8B4836] m-0 mb-2 sm:mb-2.5">
                SINGLE HERITAGE RESORT COMPOUND · GURUVAYOOR
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-[clamp(28px,4.5vw,54px)] font-normal text-[#1C1917] leading-[1.08] tracking-[-0.01em] m-0 mb-3 sm:mb-4">
                Chambers &amp; Suites
              </h1>

              {/* Description */}
              <p className="font-sans font-light text-[13.5px] sm:text-[15px] leading-[1.65] text-[#554B43] m-0 mb-6 sm:mb-8 max-w-[480px]">
                An intimate ancestral farm stay in Guruvayoor. Experience authentic wooden
                craftsmanship, peaceful courtyards, our 3 exclusive guest chambers, swimming pool,
                and celebration grounds — all within one unified private compound.
              </p>
            </div>

            {/* Filter Tabs with Active Underline Bar - Direct chamber selectors */}
            <div className="flex items-center gap-3 sm:gap-5 lg:gap-6 pt-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 mt-4 lg:mt-auto">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`shrink-0 relative pb-2 text-[10.5px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'text-[#1C1917]'
                    : 'text-[#7A6E65] hover:text-[#1C1917]'
                }`}
              >
                <span>ALL 3 CHAMBERS</span>
                {activeTab === 'all' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6E2E1D]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('nalukettu-suite')}
                className={`shrink-0 relative pb-2 text-[10.5px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors cursor-pointer ${
                  activeTab === 'nalukettu-suite'
                    ? 'text-[#1C1917]'
                    : 'text-[#7A6E65] hover:text-[#1C1917]'
                }`}
              >
                <span>01. MASTER SUITE</span>
                {activeTab === 'nalukettu-suite' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6E2E1D]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('nadumuttam-chamber')}
                className={`shrink-0 relative pb-2 text-[10.5px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors cursor-pointer ${
                  activeTab === 'nadumuttam-chamber'
                    ? 'text-[#1C1917]'
                    : 'text-[#7A6E65] hover:text-[#1C1917]'
                }`}
              >
                <span>02. NADUMUTTAM</span>
                {activeTab === 'nadumuttam-chamber' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6E2E1D]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('garden-villa')}
                className={`shrink-0 relative pb-2 text-[10.5px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors cursor-pointer ${
                  activeTab === 'garden-villa'
                    ? 'text-[#1C1917]'
                    : 'text-[#7A6E65] hover:text-[#1C1917]'
                }`}
              >
                <span>03. GARDEN VILLA</span>
                {activeTab === 'garden-villa' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6E2E1D]" />
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Hero Veranda Photograph with Teak Pillars and Planter Chair */}
          <div className="lg:col-span-7 relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#2D1912] rounded-xs shadow-xs">
            <img
              src="/images/stay/heritage-veranda-hero.jpg"
              alt="Traditional Kerala Nalukettu veranda with carved teakwood pillars and planter chair"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* Room Showcase Sections - Alternating Layout with Thumbnails & Exact Typography */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24 space-y-12 sm:space-y-16 lg:space-y-24">
        {filteredRooms.map((room, roomIdx) => {
          const isEven = roomIdx % 2 === 1; // Alternating layout on desktop
          const currentMain = activeImages[room.id] || room.mainImage;
          const prevIndex = roomIdx > 0 ? roomIdx - 1 : filteredRooms.length - 1;
          const nextIndex = roomIdx < filteredRooms.length - 1 ? roomIdx + 1 : 0;

          return (
            <article
              key={room.id}
              id={`room-card-${roomIdx}`}
              className="w-full pt-8 sm:pt-12 lg:pt-14 border-t border-[#E6DFD5] scroll-mt-24 sm:scroll-mt-28"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-start">
                {/* Image Column - Always first on mobile/tablet, alternating on lg */}
                <div
                  className={`lg:col-span-6 flex flex-col ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Main Display Image - Exact 4:3 native ratio */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#261711] rounded-xs shadow-xs">
                    <img
                      src={currentMain}
                      alt={room.title}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>

                  {/* Interactive Thumbnails in a Row */}
                  {room.gallery && room.gallery.length > 0 && (
                    <div
                      className={`grid ${
                        room.gallery.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                      } gap-2 sm:gap-2.5 md:gap-3 mt-2.5 sm:mt-3`}
                    >
                      {room.gallery.slice(0, 4).map((thumb, tIdx) => {
                        const isSelected = currentMain === thumb;
                        return (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => handleSelectThumbnail(room.id, thumb)}
                            className={`relative aspect-[4/3] overflow-hidden bg-[#261711] rounded-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'ring-2 ring-[#6E2E1D] opacity-100'
                                : 'opacity-70 hover:opacity-100'
                            }`}
                            aria-label={`View image ${tIdx + 1} of ${room.title}`}
                          >
                            <img
                              src={thumb}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Details Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-between h-full ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    {/* Top Row: Room Counter 01 / 03 & Arrow Controls */}
                    <div className="flex items-center justify-between pb-2.5 sm:pb-3">
                      <div className="font-sans text-[11px] sm:text-[12px] font-semibold text-[#1C1917] tracking-[0.1em]">
                        <span>{room.number}</span>
                        <span className="text-[#8C7E74] font-normal mx-1.5">/</span>
                        <span className="text-[#8C7E74] font-normal">{room.totalRooms}</span>
                      </div>

                      {/* Circular Navigation Arrow Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => scrollToRoom(prevIndex)}
                          aria-label="Previous room"
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D5C9B8] flex items-center justify-center text-[#4A3E37] hover:border-[#6E2E1D] hover:text-[#6E2E1D] transition-colors cursor-pointer"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollToRoom(nextIndex)}
                          aria-label="Next room"
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D5C9B8] flex items-center justify-center text-[#4A3E37] hover:border-[#6E2E1D] hover:text-[#6E2E1D] transition-colors cursor-pointer"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Room Kicker / Tagline */}
                    <p className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8B4836] m-0 mb-1.5 sm:mb-2">
                      {room.kicker}
                    </p>

                    {/* Room Title */}
                    <h2 className="font-serif text-[24px] sm:text-[30px] lg:text-[36px] font-normal text-[#1C1917] leading-[1.12] m-0 mb-3 sm:mb-3.5">
                      {room.title}
                    </h2>

                    {/* Description */}
                    <p className="font-sans font-light text-[13px] sm:text-[14.5px] text-[#554B43] leading-[1.65] m-0 mb-4 sm:mb-5">
                      {room.description}
                    </p>

                    {/* Specifications: Responsive 3-Col Grid on Mobile, Flex on Tablet/Desktop */}
                    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-6 lg:gap-7 my-3.5 sm:my-4 py-2 sm:py-2.5 text-[11.5px] sm:text-[13px] font-sans text-[#4A3E37] border-y border-[#E6DFD5]/80">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                        <SquareSpecIcon />
                        <span className="whitespace-nowrap">{room.sqft.toLocaleString()} sq.ft</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                        <BedSpecIcon />
                        <span className="truncate">{room.bed}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                        <UsersSpecIcon />
                        <span className="whitespace-nowrap">{room.occupancy}</span>
                      </div>
                    </div>

                    {/* Room Details Checklist Header & Responsive Grid */}
                    <div className="my-4 sm:my-5">
                      <p className="text-[10.5px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8B4836] m-0 mb-2.5 sm:mb-3">
                        Room details
                      </p>
                      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-y-2 sm:gap-y-2.5 gap-x-4 text-[12.5px] sm:text-[13px] font-sans text-[#3A2E27]">
                        {room.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2">
                            <BotanicalLeafIcon />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row: Touch-Friendly Buttons */}
                  <div className="pt-3 sm:pt-4 flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-3.5 sm:gap-6">
                    <button
                      type="button"
                      onClick={() => handlePrimaryButtonClick(room)}
                      className="w-full min-[420px]:w-auto bg-[#6E2E1D] hover:bg-[#582315] text-white px-6 sm:px-7 py-3 rounded-md text-[11px] font-sans font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-sm active:scale-95"
                    >
                      <span>{room.buttonText}</span>
                      <ArrowRight size={13} />
                    </button>

                    {room.secondaryType === 'concierge' ? (
                      <button
                        type="button"
                        onClick={() =>
                          setConciergeModalRoom({
                            title: room.title,
                            kicker: room.kicker,
                            description: room.description,
                          })
                        }
                        className="text-center min-[420px]:text-left text-[12px] sm:text-[12.5px] font-sans font-normal text-[#1C1917] hover:text-[#6E2E1D] underline underline-offset-4 decoration-[#6E2E1D]/50 transition-colors cursor-pointer py-1"
                      >
                        {room.secondaryText}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedRoomDetails(room)}
                        className="text-center min-[420px]:text-left text-[12px] sm:text-[12.5px] font-sans font-normal text-[#1C1917] hover:text-[#6E2E1D] underline underline-offset-4 decoration-[#6E2E1D]/50 transition-colors cursor-pointer py-1"
                      >
                        {room.secondaryText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Additional Facilities Section - 100% Responsive Multi-Column Grid */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-10 sm:pb-16 lg:pb-20 border-t border-[#E6DFD5] pt-10 sm:pt-14 lg:pt-18">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-[620px]">
            <p className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8B4836] m-0 mb-2 sm:mb-3">
              WITHIN OUR PRIVATE COMPOUND
            </p>
            <h2 className="font-serif text-[clamp(26px,3.8vw,44px)] font-normal text-[#1C1917] leading-[1.14] m-0 mb-2.5 sm:mb-3.5">
              Compound Facilities &amp; Grounds
            </h2>
            <p className="font-sans font-light text-[13px] sm:text-[15px] text-[#554B43] leading-[1.65] m-0">
              All facilities are situated together within our single private estate in Guruvayoor —
              step directly from your chamber to the pool, dining hall, open courtyard, and lush
              celebration lawns.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="w-full sm:w-auto self-start md:self-auto bg-[#6E2E1D] hover:bg-[#582315] text-white px-6 py-3 rounded-md text-[11px] font-sans font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-95"
          >
            <span>RESERVE YOUR STAY</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 5 Cards Balanced Responsive Grid:
            - Mobile (< 640px): 1 column
            - Tablet (640px - 1023px): 2 columns, with 5th card spanning 2 columns
            - Desktop (>= 1024px): 6-column grid where top 3 cards span 2 cols each (3 cols)
              and bottom 2 cards span 3 cols each (2 wider cols)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-8">
          {additionalFacilities.map((facility, fIdx) => {
            const isTopRowDesktop = fIdx < 3;
            const isLastOnTablet = fIdx === 4;

            return (
              <div
                key={facility.id}
                className={`group flex flex-col bg-white border border-[#E6DFD5] overflow-hidden rounded-xs shadow-xs transition-all duration-300 hover:shadow-md hover:border-[#6E2E1D]/40 ${
                  isTopRowDesktop ? 'lg:col-span-2' : 'lg:col-span-3'
                } ${isLastOnTablet ? 'sm:col-span-2 lg:col-span-3' : 'sm:col-span-1'}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2D1912]">
                  <img
                    src={facility.image}
                    alt={facility.heading}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs text-[#6E2E1D] text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-xs border border-[#E6DFD5]">
                    {facility.category}
                  </span>
                </div>
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-between flex-1 bg-[#FCFAF7]">
                  <div>
                    <h3 className="font-serif text-[20px] sm:text-[22px] lg:text-[24px] font-normal text-[#1C1917] mb-2 leading-[1.2]">
                      {facility.heading}
                    </h3>
                    <p className="font-sans font-light text-[13px] sm:text-[13.5px] leading-[1.6] text-[#554B43] m-0 mb-4 sm:mb-5">
                      {facility.description}
                    </p>
                  </div>
                  <div>
                    {facility.ctaHref ? (
                      <Link
                        href={facility.ctaHref}
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] font-sans font-semibold tracking-[0.14em] uppercase text-[#6E2E1D] hover:text-[#441C11] transition-colors group/link"
                      >
                        <span>{facility.ctaText}</span>
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-200 group-hover/link:translate-x-1"
                        />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFacilityAction(facility)}
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] font-sans font-semibold tracking-[0.14em] uppercase text-[#6E2E1D] hover:text-[#441C11] transition-colors cursor-pointer group/link"
                      >
                        <span>{facility.ctaText}</span>
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-200 group-hover/link:translate-x-1"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Room Details Modal */}
      {selectedRoomDetails && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedRoomDetails(null)}
        >
          <div
            className="relative w-full max-w-[760px] max-h-[92vh] overflow-y-auto bg-[#FAF7F2] text-[#1C1917] p-5 sm:p-7 md:p-10 rounded-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedRoomDetails(null)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 text-[#7A6E65] hover:text-[#1C1917] cursor-pointer"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <p className="text-[10px] sm:text-[10.5px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8B4836] mb-1">
              {selectedRoomDetails.kicker}
            </p>
            <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[38px] font-normal mb-3 sm:mb-4">
              {selectedRoomDetails.title}
            </h2>

            <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[380px] w-full overflow-hidden bg-[#2D1912] mb-4 sm:mb-6 rounded-xs">
              <img
                src={selectedRoomDetails.mainImage}
                alt={selectedRoomDetails.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-6 py-2.5 sm:py-3 border-y border-[#E6DFD5] text-[12px] sm:text-[13px] font-sans text-[#4A3E37] mb-5 sm:mb-6">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <SquareSpecIcon />
                <span>{selectedRoomDetails.sqft.toLocaleString()} sq.ft</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <BedSpecIcon />
                <span className="truncate">{selectedRoomDetails.bed}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <UsersSpecIcon />
                <span>{selectedRoomDetails.occupancy}</span>
              </div>
            </div>

            <p className="font-sans font-light text-[13.5px] sm:text-[15px] leading-relaxed text-[#554B43] mb-5 sm:mb-6">
              {selectedRoomDetails.description}
            </p>

            {selectedRoomDetails.architectureStory && (
              <div className="bg-[#F3EDE2] p-4 sm:p-5 border border-[#E6DFD5] mb-5 sm:mb-6 rounded-xs">
                <strong className="block text-[10.5px] sm:text-[11px] font-sans uppercase tracking-[0.16em] text-[#8B4836] mb-1.5 sm:mb-2 font-semibold">
                  Architectural Craftsmanship
                </strong>
                <p className="font-sans font-light text-[13px] sm:text-[13.5px] leading-relaxed text-[#4A3E37] m-0">
                  {selectedRoomDetails.architectureStory}
                </p>
              </div>
            )}

            {selectedRoomDetails.amenities && (
              <div className="mb-6 sm:mb-8">
                <strong className="block text-[10.5px] sm:text-[11px] font-sans uppercase tracking-[0.16em] text-[#8B4836] mb-2.5 sm:mb-3 font-semibold">
                  Suite Inclusions &amp; Room Details
                </strong>
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 sm:gap-2.5 text-[12.5px] sm:text-[13px] text-[#3A2E27]">
                  {selectedRoomDetails.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check size={14} className="text-[#8B4836] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-4 pt-3.5 sm:pt-4 border-t border-[#E6DFD5]">
              <button
                type="button"
                onClick={() => {
                  setSelectedRoomDetails(null);
                  setBookingOpen(true);
                }}
                className="w-full sm:w-auto bg-[#6E2E1D] hover:bg-[#582315] text-white px-6 sm:px-7 py-3 rounded-md text-[11px] font-sans font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
              >
                <span>RESERVE THIS ROOM</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Concierge Enquiry Modal */}
      {conciergeModalRoom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setConciergeModalRoom(null)}
        >
          <div
            className="relative w-full max-w-[520px] bg-[#FAF7F2] text-[#1C1917] p-5 sm:p-8 rounded-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setConciergeModalRoom(null)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 text-[#7A6E65] hover:text-[#1C1917] cursor-pointer"
              aria-label="Close concierge"
            >
              <X size={20} />
            </button>

            <p className="text-[10px] sm:text-[10.5px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8B4836] mb-1">
              {conciergeModalRoom.kicker || 'CONCIERGE ASSISTANCE'}
            </p>
            <h2 className="font-serif text-[24px] sm:text-[28px] md:text-[32px] font-normal mb-2">
              {conciergeModalRoom.title}
            </h2>
            <p className="font-sans font-light text-[13px] sm:text-[14px] text-[#554B43] mb-5 sm:mb-6 leading-relaxed">
              {conciergeModalRoom.description ||
                'Our dedicated heritage concierge can assist with custom check-in dates, sadya feast preferences, and temple visit transfers.'}
            </p>

            <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
              <a
                href={`https://wa.me/912942779000?text=Hello%20Idanazhi%2C%20I%20would%20like%20to%20enquire%20about%20booking%20${encodeURIComponent(
                  conciergeModalRoom.title
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#20321A] hover:bg-[#283E21] text-white py-3 sm:py-3.5 px-4 sm:px-5 rounded-md text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer shadow-sm"
              >
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+912942779000"
                className="w-full flex items-center justify-center gap-3 border border-[#6E2E1D]/30 text-[#6E2E1D] hover:bg-[#6E2E1D]/5 py-3 sm:py-3.5 px-4 sm:px-5 rounded-md text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer"
              >
                <Phone size={14} className="shrink-0" />
                <span className="truncate">Call Concierge: +91 294 277 9000</span>
              </a>

              <a
                href={`mailto:hello@idanazhi.com?subject=Enquiry%20for%20${encodeURIComponent(
                  conciergeModalRoom.title
                )}`}
                className="w-full flex items-center justify-center gap-3 border border-[#6E2E1D]/30 text-[#6E2E1D] hover:bg-[#6E2E1D]/5 py-3 sm:py-3.5 px-4 sm:px-5 rounded-md text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer"
              >
                <Mail size={14} className="shrink-0" />
                <span>Email Concierge Desk</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global Booking Panel */}
      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </main>
  );
}
