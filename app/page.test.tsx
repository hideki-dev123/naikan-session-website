import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import Home from './page';

describe('Inner Insight home page', () => {
  it('renders the complete narrative and application path', () => {
    const markup = renderToStaticMarkup(<Home />);
    const text = markup.replace(/<[^>]+>/g, '');

    expect(text).toContain('自分の声を、置き去りにしない。');
    expect(text).toContain('内観とは');
    expect(text).toContain('痛みを、比べない。');
    expect(text).toContain('平田 光');
    expect(markup).toContain('title="内観セッション 申し込みフォーム"');
    expect(markup).toContain('フォームを別画面で開く');
  });

  it('renders the approved social destinations', () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('https://note.com/ripe_briony7413');
    expect(markup).toContain('https://x.com/Hikaruhirata242');
    expect(markup).toContain('https://www.instagram.com/hikaruhirata_24/');
  });

  it('keeps one primary heading and avoids unsupported claims', () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup.match(/<h1(?:\s|>)/g)).toHaveLength(1);
    expect(markup).toContain('Googleアカウントへのログインが必要です');
    expect(markup).not.toMatch(/治療|必ず改善|資格保有|満足度/);
  });

  it('uses the new editorial imagery to tell the session story', () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('/images/window-light-v2.png');
    expect(markup).toContain('/images/wildflower-hand-v2.png');
    expect(markup).toContain('/images/forest-path-v2.png');
  });

  it('groups multi-sentence supporting copy into readable paragraphs', () => {
    const document = new JSDOM(renderToStaticMarkup(<Home />)).window.document;

    expect(document.querySelectorAll('.hero__lead p')).toHaveLength(2);
    expect(document.querySelectorAll('.session__body > p:not(.session__aside)')).toHaveLength(3);
    expect(document.querySelectorAll('.profile__body > p')).toHaveLength(3);
    expect(document.querySelectorAll('.application__lead p')).toHaveLength(2);
    expect(document.querySelectorAll('.application-embed__note p')).toHaveLength(2);
  });
});
