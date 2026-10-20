import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Property } from '@/data/content';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">{children}</p>;
}

export function ImageBlock({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden bg-linen aspect-[4/5] ${className}`}>
      <img src={src} alt={alt} className="transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.035]" />
    </div>
  );
}

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group">
      <div className="overflow-hidden bg-linen aspect-[4/5] max-[720px]:aspect-[4/4.5]">
        <img src={property.image} alt={property.name} className="transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.035]" />
      </div>
      <div className="pt-[17px] px-[1px] pb-2">
        <p className="m-0 mb-[9px] uppercase tracking-[0.18em] text-[9px] font-semibold text-muted">{property.city}, {property.country}</p>
        <h3 className="font-serif text-[26px] font-normal leading-[1.05] tracking-[-0.035em] m-0 mb-3">{property.name}</h3>
        <p className="text-muted text-[13px] m-0 mb-5 min-h-[82px] max-[980px]:min-h-0">{property.description}</p>
        <Link href="/stay" className="card-cta">
          <span className="cta-text">DISCOVER</span>
          <ArrowUpRight size={14} className="cta-arrow" />
        </Link>
      </div>
    </article>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  text,
  action,
  href = '/hotels-resorts/',
  className = '',
}: {
  eyebrow: string;
  title: string;
  text: string;
  action?: string;
  href?: string;
  className?: string;
}) {
  return (
    <section className={`max-w-[820px] mx-auto text-center py-[68px] px-6 pb-[56px] max-[720px]:py-[38px] max-[720px]:px-6 max-[720px]:pb-[28px] ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-7">{title}</h2>
      <p className="max-w-[600px] mx-auto mb-[30px] text-muted text-[17px]">{text}</p>
      {action && (
        <Link className="luxury-cta" href={href}>
          <span className="cta-text">{action}</span>
          <ArrowUpRight size={15} className="cta-arrow" />
        </Link>
      )}
    </section>
  );
}
