import { describe, expect, it } from 'vitest';

import { navigation, philosophies, profile, sessionSteps, siteLinks } from './content';

describe('Inner Insight content', () => {
  it('keeps every approved external destination in one source of truth', () => {
    expect(siteLinks.form).toContain('1FAIpQLSdm8nubPbm62zAnRIucGQa4mc22KrQW790tQTbZEC3TlgMtZw');
    expect(siteLinks.note).toBe('https://note.com/ripe_briony7413');
    expect(siteLinks.x).toBe('https://x.com/Hikaruhirata242');
    expect(siteLinks.instagram).toBe('https://www.instagram.com/hikaruhirata_24/');
  });

  it('contains a complete navigation and narrative', () => {
    expect(navigation.map((item) => item.href)).toEqual([
      '#about',
      '#session',
      '#flow',
      '#profile',
      '#application',
    ]);
    expect(philosophies).toHaveLength(3);
    expect(sessionSteps).toHaveLength(3);
    expect(profile.name).toBe('平田 光');
  });
});
