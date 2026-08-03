# Inventario publicado de Práctica y Exámenes

**Fuente de verdad inicial acordada:** lo que aparece hoy en las páginas de Práctica y Exámenes se considera oferta publicada.  
**Corte técnico:** 26 de julio de 2026  
**Estado:** inventario de catálogo + muestra funcional realizada. Las 178 entradas aún no han sido auditadas individualmente.

---

# 1. Práctica de idiomas

La página principal de Práctica presenta ocho idiomas disponibles:

| Idioma | Enfoque que declara el catálogo |
|---|---|
| Inglés | lectura A1, gramática interactiva, escritura y frases de supervivencia |
| Alemán | lectura, gramática, escritura y habla en A1 |
| Francés | lectura, gramática, escritura y expresión oral en A1 |
| Italiano | artículos, tiempos verbales y gramática interactiva en A1 |
| Portugués | lectura, gramática, escritura y expresión oral en A1 |
| Ruso | alfabeto cirílico, casos, pronunciación y gramática en A1 |
| Coreano | hangul, batchim, partículas y pronunciación |
| Japonés | hiragana, katakana, cópula y vocabulario |

La página también ofrece progreso local mediante racha, XP, habilidades completadas y `Mi vocabulario`, cuando existe actividad guardada en el dispositivo. El panel completo de progreso requiere autenticación y todavía no cuenta con una captura demo autorizada.

# 2. Práctica de exámenes destacada

La página principal de Práctica muestra tres accesos:

| Examen | Oferta visible |
|---|---|
| IELTS Academic | lectura, Writing Task 1 y Task 2, y retroalimentación |
| TOEFL iBT | lectura académica con preguntas y explicaciones |
| ICFES Saber 11 | gramática, conectores, sinónimos, inferencia, ruta adaptativa y simulacros |

Esto no limita el catálogo general de Exámenes; simplemente describe lo que la portada de Práctica destaca hoy.

# 3. Catálogo de exámenes

El catálogo general marca nueve familias como disponibles:

| Familia | Idioma | Entradas listadas |
|---|---|---:|
| IELTS | Inglés | 20 |
| TOEFL iBT | Inglés | 20 |
| ICFES Saber 11 | Inglés | 33 |
| Goethe-Zertifikat | Alemán | 25 |
| CILS / CELI | Italiano | 20 |
| DELF / DALF | Francés | 20 |
| TOPIK I | Coreano | 10 |
| CELPE-Bras | Portugués | 20 |
| Cambridge B2 First | Inglés | 10 |
| **Total de catálogo** |  | **178** |

# 4. Cómo debe contarse en el Home

Hasta completar una prueba funcional, el Home puede afirmar:

> Explora práctica en ocho idiomas y preparación para nueve familias de exámenes.

Todavía no debe afirmar:

> Más de 178 simulacros completos.

La segunda formulación exige comprobar que cada entrada:

- abre una ruta válida;
- tiene todas las partes disponibles;
- puede completarse;
- ofrece corrección o clave cuando se promete;
- no está marcada internamente como pendiente;
- usa correctamente las denominaciones y materiales de terceros.

El catálogo contiene, por ejemplo, entradas de Cambridge B2 que indican `Listening pendiente`. Por esa razón, `178` es hoy un conteo de catálogo, no un conteo auditado de simulacros completos.

# 5. Copy seguro para la arquitectura

## Home

> Practica inglés, alemán, francés, italiano, portugués, ruso, coreano y japonés, y encuentra preparación específica para exámenes internacionales y nacionales.

## Sección de producto

> Lecciones, práctica por habilidad, simulacros, ejemplos y correcciones conectados con la meta que quieres alcanzar.

## Sección de exámenes

> Explora preparación para IELTS, TOEFL, ICFES Saber 11, Goethe-Zertifikat, CILS/CELI, DELF/DALF, TOPIK, CELPE-Bras y Cambridge B2.

El uso público de los nombres de exámenes debe acompañarse de avisos de independencia cuando sus titulares lo exijan. No se usarán logos como decoración ni se afirmará aval oficial sin contrato.

# 6. Resultado de la muestra funcional

El 26 de julio de 2026 se comprobaron en producción:

- el catálogo principal de Práctica;
- el flujo completo y anónimo de Nivel Radar;
- el catálogo general de Exámenes;
- los hubs y motores de una muestra de IELTS, TOEFL, ICFES y Cambridge B2;
- una actividad guiada de IELTS Writing con feedback;
- el hub de práctica de alemán.

La muestra confirmó que existen motores funcionales, pero encontró cantidades contradictorias entre catálogo, portada y motor:

- IELTS Set 1: `80`, `36` y `83`, según la vista;
- TOEFL Set 1: `42` y `56`;
- Cambridge B2 Set 2: el hub dice `Listening pendiente`, mientras el motor ofrece Listening y muestra `88` respuestas.

También se comprobó que:

- ICFES Mock 1 mantiene 7 partes y 45 preguntas entre portada y motor;
- alemán ofrece A1, A2 y B1, mientras B2 y C1 aparecen como próximos;
- el feedback guiado de Writing funciona, pero no demuestra por sí solo una corrección integral con IA;
- el panel de progreso redirige al inicio de sesión.

La evidencia y el detalle están en `AUDITORIA-FUNCIONAL-Y-CAPTURAS-PRODUCTO.md`.

# 7. Auditoría exhaustiva pendiente

Antes de cerrar cifras:

1. abrir las 178 rutas;
2. registrar estado `completo`, `parcial`, `pendiente` o `roto`;
3. contar ejercicios y preguntas realmente utilizables;
4. separar material propio de material licenciado/oficial;
5. revisar las afirmaciones `oficial`, `formato oficial`, `preguntas reales` y similares;
6. reconciliar este catálogo con metadata, sitemap y páginas públicas.
