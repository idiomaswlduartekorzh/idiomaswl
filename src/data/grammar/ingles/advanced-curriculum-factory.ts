import type { GrammarTopic } from '../types.ts'

export type AdvancedPattern = {
  label: string
  pattern: string
  example: string
  cue: string
  source: string
  key: string
  warning: string
}

export type AdvancedCurriculumSpec = {
  slug: string
  order: string
  level: 'B2' | 'C1' | 'C2'
  category: string
  color: string
  shortTitle: string
  description: string
  purpose: string
  register: string
  formula: string
  model: string
  patterns: [AdvancedPattern, AdvancedPattern, AdvancedPattern]
}

const rotate = <T,>(items: T[], offset: number) => items.map((_, index) => items[(index + offset) % items.length])

function cloze(example: string, key: string, index: number) {
  const position = example.toLowerCase().indexOf(key.toLowerCase())
  if (position < 0) throw new Error(`The key “${key}” is missing from example “${example}”.`)
  return `${example.slice(0, position)}[[${index}]]${example.slice(position + key.length)}`
}

export function createAdvancedCurriculumTopic(spec: AdvancedCurriculumSpec): GrammarTopic {
  const patterns = spec.patterns
  const examples = patterns.map((pattern) => pattern.example)
  const labels = patterns.map((pattern) => pattern.label)
  const cues = patterns.map((pattern) => pattern.cue)
  const patternForms = patterns.map((pattern) => pattern.pattern)
  const recognition = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length]
    const interpret = index >= patterns.length
    return {
      scene: `${interpret ? 'Interpretation' : 'Meaning decision'} ${index + 1}`,
      lines: [['', interpret ? `What does “${target.example}” communicate in this context?` : `Which sentence best communicates this purpose: ${target.cue}?`]] as [string, string][],
      options: rotate(interpret ? cues : examples, index % examples.length),
      answer: interpret ? target.cue : target.example,
      explain: interpret ? `The ${target.label} pattern communicates ${target.cue.toLowerCase()}.` : `${target.label} is the best match because ${target.cue.toLowerCase()}.`,
    }
  })
  const dual = patterns.map((target, index) => ({
    scene: `Form and function ${index + 1}`,
    lines: [['', `“${target.example}” uses [[0]] to express [[1]].`]] as [string, string][],
    blanks: [
      { options: rotate(labels, index), answer: target.label, explain: `The structure belongs to the ${target.label} pattern.` },
      { options: rotate(cues, index), answer: target.cue, explain: `Its communicative purpose is ${target.cue.toLowerCase()}.` },
    ],
  }))
  const guidedBlanks = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length]
    return {
      options: rotate(examples, index % examples.length),
      answer: target.example,
      explain: `${target.label}: ${target.pattern}.`,
    }
  })
  const freeItems = [
    ...patterns.map((target, index) => ({ text: cloze(target.example, target.key, index), answer: target.key, explain: `${target.label} requires “${target.key}” in this model. ${target.pattern}.` })),
    ...patterns.slice(0, 2).map((target, index) => ({ text: `State the full structural pattern for ${target.label}: [[${index + patterns.length}]].`, answer: target.pattern, explain: `${target.label} is built as ${target.pattern}.` })),
  ]

  return {
    slug: spec.slug,
    order: spec.order,
    color: spec.color,
    category: spec.category,
    level: spec.level,
    title: `${spec.shortTitle} in English ${spec.level}`,
    shortTitle: spec.shortTitle,
    metaTitle: `${spec.shortTitle} ${spec.level}: explanation, exercises and PDFs`,
    description: spec.description,
    lead: `${spec.description} The lesson connects form, meaning, register and real editorial decisions rather than treating the pattern as an isolated rule.`,
    outcomes: [
      `Recognise the main ${spec.shortTitle.toLowerCase()} patterns in authentic contexts.`,
      `Choose a form that accurately expresses ${spec.purpose.toLowerCase()}.`,
      `Avoid errors that change time, agency, emphasis or speaker commitment.`,
      `Use the structure appropriately in ${spec.register.toLowerCase()}.`,
    ],
    guide: {
      goal: `Use ${spec.shortTitle.toLowerCase()} to ${spec.purpose.toLowerCase()} while preserving the intended meaning and register.`,
      model: spec.model,
      formula: spec.formula,
      decisions: [
        `Identify the communicative purpose before selecting a form: ${spec.purpose}.`,
        `Locate the structural trigger and match it to one of the reference patterns.`,
        `Check time reference, clause relationships, agency and speaker commitment.`,
        `Read the complete sentence in context and confirm that its register suits ${spec.register.toLowerCase()}.`,
        `Compare the result with a neutral alternative and keep the marked form only when it adds useful meaning.`,
      ],
      table: [
        ['Pattern', 'Form', 'Model'],
        ...patterns.map((pattern) => [pattern.label, pattern.pattern, pattern.example] as [string, string, string]),
      ],
      mistakes: patterns.map((pattern) => pattern.warning),
    },
    seo: [
      {
        heading: `What ${spec.shortTitle.toLowerCase()} communicates`,
        paragraphs: [
          spec.description,
          `The central purpose is to ${spec.purpose.toLowerCase()}. A successful choice therefore preserves the proposition while making the intended relationship, viewpoint or degree of commitment visible to the reader.`,
        ],
        examples: patterns.map((pattern) => [pattern.example, pattern.cue]),
      },
      {
        heading: 'How the pattern is built',
        paragraphs: [
          `Use this working formula: ${spec.formula}. The formula is a decision path: it identifies the trigger, the clause architecture and the element that carries tense or modality.`,
          `The model “${spec.model}” shows the complete pattern in context. Rebuild the sentence from meaning to form instead of translating each word independently.`,
        ],
        table: [
          ['Choice', 'Structure', 'Example'],
          ...patterns.map((pattern) => [pattern.label, pattern.pattern, pattern.example]),
        ],
      },
      {
        heading: 'Choose by meaning, not by surface similarity',
        paragraphs: [
          `Neighbouring structures may contain similar words but perform different jobs. Compare the three reference patterns and name the intended effect before completing the sentence.`,
          `A reliable answer explains both why the chosen form works and why a plausible alternative would change the meaning, time relation, information focus or level of certainty.`,
        ],
        table: [
          ['Meaning', 'Best route'],
          ...patterns.map((pattern) => [pattern.cue, pattern.label]),
        ],
      },
      {
        heading: 'Register, discourse and editorial control',
        paragraphs: [
          `This grammar is especially useful in ${spec.register.toLowerCase()}. Its value comes from helping the reader process a relationship efficiently, not from making the sentence sound artificially complex.`,
          `After editing, check recoverability, natural word order and consistency with the surrounding paragraph. If the marked structure creates ambiguity, return to a fuller or more neutral clause.`,
        ],
      },
    ],
    visual: {
      mode: `advanced-${spec.slug}`,
      teacherLens: `The visual map moves from communicative purpose to structural trigger, then to the final clause. It keeps meaning and form visible at the same time so the learner can justify every choice.`,
      graphicPrompt: `A minimal English grammar infographic for ${spec.shortTitle}: purpose, pattern, contrast and final check.`,
      scene: patterns.map((pattern) => [pattern.example, pattern.cue]),
      learnerModes: ['visual: map the relationship', 'analytical: justify the form', 'editorial: check register'],
      practiceVerbs: ['Identify', 'Compare', 'Build', 'Transform', 'Edit', 'Produce'],
      reviewFocus: ['communicative purpose', 'structural trigger', 'meaning contrast', 'register choice'],
    },
    practice: {
      levels: [
        {
          id: 'level-1', title: 'Recognition in context', tag: '6 decisions',
          intro: 'Choose the sentence whose grammar matches the stated communicative purpose.', type: 'choice', items: recognition,
        },
        {
          id: 'level-2', title: 'Form and function', tag: '2 linked gaps',
          intro: 'Identify both the structural family and the meaning carried by each model.', type: 'dual', items: dual,
        },
        {
          id: 'level-3', title: 'Guided discourse choices', tag: '6 contextual choices',
          intro: 'Maintain accurate form and meaning across a connected sequence of decisions.', type: 'guidedText', scene: 'Editorial planning',
          text: [
            ...patterns.map((pattern, index) => `Choose the model that expresses ${pattern.cue}: [[${index}]].`),
            ...patterns.map((pattern, index) => `Choose the model built with ${pattern.pattern}: [[${index + patterns.length}]].`),
          ].join(' '), blanks: guidedBlanks,
        },
        {
          id: 'level-4', title: 'Open reconstruction', tag: '5 open gaps',
          intro: 'Recover the missing structural trigger without a word bank.', type: 'freeText', scene: 'Independent reconstruction',
          text: freeItems.map((item) => item.text).join(' '),
          blanks: freeItems.map(({ answer, explain }) => ({ answer, explain })),
        },
        {
          id: 'level-5', title: 'Controlled transformation', tag: '4 rewrites',
          intro: 'Rewrite the neutral source so that it performs the requested advanced function.', type: 'write',
          items: Array.from({ length: 4 }, (_, index) => {
            const target = patterns[index % patterns.length]
            return {
              scene: `Transformation ${index + 1}`,
              prompt: `Rewrite “${target.source}” using the ${target.label} pattern to express ${target.cue.toLowerCase()}.`,
              answer: target.example,
              accepted: [target.key],
              explain: `${target.pattern}. The rewrite preserves the core message while adding the intended ${target.label.toLowerCase()} effect.`,
            }
          }),
        },
        {
          id: 'level-6', title: 'Communicative production', tag: '3 extended tasks',
          intro: 'Use the grammar independently in realistic academic, professional and conversational contexts.', type: 'write',
          items: patterns.map((target, index) => ({
            scene: `Production task ${index + 1}`,
            prompt: `Write two connected sentences about a realistic situation. Use ${target.label} to express ${target.cue.toLowerCase()}, then add a neutral sentence that makes the contrast clear.`,
            answer: `${target.example} The surrounding context would then state the same situation in neutral order or with a less marked commitment.`,
            accepted: [target.key],
            explain: `A strong response uses ${target.pattern} accurately and makes the communicative purpose visible in context.`,
          })),
        },
      ],
    },
  }
}

export function pattern(
  label: string,
  form: string,
  example: string,
  cue: string,
  source: string,
  key: string,
  warning: string,
): AdvancedPattern {
  return { label, pattern: form, example, cue, source, key, warning }
}
