import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Model & Sustainability | IDANAZHI Farm Stay',
  description:
    'Discover IDANAZHI’s integrated hospitality model combining organic rice farming, ancestral heritage preservation, and rural community stewardship in Kerala.',
};

export default function BusinessModelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
