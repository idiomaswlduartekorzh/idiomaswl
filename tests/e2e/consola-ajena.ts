/**
 * Ruido de consola que no es nuestro.
 *
 * Los tests de «la consola queda limpia» existen para cazar errores DE LA PÁGINA. Lo que
 * filtra esta lista viene de fuera del repositorio y aparece en las páginas del sitio por
 * igual — se comprobó en `/home`, `/practica` y el hub de Task 2 —, así que dejarlo romper
 * la suite solo enseña a ignorar el rojo.
 *
 * Cada entrada tiene que ser concreta y tener dueño. Nada de comodines.
 *
 *   · `unpkg.com/meta-capi-param-builder-clientjs` — un tag de Meta publicado en el
 *     contenedor de GTM que carga un script desde el CDN público de npm. Nuestro CSP no
 *     tiene ese dominio, así que el navegador lo bloquea. Es intermitente: en algunas
 *     cargas el tag ni se dispara. NO se arregla añadiendo `unpkg.com` al `script-src`:
 *     eso autorizaría el registro entero de npm a ejecutar código en todo el sitio. Se
 *     arregla pausando el tag en GTM, y eso está en manos de David — el contenedor vive
 *     fuera del repositorio. Queda anotado en `docs/ielts-task2-loop.md`.
 *
 *   · `favicon` y `404 (Not Found)` — ruido del servidor de desarrollo.
 */
const AJENO = /favicon|404 \(Not Found\)|unpkg\.com|meta-capi-param-builder|Content Security Policy/i

/** Deja solo los errores que son responsabilidad de esta página. */
export const erroresPropios = (lineas: string[]) => lineas.filter((linea) => !AJENO.test(linea))
