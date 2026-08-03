'use client';

import { useEffect, useRef } from 'react';

type SearchScrollVideoProps = {
  className?: string;
  mp4Src: string;
  poster: string;
  scrollRootId?: string;
  sequenceId: string;
  stepProfile?: 'search' | 'method' | 'evidence';
  webmSrc: string;
};

type ViewportSubscriber = () => void;

const viewportSubscribers = new Set<ViewportSubscriber>();
let sharedViewportFrame = 0;

function notifyViewportSubscribers() {
  sharedViewportFrame = 0;
  viewportSubscribers.forEach((subscriber) => subscriber());
}

function requestViewportUpdate() {
  if (!sharedViewportFrame) {
    sharedViewportFrame = window.requestAnimationFrame(notifyViewportSubscribers);
  }
}

function subscribeToViewport(subscriber: ViewportSubscriber) {
  const shouldAttachListeners = viewportSubscribers.size === 0;
  viewportSubscribers.add(subscriber);

  if (shouldAttachListeners) {
    window.addEventListener('scroll', requestViewportUpdate, { passive: true });
    window.addEventListener('resize', requestViewportUpdate);
  }

  return () => {
    viewportSubscribers.delete(subscriber);

    if (viewportSubscribers.size === 0) {
      window.cancelAnimationFrame(sharedViewportFrame);
      sharedViewportFrame = 0;
      window.removeEventListener('scroll', requestViewportUpdate);
      window.removeEventListener('resize', requestViewportUpdate);
    }
  };
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function getScrollStep(progress: number, profile: 'search' | 'method' | 'evidence') {
  const thresholds = profile === 'method'
    ? [0.25, 0.5, 0.84]
    : profile === 'evidence'
      ? [0.22, 0.48, 0.66]
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

    video.load();

    let animationFrame = 0;
    let duration = 0;
    let lastPalette = '';
    let lastStep = -1;
    let needsMeasurement = true;
    let targetTime = 0;
    let isNearViewport = typeof IntersectionObserver === 'undefined';

    const measureTarget = () => {
      const mediaBounds = scrollRoot.getBoundingClientRect();
      const sequenceBounds = sequence.getBoundingClientRect();
      const isLongFormSequence = stepProfile !== 'search';
      const mediaStartLine = window.innerHeight * (isLongFormSequence ? 0.5 : 0.94);
      const mediaTravel = isLongFormSequence
        ? Math.max(1, mediaBounds.height)
        : Math.max(1, mediaBounds.height - window.innerHeight * 0.32);
      const mediaProgress = clamp((mediaStartLine - mediaBounds.top) / mediaTravel, 0, 1);
      const sequenceStartLine = window.innerHeight * 0.48;
      const sequenceTravel = Math.max(
        1,
        sequenceBounds.height - window.innerHeight * 0.78,
      );
      const sequenceProgress = isLongFormSequence
        ? mediaProgress
        : clamp((sequenceStartLine - sequenceBounds.top) / sequenceTravel, 0, 1);
      targetTime = mediaProgress * Math.max(0, duration - 0.04);
      const nextStep = getScrollStep(sequenceProgress, stepProfile);
      const nextPalette = stepProfile === 'evidence' && mediaProgress >= 0.84
        ? 'paper'
        : 'night';

      if (nextStep !== lastStep) {
        sequence.dataset.scrollStep = String(nextStep);
        lastStep = nextStep;
      }

      if (stepProfile === 'evidence' && nextPalette !== lastPalette) {
        sequence.dataset.scrollPalette = nextPalette;
        lastPalette = nextPalette;
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

      // A fast wheel/trackpad gesture can skip several chapters at once. In that
      // case, jump to the intended frame instead of visibly racing through every
      // intermediate frame after the content has already moved on.
      if (Math.abs(distance) > 1.75) {
        video.currentTime = targetTime;
        return;
      }

      const smoothing = Math.abs(distance) > 0.75 ? 0.42 : 0.26;
      video.currentTime += distance * smoothing;

      animationFrame = window.requestAnimationFrame(renderFrame);
    };

    const ensureFrame = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    };

    const requestFrame = () => {
      if (!isNearViewport) return;
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
    const unsubscribeFromViewport = subscribeToViewport(requestFrame);
    const visibilityObserver = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
          isNearViewport = entry.isIntersecting;
          if (isNearViewport) requestFrame();
        }, { rootMargin: '120% 0px' });

    visibilityObserver?.observe(scrollRoot);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handleMetadata();
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      visibilityObserver?.disconnect();
      unsubscribeFromViewport();
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('seeked', ensureFrame);
      delete sequence.dataset.scrollStep;
      delete sequence.dataset.scrollPalette;
    };
  }, [mp4Src, scrollRootId, sequenceId, stepProfile, webmSrc]);

  return (
    <video
      ref={videoRef}
      className={className}
      data-scroll-scrub-video={sequenceId}
      muted
      playsInline
      preload="metadata"
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
