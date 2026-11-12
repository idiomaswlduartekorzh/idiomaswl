#!/usr/bin/env node

import assert from 'node:assert/strict'
import englishA1 from '../src/data/grammar/ingles/a1/index.ts'
import englishA2 from '../src/data/grammar/ingles/a2/index.ts'
import englishB1 from '../src/data/grammar/ingles/b1/index.ts'
import frenchA1 from '../src/data/grammar/frances/a1/index.ts'
import frenchA2 from '../src/data/grammar/frances/a2/index.ts'
import frenchB1 from '../src/data/grammar/frances/b1/index.ts'
import germanA1 from '../src/data/grammar/aleman/a1/index.ts'
import germanA2 from '../src/data/grammar/aleman/a2/index.ts'
import germanB1 from '../src/data/grammar/aleman/b1/index.ts'
import italianA1 from '../src/data/grammar/italiano/a1/index.ts'
import italianA2 from '../src/data/grammar/italiano/a2/index.ts'
import italianB1 from '../src/data/grammar/italiano/b1/index.ts'
import portugueseA1 from '../src/data/grammar/portugues/a1/index.ts'
import portugueseA2 from '../src/data/grammar/portugues/a2/index.ts'
import portugueseB1 from '../src/data/grammar/portugues/b1/index.ts'
import russianA1 from '../src/data/grammar/ruso/a1/index.ts'
import russianA2 from '../src/data/grammar/ruso/a2/index.ts'
import russianB1 from '../src/data/grammar/ruso/b1/index.ts'
import japaneseA2 from '../src/data/grammar/japones/a2/index.ts'
import japaneseB1 from '../src/data/grammar/japones/b1/index.ts'
import koreanA1 from '../src/data/grammar/coreano/a1/index.ts'
import koreanA2 from '../src/data/grammar/coreano/a2/index.ts'
import koreanB1 from '../src/data/grammar/coreano/b1/index.ts'

const collections = {
  ingles: { a1: englishA1, a2: englishA2, b1: englishB1 },
  frances: { a1: frenchA1, a2: frenchA2, b1: frenchB1 },
  aleman: { a1: germanA1, a2: germanA2, b1: germanB1 },
  italiano: { a1: italianA1, a2: italianA2, b1: italianB1 },
  portugues: { a1: portugueseA1, a2: portugueseA2, b1: portugueseB1 },
  ruso: { a1: russianA1, a2: russianA2, b1: russianB1 },
  japones: { a2: japaneseA2, b1: japaneseB1 },
  coreano: { a1: koreanA1, a2: koreanA2, b1: koreanB1 },
}

let topics = 0
let writingTasks = 0

for (const [language, levels] of Object.entries(collections)) {
  for (const [level, levelTopics] of Object.entries(levels)) {
    for (const topic of levelTopics) {
      topics += 1
      const label = `${language}/${level}/${topic.slug}`
      const minimumSeoSections = language === 'coreano' ? 3 : 5
      assert.ok(topic.seo.length >= minimumSeoSections, `${label}: explicación transversal insuficiente`)
      const minimumTableRows = language === 'coreano' ? 3 : 5
      assert.ok(topic.guide.table.length >= minimumTableRows, `${label}: tabla de referencia insuficiente`)
      const minimumVisualExamples = language === 'coreano' ? 4 : 6
      assert.ok(topic.visual.scene.length >= minimumVisualExamples, `${label}: mapa visual insuficiente`)

      for (const stage of topic.practice.levels) {
        if (stage.type !== 'write') continue
        writingTasks += stage.items.length
        for (const field of ['prompt', 'answer', 'explain']) {
          const values = stage.items.map((item) => String(item[field]).trim())
          assert.equal(new Set(values).size, values.length, `${label}/${stage.id}: ${field} repetido como relleno`)
          if (field === 'prompt') {
            assert.ok(stage.items.every((item) => `${item.scene} ${item.prompt}`.trim().length >= 18), `${label}/${stage.id}: contexto de producción demasiado breve`)
          } else {
            const minimumLength = field === 'answer' ? 1 : 8
            assert.ok(values.every((value) => value.length >= minimumLength), `${label}/${stage.id}: ${field} demasiado breve`)
          }
        }
      }
    }
  }
}

console.log(`✓ Calidad editorial transversal: ${topics} temas fundacionales y ${writingTasks} tareas abiertas sin relleno repetido.`)
