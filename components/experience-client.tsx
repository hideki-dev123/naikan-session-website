'use client';

import { useEffect } from 'react';

export function ExperienceClient() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-hero-reveal])');
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const heroVisual = document.querySelector<HTMLElement>('[data-hero-visual]');
    const heroVideo = document.querySelector<HTMLVideoElement>('[data-hero-video]');
    const heroTargets = [
      heroVisual,
      ...Array.from(document.querySelectorAll<HTMLElement>('[data-hero-reveal]:not([data-hero-visual])')),
    ].filter((target): target is HTMLElement => target !== null);
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const cleanups: Array<() => void> = [];

    if (!reducedMotion && hero) {
      document.documentElement.classList.add('hero-motion-ready');
      const revealTimers = Array.from(heroTargets).map((target, index) =>
        window.setTimeout(() => target.classList.add('is-visible'), 80 + index * 260),
      );
      let frame = 0;

      const scrubHeroVideo = (progress: number) => {
        if (!heroVideo || !Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) return;

        const endTime = Math.max(heroVideo.duration - 0.05, 0);
        const targetTime = progress * endTime;
        if (Math.abs(heroVideo.currentTime - targetTime) > 0.015) {
          heroVideo.currentTime = targetTime;
        }
      };

      const updateHeroMotion = () => {
        frame = 0;
        const bounds = hero.getBoundingClientRect();
        const progress = Math.min(Math.max(-bounds.top / bounds.height, 0), 1);

        scrubHeroVideo(progress);
        hero.style.setProperty('--hero-visual-shift', `${progress * -12}px`);
        hero.style.setProperty('--hero-copy-shift', `${progress * -8}px`);
        hero.style.setProperty('--hero-visual-scale', `${1 + progress * 0.05}`);
        hero.style.setProperty('--hero-visual-opacity', `${1 - progress * 0.14}`);
        hero.style.setProperty('--hero-scroll-opacity', `${Math.max(1 - progress * 1.35, 0)}`);
      };

      const requestUpdate = () => {
        if (!frame) frame = window.requestAnimationFrame(updateHeroMotion);
      };

      const handleMetadata = () => {
        heroVideo?.pause();
        updateHeroMotion();
      };

      heroVideo?.pause();
      heroVideo?.addEventListener('loadedmetadata', handleMetadata);
      updateHeroMotion();
      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', requestUpdate);

      cleanups.push(() => {
        revealTimers.forEach((timer) => window.clearTimeout(timer));
        window.cancelAnimationFrame(frame);
        window.removeEventListener('scroll', requestUpdate);
        window.removeEventListener('resize', requestUpdate);
        heroVideo?.removeEventListener('loadedmetadata', handleMetadata);
        document.documentElement.classList.remove('hero-motion-ready');
      });
    } else {
      heroVideo?.pause();
      heroTargets.forEach((target) => target.classList.add('is-visible'));
    }

    let observer: IntersectionObserver | null = null;
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
    } else {
      document.documentElement.classList.add('reveal-ready');
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      targets.forEach((target) => observer?.observe(target));
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      observer?.disconnect();
    };
  }, []);

  return null;
}
