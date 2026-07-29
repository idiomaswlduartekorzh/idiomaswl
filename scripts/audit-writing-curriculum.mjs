import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const root = process.cwd()
const sourcePath = path.join(root, 'src/data/practica/writing-integrated.ts')
const source = fs.readFileSync(sourcePath, 'utf8')
const legacyBanks = JSON.parse(fs.readFileSync(path.join(root, 'src/data/practica/writing-legacy-banks.json'), 'utf8'))
const languages = ['ingles', 'frances', 'portugues', 'italiano', 'aleman', 'ruso', 'japones', 'coreano']
const levels = ['a1', 'a2', 'b1']

function grammarTopics(language, level) {
  const indexPath = path.join(root, 'src/data/grammar', language, level, 'index.ts')
  const index = fs.readFileSync(indexPath, 'utf8')
  const imports = [...index.matchAll(/import\s+\w+\s+from\s+'(\.\/[^']+)'/g)]

  return imports.map(([, relativePath]) => {
    const sourcePath = path.join(path.dirname(indexPath), `${relativePath.slice(2)}.ts`)
    const topicSource = fs.readFileSync(sourcePath, 'utf8')
    const slug = topicSource.match(/slug:\s*'([^']+)'/)?.[1]
    const shortTitle = topicSource.match(/shortTitle:\s*'([^']+)'/)?.[1] ?? slug
    if (!slug) throw new Error(`No se encontró slug en ${sourcePath}`)
    return { slug, shortTitle }
  })
}

const grammarCatalog = Object.fromEntries(languages.map(language => [
  language,
  Object.fromEntries(levels.map(level => [level, grammarTopics(language, level)])),
]))

const executable = source
  .replace("import { getTopicsByLevel } from '@/data/grammar/registry'", `const getTopicsByLevel = (language, level) => grammarCatalog[language]?.[level] ?? []`)
  .replace("import legacyBanks from './writing-legacy-banks.json'", `const grammarCatalog = ${JSON.stringify(grammarCatalog)}\nconst legacyBanks = ${JSON.stringify(legacyBanks)}`)
  .concat('\nmodule.exports = { getIntegratedWritingExercises }\n')

const javascript = ts.transpileModule(executable, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText

const context = { module: { exports: {} }, exports: {} }
vm.runInNewContext(javascript, context, { filename: sourcePath })

const { getIntegratedWritingExercises } = context.module.exports
const issues = []
let grammarReferenceCount = 0

function normalized(value) {
  const normalizedValue = value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:()[\]{}"'“”‘’«»]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return /[\u3040-\u30ff\u3400-\u9fff]/.test(normalizedValue)
    ? normalizedValue.replace(/\s+/g, '')
    : normalizedValue
}

for (const language of languages) {
  for (const level of levels) {
    const exercises = getIntegratedWritingExercises(language, level)
    const seenModels = new Set()

    if (exercises.length !== 20) issues.push(`${language}/${level}: debe tener 20 ejercicios; tiene ${exercises.length}.`)

    for (const exercise of exercises) {
      const prefix = `${language}/${level}/${exercise.sequence}`
      for (const [field, value] of Object.entries({
        title: exercise.title,
        readingText: exercise.readingText,
        prompt: exercise.prompt,
        modelAnswer: exercise.modelAnswer,
      })) {
        if (!value?.trim()) issues.push(`${prefix}: falta ${field}.`)
      }

      const model = normalized(exercise.modelAnswer)
      if (!exercise.grammarReferences.length) issues.push(`${prefix}: falta una referencia gramatical.`)
      for (const reference of exercise.grammarReferences) {
        grammarReferenceCount++
        const availableSlugs = grammarCatalog[language][level].map(topic => topic.slug)
        if (!availableSlugs.includes(reference.slug)) {
          issues.push(`${prefix}: la referencia gramatical “${reference.slug}” no existe en ${language}/${level}.`)
        }
      }
      if (exercise.requiredTerms.length < exercise.requiredCount) {
        issues.push(`${prefix}: necesita al menos ${exercise.requiredCount} términos verificables; tiene ${exercise.requiredTerms.length}.`)
      }
      for (const term of exercise.requiredTerms) {
        if (!model.includes(normalized(term.term))) issues.push(`${prefix}: el término “${term.term}” no aparece en el modelo.`)
      }

      const fingerprint = normalized(exercise.modelAnswer)
      if (seenModels.has(fingerprint)) issues.push(`${prefix}: ejemplo repetido dentro del nivel.`)
      seenModels.add(fingerprint)
    }
  }
}

if (issues.length) {
  console.error(`Auditoría de escritura: ${issues.length} incidencias.`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Auditoría de escritura: 480 ejercicios completos, distintos y verificables; ${grammarReferenceCount} enlaces gramaticales válidos.`)
