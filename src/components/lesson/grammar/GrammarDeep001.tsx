/**
 * GrammarDeep001 — Explicación completa del Día 1
 * Server Component: renderizado en el servidor para indexación SEO.
 * NO incluir 'use client' — este archivo se renderiza estáticamente.
 */

export default function GrammarDeep001() {
  return (
    <section
      aria-label="Explicación gramatical detallada — Día 1"
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '3rem 1.25rem 4rem',
        color: 'var(--ink)',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: '2.5rem', borderTop: '3px solid #6c63ff', paddingTop: '2rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff' }}>
          REFERENCIA GRAMATICAL · DÍA 1
        </p>
        <h2 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>
          El orden S-O-V, la partícula 에 y el yo coreano
        </h2>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
          Tres patrones que cambian la forma en que lees y escuchas el coreano — explicados desde cero
          para hispanohablantes.
        </p>
      </div>

      {/* ── Sección 1: El secreto más importante ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>
          1. ¿Por qué el coreano suena "al revés"?
        </h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El español y el coreano construyen las oraciones en orden diferente. En español el verbo va en
          el centro: <strong>"Yo <em>voy</em> a la escuela."</strong> En coreano el verbo siempre va al
          final: <strong>"Yo a la escuela <em>voy</em>."</strong> Esta diferencia — llamada orden SOV
          (Sujeto-Objeto-Verbo) — es el patrón más importante del idioma, y aparece en el{' '}
          <strong>100% de las oraciones coreanas sin excepción</strong>.
        </p>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          Al principio parece incomodo porque el español es SVO (Sujeto-Verbo-Objeto). Tu cerebro espera
          el verbo en el segundo lugar y no llega. La buena noticia: en tres días de práctica el cerebro
          se adapta y empieza a anticipar el verbo al final de forma automática.
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La consecuencia práctica más importante del SOV coreano es que <strong>no sabes qué está
          pasando en una oración hasta que escuchas la última palabra</strong>. Por eso los coreanos prestan
          más atención al hablante hasta el final — interrumpir es más grave que en español porque podrías
          perderte el verbo.
        </p>
      </div>

      {/* ── Tabla comparativa ── */}
      <div style={{ marginBottom: '2.5rem', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {[['Español (SVO)', 'Coreano (SOV)', 'Romanización'], ['Yo voy a la escuela', '저는 학교에 가요', 'jeo-neun hak-gyo-e ga-yo'], ['Yo voy a casa', '저는 집에 가요', 'jeo-neun ji-be ga-yo'], ['Tú vas a la universidad', '너는 대학교에 가요', 'neo-neun dae-hak-gyo-e ga-yo'], ['¿Adónde vas?', '어디 가요?', 'eo-di ga-yo?']].map((row, ri) =>
            row.map((cell, ci) => (
              <div
                key={`${ri}-${ci}`}
                style={{
                  padding: '9px 14px',
                  fontSize: ri === 0 ? 11 : 13,
                  fontWeight: ri === 0 ? 700 : ci === 1 ? 600 : 400,
                  fontFamily: ci === 1 && ri > 0 ? "'Noto Sans KR', sans-serif" : 'inherit',
                  background: ri === 0 ? '#6c63ff' : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)',
                  color: ri === 0 ? '#fff' : ci === 1 && ri > 0 ? '#6c63ff' : 'var(--ink)',
                  borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none',
                  letterSpacing: ri === 0 ? '0.06em' : 0,
                  textTransform: ri === 0 ? 'uppercase' : 'none',
                }}
              >
                {cell}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Sección 2: La partícula 에 ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>
          2. La partícula 에 — cómo el coreano marca la dirección
        </h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          En español la preposición <strong>"a"</strong> va <em>antes</em> del sustantivo: "a la escuela",
          "a casa", "a la universidad". En coreano la partícula <strong>에</strong> va{' '}
          <em>después</em> del sustantivo, pegada directamente sin espacio:{' '}
          <span style={{ fontFamily: "'Noto Sans KR', sans-serif", color: '#34d399', fontWeight: 700 }}>학교에</span>,{' '}
          <span style={{ fontFamily: "'Noto Sans KR', sans-serif", color: '#34d399', fontWeight: 700 }}>집에</span>,{' '}
          <span style={{ fontFamily: "'Noto Sans KR', sans-serif", color: '#34d399', fontWeight: 700 }}>대학교에</span>.
        </p>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La regla es absoluta: <strong>NUNCA hay espacio entre el sustantivo y 에</strong>. Escribir
          "학교 에" (con espacio) es un error visible que cualquier coreano nota de inmediato. Piensa en
          la partícula como un sufijo pegado al sustantivo, no como una palabra independiente.
        </p>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La partícula 에 tiene dos usos principales que los principiantes confunden:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          {[
            {
              title: '에 de dirección (movimiento)',
              desc: 'Con verbos de movimiento como 가요 (voy) o 와요 (vengo). Indica el destino.',
              examples: ['학교에 가요 → voy a la escuela', '집에 가요 → voy a casa'],
              color: '#34d399',
            },
            {
              title: '에 de ubicación (existencia)',
              desc: 'Con verbos de estado como 있어요 (hay/estoy) o 없어요 (no hay). Indica dónde está algo.',
              examples: ['학교에 있어요 → estoy en la escuela', '집에 있어요 → estoy en casa'],
              color: '#60a5fa',
            },
          ].map(card => (
            <div key={card.title} style={{ background: 'var(--bg-2)', border: `1px solid var(--line-soft)`, borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${card.color}` }}>
              <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: card.color }}>{card.title}</p>
              <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{card.desc}</p>
              {card.examples.map(ex => (
                <p key={ex} style={{ margin: '0 0 4px', fontSize: 12, fontFamily: ex.includes('→') ? 'inherit' : "'Noto Sans KR', sans-serif", color: 'var(--ink)' }}>{ex}</p>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 10, padding: '12px 16px' }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>
            <strong>💡 Adelanto del Día 7:</strong> Más adelante aprenderás la partícula{' '}
            <span style={{ fontFamily: "'Noto Sans KR', sans-serif", color: '#34d399' }}>에서</span> que
            también indica ubicación pero para <em>acciones</em> ("estudio en la escuela" → 학교에서
            공부해요). La diferencia entre 에 y 에서 es uno de los conceptos más consultados del coreano
            en Google — y tú ya tienes la base.
          </p>
        </div>
      </div>

      {/* ── Sección 3: 저는 vs 나는 ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>
          3. 저는 vs 나는 — el yo formal y el yo casual
        </h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El coreano tiene dos formas de decir "yo" que no son intercambiables. El uso equivocado es un
          error social visible — no es solo gramática, es una señal de cómo te posicionas frente a la
          otra persona.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          {[
            { kr: '저는', rom: 'jeo-neun', label: 'Yo (formal/humilde)', when: 'Desconocidos, personas mayores, trabajo, situaciones públicas', note: 'La forma segura para extranjeros', color: '#6c63ff' },
            { kr: '나는', rom: 'na-neun', label: 'Yo (casual/íntimo)', when: 'Amigos íntimos, familia, personas menores que tú', note: 'Úsalo solo cuando te inviten a ser casual', color: '#f59e0b' },
          ].map(item => (
            <div key={item.kr} style={{ background: 'var(--bg-2)', border: `2px solid ${item.color}20`, borderRadius: 12, padding: '14px 16px' }}>
              <p style={{ margin: '0 0 2px', fontSize: 28, fontWeight: 800, fontFamily: "'Noto Sans KR', sans-serif", color: item.color }}>{item.kr}</p>
              <p style={{ margin: '0 0 8px', fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{item.rom}</p>
              <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{item.label}</p>
              <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}><strong>Cuándo:</strong> {item.when}</p>
              <p style={{ margin: 0, fontSize: 11, padding: '5px 10px', borderRadius: 6, background: `${item.color}15`, color: item.color, fontWeight: 600 }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La partícula <strong>는/은</strong> que sigue al pronombre (저<strong>는</strong>, 나<strong>는</strong>)
          es la <em>partícula de tema</em>: marca de qué o de quién trata la oración. "저는 학교에 가요"
          se puede traducir literalmente como "En cuanto a mí, a la escuela voy." Esta partícula reaparece
          constantemente — es una de las más frecuentes del coreano.
        </p>
      </div>

      {/* ── Sección 4: Sin artículos ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>
          4. Por qué el coreano no tiene artículos
        </h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          En español los artículos (el, la, un, una) son obligatorios. En coreano{' '}
          <strong>no existen</strong>. La palabra{' '}
          <span style={{ fontFamily: "'Noto Sans KR', sans-serif", color: '#6c63ff' }}>학교</span> puede
          significar "la escuela", "una escuela" o simplemente "escuela" dependiendo del contexto. El
          coreano es un idioma de <em>alto contexto</em>: asume que ambos interlocutores comparten
          suficiente información situacional para no necesitar especificar.
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          Para el hispano hablante esto resulta liberador: hay una categoría entera de errores que
          simplemente no existen en coreano. No puedes equivocarte en el género (masculino/femenino) ni
          en el artículo determinado o indeterminado. El sustantivo va solo, siempre.
        </p>
      </div>

      {/* ── Sección 5: Errores comunes ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>
          5. Los 3 errores más comunes de hispanohablantes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              n: '01',
              error: 'Poner el verbo en el medio',
              wrong: '저는 가요 학교에 ✗',
              right: '저는 학교에 가요 ✓',
              why: 'El cerebro hispanohablante quiere el verbo en el segundo lugar. En coreano el verbo siempre es la última palabra.',
            },
            {
              n: '02',
              error: 'Escribir espacio antes de la partícula',
              wrong: '학교 에 가요 ✗',
              right: '학교에 가요 ✓',
              why: 'Las partículas (에, 는, 이/가, 을/를) van pegadas al sustantivo sin espacio. Son más sufijos que palabras independientes.',
            },
            {
              n: '03',
              error: 'Usar 나는 con desconocidos',
              wrong: '나는 학교에 가요 (con desconocido) ✗',
              right: '저는 학교에 가요 ✓',
              why: 'Usar 나는 con alguien que no conoces bien suena irrespetuoso. Hasta que no te inviten a ser informal, usa siempre 저는.',
            },
          ].map(item => (
            <div key={item.n} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 14 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--muted)', opacity: 0.3, flexShrink: 0, lineHeight: 1.2 }}>{item.n}</span>
              <div>
                <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{item.error}</p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <code style={{ fontSize: 13, padding: '3px 10px', background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 6, color: '#dc3545', fontFamily: "'Noto Sans KR', sans-serif" }}>{item.wrong}</code>
                  <code style={{ fontSize: 13, padding: '3px 10px', background: 'rgba(45,155,78,0.06)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 6, color: '#2d9b4e', fontFamily: "'Noto Sans KR', sans-serif" }}>{item.right}</code>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sección 6: Vocabulario del día ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>
          6. Vocabulario completo del Día 1
        </h3>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr' }}>
            {[
              ['Coreano', 'Romano', 'Español', 'Notas'],
              ['학교', 'hak-gyo', 'escuela', 'hanja 學校 = institución de aprendizaje'],
              ['대학교', 'dae-hak-gyo', 'universidad', '대(大) = grande + 학교'],
              ['집', 'jip', 'casa', 'también: hogar, domicilio'],
              ['가요', 'ga-yo', 'voy / vas / va', '-요 = sufijo de cortesía nivel diario'],
              ['저는', 'jeo-neun', 'yo (formal)', '저 + 는 (partícula de tema)'],
              ['나는', 'na-neun', 'yo (casual)', 'solo con amigos íntimos'],
              ['어디', 'eo-di', 'dónde / adónde', 'aparece en 어디 가요? (¿adónde vas?)'],
              ['학교에', 'hak-gyo-e', 'hacia/en la escuela', '학교 + 에 (sin espacio)'],
              ['대학교에', 'dae-hak-gyo-e', 'hacia/en la universidad', '대학교 + 에'],
            ].map((row, ri) =>
              row.map((cell, ci) => (
                <div
                  key={`v-${ri}-${ci}`}
                  style={{
                    padding: '9px 12px',
                    fontSize: ri === 0 ? 10 : 13,
                    fontWeight: ri === 0 ? 700 : ci === 0 ? 600 : 400,
                    fontFamily: ci === 0 && ri > 0 ? "'Noto Sans KR', sans-serif" : 'inherit',
                    background: ri === 0 ? '#6c63ff' : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)',
                    color: ri === 0 ? '#fff' : ci === 0 && ri > 0 ? '#6c63ff' : 'var(--ink)',
                    borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none',
                    textTransform: ri === 0 ? 'uppercase' : 'none',
                    letterSpacing: ri === 0 ? '0.06em' : 0,
                  }}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Sección 7: Sigue aprendiendo ── */}
      <div style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.05), rgba(108,99,255,0.02))', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 14, padding: '20px 24px' }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6c63ff' }}>
          Siguiente paso
        </p>
        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>
          Día 2: El Hangul cobra vida
        </h4>
        <p style={{ margin: '0 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
          En el siguiente día aprendes a leer el alfabeto coreano Hangul — vocales, consonantes y cómo
          se forman los bloques silábicos. Después del Día 2 podrás leer cualquier texto en coreano en
          voz alta, aunque no lo entiendas.
        </p>
      </div>
    </section>
  );
}
