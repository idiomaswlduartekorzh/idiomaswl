// Componentes de secciones para Idiomas WeLearn
const { useState, useEffect, useRef } = React;

// Hook para revelar al hacer scroll
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Decoración de marca — rayas diagonales tipo logo WeLearn
function BrandStreaks({ color = 'var(--ink)', variant = 'tl' }) {
  // Patrón: filas diagonales de pills horizontales con longitudes variables
  // Más densas hacia la esquina, decrecen hacia el centro
  const rows = [];
  const cols = 6;
  const rowCount = 6;
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < cols; c++) {
      // Distancia desde la esquina (0,0)
      const dist = r + c;
      if (dist > 7) continue; // no dibujar muy lejos
      // Longitudes pseudo-aleatorias pero determinísticas
      const seed = (r * 7 + c * 13) % 5;
      const lengths = [22, 36, 28, 44, 18];
      const w = lengths[seed];
      // Opacidad: decrece con la distancia
      const opacity = Math.max(0.15, 1 - dist * 0.14);
      // Posición: cada fila se desplaza (efecto diagonal)
      const x = c * 32 + r * 12;
      const y = r * 28 + c * 4;
      rows.push({ x, y, w, opacity, key: `${r}-${c}` });
    }
  }
  return (
    <svg viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      {rows.map(d => (
        <rect
          key={d.key}
          x={d.x} y={d.y}
          width={d.w} height={6}
          rx={3} ry={3}
          fill={color}
          opacity={d.opacity}
        />
      ))}
    </svg>
  );
}

window.BrandStreaks = BrandStreaks;

// === NAV ===
function Nav({ onLogin, onRegister }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark"><span>W</span></span>
          <span>We<em>Learn</em></span>
        </a>
        <div className="nav-links">
          <a href="#idiomas">Idiomas</a>
          <a href="#metodo">Método</a>
          <a href="#examenes">Exámenes</a>
          <a href="#preview">Lección</a>
          <a href="#precios">Precios</a>
        </div>
        <div className="nav-actions">
          <button className="btn btn-ghost btn-sm" onClick={onLogin}>Iniciar sesión</button>
          <button className="btn btn-sm" onClick={onRegister}>
            Empezar
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// === HERO ===
function Hero({ onRegister }) {
  const [selectedIdx, setSelectedIdx] = useState(0); // que opción está marcada
  const [progress, setProgress] = useState(3); // qué tan avanzado se ve el progress bar
  const vocab = window.VOCAB.ko[0]; // 학교 demo

  // Auto-cycle progress en hero (motion sutil)
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => (p % 11) + 1);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="brand-streaks streaks-tl" style={{opacity:0.85}}>
        <BrandStreaks color="var(--ink)" />
      </div>
      <div className="brand-streaks streaks-br" style={{opacity:0.45}}>
        <BrandStreaks color="var(--accent)" />
      </div>
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="eyebrow reveal in">
              <span className="ink-line"></span>Plataforma · 8 idiomas · 6 ex&aacute;menes
            </span>
            <h1 className="reveal in">
              Aprender un<br />
              idioma, <em>en serio.</em><br />
              <span className="stroke">No memorizar.</span>
            </h1>
            <p className="hero-lede reveal in reveal-delay-1">
              Once pasos diarios diseñados para que cada concepto se interiorice — no solo se explique.
              Vocabulario, gramática, escucha, patrón y examen acumulativo. Todo en una sesión.
            </p>
            <div className="hero-cta reveal in reveal-delay-2">
              <button className="btn btn-primary" onClick={onRegister}>
                Empezar gratis<span className="arrow">→</span>
              </button>
              <a href="#preview" className="btn btn-ghost">Ver una lección</a>
            </div>
          </div>

          <div className="hero-card reveal in reveal-delay-2">
            <div className="hero-card-head">
              <span className="eyebrow">Coreano · Día 1 · Paso 01</span>
              <span className="hero-card-tag">Activación</span>
            </div>
            <div className="vocab-card">
              <div className="vocab-img">{vocab.emoji}</div>
              <div className="vocab-text">
                <div className="hangul">{vocab.glyph}</div>
                <div className="roman">{vocab.roman}</div>
                <div className="meaning">{vocab.mean}</div>
              </div>
            </div>
            <div style={{marginTop:18, fontSize:13, color:'var(--ink-2)'}}>
              ¿Cuál corresponde a esta palabra?
            </div>
            <div className="hero-options">
              {['escuela','casa','libro','tiempo'].map((label, i) => (
                <div
                  key={label}
                  className={'opt ' + (selectedIdx === i ? 'correct' : '')}
                  onMouseEnter={() => setSelectedIdx(i)}
                >
                  <span>{label}</span>
                  <span className="k">{i+1}</span>
                </div>
              ))}
            </div>
            <div className="hero-progress">
              {Array.from({length:11}).map((_,i) => (
                <div key={i} className={i < progress ? 'on' : ''}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === STATS ===
function Stats() {
  const stats = [
    { n: '8', l: 'idiomas activos' },
    { n: '6', l: 'exámenes internacionales' },
    { n: '11', l: 'pasos por día de estudio' },
    { n: '92%', l: 'retención a los 30 días' },
  ];
  return (
    <div className="wrap">
      <div className="stats">
        {stats.map((s,i) => (
          <div className="stat reveal" key={i}>
            <div className="n serif">{s.n}</div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// === IDIOMAS ===
function Idiomas({ onPickLang }) {
  return (
    <section className="idiomas" id="idiomas">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <span className="ink-line"></span>01 — Catálogo
          </span>
          <h2>Ocho idiomas.<br />Un mismo método.</h2>
          <p>Cada idioma tiene su propio camino, pero todos comparten la misma arquitectura de 11 pasos diarios.
          Empieza por uno o estudia varios en paralelo.</p>
        </div>

        <div className="idiomas-grid reveal">
          {window.IDIOMAS.map((idi) => (
            <div className="idioma" key={idi.code} onClick={() => onPickLang(idi)}>
              <div>
                <div className="idioma-flag">{idi.flag}</div>
                <div className="idioma-name serif">{idi.name}</div>
                <div className="idioma-native">{idi.native}</div>
              </div>
              <div className="idioma-bottom">
                <span>{idi.lessons} días · {idi.level}</span>
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === MÉTODO (11 pasos) ===
function Metodo() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section className="metodo" id="metodo">
      <div className="wrap">
        <div className="metodo-grid">
          <div className="metodo-sticky">
            <div className="section-head reveal" style={{marginBottom:0}}>
              <span className="eyebrow"><span className="ink-line"></span>02 — Método</span>
              <h2>El día tiene<br />once pasos.</h2>
              <p>No es contenido por contenido. Cada paso ataca un ángulo distinto del aprendizaje
              — exposición, integración, retención, producción — para que lo que viste hoy
              siga ahí en seis meses.</p>
              <div style={{marginTop:24, display:'flex', gap:8, flexWrap:'wrap'}}>
                <span className="pill"><span className="dot"></span>Audio · Imagen · Texto</span>
                <span className="pill"><span className="dot"></span>Repaso espaciado</span>
              </div>
            </div>
          </div>

          <div className="pasos reveal">
            {window.PASOS.map((p, i) => (
              <div className="paso" key={p.n} onMouseEnter={() => setActiveStep(i)}>
                <div className="paso-num">{p.n}</div>
                <div className="paso-content">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
                <div className="paso-time">{p.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// === EXÁMENES ===
function Examenes() {
  return (
    <section className="examenes" id="examenes">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="ink-line" style={{background:'#ffffff', opacity:0.5}}></span>03 — Certificaciones</span>
          <h2>Preparación específica<br />para exámenes.</h2>
          <p>Si necesitas un puntaje — TOEFL, IELTS, ICFES, Goethe, DELF, CILS — tienes
          un plan separado con simulacros completos y feedback puntaje a puntaje.</p>
        </div>

        <div className="examenes-grid reveal">
          {window.EXAMENES.map(e => (
            <div className="examen" key={e.code}>
              <div className="examen-tag">{e.focus}</div>
              <div className="examen-name">{e.name}</div>
              <div className="examen-lang">{e.lang}</div>
              <div className="examen-meta">
                <span><b>{e.sessions}</b></span>
                <span>·</span>
                <span><b>{e.mock}</b></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === TESTIMONIO ===
function Testi() {
  return (
    <section className="testi reveal">
      <div className="wrap-narrow">
        <span className="eyebrow"><span className="ink-line"></span>Estudiantes</span>
        <blockquote className="serif" style={{marginTop:24}}>
          <em>“Probé tres apps antes de esta.</em> Lo que cambia es la sensación de
          que al final del día <em>sabes</em> lo que viste — no solo lo recuerdas a medias.”
        </blockquote>
        <div className="testi-author">
          <div className="testi-avatar serif">MA</div>
          <div className="testi-meta">
            <div><b>María Acosta</b></div>
            <span>Coreano · Día 47</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// === PRICING ===
function Pricing({ onRegister }) {
  return (
    <section className="pricing" id="precios">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="ink-line"></span>04 — Precios</span>
          <h2>Un plan por idioma.<br />Sin truco.</h2>
          <p>Pagas por el idioma o examen que estés estudiando. Cancela cuando quieras.
          El primer paso siempre es gratis.</p>
        </div>

        <div className="pricing-grid reveal">
          <div className="plan basic">
            <div className="plan-tag">Free</div>
            <div className="plan-name serif">Prueba</div>
            <div className="plan-price serif">$0 <span className="per">/ siempre</span></div>
            <p className="plan-desc">Para conocer la plataforma antes de comprometerte.</p>
            <ul>
              <li>Paso 1 (Activación) en cualquier idioma</li>
              <li>Demo de un examen internacional</li>
              <li>Sin tarjeta</li>
            </ul>
            <button className="btn btn-ghost" onClick={onRegister}>Crear cuenta</button>
          </div>

          <div className="plan featured">
            <div className="plan-tag">Más popular</div>
            <div className="plan-name serif">Idioma completo</div>
            <div className="plan-price serif">$19 <span className="per">/ mes</span></div>
            <p className="plan-desc">Acceso completo a un idioma — los 11 pasos diarios + repaso espaciado + audio descargable.</p>
            <ul>
              <li>Todos los pasos, todos los días</li>
              <li>Audio y descargas offline</li>
              <li>Repaso espaciado automático</li>
              <li>Examen acumulativo semanal</li>
            </ul>
            <button className="btn" onClick={onRegister}>Empezar idioma<span className="arrow">→</span></button>
          </div>

          <div className="plan">
            <div className="plan-tag">Plus</div>
            <div className="plan-name serif">Todos los idiomas</div>
            <div className="plan-price serif">$39 <span className="per">/ mes</span></div>
            <p className="plan-desc">Para políglotas y candidatos a múltiples exámenes internacionales.</p>
            <ul>
              <li>Los 8 idiomas</li>
              <li>Los 6 exámenes internacionales</li>
              <li>Simulacros ilimitados</li>
              <li>Coach por chat</li>
            </ul>
            <button className="btn btn-ghost" onClick={onRegister}>Hablar con ventas</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// === FAQ ===
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq">
      <div className="wrap-narrow">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="ink-line"></span>05 — Preguntas</span>
          <h2>Lo que casi siempre<br />nos preguntan.</h2>
        </div>
        <div className="faq-list reveal">
          {window.FAQ.map((f, i) => (
            <div key={i} className={'faq-item ' + (open === i ? 'open' : '')}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === CTA FINAL ===
function CtaFinal({ onRegister }) {
  return (
    <section className="cta">
      <div className="brand-streaks streaks-tr" style={{opacity:0.6}}>
        <BrandStreaks color="var(--accent)" />
      </div>
      <div className="brand-streaks streaks-bl" style={{opacity:0.35}}>
        <BrandStreaks color="#ffffff" />
      </div>
      <div className="wrap reveal">
        <span className="eyebrow" style={{color:'rgba(255,255,255,0.55)'}}>
          <span className="ink-line" style={{background:'#ffffff'}}></span>Empieza hoy
        </span>
        <h2 style={{marginTop:24}}>
          Tu primer día<br />es <em>gratis</em>.
        </h2>
        <div className="btn-wrap">
          <button className="btn btn-primary" onClick={onRegister}>
            Crear cuenta<span className="arrow">→</span>
          </button>
          <a href="#preview" className="btn btn-ghost">Ver una lección primero</a>
        </div>
      </div>
    </section>
  );
}

// === FOOTER ===
function Foot() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div className="foot-brand">
            <div className="brand">
              <span className="brand-mark"><span>W</span></span>
              <span>We<em>Learn</em></span>
            </div>
            <p>Once pasos al día. Ocho idiomas. Seis exámenes internacionales. Una plataforma
            que se toma en serio que aprendas.</p>
          </div>
          <div className="foot-col">
            <h5>Idiomas</h5>
            <ul>
              <li><a href="#idiomas">Inglés</a></li>
              <li><a href="#idiomas">Coreano</a></li>
              <li><a href="#idiomas">Japonés</a></li>
              <li><a href="#idiomas">Italiano</a></li>
              <li><a href="#idiomas">Ver todos</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Exámenes</h5>
            <ul>
              <li><a href="#examenes">TOEFL</a></li>
              <li><a href="#examenes">IELTS</a></li>
              <li><a href="#examenes">ICFES</a></li>
              <li><a href="#examenes">Goethe</a></li>
              <li><a href="#examenes">DELF / CILS</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Compañía</h5>
            <ul>
              <li><a href="#">Quiénes somos</a></li>
              <li><a href="#">Método</a></li>
              <li><a href="#">Trabajar con nosotros</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 Idiomas WeLearn S.A.S.</span>
          <span>Bogotá · Medellín · Madrid</span>
          <span><a href="#">Privacidad</a> · <a href="#">Términos</a></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Stats, Idiomas, Metodo, Examenes, Testi, Pricing, Faq, CtaFinal, Foot, useReveal });
