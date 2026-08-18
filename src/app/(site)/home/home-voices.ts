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

export type HomeVoice = {
  id: string;
  /** Tal como firma la persona su reseña pública en Google. */
  name: string;
  /** El dato, tal como lo cuenta quien lo consiguió. */
  result: string;
  context: string;
  quote: string;
};

/** Formato de enlace a ficha que Google documenta y no se rompe al cambiar la URL del mapa. */
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJjWcQ2Q8_aI4RhKQ_cXs85IY';

export const HOME_VOICES: readonly HomeVoice[] = [
  {
    id: 'norma-c1',
    name: 'Norma Juliana Rocha Núñez',
    result: 'Certificado C1',
    context: 'Inglés intensivo previo al IELTS',
    quote:
      'Al final del curso obtuve mi certificado C1. Mi papá tomó un curso intensivo de Alemán y en menos de 3 meses obtuvo su certificado A1 para trámite de visa.',
  },
  {
    id: 'daniel-toefl',
    name: 'Daniel Zuluaga',
    result: 'TOEFL 90+',
    context: 'Estudiante desde 2017 · después, Celpe-Bras',
    quote:
      'Comencé con ellos preparándome para presentar el TOEFL y, gracias a su acompañamiento, logré obtener la nota que necesitaba (90+). Más adelante, empecé a aprender portugués y, un año después, presenté el CELPE-Bras.',
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
