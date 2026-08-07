import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDED_SIMULACRO_2026_COUNTS, GUIDED_SIMULACRO_2026_QUESTIONS } from '@/data/icfes/guided-simulacro-2026';
import { getIcfesPart, ICFES_PARTS } from '@/data/icfes/parts';
import IcfesJsonLd from '../_components/IcfesJsonLd';
import IcfesPartPracticeEngine from '../_components/IcfesPartPracticeEngine';
import styles from '../icfes-learning.module.css';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/simulacro-guiado';

export const metadata: Metadata = {
  title: 'Simulacro guiado ICFES Inglés: 55 preguntas explicadas',
  description: 'Practica 55 preguntas originales de las 7 partes de Inglés Saber 11 con respuesta inmediata, evidencia, distractores, microlecciones y ruta de refuerzo.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Simulacro guiado ICFES Inglés de 55 preguntas',
    description: 'Un entrenamiento completo con feedback inmediato para aprender de cada respuesta.',
    url: CANONICAL,
    type: 'website',
  },
};

export default function GuidedSimulacroPage() {
  const firstPart = getIcfesPart('parte-1');
  if (!firstPart) return null;

  return (
    <main className={styles.learningPage} style={{ '--part-color': firstPart.color, '--part-soft': firstPart.softColor } as React.CSSProperties}>
      <IcfesJsonLd
        name="Simulacro guiado ICFES Inglés de 55 preguntas"
        description="Práctica original de WeLearn basada en las siete habilidades de Inglés Saber 11, con retroalimentación inmediata."
        url={CANONICAL}
        type="Quiz"
        questionCount={GUIDED_SIMULACRO_2026_QUESTIONS.length}
        currentLabel="Simulacro guiado de 55 preguntas"
      />
      <div className={styles.pageWrap}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan">
          <Link href="/practica/icfes-saber-11">ICFES Saber 11</Link><span>/</span><span aria-current="page">Simulacro guiado</span>
        </nav>

        <header className={styles.guidedHero}>
          <div>
            <p className={styles.kicker}>Entrenamiento propio WeLearn · edición 2026-2</p>
            <h1>55 preguntas para aprender mientras practicas</h1>
            <p>Recorre las siete partes de Inglés Saber 11. Después de cada respuesta verás la evidencia, la razón correcta, por qué falla cada distractor y una microlección que puedes aplicar en la siguiente pregunta.</p>
          </div>
          <div className={styles.guidedModeCard}>
            <span>Modo guiado completo</span><strong>55 preguntas</strong>
            <p>Contenido original basado en las habilidades vigentes. No es un cuadernillo oficial ni predice tu puntaje ICFES.</p>
            <Link href="/practica/icfes-saber-11/examenes">Ver cuadernillos divulgados →</Link>
          </div>
        </header>

        <section className={styles.workbookMap} aria-labelledby="guided-map-title">
          <div><p className={styles.kicker}>Mapa del recorrido</p><h2 id="guided-map-title">Las 7 partes, en orden</h2><p>El color cambia cuando cambia la habilidad para que siempre sepas qué estás entrenando.</p></div>
          <ol>{ICFES_PARTS.map((part) => (
            <li key={part.part} style={{ '--map-color': part.color } as React.CSSProperties}>
              <span>Parte {part.part}</span><strong>{part.shortTitle}</strong><small>{GUIDED_SIMULACRO_2026_COUNTS[part.part]} preguntas</small>
            </li>
          ))}</ol>
        </section>

        <section className={styles.sourceSection} aria-label="Cómo funciona">
          <div><span>Aprendizaje inmediato</span><p>Confirma una respuesta y recibe explicación antes de avanzar. Los errores se guardan en tu cola de repaso.</p></div>
          <div><span>Diagnóstico accionable</span><p>Al terminar, el motor identifica la parte con menor precisión y te lleva a la lección específica.</p></div>
        </section>

        <section className={styles.practiceSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>55 preguntas · feedback inmediato</p>
            <h2>Responde, confirma y entiende</h2>
            <p>Puedes salir y volver: las respuestas quedan guardadas en este dispositivo y se sincronizan con tu cuenta si has iniciado sesión.</p>
          </div>
          <IcfesPartPracticeEngine
            part={firstPart}
            questions={[...GUIDED_SIMULACRO_2026_QUESTIONS]}
            context="guided-simulator"
            progressScope="guided:welearn-2026-2:55"
          />
        </section>

        <section className={styles.sourceSection}>
          <div><span>Autoría y alcance</span><p>Preguntas, explicaciones y distractores: elaboración original de Idiomas WeLearn. La estructura pedagógica toma como referencia las siete partes descritas por el ICFES.</p></div>
          <div><span>Uso responsable</span><p>El porcentaje final mide únicamente esta práctica. Para conocer el material divulgado por la entidad, consulta la sección de cuadernillos.</p></div>
        </section>
      </div>
    </main>
  );
}
