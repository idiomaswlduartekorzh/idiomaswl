'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface Word { id: string; it: string; phonetic: string; es: string; }
interface VocabSet { id: string; name: string; nameIt: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'lavoro', name: 'Trabajo y Carrera', nameIt: 'Lavoro e Carriera', icon: '💼',
    words: [
      { id: 'negoziare', it: 'negoziare', phonetic: '[ne-go-TSYÀ-re]', es: 'negociar' },
      { id: 'scadenza', it: 'la scadenza', phonetic: '[ska-DÈN-tsa]', es: 'el plazo / la fecha límite' },
      { id: 'collega', it: 'il/la collega', phonetic: '[kol-LÈ-ga]', es: 'el/la compañero/a de trabajo' },
      { id: 'promozione', it: 'la promozione', phonetic: '[pro-mo-TSYÓ-ne]', es: 'el ascenso / la promoción' },
      { id: 'dimettersi', it: 'dimettersi', phonetic: '[di-MÈT-ter-si]', es: 'renunciar / dimitir' },
      { id: 'contratto', it: 'il contratto', phonetic: '[kon-TRÀT-to]', es: 'el contrato' },
      { id: 'assumere', it: 'assumere', phonetic: '[as-SÙ-me-re]', es: 'contratar (a alguien)' },
      { id: 'stipendio', it: 'lo stipendio', phonetic: '[sti-PÈN-dyo]', es: 'el salario / sueldo' },
      { id: 'prestazione', it: 'la prestazione', phonetic: '[pres-ta-TSYÓ-ne]', es: 'el rendimiento / la prestación' },
      { id: 'dipartimento', it: 'il dipartimento', phonetic: '[di-par-ti-MÈN-to]', es: 'el departamento' },
    ],
  },
  {
    id: 'tecnologia', name: 'Tecnología', nameIt: 'Tecnologia', icon: '💻',
    words: [
      { id: 'software', it: 'il software', phonetic: '[sòft-wèr]', es: 'el software' },
      { id: 'banca_dati', it: 'la banca dati', phonetic: '[BÀN-ka DÀ-ti]', es: 'la base de datos' },
      { id: 'scaricare', it: 'scaricare', phonetic: '[ska-ri-KÀ-re]', es: 'descargar' },
      { id: 'cifrare', it: 'cifrare', phonetic: '[chi-FRÀ-re]', es: 'cifrar / encriptar' },
      { id: 'interfaccia', it: "l'interfaccia", phonetic: '[in-ter-FÀT-cha]', es: 'la interfaz' },
      { id: 'malware', it: 'il malware', phonetic: '[màl-wèr]', es: 'el malware' },
      { id: 'algoritmo', it: "l'algoritmo", phonetic: '[al-go-RÍT-mo]', es: 'el algoritmo' },
      { id: 'larghezza_banda', it: 'la larghezza di banda', phonetic: '[lar-GÈT-tsa di BÀN-da]', es: 'el ancho de banda' },
      { id: 'senza_fili', it: 'senza fili', phonetic: '[SÈN-tsa FÍ-li]', es: 'inalámbrico / sin cables' },
      { id: 'rete', it: 'la rete', phonetic: '[RÈ-te]', es: 'la red' },
    ],
  },
  {
    id: 'salute', name: 'Salud', nameIt: 'Salute', icon: '🏥',
    words: [
      { id: 'diagnosi', it: 'la diagnosi', phonetic: '[dya-GNÒ-zi]', es: 'el diagnóstico' },
      { id: 'sintomo', it: 'il sintomo', phonetic: '[SÍN-to-mo]', es: 'el síntoma' },
      { id: 'ricetta', it: 'la ricetta', phonetic: '[ri-CHÈT-ta]', es: 'la receta médica' },
      { id: 'chirurgia', it: 'la chirurgia', phonetic: '[ki-rur-JÍ-a]', es: 'la cirugía' },
      { id: 'cronico', it: 'cronico', phonetic: '[KRÒ-ni-ko]', es: 'crónico' },
      { id: 'allergico', it: 'allergico', phonetic: '[al-LÈR-ji-ko]', es: 'alérgico' },
      { id: 'vaccinazione', it: 'la vaccinazione', phonetic: '[vat-chi-na-TSYÓ-ne]', es: 'la vacunación' },
      { id: 'terapia', it: 'la terapia', phonetic: '[te-ra-PÍ-a]', es: 'la terapia / el tratamiento' },
      { id: 'immunità', it: "l'immunità", phonetic: '[im-mu-ni-TÀ]', es: 'la inmunidad' },
      { id: 'guarigione', it: 'la guarigione', phonetic: '[gua-ri-JÓ-ne]', es: 'la recuperación / la curación' },
    ],
  },
  {
    id: 'ambiente', name: 'Medio ambiente', nameIt: 'Ambiente', icon: '🌿',
    words: [
      { id: 'inquinamento', it: "l'inquinamento", phonetic: '[in-kwi-na-MÈN-to]', es: 'la contaminación' },
      { id: 'rinnovabile', it: 'rinnovabile', phonetic: '[rin-no-VÀ-bi-le]', es: 'renovable' },
      { id: 'deforestazione', it: 'la deforestazione', phonetic: '[de-fo-res-ta-TSYÓ-ne]', es: 'la deforestación' },
      { id: 'emissione', it: "l'emissione", phonetic: '[e-mis-SYÓ-ne]', es: 'la emisión' },
      { id: 'biodiversità', it: 'la biodiversità', phonetic: '[bio-di-ver-si-TÀ]', es: 'la biodiversidad' },
      { id: 'sostenibile', it: 'sostenibile', phonetic: '[so-ste-NÍ-bi-le]', es: 'sostenible' },
      { id: 'habitat', it: "l'habitat", phonetic: '[À-bi-tat]', es: 'el hábitat' },
      { id: 'siccità', it: 'la siccità', phonetic: '[sik-chi-TÀ]', es: 'la sequía' },
      { id: 'conservazione', it: 'la conservazione', phonetic: '[kon-ser-va-TSYÓ-ne]', es: 'la conservación' },
      { id: 'riciclare', it: 'riciclare', phonetic: '[ri-chi-KLÀ-re]', es: 'reciclar' },
    ],
  },
  {
    id: 'viaggi', name: 'Viajes y Cultura', nameIt: 'Viaggi e Cultura', icon: '✈️',
    words: [
      { id: 'itinerario', it: "l'itinerario", phonetic: '[i-ti-ne-RÀ-ryo]', es: 'el itinerario' },
      { id: 'alloggio', it: "l'alloggio", phonetic: '[al-LÒD-dyo]', es: 'el alojamiento' },
      { id: 'valuta', it: 'la valuta', phonetic: '[va-LÙ-ta]', es: 'la divisa / la moneda' },
      { id: 'patrimonio', it: 'il patrimonio', phonetic: '[pa-tri-MÒ-nyo]', es: 'el patrimonio' },
      { id: 'usanze', it: 'le usanze', phonetic: '[u-ZÀN-tse]', es: 'las costumbres / los usos' },
      { id: 'frontiera', it: 'la frontiera', phonetic: '[fron-TYÈR-ra]', es: 'la frontera' },
      { id: 'souvenir', it: 'il souvenir', phonetic: '[su-ve-NIR]', es: 'el recuerdo / el souvenir' },
      { id: 'esplorazione', it: "l'esplorazione", phonetic: '[es-plo-ra-TSYÓ-ne]', es: 'la exploración' },
      { id: 'turista', it: 'il/la turista', phonetic: '[tu-RÍS-ta]', es: 'el/la turista' },
      { id: 'monumento', it: 'il monumento', phonetic: '[mo-nu-MÈN-to]', es: 'el monumento' },
    ],
  },
  {
    id: 'sociale', name: 'Cuestiones Sociales', nameIt: 'Questioni Sociali', icon: '🤝',
    words: [
      { id: 'povertà', it: 'la povertà', phonetic: '[po-ver-TÀ]', es: 'la pobreza' },
      { id: 'disuguaglianza', it: 'la disuguaglianza', phonetic: '[di-zu-gua-LYÀN-tsa]', es: 'la desigualdad' },
      { id: 'discriminazione', it: 'la discriminazione', phonetic: '[dis-kri-mi-na-TSYÓ-ne]', es: 'la discriminación' },
      { id: 'rifugiato', it: 'il rifugiato', phonetic: '[ri-fu-JÀ-to]', es: 'el refugiado' },
      { id: 'beneficenza', it: 'la beneficenza', phonetic: '[be-ne-fi-CHÈN-tsa]', es: 'la beneficencia / la caridad' },
      { id: 'volontario', it: 'il volontario', phonetic: '[vo-lon-TÀ-ryo]', es: 'el voluntario' },
      { id: 'campagna', it: 'la campagna', phonetic: '[kam-PÀ-nya]', es: 'la campaña' },
      { id: 'sensibilizzazione', it: 'la sensibilizzazione', phonetic: '[sen-si-bi-lid-dza-TSYÓ-ne]', es: 'la concienciación' },
      { id: 'manifestazione', it: 'la manifestazione', phonetic: '[ma-ni-fes-ta-TSYÓ-ne]', es: 'la manifestación / el evento' },
      { id: 'comunità', it: 'la comunità', phonetic: '[ko-mu-ni-TÀ]', es: 'la comunidad' },
    ],
  },
  {
    id: 'istruzione', name: 'Educación', nameIt: 'Istruzione', icon: '🎓',
    words: [
      { id: 'programma', it: 'il programma', phonetic: '[pro-GRÀM-ma]', es: 'el programa / el plan de estudios' },
      { id: 'borsa_studio', it: 'la borsa di studio', phonetic: '[BÒR-sa di STÙ-dyo]', es: 'la beca' },
      { id: 'retta', it: 'la retta scolastica', phonetic: '[RÈT-ta sko-LÀS-ti-ka]', es: 'la matrícula / la cuota escolar' },
      { id: 'tesi', it: 'la tesi', phonetic: '[TÈ-zi]', es: 'la tesis' },
      { id: 'ricerca', it: 'la ricerca', phonetic: '[ri-CHÈR-ka]', es: 'la investigación' },
      { id: 'diplomato', it: 'diplomato', phonetic: '[di-plo-MÀ-to]', es: 'graduado / diplomado' },
      { id: 'accademico', it: 'accademico', phonetic: '[ak-ka-DÈ-mi-ko]', es: 'académico' },
      { id: 'disciplina', it: 'la disciplina', phonetic: '[di-shi-PLÍN-na]', es: 'la disciplina / la asignatura' },
      { id: 'lezione_magistrale', it: 'la lezione magistrale', phonetic: '[le-TSYÓ-ne ma-jis-TRÀ-le]', es: 'la clase magistral / la conferencia' },
      { id: 'semestre', it: 'il semestre', phonetic: '[se-MÈS-tre]', es: 'el semestre' },
    ],
  },
  {
    id: 'emozioni', name: 'Emociones', nameIt: 'Emozioni', icon: '💭',
    words: [
      { id: 'ansioso', it: 'ansioso', phonetic: '[an-SYÓZ-zo]', es: 'ansioso' },
      { id: 'geloso', it: 'geloso', phonetic: '[je-LÓZ-zo]', es: 'celoso' },
      { id: 'grato', it: 'grato', phonetic: '[GRÀ-to]', es: 'agradecido' },
      { id: 'frustrato', it: 'frustrato', phonetic: '[frus-TRÀT-to]', es: 'frustrado' },
      { id: 'sicuro_di_se', it: 'sicuro di sé', phonetic: '[si-KÙ-ro di SÈ]', es: 'seguro de sí mismo' },
      { id: 'comprensivo', it: 'comprensivo', phonetic: '[kom-pren-SÍ-vo]', es: 'comprensivo / tolerante' },
      { id: 'leale', it: 'leale', phonetic: '[le-À-le]', es: 'leal' },
      { id: 'risentito', it: 'risentito', phonetic: '[ri-zen-TÍ-to]', es: 'resentido' },
      { id: 'affettuoso', it: 'affettuoso', phonetic: '[af-fet-TUÓZ-zo]', es: 'afectuoso / cariñoso' },
      { id: 'ottimista', it: 'ottimista', phonetic: '[ot-ti-MÍS-ta]', es: 'optimista' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎴</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡Mazo completado!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} palabras marcadas como conocidas.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir mazo</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLOR}08` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{w.it}</div>
            {w.phonetic && <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLOR}15` }}>{w.phonetic}</div>}
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.it}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ La sé</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Repasar →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.8 ? '🏆' : '⭐'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.it !== w.it)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)' }}>{w.it}</div>
        {w.phonetic && <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 5, background: `${COLOR}15`, display: 'inline-block', marginTop: '0.3rem' }}>{w.phonetic}</div>}
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)', textAlign: 'center' }}>¿Cuál es la traducción correcta?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
              style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
          {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
        </button>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.7 ? '🎉' : '📝'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const normalize = (s: string) => s.toLowerCase().replace(/^(il |la |lo |l'|i |gli |le |un |una |uno )/i, '').trim();
  const isCorrect = normalize(input) === normalize(w.it);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Scrivi la parola in italiano:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="La tua risposta in italiano..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Verificare</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ ¡Corretto!' : `✗ La risposta è: ${w.it}`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{w.phonetic}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Successivo →' : 'Vedere risultato →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabolarioItalianoB1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>← {set.nameIt}</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{mode === 'flashcard' ? '🎴 Flashcard' : mode === 'mcq' ? '🎯 Scelta multipla' : '✏️ Scrivere'}</span>
        </div>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vocabolario B1</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameIt}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} parole · Scegli una modalità di pratica</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcard', desc: 'Vedi ogni parola e la sua traduzione. Segna quelle che già conosci.' },
            { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Scelta multipla', desc: 'Scegli la traduzione corretta tra 4 opzioni.' },
            { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Scrivi la parola', desc: 'Scrivi la parola in italiano partendo dalla traduzione.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}04`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLOR}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Vocabolario ({set.words.length} parole)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.id} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>{w.it}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{w.es}</div>
                {w.phonetic && <div style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.1rem' }}>{w.phonetic}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabolario</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabolario · Italiano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabolario B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 set tematici B1 — 80 parole con pronuncia. Flashcard, scelta multipla ed esercizi di scrittura.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}04`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLOR}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameIt}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} parole</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Iniziare →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
