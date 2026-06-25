import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Coreano B1 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva B1 de coreano. Diálogos con vocabulario intermedio en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/coreano/b1/escucha' },
};

const COLOR = '#534AB7';

const PLANNED = [
  {
    id: 1, title: '취업 면접 (Entrevista de trabajo)',
    desc: 'Diálogo formal de entrevista de trabajo. Practica las formas condicionales -(으)면, -겠-, la voz pasiva y vocabulario profesional B1.',
    script: '"안녕하세요! 앉으세요. — 감사합니다. — 본인의 경력에 대해 말씀해 주세요. — 네. 저는 마케팅 분야에서 4년간 일했고, 최근에 프로젝트 관리 과정을 수료했습니다. — 팀을 이끌어 본 적이 있으신가요? — 네, 2년 동안 5명으로 구성된 팀을 이끌었습니다. — 현재 직장을 떠나고 싶으신 이유가 무엇인가요? — 새로운 도전을 찾고 있습니다. 귀사가 저에게 성장 기회를 제공해 줄 수 있을 것 같습니다. — 처음 세 달 동안 무엇을 하시겠습니까? — 팀원들과 친해지고, 새로운 소통 전략을 제안하고 싶습니다. — 희망 연봉이 어떻게 되십니까? — 월 350만 원 정도를 기대하고 있습니다. — 이번 주 내로 연락드리겠습니다. 와 주셔서 감사합니다. — 감사합니다. 안녕히 계세요."',
    questions: ['¿Cuántos años trabajó en marketing?', '¿Qué curso completó recientemente?', '¿Ha liderado un equipo? ¿Cuántas personas?', '¿Por qué quiere cambiar de trabajo?', '¿Qué haría en los primeros tres meses?', '¿Cuándo recibirá respuesta?'],
    duration: '~70 seg', accent: 'Coreano estándar (seúl)', wpm: 100,
  },
  {
    id: 2, title: '환경 토론 (Debate ambiental)',
    desc: 'Dos amigos debaten sobre el cambio climático. Practica -(으)면, -아/어야 하다, -기 때문에 y vocabulario medioambiental B1.',
    script: '"한국에서 홍수 뉴스 봤어? 매년 더 심해지고 있잖아. — 응, 정말 걱정돼. 만약 정부가 더 일찍 행동했다면 우리가 이런 상황에 처하지 않았을 텐데. — 개인적인 행동이 도움이 된다고 생각해? — 그렇게 생각해, 하지만 솔직히 말하면, 기업들이 탄소 배출량을 줄인다면 개인의 변화보다 훨씬 더 큰 영향을 미칠 것 같아. — 맞아. 나는 대중교통을 이용하고 플라스틱을 덜 사려고 노력해. — 모든 행동이 중요하지만, 진짜 변화는 정책에서 와야 해. 더 엄격한 환경법이 도입되어야 해. — 동의해. 하지만 정부가 행동할 때까지 우리 모두 할 수 있는 일을 해야 해. — 물론이지. 개인의 책임과 강력한 정부 행동, 둘 다 필요하다고 생각해."',
    questions: ['¿Qué desastre ambiental mencionan?', '¿Qué crítica hacen a los gobiernos?', '¿Qué acciones individuales toma uno de ellos?', '¿Qué tendría más impacto?', '¿En qué están de acuerdo al final?'],
    duration: '~70 seg', accent: 'Coreano conversacional informal', wpm: 102,
  },
  {
    id: 3, title: '여행 계획 (Planear un viaje)',
    desc: 'Dos amigos planean un viaje a Jeju usando -(으)면, -(으)ㄹ 것 같다 y vocabulario de viajes B1.',
    script: '"이번 여름에 여행 가고 싶다. 너는? — 나도! 제주도 어때? — 좋은 생각이야! 지금 예약하면 항공권이 더 저렴할 것 같아. — 나는 한라산도 올라가고 싶고, 해변도 가고 싶어. 숙박은 어떤 걸 선호해? — 호텔보다 게스트하우스가 더 좋을 것 같아. 더 저렴하고 현지 느낌이 나잖아. — 동의해. 이제 저축을 시작해야 할 것 같아. 며칠을 계획하고 있어? — 한 열흘이면 충분할 것 같아. 5일은 제주 시내에서, 5일은 자연 탐방하면 어떨까? — 완벽해. 7월에 가면 날씨가 좋을 것 같아. — 그럼 정해진 거야! 이번 주에 항공권 예약할게."',
    questions: ['¿A qué destino quieren ir?', '¿Por qué conviene reservar ya?', '¿Qué tipo de alojamiento prefieren?', '¿Cuántos días en total?', '¿Cuándo quieren ir?', '¿Quién reservará los billetes?'],
    duration: '~70 seg', accent: 'Coreano informal estándar', wpm: 100,
  },
];

export default function EscuchaCreanoB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />듣기 연습 · Coreano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos B1 en preparación. Los audios se grabarán con hablantes nativos coreanos. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(83,74,183,0.08)`, border: `1px solid rgba(83,74,183,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen -(으)면, -아/어야 하다 y vocabulario B1 esencial.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(83,74,183,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(83,74,183,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>대화 {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(83,74,183,0.08)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>스크립트 (녹음용 텍스트)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(83,74,183,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="ko-KR" label="대화 듣기" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preguntas que se harán</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(83,74,183,0.06)', border: '1px solid rgba(83,74,183,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en coreano ahora?</strong> Practica con los textos de{' '}
          <Link href="/practica/coreano/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/coreano/b1/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral B1</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
