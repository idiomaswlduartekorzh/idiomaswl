'use client';

import { useMemo, useState } from 'react';
import type { ComponentType, ReactElement } from 'react';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSMapDiagramVisual,
  IELTSProcessDiagramVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

const C = '#0f3d8c';
type Chart = ComponentType<{ variant?: number }>;

type ClozeItem = {
  chart: Chart;
  variant: number;
  label: string;
  prompt: string;
  before: string;
  blank: string[];
  after: string;
  options: string[][];
  explanation: string;
};

type ChoiceItem = {
  chart: Chart;
  variant: number;
  label: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
};

const CLOZE: ClozeItem[] = [
  {
    chart: IELTSBarChartVisual,
    variant: 0,
    label: 'Bar chart',
    prompt: 'The bar chart below shows the amount of money spent on different types of advertising in the UK in 2020.',
    before: 'The bar chart',
    blank: ['presents', 'total expenditure on', 'various categories'],
    after: 'of advertising in the United Kingdom in 2020.',
    options: [['shows', 'presents', 'present'], ['the amount spent on', 'total expenditure on', 'overall spending on'], ['different categories', 'various categories', 'several types']],
    explanation: 'La respuesta conserva el tipo de visual, el tema, el lugar y el año, pero cambia el verbo, el sustantivo y la estructura nominal.',
  },
  {
    chart: IELTSTableVisual,
    variant: 1,
    label: 'Table',
    prompt: 'The table below shows the number of international students enrolled in five subjects at a university in 2015 and 2025.',
    before: 'The table',
    blank: ['presents figures for', 'international students studying', 'five subjects'],
    after: 'at a university in 2015 and 2025.',
    options: [['shows numbers for', 'provides data on', 'presents figures for'], ['international students enrolled in', 'international students studying', 'the number of international students enrolled in'], ['five subjects', 'five academic subjects', 'five university subjects']],
    explanation: 'Figures for funciona para cantidades; studying reestructura enrolled in sin cambiar el significado.',
  },
  {
    chart: IELTSLineGraphVisual,
    variant: 1,
    label: 'Line graph',
    prompt: 'The line graph below shows the number of trips made by three forms of public transport between 2010 and 2025.',
    before: 'The line graph',
    blank: ['illustrates', 'the number of journeys made by', 'three modes'],
    after: 'of public transport over the period from 2010 to 2025.',
    options: [['presents', 'illustrates', 'depicts'], ['the number of journeys made by', 'the number of trips taken by', 'journeys made by'], ['three modes', 'three forms', 'three types']],
    explanation: 'La paráfrasis mantiene number porque trips es contable y usa journeys/modes como sustituciones naturales.',
  },
  {
    chart: IELTSPieChartVisual,
    variant: 2,
    label: 'Pie charts',
    prompt: 'The pie charts show the reasons why students chose online courses in 2024.',
    before: 'The pie charts',
    blank: ['give information about', "students' reasons for choosing", 'online courses'],
    after: 'in 2024.',
    options: [['give information about', 'compare', 'present'], ["students' reasons for choosing", 'the reasons students gave for choosing', 'why students chose'], ['online courses', 'online learning courses', 'digital courses']],
    explanation: 'Pie charts es plural, por eso give; reasons for choosing es la estructura natural después de reasons.',
  },
];

const CHOICE: ChoiceItem[] = [
  {
    chart: IELTSLineGraphVisual,
    variant: 0,
    label: 'Line graph',
    prompt: 'The graph below shows the percentage of people with internet access in three regions between 2000 and 2020.',
    correct: 2,
    options: [
      'The line graph shows that Region A rose from 30% to 88% and Region C finished at 57%.',
      'The graph illustrates why internet access increased and argues that this trend is positive.',
      'The line graph illustrates the proportion of the population with internet access in three regions over the period from 2000 to 2020.',
      'The pie chart compares internet access in three regions in 2020.',
    ],
    explanation: 'La respuesta correcta conserva visual, tema, unidades generales, regiones y periodo sin introducir datos concretos ni cambiar el tipo de gráfico.',
  },
  {
    chart: IELTSMapDiagramVisual,
    variant: 1,
    label: 'Map',
    prompt: 'The maps below show the development of a university campus between 1995 and 2025.',
    correct: 0,
    options: [
      'The maps illustrate changes to the layout of a university campus over the thirty-year period from 1995 to 2025.',
      'The bar charts show the university campus had a library and student flats.',
      'The maps compare the number of students in the lecture hall in 1995 and 2025.',
      'The map illustrates that the campus became better because a sports centre was added.',
    ],
    explanation: 'Un mapa de cambios necesita layout/changes y el periodo; no debe inventar valoraciones ni convertir espacios en cantidades.',
  },
  {
    chart: IELTSProcessDiagramVisual,
    variant: 3,
    label: 'Process diagram',
    prompt: 'The diagram below shows how bricks are manufactured.',
    correct: 3,
    options: [
      'The diagram compares the percentage of bricks manufactured in five stages.',
      'The process diagram shows that firing produces the best bricks.',
      'The line graph presents how clay changed between digging and firing.',
      'The diagram outlines the stages involved in manufacturing bricks.',
    ],
    explanation: 'Para un proceso, la introducción identifica las etapas y el resultado general; no añade juicios, cifras ni tendencias.',
  },
  {
    chart: IELTSPieChartVisual,
    variant: 4,
    label: 'Pie chart',
    prompt: 'The pie charts show electricity generation from four sources in two countries.',
    correct: 1,
    options: [
      'The pie charts show gas accounted for 36% and coal for 24%.',
      'The two pie charts compare the shares of electricity generated from four sources in two countries.',
      'The charts explain why countries should use renewable electricity.',
      'The bar charts compare four countries and their electricity production.',
    ],
    explanation: 'La respuesta correcta mantiene plural, comparación, shares, fuentes y países, sin convertir la introducción en overview.',
  },
];

const PRODUCTION: ChoiceItem[] = [
  {
    chart: IELTSProcessDiagramVisual,
    variant: 1,
    label: 'Coffee process',
    prompt: 'The diagram below shows how coffee is produced for sale.',
    correct: 1,
    options: [
      'The diagram shows cherries are harvested, dried and roasted in five exact steps.',
      'The diagram illustrates the stages involved in producing coffee for sale.',
      'The process proves that roasted coffee is better than fresh cherries.',
      'The line graph presents the amount of coffee sold in different years.',
    ],
    explanation: 'Nivel 3 exige revisar la respuesta completa: tipo de visual, tema y propósito están alineados; los detalles pertenecen al cuerpo.',
  },
  {
    chart: IELTSMapDiagramVisual,
    variant: 4,
    label: 'Redeveloped shopping centre',
    prompt: 'The maps below show a shopping centre before and after redevelopment.',
    correct: 3,
    options: [
      'The maps show that a department store is the most useful new building.',
      'The table compares four facilities in a shopping centre before and after redevelopment.',
      'The maps present the exact number of visitors to the shopping centre.',
      'The two maps illustrate how the layout of a shopping centre changed after redevelopment.',
    ],
    explanation: 'Una introducción de mapas describe el cambio de distribución; no evalúa las obras ni convierte las instalaciones en datos numéricos.',
  },
  {
    chart: IELTSBarChartVisual,
    variant: 4,
    label: 'Water use',
    prompt: 'The bar chart below shows water use in five sectors in 2005.',
    correct: 0,
    options: [
      'The bar chart presents water consumption across five sectors in 2005.',
      'The graph explains why agriculture consumes so much water in modern societies.',
      'The pie chart compares the proportion of water used by five sectors over time.',
      'The bar chart shows agriculture used 46 billion litres, more than every other sector.',
    ],
    explanation: 'En este nivel debes eliminar datos concretos, explicaciones causales y cambios de formato antes de elegir.',
  },
];

function VisualFrame({ item }: { item: { chart: Chart; variant: number; label: string; prompt: string } }) {
  const Chart = item.chart;
  return (
    <div style={{ display: 'grid', gap: '0.8rem' }}>
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.85rem', overflow: 'hidden' }}>
        <p style={{ margin: '0 0 0.55rem', color: C, fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>Visual de práctica · {item.label}</p>
        <Chart variant={item.variant} />
      </div>
      <div style={{ padding: '0.9rem 1rem', borderLeft: `3px solid ${C}`, background: `${C}08`, borderRadius: 10 }}>
        <p style={{ margin: '0 0 0.3rem', color: C, fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>Enunciado</p>
        <p style={{ margin: 0, lineHeight: 1.65, fontStyle: 'italic', color: 'var(--ink)' }}>&ldquo;{item.prompt}&rdquo;</p>
      </div>
    </div>
  );
}

export default function Task1IntroductionPracticeEngine() {
  const levels = useMemo(() => [
    { title: 'Nivel 1 · Construye la paráfrasis', tag: 'Bloques de vocabulario', items: CLOZE },
    { title: 'Nivel 2 · Elige una introducción alineada', tag: 'Precisión y cobertura', items: CHOICE },
    { title: 'Nivel 3 · Revisión de respuesta', tag: 'Criterio de examen', items: PRODUCTION },
  ], []);
  const [level, setLevel] = useState(0);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [scores, setScores] = useState<number[]>([0, 0, 0]);
  const currentLevel = levels[level];
  const current = currentLevel.items[index];
  const isCloze = level === 0;
  const cloze = isCloze ? current as ClozeItem : null;
  const choice = !isCloze ? current as ChoiceItem : null;

  function resetQuestion() {
    setAnswers([]);
    setSelected(null);
    setChecked(false);
  }

  function checkAnswer() {
    if (checked) return;
    const ok = isCloze
      ? cloze!.blank.every((answer, i) => answer === answers[i])
      : selected === choice!.correct;
    if (ok) setScores((old) => old.map((score, i) => i === level ? score + 1 : score));
    setChecked(true);
  }

  function next() {
    if (index < currentLevel.items.length - 1) {
      setIndex((old) => old + 1);
      resetQuestion();
      return;
    }
    setLevel((old) => Math.min(old + 1, levels.length - 1));
    setIndex(0);
    resetQuestion();
  }

  function chooseCloze(slot: number, value: string) {
    setAnswers((old) => {
      const next = [...old];
      next[slot] = value;
      return next;
    });
  }

  const canCheck = isCloze ? answers.length === cloze!.blank.length : selected !== null;
  const isCorrect = isCloze ? cloze!.blank.every((answer, i) => answer === answers[i]) : selected === choice!.correct;

  return (
    <section aria-labelledby="task1-intro-practice" style={{ marginTop: '2.5rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.65rem' }}><span className="ink-line" />Motor progresivo</p>
      <h2 id="task1-intro-practice" style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1.45rem' }}>Practica la introducción por niveles</h2>
      <p style={{ margin: '0 0 1.25rem', color: 'var(--muted)', lineHeight: 1.65 }}>Cada nivel trabaja una decisión distinta: primero eliges palabras, después verificas que la oración cubra todo el enunciado y al final detectas errores que bajarían la precisión.</p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {levels.map((item, i) => (
          <button key={item.title} type="button" onClick={() => { setLevel(i); setIndex(0); resetQuestion(); }} aria-pressed={level === i} className="btn btn-sm" style={{ flex: '1 1 180px', minWidth: 0, whiteSpace: 'normal', overflowWrap: 'anywhere', textAlign: 'left', opacity: level === i ? 1 : 0.68 }}>
            <strong>{i + 1}. {item.title.split('·')[1]}</strong><br /><span style={{ fontSize: '0.72rem', opacity: 0.8 }}>{item.tag} · {scores[i]}/{item.items.length}</span>
          </button>
        ))}
      </div>

      <div className="wl-card" style={{ padding: '1.2rem', borderTop: `4px solid ${C}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div><p style={{ margin: 0, fontWeight: 800, color: C, fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>{currentLevel.title}</p><p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.82rem' }}>Ejercicio {index + 1} de {currentLevel.items.length}</p></div>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.78rem' }}>{Math.round(((index + 1) / currentLevel.items.length) * 100)}%</span>
        </div>
        <VisualFrame item={current} />

        {isCloze && cloze ? (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ margin: '0 0 0.7rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>Completa la introducción con el sinónimo y la estructura que mejor encajan:</p>
            <div style={{ padding: '0.85rem', background: 'var(--bg-2)', borderRadius: 10, lineHeight: 2.2, color: 'var(--ink)' }}>
              <span>{cloze.before} </span>
              {cloze.blank.map((_, slot) => (
                <select key={slot} value={answers[slot] ?? ''} onChange={(event) => chooseCloze(slot, event.target.value)} aria-label={`Bloque ${slot + 1}`} style={{ margin: '0 0.25rem', padding: '0.4rem 0.55rem', border: `1px solid ${C}55`, borderRadius: 7, background: 'var(--bg)', color: 'var(--ink)', maxWidth: '100%' }}>
                  <option value="">elige...</option>
                  {cloze.options[slot].map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ))}
              <span> {cloze.after}</span>
            </div>
          </div>
        ) : choice ? (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ margin: '0 0 0.7rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>Selecciona la introducción que conserva todos los elementos del enunciado sin añadir datos:</p>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {choice.options.map((option, i) => <button key={option} type="button" onClick={() => setSelected(i)} aria-pressed={selected === i} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 9, border: `1px solid ${selected === i ? C : 'var(--line-soft)'}`, background: selected === i ? `${C}10` : 'var(--bg)', color: 'var(--ink)', cursor: 'pointer', lineHeight: 1.55 }}>{String.fromCharCode(65 + i)}. {option}</button>)}
            </div>
          </div>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button type="button" className="btn btn-sm" onClick={checkAnswer} disabled={!canCheck || checked}>{checked ? (isCorrect ? 'Correcto' : 'Revisar explicación') : 'Comprobar respuesta'}</button>
          {checked && <button type="button" className="btn btn-sm" onClick={next}>{index < currentLevel.items.length - 1 ? 'Siguiente ejercicio →' : level < levels.length - 1 ? 'Desbloquear siguiente nivel →' : 'Repetir motor →'}</button>}
        </div>
        {checked && (
          <div role="status" style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', borderRadius: 10, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${isCorrect ? 'rgba(5,150,105,0.22)' : 'rgba(217,119,6,0.22)'}` }}>
            <strong style={{ color: isCorrect ? '#059669' : '#b45309' }}>{isCorrect ? 'Bien visto.' : 'Todavía no.'}</strong>
            <p style={{ margin: '0.3rem 0 0', color: 'var(--ink-2)', lineHeight: 1.6 }}>{isCloze ? cloze!.explanation : choice!.explanation}</p>
          </div>
        )}
      </div>
    </section>
  );
}
