import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'relativsatze-b1',
  order: '03',
  color: '#c9a900',
  category: 'Satzstruktur',
  level: 'B1',
  title: 'Relativsätze en Alemán B1 — Oraciones de Relativo',
  shortTitle: 'Relativsätze',
  metaTitle: 'Relativsätze B1 — Oraciones relativas en alemán con der, die, das',
  description:
    'Los Relativsätze son oraciones subordinadas que describen o especifican un sustantivo. El pronombre relativo concuerda en género y número con el antecedente, pero su caso (Nom/Akk/Dat/Gen) lo determina su función dentro del Relativsatz.',
  lead: 'Aprende a construir oraciones de relativo en alemán: el pronombre relativo concuerda con el sustantivo en género y número, pero su caso lo decide su rol en la oración subordinada.',
  outcomes: [
    'Selecciona el pronombre relativo correcto en Nominativ, Akkusativ y Dativ',
    'Coloca el verbo al final del Relativsatz',
    'Acuerda el pronombre relativo con el antecedente en género y número',
    'Usa Relativsätze para dar información adicional sobre personas y cosas',
  ],

  guide: {
    goal: 'Combinar dos oraciones simples en una oración compleja usando el pronombre relativo correcto.',
    model: 'Der Mann, der dort steht, ist mein Lehrer. / Das Buch, das ich lese, ist interessant.',
    formula: 'Antecedente [, + Relativpronomen (Kasus) + ... + Verb]',
    decisions: [
      'El género del pronombre relativo = género del antecedente (der Mann → der/den/dem, die Frau → die/die/der, das Kind → das/das/dem).',
      'El caso del pronombre = su función en el Relativsatz: sujeto → Nominativ; objeto directo → Akkusativ; objeto indirecto → Dativ.',
      'El verbo del Relativsatz va SIEMPRE al final: "das Buch, das ich lese" — lese al final.',
      'El Relativsatz va inmediatamente después del antecedente, entre comas.',
      'Con preposición: la preposición precede al pronombre — "der Mann, mit dem ich arbeite".',
      'Plural: el pronombre relativo en Nom/Akk = die, en Dativ = denen.',
    ],
    table: [
      ['Kasus', 'Maskulinum / Neutrum', 'Femininum / Plural'],
      ['Nominativ', 'der / das', 'die / die'],
      ['Akkusativ', 'den / das', 'die / die'],
      ['Dativ', 'dem / dem', 'der / denen'],
    ],
    mistakes: [
      '"Der Mann, den ist nett" ❌ → "Der Mann, der nett ist" ✓ — el sujeto del Relativsatz usa Nominativ (der, nicht den).',
      '"Das Buch das ich lese" ❌ → "Das Buch, das ich lese" ✓ — siempre hay comas alrededor del Relativsatz.',
      '"Die Frau, die ich sprach" ❌ → "Die Frau, mit der ich sprach" ✓ — con preposición, la prep. precede al pronombre.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los Relativsätze en alemán?',
      paragraphs: [
        'Un Relativsatz es una oración subordinada que describe o especifica a un sustantivo (el antecedente). Funciona como un adjetivo extendido: en lugar de decir solo "el hombre", dices "el hombre que conocí ayer". En alemán los Relativsätze van entre comas y el verbo siempre al final.',
        'Ejemplo: "Ich kenne einen Mann. Er spricht fünf Sprachen." → "Ich kenne einen Mann, der fünf Sprachen spricht." El pronombre relativo "der" reemplaza a "er" y conecta las dos ideas.',
      ],
    },
    {
      heading: 'La tabla del pronombre relativo',
      paragraphs: [
        'El pronombre relativo se parece mucho al artículo definido, con algunas diferencias en Dativ plural (denen) y Genitiv (dessen/deren). Para B1 lo más importante son los casos Nom, Akk y Dat.',
        'Regla práctica: el género lo da el antecedente; el caso lo determina la función del pronombre dentro del Relativsatz (¿es el sujeto? ¿el objeto directo? ¿el objeto indirecto?).',
      ],
      table: [
        ['Kasus', 'mask.', 'fem.', 'neutr.', 'Pl.'],
        ['Nom.', 'der', 'die', 'das', 'die'],
        ['Akk.', 'den', 'die', 'das', 'die'],
        ['Dat.', 'dem', 'der', 'dem', 'denen'],
      ],
    },
    {
      heading: '¿Cómo se determina el caso del pronombre relativo en alemán?',
      paragraphs: [
        'Pregúntate: ¿qué función tiene el pronombre relativo dentro de SU oración? Si es el sujeto (hace la acción) → Nominativ. Si es el objeto directo (lo recibe la acción directamente) → Akkusativ. Si es el objeto indirecto → Dativ.',
        '"Der Mann, der anruft" — der Mann = sujeto de anrufen → Nominativ. "Der Mann, den ich anrufe" — ich = sujeto; den Mann = objeto directo → Akkusativ. "Der Mann, dem ich schreibe" — ich = sujeto; dem Mann = objeto indirecto → Dativ.',
      ],
    },
    {
      heading: '¿Cómo se forman los Relativsätze con preposición en alemán?',
      paragraphs: [
        'Cuando el pronombre relativo va precedido de una preposición, la preposición aparece delante del pronombre: "Die Stadt, in der ich wohne, ist schön." (La ciudad en la que vivo es bonita.) "Der Kollege, mit dem ich arbeite, ist sehr nett."',
        'El caso del pronombre lo determina la preposición: "in + Dativ" → in der (fem. Dat.); "mit + Dativ" → mit dem (mask. Dat.); "für + Akkusativ" → für den (mask. Akk.).',
      ],
    },
    {
      heading: 'Posición del verbo y puntuación',
      paragraphs: [
        'Regla fundamental: en todo Relativsatz el verbo conjugado va al final. Si hay un verbo modal o un Perfekt, el auxiliar va al final: "das Buch, das ich gelesen habe" (habe al final); "die Aufgabe, die ich lösen muss" (muss al final).',
        'La puntuación es obligatoria: el Relativsatz siempre va entre comas. Si está al final de la oración principal, la coma cierra antes del punto: "Ich mag das Buch, das du mir empfohlen hast."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Relativsätze B1: pronombre relativo en Nom/Akk/Dat, concordancia con antecedente, verbo al final.',
    graphicPrompt: 'Dos oraciones simples conectadas por flecha con el pronombre relativo como enlace.',
    scene: [
      ['Das ist die Frau, die hier arbeitet.', 'Esa es la mujer que trabaja aquí.'],
      ['Der Film, den ich gesehen habe, war toll.', 'La película que vi fue genial.'],
      ['Ich kenne einen Mann, dem das gehört.', 'Conozco a un hombre al que le pertenece eso.'],
      ['Das Buch, das auf dem Tisch liegt, ist meins.', 'El libro que está sobre la mesa es mío.'],
      ['Die Studenten, die Deutsch lernen, sind fleißig.', 'Los estudiantes que aprenden alemán son trabajadores.'],
      ['Das ist das Café, in dem wir uns kennengelernt haben.', 'Ese es el café en el que nos conocimos.'],
      ['Der Kollege, mit dem ich arbeite, heißt Thomas.', 'El compañero con el que trabajo se llama Thomas.'],
      ['Sie hat eine Idee, die ich gut finde.', 'Ella tiene una idea que me parece buena.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['Relativpronomen Nominativ', 'Relativpronomen Akkusativ', 'Relativpronomen Dativ', 'Verb am Ende'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pronombre relativo',
        tag: 'Opción múltiple',
        intro: 'Selecciona el pronombre relativo correcto según el género y caso.',
        type: 'choice',
        items: [
          {
            scene: 'Nominativ masculino',
            lines: [['', 'Das ist der Lehrer, ___ sehr gut erklärt.']],
            options: ['der', 'den', 'dem', 'die'],
            answer: 'der',
            explain: 'Antecedente: der Lehrer (mask.). Función: sujeto de "erklärt" → Nominativ mask. = der.',
          },
          {
            scene: 'Akkusativ masculino',
            lines: [['', 'Wo ist der Schlüssel, ___ ich gesucht habe?']],
            options: ['den', 'der', 'dem', 'das'],
            answer: 'den',
            explain: 'Antecedente: der Schlüssel (mask.). Función: objeto directo de "gesucht" → Akkusativ mask. = den.',
          },
          {
            scene: 'Nominativ femenino',
            lines: [['', 'Die Frau, ___ neben mir sitzt, ist Ärztin.']],
            options: ['die', 'der', 'den', 'das'],
            answer: 'die',
            explain: 'Antecedente: die Frau (fem.). Función: sujeto de "sitzt" → Nominativ fem. = die.',
          },
          {
            scene: 'Neutrum Nominativ',
            lines: [['', 'Das Kind, ___ dort spielt, ist meine Nichte.']],
            options: ['das', 'die', 'der', 'den'],
            answer: 'das',
            explain: 'Antecedente: das Kind (neutr.). Función: sujeto → Nominativ neutr. = das.',
          },
          {
            scene: 'Dativ feminino',
            lines: [['', 'Die Kollegin, ___ ich geholfen habe, heißt Lisa.']],
            options: ['der', 'die', 'den', 'dem'],
            answer: 'der',
            explain: 'Antecedente: die Kollegin (fem.). "helfen" rige Dativ → Dativ fem. = der.',
          },
          {
            scene: 'Plural Nominativ',
            lines: [['', 'Die Studenten, ___ Deutsch lernen, kommen aus aller Welt.']],
            options: ['die', 'der', 'den', 'denen'],
            answer: 'die',
            explain: 'Antecedente plural. Función: sujeto → Nominativ plural = die.',
          },
          {
            scene: 'Dativ masculino',
            lines: [['', 'Das ist der Mann, ___ ich das Buch gegeben habe.']],
            options: ['dem', 'den', 'der', 'die'],
            answer: 'dem',
            explain: 'Antecedente: der Mann (mask.). "gegeben" + indirektes Objekt → Dativ mask. = dem.',
          },
          {
            scene: 'Con preposición',
            lines: [['', 'Das ist die Stadt, in ___ ich geboren bin.']],
            options: ['der', 'die', 'den', 'dem'],
            answer: 'der',
            explain: '"in + Dativ" con antecedente femenino (die Stadt) → in der.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Conecta las oraciones',
        tag: '2 espacios',
        intro: 'Completa el Relativsatz con el pronombre relativo correcto y el verbo al final.',
        type: 'dual',
        items: [
          {
            scene: 'Describiendo a alguien',
            lines: [['', 'Das ist die Lehrerin, [[0]] mir immer [[1]] (helfen – Präsens).']],
            blanks: [
              { options: ['die', 'der', 'den', 'das'], answer: 'die', explain: 'Antecedente: die Lehrerin (fem.). Sujeto del Relativsatz → Nom. fem. = die.' },
              { options: ['hilft', 'helft', 'helfen', 'hilfe'], answer: 'hilft', explain: 'El verbo va al final del Relativsatz. "helfen" → hilft (sie, 3. Pers. Sing.).' },
            ],
          },
          {
            scene: 'Un objeto perdido',
            lines: [['', 'Ich suche den Stift, [[0]] ich gestern [[1]] (kaufen – Perfekt).']],
            blanks: [
              { options: ['den', 'der', 'dem', 'das'], answer: 'den', explain: 'Antecedente: der Stift (mask.). Objeto directo de "gekauft" → Akk. mask. = den.' },
              { options: ['gekauft habe', 'habe gekauft', 'kaufte', 'kaufen'], answer: 'gekauft habe', explain: 'Perfekt am Ende des Relativsatzes: Partizip II + Hilfsverb am Ende. "habe" al final.' },
            ],
          },
          {
            scene: 'El vecino',
            lines: [['', 'Das ist der Nachbar, [[0]] wir jeden Tag [[1]] (sehen – Präsens).']],
            blanks: [
              { options: ['den', 'der', 'dem', 'die'], answer: 'den', explain: 'Antecedente: der Nachbar (mask.). Objeto directo de "sehen" → Akk. mask. = den.' },
              { options: ['sehen', 'seht', 'sieht', 'gesehen'], answer: 'sehen', explain: 'Verbo al final. Sujeto = wir → sehen (infinitiv? No: Präsens wir = sehen).' },
            ],
          },
          {
            scene: 'El café favorito',
            lines: [['', 'Das Café, in [[0]] wir uns treffen, [[1]] in der Stadtmitte.']],
            blanks: [
              { options: ['dem', 'der', 'den', 'die'], answer: 'dem', explain: '"in + Dativ". Antecedente: das Café (neutr.) → Dat. neutr. = dem. El Relativsatz es el medio (ort).' },
              { options: ['liegt', 'legt', 'liegen', 'liegt'], answer: 'liegt', explain: 'El verbo de la oración principal (no del Relativsatz): "liegt" (liegen, 3. Pers. Sing.).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un apartamento que buscar',
        tag: 'Texto guiado',
        intro: 'Elige el pronombre relativo correcto para completar el anuncio de un apartamento.',
        type: 'guidedText',
        scene: 'Anuncio de una persona que busca piso en Berlín.',
        text: 'Ich suche eine Wohnung, [[0]] nicht zu teuer ist. Sie soll in einem Viertel liegen, [[1]] gut mit der U-Bahn erreichbar ist. Ich brauche eine Küche, [[2]] ich kochen kann. Der Vermieter, [[3]] mir den Vertrag zeigt, soll freundlich sein. Ich habe Kollegen, [[4]] mir schon geholfen haben. Das Zimmer, [[5]] ich mieten will, muss hell sein. Außerdem möchte ich Nachbarn, [[6]] ich mich gut verstehe.',
        blanks: [
          { options: ['die', 'der', 'den', 'das'], answer: 'die', explain: 'Antecedente: eine Wohnung (fem.). Sujeto → Nom. fem. = die.' },
          { options: ['das', 'der', 'dem', 'die'], answer: 'das', explain: 'Antecedente: einem Viertel (neutr.). Sujeto → Nom. neutr. = das.' },
          { options: ['in der', 'in dem', 'in die', 'in das'], answer: 'in der', explain: '"in + Dativ". Antecedente: eine Küche (fem.) → Dat. fem. = in der.' },
          { options: ['der', 'dem', 'den', 'die'], answer: 'der', explain: 'Antecedente: der Vermieter (mask.). Objeto indirecto de "zeigt" → Dat. mask. = dem. ¡Ojo: dem, no der!' },
          { options: ['die', 'der', 'denen', 'den'], answer: 'die', explain: 'Antecedente: Kollegen (plural). Sujeto → Nom. Pl. = die.' },
          { options: ['das', 'die', 'den', 'dem'], answer: 'das', explain: 'Antecedente: das Zimmer (neutr.). Objeto directo → Akk. neutr. = das.' },
          { options: ['mit denen', 'mit den', 'mit die', 'mit dem'], answer: 'mit denen', explain: '"mit + Dativ". Antecedente plural → Dat. Pl. = denen. "mit denen".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los pronombres',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre relativo correcto (y la preposición si la hay).',
        type: 'freeText',
        scene: 'Completa con el pronombre relativo correcto.',
        text: 'Das ist der Film, [[0]] alle sehen wollen. (Nom. mask.) Ich kenne die Frau, [[1]] du getroffen hast. (Akk. fem.) Das ist das Buch, [[2]] ich dir empfohlen habe. (Akk. neutr.) Er hat Freunde, [[3]] er immer vertrauen kann. (Dat. Pl.) Das ist das Büro, [[4]] ich jeden Tag arbeite. (in + Dat. neutr.)',
        blanks: [
          { answer: 'den', accepted: ['den'], explain: 'Antecedente mask. (der Film). Objekt direkt → Akk. mask. = den.' },
          { answer: 'die', accepted: ['die'], explain: 'Antecedente fem. (die Frau). Objekt direkt → Akk. fem. = die.' },
          { answer: 'das', accepted: ['das'], explain: 'Antecedente neutr. (das Buch). Objekt direkt → Akk. neutr. = das.' },
          { answer: 'denen', accepted: ['denen'], explain: 'Plural. "vertrauen + Dativ" → Dat. Pl. = denen.' },
          { answer: 'in dem', accepted: ['in dem', 'im'], explain: '"in + Dativ". Antecedente neutr. (das Büro) → Dat. neutr. = dem. "in dem" (o abreviado: "im" solo en artículo, no en relativo).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Combina las oraciones',
        tag: 'Producción',
        intro: 'Combina las dos oraciones en una usando un Relativsatz.',
        type: 'write',
        items: [
          {
            scene: 'Nominativ masculino',
            prompt: 'Combina: "Das ist ein Mann. Er spricht sechs Sprachen."',
            answer: 'Das ist ein Mann, der sechs Sprachen spricht.',
            accepted: ['der sechs sprachen spricht', 'der 6 sprachen'],
            explain: 'der Mann (mask.) + sujeto → Nom. mask. = der. Verbo al final: spricht.',
          },
          {
            scene: 'Akkusativ femenino',
            prompt: 'Combina: "Wo ist die Tasche? Ich habe sie heute gekauft."',
            answer: 'Wo ist die Tasche, die ich heute gekauft habe?',
            accepted: ['die ich heute gekauft habe', 'die ich gekauft habe'],
            explain: 'die Tasche (fem.) + objeto directo → Akk. fem. = die. Verb al final: gekauft habe.',
          },
          {
            scene: 'Dativ con preposición',
            prompt: 'Combina: "Das ist die Firma. Ich arbeite bei ihr."',
            answer: 'Das ist die Firma, bei der ich arbeite.',
            accepted: ['bei der ich arbeite', 'in der ich arbeite'],
            explain: '"bei + Dativ". die Firma (fem.) → Dat. fem. = der. "bei der ich arbeite".',
          },
          {
            scene: 'Plural Nominativ',
            prompt: 'Combina: "Ich habe Freunde. Sie kommen aus Mexiko."',
            answer: 'Ich habe Freunde, die aus Mexiko kommen.',
            accepted: ['die aus mexiko kommen', 'die kommen aus mexiko'],
            explain: 'Plural. Sujeto → Nom. Pl. = die. Verbo al final: kommen.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Mi persona y mi lugar favoritos',
        tag: 'Producción libre',
        intro: 'Describe tu persona favorita y tu lugar favorito usando Relativsätze.',
        type: 'write',
        items: [
          {
            scene: 'Una persona que admiras',
            prompt: 'Describe a alguien que admiras usando un Relativsatz (en Nominativ: "...die/der...").',
            answer: 'Ich bewundere meinen Lehrer, der immer sehr geduldig erklärt.',
            accepted: ['der', 'die', 'das'],
            explain: 'Ej: Das ist ein Mensch, der sehr inspirierend ist. / Ich kenne eine Frau, die drei Sprachen spricht.',
          },
          {
            scene: 'Un lugar especial',
            prompt: 'Describe un lugar usando un Relativsatz con preposición (in dem / in der / auf dem).',
            answer: 'Das ist das Café, in dem ich gerne lese.',
            accepted: ['in dem', 'in der', 'auf dem', 'an dem', 'bei der'],
            explain: 'Ej: Das ist der Park, in dem ich jeden Morgen jogge. / Das ist die Stadt, in der ich aufgewachsen bin.',
          },
          {
            scene: 'Una cosa que valoras',
            prompt: 'Describe un objeto o cosa que te importa usando Akkusativ (den/die/das).',
            answer: 'Das ist das Buch, das ich am liebsten lese.',
            accepted: ['den', 'die', 'das'],
            explain: 'Ej: Das ist der Film, den ich nie vergessen werde. / Das ist ein Lied, das ich jeden Tag höre.',
          },
        ],
      },
    ],
  },
}

export default topic
