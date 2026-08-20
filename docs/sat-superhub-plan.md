# El superhub de SAT — plan del clúster

Escrito el 19 de agosto de 2026, después de mirar quién ocupa hoy la primera página
de Google en español. **No es una lluvia de ideas: cada página de aquí abajo existe
porque hay alguien peor que nosotros ocupando ese sitio, o porque no hay nadie.**

Estado de partida: **una URL indexable de SAT** (`/examenes/sat`) y un simulacro
`noindex`. El superhub de ICFES, para comparar, tiene once secciones. Una página
buena no domina un nicho.

---

## 1. Qué hay hoy en la primera página, en español

Lo miré el 19 ago 2026. Dos familias, y ninguna hace lo que nosotros podemos hacer.

**Agencias y consultoras de admisión.** Crimson Education, Educa College Prep,
Seeking English, Global MAE, Master's College, Oriel, Educaedu. Escriben la guía
para captar la asesoría. Su contenido es correcto y **genérico**: qué es el SAT,
cuánto dura, cuánto cuesta. Ninguna baja al detalle de cómo se responde una pregunta.

**Blogs de academias de idiomas.** EF, Beyond Education, viviendoelsueño. Lo mismo,
más corto.

Dos huecos, y son grandes:

- **Nadie en español explica los cuatro dominios de Reading and Writing uno por uno.**
  Ese material existe —Princeton Review, UWorld, Albert, PrepMaven, Acely— y está
  **todo en inglés**. Un estudiante colombiano que quiere entender qué le van a
  preguntar en *Craft and Structure* no tiene dónde leerlo en su idioma.
- **Nadie ofrece un módulo real gratis.** Lo que hay son diagnósticos de 20 minutos
  con puntaje "predictivo" que existen para pedirte el teléfono. Nosotros tenemos
  27 preguntas, 32 minutos, los cuatro dominios en proporción, y un dato que ninguno
  de ellos puede enseñar: **23,1 % a ciegas contra un 25 % de azar**.

## 2. Dónde no vamos a competir

En inglés. "SAT practice test" lo tienen College Board y Khan Academy, que es su
socio oficial y es gratis. Ir de frente ahí es quemar meses para llegar decimoquintos.

Esto no nos deja fuera de Estados Unidos: **la familia hispana dentro de EE. UU. busca
en español**, y es la misma página que sirve al estudiante colombiano. No hace falta
versión en inglés ni `hreflang`; hace falta contenido que responda a cada uno.

Una versión en inglés sigue siendo **decisión de David**, no del loop.

## 3. La forma del clúster

Híbrido, porque el repositorio ya gana de dos maneras distintas y no hay que elegir:

**El espinazo — `/examenes/sat/guia/<slug>`.** Páginas de referencia permanentes,
atadas al producto: el desglose por dominio del simulacro enlaza directo a la página
de ese dominio. Son las que no tienen competencia en español.

Ruta técnica: `src/app/(site)/examenes/[exam]/guia/[slug]/page.tsx`. El segmento
`guia` es estático bajo `[exam]`, igual que `practica`, así que no choca con nada.
`generateStaticParams` solo emite los slugs que existan.

**Las ramas — `/blog/<slug>`.** Los temas informativos de alto volumen ya tienen aquí
un motor probado: 35 artículos, `Article` en JSON-LD, imagen social por artículo y
enlaces en las dos direcciones. Sale más barato y posiciona igual.

## 4. Las páginas, por orden de a quién le quitamos el sitio

Prioridad = cuánta demanda hay × lo malo que es quien la ocupa hoy.

### Espinazo — `/examenes/sat/guia/…`

| # | Slug | Qué responde | Competencia en español |
|---|---|---|---|
| E2 | `reading-and-writing` | La sección entera: 54 preguntas, dos módulos, los cuatro dominios y cómo se reparten | **Ninguna.** Es la página madre del espinazo |
| E3 | `craft-and-structure` | Vocabulario en contexto, propósito, estructura, dos textos. El dominio con más peso | **Ninguna** |
| E4 | `information-and-ideas` | Idea central, evidencia textual y con datos, inferencias | **Ninguna** |
| E5 | `standard-english-conventions` | Puntuación y gramática: las reglas cerradas. La mejora más barata del examen | **Ninguna** |
| E6 | `expression-of-ideas` | Transiciones y síntesis de notas | **Ninguna** |
| E7 | `como-estudiar-sat-desde-cero` | Plan de estudio por semanas según de dónde partes | Genérica y de agencia |

### Ramas — `/blog/…`

| # | Tema | Por qué | Quién lo ocupa |
|---|---|---|---|
| E8 | Qué puntaje de SAT necesitas, por tipo de universidad | Intención altísima, decide la compra | Crimson, con un artículo bueno |
| E9 | El SAT desde Colombia: sedes, fechas, inscripción | Búsqueda local y nuestra casa | Seeking English, contenido flojo |
| E10 | SAT o ACT: cuál presentar | Duda universal, no la respondemos en ninguna parte | Agencias |
| E11 | SAT y TOEFL/IELTS: por qué te piden los dos | **Tenemos los tres exámenes.** Nadie más puede enlazar así | Nadie lo cruza bien |

## 5. Reglas al escribir cualquiera de estas páginas

Salen de lo que ya nos ha mordido, no de teoría.

1. **Nada sin fuente oficial verificable.** Ni una fecha, ni un precio, ni una sede
   escritos a mano: College Board los rehace cada año escolar. Se enlaza a la página
   oficial y se dice qué vas a encontrar cuando llegues. Ya nos pasó: `exams.ts` dijo
   durante semanas «desde 2024 es digital», que es la fecha de Estados Unidos y no la
   nuestra — fuera de EE. UU. fue **marzo de 2023**.
2. **La primera frase responde.** Es la que citan los motores de respuesta. Si empieza
   con «En el mundo actual de las admisiones universitarias», la página no sirve.
3. **Las preguntas frecuentes visibles y las del marcado salen del mismo arreglo.**
   Nunca se escribe el `FAQPage` aparte: esa divergencia es lo que Google castiga.
4. **Nada en el marcado que no esté visible en la página.** Vale igual para
   `LearningResource`, `citation` y `sameAs`.
5. **Secciones de 100 a 150 palabras, con la entidad repetida.** Es lo que un motor
   de respuesta puede extraer entero sin recortar a mitad de idea.
6. **Cada página enlaza al simulacro y el simulacro enlaza de vuelta**, por dominio.
   Un clúster sin enlaces internos son páginas sueltas con una portada.

## 6. Cómo se sabe que una página está hecha

`tsc` limpio, `build` verde, guardianes del prebuild verdes, `metadata` con título y
descripción propios, `canonical`, JSON-LD, entrada en `sitemap.ts`, y enlaces en las
dos direcciones. Sin eso es una página que compila, no una página publicada.

## 7. Lo que este plan no resuelve

- **Medir.** Ninguna de estas páginas existe todavía en producción, así que Search
  Console no tiene ni un dato de SAT. La prioridad de arriba está razonada sobre la
  SERP, no sobre nuestras impresiones. **A las tres semanas de publicar hay que
  volver a mirar y reordenar con datos reales.**
- **El módulo 2** del simulacro, y los ítems de completar el hueco. Van aparte.
