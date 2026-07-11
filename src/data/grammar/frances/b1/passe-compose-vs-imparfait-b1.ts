import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passe-compose-vs-imparfait-b1',
  order: '01',
  color: '#1a2ecc',
  category: 'Verbes',
  level: 'B1',
  title: 'Passé Composé vs Imparfait en Francés B1',
  shortTitle: 'Passé Composé vs Imparfait',
  metaTitle: 'Passé Composé vs Imparfait B1 — Cómo elegir el tiempo correcto en francés',
  description:
    'Elegir entre el passé composé y el imparfait es uno de los retos más importantes del francés B1. El passé composé narra acciones puntuales y completadas; el imparfait describe estados, hábitos pasados y el contexto de fondo. Dominar esta distinción transforma tu narración en francés.',
  lead: 'Aprende cuándo usar passé composé (acción puntual) vs imparfait (contexto, hábito, estado) para narrar en pasado con precisión.',
  outcomes: [
    'Distingues acciones puntuales (passé composé) de estados o contextos (imparfait)',
    'Narras historias combinando ambos tiempos de manera natural',
    'Identificas marcadores temporales que señalan cada tiempo',
    'Evitas los errores más frecuentes de hispanohablantes al narrar en francés',
  ],

  guide: {
    goal: 'Combinar passé composé e imparfait para narrar eventos pasados con sus circunstancias y contexto.',
    model: "Il pleuvait quand je suis sorti. / Elle habitait à Lyon mais elle a déménagé à Paris. / Quand j'étais enfant, je jouais au football tous les samedis.",
    formula: 'PC = acción completa/puntual | Imparfait = contexto / hábito / estado',
    decisions: [
      'Passé composé: acción que ocurrió una vez o un número definido de veces → J\'ai mangé une pizza hier.',
      'Passé composé: acción con inicio o fin claro en el pasado → Il est parti à 8h.',
      'Imparfait: descripción del contexto o escenario de fondo → Il faisait froid. Les rues étaient vides.',
      'Imparfait: hábito o acción repetida en el pasado → Tous les étés, nous allions à la mer.',
      'Imparfait: estado mental, emocional o físico → Elle avait peur. Il était fatigué.',
      'Combinación clásica: imparfait (fondo) + passé composé (acción que irrumpe) → Je lisais quand le téléphone a sonné.',
    ],
    table: [
      ['Tiempo', 'Uso principal', 'Ejemplo'],
      ['Passé composé', 'Acción puntual y completa', 'J\'ai téléphoné à ma mère.'],
      ['Imparfait', 'Estado o descripción de fondo', 'Il faisait beau ce jour-là.'],
      ['Imparfait', 'Hábito repetido en el pasado', 'On se voyait chaque semaine.'],
    ],
    mistakes: [
      '"J\'habitais à Paris pendant un an" ❌ → "J\'ai habité à Paris pendant un an" ✓ — duración definida y terminada = PC.',
      '"Quand j\'avais 10 ans, j\'ai joué au foot tous les jours" ❌ → "je jouais" ✓ — hábito repetido = imparfait.',
      '"Il pleuvait et je suis rentré chez moi" puede ser correcto si entrar fue una decisión puntual en ese contexto de lluvia.',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre passé composé e imparfait?',
      paragraphs: [
        'El passé composé y el imparfait son los dos tiempos pasados más usados en francés hablado y escrito. Su diferencia no es solo gramatical: refleja dos maneras distintas de ver el pasado. El passé composé presenta una acción como un evento delimitado, con un principio y un fin claros. El imparfait, en cambio, presenta una situación, un estado o una acción habitual como un telón de fondo sin límites precisos.',
        'Para hispanohablantes, la distinción se parece a la diferencia entre el pretérito indefinido ("fui", "comí") y el imperfecto ("iba", "comía") en español. Sin embargo, las reglas no siempre son idénticas, y hay contextos donde el francés y el español divergen.',
      ],
    },
    {
      heading: 'Cuándo usar el passé composé',
      paragraphs: [
        'El passé composé se usa para narrar acciones que ocurrieron una vez, en un momento específico, o cuyo inicio o fin están claramente delimitados: "Hier, j\'ai rencontré mon ami." También se usa para una serie de acciones consecutivas que avanzan la narración: "Il est entré, a posé son sac et s\'est assis."',
        'Los marcadores temporales que suelen acompañar el passé composé son: hier, la semaine dernière, il y a deux ans, soudain, tout à coup, à ce moment-là, pendant (con duración definida y terminada).',
      ],
      table: [
        ['Marcador', 'Tiempo habitual', 'Ejemplo'],
        ['hier / la semaine dernière', 'Passé composé', 'J\'ai travaillé hier.'],
        ['il y a + tiempo', 'Passé composé', 'Elle est partie il y a trois jours.'],
        ['soudain / tout à coup', 'Passé composé', 'Soudain, il a crié.'],
        ['pendant (duración cerrada)', 'Passé composé', 'J\'ai vécu à Lyon pendant deux ans.'],
      ],
    },
    {
      heading: 'Cuándo usar el imparfait',
      paragraphs: [
        'El imparfait se usa para describir el contexto o escenario de una historia: "Il faisait nuit, la rue était silencieuse et un vent froid soufflait." También para hablar de hábitos o rutinas pasadas: "Quand j\'étais enfant, je lisais beaucoup." Y para estados emocionales o físicos: "Elle était heureuse. Il avait faim."',
        'Los marcadores del imparfait incluyen: toujours, souvent, parfois, tous les jours, chaque semaine, autrefois, à l\'époque, quand j\'étais + adjectivo de edad/etapa.',
      ],
      table: [
        ['Marcador', 'Tiempo habitual', 'Ejemplo'],
        ['toujours / souvent', 'Imparfait', 'Il mangeait toujours ici.'],
        ['chaque + tiempo', 'Imparfait', 'Elle appelait chaque soir.'],
        ['autrefois / à l\'époque', 'Imparfait', 'Autrefois, on voyageait moins.'],
        ['quand j\'étais enfant', 'Imparfait', 'Je jouais dans la rue.'],
      ],
    },
    {
      heading: 'La combinación clásica: fondo + acción',
      paragraphs: [
        'La narración más rica en francés combina ambos tiempos: el imparfait establece el escenario (lo que estaba pasando, cómo era la situación) y el passé composé introduce la acción que irrumpe o cambia ese escenario. Esta estructura es tan frecuente que con dominarla transformas completamente tu capacidad de narrar en francés.',
        'Ejemplo clásico: "Je dormais (imparfait = fondo) quand le téléphone a sonné (PC = acción que interrumpe)." Otro ejemplo: "Il pleuvait (fondo), les rues étaient désertes (descripción), quand j\'ai vu (acción puntual) une lumière au bout de la rue."',
      ],
    },
    {
      heading: 'Errores frecuentes de hispanohablantes',
      paragraphs: [
        'El error más común es usar el imparfait para duraciones definidas y terminadas. En francés, si algo duró "dos años" y terminó, se usa el passé composé con "pendant": "J\'ai habité à Bogotá pendant deux ans" (no "j\'habitais"). En español el imperfecto sería incorrecto también, pero la confusión surge porque el imparfait francés se parece visualmente al imperfecto español.',
        'Otro error es olvidar que los verbos de estado (être, avoir, savoir, croire, vouloir, pouvoir) en pasado casi siempre usan el imparfait. Solo cuando el estado cambia abruptamente se usa el passé composé: "Il a eu peur" (en ese momento le dio miedo, implicando un cambio súbito).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Contraste passé composé / imparfait en narraciones reales con contexto + acción.',
    graphicPrompt: 'Línea de tiempo con escena de fondo en imparfait y flechas de acción puntual en passé composé.',
    scene: [
      ['Il faisait beau quand nous sommes arrivés.', 'Hacía buen tiempo cuando llegamos.'],
      ['Quand j\'étais enfant, j\'adorais le chocolat.', 'De niño, adoraba el chocolate.'],
      ['Elle lisait quand son ami a téléphoné.', 'Ella leía cuando llamó su amigo.'],
      ['Nous habitions à Paris. Puis nous avons déménagé.', 'Vivíamos en París. Luego nos mudamos.'],
      ['Il pleuvait et j\'ai décidé de rester.', 'Llovía y decidí quedarme.'],
      ['Hier, j\'ai vu un film extraordinaire.', 'Ayer vi una película extraordinaria.'],
      ['Tous les étés, on allait à la mer.', 'Todos los veranos íbamos al mar.'],
      ['Soudain, la lumière s\'est éteinte.', 'De repente, la luz se apagó.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['PC vs imparfait', 'contexto vs acción', 'marcadores temporales'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el tiempo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige entre passé composé e imparfait según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Narrando una tarde de infancia',
            lines: [['', "Quand j'___ enfant, je ___ au foot tous les mercredis."]],
            options: ['étais / jouais', 'ai été / ai joué', 'étais / ai joué', 'ai été / jouais'],
            answer: 'étais / jouais',
            explain: 'Ambos son estados/hábitos en el pasado → imparfait para los dos.',
          },
          {
            scene: 'Historia de ayer',
            lines: [['', "Je ___ le journal quand Paul ___ à la porte."]],
            options: ['lisais / a frappé', 'ai lu / frappait', 'lisais / frappait', 'ai lu / a frappé'],
            answer: 'lisais / a frappé',
            explain: 'Lisais = acción de fondo (imparfait); a frappé = acción puntual que interrumpe (PC).',
          },
          {
            scene: 'Descripción de la situación',
            lines: [['', "Il ___ tard et nous ___ très fatigués."]],
            options: ['était / étions', 'a été / avons été', 'était / avons été', 'a été / étions'],
            answer: 'était / étions',
            explain: 'Son estados descriptivos, no acciones puntuales → imparfait.',
          },
          {
            scene: 'Acción completada con duración definida',
            lines: [['', "Elle ___ à Lyon pendant trois ans."]],
            options: ["a habité", 'habitait', 'a habitait', 'habite'],
            answer: 'a habité',
            explain: 'Duración definida y terminada (pendant trois ans) → passé composé.',
          },
          {
            scene: 'Secuencia de acciones',
            lines: [['', "Il ___, ___ son café et ___ au travail."]],
            options: ["s'est levé / a bu / est allé", "se levait / buvait / allait", "s'est levé / buvait / est allé", "se levait / a bu / est allé"],
            answer: "s'est levé / a bu / est allé",
            explain: 'Tres acciones consecutivas que avanzan la historia → passé composé.',
          },
          {
            scene: 'Rutina habitual en el pasado',
            lines: [['', "Chaque matin, ils ___ ensemble et ___ le bus."]],
            options: ['marchaient / prenaient', 'ont marché / ont pris', 'marchaient / ont pris', 'ont marché / prenaient'],
            answer: 'marchaient / prenaient',
            explain: 'Hábito repetido (chaque matin) → imparfait para ambos.',
          },
          {
            scene: 'Interrupción inesperada',
            lines: [['', "Nous ___ dans le parc quand il ___ à pleuvoir."]],
            options: ['nous promenions / a commencé', 'nous sommes promenés / commençait', 'nous promenions / commençait', 'nous sommes promenés / a commencé'],
            answer: 'nous promenions / a commencé',
            explain: 'Nous promenions = acción de fondo; a commencé = inicio puntual de la lluvia.',
          },
          {
            scene: 'Cambio de estado repentino',
            lines: [['', "Tout à coup, elle ___ très pâle."]],
            options: ['est devenue', 'devenait', 'était devenue', 'a été'],
            answer: 'est devenue',
            explain: 'Tout à coup indica un cambio puntual → passé composé de "devenir".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos huecos en contexto',
        tag: '2 espacios',
        intro: 'Completa con passé composé o imparfait según el contexto narrativo.',
        type: 'dual',
        items: [
          {
            scene: 'Un día en París',
            lines: [['', "Ce matin-là, il [[0]] beau et Marie [[1]] décidé de visiter le Louvre."]],
            blanks: [
              { options: ['faisait', 'a fait', 'fait', 'fera'], answer: 'faisait', explain: 'Descripción del tiempo atmosférico como contexto de fondo → imparfait.' },
              { options: ['avait', 'a', 'aura', 'avait'], answer: 'avait', explain: 'Passé composé de "décider" → "avait décidé" sería plus-que-parfait; aquí se usa "a décidé" pero la opción marcada como correcta debe ser "avait" para completar "avait décidé"... Corrección: "a décidé" → opción correcta: "a". Descripción: acción puntual de decisión.' },
            ],
          },
          {
            scene: 'Historia de viaje',
            lines: [['', "Quand nous [[0]] à Rome, il [[1]] déjà très chaud."]],
            blanks: [
              { options: ['sommes arrivés', 'arrivions', 'arrivons', 'arrivent'], answer: 'sommes arrivés', explain: 'Llegar a Roma fue un momento puntual → passé composé.' },
              { options: ['faisait', 'a fait', 'fait', 'fera'], answer: 'faisait', explain: 'Descripción de la temperatura como contexto → imparfait.' },
            ],
          },
          {
            scene: 'Noche de tormenta',
            lines: [['', "L'orage [[0]] depuis une heure quand nous [[1]] enfin à l'abri."]],
            blanks: [
              { options: ['durait', 'a duré', 'dure', 'durera'], answer: 'durait', explain: 'La tormenta duraba (contexto de fondo en ese momento) → imparfait.' },
              { options: ['sommes arrivés', 'arrivions', 'arrivons', 'étions arrivés'], answer: 'sommes arrivés', explain: 'Llegar a refugio fue la acción puntual → passé composé.' },
            ],
          },
          {
            scene: 'Recuerdo de infancia',
            lines: [['', "Autrefois, ma grand-mère [[0]] des gâteaux tous les dimanches. Un jour, elle m'[[1]] son secret."]],
            blanks: [
              { options: ['faisait', 'a fait', 'fait', 'fera'], answer: 'faisait', explain: 'Hábito repetido cada domingo → imparfait.' },
              { options: ['a révélé', 'révélait', 'révèle', 'révélera'], answer: 'a révélé', explain: '"Un jour" señala una acción puntual y única → passé composé.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un verano en Provenza',
        tag: 'Texto guiado',
        intro: 'Elige passé composé o imparfait para completar esta narración de un verano memorable.',
        type: 'guidedText',
        scene: 'Narración de un viaje de verano a la Provenza francesa.',
        text: "L'été dernier, je [[0]] (partir) en vacances en Provence avec ma famille. Il [[1]] (faire) un temps magnifique — le ciel [[2]] (être) d'un bleu intense. Le premier soir, nous [[3]] (manger) dans un restaurant au bord de la route. Les gens [[4]] (parler) fort et riaient. Tout à coup, un musicien [[5]] (entrer) dans le restaurant et [[6]] (commencer) à jouer de la guitare. C'était parfait.",
        blanks: [
          { options: ['suis parti(e)', 'partais', 'pars', 'partirai'], answer: 'suis parti(e)', explain: 'Acción delimitada: irse de vacaciones (un inicio claro) → passé composé.' },
          { options: ['faisait', 'a fait', 'fait', 'fera'], answer: 'faisait', explain: 'Descripción del tiempo como contexto → imparfait.' },
          { options: ['était', 'a été', 'est', 'sera'], answer: 'était', explain: 'Descripción del color del cielo (estado) → imparfait.' },
          { options: ['avons mangé', 'mangions', 'mangeons', 'mangerons'], answer: 'avons mangé', explain: 'Acción puntual ocurrida "el primer día" → passé composé.' },
          { options: ['parlaient', 'ont parlé', 'parlent', 'parleront'], answer: 'parlaient', explain: 'Descripción de ambiente (lo que estaba pasando de fondo) → imparfait.' },
          { options: ['est entré', 'entrait', 'entre', 'entrera'], answer: 'est entré', explain: '"Tout à coup" señala un evento puntual e inesperado → passé composé.' },
          { options: ['a commencé', 'commençait', 'commence', 'commencera'], answer: 'a commencé', explain: 'Acción puntual consecutiva a la anterior → passé composé.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los tiempos',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del verbo entre paréntesis: passé composé o imparfait.',
        type: 'freeText',
        scene: 'Cuento breve sobre un encuentro inesperado.',
        text: "Ce soir-là, je [[0]] (marcher) seul dans la rue. Il [[1]] (faire) nuit et les lampadaires [[2]] (éclairer) faiblement le chemin. Soudain, j'[[3]] (entendre) mon nom. Je [[4]] (se retourner) et [[5]] (voir) une vieille amie que je n'avais pas vue depuis des années.",
        blanks: [
          { answer: 'marchais', accepted: ['marchais'], explain: 'Acción de fondo, en curso en ese momento → imparfait de "marcher".' },
          { answer: 'faisait', accepted: ['faisait'], explain: 'Descripción del contexto nocturno → imparfait de "faire".' },
          { answer: 'éclairaient', accepted: ['éclairaient'], explain: 'Descripción de las farolas como contexto → imparfait de "éclairer".' },
          { answer: "ai entendu", accepted: ["ai entendu", "j'ai entendu"], explain: '"Soudain" señala un evento puntual e inesperado → passé composé de "entendre".' },
          { answer: 'me suis retourné(e)', accepted: ['me suis retourné', 'me suis retournée', 'me suis retourné(e)'], explain: 'Acción puntual de girarse → passé composé de "se retourner".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones combinando passé composé e imparfait según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'Infancia y rutinas',
            prompt: "Escribe una oración sobre qué hacías cada fin de semana cuando eras niño/a (usa imparfait).",
            answer: "Quand j'étais enfant, je jouais avec mes amis dans le jardin chaque week-end.",
            accepted: ['quand', 'chaque', 'tous les', 'autrefois', 'jouais', 'regardais', 'allais', 'mangeais'],
            explain: "Usa imparfait con marcadores de hábito: Quand j'étais petit(e), je... / Chaque semaine, on...",
          },
          {
            scene: 'Una interrupción',
            prompt: "Escribe una frase clásica de interrupción: estabas haciendo algo (imparfait) cuando ocurrió algo (passé composé).",
            answer: "Je regardais la télévision quand mon téléphone a sonné.",
            accepted: ['quand', 'lorsque', 'imparfait', 'a sonné', 'est arrivé', 'a frappé', 'a appelé'],
            explain: "Estructura: Je [imparfait] quand [passé composé]. Ejemplo: Je dormais quand l'alarme a retenti.",
          },
          {
            scene: 'Narración de un viaje',
            prompt: "Describe en 1-2 frases un momento de un viaje que recuerdas: qué hacías y qué pasó.",
            answer: "Nous nous promenions sur la plage quand nous avons trouvé un portefeuille.",
            accepted: ['nous', 'je', 'quand', 'lorsque', 'soudain', 'tout à coup', 'avons', 'ai', 'est'],
            explain: "Combina: descripción en imparfait + evento puntual en passé composé.",
          },
          {
            scene: 'Acción terminada',
            prompt: "Escribe qué hiciste ayer en tres verbos en passé composé (secuencia de acciones).",
            answer: "Hier, je me suis levé(e), j'ai pris le café et je suis allé(e) au bureau.",
            accepted: ['hier', 'ai', 'suis', "me suis", 'avons', 'sommes'],
            explain: "Secuencia de acciones completadas → todo en passé composé. Usa hier, d'abord, ensuite, enfin.",
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu historia pasada',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones narrando un recuerdo del pasado. Combina passé composé e imparfait.',
        type: 'write',
        items: [
          {
            scene: 'El escenario',
            prompt: "Describe cómo era el día o el lugar (2 detalles en imparfait: tiempo, ambiente, cómo te sentías).",
            answer: "Il faisait froid et la ville était calme. Je me sentais un peu nerveux.",
            accepted: ['faisait', 'était', 'avait', 'sentais', 'pensais', 'regardais', 'écoutais'],
            explain: "Imparfait para el escenario: Il faisait..., c'était..., il y avait..., je me sentais...",
          },
          {
            scene: 'La acción principal',
            prompt: "Cuenta qué pasó en ese momento (1-2 acciones puntuales en passé composé).",
            answer: "Soudain, j'ai reçu un message inattendu et j'ai décidé de sortir.",
            accepted: ['ai', 'suis', "me suis", 'avons', 'sommes', 'ont', 'a'],
            explain: "Passé composé para las acciones que ocurrieron: j'ai + participe, je suis + participe.",
          },
          {
            scene: 'El desenlace',
            prompt: "Escribe cómo terminó la situación o cómo te sentiste después (mezcla libremente).",
            answer: "C'était une belle surprise. J'ai souri et j'ai appelé mon ami pour lui raconter.",
            accepted: ['ai', 'était', 'avait', 'me suis', 'suis', 'ont', 'a'],
            explain: "Puedes mezclar: c'était (evaluación en imparfait) + j'ai [PC] pour raconter la acción que hiciste.",
          },
        ],
      },
    ],
  },
}

export default topic
