# TOEFL 2026 — contrato de expansión de Listening sin generar audio

Fecha: 14 de agosto de 2026

Estado: contrato de implementación aprobado internamente; MP3 bloqueados hasta el gate del owner

## Referencia fija elegida

La práctica oficial ETS alineada desde el 21 de enero de 2026 contiene dos módulos de
Listening y advierte que no es una réplica exacta del examen operacional.

| Módulo | Choose a Response | Conversation | Announcement | Academic Talk | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 8 | 4 (dos estímulos × 2) | 2 | 4 | 18 |
| 2 | 8 | 2 (un estímulo × 2) | 2 | 4 | 16 |
| **Sección fija** | **16** | **6** | **4** | **8** | **34** |

Fuente: [ETS — TOEFL iBT Practice Test 1](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-full-length-practice-test-1.pdf),
páginas 14–25. ETS también publica un máximo operacional de 47 preguntas y entrega
multietapa adaptativa; WeLearn no afirmará reproducir esa adaptación.

## Inventario reutilizable por set

Cada uno de los 20 simulacros ya contiene:

- cinco Choose a Response, cada uno con MP3 propio;
- una Conversation con MP3 y cuatro preguntas;
- un Announcement con MP3 y tres preguntas;
- un Academic Talk con MP3 y cinco preguntas.

Son 17 interacciones y ocho MP3 Listening por set, o 160 MP3 en total. Los 100 Repeat
pertenecen a Speaking y no entran en este contrato.

## Composición que se implementará

### Módulo 1 — 18 interacciones

- ocho Choose: cinco existentes + tres nuevos;
- cuatro Conversation: las cuatro preguntas existentes;
- dos Announcement: primeras dos preguntas existentes;
- cuatro Academic Talk: primeras cuatro preguntas existentes.

La tercera pregunta de Announcement y la quinta de Academic Talk no se borran: quedan
como fuentes suplementarias reutilizables fuera de la sesión fija.

Las conversaciones existentes se auditarán para ubicar un corte natural que permita
derivar dos clips de dos preguntas sin ElevenLabs. El MP3 original permanece intacto.
Si un set no admite un corte responsable, se registra como excepción y el owner decide
entre conservar un estímulo largo de cuatro preguntas o aprobar una conversación nueva.

### Módulo 2 — 16 interacciones nuevas

- ocho Choose a Response;
- una Conversation con dos preguntas;
- un Announcement con dos preguntas;
- un Academic Talk con cuatro preguntas.

Así la sección completa queda en 16/6/4/8 y 34 interacciones, igual que la forma fija
de práctica elegida.

## Brecha escrita y brecha de medios

Por set se escriben 19 interacciones nuevas: tres Choose para Módulo 1 y las 16 de
Módulo 2. Como dos preguntas heredadas salen sólo del conteo fijo, el crecimiento neto
es 17, de 17 a 34.

Medios TTS pendientes por set:

- 11 piezas breves Choose;
- una Conversation;
- un Announcement;
- un Academic Talk.

Total potencial: 14 MP3 por set, 280 MP3 para los 20 sets. Los posibles 40 clips
derivados de Conversation se obtendrían de los 20 originales y no consumen TTS.
Estas cantidades son una estimación de alcance, no una autorización de generación.

## Contrato editorial

- Choose: 4–18 palabras, función comunicativa inequívoca y cuatro respuestas naturales;
- Conversation: 45–100 palabras, dos preguntas en orden de audio;
- Announcement: 50–100 palabras, dos preguntas en orden de audio;
- Academic Talk: 140–210 palabras, cuatro preguntas en orden de audio;
- una sola respuesta defendible por ítem;
- distractores plausibles, sin ventaja sistemática por longitud ni repetición literal;
- contenido original, sin copiar textos, preguntas ni audio ETS;
- los claims académicos se contrastan con fuentes primarias o institucionales;
- guion canónico, roles y pronunciaciones quedan listos antes de producir medios.

## Seguridad y experiencia

- ninguna clave correcta viajará en el payload cliente;
- el scoring se cerrará mediante objeto versionado y endpoint server-only;
- los guiones canónicos no se mostrarán durante el intento;
- Listening será forward-only y no permitirá regresar a una pregunta cerrada;
- el preview previo al audio mostrará contenido y estado editorial en una superficie de
  revisión, no fingirá que los estímulos pendientes ya son reproducibles;
- el resultado se rotulará corrección fija WeLearn, no score ETS.

## Gate de audio

No se abre una generación hasta que el owner apruebe explícitamente:

1. inventario exacto de piezas nuevas y derivadas;
2. guiones y auditoría factual/editorial;
3. voces por rol y muestras representativas;
4. caracteres, costo estimado y proveedor;
5. convención de archivos y plan de rollback.

Tras esa aprobación se genera sólo el lote autorizado, se mide duración/loudness/pico,
se compara ASR con el guion, se hace escucha humana y se integra sin sobrescribir los
160 MP3 Listening existentes.
