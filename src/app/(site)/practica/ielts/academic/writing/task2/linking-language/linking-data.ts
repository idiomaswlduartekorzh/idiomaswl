/**
 * Las siete familias de conectores, cada una con su propia página.
 *
 * POR QUÉ SIETE PÁGINAS Y NO UNA
 *
 * `/linking-language` era una sola página que saltaba directa al quiz: ni explicación, ni
 * ejemplo resuelto, ni práctica guiada. David lo dijo así: «la estructura no es como la de
 * los demás, deberíamos acá explicar cómo se usan, mostrar ejemplos, y dar ejercicios y
 * luego el motor», y además que sirviera «para la gente que necesite conjunciones en
 * general», no solo para IELTS.
 *
 * Una página por familia responde a las dos cosas a la vez. Quien busca «conectores de
 * contraste en inglés» llega a una página que va de eso y nada más —que es como está montada
 * la gramática de práctica—, y quien viene de IELTS recorre las siete desde el hub.
 *
 * QUÉ LLEVA CADA FAMILIA
 *
 * Lo mismo que una unidad de Task 2, en el mismo orden: qué hace → cuándo se usa → los
 * conectores con su nota de uso → ejemplos resueltos → los errores típicos → ejercicios.
 * La nota de uso importa más que la lista: «however» y «but» significan lo mismo y no se
 * escriben igual, y eso es lo que nadie explica.
 */

export type Register = 'formal' | 'neutral' | 'informal';

export type Connector = {
  text: string;
  register: Register;
  /** Dónde va en la frase y con qué puntuación. Es lo que casi nunca se enseña. */
  usage: string;
};

export type LinkingExample = {
  before: string;
  connector: string;
  after: string;
  why: string;
};

export type LinkingMistake = {
  wrong: string;
  why: string;
  right: string;
};

/**
 * La mecánica, enseñada con dos frases y nada más.
 *
 * David: «debería primero haber una explicación de qué hace esta familia, conectar
 * oraciones… esta oración se conecta con esta y la explicación agrega más información…
 * siento que asume muy rápido que la gente entiende». Esto es esa explicación: la frase A,
 * la frase B, y en castellano llano qué relación hay entre las dos.
 */
export type HowItWorks = {
  first: string;
  second: string;
  /** La relación dicha sin jerga: qué le hace la segunda frase a la primera. */
  plain: string;
};

/**
 * El ejercicio de RELACIÓN, antes del de palabra.
 *
 * Se da la primera frase y se pregunta cuál sigue. No hay conectores en las opciones: lo que
 * se practica es notar la relación, que es lo que decide el conector. Hacerlo al revés
 * —elegir la palabra primero— es lo que convierte los conectores en decoración.
 */
export type Continuation = {
  stem: string;
  options: { text: string; fits: boolean; why: string }[];
};

export type LinkingDrill = {
  before: string;
  after: string;
  correct: string;
  options: string[];
};

export type LinkingFamily = {
  slug: string;
  label: string;
  /** Título y descripción para buscadores, en español, que es como busca esta audiencia. */
  seoTitle: string;
  seoDescription: string;
  spanishName: string;
  /** Qué relación señala, en una línea. */
  signals: string;
  whenToUse: string;
  tone: 'prompt' | 'claim' | 'development' | 'contrast' | 'link' | 'evidence' | 'review';
  howItWorks: HowItWorks;
  continuation: Continuation;
  connectors: Connector[];
  examples: LinkingExample[];
  mistakes: LinkingMistake[];
  drills: LinkingDrill[];
};

export const LINKING_FAMILIES: LinkingFamily[] = [
  {
    slug: 'addition',
    label: 'Addition',
    spanishName: 'Conectores de adición',
    seoTitle: 'Conectores de adición en inglés: furthermore, moreover, in addition',
    seoDescription: 'Cuándo usar furthermore, moreover, in addition y additionally, dónde van en la frase y con qué puntuación. Con ejemplos y ejercicios corregidos.',
    signals: 'the next idea goes the same way as the one before it',
    whenToUse: 'Use an addition connector when your second point supports the same conclusion as your first. If the second point pulls against the first, you need contrast instead — that swap is the single most common linking error in Task 2.',
    tone: 'development',
    howItWorks: {
      first: 'Remote work removes the daily commute.',
      second: 'It lets people live further from expensive city centres.',
      plain: 'Both sentences say something good about remote work. The second one does not change direction — it piles a second benefit on top of the first. That is all “addition” means: keep going the same way.',
    },
    continuation: {
      stem: 'Free museum entry raises visitor numbers among low-income families.',
      options: [
        { text: 'It also encourages repeat visits, so a collection becomes part of someone’s education rather than a single outing.', fits: true, why: 'Same direction: another good thing about free entry. This is what an addition connector introduces.' },
        { text: 'It does, however, leave the museum dependent on public funding that can be cut.', fits: false, why: 'This one turns against free entry. The relationship is contrast, not addition — you would need “however”, not “furthermore”.' },
        { text: 'The Prado, for example, waived entry for under-18s in 2019.', fits: false, why: 'This is one case of the claim, not a second claim. That is the example relationship.' },
      ],
    },
    connectors: [
      { text: 'Furthermore', register: 'formal', usage: 'Opens the sentence, followed by a comma. Adds a point of similar or greater weight.' },
      { text: 'Moreover', register: 'formal', usage: 'Same position as “furthermore”. Slightly stronger: it suggests the new point settles the matter.' },
      { text: 'In addition', register: 'neutral', usage: 'Opens the sentence with a comma. Use “in addition to” + noun when it stays inside the sentence.' },
      { text: 'Additionally', register: 'neutral', usage: 'Opens the sentence. Common in writing, rare in speech.' },
      { text: 'What is more', register: 'neutral', usage: 'Opens the sentence. Slightly conversational; safe in Task 2 but not in a report.' },
      { text: 'Not only … but also', register: 'formal', usage: 'Splits across the sentence. If “not only” starts the sentence, the verb inverts: “Not only does it cost more, but it also takes longer.”' },
    ],
    examples: [
      {
        before: 'Remote work removes the daily commute, which returns several hours a week to the employee.',
        connector: 'Furthermore',
        after: 'it allows people to live further from expensive city centres, which lowers their housing costs.',
        why: 'Both sentences argue that remote work benefits the employee. The second adds a different benefit, not a qualification, so addition is the right relationship.',
      },
      {
        before: 'The policy reduced peak-hour traffic by a fifth.',
        connector: 'Not only … but also',
        after: 'Not only did it reduce peak-hour traffic, but it also cut public spending on road repair.',
        why: 'Two results of one policy, both positive. Note the inversion after “Not only”: “did it reduce”, not “it reduced”.',
      },
    ],
    mistakes: [
      {
        wrong: 'Public transport is cheap. Furthermore, it is often unreliable.',
        why: '“Unreliable” argues against public transport; “cheap” argues for it. The reader is told to expect more of the same and gets the opposite.',
        right: 'Public transport is cheap. However, it is often unreliable.',
      },
      {
        wrong: 'Furthermore of the cost, the scheme takes years to build.',
        why: '“Furthermore” cannot take an object. The phrase that can is “in addition to”.',
        right: 'In addition to the cost, the scheme takes years to build.',
      },
    ],
    drills: [
      {
        before: 'Online education has made university courses accessible to students in remote regions.',
        after: ', it has opened professional development pathways for working adults who cannot attend traditional campuses.',
        correct: 'Furthermore',
        options: ['Furthermore', 'However', 'As a result', 'For example'],
      },
      {
        before: 'Free museum entry raises visitor numbers among low-income families.',
        after: ', it encourages repeat visits, which is how a collection becomes part of someone’s education rather than a single outing.',
        correct: 'In addition',
        options: ['In addition', 'Nevertheless', 'Consequently', 'For instance'],
      },
      {
        before: 'The new cycle network cut journey times for commuters.',
        after: ' did it cut journey times, but it also reduced the number of collisions at the city’s busiest junctions.',
        correct: 'Not only',
        options: ['Not only', 'Even though', 'In contrast', 'Similarly'],
      },
    ],
  },
  {
    slug: 'contrast',
    label: 'Contrast',
    spanishName: 'Conectores de contraste',
    seoTitle: 'Conectores de contraste en inglés: however, nevertheless, whereas, in contrast',
    seoDescription: 'Diferencia entre however, nevertheless, whereas, on the other hand y despite. Dónde va cada uno, con qué puntuación, y los errores más comunes.',
    signals: 'the next idea pushes against the one before it',
    whenToUse: 'Use contrast when the second idea limits, opposes or complicates the first. In a discussion essay it marks the move from one view to the other; in an opinion essay it usually introduces the point you are about to answer.',
    tone: 'contrast',
    howItWorks: {
      first: 'Tuition fees fund research that benefits the whole country.',
      second: 'They filter applicants by family income rather than by academic readiness.',
      plain: 'The first sentence is in favour of fees. The second is against them. Nothing has been added — the direction has been reversed, and the reader needs to be warned before it happens. That warning is the contrast connector.',
    },
    continuation: {
      stem: 'Working from home suits roles that depend on long stretches of concentration.',
      options: [
        { text: 'It weakens the informal contact that keeps a team coordinated.', fits: true, why: 'Opposite direction: the first sentence is for home working, this one is against it. That reversal is what contrast marks.' },
        { text: 'It also removes the commute, which returns several hours a week to the employee.', fits: false, why: 'Another point in favour. Same direction, so this is addition.' },
        { text: 'Teams that work remotely therefore need scheduled contact built into the week.', fits: false, why: 'This follows from the first sentence rather than opposing it. That is cause and effect.' },
      ],
    },
    connectors: [
      { text: 'However', register: 'formal', usage: 'Opens the sentence, comma after. Never joins two clauses with a comma before it — that is a run-on sentence.' },
      { text: 'Nevertheless', register: 'formal', usage: 'Opens the sentence. Means “I accept what I just said, and my point still stands”. Stronger than “however”.' },
      { text: 'On the other hand', register: 'neutral', usage: 'Opens the sentence. Best when you have already written “on the one hand”, or when two sides are genuinely balanced.' },
      { text: 'In contrast', register: 'formal', usage: 'Opens the sentence. Use it when the two things differ in a measurable way, not just in your opinion of them.' },
      { text: 'Whereas', register: 'formal', usage: 'Joins two clauses inside one sentence: “Cities grew, whereas rural areas emptied.” Never starts a new sentence in academic writing.' },
      { text: 'Despite / In spite of', register: 'formal', usage: 'Followed by a noun or -ing, never by a full clause: “despite the cost”, not “despite it costs”.' },
      { text: 'Although', register: 'neutral', usage: 'Followed by a full clause, at the start or the middle: “Although it costs more, it lasts longer.”' },
    ],
    examples: [
      {
        before: 'Tuition fees fund research that benefits the whole country.',
        connector: 'However',
        after: 'they also filter applicants by family income rather than by academic readiness.',
        why: 'The second sentence does not add another benefit — it names a cost. That reversal is what “however” signals.',
      },
      {
        before: 'Two clauses, one sentence.',
        connector: 'whereas',
        after: 'City centres gained residents over the decade, whereas the surrounding towns lost them.',
        why: '“Whereas” sets two facts side by side inside a single sentence. It needs both clauses; it cannot open a sentence on its own.',
      },
    ],
    mistakes: [
      {
        wrong: 'The scheme is expensive, however it works.',
        why: 'A comma cannot join two independent clauses with “however”. This is the most common punctuation error in Task 2.',
        right: 'The scheme is expensive. However, it works. — or — The scheme is expensive, but it works.',
      },
      {
        wrong: 'Despite it is expensive, the scheme works.',
        why: '“Despite” takes a noun or an -ing form, not a clause with a subject and a verb.',
        right: 'Despite the expense, the scheme works. — or — Although it is expensive, the scheme works.',
      },
    ],
    drills: [
      {
        before: 'Renewable energy costs have fallen sharply over the past decade.',
        after: ', many developing nations still rely heavily on fossil fuels due to the high upfront cost of transitioning their infrastructure.',
        correct: 'However',
        options: ['However', 'Furthermore', 'Therefore', 'For instance'],
      },
      {
        before: 'Working from home suits roles that depend on long stretches of concentration.',
        after: ', it weakens the informal contact that keeps a team coordinated.',
        correct: 'On the other hand',
        options: ['On the other hand', 'In the same way', 'As a result', 'In conclusion'],
      },
      {
        before: 'Older residents in the survey preferred printed timetables',
        after: ' younger commuters relied almost entirely on the app.',
        correct: 'whereas',
        options: ['whereas', 'therefore', 'moreover', 'for example'],
      },
    ],
  },
  {
    slug: 'cause-and-effect',
    label: 'Cause and effect',
    spanishName: 'Conectores de causa y efecto',
    seoTitle: 'Conectores de causa y efecto en inglés: therefore, as a result, consequently',
    seoDescription: 'Cómo usar therefore, as a result, consequently, hence y due to. Qué va antes y qué va después de cada uno, con ejemplos y ejercicios.',
    signals: 'what comes next is the consequence of what came before',
    whenToUse: 'Use cause and effect when the second sentence would not be true without the first. This is the connector family that carries an argument forward: it is how a reason becomes a conclusion.',
    tone: 'claim',
    howItWorks: {
      first: 'Online platforms carry no rent on a high street, so they can undercut physical shops.',
      second: 'Many high-street retailers have closed permanently.',
      plain: 'The second sentence would not be true without the first. It is not another fact standing beside it — it is what the first one produced. A cause-and-effect connector tells the reader to read it that way.',
    },
    continuation: {
      stem: 'The city removed general traffic from three central streets.',
      options: [
        { text: 'Pedestrian numbers rose and collisions at those junctions fell by half.', fits: true, why: 'These numbers are the consequence of the closure. Remove the first sentence and the second has no explanation.' },
        { text: 'The council also widened the pavements on two nearby roads.', fits: false, why: 'A second action by the council, not a result of the first. Same direction, so addition.' },
        { text: 'Some shopkeepers argued that deliveries had become impossible.', fits: false, why: 'This pushes against the closure. That is contrast.' },
      ],
    },
    connectors: [
      { text: 'As a result', register: 'neutral', usage: 'Opens the sentence with a comma. The effect follows; the cause is what you just wrote.' },
      { text: 'Therefore', register: 'formal', usage: 'Opens the sentence, or sits after the subject: “The council therefore reduced the budget.”' },
      { text: 'Consequently', register: 'formal', usage: 'Opens the sentence. Interchangeable with “as a result” in almost every context.' },
      { text: 'Hence', register: 'formal', usage: 'Opens a clause and is often followed by a noun phrase rather than a full clause: “hence the delay”.' },
      { text: 'Due to / Owing to', register: 'formal', usage: 'Followed by a noun, never a clause: “due to the delay”, not “due to it was delayed”.' },
      { text: 'This means that', register: 'neutral', usage: 'Opens the sentence. Useful when the effect needs spelling out rather than naming.' },
    ],
    examples: [
      {
        before: 'E-commerce platforms can undercut physical shops because they carry no rent on a high street.',
        connector: 'As a result',
        after: 'many traditional high-street retailers have been forced to close permanently.',
        why: 'The closures are the consequence of the price gap. “In addition” would list them as a separate fact and lose the causal link that the argument depends on.',
      },
      {
        before: 'Noun, not clause.',
        connector: 'Due to',
        after: 'Due to the shortage of qualified staff, waiting times doubled.',
        why: '“Due to” attaches to a noun phrase. If you want a clause, use “because”: “Because staff were in short supply, waiting times doubled.”',
      },
    ],
    mistakes: [
      {
        wrong: 'Due to the city invested in cycle lanes, journeys became safer.',
        why: '“Due to” cannot take a clause. The word that can is “because”.',
        right: 'Because the city invested in cycle lanes, journeys became safer.',
      },
      {
        wrong: 'The population is ageing. Therefore, some people think pensions should change.',
        why: '“Therefore” claims a consequence, but what follows is an opinion someone holds, not a result of ageing. The logic does not survive the connector.',
        right: 'The population is ageing. As a result, pension systems face a funding gap that did not exist a generation ago.',
      },
    ],
    drills: [
      {
        before: 'Online retail platforms consistently undercut physical stores on price and convenience.',
        after: ', many traditional high-street retailers have been forced to permanently close their stores.',
        correct: 'As a result',
        options: ['As a result', 'In addition', 'For example', 'Nevertheless'],
      },
      {
        before: 'The city removed general traffic from three central streets.',
        after: ', pedestrian numbers rose and collisions at those junctions fell by half.',
        correct: 'Consequently',
        options: ['Consequently', 'Admittedly', 'Similarly', 'What is more'],
      },
      {
        before: 'Waiting times doubled in the region’s hospitals last winter,',
        after: ' a shortage of qualified nursing staff rather than a rise in admissions.',
        correct: 'owing to',
        options: ['owing to', 'although', 'whereas', 'in conclusion'],
      },
    ],
  },
  {
    slug: 'examples',
    label: 'Examples',
    spanishName: 'Conectores para dar ejemplos',
    seoTitle: 'Conectores para ejemplos en inglés: for example, for instance, such as',
    seoDescription: 'Diferencia entre for example, for instance, such as y in particular. Cuál va con coma, cuál va dentro de la frase, y cómo no repetirlos.',
    signals: 'what comes next is one case of the claim you just made',
    whenToUse: 'Use an example connector when you move from a general claim to a specific case. In Task 2 the example does not have to be real — a plausible, concrete situation is enough, and inventing statistics costs more than it gains.',
    tone: 'evidence',
    howItWorks: {
      first: 'Sustained investment in cycling infrastructure changes how a city moves.',
      second: 'Amsterdam now handles a large share of daily trips by bicycle after three decades of dedicated lanes.',
      plain: 'The first sentence is a general claim. The second is one case of it. The order matters: claim first, case second. Reversed, the reader gets a fact about Amsterdam with no argument attached to it.',
    },
    continuation: {
      stem: 'Some subjects reward early specialisation far more than others.',
      options: [
        { text: 'A violinist or a gymnast who begins at fifteen has already lost the years that decide the outcome.', fits: true, why: 'One concrete case of the general claim. That is exactly what an example connector introduces.' },
        { text: 'Most teenagers, though, benefit from keeping several subjects open.', fits: false, why: 'This qualifies the claim rather than illustrating it. Contrast.' },
        { text: 'Schools should therefore let students specialise from fourteen.', fits: false, why: 'This is a conclusion drawn from the claim, not an instance of it. Cause and effect.' },
      ],
    },
    connectors: [
      { text: 'For example', register: 'neutral', usage: 'Opens the sentence with a comma, or sits mid-sentence between commas.' },
      { text: 'For instance', register: 'neutral', usage: 'Identical in use to “for example”. Alternate between the two rather than repeating one.' },
      { text: 'Such as', register: 'neutral', usage: 'Sits inside the sentence and is followed by a noun: “countries such as Finland”. It never opens a sentence.' },
      { text: 'In particular', register: 'formal', usage: 'Narrows to the most important case rather than listing any case.' },
      { text: 'A case in point is', register: 'formal', usage: 'Opens the sentence and promises that the example is decisive, so only use it when it is.' },
      { text: 'To illustrate', register: 'formal', usage: 'Opens the sentence with a comma. Useful when the example needs a full sentence to land.' },
    ],
    examples: [
      {
        before: 'Sustained investment in cycling infrastructure changes how a city moves.',
        connector: 'For instance',
        after: 'Amsterdam now handles a large share of daily urban trips by bicycle after three decades of dedicated lanes and secure storage.',
        why: 'The general claim comes first, the specific case second. Reversing them leaves the reader with a fact and no argument attached to it.',
      },
      {
        before: 'Inside the sentence, not opening it.',
        connector: 'such as',
        after: 'Countries such as Finland and South Korea have restructured teacher training over the past twenty years.',
        why: '“Such as” attaches to the noun it exemplifies. Writing “Such as Finland, the country restructured…” is a sentence fragment.',
      },
    ],
    mistakes: [
      {
        wrong: 'Such as, Japan has an ageing population.',
        why: '“Such as” is not a sentence opener; it needs a noun in front of it to exemplify.',
        right: 'Countries with ageing populations, such as Japan, face rising pension costs.',
      },
      {
        wrong: 'For example, a study by researchers proved that 87% of people agree.',
        why: 'An unnamed study and an invented figure add a second problem on top of the first. Task 2 rewards your reasoning, not fabricated evidence.',
        right: 'For example, a commuter who saves an hour a day gains an entire working week over a month.',
      },
    ],
    drills: [
      {
        before: 'Sustained investment in cycling infrastructure can transform how a city moves.',
        after: ', Amsterdam now handles a large share of all daily urban trips by bicycle following three decades of dedicated investment in cycle lanes.',
        correct: 'For instance',
        options: ['For instance', 'However', 'Consequently', 'In conclusion'],
      },
      {
        before: 'Some subjects reward early specialisation more than others.',
        after: ', a violinist or a gymnast who begins at fifteen has already lost the years that decide the outcome.',
        correct: 'In particular',
        options: ['In particular', 'On the other hand', 'Therefore', 'Moreover'],
      },
      {
        before: 'Several countries have restructured teacher training in the last two decades,',
        after: ' Finland and South Korea, both of which now recruit from the top of the graduate pool.',
        correct: 'such as',
        options: ['such as', 'as a result', 'even so', 'in addition'],
      },
    ],
  },
  {
    slug: 'concession',
    label: 'Concession',
    spanishName: 'Conectores de concesión',
    seoTitle: 'Conectores de concesión en inglés: admittedly, although, it is true that',
    seoDescription: 'Cómo conceder un punto al lado contrario sin perder tu posición: admittedly, although, while this may be true, even though. Con ejemplos y ejercicios.',
    signals: 'you accept the other side has a point, and you are about to answer it',
    whenToUse: 'Use concession when you want to acknowledge a genuine objection before defeating it. This is what separates an argued position from a one-sided one — and it only works if you then answer the point you conceded.',
    tone: 'review',
    howItWorks: {
      first: 'Universal free tuition would place a real burden on public spending.',
      second: 'The long-term return in skills and tax revenue outweighs that cost.',
      plain: 'The first sentence is the other side’s point, and you are admitting it is true. The second is your answer to it. Concession only works as a pair: admit, then answer. Admit and stop, and you have written their argument for them.',
    },
    continuation: {
      stem: 'Home working does reduce the informal contact that keeps colleagues connected.',
      options: [
        { text: 'Scheduled in-person sessions, though, restore most of what is lost.', fits: true, why: 'The objection was granted and then answered. That pair is what concession is for.' },
        { text: 'It also saves employees several hours of commuting each week.', fits: false, why: 'This adds a benefit but leaves the objection standing. Addition, not concession.' },
        { text: 'Zoom fatigue is a widely reported problem in remote teams.', fits: false, why: 'This piles a second problem onto the first. You have now conceded twice and answered nothing.' },
      ],
    },
    connectors: [
      { text: 'Admittedly', register: 'formal', usage: 'Opens the sentence with a comma. The next sentence must answer the point, or you have simply agreed with the other side.' },
      { text: 'It is true that', register: 'neutral', usage: 'Opens the sentence and is followed by a clause. Usually paired with a “but” or “however” sentence afterwards.' },
      { text: 'While this may be true', register: 'formal', usage: 'Opens the sentence with a comma. Carries the concession and the reversal in one phrase.' },
      { text: 'Although / Even though', register: 'neutral', usage: 'Followed by a full clause. The main clause carries your position: “Although the cost is high, the return justifies it.”' },
      { text: 'Granted', register: 'formal', usage: 'Opens the sentence. Short and confident; slightly more conversational than “admittedly”.' },
      { text: 'Of course', register: 'neutral', usage: 'Opens the sentence. Concedes something the reader already accepts, so the reversal must be worth reading.' },
    ],
    examples: [
      {
        before: 'Universal free tuition would place a substantial burden on public spending.',
        connector: 'Admittedly',
        after: 'Admittedly, the cost is significant, yet the long-term return in skills and tax revenue outweighs it.',
        why: 'The concession is real and the answer follows in the same sentence. A concession with no answer is just the other side’s argument in your essay.',
      },
      {
        before: 'Concession and position in one sentence.',
        connector: 'Although',
        after: 'Although early specialisation suits a small number of students, most teenagers benefit from a broad curriculum.',
        why: 'The subordinate clause holds the concession; the main clause holds your position. That order tells the reader which one you are defending.',
      },
    ],
    mistakes: [
      {
        wrong: 'Admittedly, home working reduces informal contact between colleagues.',
        why: 'The concession is left standing with nothing after it, so the paragraph ends on the opposing point. The reader last read the argument against you.',
        right: 'Admittedly, home working reduces informal contact. Scheduled in-person sessions, however, restore most of what is lost.',
      },
      {
        wrong: 'Although the cost is high, but the return justifies it.',
        why: '“Although” already carries the contrast. Adding “but” makes the sentence contrast twice and lose its main clause.',
        right: 'Although the cost is high, the return justifies it.',
      },
    ],
    drills: [
      {
        before: 'Building a comprehensive cycle network requires significant public investment.',
        after: ', the long-term environmental, social and economic returns vastly outweigh the initial costs for any city serious about sustainability.',
        correct: 'Admittedly',
        options: ['Admittedly', 'Furthermore', 'For example', 'Consequently'],
      },
      {
        before: 'Charging for museum entry does provide a dependable income for conservation.',
        after: ', a blanket fee excludes precisely the visitors that public collections exist to serve.',
        correct: 'While this may be true',
        options: ['While this may be true', 'Similarly', 'As a result', 'In particular'],
      },
      {
        before: 'Advertising regulation adds a compliance cost for producers,',
        after: ' children cannot reliably recognise persuasive intent, which is why the limits exist.',
        correct: 'even though',
        options: ['even though', 'therefore', 'likewise', 'for instance'],
      },
    ],
  },
  {
    slug: 'comparison',
    label: 'Comparison',
    spanishName: 'Conectores de comparación',
    seoTitle: 'Conectores de comparación en inglés: similarly, likewise, in the same way',
    seoDescription: 'Cuándo usar similarly, likewise, in the same way y by comparison, y en qué se diferencian de los conectores de adición. Ejemplos y ejercicios.',
    signals: 'the next case behaves like the one before it',
    whenToUse: 'Use comparison when two different situations follow the same pattern. It is not the same as addition: addition piles up points, comparison claims that a pattern repeats — which is a stronger and more falsifiable claim.',
    tone: 'link',
    howItWorks: {
      first: 'Nordic countries reached the top of international rankings by investing in teacher training.',
      second: 'South Korea and Singapore did the same and got the same result.',
      plain: 'Two different places, the same mechanism, the same outcome. That repetition is the argument: it suggests the result came from the policy and not from local luck. Addition would just list them; comparison claims the pattern.',
    },
    continuation: {
      stem: 'A city that removes cars from its centre recovers space for people on foot.',
      options: [
        { text: 'A school that protects unstructured time recovers attention for learning.', fits: true, why: 'A different situation following the same pattern. That parallel is the claim a comparison connector makes.' },
        { text: 'It also reduces the number of collisions at busy junctions.', fits: false, why: 'A second benefit of the same policy, not a parallel case. Addition.' },
        { text: 'Deliveries and residents with limited mobility still need a route in.', fits: false, why: 'This limits the claim. Contrast.' },
      ],
    },
    connectors: [
      { text: 'Similarly', register: 'formal', usage: 'Opens the sentence with a comma. The two cases must be genuinely parallel, or the sentence overclaims.' },
      { text: 'Likewise', register: 'formal', usage: 'Opens the sentence. Interchangeable with “similarly”; slightly more compact.' },
      { text: 'In the same way', register: 'neutral', usage: 'Opens the sentence. Useful when the shared mechanism, not just the outcome, is the point.' },
      { text: 'By comparison', register: 'formal', usage: 'Opens the sentence. Signals a measured difference of degree, so it sits between comparison and contrast.' },
      { text: 'Just as … so', register: 'formal', usage: 'Splits across the sentence: “Just as cities need parks, so towns need public squares.” Formal and emphatic.' },
    ],
    examples: [
      {
        before: 'Nordic countries reached the top of international rankings through sustained investment in teacher training.',
        connector: 'Similarly',
        after: 'East Asian systems such as South Korea and Singapore have prioritised educator quality and curriculum design.',
        why: 'Two different regions, the same mechanism. That parallel is the argument: it suggests the result comes from the policy, not from local circumstances.',
      },
      {
        before: 'Same pattern, one sentence.',
        connector: 'Just as … so',
        after: 'Just as a city needs green space, so a school day needs unstructured time.',
        why: 'The construction states the pattern once and applies it twice. It is emphatic, so use it for the point you most want remembered.',
      },
    ],
    mistakes: [
      {
        wrong: 'Free tuition widens access. Similarly, it costs the state a great deal.',
        why: 'The two facts are not parallel — one is a benefit, the other a cost. This is a contrast wearing a comparison connector.',
        right: 'Free tuition widens access. It does, however, cost the state a great deal.',
      },
      {
        wrong: 'Similarly to Finland, the country invested in teacher training.',
        why: '“Similarly” does not take an object. The phrase that does is “like” or “as in”.',
        right: 'As in Finland, the country invested in teacher training.',
      },
    ],
    drills: [
      {
        before: 'The Nordic countries have consistently achieved high scores on global education rankings through sustained investment in teacher training.',
        after: ', East Asian nations such as South Korea and Singapore have reached the top of international tables by prioritising educator quality and curriculum design.',
        correct: 'Similarly',
        options: ['Similarly', 'However', 'As a result', 'Admittedly'],
      },
      {
        before: 'A city that removes cars from its centre recovers space for people on foot.',
        after: ', a school that protects unstructured time recovers attention for learning.',
        correct: 'In the same way',
        options: ['In the same way', 'Despite this', 'Therefore', 'For example'],
      },
      {
        before: 'Rural clinics in the study reported a fifth of the region’s consultations.',
        after: ', the two urban hospitals handled more than half.',
        correct: 'By comparison',
        options: ['By comparison', 'Additionally', 'Owing to this', 'To illustrate'],
      },
    ],
  },
  {
    slug: 'conclusion',
    label: 'Conclusion',
    spanishName: 'Conectores de conclusión',
    seoTitle: 'Conectores de conclusión en inglés: in conclusion, overall, to sum up',
    seoDescription: 'Cómo cerrar un texto en inglés: in conclusion, overall, to conclude, in summary. Cuál usar en un ensayo, cuál evitar, y qué no poner en la conclusión.',
    signals: 'this is the end of the whole text, not of a paragraph',
    whenToUse: 'Use a closing connector once, at the start of your final paragraph. Using one at the end of a body paragraph tells the reader the essay is over when it is not — and nothing after it will be read as an argument.',
    tone: 'prompt',
    howItWorks: {
      first: 'The essay has argued that the cultural costs are real but the material gains are larger.',
      second: 'A wholly negative verdict on globalisation is therefore untenable.',
      plain: 'This is the end of the whole text, not the end of a paragraph. The closing connector says “nothing new is coming”. Use it in the middle and everything after it reads as an afterthought, however good it is.',
    },
    continuation: {
      stem: 'Both the access argument and the funding argument carry real weight.',
      options: [
        { text: 'A mixed system of targeted charges and protected free entry is therefore more convincing than one universal rule.', fits: true, why: 'It weighs what came before and announces the verdict. Nothing new appears.' },
        { text: 'Governments should also consider tax reform and international agreements.', fits: false, why: 'Two new proposals with nothing behind them. A conclusion cannot introduce what it has no space to support.' },
        { text: 'The Rijksmuseum, for instance, charges adults but admits under-18s free.', fits: false, why: 'An example belongs in the body, where it can be developed. Here it arrives too late to do any work.' },
      ],
    },
    connectors: [
      { text: 'In conclusion', register: 'formal', usage: 'Opens the final paragraph with a comma. The safest choice in Task 2, and the clearest.' },
      { text: 'Overall', register: 'neutral', usage: 'Opens the final paragraph. Slightly lighter than “in conclusion” and useful when weighing two sides.' },
      { text: 'To conclude', register: 'formal', usage: 'Opens the final paragraph. Interchangeable with “in conclusion”.' },
      { text: 'In summary', register: 'formal', usage: 'Opens the final paragraph. Promises a summary, so do not add a new argument after it.' },
      { text: 'On balance', register: 'neutral', usage: 'Opens the final paragraph when the essay has weighed two sides and you are announcing which one wins.' },
    ],
    examples: [
      {
        before: 'The essay has argued that cultural costs are real but that material gains are larger.',
        connector: 'In conclusion',
        after: 'globalisation’s cultural costs are genuine, but its capacity to reduce material suffering makes a wholly negative verdict untenable.',
        why: 'The closing sentence restates the position in different words and adds nothing that the body did not develop. That is the whole job of the connector.',
      },
      {
        before: 'Two sides weighed, one chosen.',
        connector: 'On balance',
        after: 'On balance, targeted charges serve museums better than either free entry for everyone or a fee for everyone.',
        why: '“On balance” announces a judgement after a genuine comparison. Using it without having compared anything is an empty signal.',
      },
    ],
    mistakes: [
      {
        wrong: 'In conclusion, the first reason is that public transport moves more people. [followed by two more paragraphs]',
        why: 'The reader has been told the essay is finished. Everything after this reads as an afterthought, however good it is.',
        right: 'The first reason is that public transport moves more people. [In conclusion is saved for the final paragraph]',
      },
      {
        wrong: 'In conclusion, governments should also consider taxation reform and international agreements.',
        why: 'Two new proposals appear in the final sentence with nothing behind them. A conclusion cannot introduce what it has no space to support.',
        right: 'In conclusion, the case for investment rests on the two mechanisms this essay has developed: capacity and access.',
      },
    ],
    drills: [
      {
        before: 'The evidence presented throughout this essay points in one direction.',
        after: ', only a sustained, coordinated global effort — combining personal responsibility with ambitious regulation — can lead society towards a genuinely sustainable model.',
        correct: 'In conclusion',
        options: ['In conclusion', 'Furthermore', 'For instance', 'However'],
      },
      {
        before: 'Both the access argument and the funding argument carry real weight.',
        after: ', a mixed system of targeted charges and protected free entry is more convincing than one universal rule.',
        correct: 'On balance',
        options: ['On balance', 'In particular', 'Nevertheless', 'Likewise'],
      },
      {
        before: 'This essay has set out the causes of household food waste and the measures that address them.',
        after: ', the problem begins with purchasing decisions and is solved closest to where it starts.',
        correct: 'Overall',
        options: ['Overall', 'Admittedly', 'Due to this', 'Such as'],
      },
    ],
  },
  {
    slug: 'condition',
    label: 'Condition',
    spanishName: 'Conectores de condición',
    seoTitle: 'Conectores de condición en inglés: if, unless, provided that, as long as',
    seoDescription: 'Diferencia entre if y unless, cuándo usar provided that o as long as, y dónde va otherwise. Con la regla de los tiempos verbales, ejemplos y ejercicios.',
    signals: 'the second idea only happens if the first one is true',
    whenToUse: 'Use a condition connector when your claim is not unconditional. In Task 2 this is how a strong argument avoids overclaiming: “free tuition works, provided that places are allocated on merit” is far more defensible than “free tuition works”.',
    tone: 'evidence',
    howItWorks: {
      first: 'Places are allocated on academic merit.',
      second: 'Free tuition widens access rather than subsidising those who could already pay.',
      plain: 'The second sentence is not a fact on its own — it only becomes true when the first one is. The connector attaches a price tag to the claim: this holds, but only under this condition. Remove the condition and you have overclaimed.',
    },
    continuation: {
      stem: 'Free tuition widens access to university.',
      options: [
        { text: 'Places have to be allocated on academic merit rather than by school of origin.', fits: true, why: 'The first claim only holds when this is true. That dependency is exactly what a condition connector marks.' },
        { text: 'It also removes the debt that deters applicants from low-income families.', fits: false, why: 'A second benefit standing on its own. Same direction, so addition.' },
        { text: 'It does, however, cost the state a substantial sum each year.', fits: false, why: 'This turns against the claim rather than limiting when it applies. Contrast.' },
      ],
    },
    connectors: [
      { text: 'If', register: 'neutral', usage: 'Opens the condition clause. With a present tense in the “if” half, use “will” in the other: “If fees rise, applications will fall.”' },
      { text: 'Unless', register: 'neutral', usage: 'Means “if not”, so never write “unless … not”. “Unless places are allocated fairly” = “if places are not allocated fairly”.' },
      { text: 'Provided that', register: 'formal', usage: 'Opens the condition clause. Stronger than “if”: it signals the condition is essential, not merely possible.' },
      { text: 'As long as', register: 'neutral', usage: 'Same job as “provided that”, slightly less formal. Common and safe in Task 2.' },
      { text: 'In case', register: 'neutral', usage: 'Means “as a precaution against”, not “if”. “Take an umbrella in case it rains” ≠ “if it rains”.' },
      { text: 'Otherwise', register: 'formal', usage: 'Opens the sentence with a comma and states what happens when the condition fails: “…, otherwise the policy subsidises the wealthy.”' },
    ],
    examples: [
      {
        before: 'Removing tuition fees widens access to higher education.',
        connector: 'provided that',
        after: 'Removing tuition fees widens access to higher education, provided that places are allocated on academic merit rather than by school of origin.',
        why: 'The condition is what makes the claim survive an objection. Without it the sentence claims free tuition always widens access, which is easy to refute.',
      },
      {
        before: '“Unless” already contains the negative.',
        connector: 'Unless',
        after: 'Unless regulation protects residents, tourism growth transfers the costs onto the people who live there.',
        why: '“Unless regulation protects” = “if regulation does not protect”. Writing “unless regulation does not protect” reverses the meaning by accident.',
      },
    ],
    mistakes: [
      {
        wrong: 'Unless the council does not act, congestion will worsen.',
        why: '“Unless” already means “if not”, so the sentence now says the opposite of what the writer intended.',
        right: 'Unless the council acts, congestion will worsen.',
      },
      {
        wrong: 'If fees will rise, applications will fall.',
        why: 'English does not use “will” in the “if” half of a first conditional. The present tense carries the future meaning.',
        right: 'If fees rise, applications will fall.',
      },
    ],
    drills: [
      {
        before: 'Free tuition widens access to university',
        after: ' places are allocated on academic merit rather than by school of origin.',
        correct: 'provided that',
        options: ['provided that', 'in addition to', 'as a result of', 'for instance'],
      },
      {
        before: '',
        after: ' regulation protects residents, tourism growth shifts the cost onto the people who live in the city.',
        correct: 'Unless',
        options: ['Unless', 'Because', 'Similarly', 'In conclusion'],
      },
      {
        before: 'Cycle lanes have to be physically separated from traffic.',
        after: ', the people most likely to switch will keep driving.',
        correct: 'Otherwise',
        options: ['Otherwise', 'Furthermore', 'For example', 'Likewise'],
      },
    ],
  },
  {
    slug: 'correlative',
    label: 'Correlative pairs',
    spanishName: 'Conjunciones correlativas',
    seoTitle: 'Conjunciones correlativas en inglés: either or, neither nor, both and',
    seoDescription: 'Cómo usar either…or, neither…nor, both…and y whether…or. La regla del paralelismo, la concordancia del verbo y los errores más frecuentes, con ejercicios.',
    signals: 'two elements are joined as a pair, and the sentence needs both halves',
    whenToUse: 'Use a correlative pair when two things must be presented together: two options, two things both being ruled out, or two things both being true. They make a sentence feel deliberate — but only if both halves are built the same way.',
    tone: 'link',
    howItWorks: {
      first: 'The council can widen the road.',
      second: 'The council can improve the bus network.',
      plain: 'Two sentences saying the council has two choices. A correlative pair folds them into one and marks them as a pair: “The council can either widen the road or improve the bus network.” The word comes in two halves, and leaving one out breaks the sentence.',
    },
    continuation: {
      stem: 'A city facing congestion has two realistic options.',
      options: [
        { text: 'It can widen the road network or invest in public transport — and it cannot afford both.', fits: true, why: 'Two options presented as a pair, which is what a correlative joins. “Either … or” folds this into one sentence.' },
        { text: 'Congestion also raises pollution levels across the whole metropolitan area.', fits: false, why: 'A consequence of congestion, not a second option. Cause and effect.' },
        { text: 'Seoul, for example, replaced an elevated motorway with a public park in 2005.', fits: false, why: 'One case, not a pair of options. That is the example relationship.' },
      ],
    },
    connectors: [
      { text: 'Either … or', register: 'neutral', usage: 'Two options, one of which applies. What follows “either” must match what follows “or”: two nouns, or two verbs, not one of each.' },
      { text: 'Neither … nor', register: 'formal', usage: 'Rules both out. Never add a second negative: “neither … nor”, not “not neither … nor”. The verb agrees with the closer subject.' },
      { text: 'Both … and', register: 'neutral', usage: 'Both apply. Takes a plural verb: “Both the council and the operator are responsible.”' },
      { text: 'Whether … or', register: 'formal', usage: 'Presents two possibilities without choosing. Use “whether”, not “if”, when the two options are stated.' },
      { text: 'Not only … but also', register: 'formal', usage: 'Adds emphasis to the second half. If “not only” opens the sentence, the verb inverts: “Not only does it cost more, but it also takes longer.”' },
    ],
    examples: [
      {
        before: 'Two options, folded into one sentence.',
        connector: 'either … or',
        after: 'The council can either widen the road network or invest in public transport, but its budget will not stretch to both.',
        why: 'Both halves are verb phrases — “widen the road network” and “invest in public transport”. That symmetry is the rule: whatever follows “either” must match what follows “or”.',
      },
      {
        before: 'Both ruled out at once.',
        connector: 'neither … nor',
        after: 'Neither higher fines nor wider roads reduced congestion in the three cities studied.',
        why: '“Neither … nor” carries the negative on its own. Adding “did not” would make the sentence say the opposite.',
      },
    ],
    mistakes: [
      {
        wrong: 'The council can either widen the road or public transport.',
        why: 'The halves do not match: a verb phrase on one side, a noun on the other. The sentence loses its verb.',
        right: 'The council can either widen the road or improve public transport.',
      },
      {
        wrong: 'Neither the council nor the operator did not accept responsibility.',
        why: '“Neither … nor” is already negative. The extra “did not” cancels it and reverses the meaning.',
        right: 'Neither the council nor the operator accepted responsibility.',
      },
    ],
    drills: [
      {
        before: 'A city facing congestion can',
        after: ' widen its road network or invest in public transport, but rarely both.',
        correct: 'either',
        options: ['either', 'neither', 'whether', 'both'],
      },
      {
        before: '',
        after: ' higher fines nor wider roads reduced congestion in the three cities studied.',
        correct: 'Neither',
        options: ['Neither', 'Either', 'Whether', 'Not only'],
      },
      {
        before: 'The evidence suggests that',
        after: ' the employer and the employee gain from a well-designed remote arrangement.',
        correct: 'both',
        options: ['both', 'either', 'neither', 'whether'],
      },
    ],
  },
];

export const familyBySlug = (slug: string) => LINKING_FAMILIES.find((family) => family.slug === slug);

/**
 * Variantes que solo aparecen como distractor y no están en la lista de ninguna familia.
 *
 * Son formas ligadas —«Despite this» frente a «Despite», «Owing to this» frente a «Owing
 * to»— que sirven muy bien de distractor porque se parecen a la correcta. Sin esta tabla
 * caían en el respaldo genérico y el mensaje al fallar no decía nada concreto.
 */
const BOUND_FORMS: Record<string, string> = {
  'Despite this': 'the next idea pushes against the one before it',
  'even so': 'the next idea pushes against the one before it, after conceding it',
  'Owing to this': 'what comes next is the consequence of what came before',
  'Due to this': 'what comes next is the consequence of what came before',
};

/** Qué señala cada conector. De aquí sale la explicación de CADA opción equivocada. */
export const SIGNALS: Record<string, string> = (() => {
  // «Not only … but also» aparece en adición y en correlativas: gana la PRIMERA definición,
  // porque `Object.fromEntries` se quedaría con la última y la explicación saldría cambiada.
  const map: Record<string, string> = {};
  for (const family of LINKING_FAMILIES) {
    for (const connector of family.connectors) {
      if (!(connector.text in map)) map[connector.text] = family.signals;
    }
  }
  return { ...map, ...BOUND_FORMS };
})();

/**
 * Todos los conectores que aparecen como opción en algún ejercicio, con lo que señalan.
 *
 * Los distractores salen de otras familias, así que hay que poder explicar cualquiera de
 * ellos aunque su forma exacta —«However» frente a «however»— no esté en la lista de su
 * familia. Se busca sin distinguir mayúsculas.
 */
export function signalFor(connector: string): string {
  const exact = SIGNALS[connector];
  if (exact) return exact;
  const found = Object.entries(SIGNALS).find(([key]) => key.toLowerCase() === connector.toLowerCase());
  if (found) return found[1];
  const partial = Object.entries(SIGNALS).find(([key]) => key.toLowerCase().includes(connector.toLowerCase()));
  return partial ? partial[1] : 'a different relationship between the two clauses';
}
