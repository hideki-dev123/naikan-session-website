import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ExperienceClient } from '@/components/experience-client';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

import './globals.css';
import './refined.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://inner-insight-hirata-hikaru.emiruka.chatgpt.site'),
  title: 'Inner Insight｜平田光の内観セッション',
  description: '自分の心の動きに気づき、自分はどう生きたいかを見つめるための内観セッション。',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Inner Insight｜内観セッション',
    description: '自分の声を、置き去りにしない。',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-v2.png',
        width: 1536,
        height: 1024,
        alt: 'Inner Insight 内観セッション',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inner Insight｜内観セッション',
    description: '自分の声を、置き去りにしない。',
    images: ['/og-v2.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body className="site-body">
        <a className="skip-link" href="#main-content">
          本文へ移動
        </a>
        <ExperienceClient />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
