import { describe, expect, it } from 'vitest';

import { metadata } from './layout';

describe('site metadata', () => {
  it('describes the Inner Insight service instead of the adjacent marche project', () => {
    expect(metadata.title).toBe('Inner Insight｜平田光の内観セッション');
    expect(metadata.description).toContain('自分はどう生きたいか');
    expect(metadata.openGraph).toMatchObject({ locale: 'ja_JP', type: 'website' });
    expect(metadata.metadataBase?.toString()).toBe(
      'https://inner-insight-hirata-hikaru.emiruka.chatgpt.site/',
    );
    expect(metadata.openGraph).toMatchObject({
      images: [{ url: '/images/inner-insight-mark.png' }],
    });
  });
});
