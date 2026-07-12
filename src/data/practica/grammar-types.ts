// Tipos compartidos del currículo de gramática por idioma (A1, A2...).
// Cada idioma define su propio módulo (ingles-a1-gramatica.ts, frances-a1-gramatica.ts...)
// y reutiliza estos tipos + los componentes GrammarExplainer / GrammarQuiz.

export const GRAMMAR_COLOR = '#7c3aed';

export interface GQItem {
  s: string;        // enunciado con ___ para el espacio
  opts: string[];
  a: number;        // índice de la opción correcta
  fb: string;       // feedback
}

export interface GrammarTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface GrammarExample {
  en: string;       // frase en la lengua meta (campo histórico: "en")
  es: string;       // traducción al español
  note?: string;    // matiz opcional (registro, pronunciación, etc.)
}

export interface GrammarMistake {
  wrong: string;
  right: string;
  note: string;
}

// Sub-sección explicativa con su propio subtítulo (H3).
export interface GrammarSection {
  heading: string;
  body: string[];
}

// Puente contrastivo español → lengua meta (la firma del filólogo).
export interface GrammarContrast {
  es: string;
  en: string;       // equivalente en la lengua meta
  note: string;
}

// Pregunta frecuente (para SEO/AEO: fragmentos destacados de Google + FAQPage schema).
// Responde las búsquedas reales que hace la gente sobre el tema.
export interface GrammarFAQ {
  q: string;        // la pregunta tal como la buscaría el usuario
  a: string;        // respuesta directa y breve (1-3 frases)
}

// Recurso descargable asociado (ej. lista completa de verbos irregulares en PDF)
// enlazado desde un tema relacionado, tanto en la página como en su PDF.
export interface GrammarRelatedResource {
  label: string;     // texto del enlace/CTA
  url: string;        // ruta del recurso (ej. /practica/ingles/recursos/verbos-irregulares)
}

export interface GrammarTopic {
  slug: string;
  order: number;
  title: string;       // título completo
  shortTitle: string;  // para chips / índice
  icon: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  intro: string[];                  // párrafos de explicación introductoria
  sections?: GrammarSection[];      // sub-secciones explicativas (opcional)
  table: GrammarTable | null;       // tabla única (formato simple)
  tables?: GrammarTable[];          // varias tablas (si se usa, sustituye a `table`)
  contrast?: GrammarContrast[];     // contraste español → lengua meta (opcional)
  examples: GrammarExample[];
  commonMistakes: GrammarMistake[];
  tip: string;
  faq?: GrammarFAQ[];               // preguntas frecuentes (SEO/AEO, opcional)
  relatedResource?: GrammarRelatedResource; // recurso descargable asociado (opcional)
  questions: GQItem[];
}

export function findTopic(topics: GrammarTopic[], slug: string): GrammarTopic | undefined {
  return topics.find(t => t.slug === slug);
}

export function topicNav(topics: GrammarTopic[], slug: string): { prev: GrammarTopic | null; next: GrammarTopic | null } {
  const i = topics.findIndex(t => t.slug === slug);
  return {
    prev: i > 0 ? topics[i - 1] : null,
    next: i >= 0 && i < topics.length - 1 ? topics[i + 1] : null,
  };
}
