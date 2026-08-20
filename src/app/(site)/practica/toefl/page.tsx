import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenText, Headphones, Mic2, PenLine } from 'lucide-react';

import PodcastFeature from '@/components/practica/PodcastFeature';
import toeflStrategyMapNotes, { TOEFL_STRATEGY_MAP_PODCAST } from '@/data/practica/podcasts/your-2026-toefl-ibt-strategy-map';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Práctica TOEFL iBT 2026 — Reading y Writing',
  description: 'Entiende el formato TOEFL iBT vigente desde enero de 2026 y practica Reading y Writing por tarea, con una ruta diagnóstica y un podcast guía en inglés.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/toefl' },
};

const routes = [
  {
    title: 'Reading',
    eyebrow: 'Ruta activa',
    description: 'Complete the Words, Read in Daily Life y Read an Academic Passage, con práctica por tarea.',
    href: '/practica/toefl/reading',
    Icon: BookOpenText,
  },
  {
    title: 'Listening',
    eyebrow: 'Próximamente',
    description: 'Respuesta pragmática, conversaciones, anuncios y charlas académicas con notas selectivas.',
    href: null,
    Icon: Headphones,
  },
  {
    title: 'Writing',
    eyebrow: 'Ruta activa',
    description: 'Build a Sentence, Write an Email y Academic Discussion. Integrated Writing queda identificado como formato anterior.',
    href: '/practica/toefl/writing',
    Icon: PenLine,
  },
  {
    title: 'Speaking',
    eyebrow: 'Próximamente',
    description: 'Listen and Repeat y Take an Interview: claridad, procesamiento, ritmo e inteligibilidad.',
    href: null,
    Icon: Mic2,
  },
] as const;

export default function TOEFLPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/practica">Práctica</Link><span>›</span><span>TOEFL iBT</span>
          </nav>
          <p className={styles.kicker}>TOEFL iBT · formato posterior al 21 de enero de 2026</p>
          <h1>Entiende el mapa. Practica el punto exacto que te frena.</h1>
          <p className={styles.lead}>El TOEFL actual evalúa comunicación académica real mediante Reading, Listening, Writing y Speaking. Reading y Listening son adaptativos por módulos; Writing y Speaking son fijos.</p>
          <div className={styles.facts} aria-label="TOEFL iBT 2026 at a glance">
            <div><strong>≈ 2 h</strong><span>incluyendo instrucciones</span></div>
            <div><strong>1–6</strong><span>bandas de medio punto</span></div>
            <div><strong>4</strong><span>secciones en orden fijo</span></div>
            <div><strong>12</strong><span>tipos de tarea actuales</span></div>
          </div>
        </div>
      </section>

      <PodcastFeature
        {...TOEFL_STRATEGY_MAP_PODCAST}
        notes={toeflStrategyMapNotes}
        links={[
          { href: '/practica/toefl/reading', label: 'Reading route' },
          { href: '/practica/toefl/writing', label: 'Writing route' },
          { href: '/examenes/toefl', label: 'Full mock tests' },
        ]}
      />

      <section className={styles.routes} aria-labelledby="toefl-routes-heading">
        <div className="wrap">
          <div className={styles.sectionHeading}>
            <p>Del diagnóstico a la práctica</p>
            <h2 id="toefl-routes-heading">Elige la sección que explica tu resultado</h2>
            <span>Empieza con una tarea concreta, registra el tipo de error y vuelve al simulacro solo para comprobar transferencia.</span>
          </div>
          <div className={styles.routeGrid}>
            {routes.map(({ title, eyebrow, description, href, Icon }) => {
              const content = (
                <>
                  <div className={styles.routeTop}><Icon aria-hidden="true" /><small>{eyebrow}</small></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className={styles.routeCta}>{href ? <>Abrir ruta <ArrowRight size={16} aria-hidden="true" /></> : 'En construcción'}</span>
                </>
              );

              return href ? (
                <Link key={title} href={href} className={styles.routeCard}>{content}</Link>
              ) : (
                <article key={title} className={`${styles.routeCard} ${styles.soon}`}>{content}</article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
