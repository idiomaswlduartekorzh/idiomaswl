'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { GUIDED_EXERCISES, READING_METHOD, pathFor, type GuidedOption } from './type-path-data';
import styles from '../introduccion/page.module.css';

/**
 * Una ruta de tipo de ensayo: el camino entero de Task 2, filtrado a ese tipo.
 *
 * Sustituye a las cinco lecciones sueltas de ~362 líneas casi idénticas que había antes, y
 * que volvían a explicar por su cuenta lo que el curso ya enseña en sus unidades. Todo lo que
 * se pinta aquí sale de la fuente —`pathFor()`—, así que si mañana cambia el ejemplo de
 * Body 1 para opinion, esta página cambia con él.
 *
 * Cada paso enlaza a su unidad completa: esta página es el recorrido, no el sustituto.
 */

export type Faq = { question: string; answer: string };

/**
 * El enunciado, con la instrucción marcada.
 *
 * Lo que decide el tipo de ensayo son las últimas palabras, y es justo lo que un estudiante
 * no mira. David: «podríamos nosotros apoyar, subrayando cosas». Se separa la última frase
 * —que en un enunciado de Task 2 es siempre la instrucción— del contexto que la precede.
 */
function PromptSplit({ prompt }: { prompt: string }) {
  const sentences = prompt.match(/[^.?!]+[.?!]/gu) ?? [prompt];
  /**
   * La instrucción puede ser MÁS de una frase.
   *
   * Marcar solo la última dejaba en gris la primera pregunta de los enunciados de dos
   * preguntas —«Why has this happened? How can users determine whether information is
   * reliable?»—, o sea, le decía al alumno que la instrucción es la mitad de la instrucción,
   * justo en el tipo cuyo error característico es responder solo a una de las dos.
   *
   * Se marca hacia atrás mientras la frase anterior siga siendo una pregunta.
   */
  let from = sentences.length - 1;
  while (from > 0 && sentences[from - 1].trim().endsWith('?')) from -= 1;
  const instruction = sentences.slice(from).join(' ').trim();
  const context = sentences.slice(0, from).join(' ').trim();
  return <p className={styles.promptSplit}>
    {context && <span className={styles.promptContext}>{context} </span>}
    <mark className={styles.promptInstruction}>{instruction}</mark>
  </p>;
}

/** De qué campo sale la respuesta de cada fila del método. */
const ANSWER_OF: Record<string, (path: ReturnType<typeof pathFor>) => string> = {
  topic: (path) => path.reading.topic,
  instruction: (path) => path.reading.instruction,
  scope: (path) => path.reading.scope,
  position: (path) => path.reading.position,
  'body-1': (path) => path.reading.bodyRoute[0],
  'body-2': (path) => path.reading.bodyRoute[1],
};

/** Cómo se llega del enunciado a este párrafo: qué obliga, qué decides. */
function ReasonChain({ forces, decision }: { forces: string; decision: string }) {
  return <div className={styles.reasonChain}>
    <div><strong>1 · What the prompt forces here</strong><p>{forces}</p></div>
    <div><strong>2 · The decision you make</strong><p>{decision}</p></div>
    <div><strong>3 · What comes out of it</strong><p>The blocks below, in this order.</p></div>
  </div>;
}

function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return <div className={`${styles.feedback} ${ok ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
    <CheckCircle2 size={20} /><div>{children}</div>
  </div>;
}

/** Una tanda del ejercicio: elegir, revelar, y leer por qué falla cada una. */
function Round({
  title, ask, options, multiple,
}: {
  title: string;
  ask: string;
  options: GuidedOption[];
  multiple: boolean;
}) {
  const [chosen, setChosen] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const rights = options.filter((option) => option.good).map((option) => option.id);
  const hits = chosen.filter((id) => rights.includes(id)).length;
  const misses = chosen.filter((id) => !rights.includes(id)).length;
  const perfect = hits === rights.length && misses === 0;

  function pick(id: string) {
    if (revealed) return;
    setChosen((current) => {
      if (!multiple) return [id];
      return current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    });
  }

  return <div className={styles.workshopStep}>
    <p className={styles.stepLabel}><strong>{title}</strong></p>
    <p className={styles.exerciseInstruction}>{ask}</p>

    <div className={styles.optionGrid}>
      {options.map((option) => {
        const isChosen = chosen.includes(option.id);
        return <button key={option.id} type="button" onClick={() => pick(option.id)}
          className={[
            styles.option,
            isChosen && !revealed ? styles.selected : '',
            revealed && option.good ? styles.correct : '',
            revealed && isChosen && !option.good ? styles.incorrect : '',
          ].filter(Boolean).join(' ')}>
          <div>
            {option.text}
            {/* Al revelar, CADA opción explica lo suyo — también las que no se eligieron. */}
            {revealed && <p><strong>{option.good ? 'Works. ' : 'Does not work. '}</strong>{option.why}</p>}
          </div>
        </button>;
      })}
    </div>

    {!revealed && <>
      <div className={styles.workshopActions}>
        <button type="button" disabled={chosen.length === 0} onClick={() => setRevealed(true)}>
          Check {multiple ? 'the plan' : 'the answer'} <ArrowRight size={16} />
        </button>
      </div>
      {chosen.length === 0 && <p className={styles.unlockHint}>
        {multiple ? 'Choose every decision you would keep.' : 'Choose one.'}
      </p>}
    </>}

    {revealed && <>
      {/*
        Una tanda de una sola opción no se cuenta: «0 of 1 right» es una forma rara de decir
        que te equivocaste. Las de varias sí, porque ahí el número es la información.
      */}
      <Feedback ok={perfect}>
        <strong>
          {!multiple
            ? (perfect ? 'That is the one.' : 'Not that one.')
            : perfect
              ? 'All of them, and nothing else.'
              : `${hits} of ${rights.length} right${misses > 0 ? `, and ${misses} that would not hold` : ''}.`}
        </strong>
        <p>Read the ones you did not choose as well: the reason a decision fails is the part worth remembering.</p>
      </Feedback>
      <div className={styles.workshopActions}>
        <button type="button" className={styles.secondaryButton} onClick={() => { setChosen([]); setRevealed(false); }}>
          <RotateCcw size={15} /> Try it again
        </button>
      </div>
    </>}
  </div>;
}

export default function EssayTypePathClient({ type, faqs }: { type: EssayTypeId; faqs: Faq[] }) {
  const path = useMemo(() => pathFor(type), [type]);
  const exercise = GUIDED_EXERCISES[type];

  return <div className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
      <span>/</span>
      <span>{path.shortLabel}</span>
    </nav>

    <header className={styles.hero} lang="en">
      <p className={styles.kicker}>One question type, start to finish</p>
      <h1>{path.label}</h1>
      {/*
        El lead NO repite `mustAnswer`: eso ya se lee entero en el panel de abajo, y decirlo
        dos veces en la misma pantalla hace que la segunda no se lea.
      */}
      <p className={styles.heroLead}>
        The whole Task 2 path, filtered to this one question type: how to read the prompt, what each of the
        four paragraphs has to do, the connectors it leans on, and a finished essay at the end. Every step
        links to its full unit if you want to drill it.
      </p>
      <div className={styles.factGrid}>
        <div className={styles.fact}><strong>{path.steps.length + 2} steps</strong><span>from reading the prompt to the finished essay</span></div>
        <div className={styles.fact}><strong>4 paragraphs</strong><span>each with a job that changes by question type</span></div>
        <div className={styles.fact}><strong>{path.model ? `${path.model.words} words` : '250+ words'}</strong><span>in the model essay at the end</span></div>
        <div className={styles.fact}><strong>{path.sentenceTypes.length} sentence types</strong><span>{path.sentenceTypes.join(' · ')}</span></div>
      </div>
    </header>

    {/*
      El enunciado del hilo, UNA vez y arriba del todo. Antes cada paso enseñaba su propio
      ejemplo, que eran enunciados distintos: se leía el enunciado A y justo debajo la
      introducción del B. De ahí «no entiendo cuál es la transición».
    */}
    <section className={styles.section} id="prompt" lang="en">
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>The prompt</p>
        <h2>One prompt, followed from reading it to having it written</h2>
        <p>
          Everything below answers this. The highlighted words are the instruction — the part that decides
          the shape of the whole essay, and the part most people skim.
        </p>
      </div>
      <div className={styles.promptCard}>
        <span>IELTS-style prompt</span>
        <PromptSplit prompt={path.thread.prompt} />
      </div>
    </section>

    <section className={styles.section} lang="en">
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>How you recognise it</p>
        <h2>The instruction, and the one mistake that costs most</h2>
      </div>
      <article className={styles.typePanel}>
        <div className={styles.typeIntro}>
          <div>
            <p className={styles.signal}><strong>Instruction signal: </strong>{path.signal}</p>
            <div className={styles.strategyList}><p><strong>What it must answer: </strong>{path.mustAnswer}</p></div>
          </div>
          <p className={styles.trap}><strong>Most common misread</strong><br />{path.trap}</p>
        </div>
      </article>
      <Task2OfficialReviewBlock
        focus={`Writing a complete ${path.shortLabel.toLowerCase()} answer, from reading the prompt to the finished essay.`}
        officialFormat="IELTS Academic Writing Task 2 asks for an essay of at least 250 words in response to a question. The five question families are WeLearn teaching categories, not official IELTS names."
        welearnStrategy="This page collects the steps of the full course filtered to one question type, so that a student who only needs this one can follow the whole path in order."
        answerCheck="Compare your finished essay with the model at the end: same prompt, same four paragraphs, and each paragraph doing the job named above it."
      />
    </section>

    {/* Paso 1 · Leer el enunciado — sale del mapa de analisis-pregunta. */}
    <section className={styles.section} id="reading" lang="en">
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>Step 1</p>
        <h2>Read the prompt before you plan anything</h2>
        <p>
          Six questions you put to the prompt, in this order. They are the same six for every Task 2 prompt
          you will ever see — that is what makes them worth learning. Answer each one before you open it.
        </p>
      </div>
      <article className={styles.examplePanel}>
        {!path.reading.onThread && <p className={styles.mistakeNote}>
          <strong>Heads up: </strong>the prompt-analysis unit does not cover the prompt above yet, so this map
          is of a different one. The five decisions are the same; the answers are not.
        </p>}
        {!path.reading.onThread && <div className={styles.promptCard}>
          <span>This map is of this prompt</span><PromptSplit prompt={path.reading.prompt} />
        </div>}
        {/*
          Cada fila enseña la PREGUNTA y dónde se mira; la respuesta va plegada.

          David: «no explica cómo llegar a esto, cómo llego a sacar el topic». La versión
          anterior enseñaba las seis respuestas ya resueltas, y ver el resultado de un análisis
          no enseña a analizar. Con la respuesta a la vista, además, nadie intenta sacarla.
        */}
        <div className={styles.readingMethod}>
          {READING_METHOD.map((step, index) => {
            const answer = ANSWER_OF[step.key](path);
            return <div key={step.key} className={styles.readingStep}>
              <p className={styles.readingAsk}>
                <span>{index + 1}</span>
                <strong>{step.label} — {step.ask}</strong>
              </p>
              <p className={styles.readingWhere}>{step.where}</p>
              <details className={styles.readingAnswer}>
                <summary>{step.yours ? 'See one answer that works' : 'See the answer for this prompt'}</summary>
                <p>{answer}</p>
              </details>
            </div>;
          })}
        </div>

        <p className={styles.mistakeNote}>
          Rows 1 to 3 are in the prompt: two readers should get the same answer. Rows 4 to 6 are not — they
          are yours, and two good essays on this prompt can disagree completely.
        </p>
        <div className={styles.workshopActions}>
          <Link className={styles.secondaryButton} href="/practica/ielts/academic/writing/task2/analisis-pregunta">
            Practise reading prompts <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </section>

    {/* Pasos 2 a 5 · Los cuatro párrafos, cada uno con su ejemplo ya resuelto. */}
    {path.steps.map((step) => (
      <section key={step.key} id={step.key} className={styles.section} lang="en">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Step {step.step}</p>
          <h2>{step.title}</h2>
          {/* El encabezado no repite lo que dice la cadena de abajo. */}
          <p>What this paragraph has to do, and how you get there from the prompt above.</p>
        </div>
        <article className={`${styles.examplePanel} ${styles.workedExample}`}>
          <div className={styles.workedBadge}>Worked example</div>

          {/* Primero el razonamiento, después el resultado. Nunca al revés. */}
          <ReasonChain forces={step.forces} decision={step.decision} />

          {!step.onThread && <>
            <p className={styles.mistakeNote}>
              <strong>Heads up: </strong>this unit does not cover the prompt at the top of the page yet, so the
              worked example below answers a different one.
            </p>
            <div className={styles.promptCard}><span>This example answers</span><PromptSplit prompt={step.prompt} /></div>
          </>}

          <div className={styles.modelBlockGrid}>
            {step.blocks.map((block) => (
              <article key={block.label}>
                <strong>{block.label}</strong>
                {block.purpose && <small>{block.purpose}</small>}
                <p>{block.text}</p>
              </article>
            ))}
          </div>
          {step.whyItWorks && step.whyItWorks.length > 0 && <div className={styles.checkList}>
            <strong>Why this one answers the question</strong>
            {step.whyItWorks.map((line) => <p key={line}>{line}</p>)}
          </div>}
          {step.trap && <p className={styles.mistakeNote}><strong>Watch for: </strong>{step.trap}</p>}
          <div className={styles.workshopActions}>
            <Link className={styles.secondaryButton} href={step.href}>{step.hrefLabel} <ArrowRight size={16} /></Link>
          </div>
        </article>
      </section>
    ))}

    {/* Los conectores que ESTE tipo necesita, no los nueve. */}
    {path.linking.length > 0 && (
      <section className={styles.section} id="linking" lang="en">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Step 6</p>
          <h2>The connectors this type leans on</h2>
          <p>Every family is useful somewhere. These are the ones this question type needs most.</p>
        </div>
        <div className={styles.studyGrid}>
          {path.linking.map((family) => (
            <article key={family.slug} className={styles.studyCard}>
              <p className={styles.typeTag}>{family.label}</p>
              <p>{family.signals}</p>
              <Link href={`/practica/ielts/academic/writing/task2/linking-language/${family.slug}`}>
                Open this family <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    )}

    {/* El ejercicio propio de la ruta. */}
    {exercise && (
      <section className={`${styles.section} ${styles.practiceSection}`} id="practice" lang="en">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Now you decide</p>
          <h2>Two decisions, before a single sentence is written</h2>
          <p>Neither of these is about English. They are about answering the question you were actually asked.</p>
        </div>
        <div className={styles.enginePanel}>
          <div className={styles.exerciseBody}>
            <div className={styles.promptCard}><span>Practice prompt</span><p>{exercise.prompt}</p></div>
            <Round title={exercise.first.title} ask={exercise.first.ask} options={exercise.first.options} multiple={false} />
            <Round title={exercise.second.title} ask={exercise.second.ask} options={exercise.second.options} multiple />
          </div>
        </div>
      </section>
    )}

    {/* El ensayo terminado: los mismos párrafos, ya montados. */}
    {path.model && (
      <section className={styles.section} id="model" lang="en">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>The finished essay</p>
          <h2>The four blocks, assembled</h2>
          <p>
            {path.model.words} words on the prompt below. Each paragraph is labelled with the job it does — the
            same jobs you just read, in the same order.
          </p>
        </div>
        <article className={styles.examplePanel}>
          <div className={styles.promptCard}><span>{path.model.title}</span><PromptSplit prompt={path.model.prompt} /></div>
          <div className={styles.modelBlockGrid}>
            {path.model.paragraphs.map((paragraph) => (
              <article key={paragraph.label}>
                <strong>{paragraph.label}</strong>
                <p>{paragraph.text}</p>
                <small>{paragraph.job}</small>
              </article>
            ))}
          </div>
          <div className={styles.workshopActions}>
            <Link className={styles.secondaryButton} href="/practica/ielts/academic/writing/task2/tarea-completa">
              Write one against the clock <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </section>
    )}

    {/*
      El FAQ se queda en español a propósito: responde a lo que un estudiante colombiano
      escribe en Google y alimenta el resultado enriquecido. El contenido de IELTS, no.
    */}
    {faqs.length > 0 && (
      <section className={styles.section} id="faq">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Preguntas frecuentes</p>
          <h2>Lo que se pregunta sobre este tipo de ensayo</h2>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    )}

    <div className={styles.nextLinks}>
      <Link href="/practica/ielts/academic/writing/task2/tipo-ensayo">Essay type</Link>
      <Link href="/practica/ielts/academic/writing/task2/parrafos-cuerpo">Body paragraphs</Link>
      <Link href="/practica/ielts/academic/writing/task2/tarea-completa">Full Task 2</Link>
    </div>
  </div></div>;
}
