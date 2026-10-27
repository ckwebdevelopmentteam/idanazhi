'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const occasionTypes = [
  { id: 'wedding', label: 'Wedding' },
  { id: 'stay', label: 'Heritage Stay' },
  { id: 'event', label: 'Celebration' },
] as const;

export interface ContactSectionProps {
  className?: string;
}

export function ContactSection({ className = '' }: ContactSectionProps) {
  const [selectedType, setSelectedType] = useState<string>('wedding');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name and email address.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section
      id="contact"
      className={`relative z-20 w-full bg-[#341810] text-[#F7F3EF] py-[clamp(64px,9vh,124px)] max-[720px]:py-[50px] border-t border-[#7C402E]/30 overflow-hidden flex flex-col justify-center ${className}`}
      aria-labelledby="contact-heading"
    >
      {/* Background Heritage Texture & Warm Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/celebrations-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center select-none opacity-[0.12] mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_25%_25%,rgba(168,92,68,0.2),transparent_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#28130d]/40 via-transparent to-[#28130d]/50" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* 2-Column Balanced Layout: Left (Title, Heading, Desc, Buttons) | Right (Minimal Contact) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
          
          {/* LEFT COLUMN: Title, Heading, Description & Action Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="lg:col-span-6 flex flex-col items-start text-left max-w-[620px]"
          >
            {/* Eyebrow Label */}
            <p className="m-0 mb-3 sm:mb-4 uppercase tracking-[0.22em] text-[10px] sm:text-[11.5px] font-semibold text-[#D4AF37] text-left">
              GET IN TOUCH
            </p>

            {/* Left-Aligned Heading */}
            <motion.h2
              id="contact-heading"
              variants={fadeUpVariants}
              className="font-jakarta font-normal text-[clamp(20px,2.4vw,38px)] leading-[1.28] tracking-[-0.015em] uppercase text-white text-left m-0"
            >
              <span className="block sm:whitespace-nowrap">A SACRED SANCTUARY</span>
              <span className="block sm:whitespace-nowrap">AWAITS YOUR CELEBRATION</span>
            </motion.h2>

            {/* Description matching Homepage Typography */}
            <motion.p
              variants={fadeUpVariants}
              className="font-sans font-light text-[clamp(14px,1.05vw,16px)] leading-[1.75] text-[#E5D7CB]/80 max-w-[480px] m-0 mt-4 sm:mt-5 text-left"
            >
              Whether planning a sacred destination wedding, an intimate family gathering, or an unhurried heritage stay, our concierge is dedicated to perfecting every detail of your time at Idanazhi.
            </motion.p>

            {/* Action Buttons in Left Column */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full mt-7 sm:mt-8">
              <a
                href="https://wa.me/912942779000?text=Hello%20Idanazhi%2C%20I%20would%20like%20to%20enquire%20about%20a%20wedding%20or%20stay."
                target="_blank"
                rel="noreferrer"
                className="group border border-white bg-white text-[#341810] px-6 py-3.5 text-[11px] font-sans font-medium tracking-[0.18em] uppercase transition-all duration-300 ease-out hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#24110A] flex items-center justify-center gap-2 rounded-none w-full sm:w-auto text-center cursor-pointer"
                aria-label="WhatsApp Concierge"
              >
                <span>WHATSAPP US</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="tel:+912942779000"
                className="border border-white/35 bg-transparent text-white hover:bg-white hover:text-[#341810] hover:border-white transition-all duration-300 ease-out px-5 py-3.5 text-[11px] font-sans font-medium tracking-[0.18em] uppercase flex items-center justify-center gap-2 rounded-none w-full sm:w-auto text-center cursor-pointer"
                aria-label="Call Concierge Directly"
              >
                <span>CALL DIRECTLY</span>
              </a>
            </div>

            {/* Direct Helpline & Contact Info matching FAQ Section */}
            <div className="pt-6 mt-8 border-t border-white/12 w-full max-w-[480px] text-[#D8C7B9]/75 text-[12.5px] font-sans flex flex-wrap items-center gap-y-1">
              <span>Direct Concierge: </span>
              <a
                href="tel:+912942779000"
                className="font-medium text-white hover:text-[#D4AF37] ml-1.5 transition-colors"
              >
                +91 294 277 9000
              </a>
              <span className="mx-2 text-white/30">•</span>
              <a
                href="mailto:hello@idanazhi.com"
                className="font-medium text-white hover:text-[#D4AF37] transition-colors"
              >
                hello@idanazhi.com
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Minimal Contact Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="lg:col-span-6 w-full bg-white/[0.03] border border-white/10 p-6 sm:p-8 md:p-9 backdrop-blur-[4px]"
          >
            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-3.5">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-serif text-[22px] sm:text-[24px] text-white font-normal m-0 mb-1.5">
                  Thank You, {formData.name || 'Valued Guest'}
                </h3>
                <p className="font-sans text-[13.5px] text-[#D8C7B9] max-w-[380px] leading-relaxed m-0 mb-5">
                  Your enquiry has been received. Our concierge team will reach out to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="card-cta text-[#D4AF37] hover:text-white"
                >
                  <span className="cta-text">SEND ANOTHER MESSAGE</span>
                  <ArrowUpRight size={14} className="cta-arrow" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                {/* Minimal Occasion Selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#D8C7B9]/80 font-medium mb-2">
                    Occasion
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {occasionTypes.map((type) => {
                      const isSelected = selectedType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={`px-3 py-1.5 text-[10.5px] font-sans tracking-[0.06em] transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? 'bg-white text-[#28130d] font-semibold border-white'
                              : 'bg-transparent text-[#E0D3C7]/90 border-white/15 hover:border-white/35'
                          }`}
                        >
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <label
                      htmlFor="minimal-contact-name"
                      className="block text-[10px] uppercase tracking-[0.16em] text-[#D8C7B9]/80 font-medium mb-1"
                    >
                      Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="minimal-contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-white/[0.04] border border-white/12 focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 text-[13px] px-3 py-2.5 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="minimal-contact-email"
                      className="block text-[10px] uppercase tracking-[0.16em] text-[#D8C7B9]/80 font-medium mb-1"
                    >
                      Email <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="minimal-contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="w-full bg-white/[0.04] border border-white/12 focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 text-[13px] px-3 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Telephone */}
                <div>
                  <label
                    htmlFor="minimal-contact-phone"
                    className="block text-[10px] uppercase tracking-[0.16em] text-[#D8C7B9]/80 font-medium mb-1"
                  >
                    Telephone / WhatsApp
                  </label>
                  <input
                    id="minimal-contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 or country code"
                    className="w-full bg-white/[0.04] border border-white/12 focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 text-[13px] px-3 py-2.5 outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="minimal-contact-message"
                    className="block text-[10px] uppercase tracking-[0.16em] text-[#D8C7B9]/80 font-medium mb-1"
                  >
                    Message & Dates
                  </label>
                  <textarea
                    id="minimal-contact-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your celebration, preferred dates, or requirements..."
                    className="w-full bg-white/[0.04] border border-white/12 focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 text-[13px] p-3 outline-none transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-[11.5px] text-[#FFA894] font-sans m-0">
                    {errorMsg}
                  </p>
                )}

                {/* Minimal Submit Action Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group border border-white bg-white text-[#341810] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#24110A] px-6 py-3 text-[10.5px] font-sans font-semibold tracking-[0.18em] uppercase transition-all duration-300 ease-out flex items-center justify-center gap-2 rounded-none cursor-pointer disabled:opacity-50 w-full sm:w-auto"
                  >
                    <span>{submitting ? 'TRANSMITTING...' : 'SEND ENQUIRY'}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
