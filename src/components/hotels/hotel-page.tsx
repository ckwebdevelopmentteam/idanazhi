import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { hotels, images } from '@/data/content';
import { ImageBlock } from '@/components/sections/editorial';

type HotelKey = keyof typeof hotels;

export function HotelPage({ hotelKey }: { hotelKey: HotelKey }) {
  const hotel = hotels[hotelKey];
  const experienceNames =
    hotelKey === 'singapore'
      ? ['Grandeur of IDANAZHI', 'Insider\'s Singapore', 'In-house Guest Exclusives']
      : ['A Day With The Chef', 'Calligraphy Workshop Stay', 'Desert Safari'];

  return (
    <main>
      {/* Property Hero */}
      <section className="h-[min(800px,100vh)] min-h-[620px] relative text-white flex items-end max-[720px]:min-h-[620px] max-[720px]:h-[100svh]">
        <img src={hotel.heroImage} alt={hotel.eyebrow} className="absolute inset-0 w-full h-full object-cover max-[720px]:object-[58%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,25,18,0.52),rgba(45,25,18,0.04)_72%),linear-gradient(0deg,rgba(30,16,12,0.32),transparent_42%)]" />
        <div className="z-1 max-w-[600px] m-[0_7.7vw_10.5vh] max-[720px]:m-[0_24px_82px]">
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">{hotel.eyebrow}</p>
          <h1 className="font-serif text-[clamp(53px,6.6vw,100px)] font-normal leading-[0.91] tracking-[-0.055em] m-0 mb-[23px]">{hotel.heroTitle}</h1>
          <p className="max-w-[420px] m-0 mb-[30px]">{hotel.heroText}</p>
          <Link className="border border-current bg-transparent px-[18px] py-3 text-[10px] tracking-[0.14em] transition-all duration-[180ms] ease-in-out text-white hover:bg-ink hover:text-white" href="/stay">
            EXPLORE THE HOTEL
          </Link>
        </div>
      </section>

      {/* Property Nav */}
      <nav
        className="h-[70px] flex justify-center items-center gap-[38px] sticky top-0 z-20 bg-paper border-b border-line uppercase tracking-[0.15em] text-[10px] max-[720px]:h-[54px] max-[720px]:justify-start max-[720px]:overflow-auto max-[720px]:px-[21px] max-[720px]:gap-[23px]"
        aria-label={`${hotel.eyebrow} navigation`}
      >
        <Link href="/stay" className="whitespace-nowrap">Stay</Link>
        <Link href="/stay" className="whitespace-nowrap">Dining</Link>
        <Link href="/celebrations" className="whitespace-nowrap">Experiences</Link>
        <Link href="/story" className="whitespace-nowrap">Our story</Link>
        <Link href="/stay" className="whitespace-nowrap">Contact</Link>
      </nav>

      {/* Stay Section */}
      <section id="stay" className="grid grid-cols-2 max-w-[1250px] mx-auto my-[140px] px-6 gap-[9vw] items-center max-[720px]:grid-cols-1 max-[720px]:my-[75px] max-[720px]:gap-[42px]">
        <ImageBlock src={hotel.heroImage} alt="" className="!aspect-[1/1.15]" />
        <div>
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">{hotel.stayLabel}</p>
          <h2 className="font-serif text-[clamp(40px,4.3vw,64px)] font-normal leading-[0.98] tracking-[-0.05em] m-0 mb-[26px]">{hotel.stayTitle}</h2>
          <p className="text-[16px] text-muted max-w-[440px] mb-[30px]">{hotel.stayText}</p>
          <Link href="/hotels-resorts/" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-forest">
            VIEW {hotelKey === 'singapore' ? 'SUITES' : 'ROOMS & SUITES'} <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* Dining Section */}
      <section id="dining" className="bg-linen grid grid-cols-[0.9fr_1.1fr] gap-0 py-[120px] px-[5.4vw] max-[720px]:grid-cols-1 max-[720px]:py-[70px] max-[720px]:px-6">
        <div className="pr-[8vw] pt-[35px] pb-5 max-[720px]:p-0 max-[720px]:pb-[35px]">
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">DINING</p>
          <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-7 max-w-[430px]">{hotel.diningTitle}</h2>
          <Link href="/hotels-resorts/" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-forest">
            DISCOVER ALL <ArrowUpRight size={15} />
          </Link>
        </div>
        <ImageBlock src={images.dining} alt="IDANAZHI dining" className="!aspect-[1.08/1]" />
        <ul className="col-span-full list-none m-0 mt-[80px] mx-[2vw] p-0 border-t border-line grid grid-cols-2 max-[720px]:mt-[45px] max-[720px]:mx-0 max-[720px]:grid-cols-1">
          {hotel.dining.map((place, i) => (
            <li key={place} className="grid grid-cols-[50px_1fr] border-b border-line py-5 odd:mr-[30px] max-[720px]:odd:mr-0">
              <span className="text-[10px] tracking-[0.12em]">{String(i + 1).padStart(2, '0')}</span>
              <strong className="font-serif text-[25px] font-normal">{place}</strong>
              <p className="col-start-2 text-muted text-xs m-0 mt-1">
                {i === 0 ? 'A singular setting where flavour, conversation and occasion come together.' : 'A distinctive IDANAZHI culinary experience.'}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-[135px] px-[5.4vw] max-[720px]:py-[75px] max-[720px]:px-6">
        <div className="max-w-[660px] mb-[58px]">
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">EXPERIENCES</p>
          <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-7">{hotel.experienceTitle}</h2>
          <p className="text-[17px] text-muted max-w-[600px]">{hotel.experienceText}</p>
          <Link href={hotelKey === 'singapore' ? '/singapore/experiences/' : '/hotels-resorts/'} className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-forest mt-4">
            DISCOVER ALL <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-6 max-[720px]:grid-cols-1">
          {experienceNames.map((name, i) => (
            <article key={name}>
              <ImageBlock src={[images.butler, images.home, hotel.heroImage][i]} alt="" className="!aspect-[1/1.05]" />
              <h3 className="font-serif text-[26px] font-normal leading-[1.05] tracking-[-0.035em] m-0 mt-4">{name}</h3>
              <p className="text-muted text-[13px] min-h-[65px]">Discover a memorable perspective on this extraordinary destination.</p>
              <Link className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-forest" href={hotelKey === 'singapore' ? '/singapore/experiences/' : '/hotels-resorts/'}>
                DISCOVER <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="grid grid-cols-2 bg-forest text-white max-[720px]:grid-cols-1">
        <div className="p-[12vw_10vw] max-[720px]:p-[75px_24px]">
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">{hotel.storyLabel}</p>
          <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-7">{hotel.storyTitle}</h2>
          <p className="max-w-[470px] text-[16px]">{hotel.storyText}</p>
          <Link className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-white pb-1.5 mt-6" href="/hotels-resorts/">
            READ MORE <ArrowUpRight size={15} />
          </Link>
        </div>
        <ImageBlock src={hotelKey === 'singapore' ? images.butler : images.dubai} alt="" className="!aspect-auto min-h-[590px] max-[720px]:min-h-[410px]" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="text-center py-[120px] px-6 max-[720px]:py-[80px]">
        <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">WE&apos;RE HERE FOR YOU</p>
        <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-4">At your service</h2>
        <p className="text-muted">
          {hotelKey === 'singapore'
            ? '1 Beach Road, Singapore 189673'
            : 'Sheikh Rashid Road, Wafi, Dubai, United Arab Emirates'}
        </p>
        <a className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-forest w-max mx-auto mt-[23px]" href="mailto:hello@idanazhi.com">
          hello@idanazhi.com <ArrowUpRight size={15} />
        </a>
      </section>
    </main>
  );
}
