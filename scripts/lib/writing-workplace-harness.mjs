const AXES = ['Evidence', 'Scope', 'Intent', 'Purpose']
const AREA_GROUPS = ['Marketing', 'Software', 'People', 'Health administration', 'Operations']
const words = value => typeof value === 'string' ? value.trim().split(/\s+/u).filter(Boolean).length : 0
const characters = value => typeof value === 'string' ? Array.from(value.replace(/\s/gu, '')).length : 0
const present = value => typeof value === 'string' && value.trim().length > 0

export function validateWritingWorkplaceCases(cases, expectedCount = 3, options = {}) {
  const issues = []
  const countLength = options.lengthUnit === 'characters' ? characters : words
  const emailRange = options.lengthUnit === 'characters' ? [100, 600] : [35, 130]
  const modelRange = options.lengthUnit === 'characters' ? [250, 900] : [110, 230]
  const unit = options.lengthUnit === 'characters' ? 'characters' : 'words'
  if (!Array.isArray(cases)) return ['Case bank must be an array.']
  if (cases.length !== expectedCount) issues.push(`Case bank needs ${expectedCount} cases; found ${cases.length}.`)

  const ids = new Set()
  const areas = new Set()
  const areaGroups = new Map(AREA_GROUPS.map(group => [group, 0]))
  const titles = new Set()
  const misunderstandings = new Set()
  const modelBodies = new Set()
  const wrongFeedbackOpenings = new Map()
  for (const item of cases) {
    const id = item?.id ?? '(missing id)'
    if (!present(item?.id)) issues.push('Case is missing an id.')
    if (ids.has(id)) issues.push(`${id}: duplicate case id.`)
    ids.add(id)
    for (const field of ['title', 'area', 'role', 'teaser', 'misunderstanding']) {
      if (!present(item?.[field])) issues.push(`${id}: missing ${field}.`)
    }
    if (options.requireAreaLabel && !present(item?.areaLabel)) issues.push(`${id}: missing target-language areaLabel.`)
    if (expectedCount === 3 && areas.has(item?.area)) issues.push(`${id}: preview areas must differ.`)
    areas.add(item?.area)
    const group = AREA_GROUPS.find(value => item?.area === value || item?.area?.startsWith(`${value} ×`))
    if (!group) issues.push(`${id}: area must belong to one of the five editorial groups.`)
    else areaGroups.set(group, areaGroups.get(group) + 1)
    if (titles.has(item?.title)) issues.push(`${id}: duplicate title.`)
    titles.add(item?.title)
    if (misunderstandings.has(item?.misunderstanding)) issues.push(`${id}: duplicate misunderstanding.`)
    misunderstandings.add(item?.misunderstanding)

    for (const field of ['from', 'to', 'sent', 'subject', 'body']) {
      if (!present(item?.email?.[field])) issues.push(`${id}: missing email.${field}.`)
    }
    if (countLength(item?.email?.body) < emailRange[0] || countLength(item?.email?.body) > emailRange[1]) issues.push(`${id}: email should contain ${emailRange[0]}–${emailRange[1]} ${unit}.`)
    if (!present(item?.document?.title) || !present(item?.document?.intro)) issues.push(`${id}: incomplete facts document.`)

    const facts = item?.document?.facts ?? []
    if (facts.length < 4 || facts.length > 8) issues.push(`${id}: facts document needs 4–8 facts.`)
    const factIds = new Set()
    for (const fact of facts) {
      if (!present(fact.id) || !present(fact.time) || !present(fact.text)) issues.push(`${id}: incomplete fact.`)
      if (factIds.has(fact.id)) issues.push(`${id}: duplicate fact ${fact.id}.`)
      factIds.add(fact.id)
    }

    const questions = item?.questions ?? []
    if (questions.length !== 4) issues.push(`${id}: exactly four analysis questions required.`)
    const questionIds = new Set()
    const axes = new Set()
    for (const question of questions) {
      if (!present(question.id) || !present(question.prompt)) issues.push(`${id}: incomplete question.`)
      if (questionIds.has(question.id)) issues.push(`${id}: duplicate question ${question.id}.`)
      questionIds.add(question.id)
      axes.add(question.axis)
      if (!AXES.includes(question.axis)) issues.push(`${id}/${question.id}: unknown axis ${question.axis}.`)
      if (!Array.isArray(question.evidenceIds) || !question.evidenceIds.length) issues.push(`${id}/${question.id}: missing evidence references.`)
      for (const ref of question.evidenceIds ?? []) if (!factIds.has(ref)) issues.push(`${id}/${question.id}: unknown evidence ${ref}.`)
      if (question.options?.length !== 3) issues.push(`${id}/${question.id}: expected three options.`)
      const optionIds = new Set()
      const optionTexts = new Set()
      for (const option of question.options ?? []) {
        if (!present(option.id) || !present(option.text) || !present(option.feedback)) issues.push(`${id}/${question.id}: incomplete option.`)
        if (optionIds.has(option.id)) issues.push(`${id}/${question.id}: duplicate option id ${option.id}.`)
        if (optionTexts.has(option.text)) issues.push(`${id}/${question.id}: duplicate option text.`)
        optionIds.add(option.id)
        optionTexts.add(option.text)
        if (option.id !== question.correctOptionId && present(option.feedback)) {
          if (option.feedback.trim().startsWith(`«${option.text}»`) || option.feedback.trim().startsWith(`“${option.text}”`)) {
            issues.push(`${id}/${question.id}: distractor feedback echoes the option instead of diagnosing its distinct error.`)
          }
          const opening = option.feedback.trim().toLocaleLowerCase().split(/\s+/u).slice(0, 3).join(' ')
          wrongFeedbackOpenings.set(opening, (wrongFeedbackOpenings.get(opening) ?? 0) + 1)
        }
      }
      if (!optionIds.has(question.correctOptionId)) issues.push(`${id}/${question.id}: answer key is missing from options.`)
    }
    for (const axis of AXES) if (!axes.has(axis)) issues.push(`${id}: missing ${axis} question.`)

    if (!present(item?.task?.prompt) || !present(item?.task?.wordGuide)) issues.push(`${id}: incomplete reply task.`)
    if (item?.task?.criteria?.length !== 4 || item.task.criteria.some(value => !present(value))) issues.push(`${id}: reply task needs four concrete criteria.`)
    if (!present(item?.model?.subject) || !present(item?.model?.body)) issues.push(`${id}: incomplete model reply.`)
    if (countLength(item?.model?.body) < modelRange[0] || countLength(item?.model?.body) > modelRange[1]) issues.push(`${id}: model reply should contain ${modelRange[0]}–${modelRange[1]} ${unit}.`)
    const guide = item?.task?.wordGuide?.match(/(\d+)[–-](\d+)/u)
    if (guide && (countLength(item?.model?.body) < Number(guide[1]) || countLength(item?.model?.body) > Number(guide[2]))) {
      issues.push(`${id}: model reply falls outside its published word guide.`)
    }
    if (modelBodies.has(item?.model?.body)) issues.push(`${id}: model reply repeats another case.`)
    modelBodies.add(item?.model?.body)
    if (item?.model?.annotations?.length !== 4) issues.push(`${id}: model needs four annotated decisions.`)
    for (const note of item?.model?.annotations ?? []) {
      if (!present(note.label) || !present(note.excerpt)) issues.push(`${id}: incomplete model annotation.`)
      if (!(item?.model?.body ?? '').includes(note.excerpt)) issues.push(`${id}: model annotation excerpt is absent from reply.`)
      if (!Array.isArray(note.evidenceIds) || !note.evidenceIds.length) issues.push(`${id}: model annotation lacks evidence.`)
      for (const ref of note.evidenceIds ?? []) if (!factIds.has(ref)) issues.push(`${id}: model annotation cites unknown evidence ${ref}.`)
    }
  }
  if (expectedCount === 20) {
    for (const [opening, count] of wrongFeedbackOpenings) {
      if (count > 12) issues.push(`Distractor feedback repeats the opening "${opening}" ${count} times.`)
    }
    for (const [group, count] of areaGroups) {
      if (count !== 4) issues.push(`${group}: expected four cases; found ${count}.`)
    }
    const patterns = cases.map(item => (item.questions ?? []).map(question => question.correctOptionId).join(''))
    if (new Set(patterns).size < 16) issues.push('Answer keys need at least 16 distinct four-question patterns.')
    if (patterns.some(pattern => pattern.length === 4 && new Set(pattern).size === 1)) issues.push('A case must not put all four correct answers in the same position.')
    for (let axis = 0; axis < 4; axis++) {
      for (const position of ['a', 'b', 'c']) {
        const count = cases.filter(item => item.questions?.[axis]?.correctOptionId === position).length
        if (count < 5 || count > 9) issues.push(`${AXES[axis]}: answer position ${position} appears ${count} times; expected 5–9.`)
      }
    }
  }
  return issues
}
