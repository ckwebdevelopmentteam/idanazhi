'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Clock,
  Sun,
  Sparkles,
  Check,
  ChevronRight,
  Compass,
  Calendar,
  Users,
  ShieldCheck,
  Layers,
  MapPin,
  Waves,
  TreePine,
  Landmark,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { experienceSubCategories } from '@/data/navigation';
import { BookingPanel } from '@/components/sections/booking-panel';

type TabKey = 'story' | 'phases' | 'included' | 'practical';

interface TimelineItem {
  time: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  duration: string;
}

const timelineData: TimelineItem[] = [
  {
    time: '05:30 AM',
    period: 'Dawn Awakening',
    title: 'Backwater Wooden Canoe & Cast-Net Fishing',
    subtitle: 'River Estuary & Coastal Harbor',
    description:
      'Glide through silent river backwaters before the morning sun pierces the mist. Learn the art of casting traditional circular nets with local artisanal boatmen and watch the vibrant morning catch arrive.',
    image: '/images/experiences/fishing-harbor-experience.jpg',
    tag: 'Waters & Coastal',
    duration: '3 Hours',
  },
  {
    time: '08:30 AM',
    period: 'Morning Radiance',
    title: 'Barefoot Paddy Field Planting & Farm Walk',
    subtitle: 'Ancestral Agrarian Heritage',
    description:
      'Step barefoot onto the emerald earthen bunds. Guided by multigenerational farm hands, transplant heirloom rice saplings, walk historic stone irrigation channels, and share tender coconut water straight from the palm.',
    image: '/images/experiences/paddy-farming-experience.jpg',
    tag: 'Agrarian & Earth',
    duration: '2.5 Hours',
  },
  {
    time: '02:30 PM',
    period: 'Afternoon Shadows',
    title: 'Kumbidi Village Artisans & Terracotta Wheels',
    subtitle: 'Living Rural Craftsmanship',
    description:
      'Stroll the red-earth pathways of Kumbidi. Mold wet clay beside generational potters, observe handloom weavers crafting fine Kerala kasavu cotton, and relax at a historic village chayakada with steaming cardamom tea.',
    image: '/images/experiences/kumbidi-village-experience.jpg',
    tag: 'Artisan & Village',
    duration: '3 Hours',
  },
  {
    time: '06:15 PM',
    period: 'Twilight Sanctum',
    title: 'Sacred Temple Architecture & Deeparadhana',
    subtitle: 'Vedic Peace & Ancient Stone',
    description:
      'Visit centuries-old temple sanctums designed along sacred Thachu Shastra principles. Witness the mesmerizing illumination of a thousand brass oil lamps (Deeparadhana) while the resonant cadences of Sopana Sangeetham echo.',
    image: '/images/experiences/temple-heritage-experience.jpg',
    tag: 'Sacred Heritage',
    duration: '2 Hours',
  },
];

const comparisonData = [
  {
    name: 'Traditional Rice Farming & Paddy Field',
    category: 'Agrarian Life',
    duration: '2.5 Hours',
    timing: 'Early Morning (6:30 AM) or 4:30 PM',
    intensity: 'Interactive (Barefoot mud walk)',
    included: 'Estate guide, mud boots, fresh tender coconut, herbal chai',
    slug: 'rice-farming',
  },
  {
    name: 'Kumbidi Village Life & Terracotta Craft',
    category: 'Artisan Culture',
    duration: '3.0 Hours',
    timing: 'Morning (9:00 AM) or Afternoon (3:30 PM)',
    intensity: 'Gentle (Village walking stroll)',
    included: 'Master potter lesson, clay souvenir, village tea stall refreshments',
    slug: 'kumbidi-village',
  },
  {
    name: 'Sacred Temple Architecture & Heritage',
    category: 'Vedic & Spiritual',
    duration: '2.0 Hours',
    timing: 'Dawn (6:00 AM) or Twilight (6:00 PM)',
    intensity: 'Calm & Contemplative (Walking)',
    included: 'Cultural custodian, temple prasadam, deeparadhana access, shawl',
    slug: 'temple-experience',
  },
  {
    name: 'Fishing Harbor & Dawn River Expedition',
    category: 'Coastal Waters',
    duration: '3.0 Hours',
    timing: 'Sunrise Departure (5:30 AM)',
    intensity: 'Moderate (Wooden boat embarkation)',
    included: 'Private wooden canoe, throw-net tutorial, morning tea & catch demo',
    slug: 'fishing-harbor',
  },
];

export default function ExperiencesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string>('Paddy Field & Traditional Rice Farming');
  const [activeTab, setActiveTab] = useState<TabKey>('story');
  const [activeTimelineIndex, setActiveTimelineIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleOpenBooking = (expTitle?: string) => {
    if (expTitle) setSelectedExperience(expTitle);
    setBookingOpen(true);
  };

  const filteredSubCategories =
    activeFilter === 'all'
      ? experienceSubCategories
      : experienceSubCategories.filter((item) => {
          if (activeFilter === 'agrarian') return item.id.includes('farming') || item.id.includes('rice');
          if (activeFilter === 'village') return item.id.includes('village');
          if (activeFilter === 'temple') return item.id.includes('temple');
          if (activeFilter === 'waters') return item.id.includes('fishing');
          return true;
        });

  return (
    <main className="bg-paper min-h-screen text-ink selection:bg-[#7C402E] selection:text-white">
      {/* =========================================================================
          SECTION 1: CINEMATIC FULL-WIDTH HERO WITH AMBIENT STAT STRIP
          ========================================================================= */}
      <section className="relative w-full min-h-[75vh] lg:min-h-[82vh] flex items-end justify-center text-white overflow-hidden pt-[110px] pb-14 sm:pb-18">
        {/* Background Panoramic Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/experiences/paddy-farming-experience.jpg"
            alt="Kerala Traditional Rice Farming at Idanazhi"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Multi-layered cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[rgba(28,15,10,0.55)] to-[rgba(28,15,10,0.35)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(20,10,7,0.65)_100%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col items-center text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase font-sans font-semibold tracking-[0.22em] text-[#F3E5D8]">
            <Sparkles size={12} className="text-[#D4AF37]" />
            <span>IDANAZHI IMMERSIONS &amp; LOCAL ENCOUNTERS</span>
          </div>

          {/* Majestic Serif Headline */}
          <h1 className="font-serif text-[clamp(36px,5.8vw,80px)] font-normal text-white leading-[1.05] tracking-[-0.03em] m-0 mb-5 max-w-[1020px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            Living with the Soil, Sacred Traditions &amp; Waters of Kerala
          </h1>

          {/* Subtitle Description */}
          <p className="font-sans font-light text-[15px] sm:text-[17.5px] leading-relaxed text-white/90 max-w-[740px] m-0 mb-8 sm:mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Step beyond spectator travel into deeply tactile encounters. Wander with generational rice farmers, shape terracotta with Kumbidi village artisans, witness twilight oil lamps in ancient stone sanctums, and cast throw-nets at dawn.
          </p>

          {/* Stat Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-[980px] pt-4 pb-8 border-t border-white/20">
            <div className="flex flex-col items-center p-2">
              <span className="font-serif text-[24px] sm:text-[28px] font-normal text-[#E8D4C4]">04</span>
              <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-white/75">Signature Immersions</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="font-serif text-[24px] sm:text-[28px] font-normal text-[#E8D4C4]">100%</span>
              <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-white/75">Regenerative &amp; Local</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="font-serif text-[24px] sm:text-[28px] font-normal text-[#E8D4C4]">Private</span>
              <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-white/75">Small Group Formats</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="font-serif text-[24px] sm:text-[28px] font-normal text-[#E8D4C4]">Native</span>
              <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-white/75">Master Custodians</span>
            </div>
          </div>

          {/* Fast Category Filter Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All 04 Immersions' },
              { id: 'agrarian', label: 'Agrarian & Earth' },
              { id: 'village', label: 'Village & Craft' },
              { id: 'temple', label: 'Temple & Sacred' },
              { id: 'waters', label: 'River & Waters' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 text-[10.5px] uppercase tracking-[0.16em] font-sans transition-all duration-200 cursor-pointer rounded-full ${
                  activeFilter === f.id
                    ? 'bg-white text-[#2D1912] font-semibold shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SIGNATURE SPOTLIGHT (Interactive Tabbed Storyboard)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-14 max-w-[1380px] mx-auto border-b border-[#7C402E]/15">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10px] sm:text-[11px] font-semibold text-[#84382B]">
            FEATURED SIGNATURE EXPEDITION
          </p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,50px)] font-normal text-[#2D1912] leading-[1.14] tracking-[-0.025em] m-0 max-w-[800px]">
            Traditional Rice Farming &amp; Paddy Field Immersion
          </h2>
        </div>

        {/* Dynamic Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch bg-[#FAF7F2] border border-[#7C402E]/20 p-6 sm:p-9 lg:p-12 shadow-[0_20px_50px_rgba(45,25,18,0.06)]">
          {/* Left Column: Atmospheric Feature Photograph */}
          <div className="lg:col-span-6 relative flex flex-col justify-between overflow-hidden bg-linen min-h-[360px] lg:min-h-[480px]">
            <img
              src="/images/experiences/working-fields.jpg"
              alt="Hands-on Paddy Cultivation at Idanazhi Farm Stay"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-103"
            />
            {/* Ambient Top Tags */}
            <div className="relative z-10 flex items-center justify-between p-4">
              <span className="bg-[#4E2418] text-white text-[9.5px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 shadow-sm">
                Agrarian Immersion
              </span>
              <span className="bg-white/90 backdrop-blur-xs text-[#2D1912] text-[9.5px] uppercase tracking-[0.16em] font-medium px-2.5 py-1">
                2.5 Hours · Dawn
              </span>
            </div>

            {/* Bottom Floating Caption Card */}
            <div className="relative z-10 m-4 p-4 bg-[#2D1912]/85 backdrop-blur-md text-white border border-white/10">
              <p className="font-serif text-[15px] sm:text-[16px] italic leading-snug m-0 mb-1 text-[#F0DFD3]">
                &ldquo;To step barefoot into the earth is to receive the living pulse of generations who worked this soil.&rdquo;
              </p>
              <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#D4AF37]">
                Sreedharan Nair · Master Agrarian Custodian
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Storyboard Tabs */}
          <div className="lg:col-span-6 flex flex-col justify-between pt-2">
            <div>
              {/* Tab Navigation Pill Bar */}
              <div className="flex border-b border-[#7C402E]/20 gap-4 sm:gap-6 mb-7 overflow-x-auto pb-1">
                {[
                  { key: 'story' as TabKey, label: 'The Story' },
                  { key: 'phases' as TabKey, label: 'Journey Phases' },
                  { key: 'included' as TabKey, label: 'What is Included' },
                  { key: 'practical' as TabKey, label: 'Practical Advice' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    className={`font-sans text-[11px] sm:text-[11.5px] tracking-[0.16em] uppercase pb-2.5 transition-all duration-200 cursor-pointer border-b-2 whitespace-nowrap -mb-[1px] ${
                      activeTab === t.key
                        ? 'border-[#84382B] text-[#84382B] font-semibold'
                        : 'border-transparent text-[#5A3828]/70 hover:text-[#2D1912]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Tab Content Panels */}
              {activeTab === 'story' && (
                <div className="animate-in fade-in duration-300 space-y-4">
                  <h3 className="font-serif text-[22px] sm:text-[24px] font-normal text-[#2D1912] m-0">
                    Sacred Mud, Ancient Seedlings &amp; Regenerative Lore
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[14.5px] text-[#5A3828] leading-relaxed font-light m-0">
                    Our heritage farm estate preserves indigenous Kerala paddy strains such as Navara and Pokkali—grains revered for their nutritional richness and spiritual significance. In this immersion, guests do not merely observe; they walk the bunds, touch the soil, and participate in rituals that have greeted the Malabar sun for over a millennium.
                  </p>
                  <p className="font-sans text-[14px] sm:text-[14.5px] text-[#5A3828] leading-relaxed font-light m-0">
                    Conclude the field walk beneath a thatched farm gazebo with fresh, tender coconut water plucked directly from our palms and steaming chai brewed in clay vessels.
                  </p>
                </div>
              )}

              {activeTab === 'phases' && (
                <div className="animate-in fade-in duration-300 space-y-3.5">
                  {[
                    {
                      num: '01',
                      title: 'Dawn Bund Walk & Soil Introduction',
                      desc: 'Arrive at the fields as the morning mist lifts; learn how water channels regulate soil nourishment.',
                    },
                    {
                      num: '02',
                      title: 'Seedling Transplanting Demonstration',
                      desc: 'Join local farm hands in planting heirloom saplings in hand-prepared, fertile earthen beds.',
                    },
                    {
                      num: '03',
                      title: 'Traditional Irrigation & Water Wheel Lore',
                      desc: 'Understand gravitational irrigation channels and the indigenous physics of sustainable water craft.',
                    },
                    {
                      num: '04',
                      title: 'Farmhouse Refreshments & Elder Storytelling',
                      desc: 'Savor tender coconut water and earthen clay-pot chai while discussing folklore with village elders.',
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-3.5 items-start">
                      <span className="font-serif text-[16px] text-[#84382B] font-semibold shrink-0 pt-0.5">
                        {step.num}
                      </span>
                      <div>
                        <h4 className="font-sans text-[13px] font-semibold text-[#2D1912] m-0 mb-0.5">
                          {step.title}
                        </h4>
                        <p className="font-sans text-[12.5px] text-[#5A3828] leading-snug m-0 font-light">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'included' && (
                <div className="animate-in fade-in duration-300 space-y-3 pt-1">
                  <h3 className="font-serif text-[20px] font-normal text-[#2D1912] m-0 mb-2">
                    Everything Provided for Your Immersion
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Guided interpretation by native farm mentors',
                      'Hand-woven organic cotton farming dhoti / shawl',
                      'Traditional footwear / feet washing station',
                      'Freshly plucked tender coconut water',
                      'Clay kulhar spiced cardamom tea',
                      'Botanical & grain identification pocket card',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[12.5px] text-[#4E2418]">
                        <Check size={14} className="text-[#84382B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'practical' && (
                <div className="animate-in fade-in duration-300 space-y-3.5">
                  <h3 className="font-serif text-[20px] font-normal text-[#2D1912] m-0 mb-2">
                    Preparation &amp; Comfort Notes
                  </h3>
                  <div className="space-y-2.5 text-[13px] text-[#5A3828] font-light leading-relaxed">
                    <p className="m-0">
                      <strong className="font-semibold text-[#2D1912]">Attire:</strong> Lightweight breathable cotton clothing. We provide traditional cloths or you may roll trousers above the knee for the mud walk.
                    </p>
                    <p className="m-0">
                      <strong className="font-semibold text-[#2D1912]">Footwear:</strong> Barefoot walk is highly encouraged on the clean clay beds; wash basins with herbal water are provided afterwards.
                    </p>
                    <p className="m-0">
                      <strong className="font-semibold text-[#2D1912]">Photography:</strong> Early morning dawn light (6:30 AM – 8:00 AM) yields exceptional natural photographs across the emerald terraced bunds.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Row */}
            <div className="pt-8 border-t border-[#7C402E]/20 flex flex-wrap items-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => handleOpenBooking('Paddy Field & Traditional Rice Farming')}
                className="px-7 py-3.5 bg-[#4E2418] hover:bg-[#341810] text-white font-sans text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer shadow-sm active:scale-95 flex items-center gap-2"
              >
                <span>RESERVE THIS EXPERIENCE</span>
                <ArrowUpRight size={14} />
              </button>
              <span className="text-[12px] font-sans text-muted">
                Available daily · Advance reservation required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BENTO EDITORIAL SHOWCASE (Non-Alternating, Dynamic Layout)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-14 max-w-[1400px] mx-auto border-b border-[#7C402E]/15">
        <div className="flex flex-col items-center text-center max-w-[860px] mx-auto mb-14 sm:mb-18">
          <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10px] sm:text-[11px] font-semibold text-[#84382B]">
            CURATED EXPERIENCES ARCHITECTURE
          </p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,52px)] font-normal text-[#2D1912] leading-[1.12] tracking-[-0.025em] m-0 mb-4">
            Four Unique Windows into Authentic Kerala
          </h2>
          <p className="font-sans text-[14.5px] sm:text-[16px] text-[#5A3828] font-light leading-relaxed m-0">
            Each experience is anchored in a distinct pillar of regional life: ancient clay and artisanal looms, cosmic temple sanctums, dawn river watercraft, and restorative earth cultivation.
          </p>
        </div>

        {/* Bento Grid: 2 Asymmetrical Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Card 1: Kumbidi Village (7 Cols - Wide Editorial Card) */}
          <article className="lg:col-span-7 bg-[#FAF7F2] border border-[#7C402E]/20 flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="relative aspect-[16/9] overflow-hidden bg-linen">
              <img
                src="/images/experiences/kumbidi-village-experience.jpg"
                alt="Kumbidi Village Artisans and Pottery at Idanazhi"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              />
              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#84382B]">
                Village &amp; Artisans · 3 Hours
              </div>
              <div className="absolute bottom-4 right-4 bg-[#2D1912]/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-1">
                Kumbidi, Bharathapuzha Basin
              </div>
            </div>

            <div className="p-6 sm:p-9 flex flex-col justify-between flex-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#84382B] font-semibold m-0 mb-2">
                  RURAL LIVING &amp; TERRACOTTA CRAFTSMANSHIP
                </p>
                <h3 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#2D1912] leading-tight m-0 mb-3 group-hover:text-[#84382B] transition-colors">
                  Kumbidi Village Cultural Immersion
                </h3>
                <p className="font-sans text-[14px] text-[#5A3828] leading-relaxed font-light m-0 mb-6">
                  Wander quiet red-earth pathways shaded by towering areca palms. Meet master potters turning wet clay on balanced wooden wheels, visit historic matrilineal illam courtyards, and experience the slow, gracious hospitality of rural Malabar.
                </p>

                {/* Highlights Pill Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    'Clay wheel pottery masterclass',
                    'Traditional handloom weaver atelier',
                    'Village tea stall (Chayakada) break',
                    'Generational elder storytelling',
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#7C402E]/15 text-[11px] font-sans text-[#4E2418]"
                    >
                      <Check size={12} className="text-[#84382B]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#7C402E]/15 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.16em] font-sans text-muted">
                  Best: 9:00 AM or 3:30 PM
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Kumbidi Village Cultural Immersion')}
                  className="px-5 py-2.5 bg-[#4E2418] hover:bg-[#341810] text-white font-sans text-[10px] uppercase tracking-[0.18em] font-semibold transition-all duration-200 cursor-pointer"
                >
                  RESERVE IMMERSION
                </button>
              </div>
            </div>
          </article>

          {/* Card 2: Sacred Temple Architecture (5 Cols - Tall Editorial Card) */}
          <article className="lg:col-span-5 bg-[#FAF7F2] border border-[#7C402E]/20 flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-linen">
              <img
                src="/images/experiences/temple-heritage-experience.jpg"
                alt="Sacred Temple Architecture in Kerala"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              />
              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#84382B]">
                Sacred Heritage · 2 Hours
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#84382B] font-semibold m-0 mb-2">
                  VEDIC SANCTUMS &amp; ARCHITECTURAL GEOMETRY
                </p>
                <h3 className="font-serif text-[24px] sm:text-[26px] font-normal text-[#2D1912] leading-tight m-0 mb-3 group-hover:text-[#84382B] transition-colors">
                  Sacred Temple Architecture &amp; Deeparadhana
                </h3>
                <p className="font-sans text-[13.5px] text-[#5A3828] leading-relaxed font-light m-0 mb-5">
                  Accompanied by our resident Vedic architectural custodian, study the cosmic proportions of Thachu Shastra woodwork, carved teak gopurams, and witness the mesmerizing twilight illumination of a thousand brass nilavilakkus.
                </p>

                <div className="space-y-2 mb-6">
                  {[
                    'Private access with cultural custodian',
                    'Twilight Deeparadhana lamp ceremony',
                    'Sopana Sangeetham musical background',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-[#4E2418]">
                      <Check size={13} className="text-[#84382B]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#7C402E]/15 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.16em] font-sans text-muted">
                  Dawn / Twilight
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Sacred Temple Architecture Tour')}
                  className="px-5 py-2.5 bg-[#4E2418] hover:bg-[#341810] text-white font-sans text-[10px] uppercase tracking-[0.18em] font-semibold transition-all duration-200 cursor-pointer"
                >
                  RESERVE TOUR
                </button>
              </div>
            </div>
          </article>

          {/* Card 3: Working Fields & Organic Harvest (5 Cols - Compact Agrarian Card) */}
          <article className="lg:col-span-5 bg-[#FAF7F2] border border-[#7C402E]/20 flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-linen">
              <img
                src="/images/experiences/working-fields.jpg"
                alt="Estate Organic Farming and Native Harvest"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              />
              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#84382B]">
                Soil &amp; Harvest · 2 Hours
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#84382B] font-semibold m-0 mb-2">
                  ZERO-MILE GASTRONOMY &amp; AGRO-ECOLOGY
                </p>
                <h3 className="font-serif text-[24px] sm:text-[26px] font-normal text-[#2D1912] leading-tight m-0 mb-3 group-hover:text-[#84382B] transition-colors">
                  Organic Estate Harvest &amp; Spice Gardens
                </h3>
                <p className="font-sans text-[13.5px] text-[#5A3828] leading-relaxed font-light m-0 mb-5">
                  Walk through Idanazhi&apos;s working permaculture gardens. Pluck fresh turmeric, peppercorns, native ash gourd, and betel leaves alongside our estate chef for the afternoon heritage Kerala Sadhya banquet.
                </p>

                <div className="space-y-2 mb-6">
                  {[
                    'Guided spice & heirloom medicinal flora walk',
                    'Harvest vegetables for kitchen preparation',
                    'Tasting of native banana & coconut cultivars',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-[#4E2418]">
                      <Check size={13} className="text-[#84382B]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#7C402E]/15 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.16em] font-sans text-muted">
                  Morning: 7:00 AM
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Organic Estate Harvest & Spice Walk')}
                  className="px-5 py-2.5 bg-[#4E2418] hover:bg-[#341810] text-white font-sans text-[10px] uppercase tracking-[0.18em] font-semibold transition-all duration-200 cursor-pointer"
                >
                  RESERVE WALK
                </button>
              </div>
            </div>
          </article>

          {/* Card 4: Dawn Fishing Harbor & Backwaters (7 Cols - Wide Marine Card) */}
          <article className="lg:col-span-7 bg-[#FAF7F2] border border-[#7C402E]/20 flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="relative aspect-[16/9] overflow-hidden bg-linen">
              <img
                src="/images/experiences/fishing-harbor-experience.jpg"
                alt="Dawn Canoe and Fishing Harbor at Idanazhi"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              />
              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#84382B]">
                River &amp; Coast · 3 Hours
              </div>
              <div className="absolute bottom-4 right-4 bg-[#2D1912]/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-1">
                Dawn Departure · 5:30 AM
              </div>
            </div>

            <div className="p-6 sm:p-9 flex flex-col justify-between flex-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#84382B] font-semibold m-0 mb-2">
                  WATERCRAFT &amp; DAWN CAST-NET FISHING
                </p>
                <h3 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#2D1912] leading-tight m-0 mb-3 group-hover:text-[#84382B] transition-colors">
                  Fishing Harbor &amp; Live Backwater Expedition
                </h3>
                <p className="font-sans text-[14px] text-[#5A3828] leading-relaxed font-light m-0 mb-6">
                  Embark on hand-carved wooden canoes at first light. Witness the brisk choreography of river fishermen casting traditional circular Veechu Vala nets into the morning mist, explore coastal harbor auctions, and select fresh catch for private estate lunch preparation.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    'Dawn wooden canoe navigation',
                    'Hands-on circular throw-net lesson',
                    'Brisk harbor arrival & catch observation',
                    'Estate chef preparation option',
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#7C402E]/15 text-[11px] font-sans text-[#4E2418]"
                    >
                      <Check size={12} className="text-[#84382B]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#7C402E]/15 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.16em] font-sans text-muted">
                  Departure: 5:30 AM – 8:30 AM
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Fishing Harbor & Live Fishing Expedition')}
                  className="px-5 py-2.5 bg-[#4E2418] hover:bg-[#341810] text-white font-sans text-[10px] uppercase tracking-[0.18em] font-semibold transition-all duration-200 cursor-pointer"
                >
                  RESERVE EXPEDITION
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DAWN TO TWILIGHT CHRONOLOGICAL TIMELINE (Exclusive to this page)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-14 max-w-[1360px] mx-auto border-b border-[#7C402E]/15">
        <div className="flex flex-col items-center text-center max-w-[820px] mx-auto mb-14 sm:mb-16">
          <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10px] sm:text-[11px] font-semibold text-[#84382B]">
            CHRONOLOGICAL LIVING TAPESTRY
          </p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] font-normal text-[#2D1912] leading-[1.14] tracking-[-0.025em] m-0 mb-4">
            A Day of Living with Kerala&apos;s Rhythms
          </h2>
          <p className="font-sans text-[14.5px] sm:text-[16px] text-[#5A3828] font-light leading-relaxed m-0">
            Follow the sun from mist-laden backwater estuaries to golden earthen bunds and twilight brass oil lamps.
          </p>
        </div>

        {/* Milestone Selector Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {timelineData.map((item, idx) => {
            const isCurrent = activeTimelineIndex === idx;
            return (
              <button
                key={item.time}
                type="button"
                onClick={() => setActiveTimelineIndex(idx)}
                className={`p-4 sm:p-5 text-left border transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#4E2418] text-white border-[#4E2418] shadow-md scale-[1.01]'
                    : 'bg-[#FAF7F2] text-[#2D1912] border-[#7C402E]/20 hover:border-[#84382B]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-mono text-[13px] font-semibold ${isCurrent ? 'text-[#D4AF37]' : 'text-[#84382B]'}`}>
                    {item.time}
                  </span>
                  <span className={`text-[9px] uppercase tracking-wider font-sans ${isCurrent ? 'text-white/70' : 'text-muted'}`}>
                    {item.period}
                  </span>
                </div>
                <h4 className="font-serif text-[15px] sm:text-[16px] font-normal leading-snug m-0 line-clamp-2">
                  {item.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Milestone Spotlight Card */}
        {(() => {
          const current = timelineData[activeTimelineIndex];
          return (
            <div className="bg-[#FAF7F2] border border-[#7C402E]/20 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 aspect-[16/10] overflow-hidden bg-linen shadow-md">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                />
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2 text-[#84382B] text-[11px] font-sans uppercase tracking-[0.18em]">
                  <span className="font-semibold">{current.period}</span>
                  <span>·</span>
                  <span>{current.duration}</span>
                </div>

                <h3 className="font-serif text-[clamp(24px,2.8vw,38px)] font-normal text-[#2D1912] leading-tight m-0 mb-4">
                  {current.title}
                </h3>

                <p className="font-sans text-[14.5px] text-[#5A3828] leading-relaxed font-light m-0 mb-6">
                  {current.description}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(current.title)}
                    className="px-6 py-3 bg-[#4E2418] hover:bg-[#341810] text-white font-sans text-[10.5px] uppercase tracking-[0.18em] font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                  >
                    RESERVE THIS SLOT
                  </button>
                  <span className="text-[12px] font-sans text-muted">
                    Slot {activeTimelineIndex + 1} of 4
                  </span>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* =========================================================================
          SECTION 5: EXPERIENCES COMPARISON & PLANNING TABLE
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-14 max-w-[1360px] mx-auto border-b border-[#7C402E]/15">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-12 sm:mb-16">
          <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10px] sm:text-[11px] font-semibold text-[#84382B]">
            AT A GLANCE PLANNING
          </p>
          <h2 className="font-serif text-[clamp(28px,3.2vw,46px)] font-normal text-[#2D1912] leading-[1.15] tracking-[-0.025em] m-0 mb-3">
            Compare Idanazhi Immersions
          </h2>
          <p className="font-sans text-[14px] sm:text-[15.5px] text-[#5A3828] font-light leading-relaxed m-0">
            Plan your stay around optimum seasonal timings, physical rhythm, and included provisions.
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto bg-[#FAF7F2] border border-[#7C402E]/20 shadow-xs">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#7C402E]/20 bg-[#4E2418] text-white text-[10px] uppercase font-sans tracking-[0.18em]">
                <th className="py-4 px-5 font-semibold">Immersion</th>
                <th className="py-4 px-4 font-semibold">Duration</th>
                <th className="py-4 px-4 font-semibold">Optimal Timing</th>
                <th className="py-4 px-4 font-semibold">Physical Style</th>
                <th className="py-4 px-5 font-semibold">Included Amenities</th>
                <th className="py-4 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7C402E]/15 text-[13px] font-sans">
              {comparisonData.map((row) => (
                <tr key={row.name} className="hover:bg-white/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-serif text-[15px] font-medium text-[#2D1912] block">
                      {row.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#84382B]">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-[12px] text-[#2D1912]">
                    {row.duration}
                  </td>
                  <td className="py-4 px-4 text-[#5A3828] text-[12.5px] font-light">
                    {row.timing}
                  </td>
                  <td className="py-4 px-4 text-[#5A3828] text-[12.5px] font-light">
                    {row.intensity}
                  </td>
                  <td className="py-4 px-5 text-[#5A3828] text-[12px] font-light max-w-[240px]">
                    {row.included}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(row.name)}
                      className="px-3.5 py-1.5 bg-[#4E2418] hover:bg-[#84382B] text-white text-[9.5px] uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer"
                    >
                      RESERVE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: BESPOKE CONCIERGE CALLOUT BANNER
          ========================================================================= */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-14 max-w-[1360px] mx-auto">
        <div className="relative bg-[#2D1912] text-white p-8 sm:p-14 lg:p-16 border border-[#4A2A20] shadow-2xl overflow-hidden text-center flex flex-col items-center">
          {/* Subtle Ambient Background Watermark */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 max-w-[820px] mx-auto">
            <span className="inline-block text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] font-semibold mb-3">
              PRIVATE &amp; WEDDING CELEBRATION GROUPS
            </span>
            <h2 className="font-serif text-[clamp(28px,3.8vw,52px)] font-normal text-white leading-tight m-0 mb-4">
              Crafting a Bespoke Cultural Itinerary for Your Gathering
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[16.5px] text-[#D8C7B9] font-light leading-relaxed m-0 mb-8 max-w-[680px] mx-auto">
              Whether welcoming wedding guests to Kerala for the first time or designing a private family retreat, our resident cultural concierge orchestrates private dawn boat flotillas, artisan workshops, and farm banquets tailored to your schedule.
            </p>

            <button
              type="button"
              onClick={() => handleOpenBooking('Custom Group & Wedding Itinerary')}
              className="px-8 py-3.5 bg-white hover:bg-[#FAF4EC] text-[#2D1912] font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer shadow-lg inline-flex items-center gap-2"
            >
              <span>INQUIRE WITH OUR CONCIERGE</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: ENQUIRY MODAL (Full integration with White & Brown modal)
          ========================================================================= */}
      {bookingOpen && (
        <BookingPanel
          defaultOccasion={
            selectedExperience?.toLowerCase().includes('stay')
              ? 'heritage-stay'
              : 'celebration'
          }
          close={() => setBookingOpen(false)}
        />
      )}
    </main>
  );
}
