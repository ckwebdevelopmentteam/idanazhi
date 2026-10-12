import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Property } from '@/data/content';

export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }

export function ImageBlock({ src, alt, className = '' }: { src: string; alt: string; className?: string }) { return <div className={`image-block ${className}`}><img src={src} alt={alt}/></div>; }

export function PropertyCard({ property }: { property: Property }) { return <article className="property-card"><ImageBlock src={property.image} alt={property.name}/><div className="property-info"><Eyebrow>{property.city}, {property.country}</Eyebrow><h3>{property.name}</h3><p>{property.description}</p><Link href={property.slug === 'singapore' ? '/singapore/' : property.slug === 'dubai' ? '/dubai/' : '/hotels-resorts/'} className="text-link">DISCOVER <ArrowUpRight size={15}/></Link></div></article>; }

export function SectionIntro({ eyebrow, title, text, action, href = '/hotels-resorts/' }: { eyebrow: string; title: string; text: string; action?: string; href?: string }) { return <section className="section-intro"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p>{action && <Link className="text-link" href={href}>{action} <ArrowUpRight size={15}/></Link>}</section>; }
