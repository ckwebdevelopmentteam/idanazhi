'use client';

import React, { useState, useId, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Search,
  Plus,
  Minus,
  MessageSquare,
  Phone,
  Mail,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  X,
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export interface FAQItem {
  id: string;
  category: 'weddings' | 'stay' | 'dining' | 'planning';
  categoryLabel: string;
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Enquiries' },
  { id: 'weddings', label: 'Weddings & Ceremonies' },
  { id: 'stay', label: 'Suites & Heritage Stay' },
  { id: 'dining', label: 'Dining & Feasts' },
  { id: 'planning', label: 'Planning & Logistics' },
] as const;

export const defaultFaqItems: FAQItem[] = [
  {
    id: 'faq-capacity',
    category: 'weddings',
    categoryLabel: 'Weddings & Ceremonies',
    question: 'What is the guest capacity for destination weddings and private celebrations?',
    answer:
      'Idanazhi comfortably hosts intimate gatherings of 50 guests up to grand celebrations of 600+ guests. The estate offers distinct event settings including the heritage Nadumuttam courtyard for auspicious vows, the open-air amphitheater lawn for grand wedding receptions, the poolside deck for evening cocktail soirées, and lush coconut grove gardens for sunset celebrations.',
    highlight: '50 to 600+ guests across multiple heritage and outdoor settings',
  },
  {
    id: 'faq-rituals',
    category: 'weddings',
    categoryLabel: 'Weddings & Ceremonies',
    question: 'Can we conduct traditional Kerala wedding rituals on the property?',
    answer:
      'Yes, Idanazhi is deeply rooted in Kerala architectural and cultural heritage. We provide authentic carved wooden mandapams, brass Nilavilakku lamps, sacred pooja spaces, and private green rooms specifically arranged for Thalikkettu, Pudavamuri, Sangeet, Mehendi, and Haldi ceremonies with effortless grace.',
    highlight: 'Purpose-built for traditional rituals, mandapams, and festive ceremonies',
  },
  {
    id: 'faq-accommodations',
    category: 'stay',
    categoryLabel: 'Suites & Heritage Stay',
    question: 'How many guests can be accommodated for overnight stay on-site?',
    answer:
      'We offer luxury heritage suites, ancestral Nalukettu chambers, and private garden villas accommodating 60 to 80 residential guests on-site. For larger wedding entourages, we partner with premier luxury resorts and boutique hotels within a 10 to 15-minute radius, complete with private chauffeured transfer coordination.',
    highlight: '60–80 guests on-site with luxury partner hotel shuttle arrangements',
  },
  {
    id: 'faq-bridal-suite',
    category: 'stay',
    categoryLabel: 'Suites & Heritage Stay',
    question: 'What exclusive amenities are provided in the Bridal Suites and Groom Chambers?',
    answer:
      'Our dedicated Bridal Suite is designed as a calm, luminous sanctuary. It features an expansive dressing salon with specialized bridal makeup vanity lighting, full-length mirrors, climate control, open-sky rain showers, private veranda access, and 24/7 dedicated butler service with pre-ceremony refreshment hampers.',
    highlight: 'Dedicated dressing salon, professional makeup vanity & 24/7 butler service',
  },
  {
    id: 'faq-dining',
    category: 'dining',
    categoryLabel: 'Dining & Feasts',
    question: 'What dining experiences do you offer, including traditional Kerala Sadhya?',
    answer:
      'Gastronomy at Idanazhi celebrates authentic heritage. Our master chefs prepare authentic Kerala Sadhyas served on fresh plantain leaves in our dedicated traditional Sattvic kitchen. For evening sangeets and cocktail dinners, our culinary team crafts bespoke multi-cuisine banquets spanning Coastal, North Indian, Continental, and Oriental selections.',
    highlight: 'Authentic plantain-leaf Kerala Sadhya & bespoke multi-cuisine banquets',
  },
  {
    id: 'faq-dietary',
    category: 'dining',
    categoryLabel: 'Dining & Feasts',
    question: 'Can dietary preferences such as Jain, Sattvic, or Vegan be accommodated?',
    answer:
      'Yes, personalized gastronomy is a core hallmark of our hospitality. We cater to all dietary preferences including pure vegetarian, Jain (without onion or garlic), vegan, and gluten-free menus. All dietary meals are prepared in dedicated, strictly segregated culinary stations to ensure purity and authenticity.',
    highlight: 'Dedicated segregated kitchens for pure vegetarian, Jain, and vegan menus',
  },
  {
    id: 'faq-vendors',
    category: 'weddings',
    categoryLabel: 'Weddings & Ceremonies',
    question: 'Are outside wedding planners, photographers, and decor specialists allowed?',
    answer:
      'You are welcome to collaborate either with our empanelled decor artisans and event production specialists or bring your preferred accredited wedding planners, florists, and photographers. Our on-site operations team works seamlessly with your vendors to ensure flawless coordination and setup.',
    highlight: 'Flexibility to collaborate with in-house artisans or external accredited planners',
  },
  {
    id: 'faq-location',
    category: 'planning',
    categoryLabel: 'Planning & Logistics',
    question: 'Where is Idanazhi located and what are the nearest transport hubs?',
    answer:
      'Idanazhi Farm Stay is nestled near Guruvayoor, Thrissur district, Kerala. It is approximately 75 to 85 minutes from Cochin International Airport (COK) and 70 minutes from Calicut International Airport (CCJ). Guruvayur and Thrissur railway stations are reachable within 15 to 30 minutes, and our concierge arranges private chauffeur airport pickups.',
    highlight: 'Close to Guruvayoor; 75 mins from Cochin Airport & 70 mins from Calicut Airport',
  },
  {
    id: 'faq-curfew',
    category: 'planning',
    categoryLabel: 'Planning & Logistics',
    question: 'What is your policy regarding music, evening sound regulations, and curfews?',
    answer:
      'Acoustic music, traditional nadaswaram, and soft ambient melodies are welcomed throughout the day. Outdoor amplified music and DJ setups are permitted until 10:00 PM in accordance with local guidelines, after which celebrations can continue seamlessly in our acoustic indoor banquet lounges.',
    highlight: 'Outdoor music permitted until 10:00 PM; indoor celebration lounges available late',
  },
  {
    id: 'faq-booking-advance',
    category: 'planning',
    categoryLabel: 'Planning & Logistics',
    question: 'How far in advance should we reserve the estate for wedding dates?',
    answer:
      'Given the exclusive nature of Idanazhi and limited buyout dates, we recommend reserving 6 to 12 months in advance, particularly for auspicious wedding dates (Muhurthams) and the prime celebration season from October through April. Weekday celebrations and intimate elopements can occasionally be accommodated with shorter notice.',
    highlight: '6 to 12 months recommended for prime auspicious dates & full buyouts',
  },
  {
    id: 'faq-parking',
    category: 'planning',
    categoryLabel: 'Planning & Logistics',
    question: 'Is there sufficient parking and accessibility for elderly or mobility-impaired guests?',
    answer:
      'Yes, the estate provides secured on-site parking for more than 150 vehicles with professional valet attendants. We prioritize comfort for all generations: our property includes gentle step-free access ramps, ground-floor heritage suites, wheelchair-accessible pathways, and chauffeured golf buggies for effortless movement across all lawns.',
    highlight: 'Valet parking for 150+ vehicles, step-free ramps & on-site golf buggies',
  },
  {
    id: 'faq-walkthrough',
    category: 'planning',
    categoryLabel: 'Planning & Logistics',
    question: 'Can we arrange a private pre-booking walkthrough and menu tasting session?',
    answer:
      'We warmly welcome couples and families for private site visits. During your visit, our wedding specialist will guide you through all event spaces, sample mock setups, and arrange a personalized culinary tasting session with our executive chef to preview your wedding banquet.',
    highlight: 'Private estate tours and personalized chef tasting sessions available on request',
  },
];

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export interface FAQSectionProps {
  items?: FAQItem[];
  className?: string;
}

export function FAQSection({ items = defaultFaqItems, className = '' }: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(['faq-capacity']));
  const searchInputId = useId();

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inQuestion = item.question.toLowerCase().includes(q);
      const inAnswer = item.answer.toLowerCase().includes(q);
      const inHighlight = item.highlight?.toLowerCase().includes(q);
      const inCategory = item.categoryLabel.toLowerCase().includes(q);

      return inQuestion || inAnswer || inHighlight || inCategory;
    });
  }, [items, selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(filteredItems.map((item) => item.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const areAllExpanded =
    filteredItems.length > 0 &&
    filteredItems.every((item) => openIds.has(item.id));

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.length };
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  return (
    <section
      id="faq"
      className={`relative z-20 bg-paper py-[clamp(68px,9vh,120px)] max-[720px]:py-[56px] overflow-hidden border-t border-line/35 ${className}`}
      aria-labelledby="faq-heading"
    >
      {/* Subtle Warm Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_0%,rgba(212,163,115,0.12),transparent_70%)]" />

      <div className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[940px] mx-auto px-4 mb-10 sm:mb-14 md:mb-16">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="m-0 mb-3 sm:mb-4 uppercase tracking-[0.22em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-center"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.p>

          <div className="w-full flex justify-center items-center text-center">
            <ScrollReveal
              as="h2"
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              textClassName="!font-jakarta !font-normal !text-[clamp(22px,2.6vw,40px)] !leading-[1.28] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
              wordAnimationStart="top 85%"
              wordAnimationEnd="bottom 55%"
            >
              <span
                id="faq-heading"
                className="block !font-jakarta !font-normal !text-[clamp(22px,2.6vw,40px)] !leading-[1.26] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[940px] mx-auto"
              >
                <span className="block sm:whitespace-nowrap">
                  <span className="word">EVERYTHING</span>{' '}
                  <span className="word">YOU</span>{' '}
                  <span className="word">WISH</span>{' '}
                  <span className="word">TO</span>{' '}
                  <span className="word">KNOW</span>
                </span>
                <span className="block sm:whitespace-nowrap">
                  <span className="word">FOR</span>{' '}
                  <span className="word">YOUR</span>{' '}
                  <span className="word">CELEBRATION</span>
                </span>
              </span>
            </ScrollReveal>
          </div>

          <div className="w-full flex justify-center items-center text-center mt-3 sm:mt-4">
            <ScrollReveal
              as="p"
              baseOpacity={0.35}
              enableBlur={true}
              baseRotation={0}
              blurStrength={3}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              textClassName="!font-sans !font-normal !text-[clamp(14px,1vw,16.5px)] !leading-[1.75] !text-muted text-center max-w-[680px] mx-auto"
              wordAnimationStart="top 85%"
              wordAnimationEnd="top 60%"
            >
              <span className="block !font-sans !font-normal !text-[clamp(14px,1vw,16.5px)] !leading-[1.75] !text-muted text-center max-w-[680px] mx-auto">
                <span className="word">Answers</span>{' '}
                <span className="word">to</span>{' '}
                <span className="word">common</span>{' '}
                <span className="word">questions</span>{' '}
                <span className="word">regarding</span>{' '}
                <span className="word">destination</span>{' '}
                <span className="word">weddings,</span>{' '}
                <span className="word">heritage</span>{' '}
                <span className="word">villas,</span>{' '}
                <span className="word">dining</span>{' '}
                <span className="word">traditions,</span>{' '}
                <span className="word">and</span>{' '}
                <span className="word">celebrations</span>{' '}
                <span className="word">at</span>{' '}
                <span className="word">Idanazhi.</span>
              </span>
            </ScrollReveal>
          </div>
        </div>

        {/* Interactive Controls Bar: Category Pills + Search */}
        <div className="max-w-[1040px] mx-auto mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-line/20">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] ?? 0;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-[11.5px] uppercase tracking-[0.14em] font-medium rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-ink text-paper shadow-sm'
                        : 'bg-transparent text-muted hover:text-ink hover:bg-ink/5 border border-line/30'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[9.5px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-paper/20 text-paper'
                          : 'bg-ink/10 text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & Expand/Collapse Toggle */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="relative flex-1 md:w-64">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
                <input
                  id={searchInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  aria-label="Search questions"
                  className="w-full bg-[#FCFAF7] border border-line/30 rounded-full pl-8 pr-7 py-1.5 text-[12.5px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-0.5"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={areAllExpanded ? collapseAll : expandAll}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] tracking-[0.12em] uppercase font-semibold text-muted hover:text-ink transition-colors px-2.5 py-1.5 border border-line/30 rounded-full bg-[#FCFAF7] cursor-pointer"
              >
                {areAllExpanded ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
          </div>

          {/* Results Summary if filtered */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <div className="flex items-center justify-between text-[11.5px] text-muted pt-3 font-sans">
              <span>
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'question' : 'questions'}
                {searchQuery && (
                  <> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</>
                )}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="underline hover:text-ink text-[11px] cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Accordion List */}
        <div className="max-w-[1040px] mx-auto space-y-3.5 sm:space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#FCFAF7] border border-line/20 rounded-2xl">
              <HelpCircle className="mx-auto text-muted mb-3 h-8 w-8 stroke-[1.5]" />
              <p className="font-serif text-[20px] text-ink mb-1">No matching questions found</p>
              <p className="text-[13px] text-muted max-w-sm mx-auto mb-5">
                We couldn&apos;t find any questions matching your criteria. Feel free to contact our concierge team directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="bg-ink text-white px-5 py-2 text-[10.5px] tracking-[0.14em] uppercase font-semibold hover:bg-forest transition-colors cursor-pointer"
              >
                VIEW ALL QUESTIONS
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isOpen = openIds.has(item.id);
              const itemNumber = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={item.id}
                  className={`group transition-all duration-300 rounded-2xl border ${
                    isOpen
                      ? 'bg-[#FCFAF7] border-ink/35 shadow-[0_4px_24px_rgba(124,64,46,0.06)]'
                      : 'bg-[#FBF8F5] border-line/25 hover:border-line/60 hover:bg-[#FCFAF7]'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-header-${item.id}`}
                    className="w-full text-left p-5 sm:p-6 lg:p-7 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4.5 flex-1 pr-2">
                      <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.1em] text-muted/70 pt-1 shrink-0 font-medium">
                        {itemNumber}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="inline-block text-[9px] sm:text-[9.5px] uppercase tracking-[0.18em] font-semibold text-ink/75 bg-ink/[0.07] px-2 py-0.5 rounded">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <h3 className="font-serif text-[17px] sm:text-[19px] lg:text-[20.5px] text-ink font-normal leading-snug tracking-[-0.01em] group-hover:text-forest transition-colors">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    {/* Animated Toggle Icon */}
                    <div
                      className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-ink text-white rotate-45 shadow-sm'
                          : 'bg-ink/[0.06] text-ink group-hover:bg-ink/[0.12]'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus size={16} className="transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Accordion Body Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-header-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 lg:px-7 pb-6 sm:pb-7 pt-1 pl-[48px] sm:pl-[64px] border-t border-line/15">
                          <p className="font-sans text-[13.5px] sm:text-[15px] leading-[1.8] text-[#5A3828] m-0 mb-3.5">
                            {item.answer}
                          </p>

                          {item.highlight && (
                            <div className="inline-flex items-center gap-2 bg-[#F3EBE3] border border-line/20 rounded-lg px-3 py-1.5 text-[11.5px] text-ink font-medium">
                              <CheckCircle2 size={13} className="text-ink/80 shrink-0" />
                              <span>{item.highlight}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Concierge Grounded Callout Box (Positioned just above footer) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUpVariants}
          className="max-w-[1040px] mx-auto mt-12 sm:mt-16 bg-[#F6EFE9] border border-line/35 rounded-2xl p-6 sm:p-9 lg:p-10 relative overflow-hidden shadow-[0_4px_30px_rgba(124,64,46,0.05)]"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-[radial-gradient(circle,rgba(212,163,115,0.2),transparent_70%)] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-[580px]">
              <div className="flex items-center gap-2 mb-2 text-[#7C402E]">
                <Sparkles size={15} />
                <span className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.2em] uppercase">
                  AT YOUR SERVICE
                </span>
              </div>
              <h3 className="font-serif text-[24px] sm:text-[28px] lg:text-[31px] font-normal leading-tight text-ink m-0 mb-2.5">
                Have a unique celebration in mind?
              </h3>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#5A3828] m-0">
                Our wedding specialists and concierge team are at your service to craft bespoke proposals, arrange private estate walkthroughs, and assist with auspicious dates.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="mailto:hello@idanazhi.com?subject=Wedding%20%26%20Event%20Enquiry%20-%20Idanazhi"
                className="bg-ink text-paper hover:bg-forest transition-colors px-5 py-3 text-[10.5px] font-medium tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-sm rounded-none w-full sm:w-auto text-center"
              >
                <Mail size={13} />
                <span>SPEAK WITH CONCIERGE</span>
              </a>

              <a
                href="https://wa.me/912942779000?text=Hello%20Idanazhi%2C%20I%20would%20like%20to%20enquire%20about%20a%20wedding%20or%20stay."
                target="_blank"
                rel="noreferrer"
                className="border border-ink/40 text-ink hover:bg-ink hover:text-white transition-colors px-4 py-3 text-[10.5px] font-medium tracking-[0.16em] uppercase flex items-center justify-center gap-2 rounded-none w-full sm:w-auto text-center"
              >
                <MessageSquare size={13} />
                <span>WHATSAPP US</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQSection;
