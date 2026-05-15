'use client';

import { motion, type Variants } from 'framer-motion';

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

const viewport = { once: true, margin: '-60px' };

// Generic fade-up on scroll
export function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22,1,0.36,1] as [number,number,number,number] } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger wrapper — children animate in sequence on scroll
export function StaggerGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

// Hero left column — stagger each child
export function HeroLeft({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="wlh-hero__left"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

// Hero card (right side) — fade-up + slight scale
export function HeroCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="wlh-hero__right"
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      {children}
    </motion.div>
  );
}

// Stats row — stagger
export function StatsRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StatItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, scale: 0.88 },
        show:   { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22,1,0.36,1] as [number,number,number,number] } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Step rows — slide in from left
export function StepRow({ children, className, index }: {
  children: React.ReactNode; className?: string; index: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
    >
      {children}
    </motion.div>
  );
}
