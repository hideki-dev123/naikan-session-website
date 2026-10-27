// @vitest-environment jsdom
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Home from './page';
import { SiteFooter } from '@/components/site-footer';

describe('Inner Insight home page', () => {
  it('keeps official social destinations in the footer after the application', () => {
    const doc = document.implementation.createHTMLDocument();
    doc.body.innerHTML = renderToStaticMarkup(
      <>
        <Home />
        <SiteFooter />
      </>,
    );
    const footer = doc.querySelector('footer')!;
    expect(footer.querySelector('a[href="https://note.com/ripe_briony7413"]')).not.toBeNull();
    expect(footer.querySelector('a[href="https://x.com/Hikaruhirata242"]')).not.toBeNull();
    expect(footer.querySelector('a[href="https://www.instagram.com/hikaruhirata_24/"]')).not.toBeNull();
    expect(doc.querySelector('main > section:last-child')?.id).toBe('application');
  });

  it('keeps application access available without client-side JavaScript', () => {
    const doc = document.implementation.createHTMLDocument();
    doc.body.innerHTML = renderToStaticMarkup(<Home />);
    expect(doc.querySelector('iframe')?.getAttribute('src')).toContain('embedded=true');
    expect(doc.querySelector('#application a[data-form-link]')?.getAttribute('target')).toBe('_blank');
    expect(doc.querySelector('#application a[data-form-link]')?.getAttribute('rel')).toContain('noreferrer');
    expect(doc.querySelectorAll('[data-original-copy]')).toHaveLength(14);
    expect(doc.querySelector('main')?.textContent).not.toMatch(/必ず改善|資格保有|満足度|確実に変わって/);
  });
});
