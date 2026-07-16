/**
 * Free Dictionary API + Datamuse — ambos SIN API KEY y sin registro.
 *
 * Free Dictionary: definiciones, fonética IPA y audio de pronunciación.
 * Datamuse: hasta 100.000 llamadas/día; sinónimos, colocaciones, palabras
 * relacionadas. https://www.datamuse.com/api/
 *
 * Uso en Labs: enriquecer el reporte de writing. Cuando el evaluador marca
 * "vocabulario impreciso", aquí sacamos las alternativas reales que un
 * hablante nativo usaría — sin costo y sin cuota que agotar.
 */

import { providers } from '../config';

export interface WordInfo {
  word:      string;
  phonetic?: string;
  audioUrl?: string;
  meanings:  { partOfSpeech: string; definition: string }[];
}

export async function lookupWord(word: string): Promise<WordInfo | null> {
  const clean = word.trim().toLowerCase().replace(/[^a-z'-]/g, '');
  if (!clean) return null;

  try {
    const res = await fetch(`${providers.dictionary.endpoint}/en/${encodeURIComponent(clean)}`, {
      signal: AbortSignal.timeout(5_000),
      // El diccionario es estable: cachear un día ahorra latencia y ruido.
      next:   { revalidate: 86_400 },
    });
    if (!res.ok) return null;

    const [entry] = await res.json();
    if (!entry) return null;

    const withAudio = (entry.phonetics ?? []).find((p: { audio?: string }) => p.audio);

    return {
      word:     entry.word,
      phonetic: entry.phonetic ?? withAudio?.text,
      audioUrl: withAudio?.audio,
      meanings: (entry.meanings ?? []).flatMap((m: {
        partOfSpeech: string;
        definitions: { definition: string }[];
      }) =>
        m.definitions.slice(0, 2).map((d) => ({
          partOfSpeech: m.partOfSpeech,
          definition:   d.definition,
        })),
      ),
    };
  } catch {
    return null;   // El diccionario es un extra: nunca debe tumbar el reporte.
  }
}

/** Sinónimos reales según uso, no según tesauro. `ml` = "means like". */
export async function synonyms(word: string, max = 6): Promise<string[]> {
  try {
    const res = await fetch(
      `${providers.datamuse.endpoint}?ml=${encodeURIComponent(word)}&max=${max}`,
      { signal: AbortSignal.timeout(5_000), next: { revalidate: 86_400 } },
    );
    if (!res.ok) return [];
    return (await res.json()).map((w: { word: string }) => w.word);
  } catch {
    return [];
  }
}

/**
 * Colocaciones: qué palabras siguen naturalmente a esta.
 * Ataca directo el error hispanohablante de traducir literal
 * ("make a decision", no "take a decision").
 */
export async function collocations(word: string, max = 8): Promise<string[]> {
  try {
    const res = await fetch(
      `${providers.datamuse.endpoint}?rel_bga=${encodeURIComponent(word)}&max=${max}`,
      { signal: AbortSignal.timeout(5_000), next: { revalidate: 86_400 } },
    );
    if (!res.ok) return [];
    return (await res.json()).map((w: { word: string }) => w.word);
  } catch {
    return [];
  }
}
