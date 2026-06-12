'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase =
  | 'intro'
  | 'narrator' | 'narrator-quiz'
  | 'dil'      | 'dil-quiz'
  | 'mil'      | 'mil-quiz'
  | 'final-quiz' | 'results';

interface Question {
  type: string;
  q: string;
  opts: string[];
  correct: number;
  explanation: string;
}

// ─── Questions ────────────────────────────────────────────────────────────────

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'The narrator describes the stroller as "luxury." What does this word choice suggest?',
    opts: [
      'She bought affordable, practical items',
      'She spent large amounts on premium, high-end products',
      'She preferred second-hand items for the baby',
      'She only bought items on sale',
    ],
    correct: 1,
    explanation: '"Luxury" signals expensive, premium-quality goods — indicating Linda spent far more than the average gift-giver would.',
  },
  {
    type: 'Inference',
    q: 'The narrator uses the word "Suddenly" when describing Linda\'s change in attitude. What does this imply?',
    opts: [
      'The change was gradual and long expected',
      'Linda always planned to reclaim the items eventually',
      'The shift happened quickly after one specific event: her daughter\'s pregnancy',
      'Emma personally asked Linda to request the items back',
    ],
    correct: 2,
    explanation: '"Suddenly" contrasts with three years of generosity, implying Linda\'s motivation changed the moment her own daughter became pregnant — not gradually.',
  },
  {
    type: 'Comprehension',
    q: 'What information did Linda\'s spreadsheet contain?',
    opts: [
      'A list of future purchases for the new baby',
      'A record of every expensive gift she had ever purchased',
      'A household budget for the family',
      'A legal contract between Linda and her son',
    ],
    correct: 1,
    explanation: 'The narrator states Linda arrived "carrying a spreadsheet listing every expensive gift she had ever purchased."',
  },
  {
    type: 'Critical Thinking',
    q: '"Everyone thought she was simply being generous." What does the word "simply" suggest?',
    opts: [
      'Linda was definitely generous with no hidden motives',
      'There may be more to Linda\'s generosity than it appeared at the time',
      'The family always knew Linda had conditions on her gifts',
      'Linda was openly trying to control the family',
    ],
    correct: 1,
    explanation: '"Simply" hints that appearances were deceiving — leaving open the possibility that Linda\'s generosity had conditions nobody noticed until now.',
  },
];

const DIL_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'Sarah compares Linda\'s visit to "an inventory check at a warehouse." What does this reveal?',
    opts: [
      'Metaphor — she means Linda physically moved her furniture',
      'Simile — she portrays Linda as cold and businesslike, treating gifts as recoverable stock',
      'Hyperbole — she is simply exaggerating for humour',
      'Personification — she gives the spreadsheet human qualities',
    ],
    correct: 1,
    explanation: 'This simile strips all warmth from Linda\'s visit — comparing it to a warehouse audit shows Sarah saw the interaction as transactional, not familial.',
  },
  {
    type: 'Inference',
    q: '"Who keeps receipts for baby gifts unless they think they\'re getting them back one day?" What does this rhetorical question imply?',
    opts: [
      'Sarah thinks everyone should keep all receipts',
      'Linda was simply very organised but nothing more',
      'The receipts are evidence Linda always intended to reclaim the gifts',
      'Sarah lost her own receipts and is projecting',
    ],
    correct: 2,
    explanation: 'A rhetorical question doesn\'t expect an answer — Sarah uses it to suggest Linda\'s receipts are proof of premeditation, not just good record-keeping.',
  },
  {
    type: 'Tone',
    q: 'How would you best describe the overall tone of Sarah\'s voice note?',
    opts: [
      'Calm and analytical',
      'Emotionally charged, indignant, and disbelieving',
      'Sad and regretful',
      'Formal and professional',
    ],
    correct: 1,
    explanation: '"I am still shaking," repeated one-word sentences ("A spreadsheet."), and sarcasm ("not a real-estate portfolio") all mark a tone of emotional indignation.',
  },
  {
    type: 'Comprehension',
    q: 'According to Sarah, what request from Linda WOULD have been acceptable?',
    opts: [
      'Bringing a detailed spreadsheet of all gifts',
      'Demanding the stroller and crib back immediately',
      'Asking whether Ethan had outgrown anything that could be passed on',
      'Sending a formal written request by mail',
    ],
    correct: 2,
    explanation: 'Sarah says: "if she\'d just asked whether we had anything Ethan had outgrown, I would\'ve happily helped." HOW Linda asked mattered as much as WHAT she asked.',
  },
  {
    type: 'Vocabulary',
    q: '"Ma\'am, that\'s your grandson, not a real-estate portfolio." What technique is Sarah using?',
    opts: [
      'A literal statement about Linda\'s real estate business',
      'Irony to highlight how Linda treats a family relationship like a financial investment',
      'A polite way to agree with Linda\'s perspective',
      'A direct quote from the spreadsheet',
    ],
    correct: 1,
    explanation: 'Using the vocabulary of finance ("portfolio") sarcastically mocks Linda\'s transactional approach to what should be an unconditional family relationship.',
  },
];

const MIL_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'Linda says items could "be passed down" to Emma\'s baby. What tradition does this phrase reference?',
    opts: [
      'Returning purchased goods to a store for a refund',
      'The family practice of handing possessions from one member to another across generations',
      'A formal legal inheritance process',
      'Donating items to charity',
    ],
    correct: 1,
    explanation: '"Passed down" invokes a familiar family tradition — not repayment. Linda frames her request as cultural practice, not a financial demand.',
  },
  {
    type: 'Comprehension',
    q: 'According to Linda, what specifically did she ask for — as opposed to what Sarah claims?',
    opts: [
      'Every single item on her list, returned immediately',
      'Only the college fund money',
      'A conversation about sharing some of the bigger items',
      'A formal written apology from Sarah',
    ],
    correct: 2,
    explanation: 'Linda says: "I never said I wanted every single thing back. I said maybe we could discuss sharing some of the bigger items." This directly contradicts Sarah\'s account.',
  },
  {
    type: 'Inference',
    q: '"What bothered me wasn\'t even the stuff. It was the attitude." What does this reveal about Linda\'s deeper concern?',
    opts: [
      'She is only pretending not to care about the items',
      'She feels emotionally disrespected and unappreciated despite years of generosity',
      'She wants Sarah removed from the family',
      'She regrets ever buying the gifts',
    ],
    correct: 1,
    explanation: 'By separating "the stuff" from "the attitude," Linda signals that the emotional wound — feeling dismissed after years of investment — matters more than the monetary value.',
  },
  {
    type: 'Tone',
    q: '"Excuse me for being organised" — what tone does this phrase convey?',
    opts: [
      'Genuine apology and remorse',
      'Sarcastic defensiveness — she doesn\'t think she did anything wrong',
      'Confusion about why anyone is upset',
      'Academic, formal register',
    ],
    correct: 1,
    explanation: '"Excuse me for being organised" is a non-apology: she defends her action while implying the criticism of the spreadsheet is absurd.',
  },
  {
    type: 'Vocabulary',
    q: '"Apparently I\'m the villain now." What does Linda\'s use of "villain" reveal?',
    opts: [
      'She fully agrees her behaviour was wrong',
      'She feels unjustly cast as the bad character in a story others are telling about her',
      'She is using technical legal language',
      'She is seeking sympathy through flattery',
    ],
    correct: 1,
    explanation: '"Villain" is a storytelling word, not a real-life term. Linda uses it to signal she feels she has been assigned a narrative role unfairly — she\'s a character in someone else\'s story.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Synthesis',
    q: 'Both Sarah and Linda agree on which of the following facts?',
    opts: [
      'Linda asked to permanently take back all items',
      'Sarah had already offered to share some items voluntarily',
      'Linda brought a spreadsheet to the meeting',
      'Emma personally requested the items from Linda',
    ],
    correct: 2,
    explanation: 'The spreadsheet is the one objective detail confirmed by both accounts. Everything else — intent, tone, scope — is contested.',
  },
  {
    type: 'Perspective',
    q: 'The narrator says Linda "asked for thousands of dollars\' worth of items back." Linda says she "suggested discussing sharing some items." This gap suggests:',
    opts: [
      'The narrator is biased against Linda',
      'There is a significant difference between Linda\'s stated intention and how her request was perceived',
      'Sarah invented most of the confrontation',
      'The narrator made a factual error',
    ],
    correct: 1,
    explanation: 'Intent vs. impact: Linda believed she was opening a conversation; Sarah (and the narrator) experienced it as a demand. This gap between intention and perception drives the entire conflict.',
  },
  {
    type: 'Critical Thinking',
    q: 'If you had to identify the ROOT cause of this conflict, which is most accurate?',
    opts: [
      'Linda\'s financial greed',
      'Sarah\'s selfishness and lack of gratitude',
      'No expectations were discussed when the gifts were originally given',
      'Emma\'s decision to have a baby',
    ],
    correct: 2,
    explanation: 'Were the items gifts or conditional loans? The failure to establish that boundary at the time — not greed or selfishness alone — is the structural cause of the dispute.',
  },
  {
    type: 'Inference',
    q: 'Sarah says Linda "genuinely seemed shocked" when refused. What does this reaction suggest about Linda?',
    opts: [
      'Linda was pretending to be surprised as a tactic',
      'Linda had genuinely not anticipated that Sarah would view her request as unreasonable',
      'Linda knew Sarah would refuse and was testing her',
      'Linda had never been refused anything in her life',
    ],
    correct: 1,
    explanation: 'Genuine shock reveals that Linda operated with a completely different set of assumptions — she didn\'t expect refusal because, in her own framework, her request seemed reasonable.',
  },
  {
    type: 'Vocabulary & Register',
    q: 'Linda refers to her son and daughter-in-law as "those kids." What does this word choice suggest?',
    opts: [
      'Her son and Sarah are literally young children',
      'Linda sees herself as the authority figure and them as less experienced people she helped',
      'Linda has forgotten their names',
      'It is a formal, affectionate term in English',
    ],
    correct: 1,
    explanation: '"Those kids" infantilises the couple — framing them as recipients of Linda\'s wisdom and money rather than equals. It subtly reinforces her sense of authority and entitlement.',
  },
];

const ALL_SECTIONS = [
  { key: 'narrator', questions: NARRATOR_QS },
  { key: 'dil',      questions: DIL_QS },
  { key: 'mil',      questions: MIL_QS },
  { key: 'final',    questions: FINAL_QS },
];

// ─── Audio Player ─────────────────────────────────────────────────────────────

function AudioPlayer({ src, label, color }: { src: string; label: string; color: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  function toggle() {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else         { ref.current.play();  setPlaying(true);  }
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  return (
    <div style={{
      background: `${color}0d`,
      border: `1.5px solid ${color}33`,
      borderRadius: 16,
      padding: '1.25rem 1.5rem',
    }}>
      <audio
        ref={ref}
        src={src}
        onTimeUpdate={() => setProgress(ref.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onEnded={() => { setPlaying(false); setProgress(0); }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={toggle}
          style={{
            width: 48, height: 48, borderRadius: '50%',
            background: color, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', color: '#fff', flexShrink: 0,
            boxShadow: `0 4px 16px ${color}44`,
          }}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color, marginBottom: '0.4rem', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>
            🎙 {label}
          </div>
          <div style={{ position: 'relative', height: 6, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden', cursor: 'pointer' }}
            onClick={e => {
              if (!ref.current || !duration) return;
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              ref.current.currentTime = ratio * duration;
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: duration ? `${(progress / duration) * 100}%` : '0%', background: color, borderRadius: 4, transition: 'width 0.1s linear' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.3rem', fontFamily: 'var(--mono)' }}>
            <span>{fmt(progress)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Quiz block ───────────────────────────────────────────────────────────────

function QuizBlock({
  questions, sectionKey, onComplete,
}: {
  questions: Question[];
  sectionKey: string;
  onComplete: (scores: boolean[]) => void;
}) {
  const [idx,     setIdx]     = useState(0);
  const [chosen,  setChosen]  = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);

  const q = questions[idx];
  const answered = chosen !== null;

  const COLORS: Record<string, string> = {
    narrator: '#6b7280', dil: '#0f3d8c', mil: '#7c3aed', final: '#059669',
  };
  const color = COLORS[sectionKey] ?? '#0f3d8c';

  function pick(i: number) {
    if (answered) return;
    setChosen(i);
    setResults(prev => [...prev, i === q.correct]);
  }

  function next() {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setChosen(null);
    } else {
      onComplete([...results]);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Progress */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {questions.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i < idx ? color : i === idx ? `${color}66` : 'var(--line-soft)',
          }} />
        ))}
      </div>

      {/* Question card */}
      <div style={{
        background: 'var(--bg-1)', border: `1.5px solid ${color}33`,
        borderRadius: 16, padding: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <span style={{
            fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.6rem',
            borderRadius: 6, background: `${color}18`, color, border: `1px solid ${color}33`,
            fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>{q.type}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            {idx + 1} / {questions.length}
          </span>
        </div>

        <p style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.55 }}>
          {q.q}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.correct;
            const isChosen  = chosen === i;
            let bg     = 'var(--bg)';
            let border = '1.5px solid var(--line-soft)';
            let clr    = 'var(--ink)';
            if (answered) {
              if (isCorrect)               { bg = 'rgba(5,150,105,0.08)';  border = '1.5px solid #059669'; clr = '#059669'; }
              else if (isChosen)           { bg = 'rgba(220,38,38,0.07)';  border = '1.5px solid #dc2626'; clr = '#dc2626'; }
            } else {
              if (isChosen)                { bg = `${color}0f`; border = `1.5px solid ${color}`; clr = color; }
            }
            return (
              <button key={i} onClick={() => pick(i)}
                style={{
                  textAlign: 'left', padding: '0.85rem 1rem', borderRadius: 12,
                  border, background: bg, color: clr, cursor: answered ? 'default' : 'pointer',
                  fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.45, fontWeight: 500,
                  transition: 'all 0.15s', display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                }}
              >
                <span style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                  border: `1.5px solid ${answered ? (isCorrect ? '#059669' : isChosen ? '#dc2626' : 'var(--line-soft)') : 'currentColor'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 800,
                  background: answered && isCorrect ? '#059669' : answered && isChosen ? '#dc2626' : 'transparent',
                  color: answered && (isCorrect || isChosen) ? '#fff' : 'currentColor',
                }}>
                  {answered && isCorrect ? '✓' : answered && isChosen ? '✗' : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div style={{
            marginTop: '1rem', padding: '0.9rem 1rem', borderRadius: 12,
            background: chosen === q.correct ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.06)',
            border: `1px solid ${chosen === q.correct ? '#05966933' : '#dc262633'}`,
          }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.6 }}>
              <strong style={{ color: chosen === q.correct ? '#059669' : '#dc2626' }}>
                {chosen === q.correct ? '✅ Correct' : '❌ Not quite'}
              </strong>
              {' — '}{q.explanation}
            </p>
          </div>
        )}
      </div>

      {answered && (
        <button onClick={next} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem' }}>
          {idx + 1 < questions.length ? 'Next question →' : 'Continue →'}
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function GrandmothersLedgerClient() {
  const [phase,   setPhase]   = useState<Phase>('intro');
  const [scores,  setScores]  = useState<Record<string, boolean[]>>({});
  const [dilDone, setDilDone] = useState(false);
  const [milDone, setMilDone] = useState(false);

  function saveScore(key: string, s: boolean[]) {
    setScores(prev => ({ ...prev, [key]: s }));
  }

  // ── Totals ────────────────────────────────────────────────────────────────
  const allScores  = Object.values(scores).flat();
  const totalRight = allScores.filter(Boolean).length;
  const totalQs    = NARRATOR_QS.length + DIL_QS.length + MIL_QS.length + FINAL_QS.length;
  const pct        = totalQs > 0 ? Math.round((totalRight / totalQs) * 100) : 0;
  const band       = pct >= 90 ? 'C1 · Advanced' : pct >= 75 ? 'B2 · Upper-Intermediate' : pct >= 55 ? 'B1 · Intermediate' : 'A2–B1 · Keep Practising';
  const bandColor  = pct >= 90 ? '#059669' : pct >= 75 ? '#0f3d8c' : pct >= 55 ? '#d97706' : '#dc2626';

  // ── Section colors ────────────────────────────────────────────────────────
  const C = { narrator: '#6b7280', dil: '#0f3d8c', mil: '#7c3aed', final: '#059669' };

  // ─────────────────────────────────────────────────────────────────────────
  // INTRO
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Link href="/practica" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '1.75rem' }}>
        ← Práctica
      </Link>

      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>
        <span className="ink-line" />🇬🇧 English Comprehension · B1–B2
      </p>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
        The Grandmother&apos;s Ledger
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem', lineHeight: 1.65 }}>
        A family dispute. Two versions. You decide who&apos;s right.
        Read the narrator&apos;s account, listen to both voice notes, and answer 19 comprehension questions covering vocabulary, inference, tone, and critical thinking.
      </p>

      {/* What you'll practise */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {[
          { icon: '📖', label: 'Reading', desc: 'Narrator text' },
          { icon: '🎙', label: 'Listening', desc: '2 voice notes' },
          { icon: '🔤', label: 'Vocabulary', desc: 'In-context meaning' },
          { icon: '🔍', label: 'Inference', desc: 'Read between the lines' },
          { icon: '🎭', label: 'Tone & register', desc: 'Author\'s intent' },
          { icon: '🧠', label: 'Critical thinking', desc: 'Multiple perspectives' },
        ].map(item => (
          <div key={item.label} style={{
            background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
            borderRadius: 14, padding: '1rem',
          }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{item.icon}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.15rem' }}>{item.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Structure preview */}
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Structure</p>
        {[
          { n: '01', label: 'Read the narrator', sub: '4 questions', color: C.narrator },
          { n: '02', label: 'Listen: Daughter-in-law', sub: '5 questions', color: C.dil },
          { n: '03', label: 'Listen: Mother-in-law', sub: '5 questions', color: C.mil },
          { n: '04', label: 'Overall comprehension', sub: '5 questions', color: C.final },
        ].map(step => (
          <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${step.color}18`, border: `1.5px solid ${step.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: step.color, fontFamily: 'var(--mono)', flexShrink: 0 }}>{step.n}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{step.label}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>{step.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setPhase('narrator')} className="btn" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
        Begin →
      </button>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // NARRATOR SECTION
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'narrator') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <button onClick={() => setPhase('intro')} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.82rem', cursor: 'pointer', marginBottom: '1.5rem', padding: 0 }}>← Back</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${C.narrator}18`, border: `2px solid ${C.narrator}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: C.narrator, fontFamily: 'var(--mono)', flexShrink: 0 }}>01</span>
        <div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Part 1 of 4 · Reading</p>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Narrator</h2>
        </div>
      </div>

      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.narrator}33`, borderRadius: 20, padding: '2rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: '0 0 0.35rem', fontSize: '0.68rem', fontWeight: 800, color: C.narrator, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>The Grandmother&apos;s Ledger</p>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--ink)' }}>
          <p>Three years ago, when baby Ethan was born, his grandmother Linda became the family&apos;s biggest spender.</p>
          <p>She bought nearly everything: a luxury stroller, a custom nursery set, expensive toys, and even started a college fund.</p>
          <p>Everyone thought she was simply being generous.</p>
          <p>Then Linda&apos;s daughter announced she was pregnant.</p>
          <p>Suddenly, Linda began making comments about how some of Ethan&apos;s gifts could be &quot;shared&quot; with the new baby.</p>
          <p>A few weeks later, she arrived at her son and daughter-in-law&apos;s house carrying a spreadsheet listing every expensive gift she had ever purchased.</p>
          <p>She asked for thousands of dollars&apos; worth of items back.</p>
          <p>The daughter-in-law refused.</p>
          <p style={{ margin: 0 }}>Now both women are telling very different versions of what happened.</p>
        </div>
      </div>

      <div style={{ background: 'rgba(107,114,128,0.06)', border: '1px solid rgba(107,114,128,0.2)', borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        💡 <strong style={{ color: 'var(--ink)' }}>Tip:</strong> Pay attention to word choices and timing — the narrator is not neutral. Look for clues about whose side the language leans toward.
      </div>

      <button onClick={() => setPhase('narrator-quiz')} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        I&apos;ve read it — Answer questions →
      </button>
    </div>
  );

  if (phase === 'narrator-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${C.narrator}18`, border: `2px solid ${C.narrator}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: C.narrator, fontFamily: 'var(--mono)', flexShrink: 0 }}>01</span>
        <div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Part 1 · Questions</p>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Narrator — Comprehension</h2>
        </div>
      </div>
      <QuizBlock
        questions={NARRATOR_QS}
        sectionKey="narrator"
        onComplete={s => { saveScore('narrator', s); setPhase('dil'); }}
      />
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // DAUGHTER-IN-LAW SECTION
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'dil') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${C.dil}18`, border: `2px solid ${C.dil}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: C.dil, fontFamily: 'var(--mono)', flexShrink: 0 }}>02</span>
        <div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Part 2 of 4 · Listening</p>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Daughter-in-law&apos;s Voice Note</h2>
        </div>
      </div>

      <AudioPlayer src="/audio/grandmothers-ledger/daughter-in-law.mp3" label="Sarah — Daughter-in-law" color={C.dil} />

      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.dil}22`, borderRadius: 20, padding: '1.75rem', margin: '1.25rem 0' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.72rem', fontWeight: 800, color: C.dil, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transcript</p>
        <div style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--ink)' }}>
          <p>Girl, I am still shaking.</p>
          <p>You know how Mark&apos;s mom bought all that stuff when Ethan was born? The stroller, the nursery furniture, all those expensive gifts she kept insisting on buying?</p>
          <p>Tell me why this woman showed up at my house yesterday with an actual spreadsheet.</p>
          <p>A spreadsheet.</p>
          <p>I&apos;m not joking.</p>
          <p>She sat at my kitchen table and started going item by item, like she was doing an inventory check at a warehouse.</p>
          <p>The stroller. The crib. The dresser. Even the money she&apos;d put into Ethan&apos;s college fund.</p>
          <p>Then she says, completely serious, &quot;I think it&apos;s only fair that some of these things go to Emma&apos;s baby now.&quot;</p>
          <p>And I&apos;m sitting there thinking... fair to who?</p>
          <p>Because Ethan is literally using this stuff.</p>
          <p>Like, these aren&apos;t extra boxes sitting in storage. These are his things.</p>
          <p>Then she starts saying she invested a lot of money and that family assets should stay in the family.</p>
          <p>Family assets?</p>
          <p>Ma&apos;am, that&apos;s your grandson, not a real-estate portfolio.</p>
          <p>And then she pulls out receipts.</p>
          <p>Receipts.</p>
          <p>From three years ago.</p>
          <p>Who keeps receipts for baby gifts unless they think they&apos;re getting them back one day?</p>
          <p>The whole thing felt insane.</p>
          <p>The worst part is that she genuinely seemed shocked when I said no.</p>
          <p>Like she honestly expected me to hand over my kid&apos;s belongings because another grandchild is on the way.</p>
          <p>I swear, if she&apos;d just asked whether we had anything Ethan had outgrown, I would&apos;ve happily helped.</p>
          <p>But showing up with paperwork and a recovery plan?</p>
          <p style={{ margin: 0 }}>Absolutely not.</p>
        </div>
      </div>

      <div style={{ background: `${C.dil}08`, border: `1px solid ${C.dil}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        💡 <strong style={{ color: 'var(--ink)' }}>Tip:</strong> Notice how Sarah uses repetition, rhetorical questions, and sarcasm. These are deliberate choices — they shape how you feel about the situation.
      </div>

      <button onClick={() => { setDilDone(true); setPhase('dil-quiz'); }} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        I&apos;ve listened — Answer questions →
      </button>
    </div>
  );

  if (phase === 'dil-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${C.dil}18`, border: `2px solid ${C.dil}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: C.dil, fontFamily: 'var(--mono)', flexShrink: 0 }}>02</span>
        <div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Part 2 · Questions</p>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Daughter-in-law — Comprehension</h2>
        </div>
      </div>
      <QuizBlock
        questions={DIL_QS}
        sectionKey="dil"
        onComplete={s => { saveScore('dil', s); setPhase('mil'); }}
      />
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // MOTHER-IN-LAW SECTION
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'mil') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${C.mil}18`, border: `2px solid ${C.mil}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: C.mil, fontFamily: 'var(--mono)', flexShrink: 0 }}>03</span>
        <div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Part 3 of 4 · Listening</p>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Mother-in-law&apos;s Voice Note</h2>
        </div>
      </div>

      <AudioPlayer src="/audio/grandmothers-ledger/mother-in-law.mp3" label="Linda — Mother-in-law" color={C.mil} />

      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.mil}22`, borderRadius: 20, padding: '1.75rem', margin: '1.25rem 0' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.72rem', fontWeight: 800, color: C.mil, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transcript</p>
        <div style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--ink)' }}>
          <p>I need to tell somebody what actually happened because apparently I&apos;m the villain now.</p>
          <p>Three years ago, when Ethan was born, I spent a fortune helping those kids.</p>
          <p>A fortune.</p>
          <p>Not because anybody forced me to. Because I wanted my grandson to have everything.</p>
          <p>The nursery furniture alone cost more than my first car.</p>
          <p>Did I complain? No.</p>
          <p>Did I ever ask for recognition? No.</p>
          <p>Now my daughter Emma is expecting her first baby, and she&apos;s struggling financially.</p>
          <p>So I thought maybe some of the expensive items that aren&apos;t being fully used anymore could be passed down.</p>
          <p>You know... like families have done for generations.</p>
          <p>Instead, Sarah acted like I was trying to rob a bank.</p>
          <p>I never said I wanted every single thing back.</p>
          <p>I said maybe we could discuss sharing some of the bigger items.</p>
          <p>But the second I brought up the stroller, she got defensive.</p>
          <p>And honestly?</p>
          <p>What bothered me wasn&apos;t even the stuff.</p>
          <p>It was the attitude.</p>
          <p>The complete lack of appreciation.</p>
          <p>For three years I&apos;ve watched them enjoy things I paid for, and the moment I suggest helping another grandchild, suddenly I&apos;m some greedy monster.</p>
          <p>Also, everybody keeps making fun of my spreadsheet.</p>
          <p>Excuse me for being organised.</p>
          <p>If you&apos;re talking about tens of thousands of dollars, maybe writing things down isn&apos;t the craziest thing in the world.</p>
          <p>I wasn&apos;t trying to take from Ethan.</p>
          <p>I was trying to help Emma.</p>
          <p style={{ margin: 0 }}>But apparently in this family, that&apos;s now considered a crime.</p>
        </div>
      </div>

      <div style={{ background: `${C.mil}08`, border: `1px solid ${C.mil}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        💡 <strong style={{ color: 'var(--ink)' }}>Tip:</strong> Compare Linda&apos;s account with Sarah&apos;s. What overlaps? What contradicts? Where might both be telling their own truth?
      </div>

      <button onClick={() => { setMilDone(true); setPhase('mil-quiz'); }} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        I&apos;ve listened — Answer questions →
      </button>
    </div>
  );

  if (phase === 'mil-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${C.mil}18`, border: `2px solid ${C.mil}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: C.mil, fontFamily: 'var(--mono)', flexShrink: 0 }}>03</span>
        <div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Part 3 · Questions</p>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Mother-in-law — Comprehension</h2>
        </div>
      </div>
      <QuizBlock
        questions={MIL_QS}
        sectionKey="mil"
        onComplete={s => { saveScore('mil', s); setPhase('final-quiz'); }}
      />
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // FINAL QUIZ
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'final-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${C.final}18`, border: `2px solid ${C.final}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: C.final, fontFamily: 'var(--mono)', flexShrink: 0 }}>04</span>
        <div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Part 4 of 4 · Overall</p>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Big Picture — Both Perspectives</h2>
        </div>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        These questions require you to hold both accounts in mind simultaneously and think critically about what happened, why, and how language shapes our perception.
      </p>
      <QuizBlock
        questions={FINAL_QS}
        sectionKey="final"
        onComplete={s => { saveScore('final', s); setPhase('results'); }}
      />
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // RESULTS
  // ─────────────────────────────────────────────────────────────────────────
  const sectionLabels: Record<string, string> = { narrator: 'Narrator', dil: 'Daughter-in-law', mil: 'Mother-in-law', final: 'Overall' };
  const sectionColors: Record<string, string> = { narrator: C.narrator, dil: C.dil, mil: C.mil, final: C.final };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
        <span className="ink-line" />Results
      </p>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.35rem', letterSpacing: '-0.03em' }}>
        The Grandmother&apos;s Ledger
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.75rem' }}>You&apos;ve completed all four sections.</p>

      {/* Score hero */}
      <div style={{
        background: `linear-gradient(135deg, ${bandColor}11 0%, ${bandColor}06 100%)`,
        border: `2px solid ${bandColor}44`,
        borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', textAlign: 'center',
      }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: bandColor, lineHeight: 1 }}>{totalRight}<span style={{ fontSize: '1.5rem', color: 'var(--muted)' }}>/{totalQs}</span></div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0.35rem 0' }}>Correct answers</div>
        <div style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 800, color: bandColor, background: `${bandColor}15`, border: `1.5px solid ${bandColor}44`, borderRadius: 10, padding: '0.4rem 1.1rem', fontFamily: 'var(--mono)' }}>
          {band}
        </div>
        <div style={{ marginTop: '1rem', height: 8, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${bandColor}, ${bandColor}cc)`, borderRadius: 4, transition: 'width 1s ease' }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.35rem', fontFamily: 'var(--mono)' }}>{pct}%</div>
      </div>

      {/* Per-section breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {ALL_SECTIONS.map(({ key, questions }) => {
          const s = scores[key] ?? [];
          const right = s.filter(Boolean).length;
          const total = questions.length;
          const pctS = total > 0 ? Math.round((right / total) * 100) : 0;
          const clr = sectionColors[key];
          return (
            <div key={key} style={{ background: 'var(--bg-1)', border: `1.5px solid ${clr}33`, borderRadius: 14, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: clr }}>{right}<span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>/{total}</span></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: clr, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0.2rem 0 0.5rem' }}>{sectionLabels[key]}</div>
              <div style={{ height: 4, background: 'var(--line-soft)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctS}%`, background: clr, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Reflection prompt */}
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Discussion Prompt</p>
        <p style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.5 }}>
          After hearing both sides — who do you think has the stronger argument, and why?
        </p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          There is no single correct answer. The most important skill is <strong style={{ color: 'var(--ink)' }}>justifying your position with evidence from the texts</strong> — using specific words, phrases, and details to support your view. That&apos;s exactly what B2–C1 English requires.
        </p>
      </div>

      {/* Language notes */}
      <div style={{ background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: '0 0 0.85rem', fontSize: '0.75rem', fontWeight: 800, color: '#0f3d8c', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Key Language from this Story</p>
        {[
          { phrase: 'inventory check', meaning: 'systematic count of stock/goods' },
          { phrase: 'rhetorical question', meaning: 'question asked for effect, not expecting an answer' },
          { phrase: 'passed down', meaning: 'given from one generation or family member to another' },
          { phrase: 'sarcasm / irony', meaning: 'saying one thing to mean the opposite, often critically' },
          { phrase: 'non-apology', meaning: 'a statement that sounds like an apology but contains no genuine remorse' },
        ].map(item => (
          <div key={item.phrase} style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(15,61,140,0.1)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f3d8c', fontFamily: 'var(--mono)', flexShrink: 0, minWidth: 160 }}>{item.phrase}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{item.meaning}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={() => { setPhase('intro'); setScores({}); setDilDone(false); setMilDone(false); }} className="btn" style={{ fontSize: '0.9rem' }}>
          Try again →
        </button>
        <Link href="/practica" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>
          ← Back to Practice
        </Link>
      </div>
    </div>
  );
}
