import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'partizip-als-adjektiv-a2',
  order: '20',
  color: '#c9a900',
  category: 'Adjetivos',
  level: 'A2',
  title: 'Partizip I y II como adjetivo en alemán A2',
  shortTitle: 'Partizip als Adjektiv',
  metaTitle: 'Participio como adjetivo en alemán A2 — das schlafende Kind, das gelesene Buch',
  description:
    'En alemán, tanto el Partizip I (forma en -end) como el Partizip II pueden usarse como adjetivos antes de un sustantivo. El Partizip I indica una acción en curso, el Partizip II una acción completada. Ambos se declinan como adjetivos normales.',
  lead: 'El niño durmiendo, el libro leído: participios que funcionan como adjetivos en alemán.',
  outcomes: [
    'Formar el Partizip I con -end (laufend, schlafend, lächelnd)',
    'Usar el Partizip II como adjetivo (gelesene, gekaufte, gemachte)',
    'Declinar el participio-adjetivo según el artículo y el género',
    'Distinguir el significado activo (Partizip I) del pasivo/resultativo (Partizip II)',
  ],

  guide: {
    goal: 'Usar el Partizip I y Partizip II como adjetivos atributivos con declinación correcta.',
    model: 'Das schlafende Kind. (El niño que duerme.) / Das gelesene Buch. (El libro que fue leído.)',
    formula: 'Partizip I: Infinitiv + d + Adjektivendung | Partizip II: ge- + Stamm + -t/-en + Adjektivendung',
    decisions: [
      'Partizip I (aktiv, gleichzeitig): acción en progreso simultánea al verbo principal — schlaf+end = schlafend',
      'Partizip II (passiv/resultativ): acción completada o resultado — gelesen, gekauft, gemacht',
      'Ambos se declinan como adjetivos normales: bestimmter Artikel → schwache Deklination',
      'Maskuli: der schlafende Mann / das weinende Kind / die lachende Frau',
      'Akk/Dat/Gen también toman las terminaciones normales de adjetivos',
    ],
    table: [
      ['Partizip', 'Typ', 'Beispiel mit Artikel'],
      ['schlafend', 'Partizip I (aktiv)', 'das schlafende Baby'],
      ['lachend', 'Partizip I (aktiv)', 'die lachende Frau'],
      ['gelesen', 'Partizip II (passiv)', 'das gelesene Buch'],
      ['gekauft', 'Partizip II (passiv)', 'der gekaufte Wein'],
      ['gemacht', 'Partizip II (passiv)', 'die gemachte Aufgabe'],
    ],
    mistakes: [
      '"das schlafende Kind" ✓ pero "ein schlafendes Kind" ✓ — la terminación varía según el artículo (bestimmt/unbestimmt).',
      '"das gelesen Buch" ❌ → "das gelesene Buch" ✓ — No olvides la terminación del adjetivo después del Partizip II.',
      '"das kaufend Produkt" ❌ → "das gekaufte Produkt" ✓ — Para resultado/pasado se usa Partizip II, no I.',
    ],
  },

  seo: [
    {
      heading: 'Partizip I como adjetivo: acción simultánea',
      paragraphs: [
        'El Partizip I se forma añadiendo -d al infinitivo: schlafen → schlafend, lachen → lachend, laufen → laufend. Cuando se usa como adjetivo antes de un sustantivo, recibe la terminación normal del adjetivo.',
        '"Das schlafende Kind" significa literalmente "el niño que está durmiendo" — la acción de dormir ocurre al mismo tiempo que el verbo principal. Es equivalente a una cláusula de relativo con presente.',
      ],
    },
    {
      heading: 'Partizip II como adjetivo: acción completada',
      paragraphs: [
        'El Partizip II usado como adjetivo describe el resultado de una acción pasada. "Das gelesene Buch" = el libro que ha sido leído / el libro (ya) leído. Funciona como una cláusula de relativo pasiva en pasado.',
        'Los verbos inseparables no llevan ge-: das besuchte Museum (no *das gebesuchte Museum). Los verbos con -ieren tampoco: das reparierte Auto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Partizip I (acción en curso como adjetivo) vs Partizip II (resultado como adjetivo).',
    graphicPrompt: 'Un bebé durmiendo (schlafendes Baby) y un libro ya leído (gelesenes Buch).',
    scene: [
      ['Das schlafende Baby ist süß.', 'El bebé que duerme es tierno.'],
      ['Ich mag das gelesene Buch.', 'Me gusta el libro (ya) leído.'],
      ['Der weinende Mann tut mir leid.', 'El hombre que llora me da pena.'],
      ['Das gekaufte Geschenk ist perfekt.', 'El regalo comprado es perfecto.'],
      ['Die lachenden Kinder spielen draußen.', 'Los niños que ríen juegan afuera.'],
      ['Die bestellte Pizza ist endlich da.', 'La pizza pedida finalmente llegó.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['Partizip I -end', 'Partizip II como adjetivo', 'terminaciones de adjetivo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Partizip I o Partizip II',
        tag: 'Opción múltiple',
        intro: 'Elige si se necesita el Partizip I (-end) o el Partizip II.',
        type: 'choice',
        items: [
          {
            scene: 'El perro que está ladrando molesta a los vecinos.',
            lines: [['', 'Der ___ Hund stört die Nachbarn. (bellen)']],
            options: ['bellende', 'gebellte', 'bellend', 'gebellt'],
            answer: 'bellende',
            explain: 'Acción en curso → Partizip I: bellen → bellend + -e (nach "der").',
          },
          {
            scene: 'El pastel ya horneado huele bien.',
            lines: [['', 'Der ___ Kuchen riecht gut. (backen)']],
            options: ['gebackene', 'backende', 'gebacken', 'backend'],
            answer: 'gebackene',
            explain: 'Resultado de la acción → Partizip II: gebacken + -e.',
          },
          {
            scene: 'La mujer que sonríe trabaja aquí.',
            lines: [['', 'Die ___ Frau arbeitet hier. (lächeln)']],
            options: ['lächelnde', 'gelächelte', 'lächelnd', 'gelächeln'],
            answer: 'lächelnde',
            explain: 'Acción simultánea → Partizip I: lächeln → lächelnd + -e.',
          },
          {
            scene: 'Las cartas escritas están sobre la mesa.',
            lines: [['', 'Die ___ Briefe liegen auf dem Tisch. (schreiben)']],
            options: ['geschriebenen', 'schreibenden', 'geschrieben', 'schreibend'],
            answer: 'geschriebenen',
            explain: 'Resultado → Partizip II: geschrieben + -en (plural Akkusativ/Nominativ nach "die").',
          },
          {
            scene: 'El niño que corre es mi hijo.',
            lines: [['', 'Das ___ Kind ist mein Sohn. (laufen)']],
            options: ['laufende', 'gelaufene', 'laufend', 'gelaufen'],
            answer: 'laufende',
            explain: 'Acción en curso → Partizip I: laufen → laufend + -e.',
          },
          {
            scene: 'El coche reparado funciona bien.',
            lines: [['', 'Das ___ Auto funktioniert gut. (reparieren)']],
            options: ['reparierte', 'reparierende', 'repariert', 'reparierend'],
            answer: 'reparierte',
            explain: 'Resultado → Partizip II: repariert + -e. Verbos en -ieren no llevan ge-.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Forma y declinación',
        tag: '2 espacios',
        intro: 'Elige el participio correcto y su terminación adecuada.',
        type: 'dual',
        items: [
          {
            scene: 'El libro recién comprado.',
            lines: [['', 'Das [[0]] Buch ist neu. (kaufen → Partizip II)']],
            blanks: [
              { options: ['gekaufte', 'kaufende', 'gekauft', 'kaufend'], answer: 'gekaufte', explain: 'Partizip II de "kaufen" = "gekauft" + Adjektivendung -e (neutro Nom. mit bestimmtem Artikel).' },
              { options: ['—', 'zu', 'schon', 'immer'], answer: '—', explain: 'No se necesita palabra adicional aquí.' },
            ],
          },
          {
            scene: 'Los estudiantes que trabajan duro.',
            lines: [['', 'Die [[0]] Studenten lernen viel. (arbeiten → Partizip I)']],
            blanks: [
              { options: ['arbeitenden', 'gearbeiteten', 'arbeitend', 'gearbeitet'], answer: 'arbeitenden', explain: 'Partizip I de "arbeiten" = "arbeitend" + -en (plural nach bestimmtem Artikel).' },
              { options: ['—', 'sehr', 'immer', 'auch'], answer: '—', explain: 'No hay segunda palabra necesaria.' },
            ],
          },
          {
            scene: 'La puerta cerrada.',
            lines: [['', 'Die [[0]] Tür öffnete er langsam. (schließen → Partizip II)']],
            blanks: [
              { options: ['geschlossene', 'schließende', 'geschlossen', 'schließend'], answer: 'geschlossene', explain: 'Partizip II de "schließen" = geschlossen + -e (feminin Nom.).' },
              { options: ['—', 'zu', 'schon', 'weit'], answer: '—', explain: 'No hay segunda palabra.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Participios en un texto',
        tag: 'Texto guiado',
        intro: 'Elige el Partizip correcto en cada espacio.',
        type: 'guidedText',
        scene: 'Descripción de una escena en un parque.',
        text: 'Im Park sehe ich viele [[0]] Kinder. (spielen → P.I.) Ein [[1]] Hund läuft frei. (laufen → P.I.) Auf der Bank sitzt eine [[2]] Frau. (lesen → P.II.) Die [[3]] Bücher liegen neben ihr. (lesen → P.II.) Ein [[4]] Vogel singt laut. (singen → P.I.)',
        blanks: [
          { options: ['spielende', 'gespielte', 'spielend', 'gespielt'], answer: 'spielende', explain: 'Partizip I: spielen → spielend + -e (Plural).' },
          { options: ['laufender', 'gelaufener', 'laufend', 'gelaufen'], answer: 'laufender', explain: 'Partizip I: laufen → laufend + -er (maskulin Nom. ohne Artikel → starke Deklination).' },
          { options: ['lesende', 'gelesene', 'lesend', 'gelesen'], answer: 'lesende', explain: 'Acción simultánea → Partizip I: lesen → lesend + -e.' },
          { options: ['gelesenen', 'lesenden', 'gelesen', 'lesend'], answer: 'gelesenen', explain: 'Libros ya leídos → Partizip II: gelesen + -en (Plural mit bestimmtem Artikel).' },
          { options: ['singender', 'gesungener', 'singend', 'gesungen'], answer: 'singender', explain: 'Partizip I: singen → singend + -er (Mask. Nom. ohne Artikel).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el participio como adjetivo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el participio correcto con su terminación.',
        type: 'freeText',
        scene: 'Describiendo objetos y personas en casa.',
        text: 'Ich suche das [[0]] Buch. (kaufen, P.II) / Siehst du das [[1]] Baby? (schlafen, P.I) / Der [[2]] Brief liegt hier. (schreiben, P.II) / Die [[3]] Kinder spielen draußen. (lachen, P.I) / Das [[4]] Auto steht in der Garage. (reparieren, P.II)',
        blanks: [
          { answer: 'gekaufte', explain: 'kaufen → gekauft + -e (neutro Nom.).' },
          { answer: 'schlafende', explain: 'schlafen → schlafend + -e (neutro Nom.).' },
          { answer: 'geschriebene', explain: 'schreiben → geschrieben + -e (mask. Nom.).' },
          { answer: 'lachenden', explain: 'lachen → lachend + -en (Plural).' },
          { answer: 'reparierte', explain: 'reparieren → repariert + -e (neutro Nom.). Sin ge-.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma cláusula de relativo a participio-adjetivo',
        tag: 'Escritura guiada',
        intro: 'Convierte la cláusula de relativo en un participio usado como adjetivo.',
        type: 'write',
        items: [
          {
            scene: '"Das Kind, das schläft, ist süß." → Usa Partizip I.',
            prompt: 'Das Kind, das schläft, ist süß.',
            answer: 'Das schlafende Kind ist süß.',
            accepted: [],
            explain: '"das schläft" → "schlafend" (P.I.) como adjetivo antes del sustantivo.',
          },
          {
            scene: '"Das Buch, das ich gekauft habe, ist interessant." → Usa Partizip II.',
            prompt: 'Das Buch, das ich gekauft habe, ist interessant.',
            answer: 'Das gekaufte Buch ist interessant.',
            accepted: [],
            explain: '"dass ich gekauft habe" → "gekauft" (P.II.) como adjetivo.',
          },
          {
            scene: '"Die Kinder, die lachen, spielen im Garten." → Usa Partizip I.',
            prompt: 'Die Kinder, die lachen, spielen im Garten.',
            answer: 'Die lachenden Kinder spielen im Garten.',
            accepted: [],
            explain: '"die lachen" → "lachend" + -en (Plural) como adjetivo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe con participios como adjetivos',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales usando Partizip I o II como adjetivo.',
        type: 'write',
        items: [
          {
            scene: 'Describe algo que está pasando ahora mismo usando Partizip I.',
            prompt: 'Escribe una oración con un participio I como adjetivo (acción en curso).',
            answer: 'Das weinende Baby braucht seine Mutter.',
            accepted: [
              'Der schlafende Hund ist so niedlich.',
              'Die tanzenden Mädchen sind sehr gut.',
            ],
            explain: 'Partizip I: Infinitiv + d + terminación del adjetivo. Acción simultánea al verbo principal.',
          },
          {
            scene: 'Describe algo ya terminado o su resultado usando Partizip II.',
            prompt: 'Escribe una oración con un participio II como adjetivo (resultado).',
            answer: 'Das bestellte Essen ist endlich angekommen.',
            accepted: [
              'Der reparierte Computer funktioniert gut.',
              'Das gelesene Buch war sehr interessant.',
            ],
            explain: 'Partizip II: ge- + Stamm + -t/-en + terminación del adjetivo. Acción ya completada.',
          },
        ],
      },
    ],
  },
}

export default topic
