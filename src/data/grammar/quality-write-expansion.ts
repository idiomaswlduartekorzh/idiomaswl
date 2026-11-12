import type { GrammarTopic, WriteItem } from './types'

export type FoundationPracticeLocale = 'es' | 'it' | 'pt' | 'ru'

export function interactionCount(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}

function uniquePairs(rows: [string, string][]): [string, string][] {
  return Array.from(new Map(rows.map((row) => [row.join('\u241f'), row])).values())
}

function sourcePairs(topic: GrammarTopic): [string, string][] {
  const tablePairs = topic.guide.table.slice(1).map((row) => [row.at(-1) || row[0], `${row[0]} - ${row[1]}`] as [string, string])
  const pairs = uniquePairs([...topic.visual.scene, ...tablePairs])
  return pairs.length ? pairs : [[topic.guide.model, topic.guide.goal]]
}

function spanishItem(topic: GrammarTopic, index: number): WriteItem {
  const pairs = sourcePairs(topic)
  const [example, meaning] = pairs[index % pairs.length]
  const [secondExample, secondMeaning] = pairs[(index * 3 + 1) % pairs.length]
  const decision = topic.guide.decisions[index % topic.guide.decisions.length]
  const focus = (topic.visual.reviewFocus?.length ? topic.visual.reviewFocus : [topic.guide.formula])[index % (topic.visual.reviewFocus?.length || 1)]
  const mistake = topic.guide.mistakes[index % topic.guide.mistakes.length]
  const number = String(index + 1).padStart(2, '0')
  const modes = [
    {
      scene: `Reconstrucción ${number}: del significado a la forma`,
      prompt: `Sin copiar, reconstruye una oración que comunique «${meaning}». Después compárala con «${example}» y subraya la señal que controla la estructura.`,
      answer: `Modelo ${number}: ${example} La señal se justifica mediante ${topic.guide.formula}.`,
      explain: `La actividad parte del significado y obliga a recuperar la forma. Punto de control: ${focus}.`,
    },
    {
      scene: `Contraste mínimo ${number}: dos lecturas cercanas`,
      prompt: `Compara «${example}» con «${secondExample}». Explica qué cambia entre «${meaning}» y «${secondMeaning}» y escribe un tercer ejemplo que mantenga el primer patrón.`,
      answer: `Modelo ${number}: ${example} El contraste se decide así: ${decision}`,
      explain: `El contraste evita memorizar una frase aislada y hace visible la decisión gramatical: ${focus}.`,
    },
    {
      scene: `Transformación controlada ${number}`,
      prompt: `Toma «${example}» y cambia solamente una variable pertinente -persona, tiempo, cantidad o referente-. Ajusta todas las palabras dependientes y explica cada modificación.`,
      answer: `Punto de partida ${number}: ${example} Una versión válida conserva ${topic.guide.formula} y realiza todos los ajustes exigidos por el nuevo contexto.`,
      explain: `No hay una única respuesta. Se evalúa que la transformación respete esta decisión: ${decision}`,
    },
    {
      scene: `Diálogo breve ${number}: pregunta y respuesta`,
      prompt: `Crea un diálogo de tres turnos que prepare el contexto de «${example}». La respuesta debe resultar natural y el último turno debe retomar «${meaning}» sin repetir toda la frase.`,
      answer: `Núcleo del modelo ${number}: ${example} La réplica debe conservar una referencia clara y aplicar ${topic.guide.formula}.`,
      explain: `El diálogo comprueba forma y continuidad comunicativa. Foco de revisión: ${focus}.`,
    },
    {
      scene: `Clínica de errores ${number}`,
      prompt: `Analiza este error frecuente: «${mistake}». Reescribe una versión correcta dentro de dos oraciones conectadas y explica en qué paso se originó el problema.`,
      answer: `Modelo correcto ${number}: ${example} La reparación se apoya en esta decisión: ${decision}`,
      explain: `La corrección debe nombrar la causa, no solo sustituir una palabra. Comprueba ${topic.guide.formula}.`,
    },
    {
      scene: `Cohesión ${number}: unir dos ejemplos`,
      prompt: `Conecta «${example}» y «${secondExample}» en un microtexto coherente. Añade el conector necesario y evita referencias ambiguas.`,
      answer: `Base posible ${number}: ${example} ${secondExample} El enlace debe conservar «${meaning}» y «${secondMeaning}» sin alterar las formas objetivo.`,
      explain: `Se evalúan estructura, enlace y referencia. La comprobación central es ${focus}.`,
    },
    {
      scene: `Explicación docente ${number}`,
      prompt: `Explica ${topic.shortTitle} a otra persona usando «${example}». Incluye la fórmula, una decisión y una advertencia sobre un error frecuente.`,
      answer: `Guion modelo ${number}: ${topic.guide.formula}. Ejemplo: ${example}. Decisión: ${decision}`,
      explain: `Enseñar la regla obliga a relacionar forma, sentido y error. Advertencia útil: ${mistake}`,
    },
    {
      scene: `Registro y contexto ${number}`,
      prompt: `Sitúa «${example}» en un contexto concreto -mensaje, conversación, relato o explicación-. Indica qué parte conservarías y qué adaptarías para mantener «${meaning}».`,
      answer: `Referencia ${number}: ${example} Debe mantenerse la arquitectura ${topic.guide.formula}; el vocabulario puede adaptarse al contexto.`,
      explain: `Una respuesta sólida conserva la regla y ajusta el registro. Punto de control: ${focus}.`,
    },
    {
      scene: `Microtexto ${number}: principio, desarrollo y cierre`,
      prompt: `Escribe tres oraciones: presenta una situación, integra «${example}» o una variante válida y cierra con una consecuencia relacionada con «${meaning}».`,
      answer: `Modelo estructural ${number}: contexto + ${example} + consecuencia coherente. La oración central debe respetar ${topic.guide.formula}.`,
      explain: `La producción demuestra que la estructura funciona dentro de un texto, no como respuesta aislada. Revisa ${decision}`,
    },
    {
      scene: `Recuperación activa ${number}`,
      prompt: `Cubre la guía. Escribe de memoria la fórmula de ${topic.shortTitle}, recupera «${example}» y crea otro ejemplo con vocabulario distinto. Después verifica ambos.`,
      answer: `Comprobación ${number}: ${topic.guide.formula}. Ejemplo de referencia: ${example}`,
      explain: `La recuperación sin apoyo mide disponibilidad real. Si fallas, vuelve a esta decisión: ${decision}`,
    },
  ]
  const item = modes[index % modes.length]
  return {
    ...item,
    prompt: `Actividad ${number}. ${item.prompt}`,
    explain: `Retroalimentación ${number}. ${item.explain}`,
  }
}

function italianItem(topic: GrammarTopic, index: number): WriteItem {
  const base = spanishItem(topic, index)
  const pairs = sourcePairs(topic)
  const [example, meaning] = pairs[index % pairs.length]
  const [second] = pairs[(index * 3 + 1) % pairs.length]
  const decision = topic.guide.decisions[index % topic.guide.decisions.length]
  const focus = (topic.visual.reviewFocus?.length ? topic.visual.reviewFocus : [topic.guide.formula])[index % (topic.visual.reviewFocus?.length || 1)]
  const n = String(index + 1).padStart(2, '0')
  const prompts = [
    `Ricostruisci senza copiare una frase che comunichi «${meaning}», poi confrontala con «${example}».`,
    `Confronta «${example}» e «${second}»; spiega la differenza e crea un terzo esempio coerente.`,
    `Trasforma «${example}» cambiando una sola variabile e adegua tutti gli elementi dipendenti.`,
    `Crea un dialogo di tre battute che renda naturale «${example}» e riprenda il referente nell'ultima battuta.`,
    `Correggi un errore plausibile relativo a ${topic.shortTitle} e inserisci la versione corretta in due frasi collegate.`,
    `Unisci «${example}» e «${second}» in un microtesto con un connettivo adeguato.`,
    `Spiega ${topic.shortTitle} a un compagno usando «${example}», la formula e una decisione.`,
    `Adatta «${example}» a un contesto preciso e giustifica ciò che deve rimanere invariato.`,
    `Scrivi tre frasi: contesto, applicazione di ${topic.shortTitle} e conseguenza coerente.`,
    `Senza guardare, recupera la formula, «${example}» e un nuovo esempio con lessico diverso.`,
  ]
  return {
    ...base,
    scene: `Trasferimento ragionato ${n} - ${focus}`,
    prompt: `Attività ${n}. ${prompts[index % prompts.length]}`,
    answer: `Modello ${n}: ${example} La risposta conserva ${topic.guide.formula}.`,
    explain: `Controllo ${n}: ${decision} La forma deve restare coerente con «${meaning}».`,
  }
}

function portugueseItem(topic: GrammarTopic, index: number): WriteItem {
  const base = spanishItem(topic, index)
  const pairs = sourcePairs(topic)
  const [example, meaning] = pairs[index % pairs.length]
  const [second] = pairs[(index * 3 + 1) % pairs.length]
  const decision = topic.guide.decisions[index % topic.guide.decisions.length]
  const focus = (topic.visual.reviewFocus?.length ? topic.visual.reviewFocus : [topic.guide.formula])[index % (topic.visual.reviewFocus?.length || 1)]
  const n = String(index + 1).padStart(2, '0')
  const prompts = [
    `Reconstrua sem copiar uma frase que comunique «${meaning}» e compare-a com «${example}».`,
    `Compare «${example}» e «${second}»; explique a diferença e crie um terceiro exemplo coerente.`,
    `Transforme «${example}» mudando apenas uma variável e ajuste todos os elementos dependentes.`,
    `Crie um diálogo de três falas que torne «${example}» natural e retome o referente no final.`,
    `Corrija um erro plausível de ${topic.shortTitle} e use a versão reparada em duas frases conectadas.`,
    `Una «${example}» e «${second}» em um microtexto com um conector adequado.`,
    `Explique ${topic.shortTitle} a outra pessoa usando «${example}», a fórmula e uma decisão.`,
    `Adapte «${example}» a um contexto específico e justifique o que deve permanecer estável.`,
    `Escreva três frases: contexto, uso de ${topic.shortTitle} e uma consequência coerente.`,
    `Sem consultar a guia, recupere a fórmula, «${example}» e um novo exemplo com outro vocabulário.`,
  ]
  return {
    ...base,
    scene: `Transferência fundamentada ${n} - ${focus}`,
    prompt: `Atividade ${n}. ${prompts[index % prompts.length]}`,
    answer: `Modelo ${n}: ${example} A resposta mantém ${topic.guide.formula}.`,
    explain: `Verificação ${n}: ${decision} A forma deve continuar compatível com «${meaning}».`,
  }
}

function russianItem(topic: GrammarTopic, index: number): WriteItem {
  const base = spanishItem(topic, index)
  const pairs = sourcePairs(topic)
  const [example, meaning] = pairs[index % pairs.length]
  const [second] = pairs[(index * 3 + 1) % pairs.length]
  const decision = topic.guide.decisions[index % topic.guide.decisions.length]
  const focus = (topic.visual.reviewFocus?.length ? topic.visual.reviewFocus : [topic.guide.formula])[index % (topic.visual.reviewFocus?.length || 1)]
  const n = String(index + 1).padStart(2, '0')
  const prompts = [
    `Не копируя, восстановите фразу со значением «${meaning}» и сравните её с «${example}».`,
    `Сопоставьте «${example}» и «${second}», объясните различие и создайте третий пример.`,
    `Измените в «${example}» только одно условие и согласуйте все зависимые элементы.`,
    `Создайте диалог из трёх реплик, в котором «${example}» звучит естественно.`,
    `Исправьте правдоподобную ошибку по теме «${topic.shortTitle}» и используйте исправление в связном контексте.`,
    `Свяжите «${example}» и «${second}» в микротекст с подходящим союзом.`,
    `Объясните тему «${topic.shortTitle}» другому ученику через «${example}», формулу и одно решение.`,
    `Перенесите «${example}» в конкретный регистр или ситуацию и обоснуйте неизменяемую часть.`,
    `Напишите три предложения: контекст, целевая структура и логичное следствие.`,
    `Не глядя в конспект, восстановите формулу, «${example}» и новый пример с другой лексикой.`,
  ]
  return {
    ...base,
    scene: `Осмысленный перенос ${n} - ${focus}`,
    prompt: `Задание ${n}. ${prompts[index % prompts.length]}`,
    answer: `Модель ${n}: ${example} Ответ сохраняет схему ${topic.guide.formula}.`,
    explain: `Проверка ${n}: ${decision} Форма должна соответствовать значению «${meaning}».`,
  }
}

function makeItem(topic: GrammarTopic, index: number, locale: FoundationPracticeLocale): WriteItem {
  if (locale === 'it') return italianItem(topic, index)
  if (locale === 'pt') return portugueseItem(topic, index)
  if (locale === 'ru') return russianItem(topic, index)
  return spanishItem(topic, index)
}

export function expandFoundationWriting(topic: GrammarTopic, target: number, locale: FoundationPracticeLocale = 'es'): void {
  const writingLevels = topic.practice.levels.filter((level) => level.type === 'write')
  if (!writingLevels.length) return
  let replacementIndex = writingLevels.reduce((sum, level) => sum + level.items.length, 0)
  for (const writing of writingLevels) {
    const seenPrompt = new Set<string>()
    const seenAnswer = new Set<string>()
    const seenExplain = new Set<string>()
    writing.items = writing.items.map((item) => {
      const prompt = item.prompt.trim()
      const answer = item.answer.trim()
      const explain = item.explain.trim()
      const repeated = !prompt || !answer || !explain || seenPrompt.has(prompt) || seenAnswer.has(answer) || seenExplain.has(explain)
      const next = repeated ? makeItem(topic, replacementIndex++, locale) : item
      seenPrompt.add(next.prompt.trim())
      seenAnswer.add(next.answer.trim())
      seenExplain.add(next.explain.trim())
      return next
    })
  }
  const writing = writingLevels.at(-1)
  if (!writing) return
  let index = replacementIndex
  while (interactionCount(topic) < target) {
    writing.items.push(makeItem(topic, index, locale))
    index += 1
  }
}
