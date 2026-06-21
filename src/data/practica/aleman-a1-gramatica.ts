// Currículo de Gramática — Alemán A1
// Cada tema es su propia URL indexable: /practica/aleman/a1/gramatica/<slug>
// Profundidad de filólogo + contraste español↔alemán.

import type { GrammarTopic } from './grammar-types';
import { findTopic, topicNav } from './grammar-types';
export { GRAMMAR_COLOR } from './grammar-types';
export type { GQItem, GrammarTopic } from './grammar-types';

export const TOPICS: GrammarTopic[] = [
  {
    slug: 'articulos-der-die-das',
    order: 1,
    title: 'Los artículos definidos y el género en alemán (der, die, das)',
    shortTitle: 'Artículos der / die / das',
    icon: '📘',
    seoTitle: 'Artículos en alemán (der, die, das): el género y ejercicios | A1',
    seoDescription:
      'Los artículos definidos en alemán: der (masculino), die (femenino), das (neutro). Los tres géneros, por qué no coinciden con el español y cómo aprenderlos. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['artículos en alemán', 'der die das', 'género en alemán', 'der die das explicación a1'],
    intro: [
      'El alemán tiene TRES géneros, no dos: masculino (der), femenino (die) y neutro (das). El neutro es la gran novedad para el hispanohablante, porque no existe en español. "der Mann" (el hombre), "die Frau" (la mujer), "das Kind" (el niño/la criatura).',
      'El problema es que el género casi nunca coincide con el español y muchas veces parece ilógico: "das Mädchen" (la chica) es NEUTRO, "die Sonne" (el sol) es femenino, "der Mond" (la luna) es masculino. No te fíes del español ni de la lógica.',
      'La consecuencia práctica: en alemán SIEMPRE se aprende el sustantivo con su artículo, como una sola palabra ("das Haus", no solo "Haus"), porque ese artículo cambiará de forma según el caso (lo verás en el tema del acusativo). Además, todos los sustantivos se escriben con mayúscula.',
    ],
    sections: [
      {
        heading: 'Los tres géneros',
        body: [
          'der = masculino (der Tisch, der Hund), die = femenino (die Lampe, die Katze), das = neutro (das Buch, das Auto). En plural, TODOS usan "die" sin distinción de género.',
          'No hay una regla fiable de género; hay algunas pistas (palabras en -ung, -heit, -keit son femeninas; los diminutivos -chen/-lein son neutros: das Mädchen), pero lo seguro es memorizar.',
        ],
      },
      {
        heading: 'El género no coincide con el español',
        body: [
          'Casos típicos que confunden: das Mädchen (la chica, neutro por el diminutivo -chen), die Sonne (el sol, femenino), der Mond (la luna, masculino), das Wasser (el agua, neutro).',
          'Conclusión: nunca deduzcas el género del alemán a partir del español.',
        ],
      },
      {
        heading: 'Aprende el sustantivo con su artículo',
        body: [
          'Como el artículo cambia según el caso gramatical, no sirve de nada saber "Haus": hay que saber "das Haus". Apréndelos siempre juntos, idealmente con un color por género.',
          'Y recuerda: todos los sustantivos alemanes se escriben con mayúscula inicial (das Buch, die Stadt).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Artículos definidos (Nominativo)',
        headers: ['Género', 'Artículo', 'Ejemplo'],
        rows: [
          ['masculino', 'der', 'der Mann (el hombre)'],
          ['femenino', 'die', 'die Frau (la mujer)'],
          ['neutro', 'das', 'das Kind (el niño)'],
          ['plural (todos)', 'die', 'die Kinder (los niños)'],
        ],
      },
      {
        caption: 'El género engaña (español ≠ alemán)',
        headers: ['Español', 'Alemán', 'Género'],
        rows: [
          ['la chica', 'das Mädchen', 'neutro'],
          ['el sol', 'die Sonne', 'femenino'],
          ['la luna', 'der Mond', 'masculino'],
          ['el agua', 'das Wasser', 'neutro'],
        ],
      },
    ],
    examples: [
      { en: 'Der Mann ist groß.', es: 'El hombre es alto.', note: 'masculino → der.' },
      { en: 'Die Frau liest ein Buch.', es: 'La mujer lee un libro.', note: 'femenino → die.' },
      { en: 'Das Kind spielt.', es: 'El niño juega.', note: 'neutro → das.' },
      { en: 'Das Mädchen heißt Anna.', es: 'La chica se llama Anna.', note: '¡neutro! (-chen).' },
      { en: 'Die Bücher sind neu.', es: 'Los libros son nuevos.', note: 'plural → die.' },
      { en: 'Der Mond ist hell.', es: 'La luna está brillante.', note: '"Mond" es masculino.' },
    ],
    contrast: [
      { es: 'la chica', en: 'das Mädchen', note: 'neutro en alemán (por el diminutivo -chen).' },
      { es: 'el sol', en: 'die Sonne', note: 'femenino en alemán.' },
      { es: 'la luna', en: 'der Mond', note: 'masculino en alemán.' },
      { es: 'los niños', en: 'die Kinder', note: 'el plural siempre usa "die".' },
      { es: 'el libro', en: 'das Buch', note: 'neutro; se aprende como "das Buch".' },
    ],
    commonMistakes: [
      { wrong: 'die Mädchen (singular)', right: 'das Mädchen', note: '"Mädchen" es neutro → das.' },
      { wrong: 'der Sonne', right: 'die Sonne', note: '"Sonne" es femenino → die.' },
      { wrong: 'das buch', right: 'das Buch', note: 'Los sustantivos van con mayúscula.' },
      { wrong: 'das Kinder (plural)', right: 'die Kinder', note: 'El plural usa "die".' },
      { wrong: 'la Frau → "el Frau"', right: 'die Frau', note: '"Frau" es femenino → die.' },
    ],
    tip: 'Tres géneros: der (m), die (f), das (n); el plural siempre "die". El género no coincide con el español (das Mädchen, die Sonne). Aprende cada sustantivo con su artículo y en mayúscula.',
    questions: [
      { s: '___ Mann ist groß. (el hombre)', opts: ['Der', 'Die', 'Das'], a: 0, fb: '"Mann" masc. → "der".' },
      { s: '___ Frau liest. (la mujer)', opts: ['Der', 'Die', 'Das'], a: 1, fb: '"Frau" fem. → "die".' },
      { s: '___ Kind spielt. (el niño)', opts: ['Der', 'Die', 'Das'], a: 2, fb: '"Kind" neutro → "das".' },
      { s: '___ Mädchen heißt Anna.', opts: ['Der', 'Die', 'Das'], a: 2, fb: '"Mädchen" es neutro (-chen) → "das".' },
      { s: '___ Bücher sind neu. (los libros)', opts: ['Der', 'Die', 'Das'], a: 1, fb: 'plural → "die".' },
      { s: '___ Sonne ist hell. (el sol)', opts: ['Der', 'Die', 'Das'], a: 1, fb: '"Sonne" es femenino → "die".' },
      { s: '___ Buch ist interessant.', opts: ['Der', 'Die', 'Das'], a: 2, fb: '"Buch" neutro → "das".' },
      { s: '___ Mond ist hell. (la luna)', opts: ['Der', 'Die', 'Das'], a: 0, fb: '"Mond" es masculino → "der".' },
      { s: '___ Hund ist klein. (el perro)', opts: ['Der', 'Die', 'Das'], a: 0, fb: '"Hund" masc. → "der".' },
      { s: '¿Qué artículo usa el plural?', opts: ['der', 'die', 'das'], a: 1, fb: 'El plural siempre usa "die".' },
      { s: '¿Cuál es CORRECTA?', opts: ['die Mädchen (sing.)', 'das Mädchen', 'der Mädchen'], a: 1, fb: '"Mädchen" es neutro → "das".' },
      { s: '___ Lampe ist neu. (la lámpara)', opts: ['Der', 'Die', 'Das'], a: 1, fb: '"Lampe" fem. → "die".' },
      { s: '___ Auto ist schnell. (el carro)', opts: ['Der', 'Die', 'Das'], a: 2, fb: '"Auto" neutro → "das".' },
      { s: '¿Cómo se aprende un sustantivo alemán?', opts: ['solo la palabra', 'con su artículo (das Haus)', 'con la traducción'], a: 1, fb: 'Siempre con su artículo.' },
    ],
  },
  {
    slug: 'articulos-indefinidos-kein',
    order: 2,
    title: 'Los artículos indefinidos (ein, eine) y "kein" en alemán',
    shortTitle: 'ein / eine / kein',
    icon: '📙',
    seoTitle: 'Artículos indefinidos en alemán (ein, eine) y kein: ejercicios | A1',
    seoDescription:
      'Los artículos indefinidos en alemán: ein (masc./neutro), eine (fem.), y "kein" para negar sustantivos. Cómo decir "no tengo un…" en alemán. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['ein eine alemán', 'kein alemán', 'artículos indefinidos alemán', 'negar sustantivo alemán a1'],
    intro: [
      'El artículo indefinido alemán (un/una) tiene dos formas en el nominativo: "ein" para masculino y neutro (ein Mann, ein Kind) y "eine" para femenino (eine Frau). Fíjate en que masculino y neutro comparten la misma forma "ein".',
      'La gran novedad sin equivalente en español es "kein": sirve para NEGAR un sustantivo, es decir, para decir "ningún / no… un". Donde el español dice "no tengo un carro" o "no tengo carro", el alemán dice "Ich habe KEIN Auto".',
      '"kein" se usa cuando el sustantivo llevaría "ein" o ningún artículo; sigue las mismas terminaciones que "ein" (kein/keine). Para negar lo demás (verbos, adjetivos) se usa "nicht", que verás en otro tema.',
    ],
    sections: [
      {
        heading: 'ein y eine',
        body: [
          'ein = masculino y neutro (ein Tisch, ein Auto). eine = femenino (eine Lampe). En plural, el indefinido no existe: simplemente no se pone artículo ("Ich habe Bücher" = tengo libros).',
        ],
      },
      {
        heading: '"kein": negar un sustantivo',
        body: [
          '"kein/keine" niega sustantivos que llevarían "ein" o ningún artículo: "Ich habe ein Auto" → "Ich habe kein Auto"; "Ich habe Zeit" → "Ich habe keine Zeit".',
          'Es la forma natural y obligatoria; no se dice "nicht ein". "kein" sigue el género: kein (masc./neutro), keine (fem. y plural).',
        ],
      },
      {
        heading: 'kein o nicht',
        body: [
          'Usa "kein" para negar SUSTANTIVOS (kein Auto, keine Zeit). Usa "nicht" para negar verbos, adjetivos o frases enteras (Ich arbeite nicht, Das ist nicht gut).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'ein / eine / kein (Nominativo)',
        headers: ['Género', 'Indefinido', 'Negación (kein)'],
        rows: [
          ['masculino', 'ein Mann', 'kein Mann'],
          ['femenino', 'eine Frau', 'keine Frau'],
          ['neutro', 'ein Kind', 'kein Kind'],
          ['plural', '— (sin artículo)', 'keine Kinder'],
        ],
      },
    ],
    examples: [
      { en: 'Das ist ein Tisch.', es: 'Esto es una mesa.', note: 'masculino → ein.' },
      { en: 'Ich habe eine Schwester.', es: 'Tengo una hermana.', note: 'femenino → eine.' },
      { en: 'Das ist ein Auto.', es: 'Esto es un carro.', note: 'neutro → ein.' },
      { en: 'Ich habe kein Auto.', es: 'No tengo carro.', note: 'negar sustantivo → kein.' },
      { en: 'Ich habe keine Zeit.', es: 'No tengo tiempo.', note: '"Zeit" fem. → keine.' },
      { en: 'Wir haben keine Kinder.', es: 'No tenemos hijos.', note: 'plural → keine.' },
    ],
    contrast: [
      { es: 'una hermana', en: 'eine Schwester', note: 'femenino → eine.' },
      { es: 'un carro', en: 'ein Auto', note: 'neutro → ein (igual que masculino).' },
      { es: 'No tengo carro.', en: 'Ich habe kein Auto.', note: 'el alemán usa "kein" para negar el sustantivo.' },
      { es: 'No tengo tiempo.', en: 'Ich habe keine Zeit.', note: '"kein" fem. → "keine".' },
      { es: 'No tenemos hijos.', en: 'Wir haben keine Kinder.', note: 'plural → "keine".' },
    ],
    commonMistakes: [
      { wrong: 'eine Mann', right: 'ein Mann', note: 'masculino → "ein".' },
      { wrong: 'ein Frau', right: 'eine Frau', note: 'femenino → "eine".' },
      { wrong: 'Ich habe nicht ein Auto.', right: 'Ich habe kein Auto.', note: 'Para negar un sustantivo → "kein".' },
      { wrong: 'Ich habe nicht Zeit.', right: 'Ich habe keine Zeit.', note: 'Negar sustantivo → "keine".' },
      { wrong: 'Ich habe ein Bücher.', right: 'Ich habe Bücher.', note: 'El plural no lleva artículo indefinido.' },
    ],
    tip: '"ein" (masc./neutro), "eine" (fem.). Para NEGAR un sustantivo usa "kein/keine" (no "nicht ein"): "Ich habe kein Auto", "keine Zeit". Para verbos/adjetivos, usa "nicht".',
    questions: [
      { s: 'Das ist ___ Tisch. (un, masc.)', opts: ['ein', 'eine', 'kein'], a: 0, fb: 'masculino → "ein".' },
      { s: 'Ich habe ___ Schwester. (una, fem.)', opts: ['ein', 'eine', 'kein'], a: 1, fb: 'femenino → "eine".' },
      { s: 'Das ist ___ Auto. (un, neutro)', opts: ['ein', 'eine', 'einen'], a: 0, fb: 'neutro → "ein".' },
      { s: 'Ich habe ___ Auto. (no tengo)', opts: ['nicht ein', 'kein', 'keine'], a: 1, fb: 'negar sustantivo neutro → "kein".' },
      { s: 'Ich habe ___ Zeit. (no tengo tiempo)', opts: ['kein', 'keine', 'nicht'], a: 1, fb: '"Zeit" fem. → "keine".' },
      { s: 'Wir haben ___ Kinder. (no tenemos)', opts: ['kein', 'keine', 'nicht'], a: 1, fb: 'plural → "keine".' },
      { s: '___ negar un verbo se usa…', opts: ['kein', 'nicht', 'eine'], a: 1, fb: 'Verbos/adjetivos → "nicht".' },
      { s: 'Das ist ___ Frau. (una, fem.)', opts: ['ein', 'eine', 'einen'], a: 1, fb: 'femenino → "eine".' },
      { s: 'Ich habe ___ Hund. (no tengo, masc.)', opts: ['kein', 'keine', 'nicht'], a: 0, fb: '"Hund" masc. → "kein".' },
      { s: '¿Cuál es CORRECTA?', opts: ['eine Mann', 'ein Mann', 'einen Mann'], a: 1, fb: 'masculino (nominativo) → "ein Mann".' },
      { s: '¿Cómo se dice "No tengo carro"?', opts: ['Ich habe nicht ein Auto.', 'Ich habe kein Auto.', 'Ich habe nicht Auto.'], a: 1, fb: 'Negar sustantivo → "kein Auto".' },
      { s: 'Ich habe ___ Bücher. (tengo libros)', opts: ['ein', 'eine', '— (nada)'], a: 2, fb: 'El plural indefinido no lleva artículo.' },
      { s: 'Das ist ___ Lampe. (una)', opts: ['ein', 'eine', 'kein'], a: 1, fb: '"Lampe" fem. → "eine".' },
      { s: '¿"kein" o "nicht"? "Ich arbeite ___."', opts: ['kein', 'nicht'], a: 1, fb: 'Negar el verbo → "nicht".' },
    ],
  },
  {
    slug: 'plural-de-los-nombres',
    order: 3,
    title: 'El plural de los sustantivos en alemán',
    shortTitle: 'El plural de los nombres',
    icon: '🔢',
    seoTitle: 'El plural de los sustantivos en alemán: tipos (-e, -er, -en, -s) y ejercicios | A1',
    seoDescription:
      'Cómo se forma el plural en alemán: los cinco tipos (-e, -er, -(e)n, -s y sin cambio), el Umlaut y por qué todos usan "die". Ejemplos y ejercicios. Nivel A1.',
    keywords: ['plural en alemán', 'plural alemán -e -er -en -s', 'umlaut plural alemán', 'die plural alemán a1'],
    intro: [
      'El plural alemán no se forma simplemente añadiendo -s como en español: hay CINCO patrones distintos y a menudo aparece el Umlaut (los dos puntitos: a→ä, o→ö, u→ü). Por eso se aprende el plural junto con el sustantivo.',
      'Lo único constante y fácil es el artículo: en plural, TODOS los sustantivos usan "die", sin importar su género en singular. "der Tisch → die Tische", "das Buch → die Bücher", "die Frau → die Frauen".',
      'Los cinco tipos básicos: +e (der Tisch → die Tische), +er con Umlaut (das Kind → die Kinder, das Buch → die Bücher), +(e)n (die Frau → die Frauen), +s (das Auto → die Autos) y sin cambio (der Lehrer → die Lehrer).',
    ],
    sections: [
      {
        heading: 'El artículo del plural: siempre "die"',
        body: [
          'Aunque en singular sea der/die/das, en plural el artículo definido es siempre "die": die Tische, die Bücher, die Frauen. Eso simplifica al menos una cosa.',
        ],
      },
      {
        heading: 'Los cinco tipos de plural',
        body: [
          '+e (a menudo con Umlaut): der Tisch → die Tische, der Stuhl → die Stühle. +er (casi siempre con Umlaut): das Kind → die Kinder, das Buch → die Bücher. +(e)n: die Frau → die Frauen, die Blume → die Blumen.',
          '+s (palabras extranjeras y abreviadas): das Auto → die Autos, das Handy → die Handys. Sin cambio (masculinos en -er, -en, -el): der Lehrer → die Lehrer.',
        ],
      },
      {
        heading: 'El Umlaut',
        body: [
          'Muchos plurales añaden el Umlaut a la vocal de la raíz: a→ä, o→ö, u→ü. "der Apfel → die Äpfel", "die Mutter → die Mütter", "das Haus → die Häuser". Conviene memorizarlo con cada palabra.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Los cinco tipos de plural',
        headers: ['Tipo', 'Ejemplo', 'Plural'],
        rows: [
          ['+ e', 'der Tisch', 'die Tische'],
          ['+ er (+ Umlaut)', 'das Buch', 'die Bücher'],
          ['+ (e)n', 'die Frau', 'die Frauen'],
          ['+ s', 'das Auto', 'die Autos'],
          ['sin cambio', 'der Lehrer', 'die Lehrer'],
        ],
      },
    ],
    examples: [
      { en: 'der Tisch → die Tische', es: 'la mesa → las mesas', note: '+e.' },
      { en: 'das Buch → die Bücher', es: 'el libro → los libros', note: '+er + Umlaut.' },
      { en: 'die Frau → die Frauen', es: 'la mujer → las mujeres', note: '+en.' },
      { en: 'das Auto → die Autos', es: 'el carro → los carros', note: '+s.' },
      { en: 'der Lehrer → die Lehrer', es: 'el profesor → los profesores', note: 'sin cambio.' },
      { en: 'der Apfel → die Äpfel', es: 'la manzana → las manzanas', note: 'solo Umlaut.' },
    ],
    contrast: [
      { es: 'las mesas', en: 'die Tische', note: '+e, no "-s"; y el artículo es "die".' },
      { es: 'los libros', en: 'die Bücher', note: '+er con Umlaut (u→ü).' },
      { es: 'las mujeres', en: 'die Frauen', note: '+en.' },
      { es: 'los carros', en: 'die Autos', note: 'aquí sí +s (palabra extranjera).' },
      { es: 'los profesores', en: 'die Lehrer', note: 'sin cambio; el plural se ve en "die".' },
    ],
    commonMistakes: [
      { wrong: 'die Tischs', right: 'die Tische', note: '"Tisch" hace plural en -e.' },
      { wrong: 'die Buchs', right: 'die Bücher', note: '"Buch" → "Bücher" (+er + Umlaut).' },
      { wrong: 'das Tische (plural)', right: 'die Tische', note: 'El plural usa "die".' },
      { wrong: 'die Fraus', right: 'die Frauen', note: '"Frau" → "Frauen".' },
      { wrong: 'die Apfeln', right: 'die Äpfel', note: '"Apfel" → "Äpfel" (solo Umlaut).' },
    ],
    tip: 'El plural alemán tiene 5 tipos (-e, -er, -(e)n, -s, sin cambio) y a menudo Umlaut (Bücher, Äpfel). Lo único fijo: el artículo del plural siempre es "die". Apréndelo con cada palabra.',
    questions: [
      { s: 'Plural de "der Tisch": die ___.', opts: ['Tische', 'Tischs', 'Tischer'], a: 0, fb: '+e → "Tische".' },
      { s: 'Plural de "das Buch": die ___.', opts: ['Buchs', 'Bücher', 'Buchen'], a: 1, fb: '+er + Umlaut → "Bücher".' },
      { s: 'Plural de "die Frau": die ___.', opts: ['Fraus', 'Frauen', 'Fräue'], a: 1, fb: '+en → "Frauen".' },
      { s: 'Plural de "das Auto": die ___.', opts: ['Auten', 'Autos', 'Auter'], a: 1, fb: '+s → "Autos".' },
      { s: 'Plural de "der Lehrer": die ___.', opts: ['Lehrer', 'Lehrers', 'Lehreren'], a: 0, fb: 'sin cambio → "die Lehrer".' },
      { s: 'Plural de "das Kind": die ___.', opts: ['Kinds', 'Kinder', 'Kinden'], a: 1, fb: '+er → "Kinder".' },
      { s: 'Plural de "der Apfel": die ___.', opts: ['Apfeln', 'Äpfel', 'Apfels'], a: 1, fb: 'Umlaut → "Äpfel".' },
      { s: '¿Qué artículo usa el plural?', opts: ['der', 'die', 'das'], a: 1, fb: 'El plural siempre usa "die".' },
      { s: 'Plural de "die Blume": die ___.', opts: ['Blumes', 'Blumen', 'Blümer'], a: 1, fb: '+n → "Blumen".' },
      { s: 'Plural de "das Haus": die ___.', opts: ['Hausen', 'Häuser', 'Hauses'], a: 1, fb: '+er + Umlaut → "Häuser".' },
      { s: '¿Cuál es CORRECTA?', opts: ['das Tische', 'die Tische', 'der Tische'], a: 1, fb: 'El plural usa "die".' },
      { s: 'Plural de "die Mutter": die ___.', opts: ['Mutters', 'Mütter', 'Muttern'], a: 1, fb: 'Umlaut → "Mütter".' },
      { s: 'Plural de "das Handy": die ___.', opts: ['Handys', 'Handyer', 'Handyen'], a: 0, fb: '+s → "Handys".' },
      { s: '¿Cómo se forma el plural en alemán?', opts: ['siempre +s', 'cinco patrones distintos', 'siempre +en'], a: 1, fb: 'Cinco patrones, a menudo con Umlaut.' },
    ],
  },
  {
    slug: 'sein-haben',
    order: 4,
    title: 'Los verbos sein (ser/estar) y haben (tener) en presente',
    shortTitle: 'sein y haben',
    icon: '⚡',
    seoTitle: 'Verbos sein y haben en alemán (presente): conjugación y ejercicios | A1',
    seoDescription:
      'Los verbos sein (ser/estar) y haben (tener) en alemán: conjugación, la edad con "sein" (Ich bin 20) y expresiones con haben. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['sein haben alemán', 'conjugación sein haben', 'ich bin ich habe', 'edad con sein alemán a1'],
    intro: [
      '"sein" (ser/estar) y "haben" (tener) son los dos verbos más importantes del alemán y los más irregulares. Hay que memorizarlos sí o sí, porque aparecen en casi todas las frases.',
      '"sein": ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. "haben": ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.',
      'La diferencia que más sorprende al hispanohablante: la EDAD va con "sein", no con "haben". "Ich bin zwanzig (Jahre alt)" = "Tengo veinte años" (literalmente "soy veinte"). En cambio, el hambre sí va con "haben": "Ich habe Hunger" (tengo hambre), como en español.',
    ],
    sections: [
      {
        heading: 'Conjugación de sein',
        body: [
          'ich bin · du bist · er/sie/es ist · wir sind · ihr seid · sie/Sie sind. Como en español, "sein" cubre ser y estar: "Ich bin müde" (estoy cansado), "Ich bin Lehrer" (soy profesor).',
        ],
      },
      {
        heading: 'Conjugación de haben',
        body: [
          'ich habe · du hast · er/sie/es hat · wir haben · ihr habt · sie/Sie haben. Posesión: "Ich habe ein Auto". Expresiones: "Hunger/Durst haben" (tener hambre/sed), "Zeit haben" (tener tiempo).',
        ],
      },
      {
        heading: 'La edad: con sein, no con haben',
        body: [
          'Para la edad, el alemán usa "sein" (como el inglés "to be"): "Wie alt bist du? — Ich bin 25 (Jahre alt)". Decir "Ich habe 25 Jahre" es un error muy típico del hispanohablante.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'sein / haben (presente)',
        headers: ['Pronombre', 'sein', 'haben'],
        rows: [
          ['ich', 'bin', 'habe'],
          ['du', 'bist', 'hast'],
          ['er / sie / es', 'ist', 'hat'],
          ['wir', 'sind', 'haben'],
          ['ihr', 'seid', 'habt'],
          ['sie / Sie', 'sind', 'haben'],
        ],
      },
    ],
    examples: [
      { en: 'Ich bin Lehrer.', es: 'Soy profesor.', note: 'sein = ser.' },
      { en: 'Du bist müde.', es: 'Estás cansado.', note: 'sein = estar.' },
      { en: 'Ich bin zwanzig Jahre alt.', es: 'Tengo veinte años.', note: '¡la edad va con "sein"!' },
      { en: 'Ich habe ein Auto.', es: 'Tengo un carro.', note: 'haben = tener.' },
      { en: 'Ich habe Hunger.', es: 'Tengo hambre.', note: 'el hambre sí va con "haben".' },
      { en: 'Wir sind Freunde.', es: 'Somos amigos.', note: 'con "wir" → sind.' },
    ],
    contrast: [
      { es: 'Soy profesor.', en: 'Ich bin Lehrer.', note: 'sein = ser; profesión sin artículo.' },
      { es: 'Tengo 20 años.', en: 'Ich bin 20 (Jahre alt).', note: '¡la edad va con "sein", no con "haben"!' },
      { es: 'Tengo hambre.', en: 'Ich habe Hunger.', note: 'el hambre sí va con "haben".' },
      { es: 'Tengo un carro.', en: 'Ich habe ein Auto.', note: 'posesión → haben.' },
      { es: '¿Estás cansado?', en: 'Bist du müde?', note: 'estado → sein.' },
    ],
    commonMistakes: [
      { wrong: 'Ich habe 20 Jahre.', right: 'Ich bin 20 (Jahre alt).', note: 'La edad va con "sein".' },
      { wrong: 'Ich bin Hunger.', right: 'Ich habe Hunger.', note: 'El hambre va con "haben".' },
      { wrong: 'Du bin müde.', right: 'Du bist müde.', note: 'Con "du" → "bist".' },
      { wrong: 'Er habe ein Auto.', right: 'Er hat ein Auto.', note: 'Con "er" → "hat".' },
      { wrong: 'Wir ist Freunde.', right: 'Wir sind Freunde.', note: 'Con "wir" → "sind".' },
    ],
    tip: 'Memoriza sein (bin, bist, ist, sind, seid, sind) y haben (habe, hast, hat, haben, habt, haben). Clave: la EDAD va con "sein" (Ich bin 20), pero el hambre con "haben" (Ich habe Hunger).',
    questions: [
      { s: 'Ich ___ Lehrer. (sein)', opts: ['bin', 'bist', 'ist', 'sind'], a: 0, fb: 'Con "ich" → "bin".' },
      { s: 'Du ___ müde. (sein)', opts: ['bin', 'bist', 'ist', 'seid'], a: 1, fb: 'Con "du" → "bist".' },
      { s: 'Er ___ groß. (sein)', opts: ['bin', 'bist', 'ist', 'sind'], a: 2, fb: 'Con "er" → "ist".' },
      { s: 'Wir ___ Freunde. (sein)', opts: ['seid', 'sind', 'ist', 'bin'], a: 1, fb: 'Con "wir" → "sind".' },
      { s: 'Ich ___ ein Auto. (haben)', opts: ['habe', 'hast', 'hat', 'haben'], a: 0, fb: 'Con "ich" → "habe".' },
      { s: 'Du ___ Zeit? (haben)', opts: ['habe', 'hast', 'hat', 'habt'], a: 1, fb: 'Con "du" → "hast".' },
      { s: 'Sie ___ ein Kind. (haben, ella)', opts: ['habe', 'hast', 'hat', 'haben'], a: 2, fb: 'Con "sie" (ella) → "hat".' },
      { s: 'Ihr ___ Hunger? (haben)', opts: ['habt', 'hast', 'haben'], a: 0, fb: 'Con "ihr" → "habt".' },
      { s: '¿Cómo se dice "Tengo 20 años"?', opts: ['Ich habe 20 Jahre.', 'Ich bin 20 Jahre alt.', 'Ich habe 20 Jahre alt.'], a: 1, fb: 'La edad va con "sein": "Ich bin 20".' },
      { s: '¿Cómo se dice "Tengo hambre"?', opts: ['Ich bin Hunger.', 'Ich habe Hunger.', 'Ich bin hungrig... → "Ich habe Hunger"'], a: 1, fb: 'El hambre → "Ich habe Hunger".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Du bin müde.', 'Du bist müde.', 'Du ist müde.'], a: 1, fb: 'Con "du" → "bist".' },
      { s: 'Wie alt ___ du? (edad)', opts: ['hast', 'bist', 'habt'], a: 1, fb: 'La edad con "sein" → "bist".' },
      { s: 'Er ___ Hunger. (haben)', opts: ['habe', 'hast', 'hat'], a: 2, fb: 'Con "er" → "hat".' },
      { s: 'Sie ___ aus Berlin. (sein, ellos)', opts: ['ist', 'sind', 'seid'], a: 1, fb: 'Con "sie" (ellos) → "sind".' },
    ],
  },
  {
    slug: 'pronombres-personales',
    order: 5,
    title: 'Los pronombres personales en alemán (ich, du, er, sie, es…)',
    shortTitle: 'Pronombres personales',
    icon: '👤',
    seoTitle: 'Pronombres personales en alemán: du/Sie, er/sie/es y ejercicios | A1',
    seoDescription:
      'Los pronombres personales en alemán: ich, du, er, sie, es, wir, ihr, sie, Sie. La diferencia tú/usted (du/Sie), el "es" neutro y por qué el sujeto es obligatorio. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['pronombres personales alemán', 'du Sie diferencia', 'er sie es', 'pronombres alemán a1'],
    intro: [
      'Los pronombres personales sujeto del alemán son: ich (yo), du (tú), er (él), sie (ella), es (ello/neutro), wir (nosotros), ihr (vosotros), sie (ellos/ellas) y Sie (usted/ustedes, formal). A diferencia del español, el sujeto es OBLIGATORIO: no se puede omitir.',
      'La tercera persona del singular tiene tres pronombres por los tres géneros: "er" para masculino, "sie" para femenino y "es" para neutro. Y como el género es gramatical, "er/sie/es" sustituyen también a cosas: "Der Tisch? Er ist neu" (la mesa/él es nuevo).',
      'Cuidado con los varios "sie/Sie": "sie" (minúscula) puede ser "ella" o "ellos/ellas"; "Sie" (siempre con mayúscula) es el "usted/ustedes" formal. El verbo y el contexto los distinguen.',
    ],
    sections: [
      {
        heading: 'El sujeto es obligatorio',
        body: [
          'A diferencia del español, en alemán no se puede omitir el pronombre: no existe "spiele Fußball", hay que decir "Ich spiele Fußball". El sujeto siempre se expresa.',
        ],
      },
      {
        heading: 'er / sie / es y el género de las cosas',
        body: [
          'er = él (y cosas masculinas), sie = ella (y cosas femeninas), es = ello (cosas neutras). Como el género es gramatical: "Wo ist der Schlüssel? — Er ist hier" (¿dónde está la llave? — él/ella está aquí). Para nosotros suena raro decir "él" de una llave, pero en alemán se hace.',
        ],
      },
      {
        heading: 'du, ihr, Sie: tú, vosotros y usted',
        body: [
          '"du" = tú (informal, una persona). "ihr" = vosotros/ustedes (informal, varias personas). "Sie" (con mayúscula) = usted/ustedes (formal, una o varias personas). En la duda con desconocidos, usa "Sie".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Pronombres personales (Nominativo)',
        headers: ['Pronombre', 'Significado', 'Verbo (sein)'],
        rows: [
          ['ich', 'yo', 'ich bin'],
          ['du', 'tú (informal)', 'du bist'],
          ['er / sie / es', 'él / ella / ello', 'er ist'],
          ['wir', 'nosotros/as', 'wir sind'],
          ['ihr', 'vosotros (informal)', 'ihr seid'],
          ['sie / Sie', 'ellos / usted(es)', 'sie/Sie sind'],
        ],
      },
    ],
    examples: [
      { en: 'Ich spiele Fußball.', es: 'Juego al fútbol.', note: 'el sujeto "ich" es obligatorio.' },
      { en: 'Bist du müde?', es: '¿Estás cansado?', note: 'du = informal.' },
      { en: 'Sind Sie Herr Müller?', es: '¿Es usted el señor Müller?', note: '"Sie" formal.' },
      { en: 'Der Tisch? Er ist neu.', es: '¿La mesa? Es nueva.', note: 'Tisch es masc. → "er".' },
      { en: 'Das Kind? Es schläft.', es: '¿El niño? Está durmiendo.', note: 'Kind es neutro → "es".' },
      { en: 'Wir wohnen in Berlin.', es: 'Vivimos en Berlín.' },
    ],
    contrast: [
      { es: 'Juego al fútbol.', en: 'Ich spiele Fußball.', note: 'el sujeto no se omite.' },
      { es: '¿Es usted el Sr. Müller?', en: 'Sind Sie Herr Müller?', note: 'usted → "Sie".' },
      { es: '¿Estás cansado? (a un amigo)', en: 'Bist du müde?', note: 'informal → "du".' },
      { es: '¿La llave? Está aquí.', en: 'Der Schlüssel? Er ist hier.', note: '"Schlüssel" masc. → "er".' },
      { es: 'Vivimos en Berlín.', en: 'Wir wohnen in Berlin.', note: 'con "wir".' },
    ],
    commonMistakes: [
      { wrong: 'Spiele Fußball.', right: 'Ich spiele Fußball.', note: 'El sujeto es obligatorio en alemán.' },
      { wrong: 'Bist müde? (sin "du")', right: 'Bist du müde?', note: 'El pronombre no se omite.' },
      { wrong: 'sie Müller (formal)', right: 'Sie Müller', note: 'El "usted" formal va con mayúscula: "Sie".' },
      { wrong: 'Der Tisch? Es ist neu.', right: 'Der Tisch? Er ist neu.', note: '"Tisch" es masc. → "er".' },
      { wrong: 'Ihr ist müde.', right: 'Ihr seid müde.', note: 'Con "ihr" → "seid".' },
    ],
    tip: 'El sujeto NUNCA se omite en alemán. "er/sie/es" según los tres géneros (también para cosas). Y "du" = tú informal, "ihr" = vosotros, "Sie" (mayúscula) = usted formal.',
    questions: [
      { s: '___ spiele Fußball. (yo)', opts: ['Ich', 'Du', 'Er', 'Wir'], a: 0, fb: '"yo" → "ich".' },
      { s: '___ bist müde. (tú)', opts: ['Ich', 'Du', 'Er', 'Ihr'], a: 1, fb: '"tú" → "du".' },
      { s: 'Sind ___ Herr Müller? (usted)', opts: ['du', 'ihr', 'Sie', 'sie'], a: 2, fb: 'usted formal → "Sie".' },
      { s: 'Der Tisch? ___ ist neu.', opts: ['Er', 'Sie', 'Es'], a: 0, fb: '"Tisch" masc. → "er".' },
      { s: 'Das Kind? ___ schläft.', opts: ['Er', 'Sie', 'Es'], a: 2, fb: '"Kind" neutro → "es".' },
      { s: 'Die Lampe? ___ ist schön.', opts: ['Er', 'Sie', 'Es'], a: 1, fb: '"Lampe" fem. → "sie".' },
      { s: '___ wohnen in Berlin. (nosotros)', opts: ['Ich', 'Wir', 'Ihr'], a: 1, fb: '"nosotros" → "wir".' },
      { s: '___ seid Studenten. (vosotros)', opts: ['Du', 'Ihr', 'Sie'], a: 1, fb: '"vosotros" → "ihr".' },
      { s: '¿El sujeto es obligatorio en alemán?', opts: ['Sí, siempre', 'No, se puede omitir'], a: 0, fb: 'Sí, siempre se expresa.' },
      { s: '¿Cómo se dice "usted" formal?', opts: ['du', 'ihr', 'Sie (mayúscula)'], a: 2, fb: '"Sie" con mayúscula.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Spiele Fußball.', 'Ich spiele Fußball.', 'Mich spiele Fußball.'], a: 1, fb: 'El sujeto "ich" es obligatorio.' },
      { s: 'Der Hund? ___ ist klein.', opts: ['Er', 'Sie', 'Es'], a: 0, fb: '"Hund" masc. → "er".' },
      { s: '___ ist Lehrerin. (ella)', opts: ['Er', 'Sie', 'Es'], a: 1, fb: 'ella → "sie".' },
      { s: 'Para hablar a varios amigos uso…', opts: ['du', 'ihr', 'Sie'], a: 1, fb: 'informal plural → "ihr".' },
    ],
  },
  {
    slug: 'verbos-regulares-presente',
    order: 6,
    title: 'Los verbos regulares en presente en alemán (spielen, wohnen)',
    shortTitle: 'Verbos regulares (presente)',
    icon: '🗣️',
    seoTitle: 'Verbos regulares en presente en alemán: terminaciones y ejercicios | A1',
    seoDescription:
      'La conjugación de los verbos regulares en presente en alemán: -e, -st, -t, -en, -t, -en. La regla de "arbeiten" (du arbeitest) y la conjugación con Sie. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbos regulares alemán', 'presente alemán terminaciones', 'spielen wohnen conjugación', 'verbos alemán a1'],
    intro: [
      'La mayoría de los verbos alemanes son regulares en presente y siguen un patrón fijo. Se toma la raíz (el infinitivo sin -en: spielen → spiel-) y se añaden las terminaciones: -e, -st, -t, -en, -t, -en.',
      'Así, "spielen" (jugar) da: ich spiele, du spielst, er/sie/es spielt, wir spielen, ihr spielt, sie/Sie spielen. Fíjate en que "wir" y "sie/Sie" usan la forma del infinitivo (-en).',
      'Hay un pequeño ajuste de pronunciación: si la raíz termina en -t o -d (arbeiten, finden), se añade una -e antes de las terminaciones de "du", "er" e "ihr": du arbeitest, er arbeitet, ihr arbeitet.',
    ],
    sections: [
      {
        heading: 'Las terminaciones (-e, -st, -t, -en, -t, -en)',
        body: [
          'ich spiele · du spielst · er/sie/es spielt · wir spielen · ihr spielt · sie/Sie spielen. La raíz no cambia; solo cambia la terminación.',
          '"wir" y "sie/Sie" coinciden con el infinitivo: "wir spielen", "sie spielen".',
        ],
      },
      {
        heading: 'La regla de "arbeiten" (raíz en -t/-d)',
        body: [
          'Si la raíz termina en -t o -d, se intercala una "e" para poder pronunciarla: arbeiten → du arbeitest, er arbeitet, ihr arbeitet. Igual con "finden" (du findest), "warten" (du wartest).',
        ],
      },
      {
        heading: 'Posición del verbo (adelanto)',
        body: [
          'El verbo conjugado va en la SEGUNDA posición de la frase: "Ich spiele heute Fußball". Si empiezas por otra cosa, el verbo sigue en posición 2 y el sujeto va detrás: "Heute spiele ich Fußball". Lo trabajamos a fondo en el tema de orden de palabras.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'spielen (modelo regular)',
        headers: ['Pronombre', 'Forma', 'Terminación'],
        rows: [
          ['ich', 'spiele', '-e'],
          ['du', 'spielst', '-st'],
          ['er / sie / es', 'spielt', '-t'],
          ['wir', 'spielen', '-en'],
          ['ihr', 'spielt', '-t'],
          ['sie / Sie', 'spielen', '-en'],
        ],
      },
    ],
    examples: [
      { en: 'Ich spiele Fußball.', es: 'Juego al fútbol.' },
      { en: 'Du wohnst in Berlin.', es: 'Vives en Berlín.', note: 'du → -st.' },
      { en: 'Er lernt Deutsch.', es: 'Él aprende alemán.', note: 'er → -t.' },
      { en: 'Wir kommen aus Spanien.', es: 'Venimos de España.', note: 'wir → -en.' },
      { en: 'Du arbeitest viel.', es: 'Trabajas mucho.', note: 'raíz en -t → "arbeitest".' },
      { en: 'Ihr spielt gut.', es: 'Jugáis bien.', note: 'ihr → -t.' },
    ],
    contrast: [
      { es: 'Juego al fútbol.', en: 'Ich spiele Fußball.', note: 'terminación -e, como en español.' },
      { es: 'Vives en Berlín.', en: 'Du wohnst in Berlin.', note: 'du → -st.' },
      { es: 'Venimos de España.', en: 'Wir kommen aus Spanien.', note: 'wir → -en (= infinitivo).' },
      { es: 'Trabajas mucho.', en: 'Du arbeitest viel.', note: 'raíz en -t → se añade "e".' },
      { es: 'Jugáis bien.', en: 'Ihr spielt gut.', note: 'ihr → -t.' },
    ],
    commonMistakes: [
      { wrong: 'Du spielt Fußball.', right: 'Du spielst Fußball.', note: 'Con "du" → -st.' },
      { wrong: 'Du arbeitst', right: 'Du arbeitest', note: 'Raíz en -t → "arbeitest".' },
      { wrong: 'Wir spielt', right: 'Wir spielen', note: 'Con "wir" → -en.' },
      { wrong: 'Er spielen', right: 'Er spielt', note: 'Con "er" → -t.' },
      { wrong: 'Ich spielst', right: 'Ich spiele', note: 'Con "ich" → -e.' },
    ],
    tip: 'Raíz + terminaciones: -e, -st, -t, -en, -t, -en. "wir/sie/Sie" usan -en (= infinitivo). Si la raíz acaba en -t/-d, añade "e": du arbeitest, er arbeitet.',
    questions: [
      { s: 'Ich ___ Fußball. (spielen)', opts: ['spiele', 'spielst', 'spielt', 'spielen'], a: 0, fb: 'Con "ich" → "spiele".' },
      { s: 'Du ___ in Berlin. (wohnen)', opts: ['wohne', 'wohnst', 'wohnt'], a: 1, fb: 'Con "du" → "wohnst".' },
      { s: 'Er ___ Deutsch. (lernen)', opts: ['lerne', 'lernst', 'lernt'], a: 2, fb: 'Con "er" → "lernt".' },
      { s: 'Wir ___ aus Spanien. (kommen)', opts: ['komme', 'kommt', 'kommen'], a: 2, fb: 'Con "wir" → "kommen".' },
      { s: 'Ihr ___ gut. (spielen)', opts: ['spielt', 'spielst', 'spielen'], a: 0, fb: 'Con "ihr" → "spielt".' },
      { s: 'Sie ___ Deutsch. (lernen, ellos)', opts: ['lernt', 'lernen', 'lernst'], a: 1, fb: 'Con "sie" (ellos) → "lernen".' },
      { s: 'Du ___ viel. (arbeiten)', opts: ['arbeitst', 'arbeitest', 'arbeitet'], a: 1, fb: 'Raíz en -t → "arbeitest".' },
      { s: 'Er ___ viel. (arbeiten)', opts: ['arbeitt', 'arbeitet', 'arbeitst'], a: 1, fb: 'Raíz en -t → "arbeitet".' },
      { s: 'Ich ___ Musik. (hören)', opts: ['höre', 'hörst', 'hört'], a: 0, fb: 'Con "ich" → "höre".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Du spielt.', 'Du spielst.', 'Du spiele.'], a: 1, fb: 'Con "du" → "spielst".' },
      { s: '¿Qué terminación usan "wir" y "sie"?', opts: ['-t', '-en', '-st'], a: 1, fb: '-en (igual que el infinitivo).' },
      { s: 'Wir ___ Tennis. (spielen)', opts: ['spielt', 'spielen', 'spiele'], a: 1, fb: 'Con "wir" → "spielen".' },
      { s: 'Du ___ das Buch. (finden)', opts: ['findst', 'findest', 'findet'], a: 1, fb: 'Raíz en -d → "findest".' },
      { s: 'Er ___ in München. (wohnen)', opts: ['wohne', 'wohnst', 'wohnt'], a: 2, fb: 'Con "er" → "wohnt".' },
    ],
  },
  {
    slug: 'orden-de-palabras',
    order: 7,
    title: 'El orden de las palabras en alemán: el verbo en posición 2',
    shortTitle: 'Orden de palabras (verbo en 2)',
    icon: '🔀',
    seoTitle: 'El orden de las palabras en alemán (verbo en posición 2): explicación y ejercicios | A1',
    seoDescription:
      'La regla del verbo en segunda posición (V2) en alemán: cómo cambia el orden cuando empiezas por otro elemento (inversión) y la posición del tiempo y el lugar. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['orden de palabras alemán', 'verbo posición 2 alemán', 'inversión alemán', 'satzstellung V2 a1'],
    intro: [
      'El alemán tiene una regla de oro que no existe en español: en una frase afirmativa, el VERBO CONJUGADO ocupa siempre la SEGUNDA posición. Esto no significa "la segunda palabra", sino el segundo "bloque" o elemento de la frase.',
      'Si empiezas por el sujeto, todo parece normal: "Ich spiele heute Fußball" (Yo juego hoy al fútbol). Pero si empiezas por otra cosa (el tiempo, el lugar…), el verbo SIGUE en posición 2 y el sujeto pasa detrás: "Heute spiele ich Fußball". A esto se le llama inversión.',
      'Para el hispanohablante esto es nuevo: en español puedes decir "Hoy yo juego" sin mover el verbo, pero en alemán "Heute ich spiele" es un error. El verbo manda y siempre va segundo.',
    ],
    sections: [
      {
        heading: 'El verbo siempre en posición 2',
        body: [
          'Cuenta los "bloques": [Ich] [spiele] [heute] [Fußball] → el verbo "spiele" es el bloque 2. [Heute] [spiele] [ich] [Fußball] → otra vez "spiele" es el bloque 2, y "ich" pasa al 3.º.',
          'La regla vale para casi todas las frases afirmativas (Aussagesätze).',
        ],
      },
      {
        heading: 'La inversión',
        body: [
          'Cuando un elemento que no es el sujeto va primero (un complemento de tiempo, lugar, etc.), el sujeto se coloca DESPUÉS del verbo: "Morgen gehe ich ins Kino" (Mañana voy al cine), "In Berlin wohnt meine Schwester" (En Berlín vive mi hermana).',
        ],
      },
      {
        heading: 'El orden de los complementos: tiempo antes que lugar',
        body: [
          'Cuando hay varios complementos, el orden típico es TIEMPO antes que LUGAR (regla "TeKaMoLo": Temporal, Kausal, Modal, Lokal): "Ich fahre morgen nach Berlin" (Voy mañana a Berlín), no "Ich fahre nach Berlin morgen".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'El verbo en posición 2',
        headers: ['Posición 1', 'Posición 2 (verbo)', 'Resto'],
        rows: [
          ['Ich', 'spiele', 'heute Fußball'],
          ['Heute', 'spiele', 'ich Fußball'],
          ['Morgen', 'gehe', 'ich ins Kino'],
          ['In Berlin', 'wohnt', 'meine Schwester'],
        ],
      },
    ],
    examples: [
      { en: 'Ich spiele heute Fußball.', es: 'Hoy juego al fútbol.', note: 'sujeto primero → normal.' },
      { en: 'Heute spiele ich Fußball.', es: 'Hoy juego al fútbol.', note: 'tiempo primero → inversión.' },
      { en: 'Morgen gehe ich ins Kino.', es: 'Mañana voy al cine.', note: 'el sujeto va tras el verbo.' },
      { en: 'In Berlin wohnt meine Schwester.', es: 'En Berlín vive mi hermana.', note: 'lugar primero → inversión.' },
      { en: 'Ich fahre morgen nach Berlin.', es: 'Voy mañana a Berlín.', note: 'tiempo antes que lugar.' },
      { en: 'Am Wochenende arbeite ich nicht.', es: 'El fin de semana no trabajo.' },
    ],
    contrast: [
      { es: 'Hoy yo juego al fútbol.', en: 'Heute spiele ich Fußball.', note: 'el verbo va segundo; el sujeto, detrás.' },
      { es: 'Mañana voy al cine.', en: 'Morgen gehe ich ins Kino.', note: 'inversión: verbo antes del sujeto.' },
      { es: 'En Berlín vive mi hermana.', en: 'In Berlin wohnt meine Schwester.', note: 'verbo en posición 2.' },
      { es: 'Voy mañana a Berlín.', en: 'Ich fahre morgen nach Berlin.', note: 'tiempo (morgen) antes que lugar (nach Berlin).' },
      { es: 'El finde no trabajo.', en: 'Am Wochenende arbeite ich nicht.', note: 'inversión tras el complemento de tiempo.' },
    ],
    commonMistakes: [
      { wrong: 'Heute ich spiele Fußball.', right: 'Heute spiele ich Fußball.', note: 'El verbo debe ir en posición 2.' },
      { wrong: 'Morgen ich gehe ins Kino.', right: 'Morgen gehe ich ins Kino.', note: 'Inversión: verbo antes del sujeto.' },
      { wrong: 'In Berlin meine Schwester wohnt.', right: 'In Berlin wohnt meine Schwester.', note: 'Verbo en posición 2.' },
      { wrong: 'Ich fahre nach Berlin morgen.', right: 'Ich fahre morgen nach Berlin.', note: 'Tiempo antes que lugar.' },
      { wrong: 'Spiele ich heute Fußball. (afirmación)', right: 'Ich spiele heute Fußball.', note: 'En afirmación, el sujeto u otro elemento va primero.' },
    ],
    tip: 'Regla de oro: el VERBO CONJUGADO va siempre en la 2.ª posición. Si empiezas por el tiempo o el lugar, el sujeto pasa detrás del verbo (inversión): "Heute spiele ICH Fußball".',
    questions: [
      { s: 'Heute ___ ich Fußball. (spielen)', opts: ['spiele', 'ich spiele', 'spielen'], a: 0, fb: 'El verbo va en posición 2: "Heute spiele ich".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Heute ich spiele Fußball.', 'Heute spiele ich Fußball.', 'Spiele heute ich Fußball.'], a: 1, fb: 'Verbo en posición 2 + inversión.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Morgen ich gehe ins Kino.', 'Morgen gehe ich ins Kino.', 'Ich morgen gehe ins Kino.'], a: 1, fb: 'Inversión: "Morgen gehe ich".' },
      { s: 'In Berlin ___ meine Schwester. (wohnen)', opts: ['wohnt', 'meine Schwester wohnt', 'wohnen'], a: 0, fb: 'Verbo en posición 2: "In Berlin wohnt...".' },
      { s: '¿En qué posición va el verbo conjugado?', opts: ['Primera', 'Segunda', 'Última'], a: 1, fb: 'Siempre en la segunda posición.' },
      { s: '¿Cuál es CORRECTA? (tiempo y lugar)', opts: ['Ich fahre nach Berlin morgen.', 'Ich fahre morgen nach Berlin.', 'Ich morgen fahre nach Berlin.'], a: 1, fb: 'Tiempo antes que lugar.' },
      { s: 'Am Wochenende ___ ich nicht. (arbeiten)', opts: ['arbeite', 'ich arbeite', 'arbeiten'], a: 0, fb: 'Inversión: "Am Wochenende arbeite ich".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Jetzt ich lerne Deutsch.', 'Jetzt lerne ich Deutsch.', 'Lerne jetzt ich Deutsch.'], a: 1, fb: '"Jetzt lerne ich Deutsch".' },
      { s: 'Reordena: "ich / heute / arbeite / viel"', opts: ['Ich arbeite heute viel.', 'Ich heute arbeite viel.', 'Heute ich arbeite viel.'], a: 0, fb: 'Verbo en posición 2.' },
      { s: 'Reordena: "morgen / wir / kommen"', opts: ['Morgen wir kommen.', 'Morgen kommen wir.', 'Wir morgen kommen.'], a: 1, fb: 'Inversión: "Morgen kommen wir".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Heute spiele ich.', 'Heute ich spiele.', 'Ich heute spiele.'], a: 0, fb: 'Verbo segundo: "Heute spiele ich".' },
      { s: 'Am Montag ___ ich nach Hause. (gehen)', opts: ['gehe', 'ich gehe', 'gehen'], a: 0, fb: '"Am Montag gehe ich nach Hause".' },
      { s: '¿"morgen" o el lugar va primero entre los complementos?', opts: ['el lugar', 'el tiempo (morgen)'], a: 1, fb: 'Tiempo antes que lugar (TeKaMoLo).' },
      { s: 'Reordena: "in München / wohnt / mein Bruder"', opts: ['In München mein Bruder wohnt.', 'In München wohnt mein Bruder.', 'Wohnt in München mein Bruder.'], a: 1, fb: 'Verbo en posición 2.' },
    ],
  },
  {
    slug: 'negacion-nicht-kein',
    order: 8,
    title: 'La negación en alemán: nicht y kein',
    shortTitle: 'Negación (nicht / kein)',
    icon: '🚫',
    seoTitle: 'La negación en alemán (nicht y kein): cuándo usar cada una y ejercicios | A1',
    seoDescription:
      'La diferencia entre "nicht" y "kein" en alemán: "kein" niega sustantivos (kein Auto), "nicht" niega verbos, adjetivos y frases. Posición de "nicht". Ejemplos y ejercicios. Nivel A1.',
    keywords: ['negación alemán', 'nicht kein diferencia', 'cuándo usar nicht o kein', 'negar en alemán a1'],
    intro: [
      'El alemán tiene DOS palabras para negar y elegir bien entre ellas es uno de los puntos clave del A1: "kein" y "nicht". El español solo tiene "no", así que hay que aprender a repartir ese "no" en dos.',
      'Regla básica: usa "kein" para negar un SUSTANTIVO que llevaría "ein" o ningún artículo ("Ich habe kein Auto", "Ich habe keine Zeit"). Usa "nicht" para todo lo demás: verbos, adjetivos, adverbios y frases enteras ("Ich arbeite nicht", "Das ist nicht gut").',
      'La posición de "nicht" también importa: suele ir al final de la frase cuando niega todo el enunciado ("Ich verstehe das nicht"), pero va justo DELANTE del elemento que niega cuando niega solo una parte ("Ich komme nicht heute").',
    ],
    sections: [
      {
        heading: '"kein": negar sustantivos',
        body: [
          'Si el sustantivo llevaría "ein" o nada de artículo, se niega con "kein/keine": "Ich habe ein Auto" → "Ich habe kein Auto"; "Ich trinke Kaffee" → "Ich trinke keinen Kaffee" (acusativo).',
          'Sigue el género: kein (masc./neutro), keine (fem. y plural), y se declina como "ein".',
        ],
      },
      {
        heading: '"nicht": negar verbos, adjetivos y frases',
        body: [
          'Para negar el verbo o toda la frase: "Ich arbeite nicht" (no trabajo). Para negar un adjetivo o adverbio: "Das ist nicht gut", "Das Auto ist nicht teuer". Cuando el sustantivo lleva artículo DEFINIDO, también se usa "nicht": "Ich kenne den Mann nicht".',
        ],
      },
      {
        heading: 'La posición de "nicht"',
        body: [
          'Para negar toda la frase, "nicht" suele ir al final: "Ich verstehe das nicht". Para negar solo una parte, va justo antes de esa parte: "Ich komme nicht heute, sondern morgen" (no hoy, sino mañana).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'kein o nicht',
        headers: ['Qué niegas', 'Palabra', 'Ejemplo'],
        rows: [
          ['sustantivo con "ein"/sin artículo', 'kein', 'Ich habe kein Auto.'],
          ['verbo', 'nicht', 'Ich arbeite nicht.'],
          ['adjetivo / adverbio', 'nicht', 'Das ist nicht gut.'],
          ['sustantivo con artículo definido', 'nicht', 'Ich kenne den Mann nicht.'],
        ],
      },
    ],
    examples: [
      { en: 'Ich habe kein Auto.', es: 'No tengo carro.', note: 'sustantivo con "ein" → kein.' },
      { en: 'Ich habe keine Zeit.', es: 'No tengo tiempo.', note: 'fem. → keine.' },
      { en: 'Ich arbeite nicht.', es: 'No trabajo.', note: 'negar verbo → nicht.' },
      { en: 'Das ist nicht gut.', es: 'Esto no está bien.', note: 'negar adjetivo → nicht.' },
      { en: 'Ich kenne den Mann nicht.', es: 'No conozco al hombre.', note: 'artículo definido → nicht.' },
      { en: 'Ich trinke keinen Kaffee.', es: 'No tomo café.', note: 'sustantivo sin artículo → keinen (acus.).' },
    ],
    contrast: [
      { es: 'No tengo carro.', en: 'Ich habe kein Auto.', note: 'sustantivo con "ein" → "kein".' },
      { es: 'No trabajo.', en: 'Ich arbeite nicht.', note: 'verbo → "nicht".' },
      { es: 'No está bien.', en: 'Das ist nicht gut.', note: 'adjetivo → "nicht".' },
      { es: 'No tomo café.', en: 'Ich trinke keinen Kaffee.', note: 'sustantivo sin artículo → "keinen".' },
      { es: 'No conozco al hombre.', en: 'Ich kenne den Mann nicht.', note: 'artículo definido → "nicht".' },
    ],
    commonMistakes: [
      { wrong: 'Ich habe nicht ein Auto.', right: 'Ich habe kein Auto.', note: 'Sustantivo con "ein" → "kein".' },
      { wrong: 'Ich arbeite kein.', right: 'Ich arbeite nicht.', note: 'Negar un verbo → "nicht".' },
      { wrong: 'Das ist kein gut.', right: 'Das ist nicht gut.', note: 'Negar un adjetivo → "nicht".' },
      { wrong: 'Ich trinke nicht Kaffee.', right: 'Ich trinke keinen Kaffee.', note: 'Sustantivo sin artículo → "keinen".' },
      { wrong: 'Ich habe keine Zeit nicht.', right: 'Ich habe keine Zeit.', note: 'No se usan las dos a la vez.' },
    ],
    tip: '"kein" niega SUSTANTIVOS (con "ein" o sin artículo): kein Auto, keine Zeit. "nicht" niega verbos, adjetivos, frases y sustantivos con artículo definido: Ich arbeite nicht, das ist nicht gut.',
    questions: [
      { s: 'Ich habe ___ Auto. (no tengo)', opts: ['nicht', 'kein', 'keine'], a: 1, fb: 'sustantivo con "ein" → "kein".' },
      { s: 'Ich habe ___ Zeit. (no tengo)', opts: ['nicht', 'kein', 'keine'], a: 2, fb: '"Zeit" fem. → "keine".' },
      { s: 'Ich arbeite ___. (no trabajo)', opts: ['nicht', 'kein', 'keine'], a: 0, fb: 'negar verbo → "nicht".' },
      { s: 'Das ist ___ gut. (no está bien)', opts: ['nicht', 'kein', 'keine'], a: 0, fb: 'negar adjetivo → "nicht".' },
      { s: 'Ich kenne den Mann ___. (no conozco)', opts: ['nicht', 'kein', 'keinen'], a: 0, fb: 'artículo definido → "nicht".' },
      { s: 'Ich trinke ___ Kaffee. (no tomo)', opts: ['nicht', 'kein', 'keinen'], a: 2, fb: 'sustantivo sin artículo (acus. masc.) → "keinen".' },
      { s: 'Wir haben ___ Kinder. (no tenemos)', opts: ['nicht', 'kein', 'keine'], a: 2, fb: 'plural → "keine".' },
      { s: 'Das Auto ist ___ teuer. (no es caro)', opts: ['nicht', 'kein', 'keine'], a: 0, fb: 'adjetivo → "nicht".' },
      { s: '¿"kein" o "nicht"? Negar un sustantivo con "ein":', opts: ['nicht', 'kein'], a: 1, fb: 'Sustantivo con "ein" → "kein".' },
      { s: '¿"kein" o "nicht"? Negar un verbo:', opts: ['nicht', 'kein'], a: 0, fb: 'Verbo → "nicht".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Ich habe nicht ein Auto.', 'Ich habe kein Auto.', 'Ich habe nicht Auto.'], a: 1, fb: 'Sustantivo con "ein" → "kein Auto".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Das ist kein gut.', 'Das ist nicht gut.', 'Das ist keine gut.'], a: 1, fb: 'Adjetivo → "nicht gut".' },
      { s: 'Ich spreche ___ Deutsch. (no hablo)', opts: ['kein', 'nicht', 'keine'], a: 0, fb: 'Idioma sin artículo → "kein Deutsch".' },
      { s: 'Ich komme ___. (no vengo)', opts: ['kein', 'nicht', 'keine'], a: 1, fb: 'Negar verbo → "nicht".' },
    ],
  },
  {
    slug: 'preguntas',
    order: 9,
    title: 'Hacer preguntas en alemán (W-Fragen y preguntas de sí/no)',
    shortTitle: 'Las preguntas',
    icon: '❓',
    seoTitle: 'Hacer preguntas en alemán (W-Fragen, sí/no): explicación y ejercicios | A1',
    seoDescription:
      'Cómo preguntar en alemán: las preguntas con W (wer, was, wo, wann, wie, warum) y las preguntas de sí/no con inversión (el verbo primero). Ejemplos y ejercicios. Nivel A1.',
    keywords: ['preguntas en alemán', 'W-Fragen', 'wer was wo wann wie', 'preguntas si no alemán a1'],
    intro: [
      'En alemán hay dos tipos de preguntas y los dos colocan el verbo en una posición especial. Las "W-Fragen" (preguntas con palabra interrogativa) y las "Ja/Nein-Fragen" (preguntas de sí/no).',
      'En las W-Fragen, la palabra interrogativa va primero y el verbo SEGUNDO (la regla de siempre): "Wo wohnst du?", "Was machst du?", "Wann kommst du?". Las interrogativas más usadas: wer (quién), was (qué), wo (dónde), wann (cuándo), wie (cómo), warum (por qué), woher (de dónde).',
      'En las preguntas de sí/no, el VERBO va PRIMERO (inversión), antes del sujeto: "Wohnst du in Berlin?", "Hast du Zeit?", "Bist du müde?". Es como en inglés sin auxiliar: el verbo abre la pregunta.',
    ],
    sections: [
      {
        heading: 'W-Fragen: interrogativo + verbo en posición 2',
        body: [
          'La palabra W va primero y el verbo conjugado, segundo: "Wo [1] wohnst [2] du?", "Was [1] machst [2] du?". El sujeto va después del verbo.',
          'Interrogativas clave: wer, was, wo, woher, wohin, wann, wie, wie viel(e), warum.',
        ],
      },
      {
        heading: 'Ja/Nein-Fragen: verbo primero',
        body: [
          'Para preguntar sí/no, el verbo conjugado abre la frase: "Sprichst du Deutsch?", "Hast du ein Auto?", "Kommst du heute?". El sujeto va justo después del verbo.',
        ],
      },
      {
        heading: '"wie" en expresiones útiles',
        body: [
          '"wie" (cómo) aparece en fórmulas muy frecuentes del A1: "Wie heißt du?" (¿cómo te llamas?), "Wie geht\'s?" (¿cómo estás?), "Wie alt bist du?" (¿cuántos años tienes?), "Wie viel kostet das?" (¿cuánto cuesta?).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Palabras interrogativas (W-Fragen)',
        headers: ['Alemán', 'Español', 'Ejemplo'],
        rows: [
          ['wer', 'quién', 'Wer ist das?'],
          ['was', 'qué', 'Was machst du?'],
          ['wo', 'dónde', 'Wo wohnst du?'],
          ['wann', 'cuándo', 'Wann kommst du?'],
          ['wie', 'cómo', 'Wie heißt du?'],
          ['warum', 'por qué', 'Warum lernst du Deutsch?'],
        ],
      },
      {
        caption: 'Posición del verbo según el tipo',
        headers: ['Tipo', 'Estructura', 'Ejemplo'],
        rows: [
          ['W-Frage', 'W + verbo + sujeto', 'Wo wohnst du?'],
          ['Ja/Nein-Frage', 'verbo + sujeto', 'Wohnst du hier?'],
        ],
      },
    ],
    examples: [
      { en: 'Wo wohnst du?', es: '¿Dónde vives?', note: 'W-Frage: verbo en posición 2.' },
      { en: 'Was machst du?', es: '¿Qué haces?' },
      { en: 'Wie heißt du?', es: '¿Cómo te llamas?', note: 'fórmula con "wie".' },
      { en: 'Wann kommst du?', es: '¿Cuándo vienes?' },
      { en: 'Sprichst du Deutsch?', es: '¿Hablas alemán?', note: 'Ja/Nein: verbo primero.' },
      { en: 'Hast du Zeit?', es: '¿Tienes tiempo?', note: 'verbo primero.' },
    ],
    contrast: [
      { es: '¿Dónde vives?', en: 'Wo wohnst du?', note: 'W primero, verbo segundo.' },
      { es: '¿Cómo te llamas?', en: 'Wie heißt du?', note: 'fórmula fija con "wie".' },
      { es: '¿Hablas alemán?', en: 'Sprichst du Deutsch?', note: 'sí/no → verbo primero.' },
      { es: '¿Tienes tiempo?', en: 'Hast du Zeit?', note: 'verbo abre la pregunta.' },
      { es: '¿Cuántos años tienes?', en: 'Wie alt bist du?', note: 'la edad con "sein".' },
    ],
    commonMistakes: [
      { wrong: 'Wo du wohnst?', right: 'Wo wohnst du?', note: 'En la W-Frage, el verbo va en posición 2.' },
      { wrong: 'Du sprichst Deutsch? (escrito formal)', right: 'Sprichst du Deutsch?', note: 'En la pregunta de sí/no, el verbo va primero.' },
      { wrong: 'Was du machst?', right: 'Was machst du?', note: 'Verbo en posición 2.' },
      { wrong: 'Wie du heißt?', right: 'Wie heißt du?', note: 'Verbo en posición 2.' },
      { wrong: 'Hast Zeit du?', right: 'Hast du Zeit?', note: 'El sujeto va justo tras el verbo.' },
    ],
    tip: 'W-Fragen: palabra W + verbo (posición 2) + sujeto → "Wo wohnst du?". Preguntas de sí/no: el VERBO va primero → "Wohnst du hier?". Memoriza "Wie heißt du?", "Wie geht\'s?", "Wie alt bist du?".',
    questions: [
      { s: '___ wohnst du? (¿dónde?)', opts: ['Wo', 'Was', 'Wann', 'Wer'], a: 0, fb: '"wo" = dónde.' },
      { s: '___ machst du? (¿qué?)', opts: ['Wo', 'Was', 'Wann', 'Wer'], a: 1, fb: '"was" = qué.' },
      { s: '___ heißt du? (¿cómo?)', opts: ['Wie', 'Wo', 'Wer', 'Warum'], a: 0, fb: '"wie" = cómo.' },
      { s: '___ kommst du? (¿cuándo?)', opts: ['Wo', 'Wann', 'Wer', 'Wie'], a: 1, fb: '"wann" = cuándo.' },
      { s: '___ ist das? (¿quién?)', opts: ['Wer', 'Was', 'Wo'], a: 0, fb: '"wer" = quién.' },
      { s: '___ lernst du Deutsch? (¿por qué?)', opts: ['Warum', 'Wie', 'Wo'], a: 0, fb: '"warum" = por qué.' },
      { s: 'Pregunta sí/no: "___ du Deutsch?" (hablar)', opts: ['Sprichst', 'Du sprichst', 'Sprechen'], a: 0, fb: 'El verbo va primero: "Sprichst du Deutsch?".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Wo du wohnst?', 'Wo wohnst du?', 'Du wo wohnst?'], a: 1, fb: 'Verbo en posición 2: "Wo wohnst du?".' },
      { s: '¿Cuál es CORRECTA? (sí/no)', opts: ['Du hast Zeit?', 'Hast du Zeit?', 'Zeit hast du?'], a: 1, fb: 'El verbo abre la pregunta: "Hast du Zeit?".' },
      { s: '___ alt bist du? (la edad)', opts: ['Wie', 'Was', 'Wann'], a: 0, fb: '"Wie alt bist du?".' },
      { s: '¿Dónde va el verbo en una pregunta de sí/no?', opts: ['Al final', 'Primero', 'En posición 2'], a: 1, fb: 'Primero (inversión).' },
      { s: '___ kostet das? (¿cuánto, con wie)', opts: ['Wie viel', 'Was', 'Wer'], a: 0, fb: '"Wie viel kostet das?".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Was du machst?', 'Was machst du?', 'Du was machst?'], a: 1, fb: 'Verbo en posición 2.' },
      { s: 'Pregunta sí/no de "Du kommst heute": ___', opts: ['Kommst du heute?', 'Du kommst heute?', 'Heute du kommst?'], a: 0, fb: 'Verbo primero: "Kommst du heute?".' },
    ],
  },
  {
    slug: 'acusativo',
    order: 10,
    title: 'El acusativo en alemán (der → den)',
    shortTitle: 'El acusativo (der → den)',
    icon: '🎯',
    seoTitle: 'El acusativo en alemán (der → den, einen): explicación y ejercicios | A1',
    seoDescription:
      'El caso acusativo en alemán: cómo cambia el artículo del complemento directo (der → den, ein → einen). Solo el masculino cambia. Verbos comunes y ejemplos. Nivel A1.',
    keywords: ['acusativo alemán', 'der den', 'ein einen', 'caso acusativo alemán a1', 'akkusativ'],
    intro: [
      'El acusativo es el "caso" del COMPLEMENTO DIRECTO (la persona o cosa que recibe la acción). Lo nuevo para el hispanohablante es que en alemán el ARTÍCULO CAMBIA de forma según el caso: el español no hace eso.',
      'La gran simplificación del A1: en acusativo, SOLO el masculino cambia. "der" se convierte en "den" y "ein" en "einen". El femenino (die/eine), el neutro (das/ein) y el plural (die) NO cambian.',
      'Por eso: "Der Mann" (sujeto) pero "Ich sehe den Mann" (complemento directo). "Ein Apfel" pero "Ich esse einen Apfel". Memoriza la pareja der→den / ein→einen y tendrás el 90% del acusativo del A1.',
    ],
    sections: [
      {
        heading: 'Solo el masculino cambia',
        body: [
          'Nominativo → Acusativo: der → den, ein → einen, kein → keinen, mein → meinen. El femenino (die/eine), el neutro (das/ein) y el plural (die) se quedan igual.',
          'Por eso el truco es vigilar siempre los sustantivos masculinos cuando son complemento directo.',
        ],
      },
      {
        heading: 'Cuándo se usa el acusativo',
        body: [
          'Después de muchos verbos comunes que tienen complemento directo: haben (Ich habe einen Hund), sehen (Ich sehe den Film), kaufen (Ich kaufe einen Tisch), essen, trinken, brauchen, suchen, lieben.',
          'También tras algunas preposiciones (für, ohne, durch, gegen), pero en el A1 lo esencial es el complemento directo.',
        ],
      },
      {
        heading: 'Los pronombres también cambian',
        body: [
          'Los pronombres personales tienen forma de acusativo: ich → mich, du → dich, er → ihn, sie → sie, es → es, wir → uns, ihr → euch, sie/Sie → sie/Sie. "Ich sehe dich" (te veo), "Ich liebe ihn" (lo amo).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Nominativo → Acusativo (solo el masc. cambia)',
        headers: ['Género', 'Nominativo', 'Acusativo'],
        rows: [
          ['masculino', 'der / ein', 'den / einen'],
          ['femenino', 'die / eine', 'die / eine (igual)'],
          ['neutro', 'das / ein', 'das / ein (igual)'],
          ['plural', 'die', 'die (igual)'],
        ],
      },
      {
        caption: 'Pronombres en acusativo',
        headers: ['Nominativo', 'Acusativo'],
        rows: [
          ['ich / du', 'mich / dich'],
          ['er / sie / es', 'ihn / sie / es'],
          ['wir / ihr', 'uns / euch'],
        ],
      },
    ],
    examples: [
      { en: 'Ich sehe den Mann.', es: 'Veo al hombre.', note: 'masc. → den.' },
      { en: 'Ich esse einen Apfel.', es: 'Como una manzana.', note: 'ein → einen (masc.).' },
      { en: 'Ich habe eine Schwester.', es: 'Tengo una hermana.', note: 'fem. → eine (no cambia).' },
      { en: 'Ich kaufe ein Auto.', es: 'Compro un carro.', note: 'neutro → ein (no cambia).' },
      { en: 'Ich sehe dich.', es: 'Te veo.', note: 'du → dich.' },
      { en: 'Ich liebe ihn.', es: 'Lo amo.', note: 'er → ihn.' },
    ],
    contrast: [
      { es: 'Veo al hombre.', en: 'Ich sehe den Mann.', note: 'masc. complemento directo → "den".' },
      { es: 'Como una manzana.', en: 'Ich esse einen Apfel.', note: '"ein" masc. → "einen".' },
      { es: 'Tengo una hermana.', en: 'Ich habe eine Schwester.', note: 'fem. → "eine" (no cambia).' },
      { es: 'Te veo.', en: 'Ich sehe dich.', note: 'pronombre du → "dich".' },
      { es: 'Lo amo.', en: 'Ich liebe ihn.', note: 'pronombre er → "ihn".' },
    ],
    commonMistakes: [
      { wrong: 'Ich sehe der Mann.', right: 'Ich sehe den Mann.', note: 'Complemento directo masc. → "den".' },
      { wrong: 'Ich esse ein Apfel.', right: 'Ich esse einen Apfel.', note: '"ein" masc. en acusativo → "einen".' },
      { wrong: 'Ich habe einen Schwester.', right: 'Ich habe eine Schwester.', note: 'El femenino no cambia → "eine".' },
      { wrong: 'Ich sehe du.', right: 'Ich sehe dich.', note: 'Pronombre en acusativo → "dich".' },
      { wrong: 'Ich liebe er.', right: 'Ich liebe ihn.', note: '"er" en acusativo → "ihn".' },
    ],
    tip: 'En acusativo SOLO el masculino cambia: der → den, ein → einen. Femenino, neutro y plural no cambian. Y los pronombres: mich, dich, ihn, uns, euch.',
    questions: [
      { s: 'Ich sehe ___ Mann. (el hombre, masc.)', opts: ['der', 'den', 'das'], a: 1, fb: 'masc. complemento directo → "den".' },
      { s: 'Ich esse ___ Apfel. (una manzana, masc.)', opts: ['ein', 'einen', 'eine'], a: 1, fb: '"ein" masc. → "einen".' },
      { s: 'Ich habe ___ Schwester. (una hermana, fem.)', opts: ['einen', 'eine', 'ein'], a: 1, fb: 'fem. → "eine" (no cambia).' },
      { s: 'Ich kaufe ___ Auto. (un carro, neutro)', opts: ['einen', 'eine', 'ein'], a: 2, fb: 'neutro → "ein" (no cambia).' },
      { s: 'Ich sehe ___ Film. (la película, masc.)', opts: ['der', 'den', 'das'], a: 1, fb: 'masc. → "den".' },
      { s: 'Ich sehe ___. (te)', opts: ['du', 'dich', 'dir'], a: 1, fb: 'du → "dich".' },
      { s: 'Ich liebe ___. (lo, a él)', opts: ['er', 'ihn', 'ihm'], a: 1, fb: 'er → "ihn".' },
      { s: 'Ich brauche ___ Stuhl. (una silla, masc.)', opts: ['ein', 'einen', 'eine'], a: 1, fb: 'masc. → "einen".' },
      { s: '¿Qué género cambia en acusativo?', opts: ['Solo el masculino', 'Todos', 'Solo el femenino'], a: 0, fb: 'Solo el masculino.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Ich sehe der Mann.', 'Ich sehe den Mann.', 'Ich sehe dem Mann.'], a: 1, fb: 'Complemento directo masc. → "den".' },
      { s: 'Ich kaufe ___ Lampe. (una lámpara, fem.)', opts: ['einen', 'eine', 'ein'], a: 1, fb: 'fem. → "eine".' },
      { s: 'Er sieht ___. (nos)', opts: ['wir', 'uns', 'unser'], a: 1, fb: 'wir → "uns".' },
      { s: 'Ich trinke ___ Kaffee. (un café, masc.)', opts: ['ein', 'einen', 'eine'], a: 1, fb: 'masc. → "einen".' },
      { s: '¿Cómo se dice "Te veo"?', opts: ['Ich sehe du.', 'Ich sehe dich.', 'Ich sehe dir.'], a: 1, fb: '"Ich sehe dich".' },
    ],
  },
  {
    slug: 'posesivos',
    order: 11,
    title: 'Los artículos posesivos en alemán (mein, dein, sein…)',
    shortTitle: 'Posesivos (mein/dein)',
    icon: '🔐',
    seoTitle: 'Posesivos en alemán (mein, dein, sein, ihr): explicación y ejercicios | A1',
    seoDescription:
      'Los artículos posesivos en alemán: mein, dein, sein, ihr, unser, euer, Ihr. Cómo añaden -e en femenino y plural y por qué "sein/ihr" dependen del dueño. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['posesivos alemán', 'mein dein sein ihr', 'posesivos alemán a1', 'possessivartikel'],
    intro: [
      'Los posesivos alemanes (mein = mi, dein = tu, sein = su de él, ihr = su de ella, unser = nuestro, euer = vuestro, Ihr = su de usted) se comportan como el artículo "ein": por eso se llaman "ein-Wörter".',
      'Como "ein", llevan terminación según el género del objeto: nada en masculino y neutro, pero -e en femenino y en plural. "mein Vater" (mi padre, masc.), "mein Kind" (mi hijo, neutro), pero "meine Mutter" (mi madre, fem.) y "meine Eltern" (mis padres, pl.).',
      'Ojo con "sein" e "ihr", que como en inglés dependen del DUEÑO: "sein" = su (de él), "ihr" = su (de ella). "Sein Auto" = el carro de él; "ihr Auto" = el carro de ella. El español "su" no distingue, así que hay que pensar en quién posee.',
    ],
    sections: [
      {
        heading: 'Se comportan como "ein"',
        body: [
          'Sin terminación en masculino y neutro (nominativo): "mein Vater", "mein Haus". Con -e en femenino y plural: "meine Mutter", "meine Bücher".',
          'En acusativo, igual que "ein", solo el masculino añade -en: "Ich sehe meinen Vater".',
        ],
      },
      {
        heading: 'sein / ihr: depende del dueño',
        body: [
          '"sein" = su, de él; "ihr" = su, de ella. "Peter und sein Hund" (Peter y su perro); "Anna und ihr Hund" (Anna y su perro). El posesivo marca el género del poseedor, no del objeto.',
        ],
      },
      {
        heading: 'Las formas',
        body: [
          'mein (mi), dein (tu), sein (su de él), ihr (su de ella), unser (nuestro), euer (vuestro), ihr (su de ellos), Ihr (su de usted, con mayúscula). Todas añaden -e en femenino y plural.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Posesivos (Nominativo)',
        headers: ['Dueño', 'Masc./Neutro', 'Fem./Plural'],
        rows: [
          ['mi', 'mein', 'meine'],
          ['tu', 'dein', 'deine'],
          ['su (de él)', 'sein', 'seine'],
          ['su (de ella)', 'ihr', 'ihre'],
          ['nuestro', 'unser', 'unsere'],
          ['su (de usted)', 'Ihr', 'Ihre'],
        ],
      },
    ],
    examples: [
      { en: 'Das ist mein Vater.', es: 'Este es mi padre.', note: 'masc. → mein (sin -e).' },
      { en: 'Das ist meine Mutter.', es: 'Esta es mi madre.', note: 'fem. → meine.' },
      { en: 'Das sind meine Eltern.', es: 'Estos son mis padres.', note: 'plural → meine.' },
      { en: 'Peter und sein Hund.', es: 'Peter y su perro.', note: 'de él → sein.' },
      { en: 'Anna und ihr Hund.', es: 'Anna y su perro.', note: 'de ella → ihr.' },
      { en: 'Ich sehe meinen Bruder.', es: 'Veo a mi hermano.', note: 'acusativo masc. → meinen.' },
    ],
    contrast: [
      { es: 'mi padre', en: 'mein Vater', note: 'masc. → "mein" (sin -e).' },
      { es: 'mi madre', en: 'meine Mutter', note: 'fem. → "meine".' },
      { es: 'su perro (de él)', en: 'sein Hund', note: '"sein" = de él.' },
      { es: 'su perro (de ella)', en: 'ihr Hund', note: '"ihr" = de ella.' },
      { es: 'mis padres', en: 'meine Eltern', note: 'plural → "meine".' },
    ],
    commonMistakes: [
      { wrong: 'meine Vater', right: 'mein Vater', note: 'Masculino → "mein" (sin -e).' },
      { wrong: 'mein Mutter', right: 'meine Mutter', note: 'Femenino → "meine".' },
      { wrong: 'Anna und sein Hund.', right: 'Anna und ihr Hund.', note: 'La dueña (Anna) es mujer → "ihr".' },
      { wrong: 'Peter und ihr Hund.', right: 'Peter und sein Hund.', note: 'El dueño (Peter) es hombre → "sein".' },
      { wrong: 'Ich sehe mein Bruder.', right: 'Ich sehe meinen Bruder.', note: 'Acusativo masc. → "meinen".' },
    ],
    tip: 'Los posesivos van como "ein": sin -e en masc./neutro (mein Vater), con -e en fem./plural (meine Mutter). Y "sein/ihr" dependen del dueño: sein = de él, ihr = de ella.',
    questions: [
      { s: 'Das ist ___ Vater. (mi, masc.)', opts: ['mein', 'meine', 'meinen'], a: 0, fb: 'masc. → "mein".' },
      { s: 'Das ist ___ Mutter. (mi, fem.)', opts: ['mein', 'meine', 'meinen'], a: 1, fb: 'fem. → "meine".' },
      { s: 'Das sind ___ Eltern. (mis, plural)', opts: ['mein', 'meine', 'meinen'], a: 1, fb: 'plural → "meine".' },
      { s: 'Peter und ___ Hund. (su, de él)', opts: ['sein', 'ihr', 'seine'], a: 0, fb: 'de él → "sein".' },
      { s: 'Anna und ___ Hund. (su, de ella)', opts: ['sein', 'ihr', 'seine'], a: 1, fb: 'de ella → "ihr".' },
      { s: 'Das ist ___ Haus. (tu, neutro)', opts: ['dein', 'deine', 'deinen'], a: 0, fb: 'neutro → "dein".' },
      { s: 'Wo ist ___ Schwester? (tu, fem.)', opts: ['dein', 'deine', 'deinen'], a: 1, fb: 'fem. → "deine".' },
      { s: 'Ich sehe ___ Bruder. (mi, acusativo masc.)', opts: ['mein', 'meine', 'meinen'], a: 2, fb: 'acusativo masc. → "meinen".' },
      { s: '___ Auto ist neu. (nuestro, neutro)', opts: ['unser', 'unsere', 'unseren'], a: 0, fb: 'neutro → "unser".' },
      { s: '¿Cuál es CORRECTA?', opts: ['meine Vater', 'mein Vater', 'meinen Vater (nom.)'], a: 1, fb: 'masc. nominativo → "mein Vater".' },
      { s: '¿"sein" o "ihr"? "Maria und ___ Bruder."', opts: ['sein', 'ihr'], a: 1, fb: 'Maria (mujer) → "ihr".' },
      { s: '¿"sein" o "ihr"? "Tom und ___ Schwester."', opts: ['sein', 'ihr'], a: 0, fb: 'Tom (hombre) → "sein".' },
      { s: '___ Familie ist groß. (su, de usted)', opts: ['Ihr', 'Ihre', 'ihren'], a: 1, fb: 'fem. + formal → "Ihre".' },
      { s: 'Das sind ___ Bücher. (tus, plural)', opts: ['dein', 'deine', 'deinen'], a: 1, fb: 'plural → "deine".' },
    ],
  },
  {
    slug: 'verbos-modales',
    order: 12,
    title: 'Los verbos modales en alemán (können, müssen, möchten)',
    shortTitle: 'Verbos modales',
    icon: '🔧',
    seoTitle: 'Verbos modales en alemán (können, müssen, möchten): el infinitivo al final | A1',
    seoDescription:
      'Los verbos modales en alemán: können (poder), müssen (tener que), möchten (querer/gustaría). Cómo el verbo principal va en infinitivo al FINAL de la frase. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbos modales alemán', 'können müssen möchten', 'modalverben', 'infinitivo al final alemán a1'],
    intro: [
      'Los verbos modales expresan capacidad, obligación o deseo. Los más usados en A1 son: können (poder/saber), müssen (tener que/deber), möchten (querer/me gustaría), wollen (querer), dürfen (poder/tener permiso).',
      'Su gran particularidad alemana: el modal se conjuga en posición 2 y manda el verbo principal en INFINITIVO al FINAL de la frase. "Ich kann gut schwimmen" (Sé nadar bien) — "kann" segundo, "schwimmen" al final.',
      'Para el hispanohablante esto rompe el orden: donde el español dice "puedo nadar bien" (juntos), el alemán separa el modal y el infinitivo, dejando un "paréntesis" alrededor del resto de la frase: "Ich muss heute viel arbeiten".',
    ],
    sections: [
      {
        heading: 'El infinitivo va al final (Satzklammer)',
        body: [
          'El modal ocupa la posición 2 y el verbo principal, en infinitivo, cierra la frase: "Ich [kann] heute nicht [kommen]". A esto se le llama "paréntesis verbal" (Satzklammer).',
          'Todo lo demás (complementos de tiempo, lugar, objeto) va EN MEDIO, entre el modal y el infinitivo.',
        ],
      },
      {
        heading: 'Conjugación irregular en singular',
        body: [
          'Los modales cambian la vocal en el singular: können → ich kann, du kannst, er kann; müssen → ich muss, du musst, er muss. En plural vuelven a la raíz: wir können, wir müssen. "Ich/er" comparten forma (sin terminación).',
          '"möchten" es más regular: ich möchte, du möchtest, er möchte, wir möchten.',
        ],
      },
      {
        heading: 'Qué expresa cada uno',
        body: [
          'können = poder/saber (Ich kann schwimmen). müssen = tener que (Ich muss arbeiten). möchten = me gustaría/quiero (Ich möchte einen Kaffee). dürfen = tener permiso (Darf ich rauchen?). wollen = querer (Ich will nach Hause).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'können / müssen / möchten (presente)',
        headers: ['Pronombre', 'können', 'müssen', 'möchten'],
        rows: [
          ['ich', 'kann', 'muss', 'möchte'],
          ['du', 'kannst', 'musst', 'möchtest'],
          ['er / sie / es', 'kann', 'muss', 'möchte'],
          ['wir', 'können', 'müssen', 'möchten'],
          ['ihr', 'könnt', 'müsst', 'möchtet'],
          ['sie / Sie', 'können', 'müssen', 'möchten'],
        ],
      },
    ],
    examples: [
      { en: 'Ich kann gut schwimmen.', es: 'Sé nadar bien.', note: 'infinitivo "schwimmen" al final.' },
      { en: 'Du musst heute arbeiten.', es: 'Tienes que trabajar hoy.', note: '"arbeiten" al final.' },
      { en: 'Ich möchte einen Kaffee.', es: 'Quiero un café.', note: 'möchten + objeto.' },
      { en: 'Wir können morgen kommen.', es: 'Podemos venir mañana.', note: '"kommen" al final.' },
      { en: 'Darf ich rauchen?', es: '¿Puedo fumar?', note: 'dürfen = permiso.' },
      { en: 'Er muss viel lernen.', es: 'Él tiene que estudiar mucho.', note: '"lernen" al final.' },
    ],
    contrast: [
      { es: 'Sé nadar bien.', en: 'Ich kann gut schwimmen.', note: 'el infinitivo "schwimmen" va al final.' },
      { es: 'Tengo que trabajar.', en: 'Ich muss arbeiten.', note: 'müssen + infinitivo al final.' },
      { es: 'Quiero un café.', en: 'Ich möchte einen Kaffee.', note: '"möchte" cortés (= me gustaría).' },
      { es: 'Podemos venir mañana.', en: 'Wir können morgen kommen.', note: 'complementos en medio; "kommen" al final.' },
      { es: '¿Puedo fumar?', en: 'Darf ich rauchen?', note: 'dürfen = permiso; pregunta con verbo primero.' },
    ],
    commonMistakes: [
      { wrong: 'Ich kann schwimmen gut.', right: 'Ich kann gut schwimmen.', note: 'El infinitivo va al FINAL.' },
      { wrong: 'Ich muss arbeiten heute.', right: 'Ich muss heute arbeiten.', note: 'El complemento va en medio; el infinitivo, al final.' },
      { wrong: 'Du kann schwimmen.', right: 'Du kannst schwimmen.', note: 'Con "du" → "kannst".' },
      { wrong: 'Ich kann gut schwimme.', right: 'Ich kann gut schwimmen.', note: 'El verbo principal va en INFINITIVO.' },
      { wrong: 'Ich möchte ein Kaffee.', right: 'Ich möchte einen Kaffee.', note: 'Acusativo masc. → "einen".' },
    ],
    tip: 'El modal va en posición 2 y el verbo principal, en INFINITIVO, va al FINAL: "Ich muss heute viel arbeiten". Singular irregular: ich kann/muss, du kannst/musst.',
    questions: [
      { s: 'Ich ___ gut schwimmen. (können)', opts: ['kann', 'kannst', 'können'], a: 0, fb: 'Con "ich" → "kann".' },
      { s: 'Du ___ heute arbeiten. (müssen)', opts: ['muss', 'musst', 'müssen'], a: 1, fb: 'Con "du" → "musst".' },
      { s: 'Er ___ viel lernen. (müssen)', opts: ['muss', 'musst', 'müssen'], a: 0, fb: 'Con "er" → "muss".' },
      { s: 'Wir ___ morgen kommen. (können)', opts: ['kann', 'könnt', 'können'], a: 2, fb: 'Con "wir" → "können".' },
      { s: 'Ich ___ einen Kaffee. (möchten)', opts: ['möchte', 'möchtest', 'möchten'], a: 0, fb: 'Con "ich" → "möchte".' },
      { s: '¿Dónde va el verbo principal con un modal?', opts: ['En posición 2', 'En infinitivo al final', 'Justo tras el sujeto'], a: 1, fb: 'En infinitivo, al final.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Ich kann schwimmen gut.', 'Ich kann gut schwimmen.', 'Ich gut kann schwimmen.'], a: 1, fb: 'El infinitivo va al final.' },
      { s: 'Ihr ___ jetzt gehen. (können)', opts: ['kann', 'könnt', 'können'], a: 1, fb: 'Con "ihr" → "könnt".' },
      { s: '___ ich rauchen? (dürfen, permiso)', opts: ['Darf', 'Darfst', 'Dürfen'], a: 0, fb: 'Con "ich" → "Darf ich...?".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Du kann kommen.', 'Du kannst kommen.', 'Du kannst kommt.'], a: 1, fb: 'Con "du" → "kannst" + infinitivo.' },
      { s: 'Reordena: "ich / arbeiten / muss / heute"', opts: ['Ich muss heute arbeiten.', 'Ich muss arbeiten heute.', 'Ich arbeiten muss heute.'], a: 0, fb: 'Infinitivo al final.' },
      { s: 'Sie ___ gut Deutsch sprechen. (können, ella)', opts: ['kann', 'kannst', 'können'], a: 0, fb: 'Con "sie" (ella) → "kann".' },
      { s: 'Wir ___ heute lernen. (müssen)', opts: ['muss', 'müsst', 'müssen'], a: 2, fb: 'Con "wir" → "müssen".' },
      { s: '¿Cómo se dice "Quiero un café"?', opts: ['Ich möchte ein Kaffee.', 'Ich möchte einen Kaffee.', 'Ich kann einen Kaffee.'], a: 1, fb: '"möchte" + "einen Kaffee" (acus.).' },
    ],
  },
  {
    slug: 'verbos-separables',
    order: 13,
    title: 'Los verbos separables en alemán (aufstehen, einkaufen…)',
    shortTitle: 'Verbos separables',
    icon: '✂️',
    seoTitle: 'Verbos separables en alemán (aufstehen): cómo se separan y ejercicios | A1',
    seoDescription:
      'Los verbos separables en alemán: el prefijo (auf-, ein-, an-, mit-…) se separa y va al FINAL de la frase. "Ich stehe um 7 Uhr auf". Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbos separables alemán', 'trennbare verben', 'aufstehen einkaufen', 'prefijo separable alemán a1'],
    intro: [
      'Muchos verbos alemanes son "separables": llevan un prefijo (auf-, ein-, an-, mit-, fern-, zu-…) que en la frase se SEPARA del verbo y se manda al FINAL. Es algo que no existe en español y sorprende mucho al principio.',
      'Ejemplo clásico: "aufstehen" (levantarse). En la frase se parte: "Ich stehe um 7 Uhr AUF" (Me levanto a las 7). El verbo conjugado ("stehe") va en posición 2 y el prefijo ("auf") cierra la frase.',
      'En el diccionario el verbo aparece junto (aufstehen), pero al conjugarlo en presente se separa. Cómo saber si es separable: el prefijo suele ser una preposición o adverbio con acento (AUF-stehen, EIN-kaufen, MIT-kommen).',
    ],
    sections: [
      {
        heading: 'El prefijo se va al final',
        body: [
          'Conjuga el verbo en posición 2 y coloca el prefijo al final: "Ich kaufe im Supermarkt EIN" (compro en el súper), "Der Zug kommt um 8 Uhr AN" (el tren llega a las 8).',
          'Todo lo demás va en medio, entre el verbo y el prefijo.',
        ],
      },
      {
        heading: 'Verbos separables frecuentes (A1)',
        body: [
          'aufstehen (levantarse), einkaufen (hacer compras), anrufen (llamar por teléfono), mitkommen (venir con), fernsehen (ver la tele), aufmachen (abrir), zumachen (cerrar), anfangen (empezar), aussehen (parecer/tener aspecto).',
        ],
      },
      {
        heading: 'Con modal, no se separan',
        body: [
          'Si el verbo separable va con un verbo modal, NO se separa: vuelve a juntarse en infinitivo al final. "Ich muss früh aufstehen" (Tengo que levantarme temprano), no "Ich muss früh auf...stehen".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Cómo se separa (presente)',
        headers: ['Infinitivo', 'Frase', 'Prefijo'],
        rows: [
          ['aufstehen', 'Ich stehe um 7 Uhr …', 'auf'],
          ['einkaufen', 'Ich kaufe heute …', 'ein'],
          ['anrufen', 'Ich rufe dich später …', 'an'],
          ['mitkommen', 'Kommst du …?', 'mit'],
        ],
      },
    ],
    examples: [
      { en: 'Ich stehe um 7 Uhr auf.', es: 'Me levanto a las 7.', note: 'aufstehen → stehe … auf.' },
      { en: 'Ich kaufe im Supermarkt ein.', es: 'Compro en el supermercado.', note: 'einkaufen → kaufe … ein.' },
      { en: 'Ich rufe dich später an.', es: 'Te llamo más tarde.', note: 'anrufen → rufe … an.' },
      { en: 'Kommst du mit?', es: '¿Vienes (conmigo)?', note: 'mitkommen → kommst … mit.' },
      { en: 'Der Film fängt um 8 an.', es: 'La película empieza a las 8.', note: 'anfangen → fängt … an.' },
      { en: 'Ich muss früh aufstehen.', es: 'Tengo que levantarme temprano.', note: 'con modal NO se separa.' },
    ],
    contrast: [
      { es: 'Me levanto a las 7.', en: 'Ich stehe um 7 Uhr auf.', note: 'el prefijo "auf" se va al final.' },
      { es: 'Te llamo más tarde.', en: 'Ich rufe dich später an.', note: 'anrufen → "rufe … an".' },
      { es: '¿Vienes conmigo?', en: 'Kommst du mit?', note: 'mitkommen → "kommst … mit".' },
      { es: 'Hago las compras hoy.', en: 'Ich kaufe heute ein.', note: 'einkaufen → "kaufe … ein".' },
      { es: 'Tengo que levantarme temprano.', en: 'Ich muss früh aufstehen.', note: 'con modal, junto al final.' },
    ],
    commonMistakes: [
      { wrong: 'Ich aufstehe um 7 Uhr.', right: 'Ich stehe um 7 Uhr auf.', note: 'El prefijo "auf" va al final.' },
      { wrong: 'Ich einkaufe heute.', right: 'Ich kaufe heute ein.', note: '"ein" se separa y va al final.' },
      { wrong: 'Ich rufe an dich.', right: 'Ich rufe dich an.', note: 'El prefijo "an" cierra la frase.' },
      { wrong: 'Ich muss früh auf...stehe.', right: 'Ich muss früh aufstehen.', note: 'Con modal NO se separa.' },
      { wrong: 'Kommst mit du?', right: 'Kommst du mit?', note: 'Sujeto tras el verbo; "mit" al final.' },
    ],
    tip: 'Los verbos separables parten el prefijo y lo mandan al FINAL: "Ich stehe um 7 auf". Verbo conjugado en posición 2, prefijo al final. Con un modal NO se separan: "Ich muss aufstehen".',
    questions: [
      { s: 'Ich ___ um 7 Uhr auf. (aufstehen)', opts: ['stehe', 'aufstehe', 'stehen'], a: 0, fb: 'Se separa: "stehe … auf".' },
      { s: 'Ich stehe um 7 Uhr ___. (prefijo)', opts: ['auf', 'an', 'ein'], a: 0, fb: 'El prefijo "auf" va al final.' },
      { s: 'Ich kaufe heute ___. (einkaufen)', opts: ['ein', 'auf', 'an'], a: 0, fb: '"ein" al final.' },
      { s: 'Ich rufe dich später ___. (anrufen)', opts: ['an', 'auf', 'ein'], a: 0, fb: '"an" al final.' },
      { s: '___ du mit? (mitkommen)', opts: ['Kommst', 'Mitkommst', 'Kommen'], a: 0, fb: 'Se separa: "Kommst du mit?".' },
      { s: '¿Dónde va el prefijo separable?', opts: ['Al principio', 'Al final', 'En posición 2'], a: 1, fb: 'Al final de la frase.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Ich aufstehe um 7.', 'Ich stehe um 7 auf.', 'Ich stehe auf um 7.'], a: 1, fb: 'El prefijo va al final: "stehe … auf".' },
      { s: 'Der Film ___ um 8 an. (anfangen)', opts: ['fängt', 'anfängt', 'fangen'], a: 0, fb: 'Se separa: "fängt … an".' },
      { s: 'Con un verbo modal, el separable…', opts: ['se separa igual', 'NO se separa', 'desaparece'], a: 1, fb: 'No se separa: queda junto en infinitivo.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Ich rufe an dich.', 'Ich rufe dich an.', 'Ich andich rufe.'], a: 1, fb: '"Ich rufe dich an".' },
      { s: 'Ich muss früh ___. (aufstehen, con modal)', opts: ['aufstehen', 'auf...stehe', 'stehe auf'], a: 0, fb: 'Con modal NO se separa: "aufstehen".' },
      { s: 'Wir ___ heute fern. (fernsehen)', opts: ['sehen', 'fernsehen', 'fernsehe'], a: 0, fb: 'Se separa: "sehen … fern".' },
      { s: 'Reordena: "ich / ein / kaufe / morgen"', opts: ['Ich kaufe morgen ein.', 'Ich einkaufe morgen.', 'Ich kaufe ein morgen.'], a: 0, fb: '"ein" al final.' },
      { s: 'Ich ___ das Fenster auf. (aufmachen)', opts: ['mache', 'aufmache', 'machen'], a: 0, fb: 'Se separa: "mache … auf".' },
    ],
  },
  {
    slug: 'imperativo',
    order: 14,
    title: 'El imperativo en alemán (formal e informal)',
    shortTitle: 'El imperativo',
    icon: '📣',
    seoTitle: 'El imperativo en alemán (du, ihr, Sie): cómo dar órdenes y ejercicios | A1',
    seoDescription:
      'El imperativo en alemán para dar instrucciones: la forma "du" (sin -st), "ihr" y la formal "Sie" (con pronombre). Ejemplos y ejercicios. Nivel A1.',
    keywords: ['imperativo alemán', 'imperativ du Sie', 'dar órdenes alemán', 'imperativo formal alemán a1'],
    intro: [
      'El imperativo sirve para dar órdenes, instrucciones, consejos y peticiones. En alemán hay tres formas según a quién hablas: "du" (informal, una persona), "ihr" (informal, varias) y "Sie" (formal).',
      'La forma "du" es la más típica: se toma la conjugación de "du" y se le QUITA la terminación -st (y el pronombre): "du kommst" → "Komm!", "du machst" → "Mach das!". El verbo abre la frase.',
      'La forma formal "Sie" mantiene el verbo en infinitivo + el pronombre "Sie": "Kommen Sie!", "Nehmen Sie Platz!". Y la forma "ihr" es igual que la conjugación de ihr, sin pronombre: "Kommt!".',
    ],
    sections: [
      {
        heading: 'La forma "du" (sin -st, sin pronombre)',
        body: [
          'Parte de "du machst" y quita "du" y "-st": "Mach das!" (¡Haz eso!), "Komm her!" (¡Ven aquí!), "Geh nach Hause!" (¡Vete a casa!).',
          'Algunos verbos con cambio vocálico e→i lo mantienen: "du sprichst" → "Sprich!", "du nimmst" → "Nimm!".',
        ],
      },
      {
        heading: 'La forma "Sie" (formal)',
        body: [
          'Se usa el infinitivo + "Sie": "Kommen Sie!", "Warten Sie bitte!", "Nehmen Sie Platz!". El pronombre "Sie" es obligatorio en esta forma.',
          'Es la forma educada para instrucciones a desconocidos o en contextos formales.',
        ],
      },
      {
        heading: 'La forma "ihr"',
        body: [
          'Igual que la conjugación de "ihr", sin pronombre: "Kommt!" (¡Venid!), "Macht die Hausaufgaben!" (¡Haced los deberes!).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'El imperativo (kommen, machen)',
        headers: ['A quién', 'kommen', 'machen'],
        rows: [
          ['du (informal)', 'Komm!', 'Mach!'],
          ['ihr (informal pl.)', 'Kommt!', 'Macht!'],
          ['Sie (formal)', 'Kommen Sie!', 'Machen Sie!'],
        ],
      },
    ],
    examples: [
      { en: 'Komm her!', es: '¡Ven aquí!', note: 'du: sin -st, sin pronombre.' },
      { en: 'Mach das, bitte!', es: '¡Haz eso, por favor!' },
      { en: 'Kommen Sie bitte!', es: '¡Venga, por favor!', note: 'formal: infinitivo + Sie.' },
      { en: 'Nehmen Sie Platz!', es: '¡Tome asiento!', note: 'formal.' },
      { en: 'Kommt!', es: '¡Venid!', note: 'ihr.' },
      { en: 'Sprich langsam!', es: '¡Habla despacio!', note: 'cambio e→i: "Sprich!".' },
    ],
    contrast: [
      { es: '¡Ven! (a un amigo)', en: 'Komm!', note: 'du: sin -st.' },
      { es: '¡Venga! (formal)', en: 'Kommen Sie!', note: 'infinitivo + Sie.' },
      { es: '¡Tome asiento!', en: 'Nehmen Sie Platz!', note: 'formal.' },
      { es: '¡Haced los deberes!', en: 'Macht die Hausaufgaben!', note: 'ihr.' },
      { es: '¡Habla despacio!', en: 'Sprich langsam!', note: 'cambio vocálico e→i.' },
    ],
    commonMistakes: [
      { wrong: 'Du komm her! (con "du")', right: 'Komm her!', note: 'En la forma "du", no se pone el pronombre.' },
      { wrong: 'Kommst! (con -st)', right: 'Komm!', note: 'Se quita la -st.' },
      { wrong: 'Komm Sie! (formal)', right: 'Kommen Sie!', note: 'Formal: infinitivo + "Sie".' },
      { wrong: 'Mach Sie das!', right: 'Machen Sie das!', note: 'Formal con "Sie" → infinitivo.' },
      { wrong: 'Sprech langsam!', right: 'Sprich langsam!', note: 'Cambio e→i en la forma "du".' },
    ],
    tip: 'Imperativo "du": quita -st y el pronombre (Komm! Mach!). "ihr": como la conjugación (Kommt!). "Sie" (formal): infinitivo + Sie (Kommen Sie!). El verbo abre la frase.',
    questions: [
      { s: 'Imperativo "du" de "kommen":', opts: ['Komm!', 'Kommst!', 'Kommen!'], a: 0, fb: 'du: quita -st → "Komm!".' },
      { s: 'Imperativo "du" de "machen":', opts: ['Machst!', 'Mach!', 'Machen!'], a: 1, fb: 'du → "Mach!".' },
      { s: 'Imperativo formal de "kommen":', opts: ['Komm Sie!', 'Kommen Sie!', 'Kommst Sie!'], a: 1, fb: 'formal: infinitivo + Sie → "Kommen Sie!".' },
      { s: 'Imperativo "ihr" de "kommen":', opts: ['Komm!', 'Kommt!', 'Kommen Sie!'], a: 1, fb: 'ihr → "Kommt!".' },
      { s: '¿Se pone el pronombre en el imperativo "du"?', opts: ['Sí', 'No'], a: 1, fb: 'No: "Komm!", no "Du komm!".' },
      { s: 'Imperativo "du" de "sprechen" (e→i):', opts: ['Sprech!', 'Sprich!', 'Sprechst!'], a: 1, fb: 'Cambio e→i → "Sprich!".' },
      { s: 'Imperativo formal de "warten":', opts: ['Wart Sie!', 'Warten Sie!', 'Wartest Sie!'], a: 1, fb: 'formal → "Warten Sie!".' },
      { s: '¿Cuál es CORRECTA? (informal)', opts: ['Kommst her!', 'Komm her!', 'Du kommst her!'], a: 1, fb: 'du: "Komm her!".' },
      { s: 'Imperativo "du" de "geben" (e→i):', opts: ['Geb!', 'Gib!', 'Gibst!'], a: 1, fb: 'e→i → "Gib!".' },
      { s: '"¡Tome asiento!" (formal):', opts: ['Nimm Platz!', 'Nehmen Sie Platz!', 'Nehmt Platz!'], a: 1, fb: 'formal → "Nehmen Sie Platz!".' },
      { s: '¿Cuál es CORRECTA? (formal)', opts: ['Komm Sie!', 'Kommen Sie!', 'Kommt Sie!'], a: 1, fb: '"Kommen Sie!".' },
      { s: 'Imperativo "ihr" de "machen":', opts: ['Mach!', 'Macht!', 'Machen Sie!'], a: 1, fb: 'ihr → "Macht!".' },
      { s: '"¡Habla despacio!" (a un amigo):', opts: ['Sprech langsam!', 'Sprich langsam!', 'Sprichst langsam!'], a: 1, fb: '"Sprich langsam!".' },
      { s: '¿Dónde va el verbo en el imperativo?', opts: ['Al final', 'Primero (abre la frase)', 'En posición 2'], a: 1, fb: 'El verbo abre la frase.' },
    ],
  },
  {
    slug: 'es-gibt-acusativo',
    order: 15,
    title: 'Es gibt (hay) y el acusativo en alemán',
    shortTitle: 'Es gibt (hay)',
    icon: '📍',
    seoTitle: 'Es gibt en alemán (hay) + acusativo: explicación y ejercicios | A1',
    seoDescription:
      'Cómo decir "hay" en alemán con "es gibt": es invariable y SIEMPRE va seguido del acusativo (es gibt einen Park). Forma negativa con kein. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['es gibt alemán', 'hay en alemán', 'es gibt acusativo', 'es gibt kein a1'],
    intro: [
      'Para decir "hay" (que algo existe), el alemán usa la expresión fija "es gibt". A diferencia del español, es completamente invariable: sirve para singular y plural sin cambiar. "Es gibt einen Park" (hay un parque), "Es gibt viele Geschäfte" (hay muchas tiendas).',
      'Lo más importante y lo que más se olvida: "es gibt" SIEMPRE va seguido del ACUSATIVO. Por eso el masculino cambia: "Es gibt EINEN Supermarkt" (no "ein Supermarkt"). Es la conexión perfecta con el tema del acusativo.',
      'En negativo se usa "kein" (en acusativo): "Es gibt keinen Park" (no hay parque), "Es gibt keine Probleme" (no hay problemas). Y para preguntar: "Gibt es hier einen Bahnhof?" (¿hay una estación aquí?).',
    ],
    sections: [
      {
        heading: '"es gibt" + acusativo',
        body: [
          'Siempre acusativo: por eso el masculino lleva "einen/den": "Es gibt einen Bahnhof", "Es gibt den besten Kaffee hier". Femenino, neutro y plural no cambian: "Es gibt eine Schule", "Es gibt ein Problem", "Es gibt Geschäfte".',
        ],
      },
      {
        heading: 'Invariable: singular y plural',
        body: [
          '"es gibt" no cambia con el número: "Es gibt einen Stuhl" (hay una silla) y "Es gibt zwei Stühle" (hay dos sillas). El "es" es un sujeto fijo.',
        ],
      },
      {
        heading: 'Negativo y pregunta',
        body: [
          'Negativo: "Es gibt kein…": "Es gibt keinen Park", "Es gibt keine Zeit". Pregunta: el verbo "gibt" se adelanta: "Gibt es hier einen Supermarkt?". Respuesta: "Ja, es gibt… / Nein, es gibt kein…".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: '"es gibt" + acusativo',
        headers: ['Forma', 'Ejemplo'],
        rows: [
          ['Afirmativa (masc.)', 'Es gibt einen Park.'],
          ['Afirmativa (fem./neutro)', 'Es gibt eine Schule. / ein Kino.'],
          ['Plural', 'Es gibt viele Geschäfte.'],
          ['Negativa', 'Es gibt keinen Park.'],
        ],
      },
    ],
    examples: [
      { en: 'Es gibt einen Park in der Nähe.', es: 'Hay un parque cerca.', note: 'masc. acus. → einen.' },
      { en: 'Es gibt eine Schule hier.', es: 'Hay una escuela aquí.', note: 'fem. → eine (no cambia).' },
      { en: 'Es gibt ein Problem.', es: 'Hay un problema.', note: 'neutro → ein.' },
      { en: 'Es gibt viele Geschäfte.', es: 'Hay muchas tiendas.', note: 'plural, invariable.' },
      { en: 'Es gibt keinen Bahnhof hier.', es: 'No hay estación aquí.', note: 'negativo masc. → keinen.' },
      { en: 'Gibt es hier einen Supermarkt?', es: '¿Hay un supermercado aquí?', note: 'pregunta: "gibt" primero.' },
    ],
    contrast: [
      { es: 'Hay un parque.', en: 'Es gibt einen Park.', note: '"es gibt" + acusativo (einen).' },
      { es: 'Hay muchas tiendas.', en: 'Es gibt viele Geschäfte.', note: 'invariable en plural.' },
      { es: 'No hay parque.', en: 'Es gibt keinen Park.', note: 'negativo → "keinen".' },
      { es: '¿Hay un supermercado?', en: 'Gibt es einen Supermarkt?', note: 'pregunta: verbo primero.' },
      { es: 'Hay una escuela.', en: 'Es gibt eine Schule.', note: 'fem. → "eine" (no cambia).' },
    ],
    commonMistakes: [
      { wrong: 'Es gibt ein Park.', right: 'Es gibt einen Park.', note: '"es gibt" + acusativo: masc. → "einen".' },
      { wrong: 'Es sind viele Geschäfte. (=hay)', right: 'Es gibt viele Geschäfte.', note: '"hay" → "es gibt".' },
      { wrong: 'Es gibt nicht einen Park.', right: 'Es gibt keinen Park.', note: 'Negar sustantivo → "keinen".' },
      { wrong: 'Es geben zwei Stühle.', right: 'Es gibt zwei Stühle.', note: '"es gibt" es invariable (singular y plural).' },
      { wrong: 'Hier es gibt einen Park?', right: 'Gibt es hier einen Park?', note: 'En la pregunta, el verbo va primero.' },
    ],
    tip: '"hay" = "es gibt" (invariable) y SIEMPRE con acusativo: "Es gibt einen Park" (masc. → einen). Negativo: "Es gibt kein…". Pregunta: "Gibt es…?".',
    questions: [
      { s: 'Es gibt ___ Park. (un, masc.)', opts: ['ein', 'einen', 'eine'], a: 1, fb: '"es gibt" + acusativo masc. → "einen".' },
      { s: 'Es gibt ___ Schule. (una, fem.)', opts: ['einen', 'eine', 'ein'], a: 1, fb: 'fem. → "eine" (no cambia).' },
      { s: 'Es gibt ___ Problem. (un, neutro)', opts: ['einen', 'eine', 'ein'], a: 2, fb: 'neutro → "ein".' },
      { s: 'Es gibt ___ Park. (no hay, masc.)', opts: ['nicht', 'kein', 'keinen'], a: 2, fb: 'negativo + acus. masc. → "keinen".' },
      { s: '___ es hier einen Supermarkt? (pregunta)', opts: ['Gibt', 'Es gibt', 'Geben'], a: 0, fb: 'pregunta: "Gibt es...?".' },
      { s: 'Es gibt ___ Geschäfte. (muchas)', opts: ['viele', 'vielen', 'viel'], a: 0, fb: 'plural → "viele Geschäfte".' },
      { s: '¿"es gibt" cambia en plural?', opts: ['Sí', 'No, es invariable'], a: 1, fb: 'Invariable: singular y plural.' },
      { s: '¿"es gibt" va con qué caso?', opts: ['nominativo', 'acusativo', 'dativo'], a: 1, fb: 'Siempre acusativo.' },
      { s: '¿Cómo se dice "Hay un parque"?', opts: ['Es gibt ein Park.', 'Es gibt einen Park.', 'Es sind ein Park.'], a: 1, fb: 'acus. masc. → "einen Park".' },
      { s: '¿Cuál es CORRECTA? (=hay tiendas)', opts: ['Es sind Geschäfte.', 'Es gibt Geschäfte.', 'Es geben Geschäfte.'], a: 1, fb: '"hay" → "es gibt".' },
      { s: 'Es gibt ___ Zeit. (no hay tiempo)', opts: ['kein', 'keine', 'keinen'], a: 1, fb: '"Zeit" fem. → "keine".' },
      { s: 'Es gibt ___ Bahnhof hier. (una estación, masc.)', opts: ['ein', 'einen', 'eine'], a: 1, fb: 'masc. acus. → "einen".' },
      { s: '¿Cómo se dice "No hay parque"?', opts: ['Es gibt nicht einen Park.', 'Es gibt keinen Park.', 'Es ist kein Park.'], a: 1, fb: '"Es gibt keinen Park".' },
      { s: 'Es gibt ___ Kino in der Stadt. (un, neutro)', opts: ['einen', 'eine', 'ein'], a: 2, fb: 'neutro → "ein".' },
    ],
  },
];

export function getTopic(slug: string): GrammarTopic | undefined {
  return findTopic(TOPICS, slug);
}

export function getTopicNav(slug: string): { prev: GrammarTopic | null; next: GrammarTopic | null } {
  return topicNav(TOPICS, slug);
}
