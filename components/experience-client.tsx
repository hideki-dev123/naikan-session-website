'use client';

import { useEffect } from 'react';

export function ExperienceClient() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const application = document.getElementById('application');
    const hero = document.querySelector('.hero');
    const shortcut = document.querySelector<HTMLAnchorElement>('[data-application-shortcut]');
    const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let heroVisible = hero !== null;
    let applicationVisible = false;
    if (shortcut) shortcut.hidden = heroVisible;
    const closeMenu = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('a[href^="#"]') && menu) menu.open = false;
    };
    menu?.addEventListener('click', closeMenu);

    let observer: IntersectionObserver | null = null;
    if (!('IntersectionObserver' in window) || reducedMotion) {
      targets.forEach((target) => target.classList.add('is-visible'));
    } else {
      document.documentElement.classList.add('reveal-ready');
    }
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === application) {
              applicationVisible = entry.isIntersecting;
            } else if (entry.target === hero) {
              heroVisible = entry.isIntersecting;
            } else if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer?.unobserve(entry.target);
            }
          });
          if (shortcut) shortcut.hidden = heroVisible || applicationVisible;
        },
        { threshold: 0.01 },
      );

      if (!reducedMotion) targets.forEach((target) => observer?.observe(target));
      if (application) observer.observe(application);
      if (hero) observer.observe(hero);
    }

    return () => {
      observer?.disconnect();
      menu?.removeEventListener('click', closeMenu);
      document.documentElement.classList.remove('reveal-ready');
      if (shortcut) shortcut.hidden = true;
    };
  }, []);

  return null;
}
