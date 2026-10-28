import { ArrowUpRight } from 'lucide-react';

import { navigation } from '@/lib/content';

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
      <div className="reading-progress" aria-hidden="true" />
      <a className="brand" href="#top">
        <span className="brand__mark">I</span>
        <span className="brand__copy">
          <strong>Inner Insight</strong>
          <small>内観セッション</small>
        </span>
      </a>
      <nav aria-label="メインナビゲーション">
        <NavigationLinks />
      </nav>
      <a className="header-cta" href="#application">
        セッションに申し込む
        <ArrowUpRight aria-hidden="true" />
      </a>
      <details className="mobile-menu">
        <summary aria-label="メニュー">
          <span />
          <span />
        </summary>
        <nav aria-label="モバイルナビゲーション">
          <NavigationLinks mobile />
          <a className="button button--primary" href="#application">
            セッションに申し込む
            <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </details>
      <a className="mobile-apply" href="#application" data-application-shortcut hidden>
        内観セッションに申し込む
        <ArrowUpRight aria-hidden="true" />
      </a>
    </header>
  );
}
