/**
 * Registro de idiomas del transcriptor fonético. **Fuente única.**
 *
 * Lo consumen el índice `/herramientas/transcripcion-fonetica`, el hub `/herramientas` y
 * el `sitemap.ts`. Sin él, cada uno mantenía su lista a mano: con un idioma se aguanta,
 * con ocho alguien añade el francés, se olvida del sitemap, y la página nace sin rastrear.
 *
 * `porQue` no es relleno de marketing: es la razón concreta por la que **ese** idioma
 * necesita transcripción fonética, y es distinta en cada uno. Es lo que evita que las
 * ocho páginas sean la misma con el nombre cambiado —que es el riesgo real cuando se
 * replica una plantilla— y de paso es la información que el estudiante venía a buscar.
 */

export interface TranscriptorIdioma {
  /** Segmento de URL: `/herramientas/transcripcion-fonetica/<slug>`. */
  readonly slug: string
  readonly nombre: string
  readonly bandera: string
  /** Por qué este idioma en concreto necesita transcripción. Texto único por idioma. */
  readonly porQue: string
  /** Qué variantes ofrece la herramienta, o qué falta por resolver. */
  readonly variantes: string
  readonly color: string
  /** Solo los publicados salen en las listas y en el sitemap. */
  readonly publicado: boolean
}

export const TRANSCRIPTOR_IDIOMAS: TranscriptorIdioma[] = [
  {
    slug: 'ingles',
    nombre: 'Inglés',
    bandera: '🇬🇧',
    porQue:
      'La ortografía inglesa no dice cómo suena: «though», «through» y «tough» se escriben casi igual y no comparten ni un sonido al final.',
    variantes: 'Británico y americano',
    color: '#a84f08',
    publicado: true,
  },
  {
    slug: 'coreano',
    nombre: 'Coreano',
    bandera: '🇰🇷',
    porQue:
      'El hangul se lee casi como se escribe, pero las consonantes cambian al juntarse: 학교 no suena «hak-gyo» sino «hak-kkyo».',
    variantes: 'Alfabeto fonético y romanización',
    color: '#1c4b9c',
    publicado: true,
  },
  {
    slug: 'frances',
    nombre: 'Francés',
    bandera: '🇫🇷',
    porQue:
      'Media palabra no se pronuncia, y la que no se pronunciaba reaparece cuando la siguiente empieza por vocal.',
    variantes: 'Liaison y letras mudas',
    color: '#6941a5',
    publicado: true,
  },
  // Los siguientes están estudiados pero no escritos. No se listan hasta que existan:
  // anunciar lo que no está es la forma más barata de perder la confianza de quien busca.
  {
    slug: 'ruso',
    nombre: 'Ruso',
    bandera: '🇷🇺',
    porQue:
      'La escritura no marca dónde cae la fuerza, y las vocales cambian de sonido según dónde caiga. Sin saber el acento no se puede leer.',
    variantes: 'Requiere diccionario de acentos',
    color: '#b42332',
    publicado: false,
  },
]

/** Los que ya existen como página. Es lo que consume el sitemap. */
export const IDIOMAS_PUBLICADOS = TRANSCRIPTOR_IDIOMAS.filter((idioma) => idioma.publicado)
