'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  SURVIVAL_EXPRESSIONS, SURVIVAL_QUIZZES, MODEL_PRESENTATION,
  VOCAB_GROUPS, SENTENCE_ACTIVITIES, TEACHER_QUESTIONS, FINAL_CHECKLIST,
  AGE_OPTIONS, COUNTRY_OPTIONS, CITY_OPTIONS, OCCUPATION_OPTIONS,
  LIKES_OPTIONS, TODAY_OPTIONS,
} from '@/data/korean-intro-speaking-1';

// ─── Utilities ────────────────────────────────────────────────────────────────

function hasBatchim(text: string): boolean {
  if (!text) return false;
  const char = text.trimEnd();
  if (!char) return false;
  const last = char[char.length - 1];
  const code = last.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return false;
  return code % 28 !== 0;
}

function copula(word: string): string {
  return hasBatchim(word) ? '이에요' : '예요';
}

function objParticle(word: string): string {
  return hasBatchim(word) ? '을' : '를';
}

function speak(text: string, slow = false) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = slow ? 0.55 : 0.8;
  window.speechSynthesis.speak(u);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface PersonalForm {
  name: string;
  nameParticle: '예요' | '이에요';
  ageValue: string;
  country: string;
  city: string;
  occupation: string;
  likes: string[];
  today: string;
}

const DEFAULT_FORM: PersonalForm = {
  name: '',
  nameParticle: '예요',
  ageValue: '',
  country: '',
  city: '',
  occupation: '',
  likes: [],
  today: '',
};

function buildLikesLine(items: string[]): string {
  if (items.length === 0) return '___을/를 좋아해요';
  if (items.length === 1) return `${items[0]}${objParticle(items[0])} 좋아해요`;
  const mid = items.slice(0, -1).map(i => `${i}하고`);
  const last = items[items.length - 1];
  return [...mid, `${last}${objParticle(last)} 좋아해요`].join(' ');
}

function buildPresentation(form: PersonalForm): string[] {
  const name = form.name.trim() || '___';
  const ageKorean = AGE_OPTIONS.find(a => a.value === form.ageValue)?.korean || '___';
  return [
    `안녕하세요. 저는 ${name}${form.nameParticle}.`,
    `저는 ${ageKorean}이에요.`,
    form.country ? `저는 ${form.country} 사람이에요.` : '저는 ___ 사람이에요.',
    form.city    ? `저는 ${form.city}에 살아요.`      : '저는 ___에 살아요.',
    form.occupation ? `저는 ${form.occupation}${copula(form.occupation)}.` : '저는 ___이에요/예요.',
    '저는 한국어를 공부해요.',
    form.likes.length > 0 ? `저는 ${buildLikesLine(form.likes)}.` : '저는 ___을/를 좋아해요.',
    form.today  ? `오늘 저는 ${form.today}.` : '오늘 저는 ___해요.',
    '감사합니다.',
  ];
}

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 0, label: 'Supervivencia', icon: '🆘', color: '#534AB7' },
  { id: 1, label: 'Presentación', icon: '📜', color: '#059669' },
  { id: 2, label: 'Vocabulario', icon: '📚', color: '#d97706' },
  { id: 3, label: 'Personalizar', icon: '✏️', color: '#e11d48' },
  { id: 4, label: 'Construir', icon: '🧩', color: '#0891b2' },
  { id: 5, label: 'Hablar', icon: '🗣️', color: '#7c3aed' },
  { id: 6, label: 'Presentación final', icon: '🎤', color: '#c8202e' },
];

const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--line-soft)',
      borderRadius: 14,
      padding: '1.25rem 1.5rem',
      ...style,
    }}>
      {children}
    </div>
  );
}

function TeacherNote({ text }: { text: string }) {
  return (
    <div style={{
      background: 'rgba(217,119,6,0.07)',
      border: '1px solid rgba(217,119,6,0.2)',
      borderLeft: '3px solid #d97706',
      borderRadius: 8,
      padding: '0.75rem 1rem',
      marginTop: '0.75rem',
      fontSize: '0.82rem',
      color: 'var(--ink-2)',
    }}>
      <span style={{ fontWeight: 700, color: '#d97706', marginRight: '0.4rem', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Docente</span>
      {text}
    </div>
  );
}

function KrDisplay({ korean, romanization, spanish, showRom, showEs, color = '#534AB7', size = '1.6rem' }: {
  korean: string; romanization: string; spanish: string;
  showRom: boolean; showEs: boolean; color?: string; size?: string;
}) {
  return (
    <div>
      <div style={{ fontSize: size, fontWeight: 700, color, lineHeight: 1.25, marginBottom: '0.2rem' }}>{korean}</div>
      {showRom && <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: '0.15rem' }}>{romanization}</div>}
      {showEs  && <div style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>{spanish}</div>}
    </div>
  );
}

// ─── Step 1: Survival Korean ──────────────────────────────────────────────────

function Step1Survival({ teacherMode }: { teacherMode: boolean }) {
  const [quizIdx, setQuizIdx]           = useState(0);
  const [selected, setSelected]         = useState<string | null>(null);
  const [score, setScore]               = useState(0);
  const [quizDone, setQuizDone]         = useState(false);
  const [showQuiz, setShowQuiz]         = useState(false);

  const quiz = SURVIVAL_QUIZZES[quizIdx];
  const expr = (id: string) => SURVIVAL_EXPRESSIONS.find(e => e.id === id)!;

  const handleChoice = (id: string) => {
    if (selected) return;
    setSelected(id);
    if (id === quiz.correct) setScore(s => s + 1);
  };

  const nextQuiz = () => {
    if (quizIdx + 1 >= SURVIVAL_QUIZZES.length) {
      setQuizDone(true);
    } else {
      setQuizIdx(i => i + 1);
      setSelected(null);
    }
  };

  const restartQuiz = () => { setQuizIdx(0); setSelected(null); setScore(0); setQuizDone(false); };

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1rem' }}>
          Estas expresiones son tu kit de supervivencia para la clase. Estúdialas, escúchalas y úsalas desde hoy.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.85rem' }}>
          {SURVIVAL_EXPRESSIONS.map(expr => (
            <Card key={expr.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#534AB7', lineHeight: 1.2 }}>{expr.korean}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: '0.15rem' }}>{expr.romanization}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--ink-2)', marginTop: '0.15rem' }}>{expr.spanish}</div>
                </div>
                <button
                  onClick={() => speak(expr.korean, true)}
                  style={{ background: 'rgba(83,74,183,0.1)', border: 'none', borderRadius: 8, padding: '0.45rem 0.65rem', cursor: 'pointer', fontSize: '1rem', flexShrink: 0 }}
                  title="Escuchar"
                >
                  ▶
                </button>
              </div>
              {teacherMode && (
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', borderTop: '1px solid var(--line-soft)', paddingTop: '0.4rem', fontStyle: 'italic' }}>
                  Situación: {expr.situation}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
        {!showQuiz ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              ¿Listo para practicar? El sistema te mostrará situaciones — elige la expresión correcta.
            </p>
            <button onClick={() => setShowQuiz(true)} className="btn btn-primary btn-sm">
              Empezar mini-práctica →
            </button>
          </div>
        ) : quizDone ? (
          <Card style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {score} / {SURVIVAL_QUIZZES.length} correctas
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              {score === SURVIVAL_QUIZZES.length ? '¡Perfecto! Ya tienes tu kit de supervivencia.' : 'Buen intento. Practica un poco más.'}
            </div>
            <button onClick={restartQuiz} className="btn btn-ghost btn-sm">Reintentar</button>
          </Card>
        ) : (
          <Card>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              Situación {quizIdx + 1} de {SURVIVAL_QUIZZES.length}
            </div>
            <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--ink)', lineHeight: 1.5 }}>
              {expr(quiz.situationId).situation}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
              {quiz.choices.map(id => {
                const e = expr(id);
                const isSelected = selected === id;
                const isCorrect  = id === quiz.correct;
                let bg = 'var(--bg-2)';
                let border = '1.5px solid var(--line-soft)';
                let textColor = 'var(--ink)';
                if (selected) {
                  if (isCorrect)       { bg = 'rgba(5,150,105,0.1)';  border = '1.5px solid #059669';  textColor = '#059669'; }
                  else if (isSelected) { bg = 'rgba(225,29,72,0.08)'; border = '1.5px solid #e11d48';  textColor = '#e11d48'; }
                }
                return (
                  <button
                    key={id}
                    onClick={() => handleChoice(id)}
                    style={{ textAlign: 'left', background: bg, border, borderRadius: 10, padding: '0.85rem 1rem', cursor: selected ? 'default' : 'pointer', transition: 'all 0.2s', color: textColor, font: 'inherit' }}
                  >
                    <div style={{ fontSize: '1.35rem', fontWeight: 700 }}>{e.korean}</div>
                    <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', opacity: 0.7 }}>{e.romanization}</div>
                  </button>
                );
              })}
            </div>
            {selected && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: selected === quiz.correct ? '#059669' : '#e11d48', fontWeight: 600 }}>
                  {selected === quiz.correct ? '¡Correcto!' : `La respuesta es: ${expr(quiz.correct).korean}`}
                </span>
                <button onClick={nextQuiz} className="btn btn-sm">
                  {quizIdx + 1 >= SURVIVAL_QUIZZES.length ? 'Ver resultado' : 'Siguiente →'}
                </button>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── Step 2: Model presentation ───────────────────────────────────────────────

function Step2Model({ teacherMode }: { teacherMode: boolean }) {
  const [showRom, setShowRom]       = useState(true);
  const [showEs, setShowEs]         = useState(true);
  const [lineByLine, setLineByLine] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [practiced, setPracticed]   = useState<Set<string>>(new Set());

  const togglePracticed = (id: string) => {
    setPracticed(p => { const s = new Set(p); s.has(id) ? s.delete(id) : s.add(id); return s; });
  };

  const speakAll = () => MODEL_PRESENTATION.map(l => l.korean).join(' ');

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <button onClick={() => setShowRom(v => !v)} className={`btn btn-sm ${showRom ? '' : 'btn-ghost'}`} style={{ fontSize: '0.8rem' }}>
          {showRom ? '▼ Romanización' : '▷ Romanización'}
        </button>
        <button onClick={() => setShowEs(v => !v)}  className={`btn btn-sm ${showEs ? '' : 'btn-ghost'}`}  style={{ fontSize: '0.8rem' }}>
          {showEs ? '▼ Español' : '▷ Español'}
        </button>
        <button onClick={() => { setLineByLine(v => !v); setCurrentLine(0); }} className={`btn btn-sm ${lineByLine ? '' : 'btn-ghost'}`} style={{ fontSize: '0.8rem' }}>
          {lineByLine ? '📄 Modo frase' : '📃 Modo lista'}
        </button>
        <button onClick={() => speak(speakAll())} className="btn btn-ghost btn-sm" style={{ fontSize: '0.8rem' }}>
          ▶ Escuchar todo
        </button>
      </div>

      {/* Progress */}
      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: '0.85rem' }}>
        Practicadas: {practiced.size} / {MODEL_PRESENTATION.length}
      </div>

      {lineByLine ? (
        /* Line-by-line mode */
        <Card style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
            Frase {currentLine + 1} de {MODEL_PRESENTATION.length}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', lineHeight: 1.3, marginBottom: '0.5rem' }}>
            {MODEL_PRESENTATION[currentLine].korean}
          </div>
          {showRom && <div style={{ fontSize: '0.9rem', color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: '0.3rem' }}>{MODEL_PRESENTATION[currentLine].romanization}</div>}
          {showEs  && <div style={{ fontSize: '1rem', color: 'var(--ink-2)', marginBottom: '1.25rem' }}>{MODEL_PRESENTATION[currentLine].spanish}</div>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => speak(MODEL_PRESENTATION[currentLine].korean, true)} className="btn btn-ghost btn-sm">▶ Escuchar</button>
            <button onClick={() => togglePracticed(MODEL_PRESENTATION[currentLine].id)} className={practiced.has(MODEL_PRESENTATION[currentLine].id) ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}>
              {practiced.has(MODEL_PRESENTATION[currentLine].id) ? '✓ Practicada' : 'Marcar como practicada'}
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <button onClick={() => setCurrentLine(l => Math.max(0, l - 1))} className="btn btn-ghost btn-sm" disabled={currentLine === 0}>← Anterior</button>
            <button onClick={() => setCurrentLine(l => Math.min(MODEL_PRESENTATION.length - 1, l + 1))} className="btn btn-sm" disabled={currentLine === MODEL_PRESENTATION.length - 1}>Siguiente →</button>
          </div>
        </Card>
      ) : (
        /* List mode */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {MODEL_PRESENTATION.map((line, i) => (
            <Card key={line.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.25rem', opacity: practiced.has(line.id) ? 0.6 : 1, transition: 'opacity 0.2s' }}>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', fontWeight: 700, minWidth: 22, paddingTop: '0.35rem' }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#059669', lineHeight: 1.3 }}>{line.korean}</div>
                {showRom && <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{line.romanization}</div>}
                {showEs  && <div style={{ fontSize: '0.88rem', color: 'var(--ink-2)' }}>{line.spanish}</div>}
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button onClick={() => speak(line.korean, true)} style={{ background: 'rgba(5,150,105,0.1)', border: 'none', borderRadius: 7, padding: '0.4rem 0.6rem', cursor: 'pointer', fontSize: '0.85rem' }} title="Escuchar">▶</button>
                <button onClick={() => togglePracticed(line.id)} style={{ background: practiced.has(line.id) ? 'rgba(5,150,105,0.15)' : 'transparent', border: '1px solid var(--line-soft)', borderRadius: 7, padding: '0.4rem 0.6rem', cursor: 'pointer', fontSize: '0.85rem', color: practiced.has(line.id) ? '#059669' : 'var(--muted)' }} title="Marcar">✓</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {teacherMode && (
        <TeacherNote text="Pide al estudiante que lea la presentación tres veces: primero con apoyo completo, luego solo con Hangul, finalmente de memoria. Usa el modo frase por frase para trabajar la pronunciación línea a línea." />
      )}
    </div>
  );
}

// ─── Step 3: Vocabulary ───────────────────────────────────────────────────────

function Step3Vocabulary({ teacherMode }: { teacherMode: boolean }) {
  const [activeGroup, setActiveGroup] = useState(VOCAB_GROUPS[0].id);
  const [expanded, setExpanded]       = useState<string | null>(null);

  const group = VOCAB_GROUPS.find(g => g.id === activeGroup)!;

  return (
    <div>
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {VOCAB_GROUPS.map(g => (
          <button
            key={g.id}
            onClick={() => { setActiveGroup(g.id); setExpanded(null); }}
            style={{
              padding: '0.45rem 0.85rem', borderRadius: 8, border: `1.5px solid ${activeGroup === g.id ? g.color : 'var(--line-soft)'}`,
              background: activeGroup === g.id ? `${g.color}18` : 'transparent',
              color: activeGroup === g.id ? g.color : 'var(--muted)',
              fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', font: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.75rem' }}>
        {group.items.map(item => (
          <button
            key={item.id}
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            style={{
              textAlign: 'left', background: 'var(--surface)', border: expanded === item.id ? `1.5px solid ${group.color}` : '1px solid var(--line-soft)',
              borderRadius: 12, padding: '1rem 1.1rem', cursor: 'pointer', font: 'inherit', color: 'inherit', transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: group.color, marginBottom: '0.2rem' }}>{item.korean}</div>
            <div style={{ fontSize: '0.76rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginBottom: '0.1rem' }}>{item.romanization}</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--ink-2)', marginBottom: expanded === item.id ? '0.75rem' : 0 }}>{item.spanish}</div>
            {expanded === item.id && (
              <div style={{ borderTop: `1px solid ${group.color}30`, paddingTop: '0.6rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: group.color, marginBottom: '0.1rem' }}>{item.example}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{item.exampleEs}</div>
                <button
                  onClick={e => { e.stopPropagation(); speak(item.example); }}
                  style={{ marginTop: '0.5rem', background: `${group.color}15`, border: 'none', borderRadius: 6, padding: '0.3rem 0.65rem', cursor: 'pointer', fontSize: '0.78rem', color: group.color, fontFamily: 'var(--mono)' }}
                >
                  ▶ Escuchar
                </button>
              </div>
            )}
          </button>
        ))}
      </div>

      {teacherMode && (
        <TeacherNote text="Recorre cada categoría con el estudiante. Pídele que pronuncie cada palabra después de escucharla. Enfocarse en la categoría de verbos y partículas — son las más críticas para la producción oral." />
      )}
    </div>
  );
}

// ─── Step 4: Personalization ──────────────────────────────────────────────────

function Step4Personalize({ teacherMode, onGenerate }: { teacherMode: boolean; onGenerate: (lines: string[]) => void }) {
  const [form, setForm]           = useState<PersonalForm>(DEFAULT_FORM);
  const [generated, setGenerated] = useState(false);
  const [lines, setLines]         = useState<string[]>([]);
  const [showRom, setShowRom]     = useState(false);

  const MODEL_ROM = [
    'Annyeonghaseyo. Jeoneun ___yeyo.',
    'Jeoneun ___ sarieyo.',
    'Jeoneun ___ saramieyo.',
    'Jeoneun ___-e sarayo.',
    'Jeoneun ___ieyo/yeyo.',
    'Jeoneun hangugeo-reul gongbuhaeyo.',
    'Jeoneun ___eul/reul joahaeyo.',
    'Oneul jeoneun ___haeyo.',
    'Gamsahamnida.',
  ];

  const toggleLike = (val: string) => {
    setForm(f => ({
      ...f,
      likes: f.likes.includes(val) ? f.likes.filter(v => v !== val) : [...f.likes, val],
    }));
  };

  const generate = () => {
    const built = buildPresentation(form);
    setLines(built);
    setGenerated(true);
    onGenerate(built);
  };

  const sel: CSSProperties = { width: '100%', padding: '0.6rem 0.85rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' };
  const inp: CSSProperties = { ...sel, cursor: 'text' };

  return (
    <div>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
        Completa el formulario con tu información. El sistema generará tu presentación personal en coreano.
      </p>

      <Card style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {/* Name */}
          <div>
            <label style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>Nombre</label>
            <input style={inp} placeholder="Tu nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
              {(['예요', '이에요'] as const).map(p => (
                <button key={p} onClick={() => setForm(f => ({ ...f, nameParticle: p }))} style={{ flex: 1, padding: '0.35rem', borderRadius: 7, border: `1.5px solid ${form.nameParticle === p ? '#534AB7' : 'var(--line-soft)'}`, background: form.nameParticle === p ? 'rgba(83,74,183,0.1)' : 'transparent', color: form.nameParticle === p ? '#534AB7' : 'var(--muted)', cursor: 'pointer', fontSize: '0.82rem', font: 'inherit', fontWeight: 600 }}>
                  {p}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Vocal final → 예요 · Consonante final → 이에요</div>
          </div>

          {/* Age */}
          <div>
            <label style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>Edad</label>
            <select style={sel} value={form.ageValue} onChange={e => setForm(f => ({ ...f, ageValue: e.target.value }))}>
              <option value="">Seleccionar edad...</option>
              {AGE_OPTIONS.map(a => <option key={a.value} value={a.value}>{a.value} años — {a.korean}</option>)}
            </select>
          </div>

          {/* Country */}
          <div>
            <label style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>País</label>
            <select style={sel} value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}>
              <option value="">Seleccionar país...</option>
              {COUNTRY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label} — {c.korean}</option>)}
            </select>
          </div>

          {/* City */}
          <div>
            <label style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>Ciudad</label>
            <select style={sel} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}>
              <option value="">Seleccionar ciudad...</option>
              {CITY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label} — {c.korean}</option>)}
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>Ocupación</label>
            <select style={sel} value={form.occupation} onChange={e => setForm(f => ({ ...f, occupation: e.target.value }))}>
              <option value="">Seleccionar ocupación...</option>
              {OCCUPATION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label} — {o.korean}</option>)}
            </select>
          </div>

          {/* Today */}
          <div>
            <label style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>¿Qué haces hoy?</label>
            <select style={sel} value={form.today} onChange={e => setForm(f => ({ ...f, today: e.target.value }))}>
              <option value="">Seleccionar actividad...</option>
              {TODAY_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label} — {t.korean}</option>)}
            </select>
          </div>
        </div>

        {/* Likes */}
        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>Me gusta (selecciona uno o más)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {LIKES_OPTIONS.map(l => {
              const active = form.likes.includes(l.value);
              return (
                <button key={l.value} onClick={() => toggleLike(l.value)} style={{ padding: '0.4rem 0.85rem', borderRadius: 20, border: `1.5px solid ${active ? '#e11d48' : 'var(--line-soft)'}`, background: active ? 'rgba(225,29,72,0.08)' : 'transparent', color: active ? '#e11d48' : 'var(--muted)', fontSize: '0.85rem', cursor: 'pointer', font: 'inherit', fontWeight: active ? 700 : 400, transition: 'all 0.15s' }}>
                  {l.label} <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>{l.korean}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={generate} className="btn btn-primary">Generar mi presentación →</button>
        </div>
      </Card>

      {/* Generated result */}
      {generated && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ border: '1.5px solid rgba(225,29,72,0.25)', background: 'rgba(225,29,72,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e11d48', fontWeight: 700 }}>Tu presentación en coreano</div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => setShowRom(v => !v)} className={`btn btn-ghost btn-sm`} style={{ fontSize: '0.75rem' }}>
                  {showRom ? 'Ocultar' : 'Ver'} romanización
                </button>
                <button onClick={() => speak(lines.join(' '))} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>▶ Escuchar</button>
              </div>
            </div>
            {lines.map((line, i) => (
              <div key={i} style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e11d48', lineHeight: 1.3 }}>{line}</div>
                {showRom && <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{MODEL_ROM[i] || ''}</div>}
              </div>
            ))}
          </Card>
          {teacherMode && (
            <TeacherNote text="Una vez generada, pide al estudiante que lea su presentación en voz alta 2–3 veces. Corrige la pronunciación línea a línea. Luego pasa al Paso 5 para consolidar las estructuras." />
          )}
        </motion.div>
      )}
    </div>
  );
}

// ─── Step 5: Sentence builder ─────────────────────────────────────────────────

function Step5Builder({ teacherMode }: { teacherMode: boolean }) {
  const [actIdx, setActIdx]         = useState(0);
  const [selected, setSelected]     = useState<number[]>([]);
  const [result, setResult]         = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showTeacher, setShowTeacher] = useState(false);
  const [done, setDone]             = useState<boolean[]>(Array(SENTENCE_ACTIVITIES.length).fill(false));

  const activity = SENTENCE_ACTIVITIES[actIdx];
  const selectedChips = selected.map(i => activity.chips[i]);
  const poolIndices   = activity.chips.map((_, i) => i).filter(i => !selected.includes(i));

  const addChip = (idx: number) => {
    if (result !== 'idle') return;
    setSelected(s => [...s, idx]);
  };

  const removeChip = (pos: number) => {
    if (result !== 'idle') return;
    setSelected(s => s.filter((_, i) => i !== pos));
  };

  const checkAnswer = () => {
    const ok = selectedChips.length === activity.correct.length &&
      selectedChips.every((c, i) => c === activity.correct[i]);
    const r = ok ? 'correct' : 'incorrect';
    setResult(r);
    if (ok) {
      setDone(d => { const n = [...d]; n[actIdx] = true; return n; });
    }
    if (teacherMode || !ok) setShowTeacher(true);
  };

  const reset = () => { setSelected([]); setResult('idle'); setShowTeacher(false); };

  const hint = () => {
    const nextCorrect = activity.correct[selected.length];
    if (!nextCorrect) return;
    const idx = activity.chips.findIndex((c, i) => c === nextCorrect && !selected.includes(i));
    if (idx !== -1) addChip(idx);
  };

  const switchActivity = (i: number) => { setActIdx(i); reset(); };

  const chipStyle = (active: boolean, color: string): CSSProperties => ({
    padding: '0.55rem 1rem',
    borderRadius: 20,
    border: `1.5px solid ${active ? color : 'var(--line-soft)'}`,
    background: active ? `${color}15` : 'var(--bg-2)',
    color: active ? color : 'var(--ink)',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    font: 'inherit',
    transition: 'all 0.15s',
    fontFamily: 'var(--mono)',
  });

  return (
    <div>
      {/* Activity selector */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {SENTENCE_ACTIVITIES.map((act, i) => (
          <button key={act.id} onClick={() => switchActivity(i)} style={{ padding: '0.4rem 0.85rem', borderRadius: 8, border: `1.5px solid ${actIdx === i ? '#0891b2' : 'var(--line-soft)'}`, background: actIdx === i ? 'rgba(8,145,178,0.1)' : 'transparent', color: actIdx === i ? '#0891b2' : 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', font: 'inherit', transition: 'all 0.15s', position: 'relative' }}>
            {done[i] && <span style={{ position: 'absolute', top: -5, right: -5, fontSize: '0.6rem', background: '#059669', color: '#fff', borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>}
            {act.label.split(' — ')[0]}
          </button>
        ))}
      </div>

      <Card>
        {/* Activity header */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Patrón</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0891b2', fontFamily: 'var(--mono)' }}>{activity.patternHint}</div>
        </div>

        {/* Answer area */}
        <div style={{ minHeight: 60, border: `2px dashed ${result === 'correct' ? '#059669' : result === 'incorrect' ? '#e11d48' : 'var(--line-soft)'}`, borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', background: result === 'correct' ? 'rgba(5,150,105,0.04)' : result === 'incorrect' ? 'rgba(225,29,72,0.04)' : 'var(--bg-2)', transition: 'all 0.2s' }}>
          {selectedChips.length === 0 ? (
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Toca las palabras de abajo para construir la frase...</span>
          ) : (
            selectedChips.map((chip, pos) => (
              <button key={pos} onClick={() => removeChip(pos)} style={{ ...chipStyle(true, result === 'correct' ? '#059669' : result === 'incorrect' ? '#e11d48' : '#0891b2') }}>
                {chip}
              </button>
            ))
          )}
        </div>

        {/* Pool */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Palabras disponibles</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {poolIndices.map(idx => (
              <button key={idx} onClick={() => addChip(idx)} style={{ ...chipStyle(false, '#0891b2') }}>
                {activity.chips[idx]}
              </button>
            ))}
            {poolIndices.length === 0 && <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Todas las palabras están en uso.</span>}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <button onClick={checkAnswer} className="btn btn-primary btn-sm" disabled={selected.length === 0 || result !== 'idle'}>Verificar</button>
          <button onClick={reset} className="btn btn-ghost btn-sm">Reiniciar</button>
          <button onClick={hint} className="btn btn-ghost btn-sm" disabled={result !== 'idle'}>💡 Pista</button>
        </div>

        {/* Feedback */}
        {result === 'correct' && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: 9, background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.25)', color: '#059669', fontWeight: 600, fontSize: '0.9rem' }}>
            ✓ {activity.successMsg}
          </div>
        )}
        {result === 'incorrect' && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: 9, background: 'rgba(225,29,72,0.07)', border: '1px solid rgba(225,29,72,0.2)', color: '#e11d48', fontSize: '0.88rem' }}>
            <span style={{ fontWeight: 700 }}>Casi.</span> En coreano el orden es: Sujeto + Objeto/Lugar + Verbo. La respuesta correcta: <span style={{ fontFamily: 'var(--mono)', fontWeight: 700 }}>{activity.correct.join(' ')}</span>
          </div>
        )}

        {/* Teacher note */}
        {showTeacher && (teacherMode || result !== 'idle') && (
          <TeacherNote text={activity.teacherNote} />
        )}
      </Card>
    </div>
  );
}

// ─── Step 6: Speaking ladder ──────────────────────────────────────────────────

function Step6Ladder({ teacherMode }: { teacherMode: boolean }) {
  const [level, setLevel]         = useState<1 | 2 | 3 | 4>(1);
  const [revealed, setRevealed]   = useState<Set<string>>(new Set());
  const [showRom, setShowRom]     = useState(true);
  const [showEs, setShowEs]       = useState(true);

  const toggleReveal = (id: string) => setRevealed(r => { const s = new Set(r); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const levelColors = ['#534AB7', '#059669', '#d97706', '#7c3aed'] as const;
  const levelColor = levelColors[level - 1];

  const levelDesc = [
    'Apoyo completo: Hangul + romanización + español.',
    'Solo Hangul y romanización. Cubre el español.',
    'Solo español. Produce el coreano de memoria.',
    'El docente hace preguntas en coreano. Tú respondes.',
  ];

  return (
    <div>
      {/* Level selector */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
        {([1, 2, 3, 4] as const).map(l => (
          <button key={l} onClick={() => setLevel(l)} style={{ padding: '0.55rem 1.1rem', borderRadius: 9, border: `2px solid ${level === l ? levelColors[l - 1] : 'var(--line-soft)'}`, background: level === l ? `${levelColors[l - 1]}15` : 'transparent', color: level === l ? levelColors[l - 1] : 'var(--muted)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', font: 'inherit', transition: 'all 0.15s' }}>
            Nivel {l}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '0.85rem', color: levelColor, fontWeight: 600, marginBottom: '1.25rem' }}>
        {levelDesc[level - 1]}
      </p>

      {/* Display toggle (for levels 1-3) */}
      {level <= 3 && (
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
          {level === 1 && <button onClick={() => setShowRom(v => !v)} className={`btn btn-sm btn-ghost`} style={{ fontSize: '0.78rem' }}>{showRom ? '▼ Romanización' : '▷ Romanización'}</button>}
          {level === 1 && <button onClick={() => setShowEs(v => !v)}  className={`btn btn-sm btn-ghost`} style={{ fontSize: '0.78rem' }}>{showEs ? '▼ Español' : '▷ Español'}</button>}
        </div>
      )}

      {/* Sentences (levels 1-3) */}
      {level <= 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {MODEL_PRESENTATION.map((line, i) => (
            <Card key={line.id} style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: levelColor }} />
              <div style={{ paddingLeft: '0.75rem' }}>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginBottom: '0.25rem' }}>{i + 1}</div>
                {level <= 2 && <div style={{ fontSize: '1.2rem', fontWeight: 700, color: levelColor, lineHeight: 1.3 }}>{line.korean}</div>}
                {level === 1 && showRom && <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{line.romanization}</div>}
                {level === 1 && showEs  && <div style={{ fontSize: '0.88rem', color: 'var(--ink-2)', marginBottom: '0.35rem' }}>{line.spanish}</div>}
                {level === 2 && <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{line.romanization}</div>}
                {level === 3 && (
                  <div>
                    <div style={{ fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>{line.spanish}</div>
                    {revealed.has(line.id) ? (
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: levelColor }}>{line.korean}</div>
                    ) : (
                      <button onClick={() => toggleReveal(line.id)} style={{ padding: '0.3rem 0.75rem', borderRadius: 7, border: `1px solid ${levelColor}40`, background: `${levelColor}10`, color: levelColor, fontSize: '0.78rem', cursor: 'pointer', font: 'inherit', fontWeight: 600 }}>
                        Revelar coreano
                      </button>
                    )}
                  </div>
                )}
                <div style={{ marginTop: '0.4rem' }}>
                  <button onClick={() => speak(line.korean, level >= 2)} style={{ background: `${levelColor}15`, border: 'none', borderRadius: 6, padding: '0.25rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem', color: levelColor, fontFamily: 'var(--mono)' }}>
                    ▶ Escuchar
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Teacher questions (level 4) */}
      {level === 4 && (
        <div>
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
            <button onClick={() => setShowRom(v => !v)} className={`btn btn-ghost btn-sm`} style={{ fontSize: '0.78rem' }}>{showRom ? '▼ Romanización' : '▷ Romanización'}</button>
            <button onClick={() => setShowEs(v => !v)}  className={`btn btn-ghost btn-sm`} style={{ fontSize: '0.78rem' }}>{showEs ? '▼ Español' : '▷ Español'}</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {TEACHER_QUESTIONS.map((q, i) => (
              <Card key={q.id} style={{ border: `1.5px solid rgba(124,58,237,0.2)`, background: 'rgba(124,58,237,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Docente — Pregunta {i + 1}</div>
                  <button onClick={() => speak(q.question)} style={{ background: 'rgba(124,58,237,0.1)', border: 'none', borderRadius: 6, padding: '0.3rem 0.65rem', cursor: 'pointer', fontSize: '0.78rem', color: '#7c3aed' }}>▶</button>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7c3aed', marginBottom: '0.2rem' }}>{q.question}</div>
                {showRom && <div style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginBottom: '0.15rem' }}>{q.romanization}</div>}
                {showEs  && <div style={{ fontSize: '0.9rem', color: 'var(--ink-2)', marginBottom: '0.75rem' }}>{q.spanish}</div>}
                {(teacherMode || revealed.has(q.id)) ? (
                  <div style={{ borderTop: '1px solid rgba(124,58,237,0.15)', paddingTop: '0.6rem' }}>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Respuesta esperada</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#059669', fontFamily: 'var(--mono)' }}>{q.answerPattern}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{q.answerPatternEs}</div>
                  </div>
                ) : (
                  <button onClick={() => toggleReveal(q.id)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem' }}>
                    Mostrar respuesta esperada
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {teacherMode && level <= 3 && (
        <TeacherNote text={`Nivel ${level}: ${['Trabaja cada frase en voz alta. Corrige la pronunciación después de cada línea.', 'Pide al estudiante que lea sin traducción. Si se equivoca, muestra la romanización.', 'Muestra el español y espera que el estudiante produzca el coreano de memoria.'][level - 1]}`} />
      )}
      {teacherMode && level === 4 && (
        <TeacherNote text="Haz las preguntas en coreano. Si el estudiante no responde en 5 segundos, da la primera palabra de la respuesta como pista. El objetivo es producción espontánea, no perfección gramatical." />
      )}
    </div>
  );
}

// ─── Step 7: Final task ───────────────────────────────────────────────────────

function Step7Final({ presentation, teacherMode }: { presentation: string[]; teacherMode: boolean }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [copied, setCopied]   = useState(false);

  const displayLines = presentation.length > 0 ? presentation : [
    '안녕하세요. 저는 ___예요.',
    '저는 ___ 살이에요.',
    '저는 ___ 사람이에요.',
    '저는 ___에 살아요.',
    '저는 ___이에요/예요.',
    '저는 한국어를 공부해요.',
    '저는 ___을/를 좋아해요.',
    '오늘 저는 ___해요.',
    '감사합니다.',
  ];

  const toggleCheck = (id: string) => setChecked(c => { const s = new Set(c); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const copyText = () => {
    navigator.clipboard.writeText(displayLines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      {/* Hero */}
      <Card style={{ textAlign: 'center', padding: '2rem', background: 'linear-gradient(135deg, rgba(200,32,46,0.06) 0%, rgba(83,74,183,0.05) 100%)', border: '1.5px solid rgba(200,32,46,0.2)', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎤</div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Presentación oral final</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: 460, margin: '0 auto' }}>
          Ahora preséntate en coreano de corrido. Usa la lista de verificación para asegurarte de incluir todos los elementos.
        </p>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {/* Presentation text */}
        <Card style={{ border: '1.5px solid rgba(200,32,46,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: '#c8202e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {presentation.length > 0 ? 'Tu presentación' : 'Plantilla'}
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button onClick={() => speak(displayLines.join(' '))} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>▶ Escuchar</button>
              <button onClick={copyText} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>
                {copied ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
          </div>
          {displayLines.map((line, i) => (
            <div key={i} style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 700, color: '#c8202e', lineHeight: 1.35 }}>
              {line}
            </div>
          ))}
          {presentation.length === 0 && (
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.75rem', fontStyle: 'italic' }}>
              Completa el Paso 4 para generar tu presentación personalizada.
            </p>
          )}
        </Card>

        {/* Checklist */}
        <div>
          <Card>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              Lista de verificación — {checked.size} / {FINAL_CHECKLIST.length}
            </div>
            {FINAL_CHECKLIST.map(item => (
              <button key={item.id} onClick={() => toggleCheck(item.id)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 0', background: 'none', border: 'none', borderBottom: '1px solid var(--line-soft)', cursor: 'pointer', font: 'inherit', color: checked.has(item.id) ? 'var(--muted)' : 'var(--ink)', transition: 'all 0.15s' }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked.has(item.id) ? '#059669' : 'var(--line-soft)'}`, background: checked.has(item.id) ? '#059669' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s', fontSize: '0.7rem', color: '#fff' }}>
                  {checked.has(item.id) ? '✓' : ''}
                </span>
                <span style={{ fontSize: '0.85rem', textDecoration: checked.has(item.id) ? 'line-through' : 'none' }}>{item.label}</span>
              </button>
            ))}
            {checked.size === FINAL_CHECKLIST.length && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: 9, background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.25)', textAlign: 'center', color: '#059669', fontWeight: 700 }}>
                🎉 ¡Presentación completa!
              </div>
            )}
          </Card>

          {/* Recording placeholder */}
          <Card style={{ marginTop: '0.85rem', background: 'rgba(83,74,183,0.04)', border: '1px dashed rgba(83,74,183,0.3)' }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: '#534AB7', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.4rem' }}>🎙 Grabación</div>
            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55 }}>
              Grábate con WhatsApp o notas de voz y envía el audio a tu profesor/a para retroalimentación.
            </p>
          </Card>
        </div>
      </div>

      {teacherMode && (
        <TeacherNote text="Pide al estudiante que se presente sin leer. Usa el Nivel 4 de la Escala de habla (Paso 6) como retroalimentación inmediata. Si queda tiempo, pide que repita la presentación cambiando un elemento (p. ej., ciudad diferente)." />
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function KoreanIntroSpeaking1() {
  const [activeStep, setActiveStep]       = useState(0);
  const [teacherMode, setTeacherMode]     = useState(false);
  const [presentation, setPresentation]   = useState<string[]>([]);

  const step = STEPS[activeStep];

  const prev = () => setActiveStep(s => Math.max(0, s - 1));
  const next = () => setActiveStep(s => Math.min(STEPS.length - 1, s + 1));

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 1rem 6rem' }}>
      {/* Top nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', paddingTop: '1.5rem' }}>
        <Link href="/practica" style={{ fontSize: '0.82rem', color: 'var(--muted)', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
          ← Práctica
        </Link>
        <span style={{ color: 'var(--line-soft)' }}>·</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Coreano Introductorio 1</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>
          <span className="ink-line" />🇰🇷 Coreano Introductorio 1
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            Mi primera presentación oral
          </h1>
          <button
            onClick={() => setTeacherMode(v => !v)}
            style={{ padding: '0.45rem 1rem', borderRadius: 8, border: `1.5px solid ${teacherMode ? '#d97706' : 'var(--line-soft)'}`, background: teacherMode ? 'rgba(217,119,6,0.1)' : 'transparent', color: teacherMode ? '#d97706' : 'var(--muted)', fontSize: '0.78rem', cursor: 'pointer', font: 'inherit', fontWeight: 700, fontFamily: 'var(--mono)', transition: 'all 0.15s' }}
          >
            {teacherMode ? '✓ MODO DOCENTE' : 'Modo docente'}
          </button>
        </div>
      </div>

      {/* Step stepper */}
      <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {STEPS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveStep(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.5rem 0.85rem', borderRadius: 9, flexShrink: 0,
              border: `1.5px solid ${activeStep === s.id ? s.color : 'var(--line-soft)'}`,
              background: activeStep === s.id ? `${s.color}15` : 'transparent',
              color: activeStep === s.id ? s.color : 'var(--muted)',
              fontSize: '0.8rem', fontWeight: activeStep === s.id ? 700 : 400,
              cursor: 'pointer', font: 'inherit', transition: 'all 0.15s',
            }}
          >
            <span>{s.icon}</span>
            <span style={{ whiteSpace: 'nowrap' }}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Step content */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20,33,92,0.03) 0%, transparent 100%)',
        border: `1.5px solid ${step.color}30`,
        borderRadius: 20,
        padding: '1.5rem',
        marginBottom: '1.5rem',
      }}>
        {/* Step header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--line-soft)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `${step.color}20`, border: `1.5px solid ${step.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
            {step.icon}
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', color: step.color, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 }}>Paso {activeStep + 1} de {STEPS.length}</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>{step.label}</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeStep} {...fade} transition={{ duration: 0.25 }}>
            {activeStep === 0 && <Step1Survival teacherMode={teacherMode} />}
            {activeStep === 1 && <Step2Model    teacherMode={teacherMode} />}
            {activeStep === 2 && <Step3Vocabulary teacherMode={teacherMode} />}
            {activeStep === 3 && <Step4Personalize teacherMode={teacherMode} onGenerate={setPresentation} />}
            {activeStep === 4 && <Step5Builder   teacherMode={teacherMode} />}
            {activeStep === 5 && <Step6Ladder    teacherMode={teacherMode} />}
            {activeStep === 6 && <Step7Final     presentation={presentation} teacherMode={teacherMode} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={prev} className="btn btn-ghost btn-sm" disabled={activeStep === 0}>
          ← Anterior
        </button>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {STEPS.map(s => (
            <button key={s.id} onClick={() => setActiveStep(s.id)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', background: activeStep === s.id ? s.color : 'var(--line-soft)', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
          ))}
        </div>
        <button onClick={next} className={activeStep < STEPS.length - 1 ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'} disabled={activeStep === STEPS.length - 1}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
