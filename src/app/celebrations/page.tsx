'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BookingPanel } from '@/components/sections/booking-panel';
import { CelebrationsAndExperience } from '@/components/sections/celebrations-and-experience';

const celebrationVenues = [
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

const celebrationServices = [
  {
    title: 'Heirloom Kerala Sadya',
    description:
      'Multi-course ceremonial feasts prepared by master temple chefs, served hot on tender plantain leaves according to authentic culinary traditions.',
  },
  {
    title: 'Panchavadyam & Music',
    description:
      'Resonant Kerala temple percussion ensembles, soothing Nadaswaram melodies, and soulful classical musical accompaniment.',
  },
  {
    title: 'Bridal & Groom Suites',
    description:
      'Private heritage suites with full dressing areas, natural courtyard lighting, and round-the-clock bridal concierge service.',
  },
  {
    title: 'Farm Stay Guest Sanctuary',
    description:
      'Accommodate your most cherished family and friends across peaceful Nalukettu villas and heritage rooms with gracious hospitality.',
  },
];

export default function CelebrationsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    guestCount: '100-300',
    date: '',
    notes: '',
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <main className="min-h-screen bg-paper pt-[95px] sm:pt-[110px] pb-24 text-ink">
      {/* Hero Banner */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center text-center text-white overflow-hidden px-6">
        <img
          src="/images/weddings/stage-coastal-mandapam.jpg"
          alt="IDANAZHI Destination Wedding Stage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,19,14,0.65),rgba(35,19,14,0.78))]" />

        <div className="relative z-1 max-w-[840px] mx-auto py-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs border border-white/25 text-[10.5px] uppercase font-semibold tracking-[0.2em] text-white">
            <Sparkles size={12} />
            <span>IDANAZHI DESTINATION WEDDINGS</span>
          </div>

          <h1 className="font-serif text-[clamp(36px,5.2vw,70px)] font-normal leading-[1.04] tracking-[-0.04em] text-white m-0 mb-6 drop-shadow-md">
            A Timeless Setting for Sacred Beginnings
          </h1>

          <p className="font-sans text-[15.5px] sm:text-[18px] text-white/90 max-w-[620px] mx-auto leading-[1.75] font-light m-0 mb-9">
            Rooted in ancestral Kerala grace, Idanazhi brings your cherished circle together
            for destination weddings, milestone feasts, and sacred vows.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="bg-[#84382B] hover:bg-[#682B21] text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors shadow-lg cursor-pointer"
            >
              PLAN YOUR CELEBRATION
            </button>
            <Link
              href="/gallery"
              className="border border-white/70 hover:border-white text-white hover:bg-white/10 px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors"
            >
              EXPLORE PHOTO GALLERY
            </Link>
          </div>
        </div>
      </section>

      {/* Venues Showcase */}
      <section className="px-6 sm:px-10 lg:px-16 max-w-[1280px] mx-auto py-20 sm:py-28">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#84382B] block mb-2">
            CELEBRATION VENUES &amp; SPACES
          </span>
          <h2 className="font-serif text-[clamp(30px,4vw,50px)] text-[#2D1912] m-0 mb-4 font-normal">
            Bespoke Settings for Every Sacred Chapter
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-[#5A3828] font-light m-0">
            From the intimate sanctum of our open-air courtyard to starlit lakeside banquet
            lawns, discover venues tailored to your wedding vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {celebrationVenues.map((venue) => (
            <article
              key={venue.title}
              className="bg-white border border-[#7C402E]/20 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF4EC]">
                <img
                  src={venue.image}
                  alt={venue.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-[#2D1912]/85 text-white text-[10px] tracking-[0.14em] px-3 py-1 uppercase font-semibold">
                  {venue.capacity}
                </div>
              </div>

              <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.18em] text-[#84382B] block mb-1">
                    {venue.subtitle}
                  </span>
                  <h3 className="font-serif text-[24px] sm:text-[26px] text-[#2D1912] m-0 mb-3 leading-snug">
                    {venue.title}
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-[#5A3828] leading-[1.7] font-light m-0 mb-6">
                    {venue.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {venue.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-[13px] text-[#4A2618]">
                        <CheckCircle2 size={14} className="text-[#84382B] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#7C402E]/15 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    className="text-[11px] uppercase font-sans font-semibold tracking-[0.16em] text-[#84382B] hover:text-[#4E2418] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Check Availability</span>
                    <ArrowUpRight size={14} />
                  </button>
                  <Link
                    href="/gallery"
                    className="text-[11px] uppercase font-sans font-semibold tracking-[0.16em] text-muted hover:text-ink transition-colors"
                  >
                    View Photos
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#FAF4EC] border-y border-[#7C402E]/20 py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-[650px] mx-auto mb-14">
            <span className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#84382B] block mb-2">
              EXQUISITE EXPERIENCES
            </span>
            <h2 className="font-serif text-[clamp(28px,3.8vw,46px)] text-[#2D1912] m-0 mb-3 font-normal">
              Hospitality Rooted in Tradition
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#5A3828] font-light m-0">
              Every celebration is accompanied by our dedicated wedding concierge team, ensuring
              absolute peace of mind for both families.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {celebrationServices.map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 sm:p-7 border border-[#7C402E]/15 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-[20px] text-[#2D1912] m-0 mb-2.5">
                    {service.title}
                  </h3>
                  <p className="font-sans text-[13.5px] text-[#5A3828] leading-[1.7] font-light m-0">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Showcase */}
      <CelebrationsAndExperience />

      {/* Inquiry Form Section */}
      <section className="px-6 sm:px-10 max-w-[900px] mx-auto pt-20">
        <div className="bg-white border border-[#7C402E]/25 p-8 sm:p-12 shadow-sm text-center">
          <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.22em] text-[#84382B] block mb-2">
            DIRECT INQUIRY
          </span>
          <h2 className="font-serif text-[clamp(26px,3.5vw,40px)] text-[#2D1912] m-0 mb-3 font-normal">
            Begin Planning Your Celebration
          </h2>
          <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#5A3828] max-w-[550px] mx-auto mb-8 font-light">
            Share your preferred dates and requirements. Our wedding concierge will connect with
            you to curate a personalized celebration plan.
          </p>

          {inquirySent ? (
            <div className="bg-[#FAF4EC] border border-[#7C402E]/30 p-8 rounded-xs text-center">
              <CheckCircle2 size={36} className="text-[#84382B] mx-auto mb-3" />
              <h3 className="font-serif text-[22px] text-[#2D1912] m-0 mb-2">
                Thank You for Reaching Out
              </h3>
              <p className="font-sans text-[14px] text-[#5A3828] m-0">
                Our celebration team will contact you shortly with availability and details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#4E2418] mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya & Arjun"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF4EC]/60 border border-[#7C402E]/25 px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-[#84382B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#4E2418] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF4EC]/60 border border-[#7C402E]/25 px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-[#84382B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#4E2418] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF4EC]/60 border border-[#7C402E]/25 px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-[#84382B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#4E2418] mb-1.5">
                  Expected Celebration Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#FAF4EC]/60 border border-[#7C402E]/25 px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-[#84382B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#4E2418] mb-1.5">
                  Notes &amp; Specific Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your event type, guest count, and any special traditions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF4EC]/60 border border-[#7C402E]/25 px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-[#84382B]"
                />
              </div>

              <div className="sm:col-span-2 text-center mt-2">
                <button
                  type="submit"
                  className="bg-[#4E2418] hover:bg-[#7C402E] text-white px-8 py-3 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer"
                >
                  SUBMIT WEDDING INQUIRY
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {bookingOpen && <BookingPanel close={() => setBookingOpen(false)} />}
    </main>
  );
}
