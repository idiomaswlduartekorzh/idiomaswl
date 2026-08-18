/**
 * Reseñas públicas de Google en las que el propio estudiante declara su resultado.
 *
 * La regla que no se rompe: aquí solo entra quien YA publicó el dato en su reseña.
 * No se cruza un nombre con un recorte del archivo de evidencias: esos 37 fragmentos
 * son anónimos a propósito y no existe —ni debe existir— un mapa que los devuelva a
 * una persona. Ver `docs/HOME-RESULTS-INVENTORY.md`.
 *
 * Las citas van literales, con la ortografía de quien las escribió.
 */

export type HomeVoiceEvidence = {
  /** Recorte ya publicado en el archivo anónimo: solo el bloque de puntuación. */
  image: string;
  alt: string;
  caption: string;
};

export type HomeVoice = {
  id: string;
  /** Tal como firma la persona su reseña pública en Google. */
  name: string;
  /** El dato: el del documento cuando lo hay, y si no, el que cuenta la persona. */
  result: string;
  context: string;
  quote: string;
  /** El papel. Solo cuando se ha verificado de quién es. */
  evidence?: HomeVoiceEvidence;
};

/** Formato de enlace a ficha que Google documenta y no se rompe al cambiar la URL del mapa. */
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJjWcQ2Q8_aI4RhKQ_cXs85IY';

export const HOME_VOICES: readonly HomeVoice[] = [
  {
    id: 'norma-c1',
    name: 'Norma Juliana Rocha Núñez',
    result: 'IELTS 8.0 · C1',
    context: 'Inglés intensivo previo al IELTS · octubre de 2019',
    quote:
      'Al final del curso obtuve mi certificado C1. Mi papá tomó un curso intensivo de Alemán y en menos de 3 meses obtuvo su certificado A1 para trámite de visa.',
    evidence: {
      image: '/images/home/results/ielts-01.webp',
      alt: 'Bloque de resultados de un Test Report Form del IELTS Academic con banda global 8.0 y nivel C1',
      caption: 'IELTS Academic · Overall Band 8.0 · CEFR C1',
    },
  },
  {
    id: 'daniel-toefl',
    name: 'Daniel Zuluaga',
    result: 'TOEFL 95 / 120',
    context: 'Estudiante desde 2017 · después, portugués y Celpe-Bras',
    quote:
      'Comencé con ellos preparándome para presentar el TOEFL y, gracias a su acompañamiento, logré obtener la nota que necesitaba (90+). Más adelante, empecé a aprender portugués y, un año después, presenté el CELPE-Bras.',
    evidence: {
      image: '/images/home/results/toefl-02.webp',
      alt: 'Tabla de puntuaciones de un TOEFL iBT Test Taker Score Report con puntaje total 95',
      caption: 'TOEFL iBT · 95 / 120 · junio de 2017',
    },
  },
  {
    id: 'norman-maestria',
    name: 'Norman Gamboa',
    result: 'Admitido a la maestría',
    context: 'Inglés para trabajo y posgrado en Estados Unidos',
    quote:
      'Las bases y conocimientos adquiridos me han permitido ser admitido en varios proyectos que inicié en los Estados Unidos, donde se exigía un nivel de inglés adecuado. Por ejemplo para poder ingresar a la maestría que estoy terminando.',
  },
];
