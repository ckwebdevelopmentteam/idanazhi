import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Sun,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { experienceSubCategories } from '@/data/navigation';
import { BookingPanelClientWrapper } from './booking-wrapper';

interface ExperienceDetail {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  subtitle: string;
  description: string;
  longDescription: string;
  narrativeParagraphs: string[];
  image: string;
  secondaryImage?: string;
  duration: string;
  bestTime: string;
  setting: string;
  groupSize: string;
  highlights: string[];
  included: string[];
  whatToBring: string[];
}

const detailedExperiences: Record<string, ExperienceDetail> = {
  'rice-farming': {
    id: 'rice-farming',
    slug: 'rice-farming',
    title: 'Paddy Field & Traditional Rice Farming',
    shortTitle: 'Traditional Rice Farming',
    category: 'Agrarian Heritage',
    subtitle: 'Ancestral Agrarian Heritage & Living With the Soil',
    description:
      'Immerse in time-honoured Kerala agricultural heritage, walking through emerald paddy fields, mud-ploughing traditions, and seasonal harvest rituals.',
    longDescription:
      'Step barefoot onto the cool, fertile soil of Kerala’s historic paddy fields. Guided by generational farmers who have tended these soils for decades, you will experience the unhurried rhythms of traditional agriculture—from seedling transplanting and understanding gravity-fed stone irrigation channels to tasting sweet tender coconut water fresh from the grove.',
    narrativeParagraphs: [
      'For centuries, the agricultural calendar of the Bharatapuzha basin has moved in rhythm with the monsoons and seasonal sowing. At Idanazhi, we invite you to experience this living heritage not as a bystander, but with your feet grounded in the earth.',
      'Under the warm morning light, generational farm custodians demonstrate the ancient craft of water-wheel irrigation (Chakram), the preservation of indigenous heirloom rice varieties, and the delicate art of seedling transplantation.',
      'The morning concludes beneath shaded coconut palms beside the fields, sharing fresh tender coconut, steamed Kerala plantains, and steaming cardamom tea poured in terracotta cups.',
    ],
    image: '/images/experiences/paddy-farming-experience.jpg',
    secondaryImage: '/images/experiences/working-fields.jpg',
    duration: '2.5 Hours',
    bestTime: 'Early Morning (6:30 AM – 9:00 AM)',
    setting: 'Idanazhi Organic Fields & Irrigation Bunds',
    groupSize: 'Private & Intimate (2–8 Guests)',
    highlights: [
      'Barefoot mud-walk along ancient stone field bunds',
      'Hands-on planting of native heirloom paddy varieties',
      'Understanding traditional gravity-fed water channels',
      'Heirloom grain tasting and agrarian storytelling with native elders',
      'Fresh tender coconut water and farm-fresh refreshments',
    ],
    included: [
      'Private guided immersion with generational farming elders',
      'All farm tools, boots, and traditional field accessories',
      'Tender coconut water and traditional farm snacks',
      'Cold towels and private transport to field bunds',
    ],
    whatToBring: [
      'Comfortable clothing suitable for outdoor walking',
      'Sun hat or protective headwear',
      'Slip-on footwear that can be easily removed for barefoot field walks',
    ],
  },
  'kumbidi-village': {
    id: 'kumbidi-village',
    slug: 'kumbidi-village',
    title: 'Kumbidi Village Life',
    shortTitle: 'Kumbidi Village Life',
    category: 'Village & Craft',
    subtitle: 'Authentic Rural Living & Generational Craftsmanship',
    description:
      'Wander through the tranquil lanes of Kumbidi village, meeting local weavers, pottery masters, and experiencing genuine rural Kerala warmth.',
    longDescription:
      'Kumbidi is a living tapestry of rural Kerala culture nestled alongside the Bharathapuzha river basin. Wander along shaded pathways flanked by betel nut palms, sit beside master potters shaping terracotta vessels on hand-turned wheels, observe local weavers at their wooden looms, and pause at a traditional village chayakada for steaming cardamom tea and quiet conversation.',
    narrativeParagraphs: [
      'Untouched by commercial tourism, Kumbidi remains a sanctuary where rural life unfolds with grace and hospitality. The village preserves centuries of artisanal knowledge passed down through family lineages.',
      'Spend time with generational master potters whose clay work reflects the earthen forms of traditional Kerala temple vessels. Try your hand at shaping wet terracotta on the heavy wooden wheel, guided by hands that have practiced this art for half a century.',
      'Stroll past heritage handloom ateliers where fine kasavu borders are woven row by row, and conclude the walk at the neighborhood tea shop (chayakada), where village elders gather to discuss local news over freshly brewed chai and banana fritters.',
    ],
    image: '/images/experiences/kumbidi-village-experience.jpg',
    duration: '3.0 Hours',
    bestTime: 'Morning (9:00 AM) or Late Afternoon (3:30 PM – 6:30 PM)',
    setting: 'Kumbidi Artisan Quarter & Village Pathways',
    groupSize: 'Private & Curated (2–6 Guests)',
    highlights: [
      'Interactive clay pottery wheel demonstration with master potters',
      'Generational handloom weaving atelier visit and kasavu craft',
      'Traditional village tea stall (Chayakada) visit with warm snacks',
      'Unhurried conversations and storytelling with Kumbidi native elders',
      'Scenic walk through quiet palm-shaded village lanes',
    ],
    included: [
      'Dedicated cultural custodian and English/Malayalam interpreter',
      'All pottery clay and artisan workshop materials',
      'Tea and traditional snacks at the village chayakada',
      'Door-to-door private transport from Idanazhi estate',
    ],
    whatToBring: [
      'Light cotton clothing and comfortable walking shoes',
      'Camera or sketchbook for recording village architecture',
      'Modest attire respectful of local rural community traditions',
    ],
  },
  'temple-experience': {
    id: 'temple-experience',
    slug: 'temple-experience',
    title: 'Temple Trails',
    shortTitle: 'Temple Trails',
    category: 'Sacred Heritage',
    subtitle: 'Vedic Sanctums, Rituals & Thachu Shastra Architecture',
    description:
      'Witness sacred temple architecture, the resonance of morning oil lamps, ceremonial pujan, and timeless spiritual peace.',
    longDescription:
      'Centuries-old Kerala temples are sanctums of profound stillness, built with teak joinery, laterite stone, and cosmic geometric alignment. Accompanied by our resident cultural custodian, discover the sacred architecture of the region, listen to the resonant notes of Sopana Sangeetham, and witness the Deeparadhana as hundreds of brass oil lamps flicker to life against ancient stone.',
    narrativeParagraphs: [
      'The sacred architecture of Kerala is rooted in Thachu Shastra—the science of timber geometry, spatial harmony, and sacred cosmic alignment. Each sanctum is oriented to harness quiet energy and natural ventilation.',
      'Accompanied by our resident cultural scholar, you will walk the circumambulatory corridors (Pradakshina Vazhi) of ancient temple courtyards, observing hand-carved teak rafters, laterite sanctums, and timeless copper-tiled gopurams.',
      'As twilight falls, the temple comes alive during the Deeparadhana ceremony. Watch as hundreds of brass Vilakkus (oil lamps) are lit one by one, reflecting warm golden light across sacred stone while classical temple drums and Sopana Sangeetham resonate in the air.',
    ],
    image: '/images/experiences/temple-heritage-experience.jpg',
    duration: '2.0 Hours',
    bestTime: 'Dawn Nirmalyam (6:00 AM) or Twilight Deeparadhana (6:00 PM)',
    setting: 'Historic Temple Sanctums of the Bharatapuzha Valley',
    groupSize: 'Private (2–6 Guests)',
    highlights: [
      'Architectural walk through historic teak wood gopurams',
      'Witnessing the Deeparadhana brass oil lamp ritual at twilight',
      'Traditional temple prasadam prepared by heritage temple cooks',
      'Deep insights into sacred Nalukettu & Thachu Shastra cosmological design',
      'Listening to authentic Sopana Sangeetham vocal melodies',
    ],
    included: [
      'Private accompanied tour with Idanazhi cultural custodian',
      'Traditional handwoven cotton temple shawls / dhotis if required',
      'Sacred temple offerings and consecrated prasadam tasting',
      'Private chauffeured transfers to temple grounds',
    ],
    whatToBring: [
      'Traditional respectful attire (shoulders and knees covered)',
      'Slip-off footwear (shoes must be removed before entering sanctums)',
      'A quiet, contemplative mindset respectful of sacred rituals',
    ],
  },
  'fishing-harbor': {
    id: 'fishing-harbor',
    slug: 'fishing-harbor',
    title: 'Fishing life in harbour',
    shortTitle: 'Fishing life in harbour',
    category: 'River & Waters',
    subtitle: 'Riverbank Casting & Dawn Watercraft Expedition',
    description:
      'Experience live riverbank fishing, traditional casting net craft, and the brisk dawn arrival of traditional wooden watercraft.',
    longDescription:
      'As first light breaks through the river mist, board a traditional wooden country craft with local fishermen. Watch the graceful, practiced unfurling of the Veechu Vala (circular cast net), observe the morning sorting of fresh river pearl spot (Karimeen), and return to Idanazhi where our culinary team prepares the morning catch with freshly pressed coconut milk.',
    narrativeParagraphs: [
      'Before sunrise, while the river is still cloaked in gentle morning mist, the waters of the Bharatapuzha stir to life. Artisanal fishermen guide wooden country canoes along calm shallows, casting hand-woven nets with astonishing precision.',
      'Step aboard a handcrafted wooden craft and watch master net-casters demonstrate the Veechu Vala—a circular net weighted with lead rings that unfurls like a flower across the glass-like water surface.',
      'Observe the morning sorting of indigenous freshwater pearl spot (Karimeen), river prawns, and catfishes. Upon returning to Idanazhi, our chef welcomes you to a private cooking demonstration showcasing heritage Kerala coastal curries with coconut and spices.',
    ],
    image: '/images/experiences/fishing-harbor-experience.jpg',
    duration: '2.5 Hours',
    bestTime: 'Sunrise Departure (5:30 AM – 8:30 AM)',
    setting: 'River Shore, Country Canoe & Landing Point',
    groupSize: 'Private (2–6 Guests)',
    highlights: [
      'Early morning wooden canoe excursion on quiet waters',
      'Live demonstration and hands-on practice of traditional throw-net casting',
      'Observing the morning river catch and native fish species',
      'Fresh catch preparation demonstration by Idanazhi private chefs',
      'Sunrise breakfast with fresh coconut water along the riverbank',
    ],
    included: [
      'Private wooden canoe expedition with experienced local boatmen',
      'Certified safety life jackets and river equipment',
      'Live net-casting instruction and demonstrations',
      'Riverside morning tea and chef-curated culinary tasting',
    ],
    whatToBring: [
      'Light footwear that can get wet or easily slip off',
      'Camera with protective strap for water excursions',
      'Light jacket or shawl for the early morning breeze',
    ],
  },
};

// Aliases for seamless backward compatibility
detailedExperiences['paddy-farming'] = detailedExperiences['rice-farming'];
detailedExperiences['temple-heritage'] = detailedExperiences['temple-experience'];

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'rice-farming' },
    { slug: 'kumbidi-village' },
    { slug: 'temple-experience' },
    { slug: 'fishing-harbor' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = detailedExperiences[slug];

  if (!exp) {
    return {
      title: 'Experience | Idanazhi Heritage Farm Stay',
    };
  }

  return {
    title: `${exp.title} | Idanazhi Kerala Heritage Experience`,
    description: exp.description,
    openGraph: {
      title: `${exp.title} — Idanazhi Farm Stay`,
      description: exp.description,
      images: [
        {
          url: exp.image,
          alt: exp.title,
        },
      ],
    },
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const exp = detailedExperiences[slug];

  if (!exp) {
    notFound();
  }

  // Other experiences for bottom navigation
  const otherExperiences = experienceSubCategories.filter(
    (item) => item.slug !== exp.slug && item.id !== exp.id
  );

  return (
    <main className="bg-[#FAF8F5] min-h-screen text-[#2D1912] selection:bg-[#7C402E] selection:text-white pt-24 md:pt-32 pb-24 md:pb-36">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E1D9] text-[11.5px] uppercase tracking-[0.2em] font-sans">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-[#84382B] hover:text-[#4A2618] font-medium transition-colors group"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to All Experiences</span>
          </Link>

          <div className="flex items-center gap-2 text-[#8C7A70]">
            <Link href="/" className="hover:text-[#4A2618] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/experiences"
              className="hover:text-[#4A2618] transition-colors"
            >
              Experiences
            </Link>
            <span>/</span>
            <span className="text-[#84382B] font-semibold">{exp.shortTitle}</span>
          </div>
        </div>
      </div>

      {/* Hero Header: Title, Category, Poetic Subtitle */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
        <div className="max-w-[960px]">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#84382B]/10 text-[#84382B] text-[10.5px] uppercase font-sans tracking-[0.2em] font-semibold mb-5">
            <Sparkles size={11} />
            <span>{exp.category} · KERALA IMMERSION</span>
          </div>

          <h1 className="font-serif text-[clamp(34px,5vw,68px)] font-normal text-[#2D1912] leading-[1.08] tracking-[-0.025em] m-0 mb-5">
            {exp.title}
          </h1>

          <p className="font-serif italic text-[18px] sm:text-[22px] text-[#7A5A4D] leading-relaxed max-w-[780px] m-0">
            {exp.subtitle}
          </p>
        </div>
      </section>

      {/* Main Photographic Frame */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-20">
        <div className="relative w-full aspect-[16/9] max-h-[640px] overflow-hidden bg-[#ECE6DF] border border-[#7C402E]/20 shadow-xl group">
          <img
            src={exp.image}
            alt={exp.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

          {/* Quick badge on bottom of hero image */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 text-white max-w-[620px]">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium text-white/85 block mb-1">
              Private Heritage Journey
            </span>
            <p className="font-serif text-[15px] sm:text-[18px] text-white m-0 drop-shadow-sm font-light">
              Hosted in Kumbidi with native custodians and generational craft masters.
            </p>
          </div>
        </div>
      </section>

      {/* Metadata Ribbon: Duration, Best Time, Setting, Group Size */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 mb-16 sm:mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 bg-[#F6EFE6] border border-[#7C402E]/20">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#84382B]/10 text-[#84382B] flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C7A70] block font-semibold mb-1">
                Duration
              </span>
              <span className="font-serif text-[15px] sm:text-[16px] text-[#2D1912] font-normal">
                {exp.duration}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#84382B]/10 text-[#84382B] flex items-center justify-center shrink-0 mt-0.5">
              <Sun size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C7A70] block font-semibold mb-1">
                Ideal Time
              </span>
              <span className="font-serif text-[15px] sm:text-[16px] text-[#2D1912] font-normal">
                {exp.bestTime}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#84382B]/10 text-[#84382B] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C7A70] block font-semibold mb-1">
                Location
              </span>
              <span className="font-serif text-[14.5px] sm:text-[15.5px] text-[#2D1912] font-normal leading-snug block">
                {exp.setting}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#84382B]/10 text-[#84382B] flex items-center justify-center shrink-0 mt-0.5">
              <Users size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C7A70] block font-semibold mb-1">
                Experience Type
              </span>
              <span className="font-serif text-[15px] sm:text-[16px] text-[#2D1912] font-normal">
                {exp.groupSize}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Editorial Story + Reservation Card */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Deep Narrative & Highlights */}
          <div className="lg:col-span-7 flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.24em] font-sans text-[#84382B] font-semibold mb-3">
              THE NARRATIVE
            </p>
            <h2 className="font-serif text-[clamp(26px,3.2vw,38px)] font-normal text-[#2D1912] leading-[1.2] mb-6">
              A private encounter rooted in the soil, memory, and living craft of Kerala.
            </h2>

            <div className="space-y-5 text-[#5A4238] font-sans font-light text-[15.5px] sm:text-[17px] leading-[1.8] mb-12">
              {exp.narrativeParagraphs.map((para, i) => (
                <p key={i} className="m-0">
                  {para}
                </p>
              ))}
            </div>

            {/* Highlights Breakdown */}
            <div className="pt-8 border-t border-[#E8E1D9] mb-12">
              <h3 className="font-serif text-[22px] sm:text-[24px] text-[#2D1912] mb-6">
                Curated Highlights &amp; Inclusions
              </h3>
              <ul className="space-y-4">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <CheckCircle2
                      size={18}
                      className="text-[#84382B] shrink-0 mt-1"
                    />
                    <span className="font-sans text-[15px] sm:text-[16px] text-[#4A2618] leading-relaxed">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Bring / Guest Notes */}
            <div className="p-6 bg-[#FAF4EC] border-l-2 border-[#84382B]">
              <h4 className="font-sans text-[12px] uppercase tracking-[0.2em] font-semibold text-[#84382B] mb-2">
                Guest Guidelines &amp; Etiquette
              </h4>
              <ul className="space-y-2 text-[14px] text-[#5A4238] font-sans">
                {exp.whatToBring.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Reservation Panel Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white border border-[#7C402E]/25 p-7 sm:p-9 shadow-xl">
              <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#84382B] font-semibold block mb-2">
                RESERVATION &amp; ENQUIRY
              </span>
              <h3 className="font-serif text-[24px] sm:text-[28px] text-[#2D1912] font-normal leading-snug mb-3">
                Experience {exp.shortTitle}
              </h3>
              <p className="font-sans text-[14px] text-[#5A4238] leading-relaxed mb-6">
                Each immersion is tailored privately to your stay at Idanazhi. Share your preferred date and our estate host will coordinate your private timing.
              </p>

              <div className="space-y-3.5 mb-8 pb-6 border-b border-[#E8E1D9] text-[13px] font-sans text-[#4A2618]">
                <div className="flex justify-between">
                  <span className="text-[#8C7A70]">Duration:</span>
                  <span className="font-medium">{exp.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A70]">Departure Timing:</span>
                  <span className="font-medium">{exp.bestTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A70]">Group Structure:</span>
                  <span className="font-medium">Private Estate Guests Only</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A70]">Local Custodians:</span>
                  <span className="font-medium text-[#84382B]">Included</span>
                </div>
              </div>

              {/* Client CTA Wrapper */}
              <BookingPanelClientWrapper experienceTitle={exp.title} />

              <p className="text-[11px] text-[#8C7A70] text-center mt-4 m-0 font-sans">
                Complimentary consultation with our resident cultural host.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Experiences */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 border-t border-[#E8E1D9]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[10.5px] uppercase font-sans tracking-[0.24em] text-[#84382B] font-semibold mb-2">
              FURTHER IMMERSIONS
            </p>
            <h2 className="font-serif text-[28px] sm:text-[36px] font-normal text-[#2D1912] m-0">
              Other Ways to Experience Idanazhi
            </h2>
          </div>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-sans font-semibold tracking-[0.18em] uppercase text-[#84382B] hover:text-[#4A2618] transition-colors"
          >
            <span>View All Experiences</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {otherExperiences.map((other) => (
            <Link
              key={other.id}
              href={`/experiences/${other.slug}`}
              className="group block bg-white border border-[#7C402E]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 no-underline"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#ECE6DF]">
                <img
                  src={other.image}
                  alt={other.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <span className="text-[9.5px] uppercase font-sans tracking-[0.2em] text-[#84382B] font-semibold block mb-1">
                  {other.subtitle}
                </span>
                <h3 className="font-serif text-[19px] sm:text-[21px] text-[#2D1912] group-hover:text-[#84382B] transition-colors m-0 mb-3 leading-snug">
                  {other.shortTitle}
                </h3>
                <p className="font-sans text-[13.5px] text-[#5A4238] line-clamp-2 leading-relaxed m-0 mb-4 font-light">
                  {other.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-[0.16em] uppercase text-[#7C402E] group-hover:text-[#4A2618]">
                  <span>Discover Journey</span>
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
