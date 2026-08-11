'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import Task2LegoGuide from '../Task2LegoGuide';
import { BODY_DRILLS, BODY_PLANS, DIAGNOSTIC, WORKED_EXAMPLE } from './body-paragraph-drills';
import styles from '../introduccion/page.module.css';

/**
 * Sub-habilidad 3 — párrafos de cuerpo (TEEL).
 *
 * QUÉ SE MIDIÓ Y QUÉ SE ARREGLÓ
 *
 *   · El «diagnóstico» tenía cuatro items y los CUATRO eran defectos reales; el campo
 *     `correct` no lo leía nadie. Pulsar los cuatro botones bastaba para que la página
 *     felicitara. Ahora hay siete observaciones, tres de ellas falsas, y marcarlo todo
 *     ya no aprueba.
 *   · El botón de ensamblar se bloqueaba en silencio por debajo de quince caracteres. Ahora
 *     cada caja anuncia su mínimo antes de escribir y dice cuántas palabras faltan.
 *   · Once menciones de banda, entre ellas la que rotulaba el párrafo modelo, sobre un
 *     texto que la página no lee. Fuera las once.
 *   · Los colores del diagnóstico salían de un array indexado por posición: reordenar los
 *     items descolocaba las etiquetas T/E/E/L. Ahora salen del propio dato.
 *   · La tabla de Body 1 / Body 2 era una copia en español de lo que ya dice `ESSAY_TYPES`.
 *     Ahora se deriva de ahí.
 *
 * EL EJEMPLO RESUELTO VA ANTES DE ESCRIBIR
 *
 * Watch one, then you try: primero el párrafo flojo y el bueno del mismo enunciado, bloque a
 * bloque y con lo que cambió entre uno y otro; después los cinco que escribe el alumno.
 */

const TONE: Record<string, string> = { T: styles.claim, E1: styles.development, E2: styles.evidence, L: styles.link };

const countWords = (value: string) => value.trim().split(/\s+/u).filter(Boolean).length;

function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return <div className={`${styles.feedback} ${ok ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
    <CheckCircle2 size={20} /><div>{children}</div>
  </div>;
}

/** Un ejercicio: el topic sentence está dado y se escriben los tres bloques restantes. */
function Drill({ drill }: { drill: typeof BODY_DRILLS[number] }) {
  const [values, setValues] = useState<string[]>(() => drill.fields.map(() => ''));
  const [assembled, setAssembled] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const missing = drill.fields
    .map((field, index) => ({ field, short: field.minWords - countWords(values[index]) }))
    .filter((item) => item.short > 0);

  return <div className={styles.guidedWorkshop}>
    <div className={styles.promptCard}>
      <span>IELTS-style prompt · {drill.role}</span>
      <p>{drill.prompt}</p>
    </div>

    <div className={`${styles.guidedField} ${styles.claim}`}>
      <strong>T — Topic sentence (given)</strong>
      <p>{drill.topicSentence}</p>
    </div>

    {drill.fields.map((field, index) => {
      const written = countWords(values[index]);
      const short = field.minWords - written;
      return <label key={field.part} className={`${styles.guidedField} ${TONE[field.part]}`}>
        <strong>{field.part === 'L' ? 'L' : 'E'} — {field.label}</strong>
        <span>{field.ask}</span>
        <textarea
          value={values[index]}
          rows={3}
          disabled={assembled}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          onChange={(event) => setValues((current) => current.map((v, i) => (i === index ? event.target.value : v)))}
        />
        {/* El mínimo se anuncia antes de escribir, y dice cuánto falta mientras se escribe. */}
        <small className={short > 0 ? styles.matchReview : styles.matchGood}>
          Minimum {field.minWords} words · {short > 0 ? `${short} to go` : `${written} written`}
        </small>
      </label>;
    })}

    {!assembled && <>
      <div className={styles.workshopActions}>
        <button type="button" disabled={missing.length > 0} onClick={() => setAssembled(true)}>
          Assemble the paragraph <ArrowRight size={16} />
        </button>
      </div>
      {/* Ningún botón bloqueado sin decir por qué. */}
      {missing.length > 0 && <p className={styles.unlockHint}>
        Still short: {missing.map((item) => `${item.field.label} (${item.short} more)`).join(', ')}.
      </p>}
    </>}

    {assembled && <>
      <div className={styles.completeParagraph}>
        <strong>Your paragraph, read as one</strong>
        <p>
          <span className={styles.claim}>{drill.topicSentence}</span>{' '}
          {drill.fields.map((field, index) => (
            <span key={field.part} className={TONE[field.part]}>{values[index]} </span>
          ))}
        </p>
      </div>

      {/*
        Nada dice si está bien: la página no lee inglés. Lo que sí puede hacer es poner al
        lado uno que hace el trabajo, para que la comparación la haga quien escribió.
      */}
      <p className={styles.mistakeNote}>
        This page does not mark your English. What it can do is put a paragraph that does the job next to
        yours: compare them block by block and look for the one where the difference is largest.
      </p>

      <div className={styles.workshopActions}>
        <button type="button" className={styles.secondaryButton}
          onClick={() => { setValues(drill.fields.map(() => '')); setAssembled(false); setShowModel(false); }}>
          <RotateCcw size={15} /> Write it again
        </button>
        <button type="button" onClick={() => setShowModel((current) => !current)}>
          {showModel ? 'Hide the comparison' : 'Compare with a model'}
        </button>
      </div>

      {showModel && <div className={styles.modelReveal}>
        <p className={styles.paragraphLabel}>One paragraph that does the job</p>
        <p>
          <span className={styles.claim}>{drill.topicSentence}</span>{' '}
          {drill.fields.map((field) => (
            <span key={field.part} className={TONE[field.part]}>{field.model} </span>
          ))}
        </p>
      </div>}
    </>}
  </div>;
}

/** El diagnóstico: siete observaciones, tres de ellas falsas. */
function Diagnostic() {
  const [opened, setOpened] = useState<string[]>([]);

  const real = DIAGNOSTIC.observations.filter((item) => item.real);
  const found = real.filter((item) => opened.includes(item.id));
  const wrongCalls = DIAGNOSTIC.observations.filter((item) => !item.real && opened.includes(item.id));
  const done = found.length === real.length;

  return <>
    <div className={styles.sourcePrompt}>{DIAGNOSTIC.paragraph}</div>

    <p className={styles.exerciseInstruction}>
      Seven things people say about this paragraph. Four of them are real defects and three are not.
      Click the ones you think are real.
    </p>

    <div className={styles.optionGrid}>
      {DIAGNOSTIC.observations.map((item) => {
        const isOpen = opened.includes(item.id);
        return <button key={item.id} type="button"
          onClick={() => setOpened((current) => (current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]))}
          className={[
            styles.option,
            isOpen && item.real ? styles.correct : '',
            isOpen && !item.real ? styles.incorrect : '',
          ].filter(Boolean).join(' ')}>
          <div>
            {/* La etiqueta sale del dato, no de la posición en la lista. */}
            <strong>{item.part === '—' ? 'Whole paragraph' : item.part}</strong> · {item.claim}
            {isOpen && <p>{item.real ? item.why : `Not a defect. ${item.why}`}</p>}
          </div>
        </button>;
      })}
    </div>

    <p className={styles.wordMeter}>
      {found.length} of {real.length} real defects found
      {wrongCalls.length > 0 && ` · ${wrongCalls.length} wrong call${wrongCalls.length > 1 ? 's' : ''}`}
    </p>

    {done && <Feedback ok={wrongCalls.length === 0}>
      <strong>
        {wrongCalls.length === 0
          ? 'All four, and nothing that was not there.'
          : `All four found — and ${wrongCalls.length} thing${wrongCalls.length > 1 ? 's' : ''} marked that was not a defect.`}
      </strong>
      <p>
        {wrongCalls.length === 0
          ? 'The three you left alone are the ones people reach for when a paragraph feels weak but they cannot say why: too short, no opinion, no connectors. None of them was the problem.'
          : `Reread ${wrongCalls.map((item) => `“${item.claim}”`).join(' and ')}. Both the length and the connectors could be changed without the paragraph getting any better.`}
      </p>
    </Feedback>}

    {done && <div className={styles.modelReveal}>
      <p className={styles.paragraphLabel}>The same subject, rebuilt</p>
      <p>{DIAGNOSTIC.rebuilt}</p>
    </div>}

    <div className={styles.workshopActions}>
      <button type="button" className={styles.secondaryButton} onClick={() => setOpened([])}>
        <RotateCcw size={15} /> Clear
      </button>
    </div>
  </>;
}

export default function ParrafosCuerpoClient() {
  const [active, setActive] = useState(0);
  const drill = BODY_DRILLS[active];

  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span>
      <span>Body paragraphs</span>
    </nav>

    <header className={styles.hero}>
      <p className={styles.kicker}>Sub-skill 3</p>
      <h1>Build a body paragraph that does four jobs</h1>
      <p className={styles.heroLead}>
        Topic sentence, explanation, example, link. The topic sentence is written for you in every exercise —
        what you build is the three sentences that make it worth having. The failure this page is built to fix
        is the paragraph that says its claim four times in four different ways.
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>T</strong><span>the one claim this paragraph proves</span></div>
        <div className={styles.fact}><strong>E</strong><span>the mechanism, not the claim again</span></div>
        <div className={styles.fact}><strong>E</strong><span>one named case, with figures</span></div>
        <div className={styles.fact}><strong>L</strong><span>spend the evidence, open nothing new</span></div>
      </div>
    </header>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Official format and WeLearn strategy</p>
        <h2>TEEL is a planning tool, not an IELTS rule</h2>
      </div>
      <Task2OfficialReviewBlock
        focus="Developing a body paragraph with a claim, a mechanism, evidence and a link back."
        officialFormat="IELTS Academic Writing Task 2 assesses how ideas are developed across a complete essay. TEEL is a WeLearn teaching structure, not an official template, and no assessment criterion counts sentences."
        welearnStrategy="We use TEEL so that each paragraph does argumentative work instead of restating a general claim in four different ways."
        answerCheck="Read your paragraph and ask what each sentence adds. If two sentences make the same point, one of them is not doing its job."
      />
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Before TEEL</p>
        <h2>What Body 1 and Body 2 are for changes with the instruction</h2>
        <p>
          TEEL is the engine inside the paragraph. What the paragraph has to contain comes from the prompt, so
          decide that first.
        </p>
      </div>
      <div className={styles.studyGrid}>
        {BODY_PLANS.map((plan) => (
          <article key={plan.id} className={styles.studyCard}>
            <p className={styles.typeTag}>{plan.label}</p>
            <p><strong>Body 1: </strong>{plan.bodyOne}</p>
            <p><strong>Body 2: </strong>{plan.bodyTwo}</p>
          </article>
        ))}
      </div>
      <Task2LegoGuide />
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Watch one</p>
        <h2>The same claim, written twice</h2>
        <p>Both paragraphs answer the same prompt and make the same argument. One of them develops it.</p>
      </div>

      <article className={`${styles.examplePanel} ${styles.workedExample}`}>
        <div className={styles.workedBadge}>Worked example</div>
        <div className={styles.promptCard}><span>IELTS-style prompt</span><p>{WORKED_EXAMPLE.prompt}</p></div>

        <div className={styles.weakStrong}>
          <p className={styles.weak}>{WORKED_EXAMPLE.weakVersion}</p>
          <p className={styles.strong}>{WORKED_EXAMPLE.blocks.map((block) => block.text).join(' ')}</p>
        </div>

        <div className={styles.modelBlockGrid}>
          {WORKED_EXAMPLE.blocks.map((block) => (
            <article key={block.part} className={TONE[block.part]}>
              <strong>{block.part} — {block.label}</strong>
              <p>{block.text}</p>
              <small>{block.job}</small>
            </article>
          ))}
        </div>

        <div className={styles.checkList}>
          <strong>What changed between the two</strong>
          {WORKED_EXAMPLE.whatChanged.map((line) => <p key={line}>{line}</p>)}
        </div>
      </article>

      <div className={styles.tryDivider}>
        <span>Now you try</span>
        <p>Five paragraphs across three question families. The model stays hidden until you have written all three blocks.</p>
      </div>

      <div className={styles.exampleTabs}>
        {BODY_DRILLS.map((item, index) => (
          <button key={item.id} type="button"
            className={`${styles.exampleTab} ${index === active ? styles.exampleTabActive : ''}`}
            onClick={() => setActive(index)}>
            {String(index + 1).padStart(2, '0')} · {item.family} — {item.role.split(' · ')[1]}
          </button>
        ))}
      </div>

      <article className={styles.examplePanel}>
        {/* `key`: sin él, lo escrito en un ejercicio se queda pegado al siguiente. */}
        <Drill key={drill.id} drill={drill} />
      </article>
    </section>

    <section id="diagnostic" className={`${styles.section} ${styles.practiceSection}`}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Critical reading</p>
        <h2>Find what is actually wrong with this paragraph</h2>
        <p>
          Three of the seven observations below are the things people say when a paragraph feels weak and they
          cannot say why. Telling them apart from the real defects is the skill.
        </p>
      </div>
      <div className={styles.enginePanel}>
        <div className={styles.exerciseBody}><Diagnostic /></div>
      </div>
    </section>

    <div className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2/body-1">Body 1 step by step</Link>
      <Link href="/practica/ielts/academic/writing/task2/linking-language">Linking language</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Write a full Task 2</Link>
    </div>
  </div></div>;
}
