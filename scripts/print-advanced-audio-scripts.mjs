import { GUIDED_ADVANCED_LESSONS } from '../src/data/practica/advanced-guided-topics.ts'

const requestedSlug = process.argv[2]
const pendingLessons = GUIDED_ADVANCED_LESSONS.filter(({ listeningLab }) => listeningLab.status === 'not-produced')
const lessons = requestedSlug
  ? pendingLessons.filter(({ slug }) => slug === requestedSlug)
  : pendingLessons

if (!lessons.length) {
  const available = pendingLessons.map(({ slug }) => slug).join(', ')
  console.error(`No pending audio scripts found for "${requestedSlug ?? ''}". Available slugs: ${available}`)
  process.exit(1)
}

for (const lesson of lessons) {
  console.log(`\n# ${lesson.title}`)
  console.log(`Slug: ${lesson.slug}`)
  console.log(`Relationship: ${lesson.listeningLab.relationship}`)

  for (const track of lesson.listeningLab.plannedTracks) {
    console.log(`\n## ${track.eyebrow}: ${track.title}`)
    console.log(`Speaker: ${track.speaker}`)
    console.log(`Estimated duration: ${track.estimatedDuration}`)
    console.log(`Function: ${track.function}`)
    console.log(`\n${track.transcript}`)
    console.log(`\nListening questions: ${track.questions.length}`)
    for (const [index, question] of track.questions.entries()) {
      console.log(`${index + 1}. ${question.prompt}`)
    }
  }

  console.log(`\nIntegration task: ${lesson.listeningLab.integrationPrompt}`)
}
