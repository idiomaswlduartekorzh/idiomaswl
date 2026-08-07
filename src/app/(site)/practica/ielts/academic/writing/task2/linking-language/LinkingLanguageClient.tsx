'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import { placeOption } from '@/lib/practica/shuffle-options';

const BANK = [
  { cat: 'Adición', color: '#0f3d8c', bg: 'rgba(15,61,140,0.08)', items: ['Furthermore', 'Moreover', 'In addition', 'Additionally', 'What is more', 'Not only... but also'] },
  { cat: 'Contraste', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', items: ['However', 'Nevertheless', 'On the other hand', 'In contrast', 'Whereas', 'Conversely', 'Despite this'] },
  { cat: 'Causa-Efecto', color: '#059669', bg: 'rgba(5,150,105,0.08)', items: ['As a result', 'Therefore', 'Consequently', 'Hence', 'This means that', 'This has led to', 'Due to this'] },
  { cat: 'Ejemplo', color: '#d97706', bg: 'rgba(217,119,6,0.08)', items: ['For example', 'For instance', 'In particular', 'A case in point is', 'This is illustrated by', 'Such as'] },
  { cat: 'Concesión', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', items: ['Admittedly', 'While this may be true', 'It is true that', 'Although', 'Despite the fact that', 'Even though'] },
  { cat: 'Comparación', color: '#0891b2', bg: 'rgba(8,145,178,0.08)', items: ['Similarly', 'Likewise', 'In the same way', 'By comparison', 'Compared to'] },
  { cat: 'Conclusión', color: '#6b7280', bg: 'rgba(107,114,128,0.08)', items: ['In conclusion', 'To conclude', 'In summary', 'To summarise', 'Overall', 'To sum up'] },
];

interface Ex {
  category: string; catColor: string; catBg: string;
  before: string; correct: string; after: string;
  options: string[]; explanation: string;
  usageNote: string;
}

const EXERCISES: Ex[] = [
  {
    category: 'Adición', catColor: '#0f3d8c', catBg: 'rgba(15,61,140,0.07)',
    before: 'Online learning has democratised access to higher education for students worldwide.',
    correct: 'Furthermore', after: ', it has opened professional development pathways for working adults who cannot attend traditional campuses.',
    options: ['Furthermore', 'However', 'As a result', 'For example'],
    explanation: '"Furthermore" adds a parallel positive point — both clauses support the same pro-online-learning argument. "However" would contradict it. "As a result" would imply the first clause caused the second (it didn\'t). "For example" would introduce a specific case — but the second clause is another general benefit, not an example.',
    usageNote: 'Use Furthermore/Moreover when you are adding a point that SUPPORTS the same argument, not contradicts it.',
  },
  {
    category: 'Contraste', catColor: '#7c3aed', catBg: 'rgba(124,58,237,0.07)',
    before: 'Renewable energy sources such as solar and wind power have become significantly more affordable in recent years.',
    correct: 'However', after: ', many developing nations still rely heavily on fossil fuels due to the high upfront cost of transitioning their infrastructure.',
    options: ['However', 'Furthermore', 'Therefore', 'For instance'],
    explanation: '"However" signals that what follows contradicts or qualifies what was said before. The first clause is positive about renewables; the second introduces an obstacle. "Furthermore" would add a parallel positive point (wrong — this is a contrast). "Therefore" implies causality (wrong — lower costs don\'t cause continued fossil fuel use). "For instance" would introduce an example of the first clause.',
    usageNote: 'Use However/Nevertheless when the second clause contradicts, limits or qualifies the first. Ask: "Does this go against what I just said?"',
  },
  {
    category: 'Causa-Efecto', catColor: '#059669', catBg: 'rgba(5,150,105,0.07)',
    before: 'The rapid expansion of e-commerce has fundamentally transformed consumer purchasing habits across the globe.',
    correct: 'As a result', after: ', many traditional high-street retailers have been forced to permanently close their stores.',
    options: ['As a result', 'In addition', 'For example', 'Nevertheless'],
    explanation: '"As a result" correctly identifies store closures as the EFFECT of e-commerce growth. The first clause is the CAUSE; the second is its CONSEQUENCE. "In addition" would add a parallel point (not a consequence). "For example" would introduce an illustration of e-commerce growth (not what follows). "Nevertheless" would introduce a contrast despite the cause.',
    usageNote: 'Use As a result/Consequently/Therefore when C2 is a direct consequence of C1. Test: "C1 CAUSED C2."',
  },
  {
    category: 'Ejemplo', catColor: '#d97706', catBg: 'rgba(217,119,6,0.07)',
    before: 'Several countries have achieved significant reductions in car dependency through sustained investment in cycling infrastructure.',
    correct: 'For instance', after: ', Amsterdam now handles over 40% of all daily urban trips by bicycle following three decades of dedicated investment in cycle lanes and storage facilities.',
    options: ['For instance', 'However', 'Consequently', 'In conclusion'],
    explanation: '"For instance" introduces Amsterdam as a specific, concrete illustration of the general claim. "However" would contradict the claim about car dependency reduction. "Consequently" would imply Amsterdam\'s statistics are a result of the general claim (circular logic). "In conclusion" signals the end of an essay — far too early here.',
    usageNote: 'Use For example/For instance when what follows is a SPECIFIC CASE that illustrates a general claim. The example should be more concrete than the claim.',
  },
  {
    category: 'Concesión', catColor: '#dc2626', catBg: 'rgba(220,38,38,0.07)',
    before: 'Public transport systems require substantial upfront government investment.',
    correct: 'Admittedly', after: ', yet the long-term environmental, social and economic returns on this expenditure vastly outweigh the initial costs for any city serious about sustainability.',
    options: ['Admittedly', 'Furthermore', 'For example', 'Consequently'],
    explanation: '"Admittedly" introduces a concession — acknowledging a valid point from the opposing view BEFORE countering it. The structure is: "Admittedly [counterargument], yet/however [your stronger argument wins]." This is Band 8 technique. "Furthermore" would add another supporting point. "For example" would introduce an example. "Consequently" would show a result.',
    usageNote: 'Admittedly/It is true that are used when you want to acknowledge a weakness in your argument or the opponent\'s strongest point BEFORE explaining why your position still holds. Creates a sophisticated, nuanced argument.',
  },
  {
    category: 'Comparación', catColor: '#0891b2', catBg: 'rgba(8,145,178,0.07)',
    before: 'The Nordic countries have consistently achieved high scores on global education rankings through sustained investment in teacher training and school resources.',
    correct: 'Similarly', after: ', East Asian nations such as South Korea and Singapore have reached the top of international PISA tables by prioritising educator quality and curriculum rigour.',
    options: ['Similarly', 'However', 'As a result', 'Admittedly'],
    explanation: '"Similarly" introduces a parallel case that reinforces the same point — both examples support the claim about investing in education quality. "However" would contradict the Nordic success story. "As a result" would imply East Asian success was caused by Nordic investment. "Admittedly" would acknowledge a weakness — East Asian success actually supports the argument.',
    usageNote: 'Use Similarly/Likewise when you are adding a SECOND EXAMPLE or CASE that parallels and reinforces your first example. Both cases support the same claim.',
  },
  {
    category: 'Conclusión', catColor: '#6b7280', catBg: 'rgba(107,114,128,0.07)',
    before: 'Both individual behaviour change and systemic government policy have critical and complementary roles to play in addressing the climate crisis.',
    correct: 'In conclusion', after: ', only a sustained, coordinated global effort — combining personal responsibility with ambitious regulation — can lead society towards a genuinely sustainable future.',
    options: ['In conclusion', 'Furthermore', 'For instance', 'However'],
    explanation: '"In conclusion" signals the final synthesis of the essay\'s argument, drawing together the key points into a definitive statement. This sentence wraps up the entire essay. "Furthermore" would add another supporting point (but the essay is ending). "For instance" would introduce an example (premature in a conclusion). "However" would introduce a contrast (not appropriate for a closing statement).',
    usageNote: 'In conclusion/To conclude should only appear ONCE in your essay: in the first sentence of your final paragraph. Never use it in body paragraphs.',
  },
  {
    category: 'Contraste avanzado', catColor: '#7c3aed', catBg: 'rgba(124,58,237,0.07)',
    before: 'Remote working undeniably offers employees greater flexibility and in many cases increases individual productivity.',
    correct: 'Nevertheless', after: ', it raises serious concerns about workplace cohesion, employee mental health, and the erosion of the boundary between professional and personal life that cannot simply be dismissed.',
    options: ['Nevertheless', 'Furthermore', 'For instance', 'In conclusion'],
    explanation: '"Nevertheless" (like "However") introduces a contrast — but is slightly stronger, indicating that the contrasting point holds DESPITE what was just acknowledged. It is often used after conceding a point: "I admit X is true. Nevertheless, Y is an even more important consideration." "Furthermore" would add a supporting point. "For instance" would add an example. "In conclusion" would end the essay prematurely.',
    usageNote: 'Nevertheless is often used after Admittedly to complete the concession structure: "Admittedly [opponent\'s point]. Nevertheless, [your stronger counter-argument]."',
  },
];

const FIX_PARA = {
  original: 'In conclusion, technology has clearly changed how people communicate. Furthermore, there are both benefits and drawbacks to consider carefully. However, for example, social media platforms allow people to stay in contact across great distances. Moreover, some experts argue that face-to-face communication is becoming rarer. Therefore, in conclusion, we must all think carefully about how we use digital technology going forward.',
  problems: [
    { label: '"In conclusion" at the start of a BODY paragraph', fix: 'Never use "In conclusion" in a body paragraph. It signals the end of the essay. Use "It is clear that..." or just state your point directly.' },
    { label: '"Furthermore, there are both benefits and drawbacks" — vague and non-committal', fix: '"Furthermore" signals addition, but "both benefits and drawbacks" adds nothing specific. This sentence says nothing. Remove it and replace with an actual developed point.' },
    { label: '"However, for example" — two connectors with conflicting functions', fix: '"However" (contrast) and "for example" (illustration) cannot be combined. Choose one: if it\'s a contrast use "However,"; if it\'s an example use "For example,".' },
    { label: '"Moreover, some experts argue..." — "Moreover" signals addition, but this introduces a contrasting view', fix: 'Use "However" or "In contrast" when introducing a view that contradicts or contrasts with the previous point. "Moreover" is for adding a supporting parallel point.' },
    { label: '"Therefore, in conclusion" — two conclusion connectors colliding', fix: '"Therefore" (cause-effect) and "in conclusion" (essay ending) have different functions. Use only one. Here, neither is needed — just state your conclusion directly.' },
  ],
};

export default function LinkingLanguageClient() {
  const [showBank, setShowBank] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [fixPhase, setFixPhase] = useState(false);
  const [fixFound, setFixFound] = useState<boolean[]>([false,false,false,false,false]);
  const [finished, setFinished] = useState(false);

  const q = EXERCISES[qIdx];
  /**
   * Los ocho ejercicios declaraban el conector correcto en primera posición y no se
   * barajaba nada: la respuesta era la A en los ocho. Se aprobaba el bloque entero
   * pulsando arriba a la izquierda ocho veces seguidas.
   *
   * La comparación es por valor (`selected === q.correct`), así que repartir el orden no
   * toca ninguna otra lógica.
   */
  const shuffledOptions = useMemo(
    () => placeOption(q.options, q.options.indexOf(q.correct), `linking|${q.category}|${q.correct}`, qIdx).options,
    [q, qIdx],
  );
  const isCorrect = selected === q.correct;
  const showHint = attempt > 0 && !locked && selected !== null && !isCorrect;
  const canRetry = showHint;

  function select(opt: string) {
    if (locked) return;
    setSelected(opt);
    if (opt === q.correct) { setScore(s => s + (attempt === 0 ? 2 : 1)); setLocked(true); }
    else if (attempt === 0) { setAttempt(1); }
    else { setLocked(true); }
  }

  function retry() { setSelected(null); }

  function nextQ() {
    if (qIdx < EXERCISES.length - 1) { setQIdx(i => i+1); setSelected(null); setAttempt(0); setLocked(false); }
    else { setFixPhase(true); }
  }

  if (finished) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="wl-card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #0f3d8c' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>Resultado final</p>
        <p style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--ink)', margin: '0 0 0.2rem', lineHeight: 1 }}>{score}/{EXERCISES.length * 2}</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0 0 1.5rem' }}>
          {score >= 14 ? 'Dominio excelente de conectores — nivel Band 8.' : score >= 10 ? 'Buen nivel. Repasa las categorías que fallaste.' : 'Regresa al banco de frases y practica por categoría.'}
        </p>
        <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-sm" onClick={() => { setQIdx(0); setSelected(null); setAttempt(0); setLocked(false); setScore(0); setFixPhase(false); setFixFound([false,false,false,false,false]); setFinished(false); }}>Intentar de nuevo</button>
          <Link href="/practica/ielts/academic/writing/task2/conclusion" className="btn btn-ghost btn-sm">Sub-habilidad 5: Conclusión →</Link>
        </div>
      </div>
    </div></div></section>
  );

  if (fixPhase) return (
    <section className="wl-section"><div className="wrap"><div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setFixPhase(false)}>← Ejercicios</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Análisis crítico — párrafo sobre-conectado</span>
      </div>
      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />🔬 Fix the paragraph</p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.4rem' }}>Identifica los 5 errores de conectores</h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
        Este párrafo tiene cinco errores graves de linking language. Haz clic en cada problema para ver el análisis y la corrección.
      </p>
      <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid #dc2626', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Párrafo con errores</p>
        <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.85, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{FIX_PARA.original}&rdquo;</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {FIX_PARA.problems.map((p, i) => (
          <button key={i} onClick={() => setFixFound(d => d.map((v,j) => j===i ? !v : v))}
            style={{ textAlign: 'left', padding: '0.75rem 0.9rem', borderRadius: 10, border: fixFound[i] ? '2px solid #dc2626' : '1.5px solid var(--line-soft)', background: fixFound[i] ? 'rgba(220,38,38,0.06)' : 'var(--bg-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
            <p style={{ margin: 0, fontSize: '0.87rem', fontWeight: 700, color: fixFound[i] ? '#dc2626' : 'var(--ink)' }}>{fixFound[i] ? '✓ ' : '○ '}{p.label}</p>
            {fixFound[i] && <p style={{ margin: '0.35rem 0 0', fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}><strong>Corrección:</strong> {p.fix}</p>}
          </button>
        ))}
      </div>
      {fixFound.every(Boolean) && (
        <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.25)', marginBottom: '1rem' }}>
          <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', fontWeight: 700, color: '#059669' }}>¡Perfecto — identificaste los 5 errores!</p>
          <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>Versión corregida: <em>&ldquo;Technology has undeniably transformed the way people communicate. Social media platforms, for instance, allow individuals to maintain relationships across vast distances with unprecedented ease. However, some researchers argue that this convenience comes at the cost of communication depth, with face-to-face interactions becoming increasingly rare in daily life. The implications of this shift for social cohesion require careful consideration.&rdquo;</em></p>
        </div>
      )}
      <button className="btn" onClick={() => setFinished(true)}>Ver resultado final →</button>
    </div></div></section>
  );

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Linking Language</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🔗 Sub-habilidad 4</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Linking Language</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            Los conectores determinan la lógica de tu argumento. El error más común de Band 5–6 es usar conectores de adición cuando se necesita contraste, o mezclar funciones. Cada conector tiene una función específica — aprende a elegir por la relación lógica entre las cláusulas.
          </p>

          <Task2OfficialReviewBlock
            focus="Elegir conectores según la relación lógica entre ideas."
            officialFormat="IELTS Academic Writing Task 2 evalúa coherencia y cohesión dentro de un ensayo. Linking language es una habilidad transversal, no una tarea oficial separada."
            welearnStrategy="Entrenamos conectores por función para evitar listas mecánicas y mejorar la progresión real del argumento."
            answerCheck="Una respuesta fuerte usa conectores porque la relación lo exige: contraste, causa, ejemplo, concesión o cierre, no por decorar el texto."
          />

          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => setShowBank(v => !v)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>📖 Banco completo de conectores (7 categorías)</p>
              <span style={{ color: 'var(--muted)' }}>{showBank ? '▲' : '▼'}</span>
            </div>
            {showBank && (
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {BANK.map(cat => (
                  <div key={cat.cat}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 800, color: cat.color, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>{cat.cat}</p>
                    <div style={{ padding: '0.6rem 0.8rem', borderRadius: 8, background: cat.bg, border: `1px solid ${cat.color}35` }}>
                      {cat.items.map(item => <p key={item} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: cat.color, fontFamily: 'var(--mono)' }}>{item}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((qIdx + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{qIdx + 1}/{EXERCISES.length} · {score} pts</span>
          </div>

          <div style={{ marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 10, background: q.catBg, color: q.catColor, border: `1px solid ${q.catColor}35`, fontFamily: 'var(--mono)', fontWeight: 700 }}>
              Función: {q.category}
            </span>
            {q.usageNote && <p style={{ margin: '0.4rem 0 0', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5, fontStyle: 'italic' }}>{q.usageNote}</p>}
          </div>

          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Completa la oración</p>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.85, color: 'var(--ink)' }}>
              {q.before}
              {selected !== null ? (
                <span style={{ fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', margin: '0 0.2rem' }}> {selected}</span>
              ) : (
                <span style={{ display: 'inline-block', minWidth: 120, borderBottom: '2px dashed #0f3d8c', margin: '0 0.3rem', verticalAlign: 'bottom', textAlign: 'center', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.85rem' }}>?</span>
              )}
              {q.after}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1rem' }}>
            {shuffledOptions.map(opt => {
              const isSel = selected === opt;
              const isRight = opt === q.correct;
              let border = '1.5px solid var(--line-soft)', bg = 'var(--bg-2)', color = 'var(--ink)';
              if (locked) {
                if (isRight) { border = '2px solid #059669'; bg = 'rgba(5,150,105,0.08)'; color = '#059669'; }
                else if (isSel) { border = '2px solid #dc2626'; bg = 'rgba(220,38,38,0.07)'; color = '#dc2626'; }
              } else if (isSel && !isRight) { border = '2px solid #dc2626'; bg = 'rgba(220,38,38,0.05)'; color = '#dc2626'; }
              return (
                <button key={opt} onClick={() => select(opt)}
                  style={{ padding: '0.85rem', borderRadius: 10, border, background: bg, cursor: locked ? 'default' : 'pointer', fontWeight: 700, fontSize: '0.93rem', color, fontFamily: 'var(--mono)', transition: 'all 0.15s' }}>
                  {opt}
                </button>
              );
            })}
          </div>

          {showHint && (
            <div style={{ padding: '0.85rem 1.1rem', borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', marginBottom: '0.85rem' }}>
              <p style={{ margin: '0 0 0.3rem', fontSize: '0.78rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Pista</p>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>Piensa en la relación lógica entre las dos cláusulas. ¿La segunda cláusula APOYA, CONTRASTA, ES CONSECUENCIA DE, o EJEMPLIFICA la primera?</p>
              {canRetry && <button className="btn btn-sm" onClick={retry}>Intentar de nuevo →</button>}
            </div>
          )}

          {locked && (
            <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: isCorrect ? 'rgba(5,150,105,0.07)' : 'rgba(15,61,140,0.05)', border: `1px solid ${isCorrect ? 'rgba(5,150,105,0.25)' : 'rgba(15,61,140,0.2)'}`, marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'var(--mono)', margin: '0 0 0.4rem', color: isCorrect ? '#059669' : '#0f3d8c' }}>
                {isCorrect ? `✓ Correcto — "${q.correct}"` : `Respuesta: "${q.correct}"`}
              </p>
              <p style={{ margin: 0, fontSize: '0.87rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{q.explanation}</p>
            </div>
          )}

          {locked && (
            <button className="btn btn-sm" onClick={nextQ}>
              {qIdx < EXERCISES.length - 1 ? 'Siguiente →' : 'Fix the paragraph →'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
