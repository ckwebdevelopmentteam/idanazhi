import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visual Gallery & Moments | IDANAZHI Destination Weddings & Farm Stay',
  description:
    'Explore the visual archive of Idanazhi: traditional Kerala architecture, hand-carved teakwood courtyards, sacred wedding mandapam stages, and tranquil heritage living.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
