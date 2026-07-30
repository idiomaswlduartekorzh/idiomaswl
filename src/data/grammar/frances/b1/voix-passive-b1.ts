import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'voix-passive-b1',
  order: '06',
  color: '#1a2ecc',
  category: 'Structure',
  level: 'B1',
  title: 'La Voix Passive en Francés B1',
  shortTitle: 'Voix Passive',
  metaTitle: 'Voix Passive B1 — La voz pasiva en francés: formación y uso',
  description:
    'La voix passive (voz pasiva) en francés se forma con être + participio pasado concordado. Desplaza el foco de quién hace la acción (agente) hacia quién la recibe. Es muy frecuente en textos formales, noticias y documentos. El participio concuerda siempre en género y número con el sujeto.',
  lead: 'Domina la voz pasiva en francés: formación con être + participio concordado, transformación de activa a pasiva, y cuándo usarla en textos formales.',
  outcomes: [
    'Formas la voz pasiva en diferentes tiempos verbales con être + participio',
    'Haces concordar el participio pasado con el sujeto en género y número',
    'Transformas oraciones activas a pasivas y viceversa',
    'Identificas y usas la voz pasiva en textos formales y noticias',
  ],

  guide: {
    goal: 'Usar la voz pasiva para centrar el discurso en el objeto de la acción en lugar del agente.',
    model: "Ce livre a été écrit par un auteur célèbre. / La maison sera construite l'année prochaine. / Le rapport est signé par le directeur.",
    formula: "Sujeto (objeto original) + être (conjugado) + participio pasado (concordado) + par + agente",
    decisions: [
      'Estructura básica: être conjugado en el tiempo deseado + participio pasado concordado con el sujeto.',
      'Concordancia: el participio concuerda con el nuevo sujeto → La lettre est signée. / Les lettres sont signées.',
      'Agente introducido por "par": La fenêtre a été cassée par le vent. (El agente puede omitirse.)',
      'Transformación activa → pasiva: sujeto activo → agente (par...); objeto directo → nuevo sujeto.',
      'Pasiva sin agente cuando el agente es desconocido o irrelevante: "La voiture a été volée."',
      'Pasiva en tiempos compuestos: être en PC + participe passé del verbo → La lettre a été envoyée.',
    ],
    table: [
      ['Tiempo', 'Formación passif', 'Ejemplo'],
      ['Présent', 'est / sont + pp', 'Le projet est discuté.'],
      ['Passé composé', 'a été / ont été + pp', 'La lettre a été signée.'],
      ['Futur simple', 'sera / seront + pp', 'Le musée sera rénové.'],
    ],
    mistakes: [
      '"La maison est construite par les ouvriers" puede ser voz pasiva estado (maison déjà construite) o proceso. Contexto determina el significado.',
      '"Les voitures ont été réparer" ❌ → "ont été réparées" ✓ — participio debe concordar: réparées (femenino plural).',
      '"Ce film est fait par" ❌ en muchos contextos coloquiales → preferir "on a fait ce film" u otra estructura activa.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma la voz pasiva en francés?',
      paragraphs: [
        'La voz pasiva en francés se construye con el auxiliar "être" conjugado en el tiempo verbal deseado, más el participio pasado del verbo principal. El participio debe concordar en género y número con el sujeto de la oración pasiva. Esta concordancia es una diferencia crucial con el español, donde el participio también concuerda en la voz pasiva.',
        'Ejemplos por tiempo verbal: Présent — "Le rapport est présenté par le directeur." Passé composé — "La loi a été votée hier." Imparfait — "Le château était visité par des milliers de touristes chaque année." Futur simple — "Le nouveau pont sera inauguré en 2027."',
      ],
    },
    {
      heading: '¿Cómo se pasa de la voz activa a la pasiva en francés?',
      paragraphs: [
        'Para transformar una oración activa en pasiva: el objeto directo de la oración activa se convierte en el sujeto de la pasiva; el verbo principal se transforma en être + participio; el sujeto original se convierte en el agente, introducido por "par" (o "de" en algunos casos).',
        'Ejemplo completo: ACTIVA → "Les journalistes ont interviewé le ministre." PASIVA → "Le ministre a été interviewé par les journalistes." Atención: solo los verbos transitivos directos (que tienen objeto directo) pueden formar la voz pasiva en francés.',
      ],
    },
    {
      heading: '¿Cómo concuerda el participio en la voz pasiva francesa?',
      paragraphs: [
        'Una regla que los estudiantes a menudo olvidan: en la voz pasiva, el participio pasado siempre concuerda en género y número con el sujeto, porque être es el auxiliar. Esto es diferente del passé composé con avoir, donde el participio no concuerda con el sujeto.',
        'Ejemplos de concordancia: "La décision a été prise." (femenino singular → prise) / "Les documents ont été signés." (masculino plural → signés) / "Les lettres ont été envoyées." (femenino plural → envoyées).',
      ],
    },
    {
      heading: 'Cuándo usar la voz pasiva en francés',
      paragraphs: [
        'La voz pasiva es especialmente frecuente en: textos formales y académicos (artículos científicos, informes), noticias periodísticas, descripciones de procesos, y cuando el agente es desconocido o irrelevante. "Le président a été réélu." / "Une nouvelle loi sera présentée au parlement." / "L\'ordinateur a été réparé." (sin agente)',
        'En el francés oral cotidiano, la voz pasiva es menos frecuente. Los francófonos prefieren usar "on" activo en lugar de la pasiva: "On a volé ma voiture" en lugar de "Ma voiture a été volée." Sin embargo, para el nivel B1, reconocer y usar ambas formas es esencial.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Voz pasiva en diferentes tiempos con concordancia del participio.',
    graphicPrompt: 'Transformación activa → pasiva con flechas y resaltado de concordancia.',
    scene: [
      ["Ce roman a été écrit par un auteur colombien.", "Esta novela fue escrita por un autor colombiano."],
      ["La réunion est organisée par le chef de projet.", "La reunión es organizada por el jefe de proyecto."],
      ["Les résultats seront publiés demain.", "Los resultados serán publicados mañana."],
      ["La maison a été vendue la semaine dernière.", "La casa fue vendida la semana pasada."],
      ["Ces photos ont été prises en Provence.", "Estas fotos fueron tomadas en Provenza."],
      ["Le pont sera construit en deux ans.", "El puente será construido en dos años."],
      ["La lettre a été signée par tous les membres.", "La carta fue firmada por todos los miembros."],
      ["Les victimes ont été secourues rapidement.", "Las víctimas fueron socorridas rápidamente."],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['être + pp concordé', 'activa → pasiva', 'concordancia género y número'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la voz pasiva',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de la voz pasiva.',
        type: 'choice',
        items: [
          {
            scene: 'Noticia de cultura',
            lines: [['', "Ce tableau ___ par Picasso en 1907."]],
            options: ['a été peint', 'a peint', 'a été peinte', 'est peint'],
            answer: 'a été peint',
            explain: '"Tableau" es masculino singular → participio: peint (sin acuerdo). A été peint = passé composé pasivo.',
          },
          {
            scene: 'Anuncio oficial',
            lines: [['', "La nouvelle loi ___ par le parlement hier."]],
            options: ['a été votée', 'a voté', 'a été voté', 'est votée'],
            answer: 'a été votée',
            explain: '"Loi" es femenino → participio concuerda: votée. A été votée = pasivo en PC.',
          },
          {
            scene: 'Arquitectura',
            lines: [['', "Ces monuments ___ au XVIIe siècle."]],
            options: ['ont été construits', 'ont construit', 'ont été construites', 'sont construits'],
            answer: 'ont été construits',
            explain: '"Monuments" es masculino plural → construits. Ont été construits = PC pasivo plural.',
          },
          {
            scene: 'Futuro anuncio',
            lines: [['', "Les résultats ___ la semaine prochaine."]],
            options: ['seront publiés', 'seront publiées', 'ont été publiés', 'sont publiés'],
            answer: 'seront publiés',
            explain: '"Résultats" es masculino plural → publiés. Seront = futur simple de être.',
          },
          {
            scene: 'Proceso presente',
            lines: [['', "Les candidats ___ par un jury international."]],
            options: ['sont évalués', 'sont évaluées', 'ont été évalués', 'seront évalués'],
            answer: 'sont évalués',
            explain: 'Présent pasivo: sont + évalués (masculino plural).',
          },
          {
            scene: 'Robo en la ciudad',
            lines: [['', "Ma voiture ___ hier soir. Je suis furieux."]],
            options: ['a été volée', 'a volé', 'a été volé', 'est volée'],
            answer: 'a été volée',
            explain: '"Voiture" es femenino → volée. A été volée = PC pasivo sin agente.',
          },
          {
            scene: 'Carta oficial',
            lines: [['', "Cette lettre ___ par le directeur et le président."]],
            options: ['a été signée', 'ont été signées', 'a été signé', 'est signée'],
            answer: 'a été signée',
            explain: '"Lettre" femenino singular → signée. A été signée (PC pasivo).',
          },
          {
            scene: 'Noticias internacionales',
            lines: [['', "Les victimes ___ par les équipes de secours."]],
            options: ['ont été secourues', 'ont secouru', 'ont été secourus', 'sont secourues'],
            answer: 'ont été secourues',
            explain: '"Victimes" femenino plural → secourues. Ont été secourues = PC pasivo femenino plural.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Construcción pasiva completa',
        tag: '2 espacios',
        intro: 'Completa las oraciones pasivas con el auxiliar y el participio correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Noticia deportiva',
            lines: [['', "La finale [[0]] disputée demain et les vainqueurs [[1]] récompensés par la fédération."]],
            blanks: [
              { options: ['sera', 'est', 'a été', 'serait'], answer: 'sera', explain: 'Futur simple pasivo: sera (la finale, femenino pero el verbo no concuerda en ser, solo el participe).' },
              { options: ['seront', 'sont', 'ont été', 'seraient'], answer: 'seront', explain: 'Futur pasivo plural: seront (les vainqueurs, masculino plural).' },
            ],
          },
          {
            scene: 'Investigación policial',
            lines: [['', "L'appartement [[0]] fouillé par la police et plusieurs objets [[1]] saisis."]],
            blanks: [
              { options: ['a été', 'ont été', 'est', 'avait été'], answer: 'a été', explain: 'PC pasivo singular: a été (l\'appartement, masculino singular).' },
              { options: ['ont été', 'a été', 'sont', 'avaient été'], answer: 'ont été', explain: 'PC pasivo plural: ont été (plusieurs objets, masculino plural).' },
            ],
          },
          {
            scene: 'Documento formal',
            lines: [['', "Le contrat [[0]] rédigé par nos avocats et toutes les clauses [[1]] vérifiées."]],
            blanks: [
              { options: ['a été', 'ont été', 'est', 'avait été'], answer: 'a été', explain: 'PC pasivo: a été (le contrat, masculino singular).' },
              { options: ['ont été', 'a été', 'sont', 'avaient été'], answer: 'ont été', explain: 'PC pasivo femenino plural: ont été (les clauses, femenino plural → vérifiées).' },
            ],
          },
          {
            scene: 'Historia del castillo',
            lines: [['', "Ce château [[0]] construit au XIIe siècle et [[1]] restauré à plusieurs reprises."]],
            blanks: [
              { options: ['a été', 'ont été', 'est', 'était'], answer: 'a été', explain: 'PC pasivo singular: a été (ce château, masculino singular).' },
              { options: ['a été', 'ont été', 'est', 'avait été'], answer: 'a été', explain: 'El mismo sujeto (château) → a été (segunda vez, sobreentendido).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Noticias de actualidad',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de la voz pasiva para completar estas noticias.',
        type: 'guidedText',
        scene: 'Titulares y fragmentos de noticias usando la voz pasiva.',
        text: "Hier, une nouvelle clinique [[0]] (inaugurer) par le maire de la ville. Plusieurs médecins [[1]] (recruter) pour le nouveau service. Une conférence de presse [[2]] (organiser) pour l'occasion. Les discours [[3]] (applaudir) par le public présent. La cérémonie [[4]] (retransmettre) en direct à la télévision. Un rapport médical [[5]] (présenter) et des statistiques de santé [[6]] (partager) avec les journalistes.",
        blanks: [
          { options: ['a été inaugurée', 'a inauguré', 'a été inauguré', 'est inaugurée'], answer: 'a été inaugurée', explain: '"Clinique" femenino singular → inaugurée. Passé composé pasivo.' },
          { options: ['ont été recrutés', 'ont recruté', 'ont été recrutées', 'sont recrutés'], answer: 'ont été recrutés', explain: '"Médecins" masculino plural → recrutés. PC pasivo.' },
          { options: ['a été organisée', 'a organisé', 'a été organisé', 'est organisée'], answer: 'a été organisée', explain: '"Conférence" femenino singular → organisée. PC pasivo.' },
          { options: ['ont été applaudis', 'ont applaudi', 'ont été applaudies', 'sont applaudis'], answer: 'ont été applaudis', explain: '"Discours" masculino plural → applaudis. PC pasivo.' },
          { options: ['a été retransmise', 'a retransmis', 'a été retransmis', 'est retransmise'], answer: 'a été retransmise', explain: '"Cérémonie" femenino singular → retransmise. PC pasivo.' },
          { options: ['a été présenté', 'a présenté', 'a été présentée', 'est présenté'], answer: 'a été présenté', explain: '"Rapport" masculino singular → présenté. PC pasivo.' },
          { options: ['ont été partagées', 'ont partagé', 'ont été partagés', 'sont partagées'], answer: 'ont été partagées', explain: '"Statistiques" femenino plural → partagées. PC pasivo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Transforma a pasiva',
        tag: 'Texto libre',
        intro: 'Escribe la versión pasiva de cada oración activa indicada.',
        type: 'freeText',
        scene: 'Transformación de oraciones activas a pasivas.',
        text: "Transformez les phrases suivantes en voix passive:\n Les étudiants ont écrit les examens. → Les examens [[0]] par les étudiants.\n Le chef a préparé le dîner. → Le dîner [[1]] par le chef.\n Un architecte célèbre construira cet immeuble. → Cet immeuble [[2]].\n On a volé les bijoux. → Les bijoux [[3]].\n Le jury évalue les candidats. → Les candidats [[4]].",
        blanks: [
          { answer: 'ont été écrits', accepted: ['ont été écrits'], explain: '"Examens" masculino plural → écrits. Ont été = PC pasivo.' },
          { answer: 'a été préparé', accepted: ['a été préparé'], explain: '"Dîner" masculino singular → préparé. A été = PC pasivo.' },
          { answer: 'sera construit par un architecte célèbre', accepted: ['sera construit', 'sera construit par'], explain: 'Futur pasivo: sera construit (masculino singular).' },
          { answer: 'ont été volés', accepted: ['ont été volés'], explain: '"Bijoux" masculino plural → volés. Sin agente (on → se omite).' },
          { answer: 'sont évalués par le jury', accepted: ['sont évalués', 'sont évalués par le jury'], explain: 'Présent pasivo: sont évalués (masculino plural).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con voz pasiva',
        tag: 'Producción',
        intro: 'Escribe oraciones en voz pasiva según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'Evento reciente en tu ciudad',
            prompt: "Escribe una noticia breve sobre algo que ocurrió en tu ciudad usando la voz pasiva (PC).",
            answer: "Un nouveau parc a été inauguré par le maire la semaine dernière.",
            accepted: ['a été', 'ont été', 'est', 'sont'],
            explain: "Usa: [sujet] + a/ont été + [participé passé concordé] + par + [agent] + [circonstance].",
          },
          {
            scene: 'Anuncio futuro',
            prompt: "Escribe una noticia sobre algo que ocurrirá en el futuro usando voz pasiva (futur).",
            answer: "Une nouvelle bibliothèque sera construite au centre-ville l'année prochaine.",
            accepted: ['sera', 'seront'],
            explain: "Futur pasivo: [sujet] + sera/seront + [participé concordé] + (par + agent) + circonstance.",
          },
          {
            scene: 'Proceso habitual',
            prompt: "Describe un proceso habitual en tu trabajo o escuela usando voz pasiva (présent).",
            answer: "Les examens sont corrigés par les professeurs et les notes sont publiées en ligne.",
            accepted: ['est', 'sont'],
            explain: "Présent pasivo: [sujet] + est/sont + [participé concordé]. Describe procesos regulares.",
          },
          {
            scene: 'Sin agente',
            prompt: "Escribe una oración pasiva sin mencionar al agente (cuando es desconocido).",
            answer: "Mon vélo a été volé hier soir devant la gare.",
            accepted: ['a été', 'ont été', 'est', 'sont', 'sera', 'seront'],
            explain: "La voz pasiva sin 'par + agente' se usa cuando el agente es desconocido o irrelevante.",
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Redacta una noticia',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones de una noticia imaginaria usando voz pasiva en distintos tiempos.',
        type: 'write',
        items: [
          {
            scene: 'El titular (présent o PC)',
            prompt: "Escribe el titular de una noticia en voz pasiva (presente o passé composé).",
            answer: "Un accord historique a été signé par les deux pays rivaux.",
            accepted: ['a été', 'ont été', 'est', 'sont'],
            explain: "Titular: [sujeto-paciente] + [a/ont été / est/sont] + [participé concordé] + (par + agent).",
          },
          {
            scene: 'El desarrollo (imparfait/PC)',
            prompt: "Añade un detalle sobre cómo ocurrió (usa voz pasiva con imparfait o PC).",
            answer: "La cérémonie a été organisée dans la capitale et des milliers de personnes y ont assisté.",
            accepted: ['a été', 'ont été', 'était', 'avait été'],
            explain: "Desarrolla la noticia: a été + participe concordé. Puedes combinar pasiva y activa.",
          },
          {
            scene: 'El futuro (futur simple)',
            prompt: "Escribe qué pasará a continuación usando voz pasiva en futur simple.",
            answer: "Les détails du traité seront publiés demain et les parlements devront les approuver.",
            accepted: ['sera', 'seront'],
            explain: "Futur pasivo: [sujet] + sera/seront + [participe concordé]. Usa pour expliquer la suite.",
          },
        ],
      },
    ],
  },
}

export default topic
