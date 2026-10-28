'use client';

import { useEffect, useRef, useState } from 'react';

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      if (preference.matches) {
        video.pause();
      } else if (!pausedByUser.current) {
        void video.play().catch(() => setPlaying(false));
      }
    };
    syncMotion();
    preference.addEventListener('change', syncMotion);
    return () => {
      preference.removeEventListener('change', syncMotion);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      pausedByUser.current = true;
      video.pause();
    } else {
      pausedByUser.current = false;
      void video.play().catch(() => setPlaying(false));
    }
  };

  return (
    <div className="hero-film">
      <img
        src="/images/inner-insight-mark.png"
        alt="Inner Insightの象徴。和紙の上に、葡萄色から夜紺へと移ろうIの文字。"
        width="1587"
        height="2245"
        fetchPriority="high"
      />
      <video
        ref={videoRef}
        className={`hero-film__video${ready ? ' is-ready' : ''}`}
        src="/movie/Hero Movie.mp4"
        poster="/images/inner-insight-mark.png"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => { setReady(true); setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { setReady(false); setPlaying(false); }}
      />
      <button className="hero-film__control" type="button" onClick={togglePlayback} aria-label={playing ? '動きを止める' : '動きを再生'}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
        {playing ? 'PAUSE' : 'PLAY'}
      </button>
    </div>
  );
}
