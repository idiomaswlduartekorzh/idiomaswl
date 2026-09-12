# Goethe A1 · Simulacro 2 · baseline editorial

Estado: **listo localmente para integración; estructura, imágenes, audio, scoring, navegador y build aprobados**.

Este set contiene material original de WeLearn. Replica la arquitectura pública de Start Deutsch 1 sin copiar preguntas, textos, guiones ni recursos gráficos del Goethe-Institut. Las referencias de control son la página oficial de materiales, el Modellsatz y los Übungssätze 01 y 02.

## Contrato del examen

| Módulo | Tiempo | Partes | Respuestas | Contrato |
|---|---:|---:|---:|---|
| Hören | 20 min | 3 | 15 | 6 A/B/C dos veces · 4 R/F una vez · 5 A/B/C dos veces |
| Lesen | 25 min | 3 | 15 | dos mensajes 2+3 · cinco pares A/B · cinco avisos R/F |
| Schreiben | 20 min | 2 | 5 + texto | formulario con 5 vacíos · mensaje de circa 30 palabras y 3 puntos |
| Sprechen | 15 min | 3 | rúbrica | presentación · dos temas de 6 tarjetas · 12 tarjetas de peticiones |

Total: 80 minutos, 60 puntos brutos, factor 1,66 y aprobación desde 60/100.

## Lesen · regla no negociable

Teil 1 nunca presenta los dos textos como una sola lectura:

1. Texto A.
2. Ejemplo resuelto.
3. Preguntas 1 y 2.
4. Texto B.
5. Preguntas 3, 4 y 5.

Teil 2 contiene cinco situaciones independientes. Cada situación tiene su propio par de anuncios A/B, con fotografía compacta y texto exacto integrado dentro de una tarjeta de anuncio o página web. Teil 3 contiene cinco ubicaciones independientes, cada una con su propio aviso y una afirmación Richtig/Falsch. Los avisos mezclan extensiones cortas, medias y largas dentro de un rango A1 de 6–25 palabras.

## Harness automatizado

`npm run check:goethe-a1:set2` bloquea la publicación si falla cualquiera de estos puntos:

- 80 minutos, 11 partes y orden de módulos correcto;
- Hören 6+4+5 y repetición 2+1+2;
- Lesen 5+5+5 y secuencia Texto A 2 preguntas / Texto B 3 preguntas;
- cinco pares de anuncios independientes y cinco avisos independientes;
- representación compacta de anuncios con texto integrado y variación de longitud en los avisos;
- formulario con exactamente cinco vacíos y suficiente información prellenada;
- mensaje con tres intenciones comunicativas y objetivo de 30 palabras;
- Sprechen 3+6+6, dos temas y 12 tarjetas de peticiones;
- identificadores únicos y ausencia de duplicados exactos respecto al Set 1;
- claves A/B/C 4/4/3, claves binarias 10/9, racha máxima de dos;
- razón de longitud respuesta correcta/distractores entre 0,85 y 1,15;
- guion de audio dentro de la envolvente 3.600–4.600 caracteres;
- manifiesto de audio, 19 salidas finales, 28 pitidos y reserva mínima de créditos;
- 15 láminas verificadas y rutas finales de las tres pistas conectadas.

Baseline actual del Set 2:

- A/B/C: 4/4/3.
- Binarias: 10/9.
- Racha máxima: 2.
- Longitud correcta/distractores: 1,058.
- Guion TTS: 3.657 caracteres.
- ElevenLabs: 1.911 créditos consumidos de 15.102 disponibles antes de producir.
- Saldo posterior: 13.191 créditos; reserva mínima exigida: 8.000.
- Duración Hören completa: 17:35; Teil 1 6:37, Teil 2 2:47 y Teil 3 8:07.

## Inventario de medios

El manifiesto fuente es `src/data/mocks/goethe-a1-set-2-release.json`.

- 7 láminas de Hören Teil 1: ejemplo + 6 preguntas.
- 6 láminas de Lesen Teil 2: ejemplo + 5 pares A/B.
- 2 hojas de tarjetas de Sprechen Teil 3.
- 15 clips puntuables, ejemplos e instrucciones ensamblados en 3 pistas de parte y 1 pista completa.
- Señal acústica aprobada: 990/831/698 Hz, 2,1 s, antes de cada reproducción.
- Master objetivo: MP3 mono, 44,1 kHz, 64 kbps, -18 LUFS.

## Puertas restantes

1. Integración en `main`, despliegue y smoke test de producción cuando se autorice esa fase.

Ninguna puerta posterior puede marcarse lista mientras la anterior permanezca pendiente.
