import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'nebensatze-b1',
  order: '04',
  color: '#c9a900',
  category: 'Satzstruktur',
  level: 'B1',
  title: 'Nebensätze en Alemán B1 — Oraciones Subordinadas',
  shortTitle: 'Nebensätze',
  metaTitle: 'Nebensätze B1 — weil, dass, obwohl, wenn, als, damit en alemán',
  description:
    'Los Nebensätze son oraciones subordinadas que dependen de una oración principal. En alemán el verbo conjugado siempre va al final del Nebensatz. Las conjunciones más importantes en B1 son: weil, dass, obwohl, wenn, als, damit, bevor, nachdem.',
  lead: 'Construye oraciones subordinadas en alemán: el verbo siempre va al final. Aprende las conjunciones más importantes de B1: weil, dass, obwohl, wenn, als, damit.',
  outcomes: [
    'Coloca el verbo al final de cualquier Nebensatz',
    'Distingue el uso de weil (causa), dass (contenido), obwohl (contraste), wenn (condición/habitual)',
    'Diferencia als (pasado único) de wenn (habitual/futuro)',
    'Invierte el orden de la oración principal cuando el Nebensatz va primero',
  ],

  guide: {
    goal: 'Construir oraciones complejas con Nebensätze para expresar causas, condiciones, contrastes y contenidos.',
    model: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte. / Obwohl es kalt ist, gehe ich spazieren.',
    formula: 'Hauptsatz + Konjunktion + [Subjekt + ... + Verb(konjugiert)]',
    decisions: [
      'El verbo conjugado va SIEMPRE al final del Nebensatz, incluso si hay modal o Perfekt.',
      'weil = porque (causa explicada): "Ich bleibe zuhause, weil ich krank bin."',
      'dass = que (contenido, opinión, hecho): "Ich denke, dass das richtig ist."',
      'obwohl = aunque (contraste con la realidad): "Obwohl es regnet, gehen wir raus."',
      'wenn = si / cuando (habitual o futuro); als = cuando (pasado único): "Als ich jung war..."',
      'Wenn el Nebensatz va PRIMERO, la oración principal invierte sujeto y verbo: "Weil ich müde bin, gehe ich schlafen."',
    ],
    table: [
      ['Konjunktion', 'Bedeutung', 'Beispiel'],
      ['weil', 'porque', 'Ich lerne, weil der Test morgen ist.'],
      ['dass', 'que', 'Ich glaube, dass du recht hast.'],
      ['obwohl', 'aunque', 'Er kommt, obwohl er müde ist.'],
      ['wenn', 'si / cuando (hab.)', 'Wenn ich Zeit habe, lese ich.'],
      ['als', 'cuando (pasado único)', 'Als ich klein war, spielte ich viel.'],
    ],
    mistakes: [
      '"Ich bleibe zuhause, weil ich bin krank" ❌ → "...weil ich krank bin" ✓ — el verbo va al FINAL del Nebensatz.',
      '"Als ich jung bin" ❌ → "Als ich jung war" ✓ — "als" se usa para momentos únicos del pasado.',
      '"Weil ich müde bin ich gehe schlafen" ❌ → "Weil ich müde bin, gehe ich schlafen" ✓ — cuando el Nebensatz va primero, el verbo principal ocupa la posición 2.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los Nebensätze en alemán?',
      paragraphs: [
        'Un Nebensatz es una oración subordinada que depende de una oración principal (Hauptsatz). La característica más importante del alemán es que en el Nebensatz el verbo conjugado siempre va al final: "Ich weiß, dass er kommt." — "kommt" al final.',
        'Los Nebensätze se unen al Hauptsatz mediante conjunciones subordinantes (weil, dass, obwohl, wenn, als, damit, bevor, nachdem, etc.) o pronombres relativos. En el habla cotidiana de nivel B1 estos son absolutamente esenciales.',
      ],
    },
    {
      heading: '¿Cuáles son las conjunciones subordinantes más importantes en alemán?',
      paragraphs: [
        '"Weil" introduce la causa de algo: "Ich trinke Tee, weil ich erkältet bin." (Bebo té porque estoy resfriado.) El verbo "bin" va al final. Atención: no confundir con "denn", que también significa "porque" pero introduce un Hauptsatz (verbo en posición 2): "Ich trinke Tee, denn ich bin erkältet."',
        '"Dass" introduce contenido: una cita, opinión, sentimiento o hecho: "Ich freue mich, dass du kommst." (Me alegra que vengas.) "Wir denken, dass das eine gute Idee ist." Muchos verbos de opinión (denken, glauben, sagen, wissen, hoffen) se combinan con dass.',
      ],
    },
    {
      heading: '¿Cómo se expresan contraste y condición en las subordinadas alemanas?',
      paragraphs: [
        '"Obwohl" expresa un contraste con la realidad: "Obwohl es kalt ist, trägt er kein Jacke." (Aunque hace frío, no lleva chaqueta.) El hecho del Nebensatz y el de la oración principal se contradicen. Similar al español "aunque".',
        '"Wenn" tiene dos usos: condición presente/futura ("Wenn du Zeit hast, besuche mich") y situaciones habituales o repetidas del pasado o presente ("Wenn es regnete, blieb er zuhause"). Es diferente de "als" que solo describe un momento único del pasado.',
      ],
    },
    {
      heading: 'Als vs. wenn: el uso del tiempo pasado',
      paragraphs: [
        'Esta distinción es crucial en B1: "als" se usa para un momento o período único en el pasado: "Als ich in Berlin war, habe ich das Brandenburger Tor gesehen." Solo una vez, en el pasado.',
        '"Wenn" para el pasado habitual: "Wenn ich als Kind krank war, kochte meine Mutter Suppe." (Cada vez que estaba enfermo de niño...) — ocurría varias veces. Para el presente y futuro siempre "wenn": "Wenn ich Zeit habe, lese ich."',
      ],
    },
    {
      heading: 'La inversión cuando el Nebensatz va primero',
      paragraphs: [
        'En alemán, la regla es que el verbo siempre ocupa la posición 2 en el Hauptsatz. Cuando el Nebensatz va primero, ocupa la posición 1 como bloque, y el verbo principal debe ir inmediatamente después: "Weil ich müde bin, [Verb1=gehe] ich schlafen."',
        'Esta inversión es un error muy común. Recuerda: Nebensatz (posición 1) + coma + VERBO PRINCIPAL + sujeto + resto de oración. "Obwohl es regnet, gehen wir spazieren." — "gehen" en posición 2 de la oración principal.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Nebensätze B1: weil, dass, obwohl, wenn, als — verbo al final, inversión cuando Nebensatz va primero.',
    graphicPrompt: 'Diagrama de dos bloques conectados: oración principal y subordinada, con el verbo al final marcado en color.',
    scene: [
      ['Ich lerne Deutsch, weil ich Deutschland liebe.', 'Aprendo alemán porque amo Alemania.'],
      ['Obwohl es spät ist, arbeite ich noch.', 'Aunque es tarde, sigo trabajando.'],
      ['Ich glaube, dass er kommt.', 'Creo que él viene.'],
      ['Als ich ein Kind war, lebte ich in Köln.', 'Cuando era niño, vivía en Colonia.'],
      ['Wenn du Zeit hast, ruf mich an!', 'Si tienes tiempo, ¡llámame!'],
      ['Weil es regnet, bleibe ich zuhause.', 'Como llueve, me quedo en casa.'],
      ['Sie lernt jeden Tag, damit sie die Prüfung besteht.', 'Ella estudia cada día para aprobar el examen.'],
      ['Ich war müde, nachdem ich Sport gemacht hatte.', 'Estaba cansado después de haber hecho deporte.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['Verbo al final del Nebensatz', 'weil vs. denn', 'als vs. wenn', 'Inversión con Nebensatz inicial'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la conjunción correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la conjunción correcta según el sentido de la oración.',
        type: 'choice',
        items: [
          {
            scene: 'Explicando una causa',
            lines: [['', 'Ich trinke viel Wasser, ___ es sehr heiß ist.']],
            options: ['weil', 'obwohl', 'dass', 'wenn'],
            answer: 'weil',
            explain: '"weil" introduce la causa. El verbo "ist" va al final del Nebensatz.',
          },
          {
            scene: 'Una opinión',
            lines: [['', 'Ich denke, ___ das eine gute Idee ist.']],
            options: ['dass', 'weil', 'obwohl', 'als'],
            answer: 'dass',
            explain: '"dass" introduce el contenido de lo que se piensa. "Ich denke, dass..." = Creo que...',
          },
          {
            scene: 'Un contraste',
            lines: [['', '___ sie krank ist, geht sie zur Arbeit.']],
            options: ['Obwohl', 'Weil', 'Dass', 'Wenn'],
            answer: 'Obwohl',
            explain: '"obwohl" expresa contraste: aunque está enferma, va al trabajo. El Nebensatz va primero.',
          },
          {
            scene: 'Un momento pasado único',
            lines: [['', '___ ich in Berlin war, habe ich das Museum besucht.']],
            options: ['Als', 'Wenn', 'Weil', 'Dass'],
            answer: 'Als',
            explain: '"als" para un único momento en el pasado. "Wenn" sería para hábito pasado.',
          },
          {
            scene: 'Condición o hábito',
            lines: [['', '___ ich Stress habe, höre ich Musik.']],
            options: ['Wenn', 'Als', 'Obwohl', 'Damit'],
            answer: 'Wenn',
            explain: '"wenn" para situaciones habituales o condiciones (presente/futuro). "Als" solo para pasado único.',
          },
          {
            scene: 'Un propósito',
            lines: [['', 'Sie spart Geld, ___ sie reisen kann.']],
            options: ['damit', 'weil', 'obwohl', 'dass'],
            answer: 'damit',
            explain: '"damit" expresa propósito (para que): ahorra para poder viajar. El sujeto puede ser distinto.',
          },
          {
            scene: 'Antes de algo',
            lines: [['', 'Bitte lesen Sie das Dokument, ___ Sie unterschreiben.']],
            options: ['bevor', 'nachdem', 'weil', 'obwohl'],
            answer: 'bevor',
            explain: '"bevor" = antes de que. "Bitte lesen, bevor Sie unterschreiben" — primero leer, luego firmar.',
          },
          {
            scene: 'Después de algo',
            lines: [['', '___ er gegessen hatte, machte er einen Spaziergang.']],
            options: ['Nachdem', 'Bevor', 'Als', 'Weil'],
            answer: 'Nachdem',
            explain: '"nachdem" = después de que. Expresa secuencia temporal: primero comió, luego paseó.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Construye el Nebensatz',
        tag: '2 espacios',
        intro: 'Elige la conjunción y el orden correcto del verbo.',
        type: 'dual',
        items: [
          {
            scene: 'Una razón',
            lines: [['', 'Wir gehen früh schlafen, [[0]] wir morgen früh aufstehen [[1]].']],
            blanks: [
              { options: ['weil', 'obwohl', 'dass', 'wenn'], answer: 'weil', explain: '"weil" introduce la causa: por qué nos acostamos temprano.' },
              { options: ['müssen', 'müssen wir', 'wir müssen', 'müsst'], answer: 'müssen', explain: 'El verbo modal "müssen" va al FINAL del Nebensatz. "wir" ya está antes del espacio.' },
            ],
          },
          {
            scene: 'Una creencia',
            lines: [['', 'Ich glaube, [[0]] das Wetter morgen besser [[1]].']],
            blanks: [
              { options: ['dass', 'weil', 'obwohl', 'wenn'], answer: 'dass', explain: '"dass" introduce el contenido de la creencia/opinión.' },
              { options: ['wird', 'ist', 'sein', 'werden'], answer: 'wird', explain: 'Verbo al final del Nebensatz. Futuro: "wird" (Futur I) o "ist" (Präsens para futuro próximo).' },
            ],
          },
          {
            scene: 'Un contraste sorprendente',
            lines: [['', '[[0]] er sehr fleißig studiert hat, hat er die Prüfung [[1]].']],
            blanks: [
              { options: ['Obwohl', 'Weil', 'Als', 'Damit'], answer: 'Obwohl', explain: '"obwohl" = aunque. Contraste: estudió mucho pero... El Nebensatz va primero.' },
              { options: ['nicht bestanden', 'bestanden nicht', 'nicht bestand', 'bestanden'], answer: 'nicht bestanden', explain: 'El Perfekt "nicht bestanden" (hat... nicht bestanden). Verbo principal: "hat bestanden/nicht bestanden".' },
            ],
          },
          {
            scene: 'Infancia',
            lines: [['', '[[0]] wir Kinder waren, [[1]] wir jeden Sommer ans Meer.']],
            blanks: [
              { options: ['Als', 'Wenn', 'Weil', 'Obwohl'], answer: 'Als', explain: '"als" para período único del pasado (la infancia entera como bloque único).' },
              { options: ['fuhren', 'fahren', 'fuhr', 'gefahren'], answer: 'fuhren', explain: 'Cuando el Nebensatz va primero, el verbo principal ocupa posición 2: "fuhren wir". Präteritum de "fahren".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El diario de Emma',
        tag: 'Texto guiado',
        intro: 'Elige la conjunción correcta para completar el diario de Emma.',
        type: 'guidedText',
        scene: 'Emma escribe sobre su semana en su diario.',
        text: 'Diese Woche war sehr interessant. [[0]] ich am Montag aufgestanden bin, war ich sehr müde. Ich habe aber trotzdem gearbeitet, [[1]] ich einen wichtigen Termin hatte. Ich denke, [[2]] Arbeit manchmal stressig ist, aber es lohnt sich. [[3]] es am Dienstag regnete, bin ich mit dem Bus gefahren. Ich lerne jeden Tag Deutsch, [[4]] ich in Deutschland studieren möchte. [[5]] ich die Sprache besser spreche, werde ich selbstsicherer sein.',
        blanks: [
          { options: ['Als', 'Wenn', 'Weil', 'Obwohl'], answer: 'Als', explain: '"als" para un momento único en el pasado (el lunes por la mañana específico).' },
          { options: ['weil', 'obwohl', 'dass', 'wenn'], answer: 'weil', explain: '"weil" introduce la causa: trabajó porque tenía una cita importante.' },
          { options: ['dass', 'weil', 'obwohl', 'als'], answer: 'dass', explain: '"Ich denke, dass..." introduce el contenido del pensamiento.' },
          { options: ['Weil', 'Obwohl', 'Als', 'Damit'], answer: 'Weil', explain: '"Weil" inicio del Nebensatz causal. Cuando va primero, el verbo principal invierte: "bin ich".' },
          { options: ['weil', 'obwohl', 'damit', 'dass'], answer: 'weil', explain: '"weil" causa: aprende porque quiere estudiar en Alemania.' },
          { options: ['Wenn', 'Als', 'Obwohl', 'Weil'], answer: 'Wenn', explain: '"wenn" para condición futura: cuando (en el futuro) hable mejor...' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe las conjunciones',
        tag: 'Texto libre',
        intro: 'Escribe la conjunción correcta y pon el verbo en el lugar adecuado.',
        type: 'freeText',
        scene: 'Completa con la conjunción y el orden correcto.',
        text: 'Ich bleibe zuhause, [[0]] ich krank bin. (usa: porque) [[1]] es gestern sehr kalt war, habe ich meine Jacke angezogen. (usa: porque — Nebensatz inicial) Ich weiß, [[2]] du morgen kommst. (usa: que) Er geht joggen, [[3]] er müde ist. (usa: aunque) [[4]] ich als Kind lebte, hatten wir keinen Computer. (usa: cuando — pasado único)',
        blanks: [
          { answer: 'weil', accepted: ['weil'], explain: '"weil" = porque. Verbo al final del Nebensatz: "weil ich krank bin".' },
          { answer: 'Weil', accepted: ['weil', 'Weil'], explain: '"Weil" al inicio. Nebensatz va primero → inversión: "habe ich".' },
          { answer: 'dass', accepted: ['dass'], explain: '"dass" = que, para contenido de lo que se sabe.' },
          { answer: 'obwohl', accepted: ['obwohl'], explain: '"obwohl" = aunque. Contraste: aunque está cansado, sale a correr.' },
          { answer: 'Als', accepted: ['Als', 'als'], explain: '"als" = cuando, para período único del pasado.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa ideas complejas',
        tag: 'Producción',
        intro: 'Escribe oraciones complejas con Nebensätze según las indicaciones.',
        type: 'write',
        items: [
          {
            scene: 'Tu motivación para aprender alemán',
            prompt: 'Explica por qué aprendes alemán usando "weil".',
            answer: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.',
            accepted: ['weil'],
            explain: 'Estructura: Hauptsatz + , + weil + Subjekt + ... + Verb(final). Ej: weil ich die Sprache schön finde.',
          },
          {
            scene: 'Un contraste en tu vida',
            prompt: 'Describe algo que haces aunque sea difícil usando "obwohl".',
            answer: 'Obwohl Grammatik schwer ist, übe ich jeden Tag.',
            accepted: ['obwohl'],
            explain: 'Obwohl puede ir al inicio (luego inversión) o después del Hauptsatz. Ej: Ich gehe ins Fitnessstudio, obwohl ich müde bin.',
          },
          {
            scene: 'Un recuerdo de tu infancia',
            prompt: 'Describe algo que hacías cuando eras pequeño usando "als".',
            answer: 'Als ich klein war, spielte ich jeden Tag draußen.',
            accepted: ['als ich klein war', 'als ich jung war', 'als ich ein kind war'],
            explain: '"als" para período único pasado. La cláusula de infancia es un bloque temporal pasado.',
          },
          {
            scene: 'Tu rutina con una condición',
            prompt: 'Describe un hábito tuyo usando "wenn".',
            answer: 'Wenn ich gestresst bin, mache ich Yoga.',
            accepted: ['wenn'],
            explain: '"wenn" para hábitos o condiciones del presente. Ej: Wenn ich Zeit habe, koche ich gerne.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Cuéntame más',
        tag: 'Producción libre',
        intro: 'Usa tres conjunciones diferentes (weil, obwohl, als/wenn) para hablar de ti mismo.',
        type: 'write',
        items: [
          {
            scene: 'Tu razón favorita',
            prompt: 'Escribe una oración con "weil" explicando una decisión importante que tomaste.',
            answer: 'Ich habe Spanisch gelernt, weil ich nach Lateinamerika reisen wollte.',
            accepted: ['weil'],
            explain: 'Usa weil para expresar una causa real y personal.',
          },
          {
            scene: 'Tu mayor contradicción',
            prompt: 'Describe algo que haces aunque te cueste (usa obwohl).',
            answer: 'Ich stehe früh auf, obwohl ich nicht gerne früh aufstehe.',
            accepted: ['obwohl'],
            explain: 'Obwohl expresa un contraste real: la acción contradice la situación.',
          },
          {
            scene: 'Un recuerdo especial',
            prompt: 'Describe un momento especial de tu pasado usando "als".',
            answer: 'Als ich zum ersten Mal ins Ausland gereist bin, war ich sehr aufgeregt.',
            accepted: ['als'],
            explain: '"als" para momentos únicos del pasado. Verbos al final del Nebensatz.',
          },
        ],
      },
    ],
  },
}

export default topic
