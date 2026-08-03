# Plan de ataque — Fase 5: Superhub, inglés y limpieza

Feedback del usuario tras revisar los 8 hubs y el nav (2026-08-01). El avance fue grande, pero quedaron seis cosas.

---

## 1. El nav "Idiomas" deja de ser desplegable al pasar el cursor

**Problema:** hoy `SiteNav.tsx` abre el menú con `onMouseEnter`. Al usuario no le gusta: se despliega solo al rozarlo.

**Qué queremos:** "Idiomas" es un **enlace normal** que lleva a `/clases-de-idiomas`. Un clic, y ahí está el superhub completo. Sin menú flotante en escritorio.

**Por qué es mejor, no solo un gusto:**
- Un menú al pasar el cursor no existe en móvil, donde está la mayoría del tráfico.
- Manda todo el peso de enlazado interno a una sola página fuerte, en vez de repartirlo en un menú que Google trata como navegación global.
- Es un clic hacia una página que puede rankear, en lugar de un atajo que se salta el superhub.

En móvil el acordeón actual puede quedarse: ahí sí es el patrón correcto.

---

## 2. `/clases-de-idiomas` se convierte en el SUPERHUB de verdad

Orden de la página:

1. **Hero con David y Zhanna como políglotas.** No una foto decorativa: los dos, con lo que cada uno habla y su rol. Es la primera prueba de que detrás hay personas.
2. **Los 8 idiomas, clicables.** Cada tarjeta abre su hub. Ya existen los 8.
3. **Los certificados que preparamos** — la sección que falta. Son nueve y ya están en `src/data/exams.ts`:

   | Idioma | Certificados |
   |---|---|
   | Inglés | **IELTS**, **TOEFL iBT**, **Cambridge B2 First**, **ICFES** (Saber 11) |
   | Alemán | **Goethe-Zertifikat** |
   | Coreano | **TOPIK** |
   | Francés | **DELF / DALF** |
   | Italiano | **CILS / CELI** |
   | Portugués | **Celpe-Bras** |

   Cada uno enlaza a su simulacro en `/examenes/<slug>`. Esto cierra la red: idioma → certificado → simulacro → práctica.
4. **Presencial en Bucaramanga + online**, con la ficha de la sede.

---

## 3. Inglés al blueprint

Es el único hub que no siguió el patrón. Le falta: sección local de Bucaramanga, schema de negocio local completo, banda de práctica con la red de recursos, y FAQs locales.

Ojo con la estrategia, que aquí es distinta: **no se pelea "clases de inglés online"** — ahí están British Council, Open English y Platzi. Se pelea `clases de inglés Bucaramanga` y el clúster de exámenes, apoyándose en `/clases-de-ingles-bucaramanga`, que hoy está infrautilizada.

---

## 4. Fuera los precios

Del nav y de la página, hasta que el usuario decida la estrategia de precios. Afecta a `SiteNav.tsx`, a la home y a las landings que enlazan a `/precios`.

**Decisión pendiente:** ¿la ruta `/precios` se elimina, o se deja publicada pero sin enlaces? Recomiendo **dejarla viva y desenlazada**: borrarla generaría 404 en enlaces externos y en el índice de Google. Cuando se retome, solo hay que volver a enlazarla.

---

## 5. ¿Blog en el nav principal?

**Recomendación: sacarlo.** Razones:
- El nav principal es para quien está decidiendo comprar. El blog es para quien llega desde Google, y esa gente aterriza directo en el artículo — no pasa por el menú.
- El nav queda en los cinco ítems que el usuario pidió, sin ruido.
- **No se pierde SEO** si el blog sigue enlazado desde el pie de página y desde la sección "Del blog" de cada hub, que ya existe en todos.

---

## 6. "Quiénes somos" se siente escrita por IA

**Diagnóstico honesto:** la escribí con lo único que tenía —el rol de cada uno y los testimonios ya publicados— y eso produce texto genérico. No es un problema de redacción: es falta de material real.

**Lo que la haría buena, y solo el usuario lo tiene:**
- Trayectoria de Zhanna: dónde estudió exactamente, qué estudió, cuántos años enseñando, qué idiomas habla y a qué nivel.
- Trayectoria de David: cómo pasó de un idioma a ocho, cuánto tardó, qué certificaciones tiene.
- Resultados concretos: cuántos estudiantes, cuántos certificados obtenidos, casos con nombre y desenlace.
- Por qué fundaron WeLearn y qué los diferencia.

Sin esos datos, cualquier reescritura va a sonar igual de vacía. **Se pide al usuario antes de tocar la página.**

---

## Orden de ejecución

| # | Tarea | Bloqueada |
|---|---|---|
| 1 | Nav: "Idiomas" como enlace + quitar Precios y Blog | No |
| 2 | Superhub con hero de fundadores + certificados | No |
| 3 | Inglés al blueprint (con research local propio) | No |
| 4 | Quitar precios del resto del sitio | No |
| 5 | Reescribir "Quiénes somos" | **Sí — faltan datos del usuario** |

Se ejecuta 1-4 mientras el usuario reúne el material del punto 5.
