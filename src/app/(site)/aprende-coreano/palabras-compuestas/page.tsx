import type { Metadata } from 'next';
import Link from 'next/link';
import KoreanCompounds from '@/app/(site)/practica/KoreanCompounds';
import { COMPOUNDS, ROOTS, CATEGORY_COLORS, getCompoundsForRoot } from '@/data/korean-compounds';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Palabras Compuestas en Coreano (합성어) — Vocabulario × 10 | WeLearn',
  description:
    'Aprende cómo el coreano combina raíces simples para crear palabras nuevas. 합성어 con ejemplos visuales e interactivos: 눈물 (lágrimas), 손가락 (dedo), 불고기 y más. Practica gratis.',
  keywords: [
    'palabras compuestas coreano', 'vocabulario coreano', '합성어',
    'cómo aprender coreano', 'raíces coreanas', 'formación de palabras coreano',
    'morfología coreana', 'idioma coreano palabras', 'aprender vocabulario coreano rápido',
  ],
  openGraph: {
    title: 'Palabras Compuestas en Coreano — 합성어',
    description: 'Aprende a multiplicar tu vocabulario coreano combinando raíces. Herramienta interactiva + explicaciones con ejemplos reales.',
    url: 'https://www.idiomaswl.com/aprende-coreano/palabras-compuestas',
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/aprende-coreano/palabras-compuestas',
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio',          item: 'https://www.idiomaswl.com/home' },
        { '@type': 'ListItem', position: 2, name: 'Coreano',         item: 'https://www.idiomaswl.com/clases-de-coreano' },
        { '@type': 'ListItem', position: 3, name: 'Palabras compuestas', item: 'https://www.idiomaswl.com/aprende-coreano/palabras-compuestas' },
      ],
    },
    {
      '@type': 'Article',
      headline: 'Palabras Compuestas en Coreano (합성어): Vocabulario × 10',
      description: 'Guía completa con ejemplos y herramienta interactiva para aprender las palabras compuestas del coreano.',
      url: 'https://www.idiomaswl.com/aprende-coreano/palabras-compuestas',
      inLanguage: 'es',
      author: {
        '@type': 'Person',
        name: 'José David Duarte Silva',
        url: 'https://www.idiomaswl.com/home',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Idiomas WeLearn',
        url: 'https://www.idiomaswl.com',
      },
      educationalLevel: 'beginner',
      teaches: ['Korean vocabulary', 'Korean morphology', 'Korean compound words'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué son las palabras compuestas en coreano (합성어)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Las 합성어 (hapseong-eo) son palabras coreanas formadas por la unión de dos o más raíces independientes. Por ejemplo: 눈 (ojo) + 물 (agua) = 눈물 (lágrimas). El coreano usa este mecanismo con mucha frecuencia, lo que permite a los estudiantes predecir el significado de palabras nuevas si conocen las raíces.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuáles son las palabras compuestas más comunes en coreano?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Entre las más comunes: 눈물 (lágrimas = ojo+agua), 손가락 (dedo = mano+palito), 손바닥 (palma = mano+fondo), 발가락 (dedo del pie = pie+palito), 불고기 (bulgogi = fuego+carne), 눈사람 (muñeco de nieve = nieve+persona), 나뭇잎 (hoja de árbol = árbol+hoja), 하늘색 (azul cielo = cielo+color).',
          },
        },
        {
          '@type': 'Question',
          name: '¿Por qué aprender las raíces coreanas acelera el aprendizaje de vocabulario?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Porque una sola raíz puede aparecer en múltiples palabras. Por ejemplo, aprendiendo 손 (mano) desbloqueas automáticamente: 손가락 (dedo), 손바닥 (palma) y 손목 (muñeca). Así, memorizar 23 raíces base te da acceso a decenas de palabras compuestas sin aprenderlas de forma aislada.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué es el 사이시옷 en coreano?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El 사이시옷 (saiiot) es un fenómeno fonológico que ocurre cuando se unen dos raíces en coreano puro. Se inserta una ㅅ entre las dos partes, produciendo un cambio de sonido. Ejemplo: 비 (lluvia) + 물 (agua) = 빗물 (pronunciado [빈물]). También ocurre en 나뭇잎 (hoja de árbol).',
          },
        },
      ],
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  cuerpo: 'Cuerpo humano', naturaleza: 'Naturaleza', objetos: 'Objetos', espacio: 'Espacio',
};

const FEATURED_COMPOUNDS = [
  { id: 'nunmul',   parts: ['눈', '물'],   emoji: ['👁️','💧'], label: 'lágrimas' },
  { id: 'songarak', parts: ['손', '가락'], emoji: ['✋','〽️'], label: 'dedo' },
  { id: 'bulgogi',  parts: ['불', '고기'], emoji: ['🔥','🥩'], label: 'bulgogi' },
  { id: 'nunsaram', parts: ['눈', '사람'], emoji: ['❄️','🧍'], label: 'muñeco de nieve' },
];

const FAMILIES = [
  {
    root: '손', rootId: 'son', meaning: 'mano', emoji: '✋', color: '#e11d48',
    words: [
      { hangul: '손가락', rom: 'songarak', meaning: 'dedo', parts: '손+가락' },
      { hangul: '손바닥', rom: 'sonbadak', meaning: 'palma', parts: '손+바닥' },
      { hangul: '손목',   rom: 'sonmok',   meaning: 'muñeca', parts: '손+목' },
    ],
  },
  {
    root: '눈', rootId: 'nun', meaning: 'ojo / nieve', emoji: '👁️', color: '#8b5cf6',
    words: [
      { hangul: '눈물',   rom: 'nunmul',   meaning: 'lágrimas',      parts: '눈(ojo)+물' },
      { hangul: '눈사람', rom: 'nunsaram', meaning: 'muñeco de nieve', parts: '눈(nieve)+사람' },
      { hangul: '눈바람', rom: 'nunbaram', meaning: 'ventisca',       parts: '눈(nieve)+바람' },
    ],
  },
  {
    root: '꽃', rootId: 'kkot', meaning: 'flor', emoji: '🌸', color: '#059669',
    words: [
      { hangul: '꽃밭', rom: 'kkotbat', meaning: 'jardín de flores', parts: '꽃+밭' },
      { hangul: '꽃길', rom: 'kkotgil', meaning: 'camino de flores', parts: '꽃+길' },
    ],
  },
];

// ─── XP noop for server context ───────────────────────────────────────────────
// KoreanCompounds is a client component — we pass a noop here; the real addXp
// lives inside /practica. On this page XP just shows locally to the user.

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PalabrasCompuestasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(160deg, #0d0d14 0%, #1a1028 55%, #0d1a14 100%)',
          padding: 'clamp(3.5rem,8vw,6rem) 1.25rem clamp(3rem,6vw,5rem)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* glows */}
          <div style={{ position:'absolute', top:-80, left:'30%', width:600, height:600, borderRadius:'50%', background:'#059669', opacity:0.07, filter:'blur(120px)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-40, right:'10%', width:400, height:400, borderRadius:'50%', background:'#534AB7', opacity:0.09, filter:'blur(90px)', pointerEvents:'none' }} />

          <div className="wrap" style={{ maxWidth:900, position:'relative', zIndex:1 }}>

            {/* Breadcrumb */}
            <nav style={{ display:'flex', gap:'0.4rem', alignItems:'center', marginBottom:'1.5rem', fontSize:'0.78rem', color:'rgba(255,255,255,0.45)', fontFamily:'var(--mono)' }}>
              <Link href="/home" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none' }}>Inicio</Link>
              <span>/</span>
              <Link href="/clases-de-coreano" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none' }}>Coreano</Link>
              <span>/</span>
              <span style={{ color:'#4ade80' }}>Palabras compuestas</span>
            </nav>

            {/* Tag row */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1.25rem' }}>
              {['합성어', 'Vocabulario', 'Todos los niveles', 'Herramienta interactiva'].map(t => (
                <span key={t} style={{
                  fontSize:'0.72rem', fontWeight:700, padding:'0.25rem 0.7rem', borderRadius:999,
                  background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.25)', color:'#4ade80',
                  fontFamily:'var(--mono)',
                }}>{t}</span>
              ))}
            </div>

            <h1 style={{ margin:'0 0 1rem', fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:900, color:'#fff', lineHeight:1.15, letterSpacing:'-0.02em' }}>
              Palabras compuestas en coreano<br />
              <span style={{ color:'#4ade80' }}>합성어</span>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.55em', fontWeight:600 }}> — vocabulario × 10</span>
            </h1>

            <p style={{ margin:'0 0 2rem', fontSize:'clamp(1rem,2vw,1.2rem)', color:'rgba(255,255,255,0.65)', lineHeight:1.7, maxWidth:680 }}>
              En coreano puedes combinar dos palabras sencillas para crear una nueva.
              Aprende las <strong style={{ color:'#fff' }}>raíces clave</strong> y tu vocabulario
              se multiplica solo — sin memorización de listas infinitas.
            </p>

            {/* Animated example */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem', marginBottom:'2.5rem', alignItems:'center' }}>
              {[
                { h:'눈', m:'ojo', e:'👁️', c:'#8b5cf6' },
                { h:'+', m:'', e:'', c:'rgba(255,255,255,0.3)' },
                { h:'물', m:'agua', e:'💧', c:'#0ea5e9' },
                { h:'=', m:'', e:'', c:'rgba(255,255,255,0.3)' },
                { h:'눈물', m:'lágrimas', e:'😢', c:'#4ade80' },
              ].map((item, i) => item.h === '+' || item.h === '=' ? (
                <span key={i} style={{ fontSize:'1.8rem', fontWeight:900, color: item.c }}>{item.h}</span>
              ) : (
                <div key={i} style={{
                  padding:'0.75rem 1rem', borderRadius:14,
                  background:`${item.c}15`, border:`2px solid ${item.c}44`,
                  display:'flex', flexDirection:'column', alignItems:'center', gap:'0.2rem',
                }}>
                  <span style={{ fontSize:'1.4rem' }}>{item.e}</span>
                  <span style={{ fontSize:'1.5rem', fontWeight:900, color: item.c }}>{item.h}</span>
                  <span style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.55)', fontFamily:'var(--mono)' }}>{item.m}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'1.25rem' }}>
              {[
                { n: String(ROOTS.length),    l: 'raíces' },
                { n: String(COMPOUNDS.length),l: 'compuestos' },
                { n: '3',                     l: 'modos de práctica' },
                { n: '4',                     l: 'categorías' },
              ].map(({ n, l }) => (
                <div key={l} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'1.8rem', fontWeight:900, color:'#4ade80', fontFamily:'var(--mono)' }}>{n}</div>
                  <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.45)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="wrap" style={{ maxWidth:900, padding:'clamp(2.5rem,5vw,4rem) 1.25rem' }}>

          {/* Section 1 — Qué son */}
          <section style={{ marginBottom:'3.5rem' }}>
            <p className="eyebrow"><span className="ink-line" />¿Qué son las 합성어?</p>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.5rem,3vw,2rem)', color:'var(--ink)', marginBottom:'1.25rem' }}>
              El secreto que los nativos usan sin pensarlo
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1rem', marginBottom:'1.5rem' }}>
              <p style={{ margin:0, color:'var(--muted)', lineHeight:1.75, fontSize:'0.95rem' }}>
                Las <strong style={{ color:'var(--ink)' }}>합성어 (hapseong-eo)</strong> son palabras coreanas formadas
                uniendo dos raíces independientes. A diferencia del español, donde los compuestos son excepciones
                (paraguas, cumpleaños), en coreano son la <strong style={{ color:'var(--ink)' }}>norma</strong>.
                Casi cualquier hablante nativo puede deducir el significado de una palabra nueva si reconoce sus partes.
              </p>
              <p style={{ margin:0, color:'var(--muted)', lineHeight:1.75, fontSize:'0.95rem' }}>
                La lógica es siempre descriptiva y visual: un <em>dedo</em> es los
                {' '}<strong style={{ color:'var(--ink)' }}>palitos de la mano</strong> (손가락),
                una <em>muñeca</em> es el <strong style={{ color:'var(--ink)' }}>cuello de la mano</strong> (손목),
                las <em>lágrimas</em> son el <strong style={{ color:'var(--ink)' }}>agua de los ojos</strong> (눈물).
                Una vez que lo ves, no puedes olvidarlo.
              </p>
            </div>

            {/* Featured compounds */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'0.85rem' }}>
              {FEATURED_COMPOUNDS.map(fc => {
                const c = COMPOUNDS.find(x => x.id === fc.id)!;
                return (
                  <div key={fc.id} style={{
                    padding:'1.25rem', borderRadius:16, background:'var(--bg)',
                    border:'1.5px solid var(--line-soft)', display:'flex', flexDirection:'column', gap:'0.6rem',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexWrap:'wrap' }}>
                      <span style={{ fontSize:'1.25rem' }}>{fc.emoji[0]}</span>
                      <span style={{ fontWeight:900, fontSize:'1rem', color:'var(--ink)', fontFamily:'var(--mono)' }}>{fc.parts[0]}</span>
                      <span style={{ color:'var(--muted)' }}>+</span>
                      <span style={{ fontSize:'1.25rem' }}>{fc.emoji[1]}</span>
                      <span style={{ fontWeight:900, fontSize:'1rem', color:'var(--ink)', fontFamily:'var(--mono)' }}>{fc.parts[1]}</span>
                    </div>
                    <div>
                      <div style={{ fontSize:'1.7rem', fontWeight:900, color:'#059669' }}>{c.hangul}</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>{c.romanization}</div>
                      <div style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--ink)' }}>{fc.label}</div>
                    </div>
                    <div style={{ fontSize:'0.75rem', color:'var(--muted)', lineHeight:1.55, borderTop:'1px solid var(--line-soft)', paddingTop:'0.5rem' }}>
                      {c.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 2 — Categorías */}
          <section style={{ marginBottom:'3.5rem' }}>
            <p className="eyebrow"><span className="ink-line" />Las 4 categorías de raíces</p>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.4rem,3vw,1.9rem)', color:'var(--ink)', marginBottom:'1.25rem' }}>
              Organiza lo que ya sabes
            </h2>
            <p style={{ color:'var(--muted)', lineHeight:1.7, marginBottom:'1.5rem', fontSize:'0.95rem' }}>
              Las raíces del coreano se agrupan en categorías semánticas claras. Aprender una categoría completa
              es más eficiente que estudiar palabras sueltas: el cerebro conecta los conceptos más fácilmente.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem' }}>
              {(['cuerpo','naturaleza','objetos','espacio'] as const).map(cat => {
                const color = CATEGORY_COLORS[cat];
                const roots = ROOTS.filter(r => r.category === cat);
                return (
                  <div key={cat} style={{
                    padding:'1.25rem', borderRadius:14,
                    background:`${color}08`, border:`1.5px solid ${color}33`,
                  }}>
                    <div style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', fontWeight:800, color, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.75rem' }}>
                      {CATEGORY_LABELS[cat]}
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                      {roots.map(r => (
                        <span key={r.id} style={{
                          display:'inline-flex', alignItems:'center', gap:'0.25rem',
                          padding:'0.3rem 0.55rem', borderRadius:8,
                          background:'var(--bg)', border:`1px solid ${color}44`,
                          fontSize:'0.82rem', color:'var(--ink)', fontWeight:700,
                        }}>
                          {r.emoji} <span style={{ color, fontFamily:'var(--mono)' }}>{r.hangul}</span>
                          <span style={{ color:'var(--muted)', fontWeight:400, fontSize:'0.72rem' }}>{r.meaning}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3 — Familias */}
          <section style={{ marginBottom:'3.5rem' }}>
            <p className="eyebrow"><span className="ink-line" />Familias de palabras</p>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.4rem,3vw,1.9rem)', color:'var(--ink)', marginBottom:'0.75rem' }}>
              Aprende una raíz, desbloquea tres palabras
            </h2>
            <p style={{ color:'var(--muted)', lineHeight:1.7, marginBottom:'1.75rem', fontSize:'0.95rem' }}>
              Esta es la ventaja real del sistema de raíces: la misma pieza reaparece en múltiples palabras.
              Al aprender <strong style={{ color:'var(--ink)' }}>손</strong> (mano) una sola vez,
              obtienes automáticamente tres palabras del cuerpo sin esfuerzo adicional.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              {FAMILIES.map(fam => (
                <div key={fam.rootId} style={{
                  borderRadius:16, border:'1.5px solid var(--line-soft)', overflow:'hidden',
                }}>
                  {/* Family header */}
                  <div style={{
                    padding:'0.85rem 1.25rem', display:'flex', alignItems:'center', gap:'0.85rem',
                    background:`${fam.color}08`, borderBottom:'1px solid var(--line-soft)',
                  }}>
                    <span style={{ fontSize:'1.8rem' }}>{fam.emoji}</span>
                    <div>
                      <span style={{ fontSize:'1.5rem', fontWeight:900, color: fam.color, fontFamily:'var(--mono)' }}>{fam.root}</span>
                      <span style={{ fontSize:'0.85rem', color:'var(--muted)', marginLeft:'0.6rem' }}>{fam.meaning}</span>
                    </div>
                    <span style={{ marginLeft:'auto', fontSize:'0.7rem', fontFamily:'var(--mono)', fontWeight:800, color: fam.color, padding:'0.2rem 0.55rem', borderRadius:6, background:`${fam.color}15` }}>
                      {fam.words.length} palabras
                    </span>
                  </div>
                  {/* Words */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))' }}>
                    {fam.words.map((w, i) => (
                      <div key={w.hangul} style={{
                        padding:'1rem 1.25rem',
                        borderRight: i < fam.words.length - 1 ? '1px solid var(--line-soft)' : 'none',
                      }}>
                        <div style={{ fontSize:'1.5rem', fontWeight:900, color: fam.color }}>{w.hangul}</div>
                        <div style={{ fontSize:'0.68rem', color:'var(--muted)', fontFamily:'var(--mono)', marginBottom:'0.3rem' }}>{w.rom}</div>
                        <div style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--ink)', marginBottom:'0.3rem' }}>{w.meaning}</div>
                        <div style={{ fontSize:'0.72rem', color:'var(--muted)', fontFamily:'var(--mono)', background:`${fam.color}0d`, padding:'0.2rem 0.45rem', borderRadius:6, display:'inline-block' }}>{w.parts}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 — Saiiot note */}
          <section style={{ marginBottom:'3.5rem' }}>
            <div style={{
              padding:'1.5rem 1.75rem', borderRadius:16,
              background:'rgba(83,74,183,0.06)', border:'1.5px solid rgba(83,74,183,0.2)',
            }}>
              <p style={{ margin:'0 0 0.5rem', fontSize:'0.72rem', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.08em', color:'#534AB7', fontWeight:800 }}>
                Nota fonológica — 사이시옷 (saiiot)
              </p>
              <h3 style={{ fontWeight:900, fontSize:'1.1rem', color:'var(--ink)', margin:'0 0 0.75rem' }}>
                El ㅅ que aparece entre palabras
              </h3>
              <p style={{ margin:'0 0 1rem', color:'var(--muted)', lineHeight:1.7, fontSize:'0.9rem' }}>
                En algunas palabras compuestas del coreano puro (순우리말), se inserta una <strong style={{ color:'#534AB7' }}>ㅅ silenciosa</strong> entre las dos raíces.
                Esto endurece el sonido inicial de la segunda raíz y es parte de la pronunciación natural.
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem' }}>
                {[
                  { word:'빗물',   parts:'비 + 물',   note:'la ㅅ suena como [빈물]' },
                  { word:'나뭇잎', parts:'나무 + 잎',  note:'pronunciado [나문닙]' },
                ].map(ex => (
                  <div key={ex.word} style={{
                    padding:'0.75rem 1rem', borderRadius:12,
                    background:'var(--bg)', border:'1px solid rgba(83,74,183,0.25)',
                  }}>
                    <span style={{ fontSize:'1.4rem', fontWeight:900, color:'#534AB7', fontFamily:'var(--mono)' }}>{ex.word}</span>
                    <span style={{ color:'var(--muted)', fontSize:'0.8rem', margin:'0 0.4rem' }}>= {ex.parts}</span>
                    <span style={{ fontSize:'0.72rem', color:'#534AB7', fontStyle:'italic' }}>({ex.note})</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5 — Interactive tool */}
          <section style={{ marginBottom:'3.5rem' }}>
            <p className="eyebrow"><span className="ink-line" />Herramienta interactiva</p>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.4rem,3vw,1.9rem)', color:'var(--ink)', marginBottom:'0.5rem' }}>
              Practica ahora — Combina, explora y pon a prueba
            </h2>
            <p style={{ color:'var(--muted)', lineHeight:1.7, marginBottom:'1.75rem', fontSize:'0.95rem' }}>
              Toca dos raíces para ver si forman una palabra, explora las familias y haz el quiz de 10 preguntas.
              Cada compuesto encontrado te da <strong style={{ color:'var(--ink)' }}>+15 XP</strong>.
            </p>
            <div style={{ borderRadius:20, border:'1.5px solid var(--line-soft)', padding:'1.5rem', background:'var(--bg)' }}>
              <KoreanCompounds />
            </div>
          </section>

          {/* Section 6 — FAQ */}
          <section style={{ marginBottom:'3.5rem' }}>
            <p className="eyebrow"><span className="ink-line" />Preguntas frecuentes</p>
            <h2 style={{ fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.8rem)', color:'var(--ink)', marginBottom:'1.25rem' }}>
              Todo sobre las 합성어
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[
                {
                  q: '¿Todas las palabras coreanas son compuestas?',
                  a: 'No, pero las 합성어 son muy frecuentes en el vocabulario cotidiano, especialmente para conceptos físicos y naturales. El coreano también tiene palabras de origen chino (한자어) y préstamos modernos (외래어), pero las palabras compuestas puras (순우리말) son las más descriptivas y memorables.',
                },
                {
                  q: '¿En qué nivel del TOPIK aparecen las palabras compuestas?',
                  a: 'Las más comunes (눈물, 손가락, 불고기) aparecen desde TOPIK I (nivel 1-2). Las palabras más abstractas o con cambios fonológicos se trabajan en TOPIK II (nivel 3-6). Conocer el mecanismo te ayuda en todos los niveles.',
                },
                {
                  q: '¿Puedo inventar nuevas palabras combinando raíces?',
                  a: 'En cierta medida sí, especialmente en lenguaje informal o creativo. Sin embargo, no todas las combinaciones producen palabras aceptadas — algunas combinaciones simplemente no se usan en la práctica. Por eso es útil aprender las combinaciones establecidas primero.',
                },
                {
                  q: '¿Cómo sé cuál de las dos raíces va primero?',
                  a: 'El coreano sigue una lógica de "modificador + núcleo". La primera raíz generalmente modifica o especifica a la segunda: 손(mano) + 가락(palito) = palito de la mano. La segunda raíz es el concepto principal y la primera lo describe.',
                },
              ].map(({ q, a }, i) => (
                <details key={i} style={{
                  borderRadius:12, border:'1.5px solid var(--line-soft)',
                  background:'var(--bg)', overflow:'hidden',
                }}>
                  <summary style={{
                    padding:'1rem 1.25rem', fontWeight:700, fontSize:'0.95rem', color:'var(--ink)',
                    cursor:'pointer', listStyle:'none', display:'flex', justifyContent:'space-between', alignItems:'center',
                  }}>
                    {q}
                    <span style={{ color:'var(--muted)', fontSize:'1rem', flexShrink:0, marginLeft:'1rem' }}>+</span>
                  </summary>
                  <div style={{ padding:'0 1.25rem 1rem', color:'var(--muted)', lineHeight:1.7, fontSize:'0.9rem', borderTop:'1px solid var(--line-soft)' }}>
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA section */}
          <section style={{
            borderRadius:20, padding:'2.5rem',
            background:'linear-gradient(135deg, rgba(5,150,105,0.08) 0%, rgba(83,74,183,0.08) 100%)',
            border:'1.5px solid rgba(5,150,105,0.2)',
            display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'1.25rem',
          }}>
            <div style={{ fontSize:'2.5rem' }}>🇰🇷</div>
            <h2 style={{ fontWeight:900, fontSize:'1.5rem', color:'var(--ink)', margin:0 }}>
              ¿Quieres aprender coreano en serio?
            </h2>
            <p style={{ color:'var(--muted)', margin:0, fontSize:'0.95rem', lineHeight:1.65, maxWidth:500 }}>
              En WeLearn enseñamos coreano con el método de los 17 pasos — estructurado, progresivo y con hablante nativo.
              Las palabras compuestas son solo el comienzo.
            </p>
            <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', justifyContent:'center' }}>
              <Link href="/clases-de-coreano" className="btn btn-sm"
                style={{ background:'#059669', borderColor:'#059669', fontSize:'0.9rem' }}>
                Ver clases de coreano →
              </Link>
              <Link
                href="https://wa.me/573005004253?text=Hola%2C+me+interesa+aprender+coreano+con+WeLearn"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
                style={{ fontSize:'0.9rem' }}
              >
                💬 Hablar con un asesor
              </Link>
            </div>
            <p style={{ margin:0, fontSize:'0.78rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>
              También puedes practicar más en{' '}
              <Link href="/practica" style={{ color:'#534AB7', fontWeight:700 }}>/practica</Link>
              {' '}— Ciclo de aprendizaje · Bloques · Quiz · Lector de Hangul
            </p>
          </section>

        </div>
      </main>
    </>
  );
}
