import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'periodo-ipotetico-reale-a2',
  order: '19',
  color: '#009246',
  category: 'Sintaxis',
  level: 'A2',
  title: 'Il periodo ipotetico reale en italiano A2: se + presente → futuro',
  shortTitle: 'Periodo ipotetico reale',
  metaTitle: 'Condicional real en italiano A2 — Se + presente indicativo + futuro',
  description:
    'El período hipotético real (della realtà) expresa condiciones posibles o probables. Se construye con "se + presente indicativo" en la cláusula condicional y "futuro semplice o presente indicativo o imperativo" en la cláusula principal. Es la estructura condicional más frecuente en italiano A2.',
  lead: 'Se studi, passerai l\'esame: el condicional real italiano que expresa lo posible.',
  outcomes: [
    'Construir el período hipotético real con se + presente → futuro',
    'Distinguirlo del hipotético irreal (se + congiuntivo imperfetto → condizionale)',
    'Usar el imperativo en la cláusula principal como alternativa al futuro',
    'Invertir el orden de las cláusulas correctamente',
  ],

  guide: {
    goal: 'Expresar condiciones reales y posibles usando se + presente indicativo + futuro/presente/imperativo.',
    model: 'Se piove, non esco. / Se studi, passerai l\'esame. / Se hai fame, mangia qualcosa!',
    formula: 'Se + presente indicativo, + futuro semplice / presente / imperativo',
    decisions: [
      'Hipotético REAL: la condición es posible → se + PRESENTE, resultado en FUTURO o PRESENTE',
      '"Se piove" (si llueve) → "non esco" (no salgo) o "non uscirò" (no saldré)',
      'El imperativo como resultado da la frase un tono más directo: "Se hai fame, mangia!"',
      'El orden puede invertirse: "Passerai l\'esame se studi." (sin coma si la hipótesis va al final)',
      'Hipotético IRREAL (A2+): se + congiuntivo imperfetto → condizionale presente (diferente estructura)',
    ],
    table: [
      ['Cláusula "se"', 'Cláusula resultado', 'Tipo'],
      ['Se piove', 'non esco (presente)', 'hábito / verdad general'],
      ['Se studi', 'passerai l\'esame (futuro)', 'condición posible'],
      ['Se hai fame', 'mangia! (imperativo)', 'consejo / instrucción'],
      ['Se arrivi tardi', 'ti aspetteremo (futuro)', 'situación probable'],
    ],
    mistakes: [
      '"Se studierò, passerò l\'esame" ❌ (el futuro en la cláusula "se" es incorrecto en italiano) → "Se studi, passerai l\'esame" ✓.',
      '"Se studi, passeresti l\'esame" ❌ (condizionale en periodo reale) → "Se studi, passerai" ✓.',
      '"Se hai freddo, chiudi la finestra" ✓ — El presente en la principal es válido para hábitos/consejos.',
    ],
  },

  seo: [
    {
      heading: 'El período hipotético real en italiano',
      paragraphs: [
        'El período hipotético real (o "della realtà") describe situaciones que son posibles o probables. La estructura es: "Se + presente indicativo" en la hipótesis y "futuro semplice" (o presente o imperativo) en el resultado.',
        'A diferencia del español, en italiano NO se usa el futuro después de "se": "Se STUDI" (no "se studierai") + "passerai l\'esame". El presente en la cláusula "se" es obligatorio en el período hipotético real italiano.',
      ],
    },
    {
      heading: 'Período real vs irreal',
      paragraphs: [
        'En el nivel A2, la distinción clave es: el período REAL usa presente en la hipótesis y expresa algo posible. El período IRREAL (B1) usa il congiuntivo imperfetto en la hipótesis para situaciones imposibles o muy improbables.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Periodo ipotetico reale: se + presente → futuro para condiciones posibles.',
    graphicPrompt: 'Bifurcación en un camino con la lluvia como condición y dos caminos (salir o no salir).',
    scene: [
      ['Se piove, prendo l\'ombrello.', 'Si llueve, cojo el paraguas.'],
      ['Se studi, passerai l\'esame.', 'Si estudias, pasarás el examen.'],
      ['Se hai fame, mangia qualcosa!', 'Si tienes hambre, ¡come algo!'],
      ['Se arrivi tardi, chiama.', 'Si llegas tarde, llama.'],
      ['Se fa bello, andiamo al mare.', 'Si hace buen tiempo, vamos al mar.'],
      ['Se non capisci, chiedi aiuto.', 'Si no entiendes, pide ayuda.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['se + presente', 'futuro nella principale', 'no futuro dopo se'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma verbal correcta para el periodo ipotetico reale.',
        type: 'choice',
        items: [
          {
            scene: 'Condición posible: estudiar bien → pasar el examen.',
            lines: [['', 'Se studi bene, ___ l\'esame.']],
            options: ['passerai', 'passeresti', 'passa', 'passassi'],
            answer: 'passerai',
            explain: 'Periodo reale: se + presente → futuro. "passerai" = futuro di "passare".',
          },
          {
            scene: 'La cláusula "se" correcta.',
            lines: [['', '___ piove, prendo l\'ombrello.']],
            options: ['Se', 'Se pioverà,', 'Se piovesse,', 'Quando'],
            answer: 'Se',
            explain: '"Se" + presente indicativo → la forma correcta para el periodo reale.',
          },
          {
            scene: 'Dando un consejo a alguien con hambre.',
            lines: [['', 'Se hai fame, ___ qualcosa.']],
            options: ['mangia', 'mangerai', 'mangeresti', 'mangiassi'],
            answer: 'mangia',
            explain: 'El imperativo en la principal es válido: "Se hai fame, mangia!" (consejo directo).',
          },
          {
            scene: 'Situación probable si alguien llega tarde.',
            lines: [['', 'Se arrivi tardi, ___ senza di te.']],
            options: ['partiamo', 'partiremmo', 'partissimo', 'partiremo'],
            answer: 'partiremo',
            explain: '"partiremo" = futuro di "partire" → periodo reale.',
          },
          {
            scene: 'Una verdad general sobre el tiempo.',
            lines: [['', 'Se ___ sole, fa caldo.']],
            options: ['c\'è', 'ci sarà', 'ci fosse', 'ci sia'],
            answer: 'c\'è',
            explain: 'Verdad general → se + presente / presente: "Se c\'è sole, fa caldo."',
          },
          {
            scene: 'Consejo a alguien que no entiende.',
            lines: [['', 'Se non ___, chiedi all\'insegnante.']],
            options: ['capisci', 'capirai', 'capisca', 'capiresti'],
            answer: 'capisci',
            explain: '"Se non capisci" → presente indicativo en la cláusula "se".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos cláusulas del período',
        tag: '2 espacios',
        intro: 'Completa ambas cláusulas del período hipotético real.',
        type: 'dual',
        items: [
          {
            scene: 'Si hace frío, me pongo el abrigo.',
            lines: [['', 'Se [[0]] freddo, [[1]] il cappotto.']],
            blanks: [
              { options: ['fa', 'farà', 'facesse', 'faccia'], answer: 'fa', explain: '"Se fa freddo" → presente en la hipótesis.' },
              { options: ['metto', 'metterò', 'metterei', 'mettessi'], answer: 'metterò', explain: '"metterò" = futuro → período reale (también válido: "metto").' },
            ],
          },
          {
            scene: 'Si tienes tiempo, ven a verme.',
            lines: [['', 'Se [[0]] tempo, [[1]] a trovarmi!']],
            blanks: [
              { options: ['hai', 'avrai', 'avessi', 'abbia'], answer: 'hai', explain: '"Se hai tempo" → presente indicativo.' },
              { options: ['vieni', 'verrai', 'verresti', 'venissi'], answer: 'vieni', explain: '"vieni" = imperativo → consejo/invitación directa.' },
            ],
          },
          {
            scene: 'Si trabajan bien, recibirán un aumento.',
            lines: [['', 'Se [[0]] bene, [[1]] un aumento.']],
            blanks: [
              { options: ['lavorano', 'lavoreranno', 'lavorassero', 'lavorino'], answer: 'lavorano', explain: '"Se lavorano" → presente indicativo (plural).' },
              { options: ['riceveranno', 'riceverebbero', 'ricevessero', 'ricevono'], answer: 'riceveranno', explain: '"riceveranno" = futuro plural → período reale.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Consejos y condiciones',
        tag: 'Texto guiado',
        intro: 'Completa las oraciones con la forma correcta del periodo ipotetico reale.',
        type: 'guidedText',
        scene: 'Una madre le da consejos a su hijo antes de un viaje.',
        text: 'Se [[0]] freddo, metti il cappotto. Se [[1]] fame, mangia qualcosa al bar. Se [[2]] tardi, chiamami. Se perdi il treno, [[3]] il prossimo. Non [[4]] se stai bene.',
        blanks: [
          { options: ['fa', 'farà', 'facesse', 'faccia'], answer: 'fa', explain: '"Se fa freddo" → presente.' },
          { options: ['hai', 'avrai', 'avessi', 'abbia'], answer: 'hai', explain: '"Se hai fame" → presente.' },
          { options: ['arrivi', 'arriverai', 'arrivassi', 'arrivi'], answer: 'arrivi', explain: '"Se arrivi tardi" → presente.' },
          { options: ['prendi', 'prenderai', 'prenderesti', 'prendessi'], answer: 'prendi', explain: 'Imperativo como resultado: "prendi il prossimo".' },
          { options: ['preoccuparti', 'ti preoccupare', 'preoccupi', 'preoccuparsi'], answer: 'preoccuparti', explain: '"Non preoccuparti" → imperativo negativo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con la forma correcta',
        tag: 'Texto libre',
        intro: 'Sin opciones: conjuga los verbos entre paréntesis en el tiempo correcto.',
        type: 'freeText',
        scene: 'Condiciones para un buen fin de semana.',
        text: 'Se ___ (fare) bello domani, andiamo al parco. / Se ___ (avere) soldi, comprerò un regalo. / Se ___ (venire) anche tu, sarà più divertente. / Se non ___ (capire), chiedi. / Se ___ (studiare) adesso, domani sarai libero.',
        blanks: [
          { answer: 'fa', explain: '"Se fa" → presente indicativo 3ª sing.' },
          { answer: 'ho', explain: '"Se ho" → presente indicativo 1ª sing.' },
          { answer: 'vieni', explain: '"Se vieni" → presente indicativo 2ª sing.' },
          { answer: 'capisci', explain: '"Se non capisci" → presente indicativo 2ª sing.' },
          { answer: 'studi', explain: '"Se studi" → presente indicativo 2ª sing.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Combina las dos frasi',
        tag: 'Escritura guiada',
        intro: 'Une las dos oraciones en un periodo ipotetico reale.',
        type: 'write',
        items: [
          {
            scene: '"Piove." + "Non esco." → Unísci con "se".',
            prompt: 'Piove. Non esco.',
            answer: 'Se piove, non esco.',
            accepted: ['Non esco se piove.'],
            explain: '"Se + presente, + presente/futuro." Sin coma si la hipótesis va al final.',
          },
          {
            scene: '"Studi molto." + "Passerai l\'esame." → Unísci.',
            prompt: 'Studi molto. Passerai l\'esame.',
            answer: 'Se studi molto, passerai l\'esame.',
            accepted: ['Passerai l\'esame se studi molto.'],
            explain: '"se + presente → futuro" → periodo reale con condición posible.',
          },
          {
            scene: '"Hai tempo." + "Aiutami!" → Unísci.',
            prompt: 'Hai tempo. Aiutami!',
            answer: 'Se hai tempo, aiutami!',
            accepted: ['Aiutami se hai tempo!'],
            explain: 'Imperativo en la principal → tono directo y personal.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Crea periodi ipotetici reali',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales con el período hipotético real.',
        type: 'write',
        items: [
          {
            scene: 'Escribe un consejo para alguien que quiere aprender italiano.',
            prompt: 'Scrivi un consiglio usando "se + presente → futuro/imperativo".',
            answer: 'Se studi ogni giorno, parlerai italiano molto bene.',
            accepted: [
              'Se ascolti musica italiana, imparerai le parole nuove.',
              'Se pratichi con i madrelingua, migliorerai velocemente.',
            ],
            explain: '"Se + presente, futuro" → periodo ipotetico reale per dare consigli.',
          },
          {
            scene: 'Escribe una condición para este fin de semana.',
            prompt: 'Scrivi cosa farai questo fine settimana se il tempo è buono.',
            answer: 'Se fa bello, andrò in bici con gli amici.',
            accepted: [
              'Se non piove, faremo un picnic al parco.',
              'Se c\'è il sole, andiamo al mare.',
            ],
            explain: 'Período hipotético real para planes dependientes de condiciones.',
          },
        ],
      },
    ],
  },
}

export default topic
