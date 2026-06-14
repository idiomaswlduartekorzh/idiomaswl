'use client';
import { useState } from 'react';
import Link from 'next/link';

const BAND_COMPARE = {
  prompt: 'In many countries, students are under increasing pressure to succeed academically. Some argue this negatively affects their health. To what extent do you agree or disagree?',
  band56: {
    text: 'Nowadays, many students around the world are facing a lot of academic pressure. This has both positive and negative effects on their health. In this essay, I will discuss both sides of this argument and give my opinion.',
    problems: [
      '"Nowadays" — el opener más sobreusado del IELTS. Los examinadores lo ven miles de veces.',
      '"I will discuss both sides" — este ensayo pide OPINIÓN, no discusión. Señalar "ambos lados" es un error de tipo de ensayo.',
      'Sin tesis — "give my opinion" no DICE cuál es la opinión. El examinador necesita saber tu posición desde la primera oración.',
      '"Positive and negative" para un ensayo de Opinión — implica que no tomas partido.',
    ],
  },
  band78: {
    text: 'Academic competition has intensified dramatically in many education systems, placing students under considerable psychological and physical strain. I firmly agree that this mounting pressure is detrimental to the overall wellbeing of young people, and that structural reform in education is urgently required.',
    strengths: [
      'Empieza con el contenido directamente — paráfrasis sustantiva, sin clichés.',
      'Tesis específica e inmediata: "I firmly agree that..." con dos sub-argumentos anunciados.',
      'Registro académico: "intensified dramatically", "considerable strain", "structural reform".',
      'Una oración de paráfrasis + una de tesis = estructura perfecta (≤60 palabras).',
    ],
  },
};

const PHRASE_BANK = {
  paraphrase: [
    { tech: 'Verbo principal', ex: 'shows → illustrates / reveals / highlights / suggests' },
    { tech: 'Sustantivos', ex: 'people → individuals / society / the public / residents' },
    { tech: 'Adjetivos', ex: 'important → crucial / vital / significant / pressing' },
    { tech: 'Estructura', ex: '"Many believe X" → "X is widely held" (activa → pasiva)' },
    { tech: 'NUNCA cambiar', ex: 'números, nombres propios, fechas, términos técnicos' },
  ],
  thesis: {
    'Opinión': ['I firmly believe that...', 'I am convinced that...', 'I strongly agree/disagree that...', 'In my view,...'],
    'Discusión': ['While both views have merit, I believe...', 'This essay will examine both perspectives before arguing that...'],
    'Problema-Solución': ['This essay will examine the causes before proposing...', 'After identifying the root causes, this essay will suggest...'],
    'Dos preguntas': ['This essay will first explore [Q1] before assessing whether [Q2]...'],
  },
};

interface Exercise {
  type: string; prompt: string;
  models: { paraphrase: string; thesis: string; wc: number }[];
  checklist: { label: string; auto?: (t: string, orig: string) => boolean }[];
  hint: string;
}

const EXERCISES: Exercise[] = [
  {
    type: 'Opinión',
    prompt: 'In many countries, students are under increasing pressure to succeed academically. Some argue this has a negative effect on their physical and mental health. To what extent do you agree or disagree?',
    models: [
      { paraphrase: 'Academic competition has intensified dramatically in many education systems, placing students under considerable psychological and physical strain.', thesis: 'I firmly agree that this mounting pressure is detrimental to the overall wellbeing of young people, and that structural reform in education is urgently required.', wc: 44 },
      { paraphrase: 'The intensification of academic demands in schools and universities worldwide has prompted growing concern about the wellbeing of young learners.', thesis: 'I strongly agree that this relentless pressure is harmful, and that educational systems must prioritise mental health alongside academic achievement.', wc: 43 },
    ],
    checklist: [
      { label: 'Máximo 70 palabras', auto: (t) => t.trim().split(/\s+/).filter(Boolean).length <= 70 },
      { label: 'No copies frases de 5+ palabras del original', auto: (t, o) => !hasCopied(o, t) },
      { label: 'Contiene tesis clara con tu posición', auto: (t) => /\b(agree|disagree|believe|convinced|firmly|strongly)\b/i.test(t) },
      { label: 'No empieza con "Nowadays" ni "In today\'s world"', auto: (t) => !/^(nowadays|in today)/i.test(t.trim()) },
    ],
    hint: 'Tu introducción para Opinión debe tener: (1) paráfrasis del tema sin copiar el enunciado, (2) tesis que indica claramente si estás de acuerdo o en desacuerdo. No uses "I will discuss both sides" — eso es para Discusión.',
  },
  {
    type: 'Discusión',
    prompt: 'Some people think parents should restrict how much time children spend on smartphones. Others believe children should be free to manage their own digital lives. Discuss both views and give your own opinion.',
    models: [
      { paraphrase: 'The question of whether parents should regulate their children\'s smartphone usage or allow them to self-manage their digital habits has become an increasingly contentious issue.', thesis: 'While both perspectives have certain merits, I believe that some degree of parental oversight is essential, particularly for younger children who lack the maturity to make informed choices.', wc: 55 },
      { paraphrase: 'Debate continues over whether parents bear a responsibility to limit children\'s screen time or whether young people should develop their own digital self-regulation.', thesis: 'This essay will examine both positions before arguing that a balanced approach — guided parental involvement combined with growing child autonomy — is the most effective strategy.', wc: 53 },
    ],
    checklist: [
      { label: 'Máximo 70 palabras', auto: (t) => t.trim().split(/\s+/).filter(Boolean).length <= 70 },
      { label: 'No copies frases del original', auto: (t, o) => !hasCopied(o, t) },
      { label: 'Anticipa cubrir AMBAS posturas (sin revelar cuál)', auto: (t) => /\b(both|two|perspectives?|views?|sides?|examine)\b/i.test(t) },
      { label: 'Tu opinión está anunciada (aunque sea brevemente)', auto: (t) => /\b(believe|think|argue|my view|opinion)\b/i.test(t) },
    ],
    hint: 'En Discusión, la intro debe anticipar que cubrirás AMBAS posturas Y que darás tu opinión. Evita revelar demasiado sobre tu posición — guárdala para la conclusión. Una buena fórmula: "This essay will examine both perspectives before arguing that..."',
  },
  {
    type: 'Problema-Solución',
    prompt: 'Traffic congestion in many cities has become severely problematic, causing significant delays and environmental damage. What are the main causes of this problem, and what measures can governments take to address it?',
    models: [
      { paraphrase: 'Urban traffic congestion has reached crisis levels in numerous cities worldwide, creating substantial economic costs and environmental harm.', thesis: 'This essay will examine the primary causes of this gridlock before proposing targeted governmental interventions that could meaningfully reduce it.', wc: 40 },
      { paraphrase: 'The problem of severe road congestion has become an increasingly urgent challenge for urban planners and governments in many parts of the world.', thesis: 'After identifying the key drivers of this issue, this essay will suggest a combination of infrastructure investment and demand-management policies as the most effective response.', wc: 47 },
    ],
    checklist: [
      { label: 'Máximo 70 palabras', auto: (t) => t.trim().split(/\s+/).filter(Boolean).length <= 70 },
      { label: 'No copies frases del original', auto: (t, o) => !hasCopied(o, t) },
      { label: 'Anuncia estructura (causas + soluciones)', auto: (t) => /\b(causes?|reasons?|solutions?|measures?|examine|propose|suggest|address)\b/i.test(t) },
      { label: 'No adelanta tu posición personal (solo describe el ensayo)', auto: () => true },
    ],
    hint: 'En Problema-Solución, la tesis no necesita expresar una opinión personal — debe anunciar la estructura: "This essay will examine the causes before proposing solutions." No copies el enunciado ni uses las mismas palabras para las causas y soluciones.',
  },
  {
    type: 'Dos preguntas',
    prompt: 'In many countries, more people are choosing to live alone rather than with family or partners. Why is this becoming increasingly common? Do you think this is a positive or negative development?',
    models: [
      { paraphrase: 'The trend towards single-person households has accelerated significantly in recent decades, particularly in developed nations where changing social norms and economic factors have reshaped living arrangements.', thesis: 'This essay will first explore the social and economic forces driving this shift before assessing whether it ultimately represents a positive or negative development for society.', wc: 52 },
      { paraphrase: 'An increasing proportion of people across many societies are opting to live independently, a demographic shift that raises important questions about its underlying causes and broader implications.', thesis: 'After examining the reasons behind this trend, this essay will argue that while individual autonomy is enhanced, the long-term social consequences are cause for concern.', wc: 49 },
    ],
    checklist: [
      { label: 'Máximo 70 palabras', auto: (t) => t.trim().split(/\s+/).filter(Boolean).length <= 70 },
      { label: 'No copies frases del original', auto: (t, o) => !hasCopied(o, t) },
      { label: 'Anuncia que responderás LAS DOS preguntas', auto: (t) => /\b(first|then|before|both|two|reasons?|causes?|positive|negative|assess|evaluate)\b/i.test(t) },
      { label: 'No das la respuesta completa a Q2 en la intro', auto: () => true },
    ],
    hint: 'En Dos preguntas, tu tesis debe anunciar que abordarás AMBAS preguntas: "This essay will first examine WHY [Q1] before considering WHETHER this is positive or negative [Q2]." No respondas Q2 completamente en la intro — guárdalo para el Body 2.',
  },
  {
    type: 'Fix-it',
    prompt: 'Some people think the most effective way to reduce crime is to give longer prison sentences to offenders. Others believe that there are better alternative approaches. Discuss both views and give your own opinion.',
    models: [
      { paraphrase: 'The debate over whether harsher custodial sentences or alternative rehabilitation strategies most effectively reduce criminal behaviour has long divided criminologists and policy-makers alike.', thesis: 'While longer prison terms may serve as a deterrent for certain types of crime, I believe that evidence-based rehabilitation programmes offer a more sustainable and humane approach to reducing reoffending.', wc: 57 },
      { paraphrase: 'The question of how best to reduce crime — through punitive sentencing or rehabilitative alternatives — remains one of the most contested issues in criminal justice policy worldwide.', thesis: 'This essay will examine both positions before arguing that a combination of proportionate sentencing and structured rehabilitation represents the most effective long-term strategy.', wc: 50 },
    ],
    checklist: [
      { label: 'Máximo 70 palabras', auto: (t) => t.trim().split(/\s+/).filter(Boolean).length <= 70 },
      { label: 'No copies frases del original', auto: (t, o) => !hasCopied(o, t) },
      { label: 'Anticipa cubrir ambas posturas', auto: (t) => /\b(both|two|perspectives?|views?|sides?|examine)\b/i.test(t) },
      { label: 'Sin clichés de apertura ("Nowadays", "In today\'s world", "It is a fact that")', auto: (t) => !/^(nowadays|in today|it is a fact|in the modern|in recent years, many)/i.test(t.trim()) },
    ],
    hint: 'Esta intro tiene varios problemas clásicos. Para identificarlos, pregúntate: (1) ¿El primer enunciado parafrasea sin copiar? (2) ¿La tesis dice algo específico? (3) ¿Hay clichés? (4) ¿El tipo de ensayo es correcto?',
  },
];

const BAD_INTRO = 'Nowadays, crime is a big problem in many countries. Some people think long prison sentences are the solution, while other people think there are other ways to solve this. In this essay, I will discuss both views and say which is better in my opinion.';
const BAD_PROBLEMS = [
  '"Nowadays" — cliché de apertura reconocible desde 10 metros por cualquier examinador IELTS.',
  '"think long prison sentences are the solution, while other people think" — plagio casi literal del enunciado (solo cambió "others believe" por "other people think").',
  '"In this essay, I will discuss" — nunca uses esta fórmula. Anuncia el proceso, no la sustancia.',
  'Sin tesis — "say which is better" no dice cuál. El examinador necesita tu posición ahora.',
];

function wc(t: string) { return t.trim().split(/\s+/).filter(Boolean).length; }
function hasCopied(original: string, user: string): boolean {
  const ow = original.toLowerCase().split(/\s+/);
  const u = user.toLowerCase();
  for (let i = 0; i <= ow.length - 5; i++) {
    if (u.includes(ow.slice(i, i + 5).join(' '))) return true;
  }
  return false;
}

export default function IntroduccionTask2Client() {
  const [showBank, setShowBank] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [exIdx, setExIdx] = useState(0);
  const [text, setText] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [badProblemsFound, setBadProblemsFound] = useState<boolean[]>([false, false, false, false]);

  const ex = EXERCISES[exIdx];
  const isFix = ex.type === 'Fix-it';
  const count = wc(text);

  const checkResults = revealed || attempt > 0 ? ex.checklist.map(c => c.auto ? c.auto(text, ex.prompt) : true) : [];
  const passed = checkResults.filter(Boolean).length;
  const failed = checkResults.filter(v => !v).length;

  function submit() {
    if (attempt === 0) { setAttempt(1); }
    else { setRevealed(true); }
  }

  function nextEx() {
    setExIdx(i => (i + 1) % EXERCISES.length);
    setText(''); setAttempt(0); setRevealed(false);
    setBadProblemsFound([false, false, false, false]);
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Introducción</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />✍️ Sub-habilidad 2</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Introducción: Paraphrase + Thesis</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            La introducción del Task 2 tiene dos oraciones: (1) paráfrasis del tema sin copiar y (2) tesis que expresa tu posición o enfoque. Máximo 70 palabras. Un examinador juzga tu nivel en las primeras 10 segundos de lectura.
          </p>

          {/* Band comparison toggle */}
          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => setShowCompare(v => !v)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>📊 Band 5–6 vs Band 7–8 — comparación de introducción</p>
              <span style={{ color: 'var(--muted)' }}>{showCompare ? '▲' : '▼'}</span>
            </div>
            {showCompare && (
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Band 5–6</p>
                  <div style={{ padding: '0.85rem', borderRadius: 9, background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)', marginBottom: '0.5rem' }}>
                    <p style={{ margin: 0, fontSize: '0.87rem', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{BAND_COMPARE.band56.text}&rdquo;</p>
                  </div>
                  {BAND_COMPARE.band56.problems.map((p, i) => (
                    <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', color: '#dc2626', lineHeight: 1.5 }}>✗ {p}</p>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Band 7–8</p>
                  <div style={{ padding: '0.85rem', borderRadius: 9, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '0.5rem' }}>
                    <p style={{ margin: 0, fontSize: '0.87rem', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{BAND_COMPARE.band78.text}&rdquo;</p>
                  </div>
                  {BAND_COMPARE.band78.strengths.map((s, i) => (
                    <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', color: '#059669', lineHeight: 1.5 }}>✓ {s}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phrase bank toggle */}
          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => setShowBank(v => !v)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>📖 Banco de frases — paráfrasis + tesis</p>
              <span style={{ color: 'var(--muted)' }}>{showBank ? '▲' : '▼'}</span>
            </div>
            {showBank && (
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.5rem' }}>Técnicas de paráfrasis</p>
                  {PHRASE_BANK.paraphrase.map((p, i) => (
                    <div key={i} style={{ marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>{p.tech}: </span>
                      <span style={{ fontSize: '0.78rem', color: '#0f3d8c', fontFamily: 'var(--mono)' }}>{p.ex}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.5rem' }}>Tesis por tipo</p>
                  {Object.entries(PHRASE_BANK.thesis).map(([type, phrases]) => (
                    <div key={type} style={{ marginBottom: '0.5rem' }}>
                      <p style={{ margin: '0 0 0.2rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)' }}>{type}</p>
                      {phrases.map((ph, i) => <p key={i} style={{ margin: '0 0 0.1rem', fontSize: '0.78rem', color: '#7c3aed', fontFamily: 'var(--mono)' }}>{ph}</p>)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((exIdx + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>Ejercicio {exIdx + 1}/{EXERCISES.length} — {ex.type}</span>
          </div>

          {/* Fix-it exercise: bad intro to analyze */}
          {isFix && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid #dc2626', marginBottom: '0.85rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Intro Band 5 — identifica los problemas</p>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{BAD_INTRO}&rdquo;</p>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', margin: '0 0 0.5rem' }}>Haz clic en los problemas que identifiques:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {BAD_PROBLEMS.map((prob, i) => (
                    <button key={i} onClick={() => setBadProblemsFound(p => p.map((v, j) => j === i ? !v : v))}
                      style={{ textAlign: 'left', padding: '0.55rem 0.8rem', borderRadius: 8, border: badProblemsFound[i] ? '2px solid #dc2626' : '1.5px solid var(--line-soft)', background: badProblemsFound[i] ? 'rgba(220,38,38,0.07)' : 'var(--bg-2)', cursor: 'pointer', fontSize: '0.83rem', color: badProblemsFound[i] ? '#dc2626' : 'var(--ink-2)', lineHeight: 1.5, transition: 'all 0.15s' }}>
                      {badProblemsFound[i] ? '✓ ' : '○ '}{prob}
                    </button>
                  ))}
                </div>
                {badProblemsFound.filter(Boolean).length === 4 && (
                  <p style={{ margin: '0.75rem 0 0', fontSize: '0.83rem', color: '#059669', fontWeight: 700 }}>¡Correcto! Identificaste los 4 problemas. Ahora reescribe la introducción abajo.</p>
                )}
              </div>
            </div>
          )}

          {/* Prompt */}
          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Enunciado</p>
              <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem', borderRadius: 8, background: 'rgba(15,61,140,0.1)', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 700 }}>{ex.type}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{ex.prompt}&rdquo;</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem' }}>
              {isFix ? 'Tu introducción mejorada:' : 'Tu introducción (paráfrasis + tesis):'}
            </label>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
              placeholder="Paráfrasis del tema... Tesis..."
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.65, resize: 'vertical', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: count > 70 ? '#dc2626' : 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: count > 70 ? 700 : 400 }}>
                {count} palabras {count > 70 ? '— excede límite de 70' : count > 0 ? '(máx. 70)' : ''}
              </span>
              {count > 15 && !revealed && (
                <button className="btn btn-sm" onClick={submit}>
                  {attempt === 0 ? 'Analizar →' : 'Ver modelos →'}
                </button>
              )}
            </div>
          </div>

          {/* Checklist after first submit */}
          {attempt > 0 && !revealed && checkResults.length > 0 && (
            <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.6rem' }}>Análisis automático</p>
              {ex.checklist.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <span style={{ color: checkResults[i] ? '#059669' : '#dc2626', fontWeight: 800, lineHeight: 1.4 }}>{checkResults[i] ? '✓' : '✗'}</span>
                  <span style={{ fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.4 }}>{c.label}</span>
                </div>
              ))}
              {failed > 0 && (
                <div style={{ marginTop: '0.75rem', padding: '0.7rem 0.9rem', borderRadius: 9, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)' }}>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: '#d97706', lineHeight: 1.6 }}><strong>Pista:</strong> {ex.hint}</p>
                </div>
              )}
              {passed === ex.checklist.length && (
                <p style={{ margin: '0.6rem 0 0', fontSize: '0.83rem', color: '#059669', fontWeight: 700 }}>¡Todos los criterios cumplidos! Haz clic en &ldquo;Ver modelos&rdquo; para comparar.</p>
              )}
            </div>
          )}

          {/* Model answers */}
          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', margin: 0 }}>Introducciones modelo Band 7–8</p>
              {ex.models.map((m, i) => (
                <div key={i} className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Modelo {i + 1} — {m.wc} palabras</p>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.85 }}>
                    <span style={{ background: 'rgba(15,61,140,0.1)', borderRadius: 3, padding: '0 2px' }}>{m.paraphrase}</span>
                    {' '}
                    <span style={{ background: 'rgba(5,150,105,0.1)', borderRadius: 3, padding: '0 2px' }}>{m.thesis}</span>
                  </p>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 6, background: 'rgba(15,61,140,0.1)', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 600 }}>azul = paráfrasis</span>
                    <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 6, background: 'rgba(5,150,105,0.1)', color: '#059669', fontFamily: 'var(--mono)', fontWeight: 600 }}>verde = tesis</span>
                  </div>
                </div>
              ))}
              <button className="btn btn-sm" onClick={nextEx} style={{ alignSelf: 'flex-start' }}>
                {exIdx < EXERCISES.length - 1 ? 'Siguiente ejercicio →' : 'Volver al inicio →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
