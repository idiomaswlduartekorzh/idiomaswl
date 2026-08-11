import { LINKING_FAMILIES } from './linking-data';

/**
 * El WeLearn progressive engine de conectores: seis niveles, en el orden que pidió David.
 *
 *   1. dos oraciones, se elige el conector entre opciones
 *   2. lo mismo, sin opciones: se escribe
 *   3. tres oraciones y DOS conectores, con opciones
 *   4. lo mismo, sin opciones
 *   5. un texto con los conectores mal puestos: se hace clic en el que falla y se propone otro
 *   6. tarjetas de oraciones que se ordenan a clic, y luego se elige el conector que las une
 *
 * LO QUE SE PUEDE CORREGIR SOLO, Y LO QUE NO
 *
 * Los niveles 2, 4, 5 y 6 aceptan texto escrito, y aun así se corrigen de verdad. No es una
 * contradicción con la regla de «no evaluar texto libre»: aquí la respuesta es UNA PALABRA de
 * un conjunto cerrado y conocido, no una redacción. Se puede decir con certeza si «however»
 * marca contraste; no se puede decir si un ensayo merece un 7.
 *
 * Y se acepta cualquier conector de la familia correcta, no solo el que el redactor escribió
 * primero. David lo pidió explícitamente: «si escoge however y la reemplaza por furthermore,
 * las de la familia que sean plausibles también valen como acierto». Un ejercicio que exige
 * la palabra exacta enseña a adivinar la palabra, no a entender la relación.
 */

export type EngineLevel =
  | {
      kind: 'one-gap';
      level: number;
      title: string;
      instruction: string;
      /** `true` = con opciones; `false` = se escribe. */
      withOptions: boolean;
      before: string;
      after: string;
      family: string;
      best: string;
      decoys: string[];
    }
  | {
      kind: 'two-gaps';
      level: number;
      title: string;
      instruction: string;
      withOptions: boolean;
      /** Tres tramos de texto y dos huecos entre ellos. */
      parts: [string, string, string];
      gaps: { family: string; best: string }[];
      decoys: string[];
    }
  | {
      kind: 'repair';
      level: number;
      title: string;
      instruction: string;
      /** El texto por trozos: los que llevan `family` son conectores clicables. */
      segments: { text: string; family?: string; wrong?: boolean }[];
    }
  | {
      kind: 'order';
      level: number;
      title: string;
      instruction: string;
      /** Las tarjetas en desorden; `order` es la posición correcta de cada una. */
      cards: { text: string; order: number }[];
      /** El hueco que queda entre la segunda y la tercera cuando ya están ordenadas. */
      gapAfter: number;
      family: string;
      best: string;
      decoys: string[];
    };

/** Todos los conectores de una familia, en minúscula, para aceptar cualquiera de ellos. */
export function acceptedFor(familySlug: string): string[] {
  const family = LINKING_FAMILIES.find((item) => item.slug === familySlug);
  if (!family) return [];
  return family.connectors.flatMap((connector) => {
    const text = connector.text.toLowerCase();
    // «Either … or» se acepta escribiendo cualquiera de las dos mitades.
    if (text.includes('…')) return text.split('…').map((half) => half.trim()).filter(Boolean);
    return [text];
  });
}

/**
 * ¿Vale lo que ha escrito?
 *
 * Se normaliza y se compara contra TODOS los conectores de la familia correcta. Se acepta
 * también la forma sin la coma final, que es como la gente la escribe.
 */
export function isAccepted(written: string, familySlug: string): boolean {
  const clean = written.trim().toLowerCase().replace(/[.,;:]+$/, '');
  if (!clean) return false;
  return acceptedFor(familySlug).some((option) => option === clean);
}

const label = (slug: string) => LINKING_FAMILIES.find((item) => item.slug === slug)?.label ?? slug;

export const ENGINE_LEVELS: EngineLevel[] = [
  {
    kind: 'one-gap',
    level: 1,
    title: 'One gap, with options',
    instruction: 'Read both halves. Which connector describes what the second one does to the first?',
    withOptions: true,
    before: 'Cycling to work costs nothing once the bicycle is paid for.',
    after: 'it removes the daily uncertainty of a delayed train or a queue of traffic.',
    family: 'addition',
    best: 'Furthermore',
    decoys: ['However', 'For example', 'In conclusion'],
  },
  {
    kind: 'one-gap',
    level: 2,
    title: 'One gap, from memory',
    instruction: 'Same job, no options. Write a connector that fits — any one from the right family counts.',
    withOptions: false,
    before: 'The scheme reduced peak-hour traffic in its first year.',
    after: 'the number of people cycling to work has barely changed since it began.',
    family: 'contrast',
    best: 'However',
    decoys: [],
  },
  {
    kind: 'two-gaps',
    level: 3,
    title: 'Two gaps, with options',
    instruction: 'Three sentences, two joins. Each connector has to describe its own pair — the second is not the same relationship as the first.',
    withOptions: true,
    parts: [
      'Museums that charge for entry can fund conservation from ticket revenue.',
      'a blanket fee keeps out precisely the visitors a public collection exists to serve.',
      'the Rijksmuseum charges adults but admits everyone under eighteen free of charge.',
    ],
    gaps: [
      { family: 'contrast', best: 'However' },
      { family: 'examples', best: 'For instance' },
    ],
    decoys: ['Therefore', 'Similarly', 'In conclusion', 'Moreover'],
  },
  {
    kind: 'two-gaps',
    level: 4,
    title: 'Two gaps, from memory',
    instruction: 'Same three sentences, no options. Write one connector in each gap; any connector from the right family counts.',
    withOptions: false,
    parts: [
      'Remote work gives employees long stretches of uninterrupted concentration.',
      'it removes the informal contact that keeps a team coordinated.',
      'companies that go fully remote usually end up scheduling the contact they used to get for free.',
    ],
    gaps: [
      { family: 'contrast', best: 'However' },
      { family: 'cause-and-effect', best: 'As a result' },
    ],
    decoys: [],
  },
  {
    kind: 'repair',
    level: 5,
    title: 'Repair the wrong connectors',
    instruction: 'Every connector in this paragraph is highlighted. Three of them describe the wrong relationship. Click one and write what it should be — any connector from the right family counts.',
    segments: [
      { text: 'Public transport moves far more people per square metre of city than private cars. ' },
      { text: 'However', family: 'addition', wrong: true },
      { text: ', it gives reliable access to work and study to residents who cannot afford to drive. ' },
      { text: 'For example', family: 'contrast', wrong: true },
      { text: ', building the network takes years and the disruption falls on the same neighbourhoods that need it most. ' },
      { text: 'Therefore', family: 'concession', wrong: true },
      { text: ', that cost is temporary, while the capacity it buys is permanent. ' },
      { text: 'In conclusion', family: 'conclusion' },
      { text: ', investment in shared transport is worth the years it takes.' },
    ],
  },
  {
    kind: 'order',
    level: 6,
    title: 'Build the paragraph, then join it',
    instruction: 'Click the cards in the order they belong. When the paragraph is built, choose the connector that joins the last two sentences.',
    cards: [
      { text: 'Cities that removed general traffic from their centres recovered space that had been invisible for decades.', order: 0 },
      { text: 'Pedestrian numbers rose and collisions at the busiest junctions fell by half.', order: 1 },
      { text: 'Deliveries and residents with limited mobility still need a route in.', order: 2 },
    ],
    gapAfter: 1,
    family: 'contrast',
    best: 'However',
    decoys: ['Furthermore', 'For instance', 'As a result'],
  },
];

/** Para el encabezado de cada nivel: qué familia se está practicando, en palabras. */
export const familyLabel = label;
