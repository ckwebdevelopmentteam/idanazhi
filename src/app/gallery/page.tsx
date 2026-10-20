'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingPanel } from '@/components/sections/booking-panel';

interface GalleryItem {
  id: number;
  title: string;
  category: 'Weddings' | 'Architecture' | 'Living' | 'Dining';
  categoryLabel: string;
  src: string;
  alt: string;
  caption: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: 'Heritage Mandapam Ceremony',
    category: 'Weddings',
    categoryLabel: 'WEDDING STAGE',
    src: '/images/weddings/stage-heritage-mandapam.jpg',
    alt: 'Traditional Kerala wedding mandapam with carved teakwood and fresh marigold garlands',
    caption: 'Carved teakwood mandapam adorned with fresh jasmine, marigolds, and sacred brass Nilavilakku lamps.',
  },
  {
    id: 2,
    title: 'Colonnaded Timber Corridor',
    category: 'Architecture',
    categoryLabel: 'THACHU SHASTRA',
    src: '/images/weddings/architecture-corridor.jpg',
    alt: 'Sunlit timber corridor with traditional terracotta tiled roofing',
    caption: 'Handcrafted timber pillars following ancestral Thachu Shastra joinery with natural courtyard ventilation.',
  },
  {
    id: 3,
    title: 'Open-Air Coastal Mandapam',
    category: 'Weddings',
    categoryLabel: 'OUTDOOR VOWS',
    src: '/images/weddings/stage-coastal-mandapam.jpg',
    alt: 'Serene coastal mandapam draped with delicate white florals',
    caption: 'Open canopy set amidst coconut palms, capturing cool Kerala breezes and natural golden sunlight.',
  },
  {
    id: 4,
    title: 'Nadumuttam Courtyard Sanctuary',
    category: 'Living',
    categoryLabel: 'COURTYARD',
    src: '/images/weddings/kerala-courtyard-planter.jpg',
    alt: 'Open to sky central courtyard planter with rainwater channel',
    caption: 'The soul of Kerala Nalukettu: open to sky, cradling natural sunlight, monsoons, and tranquil stillness.',
  },
  {
    id: 5,
    title: 'Grand Reception Stage',
    category: 'Weddings',
    categoryLabel: 'RECEPTION',
    src: '/images/weddings/stage-grand-reception.jpg',
    alt: 'Grand wedding reception stage illuminated with warm chandeliers and floral cascade',
    caption: 'Opulent celebration setting framed by warm chandeliers, lush botanical arches, and heritage elegance.',
  },
  {
    id: 6,
    title: 'Twilight Courtyard Dining',
    category: 'Dining',
    categoryLabel: 'BANQUETS',
    src: '/images/weddings/spaces/space-dinner-1.jpg',
    alt: 'Candlelit dining table arranged in open tropical courtyard',
    caption: 'Intimate evening dining under starlit Kerala skies with artisanal heirloom Kerala cuisine.',
  },
  {
    id: 7,
    title: 'Paliam Royal Heritage Manor',
    category: 'Architecture',
    categoryLabel: 'HERITAGE',
    src: '/images/weddings/paliam.jpg',
    alt: 'Historic Paliam heritage manor with tiered gables and clay roof tiles',
    caption: 'Classic Kerala vernacular architecture with sloping roofs, carved gables, and timber eaves.',
  },
  {
    id: 8,
    title: 'Vedic Pujan and Sacred Vows',
    category: 'Weddings',
    categoryLabel: 'RITUALS',
    src: '/images/weddings/pair-pujan.jpg',
    alt: 'Traditional Vedic wedding fire ritual with ceremonial offerings',
    caption: 'Sacred ceremonies conducted with ancestral blessings, Vedic chants, and familial warmth.',
  },
  {
    id: 9,
    title: 'Sanctuary Suite & Verandah',
    category: 'Living',
    categoryLabel: 'SANCTUARY',
    src: '/images/weddings/idanazhi-room.jpg',
    alt: 'Traditional Kerala heritage bedroom with carved wooden furnishings',
    caption: 'Quiet heritage room with polished wood surfaces, gentle courtyard daylight, and brass accessories.',
  },
  {
    id: 10,
    title: 'Lakeside Celebration Lawn',
    category: 'Weddings',
    categoryLabel: 'OUTDOOR VENUE',
    src: '/images/weddings/spaces/space-dinner-2.jpg',
    alt: 'Lakeside banquet lawn setup with soft ambient lighting',
    caption: 'Expansive manicured lawn bordering water, ideal for large evening gatherings and wedding feasts.',
  },
  {
    id: 11,
    title: 'Traditional Sadhya Feasting',
    category: 'Dining',
    categoryLabel: 'GASTRONOMY',
    src: '/images/experiences/savour-dining.jpg',
    alt: 'Authentic Kerala culinary spread and harvest feast',
    caption: 'Grand feast served on fresh banana leaves featuring ancestral recipes and locally harvested spices.',
  },
  {
    id: 12,
    title: 'Varikkasseri Timeless Illam',
    category: 'Architecture',
    categoryLabel: 'MANOR',
    src: '/images/weddings/varikkasseri.jpg',
    alt: 'Carved wooden doorway and wooden pillars of traditional Kerala illam',
    caption: 'Majestic woodwork and stone foundations echoing centuries of cultural storytelling.',
  },
];

const categories = ['All', 'Weddings', 'Architecture', 'Living', 'Dining'] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryData;
    return galleryData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const currentIndex = selectedPhoto
    ? filteredItems.findIndex((item) => item.id === selectedPhoto.id)
    : -1;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredItems.length - 1) {
      setSelectedPhoto(filteredItems[currentIndex + 1]);
    } else {
      setSelectedPhoto(filteredItems[0]);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedPhoto(filteredItems[currentIndex - 1]);
    } else {
      setSelectedPhoto(filteredItems[filteredItems.length - 1]);
    }
  };

  return (
    <main className="min-h-screen bg-paper pt-[100px] sm:pt-[120px] pb-24 text-ink">
      {/* Editorial Page Header */}
      <section className="px-6 sm:px-10 lg:px-16 max-w-[1280px] mx-auto text-center pt-8 sm:pt-14 pb-12">
        <h1 className="font-serif text-[clamp(34px,4.5vw,58px)] font-normal leading-[1.08] tracking-[-0.035em] text-[#2D1912] m-0 mb-5">
          Visual Stories &amp; Heritage Moments
        </h1>

        <p className="font-sans text-[15px] sm:text-[17px] text-[#5A3828] max-w-[680px] mx-auto leading-[1.75] font-light m-0">
          Immerse yourself in our visual tapestry — from sacred Vedic mandapams and starlit banquets
          to the tranquil timber courtyards of Guruvayoor.
        </p>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 text-[11px] sm:text-[11.5px] font-sans tracking-[0.16em] uppercase rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#4E2418] text-white shadow-md'
                    : 'bg-white/80 border border-[#7C402E]/25 text-[#4E2418] hover:bg-white hover:border-[#4E2418]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer flex flex-col bg-white border border-[#7C402E]/15 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF4EC]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#2D1912]/80 backdrop-blur-xs text-white text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-xs font-semibold">
                  {item.categoryLabel}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-[20px] text-[#2D1912] m-0 mb-2 leading-snug group-hover:text-[#84382B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[13px] text-[#5A3828]/90 leading-relaxed font-light m-0 line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#7C402E]/15 flex items-center justify-between">
                  <span className="text-[10.5px] uppercase font-sans font-semibold tracking-[0.18em] text-[#84382B]">
                    View Detail
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-[#84382B] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[#1E100C]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-paper border border-[#7C402E]/30 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-paper/90 text-ink border border-[#7C402E]/30 flex items-center justify-center hover:bg-[#4E2418] hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-paper/85 text-ink border border-[#7C402E]/30 flex items-center justify-center hover:bg-[#4E2418] hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-paper/85 text-ink border border-[#7C402E]/30 flex items-center justify-center hover:bg-[#4E2418] hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>

              {/* Photo Area */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/10">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meta Detail Area */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-white">
                <div className="max-w-xl">
                  <span className="inline-block text-[10px] uppercase font-sans font-semibold tracking-[0.2em] text-[#84382B] mb-1">
                    {selectedPhoto.categoryLabel} &bull; {selectedPhoto.category}
                  </span>
                  <h2 className="font-serif text-[22px] sm:text-[28px] text-[#2D1912] m-0 mb-2 leading-tight">
                    {selectedPhoto.title}
                  </h2>
                  <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#5A3828] m-0 leading-relaxed font-light">
                    {selectedPhoto.caption}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href="/celebrations"
                    onClick={() => setSelectedPhoto(null)}
                    className="flex-1 sm:flex-initial text-center bg-[#4E2418] text-white px-5 py-2.5 text-[10.5px] uppercase font-sans tracking-[0.16em] font-medium hover:bg-[#7C402E] transition-colors whitespace-nowrap"
                  >
                    CELEBRATIONS
                  </Link>
                  <Link
                    href="/stay"
                    onClick={() => setSelectedPhoto(null)}
                    className="flex-1 sm:flex-initial text-center border border-[#7C402E] text-[#7C402E] px-5 py-2.5 text-[10.5px] uppercase font-sans tracking-[0.16em] font-medium hover:bg-[#7C402E] hover:text-white transition-colors whitespace-nowrap"
                  >
                    ROOMS &amp; STAY
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Reservation Call to Action */}
      <section className="mt-20 px-6 sm:px-10 max-w-[1100px] mx-auto text-center border-t border-[#7C402E]/20 pt-16">
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] text-[#2D1912] m-0 mb-4 font-normal">
          Plan Your Experience at Idanazhi
        </h2>
        <p className="font-sans text-[15px] sm:text-[16px] text-[#5A3828] max-w-[580px] mx-auto mb-8 font-light">
          Whether organizing a sacred destination wedding or seeking peaceful respite in our
          traditional Kerala chambers, our concierge is at your service.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/stay"
            className="bg-[#4E2418] text-white px-7 py-3 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-[#7C402E] transition-colors"
          >
            EXPLORE THE ROOMS
          </Link>
          <Link
            href="/celebrations"
            className="border border-[#7C402E] text-[#4E2418] px-7 py-3 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase hover:bg-[#7C402E]/10 transition-colors"
          >
            WEDDING EXPERIENCES
          </Link>
        </div>
      </section>

      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </main>
  );
}
