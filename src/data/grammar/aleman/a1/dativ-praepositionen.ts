import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'dativ-praepositionen',
  order: '19',
  color: '#c9a900',
  category: 'Präpositionen',
  level: 'A1',
  title: 'Dativpräpositionen im Deutschen A1',
  shortTitle: 'Dativpräpositionen',
  metaTitle: 'Preposiciones de dativo alemán A1 — mit, bei, nach, seit, von, zu, aus, gegenüber',
  description:
    'Ocho preposiciones rigen siempre dativo en alemán: mit, bei, nach, seit, von, zu, aus, gegenüber. Con estas preposiciones los artículos cambian: der/das → dem, die → der, (plural) die → den+n. Memorizar estas 8 preposiciones es obligatorio para hablar alemán correctamente desde A1.',
  lead: 'Ocho preposiciones siempre rigen dativo: mit, bei, nach, seit, von, zu, aus, gegenüber. Con ellas: dem (m/n), der (f), den (pl). Ich fahre mit dem Bus. / Ich bin bei meiner Mutter.',
  outcomes: [
    'Recuerdas las 8 preposiciones de dativo (mit, bei, nach, seit, von, zu, aus, gegenüber)',
    'Aplicas los artículos en dativo: dem (m/n), der (f), den+n (plural)',
    'Usas las contracciones más frecuentes: zum (zu dem), zur (zu der), beim (bei dem), vom (von dem)',
  ],

  guide: {
    goal: 'Usar las 8 preposiciones de dativo con los artículos correctos en frases cotidianas.',
    model: 'Ich fahre mit dem Bus. / Ich bin bei meiner Mutter. / Ich komme aus Kolumbien. / Er wohnt gegenüber dem Bahnhof.',
    formula: 'mit/bei/nach/seit/von/zu/aus/gegenüber + Dativ (dem/der/dem/den)',
    decisions: [
      'mit (con): mit dem Bus, mit der U-Bahn, mit dem Fahrrad — medio de transporte y compañía',
      'bei (en casa de / cerca de / mientras): bei meiner Mutter, beim Arzt, beim Essen',
      'nach (después de / hacia — sin artículo con ciudades y países): nach Berlin, nach Deutschland, nach dem Kurs',
      'seit (desde hace — rige dativo siempre): seit einem Jahr, seit drei Monaten',
      'von (de / por — origen y autoría): von dem Lehrer = vom Lehrer, von Vera',
      'zu (a / hacia — destino con personas/lugares): zum Bahnhof, zur Schule, zu Hause',
      'aus (de — origen / material): aus Kolumbien, aus Holz, aus dem Zimmer',
      'gegenüber (frente a): gegenüber dem Bahnhof, gegenüber der Post',
    ],
    table: [
      ['Präposition', 'Bedeutung', 'Beispiel'],
      ['mit', 'con / en (transporte)', 'Ich fahre mit dem Bus.'],
      ['bei', 'en casa de / mientras', 'Ich bin bei meiner Mutter.'],
      ['nach', 'hacia (países/ciudades) / después de', 'Ich fahre nach Berlin. / nach dem Kurs'],
      ['seit', 'desde hace', 'seit drei Jahren'],
      ['von', 'de / por (origen)', 'Das Buch ist von dem Lehrer. → vom Lehrer'],
      ['zu', 'a / hacia (personas/lugares)', 'Ich gehe zum Supermarkt.'],
      ['aus', 'de (origen/procedencia)', 'Ich komme aus Kolumbien.'],
      ['gegenüber', 'frente a', 'gegenüber dem Bahnhof'],
    ],
    mistakes: [
      '"Ich fahre mit der Bus" ❌ — "Bus" es masculino (der Bus) → dativo: "mit dem Bus" ✓',
      '"Ich gehe zu der Schule" ❌ — zu + der → contracción: "zur Schule" ✓ (zur = zu der)',
      '"Ich komme nach Kolumbien" ❌ para países CON artículo: países sin artículo: nach Kolumbien ✓ / países con artículo: in die Türkei',
    ],
  },

  seo: [
    {
      heading: '¿Cuáles son las preposiciones de dativo en alemán?',
      paragraphs: [
        'Una de las reglas más importantes del alemán es que ciertas preposiciones rigen SIEMPRE dativo. No importa el contexto: con mit, bei, nach, seit, von, zu, aus y gegenüber, el sustantivo que sigue va siempre en dativo. Una manera de memorizarlas es con la frase mnemotécnica en alemán: "mit bei nach seit von zu aus gegenüber" — y aprenderlas de memoria como una lista.',
        'Los artículos en dativo son: der/das → dem, die → der, plural → den (y el sustantivo añade -n si no termina ya en -n): der Bus → mit dem Bus; die U-Bahn → mit der U-Bahn; das Fahrrad → mit dem Fahrrad; die Busse → mit den Bussen.',
      ],
    },
    {
      heading: '¿Cómo se contraen las preposiciones de dativo en alemán?',
      paragraphs: [
        'Algunas combinaciones de preposición + artículo definido se contraen en el habla cotidiana: zu + dem = zum (ich gehe zum Supermarkt), zu + der = zur (ich gehe zur Schule), bei + dem = beim (ich bin beim Arzt), von + dem = vom (das Buch ist vom Lehrer). Estas contracciones son prácticamente obligatorias en el alemán hablado y suena raro usarlas sin contraer.',
        'Otras contracciones existen pero son menos frecuentes en A1: an + dem = am (temporal: am Montag), an + das = ans, in + dem = im, in + das = ins. En A1 basta con dominar zum, zur, beim, vom.',
      ],
    },
    {
      heading: 'Nach vs. zu: dos formas de decir "a"',
      paragraphs: [
        '"Nach" se usa para ciudades y países sin artículo: nach Berlin, nach Spanien, nach Kolumbien, nach Hause (a casa, expresión fija). "Zu" se usa para lugares con artículo definido y para personas: zum Bahnhof, zur Apotheke, zu meiner Mutter, zum Arzt. Esta distinción es crucial para A1 y una de las preguntas más frecuentes en exámenes.',
        'Países con artículo femenino (die Türkei, die Schweiz, die USA) no usan "nach" sino "in die": Ich fahre in die Türkei / in die Schweiz / in die USA. Países neutros sin artículo (Kolumbien, Deutschland, Spanien) usan nach. En A1 basta con saber esta regla básica.',
      ],
    },
    {
      heading: '¿Cómo se usan aus y seit en alemán?',
      paragraphs: [
        '"Aus" expresa el origen geográfico (Ich komme aus Kolumbien / Ich bin aus Bogotá) y también el material de algo (Das Buch ist aus Papier / Der Tisch ist aus Holz). Con "aus" el origen es geográfico y permanente, a diferencia de "von" que puede indicar punto de partida temporal.',
        '"Seit" con dativo expresa una duración que comenzó en el pasado y continúa: Ich lerne seit einem Jahr Deutsch (dativo singular neutro: einem). Ich wohne seit drei Monaten in Berlin (dativo plural: Monaten). Recuerda siempre: "seit" + dativo.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Las 8 preposiciones de dativo con artículos dem/der y contracciones zum/zur/beim/vom.',
    graphicPrompt: 'Lista de 8 preposiciones con ejemplos y una tabla de dativo: der→dem, die→der, das→dem.',
    scene: [
      ['mit dem Bus', 'Ich fahre mit dem Bus. — Voy en autobús.'],
      ['bei meiner Mutter', 'Ich bin bei meiner Mutter. — Estoy en casa de mi madre.'],
      ['nach Berlin', 'Ich fahre nach Berlin. — Voy a Berlín.'],
      ['seit drei Jahren', 'Ich lerne seit drei Jahren Deutsch. — Llevo 3 años aprendiendo.'],
      ['zum Supermarkt', 'Ich gehe zum Supermarkt. — Voy al supermercado.'],
      ['aus Kolumbien', 'Ich komme aus Kolumbien. — Soy de Colombia.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['8 preposiciones de dativo de memoria', 'dem (m/n) / der (f) / den (pl)', 'zum=zu+dem, zur=zu+der, beim=bei+dem'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige la preposición de dativo correcta para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Carlos va en autobús a la academia',
            lines: [['Carlos', 'Ich fahre ___ dem Bus zur Akademie.']],
            options: ['mit', 'bei', 'von', 'zu'],
            answer: 'mit',
            explain: '"Mit" + dativo = medio de transporte. Ich fahre mit dem Bus.',
          },
          {
            scene: 'Ana es de Colombia',
            lines: [['Ana', 'Ich komme ___ Kolumbien.']],
            options: ['aus', 'von', 'nach', 'bei'],
            answer: 'aus',
            explain: '"Aus" expresa origen geográfico. Ich komme aus Kolumbien.',
          },
          {
            scene: 'Marco va al médico',
            lines: [['Marco', 'Ich gehe ___ dem Arzt.']],
            options: ['zu', 'nach', 'bei', 'von'],
            answer: 'zu',
            explain: '"Zu" + persona/lugar con artículo. Ich gehe zum (= zu dem) Arzt.',
          },
          {
            scene: 'Lina viaja a Berlín',
            lines: [['Lina', 'Morgen fahre ich ___ Berlin.']],
            options: ['nach', 'zu', 'aus', 'bei'],
            answer: 'nach',
            explain: '"Nach" + ciudad/país sin artículo. Ich fahre nach Berlin.',
          },
          {
            scene: 'Sofia lleva tiempo viviendo en Medellín',
            lines: [['Sofia', 'Ich wohne ___ einem Jahr in Medellín.']],
            options: ['seit', 'von', 'bei', 'aus'],
            answer: 'seit',
            explain: '"Seit" + dativo = desde hace. Seit einem Jahr = desde hace un año.',
          },
          {
            scene: 'Dario habla del libro de Vera',
            lines: [['Dario', 'Das Buch ist ___ Vera.']],
            options: ['von', 'aus', 'bei', 'mit'],
            answer: 'von',
            explain: '"Von" + origen/autoría. Das Buch ist von Vera = El libro es de Vera.',
          },
          {
            scene: 'Carlos está en casa de su amigo',
            lines: [['Carlos', 'Ich bin gerade ___ meinem Freund.']],
            options: ['bei', 'zu', 'von', 'aus'],
            answer: 'bei',
            explain: '"Bei" + persona = en casa de alguien. Ich bin bei meinem Freund.',
          },
          {
            scene: 'El banco está justo frente a la estación',
            lines: [['Marco', 'Die Bank ist ___ dem Bahnhof.']],
            options: ['gegenüber', 'bei', 'von', 'nach'],
            answer: 'gegenüber',
            explain: '"Gegenüber" + dativo = frente a. Die Bank ist gegenüber dem Bahnhof.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Preposición + artículo en dativo',
        tag: '2 espacios',
        intro: 'Completa la preposición y el artículo en dativo correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Dario va a la escuela en metro',
            lines: [['Dario', 'Ich fahre [[0]] [[1]] U-Bahn.']],
            blanks: [
              { options: ['mit', 'bei', 'von', 'zu'], answer: 'mit', explain: '"Mit" para medio de transporte.' },
              { options: ['der', 'dem', 'die', 'den'], answer: 'der', explain: '"Die U-Bahn" es femenino → dativo: der. Mit der U-Bahn.' },
            ],
          },
          {
            scene: 'Lina va al supermercado',
            lines: [['Lina', 'Ich gehe [[0]] [[1]] Supermarkt.']],
            blanks: [
              { options: ['zu', 'nach', 'bei', 'aus'], answer: 'zu', explain: '"Zu" para lugares con artículo.' },
              { options: ['dem', 'der', 'die', 'den'], answer: 'dem', explain: '"Der Supermarkt" (m) → dativo: dem. Zu + dem = zum Supermarkt (contracción).' },
            ],
          },
          {
            scene: 'Carlos viene del trabajo',
            lines: [['Carlos', 'Ich komme gerade [[0]] [[1]] Arbeit.']],
            blanks: [
              { options: ['von', 'aus', 'bei', 'mit'], answer: 'von', explain: '"Von" para origen/procedencia del lugar.' },
              { options: ['der', 'dem', 'die', 'den'], answer: 'der', explain: '"Die Arbeit" (f) → dativo: der. Von + der = von der Arbeit.' },
            ],
          },
          {
            scene: 'Marco estudia desde hace seis meses',
            lines: [['Marco', 'Ich studiere [[0]] [[1]] Monaten hier.']],
            blanks: [
              { options: ['seit', 'von', 'bei', 'nach'], answer: 'seit', explain: '"Seit" para duración desde el pasado.' },
              { options: ['sechs', 'einem', 'drei', 'zwei'], answer: 'sechs', explain: '"Seit sechs Monaten" = desde hace seis meses. Los meses en plural son dativo plural: Monaten.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Elige la preposición correcta (y el artículo cuando corresponda).',
        type: 'guidedText',
        scene: 'Carlos describe su día en Berlín.',
        text: 'Ich lebe [[0]] einem Jahr in Berlin. Jeden Morgen fahre ich [[1]] der U-Bahn zur Arbeit. Ich arbeite [[2]] einer deutschen Firma. [[3]] der Arbeit esse ich oft [[4]] meinem Kollegen Marco. Die Kantine ist [[5]] dem Büro. Abends gehe ich manchmal [[6]] dem Kurs direkt zu Dario.',
        blanks: [
          { options: ['seit', 'von', 'bei', 'mit'], answer: 'seit', explain: '"Seit einem Jahr" — duración hasta el presente con dativo.' },
          { options: ['mit', 'bei', 'zu', 'nach'], answer: 'mit', explain: '"Mit der U-Bahn" — medio de transporte.' },
          { options: ['bei', 'mit', 'aus', 'von'], answer: 'bei', explain: '"Bei einer Firma" — trabajar en una empresa: bei + dativo.' },
          { options: ['Nach', 'Bei', 'Von', 'Mit'], answer: 'Nach', explain: '"Nach der Arbeit" — después del trabajo: nach + dativo.' },
          { options: ['mit', 'bei', 'von', 'zu'], answer: 'mit', explain: '"Mit meinem Kollegen" — con mi colega: mit + dativo.' },
          { options: ['gegenüber', 'nach', 'seit', 'aus'], answer: 'gegenüber', explain: '"Gegenüber dem Büro" — frente a la oficina: gegenüber + dativo.' },
          { options: ['nach', 'zu', 'bei', 'aus'], answer: 'nach', explain: '"Nach dem Kurs" — después del curso: nach + dativo temporal.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la preposición de dativo correcta de memoria.',
        type: 'freeText',
        scene: 'Sofia habla de su vida en WeLearn.',
        text: 'Ich komme [[0]] Bucaramanga. Ich studiere [[1]] zwei Jahren hier. Ich fahre [[2]] dem Bus zum Unterricht. Manchmal esse ich [[3]] Vera. Die Mensa ist gleich [[4]] der Schule.',
        blanks: [
          { answer: 'aus', accepted: ['aus'], explain: '"Aus" para origen geográfico. Ich komme aus Bucaramanga.' },
          { answer: 'seit', accepted: ['seit'], explain: '"Seit zwei Jahren" — desde hace dos años.' },
          { answer: 'mit', accepted: ['mit'], explain: '"Mit dem Bus" — medio de transporte.' },
          { answer: 'bei', accepted: ['bei'], explain: '"Bei Vera" — con/en casa de Vera: bei + dativo (nombre sin artículo).' },
          { answer: 'gegenüber', accepted: ['gegenüber'], explain: '"Gegenüber der Schule" — frente a la escuela.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe frases completas usando preposiciones de dativo.',
        type: 'write',
        items: [
          {
            scene: 'Hablando de cómo te desplazas por tu ciudad',
            prompt: 'Di cómo vas a la academia/trabajo/escuela (mit) y de dónde eres (aus).',
            answer: 'Ich fahre mit dem Bus zur Akademie. Ich komme aus Kolumbien.',
            accepted: ['mit dem', 'mit der', 'aus kolumbien', 'aus bogotá', 'aus medellín'],
            explain: 'Mit + dativo para transporte. Aus + lugar para origen. Mit dem Bus / Mit der U-Bahn / Mit dem Fahrrad.',
          },
          {
            scene: 'Hablando de cuánto tiempo llevas en un lugar',
            prompt: 'Di desde hace cuánto tiempo estudias alemán y dónde trabajas/estudias.',
            answer: 'Ich lerne seit einem Jahr Deutsch. Ich arbeite bei einer deutschen Schule.',
            accepted: ['seit einem', 'seit zwei', 'seit drei', 'bei einer', 'bei einem', 'bei meiner'],
            explain: 'Seit + dativo para duración. Bei + dativo para "trabajar en / estar en casa de".',
          },
          {
            scene: 'Dando indicaciones de ubicación',
            prompt: 'Di dónde está algo usando "gegenüber" y "bei".',
            answer: 'Die Apotheke ist gegenüber dem Bahnhof. Die Bäckerei ist bei dem Park.',
            accepted: ['gegenüber dem', 'gegenüber der', 'bei dem', 'bei der', 'neben dem', 'neben der'],
            explain: 'Gegenüber + dativo (dem/der). Die Apotheke (f) ist gegenüber dem Bahnhof (m→dem).',
          },
          {
            scene: 'Describiendo un día a día con múltiples preposiciones',
            prompt: 'Escribe 3 frases sobre tu día usando mit, nach y zu.',
            answer: 'Ich fahre mit dem Fahrrad. Nach der Arbeit gehe ich nach Hause. Ich gehe zum Supermarkt.',
            accepted: ['mit dem', 'mit der', 'nach der', 'nach dem', 'zum', 'zur', 'nach hause'],
            explain: 'Mit (transporte), nach (temporal = después de / dirección), zu (destino con artículo). Zum = zu+dem, zur = zu+der.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu vida cotidiana usando al menos 5 preposiciones de dativo distintas.',
        type: 'write',
        items: [
          {
            scene: 'Tu presentación personal con preposiciones de dativo',
            prompt: 'Escribe un párrafo sobre ti: de dónde eres, cómo te desplazas, dónde estudias y desde cuándo.',
            answer: 'Ich komme aus Bogotá. Seit einem Jahr lerne ich Deutsch bei WeLearn. Ich fahre mit dem Bus zum Unterricht. Nach dem Kurs gehe ich nach Hause.',
            accepted: ['aus ', 'seit ', 'mit ', 'bei ', 'nach ', 'zu ', 'vom ', 'zum ', 'zur '],
            explain: 'Usa aus (origen), seit (duración), mit (transporte), bei (lugar), nach (dirección/tiempo), zu (destino).',
          },
          {
            scene: 'Describiendo el barrio donde estudias',
            prompt: 'Describe el barrio de WeLearn: qué hay frente a la academia, cómo se llega y qué hay cerca.',
            answer: 'WeLearn ist gegenüber dem Bahnhof. Man kann mit dem Bus oder mit dem Fahrrad kommen. Bei der Akademie gibt es auch einen Supermarkt.',
            accepted: ['gegenüber dem', 'gegenüber der', 'mit dem', 'mit der', 'bei der', 'bei dem', 'von dem', 'vom'],
            explain: 'Gegenüber (frente a), mit (transporte), bei (cerca de/junto a). Todos con dativo: dem/der/dem.',
          },
          {
            scene: 'Contándole a Dario tu historia con los idiomas',
            prompt: 'Cuéntale a Dario desde cuándo aprendes alemán, de dónde eres y con quién estudias.',
            answer: 'Ich lerne seit sechs Monaten Deutsch. Ich komme aus Kolumbien. Ich lerne bei Vera und manchmal mit meinem Freund Carlos.',
            accepted: ['seit ', 'aus ', 'bei vera', 'bei welearn', 'mit meinem', 'mit meiner', 'von '],
            explain: 'Seit + dativo (duración). Aus (origen). Bei + persona (con quién/dónde). Mit + persona (compañía).',
          },
        ],
      },
    ],
  },
}

export default topic
