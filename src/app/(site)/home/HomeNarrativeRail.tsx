'use client';

import { useLayoutEffect, useRef } from 'react';
import styles from './Home.module.css';

const ANCHOR_SELECTOR = '[data-home-narrative-anchor]';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type NarrativePoint = {
  x: number;
  y: number;
  breakBefore: boolean;
  join: 'straight' | 'orthogonal';
  node: boolean;
};

function buildPath(points: NarrativePoint[]) {
  if (points.length < 2) return '';

  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    if (point.breakBefore) return `${path} M ${point.x} ${point.y}`;
    if (point.join === 'orthogonal' && previous.x !== point.x) {
      return `${path} L ${previous.x} ${point.y} L ${point.x} ${point.y}`;
    }
    return `${path} L ${point.x} ${point.y}`;
  }, `M ${points[0].x} ${points[0].y}`);
}

function getStableOffsetTop(element: HTMLElement, root: HTMLElement) {
  let offset = element.offsetTop + element.offsetHeight / 2;
  let parent = element.offsetParent as HTMLElement | null;

  while (parent && parent !== root) {
    offset += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement | null;
  }

  return offset;
}

export default function HomeNarrativeRail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const basePath = basePathRef.current;
    const progressPath = progressPathRef.current;
    const nodes = nodesRef.current;
    const pulse = pulseRef.current;
    const root = svg?.closest<HTMLElement>('[data-home-narrative-root]');

    if (!svg || !basePath || !progressPath || !nodes || !pulse || !root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pathLength = 0;
    let startDocumentY = 0;
    let endDocumentY = 1;
    let frame = 0;
    let nodeEntries: Array<{ element: SVGCircleElement; documentY: number }> = [];

    const renderProgress = () => {
      frame = 0;
      if (!pathLength) return;

      const viewportMarker = window.scrollY + window.innerHeight * 0.92;
      const progress = prefersReducedMotion.matches
        ? 1
        : clamp((viewportMarker - startDocumentY) / (endDocumentY - startDocumentY), 0, 1);
      const travelled = pathLength * progress;
      const point = basePath.getPointAtLength(travelled);

      progressPath.style.strokeDashoffset = String(pathLength - travelled);
      pulse.style.transform = `translate3d(${point.x - 5}px, ${point.y - 5}px, 0)`;
      pulse.style.opacity = progress > 0 && progress < 1 && !prefersReducedMotion.matches ? '1' : '0';
      nodeEntries.forEach(({ element, documentY }) => {
        element.dataset.active = String(viewportMarker >= documentY);
      });
    };

    const queueProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(renderProgress);
    };

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      const anchors = Array.from(root.querySelectorAll<HTMLElement>(ANCHOR_SELECTOR));
      const centerTrack = root.clientWidth / 2;
      const editorialGutter = root.clientWidth < 760
        ? 8
        : Math.max(10, (root.clientWidth - 1240) / 2 - 22);
      const mediaTrack = root.clientWidth < 760 ? centerTrack : root.clientWidth * 0.42;
      const points = anchors.map<NarrativePoint>((anchor) => {
        const rect = anchor.getBoundingClientRect();
        const naturalX = rect.left - rootRect.left + rect.width / 2;
        const track = anchor.dataset.homeNarrativeTrack;

        return {
          x: track === 'gutter'
            ? editorialGutter
            : track === 'center'
              ? centerTrack
              : track === 'media'
                ? mediaTrack
                : naturalX,
          // Sticky film layers move inside the viewport. offsetTop preserves each
          // anchor's place in the document even when the page opens on a hash.
          y: getStableOffsetTop(anchor, root),
          breakBefore: anchor.dataset.homeNarrativeBreak === 'true',
          join: anchor.dataset.homeNarrativeJoin === 'orthogonal' ? 'orthogonal' : 'straight',
          node: anchor.hasAttribute('data-home-narrative-node'),
        };
      }).sort((a, b) => a.y - b.y);

      if (points.length < 2) return;

      const width = root.clientWidth;
      const height = root.scrollHeight;
      const path = buildPath(points);

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.setAttribute('width', String(width));
      svg.setAttribute('height', String(height));
      svg.style.height = `${height}px`;
      basePath.setAttribute('d', path);
      progressPath.setAttribute('d', path);
      pathLength = basePath.getTotalLength();
      progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;

      const rootDocumentY = window.scrollY + rootRect.top;
      nodes.replaceChildren();
      nodeEntries = points.filter((point) => point.node).map((point) => {
        const element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        element.setAttribute('cx', String(point.x));
        element.setAttribute('cy', String(point.y));
        element.setAttribute('r', '5');
        element.setAttribute('class', styles.narrativeRailNode);
        nodes.append(element);
        return { element, documentY: rootDocumentY + point.y };
      });
      startDocumentY = rootDocumentY + points[0].y;
      endDocumentY = rootDocumentY + points.at(-1)!.y;
      svg.dataset.ready = 'true';
      renderProgress();
    };

    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measure);
    });

    resizeObserver.observe(root);
    window.addEventListener('scroll', queueProgress, { passive: true });
    window.addEventListener('resize', measure);
    prefersReducedMotion.addEventListener('change', measure);
    measure();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', queueProgress);
      window.removeEventListener('resize', measure);
      prefersReducedMotion.removeEventListener('change', measure);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        className={styles.narrativeRail}
        aria-hidden="true"
        focusable="false"
      >
        <path ref={basePathRef} className={styles.narrativeRailBase} />
        <path ref={progressPathRef} className={styles.narrativeRailProgress} />
        <g ref={nodesRef} />
      </svg>
      <span ref={pulseRef} className={styles.narrativeRailPulse} aria-hidden="true" />
    </>
  );
}
