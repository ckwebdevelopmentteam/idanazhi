import type { Metadata } from 'next';
import 'lenis/dist/lenis.css';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

export const metadata: Metadata = {
  title: 'IDANAZHI | Destination Wedding Resort',
  description: 'A destination wedding and luxury resort experience inspired by elegance, heritage, and celebration.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
