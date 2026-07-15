'use client';
import { useState } from 'react';
import Link from 'next/link';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';

const BAND_COMPARE = {
  prompt: 'Social media has had a negative effect on the quality of human communication. To what extent do you agree or disagree?',
  band56: {
    text: 'In conclusion, I have discussed how social media affects communication. There are both advantages and disadvantages. I think social media can be good but also bad for people. We need to use it carefully. In the future, technology will probably change how we communicate even more.',
    problems: [
      '"I have discussed" — backward-looking summary adds no value. The conclusion should synthesise, not narrate.',
      '"both advantages and disadvantages" — this is an Opinion essay. The conclusion must state a clear position, not fence-sit.',
      '"In the future, technology will probably change..." — introduces NEW speculative information. Conclusions never contain new points.',
      'No restatement of thesis — after 250 words, the reader still doesn\'t know your position.',
      'Vocabulary is basic throughout: "good", "bad", "carefully".',
    ],
  },
  band78: {
    text: 'In conclusion, while social media undeniably facilitates connection across distances, its long-term impact on the depth and quality of interpersonal communication is profoundly damaging. By training users to prioritise brevity and performance over genuine exchange, these platforms are gradually eroding the very skills — empathy, sustained attention, and vulnerability — that meaningful human connection requires. Educational institutions and individuals alike must actively cultivate these capacities before digital substitution renders them obsolete.',
    strengths: [
      'Concedes the opposing view briefly ("undeniably facilitates connection") before restating the thesis — sophisticated Band 8 structure.',
      'Thesis is restated with completely different vocabulary from the introduction.',
      'Final sentence synthesises the body arguments without repeating them verbatim.',
      'No new information — "cultivating capacities" follows logically from the argument already made.',
      'Band 8 vocabulary: "eroding", "empathy", "vulnerability", "obsolete", "cultivate".',
    ],
  },
};

const RULES = [
  { icon: '✓', text: 'Retoma tu tesis con vocabulario DIFERENTE al de la introducción.' },
  { icon: '✓', text: 'Resume los puntos principales del cuerpo en 1–2 oraciones (no los repitas literalmente).' },
  { icon: '✓', text: 'Empieza con "In conclusion / To conclude / In summary / Overall."' },
  { icon: '✗', text: 'NUNCA introduzcas información nueva, argumentos nuevos, ni especulaciones.' },
  { icon: '✗', text: 'NUNCA uses "I have discussed..." o "As I mentioned above..." — suma cero puntos.' },
  { icon: '✗', text: 'NUNCA digas "There are both advantages and disadvantages" en un ensayo de Opinión.' },
];

interface Exercise {
  type: string; prompt: string; bodySummary: string[]; thesis: string;
  model: string; modelAnnotations: string[];
}

const EXERCISES: Exercise[] = [
  {
    type: 'Opinión',
    prompt: 'In many countries, students are under increasing academic pressure. This has a negative effect on their health. To what extent do you agree or disagree?',
    bodySummary: [
      'Body 1: El exceso de presión académica causa ansiedad crónica y privación del sueño, perjudicando el rendimiento cognitivo a largo plazo (estudios APA + Japón como ejemplo).',
      'Body 2: Aunque los defensores argumentan que la presión forma resiliencia, esta lógica ignora el costo desproporcionado para quienes ya tienen desventajas socioeconómicas.',
    ],
    thesis: 'La presión académica excesiva es dañina y los sistemas educativos deben reformarse.',
    model: 'In conclusion, while advocates of academic rigour argue that pressure builds resilience, this perspective fails to account for the disproportionate harm suffered by students who already face disadvantage. The evidence presented clearly demonstrates that chronic academic stress imposes measurable psychological and physiological costs that undermine the very performance it is intended to improve. Educational systems that prioritise holistic wellbeing alongside academic achievement are not only more humane but ultimately more effective.',
    modelAnnotations: [
      'Concesión breve ("while advocates argue...") antes de la postura — técnica Band 8.',
      'Tesis reiterada con vocabulario nuevo: "chronic academic stress imposes measurable costs" ≠ la introducción.',
      'Síntesis de ambos párrafos en una oración ("disproportionate harm", "psychological and physiological costs").',
      'Sin información nueva — la última oración extrae una conclusión de lo ya argumentado.',
    ],
  },
  {
    type: 'Discusión',
    prompt: 'Some people think parents should restrict children\'s smartphone use. Others believe children should manage their own digital lives. Discuss both views and give your own opinion.',
    bodySummary: [
      'Body 1 (View A — restricción): Los niños carecen de la madurez cognitiva para gestionar el uso digital, haciéndolos vulnerables a contenido dañino y adicción.',
      'Body 2 (View B — autonomía): La autonomía digital enseña autorregulación y prepara a los niños para un mundo inevitablemente digital.',
    ],
    thesis: 'La supervisión parental guiada es más efectiva que la restricción total o la libertad completa.',
    model: 'In conclusion, while allowing children unregulated access to digital devices risks exposing them to genuinely harmful content, an outright ban denies them the opportunity to develop the self-regulation skills they will need throughout their adult lives. I believe that graduated parental oversight — decreasing steadily as children demonstrate digital maturity — represents the most balanced and effective approach, combining protection with the development of lasting digital literacy.',
    modelAnnotations: [
      'Reconoce ambas posturas en la conclusión — obligatorio en Discusión.',
      'Tu opinión está clara: "graduated parental oversight... the most balanced approach."',
      'Síntesis de las dos posturas del cuerpo: "protection" (View A) + "development of digital literacy" (View B).',
      'Sin información nueva — "graduated oversight" siguió lógicamente de los argumentos ya presentados.',
    ],
  },
  {
    type: 'Problema-Solución',
    prompt: 'Traffic congestion in many cities has become severely problematic. What are the main causes, and what can governments do?',
    bodySummary: [
      'Body 1 (Causas): (1) Dependencia del coche privado por falta de alternativas. (2) Planificación urbana que separa zonas residenciales y comerciales.',
      'Body 2 (Soluciones): (1) Inversión en transporte público masivo. (2) Peajes de congestión para reducir demanda en horas pico.',
    ],
    thesis: 'Se requiere una combinación de inversión en transporte público y gestión de la demanda.',
    model: 'In conclusion, urban traffic congestion is fundamentally a product of car-centric infrastructure and inadequate alternatives. Governments that address this crisis must simultaneously expand affordable, reliable public transit to reduce the necessity of private vehicle use, while implementing demand-management tools such as congestion pricing to discourage discretionary car journeys. These complementary interventions, applied consistently over time, offer the most credible path to significantly reducing gridlock in modern cities.',
    modelAnnotations: [
      'Retoma las causas ("car-centric infrastructure", "inadequate alternatives") sin repetirlas literalmente.',
      'Resume las dos soluciones del Body 2 en una oración compacta.',
      '"Complementary interventions" conecta lógicamente solución 1 con solución 2 — sin información nueva.',
      'Cierra con una evaluación de efectividad, no una predicción especulativa.',
    ],
  },
  {
    type: 'Dos preguntas',
    prompt: 'More people are choosing to live alone. Why is this happening? Is this a positive or negative development?',
    bodySummary: [
      'Body 1 (Por qué): (1) Aumento del costo de vida que retrasa la formación de parejas. (2) Cambio cultural — la independencia se valora más que la convivencia.',
      'Body 2 (Evaluación): Positivo a nivel individual (autonomía, enfoque en carrera), pero negativo a nivel social (aislamiento, tasas de natalidad bajas, presión sobre servicios públicos).',
    ],
    thesis: 'El fenómeno tiene causas estructurales y sus consecuencias son predominantemente negativas a largo plazo.',
    model: 'In conclusion, the rise of single-person households reflects both the structural economic pressures and evolving cultural values that characterise contemporary life in many developed nations. While individual autonomy and self-determination are undeniably valuable, the broader social consequences of this trend — including increased loneliness, declining birth rates, and greater pressure on public services — suggest that its overall impact on society is cause for genuine concern. Policymakers should consider how to mitigate these effects without restricting individual freedoms.',
    modelAnnotations: [
      'Responde Q1 ("reflects structural economic pressures and cultural values") en una frase concisa.',
      'Responde Q2 con claridad: "its overall impact on society is cause for genuine concern" — evaluación negativa.',
      'La última oración es una implicación de los argumentos previos, no información nueva.',
      'Equilibra las perspectivas individual y social — reconoce el valor de la autonomía antes de concluir negativamente.',
    ],
  },
  {
    type: 'Spot-the-mistake — Opinión',
    prompt: 'Governments should invest more in arts and culture than in science and technology. Do you agree or disagree?',
    bodySummary: [
      'Body 1: La ciencia y tecnología generan progreso médico, económico y soluciones a crisis globales (cambio climático, pandemias).',
      'Body 2: Las artes, aunque valiosas culturalmente, no tienen el impacto material de la inversión en I+D+i.',
    ],
    thesis: 'Los gobiernos deben priorizar la inversión en ciencia y tecnología sobre las artes.',
    model: 'In conclusion, while arts and culture enrich society in important ways, governments facing resource constraints must prioritise investment in science and technology, which offer tangible solutions to the most pressing challenges of our time — from climate change to global health crises. A small allocation to arts funding is justified, but the primary focus of public expenditure should be directed towards areas with the greatest measurable impact on human wellbeing and prosperity.',
    modelAnnotations: [
      'Concede algo a las artes ("enrich society in important ways") — evita parecer dogmático.',
      'Tesis clara: "governments must prioritise science and technology."',
      'Resume el argumento del cuerpo sin repetirlo: "tangible solutions to the most pressing challenges."',
      'La mención de "small allocation to arts" sigue de los argumentos previos — no es información nueva.',
    ],
  },
];

const BAD_CONCLUSION = {
  text: 'In conclusion, I have talked about the advantages and disadvantages of governments investing in arts. There are many good points on both sides. I think arts are important but so is science. It is hard to say which is better. In my opinion, the government should think about this carefully and make a good decision. In the future, this topic will continue to be debated.',
  problems: [
    { label: '"I have talked about" — resume el proceso, no el argumento', expl: 'Una conclusión nunca describe lo que hiciste ("I discussed X"). Debe sintetizar los argumentos y reafirmar tu posición.' },
    { label: '"advantages and disadvantages on both sides" — no tiene posición para un ensayo de Opinión', expl: '"Do you agree or disagree?" exige UNA posición. "Both sides" en la conclusión de un ensayo de Opinión indica que nunca tomaste partido — Task Response Band 4.' },
    { label: '"It is hard to say which is better" — evasión explícita de la tesis', expl: 'Esto es exactamente lo opuesto de lo que pide el examinador. Debes decir cuál es mejor y por qué, basándote en tu argumento.' },
    { label: '"the government should think about this carefully" — vago e inútil', expl: 'Una recomendación tan genérica no añade valor. Si vas a hacer una recomendación, debe ser específica: "Governments should allocate at least X% of R&D budgets to..."' },
    { label: '"In the future, this topic will continue to be debated" — especulación nueva', expl: 'Información nueva en la conclusión viola la regla más básica. Una conclusión no predice el futuro — sintetiza los argumentos que YA presentaste.' },
  ],
};

function wc(t: string) { return t.trim().split(/\s+/).filter(Boolean).length; }

export default function ConclusionTask2Client() {
  const [showCompare, setShowCompare] = useState(false);
  const [exIdx, setExIdx] = useState(0);
  const [text, setText] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState<(boolean | null)[]>([null, null, null]);
  const [showModel, setShowModel] = useState(false);
  const [spotPhase, setSpotPhase] = useState(false);
  const [spotFound, setSpotFound] = useState<boolean[]>([false,false,false,false,false]);

  const ex = EXERCISES[exIdx];
  const isSpot = ex.type === 'Spot-the-mistake — Opinión';
  const count = wc(text);

  function submit() {
    if (attempt === 0) setAttempt(1);
    else setRevealed(true);
  }

  function nextEx() {
    if (exIdx < EXERCISES.length - 1) {
      setExIdx(i => i + 1); setText(''); setAttempt(0); setRevealed(false);
      setChecks([null, null, null]); setShowModel(false);
    } else { setSpotPhase(true); }
  }

  function toggleCheck(i: number) { setChecks(c => c.map((v, j) => j === i ? !v : v)); }

  if (spotPhase) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => { setSpotPhase(false); setExIdx(0); setText(''); setAttempt(0); setRevealed(false); setChecks([null,null,null]); setShowModel(false); }}>← Ejercicios</button>
      </div>
      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />🔬 Spot the mistake</p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.4rem' }}>Conclusión Band 4 — identifica los 5 errores</h2>
      <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid #dc2626', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Conclusión del estudiante</p>
        <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.85, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{BAD_CONCLUSION.text}&rdquo;</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {BAD_CONCLUSION.problems.map((p, i) => (
          <button key={i} onClick={() => setSpotFound(d => d.map((v,j) => j===i ? !v : v))}
            style={{ textAlign: 'left', padding: '0.75rem 0.9rem', borderRadius: 10, border: spotFound[i] ? '2px solid #dc2626' : '1.5px solid var(--line-soft)', background: spotFound[i] ? 'rgba(220,38,38,0.06)' : 'var(--bg-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
            <p style={{ margin: 0, fontSize: '0.87rem', fontWeight: 700, color: spotFound[i] ? '#dc2626' : 'var(--ink)' }}>{spotFound[i] ? '✓ ' : '○ '}{p.label}</p>
            {spotFound[i] && <p style={{ margin: '0.35rem 0 0', fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{p.expl}</p>}
          </button>
        ))}
      </div>
      {spotFound.every(Boolean) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.25)' }}>
            <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', fontWeight: 700, color: '#059669' }}>¡Excelente — identificaste los 5 errores!</p>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>Conclusión modelo Band 7+:</p>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{EXERCISES[4].model}&rdquo;</p>
          </div>
          <Link href="/practica/ielts/academic/writing/task2/tarea-completa" className="btn btn-sm" style={{ alignSelf: 'flex-start' }}>Sub-habilidad 6: Tarea Completa →</Link>
        </div>
      )}
    </div></div></section>
  );

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Conclusión</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🏁 Sub-habilidad 5</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Conclusión</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            La conclusión retoma tu tesis con vocabulario nuevo y sintetiza los puntos principales. 40–70 palabras es suficiente. Nunca introduzcas información nueva. El examinador lee esto última — es tu oportunidad de confirmar tu Band.
          </p>

          <Task2OfficialReviewBlock
            focus="Cerrar el ensayo reafirmando la tesis sin introducir ideas nuevas."
            officialFormat="IELTS Academic Writing Task 2 requiere una respuesta completa y organizada. La conclusión es parte de esa respuesta, no un criterio oficial aislado."
            welearnStrategy="Entrenamos conclusiones para confirmar posición, sintetizar razones y evitar cierres vagos o información nueva."
            answerCheck="Una conclusión fuerte reformula la tesis, resume el razonamiento y mantiene el mismo alcance del prompt."
          />

          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => setShowCompare(v => !v)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>📊 Band 5–6 vs Band 7–8 — comparación de conclusión</p>
              <span style={{ color: 'var(--muted)' }}>{showCompare ? '▲' : '▼'}</span>
            </div>
            {showCompare && (
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '0.85rem' }}>
                {[
                  { label: 'Band 5–6', text: BAND_COMPARE.band56.text, items: BAND_COMPARE.band56.problems, color: '#dc2626', bg: 'rgba(220,38,38,0.05)', mark: '✗' },
                  { label: 'Band 7–8', text: BAND_COMPARE.band78.text, items: BAND_COMPARE.band78.strengths, color: '#059669', bg: 'rgba(5,150,105,0.05)', mark: '✓' },
                ].map(col => (
                  <div key={col.label}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 800, color: col.color, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>{col.label}</p>
                    <div style={{ padding: '0.85rem', borderRadius: 9, background: col.bg, border: `1px solid ${col.color}35`, marginBottom: '0.5rem' }}>
                      <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.75, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{col.text}&rdquo;</p>
                    </div>
                    {col.items.map((item, i) => <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.78rem', color: col.color, lineHeight: 1.5 }}>{col.mark} {item}</p>)}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ padding: '0.85rem 1.1rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem' }}>
            {RULES.map((r, i) => (
              <p key={i} style={{ margin: i < RULES.length - 1 ? '0 0 0.3rem' : 0, fontSize: '0.83rem', color: r.icon === '✓' ? 'var(--ink-2)' : '#dc2626', lineHeight: 1.5 }}>
                <strong style={{ color: r.icon === '✓' ? '#059669' : '#dc2626' }}>{r.icon}</strong> {r.text}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((exIdx + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{exIdx + 1}/{EXERCISES.length} — {ex.type}</span>
          </div>

          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Enunciado</p>
              <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem', borderRadius: 8, background: 'rgba(15,61,140,0.1)', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 700 }}>{ex.type}</span>
            </div>
            <p style={{ margin: '0 0 1rem', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{ex.prompt}&rdquo;</p>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Resumen del cuerpo</p>
            {ex.bodySummary.map((s, i) => (
              <p key={i} style={{ margin: i < ex.bodySummary.length - 1 ? '0 0 0.3rem' : 0, fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{s}</p>
            ))}
          </div>

          {isSpot && (
            <div style={{ padding: '0.85rem 1.1rem', borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', marginBottom: '1rem', fontSize: '0.83rem', color: '#d97706', lineHeight: 1.6 }}>
              <strong>Pista:</strong> Tras escribir tu conclusión, haz clic en &ldquo;Spot the mistake&rdquo; para analizar una conclusión Band 4 del mismo prompt.
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem' }}>Tu conclusión:</label>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={5}
              placeholder="In conclusion / To conclude / Overall, ... [retoma tu tesis con vocabulario diferente] [sintetiza los puntos principales]"
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.65, resize: 'vertical', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: count > 80 ? '#d97706' : 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {count} palabras {count > 80 ? '— considera reducir (ideal: 40–70)' : count > 0 ? '(ideal: 40–70)' : ''}
              </span>
              {count > 15 && !revealed && (
                <button className="btn btn-sm" onClick={submit}>{attempt === 0 ? 'Analizar →' : 'Ver modelo →'}</button>
              )}
            </div>
          </div>

          {attempt > 0 && !revealed && (
            <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.65rem' }}>Auto-evaluación</p>
              {['¿Retomaste la tesis con vocabulario diferente al de la introducción?', '¿Sintetizaste los puntos del cuerpo sin repetirlos literalmente?', '¿Evitaste añadir información nueva (datos, argumentos, predicciones)?'].map((item, i) => (
                <button key={i} onClick={() => toggleCheck(i)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '0.6rem 0.8rem', borderRadius: 9, border: checks[i] === true ? '2px solid #059669' : checks[i] === false ? '2px solid #dc2626' : '1.5px solid var(--line-soft)', background: checks[i] === true ? 'rgba(5,150,105,0.07)' : checks[i] === false ? 'rgba(220,38,38,0.05)' : 'var(--bg)', cursor: 'pointer', textAlign: 'left', marginBottom: '0.4rem', width: '100%', transition: 'all 0.15s' }}>
                  <span style={{ fontSize: '1.05rem', lineHeight: 1, minWidth: 20, marginTop: '0.05rem' }}>{checks[i] === true ? '✓' : checks[i] === false ? '✗' : '○'}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.5 }}>{item}</span>
                </button>
              ))}
            </div>
          )}

          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Conclusión modelo Band 7–8</p>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--ink)' }}>{ex.model}</p>
                {ex.modelAnnotations.map((note, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                    <span style={{ color: '#059669', fontWeight: 800, fontSize: '0.82rem', lineHeight: 1.4, minWidth: 18 }}>{i + 1}.</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{note}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-sm" onClick={nextEx} style={{ alignSelf: 'flex-start' }}>
                {exIdx < EXERCISES.length - 1 ? 'Siguiente ejercicio →' : 'Spot the mistake →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
