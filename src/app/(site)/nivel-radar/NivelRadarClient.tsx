'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ICFES_DIAGNOSTIC_QUESTIONS } from '@/data/icfes-diagnostic-questions';
import cambridgeB2Set1 from '@/data/mocks/cambridge-b2-set-1';
import toeflSet1 from '@/data/mocks/toefl-set-1';
import s from './page.module.css';

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type Skill = 'grammar' | 'vocabulary' | 'reading' | 'listening';
type Question = {
  id: string; level: Level; skill: Skill; prompt: string; options: string[]; answer: number;
  stimulus?: string; audioText?: string; audioSrc?: string; audioLabel?: string;
};

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const LEVEL_SKILLS: Skill[][] = [
  ['vocabulary', 'grammar', 'reading', 'vocabulary'],
  ['vocabulary', 'grammar', 'reading', 'vocabulary', 'grammar', 'reading'],
  ['reading', 'listening', 'grammar', 'vocabulary', 'reading', 'listening'],
  ['grammar', 'reading', 'vocabulary', 'listening', 'grammar', 'reading', 'vocabulary', 'listening'],
  ['reading', 'reading', 'vocabulary', 'grammar', 'reading', 'listening', 'reading', 'listening'],
  ['reading', 'reading', 'vocabulary', 'grammar', 'reading', 'listening', 'reading', 'listening'],
];
const ICFES_LEVELS: Record<string, Level> = {
  'diag-01': 'A1', 'diag-02': 'A1', 'diag-05': 'A1', 'diag-13': 'A1',
  'diag-03': 'A2', 'diag-06': 'A2', 'diag-07': 'A2', 'diag-09': 'A2', 'diag-10': 'A2', 'diag-14': 'A2', 'diag-19': 'A2', 'diag-20': 'A2',
};
const ICFES_QUESTIONS: Question[] = ICFES_DIAGNOSTIC_QUESTIONS.map((item) => ({
  id: `icfes-${item.id}`,
  level: ICFES_LEVELS[item.id] ?? 'B1',
  skill: item.skill.includes('grammar') || item.skill === 'connectors' ? 'grammar' : item.skill.includes('vocabulary') ? 'vocabulary' : 'reading',
  stimulus: item.passage,
  prompt: item.question_text,
  options: [item.option_a, item.option_b, item.option_c, item.option_d],
  answer: item.correct_answer.charCodeAt(0) - 65,
}));
function extractReadingMcqs(level: Level, prefix: string, mock: typeof cambridgeB2Set1): Question[] {
  return mock.sections
    .filter(section => section.skill === 'reading')
    .flatMap(section => section.questions.flatMap(question => question.type === 'mcq' ? [{
      id: `${prefix}-${question.id}`,
      level,
      skill: section.title.includes('Use of English') ? 'grammar' : 'reading' as Skill,
      stimulus: section.passage ?? question.stimulus,
      prompt: question.text,
      options: question.options,
      answer: question.answer,
    }] : []));
}
const CAMBRIDGE_B2_QUESTIONS = extractReadingMcqs('B2', 'cambridge', cambridgeB2Set1);
const TOEFL_C1_QUESTIONS = extractReadingMcqs('C1', 'toefl', toeflSet1);
const QUESTIONS: Question[] = [
  { id: 'b1-grammar', level: 'B1', skill: 'grammar', prompt: 'If she ___ earlier, she would catch the bus.', options: ['leaves', 'left', 'will leave', 'has left'], answer: 1 },
  { id: 'b1-vocab', level: 'B1', skill: 'vocabulary', prompt: 'Choose the best word: “The meeting was ___ because the manager was ill.”', options: ['postponed', 'borrowed', 'improved', 'invited'], answer: 0 },
  { id: 'b1-reading', level: 'B1', skill: 'reading', stimulus: 'NOTICE: The gym will be closed this Saturday for repairs. Members may use the Riverside branch at no extra cost.', prompt: 'What can members do on Saturday?', options: ['Cancel their membership', 'Use another branch', 'Enter the gym after repairs', 'Get a refund'], answer: 1 },
  { id: 'b1-listening', level: 'B1', skill: 'listening', audioSrc: '/audio/ielts/ielts-listening-set-1.mp3', audioLabel: 'Car Tours · IELTS Listening, Section 1', prompt: 'According to the caller, how did she find the car-tour company?', options: ['Through a local paper', 'On the internet', 'At a travel agency', 'Through a friend'], answer: 1 },
  { id: 'b2-grammar', level: 'B2', skill: 'grammar', prompt: 'By the time we arrived, the film ___.', options: ['already started', 'had already started', 'has already started', 'was already starting'], answer: 1 },
  { id: 'b2-vocab', level: 'B2', skill: 'vocabulary', prompt: '“The proposal is feasible” most nearly means:', options: ['It is controversial', 'It is achievable', 'It is expensive', 'It is temporary'], answer: 1 },
  { id: 'b2-reading', level: 'B2', skill: 'reading', stimulus: 'Although remote work can reduce commuting time, researchers caution that its benefits depend on employees having a suitable space and clear boundaries between work and home.', prompt: 'What is the writer’s main point?', options: ['Remote work is always more productive', 'Commuting should be banned', 'Remote work works best under certain conditions', 'Employees prefer working from home'], answer: 2 },
  { id: 'b2-listening', level: 'B2', skill: 'listening', audioSrc: '/audio/ielts/ielts-listening-set-4.mp3', audioLabel: 'Student Housing Inquiry · IELTS Listening, Section 1', prompt: 'Why does Paulo choose Block A at Cedar Hall?', options: ['It costs less than Maple Court', 'It has larger rooms', 'It is quieter for studying', 'It is nearer the sports centre'], answer: 2 },
  { id: 'c1-grammar', level: 'C1', skill: 'grammar', prompt: '___ the data been available sooner, the team could have adjusted the model.', options: ['Had', 'Were', 'Should', 'Having'], answer: 0 },
  { id: 'c1-vocab', level: 'C1', skill: 'vocabulary', prompt: 'The minister’s statement was deliberately ___, allowing both sides to claim support.', options: ['unequivocal', 'ambiguous', 'redundant', 'inadequate'], answer: 1 },
  { id: 'c1-reading', level: 'C1', skill: 'reading', stimulus: 'The policy’s apparent simplicity masks a difficult trade-off: it rewards short-term efficiency while leaving the long-term social costs largely unaccounted for.', prompt: 'The author suggests that the policy:', options: ['Has no measurable benefits', 'Is easy to implement', 'Overlooks consequences that emerge later', 'Should be expanded immediately'], answer: 2 },
  { id: 'c1-listening-main', level: 'C1', skill: 'listening', audioSrc: '/audio/diagnostic/diagnostic-c1-listening.mp3', audioLabel: 'Remote work and productivity · Diagnostic C1', prompt: 'What is the speaker’s main argument?', options: ['Remote work always increases productivity', 'Commuting is the main cause of low productivity', 'Remote work works best under supportive conditions', 'Employees should return to offices permanently'], answer: 2 },
  { id: 'c1-listening-inference', level: 'C1', skill: 'listening', audioSrc: '/audio/diagnostic/diagnostic-c1-listening.mp3', audioLabel: 'Remote work and productivity · Diagnostic C1', prompt: 'Which employee is most likely to report improved concentration?', options: ['Someone who answers messages late at night', 'Someone working from a shared room', 'Someone with a dedicated workspace and agreed hours', 'Someone who spends less time commuting'], answer: 2 },
  { id: 'c1-listening-interpretation', level: 'C1', skill: 'listening', audioSrc: '/audio/diagnostic/diagnostic-c1-listening.mp3', audioLabel: 'Remote work and productivity · Diagnostic C1', prompt: 'What does the speaker imply organisations should do?', options: ['Measure productivity only by hours worked', 'Create clear routines and realistic expectations', 'Require every employee to work at home', 'Focus exclusively on reducing commuting time'], answer: 1 },
  { id: 'c2-grammar', level: 'C2', skill: 'grammar', prompt: 'The committee’s decision, ___ as pragmatic, was criticised for setting a troubling precedent.', options: ['having been hailed', 'hailed', 'was hailed', 'to hail'], answer: 1 },
  { id: 'c2-vocab', level: 'C2', skill: 'vocabulary', prompt: 'To “qualify” a claim in academic writing is to:', options: ['repeat it emphatically', 'make it more precise or limited', 'reject it completely', 'translate it for a wider audience'], answer: 1 },
  { id: 'c2-reading', level: 'C2', skill: 'reading', stimulus: 'Far from resolving the paradox, the new evidence merely relocates it: what appears to be an explanation at one analytical level becomes the very phenomenon requiring explanation at another.', prompt: 'What is the author’s position?', options: ['The evidence definitively resolves the issue', 'The evidence has made the paradox irrelevant', 'The explanation shifts rather than eliminates the problem', 'The evidence is unreliable'], answer: 2 },
  { id: 'c2-listening-main', level: 'C2', skill: 'listening', audioSrc: '/audio/diagnostic/diagnostic-c2-listening.mp3', audioLabel: 'Transparency and public funding · Diagnostic C2', prompt: 'What concern does the speaker raise about the policy?', options: ['It hides how funding decisions are made', 'It may favour projects with easily measured short-term results', 'Public funding should not use any evaluation criteria', 'Applicants cannot see their scores'], answer: 1 },
  { id: 'c2-listening-interpretation', level: 'C2', skill: 'listening', audioSrc: '/audio/diagnostic/diagnostic-c2-listening.mp3', audioLabel: 'Transparency and public funding · Diagnostic C2', prompt: 'In this context, “transparency is not the same as neutrality” means that:', options: ['Open scoring systems never reveal decisions', 'Visible criteria can still reflect contestable values', 'Neutral systems should not publish scores', 'Applicants are unable to inspect their results'], answer: 1 },
  { id: 'c2-listening-inference', level: 'C2', skill: 'listening', audioSrc: '/audio/diagnostic/diagnostic-c2-listening.mp3', audioLabel: 'Transparency and public funding · Diagnostic C2', prompt: 'Which project is most at risk of being undervalued by the framework described?', options: ['A project with immediate, numerical outcomes', 'A programme whose preventive benefits emerge gradually', 'A proposal with clearly published objectives', 'A project that uses a transparent scoring system'], answer: 1 },
  { id: 'c2-grammar-2', level: 'C2', skill: 'grammar', prompt: 'No sooner ___ the proposal than the committee raised a series of objections.', options: ['they had presented', 'had they presented', 'they presented', 'did they present'], answer: 1 },
  { id: 'c2-vocab-2', level: 'C2', skill: 'vocabulary', prompt: 'A “specious” argument is one that:', options: ['is sound and well-supported', 'appears convincing but is actually flawed', 'is too technical to understand', 'deliberately avoids evidence'], answer: 1 },
  ...ICFES_QUESTIONS,
  ...CAMBRIDGE_B2_QUESTIONS,
  ...TOEFL_C1_QUESTIONS,
];

const LABELS: Record<Skill, string> = { grammar: 'Uso de la lengua', vocabulary: 'Vocabulario', reading: 'Lectura', listening: 'Escucha' };
const WA = '573005004253';

function chooseQuestion(level: Level, skill: Skill, used: string[]) {
  const available = QUESTIONS.filter(q => q.skill === skill && !used.includes(q.id));
  const atLevel = available.filter(q => q.level === level);
  if (atLevel.length) return atLevel[0];
  const fallback = QUESTIONS.filter(q => q.level === level && !used.includes(q.id));
  return fallback.sort((a, b) =>
    Math.abs(LEVELS.indexOf(a.level) - LEVELS.indexOf(level)) - Math.abs(LEVELS.indexOf(b.level) - LEVELS.indexOf(level)),
  )[0];
}

export default function NivelRadarClient() {
  const [phase, setPhase] = useState<'intro' | 'test' | 'result'>('intro');
  const [levelIndex, setLevelIndex] = useState(0);
  const [levelPosition, setLevelPosition] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [levelErrors, setLevelErrors] = useState(0);
  const [used, setUsed] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ question: Question; correct: boolean }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [estimatedLevel, setEstimatedLevel] = useState<Level>('A1');

  const currentLevel = LEVELS[levelIndex];
  const currentSkill = LEVEL_SKILLS[levelIndex][levelPosition];
  const question = useMemo(() => chooseQuestion(currentLevel, currentSkill, used), [currentLevel, currentSkill, used]);
  const total = LEVEL_SKILLS.reduce((sum, skills) => sum + skills.length, 0);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  function start() {
    setPhase('test'); setLevelIndex(0); setLevelPosition(0); setLevelScore(0); setLevelErrors(0);
    setUsed([]); setAnswers([]); setSelected(null); setEstimatedLevel('A1');
  }
  function speak() {
    if (!question?.audioText || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(question.audioText);
    utterance.lang = 'en-US'; utterance.rate = 0.86;
    window.speechSynthesis.speak(utterance);
  }
  function submit() {
    if (!question || selected === null) return;
    const correct = selected === question.answer;
    const nextAnswers = [...answers, { question, correct }];
    const nextScore = levelScore + (correct ? 1 : 0);
    const nextErrors = levelErrors + (correct ? 0 : 1);
    const nextPosition = levelPosition + 1;
    const levelLength = LEVEL_SKILLS[levelIndex].length;
    const minimumEvidence = Math.min(4, levelLength);
    const levelIsFinished = nextPosition >= levelLength;
    const evidenceShowsLimit = nextPosition >= minimumEvidence && nextErrors >= 2;
    const passedLevel = levelIsFinished && (levelIndex === LEVELS.length - 1 ? nextErrors === 0 : nextScore / levelLength >= 0.75);

    setAnswers(nextAnswers); setUsed(prev => [...prev, question.id]); setSelected(null); window.speechSynthesis?.cancel();
    if (evidenceShowsLimit || (levelIsFinished && !passedLevel)) {
      setEstimatedLevel(LEVELS[Math.max(0, levelIndex - 1)]);
      setPhase('result');
      return;
    }
    if (passedLevel) {
      if (levelIndex === LEVELS.length - 1) { setEstimatedLevel('C2'); setPhase('result'); return; }
      setLevelIndex(levelIndex + 1); setLevelPosition(0); setLevelScore(0); setLevelErrors(0); return;
    }
    setLevelPosition(nextPosition); setLevelScore(nextScore); setLevelErrors(nextErrors);
  }

  if (phase === 'intro') return <section className={s.hero}><div className={s.shell}><p className={s.eyebrow}>Diagnóstico adaptativo · Inglés</p><h1>Tu nivel real,<br /><span>medido por evidencia.</span></h1><p className={s.lead}>Empiezas en A1. Cada banda exige varias evidencias en lectura, escucha, vocabulario y uso de la lengua antes de desbloquear la siguiente. Un recorrido completo toma aproximadamente 45–60 minutos.</p><div className={s.skillGrid}>{Object.entries(LABELS).map(([key, label]) => <div className={s.skill} key={key}>{label}<small>{key === 'listening' ? 'audio controlado' : 'ítems objetivos'}</small></div>)}</div><button className={s.primary} onClick={start}>Iniciar diagnóstico <span>→</span></button><p className={s.note}>Entre 4 y {total} ítems · Sin registro · No es una certificación oficial</p></div></section>;

  if (phase === 'result') return <Result answers={answers} level={estimatedLevel} onRestart={start} />;
  if (!question) return null;
  const completedBeforeLevel = LEVEL_SKILLS.slice(0, levelIndex).reduce((sum, skills) => sum + skills.length, 0);
  const progress = Math.round(((completedBeforeLevel + levelPosition) / total) * 100);
  return <section className={s.hero}><div className={s.shell}><div className={s.testHeader}><span>Diagnóstico adaptativo</span><span>{answers.length + 1} / {total}</span></div><div className={s.progress}><i style={{ width: `${progress}%` }} /></div><div className={s.levelRow}><span>Estimando</span><b>{currentLevel}</b><span>{LABELS[question.skill]}</span></div><article className={s.question}>{question.stimulus && <p className={s.stimulus}>{question.stimulus}</p>}{question.audioText && <div className={s.audioCard}><button onClick={speak} className={s.audioButton} aria-label="Reproducir audio">▶</button><div><strong>Escucha el fragmento</strong><small>Audio de diagnóstico</small></div></div>}{question.audioSrc && <div className={s.audioCard}><div><strong>{question.audioLabel}</strong><small>Reproduce el fragmento y responde la pregunta.</small></div><audio className={s.audioPlayer} controls controlsList="nodownload"><source src={question.audioSrc} type="audio/mpeg" />Tu navegador no puede reproducir este audio.</audio></div>}<h2>{question.prompt}</h2><div className={s.options}>{question.options.map((option, i) => <button key={option} onClick={() => setSelected(i)} className={selected === i ? s.selected : ''}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div><button className={s.primary} disabled={selected === null} onClick={submit}>{answers.length === total - 1 ? 'Ver mi resultado' : 'Confirmar respuesta'} <span>→</span></button></article><p className={s.note}>La dificultad se ajusta después de cada respuesta.</p></div></section>;
}

type AnswerRecord = { question: Question; correct: boolean };

const ROUTE_BY_SKILL: Record<Skill, string> = {
  grammar: 'gramatica', vocabulary: 'vocabulario', reading: 'lectura', listening: 'escucha',
};

function routeFor(level: Level, skill: Skill) {
  if (level === 'C1' || level === 'C2') return '/practica/ielts';
  return `/practica/ingles/${level.toLowerCase()}/${ROUTE_BY_SKILL[skill]}`;
}

function ReportPdf({ answers, level, summaries, strongest, priority }: {
  answers: AnswerRecord[];
  level: Level;
  summaries: { skill: Skill; attempted: number; correct: number; score: number }[];
  strongest: Skill;
  priority: Skill;
}) {
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const navy: [number, number, number] = [16, 38, 107];
      const red: [number, number, number] = [229, 57, 67];
      const ink: [number, number, number] = [24, 38, 83];
      const muted: [number, number, number] = [92, 104, 123];
      const date = new Intl.DateTimeFormat('es-CO', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
      let y = 24;

      const header = () => {
        doc.setFillColor(...navy); doc.rect(0, 0, 210, 8, 'F');
        doc.setFillColor(...red); doc.rect(0, 8, 52, 2, 'F');
        doc.setTextColor(...navy); doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.text('Idiomas WeLearn', 18, 19);
      };
      const wrapped = (text: string, x: number, top: number, width: number, size = 10, color = ink, bold = false) => {
        doc.setTextColor(...color); doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size);
        const lines = doc.splitTextToSize(text, width) as string[]; doc.text(lines, x, top, { lineHeightFactor: 1.35 });
        return top + lines.length * size * 0.48;
      };
      const section = (title: string) => { doc.setTextColor(...navy); doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text(title, 18, y); y += 8; };
      const pageIfNeeded = (height = 20) => { if (y + height > 270) { doc.addPage(); header(); y = 28; } };

      header();
      doc.setTextColor(...navy); doc.setFont('helvetica', 'bold'); doc.setFontSize(22); doc.text('Reporte de diagnóstico de inglés', 18, y); y += 9;
      y = wrapped('WeLearn', 18, y, 174, 13, red, true) + 9;
      y = wrapped(`Fecha: ${date}`, 18, y, 174, 10, muted) + 10;
      doc.setFillColor(241, 245, 255); doc.roundedRect(18, y, 174, 35, 4, 4, 'F');
      doc.setTextColor(...muted); doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.text('Nivel estimado CEFR', 27, y + 12);
      doc.setTextColor(...red); doc.setFont('helvetica', 'bold'); doc.setFontSize(26); doc.text(level, 27, y + 29); y += 47;

      section('Resumen de evidencia');
      y = wrapped(`Ítems respondidos: ${answers.length}`, 18, y, 174, 10, ink) + 5;
      y = wrapped(`Aciertos: ${answers.filter(answer => answer.correct).length}`, 18, y, 174, 10, ink) + 5;
      y = wrapped(`Nivel más alto consolidado: ${level}`, 18, y, 174, 10, ink) + 8;
      section('Resultado por habilidad');
      summaries.forEach(summary => {
        pageIfNeeded(18);
        doc.setFillColor(247, 249, 252); doc.roundedRect(18, y - 5, 174, 14, 2, 2, 'F');
        doc.setTextColor(...ink); doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.text(LABELS[summary.skill], 24, y + 4);
        doc.setFont('helvetica', 'normal'); doc.text(`${summary.correct}/${summary.attempted} aciertos`, 112, y + 4);
        doc.setTextColor(...red); doc.setFont('helvetica', 'bold'); doc.text(`${summary.score}%`, 174, y + 4, { align: 'right' }); y += 19;
      });
      y += 5; section('Fortalezas y prioridades');
      y = wrapped(`Fortaleza principal: ${LABELS[strongest]}.`, 18, y, 174, 10, ink) + 5;
      y = wrapped(`Prioridad de estudio: ${LABELS[priority]}.`, 18, y, 174, 10, ink) + 8;
      section('Ruta recomendada en WeLearn');
      y = wrapped(`Comienza por ${routeFor(level, priority)} para reforzar ${LABELS[priority].toLowerCase()}. Después, practica las demás habilidades del nivel ${level} antes de intentar el siguiente escalón.`, 18, y, 174, 10, ink) + 10;
      pageIfNeeded(45); section('Aviso importante');
      y = wrapped('Este resultado es orientativo y se basa únicamente en las respuestas de este diagnóstico. La escritura y la expresión oral requieren evaluación humana. Este documento no es un certificado oficial IELTS, TOEFL ni CEFR.', 18, y, 174, 10, muted) + 8;
      doc.setDrawColor(...red); doc.line(18, 270, 192, 270); doc.setTextColor(...muted); doc.setFontSize(8); doc.text('Material original propiedad de Idiomas WeLearn · www.idiomaswl.com', 18, 278);
      doc.save(`reporte-diagnostico-ingles-welearn-${level.toLowerCase()}.pdf`);
    } finally { setBusy(false); }
  }

  return <button className={s.primary} onClick={() => void download()} disabled={busy}>{busy ? 'Preparando reporte…' : 'Descargar mi reporte en PDF'} <span>↓</span></button>;
}

function Result({ answers, level, onRestart }: { answers: AnswerRecord[]; level: Level; onRestart: () => void }) {
  const summaries = (Object.keys(LABELS) as Skill[]).map(skill => {
    const items = answers.filter(answer => answer.question.skill === skill);
    const correct = items.filter(answer => answer.correct).length;
    return { skill, attempted: items.length, correct, score: items.length ? Math.round((correct / items.length) * 100) : 0 };
  }).filter(summary => summary.attempted > 0);
  const sorted = [...summaries].sort((a, b) => b.score - a.score);
  const strongest = sorted[0]?.skill ?? 'grammar';
  const priority = sorted.at(-1)?.skill ?? 'grammar';
  const message = encodeURIComponent(`Hola, hice el Diagnóstico Adaptativo WeLearn. Mi nivel estimado es ${level}. Respondí ${answers.length} ítems y mi prioridad es ${LABELS[priority].toLowerCase()}. Quiero una ruta de estudio.`);
  return <section className={s.hero}><div className={s.shell}><p className={s.eyebrow}>Resultado estimado</p><div className={s.resultLevel}>{level}</div><h1>Tu nivel funcional se ubica en <span>{level}</span>.</h1><p className={s.lead}>El motor cerró al identificar el primer nivel que aún no está consolidado. Tu prioridad de trabajo es <strong>{LABELS[priority].toLowerCase()}</strong>.</p><div className={s.breakdown}>{summaries.map(summary => <div key={summary.skill}><span>{LABELS[summary.skill]}</span><b>{summary.score}%</b><i><em style={{ width: `${summary.score}%` }} /></i></div>)}</div><div className={s.reportActions}><ReportPdf answers={answers} level={level} summaries={summaries} strongest={strongest} priority={priority} /><a className={s.secondary} href={`https://wa.me/${WA}?text=${message}`} target="_blank" rel="noreferrer">Contactar con mi resultado <span>↗</span></a></div><p className={s.disclaimer}>Resultado orientativo. La escritura y la expresión oral requieren evaluación humana; no es una certificación oficial.</p><div className={s.actions}><button className={s.secondary} onClick={onRestart}>Repetir diagnóstico</button></div><Link className={s.back} href="/home">Volver al inicio</Link></div></section>;
}
