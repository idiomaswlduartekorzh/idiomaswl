'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface VocabWord { word: string; es: string; emoji: string; example: string; exampleEs: string; pronunciation: string; }
interface VocabSet { id: string; name: string; nameEs: string; emoji: string; words: VocabWord[]; }

const SETS: VocabSet[] = [
  {
    id: 'family', name: 'Family', nameEs: 'La familia', emoji: '👨‍👩‍👧‍👦',
    words: [
      { word: 'mother', es: 'madre', emoji: '👩', example: 'My mother is a teacher.', exampleEs: 'Mi mamá es maestra.', pronunciation: '[MUH-ther]' },
      { word: 'father', es: 'padre', emoji: '👨', example: 'My father works in an office.', exampleEs: 'Mi papá trabaja en una oficina.', pronunciation: '[FAH-ther]' },
      { word: 'brother', es: 'hermano', emoji: '👦', example: 'I have one brother.', exampleEs: 'Tengo un hermano.', pronunciation: '[BRUH-ther]' },
      { word: 'sister', es: 'hermana', emoji: '👧', example: 'My sister loves music.', exampleEs: 'Mi hermana ama la música.', pronunciation: '[SIS-ter]' },
      { word: 'grandmother', es: 'abuela', emoji: '👵', example: 'My grandmother is 70 years old.', exampleEs: 'Mi abuela tiene 70 años.', pronunciation: '[GRAND-muh-ther]' },
      { word: 'grandfather', es: 'abuelo', emoji: '👴', example: 'My grandfather tells great stories.', exampleEs: 'Mi abuelo cuenta historias geniales.', pronunciation: '[GRAND-fah-ther]' },
      { word: 'son', es: 'hijo', emoji: '🧒', example: 'She has one son.', exampleEs: 'Ella tiene un hijo.', pronunciation: '[sun]' },
      { word: 'daughter', es: 'hija', emoji: '👶', example: 'Their daughter is five years old.', exampleEs: 'Su hija tiene cinco años.', pronunciation: '[DAW-ter]' },
      { word: 'husband', es: 'esposo', emoji: '💑', example: 'Her husband is a doctor.', exampleEs: 'Su esposo es médico.', pronunciation: '[HUZ-band]' },
      { word: 'wife', es: 'esposa', emoji: '💍', example: 'His wife is very kind.', exampleEs: 'Su esposa es muy amable.', pronunciation: '[wyf]' },
    ],
  },
  {
    id: 'colors', name: 'Colors', nameEs: 'Los colores', emoji: '🎨',
    words: [
      { word: 'red', es: 'rojo', emoji: '🔴', example: 'The apple is red.', exampleEs: 'La manzana es roja.', pronunciation: '[red]' },
      { word: 'blue', es: 'azul', emoji: '🔵', example: 'The sky is blue.', exampleEs: 'El cielo es azul.', pronunciation: '[bloo]' },
      { word: 'green', es: 'verde', emoji: '🟢', example: 'The grass is green.', exampleEs: 'El pasto es verde.', pronunciation: '[green]' },
      { word: 'yellow', es: 'amarillo', emoji: '🟡', example: 'The sun is yellow.', exampleEs: 'El sol es amarillo.', pronunciation: '[YEL-oh]' },
      { word: 'white', es: 'blanco', emoji: '⬜', example: 'My shirt is white.', exampleEs: 'Mi camisa es blanca.', pronunciation: '[wyt]' },
      { word: 'black', es: 'negro', emoji: '⬛', example: 'The cat is black.', exampleEs: 'El gato es negro.', pronunciation: '[blak]' },
      { word: 'brown', es: 'café/marrón', emoji: '🟫', example: 'His hair is brown.', exampleEs: 'Su cabello es café.', pronunciation: '[brown]' },
      { word: 'orange', es: 'naranja', emoji: '🟠', example: 'An orange is orange.', exampleEs: 'Una naranja es naranja.', pronunciation: '[OR-inj]' },
      { word: 'pink', es: 'rosado', emoji: '🩷', example: 'She loves pink flowers.', exampleEs: 'A ella le encantan las flores rosadas.', pronunciation: '[pink]' },
      { word: 'purple', es: 'morado', emoji: '🟣', example: 'The grapes are purple.', exampleEs: 'Las uvas son moradas.', pronunciation: '[PUR-pul]' },
    ],
  },
  {
    id: 'food', name: 'Food', nameEs: 'La comida', emoji: '🍽️',
    words: [
      { word: 'apple', es: 'manzana', emoji: '🍎', example: 'I eat an apple every day.', exampleEs: 'Como una manzana todos los días.', pronunciation: '[AP-ul]' },
      { word: 'bread', es: 'pan', emoji: '🍞', example: 'I eat bread for breakfast.', exampleEs: 'Como pan en el desayuno.', pronunciation: '[bred]' },
      { word: 'rice', es: 'arroz', emoji: '🍚', example: 'We have rice for lunch.', exampleEs: 'Comemos arroz en el almuerzo.', pronunciation: '[rys]' },
      { word: 'chicken', es: 'pollo', emoji: '🍗', example: 'She cooks chicken on Sundays.', exampleEs: 'Ella cocina pollo los domingos.', pronunciation: '[CHIK-en]' },
      { word: 'egg', es: 'huevo', emoji: '🥚', example: 'I have two eggs for breakfast.', exampleEs: 'Tengo dos huevos en el desayuno.', pronunciation: '[eg]' },
      { word: 'milk', es: 'leche', emoji: '🥛', example: 'Children drink milk every day.', exampleEs: 'Los niños toman leche todos los días.', pronunciation: '[milk]' },
      { word: 'water', es: 'agua', emoji: '💧', example: 'Drink more water!', exampleEs: '¡Toma más agua!', pronunciation: '[WAW-ter]' },
      { word: 'coffee', es: 'café', emoji: '☕', example: 'I drink coffee in the morning.', exampleEs: 'Tomo café en la mañana.', pronunciation: '[KAW-fee]' },
      { word: 'banana', es: 'banano', emoji: '🍌', example: 'I like bananas.', exampleEs: 'Me gustan los bananos.', pronunciation: '[bah-NA-nah]' },
      { word: 'tomato', es: 'tomate', emoji: '🍅', example: 'This salad has tomatoes.', exampleEs: 'Esta ensalada tiene tomates.', pronunciation: '[tuh-MAY-toh]' },
    ],
  },
  {
    id: 'days', name: 'Days & Time', nameEs: 'Días y tiempo', emoji: '📅',
    words: [
      { word: 'Monday', es: 'lunes', emoji: '1️⃣', example: 'School starts on Monday.', exampleEs: 'La escuela empieza el lunes.', pronunciation: '[MUN-day]' },
      { word: 'Tuesday', es: 'martes', emoji: '2️⃣', example: 'I have class on Tuesday.', exampleEs: 'Tengo clase el martes.', pronunciation: '[TYOOZ-day]' },
      { word: 'Wednesday', es: 'miércoles', emoji: '3️⃣', example: 'We meet on Wednesday.', exampleEs: 'Nos reunimos el miércoles.', pronunciation: '[WENZ-day]' },
      { word: 'Thursday', es: 'jueves', emoji: '4️⃣', example: 'The meeting is on Thursday.', exampleEs: 'La reunión es el jueves.', pronunciation: '[THURZ-day]' },
      { word: 'Friday', es: 'viernes', emoji: '5️⃣', example: 'I love Fridays!', exampleEs: '¡Me encantan los viernes!', pronunciation: '[FRY-day]' },
      { word: 'Saturday', es: 'sábado', emoji: '6️⃣', example: 'On Saturdays I sleep late.', exampleEs: 'Los sábados duermo hasta tarde.', pronunciation: '[SAT-er-day]' },
      { word: 'Sunday', es: 'domingo', emoji: '7️⃣', example: 'Sunday is a rest day.', exampleEs: 'El domingo es un día de descanso.', pronunciation: '[SUN-day]' },
      { word: 'morning', es: 'mañana (del día)', emoji: '🌅', example: 'I run in the morning.', exampleEs: 'Corro en la mañana.', pronunciation: '[MOR-ning]' },
      { word: 'afternoon', es: 'tarde', emoji: '🌤️', example: 'We have class in the afternoon.', exampleEs: 'Tenemos clase en la tarde.', pronunciation: '[af-ter-NOON]' },
      { word: 'night', es: 'noche', emoji: '🌙', example: 'I study at night.', exampleEs: 'Estudio de noche.', pronunciation: '[nyt]' },
    ],
  },
  {
    id: 'body', name: 'Body Parts', nameEs: 'El cuerpo', emoji: '🧍',
    words: [
      { word: 'head', es: 'cabeza', emoji: '🗣️', example: 'My head hurts.', exampleEs: 'Me duele la cabeza.', pronunciation: '[hed]' },
      { word: 'eye', es: 'ojo', emoji: '👁️', example: 'Her eyes are brown.', exampleEs: 'Sus ojos son cafés.', pronunciation: '[eye]' },
      { word: 'ear', es: 'oreja/oído', emoji: '👂', example: 'He has big ears.', exampleEs: 'Él tiene orejas grandes.', pronunciation: '[eer]' },
      { word: 'nose', es: 'nariz', emoji: '👃', example: 'My nose is cold.', exampleEs: 'Mi nariz está fría.', pronunciation: '[nohz]' },
      { word: 'mouth', es: 'boca', emoji: '👄', example: 'Open your mouth.', exampleEs: 'Abre la boca.', pronunciation: '[mowth]' },
      { word: 'hand', es: 'mano', emoji: '✋', example: 'Wash your hands!', exampleEs: '¡Lávate las manos!', pronunciation: '[hand]' },
      { word: 'arm', es: 'brazo', emoji: '💪', example: 'His arm is strong.', exampleEs: 'Su brazo es fuerte.', pronunciation: '[arm]' },
      { word: 'leg', es: 'pierna', emoji: '🦵', example: 'My leg is tired.', exampleEs: 'Mi pierna está cansada.', pronunciation: '[leg]' },
      { word: 'foot', es: 'pie', emoji: '🦶', example: 'My feet hurt after walking.', exampleEs: 'Me duelen los pies después de caminar.', pronunciation: '[foot]' },
      { word: 'back', es: 'espalda', emoji: '🔙', example: 'My back hurts from sitting.', exampleEs: 'Me duele la espalda de estar sentado.', pronunciation: '[bak]' },
    ],
  },
  {
    id: 'numbers', name: 'Numbers & Quantities', nameEs: 'Números y cantidades', emoji: '🔢',
    words: [
      { word: 'one', es: 'uno', emoji: '1️⃣', example: 'I have one sister.', exampleEs: 'Tengo una hermana.', pronunciation: '[wun]' },
      { word: 'two', es: 'dos', emoji: '2️⃣', example: 'There are two cats.', exampleEs: 'Hay dos gatos.', pronunciation: '[too]' },
      { word: 'five', es: 'cinco', emoji: '5️⃣', example: 'She is five years old.', exampleEs: 'Ella tiene cinco años.', pronunciation: '[fyv]' },
      { word: 'ten', es: 'diez', emoji: '🔟', example: 'There are ten students.', exampleEs: 'Hay diez estudiantes.', pronunciation: '[ten]' },
      { word: 'twenty', es: 'veinte', emoji: '2️⃣0️⃣', example: 'I am twenty years old.', exampleEs: 'Tengo veinte años.', pronunciation: '[TWEN-tee]' },
      { word: 'hundred', es: 'cien', emoji: '💯', example: 'There are a hundred pages.', exampleEs: 'Hay cien páginas.', pronunciation: '[HUN-dred]' },
      { word: 'first', es: 'primero', emoji: '🥇', example: 'I am the first in class.', exampleEs: 'Soy el primero en clase.', pronunciation: '[furst]' },
      { word: 'last', es: 'último', emoji: '🏁', example: 'This is the last question.', exampleEs: 'Esta es la última pregunta.', pronunciation: '[last]' },
      { word: 'many', es: 'muchos/as', emoji: '➕', example: 'There are many students.', exampleEs: 'Hay muchos estudiantes.', pronunciation: '[MEN-ee]' },
      { word: 'few', es: 'pocos/as', emoji: '➖', example: 'I have a few friends here.', exampleEs: 'Tengo pocos amigos aquí.', pronunciation: '[fyoo]' },
    ],
  },
];

// ─── Flashcard component ──────────────────────────────────────────────────────

function Flashcard({ word, onNext, onPrev, idx, total }: {
  word: VocabWord; onNext: () => void; onPrev: () => void; idx: number; total: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1} / {total}</div>

      {/* Card */}
      <button onClick={() => setFlipped(f => !f)} style={{
        width: '100%', maxWidth: 420, minHeight: 220,
        border: `2px solid ${COLOR}33`, borderRadius: 20,
        background: flipped ? `${COLOR}0d` : 'var(--bg)',
        cursor: 'pointer', fontFamily: 'inherit', color: 'inherit',
        padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
        transition: 'all 0.25s', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        {!flipped ? (
          <>
            <span style={{ fontSize: '3.5rem' }}>{word.emoji}</span>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ink)' }}>{word.word}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontStyle: 'italic' }}>{word.pronunciation}</span>
            <span style={{ fontSize: '0.72rem', color: COLOR, fontFamily: 'var(--mono)', marginTop: '0.25rem' }}>toca para ver la traducción</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: COLOR }}>{word.es}</span>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>
              &ldquo;{word.example}&rdquo;
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center' }}>{word.exampleEs}</p>
          </>
        )}
      </button>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={() => { onPrev(); setFlipped(false); }} className="btn btn-ghost btn-sm">← Anterior</button>
        <button onClick={() => { onNext(); setFlipped(false); }} className="btn btn-sm" style={{ background: COLOR, borderColor: COLOR }}>Siguiente →</button>
      </div>
    </div>
  );
}

// ─── MCQ practice mode ────────────────────────────────────────────────────────

function MCQPractice({ words, onDone }: { words: VocabWord[]; onDone: (score: number) => void }) {
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const shuffled = useCallback(() => {
    const qs = words.map((w, idx) => {
      const wrong = words.filter((_, i) => i !== idx);
      const opts3 = wrong.sort(() => Math.random() - 0.5).slice(0, 3).map(x => x.es);
      const correctPos = Math.floor(Math.random() * 4);
      const opts = [...opts3.slice(0, correctPos), w.es, ...opts3.slice(correctPos)];
      return { word: w, opts, correctPos };
    });
    return qs;
  }, [words]);

  const [questions] = useState(shuffled);

  const current = questions[qi];
  const ans = answers[qi];
  const done = ans !== undefined;
  const allDone = Object.keys(answers).length === words.length;

  function pick(oi: number) {
    if (done) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  if (allDone && qi === words.length - 1 && done) {
    const score = questions.filter((q, i) => answers[i] === q.correctPos).length;
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score === words.length ? '🏆' : score >= words.length * 0.7 ? '⭐' : '📚'}</div>
        <h3 style={{ margin: '0 0 0.35rem' }}>{score}/{words.length} correctas</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
          {score === words.length ? '¡Vocabulario dominado!' : 'Repasa las tarjetas y vuelve a intentarlo.'}
        </p>
        <button className="btn btn-sm" onClick={() => onDone(score)} style={{ background: COLOR, borderColor: COLOR }}>
          Terminar práctica
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 3 }}>
          <div style={{ height: '100%', width: `${((qi + 1) / words.length) * 100}%`, background: COLOR, borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{qi + 1}/{words.length}</span>
      </div>

      <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>{current.word.emoji}</span>
        <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--ink)', margin: '0 0 0.3rem' }}>{current.word.word}</p>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontStyle: 'italic', margin: '0 0 1.25rem' }}>{current.word.pronunciation}</p>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: '0 0 1.25rem' }}>¿Cuál es la traducción al español?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {current.opts.map((opt, oi) => {
            const isCorrect = oi === current.correctPos; const isSelected = ans === oi;
            let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
            if (done && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
            if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
            return (
              <button key={oi} onClick={() => pick(oi)} disabled={done}
                style={{ padding: '0.65rem 0.75rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', fontWeight: 600, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                {opt}
                {done && isCorrect && ' ✓'}
                {done && isSelected && !isCorrect && ' ✗'}
              </button>
            );
          })}
        </div>
        {done && (
          <button className="btn btn-sm" style={{ marginTop: '1rem', background: COLOR, borderColor: COLOR }}
            onClick={() => setQi(q => Math.min(q + 1, words.length - 1))}>
            {qi < words.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Fill in the blank mode ───────────────────────────────────────────────────

function FillBlank({ words, onDone }: { words: VocabWord[]; onDone: (score: number) => void }) {
  const [qi, setQi] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const current = words[qi];
  const isCorrect = checked && input.trim().toLowerCase() === current.word.toLowerCase();

  function check() { if (!input.trim()) return; setChecked(true); if (input.trim().toLowerCase() === current.word.toLowerCase()) setScore(s => s + 1); }

  function next() {
    if (qi < words.length - 1) { setQi(q => q + 1); setInput(''); setChecked(false); }
    else onDone(score + (isCorrect ? 0 : 0));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 3 }}>
          <div style={{ height: '100%', width: `${((qi + 1) / words.length) * 100}%`, background: COLOR, borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{qi + 1}/{words.length}</span>
      </div>

      <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.75rem' }}>{current.emoji}</span>
        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--muted)', margin: '0 0 1.25rem' }}>
          {current.es} <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)' }}>→ ¿cómo se dice en inglés?</span>
        </p>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !checked) check(); else if (e.key === 'Enter' && checked) next(); }}
          disabled={checked} placeholder="Escribe en inglés..."
          style={{ width: '100%', maxWidth: 280, padding: '0.75rem 1rem', borderRadius: 10, fontSize: '1.1rem', textAlign: 'center', border: checked ? `2px solid ${isCorrect ? '#059669' : '#dc2626'}` : '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'inherit', fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} />
        {checked && (
          <div style={{ marginTop: '0.85rem', padding: '0.6rem 1rem', borderRadius: 8, background: isCorrect ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)', display: 'inline-block' }}>
            {isCorrect ? `✅ ¡Correcto! "${current.word}"` : `✗ La respuesta es "${current.word}"`}
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', marginTop: '1.1rem' }}>
          {!checked ? (
            <button className="btn btn-sm" onClick={check} style={{ background: COLOR, borderColor: COLOR }}>Verificar</button>
          ) : (
            <button className="btn btn-sm" onClick={next} style={{ background: COLOR, borderColor: COLOR }}>
              {qi < words.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VocabularioInglesA1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<'flash' | 'mcq' | 'fill' | null>(null);
  const [flashIdx, setFlashIdx] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const currentSet = SETS.find(s => s.id === setId);

  function startMode(m: 'flash' | 'mcq' | 'fill') { setMode(m); setFlashIdx(0); setResult(null); }

  function backToSets() { setSetId(null); setMode(null); setResult(null); }

  if (setId && currentSet) {
    if (result !== null) {
      return (
        <section className="wl-section">
          <div className="wrap" style={{ maxWidth: 640 }}>
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{result >= currentSet.words.length * 0.8 ? '🏆' : '⭐'}</div>
              <h2 style={{ margin: '0 0 0.35rem' }}>{result}/{currentSet.words.length} correctas</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
                {result >= currentSet.words.length * 0.8 ? '¡Dominas este set! Prueba otro modo.' : 'Repasa las tarjetas y vuelve a intentarlo.'}
              </p>
              <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-sm" onClick={() => startMode(mode!)} style={{ background: COLOR, borderColor: COLOR }}>Reintentar</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setMode(null)}>Elegir otro modo</button>
                <button className="btn btn-ghost btn-sm" onClick={backToSets}>← Todos los sets</button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inglés A1</Link>
            <span>/</span>
            <button onClick={backToSets} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>📚 Vocabulario</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>{currentSet.emoji} {currentSet.nameEs}</span>
          </div>

          {!mode ? (
            <>
              <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.6rem' }}>{currentSet.emoji} {currentSet.name}</h2>
              <p style={{ color: 'var(--muted)', margin: '0 0 1.75rem' }}>{currentSet.words.length} palabras · Elige un modo de práctica</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {[
                  { id: 'flash' as const, emoji: '🃏', name: 'Flashcards', desc: 'Ve la palabra, toca para ver la traducción y el ejemplo.' },
                  { id: 'mcq' as const, emoji: '🎯', name: 'Opción múltiple', desc: 'Ve la palabra y elige la traducción correcta entre 4 opciones.' },
                  { id: 'fill' as const, emoji: '✏️', name: 'Escribir', desc: 'Ve la traducción en español y escribe la palabra en inglés.' },
                ].map(m => (
                  <button key={m.id} onClick={() => startMode(m.id)} style={{ textAlign: 'left', padding: '1.25rem', borderRadius: 14, border: `1.5px solid ${COLOR}33`, background: `${COLOR}08`, cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', transition: 'all 0.15s' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{m.emoji}</div>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.25rem' }}>{m.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{m.desc}</div>
                  </button>
                ))}
              </div>
              {/* Word preview */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {currentSet.words.map(w => (
                  <div key={w.word} style={{ padding: '0.35rem 0.75rem', borderRadius: 8, border: `1px solid ${COLOR}22`, background: `${COLOR}06`, fontSize: '0.85rem' }}>
                    {w.emoji} {w.word}
                  </div>
                ))}
              </div>
            </>
          ) : mode === 'flash' ? (
            <Flashcard word={currentSet.words[flashIdx]} idx={flashIdx} total={currentSet.words.length}
              onNext={() => setFlashIdx(i => Math.min(i + 1, currentSet.words.length - 1))}
              onPrev={() => setFlashIdx(i => Math.max(i - 1, 0))} />
          ) : mode === 'mcq' ? (
            <MCQPractice words={currentSet.words} onDone={(s) => setResult(s)} />
          ) : (
            <FillBlank words={currentSet.words} onDone={(s) => setResult(s)} />
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabulario</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabulary · Inglés A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>
          6 sets temáticos · 60 palabras esenciales · Flashcards, opción múltiple y escritura.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.3rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06`, transition: 'all 0.18s', height: '100%', boxSizing: 'border-box' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}20`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.6rem' }}>{s.emoji}</span>
                <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.2rem' }}>{s.nameEs}</div>
                <div style={{ fontSize: '0.78rem', color: COLOR, fontFamily: 'var(--mono)', marginBottom: '0.5rem' }}>{s.name} · {s.words.length} palabras</div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {s.words.slice(0, 4).map(w => (
                    <span key={w.word} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: 5, background: `${COLOR}10`, color: COLOR, fontFamily: 'var(--mono)' }}>{w.word}</span>
                  ))}
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>+{s.words.length - 4}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
