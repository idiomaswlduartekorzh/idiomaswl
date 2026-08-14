'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, RotateCcw } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import { BANK_BY_FAMILY, TASK2_PROMPT_BANK, type BankPrompt } from './task2-prompt-bank';
import styles from '../introduccion/page.module.css';

/**
 * Tarea Completa: elegir enunciado, planificar, escribir contra reloj y comparar.
 *
 * ESTA PÁGINA SE VEÍA DE OTRO PRODUCTO
 *
 * Las otras seis unidades de Task 2 usan `introduccion/page.module.css` —el hero, las
 * secciones, las tarjetas de colores, la rejilla de opciones—. Esta llevaba estilos sueltos
 * escritos a mano, con sus propios colores y espaciados. David: «se ve desalineado con la IU
 * del task 2, se ve feo». Cuando la reescribí mantuve su aspecto viejo por no cambiar el
 * diseño sin permiso, y fue un error: su aspecto viejo era justo el que desentonaba.
 *
 * Ahora usa las mismas piezas que la conclusión y la revisión final. El recorrido —elegir,
 * planificar, escribir, revisar, comparar— no cambia; lo que cambia es que se ve como el
 * resto del curso.
 *
 * LO DEMÁS QUE SE ARREGLÓ AQUÍ, TODO MEDIDO ANTES DE TOCAR NADA
 *
 * 1. **Cuatro enunciados**, de cinco familias. Faltaba ventajas-desventajas entera. Ahora
 *    son 25, con su ensayo modelo completo. Ver `task2-prompt-bank.ts`.
 * 2. **El corrector ortográfico estaba activo.** En el examen no hay subrayado rojo.
 * 3. **El temporizador se recreaba cada segundo** —`timeLeft` estaba en las dependencias del
 *    efecto—, así que el reloj se retrasaba. Ahora cuenta contra una hora límite.
 * 4. **El botón de terminar no existía por debajo de 200 palabras**, y para pasar de la
 *    revisión había que marcar las ocho casillas de un checklist que pedía honestidad.
 * 5. **«Band estimado»** parecía una nota del ensayo. Es una autoevaluación y lo dice.
 * 6. **El plan desaparecía al empezar a escribir.** David: «¿de qué sirve escribir los
 *    apuntes al inicio si luego no se ven cuando se está escribiendo?». Ahora se queda.
 */

type Phase = 'select' | 'plan' | 'write' | 'review' | 'model';

const TOTAL_SECONDS = 40 * 60;
const WARN_SECONDS = 5 * 60;
const MIN_WORDS = 250;

/** Lo que se revisa en cualquier ensayo, en el orden en que conviene revisarlo. */
const GENERAL_CHECKS = [
  'The introduction reframes the prompt in different words and states my answer.',
  'Each body paragraph has one clear job and develops it with enough explanation or illustration for this prompt.',
  'The conclusion restates my answer with new wording and adds no new argument.',
  'I wrote at least 250 words, and every paragraph is developed enough to perform its job.',
];

const CRITERIA = [
  { code: 'TR', name: 'Task Response', desc: 'Did I answer every part of the prompt, with a position the reader can find?' },
  { code: 'CC', name: 'Coherence and Cohesion', desc: 'Does the argument progress, and do the paragraphs and linkers carry it?' },
  { code: 'LR', name: 'Lexical Resource', desc: 'Is the vocabulary varied and precise, or am I repeating the prompt?' },
  { code: 'GRA', name: 'Grammatical Range and Accuracy', desc: 'Did I use a range of structures, and how often do errors interrupt meaning?' },
];

const PLAN_FIELDS = [
  { key: 'position', label: 'My answer, in one sentence', ph: 'I largely agree that…' },
  { key: 'b1', label: 'What Body 1 will do', ph: 'Body 1 argues that…' },
  { key: 'b2', label: 'What Body 2 will do', ph: 'Body 2 adds / concedes that…' },
  { key: 'conc', label: 'How the conclusion will close', ph: 'Restate the answer using…' },
] as const;

/** Los cuatro párrafos, con el mismo color que en Body 1 y en la conclusión. */
const PARAGRAPH_TONE: Record<string, string> = {
  Introduction: styles.claim, 'Body 1': styles.development, 'Body 2': styles.contrast, Conclusion: styles.link,
};

const wc = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

/** Sin corrector, sin autocorrección, sin mayúscula automática: como el examen. */
const noAssist = { spellCheck: false, autoCorrect: 'off', autoCapitalize: 'off', autoComplete: 'off' } as const;

/**
 * El armazón de la página, DEFINIDO FUERA del componente.
 *
 * Estaba dentro, como `const Shell = ({children}) => …`. Eso crea un tipo de componente
 * nuevo en cada render, así que React desmontaba y volvía a montar toda la página en cada
 * pulsación de tecla: el cursor se perdía y la vista pegaba un salto. David lo describió
 * como «al escribir hay un scroll raro», y era exactamente eso.
 */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className={styles.page}><div className={styles.shell}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link>
        <span>/</span><span>Complete Essay</span>
      </nav>
      {children}
    </div></div>
  );
}

function PromptCard({ item }: { item: BankPrompt }) {
  return (
    <div className={styles.promptCard}>
      <span>{item.familyLabel} · IELTS-style prompt</span>
      <p>{item.prompt}</p>
    </div>
  );
}

export default function TareaCompletaTask2Client() {
  const [phase, setPhase] = useState<Phase>('select');
  const [family, setFamily] = useState<string>('all');
  const [promptId, setPromptId] = useState<string | null>(null);
  const [plan, setPlan] = useState<Record<string, string>>({});
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [running, setRunning] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [bands, setBands] = useState<Record<string, number>>({});
  const remaining = useRef(TOTAL_SECONDS);

  /**
   * Un solo intervalo por arranque, contando contra una hora límite.
   * Antes las dependencias eran `[running, timeLeft, phase]`: el reloj se rehacía en cada
   * tic y el retraso de cada render se sumaba al siguiente segundo.
   */
  useEffect(() => {
    if (!running) return;
    const deadline = Date.now() + remaining.current * 1000;
    const id = setInterval(() => {
      const left = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      remaining.current = left;
      setTimeLeft(left);
      // El salto de fase va aquí, disparado por el reloj, no en un efecto que observe
      // `timeLeft`: eso sería un setState en cuerpo de efecto y una cascada de renders.
      if (left === 0) {
        setRunning(false);
        setPhase((current) => (current === 'write' ? 'review' : current));
      }
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  const p: BankPrompt | null = useMemo(() => TASK2_PROMPT_BANK.find((item) => item.id === promptId) ?? null, [promptId]);
  const visible = useMemo(() => family === 'all' ? TASK2_PROMPT_BANK : TASK2_PROMPT_BANK.filter((item) => item.essayType === family), [family]);
  const count = wc(text);
  const timerTone = timeLeft > 600 ? styles.examTimerCalm : timeLeft > WARN_SECONDS ? styles.examTimerNear : styles.examTimerLow;
  const allChecks = useMemo(() => [...GENERAL_CHECKS, ...(p?.watchFor ?? [])], [p]);
  const ticked = allChecks.filter((item) => checks[item]).length;
  const planWritten = PLAN_FIELDS.filter((field) => (plan[field.key] ?? '').trim());

  function start(id: string) {
    setPromptId(id); setPlan({}); setText(''); setChecks({}); setBands({});
    remaining.current = TOTAL_SECONDS; setTimeLeft(TOTAL_SECONDS); setRunning(false);
    setPhase('plan');
  }

  if (phase === 'select') return (
    <Shell>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Task 2 · Build the essay · Step 7</p>
        <h1>Write one complete IELTS Task 2 essay under time</h1>
        <p className={styles.heroLead}>
          Choose a prompt, plan it in five minutes, write it against the clock, and only then read it
          against a complete model answer. These are the same prompts you practised paragraph by
          paragraph in the earlier steps.
        </p>
        <div className={styles.factGrid}>
          <div className={styles.fact}><strong>{TASK2_PROMPT_BANK.length} prompts</strong><span>five per question family</span></div>
          <div className={styles.fact}><strong>40 minutes</strong><span>the time the task is designed for</span></div>
          <div className={styles.fact}><strong>250+ words</strong><span>every model answer clears the minimum</span></div>
          <div className={styles.fact}><strong>No auto-band</strong><span>the page never reads your text</span></div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Official format and WeLearn strategy</p>
          <h2>One complete response, written once, compared afterwards</h2>
        </div>
        <Task2OfficialReviewBlock
          focus="Plan, write and review one complete essay under time."
          officialFormat="IELTS Academic Writing Task 2 is designed to take about 40 minutes and requires at least 250 words in response to a single prompt."
          welearnStrategy="WeLearn runs the whole flow: choose a prompt, plan it in five minutes, write against the clock, review your own text, and only then open the model."
          answerCheck="Nothing here is marked automatically. A free text cannot be scored without being read, so the model is for comparison, not for grading."
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Choose your prompt</p>
          <h2>Pick a question family, then a prompt</h2>
          <p>Each one carries a complete model answer you will read after writing your own.</p>
        </div>
        <div className={styles.typeTabs} role="tablist">
          {[{ id: 'all', label: `All ${TASK2_PROMPT_BANK.length}` }, ...BANK_BY_FAMILY.map((f) => ({ id: f.id, label: `${f.label} (${f.prompts.length})` }))].map((tab) => (
            <button key={tab.id} type="button" role="tab" aria-selected={family === tab.id}
              className={`${styles.typeTab} ${family === tab.id ? styles.typeTabActive : ''}`}
              onClick={() => setFamily(tab.id)}>{tab.label}</button>
          ))}
        </div>
        <div className={styles.promptChoiceGrid}>
          {visible.map((item) => (
            <button key={item.id} type="button" className={styles.promptChoice} onClick={() => start(item.id)}>
              <strong>{item.familyLabel} · {item.title}</strong>
              <p>{item.prompt}</p>
              <small>Model answer: {item.modelWords} words</small>
            </button>
          ))}
        </div>
      </section>

      <nav className={styles.nextLinks}>
        <Link href="/practica/ielts/academic/writing/task2/revision-final"><ArrowLeft size={16} /> Final review practice</Link>
        <Link href="/practica/ielts/academic/writing/task2">Task 2 architecture <ArrowRight size={16} /></Link>
      </nav>
    </Shell>
  );

  if (!p) return null;

  if (phase === 'plan') return (
    <Shell>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Step 1 of 4 · Plan it</p>
        <h1>Decide the shape before the clock starts</h1>
        <p className={styles.heroLead}>
          Five minutes is enough. Nothing in these boxes is checked or scored — the point is that you
          are not inventing the structure while the clock runs. Your plan stays visible while you write.
        </p>
      </header>
      <section className={styles.section}>
        <PromptCard item={p} />
        <p className={styles.paragraphJob}><strong>Instruction pattern:</strong> {p.signal}</p>
        <div className={styles.guidedWorkshop}>
          <div className={styles.workshopHeader}>
            <div><span>Planning</span><h3>Four decisions, in your own words</h3></div>
            <button type="button" className={styles.iconButton} onClick={() => setPlan({})} title="Clear the plan" aria-label="Clear the plan"><RotateCcw size={18} /></button>
          </div>
          <div className={styles.planGrid}>
            {PLAN_FIELDS.map((field) => (
              <label key={field.key} className={styles.guidedField}>
                <strong>{field.label}</strong><span>{field.ph}</span>
                <textarea rows={2} value={plan[field.key] ?? ''} {...noAssist}
                  onChange={(event) => setPlan((current) => ({ ...current, [field.key]: event.target.value }))} />
              </label>
            ))}
          </div>
          <div className={styles.workshopActions}>
            <button type="button" onClick={() => { setPhase('write'); setRunning(true); }}>Start writing — 40 minutes</button>
          </div>
        </div>
      </section>
    </Shell>
  );

  if (phase === 'write') return (
    <Shell>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Step 2 of 4 · Write it</p>
        <div className={styles.timerRow}>
          <span className={`${styles.examTimer} ${timerTone}`}>{fmtTime(timeLeft)}</span>
          <span>{count} words {count < MIN_WORDS ? `· ${MIN_WORDS - count} to reach the minimum` : '· minimum reached'}</span>
          <button type="button" className={styles.secondaryButton} onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Resume'}</button>
        </div>
      </header>

      <section className={styles.section}>
        <PromptCard item={p} />

        {/* El plan se queda a la vista mientras se escribe. Antes desaparecía al pulsar
            «Start writing», así que se planificaba para nada o se recordaba de memoria. */}
        {planWritten.length > 0 && (
          <details open className={styles.planRecall}>
            <summary>Your plan</summary>
            {planWritten.map((field) => (
              <p key={field.key}><strong>{field.label}:</strong> {plan[field.key]}</p>
            ))}
          </details>
        )}

        {running && timeLeft <= WARN_SECONDS && timeLeft > 0 && (
          <p className={styles.trap}>
            <strong>Five minutes left</strong><br />
            Stop developing new ideas. Finish the paragraph you are in, then write the conclusion.
          </p>
        )}

        <textarea className={styles.essayWriter} rows={14} value={text} {...noAssist}
          aria-label="Your complete essay"
          onChange={(event) => setText(event.target.value)}
          placeholder="Introduction · Body 1 · Body 2 · Conclusion" />

        <div className={styles.workshopActions}>
          <button type="button" className={styles.secondaryButton} onClick={() => setPhase('plan')}><ArrowLeft size={16} /> Back to the plan</button>
          {/* Siempre presente. Antes desaparecía por debajo de 200 palabras y nada lo explicaba. */}
          <button type="button" onClick={() => { setRunning(false); setPhase('review'); }}>
            {count < MIN_WORDS ? `Finish anyway — ${count} words` : 'Finish and review'} <ArrowRight size={16} />
          </button>
        </div>
        {count < MIN_WORDS && (
          <p className={styles.wordMeter}>
            Task 2 asks for at least {MIN_WORDS} words. You can stop early, but a short answer loses marks
            on Task Response before anything else is even read.
          </p>
        )}
      </section>
    </Shell>
  );

  if (phase === 'review') return (
    <Shell>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Step 3 of 4 · Read your own text first</p>
        <h1>What to look for before you open the model</h1>
        <p className={styles.heroLead}>
          The last three items are the mistakes this exact prompt tends to produce. Tick what is true of
          your text. Nothing is blocked by the result — an unticked box is information, not a penalty.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.reviewGrid}>
          {allChecks.map((item, index) => (
            <button key={item} type="button"
              className={`${styles.option} ${checks[item] ? styles.correct : ''}`}
              onClick={() => setChecks((c) => ({ ...c, [item]: !c[item] }))}>
              <span>{checks[item] ? '✓' : '○'}</span>
              {index >= GENERAL_CHECKS.length ? <><em>This prompt in particular: </em>{item}</> : item}
            </button>
          ))}
        </div>
        <p className={styles.wordMeter}>{ticked} of {allChecks.length} ticked.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Your own estimate</p>
          <h2>What would you give yourself, criterion by criterion?</h2>
          <p>
            IELTS weights these four equally. What you record here is <strong>your own judgement of your
            own text</strong>: this page never reads your essay, so it cannot and does not award a band.
            Comparing your estimate with the model is how you find out whether your judgement is calibrated.
          </p>
        </div>
        <div className={styles.reviewGrid}>
          {CRITERIA.map((c) => (
            <div key={c.code} className={styles.analysisCard}>
              <div className={styles.timerRow}>
                <div>
                  <strong>{c.code} — {c.name}</strong>
                  <p className={styles.wordMeter}>{c.desc}</p>
                </div>
                <div className={styles.bandRow}>
                  {[5, 6, 7, 8, 9].map((b) => (
                    <button key={b} type="button" aria-label={`${c.name}: ${b}`}
                      className={`${styles.bandButton} ${bands[c.code] === b ? styles.bandButtonOn : ''}`}
                      onClick={() => setBands((v) => ({ ...v, [c.code]: b }))}>{b}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {Object.keys(bands).length === 4 && (
          <p className={styles.paragraphJob}>
            <strong>Average of your four estimates: {(Object.values(bands).reduce((a, b) => a + b, 0) / 4).toFixed(1)}</strong>
            {' '}— this is your number, not a mark. Open the model and see whether you would still give it.
          </p>
        )}
        <div className={styles.workshopActions}>
          <button type="button" className={styles.secondaryButton} onClick={() => setPhase('write')}><ArrowLeft size={16} /> Back to my essay</button>
          <button type="button" onClick={() => setPhase('model')}><Eye size={17} /> Open the model answer</button>
        </div>
      </section>
    </Shell>
  );

  return (
    <Shell>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Step 4 of 4 · Compare</p>
        <h1>Model answer · {p.modelWords} words</h1>
        <p className={styles.heroLead}>
          Compare what each paragraph <em>does</em>, not the wording. Your sentences will be different;
          the jobs should not be.
        </p>
      </header>

      <section className={styles.section}>
        <PromptCard item={p} />
        <div className={styles.reviewGrid}>
          {p.model.map((paragraph) => (
            <article key={paragraph.label} className={`${styles.legoBlock} ${PARAGRAPH_TONE[paragraph.label]}`}>
              <strong>{paragraph.label}</strong>
              <p className={styles.comparisonNote}>Its job: {paragraph.job}</p>
              <p>{paragraph.text}</p>
            </article>
          ))}
        </div>

        {text.trim() && (
          <div className={styles.completeParagraph}>
            <strong>Your essay · {count} words</strong>
            <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
          </div>
        )}

        <div className={styles.workshopActions}>
          <button type="button" className={styles.secondaryButton} onClick={() => setPhase('review')}><ArrowLeft size={16} /> Back to the review</button>
          <button type="button" onClick={() => start(p.id)}><RotateCcw size={16} /> Write this one again</button>
        </div>
      </section>

      <nav className={styles.nextLinks}>
        <Link href="/practica/ielts/academic/writing/task2/revision-final"><CheckCircle2 size={18} /> Final review practice <ArrowRight size={16} /></Link>
      </nav>
    </Shell>
  );
}
