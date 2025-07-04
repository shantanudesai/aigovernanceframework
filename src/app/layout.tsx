import React from 'react';
import './globals.css';
import { Inter, Poppins, Permanent_Marker } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
const permanentMarker = Permanent_Marker({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-permanent-marker',
});

export const metadata = {
  title: 'AI Governance Framework',
  description: 'A comprehensive framework for implementing and managing AI governance controls.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${permanentMarker.variable}`}>
      <body className="min-h-screen bg-zinc-50 flex flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
} 