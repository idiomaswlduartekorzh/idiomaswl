# Historias — locución

Generado desde los datos y los mp3 reales. No editar a mano: se regenera.

**Las 32 notas de voz están grabadas.** 57 minutos de locución nueva
(30 tomas), más las 2 de `The Locked Phone` que ya existían.

## Lo que costó

| | |
|---|---|
| Caracteres enviados | 37.301 |
| Modelo | `eleven_flash_v2_5` (mitad de precio por carácter que multilingual v2) |
| Coste estimado | ~10.333 créditos · ~$1.87 |
| Peso en disco | 29 MB |

El contador de la cuenta va con retraso y en caliente subestima: para el gasto real,
mirarlo unos minutos después de generar.

### Por qué salió tan barato sin recortar nada

El usuario quería audios largos, así que **no se tocó ni una palabra del guion**.
Lo que se optimizó fue todo lo demás:

- **Flash v2.5 en vez de multilingual v2** — la mitad de precio por carácter.
- **Una petición por nota, no por línea.** Cada nota son 546–1.690 caracteres y el
  límite del modelo son 40.000: entera suena mejor y no hay costuras que empatar.
- **Espacios de pantalla del japonés fuera antes de enviar** — 934 caracteres menos,
  y de paso desaparecen las micropausas que hacían sonar el texto como una lista.
- **La velocidad no cuesta.** Se genera a 0,90 en coreano y japonés y 0,92 en el
  resto: el audio dura más segundos y se paga exactamente igual, porque se factura
  por carácter, no por duración.
- **Voces ya en la cuenta.** El reparto salió entero de las voces `WL <idioma>` de
  las series de escucha: cero voces nuevas.
- **Escuchar antes las muestras gratuitas** de cada voz evitó la prueba de pago.
  Lo caro nunca es la tarifa: es tener que repetir la tanda.

## Por idioma

| Idioma | Tomas | Caracteres | Duración |
|---|---:|---:|---:|
| 🇬🇧 Inglés | 2 | 2924 | 3:41 |
| 🇩🇪 Alemán | 4 | 6249 | 7:18 |
| 🇫🇷 Francés | 4 | 6115 | 7:19 |
| 🇮🇹 Italiano | 4 | 5685 | 7:38 |
| 🇧🇷 Portugués | 4 | 5695 | 7:20 |
| 🇰🇷 Coreano | 4 | 2908 | 8:31 |
| 🇯🇵 Japonés | 4 | 2409 | 8:20 |
| 🇷🇺 Ruso | 4 | 5316 | 7:02 |
| **Total** | **30** | **37.301** | **57:09** |

## Ajustes usados

Heredados de las 480 series de escucha, no inventados: `stability 0,55`,
`similarity_boost 0,75`, `style 0,15`, `use_speaker_boost`, salida
`mp3_44100_128`, semilla fija `20260813` y nivelado a −16 LUFS con ffmpeg.
La semilla importa: repetir una toma suelta no cambia el color de la voz respecto
a la otra del mismo ejercicio.

## Si hay que rehacer una toma

```bash
node scripts/generate-historias-audio.mjs --only ingles/the-grandfathers-ledger/b --generate --force
```

Sin `--force` no pisa un archivo que ya existe. Sin `--generate` no llama a la API.
Y antes de gastar comprueba contra `/v1/voices` que el sexo de la voz coincide con
el del personaje — la regla que se saltó la versión vieja del Ledger.

**Si cambias el texto de una historia, hay que regrabar esa toma.** Lo que el alumno
lee tiene que ser exactamente lo que oye.

## Reparto

| Idioma | Historia | Voz | Archivo | Duración |
|---|---|---|---|---:|
| 🇬🇧 Inglés | The Locked Phone | Jess — Girlfriend | `/audio/locked-phone/girlfriend.mp3` | 1:27 |
| 🇬🇧 Inglés | The Locked Phone | Tom — Boyfriend | `/audio/locked-phone/boyfriend.mp3` | 1:15 |
| 🇬🇧 Inglés | The Grandfather's Ledger | Sarah — Daughter-in-law | `/audio/historias/ingles/the-grandfathers-ledger/a.mp3` | 1:36 |
| 🇬🇧 Inglés | The Grandfather's Ledger | Robert — Father-in-law | `/audio/historias/ingles/the-grandfathers-ledger/b.mp3` | 2:05 |
| 🇩🇪 Alemán | Das gesperrte Handy | Jana — Freundin | `/audio/historias/aleman/das-gesperrte-handy/a.mp3` | 1:49 |
| 🇩🇪 Alemán | Das gesperrte Handy | Tobias — Freund | `/audio/historias/aleman/das-gesperrte-handy/b.mp3` | 1:23 |
| 🇩🇪 Alemán | Das Kassenbuch des Großvaters | Nadine — Schwiegertochter | `/audio/historias/aleman/das-kassenbuch-des-grossvaters/a.mp3` | 2:01 |
| 🇩🇪 Alemán | Das Kassenbuch des Großvaters | Werner — Schwiegervater | `/audio/historias/aleman/das-kassenbuch-des-grossvaters/b.mp3` | 2:04 |
| 🇫🇷 Francés | Le téléphone verrouillé | Camille — la copine | `/audio/historias/frances/le-telephone-verrouille/a.mp3` | 1:28 |
| 🇫🇷 Francés | Le téléphone verrouillé | Julien — le copain | `/audio/historias/frances/le-telephone-verrouille/b.mp3` | 1:29 |
| 🇫🇷 Francés | Le carnet du grand-père | Élodie — la belle-fille | `/audio/historias/frances/le-carnet-du-grand-pere/a.mp3` | 2:23 |
| 🇫🇷 Francés | Le carnet du grand-père | Bernard — le beau-père | `/audio/historias/frances/le-carnet-du-grand-pere/b.mp3` | 1:60 |
| 🇮🇹 Italiano | Il telefono capovolto | Giulia — la fidanzata | `/audio/historias/italiano/il-telefono-capovolto/a.mp3` | 1:29 |
| 🇮🇹 Italiano | Il telefono capovolto | Marco — il fidanzato | `/audio/historias/italiano/il-telefono-capovolto/b.mp3` | 1:44 |
| 🇮🇹 Italiano | Il quaderno del nonno | Chiara — la nuora | `/audio/historias/italiano/il-quaderno-del-nonno/a.mp3` | 2:39 |
| 🇮🇹 Italiano | Il quaderno del nonno | Franco — il suocero | `/audio/historias/italiano/il-quaderno-del-nonno/b.mp3` | 1:47 |
| 🇧🇷 Portugués | O celular virado para baixo | Bia — a namorada | `/audio/historias/portugues/o-celular-virado-para-baixo/a.mp3` | 2:00 |
| 🇧🇷 Portugués | O celular virado para baixo | Rafael — o namorado | `/audio/historias/portugues/o-celular-virado-para-baixo/b.mp3` | 1:30 |
| 🇧🇷 Portugués | O caderno do avô | Camila — a nora | `/audio/historias/portugues/o-caderno-do-avo/a.mp3` | 2:08 |
| 🇧🇷 Portugués | O caderno do avô | Sérgio — o sogro | `/audio/historias/portugues/o-caderno-do-avo/b.mp3` | 1:41 |
| 🇰🇷 Coreano | 잠긴 휴대폰 | 지은 — 여자친구 | `/audio/historias/coreano/jamgin-hyudaepon/a.mp3` | 2:27 |
| 🇰🇷 Coreano | 잠긴 휴대폰 | 민호 — 남자친구 | `/audio/historias/coreano/jamgin-hyudaepon/b.mp3` | 1:47 |
| 🇰🇷 Coreano | 할아버지의 장부 | 수진 — 며느리 | `/audio/historias/coreano/harabeoji-ui-jangbu/a.mp3` | 2:29 |
| 🇰🇷 Coreano | 할아버지의 장부 | 만호 — 시아버지 | `/audio/historias/coreano/harabeoji-ui-jangbu/b.mp3` | 1:48 |
| 🇯🇵 Japonés | 伏せられたスマホ | ミサキ — 彼女 | `/audio/historias/japones/fuserareta-sumaho/a.mp3` | 1:52 |
| 🇯🇵 Japonés | 伏せられたスマホ | リョウ — 彼氏 | `/audio/historias/japones/fuserareta-sumaho/b.mp3` | 1:36 |
| 🇯🇵 Japonés | 祖父の帳簿 | あゆみ — 嫁 | `/audio/historias/japones/sofu-no-choubo/a.mp3` | 2:35 |
| 🇯🇵 Japonés | 祖父の帳簿 | 健三 — 義父 | `/audio/historias/japones/sofu-no-choubo/b.mp3` | 2:17 |
| 🇷🇺 Ruso | Телефон экраном вниз | Аня — девушка | `/audio/historias/ruso/telefon-ekranom-vniz/a.mp3` | 1:43 |
| 🇷🇺 Ruso | Телефон экраном вниз | Дима — парень | `/audio/historias/ruso/telefon-ekranom-vniz/b.mp3` | 1:44 |
| 🇷🇺 Ruso | Дедушкина тетрадь | Оля — невестка | `/audio/historias/ruso/dedushkina-tetrad/a.mp3` | 1:49 |
| 🇷🇺 Ruso | Дедушкина тетрадь | Виктор — свёкор | `/audio/historias/ruso/dedushkina-tetrad/b.mp3` | 1:47 |

## Los dos mp3 retirados

`public/audio/grandmothers-ledger/` se borró: se había grabado con el guion en el
que quien reclamaba los regalos era la abuela, con voz de mujer. La transcripción
actual dice «he», «Mark's dad», «Sir», y la toma nueva la hace `WL en · Grandpa Sam`.
Siguen en el historial de git por si alguna vez hicieran falta.
