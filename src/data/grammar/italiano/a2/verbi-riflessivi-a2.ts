import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbi-riflessivi-a2',
  order: '08',
  color: '#009246',
  category: 'Verbi riflessivi',
  level: 'A2',
  title: 'Los verbos reflexivos en italiano A2 — svegliarsi, alzarsi, lavarsi',
  shortTitle: 'Verbos reflexivos',
  metaTitle: 'Verbos reflexivos italiano A2 — svegliarsi, alzarsi, lavarsi al presente y passato',
  description:
    'Los verbos reflexivos expresan acciones que el sujeto hace sobre sí mismo. Se conjugan con los pronombres reflexivos mi, ti, si, ci, vi, si. En el passato prossimo siempre usan essere como auxiliar, y el participio concuerda en género y número con el sujeto.',
  lead: 'mi, ti, si, ci, vi, si + verbo. Presente: mi sveglio, ti alzi, si lava. Passato: mi sono svegliato/a. Con essere → participio concuerda con el sujeto.',
  outcomes: [
    'Conjugar verbos reflexivos en el presente indicativo',
    'Usar los pronombres reflexivos mi, ti, si, ci, vi, si correctamente',
    'Formar el passato prossimo de verbos reflexivos con essere',
    'Hacer concordar el participio con el sujeto en género y número',
  ],

  guide: {
    goal: 'Conjugar verbos reflexivos en presente y passato prossimo para describir la rutina diaria.',
    model: 'Mi sveglio alle sette. / Si è alzata tardi. / Ci siamo lavati le mani.',
    formula: 'pronombre reflexivo (mi/ti/si/ci/vi/si) + verbo (infinitivo sin -si)',
    decisions: [
      'Presente: mi sveglio, ti svegli, si sveglia, ci svegliamo, vi svegliate, si svegliano',
      'Passato prossimo: sempre con essere → mi sono svegliato/a',
      'Participio concuerda: io (m.) → svegliato, io (f.) → svegliata; noi → svegliati/e',
      'Verbi comuni: svegliarsi, alzarsi, lavarsi, vestirsi, pettinarsi, truccarsi, addormentarsi, chiamarsi, sposarsi, sentirsi',
      'El pronombre va ANTES del verbo conjugado: mi lavo, non si è alzato',
      'Con infinitivo: il pronombre se une al infinitivo sin -e: voglio alzarmi, devo lavarmi',
    ],
    table: [
      ['Persona', 'Presente (svegliarsi)', 'Passato prossimo'],
      ['io (m.)', 'mi sveglio', 'mi sono svegliato'],
      ['io (f.)', 'mi sveglio', 'mi sono svegliata'],
      ['tu', 'ti svegli', 'ti sei svegliato/a'],
      ['lui/lei', 'si sveglia', 'si è svegliato/a'],
      ['noi', 'ci svegliamo', 'ci siamo svegliati/e'],
      ['voi', 'vi svegliate', 'vi siete svegliati/e'],
      ['loro', 'si svegliano', 'si sono svegliati/e'],
    ],
    mistakes: [
      'Usar avere en lugar de essere: Ho svegliato ✗ → Mi sono svegliato ✓',
      'No concordar el participio: Mi sono svegliato (un hombre) / Mi sono svegliata (una mujer)',
      'Olvidar el pronombre reflexivo: Sveglio alle sette ✗ → Mi sveglio alle sette ✓',
    ],
  },

  seo: [
    {
      heading: 'Los verbos reflexivos en italiano: la rutina diaria',
      paragraphs: [
        'Los verbos reflexivos (verbi riflessivi) describen acciones que el sujeto hace sobre sí mismo: lavarsi (lavarse), alzarsi (levantarse), vestirsi (vestirse). Se identifican por el sufijo -si en el infinitivo y por los pronombres reflexivos que los acompañan.',
        'En el presente, el pronombre reflexivo siempre va antes del verbo conjugado: mi lavo, ti lavi, si lava, ci laviamo, vi lavate, si lavano. En el infinitivo, se une al final: voglio lavarmi, devo alzarmi.',
      ],
    },
    {
      heading: 'Passato prossimo de verbos reflexivos: siempre con essere',
      paragraphs: [
        'Todos los verbos reflexivos forman el passato prossimo con essere. Esto significa que el participio tiene que concordar en género y número con el sujeto: mi sono alzato (él), mi sono alzata (ella), ci siamo alzati (ellos masc./mixto), ci siamo alzate (ellas).',
        'Los errores más comunes son usar avere (ho alzato ✗) y olvidar la concordancia del participio. Recuerda: essere + participio variable es la fórmula de todos los reflexivos.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a conjugar verbos reflexivos en presente y passato con la concordancia del participio.',
    graphicPrompt: 'Línea de tiempo de una mañana típica: svegliarsi, alzarsi, lavarsi, vestirsi, fare colazione.',
    scene: [
      ['Mi sveglio alle sette ogni mattina.', 'Me despierto a las siete cada mañana.'],
      ['Si è alzata tardi oggi.', 'Ella se levantó tarde hoy.'],
      ['Ci siamo vestiti velocemente.', 'Nos vestimos rápidamente.'],
      ['Come ti chiami?', '¿Cómo te llamas?'],
    ],
    learnerModes: ['visual: secuencia de rutina mañanera', 'analítico: essere + participio variable', 'oral: describir la propia rutina'],
    practiceVerbs: ['svegliarsi', 'alzarsi', 'lavarsi', 'vestirsi', 'pettinarsi', 'addormentarsi', 'chiamarsi', 'sentirsi'],
    reviewFocus: ['essere en passato prossimo', 'concordancia del participio', 'pronombre reflexivo antes del verbo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'La rutina de Sofia',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo reflexivo.',
        type: 'choice',
        items: [
          {
            scene: 'Por la mañana',
            lines: [['Sofia', 'Ogni mattina ___ alle sette. (svegliarsi)']],
            options: ['mi sveglio', 'sveglio', 'si sveglia', 'mi sveglia'],
            answer: 'mi sveglio',
            explain: 'Yo me despierto: prima persona singular → mi sveglio.',
          },
          {
            scene: 'Marco',
            lines: [['David', 'Marco ___ sempre tardi il weekend. (alzarsi)']],
            options: ['si alza', 'si alzano', 'mi alzo', 'ti alzi'],
            answer: 'si alza',
            explain: 'Marco (lui) → si alza. Tercera persona singular.',
          },
          {
            scene: 'Nosotros',
            lines: [['Sofia', 'Noi ___ sempre le mani prima di mangiare. (lavarsi)']],
            options: ['ci laviamo', 'si lavano', 'vi lavate', 'mi lavo'],
            answer: 'ci laviamo',
            explain: 'Noi → ci laviamo. Primera persona plural.',
          },
          {
            scene: 'Passato prossimo',
            lines: [['Marco', 'Ieri mi ___ alle nove. (svegliarsi — masc.)']],
            options: ['sono svegliato', 'ho svegliato', 'sono svegliata', 'ero svegliato'],
            answer: 'sono svegliato',
            explain: 'Reflexivo → essere. Sujeto masculino → svegliato. Mi sono svegliato.',
          },
          {
            scene: 'Giulia ayer',
            lines: [['Giulia', 'Ieri mi ___ tardissimo. (addormentarsi — fem.)']],
            options: ['sono addormentata', 'ho addormentato', 'sono addormentato', 'ero addormentata'],
            answer: 'sono addormentata',
            explain: 'Reflexivo → essere. Sujeto femenino → addormentata.',
          },
          {
            scene: 'Los estudiantes',
            lines: [['Prof.', 'Gli studenti ___ i capelli prima dell\'esame. (pettinarsi)']],
            options: ['si pettinano', 'ci pettiniamo', 'si pettina', 'vi pettinate'],
            answer: 'si pettinano',
            explain: 'Gli studenti (loro) → si pettinano.',
          },
          {
            scene: 'La presentación',
            lines: [['Luca', 'Come ___ il nuovo studente? (chiamarsi)']],
            options: ['si chiama', 'ti chiami', 'mi chiamo', 'si chiamano'],
            answer: 'si chiama',
            explain: 'Il nuovo studente (lui) → si chiama. ¿Cómo se llama?',
          },
          {
            scene: 'Vosotros',
            lines: [['David', 'A che ora ___ la mattina? (alzarsi — voi)']],
            options: ['vi alzate', 'si alzano', 'ci alziamo', 'vi alzano'],
            answer: 'vi alzate',
            explain: 'Voi → vi alzate.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombre + participio',
        tag: '2 espacios',
        intro: 'Completa con el pronombre reflexivo y el participio correcto en el passato prossimo.',
        type: 'dual',
        items: [
          {
            scene: 'Giulia esta mañana',
            lines: [['Giulia', 'Stamattina [[0]] sono [[1]] alle sei. (svegliarsi — fem.)']],
            blanks: [
              { options: ['mi', 'si', 'ti', 'ci'], answer: 'mi', explain: 'Primera persona (io) → mi.' },
              { options: ['svegliata', 'svegliato', 'svegliati', 'svegliate'], answer: 'svegliata', explain: 'Sujeto femenino (Giulia/io) → svegliata.' },
            ],
          },
          {
            scene: 'Los niños',
            lines: [['Marco', 'I bambini [[0]] sono [[1]] presto per la gita. (alzarsi)']],
            blanks: [
              { options: ['si', 'mi', 'ci', 'vi'], answer: 'si', explain: 'I bambini (loro) → si.' },
              { options: ['alzati', 'alzato', 'alzata', 'alzate'], answer: 'alzati', explain: 'Sujeto masculino plural → alzati.' },
            ],
          },
          {
            scene: 'Nosotros anoche',
            lines: [['Sofia', 'Ieri sera [[0]] siamo [[1]] tardi. (addormentarsi — noi, gruppo misto)']],
            blanks: [
              { options: ['ci', 'vi', 'si', 'mi'], answer: 'ci', explain: 'Noi → ci.' },
              { options: ['addormentati', 'addormentato', 'addormentata', 'addormentate'], answer: 'addormentati', explain: 'Grupo mixto → addormentati (masculino plural por defecto).' },
            ],
          },
          {
            scene: 'Tú ayer',
            lines: [['David', '— A che ora [[0]] sei [[1]] ieri? (alzarsi — tu, masc.)']],
            blanks: [
              { options: ['ti', 'mi', 'si', 'vi'], answer: 'ti', explain: 'Segunda persona (tu) → ti.' },
              { options: ['alzato', 'alzata', 'alzati', 'alzate'], answer: 'alzato', explain: 'Sujeto masculino singular → alzato.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La rutina de Marco',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma correcta del verbo reflexivo (presente).',
        type: 'guidedText',
        scene: 'Marco describe su rutina matutina',
        text: 'Ogni mattina [[0]] alle sette. (svegliarsi) Poi [[1]] e vado in bagno. (alzarsi) In bagno [[2]] la faccia e [[3]] i denti. (lavarsi / lavarsi) Dopo [[4]] velocemente e faccio colazione. (vestirsi)',
        blanks: [
          { options: ['mi sveglio', 'si sveglia', 'ti svegli'], answer: 'mi sveglio', explain: 'Marco (io narratore) → mi sveglio.' },
          { options: ['mi alzo', 'si alza', 'ci alziamo'], answer: 'mi alzo', explain: 'Io → mi alzo.' },
          { options: ['mi lavo', 'si lava', 'ti lavi'], answer: 'mi lavo', explain: 'Io mi lavo la faccia.' },
          { options: ['mi lavo', 'si lava', 'ci laviamo'], answer: 'mi lavo', explain: 'Io mi lavo i denti.' },
          { options: ['mi vesto', 'si veste', 'ti vesti'], answer: 'mi vesto', explain: 'Io → mi vesto.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del passato prossimo reflexivo.',
        type: 'freeText',
        scene: 'Giulia describe su sábado pasado',
        text: 'Sabato scorso [[0]] alle dieci. (svegliarsi — fem.) Poi [[1]] con calma. (alzarsi — fem.) [[2]] i capelli e [[3]] un po\'. (pettinarsi — fem. / truccarsi — fem.) La sera [[4]] tardi perché guardavo un film. (addormentarsi — fem.)',
        blanks: [
          { answer: 'mi sono svegliata', explain: 'Reflexivo + essere + participio femenino: mi sono svegliata.' },
          { answer: 'mi sono alzata', explain: 'Mi sono alzata (femenino).' },
          { answer: 'mi sono pettinata', explain: 'Mi sono pettinata (femenino).' },
          { answer: 'mi sono truccata', explain: 'Mi sono truccata (femenino).' },
          { answer: 'mi sono addormentata', explain: 'Mi sono addormentata (femenino).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Oraciones reflexivas completas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con el verbo reflexivo indicado.',
        type: 'write',
        items: [
          {
            scene: 'La rutina',
            prompt: 'Ogni mattina mi ___ (lavarsi) alle sette. Scrivi la frase completa.',
            answer: 'Ogni mattina mi lavo alle sette.',
            accepted: ['ogni mattina mi lavo alle sette', 'mi lavo alle sette ogni mattina'],
            explain: 'Io mi lavo (presente). Il pronome riflessivo mi precede il verbo.',
          },
          {
            scene: 'Ayer',
            prompt: 'Ieri sera mi ___ (addormentarsi) tardi — masc. Scrivi la frase completa.',
            answer: 'Ieri sera mi sono addormentato tardi.',
            accepted: ['ieri sera mi sono addormentato tardi', 'mi sono addormentato tardi ieri sera'],
            explain: 'Passato prossimo: mi sono + addormentato (masch.) con essere.',
          },
          {
            scene: 'Plural',
            prompt: 'I bambini si ___ (vestirsi) da soli. Scrivi la frase completa.',
            answer: 'I bambini si vestono da soli.',
            accepted: ['i bambini si vestono da soli'],
            explain: 'I bambini (loro) → si vestono.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mi rutina libre',
        tag: 'Escritura libre',
        intro: 'Describe tu rutina diaria usando verbos reflexivos en presente o passato prossimo.',
        type: 'write',
        items: [
          {
            scene: 'Tu mañana',
            prompt: 'La mattina mi ___ alle... poi mi ___ e... (describe tu rutina con 3 verbos reflexivos)',
            answer: 'La mattina mi sveglio alle sette, mi lavo e mi vesto velocemente.',
            accepted: ['mi sveglio', 'mi alzo', 'mi lavo', 'mi vesto', 'mi pettino'],
            explain: 'Rutina: svegliarsi, alzarsi, lavarsi, vestirsi, pettinarsi...',
          },
          {
            scene: 'Ayer',
            prompt: 'Ieri mi sono ___ alle... poi mi sono ___ (2 verbos reflexivos en passato)',
            answer: 'Ieri mi sono svegliato/a alle otto e mi sono vestito/a in fretta.',
            accepted: ['mi sono svegliato', 'mi sono svegliata', 'mi sono alzato', 'mi sono alzata'],
            explain: 'Passato prossimo reflexivo: mi sono + participio (concordado con género).',
          },
          {
            scene: 'Alguien que conoces',
            prompt: 'Il mio amico/La mia amica si ___ (rutina de otra persona con 2 acciones)',
            answer: 'Il mio amico si sveglia molto tardi e si veste sempre con cura.',
            accepted: ['si sveglia', 'si alza', 'si lava', 'si veste', 'si chiama'],
            explain: 'Tercera persona singular: si sveglia, si alza, si lava...',
          },
        ],
      },
    ],
  },
}

export default topic
