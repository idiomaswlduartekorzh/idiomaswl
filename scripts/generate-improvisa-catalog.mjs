/** Build the speaking prompts from the published vocabulary sets, without editing them. */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const languages = ['ingles', 'frances', 'aleman', 'italiano', 'portugues', 'ruso', 'japones', 'coreano']
const levels = ['a1', 'a2', 'b1']
const keys = { ingles: 'en', frances: 'fr', aleman: 'de', italiano: 'it', portugues: 'pt', ruso: 'ru', japones: 'ja', coreano: 'ko' }
const targetNames = { ingles: 'name', frances: 'nameFr', aleman: 'nameDe', italiano: 'nameIt', portugues: 'namePt', ruso: 'nameRu', japones: 'nameJa', coreano: 'nameKo' }
const spanishNames = { ingles: 'nameEs', frances: 'name', aleman: 'name', italiano: 'name', portugues: 'name', ruso: 'name', japones: 'nameEs', coreano: 'nameEs' }
const englishTopics = {
  'Yo y mi gente': 'Me and my people',
  'Números, hora y calendario': 'Numbers, time and dates',
  'Casa y objetos cotidianos': 'Home and everyday objects',
  'Comida y bebida': 'Food and drink',
  'Ropa, colores y describir': 'Clothes and colors',
  'Ciudad, lugares y direcciones': 'Places and directions',
  'Rutina diaria y acciones': 'Daily routines',
  'Cuerpo, salud y sensaciones': 'Body and feelings',
  'Estudio, trabajo y dinero': 'Study, work and money',
  'Cortesía y supervivencia': 'Polite everyday words',
  'Casa, barrio y convivencia': 'Home and neighborhood',
  'Comer fuera y restaurante': 'Eating out',
  'Trabajo y empleo': 'Work and jobs',
  'Tecnología y comunicación': 'Technology and communication',
  'Ocio, planes y tiempo libre': 'Free time and plans',
  'Describir personas y carácter': 'People and personality',
  'Compras, dinero y trámites': 'Shopping and money',
  'Viajes y transporte': 'Travel and transport',
  'Clima, naturaleza y entorno': 'Weather and nature',
  'Salud y consulta médica': 'Health and medical visits',
}

const prompts = {
  ingles: {
    a1: ['What do you know about this topic?', 'What is important to you here?', 'What can you describe here?', 'Which things can you name here, and where do you see them?'],
    a2: ['Tell me about a time this came up. What happened?', 'What would you plan in this situation, and why?', 'Compare two experiences. What was different?'],
    b1: ['What challenge do you see here, and how would you solve it?', 'How has your opinion about this topic changed?', 'What could be improved, and who would benefit?'],
  },
  frances: {
    a1: ['Que sais-tu de ce sujet ?', 'Qu’est-ce qui est important pour toi ici ?', 'Qu’est-ce que tu peux décrire ici ?', 'Quelles choses peux-tu nommer ici, et où les vois-tu ?'],
    a2: ['Raconte une fois où tu as rencontré ce sujet. Que s’est-il passé ?', 'Que prévoirais-tu dans cette situation, et pourquoi ?', 'Compare deux expériences. Qu’est-ce qui était différent ?'],
    b1: ['Quel défi vois-tu ici et comment le résoudrais-tu ?', 'Comment ton opinion sur ce sujet a-t-elle changé ?', 'Qu’est-ce qu’on pourrait améliorer et à qui cela profiterait-il ?'],
  },
  aleman: {
    a1: ['Was weißt du über dieses Thema?', 'Was ist dir hier wichtig?', 'Was kannst du hier beschreiben?', 'Welche Dinge kannst du hier nennen und wo siehst du sie?'],
    a2: ['Erzähle von einer Erfahrung zu diesem Thema. Was ist passiert?', 'Was würdest du in dieser Situation planen und warum?', 'Vergleiche zwei Erfahrungen. Was war anders?'],
    b1: ['Welche Herausforderung siehst du hier und wie würdest du sie lösen?', 'Wie hat sich deine Meinung zu diesem Thema verändert?', 'Was könnte man verbessern und wem würde es helfen?'],
  },
  italiano: {
    a1: ['Che cosa sai di questo argomento?', 'Che cosa è importante per te qui?', 'Che cosa puoi descrivere qui?', 'Quali cose puoi nominare qui e dove le vedi?'],
    a2: ['Racconta un’esperienza legata a questo argomento. Che cosa è successo?', 'Che cosa organizzeresti in questa situazione e perché?', 'Confronta due esperienze. Che cosa era diverso?'],
    b1: ['Quale difficoltà vedi qui e come la risolveresti?', 'Come è cambiata la tua opinione su questo argomento?', 'Che cosa si potrebbe migliorare e chi ne trarrebbe beneficio?'],
  },
  portugues: {
    a1: ['O que você sabe sobre este tema?', 'O que é importante para você aqui?', 'O que você pode descrever aqui?', 'Que coisas você pode nomear aqui e onde as vê?'],
    a2: ['Conte uma experiência com este tema. O que aconteceu?', 'O que você planejaria nessa situação e por quê?', 'Compare duas experiências. O que foi diferente?'],
    b1: ['Que desafio você vê aqui e como o resolveria?', 'Como sua opinião sobre este tema mudou?', 'O que poderia ser melhorado e quem se beneficiaria?'],
  },
  ruso: {
    a1: ['Что ты знаешь об этой теме?', 'Что здесь важно для тебя?', 'Что ты можешь здесь описать?', 'Какие вещи ты можешь здесь назвать и где ты их видишь?'],
    a2: ['Расскажи о случае, связанном с этой темой. Что произошло?', 'Что бы ты запланировал в такой ситуации и почему?', 'Сравни два случая. Что было по-другому?'],
    b1: ['Какую проблему ты здесь видишь и как бы её решил?', 'Как изменилось твоё мнение об этой теме?', 'Что можно было бы улучшить и кому это помогло бы?'],
  },
  japones: {
    a1: ['このテーマについて何を知っていますか。', 'ここであなたにとって大切なことは何ですか。', 'ここで何を説明できますか。', 'ここで何を言えますか。それをどこで見ますか。'],
    a2: ['このテーマに関する経験を話してください。何がありましたか。', 'この場合、どんな計画を立てますか。なぜですか。', '二つの経験を比べてください。何が違いましたか。'],
    b1: ['ここにはどんな課題がありますか。どう解決しますか。', 'このテーマについての考えはどう変わりましたか。', '何を改善できると思いますか。誰のためになりますか。'],
  },
  coreano: {
    a1: ['이 주제에 대해 무엇을 알고 있나요?', '여기서 무엇이 중요하다고 생각하나요?', '여기서 무엇을 설명할 수 있나요?', '여기서 무엇을 말할 수 있나요? 어디에서 볼 수 있나요?'],
    a2: ['이 주제와 관련된 경험을 이야기해 보세요. 무슨 일이 있었나요?', '이 상황에서 어떤 계획을 세우겠어요? 왜요?', '두 가지 경험을 비교해 보세요. 무엇이 달랐나요?'],
    b1: ['여기서 어떤 문제를 볼 수 있나요? 어떻게 해결하겠어요?', '이 주제에 대한 생각이 어떻게 바뀌었나요?', '무엇을 개선할 수 있을까요? 누구에게 도움이 될까요?'],
  },
}
const followUps = {
  a1: { es: 'Di al menos dos frases sencillas y añade las palabras que aparezcan.', target: 'Add a simple detail and keep speaking.' },
  a2: { es: 'Añade cuándo ocurrió, cómo te sentiste y qué pasó después.', target: 'Add a detail about time, feelings, and what happened next.' },
  b1: { es: 'Explica una causa, considera otra perspectiva y termina con una conclusión.', target: 'Explain a reason, consider another view, and finish with a conclusion.' },
}
const targetFollowUps = {
  ingles: [followUps.a1.target, followUps.a2.target, followUps.b1.target],
  frances: ['Ajoute un détail simple et continue à parler.', 'Ajoute un détail sur le moment, tes sentiments et la suite.', 'Explique une raison, considère un autre point de vue et conclus.'],
  aleman: ['Füge ein einfaches Detail hinzu und sprich weiter.', 'Ergänze die Zeit, deine Gefühle und was danach passierte.', 'Nenne einen Grund, betrachte eine andere Sichtweise und schließe ab.'],
  italiano: ['Aggiungi un dettaglio semplice e continua a parlare.', 'Aggiungi quando è successo, come ti sei sentito e cosa è accaduto dopo.', 'Spiega una ragione, considera un altro punto di vista e concludi.'],
  portugues: ['Acrescente um detalhe simples e continue falando.', 'Diga quando aconteceu, como você se sentiu e o que veio depois.', 'Explique uma razão, considere outro ponto de vista e conclua.'],
  ruso: ['Добавь простую деталь и продолжай говорить.', 'Добавь, когда это было, что ты почувствовал и что случилось потом.', 'Объясни причину, учти другую точку зрения и сделай вывод.'],
  japones: ['簡単なことを一つ加えて、話し続けてください。', 'いつ、どう感じたか、その後どうなったかを加えてください。', '理由を説明し、別の見方にも触れて、結論を述べてください。'],
  coreano: ['간단한 내용을 하나 더 말하고 계속 이야기해 보세요.', '언제였는지, 어떻게 느꼈는지, 그다음에 무슨 일이 있었는지 말해 보세요.', '이유를 설명하고 다른 관점도 생각한 뒤 결론을 말해 보세요.'],
}
const modeNamesEs = {
  a1: ['Lo que conozco', 'Lo importante', 'Lo que veo', 'Mis ejemplos'],
  a2: ['Mi experiencia', 'Mi plan', 'Dos situaciones'],
  b1: ['Un desafío', 'Mi opinión', 'Una propuesta'],
}
const modeNames = {
  ingles: { a1: ['What I know', 'What matters', 'What I see', 'My examples'], a2: ['My experience', 'My plan', 'Two situations'], b1: ['A challenge', 'My opinion', 'A proposal'] },
  frances: { a1: ['Ce que je sais', 'Ce qui compte', 'Ce que je vois', 'Mes exemples'], a2: ['Mon expérience', 'Mon projet', 'Deux situations'], b1: ['Un défi', 'Mon opinion', 'Une proposition'] },
  aleman: { a1: ['Was ich weiß', 'Was wichtig ist', 'Was ich sehe', 'Meine Beispiele'], a2: ['Meine Erfahrung', 'Mein Plan', 'Zwei Situationen'], b1: ['Eine Herausforderung', 'Meine Meinung', 'Ein Vorschlag'] },
  italiano: { a1: ['Quello che so', 'Ciò che conta', 'Quello che vedo', 'I miei esempi'], a2: ['La mia esperienza', 'Il mio piano', 'Due situazioni'], b1: ['Una sfida', 'La mia opinione', 'Una proposta'] },
  portugues: { a1: ['O que sei', 'O que importa', 'O que vejo', 'Meus exemplos'], a2: ['Minha experiência', 'Meu plano', 'Duas situações'], b1: ['Um desafio', 'Minha opinião', 'Uma proposta'] },
  ruso: { a1: ['Что я знаю', 'Что важно', 'Что я вижу', 'Мои примеры'], a2: ['Мой опыт', 'Мой план', 'Две ситуации'], b1: ['Проблема', 'Моё мнение', 'Предложение'] },
  japones: { a1: ['知っていること', '大切なこと', '見えること', '私の例'], a2: ['私の経験', '私の計画', '二つの場面'], b1: ['課題', '私の意見', '提案'] },
  coreano: { a1: ['내가 아는 것', '중요한 것', '내가 보는 것', '나의 예'], a2: ['나의 경험', '나의 계획', '두 상황'], b1: ['과제', '나의 의견', '제안'] },
}

function parse(file) {
  return ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
}
function literal(node) {
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined
}
function prop(object, key) {
  if (!object || !ts.isObjectLiteralExpression(object)) return undefined
  return object.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText() === key)?.initializer
}
function readSets(language, level) {
  const file = path.join('src/app/(site)/practica', language, level, 'vocabulario/Content.tsx')
  const ast = parse(file)
  let expression
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'SETS' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) expression = node.initializer
    ts.forEachChild(node, visit)
  }
  visit(ast)
  if (!expression) throw Error(`Missing SETS: ${language}/${level}`)
  return expression.elements.map((set) => {
    const wordArray = prop(set, 'words')
    const nameEs = literal(prop(set, level === 'a1' ? spanishNames[language] : (['ruso', 'japones', 'coreano'].includes(language) ? 'name' : spanishNames[language])))
    const nameTarget = literal(prop(set, targetNames[language])) || literal(prop(set, 'name'))
    const words = wordArray.elements.map((word) => ({
      target: literal(prop(word, level === 'b1' ? keys[language] : 'word')),
      es: literal(prop(word, 'es')),
    })).filter((item) => item.target && item.es)
    if (!nameEs || !nameTarget || words.length < 6) throw Error(`Incomplete set: ${language}/${level}/${nameEs}`)
    return { nameEs, nameTarget, words }
  })
}
function readEnglishLevel(level) {
  const file = `src/data/practica/vocabulario/ingles-${level}.ts`
  const ast = parse(file)
  const variables = new Map()
  let blocks
  function visit(node) {
    if (ts.isVariableDeclaration(node)) {
      if (node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
        const words = node.initializer.elements.filter((element) => ts.isCallExpression(element) && element.expression.getText(ast) === 'en')
          .map((call) => ({ target: literal(call.arguments[1]), es: literal(call.arguments[2]) }))
          .filter((item) => item.target && item.es)
        if (words.length) variables.set(node.name.getText(ast), words)
      }
      if (node.name.getText(ast) === `INGLES_${level.toUpperCase()}`) blocks = prop(node.initializer, 'bloques')
    }
    ts.forEachChild(node, visit)
  }
  visit(ast)
  if (!blocks || !ts.isArrayLiteralExpression(blocks)) throw Error(`Missing English ${level} blocks`)
  return blocks.elements.map((block) => {
    const entries = prop(block, 'entradas')
    const words = ts.isArrayLiteralExpression(entries)
      ? entries.elements.flatMap((element) => ts.isSpreadElement(element) ? variables.get(element.expression.getText(ast)) || [] : [])
      : []
    const nameEs = literal(prop(block, 'nombre'))
    if (!nameEs) throw Error(`Incomplete English ${level} block`)
    return { nameEs, nameTarget: englishTopics[nameEs] || nameEs, words }
  }).filter((set) => set.words.length >= 6)
}
function cuesForRound(sets, index, level) {
  const setIndex = index % sets.length
  const pass = Math.floor(index / sets.length)
  const counts = level === 'a1' ? [4, 2] : level === 'a2' ? [3, 3] : [2, 2, 2]
  const used = new Set()
  return counts.flatMap((count, group) => {
    const set = sets[(setIndex + group * (pass + 1)) % sets.length]
    const selected = []
    for (let step = 0; selected.length < count && step < set.words.length; step++) {
      const word = set.words[(pass * 3 + step) % set.words.length]
      const key = word.target.toLowerCase()
      if (used.has(key)) continue
      used.add(key)
      selected.push({ category: { es: set.nameEs, target: set.nameTarget }, word: word.target, gloss: word.es })
    }
    if (selected.length !== count) throw Error(`Insufficient unique cues: ${index}/${level}`)
    return selected
  })
}
const catalog = {}
for (const language of languages) {
  catalog[language] = {}
  for (const level of levels) {
    const sets = language === 'ingles' && level !== 'b1' ? readEnglishLevel(level) : readSets(language, level)
    catalog[language][level] = Array.from({ length: 20 }, (_, index) => {
      const set = sets[index % sets.length]
      const mode = Math.floor(index / sets.length)
      const followIndex = levels.indexOf(level)
      return {
        title: { es: `${set.nameEs} · ${modeNamesEs[level][mode]}`, target: `${set.nameTarget} · ${modeNames[language][level][mode]}` },
        question: `${set.nameTarget} — ${prompts[language][level][mode]}`,
        followUp: targetFollowUps[language][followIndex],
        focus: { es: followUps[level].es, target: targetFollowUps[language][followIndex] },
        cues: cuesForRound(sets, index, level),
      }
    })
  }
}
const output = 'src/data/practica/improvisa/catalog.generated.ts'
const content = `// Generated from the published vocabulary sets. Run node scripts/generate-improvisa-catalog.mjs.\nexport default JSON.parse(${JSON.stringify(JSON.stringify(catalog))}) as unknown\n`
for (const language of languages) {
  for (const level of levels) {
    const rounds = catalog[language][level]
    if (rounds.length !== 20 || new Set(rounds.map((round) => round.question)).size !== 20) {
      throw Error(`Expected 20 distinct questions: ${language}/${level}`)
    }
    for (const round of rounds) {
      if (round.cues.length !== 6 || new Set(round.cues.map((cue) => cue.word.toLowerCase())).size !== 6) {
        throw Error(`Expected six distinct cues: ${language}/${level}/${round.title.es}`)
      }
    }
  }
}
if (process.argv.includes('--check')) {
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== content) throw Error(`${output} is stale; regenerate it`)
  console.log('Improvisa catalog OK: 8 languages × 3 levels × 20 rounds × 6 distinct cues')
} else {
  fs.writeFileSync(output, content)
  console.log(`Generated ${languages.length * levels.length * 20} rounds from published vocabulary in ${output}`)
}
