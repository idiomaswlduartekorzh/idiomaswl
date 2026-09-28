import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpenCheck, Headphones, LockKeyhole, Mic2, PenLine } from 'lucide-react';
import { notFound } from 'next/navigation';

import { GOETHE_A2_PRACTICE_TEILE, GOETHE_PRACTICE_TEILE, type GoethePracticeSkill } from '@/lib/goethe/practice';
import { GOETHE_A1_AUDIO_READY_SETS, GOETHE_A1_SET_COUNT, goethePracticeSetNumbers } from '@/lib/goethe/release';
import styles from '../../../toefl/ios.module.css';

const LEVELS = ['a1', 'a2', 'b1', 'b2'] as const;
const SKILLS = ['listening', 'reading', 'writing', 'speaking'] as const;
type Level = typeof LEVELS[number];
type Skill = typeof SKILLS[number];

const skillConfig = {
  listening: {
    label: 'Hören', icon: Headphones,
    a1: { duration: '20 min', workload: '15 preguntas · 3 partes', description: 'Escucha conversaciones y anuncios breves con las reproducciones previstas para A1.', feedback: 'Corrección pregunta por pregunta al terminar la destreza.' },
    a2: { duration: '30 min', workload: '20 preguntas · 4 partes', description: 'Los cuatro tipos de tarea ya están escritos, pero la práctica espera sus pistas definitivas.', feedback: 'Bloqueado hasta que el audio pase control técnico y humano.' },
  },
  reading: {
    label: 'Lesen', icon: BookOpenCheck,
    a1: { duration: '25 min', workload: '15 preguntas · 3 partes', description: 'Trabaja mensajes personales, anuncios de internet y avisos cotidianos con textos A1 originales.', feedback: 'Corrección pregunta por pregunta al terminar la destreza.' },
    a2: { duration: '30 min', workload: '20 respuestas · 4 partes', description: 'Trabaja artículo, tablero informativo, correo y asignación de anuncios con complejidad A2.', feedback: 'Corrección objetiva únicamente después de entregar.' },
  },
  writing: {
    label: 'Schreiben', icon: PenLine,
    a1: { duration: '20 min', workload: 'Formulario + mensaje', description: 'Completa un formulario y redacta un mensaje breve siguiendo tres consignas.', feedback: 'Revisión de campos, extensión y cumplimiento de consignas.' },
    a2: { duration: '30 min', workload: '2 tareas · 20–40 palabras', description: 'Redacta una Nachricht personal y una E-Mail halbformell con tres funciones comunicativas.', feedback: 'Guía de autoevaluación tras terminar cada tarea.' },
  },
  speaking: {
    label: 'Sprechen', icon: Mic2,
    a1: { duration: '15 min', workload: '3 partes · grabación', description: 'Practica presentación personal, preguntas por tarjetas y peticiones cotidianas.', feedback: 'Registro de la grabación y guía de autoevaluación.' },
    a2: { duration: '15 min', workload: '3 partes · práctica oral', description: 'Formula preguntas, habla sobre una experiencia y acuerda un plan con apoyos A2.', feedback: 'Guía de producción y notas para repetir la respuesta.' },
  },
} as const;

type Props = { params: Promise<{ skill: string; practiceSkill: string }> };

export function generateStaticParams() {
  return LEVELS.flatMap(skill => SKILLS.map(practiceSkill => ({ skill, practiceSkill })));
}

function isValidLevel(value: string): value is Level {
  return (LEVELS as readonly string[]).includes(value);
}

function isValidSkill(value: string): value is Skill {
  return (SKILLS as readonly string[]).includes(value);
}

function isAvailable(level: Level, skill: Skill) {
  return level === 'a1' || (level === 'a2' && skill !== 'listening');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { skill: level, practiceSkill } = await params;
  if (!isValidLevel(level) || !isValidSkill(practiceSkill)) return {};
  const config = skillConfig[practiceSkill];
  const available = isAvailable(level, practiceSkill);
  return {
    title: `Práctica Goethe ${level.toUpperCase()} ${config.label}`,
    description: available ? config[level === 'a1' ? 'a1' : 'a2'].description : `${config.label} ${level.toUpperCase()} está en preparación.`,
    alternates: { canonical: `https://www.idiomaswl.com/practica/goethe/${level}/${practiceSkill}` },
    robots: { index: available, follow: true },
  };
}

export default async function GoetheSkillLibraryPage({ params }: Props) {
  const { skill: levelParam, practiceSkill: skillParam } = await params;
  if (!isValidLevel(levelParam) || !isValidSkill(skillParam)) notFound();
  const level = levelParam;
  const skill = skillParam;
  const config = skillConfig[skill];
  const details = config[level === 'a1' ? 'a1' : 'a2'];
  const available = isAvailable(level, skill);
  const Icon = config.icon;
  const setNumbers = level === 'a1' ? goethePracticeSetNumbers(skill as GoethePracticeSkill) : available ? Array.from({ length: 10 }, (_, index) => index + 1) : [];
  const teile = level === 'a1' ? GOETHE_PRACTICE_TEILE[skill] : GOETHE_A2_PRACTICE_TEILE[skill];
  const pendingAudioSets = level === 'a1'
    ? Array.from({ length: GOETHE_A1_SET_COUNT }, (_, index) => index + 1).filter(number => !GOETHE_A1_AUDIO_READY_SETS.has(number))
    : [];

  return <main className={styles.page} data-exam="goethe" lang="es">
    <header className={styles.hero}><div className="wrap">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Práctica</Link><span>›</span><Link href="/practica/goethe">Goethe</Link><span>›</span><Link href={`/practica/goethe/${level}`}>{level.toUpperCase()}</Link><span>›</span><span>{config.label}</span></nav>
      <div className={styles.skillHeroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Goethe {level.toUpperCase()} · práctica independiente</p>
          <h1>{available ? `Practica ${config.label}.` : `${config.label} está bloqueado.`}</h1>
          <p className={styles.lead}>{available ? details.description : level === 'a2' && skill === 'listening' ? 'El contenido está listo, pero no se sirve sin las pistas de audio aprobadas.' : `La biblioteca ${level.toUpperCase()} se habilitará después de la auditoría editorial completa.`}</p>
        </div>
        <div className={styles.skillSummary}><Icon aria-hidden="true" /><strong>{available ? details.duration : 'Bloqueado'}</strong><span>{details.workload}</span><small>{details.feedback}</small></div>
      </div>
    </div></header>

    <section className={styles.modes} aria-labelledby="goethe-set-heading"><div className="wrap">
      <div className={styles.previewHeader}><div><p>Biblioteca {level.toUpperCase()}</p><h2 id="goethe-set-heading">{available ? 'Elige un set para comenzar.' : 'Todavía no hay práctica pública.'}</h2></div><Link href={`/practica/goethe/${level}`} className={styles.textLink}><ArrowLeft aria-hidden="true" /> Cambiar de destreza</Link></div>
      {available ? <>
        <p className={styles.libraryLead}>Elige la destreza completa o un Teil específico. La retroalimentación aparece únicamente después de terminar y el resultado no se presenta como puntaje oficial.</p>
        <div className={styles.setGrid}>
          {setNumbers.map(number => {
            const mockId = `${level}-${number}`;
            const baseHref = `/examenes/goethe/practica/${mockId}?mode=practice&skill=${skill}`;
            return <article key={number} className={styles.setPracticeCard}>
              <header className={styles.setPracticeHeader}>
                <span className={styles.setNumber}>{String(number).padStart(2, '0')}</span>
                <span className={styles.setCopy}><strong>Set {number}</strong><small>{details.workload}</small></span>
              </header>
              <Link href={baseHref} className={styles.setCompleteLink}>Destreza completa <ArrowRight aria-hidden="true" /></Link>
              <div className={styles.teilLinks} aria-label={`Practicar un Teil de ${config.label}, set ${number}`}>
                {teile.map(teil => <Link key={teil.teil} href={`${baseHref}&teil=${teil.teil}`}>
                  <span>Teil {teil.teil}</span><strong>{teil.title}</strong><small>{teil.workload} · {teil.minutes} min</small>
                </Link>)}
              </div>
            </article>;
          })}
        </div>
        {level === 'a1' && skill === 'listening' && pendingAudioSets.length > 0 ? <aside className={styles.libraryNote}><strong>Audio en producción</strong><p>Los sets {pendingAudioSets.join(', ')} se habilitarán únicamente cuando sus pistas hayan pasado el control de audio.</p></aside> : null}
        {level === 'a2' ? <aside className={styles.libraryNote}><strong>Práctica A2, no simulacro completo</strong><p>Esta biblioteca abre solamente {config.label}. Hören y los diez exámenes A2 continúan bloqueados hasta completar el audio.</p></aside> : null}
      </> : <aside className={styles.lockedPanel}><LockKeyhole aria-hidden="true" /><div><strong>{level === 'a2' ? 'Esperando audio aprobado' : 'Esperando banco auditado'}</strong><p>No hay un enlace alterno que permita saltar este bloqueo. Vuelve a las destrezas disponibles para seguir practicando.</p></div></aside>}
    </div></section>
  </main>;
}
