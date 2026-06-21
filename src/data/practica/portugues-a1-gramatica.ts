// Currículo de Gramática — Portugués A1 (variante brasileña)
// Cada tema es su propia URL indexable: /practica/portugues/a1/gramatica/<slug>
// Profundidad de filólogo + contraste español↔portugués.

import type { GrammarTopic } from './grammar-types';
import { findTopic, topicNav } from './grammar-types';
export { GRAMMAR_COLOR } from './grammar-types';
export type { GQItem, GrammarTopic } from './grammar-types';

export const TOPICS: GrammarTopic[] = [
  {
    slug: 'artigos',
    order: 1,
    title: 'Los artículos en portugués (o, a, os, as, um, uma)',
    shortTitle: 'Artículos (o/a · um/uma)',
    icon: '📗',
    seoTitle: 'Artículos en portugués (o, a, os, as, um, uma): explicación y ejercicios | A1',
    seoDescription:
      'Los artículos definidos e indefinidos en portugués: o, a, os, as, um, uma. Género, uso ante nombres propios y diferencias con el español. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['artículos en portugués', 'o a os as um uma', 'artículos definidos portugués', 'género en portugués a1'],
    intro: [
      'Los artículos portugueses se parecen muchísimo a los españoles, lo que es una gran ventaja. Definidos (el/la/los/las): o (masc.), a (fem.), os (masc. pl.), as (fem. pl.). Indefinidos (un/una/unos/unas): um (masc.), uma (fem.), uns (masc. pl.), umas (fem. pl.).',
      'Casi siempre el género coincide con el español, pero hay falsos amigos peligrosos: "o leite" (la leche) es masculino, "a viagem" (el viaje) es femenino, "o sangue" (la sangre) es masculino, "a árvore" (el árbol) es femenino.',
      'Una diferencia de uso muy brasileña: en portugués es normal poner el artículo delante de nombres de persona ("a Maria", "o João") y de posesivos ("o meu livro"). En español eso suena raro, pero en portugués es habitual.',
    ],
    sections: [
      {
        heading: 'Definidos e indefinidos',
        body: [
          'Definidos: o/a/os/as, para algo concreto o conocido ("o livro", "as casas"). Indefinidos: um/uma/uns/umas, para algo no específico ("um livro", "umas casas").',
          'La forma se elige por género y número del sustantivo, igual que en español.',
        ],
      },
      {
        heading: 'Cuidado con el género (falsos amigos)',
        body: [
          'No todos los géneros coinciden con el español: "o leite" (la leche, masc.), "a viagem" (el viaje, fem.), "o sangue" (la sangre, masc.), "a árvore" (el árbol, fem.), "o nariz" (la nariz, masc.).',
          'Consejo: cuando una palabra te suene "obvia" por el español, dúdalo y apréndela con su artículo.',
        ],
      },
      {
        heading: 'El artículo con nombres y posesivos',
        body: [
          'En portugués (sobre todo en Brasil) se usa el artículo delante de nombres de persona: "a Ana", "o Pedro". Y también delante del posesivo: "o meu carro", "a minha casa".',
          'En español eso no se hace, así que es una de las marcas que más te delatan como hispanohablante si la olvidas.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Artículos',
        headers: ['', 'Masc. sing.', 'Fem. sing.', 'Masc. pl.', 'Fem. pl.'],
        rows: [
          ['Definido (el/la)', 'o', 'a', 'os', 'as'],
          ['Indefinido (un/una)', 'um', 'uma', 'uns', 'umas'],
        ],
      },
      {
        caption: 'Falsos amigos de género (español ≠ portugués)',
        headers: ['Español', 'Portugués', 'Género en portugués'],
        rows: [
          ['la leche', 'o leite', 'masculino'],
          ['el viaje', 'a viagem', 'femenino'],
          ['la sangre', 'o sangue', 'masculino'],
          ['el árbol', 'a árvore', 'femenino'],
        ],
      },
    ],
    examples: [
      { en: 'O livro está na mesa.', es: 'El libro está sobre la mesa.' },
      { en: 'A Maria é minha amiga.', es: 'María es mi amiga.', note: 'artículo delante del nombre (uso brasileño).' },
      { en: 'Eu tomo o leite todos os dias.', es: 'Tomo (la) leche todos los días.', note: '"o leite" es masculino.' },
      { en: 'Tem umas casas bonitas aqui.', es: 'Hay unas casas bonitas aquí.' },
      { en: 'O meu carro é novo.', es: 'Mi carro es nuevo.', note: 'artículo + posesivo, normal en portugués.' },
      { en: 'A viagem foi longa.', es: 'El viaje fue largo.', note: '"a viagem" es femenino.' },
    ],
    contrast: [
      { es: 'la leche', en: 'o leite', note: 'en portugués es masculino.' },
      { es: 'el viaje', en: 'a viagem', note: 'en portugués es femenino.' },
      { es: 'María es mi amiga.', en: 'A Maria é minha amiga.', note: 'el portugués pone artículo ante el nombre.' },
      { es: 'mi carro', en: 'o meu carro', note: 'artículo + posesivo (normal en portugués).' },
      { es: 'el árbol', en: 'a árvore', note: 'en portugués es femenino.' },
    ],
    commonMistakes: [
      { wrong: 'a leite', right: 'o leite', note: '"leite" es masculino en portugués.' },
      { wrong: 'o viagem', right: 'a viagem', note: '"viagem" es femenino.' },
      { wrong: 'Maria é minha amiga. (sin artículo)', right: 'A Maria é minha amiga.', note: 'En portugués se pone artículo ante el nombre.' },
      { wrong: 'meu carro → "el meu carro"', right: 'o meu carro', note: 'Artículo + posesivo: "o meu carro".' },
      { wrong: 'a árvore → "o árvore"', right: 'a árvore', note: '"árvore" es femenino.' },
    ],
    tip: 'Los artículos son casi como en español (o/a/os/as, um/uma), pero ojo con el género: "o leite", "a viagem". Y en portugués se usa el artículo ante nombres ("a Ana") y posesivos ("o meu livro").',
    questions: [
      { s: '___ livro está na mesa.', opts: ['O', 'A', 'Os', 'As'], a: 0, fb: '"livro" masc. → "o".' },
      { s: '___ casa é grande.', opts: ['O', 'A', 'Os', 'As'], a: 1, fb: '"casa" fem. → "a".' },
      { s: '___ leite está na geladeira.', opts: ['O', 'A', 'Um'], a: 0, fb: '"leite" es masculino → "o".' },
      { s: '___ viagem foi longa.', opts: ['O', 'A', 'Um'], a: 1, fb: '"viagem" es femenino → "a".' },
      { s: 'Eu tenho ___ irmão. (un)', opts: ['um', 'uma', 'o'], a: 0, fb: '"irmão" masc. → "um".' },
      { s: 'Ela tem ___ casa nova. (una)', opts: ['um', 'uma', 'a'], a: 1, fb: '"casa" fem. → "uma".' },
      { s: '___ casas são bonitas. (las)', opts: ['Os', 'As', 'A'], a: 1, fb: 'fem. pl. → "as".' },
      { s: '___ árvore é alta.', opts: ['O', 'A'], a: 1, fb: '"árvore" es femenino → "a".' },
      { s: '¿Cómo se dice "la leche"?', opts: ['a leite', 'o leite', 'um leite'], a: 1, fb: '"leite" es masculino → "o leite".' },
      { s: '¿Cuál es CORRECTA? (uso brasileño)', opts: ['Maria é minha amiga.', 'A Maria é minha amiga.', 'O Maria é minha amiga.'], a: 1, fb: 'Artículo ante el nombre → "A Maria".' },
      { s: '¿Cómo se dice "mi carro"?', opts: ['meu carro', 'o meu carro', 'el meu carro'], a: 1, fb: 'Artículo + posesivo → "o meu carro".' },
      { s: '___ nariz dele é grande.', opts: ['O', 'A'], a: 0, fb: '"nariz" es masculino en portugués → "o".' },
      { s: 'Tem ___ livros interessantes. (unos)', opts: ['uns', 'umas', 'os'], a: 0, fb: 'masc. pl. → "uns".' },
      { s: '¿Cuál es CORRECTA?', opts: ['o viagem', 'a viagem', 'um viagem'], a: 1, fb: '"viagem" es femenino → "a viagem".' },
    ],
  },
  {
    slug: 'genero-plural-substantivos',
    order: 2,
    title: 'El género y el plural de los sustantivos en portugués',
    shortTitle: 'Género y plural',
    icon: '🔢',
    seoTitle: 'Género y plural en portugués (-s, -es, -ões, -ns): reglas y ejercicios | A1',
    seoDescription:
      'Cómo formar el plural en portugués: +s, +es, -m → -ns, -l → -is y los plurales en -ão (-ões, -ães, -ãos). Diferencias con el español. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['plural en portugués', 'género portugués', 'plural -ão -ões', 'plural -m -ns portugués a1'],
    intro: [
      'El plural portugués se parece al español (se basa en añadir -s), pero tiene varias reglas especiales según cómo termine la palabra. Dominar estas reglas es clave para sonar natural.',
      'Lo básico: las palabras terminadas en vocal añaden -s (casa → casas, livro → livros). Las terminadas en -r, -z, -s (tónica) añaden -es (flor → flores, luz → luzes). Las terminadas en -m cambian a -ns (homem → homens, jovem → jovens).',
      'El caso estrella, sin equivalente español, son las palabras en -ão: la mayoría hacen -ões (coração → corações), algunas -ães (pão → pães) y unas pocas -ãos (mão → mãos, irmão → irmãos). Hay que aprenderlas con su plural.',
    ],
    sections: [
      {
        heading: 'Las reglas básicas',
        body: [
          'Vocal → +s: casa → casas, livro → livros. -r/-z/-s (tónica) → +es: flor → flores, luz → luzes, país → países. -m → -ns: homem → homens, jovem → jovens, jardim → jardins.',
          '-l → -is: animal → animais, papel → papéis, hotel → hotéis (la "l" final cambia a "is").',
        ],
      },
      {
        heading: 'El plural de las palabras en -ão',
        body: [
          'Es el más variado: -ão → -ões en la mayoría (coração → corações, informação → informações); -ão → -ães en un grupo (pão → pães, cão → cães, alemão → alemães); -ão → -ãos en pocas (mão → mãos, irmão → irmãos, cidadão → cidadãos).',
          'No hay regla perfecta: conviene aprender cada palabra con su plural.',
        ],
      },
      {
        heading: 'Género',
        body: [
          'Como en español, suele marcarse con -o (masc.) y -a (fem.): o menino / a menina. Pero hay palabras en -a masculinas (o problema, o dia) y muchas con género propio que no coincide con el español ("o leite", "a viagem").',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Reglas del plural',
        headers: ['Terminación', 'Regla', 'Ejemplo'],
        rows: [
          ['vocal', '+ s', 'casa → casas'],
          ['-r, -z, -s (tónica)', '+ es', 'flor → flores, luz → luzes'],
          ['-m', '→ -ns', 'homem → homens'],
          ['-l', '→ -is', 'animal → animais'],
          ['-ão', '→ -ões / -ães / -ãos', 'coração → corações'],
        ],
      },
      {
        caption: 'Plurales en -ão',
        headers: ['Tipo', 'Ejemplo'],
        rows: [
          ['-ões (mayoría)', 'informação → informações'],
          ['-ães (grupo)', 'pão → pães, cão → cães'],
          ['-ãos (pocas)', 'mão → mãos, irmão → irmãos'],
        ],
      },
    ],
    examples: [
      { en: 'casa → casas', es: 'casa → casas', note: 'vocal → +s.' },
      { en: 'flor → flores', es: 'flor → flores', note: '-r → -es.' },
      { en: 'homem → homens', es: 'hombre → hombres', note: '-m → -ns.' },
      { en: 'animal → animais', es: 'animal → animales', note: '-l → -is.' },
      { en: 'coração → corações', es: 'corazón → corazones', note: '-ão → -ões.' },
      { en: 'pão → pães', es: 'pan → panes', note: '-ão → -ães.' },
    ],
    contrast: [
      { es: 'hombres', en: 'homens', note: '-m → -ns (no "homems").' },
      { es: 'animales', en: 'animais', note: '-l → -is.' },
      { es: 'corazones', en: 'corações', note: '-ão → -ões.' },
      { es: 'panes', en: 'pães', note: '-ão → -ães (irregular).' },
      { es: 'manos', en: 'mãos', note: '-ão → -ãos.' },
    ],
    commonMistakes: [
      { wrong: 'homems', right: 'homens', note: '-m → -ns.' },
      { wrong: 'animals', right: 'animais', note: '-l → -is.' },
      { wrong: 'coraçãos', right: 'corações', note: 'la mayoría de -ão → -ões.' },
      { wrong: 'pãos', right: 'pães', note: '"pão" hace plural "pães".' },
      { wrong: 'flors', right: 'flores', note: '-r → -es.' },
    ],
    tip: 'Vocal → +s; -r/-z/-s → +es; -m → -ns; -l → -is. Y el plural de -ão es variado (-ões, -ães, -ãos): apréndelo con cada palabra.',
    questions: [
      { s: 'Plural de "casa": ___.', opts: ['casas', 'cases', 'casões'], a: 0, fb: 'vocal → +s: "casas".' },
      { s: 'Plural de "flor": ___.', opts: ['flors', 'flores', 'florais'], a: 1, fb: '-r → -es: "flores".' },
      { s: 'Plural de "homem": ___.', opts: ['homems', 'homens', 'homais'], a: 1, fb: '-m → -ns: "homens".' },
      { s: 'Plural de "animal": ___.', opts: ['animals', 'animais', 'animales'], a: 1, fb: '-l → -is: "animais".' },
      { s: 'Plural de "coração": ___.', opts: ['coraçãos', 'corações', 'coraçães'], a: 1, fb: '-ão → -ões: "corações".' },
      { s: 'Plural de "pão": ___.', opts: ['pãos', 'pães', 'pões'], a: 1, fb: '"pão" → "pães".' },
      { s: 'Plural de "mão": ___.', opts: ['mãos', 'mães', 'mões'], a: 0, fb: '"mão" → "mãos".' },
      { s: 'Plural de "luz": ___.', opts: ['luzs', 'luzes', 'luzis'], a: 1, fb: '-z → -es: "luzes".' },
      { s: 'Plural de "jovem": ___.', opts: ['jovems', 'jovens', 'jovais'], a: 1, fb: '-m → -ns: "jovens".' },
      { s: 'Plural de "papel": ___.', opts: ['papels', 'papéis', 'papeles'], a: 1, fb: '-l → -is: "papéis".' },
      { s: '¿Cuál es CORRECTA?', opts: ['homems', 'homens', 'homais'], a: 1, fb: '-m → -ns: "homens".' },
      { s: 'Plural de "informação": ___.', opts: ['informaçãos', 'informações', 'informaçães'], a: 1, fb: '-ão → -ões.' },
      { s: 'Plural de "irmão": ___.', opts: ['irmãos', 'irmães', 'irmões'], a: 0, fb: '"irmão" → "irmãos".' },
      { s: '¿Cómo se dice "animales"?', opts: ['animals', 'animais', 'animales'], a: 1, fb: '-l → -is: "animais".' },
    ],
  },
  {
    slug: 'verbo-ser',
    order: 3,
    title: 'El verbo ser en presente (portugués)',
    shortTitle: 'Verbo ser',
    icon: '⚡',
    seoTitle: 'Verbo ser en portugués (presente): conjugación y ejercicios | A1',
    seoDescription:
      'El verbo ser en portugués: conjugación (eu sou, você é, nós somos…), usos para identidad, origen y características permanentes, y la conjugación con "você". Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbo ser portugués', 'ser conjugación portugués', 'eu sou você é', 'ser presente brasileño a1'],
    intro: [
      'El portugués, como el español, tiene DOS verbos "to be": ser y estar. "Ser" se usa para lo permanente o esencial: identidad, origen, nacionalidad, profesión y características. "Eu sou brasileiro", "Ela é médica".',
      'Su conjugación: eu sou, você é, ele/ela é, nós somos, vocês são, eles/elas são. Lo más importante para el hispanohablante: "você" (tú/usted, informal en Brasil) se conjuga en TERCERA persona, igual que "ele/ela": "você é".',
      'La buena noticia es que el uso de ser/estar es casi idéntico al español, así que tu instinto te servirá la mayoría de las veces. Las diferencias finas las verás en el tema de "estar".',
    ],
    sections: [
      {
        heading: 'Conjugación (con você)',
        body: [
          'eu sou · você é · ele/ela é · nós somos · vocês são · eles/elas são. La clave: "você" usa la forma de 3.ª persona ("é", "são"), no la de 2.ª.',
          'En Brasil "tu" casi no se usa; lo normal es "você". (En Portugal y el sur de Brasil sí se usa "tu és".)',
        ],
      },
      {
        heading: 'Usos de "ser"',
        body: [
          'Identidad: "Eu sou Pedro". Origen/nacionalidad: "Sou do Brasil", "Ela é colombiana". Profesión: "Ele é professor" (sin artículo). Características permanentes: "A casa é grande".',
        ],
      },
      {
        heading: 'ser o estar (como en español)',
        body: [
          'Igual que en español: "ser" para lo permanente (Sou alto) y "estar" para lo temporal o estados (Estou cansado). Tu intuición de hispanohablante funciona casi siempre.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'ser no presente',
        headers: ['Pronombre', 'Forma', 'Ejemplo'],
        rows: [
          ['eu', 'sou', 'eu sou brasileiro'],
          ['você', 'é', 'você é gentil'],
          ['ele / ela', 'é', 'ela é médica'],
          ['nós', 'somos', 'nós somos amigos'],
          ['vocês', 'são', 'vocês são estudantes'],
          ['eles / elas', 'são', 'eles são de São Paulo'],
        ],
      },
    ],
    examples: [
      { en: 'Eu sou brasileiro.', es: 'Soy brasileño.' },
      { en: 'Você é muito gentil.', es: 'Eres/Es muy amable.', note: '"você" → 3.ª persona "é".' },
      { en: 'Ela é professora.', es: 'Ella es profesora.', note: 'profesión sin artículo.' },
      { en: 'Nós somos amigos.', es: 'Somos amigos.' },
      { en: 'Eles são do Rio.', es: 'Son de Río.' },
      { en: 'A casa é grande.', es: 'La casa es grande.', note: 'característica permanente → ser.' },
    ],
    contrast: [
      { es: 'Soy brasileño.', en: 'Eu sou brasileiro.', note: 'ser para origen/identidad, como en español.' },
      { es: '¿Tú eres simpático?', en: 'Você é simpático?', note: '"você" se conjuga en 3.ª persona → "é".' },
      { es: 'Ella es médica.', en: 'Ela é médica.', note: 'profesión sin artículo.' },
      { es: 'Somos amigos.', en: 'Nós somos amigos.', note: 'con "nós" → "somos".' },
      { es: 'Son de São Paulo.', en: 'Eles são de São Paulo.', note: 'con eles/elas → "são".' },
    ],
    commonMistakes: [
      { wrong: 'Você és gentil.', right: 'Você é gentil.', note: '"você" usa 3.ª persona → "é".' },
      { wrong: 'Eu é brasileiro.', right: 'Eu sou brasileiro.', note: 'Con "eu" → "sou".' },
      { wrong: 'Ela é uma médica.', right: 'Ela é médica.', note: 'La profesión va sin artículo.' },
      { wrong: 'Nós é amigos.', right: 'Nós somos amigos.', note: 'Con "nós" → "somos".' },
      { wrong: 'Eles é do Rio.', right: 'Eles são do Rio.', note: 'Con "eles" → "são".' },
    ],
    tip: '"ser" = lo permanente (identidad, origen, profesión), como en español. Conjuga: eu sou, você é, nós somos, vocês são. Clave: "você" va en 3.ª persona ("é").',
    questions: [
      { s: 'Eu ___ brasileiro.', opts: ['sou', 'é', 'somos', 'são'], a: 0, fb: 'Con "eu" → "sou".' },
      { s: 'Você ___ gentil.', opts: ['sou', 'és', 'é', 'são'], a: 2, fb: '"você" → 3.ª persona "é".' },
      { s: 'Ela ___ médica.', opts: ['sou', 'é', 'somos', 'são'], a: 1, fb: 'Con "ela" → "é".' },
      { s: 'Nós ___ amigos.', opts: ['somos', 'são', 'sou', 'é'], a: 0, fb: 'Con "nós" → "somos".' },
      { s: 'Vocês ___ estudantes.', opts: ['somos', 'são', 'é', 'sou'], a: 1, fb: 'Con "vocês" → "são".' },
      { s: 'Eles ___ de São Paulo.', opts: ['somos', 'são', 'é'], a: 1, fb: 'Con "eles" → "são".' },
      { s: 'A casa ___ grande.', opts: ['sou', 'é', 'são'], a: 1, fb: 'Sujeto singular → "é".' },
      { s: 'Eu ___ professor.', opts: ['sou', 'é', 'são'], a: 0, fb: 'Con "eu" → "sou".' },
      { s: 'Você ___ do Brasil?', opts: ['é', 'és', 'sou'], a: 0, fb: '"você" → "é".' },
      { s: '¿Cómo se dice "Ella es médica"?', opts: ['Ela é uma médica.', 'Ela é médica.', 'Ela tem médica.'], a: 1, fb: 'Profesión sin artículo → "Ela é médica".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Você és gentil.', 'Você é gentil.', 'Você sou gentil.'], a: 1, fb: '"você" → "é".' },
      { s: 'Nós ___ colombianos.', opts: ['somos', 'são', 'é'], a: 0, fb: 'Con "nós" → "somos".' },
      { s: 'Eles ___ meus amigos.', opts: ['é', 'são', 'somos'], a: 1, fb: 'Con "eles" → "são".' },
      { s: 'Eu ___ estudante.', opts: ['sou', 'é', 'são'], a: 0, fb: 'Con "eu" → "sou".' },
    ],
  },
  {
    slug: 'verbo-estar',
    order: 4,
    title: 'El verbo estar en presente y ser vs estar (portugués)',
    shortTitle: 'Verbo estar · ser vs estar',
    icon: '🌡️',
    seoTitle: 'Verbo estar en portugués (presente) y ser vs estar: ejercicios | A1',
    seoDescription:
      'El verbo estar en portugués: conjugación (eu estou, você está…), su uso para estados temporales y la diferencia con ser. Formas coloquiales (tô, tá). Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbo estar portugués', 'estar conjugación portugués', 'ser vs estar portugués', 'tô tá brasileiro a1'],
    intro: [
      '"Estar" se usa, como en español, para estados temporales, situaciones y ubicación: "Estou cansado", "A chave está na mesa", "Eles estão em casa". Su sentido coincide casi siempre con el "estar" español.',
      'Conjugación: eu estou, você está, ele/ela está, nós estamos, vocês estão, eles/elas estão. Recuerda: "você" se conjuga en 3.ª persona ("está").',
      'En el portugués hablado de Brasil es muy común la forma reducida: "tô" (estou), "tá" (está), "tamos" (estamos), "tão" (estão). Conviene reconocerla aunque al escribir uses la forma completa.',
    ],
    sections: [
      {
        heading: 'Conjugación de estar',
        body: [
          'eu estou · você está · ele/ela está · nós estamos · vocês estão · eles/elas estão. Como con "ser", "você" usa la 3.ª persona.',
          'Coloquial brasileño: tô, tá, tamos, tão. "Tô cansado" = "Estou cansado".',
        ],
      },
      {
        heading: 'ser o estar (casi como en español)',
        body: [
          'Permanente/esencial → ser: "Ele é alto", "Sou do Brasil". Temporal/estado/ubicación → estar: "Ele está doente", "O café está quente", "Estou em casa".',
          'Tu intuición de hispanohablante acierta casi siempre; las diferencias son mínimas en el A1.',
        ],
      },
      {
        heading: 'estar com (un giro distinto del español)',
        body: [
          'Sensaciones físicas como hambre, sed, frío o miedo se dicen con "estar com": "Estou com fome" (tengo hambre), "Estou com sede" (tengo sed), "Estou com frio" (tengo frío). El español usa "tener"; el portugués brasileño usa "estar com".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'estar no presente',
        headers: ['Pronombre', 'Forma', 'Coloquial'],
        rows: [
          ['eu', 'estou', 'tô'],
          ['você / ele / ela', 'está', 'tá'],
          ['nós', 'estamos', 'tamos'],
          ['vocês / eles / elas', 'estão', 'tão'],
        ],
      },
      {
        caption: 'ser vs estar',
        headers: ['Idea', 'Verbo', 'Ejemplo'],
        rows: [
          ['permanente / esencial', 'ser', 'Ele é alto.'],
          ['temporal / estado', 'estar', 'Ele está doente.'],
          ['ubicación', 'estar', 'Estou em casa.'],
          ['hambre, sed, frío…', 'estar com', 'Estou com fome.'],
        ],
      },
    ],
    examples: [
      { en: 'Eu estou cansado.', es: 'Estoy cansado.' },
      { en: 'A chave está na mesa.', es: 'La llave está sobre la mesa.', note: 'ubicación → estar.' },
      { en: 'Você está bem?', es: '¿Estás bien?', note: '"você" → "está".' },
      { en: 'Nós estamos em casa.', es: 'Estamos en casa.' },
      { en: 'Estou com fome.', es: 'Tengo hambre.', note: 'el portugués usa "estar com", no "ter".' },
      { en: 'Tô cansado. (coloquial)', es: 'Estoy cansado.', note: 'reducción brasileña de "estou".' },
    ],
    contrast: [
      { es: 'Estoy cansado.', en: 'Estou cansado.', note: 'estado → estar, como en español.' },
      { es: 'Él está enfermo.', en: 'Ele está doente.', note: 'estar para lo temporal.' },
      { es: 'Tengo hambre.', en: 'Estou com fome.', note: 'el portugués usa "estar com", no "ter".' },
      { es: 'Tengo frío.', en: 'Estou com frio.', note: 'sensación física → "estar com".' },
      { es: '¿Estás bien?', en: 'Você está bem?', note: '"você" → "está".' },
    ],
    commonMistakes: [
      { wrong: 'Você estás bem?', right: 'Você está bem?', note: '"você" → 3.ª persona "está".' },
      { wrong: 'Tenho fome.', right: 'Estou com fome.', note: 'En portugués (Brasil): "estar com fome".' },
      { wrong: 'Eu está cansado.', right: 'Eu estou cansado.', note: 'Con "eu" → "estou".' },
      { wrong: 'Ele é doente. (temporal)', right: 'Ele está doente.', note: 'Estado temporal → "estar".' },
      { wrong: 'Nós está em casa.', right: 'Nós estamos em casa.', note: 'Con "nós" → "estamos".' },
    ],
    tip: '"estar" = estados, situaciones y ubicación (como en español). Conjuga: estou, está, estamos, estão. Pero el hambre/sed/frío van con "estar com": "Estou com fome".',
    questions: [
      { s: 'Eu ___ cansado.', opts: ['estou', 'está', 'estamos', 'estão'], a: 0, fb: 'Con "eu" → "estou".' },
      { s: 'Você ___ bem?', opts: ['estou', 'estás', 'está', 'estão'], a: 2, fb: '"você" → "está".' },
      { s: 'A chave ___ na mesa.', opts: ['estou', 'está', 'estão'], a: 1, fb: 'Sujeto singular → "está".' },
      { s: 'Nós ___ em casa.', opts: ['estamos', 'estão', 'está'], a: 0, fb: 'Con "nós" → "estamos".' },
      { s: 'Eles ___ na escola.', opts: ['estamos', 'estão', 'está'], a: 1, fb: 'Con "eles" → "estão".' },
      { s: 'Eu ___ com fome. (tengo hambre)', opts: ['tenho', 'estou', 'sou'], a: 1, fb: 'En portugués: "estou com fome".' },
      { s: 'Ele ___ doente hoje. (estado)', opts: ['é', 'está', 'tem'], a: 1, fb: 'Estado temporal → "está".' },
      { s: 'Você ___ com sede?', opts: ['tem', 'está', 'é'], a: 1, fb: '"estar com sede" → "está".' },
      { s: 'Forma coloquial de "estou": ___.', opts: ['tô', 'tá', 'tão'], a: 0, fb: '"estou" → "tô".' },
      { s: '¿Cómo se dice "Tengo hambre"?', opts: ['Tenho fome.', 'Estou com fome.', 'Sou com fome.'], a: 1, fb: 'En portugués brasileño → "Estou com fome".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Você estás bem?', 'Você está bem?', 'Você estou bem?'], a: 1, fb: '"você" → "está".' },
      { s: '¿Ser o estar? "O café ___ quente." (temporal)', opts: ['é', 'está'], a: 1, fb: 'Estado temporal → "está".' },
      { s: '¿Ser o estar? "Ele ___ alto." (permanente)', opts: ['é', 'está'], a: 0, fb: 'Característica permanente → "é".' },
      { s: 'Nós ___ com frio.', opts: ['temos', 'estamos', 'somos'], a: 1, fb: '"estar com frio" → "estamos".' },
    ],
  },
  {
    slug: 'verbo-ter',
    order: 5,
    title: 'El verbo ter (tener) en presente (portugués)',
    shortTitle: 'Verbo ter (tener)',
    icon: '🔑',
    seoTitle: 'Verbo ter en portugués (tener): conjugación, la edad y ejercicios | A1',
    seoDescription:
      'El verbo ter en portugués: conjugación (eu tenho, você tem…), expresar la edad (tenho vinte anos) y la posesión. Como el español "tener". Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbo ter portugués', 'ter conjugación', 'tener en portugués', 'tenho vinte anos idade a1'],
    intro: [
      '"Ter" significa "tener" y es uno de los verbos más usados del portugués. Sirve para la posesión (Tenho um carro), la familia (Tenho dois irmãos) y, como en español, para la EDAD: "Tenho vinte anos" = "Tengo veinte años".',
      'Conjugación: eu tenho, você tem, ele/ela tem, nós temos, vocês têm, eles/elas têm. Fíjate en el acento circunflejo del plural "têm" (con acento), que lo distingue del singular "tem" (sin acento).',
      'Ojo con un giro brasileño: aunque la edad va con "ter", las sensaciones físicas (hambre, sed, frío) NO van con "ter" sino con "estar com": "Estou com fome" (no "Tenho fome").',
    ],
    sections: [
      {
        heading: 'Conjugación de ter',
        body: [
          'eu tenho · você tem · ele/ela tem · nós temos · vocês têm · eles/elas têm. El singular "tem" no lleva acento; el plural "têm" sí (circunflejo).',
          'Como con ser/estar, "você" usa la 3.ª persona: "você tem".',
        ],
      },
      {
        heading: 'La edad y la posesión',
        body: [
          'Edad: "Quantos anos você tem? — Tenho trinta anos." Igual que en español, con "ter".',
          'Posesión y familia: "Tenho um cachorro", "Ela tem dois filhos".',
        ],
      },
      {
        heading: 'Ter vs estar com',
        body: [
          'Para hambre, sed, frío, miedo, sueño, el portugués brasileño prefiere "estar com": "Estou com fome / sede / frio / medo / sono". Decir "tenho fome" se entiende, pero suena menos natural en Brasil.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'ter no presente',
        headers: ['Pronombre', 'Forma', 'Ejemplo'],
        rows: [
          ['eu', 'tenho', 'eu tenho um carro'],
          ['você / ele / ela', 'tem', 'você tem razão'],
          ['nós', 'temos', 'nós temos tempo'],
          ['vocês / eles / elas', 'têm', 'eles têm uma casa'],
        ],
      },
    ],
    examples: [
      { en: 'Eu tenho vinte anos.', es: 'Tengo veinte años.', note: 'la edad con "ter", como en español.' },
      { en: 'Ela tem dois filhos.', es: 'Ella tiene dos hijos.' },
      { en: 'Você tem razão.', es: 'Tienes razón.', note: '"você" → "tem".' },
      { en: 'Nós temos tempo.', es: 'Tenemos tiempo.' },
      { en: 'Eles têm uma casa grande.', es: 'Tienen una casa grande.', note: 'plural → "têm" (con acento).' },
      { en: 'Estou com fome.', es: 'Tengo hambre.', note: 'el hambre va con "estar com", no con "ter".' },
    ],
    contrast: [
      { es: 'Tengo 20 años.', en: 'Tenho vinte anos.', note: 'la edad con "ter", como en español.' },
      { es: 'Tienes razón.', en: 'Você tem razão.', note: '"você" → "tem".' },
      { es: 'Tienen una casa.', en: 'Eles têm uma casa.', note: 'plural → "têm".' },
      { es: 'Tengo hambre.', en: 'Estou com fome.', note: '¡ojo! el hambre va con "estar com".' },
      { es: 'Tenemos tiempo.', en: 'Nós temos tempo.', note: 'con "nós" → "temos".' },
    ],
    commonMistakes: [
      { wrong: 'Você tens razão.', right: 'Você tem razão.', note: '"você" → 3.ª persona "tem".' },
      { wrong: 'Eu sou vinte anos.', right: 'Eu tenho vinte anos.', note: 'La edad va con "ter".' },
      { wrong: 'Eles tem uma casa. (plural)', right: 'Eles têm uma casa.', note: 'Plural → "têm" con acento.' },
      { wrong: 'Tenho fome.', right: 'Estou com fome.', note: 'El hambre va con "estar com".' },
      { wrong: 'Nós tem tempo.', right: 'Nós temos tempo.', note: 'Con "nós" → "temos".' },
    ],
    tip: '"ter" = tener: tenho, tem, temos, têm. La edad va con "ter" (Tenho 20 anos), como en español. Pero el hambre/sed/frío van con "estar com" (Estou com fome).',
    questions: [
      { s: 'Eu ___ vinte anos.', opts: ['tenho', 'tem', 'temos', 'têm'], a: 0, fb: 'Con "eu" → "tenho".' },
      { s: 'Você ___ razão.', opts: ['tenho', 'tens', 'tem', 'têm'], a: 2, fb: '"você" → "tem".' },
      { s: 'Ela ___ dois filhos.', opts: ['tenho', 'tem', 'têm'], a: 1, fb: 'Con "ela" → "tem".' },
      { s: 'Nós ___ tempo.', opts: ['temos', 'têm', 'tem'], a: 0, fb: 'Con "nós" → "temos".' },
      { s: 'Eles ___ uma casa. (plural)', opts: ['tem', 'têm', 'temos'], a: 1, fb: 'Plural → "têm" (con acento).' },
      { s: 'Você ___ um carro?', opts: ['tenho', 'tem', 'têm'], a: 1, fb: '"você" → "tem".' },
      { s: 'Eu ___ um cachorro.', opts: ['tenho', 'tem', 'têm'], a: 0, fb: 'Con "eu" → "tenho".' },
      { s: 'Quantos anos você ___?', opts: ['tenho', 'tem', 'é'], a: 1, fb: 'La edad con ter → "tem".' },
      { s: '¿Cómo se dice "Tengo 30 años"?', opts: ['Sou trinta anos.', 'Tenho trinta anos.', 'Estou trinta anos.'], a: 1, fb: 'La edad → "Tenho trinta anos".' },
      { s: '¿Cómo se dice "Tengo hambre"?', opts: ['Tenho fome.', 'Estou com fome.', 'Sou com fome.'], a: 1, fb: 'En portugués brasileño → "Estou com fome".' },
      { s: '¿Cuál es CORRECTA? (plural)', opts: ['Eles tem uma casa.', 'Eles têm uma casa.', 'Eles temos uma casa.'], a: 1, fb: 'Plural → "têm" con acento.' },
      { s: 'Nós ___ dois filhos.', opts: ['temos', 'têm', 'tem'], a: 0, fb: 'Con "nós" → "temos".' },
      { s: 'Você ___ tempo agora?', opts: ['tenho', 'tem', 'têm'], a: 1, fb: '"você" → "tem".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Você tens razão.', 'Você tem razão.', 'Você tenho razão.'], a: 1, fb: '"você" → "tem".' },
    ],
  },
  {
    slug: 'pronomes-pessoais',
    order: 6,
    title: 'Los pronombres personales en portugués (eu, você, ele, ela, nós, vocês, eles)',
    shortTitle: 'Pronombres personales',
    icon: '👤',
    seoTitle: 'Pronombres personales en portugués: você, sujeto omitido y ejercicios | A1',
    seoDescription:
      'Los pronombres personales en portugués: eu, você, ele, ela, nós, vocês, eles, elas. Por qué "você" es informal y va en 3.ª persona, y el sujeto omitido. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['pronombres personales portugués', 'você', 'você 3 persona', 'sujeto omitido portugués a1'],
    intro: [
      'Los pronombres personales sujeto del portugués brasileño son: eu (yo), você (tú/usted), ele/ela (él/ella), nós (nosotros), vocês (ustedes/vosotros), eles/elas (ellos/ellas). Como en español, el sujeto SE PUEDE OMITIR porque el verbo ya indica la persona.',
      'La gran sorpresa para el hispanohablante es "você": aunque parece formal (viene de "vossa mercê", como "usted"), en Brasil es la forma NORMAL e informal de "tú". Y se conjuga en TERCERA persona, igual que "ele/ela": "você fala", "você tem".',
      'En Brasil "tu" casi no se usa (sí en Portugal y en algunas regiones del sur). Para el plural se usa "vocês" (sirve para vosotros y ustedes), conjugado en 3.ª persona del plural ("vocês falam").',
    ],
    sections: [
      {
        heading: 'você: informal y en 3.ª persona',
        body: [
          '"você" es el "tú" cotidiano en Brasil, pero el verbo va en 3.ª persona del singular: "você fala", "você é", "você tem". No se dice "você falas" ni "você és".',
          'Para varias personas: "vocês", con verbo en 3.ª persona del plural: "vocês falam".',
        ],
      },
      {
        heading: 'El sujeto se puede omitir',
        body: [
          'Como en español, el pronombre es opcional porque la terminación del verbo identifica a la persona: "Falo português" = "Eu falo português". Se usa el pronombre para enfatizar o aclarar.',
        ],
      },
      {
        heading: 'ele/ela, eles/elas',
        body: [
          '"ele" = él, "ela" = ella; "eles" = ellos (o grupo mixto), "elas" = ellas (solo mujeres). Como en español, un grupo mixto usa el masculino "eles".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Pronombres personales',
        headers: ['Pronombre', 'Significado', 'Verbo (ej. ser)'],
        rows: [
          ['eu', 'yo', 'eu sou'],
          ['você', 'tú/usted (informal)', 'você é'],
          ['ele / ela', 'él / ella', 'ele é'],
          ['nós', 'nosotros/as', 'nós somos'],
          ['vocês', 'ustedes / vosotros', 'vocês são'],
          ['eles / elas', 'ellos / ellas', 'eles são'],
        ],
      },
    ],
    examples: [
      { en: 'Falo português e espanhol.', es: 'Hablo portugués y español.', note: 'sujeto "eu" omitido.' },
      { en: 'Você mora onde?', es: '¿Dónde vives (tú)?', note: '"você" → 3.ª persona.' },
      { en: 'Ele é meu amigo.', es: 'Él es mi amigo.' },
      { en: 'Nós moramos em São Paulo.', es: 'Vivimos en São Paulo.' },
      { en: 'Vocês falam inglês?', es: '¿Habláis/Hablan inglés?', note: '"vocês" → 3.ª persona plural.' },
      { en: 'Elas são irmãs.', es: 'Ellas son hermanas.', note: 'solo mujeres → "elas".' },
    ],
    contrast: [
      { es: 'Hablo portugués.', en: 'Falo português.', note: 'el sujeto se omite, como en español.' },
      { es: '¿Tú hablas inglés?', en: 'Você fala inglês?', note: '"você" va en 3.ª persona → "fala".' },
      { es: '¿Vosotros/Ustedes hablan?', en: 'Vocês falam?', note: '"vocês" → 3.ª persona plural.' },
      { es: 'Ellos son de Río.', en: 'Eles são do Rio.', note: 'grupo masculino o mixto → "eles".' },
      { es: 'Ella es profesora.', en: 'Ela é professora.', note: '"ela" = ella.' },
    ],
    commonMistakes: [
      { wrong: 'Você falas inglês?', right: 'Você fala inglês?', note: '"você" → 3.ª persona "fala".' },
      { wrong: 'Você és gentil.', right: 'Você é gentil.', note: '"você" usa "é", no "és".' },
      { wrong: 'Vocês fala inglês?', right: 'Vocês falam inglês?', note: '"vocês" → 3.ª persona plural "falam".' },
      { wrong: 'Eu falas português.', right: 'Eu falo português.', note: 'Con "eu" → "falo".' },
      { wrong: 'Elas são irmãos. (solo mujeres)', right: 'Elas são irmãs.', note: 'Solo mujeres → "elas / irmãs".' },
    ],
    tip: 'En portugués el sujeto se OMITE, como en español. Y "você" (tú informal en Brasil) se conjuga en 3.ª persona: "você fala, você é, você tem". El plural es "vocês".',
    questions: [
      { s: '___ falo português. (yo)', opts: ['Eu', 'Você', 'Ele', 'Nós'], a: 0, fb: '"yo" → "eu".' },
      { s: '___ fala inglês? (tú, informal)', opts: ['Eu', 'Você', 'Nós', 'Eles'], a: 1, fb: 'tú informal en Brasil → "você".' },
      { s: 'Você ___ inglês?', opts: ['fala', 'falas', 'falo'], a: 0, fb: '"você" → 3.ª persona "fala".' },
      { s: '___ falam inglês? (ustedes)', opts: ['Você', 'Vocês', 'Nós'], a: 1, fb: 'plural → "vocês".' },
      { s: '___ moramos em São Paulo. (nosotros)', opts: ['Eu', 'Nós', 'Vocês'], a: 1, fb: 'nosotros → "nós".' },
      { s: '___ é meu amigo. (él)', opts: ['Ele', 'Ela', 'Eles'], a: 0, fb: 'él → "ele".' },
      { s: '___ são irmãs. (solo mujeres)', opts: ['Eles', 'Elas', 'Vocês'], a: 1, fb: 'solo mujeres → "elas".' },
      { s: 'Vocês ___ inglês?', opts: ['fala', 'falam', 'falamos'], a: 1, fb: '"vocês" → 3.ª persona plural "falam".' },
      { s: '¿"você" se conjuga en…?', opts: ['2.ª persona', '3.ª persona', '1.ª persona'], a: 1, fb: '"você" va en 3.ª persona.' },
      { s: '¿Cómo se dice "Hablo portugués" (sin pronombre)?', opts: ['Eu falo português.', 'Falo português.', 'Me falo português.'], a: 1, fb: 'El sujeto se omite: "Falo português".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Você falas inglês?', 'Você fala inglês?', 'Você falo inglês?'], a: 1, fb: '"você" → "fala".' },
      { s: '___ são do Rio. (grupo mixto)', opts: ['Eles', 'Elas', 'Vocês'], a: 0, fb: 'grupo mixto → "eles".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Vocês fala inglês?', 'Vocês falam inglês?', 'Vocês falamos inglês?'], a: 1, fb: '"vocês" → "falam".' },
      { s: 'Eu ___ português. (falar)', opts: ['falo', 'fala', 'falas'], a: 0, fb: 'Con "eu" → "falo".' },
    ],
  },
  {
    slug: 'verbos-ar',
    order: 7,
    title: 'Los verbos regulares en -AR en presente (falar, morar)',
    shortTitle: 'Verbos en -AR',
    icon: '🗣️',
    seoTitle: 'Verbos en -AR en portugués (presente): conjugación y ejercicios | A1',
    seoDescription:
      'La conjugación de los verbos en -AR en presente: falar, morar, trabalhar. Terminaciones -o, -a, -amos, -am y la conjugación con você. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbos -ar portugués', 'falar conjugación', 'presente verbos ar portugués', 'terminaciones ar a1'],
    intro: [
      'Los verbos en -AR (falar, morar, trabalhar, estudar…) son el grupo más numeroso y regular del portugués, y se parecen muchísimo al español. Dominar este patrón te permite conjugar la mayoría de los verbos cotidianos.',
      'Se conjugan quitando -AR y añadiendo: -o (eu), -a (você/ele/ela), -amos (nós), -am (vocês/eles/elas). Así, "falar" → falo, fala, falamos, falam. Como en Brasil se usa "você" (3.ª persona), solo necesitas cuatro formas en la práctica.',
      'Cuidado con un detalle: la forma de "você/ele/ela" es "fala" (no "falas") y la de "vocês/eles/elas" es "falam" (no "falan"): el portugués escribe -m al final, no -n.',
    ],
    sections: [
      {
        heading: 'Las terminaciones (-o, -a, -amos, -am)',
        body: [
          'eu falo · você/ele/ela fala · nós falamos · vocês/eles/elas falam. Se parece al español, pero la 3.ª persona del plural termina en -am, escrito con -m: "falam".',
          'Como "tu" casi no se usa en Brasil, en la práctica manejas estas cuatro formas.',
        ],
      },
      {
        heading: 'Verbos frecuentes en -AR',
        body: [
          'morar (vivir/habitar), trabalhar (trabajar), estudar (estudiar), gostar (gustar), comprar (comprar), tomar (tomar/beber), chamar (llamar).',
          'Ojo con "gostar": se construye con "de": "Eu gosto de café" (me gusta el café).',
        ],
      },
      {
        heading: 'El sujeto se omite',
        body: [
          'Como en español, el pronombre es opcional: "Moro em São Paulo" ya significa "(Yo) vivo en São Paulo".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'falar (modelo de los verbos -AR)',
        headers: ['Pronombre', 'Forma', 'Terminación'],
        rows: [
          ['eu', 'falo', '-o'],
          ['você / ele / ela', 'fala', '-a'],
          ['nós', 'falamos', '-amos'],
          ['vocês / eles / elas', 'falam', '-am'],
        ],
      },
    ],
    examples: [
      { en: 'Eu falo português.', es: 'Hablo portugués.' },
      { en: 'Você mora onde?', es: '¿Dónde vives?', note: '"você" → "mora".' },
      { en: 'Nós trabalhamos juntos.', es: 'Trabajamos juntos.' },
      { en: 'Eles estudam na universidade.', es: 'Estudian en la universidad.', note: '-am → "estudam".' },
      { en: 'Eu gosto de café.', es: 'Me gusta el café.', note: '"gostar de".' },
      { en: 'Ela compra pão todos os dias.', es: 'Ella compra pan todos los días.' },
    ],
    contrast: [
      { es: 'Hablo portugués.', en: 'Falo português.', note: 'terminación -o, como en español.' },
      { es: 'Vivimos en Río.', en: 'Moramos no Rio.', note: '"nós" → -amos.' },
      { es: 'Ellos estudian.', en: 'Eles estudam.', note: '3.ª persona pl. → -am (con -m).' },
      { es: 'Me gusta el café.', en: 'Eu gosto de café.', note: '"gostar DE".' },
      { es: '¿Dónde vives?', en: 'Você mora onde?', note: '"você" → "mora".' },
    ],
    commonMistakes: [
      { wrong: 'Você falas português.', right: 'Você fala português.', note: '"você" → 3.ª persona "fala".' },
      { wrong: 'Eles falan.', right: 'Eles falam.', note: 'El portugués escribe -m: "falam".' },
      { wrong: 'Eu gosto café.', right: 'Eu gosto de café.', note: '"gostar" necesita "de".' },
      { wrong: 'Nós falemos.', right: 'Nós falamos.', note: 'Con "nós" → -amos.' },
      { wrong: 'Eu fala português.', right: 'Eu falo português.', note: 'Con "eu" → -o.' },
    ],
    tip: 'Quita -AR y añade -o (eu), -a (você/ele), -amos (nós), -am (vocês/eles). Ojo: la 3.ª pl. es -am con "m" (falam). Y "gostar" lleva "de": "gosto de café".',
    questions: [
      { s: 'Eu ___ português. (falar)', opts: ['falo', 'fala', 'falamos', 'falam'], a: 0, fb: 'Con "eu" → "falo".' },
      { s: 'Você ___ onde? (morar)', opts: ['moro', 'mora', 'moram'], a: 1, fb: '"você" → "mora".' },
      { s: 'Nós ___ juntos. (trabalhar)', opts: ['trabalho', 'trabalhamos', 'trabalham'], a: 1, fb: 'Con "nós" → "trabalhamos".' },
      { s: 'Eles ___ na universidade. (estudar)', opts: ['estuda', 'estudam', 'estudamos'], a: 1, fb: 'Con "eles" → "estudam".' },
      { s: 'Eu ___ de café. (gostar)', opts: ['gosto', 'gosta', 'gostam'], a: 0, fb: 'Con "eu" → "gosto".' },
      { s: 'Ela ___ pão. (comprar)', opts: ['compro', 'compra', 'compram'], a: 1, fb: 'Con "ela" → "compra".' },
      { s: 'Vocês ___ inglês? (falar)', opts: ['fala', 'falam', 'falamos'], a: 1, fb: '"vocês" → "falam".' },
      { s: 'Eu ___ em São Paulo. (morar)', opts: ['moro', 'mora', 'moram'], a: 0, fb: 'Con "eu" → "moro".' },
      { s: 'Eu gosto ___ café.', opts: ['de', '—', 'em'], a: 0, fb: '"gostar de café".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Você falas.', 'Você fala.', 'Você falo.'], a: 1, fb: '"você" → "fala".' },
      { s: '¿Cómo se escribe la 3.ª pl. de "falar"?', opts: ['falan', 'falam', 'falão'], a: 1, fb: 'Con -m: "falam".' },
      { s: 'Nós ___ na escola. (estudar)', opts: ['estudo', 'estudamos', 'estudam'], a: 1, fb: 'Con "nós" → "estudamos".' },
      { s: 'Você ___ café? (tomar)', opts: ['tomo', 'toma', 'tomam'], a: 1, fb: '"você" → "toma".' },
      { s: '¿Cómo se dice "Me gusta el café"?', opts: ['Eu gosto café.', 'Eu gosto de café.', 'Eu gosta de café.'], a: 1, fb: '"Eu gosto de café".' },
    ],
  },
  {
    slug: 'verbos-er-ir',
    order: 8,
    title: 'Los verbos regulares en -ER e -IR en presente (comer, abrir)',
    shortTitle: 'Verbos en -ER e -IR',
    icon: '📖',
    seoTitle: 'Verbos en -ER e -IR en portugués (presente): conjugación y ejercicios | A1',
    seoDescription:
      'La conjugación en presente de los verbos en -ER (comer) e -IR (abrir) en portugués. Terminaciones -o, -e, -emos/-imos, -em. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbos -er -ir portugués', 'comer abrir conjugación', 'presente verbos er ir portugués a1'],
    intro: [
      'Además de los -AR, el portugués tiene los verbos en -ER (comer, beber, viver) y en -IR (abrir, partir, dividir). Sus terminaciones se parecen entre sí y, en general, al español.',
      'Los -ER hacen: -o, -e, -emos, -em (como, come, comemos, comem). Los -IR hacen: -o, -e, -imos, -em (abro, abre, abrimos, abrem). La única diferencia entre los dos grupos está en "nós": -emos vs -imos.',
      'Recuerda que "você" usa la 3.ª persona ("come", "abre") y que la 3.ª del plural se escribe con -m ("comem", "abrem"), no con -n.',
    ],
    sections: [
      {
        heading: 'Verbos en -ER',
        body: [
          'eu como · você/ele/ela come · nós comemos · vocês/eles/elas comem. Verbos frecuentes: beber, viver, escrever, aprender, entender, vender.',
        ],
      },
      {
        heading: 'Verbos en -IR',
        body: [
          'eu abro · você/ele/ela abre · nós abrimos · vocês/eles/elas abrem. Igual que -ER, salvo "nós" → -imos. Verbos frecuentes: partir, dividir, decidir, assistir (ver/asistir), dormir.',
        ],
      },
      {
        heading: '-ER vs -IR: solo cambia "nós"',
        body: [
          'La diferencia práctica está en la 1.ª persona del plural: comemos (-ER) vs abrimos (-IR). Lo demás es idéntico (-o, -e, -em).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'comer (-ER) / abrir (-IR)',
        headers: ['Pronombre', 'comer', 'abrir'],
        rows: [
          ['eu', 'como', 'abro'],
          ['você / ele / ela', 'come', 'abre'],
          ['nós', 'comemos', 'abrimos'],
          ['vocês / eles / elas', 'comem', 'abrem'],
        ],
      },
    ],
    examples: [
      { en: 'Eu como pão no café da manhã.', es: 'Como pan en el desayuno.', note: '-ER.' },
      { en: 'Você bebe café?', es: '¿Bebes café?', note: '"você" → "bebe".' },
      { en: 'Nós comemos juntos.', es: 'Comemos juntos.', note: '-ER "nós" → -emos.' },
      { en: 'Ela abre a janela.', es: 'Ella abre la ventana.', note: '-IR.' },
      { en: 'Nós abrimos a loja às nove.', es: 'Abrimos la tienda a las nueve.', note: '-IR "nós" → -imos.' },
      { en: 'Eles assistem TV à noite.', es: 'Ven (la) tele por la noche.', note: '"assistir" = ver/asistir.' },
    ],
    contrast: [
      { es: 'Como pan.', en: 'Como pão.', note: '-ER → "como".' },
      { es: 'Comemos juntos.', en: 'Comemos juntos.', note: '-ER "nós" → -emos.' },
      { es: 'Abrimos la tienda.', en: 'Abrimos a loja.', note: '-IR "nós" → -imos.' },
      { es: 'Ellos beben café.', en: 'Eles bebem café.', note: '3.ª pl. → -em (con -m).' },
      { es: '¿Tú abres la puerta?', en: 'Você abre a porta?', note: '"você" → "abre".' },
    ],
    commonMistakes: [
      { wrong: 'Você comes pão.', right: 'Você come pão.', note: '"você" → 3.ª persona "come".' },
      { wrong: 'Eles comen.', right: 'Eles comem.', note: 'El portugués escribe -m: "comem".' },
      { wrong: 'Nós comimos (presente)', right: 'Nós comemos', note: '-ER en presente → "comemos".' },
      { wrong: 'Nós abremos', right: 'Nós abrimos', note: '-IR "nós" → -imos.' },
      { wrong: 'Eu come pão.', right: 'Eu como pão.', note: 'Con "eu" → -o.' },
    ],
    tip: '-ER: -o, -e, -emos, -em (como, come, comemos, comem). -IR: igual pero "nós" → -imos (abrimos). La 3.ª pl. va con -m (comem, abrem).',
    questions: [
      { s: 'Eu ___ pão. (comer)', opts: ['como', 'come', 'comemos', 'comem'], a: 0, fb: 'Con "eu" → "como".' },
      { s: 'Você ___ café? (beber)', opts: ['bebo', 'bebe', 'bebem'], a: 1, fb: '"você" → "bebe".' },
      { s: 'Nós ___ juntos. (comer)', opts: ['comimos', 'comemos', 'comem'], a: 1, fb: '-ER "nós" → "comemos".' },
      { s: 'Ela ___ a janela. (abrir)', opts: ['abro', 'abre', 'abrem'], a: 1, fb: 'Con "ela" → "abre".' },
      { s: 'Nós ___ a loja às nove. (abrir)', opts: ['abremos', 'abrimos', 'abrem'], a: 1, fb: '-IR "nós" → "abrimos".' },
      { s: 'Eles ___ café. (beber)', opts: ['bebe', 'bebem', 'bebemos'], a: 1, fb: 'Con "eles" → "bebem".' },
      { s: 'Eu ___ a porta. (abrir)', opts: ['abro', 'abre', 'abrem'], a: 0, fb: 'Con "eu" → "abro".' },
      { s: 'Você ___ em São Paulo? (viver)', opts: ['vivo', 'vive', 'vivem'], a: 1, fb: '"você" → "vive".' },
      { s: 'Vocês ___ TV? (assistir)', opts: ['assiste', 'assistem', 'assistimos'], a: 1, fb: '"vocês" → "assistem".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Você comes pão.', 'Você come pão.', 'Você como pão.'], a: 1, fb: '"você" → "come".' },
      { s: '¿Cómo se escribe la 3.ª pl. de "comer"?', opts: ['comen', 'comem', 'comeem'], a: 1, fb: 'Con -m: "comem".' },
      { s: 'Nós ___ português. (aprender)', opts: ['aprendimos', 'aprendemos', 'aprendem'], a: 1, fb: '-ER "nós" → "aprendemos".' },
      { s: 'Eles ___ a porta. (abrir)', opts: ['abre', 'abrem', 'abrimos'], a: 1, fb: 'Con "eles" → "abrem".' },
      { s: 'Eu ___ café. (beber)', opts: ['bebo', 'bebe', 'bebem'], a: 0, fb: 'Con "eu" → "bebo".' },
    ],
  },
  {
    slug: 'a-negacao',
    order: 9,
    title: 'La negación en portugués (não)',
    shortTitle: 'La negación (não)',
    icon: '🚫',
    seoTitle: 'La negación en portugués (não): explicación y ejercicios | A1',
    seoDescription:
      'Cómo formar la negación en portugués con "não" antes del verbo, y la doble negación (não… nunca, não… nada, não… ninguém). Como el español "no". Ejemplos y ejercicios. Nivel A1.',
    keywords: ['negación en portugués', 'não portugués', 'não nunca nada ninguém', 'doble negación portugués a1'],
    intro: [
      'La negación en portugués es facilísima para el hispanohablante: basta con poner "não" delante del verbo, igual que el "no" del español. "Falo inglês" → "Não falo inglês".',
      'La única diferencia es ortográfica y de pronunciación: se escribe "não" (con la tilde nasal ~) y suena nasal. Pero su función es exactamente la del "no" español.',
      'Como en español, el portugués usa la DOBLE negación: "não… nunca" (nunca), "não… nada" (nada), "não… ninguém" (nadie). "Não como nunca carne", "Não tem ninguém aqui".',
    ],
    sections: [
      {
        heading: 'não + verbo',
        body: [
          'La estructura es: "não" delante del verbo. "Não trabalho hoje", "Não estamos prontos". Si hay pronombre, "não" va antes de todo: "Não me chamo Pedro".',
          'En el habla, también existe el "não" al final como refuerzo: "Eu falo inglês, não." Pero lo básico es "não" antes del verbo.',
        ],
      },
      {
        heading: 'La doble negación (como en español)',
        body: [
          'El portugués combina "não" con otra palabra negativa después del verbo: não… nunca (nunca), não… nada (nada), não… ninguém (nadie), não… mais (ya no/más).',
          'Igual que en español: "Não vejo ninguém", "Não quero nada".',
        ],
      },
      {
        heading: 'Cuando la palabra negativa va primero',
        body: [
          'Si la palabra negativa va ANTES del verbo, se quita "não": "Ninguém fala" (nadie habla), "Nada é fácil" (nada es fácil). Como en español: "Nadie habla".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Afirmativa → negativa',
        headers: ['Afirmativa', 'Negativa'],
        rows: [
          ['Falo inglês.', 'Não falo inglês.'],
          ['Tenho tempo.', 'Não tenho tempo.'],
          ['Como carne.', 'Não como carne nunca.'],
          ['Tem alguém.', 'Não tem ninguém.'],
        ],
      },
      {
        caption: 'Dobles negaciones',
        headers: ['Estructura', 'Significado', 'Ejemplo'],
        rows: [
          ['não… nunca', 'nunca', 'Não fumo nunca.'],
          ['não… nada', 'nada', 'Não quero nada.'],
          ['não… ninguém', 'nadie', 'Não vejo ninguém.'],
          ['não… mais', 'ya no', 'Não trabalho mais.'],
        ],
      },
    ],
    examples: [
      { en: 'Não falo inglês.', es: 'No hablo inglés.', note: 'não + verbo.' },
      { en: 'Não tenho tempo.', es: 'No tengo tiempo.' },
      { en: 'Eu não gosto de peixe.', es: 'No me gusta el pescado.' },
      { en: 'Não como carne nunca.', es: 'Nunca como carne.', note: 'doble negación.' },
      { en: 'Não tem ninguém aqui.', es: 'No hay nadie aquí.', note: 'não… ninguém.' },
      { en: 'Ninguém fala.', es: 'Nadie habla.', note: 'negativo antes del verbo → sin "não".' },
    ],
    contrast: [
      { es: 'No hablo inglés.', en: 'Não falo inglês.', note: 'igual que el español: "não" antes del verbo.' },
      { es: 'No me gusta el pescado.', en: 'Não gosto de peixe.', note: '"não" antes del verbo.' },
      { es: 'Nunca fumo.', en: 'Não fumo nunca.', note: 'doble negación, como en español.' },
      { es: 'No hay nadie.', en: 'Não tem ninguém.', note: 'não… ninguém.' },
      { es: 'Nadie habla.', en: 'Ninguém fala.', note: 'negativo primero → sin "não".' },
    ],
    commonMistakes: [
      { wrong: 'Eu no falo inglês.', right: 'Eu não falo inglês.', note: 'Es "não" (con tilde nasal), no "no".' },
      { wrong: 'Falo não inglês.', right: 'Não falo inglês.', note: '"não" va antes del verbo.' },
      { wrong: 'Não tenho não tempo.', right: 'Não tenho tempo.', note: 'Solo un "não".' },
      { wrong: 'Não vejo alguém.', right: 'Não vejo ninguém.', note: 'En negativa → "ninguém".' },
      { wrong: 'Não quero algo.', right: 'Não quero nada.', note: 'En negativa → "nada".' },
    ],
    tip: 'Negar es fácil: "não" antes del verbo, como el "no" español (pero con tilde nasal). La doble negación funciona igual: "não… nunca", "não… nada", "não… ninguém".',
    questions: [
      { s: 'Eu ___ falo inglês.', opts: ['no', 'não', 'nada'], a: 1, fb: 'Es "não", no "no".' },
      { s: '___ tenho tempo.', opts: ['No', 'Não', 'Nunca'], a: 1, fb: '"Não tenho tempo".' },
      { s: 'Eu não gosto ___ peixe.', opts: ['de', 'a', 'em'], a: 0, fb: '"gostar de".' },
      { s: 'Não como ___ carne. (nunca)', opts: ['nunca', 'nada', 'ninguém'], a: 0, fb: 'nunca → "não… nunca".' },
      { s: 'Não quero ___. (nada)', opts: ['nunca', 'nada', 'ninguém'], a: 1, fb: 'nada → "não… nada".' },
      { s: 'Não tem ___ aqui. (nadie)', opts: ['nunca', 'nada', 'ninguém'], a: 2, fb: 'nadie → "não… ninguém".' },
      { s: 'Não trabalho ___. (ya no)', opts: ['nunca', 'mais', 'nada'], a: 1, fb: 'ya no → "não… mais".' },
      { s: '___ fala. (nadie, antes del verbo)', opts: ['Não', 'Ninguém', 'Nada'], a: 1, fb: 'Negativo antes del verbo → "Ninguém fala".' },
      { s: '¿Dónde va "não"?', opts: ['después del verbo', 'antes del verbo', 'al final'], a: 1, fb: '"não" va antes del verbo.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Eu no falo.', 'Eu não falo.', 'Eu falo no.'], a: 1, fb: 'Es "não falo".' },
      { s: '¿Cómo se dice "No hay nadie"?', opts: ['Tem ninguém.', 'Não tem ninguém.', 'Não tem alguém.'], a: 1, fb: '"Não tem ninguém".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Não quero algo.', 'Não quero nada.', 'Quero não nada.'], a: 1, fb: 'En negativa → "Não quero nada".' },
      { s: 'Você ___ fala português? (negativa)', opts: ['no', 'não', 'nunca'], a: 1, fb: '"Você não fala português?".' },
      { s: '___ é fácil. (nada, antes del verbo)', opts: ['Não', 'Nada', 'Nunca'], a: 1, fb: '"Nada é fácil".' },
    ],
  },
  {
    slug: 'perguntas',
    order: 10,
    title: 'Hacer preguntas en portugués (entonación e interrogativos)',
    shortTitle: 'Las preguntas',
    icon: '❓',
    seoTitle: 'Hacer preguntas en portugués (onde, como, quando): explicación y ejercicios | A1',
    seoDescription:
      'Cómo preguntar en portugués por entonación y con palabras interrogativas: onde, como, quando, quanto, por que, quem, o que. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['preguntas en portugués', 'onde como quando portugués', 'interrogativos portugués', 'o que quem a1'],
    intro: [
      'Hacer preguntas de sí/no en portugués es tan fácil como en español: usas la misma frase afirmativa y subes la entonación al final. "Você fala português." → "Você fala português?". No hay auxiliar ni inversión.',
      'Para pedir información concreta usamos palabras interrogativas al principio: onde (dónde), como (cómo), quando (cuándo), quanto (cuánto), por que (por qué), quem (quién), o que / que (qué).',
      'Una marca muy brasileña: es muy frecuente añadir "é que" después del interrogativo, sin cambiar el significado: "Onde você mora?" = "Onde é que você mora?". Y en el habla, el interrogativo puede ir al final: "Você mora onde?".',
    ],
    sections: [
      {
        heading: 'Preguntas de sí/no: solo la entonación',
        body: [
          'La estructura es idéntica a la afirmativa; cambia la entonación (y el "?"). "Você tem tempo?", "Ela é brasileira?". Exactamente como en español.',
        ],
      },
      {
        heading: 'Las palabras interrogativas',
        body: [
          'onde (dónde), como (cómo), quando (cuándo), quanto/a/os/as (cuánto, concuerda), por que (por qué), quem (quién), o que/que (qué).',
          'Suelen ir al principio: "Onde você mora?", "Como você está?", "Quanto custa?".',
        ],
      },
      {
        heading: '"o que" y el "é que" brasileño',
        body: [
          'Para "¿qué…?" se usa "o que" (o solo "que" en preguntas cortas): "O que você quer?", "Que horas são?". Y es muy común el refuerzo "é que": "O que é que você faz?" = "O que você faz?".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Palabras interrogativas',
        headers: ['Portugués', 'Español', 'Ejemplo'],
        rows: [
          ['onde', 'dónde', 'Onde você mora?'],
          ['como', 'cómo', 'Como você está?'],
          ['quando', 'cuándo', 'Quando você chega?'],
          ['quanto', 'cuánto', 'Quanto custa?'],
          ['por que', 'por qué', 'Por que você estuda?'],
          ['quem', 'quién', 'Quem é?'],
          ['o que', 'qué', 'O que você quer?'],
        ],
      },
    ],
    examples: [
      { en: 'Você fala português?', es: '¿Hablas portugués?', note: 'solo la entonación.' },
      { en: 'Onde você mora?', es: '¿Dónde vives?' },
      { en: 'Como você está?', es: '¿Cómo estás?' },
      { en: 'Quanto custa?', es: '¿Cuánto cuesta?' },
      { en: 'O que você quer?', es: '¿Qué quieres?', note: '"o que" = qué.' },
      { en: 'Quem é essa pessoa?', es: '¿Quién es esa persona?' },
    ],
    contrast: [
      { es: '¿Hablas portugués?', en: 'Você fala português?', note: 'igual que en español: solo la entonación.' },
      { es: '¿Dónde vives?', en: 'Onde você mora?', note: 'onde = dónde.' },
      { es: '¿Cómo estás?', en: 'Como você está?', note: 'como = cómo.' },
      { es: '¿Cuánto cuesta?', en: 'Quanto custa?', note: 'quanto = cuánto.' },
      { es: '¿Qué quieres?', en: 'O que você quer?', note: 'qué → "o que".' },
    ],
    commonMistakes: [
      { wrong: 'Que você mora? (=¿dónde?)', right: 'Onde você mora?', note: '"onde" = dónde; "o que" = qué.' },
      { wrong: 'Porque você estuda? (pregunta)', right: 'Por que você estuda?', note: 'Pregunta: "por que" separado; respuesta: "porque" junto.' },
      { wrong: 'Como está você? (rígido)', right: 'Como você está?', note: 'El orden natural es "Como você está?".' },
      { wrong: 'Que é? (¿quién es?)', right: 'Quem é?', note: '"quem" = quién.' },
      { wrong: 'Fala você português? (invertir)', right: 'Você fala português?', note: 'No se invierte: solo la entonación.' },
    ],
    tip: 'Preguntas sí/no: solo sube la entonación, como en español. Para info: onde, como, quando, quanto, por que, quem, o que. Y "¿qué?" → "o que".',
    questions: [
      { s: '___ você mora? (¿dónde?)', opts: ['Onde', 'Como', 'Quando', 'Quem'], a: 0, fb: '"onde" = dónde.' },
      { s: '___ você está? (¿cómo?)', opts: ['Onde', 'Como', 'Quando', 'Quem'], a: 1, fb: '"como" = cómo.' },
      { s: '___ custa? (¿cuánto?)', opts: ['Como', 'Quando', 'Quanto', 'Quem'], a: 2, fb: '"quanto" = cuánto.' },
      { s: '___ você chega? (¿cuándo?)', opts: ['Onde', 'Quando', 'Quanto', 'Quem'], a: 1, fb: '"quando" = cuándo.' },
      { s: '___ é essa pessoa? (¿quién?)', opts: ['Quem', 'Que', 'Onde', 'Como'], a: 0, fb: '"quem" = quién.' },
      { s: '___ você quer? (¿qué?)', opts: ['Quem', 'O que', 'Onde', 'Quanto'], a: 1, fb: '"o que" = qué.' },
      { s: '___ você estuda português? (¿por qué?)', opts: ['Por que', 'Como', 'Onde'], a: 0, fb: '"por que" (separado) = por qué.' },
      { s: '¿Cómo se hace una pregunta de sí/no?', opts: ['Invirtiendo el verbo', 'Solo con la entonación', 'Con un auxiliar'], a: 1, fb: 'Como en español: solo la entonación.' },
      { s: '¿Cómo se dice "¿Hablas portugués?"?', opts: ['Você fala português?', 'Fala você português?', 'Do you fala português?'], a: 0, fb: 'Solo la entonación: "Você fala português?".' },
      { s: '___ é? (¿quién es?)', opts: ['Quem', 'O que', 'Onde'], a: 0, fb: '"Quem é?".' },
      { s: '¿Cuál significa "qué"?', opts: ['quem', 'o que', 'onde'], a: 1, fb: '"o que / que" = qué.' },
      { s: '___ horas são? (¿qué hora?)', opts: ['Que', 'Quem', 'Onde'], a: 0, fb: '"Que horas são?".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Que você mora?', 'Onde você mora?', 'Quem você mora?'], a: 1, fb: 'Para lugar → "Onde".' },
      { s: '___ você vai? (¿dónde?)', opts: ['Onde', 'Como', 'Quanto'], a: 0, fb: '"onde" = dónde.' },
    ],
  },
  {
    slug: 'concordancia-adjetivos',
    order: 11,
    title: 'La concordancia de los adjetivos en portugués',
    shortTitle: 'Concordancia de adjetivos',
    icon: '🎨',
    seoTitle: 'Concordancia de los adjetivos en portugués (género y número): ejercicios | A1',
    seoDescription:
      'Cómo concuerdan los adjetivos en portugués: -o/-a/-os/-as y los adjetivos invariables en -e/-l. Su posición y diferencias con el español. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['concordancia adjetivos portugués', 'adjetivos -o -a portugués', 'adjetivos invariables portugués', 'concordância a1'],
    intro: [
      'En portugués, como en español, el adjetivo concuerda en género y número con el sustantivo: "um menino alto", "uma menina alta", "meninos altos", "meninas altas". La idea te resulta familiar; el funcionamiento es casi idéntico al español.',
      'Los adjetivos que terminan en -o tienen cuatro formas (-o/-a/-os/-as): bonito → bonito/bonita/bonitos/bonitas. Los que terminan en -e o en consonante suelen ser invariables en género: "inteligente" (masc. y fem.), "feliz" → "felizes" (solo cambia en plural).',
      'La mayoría de los adjetivos van DESPUÉS del nombre, igual que en español ("um carro vermelho"); algunos muy comunes pueden ir delante ("um grande amigo", "uma boa ideia").',
    ],
    sections: [
      {
        heading: 'Adjetivos de cuatro formas (-o/-a/-os/-as)',
        body: [
          'Concuerdan en género y número: alto → alto/alta/altos/altas. "Um menino alto", "uma menina alta", "dois meninos altos", "duas meninas altas".',
        ],
      },
      {
        heading: 'Adjetivos invariables en género (-e, consonante)',
        body: [
          'Los terminados en -e no distinguen género: "inteligente" sirve para masculino y femenino. En plural añaden -s: "inteligentes". Los en -l/-z cambian en plural: "fácil → fáceis", "feliz → felizes".',
        ],
      },
      {
        heading: 'La posición del adjetivo',
        body: [
          'La mayoría va DESPUÉS del nombre, sobre todo color y nacionalidad: "um carro vermelho", "uma comida brasileira". Algunos frecuentes pueden ir delante con matiz: "um grande amigo", "uma boa ideia".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Adjetivo de cuatro formas (alto)',
        headers: ['', 'Singular', 'Plural'],
        rows: [
          ['Masculino', 'alto', 'altos'],
          ['Femenino', 'alta', 'altas'],
        ],
      },
      {
        caption: 'Adjetivos invariables en género',
        headers: ['Tipo', 'Singular', 'Plural'],
        rows: [
          ['-e', 'inteligente', 'inteligentes'],
          ['-l', 'fácil', 'fáceis'],
          ['-z', 'feliz', 'felizes'],
        ],
      },
    ],
    examples: [
      { en: 'um menino alto', es: 'un niño alto', note: '-o masc. sing.' },
      { en: 'uma menina alta', es: 'una niña alta', note: '-a fem. sing.' },
      { en: 'meninas bonitas', es: 'niñas bonitas', note: 'fem. pl. → -as.' },
      { en: 'uma pessoa inteligente', es: 'una persona inteligente', note: '-e: no cambia con el género.' },
      { en: 'um carro vermelho', es: 'un carro rojo', note: 'el color va después del nombre.' },
      { en: 'crianças felizes', es: 'niños felices', note: 'feliz → felizes (plural).' },
    ],
    contrast: [
      { es: 'una niña alta', en: 'uma menina alta', note: 'concuerda en -a, como en español.' },
      { es: 'una persona inteligente', en: 'uma pessoa inteligente', note: '-e: no cambia con el género.' },
      { es: 'niños felices', en: 'crianças felizes', note: 'feliz → felizes.' },
      { es: 'un carro rojo', en: 'um carro vermelho', note: 'el color va detrás del nombre.' },
      { es: 'una buena idea', en: 'uma boa ideia', note: '"boa" (bom→boa) va delante.' },
    ],
    commonMistakes: [
      { wrong: 'uma menina alto', right: 'uma menina alta', note: 'Debe concordar: fem. → -a.' },
      { wrong: 'uma pessoa inteligenta', right: 'uma pessoa inteligente', note: 'Los adjetivos en -e no hacen femenino en -a.' },
      { wrong: 'crianças felizs', right: 'crianças felizes', note: 'feliz → felizes.' },
      { wrong: 'um vermelho carro', right: 'um carro vermelho', note: 'El color va después del nombre.' },
      { wrong: 'pessoas fácils', right: 'pessoas fáceis', note: '-l → -eis: "fáceis".' },
    ],
    tip: 'Adjetivos en -o: cuatro formas (-o/-a/-os/-as). Adjetivos en -e: invariables en género (inteligente). El color va después del nombre, como en español.',
    questions: [
      { s: 'uma menina ___ (alto)', opts: ['alto', 'alta', 'altos', 'altas'], a: 1, fb: 'Fem. sing. → "alta".' },
      { s: 'dois meninos ___ (alto)', opts: ['alto', 'alta', 'altos', 'altas'], a: 2, fb: 'Masc. pl. → "altos".' },
      { s: 'duas meninas ___ (bonito)', opts: ['bonitos', 'bonitas', 'bonita'], a: 1, fb: 'Fem. pl. → "bonitas".' },
      { s: 'uma pessoa ___ (inteligente)', opts: ['inteligento', 'inteligente', 'inteligenta'], a: 1, fb: '-e: no cambia en género.' },
      { s: 'um carro ___ (vermelho)', opts: ['vermelho carro', 'vermelho', 'vermelha'], a: 1, fb: 'El color va después: "carro vermelho".' },
      { s: 'crianças ___ (feliz)', opts: ['felizs', 'felizes', 'feliza'], a: 1, fb: 'feliz → "felizes".' },
      { s: 'pessoas ___ (fácil → no, usar "fácil")', opts: ['fácils', 'fáceis', 'fáciles'], a: 1, fb: '-l → -eis: "fáceis".' },
      { s: 'um ___ amigo (grande, antes)', opts: ['grande', 'granda', 'grão'], a: 0, fb: '"um grande amigo".' },
      { s: 'uma comida ___ (brasileiro)', opts: ['brasileiro', 'brasileira', 'brasileiras'], a: 1, fb: 'Fem. sing. → "brasileira".' },
      { s: '¿Cuál es CORRECTA?', opts: ['uma menina alto', 'uma menina alta', 'uma menina altas'], a: 1, fb: 'Concuerda en fem. → "alta".' },
      { s: '¿Cómo se dice "una persona inteligente"?', opts: ['uma pessoa inteligenta', 'uma pessoa inteligente', 'um pessoa inteligente'], a: 1, fb: '-e: invariable en género.' },
      { s: 'uma ___ ideia (bom → boa)', opts: ['bom', 'boa', 'boas'], a: 1, fb: 'bom → "boa" (femenino).' },
      { s: '¿Cuál es CORRECTA?', opts: ['um vermelho carro', 'um carro vermelho', 'um carro vermelha'], a: 1, fb: 'El color va después y concuerda.' },
      { s: 'meninos ___ (feliz)', opts: ['felizs', 'felizes', 'feliz'], a: 1, fb: 'feliz → "felizes".' },
    ],
  },
  {
    slug: 'possessivos',
    order: 12,
    title: 'Los posesivos en portugués (meu, minha, seu, sua…)',
    shortTitle: 'Posesivos (meu/minha)',
    icon: '🔐',
    seoTitle: 'Los posesivos en portugués (meu, minha, seu, sua): explicación y ejercicios | A1',
    seoDescription:
      'Los posesivos en portugués: meu, minha, seu, sua, nosso, nossa, dele/dela. Cómo concuerdan con el objeto y el uso de "dele/dela" para evitar ambigüedad. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['posesivos portugués', 'meu minha seu sua', 'dele dela', 'posesivos brasileño a1'],
    intro: [
      'Los posesivos portugueses concuerdan en género y número con el OBJETO poseído, igual que en español: "meu livro", "minha casa", "meus amigos", "minhas amigas". Tu instinto de hispanohablante funciona muy bien aquí.',
      'Las formas básicas: meu/minha (mi), seu/sua (tu/su), nosso/nossa (nuestro). En portugués es habitual ponerles el artículo delante: "o meu livro", "a minha casa" (también es correcto sin él).',
      'El punto delicado es "seu/sua": puede significar "tu" (de você) o "su" (de él/ella), lo que crea ambigüedad. Por eso el brasileño usa muchísimo "dele" (de él) y "dela" (de ella): "o carro dele" (el carro de él), "a casa dela" (la casa de ella).',
    ],
    sections: [
      {
        heading: 'meu/minha, seu/sua, nosso/nossa',
        body: [
          'Concuerdan con el objeto: "meu carro" (masc.), "minha casa" (fem.), "meus carros", "minhas casas". Igual para seu/sua y nosso/nossa.',
          'Es habitual el artículo delante: "o meu carro", "a minha casa".',
        ],
      },
      {
        heading: 'dele / dela: la solución brasileña a la ambigüedad',
        body: [
          'Como "seu/sua" puede ser "tu" o "su", para evitar confusión se usa "dele" (de él), "dela" (de ella), "deles/delas" (de ellos/ellas): "o livro dele", "a casa dela". Estos NO concuerdan con el objeto, sino que indican al dueño.',
          'Es lo más natural en Brasil: "Esse é o carro dele" en vez de "Esse é o seu carro".',
        ],
      },
      {
        heading: 'Concuerda con el objeto, no con el dueño',
        body: [
          'Como en español, "meu/minha" concuerdan con lo poseído: "minha casa" (casa es femenino), aunque el dueño sea hombre. "Seu/sua" igual: "sua casa" (de él o de ella).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Posesivos',
        headers: ['Dueño', 'Masc. sing.', 'Fem. sing.', 'Plural'],
        rows: [
          ['mi', 'meu', 'minha', 'meus / minhas'],
          ['tu/su (você)', 'seu', 'sua', 'seus / suas'],
          ['nuestro', 'nosso', 'nossa', 'nossos / nossas'],
          ['de él/ella', 'dele / dela', 'dele / dela', 'deles / delas'],
        ],
      },
    ],
    examples: [
      { en: 'meu livro / minha casa', es: 'mi libro / mi casa', note: 'concuerda con el objeto.' },
      { en: 'o meu carro é novo', es: 'mi carro es nuevo', note: 'artículo + posesivo (normal en portugués).' },
      { en: 'meus amigos', es: 'mis amigos', note: 'plural → "meus".' },
      { en: 'o carro dele', es: 'el carro de él', note: '"dele" evita la ambigüedad de "seu".' },
      { en: 'a casa dela', es: 'la casa de ella', note: '"dela" = de ella.' },
      { en: 'nossa cidade é linda', es: 'nuestra ciudad es linda', note: '"nossa" concuerda en femenino.' },
    ],
    contrast: [
      { es: 'mi casa', en: 'minha casa', note: 'concuerda con el objeto (fem.).' },
      { es: 'mi carro', en: '(o) meu carro', note: 'habitual con artículo: "o meu carro".' },
      { es: 'el carro de él', en: 'o carro dele', note: 'el brasileño usa "dele" para evitar ambigüedad.' },
      { es: 'la casa de ella', en: 'a casa dela', note: '"dela" = de ella.' },
      { es: 'mis amigos', en: 'meus amigos', note: 'plural → "meus".' },
    ],
    commonMistakes: [
      { wrong: 'meu casa', right: 'minha casa', note: '"casa" es femenino → "minha".' },
      { wrong: 'minha carro', right: 'meu carro', note: '"carro" es masculino → "meu".' },
      { wrong: 'o carro de ele', right: 'o carro dele', note: 'de + ele se contrae en "dele".' },
      { wrong: 'meus amigas', right: 'minhas amigas', note: 'Concuerda en fem. pl. → "minhas".' },
      { wrong: 'nosso cidade', right: 'nossa cidade', note: '"cidade" es femenino → "nossa".' },
    ],
    tip: 'Los posesivos concuerdan con el objeto: "meu livro / minha casa". Es normal el artículo: "o meu livro". Y para evitar la ambigüedad de "seu/sua", el brasileño usa "dele/dela".',
    questions: [
      { s: '___ livro é novo. (mi)', opts: ['meu', 'minha', 'meus'], a: 0, fb: '"livro" masc. → "meu".' },
      { s: '___ casa é grande. (mi)', opts: ['meu', 'minha', 'meus'], a: 1, fb: '"casa" fem. → "minha".' },
      { s: '___ amigos moram aqui. (mis)', opts: ['meu', 'minha', 'meus'], a: 2, fb: 'Masc. pl. → "meus".' },
      { s: '___ amigas são legais. (mis)', opts: ['meus', 'minhas', 'minha'], a: 1, fb: 'Fem. pl. → "minhas".' },
      { s: 'o carro ___ (de él)', opts: ['dele', 'dela', 'seu'], a: 0, fb: '"dele" = de él.' },
      { s: 'a casa ___ (de ella)', opts: ['dele', 'dela', 'seu'], a: 1, fb: '"dela" = de ella.' },
      { s: '___ cidade é linda. (nuestra)', opts: ['nosso', 'nossa', 'nossos'], a: 1, fb: '"cidade" fem. → "nossa".' },
      { s: '___ carro é azul. (nuestro)', opts: ['nosso', 'nossa', 'nossos'], a: 0, fb: '"carro" masc. → "nosso".' },
      { s: '¿Cómo se dice "el carro de él"?', opts: ['o carro de ele', 'o carro dele', 'o seu carro de ele'], a: 1, fb: 'de + ele → "dele".' },
      { s: '¿Cuál es CORRECTA?', opts: ['meu casa', 'minha casa', 'meus casa'], a: 1, fb: '"casa" fem. → "minha".' },
      { s: '¿Cómo se dice "mi carro" (con artículo)?', opts: ['o minha carro', 'o meu carro', 'a meu carro'], a: 1, fb: '"o meu carro".' },
      { s: 'a casa ___ (de ellos)', opts: ['dele', 'deles', 'dela'], a: 1, fb: '"deles" = de ellos.' },
      { s: '___ pais moram no Rio. (mis)', opts: ['meu', 'meus', 'minha'], a: 1, fb: 'Plural → "meus".' },
      { s: '¿Cuál es CORRECTA?', opts: ['minha carro', 'meu carro', 'meus carro'], a: 1, fb: '"carro" masc. → "meu".' },
    ],
  },
  {
    slug: 'contracoes',
    order: 13,
    title: 'Las contracciones de preposición y artículo en portugués (do, no, ao, pelo)',
    shortTitle: 'Contracciones (do/no/ao)',
    icon: '🔗',
    seoTitle: 'Contracciones en portugués (do, no, ao, pelo): preposición + artículo y ejercicios | A1',
    seoDescription:
      'Las contracciones obligatorias del portugués: de+o=do, em+o=no, a+o=ao, por+o=pelo. Cómo se fusionan las preposiciones con el artículo. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['contracciones portugués', 'do no ao pelo', 'de+o em+o a+o portugués', 'preposición artículo portugués a1'],
    intro: [
      'En portugués, cuando las preposiciones "de, em, a, por" van seguidas de un artículo, se FUSIONAN obligatoriamente en una sola palabra. Donde el español solo contrae "a+el=al" y "de+el=del", el portugués contrae muchísimo más.',
      'Las cuatro familias clave: de + o/a = do/da (del/de la); em + o/a = no/na (en el/en la); a + o/a = ao/à (al/a la); por + o/a = pelo/pela (por el/por la). Y sus plurales (dos, nas, aos, pelas…).',
      'Estas contracciones son obligatorias: no se puede decir "de o" ni "em a". Hay que decir "do", "na". Es de lo que más hay que automatizar, porque aparece en casi todas las frases.',
    ],
    sections: [
      {
        heading: 'de + artículo = do / da',
        body: [
          'de + o = do, de + a = da, de + os = dos, de + as = das. "A casa do João" (la casa de João), "o nome da menina", "os livros dos alunos".',
          'También con "dele/dela" (de + ele/ela), que viste en los posesivos.',
        ],
      },
      {
        heading: 'em + artículo = no / na · a + artículo = ao / à',
        body: [
          'em + o = no, em + a = na: "no Brasil", "na escola", "na mesa". a + o = ao, a + a = à: "Vou ao mercado", "Vou à praia".',
          'Ojo con "à" (a + a): lleva acento grave y se pronuncia como una sola "a".',
        ],
      },
      {
        heading: 'por + artículo = pelo / pela',
        body: [
          'por + o = pelo, por + a = pela: "Obrigado pela ajuda" (gracias por la ayuda), "pelo telefone" (por teléfono).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Contracciones (+ o / a / os / as)',
        headers: ['Prep.', '+ o', '+ a', '+ os', '+ as'],
        rows: [
          ['de', 'do', 'da', 'dos', 'das'],
          ['em', 'no', 'na', 'nos', 'nas'],
          ['a', 'ao', 'à', 'aos', 'às'],
          ['por', 'pelo', 'pela', 'pelos', 'pelas'],
        ],
      },
    ],
    examples: [
      { en: 'A casa do João.', es: 'La casa de João.', note: 'de + o = do.' },
      { en: 'O livro está na mesa.', es: 'El libro está sobre/en la mesa.', note: 'em + a = na.' },
      { en: 'Eu moro no Brasil.', es: 'Vivo en Brasil.', note: 'em + o = no.' },
      { en: 'Vou ao mercado.', es: 'Voy al mercado.', note: 'a + o = ao.' },
      { en: 'Vou à praia.', es: 'Voy a la playa.', note: 'a + a = à.' },
      { en: 'Obrigado pela ajuda.', es: 'Gracias por la ayuda.', note: 'por + a = pela.' },
    ],
    contrast: [
      { es: 'la casa del niño', en: 'a casa do menino', note: 'de + o = do (como "del").' },
      { es: 'en la mesa', en: 'na mesa', note: 'em + a = na (el español no contrae "en la").' },
      { es: 'en Brasil', en: 'no Brasil', note: 'em + o = no.' },
      { es: 'voy al mercado', en: 'vou ao mercado', note: 'a + o = ao (como "al").' },
      { es: 'gracias por la ayuda', en: 'obrigado pela ajuda', note: 'por + a = pela.' },
    ],
    commonMistakes: [
      { wrong: 'a casa de o João', right: 'a casa do João', note: 'de + o = "do".' },
      { wrong: 'em a mesa', right: 'na mesa', note: 'em + a = "na".' },
      { wrong: 'Vou a o mercado.', right: 'Vou ao mercado.', note: 'a + o = "ao".' },
      { wrong: 'Moro em o Brasil.', right: 'Moro no Brasil.', note: 'em + o = "no".' },
      { wrong: 'Obrigado por a ajuda.', right: 'Obrigado pela ajuda.', note: 'por + a = "pela".' },
    ],
    tip: 'Las preposiciones de/em/a/por se FUSIONAN con el artículo: do/da, no/na, ao/à, pelo/pela. Es obligatorio: nunca "de o" ni "em a".',
    questions: [
      { s: 'A casa ___ João. (de + o)', opts: ['de o', 'do', 'no'], a: 1, fb: 'de + o = "do".' },
      { s: 'O livro está ___ mesa. (em + a)', opts: ['em a', 'na', 'da'], a: 1, fb: 'em + a = "na".' },
      { s: 'Eu moro ___ Brasil. (em + o)', opts: ['em o', 'no', 'ao'], a: 1, fb: 'em + o = "no".' },
      { s: 'Vou ___ mercado. (a + o)', opts: ['a o', 'ao', 'no'], a: 1, fb: 'a + o = "ao".' },
      { s: 'Vou ___ praia. (a + a)', opts: ['a a', 'à', 'na'], a: 1, fb: 'a + a = "à".' },
      { s: 'Obrigado ___ ajuda. (por + a)', opts: ['por a', 'pela', 'pelo'], a: 1, fb: 'por + a = "pela".' },
      { s: 'O nome ___ menina. (de + a)', opts: ['de a', 'da', 'na'], a: 1, fb: 'de + a = "da".' },
      { s: 'Os livros ___ alunos. (de + os)', opts: ['de os', 'dos', 'nos'], a: 1, fb: 'de + os = "dos".' },
      { s: 'Falo ___ telefone. (por + o)', opts: ['por o', 'pelo', 'no'], a: 1, fb: 'por + o = "pelo".' },
      { s: '¿Cuál es CORRECTA?', opts: ['a casa de o João', 'a casa do João', 'a casa no João'], a: 1, fb: 'de + o = "do".' },
      { s: '¿Cómo se dice "en la mesa"?', opts: ['em a mesa', 'na mesa', 'da mesa'], a: 1, fb: 'em + a = "na mesa".' },
      { s: 'Vou ___ escola. (a + a)', opts: ['a a', 'à', 'na'], a: 1, fb: 'a + a = "à escola".' },
      { s: 'Estou ___ casa. (em + a)', opts: ['em a', 'na', 'da'], a: 1, fb: 'em + a = "na casa".' },
      { s: '¿Cómo se dice "voy al mercado"?', opts: ['vou a o mercado', 'vou ao mercado', 'vou no mercado'], a: 1, fb: 'a + o = "ao mercado".' },
    ],
  },
  {
    slug: 'ha-tem',
    order: 14,
    title: 'Há y tem en portugués (hay)',
    shortTitle: 'Há / tem (hay)',
    icon: '📍',
    seoTitle: 'Há y tem en portugués (hay): explicación y ejercicios | A1',
    seoDescription:
      'Cómo decir "hay" en portugués con "há" (formal) y "tem" (coloquial brasileño). Forma negativa, uso invariable y diferencias con el español. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['há tem portugués', 'hay en portugués', 'tem hay brasileño', 'há tem diferencia a1'],
    intro: [
      'Para decir "hay" (que algo existe en un lugar), el portugués tiene dos opciones: "há" (más formal/escrito) y "tem" (la forma normal en el habla de Brasil). Las dos son invariables: sirven para singular y plural, igual que el "hay" español.',
      '"Tem um livro na mesa" = "Hay un libro sobre la mesa"; "Tem muitas pessoas aqui" = "Hay mucha gente aquí". Para el hispanohablante lo más fácil es usar "tem", que es lo que oirás todo el tiempo en Brasil.',
      'Ojo: aquí "tem" NO significa "tiene" (aunque es la misma forma del verbo "ter"); en este uso impersonal significa "hay". El contexto lo deja claro: "Tem pão?" = "¿Hay pan?".',
    ],
    sections: [
      {
        heading: 'há y tem: invariables',
        body: [
          'Las dos no cambian con el número: "Há um problema" / "Há muitos problemas"; "Tem um livro" / "Tem muitos livros". Como el "hay" español.',
          'Registro: "há" es más formal y escrito; "tem" es coloquial y dominante en Brasil.',
        ],
      },
      {
        heading: 'Negativo y pregunta',
        body: [
          'Negativo: "Não há…" / "Não tem…": "Não tem pão", "Não há ninguém". Pregunta: solo la entonación: "Tem um banheiro aqui?", "Há vagas?".',
          'Respuesta corta brasileña: "Tem sim / Não tem".',
        ],
      },
      {
        heading: '"tem" = hay (no "tiene")',
        body: [
          'En este uso impersonal, "tem" no lleva sujeto y significa "hay": "Tem gente lá fora" (hay gente afuera). No lo confundas con "ele tem" (él tiene), que sí lleva sujeto.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'há / tem (hay)',
        headers: ['Forma', 'há (formal)', 'tem (coloquial)'],
        rows: [
          ['Afirmativa', 'Há um livro.', 'Tem um livro.'],
          ['Plural', 'Há dois livros.', 'Tem dois livros.'],
          ['Negativa', 'Não há pão.', 'Não tem pão.'],
          ['Pregunta', 'Há vagas?', 'Tem vaga?'],
        ],
      },
    ],
    examples: [
      { en: 'Tem um livro na mesa.', es: 'Hay un libro sobre la mesa.', note: '"tem" = hay (coloquial).' },
      { en: 'Há muitas pessoas aqui.', es: 'Hay mucha gente aquí.', note: '"há" = hay (formal).' },
      { en: 'Não tem pão na padaria.', es: 'No hay pan en la panadería.', note: 'negativo → "não tem".' },
      { en: 'Tem um banheiro aqui?', es: '¿Hay un baño aquí?', note: 'pregunta por entonación.' },
      { en: 'Tem dois carros na garagem.', es: 'Hay dos carros en el garaje.', note: 'invariable en plural.' },
      { en: 'Não há ninguém.', es: 'No hay nadie.', note: '"não há" + ninguém.' },
    ],
    contrast: [
      { es: 'Hay un problema.', en: 'Tem um problema. / Há um problema.', note: '"tem" (coloquial) o "há" (formal).' },
      { es: 'Hay dos libros.', en: 'Tem dois livros.', note: 'invariable (el español tampoco cambia).' },
      { es: 'No hay pan.', en: 'Não tem pão.', note: 'negativo → "não tem".' },
      { es: '¿Hay un baño?', en: 'Tem um banheiro?', note: 'pregunta por entonación.' },
      { es: 'No hay nadie.', en: 'Não tem ninguém.', note: '"não tem" + ninguém.' },
    ],
    commonMistakes: [
      { wrong: 'Têm dois livros. (=hay)', right: 'Tem dois livros.', note: 'En el sentido de "hay", "tem" es invariable (sin acento).' },
      { wrong: 'É um livro na mesa. (=hay)', right: 'Tem um livro na mesa.', note: '"hay" → "tem/há", no "é".' },
      { wrong: 'Não tem não pão.', right: 'Não tem pão.', note: 'Solo un "não".' },
      { wrong: 'Há de pessoas.', right: 'Há pessoas. / Tem pessoas.', note: 'No se añade "de".' },
      { wrong: 'Tem alguém? — para negar: "Não tem alguém"', right: 'Não tem ninguém.', note: 'En negativa → "ninguém".' },
    ],
    tip: '"hay" se dice "tem" (coloquial, lo normal en Brasil) o "há" (formal). Las dos son invariables, como el "hay" español. Negativo: "não tem / não há".',
    questions: [
      { s: '___ um livro na mesa. (hay, coloquial)', opts: ['Tem', 'É', 'Têm'], a: 0, fb: '"tem" = hay (coloquial).' },
      { s: '___ muitas pessoas aqui. (hay, formal)', opts: ['Há', 'É', 'São'], a: 0, fb: '"há" = hay (formal).' },
      { s: 'Não ___ pão na padaria. (no hay)', opts: ['tem', 'é', 'são'], a: 0, fb: 'negativo → "não tem".' },
      { s: '___ dois carros na garagem. (hay)', opts: ['Tem', 'Têm', 'São'], a: 0, fb: '"tem" es invariable: también para plural.' },
      { s: '___ um banheiro aqui? (pregunta)', opts: ['Tem', 'É', 'Têm'], a: 0, fb: '"Tem um banheiro?".' },
      { s: 'Não ___ ninguém. (no hay)', opts: ['tem', 'é', 'são'], a: 0, fb: '"não tem ninguém".' },
      { s: '"hay" en lenguaje formal es…', opts: ['tem', 'há', 'é'], a: 1, fb: '"há" (formal).' },
      { s: '"hay" en el habla de Brasil es…', opts: ['há', 'tem', 'são'], a: 1, fb: '"tem" (coloquial).' },
      { s: '¿Cuál es CORRECTA? (=hay dos libros)', opts: ['Têm dois livros.', 'Tem dois livros.', 'São dois livros.'], a: 1, fb: '"tem" es invariable: "Tem dois livros".' },
      { s: '¿Cómo se dice "Hay un problema"?', opts: ['É um problema.', 'Tem um problema.', 'Têm um problema.'], a: 1, fb: '"Tem um problema" (o "Há um problema").' },
      { s: '¿"tem" (=hay) lleva sujeto?', opts: ['Sí', 'No, es impersonal'], a: 1, fb: 'En el sentido de "hay" es impersonal.' },
      { s: 'Não ___ vagas. (no hay, formal)', opts: ['há', 'é', 'são'], a: 0, fb: '"não há vagas".' },
      { s: '___ gente lá fora. (hay)', opts: ['Tem', 'É', 'São'], a: 0, fb: '"Tem gente lá fora".' },
      { s: '¿Cómo se dice "No hay nadie"?', opts: ['Tem ninguém.', 'Não tem ninguém.', 'Não tem alguém.'], a: 1, fb: '"Não tem ninguém".' },
    ],
  },
  {
    slug: 'presente-continuo',
    order: 15,
    title: 'El presente continuo en portugués (estar + gerúndio)',
    shortTitle: 'Presente continuo (estar + -ndo)',
    icon: '🏃',
    seoTitle: 'Presente continuo en portugués (estar + gerúndio): explicación y ejercicios | A1',
    seoDescription:
      'El presente continuo en portugués brasileño: estar + gerúndio (estou falando). Cómo formar el gerundio (-ando, -endo, -indo) y su uso para acciones en curso. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['presente continuo portugués', 'estar gerúndio', 'estou falando', 'gerundio portugués -ando a1'],
    intro: [
      'El presente continuo describe lo que está pasando AHORA, en este momento. En portugués brasileño se forma con "estar" (en presente) + el GERÚNDIO del verbo: "Estou falando" = "Estoy hablando". Es prácticamente igual al español "estar + gerundio".',
      'El gerundio se forma según la conjugación: los verbos en -AR hacen -ando (falar → falando), los en -ER hacen -endo (comer → comendo) y los en -IR hacen -indo (abrir → abrindo).',
      'Nota cultural: en Portugal se usa "estar a + infinitivo" (estou a falar), pero en Brasil —y para el CELPE-Bras— lo normal es "estar + gerúndio" (estou falando). Es la forma que te recomendamos aprender.',
    ],
    sections: [
      {
        heading: 'La fórmula: estar + gerúndio',
        body: [
          'Conjuga "estar" según el sujeto y añade el gerundio: "Estou estudando", "Você está comendo", "Nós estamos saindo". El gerundio no cambia; lo que cambia es "estar".',
          'Es casi idéntico al español: "estoy estudiando" → "estou estudando".',
        ],
      },
      {
        heading: 'Cómo formar el gerúndio',
        body: [
          '-AR → -ando: falar → falando, trabalhar → trabalhando. -ER → -endo: comer → comendo, fazer → fazendo. -IR → -indo: abrir → abrindo, dormir → dormindo.',
          'Es muy regular: solo cambias la terminación del infinitivo por -ndo con la vocal correspondiente.',
        ],
      },
      {
        heading: 'Brasil (gerúndio) vs Portugal (a + infinitivo)',
        body: [
          'Brasil: "estar + gerúndio" → "Estou trabalhando". Portugal: "estar a + infinitivo" → "Estou a trabalhar". Para el portugués brasileño (CELPE-Bras), usa el gerundio.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'estar + gerúndio',
        headers: ['Pronombre', 'estar', 'Ejemplo'],
        rows: [
          ['eu', 'estou', 'estou falando'],
          ['você / ele / ela', 'está', 'está comendo'],
          ['nós', 'estamos', 'estamos saindo'],
          ['vocês / eles / elas', 'estão', 'estão estudando'],
        ],
      },
      {
        caption: 'El gerúndio',
        headers: ['Conjugación', 'Terminación', 'Ejemplo'],
        rows: [
          ['-AR', '-ando', 'falar → falando'],
          ['-ER', '-endo', 'comer → comendo'],
          ['-IR', '-indo', 'abrir → abrindo'],
        ],
      },
    ],
    examples: [
      { en: 'Estou estudando agora.', es: 'Estoy estudiando ahora.', note: 'estar + gerundio.' },
      { en: 'Você está comendo?', es: '¿Estás comiendo?', note: '"você" → "está".' },
      { en: 'Ela está trabalhando.', es: 'Ella está trabajando.', note: '-AR → -ando.' },
      { en: 'Nós estamos saindo.', es: 'Estamos saliendo.', note: '-IR → -indo.' },
      { en: 'Eles estão dormindo.', es: 'Están durmiendo.', note: 'dormir → dormindo.' },
      { en: 'O que você está fazendo?', es: '¿Qué estás haciendo?', note: 'fazer → fazendo.' },
    ],
    contrast: [
      { es: 'Estoy estudiando.', en: 'Estou estudando.', note: 'casi idéntico: estar + gerundio.' },
      { es: 'Ella está comiendo.', en: 'Ela está comendo.', note: '-ER → -endo.' },
      { es: 'Estamos saliendo.', en: 'Estamos saindo.', note: '-IR → -indo.' },
      { es: '¿Qué estás haciendo?', en: 'O que você está fazendo?', note: '"você" → "está".' },
      { es: 'Están durmiendo.', en: 'Eles estão dormindo.', note: 'con "eles" → "estão".' },
    ],
    commonMistakes: [
      { wrong: 'Eu falando agora.', right: 'Estou falando agora.', note: 'Falta "estar": "estou falando".' },
      { wrong: 'Você está come.', right: 'Você está comendo.', note: 'El verbo va en gerundio: "comendo".' },
      { wrong: 'Estou comeno.', right: 'Estou comendo.', note: '-ER → -endo: "comendo".' },
      { wrong: 'Eles está estudando.', right: 'Eles estão estudando.', note: 'Con "eles" → "estão".' },
      { wrong: 'Estou a falar. (en Brasil)', right: 'Estou falando.', note: 'En Brasil se usa el gerundio.' },
    ],
    tip: 'Presente continuo = estar + gerúndio (estou falando), casi como en español. Gerundio: -AR → -ando, -ER → -endo, -IR → -indo. En Brasil se usa el gerundio (no "a + infinitivo").',
    questions: [
      { s: 'Eu ___ estudando. (estar)', opts: ['estou', 'está', 'estamos', 'estão'], a: 0, fb: 'Con "eu" → "estou".' },
      { s: 'Você está ___. (comer)', opts: ['come', 'comendo', 'comando'], a: 1, fb: '-ER → -endo: "comendo".' },
      { s: 'Ela está ___. (trabalhar)', opts: ['trabalhando', 'trabalhendo', 'trabalha'], a: 0, fb: '-AR → -ando: "trabalhando".' },
      { s: 'Nós ___ saindo. (estar)', opts: ['estou', 'estamos', 'estão'], a: 1, fb: 'Con "nós" → "estamos".' },
      { s: 'Eles estão ___. (dormir)', opts: ['dormendo', 'dormindo', 'dormando'], a: 1, fb: '-IR → -indo: "dormindo".' },
      { s: 'O que você está ___? (fazer)', opts: ['fazendo', 'fazindo', 'fazando'], a: 0, fb: 'fazer (-ER) → "fazendo".' },
      { s: 'Gerundio de "falar":', opts: ['falendo', 'falando', 'falindo'], a: 1, fb: '-AR → "falando".' },
      { s: 'Gerundio de "abrir":', opts: ['abrendo', 'abrindo', 'abrando'], a: 1, fb: '-IR → "abrindo".' },
      { s: 'Eu estou ___. (ler → "ler" es -ER, "lendo")', opts: ['lendo', 'lindo', 'leando'], a: 0, fb: '-ER → "lendo".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Eu falando agora.', 'Estou falando agora.', 'Eu está falando.'], a: 1, fb: 'Falta "estar": "Estou falando".' },
      { s: '¿Cómo se dice "Estoy comiendo"?', opts: ['Estou come.', 'Estou comendo.', 'Estou a comer.'], a: 1, fb: 'En Brasil → "Estou comendo".' },
      { s: 'Vocês estão ___. (estudar)', opts: ['estudando', 'estudendo', 'estuda'], a: 0, fb: '-AR → "estudando".' },
      { s: 'Eles ___ dormindo. (estar)', opts: ['está', 'estão', 'estamos'], a: 1, fb: 'Con "eles" → "estão".' },
      { s: '¿Cómo se forma el continuo en Brasil?', opts: ['estar a + infinitivo', 'estar + gerúndio', 'ir + infinitivo'], a: 1, fb: 'Brasil: "estar + gerúndio".' },
    ],
  },
];

export function getTopic(slug: string): GrammarTopic | undefined {
  return findTopic(TOPICS, slug);
}

export function getTopicNav(slug: string): { prev: GrammarTopic | null; next: GrammarTopic | null } {
  return topicNav(TOPICS, slug);
}
