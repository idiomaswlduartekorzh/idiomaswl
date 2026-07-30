import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prateritum-starke-verben-b1',
  order: '07',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'B1',
  title: 'Präteritum starker Verben — Pretérito de verbos fuertes en alemán B1',
  shortTitle: 'Präteritum starke Verben',
  metaTitle: 'Präteritum starke Verben B1 — El pretérito de verbos irregulares alemanes',
  description:
    "El Präteritum (pretérito imperfecto) de los verbos fuertes es fundamental para narrar en alemán. A diferencia de los verbos débiles (que añaden -te), los verbos fuertes cambian la vocal del radical sin añadir sufijo en la 1ª y 3ª persona singular. Se usa principalmente en la lengua escrita y en narraciones formales.",
  lead: "Domina el Präteritum de los verbos fuertes alemanes más importantes: las formas, los cambios vocálicos y cuándo usarlo frente al Perfekt.",
  outcomes: [
    "Reconoces los grupos vocálicos de cambio en el Präteritum (e→a, i→a, ie→o, etc.)",
    "Conjugas correctamente los verbos irregulares más frecuentes en Präteritum",
    "Distingues el uso del Präteritum (escrito/narrativo) del Perfekt (oral)",
    "Narras eventos en pasado con los verbos fuertes más esenciales del B1",
  ],

  guide: {
    goal: "Narrar en pasado usando el Präteritum de los verbos irregulares (fuertes) más frecuentes del alemán.",
    model: "Er kam um 8 Uhr an. / Sie ging nach Hause. / Das Kind schlief tief und fest.",
    formula: "1./3. Person Singular: ohne Endung | 2. Person Singular: Stamm + -(e)st | Plural: regelmäßige Endungen",
    decisions: [
      "Verbos fuertes: cambio vocal en el radical. gehen → ging; kommen → kam; schreiben → schrieb.",
      "1ª/3ª persona singular: sin terminación. ich kam / er kam.",
      "2ª persona singular: -st. du kamst.",
      "Plural: -en (1ª/3ª), -(e)st (2ª), -t (2ª plural formal). wir kamen / sie kamen.",
      "Sein es completamente irregular: war / warst / waren.",
      "Haben en Präteritum: hatte / hattest / hatte / hatten.",
      "Uso: Präteritum en textos escritos, periodismo, cuentos. Perfekt en la lengua oral cotidiana.",
    ],
    table: [
      ["Infinitiv", "Präteritum (ich)", "Präteritum (wir)"],
      ["kommen", "ich kam", "wir kamen"],
      ["gehen", "ich ging", "wir gingen"],
      ["schreiben", "ich schrieb", "wir schrieben"],
    ],
    mistakes: [
      "\"Er kamt\" ❌ — 3ª persona sin terminación: \"Er kam\" ✓.",
      "\"Ich habte\" ❌ — haben irregular: \"Ich hatte\" ✓.",
      "\"Sie gingen nicht\" ✓ — correcto. Sin -e antes de la terminación.",
    ],
  },

  seo: [
    {
      heading: '¿Cómo cambian la vocal los verbos fuertes en Präteritum?',
      paragraphs: [
        "Los verbos fuertes (starke Verben) del alemán forman el Präteritum cambiando la vocal del radical, sin añadir el sufijo -te de los verbos débiles. Los grupos de cambio más frecuentes son: e→a (geben→gab, essen→aß, lesen→las, sehen→sah), ei→ie (schreiben→schrieb, bleiben→blieb, treiben→trieb), ie→o (fliegen→flog, ziehen→zog), i→a (singen→sang, finden→fand, trinken→trank), e→o/u (nehmen→nahm, sprechen→sprach, werfen→warf).",
        "La conjugación sigue un patrón regular: la 1ª y 3ª persona singular son idénticas y sin terminación (ich/er/sie/es kam), la 2ª persona singular añade -(e)st (du kamst), el plural sigue las terminaciones estándar (-en, -est/-t). Los verbos cuya raíz termina en -t o -d pueden añadir -e antes de las terminaciones que empiezan por consonante para facilitar la pronunciación (werden → du wurdest, finden → du fandest).",
      ],
    },
    {
      heading: '¿Cuándo se usa Präteritum y cuándo Perfekt en alemán?',
      paragraphs: [
        "En alemán existe una distinción de registro importante: el Präteritum es el tiempo de la narración escrita (novelas, cuentos, artículos periodísticos, informes), mientras que el Perfekt es el tiempo del alemán oral cotidiano para hablar de eventos pasados. Esta es una diferencia significativa respecto al español, que usa el pretérito indefinido tanto en escritura como en conversación formal.",
        "Sin embargo, hay excepciones importantes: sein (war), haben (hatte) y los verbos modales (konnte, wollte, musste, sollte, durfte, mochte) se usan preferentemente en Präteritum incluso en el alemán oral, porque sus formas de Perfekt suenan pesadas. 'Ich hatte keine Zeit' (oral normal) vs 'Ich habe keine Zeit gehabt' (oral pero muy formal). Para el nivel B1, es esencial dominar las formas de Präteritum para comprender textos escritos.",
      ],
    },
    {
      heading: '¿Cuáles son los verbos fuertes más frecuentes en Präteritum?',
      paragraphs: [
        "Los verbos fuertes más importantes para el nivel B1 son: sein (war), haben (hatte), werden (wurde), gehen (ging), kommen (kam), sehen (sah), geben (gab), nehmen (nahm), sprechen (sprach), stehen (stand), fahren (fuhr), laufen (lief), schreiben (schrieb), lesen (las), finden (fand), bleiben (blieb), essen (aß), trinken (trank), schlafen (schlief), denken (dachte). Estos 20 verbos cubren la gran mayoría del Präteritum en textos B1.",
        "Un truco mnemotécnico: agrupar por cambio vocálico. Grupo -ie→o-: schreiben/schrieb, bleiben/blieb, treiben/trieb, reiben/rieb. Grupo -ei→i-: gehen/ging (irregular especial). Grupo -a→u-: fahren/fuhr, graben/grub, laden/lud. Grupo -e→a-: geben/gab, essen/aß, sehen/sah, lesen/las. Aprender en grupos facilita la memorización y permite predecir formas desconocidas.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Präteritum starker Verben: cambio vocálico en el radical, sin terminación en 1ª/3ª singular. Fundamental para leer y narrar en alemán.",
    graphicPrompt: "Tabla de cambios vocálicos con verbos en grupos: ein/ie, ei/ie, a/u, e/a con sus formas de Präteritum.",
    scene: [
      ["Als sie ankam, war das Licht schon aus.", "Cuando llegó, la luz ya estaba apagada."],
      ["Er schrieb ihr jeden Tag einen Brief.", "Le escribía una carta todos los días."],
      ["Das Kind schlief sofort ein.", "El niño se durmió enseguida."],
      ["Wir fanden den Schlüssel unter dem Sofa.", "Encontramos la llave debajo del sofá."],
      ["Sie lasen das Buch in einer Nacht.", "Leyeron el libro en una noche."],
      ["Er fuhr jeden Morgen mit dem Fahrrad zur Arbeit.", "Iba al trabajo en bicicleta todas las mañanas."],
      ["Die Kinder tranken heiße Schokolade.", "Los niños bebieron chocolate caliente."],
      ["Es gab kein freies Zimmer mehr im Hotel.", "Ya no había habitaciones libres en el hotel."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["cambios vocálicos por grupos", "1ª=3ª sg sin terminación", "sein/haben/werden irregulares"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Identifica el Präteritum correcto",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta del Präteritum del verbo dado.",
        type: "choice",
        items: [
          {
            scene: "Un cuento de hadas",
            lines: [["", "Es ___ einmal eine Prinzessin in einem großen Schloss. (sein)"]],
            options: ["war", "wurde", "hatte", "wars"],
            answer: "war",
            explain: "Sein → war (completamente irregular). Es war einmal = había una vez. Sein siempre usa Präteritum, nunca Perfekt.",
          },
          {
            scene: "Relato de viaje",
            lines: [["", "Wir ___ mit dem Zug nach München und ___ dort drei Tage. (fahren / bleiben)"]],
            options: ["fuhren / blieben", "führten / blieben", "fuhren / bliebten", "führen / blieben"],
            answer: "fuhren / blieben",
            explain: "Fahren → fuhr/fuhren (a→u). Bleiben → blieb/blieben (ei→ie). Plural 1ª persona: -en.",
          },
          {
            scene: "Historia de un escritor",
            lines: [["", "Er ___ sein erstes Buch mit zwanzig Jahren und ___ es in drei Monaten. (beginnen / schreiben)"]],
            options: ["begann / schrieb", "begannte / schriebte", "begann / schreibte", "began / schrieb"],
            answer: "begann / schrieb",
            explain: "Beginnen → begann (e→a, sg. sin terminación). Schreiben → schrieb (ei→ie, sg. sin terminación). 1ª/3ª sg idénticas.",
          },
          {
            scene: "Accidente en la cocina",
            lines: [["", "Das Glas ___ vom Tisch und ___. (fallen / brechen)"]],
            options: ["fiel / brach", "fiel / brach", "fell / brach", "fiel / brachte"],
            answer: "fiel / brach",
            explain: "Fallen → fiel (a→ie, 3ª sg sin terminación). Brechen → brach (e→a, 3ª sg sin terminación).",
          },
          {
            scene: "Recuerdo de infancia",
            lines: [["", "Als Kind ___ ich sehr gerne Bücher und ___ stundenlang. (lesen / schlafen)"]],
            options: ["las / schlief", "laste / schliefte", "las / schlafe", "lese / schlief"],
            answer: "las / schlief",
            explain: "Lesen → las (e→a, 1ª sg sin terminación). Schlafen → schlief (a→ie, 1ª sg sin terminación).",
          },
          {
            scene: "Noticia del día",
            lines: [["", "Die Polizei ___ gestern den Dieb und ___ ihn fest. (finden / nehmen)"]],
            options: ["fand / nahm", "fandte / nahm", "fand / nahnte", "funden / nahmen"],
            answer: "fand / nahm",
            explain: "Finden → fand (i→a, 3ª sg sin terminación). Nehmen → nahm (e→a, 3ª sg sin terminación). Ambos irregulares del grupo e→a.",
          },
          {
            scene: "Hablar de ayer",
            lines: [["", "Ich ___ gestern keine Zeit, aber ich ___ dich gerne angerufen. (haben / wollen — Präteritum)"]],
            options: ["hatte / wollte", "habe / wollte", "hatte / wollete", "hattet / wolltest"],
            answer: "hatte / wollte",
            explain: "Haben → hatte (irregular), wollen → wollte (modal, Präteritum siempre). Los modales usan Präteritum también en el habla oral.",
          },
          {
            scene: "Descripción de una escena",
            lines: [["", "Am Morgen ___ die Sonne, und viele Menschen ___ durch den Park. (scheinen / gehen)"]],
            options: ["schien / gingen", "schiene / gingen", "schien / gingten", "schiene / gingte"],
            answer: "schien / gingen",
            explain: "Scheinen → schien (ei→ie, 3ª sg). Gehen → gingen (completamente irregular, 3ª pl -en). Grupo plural: -en.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Dos formas en una oración",
        tag: "2 espacios",
        intro: "Completa con las dos formas de Präteritum correctas.",
        type: "dual",
        items: [
          {
            scene: "Cuento popular",
            lines: [["", "Das Mädchen [[0]] in den Wald und [[1]] dort ein kleines Häuschen."]],
            blanks: [
              { options: ["ging", "ginge", "gehte", "geht"], answer: "ging", explain: "Gehen → ging (3ª sg, completamente irregular, ohne Endung)." },
              { options: ["fand", "fandete", "findete", "fand es"], answer: "fand", explain: "Finden → fand (i→a, 3ª sg, ohne Endung)." },
            ],
          },
          {
            scene: "Día de exámenes",
            lines: [["", "Die Studenten [[0]] sehr früh auf und [[1]] die ganze Nacht."]],
            blanks: [
              { options: ["standen", "standeten", "stehen", "stunden"], answer: "standen", explain: "Stehen → stand/standen (e→a, 3ª pl -en). Die Studenten standen früh auf." },
              { options: ["lernten", "lerneten", "lern", "lernte"], answer: "lernten", explain: "Lernen es verbo débil: Präteritum = lernten (3ª pl). Lernen → lernte/lernten (regular)." },
            ],
          },
          {
            scene: "Viaje de negocios",
            lines: [["", "Der Manager [[0]] nach Berlin und [[1]] mit dem Kunden."]],
            blanks: [
              { options: ["flog", "fliehte", "flogete", "fliegt"], answer: "flog", explain: "Fliegen → flog (ie→o, 3ª sg ohne Endung). Manager flog nach Berlin." },
              { options: ["sprach", "sprachte", "sprekte", "spricht"], answer: "sprach", explain: "Sprechen → sprach (e→a, 3ª sg ohne Endung). Er sprach mit dem Kunden." },
            ],
          },
          {
            scene: "Tarde lluviosa",
            lines: [["", "Es [[0]] den ganzen Tag und wir [[1]] zu Hause."]],
            blanks: [
              { options: ["regnete", "regnete", "reg", "regniente"], answer: "regnete", explain: "Regnen es débil: Präteritum = regnete (3ª sg, regular). Es regnete den ganzen Tag." },
              { options: ["blieben", "bliebten", "blieben wir", "blib"], answer: "blieben", explain: "Bleiben → blieb/blieben (ei→ie, 1ª pl -en). Wir blieben zu Hause." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Cuento en Präteritum",
        tag: "Texto guiado",
        intro: "Completa el cuento con las formas correctas de Präteritum.",
        type: "guidedText",
        scene: "Un cuento clásico alemán narrado en Präteritum.",
        text: "Vor vielen Jahren [[0]] ein junger Mann namens Hans in einem kleinen Dorf. Eines Morgens [[1]] er früh auf, [[2]] sein Brot und [[3]] sich auf den langen Weg in die Stadt. Er [[4]] viele Stunden und [[5]] schließlich an einen großen Fluss. Er [[6]] nicht, wie er ihn überqueren sollte. Plötzlich [[7]] er eine alte Frau, die am Ufer [[8]]. Sie [[9]] ihm, den Weg zu finden, und Hans [[10]] ihr sehr dankbar.",
        blanks: [
          { options: ["lebte", "lebt", "lebe", "lebete"], answer: "lebte", explain: "Leben ist débil: lebte (3ª sg, regular). Präteritum de verbos débiles: Stamm + -te." },
          { options: ["stand", "stund", "stellte", "steht"], answer: "stand", explain: "Aufstehen → stand auf (e→a, 3ª sg). Trennbares Verb: Präfix am Ende." },
          { options: ["aß", "aßte", "aß es", "esse"], answer: "aß", explain: "Essen → aß (e→a, special: ß). 3ª sg ohne Endung." },
          { options: ["machte", "macht", "mache", "machete"], answer: "machte", explain: "Sich machen auf den Weg es débil: machte (regular). Er machte sich auf den Weg." },
          { options: ["lief", "läufte", "laufte", "lief"], answer: "lief", explain: "Laufen → lief (au→ie, 3ª sg ohne Endung). Er lief = corrió/caminó." },
          { options: ["kam", "kamt", "kamm", "kommt"], answer: "kam", explain: "Kommen → kam (o→a, 3ª sg ohne Endung). Er kam an einen großen Fluss." },
          { options: ["wusste", "wußte", "wüsste", "weiß"], answer: "wusste", explain: "Wissen → wusste (Mischverb: irregular). Er wusste nicht wie... = No sabía cómo..." },
          { options: ["sah", "sahe", "sahte", "siehte"], answer: "sah", explain: "Sehen → sah (e→a, 3ª sg ohne Endung). Er sah eine alte Frau." },
          { options: ["saß", "saßte", "sitzte", "sitzt"], answer: "saß", explain: "Sitzen → saß (i→a, 3ª sg, ß). Die Frau saß am Ufer." },
          { options: ["half", "helfte", "helfete", "hilft"], answer: "half", explain: "Helfen → half (e→a, 3ª sg ohne Endung). Sie half ihm = lo ayudó." },
          { options: ["war", "wurde", "hatte", "bin"], answer: "war", explain: "Sein → war (completamente irregular). Hans war ihr sehr dankbar = Hans le estaba muy agradecido." },
        ],
      },
      {
        id: "level-4",
        title: "Transforma al Präteritum",
        tag: "Texto libre",
        intro: "Escribe la forma de Präteritum del verbo indicado.",
        type: "freeText",
        scene: "Transforma estos verbos al Präteritum en la persona indicada.",
        text: "schreiben (er): Er [[0]] den ganzen Abend. / trinken (sie, pl.): Sie [[1]] Kaffee. / finden (du): Du [[2]] es nicht. / sehen (wir): Wir [[3]] das nicht kommen. / geben (ich): Ich [[4]] ihm meine Nummer.",
        blanks: [
          { answer: "schrieb", accepted: ["schrieb"], explain: "Schreiben → schrieb (ei→ie, 3ª sg ohne Endung). Er schrieb den ganzen Abend." },
          { answer: "tranken", accepted: ["tranken"], explain: "Trinken → trank/tranken (i→a, 3ª pl -en). Sie tranken Kaffee." },
          { answer: "fandest", accepted: ["fandest"], explain: "Finden → fand (i→a) + 2ª sg -st: du fandest. -(e)st tras -d." },
          { answer: "sahen", accepted: ["sahen"], explain: "Sehen → sah/sahen (e→a, 1ª pl -en). Wir sahen das nicht kommen." },
          { answer: "gab", accepted: ["gab"], explain: "Geben → gab (e→a, 1ª sg ohne Endung). Ich gab ihm meine Nummer." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: narra en Präteritum",
        tag: "Producción",
        intro: "Escribe oraciones en Präteritum según las instrucciones.",
        type: "write",
        items: [
          {
            scene: "Narra una acción pasada",
            prompt: "Escribe qué hizo alguien ayer: leer un libro, beber té, dormir temprano (lesen, trinken, schlafen).",
            answer: "Er las ein Buch, trank Tee und schlief früh ein.",
            accepted: ["las", "trank", "schlief"],
            explain: "Lesen→las, trinken→trank, schlafen→schlief. 3ª sg sin terminación. Trennbar: schlief... ein.",
          },
          {
            scene: "Cuento de hadas",
            prompt: "Empieza un cuento de hadas con 'Es war einmal...' y añade dónde vivía el personaje (leben).",
            answer: "Es war einmal ein König, der in einem großen Schloss lebte.",
            accepted: ["war", "lebte"],
            explain: "Sein → war, leben → lebte (débil). Präteritum standard para narración de cuentos.",
          },
          {
            scene: "Hablar del pasado (oral → escrito)",
            prompt: "Transforma al Präteritum (para un texto escrito): Ich habe keine Zeit gehabt.",
            answer: "Ich hatte keine Zeit.",
            accepted: ["Ich hatte keine Zeit", "hatte keine Zeit"],
            explain: "Haben → hatte. En el habla oral se usa Perfekt (habe gehabt), en escrito y oral informal → hatte.",
          },
          {
            scene: "Verbos modales",
            prompt: "Escribe que no podías venir porque tenías que trabajar (können, müssen).",
            answer: "Ich konnte nicht kommen, weil ich arbeiten musste.",
            accepted: ["konnte", "musste"],
            explain: "Können → konnte, müssen → musste. Los modales usan siempre Präteritum, incluso en la lengua oral.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: escribe un relato",
        tag: "Producción libre",
        intro: "Escribe 3 oraciones narrando eventos pasados usando Präteritum de verbos fuertes.",
        type: "write",
        items: [
          {
            scene: "Cuento personal",
            prompt: "Narra tres cosas que hiciste ayer usando kommen, sehen, gehen en Präteritum.",
            answer: "Ich kam um 17 Uhr nach Hause, sah meine Nachrichten und ging dann einkaufen.",
            accepted: ["kam", "sah", "ging"],
            explain: "Kommen→kam, sehen→sah, gehen→ging. Los tres completamente irregulares. 1ª sg sin terminación.",
          },
          {
            scene: "Un accidente",
            prompt: "Narra un pequeño accidente: caerse, romper algo, encontrar ayuda (fallen, brechen, finden).",
            answer: "Er fiel auf der Treppe, brach sein Glas und fand zum Glück sofort Hilfe.",
            accepted: ["fiel", "brach", "fand"],
            explain: "Fallen→fiel (a→ie), brechen→brach (e→a), finden→fand (i→a). Tres grupos vocálicos diferentes.",
          },
          {
            scene: "Historia de éxito",
            prompt: "Narra el inicio de una empresa: tener una idea, escribir un plan, comenzar el trabajo (haben, schreiben, beginnen).",
            answer: "Sie hatte eine gute Idee, schrieb einen Businessplan und begann sofort mit der Arbeit.",
            accepted: ["hatte", "schrieb", "begann"],
            explain: "Haben→hatte, schreiben→schrieb (ei→ie), beginnen→begann (e→a). Tres verbos fuertes en narrative sequence.",
          },
        ],
      },
    ],
  },
}

export default topic
