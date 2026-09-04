import type { Metadata } from 'next';
import './globals.css';
import { PropertyProvider } from '@/lib/context/PropertyContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileFooterNav } from '@/components/layout/MobileFooterNav';
export const metadata: Metadata = {
  title: 'Malta Property Marketplace — Direct from Owners (Buy, Rent, Sell)',
  description:
    'Find properties for sale and rent directly from verified Maltese property owners with zero agency fees. Real estate in Sliema, Valletta, St Julian\'s, Mosta, Gozo and across Malta.',
  keywords: [
    'malta property',
    'property for sale malta',
    'apartments for rent malta',
    'direct from owner malta',
    'sliema property',
    'valletta real estate',
    'gozo farmhouses',
  ],
  openGraph: {
    title: 'Malta Property Marketplace — Direct from Owners',
    description: 'Browse apartments, penthouses, villas, and character houses across Malta directly from owners.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-malta-warm text-malta-charcoal antialiased">
        <PropertyProvider>
          {/* Global Header */}
          <Header />

          {/* Main Content Body */}
          <main className="flex-1 pb-16 md:pb-0">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Sticky Mobile Footer Navbar */}
          <MobileFooterNav />
        </PropertyProvider>
      </body>
    </html>
  );
}
