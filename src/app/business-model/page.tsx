'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Sprout, Building2, Users2, Landmark, ShieldCheck, HeartHandshake } from 'lucide-react';
import { BookingPanel } from '@/components/sections/booking-panel';

const pillars = [
  {
    icon: Sprout,
    title: 'Regenerative Agri-Tourism',
    subtitle: 'Living Farm Ecosystem',
    description:
      'Cultivating heirloom rice varieties across certified organic paddy fields. Agricultural yields supply the farm-to-table Sadya banquets, creating a closed-loop culinary experience.',
    stat: '100% Organic',
    statLabel: 'Farming Practice',
  },
  {
    icon: Landmark,
    title: 'Heritage Preservation',
    subtitle: 'Nalukettu Conservation',
    description:
      'Restoring centuries-old timber joinery, brass fixtures, and indigenous Nalukettu architecture. Preserving Kerala’s architectural identity as a functional, living luxury destination.',
    stat: 'Ancestral',
    statLabel: 'Teak Architecture',
  },
  {
    icon: Users2,
    title: 'Kumbidi Community Empowerment',
    subtitle: 'Local Craftspeople & Fishermen',
    description:
      'Direct revenue sharing and employment with village potters, handloom weavers, artisanal fishermen, and temple culinary artists, keeping indigenous knowledge alive.',
    stat: '90%+',
    statLabel: 'Local Staff & Artisans',
  },
  {
    icon: HeartHandshake,
    title: 'Multi-Tier Revenue Architecture',
    subtitle: 'Resilient Hospitality Model',
    description:
      'Balanced revenue streams combining high-yield destination weddings, premium heritage suite stays, ticketed cultural immersions, and bespoke organic farm produce.',
    stat: '4 Pillars',
    statLabel: 'Commercial Stability',
  },
];

export default function BusinessModelPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <main className="bg-paper min-h-screen text-ink">
      {/* Title Hero */}
      <section className="relative pt-[160px] pb-[80px] md:pt-[190px] md:pb-[110px] px-6 text-center max-w-[1240px] mx-auto">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-ink/15 bg-linen/50 text-[10px] uppercase font-sans font-semibold tracking-[0.22em] text-[#84382B]">
          <Sparkles size={12} />
          <span>SUSTAINABILITY & VISION</span>
        </div>
        <h1 className="font-serif text-[clamp(36px,5.2vw,72px)] font-normal leading-[1.08] tracking-[-0.035em] text-[#2D1912] m-0 mb-6 max-w-[920px] mx-auto">
          The Idanazhi Model: Heritage, Land & Hospitality
        </h1>
        <p className="font-sans text-[15px] sm:text-[17px] text-[#5A3828]/90 max-w-[680px] mx-auto font-light leading-relaxed m-0 mb-8">
          A symbiotic model marrying authentic Kerala farm life, ancestral architectural preservation, and high-touch celebration hospitality.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-7 py-3.5 bg-[#4E2418] text-white font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:bg-[#84382B] active:scale-95 cursor-pointer shadow-md no-underline"
        >
          PARTNERSHIP INQUIRIES
        </Link>
      </section>

      {/* 4 Pillars Grid */}
      <section className="px-6 md:px-12 max-w-[1360px] mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="bg-linen/40 border border-ink/12 p-8 sm:p-10 flex flex-col justify-between group transition-all duration-300 hover:border-ink/30 hover:bg-linen/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 flex items-center justify-center border border-[#84382B]/30 bg-paper text-[#84382B]">
                      <Icon size={22} />
                    </div>
                    <div className="text-right">
                      <span className="block font-serif text-[22px] font-normal text-[#2D1912] leading-none">
                        {pillar.stat}
                      </span>
                      <span className="text-[9.5px] uppercase tracking-[0.16em] text-muted">
                        {pillar.statLabel}
                      </span>
                    </div>
                  </div>
                  <p className="m-0 mb-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#84382B]">
                    {pillar.subtitle}
                  </p>
                  <h2 className="font-serif text-[26px] sm:text-[30px] font-normal text-[#2D1912] m-0 mb-4 leading-snug">
                    {pillar.title}
                  </h2>
                  <p className="font-sans text-[14px] text-[#5A3828]/95 leading-relaxed font-light m-0">
                    {pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sustainable Value Creation Section */}
      <section className="bg-linen py-20 px-6 md:px-12 border-t border-b border-ink/10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="m-0 mb-2 uppercase tracking-[0.2em] text-[10px] font-semibold text-[#84382B]">
              ECOSYSTEM SYNERGY
            </p>
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-normal text-[#2D1912] leading-tight m-0 mb-5">
              Harmonising High-End Tourism with Agrarian Stewardship
            </h2>
            <p className="font-sans text-[14.5px] text-[#5A3828]/90 leading-relaxed font-light m-0 mb-4">
              Unlike conventional hotels, Idanazhi’s identity is inseparably bound to the living soil. Our paddy fields are not mere landscaping—they are active agricultural entities yielding traditional Kerala varieties.
            </p>
            <p className="font-sans text-[14.5px] text-[#5A3828]/90 leading-relaxed font-light m-0 mb-6">
              Guests and wedding parties inhabit this authentic rural atmosphere, providing financial durability to local families while enjoying peerless privacy and cultural immersion.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <span className="block font-serif text-[28px] text-[#84382B]">Zero</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted">Chemical Pesticides</span>
              </div>
              <div className="w-px h-10 bg-ink/15" />
              <div>
                <span className="block font-serif text-[28px] text-[#84382B]">100%</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted">Heritage Reusability</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] overflow-hidden border border-ink/12 shadow-[0_16px_40px_rgba(45,25,18,0.1)]">
              <img
                src="/images/weddings/spaces/space-outdoor-1.jpg"
                alt="Idanazhi Farm Land"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Dialog */}
      {bookingOpen && (
        <BookingPanel
          close={() => setBookingOpen(false)}
        />
      )}
    </main>
  );
}
