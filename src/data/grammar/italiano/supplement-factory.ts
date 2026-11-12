import type { Blank, DualItem, GrammarTopic } from '../types'

type ChoiceSeed = { prompt: string; answer: string; options: string[]; explain: string }
type TextSeed = { text: string; blanks: Blank[] }

export type ItalianSupplementSpec = {
  level: 'A1' | 'B1'
  slug: string
  color: string
  category: string
  title: string
  shortTitle: string
  description: string
  lead: string
  goal: string
  model: string
  formula: string
  table: [string, string, string][]
  scenes: [string, string][]
  choices: ChoiceSeed[]
  dual: DualItem[]
  guided: TextSeed
  free: TextSeed
  errors: ChoiceSeed[]
}

export type ItalianCurriculumSeed = {
  level: 'A1' | 'B1'
  slug: string
  category: string
  title: string
  shortTitle: string
  description: string
  goal: string
  formula: string
  rows: [string, string, string][]
  drills: [string, string, string][]
}

const optionSet = (answers: string[], index: number) => Array.from(new Set([answers[index], ...answers.slice(index + 1), ...answers.slice(0, index)])).slice(0, 4)

export function createItalianCurriculumTopic(seed: ItalianCurriculumSeed): GrammarTopic {
  const answers = seed.drills.map(([, answer]) => answer)
  const options = answers.length >= 4 ? answers : [...answers, '—']
  const choiceSeeds = seed.drills.map(([before, answer, after], index) => ({
    prompt: `${before} ___ ${after}`.replace(/\s+/g, ' ').trim(), answer,
    options: optionSet(options, index % options.length),
    explain: `La forma «${answer}» completa il contesto e realizza ${seed.formula}.`,
  }))
  const dual: DualItem[] = Array.from({ length: 4 }, (_, index) => {
    const first = seed.drills[(index * 2) % seed.drills.length]
    const second = seed.drills[(index * 2 + 1) % seed.drills.length]
    return {
      scene: `Contrasto ${index + 1}`,
      lines: [['', `${first[0]} [[0]] ${first[2]} / ${second[0]} [[1]] ${second[2]}`.replace(/\s+/g, ' ').trim()]],
      blanks: [
        { options: optionSet(options, (index * 2) % options.length), answer: first[1], explain: `«${first[1]}» rispetta il primo referente e la struttura obiettivo.` },
        { options: optionSet(options, (index * 2 + 1) % options.length), answer: second[1], explain: `«${second[1]}» completa la seconda relazione senza cambiare il significato.` },
      ],
    }
  })
  const guidedText = seed.drills.map(([before, , after], index) => `${before} [[${index}]] ${after}`.replace(/\s+/g, ' ').trim()).join(' ')
  const guidedBlanks = seed.drills.map(([, answer], index) => ({ options: optionSet(options, index % options.length), answer, explain: `«${answer}» mantiene la coerenza della sequenza.` }))
  const errorSeeds = seed.drills.map(([before, answer, after], index) => ({
    prompt: `Correggi: ${before} ${options[(index + 1) % options.length]} ${after}`.replace(/\s+/g, ' ').trim(),
    answer: `${before} ${answer} ${after}`.replace(/\s+/g, ' ').trim(),
    options: optionSet(seed.drills.map(([b, a, c]) => `${b} ${a} ${c}`.replace(/\s+/g, ' ').trim()), index),
    explain: `La correzione recupera «${answer}» e conserva l’accordo e il significato.`,
  }))
  return createItalianSupplement({
    level: seed.level, slug: seed.slug, color: seed.level === 'A1' ? '#CE2B37' : '#08713C', category: seed.category,
    title: seed.title, shortTitle: seed.shortTitle, description: seed.description,
    lead: `${seed.description} Tabella completa, mappa visiva, sei fasi di pratica e materiali stampabili.`, goal: seed.goal,
    model: `${seed.drills[0][0]} ${seed.drills[0][1]} ${seed.drills[0][2]}`.replace(/\s+/g, ' ').trim(), formula: seed.formula,
    table: [['Funzione', 'Forma', 'Esempio'], ...seed.rows],
    scenes: seed.rows.map(([label, form, example]) => [example, `${label} · ${form}`]),
    choices: choiceSeeds, dual,
    guided: { text: guidedText, blanks: guidedBlanks },
    free: { text: guidedText, blanks: seed.drills.map(([, answer]) => ({ answer, explain: `La forma richiesta è «${answer}».` })) },
    errors: errorSeeds,
  })
}

export function createItalianSupplement(spec: ItalianSupplementSpec): GrammarTopic {
  const focus = spec.shortTitle.toLowerCase()
  return {
    slug: spec.slug, order: '00', color: spec.color, category: spec.category, level: spec.level,
    title: spec.title, shortTitle: spec.shortTitle,
    metaTitle: `${spec.shortTitle} in italiano ${spec.level}: regole, tabella ed esercizi`,
    description: spec.description, lead: spec.lead,
    outcomes: [`Riconoscere ${focus} nel contesto`, 'Costruire la forma senza tradurre parola per parola', 'Confrontare alternative vicine', 'Usare la struttura in un testo connesso'],
    guide: {
      goal: spec.goal, model: spec.model, formula: spec.formula,
      decisions: ['Individua l’intenzione e il referente.', 'Trova il verbo e il suo soggetto.', 'Scegli tempo, modo o pronome richiesto.', 'Controlla ordine, accordo e preposizioni.', 'Rileggi la frase nel testo completo.'],
      table: spec.table,
      mistakes: spec.errors.slice(0, 4).map((item) => `${item.prompt} → ${item.answer}`),
    },
    seo: [
      { heading: `Come si usa ${spec.shortTitle}?`, paragraphs: [spec.description, `Il modello «${spec.model}» mostra la relazione centrale. Non memorizzare soltanto la forma: collega ogni scelta alla domanda comunicativa che risolve.`], table: spec.table },
      { heading: `${spec.shortTitle}: differenze ed errori frequenti`, paragraphs: [`Confronta ${spec.formula} con le forme vicine e osserva il punto in cui cambia il significato. Negli esercizi spiega sempre quale parola o quale relazione ha guidato la risposta.`, 'Nei testi più lunghi controlla anche il referente, la sequenza temporale e il registro: una forma isolata può essere possibile ma incoerente con il contesto.'], examples: spec.scenes },
    ],
    visual: {
      mode: 'structure', teacherLens: `Forma, significato e uso di ${spec.shortTitle}.`,
      graphicPrompt: `Infografica didattica originale su ${spec.shortTitle}, con formula, tabella ed esempi italiani.`,
      scene: spec.scenes, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: [spec.formula, 'accordo e riferimento', 'ordine e registro'],
    },
    practice: { levels: [
      { id: 'level-1', title: 'Riconosci la scelta corretta', tag: 'Scelta multipla', intro: 'Scegli la forma coerente con il contesto.', type: 'choice', items: spec.choices.map((item) => ({ scene: 'Frase in contesto', lines: [['', item.prompt]], options: item.options, answer: item.answer, explain: item.explain })) },
      { id: 'level-2', title: 'Collega due decisioni', tag: 'Due spazi', intro: 'Completa entrambe le parti e controlla la relazione.', type: 'dual', items: spec.dual },
      { id: 'level-3', title: 'Completa il testo', tag: 'Testo guidato', intro: 'Mantieni coerenza e riferimento nel brano.', type: 'guidedText', scene: 'Testo connesso', text: spec.guided.text, blanks: spec.guided.blanks },
      { id: 'level-4', title: 'Scrivi senza opzioni', tag: 'Produzione controllata', intro: 'Recupera la forma completa senza banca.', type: 'freeText', scene: 'Trasformazione', text: spec.free.text, blanks: spec.free.blanks },
      { id: 'level-5', title: 'Trova e ripara l’errore', tag: 'Revisione', intro: 'Scegli la correzione e spiega la regola.', type: 'choice', items: spec.errors.map((item) => ({ scene: 'Clinica degli errori', lines: [['', item.prompt]], options: item.options, answer: item.answer, explain: item.explain })) },
      { id: 'level-6', title: 'Produci nel contesto', tag: 'Scrittura', intro: 'Usa la struttura in frasi e paragrafi nuovi.', type: 'write', items: Array.from({ length: 8 }, (_, index) => ({ scene: `Missione ${index + 1}`, prompt: `Scrivi ${index < 4 ? 'due frasi collegate' : 'un breve paragrafo'} con ${spec.shortTitle}; varia persona, tempo o referente e giustifica la scelta.`, answer: `${spec.model} La produzione mantiene ${spec.formula} e un referente chiaro.`, explain: 'La risposta deve essere grammaticalmente corretta, coerente e comunicativamente motivata.' })) },
    ] },
  }
}
