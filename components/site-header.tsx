import { ArrowUpRight } from 'lucide-react';

import { navigation, siteLinks } from '@/lib/content';

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <ul className={mobile ? 'mobile-navigation' : 'desktop-navigation'}>
      {navigation.map((item) => (
        <li key={item.href}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Inner Insight トップへ">
        <span className="brand__mark">I</span>
        <span className="brand__copy">
          <strong>Inner Insight</strong>
          <small>内観セッション</small>
        </span>
      </a>
      <nav aria-label="メインナビゲーション">
        <NavigationLinks />
      </nav>
      <a className="header-cta" href={siteLinks.form} target="_blank" rel="noreferrer">
        ご予約・お問い合わせ
        <ArrowUpRight aria-hidden="true" />
      </a>
      <details className="mobile-menu">
        <summary aria-label="メニューを開く">
          <span />
          <span />
        </summary>
        <nav aria-label="モバイルナビゲーション">
          <NavigationLinks mobile />
          <a className="button button--primary" href={siteLinks.form} target="_blank" rel="noreferrer">
            セッションを予約する
            <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </details>
    </header>
  );
}
