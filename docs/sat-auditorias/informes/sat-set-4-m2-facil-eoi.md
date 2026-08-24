# Auditoría de bloque · SAT Set 4 M2 estándar · Expression of Ideas

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto editorial del
módulo ensamblado: **APTO COMO CONTENIDO, NO PUBLICABLE COMO PRODUCTO**.

## Alcance y métricas finales

Se revisaron q23–q27 en
`src/data/mocks/sat/drafts/set-4/blocks/sat-set-4-m2-facil-eoi.ts` y después se ejecutaron
las ocho puertas mecánicas sobre los 27 ítems ensamblados.

```text
ítems / metadatos       27 / 27
claves                  A7 · B7 · C7 · D6
clave más larga         29,6 %
clave más corta          3,7 %
solape alto              7,4 %
solape bajo             29,6 %
dominios                CS8 · II7 · SEC7 · EOI5
temas                   ciencia10 · historia7 · humanidades6 · literatura4
prueba ciega            25,1 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 11 módulos · 297 ítems · cero secuencias de 8+ palabras
```

La primera ejecución completa encontró cuatro defectos: diez claves únicas eran las más
largas; q07 y q24 tenían solape léxico excesivo; y el estímulo de q19 medía 22,8
palabras-SAT. Se parafrasearon q07 y q24, se acortaron las claves de q23 y q25 y se agregó
contexto original a q19. La segunda ejecución dejó una señal de longitud en 9/27; q23 se
compactó de nuevo. La tercera ejecución superó las ocho puertas sin cambiar claves.

## Clave única del bloque

| ID | Clave | Decisión |
| --- | :---: | --- |
| q23 | C | compara 7 % con 18 % y declara que no se estudiaron visitas posteriores |
| q24 | A | 0,55 es menor que 26,20 y, según la definición dada, representa una barrera más fuerte |
| q25 | D | contrasta pantalla aditiva de almidón con tintes sustractivos en película multicapa posterior |
| q26 | B | *Consequently* conecta la interrupción del agua con la menor energía medida detrás del arrecife |
| q27 | C | *Nevertheless* presenta una ventaja narrativa a pesar del riesgo de menor explicitud |

No se detectó una segunda clave defendible. q23 limita el alcance temporal; q24 conserva
dirección, magnitud y unidades ya declaradas; q25 responde al mecanismo, no solo a fechas;
q26 no convierte “hasta 40 %” en resultado universal.

## Fuentes y originalidad

- q24: Velázquez-Contreras et al., películas de almidón modificado y quitosano, incluida
  la permeabilidad de vapor por composición.
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC8708082/>
- q25: National Science and Media Museum, historia y funcionamiento de Autochrome y
  Kodachrome.
  <https://www.scienceandmediamuseum.org.uk/objects-and-stories/history-colour-photography>
- q26: Kachmar et al., arrecifes restaurados que redujeron hasta 40 % la energía de
  oleaje frente a controles sin arrecife.
  <https://repository.library.noaa.gov/view/noaa/74069>

q23 y q27 son escenarios originales. Se buscaron entre comillas los cinco inicios; no
apareció ninguna coincidencia exacta. Los resultados temáticos sobre películas y
arrecifes no reprodujeron la prosa.

## Límite y siguiente puerta

La revisión fue realizada por Codex con controles reproducibles, sin panel humano ni
multi-modelo independiente. El bloque y el contenido de M2 estándar quedan APTOS. No se
crea acta JSON publicable: Set 4 aún necesita M2 exigente y QA de producto.
