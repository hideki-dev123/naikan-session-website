import { ArrowUpRight } from 'lucide-react';

import { navigation, siteLinks } from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="brand brand--footer" href="#top">
          <span className="brand__mark">I</span>
          <span className="brand__copy">
            <strong>Inner Insight</strong>
            <small>内観セッション</small>
          </span>
        </a>
        <nav aria-label="フッターナビゲーション">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-footer__social">
          <a href={siteLinks.note} target="_blank" rel="noreferrer">
            note <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={siteLinks.x} target="_blank" rel="noreferrer">
            X <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={siteLinks.instagram} target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="site-footer__copyright">© 2026 Inner Insight.</p>
    </footer>
  );
}
