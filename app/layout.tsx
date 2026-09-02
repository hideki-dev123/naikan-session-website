import type { ReactNode } from 'react';

import { ExperienceClient } from '@/components/experience-client';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

import './globals.css';

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
