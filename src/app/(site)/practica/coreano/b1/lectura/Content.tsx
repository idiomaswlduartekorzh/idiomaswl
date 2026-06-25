'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#534AB7';

interface Question { q: string; opts: string[]; ans: number; }
interface Text {
  id: number;
  title: string;
  titleKo: string;
  genre: string;
  level: string;
  text: string;
  textRomaja: string;
  questions: Question[];
}

const TEXTS: Text[] = [
  {
    id: 1,
    title: 'Un viaje a Jeju',
    titleKo: '제주도 여행',
    genre: 'Blog personal',
    level: 'B1',
    text: '지난 여름에 처음으로 제주도에 다녀왔습니다. 제주도는 한국에서 가장 큰 섬으로, 아름다운 자연경관으로 유명합니다. 비행기로 약 한 시간이면 도착할 수 있어서 접근하기 쉽습니다. 첫날에는 한라산 등산을 했는데, 생각보다 힘들었지만 정상에서 보이는 경치가 정말 아름다웠습니다. 둘째 날에는 성산일출봉에 올라 일출을 구경했습니다. 세 번째 날에는 해변에서 수영을 즐기고 해산물 요리를 맛봤습니다. 제주도는 사계절 내내 여행하기 좋은 곳이지만, 특히 봄에는 유채꽃이, 가을에는 억새풀이 아름답다고 합니다. 다음에는 꼭 봄에 다시 가보고 싶습니다.',
    textRomaja: 'Jinan yeoreum-e cheoeum-euro Jejudo-e danyeowatsseumnida. Jejudo-neun Han-guk-eseo gajang keun seom-euro, areumdaun jayeon-gyeonggwan-euro yumyeonghamnida. Bihaenggi-ro yak han sigan-imyeon dochak hal su isseoseo jeobgeunhagi swipsseumnida.',
    questions: [
      { q: '제주도는 한국에서 어떤 곳입니까?', opts: ['가장 오래된 도시', '가장 큰 섬', '가장 높은 산', '가장 유명한 항구'], ans: 1 },
      { q: '비행기로 제주도까지 얼마나 걸립니까?', opts: ['약 30분', '약 한 시간', '약 두 시간', '약 세 시간'], ans: 1 },
      { q: '첫날에 글쓴이는 무엇을 했습니까?', opts: ['해변에서 수영', '성산일출봉 관람', '한라산 등산', '해산물 요리'], ans: 2 },
      { q: '성산일출봉에서 무엇을 했습니까?', opts: ['등산', '수영', '일출 구경', '쇼핑'], ans: 2 },
      { q: '봄에 제주도에서 볼 수 있는 것은 무엇입니까?', opts: ['억새풀', '유채꽃', '단풍', '눈꽃'], ans: 1 },
      { q: '글쓴이는 다음에 제주도를 언제 가고 싶다고 했습니까?', opts: ['여름', '가을', '겨울', '봄'], ans: 3 },
    ],
  },
  {
    id: 2,
    title: 'La importancia del desayuno',
    titleKo: '아침 식사의 중요성',
    genre: 'Artículo de salud',
    level: 'B1',
    text: '많은 사람들이 바쁘다는 이유로 아침 식사를 거르는 경우가 많습니다. 그러나 아침 식사는 하루를 시작하는 데 매우 중요한 역할을 합니다. 아침을 먹으면 뇌에 필요한 에너지가 공급되어 집중력이 높아집니다. 연구에 따르면 아침을 규칙적으로 먹는 사람들이 그렇지 않은 사람들보다 학업 성적이 더 좋은 경향이 있다고 합니다. 또한 아침 식사를 하면 폭식을 예방할 수 있어서 체중 관리에도 도움이 됩니다. 이상적인 아침 식사는 단백질, 탄수화물, 비타민이 균형 있게 포함되어야 합니다. 달걀, 통곡물 빵, 과일 등이 좋은 선택입니다. 시간이 없다면 과일 하나라도 먹고 나가는 것이 아무것도 안 먹는 것보다 훨씬 낫습니다.',
    textRomaja: 'Maneun saram-deuri bappeudaneun iyuro achim sigsa-reul georeun gyeong-u-ga maneumnida. Geureona achim sigsa-neun haru-reul sijak-haneun de maeу jungyohan yeokhal-eul hamnida. Achim-eul meogeumyeon noe-e piryohan eneoji-ga gonggeupdoeeo jibjoengnyeog-i nopajamnida.',
    questions: [
      { q: '많은 사람들이 아침을 거르는 이유는 무엇입니까?', opts: ['입맛이 없어서', '바빠서', '다이어트 때문에', '아침에 일어나기 힘들어서'], ans: 1 },
      { q: '아침 식사를 하면 어떤 효과가 있습니까?', opts: ['키가 커진다', '집중력이 높아진다', '잠이 잘 온다', '스트레스가 줄어든다'], ans: 1 },
      { q: '아침을 규칙적으로 먹는 사람들의 특징은?', opts: ['운동을 더 많이 한다', '잠을 더 많이 잔다', '학업 성적이 더 좋다', '친구가 더 많다'], ans: 2 },
      { q: '아침 식사가 체중 관리에 도움이 되는 이유는?', opts: ['칼로리가 낮아서', '폭식을 예방해서', '운동 의욕을 높여서', '소화가 잘 돼서'], ans: 1 },
      { q: '이상적인 아침 식사에 포함되어야 하는 것은?', opts: ['지방, 설탕, 나트륨', '단백질, 탄수화물, 비타민', '칼슘, 철분, 마그네슘', '카페인, 섬유질, 미네랄'], ans: 1 },
      { q: '시간이 없을 때 가장 좋은 선택은?', opts: ['아무것도 먹지 않기', '커피만 마시기', '과일 하나라도 먹기', '저녁을 많이 먹기'], ans: 2 },
    ],
  },
  {
    id: 3,
    title: 'El sistema de transporte de Seúl',
    titleKo: '서울의 대중교통',
    genre: 'Texto informativo',
    level: 'B1',
    text: '서울의 대중교통은 세계에서 가장 효율적인 시스템 중 하나로 꼽힙니다. 지하철은 9개 노선이 도시 전체를 촘촘하게 연결하고 있으며, 하루 700만 명 이상이 이용합니다. 버스 노선도 매우 발달해 있어서 지하철이 닿지 않는 지역까지 연결합니다. 교통카드 하나로 지하철, 버스, 경전철을 모두 이용할 수 있으며, 환승 시 할인 혜택도 받을 수 있습니다. 요금은 거리에 따라 달라지는데, 기본 요금이 저렴하여 경제적입니다. 또한 카카오맵이나 네이버 지도 앱을 사용하면 최적의 이동 경로를 쉽게 찾을 수 있습니다. 외국인 관광객들도 영어, 중국어, 일본어 안내를 통해 불편 없이 대중교통을 이용할 수 있습니다.',
    textRomaja: 'Seoul-ui daejung-gyotong-eun segye-eseo gajang hyoyuljeog-in siseuttem jung hana-ro kkoppimnida. Jihacheol-eun 9gae noseon-i dosi jeonche-reul chomchomhage yeongyeol-hago isseumyeo, haru 700man myeong isang-i iyonghamnida.',
    questions: [
      { q: '서울 지하철은 몇 개의 노선이 있습니까?', opts: ['5개', '7개', '9개', '11개'], ans: 2 },
      { q: '하루에 지하철을 이용하는 사람은 몇 명입니까?', opts: ['약 100만 명', '약 300만 명', '약 500만 명', '700만 명 이상'], ans: 3 },
      { q: '교통카드로 이용할 수 없는 것은?', opts: ['지하철', '버스', '경전철', '택시'], ans: 3 },
      { q: '환승을 하면 어떤 혜택이 있습니까?', opts: ['무료로 이용 가능', '요금 할인', '좌석 보장', '우선 탑승'], ans: 1 },
      { q: '최적의 이동 경로를 찾을 때 사용할 수 있는 것은?', opts: ['서울 지하철 앱', '카카오맵이나 네이버 지도', '구글 맵만', '관광안내소'], ans: 1 },
      { q: '외국인이 대중교통을 이용할 때 도움이 되는 것은?', opts: ['무료 가이드', '다국어 안내', '특별 할인', '별도 노선'], ans: 1 },
    ],
  },
  {
    id: 4,
    title: 'El trabajo voluntario',
    titleKo: '자원봉사 활동',
    genre: 'Artículo de opinión',
    level: 'B1',
    text: '자원봉사는 개인과 사회 모두에게 큰 이점을 가져다줍니다. 자원봉사를 통해 우리는 지역 사회에 기여하고, 동시에 새로운 기술을 배우고 소중한 경험을 쌓을 수 있습니다. 연구에 따르면 자원봉사 활동을 하는 사람들은 더 높은 행복감과 삶의 만족도를 느끼는 경향이 있다고 합니다. 특히 외로움을 느끼는 노인들을 돕거나, 환경 보호 활동에 참여하는 것이 효과적입니다. 그러나 자원봉사를 할 때는 자신의 시간과 에너지를 잘 관리하는 것이 중요합니다. 무리하게 참여하면 오히려 번아웃이 올 수 있습니다. 자신에게 맞는 봉사 활동을 찾아서 꾸준히 참여하는 것이 가장 좋습니다.',
    textRomaja: 'Jawonbongsa-neun gaein-gwa sahoe modu-ege keun iyeom-eul gajyeodajumnida. Jawonbongsa-reul tonghae uri-neun jiyeok sahoe-e giyeohago, dongsie saeroun gisul-eul baeugo sojunghan gyeongheom-eul ssaul su isseumnida.',
    questions: [
      { q: '자원봉사는 누구에게 이점을 줍니까?', opts: ['개인에게만', '사회에게만', '개인과 사회 모두에게', '기업에게만'], ans: 2 },
      { q: '자원봉사를 하는 사람들의 특징은?', opts: ['더 높은 수입', '더 높은 행복감', '더 많은 친구', '더 좋은 건강'], ans: 1 },
      { q: '특히 효과적인 자원봉사 활동으로 언급된 것은?', opts: ['어린이 교육', '노인 돕기', '병원 봉사', '해외 원조'], ans: 1 },
      { q: '자원봉사를 할 때 중요한 것은 무엇입니까?', opts: ['많은 시간 투자', '시간과 에너지 관리', '전문 기술 보유', '팀원과의 협동'], ans: 1 },
      { q: '무리하게 봉사 활동에 참여하면 어떤 문제가 생길 수 있습니까?', opts: ['경제적 어려움', '번아웃', '인간관계 문제', '건강 악화'], ans: 1 },
      { q: '가장 좋은 봉사 활동 참여 방법은?', opts: ['최대한 많이 참여하기', '단기간만 참여하기', '자신에게 맞는 활동 꾸준히 참여', '여러 곳을 번갈아 참여하기'], ans: 2 },
    ],
  },
  {
    id: 5,
    title: 'La comida coreana en el mundo',
    titleKo: '세계 속의 한국 음식',
    genre: 'Artículo cultural',
    level: 'B1',
    text: '최근 몇 년 사이에 한국 음식이 세계적으로 큰 인기를 끌고 있습니다. 김치, 비빔밥, 불고기, 떡볶이 등이 세계 각국에서 사랑받고 있습니다. 이러한 한식의 세계화는 한류, 즉 한국 대중문화의 전 세계적인 인기와 함께 이루어졌습니다. 한국 드라마와 K-팝 덕분에 많은 외국인들이 한국 음식에 관심을 갖게 되었고, 유튜브에서 한식 조리법을 찾아보는 사람들도 급격히 늘었습니다. 한식의 매력 중 하나는 건강에 좋은 재료와 발효 식품을 많이 사용한다는 점입니다. 김치는 유산균이 풍부하여 건강에 매우 좋다고 알려져 있습니다. 앞으로도 한식은 계속해서 세계인들의 식탁에 오를 것으로 기대됩니다.',
    textRomaja: 'Choegeun myeot nyeon saie Han-guk eumsig-i segyejeog-euro keun ingi-reul kkeulgo isseumnida. Kimchi, bibimbap, bulgogi, tteokbokki deung-i segye gak-guk-eseo sarang-bakgo isseumnida.',
    questions: [
      { q: '최근 세계에서 어떤 변화가 일어나고 있습니까?', opts: ['한국어 학습자 증가', '한국 음식의 인기 상승', '한국 관광객 감소', '한국 기업의 성장'], ans: 1 },
      { q: '한식의 세계화와 함께 이루어진 것은 무엇입니까?', opts: ['한국 경제 성장', '한류의 전 세계적 인기', '한국 이민자 증가', '한국 기술 수출'], ans: 1 },
      { q: '많은 외국인들이 한국 음식에 관심을 갖게 된 계기는?', opts: ['한국 영화와 K-팝', '한국 드라마와 K-팝', '한국 스포츠 스타', '한국 여행'], ans: 1 },
      { q: '유튜브에서 한식 관련 어떤 변화가 있었습니까?', opts: ['한식 채널 수 감소', '조리법을 찾는 사람 급증', '한식 유튜버 논란', '레시피 저작권 문제'], ans: 1 },
      { q: '한식의 매력 중 하나는 무엇입니까?', opts: ['빠른 조리 시간', '건강한 재료와 발효 식품', '저렴한 가격', '화려한 색감'], ans: 1 },
      { q: '김치가 건강에 좋은 이유는?', opts: ['비타민 C 풍부', '유산균이 풍부', '단백질이 높음', '저칼로리'], ans: 1 },
    ],
  },
];

export default function LecturaCreanoB1() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);
  const [showRomaja, setShowRomaja] = useState(false);
  const text = TEXTS[activeIdx];

  function answer(qIdx: number, opt: number) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [`${activeIdx}-${qIdx}`]: opt }));
  }

  function checkAnswers() { setChecked(true); }

  function reset() {
    setChecked(false);
    setAnswers({});
  }

  const score = checked ? text.questions.filter((q, i) => answers[`${activeIdx}-${i}`] === q.ans).length : null;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />읽기 연습 · Coreano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          5 textos B1 en coreano (120-150 palabras cada uno) con 6 preguntas de comprensión. Incluye romanización opcional.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => { setActiveIdx(i); reset(); }} style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem', borderRadius: 20, border: `1.5px solid ${activeIdx === i ? COLOR : 'var(--line-soft)'}`, background: activeIdx === i ? COLOR : 'transparent', color: activeIdx === i ? '#fff' : 'var(--muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              {t.id}. {t.title}
            </button>
          ))}
        </div>

        <div style={{ border: `1.5px solid rgba(83,74,183,0.2)`, borderRadius: 18, overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem 1.5rem', background: `rgba(83,74,183,0.04)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{text.titleKo}</span>
              <span style={{ marginLeft: '0.6rem', fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{text.genre} · {text.level}</span>
            </div>
            <button onClick={() => setShowRomaja(v => !v)} style={{ fontSize: '0.72rem', padding: '0.25rem 0.65rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}>
              {showRomaja ? '▲ Ocultar romaja' : '▼ Ver romaja'}
            </button>
          </div>
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ margin: 0, fontSize: '0.93rem', color: 'var(--ink)', lineHeight: 1.85 }}>{text.text}</p>
            {showRomaja && (
              <p style={{ margin: '0.8rem 0 0', fontSize: '0.78rem', color: '#059669', lineHeight: 1.7, fontFamily: 'var(--mono)', borderTop: '1px solid var(--line-soft)', paddingTop: '0.75rem' }}>{text.textRomaja}</p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {text.questions.map((q, qi) => {
            const sel = answers[`${activeIdx}-${qi}`];
            return (
              <div key={qi} style={{ border: '1.5px solid var(--line-soft)', borderRadius: 14, padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', marginBottom: '0.6rem' }}>{qi + 1}. {q.q}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    let bg = 'transparent'; let border = 'var(--line-soft)'; let col = 'var(--muted)';
                    if (checked) {
                      if (oi === q.ans) { bg = 'rgba(5,150,105,0.1)'; border = '#059669'; col = '#059669'; }
                      else if (sel === oi) { bg = 'rgba(220,38,38,0.1)'; border = '#dc2626'; col = '#dc2626'; }
                    } else if (sel === oi) { bg = 'rgba(83,74,183,0.1)'; border = COLOR; col = COLOR; }
                    return (
                      <button key={oi} onClick={() => answer(qi, oi)} style={{ textAlign: 'left', padding: '0.5rem 0.85rem', borderRadius: 9, border: `1.5px solid ${border}`, background: bg, color: col, fontSize: '0.84rem', cursor: checked ? 'default' : 'pointer', fontWeight: sel === oi ? 600 : 400, transition: 'all 0.15s' }}>
                        {String.fromCharCode(65 + oi)}. {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button onClick={checkAnswers} disabled={Object.keys(answers).filter(k => k.startsWith(`${activeIdx}-`)).length < text.questions.length} style={{ padding: '0.65rem 1.5rem', borderRadius: 12, background: COLOR, color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', opacity: Object.keys(answers).filter(k => k.startsWith(`${activeIdx}-`)).length < text.questions.length ? 0.5 : 1 }}>
            Comprobar respuestas
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '0.75rem 1.25rem', borderRadius: 12, background: score! >= 4 ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)', border: `1.5px solid ${score! >= 4 ? '#059669' : '#dc2626'}`, fontWeight: 700, color: score! >= 4 ? '#059669' : '#dc2626', fontSize: '0.95rem' }}>
              {score}/{text.questions.length} correctas {score! >= 5 ? '🎉' : score! >= 3 ? '👍' : '📚'}
            </div>
            <button onClick={reset} style={{ padding: '0.65rem 1.2rem', borderRadius: 12, border: `1.5px solid ${COLOR}`, background: 'transparent', color: COLOR, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              Reintentar
            </button>
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(83,74,183,0.06)', border: '1px solid rgba(83,74,183,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres seguir practicando?</strong> Trabaja el vocabulario en{' '}
          <Link href="/practica/coreano/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o la gramática en{' '}
          <Link href="/practica/coreano/b1/gramatica" style={{ color: COLOR, fontWeight: 700 }}>Gramática B1</Link>.
        </div>
      </div>
    </section>
  );
}
