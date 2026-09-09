'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AudioPlayer, Timer } from '@/components/exam-runner/primitives';
import { IELTSSpeakingRecorder, type IeltsSpeakingRecording } from '@/components/exam-runner/IELTSSpeakingRecorder';
import type { Exam } from '@/data/exams';
import type { FormGroupQuestion, MCQQuestion, MockExam, MockSection, SpeakQuestion, WriteQuestion } from '@/data/mocks/types';
import styles from './goethe-a1.module.css';

type Skill = 'listening' | 'reading' | 'writing' | 'speaking';
type Phase = 'intro' | 'exam' | 'results';
type DeliveryMode = 'class' | 'simulation';

const SKILLS: Array<{ id: Skill; label: string; minutes: number; points: number }> = [
  { id: 'listening', label: 'Hören', minutes: 20, points: 25 },
  { id: 'reading', label: 'Lesen', minutes: 25, points: 25 },
  { id: 'writing', label: 'Schreiben', minutes: 20, points: 25 },
  { id: 'speaking', label: 'Sprechen', minutes: 15, points: 25 },
];

function normalise(value: string) {
  return value.trim().toLocaleLowerCase('de-DE').replace(/[.,;:!?]+$/g, '').replace(/\s+/g, ' ');
}

function wordCount(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function moduleSections(mock: MockExam, skill: Skill) {
  return mock.sections.filter(section => section.skill === skill);
}

function objectiveQuestions(mock: MockExam, skill: 'listening' | 'reading') {
  return moduleSections(mock, skill).flatMap(section => section.questions.filter(question => question.type === 'mcq') as MCQQuestion[]);
}

function itemNumber(question: MCQQuestion) {
  return Number(question.id.match(/(\d+)$/)?.[1] ?? 0);
}

function ObjectiveItem({ question, number, value, onChange, showResult, visual }: {
  question: MCQQuestion;
  number: number;
  value?: number;
  onChange: (value: number) => void;
  showResult?: boolean;
  visual?: boolean;
}) {
  return (
    <fieldset className={styles.question}>
      <legend><span className={styles.questionNumber}>{number}</span>{question.text}</legend>
      {question.stimulusLabel && <p className={styles.contextLabel}>{question.stimulusLabel}</p>}
      {question.stimulus && (
        <div className={question.stimulusStyle === 'sign' ? styles.sign : styles.adPair}>
          {question.stimulus.split('\n\n').map((block, index) => <div key={index}>{block}</div>)}
        </div>
      )}
      <div className={`${styles.options} ${visual ? styles.visualOptions : ''}`}>
        {question.options.map((option, index) => {
          const correct = showResult && index === question.answer;
          const wrong = showResult && value === index && index !== question.answer;
          return (
            <label key={option} className={`${styles.option} ${value === index ? styles.selected : ''} ${correct ? styles.correct : ''} ${wrong ? styles.wrong : ''}`}>
              <input
                type="radio"
                name={question.id}
                checked={value === index}
                onChange={() => onChange(index)}
                disabled={showResult}
              />
              <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function SectionShell({ section, children }: { section: MockSection; children: React.ReactNode }) {
  const officialPart = section.part <= 3 ? section.part : section.part <= 6 ? section.part - 3 : section.part <= 8 ? section.part - 6 : section.part - 8;
  return (
    <section className={styles.section} aria-labelledby={`goethe-section-${section.part}`}>
      <header className={styles.sectionHeader}>
        <span>Teil {officialPart}</span>
        <h2 id={`goethe-section-${section.part}`}>{section.title.replace(/^.*?:\s*/, '')}</h2>
        <p>{section.instructions}</p>
      </header>
      {children}
    </section>
  );
}

function ListeningModule({ mock, answers, setAnswer, mode, playedParts, setPlayedParts, showResult }: {
  mock: MockExam;
  answers: Record<string, number>;
  setAnswer: (id: string, answer: number) => void;
  mode: DeliveryMode;
  playedParts: Set<number>;
  setPlayedParts: (next: Set<number>) => void;
  showResult?: boolean;
}) {
  return <>{moduleSections(mock, 'listening').map(section => (
    <SectionShell key={section.part} section={section}>
      {section.audioUrl && !showResult && (
        <div className={styles.audioCard}>
          <div>
            <strong>Audio Teil {section.part}</strong>
            <span>{section.part === 2 ? '1 reproducción' : '2 reproducciones incluidas en la pista'}</span>
          </div>
          <AudioPlayer
            src={section.audioUrl}
            label={`Hören Teil ${section.part}`}
            replayable={mode === 'class'}
            alreadyPlayed={mode === 'simulation' && playedParts.has(section.part)}
            onPlaybackStart={() => setPlayedParts(new Set([...playedParts, section.part]))}
          />
        </div>
      )}
      {mode === 'class' && section.transcript && !showResult && (
        <details className={styles.transcript}>
          <summary>Transcripción para el profesor</summary>
          <pre>{section.transcript}</pre>
        </details>
      )}
      <div className={styles.questionList}>
        {(section.questions.filter(question => question.type === 'mcq') as MCQQuestion[]).map(question => <ObjectiveItem key={question.id} question={question} number={itemNumber(question)} value={answers[question.id]} onChange={value => setAnswer(question.id, value)} showResult={showResult} visual={section.part === 1} />)}
      </div>
    </SectionShell>
  ))}</>;
}

function ReadingModule({ mock, answers, setAnswer, showResult }: {
  mock: MockExam;
  answers: Record<string, number>;
  setAnswer: (id: string, answer: number) => void;
  showResult?: boolean;
}) {
  return <>{moduleSections(mock, 'reading').map(section => (
    <SectionShell key={section.part} section={section}>
      {section.passage && (
        <div className={styles.documents}>
          {section.passage.split('\n\nTEXT B').map((document, index) => (
            <article key={index} className={styles.message}>
              <span>{index === 0 ? 'Text A' : 'Text B'}</span>
              <pre>{index === 0 ? document.replace(/^TEXT A[^\n]*\n\n/, '') : document.replace(/^\s*—[^\n]*\n\n/, '')}</pre>
            </article>
          ))}
        </div>
      )}
      <div className={styles.questionList}>
        {(section.questions.filter(question => question.type === 'mcq') as MCQQuestion[]).map(question => <ObjectiveItem key={question.id} question={question} number={itemNumber(question)} value={answers[question.id]} onChange={value => setAnswer(question.id, value)} showResult={showResult} />)}
      </div>
    </SectionShell>
  ))}</>;
}

function GoetheForm({ question, values, onChange, showResult }: {
  question: FormGroupQuestion;
  values: Record<number, string>;
  onChange: (number: number, value: string) => void;
  showResult?: boolean;
}) {
  const lines = question.template.split('\n');
  return (
    <div className={styles.formTask}>
      <div className={styles.formSource}><strong>Situation</strong><p>{question.groupLabel}</p></div>
      <div className={styles.paperForm}>
        <h3>{question.title}</h3>
        <p className={styles.formExample}>Beispiel: {question.example}</p>
        {lines.map(line => {
          const match = line.match(/^(.+): \{\{(\d+)\}\}$/);
          if (!match) return null;
          const number = Number(match[2]);
          const blank = question.blanks.find(item => item.num === number);
          const correct = showResult && blank?.answers.some(answer => normalise(answer) === normalise(values[number] ?? ''));
          return (
            <label key={number} className={styles.formRow}>
              <span>{match[1]}</span>
              <span className={styles.blankNumber}>{number}</span>
              <input value={values[number] ?? ''} onChange={event => onChange(number, event.target.value)} disabled={showResult} className={correct ? styles.inputCorrect : ''} />
            </label>
          );
        })}
      </div>
    </div>
  );
}

function WritingModule({ mock, formValues, onFormChange, textValue, onTextChange, showResult }: {
  mock: MockExam;
  formValues: Record<number, string>;
  onFormChange: (number: number, value: string) => void;
  textValue: string;
  onTextChange: (value: string) => void;
  showResult?: boolean;
}) {
  return <>{moduleSections(mock, 'writing').map(section => {
    const form = section.questions.find(question => question.type === 'formgroup') as FormGroupQuestion | undefined;
    const writing = section.questions.find(question => question.type === 'write') as WriteQuestion | undefined;
    return (
      <SectionShell key={section.part} section={section}>
        {form && <GoetheForm question={form} values={formValues} onChange={onFormChange} showResult={showResult} />}
        {writing && (
          <div className={styles.writingTask}>
            <div className={styles.writingPrompt}>
              <strong>{writing.stimulusLabel}</strong>
              <p>{writing.stimulus}</p>
              <pre>{writing.text}</pre>
            </div>
            <label htmlFor={writing.id}>Ihre Nachricht</label>
            <textarea id={writing.id} value={textValue} onChange={event => onTextChange(event.target.value)} disabled={showResult} rows={9} />
            <p className={`${styles.wordCount} ${wordCount(textValue) >= 30 ? styles.wordCountReady : ''}`}>{wordCount(textValue)} Wörter · Ziel: circa 30</p>
          </div>
        )}
      </SectionShell>
    );
  })}</>;
}

function cardGroups(question: SpeakQuestion) {
  return (question.cueCard ?? '').split('\n\n').map(group => {
    const [title, cards = ''] = group.split('\n');
    return { title, cards: cards.split(' · ') };
  });
}

function SpeakingModule({ mock, recordings, onRecording }: {
  mock: MockExam;
  recordings: Record<string, IeltsSpeakingRecording | undefined>;
  onRecording: (id: string, recording: IeltsSpeakingRecording | undefined) => void;
}) {
  return <>{moduleSections(mock, 'speaking').map(section => {
    const question = section.questions[0] as SpeakQuestion;
    const groups = cardGroups(question);
    return (
      <SectionShell key={section.part} section={section}>
        <div className={styles.speakingTask}>
          <pre className={styles.speakingPrompt}>{question.text}</pre>
          {question.cueCard && <div className={styles.cardGroups}>{groups.map(group => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <div className={styles.cards}>{group.cards.map(card => <span key={card}>{card}</span>)}</div>
            </div>
          ))}</div>}
          <div className={styles.recorder}>
            <p>Grabación opcional para revisión en clase</p>
            <IELTSSpeakingRecorder questionId={question.id} recording={recordings[question.id]} maxSeconds={section.part === 9 ? 180 : 300} onChange={recording => onRecording(question.id, recording)} />
          </div>
        </div>
      </SectionShell>
    );
  })}</>;
}

function ScoreSelect({ label, value, options, onChange }: { label: string; value?: number; options: number[]; onChange: (value: number) => void }) {
  return <label className={styles.scoreRow}><span>{label}</span><select value={value ?? ''} onChange={event => onChange(Number(event.target.value))}><option value="">Pendiente</option>{options.map(option => <option key={option} value={option}>{String(option).replace('.', ',')}</option>)}</select></label>;
}

function AnswerSheet() {
  return (
    <section className={styles.answerSheetPrintable}>
      <header><strong>WELEARN · A1</strong><h1>Hoja de respuestas · Simulacro 1</h1><p>Nombre: ____________________________________ Fecha: __________________</p></header>
      {(['Hören', 'Lesen'] as const).map(skill => <div key={skill}><h2>{skill}</h2><div className={styles.bubbleGrid}>{Array.from({ length: 15 }, (_, index) => <div key={index}><b>{index + 1}</b><span>○ A</span><span>○ B</span>{skill === 'Hören' && <span>○ C</span>}</div>)}</div></div>)}
      <h2>Schreiben · Teil 1</h2><div className={styles.printLines}>{Array.from({ length: 5 }, (_, index) => <p key={index}>{index + 1}. ______________________________________________</p>)}</div>
      <h2>Schreiben · Teil 2</h2><div className={styles.longLines}>{Array.from({ length: 8 }, (_, index) => <p key={index}>________________________________________________________________________________</p>)}</div>
      <h2>Sprechen · Bewertung</h2><p>Teil 1: ____ / 3 &nbsp;&nbsp; Teil 2: ____ / 6 &nbsp;&nbsp; Teil 3: ____ / 6</p>
    </section>
  );
}

export default function GoetheA1PracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [mode, setMode] = useState<DeliveryMode>('class');
  const [activeSkill, setActiveSkill] = useState<Skill>('listening');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [formValues, setFormValues] = useState<Record<number, string>>({});
  const [writing, setWriting] = useState('');
  const [recordings, setRecordings] = useState<Record<string, IeltsSpeakingRecording | undefined>>({});
  const [playedParts, setPlayedParts] = useState(new Set<number>());
  const [writingScores, setWritingScores] = useState<Record<string, number>>({});
  const [speakingScores, setSpeakingScores] = useState<Record<string, number>>({});

  const listeningQuestions = useMemo(() => objectiveQuestions(mock, 'listening'), [mock]);
  const readingQuestions = useMemo(() => objectiveQuestions(mock, 'reading'), [mock]);
  const correctFor = (questions: MCQQuestion[]) => questions.filter(question => answers[question.id] === question.answer).length;
  const listeningCorrect = correctFor(listeningQuestions);
  const readingCorrect = correctFor(readingQuestions);
  const formQuestion = moduleSections(mock, 'writing').flatMap(section => section.questions).find(question => question.type === 'formgroup') as FormGroupQuestion;
  const formCorrect = formQuestion.blanks.filter(blank => blank.answers.some(answer => normalise(answer) === normalise(formValues[blank.num] ?? ''))).length;
  const writingOpen = ['content1', 'content2', 'content3', 'conventions'].reduce((sum, key) => sum + (writingScores[key] ?? 0), 0);
  const speakingRaw = ['part1', 'part2', 'part3'].reduce((sum, key) => sum + (speakingScores[key] ?? 0), 0);
  const scaled = {
    listening: listeningCorrect * 25 / 15,
    reading: readingCorrect * 25 / 15,
    writing: (formCorrect + writingOpen) * 25 / 15,
    speaking: speakingRaw * 25 / 15,
  };
  const totalScore = Object.values(scaled).reduce((sum, value) => sum + value, 0);
  const manualComplete = Object.keys(writingScores).length === 4 && Object.keys(speakingScores).length === 3;
  const objectiveAnswered = [...listeningQuestions, ...readingQuestions].filter(question => answers[question.id] !== undefined).length;

  function restart() {
    setPhase('intro'); setActiveSkill('listening'); setAnswers({}); setFormValues({}); setWriting(''); setRecordings({}); setPlayedParts(new Set()); setWritingScores({}); setSpeakingScores({});
  }

  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        {phase === 'intro' && (
          <main className={styles.intro}>
            <div className={styles.brand}><span>WELEARN</span><span>DEUTSCH A1</span></div>
            <p className={styles.eyebrow}>Simulacro original · formato Start Deutsch 1</p>
            <h1>{mock.title}</h1>
            <p className={styles.lead}>Una experiencia completa de 80 minutos con las cuatro destrezas y puntuación 25 + 25 + 25 + 25.</p>
            <div className={styles.moduleGrid}>{SKILLS.map(skill => <article key={skill.id}><strong>{skill.label}</strong><span>{skill.minutes} min</span><small>{skill.points} Punkte</small></article>)}</div>
            <div className={styles.modePicker} role="group" aria-label="Modo de aplicación">
              <button className={mode === 'class' ? styles.modeActive : ''} onClick={() => setMode('class')}><strong>Modo clase</strong><span>Audio repetible y transcripción del profesor</span></button>
              <button className={mode === 'simulation' ? styles.modeActive : ''} onClick={() => setMode('simulation')}><strong>Modo simulacro</strong><span>80 minutos y una reproducción de cada pista</span></button>
            </div>
            <div className={styles.introActions}><button className={styles.primary} onClick={() => setPhase('exam')}>Prüfung starten</button><button className={styles.secondary} onClick={() => window.print()}>Imprimir hoja de respuestas</button></div>
            <p className={styles.disclaimer}>Contenido original de WeLearn alineado con la arquitectura pública A1. No es un examen oficial ni está afiliado al Goethe-Institut.</p>
            <Link href={`/examenes/${exam.slug}`}>← Volver a Goethe</Link>
          </main>
        )}

        {phase === 'exam' && (
          <>
            <header className={styles.topbar}>
              <div><span>WELEARN · A1</span><strong>Simulacro 1</strong></div>
              <div className={styles.topbarStatus}><span>{objectiveAnswered}/30 respuestas objetivas</span>{mode === 'simulation' && <Timer totalSecs={80 * 60} onExpire={() => setPhase('results')} />}</div>
            </header>
            <nav className={styles.tabs} aria-label="Prüfungsteile">{SKILLS.map(skill => <button key={skill.id} className={activeSkill === skill.id ? styles.tabActive : ''} onClick={() => setActiveSkill(skill.id)}><span>{skill.label}</span><small>{skill.minutes} min · {skill.points} P.</small></button>)}</nav>
            <main className={styles.exam}>
              {activeSkill === 'listening' && <ListeningModule mock={mock} answers={answers} setAnswer={(id, answer) => setAnswers(previous => ({ ...previous, [id]: answer }))} mode={mode} playedParts={playedParts} setPlayedParts={setPlayedParts} />}
              {activeSkill === 'reading' && <ReadingModule mock={mock} answers={answers} setAnswer={(id, answer) => setAnswers(previous => ({ ...previous, [id]: answer }))} />}
              {activeSkill === 'writing' && <WritingModule mock={mock} formValues={formValues} onFormChange={(number, value) => setFormValues(previous => ({ ...previous, [number]: value }))} textValue={writing} onTextChange={setWriting} />}
              {activeSkill === 'speaking' && <SpeakingModule mock={mock} recordings={recordings} onRecording={(id, recording) => setRecordings(previous => ({ ...previous, [id]: recording }))} />}
              <div className={styles.examFooter}><button className={styles.secondary} onClick={() => window.print()}>Hoja de respuestas</button><button className={styles.primary} onClick={() => setPhase('results')}>Prüfung abgeben</button></div>
            </main>
          </>
        )}

        {phase === 'results' && (
          <main className={styles.results}>
            <div className={styles.resultHero}><p>{manualComplete ? 'Gesamtergebnis' : 'Resultado provisional'}</p><strong>{totalScore.toFixed(1).replace('.', ',')}</strong><span>/ 100 Punkte</span>{manualComplete && <b className={totalScore >= 60 ? styles.pass : styles.fail}>{totalScore >= 60 ? 'BESTANDEN' : 'NICHT BESTANDEN'}</b>}</div>
            <div className={styles.scoreGrid}>
              <article><span>Hören</span><strong>{scaled.listening.toFixed(1)}</strong><small>{listeningCorrect}/15 richtig</small></article>
              <article><span>Lesen</span><strong>{scaled.reading.toFixed(1)}</strong><small>{readingCorrect}/15 richtig</small></article>
              <article><span>Schreiben</span><strong>{scaled.writing.toFixed(1)}</strong><small>{formCorrect + writingOpen}/15 Rohpunkte</small></article>
              <article><span>Sprechen</span><strong>{scaled.speaking.toFixed(1)}</strong><small>{speakingRaw}/15 Rohpunkte</small></article>
            </div>

            <section className={styles.teacherPanel}>
              <header><p>Para el profesor</p><h2>Completar evaluación abierta</h2><span>Al completar los siete campos se calcula el resultado oficial sobre 100.</span></header>
              <div className={styles.rubricColumns}>
                <div><h3>Schreiben · Teil 2</h3><ScoreSelect label="Contenido 1" value={writingScores.content1} options={[0, 1.5, 3]} onChange={value => setWritingScores(previous => ({ ...previous, content1: value }))} /><ScoreSelect label="Contenido 2" value={writingScores.content2} options={[0, 1.5, 3]} onChange={value => setWritingScores(previous => ({ ...previous, content2: value }))} /><ScoreSelect label="Contenido 3" value={writingScores.content3} options={[0, 1.5, 3]} onChange={value => setWritingScores(previous => ({ ...previous, content3: value }))} /><ScoreSelect label="Anrede und Gruß" value={writingScores.conventions} options={[0, 0.5, 1]} onChange={value => setWritingScores(previous => ({ ...previous, conventions: value }))} /></div>
                <div><h3>Sprechen</h3><ScoreSelect label="Teil 1 · presentación" value={speakingScores.part1} options={[0, 0.5, 1, 1.5, 2, 2.5, 3]} onChange={value => setSpeakingScores(previous => ({ ...previous, part1: value }))} /><ScoreSelect label="Teil 2 · preguntas/respuestas" value={speakingScores.part2} options={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]} onChange={value => setSpeakingScores(previous => ({ ...previous, part2: value }))} /><ScoreSelect label="Teil 3 · peticiones/reacciones" value={speakingScores.part3} options={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]} onChange={value => setSpeakingScores(previous => ({ ...previous, part3: value }))} /></div>
              </div>
              {writing && <details><summary>Ver respuesta de Schreiben</summary><pre>{writing}</pre></details>}
            </section>

            <section className={styles.review}><h2>Soluciones objetivas</h2><ListeningModule mock={mock} answers={answers} setAnswer={() => {}} mode="class" playedParts={new Set()} setPlayedParts={() => {}} showResult /><ReadingModule mock={mock} answers={answers} setAnswer={() => {}} showResult /><WritingModule mock={mock} formValues={formValues} onFormChange={() => {}} textValue={writing} onTextChange={() => {}} showResult /></section>
            <div className={styles.introActions}><button className={styles.primary} onClick={restart}>Intentar de nuevo</button><button className={styles.secondary} onClick={() => window.print()}>Imprimir hoja</button></div>
          </main>
        )}
      </div>
      <AnswerSheet />
    </div>
  );
}
