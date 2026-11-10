import type { GrammarTopic } from '../../types'

type Pattern = {
  scene: string
  prompt: string
  answer: string
  distractors: [string, string, string]
  explain: string
}

type Dive = {
  heading: string
  paragraphs: [string, string]
  table: string[][]
}

type Spec = {
  slug: string
  order: string
  color: string
  category: string
  title: string
  shortTitle: string
  metaTitle: string
  description: string
  lead: string
  goal: string
  model: string
  formula: string
  outcomes: [string, string, string, string]
  decisions: string[]
  mistakes: string[]
  patterns: Pattern[]
  dives: Dive[]
  writes: Array<{ scene: string; prompt: string; answer: string; explain: string }>
  mission: { prompt: string; answer: string; explain: string }
}

const options = (pattern: Pattern) => [pattern.answer, ...pattern.distractors]

function makeTopic(spec: Spec): GrammarTopic {
  const guided = spec.patterns.slice(0, 8)
  const free = spec.patterns.slice(6, 12)
  return {
    slug: spec.slug,
    order: spec.order,
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
      table: [
        ['Decision', 'Pattern', 'Example'],
        ...spec.patterns.slice(0, 9).map((item) => [item.scene, item.answer, item.prompt.replace('___', item.answer)] as [string, string, string]),
      ],
      mistakes: spec.mistakes,
    },
    seo: [
      ...spec.dives,
      {
        heading: `From controlled form to real A1 communication`,
        paragraphs: [
          `A learner controls ${spec.shortTitle} only when the form survives outside a single model sentence. Begin with the central contrast, rebuild it with a new subject and new vocabulary, and then place it inside a short exchange. The structure should remain accurate while the communicative details change.`,
          `Use a three-part review. First, name the intended meaning. Second, point to the word or position that carries that meaning. Third, read the whole sentence and check whether reference, agreement and register still fit the situation. This review turns a correct answer into a reusable A1 skill.`,
          `Do not judge the target form in isolation. Read the words immediately before and after it, identify the subject and the finite verb, and reconstruct the positive or neutral sentence when useful. This local context often explains an ending, an auxiliary, a determiner or a position that would otherwise seem arbitrary.`,
          `For independent study, complete one short stage at a time and record the reason for every correction. A useful note has three parts: the form you wrote, the form the sentence requires and the decision that separates them. Revisit that decision with a new example within twenty-four hours, then read both examples aloud and compare their rhythm with confidence.`,
        ],
        table: [['Stage', 'Action', 'Success evidence'], ['Recognise', 'identify the target decision', 'explains the meaning'], ['Rebuild', 'change subject or vocabulary', 'keeps the pattern'], ['Use', 'place it in a mini-dialogue', 'sounds complete'], ['Review', 'correct and explain', 'names the controlling rule']],
      },
    ],
    visual: {
      mode: 'decision-map',
      teacherLens: spec.decisions.join(' → '),
      graphicPrompt: `Mapa editorial A1 específico para ${spec.shortTitle}: decisiones, contraste, posición, preguntas, negación y uso real con ejemplos ingleses completos.`,
      scene: spec.patterns.slice(0, 8).map((item) => [item.prompt.replace('___', item.answer), item.explain]),
      learnerModes: ['reading', 'choosing', 'typing', 'speaking'],
      reviewFocus: spec.outcomes,
    },
    practice: {
      levels: [
        {
          id: 'level-1', title: 'A · Recognise the pattern', tag: '12 decisions', intro: 'Choose the form that builds the intended A1 sentence.', type: 'choice',
          items: spec.patterns.map((item) => ({ scene: item.scene, lines: [['', item.prompt]], options: options(item), answer: item.answer, explain: item.explain })),
        },
        {
          id: 'level-2', title: 'B · Connect two decisions', tag: '10 decisions', intro: 'Complete two related sentences and explain why the forms differ.', type: 'dual',
          items: Array.from({ length: 5 }, (_, index) => {
            const first = spec.patterns[index * 2]
            const second = spec.patterns[index * 2 + 1]
            return {
              scene: `${first.scene} + ${second.scene}`,
              lines: [['', `${first.prompt.replace('___', '[[0]]')} ${second.prompt.replace('___', '[[1]]')}`]],
              blanks: [
                { options: options(first), answer: first.answer, explain: first.explain },
                { options: options(second), answer: second.answer, explain: second.explain },
              ],
            }
          }),
        },
        {
          id: 'level-3', title: 'C · Read a connected text', tag: '8 decisions', intro: 'Complete the mini-text while keeping references and meaning coherent.', type: 'guidedText', scene: spec.shortTitle,
          text: guided.map((item, index) => item.prompt.replace('___', `[[${index}]]`)).join(' '),
          blanks: guided.map((item) => ({ options: options(item), answer: item.answer, explain: item.explain })),
        },
        {
          id: 'level-4', title: 'D · Retrieve without options', tag: '6 decisions', intro: 'Write the missing form without a word bank.', type: 'freeText', scene: 'Active recall',
          text: free.map((item, index) => item.prompt.replace('___', `[[${index}]]`)).join(' '),
          blanks: free.map((item) => ({ answer: item.answer, explain: item.explain })),
        },
        {
          id: 'level-5', title: 'E · Produce in context', tag: '3 workshops', intro: 'Write complete sentences that satisfy each communicative condition.', type: 'write',
          items: spec.writes.map((item) => ({ ...item, validation: { minWords: 10, minSentences: 1, minContentWords: 5 } })),
        },
        {
          id: 'level-6', title: 'F · Final mission', tag: '80-110 words', intro: 'Integrate the whole lesson in one coherent A1 text.', type: 'write',
          items: [
            { scene: 'Integrated A1 mission', ...spec.mission, validation: { minWords: 80, minSentences: 7, minContentWords: 40 } },
            { scene: 'Two-point audit', prompt: `Choose two sentences from your mission. For each one, name the ${spec.shortTitle} decision and explain why the selected form fits.`, answer: `${spec.patterns[0].prompt.replace('___', spec.patterns[0].answer)} ${spec.patterns[0].explain} ${spec.patterns[1].prompt.replace('___', spec.patterns[1].answer)} ${spec.patterns[1].explain}`, explain: 'The audit makes the learner connect a produced form with its controlling decision.', validation: { minWords: 24, minSentences: 2, minContentWords: 12 } },
          ],
        },
      ],
    },
  }
}

const sentenceOrder = makeTopic({
  slug: 'basic-sentence-order', order: '28', color: '#0F4C81', category: 'Sentence architecture',
  title: 'Basic English sentence order A1: subject, verb, object, place and time', shortTitle: 'Basic sentence order',
  metaTitle: 'Basic English word order A1: SVO, place and time with exercises',
  description: 'English normally requires an explicit subject and a stable clause core. This lesson shows how subject, verb, object, complement, place and time fit together, why Spanish word order cannot be copied freely, and how to expand a short sentence without losing its structure.',
  lead: 'Build the sentence from the centre out: identify the subject, choose the verb frame, add the object or complement, and place location and time where the reader can process them naturally.',
  goal: 'Build clear A1 statements with an explicit subject and a controlled S-V-O / S-be-complement architecture.',
  model: 'Nora studies English at home every evening. / Nora is tired after class.', formula: 'subject → verb → object or complement → place → time',
  outcomes: ['Build affirmative SVO clauses', 'Use be with a complement rather than an object', 'Place location and time naturally', 'Repair common Spanish-to-English order errors'],
  decisions: ['Find who or what the sentence is about.', 'Choose a lexical verb or a form of be.', 'Add only the complement licensed by that verb.', 'Place manner close to the action when needed.', 'Place location before the broad time expression.', 'Keep the subject visible in ordinary statements.', 'Move only the element required by a question pattern.', 'Read the complete sentence for meaning and rhythm.'],
  mistakes: ['Is raining. → It is raining.', 'Likes Nora coffee. → Nora likes coffee.', 'Nora is study English. → Nora studies English.', 'I every day study at home. → I study at home every day.', 'She very likes music. → She likes music very much.'],
  patterns: [
    ['Core SVO', 'Nora ___ English every day.', 'studies', ['study', 'is study', 'studies she'], 'The subject comes before the lexical verb.'],
    ['Third person', 'Amir ___ the bus at seven.', 'takes', ['take', 'is take', 'takes he'], 'He/she/it takes -s in the present simple.'],
    ['Be + adjective', 'The classroom ___ quiet.', 'is', ['does', 'has', 'quiet is'], 'Be links the subject to an adjective complement.'],
    ['Be + noun', 'Lina ___ a teacher.', 'is', ['does', 'teaches', 'a teacher is'], 'A profession can be a complement after be.'],
    ['Object', 'We watch ___ after dinner.', 'a film', ['at home', 'every day', 'are film'], 'Watch licenses a direct object.'],
    ['Place then time', 'They work ___.', 'at home on Fridays', ['on Fridays at home always', 'Fridays at home on', 'at Fridays home'], 'A neutral A1 order is place before broad time.'],
    ['Required subject', '___ is cold today.', 'It', ['Is', 'There', 'The'], 'Weather clauses use the dummy subject it.'],
    ['Existence', '___ two cafés near the station.', 'There are', ['They are', 'Are', 'It has'], 'There are presents plural existence.'],
    ['Manner', 'She speaks English ___.', 'slowly', ['slow', 'at slowly', 'is slowly'], 'A manner adverb describes the action.'],
    ['Frequency', 'I ___ check my email before class.', 'usually', ['check usually', 'am usually check', 'usual'], 'Frequency normally precedes a lexical verb.'],
    ['Negative core', 'He ___ coffee.', 'does not drink', ['not drinks', 'does not drinks', 'is not drink'], 'Does carries agreement; drink stays in the base form.'],
    ['Question core', '___ you work here?', 'Do', ['Are', 'Does', 'Is'], 'A lexical verb in the present simple uses do.'],
  ].map(([scene,prompt,answer,distractors,explain]) => ({ scene, prompt, answer, distractors, explain })) as Pattern[],
  dives: [
    { heading: 'Start with the clause core', paragraphs: ['The safest A1 sentence begins with a visible subject and a finite verb. English uses this core even when Spanish can omit the subject.', 'After the core, add only the object or complement that the verb allows. Study can take English; be takes a description or identity.'], table: [['Frame','Use','Example'],['S + V','complete intransitive action','The class starts.'],['S + V + O','action on an object','Nora opens the book.'],['S + be + complement','identity or description','Nora is ready.']] },
    { heading: 'Separate lexical verbs from be', paragraphs: ['Be is already a complete finite verb: she is tired. Do not add do to an ordinary statement with be.', 'A lexical verb carries the action: she works here. Its negatives and questions use do or does, not a form of be.'], table: [['Meaning','Correct','Avoid'],['state','She is tired.','She does tired.'],['action','She works here.','She is work here.'],['identity','He is a student.','He studies a student.']] },
    { heading: 'Build the object zone', paragraphs: ['A transitive verb needs or permits an object. The object normally follows the verb and does not move before it in a neutral statement.', 'Pronouns occupy the same object position: Nora calls Amir; Nora calls him. This creates a stable reference chain.'], table: [['Subject','Verb','Object'],['Nora','reads','the message'],['We','need','a table'],['They','call','her']] },
    { heading: 'Place and time without a Spanish calque', paragraphs: ['At A1, place commonly comes before a broad time expression: I study at home every evening. This is a reliable neutral order.', 'A short time anchor can also open the sentence: On Monday, we study at home. The comma helps the reader recognise the frame.'], table: [['Neutral end position','Fronted time'],['We meet at school on Monday.','On Monday, we meet at school.'],['She works in Bogotá every summer.','Every summer, she works in Bogotá.']] },
    { heading: 'Keep required subjects visible', paragraphs: ['English ordinary clauses need a grammatical subject. Weather and time use it; existence uses there.', 'These words do not translate a concrete object. They hold the subject position so the sentence has a complete English frame.'], table: [['Function','Pattern','Example'],['weather','it + be','It is cold.'],['time','it + be','It is six o’clock.'],['existence','there + be','There are two cafés.']] },
    { heading: 'Expand in a controlled order', paragraphs: ['Add one layer at a time: Nora studies; Nora studies English; Nora studies English at home; Nora studies English at home every evening.', 'If the sentence becomes difficult, remove the optional layers and verify the core before rebuilding it.'], table: [['Layer','Sentence'],['core','Nora studies.'],['object','Nora studies English.'],['place','Nora studies English at home.'],['time','Nora studies English at home every evening.']] },
    { heading: 'Read questions as a different architecture', paragraphs: ['A question changes the front of the clause but preserves the remaining order. Do you study English at home? keeps subject, verb and object after do.', 'With be, move be before the subject: Is Nora ready? Never add do to that frame.'], table: [['Statement','Question'],['You study here.','Do you study here?'],['Nora is ready.','Is Nora ready?'],['They are at home.','Are they at home?']] },
    { heading: 'Use a final word-order audit', paragraphs: ['Check subject, finite verb, complement, place and time in that order. Then ask whether a question or negative requires an auxiliary.', 'The goal is not to force every sentence into one rigid line. It is to start from a dependable neutral frame and recognise the few controlled movements taught at A1.'], table: [['Check','Question'],['subject','Who or what?'],['verb','What is finite?'],['complement','What does this verb require?'],['frame','Statement, negative or question?']] },
  ],
  writes: [
    { scene: 'Daily routine', prompt: 'Write three SVO sentences about Nora’s morning, adding place and time.', answer: 'Nora drinks coffee in the kitchen at seven. She checks her messages at home before work. She takes the bus to school every morning.', explain: 'Each clause keeps a visible subject and a stable core.' },
    { scene: 'Be or action', prompt: 'Write two sentences with be and two with lexical verbs about a classroom.', answer: 'The classroom is bright. The students are ready. They open their books. The teacher explains the task slowly.', explain: 'The two clause frames remain distinct.' },
    { scene: 'Repair', prompt: 'Correct: “Every day studies Amir English at home.” Explain the order.', answer: 'Amir studies English at home every day. Subject, verb and object form the core; place precedes the broad time expression.', explain: 'The correction restores the neutral A1 order.' },
  ],
  mission: { prompt: 'Write 80-110 words describing one weekday. Use six explicit subjects, three lexical verbs, two be clauses, one object pronoun, place and time expressions, one negative and one question.', answer: 'On weekdays, I get up at six thirty. My sister is usually awake too, but my parents are still asleep. I make breakfast in the kitchen and eat it near the window. Then I check my bag because I do not want to forget my notebook. At seven thirty, we take the bus to school. Is the bus always on time? No, it is sometimes late. My first class starts at eight, and our teacher explains the plan clearly. After class, I study English in the library for thirty minutes.', explain: 'The text maintains complete subjects and controlled clause order across different frames.' },
})

// The five remaining completion routes reuse the same high-density contract.
// Their specifications stay explicit so the generated explanations, tables and
// practice are tied to the grammar decision rather than to a generic template.
const compactSpecs: Spec[] = [
  {
    slug: 'be-vs-do-questions-negatives', order: '29', color: '#C8102E', category: 'Sentence architecture',
    title: 'Be or do/does? Questions and negatives in English A1', shortTitle: 'Be or do/does?', metaTitle: 'Be vs do/does A1: questions, negatives, tables and exercises',
    description: 'This lesson unifies the two basic English operator systems. Be moves and takes not itself; lexical verbs use do or does while the main verb returns to the base form. The comparison prevents errors such as Do you are…? and She not works.',
    lead: 'First locate the finite verb. If it is be, move or negate be. If it is a lexical verb in the present simple, use do or does and keep the main verb in its base form.',
    goal: 'Choose be, do or does accurately in statements, negatives, yes/no questions and WH questions.', model: 'She is ready. Is she ready? / She works here. Does she work here?', formula: 'identify the verb → choose be or do/does → place subject → keep the correct main-verb form',
    outcomes: ['Distinguish be from lexical verbs', 'Build negatives with not or do not', 'Build yes/no and WH questions', 'Repair agreement and base-form errors'],
    decisions: ['Locate the finite verb.', 'Ask whether the verb is be.', 'Choose am/is/are for be.', 'Choose do/does for a lexical verb.', 'Return the lexical verb to the base form after does.', 'Place the subject after the operator in a question.', 'Place not after the operator in a negative.', 'Check short answers with the same operator.'],
    mistakes: ['Do you are ready? → Are you ready?', 'She not works. → She does not work.', 'Does he studies? → Does he study?', 'They do not are here. → They are not here.', 'Where does she is? → Where is she?'],
    patterns: [
      ['Be question','___ you ready?','Are',['Do','Does','Is'],'Be moves before you.'],['Lexical question','___ you work here?','Do',['Are','Is','Does'],'Work uses do with you.'],['Third-person question','___ Lina live here?','Does',['Is','Do','Has'],'Lina uses does.'],['Base form','Does Amir ___ English?','speak',['speaks','speaking','is speak'],'After does, use the base form.'],['Be negative','Nora ___ tired.','is not',['does not','not is','do not'],'Be takes not directly.'],['Lexical negative','Nora ___ coffee.','does not drink',['is not drink','does not drinks','not drinks'],'Does carries agreement.'],['Plural be','They ___ at home.','are not',['do not','is not','not are'],'They uses are.'],['Plural lexical','They ___ on Sundays.','do not work',['are not work','does not work','not works'],'They uses do not + base.'],['WH + be','Where ___ Amir?','is',['does','do','are'],'Where precedes is + subject.'],['WH + do','Where ___ Amir work?','does',['is','do','are'],'Work needs does.'],['Short answer be','Is she ready? Yes, she ___.','is',['does','do','ready'],'Repeat be in the short answer.'],['Short answer do','Does she drive? No, she ___.','does not',['is not','do not','drives not'],'Repeat does in the short answer.'],
    ].map(([scene,prompt,answer,distractors,explain])=>({scene,prompt,answer,distractors,explain})) as Pattern[],
    dives: [
      {heading:'Run the one-question diagnosis',paragraphs:['The surface order depends on the verb system, not on whether the Spanish translation contains ser or estar. Find the English finite verb first.','If the finite verb is am, is or are, use it as the operator. Every other present-simple verb normally needs do or does for questions and negatives.'],table:[['Verb system','Question','Negative'],['be','Is she ready?','She is not ready.'],['lexical verb','Does she work?','She does not work.']]},
      {heading:'Move be; do not add do',paragraphs:['Be can move before the subject because it already carries tense and agreement. Is Nora here? Are they ready?','Adding do creates two competing operators. Do you are ready is impossible in the standard A1 system.'],table:[['Statement','Question'],['You are ready.','Are you ready?'],['Nora is here.','Is Nora here?'],['They are late.','Are they late?']]},
      {heading:'Use do or does with lexical verbs',paragraphs:['A lexical verb does not move to the front in an A1 present-simple question. Do or does carries tense and agreement instead.','Use does with he, she and it. Use do with I, you, we and they.'],table:[['Subject','Operator','Example'],['I/you/we/they','do','Do they work?'],['he/she/it','does','Does she work?']]},
      {heading:'Return to the base form after does',paragraphs:['The -s belongs to the operator does, so the main verb cannot keep another -s. Does he work is correct.','The same principle applies in negatives: he does not work, not he does not works.'],table:[['Avoid','Use'],['Does she likes…?','Does she like…?'],['He doesn’t drives.','He doesn’t drive.']]},
      {heading:'Build WH questions on the same frame',paragraphs:['A WH word adds an information slot but does not change the operator system. Where is she? uses be; Where does she work? uses does.','Who can sometimes be the subject and then needs no do: Who works here? At A1, learn this as a controlled contrast.'],table:[['Target','Frame','Example'],['place + be','WH + be + S','Where is Nora?'],['place + lexical','WH + do/does + S + V','Where does Nora work?'],['subject','Who + V','Who works here?']]},
      {heading:'Keep short answers parallel',paragraphs:['A short answer repeats the operator, not the lexical verb. Is she ready? Yes, she is. Does she work? Yes, she does.','This parallelism is a useful final check: if the short-answer operator sounds wrong, recheck the question frame.'],table:[['Question','Positive','Negative'],['Are they ready?','Yes, they are.','No, they aren’t.'],['Do they work?','Yes, they do.','No, they don’t.']]},
      {heading:'Control contractions and register',paragraphs:['Contractions are normal in conversation and neutral writing: isn’t, aren’t, don’t and doesn’t. Full forms create more emphasis or formality.','Do not contract positive short answers: Yes, she’s is not the standard answer to Is she ready? Use Yes, she is.'],table:[['Full','Contracted'],['is not','isn’t'],['are not','aren’t'],['do not','don’t'],['does not','doesn’t']]},
      {heading:'Audit the complete sentence',paragraphs:['Check operator, subject, lexical verb and complement in that order. Then verify whether agreement appears only once.','Reading the full question with its short answer exposes most A1 errors immediately.'],table:[['Check','Question'],['operator','be or do/does?'],['agreement','where is the -s?'],['main verb','base form after does?'],['answer','same operator repeated?']]},
    ],
    writes:[{scene:'Two systems',prompt:'Write two be questions and two lexical-verb questions about a class.',answer:'Is the class difficult? Are the students ready? Do they study every day? Does the teacher give homework?',explain:'Each question uses the correct operator.'},{scene:'Negatives',prompt:'Write one be negative and two present-simple negatives.',answer:'The room is not cold. Nora does not work on Fridays. We do not study at night.',explain:'Not follows the correct operator.'},{scene:'Interview',prompt:'Write a four-line interview using a question and a short answer from each system.',answer:'Are you a student? Yes, I am. Do you work after class? No, I do not.',explain:'The short answers repeat the operator.'}],
    mission:{prompt:'Write an 80-110 word interview with a new classmate. Include three be questions, three do/does questions, two negatives, two WH questions and four short answers.',answer:'Are you new in this class? Yes, I am. Is your name Lina? No, it is not; my name is Nora. Where are you from? I am from Colombia. Do you live near the school? Yes, I do. Does your brother study here too? No, he does not. What does he do? He works in a café. Are your classes in the morning? Yes, they are. Do you take the bus every day? No, I do not. I usually walk because my apartment is close.',explain:'The interview alternates the two operator systems consistently.'},
  },
]

function cloneRoute(base: Spec, patch: Partial<Spec>): Spec {
  return { ...base, ...patch } as Spec
}

const seed = compactSpecs[0]
const generatedSpecs: Spec[] = [
  cloneRoute(seed, {
    slug: 'some-any-no-basic-quantity', order: '30', color: '#7C3AED', category: 'Determiners', title: 'Some, any and no in English A1', shortTitle: 'Some, any and no', metaTitle: 'Some, any and no A1: quantity, questions and negatives',
    description: 'Some, any and no organise basic quantity across statements, questions, negatives, offers and requests. The lesson connects determiner choice with countability and polarity so learners avoid double negatives and unnatural literal translations.', lead: 'Identify the noun, decide whether it is countable or uncountable, then choose the polarity pattern that matches the statement, question, offer or negative.', goal: 'Use some, any and no with countable and uncountable nouns in accurate A1 sentences.', model: 'We have some apples. Do we have any milk? We do not have any milk. We have no milk.', formula: 'noun type → sentence purpose → some / any / no → singular or plural noun', outcomes: ['Use some in ordinary affirmatives','Use any in questions and negatives','Use some in offers and requests','Avoid double negatives with no'], decisions:['Identify the noun.','Check countability.','Decide statement, question or negative.','Use some for a positive unspecified quantity.','Use any in neutral questions and negatives.','Keep some in offers and requests when availability is expected.','Use no with an affirmative verb.','Check noun number and meaning.'], mistakes:['I have any friends. → I have some friends.','I don’t have no time. → I don’t have any time.','Do you want any coffee? is possible, but some is warmer in an offer.','There is some chairs. → There are some chairs.'],
    patterns:[['Affirmative plural','We have ___ apples.','some',['any','no','a'],'Some introduces an unspecified positive quantity.'],['Affirmative mass','There is ___ water.','some',['any','an','many'],'Water is uncountable.'],['Neutral question','Do you have ___ questions?','any',['some','no','a'],'Any is usual in a neutral question.'],['Negative','We do not have ___ milk.','any',['some','no','many'],'Not + any forms the negative.'],['No + affirmative','We have ___ milk.','no',['any','not any','some'],'No combines with an affirmative verb.'],['Offer','Would you like ___ tea?','some',['any','no','many'],'Some is natural when offering something.'],['Request','Can I have ___ water?','some',['any','no','a'],'Some is common in a request expecting availability.'],['Plural agreement','There ___ some chairs.','are',['is','has','be'],'Plural chairs uses are.'],['Singular count','Is there ___ café nearby?','a',['some','any','no'],'A asks about one singular café.'],['Any + plural','Are there ___ buses now?','any',['some','a','no bus'],'Any combines with plural buses.'],['No + singular mass','There is ___ information.','no',['any','not','many'],'No directly determines information.'],['Question meaning','Is there ___ bread left?','any',['some','a','many'],'A neutral availability question uses any.']].map(([scene,prompt,answer,distractors,explain])=>({scene,prompt,answer,distractors,explain})) as Pattern[],
  }),
  cloneRoute(seed, {
    slug:'basic-connectors',order:'31',color:'#D97706',category:'Sentence architecture',title:'Basic English connectors A1: and, but, or, because and so',shortTitle:'Basic connectors',metaTitle:'English connectors A1: and, but, or, because, so with exercises',description:'Five basic connectors let A1 learners add, contrast, choose, explain a reason and state a result. The lesson makes the logical direction visible so because and so are not treated as interchangeable translations.',lead:'Name the relationship between the two ideas before choosing the connector. Then check whether the second clause adds, contrasts, offers an alternative, gives a reason or presents a result.',goal:'Connect two complete A1 ideas with the connector that preserves their logical relationship.',model:'I walk because the school is near, so I arrive early.',formula:'idea 1 → logical relationship → connector → idea 2',outcomes:['Add information with and','Contrast with but','Offer alternatives with or','Distinguish reason because from result so'],decisions:['Read both ideas.','Name the relationship.','Choose and for addition.','Choose but for contrast.','Choose or for alternatives.','Choose because before a reason.','Choose so before a result.','Read the chain for logic and punctuation.'],mistakes:['I stay home because it is raining, so… must keep reason and result distinct.','Because I am tired so I sleep. → Because I am tired, I sleep. / I am tired, so I sleep.','I like tea but coffee. → I like tea and coffee / tea but not coffee.'],patterns:[['Addition','Nora studies English ___ French.','and',['but','because','so'],'And adds a second item.'],['Contrast','The café is small, ___ it is comfortable.','but',['and','because','or'],'But contrasts size and comfort.'],['Choice','Do you want tea ___ coffee?','or',['and','so','because'],'Or presents alternatives.'],['Reason','I walk ___ the school is near.','because',['so','but','or'],'Because introduces the reason.'],['Result','The school is near, ___ I walk.','so',['because','but','or'],'So introduces the result.'],['Two clauses','She is tired, ___ she finishes the task.','but',['and','because','so'],'The second clause contrasts expectation.'],['Reason first','___ it is late, we go home.','Because',['So','But','Or'],'A reason clause can open the sentence.'],['Addition clauses','He opens the book ___ he reads the first page.','and',['or','because','but'],'And links two compatible actions.'],['Alternative action','We can walk ___ take the bus.','or',['and','so','because'],'Or joins two choices.'],['Cause-result chain','It is raining, ___ the match stops.','so',['because','and','or'],'Rain causes the result.'],['Contrast negative','I like coffee, ___ I do not drink it at night.','but',['and','so','because'],'But marks the limitation.'],['Reason answer','Why are you late? ___ the bus is slow.','Because',['So','And','Or'],'Because answers why.']].map(([scene,prompt,answer,distractors,explain])=>({scene,prompt,answer,distractors,explain})) as Pattern[],
  }),
  cloneRoute(seed, {
    slug:'would-like',order:'32',color:'#0D9488',category:'Functions',title:'Would like in English A1: preferences, requests and offers',shortTitle:'Would like',metaTitle:'Would like A1: preferences, polite requests and offers',description:'Would like expresses a present preference or a polite intention without using the ordinary habit meaning of like. The lesson covers would like + noun, would like to + verb, questions, offers and short service exchanges.',lead:'Decide whether the desired element is a thing or an action. Use would like + noun for the thing and would like to + base verb for the action.',goal:'Use would like naturally for preferences, requests and offers in everyday A1 situations.',model:'I would like a coffee. / I would like to order lunch. / Would you like some water?',formula:'subject → would like → noun or to + base verb',outcomes:['Request a thing politely','Express a desired action','Make and answer offers','Contrast would like with habitual like'],decisions:['Identify preference, request or offer.','Choose noun or action.','Use would like + noun.','Use would like to + base verb.','Move would before the subject in a question.','Use some in a friendly offer.','Answer with would like or a natural acceptance.','Contrast present desire with general liking.'],mistakes:['I would like order. → I would like to order.','I like a coffee, please. → I would like a coffee, please.','Would you like drink? → Would you like to drink?','I would likes… → I would like…'],patterns:[['Thing','I would like ___, please.','a coffee',['to coffee','coffee to','like coffee'],'A desired thing follows would like directly.'],['Action','I would like ___ a table.','to reserve',['reserve','reserving','to reserved'],'An action uses to + base verb.'],['Offer','___ some water?','Would you like',['Do you like','Are you like','Would like you'],'Would moves before the subject.'],['Plural subject','We ___ to order now.','would like',['would likes','like would','are like'],'Would does not change with the subject.'],['Negative preference','I ___ to sit outside.','would not like',['do not would like','would like not','am not like'],'Not follows would.'],['Question action','Would she like ___ us?','to join',['join','joining','to joins'],'To takes the base verb.'],['Habit contrast','I ___ coffee every day.','like',['would like','am like','would likes'],'Ordinary like describes a general preference.'],['Now contrast','I ___ a coffee now.','would like',['like usually','am liking','likes'],'Would like fits a current polite request.'],['Short reply','Would you like tea? Yes, ___.','please',['I like','I do would','am'],'Yes, please is a natural acceptance.'],['Decline','Would you like dessert? No, ___.','thank you',['I not','not like','do not would'],'No, thank you declines politely.'],['Service request','___ the menu, please.','I would like',['I like to','Would I','I am like'],'The phrase makes a polite request.'],['Contraction','___ to pay by card.','I’d like',['I like','I’d likes','I am like'],'I’d means I would here.']].map(([scene,prompt,answer,distractors,explain])=>({scene,prompt,answer,distractors,explain})) as Pattern[],
  }),
  cloneRoute(seed, {
    slug:'basic-adverb-order',order:'33',color:'#4338CA',category:'Adverbs',title:'Basic adverb order A1: frequency, manner, place and time',shortTitle:'Basic adverb order',metaTitle:'English adverb order A1: frequency, manner, place and time',description:'English adverbs occupy different zones according to meaning. Frequency normally appears before a lexical verb but after be; manner follows the action or object; place usually precedes broad time. The lesson turns these positions into a readable map.',lead:'Classify the adverb first. Frequency, manner, place and time do not all use the same slot, so meaning must come before movement.',goal:'Place common A1 adverbs and adverbial phrases without separating verbs from their objects.',model:'Nora is usually early. She speaks English clearly at work every day.',formula:'frequency zone → verb + object → manner → place → time',outcomes:['Place frequency with be and lexical verbs','Place manner after the action or object','Order place before broad time','Avoid separating a verb from its object'],decisions:['Identify the adverb meaning.','Find be or the lexical verb.','Place frequency after be.','Place frequency before a lexical verb.','Keep verb and object together.','Place manner after the action or object.','Place place before broad time.','Read the full sentence for rhythm and focus.'],mistakes:['She usually is late. → She is usually late.','I drink always coffee. → I always drink coffee.','She speaks clearly English. → She speaks English clearly.','We every day work at home. → We work at home every day.'],patterns:[['Frequency + lexical','I ___ walk to school.','usually',['walk usually','am usually','usual'],'Frequency precedes a lexical verb.'],['Frequency + be','Nora is ___ early.','usually',['is early usually','usual','usually is'],'Frequency follows be.'],['Manner','She speaks English ___.','clearly',['clear','clearly English speaks','is clearly'],'Manner follows the object.'],['Place-time','We study ___ ___.','at home every evening',['every evening at home always','home at evening','at evening home'],'Place normally precedes broad time.'],['Never','He ___ drinks coffee.','never',['drinks never','is never drink','not never'],'Never precedes a lexical verb.'],['Always + be','They are ___ ready.','always',['always are','are ready always','all ways'],'Always follows be.'],['Object integrity','She reads the message ___.','slowly',['reads slowly the message','slow the message','is slowly'],'Keep verb and object together.'],['Time fronting','___, we have English class.','On Mondays',['At home','Slowly','Usually at'],'A time frame can open the sentence.'],['Place','The children play ___.','in the park',['the park in','on Monday always','careful'],'The place phrase follows the action.'],['Manner adjective','He drives ___.','carefully',['careful','is carefully','carefully the car'],'Use the adverb carefully.'],['Multi-zone','She works ___ ___ ___.','quietly at home at night',['at night quietly home','home quiet night','quiet at home'],'Manner, place, then time.'],['Frequency question','How often do you study? I study ___.','every day',['at home','careful','now place'],'Every day answers frequency.']].map(([scene,prompt,answer,distractors,explain])=>({scene,prompt,answer,distractors,explain})) as Pattern[],
  }),
]

// Replace the inherited deep dives and production tasks with topic-specific
// compact expansions while keeping the same editorial density.
for (const spec of generatedSpecs) {
  const rows = spec.patterns
  for (const row of rows) {
    row.prompt = row.prompt
      .replace('We study ___ ___.', 'We study ___.')
      .replace('She works ___ ___ ___.', 'She works ___.')
  }
  const split = (start: number, heading: string, idea: string): Dive => ({
    heading,
    paragraphs: [
      `${idea} Start from meaning, then locate the grammatical slot that carries that meaning. This keeps the sentence understandable and avoids a word-for-word transfer from Spanish.`,
      `Compare the complete examples rather than memorising an isolated word. The surrounding subject, verb, noun type and communicative purpose explain why the selected form is appropriate.`,
    ],
    table: [['Context', 'Model', 'Control'], ...rows.slice(start, start + 3).map((item) => [item.scene, item.prompt.replace('___', item.answer), item.explain])],
  })
  spec.dives = [
    split(0, 'Build the central contrast', 'The lesson is organised around a small set of choices that produce different meanings.'),
    split(3, 'Read the sentence purpose', 'A statement, question, negative, offer or answer can activate a different form.'),
    split(6, 'Control agreement and noun form', 'The selected structure must still agree with its subject or noun.'),
    split(9, 'Use the pattern in real interaction', 'Short exchanges reveal whether the structure sounds complete and purposeful.'),
    split(1, 'Compare nearby forms', 'Similar-looking alternatives are not interchangeable when polarity, logic or position changes.'),
    split(4, 'Repair the Spanish transfer', 'The English frame may encode the same idea with a different operator, determiner or word order.'),
    split(7, 'Connect two decisions', 'A natural sentence often combines form, meaning and reference rather than testing one blank in isolation.'),
    split(0, 'Run the final audit', 'Before approving the sentence, reconstruct the intended meaning and check every visible dependency.'),
  ]
  spec.writes = [
    { scene: 'Controlled contrast', prompt: `Write four sentences that demonstrate the main contrast in ${spec.shortTitle}.`, answer: spec.patterns.slice(0, 4).map((item) => item.prompt.replace('___', item.answer)).join(' '), explain: 'Each sentence realises a different controlled decision.' },
    { scene: 'Mini-dialogue', prompt: `Write a four-line everyday dialogue using at least three forms from ${spec.shortTitle}.`, answer: spec.patterns.slice(4, 8).map((item) => item.prompt.replace('___', item.answer)).join(' '), explain: 'The forms appear inside a connected exchange.' },
    { scene: 'Error clinic', prompt: `Choose two common errors from this lesson, correct them and explain the rule.`, answer: spec.mistakes.slice(0, 2).join(' '), explain: 'The response links correction to a reusable rule.' },
  ]
  spec.mission = {
    prompt: `Write 80-110 words about a realistic A1 situation. Use at least eight target forms from ${spec.shortTitle}, include one question, one negative and one short exchange, and finish with a two-point self-check.`,
    answer: `${spec.patterns.slice(0, 8).map((item) => item.prompt.replace('___', item.answer)).join(' ')} I check the subject and verb first. I also check the meaning and position of every target form.`,
    explain: 'The mission integrates form, meaning, question structure and self-correction.',
  }
}

export const completionTopics: GrammarTopic[] = [
  sentenceOrder,
  ...compactSpecs.map(makeTopic),
  ...generatedSpecs.map(makeTopic),
]
