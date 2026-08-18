'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { id: string; pt: string; phonetic: string; es: string; }
interface VocabSet { id: string; name: string; namePt: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'trabalho', name: 'Trabajo y carrera', namePt: 'Trabalho e Carreira', icon: '💼',
    words: [
      { id: 'negociar', pt: 'negociar', phonetic: '[neh-goh-SYAR]', es: 'negociar' },
      { id: 'prazo', pt: 'o prazo', phonetic: '[PRAH-zoo]', es: 'el plazo / la fecha límite' },
      { id: 'colega', pt: 'o colega', phonetic: '[koh-LEH-gah]', es: 'el colega / el compañero' },
      { id: 'promocao', pt: 'a promoção', phonetic: '[proh-moh-SOWNG]', es: 'el ascenso / la promoción' },
      { id: 'demitirse', pt: 'demitir-se', phonetic: '[deh-mee-TCHEER-seh]', es: 'renunciar / dimitir' },
      { id: 'contrato', pt: 'o contrato', phonetic: '[kon-TRAH-too]', es: 'el contrato' },
      { id: 'contratar', pt: 'contratar', phonetic: '[kon-trah-TAR]', es: 'contratar' },
      { id: 'salario', pt: 'o salário', phonetic: '[sah-LAH-ryoo]', es: 'el salario' },
      { id: 'desempenho', pt: 'o desempenho', phonetic: '[deh-zem-PEH-nyoo]', es: 'el desempeño / el rendimiento' },
      { id: 'departamento', pt: 'o departamento', phonetic: '[deh-par-tah-MEN-too]', es: 'el departamento' },
    ],
  },
  {
    id: 'tecnologia', name: 'Tecnología', namePt: 'Tecnologia', icon: '💻',
    words: [
      { id: 'software', pt: 'o software', phonetic: '[SOF-tchi-wer]', es: 'el software' },
      { id: 'bancodados', pt: 'o banco de dados', phonetic: '[BAN-koo dji DAH-doos]', es: 'la base de datos' },
      { id: 'baixar', pt: 'baixar', phonetic: '[bay-SHAR]', es: 'descargar' },
      { id: 'criptografar', pt: 'criptografar', phonetic: '[krip-toh-grah-FAR]', es: 'cifrar / encriptar' },
      { id: 'interface', pt: 'a interface', phonetic: '[een-ter-FAH-seh]', es: 'la interfaz' },
      { id: 'malware', pt: 'o malware', phonetic: '[MAL-wer]', es: 'el malware' },
      { id: 'algoritmo', pt: 'o algoritmo', phonetic: '[ah-loh-GREET-chee-moo]', es: 'el algoritmo' },
      { id: 'largura', pt: 'a largura de banda', phonetic: '[lar-GOO-rah dji BAN-dah]', es: 'el ancho de banda' },
      { id: 'semfio', pt: 'sem fio', phonetic: '[seng FEE-oo]', es: 'inalámbrico / sin cable' },
      { id: 'rede', pt: 'a rede', phonetic: '[HEH-djeh]', es: 'la red' },
    ],
  },
  {
    id: 'saude', name: 'Salud', namePt: 'Saúde', icon: '🏥',
    words: [
      { id: 'diagnostico', pt: 'o diagnóstico', phonetic: '[djee-ag-NOS-tchee-koo]', es: 'el diagnóstico' },
      { id: 'sintoma', pt: 'o sintoma', phonetic: '[SEEN-toh-mah]', es: 'el síntoma' },
      { id: 'receita', pt: 'a receita', phonetic: '[heh-SAY-tah]', es: 'la receta (médica)' },
      { id: 'cirurgia', pt: 'a cirurgia', phonetic: '[see-roor-ZHYAH]', es: 'la cirugía' },
      { id: 'cronico', pt: 'crônico', phonetic: '[KROH-nee-koo]', es: 'crónico' },
      { id: 'alergico', pt: 'alérgico', phonetic: '[ah-LER-zhee-koo]', es: 'alérgico' },
      { id: 'vacinacao', pt: 'a vacinação', phonetic: '[vah-see-nah-SOWNG]', es: 'la vacunación' },
      { id: 'terapia', pt: 'a terapia', phonetic: '[teh-RAH-pyah]', es: 'la terapia' },
      { id: 'imunidade', pt: 'a imunidade', phonetic: '[ee-moo-nee-DAH-djeh]', es: 'la inmunidad' },
      { id: 'recuperacao', pt: 'a recuperação', phonetic: '[heh-koo-peh-rah-SOWNG]', es: 'la recuperación' },
    ],
  },
  {
    id: 'meioambiente', name: 'Medio Ambiente', namePt: 'Meio Ambiente', icon: '🌿',
    words: [
      { id: 'poluicao', pt: 'a poluição', phonetic: '[poh-loo-ee-SOWNG]', es: 'la contaminación' },
      { id: 'renovavel', pt: 'renovável', phonetic: '[heh-noh-VAH-vel]', es: 'renovable' },
      { id: 'desmatamento', pt: 'o desmatamento', phonetic: '[dez-mah-tah-MEN-too]', es: 'la deforestación' },
      { id: 'emissao', pt: 'a emissão', phonetic: '[eh-mee-SOWNG]', es: 'la emisión' },
      { id: 'biodiversidade', pt: 'a biodiversidade', phonetic: '[byoh-djee-ver-see-DAH-djeh]', es: 'la biodiversidad' },
      { id: 'sustentavel', pt: 'sustentável', phonetic: '[soos-ten-TAH-vel]', es: 'sostenible' },
      { id: 'habitat', pt: 'o habitat', phonetic: '[ah-BEE-tat]', es: 'el hábitat' },
      { id: 'seca', pt: 'a seca', phonetic: '[SEH-kah]', es: 'la sequía' },
      { id: 'conservacao', pt: 'a conservação', phonetic: '[kon-ser-vah-SOWNG]', es: 'la conservación' },
      { id: 'reciclar', pt: 'reciclar', phonetic: '[heh-see-KLAR]', es: 'reciclar' },
    ],
  },
  {
    id: 'viagens', name: 'Viajes y Cultura', namePt: 'Viagens e Cultura', icon: '✈️',
    words: [
      { id: 'roteiro', pt: 'o roteiro', phonetic: '[hoh-TAY-roo]', es: 'el itinerario / el guión' },
      { id: 'acomodacao', pt: 'a acomodação', phonetic: '[ah-koh-moh-dah-SOWNG]', es: 'el alojamiento' },
      { id: 'moeda', pt: 'a moeda', phonetic: '[moh-EH-dah]', es: 'la moneda' },
      { id: 'patrimonio', pt: 'o patrimônio', phonetic: '[pah-tree-MOH-nyoo]', es: 'el patrimonio' },
      { id: 'costumes', pt: 'os costumes', phonetic: '[koos-TOO-mehs]', es: 'las costumbres' },
      { id: 'fronteira', pt: 'a fronteira', phonetic: '[fron-TAY-rah]', es: 'la frontera' },
      { id: 'lembranca', pt: 'a lembrança', phonetic: '[lem-BRAN-sah]', es: 'el recuerdo / el souvenir' },
      { id: 'expedicao', pt: 'a expedição', phonetic: '[es-peh-djee-SOWNG]', es: 'la expedición' },
      { id: 'turista', pt: 'o turista', phonetic: '[too-REES-tah]', es: 'el turista' },
      { id: 'monumento', pt: 'o monumento', phonetic: '[moh-noo-MEN-too]', es: 'el monumento' },
    ],
  },
  {
    id: 'social', name: 'Cuestiones Sociales', namePt: 'Questões Sociais', icon: '🤝',
    words: [
      { id: 'pobreza', pt: 'a pobreza', phonetic: '[poh-BREH-zah]', es: 'la pobreza' },
      { id: 'desigualdade', pt: 'a desigualdade', phonetic: '[deh-zee-gwal-DAH-djeh]', es: 'la desigualdad' },
      { id: 'discriminacao', pt: 'a discriminação', phonetic: '[djees-kree-mee-nah-SOWNG]', es: 'la discriminación' },
      { id: 'refugiado', pt: 'o refugiado', phonetic: '[heh-foo-ZHYAH-doo]', es: 'el refugiado' },
      { id: 'caridade', pt: 'a caridade', phonetic: '[kah-ree-DAH-djeh]', es: 'la caridad' },
      { id: 'voluntario', pt: 'o voluntário', phonetic: '[voh-loon-TAH-ryoo]', es: 'el voluntario' },
      { id: 'campanha', pt: 'a campanha', phonetic: '[kam-PAH-nyah]', es: 'la campaña' },
      { id: 'conscientizacao', pt: 'a conscientização', phonetic: '[kon-syen-tchee-zah-SOWNG]', es: 'la concientización' },
      { id: 'protesto', pt: 'o protesto', phonetic: '[proh-TES-too]', es: 'la protesta' },
      { id: 'comunidade', pt: 'a comunidade', phonetic: '[koh-moo-nee-DAH-djeh]', es: 'la comunidad' },
    ],
  },
  {
    id: 'educacao', name: 'Educación', namePt: 'Educação', icon: '🎓',
    words: [
      { id: 'curriculo', pt: 'o currículo', phonetic: '[koo-HREE-koo-loo]', es: 'el currículo / el plan de estudios' },
      { id: 'bolsa', pt: 'a bolsa de estudos', phonetic: '[BOL-sah dji es-TOO-doos]', es: 'la beca' },
      { id: 'mensalidades', pt: 'as mensalidades', phonetic: '[men-sah-lee-DAH-djees]', es: 'las mensualidades / las cuotas' },
      { id: 'tese', pt: 'a tese', phonetic: '[TEH-zeh]', es: 'la tesis' },
      { id: 'pesquisa', pt: 'a pesquisa', phonetic: '[pes-KEE-zah]', es: 'la investigación / la búsqueda' },
      { id: 'formado', pt: 'formado', phonetic: '[for-MAH-doo]', es: 'graduado / titulado' },
      { id: 'academico', pt: 'acadêmico', phonetic: '[ah-kah-DEH-mee-koo]', es: 'académico' },
      { id: 'disciplina', pt: 'a disciplina', phonetic: '[djees-see-PLEE-nah]', es: 'la asignatura / la disciplina' },
      { id: 'aula', pt: 'a aula', phonetic: '[AH-oo-lah]', es: 'la clase / el aula' },
      { id: 'semestre', pt: 'o semestre', phonetic: '[seh-MES-treh]', es: 'el semestre' },
    ],
  },
  {
    id: 'emocoes', name: 'Emociones', namePt: 'Emoções', icon: '💭',
    words: [
      { id: 'ansioso', pt: 'ansioso', phonetic: '[an-SYOH-zoo]', es: 'ansioso' },
      { id: 'ciumento', pt: 'ciumento', phonetic: '[syoo-MEN-too]', es: 'celoso' },
      { id: 'grato', pt: 'grato', phonetic: '[GRAH-too]', es: 'agradecido / grato' },
      { id: 'frustrado', pt: 'frustrado', phonetic: '[froos-TRAH-doo]', es: 'frustrado' },
      { id: 'confiante', pt: 'confiante', phonetic: '[kon-fyAN-tchi]', es: 'seguro de sí mismo / confiado' },
      { id: 'solidario', pt: 'solidário', phonetic: '[soh-lee-DAH-ryoo]', es: 'solidario' },
      { id: 'leal', pt: 'leal', phonetic: '[leh-AL]', es: 'leal' },
      { id: 'ressentido', pt: 'ressentido', phonetic: '[heh-sen-TCHEE-doo]', es: 'resentido' },
      { id: 'afetuoso', pt: 'afetuoso', phonetic: '[ah-feh-TWOH-zoo]', es: 'afectuoso / cariñoso' },
      { id: 'otimista', pt: 'otimista', phonetic: '[oh-tchee-MEES-tah]', es: 'optimista' },
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
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>Baralho completo!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} palavras marcadas como conhecidas.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir baralho</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
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
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{w.pt}</div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}` }}>{w.phonetic}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toque para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.pt}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ Eu sei</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Rever →</button>
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
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} corretas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.id !== w.id)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)' }}>{w.pt}</div>
        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.3rem' }}>{w.phonetic}</div>
      </div>
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
          {idx < shuffled.length - 1 ? 'Próxima →' : 'Ver resultado →'}
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
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} corretas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const normalize = (s: string) => s.trim().toLowerCase().replace(/^(o|a|os|as)\s+/, '');
  const isCorrect = normalize(input) === normalize(w.pt);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Escreva a palavra em português:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked} placeholder="Sua resposta em português..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Verificar</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ Correto!' : `✗ A resposta é: ${w.pt}`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{w.phonetic}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Próxima →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioPortuguesB1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <button onClick={() => setMode(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.25rem' }}>← {set.namePt}</button>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vocabulário B1</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.namePt}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} palavras · Escolha um modo de prática</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[{ id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcards', desc: 'Veja cada palavra e sua tradução.' }, { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Múltipla escolha', desc: 'Escolha a tradução correta.' }, { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Escrever a palavra', desc: 'Escreva a palavra em português.' }].map(m => (
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
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Lista de palavras</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.id} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)' }}>{w.pt}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{w.es}</div>
                <div style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)' }}>{w.phonetic}</div>
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
          <Link href="/practica/portugues/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabulário</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabulário · Português B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulário B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 conjuntos temáticos — 80 palavras B1 com fonética. Flashcards, múltipla escolha e escrita.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 16, background: `${COLORMix(1.6)}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.namePt}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} palavras</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Começar →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
