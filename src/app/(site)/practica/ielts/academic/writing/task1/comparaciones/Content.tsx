'use client';

import { useState } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import ComparisonPracticeEngine from './ComparisonPracticeEngine';
import type { ComponentType } from 'react';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSMapDiagramVisual,
  IELTSProcessDiagramVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

type ComparisonVisual = { id: string; label: string; Chart: ComponentType<{ variant?: number }>; examples: { title: string; focus: string; explanation: string }[] };

const COMPARISON_VISUALS: ComparisonVisual[] = [
  { id: 'line', label: 'Line graph', Chart: IELTSLineGraphVisual, examples: [
    { title: 'Inicio vs final', focus: 'Compara el punto de partida con el resultado final.', explanation: 'La diferencia inicial-final muestra magnitud de cambio sin narrar cada año.' },
    { title: 'Ritmo de cambio', focus: 'Una línea crece más rápido que otra.', explanation: 'Usa faster growth, a sharper rise o a more gradual increase cuando la pendiente cambia.' },
    { title: 'Cruce', focus: 'Una serie supera a otra.', explanation: 'Compara posiciones antes y después del cruce para explicar el cambio de liderazgo.' },
    { title: 'Distancia', focus: 'Las series convergen o divergen.', explanation: 'Compara la brecha, no solo los valores individuales.' },
    { title: 'Estabilidad', focus: 'Una línea se mantiene mientras otra fluctúa.', explanation: 'El contraste entre estabilidad y variación puede organizar el párrafo.' },
  ] },
  { id: 'bar', label: 'Bar chart', Chart: IELTSBarChartVisual, examples: [
    { title: 'Mayor vs menor', focus: 'Contrasta los extremos.', explanation: 'Nombra la categoría más alta y la más baja cuando la diferencia es clara.' },
    { title: 'Grupo intermedio', focus: 'Agrupa barras con niveles parecidos.', explanation: 'Agrupar evita una lista y muestra control de selección.' },
    { title: 'Dos años', focus: 'Compara el mismo grupo en dos momentos.', explanation: 'Indica qué categorías suben, bajan o cambian de posición.' },
    { title: 'Diferencia proporcional', focus: 'Una barra es varias veces mayor.', explanation: 'Usa considerably, roughly twice as much o a fraction of solo si los datos lo sostienen.' },
    { title: 'Ranking', focus: 'Ordena de mayor a menor.', explanation: 'El ranking resume varias barras mejor que cinco frases independientes.' },
  ] },
  { id: 'pie', label: 'Pie chart', Chart: IELTSPieChartVisual, examples: [
    { title: 'Porción dominante', focus: 'Compara el sector mayor con el resto.', explanation: 'A majority of, the largest share y accounted for the biggest proportion son movimientos naturales.' },
    { title: 'Dos sectores', focus: 'Dos fuentes concentran la mayoría.', explanation: 'Agrupa las porciones principales y contrástalas con las restantes.' },
    { title: 'Distribución', focus: 'Las porciones son parecidas o desiguales.', explanation: 'La forma de la distribución es más importante que repetir cuatro porcentajes.' },
    { title: 'Antes vs después', focus: 'La composición cambia entre dos pasteles.', explanation: 'Compara qué gana participación y qué pierde, no solo el tamaño absoluto.' },
    { title: 'País A vs B', focus: 'Dos países dependen de fuentes distintas.', explanation: 'El contraste de composición puede ser el hallazgo central.' },
  ] },
  { id: 'table', label: 'Table', Chart: IELTSTableVisual, examples: [
    { title: 'Fila dominante', focus: 'Un grupo lidera varias columnas.', explanation: 'La repetición del liderazgo crea una comparación transversal.' },
    { title: 'Columna dominante', focus: 'Un país o año registra más valores.', explanation: 'Compara columnas completas, no celdas aisladas.' },
    { title: 'Máximo y mínimo', focus: 'Localiza extremos relevantes.', explanation: 'Los extremos ayudan a orientar la selección de datos del cuerpo.' },
    { title: 'Cambio común', focus: 'La mayoría aumenta o disminuye.', explanation: 'Una dirección compartida es una comparación global.' },
    { title: 'Excepción', focus: 'Una fila rompe el patrón.', explanation: 'La excepción es útil si modifica el panorama general.' },
  ] },
  { id: 'process', label: 'Process diagram', Chart: IELTSProcessDiagramVisual, examples: [
    { title: 'Etapas consecutivas', focus: 'Compara funciones, no cantidades.', explanation: 'En procesos no inventes cifras: compara el papel de cada fase.' },
    { title: 'Entrada y salida', focus: 'El material cambia de estado.', explanation: 'La comparación entre inicio y final resume la transformación.' },
    { title: 'Fases largas', focus: 'Agrupa etapas con una función común.', explanation: 'Preparación, tratamiento y resultado pueden organizar el texto.' },
    { title: 'Ramas', focus: 'Una etapa lleva a resultados diferentes.', explanation: 'Compara las rutas o productos si el diagrama realmente se bifurca.' },
    { title: 'Ciclo', focus: 'El final conecta con el inicio.', explanation: 'La relación circular es la comparación estructural principal.' },
  ] },
  { id: 'map', label: 'Map', Chart: IELTSMapDiagramVisual, examples: [
    { title: 'Antes vs después', focus: 'Compara la distribución espacial.', explanation: 'Organiza por zonas o por cambios: desaparece, aparece y permanece.' },
    { title: 'Uso del suelo', focus: 'Un espacio reemplaza a otro.', explanation: 'Contrasta funciones anteriores y nuevas.' },
    { title: 'Accesos', focus: 'La red vial cambia.', explanation: 'Compara rutas, entradas y conexiones sin describir cada esquina.' },
    { title: 'Densidad', focus: 'El área final tiene más o menos instalaciones.', explanation: 'La densidad es una comparación global verificable.' },
    { title: 'Elementos conservados', focus: 'Algo permanece igual.', explanation: 'Los elementos sin cambio también ayudan a estructurar una comparación precisa.' },
  ] },
];

interface CompExercise {
  context: string;
  dataA: { label: string; value: number; unit: string };
  dataB: { label: string; value: number; unit: string };
  models: string[];
  vocab: string[];
}

const EXERCISES: CompExercise[] = [
  {
    context: 'Gasto en educación (% del PIB, 2020)',
    dataA: { label: 'Finlandia', value: 6.8, unit: '%' },
    dataB: { label: 'España', value: 4.2, unit: '%' },
    models: [
      'Finland spent considerably more on education than Spain, at 6.8% of GDP compared to just 4.2%.',
      'While Finland allocated 6.8% of its GDP to education, Spain spent significantly less, at only 4.2%.',
      'Spain\'s education expenditure, at 4.2% of GDP, was notably lower than that of Finland, which stood at 6.8%.',
    ],
    vocab: ['considerably more than', 'significantly less', 'compared to', 'while', 'whereas', 'in contrast to'],
  },
  {
    context: 'Porcentaje de mujeres en el Parlamento (2022)',
    dataA: { label: 'Suecia', value: 47, unit: '%' },
    dataB: { label: 'Brasil', value: 15, unit: '%' },
    models: [
      'Sweden had a significantly higher proportion of female parliamentarians than Brazil, at 47% versus just 15%.',
      'While nearly half of Swedish parliamentarians were women (47%), the figure for Brazil was markedly lower at 15%.',
      'Brazil\'s female parliamentary representation, at roughly 15%, was far lower than Sweden\'s, which stood at just under half.',
    ],
    vocab: ['significantly higher', 'far lower', 'markedly lower', 'versus', 'compared with', 'nearly half', 'just under half'],
  },
  {
    context: 'Consumo de energía renovable (TWh, 2021)',
    dataA: { label: 'China', value: 2920, unit: 'TWh' },
    dataB: { label: 'Alemania', value: 230, unit: 'TWh' },
    models: [
      'China consumed substantially more renewable energy than Germany, producing approximately 2,920 TWh compared to Germany\'s 230 TWh.',
      'At 2,920 TWh, China\'s renewable energy consumption dwarfed that of Germany, which generated just 230 TWh.',
      'Germany produced far less renewable energy than China, with roughly 230 TWh compared to over 2,900 TWh in China.',
    ],
    vocab: ['substantially more', 'dwarfed', 'far less', 'approximately', 'roughly', 'just over/under', 'compared to'],
  },
];

const APPROX_PHRASES = [
  'approximately', 'roughly', 'just over', 'just under', 'nearly', 'around', 'about',
  'slightly more than', 'slightly fewer than',
];

const COMPARISON_MOVES = [
  {
    name: 'Comparación directa',
    pattern: 'A was higher/lower than B.',
    use: 'Cuando hay dos categorías claras.',
    example: 'Finland spent considerably more on education than Spain.',
  },
  {
    name: 'Contraste con while/whereas',
    pattern: 'While A stood at X, B was only Y.',
    use: 'Cuando quieres evitar dos frases separadas.',
    example: 'While Sweden was just under half, Brazil remained at only 15%.',
  },
  {
    name: 'Extremo del grupo',
    pattern: 'A recorded the highest/lowest figure.',
    use: 'Cuando hay varias barras, filas o sectores.',
    example: 'Online advertising recorded the highest spending overall.',
  },
  {
    name: 'Aproximación elegante',
    pattern: 'just over / nearly / roughly / around',
    use: 'Cuando la cifra no necesita precisión quirúrgica.',
    example: 'The figure for Italy was just under 40 hours per week.',
  },
];

function ComparisonMiniChart({ ex }: { ex: CompExercise }) {
  const max = Math.max(ex.dataA.value, ex.dataB.value);
  const rows = [ex.dataA, ex.dataB];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1rem' }}>
      {rows.map((row, i) => (
        <div key={row.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{row.label}</span>
            <span style={{ fontFamily: 'var(--mono)', color: i === 0 ? '#0f3d8c' : '#dc2626', fontWeight: 800 }}>{row.value}{row.unit}</span>
          </div>
          <div style={{ height: 14, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden' }}>
            <div style={{ width: `${(row.value / max) * 100}%`, height: '100%', background: i === 0 ? '#0f3d8c' : '#dc2626', borderRadius: 999 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ComparisonVisualLab() {
  const [type, setType] = useState('line');
  const [example, setExample] = useState(0);
  const lesson = COMPARISON_VISUALS.find((item) => item.id === type) ?? COMPARISON_VISUALS[0];
  const Chart = lesson.Chart;
  const current = lesson.examples[example];
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.12rem' }}>Antes de escribir: qué significa comparar</h2>
      <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>Comparar no es repetir dos números. Primero identifica la relación que importa: mayor o menor, cambio de ritmo, diferencia de composición, patrón transversal o transformación espacial.</p>
      <div role="tablist" aria-label="Tipos visuales para estudiar comparaciones" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.45rem' }}>{COMPARISON_VISUALS.map((item) => <button key={item.id} type="button" role="tab" aria-selected={type === item.id} onClick={() => { setType(item.id); setExample(0); }} style={{ flex: '0 0 auto', minWidth: 130, padding: '0.7rem 0.75rem', borderRadius: 8, border: type === item.id ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', background: type === item.id ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: type === item.id ? '#0f3d8c' : 'var(--ink-2)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer' }}>{item.label}</button>)}</div>
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.8rem 0 0.45rem' }}>{lesson.examples.map((item, index) => <button key={item.title} type="button" onClick={() => setExample(index)} aria-pressed={example === index} style={{ flex: '0 0 auto', minWidth: 132, padding: '0.62rem 0.7rem', borderRadius: 8, border: example === index ? '2px solid #059669' : '1px solid var(--line-soft)', background: example === index ? 'rgba(5,150,105,0.07)' : 'var(--bg)', color: example === index ? '#047857' : 'var(--ink-2)', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>{String(index + 1).padStart(2, '0')} · {item.title}</button>)}</div>
      <article role="tabpanel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start', marginTop: '0.75rem', padding: '1rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}><div style={{ padding: '0.7rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><Chart variant={example} /></div><div><p style={{ margin: '0 0 0.3rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{current.title}</p><p style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontWeight: 800 }}>{current.focus}</p><p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>{current.explanation}</p></div></article>
    </div>
  );
}

export default function ComparacionesPage() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ex = EXERCISES[idx];
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const diff = ex.dataA.value - ex.dataB.value;
  const isAHigher = diff > 0;

  function next() {
    setIdx(i => (i + 1) % EXERCISES.length);
    setText('');
    setRevealed(false);
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Comparisons</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />⚖️ Sub-skill 4 — Comparisons</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Compare data accurately</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.25rem', lineHeight: 1.65 }}>
            In bar charts, pie charts and tables, the examiner expects accurate comparisons and controlled approximation language.
            Practise selecting evidence before writing a complete sentence.
          </p>

          <Task1OfficialReviewBlock
            focus="Select and compare relevant figures without turning the body paragraph into a data list."
            officialFormat="IELTS Academic Writing Task 1 requires candidates to select and compare visual information. Comparison is a response skill, not a separate official task."
            welearnStrategy="We isolate comparison decisions so you can practise contrast, approximation and grouping before writing full paragraphs."
            answerCheck="A strong comparison names both categories, uses proportionate language and stays accurate without repeating every figure."
          />

          <Task1ChartTypeGuide />

          <ComparisonVisualLab />

          <ComparisonPracticeEngine />

          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.08rem' }}>How to compare without sounding mechanical</h2>
            <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
              In Task 1, a strong comparison does three things: it names both categories, signals the size of the
              difference and avoids repeating numbers as a list. Decide whether the contrast is slight, clear or
              substantial, then choose the language.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {COMPARISON_MOVES.map((move) => (
                <article key={move.name} style={{ padding: '0.9rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
                  <h3 style={{ margin: '0 0 0.3rem', fontSize: '0.92rem' }}>{move.name}</h3>
                  <p style={{ margin: '0 0 0.35rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 800 }}>{move.pattern}</p>
                  <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.8rem' }}>{move.use}</p>
                  <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.82rem', fontStyle: 'italic' }}>&ldquo;{move.example}&rdquo;</p>
                </article>
              ))}
            </div>
          </div>

          {/* Vocab panels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Comparación</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                higher/lower than · more/less than · while · whereas · compared to/with · in contrast
              </p>
            </div>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Aproximación</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                approximately · roughly · just over/under · nearly · around · slightly more/less than
              </p>
            </div>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((idx + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{EXERCISES.length}</span>
          </div>

          {/* Data */}
          <div className="wl-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>{ex.context}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[ex.dataA, ex.dataB].map((d, i) => (
                <div key={i} style={{ flex: 1, minWidth: 140, padding: '1rem', borderRadius: 10, background: i === 0 ? 'rgba(15,61,140,0.07)' : 'rgba(220,38,38,0.06)', border: `1px solid ${i === 0 ? 'rgba(15,61,140,0.2)' : 'rgba(220,38,38,0.15)'}`, textAlign: 'center' }}>
                  <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>{d.label}</p>
                  <p style={{ margin: 0, fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1.75rem', color: i === 0 ? '#0f3d8c' : '#dc2626' }}>
                    {d.value}{d.unit}
                  </p>
                  {i === 0 && isAHigher && <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>▲ más alto</span>}
                  {i === 1 && !isAHigher && <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>▲ más alto</span>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {ex.vocab.map(v => (
                <span key={v} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.15)', fontFamily: 'var(--mono)' }}>{v}</span>
              ))}
            </div>
            <ComparisonMiniChart ex={ex} />
          </div>

          {/* Approximation chips */}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', margin: '0 0 0.4rem' }}>Tip — usa expresiones de aproximación en lugar de repetir cifras exactas:</p>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {APPROX_PHRASES.map(p => (
                <span key={p} style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(245,158,11,0.08)', color: '#d97706', border: '1px solid rgba(245,158,11,0.2)', fontFamily: 'var(--mono)', cursor: 'pointer' }}
                  onClick={() => !revealed && setText(t => t + (t.endsWith(' ') || t.length === 0 ? '' : ' ') + p + ' ')}>
                  +{p}
                </span>
              ))}
            </div>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Escribe aquí tu oración de comparación..."
            rows={3}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box', marginBottom: '0.5rem' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{wordCount} palabras</span>
            {text.trim().length > 10 && !revealed && (
              <button className="btn btn-sm" onClick={() => setRevealed(true)}>Ver modelos →</button>
            )}
          </div>

          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', margin: 0 }}>Oraciones modelo</p>
              {ex.models.map((m, i) => (
                <div key={i} className="wl-card" style={{ padding: '1rem', borderLeft: '3px solid #0f3d8c' }}>
                  <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.7, color: 'var(--ink)' }}>{m}</p>
                </div>
              ))}
              <button className="btn btn-sm" onClick={next} style={{ alignSelf: 'flex-start' }}>
                {idx < EXERCISES.length - 1 ? 'Siguiente ejercicio →' : 'Volver al inicio →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
