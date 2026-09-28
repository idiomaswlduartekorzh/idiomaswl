import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpenCheck, Headphones, LockKeyhole, Mic2, PenLine } from 'lucide-react';
import { notFound, permanentRedirect } from 'next/navigation';

import styles from '../../toefl/ios.module.css';

const LEVELS = ['a1', 'a2', 'b1', 'b2'] as const;
const LEGACY_SKILLS = ['listening', 'reading', 'writing', 'speaking'] as const;
type Level = typeof LEVELS[number];

const levelConfig = {
  a1: {
    name: 'A1',
    subtitle: 'Start Deutsch 1',
    lead: 'Trabaja las cuatro destrezas de los diez sets A1 con el recorrido y la retroalimentación ya aprobados.',
    sets: 10,
    available: true,
  },
  a2: {
    name: 'A2',
    subtitle: 'Goethe-Zertifikat A2',
    lead: 'Estudia Lesen, Schreiben y Sprechen en diez mocks originales y fieles a la estructura A2. Hören espera sus audios definitivos.',
    sets: 10,
    available: true,
  },
  b1: {
    name: 'B1',
    subtitle: 'Goethe-Zertifikat B1',
    lead: 'La navegación está preparada, pero el banco seguirá bloqueado hasta completar la auditoría editorial por destreza.',
    sets: 0,
    available: false,
  },
  b2: {
    name: 'B2',
    subtitle: 'Goethe-Zertifikat B2',
    lead: 'La navegación está preparada, pero el banco seguirá bloqueado hasta completar la auditoría editorial por destreza.',
    sets: 0,
    available: false,
  },
} as const;

const skillConfig = [
  { id: 'listening', label: 'Hören', icon: Headphones, a1: '15 preguntas · 20 min', a2: '20 preguntas · audio pendiente' },
  { id: 'reading', label: 'Lesen', icon: BookOpenCheck, a1: '15 preguntas · 25 min', a2: '20 preguntas · 30 min' },
  { id: 'writing', label: 'Schreiben', icon: PenLine, a1: 'Formulario + mensaje · 20 min', a2: '2 tareas · 30 min' },
  { id: 'speaking', label: 'Sprechen', icon: Mic2, a1: '3 partes · 15 min', a2: '3 partes · 15 min' },
] as const;

type Props = { params: Promise<{ skill: string }> };

export function generateStaticParams() {
  return [...LEVELS, ...LEGACY_SKILLS].map(skill => ({ skill }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { skill } = await params;
  if ((LEGACY_SKILLS as readonly string[]).includes(skill)) return { robots: { index: false, follow: true } };
  if (!(LEVELS as readonly string[]).includes(skill)) return {};
  const config = levelConfig[skill as Level];
  return {
    title: `Práctica Goethe ${config.name} por destreza`,
    description: config.lead,
    alternates: { canonical: `https://www.idiomaswl.com/practica/goethe/${skill}` },
    robots: { index: config.available, follow: true },
  };
}

export default async function GoetheLevelPage({ params }: Props) {
  const { skill: segment } = await params;
  if ((LEGACY_SKILLS as readonly string[]).includes(segment)) permanentRedirect(`/practica/goethe/a1/${segment}`);
  if (!(LEVELS as readonly string[]).includes(segment)) notFound();
  const level = segment as Level;
  const config = levelConfig[level];

  return <main className={styles.page} data-exam="goethe" lang="es">
    <header className={styles.hero}><div className="wrap">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Práctica</Link><span>›</span><Link href="/practica/goethe">Goethe</Link><span>›</span><span>{config.name}</span></nav>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>Goethe {config.name} · {config.subtitle}</p>
        <h1>{config.available ? 'Elige una destreza.' : `${config.name} está en preparación.`}</h1>
        <p className={styles.lead}>{config.lead}</p>
      </div>
      <dl className={styles.facts} aria-label={`Estado de Goethe ${config.name}`}>
        <div><dt>Nivel</dt><dd>{config.name}</dd><dd className={styles.factNote}>{config.subtitle}</dd></div>
        <div><dt>Sets</dt><dd>{config.sets || '—'}</dd><dd className={styles.factNote}>{config.sets ? 'biblioteca original WeLearn' : 'pendientes de auditoría'}</dd></div>
        <div><dt>Destrezas</dt><dd>{level === 'a1' ? 4 : level === 'a2' ? 3 : 0}</dd><dd className={styles.factNote}>disponibles ahora</dd></div>
        <div><dt>Estado</dt><dd>{config.available ? '✓' : '🔒'}</dd><dd className={styles.factNote}>{config.available ? 'práctica por secciones' : 'sin contenido público'}</dd></div>
      </dl>
    </div></header>

    <section className={styles.modes} aria-labelledby="goethe-skill-heading"><div className="wrap">
      <div className={styles.previewHeader}><div><p>Nivel {config.name}</p><h2 id="goethe-skill-heading">Cuatro destrezas. Una práctica cada vez.</h2></div><Link href="/practica/goethe" className={styles.textLink}><ArrowLeft aria-hidden="true" /> Cambiar de nivel</Link></div>
      <div className={styles.sectionStrip}>
        {skillConfig.map(({ id, label, icon: Icon, a1, a2 }) => {
          const available = level === 'a1' || (level === 'a2' && id !== 'listening');
          const note = level === 'a1' ? a1 : level === 'a2' ? a2 : 'Banco editorial pendiente';
          const content = <><Icon aria-hidden="true" /><span><strong>{label}</strong><small>{note}</small></span>{available ? <ArrowRight aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}</>;
          return available
            ? <Link key={id} href={`/practica/goethe/${level}/${id}`} className={styles.sectionPreview} data-section={id}>{content}</Link>
            : <div key={id} className={`${styles.sectionPreview} ${styles.lockedSection}`} data-section={id} aria-label={`${label}, bloqueado`}>{content}</div>;
        })}
      </div>
      {level === 'a2' ? <aside className={styles.libraryNote}><strong>Hören bloqueado por diseño</strong><p>Los guiones, preguntas e imágenes existen, pero la destreza no se habilitará hasta que las pistas de audio pasen revisión técnica y humana. Los simulacros completos A2 permanecen bloqueados por la misma razón.</p></aside> : null}
      {!config.available ? <aside className={styles.libraryNote}><strong>Sin atajos editoriales</strong><p>Las fichas B1/B2 históricas no se publican como práctica hasta que satisfagan el mismo contrato de estructura, originalidad, dificultad, visuales y scoring aplicado a A2.</p></aside> : null}
    </div></section>
  </main>;
}
