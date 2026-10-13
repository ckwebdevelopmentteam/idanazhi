import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { experiences, images, properties } from '@/data/content';
import { ImageBlock, PropertyCard, SectionIntro } from '@/components/sections/editorial';
import { HeroBookingCta } from '@/components/sections/hero-booking-cta';

export default function Home() { return <main>
  <section className="home-hero">
    <video className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-label="IDANAZHI destination wedding in warm light">
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
    <div className="hero-shade"/>
    <div className="hero-copy">
      <h1>IDANAZHI</h1>
      <p className="hero-tagline">A PLACE FOR REMARKABLE STAYS</p>
      <HeroBookingCta />
    </div>
    <a href="#culture" className="scroll-cue">SCROLL <ArrowDown size={15}/></a>
  </section>
  <SectionIntro eyebrow="DESTINATION WEDDINGS" title="Celebration in extraordinary settings" text="From the edge of the lake to the heart of the city, IDANAZHI creates unforgettable destination weddings, immersive stays and deeply personal moments." action="DISCOVER" />
  <section id="culture" className="feature-properties"><div className="properties-head"><p className="eyebrow">OUR DESTINATIONS</p><Link href="/hotels-resorts/" className="text-link">VIEW ALL <ArrowUpRight size={15}/></Link></div><div className="featured-grid">{properties.slice(0, 4).map((property) => <PropertyCard key={property.slug} property={property}/>)}</div></section>
  <section className="brand-story"><ImageBlock src={images.singapore} alt="IDANAZHI Singapore architecture"/><div className="brand-story-copy"><p className="eyebrow">IDANAZHI DESTINATION WEDDINGS</p><h2>A world of elegance and enchanted celebration</h2><p>Founded in the spirit of timeless celebration, IDANAZHI creates destination weddings and luxury escapes that feel personal, immersive and unforgettable. We champion fine art and design, foster culture in all its forms and bring gracious service to every encounter.</p><Link href="/hotels-resorts/" className="text-link">OUR DESTINATIONS <ArrowUpRight size={15}/></Link></div></section>
  <section className="butler-banner"><img src={images.butler} alt="IDANAZHI concierge in a grand hallway"/><div><p>Before you even think to ask...</p><h2>Your Celebration<br/>Perfected.</h2><Link href="/singapore/experiences/" className="button light-btn">DISCOVER</Link></div></section>
  <SectionIntro eyebrow="EXPERIENCES" title="Adventures and encounters crafted for the curious traveller" text="In every destination, discover a world of deeply personal experiences designed to open your mind, move your heart and illuminate your stay." action="EXPLORE EXPERIENCES" href="/singapore/experiences/" />
  <section className="experience-grid">{experiences.map((experience) => <article key={experience.name}><ImageBlock src={experience.image} alt=""/><h3>{experience.name}</h3><p>{experience.text}</p><Link className="text-link" href="/singapore/experiences/">DISCOVER <ArrowUpRight size={15}/></Link></article>)}</section>
</main>; }
