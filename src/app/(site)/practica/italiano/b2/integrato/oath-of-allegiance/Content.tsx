'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, CheckCircle2, Headphones, PenLine, RotateCcw } from 'lucide-react';

const COLOR = '#009246';
const BLUE = '#0369a1';
const GREEN = '#059669';
const RED = '#dc2626';
const AMBER = '#d97706';

type Phase = 'lettura' | 'ascolto' | 'domande' | 'scrittura' | 'revisione';
type Section = 'Reading' | 'Listening';

interface Question {
  section: Section;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

const AUDIO_SRC = '/audio/italiano/b2/oath-of-allegiance.m4a';

const READING_TEXT = `Quando una persona acquisisce la cittadinanza di un altro Paese attraverso la naturalizzazione, in molti Stati è tenuta a prestare un giuramento di fedeltà. Negli Stati Uniti, ad esempio, il nuovo cittadino pronuncia l'Oath of Allegiance, con il quale dichiara di sostenere e difendere la Costituzione degli Stati Uniti e di assumere gli obblighi previsti dalla cittadinanza americana. In Italia esiste un procedimento simile, noto come Giuramento di fedeltà alla Repubblica Italiana, durante il quale il nuovo cittadino promette di essere fedele alla Repubblica e di osservare la Costituzione e le leggi dello Stato.

Secondo alcuni analisti e leader politici, questi giuramenti possono creare un problema quando una persona con doppia cittadinanza ricopre la più alta carica pubblica del proprio Paese. Essi sostengono che il Presidente della Repubblica o il Capo dello Stato dovrebbe possedere un'unica cittadinanza per evitare qualsiasi dubbio sulla sua lealtà.

I sostenitori di questa posizione affermano che potrebbero verificarsi conflitti di interesse durante crisi diplomatiche, negoziati internazionali o decisioni riguardanti la sicurezza nazionale. Anche se tali conflitti non si verificano nella pratica, essi ritengono che la sola possibilità possa compromettere la fiducia dei cittadini nelle istituzioni.

Inoltre, questi critici sostengono che un giuramento di fedeltà non rappresenta soltanto una cerimonia simbolica, ma un impegno morale e giuridico assunto volontariamente. Per questo motivo ritengono che chi aspira a guidare uno Stato dovrebbe evitare qualsiasi situazione che possa generare dubbi sulla propria esclusiva fedeltà al Paese che governa.`;

const TRANSCRIPT = `Molti degli argomenti appena presentati appaiono convincenti a prima vista. Tuttavia, numerosi costituzionalisti ritengono che essi confondano il valore simbolico del giuramento con i suoi effetti giuridici reali.

Innanzitutto, il giuramento prestato durante la naturalizzazione non crea un rapporto di subordinazione politica permanente verso un altro Stato. Esso serve principalmente a completare il processo di acquisizione della cittadinanza e non attribuisce al nuovo cittadino alcun obbligo di favorire gli interessi del Paese che lo ha naturalizzato.

In secondo luogo, molti ordinamenti giuridici riconoscono la doppia cittadinanza senza considerarla incompatibile con l'esercizio di importanti funzioni pubbliche. L'eventuale esistenza di conflitti di interesse viene affrontata attraverso le leggi, i controlli istituzionali e i meccanismi di trasparenza, non attraverso la semplice esistenza di un secondo passaporto.

Infine, gli studiosi osservano che la lealtà di un leader politico non può essere valutata esclusivamente sulla base della sua cittadinanza. Le decisioni, il rispetto della Costituzione, l'indipendenza delle istituzioni e il comportamento durante l'esercizio del mandato rappresentano indicatori molto più affidabili dell'effettivo impegno verso il proprio Paese.

Per queste ragioni, molti esperti concludono che non esistono prove sufficienti per affermare che la doppia cittadinanza, di per sé, costituisca un rischio per la democrazia o per la sicurezza nazionale.`;

const QUESTIONS: Question[] = [
  {
    section: 'Reading',
    prompt: 'Perché alcune persone ritengono problematica la doppia cittadinanza di un Capo dello Stato?',
    options: ['Perché è vietata dal diritto internazionale.', 'Perché potrebbe creare dubbi sulla sua lealtà.', 'Perché impedisce di firmare trattati.', 'Perché rende nullo il giuramento nazionale.'],
    answer: 1,
    explanation: 'Il testo afferma che, secondo questi critici, il Capo dello Stato dovrebbe avere una sola cittadinanza per evitare dubbi sulla lealtà.',
  },
  {
    section: 'Reading',
    prompt: 'Secondo il testo, in quali situazioni potrebbero sorgere conflitti di interesse?',
    options: ['Durante campagne elettorali.', 'Durante emergenze economiche locali.', 'Durante crisi diplomatiche o questioni di sicurezza nazionale.', 'Durante le elezioni comunali.'],
    answer: 2,
    explanation: 'La risposta è indicata nel terzo paragrafo: crisi diplomatiche, negoziati internazionali e decisioni sulla sicurezza nazionale.',
  },
  {
    section: 'Reading',
    prompt: 'Che cosa rappresenta il giuramento, secondo i critici?',
    options: ['Una semplice formalità amministrativa.', 'Un documento privo di valore.', 'Un impegno morale e giuridico.', 'Un contratto commerciale.'],
    answer: 2,
    explanation: 'Nel testo i critici sostengono che il giuramento non sia solo simbolico, ma un impegno morale e giuridico assunto volontariamente.',
  },
  {
    section: 'Listening',
    prompt: "Secondo l'audio, qual è la funzione principale del giuramento di naturalizzazione?",
    options: ['Obbligare il cittadino a seguire la politica estera del nuovo Paese.', 'Completare il processo di acquisizione della cittadinanza.', "Consentire l'accesso ai servizi consolari.", 'Rinunciare automaticamente a tutte le altre cittadinanze.'],
    answer: 1,
    explanation: "L'audio precisa che il giuramento serve principalmente a completare il processo di acquisizione della cittadinanza.",
  },
  {
    section: 'Listening',
    prompt: 'Come vengono normalmente gestiti gli eventuali conflitti di interesse?',
    options: ['Revocando la cittadinanza.', 'Attraverso trattati internazionali.', 'Mediante leggi e controlli istituzionali.', 'Vietando ogni doppia cittadinanza.'],
    answer: 2,
    explanation: "L'audio parla di leggi, controlli istituzionali e meccanismi di trasparenza, non di divieti automatici.",
  },
  {
    section: 'Listening',
    prompt: "Secondo gli studiosi citati nell'audio, quale elemento dimostra meglio la lealtà di un leader?",
    options: ['Il numero di passaporti posseduti.', 'Il luogo di nascita.', "Il comportamento nell'esercizio delle proprie funzioni.", 'La lingua parlata in famiglia.'],
    answer: 2,
    explanation: "Gli studiosi citati nell'audio indicano le decisioni, il rispetto della Costituzione e il comportamento durante il mandato come indicatori più affidabili.",
  },
];

const PHASES: { id: Phase; label: string }[] = [
  { id: 'lettura', label: 'Lettura' },
  { id: 'ascolto', label: 'Ascolto' },
  { id: 'domande', label: 'Domande' },
  { id: 'scrittura', label: 'Scrittura' },
  { id: 'revisione', label: 'Revisione' },
];

const WRITING_PROMPT = 'La doppia cittadinanza dovrebbe impedire a una persona di diventare Capo dello Stato? Scrivi 160-200 parole in italiano. Presenta una tesi, almeno due argomenti e un controargomento.';

function countWords(text: string) {
  const matches = text.trim().match(/[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['’][A-Za-zÀ-ÖØ-öø-ÿ]+)?/g);
  return matches?.length ?? 0;
}

function includesAny(text: string, terms: string[]) {
  const lower = text.toLowerCase();
  return terms.some(term => lower.includes(term));
}

function countMatches(text: string, terms: string[]) {
  const lower = text.toLowerCase();
  return terms.filter(term => lower.includes(term)).length;
}

function PhaseRail({ phase }: { phase: Phase }) {
  const currentIndex = PHASES.findIndex(p => p.id === phase);

  return (
    <div style={{ display: 'flex', gap: '0.4rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
      {PHASES.map((p, i) => {
        const active = p.id === phase;
        const done = i < currentIndex;
        return (
          <span key={p.id} style={{
            padding: '0.35rem 0.7rem',
            borderRadius: 999,
            background: active ? COLOR : done ? 'rgba(0,146,70,0.12)' : 'var(--line-soft)',
            color: active ? '#fff' : done ? COLOR : 'var(--muted)',
            fontSize: '0.72rem',
            fontFamily: 'var(--mono)',
            fontWeight: 800,
          }}>
            {p.label}
          </span>
        );
      })}
    </div>
  );
}

function SectionHeader({ icon, eyebrow, title, children }: { icon: ReactNode; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.35rem' }}>
      <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(0,146,70,0.1)', color: COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p className="eyebrow" style={{ marginBottom: '0.25rem' }}><span className="ink-line" />{eyebrow}</p>
        <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>{title}</h1>
        <div style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>{children}</div>
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  index,
  selected,
  reviewed,
  onAnswer,
}: {
  question: Question;
  index: number;
  selected?: number;
  reviewed: boolean;
  onAnswer: (answer: number) => void;
}) {
  const sectionColor = question.section === 'Reading' ? COLOR : BLUE;

  return (
    <div className="wl-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.66rem', fontWeight: 800, color: sectionColor, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {question.section} · Domanda {index + 1}
        </div>
        {reviewed && (
          <span style={{ fontSize: '0.68rem', color: selected === question.answer ? GREEN : RED, fontFamily: 'var(--mono)', fontWeight: 800 }}>
            {selected === question.answer ? 'CORRETTA' : 'DA RIVEDERE'}
          </span>
        )}
      </div>
      <p style={{ margin: '0 0 0.9rem', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.55 }}>{question.prompt}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrect = question.answer === optionIndex;
          let bg = 'var(--bg)';
          let border = '1.5px solid var(--line-soft)';
          let color = 'var(--ink)';

          if (reviewed && isCorrect) {
            bg = 'rgba(5,150,105,0.09)';
            border = '1.5px solid #059669';
            color = GREEN;
          }

          if (reviewed && isSelected && !isCorrect) {
            bg = 'rgba(220,38,38,0.08)';
            border = '1.5px solid #dc2626';
            color = RED;
          }

          if (!reviewed && isSelected) {
            bg = `${sectionColor}12`;
            border = `1.5px solid ${sectionColor}`;
            color = sectionColor;
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => onAnswer(optionIndex)}
              disabled={reviewed}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                width: '100%',
                textAlign: 'left',
                padding: '0.65rem 0.85rem',
                borderRadius: 10,
                background: bg,
                border,
                color,
                cursor: reviewed ? 'default' : 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                lineHeight: 1.45,
              }}
            >
              <span style={{ width: 24, height: 24, borderRadius: 7, background: reviewed && isCorrect ? GREEN : 'var(--bg-2)', color: reviewed && isCorrect ? '#fff' : 'var(--muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {reviewed && (
        <div style={{ marginTop: '0.75rem', padding: '0.7rem 0.85rem', borderRadius: 10, background: selected === question.answer ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.07)', color: 'var(--ink-2)', fontSize: '0.83rem', lineHeight: 1.6 }}>
          {selected === question.answer ? 'Ben fatto. ' : `Risposta corretta: ${String.fromCharCode(65 + question.answer)}. `}
          {question.explanation}
        </div>
      )}
    </div>
  );
}

export default function IntegratedOathExercise() {
  const [phase, setPhase] = useState<Phase>('lettura');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [writing, setWriting] = useState('');

  const answeredCount = Object.keys(answers).length;
  const correctCount = QUESTIONS.filter((question, index) => answers[index] === question.answer).length;
  const writingWords = countWords(writing);
  const allQuestionsAnswered = answeredCount === QUESTIONS.length;

  const writingReview = useMemo(() => {
    const connectors = countMatches(writing, ['tuttavia', 'inoltre', 'infine', 'per questo', 'per queste ragioni', 'secondo', 'anche se', 'da un lato', "dall'altro", 'al contrario']);
    const topicWords = countMatches(writing, ['cittadinanza', 'fedeltà', 'costituzione', 'conflitto', 'istituzioni', 'sicurezza', 'democrazia', 'giuramento', 'stato', 'leader']);
    return [
      {
        label: 'Extensión B2',
        ok: writingWords >= 120 && writingWords <= 230,
        detail: `${writingWords} parole. El objetivo ideal aquí es 160-200.`,
      },
      {
        label: 'Tesis explícita',
        ok: includesAny(writing, ['ritengo', 'penso', 'a mio avviso', 'a mio parere', 'secondo me', 'sostengo che']),
        detail: 'Incluye una postura clara, no solo una descripción del problema.',
      },
      {
        label: 'Conectores argumentativos',
        ok: connectors >= 2,
        detail: `Conectores detectados: ${connectors}. Puedes usar inoltre, tuttavia, infine, da un lato, dall'altro.`,
      },
      {
        label: 'Léxico del tema',
        ok: topicWords >= 3,
        detail: `Palabras clave detectadas: ${topicWords}. Busca precisión con cittadinanza, fedeltà, Costituzione, sicurezza, istituzioni.`,
      },
    ];
  }, [writing, writingWords]);

  function reset() {
    setAnswers({});
    setWriting('');
    setPhase('lettura');
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 880 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano</Link>
          <span>/</span>
          <Link href="/practica/italiano/b2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>B2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>Esercizio integrato</span>
        </div>

        <Link href="/practica/italiano/b2" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem' }}>
          <ArrowLeft size={15} />
          Italiano B2
        </Link>

        <div style={{ padding: '1.25rem 1.35rem', border: '1.5px solid rgba(0,146,70,0.22)', borderRadius: 18, background: 'linear-gradient(135deg, rgba(0,146,70,0.06) 0%, transparent 70%)', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.45rem' }}><span className="ink-line" />Italiano B2 · Esercizio integrato</p>
              <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.45rem', fontWeight: 700 }}>Oath of Allegiance — Giuramento di fedeltà</h1>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, maxWidth: 620, fontSize: '0.96rem' }}>
                Un ejercicio integrado: primero lees una postura, luego escuchas una respuesta crítica, respondes preguntas y escribes una opinión breve en italiano.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['B2', 'Reading', 'Listening', 'Writing'].map(tag => (
                <span key={tag} style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 800, color: COLOR, background: 'rgba(0,146,70,0.08)', border: '1px solid rgba(0,146,70,0.18)', borderRadius: 999, padding: '0.25rem 0.55rem' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <PhaseRail phase={phase} />

        {phase === 'lettura' && (
          <div>
            <SectionHeader icon={<BookOpen size={24} />} eyebrow="Reading" title="Leggi il testo">
              Lee el texto y fija la posición principal: algunos analistas consideran problemática la doble ciudadanía de un jefe de Estado.
            </SectionHeader>
            <div className="wl-card" style={{ padding: '1.45rem', borderLeft: `4px solid ${COLOR}`, marginBottom: '1.2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.8rem' }}>Testo di lettura</div>
              <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.85, fontSize: '0.96rem' }}>{READING_TEXT}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-sm" onClick={() => setPhase('ascolto')}>Continuar al audio →</button>
            </div>
          </div>
        )}

        {phase === 'ascolto' && (
          <div>
            <SectionHeader icon={<Headphones size={24} />} eyebrow="Listening" title="Ascolta la risposta">
              El audio presenta una postura distinta: varios constitucionalistas separan el valor simbólico del juramento de sus efectos jurídicos reales.
            </SectionHeader>
            <div className="wl-card" style={{ padding: '1.35rem', borderLeft: `4px solid ${BLUE}`, marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(3,105,161,0.1)', color: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Headphones size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--ink)' }}>Audio · Giuramento e doppia cittadinanza</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Comprensione orale B2</div>
                </div>
              </div>
              <audio controls src={AUDIO_SRC} style={{ width: '100%', display: 'block' }}>
                Tu navegador no soporta este audio.
              </audio>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPhase('lettura')}>← Volver al texto</button>
              <button type="button" className="btn btn-sm" onClick={() => setPhase('domande')}>Responder preguntas →</button>
            </div>
          </div>
        )}

        {phase === 'domande' && (
          <div>
            <SectionHeader icon={<CheckCircle2 size={24} />} eyebrow="Domande" title="Rispondi alle domande">
              Responde las tres preguntas de lectura y las tres de escucha. La retroalimentación completa aparece en la revisión.
            </SectionHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%`, height: '100%', background: COLOR, borderRadius: 999, transition: 'width 0.25s ease' }} />
              </div>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{answeredCount}/{QUESTIONS.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {QUESTIONS.map((question, index) => (
                <QuestionCard
                  key={question.prompt}
                  question={question}
                  index={index}
                  selected={answers[index]}
                  reviewed={false}
                  onAnswer={answer => setAnswers(prev => ({ ...prev, [index]: answer }))}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPhase('ascolto')}>← Volver al audio</button>
              <button type="button" className="btn btn-sm" onClick={() => setPhase('scrittura')} disabled={!allQuestionsAnswered} style={{ opacity: allQuestionsAnswered ? 1 : 0.55 }}>
                Ir a escritura →
              </button>
            </div>
          </div>
        )}

        {phase === 'scrittura' && (
          <div>
            <SectionHeader icon={<PenLine size={24} />} eyebrow="Writing" title="Scrivi la tua risposta">
              Usa el texto y el audio como fuentes. Puedes estar de acuerdo, en desacuerdo o proponer una posición intermedia.
            </SectionHeader>
            <div className="wl-card" style={{ padding: '1.35rem', borderLeft: `4px solid ${AMBER}`, marginBottom: '1.1rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: AMBER, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.55rem' }}>Prompt di scrittura</div>
              <p style={{ margin: '0 0 0.8rem', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.6 }}>{WRITING_PROMPT}</p>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {['tesi chiara', '2 argomenti', '1 controargomento', 'connettivi B2'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.7rem', color: AMBER, fontFamily: 'var(--mono)', fontWeight: 700, background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.18)', borderRadius: 999, padding: '0.2rem 0.5rem' }}>{tag}</span>
                ))}
              </div>
            </div>
            <textarea
              value={writing}
              onChange={event => setWriting(event.target.value)}
              rows={10}
              placeholder="Scrivi qui la tua risposta in italiano..."
              style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', minHeight: 230, border: '1.5px solid var(--line-soft)', borderRadius: 14, background: 'var(--bg)', color: 'var(--ink)', padding: '1rem 1.1rem', fontFamily: 'inherit', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '0.75rem' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: writingWords >= 120 ? GREEN : 'var(--muted)', fontWeight: 800 }}>{writingWords} parole</span>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPhase('domande')}>← Volver a preguntas</button>
                <button type="button" className="btn btn-sm" onClick={() => setPhase('revisione')} disabled={!writing.trim()} style={{ opacity: writing.trim() ? 1 : 0.55 }}>Revisar respuestas →</button>
              </div>
            </div>
          </div>
        )}

        {phase === 'revisione' && (
          <div>
            <SectionHeader icon={<CheckCircle2 size={24} />} eyebrow="Revisione" title="Risultato e feedback">
              Revisa tus respuestas, compara el audio con la transcripción y ajusta tu texto con la lista de control B2.
            </SectionHeader>

            <div className="wl-card" style={{ padding: '1.4rem', marginBottom: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.3rem', fontWeight: 900, color: COLOR, lineHeight: 1 }}>{correctCount}/{QUESTIONS.length}</div>
              <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.5 }}>
                {correctCount >= 5 ? 'Excelente comprensión integrada.' : correctCount >= 3 ? 'Buen avance. Revisa las explicaciones y vuelve al audio si hace falta.' : 'Conviene releer el texto y escuchar otra vez antes de repetir.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.2rem' }}>
              {QUESTIONS.map((question, index) => (
                <QuestionCard
                  key={question.prompt}
                  question={question}
                  index={index}
                  selected={answers[index]}
                  reviewed
                  onAnswer={() => {}}
                />
              ))}
            </div>

            <div className="wl-card" style={{ padding: '1.35rem', marginBottom: '1.2rem', borderLeft: `4px solid ${BLUE}` }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: BLUE, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Trascrizione audio</div>
              <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '0.9rem' }}>{TRANSCRIPT}</div>
            </div>

            <div className="wl-card" style={{ padding: '1.35rem', marginBottom: '1.2rem', borderLeft: `4px solid ${AMBER}` }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: AMBER, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Revisione scrittura</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                {writingReview.map(item => (
                  <div key={item.label} style={{ padding: '0.8rem 0.9rem', borderRadius: 12, background: item.ok ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${item.ok ? 'rgba(5,150,105,0.2)' : 'rgba(217,119,6,0.22)'}` }}>
                    <div style={{ color: item.ok ? GREEN : AMBER, fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.25rem' }}>{item.ok ? '✓ ' : '• '}{item.label}</div>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.8rem' }}>{item.detail}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: '0.9rem 1rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                <div style={{ color: 'var(--ink)', fontWeight: 800, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Modelo breve de estructura</div>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.86rem' }}>
                  A mio avviso, la doppia cittadinanza non dovrebbe essere automaticamente incompatibile con la carica di Capo dello Stato. Da un lato, è comprensibile che alcuni cittadini temano conflitti di interesse in materia di sicurezza nazionale. Tuttavia, la lealtà politica si misura soprattutto attraverso il rispetto della Costituzione, la trasparenza e il comportamento concreto durante il mandato. Per questo, invece di un divieto generale, sarebbe preferibile rafforzare i controlli istituzionali.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPhase('scrittura')}>← Editar escritura</button>
              <button type="button" className="btn btn-sm" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <RotateCcw size={15} />
                Repetir ejercicio
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
