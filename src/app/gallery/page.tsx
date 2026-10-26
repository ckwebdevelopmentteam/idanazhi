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

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto]);

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
      <section className="px-6 sm:px-10 lg:px-16 max-w-[1280px] mx-auto text-center pt-8 sm:pt-14 pb-8 sm:pb-12">
        <h1 className="font-jakarta font-normal text-[clamp(22px,3.2vw,42px)] leading-[1.25] tracking-[-0.015em] uppercase text-[#2D1912] m-0 mb-5">
          Visual Stories &amp; Heritage Moments
        </h1>

        <p className="font-sans text-[15px] sm:text-[17px] text-[#5A3828] max-w-[680px] mx-auto leading-[1.75] font-light m-0">
          Immerse yourself in our visual tapestry — from sacred Vedic mandapams and starlit banquets
          to the tranquil timber courtyards of Guruvayoor.
        </p>
      </section>

      {/* Category Filter Navigation Bar */}
      <section className="bg-paper/95 border-y border-[#7C402E]/10 py-3 px-4 sm:px-8 mb-10 sm:mb-12">
        <div className="max-w-[1280px] mx-auto flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-[10px] sm:text-[11px] font-sans tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#7C402E] text-white font-medium shadow-xs'
                    : 'bg-transparent text-[#5A3828] hover:bg-[#7C402E]/10 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid - 3 cards in a row */}
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
              className="group cursor-pointer relative aspect-[4/3] w-full overflow-hidden bg-[#FAF4EC] border border-[#7C402E]/15 shadow-xs hover:shadow-2xl transition-all duration-300 rounded-none"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay revealing image content */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0C08]/95 via-[#1A0C08]/55 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 sm:p-6 text-white pointer-events-none">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex flex-col">
                  <span className="self-start bg-black/40 backdrop-blur-xs text-[#F5E6D3] text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 font-semibold mb-2 border border-white/20">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif text-[18px] sm:text-[20px] text-white m-0 mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-white/85 leading-relaxed font-light m-0 line-clamp-2 mb-3">
                    {item.caption}
                  </p>
                  <div className="pt-2.5 border-t border-white/20 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.18em] text-[#E8C28A]">
                      View Detail
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-[#E8C28A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
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
