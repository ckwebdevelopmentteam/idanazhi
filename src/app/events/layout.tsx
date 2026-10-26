import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Celebrations | IDANAZHI Farm Stay',
  description:
    'Host destination weddings, private celebrations, and corporate retreats at IDANAZHI in Kerala.',
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
