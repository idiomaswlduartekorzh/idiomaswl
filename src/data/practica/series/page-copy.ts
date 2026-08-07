import { audioReady, type ListeningLevel } from './audio-ready'

/**
 * Texto de las páginas de escucha derivado del interruptor de audio.
 *
 * Existe para que una sola constante gobierne a la vez el comportamiento del runner,
 * la metadata y los datos estructurados. El precedente que evita: alemán A1 e italiano A1
 * llevan meses sirviendo 20 audios reales mientras sus fichas siguen anunciando
 * «3 audios próximamente», porque el texto se escribió a mano y nadie volvió a tocarlo.
 */

export type ListeningSeriesCopy = {
  language: string
  /** Nivel de la serie. Gobierna la ruta del audio, la url y el texto. */
  level: ListeningLevel
  /** Nombre del idioma en español, para títulos. */
  languageLabel: string
  /** Nombre de la destreza en el idioma meta (p. ej. «Compréhension orale»). */
  skillLabel: string
  seriesTitle: string
  seriesTitleEs: string
  /** Una frase sobre la trama, sin signos finales. */
  premise: string
}

const EPISODES = 20

export function listeningCopy(copy: ListeningSeriesCopy) {
  const ready = audioReady(copy.language, copy.level)
  const nivel = copy.level.toUpperCase()
  const url = `https://www.idiomaswl.com/practica/${copy.language}/${copy.level}/escucha`

  const title = ready
    ? `${copy.skillLabel} ${copy.languageLabel} ${nivel}: ${copy.seriesTitle} | Idiomas WeLearn`
    : `${copy.skillLabel} ${copy.languageLabel} ${nivel}: ${copy.seriesTitle} — guiones y ejercicios | Idiomas WeLearn`

  // La descripción no promete audio antes de que exista: prometerlo y no entregarlo
  // dispara el rebote y castiga la página justo cuando empieza a posicionar.
  const description = ready
    ? `${EPISODES} episodios ${nivel} en ${copy.languageLabel.toLowerCase()} con audio de voces nativas, vocabulario previo, preguntas de comprensión y transcripción bilingüe. ${copy.premise}.`
    : `${EPISODES} episodios ${nivel} en ${copy.languageLabel.toLowerCase()} con guion dialogado, vocabulario previo, preguntas de comprensión y transcripción bilingüe. El audio está en producción. ${copy.premise}.`

  const seriesDescription = ready
    ? `Temporada ${nivel} · ${EPISODES} episodios cortos. ${copy.premise}.`
    : `Temporada ${nivel} · ${EPISODES} episodios cortos. ${copy.premise}. El audio se activará en cuanto esté grabado.`

  return {
    ready,
    url,
    metadata: {
      title,
      description,
      alternates: { canonical: url },
    },
    schema: {
      name: `${copy.skillLabel} en ${copy.languageLabel} ${nivel} — ${copy.seriesTitle} (${copy.seriesTitleEs})`,
      url,
      description,
    },
    journal: {
      seriesTitle: `${copy.seriesTitle} · ${copy.seriesTitleEs}`,
      seriesDescription,
      progressKey: `wl-listening-${copy.language}-${copy.level}-progress`,
      audioBasePath: `/audio/${copy.language}/${copy.level}`,
      backHref: `/practica/${copy.language}/${copy.level}`,
    },
  }
}

/**
 * Ficha de la destreza «escucha» en el hub del nivel.
 *
 * Mismo motivo que `listeningCopy`: el estado del audio se escribe una sola vez.
 * Los hubs de alemán A1 e italiano A1 llevan meses anunciando «3 audios próximamente»
 * sobre 20 audios ya publicados, precisamente por haberlo escrito a mano.
 *
 * `blurb` va en el idioma que ya use ese hub —los de francés y portugués están
 * escritos en francés y portugués— y describe la serie sin mencionar el audio:
 * de eso se encarga el sufijo.
 */
export function listeningCard(
  language: string,
  level: ListeningLevel,
  blurb: string,
): { desc: string; count: string } {
  const ready = audioReady(language, level)
  return {
    desc: ready ? blurb : `${blurb} El audio está en producción.`,
    count: ready ? `${EPISODES} episodios · ${EPISODES * 5} preguntas` : `${EPISODES} episodios · audio en producción`,
  }
}
