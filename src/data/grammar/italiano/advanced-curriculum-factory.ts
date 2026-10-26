import type { GrammarTopic } from '../types.ts'

export type ItalianAdvancedPattern = { label: string; pattern: string; example: string; cue: string; key: string; warning: string }
export type ItalianAdvancedCurriculumSpec = {
  slug: string; order: string; level: 'B2' | 'C1' | 'C2'; category: string; color: string; shortTitle: string
  description: string; purpose: string; register: string; formula: string; model: string
  patterns: [ItalianAdvancedPattern, ItalianAdvancedPattern, ItalianAdvancedPattern]
}

const rotate = <T,>(items: T[], offset: number) => items.map((_, index) => items[(index + offset) % items.length])
function cloze(example: string, key: string, index: number) {
  const position = example.toLocaleLowerCase('it').indexOf(key.toLocaleLowerCase('it'))
  if (position < 0) throw new Error(`La chiave "${key}" non compare nell'esempio "${example}".`)
  return `${example.slice(0, position)}[[${index}]]${example.slice(position + key.length)}`
}

export function createItalianAdvancedCurriculumTopic(spec: ItalianAdvancedCurriculumSpec): GrammarTopic {
  const patterns = spec.patterns
  const examples = patterns.map((item) => item.example), labels = patterns.map((item) => item.label), cues = patterns.map((item) => item.cue)
  const recognition = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length], interpret = index >= patterns.length
    return { scene: `${interpret ? 'Riconoscere il significato' : 'Scegliere la forma'} ${index + 1}`, lines: [['', interpret ? `Che cosa esprime "${target.example}" in questo contesto?` : `Quale frase realizza questa intenzione: ${target.cue}?`]] as [string, string][], options: rotate(interpret ? cues : examples, index % examples.length), answer: interpret ? target.cue : target.example, explain: interpret ? `Il modello "${target.label}" esprime ${target.cue}.` : `"${target.label}" è adatto perché esprime ${target.cue}.` }
  })
  const dual = patterns.map((target, index) => ({ scene: `Forma e funzione ${index + 1}`, lines: [['', `"${target.example}" usa [[0]] per esprimere [[1]].`]] as [string, string][], blanks: [{ options: rotate(labels, index), answer: target.label, explain: `La struttura appartiene al modello "${target.label}".` }, { options: rotate(cues, index), answer: target.cue, explain: `La funzione comunicativa è: ${target.cue}.` }] }))
  const guidedBlanks = Array.from({ length: 6 }, (_, index) => { const target = patterns[index % patterns.length]; return { options: rotate(examples, index % examples.length), answer: target.example, explain: `${target.label}: ${target.pattern}.` } })
  const freeItems = [...patterns.map((target, index) => ({ text: cloze(target.example, target.key, index), answer: target.key, explain: `Il modello "${target.label}" richiede "${target.key}". ${target.pattern}.` })), ...patterns.slice(0, 2).map((target, index) => ({ text: `Scrivi la struttura completa di "${target.label}": [[${index + patterns.length}]].`, answer: target.pattern, explain: `"${target.label}" si costruisce così: ${target.pattern}.` }))]

  return {
    slug: spec.slug, order: spec.order, color: spec.color, category: spec.category, level: spec.level,
    title: `${spec.shortTitle} nell'italiano ${spec.level}`, shortTitle: spec.shortTitle,
    metaTitle: `${spec.shortTitle} ${spec.level}: spiegazione, esercizi e PDF`, description: spec.description,
    lead: `${spec.description} La lezione collega forma, significato, registro e controllo editoriale, invece di presentare la regola in modo isolato.`,
    outcomes: [`Riconoscere gli usi principali del tema "${spec.shortTitle}" in contesti autentici.`, `Scegliere una forma adeguata per ${spec.purpose}.`, 'Evitare errori che modificano tempo, agente, portata o atteggiamento del parlante.', `Usare la struttura con sicurezza in ${spec.register}.`],
    guide: {
      goal: `Usare ${spec.shortTitle} in modo mirato per ${spec.purpose}, senza alterare significato o registro.`, model: spec.model, formula: spec.formula,
      decisions: [`Individua prima l'intenzione comunicativa: ${spec.purpose}.`, 'Segna l’elemento attivatore e collegalo a un modello di riferimento.', 'Controlla tempo, connessione tra le frasi, agente e atteggiamento del parlante.', `Rileggi l'intera frase e verifica che il registro sia adatto a ${spec.register}.`, 'Confronta la frase con una formulazione neutra e conserva la forma marcata solo se aggiunge una sfumatura utile.'],
      table: [['Funzione', 'Struttura', 'Esempio'], ...patterns.map((item) => [item.label, item.pattern, item.example] as [string, string, string])], mistakes: patterns.map((item) => item.warning),
    },
    seo: [
      { heading: `${spec.shortTitle}: funzioni e significati`, paragraphs: [spec.description, `L'obiettivo centrale è ${spec.purpose}. La scelta corretta mantiene il contenuto e rende visibili relazione logica, prospettiva o grado di impegno.`], examples: patterns.map((item) => [item.example, item.cue]) },
      { heading: 'Costruire la struttura passo dopo passo', paragraphs: [`Usa questa formula operativa: ${spec.formula}. Porta dall'elemento attivatore alla forma che esprime tempo, modo o prospettiva.`, `Il modello "${spec.model}" mostra la struttura completa nel contesto. Ricostruiscila dal significato alla forma, senza tradurre parola per parola.`], table: [['Decisione', 'Struttura', 'Esempio'], ...patterns.map((item) => [item.label, item.pattern, item.example])] },
      { heading: 'Scegliere in base al significato', paragraphs: ['Strutture vicine possono condividere parole e avere funzioni diverse. Nomina prima l’effetto comunicativo desiderato.', 'Una risposta solida spiega sia la forma scelta sia il cambiamento di significato prodotto da un’alternativa.'], table: [['Significato previsto', 'Modello consigliato'], ...patterns.map((item) => [item.cue, item.label])] },
      { heading: 'Registro, effetto testuale e controllo finale', paragraphs: [`Questo punto grammaticale è particolarmente utile in ${spec.register}. Deve facilitare l'interpretazione, non rendere la frase artificiosamente complessa.`, 'Dopo la revisione controlla riferimento, ordine naturale e coerenza con il paragrafo. Se una forma marcata crea ambiguità, preferisci una versione più esplicita.'] },
    ],
    visual: { mode: `italiano-avanzato-${spec.slug}`, teacherLens: 'La mappa conduce dall’intenzione comunicativa all’elemento attivatore e poi all’enunciato completo, mantenendo visibili forma e significato.', graphicPrompt: `Infografica minimalista di grammatica italiana su ${spec.shortTitle}: intenzione, struttura, contrasto e controllo finale.`, scene: patterns.map((item) => [item.example, item.cue]), learnerModes: ['visivo: rappresentare la relazione', 'analitico: motivare la forma', 'editoriale: controllare il registro'], practiceVerbs: ['Riconoscere', 'Confrontare', 'Costruire', 'Trasformare', 'Rivedere', 'Produrre'], reviewFocus: ['intenzione comunicativa', 'elemento grammaticale', 'contrasto di significato', 'scelta di registro'] },
    practice: { levels: [
      { id: 'level-1', title: 'Riconoscere nel contesto', tag: '6 decisioni', intro: 'Scegli la frase la cui grammatica corrisponde all’intenzione indicata.', type: 'choice', items: recognition },
      { id: 'level-2', title: 'Forma e funzione', tag: '2 elementi collegati', intro: 'Associa ogni modello alla famiglia grammaticale e alla funzione comunicativa.', type: 'dual', items: dual },
      { id: 'level-3', title: 'Decisioni guidate nel testo', tag: '6 decisioni contestuali', intro: 'Mantieni coerenti forma e significato lungo più decisioni.', type: 'guidedText', scene: 'Pianificazione editoriale', text: [...patterns.map((item, index) => `Scegli il modello per ${item.cue}: [[${index}]].`), ...patterns.map((item, index) => `Scegli il modello con la struttura ${item.pattern}: [[${index + patterns.length}]].`)].join(' '), blanks: guidedBlanks },
      { id: 'level-4', title: 'Ricostruzione libera', tag: '5 elementi', intro: 'Completa l’elemento grammaticale senza banca di parole.', type: 'freeText', scene: 'Ricostruzione autonoma', text: freeItems.map((item) => item.text).join(' '), blanks: freeItems.map(({ answer, explain }) => ({ answer, explain })) },
      { id: 'level-5', title: 'Trasformazione controllata', tag: '4 riscritture', intro: 'Riscrivi l’idea con il modello avanzato richiesto.', type: 'write', items: Array.from({ length: 4 }, (_, index) => { const target = patterns[index % patterns.length]; return { scene: `Trasformazione ${index + 1}`, prompt: `Scrivi una nuova frase con "${target.label}" per esprimere ${target.cue}.`, answer: target.example, accepted: [target.key], explain: `${target.pattern}. La forma rende visibile la funzione di "${target.label}".` } }) },
      { id: 'level-6', title: 'Produzione comunicativa', tag: '3 compiti estesi', intro: 'Usa la grammatica autonomamente in contesti realistici.', type: 'write', items: patterns.map((target, index) => ({ scene: `Compito di produzione ${index + 1}`, prompt: `Scrivi due frasi collegate. Usa "${target.label}" per ${target.cue} e aggiungi una versione neutra che mostri il contrasto.`, answer: `${target.example} In seguito lo stesso contenuto verrebbe formulato in modo neutro.`, accepted: [target.key], explain: `Una buona risposta usa ${target.pattern} con precisione e rende riconoscibile l’intenzione comunicativa.` })) },
    ] },
  }
}

export function pattern(label: string, form: string, example: string, cue: string, key: string, warning: string): ItalianAdvancedPattern { return { label, pattern: form, example, cue, key, warning } }
