'use client';
import { useMemo, useState } from 'react';
import { Map, Grid2X2 } from 'lucide-react';
import { properties } from '@/data/content';
import { PropertyCard, SectionIntro } from '@/components/sections/editorial';

const filters = ['All', 'Wellbeing', 'Art & Culture', 'Dining destinations', 'Idyllic resorts', 'Legendary location', 'Celebrations'];

export default function HotelsResorts() {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const shown = useMemo(() => filter === 'All' ? properties : properties.filter((item) => item.tags.includes(filter)), [filter]);

  return (
    <main className="pt-[115px] max-[720px]:pt-[105px]">
      {/* Directory Hero */}
      <section className="bg-forest text-white text-center py-[135px] px-6 max-[720px]:py-[90px]">
        <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">WEDDING DESTINATIONS</p>
        <h1 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-7 max-[720px]:text-[56px]">
          Celebration spaces designed for your story
        </h1>
        <p className="max-w-[530px] mx-auto text-[17px]">
          Explore our collection of romantic lakefront estates, heritage villas and private venues crafted for unforgettable destination weddings.
        </p>
      </section>

      {/* Directory Controls */}
      <div className="flex justify-between gap-[30px] py-[42px] px-[5.4vw] border-b border-line max-[720px]:block max-[720px]:py-[30px] max-[720px]:px-6">
        <div>
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">FILTER BY INTEREST</p>
          <div className="flex flex-wrap gap-[7px] max-w-[820px]">
            {filters.map((item) => (
              <button
                key={item}
                className={`bg-transparent border border-line text-ink px-3 py-[9px] text-[10px] tracking-[0.06em] cursor-pointer ${
                  filter === item ? '!bg-ink !border-ink !text-white' : ''
                }`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="whitespace-nowrap max-[720px]:mt-[27px]">
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">VIEW AS</p>
          <button
            className={`bg-transparent border border-line text-ink px-3 py-[9px] text-[10px] tracking-[0.06em] cursor-pointer inline-flex items-center gap-[5px] ${
              view === 'grid' ? '!bg-ink !border-ink !text-white' : ''
            }`}
            onClick={() => setView('grid')}
          >
            <Grid2X2 size={16} /> Grid
          </button>
          <button
            className={`bg-transparent border border-line text-ink px-3 py-[9px] text-[10px] tracking-[0.06em] cursor-pointer inline-flex items-center gap-[5px] ${
              view === 'map' ? '!bg-ink !border-ink !text-white' : ''
            }`}
            onClick={() => setView('map')}
          >
            <Map size={16} /> Map
          </button>
        </div>
      </div>

      {/* Directory Content */}
      {view === 'map' ? (
        <section
          className="h-[610px] bg-gradient-to-br from-[#d9ded7] to-[#c6d1c8] my-[50px] mx-[5.4vw] mb-[130px] relative border border-[#a9b6ad] overflow-hidden max-[720px]:m-[32px_24px_85px] max-[720px]:h-[470px]"
          aria-label="Map demonstration"
        >
          <div className="absolute z-1 left-[8%] top-[10%] max-w-[250px]">
            <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">IDANAZHI AROUND THE WORLD</p>
            <h2 className="font-serif text-[40px] font-normal leading-none m-0 mb-3">Discover our wedding collection</h2>
            <p>Explore our destination venues across iconic settings and unforgettable celebration addresses.</p>
          </div>
          {shown.map((hotel, i) => (
            <button
              key={hotel.slug}
              className="absolute z-[2] border-0 rounded-full bg-forest text-white px-3 py-2 text-[10px] tracking-[0.08em] cursor-pointer"
              style={{ left: `${12 + (i * 19) % 72}%`, top: `${25 + (i * 17) % 55}%` }}
            >
              {hotel.city}
            </button>
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-4 gap-[22px] py-[58px] px-[5.4vw] pb-[130px] max-[980px]:grid-cols-2 max-[980px]:gap-6 max-[720px]:grid-cols-1 max-[720px]:py-[38px] max-[720px]:px-6 max-[720px]:pb-[85px]">
          {shown.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </section>
      )}

      <SectionIntro
        eyebrow="IDANAZHI CLUB"
        title="Private planning for extraordinary celebrations"
        text="From bespoke wedding packages to immersive stays, our concierge team arranges every detail around your moment."
        action="PLAN YOUR EVENT"
      />
    </main>
  );
}
