/** GrammarDeep005 — Server Component. SEO: -습니다 formal, números sino-coreanos, 얼마예요 precios. */

export default function GrammarDeep005() {
  const accent = '#0ea5e9';
  return (
    <section aria-label="Explicación gramatical — Día 5: Pago y formalidad" style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.25rem 4rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--ink)' }}>

      <div style={{ marginBottom: '2.5rem', borderTop: `3px solid ${accent}`, paddingTop: '2rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>REFERENCIA GRAMATICAL · DÍA 5</p>
        <h2 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>얼마예요, -습니다 y números sino-coreanos: pagar en Corea</h2>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>Cómo preguntar precios, decir cantidades en won con los números sino-coreanos, y cuándo usar el nivel de formalidad máximo -습니다.</p>
      </div>

      {/* 1 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>1. 얼마예요? — cómo preguntar precios</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700, fontSize: 17 }}>얼마예요?</span> (eol-ma-ye-yo) es la pregunta de precio universal. <strong>얼마</strong> = "cuánto (dinero)" + <strong>예요</strong> = forma copulativa del nivel -요. Para añadir contexto, señala el objeto con el dedo y la frase es completa sin más palabras.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {[['이거 얼마예요?','i-geo eol-ma-ye-yo','¿Cuánto cuesta esto?','이거 = esto (cerca)'],['저거 얼마예요?','jeo-geo eol-ma-ye-yo','¿Cuánto cuesta eso?','저거 = aquello (lejos)'],['다 얼마예요?','da eol-ma-ye-yo','¿Cuánto es todo?','다 = todo'],['얼마예요?','eol-ma-ye-yo','¿Cuánto es?','sola, señalando con el dedo']].map(([kr, rom, es, note]) => (
            <div key={kr} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '10px 12px', fontFamily: "'Noto Sans KR',sans-serif", fontSize: 15, fontWeight: 700, color: accent, borderRight: '1px solid var(--line-soft)' }}>{kr}</div>
              <div style={{ padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', borderRight: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center' }}>{rom}</div>
              <div style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: 'var(--ink)', borderRight: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center' }}>{es}</div>
              <div style={{ padding: '10px 12px', fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>2. Números sino-coreanos — para precios y dinero</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          Los precios en Corea se dicen siempre con los números sino-coreanos. Son de origen chino y siguen una lógica multiplicativa clara: <strong>이십 = 2×10 = 20</strong>, <strong>삼백 = 3×100 = 300</strong>. Una vez memorizas los 10 básicos, construyes cualquier número.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
            {[['일','이','삼','사','오'],['육','칠','팔','구','십'],['1','2','3','4','5'],['6','7','8','9','10']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`s-${ri}-${ci}`} style={{ padding: '10px 8px', textAlign: 'center', fontSize: ri < 2 ? 22 : 12, fontFamily: ri < 2 ? "'Noto Sans KR',sans-serif" : 'var(--mono)', fontWeight: ri < 2 ? 700 : 400, color: ri < 2 ? accent : 'var(--muted)', background: ri < 2 ? (ri === 0 ? `${accent}12` : `${accent}08`) : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none' }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {[['Cifra','Coreano','Ejemplo precio'],['100','백 (baek)','백 원 = 100₩'],['1.000','천 (cheon)','천 원 = 1.000₩'],['10.000','만 (man)','만 원 = 10.000₩'],['7.000','칠천 (chil-cheon)','칠천 원 = 7.000₩'],['15.000','만 오천 (man o-cheon)','만 오천 원 = 15.000₩']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`p-${ri}-${ci}`} style={{ padding: '9px 12px', fontSize: ri === 0 ? 10 : ci === 1 ? 16 : 13, fontFamily: ci === 1 && ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : ci === 1 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 1 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
        <div style={{ background: `${accent}08`, border: `1px solid ${accent}25`, borderRadius: 10, padding: '12px 16px' }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>💡 <strong>Nota cultural:</strong> en Corea el billete más común es el de 만 원 (10.000₩ ≈ 7€). Los precios en cafés y comida rápida suelen estar entre 삼천 원 (3.000₩) y 팔천 원 (8.000₩). Tener el número memorializado hace las transacciones mucho más fluidas.</p>
        </div>
      </div>

      {/* 3 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>3. -습니다 y -ㅂ니다 — el nivel formal máximo</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El sufijo <strong>-습니다 / -ㅂ니다</strong> es el nivel de formalidad más alto del coreano cotidiano. Lo escucharás en anuncios de transporte, noticias, presentaciones formales y en el personal de servicio entrenado. <strong>여기 있습니다</strong> ("aquí tiene") es el ejemplo perfecto: mismo significado que 여기 있어요, pero el sufijo -ㅂ니다 lo eleva a la máxima cortesía.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {[['Raíz','Nivel -요 (educado)','Nivel -ㅂ니다 (formal)'],['있다 (haber)','있어요','있습니다'],['없다 (no haber)','없어요','없습니다'],['가다 (ir)','가요','갑니다'],['오다 (venir)','와요','옵니다'],['하다 (hacer)','해요','합니다']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`f-${ri}-${ci}`} style={{ padding: '9px 12px', fontSize: ri === 0 ? 10 : ci === 0 ? 13 : 16, fontFamily: ci > 0 && ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : ci === 2 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 2 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La regla de formación: si la raíz verbal termina en vocal → <strong>-ㅂ니다</strong> (갑니다, 옵니다). Si termina en consonante → <strong>-습니다</strong> (있습니다, 없습니다). En ambos casos la pronunciación del sufijo es idéntica: "-mnida".
        </p>
      </div>

      {/* 4 — Errores */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>4. Errores frecuentes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { n: '01', title: 'Mezclar números nativos y sino-coreanos en precios', wrong: '하나천 원 ✗', right: '일천 원 / 천 원 ✓', why: 'Para precios siempre se usan sino-coreanos. El 천 (sino) es correcto; 하나천 mezcla los dos sistemas.' },
            { n: '02', title: 'Omitir 원 al decir precios', why: '원 (won) es el contador de moneda y no se omite en conversación formal. Decir solo 칠천 sin 원 suena incompleto, como decir "siete mil" sin "pesos" o "euros".' },
            { n: '03', title: 'Usar -습니다 con amigos', why: 'El nivel -습니다 en una conversación informal suena artificialmente rígido y crea distancia. Con amigos usa el nivel -요 o incluso formas sin sufijo.' },
          ].map(e => (
            <div key={e.n} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 14 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--muted)', opacity: 0.3, flexShrink: 0, lineHeight: 1.2 }}>{e.n}</span>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700 }}>{e.title}</p>
                {e.wrong && (
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <code style={{ fontSize: 13, padding: '3px 10px', background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 6, color: 'var(--wl-on-panel-alert, #dc3545)', fontFamily: "'Noto Sans KR',sans-serif" }}>{e.wrong}</code>
                    <code style={{ fontSize: 13, padding: '3px 10px', background: 'rgba(45,155,78,0.06)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 6, color: 'var(--wl-on-panel-ok, #2d9b4e)', fontFamily: "'Noto Sans KR',sans-serif" }}>{e.right}</code>
                  </div>
                )}
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{e.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: `${accent}0d`, border: `1px solid ${accent}30`, borderRadius: 14, padding: '20px 24px' }}>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent }}>Siguiente paso</p>
        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>Día 6: Primer día en el campus — cópula 이에요/예요</h4>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>Aprende a presentarte, decir tu nacionalidad y hacer invitaciones con -ㄹ래요. La cópula 이에요/예요 es la diferencia entre "soy de Colombia" y un error de principiante.</p>
      </div>
    </section>
  );
}
