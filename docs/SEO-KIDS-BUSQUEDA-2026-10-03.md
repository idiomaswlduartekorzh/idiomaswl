# Auditoría SEO de WeLearn Kids — 3 de octubre de 2026

## Objetivo

Hacer que la oferta híbrida de WeLearn Kids pueda ser descubierta desde tres
necesidades que los padres sí expresan en Google:

1. clases o cursos de inglés para niños;
2. programación para niños y creación de videojuegos;
3. clases de ajedrez para niños.

La estrategia no depende de que alguien busque literalmente «aprender inglés
programando» o «aprender inglés con ajedrez». Cada landing responde primero a
una categoría reconocible y presenta el componente bilingüe como diferencial.

## Método y límites

- Se revisaron resultados públicos de Google orientados a Colombia y
  Bucaramanga el 3 de octubre de 2026.
- Se capturaron sugerencias de Google con `hl=es` y `gl=co` para trece semillas.
- Se contrastaron las páginas de competidores locales y nacionales que aparecen
  para las tres categorías.
- No se atribuyen volúmenes mensuales: autocompletado y orden de resultados
  permiten identificar lenguaje e intención, pero no sustituyen Keyword Planner
  ni los datos propios de Search Console.

## Cómo buscan los padres

### Clúster 1: inglés para niños

**Núcleo transaccional**

- inglés para niños;
- clases de inglés para niños;
- curso de inglés para niños;
- inglés para niños Bucaramanga;
- curso de inglés para niños Bucaramanga;
- academia de inglés para niños Bucaramanga.

**Modificadores de decisión**

- presencial, online, a domicilio;
- cerca de mí / cerca de mi ubicación;
- edad exacta: 3–5, 6, 8–12 o 10–12 años;
- primaria, principiantes, horarios, precio y clase de prueba.

**Intención informativa**

- juegos, gratis, PDF y recursos para primaria.

La intención principal es contratar o comparar una clase. Las búsquedas de
«gratis» y «PDF» necesitan recursos propios separados; mezclarlas en la landing
comercial atraería una visita que no está buscando el servicio.

### Clúster 2: programación para niños

**Núcleo transaccional**

- programación para niños;
- clases o curso de programación para niños;
- programación para niños Bucaramanga;
- cursos de programación para niños Bucaramanga;
- clases de programación presencial, online, cerca de mí y precio.

**Problema o proyecto deseado**

- programación para niños con Scratch;
- crear videojuegos para niños;
- cursos, programas, aplicaciones o páginas para crear videojuegos;
- robótica para niños.

**Segmentación**

- desde cero;
- edades concretas, especialmente primaria y 7–12 años;
- gratis u online gratis.

Los resultados que mejor resuelven esta intención muestran una ruta concreta:
bloques visuales, Scratch, personajes, eventos, condicionales, puntaje, prueba
de errores y un videojuego que el niño puede mostrar. «Inglés» funciona mejor
como valor adicional que como encabezado principal de esta landing.

### Clúster 3: ajedrez para niños

**Núcleo transaccional**

- ajedrez para niños;
- clases de ajedrez para niños;
- clases de ajedrez para niños en Bucaramanga;
- clases de ajedrez online o cerca de mí.

**Segmentación**

- edades: 5–7, 8–12 o 9–12 años;
- principiantes y nivel inicial;
- gratis, PDF o libro.

Los resultados comerciales explican edad, nivel, modalidad, frecuencia,
duración, tamaño del grupo, profesor, material y precio. Los padres quieren
saber si el niño puede empezar desde cero y si la propuesta es recreativa o de
entrenamiento competitivo.

## Qué comunica hoy la primera página de resultados

| Categoría | Qué repiten las páginas visibles | Implicación para WeLearn |
|---|---|---|
| Inglés | edad, método lúdico o comunicativo, modalidad, horarios, nivel, sede y contacto | `/kids` debe responder «clases de inglés para niños» antes de explicar el método |
| Programación | Scratch o bloques, videojuego final, pensamiento lógico, desde cero, edad y modalidad | la landing debe presentarse como programación real de iniciación, no solo como una clase de vocabulario digital |
| Ajedrez | fundamentos, niveles, partidas guiadas, modalidad, horario, precio y docente | la landing debe aclarar que enseña ajedrez inicial y que no promete entrenamiento competitivo |

Referencias revisadas:

- Talking Kids: <https://talkingkids.co/>
- Centro Colombo Americano: <https://www.colombo.edu.co/ninos/>
- Praxis Playground: <https://praxisenglish.edu.co/producto/playground/>
- AKUMAYA: <https://www.akumaya.co/cursos-de-programacion-para-ninos>
- Universidad Nacional, iniciación al diseño de videojuegos:
  <https://centrodeeducacioncontinua.medellin.unal.edu.co/26-ninos-cientificos/382-curso-iniciacion-videojuegos.html>
- Chesscul Bucaramanga: <https://chesscul.com/co/clases-ajedrez-bucaramanga/>
- Espacio Ajedrez, curso infantil:
  <https://espacioajedrez.com/cursos/curso-infantil-de-ajedrez-06-de-octubre-de-2026/>

## Arquitectura recomendada

| URL | Intención principal | Diferencial secundario |
|---|---|---|
| `/kids` | clases y curso de inglés para niños en Bucaramanga y online | aprenden haciendo con programación o ajedrez |
| `/kids/ingles-programacion-videojuegos` | programación para niños y creación de videojuegos | instrucciones y presentación en inglés |
| `/kids/ingles-ajedrez` | clases de ajedrez para niños en Bucaramanga y online | vocabulario y explicación de jugadas en inglés |

No se recomiendan tres copias adicionales con slugs casi iguales. Serían
landings de puerta, competirían entre sí y diluirían las señales. Las URLs
actuales ya contienen las entidades necesarias; la intención se refuerza con
título, H1, contenido inicial, enlazado interno y datos estructurados.

## Cambios aplicados

- Se reescribieron los títulos SEO, descripciones, Open Graph, H1, migas y
  nombres de `Service` para que cada página lidere con su categoría.
- `/kids` incorpora una respuesta directa a «curso de inglés para niños», edad,
  modalidad y forma de aprendizaje.
- La landing de videojuegos declara qué fundamentos de programación sí trabaja
  y presenta el inglés como diferencial, no como sustituto.
- La landing de ajedrez declara qué fundamentos enseña, que recibe principiantes
  y que el componente bilingüe acompaña el tablero.
- Los enlaces internos usan textos descriptivos de las categorías que deben
  descubrirse.
- Se conservan afirmaciones verificables: 8–12 años, principiantes, Bucaramanga
  y servicio online sujeto a la edición. Precio, horario, sede, cupos y
  credenciales no se inventan; se confirman con un adulto por WhatsApp.

## Próximo clúster de contenido, por prioridad

1. **Cómo elegir clases de inglés para niños de 8 a 12 años.** Responde nivel,
   modalidad, frecuencia, señales de una buena clase y preguntas antes de pagar.
2. **Programación para niños: qué aprenden con Scratch y a qué edad empezar.**
   Enlaza hacia la landing de videojuegos.
3. **Ajedrez para niños principiantes: qué aprenden en sus primeras clases.**
   Enlaza hacia la landing de ajedrez.
4. **Vacaciones recreativas en Bucaramanga para niños de 8 a 12 años.** Solo
   debe publicarse cuando exista una edición con fechas, duración y condiciones
   confirmadas.

Estas piezas deben ser guías originales, no versiones infladas de las landings.
Cada una debe resolver una pregunta completa y conducir a una única oferta
relacionada.

## Medición

Después de solicitar indexación, revisar en Search Console a 7, 14 y 28 días:

- impresiones y posición por cada una de las tres páginas;
- consultas agrupadas por inglés, programación, videojuegos, Scratch, ajedrez,
  Bucaramanga, online, edad, precio y horario;
- CTR por título y página;
- páginas canónicas detectadas e indexadas;
- clics en WhatsApp desglosados por landing.

No se debe juzgar la estrategia por una búsqueda manual aislada. Las páginas
son nuevas y la indexación, recálculo y aprendizaje de consultas toman tiempo.
Las consultas reales de Search Console decidirán qué contenido de apoyo se
publica después.
