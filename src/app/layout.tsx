import type { Metadata } from 'next';
import { Lato, Cormorant_Garamond, Plus_Jakarta_Sans, Urbanist } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IDANAZHI | Destination Wedding Resort',
  description: 'A destination wedding and luxury resort experience inspired by elegance, heritage, and celebration.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-paper ${lato.variable} ${cormorant.variable} ${jakarta.variable} ${urbanist.variable}`}>
      <body className="font-lato antialiased bg-paper">
        <SmoothScrollProvider>
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
