'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import OverviewPracticeEngine from './OverviewPracticeEngine';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSMapDiagramVisual,
  IELTSPieChartVisual,
  IELTSProcessDiagramVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

type VisualType = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';

interface OverviewOption {
  text: string;
  correct: boolean;
  reason: string;
}

interface VisualLesson {
  id: VisualType;
  label: string;
  examPrompt: string;
  question: string;
  whatToLookFor: string[];
  examples: { title: string; insight: string; overview: string; variant: number }[];
  options: OverviewOption[];
  Chart: ComponentType<{ variant?: number }>;
}

const LESSONS: VisualLesson[] = [
  {
    id: 'line',
    label: 'Line graph',
    Chart: () => <IELTSLineGraphVisual variant={0} />,
    examPrompt: 'The line graph below shows the percentage of people with internet access in three regions between 2000 and 2020.',
    question: '¿Qué historia cambia con el tiempo?',
    whatToLookFor: ['dirección general de cada línea', 'línea dominante', 'cruce o convergencia', 'cambio más rápido'],
    examples: [
      { title: 'Ejemplo 1', insight: 'Las tres regiones suben.', overview: 'Overall, internet access increased in all three regions, although Region A remained the most connected throughout the period.', variant: 0 },
      { title: 'Ejemplo 2', insight: 'La brecha se reduce.', overview: 'Overall, the gap between the regions narrowed considerably as the two lower-ranked regions experienced faster growth.', variant: 1 },
      { title: 'Ejemplo 3', insight: 'Una línea lidera siempre.', overview: 'Overall, Region A consistently recorded the highest levels of internet access, while Region C remained the lowest despite steady growth.', variant: 2 },
      { title: 'Ejemplo 4', insight: 'Crecimiento acelerado.', overview: 'Overall, the most notable feature was the rapid expansion in internet access outside the leading region.', variant: 3 },
      { title: 'Ejemplo 5', insight: 'No hay caída.', overview: 'Overall, the graph shows a steady upward trend across all categories rather than any major fluctuation.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, internet access rose in all three regions, with Region A remaining highest and the gap between regions becoming narrower.', reason: 'Correcto: resume tendencia global, liderazgo y convergencia sin cifras.' },
      { correct: false, text: 'Overall, Region A increased from 30% to 88%, while Region B rose from 12% to 79%.', reason: 'Demasiados datos exactos; eso pertenece al cuerpo, no al overview.' },
      { correct: false, text: 'Overall, the graph shows internet access in three regions between 2000 and 2020.', reason: 'Solo repite el enunciado; no identifica la historia principal.' },
    ],
  },
  {
    id: 'bar',
    label: 'Bar chart',
    Chart: IELTSBarChartVisual,
    examPrompt: 'The bar chart below shows household expenditure by category in one country in 2024.',
    question: '¿Qué categorías dominan y cuáles quedan abajo?',
    whatToLookFor: ['barra más alta', 'barra más baja', 'grupos similares', 'diferencias notables'],
    examples: [
      { title: 'Ejemplo 1', insight: 'Housing domina.', overview: 'Overall, housing accounted for the largest share of spending, while health represented the smallest category.', variant: 0 },
      { title: 'Ejemplo 2', insight: 'Food, transport y leisure son el grupo medio.', overview: 'Overall, spending was concentrated most heavily on housing, whereas the remaining categories were noticeably lower.', variant: 1 },
      { title: 'Ejemplo 3', insight: 'No hay tiempo.', overview: 'Overall, the chart compares relative spending levels rather than changes over time.', variant: 2 },
      { title: 'Ejemplo 4', insight: 'Leisure supera food y transport.', overview: 'Overall, leisure was the second-largest item, behind housing but ahead of food and transport.', variant: 3 },
      { title: 'Ejemplo 5', insight: 'El contraste es jerárquico.', overview: 'Overall, the data show a clear hierarchy, led by housing and ending with health.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, housing took up the largest share of household spending, while health was the smallest category.', reason: 'Correcto: selecciona extremos relevantes sin listar todas las barras.' },
      { correct: false, text: 'Overall, housing was 32%, food was 18%, transport was 16%, leisure was 21% and health was 13%.', reason: 'Esto es una lista de datos, no un overview.' },
      { correct: false, text: 'Overall, household expenditure changed significantly during the period.', reason: 'Incorrecto: no hay periodo de tiempo visible.' },
    ],
  },
  {
    id: 'pie',
    label: 'Pie charts',
    Chart: IELTSPieChartVisual,
    examPrompt: 'The pie chart below shows the proportion of energy produced from four sources in a country in 2025.',
    question: '¿Qué porción ocupa más espacio y qué porciones son menores?',
    whatToLookFor: ['sector mayor', 'sector menor', 'agrupaciones', 'distribución general'],
    examples: [
      { title: 'Ejemplo 1', insight: 'Solar lidera.', overview: 'Overall, solar energy made up the largest share of production, while other sources contributed the smallest proportion.', variant: 0 },
      { title: 'Ejemplo 2', insight: 'Solar y wind dominan juntos.', overview: 'Overall, production was mainly concentrated in solar and wind power, with the remaining sources accounting for smaller shares.', variant: 1 },
      { title: 'Ejemplo 3', insight: 'No hay tendencia temporal.', overview: 'Overall, the chart shows the distribution of energy production at one point in time rather than a trend.', variant: 2 },
      { title: 'Ejemplo 4', insight: 'Hydro es categoría media.', overview: 'Overall, hydro occupied a middle position, below solar and wind but above other sources.', variant: 3 },
      { title: 'Ejemplo 5', insight: 'Distribución relativamente concentrada.', overview: 'Overall, most energy came from two leading sources rather than being evenly distributed.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, solar and wind accounted for the majority of energy production, while other sources made up the smallest share.', reason: 'Correcto: agrupa sectores y evita porcentajes exactos.' },
      { correct: false, text: 'Overall, solar was 34%, wind was 28%, hydro was 22% and other sources were 16%.', reason: 'Demasiada cifra exacta para un overview.' },
      { correct: false, text: 'Overall, energy production increased steadily over the period.', reason: 'Incorrecto: un pie chart de un solo año no muestra cambio temporal.' },
    ],
  },
  {
    id: 'table',
    label: 'Table',
    Chart: IELTSTableVisual,
    examPrompt: 'The table below shows daily social media use by age group in three countries in 2023.',
    question: '¿Qué patrón se repite en filas y columnas?',
    whatToLookFor: ['grupo más alto', 'grupo más bajo', 'patrón por edad', 'país dominante'],
    examples: [
      { title: 'Ejemplo 1', insight: 'Uso baja con la edad.', overview: 'Overall, daily social media use declined with age in all three countries.', variant: 0 },
      { title: 'Ejemplo 2', insight: 'USA lidera.', overview: 'Overall, the USA recorded the highest figures across every age group, while Australia generally had the lowest.', variant: 1 },
      { title: 'Ejemplo 3', insight: 'Jóvenes dominan.', overview: 'Overall, younger adults were far more likely to use social media daily than older adults.', variant: 2 },
      { title: 'Ejemplo 4', insight: 'Patrón consistente.', overview: 'Overall, the same age-related pattern was visible in each country.', variant: 3 },
      { title: 'Ejemplo 5', insight: 'No es una tabla para narrar celda por celda.', overview: 'Overall, the table is best summarised by age trend and country ranking rather than individual cells.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, daily social media use fell as age increased, and the USA recorded the highest figures in every age group.', reason: 'Correcto: detecta patrón transversal en filas y columnas.' },
      { correct: false, text: 'Overall, the 18-24 group in the USA was 92%, and the 45+ group in Australia was 32%.', reason: 'Solo toma dos celdas; no resume la tabla completa.' },
      { correct: false, text: 'Overall, the table shows daily social media use by age group.', reason: 'Es repetición del prompt, no overview.' },
    ],
  },
  {
    id: 'process',
    label: 'Process diagram',
    Chart: IELTSProcessDiagramVisual,
    examPrompt: 'The diagram below shows how plastic bottles are recycled into new products.',
    question: '¿El proceso es lineal o cíclico y cuáles son sus fases grandes?',
    whatToLookFor: ['inicio y final', 'número de etapas', 'fases agrupables', 'si hay ciclo o secuencia lineal'],
    examples: [
      { title: 'Ejemplo 1', insight: 'Proceso lineal.', overview: 'Overall, the process is linear, beginning with the collection of used bottles and ending with the manufacture of new products.', variant: 0 },
      { title: 'Ejemplo 2', insight: 'Tres fases grandes.', overview: 'Overall, plastic recycling involves three broad phases: collection and sorting, material preparation, and final manufacturing.', variant: 1 },
      { title: 'Ejemplo 3', insight: 'No hay datos numéricos.', overview: 'Overall, the diagram focuses on stages in a sequence rather than quantities or trends.', variant: 2 },
      { title: 'Ejemplo 4', insight: 'Transformación física.', overview: 'Overall, discarded bottles are gradually transformed from waste material into reusable plastic products.', variant: 3 },
      { title: 'Ejemplo 5', insight: 'No expliques cada paso aún.', overview: 'Overall, the process moves from waste collection to industrial treatment before new items are produced.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, this is a linear process in which used plastic bottles are collected, processed and finally turned into new products.', reason: 'Correcto: captura estructura total sin narrar cada etapa.' },
      { correct: false, text: 'Overall, the bottles are collected, sorted, washed, melted and manufactured into new products.', reason: 'Es demasiado secuencial; parece cuerpo del ensayo, no overview.' },
      { correct: false, text: 'Overall, plastic recycling increased significantly over the period.', reason: 'Incorrecto: el diagrama no muestra cifras ni cambios en el tiempo.' },
    ],
  },
  {
    id: 'map',
    label: 'Map',
    Chart: IELTSMapDiagramVisual,
    examPrompt: 'The maps below show changes in a town centre between 1990 and 2020.',
    question: '¿Cuál es la transformación espacial dominante?',
    whatToLookFor: ['más urbano o más rural', 'qué desaparece', 'qué aparece', 'cambios de infraestructura'],
    examples: [
      { title: 'Ejemplo 1', insight: 'Urbanización.', overview: 'Overall, the town centre became more urbanised, with open and industrial areas replaced by residential, educational and commercial facilities.', variant: 0 },
      { title: 'Ejemplo 2', insight: 'Infraestructura crece.', overview: 'Overall, the area was redeveloped substantially, especially through new housing, a school and improved road infrastructure.', variant: 1 },
      { title: 'Ejemplo 3', insight: 'Cambios de uso del suelo.', overview: 'Overall, land use shifted away from factory and parking space towards services and residential development.', variant: 2 },
      { title: 'Ejemplo 4', insight: 'No describas esquina por esquina.', overview: 'Overall, the most significant change was the replacement of older facilities with more modern public and commercial spaces.', variant: 3 },
      { title: 'Ejemplo 5', insight: 'Comparación global.', overview: 'Overall, the later map shows a denser and more developed town centre than the earlier one.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, the town centre became more developed, with industrial and open areas replaced by housing, education and commercial facilities.', reason: 'Correcto: resume transformación espacial y categorías de cambio.' },
      { correct: false, text: 'Overall, the factory was in the top right in 1990, while the school was in the top right in 2020.', reason: 'Demasiado localizado; eso va en detalles.' },
      { correct: false, text: 'Overall, the number of residents increased dramatically.', reason: 'No hay datos de población en el mapa.' },
    ],
  },
];

export default function OverviewPage() {
  const [activeType, setActiveType] = useState<VisualType>('line');
  const [activeExample, setActiveExample] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const lesson = LESSONS.find((item) => item.id === activeType) ?? LESSONS[0];
  const Chart = lesson.Chart;

  function chooseType(id: VisualType) {
    setActiveType(id);
    setActiveExample(0);
    setSelected(null);
    setLocked(false);
  }

  function chooseOption(index: number) {
    if (locked) return;
    setSelected(index);
    setLocked(true);
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Overview</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Sub-habilidad 2 — Overview</p>
          <h1 style={{ fontSize: '1.9rem', letterSpacing: 0, margin: '0 0 0.4rem', fontWeight: 700 }}>El párrafo Overview</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.98rem', margin: '0 0 0.75rem', lineHeight: 1.65 }}>
            El overview no es una introducción ni una lista de datos. Es el párrafo donde le dices al examinador:
            “esta es la historia completa del visual”. Cambia según el input: líneas, barras, pasteles, tablas, procesos o mapas.
          </p>

          <Task1OfficialReviewBlock
            focus="Seleccionar los rasgos principales del visual sin copiar datos exactos."
            officialFormat="IELTS Academic Writing Task 1 evalúa si describes los rasgos principales de información visual. El overview es una estrategia de respuesta, no una sección oficial independiente."
            welearnStrategy="Entrenamos el overview por tipo de input: primero identificas la historia visual, luego eliges qué oración resume mejor esa historia."
            answerCheck="Una respuesta fuerte menciona tendencia dominante, contraste principal, distribución global, fases del proceso o transformación del mapa sin llenar el párrafo de cifras."
          />

          <Task1ChartTypeGuide />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))', gap: '0.65rem', margin: '1.5rem 0' }}>
            {LESSONS.map((item) => (
              <button
                key={item.id}
                onClick={() => chooseType(item.id)}
                style={{
                  padding: '0.85rem 0.7rem',
                  borderRadius: 8,
                  border: activeType === item.id ? '2px solid #0f3d8c' : '1px solid var(--line-soft)',
                  background: activeType === item.id ? 'rgba(15,61,140,0.07)' : 'var(--bg)',
                  color: activeType === item.id ? '#0f3d8c' : 'var(--ink-2)',
                  fontWeight: 900,
                  fontFamily: 'var(--mono)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', borderTop: '3px solid #0f3d8c' }}>
            <p style={{ margin: '0 0 0.5rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase' }}>
              IELTS Academic — {lesson.label}
            </p>
            <p style={{ margin: '0 0 1rem', color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.6 }}>
              “{lesson.examPrompt}”
            </p>
            <div style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1rem' }}>
              <Chart />
            </div>
            <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.08rem', letterSpacing: 0 }}>{lesson.question}</h2>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {lesson.whatToLookFor.map((item) => (
                <span key={item} style={{ padding: '0.2rem 0.55rem', borderRadius: 999, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.16)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 800 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.12rem', letterSpacing: 0 }}>Cinco ejemplos guiados para este tipo</h2>
            <div role="tablist" aria-label={`Ejemplos de ${lesson.label}`} style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.45rem' }}>
              {lesson.examples.map((example, index) => (
                <button
                  key={example.title}
                  type="button"
                  role="tab"
                  aria-selected={activeExample === index}
                  onClick={() => { setActiveExample(index); setSelected(null); setLocked(false); }}
                  style={{ flex: '0 0 auto', minWidth: 124, padding: '0.72rem 0.8rem', borderRadius: 8, border: activeExample === index ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', background: activeExample === index ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: activeExample === index ? '#0f3d8c' : 'var(--ink-2)', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900, cursor: 'pointer' }}
                >{String(index + 1).padStart(2, '0')} · {example.insight}</button>
              ))}
            </div>
            {(() => {
              const example = lesson.examples[activeExample];
              const ExampleChart = lesson.Chart;
              return (
                <article role="tabpanel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start', marginTop: '0.85rem', padding: '1rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg-2)' }}>
                  <div style={{ padding: '0.7rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><ExampleChart variant={example.variant} /></div>
                  <div>
                    <p style={{ margin: '0 0 0.3rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{example.title}</p>
                    <p style={{ margin: '0 0 0.7rem', color: 'var(--ink)', fontWeight: 800 }}>{example.insight}</p>
                    <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65, fontStyle: 'italic' }}>“{example.overview}”</p>
                    <p style={{ margin: '0.8rem 0 0', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>Mira el visual primero: el overview resume esta historia, no cada dato.</p>
                  </div>
                </article>
              );
            })()}
          </div>

          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase' }}>Motor de práctica</p>
            <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.12rem', letterSpacing: 0 }}>Elige el overview correcto</h2>
            <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Nivel 1: selecciona la oración que mejor resume la historia del visual. El overview correcto evita cifras exactas, no repite el prompt y no inventa información.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {lesson.options.map((option, index) => {
                const isSelected = selected === index;
                const show = locked && isSelected;
                const border = show ? (option.correct ? '2px solid #059669' : '2px solid #dc2626') : isSelected ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)';
                const bg = show ? (option.correct ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.07)') : 'var(--bg)';
                return (
                  <button
                    key={option.text}
                    onClick={() => chooseOption(index)}
                    style={{ textAlign: 'left', padding: '0.9rem 1rem', borderRadius: 8, border, background: bg, cursor: locked ? 'default' : 'pointer', color: 'var(--ink)', lineHeight: 1.55 }}
                  >
                    <span style={{ fontWeight: 800, color: show ? (option.correct ? '#059669' : '#dc2626') : '#0f3d8c', marginRight: '0.35rem' }}>
                      {show ? (option.correct ? 'Correcto' : 'Revisa') : `Opción ${index + 1}`}
                    </span>
                    {option.text}
                    {show && <p style={{ margin: '0.55rem 0 0', color: option.correct ? '#059669' : '#dc2626', fontSize: '0.84rem' }}>{option.reason}</p>}
                  </button>
                );
              })}
            </div>
            {locked && (
              <button className="btn btn-sm" onClick={() => { setSelected(null); setLocked(false); }} style={{ marginTop: '0.9rem' }}>
                Practicar otra vez
              </button>
            )}
          </div>

          <OverviewPracticeEngine />
        </div>
      </div>
    </section>
  );
}
