import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Coreano A2 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A2 de coreano. Diálogos con voz nativa en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/coreano/a2/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: '공항에서 (Gonghang-eseo — En el aeropuerto)',
    desc: 'Diálogo en el aeropuerto usando 았/었어요 (pasado) y vocabulario de viajes. Practica coreano formal en contextos reales.',
    script: '"안녕하세요! 마드리드행 비행기 체크인을 하고 싶어요. (Annyeonghaseyo! Madeurideu-haeng bihaenggi chekeu-in-eul hago sipeoyo.) — 네, 여권을 보여 주시겠어요? (Ne, yeogwon-eul boyeo jusigesseoyo?) — 여기 있어요. (Yeogi isseoyo.) — 감사합니다. 짐은 직접 싸셨어요? (Gamsahamnida. Jim-eun jikjeop ssasyeosseoyo?) — 네, 제가 쌌어요. (Ne, jega ssasseoyo.) — 기내 반입 액체가 있으신가요? (Ginae banip aektche-ga isseusingayo?) — 물만 있어요. (Mul-man isseoyo.) — 창가석과 통로석 중 어느 쪽이 좋으세요? (Changgaseok-gwa tongro-seok jung eoneu jjogi joeuseyo?) — 창가석 주세요. (Changgaseok juseyo.) — 네, 비행기는 오후 2시 30분에 C5 탑승구에서 출발합니다. 좋은 여행 되세요! (Ne, bihaenggi-neun ohu 2si 30bun-e C5 tapseunggu-eseo chulbal-hamnida. Joeun yeohaeng doeseyo!) — 감사합니다! (Gamsahamnida!)"',
    questions: ['¿A qué ciudad viaja el pasajero?', '¿Qué documento presenta?', '¿Él mismo hizo el equipaje?', '¿Qué tipo de asiento prefiere?', '¿A qué hora sale el vuelo?', '¿De qué puerta sale?'],
    duration: '~55 seg', accent: 'Coreano estándar (Seúl)', wpm: 90,
  },
  {
    id: 2, title: '취업 면접 (Chwieop Myeonjeop — Entrevista de trabajo)',
    desc: 'Entrevista de trabajo usando 았/었어요 (experiencia pasada) y -(으)려고 해요 (planes futuros). Practica coreano formal.',
    script: '"안녕하세요. 김지수라고 합니다. (Annyeonghaseyo. Kim Jisu rago hamnida.) — 반갑습니다. 앉으세요. (Bangapseumnida. Anjeuseyo.) — 감사합니다. (Gamsahamnida.) — 자기소개를 해 주시겠어요? (Jagisogae-reul hae jusigesseoyo?) — 네, 저는 3년 동안 마케팅 회사에서 일했어요. 많이 배웠는데, 더 도전적인 일을 찾으려고 했어요. (Ne, jeoneun 3-nyeon dong-an maketing hoesa-eseo ilhaesseoyo. Mani baeweonneunde, deo dojeonjeog-in il-eul chaj-euryeogo haesseoyo.) — 왜 우리 회사에 지원하셨어요? (Wae uri hoesa-e jiwon-hasyeosseoyo?) — 귀사가 업계에서 가장 혁신적이라고 생각해서 지원했어요. 저도 성장하고 싶어요. (Gwisa-ga eopgye-eseo gajang hyeogsinjeogirag saenggak-haeseo jiwon-haesseoyo. Jeodo seongjang-hago sipeoyo.) — 알겠습니다. 언제부터 출근할 수 있으세요? (Algesseumnida. Eonjebuto chulgeun-hal su isseuseyeo?) — 다음 주부터 가능합니다. (Daeum jubuto ganeunghamnida.)"',
    questions: ['¿Cuánto tiempo trabajó en la empresa anterior?', '¿Por qué buscó otro trabajo?', '¿Por qué quiere trabajar en esa empresa?', '¿Cuándo puede empezar?'],
    duration: '~55 seg', accent: 'Coreano formal estándar', wpm: 88,
  },
  {
    id: 3, title: '주말 계획 (Jumal Gyehoek — Planes del fin de semana)',
    desc: 'Dos amigos hacen planes usando -(으)려고 해요 y -(으)ㄹ 것 같아요. Practica coreano informal cotidiano.',
    script: '"야, 이번 주말에 뭐 하려고 해? (Ya, ibeon jumal-e mwo haryeogo hae?) — 글쎄... 영화를 보려고 했는데, 너는? (Geulssei... yeonghwa-reul boryeogo haenneunde, neoneun?) — 나도 영화 보고 싶어! 새 한국 영화가 나온 것 같아. (Nado yeonghwa bogo sipeo! Sae hanguk yeonghwa-ga naon geot gata.) — 정말? 몇 시에 볼 수 있어? (Jeongmal? Myeot si-e bol su isseo?) — 오후 3시쯤 어때? 그 전에 점심 먹으려고 해. (Ohu 3-sijjeum eottae? Geu jeon-e jeomsim meog-euryeogo hae.) — 좋아! 어디서 먹으려고 해? (Joa! Eodiseo meog-euryeogo hae?) — 홍대 근처에 새 한식 집이 생긴 것 같던데. 거기 가볼까? (Hongdae geuncheo-e sae hansik jib-i saenggin geot gatdeonde. Geogi gabolgga?) — 완전 좋아! 그럼 토요일 오후 1시에 만나자. (Wanjeon joa! Geureom toyoil ohu 1si-e mannaja.)"',
    questions: ['¿Qué quieren hacer el fin de semana?', '¿A qué hora van a ver la película?', '¿Qué van a hacer antes?', '¿Dónde quieren comer?', '¿A qué hora y qué día van a encontrarse?'],
    duration: '~50 seg', accent: 'Coreano coloquial (Seúl)', wpm: 95,
  },
];

export default function EscuchaCoreanoA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />듣기 (Deutgi) · Coreano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos A2 en preparación. Los audios se grabarán con hablantes nativos coreanos. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts con romanización en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen 았/었어요, -(으)려고 해요 y -(으)ㄹ 것 같아요.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Diálogo {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(3,105,161,0.08)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script (texto que se grabará)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="ko-KR" label="Escuchar script" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preguntas que se harán</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(3,105,161,0.06)', border: '1px solid rgba(3,105,161,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en coreano ahora?</strong> Practica la lectura en voz alta con los textos de{' '}
          <Link href="/practica/coreano/a2/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura A2</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/coreano/a2/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral A2</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
