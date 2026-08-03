# Wireframe de contenido del Home · Versión 1

**Idiomas WeLearn**  
**Fecha:** 26 de julio de 2026  
**Estado:** especificación lista para maqueta visual; no es todavía implementación ni autorización para publicar  
**Fuentes:** arquitectura narrativa, dossier de demanda, auditoría funcional, inventario de producto y auditoría preliminar de certificados

---

# 1. Decisión de diseño

## Sujeto, audiencia y trabajo de la página

**Sujeto:** una academia de idiomas nacida en Bucaramanga, con atención online, creada y guiada por dos personas que conocen el aprendizaje desde la pedagogía y desde la experiencia políglota.

**Audiencia principal:** una persona que tiene una meta relacionada con un idioma, pero no sabe con precisión qué nivel tiene, qué necesita practicar, qué curso elegir o cómo prepararse para un examen.

**Trabajo único del Home:**

> Convertir incertidumbre en una primera decisión informada y conducir a cada persona hacia el diagnóstico, idioma, examen, práctica o modalidad que corresponde a su intención.

## Tesis verbal

> **Aprende el idioma que tu meta necesita.**

La tesis evita prometer dominio instantáneo, no convierte la tecnología en protagonista y permite hablar tanto de clases como de práctica y certificación.

## Firma visual

### La línea de ruta

La línea roja que subraya el logotipo de WeLearn se convierte en una ruta continua que aparece en momentos concretos:

1. nace junto a Zhanna y José David;
2. conecta la meta del visitante con el Nivel Radar;
3. atraviesa el mapa de habilidades;
4. enlaza práctica, corrección y preparación;
5. termina en una decisión: empezar, practicar o hablar con una persona.

No es una decoración que recorre toda la pantalla ni un proceso rígido numerado. Es una señal de orientación. En movimiento reducido se muestra como SVG estático. En móvil se simplifica a tramos cortos para no competir con la lectura.

## Riesgo visual deliberado

El retrato de los fundadores no estará encerrado en una tarjeta convencional. Ambos aparecerán recortados sobre un campo de luz muy sobrio, mientras la línea de ruta pasa parcialmente por delante y parcialmente por detrás. La profundidad se crea con capas reales, no con un avatar sintético ni con tarjetas flotantes inventadas.

## Autocrítica de la dirección

Se descartaron tres recursos genéricos:

- no habrá una cuadrícula inicial de métricas;
- no habrá una franja de logos de certificaciones;
- no habrá un mosaico de tarjetas flotantes con porcentajes ficticios.

La diferenciación se concentra en una sola firma: la línea que convierte una meta en ruta y conecta a los fundadores con producto auténtico.

---

# 2. Sistema visual propuesto

## Paleta

| Token | Color | Uso |
|---|---|---|
| Tinta WeLearn | `#14215C` | Texto principal, navegación, secciones de autoridad |
| Azul ruta | `#1A2ECC` | Acciones, enlaces activos, nodos del mapa |
| Rojo firma | `#C8202E` | Línea de ruta, énfasis puntual, CTA principal |
| Papel luminoso | `#FCFCFF` | Fondo principal |
| Niebla pedagógica | `#F3F5FA` | Secciones alternas, superficies de lectura |
| Verde evidencia | `#087A55` | Estados comprobados y feedback correcto |

El rojo no se usa para grandes fondos. Su función es guiar. El verde solo aparece cuando hay evidencia real o una respuesta correcta; no es un color decorativo.

## Tipografía

**Display:** `Sora Variable` o una alternativa geométrica equivalente, usada en titulares y cifras pequeñas.  
**Lectura:** `Atkinson Hyperlegible Next`, por su legibilidad y afinidad con una marca educativa accesible.  
**Datos y etiquetas:** `Geist Mono`, ya presente en el sistema.

Si incorporar dos nuevas familias perjudica rendimiento, se conserva `Geist` para cuerpo y controles, y se añade únicamente la familia display. La decisión final se toma mediante una prueba visual y de carga, no por preferencia abstracta.

## Forma

- radios entre `12px` y `18px`, nunca píldoras para todo;
- bordes de `1px` con tinta al 10–16 %;
- sombras cortas y de baja opacidad;
- marcos de producto con esquinas más técnicas que las tarjetas editoriales;
- fotografías con borde libre y sombra de contacto, no dentro de avatares circulares.

## Ritmo

- ancho máximo de lectura: `68ch`;
- contenedor general: `1280px`;
- separación entre capítulos: `clamp(5rem, 9vw, 9rem)`;
- titulares de sección: máximo dos líneas en escritorio;
- ninguna sección comienza con un número decorativo.

---

# 3. Mapa general del Home

```text
NAVEGACIÓN
│
├── HERO · Tesis + Zhanna y José David + Nivel Radar
│
├── ENCUENTRA TU ENTRADA · Selector de intención
│
├── EL PROBLEMA REAL · Incertidumbre sin antagonista
│
├── RECONOCIMIENTO · Diagnóstico real + resultado por habilidades
│
├── MAPA VIVO · Capacidades que cambia según la meta
│
├── PRODUCTO REAL · Aprender + practicar + corregir + preparar
│
├── IDIOMAS · Cursos/clases y práctica claramente diferenciados
│
├── EXÁMENES · Nueve familias, sin logos ni cifras dudosas
│
├── EVIDENCIA · Resultados documentados cuando sean publicables
│
├── FUNDADORES · Autoridad humana explicada
│
├── MODALIDAD Y PRECIO · Bucaramanga, online y enlace canónico
│
├── RESPUESTAS PARA DECIDIR · Preguntas de alta intención
│
└── CIERRE · Empezar por saber dónde estás
```

---

# 4. Wireframe completo por sección

## 0 · Navegación

### Objetivo

Permitir que una persona o un agente llegue a una ruta profunda sin recorrer todo el relato.

### Escritorio

```text
[Logo WeLearn]   Idiomas   Exámenes   Práctica   Cómo funciona
                 Resultados   Precios          [Conoce tu nivel]
```

### Móvil

```text
[Logo]                              [Menú]

Menú abierto:
Idiomas
Exámenes
Práctica
Cómo funciona
Resultados
Precios
[Conoce tu nivel]
```

### Comportamiento

- navegación HTML real;
- CTA enlaza a `/nivel-radar`;
- el menú no depende de gestos;
- foco visible;
- el botón activo conserva el texto `Conoce tu nivel`;
- no usar `Inicio` dentro del Home;
- `Cómo funciona` apunta a `#reconocimiento`;
- `Resultados` solo aparece cuando exista al menos un caso publicable.

---

## 1 · Hero: una meta, dos guías, un primer paso

### Pregunta que responde

¿Qué es WeLearn, qué puede hacer por mí y por qué confiar?

### Copy visible

**Eyebrow**

> Academia de idiomas en Bucaramanga y online

**H1**

> Aprende el idioma que tu meta necesita.

**Bajada**

> WeLearn reconoce tu punto de partida y conecta clases, práctica, simulacros y retroalimentación con la meta que quieres alcanzar.

**CTA principal**

> Conoce tu nivel

**CTA secundario**

> Explora idiomas y exámenes

**Microprueba del CTA**

> Sin registro · entre 4 y 40 ítems · resultado orientativo

**Presentación humana**

> Somos Zhanna y José David. Creamos WeLearn para que aprender un idioma deje de sentirse como una colección de ejercicios y empiece a tener dirección.

### Composición de escritorio

```text
┌─────────────────────────────────────────────────────────────────────┐
│ Eyebrow                                                             │
│                                                                     │
│ Aprende el idioma que        [Zhanna + José David, retrato real]    │
│ tu meta necesita.                                                   │
│                              [Miniatura auténtica de una pregunta]  │
│ Bajada                                                               │
│                                                                     │
│ [Conoce tu nivel]  [Explora idiomas y exámenes]                    │
│ Sin registro · 4–40 ítems · resultado orientativo                  │
│                                                                     │
│ Somos Zhanna y José David…               ─── línea de ruta ───     │
└─────────────────────────────────────────────────────────────────────┘
```

### Composición móvil

```text
Eyebrow
H1
Bajada
[Conoce tu nivel]
[Explora idiomas y exámenes]
Microprueba

[Retrato real de ambos]
[Miniatura de Nivel Radar]

Presentación humana
```

### Visual

- retrato real y conjunto de Zhanna y José David;
- miniatura de `03-reconocimiento-en-curso.png`;
- el producto no tapa rostros;
- Higgsfield aporta únicamente luz ambiental detrás del retrato;
- el Hero funciona íntegramente con poster y fotografía fija.

### Interacción

La miniatura del Nivel Radar puede cambiar una vez, sin intervención, de `pregunta` a `mapa de habilidades`. El contenido textual no cambia y la transición no se repite. Con movimiento reducido se muestra únicamente la pregunta.

### Evidencia y estado

- `Bucaramanga y online`: publicado actualmente; debe reconfirmarse antes de producción;
- `4–40 ítems`, `sin registro` y `resultado orientativo`: comprobado;
- texto de fundadores: narrativa, no métrica;
- no usar `+1000 estudiantes`, estrellas, cantidad de certificaciones ni porcentajes.

---

## 2 · Encuentra tu entrada

### Pregunta que responde

¿Dónde empiezo según lo que quiero lograr?

### H2

> ¿Qué quieres que este idioma haga posible?

### Bajada

> Elige la meta que más se parece a la tuya. Te llevaremos a la ruta que puede responderla.

### Enlaces

| Texto visible | Destino |
|---|---|
| Empezar o retomar un idioma | `/clases-de-idiomas` |
| Mejorar mi inglés | `/clases-de-ingles` |
| Preparar un examen | `/examenes` |
| Practicar una habilidad | `/practica` |
| Estudiar presencialmente en Bucaramanga | `/clases-de-ingles-bucaramanga` mientras no exista una landing local general |
| Todavía no sé qué necesito | `/nivel-radar` |

### Wireframe

```text
¿Qué quieres que este idioma haga posible?

[Empezar o retomar] [Mejorar mi inglés] [Preparar un examen]
[Practicar]         [Bucaramanga]       [No sé qué necesito]
```

### Interacción

- enlaces visibles, no un carrusel;
- al enfocar o pasar el cursor, la línea de ruta une la opción con su destino escrito;
- en móvil se convierte en lista de seis filas;
- ningún contenido se oculta detrás de la selección.

---

## 3 · El problema: estudiar sin dirección

### Pregunta que responde

¿Por qué puedo esforzarme y seguir sin saber cómo avanzar?

### H2

> Puedes estudiar mucho y seguir sin saber qué corregir.

### Texto

> El problema no siempre es la disciplina. A veces no sabes cuál es tu nivel real, qué habilidad está frenando tu avance o si lo que practicas te acerca a tu examen, trabajo, viaje o estudio.

### Cuatro incertidumbres

- No sé realmente dónde estoy.
- No sé qué habilidad necesita más trabajo.
- Practico, pero no tengo una ruta.
- No sé si ya estoy listo para mi meta.

### Puente

> Antes de prometerte un resultado, necesitamos reconocer el punto de partida.

### Visual

Cuatro señales dispersas se alinean con la línea de ruta. Esta es una metáfora y puede usar una transición generada en Higgsfield, siempre que exista como fondo silencioso y no contenga texto.

### Decisión editorial

Se elimina por completo:

- el ataque a aplicaciones;
- `No fallaste tú. Falló el método`;
- cualquier comparación `app vs. WeLearn`;
- el dato `98 %` sin fuente.

---

## 4 · Reconocimiento: una respuesta antes de una promesa

### Pregunta que responde

¿Cómo sabe WeLearn qué necesito?

### H2

> Primero reconoces dónde estás. Después decides cómo avanzar.

### Texto principal

> Nivel Radar explora vocabulario, uso de la lengua, lectura y escucha mediante preguntas que ajustan su dificultad. Al terminar recibes un nivel orientativo, un mapa por habilidades y una prioridad de trabajo.

### Aclaración

> La escritura y la expresión oral requieren evaluación humana. El resultado no es una certificación oficial.

### CTA

> Hacer el Nivel Radar

### Evidencia visual

```text
┌───────────────────────────┐     ┌────────────────────────────┐
│ Pregunta real del Radar   │ ──> │ Resultado de prueba       │
│ dificultad adaptativa     │     │ habilidades + prioridad   │
└───────────────────────────┘     └────────────────────────────┘
```

Usar:

- `03-reconocimiento-en-curso.png`;
- `04-resultado-nivel-radar-recorte.png`.

La segunda captura se rotula:

> Demostración de una sesión técnica anónima.

### Interacción

- comparación accesible mediante dos figuras, no `before/after slider`;
- en escritorio la línea conecta pregunta y resultado;
- en móvil aparecen una debajo de la otra;
- ambas imágenes tienen pie y texto alternativo factual.

---

## 5 · El mapa vivo del idioma

### Pregunta que responde

¿Qué necesito construir para alcanzar una meta?

### H2

> Un idioma no es una sola habilidad.

### Texto

> Comprender, construir, expresarte, interactuar y corregir forman combinaciones distintas según lo que quieras lograr.

### Selector de ejemplo

**Metas disponibles**

- Presentar IELTS
- Tener una entrevista
- Viajar con autonomía
- Empezar desde cero

### Capacidades visibles

- Comprender: escucha y lectura.
- Construir: vocabulario y estructuras.
- Expresarte: habla y escritura.
- Interactuar: fluidez, respuesta y estrategia.
- Corregir: feedback, repetición y ajuste.

### Interacción

Al elegir una meta:

- cambia el grosor o énfasis de los nodos;
- aparece una explicación de dos frases;
- se actualiza el enlace de salida;
- el texto completo de todas las capacidades permanece en el HTML;
- no se asignan porcentajes inventados.

### Ejemplo de respuesta

**Presentar IELTS**

> Necesitas reconocer tu nivel general, practicar las cuatro habilidades y aprender a responder los tipos de tarea del examen bajo condiciones controladas.

**Enlace**

> Ver preparación para IELTS

### Tecnología recomendada

SVG semánticamente decorativo + controles HTML. La visualización se implementa con CSS y React; no con video de Higgsfield, porque debe responder a la selección y seguir siendo accesible.

---

## 6 · Producto real: aprender, practicar, corregir y preparar

### Pregunta que responde

¿Qué voy a encontrar dentro de WeLearn?

### H2

> La ruta se vuelve práctica concreta.

### Bajada

> No necesitas imaginar cómo funciona: puedes ver las herramientas que ya existen.

### Estructura

No usar seis tarjetas iguales. Presentar cuatro capítulos editoriales, alternando texto y evidencia real.

#### Aprender

**Título**

> Entender antes de repetir.

**Texto**

> Cursos, explicaciones, ejemplos y práctica por nivel para construir vocabulario, estructuras y comprensión.

**Enlace**

> Explorar clases e idiomas

**Evidencia**

`10-practica-aleman-niveles.png` como ejemplo de profundidad por nivel, con una nota que diferencia A1–B1 disponibles y B2–C1 próximos.

#### Practicar

**Título**

> Entrenar una habilidad con una tarea real.

**Texto**

> Lectura, escucha, vocabulario, gramática, habla y escritura, según lo que existe en cada idioma y nivel.

**Enlace**

> Explorar toda la práctica

**Evidencia**

`01-practica-catalogo.png`.

#### Corregir

**Título**

> Entender por qué una respuesta funciona.

**Texto**

> Los ejercicios guiados pueden mostrar feedback inmediato, criterios de respuesta y ejemplos explicados. La corrección docente depende de la modalidad.

**Enlace**

> Ver una práctica de Writing

**Evidencia**

`09-feedback-autentico-writing.png`.

#### Preparar

**Título**

> Practicar para la condición que vas a enfrentar.

**Texto**

> Simulacros de práctica, tipos de tarea y entrenamiento por sección para los exámenes disponibles.

**Enlace**

> Explorar preparación de exámenes

**Evidencia**

`07-simulacro-ielts-activo.png`.

### Claims excluidos

- `rutas completas A1–C2` como afirmación global;
- `audio real` sin definir origen y derechos;
- `evaluación de pronunciación` sin evidencia funcional;
- `seguimiento siempre a la vista` sin captura autorizada;
- `IA` como responsable general de la corrección.

---

## 7 · Idiomas: distinguir enseñanza de práctica

### Pregunta que responde

¿Está disponible el idioma que necesito?

### H2

> Encuentra clases y práctica para tu idioma.

### Introducción

> WeLearn reúne rutas de clases y herramientas de práctica. La profundidad disponible cambia según el idioma y el nivel; cada página muestra exactamente qué puedes hacer hoy.

### Grupo A · Clases y rutas publicadas

- Inglés
- Coreano
- Francés
- Alemán
- Italiano
- Portugués

Cada tarjeta contiene:

- nombre;
- breve objetivo;
- modalidades confirmadas;
- `Ver clases de [idioma]`;
- enlace a práctica cuando exista.

### Grupo B · Práctica publicada

- Ruso
- Japonés

No presentarlos como cursos completos mientras no exista una landing de clases activa. El texto de la tarjeta será:

> Explora las herramientas de práctica disponibles.

### Navegación

Todos los enlaces deben usar el nombre del idioma. No usar ocho botones llamados `Ver ruta`.

### Visual

La línea de ruta cambia de forma tipográfica al atravesar cada sistema de escritura: latino, cirílico, hangul y japonés. Es un tratamiento gráfico, no una animación que traduzca contenido.

---

## 8 · Preparación de exámenes

### Pregunta que responde

¿Puedo practicar para mi examen?

### H2

> Entrena el examen sin perder de vista el idioma.

### Texto

> Explora simulacros de práctica, tipos de tarea y materiales para reconocer tus brechas y entrenar las habilidades que exige cada examen.

### Familias publicadas

- IELTS
- TOEFL iBT
- ICFES Saber 11
- Goethe-Zertifikat
- CILS / CELI
- DELF / DALF
- TOPIK I
- CELPE-Bras
- Cambridge B2 First

### Composición

```text
┌───────────────────────────────┬─────────────────────────────────┐
│ Examen seleccionado          │ Muestra auténtica               │
│ IELTS                        │ [motor / tarea / feedback]       │
│ Qué puedes practicar         │                                 │
│ [Ver preparación IELTS]      │ Aviso de independencia          │
├───────────────────────────────┴─────────────────────────────────┤
│ IELTS · TOEFL · ICFES · Goethe · CILS/CELI · DELF/DALF ...    │
└─────────────────────────────────────────────────────────────────┘
```

### Interacción

- tabs accesibles o enlaces con actualización progresiva;
- la lista completa permanece visible;
- cada examen tiene URL propia;
- no usar logos de organismos;
- no usar duración, cantidad de preguntas o número de simulacros hasta reconciliar el inventario;
- no usar `oficial` para calificar los materiales de WeLearn;
- incluir aviso general:

> WeLearn es una academia independiente. Los nombres de los exámenes se usan para identificar la preparación disponible y no implican patrocinio o aval.

---

## 9 · Evidencia: resultados documentados

### Pregunta que responde

¿Existe evidencia de resultados?

### Estado actual

El archivo privado contiene documentos de IELTS, TOEFL, Goethe y CELPE-Bras. Ninguno debe publicarse tal como fue fotografiado. Antes de activar esta sección se requieren:

- relación verificada con el servicio recibido;
- consentimiento o base de publicación;
- derivado anonimizado;
- revisión de reidentificación;
- registro interno de quién verificó el resultado.

### H2 previsto

> Resultados que se pueden comprobar.

### Copy previsto

> Cada resultado publicado conserva una fuente interna verificada y muestra únicamente la información necesaria para entender el logro.

### Tarjeta prevista

```text
[Examen]
[Resultado o nivel]
[Mes y año]
[Meta]
[Qué trabajó con WeLearn]
[Evidencia anonimizada]
[Cómo verificamos este resultado]
```

### Estado alternativo

Si no hay resultados autorizados al momento de implementar, la sección se omite. No se reemplaza con testimonios sin consentimiento, estrellas, cifras globales ni certificados borrosos.

---

## 10 · Zhanna y José David: los guías detrás de la ruta

### Pregunta que responde

¿Quién diseñó y orienta esta experiencia?

### H2

> Dos formas de conocer el camino: estudiarlo y recorrerlo.

### Introducción

> WeLearn reúne la mirada pedagógica de Zhanna y la experiencia de aprendizaje disciplinado de José David. Esa combinación define cómo se reconoce una brecha, cómo se practica y cuándo hace falta una persona.

### Zhanna

**Copy previsto**

> Zhanna trabaja con inglés, español, italiano, francés, ruso y japonés. Tiene estudios doctorales en Pedagogía y orienta el criterio académico con el que WeLearn convierte una meta en aprendizaje.

**Estado de publicación**

- `estudios doctorales en Pedagogía`: redacción confirmada por el fundador;
- no usar `Ph.D.` como título otorgado;
- institución, programa, rol y soporte quedan por documentar;
- la afirmación sobre seis idiomas requiere perfil estable o evidencia demostrativa.

### José David

**Copy previsto**

> José David ha construido inglés, alemán, italiano, francés, portugués, español, ruso, japonés y coreano mediante disciplina y años de práctica. En WeLearn transforma esa experiencia en rutas que ayudan a saber qué estudiar y por qué.

**Estado de publicación**

- lista de nueve idiomas aportada por el fundador;
- requiere definición interna de `hablar` o `haber construido` un idioma;
- cargo, trayectoria y demostración pública quedan por cerrar.

### CTA

> Conoce quiénes somos

El CTA requiere una página estable de equipo o perfiles antes de publicarse.

### Visual

- retrato conjunto en el Hero;
- aquí, dos retratos reales individuales;
- microvideo opcional de 20–35 segundos por persona;
- transcript visible;
- no generar voces, rostros ni gestos sintéticos.

---

## 11 · Modalidad y precio

### Pregunta que responde

¿Puedo estudiar como necesito y cuánto cuesta?

### H2

> Elige cómo empezar, con información clara.

### Bloque presencial

**Título**

> Presencial en Bucaramanga

**Texto previsto**

> Conoce la ubicación, los horarios, el formato y lo que incluye cada opción presencial.

**CTA**

> Ver clases en Bucaramanga

### Bloque online

**Título**

> Online desde donde estés

**Texto previsto**

> Revisa cómo funcionan las sesiones, qué acompañamiento recibes y qué necesitas para comenzar.

**CTA**

> Explorar clases online

### Precio

**Título**

> Planes y precios

**Texto**

> Consulta las opciones vigentes y qué incluye cada una.

**CTA**

> Ver planes y precios

### Regla

No decir `mismo método`, `tutor asignado`, `individual`, `grupal`, `primera clase gratis` o `sin contrato` hasta verificar qué corresponde a cada plan.

---

## 12 · Respuestas para decidir

### Pregunta que responde

¿Qué necesito saber antes de comenzar?

### H2

> Respuestas claras antes de elegir.

### Preguntas y respuestas visibles

#### ¿Qué es Idiomas WeLearn?

> Idiomas WeLearn es una academia de idiomas con sede en Bucaramanga y atención online. Reúne clases, práctica y preparación de exámenes para ayudar a cada persona a avanzar según su punto de partida y su meta.

#### ¿Cómo puedo saber qué nivel tengo?

> Puedes comenzar con Nivel Radar, un diagnóstico adaptativo de inglés que explora vocabulario, uso de la lengua, lectura y escucha. Entrega un resultado orientativo y no sustituye una certificación oficial.

#### ¿Qué idiomas puedo estudiar o practicar?

> WeLearn publica rutas de clases para inglés, coreano, francés, alemán, italiano y portugués. La plataforma de práctica también ofrece herramientas para ruso y japonés. La disponibilidad cambia según el nivel y aparece detallada en cada página.

#### ¿Para qué exámenes hay preparación?

> El catálogo publicado incluye IELTS, TOEFL iBT, ICFES Saber 11, Goethe-Zertifikat, CILS/CELI, DELF/DALF, TOPIK I, CELPE-Bras y Cambridge B2 First.

#### ¿Qué puedo practicar?

> Según el idioma o examen puedes encontrar lectura, escucha, vocabulario, gramática, habla, escritura, ejemplos explicados y simulacros de práctica.

#### ¿Recibo correcciones?

> Algunos ejercicios guiados ofrecen feedback inmediato. La corrección docente y su alcance dependen de la modalidad o servicio contratado.

#### ¿Las clases son online o presenciales?

> WeLearn publica atención presencial en Bucaramanga y clases online. Antes de matricularte, revisa la modalidad, el horario y lo que incluye el plan elegido.

#### ¿Cómo comienzo?

> Puedes conocer tu nivel, explorar un idioma, practicar una habilidad o revisar la preparación para tu examen. Si todavía no sabes qué ruta elegir, puedes hablar con una persona.

### Implementación

- contenido visible en HTML;
- acordeón accesible es opcional;
- no depender de `FAQPage` para obtener un resultado enriquecido;
- las respuestas deben provenir de la misma fuente que metadata y datos estructurados.

---

## 13 · Cierre

### H2

> Empieza por saber dónde estás.

### Texto

> Haz el Nivel Radar si quieres reconocer tu punto de partida, o cuéntanos tu meta si necesitas orientación humana.

### CTA principal

> Conoce tu nivel

### CTA secundario

> Habla con una persona

### Microcopy

> El resultado del Radar es orientativo y no constituye una certificación oficial.

### Visual

La línea de ruta termina en dos destinos claramente rotulados. No hay video de fondo en el cierre.

---

# 5. Recorrido del primer pliegue

## Escritorio

```text
┌────────────────────────────────────────────────────────────────────┐
│ Logo   Idiomas  Exámenes  Práctica  Cómo funciona  Precios  CTA  │
├────────────────────────────────────────────────────────────────────┤
│ Academia de idiomas en Bucaramanga y online                       │
│                                                                    │
│ Aprende el idioma que             [Zhanna + José David]            │
│ tu meta necesita.                                                  │
│                                   [Pregunta real de Nivel Radar]   │
│ WeLearn reconoce tu punto...                                      │
│                                                                    │
│ [Conoce tu nivel] [Explora idiomas y exámenes]                    │
│ Sin registro · 4–40 ítems · resultado orientativo                 │
│                                                                    │
│ Somos Zhanna y José David...     ───── línea de ruta ─────        │
└────────────────────────────────────────────────────────────────────┘
```

## Móvil

```text
[Logo]                                      [Menú]

Academia de idiomas en Bucaramanga y online

Aprende el idioma que
tu meta necesita.

WeLearn reconoce tu punto...

[Conoce tu nivel]
[Explora idiomas y exámenes]

Sin registro · 4–40 ítems · resultado orientativo

[Zhanna + José David]
[Pregunta real de Nivel Radar]

Somos Zhanna y José David...
```

## Prueba de comprensión

Una persona debe poder responder, sin desplazarse:

1. WeLearn es una academia de idiomas.
2. Puede atender en Bucaramanga y online.
3. Ofrece clases, práctica y simulacros.
4. El primer paso recomendado es conocer el nivel.
5. Zhanna y José David son las personas detrás de la propuesta.

---

# 6. Inventario de interacciones

| Interacción | Propósito | Sin JavaScript | Movimiento reducido |
|---|---|---|---|
| Miniatura Hero pregunta → resultado | Mostrar que el diagnóstico produce una respuesta | Muestra la pregunta y enlaza al Radar | Sin transición |
| Selector de intención | Enrutar por meta | Seis enlaces visibles | Sin cambios |
| Mapa vivo | Explicar que cada meta activa capacidades distintas | Texto completo + enlaces | SVG estático |
| Capítulos de producto | Relacionar promesa y pantalla real | Cuatro bloques apilados | Sin parallax |
| Selector de examen | Mostrar una muestra sin ocultar el catálogo | Lista completa de enlaces | Cambio instantáneo |
| FAQ | Reducir fricción de decisión | Preguntas y respuestas abiertas | No aplica |

No se permite:

- scroll secuestrado;
- contenido indispensable dentro de canvas;
- autoplay con audio;
- carruseles automáticos;
- contadores que empiezan en cero;
- hover como único medio de obtener información;
- botones sin destino semántico.

---

# 7. Especificación de recursos para Higgsfield

## Principio

Higgsfield crea atmósfera y metáfora. No crea pruebas.

## Recurso H1 · Campo de luz del Hero

**Función:** separar el retrato real del fondo y dar profundidad sin convertirlo en una escena artificial.

**Formato:**

- loop de 6–8 segundos;
- 16:9 maestro y derivado vertical;
- sin personas;
- sin texto;
- sin interfaz;
- movimiento mínimo y sin corte visible.

**Dirección:**

> Campo de luz blanco y azul muy pálido, con una corriente roja fina que entra desde la parte inferior y se convierte gradualmente en una ruta. Profundidad suave, bordes limpios, sin partículas brillantes, sin aspecto tecnológico futurista.

**Uso:** únicamente escritorio amplio y solo después del LCP. Poster obligatorio.

## Recurso H2 · Señales que encuentran dirección

**Función:** acompañar la sección del dolor.

**Formato:**

- loop de 5–7 segundos;
- abstracto;
- fondo transparente o fácilmente enmascarable;
- sin texto.

**Dirección:**

> Trazos cortos y señales dispersas sobre un campo luminoso se alinean lentamente alrededor de una línea roja central. El movimiento comunica claridad y orientación, no velocidad ni caos.

**Uso:** bajo el pliegue y con carga por proximidad.

## Recurso H3 · Transición editorial hacia producto

**Función:** unir el mapa vivo con las capturas auténticas.

**Formato:**

- 3–4 segundos;
- una sola reproducción al entrar;
- alternativa estática.

**Dirección:**

> Una línea dibujada a mano se vuelve una retícula limpia y termina formando el marco vacío de una pantalla. No aparecen textos, botones, puntuaciones ni interfaces inventadas.

## Recursos que no se producirán

- Zhanna o José David generados;
- sincronización labial sintética;
- testimonios o estudiantes ficticios;
- certificados;
- sedes;
- dashboards;
- mockups de Nivel Radar;
- puntuaciones de exámenes;
- logos de organismos certificadores.

## Recursos humanos por grabar

### Hero

- fotografía conjunta horizontal;
- fotografía conjunta vertical;
- mirada a cámara;
- espacio negativo a la izquierda y a la derecha;
- fondo neutro para permitir recorte.

### Microvideo Zhanna

**Pregunta guía**

> ¿Por qué es importante saber qué falta antes de elegir cómo estudiar?

**Duración**

20–35 segundos.

### Microvideo José David

**Pregunta guía**

> ¿Qué cambia cuando dejas de practicar por practicar y empiezas a hacerlo con una meta?

**Duración**

20–35 segundos.

Las respuestas deben ser propias. No se generará su voz ni se escribirán testimonios en primera persona sin aprobación.

---

# 8. Presupuesto de rendimiento

## Objetivos

- LCP móvil: menos de `2.5 s` en el percentil 75;
- CLS: menos de `0.1`;
- INP: menos de `200 ms`;
- Lighthouse móvil de rendimiento: mayor o igual a `90` en la validación previa a publicación.

## Hero

- retrato conjunto: objetivo máximo `250 KB` combinado;
- poster ambiental: objetivo máximo `90 KB`;
- el video no se monta antes del LCP;
- `preload="none"`;
- `muted`, `playsInline`, sin audio;
- no montar si existe `Save-Data`, conexión lenta, pantalla estrecha o `prefers-reduced-motion`;
- dimensiones reservadas para toda imagen.

## Capturas de producto

- derivados AVIF/WebP;
- objetivo de `80–140 KB` por captura;
- carga diferida bajo el pliegue;
- no cargar la captura de una pestaña que todavía no se ha solicitado, salvo la primera;
- texto alternativo y pie editorial separados.

## Movimiento

- un solo loop en reproducción simultánea;
- ninguna animación toca el contenido del H1;
- la línea de ruta se anima con `transform` o trazado SVG, no con propiedades de layout;
- las animaciones bajo el pliegue se pausan fuera del viewport.

---

# 9. SEO, GEO, AEO y navegación por agentes

## Title propuesto

> Academia de idiomas en Bucaramanga y online | WeLearn

## Meta description propuesta

> Clases, práctica y preparación de exámenes con una ruta basada en tu nivel y tu meta. Conoce Idiomas WeLearn en Bucaramanga y online.

## H1 único

> Aprende el idioma que tu meta necesita.

## Jerarquía

- cada capítulo principal usa `section` + H2;
- cada idioma, examen y capacidad usa H3 cuando tiene descripción propia;
- las figuras de producto usan `figure` y `figcaption`;
- los destinos profundos son enlaces, no tarjetas con manejadores de clic;
- el contenido principal se entrega desde servidor.

## Datos estructurados

Mantener únicamente aquello que coincide con contenido visible:

- `Organization`;
- `EducationalOrganization` y subtipo local apropiado, tras verificar datos administrativos;
- `WebSite`;
- `Person` para los fundadores cuando perfiles y claims estén documentados;
- cursos u ofertas solo cuando la fuente de contenido esté reconciliada.

No usar:

- cifras contradictorias;
- `FAQPage` como táctica de apariencia;
- `Person.knowsLanguage` incompleto o distinto del texto visible;
- `simulacros completos` si el inventario no lo demuestra;
- `método de once pasos`.

## Respuestas extraíbles

El HTML debe permitir contestar:

1. qué es WeLearn;
2. dónde atiende;
3. qué idiomas enseña y cuáles ofrece para práctica;
4. qué exámenes aparecen en el catálogo;
5. cómo funciona Nivel Radar;
6. qué puede practicar una persona;
7. qué corrección está disponible;
8. quiénes son Zhanna y José David;
9. cómo consultar precios;
10. cómo empezar.

---

# 10. Matriz de claims

| Afirmación | Estado | Acción |
|---|---|---|
| Academia de idiomas | Publicado y observable | Usar |
| Bucaramanga y online | Publicado; reconfirmación comercial pendiente | Usar en wireframe, verificar antes de publicar |
| Nivel Radar sin registro | Comprobado | Usar |
| Entre 4 y 40 ítems | Comprobado | Usar |
| Resultado orientativo por habilidades | Comprobado | Usar |
| Práctica en ocho idiomas | Comprobado en el hub | Usar con precisión |
| Clases en ocho idiomas | Contradicho por las landings actuales | No usar |
| Nueve familias de examen | Comprobado en catálogo | Usar |
| 178 simulacros completos | No demostrado | No usar |
| Simulacros oficiales | No demostrado y puede sugerir aval | No usar |
| Feedback pedagógico inmediato | Comprobado en práctica guiada | Usar |
| Corrección con IA para cada examen | No comprobado | No usar |
| Panel de progreso | Existe tras autenticación; evidencia pública ausente | No mostrar todavía |
| Zhanna tiene estudios doctorales en Pedagogía | Redacción confirmada por fundador | Usar tras adjuntar soporte interno |
| Ph.D. de Zhanna | No es un título otorgado confirmado | No usar |
| Zhanna habla seis idiomas | Aportado por fundador | Requiere criterio y evidencia pública |
| José David habla nueve idiomas | Aportado por fundador | Requiere criterio y evidencia pública |
| Resultados de estudiantes | Certificados presentes; relación y consentimiento pendientes | No publicar todavía |
| Más de 1000 estudiantes | Fuente no adjunta | No usar |
| Profesor/tutor asignado | Varía por modalidad | Verificar por plan |

---

# 11. Qué se elimina del Home actual

- `Aprende [idioma] en serio` como H1 rotativo;
- `+1000 estudiantes`;
- estrellas sin fuente;
- `10+ exámenes`, `11 certificaciones` y otras cifras variables;
- antagonismo contra aplicaciones;
- `supera al 98 %`;
- `método propio de 11 pasos`;
- duplicación del CTA de diagnóstico;
- cursos `A1–C2` como promesa global;
- cantidades fijas de semanas y simulacros;
- testimonios nominales hasta verificar consentimiento y fuente;
- japonés y ruso como `próximamente` si ya existe práctica pública;
- logos de exámenes;
- la afirmación global `preparación para exámenes oficiales`;
- FAQ que se autoproclama `la mejor academia`;
- rangos de precio del mercado sin fuente y fecha.

---

# 12. Qué se conserva y evoluciona

- paleta azul y roja de WeLearn;
- presencia local en Bucaramanga;
- atención online;
- Nivel Radar como CTA principal;
- HeroAtmos, sujeto a presupuesto de carga;
- HeroPills como posible mecanismo de navegación, no como decoración;
- producto público real;
- estructura server-rendered;
- enlaces a idiomas, exámenes, práctica, precios y blog;
- fotografía auténtica de los fundadores;
- accesibilidad y modo de movimiento reducido ya contemplados.

---

# 13. Validación antes de pasar a diseño visual

## Contenido

- [x] El Home tiene una tesis única.
- [x] La persona visitante es protagonista.
- [x] Zhanna y José David funcionan como guías.
- [x] La historia conecta meta, reconocimiento, práctica, feedback y preparación.
- [x] Cada sección responde una pregunta.
- [x] Idiomas y exámenes tienen destinos descriptivos.
- [ ] Modalidades e incluidos confirmados por plan.
- [ ] Claims biográficos documentados.
- [ ] Primeros resultados autorizados.

## Producto

- [x] Diagnóstico real seleccionado.
- [x] Captura de resultado real seleccionada.
- [x] Práctica real seleccionada.
- [x] Feedback real seleccionado.
- [x] Simulacro real seleccionado.
- [ ] Captura autorizada de progreso.
- [ ] Cantidades de IELTS, TOEFL y Cambridge reconciliadas.

## Experiencia

- [x] El contenido funciona sin video.
- [x] El contenido funciona sin interacción obligatoria.
- [x] Existe versión móvil definida.
- [x] Existe alternativa a movimiento.
- [x] Los CTA nombran el resultado de la acción.
- [x] La navegación es interpretable por agentes.
- [ ] Maqueta visual probada con teclado.
- [ ] Maqueta probada sin JavaScript.

## Publicación

- [ ] Copy legal y marcas revisados.
- [ ] Privacidad de resultados revisada.
- [ ] Metadata reconciliada.
- [ ] Datos estructurados reconciliados.
- [ ] Rendimiento medido.
- [ ] Accesibilidad medida.
- [ ] No existe despliegue desde un árbol sin commit.

---

# 14. Siguiente artefacto

El siguiente artefacto debe ser una maqueta visual de baja fidelidad basada exactamente en este documento. Debe resolver:

1. proporción y recorte del Hero;
2. tratamiento de la línea de ruta;
3. composición de las capturas reales;
4. densidad de idiomas y exámenes;
5. comportamiento móvil;
6. ubicación de los dos recursos de Higgsfield;
7. longitud real de la página.

La maqueta no debe introducir nuevas cifras, claims, testimonios ni interfaces.
