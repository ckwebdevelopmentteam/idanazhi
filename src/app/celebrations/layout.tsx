import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacred Weddings & Celebrations | IDANAZHI Heritage Farm Stay Guruvayoor',
  description:
    'Host unforgettable destination weddings and sacred milestones at Idanazhi. Handcrafted teakwood mandapam stages, starlit lakeside lawns, authentic Kerala Sadya, and timeless heritage hospitality.',
};

export default function CelebrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
