'use client';
import { useState } from 'react';
import Link from 'next/link';

const BAND_COMPARE = {
  prompt: 'Governments should invest more in public transport than in road construction.',
  band6: {
    text: 'Public transport is more efficient than cars. When more people use buses and trains, there are fewer cars on the road. This means less traffic. For example, Singapore has a good transport system. This shows that public transport is better.',
    problems: [
      'T — Topic sentence too vague: "more efficient" without specifying what or why.',
      'E — Explanation is obvious reasoning, no mechanism or data. Anyone knows fewer cars = less traffic.',
      'E — Example is generic ("Singapore has a good system") — no specific data, no figures.',
      'L — Link is circular ("shows that public transport is better") — just repeats the claim without connecting to a bigger argument.',
    ],
  },
  band8: {
    text: 'Public transport represents a dramatically more efficient use of urban infrastructure than private vehicles. A single articulated bus carries up to 120 passengers while occupying the space of three or four cars, simultaneously reducing road congestion and per-passenger emissions. Singapore\'s Land Transport Authority reported that its mass rapid transit expansion reduced private car usage by 28% between 2010 and 2022, handling 3.4 million daily journeys. This evidence strongly suggests that sustained government investment in mass transit delivers measurable improvements in urban mobility for the vast majority of city residents.',
    strengths: [
      'T — Specific, precise claim with academic vocabulary ("dramatically more efficient use of urban infrastructure").',
      'E — Concrete mechanism: specific data (120 passengers vs 3–4 car spaces) that proves the claim logically.',
      'E — Precise example: named authority, specific percentage (28%), specific figure (3.4M journeys), time period.',
      'L — Links back to the essay\'s main argument: connects evidence to the broader claim about government investment.',
    ],
  },
};

interface Exercise {
  context: string; type: string;
  topicSentence: string;
  e1label: string; e1model: string;
  e2label: string; e2model: string;
  lLabel: string; lModel: string;
}

const EXERCISES: Exercise[] = [
  {
    type: 'Opinión — argumento principal',
    context: 'Prompt: "Governments should invest more in public transport than in roads. To what extent do you agree?"',
    topicSentence: 'Public transport represents a dramatically more efficient use of urban infrastructure than private vehicle networks.',
    e1label: 'Explica el mecanismo — ¿por qué es más eficiente? (1–2 oraciones, con datos o lógica específica, sin ejemplo de país todavía)',
    e1model: 'A single articulated bus carries up to 120 passengers while occupying the space of only three or four cars, meaning that investing in bus fleets reduces road congestion proportionally while cutting per-passenger emissions significantly.',
    e2label: 'Example — da un caso concreto con nombre, cifras o estudio (ciudad, país, informe)',
    e2model: 'Singapore\'s Land Transport Authority reported that its mass rapid transit expansion reduced private car usage by 28% between 2010 and 2022, handling 3.4 million daily journeys at a fraction of the road space required by an equivalent number of vehicles.',
    lLabel: 'Link — conecta la evidencia con el argumento central del ensayo (empieza con "This demonstrates / suggests / shows that...")',
    lModel: 'This evidence strongly demonstrates that sustained government investment in mass transit infrastructure delivers measurable improvements in urban mobility for the majority of city residents, making it a far superior use of public funds than road expansion.',
  },
  {
    type: 'Opinión — refutación de contraargumento',
    context: 'Prompt: "Advertising aimed at children should be banned. To what extent do you agree?"',
    topicSentence: 'Admittedly, a total ban on children\'s advertising would restrict commercial activity significantly, yet this objection fundamentally misunderstands the power imbalance between advertisers and young audiences.',
    e1label: 'Explica por qué el contraargumento no es suficiente para refutarte — ¿cuál es la falla lógica o moral en ese argumento?',
    e1model: 'Children below the age of approximately eight lack the cognitive development to distinguish between promotional content and objective information, making them uniquely vulnerable to commercial manipulation in ways that adult consumers are not.',
    e2label: 'Example — evidencia que demuestra la vulnerabilidad de los niños ante la publicidad (estudio, dato, ejemplo real)',
    e2model: 'A landmark 2019 study by the American Psychological Association found that children under seven cannot identify the persuasive intent of advertisements, while 73% of children aged 8–12 reported wanting products they had seen advertised within 24 hours of exposure.',
    lLabel: 'Link — explica cómo esta evidencia justifica la posición a favor del ban (supera el contraargumento)',
    lModel: 'Given this documented vulnerability, the commercial inconvenience of restricting advertising is vastly outweighed by the necessity of protecting children from exploitation, and the objection that a ban restricts commerce fails to account for the ethical obligations society has towards its most impressionable members.',
  },
  {
    type: 'Discusión — presentando una postura (View A)',
    context: 'Prompt: "Some think schools should group students by ability. Others believe mixed-ability classes are better. Discuss both views."',
    topicSentence: 'Proponents of ability grouping argue that streaming students by academic level allows teachers to deliver instruction precisely calibrated to the needs of each group, maximising learning efficiency.',
    e1label: 'Explana el mecanismo — ¿cómo exactamente mejora la enseñanza cuando los estudiantes tienen niveles similares?',
    e1model: 'When all students in a class share a similar baseline, teachers can set a consistent pace and level of complexity without simultaneously leaving advanced students unchallenged and struggling students behind, creating a more productive learning environment for everyone in that group.',
    e2label: 'Example — un caso donde la agrupación por habilidad ha dado resultados positivos (sistema educativo, estudio, país)',
    e2model: 'In the United Kingdom, secondary school setting in mathematics has been associated with higher GCSE attainment in higher-ability groups, with a 2020 Education Endowment Foundation study finding that high-achieving students in setted classes outperformed their peers in mixed-ability environments by an average of three months\' additional progress.',
    lLabel: 'Link — concluye cómo este punto demuestra que el agrupamiento tiene cierto mérito (sin cerrar definitivamente el debate — eso va en tu conclusión)',
    lModel: 'This suggests that, at least for certain subjects and age groups, ability grouping can provide genuine academic benefits for high-achieving students, lending some credibility to the case for streaming despite its limitations.',
  },
  {
    type: 'Problema-Solución — párrafo de problema',
    context: 'Prompt: "Obesity rates have risen sharply. What are the main causes and what can be done?"',
    topicSentence: 'One of the most significant drivers of rising obesity rates is the dramatic reduction in habitual physical activity caused by increasingly sedentary modern lifestyles.',
    e1label: 'Explica el mecanismo — ¿cómo llevan los estilos de vida sedentarios específicamente a la obesidad? (no solo "people move less")',
    e1model: 'As desk-based employment has replaced manual labour, and as digital entertainment has supplanted outdoor recreation, the average daily caloric expenditure through physical activity has fallen significantly, creating a chronic energy surplus that the body stores as fat over time.',
    e2label: 'Example — un dato o estudio que cuantifique la reducción en actividad física y su relación con el aumento de peso',
    e2model: 'The World Health Organisation estimates that physical inactivity is responsible for up to 6% of the global burden of non-communicable diseases, while a 2021 Lancet study found that adults in high-income countries engage in an average of just 17 minutes of moderate physical activity per day — less than a third of the recommended minimum.',
    lLabel: 'Link — conecta con el tema del ensayo (necesidad de intervenciones)',
    lModel: 'This chronic inactivity, embedded into the structure of modern work and leisure, suggests that effective obesity reduction strategies must address lifestyle architecture rather than simply encouraging individuals to exercise more.',
  },
  {
    type: 'Problema-Solución — párrafo de solución',
    context: 'Prompt: "Obesity rates have risen sharply. What are the main causes and what can be done?"',
    topicSentence: 'The most effective governmental response to rising obesity would combine targeted taxation on ultra-processed foods with substantial investment in accessible public recreational infrastructure.',
    e1label: 'Explica el mecanismo dual — ¿cómo funciona el impuesto AND cómo funciona la infraestructura? Necesitas explicar AMBOS componentes.',
    e1model: 'A sugar and saturated fat levy modelled on the UK\'s Soft Drinks Industry Levy would raise the relative cost of nutritionally poor foods, nudging consumer behaviour towards healthier alternatives while generating revenue specifically for public health initiatives. Simultaneously, free or subsidised parks, cycle paths, and recreational centres remove the financial and logistical barriers that prevent low-income communities from accessing regular exercise.',
    e2label: 'Example — evidencia de que estas medidas funcionan (menciona al menos UNO con cifras)',
    e2model: 'The UK\'s sugar levy, introduced in 2018, prompted manufacturers to reformulate over 50% of affected products, reducing average sugar content by 28.8% without significant revenue losses for the industry — demonstrating that tax-based interventions can achieve meaningful dietary change.',
    lLabel: 'Link — conecta la solución con el problema específico que mencionaste en el Body 1',
    lModel: 'These complementary measures directly address the two root causes identified earlier: by making unhealthy food more expensive and physical activity more accessible, they reshape the everyday choices that collectively determine population-level health outcomes.',
  },
];

const DIAGNOSTIC = {
  paragraph: 'Climate change is a serious problem for the environment. Many scientists have said this is happening. There are lots of effects like flooding and droughts. This is very bad for people all over the world. Governments should do something about it.',
  issues: [
    { part: 'T', label: 'Topic sentence demasiado vago', correct: true, explanation: '"Climate change is a serious problem for the environment" no indica QUÉ argumento específico va a desarrollar este párrafo. Un examinador no sabe qué esperar del resto del párrafo.' },
    { part: 'E1', label: 'Explanation no explica ningún mecanismo', correct: true, explanation: '"Many scientists have said this is happening" solo repite que es un problema. No explica CÓMO ni POR QUÉ produce efectos, ni cuál es el proceso causal.' },
    { part: 'E2', label: 'Example sin datos específicos ni fuente', correct: true, explanation: '"Flooding and droughts" es genérico. Un ejemplo Band 7+ citaría: "According to the IPCC 2023 report, the frequency of extreme weather events has increased by 40% since 1980, with 2.3 billion people affected by flooding in the past decade."' },
    { part: 'L', label: 'Link introduce información nueva (soluciones)', correct: true, explanation: '"Governments should do something" introduce un nuevo punto (¿qué hacer?) que debería ir en otro párrafo. El Link debe conectar la evidencia con el argumento central del ensayo, NO abrir un tema nuevo.' },
  ],
};

export default function ParrafosCuerpoClient() {
  const [showCompare, setShowCompare] = useState(false);
  const [exIdx, setExIdx] = useState(0);
  const [e1, setE1] = useState('');
  const [e2, setE2] = useState('');
  const [lk, setLk] = useState('');
  const [assembled, setAssembled] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [diagPhase, setDiagPhase] = useState(false);
  const [diagFound, setDiagFound] = useState<boolean[]>([false, false, false, false]);

  const ex = EXERCISES[exIdx];
  const canAssemble = e1.trim().length > 15 && e2.trim().length > 15 && lk.trim().length > 15;

  function reset() { setE1(''); setE2(''); setLk(''); setAssembled(false); setShowModel(false); }
  function nextEx() {
    if (exIdx < EXERCISES.length - 1) { setExIdx(i => i + 1); reset(); }
    else setDiagPhase(true);
  }

  if (diagPhase) return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => { setDiagPhase(false); setExIdx(0); reset(); }}>← Ejercicios</button>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Diagnóstico — párrafo Band 5</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />🔬 Diagnóstico TEEL</p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.4rem' }}>Identifica las debilidades</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
            Este párrafo de un estudiante tiene cuatro problemas graves de TEEL. Identifícalos haciendo clic en cada problema que detectes.
          </p>
          <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid #dc2626', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Párrafo del estudiante (Band 5)</p>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{DIAGNOSTIC.paragraph}&rdquo;</p>
          </div>
          <p style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--muted)', margin: '0 0 0.6rem' }}>Haz clic en los problemas que detectas:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {DIAGNOSTIC.issues.map((issue, i) => (
              <button key={i} onClick={() => setDiagFound(d => d.map((v, j) => j === i ? !v : v))}
                style={{ textAlign: 'left', padding: '0.7rem 0.9rem', borderRadius: 10, border: diagFound[i] ? '2px solid #dc2626' : '1.5px solid var(--line-soft)', background: diagFound[i] ? 'rgba(220,38,38,0.06)' : 'var(--bg-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: diagFound[i] ? '0.35rem' : 0 }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: 6, background: `${['#0f3d8c','#7c3aed','#059669','#d97706'][i]}18`, color: ['#0f3d8c','#7c3aed','#059669','#d97706'][i], fontFamily: 'var(--mono)', fontWeight: 800 }}>{issue.part}</span>
                  <span style={{ fontSize: '0.87rem', fontWeight: 700, color: diagFound[i] ? '#dc2626' : 'var(--ink)' }}>{diagFound[i] ? '✓ ' : '○ '}{issue.label}</span>
                </div>
                {diagFound[i] && <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{issue.explanation}</p>}
              </button>
            ))}
          </div>
          {diagFound.every(Boolean) && (
            <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.25)', marginBottom: '1rem' }}>
              <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#059669' }}>¡Excelente — identificaste los 4 problemas!</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>Un párrafo Band 7+ de este mismo tema comenzaría: <em>&ldquo;One of the most significant consequences of climate change is the dramatic increase in the frequency and severity of extreme weather events.&rdquo;</em> Luego explicaría el mecanismo (CO₂ → temperatura → evaporación → precipitaciones extremas) con datos del IPCC, seguido de un ejemplo específico, y un link al argumento central.</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setDiagFound([false,false,false,false]); }}>Reiniciar diagnóstico</button>
            <Link href="/practica/ielts/academic/writing/task2/linking-language" className="btn btn-ghost btn-sm">Sub-habilidad 4: Linking Language →</Link>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 2</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 2 / Párrafos de Cuerpo</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🧱 Sub-habilidad 3</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Estructura TEEL</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            Todo párrafo de cuerpo Band 7+ sigue TEEL: Topic sentence (qué argumentas) → Explanation (cómo funciona) → Example (evidencia específica) → Link (conexión con el ensayo). El topic sentence ya está escrito — tú construyes E + E + L.
          </p>

          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => setShowCompare(v => !v)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>📊 Band 5–6 vs Band 7–8 — comparación de párrafo</p>
              <span style={{ color: 'var(--muted)' }}>{showCompare ? '▲' : '▼'}</span>
            </div>
            {showCompare && (
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '0.85rem' }}>
                {[
                  { label: 'Band 5–6', text: BAND_COMPARE.band6.text, items: BAND_COMPARE.band6.problems, color: '#dc2626', bg: 'rgba(220,38,38,0.05)', border: 'rgba(220,38,38,0.2)', mark: '✗' },
                  { label: 'Band 7–8', text: BAND_COMPARE.band8.text, items: BAND_COMPARE.band8.strengths, color: '#059669', bg: 'rgba(5,150,105,0.05)', border: 'rgba(5,150,105,0.2)', mark: '✓' },
                ].map(col => (
                  <div key={col.label}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 800, color: col.color, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>{col.label}</p>
                    <div style={{ padding: '0.85rem', borderRadius: 9, background: col.bg, border: `1px solid ${col.border}`, marginBottom: '0.5rem' }}>
                      <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.75, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{col.text}&rdquo;</p>
                    </div>
                    {col.items.map((item, i) => <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.78rem', color: col.color, lineHeight: 1.5 }}>{col.mark} {item}</p>)}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((exIdx + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{exIdx + 1}/{EXERCISES.length}</span>
          </div>

          <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--line-soft)', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.3rem' }}>{ex.type}</p>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--ink-2)', fontStyle: 'italic', lineHeight: 1.5 }}>{ex.context}</p>
          </div>

          <div style={{ padding: '1rem 1.25rem', borderRadius: 10, background: 'rgba(15,61,140,0.06)', border: '2px solid rgba(15,61,140,0.25)', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>T — Topic sentence (dada)</p>
            <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--ink)', fontWeight: 600 }}>{ex.topicSentence}</p>
          </div>

          {[
            { label: 'E — Explanation', color: '#7c3aed', border: 'rgba(124,58,237,0.3)', hint: ex.e1label, val: e1, set: setE1 },
            { label: 'E — Example', color: '#059669', border: 'rgba(5,150,105,0.3)', hint: ex.e2label, val: e2, set: setE2 },
            { label: 'L — Link back', color: '#d97706', border: 'rgba(217,119,6,0.3)', hint: ex.lLabel, val: lk, set: setLk },
          ].map(({ label, color, border, hint, val, set }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color, marginBottom: '0.35rem' }}>{label}</label>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0 0 0.4rem', lineHeight: 1.45 }}>{hint}</p>
              <textarea value={val} onChange={e => set(e.target.value)} rows={3} disabled={assembled}
                style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: `1.5px solid ${border}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.93rem', fontFamily: 'inherit', lineHeight: 1.65, resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
          ))}

          {!assembled && (
            <button className="btn" onClick={() => setAssembled(true)} disabled={!canAssemble}
              style={{ marginBottom: '1.25rem', opacity: canAssemble ? 1 : 0.5, cursor: canAssemble ? 'pointer' : 'not-allowed' }}>
              Ensamblar párrafo →
            </button>
          )}

          {assembled && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Tu párrafo ensamblado</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.93rem', lineHeight: 1.9 }}>
                  <span style={{ background: 'rgba(15,61,140,0.1)', borderRadius: 3, padding: '0 2px' }}>{ex.topicSentence}</span>
                  {' '}<span style={{ background: 'rgba(124,58,237,0.08)', borderRadius: 3, padding: '0 2px' }}>{e1}</span>
                  {' '}<span style={{ background: 'rgba(5,150,105,0.08)', borderRadius: 3, padding: '0 2px' }}>{e2}</span>
                  {' '}<span style={{ background: 'rgba(217,119,6,0.08)', borderRadius: 3, padding: '0 2px' }}>{lk}</span>
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {[['#0f3d8c','T'],['#7c3aed','E explanation'],['#059669','E example'],['#d97706','L']].map(([c,l]) => (
                    <span key={l} style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 6, background: `${c}18`, color: c, fontFamily: 'var(--mono)', fontWeight: 600 }}>{l}</span>
                  ))}
                </div>
              </div>

              <button className="btn btn-ghost btn-sm" onClick={() => setShowModel(v => !v)} style={{ alignSelf: 'flex-start' }}>
                {showModel ? 'Ocultar modelo' : 'Ver párrafo modelo Band 7+ →'}
              </button>

              {showModel && (
                <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>Párrafo modelo Band 7+</p>
                  <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.9 }}>
                    <span style={{ background: 'rgba(15,61,140,0.1)', borderRadius: 3, padding: '0 2px' }}>{ex.topicSentence}</span>
                    {' '}<span style={{ background: 'rgba(124,58,237,0.08)', borderRadius: 3, padding: '0 2px' }}>{ex.e1model}</span>
                    {' '}<span style={{ background: 'rgba(5,150,105,0.08)', borderRadius: 3, padding: '0 2px' }}>{ex.e2model}</span>
                    {' '}<span style={{ background: 'rgba(217,119,6,0.08)', borderRadius: 3, padding: '0 2px' }}>{ex.lModel}</span>
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button className="btn btn-sm" onClick={() => { reset(); }}>Reintentar</button>
                <button className="btn btn-ghost btn-sm" onClick={nextEx}>
                  {exIdx < EXERCISES.length - 1 ? 'Siguiente ejercicio →' : 'Diagnóstico →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
