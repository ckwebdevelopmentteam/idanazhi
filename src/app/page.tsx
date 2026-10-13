import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { experiences, images, properties } from '@/data/content';
import { ImageBlock, PropertyCard, SectionIntro } from '@/components/sections/editorial';
import { HeroBookingCta } from '@/components/sections/hero-booking-cta';
import { WeddingIntro } from '@/components/sections/wedding-intro';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="home-hero h-screen min-h-[100svh] relative text-white flex items-end overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover block"
          autoPlay muted loop playsInline preload="metadata"
          aria-label="IDANAZHI destination wedding in warm light"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,18,0.52),rgba(10,20,18,0.04)_72%),linear-gradient(0deg,rgba(5,15,13,0.32),transparent_42%)]" />
        <div className="absolute z-1 inset-[auto_24px_15vh] max-w-none m-0 text-center max-[640px]:bottom-[13vh]">
          <h1 className="m-0 font-serif text-[clamp(50px,5vw,76px)] leading-none tracking-[-0.045em]">IDANAZHI</h1>
          <p className="flex items-center justify-center w-full max-w-none gap-3.5 mt-5 mx-auto text-center text-white/88 text-[10px] font-normal tracking-[0.26em] before:content-[''] before:w-7 before:h-px before:bg-white/68 after:content-[''] after:w-7 after:h-px after:bg-white/68 max-[640px]:gap-2.5 max-[640px]:mt-4 max-[640px]:text-[9px] max-[640px]:tracking-[0.2em] max-[640px]:before:w-[18px] max-[640px]:after:w-[18px]">
            A PLACE FOR REMARKABLE STAYS
          </p>
          <HeroBookingCta />
        </div>
        <a href="#culture" className="absolute z-1 right-[4vw] bottom-[42px] flex items-center gap-2 text-[10px] tracking-[0.16em] [writing-mode:vertical-rl] max-[720px]:right-[21px] max-[720px]:bottom-[19px]">
          SCROLL <ArrowDown size={15} />
        </a>
      </section>

      <WeddingIntro />

      <SectionIntro
        eyebrow="DESTINATION WEDDINGS"
        title="Celebration in extraordinary settings"
        text="From the edge of the lake to the heart of the city, IDANAZHI creates unforgettable destination weddings, immersive stays and deeply personal moments."
        action="DISCOVER"
      />

      {/* Featured Properties */}
      <section id="culture" className="px-[5.4vw] pb-[155px] max-[720px]:px-6 max-[720px]:pb-[90px]">
        <div className="flex justify-between border-t border-line pt-5 mb-[35px]">
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">OUR DESTINATIONS</p>
          <Link href="/hotels-resorts/" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-[#a36f3e]">
            VIEW ALL <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[980px]:gap-6 max-[720px]:grid-cols-1">
          {properties.slice(0, 4).map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="grid grid-cols-[1.14fr_0.86fr] bg-[#e8e4dc] max-[720px]:grid-cols-1">
        <ImageBlock src={images.singapore} alt="IDANAZHI Singapore architecture" className="!aspect-auto min-h-[630px] max-[720px]:min-h-[430px]" />
        <div className="p-[10vw_8vw] self-center max-[720px]:p-[72px_25px]">
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">IDANAZHI DESTINATION WEDDINGS</p>
          <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-7">A world of elegance and enchanted celebration</h2>
          <p className="text-[16px] max-w-[390px] m-0 mb-[31px]">Founded in the spirit of timeless celebration, IDANAZHI creates destination weddings and luxury escapes that feel personal, immersive and unforgettable. We champion fine art and design, foster culture in all its forms and bring gracious service to every encounter.</p>
          <Link href="/hotels-resorts/" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-[#a36f3e]">
            OUR DESTINATIONS <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* Butler Banner */}
      <section className="h-[660px] relative text-white flex items-center p-[8vw] overflow-hidden max-[720px]:h-[520px] max-[720px]:p-[32px_24px]">
        <img src={images.butler} alt="IDANAZHI concierge in a grand hallway" className="absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,14,0.5),rgba(8,15,14,0.04))]" />
        <div className="relative z-1">
          <p className="font-serif text-[16px] m-0 mb-2.5">Before you even think to ask...</p>
          <h2 className="font-serif text-[clamp(54px,6vw,90px)] font-normal leading-[0.9] tracking-[-0.06em] m-0 mb-8 max-[720px]:text-[60px]">
            Your Celebration<br />Perfected.
          </h2>
          <Link href="/singapore/experiences/" className="border border-current bg-transparent px-[18px] py-3 text-[10px] tracking-[0.14em] transition-all duration-[180ms] ease-in-out text-white hover:bg-ink hover:text-white">
            DISCOVER
          </Link>
        </div>
      </section>

      <SectionIntro
        eyebrow="EXPERIENCES"
        title="Adventures and encounters crafted for the curious traveller"
        text="In every destination, discover a world of deeply personal experiences designed to open your mind, move your heart and illuminate your stay."
        action="EXPLORE EXPERIENCES"
        href="/singapore/experiences/"
      />

      {/* Experience Grid */}
      <section className="px-[5.4vw] pb-[155px] grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[720px]:grid-cols-1 max-[720px]:px-6 max-[720px]:pb-[90px]">
        {experiences.map((experience) => (
          <article key={experience.name}>
            <ImageBlock src={experience.image} alt="" />
            <h3 className="font-serif text-[26px] font-normal leading-[1.05] tracking-[-0.035em] m-0 mt-4">{experience.name}</h3>
            <p className="text-[#52605b] text-[13px] min-h-[65px]">{experience.text}</p>
            <Link className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-[#a36f3e]" href="/singapore/experiences/">
              DISCOVER <ArrowUpRight size={15} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
