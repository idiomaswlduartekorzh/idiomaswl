import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperativo',
  order: '17',
  color: '#009246',
  category: 'Verbi',
  level: 'A1',
  title: 'El imperativo italiano A1: dar órdenes e instrucciones',
  shortTitle: 'Imperativo',
  metaTitle: 'Imperativo italiano A1 — parla, scrivi, ascolta, non parlare, aspetta',
  description:
    'El imperativo sirve para dar órdenes, instrucciones y sugerencias. En italiano A1 lo usamos principalmente en TU (informal), VOI (plural) y NOI (sugerencias tipo "vamos a..."). La negación en TU es especial: NON + INFINITIVO (non parlare, non scrivere), no la forma del imperativo.',
  lead: 'Para dar instrucciones en italiano usa el imperativo. Parla! = ¡Habla! Scrivi! = ¡Escribe! Ascolta! = ¡Escucha! Y recuerda: negativo de TU siempre es non + infinitivo.',
  outcomes: [
    'Formar el imperativo afirmativo para -are, -ere e -ire',
    'Usar la negación del imperativo: non + infinitivo (solo para TU)',
    'Distinguir entre imperativo formal (Lei) e informal (tu) en contextos básicos',
  ],
  guide: {
    goal: 'Dar instrucciones y órdenes en italiano informal (tu/voi) y en sugerencias (noi).',
    model: '[raíz verbal + terminación imperativa]',
    formula: 'TU: -a/-i/-i | VOI: -ate/-ete/-ite | NOI: -iamo | Negación TU: non + infinitivo',
    decisions: [
      '¿Hablas con una persona en informal? → imperativo TU: Parla! / Scrivi! / Apri!',
      '¿Hablas con varias personas? → imperativo VOI: Parlate! / Scrivete! / Aprite!',
      '¿Propones hacer algo juntos? → NOI: Parliamo! / Andiamo! (tipo "¡Hablemos! / ¡Vamos!")',
      '¿Es negativo para TU? → NON + INFINITIVO: Non parlare! / Non scrivere! (nunca non parla!)',
      '¿Hablas formalmente con una persona? → LEI usa el presente subj.: Parli! / Scriva!',
    ],
    table: [
      ['Persona', 'Afirmativo (-are)', 'Afirmativo (-ere/-ire)'],
      ['tu', 'parla! (¡habla!)', 'scrivi! / apri! (¡escribe!/¡abre!)'],
      ['Lei (formal)', 'parli! (¡hable Ud.!)', 'scriva! / apra!'],
      ['noi', 'parliamo! (¡hablemos!)', 'scriviamo! / apriamo!'],
      ['voi', 'parlate! (¡hablad!)', 'scrivete! / aprite!'],
    ],
    mistakes: [
      'Negación TU: NON PARLARE (infinitivo), NUNCA "non parla". Es la regla más importante.',
      'andare → vai! (no va!), essere → sii!, avere → abbi!, fare → fai!, stare → stai! — irregolari comunes.',
      'Imperativo TU de -are: termina en -a (parla), no en -i. Pero -ere/-ire sí terminan en -i (scrivi, apri).',
      'Lei formal invierte: -are hace -i (parli), -ere/-ire hacen -a (scriva, apra). Al revés del TU.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se forma el imperativo en italiano A1?',
      paragraphs: [
        'El imperativo italiano para TU toma la tercera persona del presente para los verbos -are (parla = él habla → parla! = ¡habla tú!). Para -ere e -ire coincide con la segunda persona del presente: scrivi = escribes → scrivi! = ¡escribe! Esta asimetría es peculiar del italiano.',
        'Para VOI, el imperativo coincide exactamente con la segunda persona plural del presente: parlate, scrivete, aprite. Y para NOI, coincide con la primera persona plural del presente: parliamo, scriviamo, apriamo — equivale a "¡vamos a hablar/escribir/abrir!"',
      ],
      table: [
        ['Terminación', 'TU (affirm.)', 'VOI (affirm.)', 'NOI (suger.)'],
        ['-are', 'parla!', 'parlate!', 'parliamo!'],
        ['-ere', 'scrivi!', 'scrivete!', 'scriviamo!'],
        ['-ire', 'apri!', 'aprite!', 'apriamo!'],
        ['Negación TU', 'non parlare!', 'non parlate!', 'non parliamo!'],
      ],
    },
    {
      heading: 'La regla de oro del imperativo negativo en TU',
      paragraphs: [
        'El imperativo negativo de TU siempre se forma con NON + INFINITIVO. Non parlare! (¡No hables!), non mangiare (¡no comas!), non scrivere (¡no escribas!). Esta es la regla más importante y la que más confunde a los hispanohablantes, que instintivamente dicen "non parla" (incorrecto).',
        'Para VOI y NOI la negación es regular: NON + forma imperativa. Non parlate! (¡No habléis!), Non parliamo di questo! (¡No hablemos de esto!).',
      ],
    },
    {
      heading: 'Imperativos irregolari esenciales en A1',
      paragraphs: [
        'Los verbos más comunes tienen imperativos irregulares que conviene memorizar. Varios tienen dos formas de TU (una corta con apóstrofo y otra igual al presente). "Andiamo!" ("¡Vamos!") lo escucharás constantemente:',
      ],
      table: [
        ['Verbo', 'TU', 'VOI'],
        ['andare', 'va\' / vai', 'andate'],
        ['fare', 'fa\' / fai', 'fate'],
        ['stare', 'sta\' / stai', 'state'],
        ['dare', 'da\' / dai', 'date'],
        ['dire', 'di\'', 'dite'],
        ['essere', 'sii', 'siate'],
        ['avere', 'abbi', 'abbiate'],
      ],
    },
    {
      heading: '¿Cómo se forma el imperativo afirmativo en italiano?',
      paragraphs: [
        'Para TU: los verbos -are toman la forma de "él/ella" (parla!), y los -ere/-ire toman la de "tú" (scrivi!, apri!). Para VOI coincide con el presente (parlate!, scrivete!). Para NOI equivale a "vamos a…" (parliamo! = ¡hablemos!). La forma de cortesía (Lei) usa el subjuntivo (parli!).',
      ],
    },
    {
      heading: '¿Cómo se dice una orden negativa ("no hagas") en italiano?',
      paragraphs: [
        'Para TU, la orden negativa es non + infinitivo: "Non parlare!" (¡no hables!), "Non correre!" (¡no corras!). Es la regla que más confunde: NO se dice "non parla". Para VOI y NOI es regular: "Non parlate!", "Non parliamo!".',
      ],
    },
    {
      heading: '¿Cuáles son los imperativos irregulares más comunes?',
      paragraphs: [
        'andare (va\'/vai), fare (fa\'/fai), stare (sta\'/stai), dare (da\'/dai), dire (di\'), essere (sii) y avere (abbi). Con pronombre, las formas cortas duplican la consonante: "Dimmi!" (dime), "Fammi vedere!" (déjame ver), "Vacci!" (ve allí).',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The key difficulty is the TU negative: non + infinitive (non parlare, not non parla). Drill this contrast intensively as it\'s the most common error for Spanish speakers.',
    graphicPrompt:
      'Classroom with teacher giving instructions. Speech bubbles: "Parla!" (TU), "Parlate!" (VOI), "Parliamo!" (NOI), "Non parlare!" (TU neg). Green Italian theme.',
    scene: [
      ['TU -are', 'Parla! (Párla) — ¡Habla!'],
      ['TU -ere', 'Scrivi! (Skrívi) — ¡Escribe!'],
      ['TU negativo', 'Non parlare! (Non parlàre) — ¡No hables!'],
      ['VOI', 'Ascoltate! (Askoltàte) — ¡Escuchad!'],
      ['NOI', 'Andiamo! (Andiàmo) — ¡Vamos!'],
      ['Irreg.', 'Fai attenzione! (Fài attentsióne) — ¡Presta atención!'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['parlare', 'scrivere', 'aprire', 'ascoltare', 'andare', 'fare'],
    reviewFocus: ['TU neg = non + infinitivo', 'VOI -ate/-ete/-ite', 'irregolari: vai, fai, stai'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Riconoscimento dell\'imperativo',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma imperativa correcta.',
        type: 'choice',
        items: [
          { scene: 'TU -are afirmativo', lines: [['', '¿Cuál es el imperativo afirmativo TU de "parlare" (hablar)?']], options: ['parli', 'parla', 'parlate', 'parlare'], answer: 'parla', explain: 'Parla! TU imperativo de -are = tercera persona presente. parla (= él habla = ¡habla tú!).' },
          { scene: 'TU -ere', lines: [['', '¿Cuál es el imperativo TU de "scrivere" (escribir)?']], options: ['scrivi', 'scriva', 'scrivete', 'scrivere'], answer: 'scrivi', explain: 'Scrivi! TU imperativo de -ere = segunda persona presente (= escribes → ¡escribe!).' },
          { scene: 'TU negativo', lines: [['', '¿Cómo se dice "¡No hables!" en TU?']], options: ['Non parla!', 'Non parlare!', 'Non parlate!', 'Parla non!'], answer: 'Non parlare!', explain: 'Imperativo negativo TU = NON + INFINITIVO. Non parlare! (nunca non parla!).' },
          { scene: 'VOI', lines: [['', '¿Cuál es el imperativo VOI de "ascoltare" (escuchar)?']], options: ['ascolta', 'ascolti', 'ascoltate', 'ascoltano'], answer: 'ascoltate', explain: 'Ascoltate! VOI imperativo de -are = segunda persona plural. Equivale al presente ascoltate.' },
          { scene: 'NOI — sugerencia', lines: [['', '"¡Vamos!" en italiano (andare, noi):']], options: ['Andate!', 'Vai!', 'Andiamo!', 'Andare!'], answer: 'Andiamo!', explain: 'Andiamo! NOI imperativo de andare. Irregular. Equivale a "¡Vamos!" / "¡Vayamos!"' },
          { scene: 'Irregular fare', lines: [['', '¿Cuál es el imperativo TU de "fare" (hacer)?']], options: ['fare!', 'fa!', 'fai!', 'faccia!'], answer: 'fai!', explain: 'Fai! Imperativo TU irregular de fare. fai! / fate! / facciamo!' },
          { scene: 'VOI negativo', lines: [['', '¿Cómo se dice "¡No habléis!" (VOI)?']], options: ['Non parlate!', 'Non parlare!', 'Non parla!', 'Non parlano!'], answer: 'Non parlate!', explain: 'VOI negativo = Non + imperativo VOI. Non parlate! (VOI sí usa la forma del imperativo, no infinitivo).' },
          { scene: '-ire imperativo', lines: [['', '¿Cuál es el imperativo TU de "aprire" (abrir)?']], options: ['apre', 'apra', 'apri', 'aprite'], answer: 'apri', explain: 'Apri! TU imperativo de -ire = segunda persona presente. apri (= abres → ¡abre!).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Imperativo — due spazi',
        tag: '2 espacios',
        intro: 'Completa los pares afirmativo/negativo del imperativo.',
        type: 'dual',
        items: [
          { scene: 'Afirmativo vs negativo TU', lines: [['', '"¡Habla!" = [[0]] y "¡No hables!" = [[1]] (parlare, TU)']], blanks: [{ options: ['parla', 'parli', 'parlate', 'parlare'], answer: 'parla', explain: 'TU afirmativo de -are: parla! (raíz + -a).' }, { options: ['non parla', 'non parlare', 'non parlate', 'parla non'], answer: 'non parlare', explain: 'TU negativo: NON + INFINITIVO. Non parlare!' }] },
          { scene: 'TU vs VOI', lines: [['', '"¡Escucha!" (TU) = [[0]] y "¡Escuchad!" (VOI) = [[1]]']], blanks: [{ options: ['ascolta', 'ascoltate', 'ascoltare', 'ascolti'], answer: 'ascolta', explain: 'TU de ascoltare (-are): ascolta! (raíz + -a).' }, { options: ['ascoltate', 'ascolta', 'ascoltano', 'ascoltare'], answer: 'ascoltate', explain: 'VOI de ascoltare: ascoltate! (-are VOI = -ate).' }] },
          { scene: 'Irregular andare', lines: [['', '"¡Ve!" (TU andare) = [[0]] y "¡Id!" (VOI) = [[1]]']], blanks: [{ options: ['va', 'vai', 'andate', 'andare'], answer: 'vai', explain: 'vai! Imperativo TU irregular de andare. (No va!)' }, { options: ['vai', 'andate', 'andiamo', 'andare'], answer: 'andate', explain: 'Andate! VOI de andare. Regular: seconda persona plurale del presente.' }] },
          { scene: 'NOI sugerencia', lines: [['', '"¡Estudiemos!" (noi studiare) = [[0]] y "¡No estudiemos!" = [[1]]']], blanks: [{ options: ['studiamo', 'studiate', 'studia', 'studiare'], answer: 'studiamo', explain: 'Studiamo! NOI imperativo = prima persona plurale. = ¡Estudiemos!' }, { options: ['non studiamo', 'non studiare', 'non studia', 'non studiate'], answer: 'non studiamo', explain: 'NOI negativo: Non + forma NOI. Non studiamo = ¡No estudiemos!' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Testo guidato — istruzioni in classe',
        tag: 'Opciones',
        intro: 'Elige la forma imperativa correcta en cada contexto.',
        type: 'guidedText',
        scene: 'Bruno da instrucciones en clase de italiano',
        text: 'Bruno entra in classe e dice: "[[0]] i libri!" (¡Abrid los libros! — VOI). Poi guarda Marco: "Marco, [[1]] la pagina dieci!" (¡Lee la página diez! — TU). Lina arriva in ritardo. Bruno dice: "Non [[2]] in ritardo!" (¡No llegues tarde! — TU negativo). Tutti insieme: "[[3]] di pronuncia!" (¡Practiquemos pronunciación! — NOI). Alla fine: "[[4]] a casa e [[5]] il vocabolario!" (¡Id a casa y repasd el vocabulario! — VOI)',
        blanks: [
          { options: ['Aprite', 'Apri', 'Apra', 'Aprire'], answer: 'Aprite', explain: 'Aprite! VOI de aprire (-ire): -ite. ¡Abrid!' },
          { options: ['leggi', 'legga', 'leggete', 'leggere'], answer: 'leggi', explain: 'Leggi! TU de leggere (-ere): scrivi/leggi (seconda persona presente).' },
          { options: ['arriva', 'arrivare', 'arrivate', 'arrivi'], answer: 'arrivare', explain: 'Non arrivare! TU negativo = NON + INFINITIVO. Non arrivare = ¡No llegues!' },
          { options: ['Pratichiamo', 'Praticate', 'Pratica', 'Praticare'], answer: 'Pratichiamo', explain: 'Pratichiamo! NOI = prima persona plurale. = ¡Practiquemos!' },
          { options: ['Andate', 'Vai', 'Andiamo', 'Andare'], answer: 'Andate', explain: 'Andate! VOI de andare. ¡Id!' },
          { options: ['ripassate', 'ripassa', 'ripassare', 'ripassiamo'], answer: 'ripassate', explain: 'Ripassate! VOI de ripassare (-are). ¡Repasad!' },
        ],
      },
      {
        id: 'level-4',
        title: 'Testo libero — scrivi l\'imperativo',
        tag: 'Sin opciones',
        intro: 'Escribe la forma imperativa correcta sin opciones.',
        type: 'freeText',
        scene: 'Instrucciones de clase y situaciones cotidianas',
        text: '1. ¡Escucha! (TU, ascoltare): [[0]] 2. ¡No hables! (TU negativo, parlare): Non [[1]] 3. ¡Escribid! (VOI, scrivere): [[2]] 4. ¡No comáis! (VOI negativo, mangiare): Non [[3]] 5. ¡Hablemos! (NOI, parlare): [[4]]',
        blanks: [
          { answer: 'Ascolta', accepted: ['Ascolta', 'ascolta'], explain: 'ascoltare → ascolta! TU imperativo -are: raíz + -a.' },
          { answer: 'parlare', accepted: ['parlare'], explain: 'TU negativo: non + INFINITIVO. Non parlare! (no non parla).' },
          { answer: 'Scrivete', accepted: ['Scrivete', 'scrivete'], explain: 'scrivere → scrivete! VOI imperativo -ere: raíz + -ete.' },
          { answer: 'mangiate', accepted: ['mangiate', 'Mangiate'], explain: 'VOI negativo: Non + imperativo VOI. Non mangiate! (-are VOI = -ate).' },
          { answer: 'Parliamo', accepted: ['Parliamo', 'parliamo'], explain: 'NOI: parliamo! = ¡Hablemos! (prima persona plurale del presente).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produzione scritta',
        tag: 'Producción',
        intro: 'Construye instrucciones completas en imperativo.',
        type: 'write',
        items: [
          { scene: 'Instrucciones de clase', prompt: 'Traduce al italiano (TU): "¡Abre el libro en la página cinco y escribe tu nombre!" (aprire = abrir, libro = libro, pagina = página, scrivere = escribir, nome = nombre)', answer: 'Apri il libro a pagina cinque e scrivi il tuo nome!', accepted: ['apri', 'scrivi'], explain: 'Apri (aprire TU: apri!) + scrivi (scrivere TU: scrivi!). Ambas -ere/-ire → seconda persona presente.' },
          { scene: 'Prohibición TU', prompt: 'Traduce al italiano: "¡No comas en clase y no uses el celular!" (mangiare = comer, usare = usar, telefono = celular, TU negativo)', answer: 'Non mangiare in classe e non usare il telefono!', accepted: ['non mangiare', 'non usare'], explain: 'TU negativo: NON + INFINITIVO. Non mangiare / non usare (no non mangia / non usa).' },
          { scene: 'Sugerencia NOI', prompt: 'Traduce al italiano: "¡Vamos a practicar la pronunciación juntos!" (praticare = practicar, pronuncia = pronunciación, insieme = juntos)', answer: 'Pratichiamo la pronuncia insieme!', accepted: ['pratichiamo'], explain: 'NOI: pratichiamo! = ¡Practiquemos! (prima persona plurale).' },
          { scene: 'VOI instrucciones', prompt: 'Traduce al italiano (VOI): "¡Estudiad el vocabulario y haced los ejercicios!" (studiare = estudiar, vocabolario = vocabulario, fare = hacer, esercizi = ejercicios)', answer: 'Studiate il vocabolario e fate gli esercizi!', accepted: ['studiate', 'fate'], explain: 'studiate (VOI de studiare: -ate) + fate (VOI irregular de fare). Fai/fate/facciamo.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Missione comunicativa',
        tag: 'Producción',
        intro: 'Usa el imperativo en situaciones reales.',
        type: 'write',
        items: [
          { scene: 'Sé profesor por un momento', prompt: 'Imagina que eres Bruno y das instrucciones a TU estudiante. Escribe 4 instrucciones: 2 afirmativas y 2 negativas. Usa: ascoltare, scrivere, parlare, guardare (il telefono), mangiare.', answer: 'Ascolta bene! Scrivi le parole. Non parlare in spagnolo! Non guardare il telefono!', accepted: ['ascolta', 'scrivi', 'non', 'are'], explain: 'TU afirmativo: ascolta, scrivi (-are → -a; -ere → -i). TU negativo: non + infinitivo (non parlare, non guardare).' },
          { scene: 'Instrucciones para el grupo', prompt: 'Escribe 3 instrucciones para todo el grupo (VOI) al final de una clase de italiano. Usa: ripassare (repasar), studiare, fare (i compiti = los deberes).', answer: 'Ripassate il vocabolario! Studiate la grammatica! Fate i compiti!', accepted: ['ripassate', 'studiate', 'fate'], explain: 'VOI: -are → -ate (ripassate, studiate); fare irregular → fate. ¡Así habla un profesor en Italia!' },
        ],
      },
    ],
  },
}

export default topic
