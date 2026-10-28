'use client';

import { useEffect, useRef, useState } from 'react';

export function HeroFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!section || !video || !stage) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (motion.matches) return;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      stage.style.opacity = String(Math.min(1, (1 - progress) / 0.16));
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = Math.min(video.duration - 0.01, progress * video.duration);
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    video.addEventListener('loadedmetadata', schedule);
    motion.addEventListener('change', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      video.removeEventListener('loadedmetadata', schedule);
      motion.removeEventListener('change', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="intro-film" ref={sectionRef} hidden={failed} aria-label="Inner Insight オープニング">
      <div className="intro-film__stage" ref={stageRef}>
        <video
          ref={videoRef}
          src="/movie/Hero Movie.mp4"
          poster="/images/inner-insight-mark.png"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
        />
        <a className="intro-film__skip" href="#top">本文へ進む <span aria-hidden="true">↗</span></a>
        <div className="intro-film__prompt" aria-hidden="true"><span>SCROLL TO BEGIN</span><i /></div>
      </div>
    </section>
  );
}
