import type { Blank, ChoiceItem, DualItem, GrammarTopic, Level, WriteItem } from '../types'

export type ExpandedTopicSeed = Omit<GrammarTopic, 'practice'> & {
  practiceSeed: {
    choices: ChoiceItem[]
    duals: DualItem[]
    guided: { scene: string; text: string; blanks: Blank[] }
    free: { scene: string; text: string; blanks: Blank[] }
    writes: WriteItem[]
  }
}

export function buildExpandedTopic(seed: ExpandedTopicSeed): GrammarTopic {
  const { practiceSeed, ...topic } = seed
  return {
    ...topic,
    practice: {
      levels: [
        { id: 'level-1', title: 'Reconoce el matiz', tag: 'Opción múltiple', intro: 'Elige la forma que expresa exactamente la intención de la escena.', type: 'choice', items: practiceSeed.choices },
        { id: 'level-2', title: 'Conecta la estructura', tag: 'Dos decisiones', intro: 'Resuelve dos decisiones gramaticales dentro del mismo contexto.', type: 'dual', items: practiceSeed.duals },
        { id: 'level-3', title: 'Lee en contexto', tag: 'Texto guiado', intro: 'Reconstruye un mensaje breve sin perder el hilo comunicativo.', type: 'guidedText', ...practiceSeed.guided },
        { id: 'level-4', title: 'Recupera sin opciones', tag: 'Producción controlada', intro: 'Escribe la forma correcta sin banco de respuestas.', type: 'freeText', ...practiceSeed.free },
        { id: 'level-5', title: 'Produce con intención', tag: 'Escritura', intro: 'Construye frases completas y compara la intención, no solo la forma.', type: 'write', items: practiceSeed.writes },
        { id: 'level-6', title: 'Misión comunicativa', tag: 'Transferencia', intro: 'Adapta la estructura a una situación real de estudio, viaje o trabajo.', type: 'write', items: practiceSeed.writes.slice(-2).map((item) => ({ ...item, scene: `Misión · ${item.scene}`, prompt: `${item.prompt} Después crea una segunda versión con información propia.` })) },
      ],
    },
  }
}

export function ensureSixPracticeLevels(topic: GrammarTopic): GrammarTopic {
  const decisions = [...topic.guide.decisions]
  const decisionFallbacks = [
    `Identifica qué intención de «${topic.shortTitle}» necesita la situación.`,
    `Comprueba la conexión con la fórmula: ${topic.guide.formula}.`,
    `Contrasta el resultado con el error típico: ${topic.guide.mistakes[0]}`,
  ]
  for (const decision of decisionFallbacks) if (decisions.length < 3) decisions.push(decision)
  const seo = [...topic.seo]
  const seoFallbacks = [
    { heading: `¿Cuándo conviene usar ${topic.shortTitle}?`, paragraphs: [`Se usa cuando necesitas ${topic.guide.goal.toLowerCase()} La elección depende del contexto, la relación entre hablantes y el matiz que quieras conservar.`] },
    { heading: `¿Qué debe vigilar un hispanohablante con ${topic.shortTitle}?`, paragraphs: [`El error más común es trasladar literalmente una construcción española. Trabaja con el modelo japonés «${topic.guide.model}» y comprueba cada elemento con la fórmula «${topic.guide.formula}».`] },
    { heading: `¿Cómo se practica ${topic.shortTitle} en contexto?`, paragraphs: [`Empieza reconociendo el patrón, después recupera la forma sin opciones y termina creando una frase propia relacionada con ${topic.outcomes[0].toLowerCase()}.`] },
  ]
  for (const section of seoFallbacks) if (seo.length < 3) seo.push(section)
  const guide = { ...topic.guide, decisions }
  if (topic.practice.levels.length >= 6) return { ...topic, guide, seo }
  const scenes = topic.visual.scene.length >= 2 ? topic.visual.scene : [[topic.guide.formula, topic.guide.goal], [topic.guide.model, topic.description]]
  const first = scenes[0]
  const second = scenes[1] ?? scenes[0]
  const distractors = scenes.slice(1).map(([pattern]) => pattern)
  const generated: Level[] = [
    {
      id: 'expanded-choice', title: 'Reconoce el matiz', tag: 'Opción múltiple', intro: 'Relaciona intención y estructura antes de producirla.', type: 'choice',
      items: scenes.slice(0, 4).map(([pattern, meaning], index) => ({ scene: `Matiz ${index + 1}`, lines: [['Contexto', `${meaning}: ___`]], options: [pattern, ...distractors.filter((item) => item !== pattern).slice(0, 3)], answer: pattern, explain: `${pattern} comunica ${meaning}.` })),
    },
    {
      id: 'expanded-dual', title: 'Conecta dos decisiones', tag: 'Dos espacios', intro: 'Recupera dos patrones dentro de un mismo contexto.', type: 'dual',
      items: [{ scene: 'Contraste guiado', lines: [['Contexto', `${first[1]}: [[0]]. ${second[1]}: [[1]].`]], blanks: [{ options: [first[0], second[0]], answer: first[0], explain: first[1] }, { options: [second[0], first[0]], answer: second[0], explain: second[1] }] }],
    },
    {
      id: 'expanded-guided', title: 'Lee en contexto', tag: 'Texto guiado', intro: 'Completa un microtexto atendiendo a la intención.', type: 'guidedText', scene: 'Lectura breve', text: `${first[1]}: [[0]]. ${second[1]}: [[1]].`, blanks: [{ options: [first[0], second[0]], answer: first[0], explain: first[1] }, { options: [second[0], first[0]], answer: second[0], explain: second[1] }],
    },
    {
      id: 'expanded-free', title: 'Recupera sin opciones', tag: 'Producción controlada', intro: 'Escribe las estructuras sin apoyo.', type: 'freeText', scene: 'Recuperación', text: `${first[1]}: [[0]]. ${second[1]}: [[1]].`, blanks: [{ answer: first[0], explain: first[1] }, { answer: second[0], explain: second[1] }],
    },
    {
      id: 'expanded-write', title: 'Explica y produce', tag: 'Producción', intro: 'Expresa la regla con una frase completa.', type: 'write', items: topic.outcomes.slice(0, 3).map((outcome, index) => ({ scene: `Objetivo ${index + 1}`, prompt: `${outcome}. Escribe una frase que lo demuestre.`, answer: index === 0 ? topic.guide.model : scenes[index % scenes.length][0], explain: topic.guide.decisions[index % topic.guide.decisions.length] })),
    },
    {
      id: 'expanded-mission', title: 'Misión comunicativa', tag: 'Transferencia', intro: 'Lleva la estructura a una situación propia.', type: 'write', items: [{ scene: 'Situación real', prompt: `Crea un mensaje breve relacionado con «${topic.guide.goal}».`, answer: topic.guide.model, explain: `Comprueba la fórmula: ${topic.guide.formula}` }, { scene: 'Contraste', prompt: 'Crea una segunda versión cambiando el tono, el tiempo o el punto de vista.', answer: first[0], explain: topic.guide.mistakes[0] }],
    },
  ]
  const levels = [...topic.practice.levels]
  for (const level of generated) {
    if (levels.length >= 6) break
    if (!levels.some((item) => item.id === level.id)) levels.push(level)
  }
  return { ...topic, guide, seo, practice: { levels } }
}
