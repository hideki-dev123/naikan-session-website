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
});
