// @vitest-environment jsdom

import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ExperienceClient } from './experience-client';

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.replaceChildren();
  document.documentElement.classList.remove('reveal-ready');
});

describe('ExperienceClient', () => {
  it('shows the mobile shortcut after the hero leaves and hides it when the hero returns', () => {
    let callback: IntersectionObserverCallback = () => undefined;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(next: IntersectionObserverCallback) {
          callback = next;
        }
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
    document.body.innerHTML =
      '<section class="hero"></section><a data-application-shortcut href="#application">申し込む</a>';
    const hero = document.querySelector('.hero')!;
    const shortcut = document.querySelector<HTMLAnchorElement>('[data-application-shortcut]')!;
    render(<ExperienceClient />);
    expect(shortcut.hidden).toBe(true);
    act(() =>
      callback(
        [{ target: hero, isIntersecting: false } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(shortcut.hidden).toBe(false);
    act(() =>
      callback(
        [{ target: hero, isIntersecting: true } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(shortcut.hidden).toBe(true);
  });

  it('hides the mobile shortcut only while the application is in view', () => {
    let callback: IntersectionObserverCallback = () => undefined;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(next: IntersectionObserverCallback) {
          callback = next;
        }
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
    document.body.innerHTML =
      '<section id="application"></section><a data-application-shortcut href="#application">申し込む</a>';
    const application = document.getElementById('application')!;
    const shortcut = document.querySelector<HTMLAnchorElement>('[data-application-shortcut]')!;
    render(<ExperienceClient />);
    act(() =>
      callback(
        [{ target: application, isIntersecting: true } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(shortcut.hidden).toBe(true);
    act(() =>
      callback(
        [{ target: application, isIntersecting: false } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(shortcut.hidden).toBe(false);
  });

  it('closes mobile navigation after an anchor is chosen', () => {
    document.body.innerHTML =
      '<details class="mobile-menu" open><summary>メニュー</summary><nav><a href="#application">申し込む</a></nav></details>';
    const menu = document.querySelector('details')!;
    const { unmount } = render(<ExperienceClient />);
    act(() => menu.querySelector('a')!.click());
    expect(menu.open).toBe(false);
    unmount();
  });

  it('keeps content visible when reduced motion is requested or observers are unavailable', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    document.body.innerHTML = '<figure data-reveal></figure>';
    const { unmount } = render(<ExperienceClient />);
    expect(document.documentElement.classList.contains('reveal-ready')).toBe(false);
    unmount();
  });

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
    document.body.appendChild(target);

    const { unmount } = render(<ExperienceClient />);
    act(() => {
      callback([{ target, isIntersecting: true } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(target.classList.contains('is-visible')).toBe(true);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
