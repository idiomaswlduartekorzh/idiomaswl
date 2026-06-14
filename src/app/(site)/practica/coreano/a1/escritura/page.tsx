'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#534AB7';

interface Task { id: number; title: string; titleRom: string; titleEs: string; emoji: string; topic: string; prompt: string; grammar: string; vocab: { word: string; rom: string; es: string }[]; model: string; modelRom: string; modelEs: string; criteria: string[]; checklist: string[]; }

const TASKS: Task[] = [
  {
    id: 1, emoji: '👋', title: '자기소개', titleRom: 'Jagi sogae', titleEs: 'Presentación personal', topic: '이에요/예요 · 은/는 partícula',
    prompt: 'Escribe una presentación personal en coreano (4–6 oraciones). Incluye: tu nombre, de dónde eres, qué estudias o trabajas y un hobby.',
    grammar: '저는 (yo formal+tema) · ___예요/이에요 (soy ___) · ___을/를 좋아해요 (me gusta ___) · ___에서 살아요 (vivo en ___)',
    vocab: [
      { word: '저는', rom: 'jeoneun', es: 'yo (formal + partícula tema)' },
      { word: '이름이', rom: 'ireum-i', es: 'mi nombre (nombre + partícula sujeto)' },
      { word: '___예요/이에요', rom: '___yeyo/ieyo', es: 'soy ___ / es ___' },
      { word: '___에서 살아요', rom: '___eseo sarayo', es: 'vivo en ___' },
      { word: '___를 좋아해요', rom: '___reul joahaeyo', es: 'me gusta ___' },
      { word: '취미는', rom: 'chwimi-neun', es: 'mi hobby es' },
    ],
    model: '안녕하세요! 저는 카르멘이에요. 저는 콜롬비아 사람이에요. 보고타에서 살아요. 저는 대학생이에요. 경제학을 공부해요. 취미는 음악이에요. 한국어도 배우고 있어요. 만나서 반가워요!',
    modelRom: 'Annyeonghaseyo! Jeoneun Carmen-ieyo. Jeoneun Kolombiya saram-ieyo. Bogota-eseo sarayo. Jeoneun daehaksaeng-ieyo. Gyeongjehak-eul gongbu-haeyo. Chwimi-neun eumak-ieyo. Hangugeo-do baeugo isseoyo. Mannaseo bangawoyo!',
    modelEs: '¡Hola! Soy Carmen. Soy colombiana. Vivo en Bogotá. Soy universitaria. Estudio economía. Mi hobby es la música. También estoy aprendiendo coreano. ¡Mucho gusto!',
    criteria: ['Usar 저는 para "yo"', 'Copula 이에요/예요 para identidad', 'Al menos un verbo en -아/어요', 'Mencionar hobby o interés'],
    checklist: ['Nombre con ___예요/이에요', 'País/origen con ___ 사람이에요', 'Ciudad/lugar con ___에서 살아요', 'Ocupación (학생/직장인)', 'Hobby o interés personal'],
  },
  {
    id: 2, emoji: '👨‍👩‍👧', title: '우리 가족 소개', titleRom: 'Uri gajok sogae', titleEs: 'Mi familia', topic: '있어요/없어요 · -살이에요',
    prompt: 'Describe a tu familia en coreano (4–6 oraciones). Incluye: cuántos son, quiénes hay, edades o profesiones de 2 personas.',
    grammar: '가족이 ___명이에요 (en familia somos ___) · ___이/가 있어요 (tengo/hay ___) · ___살이에요 (tiene ___ años) · 직업 (profesión)',
    vocab: [
      { word: '가족', rom: 'gajok', es: 'familia' },
      { word: '___명이에요', rom: '___myeong-ieyo', es: 'somos ___ personas' },
      { word: '___이/가 있어요', rom: '___i/ga isseoyo', es: 'hay/tengo ___' },
      { word: '___살이에요', rom: '___sal-ieyo', es: 'tiene ___ años' },
      { word: '___을 해요', rom: '___eul haeyo', es: 'hace/trabaja como ___' },
      { word: '이름이 ___예요', rom: 'ireum-i ___yeyo', es: 'se llama ___' },
    ],
    model: '우리 가족은 다섯 명이에요. 아빠, 엄마, 오빠, 남동생, 그리고 저예요. 아빠는 회사원이에요. 마흔다섯 살이에요. 엄마는 선생님이에요. 남동생은 열여섯 살이에요. 가족이 정말 소중해요!',
    modelRom: 'Uri gajok-eun daseos myeong-ieyo. Appa, eomma, oppa, namdongsaeng, geurigo jeo-yeyo. Appa-neun hoesawon-ieyo. Maheundaseos sal-ieyo. Eomma-neun seonsaengnim-ieyo. Namdongsaeng-eun yeollyeoseos sal-ieyo. Gajok-i jeongmal sojunghaeeyo!',
    modelEs: 'En mi familia somos cinco. Papá, mamá, hermano mayor, hermano menor y yo. Mi papá es empleado de oficina. Tiene 45 años. Mi mamá es profesora. Mi hermano menor tiene 16 años. ¡La familia es muy preciada!',
    criteria: ['Indicar número de miembros con 명이에요', 'Usar 이/가 있어요 para existencia', 'Incluir edades con 살이에요', 'Mencionar profesión de al menos uno'],
    checklist: ['Número de personas en la familia', 'Quiénes componen la familia', 'Profesión de al menos 1 persona', 'Edad de al menos 1 persona', 'Frase de cierre o sentimiento'],
  },
  {
    id: 3, emoji: '🏙️', title: '내 도시', titleRom: 'Nae dosi', titleEs: 'Mi ciudad', topic: '에 있어요 · 이/가 있어요/없어요',
    prompt: 'Describe tu ciudad en coreano (4–6 oraciones). Usa 있어요 y 없어요 para describir qué hay y qué no hay.',
    grammar: '___에 있어요 (está en ___) · 크고 (grande y) · 작고 (pequeño y) · ___이/가 있어요 (hay ___) · ___이/가 없어요 (no hay ___)',
    vocab: [
      { word: '도시', rom: 'dosi', es: 'ciudad' },
      { word: '크다 → 커요', rom: 'keuda → keoyo', es: 'es grande' },
      { word: '작다 → 작아요', rom: 'jakda → jagayo', es: 'es pequeño/a' },
      { word: '___이/가 있어요', rom: '___i/ga isseoyo', es: 'hay ___' },
      { word: '___이/가 없어요', rom: '___i/ga eopseoyo', es: 'no hay ___' },
      { word: '근처에', rom: 'geuncheo-e', es: 'cerca (de aquí)' },
    ],
    model: '저는 보고타에 살아요. 보고타는 콜롬비아의 수도예요. 도시가 아주 커요. 공원도 있고 박물관도 많아요. 지하철이 없어요. 버스가 있어요. 음식이 맛있어요. 보고타를 좋아해요!',
    modelRom: 'Jeoneun Bogota-e sarayo. Bogota-neun Kolombiya-ui sudo-yeyo. Dosi-ga aju keoyo. Gongwon-do itgo bangmulgwan-do manayo. Jihacheol-i eopseoyo. Beoseu-ga isseoyo. Eumsik-i masisseoyo. Bogota-reul joahaeyo!',
    modelEs: 'Vivo en Bogotá. Bogotá es la capital de Colombia. La ciudad es muy grande. También hay parques y muchos museos. No hay metro. Hay buses. La comida está rica. ¡Me encanta Bogotá!',
    criteria: ['Identificar la ciudad y su país', 'Usar 있어요 para al menos 2 cosas', 'Usar 없어요 para algo ausente', 'Adjetivo descriptivo (크다/작다/좋다)'],
    checklist: ['Nombre de la ciudad', 'País o región', 'Al menos 2 cosas con 있어요', 'Al menos 1 cosa con 없어요', 'Opinión personal de la ciudad'],
  },
  {
    id: 4, emoji: '📅', title: '오늘 일과', titleRom: 'Oneul ilgwa', titleEs: 'Rutina de hoy', topic: '-아/어요 · 에 (hora/lugar)',
    prompt: 'Describe tu día de hoy en coreano (5–6 oraciones). Incluye al menos 3 actividades con hora o momento del día.',
    grammar: '아침에/점심에/저녁에 (mañana/almuerzo/noche) · ___시에 (a las ___h) · 동사-아/어요 (verbos A1)',
    vocab: [
      { word: '아침에', rom: 'achim-e', es: 'en la mañana' },
      { word: '점심에', rom: 'jeomsim-e', es: 'al almuerzo' },
      { word: '저녁에', rom: 'jeonyeok-e', es: 'en la noche' },
      { word: '___시에', rom: '___si-e', es: 'a las ___ en punto' },
      { word: '가요 / 와요', rom: 'gayo / wayo', es: 'voy / vengo' },
      { word: '먹어요', rom: 'meogeoyo', es: 'como' },
    ],
    model: '오늘은 바빠요. 아침 일곱 시에 일어나요. 샤워를 하고 아침밥을 먹어요. 아홉 시에 학교에 가요. 점심에 친구랑 밥을 먹어요. 오후에 도서관에서 공부해요. 저녁에 집에 와요. 밤 열한 시에 자요.',
    modelRom: 'Oneul-eun bappayo. Achim ilgop si-e ireonayo. Syawo-reul hago achimbab-eul meogeoyo. Ahop si-e hakgyo-e gayo. Jeomsim-e chingu-rang bab-eul meogeoyo. Ohu-e doseogwan-eseo gongbu-haeyo. Jeonyeok-e jib-e wayo. Bam yeolhan si-e jayo.',
    modelEs: 'Hoy estoy ocupado/a. Me levanto a las 7 de la mañana. Me ducho y desayuno. A las 9 voy a la escuela. Al almuerzo como con mi amigo/a. En la tarde estudio en la biblioteca. En la noche llego a casa. Me duermo a las 11 de la noche.',
    criteria: ['Al menos 3 verbos en -아/어요', 'Al menos 2 referencias de hora', 'Usar 에서 para lugar de acción', 'Usar 에 para destino o momento temporal'],
    checklist: ['Actividad matutina', 'Actividad de mediodía', 'Actividad vespertina o nocturna', 'Al menos 2 horas específicas', 'Verbos correctos en -아/어요'],
  },
  {
    id: 5, emoji: '🍽️', title: '음식 이야기', titleRom: 'Eumsik iyagi', titleEs: 'Hablando de comida', topic: '좋아해요/싫어해요 · -이/가 맛있어요',
    prompt: 'Escribe sobre tus comidas favoritas y las que no te gustan (4–5 oraciones). Incluye comida coreana y de tu país.',
    grammar: '___를 좋아해요 (me gusta ___) · ___를 싫어해요 (no me gusta ___) · ___이/가 맛있어요 (está rico ___) · ___이/가 매워요 (es picante)',
    vocab: [
      { word: '___를 좋아해요', rom: '___reul joahaeyo', es: 'me gusta ___ (objeto)' },
      { word: '___를 싫어해요', rom: '___reul sireohaeeyo', es: 'no me gusta ___' },
      { word: '맛있어요', rom: 'masisseoyo', es: 'está delicioso / está rico' },
      { word: '맵다 → 매워요', rom: 'maepda → maewoyo', es: 'es picante' },
      { word: '달아요', rom: 'darayo', es: 'es dulce' },
      { word: '자주', rom: 'jaju', es: 'frecuentemente' },
    ],
    model: '저는 음식을 좋아해요. 김치를 정말 좋아해요. 매운데 맛있어요! 라면도 자주 먹어요. 스시를 싫어해요. 콜롬비아 음식도 맛있어요. 아레파는 달고 맛있어요. 음식은 문화예요!',
    modelRom: 'Jeoneun eumsik-eul joahaeyo. Gimchi-reul jeongmal joahaeyo. Maeunde maisseoyo! Ramyeon-do jaju meogeoyo. Seusi-reul sireohaeeyo. Kolombiya eumsik-do maisseoyo. Arepa-neun dalgo maisseoyo. Eumsik-eun munhwa-yeyo!',
    modelEs: 'Me gusta la comida. Me encanta el kimchi. ¡Es picante pero está rico! También como ramen con frecuencia. No me gusta el sushi. La comida colombiana también está rica. La arepa es dulce y rica. ¡La comida es cultura!',
    criteria: ['Usar 좋아해요 para alimentos favoritos', 'Usar 싫어해요 para algo que no gusta', 'Usar 맛있어요 para describir el sabor', 'Mencionar al menos una comida coreana'],
    checklist: ['Al menos 2 comidas favoritas (좋아해요)', 'Al menos 1 comida no favorita (싫어해요)', 'Descripción de sabor (맛있어요/매워요/달아요)', 'Comida coreana mencionada', 'Comida de tu país mencionada'],
  },
];

export default function EscrituraCoreanoA1() {
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [showRom, setShowRom] = useState(false);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const task = activeTask !== null ? TASKS[activeTask] : null;
  const checkCount = Object.values(checklist).filter(Boolean).length;

  function reset() {
    setActiveTask(null); setText(''); setShowModel(false); setShowRom(false);
    setChecklist({}); setSubmitted(false);
  }

  if (task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
            <span>/</span>
            <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', font: 'inherit', padding: 0 }}>✍️ 쓰기</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>{task.emoji} {task.titleEs}</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{task.topic}</p>
          <h1 style={{ fontSize: '1.7rem', letterSpacing: '-0.03em', margin: '0 0 0.35rem', fontWeight: 700 }}>{task.emoji} {task.title} — {task.titleEs}</h1>
          <p style={{ color: 'var(--muted)', margin: '0 0 1.75rem', fontSize: '0.94rem', lineHeight: 1.6 }}>{task.prompt}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="wl-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Gramática · 문법</div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink)', lineHeight: 1.65 }}>{task.grammar}</p>
            </div>
            <div className="wl-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>단어장 · Vocabulario</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {task.vocab.map(v => (
                  <div key={v.word} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.8rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{v.word}</span>
                    <span style={{ color: COLOR, fontSize: '0.7rem', fontStyle: 'italic' }}>({v.rom})</span>
                    <span style={{ color: 'var(--muted)' }}>— {v.es}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>한국어로 써요 (hangul o romanización):</label>
            <textarea value={text} onChange={e => setText(e.target.value)} disabled={submitted} rows={7}
              placeholder="안녕하세요! 저는...  o  Annyeonghaseyo! Jeoneun..."
              style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 12, resize: 'vertical', border: `1.5px solid ${submitted ? `${COLOR}44` : 'var(--line-soft)'}`, background: submitted ? `${COLOR}06` : 'var(--bg)', color: 'var(--ink)', fontSize: '0.98rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
          </div>

          {!submitted ? (
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <button className="btn btn-sm" disabled={text.trim().length < 10} onClick={() => setSubmitted(true)} style={{ ...(text.trim().length >= 10 ? { background: COLOR, borderColor: COLOR } : {}) }}>제출하기 ✓</button>
              <button className="btn btn-ghost btn-sm" onClick={reset}>← 다른 과제</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>체크리스트 · Verificación</div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: checkCount === task.checklist.length ? '#059669' : 'var(--muted)' }}>{checkCount}/{task.checklist.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {task.checklist.map((item, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.88rem', color: checklist[i] ? '#059669' : 'var(--ink)' }}>
                      <input type="checkbox" checked={!!checklist[i]} onChange={e => setChecklist(p => ({ ...p, [i]: e.target.checked }))} style={{ accentColor: '#059669', width: 16, height: 16, flexShrink: 0 }} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              <div className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>모범 답안 · Modelo</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setShowRom(!showRom)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem' }}>{showRom ? 'Ocultar rom.' : '🔤 Ver romanización'}</button>
                    <button onClick={() => setShowModel(!showModel)} className={showModel ? 'btn btn-ghost btn-sm' : 'btn btn-sm'} style={{ fontSize: '0.72rem', ...(showModel ? {} : { background: COLOR, borderColor: COLOR }) }}>{showModel ? 'Ocultar modelo' : 'Ver modelo'}</button>
                  </div>
                </div>
                {showModel && (
                  <div>
                    <p style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.8 }}>{task.model}</p>
                    {showRom && <p style={{ margin: '0 0 0.4rem', fontSize: '0.82rem', color: COLOR, lineHeight: 1.65, fontStyle: 'italic' }}>{task.modelRom}</p>}
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{task.modelEs}</p>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => { setText(''); setSubmitted(false); setChecklist({}); }}>다시 쓰기</button>
                <button className="btn btn-ghost btn-sm" onClick={reset}>← 모든 과제</button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ 쓰기 · Escritura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />쓰기 · Escritura Coreano A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 2rem' }}>5 tareas con banco de vocabulario, modelo con romanización y checklist de autoevaluación. Puedes escribir en hangul o romanización.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map((t, i) => (
            <button key={t.id} onClick={() => { setActiveTask(i); setText(''); setSubmitted(false); setChecklist({}); setShowModel(false); }} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', flexShrink: 0 }}>{t.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.1rem' }}>{t.title} ({t.titleRom}) — {t.titleEs}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic} · {t.checklist.length} criterios</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700, fontSize: '1.1rem', flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
