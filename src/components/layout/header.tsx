'use client';

import Link from 'next/link';
import { X, ChevronRight, Phone, Mail, MapPin, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BrandLogo } from '@/components/layout/brand-logo';
import { BookingPanel } from '@/components/sections/booking-panel';

const navLinks = [
  { label: 'STORY', href: '/singapore/#story' },
  { label: 'GALLERY', href: '/singapore/#story' },
  { label: 'EXPERIENCES', href: '/singapore/#experiences' },
  { label: 'OFFERS', href: '/hotels-resorts/' },
  { label: 'ROOMS', href: '/singapore/#stay' },
  { label: 'CELEBRATIONS', href: '/singapore/experiences/' },
];

const menuDestinations = [
  'Singapore',
  'Dubai',
  'Bali',
  'Paris',
  'London',
  'Boston',
  'Doha',
  'Bahrain',
  'Sentosa',
];

const menuLinks = [
  { name: 'Hotels & Resorts', href: '/hotels-resorts/' },
  { name: 'Experiences', href: '/singapore/experiences/' },
  { name: 'Offers & Packages', href: '/hotels-resorts/' },
  { name: 'IDANAZHI Heritage', href: '/singapore/' },
];

const languages = [
  { code: 'EN', name: 'English (US)' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'ES', name: 'Español' },
  { code: 'AR', name: 'العربية' },
  { code: 'ZH', name: '简体中文' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.home-hero');
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const isAnyModalOpen = menu || booking || contactOpen || langOpen;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu, booking, contactOpen, langOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'header-solid' : ''}`}>
        <div className="header-container">
          <div className="header-top-row">
            <div className="header-top-left">
              <button
                type="button"
                aria-label="Open navigation menu"
                className="nav-hamburger-btn"
                onClick={() => setMenu(true)}
              >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </button>
            </div>

            <div className="header-top-center">
              <Link href="/" className="header-brand" aria-label="IDANAZHI Home">
                <BrandLogo className="brand-crest-svg" />
              </Link>
            </div>

            <div className="header-top-right">
              <div className="header-utilities">
                <button
                  type="button"
                  className="utility-btn"
                  aria-label="Select language"
                  onClick={() => setLangOpen(true)}
                >
                  {currentLang}
                </button>
                <button
                  type="button"
                  className="utility-btn"
                  onClick={() => setContactOpen(true)}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div className="header-divider" />

          <nav className="header-bottom-row" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {menu && (
        <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Main navigation">
          <div className="menu-head">
            <button
              type="button"
              aria-label="Close menu"
              className="modal-close-btn"
              onClick={() => setMenu(false)}
            >
              <X size={22} />
            </button>
            <Link href="/" className="header-brand dark" onClick={() => setMenu(false)}>
              <BrandLogo className="brand-crest-svg" />
            </Link>
            <button
              type="button"
              className="rates-button"
              onClick={() => {
                setMenu(false);
                setBooking(true);
              }}
            >
              CHECK RATES
            </button>
          </div>

          <div className="menu-content">
            <div>
              <p className="eyebrow">DESTINATIONS</p>
              <div className="destination-list">
                {menuDestinations.map((place) => (
                  <Link
                    key={place}
                    href={
                      place === 'Singapore'
                        ? '/singapore/'
                        : place === 'Dubai'
                        ? '/dubai/'
                        : '/hotels-resorts/'
                    }
                    onClick={() => setMenu(false)}
                  >
                    <span>{place}</span>
                    <ChevronRight size={18} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="menu-secondary-col">
              <p className="eyebrow">EXPLORE IDANAZHI</p>
              <div className="menu-links">
                {menuLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setMenu(false)}>
                    {link.name}
                  </Link>
                ))}
                <button
                  type="button"
                  className="menu-text-action"
                  onClick={() => {
                    setMenu(false);
                    setContactOpen(true);
                  }}
                >
                  Contact Concierge
                </button>
              </div>

              <div className="menu-cta-wrap">
                <button
                  type="button"
                  className="button dark-btn"
                  onClick={() => {
                    setMenu(false);
                    setBooking(true);
                  }}
                >
                  RESERVE YOUR STAY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {contactOpen && (
        <div className="custom-modal-overlay" role="dialog" aria-modal="true" aria-label="Contact IDANAZHI">
          <div className="custom-modal-card">
            <button
              type="button"
              className="custom-modal-close"
              aria-label="Close contact dialog"
              onClick={() => setContactOpen(false)}
            >
              <X size={20} />
            </button>

            <div className="modal-brand-header">
              <BrandLogo className="brand-crest-svg" />
            </div>

            <p className="eyebrow text-center">WE ARE HERE FOR YOU</p>
            <h2 className="modal-title">At Your Service</h2>
            <p className="modal-description">
              Allow our dedicated concierge team to curate every detail of your private celebration destination.
            </p>

            <div className="contact-info-list">
              <div className="contact-item">
                <MapPin size={17} className="contact-icon" />
                <div>
                  <strong>Address</strong>
                  <p>IDANAZHI, Rajasthan, India</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={17} className="contact-icon" />
                <div>
                  <strong>Telephone</strong>
                  <a href="tel:+912942779000">+91 294 277 9000</a>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={17} className="contact-icon" />
                <div>
                  <strong>Email Concierge</strong>
                  <a href="mailto:hello@idanazhi.com">hello@idanazhi.com</a>
                </div>
              </div>
            </div>

            <div className="modal-actions-row">
              <a href="mailto:hello@idanazhi.com" className="button dark-btn modal-submit-btn">
                SEND AN INQUIRY
              </a>
            </div>
          </div>
        </div>
      )}

      {langOpen && (
        <div className="custom-modal-overlay" role="dialog" aria-modal="true" aria-label="Select Language">
          <div className="custom-modal-card lang-modal-card">
            <button
              type="button"
              className="custom-modal-close"
              aria-label="Close language selector"
              onClick={() => setLangOpen(false)}
            >
              <X size={20} />
            </button>

            <p className="eyebrow text-center">GLOBAL PREFERENCES</p>
            <h2 className="modal-title">Select Language</h2>

            <div className="lang-list">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={`lang-option ${currentLang === l.code ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentLang(l.code);
                    setLangOpen(false);
                  }}
                >
                  <span>{l.name} ({l.code})</span>
                  {currentLang === l.code && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {booking && <BookingPanel close={() => setBooking(false)} />}
    </>
  );
}
