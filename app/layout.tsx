import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ExperienceClient } from '@/components/experience-client';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

import './globals.css';
import './refined.css';
import './watercolor.css';
import './premium-motion.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://inner-insight-hirata-hikaru.emiruka.chatgpt.site'),
  title: 'Inner Insight｜平田光の内観セッション',
  description:
    '自分の心の声に耳を傾けながら、自分自身への理解を深める内観セッション。平田光が一人ひとりの想いやペースを大切にしながら、一緒に向き合います。',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Inner Insight｜内観セッション',
    description: '誰もが自分の味方でいられる社会へ。',
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
    description: '誰もが自分の味方でいられる社会へ。',
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
