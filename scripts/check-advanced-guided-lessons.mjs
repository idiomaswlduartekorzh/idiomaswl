import fs from 'node:fs'
import path from 'node:path'
import { GUIDED_ADVANCED_LESSONS } from '../src/data/practica/advanced-guided-topics.ts'

const problems = []
const wordCount = (value) => value.trim().split(/\s+/u).filter(Boolean).length
const letterReference = /\b(?:option|answer)\s+[A-D]\b/i
const audioAssetReference = /\.(?:mp3|wav|m4a|ogg)(?:\?|$)|\/audio\//i
const forbiddenInterfaceSpanish = /\b(?:Práctica|Sesgos|Escucha|Lectura|Vocabulario|Reiniciar|Anterior|Disponible|Piloto|Próximamente)\b/i

function validateChoiceSet(questions, label, expectedMinimum) {
  const positionCounts = [0, 0, 0, 0]
  let correctLongest = 0
  let correctShortest = 0
  let totalCorrectWords = 0
  let totalDistractorMean = 0

  if (questions.length < expectedMinimum) problems.push(`${label}: ${questions.length} questions; expected at least ${expectedMinimum}`)
  if (questions.length % 4 !== 0) problems.push(`${label}: question count must be divisible by four for even key distribution`)

  const questionIds = questions.map((question) => question.id)
  if (new Set(questionIds).size !== questionIds.length) problems.push(`${label}: duplicate question IDs`)

  for (const question of questions) {
    const where = `${label}/${question.id}`
    if (question.options.length !== 4) problems.push(`${where}: expected four options`)
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
      problems.push(`${where}: answer is outside the option range`)
      continue
    }
    positionCounts[question.answer] += 1

    const optionTexts = question.options.map((option) => option.text.trim())
    if (new Set(optionTexts).size !== optionTexts.length) problems.push(`${where}: duplicate option text`)
    if (question.options.some((option) => !option.feedback.trim())) problems.push(`${where}: every option needs specific feedback`)
    if (!question.evidence.trim()) problems.push(`${where}: missing evidence span`)
    if (!question.errorCode.trim()) problems.push(`${where}: missing error code`)
    if (letterReference.test(`${question.prompt} ${question.evidence} ${question.options.map((option) => option.feedback).join(' ')}`)) problems.push(`${where}: content refers to an option by letter`)

    const lengths = optionTexts.map(wordCount)
    const maximum = Math.max(...lengths)
    const minimum = Math.min(...lengths)
    if (minimum > 0 && maximum / minimum > 1.6) problems.push(`${where}: option length ratio is ${(maximum / minimum).toFixed(2)}; maximum 1.60`)

    const correctLength = lengths[question.answer]
    const distractorLengths = lengths.filter((_, index) => index !== question.answer)
    const maxDistractor = Math.max(...distractorLengths)
    const minDistractor = Math.min(...distractorLengths)
    const distractorMean = distractorLengths.reduce((sum, length) => sum + length, 0) / distractorLengths.length
    totalCorrectWords += correctLength
    totalDistractorMean += distractorMean
    if (correctLength > maxDistractor) correctLongest += 1
    if (correctLength < minDistractor) correctShortest += 1
    if (correctLength - maxDistractor >= 3) problems.push(`${where}: key is ${correctLength - maxDistractor} words longer than the longest distractor`)
  }

  const expectedPerPosition = questions.length / 4
  if (Number.isInteger(expectedPerPosition) && positionCounts.some((count) => count !== expectedPerPosition)) problems.push(`${label}: answer positions are ${positionCounts.join('/')}; expected ${expectedPerPosition}/${expectedPerPosition}/${expectedPerPosition}/${expectedPerPosition}`)
  for (let index = 2; index < questions.length; index += 1) {
    if (questions[index].answer === questions[index - 1].answer && questions[index].answer === questions[index - 2].answer) problems.push(`${label}: three identical answer positions end at ${questions[index].id}`)
  }

  const longestPct = questions.length ? (correctLongest / questions.length) * 100 : 0
  const shortestPct = questions.length ? (correctShortest / questions.length) * 100 : 0
  const meanRatio = totalDistractorMean ? totalCorrectWords / totalDistractorMean : 0
  if (longestPct > 25) problems.push(`${label}: key is uniquely longest in ${longestPct.toFixed(1)}%; maximum 25%`)
  if (shortestPct > 25) problems.push(`${label}: key is uniquely shortest in ${shortestPct.toFixed(1)}%; maximum 25%`)
  if (meanRatio < 0.85 || meanRatio > 1.15) problems.push(`${label}: mean key/distractor length ratio is ${meanRatio.toFixed(2)}; expected 0.85–1.15`)

  console.log(`${label}: ${questions.length} items · positions ${positionCounts.join('/')} · key longest ${longestPct.toFixed(1)}% · mean ratio ${meanRatio.toFixed(2)}`)
}

for (const lesson of GUIDED_ADVANCED_LESSONS) {
  const label = lesson.slug
  if (forbiddenInterfaceSpanish.test(JSON.stringify(lesson))) problems.push(`${label}: contains Spanish interface copy`)
  if (lesson.discussion.questions.length < 5) problems.push(`${label}: fewer than five discussion questions`)
  if (lesson.reading.blocks.length < 6) problems.push(`${label}: fewer than six active-reading blocks`)
  if (lesson.vocabulary.length < 8) problems.push(`${label}: fewer than eight vocabulary targets`)

  if (lesson.slug === 'dunning-kruger-sin-la-curva') {
    if (!lesson.openingStatements || lesson.openingStatements.statements.length < 6) problems.push(`${label}: opening statement selection is incomplete`)
    for (const category of ['Phrasal verbs', 'Useful language', 'Adjectives', 'Nouns']) {
      if (lesson.vocabulary.filter((item) => item.category === category).length < 3) problems.push(`${label}: vocabulary category ${category} needs at least three items`)
    }
  }

  validateChoiceSet(lesson.ieltsPractice.questions, `${label}/evidence-practice`, lesson.slug === 'dunning-kruger-sin-la-curva' ? 12 : 8)

  if (lesson.listeningLab.status === 'produced') {
    if (lesson.listeningLab.tracks?.length !== 2) problems.push(`${label}: a produced listening lab needs exactly two tracks`)
    for (const track of lesson.listeningLab.tracks ?? []) {
      if (!track.transcript.trim()) problems.push(`${label}/${track.id}: transcript is empty`)
      if (!audioAssetReference.test(track.audioSrc)) problems.push(`${label}/${track.id}: audio path is invalid`)
      const absoluteAudioPath = path.join(process.cwd(), 'public', track.audioSrc.replace(/^\//, ''))
      if (!fs.existsSync(absoluteAudioPath)) problems.push(`${label}/${track.id}: audio file is missing at ${track.audioSrc}`)
      validateChoiceSet(track.questions, `${label}/${track.id}`, 4)
    }
  } else {
    if (lesson.listeningLab.tracks?.length) problems.push(`${label}: pending listening lab cannot expose produced tracks`)
    if (audioAssetReference.test(JSON.stringify(lesson))) problems.push(`${label}: contains an audio asset before production`)
  }
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} guided advanced lesson problem(s):`)
  for (const problem of problems) console.error(`  · ${problem}`)
  process.exit(1)
}

console.log(`\n✓ ${GUIDED_ADVANCED_LESSONS.length} guided advanced lesson(s): complete, English-only and free of measured answer shortcuts.`)
