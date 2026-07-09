import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronoms-relatifs-b1',
  order: '08',
  color: '#2563eb',
  category: 'Estructura',
  level: 'B1',
  title: 'Les Pronoms Relatifs en Francés B1',
  shortTitle: 'Pronoms Relatifs',
  metaTitle: 'Pronoms Relatifs B1 — qui, que, ou, dont, lequel en frances',
  description:
    "Los pronoms relatifs (pronombres relativos) permiten unir dos oraciones evitando la repeticion. Qui, que, ou, dont y lequel/laquelle son los mas usados en el nivel B1. Cada uno tiene una funcion gramatical diferente: sujeto, objeto directo, lugar/tiempo, complemento con de, o complemento con otra preposicion.",
  lead: "Domina los pronombres relativos del frances: qui para el sujeto, que para el objeto, ou para lugar y tiempo, dont para complementos con de, y lequel/laquelle con preposiciones.",
  outcomes: [
    "Usas qui como sujeto y que como objeto directo en oraciones relativas",
    "Distingues ou (lugar/tiempo) y dont (complementos con de) correctamente",
    "Aplicas lequel/laquelle/lesquels/lesquelles con preposiciones para evitar ambiguedades",
    "Construyes oraciones relativas para describir personas, lugares y objetos sin repeticion",
  ],

  guide: {
    goal: "Unir oraciones usando el pronombre relativo adecuado segun la funcion gramatical del elemento referido.",
    model: "La femme qui parle est ma professeure. / Le livre que tu m'as prete est excellent. / La ville ou je suis ne est tres belle. / L'outil avec lequel il travaille est neuf.",
    formula: "qui (sujeto) | que/qu' (OD) | ou (lugar/tiempo) | dont (complemento con de) | lequel/laquelle (prep + pronombre)",
    decisions: [
      "Qui: sujeto del verbo subordinado. El verbo que le sigue concuerda con el antecedente.",
      "Que/qu': objeto directo del verbo subordinado. Elision obligatoria: qu' antes de vocal o h muda.",
      "Ou: indica lugar ('la ville ou je vis') o momento temporal ('le jour ou tu es arrive').",
      "Dont: reemplaza un complemento introducido por 'de': avoir besoin de, parler de, etre fier de, la possession.",
      "Lequel/laquelle/lesquels/lesquelles: con preposiciones distintas de 'de' (avec, pour, sur, dans, etc.).",
      "Contracciones: auquel (a + lequel), auxquels (a + lesquels), duquel (de + lequel), desquels (de + lesquels).",
    ],
    table: [
      ["Pronombre", "Funcion", "Ejemplo"],
      ["qui", "sujeto", "L'homme qui chante est mon voisin."],
      ["que / qu'", "objeto directo", "Le film que j'ai vu etait excellent."],
      ["ou", "lugar o tiempo", "La maison ou il habite est grande."],
      ["dont", "complemento con de", "Le livre dont j'ai besoin est epuise."],
    ],
    mistakes: [
      "\"La femme que parle\" ❌ — qui es sujeto cuando precede al verbo: \"La femme qui parle\" ✓.",
      "\"L'homme qui j'aime\" ❌ — objeto directo exige que/qu': \"L'homme que j'aime\" ✓.",
      "\"L'outil avec qui il travaille\" ❌ — con cosas (no personas) y preposicion: \"l'outil avec lequel il travaille\" ✓.",
    ],
  },

  seo: [
    {
      heading: "¿Para que sirven los pronombres relativos en frances?",
      paragraphs: [
        "Los pronombres relativos en frances permiten combinar dos oraciones en una sola, evitando la repeticion del sustantivo antecedente. En lugar de decir 'J'ai un ami. Cet ami parle cinq langues.', decimos 'J'ai un ami qui parle cinq langues.' La eleccion del pronombre depende exclusivamente de la funcion gramatical que cumple en la oracion subordinada.",
        "Para hispanohablantes, el sistema es similar al espanol: 'que' en espanol puede hacer todo, pero en frances hay pronombres especializados. La mayor dificultad es distinguir entre 'que' (objeto directo) y 'qui' (sujeto), y saber cuando usar 'dont' en lugar de 'que de'.",
      ],
    },
    {
      heading: "Qui y que: sujeto y objeto directo",
      paragraphs: [
        "Qui es el sujeto del verbo de la oracion subordinada: 'La personne qui m'a appele etait mon chef.' (qui = la personne = sujeto de 'a appele'). Que es el objeto directo: 'Le cadeau que tu m'as offert est magnifique.' (que = le cadeau = objeto de 'as offert', 'tu' es el sujeto). La diferencia es que despues de qui siempre viene un verbo directamente, mientras que despues de que viene un sujeto.",
        "Elision de que: cuando que precede a una vocal o h muda, se convierte en qu': 'L'ami qu'elle a retrouve.' / 'Le sujet qu'il a choisi.' Este cambio es obligatorio en frances escrito y hablado. Qui nunca sufre elision.",
      ],
      table: [
        ["Pronombre", "Seguido de", "Ejemplo"],
        ["qui", "verbo directamente", "La femme qui travaille ici est belge."],
        ["que", "sujeto + verbo", "Le livre que je lis est passionnant."],
        ["qu'", "vocal o h muda", "L'histoire qu'il raconte est vraie."],
      ],
    },
    {
      heading: "Ou y dont: lugar, tiempo y complementos con de",
      paragraphs: [
        "Ou se usa para indicar lugar o tiempo: lugar → 'La ville ou je suis ne s'appelle Medellin.' / tiempo → 'Je me souviens du jour ou tu es arrive.' Atencion: ou reemplaza 'a cet endroit' o 'a ce moment-la', no introduce preguntas directas.",
        "Dont reemplaza cualquier complemento introducido por 'de'. Tiene tres usos principales: posesion ('L'homme dont la fille est medecin' = cuya hija), expresiones verbales con de ('parler de → l'ami dont je t'ai parle', 'avoir besoin de → le livre dont j'ai besoin', 'etre fier de → les eleves dont je suis fier'). Dont equivale frecuentemente al 'cuyo/cuya' del espanol o a 'del que/de quien'.",
      ],
    },
    {
      heading: "Lequel/laquelle/lesquels/lesquelles con preposiciones",
      paragraphs: [
        "Cuando el pronombre relativo va precedido de una preposicion que no sea 'de', se usa lequel (masculino singular), laquelle (femenino singular), lesquels (masculino plural) o lesquelles (femenino plural). El pronombre concuerda en genero y numero con el antecedente: 'La table sur laquelle je travaille.' (laquelle porque table es femenino singular) / 'Les outils avec lesquels il repare.' (lesquels porque outils es masculino plural).",
        "Contracciones importantes: a + lequel = auquel, a + lesquels = auxquels, a + lesquelles = auxquelles. De + lequel = duquel (pero dont suele reemplazarlo). Ejemplos: 'Le projet auquel je participe.' / 'Les questions auxquelles il a repondu.' Con personas, se puede usar 'qui' con preposicion: 'La personne avec qui je travaille.' Pero con cosas, solo lequel/laquelle.",
      ],
    },
    {
      heading: "Evitar la repeticion con pronombres relativos",
      paragraphs: [
        "El uso de pronombres relativos es esencial para construir textos fluidos sin repeticiones. En lugar de 'J'ai rencontre une linguiste. Cette linguiste a publie plusieurs livres. Ces livres sont traduits en espagnol.', podemos decir 'J'ai rencontre une linguiste qui a publie plusieurs livres qui sont traduits en espagnol.' La concatenacion de oraciones relativas es normal en frances.",
        "En el frances oral, la eleccion del pronombre puede ser mas libre, pero en el frances escrito y en las evaluaciones B1, la distincion entre qui, que, dont y lequel es obligatoria. Un error comun de hispanohablantes es usar 'que' para todo, como en espanol. En frances, esto produce oraciones incorrectas cuando se necesita dont o lequel.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Pronombres relativos como conectores: qui (sujeto), que (objeto), ou (lugar/tiempo), dont (de), lequel/laquelle (prep).",
    graphicPrompt: "Diagrama de conexion entre dos oraciones simples que se unen con un pronombre relativo, con color segun funcion.",
    scene: [
      ["La femme qui enseigne le francais est tres patiente.", "La mujer que ensena frances es muy paciente."],
      ["Le film que nous avons vu hier etait magnifique.", "La pelicula que vimos ayer era magnifica."],
      ["C'est la ville ou je suis ne et ou j'ai grandi.", "Es la ciudad donde naci y donde creci."],
      ["Le livre dont j'avais besoin etait enfin disponible.", "El libro que necesitaba por fin estaba disponible."],
      ["L'ami dont je t'ai parle arrive demain de Paris.", "El amigo del que te hable llega manana de Paris."],
      ["La chaise sur laquelle il etait assis etait cassee.", "La silla en la que estaba sentado estaba rota."],
      ["Les raisons pour lesquelles elle est partie restent mysterieuses.", "Las razones por las que se fue siguen siendo misteriosas."],
      ["C'est une histoire qu'on n'oublie jamais.", "Es una historia que nunca se olvida."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["qui vs que", "dont (de)", "lequel/laquelle con preposicion"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Elige el pronombre relativo correcto",
        tag: "Opcion multiple",
        intro: "Selecciona el pronombre relativo adecuado segun la funcion gramatical.",
        type: "choice",
        items: [
          {
            scene: "Descripcion de personas",
            lines: [["", "La femme ___ parle avec le directeur est ma collegue."]],
            options: ["qui", "que", "dont", "ou"],
            answer: "qui",
            explain: "Qui es sujeto del verbo 'parle'. La femme = sujeto de la subordinada. Despues de qui siempre va directamente el verbo.",
          },
          {
            scene: "Recomendacion de libro",
            lines: [["", "Le roman ___ tu m'as recommande est vraiment excellent."]],
            options: ["que", "qui", "dont", "lequel"],
            answer: "que",
            explain: "Que es objeto directo de 'as recommande'. 'Tu' es el sujeto, 'le roman' es el objeto → que.",
          },
          {
            scene: "Descripcion de un lugar",
            lines: [["", "C'est le quartier ___ j'ai passe toute mon enfance."]],
            options: ["ou", "que", "qui", "dont"],
            answer: "ou",
            explain: "Ou indica lugar: 'le quartier ou j'ai passe...' = el barrio donde pase... Reemplaza 'dans ce quartier'.",
          },
          {
            scene: "Expresar necesidad",
            lines: [["", "Le dictionnaire ___ j'ai besoin est au bureau."]],
            options: ["dont", "que", "qui", "lequel"],
            answer: "dont",
            explain: "Dont reemplaza un complemento con 'de': avoir besoin de → dont. 'J'ai besoin du dictionnaire' → le dictionnaire dont j'ai besoin.",
          },
          {
            scene: "Objeto con preposicion",
            lines: [["", "La table sur ___ j'ecris mes notes est en bois."]],
            options: ["laquelle", "lequel", "lesquelles", "qui"],
            answer: "laquelle",
            explain: "Preposicion sur + pronombre relativo para cosa: laquelle (table = femenino singular). Sur qui seria incorrecto para cosas.",
          },
          {
            scene: "Expresion de orgullo",
            lines: [["", "Les etudiants ___ je suis le plus fier ont reussi leur examen."]],
            options: ["dont", "que", "qui", "lesquels"],
            answer: "dont",
            explain: "Dont reemplaza 'de': etre fier de quelqu'un → les etudiants dont je suis fier. 'Je suis fier des etudiants'.",
          },
          {
            scene: "Referencia temporal",
            lines: [["", "Je me souviens tres bien du jour ___ tu m'as annonce la nouvelle."]],
            options: ["ou", "que", "qui", "dont"],
            answer: "ou",
            explain: "Ou puede indicar tiempo ademas de lugar: 'le jour ou' = el dia en que. Reemplaza 'ce jour-la'.",
          },
          {
            scene: "Razon con preposicion",
            lines: [["", "Les problemes pour ___ nous cherchons des solutions sont complexes."]],
            options: ["lesquels", "laquelle", "lesquelles", "qui"],
            answer: "lesquels",
            explain: "Pour + pronombre relativo para cosa plural: lesquels (problemes = masculino plural). Pour qui seria para personas.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Conecta dos ideas",
        tag: "2 espacios",
        intro: "Completa con los dos pronombres relativos necesarios en cada oracion.",
        type: "dual",
        items: [
          {
            scene: "Descripcion de un viaje",
            lines: [["", "C'est une ville [[0]] j'aime beaucoup et [[1]] je reve de retourner depuis des annees."]],
            blanks: [
              { options: ["que", "qui", "dont", "ou"], answer: "que", explain: "Que: objeto directo de 'j'aime'. 'J'aime cette ville' → la ville que j'aime." },
              { options: ["ou", "que", "dont", "laquelle"], answer: "ou", explain: "Ou: indica lugar con retourner a. 'Je reve de retourner dans cette ville' → la ville ou je reve de retourner." },
            ],
          },
          {
            scene: "Hablar de personas",
            lines: [["", "L'ami [[0]] m'a aide hier est quelqu'un [[1]] je peux toujours compter."]],
            blanks: [
              { options: ["qui", "que", "dont", "lequel"], answer: "qui", explain: "Qui: sujeto de 'm'a aide'. 'L'ami = sujeto de la subordinada, va directamente antes del verbo." },
              { options: ["sur qui", "que", "dont", "sur lequel"], answer: "sur qui", explain: "Compter sur quelqu'un → sur qui (con personas se puede usar 'qui' despues de preposicion). Sur lequel tambien seria aceptable." },
            ],
          },
          {
            scene: "Descripcion de un proyecto",
            lines: [["", "Le projet [[0]] nous travaillons depuis des mois est enfin celui [[1]] nous avions reve."]],
            blanks: [
              { options: ["auquel", "que", "dont", "ou"], answer: "auquel", explain: "Travailler a un projet → a + lequel = auquel. Contraccion obligatoria de a + lequel." },
              { options: ["dont", "que", "ou", "lequel"], answer: "dont", explain: "Rever de quelque chose → dont. 'Nous avions reve de ce projet' → le projet dont nous avions reve." },
            ],
          },
          {
            scene: "Descripcion de un libro",
            lines: [["", "C'est le roman [[0]] a gagne le prix Goncourt et [[1]] tout le monde parle en ce moment."]],
            blanks: [
              { options: ["qui", "que", "dont", "ou"], answer: "qui", explain: "Qui: sujeto de 'a gagne'. 'Le roman = sujeto que gano el premio." },
              { options: ["dont", "que", "ou", "lequel"], answer: "dont", explain: "Parler de quelque chose → dont. 'Tout le monde parle de ce roman' → le roman dont tout le monde parle." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Descripcion de una ciudad",
        tag: "Texto guiado",
        intro: "Completa esta descripcion turistica con los pronombres relativos correctos.",
        type: "guidedText",
        scene: "Descripcion de Lyon para una guia turistica en frances.",
        text: "Lyon est une ville [[0]] je recommande vivement a tous les voyageurs. C'est une cite [[1]] a ete fondee par les Romains et [[2]] conserve un patrimoine exceptionnel. Le vieux Lyon est le quartier [[3]] on trouve les fameux 'traboules', ces passages [[4]] les habitants utilisaient pour circuler entre les immeubles. La gastronomie est un domaine [[5]] Lyon est mondialement connue: les 'bouchons' sont les restaurants traditionnels [[6]] il faut absolument decouvrir.",
        blanks: [
          { options: ["que", "qui", "dont", "ou"], answer: "que", explain: "Que: objeto directo de 'je recommande'. 'Je recommande cette ville' → la ville que je recommande." },
          { options: ["qui", "que", "dont", "ou"], answer: "qui", explain: "Qui: sujeto de 'a ete fondee'. La cite = sujeto del verbo subordinado 'a ete fondee'." },
          { options: ["qui", "que", "dont", "ou"], answer: "qui", explain: "Qui: sujeto de 'conserve'. Segundo relativo sobre la misma cite: et qui conserve..." },
          { options: ["ou", "que", "dont", "qui"], answer: "ou", explain: "Ou: lugar donde. 'Dans ce quartier on trouve' → le quartier ou on trouve." },
          { options: ["que", "qui", "dont", "lesquels"], answer: "que", explain: "Que: objeto directo de 'utilisaient'. 'Les habitants utilisaient ces passages' → les passages que les habitants utilisaient." },
          { options: ["dont", "que", "ou", "pour laquelle"], answer: "dont", explain: "Etre connu pour/de → dont. 'Lyon est connue pour sa gastronomie' → la gastronomie dont Lyon est connue." },
          { options: ["que", "qui", "dont", "ou"], answer: "que", explain: "Que: objeto directo de 'decouvrir'. 'Il faut decouvrir ces restaurants' → les restaurants qu'il faut decouvrir." },
        ],
      },
      {
        id: "level-4",
        title: "Combina las oraciones",
        tag: "Texto libre",
        intro: "Escribe el pronombre relativo correcto para unir estas oraciones.",
        type: "freeText",
        scene: "Describir a personas y cosas del entorno cotidiano con pronombres relativos.",
        text: "J'ai une amie [[0]] s'appelle Sofia et [[1]] j'admire beaucoup. Elle est architecte: les batiments [[2]] elle a participe a la construction sont tres innovants. Elle habite dans un appartement [[3]] on voit toute la ville. C'est le type de metier [[4]] elle avait toujours reve.",
        blanks: [
          { answer: "qui", accepted: ["qui"], explain: "Qui: sujeto de 's'appelle'. 'Mon amie s'appelle Sofia' → une amie qui s'appelle Sofia." },
          { answer: "que", accepted: ["que", "qu'"], explain: "Que: objeto directo de 'j'admire'. 'J'admire Sofia' → l'amie que j'admire." },
          { answer: "auxquels", accepted: ["auxquels", "a la construction desquels"], explain: "Participer a quelque chose → a + lesquels = auxquels. 'Elle a participe a la construction de ces batiments'." },
          { answer: "ou", accepted: ["ou", "depuis lequel", "de lequel"], explain: "Ou: lugar con verbo voir. 'Dans cet appartement on voit la ville' → un appartement ou on voit..." },
          { answer: "dont", accepted: ["dont"], explain: "Rever de quelque chose → dont. 'Elle avait reve de ce metier' → le metier dont elle avait reve." },
        ],
      },
      {
        id: "level-5",
        title: "Produccion: describe con relativos",
        tag: "Produccion",
        intro: "Escribe oraciones usando el pronombre relativo indicado.",
        type: "write",
        items: [
          {
            scene: "Describe a alguien que admiras",
            prompt: "Escribe una oracion sobre alguien que admiras usando QUI y QUE.",
            answer: "J'ai un professeur qui enseigne trois langues et que tous les etudiants adorent.",
            accepted: ["qui", "que", "qu'"],
            explain: "Qui: sujeto del verbo subordinado (enseigne). Que: objeto directo (que tous les etudiants adorent).",
          },
          {
            scene: "Describe un lugar",
            prompt: "Describe tu ciudad o barrio usando OU (lugar o tiempo).",
            answer: "Je vis dans un quartier ou il y a beaucoup de restaurants et ou les gens se retrouvent le soir.",
            accepted: ["ou"],
            explain: "Ou indica lugar: 'dans ce quartier il y a...' → le quartier ou il y a... Puede repetirse para anadir informacion.",
          },
          {
            scene: "Expresa una necesidad o un sentimiento",
            prompt: "Escribe una oracion sobre algo que necesitas o de lo que estas orgulloso/a usando DONT.",
            answer: "Le cours dont j'ai le plus besoin en ce moment est celui de prononciation.",
            accepted: ["dont"],
            explain: "Dont reemplaza 'de': avoir besoin de → dont. 'J'ai besoin de ce cours' → le cours dont j'ai besoin.",
          },
          {
            scene: "Describe un objeto con preposicion",
            prompt: "Describe un objeto o herramienta usando AVEC LEQUEL / AVEC LAQUELLE / AVEC LESQUELS.",
            answer: "Le stylo avec lequel j'ecris ce texte m'a ete offert par ma grand-mere.",
            accepted: ["avec lequel", "avec laquelle", "avec lesquels", "avec lesquelles"],
            explain: "Preposicion avec + pronombre relativo para cosa: lequel/laquelle segun genero del antecedente.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Mision: retrato de una persona famosa",
        tag: "Produccion libre",
        intro: "Escribe 3 oraciones describiendo a una persona famosa o a alguien que conoces, usando al menos 3 pronombres relativos distintos.",
        type: "write",
        items: [
          {
            scene: "Primera oracion: quien es (qui + que)",
            prompt: "Presenta a la persona con qui (lo que hace) y que (como la percibes).",
            answer: "C'est une scientifique qui a revolutionne son domaine et que le monde entier admire.",
            accepted: ["qui", "que", "qu'"],
            explain: "Qui para sujeto del subordinado; que/qu' para objeto directo. Dos relatives sobre el mismo antecedente.",
          },
          {
            scene: "Segunda oracion: de que es famosa (dont)",
            prompt: "Di de que es conocida o famosa esta persona usando DONT.",
            answer: "Les travaux dont elle est la plus fiere ont ete recompenses par de nombreux prix internationaux.",
            accepted: ["dont"],
            explain: "Etre fier de → dont. 'Elle est fiere de ses travaux' → les travaux dont elle est fiere.",
          },
          {
            scene: "Tercera oracion: lugar, herramienta o proyecto (ou / lequel)",
            prompt: "Menciona un lugar donde trabaja o un proyecto en el que participa usando OU o AUQUEL/LAQUELLE.",
            answer: "Le laboratoire ou elle travaille est l'un des plus avances du monde.",
            accepted: ["ou", "auquel", "laquelle", "lequel"],
            explain: "Ou para lugar: 'dans ce laboratoire elle travaille' → le laboratoire ou elle travaille. O auquel para 'participer a'.",
          },
        ],
      },
    ],
  },
}

export default topic
