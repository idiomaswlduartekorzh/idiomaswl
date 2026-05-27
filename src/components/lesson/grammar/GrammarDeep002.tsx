/** GrammarDeep002 — Server Component. SEO: Hangul, vocales, consonantes, bloques silábicos. */

export default function GrammarDeep002() {
  const accent = '#f59e0b';
  return (
    <section aria-label="Explicación gramatical — Día 2: Hangul" style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.25rem 4rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--ink)' }}>

      <div style={{ marginBottom: '2.5rem', borderTop: `3px solid ${accent}`, paddingTop: '2rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>REFERENCIA GRAMATICAL · DÍA 2</p>
        <h2 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>Hangul: el alfabeto coreano explicado desde cero</h2>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>Cómo funciona el sistema de escritura más lógico del mundo — vocales, consonantes y bloques silábicos.</p>
      </div>

      {/* 1 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>1. ¿Por qué el Hangul es diferente a otros alfabetos?</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El Hangul (한글) fue creado en 1443 por el rey Sejong con un objetivo explícito: que cualquier persona pudiese aprenderlo en pocos días. A diferencia del chino o el japonés, que requieren memorizar cientos de caracteres, el Hangul tiene <strong>24 letras base</strong> que se combinan en bloques para formar sílabas. No es un sistema ideográfico — es un alfabeto fonético con lógica geométrica.
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La particularidad visual del Hangul es que las letras no se escriben en línea como en español, sino que se <strong>agrupan en bloques silábicos cuadrados</strong>. Cada bloque representa una sílaba y contiene entre 2 y 4 letras organizadas espacialmente.
        </p>
      </div>

      {/* 2 — Vocales */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>2. Las 10 vocales básicas</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El Hangul tiene 10 vocales simples construidas a partir de tres elementos: un punto (•), una línea horizontal (—) y una línea vertical (|). Las vocales que incluyen una línea horizontal se pronuncian con la boca más cerrada; las verticales, con la boca más abierta.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
            {[['아','어','오','우','으'],['이','야','여','요','유'],['a','eo','o','u','eu'],['i','ya','yeo','yo','yu']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`v-${ri}-${ci}`} style={{ padding: '10px 8px', textAlign: 'center', fontSize: ri < 2 ? 22 : 12, fontFamily: ri < 2 ? "'Noto Sans KR',sans-serif" : 'var(--mono)', fontWeight: ri < 2 ? 700 : 400, color: ri < 2 ? accent : 'var(--muted)', background: ri === 0 ? `${accent}12` : ri === 1 ? `${accent}08` : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none' }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
          <strong>Nota clave:</strong> la vocal <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent }}>으</span> no tiene equivalente exacto en español. Se pronuncia con los labios extendidos (como si dieras asco) y la lengua atrás. Es el sonido más difícil para hispanohablantes y aparece en palabras muy frecuentes.
        </p>
      </div>

      {/* 3 — Consonantes */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>3. Las 14 consonantes básicas</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          Las consonantes del Hangul fueron diseñadas para imitar la posición de los órganos vocales al pronunciarlas. Eso hace que tengan una lógica visual que facilita la memorización.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[['Consonante','Romano','Español aprox.','Ejemplo'],['ㄱ','g/k','g de gato','가 ga'],['ㄴ','n','n de noche','나 na'],['ㄷ','d/t','d de dedo','다 da'],['ㄹ','r/l','r suave + l','라 ra'],['ㅁ','m','m de mamá','마 ma'],['ㅂ','b/p','b de boca','바 ba'],['ㅅ','s','s de sol','사 sa'],['ㅇ','(mudo/ng)','mudo al inicio','아 a'],['ㅈ','j','ch de chico','자 ja'],['ㅎ','h','h aspirada','하 ha']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`c-${ri}-${ci}`} style={{ padding: '8px 10px', fontSize: ri === 0 ? 10 : ci === 0 ? 18 : 13, fontFamily: ci === 0 && ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : ci === 0 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 0 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 4 — Bloques */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>4. Bloques silábicos — la clave del sistema</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          Cada bloque del Hangul representa exactamente una sílaba. La estructura básica es <strong>consonante inicial + vocal</strong>. Opcionalmente, puede añadirse una consonante final (llamada 받침, batchim). Esta consonante final cambia el sonido de toda la sílaba.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[{ struct: 'C + V', example: '가', meaning: 'ㄱ + 아 = ga', color: '#6c63ff' }, { struct: 'C + V + C', example: '학', meaning: 'ㅎ + 아 + ㄱ = hak', color: accent }, { struct: 'O + V', example: '아', meaning: 'ㅇ(mudo) + 아 = a', color: '#22c55e' }].map(b => (
            <div key={b.struct} style={{ background: 'var(--bg-2)', border: `2px solid ${b.color}25`, borderRadius: 10, padding: '14px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: b.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{b.struct}</p>
              <p style={{ margin: '0 0 6px', fontSize: 36, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 800, color: b.color, lineHeight: 1 }}>{b.example}</p>
              <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{b.meaning}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La palabra <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700 }}>학교</span> tiene dos bloques: <strong>학</strong> (ㅎ+아+ㄱ = hak) + <strong>교</strong> (ㄱ+요 = gyo). Una vez entiendes la mecánica de los bloques, leer cualquier palabra en coreano es cuestión de minutos de práctica.
        </p>
      </div>

      {/* 5 — Errores */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>5. Los 3 errores más comunes al aprender Hangul</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { n: '01', title: 'Confundir ㅓ (eo) con ㅗ (o)', why: 'ㅓ se pronuncia con la boca más abierta y el sonido va hacia atrás. ㅗ tiene los labios redondeados. La diferencia es crítica: 어 ≠ 오.' },
            { n: '02', title: 'Ignorar el batchim (consonante final)', why: 'Muchos principiantes leen 학 como "ha" y omiten el ㄱ final. La consonante final cambia completamente la pronunciación y el significado.' },
            { n: '03', title: 'Leer el ㅇ inicial como una vocal', why: 'Cuando ㅇ aparece en posición inicial de un bloque es completamente mudo. 아 = "a", no "nga". Al final sí suena como "-ng".' },
          ].map(e => (
            <div key={e.n} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 14 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--muted)', opacity: 0.3, flexShrink: 0, lineHeight: 1.2 }}>{e.n}</span>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700 }}>{e.title}</p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{e.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 — Vocabulario */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>6. Vocabulario del Día 2 — lectura Hangul</h3>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {[['Hangul','Romano','Español'],['글자','geul-ja','letras / caracteres'],['보여요','bo-yeo-yo','se ve / aparece'],['어제','eo-je','ayer'],['오늘','o-neul','hoy'],['이제','i-je','ahora / ya'],['조금','jo-geum','un poco'],['나는','na-neun','yo (casual)'],['너','neo','tú (casual)']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`voc-${ri}-${ci}`} style={{ padding: '9px 12px', fontSize: ri === 0 ? 10 : ci === 0 ? 16 : 13, fontFamily: ci === 0 && ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : ci === 0 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 0 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div style={{ background: `${accent}0d`, border: `1px solid ${accent}30`, borderRadius: 14, padding: '20px 24px' }}>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent }}>Siguiente paso</p>
        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>Día 3: Tu primer café en Seúl</h4>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>En el Día 3 usas el Hangul que aprendiste para leer y pronunciar frases reales de una cafetería coreana. 안녕하세요, 주세요, 감사합니다 — las frases más escuchadas en Corea.</p>
      </div>
    </section>
  );
}
