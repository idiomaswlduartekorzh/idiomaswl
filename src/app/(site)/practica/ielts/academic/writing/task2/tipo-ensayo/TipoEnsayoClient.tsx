'use client';
import { useState } from 'react';
import Link from 'next/link';

const TYPES = ['Opinión', 'Discusión', 'Problema-Solución', 'Dos preguntas'] as const;
type T = typeof TYPES[number];

const GUIDE: Record<T, { color: string; bg: string; keywords: string[]; structure: string; trap: string; band8: string }> = {
  'Opinión': {
    color: '#0f3d8c', bg: 'rgba(15,61,140,0.07)',
    keywords: ['"To what extent do you agree or disagree?"', '"Do you agree or disagree?"', '"Do you think the advantages outweigh the disadvantages?"'],
    structure: 'Intro (tesis clara) → Body 1 (argumento principal + evidencia) → Body 2 (segundo arg. o refuta contraargumento) → Conclusión',
    trap: 'Error Band 5: presentar "ambos lados por igual" como si fuera Discusión. Debes tomar UNA posición y defenderla.',
    band8: 'Band 8: posición clara desde la intro, mantenida en CADA párrafo. Evidencia específica. Sin frases como "On one hand / On the other hand" sin tomar partido.',
  },
  'Discusión': {
    color: '#7c3aed', bg: 'rgba(124,58,237,0.07)',
    keywords: ['"Discuss both views and give your own opinion."', '"Discuss both these views."'],
    structure: 'Intro → Body 1 (Postura A + razones) → Body 2 (Postura B + razones) → Conclusión (TU OPINIÓN claramente expresada)',
    trap: 'Error Band 5: no expresar tu opinión en la conclusión, o presentar una postura mucho más débil que la otra.',
    band8: 'Band 8: ambas posturas desarrolladas con igual profundidad. Tu opinión en la conclusión está conectada con qué postura encontraste más convincente y por qué.',
  },
  'Problema-Solución': {
    color: '#059669', bg: 'rgba(5,150,105,0.07)',
    keywords: ['"What are the causes/reasons?"', '"What measures/solutions can be taken?"', '"What can governments/individuals do?"'],
    structure: 'Intro → Body 1 (2–3 causas con ejemplos) → Body 2 (soluciones que RESPONDEN directamente a esas causas) → Conclusión',
    trap: 'Error Band 5: proponer soluciones genéricas que no responden a las causas que mencionaste. La conexión causa→solución es obligatoria.',
    band8: 'Band 8: cada solución del Body 2 responde explícitamente a una causa del Body 1. Cadena lógica cerrada y coherente.',
  },
  'Dos preguntas': {
    color: '#d97706', bg: 'rgba(217,119,6,0.07)',
    keywords: ['"Why is this happening?"', '"Is this a positive or negative development?"', '"Do you think this is a worrying development?"'],
    structure: 'Intro → Body 1 (responde Q1 completamente) → Body 2 (responde Q2 completamente) → Conclusión',
    trap: 'Error Band 5: confundir Q2 con "soluciones" cuando pide evaluación, o dedicar el 80% a una pregunta y descuidar la otra.',
    band8: 'Band 8: ambas preguntas respondidas con IGUAL profundidad. El topic sentence de cada body paragraph indica claramente qué pregunta responde.',
  },
};

const QUIZ = [
  {
    prompt: 'Many people believe the internet has made communication easier. Others argue it has reduced the quality of human relationships. To what extent do you agree or disagree?',
    type: 'Opinión' as T, difficulty: 'Básico',
    hint: 'Lee la instrucción final: "To what extent do you agree or disagree?" — aunque el enunciado mencione DOS posturas, te piden TU posición. No la de ambos lados.',
    explanation: '"To what extent do you agree or disagree?" siempre exige tu postura personal. Las dos posturas del enunciado son solo contexto — no significa que debas tratarlas por igual. Estructura correcta: Intro (tu posición) → Body 1 (argumento principal) → Body 2 (refuta el contraargumento) → Conclusión.',
    keyword: 'To what extent do you agree or disagree?',
  },
  {
    prompt: 'Some people believe children should spend more time outdoors developing social skills. Others feel that structured indoor learning environments are more beneficial. Discuss both views and give your own opinion.',
    type: 'Discusión' as T, difficulty: 'Básico',
    hint: 'Busca la instrucción al final. ¿Ves "Discuss both views and give your own opinion"? Estas palabras siempre indican un ensayo de Discusión.',
    explanation: '"Discuss both views and give your own opinion" exige tres cosas: (1) desarrollar View A, (2) desarrollar View B, (3) expresar TU opinión. Si falta alguna, no puedes superar Band 5 en Task Response.',
    keyword: 'Discuss both views and give your own opinion',
  },
  {
    prompt: 'Obesity rates have risen sharply in many developed countries over the past three decades. What are the main causes of this trend, and what actions can governments and individuals take to reverse it?',
    type: 'Problema-Solución' as T, difficulty: 'Básico',
    hint: '¿Cuántas preguntas hay? "What are the CAUSES?" y "What ACTIONS can be taken?" — son causa + solución. El tipo se llama Problema-Solución.',
    explanation: 'Las dos preguntas "causas + medidas" siempre indican Problema-Solución. Crítico: tus soluciones en Body 2 DEBEN responder a las causas que mencionaste en Body 1. Esta coherencia lógica diferencia Band 7 de Band 5.',
    keyword: 'What are the causes? / What actions can be taken?',
  },
  {
    prompt: 'An increasing number of people are leaving rural areas to live in cities. Why is this happening? Do you think this is a positive or negative development?',
    type: 'Dos preguntas' as T, difficulty: 'Básico',
    hint: 'Cuenta las preguntas: "WHY is this happening?" y "Is this POSITIVE or NEGATIVE?" Son dos preguntas distintas que requieren respuestas en párrafos separados.',
    explanation: 'Este no es Problema-Solución aunque mencione causas. La segunda pregunta pide tu EVALUACIÓN (positivo/negativo), no soluciones. Body 1 = razones del fenómeno. Body 2 = si es positivo o negativo y por qué.',
    keyword: 'Why is this happening? / Is this positive or negative?',
  },
  {
    prompt: 'While some experts believe nuclear energy is the only viable solution to climate change, others argue that renewable sources are sufficient and safer. To what extent do you agree with the view that nuclear energy is essential?',
    type: 'Opinión' as T, difficulty: 'Intermedio',
    hint: 'Aunque el enunciado mencione dos posturas (nuclear vs renovables), la instrucción final es "To what extent do you agree WITH THE VIEW THAT..." — te piden evaluar UNA afirmación, no discutir ambas por igual.',
    explanation: 'Error clásico: ver dos perspectivas y asumir automáticamente que es Discusión. La clave está en la instrucción final. "Discuss both views" = Discusión. "To what extent do you agree?" = Opinión. Aquí debes tomar partido sobre la afirmación "nuclear energy is essential".',
    keyword: 'To what extent do you agree with the view that...',
  },
  {
    prompt: 'The number of young people studying science and technology subjects at university has declined significantly in many countries. What are the causes of this trend, and do you think this is a worrying development?',
    type: 'Dos preguntas' as T, difficulty: 'Intermedio',
    hint: 'La segunda pregunta es "do you think this is a worrying development?" — ¿te pide soluciones? No. Te pide tu EVALUACIÓN de si el fenómeno es preocupante. Eso convierte en Dos preguntas, no Problema-Solución.',
    explanation: 'El error más común del nivel Band 5–6: cuando ven "What are the causes?" asumen Problema-Solución. La clave es la SEGUNDA pregunta: si pide "What solutions?" → Problema-Solución. Si pide "Is this good/bad/worrying?" → Dos preguntas. Body 2 debe evaluar si el declive en ciencias es preocupante, con razones específicas.',
    keyword: 'What are the causes? / Do you think this is a worrying development?',
  },
  {
    prompt: 'Some people argue that governments should prioritise economic growth above all else. Others believe that environmental protection must take precedence over development. Discuss both views and give your own opinion.',
    type: 'Discusión' as T, difficulty: 'Básico',
    hint: '"Discuss both views and give your own opinion" — estas cinco palabras son la señal más directa del tipo Discusión. Aparecen al final del enunciado.',
    explanation: 'Estructura obligatoria: Body 1 = argumento pro-crecimiento económico con razones y evidencia. Body 2 = argumento pro-protección ambiental con razones y evidencia. Conclusión = tu posición CLARA sobre cuál prevalece. Band 6 error: conclusión vaga como "both views have merit" sin tomar partido.',
    keyword: 'Discuss both views and give your own opinion',
  },
  {
    prompt: 'In many cities, air quality has deteriorated significantly due to rising traffic levels and industrial activity. What problems does poor air quality cause for urban residents, and what measures could local authorities implement to address these issues?',
    type: 'Problema-Solución' as T, difficulty: 'Intermedio',
    hint: 'Dos preguntas: PROBLEMS (consecuencias de la mala calidad del aire) y MEASURES (acciones de las autoridades). La segunda pregunta pide acciones/medidas, no evaluación → Problema-Solución.',
    explanation: 'Aunque hay dos preguntas, el patrón "problems + measures/solutions" es inequívocamente Problema-Solución. Diferencia crítica con Dos preguntas: si Q2 pide ACCIONES/MEDIDAS → Problema-Solución. Si Q2 pide EVALUACIÓN (¿es bueno/malo?) → Dos preguntas. Aquí, tus medidas deben responder directamente a los problemas que describiste.',
    keyword: 'What problems does this cause? / What measures can be implemented?',
  },
];

const ANALYSIS = [
  {
    requiredPrompt: 'Social media companies should be held legally responsible for harmful content posted on their platforms. Do you agree or disagree?',
    requiredType: 'Opinión' as T,
    studentType: 'Discusión' as T,
    studentStructure: [
      'Intro: "There are valid arguments both for and against holding social media companies accountable for user content. This essay will examine both perspectives."',
      'Body 1: "On one hand, social media companies profit from user engagement, so they should bear responsibility for what appears on their platforms..."',
      'Body 2: "On the other hand, with billions of posts daily, full moderation is technically and financially impossible for any company..."',
      'Conclusión: "In conclusion, there are compelling arguments on both sides. Whether companies should be responsible is a complex issue with no clear answer."',
    ],
    error: 'El prompt pide "Do you agree or disagree?" — esto requiere un ensayo de OPINIÓN con una posición clara. El estudiante en cambio escribió un ensayo de DISCUSIÓN presentando ambos lados por igual sin tomar partido. La conclusión "no clear answer" es el peor resultado posible para Task Response.',
    bandImpact: 'Task Response: Band 4. El examinador detecta inmediatamente que no hay posición. La instrucción dice "agree or disagree" y el estudiante no hace ninguna de las dos.',
    correction: 'Intro correcta: "I firmly believe that social media companies should be held legally accountable for harmful content on their platforms." → Body 1: argumento principal por la responsabilidad. → Body 2: refuta el contraargumento de que es técnicamente imposible. → Conclusión: reafirma tu postura con las razones clave.',
  },
  {
    requiredPrompt: 'The cost of housing in many cities has risen sharply, making it unaffordable for young people. Why is this happening? Do you think this is a positive or negative development?',
    requiredType: 'Dos preguntas' as T,
    studentType: 'Problema-Solución' as T,
    studentStructure: [
      'Intro: "Housing affordability is a serious problem in many cities caused by several economic factors. Governments must act urgently."',
      'Body 1: "One key cause is the rise of property investment by wealthy individuals and corporations, which drives prices beyond what most people can afford..."',
      'Body 2: "Governments could introduce rent controls and invest in social housing to increase supply and reduce prices for young people..."',
      'Conclusión: "If these measures are adopted, the housing crisis could be resolved and young people could afford to live in cities again."',
    ],
    error: 'El prompt tiene DOS preguntas: (1) WHY is this happening? y (2) Is this POSITIVE or NEGATIVE? El estudiante respondió (1) correctamente con causas, pero para (2) propuso SOLUCIONES en vez de evaluar si el fenómeno es positivo o negativo. Convirtió el ensayo en Problema-Solución cuando era Dos preguntas.',
    bandImpact: 'Task Response: Band 5. Solo respondió 1 de las 2 preguntas. El examinador esperaba en Body 2: "Is this worrying? What are the consequences?" no "What should governments do?"',
    correction: 'Body 2 correcto: "This trend is undoubtedly a negative development for several reasons. When young people cannot afford housing near their workplaces, they face longer commutes and higher stress levels, reducing their quality of life significantly. Moreover, housing insecurity is linked to declining birth rates, as many couples delay or abandon plans to start families. This has long-term demographic consequences for society." → Conclusión: confirma por qué es un desarrollo negativo.',
  },
];

export default function TipoEnsayoClient() {
  const [phase, setPhase] = useState<'guide' | 'quiz' | 'analysis' | 'done'>('guide');
  const [guideOpen, setGuideOpen] = useState<T | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [qAttempt, setQAttempt] = useState(0);
  const [qSelected, setQSelected] = useState<T | null>(null);
  const [qLocked, setQLocked] = useState(false);
  const [qScore, setQScore] = useState(0);
  const [aIdx, setAIdx] = useState(0);
  const [aSelected, setASelected] = useState<T | null>(null);
  const [aLocked, setALocked] = useState(false);

  const q = QUIZ[qIdx];
  const a = ANALYSIS[aIdx];

  function selectQuiz(t: T) {
    if (qLocked) return;
    const correct = q.type;
    setQSelected(t);
    if (t === correct) {
      setQScore(s => s + (qAttempt === 0 ? 2 : 1));
      setQLocked(true);
    } else if (qAttempt === 0) {
      setQAttempt(1);
    } else {
      setQLocked(true);
    }
  }

  function retryQuiz() { setQSelected(null); }

  function nextQuiz() {
    if (qIdx < QUIZ.length - 1) {
      setQIdx(i => i + 1); setQAttempt(0); setQSelected(null); setQLocked(false);
    } else { setPhase('analysis'); }
  }

  function selectAnalysis(t: T) {
    if (aLocked) return;
    setASelected(t);
    setALocked(true);
  }

  function nextAnalysis() {
    if (aIdx < ANALYSIS.length - 1) {
      setAIdx(i => i + 1); setASelected(null); setALocked(false);
    } else { setPhase('done'); }
  }

  const maxScore = QUIZ.length * 2;
  const pct = Math.round((qScore / maxScore) * 100);

  // ── GUIDE ──
  if (phase === 'guide') return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Tipo de Ensayo</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🔍 Sub-habilidad 1</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Identifica el tipo de ensayo</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.75rem', lineHeight: 1.65 }}>
            El error de identificación es el más costoso del Task 2: si eliges la estructura equivocada, <strong>tu Task Response no puede superar Band 5</strong>, sin importar lo bien que escribas.
            Estudia los 4 tipos y sus señales antes de practicar.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
            {(Object.keys(GUIDE) as T[]).map(type => {
              const g = GUIDE[type];
              const open = guideOpen === type;
              return (
                <div key={type} className="wl-card" style={{ padding: '1.25rem', borderTop: `3px solid ${g.color}`, cursor: 'pointer' }} onClick={() => setGuideOpen(open ? null : type)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: open ? '0.85rem' : 0 }}>
                    <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: g.color }}>{type}</h3>
                    <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{open ? '▲' : '▼'}</span>
                  </div>
                  {open && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Palabras clave</p>
                        {g.keywords.map((k, i) => <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.85rem', color: g.color, fontFamily: 'var(--mono)', fontWeight: 600 }}>{k}</p>)}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Estructura</p>
                        <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{g.structure}</p>
                      </div>
                      <div style={{ padding: '0.6rem 0.8rem', borderRadius: 8, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.18)' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#dc2626', lineHeight: 1.5 }}><strong>⚠ Error Band 5:</strong> {g.trap}</p>
                      </div>
                      <div style={{ padding: '0.6rem 0.8rem', borderRadius: 8, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#059669', lineHeight: 1.5 }}><strong>✦ Band 8:</strong> {g.band8}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button className="btn" style={{ width: '100%', fontSize: '1rem', padding: '0.9rem' }} onClick={() => { setPhase('quiz'); setGuideOpen(null); }}>
            Empezar práctica — 8 ejercicios →
          </button>
        </div>
      </div>
    </section>
  );

  // ── QUIZ ──
  if (phase === 'quiz') {
    const isCorrect = qSelected === q.type;
    const showHint = qAttempt > 0 && !qLocked;
    const showExplanation = qLocked;
    const canRetry = qAttempt === 1 && qSelected !== null && !qLocked && !isCorrect;
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }} onClick={() => setPhase('guide')}>← Referencia</button>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Ejercicio {qIdx + 1} de {QUIZ.length}</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{qScore} / {qIdx * 2} pts</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${((qIdx + 1) / QUIZ.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
              </div>
              <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: 8, background: qIdx < 4 ? 'rgba(15,61,140,0.1)' : 'rgba(217,119,6,0.1)', color: qIdx < 4 ? '#0f3d8c' : '#d97706', fontFamily: 'var(--mono)', fontWeight: 700 }}>
                {q.difficulty}
              </span>
            </div>

            <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Enunciado IELTS Task 2</p>
              <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--ink)', fontStyle: 'italic' }}>
                &ldquo;{q.prompt}&rdquo;
              </p>
            </div>

            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', margin: '0 0 0.65rem' }}>¿Qué tipo de ensayo requiere este enunciado?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1rem' }}>
              {TYPES.map(type => {
                const isSel = qSelected === type;
                const isRight = type === q.type;
                let border = '1.5px solid var(--line-soft)', bg = 'var(--bg-2)', color = 'var(--ink)';
                if (qLocked) {
                  if (isRight) { border = '2px solid #059669'; bg = 'rgba(5,150,105,0.08)'; color = '#059669'; }
                  else if (isSel) { border = '2px solid #dc2626'; bg = 'rgba(220,38,38,0.07)'; color = '#dc2626'; }
                } else if (isSel && !isRight) {
                  border = '2px solid #dc2626'; bg = 'rgba(220,38,38,0.05)'; color = '#dc2626';
                }
                return (
                  <button key={type} onClick={() => selectQuiz(type)}
                    style={{ padding: '0.9rem', borderRadius: 10, border, background: bg, cursor: qLocked ? 'default' : 'pointer', fontWeight: 700, fontSize: '0.9rem', color, transition: 'all 0.15s' }}>
                    {type}
                    {qLocked && isRight && <span style={{ display: 'block', fontSize: '0.68rem', marginTop: '0.2rem' }}>✓ Correcto</span>}
                    {qLocked && isSel && !isRight && <span style={{ display: 'block', fontSize: '0.68rem', marginTop: '0.2rem' }}>✗ Incorrecto</span>}
                  </button>
                );
              })}
            </div>

            {showHint && (
              <div style={{ padding: '0.9rem 1.1rem', borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', marginBottom: '0.85rem' }}>
                <p style={{ margin: '0 0 0.35rem', fontSize: '0.78rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Pista</p>
                <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{q.hint}</p>
                {canRetry && <button className="btn btn-sm" onClick={retryQuiz} style={{ marginTop: '0.65rem' }}>Intentar de nuevo →</button>}
              </div>
            )}

            {showExplanation && (
              <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: isCorrect ? 'rgba(5,150,105,0.07)' : 'rgba(15,61,140,0.05)', border: `1px solid ${isCorrect ? 'rgba(5,150,105,0.25)' : 'rgba(15,61,140,0.2)'}`, marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'var(--mono)', margin: '0 0 0.4rem', color: isCorrect ? '#059669' : '#0f3d8c' }}>
                  {isCorrect ? `✓ Correcto — Tipo: ${q.type}` : `Respuesta: ${q.type}`}
                </p>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.87rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{q.explanation}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  Palabra(s) clave: <span style={{ color: '#0f3d8c', fontWeight: 700 }}>{q.keyword}</span>
                </p>
              </div>
            )}

            {showExplanation && (
              <button className="btn btn-sm" onClick={nextQuiz}>
                {qIdx < QUIZ.length - 1 ? 'Siguiente ejercicio →' : 'Análisis crítico →'}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── ANALYSIS ──
  if (phase === 'analysis') {
    const isCorrect = aSelected === a.studentType;
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>Análisis crítico — Caso {aIdx + 1}/{ANALYSIS.length}</span>
            </div>
            <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />🔬 Análisis crítico</p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.4rem' }}>¿Qué error cometió este estudiante?</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>Lee el enunciado y la estructura del ensayo del estudiante. Identifica qué tipo de ensayo escribió (aunque el enunciado pedía otro).</p>

            <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Enunciado original — Tipo requerido: {a.requiredType}</p>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{a.requiredPrompt}&rdquo;</p>
            </div>

            <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Estructura del ensayo del estudiante</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {a.studentStructure.map((s, i) => (
                  <div key={i} style={{ padding: '0.6rem 0.85rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.55, fontStyle: 'italic' }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', margin: '0 0 0.65rem' }}>
              ¿Qué tipo de ensayo ESCRIBIÓ el estudiante? (aunque el prompt pedía otro)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1rem' }}>
              {TYPES.map(type => {
                const isSel = aSelected === type;
                const isRight = type === a.studentType;
                let border = '1.5px solid var(--line-soft)', bg = 'var(--bg-2)', color = 'var(--ink)';
                if (aLocked) {
                  if (isRight) { border = '2px solid #059669'; bg = 'rgba(5,150,105,0.08)'; color = '#059669'; }
                  else if (isSel) { border = '2px solid #dc2626'; bg = 'rgba(220,38,38,0.07)'; color = '#dc2626'; }
                }
                return (
                  <button key={type} onClick={() => selectAnalysis(type)}
                    style={{ padding: '0.85rem', borderRadius: 10, border, background: bg, cursor: aLocked ? 'default' : 'pointer', fontWeight: 700, fontSize: '0.88rem', color, transition: 'all 0.15s' }}>
                    {type}
                  </button>
                );
              })}
            </div>

            {aLocked && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}>
                  <p style={{ fontSize: '0.78rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Error detectado</p>
                  <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>{a.error}</p>
                </div>
                <div style={{ padding: '0.85rem 1.1rem', borderRadius: 10, background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.15)' }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6 }}><strong style={{ color: '#dc2626' }}>Impacto en la banda:</strong> {a.bandImpact}</p>
                </div>
                <div style={{ padding: '0.85rem 1.1rem', borderRadius: 10, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Cómo corregirlo</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>{a.correction}</p>
                </div>
                <button className="btn btn-sm" onClick={nextAnalysis} style={{ alignSelf: 'flex-start' }}>
                  {aIdx < ANALYSIS.length - 1 ? 'Siguiente caso →' : 'Ver resultado →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── DONE ──
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="wl-card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #0f3d8c' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>Resultado final</p>
            <p style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--ink)', margin: '0 0 0.2rem', lineHeight: 1 }}>{qScore}/{maxScore}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0 0 0.5rem' }}>{pct}% de precisión</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              {pct === 100 ? 'Perfecto — identificas todos los tipos con precisión de examinador.' : pct >= 75 ? 'Muy buen nivel. Repasa los tipos que fallaste antes de escribir.' : pct >= 50 ? 'Nivel aceptable. Memoriza las palabras clave y practica de nuevo.' : 'Identificar el tipo es la base del Task 2. Vuelve a la guía y practica hasta 100%.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => { setPhase('guide'); setQIdx(0); setQAttempt(0); setQSelected(null); setQLocked(false); setQScore(0); setAIdx(0); setASelected(null); setALocked(false); }}>
                Intentar de nuevo
              </button>
              <Link href="/practica/ielts/academic/writing/task2/introduccion" className="btn btn-ghost btn-sm">Sub-habilidad 2: Introducción →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
