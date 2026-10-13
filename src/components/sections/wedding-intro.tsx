import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  weddingIntroData,
  type WeddingSectionData,
  type WeddingCard,
} from '@/data/weddings';

export interface WeddingIntroProps {
  data?: WeddingSectionData;
  className?: string;
}

export function WeddingIntro({
  data = weddingIntroData,
  className = '',
}: WeddingIntroProps) {
  return (
    <section
      className={`wedding-intro-section ${className}`}
      aria-labelledby="wedding-intro-heading"
    >
      <div className="wedding-intro-container">
        {/* Section Header: Heading (Left) & Minimal CTA (Right) */}
        <div className="wedding-intro-header">
          <h2 id="wedding-intro-heading" className="wedding-intro-title">
            {data.heading}
          </h2>
          <Link
            href={data.ctaHref}
            className="wedding-intro-cta"
            aria-label={`${data.ctaText} - View wedding celebrations and offerings`}
          >
            <span>{data.ctaText}</span>
            <ArrowUpRight
              className="wedding-arrow-icon"
              size={15}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Four-Card Grid Layout */}
        <div className="wedding-card-grid">
          {data.cards.map((card: WeddingCard, index: number) => {
            if (card.type === 'editorial') {
              return (
                <article
                  key={`wedding-card-${index}`}
                  className="wedding-card wedding-card-editorial"
                  aria-label={card.eyebrow}
                >
                  <div className="wedding-editorial-top">
                    <p className="wedding-editorial-eyebrow">{card.eyebrow}</p>
                    <p className="wedding-editorial-copy">{card.copy}</p>
                  </div>
                  <div className="wedding-editorial-footer">
                    <Link
                      href={card.linkHref}
                      className="wedding-editorial-link"
                      aria-label={`${card.linkText} - Discover wedding celebrations`}
                    >
                      <span>{card.linkText}</span>
                      <ArrowUpRight
                        className="wedding-arrow-icon"
                        size={14}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={`wedding-card-${index}`}
                className="wedding-card wedding-card-photo"
              >
                <div className="wedding-card-media">
                  <img
                    src={card.image}
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    className="wedding-card-img"
                  />
                  {card.overlayLabel && (
                    <div className="wedding-card-overlay">
                      <span className="wedding-card-label">
                        {card.overlayLabel}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
