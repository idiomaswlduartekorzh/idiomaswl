'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const PROMPTS = [
  {
    type: 'Opinión',
    tag: 'To what extent do you agree or disagree?',
    text: `In many countries, it is now possible to buy goods manufactured anywhere in the world. Some people see this as a positive development, while others think it has significant disadvantages. To what extent do you agree or disagree that the globalisation of consumer products is beneficial?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    structure: ['Intro — paráfrasis + tu posición clara', 'Body 1 — argumento principal a favor', 'Body 2 — refuta el contraargumento', 'Conclusión — retoma tu posición'],
    model: `The rise of global consumer markets means that products manufactured anywhere in the world are now available in local shops. Although some argue this carries economic and social costs, I firmly believe that consumer globalisation delivers far greater benefits than it does harm.

The most compelling advantage is that global competition improves product quality while reducing prices for ordinary consumers. When manufacturers compete internationally, they are forced to innovate and cut costs simultaneously. The smartphone industry illustrates this clearly: competition between American, Korean, and Chinese companies has produced increasingly sophisticated devices at progressively lower prices, benefiting consumers at every income level.

Admittedly, the globalisation of consumer products has contributed to the decline of some local industries. Cheaper imports undercut domestic manufacturers, sometimes leading to job losses. However, this argument overlooks a crucial counterfact: the same global market that displaces some workers creates new employment in export sectors, logistics, and retail. Countries such as Vietnam have lifted millions out of poverty precisely by integrating into global supply chains.

In conclusion, while consumer globalisation does present challenges for specific local industries, the economic opportunities it generates and the improved living standards it delivers represent a clear net benefit for the majority of people. Governments should support affected workers through retraining programmes, but resisting globalisation itself is neither viable nor desirable.`,
  },
  {
    type: 'Discusión',
    tag: 'Discuss both views and give your own opinion.',
    text: `Some people think that schools should group students according to their academic ability. Others believe that students of all abilities should be educated together. Discuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    structure: ['Intro — paráfrasis + anticipa tu opinión', 'Body 1 — View A (agrupación por habilidad)', 'Body 2 — View B (educación mixta)', 'Conclusión — tu opinión clara'],
    model: `The question of whether schools should stream students by ability or teach mixed-ability classes has long been debated in education policy circles. Both approaches have genuine merits, though a careful examination reveals one to be clearly preferable.

Proponents of ability grouping argue that it allows teachers to tailor instruction far more effectively. In high-ability classes, teachers can move at a faster pace and introduce more challenging material, ensuring gifted students are not held back. Similarly, students who struggle with certain subjects may benefit from teaching specifically adapted to address their particular gaps.

On the other hand, those who favour mixed-ability teaching contend that streaming can be profoundly harmful to students placed in lower groups. Research consistently shows that children labelled as lower-ability often internalise this classification, resulting in diminished self-esteem and reduced ambition. Furthermore, diverse classrooms foster empathy, cooperation, and mutual support — skills essential for adult life in a pluralistic society.

In my view, while limited ability grouping may be appropriate for specific subjects such as mathematics at secondary level, schools should generally favour inclusive classrooms supplemented with differentiated teacher support. The social and psychological benefits of mixed-ability education far outweigh the marginal efficiency gains of streaming, and education systems should prioritise the development of the whole person, not merely academic output.`,
  },
  {
    type: 'Problema-Solución',
    tag: 'What are the causes? What measures can be taken?',
    text: `In many cities around the world, traffic congestion has become a major problem affecting the daily lives of residents. What are the main causes of this problem? What measures could governments take to address it effectively?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    structure: ['Intro — paráfrasis + anuncia estructura', 'Body 1 — 2 causas con ejemplos', 'Body 2 — 2 soluciones que responden esas causas', 'Conclusión — síntesis'],
    model: `Traffic congestion in urban areas has reached critical levels in many cities worldwide, undermining quality of life and economic productivity. Understanding its root causes is essential to designing interventions that genuinely work.

The primary cause of urban gridlock is the overwhelming reliance on private motor vehicles. As cities expand and public transport systems fail to keep pace with population growth, residents increasingly depend on cars for daily commutes. This is compounded by poor urban planning: when residential, commercial, and industrial zones are separated by vast distances, car ownership feels like a necessity rather than a choice. Cities like Los Angeles exemplify how decades of car-centric development can create almost intractable congestion.

To address these issues, governments must pursue a combination of supply-side and demand-side interventions. Investing in high-capacity, reliable, and affordable public transport — metro systems, express bus lanes, and light rail — would provide a genuinely attractive alternative to driving. At the same time, demand-side policies such as congestion charging, successfully implemented in London and Stockholm, can deter unnecessary car use during peak hours. Urban planners should also prioritise mixed-use development to reduce the distances people need to travel for work and services.

In conclusion, traffic congestion is primarily caused by car dependency and short-sighted urban planning. A coordinated strategy that simultaneously improves public transit and uses pricing mechanisms to discourage driving offers the most effective and sustainable path forward.`,
  },
  {
    type: 'Dos preguntas',
    tag: 'Why is this happening? Is this positive or negative?',
    text: `The number of people choosing to have fewer children or no children at all has increased significantly in many countries in recent decades. Why is this happening? Is it a positive or negative development for society?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    structure: ['Intro — paráfrasis + anticipa las dos respuestas', 'Body 1 — responde el WHY (causas)', 'Body 2 — responde si es positivo o negativo', 'Conclusión — síntesis equilibrada'],
    model: `Declining birth rates have emerged as one of the defining demographic trends of the twenty-first century, with couples in many nations choosing smaller families or lifelong childlessness. This essay will examine the forces driving this shift before assessing its broader implications.

Several interconnected factors explain why people are having fewer children. Rising living costs — particularly housing and childcare — make raising children financially daunting for many young adults. Moreover, the expansion of higher education and career opportunities, especially for women, has shifted priorities: many individuals now invest in professional development before considering parenthood, if at all. Cultural attitudes have also evolved, with parenthood increasingly viewed as a personal choice rather than a social expectation.

The consequences of this trend are decidedly mixed. On the positive side, smaller families are often associated with higher parental investment per child, better health outcomes, and reduced environmental pressure. However, the long-term demographic implications are concerning. An ageing population with a shrinking workforce places enormous strain on pension systems, healthcare, and social welfare provision. Japan's decades-long struggle with low birth rates provides a sobering example of the economic difficulties that can result.

Overall, while individual decisions to have fewer children reflect positive progress in personal freedom and gender equality, governments must proactively address the structural challenges arising from an ageing population. Policy responses — such as immigration reform, improved parental leave, and affordable childcare — are essential to prevent serious socioeconomic difficulties in the future.`,
  },
];

const RUBRIC = [
  {
    criterion: 'Task Response',
    desc: '¿Respondiste todo lo que pide el enunciado? ¿Está clara tu posición?',
    bands: [
      { band: '7–9', descriptor: 'Addresses all parts of the task; presents a clear, well-developed position; main ideas are extended and supported.' },
      { band: '5–6', descriptor: 'Addresses the task but the position may be unclear or ideas are not fully extended.' },
      { band: '3–4', descriptor: 'Attempts the task but fails to address all parts; position is unclear; ideas are underdeveloped.' },
    ],
  },
  {
    criterion: 'Coherence & Cohesion',
    desc: '¿Fluye tu ensayo con lógica? ¿Usas conectores apropiadamente?',
    bands: [
      { band: '7–9', descriptor: 'Logical sequencing throughout; cohesive devices used flexibly without over-reliance on any one type; paragraphs are clear and purposeful.' },
      { band: '5–6', descriptor: 'Generally organised; some cohesive devices used but may be mechanical or repetitive.' },
      { band: '3–4', descriptor: 'Some basic organisation; ideas may be unclear or poorly linked; cohesive devices are limited or faulty.' },
    ],
  },
  {
    criterion: 'Lexical Resource',
    desc: '¿Variaste el vocabulario? ¿Evitaste repetición? ¿Usaste paraphrasing?',
    bands: [
      { band: '7–9', descriptor: 'Wide vocabulary range; uses paraphrase effectively; less common items used with awareness of style; rare errors.' },
      { band: '5–6', descriptor: 'Adequate range; some less common vocabulary attempted; noticeable but not disruptive errors.' },
      { band: '3–4', descriptor: 'Limited range with repetition; errors in word choice may impede communication.' },
    ],
  },
  {
    criterion: 'Grammatical Range & Accuracy',
    desc: '¿Variaste las estructuras gramaticales? ¿Cuántos errores cometiste?',
    bands: [
      { band: '7–9', descriptor: 'Wide range of structures; the majority of sentences are error-free; only minor errors occur.' },
      { band: '5–6', descriptor: 'Mix of simple and complex sentences; some errors but they rarely impede communication.' },
      { band: '3–4', descriptor: 'Mainly simple sentences; frequent errors that may obscure meaning.' },
    ],
  },
];

type Phase = 'intro' | 'writing' | 'scoring';

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function wc(t: string) {
  return t.trim().split(/\s+/).filter(Boolean).length;
}

export default function TareaCompletaTask2Page() {
  const promptIndex = Math.floor(Date.now() / 86400000) % PROMPTS.length;
  const prompt = PROMPTS[promptIndex];

  const [phase, setPhase] = useState<Phase>('intro');
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [scores, setScores] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setPhase('scoring');
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, timeLeft]);

  const words = wc(text);
  const allScored = RUBRIC.every(r => scores[r.criterion]);
  const avgBand = allScored
    ? (Object.values(scores).reduce((s, v) => s + (v === '7–9' ? 8 : v === '5–6' ? 5.5 : 3.5), 0) / 4).toFixed(1)
    : null;
  const timerColor = timeLeft < 120 ? '#dc2626' : timeLeft < 600 ? '#d97706' : '#059669';

  function start() { setTimerActive(true); setPhase('writing'); }
  function submit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setPhase('scoring');
  }
  function reset() { setPhase('intro'); setText(''); setTimeLeft(40 * 60); setScores({}); setShowModel(false); }

  if (phase === 'intro') return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Tarea Completa</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />⏱️ Sub-habilidad 6 — Tarea Completa</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Práctica en condiciones reales</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            40 minutos. 250+ palabras. Al terminar, usas la rúbrica oficial para auto-evaluarte y comparas con una respuesta modelo Band 7+.
          </p>
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{prompt.type}</span>
            <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{prompt.tag}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {prompt.structure.map((s, i) => (
              <div key={i} style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', fontFamily: 'var(--mono)' }}>§{i + 1}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{s}</p>
              </div>
            ))}
          </div>
          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.75rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Task 2 Prompt</p>
            <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--ink)', whiteSpace: 'pre-line' }}>{prompt.text}</p>
          </div>
          <button className="btn" style={{ width: '100%', fontSize: '1rem', padding: '0.9rem' }} onClick={start}>
            Empezar — 40 minutos ⏱️
          </button>
        </div>
      </div>
    </section>
  );

  if (phase === 'writing') return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 10, background: 'var(--bg-2)', border: '1.5px solid var(--line-soft)', position: 'sticky', top: 8, zIndex: 10 }}>
            <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1.25rem', color: timerColor }}>
              ⏱️ {fmt(timeLeft)}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: words >= 250 ? '#059669' : '#d97706', fontWeight: 700 }}>
                {words} / 250+ palabras
              </span>
              <button className="btn btn-sm" onClick={submit}>Entregar →</button>
            </div>
          </div>
          <div className="wl-card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid #0f3d8c', marginBottom: '0.75rem', fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {prompt.text}
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={`Empieza con tu introducción (paráfrasis + tesis)...\n\nBody paragraph 1...\n\nBody paragraph 2...\n\nConclusion...`}
            rows={22}
            style={{ width: '100%', padding: '1rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.97rem', fontFamily: 'inherit', lineHeight: 1.8, resize: 'vertical', boxSizing: 'border-box' }}
            autoFocus
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
              {words} palabras {words < 250 ? `— faltan ${250 - words}` : '— ✓ mínimo alcanzado'}
            </span>
            <button className="btn btn-sm" onClick={submit}>Entregar ahora →</button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Auto-evaluación</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Evalúa tu respuesta</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
            Lee cada criterio y elige el band que mejor describe tu texto. Sé honesto — es tu herramienta de mejora.
          </p>
          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', maxHeight: 220, overflowY: 'auto' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Tu respuesta ({words} palabras)</p>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{text || '(sin texto)'}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {RUBRIC.map(r => (
              <div key={r.criterion} className="wl-card" style={{ padding: '1.25rem' }}>
                <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{r.criterion}</p>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{r.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {r.bands.map(b => {
                    const sel = scores[r.criterion] === b.band;
                    return (
                      <button key={b.band} onClick={() => setScores(s => ({ ...s, [r.criterion]: b.band }))}
                        style={{ textAlign: 'left', padding: '0.65rem 0.85rem', borderRadius: 9, border: sel ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)', background: sel ? 'rgba(15,61,140,0.08)' : 'var(--bg-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: sel ? '#0f3d8c' : 'var(--muted)', fontSize: '0.8rem' }}>Band {b.band}</span>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{b.descriptor}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {allScored && (
            <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center', borderTop: '3px solid #0f3d8c', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Band estimado</p>
              <p style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--ink)', margin: '0 0 0.25rem', lineHeight: 1 }}>{avgBand}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0 0 1rem' }}>
                {Number(avgBand) >= 7 ? 'Excelente — nivel competitivo para universidades de élite.' : Number(avgBand) >= 5.5 ? 'Buen nivel. Enfócate en el criterio más bajo.' : 'Sigue practicando. Repasa las sub-habilidades 1–5.'}
              </p>
              <button className="btn btn-sm" onClick={() => setShowModel(v => !v)}>
                {showModel ? 'Ocultar respuesta modelo' : 'Ver respuesta modelo Band 7+ →'}
              </button>
            </div>
          )}
          {showModel && (
            <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Respuesta modelo Band 7+ — {prompt.type}</p>
              <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.85, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{prompt.model}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={reset}>Intentar de nuevo</button>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm">← Volver a Task 2</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
