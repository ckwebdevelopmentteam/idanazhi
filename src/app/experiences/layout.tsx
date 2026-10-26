import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiences & Immersions | IDANAZHI Farm Stay',
  description:
    'Discover traditional rice farming, Kumbidi village heritage, temple encounters, and live fishing experiences at IDANAZHI.',
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
