import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heritage Rooms & Traditional Suites | IDANAZHI Farm Stay Guruvayoor',
  description:
    'Experience authentic Kerala Nalukettu heritage living. Hand-carved teakwood suites, open-to-sky Nadumuttam courtyards, Ayurvedic baths, and peaceful verandas in Guruvayoor, Kerala.',
  keywords: [
    'Idanazhi Farm Stay',
    'Kerala heritage resort',
    'Nalukettu rooms Guruvayoor',
    'Traditional Kerala stay',
    'Guruvayoor wedding resort suites',
    'Heritage rooms Kerala',
  ],
};

export default function StayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
