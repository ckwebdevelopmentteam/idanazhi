import { HeroSection } from '@/components/sections/hero-section';
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
      <HeroSection />

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
