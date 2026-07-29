'use client';

import { useEffect, useRef } from 'react';

type SearchScrollVideoProps = {
  className?: string;
  mp4Src: string;
  poster: string;
  scrollRootId?: string;
  sequenceId: string;
  stepProfile?: 'search' | 'method';
  webmSrc: string;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function getScrollStep(progress: number, profile: 'search' | 'method') {
  const thresholds = profile === 'method'
    ? [0.25, 0.5, 0.84]
    : [0.34, 0.56, 0.78];

  if (progress < thresholds[0]) return 0;
  if (progress < thresholds[1]) return 1;
  if (progress < thresholds[2]) return 2;
  return 3;
}

export default function SearchScrollVideo({
  className,
  mp4Src,
  poster,
  scrollRootId,
  sequenceId,
  stepProfile = 'search',
  webmSrc,
}: SearchScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const sequence = document.getElementById(sequenceId);
    const scrollRoot = document.getElementById(scrollRootId ?? sequenceId);

    if (!video || !sequence || !scrollRoot) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducedMotion.matches) {
      sequence.dataset.scrollStep = '0';
      return;
    }

    let animationFrame = 0;
    let duration = 0;
    let lastStep = -1;
    let needsMeasurement = true;
    let targetTime = 0;

    const measureTarget = () => {
      const mediaBounds = scrollRoot.getBoundingClientRect();
      const sequenceBounds = sequence.getBoundingClientRect();
      const isMethodSequence = stepProfile === 'method';
      const mediaStartLine = window.innerHeight * (isMethodSequence ? 0.5 : 0.94);
      const mediaTravel = isMethodSequence
        ? Math.max(1, mediaBounds.height)
        : Math.max(1, mediaBounds.height - window.innerHeight * 0.32);
      const mediaProgress = clamp((mediaStartLine - mediaBounds.top) / mediaTravel, 0, 1);
      const sequenceStartLine = window.innerHeight * 0.48;
      const sequenceTravel = Math.max(
        1,
        sequenceBounds.height - window.innerHeight * 0.78,
      );
      const sequenceProgress = isMethodSequence
        ? mediaProgress
        : clamp((sequenceStartLine - sequenceBounds.top) / sequenceTravel, 0, 1);
      targetTime = mediaProgress * Math.max(0, duration - 0.04);
      const nextStep = getScrollStep(sequenceProgress, stepProfile);

      if (nextStep !== lastStep) {
        sequence.dataset.scrollStep = String(nextStep);
        lastStep = nextStep;
      }
    };

    const renderFrame = () => {
      animationFrame = 0;

      if (!duration || video.readyState < HTMLMediaElement.HAVE_METADATA) {
        return;
      }

      if (needsMeasurement) {
        measureTarget();
        needsMeasurement = false;
      }

      if (video.seeking) {
        return;
      }

      const distance = targetTime - video.currentTime;

      if (Math.abs(distance) <= 1 / 48) {
        if (Math.abs(distance) > 1 / 240) {
          video.currentTime = targetTime;
        }
        return;
      }

      const smoothing = Math.abs(distance) > 1.2 ? 0.34 : 0.24;
      video.currentTime += distance * smoothing;

      animationFrame = window.requestAnimationFrame(renderFrame);
    };

    const ensureFrame = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    };

    const requestFrame = () => {
      needsMeasurement = true;
      ensureFrame();
    };

    const handleMetadata = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      targetTime = video.currentTime;
      requestFrame();
    };

    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('seeked', ensureFrame);
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handleMetadata();
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('seeked', ensureFrame);
      window.removeEventListener('scroll', requestFrame);
      window.removeEventListener('resize', requestFrame);
      delete sequence.dataset.scrollStep;
    };
  }, [scrollRootId, sequenceId, stepProfile]);

  return (
    <video
      ref={videoRef}
      className={className}
      data-scroll-scrub-video={sequenceId}
      muted
      playsInline
      preload="auto"
      poster={poster}
      tabIndex={-1}
      aria-hidden="true"
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
      Tu navegador no puede mostrar esta secuencia visual.
    </video>
  );
}
