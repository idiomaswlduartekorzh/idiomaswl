import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passato-prossimo-essere-a2',
  order: '02',
  color: '#009246',
  category: 'Passato prossimo',
  level: 'A2',
  title: 'Passato prossimo con essere en italiano A2 — Verbos de movimiento',
  shortTitle: 'Passato prossimo (essere)',
  metaTitle: 'Passato prossimo con essere italiano A2 — sono andato, è venuta, siamo partiti',
  description:
    'El passato prossimo con essere se usa con verbos intransitivos de movimiento y cambio de estado, más todos los verbos reflexivos. El participio pasado DEBE concordar en género y número con el sujeto: sono andato (m), sono andata (f), sono andati (m pl), sono andate (f pl).',
  lead: 'essere + participio (concuerda con el sujeto). Sono andato/a. È venuto/a. Siamo partiti/e. Todos los reflexivos también usan essere. La concordancia es la gran diferencia respecto a avere.',
  outcomes: [
    'Usar essere como auxiliar con verbos de movimiento y cambio de estado',
    'Hacer concordar el participio con el género y número del sujeto',
    'Distinguir qué verbos llevan essere y cuáles llevan avere',
  ],

  guide: {
    goal: 'Formar el passato prossimo con essere y hacer concordar el participio con el sujeto.',
    model: 'Sono andato a Roma. (m) / È venuta tardi. (f) / Siamo partiti presto. (m pl)',
    formula: 'essere (presente) + participio pasado concordado en género/número',
    decisions: [
      'io (m) → sono andato; io (f) → sono andata',
      'tu (m) → sei andato; tu (f) → sei andata',
      'lui → è andato; lei → è andata',
      'noi (m/mix) → siamo andati; noi (f) → siamo andate',
      'voi (m/mix) → siete andati; voi (f) → siete andate',
      'loro (m/mix) → sono andati; loro (f) → sono andate',
      'Verbos essere: andare, venire, partire, arrivare, uscire, entrare, tornare, nascere, morire, rimanere, stare, essere',
      'Todos los verbos reflexivos (alzarsi, vestirsi...) usan essere',
    ],
    table: [
      ['Sujeto', 'Masculino', 'Femenino'],
      ['io', 'sono andato', 'sono andata'],
      ['tu', 'sei andato', 'sei andata'],
      ['lui/lei', 'è andato', 'è andata'],
      ['noi', 'siamo andati', 'siamo andate'],
      ['voi', 'siete andati', 'siete andate'],
      ['loro', 'sono andati', 'sono andate'],
    ],
    mistakes: [
      'Olvidar la concordancia: È andato (m) ✓ / È andata (f) ✓ — no siempre -o',
      'Usar avere con verbos de movimiento: Ho andato ✗ → Sono andato ✓',
      'Essere + participio invariable: Siamo andato ✗ → Siamo andati ✓ (plural)',
    ],
  },

  seo: [
    {
      heading: 'Essere auxiliar: cuándo y por qué',
      paragraphs: [
        'El italiano usa essere como auxiliar con verbos intransitivos de movimiento (andare, venire, partire, arrivare, uscire, entrare, tornare), verbos de estado o cambio (rimanere, stare, nascere, morire, diventare) y todos los verbos reflexivos. La regla mnemotécnica en italiano es la sigla DEVENIR: la mayoría de verbos essere describen desplazamiento o cambio.',
        'La característica principal del passato prossimo con essere es la concordancia del participio con el sujeto, igual que un adjetivo. Questo è fondamentale: María sono andata ✗ → Maria è andata ✓. Marco è andata ✗ → Marco è andato ✓.',
      ],
    },
    {
      heading: 'Los verbos essere más frecuentes',
      paragraphs: [
        'Los verbos de movimiento y estado más usados con essere: andare (andato), venire (venuto), partire (partito), arrivare (arrivato), uscire (uscito), entrare (entrato), tornare (tornato), nascere (nato), morire (morto), rimanere (rimasto), stare (stato). Nota: stare y essere tienen el mismo participio: stato.',
        'Hay verbos que pueden ser transitivos o intransitivos según el uso: correre, salire, scendere, passare. Cuando tienen objeto directo van con avere; sin objeto directo van con essere. Ho corso 5 km. (avere) / Sono corso in ospedale. (essere = movimiento rápido intransitivo).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende la concordancia del participio y memoriza los verbos essere más frecuentes.',
    graphicPrompt: 'Tabla de concordancia: -o/-a/-i/-e con cada sujeto. Lista de verbos essere clave.',
    scene: [
      ['Sono andato a Milano.', 'He ido a Milán. (hablante masculino)'],
      ['È venuta ieri.', 'Ella vino ayer.'],
      ['Siamo partiti alle otto.', 'Hemos salido a las ocho. (nosotros m/mix)'],
      ['Loro sono arrivate tardi.', 'Ellas han llegado tarde. (femenino plural)'],
    ],
    learnerModes: ['visual: tabla de concordancia', 'analítico: lista verbos essere', 'oral: narrar desplazamientos'],
    reviewFocus: ['concordancia -o/-a/-i/-e', 'verbos essere vs avere', 'essere + reflexivos', 'rimasto, nato, morto, stato'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Auxiliar correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del participio o del auxiliar essere.',
        type: 'choice',
        items: [
          {
            scene: 'El viaje a Roma',
            lines: [['Marco (m)', 'Ieri sono ___ a Roma in treno. (andare)']],
            options: ['andato', 'andata', 'andati', 'andato'],
            answer: 'andato',
            explain: 'Marco es masculino singular → sono andato.',
          },
          {
            scene: 'La llegada de Sofia',
            lines: [['David', 'Sofia è ___ ieri sera dal treno. (arrivare)']],
            options: ['arrivata', 'arrivato', 'arrivati', 'arrivate'],
            answer: 'arrivata',
            explain: 'Sofia es femenino singular → è arrivata.',
          },
          {
            scene: 'Nosotras de vacaciones',
            lines: [['Ana (f)', 'Io e Maria siamo ___ in vacanza a luglio. (partire)']],
            options: ['partite', 'partiti', 'partito', 'partita'],
            answer: 'partite',
            explain: 'Io (f) e Maria (f) = femenino plural → siamo partite.',
          },
          {
            scene: 'El nacimiento',
            lines: [['Zhanna', 'Il mio figlio è ___ nel 2018. (nascere)']],
            options: ['nato', 'nata', 'nati', 'nascuto'],
            answer: 'nato',
            explain: 'Figlio es masculino singular → è nato.',
          },
          {
            scene: 'La salida',
            lines: [['Lina', 'Loro ___ usciti dal lavoro alle sei. (essere)']],
            options: ['sono', 'hanno', 'era', 'erano'],
            answer: 'sono',
            explain: 'Uscire usa essere: loro sono usciti.',
          },
          {
            scene: 'El regreso',
            lines: [['Carlo', 'Noi siamo ___ a casa dopo mezzanotte. (tornare)']],
            options: ['tornati', 'tornate', 'tornato', 'tornata'],
            answer: 'tornati',
            explain: 'Noi (grupo mixto) → siamo tornati (masculino plural).',
          },
          {
            scene: 'La estancia',
            lines: [['Sofia', 'Marco è ___ in albergo tutta la settimana. (rimanere)']],
            options: ['rimasto', 'rimasta', 'rimasti', 'rimanuto'],
            answer: 'rimasto',
            explain: 'Marco es masculino singular → è rimasto. Rimanere → rimasto.',
          },
          {
            scene: 'La salida de ella',
            lines: [['David', 'Zhanna ___ uscita dallo studio alle cinque. (essere)']],
            options: ['è', 'ha', 'era', 'sono'],
            answer: 'è',
            explain: 'Uscire usa essere. Zhanna (f sing) → è uscita.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Género y número del participio',
        tag: '2 espacios',
        intro: 'Completa con el auxiliar essere y el participio concordado.',
        type: 'dual',
        items: [
          {
            scene: 'Los amigos llegan',
            lines: [['Marco', 'I miei amici [[0]] [[1]] tardi alla festa. (arrivare)']],
            blanks: [
              { options: ['sono', 'hanno', 'erano'], answer: 'sono', explain: 'Arrivare usa essere. Loro → sono.' },
              { options: ['arrivati', 'arrivate', 'arrivato'], answer: 'arrivati', explain: "I miei amici (masc pl) → arrivati." },
            ],
          },
          {
            scene: 'La directora sale',
            lines: [['Carlo', 'La direttrice [[0]] [[1]] dall\'ufficio alle cinque. (uscire)']],
            blanks: [
              { options: ['è', 'ha', 'sono'], answer: 'è', explain: 'Uscire usa essere. La direttrice (f sing) → è.' },
              { options: ['uscita', 'uscito', 'usciti'], answer: 'uscita', explain: 'La direttrice (f sing) → participio uscita.' },
            ],
          },
          {
            scene: 'Vosotras en el mercado',
            lines: [['Ana', 'Voi (f) [[0]] [[1]] al mercato stamattina? (andare)']],
            blanks: [
              { options: ['siete', 'avete', 'erano'], answer: 'siete', explain: 'Andare usa essere. Voi → siete.' },
              { options: ['andate', 'andati', 'andato'], answer: 'andate', explain: 'Voi (f) → andate.' },
            ],
          },
          {
            scene: 'El vuelo',
            lines: [['Zhanna', 'Il volo [[0]] [[1]] in orario. (partire)']],
            blanks: [
              { options: ['è', 'ha', 'sono'], answer: 'è', explain: 'Partire usa essere. Il volo (m sing) → è.' },
              { options: ['partito', 'partita', 'partiti'], answer: 'partito', explain: 'Il volo (m sing) → partito.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día en movimiento',
        tag: 'Texto guiado',
        intro: 'Completa el relato de Marco con essere y el participio concordado.',
        type: 'guidedText',
        scene: 'Marco cuenta su jornada de ayer',
        text: 'Ieri mattina [[0]] presto dall\'albergo. (uscire, io-m) [[1]] in centro a piedi. (andare) [[2]] al museo alle dieci. (arrivare) Il pomeriggio [[3]] in un bel ristorante. (entrare) Dopo cena [[4]] a casa in taxi. (tornare) La mia amica Sofia invece [[5]] tutto il giorno in albergo. (rimanere, f) Alla fine tutti [[6]] soddisfatti della giornata. (essere)',
        blanks: [
          { options: ['sono uscito', 'sono uscita', 'ho uscito'], answer: 'sono uscito', explain: 'Uscire + essere. Marco (m sing) → sono uscito.' },
          { options: ['sono andato', 'sono andata', 'ho andato'], answer: 'sono andato', explain: 'Andare + essere. Marco (m sing) → sono andato.' },
          { options: ['sono arrivato', 'sono arrivata', 'ho arrivato'], answer: 'sono arrivato', explain: 'Arrivare + essere. Marco (m sing) → sono arrivato.' },
          { options: ['sono entrato', 'sono entrata', 'ho entrato'], answer: 'sono entrato', explain: 'Entrare + essere. Marco (m sing) → sono entrato.' },
          { options: ['sono tornato', 'sono tornata', 'ho tornato'], answer: 'sono tornato', explain: 'Tornare + essere. Marco (m sing) → sono tornato.' },
          { options: ['è rimasta', 'è rimasto', 'ha rimasto'], answer: 'è rimasta', explain: 'Rimanere + essere. Sofia (f sing) → è rimasta.' },
          { options: ['sono stati', 'sono state', 'hanno stato'], answer: 'sono stati', explain: 'Essere (stare nel senso di risultare) + essere. Tutti (m pl) → sono stati.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del passato prossimo con essere (con concordancia).',
        type: 'freeText',
        scene: 'Relato de las vacaciones de Ana y su hermana',
        text: 'Io e mia sorella [[0]] in Sicilia questa estate. (andare, f pl) [[1]] in aereo da Bogotá a Roma. (partire, f pl) [[2]] a Palermo due giorni dopo. (arrivare, f pl) [[3]] in un piccolo hotel vicino al mare. (rimanere, f pl) Un giorno [[4]] a Taormina in treno. (venire - lei, f sing)',
        blanks: [
          { answer: 'siamo andate', explain: 'Andare + essere. Noi (f pl) → siamo andate.' },
          { answer: 'siamo partite', explain: 'Partire + essere. Noi (f pl) → siamo partite.' },
          { answer: 'siamo arrivate', explain: 'Arrivare + essere. Noi (f pl) → siamo arrivate.' },
          { answer: 'siamo rimaste', explain: 'Rimanere + essere. Noi (f pl) → siamo rimaste.' },
          { answer: 'è venuta', explain: 'Venire + essere. Lei (f sing) → è venuta.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con essere y el participio concordado.',
        type: 'write',
        items: [
          {
            scene: 'Marco llega tarde',
            prompt: 'Marco ___ tardi ieri sera. (arrivare)',
            answer: 'Marco è arrivato tardi ieri sera.',
            accepted: ['marco è arrivato tardi ieri sera', 'marco è arrivato tardi'],
            explain: 'Arrivare + essere. Marco (m sing) → è arrivato.',
          },
          {
            scene: 'Las chicas van al cine',
            prompt: 'Le ragazze ___ al cinema ieri. (andare)',
            answer: 'Le ragazze sono andate al cinema ieri.',
            accepted: ['le ragazze sono andate al cinema ieri', 'le ragazze sono andate al cinema'],
            explain: 'Andare + essere. Le ragazze (f pl) → sono andate.',
          },
          {
            scene: 'Nosotros salimos',
            prompt: 'Noi (m) ___ dall\'ufficio alle sei. (uscire)',
            answer: 'Noi siamo usciti dall\'ufficio alle sei.',
            accepted: ["noi siamo usciti dall'ufficio alle sei", "siamo usciti dall'ufficio alle sei"],
            explain: 'Uscire + essere. Noi (m pl) → siamo usciti.',
          },
          {
            scene: 'Ella nace en primavera',
            prompt: 'Maria ___ in primavera, nel mese di aprile. (nascere)',
            answer: 'Maria è nata in primavera, nel mese di aprile.',
            accepted: ['maria è nata in primavera', 'maria è nata in primavera, nel mese di aprile'],
            explain: 'Nascere + essere. Maria (f sing) → è nata.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Narración de movimientos',
        tag: 'Escritura guiada',
        intro: 'Describe tus movimientos o los de alguien usando essere + participio concordado.',
        type: 'write',
        items: [
          {
            scene: 'Tu fin de semana',
            prompt: 'Questo weekend sono... / siamo... (al menos 2 verbos essere)',
            answer: 'Questo weekend sono andato al mercato e poi sono tornato a casa nel pomeriggio.',
            accepted: ['questo weekend sono andato', 'questo weekend sono andata', 'questo weekend siamo andati'],
            explain: 'Verbos de movimiento con essere: andato/a, tornato/a, arrivato/a, ecc.',
          },
          {
            scene: 'Un viaje recordado',
            prompt: "L'anno scorso sono... (describe un viaje con 2-3 verbos essere)",
            answer: "L'anno scorso sono partito da Bogotá, sono arrivato a Madrid e sono rimasto tre settimane.",
            accepted: ["l'anno scorso sono partito", "l'anno scorso sono partita", "l'anno scorso siamo partiti"],
            explain: 'Narrar un viaje: partire, arrivare, rimanere, tornare con essere.',
          },
          {
            scene: 'Una amiga tuya',
            prompt: 'La mia amica è... (narra lo que hizo tu amiga usando 2 verbos essere)',
            answer: 'La mia amica è uscita dal lavoro alle cinque e poi è andata al supermercato.',
            accepted: ['la mia amica è uscita', 'la mia amica è andata', 'la mia amica è tornata'],
            explain: 'Femenino singular: è uscita, è andata, è arrivata, ecc.',
          },
        ],
      },
    ],
  },
}

export default topic
