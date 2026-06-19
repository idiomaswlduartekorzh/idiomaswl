'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#0369a1';
const CG = '#059669';
const CR = '#dc2626';

/* ─── Types ─── */
interface ClozeQ { opts: string[]; a: number; fb: string; }
interface ClozeSet {
  id: string; title: string; topic: string;
  parts: (string | number)[];
  questions: ClozeQ[];
}
interface WFQ { ctx: string; base: string; opts: string[]; a: number; fb: string; }
interface WFSet {
  id: string; title: string; topic: string;
  passage: string;
  questions: WFQ[];
}

/* ─── Multiple Choice Cloze Data ─── */
const CLOZE: ClozeSet[] = [
  {
    id: 'transmilenio',
    title: 'Text A — TransMilenio',
    topic: 'Urban Transport · Bogotá, Colombia',
    parts: [
      'TransMilenio is the main bus ', 0, ' in Bogotá, Colombia\'s capital city. It carries over two million passengers every ', 1, ', making it one of the busiest urban transport systems in the world. To use it, passengers need to buy a ', 2, ' card that they can reload with money at any station. The buses travel in ', 3, ' lanes that are separated from the rest of the traffic. This allows them to ', 4, ' faster than regular city buses. Each station has large, covered platforms ', 5, ' passengers wait for the next bus. During rush hours the system can become very ', 6, '. Despite this, most commuters consider TransMilenio the ', 7, ' way to travel across the city.',
    ],
    questions: [
      { opts: ['service', 'system', 'network', 'route'], a: 1, fb: '"Bus system" is the natural collocation for a public transport network. "Network" = web of interconnected routes, "service" = broader operation, "route" = single line.' },
      { opts: ['moment', 'hour', 'day', 'week'], a: 2, fb: '"Every day" — the two million figure refers to daily ridership. "Every hour" would be too frequent, "week" too infrequent for that figure.' },
      { opts: ['gold', 'prepaid', 'personal', 'special'], a: 1, fb: '"Prepaid card" — the standard term for a transit smartcard loaded with money in advance. The text confirms it: "reload with money".' },
      { opts: ['narrow', 'separate', 'dedicated', 'private'], a: 2, fb: '"Dedicated lanes" = lanes reserved exclusively for TransMilenio buses. This is the standard transport infrastructure collocation.' },
      { opts: ['travel', 'drive', 'walk', 'ride'], a: 0, fb: '"Travel faster" — the subject is the buses (vehicles), so "travel" is correct. "Drive" is for drivers, "ride" for passengers, "walk" for pedestrians.' },
      { opts: ['when', 'which', 'where', 'that'], a: 2, fb: '"Platforms where passengers wait" — relative clause of place requires "where". "Which/that" introduce defining relative clauses for things, not locations.' },
      { opts: ['busy', 'crowded', 'noisy', 'slow'], a: 1, fb: '"Crowded" = too many people in a confined space. During rush hours, stations and buses become overcrowded. "Busy" is less specific to people density.' },
      { opts: ['fast', 'quick', 'fastest', 'quicker'], a: 2, fb: '"The fastest way" — the definite article "the" before the blank signals a superlative is needed. "Fast" and "quick" are base forms.' },
    ],
  },
  {
    id: 'ciclovia',
    title: 'Text B — La Ciclovía',
    topic: 'Culture & Community · Bogotá, Colombia',
    parts: [
      'Every Sunday, Bogotá holds one of its most ', 0, ' community events: the Ciclovía. For several hours, the city closes over 120 ', 1, ' of roads to motor vehicles. Thousands of ', 2, ' and individuals take to the streets on bicycles, skateboards, and on foot. The event is completely ', 3, ' to the public, meaning anyone can participate without paying. Participants use the opportunity to ', 4, ', enjoy the fresh air, and connect with their neighbours. Along the route, it is possible to ', 5, ' bicycles if you do not own one. The streets remain ', 6, ' to cars until early afternoon, when the roads return to normal. The Ciclovía has become a symbol of the ', 7, ', showing that Bogotá is much more than a busy metropolis.',
    ],
    questions: [
      { opts: ['popular', 'ordinary', 'expensive', 'private'], a: 0, fb: '"Most popular" — the Ciclovía is celebrated and widely attended. "Ordinary" (= common, unremarkable) contradicts the positive tone of the passage.' },
      { opts: ['metres', 'kilometres', 'streets', 'blocks'], a: 1, fb: '"120 kilometres" — a distance measurement fits "of roads". "Streets" would need a different structure ("120 streets"), "blocks" is too vague for this scale.' },
      { opts: ['tourists', 'drivers', 'families', 'workers'], a: 2, fb: '"Families and individuals" — a logical pairing: family groups + solo participants. All of them cycle, skate or walk together.' },
      { opts: ['open', 'free', 'safe', 'easy'], a: 1, fb: '"Completely free to the public" — the clue is "without paying". "Open" is grammatically possible but "free" specifically matches the no-cost meaning.' },
      { opts: ['sleep', 'exercise', 'study', 'drive'], a: 1, fb: '"Opportunity to exercise" — cycling, skating, and walking are all physical exercise. The mention of "fresh air" reinforces the outdoor activity context.' },
      { opts: ['buy', 'repair', 'rent', 'sell'], a: 2, fb: '"Rent bicycles" — you borrow a bike for a fee if you do not own one. "Buy" would be a purchase, not a temporary loan for the event.' },
      { opts: ['open', 'closed', 'empty', 'narrow'], a: 1, fb: '"Streets remain closed to cars" — the Ciclovía closes roads to motor vehicles. They stay closed until early afternoon.' },
      { opts: ['country', 'city', 'region', 'neighbourhood'], a: 1, fb: '"Symbol of the city" — Bogotá is a city (not a country or neighbourhood), and the Ciclovía represents its urban identity and culture.' },
    ],
  },
  {
    id: 'coffee',
    title: 'Text C — Colombian Coffee',
    topic: 'Agriculture & Economy · Colombia',
    parts: [
      'Colombia is internationally ', 0, ' for producing some of the finest coffee in the world. The country\'s diverse ', 1, ' and mountain climate create ideal ', 2, ' for growing the Arabica bean. Unlike many coffee-producing nations, Colombia ', 3, ' its coffee by hand, a method that ensures only the ripest cherries are picked. This careful ', 4, ' to harvesting is one reason Colombian coffee ', 5, ' such a high price on global markets. The industry ', 6, ' employment for over half a million farming families. In recent years, coffee tourism has also grown in ', 7, ', attracting visitors who wish to experience the process from crop to cup.',
    ],
    questions: [
      { opts: ['famous', 'known', 'noticed', 'celebrated'], a: 1, fb: '"Internationally known for" — the fixed collocation is "known for" (famous for is also possible, but "internationally known" is the more formal/academic phrasing used in FCE texts).' },
      { opts: ['scenery', 'geography', 'landscape', 'territory'], a: 2, fb: '"Diverse landscape" — refers to the varied physical terrain. "Landscape" collocates naturally with "diverse" and mountain contexts.' },
      { opts: ['conditions', 'occasions', 'situations', 'positions'], a: 0, fb: '"Ideal conditions for growing" — "conditions" is the correct collocation for environmental/agricultural contexts.' },
      { opts: ['plants', 'picks', 'harvests', 'grows'], a: 1, fb: '"Colombia picks its coffee by hand" — the text is about hand-picking (selecting ripe cherries). "Picks" refers to the manual selection action.' },
      { opts: ['attitude', 'approach', 'access', 'attempt'], a: 1, fb: '"Careful approach to harvesting" — "approach" collocates with "careful" to mean a method or way of doing something.' },
      { opts: ['demands', 'earns', 'charges', 'fetches'], a: 3, fb: '"Fetches a high price" — "fetch" means to sell for/obtain a particular price, a common collocation in economic contexts.' },
      { opts: ['provides', 'makes', 'gives', 'creates'], a: 0, fb: '"Industry provides employment" — "provide employment" is the natural collocation (create employment is also possible, but "provide" is most common).' },
      { opts: ['popularity', 'demand', 'importance', 'fame'], a: 0, fb: '"Grown in popularity" — the fixed phrase is "grow in popularity" meaning to become more popular.' },
    ],
  },
];

/* ─── Word Formation Data ─── */
const WORD_FORM: WFSet[] = [
  {
    id: 'ai_education',
    title: 'Passage 1 — AI in Education',
    topic: 'Technology & Learning',
    passage: 'Artificial intelligence is bringing about a (1)_____ [TRANSFORM] in the way students learn. Personalised learning platforms can now adapt to the (2)_____ [INDIVIDUAL] needs of each student, offering a level of (3)_____ [FLEXIBLE] that traditional classrooms cannot match. Teachers, however, remain (4)_____ [REPLACE] in areas such as emotional support and critical thinking development. The (5)_____ [INTRODUCE] of AI tools has also raised concerns about (6)_____ [DEPEND] on technology and the risk of students losing basic skills. Despite these (7)_____ [CONCERN], most (8)_____ [EDUCATE] believe that AI, when used wisely, can be a powerful complement to traditional teaching.',
    questions: [
      { ctx: 'bringing about a (1)_____ in the way', base: 'TRANSFORM', opts: ['transform', 'transformation', 'transforming', 'transformed'], a: 1, fb: 'TRANSFORM → transformation (noun). "A ___" needs a noun. The suffix -ation creates a noun from a verb.' },
      { ctx: 'adapt to the (2)_____ needs of each student', base: 'INDIVIDUAL', opts: ['individual', 'individually', 'individualism', 'individuality'], a: 0, fb: 'INDIVIDUAL → individual (adjective). "The ___ needs" — an adjective is needed before the noun "needs". No change required here.' },
      { ctx: 'offering a level of (3)_____', base: 'FLEXIBLE', opts: ['flexible', 'flexibly', 'flexibility', 'inflexible'], a: 2, fb: 'FLEXIBLE → flexibility (noun). "A level of ___" requires a noun. The suffix -ity converts an adjective to a noun.' },
      { ctx: 'teachers, however, remain (4)_____', base: 'REPLACE', opts: ['replaceable', 'irreplaceable', 'replacement', 'replacing'], a: 1, fb: 'REPLACE → irreplaceable (adjective with negative prefix ir-). Teachers cannot be replaced, so the negative prefix ir- is essential.' },
      { ctx: 'the (5)_____ of AI tools', base: 'INTRODUCE', opts: ['introduce', 'introductory', 'introduction', 'introducing'], a: 2, fb: 'INTRODUCE → introduction (noun). "The ___ of AI tools" — "the" + noun structure. The suffix -tion creates a noun from a verb.' },
      { ctx: 'concerns about (6)_____ on technology', base: 'DEPEND', opts: ['depend', 'dependent', 'dependence', 'independently'], a: 2, fb: 'DEPEND → dependence (noun). "Concerns about ___" — a noun is needed after the preposition "about". The suffix -ence creates a noun.' },
      { ctx: 'despite these (7)_____', base: 'CONCERN', opts: ['concern', 'concerns', 'concerned', 'concerning'], a: 1, fb: 'CONCERN → concerns (plural noun). "These ___" — the demonstrative "these" signals a plural noun is needed.' },
      { ctx: 'most (8)_____ believe that AI', base: 'EDUCATE', opts: ['educated', 'education', 'educators', 'educating'], a: 2, fb: 'EDUCATE → educators (agent noun, plural). "Most ___ believe" — a person noun (professionals in education) acting as subject of the verb.' },
    ],
  },
  {
    id: 'renewable_energy',
    title: 'Passage 2 — Renewable Energy',
    topic: 'Environment & Society',
    passage: 'The world\'s (1)_____ [GROW] demand for energy has made renewable sources increasingly important. Solar panels have seen remarkable (2)_____ [IMPROVE] in efficiency over recent years. Their (3)_____ [INSTALL] on rooftops has become far more affordable. Despite the initial (4)_____ [INVEST], most households recover costs within a decade. Governments play an (5)_____ [ESSENCE] role by offering subsidies to encourage adoption. Critics, however, point to the (6)_____ [RELY] of solar energy on sunny weather conditions. A fully renewable system would require greater (7)_____ [STORE] capacity for excess power. Nevertheless, most (8)_____ [SCIENCE] agree that the transition is both possible and (9)_____ [AVOID].',
    questions: [
      { ctx: "the world's (1)_____ demand", base: 'GROW', opts: ['grow', 'growth', 'growing', 'grown'], a: 2, fb: 'GROW → growing (present participle as adjective). "Growing demand" = demand that is increasing. The adjective form modifies the noun "demand".' },
      { ctx: 'seen remarkable (2)_____', base: 'IMPROVE', opts: ['improve', 'improved', 'improvements', 'improvement'], a: 2, fb: 'IMPROVE → improvements (plural noun). "Remarkable ___" needs a noun. Plural because efficiency has improved in multiple ways over the years.' },
      { ctx: 'their (3)_____ on rooftops', base: 'INSTALL', opts: ['install', 'installation', 'installer', 'installed'], a: 1, fb: 'INSTALL → installation (noun). "Their ___" — the possessive pronoun requires a noun. The suffix -ation creates a noun from a verb.' },
      { ctx: 'despite the initial (4)_____', base: 'INVEST', opts: ['invest', 'investor', 'investment', 'investing'], a: 2, fb: 'INVEST → investment (noun). "The initial ___" needs a noun after the article and adjective. The suffix -ment creates a noun.' },
      { ctx: 'play an (5)_____ role', base: 'ESSENCE', opts: ['essence', 'essential', 'essentially', 'essentially'], a: 1, fb: 'ESSENCE → essential (adjective). "An ___ role" — an adjective is needed before the noun "role". The suffix -ial creates an adjective from a noun.' },
      { ctx: 'the (6)_____ of solar energy on', base: 'RELY', opts: ['rely', 'reliable', 'reliance', 'reliability'], a: 2, fb: 'RELY → reliance (noun). "The ___ of solar energy on sunny weather" — after "the" and before "of", a noun is required. "Reliance on" = depending on.' },
      { ctx: 'greater (7)_____ capacity', base: 'STORE', opts: ['store', 'storing', 'storage', 'stored'], a: 2, fb: 'STORE → storage (noun). "Greater ___ capacity" — a noun is needed as part of the compound noun phrase "storage capacity".' },
      { ctx: 'most (8)_____ agree that', base: 'SCIENCE', opts: ['science', 'scientific', 'scientist', 'scientists'], a: 3, fb: 'SCIENCE → scientists (plural noun, person). "Most ___ agree" — a person noun in the plural is needed as the subject of "agree".' },
    ],
  },
];

/* ─── Helpers ─── */
function bs(done: boolean, correct: boolean, selected: boolean) {
  if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
  if (correct) return { background: 'rgba(5,150,105,0.1)', border: `1px solid ${CG}`, color: CG };
  if (selected) return { background: 'rgba(220,38,38,0.08)', border: `1px solid ${CR}`, color: CR };
  return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
}

/* ─── Main Component ─── */
export default function UsoDelIdioma() {
  const [tab, setTab] = useState<'cloze' | 'wordform'>('cloze');
  const [clozeIdx, setClozeIdx] = useState(0);
  const [wfIdx, setWfIdx] = useState(0);

  const [clozeAns, setClozeAns] = useState<Record<string, Record<number, number>>>({});
  const [wfAns, setWfAns] = useState<Record<string, Record<number, number>>>({});

  const cs = CLOZE[clozeIdx];
  const ws = WORD_FORM[wfIdx];
  const csAns = clozeAns[cs.id] ?? {};
  const wsAns = wfAns[ws.id] ?? {};

  function setClozeQ(qi: number, oi: number) {
    if (csAns[qi] !== undefined) return;
    setClozeAns(prev => ({ ...prev, [cs.id]: { ...(prev[cs.id] ?? {}), [qi]: oi } }));
  }
  function setWFQ(qi: number, oi: number) {
    if (wsAns[qi] !== undefined) return;
    setWfAns(prev => ({ ...prev, [ws.id]: { ...(prev[ws.id] ?? {}), [qi]: oi } }));
  }

  const csAnswered = cs.questions.filter((_, i) => csAns[i] !== undefined).length;
  const wsAnswered = ws.questions.filter((_, i) => wsAns[i] !== undefined).length;
  const csCorrect = cs.questions.filter((q, i) => csAns[i] === q.a).length;
  const wsCorrect = ws.questions.filter((q, i) => wsAns[i] === q.a).length;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 920 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés</Link>
          <span>/</span>
          <Link href="/practica/ingles/b2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>B2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>Use of English</span>
        </div>

        {/* Header */}
        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Inglés B2 — FCE / ICFES</p>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.3rem', color: 'var(--ink)' }}>
          Use of English — Práctica dirigida
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 1.75rem', lineHeight: 1.6, maxWidth: 600 }}>
          Dos tipos de ejercicio que aparecen en el FCE B2 y el ICFES Saber 11. Selecciona la sección donde más necesitas practicar.
        </p>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${C}33`, width: 'fit-content' }}>
          {([['cloze', '📖 Multiple Choice Cloze', 'FCE Part 1 · ICFES Reading'], ['wordform', '🔤 Word Formation', 'FCE Part 3']] as const).map(([key, label, sub]) => (
            <button key={key} onClick={() => setTab(key as 'cloze' | 'wordform')}
              style={{ padding: '0.6rem 1.2rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', textAlign: 'left',
                background: tab === key ? C : 'transparent',
                color: tab === key ? '#fff' : 'var(--muted)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{label}</div>
              <div style={{ fontSize: '0.68rem', opacity: 0.8, fontFamily: 'var(--mono)' }}>{sub}</div>
            </button>
          ))}
        </div>

        {/* ─── CLOZE SECTION ─── */}
        {tab === 'cloze' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Read the text. Choose the word (A, B, C or D) that best fits each numbered blank.
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
                {CLOZE.map((s, i) => (
                  <button key={s.id} onClick={() => setClozeIdx(i)}
                    style={{ padding: '0.3rem 0.7rem', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                      background: clozeIdx === i ? C : 'var(--bg-2)',
                      border: `1.5px solid ${clozeIdx === i ? C : 'var(--line-soft)'}`,
                      color: clozeIdx === i ? '#fff' : 'var(--muted)' }}>
                    {s.title.split('—')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '1rem 1.4rem', borderRadius: 14, background: 'rgba(0,0,0,0.025)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>{cs.topic}</div>
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{cs.title}</h2>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--ink)' }}>
                {cs.parts.map((part, pi) => {
                  if (typeof part === 'string') return <span key={pi}>{part}</span>;
                  const qi = part;
                  const ans = csAns[qi];
                  const done = ans !== undefined;
                  const correct = done && ans === cs.questions[qi].a;
                  return (
                    <span key={pi} style={{ display: 'inline-block', minWidth: 80, margin: '0 2px', padding: '0 4px', borderRadius: 5, fontWeight: 800, fontSize: '0.88rem', textAlign: 'center',
                      background: done ? (correct ? 'rgba(5,150,105,0.12)' : 'rgba(220,38,38,0.1)') : `${C}18`,
                      color: done ? (correct ? CG : CR) : C,
                      border: `1.5px solid ${done ? (correct ? CG : CR) : C}`,
                      textDecoration: 'underline', textDecorationColor: done ? (correct ? CG : CR) : C }}>
                      {done ? cs.questions[qi].opts[ans] : `(${qi + 1})`}
                    </span>
                  );
                })}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                {csAnswered}/{cs.questions.length} respondidas
                {csAnswered === cs.questions.length && <span style={{ marginLeft: '0.5rem', color: CG, fontWeight: 700 }}>· {csCorrect}/{cs.questions.length} correctas</span>}
              </div>
              {csAnswered === cs.questions.length && clozeIdx < CLOZE.length - 1 && (
                <button className="btn btn-sm btn-ghost" onClick={() => setClozeIdx(i => i + 1)} style={{ fontSize: '0.8rem' }}>
                  Siguiente texto →
                </button>
              )}
            </div>

            {cs.questions.map((q, qi) => {
              const ans = csAns[qi]; const done = ans !== undefined;
              return (
                <div key={qi} style={{ marginBottom: '0.9rem', padding: '0.85rem 1rem', borderRadius: 12,
                  border: `1.5px solid ${done ? (ans === q.a ? '#05966933' : '#dc262633') : 'var(--line-soft)'}`,
                  background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontFamily: 'var(--mono)', fontSize: '0.82rem', color: C, minWidth: 26 }}>({qi + 1})</span>
                    <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', flex: 1 }}>
                      {q.opts.map((opt, oi) => {
                        const st = bs(done, oi === q.a, ans === oi);
                        return (
                          <button key={oi} onClick={() => setClozeQ(qi, oi)} disabled={done}
                            style={{ padding: '0.4rem 1rem', borderRadius: 8, fontSize: '0.88rem', fontWeight: 700, ...st,
                              cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s', minWidth: 70 }}>
                            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.7 }}>{['A', 'B', 'C', 'D'][oi]}.{' '}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {done && (
                    <div style={{ marginTop: '0.45rem', marginLeft: '2.5rem', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5, padding: '0.3rem 0.5rem', borderRadius: 6,
                      background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)' }}>
                      {ans === q.a ? '✅ ' : `✗ Answer: "${q.opts[q.a]}". `}{q.fb}
                    </div>
                  )}
                </div>
              );
            })}

            {csAnswered === cs.questions.length && (
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', borderRadius: 14, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>
                  {csCorrect === cs.questions.length ? '🏆' : csCorrect >= 6 ? '⭐' : '📖'}
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>
                  {csCorrect} / {cs.questions.length}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--muted)' }}>
                  {csCorrect === cs.questions.length ? 'Perfect! Full marks on this text.' : csCorrect >= 6 ? 'Good work. Review the items you missed.' : 'Keep practising — re-read the explanations above.'}
                </div>
                {clozeIdx < CLOZE.length - 1 && (
                  <button className="btn btn-sm" onClick={() => setClozeIdx(i => i + 1)} style={{ marginTop: '0.85rem', background: C, borderColor: C }}>
                    Next text →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── WORD FORMATION SECTION ─── */}
        {tab === 'wordform' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Use the base word in brackets to form a word that fits each gap.
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
                {WORD_FORM.map((s, i) => (
                  <button key={s.id} onClick={() => setWfIdx(i)}
                    style={{ padding: '0.3rem 0.7rem', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                      background: wfIdx === i ? '#7c3aed' : 'var(--bg-2)',
                      border: `1.5px solid ${wfIdx === i ? '#7c3aed' : 'var(--line-soft)'}`,
                      color: wfIdx === i ? '#fff' : 'var(--muted)' }}>
                    Passage {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '1rem 1.4rem', borderRadius: 14, background: 'rgba(0,0,0,0.025)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>{ws.topic}</div>
              <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{ws.title}</h2>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.85, color: 'var(--ink)' }}>{ws.passage}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                {wsAnswered}/{ws.questions.length} respondidas
                {wsAnswered === ws.questions.length && <span style={{ marginLeft: '0.5rem', color: CG, fontWeight: 700 }}>· {wsCorrect}/{ws.questions.length} correctas</span>}
              </div>
            </div>

            {ws.questions.map((q, qi) => {
              const ans = wsAns[qi]; const done = ans !== undefined;
              return (
                <div key={qi} style={{ marginBottom: '1rem', padding: '1rem 1.1rem', borderRadius: 12,
                  border: `1.5px solid ${done ? (ans === q.a ? '#05966933' : '#dc262633') : 'var(--line-soft)'}`,
                  background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)' }}>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontFamily: 'var(--mono)', fontSize: '0.82rem', color: '#7c3aed', minWidth: 26 }}>({qi + 1})</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.6 }}>&ldquo;{q.ctx}&rdquo;</span>
                      {' '}
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 800, color: '#7c3aed', background: 'rgba(124,58,237,0.08)', padding: '0.1rem 0.45rem', borderRadius: 5 }}>[{q.base}]</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', paddingLeft: '2rem' }}>
                    {q.opts.map((opt, oi) => {
                      const st = bs(done, oi === q.a, ans === oi);
                      const stC = done ? (oi === q.a ? '#7c3aed' : (ans === oi ? CR : 'var(--muted)')) : '#7c3aed';
                      return (
                        <button key={oi} onClick={() => setWFQ(qi, oi)} disabled={done}
                          style={{ padding: '0.4rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', fontWeight: 700,
                            ...st,
                            border: done ? (oi === q.a ? `1px solid #7c3aed` : (ans === oi ? `1px solid ${CR}` : '1px solid var(--line-soft)')) : '1px solid #7c3aed44',
                            color: stC,
                            background: done ? (oi === q.a ? 'rgba(124,58,237,0.1)' : (ans === oi ? 'rgba(220,38,38,0.08)' : 'var(--bg-2)')) : 'var(--bg-2)',
                            cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                          {opt}{done && oi === q.a && ' ✓'}
                        </button>
                      );
                    })}
                  </div>
                  {done && (
                    <div style={{ marginTop: '0.5rem', marginLeft: '2rem', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55, padding: '0.35rem 0.5rem', borderRadius: 6,
                      background: ans === q.a ? 'rgba(124,58,237,0.06)' : 'rgba(220,38,38,0.07)' }}>
                      {ans === q.a ? '✅ ' : `✗ Answer: "${q.opts[q.a]}". `}{q.fb}
                    </div>
                  )}
                </div>
              );
            })}

            {wsAnswered === ws.questions.length && (
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', borderRadius: 14, border: '2px solid rgba(124,58,237,0.25)', background: 'rgba(124,58,237,0.04)', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>
                  {wsCorrect === ws.questions.length ? '🏆' : wsCorrect >= 6 ? '⭐' : '📖'}
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>
                  {wsCorrect} / {ws.questions.length}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--muted)' }}>
                  {wsCorrect === ws.questions.length ? 'Excellent! You know your word forms.' : wsCorrect >= 6 ? 'Good. Review the explanations for any mistakes.' : 'Focus on prefixes, suffixes and word classes — they are the key to word formation.'}
                </div>
                {wfIdx < WORD_FORM.length - 1 && (
                  <button className="btn btn-sm" onClick={() => setWfIdx(i => i + 1)} style={{ marginTop: '0.85rem', background: '#7c3aed', borderColor: '#7c3aed' }}>
                    Next passage →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer tip */}
        <div style={{ marginTop: '2.5rem', padding: '0.85rem 1.1rem', borderRadius: 12, background: 'rgba(3,105,161,0.05)', border: '1px solid rgba(3,105,161,0.15)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>FCE Tip:</strong> En el <strong>Multiple Choice Cloze</strong>, las 4 opciones suelen ser palabras de la misma categoría gramatical. La clave es la <em>colocación</em> (collocation) y el significado en contexto. En <strong>Word Formation</strong>, identifica primero la categoría gramatical que necesita el hueco (¿sustantivo? ¿adjetivo?) y luego aplica el afijo correcto.
        </div>
      </div>
    </section>
  );
}
