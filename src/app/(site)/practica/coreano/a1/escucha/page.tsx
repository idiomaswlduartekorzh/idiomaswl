import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Comprensión Auditiva en Coreano A1 — Ejercicios interactivos gratis | Idiomas WeLearn',
  description: 'Practica comprensión auditiva en coreano nivel A1 con ejercicios de comprensión auditiva con transcripciones. Ejercicios adaptativos, feedback inmediato y progresión pedagógica. Gratis en Idiomas WeLearn.',
  keywords: ['escucha coreano', 'ejercicios de coreano a1', 'coreano a1 gratis', 'aprender coreano', 'practicar coreano online'],
  openGraph: {
    title: 'Comprensión Auditiva en Coreano A1 | Idiomas WeLearn',
    description: 'Ejercicios interactivos de comprensión auditiva en coreano nivel A1. Gratis, adaptativo y con feedback inmediato.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano/a1/escucha' },
}

const COLOR = '#534AB7';

const EXERCISES = [
  {
    id: 1,
    title: '반 소개',
    titleRom: 'Ban sogae',
    titleEs: 'Presentaciones en clase',
    duration: '~30 seg',
    level: 'A1',
    topic: '이에요/예요 · 은/는 · 살이에요',
    script: [
      { speaker: '선생님', text: '안녕하세요! 저는 김지수 선생님이에요. 자기소개 해 주세요.', rom: 'Annyeonghaseyo! Jeoneun Kim Jisu seonsaengnim-ieyo. Jagi sogae hae juseyo.' },
      { speaker: '민준', text: '안녕하세요! 저는 민준이에요. 스무 살이에요. 대학생이에요.', rom: 'Annyeonghaseyo! Jeoneun Minjun-ieyo. Seumu sal-ieyo. Daehaksaeng-ieyo.' },
      { speaker: '아나', text: '안녕하세요! 저는 아나예요. 콜롬비아에서 왔어요. 한국어를 배우고 있어요. 만나서 반가워요!', rom: 'Annyeonghaseyo! Jeoneun Ana-yeyo. Kolombiya-eseo wasseoyo. Hangugeo-reul baeugo isseoyo. Mannaseo bangawoyo!' },
    ],
    questions: [
      { q: '¿Cómo se llama la profesora?', opts: ['민준', '아나', '김지수', '한국'], a: 2 },
      { q: '¿Cuántos años tiene Minjun?', opts: ['19살', '20살', '21살', '22살'], a: 1 },
      { q: '¿De dónde es Ana?', opts: ['한국 (Corea)', '미국 (EE.UU.)', '콜롬비아 (Colombia)', '일본 (Japón)'], a: 2 },
    ],
    glossary: [
      { word: '자기소개', rom: 'jagi sogae', es: 'presentación personal' },
      { word: '해 주세요', rom: 'hae juseyo', es: 'por favor haga ___ (請)' },
      { word: '왔어요', rom: 'wasseoyo', es: 'vine / vengo de (pasado de 오다)' },
      { word: '배우고 있어요', rom: 'baeugo isseoyo', es: 'estoy aprendiendo (presente continuo)' },
    ],
  },
  {
    id: 2,
    title: '편의점에서',
    titleRom: 'Pyeonuijeom-eseo',
    titleEs: 'En la tienda de conveniencia',
    duration: '~35 seg',
    level: 'A1',
    topic: '있어요/없어요 · 얼마예요? · 주세요',
    script: [
      { speaker: '직원', text: '어서 오세요!', rom: 'Eoseo oseyo!' },
      { speaker: '손님', text: '저... 물이 있어요?', rom: 'Jeo... mul-i isseoyo?' },
      { speaker: '직원', text: '네, 있어요. 여기 있어요.', rom: 'Ne, isseoyo. Yeogi isseoyo.' },
      { speaker: '손님', text: '이거 얼마예요?', rom: 'Igeo eolmayeyo?' },
      { speaker: '직원', text: '천오백 원이에요.', rom: 'Cheon-obaek won-ieyo.' },
      { speaker: '손님', text: '그럼 물 두 개랑 이 빵 주세요.', rom: 'Geureom mul du gae-rang i ppang juseyo.' },
      { speaker: '직원', text: '네! 사천오백 원이에요. 감사합니다!', rom: 'Ne! Sacheon-obaek won-ieyo. Gamsahamnida!' },
    ],
    questions: [
      { q: '¿Qué busca el cliente?', opts: ['커피 (café)', '물 (agua)', '빵 (pan)', '라면 (ramen)'], a: 1 },
      { q: '¿Cuánto cuesta el agua?', opts: ['1.000원', '1.500원', '2.000원', '2.500원'], a: 1 },
      { q: '¿Qué compra al final?', opts: ['물 1개', '물 2개와 빵', '물 2개', '빵 1개'], a: 1 },
    ],
    glossary: [
      { word: '어서 오세요', rom: 'eoseo oseyo', es: 'bienvenido/a (saludo en tiendas)' },
      { word: '이거', rom: 'igeo', es: 'esto / este (informal de 이것)' },
      { word: '___개', rom: '___gae', es: '___unidades (contador de objetos)' },
      { word: '그럼', rom: 'geureom', es: 'entonces / en ese caso' },
    ],
  },
  {
    id: 3,
    title: '약속 잡기',
    titleRom: 'Yaksok japgi',
    titleEs: 'Hacer planes',
    duration: '~40 seg',
    level: 'A1',
    topic: '요일 · 시에 · 있어요/없어요 (disponibilidad)',
    script: [
      { speaker: '수진', text: '여보세요? 저 수진이에요!', rom: 'Yeoboseyo? Jeo Sujin-ieyo!' },
      { speaker: '태민', text: '아, 수진아! 어떻게 지내요?', rom: 'A, Sujin-a! Eotteoke jinaeyo?' },
      { speaker: '수진', text: '잘 지내요! 이번 토요일에 시간 있어요?', rom: 'Jal jinaeyo! Ibeon toyoil-e sigan isseoyo?' },
      { speaker: '태민', text: '토요일... 오전에는 없어요. 오후에 있어요.', rom: 'Toyoil... ojeon-e-neun eopseoyo. Ohu-e isseoyo.' },
      { speaker: '수진', text: '그럼 오후 두 시에 카페에서 만나요!', rom: 'Geureom ohu du si-e kape-eseo mannayo!' },
      { speaker: '태민', text: '좋아요! 어떤 카페예요?', rom: 'Joayo! Eotteon kape-yeyo?' },
      { speaker: '수진', text: '학교 앞 카페예요. 거기서 봐요!', rom: 'Hakgyo ap kape-yeyo. Geogiseo bwayo!' },
    ],
    questions: [
      { q: '¿Qué día se quieren ver?', opts: ['금요일 (viernes)', '토요일 (sábado)', '일요일 (domingo)', '월요일 (lunes)'], a: 1 },
      { q: '¿Por qué no puede en la mañana?', opts: ['Está enfermo/a', 'Tiene clase', 'No tiene tiempo', 'Tiene otro plan'], a: 2 },
      { q: '¿Dónde y a qué hora se encuentran?', opts: ['학교에서 1시', '카페에서 2시', '카페에서 3시', '집에서 2시'], a: 1 },
    ],
    glossary: [
      { word: '여보세요', rom: 'yeoboseyo', es: '¡aló! (contestar el teléfono)' },
      { word: '어떻게 지내요?', rom: 'eotteoke jinaeyo?', es: '¿cómo estás? / ¿cómo te va?' },
      { word: '이번', rom: 'ibeon', es: 'este (esta vez / este _____)' },
      { word: '오전/오후', rom: 'ojeon / ohu', es: 'mañana (AM) / tarde (PM)' },
      { word: '학교 앞', rom: 'hakgyo ap', es: 'frente a la escuela' },
    ],
  },
];

export default function EscuchaCoreanoA1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 듣기 · Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />듣기 · Comprensión auditiva A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Comprensión auditiva A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          Los audios están en producción. Practica con los guiones en 한글 + romanización.
        </p>

        <div style={{ marginBottom: '2rem', padding: '1rem 1.25rem', borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>🎙️</span>
          <div>
            <p style={{ margin: '0 0 0.35rem', fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>Cómo practicar sin audio</p>
            <ol style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.75 }}>
              <li>Lee el guión <strong>en hangul</strong> como si lo escucharas.</li>
              <li>Usa la romanización solo si necesitas ayuda con la pronunciación.</li>
              <li>Cubre el guión e intenta responder las preguntas desde memoria.</li>
              <li>Usa el glosario para palabras desconocidas.</li>
            </ol>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {EXERCISES.map(ex => (
            <div key={ex.id} className="wl-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, flexShrink: 0 }}>{ex.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.15rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>{ex.title}</h2>
                    <span style={{ fontSize: '0.78rem', color: COLOR, fontStyle: 'italic' }}>{ex.titleRom}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>— {ex.titleEs}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 700, color: COLOR, background: `${COLOR}15`, borderRadius: 6, padding: '0.1rem 0.4rem' }}>{ex.level}</span>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{ex.duration} · {ex.topic}</span>
                  </div>
                </div>
                <div style={{ padding: '0.5rem 0.85rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', fontSize: '0.78rem', color: 'var(--muted)', flexShrink: 0 }}>
                  🎵 Audio próximamente
                </div>
              </div>

              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>📄 대본 / Guión</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {ex.script.map((line, li) => (
                    <div key={li} style={{ padding: '0.6rem 0.9rem', borderRadius: 10, background: li % 2 === 0 ? `${COLOR}06` : 'var(--bg-2)', borderLeft: `3px solid ${li % 2 === 0 ? COLOR : '#6b7280'}` }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: li % 2 === 0 ? COLOR : '#6b7280', fontFamily: 'var(--mono)', marginBottom: '0.18rem' }}>{line.speaker}</div>
                      <p style={{ margin: '0 0 0.18rem', fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.6 }}>{line.text}</p>
                      <p style={{ margin: 0, fontSize: '0.76rem', color: COLOR, lineHeight: 1.5, fontStyle: 'italic' }}>{line.rom}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>📖 단어 · Glosario</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {ex.glossary.map(g => (
                    <div key={g.word} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.83rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{g.word}</span>
                      <span style={{ color: COLOR, fontSize: '0.73rem', fontStyle: 'italic' }}>({g.rom})</span>
                      <span style={{ color: 'var(--muted)' }}>— {g.es}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>❓ 이해 확인 · Comprensión</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {ex.questions.map((q, qi) => (
                    <div key={qi} style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)' }}>
                      <p style={{ margin: '0 0 0.45rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.9rem' }}>{qi + 1}. {q.q}</p>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {q.opts.map((opt, oi) => (
                          <span key={oi} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, background: oi === q.a ? 'rgba(5,150,105,0.1)' : 'var(--bg-2)', border: oi === q.a ? '1px solid #059669' : '1px solid var(--line-soft)', fontSize: '0.84rem', color: oi === q.a ? '#059669' : 'var(--ink)', fontWeight: oi === q.a ? 700 : 400 }}>
                            {opt} {oi === q.a && '✓'}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
