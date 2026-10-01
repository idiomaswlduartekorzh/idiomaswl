import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'kanji-esencial-a1',
  order: '07',
  color: '#c8202e',
  category: 'Escritura',
  level: 'A1',
  title: 'Kanji esencial A1 — 20 caracteres para empezar japonés',
  shortTitle: 'Kanji esencial A1',
  metaTitle: 'Kanji japonés A1 — 20 caracteres, trazos, audio y ejercicios',
  description:
    'Guía de 20 kanji esenciales para principiantes: números, naturaleza, tiempo y personas. Aprende forma, significado, una lectura útil, orden de trazos y vocabulario real con práctica interactiva en ambas direcciones.',
  lead: 'Los kanji no son dibujos para copiar sin contexto. Aprende cada uno como un paquete de cuatro piezas: forma, significado central, lectura útil y palabra real.',
  outcomes: [
    'Reconoce 20 kanji de alta frecuencia en japonés A1',
    'Relaciona cada forma con su significado principal',
    'Sigue el orden de trazos y distingue lectura de significado',
  ],
  guide: {
    goal: 'Construir una primera base de kanji útil, legible y conectada con palabras reales.',
    model: '木 = árbol · lectura útil: き (ki) | 日本 = にほん (Nihon, Japón)',
    formula: 'forma + significado central + lectura útil + palabra real',
    decisions: [
      'Observa primero la forma completa y sus componentes.',
      'Asocia un significado central, no una lista de traducciones.',
      'Añade una lectura dentro de una palabra real.',
      'Escribe siguiendo el orden de trazos y recupera el carácter de memoria.',
    ],
    table: [
      ['Kanji', 'Lectura útil', 'Significado'],
      ['一', 'いち · ichi', 'uno'],
      ['日', 'ひ / にち · hi / nichi', 'sol · día'],
      ['月', 'つき / げつ · tsuki / getsu', 'luna · mes'],
      ['人', 'ひと / じん · hito / jin', 'persona'],
      ['木', 'き / もく · ki / moku', 'árbol'],
    ],
    mistakes: [
      'Memorizar una sola lectura como si fuera fija: la lectura depende de la palabra.',
      'Copiar el contorno sin respetar el orden de trazos: dificulta proporción y recuerdo.',
      'Aprender el kanji aislado sin una palabra de ejemplo: se olvida y no se sabe usar.',
    ],
  },
  seo: [
    {
      heading: '¿Qué es un kanji y cómo se combina con hiragana y katakana?',
      paragraphs: [
        'Los kanji son caracteres de origen chino que aportan significado al japonés escrito. No sustituyen a los dos silabarios. Una oración normal combina kanji para las raíces con significado, hiragana para partículas y terminaciones, y katakana para préstamos o nombres extranjeros.',
        'Esa mezcla facilita la lectura porque el japonés normalmente no separa las palabras con espacios. En 食べます, 食 comunica la idea de comer y べます muestra en hiragana cómo se completa y conjuga la palabra.',
      ],
    },
    {
      heading: '¿Por qué un kanji puede tener varias lecturas?',
      paragraphs: [
        'El japonés incorporó caracteres chinos en distintas épocas y conservó tanto lecturas de origen chino como lecturas japonesas. Por eso 日 puede leerse hi cuando significa día o sol y nichi dentro de palabras como 日本, Nihon.',
        'Para un principiante, la solución no es memorizar todas las lecturas de una vez. Conviene aprender una lectura frecuente dentro de una palabra real y ampliar el repertorio cuando aparezcan nuevos contextos.',
      ],
    },
    {
      heading: '¿Cómo memorizar kanji sin copiar cada carácter cien veces?',
      paragraphs: [
        'Combina cuatro acciones: reconocer la forma, explicar la idea, escuchar una lectura útil y producir el carácter siguiendo sus componentes. Después intenta recordarlo sin mirar y repásalo con separación creciente entre sesiones.',
        'El orden de trazos no es decoración. Mantiene proporciones estables, hace la escritura más fluida y ayuda a reconocer cómo se construye el carácter. Esta unidad permite ver la animación de los 20 kanji y repetirla cuantas veces sea necesario.',
      ],
    },
  ],
  visual: {
    mode: 'kanji-foundation',
    teacherLens: 'El estudiante conecta forma, significado, lectura y contexto antes de memorizar.',
    graphicPrompt: '20 kanji A1 agrupados por números, naturaleza, tiempo y personas.',
    scene: [
      ['木', 'árbol · き (ki)'],
      ['日', 'día · ひ / にち'],
      ['人', 'persona · ひと / じん'],
    ],
    learnerModes: ['visual: componentes', 'auditivo: lectura útil', 'motor: orden de trazos'],
    practiceVerbs: ['Reconocer', 'Relacionar', 'Leer', 'Recordar', 'Escribir', 'Integrar'],
    reviewFocus: ['forma', 'significado central', 'lectura en palabra', 'orden de trazos'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Kanji → significado',
        tag: 'Opción múltiple',
        intro: 'Elige el significado principal de cada kanji.',
        type: 'choice',
        items: [
          { scene: 'Naturaleza', lines: [['', '¿Qué significa 木?']], options: ['árbol', 'agua', 'fuego', 'tierra'], answer: 'árbol', explain: '木 representa árbol.' },
          { scene: 'Persona', lines: [['', '¿Qué significa 人?']], options: ['persona', 'día', 'mes', 'dinero'], answer: 'persona', explain: '人 representa persona.' },
          { scene: 'Naturaleza', lines: [['', '¿Qué significa 水?']], options: ['agua', 'fuego', 'oro', 'luna'], answer: 'agua', explain: '水 representa agua.' },
          { scene: 'Tiempo', lines: [['', '¿Qué significa 月?']], options: ['luna o mes', 'sol o día', 'tierra', 'mil'], answer: 'luna o mes', explain: '月 representa luna y, en calendario, mes.' },
        ],
      },
      {
        id: 'l2',
        title: 'Significado → kanji',
        tag: 'Opción múltiple',
        intro: 'Parte del significado y recupera la forma correcta.',
        type: 'choice',
        items: [
          { scene: 'Números', lines: [['', 'Elige el kanji de “tres”.']], options: ['三', '二', '五', '八'], answer: '三', explain: '三 = tres.' },
          { scene: 'Naturaleza', lines: [['', 'Elige el kanji de “fuego”.']], options: ['火', '水', '木', '土'], answer: '火', explain: '火 = fuego.' },
          { scene: 'Tiempo', lines: [['', 'Elige el kanji de “día / sol”.']], options: ['日', '月', '人', '金'], answer: '日', explain: '日 = día o sol.' },
          { scene: 'Cantidad', lines: [['', 'Elige el kanji de “mil”.']], options: ['千', '百', '十', '九'], answer: '千', explain: '千 = mil.' },
        ],
      },
      {
        id: 'l3',
        title: 'Lecturas útiles',
        tag: 'Opciones',
        intro: 'Relaciona el kanji con una lectura frecuente.',
        type: 'guidedText',
        scene: 'Primeras lecturas dentro de vocabulario A1',
        text: '一 se lee [[0]]. 水 se lee [[1]] cuando significa agua. 木 se lee [[2]] cuando significa árbol. 人 se lee [[3]] cuando significa persona.',
        blanks: [
          { options: ['ichi', 'ni', 'san'], answer: 'ichi', explain: '一 = いち, ichi.' },
          { options: ['mizu', 'hi', 'tsuki'], answer: 'mizu', explain: '水 = みず, mizu.' },
          { options: ['ki', 'kin', 'ka'], answer: 'ki', explain: '木 = き, ki.' },
          { options: ['hito', 'nichi', 'do'], answer: 'hito', explain: '人 = ひと, hito.' },
        ],
      },
      {
        id: 'l4',
        title: 'Recuerdo sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el significado central sin mirar la tabla.',
        type: 'freeText',
        scene: 'Recuperación activa',
        text: '火 = [[0]] · 金 = [[1]] · 土 = [[2]] · 百 = [[3]] · 十 = [[4]]',
        blanks: [
          { answer: 'fuego', explain: '火 = fuego.' },
          { answer: 'oro', accepted: ['dinero'], explain: '金 = oro o dinero.' },
          { answer: 'tierra', explain: '土 = tierra.' },
          { answer: 'cien', explain: '百 = cien.' },
          { answer: 'diez', explain: '十 = diez.' },
        ],
      },
      {
        id: 'l5',
        title: 'Kanji en palabras',
        tag: 'Producción',
        intro: 'Escribe la lectura en rōmaji de palabras frecuentes.',
        type: 'write',
        items: [
          { scene: 'País', prompt: '日本 = ¿cómo se lee?', answer: 'nihon', accepted: ['nihon'], explain: '日本 = にほん, Nihon, Japón.' },
          { scene: 'Persona', prompt: '一人 = ¿cómo se lee?', answer: 'hitori', accepted: ['hitori'], explain: '一人 = ひとり, hitori, una persona.' },
          { scene: 'Dinero', prompt: '千円 = ¿cómo se lee?', answer: 'sen en', accepted: ['sen en', 'sen-en', 'senen'], explain: '千円 = せんえん, sen en, mil yenes.' },
        ],
      },
      {
        id: 'l6',
        title: 'Misión kanji A1',
        tag: 'Reto final',
        intro: 'Explica un kanji como un paquete completo.',
        type: 'write',
        items: [
          { scene: 'Forma + idea', prompt: 'Describe 木 con significado y una lectura útil.', answer: '木 significa árbol y se lee ki.', accepted: ['木 significa árbol y se lee ki', 'árbol ki'], explain: 'Paquete mínimo: 木 · árbol · き/ki.' },
          { scene: 'Forma + palabra', prompt: 'Explica 日 usando una palabra real.', answer: '日 significa día o sol y aparece en 日本.', accepted: ['日 significa día o sol y aparece en 日本', 'día sol nihon'], explain: '日 aporta día/sol y se lee nichi en 日本.' },
        ],
      },
    ],
  },
}

export default topic
