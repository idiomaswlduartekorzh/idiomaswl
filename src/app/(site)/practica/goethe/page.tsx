import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, LockKeyhole, Route } from 'lucide-react';

import styles from '../toefl/ios.module.css';

export const metadata: Metadata = {
  title: 'Práctica Goethe A1, A2, B1 y B2 por destreza',
  description: 'Entrena Goethe por nivel y destreza. A1 disponible; A2 abre Lesen, Schreiben y Sprechen en diez sets y mantiene Hören bloqueado hasta aprobar el audio.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/goethe' },
  openGraph: {
    title: 'Práctica Goethe por niveles · A1, A2, B1 y B2',
    description: 'Bibliotecas Goethe organizadas por nivel, set y Teil con material original de WeLearn.',
    url: 'https://www.idiomaswl.com/practica/goethe',
    type: 'website',
    locale: 'es_CO',
  },
  robots: { index: true, follow: true },
};

const levels = [
  {
    id: 'a1',
    label: 'A1',
    subtitle: 'Start Deutsch 1',
    description: 'Hören, Lesen, Schreiben y Sprechen por separado en los diez sets ya publicados.',
    status: '4 destrezas disponibles',
    available: true,
  },
  {
    id: 'a2',
    label: 'A2',
    subtitle: 'Goethe-Zertifikat A2',
    description: 'Diez sets originales con Lesen, Schreiben y Sprechen listos. Hören permanece bloqueado hasta aprobar sus pistas.',
    status: '3 destrezas disponibles',
    available: true,
  },
  {
    id: 'b1',
    label: 'B1',
    subtitle: 'Goethe-Zertifikat B1',
    description: 'La sección ya está creada para recibir el próximo banco auditado sin mezclar materiales preliminares.',
    status: 'Biblioteca bloqueada',
    available: false,
  },
  {
    id: 'b2',
    label: 'B2',
    subtitle: 'Goethe-Zertifikat B2',
    description: 'La estructura está montada; se habilitará únicamente cuando contenido, visuales y scoring pasen revisión.',
    status: 'Biblioteca bloqueada',
    available: false,
  },
] as const;

export default function GoethePracticePage() {
  return <main className={styles.page} data-exam="goethe" lang="es">
    <header className={styles.hero}><div className="wrap">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Práctica</Link><span>›</span><span>Goethe</span></nav>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>Goethe · práctica por nivel y destreza</p>
        <h1>Elige tu nivel.</h1>
        <p className={styles.lead}>Entra a una biblioteca organizada por Fertigkeit, set y Teil. Puedes trabajar únicamente la destreza que necesitas sin abrir un simulacro incompleto.</p>
        <p className={styles.disclosure}>Material original de WeLearn alineado con la arquitectura pública de cada nivel. No es contenido oficial ni está afiliado al Goethe-Institut.</p>
      </div>
      <dl className={styles.facts} aria-label="Estado de la práctica Goethe">
        <div><dt>Niveles</dt><dd>4</dd><dd className={styles.factNote}>A1 · A2 · B1 · B2</dd></div>
        <div><dt>Sets listos</dt><dd>20</dd><dd className={styles.factNote}>10 A1 + 10 A2</dd></div>
        <div><dt>Destrezas abiertas</dt><dd>7</dd><dd className={styles.factNote}>4 en A1 · 3 en A2</dd></div>
        <div><dt>Examen A2</dt><dd>🔒</dd><dd className={styles.factNote}>Hören y examen bloqueados</dd></div>
      </dl>
    </div></header>

    <section className={styles.modes} aria-labelledby="goethe-level-heading"><div className="wrap">
      <div className={styles.sectionHeading}><p>Bibliotecas Goethe</p><h2 id="goethe-level-heading">Una ruta clara para cada etapa.</h2><span>Los niveles bloqueados se muestran desde ahora para mantener una navegación estable, pero no sirven contenido sin auditoría editorial.</span></div>
      <div className={styles.levelGrid}>
        {levels.map((level, index) => {
          const content = <>
            <div className={styles.modeTop}>
              <span className={styles.modeIcon}>{level.available ? <Route aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}</span>
              <span className={`${styles.status} ${level.available ? styles.statusAvailable : styles.statusSoon}`}>{level.status}</span>
            </div>
            <p className={styles.modeNumber}>{String(index + 1).padStart(2, '0')} · {level.subtitle}</p>
            <h3>{level.label}</h3>
            <p>{level.description}</p>
            <span className={level.available ? styles.modeAction : styles.modeUnavailable}>{level.available ? 'Abrir nivel' : 'Próximamente'} {level.available ? <ArrowRight aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}</span>
          </>;
          return level.available
            ? <Link key={level.id} href={`/practica/goethe/${level.id}`} className={`${styles.modeCard} ${styles.modeExercises}`}>{content}</Link>
            : <article key={level.id} className={`${styles.modeCard} ${styles.lockedCard}`} aria-label={`${level.label}, próximamente`}>{content}</article>;
        })}
      </div>
    </div></section>

    <section className={styles.preview} aria-labelledby="goethe-release-heading"><div className="wrap">
      <div className={styles.previewHeader}><div><p>Publicación responsable</p><h2 id="goethe-release-heading">A2 útil ahora, sin fingir que el audio está listo.</h2></div><Link href="/examenes/goethe#practica" className={styles.textLink}>Ver simulacros bloqueados <ArrowRight aria-hidden="true" /></Link></div>
      <aside className={styles.libraryNote}><BookOpenCheck aria-hidden="true" /><strong>Separación de producto</strong><p>Lesen, Schreiben y Sprechen A2 se pueden estudiar por secciones. Los diez exámenes completos siguen bloqueados y Hören no se sirve por ninguna ruta pública hasta tener audio aprobado.</p></aside>
    </div></section>
  </main>;
}
