import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { images } from '@/data/content';
import { ImageBlock } from '@/components/sections/editorial';

const cards = [
  ['IDANAZHI Romance', 'Solemnise your vows in the next chapter of your love story.'],
  ['The Gem Suite Experience', 'Personalise your spa experience in our one-of-a-kind Gem Suite.'],
  ['IDANAZHI Boutique', 'Souvenirs, home decorations and luxury gourmet products in a gallery setting.'],
  ['IDANAZHI Arcade', 'Luxury retail, signature dining and bespoke experiences in historic charm.'],
  ['In-house Guest Exclusives', 'Unique experiences specially curated for our in-house guests.'],
  ['Insider\'s Singapore', 'Let us be your guide and compass to the sights and sounds of our vibrant city.'],
];

export default function SingaporeExperiences() {
  return (
    <main>
      {/* Experiences Hero */}
      <section className="h-[660px] min-h-[500px] relative text-white flex items-end max-[720px]:h-[570px] max-[720px]:min-h-0">
        <img src={images.butler} alt="IDANAZHI Singapore experience" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,18,0.52),rgba(10,20,18,0.04)_72%),linear-gradient(0deg,rgba(5,15,13,0.32),transparent_42%)]" />
        <div className="z-1 max-w-[720px] m-[0_8vw_10vh] max-[720px]:m-[0_24px_70px]">
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">EXPERIENCES</p>
          <h1 className="font-serif text-[clamp(53px,6.6vw,100px)] font-normal leading-[0.91] tracking-[-0.055em] m-0 mb-[23px] max-[720px]:text-[53px]">
            Making the most of your time in Singapore
          </h1>
        </div>
      </section>

      {/* Lead Experience */}
      <section className="max-w-[1250px] mx-auto my-[130px] grid grid-cols-[1.2fr_0.8fr] gap-[8vw] px-6 items-center max-[720px]:grid-cols-1 max-[720px]:my-[75px] max-[720px]:gap-[38px]">
        <ImageBlock src={images.butler} alt="The Celebration, Perfected" className="!aspect-[1.1/1] max-[720px]:!aspect-square" />
        <div>
          <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">EXPERIENCE</p>
          <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-7">Your Celebration, Perfected</h2>
          <p className="text-[#50605a] text-[17px] mb-7">Carefully curated for a deeper connection to Singapore&apos;s heritage and timeless elegance.</p>
          <Link href="/singapore/" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-[#a36f3e]">
            DISCOVER <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="grid grid-cols-3 gap-6 px-[5.4vw] pb-[130px] max-[720px]:grid-cols-1 max-[720px]:px-6">
        {cards.map(([name, text], i) => (
          <article key={name}>
            <ImageBlock
              src={[images.singapore, images.home, images.paris, images.dining, images.butler, images.dubai][i]}
              alt=""
              className="!aspect-[1/0.88]"
            />
            <h3 className="font-serif text-[26px] font-normal leading-[1.05] tracking-[-0.035em] m-0 mt-4">{name}</h3>
            <p className="text-[#52605b] text-[13px] min-h-[65px]">{text}</p>
            <Link href="/singapore/" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-semibold border-b border-ink pb-1.5 hover:text-[#a36f3e]">
              {i === 1 || i === 5 ? 'FIND OUT MORE' : 'DISCOVER'} <ArrowUpRight size={15} />
            </Link>
          </article>
        ))}
      </section>

      {/* Concierge */}
      <section className="bg-[#e9e5dd] text-center py-[100px] px-6 max-[720px]:py-[80px]">
        <p className="m-0 mb-[18px] uppercase tracking-[0.18em] text-[10px] font-semibold">WE&apos;RE HERE FOR YOU</p>
        <h2 className="font-serif text-[clamp(38px,4.1vw,61px)] font-normal leading-none tracking-[-0.045em] m-0 mb-[22px]">Contact Concierge</h2>
        <a href="tel:+6563371886" className="font-serif text-[23px] block my-[2px]">(65) 6337 1886</a>
        <a href="mailto:weddings@idanazhi.com" className="font-serif text-[23px] block my-[2px]">weddings@idanazhi.com</a>
        <p className="text-[13px] text-[#53615c] mt-3">1 Beach Road, Singapore 189673</p>
      </section>
    </main>
  );
}
