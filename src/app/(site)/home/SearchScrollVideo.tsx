'use client';

import { useEffect, useRef } from 'react';

type SearchScrollVideoProps = {
  className?: string;
  sequenceId: string;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export default function SearchScrollVideo({
  className,
  sequenceId,
}: SearchScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const sequence = document.getElementById(sequenceId);

    if (!video || !sequence) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducedMotion.matches) {
      return;
    }

    let animationFrame = 0;
    let duration = 0;
    let lastTime = -1;

    const updateFrame = () => {
      animationFrame = 0;

      if (!duration || video.readyState < HTMLMediaElement.HAVE_METADATA) {
        return;
      }

      const bounds = sequence.getBoundingClientRect();
      const startLine = window.innerHeight * 0.48;
      const travel = Math.max(1, bounds.height - window.innerHeight * 0.78);
      const progress = clamp((startLine - bounds.top) / travel, 0, 1);
      const nextTime = progress * Math.max(0, duration - 0.04);

      if (Math.abs(nextTime - lastTime) < 1 / 60) {
        return;
      }

      video.currentTime = nextTime;
      lastTime = nextTime;
    };

    const requestFrame = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateFrame);
      }
    };

    const handleMetadata = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      updateFrame();
    };

    video.addEventListener('loadedmetadata', handleMetadata);
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handleMetadata();
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      video.removeEventListener('loadedmetadata', handleMetadata);
      window.removeEventListener('scroll', requestFrame);
      window.removeEventListener('resize', requestFrame);
    };
  }, [sequenceId]);

  return (
    <video
      ref={videoRef}
      className={className}
      data-search-scroll-video
      muted
      playsInline
      preload="auto"
      poster="/media/home/search-to-goal-poster-v1.jpg"
      tabIndex={-1}
      aria-hidden="true"
    >
      <source src="/media/home/search-to-goal-v1.webm" type="video/webm" />
      <source src="/media/home/search-to-goal-v1.mp4" type="video/mp4" />
    </video>
  );
}
