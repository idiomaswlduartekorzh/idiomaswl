# Plan de ataque SEO por fases

**Fecha:** 2 de agosto de 2026
**Base de datos:** export de Search Console del 1 de agosto, ventana 18–29 de julio de 2026 (12 días, la propiedad es nueva).

Objetivo de fondo, sin cambios: **primera página de Google en Bucaramanga** y ser citados por motores de respuesta.

---

## Antes de empezar: qué NO va a funcionar

Conviene dejarlo escrito para no gastar meses en ello.

**Añadir contenido a los hubs de idioma no los va a mover.** Medido el 2026-08-02:

| Hub | Palabras | FAQs | Enlaces entrantes | Posición |
|---|---|---|---|---|
| Inglés | 2.702 | 12 | 197 | — |
| Italiano | 2.661 | 15 | 66 | 87,8 |
| Ruso | 2.507 | 10 | 67 | — |
| Alemán | 2.313 | 11 | 82 | 83,7 |
| Francés | 2.076 | 11 | 82 | 71,0 |

No son páginas flacas. Tienen contenido, datos estructurados y enlaces internos, y aun así están en la séptima u octava página. Lo que les falta —antigüedad del dominio, autoridad y menciones externas— no se escribe en la página.

**La conclusión operativa:** priorizar por *distancia a la primera página*, no por importancia comercial percibida. Una consulta en posición 10 sube; una en posición 87 no, este año.

---

## Fase 0 · La red verificada, y verificable otra vez

«Red neuronal al 100 %» no puede ser una comprobación única: cada despliegue puede romperla. Se convierte en un script que se ejecuta y falla ruidosamente.

**Entregable:** `scripts/audit-seo.mjs`, que comprueba contra producción:

1. **Huérfanas** — toda URL del sitemap recibe al menos un enlace interno.
2. **Callejones sin salida** — ninguna página de práctica con menos de 5 enlaces salientes.
3. **Paridad de FAQs** — preguntas visibles = preguntas en el `FAQPage`.
4. **404 con historial** — ninguna URL que tuvo impresiones devuelve 404.
5. **Conflictos de canónica** — una sola versión de host, sin duplicados www/no-www.
6. **Cadenas de redirección** — ninguna redirección que apunte a otra redirección.

**Criterio de terminado:** el script corre en limpio y se documenta cómo interpretarlo. Se ejecuta antes de cada despliegue grande.

**Estado a 2026-08-02:** los seis criterios se comprobaron a mano y pasan, salvo una huérfana conocida: la raíz `/`, que es competencia de la home.

---

## Fase 1 · Exámenes, por retorno medido

El patrón ya está validado dos veces (ICFES y Cambridge B2): página de examen sin texto no compite; con guía, respuesta directa, FAQ derivada del arreglo visible y enlaces al resto del clúster, sí.

Demanda real medida, ordenada por lo que conviene atacar primero:

| Orden | Examen | Impresiones | Consultas | Pos. media | Guía | Por qué ahí |
|---|---|---|---|---|---|---|
| 1 | **TOPIK** | 35 | 17 | **19,5** | ✗ | Lo más cerca de la primera página y sin competencia local real. El diagnóstico ya está construido. |
| 2 | **IELTS** | **109** | **23** | 28,2 | ✗ | La mayor demanda del sitio. Duro (British Council), pero el volumen lo justifica. Se aplica en Bucaramanga, en la UNAB. |
| 3 | **TOEFL** | 22 | 10 | 29,0 | ✗ | Los simulacros ya existen. Ojo: el TOEFL iBT **no** se aplica en Bucaramanga y el ITP local es otro examen. |
| 4 | **CILS / CELI** | 14 | 9 | 27,9 | ✗ | Nicho, poca competencia, cerca. |
| 5 | **Goethe** | 6 | 4 | 23,2 | ✗ | Poco volumen pero muy cerca. Barato de hacer. |
| 6 | **Celpe-Bras** | 10 | 2 | 61,5 | ✗ | Lejos, pero es **el activo local más fuerte**: se aplica en Bucaramanga (IBRACO como puesto aplicador, UNAB como centro). |
| 7 | **DELF / DALF** | 0 | 0 | — | ✗ | Sin demanda captada todavía. Se construye, no se rescata. |
| — | ICFES | 81 | 14 | 12,8 | ✓ | Hecho el 2026-08-01. |
| — | Cambridge B2 | 101 | 26 | 37,3 | ✓ | Hecho el 2026-08-01. |

**Qué lleva cada guía** (checklist, no negociable):
- Respuesta directa en la primera frase, sobre la duda más buscada de verdad.
- Secciones que respondan consultas **medidas**, no supuestas.
- `title` propio si el nombre oficial no es lo que se teclea (el ICFES se llama «Saber 11 · Componente de Inglés» y nadie busca eso).
- FAQs derivadas del mismo arreglo que se pinta. Nunca marcado aparte.
- Bloque «Sigue por aquí» con el resto del clúster.
- Fuente oficial citada y fecha de verificación. **Nada sin verificar**: ni precios, ni sedes, ni fechas.

---

## Fase 2 · Práctica: convertir impresiones en visitas

La práctica ya recibe tráfico. Lo que no hace es convertirlo.

| Sección | Impresiones |
|---|---|
| `practica/ingles/a1` | **555** |
| `practica/ingles/a2` | 176 |
| `practica/italiano/a1` | 141 |
| `practica/frances/a1` | 113 |
| `practica/ruso/a1` | 103 |
| `practica/portugues/a1` | 102 |

**El problema a resolver:** hay páginas en posición 9 con **cero clics**. `verbo-to-be` tenía 125 impresiones en posición 9,03 y ni un clic — resultó ser un 404, ya corregido. Pero quedan otras con el mismo síntoma y **la causa aún no está diagnosticada**: puede ser el título, la descripción, o que la respuesta se resuelva en el fragmento.

**Trabajo:**
1. Diagnosticar el CTR cero: revisar título y descripción de las 10 páginas de práctica con más impresiones y menos clics.
2. Aplicar respuesta directa arriba en las de mayor demanda (`prepositions-time` tiene 47 consultas distintas y está en posición 51).
3. Cerrar el circuito: cada página de práctica ya enlaza a su hub comercial desde la Fase A.

---

## Fase 3 · Hubs de idioma: alimentarlos, no engordarlos

No se les añade contenido. Se les manda autoridad desde lo que **sí** rankea.

1. Cada artículo del blog que rankea enlaza a su hub con texto de enlace variado y natural. Repetir la misma frase exacta tres veces se lee como manipulación y desaprovecha las variantes.
2. Cada sección de práctica enlaza a su hub (hecho en la Fase A).
3. Revisar los dos hubs más flacos: **coreano** (1.837 palabras, 5 FAQs) y **Bucaramanga** (1.427, 6 FAQs). Son los únicos donde añadir sí tiene sentido.

---

## Fase 4 · Local — donde está el dinero

Es la fase con mayor valor comercial y la que menos depende de código.

**Del usuario, y bloquea todo lo demás:**
- **Reseñas** en el Perfil de Empresa. El pack local se mueve por reseñas recientes más que por volumen. Las fotos ya están.
- **Categoría principal** del perfil: «Escuela de idiomas», no «Escuela de inglés» — se enseñan ocho.
- Nunca ocultar la dirección.

**De código, ya hecho:** NAP coherente en todas las landings, `LocalBusiness` + `LanguageSchool` con geo y horarios, `CourseInstance` presencial además de online, y el hub de Bucaramanga apuntando a «cursos … presenciales», que es lo que se busca.

---

## Fase 5 · Autoridad externa — la pieza que falta

Aquí está el cuello de botella real y conviene ser honesto: **nadie enlaza a idiomaswl.com desde fuera**. Sin eso, competir por «clases de italiano» contra escuelas con años de antigüedad no depende del contenido.

Vías legítimas, en orden de esfuerzo:
1. La práctica gratuita es material genuinamente enlazable: simulacros oficiales del ICFES, gramática por niveles, audio real. Darla a conocer donde ya se busca (foros de estudiantes, grupos de preparación).
2. Menciones locales: directorios de Bucaramanga y Santander, cámara de comercio, universidades.
3. Los resultados reales de estudiantes, con su permiso.

**No** comprar enlaces, no intercambios artificiales, no directorios de spam. Cuesta más de lo que da.

---

## Lo que queda fuera y por qué

- **Core Web Vitals:** el informe dice «datos insuficientes» en móvil y escritorio. No hay tráfico bastante para que Chrome UX Report tenga muestra. No se puede optimizar lo que no se mide.
- **URLs con prefijo `/es/`:** devuelven 200 con canónica correcta al original y no están en el sitemap. Prioridad baja.
- **La home:** es de Codex. El dato para él: `/home` recibe **1.721** enlaces internos y `/` recibe **0**, pero la raíz está en el sitemap y Google la eligió como canónica en contra de lo que declara el sitio. Por eso la home tuvo 47 impresiones en 12 días.

---

## Cómo se mide que esto funcionó

No por posiciones prometidas, que no se pueden garantizar. Por estas señales, comparando con la línea base del 18–29 de julio (55 clics · 3.994 impresiones · CTR 1,38 % · posición media ~15):

1. **Indexación:** que las 470 «Descubierta: actualmente sin indexar» bajen. Es la señal de que la red interna funcionó.
2. **Las 75 redirecciones:** que las impresiones de las URLs viejas se consoliden en las nuevas.
3. **CTR de las páginas en posición 5–15:** es donde un cambio de título se nota primero.
4. **Consultas locales con «presencial»:** son las de mayor valor comercial.

**Plazo realista:** semanas, no días. Google tiene que volver a rastrear, procesar 75 redirecciones, redescubrir cientos de páginas que había descartado y consolidar dos versiones del dominio. Si a la semana no ha cambiado nada, es lo esperado.
