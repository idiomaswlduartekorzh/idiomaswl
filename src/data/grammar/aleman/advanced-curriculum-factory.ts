import type { GrammarTopic } from '../types.ts'

export type GermanAdvancedPattern = {
  label: string
  pattern: string
  example: string
  cue: string
  key: string
  warning: string
}

export type GermanAdvancedCurriculumSpec = {
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
  patterns: [GermanAdvancedPattern, GermanAdvancedPattern, GermanAdvancedPattern]
}

const rotate = <T,>(items: T[], offset: number) => items.map((_, index) => items[(index + offset) % items.length])

function cloze(example: string, key: string, index: number) {
  const position = example.toLocaleLowerCase('de').indexOf(key.toLocaleLowerCase('de'))
  if (position < 0) throw new Error(`Der Schlüssel "${key}" fehlt im Beispiel "${example}".`)
  return `${example.slice(0, position)}[[${index}]]${example.slice(position + key.length)}`
}

export function createGermanAdvancedCurriculumTopic(spec: GermanAdvancedCurriculumSpec): GrammarTopic {
  const patterns = spec.patterns
  const examples = patterns.map((pattern) => pattern.example)
  const labels = patterns.map((pattern) => pattern.label)
  const cues = patterns.map((pattern) => pattern.cue)
  const recognition = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length]
    const interpret = index >= patterns.length
    return {
      scene: `${interpret ? 'Bedeutung erkennen' : 'Passende Form wählen'} ${index + 1}`,
      lines: [['', interpret ? `Was drückt "${target.example}" in diesem Zusammenhang aus?` : `Welcher Satz erfüllt diese Absicht: ${target.cue}?`]] as [string, string][],
      options: rotate(interpret ? cues : examples, index % examples.length),
      answer: interpret ? target.cue : target.example,
      explain: interpret ? `Das Muster "${target.label}" drückt ${target.cue.toLowerCase()} aus.` : `"${target.label}" passt, weil die Form ${target.cue.toLowerCase()} ausdrückt.`,
    }
  })
  const dual = patterns.map((target, index) => ({
    scene: `Form und Funktion ${index + 1}`,
    lines: [['', `"${target.example}" verwendet [[0]], um [[1]] auszudrücken.`]] as [string, string][],
    blanks: [
      { options: rotate(labels, index), answer: target.label, explain: `Die Struktur gehört zum Muster "${target.label}".` },
      { options: rotate(cues, index), answer: target.cue, explain: `Die kommunikative Funktion ist: ${target.cue}.` },
    ],
  }))
  const guidedBlanks = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length]
    return { options: rotate(examples, index % examples.length), answer: target.example, explain: `${target.label}: ${target.pattern}.` }
  })
  const freeItems = [
    ...patterns.map((target, index) => ({ text: cloze(target.example, target.key, index), answer: target.key, explain: `Das Muster "${target.label}" verlangt "${target.key}". ${target.pattern}.` })),
    ...patterns.slice(0, 2).map((target, index) => ({ text: `Notieren Sie die vollständige Struktur von "${target.label}": [[${index + patterns.length}]].`, answer: target.pattern, explain: `"${target.label}" wird so gebildet: ${target.pattern}.` })),
  ]

  return {
    slug: spec.slug,
    order: spec.order,
    color: spec.color,
    category: spec.category,
    level: spec.level,
    title: `${spec.shortTitle} im Deutschen ${spec.level}`,
    shortTitle: spec.shortTitle,
    metaTitle: `${spec.shortTitle} ${spec.level}: Erklärung, Übungen und PDF`,
    description: spec.description,
    lead: `${spec.description} Diese Lektion verbindet Form, Bedeutung, Register und redaktionelle Kontrolle, statt die Regel isoliert zu behandeln.`,
    outcomes: [
      `Die wichtigsten Verwendungen des Themas "${spec.shortTitle}" in authentischen Kontexten erkennen.`,
      `Eine passende Form wählen, um ${spec.purpose}.`,
      'Fehler vermeiden, die Zeitbezug, Handlungsträger, Skopus oder Sprechereinstellung verändern.',
      `Die Struktur sicher in folgenden Kontexten verwenden: ${spec.register}.`,
    ],
    guide: {
      goal: `${spec.shortTitle} gezielt einsetzen, um ${spec.purpose}, ohne Bedeutung oder Register zu verändern.`,
      model: spec.model,
      formula: spec.formula,
      decisions: [
        `Bestimmen Sie zuerst die kommunikative Absicht: ${spec.purpose}.`,
        'Markieren Sie den Auslöser und ordnen Sie ihn einem Referenzmuster zu.',
        'Prüfen Sie Zeitbezug, Satzverknüpfung, Handlungsträger und Sprechereinstellung.',
        `Lesen Sie den ganzen Satz erneut und prüfen Sie, ob das Register zu ${spec.register} passt.`,
        'Vergleichen Sie mit einer neutralen Formulierung und behalten Sie die markierte Form nur, wenn sie eine nützliche Nuance trägt.',
      ],
      table: [['Funktion', 'Struktur', 'Beispiel'], ...patterns.map((pattern) => [pattern.label, pattern.pattern, pattern.example] as [string, string, string])],
      mistakes: patterns.map((pattern) => pattern.warning),
    },
    seo: [
      {
        heading: `${spec.shortTitle}: Funktionen und Bedeutungen`,
        paragraphs: [
          spec.description,
          `Das zentrale Ziel besteht darin, ${spec.purpose}. Die passende Wahl erhält die Aussage und macht zugleich logische Beziehung, Perspektive oder Grad der Festlegung sichtbar.`,
        ],
        examples: patterns.map((pattern) => [pattern.example, pattern.cue]),
      },
      {
        heading: 'Die Struktur Schritt für Schritt bilden',
        paragraphs: [
          `Nutzen Sie diese Arbeitsformel: ${spec.formula}. Sie führt vom Auslöser über den Satzbau zur Form, die Zeit, Modus oder Perspektive trägt.`,
          `Das Modell "${spec.model}" zeigt die vollständige Struktur im Kontext. Rekonstruieren Sie sie von der Bedeutung zur Form, ohne Wort für Wort zu übersetzen.`,
        ],
        table: [['Entscheidung', 'Struktur', 'Beispiel'], ...patterns.map((pattern) => [pattern.label, pattern.pattern, pattern.example])],
      },
      {
        heading: 'Nach Bedeutung wählen, nicht nach Ähnlichkeit',
        paragraphs: [
          'Benachbarte Strukturen können dieselben Wörter enthalten und dennoch unterschiedliche Funktionen erfüllen. Benennen Sie zuerst die beabsichtigte Wirkung.',
          'Eine tragfähige Antwort erklärt sowohl die passende Form als auch die Bedeutungsverschiebung, die eine andere Wahl verursachen würde.',
        ],
        table: [['Beabsichtigte Bedeutung', 'Empfohlenes Muster'], ...patterns.map((pattern) => [pattern.cue, pattern.label])],
      },
      {
        heading: 'Register, Textwirkung und Endkontrolle',
        paragraphs: [
          `Dieser Grammatikpunkt ist besonders nützlich in ${spec.register}. Er soll die Interpretation erleichtern, nicht den Satz künstlich kompliziert machen.`,
          'Kontrollieren Sie nach der Überarbeitung Referenz, natürliche Wortstellung und Kohärenz mit dem Absatz. Löst eine markierte Form Mehrdeutigkeit aus, wählen Sie eine explizitere Fassung.',
        ],
      },
    ],
    visual: {
      mode: `deutsch-fortgeschritten-${spec.slug}`,
      teacherLens: 'Die Karte führt von der kommunikativen Absicht über den Auslöser zur fertigen Äußerung. Bedeutung und Form bleiben gleichzeitig sichtbar.',
      graphicPrompt: `Minimalistische deutsche Grammatik-Infografik zu ${spec.shortTitle}: Absicht, Struktur, Kontrast und Endkontrolle.`,
      scene: patterns.map((pattern) => [pattern.example, pattern.cue]),
      learnerModes: ['visuell: Beziehung abbilden', 'analytisch: Form begründen', 'redaktionell: Register prüfen'],
      practiceVerbs: ['Erkennen', 'Vergleichen', 'Bilden', 'Umformen', 'Überarbeiten', 'Produzieren'],
      reviewFocus: ['kommunikative Absicht', 'grammatischer Auslöser', 'Bedeutungskontrast', 'Registerwahl'],
    },
    practice: {
      levels: [
        { id: 'level-1', title: 'Erkennen im Kontext', tag: '6 Entscheidungen', intro: 'Wählen Sie den Satz, dessen Grammatik zur angekündigten Absicht passt.', type: 'choice', items: recognition },
        { id: 'level-2', title: 'Form und Funktion', tag: '2 verbundene Elemente', intro: 'Ordnen Sie jedem Modell seine grammatische Familie und kommunikative Funktion zu.', type: 'dual', items: dual },
        { id: 'level-3', title: 'Gelenkte Entscheidungen im Text', tag: '6 Kontextentscheidungen', intro: 'Halten Sie Form und Bedeutung über mehrere Entscheidungen hinweg kohärent.', type: 'guidedText', scene: 'Redaktionelle Planung', text: [...patterns.map((pattern, index) => `Wählen Sie das Modell für ${pattern.cue}: [[${index}]].`), ...patterns.map((pattern, index) => `Wählen Sie das Modell mit der Struktur ${pattern.pattern}: [[${index + patterns.length}]].`)].join(' '), blanks: guidedBlanks },
        { id: 'level-4', title: 'Freie Rekonstruktion', tag: '5 Elemente', intro: 'Ergänzen Sie den grammatischen Auslöser ohne Wortbank.', type: 'freeText', scene: 'Selbstständige Rekonstruktion', text: freeItems.map((item) => item.text).join(' '), blanks: freeItems.map(({ answer, explain }) => ({ answer, explain })) },
        { id: 'level-5', title: 'Kontrollierte Umformung', tag: '4 Umformulierungen', intro: 'Formulieren Sie die Aussage mit dem verlangten fortgeschrittenen Muster um.', type: 'write', items: Array.from({ length: 4 }, (_, index) => { const target = patterns[index % patterns.length]; return { scene: `Umformung ${index + 1}`, prompt: `Schreiben Sie einen neuen Satz mit "${target.label}", der ${target.cue.toLowerCase()} ausdrückt.`, answer: target.example, accepted: [target.key], explain: `${target.pattern}. Die Form macht die Funktion von "${target.label}" sichtbar.` } }) },
        { id: 'level-6', title: 'Kommunikative Produktion', tag: '3 ausführliche Aufgaben', intro: 'Verwenden Sie die Grammatik selbstständig in realistischen Zusammenhängen.', type: 'write', items: patterns.map((target, index) => ({ scene: `Produktionsaufgabe ${index + 1}`, prompt: `Schreiben Sie zwei verbundene Sätze. Verwenden Sie "${target.label}" für ${target.cue.toLowerCase()} und ergänzen Sie danach eine neutrale Fassung, die den Kontrast zeigt.`, answer: `${target.example} Danach würde derselbe Sachverhalt neutral formuliert.`, accepted: [target.key], explain: `Eine gute Antwort verwendet ${target.pattern} präzise und macht die kommunikative Absicht erkennbar.` })) },
      ],
    },
  }
}

export function pattern(label: string, form: string, example: string, cue: string, key: string, warning: string): GermanAdvancedPattern {
  return { label, pattern: form, example, cue, key, warning }
}
