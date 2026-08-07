export type IcfesOfficialPart = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface IcfesPartConfig {
  part: IcfesOfficialPart;
  slug: `parte-${IcfesOfficialPart}`;
  title: string;
  shortTitle: string;
  task: string;
  approximateWeight: number;
  color: string;
  softColor: string;
  icon: string;
  directAnswer: string;
  strategy: string[];
  skills: string[];
  visual: 'word-bank' | 'notice' | 'dialogue' | 'grammar-cloze' | 'literal-reading' | 'inference-reading' | 'lexical-cloze';
  seoTitle: string;
  seoDescription: string;
}
export const ICFES_PARTS: readonly IcfesPartConfig[] = [
  {
    part: 1,
    slug: 'parte-1',
    title: 'Parte 1: descripciones y palabras',
    shortTitle: 'Descripciones y palabras',
    task: 'Relacionar cada definición con la palabra correcta de un banco temático.',
    approximateWeight: 11,
    color: '#4F46E5',
    softColor: '#EEF2FF',
    icon: 'Aa',
    directAnswer: 'La Parte 1 evalúa vocabulario básico en contexto. No basta traducir: debes reconocer qué palabra cumple todas las pistas de la descripción.',
    strategy: ['Identifica la categoría del banco.', 'Subraya la pista que diferencia la respuesta.', 'Descarta palabras de otra función o lugar.', 'Relee la definición con la palabra elegida.'],
    skills: ['vocabulario temático', 'definiciones', 'descarte semántico'],
    visual: 'word-bank',
    seoTitle: 'Parte 1 ICFES Inglés: vocabulario, estrategia y práctica',
    seoDescription: 'Aprende a resolver la Parte 1 de inglés ICFES Saber 11: banco de palabras, vocabulario por categorías, ejercicios guiados y explicación de distractores.',
  },
  {
    part: 2,
    slug: 'parte-2',
    title: 'Parte 2: avisos, propósito y lugar',
    shortTitle: 'Avisos y señales',
    task: 'Interpretar avisos breves y decidir dónde aparecen, a quién se dirigen o qué buscan lograr.',
    approximateWeight: 11,
    color: '#D97706',
    softColor: '#FFFBEB',
    icon: '!',
    directAnswer: 'La Parte 2 evalúa lenguaje funcional. La clave es unir las palabras del aviso con su lugar, audiencia y propósito probable.',
    strategy: ['Lee primero el verbo o prohibición.', 'Busca una pista física del lugar.', 'Formula el propósito en español.', 'Elimina opciones posibles en general pero incompatibles con una palabra exacta.'],
    skills: ['avisos', 'propósito comunicativo', 'lugares y audiencias'],
    visual: 'notice',
    seoTitle: 'Parte 2 ICFES Inglés: avisos y señales con ejercicios',
    seoDescription: 'Practica avisos y señales de la Parte 2 del ICFES Inglés. Aprende a identificar lugar, audiencia y propósito con feedback y evidencia.',
  },
  {
    part: 3,
    slug: 'parte-3',
    title: 'Parte 3: conversaciones breves',
    shortTitle: 'Conversaciones',
    task: 'Elegir la respuesta que mantiene la intención y la coherencia de un intercambio cotidiano.',
    approximateWeight: 11,
    color: '#0F766E',
    softColor: '#F0FDFA',
    icon: '…',
    directAnswer: 'La Parte 3 mide comprensión pragmática: quién habla, qué intención tiene y qué respuesta sería natural en esa situación.',
    strategy: ['Identifica si es pregunta, invitación, opinión o noticia.', 'Predice una respuesta antes de mirar opciones.', 'Comprueba tiempo verbal y pronombres.', 'Descarta respuestas gramaticales pero socialmente extrañas.'],
    skills: ['funciones comunicativas', 'coherencia', 'expresiones cotidianas'],
    visual: 'dialogue',
    seoTitle: 'Parte 3 ICFES Inglés: conversaciones y respuestas correctas',
    seoDescription: 'Resuelve conversaciones breves de la Parte 3 del ICFES Inglés con estrategia pragmática, ejercicios y explicación de cada distractor.',
  },
  {
    part: 4,
    slug: 'parte-4',
    title: 'Parte 4: completar textos con gramática',
    shortTitle: 'Gramática en contexto',
    task: 'Completar un texto eligiendo formas gramaticales coherentes con la oración y el discurso.',
    approximateWeight: 18,
    color: '#047857',
    softColor: '#ECFDF5',
    icon: '{}',
    directAnswer: 'La Parte 4 evalúa gramática dentro de un texto, especialmente tiempos verbales, pronombres, artículos, preposiciones, cuantificadores y conectores.',
    strategy: ['Lee la oración completa.', 'Define qué categoría gramatical falta.', 'Busca concordancia y referencia.', 'Comprueba que el texto siga siendo coherente.'],
    skills: ['gramática', 'conectores', 'cohesión'],
    visual: 'grammar-cloze',
    seoTitle: 'Parte 4 ICFES Inglés: gramática y cloze explicado',
    seoDescription: 'Entrena la Parte 4 del ICFES Inglés con cloze gramatical, tiempos verbales, conectores, ejercicios guiados y microlecciones.',
  },
  {
    part: 5,
    slug: 'parte-5',
    title: 'Parte 5: comprensión literal',
    shortTitle: 'Lectura literal',
    task: 'Localizar información explícita, relaciones y detalles en un texto de lectura básica.',
    approximateWeight: 16,
    color: '#2563EB',
    softColor: '#EFF6FF',
    icon: '¶',
    directAnswer: 'La Parte 5 pide encontrar lo que el texto dice de forma explícita. La respuesta correcta suele ser una paráfrasis de evidencia localizable.',
    strategy: ['Lee la pregunta antes de buscar.', 'Marca palabras clave y sinónimos.', 'Localiza una oración de evidencia.', 'No agregues información externa.'],
    skills: ['scanning', 'detalle', 'paráfrasis'],
    visual: 'literal-reading',
    seoTitle: 'Parte 5 ICFES Inglés: comprensión de lectura literal',
    seoDescription: 'Practica la Parte 5 del ICFES Inglés: información explícita, scanning, paráfrasis, evidencia resaltada y ejercicios guiados.',
  },
  {
    part: 6,
    slug: 'parte-6',
    title: 'Parte 6: inferencia e intención',
    shortTitle: 'Inferencia e intención',
    task: 'Interpretar propósito, postura, idea global e información implícita en textos más complejos.',
    approximateWeight: 11,
    color: '#7C3AED',
    softColor: '#F5F3FF',
    icon: '↗',
    directAnswer: 'La Parte 6 evalúa lectura inferencial y crítica. Debes combinar evidencia del texto sin inventar conclusiones que el autor no respalda.',
    strategy: ['Define exactamente qué pide el enunciado.', 'Reúne dos o más pistas.', 'Distingue evidencia de suposición.', 'Elige la conclusión más precisa, no la más extrema.'],
    skills: ['inferencia', 'propósito', 'tono e idea global'],
    visual: 'inference-reading',
    seoTitle: 'Parte 6 ICFES Inglés: inferencia, propósito e intención',
    seoDescription: 'Aprende a resolver inferencias, propósito del autor y tono en la Parte 6 del ICFES Inglés con evidencia y análisis de distractores.',
  },
  {
    part: 7,
    slug: 'parte-7',
    title: 'Parte 7: léxico y gramática en textos',
    shortTitle: 'Cloze léxico y gramatical',
    task: 'Completar un texto combinando significado, colocaciones y estructura gramatical.',
    approximateWeight: 22,
    color: '#DC2626',
    softColor: '#FEF2F2',
    icon: '▤',
    directAnswer: 'La Parte 7 integra vocabulario y gramática. Debes comprobar significado, colocación y forma gramatical antes de elegir.',
    strategy: ['Predice el significado del espacio.', 'Identifica la categoría de palabra.', 'Comprueba colocaciones cercanas.', 'Relee el párrafo para validar cohesión.'],
    skills: ['vocabulario en contexto', 'colocaciones', 'gramática textual'],
    visual: 'lexical-cloze',
    seoTitle: 'Parte 7 ICFES Inglés: cloze, vocabulario y gramática',
    seoDescription: 'Practica la Parte 7 del ICFES Inglés con textos cloze, vocabulario contextual, colocaciones, gramática y feedback inmediato.',
  },
] as const;

export const ICFES_PART_SLUGS = ICFES_PARTS.map((item) => item.slug);

export function getIcfesPart(slug: string): IcfesPartConfig | undefined {
  return ICFES_PARTS.find((item) => item.slug === slug);
}
