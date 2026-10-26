'use client';

import React, { useState, useEffect, type FormEvent } from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface BookingPanelProps {
  close: () => void;
  defaultOccasion?: string;
}

const occasionOptions = [
  { id: 'wedding', label: 'Wedding' },
  { id: 'heritage-stay', label: 'Heritage Stay' },
  { id: 'celebration', label: 'Celebration' },
];

export function BookingPanel({ close, defaultOccasion = 'wedding' }: BookingPanelProps) {
  const [selectedOccasion, setSelectedOccasion] = useState(defaultOccasion);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry & Reservations"
    >
      {/* Dark Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-[6px] transition-opacity duration-300"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal Dialog Box matching user design */}
      <div className="relative w-full max-w-[680px] bg-[#291611] border border-[#4A2A20] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] p-6 sm:p-9 md:p-10 my-auto z-10 text-white animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors p-1.5 cursor-pointer bg-transparent border-0"
          aria-label="Close enquiry modal"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-serif text-[24px] sm:text-[28px] text-white font-normal m-0 mb-2">
              Thank You, {formData.name || 'Valued Guest'}
            </h3>
            <p className="font-sans text-[13.5px] text-[#D8C7B9] max-w-[420px] leading-relaxed m-0 mb-6 font-light">
              Your enquiry has been received. Our concierge team will reach out to you within 24 hours.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={close}
                className="bg-white text-[#291611] font-sans text-[11px] font-semibold tracking-[0.16em] uppercase px-6 py-2.5 hover:bg-[#FAF4EC] transition-colors cursor-pointer border-0"
              >
                CLOSE
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', message: '' });
                }}
                className="bg-transparent border border-white/20 text-[#D8C7B9] hover:border-white/50 hover:text-white font-sans text-[11px] tracking-[0.16em] uppercase px-5 py-2.5 transition-colors cursor-pointer"
              >
                NEW ENQUIRY
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6" noValidate>
            {/* Occasion Options */}
            <div>
              <label className="block text-[10.5px] uppercase tracking-[0.18em] text-[#D8C7B9]/80 font-medium mb-2.5">
                OCCASION
              </label>
              <div className="flex flex-wrap gap-2.5">
                {occasionOptions.map((occ) => {
                  const isSelected = selectedOccasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={`px-4 py-2 text-[11px] font-sans tracking-[0.06em] transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-white text-[#291611] font-semibold border-white shadow-sm'
                          : 'bg-transparent text-[#E0D3C7]/90 border-[#4A2A20] hover:border-white/40'
                      }`}
                    >
                      {occ.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="modal-name"
                  className="block text-[10.5px] uppercase tracking-[0.18em] text-[#D8C7B9]/80 font-medium mb-1.5"
                >
                  NAME <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-[#1F0F0A]/70 border border-[#4A2A20] focus:border-white/40 focus:bg-[#1F0F0A] text-white placeholder:text-white/35 text-[13.5px] px-3.5 py-3 outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-email"
                  className="block text-[10.5px] uppercase tracking-[0.18em] text-[#D8C7B9]/80 font-medium mb-1.5"
                >
                  EMAIL <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your email address"
                  className="w-full bg-[#1F0F0A]/70 border border-[#4A2A20] focus:border-white/40 focus:bg-[#1F0F0A] text-white placeholder:text-white/35 text-[13.5px] px-3.5 py-3 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Telephone / WhatsApp */}
            <div>
              <label
                htmlFor="modal-phone"
                className="block text-[10.5px] uppercase tracking-[0.18em] text-[#D8C7B9]/80 font-medium mb-1.5"
              >
                TELEPHONE / WHATSAPP
              </label>
              <input
                id="modal-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 or country code"
                className="w-full bg-[#1F0F0A]/70 border border-[#4A2A20] focus:border-white/40 focus:bg-[#1F0F0A] text-white placeholder:text-white/35 text-[13.5px] px-3.5 py-3 outline-none transition-colors"
              />
            </div>

            {/* Message & Dates */}
            <div>
              <label
                htmlFor="modal-message"
                className="block text-[10.5px] uppercase tracking-[0.18em] text-[#D8C7B9]/80 font-medium mb-1.5"
              >
                MESSAGE &amp; DATES
              </label>
              <textarea
                id="modal-message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your celebration, preferred dates, or requirements..."
                className="w-full bg-[#1F0F0A]/70 border border-[#4A2A20] focus:border-white/40 focus:bg-[#1F0F0A] text-white placeholder:text-white/35 text-[13.5px] p-3.5 outline-none transition-colors resize-none"
              />
            </div>

            {errorMsg && (
              <p className="text-[12px] text-[#FFA894] font-sans m-0">
                {errorMsg}
              </p>
            )}

            {/* Send Enquiry Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="group border border-white bg-white text-[#291611] hover:bg-[#FAF4EC] px-7 py-3.5 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase transition-all duration-200 flex items-center justify-center gap-2.5 rounded-none cursor-pointer disabled:opacity-50"
              >
                <span>{submitting ? 'TRANSMITTING...' : 'SEND ENQUIRY'}</span>
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.2}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
