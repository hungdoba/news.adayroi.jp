import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';

import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'News - Adayroi',
  description: 'Tin tức cập nhật dành cho người Việt Nam tại Nhật Bản',
  metadataBase: new URL('https://news.hungba.net'),
  openGraph: {
    title: 'News - Adayroi',
    description: 'Tin tức cập nhật dành cho người Việt Nam tại Nhật Bản',
    url: 'https://news.hungba.net',
    siteName: 'News - Adayroi',
    images: [
      {
        url: 'https://news.hungba.net/images/thumbnails/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'News - Adayroi',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News - Adayroi',
    description: 'Tin tức cập nhật dành cho người Việt Nam tại Nhật Bản',
    images: ['https://news.hungba.net/images/thumbnails/logo/logo.png'],
    creator: '@adayroi',
    site: '@adayroi',
  },
  icons: {
    icon: '/images/thumbnails/logo/logo.png',
    shortcut: '/images/thumbnails/logo/logo.png',
    apple: '/images/thumbnails/logo/logo.png',
  },
  appleWebApp: {
    title: 'News - Adayroi',
    statusBarStyle: 'default',
    capable: true,
    startupImage: [
      {
        url: '/images/thumbnails/logo/logo.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
  alternates: {
    canonical: 'https://news.hungba.net',
    // TODO: Uncomment when RSS feed is available
    // types: {
    //   'application/rss+xml': '/feed.xml',
    //   'application/atom+xml': '/feed.atom',
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${roboto_mono.className} antialiased`}>
        <Providers>
          <div className="mx-auto w-full md:container md:max-w-6xl">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-MCWK0LV7ZX" />
    </html>
  );
}
