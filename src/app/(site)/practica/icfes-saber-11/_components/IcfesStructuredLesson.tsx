import type { IcfesPartLessonConfig } from '@/data/icfes/part-lessons';
import IcfesGuidedExamples from './IcfesGuidedExamples';
import styles from '../icfes-learning.module.css';

export default function IcfesStructuredLesson({ lesson }: { lesson: IcfesPartLessonConfig }) {
  const anatomy = lesson.anatomy;
  return (
    <>
      <nav className={styles.lessonRoadmap} aria-label="Recorrido de la lección">
        <a href="#entiende"><span>01</span><strong>Entiende</strong><small>formato oficial</small></a>
        <a href="#metodo"><span>02</span><strong>Aprende</strong><small>método WeLearn</small></a>
        <a href="#ejemplos"><span>03</span><strong>Observa</strong><small>15 ejemplos</small></a>
        <a href="#practica-guiada"><span>04</span><strong>Practica</strong><small>3 niveles</small></a>
      </nav>

      <section id="entiende" className={styles.partOneLesson} aria-labelledby={`part-${lesson.part}-understand-title`}>
        <div className={styles.lessonSectionHeading}>
          <p className={styles.kicker}>Antes de resolver</p>
          <h2 id={`part-${lesson.part}-understand-title`}>Entiende qué controla la respuesta</h2>
          <p>Aprende cómo se presenta la tarea, qué habilidad evalúa y cuál es la diferencia entre una opción relacionada y una respuesta realmente pertinente.</p>
        </div>
        <div className={styles.officialStrategyGrid}>
          <article><span>Formato oficial</span><h3>{lesson.formatTitle}</h3><p>{lesson.formatBody}</p></article>
          <article><span>Lo que evalúa</span><h3>{lesson.evaluatesTitle}</h3><p>{lesson.evaluatesBody}</p></article>
          <article><span>Estrategia WeLearn</span><h3>{lesson.strategyTitle}</h3><p>{lesson.strategyBody}</p></article>
        </div>

        <div className={styles.structuredAnatomy} data-visual={lesson.visual}>
          <div className={styles.lessonStimulus} data-visual={lesson.visual}><span>{anatomy.stimulusLabel}</span><strong>{anatomy.stimulus}</strong></div>
          <div className={styles.structuredQuestion}>
            <span>Así aparece la decisión</span><p>{anatomy.prompt}</p>
            <div>{anatomy.options.map((option, index) => <span key={option} data-answer={index === anatomy.answerIndex}><b>{String.fromCharCode(65 + index)}</b>{option}</span>)}</div>
          </div>
          <div className={styles.structuredReason}><mark>{anatomy.decisiveClue}</mark><strong>{anatomy.reasoning}</strong><p>{anatomy.distractor}</p></div>
        </div>

        <div className={styles.answerContract}>
          <div><span>Qué debes mirar</span><strong>{lesson.lookFor}</strong></div>
          <div><span>Qué debes responder</span><strong>{lesson.answerWith}</strong></div>
          <div><span>Qué no debes hacer</span><strong>{lesson.avoid}</strong></div>
        </div>
      </section>

      <section id="metodo" className={styles.partOneMethod} aria-labelledby={`part-${lesson.part}-method-title`}>
        <div className={styles.lessonSectionHeading}><p className={styles.kicker}>Método WeLearn</p><h2 id={`part-${lesson.part}-method-title`}>Cuatro decisiones que puedes repetir</h2><p>El estímulo cambia, pero el procedimiento conserva el control de la tarea y reduce el efecto de los distractores.</p></div>
        <ol className={styles.methodFlow}>
          {lesson.methodSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><strong>{step.title}</strong><p>{step.body}</p></div></li>)}
        </ol>
        <div className={styles.clueToolkit}>
          {lesson.clueTools.map((tool) => <article key={tool.label}><span>{tool.label}</span><strong>{tool.examples}</strong><p>{tool.body}</p></article>)}
        </div>
        <div className={styles.semanticThemes}>
          <div><p className={styles.kicker}>Mapa de decisiones</p><h3>Organiza las pistas por función</h3></div>
          <div>{lesson.families.map((family) => <article key={family.title}><span aria-hidden="true">{family.icon}</span><strong>{family.title}</strong><small>{family.examples}</small></article>)}</div>
        </div>
      </section>

      <div id="ejemplos"><IcfesGuidedExamples lesson={lesson} /></div>
    </>
  );
}
