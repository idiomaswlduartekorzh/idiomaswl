import type { Blank, DualItem, GrammarTopic } from '../../types'

type ChoiceSeed = { prompt: string; answer: string; options: string[]; explain: string }
type TextSeed = { text: string; blanks: Blank[] }

export type FrenchA1SupplementSpec = {
  slug: string
  color: string
  category: string
  title: string
  shortTitle: string
  metaTitle: string
  description: string
  lead: string
  outcomes: string[]
  goal: string
  model: string
  formula: string
  decisions: string[]
  table: [string, string, string][]
  mistakes: string[]
  sections: GrammarTopic['seo']
  scenes: [string, string][]
  choices: ChoiceSeed[]
  dual: DualItem[]
  guided: TextSeed
  free: TextSeed
  errorChoices: ChoiceSeed[]
  writing: Array<{ prompt: string; answer: string; explain: string }>
}

export function createFrenchA1Supplement(spec: FrenchA1SupplementSpec): GrammarTopic {
  return {
    slug: spec.slug,
    order: '00',
    color: spec.color,
    category: spec.category,
    level: 'A1',
    title: spec.title,
    shortTitle: spec.shortTitle,
    metaTitle: spec.metaTitle,
    description: spec.description,
    lead: spec.lead,
    outcomes: spec.outcomes,
    guide: {
      goal: spec.goal,
      model: spec.model,
      formula: spec.formula,
      decisions: spec.decisions,
      table: spec.table,
      mistakes: spec.mistakes,
    },
    seo: spec.sections,
    visual: {
      mode: 'contrast-map',
      teacherLens: `Contrastes de forme, sens et emploi pour ${spec.shortTitle}.`,
      graphicPrompt: `Infografía educativa original de ${spec.shortTitle} con tabla completa, contraste semántico y ejemplos franceses.`,
      scene: spec.scenes,
      learnerModes: ['reading', 'typing', 'choosing'],
      reviewFocus: [spec.formula, 'referencia y cantidad', 'elisión y concordancia', 'uso dentro de un texto'],
    },
    practice: {
      levels: [
        {
          id: 'level-1', title: 'Reconocer la forma en contexto', tag: 'Elección',
          intro: 'Elige la forma que expresa exactamente la intención de la frase.', type: 'choice',
          items: spec.choices.map((item) => ({ scene: 'Phrase en contexte', lines: [['', item.prompt]], options: item.options, answer: item.answer, explain: item.explain })),
        },
        {
          id: 'level-2', title: 'Tomar dos decisiones conectadas', tag: 'Dos espacios',
          intro: 'Completa cada frase y justifica la relación entre las dos respuestas.', type: 'dual', items: spec.dual,
        },
        {
          id: 'level-3', title: 'Completar un texto conectado', tag: 'Texto guiado',
          intro: 'Mantén la coherencia de referencia y cantidad a lo largo del texto.', type: 'guidedText', scene: 'Texte guidé', text: spec.guided.text, blanks: spec.guided.blanks,
        },
        {
          id: 'level-4', title: 'Recuperar la forma sin banco', tag: 'Texto libre',
          intro: 'Escribe la forma completa según el contexto, sin opciones.', type: 'freeText', scene: 'Production contrôlée', text: spec.free.text, blanks: spec.free.blanks,
        },
        {
          id: 'level-5', title: 'Detectar y reparar errores', tag: 'Clínica de errores',
          intro: 'Elige la reparación correcta y explica qué señal revela el error.', type: 'choice',
          items: spec.errorChoices.map((item) => ({ scene: 'Révision', lines: [['', item.prompt]], options: item.options, answer: item.answer, explain: item.explain })),
        },
        {
          id: 'level-6', title: 'Producir con intención', tag: 'Producción',
          intro: 'Crea ejemplos nuevos y comprueba que la estructura siga siendo natural.', type: 'write',
          items: spec.writing.map((item, index) => ({ scene: `Mission ${index + 1}`, prompt: item.prompt, answer: item.answer, explain: item.explain })),
        },
      ],
    },
  }
}
