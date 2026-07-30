import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'partizip-als-adjektiv-b1',
  order: '17',
  color: '#1a2ecc',
  category: 'Adjektiv',
  level: 'B1',
  title: 'Partizip als Adjektiv — Participio como Adjetivo en Alemán B1',
  shortTitle: 'Partizip als Adjektiv',
  metaTitle: 'Partizip als Adjektiv B1 — Partizip I y II como adjetivos en alemán',
  description:
    'En alemán los participios (Partizip I y Partizip II) pueden usarse como adjetivos. El Partizip I expresa una acción en curso; el Partizip II, el resultado de una acción. Ambos reciben las mismas terminaciones de declinación de adjetivos que cualquier otro adjetivo.',
  lead: 'Usa el Partizip I (laufend-) y el Partizip II (geöffnet-) como adjetivos delante del sustantivo, con las terminaciones de declinación correctas según el caso y el artículo.',
  outcomes: [
    'Forma el Partizip I (Infinitiv + -d) y lo usa como adjetivo',
    'Usa el Partizip II de verbos regulares e irregulares como adjetivo',
    'Añade las terminaciones de declinación correctas al participio-adjetivo',
    'Distingue el significado activo del Partizip I frente al significado pasivo del Partizip II',
    'Construye frases nominales con participio atributivo',
  ],

  guide: {
    goal: 'Usar participios como adjetivos atributivos delante de sustantivos, con la declinación correcta según el contexto.',
    model: 'das laufende Kind (el niño que está corriendo) / die geöffnete Tür (la puerta abierta)',
    formula: 'Partizip I: Infinitiv + -d + Adjektivendung  |  Partizip II: ge…t/en + Adjektivendung',
    decisions: [
      'El Partizip I se forma: Infinitiv + -d → laufen → laufend, schlafen → schlafend, lachen → lachend.',
      'El Partizip I expresa acción simultánea/activa: "das schlafende Kind" = el niño que está durmiendo (ahora).',
      'El Partizip II como adjetivo expresa estado resultante/pasivo: "die geöffnete Tür" = la puerta que ha sido abierta = la puerta abierta.',
      'Ambos reciben la misma declinación que los adjetivos: según el tipo de artículo (definido, indefinido, sin artículo) y el caso (Nom./Akk./Dat./Gen.).',
      'Con artículo definido (der, die, das): terminaciones débiles (-e, -en).',
      'Con artículo indefinido (ein, eine): terminaciones mixtas.',
      'Sin artículo: terminaciones fuertes (marcan el género/caso ellos solos).',
    ],
    table: [
      ['Tipo', 'Formación', 'Ejemplo como adjetivo (Nom. Singular)'],
      ['Partizip I', 'Infinitiv + -d + Endung', 'das laufende Kind / die weinende Frau'],
      ['Partizip II regular', 'ge- + Stamm + -t + Endung', 'das gekaufte Buch / die gebuchte Reise'],
      ['Partizip II irregular', 'ge- + Stamm-irr. + -en + Endung', 'die geschriebene E-Mail / das gelesene Buch'],
    ],
    mistakes: [
      '"Das laufend Kind" ❌ → "Das laufende Kind" ✓ — el participio como adjetivo necesita terminación de declinación.',
      '"Die öffnete Tür" ❌ → "Die geöffnete Tür" ✓ — no olvides el prefijo ge- en el Partizip II.',
      '"Ein geschriebener Brief" ❌ (si ya lleva artículo definido) → verifica el artículo: "Der geschriebene Brief" (débil) vs "Ein geschriebener Brief" (mixto -er en Nom. m.).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el Partizip als Adjektiv en alemán?',
      paragraphs: [
        'En alemán, los participios pueden funcionar como adjetivos atributivos delante de un sustantivo. Esto se llama "Partizip als Adjektiv" y es muy frecuente en el alemán escrito y hablado de nivel B1 en adelante.',
        'Hay dos tipos de participio: el Partizip I (acción activa en curso) y el Partizip II (estado resultante, generalmente pasivo). Ambos reciben las mismas terminaciones de declinación que los adjetivos normales según el caso, el género y el tipo de artículo que los precede.',
      ],
    },
    {
      heading: '¿Cómo se usa el Partizip I como adjetivo en alemán?',
      paragraphs: [
        'El Partizip I se forma añadiendo -d al infinitivo: laufen → laufend, schreiben → schreibend, singen → singend. Cuando se usa como adjetivo, expresa que la acción ocurre al mismo tiempo que el verbo principal y quien la realiza es el propio sustantivo.',
        '"Das singende Kind" = el niño que está cantando. "Ein weinendes Baby" = un bebé que llora. "Die wartenden Menschen" = las personas que están esperando. El participio lleva las terminaciones de declinación correspondientes al artículo y al caso.',
      ],
      table: [
        ['Artículo', 'Nom. m.', 'Nom. f.', 'Nom. n.', 'Significado'],
        ['definido', 'der singende Mann', 'die singende Frau', 'das singende Kind', 'el … que canta'],
        ['indefinido', 'ein singender Mann', 'eine singende Frau', 'ein singendes Kind', 'un … que canta'],
      ],
    },
    {
      heading: '¿Cómo se usa el Partizip II como adjetivo en alemán?',
      paragraphs: [
        'El Partizip II como adjetivo expresa el resultado de una acción pasada o un estado resultante: "die geöffnete Tür" (la puerta que ha sido abierta = la puerta abierta), "das reparierte Auto" (el coche que ha sido reparado = el coche reparado).',
        'El Partizip II de verbos regulares: ge- + raíz + -t (gekauft, gemacht, geöffnet). De verbos irregulares: ge- + raíz irregular + -en (geschrieben, gelesen, gesprochen). Verbos con prefijo inseparable (be-, er-, ver-) no añaden ge-: bestellt → das bestellte Essen, verkauft → das verkaufte Haus.',
      ],
      table: [
        ['Verbo', 'Partizip II', 'Como adjetivo (Nom. n.)'],
        ['öffnen', 'geöffnet', 'das geöffnete Fenster'],
        ['kaufen', 'gekauft', 'das gekaufte Buch'],
        ['schreiben', 'geschrieben', 'die geschriebene Nachricht'],
        ['lesen', 'gelesen', 'das gelesene Buch'],
        ['bestellen', 'bestellt', 'das bestellte Essen (sin ge-)'],
      ],
    },
    {
      heading: 'Declinación: las terminaciones del participio-adjetivo',
      paragraphs: [
        'Los participios como adjetivos se declinan exactamente igual que los demás adjetivos alemanes. Con artículo definido (der/die/das) usan terminaciones débiles: -e en Nominativo singular, -en en todos los demás casos. Con artículo indefinido usan terminaciones mixtas. Sin artículo, terminaciones fuertes.',
        'El error más frecuente es olvidar la terminación: "das geöffnet Fenster" ❌ → "das geöffnete Fenster" ✓. La terminación -e en neutro nominativo con artículo definido es la más importante para memorizar.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Partizip als Adjektiv B1: Partizip I (activo simultáneo) vs Partizip II (pasivo resultante), declinación de adjetivos, prefijo ge-.',
    graphicPrompt: 'Dos escenas: izquierda — niño corriendo con "das laufende Kind" (Partizip I, acción en curso); derecha — puerta abierta con "die geöffnete Tür" (Partizip II, resultado). Cada parte muestra el proceso de formación del participio.',
    scene: [
      ['Partizip I', 'das laufende Kind (el niño que está corriendo)'],
      ['Partizip II', 'die geöffnete Tür (la puerta que fue abierta)'],
      ['Partizip I', 'die wartenden Kunden (los clientes que esperan)'],
      ['Partizip II', 'das bestellte Essen (la comida que fue pedida)'],
      ['Partizip II', 'ein geschriebener Brief (una carta escrita)'],
    ],
    learnerModes: ['Identifica si es Partizip I o II por el significado (activo/pasivo)', 'Añade la terminación correcta según artículo y caso', 'Reconoce cuándo el Partizip II no lleva ge- (prefijos inseparables)'],
    practiceVerbs: ['laufen', 'schlafen', 'öffnen', 'kaufen', 'schreiben', 'lesen', 'bestellen', 'reparieren'],
    reviewFocus: ['¿Qué terminación lleva el Partizip I con artículo definido femenino Nom.?', '¿Lleva ge- el Partizip II de bestellen?', '¿Cuál es la diferencia de significado entre "das laufende Kind" y "das gelaufene Kind"?'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        type: 'choice',
        title: 'Partizip I o Partizip II',
        tag: 'Comprensión',
        intro: 'Identifica si el participio subrayado es Partizip I o Partizip II.',
        items: [
          {
            scene: '"Das schlafende Baby" — ¿qué tipo de participio es schlafend-?',
            lines: [['Oración', 'Das schlafende Baby ist süß.']],
            options: ['Partizip I (acción en curso)', 'Partizip II (resultado)', 'Präteritum', 'Infinitiv'],
            answer: 'Partizip I (acción en curso)',
            explain: 'schlafend = schlaf- (infinitivo schlafen) + -d → Partizip I. El bebé ESTÁ durmiendo ahora.',
          },
          {
            scene: '"Die reparierte Uhr" — ¿qué tipo de participio es repariert?',
            lines: [['Oración', 'Die reparierte Uhr läuft wieder.']],
            options: ['Partizip I', 'Partizip II (resultado pasivo)', 'Adjektiv normal', 'Partizip II Aktiv'],
            answer: 'Partizip II (resultado pasivo)',
            explain: 'repariert = re-par-iert → Partizip II. El reloj fue reparado (estado resultado).',
          },
          {
            scene: '¿Cuál de estas opciones es el Partizip I de "singen" como adjetivo femenino Nom.?',
            lines: [['Contexto', 'El grupo que está cantando → _____ Gruppe']],
            options: ['gesungene', 'singende', 'gesungen', 'singen'],
            answer: 'singende',
            explain: 'singen → singend (Infinitiv + -d). Como adjetivo femenino nominativo con art. def.: singende Gruppe.',
          },
          {
            scene: '¿Cuál es el Partizip II de "bestellen" como adjetivo? (verbo con prefijo inseparable be-)',
            lines: [['Contexto', 'La comida pedida → das _____ Essen']],
            options: ['gebestellte', 'bestellende', 'bestellte', 'begestellt'],
            answer: 'bestellte',
            explain: 'bestellen tiene prefijo inseparable be- → NO añade ge-. Partizip II: bestellt → bestellte (n., Nom., art. def.).',
          },
          {
            scene: '"Die weinenden Kinder" — ¿qué significa este grupo nominal?',
            lines: [['Oración', 'Die weinenden Kinder brauchen Hilfe.']],
            options: ['Los niños que lloraron', 'Los niños que están llorando', 'Los niños llorados', 'Los niños que van a llorar'],
            answer: 'Los niños que están llorando',
            explain: 'weinend = Partizip I de weinen → acción simultánea activa: los niños están llorando ahora.',
          },
        ],
      },
      {
        id: 'level-2',
        type: 'choice',
        title: 'Terminaciones correctas',
        tag: 'Declinación',
        intro: 'Elige la terminación correcta para el participio como adjetivo.',
        items: [
          {
            scene: 'Artículo definido, femenino, Nominativo: die geöffnet___ Tür',
            lines: [['Oración', 'Die geöffnet___ Tür lässt frische Luft herein.']],
            options: ['-e', '-en', '-es', '-er'],
            answer: '-e',
            explain: 'Con artículo definido + femenino + Nominativo: terminación débil -e.',
          },
          {
            scene: 'Artículo indefinido, masculino, Nominativo: ein laufend___ Hund',
            lines: [['Oración', 'Ein laufend___ Hund ist auf der Straße.']],
            options: ['-e', '-en', '-er', '-em'],
            answer: '-er',
            explain: 'Con artículo indefinido + masculino + Nominativo: terminación mixta -er (marca el género).',
          },
          {
            scene: 'Artículo definido, neutro, Akkusativ: ich sehe das gelesen___ Buch',
            lines: [['Oración', 'Ich sehe das gelesen___ Buch auf dem Tisch.']],
            options: ['-e', '-en', '-es', '-er'],
            answer: '-e',
            explain: 'Con artículo definido + neutro + Akkusativ: terminación débil -e (neutro Nom./Akk. con art. def. → -e).',
          },
          {
            scene: 'Sin artículo, femenino, Nominativo: Gekühlte___ Milch ist besser.',
            lines: [['Oración', 'Gekühlte___ Milch schmeckt besser.']],
            options: ['-e', '-en', '-er', '-es'],
            answer: '-e',
            explain: 'Sin artículo + femenino + Nominativo: terminación fuerte -e (igual que el artículo definido die).',
          },
          {
            scene: 'Artículo definido, plural, Dativ: mit den wartend___ Kunden',
            lines: [['Oración', 'Ich spreche mit den wartend___ Kunden.']],
            options: ['-e', '-en', '-em', '-er'],
            answer: '-en',
            explain: 'Con artículo definido + plural + Dativ: terminación débil -en.',
          },
        ],
      },
      {
        id: 'level-3',
        type: 'dual',
        title: 'Forma el participio-adjetivo',
        tag: 'Producción',
        intro: 'Completa las frases formando el Partizip I o II correcto con su terminación.',
        items: [
          {
            scene: 'Partizip I de "kochen" — el agua que hierve (das Wasser, neutro, Nom., art. def.)',
            lines: [['Oración', 'Das [[0]] Wasser ist heiß.']],
            blanks: [
              { answer: 'kochende', explain: 'kochen → kochend (Partizip I) + -e (neutro Nom. art. def.) = kochende.' },
            ],
          },
          {
            scene: 'Partizip II de "kaufen" — el libro comprado (das Buch, neutro, Nom., art. def.)',
            lines: [['Oración', 'Das [[0]] Buch liegt auf dem Tisch.']],
            blanks: [
              { answer: 'gekaufte', explain: 'kaufen → gekauft (Partizip II) + -e (neutro Nom. art. def.) = gekaufte.' },
            ],
          },
          {
            scene: 'Partizip II de "schreiben" — la carta escrita (der Brief, masculino, Akk., art. def.)',
            lines: [['Tú', 'Ich habe den [[0]] Brief gelesen.']],
            blanks: [
              { answer: 'geschriebenen', explain: 'schreiben → geschrieben (Partizip II irr.) + -en (m. Akk. art. def.) = geschriebenen.' },
            ],
          },
          {
            scene: 'Partizip I de "weinen" — la mujer que llora (die Frau, femenino, Nom., art. def.)',
            lines: [['Observador', 'Die [[0]] Frau braucht Hilfe.']],
            blanks: [
              { answer: 'weinende', explain: 'weinen → weinend (Partizip I) + -e (f. Nom. art. def.) = weinende.' },
            ],
          },
          {
            scene: 'Partizip II de "öffnen" — ventanas abiertas (die Fenster, plural, Nom., art. def.)',
            lines: [['Observador', 'Die [[0]] Fenster lassen viel Licht herein.']],
            blanks: [
              { answer: 'geöffneten', explain: 'öffnen → geöffnet (Partizip II) + -en (plural Nom. art. def.) = geöffneten.' },
            ],
          },
        ],
      },
      {
        id: 'level-4',
        type: 'guidedText',
        title: 'Descripción de una escena',
        tag: 'Texto guiado',
        intro: 'Completa la descripción con el participio-adjetivo correcto (Partizip I o II con terminación).',
        scene: 'Descripción de una estación de tren ocupada',
        text: 'In dem [[0]] Bahnhof sehe ich viele Menschen. Ein [[1]] Mann liest Zeitung. Die [[2]] Züge warten auf den Gleisen. Auf einer Bank sitzt eine [[3]] Frau mit einem [[4]] Kind.',
        blanks: [
          { options: ['gefüllten', 'füllenden', 'gefüllter'], answer: 'gefüllten', explain: 'füllen → gefüllt (Partizip II) + -en (m. Dat. art. def. "in dem") = gefüllten.' },
          { options: ['sitzender', 'gesessener', 'gesitzender'], answer: 'sitzender', explain: 'sitzen → sitzend (Partizip I) + -er (m. Nom. art. indef. "Ein") = sitzender.' },
          { options: ['wartenden', 'gewartet', 'wartende'], answer: 'wartenden', explain: 'warten → wartend (Partizip I) + -en (plural Nom. art. def.) = wartenden.' },
          { options: ['schlafte', 'schlafende', 'geschlafene'], answer: 'schlafende', explain: 'schlafen → schlafend (Partizip I) + -e (f. Nom. art. indef. "eine") = schlafende.' },
          { options: ['schlafenden', 'schläfendem', 'schlafendem'], answer: 'schlafendem', explain: 'schlafen → schlafend (Partizip I) + -em (n. Dat. art. indef. "einem") = schlafendem.' },
        ],
      },
      {
        id: 'level-5',
        type: 'freeText',
        title: 'Partizip I vs. II: significado',
        tag: 'Análisis',
        intro: 'Explica la diferencia de significado entre las dos frases de cada par.',
        scene: 'Contraste de significados: Partizip I vs. Partizip II',
        text: 'Par 1: "das kochende Wasser" vs. "das gekochte Wasser" — diferencia: [[0]]. Par 2: "der laufende Motor" vs. "der gestartete Motor" — diferencia: [[1]]. Par 3: "die schlafende Katze" vs. "die aufgewachte Katze" — diferencia: [[2]].',
        blanks: [
          { answer: 'kochende = agua hirviendo ahora; gekochte = agua que ya fue hervida', explain: 'Partizip I (kochend) = proceso activo en curso. Partizip II (gekocht) = resultado de la acción.' },
          { answer: 'laufende = motor que está funcionando ahora; gestartete = motor que fue arrancado', explain: 'laufend = en marcha ahora (Partizip I). gestartet = fue arrancado (Partizip II resultado).' },
          { answer: 'schlafende = gato que está durmiendo; aufgewachte = gato que se ha despertado', explain: 'schlafend = Partizip I activo presente. aufgewacht = Partizip II de aufwachen.' },
        ],
      },
      {
        id: 'level-6',
        type: 'write',
        title: 'Describe objetos y personas con participios',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas usando el participio como adjetivo según se indica.',
        items: [
          {
            scene: 'Un correo electrónico que fue enviado ayer (die E-Mail, femenino)',
            prompt: 'Escribe una oración con el Partizip II de "senden" como adjetivo.',
            answer: 'Die gesendete E-Mail liegt in meinem Postausgang.',
            accepted: ['Ich habe die gesendete E-Mail gelesen.', 'Die gestern gesendete E-Mail kam an.'],
            explain: 'senden → gesendet (Partizip II) + -e (f. Nom. art. def.) = gesendete.',
          },
          {
            scene: 'Describe a niños que juegan en el parque (die Kinder spielen).',
            prompt: 'Usa el Partizip I de "spielen" para describir a los niños.',
            answer: 'Die spielenden Kinder lachen laut.',
            accepted: ['Ich sehe die spielenden Kinder im Park.', 'Die spielenden Kinder sind glücklich.'],
            explain: 'spielen → spielend (Partizip I) + -en (plural Nom. art. def.) = spielenden.',
          },
          {
            scene: 'El coche reparado ya funciona (das Auto, neutro).',
            prompt: 'Escribe una oración con el Partizip II de "reparieren" como adjetivo.',
            answer: 'Das reparierte Auto fährt wieder.',
            accepted: ['Das reparierte Auto steht vor der Garage.', 'Mein repariertes Auto ist fertig.'],
            explain: 'reparieren → repariert (sin ge- por la terminación -ieren). Con art. def. n. Nom.: reparierte.',
          },
          {
            scene: 'Una carta escrita a mano (der Brief, masculino, Akkusativ)',
            prompt: 'Escribe: "Recibí una carta escrita a mano."',
            answer: 'Ich habe einen handgeschriebenen Brief bekommen.',
            accepted: ['Ich bekam einen geschriebenen Brief.', 'Ich habe einen mit der Hand geschriebenen Brief erhalten.'],
            explain: 'schreiben → geschrieben (Partizip II irr.). handgeschrieben es la forma compuesta. + -en (m. Akk. art. indef.) = handgeschriebenen.',
          },
        ],
      },
    ],
  },
}

export default topic
