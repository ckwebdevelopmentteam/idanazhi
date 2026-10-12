import type { Metadata } from 'next';
import './globals.css';
import './additional.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = { title: 'Raffles Hotels & Resorts', description: 'A high-fidelity Raffles.com interface study.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
