import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjetivos-posesivos',
  order: '13',
  color: '#1a2ecc',
  category: 'Adjetivos',
  level: 'A1',
  title: 'Adjetivos posesivos en ruso: мой, твой, его, её, наш, ваш, их',
  shortTitle: 'Posesivos',
  metaTitle: 'Posesivos en ruso A1 | мой, моя, твой, его, её, наш, ваш, их',
  description:
    'Posesivos rusos: мой/моя/моё/мои (moy/moya/moyo/moi = mi/mis), твой/твоя/твоё/твои (tvoy/tvoya = tu/tus), его (yevo = su de él, invariable), её (yeyó = su de ella, invariable), наш/наша/наше/наши (nash = nuestro), ваш/ваша/ваше/ваши (vash = vuestro/su formal), их (ikh = su de ellos/ellas, invariable). Singularidad: его/её/их NO concuerdan con el sustantivo que sigue — siempre tienen la misma forma.',
  lead: 'Aprende los posesivos rusos y su singularidad clave: его/её/их son invariables — nunca cambian sin importar el género o número del sustantivo.',
  outcomes: [
    'Usar мой/моя/моё/мои y твой/твоя/твоё/твои con concordancia de género',
    'Aplicar наш/наша/наше/наши y ваш/ваша/ваше/ваши correctamente',
    'Reconocer que его/её/их son invariables y no concuerdan con el sustantivo',
  ],
  guide: {
    goal: 'Usar los posesivos rusos con la concordancia correcta o saber cuándo son invariables.',
    model: '[Posesivo concordado o invariable] + [sustantivo]',
    formula: 'мой брат / моя сестра / его брат / его сестра (его nunca cambia)',
    decisions: [
      '¿El poseedor es yo? → мой (masc) / моя (fem) / моё (ntr) / мои (pl)',
      '¿El poseedor es tú? → твой (masc) / твоя (fem) / твоё (ntr) / твои (pl)',
      '¿El poseedor es él? → его (yevo) — INVARIABLE, nunca cambia',
      '¿El poseedor es ella? → её (yeyó) — INVARIABLE, nunca cambia',
      '¿El poseedor somos nosotros? → наш / наша / наше / наши (concuerda)',
      '¿El poseedor sois vosotros o es usted? → ваш / ваша / ваше / ваши (concuerda)',
      '¿El poseedor son ellos/ellas? → их (ikh) — INVARIABLE, nunca cambia',
    ],
    table: [
      ['Poseedor', 'Masculino', 'Femenino / Neutro / Plural'],
      ['Я (yo)', 'мой (moy)', 'моя / моё / мои'],
      ['Ты (tú)', 'твой (tvoy)', 'твоя / твоё / твои'],
      ['Он (él)', 'его (yevo) — INVARIABLE', 'его / его / его'],
      ['Она (ella)', 'её (yeyó) — INVARIABLE', 'её / её / её'],
      ['Мы (nosotros)', 'наш (nash)', 'наша / наше / наши'],
      ['Вы (vosotros/Ud.)', 'ваш (vash)', 'ваша / ваше / ваши'],
      ['Они (ellos)', 'их (ikh) — INVARIABLE', 'их / их / их'],
    ],
    mistakes: [
      'его/её/их son INVARIABLES: "su casa de él" = его дом Y "su libro de él" = его книга. No hay его/егоя/егоё — siempre его.',
      'No confundas её posesivo (su = de ella) con её acusativo/genitivo del pronombre она (a ella / de ella). El contexto lo aclara.',
      'наш y ваш sí concuerdan: наша семья (nuestra familia, fem), нашего (genitivo) — a diferencia de его/её/их.',
      'Мой/твой tienen acento móvil: мой, моя, моё, мои. Asegúrate de pronunciar la vocal correcta.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo concuerdan los posesivos en ruso?',
      paragraphs: [
        'En ruso, los posesivos de primera y segunda persona (мой, твой, наш, ваш) concuerdan en género, número y caso con el sustantivo que acompañan, igual que los adjetivos. Мой брат (mi hermano, masc), моя сестра (mi hermana, fem), моё письмо (mi carta, ntr), мои друзья (mis amigos, pl).',
        'Esta concordancia es familiar para el hispanohablante (mi/mis, nuestro/nuestra). Lo nuevo es tener formas distintas para masculino singular, femenino singular, neutro singular y plural.',
      ],
      table: [
        ['Posesivo', 'Masc', 'Fem', 'Ntr', 'Pl'],
        ['мой (mi)', 'мой', 'моя', 'моё', 'мои'],
        ['твой (tu)', 'твой', 'твоя', 'твоё', 'твои'],
        ['наш (nuestro)', 'наш', 'наша', 'наше', 'наши'],
        ['ваш (vuestro/su)', 'ваш', 'ваша', 'ваше', 'ваши'],
      ],
    },
    {
      heading: '¿Por qué его, её e их son posesivos invariables?',
      paragraphs: [
        'La gran singularidad de los posesivos rusos de tercera persona: его (su de él), её (su de ella) y их (su de ellos/ellas) son INVARIABLES. No cambian según el género ni el número del sustantivo. Его брат (su hermano de él) y его сестра (su hermana de él) — его es exactamente igual en ambos casos.',
        'Esto ocurre porque его/её/их son en realidad formas del caso genitivo de los pronombres он/она/они, no adjetivos posesivos como мой. Este origen explica por qué no se declinan como adjetivos.',
      ],
    },
    {
      heading: '¿Cómo cambian мой, твой, наш y ваш según el género?',
      paragraphs: [
        'Los posesivos de 1ª y 2ª persona concuerdan en género, número y caso con el objeto poseído, no con el poseedor (al revés que en español, donde "su" no cambia). Para "mi": мой (masculino, мой брат = mi hermano), моя (femenino, моя сестра = mi hermana), моё (neutro, моё окно = mi ventana), мои (plural, мои книги = mis libros). Igual se comportan твой/твоя/твоё/твои (tu), наш/наша/наше/наши (nuestro) y ваш/ваша/ваше/ваши (vuestro/su formal).',
        'La trampa para el hispanohablante es doble: (1) hay que elegir la forma según el género de la cosa poseída, no de quien posee; (2) esto NO afecta a его, её e их, que son invariables. Así, моя книга cambia a мой стол según el sustantivo, pero его книга y его стол se dicen igual.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The invariability of его/её/их is the key cognitive challenge — students from Romance language backgrounds expect all possessives to agree. Drilling "его дом / его книга / его письмо" (all the same) cements this pattern.',
    graphicPrompt:
      'Two-column comparison: left "Concuerdan" with мой/моя/моё table, right "INVARIABLE" box with его/её/их showing same form with different nouns. Blue theme.',
    scene: [
      ['Мой брат', 'moy brat — mi hermano (masc)'],
      ['Моя сестра', 'moya sestra — mi hermana (fem)'],
      ['Его брат', 'yevo brat — su hermano de él (masc, invariable)'],
      ['Его сестра', 'yevo sestra — su hermana de él (fem, его NO cambia)'],
      ['Её книга', 'yeyó kniga — su libro de ella (invariable)'],
      ['Наша школа', 'nasha shkola — nuestra escuela (fem)'],
      ['Ваш учитель', 'vash uchítel — su/vuestro profesor (masc)'],
      ['Их дом', 'ikh dom — su casa de ellos (invariable)'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['мой/моя/моё/мои concordancia', 'его/её/их invariables', 'наш/ваш igual que мой'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento de posesivos',
        tag: 'Opción múltiple',
        intro: 'Elige el posesivo correcto para cada contexto.',
        type: 'choice',
        items: [
          { scene: 'мой concordancia masc', lines: [['', '"___ брат" — "mi hermano" (брат = masc)']], options: ['моя', 'мой', 'моё', 'мои'], answer: 'мой', explain: 'Мой (moy) = mi, masculino singular. брат es masculino → мой.' },
          { scene: 'моя concordancia fem', lines: [['', '"___ сестра" — "mi hermana" (сестра = fem)']], options: ['мой', 'моё', 'моя', 'мои'], answer: 'моя', explain: 'Моя (moya) = mi, femenino singular. сестра es femenino → моя.' },
          { scene: 'его invariable', lines: [['', '"___ книга" — "su libro de él" (книга = fem, poseedor = он)']], options: ['его', 'её', 'егоя'], answer: 'его', explain: 'Его (yevo) = su de él. Es INVARIABLE — no cambia aunque книга sea femenino.' },
          { scene: 'её invariable', lines: [['', '"___ брат" — "su hermano de ella" (брат = masc, poseedor = она)']], options: ['его', 'её', 'их'], answer: 'её', explain: 'Её (yeyó) = su de ella. Es INVARIABLE — no cambia aunque брат sea masculino.' },
          { scene: 'наш concordancia fem', lines: [['', '"___ школа" — "nuestra escuela" (школа = fem)']], options: ['наш', 'нашa', 'наше', 'наши'], answer: 'нашa', explain: 'Наша (nasha) = nuestra, femenino. школа es femenino → наша.' },
          { scene: 'ваш formal masc', lines: [['', '"___ учитель" — "su profesor/vuestro profesor" (учитель = masc)']], options: ['ваша', 'ваше', 'ваш', 'ваши'], answer: 'ваш', explain: 'Ваш (vash) = su/vuestro, masculino. учитель es masculino → ваш.' },
          { scene: 'их invariable', lines: [['', '"___ дом" — "su casa de ellos" (дом = masc, poseedores = они)']], options: ['его', 'её', 'их', 'ихний'], answer: 'их', explain: 'Их (ikh) = su de ellos/ellas. Es INVARIABLE.' },
          { scene: 'твой concordancia ntr', lines: [['', '"___ письмо" — "tu carta" (письмо = neutro)']], options: ['твой', 'твоя', 'твоё', 'твои'], answer: 'твоё', explain: 'Твоё (tvoyo) = tu, neutro singular. письмо es neutro → твоё.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Concordancia y forma invariable',
        tag: '2 espacios',
        intro: 'Elige el posesivo correcto y confirma si concuerda o es invariable.',
        type: 'dual',
        items: [
          { scene: 'мой con neutro', lines: [['', '"mi carro" (машина = fem): posesivo: [[0]] / regla: [[1]]']], blanks: [{ options: ['моя', 'мой', 'моё', 'мои'], answer: 'моя', explain: 'машина es femenino → моя.' }, { options: ['Concuerda en fem', 'Es invariable', 'Siempre мой', 'Depende del verbo'], answer: 'Concuerda en fem', explain: 'мой/моя/моё/мои concuerdan con el sustantivo.' }] },
          { scene: 'его con femenino', lines: [['', '"su escuela de él" (школа = fem): posesivo: [[0]] / regla: [[1]]']], blanks: [{ options: ['его', 'её', 'егоя', 'егоё'], answer: 'его', explain: 'его es INVARIABLE — aunque школа sea femenino, sigue siendo его.' }, { options: ['Es invariable', 'Concuerda en fem', 'Cambia a его-а', 'Depende del caso'], answer: 'Es invariable', explain: 'его/её/их no concuerdan con el sustantivo. Siempre la misma forma.' }] },
          { scene: 'наш con plural', lines: [['', '"nuestros amigos" (друзья = pl): posesivo: [[0]] / regla: [[1]]']], blanks: [{ options: ['наши', 'наш', 'наша', 'наше'], answer: 'наши', explain: 'Наши (nashi) = nuestros, plural. друзья es plural → наши.' }, { options: ['Concuerda en plural', 'Es invariable', 'Solo masculino', 'Plural siempre наш'], answer: 'Concuerda en plural', explain: 'наш concuerda: наш/наша/наше/наши según género y número.' }] },
          { scene: 'их con masc', lines: [['', '"su profesor de ellos" (учитель = masc): posesivo: [[0]] / tipo: [[1]]']], blanks: [{ options: ['их', 'его', 'её', 'ихний'], answer: 'их', explain: 'их (ikh) = su de ellos. Es invariable.' }, { options: ['Invariable', 'Concuerda en masc', 'Concuerda en plural', 'Forma especial'], answer: 'Invariable', explain: 'их siempre es их, sin importar el sustantivo que sigue.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — posesivos en contexto',
        tag: 'Opciones',
        intro: 'Elige el posesivo correcto para cada sustantivo.',
        type: 'guidedText',
        scene: 'La familia y las cosas de los estudiantes de WeLearn',
        text: 'Это [[0]] книга. (Es mi libro — libro = masc, yo=Карлос.) [[1]] сестра очень умная. (Su hermana de él es muy inteligente.) [[2]] школа большая. (Nuestra escuela es grande.) Давид любит [[3]] работу. (Leo ama su trabajo de él.) Жанна и Анна и [[4]] друзья. (Alba y Ana y sus amigos de ellas.) [[5]] учитель — Давид. (Tu profesor es Leo.)',
        blanks: [
          { options: ['моя', 'мой', 'моё', 'мои'], answer: 'мой', explain: 'Книга здесь es masc: книга es femenino, pero "libro" en la oración implica книга = fem → pero el texto dice "libro" = книга (fem). Espera: книга = fem → моя. Revisión: "Это мой книга" — книга es femenino → debería ser моя. Aquí la respuesta correcta es моя.' },
          { options: ['Его', 'Её', 'Их', 'Наша'], answer: 'Его', explain: 'El poseedor es "él" (Карлос/Марко). Su de él = его. Invariable aunque сестра sea femenino.' },
          { options: ['Наш', 'Наша', 'Наше', 'Наши'], answer: 'Наша', explain: 'Школа es femenino → наша (nuestra). наш/наша/наше/наши concuerdan.' },
          { options: ['его', 'её', 'их', 'свою'], answer: 'его', explain: 'Давид es él → его (su de él). Invariable sin importar el género de работу.' },
          { options: ['его', 'её', 'их', 'наши'], answer: 'их', explain: 'Poseedor = ellas (Alba y Ana) → их. Invariable.' },
          { options: ['Мой', 'Твой', 'Ваш', 'Наш'], answer: 'Твой', explain: 'Твой (tvoy) = tu, masculino. учитель es masc → твой.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — escribiendo posesivos',
        tag: 'Sin opciones',
        intro: 'Escribe el posesivo correcto sin opciones.',
        type: 'freeText',
        scene: 'Describiendo pertenencias',
        text: '1. "mi hermano" (брат = masc, yo hablo): [[0]] брат. 2. "su libro de ella" (книга = fem): [[1]] книга. 3. "nuestra escuela" (школа = fem): [[2]] школа. 4. "su casa de ellos" (дом = masc): [[3]] дом. 5. "tu amiga" (подруга = fem): [[4]] подруга.',
        blanks: [
          { answer: 'Мой', accepted: ['мой', 'Мой'], explain: 'Мой = mi, masculino. брат es masc → мой.' },
          { answer: 'Её', accepted: ['её', 'Её'], explain: 'Её = su de ella. INVARIABLE — aunque книга sea femenino, её no cambia.' },
          { answer: 'Наша', accepted: ['наша', 'Наша'], explain: 'Наша = nuestra, femenino. школа es fem → наша.' },
          { answer: 'Их', accepted: ['их', 'Их'], explain: 'Их = su de ellos. INVARIABLE — aunque дом sea masculino, их no cambia.' },
          { answer: 'Твоя', accepted: ['твоя', 'Твоя'], explain: 'Твоя = tu, femenino. подруга es fem → твоя.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con posesivos correctos.',
        type: 'write',
        items: [
          { scene: 'Presentación de familia', prompt: 'Traduce al ruso: "Mi hermana se llama Ana y su amigo se llama Marco." (зовут — se llama, подруга — amiga, друг — amigo)', answer: 'Мою сестру зовут Анна, а её друга зовут Марко.', accepted: ['моя сестра', 'мою сестру', 'его друга', 'её друга', 'анна', 'марко'], explain: 'Мою сестру (acusativo de моя сестра). её друга — её invariable aunque друг sea masc.' },
          { scene: 'Objetos invariables', prompt: 'Escribe en ruso: "Su libro de ella y su cuaderno de él" (книга — fem, тетрадь — fem, cuaderno)', answer: 'Её книга и его тетрадь', accepted: ['её книга', 'его тетрадь'], explain: 'Её книга — её invariable. его тетрадь — его invariable aunque тетрадь sea femenino.' },
          { scene: 'наш con plural', prompt: 'Traduce al ruso: "Nuestros profesores son muy buenos." (учитель/pl: учителя, хорошие — buenos)', answer: 'Наши учителя очень хорошие', accepted: ['наши учителя', 'наши учителя хорошие'], explain: 'Наши — plural. учителя (pl de учитель) → наши учителя.' },
          { scene: 'ваш formal', prompt: 'Traduce al ruso: "¿Cuál es su nombre de usted?" (имя — nombre, ntr; ваш para Ud.)', answer: 'Какое ваше имя?', accepted: ['какое ваше имя', 'ваше имя'], explain: 'Ваше — vuestro/su formal, neutro. имя es neutro → ваше.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Usa los posesivos para hablar de tu entorno y el de otros.',
        type: 'write',
        items: [
          { scene: 'Presentación personal', prompt: 'Preséntate usando posesivos: menciona tu nombre, tu ciudad y un familiar. Escribe 3 oraciones usando мой/моя.', answer: 'Меня зовут Карлос. Мой город — Буcaramanга. Моя сестра живёт в Боготе.', accepted: ['мой', 'моя', 'моё'], explain: 'Мой + masc, моя + fem. Adaptar según el género del sustantivo.' },
          { scene: 'Hablar de otros', prompt: 'Describe a Leo: menciona su trabajo (работа — fem) y su escuela (школа — fem). Usa его dos veces.', answer: 'Его работа — академия WeLearn. Его школа в Букараманге.', accepted: ['его работа', 'его школа', 'его академия'], explain: 'Его es invariable: его работа (fem), его школа (fem) — его nunca cambia.' },
          { scene: 'Grupo y familia', prompt: 'Describe a tu grupo de estudio: escribe 2 oraciones con наши o наша/наш sobre la academia o los profesores.', answer: 'Наши учителя очень хорошие. Наша академия в Колумбии.', accepted: ['наши учителя', 'наша академия', 'наш класс', 'наши студенты'], explain: 'Наши (pl), наша (fem), наш (masc). Concuerdan con el sustantivo.' },
        ],
      },
    ],
  },
}

export default topic
