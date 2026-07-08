import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'condizionale-passato-b1',
  order: '03',
  color: '#009246',
  category: 'Verbi',
  level: 'B1',
  title: 'Condizionale Passato en Italiano B1',
  shortTitle: 'Condizionale Passato',
  metaTitle: 'Condizionale Passato Italiano B1 — Habría/Hubiera + Participio',
  description:
    'El condizionale passato expresa acciones que habrían ocurrido en el pasado bajo ciertas condiciones, o deseos y arrepentimientos sobre el pasado. También es el tiempo del futuro en el pasado en el discurso indirecto. Equivale al español "habría + participio".',
  lead: 'Aprende a usar el condizionale passato para expresar hipótesis pasadas, arrepentimientos y el futuro en el pasado.',
  outcomes: [
    'Formar el condizionale passato con avrei/sarei + participio passato',
    'Expresar hipótesis sobre el pasado: "lo habría hecho si..."',
    'Usar el condizionale passato para cortesía y deseos no cumplidos',
    'Reconocer el condizionale passato en el discurso indirecto',
  ],

  guide: {
    goal: 'Expresar acciones hipotéticas del pasado, arrepentimientos y deseos no cumplidos usando el condizionale passato.',
    model: 'Avrei comprato quella casa. / Sarei andato se avessi avuto tempo. / Ha detto che sarebbe venuto.',
    formula: 'condizionale presente di avere/essere + participio passato',
    decisions: [
      'Condizionale di AVERE: avrei, avresti, avrebbe, avremmo, avreste, avrebbero',
      'Condizionale di ESSERE: sarei, saresti, sarebbe, saremmo, sareste, sarebbero',
      'Los mismos verbos que en el passato prossimo llevan essere también lo llevan aquí: sarei andato, sarei venuto, saresti partito',
      'El participio concuerda en género y número solo con ESSERE: sarei andato/andata; saremmo partiti/partite',
      'Usos: (1) hipótesis pasadas con "se" → periodo ipotetico tipo 3; (2) arrepentimiento/deseo no cumplido; (3) futuro en el pasado en discorso indiretto',
      'En el discorso indiretto: "Verrò domani" → ha detto che sarebbe venuto l\'indomani',
    ],
    table: [
      ['Sujeto', 'Con avere (comprare)', 'Con essere (andare)'],
      ['io', 'avrei comprato', 'sarei andato/a'],
      ['tu', 'avresti comprato', 'saresti andato/a'],
      ['lui/lei', 'avrebbe comprato', 'sarebbe andato/a'],
      ['noi', 'avremmo comprato', 'saremmo andati/e'],
      ['voi', 'avreste comprato', 'sareste andati/e'],
      ['loro', 'avrebbero comprato', 'sarebbero andati/e'],
    ],
    mistakes: [
      '"Avrei voluto andare" ✓ vs. "Sarei voluto andare" — "volere" lleva avere cuando la acción es transitiva; con essere si el verbo principal lo llevaría: "sarei voluto partire" ✓.',
      '"Ho avrei fatto" ❌ → "avrei fatto" ✓ — el condizionale passato ya incluye il participio passato, no se añade "ho".',
      '"Sarei comprato" ❌ → "avrei comprato" ✓ — "comprare" (transitivo) lleva avere, no essere.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el condizionale passato en italiano?',
      paragraphs: [
        'El condizionale passato es el tiempo compuesto del modo condicional. Equivale en español a "habría/hubiera + participio": "avrei comprato" = "habría comprado". Se forma combinando il condizionale presente degli ausiliari (avere o essere) con il participio passato del verbo principal.',
        'Este tiempo tiene tres usos principales en italiano: expresar hipótesis pasadas (lo que habría ocurrido si...), expresar arrepentimientos o deseos no cumplidos, y funcionar como futuro del pasado en el discurso indirecto.',
      ],
    },
    {
      heading: 'Formación del condizionale passato',
      paragraphs: [
        'La fórmula es: condizionale di avere/essere + participio passato. Para elegir el auxiliar, aplica la misma regla que para el passato prossimo: verbos transitivos → avere; verbos de movimiento, cambio de estado y reflexivos → essere.',
        'Ejemplos con avere: avrei mangiato, avresti dormito, avrebbe lavorato, avremmo visto, avreste capito, avrebbero finito. Ejemplos con essere: sarei andato/a, saresti venuto/a, sarebbe partito/a, saremmo tornati/e, sareste usciti/e, sarebbero arrivati/e.',
      ],
    },
    {
      heading: 'Usos del condizionale passato',
      paragraphs: [
        'Uso 1 — Hipótesis pasadas: aparece en la cláusula principal del período hipotético tipo 3 (condición imposible en el pasado): "Se avessi studiato di più, avrei superato l\'esame" (Si hubiera estudiado más, habría aprobado el examen). La condición va con il congiuntivo trapassato.',
        'Uso 2 — Arrepentimientos y deseos: "Avrei voluto studiare medicina" (Habría querido estudiar medicina). "Sarei rimasto a casa" (Me habría quedado en casa). Uso 3 — Futuro en el pasado (discorso indiretto): "Ti chiamerò" → ha detto che mi avrebbe chiamato (Dijo que me llamaría).',
      ],
    },
    {
      heading: 'Condizionale passato en el discurso indirecto',
      paragraphs: [
        'Cuando se reporta lo que alguien dijo en el pasado, el futuro simple se convierte en condizionale passato: "Verrò domani" → ha detto che sarebbe venuto l\'indomani. Este es el "futuro del pasado" en italiano, equivalente al español "que vendría".',
        'Transformaciones frecuentes: "Farò" → ha detto che avrebbe fatto; "Partirò" → ha detto che sarebbe partito/a; "Ti aiuterò" → ha promesso che mi avrebbe aiutato. Este uso es muy frecuente en el lenguaje formal y literario.',
      ],
    },
    {
      heading: 'Diferencia entre condizionale presente y passato',
      paragraphs: [
        'El condizionale presente expresa hipótesis en el presente/futuro: "Mangerei una pizza" (Comería una pizza — ahora o en el futuro). El condizionale passato expresa hipótesis en el pasado: "Avrei mangiato una pizza" (Habría comido una pizza — en el pasado, pero no ocurrió).',
        'También hay diferencia con los deseos: "Vorrei venire" (querría venir — es posible) vs. "Avrei voluto venire" (habría querido venir — ya no es posible, la oportunidad pasó). Esta distinción es fundamental para comunicarse con precisión.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Condizionale passato para hipótesis pasadas, arrepentimientos y futuro en el pasado.',
    graphicPrompt: 'Dos líneas de tiempo: una real y una hipotética mostrando lo que habría ocurrido.',
    scene: [
      ['Avrei voluto viaggiare di più.', 'Habría querido viajar más.'],
      ['Sarebbe venuta, ma era stanca.', 'Habría venido, pero estaba cansada.'],
      ['Con più soldi, avrei comprato quella casa.', 'Con más dinero, habría comprado esa casa.'],
      ['Ha detto che sarebbe arrivato alle otto.', 'Dijo que llegaría a las ocho.'],
      ['Se avessi saputo, ti avrei chiamato.', 'Si lo hubiera sabido, te habría llamado.'],
      ['Avremmo potuto finire prima.', 'Habríamos podido terminar antes.'],
      ['Avrei preferito restare a casa.', 'Habría preferido quedarme en casa.'],
      ['Pensavo che sarebbe stato più facile.', 'Pensaba que habría sido más fácil.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['auxiliar avere vs essere', 'concordancia del participio', 'futuro en el pasado'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el condizionale passato correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de condizionale passato para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Un arrepentimiento',
            lines: [['', 'Se avessi avuto più tempo, ___ di più.']],
            options: ['avrei studiato', 'studio', 'avrei studiare', 'sarei studiato'],
            answer: 'avrei studiato',
            explain: '"Studiare" lleva avere. Condizionale passato para "io": avrei studiato.',
          },
          {
            scene: 'Planes que no se cumplieron',
            lines: [['', 'Marco ___ con noi, ma aveva già un impegno.']],
            options: ['sarebbe venuto', 'è venuto', 'viene', 'avrebbe venuto'],
            answer: 'sarebbe venuto',
            explain: '"Venire" lleva essere. Para "Marco" (lui): sarebbe venuto.',
          },
          {
            scene: 'En el periódico',
            lines: [['', 'Il ministro ha annunciato che ___ una nuova legge.']],
            options: ['avrebbe firmato', 'ha firmato', 'firmerà', 'avesse firmato'],
            answer: 'avrebbe firmato',
            explain: 'Futuro en el pasado (discorso indiretto): "firmerò" → avrebbe firmato. "Firmare" lleva avere.',
          },
          {
            scene: 'Un deseo no cumplido',
            lines: [['', 'Da giovane, ___ diventare medico.']],
            options: ['avrei voluto', 'voglio', 'avrei volere', 'sarei voluto'],
            answer: 'avrei voluto',
            explain: '"Volere" con infinitivo transitivo lleva avere: avrei voluto. "Avrei voluto diventare medico."',
          },
          {
            scene: 'Un viaje que no se hizo',
            lines: [['', 'Se avessi avuto i soldi, ___ in Giappone.']],
            options: ['sarei andato', 'sono andato', 'avrei andato', 'vado'],
            answer: 'sarei andato',
            explain: '"Andare" lleva essere. Condizionale passato: sarei andato (concordancia masculina, "io").',
          },
          {
            scene: 'Promesa reportada',
            lines: [['', 'Lei mi ha promesso che ___ il libro la settimana dopo.']],
            options: ['avrebbe restituito', 'restituisce', 'ha restituito', 'avesse restituito'],
            answer: 'avrebbe restituito',
            explain: 'Futuro en el pasado. "Restituire" lleva avere: avrebbe restituito.',
          },
          {
            scene: 'Hipótesis del pasado',
            lines: [['', 'Avremmo ___ prima se il treno non fosse stato in ritardo.']],
            options: ['arrivato', 'arrivati', 'arrivare', 'arrivato'],
            answer: 'arrivato',
            explain: 'Con essere en condicional plural (avremmo — pero aquí con avere: "arrivare" → avremmo arrivato, sin essere).',
          },
          {
            scene: 'Mejor decisión',
            lines: [['', 'Al posto tuo, ___ un esperto prima di decidere.']],
            options: ['avrei consultato', 'consulto', 'sarei consultato', 'consulterei'],
            answer: 'avrei consultato',
            explain: '"Consultare" lleva avere. Para dar un consejo sobre el pasado: avrei consultato.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Consecuencias hipotéticas del pasado',
        tag: '2 espacios',
        intro: 'Completa las dos formas de condizionale passato para expresar hipótesis pasadas.',
        type: 'dual',
        items: [
          {
            scene: 'Reflexión sobre el pasado',
            lines: [['', 'Se avessi studiato di più, [[0]] l\'esame e [[1]] una borsa di studio.']],
            blanks: [
              { options: ['avrei superato', 'supero', 'sarei superato', 'ho superato'], answer: 'avrei superato', explain: '"Superare" lleva avere: avrei superato.' },
              { options: ['avrei ottenuto', 'ottengo', 'sarei ottenuto', 'ho ottenuto'], answer: 'avrei ottenuto', explain: '"Ottenere" lleva avere: avrei ottenuto.' },
            ],
          },
          {
            scene: 'Promesas del pasado',
            lines: [['', 'Ha detto che [[0]] presto e che [[1]] un regalo.']],
            blanks: [
              { options: ['sarebbe tornato', 'torna', 'è tornato', 'tornerebbe'], answer: 'sarebbe tornato', explain: 'Futuro en el pasado. "Tornare" lleva essere: sarebbe tornato.' },
              { options: ['avrebbe portato', 'porta', 'ha portato', 'porterebbe'], answer: 'avrebbe portato', explain: 'Futuro en el pasado. "Portare" lleva avere: avrebbe portato.' },
            ],
          },
          {
            scene: 'Deseos no realizados',
            lines: [['', 'Da bambino, [[0]] diventare pilota e [[1]] il mondo intero.']],
            blanks: [
              { options: ['avrei voluto', 'voglio', 'sarei voluto', 'volevo'], answer: 'avrei voluto', explain: '"Volere" + infinitivo transitivo → avere: avrei voluto.' },
              { options: ['avrei viaggiato', 'viaggio', 'sarei viaggiato', 'ho viaggiato'], answer: 'avrei viaggiato', explain: '"Viaggiare" lleva avere: avrei viaggiato.' },
            ],
          },
          {
            scene: 'Noticias del periodico',
            lines: [['', 'I giornali scrivevano che la squadra [[0]] la finale e [[1]] il campionato.']],
            blanks: [
              { options: ['avrebbe giocato', 'gioca', 'ha giocato', 'giocherebbe'], answer: 'avrebbe giocato', explain: 'Futuro en el pasado. "Giocare" lleva avere: avrebbe giocato.' },
              { options: ['avrebbe vinto', 'vince', 'ha vinto', 'vincerebbe'], answer: 'avrebbe vinto', explain: '"Vincere" lleva avere. Futuro en el pasado: avrebbe vinto.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Carta de una viajera',
        tag: 'Texto guiado',
        intro: 'Completa la carta eligiendo entre condizionale passato y otras formas verbales.',
        type: 'guidedText',
        scene: 'Elige la forma correcta de condizionale passato donde sea necesario.',
        text: 'Cara Giulia, finalmente sono tornata dal Giappone! È stato un viaggio incredibile. Prima di partire, pensavo che il cibo [[0]] troppo diverso per me, ma mi sbagliavo! Sinceramente, [[1]] di più se avessi avuto più tempo. Il mio collega aveva detto che [[2]] in Giappone l\'anno scorso ma alla fine non è andata. Senza i problemi di volo, [[3]] prima e avrei avuto più giorni. Ti [[4]] prima, ma non avevo segnale. Se potessi tornare, [[5]] altre città come Kyoto e Nara. A presto!',
        blanks: [
          { options: ['sarebbe stato', 'è stato', 'sia stato', 'sarebbe essere'], answer: 'sarebbe stato', explain: 'Hipótesis antes del viaje (lo que creía antes). "Essere" lleva essere: sarebbe stato.' },
          { options: ['avrei viaggiato', 'ho viaggiato', 'viaggio', 'avessi viaggiato'], answer: 'avrei viaggiato', explain: 'Deseo no cumplido del pasado. "Viaggiare" lleva avere: avrei viaggiato.' },
          { options: ['sarebbe andata', 'va', 'sia andata', 'sarebbe andare'], answer: 'sarebbe andata', explain: 'Futuro en el pasado (lo que dijo el colega). "Andare" lleva essere: sarebbe andata.' },
          { options: ['sarei arrivata', 'sono arrivata', 'arrivo', 'sarei arrivare'], answer: 'sarei arrivata', explain: '"Arrivare" lleva essere. Hipótesis pasada: sarei arrivata (femenino).' },
          { options: ['avrei chiamato', 'ho chiamato', 'chiamo', 'avessi chiamato'], answer: 'avrei chiamato', explain: '"Chiamare" lleva avere. Hipótesis del pasado: avrei chiamato.' },
          { options: ['avrei visitato', 'visito', 'ho visitato', 'avessi visitato'], answer: 'avrei visitato', explain: '"Visitare" lleva avere. Hipótesis sobre lo que haría si regresara: avrei visitato.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con condizionale passato',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de condizionale passato del verbo indicado.',
        type: 'freeText',
        scene: 'Escribe el condizionale passato del verbo entre paréntesis.',
        text: 'Se non fosse piovuto, [[0]] (uscire) con gli amici. Il direttore ha annunciato che [[1]] (prendere) una decisione entro lunedì. [[2]] (preferire) studiare medicina, ma alla fine ho scelto legge. Loro mi hanno detto che [[3]] (arrivare) entro le tre. Con più coraggio, [[4]] (dire) la verità fin dall\'inizio.',
        blanks: [
          { answer: 'sarei uscito', accepted: ['sarei uscito', 'sarei uscita'], explain: '"Uscire" lleva essere. Para "io": sarei uscito/a.' },
          { answer: 'avrebbe preso', accepted: ['avrebbe preso'], explain: '"Prendere" lleva avere. Futuro en el pasado: avrebbe preso.' },
          { answer: 'avrei preferito', accepted: ['avrei preferito'], explain: '"Preferire" lleva avere. Deseo pasado no cumplido: avrei preferito.' },
          { answer: 'sarebbero arrivati', accepted: ['sarebbero arrivati', 'sarebbero arrivate'], explain: '"Arrivare" lleva essere. Para "loro": sarebbero arrivati/e.' },
          { answer: 'avrei detto', accepted: ['avrei detto'], explain: '"Dire" lleva avere. Hipótesis pasada: avrei detto. Participio irregular: detto.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Hipótesis y arrepentimientos',
        tag: 'Producción',
        intro: 'Escribe oraciones con condizionale passato expresando hipótesis o arrepentimientos.',
        type: 'write',
        items: [
          {
            scene: 'Un arrepentimiento',
            prompt: 'Expresa algo que habrías hecho diferente en tu vida usando "avrei/sarei".',
            answer: 'Avrei imparato a suonare la chitarra da bambino.',
            accepted: ['avrei', 'sarei', 'avrebbe', 'avremmo', 'avrei voluto', 'avrei studiato', 'sarei andato'],
            explain: 'Ejemplo: Avrei studiato di più al liceo. / Sarei andato a vivere all\'estero.',
          },
          {
            scene: 'Una promesa reportada',
            prompt: 'Reporta lo que alguien prometió hacer usando el futuro en el pasado.',
            answer: 'Il mio capo ha detto che mi avrebbe aumentato lo stipendio.',
            accepted: ['ha detto che', 'mi ha promesso che', 'avrebbe', 'sarebbe', 'avrebbero', 'sarebbero'],
            explain: 'Ejemplo: Ha promesso che sarebbe arrivato in orario. / Ha detto che avrebbe finito il progetto presto.',
          },
          {
            scene: 'Una hipótesis contrafactual',
            prompt: 'Expresa lo que habría pasado bajo una condición diferente (usa "se" + congiuntivo trapassato o simplemente el condizionale passato solo).',
            answer: 'Avrei preso un taxi, ma non avevo contanti.',
            accepted: ['avrei', 'sarei', 'avremmo', 'sarebbero', 'avrebbe', 'sarebbe'],
            explain: 'Ejemplo: Avrei chiamato, ma non avevo il tuo numero. / Saremmo rimasti, ma era tardissimo.',
          },
          {
            scene: 'Mejor decisión',
            prompt: 'Di lo que habrías hecho tú en lugar de otra persona usando "al posto tuo, avrei/sarei...".',
            answer: 'Al posto tuo, avrei accettato quell\'offerta di lavoro senza esitare.',
            accepted: ['al posto tuo', 'avrei', 'sarei', 'avrei accettato', 'avrei detto', 'sarei partito', 'avrei aspettato'],
            explain: 'Ejemplo: Al posto tuo, avrei parlato direttamente col direttore. / Sarei partito prima per evitare il traffico.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu historia hipotética',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones usando el condizionale passato en diferentes contextos.',
        type: 'write',
        items: [
          {
            scene: 'El camino no tomado',
            prompt: 'Escribe sobre una decisión del pasado que podrías haber tomado diferente.',
            answer: 'Avrei scelto di studiare all\'estero se avessi avuto più coraggio.',
            accepted: ['avrei', 'sarei', 'avrei scelto', 'avrei studiato', 'sarei andato', 'avrei aspettato', 'avrei detto'],
            explain: 'Ejemplo: Sarei rimasto in quella città se avessi trovato lavoro. / Avrei imparato il cinese da bambino.',
          },
          {
            scene: 'Lo que dijiste o prometiste',
            prompt: 'Reporta algo que tú u otra persona dijeron que harían (pero quizás no lo hicieron).',
            answer: 'Gli avevo promesso che l\'avrei aiutato a traslocare il sabato.',
            accepted: ['ha detto che', 'avevo promesso che', 'mi aveva detto che', 'avrebbe', 'sarebbe', 'avrei', 'sarei'],
            explain: 'Ejemplo: Aveva detto che sarebbe passato a trovarmi. / Le avevo promesso che avrei cucinato io quella sera.',
          },
          {
            scene: 'Un deseo no cumplido',
            prompt: 'Expresa algo que habrías querido hacer pero que no fue posible.',
            answer: 'Avrei voluto vedere quel film al cinema, ma era già uscito dalla programmazione.',
            accepted: ['avrei voluto', 'avrei preferito', 'avrei amato', 'sarei voluto', 'avrei potuto'],
            explain: 'Ejemplo: Avrei voluto conoscere quella persona. / Sarei rimasto di più ma dovevo lavorare.',
          },
        ],
      },
    ],
  },
}

export default topic
