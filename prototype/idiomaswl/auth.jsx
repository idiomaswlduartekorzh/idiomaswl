// Modal de autenticación
const { useState: useStateA, useEffect: useEffectA } = React;

function AuthModal({ open, mode, onClose, onSwitchMode, onSuccess }) {
  const [step, setStep] = useStateA(0); // registro multi-step
  const [form, setForm] = useStateA({
    name: '', email: '', password: '', language: 'ko', level: 'principiante', goal: 'placer'
  });

  useEffectA(() => {
    if (open) {
      setStep(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffectA(() => {
    function onKey(e) { if (e.key === 'Escape' && open) onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function update(k, v) { setForm(f => ({...f, [k]: v})); }

  function submitRegister(e) {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else onSuccess(form);
  }

  function submitLogin(e) {
    e.preventDefault();
    onSuccess(form);
  }

  return (
    <div className={'modal-backdrop ' + (open ? 'open' : '')} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>

        <aside className="modal-aside">
          <div>
            <span className="eyebrow">
              {mode === 'login' ? 'Bienvenido de vuelta' : 'Bienvenido'}
            </span>
            <h3>
              {mode === 'login' ? (
                <>Sigamos<br />donde quedaste.</>
              ) : step === 0 ? (
                <>El primer<br />día es gratis.</>
              ) : step === 1 ? (
                <>Cuéntanos<br />qué estudias.</>
              ) : (
                <>Listo para<br />el paso 01.</>
              )}
            </h3>
          </div>

          <div>
            <div className="modal-aside-bottom">
              {mode === 'login' ? '01 / 01' : `0${step+1} / 03`}
              <span>{mode === 'login' ? 'Iniciar sesión' : ['Tus datos','Tu idioma','Tu objetivo'][step]}</span>
            </div>
          </div>
        </aside>

        <main className="modal-main">
          {mode === 'login' ? (
            <form onSubmit={submitLogin}>
              <h2>Inicia sesión</h2>
              <p className="modal-sub">Te tomará 10 segundos.</p>

              <div className="field">
                <label>Correo electrónico</label>
                <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="tu@correo.com" />
              </div>
              <div className="field">
                <label>Contraseña</label>
                <input type="password" required value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" />
              </div>

              <button className="btn" type="submit">Entrar<span className="arrow">→</span></button>

              <div className="modal-divider">o continuar con</div>
              <div className="sso-btns">
                <button type="button" className="sso">Google</button>
                <button type="button" className="sso">Apple</button>
              </div>

              <div className="modal-foot">
                ¿Sin cuenta? <a onClick={() => onSwitchMode('register')} style={{cursor:'pointer'}}>Crea una</a>
              </div>
            </form>
          ) : (
            <form onSubmit={submitRegister}>
              {step === 0 && (
                <>
                  <h2>Crea tu cuenta</h2>
                  <p className="modal-sub">Empezamos por lo básico.</p>
                  <div className="field">
                    <label>Nombre</label>
                    <input required value={form.name} onChange={e => update('name', e.target.value)} placeholder="María Acosta" />
                  </div>
                  <div className="field">
                    <label>Correo</label>
                    <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="tu@correo.com" />
                  </div>
                  <div className="field">
                    <label>Contraseña</label>
                    <input type="password" required minLength="6" value={form.password} onChange={e => update('password', e.target.value)} placeholder="mínimo 6 caracteres" />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2>¿Qué quieres estudiar?</h2>
                  <p className="modal-sub">Puedes añadir más idiomas después.</p>
                  <div className="field">
                    <label>Idioma</label>
                    <select value={form.language} onChange={e => update('language', e.target.value)}>
                      {window.IDIOMAS.map(i => <option key={i.code} value={i.code}>{i.name} — {i.native}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Tu nivel actual</label>
                    <select value={form.level} onChange={e => update('level', e.target.value)}>
                      <option value="principiante">Empiezo desde cero</option>
                      <option value="basico">Sé algunas cosas básicas (A1-A2)</option>
                      <option value="intermedio">Intermedio (B1-B2)</option>
                      <option value="avanzado">Avanzado (C1+)</option>
                    </select>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2>¿Cuál es tu objetivo?</h2>
                  <p className="modal-sub">Esto nos ayuda a ajustar tu plan.</p>
                  <div className="field" style={{display:'flex', flexDirection:'column', gap:8}}>
                    {[
                      {v:'placer', t:'Por placer / cultura', s:'Sin presión de tiempo'},
                      {v:'viaje', t:'Para un viaje', s:'Énfasis en lo conversacional'},
                      {v:'trabajo', t:'Para el trabajo', s:'Foco en vocabulario profesional'},
                      {v:'examen', t:'Preparar un examen', s:'TOEFL, IELTS, Goethe, etc.'},
                    ].map(g => (
                      <label key={g.v} style={{
                        display:'flex', gap:12, padding:'14px 16px',
                        border:'1px solid var(--line-soft)', borderRadius:10,
                        cursor:'pointer', alignItems:'center',
                        background: form.goal === g.v ? 'var(--ink)' : 'var(--bg-2)',
                        color: form.goal === g.v ? 'var(--accent-ink)' : 'var(--ink)',
                        transition: 'all .2s'
                      }}>
                        <input type="radio" name="goal" value={g.v} checked={form.goal === g.v} onChange={e => update('goal', e.target.value)} style={{accentColor:'currentColor'}} />
                        <div>
                          <div style={{fontSize:14, fontWeight:500}}>{g.t}</div>
                          <div style={{fontSize:12, opacity:0.7, marginTop:2}}>{g.s}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </>
              )}

              <button className="btn" type="submit">
                {step < 2 ? 'Siguiente' : 'Comenzar el paso 01'}
                <span className="arrow">→</span>
              </button>

              {step === 0 && (
                <>
                  <div className="modal-divider">o continuar con</div>
                  <div className="sso-btns">
                    <button type="button" className="sso">Google</button>
                    <button type="button" className="sso">Apple</button>
                  </div>
                </>
              )}

              <div className="modal-foot">
                {step > 0 && (
                  <button type="button" onClick={() => setStep(step - 1)} style={{background:'transparent', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:13, marginRight:10}}>← Atrás</button>
                )}
                {mode === 'register' && step === 0 && (
                  <>¿Ya tienes cuenta? <a onClick={() => onSwitchMode('login')} style={{cursor:'pointer'}}>Inicia sesión</a></>
                )}
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

window.AuthModal = AuthModal;
