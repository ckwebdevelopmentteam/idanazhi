import { HeroBookingCta } from '@/components/sections/hero-booking-cta';
import { HeroScrollButton } from '@/components/ui/hero-scroll-button';
import { WeddingIntro } from '@/components/sections/wedding-intro';
import { StoryOfIdanazhi } from '@/components/sections/story-of-idanazhi';
import { StayAtIdanazhi } from '@/components/sections/stay-at-idanazhi';
import { CelebrationsAndExperience } from '@/components/sections/celebrations-and-experience';
import { ExperiencesGallery } from '@/components/sections/experiences-gallery';
import { Testimonials } from '@/components/ui/testimonials';
import { FAQSection } from '@/components/sections/faq-section';
import { ContactSection } from '@/components/sections/contact-section';

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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,25,18,0.52),rgba(45,25,18,0.04)_72%),linear-gradient(0deg,rgba(30,16,12,0.32),transparent_42%)]" />
        <div className="absolute z-1 inset-[auto_24px_15vh] max-w-none m-0 text-center max-[640px]:bottom-[11vh] max-[480px]:bottom-[9vh]">
          <img
            src="/images/weddings/logo/idanazhi_farm_stay_logo.svg"
            alt="IDANAZHI Farm Stay"
            className="mx-auto h-auto w-[min(420px,84vw)] brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          />
          <HeroBookingCta />
        </div>
        <HeroScrollButton />
      </section>

      <WeddingIntro />

      <StoryOfIdanazhi />

      <CelebrationsAndExperience />

      <StayAtIdanazhi />

      <ExperiencesGallery />

      <Testimonials />

      <FAQSection />

      <ContactSection />


    </main>
  );
}
