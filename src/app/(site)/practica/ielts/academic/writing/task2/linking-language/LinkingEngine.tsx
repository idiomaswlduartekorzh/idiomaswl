'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { placeOption } from '@/lib/practica/shuffle-options';
import { ENGINE_LEVELS, acceptedFor, familyLabel, isAccepted, type EngineLevel } from './linking-engine-data';
import styles from '../introduccion/page.module.css';

/**
 * El WeLearn progressive engine de conectores: seis niveles, de reconocer a producir.
 *
 * TODO PASA DENTRO DEL PÁRRAFO
 *
 * La primera versión ponía tarjetas «Gap 1 / Gap 2» debajo del texto. David lo tumbó, y con
 * razón: «no hay necesidad de las tarjetas, se debe escribir sobre el mismo blank space» y
 * «debe ser mejor darle click al espacio en blanco y escoger la opción». Escribir un
 * conector es una decisión sobre un punto concreto de un texto; sacarla a un formulario
 * aparte rompe justamente lo que se está enseñando.
 *
 * Hay dos huecos y los seis niveles usan uno u otro, siempre dentro del texto:
 *
 *   `ChoiceGap` — se pulsa y las opciones salen ahí mismo.
 *   `WriteGap`  — es un `input` en el párrafo. No despliega nada: se teclea encima.
 *
 * El segundo también nació de una corrección: la primera versión abría un cuadrito con una
 * caja de texto dentro. «No despliegas nada al hacer click, se escribe ahí directamente».
 *
 * Y EN EL NIVEL 5 NADIE DICE CUÁLES ESTÁN MAL
 *
 * Los rotos salían en amarillo y el correcto en azul: «ya me estás diciendo cuáles están
 * mal, no tiene sentido». Ahora los cuatro conectores se ven idénticos y hay que leer.
 *
 * QUÉ SE CORRIGE SOLO Y POR QUÉ ESTÁ BIEN
 *
 * Cuatro niveles aceptan texto escrito, y aun así se corrigen. No choca con la regla de no
 * evaluar texto libre: la respuesta es UNA PALABRA de un conjunto cerrado, no una redacción.
 * Se acepta cualquier conector de la familia correcta —lo pidió David— porque exigir la
 * palabra exacta enseña a adivinar la palabra, no a entender la relación.
 */

type GapState = 'idle' | 'right' | 'wrong';

const toneFor = (state: GapState, neutral?: boolean) =>
  neutral ? styles.gapNeutral : state === 'right' ? styles.gapRight : state === 'wrong' ? styles.gapWrong : '';

/** Hueco de elegir: se pulsa y las opciones salen ahí mismo, sin encabezado ni adornos. */
function ChoiceGap({
  value, label, options, state, onPick, isOpen, onToggle,
}: {
  value: string;
  label: string;
  options: string[];
  state: GapState;
  onPick: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return <span className={styles.gapWrap}>
    <button type="button" onClick={onToggle} aria-label={label} aria-expanded={isOpen}
      className={`${styles.gapButton} ${toneFor(state)} ${isOpen ? styles.gapOpen : ''}`}>
      {value || '_______'}
    </button>
    {isOpen && <span className={styles.gapPopover}>
      {options.map((option) => (
        <button key={option} type="button" className={styles.gapChoice} onClick={() => onPick(option)}>{option}</button>
      ))}
    </span>}
  </span>;
}

/**
 * Hueco de escribir: un `input` metido en el párrafo. Se pulsa y se teclea, sin desplegar nada.
 *
 * @param neutral En el nivel 5 los conectores ya escritos se pintan todos iguales, para no
 *                delatar cuáles hay que cambiar.
 * @param onCommit Sólo el nivel 5 lo usa: ahí cada cambio se juzga al confirmarlo (Enter o al
 *                 salir del hueco). En los niveles 2 y 4 juzga el botón «Check».
 */
function WriteGap({
  value, label, state, neutral, onChange, onCommit,
}: {
  value: string;
  label: string;
  state: GapState;
  neutral?: boolean;
  onChange: (value: string) => void;
  onCommit?: () => void;
}) {
  return <input
    className={`${styles.gapButton} ${styles.gapField} ${toneFor(state, neutral)}`}
    value={value}
    aria-label={label}
    placeholder="_______"
    spellCheck={false}
    autoCorrect="off"
    autoCapitalize="off"
    // Crece con lo que se escribe: un ancho fijo obligaría a leer el conector a trozos.
    style={{ width: `${Math.max(value.length, 8) + 2}ch` }}
    onChange={(event) => onChange(event.target.value)}
    onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); onCommit?.(); } }}
    onBlur={() => onCommit?.()}
  />;
}

function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return <div className={`${styles.feedback} ${ok ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
    <CheckCircle2 size={20} /><div>{children}</div>
  </div>;
}

function Accepted({ family }: { family: string }) {
  return <p><strong>Any of these would have worked:</strong> {acceptedFor(family).slice(0, 5).join(', ')}.</p>;
}

/** Niveles 1 a 4: un párrafo con uno o dos huecos, y nada más. */
function GappedText({ item }: { item: Extract<EngineLevel, { kind: 'one-gap' | 'two-gaps' }> }) {
  const gaps = item.kind === 'one-gap' ? [{ family: item.family, best: item.best }] : item.gaps;
  const [values, setValues] = useState<string[]>(() => gaps.map(() => ''));
  const [open, setOpen] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const options = useMemo(() => {
    if (!item.withOptions) return undefined;
    const pool = item.kind === 'one-gap' ? [item.best, ...item.decoys] : [...item.gaps.map((g) => g.best), ...item.decoys];
    return placeOption(pool, 0, `linking-motor|${item.level}`, item.level).options;
  }, [item]);

  const results = gaps.map((gap, index) => isAccepted(values[index], gap.family));
  const filled = values.every((v) => v.trim());
  const allOk = results.every(Boolean);

  function pick(index: number, value: string) {
    setValues((current) => current.map((v, i) => (i === index ? value : v)));
    setOpen(null);
    setChecked(false);
  }

  const gapAt = (index: number) => {
    const label = gaps.length > 1 ? `Gap ${index + 1}` : 'The connector';
    const state: GapState = checked ? (results[index] ? 'right' : 'wrong') : 'idle';
    return options
      ? <ChoiceGap key={index} value={values[index]} label={label} options={options} state={state}
          isOpen={open === index} onToggle={() => setOpen(open === index ? null : index)}
          onPick={(value) => pick(index, value)} />
      : <WriteGap key={index} value={values[index]} label={label} state={state}
          onChange={(value) => pick(index, value)} />;
  };

  return <>
    <p className={styles.gappedText}>
      {item.kind === 'one-gap'
        ? <>{item.before} {gapAt(0)}, {item.after}</>
        : <>{item.parts[0]} {gapAt(0)}, {item.parts[1]} {gapAt(1)}, {item.parts[2]}</>}
    </p>

    <div className={styles.workshopActions}>
      <button type="button" className={styles.secondaryButton}
        onClick={() => { setValues(gaps.map(() => '')); setChecked(false); setOpen(null); }}><RotateCcw size={15} /> Reset</button>
      <button type="button" disabled={!filled} onClick={() => setChecked(true)}>
        {gaps.length > 1 ? 'Check both' : 'Check'}
      </button>
    </div>
    {!filled && <p className={styles.unlockHint}>
      {item.withOptions
        ? 'Click a blank and choose a connector.'
        : `Type a connector straight into ${gaps.length > 1 ? 'each blank' : 'the blank'}.`}
    </p>}

    {checked && <Feedback ok={allOk}>
      <strong>{allOk ? (gaps.length > 1 ? 'Both joins are right.' : 'That works.') : 'Not that relationship.'}</strong>
      {gaps.map((gap, index) => (
        <p key={gap.family + index}>
          {gaps.length > 1 && <strong>Gap {index + 1}: </strong>}
          {results[index]
            ? `“${values[index]}” describes that pair.`
            : `This one needs ${familyLabel(gap.family).toLowerCase()}.`}
        </p>
      ))}
      {!allOk && gaps.filter((_, i) => !results[i]).map((gap) => <Accepted key={gap.family} family={gap.family} />)}
    </Feedback>}
  </>;
}

/**
 * Nivel 5: todos los conectores iguales; hay que leer para saber cuál falla.
 *
 * Cada conector es un hueco escribible con la palabra que ya trae dentro: se borra y se
 * escribe otra encima. El juicio llega al confirmar (Enter o al salir del hueco), nunca a
 * mitad de tecleo, y sólo si de verdad se cambió algo.
 */
function Repair({ item }: { item: Extract<EngineLevel, { kind: 'repair' }> }) {
  const [values, setValues] = useState<string[]>(() => item.segments.map((segment) => segment.text));
  const [verdict, setVerdict] = useState<Record<number, boolean>>({});
  const [note, setNote] = useState<number | null>(null);

  const broken = item.segments.map((s, i) => (s.wrong ? i : -1)).filter((i) => i >= 0);
  const repaired = broken.filter((i) => verdict[i]);
  const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

  function commit(index: number) {
    const segment = item.segments[index];
    const written = values[index].trim();
    // Salir de un hueco sin haberlo tocado no es una propuesta: no se juzga nada.
    if (!written || same(written, segment.text)) {
      setVerdict((current) => { const next = { ...current }; delete next[index]; return next; });
      setNote((current) => (current === index ? null : current));
      return;
    }
    const ok = !!segment.family && segment.wrong === true && isAccepted(written, segment.family);
    setVerdict((current) => ({ ...current, [index]: ok }));
    setNote(index);
  }

  return <>
    <p className={styles.gappedText}>
      {item.segments.map((segment, index) => segment.family
        ? <WriteGap key={index} value={values[index]} label="Replace it with…"
            state={verdict[index] ? 'right' : 'idle'} neutral={!verdict[index]}
            onChange={(value) => setValues((current) => current.map((v, i) => (i === index ? value : v)))}
            onCommit={() => commit(index)} />
        : <span key={index}>{segment.text}</span>)}
    </p>

    {note !== null && verdict[note] === false && <Feedback ok={false}>
      <strong>{item.segments[note].wrong ? 'Not that one either.' : 'That one was already right.'}</strong>
      <p>
        {item.segments[note].wrong
          ? <>Read what comes before and after it. The relationship here is <strong>{familyLabel(item.segments[note].family!).toLowerCase()}</strong>.</>
          : <>“{item.segments[note].text}” already describes its pair correctly. Three of the connectors are wrong; this is not one of them.</>}
      </p>
      {item.segments[note].wrong && <Accepted family={item.segments[note].family!} />}
    </Feedback>}

    <p className={styles.wordMeter}>{repaired.length} of {broken.length} repaired.</p>
    {repaired.length === broken.length && <Feedback ok>
      <strong>All three replaced.</strong>
      <p>Read it again from the top. It now says what it was always trying to say, and nothing else changed.</p>
    </Feedback>}
  </>;
}

/** Nivel 6: se ordenan las oraciones y el párrafo resultante lleva su hueco dentro. */
function OrderCards({ item }: { item: Extract<EngineLevel, { kind: 'order' }> }) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const shuffled = useMemo(
    () => placeOption(item.cards.map((_, i) => i), 0, `linking-orden|${item.level}`, item.level + 3).options,
    [item],
  );
  const options = useMemo(
    () => placeOption([item.best, ...item.decoys], 0, `linking-motor|${item.level}`, item.level).options,
    [item],
  );
  const built = placed.length === item.cards.length;
  const rightOrder = built && placed.every((card, position) => item.cards[card].order === position);
  const ok = isAccepted(value, item.family);

  return <>
    {!built && <>
      <p className={styles.exerciseInstruction}>Click them in the order they belong.</p>
      <div className={styles.continuationGrid}>
        {shuffled.filter((i) => !placed.includes(i)).map((card) => (
          <button key={card} type="button" className={styles.option} onClick={() => setPlaced((c) => [...c, card])}>
            <span>{placed.length + 1}</span><div>{item.cards[card].text}</div>
          </button>
        ))}
      </div>
    </>}

    {built && !rightOrder && <Feedback ok={false}>
      <strong>That order does not build an argument.</strong>
      <p>The first sentence has to make the general claim; the others develop it. Start over and try a different order.</p>
    </Feedback>}

    {built && rightOrder && <>
      {/* Como en el nivel 5: el párrafo corrido, con su hueco dentro. */}
      <p className={styles.gappedText}>
        {placed.map((card, position) => <span key={card}>
          {item.cards[card].text}{' '}
          {position === item.gapAfter && <>
            <ChoiceGap value={value} label="The connector" options={options}
              state={checked ? (ok ? 'right' : 'wrong') : 'idle'}
              isOpen={open} onToggle={() => setOpen(!open)}
              onPick={(picked) => { setValue(picked); setOpen(false); setChecked(false); }} />, {' '}
          </>}
        </span>)}
      </p>
      <div className={styles.workshopActions}>
        <button type="button" disabled={!value} onClick={() => setChecked(true)}>Check the join</button>
      </div>
      {!value && <p className={styles.unlockHint}>Click the blank and choose the connector that joins those two sentences.</p>}
      {checked && <Feedback ok={ok}>
        <strong>{ok ? 'That is the join.' : 'That is a different relationship.'}</strong>
        <p>The last sentence limits the one before it, so the join has to be {familyLabel(item.family).toLowerCase()}.</p>
        {!ok && <Accepted family={item.family} />}
      </Feedback>}
    </>}

    <div className={styles.workshopActions}>
      <button type="button" className={styles.secondaryButton}
        onClick={() => { setPlaced([]); setValue(''); setChecked(false); setOpen(false); }}><RotateCcw size={15} /> Start over</button>
    </div>
  </>;
}

export default function LinkingEngine() {
  const [level, setLevel] = useState(0);
  const item = ENGINE_LEVELS[level];

  return <section id="engine" className={`${styles.section} ${styles.practiceSection}`}>
    <div className={styles.sectionHeading}>
      <p className={styles.kicker}>WeLearn progressive engine</p>
      <h2>Six levels, from choosing a connector to building the paragraph</h2>
      <p>
        No level tells you which family the answer belongs to — that is the point. Every blank sits inside
        the text: click it to pick from a list, or type straight into it. From level two onwards you write
        the connector yourself, and any connector from the right family counts.
      </p>
    </div>

    <div className={styles.levelTabs} aria-label="Engine levels">
      {ENGINE_LEVELS.map((entry, index) => (
        <button key={entry.level} type="button" className={index === level ? styles.levelActive : ''}
          onClick={() => setLevel(index)}>{entry.level} · {entry.title}</button>
      ))}
    </div>

    <div className={styles.enginePanel}>
      <div className={styles.engineHeader}>
        <div><h3>{item.title}</h3><p>Level {item.level} of {ENGINE_LEVELS.length}</p></div>
        <span>{item.level}/{ENGINE_LEVELS.length}</span>
      </div>
      <div className={styles.exerciseBody}>
        <p className={styles.exerciseInstruction}>{item.instruction}</p>
        {/* `key` por nivel: sin él, el estado del ejercicio anterior se queda pegado al siguiente. */}
        {(item.kind === 'one-gap' || item.kind === 'two-gaps') && <GappedText key={item.level} item={item} />}
        {item.kind === 'repair' && <Repair key={item.level} item={item} />}
        {item.kind === 'order' && <OrderCards key={item.level} item={item} />}
      </div>
      <div className={styles.engineNav}>
        <button type="button" onClick={() => setLevel((n) => Math.max(0, n - 1))} disabled={level === 0}><ArrowLeft size={16} /> Previous</button>
        <button type="button" onClick={() => setLevel((n) => Math.min(ENGINE_LEVELS.length - 1, n + 1))} disabled={level === ENGINE_LEVELS.length - 1}>Next <ArrowRight size={16} /></button>
      </div>
    </div>
  </section>;
}
