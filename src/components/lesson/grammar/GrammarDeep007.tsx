/** GrammarDeep007 — Server Component. SEO: 에서 vs 에 coreano, verbos hada, 씨 honorífico. */

export default function GrammarDeep007() {
  const accent = '#10b981';
  return (
    <section aria-label="Explicación gramatical — Día 7: 에서 vs 에 y verbos hada" style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.25rem 4rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--ink)' }}>

      <div style={{ marginBottom: '2.5rem', borderTop: `3px solid ${accent}`, paddingTop: '2rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>REFERENCIA GRAMATICAL · DÍA 7</p>
        <h2 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>에서 vs 에 en coreano: la diferencia definitiva explicada</h2>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>La distinción más buscada en Google por estudiantes de coreano — explicada con contexto real, tablas y ejemplos de la rutina universitaria de David.</p>
      </div>

      {/* 1 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>1. El problema: dos partículas de lugar que parecen lo mismo</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          Tanto <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700 }}>에</span> como <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: '#6c63ff', fontWeight: 700 }}>에서</span> se traducen al español como "en" o "a". Eso hace que los hispanohablantes los confundan constantemente. La diferencia no está en la traducción — está en <strong>qué tipo de verbo acompaña a cada partícula</strong>.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          {[
            { particle: '에', rule: 'Dirección o existencia estática', verbs: ['가다 → voy a', '오다 → vengo a', '있다 → estoy en', '없다 → no estoy'], example: '학교에 가요', meaning: 'Voy a la escuela', color: accent },
            { particle: '에서', rule: 'Lugar donde ocurre una ACCIÓN', verbs: ['공부하다 → estudio en', '일하다 → trabajo en', '먹다 → como en', '살다 → vivo en'], example: '학교에서 공부해요', meaning: 'Estudio en la escuela', color: '#6c63ff' },
          ].map(p => (
            <div key={p.particle} style={{ background: 'var(--bg-2)', border: `2px solid ${p.color}25`, borderRadius: 12, padding: '16px', borderLeft: `4px solid ${p.color}` }}>
              <p style={{ margin: '0 0 2px', fontSize: 44, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 900, color: p.color, lineHeight: 1 }}>{p.particle}</p>
              <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: p.color }}>{p.rule}</p>
              <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Verbos que la usan:</p>
              {p.verbs.map(v => <p key={v} style={{ margin: '0 0 3px', fontSize: 12, color: 'var(--ink)' }}>• {v}</p>)}
              <div style={{ marginTop: 12, padding: '8px 10px', background: `${p.color}10`, borderRadius: 8 }}>
                <p style={{ margin: '0 0 2px', fontSize: 16, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, color: p.color }}>{p.example}</p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{p.meaning}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: `${accent}08`, border: `1px solid ${accent}25`, borderRadius: 10, padding: '12px 16px' }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
            <strong>La regla en una oración:</strong> si el lugar es el <em>destino del movimiento</em> o el lugar donde algo <em>existe</em> → usa <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700 }}>에</span>. Si el lugar es donde se <em>realiza una acción</em> → usa <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: '#6c63ff', fontWeight: 700 }}>에서</span>.
          </p>
        </div>
      </div>

      {/* 2 — Tabla comparativa */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>2. Tabla comparativa con las mismas frases</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La mejor forma de entender la diferencia es ver <em>las mismas palabras</em> con las dos partículas y notar el cambio de significado.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {[['Lugar','Con 에','Con 에서'],['학교 (escuela)','학교에 가요\n→ Voy a la escuela','학교에서 공부해요\n→ Estudio en la escuela'],['카페 (café)','카페에 가요\n→ Voy al café','카페에서 일해요\n→ Trabajo en el café'],['집 (casa)','집에 있어요\n→ Estoy en casa','집에서 먹어요\n→ Como en casa'],['도서관 (biblioteca)','도서관에 와요\n→ Vengo a la biblioteca','도서관에서 읽어요\n→ Leo en la biblioteca']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`t-${ri}-${ci}`} style={{ padding: '10px 12px', fontSize: ri === 0 ? 10 : ci === 0 ? 14 : 13, fontFamily: ci === 0 && ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : ci === 0 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 1 ? accent : ci === 2 ? '#6c63ff' : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0, whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 3 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>3. Verbos 하다 — el verbo más productivo del coreano</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700, fontSize: 17 }}>하다</span> significa "hacer" y es el verbo más versátil del coreano. Combinado con sustantivos de origen chino o inglés crea cientos de verbos nuevos. <strong>Aprender el patrón [sustantivo] + 하다</strong> te da acceso instantáneo a todo ese vocabulario.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
            {[['Sustantivo','+ 하다','Significado','Conjugado (-요)'],['공부 (estudio)','공부하다','estudiar','공부해요'],['일 (trabajo)','일하다','trabajar','일해요'],['운동 (ejercicio)','운동하다','hacer ejercicio','운동해요'],['요리 (cocina)','요리하다','cocinar','요리해요'],['청소 (limpieza)','청소하다','limpiar','청소해요'],['쇼핑 (shopping)','쇼핑하다','ir de compras','쇼핑해요']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`h-${ri}-${ci}`} style={{ padding: '9px 10px', fontSize: ri === 0 ? 10 : ci === 0 ? 13 : 14, fontFamily: ri > 0 && ci > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : ci === 3 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 3 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La conjugación de -하다 en nivel -요 siempre produce <strong>해요</strong>. Esto significa que si ves cualquier palabra terminada en 해요, casi con certeza es un verbo compuesto con 하다. En la práctica: <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent }}>이 대학교에서 공부해요</span> = "Estudio en esta universidad" — 에서 (lugar de acción) + 공부해요 (verbo 하다).
        </p>
      </div>

      {/* 4 — 씨 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>4. 씨 — el honorífico de nombre que nunca falla</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700, fontSize: 17 }}>씨</span> se añade después del nombre (o nombre completo) como señal de respeto equivalente a "señor/señora" pero mucho menos formal. Es la forma más segura de dirigirse a alguien cuyo nombre conoces pero con quien aún no tienes mucha confianza.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[['민수 씨', 'Minsu-ssi → Minsu (señor/a)', '✓ Correcto entre conocidos'], ['데이비드 씨', 'David-ssi → David (señor/a)', '✓ Para extranjeros también'], ['씨 민수 ✗', 'El 씨 va DESPUÉS del nombre', '✗ Error muy común'], ['선생님 ✗ + 씨', '씨 NO se usa con títulos', '✗ 선생님씨 es incorrecto']].map(([kr, es, note], i) => (
            <div key={i} style={{ background: i > 1 ? 'rgba(220,53,69,0.04)' : 'var(--bg-2)', border: `1px solid ${i > 1 ? 'rgba(220,53,69,0.2)' : 'var(--line-soft)'}`, borderRadius: 10, padding: '12px 14px' }}>
              <p style={{ margin: '0 0 4px', fontSize: 18, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, color: i > 1 ? '#dc3545' : accent }}>{kr}</p>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--ink)' }}>{es}</p>
              <p style={{ margin: 0, fontSize: 11, color: i > 1 ? '#dc3545' : '#22c55e', fontWeight: 600 }}>{note}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          Regla importante: <strong>씨 nunca se usa solo</strong> — siempre va después del nombre. Y no se combina con títulos (선생님, 교수님, 사장님). "민수 씨는 뭐해요?" = "¿Qué hace Minsu?" — un uso natural y educado del honorífico.
        </p>
      </div>

      {/* 5 — Errores */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>5. Los errores más comunes con 에서 / 에</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { n: '01', title: 'Usar 에 con verbos de acción en un lugar', wrong: '카페에 일해요 ✗', right: '카페에서 일해요 ✓', why: 'Trabajar es una acción que ocurre en el café → 에서. 에 se usaría con 가요/있어요: "카페에 가요" (voy al café).' },
            { n: '02', title: 'Usar 에서 con verbos de movimiento', wrong: '학교에서 가요 ✗', right: '학교에 가요 ✓', why: '가다 (ir) indica movimiento hacia un destino → 에. 에서 indicaría que la acción de "ir" ocurre dentro de la escuela, lo cual no tiene sentido.' },
            { n: '03', title: 'Escribir 씨 antes del nombre', wrong: '씨 민수 ✗', right: '민수 씨 ✓', why: 'El honorífico 씨 siempre va DESPUÉS del nombre, nunca antes. Es un sufijo, no un prefijo.' },
          ].map(e => (
            <div key={e.n} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 14 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--muted)', opacity: 0.3, flexShrink: 0, lineHeight: 1.2 }}>{e.n}</span>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700 }}>{e.title}</p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <code style={{ fontSize: 13, padding: '3px 10px', background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 6, color: '#dc3545', fontFamily: "'Noto Sans KR',sans-serif" }}>{e.wrong}</code>
                  <code style={{ fontSize: 13, padding: '3px 10px', background: 'rgba(45,155,78,0.06)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 6, color: '#2d9b4e', fontFamily: "'Noto Sans KR',sans-serif" }}>{e.right}</code>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{e.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: `${accent}0d`, border: `1px solid ${accent}30`, borderRadius: 14, padding: '20px 24px' }}>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent }}>Has completado los 7 días fundamentales</p>
        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>Bases sólidas del coreano — lo que ya dominas</h4>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>Orden SOV · Hangul completo · Cortesía y niveles · Números nativos y sino-coreanos · Cópula 이에요/예요 · Partículas 에/에서 · Verbos 하다. Con estas bases construyes el 80% del coreano conversacional.</p>
      </div>
    </section>
  );
}
