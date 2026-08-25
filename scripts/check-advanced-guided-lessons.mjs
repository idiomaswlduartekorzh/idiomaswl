import { GUIDED_ADVANCED_LESSONS } from '../src/data/practica/advanced-guided-topics.ts'

const problems = []
const wordCount = (value) => value.trim().split(/\s+/u).filter(Boolean).length
const letterReference = /\b(?:option|answer)\s+[A-D]\b/i
const audioAssetReference = /\.(?:mp3|wav|m4a|ogg)(?:\?|$)|\/audio\//i

for (const lesson of GUIDED_ADVANCED_LESSONS) {
  const label = lesson.slug
  const questions = lesson.ieltsPractice.questions
  const positionCounts = [0, 0, 0, 0]
  let correctLongest = 0
  let correctShortest = 0

  if (lesson.discussion.questions.length < 5) problems.push(`${label}: fewer than five discussion questions`)
  if (lesson.reading.blocks.length < 6) problems.push(`${label}: fewer than six active-reading blocks`)
  if (lesson.vocabulary.length < 8) problems.push(`${label}: fewer than eight vocabulary targets`)
  if (questions.length !== 8) problems.push(`${label}: ${questions.length} IELTS questions; expected exactly eight in the pilot`)
  if (lesson.listeningLab.status !== 'not-produced') problems.push(`${label}: listening media must remain not-produced in this branch`)
  if (audioAssetReference.test(JSON.stringify(lesson))) problems.push(`${label}: contains an audio asset reference before audio production is authorised`)

  const questionIds = questions.map((question) => question.id)
  if (new Set(questionIds).size !== questionIds.length) problems.push(`${label}: duplicate IELTS question IDs`)

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
    if (letterReference.test(`${question.prompt} ${question.evidence} ${question.options.map((option) => option.feedback).join(' ')}`)) {
      problems.push(`${where}: content refers to an option by letter`)
    }

    const lengths = optionTexts.map(wordCount)
    const correctLength = lengths[question.answer]
    const distractorLengths = lengths.filter((_, index) => index !== question.answer)
    const maxDistractor = Math.max(...distractorLengths)
    const minDistractor = Math.min(...distractorLengths)
    if (correctLength > maxDistractor) correctLongest += 1
    if (correctLength < minDistractor) correctShortest += 1
    if (correctLength - maxDistractor >= 3) {
      problems.push(`${where}: the key is ${correctLength - maxDistractor} words longer than the longest distractor`)
    }
  }

  if (questions.length === 8 && positionCounts.some((count) => count !== 2)) {
    problems.push(`${label}: answer positions are ${positionCounts.join('/')}; expected 2/2/2/2`)
  }

  for (let index = 2; index < questions.length; index += 1) {
    if (questions[index].answer === questions[index - 1].answer && questions[index].answer === questions[index - 2].answer) {
      problems.push(`${label}: three identical answer positions end at ${questions[index].id}`)
    }
  }

  const longestPct = questions.length ? (correctLongest / questions.length) * 100 : 0
  const shortestPct = questions.length ? (correctShortest / questions.length) * 100 : 0
  if (longestPct > 30) problems.push(`${label}: the key is uniquely longest in ${longestPct.toFixed(1)}% of questions; maximum 30%`)
  if (shortestPct > 30) problems.push(`${label}: the key is uniquely shortest in ${shortestPct.toFixed(1)}% of questions; maximum 30%`)

  console.log(`${label}: ${questions.length} IELTS items · positions ${positionCounts.join('/')} · key longest ${longestPct.toFixed(1)}% · key shortest ${shortestPct.toFixed(1)}%`)
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} guided advanced lesson problem(s):`)
  for (const problem of problems) console.error(`  · ${problem}`)
  process.exit(1)
}

console.log(`\n✓ ${GUIDED_ADVANCED_LESSONS.length} guided advanced lesson(s): complete and free of measured answer shortcuts.`)
