// @vitest-environment jsdom

import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ExperienceClient } from './experience-client';

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.replaceChildren();
});

describe('ExperienceClient', () => {
  it('reveals content when it enters the viewport and disconnects on cleanup', () => {
    let callback: IntersectionObserverCallback = () => undefined;
    const disconnect = vi.fn();

    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(next: IntersectionObserverCallback) {
          callback = next;
        }
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = disconnect;
      },
    );

    const target = document.createElement('div');
    target.dataset.reveal = 'true';
    document.body.append(target);

    const { unmount } = render(<ExperienceClient />);
    act(() => {
      callback([{ target, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(target.classList.contains('is-visible')).toBe(true);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('scrubs the Hero film to the current scroll progress while keeping it paused', () => {
    const hero = document.createElement('section');
    hero.dataset.hero = '';
    hero.getBoundingClientRect = vi.fn(
      () =>
        ({
          top: -440,
          bottom: 440,
          left: 0,
          right: 100,
          width: 100,
          height: 880,
          x: 0,
          y: -440,
          toJSON: () => ({}),
        }) as DOMRect,
    );

    const video = document.createElement('video');
    video.dataset.heroVideo = '';
    Object.defineProperty(video, 'duration', { configurable: true, value: 10 });
    const pause = vi.spyOn(video, 'pause').mockImplementation(() => undefined);
    hero.append(video);
    document.body.append(hero);

    const { unmount } = render(<ExperienceClient />);

    expect(pause).toHaveBeenCalled();
    expect(video.currentTime).toBeCloseTo(4.975, 2);

    unmount();
  });
});
