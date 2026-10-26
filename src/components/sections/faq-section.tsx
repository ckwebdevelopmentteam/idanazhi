'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

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
  heading = 'FREQUENTLY ASKED QUESTIONS',
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
      <div className="w-full max-w-[1040px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header: Eyebrow + Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUpVariants}
          className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10 sm:mb-14"
        >
          {eyebrow && (
            <p className="m-0 mb-3 sm:mb-4 uppercase tracking-[0.22em] text-[10.5px] sm:text-[11.5px] font-semibold text-muted text-center">
              {eyebrow}
            </p>
          )}

          <div className="w-full flex justify-center items-center text-center">
            <ScrollReveal
              as="h2"
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
              containerClassName="!my-0 w-full text-center flex flex-col items-center justify-center mx-auto"
              textClassName="!font-jakarta !font-normal !text-[clamp(19px,2.5vw,36px)] !leading-[1.32] !tracking-[-0.015em] !uppercase !text-ink text-center max-w-[800px] mx-auto"
              wordAnimationStart="top 85%"
              wordAnimationEnd="bottom 55%"
            >
              {heading}
            </ScrollReveal>
          </div>
        </motion.div>

        {/* Clean Editorial Accordion List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUpVariants}
          className="flex flex-col w-full border-b border-line/25"
        >
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
        </motion.div>
      </div>
    </section>
  );
}

export default FAQSection;
