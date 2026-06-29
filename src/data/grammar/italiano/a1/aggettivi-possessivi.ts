import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'aggettivi-possessivi',
  order: '10',
  color: '#009246',
  category: 'Determinantes',
  level: 'A1',
  title: 'Aggettivi possessivi en italiano A1 — mio, tuo, suo y familia',
  shortTitle: 'Posesivos (mio/tuo/suo...)',
  metaTitle: 'Posesivos en italiano A1 — mio mia miei mie, tuo sua nostro loro',
  description:
    'Los posesivos italianos concuerdan en género y número con el objeto poseído. Llevan artículo (il mio libro, la mia casa) EXCEPTO con sustantivos de familia en singular: mio padre, mia sorella. Loro es invariable y siempre lleva artículo.',
  lead: 'Posesivos: mio/mia/miei/mie (mi), tuo/tua/tuoi/tue (tu), suo/sua/suoi/sue (su). Con artículo: il mio libro. Sin artículo con familia: mio padre, mia sorella. Loro = siempre con artículo: il loro padre.',
  outcomes: [
    'Usa los posesivos italianos concordando en género y número con el sustantivo',
    'Aplica la regla del artículo con posesivos y la excepción de los sustantivos de familia',
    'Distingue loro (invariable, siempre con artículo) del resto de posesivos',
  ],

  guide: {
    goal: 'Usar los adjetivos posesivos italianos con y sin artículo según el contexto.',
    model: 'il mio libro / la mia borsa / i miei amici / le mie sorelle / mio padre / il loro padre',
    formula: 'artículo + posesivo + sustantivo (regla general) | posesivo + sustantivo de familia singular (excepción)',
    decisions: [
      'mio/mia/miei/mie = mi (concuerda con el objeto, no con el poseedor)',
      'tuo/tua/tuoi/tue = tu (tu libro, tua madre, tuoi amici, tue sorelle)',
      'suo/sua/suoi/sue = su/su (de él o de ella)',
      'nostro/nostra/nostri/nostre = nuestro/a/os/as',
      'vostro/vostra/vostri/vostre = vuestro/a/os/as',
      'loro = de ellos/ellas (INVARIABLE: il loro libro, la loro casa)',
      'EXCEPCIÓN: sin artículo con familia singular: mio padre, tua madre, suo fratello',
      'Loro SIEMPRE lleva artículo incluso con familia: il loro padre, la loro madre',
    ],
    table: [
      ['Posesivo', 'Masc. sg.', 'Fem. sg.'],
      ['mi', 'il mio / mio padre', 'la mia / mia madre'],
      ['tu', 'il tuo / tuo fratello', 'la tua / tua sorella'],
      ['su', 'il suo / suo padre', 'la sua / sua madre'],
      ['nuestro', 'il nostro', 'la nostra'],
      ['vuestro', 'il vostro', 'la vostra'],
      ['de ellos/as', 'il loro (siempre artículo)', 'la loro (siempre artículo)'],
    ],
    mistakes: [
      '"Mio el libro" — MAL: el artículo va ANTES del posesivo: "il mio libro".',
      '"Il mio padre" — MAL con familia singular: "mio padre" (sin artículo il).',
      '"Il loro padre" — CORRECTO: loro siempre lleva artículo, incluso con familia.',
    ],
  },
  seo: [
    {
      heading: 'Los posesivos en italiano: concordancia con el objeto poseído',
      paragraphs: [
        'Una diferencia clave respecto al español: los posesivos italianos concuerdan con el objeto poseído, no con el poseedor. "La mia sorella" = mi hermana (mia porque sorella es femenino). "Il mio fratello" = mi hermano (mio porque fratello es masculino). El poseedor es irrelevante para la forma del posesivo.',
        'Los posesivos se colocan antes del sustantivo y llevan artículo determinado: il mio libro (mi libro), la tua casa (tu casa), i suoi amici (sus amigos), le nostre lezioni (nuestras clases). Esta estructura artículo + posesivo + sustantivo es la regla general.',
      ],
    },
    {
      heading: 'La excepción clave: sustantivos de familia sin artículo',
      paragraphs: [
        'Con los sustantivos de familia en singular (padre, madre, fratello, sorella, figlio, figlia, nonno, nonna, marito, moglie, zio, zia, cugino), los posesivos de primera a quinta persona NO llevan artículo: mio padre, tua madre, suo fratello, nostra sorella, vostra figlia.',
        'Esta excepción tiene condiciones importantes: solo en singular, solo con posesivos mio/tuo/suo/nostro/vostro. En plural sí hay artículo: i miei fratelli, le tue sorelle. Y con loro siempre hay artículo: il loro padre, la loro madre. Formas afectivas o aumentativos también llevan artículo: il mio fratellone.',
      ],
    },
    {
      heading: 'Loro: el posesivo invariable',
      paragraphs: [
        'Loro es especial: nunca cambia de forma (a diferencia de mio/mia/miei/mie). Il loro libro, la loro casa, i loro amici, le loro sorelle — siempre "loro". Además, siempre lleva artículo, incluso con sustantivos de familia: il loro padre (no "loro padre").',
        'Suo/sua/suoi/sue puede significar "su" de él O de ella. El contexto aclara: "Zhanna parla con suo marito" (su marido de Zhanna = el marido de ella). Si hay ambigüedad, se especifica: "il marito di Zhanna".',
      ],
    },
  ],
  visual: {
    mode: 'grammar-table',
    teacherLens: 'El estudiante aprende la regla del artículo y la excepción de familia como dos reglas distintas.',
    graphicPrompt: 'Tabla de posesivos con 4 formas. Casa con etiquetas de familia sin artículo. Loro marcado como invariable.',
    scene: [
      ['il mio / la mia', 'masculino / femenino singular'],
      ['i miei / le mie', 'masculino / femenino plural'],
      ['mio padre / mia madre', 'familia singular: sin artículo'],
      ['il loro / la loro', 'loro: siempre con artículo'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['artículo antes del posesivo', 'familia singular sin artículo', 'loro siempre con artículo', 'loro invariable'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Posesivo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma posesiva correcta para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Mi libro',
            lines: [['Carlo', '___ libro è interessante. (mi libro)']],
            options: ['Il mio', 'La mia', 'I miei', 'Mio'],
            answer: 'Il mio',
            explain: 'Libro = masculino singular → il mio libro. Artículo + posesivo.',
          },
          {
            scene: 'Tu hermana',
            lines: [['Sofia', '___ sorella studia il coreano. (tu hermana)']],
            options: ['Tua', 'Il tuo', 'La tua', 'Tue'],
            answer: 'Tua',
            explain: 'Sorella = familia singular → SIN artículo: tua sorella (no la tua sorella).',
          },
          {
            scene: 'Su casa',
            lines: [['David', 'Zhanna abita in ___ casa. (su casa de ella)']],
            options: ['la sua', 'il suo', 'le sue', 'sua'],
            answer: 'la sua',
            explain: 'Casa = femenino singular, no es familia → artículo + posesivo: la sua casa.',
          },
          {
            scene: 'Nuestros amigos',
            lines: [['Ana', '___ amici vengono stasera. (nuestros amigos)']],
            options: ['I nostri', 'La nostra', 'Il nostro', 'Nostri'],
            answer: 'I nostri',
            explain: 'Amici = masculino plural → i nostri amici. Artículo plural + posesivo pl.',
          },
          {
            scene: 'Su padre (de ellos)',
            lines: [['Marco', '___ padre lavora a Roma. (el padre de ellos)']],
            options: ['Il loro', 'Loro', 'La loro', 'Il suo'],
            answer: 'Il loro',
            explain: 'Loro + familia singular → SIEMPRE lleva artículo: il loro padre.',
          },
          {
            scene: 'Tus clases',
            lines: [['Lina', '___ lezioni di italiano sono fantastiche! (tus clases)']],
            options: ['Le tue', 'La tua', 'Il tuo', 'I tuoi'],
            answer: 'Le tue',
            explain: 'Lezioni = femenino plural → le tue lezioni. Artículo + posesivo pl. fem.',
          },
          {
            scene: 'Mi madre',
            lines: [['Sofia', '___ madre parla quattro lingue! (mi madre)']],
            options: ['Mia', 'La mia', 'Il mio', 'Mio'],
            answer: 'Mia',
            explain: 'Madre = familia singular → SIN artículo: mia madre (no la mia madre).',
          },
          {
            scene: 'Vuestros libros',
            lines: [['David', 'Dove sono ___ libri? (vuestros libros)']],
            options: ['i vostri', 'il vostro', 'la vostra', 'le vostre'],
            answer: 'i vostri',
            explain: 'Libri = masculino plural → i vostri libri.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Familia y objetos',
        tag: '2 espacios',
        intro: 'Completa con el posesivo correcto con o sin artículo.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando de familia',
            lines: [
              ['Carlo', '[[0]] padre è medico e [[1]] madre è insegnante. (mi padre / mi madre)'],
            ],
            blanks: [
              { options: ['Mio', 'Il mio', 'La mia'], answer: 'Mio', explain: 'Padre = familia sg → sin artículo: Mio padre.' },
              { options: ['mia', 'la mia', 'il mio'], answer: 'mia', explain: 'Madre = familia sg → sin artículo: mia madre.' },
            ],
          },
          {
            scene: 'Objetos en clase',
            lines: [['David', 'Dov\'è [[0]] penna, Sofia? E dove sono [[1]] quaderni?']],
            blanks: [
              { options: ['la tua', 'tua', 'il tuo'], answer: 'la tua', explain: 'Penna = femenino singular, objeto → con artículo: la tua penna.' },
              { options: ['i tuoi', 'le tue', 'il tuo'], answer: 'i tuoi', explain: 'Quaderni = masculino plural → i tuoi quaderni.' },
            ],
          },
          {
            scene: 'La familia de ellos',
            lines: [['Zhanna', '[[0]] figli studiano a Milano e [[1]] casa è grande. (de ellos)']],
            blanks: [
              { options: ['I loro', 'Loro', 'Le loro'], answer: 'I loro', explain: 'Figli = masc. pl. → i loro figli. Loro siempre con artículo.' },
              { options: ['la loro', 'loro', 'il loro'], answer: 'la loro', explain: 'Casa = fem. sg. → la loro casa. Loro siempre con artículo.' },
            ],
          },
          {
            scene: 'Mi hermano y su trabajo',
            lines: [['Ana', '[[0]] fratello lavora in una scuola. [[1]] studenti lo adorano.']],
            blanks: [
              { options: ['Mio', 'Il mio', 'Mia'], answer: 'Mio', explain: 'Fratello = familia sg → mio fratello, sin artículo.' },
              { options: ['I suoi', 'Il suo', 'Le sue'], answer: 'I suoi', explain: 'Studenti = masc. pl., objeto → i suoi studenti con artículo.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'La famiglia WeLearn',
        tag: 'Opciones',
        intro: 'Completa el texto sobre la familia y objetos de los personajes de WeLearn.',
        type: 'guidedText',
        scene: 'David y Zhanna hablan de sus familias y sus cosas',
        text: 'David: "[[0]] moglie si chiama Zhanna. [[1]] famiglia viene dall\'Ucraina. Abbiamo due gatti — [[2]] nomi sono Luna e Sole." Zhanna: "[[3]] scuola si chiama WeLearn. [[4]] studenti vengono da tutta Colombia. [[5]] sorella vive a Kiev e mi manca molto."',
        blanks: [
          { options: ['Mia', 'La mia', 'Il mio'], answer: 'Mia', explain: 'Moglie = familia sg → sin artículo: Mia moglie.' },
          { options: ['La sua', 'Sua', 'Il suo'], answer: 'La sua', explain: 'Famiglia = sustantivo, no familia directa → con artículo: La sua famiglia.' },
          { options: ['i loro', 'loro', 'le loro'], answer: 'i loro', explain: 'Nomi = masc. pl. → i loro nomi. Loro siempre con artículo.' },
          { options: ['La nostra', 'Nostra', 'Il nostro'], answer: 'La nostra', explain: 'Scuola = fem. sg., objeto → con artículo: La nostra scuola.' },
          { options: ['I nostri', 'Nostri', 'Le nostre'], answer: 'I nostri', explain: 'Studenti = masc. pl. → i nostri studenti.' },
          { options: ['Mia', 'La mia', 'Mio'], answer: 'Mia', explain: 'Sorella = familia sg → sin artículo: mia sorella.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el posesivo con el artículo correcto (o sin él si corresponde).',
        type: 'freeText',
        scene: 'Lina describe su vida y sus cosas',
        text: '[[0]] casa è piccola ma accogliente. (mi casa) [[1]] fratello abita vicino. (mi hermano) [[2]] libri di italiano sono ovunque. (mis libros) [[3]] madre cucina benissimo. (mi madre) [[4]] amici vengono spesso a studiare. (mis amigos) [[5]] professore si chiama David. (mi profe)',
        blanks: [
          { answer: 'La mia', explain: 'Casa = fem. sg., objeto → con artículo: La mia casa.' },
          { answer: 'Mio', explain: 'Fratello = familia sg → sin artículo: Mio fratello.' },
          { answer: 'I miei', explain: 'Libri = masc. pl. → i miei libri.' },
          { answer: 'Mia', explain: 'Madre = familia sg → sin artículo: Mia madre.' },
          { answer: 'I miei', explain: 'Amici = masc. pl. → i miei amici.' },
          { answer: 'Il mio', explain: 'Professore = masc. sg., no familia directa del poseedor → con artículo: Il mio professore.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la oración completa con el posesivo correcto.',
        type: 'write',
        items: [
          {
            scene: 'Mi padre habla italiano',
            prompt: 'Escribe: Mi padre habla italiano muy bien. → ___ parla molto bene l\'italiano.',
            answer: 'Mio padre parla molto bene l\'italiano.',
            accepted: ['mio padre parla molto bene l\'italiano', 'mio padre parla molto bene italiano'],
            explain: 'Padre = familia sg → sin artículo: Mio padre (no Il mio padre).',
          },
          {
            scene: 'Sus libros (de ellos)',
            prompt: 'Escribe: Sus libros están sobre la mesa. (de ellos) → ___ libri sono sul tavolo.',
            answer: 'I loro libri sono sul tavolo.',
            accepted: ['i loro libri sono sul tavolo', 'i loro libri sono sul tavolo.'],
            explain: 'Loro + libri (masc. pl.) = i loro libri. Loro siempre con artículo.',
          },
          {
            scene: 'Nuestra clase',
            prompt: 'Escribe: Nuestra clase de italiano es fantástica. → ___ lezione di italiano è fantastica.',
            answer: 'La nostra lezione di italiano è fantastica.',
            accepted: ['la nostra lezione di italiano è fantastica', 'la nostra lezione di italiano e fantastica'],
            explain: 'Lezione = fem. sg. → con artículo: La nostra lezione.',
          },
          {
            scene: 'Tu hermana',
            prompt: 'Escribe: Tu hermana estudia en Roma. → ___ studia a Roma.',
            answer: 'Tua sorella studia a Roma.',
            accepted: ['tua sorella studia a roma', 'tua sorella studia a Roma.'],
            explain: 'Sorella = familia sg → sin artículo: Tua sorella (no La tua sorella).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe a tu familia y tus objetos usando posesivos correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Tu familia',
            prompt: 'Descrivi la tua famiglia: ___ padre/madre... ___ fratello/sorella...',
            answer: 'Mio padre lavora a Bogotá. Mia madre è insegnante. Mia sorella studia l\'università.',
            accepted: ['mio padre', 'mia madre', 'mio fratello', 'mia sorella'],
            explain: 'Familia sg → sin artículo: mio padre, mia madre, mio fratello, mia sorella.',
          },
          {
            scene: 'Tus cosas de clase',
            prompt: 'Descrivi i tuoi oggetti: ___ libri... ___ penna... ___ zaino...',
            answer: 'I miei libri sono nuovi. La mia penna è rossa. Il mio zaino è pesante.',
            accepted: ['i miei libri', 'la mia penna', 'il mio zaino'],
            explain: 'Objetos con artículo: i miei (pl. masc.), la mia (sing. fem.), il mio (sing. masc.).',
          },
          {
            scene: 'La familia de WeLearn',
            prompt: 'Parla di David e Zhanna: ___ scuola si chiama WeLearn. ___ studenti...',
            answer: 'La loro scuola si chiama WeLearn. I loro studenti vengono da tutta Colombia.',
            accepted: ['la loro scuola', 'i loro studenti'],
            explain: 'Loro siempre con artículo: la loro scuola, i loro studenti.',
          },
        ],
      },
    ],
  },
}

export default topic
