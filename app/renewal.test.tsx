// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Home from './page';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { HeroFilm } from '@/components/hero-film';

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdm8nubPbm62zAnRIucGQa4mc22KrQW790tQTbZEC3TlgMtZw/viewform';
const documentForPage = () => {
  const doc = document.implementation.createHTMLDocument();
  doc.body.innerHTML = renderToStaticMarkup(
    <>
      <SiteHeader />
      <HeroFilm />
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

  it('places the existing film before the hero without looping or duplicating it', () => {
    const doc = documentForPage();
    expect(doc.querySelector('.hero img, .hero video')).toBeNull();
    const video = doc.querySelector<HTMLVideoElement>('.intro-film video');
    expect(video).not.toBeNull();
    expect(video?.getAttribute('src')).toBe('/movie/Hero Movie.mp4');
    expect(video?.getAttribute('poster')).toBe('/images/inner-insight-mark.png');
    expect(video?.hasAttribute('loop')).toBe(false);
    expect(video?.hasAttribute('muted')).toBe(true);
    expect(video?.hasAttribute('playsinline')).toBe(true);
    expect(video?.getAttribute('aria-hidden')).toBe('true');
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

  it('groups the original introduction into meaningful phrases while keeping its text intact', () => {
    const doc = documentForPage();
    const firstParagraph = doc.querySelector('#about [data-original-copy]')!;
    const phrases = Array.from(firstParagraph.querySelectorAll('.phrase'), (node) => node.textContent);
    expect(phrases).toEqual(['内観セッションを行っております、', '平田 光（ひらた ひかる）', 'と申します。']);
    expect(phrases.join('')).toBe(firstParagraph.textContent);
    const prose = Array.from(doc.querySelectorAll<HTMLElement>('.letter [data-original-copy]'));
    expect(prose).toHaveLength(12);
    for (const paragraph of prose) {
      expect(paragraph.querySelectorAll('.phrase').length, paragraph.textContent ?? '').toBeGreaterThan(1);
    }
  });

  it('offers the application path after the story and the belief without losing the final form', () => {
    const doc = documentForPage();
    expect(doc.querySelector('#profile a[href="#application"]')).not.toBeNull();
    expect(doc.querySelector('#philosophy a[href="#application"]')).not.toBeNull();
    expect(doc.querySelector('#application a[data-form-link]')?.getAttribute('href')).toBe(formUrl);
  });

  it('keeps the Google Form name together in the application steps', () => {
    const doc = documentForPage();
    const firstStep = doc.querySelector('.flow__list li p')!;
    const phrases = Array.from(firstStep.querySelectorAll('.phrase'), (node) => node.textContent);
    expect(phrases).toContain('Googleフォームから');
    expect(phrases.join('')).toBe('ご希望や候補日をGoogleフォームからお知らせください。');
  });
});
