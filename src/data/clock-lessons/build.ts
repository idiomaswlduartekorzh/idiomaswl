import type { ClockConversation, ClockExample, ClockTime, GrammarTopic, Level } from '../grammar/types'
import { clockLanguages, type AdditionalClockLanguage } from './catalog'
import type { ClockCopy, TimeReading } from './types'

const demonstration = [
  ['03:00', 'las tres en punto', 'Señala el 3. Acaban de empezar las tres.', 'Señala el 12. Han pasado cero minutos.'],
  ['03:05', 'las tres y cinco', 'Apenas ha pasado del 3.', 'Del 12 al 1 ha recorrido cinco minutos.'],
  ['03:15', 'las tres y cuarto', 'Ha recorrido un cuarto del camino entre el 3 y el 4.', 'Señala el 3. Tres saltos de cinco minutos suman quince.'],
  ['03:30', 'las tres y media', 'Está a medio camino entre el 3 y el 4.', 'Apunta al 6. Media vuelta son treinta minutos.'],
  ['03:45', 'las cuatro menos cuarto', 'Se acerca al 4. Todavía son las tres.', 'Apunta al 9. Faltan quince minutos para la vuelta completa.'],
  ['03:55', 'las cuatro menos cinco', 'Está casi en el 4.', 'Apunta al 11. Le faltan cinco minutos para volver al 12.'],
]

function hands(time: string): ClockTime {
  const [hour, minute] = time.split(':').map(Number)
  return { hour, minute }
}

const scenes = [
  ['Durante el desayuno', 'desayuno', 'Una mano deja una taza junto al pan del desayuno.', 'Miras el reloj de la cocina antes de salir.', '06:30', '¿Qué hora es?', 'Son las seis y media.'],
  ['En el andén', 'estacion', 'Una viajera sostiene un billete frente a un tren.', 'Tu billete marca las 14:10. Confirmas la hora de salida.', '14:10', '¿A qué hora sale el tren?', 'Sale a las dos y diez de la tarde.'],
  ['Un café con una amiga', 'cita', 'Dos personas se saludan junto a la mesa de un café.', 'La cita es a las nueve. Miras el reloj cuando aún faltan quince minutos.', '08:45', '¿Qué hora es?', 'Son las nueve menos cuarto.'],
]
function conversations(copy: ClockCopy): ClockConversation[] {
  function exchange(index: number, time: string, questionEs: string, defaultAnswerEs: string) {
    const [question, answer, questionReading, answerReading, answerEs = defaultAnswerEs] = copy.dialogs[index]
    return { time, question, answer, questionEs, answerEs, questionReading, answerReading }
  }
  return scenes.map(([title, image, alt, setting, time, questionEs, answerEs], index) => ({
    title, image, alt, setting, exchanges: index === 2
      ? [exchange(index, time, questionEs, answerEs), exchange(3, '09:00', '¿A qué hora nos vemos?', 'A las nueve.')]
      : [exchange(index, time, questionEs, answerEs)],
  }))
}

function practice(language: AdditionalClockLanguage, copy: ClockCopy, byTime: (time: string) => TimeReading): Level[] {
  const seen = ['03:00', '03:05', '03:15', '03:30', '03:45', '03:55', '06:30', '08:45']
  const listen = ['01:00', '02:15', '04:30', '05:45', '07:05', '09:00', '12:00', '00:00']
  const read = ['07:05', '04:30', '01:00', '02:15', '05:45', '09:00', '08:45']
  const digital = ['03:15', '05:45', '04:30', '07:05', '14:10', '00:00']
  const selection = (pool: string[], i: number) => [0, 1, 3, 5].map(offset => pool[(i + offset) % pool.length])

  return [
    { id: 'l1', type: 'choice', title: 'Lee las agujas', tag: 'Relojes', intro: 'Mira el reloj y elige la frase que dice esa hora.',
      items: seen.map((time, i) => ({ scene: `Reloj ${i+1}`, clock: hands(time), lines: [['', copy.question]],
        options: selection(seen, i).map(t => byTime(t)[1]), answer: byTime(time)[1], explain: `${time} · ${byTime(time)[1]} ${copy.notes[demonstration.findIndex(row => row[0] === time)] ?? ''}`.trim() })) },
    { id: 'l2', type: 'choice', title: 'Pasa de palabras a cifras', tag: 'Comprensión', intro: 'Lee la frase. Escoge la hora que le corresponde en la pantalla.',
      items: listen.map((time, i) => ({ scene: `Mensaje ${i+1}`, lines: [['', byTime(time)[1]]],
        options: selection(listen, i), answer: time, explain: `${byTime(time)[1]} corresponde a ${time}.` })) },
    { id: 'l3', type: 'guidedText', title: 'Completa las conversaciones', tag: 'Palabras en contexto', scene: 'Seis intercambios',
      intro: 'Elige la palabra que encaja en cada hueco.', text: copy.gaps.map(([line], i) => line.replace('___', `[[${i}]]`)).join('\n\n'),
      blanks: copy.gaps.map(([, answer, b, c, explain]) => ({ answer, options: [answer,b,c], explain })) },
    { id: 'l4', type: 'freeText', title: 'Anota la hora', tag: 'Respuesta breve', scene: 'Tu agenda',
      intro: 'Lee en el idioma que practicas y escribe la hora en cifras. Usa el formato 03:15.',
      text: digital.map((time, i) => `${byTime(time)[1]} → [[${i}]]`).join('\n\n'),
      blanks: digital.map(time => ({ clockLanguage: language, answer: time, accepted: [time.replace(/^0(?=\d)/, '')], explain: `${time} · ${byTime(time)[1]}` })) },
    { id: 'l5', type: 'write', title: 'Di la hora que ves', tag: 'Reloj y escritura',
      intro: byTime(read[0])[3] ? 'Responde en la escritura del idioma o con la lectura en letras latinas que viste en los ejemplos.' : 'Escribe la hora en palabras, como responderías a la pregunta del reloj.',
      items: read.map((time, i) => { const [,answer,alternatives,reading] = byTime(time)
        const accepted = reading ? [...alternatives, reading] : alternatives
        return { clockLanguage: language, scene: `Reloj ${i+1}`, clock: hands(time), prompt: copy.question, answer, accepted, strict: true, explain: `${time} · ${answer}` } }) },
    { id: 'l6', type: 'write', title: 'Llega a tiempo', tag: 'Situaciones', intro: 'Completa cada intercambio siguiendo la pista. Escribe solo la parte que falta.',
      items: copy.situations.map(([prompt, answer, accepted, explain], i) => ({ clockLanguage: language, scene: `Situación ${i+1}`, prompt, answer, accepted, explain, strict: true })) },
  ]
}

export function buildClockTopic(language: AdditionalClockLanguage, copy: ClockCopy): GrammarTopic {
  const name = clockLanguages[language].name.toLowerCase()
  const index = new Map(copy.readings.map(row => [row[0], row]))
  function byTime(time: string) {
    const reading = index.get(time)
    if (!reading) throw new Error(`Falta la lectura de ${time} en ${language}`)
    return reading
  }
  const clocks: ClockExample[] = demonstration.map(([digital,meaning,hourHint,minuteHint], i) => {
    const [, spoken, , pronunciation] = byTime(digital)
    return { ...hands(digital), digital, spoken, sentence: spoken, pronunciation, meaning, hourHint, minuteHint, note: copy.notes[i] }
  })
  const clockTips = copy.tips.map(([cue,example,explanation], i) => ({
    cue, example, explanation, comparison: i === 0 ? copy.compare.map(time => ({ ...hands(time), digital: time, spoken: byTime(time)[1] })) : undefined,
  }))
  return {
    slug: 'la-hora', order: 'A1', color: '#936623', category: 'La hora', level: 'A1', title: `La hora en ${name}`, shortTitle: clockLanguages[language].title,
    metaTitle: `La hora en ${name} A1 | WeLearn`, description: copy.lead, lead: copy.lead,
    outcomes: ['Leer las dos agujas', 'Preguntar la hora y entender la respuesta', 'Acordar una hora para una cita'],
    guide: { goal: copy.lead, model: byTime('03:30')[1], formula: copy.rule, decisions: copy.notes,
      table: [['Hora', 'En palabras', 'En español'], ...clocks.map((c): [string,string,string] => [c.digital,c.spoken,c.meaning])], mistakes: clockTips.map(t=>t.explanation), clockTips },
    seo: [
      { heading: 'Lee la hora con las dos agujas', clockReading: true, paragraphs: ['La aguja corta marca la hora. La larga cuenta minutos desde el 12. Cada número que recorre vale cinco minutos. Elige una hora y fíjate en lo que cambia.', copy.rule] },
      { heading: 'La hora en tres conversaciones', clockConversations: conversations(copy), paragraphs: ['En casa quieres saber qué hora es. En la estación necesitas saber a qué hora sale el tren. Lee las dos preguntas y luego practica ambas en el café.'] },
      { heading: 'Vocabulario para hablar de la hora', paragraphs: [copy.rule], table: [['Palabra o expresión','Significado','Ejemplo'], ...copy.vocabulary] },
      { heading: 'Más horas para leer en voz alta', paragraphs: ['Lee la frase, convierte las palabras en cifras y comprueba tu respuesta con la primera columna.'], table: [['Hora','Cómo se dice','Otra forma o lectura'], ...copy.readings.slice(6).map(([time,model,other,reading])=>[time,model,reading ?? other[0] ?? '—'])] },
    ],
    visual: { mode: 'clock', teacherLens: copy.rule, graphicPrompt: 'Reloj analógico con dos agujas.', scene: clocks.map(c=>[c.digital,c.spoken]), clocks, learnerModes: ['leer', 'escoger', 'escribir'], reviewFocus: copy.notes },
    practice: { levels: practice(language, copy, byTime) },
  }
}
