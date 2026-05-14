// Preview de lección con paywall
const { useState: useStateL } = React;

function LessonPreview({ onRegister }) {
  const [lang, setLang] = useStateL('ko');
  const [showPaywall, setShowPaywall] = useStateL(false);
  const idi = window.IDIOMAS.find(i => i.code === lang);
  const vocab = window.VOCAB[lang] || window.VOCAB.ko;

  return (
    <section className="preview-wrap" id="preview">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="ink-line"></span>06 — Vista previa</span>
          <h2>Mira cómo se ve<br />un día completo.</h2>
          <p>Esta es la pantalla real del paso 01 — Activación. Cambia el idioma para
          ver cómo se adapta el contenido.</p>
        </div>

        <div className="reveal">
          <div className="preview-tabs">
            {[
              {c:'ko', l:'Coreano'},
              {c:'ja', l:'Japonés'},
              {c:'en', l:'Inglés'},
              {c:'it', l:'Italiano'},
              {c:'fr', l:'Francés'},
              {c:'de', l:'Alemán'},
            ].map(t => (
              <button key={t.c} className={lang === t.c ? 'active' : ''} onClick={() => { setLang(t.c); setShowPaywall(false); }}>
                {t.l}
              </button>
            ))}
          </div>

          <div className="lesson-frame">
            {/* HEADER */}
            <div className="lesson-header">
              <div style={{display:'flex', alignItems:'center', gap:14}}>
                <div style={{width:32, height:32, background:'var(--ink)', color:'var(--accent-ink)', borderRadius:6, display:'grid', placeItems:'center', fontFamily:'var(--sans)', fontSize:13, fontWeight:600, letterSpacing:'-0.02em'}}>{idi.flag}</div>
                <div>
                  <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.14em', color:'var(--muted)', textTransform:'uppercase'}}>Día 1 · {idi.name}</div>
                  <div style={{fontFamily:'var(--sans)', fontSize:16, marginTop:2, fontWeight:600, letterSpacing:'-0.02em', color:'var(--ink)'}}>Vocabulario fundamental</div>
                </div>
              </div>
              <div className="lesson-bar">
                {Array.from({length:11}).map((_,i) => (
                  <div key={i} className={i === 0 ? 'curr' : ''}></div>
                ))}
              </div>
              <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)', letterSpacing:'0.06em'}}>01 / 11</div>
            </div>

            {/* BODY */}
            <div className="lesson-body">
              <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:48}}>
                <div>
                  <div className="lesson-step-num">Paso 01 · Activación · 6 min</div>
                  <div className="lesson-step-title serif">
                    Conoce las primeras<br />seis palabras.
                  </div>
                  <div className="lesson-step-desc">
                    Mira la palabra, escucha cómo se pronuncia y asóciala con su imagen.
                    No tienes que memorizar — la repetición vendrá después.
                  </div>

                  <div className="lesson-vocab-grid">
                    {vocab.map((v, i) => (
                      <div className="v-card" key={i}>
                        <div className="v-img">{v.emoji}</div>
                        <div className="v-glyph">{v.glyph}</div>
                        <div className="v-roman">{v.roman}</div>
                        <div className="v-mean">{v.mean}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.14em', color:'var(--muted)', textTransform:'uppercase', marginBottom:12}}>
                    Los 11 pasos del día
                  </div>
                  <ul className="lesson-step-list">
                    {window.PASOS.map((p, i) => (
                      <li className={'lstep ' + (i === 0 ? 'active' : '')} key={p.n}>
                        <span className="lstep-n">{p.n}</span>
                        <span>{p.name}</span>
                        {i === 0 ? (
                          <span className="lock">en curso</span>
                        ) : (
                          <span className="lock">⌐ bloqueado</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* NAV */}
            <div className="lesson-nav">
              <button className="btn btn-ghost btn-sm" disabled style={{opacity:0.5}}>← Paso anterior</button>
              <div style={{display:'flex', gap:14, alignItems:'center'}}>
                <span style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)', letterSpacing:'0.06em'}}>
                  Has visto 6/6 palabras
                </span>
                <button className="btn btn-sm" onClick={() => setShowPaywall(true)}>
                  Continuar al paso 02
                  <span className="arrow">→</span>
                </button>
              </div>
            </div>

            {/* PAYWALL OVERLAY */}
            {showPaywall && (
              <div style={{position:'absolute', inset:0, background:'rgba(14,14,14,0.45)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', display:'grid', placeItems:'center', padding:24, animation:'fadeIn .4s'}}>
                <div className="paywall-inner reveal in" style={{margin:0}}>
                  <span className="eyebrow"><span className="ink-line"></span>Paso 01 completado</span>
                  <h4 className="serif">Sigamos los otros<br />diez pasos.</h4>
                  <p>El primer paso siempre es gratis. Continúa con Adquisición, Reconocimiento,
                  Escucha sobrevivible y todo lo demás con una cuenta.</p>
                  <button className="btn" onClick={onRegister}>
                    Desbloquear día 1 completo<span className="arrow">→</span>
                  </button>
                  <div className="paywall-note">$19 / mes · cancela cuando quieras</div>
                  <button onClick={() => setShowPaywall(false)} style={{background:'transparent', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:12, marginTop:14, textDecoration:'underline'}}>
                    Volver al paso 01
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

window.LessonPreview = LessonPreview;
