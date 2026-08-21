import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenText, Check, Headphones, Mic2, PenLine } from 'lucide-react';

import { BreadcrumbJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import PodcastFeature from '@/components/practica/PodcastFeature';
import toeflStrategyMapNotes, { TOEFL_STRATEGY_MAP_PODCAST } from '@/data/practica/podcasts/your-2026-toefl-ibt-strategy-map';

import styles from './ios.module.css';

export const metadata: Metadata = {
  title: 'Práctica TOEFL 2026: 4 secciones y 20 simulacros',
  description: 'Practica las cuatro secciones del TOEFL 2026 por tarea y comprueba tu progreso con 20 simulacros originales de WeLearn. No son oficiales ni adaptativos.',
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
    eyebrow: 'Ruta activa',
    description: 'Respuesta pragmática, conversaciones, anuncios y charlas académicas con notas selectivas.',
    href: '/practica/toefl/listening',
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
    eyebrow: 'Ruta activa',
    description: 'Listen and Repeat y Take an Interview: claridad, procesamiento, ritmo e inteligibilidad.',
    href: '/practica/toefl/speaking',
    Icon: Mic2,
  },
] as const;

export default function TOEFLPage() {
  return (
    <>
      <LearningResourceJsonLd
        name="Práctica TOEFL 2026"
        url="https://www.idiomaswl.com/practica/toefl"
        description="Mapa de práctica para Reading, Listening, Writing y Speaking con acceso a 20 simulacros originales de WeLearn."
        teaches={['TOEFL Reading', 'TOEFL Listening', 'TOEFL Writing', 'TOEFL Speaking']}
        isPartOf={{ name: 'Simulacros TOEFL 2026', url: 'https://www.idiomaswl.com/examenes/toefl' }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'TOEFL', url: 'https://www.idiomaswl.com/practica/toefl' },
        ]}
      />
      <main className={styles.page}>
      <section className={styles.hero}>
        <div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/practica">Práctica</Link><span>›</span><span>TOEFL iBT</span>
          </nav>
          <div className={styles.heroPanel}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>TOEFL iBT · formato posterior al 21 de enero de 2026</p>
              <h1>Práctica TOEFL 2026 para las cuatro secciones</h1>
              <p className={styles.lead}>Entrena Reading, Listening, Writing y Speaking por tarea y después comprueba la transferencia en 20 simulacros originales de WeLearn. El TOEFL oficial adapta Reading y Listening; nuestros recorridos son fijos y no oficiales para que puedas comparar intentos.</p>
              <div className={styles.heroActions}>
                <Link href="/examenes/toefl#simulacros" className={styles.primaryAction}>Ver los 20 simulacros <ArrowRight size={17} aria-hidden="true" /></Link>
                <a href="#toefl-strategy-map" className={styles.secondaryAction}>Escuchar la guía</a>
              </div>
            </div>

            <aside className={styles.studySheet} aria-label="Recorrido recomendado de práctica TOEFL">
              <div className={styles.sheetHandle} aria-hidden="true" />
              <div className={styles.sheetHeader}>
                <div><span>Plan de estudio</span><strong>Tu recorrido TOEFL</strong></div>
                <span className={styles.readyBadge}><Check size={14} aria-hidden="true" /> Listo</span>
              </div>
              <ol className={styles.sheetSteps}>
                {routes.map(({ title, Icon }, index) => (
                  <li key={title}>
                    <span className={styles.stepIcon}><Icon size={18} aria-hidden="true" /></span>
                    <span><small>Paso {index + 1}</small><strong>{title}</strong></span>
                    <span className={styles.stepCheck}><Check size={14} aria-hidden="true" /></span>
                  </li>
                ))}
              </ol>
              <p className={styles.sheetNote}>Practica una tarea, identifica el error y confirma la mejora en un simulacro completo.</p>
            </aside>
          </div>
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
        variant="ios"
        links={[
          { href: '/practica/toefl/reading', label: 'Reading route' },
          { href: '/practica/toefl/listening', label: 'Listening route' },
          { href: '/practica/toefl/writing', label: 'Writing route' },
          { href: '/practica/toefl/speaking', label: 'Speaking route' },
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
    </>
  );
}
