import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'negation-ne-pas',
  order: '07',
  color: '#1a2ecc',
  category: 'Syntaxe',
  level: 'A1',
  title: 'La Negación en Francés A1 — ne...pas',
  shortTitle: 'Négation ne...pas',
  metaTitle: 'La negación en francés A1 — ne...pas, pas de, pas d\'',
  description:
    'La negación en francés se forma con dos palabras que envuelven al verbo: ne (antes del verbo) y pas (después). En el francés oral, el "ne" suele desaparecer. Además, el artículo cambia a "pas de/d\'" cuando el verbo negado implica una cantidad.',
  lead: 'En francés la negación es una "pinza": ne...pas rodea al verbo. En oral, el "ne" casi siempre desaparece — ¡pero en la escritura es obligatorio!',
  outcomes: [
    'Construye oraciones negativas con ne...pas',
    'Usa pas de/d\' con sustantivos',
    'Reconoce la elisión de ne en la lengua oral',
  ],

  guide: {
    goal: 'Formar oraciones negativas en francés usando la estructura ne...pas correctamente.',
    model: 'Je ne parle pas anglais. / Elle n\'habite pas ici. / Je n\'ai pas de voiture.',
    formula: 'Sujeto + ne/n\' + verbo + pas',
    decisions: [
      'ne → n\' antes de vocal o h muda: je n\'aime pas, il n\'habite pas',
      'En oral, ne casi siempre cae: "je parle pas" = informal; en escrito, siempre "je ne parle pas"',
      'Con artículos un/une/des/du/de la: en negativa → pas de/d\': j\'ai un chien → je n\'ai pas de chien',
      'pas de → pas d\' antes de vocal: je n\'ai pas d\'argent (no "pas de argent")',
      'La structure ne change pas avec les pronoms ni les temps de base en A1',
    ],
    table: [
      ['Afirmativa', 'Negativa', 'Oral (informal)'],
      ['Je parle français.', 'Je ne parle pas français.', 'Je parle pas français.'],
      ['Il mange une pizza.', 'Il ne mange pas de pizza.', 'Il mange pas de pizza.'],
      ['Elle a un chat.', 'Elle n\'a pas de chat.', 'Elle a pas de chat.'],
      ['Nous avons du temps.', 'Nous n\'avons pas de temps.', 'On a pas de temps.'],
      ['Tu aimes le sport.', 'Tu n\'aimes pas le sport.', 'T\'aimes pas le sport.'],
    ],
    mistakes: [
      '"Je ne parle pas de français" ❌ (si "français" es un idioma, no artículo) → "je ne parle pas français" ✓',
      '"Je ne mange pas une pizza" ❌ → "je ne mange pas de pizza" ✓ (un/une/des → de en negativa)',
      'Olvidar el pas: "Je ne mange." ❌ — siempre necesitas el pas (o jamais/plus/rien en otros contextos)',
    ],
  },

  seo: [
    {
      heading: '¿Cómo funciona la negación en francés?',
      paragraphs: [
        'En español basta con añadir "no" antes del verbo: "No hablo inglés". En francés, la negación es una estructura de dos partes que rodea al verbo conjugado: ne (o n\' ante vocal) + verbo + pas. Ejemplo: "Je ne parle pas anglais."',
        'Este sistema de "pinza" es una de las primeras cosas que debes aprender en francés. En la escritura formal y en la lengua estándar, siempre se mantiene la estructura completa ne...pas.',
      ],
    },
    {
      heading: '¿Por qué desaparece el "ne" en el francés hablado?',
      paragraphs: [
        'En el francés hablado cotidiano, el "ne" casi siempre desaparece: "Je parle pas français", "Il mange pas de pizza", "On a pas le temps". Este fenómeno es tan común que si usas siempre el "ne" en conversación, sonarás muy formal.',
        'Sin embargo, en la escritura — correos, mensajes, exámenes — siempre debes usar la negación completa: je ne parle pas, il ne mange pas, nous n\'avons pas.',
      ],
    },
    {
      heading: '¿Por qué el artículo cambia a "de" en la negación francesa?',
      paragraphs: [
        'Cuando el verbo va seguido de un artículo indefinido (un, une, des) o partitivo (du, de la, de l\'), en la negación ese artículo se convierte en "de" (o "d\'" ante vocal): J\'ai un chat → Je n\'ai pas de chat. Je mange de la viande → Je ne mange pas de viande. Il y a des étudiants → Il n\'y a pas d\'étudiants.',
        'Excepción: cuando el verbo es "être", el artículo no cambia: C\'est un professeur → Ce n\'est pas un professeur (✓). Esto se debe a que "être" no expresa posesión ni cantidad.',
      ],
    },
    {
      heading: 'ne...pas con verbos que empiezan por vocal',
      paragraphs: [
        'Antes de una vocal o h muda, "ne" se convierte en "n\'": je n\'aime pas, elle n\'habite pas, tu n\'es pas, nous n\'avons pas. La elisión es obligatoria tanto en escrito como en oral.',
        'En oral informal, incluso esta "n\'" suele caer: "j\'aime pas", "elle habite pas", aunque esto es solo válido en conversación informal.',
      ],
    },
  ],

  visual: {
    mode: 'transformation',
    teacherLens: 'La negación como "pinza" ne...pas alrededor del verbo conjugado.',
    graphicPrompt: 'Diagrama de transformación: oración afirmativa → negativa con flechas.',
    scene: [
      ['Je parle français.', 'Je ne parle pas français.'],
      ['Elle habite ici.', 'Elle n\'habite pas ici.'],
      ['Il a une voiture.', 'Il n\'a pas de voiture.'],
      ['Nous mangeons de la viande.', 'Nous ne mangeons pas de viande.'],
      ['Tu aimes le sport.', 'Tu n\'aimes pas le sport.'],
      ['Diego est étudiant.', 'Diego n\'est pas étudiant.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ne...pas envuelve el verbo', 'pas de con sustantivos', 'élision n\''],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma negativa correcta para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo entre Diego y Carlos',
            lines: [['Carlos', '___-tu français ? (Tu parles... → negativa)']],
            options: ['Tu ne parles pas', 'Tu ne pas parles', 'Tu parles ne pas', 'Ne tu parles pas'],
            answer: 'Tu ne parles pas',
            explain: 'La pinza ne...pas rodea al verbo: "Tu ne parles pas français."',
          },
          {
            scene: 'Elena habla de sus hábitos',
            lines: [['Elena', 'Je ___ de café. (boire → present: bois)']],
            options: ['ne bois pas', 'bois ne pas', 'ne pas bois', 'pas ne bois'],
            answer: 'ne bois pas',
            explain: 'ne + verbo + pas: "Je ne bois pas de café."',
          },
          {
            scene: 'Ana describe su apartamento',
            lines: [['Ana', 'Il ___ de télévision ici. (y avoir → il y a)']],
            options: ["n'y a pas", "ne y a pas", "n'a pas y", "pas y a"],
            answer: "n'y a pas",
            explain: 'Con "il y a": il n\'y a pas → "Il n\'y a pas de télévision ici."',
          },
          {
            scene: 'Marco y Sofia en el café',
            lines: [['Marco', 'Elle ___ viande. (manger → mange)']],
            options: ['ne mange pas de', 'ne mange pas une', 'ne pas mange de', 'mange ne pas de'],
            answer: 'ne mange pas de',
            explain: 'En negativa, el artículo "de la" → "de": elle ne mange pas de viande.',
          },
          {
            scene: 'Diego explica su rutina',
            lines: [['Diego', 'Je ___ fatigué. (être → suis)']],
            options: ['ne suis pas', 'ne pas suis', 'suis ne pas', 'pas ne suis'],
            answer: 'ne suis pas',
            explain: 'Con être: "Je ne suis pas fatigué." El artículo no cambia con être.',
          },
          {
            scene: 'Lina habla con Carlos',
            lines: [['Lina', 'Nous ___ à Paris. (habiter → habitons)']],
            options: ["n'habitons pas", "ne habitons pas", "n'habitons pas de", 'habitons ne pas'],
            answer: "n'habitons pas",
            explain: 'Ante vocal: ne → n\'. "Nous n\'habitons pas à Paris."',
          },
          {
            scene: 'Sofia describe a su familia',
            lines: [['Sofia', 'Mon frère ___ de voiture. (avoir → a)']],
            options: ["n'a pas de", "ne a pas de", "n'a pas une", "n'a pas un"],
            answer: "n'a pas de",
            explain: 'Ante vocal: n\'. Un → pas de: "mon frère n\'a pas de voiture."',
          },
          {
            scene: 'Elena y Marco hablan de música',
            lines: [['Marco', 'Ils ___ de musique classique. (écouter → écoutent)']],
            options: ["n'écoutent pas", 'ne écoutent pas', "n'écoutent pas de", 'pas écoutent ne'],
            answer: "n'écoutent pas",
            explain: '"Ils n\'écoutent pas de musique classique." (musique classique: de la → de en negativa)',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa las dos partes de la negación (ne/n\' y pas).',
        type: 'dual',
        items: [
          {
            scene: 'Carlos escribe un email a Diego',
            lines: [['Carlos', 'Je [[0]] parle [[1]] anglais, seulement espagnol.']],
            blanks: [
              { options: ['ne', "n'", 'pas', 'non'], answer: 'ne', explain: '"Ne" antes de un verbo que empieza por consonante.' },
              { options: ['pas', 'ne', 'non', 'de'], answer: 'pas', explain: '"Pas" después del verbo completa la negación.' },
            ],
          },
          {
            scene: 'Ana explica a Elena',
            lines: [['Ana', 'Elle [[0]] aime [[1]] les légumes.']],
            blanks: [
              { options: ["n'", 'ne', 'pas', 'non'], answer: "n'", explain: '"N\'" ante vocal (aimer empieza por vocal).' },
              { options: ['pas', 'ne', 'non', 'de'], answer: 'pas', explain: '"Pas" después del verbo.' },
            ],
          },
          {
            scene: 'Diego y Marco en clase',
            lines: [['Diego', 'Nous [[0]] avons [[1]] de temps ce soir.']],
            blanks: [
              { options: ["n'", 'ne', 'pas', 'non'], answer: "n'", explain: '"N\'" ante vocal (avons empieza por vocal).' },
              { options: ['pas', 'ne', 'non', 'de'], answer: 'pas', explain: '"Pas de" porque "du temps" → "pas de temps" en negativa.' },
            ],
          },
          {
            scene: 'Lina describe su ciudad',
            lines: [['Lina', 'Il [[0]] y a [[1]] de restaurant ici.']],
            blanks: [
              { options: ["n'", 'ne', 'pas', 'non'], answer: "n'", explain: '"Il n\'y a pas": n\' ante y (que actúa como vocal).' },
              { options: ['pas', 'ne', 'non', 'de'], answer: 'pas', explain: '"Pas de restaurant" — des → de en negativa.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Transforma al negativo',
        tag: 'Texto guiado',
        intro: 'Lee la descripción positiva de Ana y elige las formas negativas correctas para transformarla.',
        type: 'guidedText',
        scene: 'Ana tiene que corregir una descripción falsa de su vida. Todo lo afirmativo es incorrecto — transforma cada verbo al negativo.',
        text: 'La version incorrecte: Ana habite à Paris, elle parle anglais et elle a une voiture. Elle mange de la viande et elle aime le café.\n\nLa version correcte: Ana [[0]] à Paris — elle habite à Lyon. Elle [[1]] anglais — seulement espagnol. Elle [[2]] de voiture. Elle [[3]] de viande. Et elle [[4]] le café — elle préfère le thé.',
        blanks: [
          { options: ["n'habite pas", 'ne habite pas', "n'habite pas de", 'habite ne pas'], answer: "n'habite pas", explain: 'Ante vocal: n\'habite pas. Forma correcta de la negación.' },
          { options: ['ne parle pas', "n'parle pas", 'pas parle', 'ne pas parle'], answer: 'ne parle pas', explain: '"parler" comienza por consonante → ne parle pas.' },
          { options: ["n'a pas de", "n'a pas une", 'ne a pas de', "n'a pas"], answer: "n'a pas de", explain: '"avoir" + vocal → n\'. "Une voiture" → "pas de voiture" en negativa.' },
          { options: ['ne mange pas de', 'ne mange pas la', "n'mange pas de", 'ne pas mange de'], answer: 'ne mange pas de', explain: '"de la viande" → "pas de viande" en negativa.' },
          { options: ["n'aime pas", 'ne aime pas', "n'aime de pas", 'pas aime'], answer: "n'aime pas", explain: '"aimer" comienza por vocal → n\'aime pas.' },
          { options: ["n'aime pas", 'ne aime pas', "n'aime de pas", 'pas aime'], answer: "n'aime pas", explain: 'Extra blank — confirma n\'aime pas.' },
        ],
      },
      {
        id: 'l4',
        title: 'Escribe la negación',
        tag: 'Texto libre',
        intro: 'Escribe la forma negativa correcta del verbo indicado entre paréntesis.',
        type: 'freeText',
        scene: 'Marco describe lo que NO hace. Escribe la negación correcta para cada verbo.',
        text: 'Marco est végétarien : il [[0]] (manger) de viande. Il [[1]] (boire) non plus d\'alcool. Le matin, il [[2]] (regarder) la télé. Il [[3]] (avoir) de voiture — il prend le vélo. Et nous [[4]] (comprendre) pourquoi, parce que c\'est super pour la santé !',
        blanks: [
          { answer: 'ne mange pas', accepted: ['ne mange pas'], explain: '"Manger" (consonante) → ne mange pas. "De la viande" → pas de viande.' },
          { answer: 'ne boit pas', accepted: ['ne boit pas'], explain: '"Boire" → ne boit pas. Recuerda: ne + verbo conjugado + pas.' },
          { answer: 'ne regarde pas', accepted: ['ne regarde pas'], explain: '"Regarder" (consonante) → ne regarde pas.' },
          { answer: "n'a pas de", accepted: ["n'a pas de", "n'a pas"], explain: '"Avoir" (vocal) → n\'a pas de (voiture).' },
          { answer: 'ne comprenons pas', accepted: ['ne comprenons pas'], explain: '"Comprendre" → nous ne comprenons pas.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción negativa',
        tag: 'Producción',
        intro: 'Escribe oraciones negativas completas sobre los personajes.',
        type: 'write',
        items: [
          {
            scene: 'Elena habla de sus preferencias',
            prompt: 'Di dos cosas que Elena no hace: no habla alemán y no come carne.',
            answer: 'Elle ne parle pas allemand. Elle ne mange pas de viande.',
            accepted: ['ne parle pas', 'ne mange pas de'],
            explain: 'Ejemplo: Elle ne parle pas allemand. / Elle ne mange pas de viande.',
          },
          {
            scene: 'Diego describe su apartamento',
            prompt: 'Di que Diego no tiene coche y no vive en París.',
            answer: "Il n'a pas de voiture. Il n'habite pas à Paris.",
            accepted: ["n'a pas de", "n'habite pas"],
            explain: 'Vocal → n\'. "Une voiture" → "pas de voiture" en negativa.',
          },
          {
            scene: 'Carlos y Ana en clase',
            prompt: 'Di que Carlos y Ana no estudian el lunes y no beben café.',
            answer: 'Ils ne étudient pas le lundi. Ils ne boivent pas de café.',
            accepted: ["n'étudient pas", 'ne boivent pas de'],
            explain: 'Recuerda: n\' ante vocal (étudier). "Du café" → "pas de café" en negativa.',
          },
          {
            scene: 'Lina habla de su rutina',
            prompt: 'Escribe una oración sobre algo que tú no haces usando ne...pas.',
            answer: 'Je ne regarde pas la télévision le matin.',
            accepted: ['je ne', "je n'"],
            explain: 'Cualquier oración válida con je ne...pas o je n\'...pas.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: El perfil negativo',
        tag: 'Producción',
        intro: 'Misión: Escribe 3 oraciones sobre lo que NO haces — usa ne...pas, n\'...pas y pas de correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Tu perfil: hábitos que NO tienes',
            prompt: 'Escribe algo que no haces por la mañana (verbo -er, consonante).',
            answer: 'Je ne mange pas de sucre le matin.',
            accepted: ['je ne', 'ne mange pas', 'ne travaille pas', 'ne regarde pas', 'ne bois pas'],
            explain: 'Ejemplo: Je ne mange pas de pain. / Je ne travaille pas le matin.',
          },
          {
            scene: 'Tu perfil: cosas que no tienes',
            prompt: 'Di algo que no tienes (n\'avoir pas de...) — recuerda n\' ante vocal.',
            answer: "Je n'ai pas de voiture.",
            accepted: ["n'ai pas de", "n'ai pas"],
            explain: 'Avoir comienza por vocal → n\'ai pas de. Ejemplo: Je n\'ai pas de chien.',
          },
          {
            scene: 'Tu perfil: algo que no te gusta',
            prompt: 'Di algo que no te gusta (ne pas aimer/ne pas aimer quelque chose).',
            answer: "Je n'aime pas le café.",
            accepted: ["n'aime pas", 'ne aime pas'],
            explain: 'Aimer comienza por vocal → n\'aime pas. Ejemplo: Je n\'aime pas les épinards.',
          },
        ],
      },
    ],
  },
}

export default topic
