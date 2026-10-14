import assert from 'node:assert/strict'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const requestedLevel = process.argv.find((arg) => /^--level=(a1|a2|b1)$/.test(arg))?.split('=')[1]
const levels = requestedLevel ? [requestedLevel] : ['a1', 'a2', 'b1']
const { ensureKoreanPracticeDepth } = await import(
  `${pathToFileURL(path.join(ROOT, 'src', 'data', 'grammar', 'coreano', 'ensure-practice-depth.ts')).href}?audit=${Date.now()}`
)

function placeholders(text) {
  return [...String(text ?? '').matchAll(/\[\[(\d+)\]\]/g)].map((match) => Number(match[1]))
}

function assertSequentialPlaceholders(text, blankCount, label) {
  const found = placeholders(text)
  assert.equal(found.length, blankCount, `${label}: hay ${found.length} marcadores para ${blankCount} respuestas`)
  assert.deepEqual(found, Array.from({ length: blankCount }, (_, index) => index), `${label}: los marcadores deben ser [[0]], [[1]]… en orden`)
}

function assertBlank(blank, label) {
  assert.ok(blank.answer?.trim(), `${label}: falta respuesta`)
  assert.ok(blank.explain?.trim().length >= 8, `${label}: falta explicación útil`)
  if (blank.options) {
    assert.ok(blank.options.length >= 2, `${label}: se requieren al menos dos opciones`)
    assert.equal(new Set(blank.options).size, blank.options.length, `${label}: hay opciones duplicadas`)
    assert.ok(blank.options.includes(blank.answer), `${label}: la respuesta no aparece entre las opciones`)
  }
}

let totalTopics = 0
let totalInteractions = 0

for (const level of levels) {
  const directory = path.join(ROOT, 'src', 'data', 'grammar', 'coreano', level)
  assert.ok(existsSync(directory), `No existe el directorio ${directory}`)
  const files = readdirSync(directory)
    .filter((name) => name.endsWith('.ts') && name !== 'index.ts')
    .sort()
  assert.equal(files.length, 20, `Coreano ${level.toUpperCase()} debe contener 20 lecciones`)

  const topics = []
  for (const file of files) {
    const module = await import(`${pathToFileURL(path.join(directory, file)).href}?audit=${Date.now()}`)
    topics.push(level === 'a1' ? module.default : ensureKoreanPracticeDepth(module.default))
  }

  assert.deepEqual(
    topics.map((topic) => Number(topic.order)).sort((a, b) => a - b),
    Array.from({ length: 20 }, (_, index) => index + 1),
    `${level.toUpperCase()}: el orden debe cubrir 01–20 sin huecos`,
  )
  assert.equal(new Set(topics.map((topic) => topic.slug)).size, topics.length, `${level.toUpperCase()}: hay slugs duplicados`)

  let levelInteractions = 0
  for (const topic of topics) {
    const label = `${level.toUpperCase()}/${topic.slug}`
    assert.equal(topic.level.toLowerCase(), level, `${label}: nivel editorial incorrecto`)
    assert.ok(topic.title.length >= 18, `${label}: título demasiado corto`)
    assert.ok(topic.description.length >= 90, `${label}: descripción demasiado corta`)
    assert.ok(topic.lead.length >= 60, `${label}: introducción demasiado corta`)
    assert.ok(topic.outcomes.length >= 3, `${label}: faltan resultados de aprendizaje`)
    assert.ok(topic.guide.decisions.length >= 4, `${label}: faltan decisiones guiadas`)
    assert.ok(topic.guide.table.length >= 3, `${label}: tabla pedagógica insuficiente`)
    assert.ok(topic.guide.mistakes.length >= 3, `${label}: faltan errores frecuentes`)
    assert.ok(topic.seo.length >= 3, `${label}: desarrollo editorial insuficiente`)
    assert.ok(topic.visual.scene.length >= 5, `${label}: faltan ejemplos visuales`)
    assert.ok(topic.practice.levels.length >= 6, `${label}: se requieren seis niveles de práctica`)
    assert.equal(new Set(topic.practice.levels.map((item) => item.id)).size, topic.practice.levels.length, `${label}: hay ids de nivel duplicados`)

    let interactions = 0
    for (const practiceLevel of topic.practice.levels) {
      const practiceLabel = `${label}/${practiceLevel.id}`
      assert.ok(practiceLevel.title?.trim(), `${practiceLabel}: falta título`)
      assert.ok(practiceLevel.intro?.trim(), `${practiceLabel}: falta instrucción`)

      if (practiceLevel.type === 'choice') {
        assert.ok(practiceLevel.items.length >= 4, `${practiceLabel}: práctica demasiado corta`)
        for (const [index, item] of practiceLevel.items.entries()) {
          const itemLabel = `${practiceLabel}/item-${index + 1}`
          assert.ok(item.lines.flat().join('').trim(), `${itemLabel}: falta enunciado`)
          assert.equal(new Set(item.options).size, item.options.length, `${itemLabel}: hay opciones duplicadas`)
          assert.ok(item.options.includes(item.answer), `${itemLabel}: la respuesta no aparece entre las opciones`)
          assert.ok(item.explain?.trim().length >= 8, `${itemLabel}: falta explicación útil`)
        }
        interactions += practiceLevel.items.length
      } else if (practiceLevel.type === 'dual') {
        assert.ok(practiceLevel.items.length >= 3, `${practiceLabel}: práctica demasiado corta`)
        for (const [index, item] of practiceLevel.items.entries()) {
          const itemLabel = `${practiceLabel}/item-${index + 1}`
          assertSequentialPlaceholders(item.lines.flat().join(' '), item.blanks.length, itemLabel)
          item.blanks.forEach((blank, blankIndex) => assertBlank(blank, `${itemLabel}/blank-${blankIndex + 1}`))
          interactions += item.blanks.length
        }
      } else if (practiceLevel.type === 'guidedText' || practiceLevel.type === 'freeText') {
        assert.ok(practiceLevel.blanks.length >= 4, `${practiceLabel}: práctica demasiado corta`)
        assertSequentialPlaceholders(practiceLevel.text, practiceLevel.blanks.length, practiceLabel)
        practiceLevel.blanks.forEach((blank, index) => assertBlank(blank, `${practiceLabel}/blank-${index + 1}`))
        interactions += practiceLevel.blanks.length
      } else if (practiceLevel.type === 'write') {
        assert.ok(practiceLevel.items.length >= 2, `${practiceLabel}: práctica demasiado corta`)
        for (const [index, item] of practiceLevel.items.entries()) {
          const itemLabel = `${practiceLabel}/item-${index + 1}`
          assert.ok(item.prompt?.trim().length >= 12, `${itemLabel}: consigna insuficiente`)
          assert.ok(item.answer?.trim(), `${itemLabel}: falta modelo de respuesta`)
          assert.ok(item.explain?.trim().length >= 8, `${itemLabel}: falta explicación útil`)
        }
        interactions += practiceLevel.items.length
      } else {
        assert.fail(`${practiceLabel}: tipo de práctica desconocido`)
      }
    }

    assert.ok(interactions >= 28, `${label}: solo tiene ${interactions} interacciones; mínimo 28`)
    levelInteractions += interactions
  }

  totalTopics += topics.length
  totalInteractions += levelInteractions
  console.log(`✓ Coreano ${level.toUpperCase()}: ${topics.length} lecciones y ${levelInteractions} interacciones verificadas.`)
}

console.log(`✓ Total auditado: ${totalTopics} lecciones y ${totalInteractions} interacciones.`)
