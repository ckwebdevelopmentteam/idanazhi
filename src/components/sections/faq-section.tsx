'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
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

export interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export const defaultFaqItems: FAQItem[] = [
  {
    id: 'faq-01',
    number: '01',
    question: 'What makes Idanazhi special?',
    answer:
      'Idanazhi brings together the character of heritage architecture and the warmth of shared experiences. Contact us to learn more about the property and what it offers.',
  },
  {
    id: 'faq-02',
    number: '02',
    question: 'Can I host an intimate wedding at Idanazhi?',
    answer:
      'Get in touch with our team to discuss your celebration, preferred date, guest count, and the arrangements available at the property.',
  },
  {
    id: 'faq-03',
    number: '03',
    question: 'Can guests stay at Idanazhi?',
    answer:
      'Contact us for current accommodation details, room availability, amenities, and arrangements for your visit.',
  },
  {
    id: 'faq-04',
    number: '04',
    question: 'How can I enquire about availability?',
    answer:
      'Send us an enquiry with your preferred date and requirements. Our team can help you understand the available options.',
  },
  {
    id: 'faq-05',
    number: '05',
    question: 'Where is Idanazhi located?',
    answer:
      'Idanazhi Farm Stay is located in Guruvayoor, Thrissur district, Kerala, India. For verified directions, access details, and travel arrangements, please get in touch with our team.',
  },
  {
    id: 'faq-06',
    number: '06',
    question: 'How can I contact the team?',
    answer:
      'You can reach our team directly by email at hello@idanazhi.com or by telephone at +91 294 277 9000. Our concierge is available to assist with all enquiries.',
  },
];

export interface FAQSectionProps {
  eyebrow?: string;
  heading?: string;
  supportingText?: string;
  contactText?: string;
  contactHref?: string;
  items?: FAQItem[];
  className?: string;
}

export function FAQSection({
  eyebrow = 'A FEW THINGS TO KNOW',
  heading = 'Questions, answered.',
  supportingText = 'Everything you need to know before planning your celebration, gathering, or stay at Idanazhi. From intimate wedding ceremonies and traditional rituals to unhurried farm stays among ancestral greenery, our heritage estate is curated for moments that feel personal, timeless, and gracefully hosted.',
  contactText = 'Have another question? Get in touch',
  contactHref = 'mailto:hello@idanazhi.com',
  items = defaultFaqItems,
  className = '',
}: FAQSectionProps) {
  // Single-open accordion behavior to maintain refined, calm editorial organization
  const [openId, setOpenId] = useState<string | null>('faq-01');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className={`relative z-20 bg-paper pt-0 pb-[clamp(72px,9.5vh,125px)] max-[720px]:pt-0 max-[720px]:pb-[56px] overflow-hidden ${className}`}
      aria-labelledby="faq-main-heading"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
          
          {/* Left Column: Editorial Introduction & Action Center (Positioned at Top of Section) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            {/* Small uppercase eyebrow */}
            <p className="m-0 mb-3 sm:mb-4 uppercase tracking-[0.22em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-left">
              {eyebrow}
            </p>

            {/* Large, refined heading matching existing hierarchy */}
            <h2
              id="faq-main-heading"
              className="font-serif text-[clamp(34px,3.8vw,52px)] font-normal leading-[1.08] tracking-[-0.03em] text-ink m-0 mb-5 text-left"
            >
              {heading}
            </h2>

            {/* Reduced, Refined Editorial Description */}
            <p className="font-sans text-[clamp(14.5px,1vw,16px)] leading-[1.75] text-muted max-w-[440px] m-0 mb-7 sm:mb-8 text-left">
              {supportingText}
            </p>

            {/* Action Buttons matching Idanazhi luxury design system */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full mb-6">
              <a
                href={contactHref}
                className="group border border-ink bg-ink text-white px-6 py-3.5 text-[11px] font-sans font-medium tracking-[0.18em] uppercase transition-all duration-300 ease-out hover:bg-forest hover:border-forest flex items-center justify-center gap-2 rounded-none w-full sm:w-auto text-center"
                aria-label="Plan your celebration - Email Enquiry"
              >
                <span>PLAN YOUR CELEBRATION</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="https://wa.me/912942779000?text=Hello%20Idanazhi%2C%20I%20would%20like%20to%20enquire%20about%20a%20wedding%20or%20stay."
                target="_blank"
                rel="noreferrer"
                className="border border-ink/40 bg-transparent text-ink hover:bg-ink hover:text-white hover:border-ink transition-all duration-300 ease-out px-5 py-3.5 text-[11px] font-sans font-medium tracking-[0.18em] uppercase flex items-center justify-center gap-2 rounded-none w-full sm:w-auto text-center"
                aria-label="WhatsApp our Concierge"
              >
                <span>WHATSAPP US</span>
              </a>
            </div>

            {/* Direct Helpline & Contact Info */}
            <div className="pt-5 border-t border-line/20 w-full max-w-[440px] text-muted text-[12.5px] font-sans">
              <span>Direct Concierge: </span>
              <a
                href="tel:+912942779000"
                className="font-medium text-ink hover:underline"
              >
                +91 294 277 9000
              </a>
              <span className="mx-2 text-muted/40">•</span>
              <a
                href="mailto:hello@idanazhi.com"
                className="font-medium text-ink hover:underline"
              >
                hello@idanazhi.com
              </a>
            </div>
          </motion.div>

          {/* Right Column: Clean Editorial Accordion List */}
          <div className="lg:col-span-7 flex flex-col w-full border-b border-line/25">
            {items.map((item) => {
              const isOpen = openId === item.id;
              const triggerId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <div
                  key={item.id}
                  className="w-full border-t border-line/25 transition-colors duration-200"
                >
                  {/* Question Trigger Button */}
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left py-5 sm:py-6 lg:py-6.5 flex items-start justify-between gap-4 group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                  >
                    <div className="flex items-baseline gap-3.5 sm:gap-5 flex-1 pr-2">
                      <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.14em] text-muted/50 shrink-0 select-none">
                        {item.number}.
                      </span>
                      <h3 className="font-sans text-[15.5px] sm:text-[17px] lg:text-[18px] font-medium text-ink leading-snug tracking-[-0.01em] m-0 group-hover:text-forest transition-colors">
                        {item.question}
                      </h3>
                    </div>

                    {/* Minimal plus/minus toggle icon */}
                    <div
                      className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-ink/70 group-hover:text-ink transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <Plus
                        size={17}
                        className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expandable Answer Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 sm:pb-7 pt-0 pl-7 sm:pl-9 pr-6 sm:pr-8">
                          <p className="font-sans text-[14px] sm:text-[15px] leading-[1.75] text-[#5A3828] m-0">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default FAQSection;
