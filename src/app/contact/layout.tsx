import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Reservations | Idanazhi Kerala Farm Stay',
  description:
    'Plan your sacred wedding, celebration, or unhurried heritage stay at Idanazhi in Kumbidi, Kerala. Connect directly with our estate concierge.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
