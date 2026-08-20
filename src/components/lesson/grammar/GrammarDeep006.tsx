/** GrammarDeep006 — Server Component. SEO: 이에요 예요 diferencia, cópula coreana, -ㄹ래요, 어때요. */

export default function GrammarDeep006() {
  const accent = '#8b5cf6';
  return (
    <section aria-label="Explicación gramatical — Día 6: Cópula y campus" style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.25rem 4rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--ink)' }}>

      <div style={{ marginBottom: '2.5rem', borderTop: `3px solid ${accent}`, paddingTop: '2rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>REFERENCIA GRAMATICAL · DÍA 6</p>
        <h2 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>이에요 vs 예요: la cópula coreana y cómo presentarte</h2>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>La diferencia entre 이에요 y 예요, cómo hacer invitaciones con -ㄹ래요, y por qué 어때요 es la pregunta más versátil del coreano cotidiano.</p>
      </div>

      {/* 1 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>1. La cópula coreana — el verbo "ser/estar" que no existe igual</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          En español usamos "soy / es / eres" para identificar. En coreano la cópula es <strong>이다</strong> (ida), que en el nivel educado (-요) se convierte en <strong>이에요</strong> o <strong>예요</strong> dependiendo de la última letra del sustantivo que precede. No es arbitrario — es fonológico: el coreano evita el sonido "i-e" doble cuando la palabra ya termina en vocal.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          {[
            { rule: 'Termina en CONSONANTE', suffix: '이에요', example: '학생이에요', meaning: 'Es/soy estudiante', breakdown: 'hak-saeng + 이에요', color: accent },
            { rule: 'Termina en VOCAL', suffix: '예요', example: '의사예요', meaning: 'Es/soy médico/a', breakdown: 'ui-sa + 예요', color: '#22c55e' },
          ].map(r => (
            <div key={r.rule} style={{ background: 'var(--bg-2)', border: `2px solid ${r.color}25`, borderRadius: 12, padding: '16px', borderLeft: `4px solid ${r.color}` }}>
              <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 800, color: r.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.rule}</p>
              <p style={{ margin: '0 0 8px', fontSize: 28, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 800, color: r.color, lineHeight: 1 }}>{r.suffix}</p>
              <p style={{ margin: '0 0 4px', fontSize: 16, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, color: 'var(--ink)' }}>{r.example}</p>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--muted)' }}>{r.meaning}</p>
              <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{r.breakdown}</p>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr' }}>
            {[['Término','Termina en','Cópula correcta'],['콜롬비아 사람 (colombiano)','모음 a (vocal)','콜롬비아 사람이에요'],['한국 사람 (coreano)','국 k (consonante)','한국 사람이에요'],['의사 (médico)','사 a (vocal)','의사예요'],['학생 (estudiante)','생 ng (consonante)','학생이에요'],['데이비드 (David)','드 eu (vocal)','데이비드예요']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`cop-${ri}-${ci}`} style={{ padding: '9px 12px', fontSize: ri === 0 ? 10 : ci === 0 ? 14 : 13, fontFamily: ci === 0 && ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : ci === 0 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 2 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 2 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>2. -ㄹ래요 — cómo invitar en coreano</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El sufijo <strong>-ㄹ래요</strong> (o -을래요 si la raíz termina en consonante) expresa una invitación amable o una propuesta entre iguales. Es más suave que un imperativo y más informal que -시겠어요. Su tono es "¿te apetece...?" o "¿quieres...?".
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {[['커피 마실래요?','keo-pi ma-sil-lae-yo?','¿Quieres tomar un café?','마시다 (beber) + -ㄹ래요'],['같이 갈래요?','ga-chi gal-lae-yo?','¿Quieres ir juntos?','가다 (ir) + -ㄹ래요'],['밥 먹을래요?','bap meo-geul-lae-yo?','¿Quieres comer?','먹다 (comer) + -을래요 (consonante)'],['앉을래요?','an-jeul-lae-yo?','¿Quieres sentarte?','앉다 + -을래요 (consonante)']].map(([kr, rom, es, note]) => (
            <div key={kr} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '10px 12px', fontFamily: "'Noto Sans KR',sans-serif", fontSize: 15, fontWeight: 700, color: accent, borderRight: '1px solid var(--line-soft)' }}>{kr}</div>
              <div style={{ padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', borderRight: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center' }}>{rom}</div>
              <div style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: 'var(--ink)', borderRight: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center' }}>{es}</div>
              <div style={{ padding: '10px 12px', fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>{note}</div>
            </div>
          ))}
        </div>
        <div style={{ background: `${accent}08`, border: `1px solid ${accent}25`, borderRadius: 10, padding: '12px 16px' }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>💡 <strong>Diferencia clave:</strong> -ㄹ래요 es una propuesta con la que el otro puede decir que no sin incomodidad. 같이 마실래요? = ¿Te apetece? vs. 마시세요 = Bebe (imperativo). La diferencia de registro es enorme.</p>
        </div>
      </div>

      {/* 3 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>3. 어때요 — la pregunta más versátil del coreano</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700, fontSize: 17 }}>어때요?</span> viene de 어떻다 (ser de cierta manera) conjugado en nivel -요. Su traducción más cercana es "¿qué tal? / ¿cómo es? / ¿qué te parece?". Funciona como evaluación, opinión y pregunta de bienestar — es imposiblemente versátil.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {[['대학교 어때요?','dae-hak-gyo eo-ttae-yo?','¿Qué tal la universidad?','→ 좋아요! (¡Está bien!)'],['한국 어때요?','han-guk eo-ttae-yo?','¿Qué tal Corea?','→ 재미있어요 (¡Es interesante!)'],['커피 어때요?','keo-pi eo-ttae-yo?','¿Qué tal el café? / ¿Un café?','→ 좋아요! (¡Bien!)'],['이 카페 어때요?','i ka-pe eo-ttae-yo?','¿Qué tal este café?','→ 좋아요! / 괜찮아요']].map(([kr, rom, es, resp]) => (
            <div key={kr} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, padding: '12px 14px' }}>
              <p style={{ margin: '0 0 2px', fontSize: 16, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, color: accent }}>{kr}</p>
              <p style={{ margin: '0 0 4px', fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{rom}</p>
              <p style={{ margin: '0 0 4px', fontSize: 13, color: 'var(--ink)' }}>{es}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#22c55e', fontStyle: 'italic' }}>{resp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 — Errores */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>4. Errores más comunes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { n: '01', title: 'Usar 예요 después de consonante', wrong: '학생예요 ✗', right: '학생이에요 ✓', why: '학생 termina en ㅇ (consonante "ng"). Necesita 이에요. La regla es: si la última letra es consonante → 이에요.' },
            { n: '02', title: 'Usar 이에요 después de vocal', wrong: '의사이에요 ✗', right: '의사예요 ✓', why: '의사 termina en 사 (vocal "a"). Necesita 예요 para evitar el doble sonido "i-e".' },
            { n: '03', title: 'Confundir -ㄹ래요 con -고 싶어요', why: '-고 싶어요 expresa deseo propio ("quiero...") pero no es invitación. -ㄹ래요 es la invitación al otro. "마시고 싶어요" = quiero beber (yo); "마실래요?" = ¿quieres beber (tú/nosotros)?.' },
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
        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>Día 7: Rutina universitaria — 에서 vs 에</h4>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>La diferencia entre 에서 y 에 es el error más común en estudiantes intermedios de coreano. En el Día 7 la dominas con contexto real: David estudia en la universidad y trabaja en el café.</p>
      </div>
    </section>
  );
}
