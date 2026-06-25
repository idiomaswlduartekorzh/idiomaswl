'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#534AB7';

interface WritingTask {
  id: number;
  title: string;
  titleKo: string;
  topic: string;
  prompt: string;
  model: string;
  modelRomaja: string;
  criteria: string[];
  vocab: string[];
  checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1,
    title: 'Carta a un amigo',
    titleKo: '친구에게 편지 쓰기',
    topic: '-(으)면 + 과거시제',
    prompt: 'Escribe una carta informal a tu amigo/a coreano/a contando cómo pasaste las últimas vacaciones. Cuenta adónde fuiste, qué hiciste y qué te gustó más. Usa estructuras como -(으)면, -았/었-, -고 싶었다 y vocabulario de viajes B1.',
    model: '안녕, 지민아! 나 지난 방학 때 제주도에 다녀왔어. 처음에 비행기 타는 게 조금 무서웠지만, 막상 가니까 너무 좋았어. 첫날에는 한라산에 올라갔는데, 생각보다 힘들었어. 그래도 정상에서 보이는 경치가 정말 아름다웠어. 둘째 날에는 해변에서 수영도 하고 해산물도 먹었어. 만약 네가 같이 갔더라면 훨씬 더 재미있었을 텐데. 다음에는 같이 가면 좋겠어! 빨리 보고 싶다. 카를로스가.',
    modelRomaja: 'Annyeong, Jimina! Na jinan banghaek ttae Jejudo-e danyeowasseo. Cheoeum-e bihaenggi taneun ge jogeum museowotjiman, makssang ganikka neomu joasseo. Cheotnare Hallasan-e ollagassneunde, saenggakboda himdeureosseo. Geuraedo jeongsang-eseo boineun gyeongchi-ga jeongmal areumdaweosseo.',
    criteria: ['Estructura -(으)면 correcta', 'Pasado con -았/었- bien conjugado', 'Registro informal con amigo (해요체 → 해체)', 'Mínimo 100 palabras'],
    vocab: ['다녀오다 — ir y volver', '막상 — en realidad/llegado el momento', '정상 — cumbre/cima', '경치 — paisaje/vista', '훨씬 — mucho más', '~더라면 — si hubiera ~'],
    checklist: ['¿Usé el pasado -았/었- correctamente?', '¿El tono es informal (해체)?', '¿Usé alguna estructura condicional?', '¿El texto tiene mínimo 100 palabras?', '¿Mencioné actividades específicas del viaje?'],
  },
  {
    id: 2,
    title: 'Presentación personal',
    titleKo: '자기소개',
    topic: '-(으)ㄹ 수 있다 + -(으)려고',
    prompt: 'Escribe una presentación personal para un sitio web de intercambio de idiomas. Presenta quién eres, dónde vives, qué estudias/trabajas, tus aficiones y por qué quieres practicar coreano. Usa -(으)ㄹ 수 있다 y -(으)려고 하다 para expresar capacidades y planes.',
    model: '안녕하세요! 저는 콜롬비아 출신의 카를로스라고 합니다. 현재 보고타에 살고 있고, 대학교에서 국제무역을 공부하고 있습니다. 취미는 독서와 요리입니다. 한국 드라마를 보다가 한국어에 관심이 생겨서 혼자 공부하기 시작했습니다. 지금은 간단한 대화는 할 수 있지만, 아직 복잡한 문법이 어렵습니다. 앞으로 한국에 유학을 가려고 합니다. 그래서 회화 실력을 높이려고 언어 교환 파트너를 찾고 있습니다. 스페인어를 배우고 싶으신 분이 계시면 연락해 주세요!',
    modelRomaja: 'Annyeonghaseyo! Jeoneun Konlombia chulsin-ui Kareulloseuraго hamnida. Hyeonjae Bogotae salgo itgo, daehakgyo-eseo gukje-muyeok-eul gongbu-hago itseumnida. Chwimi-neun dokseo-wa yori-imnida. Han-guk deurama-reul boda-ga han-gug-eo-e gwansim-i saenggyeoseo...',
    criteria: ['-(으)ㄹ 수 있다/없다 correctamente', '-(으)려고 하다 para planes', 'Registro formal (합쇼체)', 'Mínimo 100 palabras'],
    vocab: ['출신 — ser originario de', '국제무역 — comercio internacional', '관심이 생기다 — surgir interés', '실력을 높이다 — mejorar nivel', '언어 교환 — intercambio lingüístico', '파트너 — compañero/pareja'],
    checklist: ['¿Usé -(으)ㄹ 수 있다 para expresar capacidades?', '¿Usé -(으)려고 하다 para planes futuros?', '¿El registro es formal (합쇼체)?', '¿El texto tiene mínimo 100 palabras?', '¿Expliqué por qué quiero practicar coreano?'],
  },
  {
    id: 3,
    title: 'Mi ciudad favorita',
    titleKo: '내가 좋아하는 도시',
    topic: '-는데 + comparativos',
    prompt: 'Escribe un artículo corto para un blog de viajes describiendo tu ciudad favorita. Compara esa ciudad con otra usando comparativos (더/보다). Usa -는데 para contraste y -(으)ㄹ 것 같다 para opiniones.',
    model: '제가 가장 좋아하는 도시는 카르타헤나입니다. 콜롬비아 북부에 있는 카리브해 연안의 도시인데, 아름다운 식민지 건축물로 유명합니다. 카르타헤나는 보고타보다 훨씬 따뜻하지만, 여름에는 좀 더 덥습니다. 거리가 보고타보다 더 화려하고 색깔이 다양합니다. 역사적인 구시가지는 유네스코 세계문화유산으로 지정되어 있는데, 걸어서 구경하기 딱 좋은 크기입니다. 바다도 있어서 수영도 즐길 수 있습니다. 진정한 라틴아메리카를 느끼고 싶으시면 카르타헤나를 꼭 방문해 보세요!',
    modelRomaja: 'Jega gajang joahaneun dosin-eun Kareuthahena-imnida. Konlombia bukbu-e inneun Karibekhae yeonan-ui dosi-inde, areumdaun singminji geonjungmul-lo yumyeonghamnida. Kareuthahena-neun Bogota-boda hwolssin ttateuthaJiman...',
    criteria: ['Mínimo 3 comparativos con 보다/더', 'Uso correcto de -는데 para contraste', '-(으)ㄹ 것 같다 para opiniones', 'Mínimo 120 palabras'],
    vocab: ['연안 — costa/litoral', '건축물 — edificio/construcción', '화려하다 — ser llamativo/colorido', '구시가지 — casco antiguo', '유네스코 세계문화유산 — Patrimonio UNESCO', '느끼다 — sentir/experimentar'],
    checklist: ['¿Usé 보다 para comparaciones?', '¿Usé -는데 para contrastar ideas?', '¿Describí características específicas de la ciudad?', '¿El texto tiene mínimo 120 palabras?', '¿Recomendé la ciudad al lector?'],
  },
  {
    id: 4,
    title: 'Planes de verano',
    titleKo: '여름 계획',
    topic: '-(으)면 좋겠다 + -(으)ㄹ 것이다',
    prompt: 'Escribe un texto sobre tus planes para el próximo verano. Describe qué harás (-(으)ㄹ 것이다 / -(으)ㄹ 거예요), qué te gustaría hacer idealmente (-(으)면 좋겠다) y qué harías si tuvieras más dinero o tiempo (-(으)면 ~겠는데).',
    model: '이번 여름에는 동남아시아 배낭여행을 갈 것입니다. 먼저 태국에 2주 동안 있을 거예요. 방콕에서 시작해서 치앙마이까지 기차로 이동할 계획입니다. 만약 돈이 더 있으면 베트남도 가고 싶은데, 이번에는 어려울 것 같습니다. 시간이 더 있으면 캄보디아까지 가면 좋겠어요. 앙코르와트를 꼭 보고 싶거든요. 현지 음식도 많이 먹을 것이고, 새로운 친구들도 사귈 거예요. 이번 여름이 정말 특별한 경험이 되었으면 좋겠습니다!',
    modelRomaja: 'Ibeon yeoreum-eneun dongnam-asia baenang-yeohaeng-eul gal geotseumnida. Meonjeo Taegeuk-e 2ju dongan isseul geoyeyo. Bangkok-eseo sijakhaeseo Chiangmai-kkaji gicharo idonghgal gyehoek-imnida. Manyak don-i deo isseumyeon Beteumnam-do gago sip-eunde...',
    criteria: ['-(으)ㄹ 것이다 para planes concretos', '-(으)면 좋겠다 para deseos', 'Condicional con -(으)면 + resultado', 'Mínimo 120 palabras'],
    vocab: ['배낭여행 — viaje de mochilero', '이동하다 — desplazarse/moverse', '현지 — local/del lugar', '사귀다 — hacer amigos', '경험이 되다 — convertirse en experiencia', '거든요 — es que/porque (explicación)'],
    checklist: ['¿Usé -(으)ㄹ 것이다 para planes futuros?', '¿Usé -(으)면 좋겠다 para deseos?', '¿Hay al menos una oración condicional?', '¿El texto tiene mínimo 120 palabras?', '¿Distinguí entre planes reales e ideales?'],
  },
  {
    id: 5,
    title: 'Mi rutina diaria',
    titleKo: '나의 하루 일과',
    topic: '-고 나서 + -는 동안',
    prompt: 'Describe tu rutina diaria típica en un día de trabajo o estudio. Usa -고 나서 (después de ~) y -는 동안 (mientras ~) para describir la secuencia de actividades. Explica también por qué es importante esta rutina para ti. Mínimo 5 actividades diferentes.',
    model: '저는 보통 오전 7시에 일어납니다. 일어나고 나서 먼저 스트레칭을 15분 동안 합니다. 샤워를 하고 나서 아침을 먹습니다. 주로 과일과 시리얼을 먹는데, 아침을 먹는 동안 뉴스를 봅니다. 집을 나가기 전에 오늘 할 일을 수첩에 적습니다. 지하철을 타는 동안 한국어 단어를 외웁니다. 퇴근하고 나서 운동을 30분 동안 합니다. 저녁을 먹고 나서 독서를 하거나 드라마를 봅니다. 자기 전에 내일 준비를 합니다. 이런 루틴 덕분에 하루를 알차게 보낼 수 있습니다.',
    modelRomaja: 'Jeoneun botong ojeon 7si-e ireonarmnida. Ireonanago nase meonjeo seuteurecheong-eul 15bun dongan hamnida. Syaweo-reul hago nase achim-eul meokseumnida. Julio gwail-gwa sirial-eul meongneunde, achim-eul meongneun dongan nyuseureul bwabmnida...',
    criteria: ['Mínimo 3 usos de -고 나서', 'Mínimo 2 usos de -는 동안', 'Secuencia temporal clara', 'Mínimo 120 palabras'],
    vocab: ['스트레칭 — estiramientos', '수첩 — agenda/libreta', '단어를 외우다 — memorizar palabras', '퇴근하다 — salir del trabajo', '알차게 보내다 — aprovechar bien', '덕분에 — gracias a'],
    checklist: ['¿Usé -고 나서 al menos 3 veces?', '¿Usé -는 동안 al menos 2 veces?', '¿La rutina tiene un orden temporal lógico?', '¿El texto tiene mínimo 120 palabras?', '¿Expliqué el beneficio de la rutina?'],
  },
];

export default function EscrituraCreanoB1() {
  const [active, setActive] = useState(0);
  const [showRomaja, setShowRomaja] = useState(false);
  const task = TASKS[active];

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />쓰기 연습 · Coreano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          5 tareas de escritura guiada B1. Cada tarea incluye consigna, modelo con romanización y lista de verificación.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TASKS.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)} style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem', borderRadius: 20, border: `1.5px solid ${active === i ? COLOR : 'var(--line-soft)'}`, background: active === i ? COLOR : 'transparent', color: active === i ? '#fff' : 'var(--muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              {t.id}. {t.title}
            </button>
          ))}
        </div>

        <div style={{ border: `1.5px solid rgba(83,74,183,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', background: `rgba(83,74,183,0.04)` }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>{task.titleKo}</span>
              <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(83,74,183,0.1)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{task.topic}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{task.prompt}</p>
          </div>

          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Modelo de respuesta</div>
              <button onClick={() => setShowRomaja(v => !v)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}>
                {showRomaja ? '▲ Ocultar romaja' : '▼ Ver romaja'}
              </button>
            </div>
            <div style={{ background: 'rgba(83,74,183,0.03)', borderRadius: 10, padding: '1rem 1.1rem', borderLeft: `3px solid rgba(83,74,183,0.3)`, marginBottom: '1rem' }}>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>{task.model}</p>
              {showRomaja && (
                <p style={{ margin: '0.6rem 0 0', fontSize: '0.78rem', color: '#059669', lineHeight: 1.65, fontFamily: 'var(--mono)' }}>{task.modelRomaja}</p>
              )}
            </div>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Vocabulario clave</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.1rem' }}>
              {task.vocab.map((v, i) => (
                <span key={i} style={{ fontSize: '0.76rem', padding: '0.25rem 0.6rem', borderRadius: 8, background: 'rgba(83,74,183,0.07)', color: COLOR, fontWeight: 600 }}>{v}</span>
              ))}
            </div>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Criterios de evaluación</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.2rem' }}>
              {task.criteria.map((c, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>{c}</li>
              ))}
            </ul>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Lista de verificación</div>
            {task.checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                <span style={{ color: COLOR, fontSize: '0.85rem', marginTop: 1 }}>□</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(83,74,183,0.06)', border: '1px solid rgba(83,74,183,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres seguir practicando?</strong> Practica el vocabulario en{' '}
          <Link href="/practica/coreano/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o la gramática en{' '}
          <Link href="/practica/coreano/b1/gramatica" style={{ color: COLOR, fontWeight: 700 }}>Gramática B1</Link>.
        </div>
      </div>
    </section>
  );
}
