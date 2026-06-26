'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#0066cc';

interface ReadingText {
  id: number;
  title: string;
  topic: string;
  words: number;
  grammar: string;
  text: string;
  vocab: Record<string, string>;
  preQ: { q: string; opts: string[]; a: number }[];
  mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[];
  openQ: string;
  production: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'The Rise of Remote Work', topic: 'Trabajo y tecnología', words: 135, grammar: 'Present Perfect + Past Simple',
    text: "The way people work has changed dramatically over the last decade. Before 2020, remote work was rare — only a small percentage of employees worked from home regularly. However, the pandemic forced millions of companies to adapt almost overnight. Since then, many organisations have discovered that remote work can increase productivity and reduce costs. Employees have also benefited: they have saved money on commuting and have gained more time for personal activities. According to recent studies, companies that have adopted flexible working policies have reported higher employee satisfaction. Not everyone has found the transition easy, though. Some workers have struggled with isolation and the blurring of boundaries between work and personal life. The debate about returning to the office has divided businesses worldwide, and the ideal balance between remote and in-person work is still being negotiated.",
    vocab: { dramatically:'dramáticamente', rare:'raro/poco común', regularly:'regularmente', pandemic:'pandemia', adapt:'adaptarse', overnight:'de la noche a la mañana', productivity:'productividad', commuting:'desplazarse al trabajo', adopted:'adoptado', satisfaction:'satisfacción', transition:'transición', isolation:'aislamiento', blurring:'difuminación', negotiated:'negociado' },
    preQ: [
      { q: '¿Has trabajado o estudiado de forma remota?', opts: ['Sí, regularmente', 'Sí, a veces', 'No, siempre presencial'], a: -1 },
      { q: '¿Qué ventaja del trabajo remoto valoras más?', opts: ['Flexibilidad de horario', 'Ahorro en transporte', 'Más tiempo en casa'], a: -1 },
    ],
    mcq: [
      { q: 'What does "commuting" mean in this context?', cat: 'Vocabulario', opts: ['Working from home', 'Travelling to work', 'Using technology', 'Communicating with others'], a: 1, fb: '"Commuting" = desplazarse al trabajo (de casa a la oficina y viceversa). "They have saved money on commuting" — gastaban dinero viajando.' },
      { q: 'How did companies first encounter remote work on a large scale?', cat: 'Comprensión', opts: ['They chose it voluntarily', 'A government law required it', 'The pandemic forced them to adapt', 'Employees demanded it'], a: 2, fb: '"The pandemic forced millions of companies to adapt almost overnight" — fue la pandemia la que los obligó.' },
      { q: 'According to the text, what have companies with flexible policies reported?', cat: 'Comprensión', opts: ['Lower productivity', 'Higher employee satisfaction', 'More office costs', 'More employee turnover'], a: 1, fb: '"Companies that have adopted flexible working policies have reported higher employee satisfaction."' },
      { q: 'What problem have some workers experienced?', cat: 'Comprensión', opts: ['Lower salaries', 'Longer hours', 'Isolation and work-life boundary issues', 'Lack of technology'], a: 2, fb: '"Some workers have struggled with isolation and the blurring of boundaries between work and personal life."' },
      { q: '"Companies have discovered that remote work can increase productivity." What tense is this?', cat: 'Gramática', opts: ['Past Simple', 'Present Continuous', 'Present Perfect', 'Future Simple'], a: 2, fb: '"Have discovered" = Present Perfect. Expresa una experiencia/descubrimiento sin tiempo específico, conectado con el presente.' },
      { q: 'What is the main topic of the text?', cat: 'Comprensión', opts: ['Why offices are better than homes', 'The history of the internet', 'The transformation of work habits due to remote work', 'How to start a tech company'], a: 2, fb: 'El texto discute cómo el trabajo remoto ha transformado la manera en que las personas y empresas trabajan.' },
    ],
    openQ: 'In your opinion, what are the advantages and disadvantages of remote work? Use Present Perfect to describe changes you have noticed.',
    production: 'Use: "Remote work has changed... / Companies have discovered... / Workers have benefited from... / However, some people have struggled with..."',
  },
  {
    id: 2, title: 'Saving the Amazon Rainforest', topic: 'Medio ambiente', words: 140, grammar: 'First & Second Conditional',
    text: "The Amazon rainforest, often called the lungs of the planet, is under serious threat. Scientists warn that if deforestation continues at the current rate, we will lose up to 40% of the Amazon by 2050. This would have catastrophic consequences for global biodiversity and climate regulation. If countries cooperate and reduce deforestation, the rainforest will recover and continue to absorb billions of tonnes of CO2 every year. Experts argue that if wealthier nations provided more financial support to developing countries, deforestation rates would fall significantly. Local communities have a crucial role: if they receive sustainable livelihoods, they will protect the forest instead of cutting it down. Some international agreements have already been signed, but many environmentalists believe that if governments acted more decisively now, it would not be too late to reverse the damage. The future of the Amazon depends on decisions made today.",
    vocab: { rainforest:'selva tropical / bosque lluvioso', deforestation:'deforestación', catastrophic:'catastrófico', biodiversity:'biodiversidad', regulation:'regulación', cooperate:'cooperar', absorb:'absorber', wealthier:'más ricos / más prósperos', livelihoods:'medios de vida / sustento', decisively:'decisivamente', reverse:'revertir', consequences:'consecuencias', signed:'firmados', communities:'comunidades' },
    preQ: [
      { q: '¿Has visitado algún bosque o parque natural?', opts: ['Sí, varios', 'Solo uno', 'Nunca'], a: -1 },
      { q: '¿Qué acción crees más importante para el medio ambiente?', opts: ['Reciclar', 'Reducir el uso de carro', 'Apoyar leyes ambientales'], a: -1 },
    ],
    mcq: [
      { q: 'What does "livelihoods" mean?', cat: 'Vocabulario', opts: ['Natural habitats', 'Ways of earning money to live', 'Environmental laws', 'Wildlife species'], a: 1, fb: '"Livelihoods" = medios de vida / sustento económico. "If they receive sustainable livelihoods" = si tienen formas sostenibles de ganarse la vida.' },
      { q: 'What percentage of the Amazon could be lost by 2050 if deforestation continues?', cat: 'Comprensión', opts: ['20%', '30%', '40%', '50%'], a: 2, fb: '"We will lose up to 40% of the Amazon by 2050" — hasta el 40% podría perderse.' },
      { q: 'What do experts say wealthier nations should do?', cat: 'Comprensión', opts: ['Build more forests', 'Send scientists to the Amazon', 'Provide financial support to developing countries', 'Stop all industry'], a: 2, fb: '"If wealthier nations provided more financial support to developing countries, deforestation rates would fall significantly."' },
      { q: '"If deforestation continues, we will lose 40% of the Amazon." What type of conditional is this?', cat: 'Gramática', opts: ['Zero Conditional', 'First Conditional', 'Second Conditional', 'Third Conditional'], a: 1, fb: 'First Conditional: "if + present simple, will + verb base." Situación real y posible (el ritmo de deforestación actual es real).' },
      { q: '"If governments acted more decisively, it would not be too late." What does this imply?', cat: 'Gramática', opts: ['Governments are acting decisively now', 'This is a real, likely scenario', 'This is a hypothetical/imaginary situation (they are not acting decisively)', 'This happened in the past'], a: 2, fb: 'Second Conditional ("acted" + "would"): situación hipotética. Implica que los gobiernos NO están actuando con suficiente decisión actualmente.' },
      { q: 'What is the role of local communities according to the text?', cat: 'Comprensión', opts: ['To start tourism businesses', 'To protect the forest if they have sustainable livelihoods', 'To sign international agreements', 'To conduct scientific research'], a: 1, fb: '"If they receive sustainable livelihoods, they will protect the forest instead of cutting it down."' },
    ],
    openQ: 'Write your opinion about environmental protection. Use First Conditional for realistic scenarios and Second Conditional for hypothetical ideas.',
    production: 'Use: "If we don\'t act soon, we will... / If countries cooperated more, the situation would... / I believe that if people... / If I could change one thing about..."',
  },
  {
    id: 3, title: 'Street Food Around the World', topic: 'Cultura y gastronomía', words: 128, grammar: 'Present Perfect + Passive Voice',
    text: "Street food has been an important part of urban culture for centuries. From the spicy tacos of Mexico City to the steaming dumplings of Shanghai, food vendors have fed millions of people every day for generations. In recent years, street food has been recognised as a serious culinary art form. Several world-famous chefs have been inspired by the techniques and flavours found in local markets. In Thailand, pad thai was originally created as a national dish in the 1940s and has since become one of the most recognised dishes worldwide. Meanwhile, in Colombia, arepas have been enjoyed by Colombians for hundreds of years and are now being discovered by international food lovers. Food festivals dedicated to street food have been organised in over 50 countries. These events celebrate diversity, and many have been attended by hundreds of thousands of visitors who travel specifically to try authentic local flavours.",
    vocab: { vendors:'vendedores ambulantes', culinary:'culinario', dumplings:'dumplings (bolas de masa rellenas)', techniques:'técnicas', flavours:'sabores', recognised:'reconocido', inspired:'inspirado', originally:'originalmente', meanwhile:'mientras tanto', dedicated:'dedicado', authentic:'auténtico', diversity:'diversidad', generations:'generaciones', attended:'asistido' },
    preQ: [
      { q: '¿Cuál es tu comida callejera favorita?', opts: ['Empanadas / arepas', 'Comida asiática', 'Tacos / comida mexicana'], a: -1 },
      { q: '¿Has probado comida callejera de otro país?', opts: ['Sí, de varios', 'Solo de uno', 'No todavía'], a: -1 },
    ],
    mcq: [
      { q: 'What does "vendors" mean?', cat: 'Vocabulario', opts: ['Chefs in restaurants', 'People who sell things in the street', 'Food critics', 'Restaurant owners'], a: 1, fb: '"Vendors" = vendedores (especialmente ambulantes o en puestos). "Food vendors have fed millions of people."' },
      { q: 'How has street food been viewed in recent years?', cat: 'Comprensión', opts: ['As unhealthy and dangerous', 'As a serious culinary art form', 'As old-fashioned cooking', 'As too expensive for tourists'], a: 1, fb: '"Street food has been recognised as a serious culinary art form." — ha ganado reconocimiento como arte culinario.' },
      { q: 'When was pad thai created?', cat: 'Comprensión', opts: ['In the 1920s', 'In the 1930s', 'In the 1940s', 'In the 1960s'], a: 2, fb: '"Pad thai was originally created as a national dish in the 1940s." — fue creado en los años 40.' },
      { q: '"Pad thai was originally created in the 1940s." What voice is this?', cat: 'Gramática', opts: ['Active voice', 'Passive voice', 'Reported speech', 'Conditional'], a: 1, fb: '"Was created" = pasiva (Passive Voice): be + past participle. El foco está en el plato, no en quien lo creó.' },
      { q: '"Street food has been recognised as a culinary art." What tense is "has been recognised"?', cat: 'Gramática', opts: ['Past Simple', 'Present Continuous', 'Present Perfect Passive', 'Future Passive'], a: 2, fb: '"Has been recognised" = Present Perfect Passive. Combina Present Perfect (have/has + been) con Passive (been + past participle). Experiencia/cambio reciente.' },
      { q: 'In how many countries have street food festivals been organised?', cat: 'Comprensión', opts: ['Over 30', 'Over 50', 'Over 100', 'Over 20'], a: 1, fb: '"Food festivals dedicated to street food have been organised in over 50 countries."' },
    ],
    openQ: 'Describe a street food experience you have had (or imagine one). Use Present Perfect and at least one passive construction.',
    production: 'Use: "I have tried... / [Food] has been enjoyed for... / [Dish] was created in... / Street food has become... / I have been inspired by..."',
  },
  {
    id: 4, title: 'The Benefits of Learning a Second Language', topic: 'Educación y bilingüismo', words: 132, grammar: 'Passive Voice + Present Perfect',
    text: "The advantages of learning a second language have been studied extensively by researchers around the world. It has been shown that bilingual people develop stronger cognitive skills, including better memory, problem-solving abilities, and multitasking. A second language has also been linked to delayed onset of diseases like Alzheimer's. In the job market, candidates who speak more than one language are often preferred. Hundreds of studies have confirmed that multilingual employees are paid higher salaries on average. In Colombia, English has been declared an official goal by the government, and thousands of teachers have been trained as part of national programmes. Languages such as Mandarin, French, and Korean have also been introduced in many schools. Experts have argued that learning a second language should be started early, ideally before the age of twelve, when the brain is most receptive. Technology has made this process easier: apps and online classes have transformed the way languages are learned.",
    vocab: { extensively:'extensamente', bilingual:'bilingüe', cognitive:'cognitivo', multitasking:'hacer varias tareas a la vez', delayed:'retrasado', onset:'aparición / inicio', Alzheimer:'alzheimer', candidates:'candidatos', multilingual:'multilingüe', receptive:'receptivo', transformed:'transformado', confirmed:'confirmado', declared:'declarado', abilities:'habilidades' },
    preQ: [
      { q: '¿Cuántos idiomas hablas o estudias actualmente?', opts: ['Solo español', 'Español + inglés', 'Tres o más idiomas'], a: -1 },
      { q: '¿Por qué estás aprendiendo inglés?', opts: ['Trabajo / carrera', 'Viajes / cultura', 'Exámenes académicos'], a: -1 },
    ],
    mcq: [
      { q: 'What does "cognitive" mean?', cat: 'Vocabulario', opts: ['Physical / related to the body', 'Related to mental processes and thinking', 'Related to emotions', 'Related to language only'], a: 1, fb: '"Cognitive" = cognitivo (relacionado con los procesos mentales). "Stronger cognitive skills" = habilidades mentales más fuertes.' },
      { q: 'What health benefit is mentioned for bilingual people?', cat: 'Comprensión', opts: ['Lower blood pressure', 'Delayed onset of Alzheimer\'s', 'Better eyesight', 'Stronger immune system'], a: 1, fb: '"A second language has also been linked to delayed onset of diseases like Alzheimer\'s." — retrasa enfermedades cognitivas.' },
      { q: 'What does the text say about multilingual employees and salaries?', cat: 'Comprensión', opts: ['They earn less on average', 'They are paid higher salaries on average', 'Their salaries are the same as others', 'They work longer hours for more pay'], a: 1, fb: '"Multilingual employees are paid higher salaries on average." — los empleados multilingües ganan más en promedio.' },
      { q: '"English has been declared an official goal by the government." What voice is used?', cat: 'Gramática', opts: ['Active voice', 'Passive voice with agent', 'Passive voice without agent', 'Reported speech'], a: 1, fb: '"Has been declared by the government" = Passive Voice with agent ("by the government"). La estructura: have/has + been + PP + by + agent.' },
      { q: '"Hundreds of studies have confirmed..." is in Present Perfect because...', cat: 'Gramática', opts: ['It happened at a specific time in the past', 'The research is ongoing and relevant to the present', 'It will happen in the future', 'It is a habitual action'], a: 1, fb: 'Present Perfect: no tiempo específico, resultado/relevancia en el presente. Los estudios forman parte del conocimiento actual.' },
      { q: 'What age does the text recommend for starting to learn a second language?', cat: 'Comprensión', opts: ['Before 5', 'Before 8', 'Before 12', 'Before 16'], a: 2, fb: '"Learning a second language should be started early, ideally before the age of twelve."' },
    ],
    openQ: 'Write your opinion about language learning. Use Present Perfect and passive voice structures.',
    production: 'Use: "It has been shown that... / Studies have confirmed... / Languages have been introduced... / I have studied English for... / Learning a language has helped me..."',
  },
  {
    id: 5, title: 'A Letter from the Future', topic: 'Ciencia ficción y tecnología', words: 138, grammar: 'Present Perfect + Conditionals',
    text: "Dear Friend in 2025, I am writing to you from 2050. Much has changed in the past 25 years, and I thought you might find it interesting to know what the world looks like from here. Cities have been redesigned to be completely car-free. People travel on electric trains and bicycles. The air in most cities is clean because fossil fuels have been replaced by renewable energy sources. If you had invested in solar energy companies back in 2025, you would have made a fortune! Artificial intelligence has transformed medicine. Diseases that used to be fatal have been cured, and people now live an average of 95 years. However, not everything has improved. Social inequality has increased, and if governments don't act now in your time, the gap between rich and poor will grow even larger in mine. If we could go back and change one thing, we would have acted on climate change sooner. Learn from our mistakes. Act now. With hope, Your future self.",
    vocab: { redesigned:'rediseñados', 'car-free':'sin coches', fossil:'fósil', replaced:'reemplazados', renewable:'renovable', artificial:'artificial', fatal:'mortal', cured:'curado', inequality:'desigualdad', fortune:'fortuna', average:'promedio', transformed:'transformado', invested:'invertido', gap:'brecha / diferencia' },
    preQ: [
      { q: '¿Cómo imaginas el mundo en 2050?', opts: ['Más tecnológico y conectado', 'Con más problemas ambientales', 'Similar a hoy pero mejorado'], a: -1 },
      { q: '¿Qué tecnología crees que cambiará más el futuro?', opts: ['Inteligencia artificial', 'Energías renovables', 'Transporte eléctrico'], a: -1 },
    ],
    mcq: [
      { q: 'What does "fossil fuels" refer to?', cat: 'Vocabulario', opts: ['Nuclear energy', 'Oil, gas and coal', 'Solar and wind energy', 'Hydroelectric power'], a: 1, fb: '"Fossil fuels" = combustibles fósiles (petróleo, gas, carbón). "Fossil fuels have been replaced by renewable energy."' },
      { q: 'How do people travel in cities in 2050 according to the letter?', cat: 'Comprensión', opts: ['By flying cars', 'By electric trains and bicycles', 'By underground tunnels', 'By self-driving cars'], a: 1, fb: '"People travel on electric trains and bicycles." Cities are car-free.' },
      { q: 'What has happened to diseases in 2050?', cat: 'Comprensión', opts: ['They have become more dangerous', 'Diseases that were once fatal have been cured', 'People are still dying from the same diseases', 'Medicine has not changed much'], a: 1, fb: '"Diseases that used to be fatal have been cured, and people now live an average of 95 years."' },
      { q: '"If you had invested in solar energy in 2025, you would have made a fortune." What conditional is this?', cat: 'Gramática', opts: ['First Conditional', 'Second Conditional', 'Third Conditional', 'Zero Conditional'], a: 2, fb: 'Third Conditional: "if + past perfect, would have + PP." Para hablar de situaciones hipotéticas en el pasado. A B1+ structure for awareness.' },
      { q: '"If governments don\'t act now, the gap will grow larger." What conditional is this?', cat: 'Gramática', opts: ['Zero Conditional', 'First Conditional', 'Second Conditional', 'Third Conditional'], a: 1, fb: 'First Conditional: "if + present simple, will + verb base." Situación real y posible con consecuencia futura real.' },
      { q: 'What is the writer\'s main message to people in 2025?', cat: 'Comprensión', opts: ['Invest in technology companies now', 'Enjoy life while you can', 'Act on climate change and inequality before it is too late', 'Move to the countryside'], a: 2, fb: '"Act now. Learn from our mistakes." The letter warns about climate change and inequality. "If governments don\'t act now... the gap will grow."' },
    ],
    openQ: 'Write a short letter from yourself in 2050 to yourself today. What has changed? What advice would you give? Use Present Perfect and conditionals.',
    production: 'Use: "By 2050, I have... / If I had studied... / Cities have been redesigned... / If you act now, you will... / I wish I had..."',
  },
];

function tokenize(text: string) {
  return text.split(/(\s+|[.,!?'\-]+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?'\-]+$/.test(t),
    clean: t.replace(/[^a-zA-Z]/g, '').toLowerCase(),
  }));
}

function MCQItem({ q, qi, answers, onAnswer }: {
  q: ReadingText['mcq'][0]; qi: number;
  answers: Record<number, number>; onAnswer: (qi: number, oi: number) => void;
}) {
  const ans = answers[qi];
  const done = ans !== undefined;
  return (
    <div className="wl-card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        {q.cat} · Pregunta {qi + 1}
      </div>
      <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.opts.map((opt, oi) => {
          const isCorrect = oi === q.a; const isSelected = ans === oi;
          let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
          if (done && isSelected && isCorrect)  { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
          return (
            <button key={oi} onClick={() => onAnswer(qi, oi)} disabled={done}
              style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
              {opt}
              {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
              {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
            </button>
          );
        })}
      </div>
      {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
    </div>
  );
}

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [preAnswers, setPreAnswers] = useState<Record<number, number>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = tokenize(t.text);
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  function handleWord(clean: string, idx: number) {
    if (!clean) return;
    setActiveWord(t.vocab[clean] ?? null);
    setActiveIdx(idx);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Todos los textos</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
          Texto {t.id} / 5 — {t.title}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          📝 {t.words} palabras · {t.grammar}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Pre-lectura', 'Lectura', 'Preguntas', 'Resultado'];
          const current = phase === p;
          const past = (['pre','read','questions','done'] as const).indexOf(p) < (['pre','read','questions','done'] as const).indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Antes de leer — activa tu conocimiento</p>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Piensa un momento antes de leer. No hay respuestas correctas — solo activa tu mente sobre el tema: <strong style={{ color: 'var(--ink)' }}>{t.topic}</strong>.
          </p>
          {t.preQ.map((pq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: '0 0 0.65rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.96rem' }}>{i + 1}. {pq.q}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pq.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => setPreAnswers(p => ({ ...p, [i]: oi }))}
                    className={preAnswers[i] === oi ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{ fontSize: '0.84rem' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => setPhase('read')}>
            Listo — ir al texto →
          </button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />{t.title} — toca cualquier palabra para ver su traducción
          </p>
          <div style={{ lineHeight: 2.1, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const hasTrans = !!t.vocab[tk.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => handleWord(tk.clean, i)} style={{
                    background: isActive ? 'rgba(0,102,204,0.12)' : hasTrans ? 'rgba(0,102,204,0.06)' : 'transparent',
                    border: isActive ? '1.5px solid #0066cc' : hasTrans ? '1px dashed rgba(0,102,204,0.3)' : 'none',
                    borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default',
                    fontSize: 'inherit', fontFamily: 'inherit',
                    color: isActive ? '#0066cc' : 'inherit', fontWeight: isActive ? 700 : 'inherit', transition: 'all 0.15s',
                  }}>{tk.raw}</button>
                  {isActive && (
                    <span ref={tooltipRef} style={{
                      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: activeWord ? '#14215c' : '#6f7691', color: '#fff', borderRadius: 8,
                      padding: '0.28rem 0.6rem', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap',
                      zIndex: 10, boxShadow: '0 4px 16px rgba(20,33,92,0.25)', marginTop: 4,
                    }}>
                      {activeWord ?? '(palabra funcional)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>
              Ya leí → Responder preguntas
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setActiveWord(null); setActiveIdx(null); }}>
              Ocultar tooltip
            </button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem', marginLeft: 'auto' }} onClick={() => setPhase('pre')}>
              ← Volver a pre-lectura
            </button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {t.mcq.map((q, qi) => (
            <MCQItem key={qi} q={q} qi={qi} answers={answers} onAnswer={(qi, oi) => {
              if (answers[qi] !== undefined) return;
              setAnswers(p => ({ ...p, [qi]: oi }));
            }} />
          ))}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Producción libre</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4}
              placeholder="Write your answer here in English..."
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && (
            <button className="btn btn-sm" onClick={() => setPhase('done')}>Ver mi resultado →</button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 4 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            {score === t.mcq.length ? '¡Perfecto! Comprendiste todo el texto.' : score >= 4 ? 'Muy bien. Repasa las preguntas que fallaste.' : 'Vuelve al texto y búscalas — el contexto ayuda.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>TU PRODUCCIÓN LIBRE</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }}>Reintentar</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Elegir otro texto</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaInglesB1() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ingles/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés B1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Reading · Inglés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 textos B1 (120-150 palabras). Cada texto tiene pre-lectura, vocabulario interactivo, 6 preguntas de comprensión y gramática, y producción libre.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem',
                border: `1.5px solid ${COLOR}22`, borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(0,102,204,0.04) 0%, transparent 100%)',
                transition: 'box-shadow 0.18s, border-color 0.18s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,102,204,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>
                  {t.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>{t.title}</span>
                    <span style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.topic}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {t.words} palabras · Gramática: {t.grammar} · {t.mcq.length} preguntas + producción libre
                  </p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.75rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,102,204,0.06)', border: '1px solid rgba(0,102,204,0.15)', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Cómo usar:</strong> Lee el texto tocando las palabras resaltadas para ver su traducción. Luego responde las 6 preguntas de vocabulario, comprensión y gramática B1. Al final, escribe tu producción libre usando las estructuras del texto.
        </div>
      </div>
    </section>
  );
}
