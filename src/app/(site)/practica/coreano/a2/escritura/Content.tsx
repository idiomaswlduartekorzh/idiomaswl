'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; titleKo: string; topic: string;
  prompt: string; model: string; modelRomaja: string; criteria: string[];
  vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1, title: '지난 주말', titleKo: 'Jinan jumal (El fin de semana pasado)', topic: '았/었어요 (pasado)',
    prompt: '지난 주말에 무엇을 했어요? 5-6 문장으로 써 보세요. 어디에 갔어요? 누구와 함께 있었어요? 무엇을 먹거나 봤어요? (¿Qué hiciste el fin de semana pasado? Escribe 5-6 oraciones. ¿Adónde fuiste? ¿Con quién estuviste? ¿Qué comiste o viste?)',
    model: '지난 주말에 친구들과 서울 명동에 갔어요. 토요일 아침에 일찍 일어났어요. 날씨가 정말 좋았어요. 점심에 삼겹살을 먹었어요. 쇼핑도 했어요. 집에 늦게 돌아왔는데 정말 즐거운 하루였어요.',
    modelRomaja: 'Jinan jumal-e chingudeul-gwa Seoul Myeongdong-e gasseoyo. Toyoil achim-e ilccik ireonasseoyo. Nalssi-ga jeongmal joasseoyo. Jeomsim-e samgyeopsal-eul meogeosseoyo. Shopping-do haesseoyo. Jib-e neutge dorawassneunde jeongmal jeulgeoun haru yeosseoyo.',
    criteria: ['Usa al menos 4 verbos en pasado 았/었어요', 'Incluye expresiones de tiempo (지난 주말, 토요일, 점심에)', 'Menciona al menos una persona o lugar', 'Usa 도 (también) o 그런데 (pero/sin embargo) para conectar ideas'],
    vocab: ['지난 주말에 (el fin de semana pasado)', '토요일/일요일 (sábado/domingo)', '아침/점심/저녁에 (en la mañana/tarde/noche)', '갔어요 (fui)', '먹었어요 (comí)', '봤어요 (vi)', '만났어요 (me encontré con)', '즐거웠어요 (fue divertido)'],
    checklist: ['¿Todos los verbos terminan en 았/었어요?', '¿Las vocales del stem determinan 았 (ㅏ/ㅗ) o 었 (otras)?', '¿Usaste marcadores de tiempo?', '¿Las oraciones fluyen con conectores?'],
  },
  {
    id: 2, title: '나의 현재와 미래 계획', titleKo: 'Naye hyeonjae-wa mirae gyehoek (Mi presente y planes)', topic: '고 있어요 + (으)려고 해요',
    prompt: '지금 하고 있는 일이나 공부를 소개하고, 미래 계획도 써 보세요. 5-6 문장으로 쓰세요. (Presenta lo que estás haciendo ahora y escribe también tus planes futuros. 5-6 oraciones.)',
    model: '저는 지금 서울에서 한국어를 공부하고 있어요. 매일 두 시간씩 공부하고 있어요. 주말에는 한국 친구들과 대화 연습을 하고 있어요. 내년에 TOPIK 시험을 보려고 해요. 그리고 한국 회사에서 일하려고 해요. 열심히 공부할 거예요!',
    modelRomaja: 'Jeoneun jigeum Seoul-eseo hangugeo-reul gongbuhago isseoyo. Maeil du sigan-ssik gongbuhago isseoyo. Jumal-eneun hanguk chingudeul-gwa daehwa yeonseup-eul hago isseoyo. Naenyeon-e TOPIK siheom-eul boryeogo haeyo. Geurigo hanguk hoesa-eseo ilharyeogo haeyo.',
    criteria: ['Usa 고 있어요 para al menos 2 actividades en curso', 'Usa (으)려고 해요 para al menos 2 planes futuros', 'Incluye marcadores de tiempo (지금, 매일, 내년에)', 'Termina con una expresión de motivación o compromiso'],
    vocab: ['지금 (ahora)', '매일 (todos los días)', '공부하고 있어요 (estoy estudiando)', '일하고 있어요 (estoy trabajando)', '내년에 (el próximo año)', '(으)려고 해요 (tengo planeado/pienso)', '열심히 (con esfuerzo/diligentemente)'],
    checklist: ['¿Usaste 고 있어요 para acciones en progreso?', '¿Usaste (으)려고 해요 para planes e intenciones?', '¿Diferenciaste el presente continuo del futuro?', '¿El texto tiene 5-6 oraciones coherentes?'],
  },
  {
    id: 3, title: '두 도시 비교', titleKo: 'Du dosi bigyo (Comparar dos ciudades)', topic: '보다 더 + (으)ㄹ 것 같다',
    prompt: '두 도시나 두 나라를 비교해 보세요. 비슷한 점과 다른 점을 5-6 문장으로 쓰세요. (Compara dos ciudades o países. Escribe 5-6 oraciones sobre similitudes y diferencias.)',
    model: '서울과 부산은 한국의 두 큰 도시예요. 서울은 부산보다 더 크고 복잡해요. 그런데 부산은 서울보다 바다가 더 가까워요. 음식도 조금 다른 것 같아요. 부산 해산물이 더 신선할 것 같아요. 저는 서울보다 부산이 더 좋을 것 같아요.',
    modelRomaja: 'Seoul-gwa Busan-eun Hangug-ui du keun dosi-yeyo. Seoul-eun Busan-boda deo keugo bokjap-aeyo. Geureonde Busan-eun Seoul-boda bada-ga deo gakkawo-yo. Eumsik-do jokeum dareun geot gat-ayo. Busan haesanmul-i deo sinseonal geot gat-ayo.',
    criteria: ['Usa ~보다 더 al menos 3 veces para comparar', 'Usa (으)ㄹ 것 같아요 para al menos una conjetura/opinión', 'Menciona tanto similitudes como diferencias', 'Expresa tu preferencia personal al final'],
    vocab: ['보다 (que/comparativo)', '더 (más)', '덜 (menos)', '비슷해요 (es similar)', '달라요 (es diferente)', '것 같아요 (parece que / creo que)', '그런데 (sin embargo/pero)', '그래도 (aun así)'],
    checklist: ['¿Usaste A보다 B가 더 correctamente?', '¿Usaste -(으)ㄹ 것 같아요 para opiniones o predicciones?', '¿La estructura tiene contraste (그런데/하지만)?', '¿Incluiste tu opinión personal?'],
  },
  {
    id: 4, title: '방학 계획', titleKo: 'Banghak gyehoek (Planes de vacaciones)', topic: '(으)려고 해요 + -(으)ㄹ 것 같아요',
    prompt: '이번 방학이나 다음 휴가 계획을 5-6 문장으로 써 보세요. (Escribe tus planes para estas vacaciones o las próximas. 5-6 oraciones.)',
    model: '이번 여름 방학에 제주도에 가려고 해요. 친구 두 명이랑 같이 가려고 해요. 제주도에서 한라산을 등산하려고 해요. 날씨가 좋을 것 같아요. 해산물도 많이 먹을 것 같아요. 정말 즐거운 방학이 될 것 같아요!',
    modelRomaja: 'Ibeon yeoreum banghak-e Jeju-do-e garyeogo haeyo. Chingu du myeong-irang gachi garyeogo haeyo. Jeju-do-eseo Hallasan-eul deungsanharyeogo haeyo. Nalssi-ga joeul geot gat-ayo. Haesanmul-do mani meogeul geot gat-ayo.',
    criteria: ['Usa (으)려고 해요 para al menos 3 planes concretos', 'Usa (으)ㄹ 것 같아요 para al menos 2 predicciones', 'Incluye quién, adónde y qué actividades', 'Cierra con una expresión de expectativa o emoción'],
    vocab: ['이번 방학에 (en estas vacaciones)', '다음 휴가에 (en las próximas vacaciones)', '(으)려고 해요 (tengo planeado)', '-(으)ㄹ 것 같아요 (creo que / parece que)', '같이 (juntos)', '정말 즐거울 것 같아요 (creo que será muy divertido)'],
    checklist: ['¿Usaste (으)려고 해요 para planes decididos?', '¿Usaste (으)ㄹ 것 같아요 para predicciones y anticipación?', '¿Incluiste detalles (quién, dónde, qué)?', '¿El tono es entusiasta y personal?'],
  },
  {
    id: 5, title: '나의 하루 설명', titleKo: 'Naye haru seolmyeong (Explicando mi día)', topic: '-아/어서 (causa/secuencia)',
    prompt: '어제 하루를 설명해 보세요. 각 활동 사이의 이유나 순서를 -아/어서로 연결하세요. 5-6 문장. (Describe tu día de ayer. Usa -아/어서 para conectar las actividades con causa o secuencia. 5-6 oraciones.)',
    model: '어제 피곤해서 늦게 일어났어요. 일어나서 바로 샤워를 했어요. 배가 고파서 아침을 빨리 먹었어요. 지하철을 타서 학교에 갔어요. 수업이 재미있어서 집중했어요. 집에 와서 바로 잠이 들었어요.',
    modelRomaja: 'Eoje pigonhaeoseo neutge ireonasseoyo. Ireona-seo baro syawo-reul haesseoyo. Bae-ga gopaseo achim-eul ppalli meogeosseoyo. Jihacheol-eul taseo hakgyo-e gasseoyo. Sueop-i jaemiisseoseo jipjung-haesseoyo. Jib-e waseo baro jam-i deureosseoyo.',
    criteria: ['Usa -아/어서 al menos 4 veces (causa o secuencia)', 'Narra los eventos en orden cronológico', 'El tiempo se marca en el ÚLTIMO verbo de cada par', 'Incluye al menos 1 uso de -아/어서 para causa y 1 para secuencia'],
    vocab: ['피곤해서 (porque estaba cansado/a)', '배가 고파서 (porque tenía hambre)', '재미있어서 (porque era interesante)', '일어나서 (levantándome, luego)', '학교에 가서 (yendo a la escuela, luego)', '집에 와서 (llegando a casa, luego)'],
    checklist: ['¿El tiempo va en el SEGUNDO verbo, no en el primero?', '¿Diferenciaste causa (porque) de secuencia (y luego)?', '¿Cada -아서/어서 conecta dos acciones lógicamente?', '¿El relato es cronológicamente coherente?'],
  },
];

export default function EscrituriaCoreanoA2() {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showRomaja, setShowRomaja] = useState(false);
  const [checkDone, setCheckDone] = useState<Record<number, boolean>>({});

  const task = TASKS.find(t => t.id === taskId);

  function back() { setTaskId(null); setText(''); setSubmitted(false); setShowModel(false); setShowRomaja(false); setCheckDone({}); }

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  if (submitted && task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
            <h2 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡잘 했어요! (Bien hecho)</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Guardado — David o Zhanna pueden revisarlo contigo en clase.</p>
            <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{text}</p>
            </div>
            <button onClick={() => setShowModel(!showModel)} className="btn btn-ghost btn-sm" style={{ marginBottom: '0.75rem' }}>
              {showModel ? '▲ Ocultar modelo' : '▼ Ver texto modelo'}
            </button>
            {showModel && (
              <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, textAlign: 'left', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texto modelo</div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7 }}>{task.model}</p>
                <button onClick={() => setShowRomaja(!showRomaja)} style={{ fontSize: '0.72rem', border: '1px solid var(--line-soft)', borderRadius: 6, padding: '0.15rem 0.5rem', background: 'transparent', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  {showRomaja ? '▲ Ocultar romanización' : '▼ Ver romanización'}
                </button>
                {showRomaja && <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{task.modelRomaja}</p>}
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={back} className="btn" style={{ background: COLOR, borderColor: COLOR, color: '#fff' }}>← Volver a tareas</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <button onClick={back} style={{ fontSize: '0.8rem', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', marginBottom: '1.25rem', padding: 0 }}>← Volver</button>

          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />쓰기 · Tarea {task.id}</p>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.3rem', fontWeight: 700 }}>{task.title}</h2>
          <p style={{ fontSize: '0.82rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700, margin: '0 0 1.25rem' }}>{task.titleKo} · Gramática: {task.topic}</p>

          <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Tarea</div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.6 }}>{task.prompt}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Criterios de evaluación</div>
            {task.criteria.map((c, i) => <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>✓ {c}</p>)}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Vocabulario útil</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {task.vocab.map((v, i) => <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 6, background: `${COLOR}10`, color: COLOR, fontFamily: 'var(--mono)' }}>{v}</span>)}
            </div>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Escribe aquí en Hangul o romanización... (예: 지난 주말에 친구와 함께...)"
            style={{ width: '100%', minHeight: 160, padding: '0.9rem 1rem', borderRadius: 12, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none', marginBottom: '0.5rem' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{words} palabras</span>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Checklist de revisión</div>
            {task.checklist.map((item, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={!!checkDone[i]} onChange={e => setCheckDone(prev => ({ ...prev, [i]: e.target.checked }))} style={{ marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: checkDone[i] ? COLOR : 'var(--muted)' }}>{item}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => text.trim() && setSubmitted(true)} className="btn" style={{ background: COLOR, borderColor: COLOR, color: '#fff', opacity: text.trim() ? 1 : 0.5 }}>
              Enviar texto ✓
            </button>
            <button onClick={() => setShowModel(!showModel)} className="btn btn-ghost btn-sm">
              {showModel ? '▲ Ocultar modelo' : '▼ Ver modelo'}
            </button>
          </div>

          {showModel && (
            <div style={{ marginTop: '1rem', padding: '1rem 1.25rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22` }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texto modelo</div>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7 }}>{task.model}</p>
              <button onClick={() => setShowRomaja(!showRomaja)} style={{ fontSize: '0.72rem', border: '1px solid var(--line-soft)', borderRadius: 6, padding: '0.15rem 0.5rem', background: 'transparent', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {showRomaja ? '▲ Ocultar romanización' : '▼ Ver romanización'}
              </button>
              {showRomaja && <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{task.modelRomaja}</p>}
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
          <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />쓰기 (Sseugi) · Coreano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 2rem' }}>
          5 tareas guiadas que practican gramática A2. Cada tarea incluye un modelo en Hangul con romanización, criterios de evaluación y checklist.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign: 'left', padding: '1.2rem 1.4rem', border: '1.5px solid var(--line-soft)', borderRadius: 16, background: 'var(--bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'border-color 0.18s', fontFamily: 'inherit' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${COLOR}15`, color: COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.title} — {t.titleKo}</div>
                <div style={{ fontSize: '0.75rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700, marginTop: '0.15rem' }}>Gramática: {t.topic}</div>
              </div>
              <span style={{ fontSize: '1.1rem', color: COLOR, fontWeight: 700 }}>→</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: `${COLOR}06`, border: `1px solid ${COLOR}18`, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consejo:</strong> Puedes escribir en Hangul o en romanización — ambos son válidos. Los modelos incluyen romanización para que puedas comparar tu pronunciación. Guarda tu texto para revisarlo con David o Zhanna en clase.
        </div>
      </div>
    </section>
  );
}
