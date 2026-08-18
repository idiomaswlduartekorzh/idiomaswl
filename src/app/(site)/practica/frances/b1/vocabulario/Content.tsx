'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { id: string; fr: string; phonetic: string; es: string; }
interface VocabSet { id: string; name: string; nameFr: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'travail', name: 'Trabajo y carrera', nameFr: 'Travail et Carrière', icon: '💼',
    words: [
      { id: 'neg', fr: 'négocier', phonetic: '[negoSYÉ]', es: 'negociar' },
      { id: 'del', fr: 'le délai', phonetic: '[deLÉ]', es: 'el plazo / el límite de tiempo' },
      { id: 'col', fr: 'le collègue', phonetic: '[kolÈG]', es: 'el/la colega' },
      { id: 'pro', fr: 'la promotion', phonetic: '[promoSYÕ]', es: 'el ascenso' },
      { id: 'dem', fr: 'démissionner', phonetic: '[demisyoNÉ]', es: 'renunciar / dimitir' },
      { id: 'con', fr: 'le contrat', phonetic: '[kõTRA]', es: 'el contrato' },
      { id: 'rec', fr: 'recruter', phonetic: '[rəkrüTÉ]', es: 'reclutar / contratar' },
      { id: 'sal', fr: 'le salaire', phonetic: '[salÈR]', es: 'el salario / el sueldo' },
      { id: 'per', fr: 'la performance', phonetic: '[pɛrfɔrMÃS]', es: 'el rendimiento' },
      { id: 'dep', fr: 'le département', phonetic: '[departəMÃ]', es: 'el departamento' },
    ],
  },
  {
    id: 'technologie', name: 'Tecnología', nameFr: 'Technologie', icon: '💻',
    words: [
      { id: 'log', fr: 'le logiciel', phonetic: '[loZHiSYÈL]', es: 'el software' },
      { id: 'bdd', fr: 'la base de données', phonetic: '[baz də doNÉ]', es: 'la base de datos' },
      { id: 'tel', fr: 'télécharger', phonetic: '[teleSHarZHÉ]', es: 'descargar' },
      { id: 'chi', fr: 'chiffrer', phonetic: '[SHiFRÉ]', es: 'cifrar / encriptar' },
      { id: 'int', fr: "l'interface", phonetic: '[ẽtɛrFAS]', es: 'la interfaz' },
      { id: 'pir', fr: 'le piratage', phonetic: '[piRATAZH]', es: 'el hackeo / la piratería' },
      { id: 'alg', fr: "l'algorithme", phonetic: '[algoRITM]', es: 'el algoritmo' },
      { id: 'ban', fr: 'la bande passante', phonetic: '[bãd paSÃT]', es: 'el ancho de banda' },
      { id: 'wif', fr: 'sans fil', phonetic: '[sã FIL]', es: 'inalámbrico / wifi' },
      { id: 'res', fr: 'le réseau', phonetic: '[reZÔ]', es: 'la red' },
    ],
  },
  {
    id: 'sante', name: 'Salud', nameFr: 'Santé', icon: '🏥',
    words: [
      { id: 'dia', fr: 'le diagnostic', phonetic: '[diaGNOStik]', es: 'el diagnóstico' },
      { id: 'sym', fr: 'le symptôme', phonetic: '[sẽPTÔM]', es: 'el síntoma' },
      { id: 'ord', fr: "l'ordonnance", phonetic: '[ordoNÃS]', es: 'la receta médica' },
      { id: 'chi', fr: 'la chirurgie', phonetic: '[SHirürZHI]', es: 'la cirugía' },
      { id: 'chr', fr: 'chronique', phonetic: '[kroNIK]', es: 'crónico/a' },
      { id: 'all', fr: 'allergique', phonetic: '[alɛrZHIK]', es: 'alérgico/a' },
      { id: 'vac', fr: 'la vaccination', phonetic: '[vaksiNASYÕ]', es: 'la vacunación' },
      { id: 'the', fr: 'la thérapie', phonetic: '[teraPI]', es: 'la terapia' },
      { id: 'imm', fr: "l'immunité", phonetic: '[imüniTÉ]', es: 'la inmunidad' },
      { id: 'gue', fr: 'la guérison', phonetic: '[gérizÕ]', es: 'la curación / la recuperación' },
    ],
  },
  {
    id: 'environnement', name: 'Medio ambiente', nameFr: 'Environnement', icon: '🌿',
    words: [
      { id: 'pol', fr: 'la pollution', phonetic: '[polüSYÕ]', es: 'la contaminación' },
      { id: 'ren', fr: 'renouvelable', phonetic: '[rənuveˈlabl]', es: 'renovable' },
      { id: 'def', fr: 'la déforestation', phonetic: '[deforestaСYÕ]', es: 'la deforestación' },
      { id: 'emi', fr: "l'émission", phonetic: '[emiSYÕ]', es: 'la emisión (de CO₂)' },
      { id: 'bio', fr: 'la biodiversité', phonetic: '[bjodiversiTÉ]', es: 'la biodiversidad' },
      { id: 'dur', fr: 'durable', phonetic: '[düRABL]', es: 'sostenible' },
      { id: 'hab', fr: "l'habitat", phonetic: '[abitA]', es: 'el hábitat' },
      { id: 'sec', fr: 'la sécheresse', phonetic: '[seSHrÈS]', es: 'la sequía' },
      { id: 'con', fr: 'la conservation', phonetic: '[kõservaСYÕ]', es: 'la conservación' },
      { id: 'rec', fr: 'recycler', phonetic: '[rəsiKLÉ]', es: 'reciclar' },
    ],
  },
  {
    id: 'voyages', name: 'Viajes y cultura', nameFr: 'Voyages et Culture', icon: '✈️',
    words: [
      { id: 'iti', fr: "l'itinéraire", phonetic: '[itineRÈR]', es: 'el itinerario' },
      { id: 'heb', fr: "l'hébergement", phonetic: '[eberZHəMÃ]', es: 'el alojamiento' },
      { id: 'dev', fr: 'la devise', phonetic: '[dəVIZ]', es: 'la divisa / la moneda extranjera' },
      { id: 'pat', fr: 'le patrimoine', phonetic: '[patRiMWAN]', es: 'el patrimonio' },
      { id: 'cou', fr: 'les coutumes', phonetic: '[kuTÜM]', es: 'las costumbres' },
      { id: 'fro', fr: 'la frontière', phonetic: '[frõtYÈR]', es: 'la frontera' },
      { id: 'sou', fr: 'le souvenir', phonetic: '[suVNIR]', es: 'el recuerdo / el souvenir' },
      { id: 'exp', fr: "l'expédition", phonetic: '[ɛkspeDisYÕ]', es: 'la expedición' },
      { id: 'tou', fr: 'le touriste', phonetic: '[tuRIST]', es: 'el/la turista' },
      { id: 'mon', fr: 'le monument', phonetic: '[monüMÃ]', es: 'el monumento' },
    ],
  },
  {
    id: 'social', name: 'Cuestiones sociales', nameFr: 'Questions Sociales', icon: '🤝',
    words: [
      { id: 'pau', fr: 'la pauvreté', phonetic: '[povrəTÉ]', es: 'la pobreza' },
      { id: 'ine', fr: "l'inégalité", phonetic: '[inegaliTÉ]', es: 'la desigualdad' },
      { id: 'dis', fr: 'la discrimination', phonetic: '[diskriminaSYÕ]', es: 'la discriminación' },
      { id: 'ref', fr: 'le réfugié', phonetic: '[refüZHYÉ]', es: 'el/la refugiado/a' },
      { id: 'cha', fr: 'la charité', phonetic: '[SHariTÉ]', es: 'la caridad' },
      { id: 'ben', fr: 'le bénévole', phonetic: '[benéVOL]', es: 'el/la voluntario/a' },
      { id: 'cam', fr: 'la campagne', phonetic: '[kãPAÑ]', es: 'la campaña' },
      { id: 'sen', fr: 'la sensibilisation', phonetic: '[sãsibilizaSYÕ]', es: 'la sensibilización / la concienciación' },
      { id: 'man', fr: 'la manifestation', phonetic: '[manifestaSYÕ]', es: 'la manifestación / la protesta' },
      { id: 'com', fr: 'la communauté', phonetic: '[komünoTÉ]', es: 'la comunidad' },
    ],
  },
  {
    id: 'education', name: 'Educación', nameFr: 'Éducation', icon: '🎓',
    words: [
      { id: 'pro', fr: 'le programme', phonetic: '[proGRAM]', es: 'el programa de estudios / el currículo' },
      { id: 'bou', fr: 'la bourse', phonetic: '[BURS]', es: 'la beca' },
      { id: 'fra', fr: 'les frais de scolarité', phonetic: '[frɛ də skolariTÉ]', es: 'los gastos de matrícula' },
      { id: 'the', fr: 'la thèse', phonetic: '[TÈZ]', es: 'la tesis' },
      { id: 'rec', fr: 'la recherche', phonetic: '[rəSHÈRSH]', es: 'la investigación' },
      { id: 'dip', fr: 'diplômé(e)', phonetic: '[diploMÉ]', es: 'graduado/a / titulado/a' },
      { id: 'aca', fr: 'académique', phonetic: '[akadéMIK]', es: 'académico/a' },
      { id: 'dis', fr: 'la discipline', phonetic: '[disipLIN]', es: 'la disciplina / la asignatura' },
      { id: 'cou', fr: 'le cours magistral', phonetic: '[kur maZHisTRAL]', es: 'la clase magistral / la conferencia' },
      { id: 'sem', fr: 'le semestre', phonetic: '[səMÈSTR]', es: 'el semestre' },
    ],
  },
  {
    id: 'emotions', name: 'Emociones', nameFr: 'Émotions', icon: '💭',
    words: [
      { id: 'anx', fr: 'anxieux/euse', phonetic: '[ãksYÖ/öz]', es: 'ansioso/a' },
      { id: 'jal', fr: 'jaloux/ouse', phonetic: '[ZHaLU/üz]', es: 'celoso/a / envidioso/a' },
      { id: 'rec', fr: 'reconnaissant(e)', phonetic: '[rəkonesÃ/t]', es: 'agradecido/a' },
      { id: 'fru', fr: 'frustré(e)', phonetic: '[früsTRÉ]', es: 'frustrado/a' },
      { id: 'con', fr: 'confiant(e)', phonetic: '[kõfYÃ/t]', es: 'seguro/a de sí mismo' },
      { id: 'com', fr: 'compatissant(e)', phonetic: '[kõpatiSÃ/t]', es: 'compasivo/a' },
      { id: 'loy', fr: 'loyal(e)', phonetic: '[lwaYAL]', es: 'leal' },
      { id: 'ran', fr: 'rancunier/ière', phonetic: '[rãküNYÉ/yɛr]', es: 'rencoroso/a' },
      { id: 'aff', fr: 'affectueux/euse', phonetic: '[afɛktüYÖ/öz]', es: 'cariñoso/a / afectuoso/a' },
      { id: 'opt', fr: 'optimiste', phonetic: '[optiMIST]', es: 'optimista' },
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
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLORMix(3.1)}` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{w.fr}</div>
            {w.phonetic && <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}` }}>{w.phonetic}</div>}
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.fr}</div>
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
  const distractors = shuffle(shuffled.filter(x => x.fr !== w.fr)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)' }}>{w.fr}</div>
        {w.phonetic && <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}`, display: 'inline-block', marginTop: '0.3rem' }}>{w.phonetic}</div>}
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
  const isCorrect = input.trim().toLowerCase() === w.fr.toLowerCase() ||
    input.trim().toLowerCase() === w.fr.toLowerCase().replace(/[\(\/].*/, '').trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Escribe la palabra en francés:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="Ta réponse en français..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Vérifier</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ ¡Correct!' : `✗ La réponse est: ${w.fr}`}
            {w.phonetic && <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{w.phonetic}</div>}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Suivant →' : 'Voir résultat →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioFrancesB1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>← {set.nameFr}</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{mode === 'flashcard' ? '🎴 Flashcards' : mode === 'mcq' ? '🎯 Choix multiple' : '✏️ Écrire'}</span>
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
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vocabulaire B1</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameFr}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} mots · Choisissez un mode de pratique</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcards', desc: 'Ve cada palabra y su traducción. Marca las que ya conoces.' },
            { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Choix multiple', desc: 'Elige la traducción correcta de 4 opciones.' },
            { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Écrire le mot', desc: 'Escribe la palabra en francés a partir de la traducción.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 14, background: `${COLORMix(1.6)}`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
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
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Vocabulaire ({set.words.length} mots)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.id} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>{w.fr}</div>
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
          <Link href="/practica/frances/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 Français B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabulaire</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabulaire · Français B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulaire B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 thèmes B1 — 80 mots thématiques. Flashcards, choix multiple et exercices d&apos;écriture.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 16, background: `${COLORMix(1.6)}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameFr}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} mots</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Commencer →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
