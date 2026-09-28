const DATA_URL = '/herramientas/vocabulario/ingles/phrasal-verbs/data/ecosystem.json'

const clean = value => String(value || '').trim().toLocaleLowerCase('es')
const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
})[char])

let ecosystem

function topicFor(slug) {
  return ecosystem.topics.find(topic => topic.slug === slug)
}

function occurrenceMarkup(item, compact = false) {
  const badge = item.is_cross_context
    ? `<button class="cross-badge" data-related-term="${escapeHtml(item.term)}">↗ ${item.context_count} contextos · ${item.sense_count} sentidos</button>`
    : ''
  return `<article class="ecosystem-term${compact ? ' is-compact' : ''}">
    <div><strong>${escapeHtml(item.term)}</strong><span>${escapeHtml(item.meaning_es)}</span></div>
    <div class="term-examples">${item.examples_en.map((example, index) => `<p><span>Ejemplo ${index + 1}</span>${escapeHtml(example)}</p>`).join('')}</div>
    <small>${escapeHtml(item.topic_title)} · ${escapeHtml(item.subtopic)}</small>${badge}
  </article>`
}

function openRelated(term) {
  const dialog = document.querySelector('[data-related-dialog]')
  if (!dialog) return
  const matches = ecosystem.occurrences.filter(item => clean(item.term) === clean(term))
  dialog.innerHTML = `<div class="related-dialog-inner">
    <div class="related-dialog-top"><div><p class="eyebrow">Trazabilidad</p><h2>${escapeHtml(term)}</h2></div><button type="button" data-close-dialog aria-label="Cerrar">×</button></div>
    <p class="related-intro">Esta expresión aparece en ${new Set(matches.map(item => item.topic)).size} contextos y conserva aquí cada significado y ejemplo.</p>
    <div class="related-list">${matches.map(item => {
      const topic = topicFor(item.topic)
      return `<a href="/herramientas/vocabulario/ingles/phrasal-verbs/${topic.path}"><span>${escapeHtml(item.topic_title)} · ${escapeHtml(item.subtopic)}</span><strong>${escapeHtml(item.meaning_es)}</strong>${item.examples_en.map((example, index) => `<p><b>${index + 1}</b> ${escapeHtml(example)}</p>`).join('')}</a>`
    }).join('')}</div>
  </div>`
  dialog.showModal()
}

function openParticleRelated(term) {
  const dialog = document.querySelector('[data-related-dialog]')
  if (!dialog) return
  const bank = [...ecosystem.occurrences, ...ecosystem.family_occurrences]
  const matches = bank.filter(item => clean(item.term) === clean(term))
    .filter((item, index, items) => items.findIndex(other =>
      other.source_path === item.source_path && other.subtopic === item.subtopic && other.meaning_es === item.meaning_es
    ) === index)
  dialog.innerHTML = `<div class="related-dialog-inner">
    <div class="related-dialog-top"><div><p class="eyebrow">Rutas conectadas</p><h2>${escapeHtml(term)}</h2></div><button type="button" data-close-dialog aria-label="Cerrar">×</button></div>
    <p class="related-intro">Sigue esta combinación hacia ${new Set(matches.map(item => item.source_path)).size} rutas para comparar sus significados y contextos reales.</p>
    <div class="related-list">${matches.map(item => `<a href="/herramientas/vocabulario/ingles/phrasal-verbs/${escapeHtml(item.source_path)}"><span>${escapeHtml(item.topic_title)} · ${escapeHtml(item.subtopic)}</span><strong>${escapeHtml(item.meaning_es)}</strong>${item.examples_en.map((example, index) => `<p><b>${index + 1}</b> ${escapeHtml(example)}</p>`).join('')}</a>`).join('')}</div>
  </div>`
  dialog.showModal()
}

function shuffled(items, seed = 17) {
  const copy = [...items]
  let state = seed
  for (let index = copy.length - 1; index > 0; index -= 1) {
    state = (state * 9301 + 49297) % 233280
    const other = Math.floor((state / 233280) * (index + 1))
    ;[copy[index], copy[other]] = [copy[other], copy[index]]
  }
  return copy
}

function balancedItems(items, count = 12) {
  const groups = [...new Set(items.map(item => item.subtopic))].map(subtopic =>
    shuffled(items.filter(item => item.subtopic === subtopic), subtopic.length * 31)
  )
  const result = []
  let round = 0
  while (result.length < Math.min(count, items.length)) {
    groups.forEach(group => {
      if (group[round] && result.length < count) result.push(group[round])
    })
    round += 1
  }
  return result
}

function buildQuestions(items) {
  const selected = balancedItems(items)
  return selected.map((item, index) => {
    const contextualExample = item.examples_en[index % item.examples_en.length]
    if (index % 3 === 2) {
      return {
        kind: 'typed', item,
        prompt: `Escribe el phrasal verb que significa “${item.meaning_es}” en ${item.subtopic.toLocaleLowerCase('es')}.`,
        answer: item.term
      }
    }
    const pool = items.filter(other => other.term !== item.term && other.meaning_es !== item.meaning_es)
    const local = pool.filter(other => other.subtopic === item.subtopic)
    const distractors = shuffled([...local, ...pool], item.id.length * 47)
      .filter((candidate, pos, array) => array.findIndex(x => x.term === candidate.term) === pos)
      .slice(0, 3)
    return {
      kind: 'choice', item,
      prompt: index % 3 === 0
        ? `¿Qué expresión significa “${item.meaning_es}” en este contexto?`
        : `Elige la expresión que corresponde a: ${contextualExample}`,
      answer: item.term,
      contextualExample,
      options: shuffled([item, ...distractors], index * 83 + 11).map(option => option.term)
    }
  })
}

function quizMarkup(question, index, total) {
  const controls = question.kind === 'choice'
    ? `<div class="topic-quiz-options">${question.options.map(option => `<button type="button" data-quiz-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('')}</div>`
    : `<form class="topic-quiz-form" data-topic-quiz-form><label for="topic-quiz-answer">Escribe la expresión en infinitivo</label><div><input id="topic-quiz-answer" autocomplete="off" autocapitalize="none"><button type="submit">Comprobar</button></div></form>`
  return `<span class="quiz-counter">${index + 1} / ${total} · ${escapeHtml(question.item.subtopic)}</span><h3>${escapeHtml(question.prompt)}</h3>${controls}<div class="topic-quiz-feedback" data-quiz-feedback aria-live="polite"></div>`
}

function mountQuiz() {
  const mount = document.querySelector('[data-quiz-mount]')
  const page = document.querySelector('[data-topic], [data-family], [data-particle]')
  if (!mount || !page) return
  const items = page.dataset.topic
    ? ecosystem.occurrences.filter(item => item.topic === page.dataset.topic)
    : page.dataset.family
      ? ecosystem.family_occurrences.filter(item => item.family === page.dataset.family)
      : ecosystem.particle_occurrences.filter(item => item.particle === page.dataset.particle)
  const questions = buildQuestions(items)
  const state = { index: 0, score: 0, answered: false }

  const render = () => {
    state.answered = false
    if (state.index >= questions.length) {
      const percent = Math.round(state.score / questions.length * 100)
      mount.innerHTML = `<span class="quiz-counter">Resultado final</span><div class="topic-score"><strong>${state.score}/${questions.length}</strong><span>${percent}%</span></div><h3>${percent >= 80 ? 'Buen dominio del contexto' : percent >= 60 ? 'Una base sólida' : 'Vale la pena repasar la lista'}</h3><p>La evaluación combinó reconocimiento y producción escrita entre todos los subtemas.</p><button type="button" class="quiz-restart" data-quiz-restart>Repetir quiz</button>`
      return
    }
    mount.innerHTML = quizMarkup(questions[state.index], state.index, questions.length)
  }

  const grade = answer => {
    if (state.answered) return
    state.answered = true
    const question = questions[state.index]
    const correct = clean(answer) === clean(question.answer)
    if (correct) state.score += 1
    mount.querySelectorAll('[data-quiz-answer]').forEach(button => {
      button.disabled = true
      if (clean(button.dataset.quizAnswer) === clean(question.answer)) button.classList.add('is-correct')
      else if (button === document.activeElement) button.classList.add('is-wrong')
    })
    const feedback = mount.querySelector('[data-quiz-feedback]')
    const reinforcement = question.item.examples_en.find(example => example !== question.contextualExample) || question.item.example_en
    feedback.innerHTML = `<strong>${correct ? 'Correcto.' : `Respuesta: ${escapeHtml(question.answer)}.`}</strong> ${escapeHtml(question.item.meaning_es)}. <em>${escapeHtml(reinforcement)}</em> <button type="button" data-quiz-next>${state.index + 1 === questions.length ? 'Ver resultado' : 'Siguiente'} →</button>`
  }

  mount.addEventListener('click', event => {
    const answer = event.target.closest('[data-quiz-answer]')
    if (answer) return grade(answer.dataset.quizAnswer)
    if (event.target.closest('[data-quiz-next]')) {
      state.index += 1
      render()
    }
    if (event.target.closest('[data-quiz-restart]')) {
      state.index = 0
      state.score = 0
      render()
    }
  })
  mount.addEventListener('submit', event => {
    if (!event.target.matches('[data-topic-quiz-form]')) return
    event.preventDefault()
    const input = event.target.querySelector('input')
    if (input.value.trim()) {
      input.disabled = true
      event.target.querySelector('button').disabled = true
      grade(input.value)
    }
  })
  render()
}

function mountSearch() {
  const input = document.querySelector('#ecosystem-search')
  const output = document.querySelector('[data-search-output]')
  if (!input || !output) return
  const title = output.querySelector('[data-search-title]')
  const list = output.querySelector('[data-search-list]')
  const update = () => {
    const query = clean(input.value)
    if (!query) {
      output.hidden = true
      return
    }
    const bank = [...ecosystem.occurrences, ...ecosystem.family_occurrences]
    const matches = bank.filter(item => clean(`${item.term} ${item.meaning_es} ${item.subtopic} ${item.topic_title} ${item.examples_en.join(' ')}`).includes(query))
    output.hidden = false
    title.textContent = `${matches.length} resultados para “${input.value.trim()}”`
    list.innerHTML = matches.length ? matches.map(item => occurrenceMarkup(item, true)).join('') : '<p class="empty-search">No encontramos coincidencias. Prueba con otro verbo, profesión o significado.</p>'
  }
  input.addEventListener('input', update)
  const initialQuery = new URLSearchParams(location.search).get('q')
  if (initialQuery) {
    input.value = initialQuery
    update()
    output.scrollIntoView({ behavior: 'instant', block: 'start' })
  }
}

document.addEventListener('click', event => {
  const related = event.target.closest('[data-related-term]')
  if (related) openRelated(related.dataset.relatedTerm)
  const particleRelated = event.target.closest('[data-particle-related-term]')
  if (particleRelated) openParticleRelated(particleRelated.dataset.particleRelatedTerm)
  if (event.target.closest('[data-close-dialog]')) event.target.closest('dialog').close()
  const dialog = event.target.closest('dialog')
  if (dialog && event.target === dialog) dialog.close()
})

fetch(DATA_URL)
  .then(response => {
    if (!response.ok) throw new Error(`No se pudo cargar el banco (${response.status})`)
    return response.json()
  })
  .then(data => {
    ecosystem = data
    mountSearch()
    mountQuiz()
  })
  .catch(error => {
    document.querySelectorAll('[data-quiz-mount], [data-search-list]').forEach(node => {
      node.innerHTML = '<p>No pudimos cargar el banco. Recarga la página para intentarlo de nuevo.</p>'
    })
    console.error(error)
  })
