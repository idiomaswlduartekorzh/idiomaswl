'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './page.module.css';

const WA = '573005004253';

type Option = { label: string; score: number };
type Question = { prompt: string; hint?: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    prompt: "'If I ___ more time, I would travel the world.'",
    hint: 'Gramática',
    options: [
      { label: 'have', score: 1 },
      { label: 'had', score: 4 },
      { label: 'has', score: 1 },
      { label: 'will have', score: 2 },
    ],
  },
  {
    prompt: "'She has been working here ___ 2019.'",
    hint: 'Gramática',
    options: [
      { label: 'for', score: 2 },
      { label: 'since', score: 4 },
      { label: 'from', score: 1 },
      { label: 'at', score: 0 },
    ],
  },
  {
    prompt: '¿Cuál frase es gramaticalmente correcta?',
    hint: 'Gramática',
    options: [
      { label: 'I have visited France last year.', score: 1 },
      { label: 'I visited France last year.', score: 4 },
      { label: 'I have visit France last year.', score: 0 },
      { label: 'I visiting France last year.', score: 0 },
    ],
  },
  {
    prompt: "'Procrastinate' significa más cercano a:",
    hint: 'Vocabulario',
    options: [
      { label: 'Posponer', score: 4 },
      { label: 'Apresurar', score: 1 },
      { label: 'Organizar', score: 1 },
      { label: 'Terminar', score: 1 },
    ],
  },
  {
    prompt: 'Cuando ves una serie en inglés sin subtítulos...',
    hint: 'Escucha',
    options: [
      { label: 'Entiendo casi todo', score: 4 },
      { label: 'Entiendo la idea general', score: 3 },
      { label: 'Entiendo palabras sueltas', score: 1 },
      { label: 'No entiendo casi nada', score: 0 },
    ],
  },
  {
    prompt: 'Si un extranjero te pregunta algo en la calle en inglés...',
    hint: 'Habla',
    options: [
      { label: 'Puedo mantener una conversación fluida', score: 4 },
      { label: 'Puedo responder con frases simples', score: 2 },
      { label: 'Me pongo nervioso, pero intento', score: 1 },
      { label: 'No sabría qué decir', score: 0 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0);

type LevelInfo = {
  level: string;
  name: string;
  blindSpot: string;
  weeks: string;
  ctaMsg: string;
};

function getLevelInfo(score: number): LevelInfo {
  const pct = score / MAX_SCORE;
  if (pct < 0.15) {
    return {
      level: 'A1',
      name: 'Principiante',
      blindSpot: 'Tu punto ciego: te falta vocabulario base activo — lo reconoces cuando lo lees, pero no lo usas al hablar.',
      weeks: '8-10 semanas para llegar a A2 con ritmo estructurado',
      ctaMsg: 'Hola, hice el Nivel Radar de WeLearn y mi nivel real de inglés es A1 (Principiante). Quiero saber cómo avanzar.',
    };
  }
  if (pct < 0.35) {
    return {
      level: 'A2',
      name: 'Básico',
      blindSpot: 'Tu punto ciego: los tiempos verbales — entiendes presente y pasado por separado, pero dudas al conectarlos en una idea.',
      weeks: '10-12 semanas para llegar a B1 con ritmo estructurado',
      ctaMsg: 'Hola, hice el Nivel Radar de WeLearn y mi nivel real de inglés es A2 (Básico). Quiero saber cómo avanzar.',
    };
  }
  if (pct < 0.58) {
    return {
      level: 'B1',
      name: 'Intermedio',
      blindSpot: 'Tu punto ciego: la fluidez bajo presión — tienes el nivel, pero se traba cuando piensas en español primero.',
      weeks: '12-16 semanas para llegar a B2 con ritmo estructurado',
      ctaMsg: 'Hola, hice el Nivel Radar de WeLearn y mi nivel real de inglés es B1 (Intermedio). Quiero saber cómo avanzar.',
    };
  }
  if (pct < 0.8) {
    return {
      level: 'B2',
      name: 'Intermedio alto',
      blindSpot: 'Tu punto ciego: los matices — te entienden bien, pero sueles sonar más básico de lo que realmente eres.',
      weeks: '14-18 semanas para llegar a C1 con ritmo estructurado',
      ctaMsg: 'Hola, hice el Nivel Radar de WeLearn y mi nivel real de inglés es B2 (Intermedio alto). Quiero saber cómo avanzar.',
    };
  }
  if (pct < 0.94) {
    return {
      level: 'C1',
      name: 'Avanzado',
      blindSpot: 'Tu punto ciego: la naturalidad — tu gramática es casi perfecta, pero todavía "suena a traducido".',
      weeks: 'Estás a un examen de distancia de una certificación oficial',
      ctaMsg: 'Hola, hice el Nivel Radar de WeLearn y mi nivel real de inglés es C1 (Avanzado). Quiero saber cómo certificarlo.',
    };
  }
  return {
    level: 'C2',
    name: 'Dominio total',
    blindSpot: 'Tu punto ciego: la certificación — hablas casi como nativo, pero no tienes el papel que lo demuestre.',
    weeks: 'Estás listo para IELTS/TOEFL con puntaje alto',
    ctaMsg: 'Hola, hice el Nivel Radar de WeLearn y mi nivel real de inglés es C2 (Dominio total). Quiero saber cómo certificarlo.',
  };
}

type Step = 'intro' | number | 'result';

export default function NivelRadarClient() {
  const [step, setStep] = useState<Step>('intro');
  const [score, setScore] = useState(0);

  function answer(points: number) {
    const next = score + points;
    setScore(next);
    if (typeof step === 'number' && step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStep('result');
    }
  }

  const progressPct = step === 'intro' ? 0 : step === 'result' ? 100 : ((step + 1) / QUESTIONS.length) * 100;

  return (
    <section className={s.hero}>
      <div className={s.wrap}>
        {step === 'intro' && <Intro onStart={() => setStep(0)} />}

        {typeof step === 'number' && (
          <QuizStep
            question={QUESTIONS[step]}
            index={step}
            total={QUESTIONS.length}
            progressPct={progressPct}
            onAnswer={answer}
          />
        )}

        {step === 'result' && <Result score={score} onRestart={() => { setStep('intro'); setScore(0); }} />}
      </div>
    </section>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className={s.introBlock}>
      <div className={s.heroBadgeRow}>
        <span className={s.heroTagRed}>📡 Nivel Radar</span>
        <span className={s.heroTagGray}>90 segundos · Gratis</span>
      </div>
      <h1 className={s.h1}>
        ¿Cuál es tu nivel<br />
        <span className={s.accent}>real</span> de inglés?
      </h1>
      <p className={s.heroSub}>
        No es tu diploma. No es lo que dices en tu CV. Es lo que tu cerebro
        realmente procesa cuando el inglés aparece sin avisar. Tenemos el
        patrón identificado en más de 2,000 estudiantes — respóndenos 6
        preguntas y te lo mostramos.
      </p>
      <div className={s.gaugePreview} aria-hidden="true">
        <Gauge pct={0} />
      </div>
      <button className={s.mainBtn} onClick={onStart}>
        Iniciar diagnóstico →
      </button>
      <p className={s.heroNote}>Sin registro. Resultado instantáneo.</p>
    </div>
  );
}

function QuizStep({
  question, index, total, progressPct, onAnswer,
}: {
  question: Question;
  index: number;
  total: number;
  progressPct: number;
  onAnswer: (points: number) => void;
}) {
  return (
    <div className={s.quizBlock}>
      <div className={s.progressTrack}>
        <div className={s.progressFill} style={{ width: `${progressPct}%` }} />
      </div>
      <p className={s.quizMeta}>Pregunta {index + 1} de {total} · {question.hint}</p>
      <h2 className={s.quizPrompt}>{question.prompt}</h2>
      <div className={s.optionsGrid}>
        {question.options.map((opt) => (
          <button
            key={opt.label}
            className={s.optionBtn}
            onClick={() => onAnswer(opt.score)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Result({ score, onRestart }: { score: number; onRestart: () => void }) {
  const info = getLevelInfo(score);
  const pct = Math.round((score / MAX_SCORE) * 100);
  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(info.ctaMsg)}`;

  function share() {
    const text = `Mi nivel real de inglés es ${info.level} (${info.name}) según el Nivel Radar de WeLearn 👀`;
    const url = 'https://www.idiomaswl.com/nivel-radar';
    if (navigator.share) {
      navigator.share({ title: 'Nivel Radar — WeLearn', text, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${text} ${url}`);
      alert('Resultado copiado — pégalo donde quieras compartirlo.');
    }
  }

  return (
    <div className={s.resultBlock}>
      <p className={s.sectionEyebrow}>Tu resultado</p>
      <div className={s.gaugePreview}>
        <Gauge pct={pct} />
      </div>
      <h2 className={s.resultLevel}>{info.level} <span className={s.resultLevelName}>· {info.name}</span></h2>
      <p className={s.resultBlindSpot}>{info.blindSpot}</p>
      <p className={s.resultWeeks}>{info.weeks}</p>

      <div className={s.resultActions}>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className={s.mainBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Quiero cerrar esta brecha
        </a>
        <button className={s.shareBtn} onClick={share}>Compartir resultado ↗</button>
      </div>
      <div className={s.resultFooter}>
        <button className={s.restartBtn} onClick={onRestart}>Repetir diagnóstico</button>
        <Link href="/examenes" className={s.restartBtn}>Ver simulacros de examen →</Link>
      </div>
    </div>
  );
}

function Gauge({ pct }: { pct: number }) {
  const angle = -90 + (pct / 100) * 180;
  return (
    <div className={s.gaugeWrap}>
      <div className={s.gaugeArc} />
      <div className={s.gaugeNeedle} style={{ transform: `rotate(${angle}deg)` }} />
      <div className={s.gaugePivot} />
      <div className={s.gaugeLabels}>
        <span>A1</span>
        <span>C2</span>
      </div>
    </div>
  );
}
