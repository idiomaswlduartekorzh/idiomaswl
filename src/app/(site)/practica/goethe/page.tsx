import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, ClipboardCheck, Headphones, Mic2, PenLine } from 'lucide-react';

import styles from '../toefl/ios.module.css';

export const metadata: Metadata = {
  title: 'Práctica Goethe A1: Hören, Lesen, Schreiben y Sprechen',
  description: 'Practica por separado las cuatro destrezas del Goethe-Zertifikat A1 o elige uno de siete simulacros completos originales de WeLearn.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/goethe' },
  openGraph: {
    title: 'Práctica Goethe A1 por destreza y simulacros completos',
    description: 'Hören, Lesen, Schreiben y Sprechen por separado, más siete simulacros A1 completos de WeLearn.',
    url: 'https://www.idiomaswl.com/practica/goethe',
    type: 'website',
    locale: 'es_CO',
  },
  robots: { index: true, follow: true },
};

const skills = [
  { id: 'listening', label: 'Hören', note: '15 preguntas · 20 min', icon: Headphones },
  { id: 'reading', label: 'Lesen', note: '15 preguntas · 25 min', icon: BookOpenCheck },
  { id: 'writing', label: 'Schreiben', note: 'Formulario + mensaje · 20 min', icon: PenLine },
  { id: 'speaking', label: 'Sprechen', note: '3 partes · 15 min', icon: Mic2 },
] as const;

export default function GoethePracticePage() {
  return <main className={styles.page} lang="es">
    <header className={styles.hero}><div className="wrap">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Práctica</Link><span>›</span><span>Goethe A1</span></nav>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>Goethe A1 · rutas claras de práctica</p>
        <h1>Elige qué quieres practicar.</h1>
        <p className={styles.lead}>Entrena una sola destreza en modo guiado o completa un simulacro de 80 minutos con la experiencia de examen ya aprobada.</p>
        <p className={styles.disclosure}>Material original de WeLearn alineado con la arquitectura pública del nivel A1. No es contenido oficial ni está afiliado al Goethe-Institut.</p>
      </div>
      <dl className={styles.facts} aria-label="Práctica Goethe A1 disponible">
        <div><dt>Nivel</dt><dd>A1</dd><dd className={styles.factNote}>Start Deutsch 1</dd></div>
        <div><dt>Destrezas</dt><dd>4</dd><dd className={styles.factNote}>práctica independiente</dd></div>
        <div><dt>Simulacros</dt><dd>7</dd><dd className={styles.factNote}>sesiones completas</dd></div>
        <div><dt>Examen completo</dt><dd>80</dd><dd className={styles.factNote}>minutos</dd></div>
      </dl>
    </div></header>

    <section className={styles.modes} aria-labelledby="goethe-mode-heading"><div className="wrap">
      <div className={styles.sectionHeading}><p>Empieza aquí</p><h2 id="goethe-mode-heading">¿Cómo quieres trabajar hoy?</h2><span>Cada ruta explica qué vas a practicar antes de iniciar el tiempo o el audio.</span></div>
      <div className={styles.modeGrid}>
        <Link href="#destrezas" className={`${styles.modeCard} ${styles.modeExercises}`}>
          <div className={styles.modeTop}><span className={styles.modeIcon}><ClipboardCheck aria-hidden="true" /></span><span className={`${styles.status} ${styles.statusAvailable}`}>Disponible</span></div>
          <p className={styles.modeNumber}>01</p><h3>Práctica por destreza</h3><p>Elige Hören, Lesen, Schreiben o Sprechen y trabaja únicamente ese módulo.</p><span className={styles.modeAction}>Elegir una destreza <ArrowRight aria-hidden="true" /></span>
        </Link>
        <Link href="/examenes/goethe/practica/a1-1?mode=practice&skill=listening" className={`${styles.modeCard} ${styles.modePractice}`}>
          <div className={styles.modeTop}><span className={styles.modeIcon}><Headphones aria-hidden="true" /></span><span className={`${styles.status} ${styles.statusAvailable}`}>Modo guiado</span></div>
          <p className={styles.modeNumber}>02</p><h3>Empezar con Hören</h3><p>Escucha con repeticiones disponibles y revisa cada respuesta cuando termines el módulo.</p><span className={styles.modeAction}>Abrir Hören A1 <ArrowRight aria-hidden="true" /></span>
        </Link>
        <Link href="/examenes/goethe#practica" className={`${styles.modeCard} ${styles.modeMocks}`}>
          <div className={styles.modeTop}><span className={styles.modeIcon}><BookOpenCheck aria-hidden="true" /></span><span className={`${styles.status} ${styles.statusMocks}`}>7 disponibles</span></div>
          <p className={styles.modeNumber}>03</p><h3>Simulacros completos</h3><p>Haz Hören, Lesen, Schreiben y Sprechen en una sesión continua con resultado Goethe sobre 100.</p><span className={styles.modeAction}>Elegir simulacro <ArrowRight aria-hidden="true" /></span>
        </Link>
      </div>
    </div></section>

    <section className={styles.preview} id="destrezas" aria-labelledby="goethe-skills-heading"><div className="wrap">
      <div className={styles.previewHeader}><div><p>Nivel A1</p><h2 id="goethe-skills-heading">Cuatro destrezas. Una práctica cada vez.</h2></div><Link href="/examenes/goethe#practica" className={styles.textLink}>Ver los siete simulacros <ArrowRight aria-hidden="true" /></Link></div>
      <div className={styles.sectionStrip}>{skills.map(({ id, label, note, icon: Icon }) => <Link key={id} href={`/examenes/goethe/practica/a1-1?mode=practice&skill=${id}`} className={styles.sectionPreview} data-section={id}><Icon aria-hidden="true" /><span><strong>{label}</strong><small>{note}</small></span><ArrowRight aria-hidden="true" /></Link>)}</div>
    </div></section>
  </main>;
}
