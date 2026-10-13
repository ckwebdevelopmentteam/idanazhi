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
        <p className="text-[#52605b] text-[13px] m-0 mb-5 min-h-[82px] max-[980px]:min-h-0">{property.description}</p>
        <Link href={property.slug === 'singapore' ? '/singapore/' : property.slug === 'dubai' ? '/dubai/' : '/hotels-resorts/'} className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-[#a36f3e]">
          DISCOVER <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export function SectionIntro({ eyebrow, title, text, action, href = '/hotels-resorts/' }: { eyebrow: string; title: string; text: string; action?: string; href?: string }) {
  return (
    <section className="max-w-[820px] mx-auto text-center py-[150px] px-6 pb-[112px] max-[720px]:py-[90px] max-[720px]:px-6 max-[720px]:pb-[70px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-7">{title}</h2>
      <p className="max-w-[600px] mx-auto mb-[30px] text-[#4a5853] text-[17px]">{text}</p>
      {action && (
        <Link className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-[#a36f3e]" href={href}>
          {action} <ArrowUpRight size={15} />
        </Link>
      )}
    </section>
  );
}
