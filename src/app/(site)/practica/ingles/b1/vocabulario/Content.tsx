'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface VocabWord { id: number; en: string; phonetic: string; es: string; }
interface VocabSet { id: string; name: string; nameEs: string; emoji: string; words: VocabWord[]; }

const SETS: VocabSet[] = [
  {
    id: 'work', name: 'Work & Career', nameEs: 'Trabajo y carrera', emoji: '💼',
    words: [
      { id: 1, en: 'negotiate', phonetic: '[ni-GOH-shee-ayt]', es: 'negociar' },
      { id: 2, en: 'deadline', phonetic: '[DED-lain]', es: 'fecha límite' },
      { id: 3, en: 'colleague', phonetic: '[KOL-eeg]', es: 'colega / compañero de trabajo' },
      { id: 4, en: 'promotion', phonetic: '[pruh-MOH-shun]', es: 'ascenso / promoción' },
      { id: 5, en: 'resignation', phonetic: '[rez-ig-NAY-shun]', es: 'renuncia / dimisión' },
      { id: 6, en: 'contract', phonetic: '[KON-trækt]', es: 'contrato' },
      { id: 7, en: 'recruit', phonetic: '[ri-KROOT]', es: 'reclutar / contratar' },
      { id: 8, en: 'salary', phonetic: '[SAL-uh-ree]', es: 'salario' },
      { id: 9, en: 'performance', phonetic: '[per-FOR-muns]', es: 'desempeño / rendimiento' },
      { id: 10, en: 'department', phonetic: '[di-PART-munt]', es: 'departamento' },
    ],
  },
  {
    id: 'technology', name: 'Technology', nameEs: 'Tecnología', emoji: '💻',
    words: [
      { id: 1, en: 'software', phonetic: '[SOFT-wer]', es: 'software / programa informático' },
      { id: 2, en: 'database', phonetic: '[DAY-tuh-bays]', es: 'base de datos' },
      { id: 3, en: 'download', phonetic: '[DOWN-lohd]', es: 'descargar' },
      { id: 4, en: 'encrypt', phonetic: '[en-KRIPT]', es: 'cifrar / encriptar' },
      { id: 5, en: 'interface', phonetic: '[IN-ter-fays]', es: 'interfaz' },
      { id: 6, en: 'malware', phonetic: '[MÆL-wer]', es: 'software malicioso' },
      { id: 7, en: 'algorithm', phonetic: '[AL-guh-rith-um]', es: 'algoritmo' },
      { id: 8, en: 'bandwidth', phonetic: '[BÆND-width]', es: 'ancho de banda' },
      { id: 9, en: 'firmware', phonetic: '[FERM-wer]', es: 'firmware / microprograma' },
      { id: 10, en: 'wireless', phonetic: '[WY-er-les]', es: 'inalámbrico / sin cables' },
    ],
  },
  {
    id: 'health', name: 'Health & Medicine', nameEs: 'Salud y medicina', emoji: '🏥',
    words: [
      { id: 1, en: 'diagnosis', phonetic: '[dy-ug-NOH-sis]', es: 'diagnóstico' },
      { id: 2, en: 'symptom', phonetic: '[SIM-tum]', es: 'síntoma' },
      { id: 3, en: 'prescription', phonetic: '[pri-SKRIP-shun]', es: 'receta médica' },
      { id: 4, en: 'surgery', phonetic: '[SUR-juh-ree]', es: 'cirugía / operación' },
      { id: 5, en: 'chronic', phonetic: '[KRON-ik]', es: 'crónico' },
      { id: 6, en: 'allergic', phonetic: '[uh-LER-jik]', es: 'alérgico' },
      { id: 7, en: 'vaccination', phonetic: '[væk-si-NAY-shun]', es: 'vacunación' },
      { id: 8, en: 'therapy', phonetic: '[THEHR-uh-pee]', es: 'terapia' },
      { id: 9, en: 'immunity', phonetic: '[i-MYOO-ni-tee]', es: 'inmunidad' },
      { id: 10, en: 'recovery', phonetic: '[ri-KUV-uh-ree]', es: 'recuperación' },
    ],
  },
  {
    id: 'environment', name: 'Environment', nameEs: 'Medio ambiente', emoji: '🌿',
    words: [
      { id: 1, en: 'pollution', phonetic: '[puh-LOO-shun]', es: 'contaminación' },
      { id: 2, en: 'renewable', phonetic: '[ri-NOO-uh-bul]', es: 'renovable' },
      { id: 3, en: 'deforestation', phonetic: '[dee-for-es-TAY-shun]', es: 'deforestación' },
      { id: 4, en: 'emission', phonetic: '[i-MISH-un]', es: 'emisión' },
      { id: 5, en: 'biodiversity', phonetic: '[by-oh-di-VER-si-tee]', es: 'biodiversidad' },
      { id: 6, en: 'sustainable', phonetic: '[suh-STAY-nuh-bul]', es: 'sostenible' },
      { id: 7, en: 'habitat', phonetic: '[HÆB-i-tæt]', es: 'hábitat' },
      { id: 8, en: 'drought', phonetic: '[drowt]', es: 'sequía' },
      { id: 9, en: 'conservation', phonetic: '[kon-ser-VAY-shun]', es: 'conservación' },
      { id: 10, en: 'recycle', phonetic: '[ree-SY-kul]', es: 'reciclar' },
    ],
  },
  {
    id: 'travel', name: 'Travel & Culture', nameEs: 'Viajes y cultura', emoji: '✈️',
    words: [
      { id: 1, en: 'itinerary', phonetic: '[i-TIN-uh-rehr-ee]', es: 'itinerario' },
      { id: 2, en: 'accommodation', phonetic: '[uh-kom-uh-DAY-shun]', es: 'alojamiento' },
      { id: 3, en: 'currency', phonetic: '[KUR-en-see]', es: 'moneda / divisa' },
      { id: 4, en: 'heritage', phonetic: '[HEH-ri-tij]', es: 'patrimonio / herencia cultural' },
      { id: 5, en: 'customs', phonetic: '[KUS-tumz]', es: 'costumbres / aduana' },
      { id: 6, en: 'border', phonetic: '[BOR-der]', es: 'frontera' },
      { id: 7, en: 'souvenir', phonetic: '[soo-vuh-NEER]', es: 'recuerdo / souvenir' },
      { id: 8, en: 'expedition', phonetic: '[eks-puh-DISH-un]', es: 'expedición' },
      { id: 9, en: 'tourist', phonetic: '[TOOR-ist]', es: 'turista' },
      { id: 10, en: 'landmark', phonetic: '[LÆND-mark]', es: 'punto de referencia / monumento' },
    ],
  },
  {
    id: 'social', name: 'Social Issues', nameEs: 'Problemas sociales', emoji: '🤝',
    words: [
      { id: 1, en: 'poverty', phonetic: '[POV-er-tee]', es: 'pobreza' },
      { id: 2, en: 'inequality', phonetic: '[in-i-KWOL-i-tee]', es: 'desigualdad' },
      { id: 3, en: 'discrimination', phonetic: '[dis-krim-i-NAY-shun]', es: 'discriminación' },
      { id: 4, en: 'refugee', phonetic: '[ref-yoo-JEE]', es: 'refugiado' },
      { id: 5, en: 'charity', phonetic: '[CHÆR-i-tee]', es: 'organización benéfica / caridad' },
      { id: 6, en: 'volunteer', phonetic: '[vol-un-TEER]', es: 'voluntario' },
      { id: 7, en: 'campaign', phonetic: '[kæm-PAYN]', es: 'campaña' },
      { id: 8, en: 'awareness', phonetic: '[uh-WEHR-nes]', es: 'concienciación / conocimiento' },
      { id: 9, en: 'protest', phonetic: '[PROH-test]', es: 'protesta' },
      { id: 10, en: 'community', phonetic: '[kuh-MYOO-ni-tee]', es: 'comunidad' },
    ],
  },
  {
    id: 'education', name: 'Education', nameEs: 'Educación', emoji: '🎓',
    words: [
      { id: 1, en: 'curriculum', phonetic: '[kuh-RIK-yuh-lum]', es: 'plan de estudios / currículo' },
      { id: 2, en: 'scholarship', phonetic: '[SKOL-er-ship]', es: 'beca' },
      { id: 3, en: 'tuition', phonetic: '[too-ISH-un]', es: 'matrícula / enseñanza' },
      { id: 4, en: 'thesis', phonetic: '[THEE-sis]', es: 'tesis' },
      { id: 5, en: 'research', phonetic: '[ri-SERCH]', es: 'investigación' },
      { id: 6, en: 'graduate', phonetic: '[GRÆJ-oo-ayt]', es: 'graduarse / egresado' },
      { id: 7, en: 'academic', phonetic: '[æk-uh-DEM-ik]', es: 'académico' },
      { id: 8, en: 'discipline', phonetic: '[DIS-uh-plin]', es: 'disciplina / asignatura' },
      { id: 9, en: 'lecture', phonetic: '[LEK-cher]', es: 'conferencia / clase magistral' },
      { id: 10, en: 'semester', phonetic: '[si-MES-ter]', es: 'semestre' },
    ],
  },
  {
    id: 'emotions', name: 'Emotions & Relationships', nameEs: 'Emociones y relaciones', emoji: '❤️',
    words: [
      { id: 1, en: 'anxious', phonetic: '[ANG-shus]', es: 'ansioso / nervioso' },
      { id: 2, en: 'jealous', phonetic: '[JEL-us]', es: 'celoso / envidioso' },
      { id: 3, en: 'grateful', phonetic: '[GRAYT-ful]', es: 'agradecido' },
      { id: 4, en: 'frustrated', phonetic: '[FRUS-tray-tid]', es: 'frustrado' },
      { id: 5, en: 'confident', phonetic: '[KON-fi-dent]', es: 'seguro / confiado' },
      { id: 6, en: 'sympathetic', phonetic: '[sim-puh-THET-ik]', es: 'comprensivo / empático' },
      { id: 7, en: 'loyal', phonetic: '[LOY-ul]', es: 'leal / fiel' },
      { id: 8, en: 'resentful', phonetic: '[ri-ZENT-ful]', es: 'resentido' },
      { id: 9, en: 'affectionate', phonetic: '[uh-FEK-shun-it]', es: 'cariñoso / afectuoso' },
      { id: 10, en: 'optimistic', phonetic: '[op-tuh-MIS-tik]', es: 'optimista' },
    ],
  },
];

function Flashcard({ word, onNext, onPrev, idx, total }: {
  word: VocabWord; onNext: () => void; onPrev: () => void; idx: number; total: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1} / {total}</div>
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
            <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ink)' }}>{word.en}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontStyle: 'italic' }}>{word.phonetic}</span>
            <span style={{ fontSize: '0.72rem', color: COLOR, fontFamily: 'var(--mono)', marginTop: '0.25rem' }}>toca para ver la traducción</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: COLOR }}>{word.es}</span>
            <span style={{ fontSize: '1rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{word.phonetic}</span>
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

function MCQPractice({ words, onDone }: { words: VocabWord[]; onDone: (score: number) => void }) {
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

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
        <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--ink)', margin: '0 0 0.3rem' }}>{current.word.en}</p>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontStyle: 'italic', margin: '0 0 1.25rem' }}>{current.word.phonetic}</p>
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

function FillBlank({ words, onDone }: { words: VocabWord[]; onDone: (score: number) => void }) {
  const [qi, setQi] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const current = words[qi];
  const isCorrect = checked && input.trim().toLowerCase() === current.en.toLowerCase();

  function check() { if (!input.trim()) return; setChecked(true); if (input.trim().toLowerCase() === current.en.toLowerCase()) setScore(s => s + 1); }

  function next() {
    if (qi < words.length - 1) { setQi(q => q + 1); setInput(''); setChecked(false); }
    else onDone(score);
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
        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--muted)', margin: '0 0 1.25rem' }}>
          {current.es} <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)' }}>→ ¿cómo se dice en inglés?</span>
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontStyle: 'italic', margin: '0 0 1rem' }}>{current.phonetic}</p>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !checked) check(); else if (e.key === 'Enter' && checked) next(); }}
          disabled={checked} placeholder="Escribe en inglés..."
          style={{ width: '100%', maxWidth: 280, padding: '0.75rem 1rem', borderRadius: 10, fontSize: '1.1rem', textAlign: 'center', border: checked ? `2px solid ${isCorrect ? '#059669' : '#dc2626'}` : '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'inherit', fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} />
        {checked && (
          <div style={{ marginTop: '0.85rem', padding: '0.6rem 1rem', borderRadius: 8, background: isCorrect ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)', display: 'inline-block' }}>
            {isCorrect ? `✅ ¡Correcto! "${current.en}"` : `✗ La respuesta es "${current.en}"`}
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

export default function VocabularioInglesB1() {
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
            <Link href="/practica/ingles/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inglés B1</Link>
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
                  { id: 'flash' as const, emoji: '🃏', name: 'Flashcards', desc: 'Ve la palabra, toca para ver la traducción.' },
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
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {currentSet.words.map(w => (
                  <div key={w.en} style={{ padding: '0.35rem 0.75rem', borderRadius: 8, border: `1px solid ${COLOR}22`, background: `${COLOR}06`, fontSize: '0.85rem' }}>
                    {w.en}
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
          <Link href="/practica/ingles/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabulario</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabulary · Inglés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>
          8 sets temáticos · 80 palabras B1 esenciales · Flashcards, opción múltiple y escritura.
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
                    <span key={w.en} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: 5, background: `${COLOR}10`, color: COLOR, fontFamily: 'var(--mono)' }}>{w.en}</span>
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
