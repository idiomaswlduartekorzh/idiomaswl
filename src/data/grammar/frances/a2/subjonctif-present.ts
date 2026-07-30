import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'subjonctif-present',
  order: '12',
  color: '#1a2ecc',
  category: 'Modos verbales',
  level: 'A2',
  title: 'Subjuntivo presente en francés A2: il faut que, vouloir que',
  shortTitle: 'Subjuntivo presente',
  metaTitle: 'Subjuntivo presente francés A2 — il faut que, vouloir que, subjonctif présent',
  description:
    'El subjonctif présent en francés se usa después de expresiones de obligación (il faut que), voluntad (vouloir que, souhaiter que), emoción (être content que, avoir peur que) y duda (douter que). Se forma desde la raíz de la 3ª persona plural del presente (-ent): que je parle, que tu parles, qu\'il parle, que nous parlions, que vous parliez, qu\'ils parlent. Verbos irregulares: être (soit), avoir (ait), aller (aille), faire (fasse), pouvoir (puisse), vouloir (veuille).',
  lead: 'Il faut que tu parles — le subjonctif après les expressions de nécessité et de volonté.',
  outcomes: [
    'Formar el subjonctif présent de verbos regulares',
    'Usar il faut que, vouloir que, souhaiter que + subjonctif',
    'Reconocer los verbos irregulares être/avoir/aller/faire',
    'Distinguir cuándo se usa subjonctif vs indicatif',
  ],

  guide: {
    goal: 'Usar el subjonctif présent después de expresiones de necesidad, voluntad y emoción.',
    model: 'Il faut que tu fasses tes devoirs. (Tienes que hacer tus deberes.) / Je veux que tu sois à l\'heure. (Quiero que llegues a tiempo.)',
    formula: 'que + sujet + subjonctif | raíz = ils-ent (3ª pl) + terminaciones: -e/-es/-e/-ions/-iez/-ent',
    decisions: [
      'Obligación: il faut que + subj → "Il faut que vous arriviez tôt"',
      'Voluntad: vouloir/souhaiter que + subj → "Je veux que tu viennes"',
      'Emoción: être content/triste que + subj → "Je suis content que tu sois là"',
      'Irregulares: être → soit | avoir → ait | aller → aille | faire → fasse | pouvoir → puisse',
      'Mismo sujeto → infinitivo: "Je veux partir" (no "que je parte")',
    ],
    table: [
      ['Expresión', 'Uso', 'Ejemplo'],
      ['il faut que', 'necesidad impersonal', 'Il faut que vous fassiez attention'],
      ['vouloir/souhaiter que', 'voluntad', 'Je veux qu\'il vienne'],
      ['être content/triste que', 'emoción', 'Je suis content que tu sois là'],
    ],
    mistakes: [
      '"Il faut que tu viens" ❌ → "Il faut que tu viennes" ✓ — après il faut que → subjonctif.',
      '"Je veux partir" ✓ (mismo sujeto) vs "Je veux qu\'il parte" ✓ (sujetos distintos).',
      '"Il faut que j\'être" ❌ → "Il faut que je sois" ✓ — être es irregular en subjonctif.',
    ],
  },

  seo: [
    {
      heading: '¿Cuándo se usa el subjonctif présent en francés?',
      paragraphs: [
        'El subjonctif aparece obligatoriamente después de ciertas conjunciones y expresiones: necesidad (il faut que, il est nécessaire que), voluntad (vouloir que, souhaiter que, désirer que), emoción (être heureux/triste/surpris que, avoir peur que) y duda (douter que, ne pas croire que). Siempre hay dos sujetos diferentes: uno en la oración principal y otro en la cláusula con que.',
        'Si los dos verbos tienen el mismo sujeto, se usa el infinitivo en lugar del subjonctif: "Je veux partir" (yo quiero irme yo) vs "Je veux que tu partes" (yo quiero que tú te vayas).',
      ],
    },
    {
      heading: '¿Cómo se forma el subjonctif présent en francés?',
      paragraphs: [
        'Para verbos regulares, toma la forma "ils" del présent indicatif, quita -ent, y añade: -e, -es, -e, -ions, -iez, -ent. Ejemplo con parler: ils parlent → parl- → que je parle, que tu parles, qu\'il parle, que nous parlions, que vous parliez, qu\'ils parlent. El truco: "nous" y "vous" son iguales al imparfait indicatif.',
        'Los irregulares más importantes: être → que je sois, que tu sois, qu\'il soit; avoir → que j\'aie, que tu aies, qu\'il ait; aller → que j\'aille, que tu ailles, qu\'il aille; faire → que je fasse; pouvoir → que je puisse; vouloir → que je veuille.',
      ],
    },
    {
      heading: '¿Qué expresiones exigen subjonctif en francés?',
      paragraphs: [
        'El subjonctif aparece tras expresiones de voluntad, emoción, duda, necesidad y ciertas conjunciones, casi siempre con la estructura "… que + sujeto distinto": vouloir que, il faut que, être content que, avoir peur que, bien que, pour que, avant que, à condition que. "Il faut que tu viennes", "Je veux que tu saches", "Bien qu\'il soit tard…". Si el sujeto es el mismo, se usa infinitivo, no subjonctif ("Je veux venir", no "que je vienne"). Es el mismo reparto del español (quiero venir / quiero que vengas), así que la intuición ayuda; lo nuevo son las formas francesas irregulares (que je sois, que j\'aie, que je fasse, que j\'aille, que je puisse).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'il faut que / vouloir que + subj. Irregulares: soit/ait/aille/fasse.',
    graphicPrompt: 'Flecha de voluntad: "Je veux que..." apuntando a otro personaje.',
    scene: [
      ['Il faut que tu arrives à l\'heure.', 'Tienes que llegar a tiempo.'],
      ['Je veux que tu fasses tes devoirs.', 'Quiero que hagas tus deberes.'],
      ['Il est important que vous soyez là.', 'Es importante que estéis aquí.'],
      ['Elle souhaite que nous venions demain.', 'Desea que vengamos mañana.'],
      ['Il faut que j\'aille à la banque.', 'Tengo que ir al banco.'],
      ['Je suis content que tu puisses venir.', 'Me alegra que puedas venir.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['il faut que + subj', 'vouloir que + subj', 'soit/ait/aille/fasse', 'mismo sujeto → infinitivo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta del subjonctif',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta del subjonctif présent.',
        type: 'choice',
        items: [
          {
            scene: 'Il faut que tu ___ (être) à l\'heure.',
            lines: [['', 'Il faut que tu ___ à l\'heure.']],
            options: ['sois', 'es', 'étais', 'seras'],
            answer: 'sois',
            explain: '"que tu sois" — être irregular en subj: sois. Après il faut que → subjonctif.',
          },
          {
            scene: 'Je veux que vous ___ (faire) un effort.',
            lines: [['', 'Je veux que vous ___ un effort.']],
            options: ['fassiez', 'faites', 'feriez', 'ferez'],
            answer: 'fassiez',
            explain: '"que vous fassiez" — faire irregular: fasse/fasses/fasse/fassions/fassiez/fassent.',
          },
          {
            scene: 'Il faut qu\'il ___ (aller) chez le médecin.',
            lines: [['', 'Il faut qu\'il ___ chez le médecin.']],
            options: ['aille', 'va', 'irait', 'ira'],
            answer: 'aille',
            explain: '"qu\'il aille" — aller irregular: j\'aille, tu ailles, il aille, nous allions, vous alliez, ils aillent.',
          },
          {
            scene: 'Je souhaite que tu ___ (parler) avec lui.',
            lines: [['', 'Je souhaite que tu ___ avec lui.']],
            options: ['parles', 'parle', 'parlas', 'parleras'],
            answer: 'parles',
            explain: '"que tu parles" — regular: parler → parl- + -es (tu).',
          },
          {
            scene: 'Il est important que nous ___ (avoir) les documents.',
            lines: [['', 'Il est important que nous ___ les documents.']],
            options: ['ayons', 'avons', 'aurions', 'aurons'],
            answer: 'ayons',
            explain: '"que nous ayons" — avoir irregular: aie/aies/ait/ayons/ayez/aient.',
          },
          {
            scene: 'Elle veut ___ (partir) tôt. (mismo sujeto)',
            lines: [['', 'Elle veut ___ tôt.']],
            options: ['partir', 'qu\'elle parte', 'parte', 'partirait'],
            answer: 'partir',
            explain: '"Elle veut partir" — mismo sujeto → infinitivo, NO subjonctif.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Subjonctif con dos expresiones',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta del subjonctif.',
        type: 'dual',
        items: [
          {
            scene: 'Il faut que tu finisses et que tu partes.',
            lines: [['', 'Il faut que tu [[0]] ton travail et que tu [[1]] à temps.']],
            blanks: [
              { options: ['finisses', 'finis', 'finiras', 'finissais'], answer: 'finisses', explain: '"que tu finisses" — finir → finiss- + -es.' },
              { options: ['partes', 'pars', 'partiras', 'partais'], answer: 'partes', explain: '"que tu partes" — partir → part- + -es.' },
            ],
          },
          {
            scene: 'Je veux que vous veniez et que vous soyez ponctuels.',
            lines: [['', 'Je veux que vous [[0]] et que vous [[1]] ponctuels.']],
            blanks: [
              { options: ['veniez', 'venez', 'viendrez', 'veniez'], answer: 'veniez', explain: '"que vous veniez" — venir: viens → vien- (sing.) / ven- (pl.) → vous veniez.' },
              { options: ['soyez', 'êtes', 'seriez', 'serez'], answer: 'soyez', explain: '"que vous soyez" — être irregular: soyez (vous).' },
            ],
          },
          {
            scene: 'Il faut que j\'aille et que je fasse les courses.',
            lines: [['', 'Il faut que j\'[[0]] au marché et que je [[1]] les courses.']],
            blanks: [
              { options: ['aille', 'vais', 'irai', 'allais'], answer: 'aille', explain: '"que j\'aille" — aller irregular.' },
              { options: ['fasse', 'fais', 'ferai', 'faisais'], answer: 'fasse', explain: '"que je fasse" — faire irregular.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El profesor insiste',
        tag: 'Texto guiado',
        intro: 'Completa lo que dice el profesor usando subjonctif.',
        type: 'guidedText',
        scene: 'Le professeur parle à ses étudiants avant l\'examen.',
        text: 'Il faut que vous [[0]] attentifs pendant l\'examen. Il est important que chacun [[1]] son propre travail. Je veux que vous [[2]] le temps de relire. Il faut aussi que vous [[3]] vos téléphones. Et je souhaite que tout le monde [[4]] de son mieux.',
        blanks: [
          { options: ['soyez', 'êtes', 'seriez', 'serez'], answer: 'soyez', explain: '"que vous soyez / que vous preniez" — être: soyez. prendre: que vous preniez.' },
          { options: ['fasse', 'fait', 'ferait', 'fera'], answer: 'fasse', explain: '"que chacun fasse / que tout le monde fasse" — faire irregular: fasse (3ª sg).' },
          { options: ['éteigniez', 'éteignez', 'éteigniez', 'éteindrez'], answer: 'éteigniez', explain: '"que vous éteigniez" — éteindre → ils éteignent → éteing- → éteigniez.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el subjonctif',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta del subjonctif présent.',
        type: 'freeText',
        scene: 'Complétez avec le subjonctif présent.',
        text: 'Il faut que je [[0]] (avoir) le temps. / Je souhaite que tu [[1]] (être) heureux. / Il est nécessaire qu\'elle [[2]] (aller) à la réunion. / Il faut que nous [[3]] (faire) attention.',
        blanks: [
          { answer: 'aie', explain: '"que j\'aie" — avoir irregular: aie (je).' },
          { answer: 'sois', explain: '"que tu sois" — être irregular: sois (tu).' },
          { answer: 'aille', explain: '"qu\'elle aille" — aller irregular: aille (il/elle).' },
          { answer: 'fassions', explain: '"que nous fassions" — faire irregular: fassions (nous).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa necesidad o voluntad',
        tag: 'Escritura guiada',
        intro: 'Escribe una frase completa usando il faut que o vouloir que.',
        type: 'write',
        items: [
          {
            scene: 'Tienes que estudiar más (tú).',
            prompt: 'Usa "il faut que" + subjonctif de "étudier".',
            answer: 'Il faut que tu étudies plus.',
            accepted: ['Il faut que tu étudies davantage.'],
            explain: '"que tu étudies" — regular: étudi- + -es.',
          },
          {
            scene: 'Quiero que él sea feliz.',
            prompt: 'Usa "vouloir que" + subjonctif de "être".',
            answer: 'Je veux qu\'il soit heureux.',
            accepted: ['Je veux qu\'il soit content.'],
            explain: '"qu\'il soit" — être irregular en subj: soit.',
          },
          {
            scene: 'Es importante que vosotros lleguéis a tiempo.',
            prompt: 'Usa "il est important que" + subjonctif de "arriver".',
            answer: 'Il est important que vous arriviez à l\'heure.',
            accepted: ['Il est important que vous arriviez à temps.'],
            explain: '"que vous arriviez" — arriver → arriv- + -iez (vous).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Lo que quieres para los demás',
        tag: 'Escritura libre',
        intro: 'Escribe sobre lo que quieres o es necesario para tu familia/amigos.',
        type: 'write',
        items: [
          {
            scene: 'Escribe 3 cosas que quieres para alguien cercano.',
            prompt: 'Utilisez "je veux que / je souhaite que / je suis content(e) que" + subjonctif.',
            answer: 'Je veux que mon ami soit heureux dans sa nouvelle ville. Je souhaite qu\'il aille bien. Je suis content qu\'il ait trouvé un bon travail.',
            accepted: ['Je veux que ma sœur réussisse ses examens. Je souhaite qu\'elle soit fière d\'elle. Il faut qu\'elle fasse des efforts.'],
            explain: 'soit (être), aille (aller), ait (avoir) = irregulares del subjonctif.',
          },
          {
            scene: 'Escribe las reglas de tu casa o trabajo.',
            prompt: 'Utilisez "il faut que + subjonctif" pour 3 règles.',
            answer: 'Dans notre appartement, il faut que tout le monde fasse la vaisselle. Il faut que nous soyons silencieux après 22h. Il faut aussi que chacun range ses affaires.',
            accepted: ['Au bureau, il faut que nous arrivions à l\'heure. Il faut que les réunions commencent ponctuellement. Il faut que chacun fasse son travail sérieusement.'],
            explain: 'fasse (faire), soyons (être), range/commencent (régulier) = subjonctif.',
          },
        ],
      },
    ],
  },
}

export default topic
