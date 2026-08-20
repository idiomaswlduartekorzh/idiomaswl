# Transcripción fonética — estado y arquitectura

> **Estado:** inglés terminado y medido. 16 de agosto de 2026.
> **Ruta:** `/herramientas/transcripcion-fonetica/ingles`
> **Decisión de producto (David):** inglés a máxima calidad primero, en ruta propia por
> idioma, con la estructura preparada para que añadir los otros siete sea encajar una pieza.

Referencia de partida: [tophonetics.com](https://tophonetics.com). Hace lo mismo para inglés
y vive de tráfico orgánico. Esta versión iguala sus funciones y añade dos que no tiene: la
/r/ de enlace resuelta en la frase y el rescate morfológico de palabras que no están en el
diccionario.

---

## 1. Lo que hay que entender antes de tocar nada

**Esto no es inteligencia artificial. Es un diccionario y unas reglas.** Y esa es la
decisión de diseño, no una limitación: una transcripción fonética tiene que ser
reproducible y auditable. Si `ask` sale como /ɑːsk/, tiene que salir así siempre, y tiene
que poderse rastrear por qué.

El diccionario es el **CMU Pronouncing Dictionary** de Carnegie Mellon: 126.037 palabras
con su pronunciación escrita a mano y el acento tónico marcado. Es el mismo que usa
toPhonetics para su acento americano. Licencia BSD de dos cláusulas — libre, también para
uso comercial.

---

## 2. Por qué el británico no sale de un diccionario

Fue lo primero que se intentó, y se descartó **con datos**:

| Fuente | Palabras | Acento tónico | Problema |
|---|---|---|---|
| CMU (americano) | 126.037 | Sí | — |
| wikipron/Wiktionary (británico) | 79.884 | **No** | Mezcla variedades: da `water` como `w a t ɐ`, que no es RP |

A 91.764 palabras del CMU no les habría dado forma británica. Y sin marcas de acento
tónico, para enseñar inglés no sirve: la mitad del problema de pronunciación de un
hispanohablante es dónde carga la fuerza.

**Así que el británico se deriva del americano por reglas.** Eso cubre el 100 % del
diccionario con una sola convención coherente.

### Lo que hace la derivación

La mayoría es sistemático (`src/lib/fonetica/ipa.ts`):

- **La /r/ que no suena.** Solo se pronuncia ante vocal. `car` es /kɑː/, `car engine` es
  /kɑːr ˈendʒɪn/. Se resuelve al montar la frase, no palabra a palabra.
- `oʊ` → `əʊ`, `ɝ` → `ɜː`, vocales largas con `ː`, `ɛ` → `e` (convención de Gimson).
- Vocal + /r/ muda se funden: `here` /hɪə/, `there` /ðeə/, `sure` /ʃʊə/.

Y cinco grupos donde **no hay regla que valga**, porque dependen de la historia de cada
palabra (`src/lib/fonetica/lexical-sets.ts`):

| Conjunto | Qué hace | Ejemplo |
|---|---|---|
| BATH | /æ/ → /ɑː/ | `ask` /æsk/ → /ɑːsk/ |
| PALM | /ɑ/ se queda larga en vez de pasar a /ɒ/ | `father`, `calm` |
| CLOTH | /ɔ/ → /ɒ/ breve | `off`, `dog`, `long` |
| ORANGE | /ɔr/ → /ɒr/ | `orange` /ˈɒrɪndʒ/ pero `story` /ˈstɔːri/ |
| ILE | `-ile` → /aɪl/ | `fertile` /ˈfɜːtaɪl/ |

---

## 3. Cómo se construyeron esas listas — y por qué no se importaron

Se minaron alineando CMU con wikipron palabra por palabra: 32.169 palabras alineadas, y
las discrepancias sistemáticas revelaron qué pertenece a cada conjunto.

**Pero el resultado del minado no se usó como fuente.** Al revisarlo tenía ruido: daba
`stop` y `object` como PALM, y metía `altar`, `assault` y `australia` en CLOTH, cuando en
RP las tres llevan /ɔː/. Wiktionary es colaborativo y mezcla variedades.

Así que el minado sirvió de **investigación** y las listas finales están escritas y
verificadas a mano sobre ese hallazgo. Dos consecuencias buenas: el resultado no hereda los
errores de Wiktionary, y el repositorio no arrastra su licencia CC BY-SA.

### Tres hallazgos que no estaban en el plan

1. **El CMU se contradice a sí mismo.** Escribe `bought` con la misma vocal que `boss`
   (`AA`), porque buena parte de los hablantes estadounidenses fusionó esos sonidos. En
   británico son distintos. Llega a partirse dentro del mismo verbo: `want` con `AA` y
   `wanted` con `AO`. Lo que los separa es la ortografía — el grupo de `thought` se escribe
   con `au`, `aw`, `ough` o `augh`.

2. **La /ɪ/ átona que el americano ya perdió.** `accident` es /ˈæksɪdənt/ en RP y
   /ˈæksədənt/ en Estados Unidos. Afectaba a ~1.300 palabras. Se resuelve emparejando cada
   vocal pronunciada con la letra que la escribe: si es una `i`, es /ɪ/.

3. **El yod no necesita lista.** `new` es /njuː/ y `noon` es /nuːn`: las dos llevan /uː/
   tras /n/, y lo único que las separa es cómo se escribe la vocal (`u`, `ew`, `eu`, `ue`,
   `ui` la llevan; `oo`, `ou`, `o` no). El mismo emparejamiento letra-sonido lo resuelve sin
   enumerar nada.

---

## 4. Cuánto acierta, medido

Contra las 34.172 palabras que wikipron permite comprobar:

```
idénticas                          25.049   (73,3 %)
+ iguales salvo longitud/notación   1.174   (76,7 % acumulado)
```

**Ese 76,7 % está infravalorado**, y conviene saber por qué antes de intentar «mejorarlo»:
de las discrepancias que quedan, las más frecuentes son defectos de la referencia, no
nuestros —wikipron devuelve `oʊ` y `ɚ`, que son americanos, dentro de su archivo
británico, y escribe las consonantes silábicas como `bl̩` donde los diccionarios de
aprendizaje escriben `bəl`—. Sobre palabras corrientes el acierto es notablemente mayor.

Para volver a medir tras tocar una regla, los scripts de minado y validación están en la
conversación que originó esto; se rehacen en diez minutos bajando `cmudict.dict` y
`eng_latn_uk_broad.tsv`. **No se commitearon a propósito:** dependen de una descarga
externa y no deben correr en el build.

---

## 5. Arquitectura

```
src/lib/fonetica/
  phones.ts        ARPABET, mapas a AFI, y el SILABIFICADOR
  lexical-sets.ts  los cinco conjuntos + excepciones de palabra entera
  ipa.ts           americano y derivación británica
  weak-forms.ts    formas débiles y nombres de las letras
  transcribe.ts    tokenizador: puntuación, siglas, números, morfología
  dictionary.ts    carga del diccionario (solo servidor)

src/data/fonetica/en-cmudict.txt    3,45 MB — se regenera con
                                    node scripts/build-fonetica-dict.mjs
src/app/api/fonetica/route.ts       la ruta
```

### Por qué hay un silabificador

El CMU marca el acento **sobre la vocal**; el AFI lo marca **delante de la sílaba**. Sin
silabificar, `computer` sale `kəmpjˈuːtə` en vez de `kəmˈpjuːtə`. Es el error que delata a
los transcriptores automáticos, y la razón por la que no se usó `espeak-ng`, que lo comete.

El reparto es por **ataque máximo** con dos restricciones: nada de grupos consonánticos
ilegales en inglés, y una vocal laxa tónica no puede quedar en sílaba abierta.

### Por qué vive en el servidor

El diccionario pesa 3,45 MB. Mandarlo al navegador castigaría a quien entre desde un móvil
con datos, que es la mayoría del tráfico. La ruta lo lee una vez por instancia y lo deja en
memoria.

A cambio, **la respuesta trae los dos acentos y todas las variantes de una vez**. Cambiar de
británico a americano, encender las formas débiles o elegir otra pronunciación no vuelve a
pedir nada al servidor.

> ⚠️ El archivo tiene que viajar dentro de la función serverless, y para eso está declarado
> en `outputFileTracingIncludes` de `next.config.ts`. Si se mueve de sitio y no se actualiza
> allí, **funciona en local y devuelve 500 en producción** — la forma más incómoda de
> romperlo.

---

## 6. Añadir un idioma

La estructura ya está: la ruta es `/herramientas/transcripcion-fonetica/<idioma>` y el hub
los lista. Lo que cambia por idioma es de dónde sale la pronunciación:

| Idioma | Dificultad | Por qué |
|---|---|---|
| Coreano | Baja | Las reglas de sandhi (변동) están documentadas; ya hay `hangul-js` en el proyecto |
| Alemán | Baja-media | Bastante regular; tropieza con préstamos |
| Italiano | Media | Reglas + datos para *e/o* abiertas y cerradas |
| Francés | Media | Reglas decentes, pero liaison y excepciones |
| Portugués | Media | Además hay que decidir Brasil o Portugal |
| Japonés | Media | Kana → AFI es trivial; leer los **kanji** necesita un analizador tipo kuromoji |
| Ruso | **Alta** | La escritura no marca el acento y las vocales cambian según dónde caiga: diccionario obligatorio |

El inglés era el caso difícil y ya está hecho. `phones.ts`, `transcribe.ts` y la página se
reaprovechan; lo que cada idioma trae es su propio conversor a AFI.

---

## 7. La auditoría de agosto de 2026 — qué encontró

Cinco auditorías en paralelo (fonética, código, producción, interfaz, SEO) sobre el
inglés terminado, **antes** de replicar la arquitectura a los otros siete idiomas. Ese era
el momento: un error estructural aquí se convierte en ocho errores después.

Lo que salió, ya corregido:

**Un fallo que tumbaba el servicio.** La palabra inglesa `constructor` devolvía un 500. Los
conjuntos de excepciones eran objetos literales y se consultaban con `OBJETO[palabra]`, así
que esa palabra —que está en el CMU y es vocabulario corriente— encontraba la propiedad
heredada de `Object.prototype` y devolvía una función donde se esperaba una cadena. Ahora
va por `Object.hasOwn`. **Lección para los otros idiomas: nunca indexar un objeto con texto
del usuario sin guarda.**

**Seis errores de fonética de alta frecuencia:**

| Palabra | Salía | Es |
|---|---|---|
| `serious`, `hero`, `theory` | /ˈsɪriəs/ | **/ˈsɪəriəs/** — la /r/ entre vocales también deja diptongo |
| `character`, `marry`, `Paris` | /ˈkeərəktə/ | **/ˈkærəktə/** — el RP mantiene tres clases donde el americano tiene una |
| `during` | /ˈdʊrɪŋ/ | **/ˈdjʊərɪŋ/** — el yod nunca se aplicaba a esa vocal |
| `can't` | /kænt/ | **/kɑːnt/** — la lista no contemplaba el apóstrofo |
| `swallow` | /ˈswɔːləʊ/ | **/ˈswɒləʊ/** — la regla miraba la palabra entera, no la sílaba |
| `proximity` | /prɒˈksɪməti/ | **/prɒkˈsɪməti/** — /ks/ no puede abrir sílaba en inglés |

**Cuatro cosas que mentían al estudiante.** Un número con coma decimal (`1,5`) salía en
blanco pero marcado como correcto. `naïve` se partía en dos trozos que sí existen en el
diccionario y devolvía /nɒ viː/ dándolo por bueno. La /r/ de enlace cruzaba los puntos
(`far. Away`). Y la marca de «palabra deducida» tenía 1,2:1 de contraste, o sea que no se
veía, mientras la leyenda afirmaba que sí.

**Y la herramienta era inusable en modo oscuro y con teclado**: el botón principal quedaba
en 1,6:1 de contraste, el desplegable de variantes lo recortaba el `overflow` del panel, y
al elegir una pronunciación el foco caía al principio del documento.

Todo eso está corregido y **cada caso tiene su prueba** en `npm run check:fonetica`, que
pasó de 45 a 67 palabras. La medición contra wikipron subió de 76,7 % a 77,1 % — poco,
porque parte de lo corregido wikipron también lo tiene mal.

### Una decisión consciente que conviene conocer

`-ity` lleva **schwa**: `ability` es /əˈbɪləti/. La regla general de este motor dice que una
vocal átona escrita con `i` es /ɪ/ en británico, y para `accident` es cierto; pero en `-ity`
los diccionarios de aprendizaje actuales usan schwa. Wikipron usa la convención antigua de
Jones (/ɪtɪ/), así que esas 224 palabras cuentan como discrepancia en la medición aunque
sean correctas. **Si alguien «arregla» eso para subir el porcentaje, lo estará empeorando.**

---

## 8. Lo que queda pendiente, y es decisión de producto

**Límite de peticiones.** La ruta es pública, sin autenticación, y **amplifica**: 12.000
caracteres de entrada devuelven hasta un megabyte de JSON, unas 88 veces más de lo que
cuesta pedirlo. Medido. El gasto de CPU es despreciable (96 ms en el peor caso); el de
tráfico de salida no, y en Vercel el tráfico se factura. A 100 peticiones por segundo
—que se consiguen con un portátil y un bucle— el terabyte incluido del plan se agota en
unas 2,8 horas.

Lo que ya está puesto en el código: se exige `Content-Type: application/json`, lo que
obliga al navegador a una comprobación previa que esta ruta no responde y **mata el abuso
desde cualquier web ajena**; se rechaza por tamaño antes de parsear; y hay `maxDuration`.

Lo que **no** puede resolverse desde el código y hay que decidir:

1. Una regla de límite por IP en el cortafuegos de Vercel sobre `/api/fonetica`
   (~20 peticiones/minuto). Es configuración del panel, no código.
2. O el paquete `@vercel/firewall`, que es una dependencia nueva.
3. Y en cualquier caso, activar el control de gasto de Vercel con un tope.

**El diccionario tiene que entrar en git.** Son 3,45 MB en `src/data/fonetica/`. Vercel
despliega desde el repositorio: si se commitea el código y no el `.txt`, la herramienta
funciona en local y devuelve 503 en producción. No está en `.gitignore` ni en
`.vercelignore` — comprobado—, pero conviene verificarlo antes de desplegar:

```bash
git ls-files src/data/fonetica/en-cmudict.txt
```

---

## 9. Lo que la herramienta no puede saber, y lo dice

Una palabra escrita igual puede sonar de dos maneras según lo que signifique: `read` es
/riːd/ en presente y /red/ en pasado; `record` cambia de acento según sea sustantivo o
verbo. Ningún programa lo resuelve sin entender la frase.

Esas palabras salen **marcadas y clicables**, y elige el estudiante. Las que no están en el
diccionario salen en rojo, sin inventar. Es la misma regla que en el resto del sitio:
antes decir «esto no lo sé» que colar un dato falso con aire de seguro.
