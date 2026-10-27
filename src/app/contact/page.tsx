'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ContactSection } from '@/components/sections/contact-section';

export default function ContactPage() {
  return (
    <main className="bg-[#FAF8F5] min-h-screen text-[#2D1912] selection:bg-[#7C402E] selection:text-white pt-24 md:pt-32">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E1D9] text-[11.5px] uppercase tracking-[0.2em] font-sans">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#84382B] hover:text-[#4A2618] font-medium transition-colors group"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 text-[#8C7A70]">
            <Link href="/" className="hover:text-[#4A2618] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#84382B] font-semibold">Contact &amp; Reservations</span>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <ContactSection />
    </main>
  );
}
