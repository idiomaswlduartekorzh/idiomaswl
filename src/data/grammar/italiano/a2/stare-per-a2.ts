import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'stare-per-a2',
  order: '14',
  color: '#009246',
  category: 'Perifrasi verbali',
  level: 'A2',
  title: 'Stare per + infinito en italiano A2 — inminencia de una acción',
  shortTitle: 'Stare per + infinito',
  metaTitle: 'Stare per + infinito italiano A2 — sto per uscire, sta per piovere',
  description:
    'La perífrasis "stare per + infinito" expresa que una acción es inminente, que está a punto de ocurrir. Equivale a "estar a punto de" en español. Se conjuga stare en el tiempo deseado: sto per (presente), stavo per (imperfecto), starò per (futuro).',
  lead: 'stare per + infinito = estar a punto de. Sto per uscire (estoy a punto de salir). Sta per piovere (está a punto de llover). Conjugar stare según el sujeto.',
  outcomes: [
    'Usar stare per + infinito para expresar acciones inminentes en el presente',
    'Conjugar stare correctamente con todos los sujetos',
    'Usar stavo per + infinito para acciones que estaban a punto de ocurrir en el pasado',
    'Distinguir stare per (inminencia) de stare + gerundio (acción en curso)',
  ],

  guide: {
    goal: 'Expresar que una acción está a punto de ocurrir usando stare per + infinito.',
    model: 'Sto per uscire — aspettami! / Sta per piovere — prendi l\'ombrello. / Stavo per chiamarti quando sei arrivato.',
    formula: 'stare (conjugado) + per + infinito del verbo principal',
    decisions: [
      'io → sto per: sto per mangiare = estoy a punto de comer',
      'tu → stai per: stai per uscire? = ¿estás a punto de salir?',
      'lui/lei → sta per: sta per arrivare = está a punto de llegar',
      'noi → stiamo per: stiamo per iniziare = estamos a punto de empezar',
      'voi → state per: state per finire? = ¿estáis a punto de terminar?',
      'loro → stanno per: stanno per partire = están a punto de partir',
      'Passato: stavo per + infinito = estaba a punto de (pero no ocurrió o sí ocurrió)',
      'Contraste: sto mangiando (estoy comiendo) vs sto per mangiare (estoy a punto de comer)',
    ],
    table: [
      ['Persona', 'Stare per (presente)', 'Ejemplo'],
      ['io', 'sto per', 'Sto per chiamarti'],
      ['tu', 'stai per', 'Stai per uscire?'],
      ['lui/lei', 'sta per', 'Sta per iniziare il film'],
      ['noi', 'stiamo per', 'Stiamo per mangiare'],
      ['voi', 'state per', 'State per finire?'],
      ['loro', 'stanno per', 'Stanno per arrivare'],
    ],
    mistakes: [
      'Omitir "per": sto uscire ✗ → sto per uscire ✓',
      'Confundir con stare + gerundio: sto uscendo (estoy saliendo, ahora) vs sto per uscire (estoy a punto de salir, muy pronto)',
      'Usar stare per con passato prossimo: sto per ho mangiato ✗ → ho appena mangiato (acabo de comer) ✓',
    ],
  },

  seo: [
    {
      heading: 'Stare per + infinito: inminencia en italiano',
      paragraphs: [
        'Stare per + infinito es la forma más natural de decir "estar a punto de": "Sto per uscire" (estoy a punto de salir), "Il treno sta per partire". Expresa inminencia (segundos o minutos). Conviene no confundirla con dos perífrasis vecinas — esta tabla las separa:',
      ],
      table: [
        ['Perífrasis', 'Significado', 'Ejemplo'],
        ['stare per + infinito', 'a punto de (inminente)', 'Sto per mangiare.'],
        ['stare + gerundio', 'en curso (ahora mismo)', 'Sto mangiando.'],
        ['appena + passato prossimo', 'acabar de (recién)', 'Ho appena mangiato.'],
      ],
    },
    {
      heading: 'La conjugación de "stare per"',
      paragraphs: [
        'Solo se conjuga "stare" (irregular); "per + infinito" no cambia. En pasado, "stavo per + infinito" = estaba a punto de: "Stavo per uscire quando ha telefonato Marco". Esta es la forma presente:',
      ],
      table: [
        ['Persona', 'stare per + infinito'],
        ['io', 'sto per partire'],
        ['tu', 'stai per partire'],
        ['lui/lei', 'sta per partire'],
        ['noi', 'stiamo per partire'],
        ['voi', 'state per partire'],
        ['loro', 'stanno per partire'],
      ],
    },
    {
      heading: '¿Cómo se dice "estar a punto de" en italiano?',
      paragraphs: [
        'Con "stare per" + infinitivo: "Sto per partire" (estoy a punto de salir), "Sta per piovere" (está a punto de llover). Solo se conjuga stare; el infinitivo queda fijo. En pasado: "Stavo per chiamarti" (estaba a punto de llamarte).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "stare per" y "stare + gerundio"?',
      paragraphs: [
        '"stare per + infinito" = la acción va a ocurrir enseguida (Sto per mangiare = estoy a punto de comer). "stare + gerundio" = la acción ya está ocurriendo (Sto mangiando = estoy comiendo). Una es inminencia, la otra es acción en curso.',
      ],
    },
    {
      heading: '¿Cómo se dice "acabar de" en italiano?',
      paragraphs: [
        'Con "appena" + passato prossimo: "Ho appena mangiato" (acabo de comer), "È appena uscito" (acaba de salir). No se usa "stare per" para eso: stare per es lo que va a pasar; "appena" + passato prossimo es lo que acaba de pasar.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante usa stare per + infinito para inminencia y distingue esta perífrasis de stare + gerundio.',
    graphicPrompt: 'Reloj a punto de marcar la hora, tren a punto de salir, nube oscura a punto de llover.',
    scene: [
      ['Sto per uscire, aspettami!', 'Estoy a punto de salir, ¡espérame!'],
      ['Sta per piovere, prendi l\'ombrello.', 'Está a punto de llover, coge el paraguas.'],
      ['Stiamo per iniziare la lezione.', 'Estamos a punto de empezar la clase.'],
      ['Stavo per chiamarti!', '¡Estaba a punto de llamarte!'],
    ],
    learnerModes: ['visual: flecha de inminencia en línea de tiempo', 'analítico: stare per vs stare + gerundio', 'oral: anunciar acciones inminentes'],
    reviewFocus: ['sto/stai/sta/stiamo/state/stanno per', 'per + infinito (nunca gerundio)', 'stavo per en el pasado'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige stare per correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de stare per + infinito.',
        type: 'choice',
        items: [
          {
            scene: 'A punto de salir',
            lines: [['Marco', '___ uscire, non posso rispondere adesso.']],
            options: ['Sto per', 'Stare per', 'Sto di', 'Per sto'],
            answer: 'Sto per',
            explain: 'Io sto per: prima persona singular de stare + per + infinito.',
          },
          {
            scene: 'El tiempo',
            lines: [['Sofia', 'Porta l\'ombrello! ___ piovere.']],
            options: ['Sta per', 'Sto per', 'Stanno per', 'Stiamo per'],
            answer: 'Sta per',
            explain: 'El cielo (lui/lei) sta per piovere: tercera persona singular.',
          },
          {
            scene: 'La clase',
            lines: [['Bruno', 'Silenzio! ___ iniziare la lezione.']],
            options: ['Stiamo per', 'Sto per', 'Stanno per', 'State per'],
            answer: 'Stiamo per',
            explain: 'Noi (Bruno y la clase) stiamo per: primera persona plural.',
          },
          {
            scene: 'Los amigos',
            lines: [['Giulia', 'Marco e Luca ___ arrivare. Li aspettiamo?']],
            options: ['stanno per', 'sta per', 'stai per', 'stiamo per'],
            answer: 'stanno per',
            explain: 'Marco e Luca (loro) stanno per: tercera persona plural.',
          },
          {
            scene: 'El pasado',
            lines: [['Carlo', '___ uscire quando ha squillato il telefono.']],
            options: ['Stavo per', 'Sto per', 'Starò per', 'Stavi per'],
            answer: 'Stavo per',
            explain: 'Pasado: estaba a punto de salir → stavo per (imperfetto di stare).',
          },
          {
            scene: '¿Termináis?',
            lines: [['Prof.', '___ finire l\'esercizio?']],
            options: ['State per', 'Stiamo per', 'Stanno per', 'Sta per'],
            answer: 'State per',
            explain: 'Voi state per: segunda persona plural.',
          },
          {
            scene: 'Stare per vs gerundio',
            lines: [['Luca', 'Non ora — ___ mangiare. (acción inminente)']],
            options: ['sto per', 'sto mangiando', 'mangio', 'mangerei'],
            answer: 'sto per',
            explain: 'Acción inminente (no en curso): sto per mangiare = estoy a punto de comer.',
          },
          {
            scene: 'El tren',
            lines: [['Ana', 'Corro! Il treno ___ partire!']],
            options: ['sta per', 'stanno per', 'sto per', 'stai per'],
            answer: 'sta per',
            explain: 'Il treno (lui) sta per partire: tercera persona singular.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Stare conjugado + per',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de stare y el infinito del verbo indicado.',
        type: 'dual',
        items: [
          {
            scene: 'Clara',
            lines: [['Clara', '[[0]] per [[1]] una riunione. Non disturbarmi!']],
            blanks: [
              { options: ['Sto', 'Stai', 'Sta', 'Stiamo'], answer: 'Sto', explain: 'Io sto per: primera persona singular.' },
              { options: ['iniziare', 'iniziando', 'iniziato'], answer: 'iniziare', explain: 'Stare per + infinito (nunca gerundio).' },
            ],
          },
          {
            scene: 'Los estudiantes',
            lines: [['Prof.', 'Gli studenti [[0]] per [[1]] i compiti.']],
            blanks: [
              { options: ['stanno', 'stiamo', 'sta', 'state'], answer: 'stanno', explain: 'Gli studenti (loro) → stanno per.' },
              { options: ['consegnare', 'consegnando', 'consegnato'], answer: 'consegnare', explain: 'Stare per + infinito: consegnare.' },
            ],
          },
          {
            scene: 'Sofia',
            lines: [['Marco', '— Aspetta Sofia! — Ok, [[0]] per [[1]] adesso.']],
            blanks: [
              { options: ['sta', 'sto', 'stanno', 'stiamo'], answer: 'sta', explain: 'Sofia (lei) sta per: tercera persona singular.' },
              { options: ['arrivare', 'arrivando', 'arrivata'], answer: 'arrivare', explain: 'Stare per + infinito: arrivare.' },
            ],
          },
          {
            scene: 'Nosotros',
            lines: [['Marco', '[[0]] per [[1]] a casa. Vieni con noi?']],
            blanks: [
              { options: ['Stiamo', 'Stanno', 'Sto', 'State'], answer: 'Stiamo', explain: 'Noi → stiamo per.' },
              { options: ['tornare', 'tornando', 'tornati'], answer: 'tornare', explain: 'Stare per + infinito: tornare.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Situaciones inminentes',
        tag: 'Texto guiado',
        intro: 'Completa el texto con stare per + infinito en la forma correcta.',
        type: 'guidedText',
        scene: 'En la estación de tren, hay mucha agitación',
        text: 'Il treno [[0]] partire tra due minuti. I passeggeri [[1]] salire di corsa. Una signora [[2]] perdere il treno! Il controllore [[3]] chiudere le porte. Finalmente tutti [[4]] partire!',
        blanks: [
          { options: ['sta per', 'stanno per', 'sto per'], answer: 'sta per', explain: 'Il treno (sing.) sta per partire.' },
          { options: ['stanno per', 'sta per', 'sto per'], answer: 'stanno per', explain: 'I passeggeri (plur.) stanno per salire.' },
          { options: ['sta per', 'stanno per', 'stiamo per'], answer: 'sta per', explain: 'Una signora (sing.) sta per perdere.' },
          { options: ['sta per', 'stanno per', 'sto per'], answer: 'sta per', explain: 'Il controllore (sing.) sta per chiudere.' },
          { options: ['stanno per', 'sta per', 'stiamo per'], answer: 'stanno per', explain: 'Tutti (plur.) stanno per partire.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de stare per + infinito.',
        type: 'freeText',
        scene: 'La última hora antes de un examen importante',
        text: 'L\'esame [[0]] iniziare tra cinque minuti. Gli studenti [[1]] entrare in aula. La professoressa Clara [[2]] distribuire i fogli. Io [[3]] svenire dalla tensione! Noi tutti [[4]] fare del nostro meglio.',
        blanks: [
          { answer: 'sta per', explain: 'L\'esame (sing.) → sta per iniziare.' },
          { answer: 'stanno per', explain: 'Gli studenti (plur.) → stanno per entrare.' },
          { answer: 'sta per', explain: 'La professoressa (sing.) → sta per distribuire.' },
          { answer: 'sto per', explain: 'Io → sto per svenire.' },
          { answer: 'stiamo per', explain: 'Noi tutti → stiamo per fare.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Situaciones con stare per',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase completa usando stare per + infinito.',
        type: 'write',
        items: [
          {
            scene: 'La llamada',
            prompt: 'Marco — (sto per / chiamare) te. Scrivi la frase.',
            answer: 'Sto per chiamarti!',
            accepted: ['sto per chiamarti', 'sto per chiamare'],
            explain: 'Io sto per + chiamare. Il pronome si può unire all\'infinito.',
          },
          {
            scene: 'El tiempo',
            prompt: 'Il cielo è nero — (sta per / piovere). Scrivi la frase.',
            answer: 'Il cielo è nero, sta per piovere.',
            accepted: ['sta per piovere'],
            explain: 'Il cielo/il tempo (sing.) sta per piovere.',
          },
          {
            scene: 'El pasado',
            prompt: 'Descrive: stavo per uscire quando... (algo interrumpió)',
            answer: 'Stavo per uscire quando il telefono ha squillato.',
            accepted: ['stavo per uscire quando', 'stavo per'],
            explain: 'Stavo per (imperfetto) + infinito: estaba a punto de... cuando.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Inminencias libres',
        tag: 'Escritura libre',
        intro: 'Escribe situaciones usando stare per + infinito.',
        type: 'write',
        items: [
          {
            scene: 'Ahora mismo',
            prompt: 'Descrive cosa stai per fare adesso o fra poco. (usa sto per / stiamo per)',
            answer: 'Sto per finire questa lezione di italiano, poi stiamo per cenare.',
            accepted: ['sto per', 'stiamo per', 'sta per'],
            explain: 'Sto per (io) / stiamo per (noi): acciones inminentes personales.',
          },
          {
            scene: 'Interrumpido',
            prompt: 'Stavo per ___ quando ___ (una situación del pasado interrumpida)',
            answer: 'Stavo per addormentarmi quando il telefono ha squillato e mi ha svegliato.',
            accepted: ['stavo per'],
            explain: 'Stavo per + infinito expresa acción que iba a ocurrir pero fue interrumpida.',
          },
          {
            scene: 'Observación',
            prompt: 'Descrivi una situazione: [qualcuno] sta per... (algo que estás observando)',
            answer: 'Guarda, quella coppia sta per baciarsi! Come è romantica la vita a Venezia!',
            accepted: ['sta per', 'stanno per'],
            explain: 'Sta per (sing.) / stanno per (plur.) para describir acciones inminentes observadas.',
          },
        ],
      },
    ],
  },
}

export default topic
