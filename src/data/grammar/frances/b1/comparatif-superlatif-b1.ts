import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'comparatif-superlatif-b1',
  order: '10',
  color: '#2563eb',
  category: 'Adjetivos',
  level: 'B1',
  title: 'Comparatif et Superlatif en Francés B1',
  shortTitle: 'Comparatif & Superlatif',
  metaTitle: 'Comparatif et Superlatif B1 — Comparar y superlativar en francés',
  description:
    "El comparatif y el superlatif permiten comparar personas, objetos y acciones en francés. El comparatif usa plus/moins/aussi + adjectif + que; el superlatif usa le/la/les plus/moins + adjectif. Los irregulares bon/mauvais/bien/mal tienen formas especiales que es esencial dominar.",
  lead: "Domina la comparación y los superlativos en francés: más que, menos que, tan como, el más, el menos, con formas regulares e irregulares.",
  outcomes: [
    "Formas el comparatif de superioridad, inferioridad e igualdad correctamente",
    "Construyes el superlatif relatif con le/la/les plus/moins",
    "Usas las formas irregulares: meilleur, pire, mieux, moins bien",
    "Distingues 'meilleur' (adjetivo) de 'mieux' (adverbio)",
  ],

  guide: {
    goal: "Comparar personas, objetos y acciones con precisión usando el comparatif y el superlatif.",
    model: "Paris est plus grande que Lyon. / C'est la ville la plus belle. / Ce gâteau est meilleur que celui-là.",
    formula: "plus/moins/aussi + adjectif + que | le/la/les plus/moins + adjectif (+ de)",
    decisions: [
      "Superioridad: plus + adjectif + que. 'Il est plus grand que son frère.'",
      "Inferioridad: moins + adjectif + que. 'Cette veste est moins chère que l'autre.'",
      "Igualdad: aussi + adjectif + que. 'Elle est aussi intelligente que lui.'",
      "Superlatif: le/la/les + plus/moins + adjectif (+ de). 'C'est le film le plus intéressant de l'année.'",
      "Irreguliers adjectivos: bon → meilleur (comparatif) / le meilleur (superlatif); mauvais → pire / le pire.",
      "Irreguliers adverbios: bien → mieux (comparatif) / le mieux (superlatif); mal → moins bien / le moins bien.",
      "Accord: meilleur/meilleure/meilleurs/meilleures. Le superlatif concuerda con el sustantivo.",
    ],
    table: [
      ["Forma", "Comparatif", "Superlatif"],
      ["bon (adj.)", "meilleur(e) que", "le/la meilleur(e)"],
      ["mauvais (adj.)", "pire que", "le/la pire"],
      ["bien (adv.)", "mieux que", "le mieux"],
    ],
    mistakes: [
      "\"C'est plus bon\" ❌ — bon tiene irregular: \"C'est meilleur\" ✓.",
      "\"Elle chante plus bien\" ❌ — bien tiene irregular: \"Elle chante mieux\" ✓.",
      "\"C'est le film plus intéressant\" ❌ — superlatif requiere artículo + plus: \"C'est le film le plus intéressant\" ✓.",
    ],
  },

  seo: [
    {
      heading: "El comparatif en francés: más que, menos que, tan como",
      paragraphs: [
        "El comparatif francés tiene tres formas: superioridad (plus + adjectif + que), inferioridad (moins + adjectif + que) e igualdad (aussi + adjectif + que). Ejemplos: 'Le café est plus fort que le thé' (El café es más fuerte que el té), 'Ce livre est moins cher que l'autre' (Este libro es menos caro que el otro), 'Elle est aussi compétente que son collègue' (Ella es tan competente como su colega).",
        "Al comparar verbos (acciones), el comparatif de adverbios usa la misma estructura: 'Il travaille plus que moi' (Trabaja más que yo), 'Il mange moins vite que son frère' (Come menos rápido que su hermano). Cuando se comparan cantidades con sustantivos: plus de / moins de / autant de + sustantivo: 'J'ai plus de livres que toi' (Tengo más libros que tú).",
      ],
    },
    {
      heading: "El superlatif relatif: el más, el menos",
      paragraphs: [
        "El superlatif relatif se forma con el artículo definido (le/la/les) + plus/moins + adjectif. El artículo debe concordar con el sustantivo: 'C'est le restaurant le plus cher de la ville' (Es el restaurante más caro de la ciudad), 'Ce sont les étudiantes les plus motivées' (Son las estudiantes más motivadas). El grupo de referencia se introduce con 'de': 'de la classe', 'du monde', 'de l'année'.",
        "Cuando el adjetivo precede al sustantivo, el artículo se combina directamente: 'C'est le plus beau jour de ma vie' (Es el día más bello de mi vida). Cuando el adjetivo sigue al sustantivo, se repite el artículo: 'C'est l'acteur le plus célèbre de France' (Es el actor más famoso de Francia). Esta diferencia posicional es importante en francés.",
      ],
      table: [
        ["Posición adjetivo", "Estructura", "Ejemplo"],
        ["Antes del nombre", "le + plus + adj + nom", "le plus beau jour"],
        ["Después del nombre", "nom + le + plus + adj", "l'acteur le plus célèbre"],
        ["Superlatif de cantidad", "le plus de + nom", "le plus de temps"],
      ],
    },
    {
      heading: "Las formas irregulares: bon/meilleur, bien/mieux, mauvais/pire",
      paragraphs: [
        "Los irregulares más importantes son: bon (adjetivo) → meilleur(e)/meilleur(e)s en comparatif; le/la meilleur(e), les meilleur(e)s en superlatif. Bien (adverbio) → mieux en comparatif; le mieux en superlatif. Mauvais (adjetivo) → pire en comparatif; le pire en superlatif. Mal (adverbio) → plus mal o moins bien en comparatif; le plus mal en superlatif.",
        "La distinción clave es entre 'meilleur' (adjetivo, modifica un sustantivo) y 'mieux' (adverbio, modifica un verbo). 'Ce restaurant est meilleur que l'autre' (adjetivo: describe el restaurante). 'Je dors mieux depuis que j'ai changé de matelas' (adverbio: describe la acción de dormir). Un error muy común es usar 'plus bon' o 'plus bien' en lugar de 'meilleur' o 'mieux'.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Comparatif y superlatif franceses con formas regulares e irregulares. La clave es bon→meilleur y bien→mieux.",
    graphicPrompt: "Escala de comparación con objetos o personas, flechas indicando más/menos/igual, podio con el/la mejor.",
    scene: [
      ["Paris est plus grande que Lyon mais moins grande que Tokyo.", "París es más grande que Lyon pero menos grande que Tokio."],
      ["Ce restaurant est meilleur que celui d'en face.", "Este restaurante es mejor que el de enfrente."],
      ["C'est la meilleure pizza que j'aie jamais mangée.", "Es la mejor pizza que he comido nunca."],
      ["Il parle français mieux que moi, mais moins bien que Sophie.", "Habla francés mejor que yo, pero menos bien que Sophie."],
      ["Cette solution est aussi efficace que l'autre.", "Esta solución es tan eficaz como la otra."],
      ["C'est le film le plus intéressant de l'année.", "Es la película más interesante del año."],
      ["Nous avons autant de travail cette semaine que la semaine dernière.", "Tenemos tanto trabajo esta semana como la semana pasada."],
      ["Le pire moment de la journée, c'est le réveil.", "El peor momento del día es el despertar."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["plus/moins/aussi + adj + que", "le/la + plus + adj", "meilleur vs mieux"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Elige la forma correcta",
        tag: "Opción múltiple",
        intro: "Selecciona la forma correcta del comparatif o superlatif en cada oración.",
        type: "choice",
        items: [
          {
            scene: "Comparar restaurantes",
            lines: [["", "Ce restaurant est ___ que celui du quartier."]],
            options: ["meilleur", "plus bon", "mieux", "le meilleur"],
            answer: "meilleur",
            explain: "Bon es irregular: comparatif = meilleur(e). 'Plus bon' no existe en francés estándar.",
          },
          {
            scene: "Hablar de habilidades",
            lines: [["", "Depuis ses cours de chant, elle chante ___ qu'avant."]],
            options: ["mieux", "meilleur", "plus bien", "le mieux"],
            answer: "mieux",
            explain: "Bien (adverbio de modo) es irregular: comparatif = mieux. 'Plus bien' no existe en francés.",
          },
          {
            scene: "Superlativo de un lugar",
            lines: [["", "C'est ___ ville ___ animée de la région."]],
            options: ["la / la plus", "le / plus", "la / le plus", "les / les plus"],
            answer: "la / la plus",
            explain: "Superlatif con sustantivo femenino: la + ville + la plus + adjectif. Doble artículo femenino.",
          },
          {
            scene: "Comparar cantidades",
            lines: [["", "J'ai ___ patience que toi — tu es bien meilleur pour ça!"]],
            options: ["moins de", "moins", "moins que", "peu de"],
            answer: "moins de",
            explain: "Para comparar cantidades con sustantivos: moins de + sustantivo. 'Moins de patience' = menos paciencia.",
          },
          {
            scene: "Igualdad",
            lines: [["", "Ce portable est ___ cher que l'autre, mais il a plus de fonctionnalités."]],
            options: ["aussi", "autant", "plus", "si"],
            answer: "aussi",
            explain: "Igualdad con adjetivo: aussi + adjectif + que. 'Aussi cher que' = tan caro como.",
          },
          {
            scene: "El peor",
            lines: [["", "C'est la ___ chose qui pouvait m'arriver!"]],
            options: ["pire", "plus mauvaise", "plus mal", "mauvaise"],
            answer: "pire",
            explain: "Mauvais irregular: superlatif = la pire (femenino). 'La pire chose' = la peor cosa.",
          },
          {
            scene: "Comparar dos personas",
            lines: [["", "Mon frère est ___ grand ___ moi, mais je cours ___ vite."]],
            options: ["plus / que / aussi", "plus / de / aussi", "autant / que / aussi", "aussi / que / plus"],
            answer: "plus / que / aussi",
            explain: "Plus + adj + que (superioridad); aussi + adv + que (igualdad). Mi hermano es más alto que yo, pero yo corro igual de rápido.",
          },
          {
            scene: "Superlatif de cantidad",
            lines: [["", "C'est lui qui a ___ d'expérience dans l'équipe."]],
            options: ["le plus", "la plus", "les plus", "plus"],
            answer: "le plus",
            explain: "Superlatif de quantité: le plus de + sustantivo (invariable). El artículo es siempre 'le' para el superlatif de adverbios y cantidades.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Construye comparaciones",
        tag: "2 espacios",
        intro: "Completa las dos partes de cada comparación.",
        type: "dual",
        items: [
          {
            scene: "Comparar ciudades",
            lines: [["", "Paris est [[0]] grande [[1]] Bordeaux, mais aussi plus chère."]],
            blanks: [
              { options: ["plus", "moins", "aussi", "autant"], answer: "plus", explain: "Superioridad: plus + adjectif. París es más grande que Burdeos." },
              { options: ["que", "de", "qu'", "comme"], answer: "que", explain: "La comparación con adjetivos usa 'que' (o 'qu'' ante vocal). Plus grande que Bordeaux." },
            ],
          },
          {
            scene: "Superlativo de película",
            lines: [["", "C'est [[0]] film [[1]] intéressant que j'aie vu cette année."]],
            blanks: [
              { options: ["le", "la", "les", "un"], answer: "le", explain: "Superlatif masculino: le + substantivo + le plus + adjectif. Film est masculin." },
              { options: ["le plus", "plus", "le moins", "très"], answer: "le plus", explain: "Superlatif relatif de supériorité: le plus + adjectif. El artículo se repite (el sustantivo va antes)." },
            ],
          },
          {
            scene: "Comparar habilidades",
            lines: [["", "Tu joues [[0]] de la guitare [[1]] lui — il est vraiment talentueux!"]],
            blanks: [
              { options: ["moins bien", "moins meilleur", "pas bon", "moins"], answer: "moins bien", explain: "Bien (adverbio) → comparatif de inferioridad: moins bien. Juegas menos bien = tocas peor." },
              { options: ["que", "de", "qu'", "comme"], answer: "que", explain: "Comparatif: bien/mieux/moins bien + que. Moins bien que lui = menos bien que él." },
            ],
          },
          {
            scene: "Superlativo irregular",
            lines: [["", "C'est [[0]] solution [[1]] que j'aie trouvée."]],
            blanks: [
              { options: ["la meilleure", "la plus bonne", "le meilleur", "la mieux"], answer: "la meilleure", explain: "Bon (adjetivo femenino) → superlatif: la meilleure. Solution est féminin." },
              { options: ["possible", "de toutes", "jamais", "imaginable"], answer: "possible", explain: "'La meilleure solution possible' es la construcción habitual. 'Possible' no cambia tras le/la meilleur(e)." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Anuncio comparativo",
        tag: "Texto guiado",
        intro: "Completa este anuncio publicitario comparando productos.",
        type: "guidedText",
        scene: "Una empresa lanza un nuevo smartphone y lo compara con la competencia en un anuncio.",
        text: "Notre nouveau téléphone est [[0]] rapide [[1]] tous les autres modèles sur le marché. Sa batterie dure [[2]] longtemps que celle de la concurrence. C'est l'appareil [[3]] léger de sa catégorie — il pèse [[4]] qu'une tablette de chocolat! La caméra prend [[5]] belles photos [[1]] jamais. Et bien sûr, il est [[6]] — c'est l'investissement le [[7]] pour votre argent.",
        blanks: [
          { options: ["plus", "moins", "aussi", "autant"], answer: "plus", explain: "Superioridad: plus + adjectif + que. Nuestro teléfono es más rápido que todos los demás." },
          { options: ["que", "de", "qu'", "comme"], answer: "que", explain: "Comparatif: plus + adj + que. Siempre 'que' (o 'qu'' ante vocal/h mudo)." },
          { options: ["plus", "moins", "aussi", "autant"], answer: "plus", explain: "Superioridad de adverbio: dure plus longtemps. La batería dura más tiempo." },
          { options: ["le plus", "le moins", "plus", "très"], answer: "le plus", explain: "Superlatif relatif masculin: l'appareil le plus léger. El artículo se repite cuando el adjetivo va después del sustantivo." },
          { options: ["moins", "plus", "autant", "aussi"], answer: "moins", explain: "Inferioridad: pèse moins que. Pesa menos que una tableta de chocolate." },
          { options: ["les plus", "les moins", "plus de", "autant de"], answer: "les plus", explain: "Superlatif de adjetivo plural: les plus belles photos. Accord con 'photos' (femenino plural)." },
          { options: ["le meilleur", "le mieux", "meilleur", "le plus bon"], answer: "le meilleur", explain: "Bon → superlatif: le meilleur. Adjetivo que modifica el sustantivo implícito 'choix'." },
          { options: ["meilleur", "mieux", "bon", "plus bon"], answer: "meilleur", explain: "Bon → superlatif relatif: le meilleur investissement. Adjetivo (no adverbio), por eso meilleur y no mieux." },
        ],
      },
      {
        id: "level-4",
        title: "Completa las comparaciones",
        tag: "Texto libre",
        intro: "Escribe las formas correctas para completar estas comparaciones.",
        type: "freeText",
        scene: "Completa las oraciones usando comparatif o superlatif según el contexto.",
        text: "Le train est [[0]] rapide que l'avion pour aller de Paris à Lyon. C'est la [[1]] décision que tu pouvais prendre dans cette situation. Marie parle espagnol [[2]] que son frère — elle a vécu à Madrid. Il a [[3]] d'amis que moi, mais nos amitiés sont [[4]] solides.",
        blanks: [
          { answer: "moins", accepted: ["moins", "aussi", "plus"], explain: "Comparatif de infériorité probable: le tren es menos rápido que el avión. 'Moins rapide que' es lo más natural aquí según el contexto." },
          { answer: "meilleure", accepted: ["meilleure", "pire", "moins bonne"], explain: "Superlatif de bon (femenino): la meilleure décision. Bon → meilleure (adjetivo femenino)." },
          { answer: "mieux", accepted: ["mieux"], explain: "Bien (adverbio de modo) → comparatif: mieux. Parler mieux que = hablar mejor que." },
          { answer: "plus", accepted: ["plus", "moins", "autant"], explain: "Comparatif de quantité + sustantivo: plus de + amis. Tiene más amigos." },
          { answer: "aussi", accepted: ["aussi", "plus", "moins"], explain: "Igualdad con adjetivo: aussi + adjectif + que. Las amistades son igual de sólidas." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: compara y superlativa",
        tag: "Producción",
        intro: "Escribe oraciones usando el comparatif o superlatif según las instrucciones.",
        type: "write",
        items: [
          {
            scene: "Compara dos ciudades",
            prompt: "Compara el clima de Paris y de Nice usando 'plus... que'. (Paris: froid, Nice: chaud)",
            answer: "Paris est moins chaud que Nice. / Nice est plus chaude que Paris.",
            accepted: ["plus chaude que", "moins froid que", "plus chaud que Paris"],
            explain: "Comparatif de supériorité/infériorité: plus/moins + adjectif + que. Acuerdo de género: chaude (femenino para Nice).",
          },
          {
            scene: "Superlatif d'une personne",
            prompt: "Describe al mejor estudiante de la clase usando el superlatif. (la meilleure étudiante / motivée)",
            answer: "C'est la meilleure étudiante de la classe. Elle est la plus motivée.",
            accepted: ["la meilleure étudiante", "la plus motivée"],
            explain: "Bon → superlatif femenino: la meilleure. Superlatif de adjectivo: la plus motivée.",
          },
          {
            scene: "Usa mieux correctamente",
            prompt: "Escribe sobre alguien que duerme mejor después de hacer ejercicio.",
            answer: "Il dort mieux depuis qu'il fait du sport.",
            accepted: ["dort mieux", "mieux depuis"],
            explain: "Bien → comparatif: mieux (adverbio). 'Mieux' modifica el verbo 'dormir', no el sustantivo.",
          },
          {
            scene: "Comparación de cantidades",
            prompt: "Escribe que esta semana tienes más trabajo que la semana pasada.",
            answer: "J'ai plus de travail cette semaine que la semaine dernière.",
            accepted: ["plus de travail", "que la semaine dernière"],
            explain: "Comparatif de quantité: plus de + sustantivo + que. 'Plus de travail' = más trabajo.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: redacta comparaciones",
        tag: "Producción libre",
        intro: "Escribe 3 comparaciones o superlativos sobre los temas indicados.",
        type: "write",
        items: [
          {
            scene: "Compara dos medios de transporte",
            prompt: "Compara el coche y el vélo usando plus/moins/aussi con dos adjectifs diferentes.",
            answer: "La voiture est plus rapide que le vélo, mais le vélo est moins polluant.",
            accepted: ["plus rapide que", "moins polluant", "aussi pratique"],
            explain: "Comparatif de supériorité et d'infériorité. Los adjectivos acuerdan con los sustantivos (rapide/polluant invariables aquí).",
          },
          {
            scene: "Mejor experiencia de tu vida",
            prompt: "Escribe la mejor experiencia de tu vida usando el superlatif de 'bon'.",
            answer: "C'est le meilleur voyage de ma vie. / C'était le meilleur moment de mon enfance.",
            accepted: ["le meilleur", "la meilleure"],
            explain: "Bon → superlatif: le meilleur / la meilleure. Acuerdo con el sustantivo: le meilleur voyage (m.) / la meilleure expérience (f.).",
          },
          {
            scene: "Habla de habilidades",
            prompt: "Compara cómo hablas francés ahora versus antes usando 'mieux'.",
            answer: "Je parle beaucoup mieux le français qu'avant. J'ai fait des progrès.",
            accepted: ["mieux", "mieux qu'avant", "mieux le français"],
            explain: "Bien → mieux (adverbio). 'Beaucoup mieux' = mucho mejor. Mieux modifica el verbo 'parler'.",
          },
        ],
      },
    ],
  },
}

export default topic
