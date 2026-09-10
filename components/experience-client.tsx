'use client';

import { useEffect } from 'react';

export function ExperienceClient() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-hero-reveal])');
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const heroVisual = document.querySelector<HTMLElement>('[data-hero-visual]');
    const heroTargets = [
      heroVisual,
      ...Array.from(document.querySelectorAll<HTMLElement>('[data-hero-reveal]:not([data-hero-visual])')),
    ].filter((target): target is HTMLElement => target !== null);
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    if (!reducedMotion && hero) {
      document.documentElement.classList.add('hero-motion-ready');
      const revealTimers = Array.from(heroTargets).map((target, index) =>
        window.setTimeout(() => target.classList.add('is-visible'), 80 + index * 260),
      );
      let frame = 0;
      const updateHeroMotion = () => {
        frame = 0;
        if (!hero) return;

        const bounds = hero.getBoundingClientRect();
        const progress = Math.min(Math.max(-bounds.top / bounds.height, 0), 1);
        hero.style.setProperty('--hero-visual-shift', `${progress * -12}px`);
        hero.style.setProperty('--hero-copy-shift', `${progress * -8}px`);
        hero.style.setProperty('--hero-visual-scale', `${1 + progress * 0.05}`);
        hero.style.setProperty('--hero-visual-opacity', `${1 - progress * 0.14}`);
        hero.style.setProperty('--hero-scroll-opacity', `${Math.max(1 - progress * 1.35, 0)}`);
      };
      const requestUpdate = () => {
        if (!frame) frame = window.requestAnimationFrame(updateHeroMotion);
      };

      updateHeroMotion();
      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', requestUpdate);

      return () => {
        revealTimers.forEach((timer) => window.clearTimeout(timer));
        window.cancelAnimationFrame(frame);
        window.removeEventListener('scroll', requestUpdate);
        window.removeEventListener('resize', requestUpdate);
        document.documentElement.classList.remove('hero-motion-ready');
      };
    }

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return null;
}
