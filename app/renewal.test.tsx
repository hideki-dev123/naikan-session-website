// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Home from './page';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdm8nubPbm62zAnRIucGQa4mc22KrQW790tQTbZEC3TlgMtZw/viewform';
const documentForPage = () => {
  const doc = document.implementation.createHTMLDocument();
  doc.body.innerHTML = renderToStaticMarkup(
    <>
      <SiteHeader />
      <Home />
      <SiteFooter />
    </>,
  );
  return doc;
};

describe('verbatim introduction and application journey', () => {
  it('publishes every supplied paragraph in order without changing a character', () => {
    const expected = readFileSync(resolve('lib/introduction.fixture.txt'), 'utf8')
      .trim()
      .split(/\r?\n\r?\n/);
    const doc = documentForPage();
    const paragraphs = Array.from(doc.querySelectorAll('[data-original-copy]'), (node) => node.textContent);
    expect(paragraphs).toEqual(expected);
    expect(doc.querySelector('[data-original-copy] strong')?.textContent).toBe('誰もが自分の味方でいられる社会へ。');
  });

  it('shows the complete original I image as the first-screen symbol', () => {
    const doc = documentForPage();
    expect(doc.querySelector('.hero img')?.getAttribute('src')).toBe('/images/inner-insight-mark.png');
    expect(doc.querySelector('.hero img')?.getAttribute('alt')).toContain('I');
    expect(doc.querySelector('.hero video')).toBeNull();
    const checksum = createHash('sha256')
      .update(readFileSync(resolve('public/images/inner-insight-mark.png')))
      .digest('hex');
    expect(checksum).toBe('6f81f07e1ae85f3f9df324aaec1b0f862b365e29faacb4e546452ea33ddf7d4e');
  });

  it('connects navigation and contextual invitations to the final embedded Google Form', () => {
    const doc = documentForPage();
    for (const link of doc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(doc.getElementById(link.getAttribute('href')!.slice(1)), link.textContent ?? '').not.toBeNull();
    }
    expect(doc.querySelectorAll('a[href="#application"]').length).toBeGreaterThanOrEqual(4);
    const application = doc.querySelector('#application')!;
    expect(application.querySelector('a[data-form-link]')?.getAttribute('href')).toBe(formUrl);
    const embed = new URL(application.querySelector('iframe')!.getAttribute('src')!);
    expect(embed.origin + embed.pathname).toBe(formUrl);
    expect(embed.searchParams.get('embedded')).toBe('true');
    expect(application.querySelector('iframe')?.getAttribute('title')).toBe('内観セッション 申し込みフォーム');
    expect(doc.querySelectorAll('h1')).toHaveLength(1);
    for (const section of doc.querySelectorAll('section[aria-labelledby]')) {
      expect(doc.getElementById(section.getAttribute('aria-labelledby')!)).not.toBeNull();
    }
  });
});
