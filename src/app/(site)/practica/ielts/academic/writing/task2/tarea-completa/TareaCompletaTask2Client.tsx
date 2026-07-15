'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';

type Phase = 'select' | 'plan' | 'write' | 'checklist' | 'rubric' | 'models';

interface Prompt {
  type: string; typeShort: string; prompt: string;
  planHints: string[];
  band6: { text: string; annotations: string[] };
  band8: { text: string; annotations: string[] };
}

const PROMPTS: Prompt[] = [
  {
    type: 'Opinión — To what extent do you agree or disagree?',
    typeShort: 'Opinión',
    prompt: 'Globalisation has had a predominantly negative impact on the world. To what extent do you agree or disagree?',
    planHints: ['¿Acuerdo parcial o total? (evita el 50/50)', 'Body 1: argumento principal a favor/contra', 'Body 2: concesión del lado opuesto + refutación', 'Thesis: restatement en conclusión'],
    band6: {
      text: 'Globalisation is a complex phenomenon that has changed the world in many ways. Some people think it is negative, but I partially disagree with this view.\n\nFirstly, globalisation has created many economic opportunities. Many developing countries such as China and India have experienced rapid economic growth because of international trade. This has helped millions of people to escape from poverty.\n\nHowever, there are some negative effects. For example, local cultures can disappear when global brands and Western media dominate local markets. Traditional customs and languages are being lost in many countries.\n\nIn conclusion, although globalisation has some negative impacts on culture, the economic benefits are very significant. Therefore, I partially disagree with the statement.',
      annotations: [
        '"Complex phenomenon" — vague opening. A Band 6 intro doesn\'t fully paraphrase the prompt.',
        'One specific example (China/India) — good. But no supporting data or elaboration.',
        '"Can disappear" — appropriate hedging but argument feels underdeveloped (only one sentence).',
        'Conclusion doesn\'t synthesise — just restates paragraph topics. No memorable closing observation.',
        'Vocabulary adequate but limited: "many ways", "rapid growth", "very significant" — no Band 7+ lexis.',
      ],
    },
    band8: {
      text: 'The notion that globalisation is predominantly detrimental is one I only partially endorse. While its cultural and economic disruptions are genuine, to characterise its overall impact as negative is to overlook transformative gains in human welfare.\n\nAdmittedly, the cultural homogenisation driven by globalisation poses a credible threat to linguistic diversity and indigenous traditions. The dominance of a handful of global languages — above all English — risks marginalising thousands of minority tongues, many of which encode irreplaceable worldviews and ecological knowledge.\n\nNevertheless, the humanitarian achievements of economic integration are difficult to overstate. The decades following China\'s entry into the global economy saw over 800 million people lifted out of extreme poverty — a rate of progress unprecedented in human history. Moreover, the cross-border flow of medical research and pharmaceutical production enabled a global vaccine rollout during the COVID-19 pandemic that would have been impossible in an era of autarky.\n\nIn conclusion, globalisation\'s cultural costs are real, but its capacity to alleviate material suffering at scale makes a predominantly negative verdict untenable. The imperative is not to reverse integration but to govern it with institutions robust enough to protect what markets cannot.',
      annotations: [
        'Intro immediately takes a nuanced position ("only partially endorse") — sets up a sophisticated argument.',
        '"linguistic diversity", "indigenous traditions", "irreplaceable worldviews" — Band 8 lexical resource.',
        'Specific data: "800 million", "COVID-19 pandemic", "era of autarky" — makes arguments concrete.',
        'Conclusion introduces a policy implication that follows from the argument — not new information.',
        'No repetition between introduction and conclusion — completely different vocabulary for the same idea.',
      ],
    },
  },
  {
    type: 'Discusión — Discuss both views and give your own opinion',
    typeShort: 'Discusión',
    prompt: 'Some people think universities should only accept students who are likely to find employment after graduating. Others believe that access to higher education should be a right for everyone. Discuss both views and give your own opinion.',
    planHints: ['Body 1: View A (empleabilidad) — con puntos de apoyo', 'Body 2: View B (derecho universal) — con puntos de apoyo', 'Tu opinión: puede ir en intro + conclu o al final del Body 2', 'Conclusión: sintetiza AMBAS vistas antes de tu posición final'],
    band6: {
      text: 'There is a debate about who should be allowed to go to university. Some people think universities should focus on employment, while others think everyone has the right to study.\n\nOn one hand, if universities only accept students with good job prospects, this could improve graduate employment rates. Employers would be able to find qualified workers more easily. This would benefit the economy.\n\nOn the other hand, education is a basic human right. Everyone should have the opportunity to develop their knowledge and skills, regardless of their employment prospects. People study for many reasons, not just to get a job.\n\nIn my opinion, I think both views have valid points. Universities should try to balance employment goals with the right to education. In conclusion, this is a difficult issue and there is no easy answer.',
      annotations: [
        'Intro is a paraphrase but adds no engagement — no sense of the complexity.',
        '"This would benefit the economy" — generic consequence. What mechanism? What evidence?',
        '"Education is a basic human right" — stated without support or example.',
        '"Both views have valid points" — classic Band 5 fence-sitting. Own opinion is never clearly stated.',
        'Conclusion ("no easy answer") is the weakest possible ending. Zero synthesis.',
      ],
    },
    band8: {
      text: 'The question of whether universities should function primarily as vocational pipelines or as spaces for broad intellectual development reflects a deeper tension between economic utility and human flourishing.\n\nAdvocates of employment-focused admissions argue that with graduate unemployment rising across many economies, universities bear a responsibility not to burden students with debt for qualifications the market cannot absorb. South Korea\'s surplus of humanities graduates relative to available professional roles illustrates the human cost of misalignment between university output and labour market demand.\n\nConversely, the vision of higher education as a universal right rests on compelling grounds. A democracy populated by critically literate citizens — capable of evaluating evidence, resisting propaganda, and engaging with complex ethical questions — is more resilient than one that merely optimises for short-term productivity. Finland\'s consistently high social trust and civic participation are partly attributed to its broad-access higher education model.\n\nI am persuaded that the right-to-access view is ultimately sounder: a society that permits only market-legible knowledge to be pursued in universities impoverishes both culture and democracy. That said, institutions have a clear duty to provide students with honest data on graduate outcomes before enrolment.\n\nIn conclusion, the utilitarian case for selective admissions deserves serious engagement, but access to higher education should ultimately remain a right, complemented by transparent information about employment prospects.',
      annotations: [
        'Intro frames the debate conceptually ("economic utility vs human flourishing") — immediately Band 8.',
        'View A uses a specific country example (South Korea) with mechanism explained.',
        'View B connects to civic outcomes (Finland) — not just abstract "basic right" claim.',
        'Opinion is clear, argued, and placed before the conclusion — examiner never doubts the position.',
        '"Impoverishes both culture and democracy" — Band 8 vocabulary and conceptual weight.',
      ],
    },
  },
  {
    type: 'Problema-Solución — Causes and measures',
    typeShort: 'Problema-Solución',
    prompt: 'In many cities around the world, the number of older people is increasing rapidly. What problems does this cause and what measures can be taken to deal with these problems?',
    planHints: ['Body 1: 2 problemas + evidencia (sistema de pensiones, cuidado de salud)', 'Body 2: 2 soluciones concretas (inmigración laboral, edad de jubilación)', 'Cada solución debe conectar directamente con un problema del Body 1', 'Conclusión: las soluciones son respuesta directa a los problemas'],
    band6: {
      text: 'The ageing population is a problem in many countries today. This essay will discuss the problems caused by this trend and possible solutions.\n\nOne of the main problems is that there are more old people who need healthcare. Hospitals and medical services will be very busy. Another problem is that pension costs will increase because governments have to pay pensions to more people.\n\nTo solve these problems, governments could encourage immigration. Young workers from other countries can fill the jobs left by older workers. Another solution is to raise the retirement age. If people work longer, they will pay more taxes.\n\nIn conclusion, the ageing population causes problems with healthcare and pensions. However, immigration and raising the retirement age could help to solve these problems.',
      annotations: [
        '"This essay will discuss" — meta-commentary. Tells the examiner what you\'re doing rather than doing it.',
        'Problems are named but not developed: "hospitals will be very busy" — why? how? what data?',
        '"Encourage immigration" — logically sound but mechanically expressed. No country example, no nuance.',
        'Conclusion only lists topics (healthcare + pensions / immigration + retirement age) — no synthesis.',
        'Word choice is consistently basic: "very busy", "more people", "fill the jobs".',
      ],
    },
    band8: {
      text: 'As longevity increases and birth rates decline across developed nations, rapidly ageing urban populations are placing unprecedented strain on the social contracts that underpin modern welfare states.\n\nThe most acute consequence is fiscal: pension systems designed in the mid-twentieth century, when workers outnumbered retirees by ratios of five to one, now face contribution-to-beneficiary ratios approaching two to one in countries such as Japan and Germany. Simultaneously, the disproportionately high healthcare demands of elderly populations — driven by chronic conditions such as dementia and cardiovascular disease — are absorbing growing proportions of national health budgets at the expense of younger demographic groups.\n\nAddressing these pressures requires a dual strategy. First, carefully managed skilled immigration can partially replenish shrinking working-age populations, as Canada\'s points-based system has demonstrated — attracting workers specifically matched to labour shortages in healthcare and engineering. Second, phased increases in statutory retirement ages, linked to life expectancy indices rather than fixed thresholds, align incentives with demographic reality without imposing blunt austerity.\n\nIn conclusion, demographic ageing is not a problem that admits of a single solution, but a combination of strategic immigration policy and dynamically adjusted retirement frameworks offers the most credible path to fiscal sustainability without sacrificing social solidarity.',
      annotations: [
        '"Social contracts that underpin modern welfare states" — Band 8 conceptual framing in the intro.',
        'Specific data: "five to one" and "two to one" ratios make the fiscal problem concrete and credible.',
        'Canada\'s points-based system — specific country example with mechanism (matched to shortages).',
        'Solutions are symmetrically structured to solve the problems named in Body 1.',
        'Conclusion introduces "social solidarity" — a value-laden synthesising phrase, not a new argument.',
      ],
    },
  },
  {
    type: 'Dos preguntas — Two-part question',
    typeShort: 'Dos preguntas',
    prompt: 'In recent decades, the number of people choosing to live in cities has risen dramatically worldwide. Why do people move to cities? Is this a positive or negative development?',
    planHints: ['Cada párrafo del cuerpo debe responder UNA de las dos preguntas', 'Body 1: por qué (2 razones claras)', 'Body 2: ¿positivo o negativo? — toma una posición (o matizada con "predominantly")', 'Intro y conclusión deben reconocer AMBAS preguntas explícitamente'],
    band6: {
      text: 'Urbanisation is a global trend. There are many reasons why people move to cities, and this development has both positive and negative effects.\n\nThere are several reasons why people move to cities. Cities have more job opportunities and higher salaries than rural areas. Also, cities have better hospitals, schools and public transport. Many young people want to live in cities because of these advantages.\n\nAs for whether this is positive or negative, I think it has both effects. On the positive side, cities drive economic growth and innovation. On the negative side, cities become overcrowded and expensive. Traffic congestion and pollution are also serious problems.\n\nIn conclusion, urbanisation happens because of job opportunities and better services. It has both positive and negative effects, so it is difficult to judge.',
      annotations: [
        'Addresses both questions structurally — correct approach. But execution is thin.',
        '"More job opportunities" and "better hospitals" — accurate but generic. No example country or city.',
        '"Both positive and negative" — the question asks you to evaluate which predominates. Answer evasive.',
        '"Difficult to judge" conclusion is a Band 5 flag. An examiner expects a position by the end.',
        'Vocabulary is sufficient but predictable throughout: "many", "also", "serious problems".',
      ],
    },
    band8: {
      text: 'The accelerating concentration of global population in urban centres is driven by a convergence of economic pull factors and the structural decline of rural livelihoods — a transformation that, on balance, I regard as more beneficial than harmful, provided its externalities are actively managed.\n\nThe primary driver of rural-to-urban migration is wage differentials: cities generate the agglomeration economies — clusters of specialised firms, suppliers, and talent — that command productivity premiums unavailable in dispersed agricultural settings. Beyond wages, access to tertiary healthcare, elite secondary schooling, and cultural infrastructure exerts an independent gravitational pull, particularly on aspirational middle-class families in rapidly developing economies such as those of sub-Saharan Africa and South and Southeast Asia.\n\nThe development consequences of urbanisation are, on balance, positive. Historical evidence is consistent: no country has transitioned to high-income status without first urbanising. The density of cities facilitates knowledge spillovers, reduces the per-capita cost of infrastructure, and expands access to formal financial services. The attendant challenges — congestion, inequality, and housing unaffordability — are real but managerial rather than intrinsic: Singapore and Vienna demonstrate that well-governed dense cities can deliver high quality of life at scale.\n\nIn conclusion, urbanisation is fundamentally a rational response to economic geography. Its costs are the consequence of governance failures, not of cities themselves, and the developmental dividend it offers — when accompanied by competent urban planning — is decisive.',
      annotations: [
        'Intro signals a clear evaluative position ("on balance, more beneficial") — answers Q2 immediately.',
        '"Agglomeration economies" — Band 8 economics vocabulary used precisely and explained in context.',
        'Specific countries as evidence (sub-Saharan Africa, South/Southeast Asia, Singapore, Vienna).',
        '"Managerial rather than intrinsic" — a conceptual distinction that separates Band 8 from Band 7.',
        'Conclusion answers both questions in one synthesising sentence without simply repeating the intro.',
      ],
    },
  },
];

const CHECKLIST = [
  'Mi introducción parafrasea el prompt con vocabulario diferente y declara mi posición claramente.',
  'Cada párrafo del cuerpo tiene una idea principal + explicación + ejemplo/evidencia + link.',
  'Usé conectores variados (no solo "firstly/secondly/finally") y los usé correctamente.',
  'Mi conclusión retoma la tesis con vocabulario nuevo y no introduce información nueva.',
  'Escribí entre 250 y 280 palabras (Task 2 recomendado para no perder puntos por extensión).',
  'Verifiqué que no hay párrafos de sólo 1–2 oraciones (señal de desarrollo insuficiente).',
  'Revisé al menos 3 oraciones buscando errores de sujeto-verbo, tiempo verbal o artículos.',
  'No empecé ninguna oración con "And", "But", o "Because" (sin cláusula previa).',
];

const CRITERIA = [
  { code: 'TR', name: 'Task Response', desc: '¿Respondí todas las partes del prompt con ideas desarrolladas y una posición clara?' },
  { code: 'CC', name: 'Coherence & Cohesion', desc: '¿Mi texto fluye lógicamente? ¿Usé párrafos y conectores efectivamente?' },
  { code: 'LR', name: 'Lexical Resource', desc: '¿Usé vocabulario variado y preciso? ¿Evité repetición excesiva?' },
  { code: 'GRA', name: 'Grammatical Range & Accuracy', desc: '¿Usé una variedad de estructuras gramaticales con pocos errores?' },
];

const TOTAL_SECONDS = 40 * 60;

function wc(t: string) { return t.trim().split(/\s+/).filter(Boolean).length; }
function fmtTime(s: number) { return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }

export default function TareaCompletaTask2Client() {
  const [phase, setPhase] = useState<Phase>('select');
  const [pIdx, setPIdx] = useState<number | null>(null);
  const [plan, setPlan] = useState({ type: '', thesis: '', b1: '', b2: '', conc: '' });
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [running, setRunning] = useState(false);
  const [checks, setChecks] = useState<boolean[]>(Array(8).fill(false));
  const [bands, setBands] = useState<Record<string, number>>({});
  const [showBand6, setShowBand6] = useState(false);
  const [showBand8, setShowBand8] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setRunning(false);
      if (phase === 'write') setPhase('checklist');
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, timeLeft, phase]);

  const p = pIdx !== null ? PROMPTS[pIdx] : null;
  const count = wc(text);
  const timerColor = timeLeft > 600 ? '#059669' : timeLeft > 180 ? '#d97706' : '#dc2626';

  if (phase === 'select') return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
        <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm">← Task 2</Link>
      </div>
      <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />⏱ Sub-habilidad 6</p>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 0.5rem' }}>Tarea Completa</h1>
      <p style={{ color: 'var(--muted)', fontSize: '0.93rem', margin: '0 0 1.75rem', lineHeight: 1.65 }}>
        40 minutos. 250–280 palabras. Elige un prompt y escribe tu ensayo completo bajo condiciones de examen. Después compara con modelos pedagógicos Band 6 y Band 8.
      </p>
      <Task2OfficialReviewBlock
        focus="Planear, escribir, revisar y comparar un ensayo completo bajo tiempo."
        officialFormat="IELTS Academic Writing Task 2 dura aproximadamente 40 minutos dentro de Writing y exige al menos 250 palabras en respuesta a una pregunta."
        welearnStrategy="Esta ruta simula el flujo completo con prompts originales, planificación, escritura, checklist y comparación pedagógica de modelos."
        answerCheck="Una respuesta completa debe contestar el prompt, sostener una tesis, desarrollar párrafos y revisar cohesión, vocabulario y gramática antes de entregar."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {PROMPTS.map((pr, i) => (
          <button key={i} onClick={() => { setPIdx(i); setPhase('plan'); }}
            style={{ textAlign: 'left', padding: '1.1rem 1.25rem', borderRadius: 12, border: '1.5px solid var(--line-soft)', background: 'var(--bg-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>{pr.typeShort}</span>
            <span style={{ fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.55 }}>{pr.prompt}</span>
          </button>
        ))}
      </div>
    </div></div></section>
  );

  if (phase === 'plan' && p) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setPhase('select')}>← Prompts</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Fase 1 — Planificación (5 min recomendado)</span>
      </div>
      <div className="wl-card" style={{ padding: '1.1rem 1.25rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.35rem' }}>{p.typeShort}</p>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{p.prompt}&rdquo;</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {p.planHints.map((h, i) => <p key={i} style={{ margin: 0, fontSize: '0.83rem', color: '#0f3d8c', lineHeight: 1.5 }}>💡 {h}</p>)}
      </div>
      {[
        { label: 'Tipo de ensayo confirmado + mi posición (1 oración)', key: 'type', ph: 'Ej: Opinion essay — I disagree that...' },
        { label: 'Tesis (la idea central del ensayo)', key: 'thesis', ph: 'Ej: While X, the evidence suggests Y is more significant because...' },
        { label: 'Punto principal — Body 1', key: 'b1', ph: 'Ej: Economic inequality → wage growth skewed to top 1%...' },
        { label: 'Punto principal — Body 2', key: 'b2', ph: 'Ej: Cultural impact → however, cross-border diffusion of ideas...' },
        { label: 'Estrategia de conclusión', key: 'conc', ph: 'Ej: Restate: Although X is true, Y ultimately dominates because...' },
      ].map(field => (
        <div key={field.key} style={{ marginBottom: '0.7rem' }}>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.3rem' }}>{field.label}</label>
          <textarea value={plan[field.key as keyof typeof plan]} onChange={e => setPlan(pr => ({ ...pr, [field.key]: e.target.value }))} rows={2} placeholder={field.ph}
            style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: 9, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.87rem', fontFamily: 'inherit', lineHeight: 1.5, resize: 'vertical', boxSizing: 'border-box' }} />
        </div>
      ))}
      <button className="btn" onClick={() => { setPhase('write'); setRunning(true); }}>Iniciar escritura (40 min) →</button>
    </div></div></section>
  );

  if (phase === 'write' && p) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.typeShort}</p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.5, maxWidth: 540 }}>{p.prompt}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--mono)', color: timerColor, letterSpacing: '-0.04em' }}>{fmtTime(timeLeft)}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            {count} palabras {count < 250 ? `— faltan ${250 - count}` : count > 280 ? '— considera recortar' : '✓ rango ideal'}
          </div>
        </div>
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} rows={18} placeholder="Introduction: paraphrase the prompt and state your position clearly...&#10;&#10;Body 1: Topic sentence → Explanation → Example → Link back&#10;&#10;Body 2: Topic sentence → Explanation → Example → Link back&#10;&#10;Conclusion: restate thesis with different vocabulary, synthesise..."
        style={{ width: '100%', padding: '1rem', borderRadius: 12, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', lineHeight: 1.75, resize: 'vertical', boxSizing: 'border-box' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button onClick={() => { setRunning(r => !r); }}
          style={{ padding: '0.45rem 0.9rem', borderRadius: 9, border: '1.5px solid var(--line-soft)', background: 'var(--bg-2)', color: 'var(--ink)', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'inherit' }}>
          {running ? '⏸ Pausar' : '▶ Reanudar'}
        </button>
        {count >= 200 && (
          <button className="btn btn-sm" onClick={() => { setRunning(false); setPhase('checklist'); }}>Terminar → Revisión →</button>
        )}
      </div>
    </div></div></section>
  );

  if (phase === 'checklist') return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 680, margin: '0 auto' }}>
      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />✅ Antes de ver los modelos</p>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.4rem' }}>Checklist de revisión</h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.87rem', margin: '0 0 1.25rem' }}>Repasa tu ensayo contra cada ítem. Sé honesto — el objetivo es identificar qué mejorar, no darte puntos fáciles.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
        {CHECKLIST.map((item, i) => (
          <button key={i} onClick={() => setChecks(c => c.map((v, j) => j === i ? !v : v))}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '0.7rem 0.85rem', borderRadius: 10, border: checks[i] ? '2px solid #059669' : '1.5px solid var(--line-soft)', background: checks[i] ? 'rgba(5,150,105,0.06)' : 'var(--bg-2)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%' }}>
            <span style={{ fontSize: '1rem', lineHeight: 1, minWidth: 22, color: checks[i] ? '#059669' : 'var(--muted)' }}>{checks[i] ? '✓' : '○'}</span>
            <span style={{ fontSize: '0.87rem', color: 'var(--ink)', lineHeight: 1.55 }}>{item}</span>
          </button>
        ))}
      </div>
      <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.25rem' }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-2)' }}>
          {checks.filter(Boolean).length} / 8 completados{' '}
          {checks.every(Boolean) ? '— ¡lista de revisión completa! Pasa a la auto-rúbrica.' : ''}
        </p>
      </div>
      <button className="btn btn-sm" onClick={() => setPhase('rubric')} disabled={!checks.every(Boolean)}>
        Auto-rúbrica →
      </button>
    </div></div></section>
  );

  if (phase === 'rubric') return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 680, margin: '0 auto' }}>
      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />📋 Auto-rúbrica</p>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.4rem' }}>¿Qué Band te pondrías en cada criterio?</h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.87rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>El IELTS evalúa 4 criterios con el mismo peso (25% cada uno). Sé crítico: los examinadores son muy precisos.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
        {CRITERIA.map(c => (
          <div key={c.code} className="wl-card" style={{ padding: '0.9rem 1.1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: '0 0 0.2rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>{c.code} — {c.name}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>{c.desc}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                {[5,6,7,8,9].map(b => (
                  <button key={b} onClick={() => setBands(v => ({ ...v, [c.code]: b }))}
                    style={{ width: 34, height: 34, borderRadius: 7, border: bands[c.code] === b ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)', background: bands[c.code] === b ? 'rgba(15,61,140,0.12)' : 'var(--bg-2)', color: bands[c.code] === b ? '#0f3d8c' : 'var(--ink)', fontWeight: bands[c.code] === b ? 800 : 400, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'var(--mono)', transition: 'all 0.15s' }}>{b}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {Object.keys(bands).length === 4 && (
        <div style={{ padding: '0.85rem 1rem', borderRadius: 10, background: 'rgba(15,61,140,0.06)', border: '1px solid rgba(15,61,140,0.2)', marginBottom: '1.25rem' }}>
          <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#0f3d8c' }}>
            Band estimado: {(Object.values(bands).reduce((a, b) => a + b, 0) / 4).toFixed(1)}
            {' '}<span style={{ fontWeight: 400, color: 'var(--ink-2)', fontSize: '0.82rem' }}>— ahora compara con los modelos para calibrar tu criterio</span>
          </p>
        </div>
      )}
      <button className="btn btn-sm" onClick={() => setPhase('models')} disabled={Object.keys(bands).length < 4}>Ver modelos Band 6 y Band 8 →</button>
    </div></div></section>
  );

  if (phase === 'models' && p) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 800, margin: '0 auto' }}>
      <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🔍 Modelos de referencia</p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Band 6 vs Band 8</h2>
      <div className="wl-card" style={{ padding: '0.9rem 1.1rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{p.prompt}&rdquo;</p>
      </div>
      {[
        { label: 'Band 6', model: p.band6, color: '#d97706', bg: 'rgba(245,158,11,0.06)', showKey: 'showBand6' as const, setter: setShowBand6, state: showBand6 },
        { label: 'Band 8', model: p.band8, color: '#059669', bg: 'rgba(5,150,105,0.06)', showKey: 'showBand8' as const, setter: setShowBand8, state: showBand8 },
      ].map(col => (
        <div key={col.label} className="wl-card" style={{ padding: '1.25rem', borderLeft: `4px solid ${col.color}`, marginBottom: '1rem', cursor: 'pointer', background: col.state ? col.bg : 'var(--bg-2)' }}
          onClick={() => col.setter(v => !v)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: col.color }}>{col.label}</p>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{col.state ? '▲' : '▼ Ver respuesta modelo'}</span>
          </div>
          {col.state && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 10, background: 'var(--bg)', border: `1px solid ${col.color}30`, marginBottom: '0.85rem' }}>
                <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.85, color: 'var(--ink)', whiteSpace: 'pre-line' }}>{col.model.text}</p>
              </div>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: col.color, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Análisis del examinador</p>
              {col.model.annotations.map((note, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <span style={{ color: col.color, fontWeight: 800, fontSize: '0.82rem', lineHeight: 1.4, minWidth: 18 }}>{i+1}.</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => { setPhase('select'); setText(''); setTimeLeft(TOTAL_SECONDS); setBands({}); setChecks(Array(8).fill(false)); setShowBand6(false); setShowBand8(false); setPlan({ type:'',thesis:'',b1:'',b2:'',conc:'' }); }}>Otro prompt →</button>
        <Link href="/practica/ielts/academic/writing" className="btn btn-sm">Volver a Writing →</Link>
      </div>
    </div></div></section>
  );

  return null;
}
