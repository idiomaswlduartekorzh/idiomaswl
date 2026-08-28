'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, FileCheck2, RotateCcw } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { REVIEW_LESSONS, pickDistractors } from './review-data';
import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import FinalReviewPracticeEngine from './FinalReviewPracticeEngine';
import styles from '../introduccion/page.module.css';

// Mismo cambio que en los demás talleres: barajado real en vez de rotación cíclica.
function rotate<T>(items: T[], seed: string, index: number) { return placeFirstAsCorrect(items, seed, index).options; }

/** Colores por párrafo, los mismos que usa el resto del curso. */
const PARAGRAPH_TONE: Record<string, string> = {
  Introduction: styles.claim, 'Body 1': styles.development, 'Body 2': styles.contrast, Conclusion: styles.link,
};

/**
 * Leer el ensayo completo, y solo entonces juzgar el borrador.
 *
 * Antes este taller enseñaba un fragmento de dos frases y pedía elegir cuál de los cinco
 * controles fallaba. Para los seis casos de «Task Response» eso era imposible de responder
 * leyendo: el fallo es una AUSENCIA —no se contesta la segunda pregunta, no se da la
 * opinión, no se compara— y una ausencia no se ve en un fragmento. Se acertaba emparejando
 * la etiqueta con la descripción del problema, que es lo contrario de revisar.
 *
 * David lo pidió así: «dar textos en los cuales la persona pueda revisar si se hizo lo que
 * se había colocado antes… eso se puede hacer así como el modelo de colores». Arriba va el
 * ensayo entero y correcto de este mismo enunciado, coloreado por párrafo; debajo, el
 * borrador con el fallo. Comparar los dos es lo que hace visible lo que falta.
 */
function ReviewWorkshop({ lessonId, caseIndex }: { lessonId: EssayTypeId; caseIndex: number }) {
  const lesson = REVIEW_LESSONS.find((item) => item.id === lessonId) ?? REVIEW_LESSONS[0]; const example = lesson.cases[caseIndex];
  const [selected, setSelected] = useState(''); const [checked, setChecked] = useState(false); const [showRevision, setShowRevision] = useState(false);
  const options = useMemo(() => rotate([example.category, ...pickDistractors(lesson.layers.map((layer) => layer.label), example.category, example.issue)], `taller-review|${example.title}`, caseIndex), [caseIndex, example.category, example.issue, example.title, lesson]);
  /**
   * Una explicación por opción. Antes las cuatro compartían `example.explanation`, así que
   * fallar no enseñaba nada: el mismo texto salía eligieras lo que eligieras. Cada control
   * tiene su pregunta escrita en los datos, y eso es lo que dice el mensaje.
   */
  const why = useMemo(() => new Map(lesson.layers.map((layer) => [layer.label, layer.label === example.category
    ? `Correct. ${example.explanation}`
    : `That check asks: “${layer.question}” This draft may or may not pass it, but that is not what breaks it first.`])), [lesson, example]);

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}>
      <div><span>Guided review workshop</span><h3>Read the finished essay, then find what the draft lost</h3></div>
      <button type="button" className={styles.iconButton} onClick={() => { setSelected(''); setChecked(false); setShowRevision(false); }} title="Reset this workshop" aria-label="Reset this workshop"><RotateCcw size={18} /></button>
    </div>

    <div className={styles.essaySoFar}>
      <h4>A complete answer to this prompt</h4>
      {example.model.map((paragraph) => <div key={paragraph.label}>
        <h4><span className={PARAGRAPH_TONE[paragraph.label]}>{paragraph.label}</span></h4>
        <p>{paragraph.text}</p>
      </div>)}
    </div>

    <div className={styles.workshopStep}>
      <div className={styles.stepLabel}><strong>Step 1</strong><span>Now read this draft. Which check does it fail first?</span></div>
      <p className={styles.reviewDraft}>{example.draft}</p>
      <div className={styles.optionGrid}>{options.map((option, index) => <button key={option} type="button" className={`${styles.option} ${selected === option ? styles.selected : ''} ${checked && option === example.category ? styles.correct : ''} ${checked && selected === option && option !== example.category ? styles.incorrect : ''}`} onClick={() => { setSelected(option); setChecked(false); setShowRevision(false); }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
      <div className={styles.workshopActions}><button type="button" onClick={() => setChecked(true)} disabled={!selected}><Eye size={17} /> Check the diagnosis</button></div>
      {!selected && <p className={styles.unlockHint}>Choose one of the checks to see whether it is the one.</p>}
      {checked && <div className={`${styles.feedback} ${selected === example.category ? styles.feedbackCorrect : styles.feedbackIncorrect}`}><CheckCircle2 size={20} /><div><strong>{selected === example.category ? 'That is what breaks first.' : 'Something else breaks before that.'}</strong><p>{why.get(selected)}</p></div></div>}
    </div>

    <div className={`${styles.workshopStep} ${selected !== example.category || !checked ? styles.stepLocked : ''}`}>
      <div className={styles.stepLabel}><strong>Step 2</strong><span>Compare the targeted revision</span></div>
      {selected === example.category && checked && <>
        <div className={styles.workshopActions}><button type="button" onClick={() => setShowRevision(true)}><Eye size={17} /> Reveal the targeted revision</button></div>
        {showRevision && <div className={styles.bodyModelReveal}><span>Expert revision</span><p className={styles.paragraphJob}>{example.revision}</p><p className={styles.comparisonNote}>The revision repairs the check that failed and leaves the rest alone. It is not a band score, and it is not the only wording that would work.</p></div>}
      </>}
    </div>
  </div>;
}

export default function FinalReviewClient({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [activeType, setActiveType] = useState<EssayTypeId>('opinion'); const [activeExample, setActiveExample] = useState(1);
  const lesson = REVIEW_LESSONS.find((item) => item.id === activeType) ?? REVIEW_LESSONS[0]; const worked = lesson.cases[0]; const example = lesson.cases[activeExample];
  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link><span>/</span><span>Final Review</span></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>Task 2 · Build the essay · Step 6</p><h1>Review an IELTS Task 2 essay before submission</h1><p className={styles.heroLead}>Check whether the essay answers the prompt before spending time polishing individual words. Review from Task Response to language control in a stable, evidence-based order.</p><div className={styles.factGrid}><div className={styles.fact}><strong>Prompt first</strong><span>missing instructions matter more than one comma</span></div><div className={styles.fact}><strong>5 checks</strong><span>answer, logic, position, cohesion and language</span></div><div className={styles.fact}><strong>5 families</strong><span>each has a decisive final check</span></div><div className={styles.fact}><strong>No auto-band</strong><span>feedback identifies decisions, not a score</span></div></div><div className={styles.heroActions}><a href="#guided-workshop">Practise diagnosis</a><a href="#practice-engine">Open the level engine</a></div></header>
    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Official criteria and WeLearn strategy</p><h2>Final review protects the complete response; it is not automatic marking</h2></div><Task2OfficialReviewBlock focus="Use the remaining time to verify that the response addresses every instruction, progresses logically and communicates with sufficient control." officialFormat="IELTS assesses the complete response through Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. No official rule prescribes one review checklist or a fixed review time." welearnStrategy="WeLearn reviews high-impact decisions first: instructions, position and paragraph jobs. Cohesion and sentence-level language come after the answer is secure." answerCheck="Every tick must be supported by visible evidence in the essay. This practice explains revision choices and does not award an automated band score." /></section>
    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>The five checks</p><h2>Fix the answer before polishing the language</h2><p>Reviewing in this order prevents surface corrections from hiding a larger Task Response problem.</p></div><div className={styles.legoRow}>{lesson.layers.map((layer, index) => <div key={layer.label} className={`${styles.legoBlock} ${styles[layer.tone]}`}><strong>{index + 1}. {layer.label}</strong><p>{layer.question}</p></div>)}</div></section>
    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Five question families</p><h2>The decisive check changes with the instruction</h2></div><div className={styles.typeTabs} role="tablist">{REVIEW_LESSONS.map((item) => <button key={item.id} type="button" role="tab" aria-selected={item.id === activeType} className={`${styles.typeTab} ${item.id === activeType ? styles.typeTabActive : ''}`} onClick={() => { setActiveType(item.id); setActiveExample(1); }}>{item.shortLabel}</button>)}</div><article className={styles.typePanel}><div className={styles.typeIntro}><div><h3>{lesson.shortLabel} review</h3><p className={styles.signal}><strong>Instruction:</strong> {lesson.instruction}</p><div className={styles.strategyList}><p><strong>Decisive check:</strong> {lesson.decisiveCheck}</p></div></div><p className={styles.trap}><strong>Review rule</strong><br />Do not tick a box because the idea is “somewhere” in the essay. Point to the exact thesis, paragraph or sentence that proves it.</p></div></article></section>
    <section id="guided-workshop" className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Watch one · then do four</p><h2>Study one diagnosis, then review four</h2><p>The first case demonstrates the thinking. The next four require you to choose the priority before seeing the revision.</p></div><article className={`${styles.examplePanel} ${styles.workedExample}`}><div className={styles.workedBadge}>Worked example · {worked.title}</div><div className={styles.promptCard}><span>IELTS-style prompt</span><p>{worked.prompt}</p></div>{/* El ejemplo resuelto tiene que enseñar el TEXTO, no solo la descripción del fallo:
        si la demostración no incluye leer un borrador, no demuestra lo que se va a pedir. */}
      <p className={styles.reviewDraft}>{worked.draft}</p>
      <div className={styles.modelBlockGrid}><article className={styles.claim}><strong>What is wrong with it</strong><p>{worked.issue}</p><small>Read the draft above and you can see it</small></article><article className={styles.development}><strong>{worked.category}</strong><p>{worked.explanation}</p><small>The first check it fails</small></article><article className={styles.link}><strong>Targeted revision</strong><p>{worked.revision}</p><small>Repairs that one thing, and leaves the rest alone</small></article></div></article><div className={styles.tryDivider}><span>Now you try</span><p>Decide which check fails first, then reveal the revision.</p></div><div className={styles.exampleTabs}>{lesson.cases.slice(1).map((item, offset) => { const index = offset + 1; return <button key={item.title} type="button" className={`${styles.exampleTab} ${activeExample === index ? styles.exampleTabActive : ''}`} onClick={() => setActiveExample(index)}>{String(index + 1).padStart(2, '0')} · {item.title}</button>; })}</div><article className={styles.examplePanel}><div className={styles.promptCard}><span>Your IELTS-style prompt</span><p>{example.prompt}</p></div><ReviewWorkshop key={`${activeType}-${activeExample}`} lessonId={activeType} caseIndex={activeExample} /></article></section>
    <FinalReviewPracticeEngine essayType={activeType} />
    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Frequently asked questions</p><h2>Review strategically under time pressure</h2></div><div className={styles.faqGrid}>{faqs.map(({ question, answer }) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>
    <nav className={styles.nextLinks}><Link href="/practica/ielts/academic/writing/task2/conclusion"><FileCheck2 size={18} /> Build the conclusion</Link><Link href="/practica/ielts/academic/writing/task2/tarea-completa">Open Complete Essay Practice <ArrowRight size={16} /></Link></nav>
  </div></div>;
}
