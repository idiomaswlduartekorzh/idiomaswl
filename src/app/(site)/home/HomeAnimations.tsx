'use client';

import { useEffect, useRef, useState } from 'react';
import { m, LazyMotion, domAnimation, animate, useInView, AnimatePresence, type Variants } from 'framer-motion';

// Provider que carga de forma diferida solo las features DOM de Framer Motion
// (animaciones + variantes + exit + gestos hover/tap/inView). Reduce el bundle
// inicial de ~34 KB a ~4.6 KB; el resto se hidrata bajo demanda.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

// ── Hero: palabra que cicla entre idiomas (SSR-safe: renderiza el primero) ─────
const CYCLE_WORDS = ['inglés', 'coreano', 'alemán', 'francés', 'italiano', 'portugués'];
export function LangCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % CYCLE_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="wlh-hero__cycle" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <m.em
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="wlh-hero__cycle-word"
        >
          {CYCLE_WORDS[i]}
        </m.em>
      </AnimatePresence>
    </span>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const viewport = { once: true, margin: '-40px' };

// Generic fade-up on scroll
export function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: { opacity: 0, y: 48 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22,1,0.36,1] as [number,number,number,number] } },
      }}
    >
      {children}
    </m.div>
  );
}

// Stagger wrapper — children animate in sequence on scroll
export function StaggerGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={staggerItem}>
      {children}
    </m.div>
  );
}

// Hero left column — stagger each child
export function HeroLeft({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      className="wlh-hero__left"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      {children}
    </m.div>
  );
}

export function HeroItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={fadeUp}>
      {children}
    </m.div>
  );
}

// Hero card (right side) — fade-up + slight scale
export function HeroCard({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      className="wlh-hero__right"
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      {children}
    </m.div>
  );
}

// Stats row — stagger
export function StatsRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </m.div>
  );
}

export function StatItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, scale: 0.88 },
        show:   { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22,1,0.36,1] as [number,number,number,number] } },
      }}
    >
      {children}
    </m.div>
  );
}

// Step rows — slide in from left
export function StepRow({ children, className, index }: {
  children: React.ReactNode; className?: string; index: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
    >
      {children}
    </m.div>
  );
}

// ── NEW: CountUp number animation ────────────────────────────────────────────
export function CountUp({ to, suffix = '', className }: {
  to: number; suffix?: string; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView, to, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}

// ── NEW: 3D Tilt card on hover ────────────────────────────────────────────────
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      whileHover={{ rotateX: -4, rotateY: 5, scale: 1.025, z: 20 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </m.div>
  );
}

// ── NEW: Team card fade-in with scale ─────────────────────────────────────────
export function TeamCard({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
    >
      {children}
    </m.div>
  );
}

// ── NEW: Testimonial slide-in ─────────────────────────────────────────────────
export function TestimonialCard({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, delay, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
    >
      {children}
    </m.div>
  );
}
