# Blueprints de vocabulario — qué copiamos, de quién, y por idioma

Investigación de agosto de 2026. Complementa a
[`vocabulario-metodologia.md`](vocabulario-metodologia.md): aquella define **el método**, esta
define **de dónde sale cada pieza** y **qué cambia en cada uno de los ocho idiomas**.

La regla de esta investigación fue no asumir que lo que funciona en un idioma funciona en todos.
Se buscó por separado la lista oficial de cada lengua y la plataforma reconocida que mejor resuelve
*su* problema específico. El resultado confirma la sospecha: **el motor puede ser común, pero la
lista base, el ejercicio distintivo y el criterio de dominio son distintos en los ocho.**

---

## Parte 1 — Lo que copiamos para los ocho

Siete piezas de plataformas y de investigación reconocida. Cada una entra con una razón concreta y
con lo que descartamos de ella.

### 1.1 FSRS (Anki) — y por qué **no** lo usamos todavía

FSRS sustituyó a SM-2 en Anki desde la versión 23.10 (noviembre de 2023). Modela tres variables por
tarjeta —dificultad, estabilidad y recuperabilidad— y está entrenado sobre más de 700 millones de
repasos reales. Programa cada tarjeta para el momento exacto en que la probabilidad de recuerdo cae
al umbral que pidas. Resultado típico: **20–30 % menos repasos para la misma retención**.

**Pero:** por debajo de ~1.000 repasos, FSRS no puede ajustar un modelo personal, cae a parámetros
por defecto y rinde igual que SM-2. Nuestro estudiante nuevo está exactamente ahí.

> **Decisión:** arrancamos con el Leitner de 6 cajas que ya está escrito en
> [`src/lib/icfes/srs.ts`](src/lib/icfes/srs.ts), y dejamos la interfaz del programador aislada
> para poder cambiar a FSRS cuando haya volumen. Adoptar FSRS el día uno sería pagar complejidad
> por una mejora que nuestros usuarios todavía no pueden recibir.

### 1.2 Vocabulary.com — un banco de preguntas por palabra, no una pregunta

Es la pieza más valiosa de toda la investigación. Vocabulary.com no tiene una tarjeta por palabra:
tiene **diez tipos de pregunta** por palabra —imagen, sinónimo, ejemplo real, matiz de significado—
y evalúa el conocimiento en una **escala de 20 niveles**, endureciendo la pregunta conforme aciertas.
Distingue tres funciones: preguntas de **evaluación** (¿qué sabes ya?), de **progreso** (hasta
dominar) y de **repaso** (*brush-up*, después de dominar, porque el conocimiento decae).

Lo que copiamos: la tabla caja → ejercicio de la metodología §1 es exactamente esta idea. Y las
preguntas de *brush-up* justifican que `mastered` no sea el final del camino.

Lo que no copiamos: la escala de 20 niveles. Con nuestro volumen, 6 cajas y 5 grados bastan.

### 1.3 WaniKani — *level gating* y el componente antes que el compuesto

Dos mecánicas, ambas robables:

**El bloqueo por consolidación.** No desbloqueas lecciones nuevas hasta que una proporción
suficiente del material actual ha alcanzado cierto nivel de dominio. Es lo que impide que el
estudiante se atragante acumulando deuda de repaso. Nuestra metodología ya decía "las vencidas
ganan"; WaniKani lo hace más duro y mejor: **si no has consolidado, no hay material nuevo, punto.**

**Radicales → kanji → vocabulario.** Nunca te enseña una palabra con un componente que no conoces.
Esto se generaliza fuera del japonés: es exactamente lo que hace falta en coreano (raíces hanja),
en alemán (compuestos y verbos separables) y en ruso (raíces con prefijos).

### 1.4 Clozemaster — el hueco en la frase, no el par palabra-traducción

Clozemaster presenta frases con un hueco, y el hueco es **la palabra menos frecuente de la frase**
dentro de las 10.000 más comunes. Así el resto de la frase siempre es contexto conocido y el hueco
siempre es el punto de aprendizaje.

Es la regla que necesita nuestra caja 4, que ya estaba definida como "hueco en frase real tomada
del corpus de escucha": ahora sabemos **qué palabra ahuecar** cuando la frase tiene varias
candidatas.

### 1.5 Las 20 reglas de Wozniak — cómo se formula una ficha

Compiladas en 1999 por el creador de SuperMemo. Las que nos aplican directamente:

- **Principio de información mínima:** si una ficha se olvida una y otra vez, es que pregunta
  demasiadas cosas a la vez. Hay que partirla.
- **No memorizar sin entender.** Nada de fichas de palabras cuyo ejemplo el estudiante no puede
  leer.
- **Construir sobre lo básico**, nunca saltar a lo complejo.

Esto tiene una consecuencia incómoda para el diseño alemán: *der Schlüssel, die Schlüssel* + su
significado es **más de una información**. La solución no es simplificar la ficha —el género es
parte de la palabra— sino **separar la pregunta**: una caja pregunta significado, otra pregunta
género. Ambas sobre la misma entrada.

### 1.6 Paul Nation — la investigación que valida el ciclo

Nuestro ciclo de cinco momentos (§2 de la metodología) resultó ser, sin haberlo buscado, el marco
de condiciones de aprendizaje de Nation: **noticing, retrieval, varied encounters (receptivo),
varied use (productivo), elaboration**. Coinciden uno a uno con Encuentro, Recuperación,
Reencuentro, Uso propio y Anclaje.

Dos cifras que usamos:

- **8–12 encuentros significativos** por palabra para adquisición. Nuestras 6 cajas más las
  apariciones en escucha cubren la horquilla.
- **Cobertura:** ~3.000 familias de palabras dan el 95 % de un texto típico; ~9.000 dan el 98 %,
  que es el umbral donde se puede inferir por contexto. Esto explica por qué un B1 (2.400 lemas
  expuestos) **todavía necesita glosario**, y por qué el cinturón receptivo debe ir enlazado a
  traducción y no soltado.

### 1.7 Laufer y Webb — por qué el núcleo productivo es obligatorio

La brecha entre conocimiento receptivo y productivo **se ensancha** conforme sube el nivel, y el
vocabulario pasivo puede tardar muchísimo en volverse activo, o no volverse nunca.

Traducción operativa: **no se puede esperar que la exposición active el vocabulario sola.** Si
queremos estudiantes que hablen, el núcleo productivo tiene que drillearse hasta producción. Es el
argumento que sostiene toda la separación núcleo/cinturón.

### 1.8 Memrise — la cara y la voz reales

Memrise construyó su diferencia sobre clips cortos de hablantes nativos reales usando la frase en
situación. Nosotros ya tenemos el equivalente pagado: **480 episodios de escucha con voz**. Lo que
falta no es grabar, es enlazar palabra ↔ episodio (Fase 4 de la metodología).

---

## Parte 2 — La lista base de cada idioma

La pieza que el usuario pidió explícitamente: **cada nivel de cada idioma con su propia lista**. No
hay que inventarlas. Existen, son oficiales, y son distintas.

| Idioma | Lista base oficial | A1 | A2 | B1 | Naturaleza |
|---|---|---:|---:|---:|---|
| **Alemán** | Goethe-Zertifikat, *Wortlisten* A1/A2/B1 | ~650 | ~1.300 | ~2.400 | Lista cerrada y publicada por nivel. La mejor de las ocho |
| **Ruso** | Лексический минимум ТРКИ (ТЭУ / ТБУ / ТРКИ-1) | 780 | ~1.300 | 2.300 | Lista cerrada oficial por nivel |
| **Francés** | FLElex + referenciales *Niveau A1/A2/B1 pour le français* | 500 | 1.000 | 2.000 | Cifras de corpus; el referencial es inventario, no lista numerada |
| **Coreano** | 국립국어원, *한국어 학습용 어휘* (2003) | 초급 (A) 982 | ← mismo tramo | 중급 (B) 2.111 | 5.965 en total, en tres grados. 초급 cubre A1–A2 |
| **Japonés** | JLPT N5 / N4 / N3 | ~800 | ~1.500 | ~3.700 | **No existe lista oficial publicada.** Son estimaciones de la comunidad sobre exámenes pasados |
| **Inglés** | Oxford 3000 por nivel CEFR + English Vocabulary Profile | — | — | — | Etiquetado por nivel, no por cupo. 3.000 lemas de A1 a B2 |
| **Italiano** | *Profilo della lingua italiana* (Spinelli/Parizzi, CVCL Perugia) + *Nuovo vocabolario di base* (De Mauro) | — | — | — | Listas léxicas por nivel; De Mauro aporta ~7.000 en tres tramos |
| **Portugués** | *Referencial Camões PLE* (Instituto Camões) | — | — | — | Inventarios nocionales por **pares** de niveles, no cifra pública |

**Cuatro consecuencias operativas:**

1. **Alemán y ruso son los dos idiomas donde la lista está resuelta.** Se descarga, se filtra por
   frecuencia y se corta al núcleo. Deberían ser los más baratos de llenar, no los más caros.
2. **Japonés es el único sin autoridad.** No hay lista oficial; la comunidad estima. Aquí la lista
   base la construimos nosotros cruzando JLPT estimado con frecuencia, y **hay que decirlo en la
   página** en vez de fingir una autoridad que no existe.
3. **Inglés, italiano y portugués tienen referencia de nivel pero no cupo.** Se etiqueta por nivel
   y el cupo lo pone nuestro núcleo (300/350/400).
4. **Portugués tiene un problema de granularidad:** el Referencial Camões agrupa por pares de
   niveles (A1/A2, B1/B2). Habrá que partir A1 de A2 con criterio de frecuencia propio.

---

## Parte 3 — Los ocho blueprints

Formato idéntico en los ocho, para poder compararlos y para que el código los trate igual salvo en
la capa que de verdad cambia.

---

### 🇬🇧 Inglés

| | |
|---|---|
| **Lista base** | Oxford 3000 filtrado por nivel CEFR, contrastado con el English Vocabulary Profile |
| **Copiamos de** | **Vocabulary.com** (banco de preguntas por palabra) + **enfoque léxico de Michael Lewis** |
| **La mecánica que lo define** | **La unidad no es la palabra: es el *chunk*.** Entre el 55 % y el 80 % del habla nativa sale de frases prefabricadas. Saber *decision* no da *make a decision* |
| **Ficha** | `colocaciones[]`, `phrasal`, `registro` (formal/informal), `acento` (sílaba tónica), `familia[]` |
| **Ejercicio distintivo** | Elegir el colocado: `___ a decision` → *make* / *do* / *take* |
| **Dominio G3** | Produce la colocación completa, no la palabra suelta |
| **Riesgo propio** | El cognado latino engaña: el estudiante hispanohablante escribe *obtain* y *utilize* donde el nativo dice *get* y *use*. Cuesta banda en IELTS. El campo `registro` existe para eso |

El Oxford 3000 es la mejor lista base de las ocho por procedencia: frecuencia sobre el Oxford
English Corpus (2.000 millones de palabras) cruzada con un corpus de materiales de curso, depurada
por 70 profesores, desarrollada con James Milton y revisada por Paul Nation.

---

### 🇩🇪 Alemán

| | |
|---|---|
| **Lista base** | Goethe-Zertifikat *Wortlisten* — ~650 / ~1.300 / ~2.400, **con la mitad de A1 marcada como activa** |
| **Copiamos de** | **WaniKani** (componente antes que compuesto) + la investigación sobre mnemónicos de género |
| **La mecánica que lo define** | **El género y el plural son la palabra.** Y los compuestos y verbos separables son la palanca: *Hand + Schuh*, *auf‑stehen* |
| **Ficha** | `articulo`, `plural`, `separable`, `auxiliar` (haben/sein), `participio`, `regimen` (prep. + caso), `imagenGenero` |
| **Ejercicio distintivo** | **Tarjeta de género separada de la de significado** (regla de información mínima). No vale *Schlüssel*: vale *der Schlüssel, die Schlüssel* |
| **Dominio G3** | Produce artículo + palabra + plural correctos |
| **Riesgo propio** | Hoy alemán es el único de los 24 archivos con campo de género, es opcional, y no se pregunta nunca |

**El hallazgo más accionable de toda la investigación está aquí.** Un estudio con 283 participantes
comparó mnemónicos para retener el género de sustantivos alemanes:

- **Imágenes que codifican significado y género a la vez → lo mejor**, por más de un 57 % sobre las
  demás condiciones en recuerdo inmediato.
- **Color solo → no supera al grupo de control.** Colorear el artículo, que es lo que hace medio
  internet, no funciona.
- **Voces → lo peor de todo.**

Consecuencia de diseño: la ficha alemana lleva `imagenGenero` —una imagen que representa el objeto
*y* su género— y **no** un artículo coloreado. Es una decisión que habríamos tomado al revés por
intuición.

---

### 🇫🇷 Francés

| | |
|---|---|
| **Lista base** | FLElex / referenciales: 500 / 1.000 / 2.000 lexemas. Raíz histórica: *Français Fondamental* (1954, 1.475 palabras; criterios: frecuencia, disponibilidad, utilidad) |
| **Copiamos de** | El método de **dictée** (Lawless French, Yabla, WELE) |
| **La mecánica que lo define** | **La brecha grafía ↔ sonido.** El hispanohablante lee francés y no lo oye. Liaison, elisión y consonantes finales mudas hacen que el francés hablado se parezca poco al escrito |
| **Ficha** | `fonetica`, `liaison`, `genero`, `falsoAmigo`, `audio` (Fase 5) |
| **Ejercicio distintivo** | **Dictado en tres escuchas**: (1) sentido general, (2) por tramos de 5–10 s escribiendo cada palabra, (3) rellenar huecos |
| **Dominio G3** | **Escribe la palabra tras oírla, sin haberla visto** |
| **Riesgo propio** | Un francés A2 construido solo con tarjetas visuales produce un vocabulario que no sirve para entender a nadie |

El dictado es el único ejercicio de los ocho blueprints que **invierte la dirección** del resto: no
va de significado a forma, va de sonido a forma. Es lo que fuerza a cerrar la brecha. Se reporta
mejoras de comprensión auditiva del orden del 40 % con práctica diaria sostenida frente a escucha
pasiva — cifra de divulgación, no de estudio revisado, pero el mecanismo es sólido y el consenso
didáctico es amplio.

Como el audio por palabra llega en la Fase 5, **el dictado arranca con las frases ya grabadas del
corpus de escucha**. Es viable desde el día uno.

---

### 🇮🇹 Italiano

| | |
|---|---|
| **Lista base** | *Profilo della lingua italiana* (Spinelli & Parizzi, CVCL Perugia) — listas léxicas A1–B2. Cruzado con el *Nuovo vocabolario di base* de De Mauro (~7.000 en tres tramos: fundamental, alto uso, alta disponibilidad) |
| **Copiamos de** | La investigación de lingüística contrastiva italiano-español (falsos amigos y fosilización) |
| **La mecánica que lo define** | **La transparencia es una trampa.** El hispanohablante da el italiano por fácil, y esa confianza es justo lo que fosiliza el error |
| **Ficha** | `articulo`, `dobleConsonante`, `falsoAmigo`, `pluralIrregular` |
| **Ejercicio distintivo** | Par mínimo de consonante doble — *nonno/nono*, *casa/cassa*, *pena/penna* — presentado **en audio**, porque en texto es invisible |
| **Dominio G3** | Escribe la doble consonante y el artículo correctos |
| **Riesgo propio** | Género divergente respecto al español: *il fiore*, *il latte*, *il sale*, *il miele*. Y plurales irregulares: *l'uovo → le uova* |

La investigación es explícita en algo que cambia el calendario: **los falsos amigos hay que marcar-
los desde el principio, antes de que fosilicen**, no cuando aparecen. Y los más insidiosos no son
los sustantivos llamativos sino **los elementos funcionales** —preposiciones y conectores casi
homófonos que no funcionan igual, tipo *come/como*—, que pasan desapercibidos precisamente por ser
pequeños.

Consecuencia: en italiano (y en portugués), **el bloque de falsos amigos no es una unidad más al
final: se reparte desde la primera semana de A1.**

---

### 🇧🇷 Portugués

| | |
|---|---|
| **Lista base** | *Referencial Camões PLE* (inventarios nocionales, agrupados por pares de niveles) + partición propia por frecuencia para separar A1 de A2 |
| **Copiamos de** | **Practice Portuguese** (*Smart Review*) + los repertorios de falsos amigos PT-ES |
| **La mecánica que lo define** | El mayor regalo y la mayor trampa de los ocho: comprensión casi inmediata, y falsos amigos de altísima frecuencia |
| **Ficha** | `falsoAmigo` (con el par español), `registro` BR/PT, `nasal` |
| **Ejercicio distintivo** | Discriminación en frase con el falso amigo como distractor fijo |
| **Dominio G3** | Usa el falso amigo correctamente en una frase, no solo lo reconoce |
| **Riesgo propio** | El *portunhol* fosilizado. Y las nasales (*ão, ãe, õe*) y la apertura vocálica (*avô / avó*), que no se ven en la escritura |

Los falsos amigos que más daño hacen son los de uso diario, no los exóticos: *esquisito* (raro, no
exquisito), *borracha* (goma), *oficina* (taller), *propina* (soborno), *apelido* (apodo), *aula*
(clase), *copo* (vaso), *ligar* (llamar), *pelado* (desnudo), *rato* (rato / ratón).

**Aviso de granularidad:** el Referencial Camões agrupa A1 con A2 y B1 con B2. Es el único de los
ocho donde la lista base no viene ya partida por nivel, y hay que partirla nosotros por frecuencia.
Conviene que lo valide Zhanna.

---

### 🇷🇺 Ruso

| | |
|---|---|
| **Lista base** | Лексический минимум ТРКИ — 780 (ТЭУ/A1) / ~1.300 (ТБУ/A2) / 2.300 (ТРКИ-1/B1). Lista cerrada oficial |
| **Copiamos de** | Las herramientas de acentuación automática (**russiangram.com**, **Ready Russian Stress Finder**) + **WaniKani** para raíces y prefijos |
| **La mecánica que lo define** | **El acento se aprende con la palabra, como paquete indivisible.** Ortografía + significado + sílaba tónica, en una sola pieza |
| **Ficha** | `acento` (marcado), `genero`, `parAspectual`, `caso` que rige |
| **Ejercicio distintivo** | **Marcar la sílaba tónica al oír la palabra** |
| **Dominio G3** | Produce la palabra con acento y aspecto correctos |
| **Riesgo propio** | La forma de diccionario casi nunca es la que se oye. Seis casos, y el acento puede moverse al declinar |

Por qué el acento no es un detalle de pronunciación sino de vocabulario: **el acento gobierna la
reducción vocálica.** La о solo suena "o" cuando está acentuada; si el estudiante coloca mal el
acento, todas las vocales de la palabra le salen mal, y deja de ser reconocible. Y a veces cambia
el significado: *за́мок* (castillo) / *замо́к* (candado).

Dato operativo: en texto ruso normal el acento **no se escribe**. El único marcador que aparece de
forma natural es la letra ё, que siempre lleva el acento. Nuestras fichas lo marcan siempre; el
corpus de escucha lo aporta en voz.

Los pares aspectuales (*делать / сделать*) son la segunda decisión de esquema: **una entrada con
dos formas**, no dos entradas — si no, el SRS las trata como palabras distintas y el estudiante
nunca aprende que son la misma idea.

---

### 🇰🇷 Coreano

| | |
|---|---|
| **Lista base** | 국립국어원, *한국어 학습용 어휘 목록* (2003): 5.965 palabras en tres grados — 초급 982 / 중급 2.111 / 고급 2.872 |
| **Copiamos de** | **WaniKani**, íntegro: componente → compuesto, *level gating*, mnemónicos |
| **La mecánica que lo define** | **Las raíces sino-coreanas (한자어).** En torno al 60 % del léxico coreano viene del chino y sigue patrones predecibles. 학(學) abre 학교, 학생, 대학, 학기 |
| **Ficha** | `hangul`, `romanizacion`, `raizHanja?`, `formalidad`, `contador?`, `particula` |
| **Ejercicio distintivo** | Elegir la forma **según el interlocutor** (a tu jefe / a tu amigo) — los niveles de habla no son un adorno |
| **Dominio G3** | Produce la palabra con partícula y nivel de habla correctos |
| **Riesgo propio** | Homófonos: muchas sílabas hanja suenan igual y significan cosas distintas. Es el punto donde el método de raíces se rompe si no se cuida |

La investigación es directa: enseñar el significado del morfema hanja mejora la retención de
vocabulario sino-coreano, y **con 50–100 raíces el estudiante deja de ver una lista infinita y
empieza a ver un sistema de bloques**.

**Propuesta que sigue abierta** (decisión 6 de la metodología): que **una de cada cinco unidades
semanales sea una unidad de raíz** —una raíz hanja y las nueve palabras que abre— en lugar de una
unidad temática. Es literalmente el modelo de WaniKani trasplantado al coreano, y es lo que más
cambiaría la curva de este idioma.

---

### 🇯🇵 Japonés

| | |
|---|---|
| **Lista base** | JLPT N5 ~800 / N4 ~1.500 / N3 ~3.700. **Ojo: la Japan Foundation no publica lista oficial.** Son estimaciones de la comunidad sobre exámenes pasados |
| **Copiamos de** | **WaniKani** (radicales → kanji → vocabulario, 60 niveles, gating) + el formato de los mazos **Core 2k/6k**: tarjeta basada en frase con audio |
| **La mecánica que lo define** | Igual que coreano —la raíz manda— pero con una capa más: el mismo kanji tiene lecturas 音読み y 訓読み distintas según la palabra |
| **Ficha** | `kanji`, `furigana`, `romaji`, `lectura` (on/kun), `contador?`, `parTransitivo?`, `jlpt` |
| **Ejercicio distintivo** | Escribir la **lectura correcta del kanji en contexto** — no la lectura "de la palabra", la que toca en esa frase |
| **Dominio G3** | Produce la palabra con la lectura correcta dentro de la frase |
| **Riesgo propio** | Es el único idioma sin autoridad de lista. Hay que construirla y **decir en la página que es nuestra**, no fingir oficialidad |

**Lo que aprendimos de las críticas a Core 2k/6k y conviene no repetir:** el consenso de la
comunidad se ha ido moviendo a mazos más nuevos porque en Core la calidad de audio es irregular,
algunas frases de ejemplo suenan artificiales, y el orden de frecuencia mete léxico de negocios
antes que palabras básicas —se aprende "envío de mercancía" antes que "probablemente".

Nosotros no tenemos ese problema porque **nuestras frases de ejemplo salen del corpus de escucha
narrativo**, que fue escrito para sonar a conversación. Es una ventaja real que conviene no perder
al llenar el catálogo: **la frase de ejemplo se toma del corpus, no se inventa.**

---

## Parte 4 — Lo que decidimos **no** copiar

Tan importante como lo anterior, y con razón en cada caso:

| Descartado | De dónde viene | Por qué no |
|---|---|---|
| **FSRS desde el día uno** | Anki | Bajo ~1.000 repasos rinde como SM-2. Complejidad sin beneficio para el usuario nuevo |
| **Colorear el artículo por género** | Práctica común en enseñanza de alemán | El estudio con 283 participantes muestra que el color solo **no supera al grupo de control** |
| **Mnemónicos por voz** | Variantes de método multimodal | En ese mismo estudio fueron la peor condición de todas |
| **Mnemónicos generados por usuarios** | Memrise (*mems*) | Calidad muy variable. Con Zhanna disponible, curamos |
| **Ordenar el catálogo solo por frecuencia bruta** | Core 2k/6k | Mete léxico de negocios antes que palabras básicas. Frecuencia **cruzada con** nivel y utilidad |
| **Racha por encima de dominio** | Gamificación tipo Duolingo | Premia abrir la app, no producir. Nuestra métrica visible es el % del núcleo en G3 |
| **Escala de 20 niveles de conocimiento** | Vocabulary.com | Necesita millones de respuestas para calibrar. Nuestras 6 cajas × 5 grados bastan |

---

## Parte 5 — Cómo se escala

El blueprint no se aplica a los ocho a la vez. Orden propuesto, y el motivo:

1. **Inglés** — sostiene las landings de venta, y su lista base (Oxford 3000 por nivel) es la más
   limpia de obtener.
2. **Alemán** — la lista Goethe está cerrada y publicada por nivel; es el llenado más barato y
   además valida el caso más exigente del esquema (género + plural + régimen).
3. **Coreano** — el otro idioma de venta, y donde el modelo de raíces cambia más la curva.
4. **Ruso** — lista ТРКИ cerrada; prueba el caso `acento` + `parAspectual`.
5. **Francés, italiano, portugués** — los tres transparentes juntos, porque comparten mecánica de
   falsos amigos y se pueden construir en paralelo.
6. **Japonés** — el último, porque es el único donde hay que construir la lista base desde cero.

Los dos primeros validan los dos extremos del esquema (`LangExtra` mínimo en inglés, máximo en
alemán). Si el esquema aguanta esos dos, aguanta los seis restantes.

---

## Fuentes

**Motor y método**
- [What spaced repetition algorithm does Anki use? — Anki FAQs](https://faqs.ankiweb.net/what-spaced-repetition-algorithm)
- [FSRS vs SM-2 — antiagent.io](https://www.antiagent.io/blog/fsrs-vs-sm-2)
- [The FSRS Spaced Repetition Algorithm — RemNote](https://help.remnote.com/en/articles/9124137-the-fsrs-spaced-repetition-algorithm)
- [How it works — Vocabulary.com](https://www.vocabulary.com/how-it-works/)
- [Question Types and Modes — Vocabulary.com](https://www.vocabulary.com/help/the-basics/question-types-and-modes)
- [WaniKani](https://www.wanikani.com/)
- [WaniKani Levels Explained — Wakoku](https://wakokujp.com/wanikani-levels-explained/)
- [Cloze tests and spaced repetition — Clozemaster](https://www.clozemaster.com/blog/cloze-tests-spaced-repetition-faster-language-learning/)
- [Cloze deletion vs flashcards — Clozemaster](https://www.clozemaster.com/blog/cloze-deletion-vs-flashcards/)
- [Twenty rules of formulating knowledge — SuperMemo](https://www.supermemo.com/en/blog/twenty-rules-of-formulating-knowledge)
- [Evaluating the vocabulary load of written text — Webb & Nation (PDF)](https://www.wgtn.ac.nz/lals/resources/paul-nations-resources/paul-nations-publications/publications/documents/2008-Webb-Evaluating-vocabulary-load.pdf)
- [Vocabulary within a Four Strands Curriculum: an interview with Paul Nation (PDF)](https://www.tesolunion.org/attachments/files/FNTC2FNDHKDYZM52ZWFLFNWM0FZMI15MMIXENGMZBZWQXDYMU19MDI14MMRJ2M2NL9OTY06MJIZ5ZTE5BMTE05MMUW4LJC35NJAZ9NDK16LJRL.pdf)
- [The effects of receptive and productive learning of word pairs — Webb (2009)](https://journals.sagepub.com/doi/10.1177/0033688209343854)
- [Receptive and productive vocabulary learning — Cambridge Core](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/abs/receptive-and-productive-vocabulary-learning-the-effects-of-reading-and-writing-on-word-knowledge/DDF362AE7B13D1949B1CD591DA2F3414)
- [Memrise](https://www.memrise.com/)

**Listas oficiales por idioma**
- [Goethe-Zertifikat A1 Wortliste (PDF)](https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf) · [A2 (PDF)](https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf) · [B1 (PDF)](https://www.goethe.de/pro/relaunch/prf/en/Goethe-Zertifikat_B1_Wortliste.pdf)
- [About the Oxford 3000 and 5000 — Oxford Learner's Dictionaries](https://www.oxfordlearnersdictionaries.com/about/wordlists/oxford3000-5000) · [The Oxford 3000 by CEFR level (PDF)](https://www.oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/The_Oxford_3000_by_CEFR_level.pdf)
- [Лексический минимум по русскому языку как иностранному — ТЭУ (А1)](https://www.studocu.com/ru/document/moscow-city-university/linguistics/leksicheskiy-minimum-po-russkomu-yazyku-kak-inostrannomu-teu-a1/137109471) · [Лексический минимум А1–С1](https://idioma-ruso.livejournal.com/1841.html)
- [국립국어원 — 한국어 학습용 어휘 목록](https://www.korean.go.kr/front/etcData/etcDataView.do?mn_id=46&etc_seq=71)
- [Referencial Camões PLE (ebook, PDF)](https://www.instituto-camoes.pt/images/REFERENCIAL_ebook.pdf) · [Página del Referencial](https://www.instituto-camoes.pt/activity/centro-virtual/referencial-camoes-ple)
- [Il Profilo della lingua italiana — CVCL, Università per Stranieri di Perugia](https://www.unistrapg.it/en/conoscere-l-ateneo/organi-e-strutture/center-for-language-evaluation-and-certification/progetti-cvcl/il-profilo-della-lingua-italiana-livelli-del-qcer-a1-a2-b1-b2)
- [Approche par fréquence pour l'enseignement du vocabulaire du français — Formation et profession](https://www.erudit.org/en/journals/fp/2020-v28-n2-fp05872/1075662ar/)
- [Listes officielles de vocabulaire par niveau — Ville de Genève / InterroGE](https://www.geneve.ch/themes/culture/bibliotheques/interroge/reponses/existe-t-il-des-listes-officielles-de-vocabulaire-et-de-regles-de-grammaire-en-fonction-des-niveaux-a1-a2-b1-etc-quil-faut-connaitre-apprendre-le-francais)
- [JLPT vocabulary lists — Migaku](https://migaku.com/blog/japanese/jlpt-vocabulary-lists)

**Métodos por idioma**
- [The Lexical Approach — Michael Lewis (reseña, TESL-EJ)](https://tesl-ej.org/wordpress/issues/volume1/ej02/ej02r3/) · [Lexical approach — Wikipedia](https://en.wikipedia.org/wiki/Lexical_approach)
- [Can colors, voices, and images help learners acquire the grammatical gender of German nouns? — ERIC](https://eric.ed.gov/?id=EJ1065542) · [versión en ResearchGate](https://www.researchgate.net/publication/280206673_Can_colors_voices_and_images_help_learners_acquire_the_grammatical_gender_of_German_nouns)
- [Dictées — Lawless French](https://www.lawlessfrench.com/listening/dictees-pwlf/) · [Why dictation training works — Yabla](https://www.yabla.com/yabla-blog/dictation-training/)
- [I falsi amici nell'apprendimento dell'italiano come lingua straniera (PDF)](https://rdu.unc.edu.ar/bitstream/handle/11086/14123/ANGARONI.pdf?sequence=1&isAllowed=y) · [L'influenza della L1 nell'apprendimento di lingue affini — ResearchGate](https://www.researchgate.net/publication/46184662_L%27INFLUENZA_DELLA_L1_NELL%27APPRENDIMENTO_DI_LINGUE_AFFINI_ANALISI_DELLE_INTERFERENZE_LINGUISTICHE_DI_ISPANOFONI_APPRENDENTI_L%27ITALIANO_COME_LINGUA_STRANIERA)
- [False cognates PT/ES — Practice Portuguese](https://www.practiceportuguese.com/learning-notes/false-cognates/)
- [The impact of Hanja-based syllables on Korean vocabulary learning — ResearchGate](https://www.researchgate.net/publication/332582938_The_Impact_of_Hanja-Based_Syllables_on_Korean_Vocabulary_Learning)
- [Russian word stress — Elon.io](https://elon.io/grammar/russian/pronunciation/word-stress-basics) · [RussianGram — stress marking tool](https://russiangram.com/)
- [Core 2k/6k Optimized Japanese Vocabulary — AnkiWeb](https://ankiweb.net/shared/info/1880390099) · [Best Japanese Anki decks — Migaku](https://migaku.com/blog/japanese/best-japanese-anki-decks)
- [How to implement cognate instruction — Iowa Reading Research Center](https://irrc.education.uiowa.edu/blog/2026/05/how-implement-cognate-instruction)
