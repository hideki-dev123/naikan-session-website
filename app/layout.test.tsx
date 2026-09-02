import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import RootLayout from './layout';

describe('RootLayout', () => {
  it('wraps every page in the Japanese brand shell', () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <p>page content</p>
      </RootLayout>,
    );

    expect(markup).toContain('<html lang="ja"');
    expect(markup).toContain('本文へ移動');
    expect(markup).toContain('メインナビゲーション');
    expect(markup).toContain('© 2026 Inner Insight.');
    expect(markup).toContain('page content');
  });
});
