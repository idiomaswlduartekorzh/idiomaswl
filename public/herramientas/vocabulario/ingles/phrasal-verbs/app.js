const contexts = [
  { id: 'trabajo', title: 'Trabajo', count: 24, level: 'A2–B2' },
  { id: 'casa', title: 'Casa y limpieza', count: 20, level: 'A1–B1' },
  { id: 'aeropuerto', title: 'Aeropuerto y vuelos', count: 18, level: 'A2–B1', route: 'airport' },
  { id: 'restaurante', title: 'Restaurante y comida', count: 18, level: 'A2–B1' },
  { id: 'estudio', title: 'Estudio y exámenes', count: 18, level: 'A2–B2' },
  { id: 'relaciones', title: 'Relaciones', count: 16, level: 'A2–B2' },
  { id: 'tecnologia', title: 'Tecnología', count: 16, level: 'A2–B2' },
  { id: 'salud', title: 'Salud y rutinas', count: 14, level: 'A2–B1' },
  { id: 'hotel', title: 'Hotel', count: 14, level: 'A2–B1' },
  { id: 'compras', title: 'Compras y dinero', count: 12, level: 'A2–B1' },
]

const verbs = [
  { code: 'GET', forms: 12, meanings: 18, route: 'get' },
  { code: 'TAKE', forms: 10, meanings: 15 },
  { code: 'PUT', forms: 10, meanings: 14, route: 'put-off' },
  { code: 'LOOK', forms: 9, meanings: 12 },
  { code: 'GO', forms: 8, meanings: 10 },
]

const particles = [
  { code: 'UP', meanings: 22, route: 'up' },
  { code: 'OUT', meanings: 18 },
  { code: 'OFF', meanings: 15 },
  { code: 'ON', meanings: 12 },
  { code: 'DOWN', meanings: 10 },
]

const airportStages = [
  {
    number: '01', title: 'Antes de salir', count: 4,
    terms: [['set off', 'ponerse en camino'], ['head out', 'salir'], ['see off', 'despedir'], ['drop off', 'dejar a alguien']],
  },
  {
    number: '02', title: 'Check-in y seguridad', count: 5,
    terms: [['check in', 'registrarse'], ['fill out', 'completar'], ['get through', 'pasar'], ['hold up', 'retrasar'], ['go through', 'atravesar']],
  },
  {
    number: '03', title: 'Embarque y vuelo', count: 5,
    terms: [['take off', 'despegar'], ['get on', 'subir'], ['buckle up', 'abrocharse'], ['carry on', 'continuar'], ['take out', 'sacar']],
  },
  {
    number: '04', title: 'Llegada y equipaje', count: 4,
    terms: [['touch down', 'aterrizar'], ['pick up', 'recoger'], ['look for', 'buscar'], ['get back', 'regresar']],
  },
]

const upClusters = [
  { count: 6, title: 'Completar o terminar', terms: [['finish up', 'terminar'], ['use up', 'agotar'], ['eat up', 'comerse todo'], ['clean up', 'limpiar'], ['fill up', 'llenar'], ['end up', 'terminar en']] },
  { count: 5, title: 'Aumentar o mejorar', terms: [['speed up', 'acelerar'], ['grow up', 'crecer'], ['cheer up', 'animarse'], ['speak up', 'hablar más fuerte'], ['wake up', 'despertarse']] },
  { count: 4, title: 'Crear u organizar', terms: [['set up', 'organizar'], ['make up', 'inventar'], ['draw up', 'redactar'], ['team up', 'formar equipo']] },
  { count: 4, title: 'Acercarse o aparecer', terms: [['show up', 'aparecer'], ['come up', 'surgir'], ['pick up', 'recoger'], ['bring up', 'mencionar']] },
  { count: 3, title: 'Otros usos frecuentes', terms: [['give up', 'abandonar'], ['look up', 'consultar'], ['put up', 'colocar']] },
]

const getEntries = [
  ['get up', 'levantarse', 'A1'], ['get back', 'regresar', 'A2'], ['get on', 'subir / llevarse bien', 'A2'],
  ['get off', 'bajarse', 'A2'], ['get through', 'superar / comunicarse', 'B1'], ['get over', 'recuperarse', 'B1'],
  ['get by', 'arreglárselas', 'B1'], ['get along', 'llevarse bien', 'B1'], ['get away', 'escaparse', 'B1'],
  ['get across', 'comunicar una idea', 'B2'], ['get around', 'desplazarse / evitar', 'B2'], ['get ahead', 'progresar', 'B2'],
]

const pdfs = [
  ['contexto', 'Aeropuerto y vuelos', '18 expresiones · 12 páginas'],
  ['contexto', 'Trabajo', '24 expresiones · 16 páginas'],
  ['contexto', 'Casa y limpieza', '20 expresiones · 14 páginas'],
  ['contexto', 'Restaurante y comida', '18 expresiones · 12 páginas'],
  ['contexto', 'Estudio y exámenes', '18 expresiones · 12 páginas'],
  ['contexto', 'Relaciones', '16 expresiones · 12 páginas'],
  ['contexto', 'Tecnología', '16 expresiones · 10 páginas'],
  ['contexto', 'Salud y rutinas', '14 expresiones · 10 páginas'],
  ['verbo', 'Phrasal verbs con GET', '12 formas · 18 significados'],
  ['verbo', 'Phrasal verbs con TAKE', '10 formas · 15 significados'],
  ['verbo', 'Phrasal verbs con PUT', '10 formas · 14 significados'],
  ['partícula', 'Mapa semántico de UP', '22 significados · 1 lámina'],
  ['partícula', 'Mapa semántico de OUT', '18 significados · 1 lámina'],
  ['partícula', 'Mapa semántico de OFF', '15 significados · 1 lámina'],
  ['maestra', '80 phrasal verbs esenciales', '110 significados · 42 páginas'],
]

const app = document.querySelector('#app')
const dialog = document.querySelector('#resource-dialog')

function currentRoute() {
  return window.location.hash.replace(/^#\/?/, '') || 'catalog'
}

function go(route) {
  window.location.hash = route
}

function shell(content, active = 'catalog') {
  const nav = [
    ['catalog', 'Banco'],
    ['airport', 'Aeropuerto'],
    ['up', 'Partícula UP'],
    ['put-off', 'Ficha PUT OFF'],
    ['pdfs', 'PDFs'],
  ]
  return `
    <div class="shell">
      <header class="topbar">
        <button class="brand-button" data-route="catalog" aria-label="Ir al banco de phrasal verbs">
          <img src="/herramientas/vocabulario/ingles/phrasal-verbs/assets/welearn-wordmark.png" alt="Idiomas WeLearn" />
        </button>
        <nav class="main-nav" aria-label="Navegación principal">
          ${nav.map(([route, label]) => `<button class="nav-link ${active === route ? 'is-active' : ''}" data-route="${route}">${label}</button>`).join('')}
        </nav>
        <span class="header-note">Biblioteca gratuita</span>
      </header>
      <main id="main" class="page">${content}</main>
      <footer class="footer"><span>Idiomas WeLearn · Banco de phrasal verbs</span><span>Preview navegable · contenido provisional</span></footer>
    </div>`
}

function crumb(items) {
  return `<nav class="breadcrumb" aria-label="Ruta">${items.map((item, i) => i < items.length - 1 ? `<button data-route="${item[0]}">${item[1]}</button><span>/</span>` : `<strong>${item[1]}</strong>`).join('')}</nav>`
}

function catalogView(query = '') {
  const normalized = query.trim().toLowerCase()
  const filtered = contexts.filter(c => `${c.title} ${c.count} ${c.level}`.toLowerCase().includes(normalized))
  const cards = filtered.length ? filtered.map((item, index) => `
    <button class="catalog-card" data-route="${item.route || 'airport'}" aria-label="Abrir ${item.title}">
      <span class="card-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="card-title">${item.title}</span>
      <span class="card-meta">${item.count} expresiones</span>
      <span class="card-footer"><span class="card-level">${item.level}</span><span class="pdf-mark">PDF ↓</span></span>
    </button>`).join('') : `<div class="empty">No encontramos un grupo con ese término.</div>`

  const content = `
    <section class="catalog-hero">
      <div>
        <p class="eyebrow">Herramientas · Inglés</p>
        <h1 class="display">Banco de phrasal verbs</h1>
        <p class="lede">Una sola biblioteca. Distintas formas de aprenderla: contexto, verbo y partícula.</p>
      </div>
      <div class="search-panel">
        <label class="search-label" for="catalog-search">Buscar en el catálogo</label>
        <div class="search-wrap"><input id="catalog-search" class="search-input" value="${query.replaceAll('"', '&quot;')}" placeholder="Trabajo, GET, UP…" autocomplete="off" /><span class="search-key">⌘ K</span></div>
      </div>
    </section>
    <section class="stats" aria-label="Resumen del banco">
      <div class="stat"><strong>80</strong><span>formas</span></div>
      <div class="stat"><strong>110</strong><span>significados</span></div>
      <div class="stat"><strong>10</strong><span>contextos</span></div>
      <div class="stat"><strong>20</strong><span>PDFs</span></div>
    </section>
    <section>
      <div class="section-head"><div><span class="section-index">01 / CONTEXTOS</span><h2>Aprende dentro de una situación</h2></div><p>Cada grupo es un recorrido breve con vocabulario, práctica y un PDF propio.</p></div>
      <div class="context-grid" id="context-grid">${cards}</div>
    </section>
    <section class="duo-grid">
      <div>
        <div class="section-head"><div><span class="section-index">02 / VERBOS</span><h2>Compara una familia</h2></div></div>
        <div class="index-panel">${verbs.map(v => `<button class="index-row" data-route="${v.route || 'get'}"><span class="index-code">${v.code}</span><span class="index-detail">${v.forms} formas · ${v.meanings} significados</span><span class="index-arrow">→</span></button>`).join('')}</div>
      </div>
      <div>
        <div class="section-head"><div><span class="section-index">03 / PARTÍCULAS</span><h2>Entiende los patrones</h2></div></div>
        <div class="index-panel">${particles.map(p => `<button class="index-row" data-route="${p.route || 'up'}"><span class="index-code">${p.code}</span><span class="index-detail">${p.meanings} significados seleccionados</span><span class="index-arrow">→</span></button>`).join('')}</div>
      </div>
    </section>`
  return shell(content, 'catalog')
}

function airportView() {
  const stages = airportStages.map(stage => `
    <article class="stage">
      <div class="stage-top"><span class="stage-num">${stage.number}</span><span class="stage-count">${stage.count} expresiones</span></div>
      <h3>${stage.title}</h3>
      <div class="term-list">${stage.terms.map(([term, meaning]) => `<span class="term-chip"><strong>${term}</strong><em>${meaning}</em></span>`).join('')}</div>
    </article>`).join('')
  const content = `
    ${crumb([['catalog', 'Banco'], ['airport', 'Aeropuerto y vuelos']])}
    <section class="detail-hero">
      <div>
        <p class="eyebrow">Contexto · Viajes</p>
        <h1 class="display">Aeropuerto y vuelos</h1>
        <p class="lede">El recorrido completo, desde que sales de casa hasta que recuperas tu equipaje.</p>
        <div class="metric-line"><span>18 expresiones</span><span>A2–B1</span><span>4 etapas</span><span>12 páginas</span></div>
        <div class="actions"><button class="btn red" data-preview="Aeropuerto y vuelos">Ver PDF</button><button class="btn ghost" data-scroll="stages">Explorar etapas</button></div>
      </div>
      <aside class="side-note"><div><span class="big">18</span><p>No es una lista: es un viaje con orden y contexto.</p></div><span class="pdf-mark">PDF 01 / CONTEXTO</span></aside>
    </section>
    <section id="stages">
      <div class="section-head"><div><span class="section-index">RECORRIDO</span><h2>Cuatro momentos, dieciocho expresiones</h2></div><p>La imagen de cada etapa será una fotografía sobria o un diagrama funcional, no un personaje generado.</p></div>
      <div class="stage-grid">${stages}</div>
    </section>
    <div class="principle"><strong>Dirección visual:</strong> una portada fotográfica editorial para el grupo y cuatro encuadres documentales para las etapas. Las fichas individuales usan tipografía y ejemplos; solo los sentidos ambiguos reciben una imagen propia.</div>`
  return shell(content, 'airport')
}

function upView() {
  const columns = upClusters.map(cluster => `
    <article class="meaning-column">
      <span class="meaning-count">${cluster.count}</span>
      <h3>${cluster.title}</h3>
      ${cluster.terms.map(([term, meaning]) => `<span class="term-chip"><strong>${term}</strong><em>${meaning}</em></span>`).join('')}
    </article>`).join('')
  const content = `
    ${crumb([['catalog', 'Banco'], ['up', 'Partícula UP']])}
    <section class="detail-hero">
      <div>
        <p class="eyebrow">Partícula · Mapa semántico</p>
        <h1 class="display">Phrasal verbs con UP</h1>
        <p class="lede">UP no significa siempre “arriba”. Aquí se organiza por las ideas que suele aportar.</p>
        <div class="metric-line"><span>22 significados</span><span>16 formas</span><span>A2–B2</span><span>5 patrones</span></div>
        <div class="actions"><button class="btn red" data-preview="Mapa semántico de UP">Ver mapa PDF</button><button class="btn ghost" data-scroll="up-map">Ver agrupaciones</button></div>
      </div>
      <aside class="side-note"><div><span class="big">UP</span><p>Una partícula, cinco familias de significado.</p></div><span class="pdf-mark">PDF 12 / PARTÍCULA</span></aside>
    </section>
    <section id="up-map">
      <div class="section-head"><div><span class="section-index">MAPA</span><h2>Cinco ideas principales</h2></div><p>Los números suman los 22 significados seleccionados para la primera versión.</p></div>
      <div class="up-grid">${columns}</div>
    </section>
    <div class="principle"><strong>Imágenes:</strong> este grupo usa un único mapa visual sobrio. Solo expresiones polisémicas como <em>pick up</em> o <em>make up</em> reciben comparaciones visuales adicionales.</div>`
  return shell(content, 'up')
}

function getView() {
  const content = `
    ${crumb([['catalog', 'Banco'], ['get', 'Verbo GET']])}
    <section class="detail-hero">
      <div><p class="eyebrow">Familia verbal</p><h1 class="display">Phrasal verbs con GET</h1><p class="lede">Doce formas seleccionadas, ordenadas por nivel y uso.</p><div class="metric-line"><span>12 formas</span><span>18 significados</span><span>A1–B2</span></div><div class="actions"><button class="btn red" data-preview="Phrasal verbs con GET">Ver PDF</button></div></div>
      <aside class="side-note"><div><span class="big">GET</span><p>Movimiento, cambio, progreso y relaciones.</p></div><span class="pdf-mark">PDF 09 / VERBO</span></aside>
    </section>
    <section><div class="section-head"><div><span class="section-index">ÍNDICE</span><h2>Doce formas esenciales</h2></div></div><div class="index-panel">${getEntries.map(([term, meaning, level]) => `<button class="index-row" data-route="${term === 'get over' ? 'put-off' : 'get'}"><span class="index-code">${term}</span><span class="index-detail">${meaning}</span><span class="tag">${level}</span></button>`).join('')}</div></section>`
  return shell(content, 'catalog')
}

function putOffView() {
  const content = `
    ${crumb([['catalog', 'Banco'], ['put-off', 'PUT OFF']])}
    <section class="word-hero">
      <div><p class="eyebrow">Ficha canónica · PUT</p><h1 class="wordmark">PUT<br>OFF</h1><div class="tag-line"><span class="tag">B1</span><span class="tag">separable</span><span class="tag">neutral</span><span class="tag">trabajo</span></div></div>
      <div class="meaning-block"><strong>posponer o aplazar algo</strong><p>Retrasar una acción o evento hasta una fecha posterior.</p><div class="actions"><button class="btn red" data-preview="Phrasal verbs con PUT">Abrir PDF de PUT</button><button class="btn ghost" data-route="catalog">Volver al banco</button></div></div>
    </section>
    <section class="lesson-grid">
      <article class="content-card"><h2>Estructura</h2><div class="pattern">put something off<br>put it off</div><div class="error-compare" style="margin-top:10px"><div class="error-box">✕ put off it</div><div class="error-box good">✓ put it off</div></div></article>
      <article class="content-card"><h2>Ejemplos</h2><div class="example-row"><strong>They put the meeting off until Friday.</strong><span>Aplazaron la reunión hasta el viernes.</span></div><div class="example-row"><strong>Let’s not put it off any longer.</strong><span>No lo pospongamos más.</span></div></article>
    </section>
    <section class="quiz"><p class="eyebrow">Práctica breve</p><h3>We decided to ___ the project until next month.</h3><div class="quiz-options"><button class="quiz-option" data-answer="correct">put off</button><button class="quiz-option" data-answer="wrong">put on</button><button class="quiz-option" data-answer="wrong">put up with</button></div><div id="quiz-feedback" class="feedback" aria-live="polite"></div></section>
    <div class="principle"><strong>Dirección visual:</strong> esta ficha no necesita una ilustración. La jerarquía tipográfica, la estructura y el contraste correcto/incorrecto enseñan mejor.</div>`
  return shell(content, 'put-off')
}

function pdfView(filter = 'todos') {
  const selected = filter === 'todos' ? pdfs : pdfs.filter(p => p[0] === filter)
  const buttons = [['todos', 'Todos'], ['contexto', 'Contextos'], ['verbo', 'Verbos'], ['partícula', 'Partículas'], ['maestra', 'Guía maestra']]
  const content = `
    <section class="pdf-toolbar"><div><p class="eyebrow">Biblioteca descargable</p><h1 class="display">PDFs</h1><p class="lede">Cada recurso nace del mismo contenido que la práctica web.</p></div><div class="filter-row">${buttons.map(([id, label]) => `<button class="filter-btn ${filter === id ? 'is-active' : ''}" data-pdf-filter="${id}">${label}</button>`).join('')}</div></section>
    <div class="pdf-grid">${selected.map(([type, title, meta]) => `<article class="pdf-card"><span class="pdf-type">${type}</span><h3>${title}</h3><p>${meta}</p><div class="actions"><button class="btn small ghost" data-preview="${title}">Vista previa</button></div></article>`).join('')}</div>`
  return shell(content, 'pdfs')
}

function openPreview(title) {
  dialog.innerHTML = `<div class="dialog-inner"><div class="dialog-top"><div><p class="eyebrow">Vista previa del recurso</p><h2 id="dialog-title">${title}</h2></div><button class="dialog-close" aria-label="Cerrar">×</button></div><div class="pdf-sheet"><div class="mini-rule"></div><h3>${title}</h3><p>Guía visual, práctica y soluciones.</p></div><p style="color:var(--muted);font-size:.88rem">En el producto final este botón descargará el PDF generado desde el mismo catálogo.</p></div>`
  dialog.showModal()
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close())
}

function render() {
  const route = currentRoute()
  if (route === 'airport') app.innerHTML = airportView()
  else if (route === 'up') app.innerHTML = upView()
  else if (route === 'get') app.innerHTML = getView()
  else if (route === 'put-off') app.innerHTML = putOffView()
  else if (route.startsWith('pdfs/')) app.innerHTML = pdfView(route.split('/')[1])
  else if (route === 'pdfs') app.innerHTML = pdfView()
  else app.innerHTML = catalogView()
  window.scrollTo({ top: 0, behavior: 'instant' })
}

app.addEventListener('click', (event) => {
  const routeButton = event.target.closest('[data-route]')
  if (routeButton) return go(routeButton.dataset.route)
  const previewButton = event.target.closest('[data-preview]')
  if (previewButton) return openPreview(previewButton.dataset.preview)
  const scrollButton = event.target.closest('[data-scroll]')
  if (scrollButton) return document.getElementById(scrollButton.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' })
  const filterButton = event.target.closest('[data-pdf-filter]')
  if (filterButton) return go(`pdfs/${filterButton.dataset.pdfFilter}`)
  const quizButton = event.target.closest('[data-answer]')
  if (quizButton) {
    document.querySelectorAll('.quiz-option').forEach(button => button.classList.remove('is-selected'))
    quizButton.classList.add('is-selected')
    const feedback = document.querySelector('#quiz-feedback')
    feedback.textContent = quizButton.dataset.answer === 'correct' ? 'Correcto. “Put off” funciona antes del objeto “the project”.' : 'Inténtalo otra vez: necesitas el verbo que significa “posponer”.'
  }
})

app.addEventListener('input', (event) => {
  if (event.target.id === 'catalog-search') {
    app.innerHTML = catalogView(event.target.value)
    const input = document.querySelector('#catalog-search')
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
  }
})

window.addEventListener('hashchange', render)
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close() })
render()
