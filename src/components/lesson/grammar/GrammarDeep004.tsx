/** GrammarDeep004 — Server Component. SEO: números nativos coreanos, hana dul set, adjetivos. */

export default function GrammarDeep004() {
  const accent = '#f97316';
  return (
    <section aria-label="Explicación gramatical — Día 4: Números nativos y mercado" style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.25rem 4rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--ink)' }}>

      <div style={{ marginBottom: '2.5rem', borderTop: `3px solid ${accent}`, paddingTop: '2rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>REFERENCIA GRAMATICAL · DÍA 4</p>
        <h2 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>Números nativos coreanos: 하나, 둘, 셋 — contar en coreano</h2>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>El coreano tiene dos sistemas numéricos paralelos. Aquí aprendes el nativo (하나/둘/셋) usado para contar objetos, personas y las horas del reloj.</p>
      </div>

      {/* 1 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>1. Dos sistemas de números — el gran secreto del coreano</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El coreano tiene <strong>dos sistemas numéricos completamente paralelos</strong> que se usan en contextos distintos. Ninguno reemplaza al otro — ambos son indispensables. El sistema <em>nativo coreano</em> (순우리말 수) se usa para contar objetos físicos, personas y las horas del reloj. El sistema <em>sino-coreano</em> (sino = de origen chino) se usa para precios, fechas, minutos, metros y números de teléfono.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          {[
            { title: 'Números NATIVOS', examples: ['하나 (hana) = 1 objeto', '두 개 = 2 cosas', '세 시 = las 3 en punto', '네 명 = 4 personas'], color: accent, when: 'objetos, personas, horas' },
            { title: 'Números SINO-COREANOS', examples: ['일 (il) = 1 en precios', '천 원 = 1.000 won', '삼십 분 = 30 minutos', '오월 = mayo (mes 5)'], color: 'var(--wl-on-panel-link, #6c63ff)', when: 'precios, fechas, minutos' },
          ].map(s => (
            <div key={s.title} style={{ background: 'var(--bg-2)', border: `2px solid ${s.color}20`, borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${s.color}` }}>
              <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.title}</p>
              <p style={{ margin: '0 0 10px', fontSize: 11, color: 'var(--muted)' }}>Cuándo: {s.when}</p>
              {s.examples.map(ex => <p key={ex} style={{ margin: '0 0 3px', fontSize: 13, color: 'var(--ink)' }}>• {ex}</p>)}
            </div>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>Este día cubrimos los números nativos. Los sino-coreanos aparecen en el Día 5 con los precios en won.</p>
      </div>

      {/* 2 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>2. Números nativos 1–10</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          Los números 1 y 2 tienen una forma especial cuando van antes de un contador: 하나 → 한, 둘 → 두. El resto (셋, 넷, 다섯...) cambian menos. Esta forma reducida es la que escucharás más en conversación real.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 1fr 1fr 1fr' }}>
            {[['#','Forma base','Ante contador','Romano'],['1','하나','한','hana / han'],['2','둘','두','dul / du'],['3','셋','세','set / se'],['4','넷','네','net / ne'],['5','다섯','다섯','da-seot'],['6','여섯','여섯','yeo-seot'],['7','일곱','일곱','il-gop'],['8','여덟','여덟','yeo-deol'],['9','아홉','아홉','a-hop'],['10','열','열','yeol']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`n-${ri}-${ci}`} style={{ padding: '9px 10px', textAlign: 'center', fontSize: ri === 0 ? 10 : ci < 3 ? 18 : 12, fontFamily: ri > 0 && ci < 3 ? "'Noto Sans KR',sans-serif" : ci === 3 ? 'var(--mono)' : 'inherit', fontWeight: ri === 0 ? 700 : ci < 2 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 1 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
          <strong>Ejemplo práctico:</strong> en el mercado, <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent }}>호떡 하나 주세요</span> = "un hodduk, por favor" (하나, no 한, porque está al final de la oración sin contador explícito).
        </p>
      </div>

      {/* 3 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>3. Adjetivos descriptivos: 맛있어요 y 뜨거워요</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          En coreano los adjetivos funcionan como verbos — se conjugan con los mismos sufijos. <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700 }}>맛있어요</span> no es "es delicioso" en sentido copulativo — el adjetivo <em>ya contiene</em> la información "es". No necesita verbo ser separado.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {[['맛있어요','mat-i-sseo-yo','¡Está delicioso!','맛 (sabor) + 있어요 (hay/existe)'],['맛없어요','mas-eob-sseo-yo','No está rico','맛 (sabor) + 없어요 (no hay)'],['뜨거워요','tteu-geo-wo-yo','Está caliente','⚠ aviso de temperatura'],['조심하세요','jo-sim-ha-se-yo','Tenga cuidado','cortesía + imperativo suave'],['싸요','ssa-yo','Es barato','opuesto: 비싸요 (caro)']].map(([kr, rom, es, note]) => (
            <div key={kr} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '10px 12px', fontFamily: "'Noto Sans KR',sans-serif", fontSize: 16, fontWeight: 700, color: accent, borderRight: '1px solid var(--line-soft)' }}>{kr}</div>
              <div style={{ padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', borderRight: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center' }}>{rom}</div>
              <div style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: 'var(--ink)', borderRight: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center' }}>{es}</div>
              <div style={{ padding: '10px 12px', fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 — Errores */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>4. Errores frecuentes con los números nativos</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { n: '01', title: 'Usar sino-coreanos donde van nativos', wrong: '일 개 주세요 ✗', right: '하나 주세요 ✓', why: 'Para pedir cantidad de objetos se usan números nativos. 일 es del sistema sino y no suena natural al pedir hodduk.' },
            { n: '02', title: 'No reducir 하나→한 / 둘→두 ante contadores', wrong: '하나 개 ✗', right: '한 개 ✓', why: 'Cuando el número precede a un contador (개=cosas, 명=personas, 잔=vasos) hay que usar la forma reducida.' },
            { n: '03', title: 'Confundir 네 (4) con 네 (sí)', why: '네 significa tanto el número 4 como "sí". El contexto siempre lo aclara, pero al principio puede sorprender. 네 시 = las 4 en punto; 네 = sí.' },
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
        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>Día 5: Pago y despedida — números sino-coreanos</h4>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>En el Día 5 aprendes el segundo sistema numérico (sino-coreano) para decir precios en won. 칠천 원 = 7.000₩. También el nivel de formalidad máximo -습니다 y cómo pedir la cuenta.</p>
      </div>
    </section>
  );
}
