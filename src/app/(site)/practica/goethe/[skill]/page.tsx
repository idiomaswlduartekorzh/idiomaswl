import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpenCheck, Headphones, Mic2, PenLine } from 'lucide-react';
import { notFound } from 'next/navigation';

import { GOETHE_PRACTICE_TEILE } from '@/lib/goethe/practice';
import styles from '../../toefl/ios.module.css';

const skillConfig = {
  listening: {
    label: 'Hören',
    icon: Headphones,
    duration: '20 min',
    workload: '15 preguntas · 3 partes',
    description: 'Escucha conversaciones y anuncios breves con la misma lógica de una o dos reproducciones del examen A1.',
    feedback: 'Corrección pregunta por pregunta al terminar la destreza.',
    guidance: 'puedes repetir los audios de Hören y recibir feedback al final',
  },
  reading: {
    label: 'Lesen',
    icon: BookOpenCheck,
    duration: '25 min',
    workload: '15 preguntas · 3 partes',
    description: 'Trabaja mensajes personales, anuncios de internet y avisos cotidianos con textos A1 originales.',
    feedback: 'Corrección pregunta por pregunta al terminar la destreza.',
    guidance: 'puedes releer los textos y revisar la evidencia de cada respuesta al final',
  },
  writing: {
    label: 'Schreiben',
    icon: PenLine,
    duration: '20 min',
    workload: 'Formulario + mensaje',
    description: 'Completa un formulario a partir de una situación y redacta un mensaje breve siguiendo tres consignas.',
    feedback: 'Revisión de campos, extensión y cumplimiento de consignas.',
    guidance: 'puedes completar el formulario y usar la guía de revisión del mensaje al final',
  },
  speaking: {
    label: 'Sprechen',
    icon: Mic2,
    duration: '15 min',
    workload: '3 partes · grabación',
    description: 'Practica presentación personal, preguntas por tarjetas y peticiones cotidianas en una sesión enfocada.',
    feedback: 'Registro de la grabación y guía de autoevaluación al terminar.',
    guidance: 'puedes grabar tus respuestas y usar la guía de autoevaluación al final',
  },
} as const;

type Skill = keyof typeof skillConfig;
type Props = { params: Promise<{ skill: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(skillConfig).map((skill) => ({ skill }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { skill } = await params;
  const config = skillConfig[skill as Skill];
  if (!config) return {};
  const canonical = `https://www.idiomaswl.com/practica/goethe/${skill}`;
  return {
    title: `Práctica Goethe A1 ${config.label}: 7 ejercicios guiados`,
    description: `${config.workload}. Elige uno de siete sets originales de WeLearn para practicar ${config.label} de forma independiente.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function GoetheSkillLibraryPage({ params }: Props) {
  const { skill } = await params;
  const config = skillConfig[skill as Skill];
  if (!config) notFound();
  const Icon = config.icon;
  const teile = GOETHE_PRACTICE_TEILE[skill as Skill];

  return <main className={styles.page} lang="es">
    <header className={styles.hero}><div className="wrap">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Práctica</Link><span>›</span><Link href="/practica/goethe">Goethe A1</Link><span>›</span><span>{config.label}</span></nav>
      <div className={styles.skillHeroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Goethe A1 · práctica independiente</p>
          <h1>Practica {config.label}.</h1>
          <p className={styles.lead}>{config.description}</p>
        </div>
        <div className={styles.skillSummary}><Icon aria-hidden="true" /><strong>{config.duration}</strong><span>{config.workload}</span><small>{config.feedback}</small></div>
      </div>
    </div></header>

    <section className={styles.modes} aria-labelledby="goethe-set-heading"><div className="wrap">
      <div className={styles.previewHeader}><div><p>Biblioteca A1</p><h2 id="goethe-set-heading">Elige un set para comenzar.</h2></div><Link href="/practica/goethe" className={styles.textLink}><ArrowLeft aria-hidden="true" /> Cambiar de destreza</Link></div>
      <p className={styles.libraryLead}>Elige la destreza completa o un Teil específico. Cada ruta conserva el material y la lógica de ese bloque, y muestra la retroalimentación únicamente después de entregar.</p>
      <div className={styles.setGrid}>
        {Array.from({ length: 7 }, (_, index) => {
          const number = index + 1;
          const baseHref = `/examenes/goethe/practica/a1-${number}?mode=practice&skill=${skill}`;
          return <article key={number} className={styles.setPracticeCard}>
            <header className={styles.setPracticeHeader}>
              <span className={styles.setNumber}>{String(number).padStart(2, '0')}</span>
              <span className={styles.setCopy}><strong>Set {number}</strong><small>{config.workload}</small></span>
            </header>
            <Link href={baseHref} className={styles.setCompleteLink}>
              Destreza completa <ArrowRight aria-hidden="true" />
            </Link>
            <div className={styles.teilLinks} aria-label={`Practicar un Teil de ${config.label}, set ${number}`}>
              {teile.map(teil => <Link key={teil.teil} href={`${baseHref}&teil=${teil.teil}`}>
                <span>Teil {teil.teil}</span>
                <strong>{teil.title}</strong>
                <small>{teil.workload} · {teil.minutes} min</small>
              </Link>)}
            </div>
          </article>;
        })}
      </div>
      <aside className={styles.libraryNote}><strong>Antes de empezar</strong><p>Esta ruta es de práctica guiada: {config.guidance}. El simulacro completo mantiene las restricciones y el recorrido lineal del examen.</p></aside>
    </div></section>
  </main>;
}
