export type Locale = 'es' | 'en'

export type WordCue = {
  category: Record<Locale, string>
  word: string
}

export type B1Exercise = {
  title: Record<Locale, string>
  question: string
  followUp: string
  focus: Record<Locale, string>
  cues: WordCue[]
}

export const B1_EXERCISES: B1Exercise[] = [
  {
    title: { es: 'Un ayer inesperado', en: 'An unexpected yesterday' },
    question: "You had an appointment yesterday, but heavy traffic blocked your route. What happened next?",
    followUp: 'How did you feel when your plans changed?',
    focus: { es: 'Cuenta una secuencia en pasado y explica cómo reaccionaste.', en: 'Tell a sequence of past events and explain how you reacted.' },
    cues: [
      { category: { es: 'Sustantivo', en: 'Noun' }, word: 'appointment' },
      { category: { es: 'Problema', en: 'Problem' }, word: 'traffic' },
      { category: { es: 'Contraste', en: 'Contrast' }, word: 'although' },
      { category: { es: 'Persona', en: 'Person' }, word: 'neighbor' },
      { category: { es: 'Adverbio', en: 'Adverb' }, word: 'suddenly' },
      { category: { es: 'Emoción', en: 'Emotion' }, word: 'relieved' },
    ],
  },
  {
    title: { es: 'Una decisión difícil', en: 'A difficult decision' },
    question: 'You can accept a job in another city or stay near your family. Which option would you choose, and why?',
    followUp: 'Whose advice would you ask for before deciding?',
    focus: { es: 'Explica dos opciones, justifica tu decisión y considera una alternativa.', en: 'Explain two options, justify your choice, and consider an alternative.' },
    cues: [
      { category: { es: 'Posibilidad', en: 'Possibility' }, word: 'opportunity' },
      { category: { es: 'Ayuda', en: 'Help' }, word: 'advice' },
      { category: { es: 'Alternativa', en: 'Alternative' }, word: 'instead' },
      { category: { es: 'Emoción', en: 'Emotion' }, word: 'concerned' },
      { category: { es: 'Secuencia', en: 'Sequence' }, word: 'eventually' },
      { category: { es: 'Reflexión', en: 'Reflection' }, word: 'regret' },
    ],
  },
  {
    title: { es: 'Un viaje con imprevistos', en: 'A trip with surprises' },
    question: 'Your train is delayed and you miss a hotel reservation. How would you save the trip?',
    followUp: 'Who could help you find a solution?',
    focus: { es: 'Describe un problema realista y cómo encontraste una solución.', en: 'Describe a realistic problem and how you found a solution.' },
    cues: [
      { category: { es: 'Plan', en: 'Plan' }, word: 'reservation' },
      { category: { es: 'Problema', en: 'Problem' }, word: 'delayed' },
      { category: { es: 'Contraste', en: 'Contrast' }, word: 'despite' },
      { category: { es: 'Persona', en: 'Person' }, word: 'stranger' },
      { category: { es: 'Adverbio', en: 'Adverb' }, word: 'fortunately' },
      { category: { es: 'Resultado', en: 'Result' }, word: 'solution' },
    ],
  },
  {
    title: { es: 'Dos puntos de vista', en: 'Two points of view' },
    question: 'A friend thinks your neighbor was rude, but you think it was a misunderstanding. How would you discuss it with them?',
    followUp: 'What could each of you say to reach an agreement?',
    focus: { es: 'Reconoce otra perspectiva y explica cómo podrían llegar a un acuerdo.', en: 'Acknowledge another perspective and explain how you could reach an agreement.' },
    cues: [
      { category: { es: 'Opinión', en: 'Opinion' }, word: 'viewpoint' },
      { category: { es: 'Contraste', en: 'Contrast' }, word: 'however' },
      { category: { es: 'Adjetivo', en: 'Adjective' }, word: 'fair' },
      { category: { es: 'Conflicto', en: 'Conflict' }, word: 'misunderstanding' },
      { category: { es: 'Acuerdo', en: 'Agreement' }, word: 'compromise' },
      { category: { es: 'Acción', en: 'Action' }, word: 'apologize' },
    ],
  },
  {
    title: { es: 'Mi comunidad, mejor', en: 'A better community' },
    question: 'Your neighborhood has no safe place for young people to meet. What affordable change would you propose?',
    followUp: 'Who would benefit from your idea, and why?',
    focus: { es: 'Presenta una propuesta, una condición y una consecuencia.', en: 'Present a proposal, a condition, and a consequence.' },
    cues: [
      { category: { es: 'Lugar', en: 'Place' }, word: 'neighborhood' },
      { category: { es: 'Adjetivo', en: 'Adjective' }, word: 'affordable' },
      { category: { es: 'Condición', en: 'Condition' }, word: 'unless' },
      { category: { es: 'Acción', en: 'Action' }, word: 'improve' },
      { category: { es: 'Personas', en: 'People' }, word: 'community' },
      { category: { es: 'Consecuencia', en: 'Consequence' }, word: 'as a result' },
    ],
  },
]
