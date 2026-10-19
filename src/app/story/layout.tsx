import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Idanazhi The Corridor',
  description:
    'Discover the character, architecture and atmosphere of Idanazhi The Corridor, a distinctive heritage property in Guruvayoor, Kerala.',
  openGraph: {
    title: 'Our Story | Idanazhi The Corridor',
    description:
      'Discover the character, architecture and atmosphere of Idanazhi The Corridor, a distinctive heritage property in Guruvayoor, Kerala.',
    images: ['/images/weddings/architecture-corridor.jpg'],
  },
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
