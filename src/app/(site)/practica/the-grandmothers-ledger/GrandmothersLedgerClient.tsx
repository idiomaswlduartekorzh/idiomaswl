'use client';

import { useState, useRef, type Dispatch, type SetStateAction } from 'react';
import Link from 'next/link';

// ─── Translation dictionary ───────────────────────────────────────────────────

const DICT: Record<string, string> = {
  luxury: 'lujoso / de lujo',
  stroller: 'cochecito de bebé',
  nursery: 'cuarto del bebé',
  spreadsheet: 'hoja de cálculo',
  inventory: 'inventario',
  warehouse: 'almacén / bodega',
  crib: 'cuna',
  dresser: 'cómoda',
  portfolio: 'portafolio / cartera de inversiones',
  receipt: 'recibo / factura',
  receipts: 'recibos / facturas',
  belongings: 'pertenencias / cosas',
  assets: 'activos / bienes',
  generous: 'generoso/a',
  generosity: 'generosidad',
  fortune: 'fortuna / mucho dinero',
  villain: 'villano/a',
  organised: 'organizado/a',
  organized: 'organizado/a',
  attitude: 'actitud',
  appreciation: 'agradecimiento',
  recognition: 'reconocimiento',
  struggling: 'pasando dificultades económicas',
  expecting: 'embarazada / esperando un bebé',
  pregnant: 'embarazada',
  generations: 'generaciones',
  greedy: 'codicioso/a / avaro/a',
  defensive: 'a la defensiva',
  invested: 'invirtió / invertido',
  invest: 'invertir',
  investment: 'inversión',
  outgrown: 'que ya no le queda / que superó',
  paperwork: 'papeleo / documentación',
  insisting: 'insistiendo',
  insisted: 'insistió',
  genuinely: 'genuinamente / de verdad',
  apparently: 'aparentemente / al parecer',
  literally: 'literalmente',
  honestly: 'honestamente',
  shocked: 'sorprendido/a / impactado/a',
  refused: 'se negó / rechazó',
  refusal: 'negativa / rechazo',
  dispute: 'disputa / conflicto',
  perception: 'percepción',
  assumption: 'suposición',
  assumptions: 'suposiciones',
  announced: 'anunció',
  conflict: 'conflicto',
  unconditional: 'incondicional',
  transactional: 'transaccional / como un negocio',
  sarcasm: 'sarcasmo',
  sarcastic: 'sarcástico/a',
  irony: 'ironía',
  rhetorical: 'retórico/a',
  inference: 'inferencia / deducción',
  neutral: 'neutral / imparcial',
  premeditation: 'premeditación',
  indignant: 'indignado/a',
  indignation: 'indignación',
  evidence: 'evidencia / prueba',
  entitlement: 'sentido de tener derecho a todo',
  complain: 'quejarse',
  monster: 'monstruo',
  reasonable: 'razonable',
  unreasonable: 'poco razonable',
  authority: 'autoridad',
  subtle: 'sutil',
  account: 'versión / relato de los hechos',
  perspective: 'perspectiva / punto de vista',
  boundary: 'límite',
  established: 'establecido/a',
  contested: 'cuestionado/a / en disputa',
  objective: 'objetivo/a',
  recovery: 'recuperación',
  fair: 'justo/a',
  fairness: 'justicia / equidad',
  ledger: 'libro de cuentas / registro contable',
  grandmother: 'abuela',
  grandfather: 'abuelo',
  grandson: 'nieto',
  granddaughter: 'nieta',
  pregnancy: 'embarazo',
  insane: 'una locura / absurdo',
  storage: 'almacenamiento / bodega',
  crime: 'crimen / delito',
  suggest: 'sugerir',
  suggestion: 'sugerencia',
  discuss: 'hablar de / conversar sobre',
  sharing: 'compartir / repartir',
  entirely: 'totalmente / por completo',
  ultimately: 'en última instancia / finalmente',
  genuine: 'genuino/a / verdadero/a',
  simultaneously: 'simultáneamente / al mismo tiempo',
  spender: 'persona que gasta dinero',
  custom: 'personalizado / a medida',
  simply: 'simplemente',
  purchased: 'compró / adquirió',
  item: 'artículo / objeto',
  items: 'artículos / objetos',
  fund: 'fondo (de dinero)',
  college: 'universidad',
  lack: 'falta / carencia',
  complete: 'completa / total',
  helping: 'ayudando',
  craziest: 'más loca / más absurda',
  considered: 'considerado / visto como',
  rob: 'robar',
  bank: 'banco',
  bigger: 'más grandes',
  second: 'segundo / instante',
  brought: 'trajo / mencionó',
  bothered: 'molestó / perturbó',
  stuff: 'cosas / artículos',
  watched: 'vio / observó',
  moment: 'momento',
  suddenly: 'de repente / de pronto',
};

// ─── Text content ─────────────────────────────────────────────────────────────

const NARRATOR_PARAGRAPHS = [
  "Three years ago, when baby Ethan was born, his grandfather Robert became the family's biggest spender.",
  "He bought nearly everything: a luxury stroller, a custom nursery set, expensive toys, and even started a college fund.",
  "Everyone thought he was simply being generous.",
  "Then Robert's daughter announced she was pregnant.",
  "Suddenly, Robert began making comments about how some of Ethan's gifts could be \"shared\" with the new baby.",
  "A few weeks later, he arrived at his son and daughter-in-law's house carrying a spreadsheet listing every expensive gift he had ever purchased.",
  "He asked for thousands of dollars' worth of items back.",
  "The daughter-in-law refused.",
  "Now both sides are telling very different versions of what happened.",
];

const DIL_PARAGRAPHS = [
  "Girl, I am still shaking.",
  "You know how Mark's mom bought all that stuff when Ethan was born? The stroller, the nursery furniture, all those expensive gifts she kept insisting on buying?",
  "Tell me why this woman showed up at my house yesterday with an actual spreadsheet.",
  "A spreadsheet.",
  "I'm not joking.",
  "She sat at my kitchen table and started going item by item, like she was doing an inventory check at a warehouse.",
  "The stroller. The crib. The dresser. Even the money she'd put into Ethan's college fund.",
  "Then she says, completely serious, \"I think it's only fair that some of these things go to Emma's baby now.\"",
  "And I'm sitting there thinking... fair to who?",
  "Because Ethan is literally using this stuff.",
  "Like, these aren't extra boxes sitting in storage. These are his things.",
  "Then she starts saying she invested a lot of money and that family assets should stay in the family.",
  "Family assets?",
  "Ma'am, that's your grandson, not a real-estate portfolio.",
  "And then she pulls out receipts.",
  "Receipts.",
  "From three years ago.",
  "Who keeps receipts for baby gifts unless they think they're getting them back one day?",
  "The whole thing felt insane.",
  "The worst part is that she genuinely seemed shocked when I said no.",
  "Like she honestly expected me to hand over my kid's belongings because another grandchild is on the way.",
  "I swear, if she'd just asked whether we had anything Ethan had outgrown, I would've happily helped.",
  "But showing up with paperwork and a recovery plan?",
  "Absolutely not.",
];

const MIL_PARAGRAPHS = [
  "I need to tell somebody what actually happened because apparently I'm the villain now.",
  "Three years ago, when Ethan was born, I spent a fortune helping those kids.",
  "A fortune.",
  "Not because anybody forced me to. Because I wanted my grandson to have everything.",
  "The nursery furniture alone cost more than my first car.",
  "Did I complain? No.",
  "Did I ever ask for recognition? No.",
  "Now my daughter Emma is expecting her first baby, and she's struggling financially.",
  "So I thought maybe some of the expensive items that aren't being fully used anymore could be passed down.",
  "You know... like families have done for generations.",
  "Instead, Sarah acted like I was trying to rob a bank.",
  "I never said I wanted every single thing back.",
  "I said maybe we could discuss sharing some of the bigger items.",
  "But the second I brought up the stroller, she got defensive.",
  "And honestly?",
  "What bothered me wasn't even the stuff.",
  "It was the attitude.",
  "The complete lack of appreciation.",
  "For three years I've watched them enjoy things I paid for, and the moment I suggest helping another grandchild, suddenly I'm some greedy monster.",
  "Also, everybody keeps making fun of my spreadsheet.",
  "Excuse me for being organised.",
  "If you're talking about tens of thousands of dollars, maybe writing things down isn't the craziest thing in the world.",
  "I wasn't trying to take from Ethan.",
  "I was trying to help Emma.",
  "But apparently in this family, that's now considered a crime.",
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase =
  | 'intro'
  | 'narrator' | 'narrator-quiz'
  | 'dil-listen' | 'dil-write1' | 'dil-transcript' | 'dil-write2' | 'dil-compare' | 'dil-quiz'
  | 'mil-listen' | 'mil-write1' | 'mil-transcript' | 'mil-write2' | 'mil-compare' | 'mil-quiz'
  | 'final-quiz' | 'results';

interface Question { type: string; q: string; opts: string[]; correct: number; explanation: string; }

// ─── Questions ────────────────────────────────────────────────────────────────

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'The narrator describes the stroller as "luxury." What does this word choice suggest?',
    opts: ['She bought affordable, practical items', 'He spent large amounts on premium, high-end products', 'He preferred second-hand items for the baby', 'He only bought items on sale'],
    correct: 1,
    explanation: '"Luxury" signals expensive, premium-quality goods — indicating Robert spent far more than the average gift-giver would.',
  },
  {
    type: 'Inference',
    q: 'The narrator uses the word "Suddenly" when describing Robert\'s change in attitude. What does this imply?',
    opts: ['The change was gradual and long expected', 'Robert always planned to reclaim the items eventually', 'The shift happened quickly after one specific event: his daughter\'s pregnancy', 'Emma personally asked Robert to request the items back'],
    correct: 2,
    explanation: '"Suddenly" contrasts with three years of generosity, implying Robert\'s motivation changed the moment his own daughter became pregnant — not gradually.',
  },
  {
    type: 'Comprehension',
    q: 'What information did Robert\'s spreadsheet contain?',
    opts: ['A list of future purchases for the new baby', 'A record of every expensive gift he had ever purchased', 'A household budget for the family', 'A legal contract between Robert and his son'],
    correct: 1,
    explanation: 'The narrator states Robert arrived "carrying a spreadsheet listing every expensive gift he had ever purchased."',
  },
  {
    type: 'Critical Thinking',
    q: '"Everyone thought he was simply being generous." What does the word "simply" suggest?',
    opts: ['Robert was definitely generous with no hidden motives', 'There may be more to Robert\'s generosity than it appeared at the time', 'The family always knew Robert had conditions on his gifts', 'Robert was openly trying to control the family'],
    correct: 1,
    explanation: '"Simply" hints that appearances were deceiving — leaving open the possibility that Robert\'s generosity had conditions nobody noticed until now.',
  },
];

const DIL_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'Sarah compares Robert\'s visit to "an inventory check at a warehouse." What does this reveal?',
    opts: ['Metaphor — she means Robert physically moved her furniture', 'Simile — she portrays Robert as cold and businesslike, treating gifts as recoverable stock', 'Hyperbole — she is simply exaggerating for humour', 'Personification — she gives the spreadsheet human qualities'],
    correct: 1,
    explanation: 'This simile strips all warmth from Robert\'s visit — comparing it to a warehouse audit shows Sarah saw the interaction as transactional, not familial.',
  },
  {
    type: 'Inference',
    q: '"Who keeps receipts for baby gifts unless they think they\'re getting them back one day?" What does this rhetorical question imply?',
    opts: ['Sarah thinks everyone should keep all receipts', 'Robert was simply very organised but nothing more', 'The receipts are evidence Robert always intended to reclaim the gifts', 'Sarah lost her own receipts and is projecting'],
    correct: 2,
    explanation: 'A rhetorical question doesn\'t expect an answer — Sarah uses it to suggest Robert\'s receipts are proof of premeditation, not just good record-keeping.',
  },
  {
    type: 'Tone',
    q: 'How would you best describe the overall tone of Sarah\'s voice note?',
    opts: ['Calm and analytical', 'Emotionally charged, indignant, and disbelieving', 'Sad and regretful', 'Formal and professional'],
    correct: 1,
    explanation: '"I am still shaking," repeated one-word sentences ("A spreadsheet."), and sarcasm ("not a real-estate portfolio") all mark a tone of emotional indignation.',
  },
  {
    type: 'Comprehension',
    q: 'According to Sarah, what request from Robert WOULD have been acceptable?',
    opts: ['Bringing a detailed spreadsheet of all gifts', 'Demanding the stroller and crib back immediately', 'Asking whether Ethan had outgrown anything that could be passed on', 'Sending a formal written request by mail'],
    correct: 2,
    explanation: 'Sarah says: "if she\'d just asked whether we had anything Ethan had outgrown, I would\'ve happily helped." HOW Robert asked mattered as much as WHAT he asked.',
  },
  {
    type: 'Vocabulary',
    q: '"Ma\'am, that\'s your grandson, not a real-estate portfolio." What technique is Sarah using?',
    opts: ['A literal statement about Robert\'s real estate business', 'Irony to highlight how Robert treats a family relationship like a financial investment', 'A polite way to agree with Robert\'s perspective', 'A direct quote from the spreadsheet'],
    correct: 1,
    explanation: 'Using the vocabulary of finance ("portfolio") sarcastically mocks Robert\'s transactional approach to what should be an unconditional family relationship.',
  },
];

const MIL_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'Robert says items could "be passed down" to Emma\'s baby. What tradition does this phrase reference?',
    opts: ['Returning purchased goods to a store for a refund', 'The family practice of handing possessions from one member to another across generations', 'A formal legal inheritance process', 'Donating items to charity'],
    correct: 1,
    explanation: '"Passed down" invokes a familiar family tradition — not repayment. Robert frames his request as cultural practice, not a financial demand.',
  },
  {
    type: 'Comprehension',
    q: 'According to Robert, what specifically did he ask for — as opposed to what Sarah claims?',
    opts: ['Every single item on his list, returned immediately', 'Only the college fund money', 'A conversation about sharing some of the bigger items', 'A formal written apology from Sarah'],
    correct: 2,
    explanation: 'Robert says: "I never said I wanted every single thing back. I said maybe we could discuss sharing some of the bigger items." This directly contradicts Sarah\'s account.',
  },
  {
    type: 'Inference',
    q: '"What bothered me wasn\'t even the stuff. It was the attitude." What does this reveal about Robert\'s deeper concern?',
    opts: ['He is only pretending not to care about the items', 'He feels emotionally disrespected and unappreciated despite years of generosity', 'He wants Sarah removed from the family', 'He regrets ever buying the gifts'],
    correct: 1,
    explanation: 'By separating "the stuff" from "the attitude," Robert signals that the emotional wound — feeling dismissed after years of investment — matters more than the monetary value.',
  },
  {
    type: 'Tone',
    q: '"Excuse me for being organised" — what tone does this phrase convey?',
    opts: ['Genuine apology and remorse', 'Sarcastic defensiveness — he doesn\'t think he did anything wrong', 'Confusion about why anyone is upset', 'Academic, formal register'],
    correct: 1,
    explanation: '"Excuse me for being organised" is a non-apology: he defends his action while implying the criticism of the spreadsheet is absurd.',
  },
  {
    type: 'Vocabulary',
    q: '"Apparently I\'m the villain now." What does Robert\'s use of "villain" reveal?',
    opts: ['He fully agrees his behaviour was wrong', 'He feels unjustly cast as the bad character in a story others are telling about him', 'He is using technical legal language', 'He is seeking sympathy through flattery'],
    correct: 1,
    explanation: '"Villain" is a storytelling word, not a real-life term. Robert uses it to signal he feels he has been assigned a narrative role unfairly — he\'s a character in someone else\'s story.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Synthesis',
    q: 'Both Sarah and Robert agree on which of the following facts?',
    opts: ['Robert asked to permanently take back all items', 'Sarah had already offered to share some items voluntarily', 'Robert brought a spreadsheet to the meeting', 'Emma personally requested the items from Robert'],
    correct: 2,
    explanation: 'The spreadsheet is the one objective detail confirmed by both accounts. Everything else — intent, tone, scope — is contested.',
  },
  {
    type: 'Perspective',
    q: 'The narrator says Robert "asked for thousands of dollars\' worth of items back." Robert says he "suggested discussing sharing some items." This gap suggests:',
    opts: ['The narrator is biased against Robert', 'There is a significant difference between Robert\'s stated intention and how his request was perceived', 'Sarah invented most of the confrontation', 'The narrator made a factual error'],
    correct: 1,
    explanation: 'Intent vs. impact: Robert believed he was opening a conversation; Sarah (and the narrator) experienced it as a demand. This gap between intention and perception drives the entire conflict.',
  },
  {
    type: 'Critical Thinking',
    q: 'If you had to identify the ROOT cause of this conflict, which is most accurate?',
    opts: ['Robert\'s financial greed', 'Sarah\'s selfishness and lack of gratitude', 'No expectations were discussed when the gifts were originally given', 'Emma\'s decision to have a baby'],
    correct: 2,
    explanation: 'Were the items gifts or conditional loans? The failure to establish that boundary at the time — not greed or selfishness alone — is the structural cause of the dispute.',
  },
  {
    type: 'Inference',
    q: 'Sarah says Robert "genuinely seemed shocked" when refused. What does this reaction suggest about Robert?',
    opts: ['Robert was pretending to be surprised as a tactic', 'Robert had genuinely not anticipated that Sarah would view his request as unreasonable', 'Robert knew Sarah would refuse and was testing her', 'Robert had never been refused anything in his life'],
    correct: 1,
    explanation: 'Genuine shock reveals that Robert operated with a completely different set of assumptions — he didn\'t expect refusal because, in his own framework, his request seemed reasonable.',
  },
  {
    type: 'Vocabulary & Register',
    q: 'Robert refers to his son and daughter-in-law as "those kids." What does this word choice suggest?',
    opts: ['His son and Sarah are literally young children', 'Robert sees himself as the authority figure and them as less experienced people he helped', 'Robert has forgotten their names', 'It is a formal, affectionate term in English'],
    correct: 1,
    explanation: '"Those kids" infantilises the couple — framing them as recipients of Robert\'s wisdom and money rather than equals. It subtly reinforces his sense of authority and entitlement.',
  },
];

const ALL_SECTIONS = [
  { key: 'narrator', questions: NARRATOR_QS },
  { key: 'dil',      questions: DIL_QS },
  { key: 'mil',      questions: MIL_QS },
  { key: 'final',    questions: FINAL_QS },
];

// ─── AudioPlayer ──────────────────────────────────────────────────────────────

function AudioPlayer({ src, label, color, onEnded }: { src: string; label: string; color: string; onEnded?: () => void }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  function toggle() {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  }

  function fmt(s: number) {
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  }

  return (
    <div style={{ background: `${color}0d`, border: `1.5px solid ${color}33`, borderRadius: 16, padding: '1.25rem 1.5rem' }}>
      <audio ref={ref} src={src}
        onTimeUpdate={() => setProgress(ref.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onEnded={() => { setPlaying(false); setProgress(0); onEnded?.(); }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggle} style={{ width: 48, height: 48, borderRadius: '50%', background: color, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#fff', flexShrink: 0, boxShadow: `0 4px 16px ${color}44` }}>
          {playing ? '⏸' : '▶'}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color, marginBottom: '0.4rem', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>🎙 {label}</div>
          <div style={{ position: 'relative', height: 6, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden', cursor: 'pointer' }}
            onClick={e => {
              if (!ref.current || !duration) return;
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              ref.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: duration ? `${(progress / duration) * 100}%` : '0%', background: color, borderRadius: 4, transition: 'width 0.1s linear' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.3rem', fontFamily: 'var(--mono)' }}>
            <span>{fmt(progress)}</span><span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ClickableText ────────────────────────────────────────────────────────────

function ClickableText({ paragraphs, unknown, onToggle }: {
  paragraphs: string[];
  unknown: Set<string>;
  onToggle: (w: string) => void;
}) {
  const [lastWord, setLastWord] = useState<string | null>(null);

  return (
    <div>
      <div style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--ink)' }}>
        {paragraphs.map((para, pi) => {
          const tokens = para.split(/(\s+)/);
          return (
            <p key={pi} style={{ margin: '0 0 0.8rem' }}>
              {tokens.map((tok, ti) => {
                if (/^\s+$/.test(tok)) return <span key={ti}>{tok}</span>;
                const clean = tok.replace(/[^a-zA-Z]/g, '').toLowerCase();
                if (!clean) return <span key={ti}>{tok}</span>;
                const pre  = tok.match(/^[^a-zA-Z]*/)?.[0] ?? '';
                const post = tok.match(/[^a-zA-Z]*$/)?.[0] ?? '';
                const word = tok.slice(pre.length, tok.length - post.length);
                const isUnknown = unknown.has(clean);
                const hasDict   = !!DICT[clean];
                return (
                  <span key={ti}>
                    {pre}
                    <span
                      onClick={() => { onToggle(clean); setLastWord(clean); }}
                      title={hasDict ? DICT[clean] : undefined}
                      style={{
                        cursor: 'pointer',
                        textDecoration: isUnknown ? 'underline' : 'none',
                        textDecorationColor: '#f59e0b',
                        textDecorationThickness: '2px',
                        color: isUnknown ? '#d97706' : 'inherit',
                        borderBottom: !isUnknown && hasDict ? '1px dashed rgba(107,114,128,0.22)' : 'none',
                        transition: 'color 0.12s',
                      }}
                    >{word}</span>
                    {post}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>

      {/* Translation bar */}
      <div style={{ marginTop: '0.6rem', padding: '0.55rem 1rem', borderRadius: 10, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.82rem', minHeight: 36, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {lastWord ? (
          <>
            <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: '#d97706' }}>{lastWord}</span>
            <span style={{ color: 'var(--muted)' }}>→</span>
            <span style={{ color: 'var(--ink)' }}>{DICT[lastWord] ?? '(no translation — add to your vocabulary list)'}</span>
          </>
        ) : (
          <span style={{ color: 'var(--muted)' }}>👆 Click any word to see its translation · Click again to mark as unknown</span>
        )}
      </div>
      {unknown.size > 0 && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          {unknown.size} word{unknown.size > 1 ? 's' : ''} marked: {Array.from(unknown).join(', ')}
        </div>
      )}
    </div>
  );
}

// ─── WriteBox ─────────────────────────────────────────────────────────────────

function WriteBox({ prompt, value, onChange, onSubmit, submitLabel = 'Submit →', color = '#0f3d8c', hint }: {
  prompt: string; value: string; onChange: (v: string) => void; onSubmit: () => void;
  submitLabel?: string; color?: string; hint?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.55 }}>{prompt}</p>
      {hint && <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{hint}</p>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write here… (English or Spanish, both are fine)"
        rows={5}
        style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '0.95rem', borderRadius: 12, border: `1.5px solid ${color}33`, background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = `${color}88`; }}
        onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = `${color}33`; }}
      />
      <button onClick={onSubmit} disabled={!value.trim()} className="btn"
        style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem', opacity: value.trim() ? 1 : 0.45, cursor: value.trim() ? 'pointer' : 'default' }}>
        {submitLabel}
      </button>
    </div>
  );
}

// ─── CompareView ──────────────────────────────────────────────────────────────

function CompareView({ write1, write2, unknown, color, onContinue }: {
  write1: string; write2: string; unknown: Set<string>; color: string; onContinue: () => void;
}) {
  const list = Array.from(unknown);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${color}22`, borderRadius: 16, padding: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.66rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            🎧 Sin transcripción
          </p>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{write1}</p>
        </div>
        <div style={{ borderLeft: `1.5px solid ${color}22`, paddingLeft: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.66rem', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            📄 Con transcripción
          </p>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{write2}</p>
        </div>
      </div>

      {list.length > 0 && (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12, padding: '1rem 1.25rem' }}>
          <p style={{ margin: '0 0 0.65rem', fontSize: '0.66rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            Palabras que marcaste como desconocidas ({list.length})
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {list.map(w => (
              <span key={w} style={{ fontSize: '0.8rem', padding: '0.2rem 0.7rem', borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#d97706', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                {w}{DICT[w] ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}> → {DICT[w]}</span> : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      <button onClick={onContinue} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        Continue to questions →
      </button>
    </div>
  );
}

// ─── QuizBlock ────────────────────────────────────────────────────────────────

function QuizBlock({ questions, sectionKey, onComplete }: {
  questions: Question[]; sectionKey: string; onComplete: (s: boolean[]) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);

  const q = questions[idx];
  const answered = chosen !== null;
  const COLORS: Record<string, string> = { narrator: '#6b7280', dil: '#0f3d8c', mil: '#7c3aed', final: '#059669' };
  const color = COLORS[sectionKey] ?? '#0f3d8c';

  function pick(i: number) {
    if (answered) return;
    setChosen(i);
    setResults(prev => [...prev, i === q.correct]);
  }

  function next() {
    if (idx + 1 < questions.length) { setIdx(idx + 1); setChosen(null); }
    else onComplete([...results]);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {questions.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < idx ? color : i === idx ? `${color}66` : 'var(--line-soft)' }} />
        ))}
      </div>

      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${color}33`, borderRadius: 16, padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: 6, background: `${color}18`, color, border: `1px solid ${color}33`, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{q.type}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{idx + 1} / {questions.length}</span>
        </div>
        <p style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.55 }}>{q.q}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.correct, isChosen = chosen === i;
            let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', clr = 'var(--ink)';
            if (answered) {
              if (isCorrect) { bg = 'rgba(5,150,105,0.08)'; border = '1.5px solid #059669'; clr = '#059669'; }
              else if (isChosen) { bg = 'rgba(220,38,38,0.07)'; border = '1.5px solid #dc2626'; clr = '#dc2626'; }
            }
            return (
              <button key={i} onClick={() => pick(i)}
                style={{ textAlign: 'left', padding: '0.85rem 1rem', borderRadius: 12, border, background: bg, color: clr, cursor: answered ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.45, fontWeight: 500, transition: 'all 0.15s', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${answered ? (isCorrect ? '#059669' : isChosen ? '#dc2626' : 'var(--line-soft)') : 'currentColor'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, background: answered && isCorrect ? '#059669' : answered && isChosen ? '#dc2626' : 'transparent', color: answered && (isCorrect || isChosen) ? '#fff' : 'currentColor' }}>
                  {answered && isCorrect ? '✓' : answered && isChosen ? '✗' : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginTop: '1rem', padding: '0.9rem 1rem', borderRadius: 12, background: chosen === q.correct ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.06)', border: `1px solid ${chosen === q.correct ? '#05966933' : '#dc262633'}` }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.6 }}>
              <strong style={{ color: chosen === q.correct ? '#059669' : '#dc2626' }}>{chosen === q.correct ? '✅ Correct' : '❌ Not quite'}</strong>
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

// ─── Section header helper ────────────────────────────────────────────────────

function SectionHeader({ n, part, title, color }: { n: string; part: string; title: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${color}18`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color, fontFamily: 'var(--mono)', flexShrink: 0 }}>{n}</span>
      <div>
        <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{part}</p>
        <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>{title}</h2>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function GrandmothersLedgerClient() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [scores, setScores] = useState<Record<string, boolean[]>>({});

  // Narrator unknown words
  const [narratorUnknown, setNarratorUnknown] = useState<Set<string>>(new Set());

  // DIL state
  const [dilWrite1, setDilWrite1] = useState('');
  const [dilWrite2, setDilWrite2] = useState('');
  const [dilUnknown, setDilUnknown] = useState<Set<string>>(new Set());

  // MIL state
  const [milWrite1, setMilWrite1] = useState('');
  const [milWrite2, setMilWrite2] = useState('');
  const [milUnknown, setMilUnknown] = useState<Set<string>>(new Set());

  function saveScore(key: string, s: boolean[]) { setScores(prev => ({ ...prev, [key]: s })); }

  function toggleUnknown(setter: Dispatch<SetStateAction<Set<string>>>, word: string) {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      return next;
    });
  }

  const allScores  = Object.values(scores).flat();
  const totalRight = allScores.filter(Boolean).length;
  const totalQs    = NARRATOR_QS.length + DIL_QS.length + MIL_QS.length + FINAL_QS.length;
  const pct        = totalQs > 0 ? Math.round((totalRight / totalQs) * 100) : 0;
  const band       = pct >= 90 ? 'C1 · Advanced' : pct >= 75 ? 'B2 · Upper-Intermediate' : pct >= 55 ? 'B1 · Intermediate' : 'A2–B1 · Keep Practising';
  const bandColor  = pct >= 90 ? '#059669' : pct >= 75 ? '#0f3d8c' : pct >= 55 ? '#d97706' : '#dc2626';

  const C = { narrator: '#6b7280', dil: '#0f3d8c', mil: '#7c3aed', final: '#059669' };

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Link href="/practica" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '1.75rem' }}>← Práctica</Link>
      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />🇬🇧 English Comprehension · B1–B2</p>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem', lineHeight: 1.1 }}>The Grandfather&apos;s Ledger</h1>
      <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem', lineHeight: 1.65 }}>
        A family dispute. Two versions. You decide who&apos;s right. Read the narrator&apos;s account, listen to both voice notes, and answer 19 comprehension questions covering vocabulary, inference, tone, and critical thinking.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {[
          { icon: '📖', label: 'Reading', desc: 'Narrator text' },
          { icon: '🎙', label: 'Listening', desc: '2 voice notes' },
          { icon: '🔤', label: 'Vocabulary', desc: 'In-context meaning' },
          { icon: '🔍', label: 'Inference', desc: 'Read between the lines' },
          { icon: '🎭', label: 'Tone & register', desc: "Author's intent" },
          { icon: '🧠', label: 'Critical thinking', desc: 'Multiple perspectives' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: '1rem' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{item.icon}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.15rem' }}>{item.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Structure</p>
        {[
          { n: '01', label: 'Read the narrator', sub: '4 questions · click words to look up', color: C.narrator },
          { n: '02', label: 'Listen: Daughter-in-law', sub: '5 questions · write → transcript → compare', color: C.dil },
          { n: '03', label: 'Listen: Father-in-law', sub: '5 questions · write → transcript → compare', color: C.mil },
          { n: '04', label: 'Overall comprehension', sub: '5 questions', color: C.final },
        ].map(step => (
          <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${step.color}18`, border: `1.5px solid ${step.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: step.color, fontFamily: 'var(--mono)', flexShrink: 0 }}>{step.n}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{step.label}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>{step.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setPhase('narrator')} className="btn" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>Begin →</button>
    </div>
  );

  // ── NARRATOR ──────────────────────────────────────────────────────────────
  if (phase === 'narrator') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <button onClick={() => setPhase('intro')} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.82rem', cursor: 'pointer', marginBottom: '1.5rem', padding: 0 }}>← Back</button>
      <SectionHeader n="01" part="Part 1 of 4 · Reading" title="Narrator" color={C.narrator} />

      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.narrator}33`, borderRadius: 20, padding: '2rem', marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.68rem', fontWeight: 800, color: C.narrator, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>The Grandfather&apos;s Ledger</p>
        <ClickableText
          paragraphs={NARRATOR_PARAGRAPHS}
          unknown={narratorUnknown}
          onToggle={w => toggleUnknown(setNarratorUnknown, w)}
        />
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
      <SectionHeader n="01" part="Part 1 · Questions" title="Narrator — Comprehension" color={C.narrator} />
      <QuizBlock questions={NARRATOR_QS} sectionKey="narrator" onComplete={s => { saveScore('narrator', s); setPhase('dil-listen'); }} />
    </div>
  );

  // ── DIL — LISTEN ─────────────────────────────────────────────────────────
  if (phase === 'dil-listen') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 of 4 · Listening" title="Daughter-in-law's Voice Note" color={C.dil} />
      <div style={{ background: `${C.dil}07`, border: `1px solid ${C.dil}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        🎧 <strong style={{ color: 'var(--ink)' }}>Step 1 of 3:</strong> Listen carefully. There is <strong style={{ color: 'var(--ink)' }}>no transcript yet</strong> — just focus on what you can understand.
      </div>
      <AudioPlayer src="/audio/grandmothers-ledger/daughter-in-law.mp3" label="Sarah — Daughter-in-law" color={C.dil} />
      <div style={{ height: '1.25rem' }} />
      <button onClick={() => setPhase('dil-write1')} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        I&apos;ve listened — Write what you understood →
      </button>
    </div>
  );

  // ── DIL — WRITE 1 ────────────────────────────────────────────────────────
  if (phase === 'dil-write1') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 · Step 2 of 3" title="What did you understand?" color={C.dil} />
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.dil}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <WriteBox
          prompt="Without looking at any transcript, write in your own words what you understood from Sarah's voice note."
          hint="Don't worry about being perfect — this is a first impression. Write in English or Spanish."
          value={dilWrite1}
          onChange={setDilWrite1}
          onSubmit={() => setPhase('dil-transcript')}
          submitLabel="Submit — now listen with the transcript →"
          color={C.dil}
        />
      </div>
    </div>
  );

  // ── DIL — TRANSCRIPT ─────────────────────────────────────────────────────
  if (phase === 'dil-transcript') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 · Step 3 of 3" title="Listen again — with the transcript" color={C.dil} />
      <div style={{ background: `${C.dil}07`, border: `1px solid ${C.dil}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        📄 <strong style={{ color: 'var(--ink)' }}>Click words you don&apos;t know</strong> to mark them and see their translation. Then write again what you understood.
      </div>
      <AudioPlayer src="/audio/grandmothers-ledger/daughter-in-law.mp3" label="Sarah — Daughter-in-law" color={C.dil} />
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.dil}22`, borderRadius: 20, padding: '1.75rem', margin: '1.25rem 0' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.72rem', fontWeight: 800, color: C.dil, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transcript</p>
        <ClickableText
          paragraphs={DIL_PARAGRAPHS}
          unknown={dilUnknown}
          onToggle={w => toggleUnknown(setDilUnknown, w)}
        />
      </div>
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.dil}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <WriteBox
          prompt="Now write again what you understood — you can be more detailed this time."
          value={dilWrite2}
          onChange={setDilWrite2}
          onSubmit={() => setPhase('dil-compare')}
          submitLabel="Compare my two versions →"
          color={C.dil}
        />
      </div>
    </div>
  );

  // ── DIL — COMPARE ────────────────────────────────────────────────────────
  if (phase === 'dil-compare') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 · Comparison" title="See how your understanding evolved" color={C.dil} />
      <CompareView write1={dilWrite1} write2={dilWrite2} unknown={dilUnknown} color={C.dil} onContinue={() => setPhase('dil-quiz')} />
    </div>
  );

  if (phase === 'dil-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 · Questions" title="Daughter-in-law — Comprehension" color={C.dil} />
      <QuizBlock questions={DIL_QS} sectionKey="dil" onComplete={s => { saveScore('dil', s); setPhase('mil-listen'); }} />
    </div>
  );

  // ── MIL — LISTEN ─────────────────────────────────────────────────────────
  if (phase === 'mil-listen') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 of 4 · Listening" title="Father-in-law's Voice Note" color={C.mil} />
      <div style={{ background: `${C.mil}07`, border: `1px solid ${C.mil}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        🎧 <strong style={{ color: 'var(--ink)' }}>Step 1 of 3:</strong> Listen without the transcript first. Then write what you understood, and compare with the transcript.
      </div>
      <AudioPlayer src="/audio/grandmothers-ledger/mother-in-law.mp3" label="Robert — Father-in-law" color={C.mil} />
      <div style={{ height: '1.25rem' }} />
      <button onClick={() => setPhase('mil-write1')} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        I&apos;ve listened — Write what you understood →
      </button>
    </div>
  );

  // ── MIL — WRITE 1 ────────────────────────────────────────────────────────
  if (phase === 'mil-write1') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 · Step 2 of 3" title="What did you understand?" color={C.mil} />
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.mil}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <WriteBox
          prompt="Without the transcript, write in your own words what you understood from Robert's voice note."
          hint="This is the other side of the story. What is he saying happened? Write in English or Spanish."
          value={milWrite1}
          onChange={setMilWrite1}
          onSubmit={() => setPhase('mil-transcript')}
          submitLabel="Submit — now listen with the transcript →"
          color={C.mil}
        />
      </div>
    </div>
  );

  // ── MIL — TRANSCRIPT ─────────────────────────────────────────────────────
  if (phase === 'mil-transcript') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 · Step 3 of 3" title="Listen again — with the transcript" color={C.mil} />
      <div style={{ background: `${C.mil}07`, border: `1px solid ${C.mil}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        📄 <strong style={{ color: 'var(--ink)' }}>Click words you don&apos;t know</strong> to mark them. Compare Robert&apos;s account with Sarah&apos;s — where do they agree? Where do they contradict?
      </div>
      <AudioPlayer src="/audio/grandmothers-ledger/mother-in-law.mp3" label="Robert — Father-in-law" color={C.mil} />
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.mil}22`, borderRadius: 20, padding: '1.75rem', margin: '1.25rem 0' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.72rem', fontWeight: 800, color: C.mil, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transcript</p>
        <ClickableText
          paragraphs={MIL_PARAGRAPHS}
          unknown={milUnknown}
          onToggle={w => toggleUnknown(setMilUnknown, w)}
        />
      </div>
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.mil}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <WriteBox
          prompt="Now write again what you understood from Robert's perspective."
          value={milWrite2}
          onChange={setMilWrite2}
          onSubmit={() => setPhase('mil-compare')}
          submitLabel="Compare my two versions →"
          color={C.mil}
        />
      </div>
    </div>
  );

  // ── MIL — COMPARE ────────────────────────────────────────────────────────
  if (phase === 'mil-compare') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 · Comparison" title="See how your understanding evolved" color={C.mil} />
      <CompareView write1={milWrite1} write2={milWrite2} unknown={milUnknown} color={C.mil} onContinue={() => setPhase('mil-quiz')} />
    </div>
  );

  if (phase === 'mil-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 · Questions" title="Father-in-law — Comprehension" color={C.mil} />
      <QuizBlock questions={MIL_QS} sectionKey="mil" onComplete={s => { saveScore('mil', s); setPhase('final-quiz'); }} />
    </div>
  );

  // ── FINAL QUIZ ───────────────────────────────────────────────────────────
  if (phase === 'final-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="04" part="Part 4 of 4 · Overall" title="Big Picture — Both Perspectives" color={C.final} />
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        These questions require you to hold both accounts in mind simultaneously and think critically about what happened, why, and how language shapes our perception.
      </p>
      <QuizBlock questions={FINAL_QS} sectionKey="final" onComplete={s => { saveScore('final', s); setPhase('results'); }} />
    </div>
  );

  // ── RESULTS ──────────────────────────────────────────────────────────────
  const sectionLabels: Record<string, string> = { narrator: 'Narrator', dil: 'Daughter-in-law', mil: 'Father-in-law', final: 'Overall' };
  const sectionColors: Record<string, string> = { narrator: C.narrator, dil: C.dil, mil: C.mil, final: C.final };
  const allUnknown = Array.from(new Set([...narratorUnknown, ...dilUnknown, ...milUnknown]));

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Results</p>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.35rem', letterSpacing: '-0.03em' }}>The Grandfather&apos;s Ledger</h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.75rem' }}>You&apos;ve completed all four sections.</p>

      <div style={{ background: `linear-gradient(135deg, ${bandColor}11 0%, ${bandColor}06 100%)`, border: `2px solid ${bandColor}44`, borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: bandColor, lineHeight: 1 }}>{totalRight}<span style={{ fontSize: '1.5rem', color: 'var(--muted)' }}>/{totalQs}</span></div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0.35rem 0' }}>Correct answers</div>
        <div style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 800, color: bandColor, background: `${bandColor}15`, border: `1.5px solid ${bandColor}44`, borderRadius: 10, padding: '0.4rem 1.1rem', fontFamily: 'var(--mono)' }}>{band}</div>
        <div style={{ marginTop: '1rem', height: 8, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${bandColor}, ${bandColor}cc)`, borderRadius: 4, transition: 'width 1s ease' }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.35rem', fontFamily: 'var(--mono)' }}>{pct}%</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {ALL_SECTIONS.map(({ key, questions }) => {
          const s = scores[key] ?? [];
          const right = s.filter(Boolean).length, total = questions.length;
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

      {allUnknown.length > 0 && (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            Vocabulary list — words you marked across all sections ({allUnknown.length})
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {allUnknown.map(w => (
              <span key={w} style={{ fontSize: '0.8rem', padding: '0.2rem 0.7rem', borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#d97706', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                {w}{DICT[w] ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}> → {DICT[w]}</span> : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Discussion Prompt</p>
        <p style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.5 }}>After hearing both sides — who do you think has the stronger argument, and why?</p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          There is no single correct answer. The most important skill is <strong style={{ color: 'var(--ink)' }}>justifying your position with evidence from the texts</strong> — using specific words, phrases, and details. That&apos;s exactly what B2–C1 English requires.
        </p>
      </div>

      <div style={{ background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: '0 0 0.85rem', fontSize: '0.72rem', fontWeight: 800, color: '#0f3d8c', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Key Language from this Story</p>
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
        <button onClick={() => { setPhase('intro'); setScores({}); setNarratorUnknown(new Set()); setDilWrite1(''); setDilWrite2(''); setDilUnknown(new Set()); setMilWrite1(''); setMilWrite2(''); setMilUnknown(new Set()); }} className="btn" style={{ fontSize: '0.9rem' }}>
          Try again →
        </button>
        <Link href="/practica" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>← Back to Practice</Link>
      </div>
    </div>
  );
}
