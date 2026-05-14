// App principal — Idiomas WeLearn
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "welearn",
  "showStats": true
}/*EDITMODE-END*/;

function App() {
  const [authOpen, setAuthOpen] = useStateApp(false);
  const [authMode, setAuthMode] = useStateApp('register');
  const [user, setUser] = useStateApp(null);
  const [toast, setToast] = useStateApp('');
  const tw = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [tweaks, setTweak] = tw;

  // Aplicar paleta al body
  useEffectApp(() => {
    document.body.setAttribute('data-palette', tweaks.palette || 'welearn');
  }, [tweaks.palette]);

  // Reveal on scroll
  window.useReveal && window.useReveal();

  function openLogin() { setAuthMode('login'); setAuthOpen(true); }
  function openRegister() { setAuthMode('register'); setAuthOpen(true); }

  function onAuthSuccess(form) {
    setUser(form);
    setAuthOpen(false);
    const msg = authMode === 'login' ? `Bienvenido de vuelta, ${form.email}` : `Cuenta creada — ¡a estudiar!`;
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  }

  return (
    <>
      <Nav onLogin={openLogin} onRegister={openRegister} />
      <Hero onRegister={openRegister} />
      {tweaks.showStats !== false && <Stats />}
      <Idiomas onPickLang={(idi) => { openRegister(); }} />
      <Metodo />
      <Examenes />
      <LessonPreview onRegister={openRegister} />
      <Testi />
      <Pricing onRegister={openRegister} />
      <Faq />
      <CtaFinal onRegister={openRegister} />
      <Foot />

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={setAuthMode}
        onSuccess={onAuthSuccess}
      />

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)',
          background:'var(--ink)', color:'var(--accent-ink)',
          padding:'14px 22px', borderRadius:999,
          fontSize:14, zIndex:200,
          boxShadow:'0 12px 40px rgba(0,0,0,0.18)',
          animation:'toastIn .4s cubic-bezier(.2,.7,.2,1)'
        }}>
          {toast}
        </div>
      )}

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Paleta">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
              {[
                { label:'WeLearn',   value:'welearn',   bg:'#ffffff', fg:'#14215c', accent:'#c8202e' },
                { label:'Marine',    value:'marine',    bg:'#fafbfd', fg:'#0b1442', accent:'#3a78c8' },
                { label:'Tinta',     value:'ink',       bg:'#fafafa', fg:'#111317', accent:'#c8202e' },
                { label:'Burdeos',   value:'burdeos',   bg:'#fcfaf8', fg:'#3a0e16', accent:'#a83a47' },
              ].map(p => {
                const active = tweaks.palette === p.value;
                return (
                  <button
                    key={p.value}
                    onClick={() => setTweak('palette', p.value)}
                    style={{
                      background: p.bg,
                      border: active ? '2px solid '+p.fg : '1px solid rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      padding: '10px 10px',
                      display:'flex', alignItems:'center', gap:8,
                      cursor:'pointer',
                      transition:'transform .2s, border-color .2s',
                      transform: active ? 'translateY(-1px)' : 'none'
                    }}>
                    <span style={{display:'flex', gap:3}}>
                      <span style={{width:14, height:14, borderRadius:3, background:p.fg, flexShrink:0}}></span>
                      <span style={{width:14, height:14, borderRadius:3, background:p.accent, flexShrink:0}}></span>
                    </span>
                    <span style={{color:p.fg, fontSize:12, fontWeight:500, letterSpacing:'-0.005em'}}>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </window.TweakSection>
          <window.TweakSection label="Layout">
            <window.TweakToggle
              label="Barra de estadísticas"
              value={tweaks.showStats !== false}
              onChange={(v) => setTweak('showStats', v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
}

// Animaciones extra
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes toastIn { from { opacity: 0; transform: translate(-50%, 10px) } to { opacity: 1; transform: translate(-50%, 0) } }
`;
document.head.appendChild(styleTag);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
