import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiences & Immersions | IDANAZHI Farm Stay',
  description:
    'Discover traditional rice farming, Kumbidi Village Life, Temple Trails, and fishing life in harbour at IDANAZHI.',
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
