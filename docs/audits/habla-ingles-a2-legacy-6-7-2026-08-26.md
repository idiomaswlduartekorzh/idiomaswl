# Inglés A2 · recertificación de los escenarios heredados 6 y 7

Fecha: 2026-08-26
Runtime auditado: `src/data/practica/habla-acompanado/ingles-a2.ts`
SHA-256 del runtime auditado: `5165ad8487a854637ada36181994d269b387689e2126673fa0ce07f4f1794f79`
Base Git: `68ad57e414462b29b76d9504179f42338940f369`

## Veredicto

- `the-cousin-on-the-sofa`: **PASS**.
- `two-more-people-for-the-trip`: **PASS**.

Esta evidencia reemplaza, únicamente para estos dos escenarios y esta huella exacta del runtime,
las simulaciones históricas anteriores a la última edición. No certifica los otros escenarios ni
el conjunto completo.

## Método de conteo

Un solo criterio para las diez corridas:

- cuenta toda palabra hablada en inglés, incluidas formas impresas que el jugador pronuncia;
- no cuenta acotaciones, marcas de auditoría ni rellenos no léxicos;
- una contracción y un compuesto con guion cuentan como una palabra;
- no hubo español ni filtraciones en estas diez corridas.

Modelo temporal reproducible: habla a 68 ppm para sólido y quiet, 38 ppm para weak y 85 ppm para
shortcut en el escenario 6; 110 ppm para sólido, 75 ppm para weak, 60 ppm para quiet y 85 ppm para
shortcut en el escenario 7; más 2 s entre turnos, apertura de carta (22 s en el 6, 24 s en el 7) y
6 s por atasco marcado en el perfil. Es una estimación editorial, no una medición humana.

La carga 40–60 se juzga solo en `solid-solid` y `weak-weak`. En `quiet` se comprueba que el jugador
produce dato privado, condición y parte del cierre; no se juzga su porcentaje de palabras.

## Resumen de métricas

### Escenario 6 · `the-cousin-on-the-sofa`

La carta abre en el turno global 6 en las cinco corridas. Todas alcanzan las seis piezas; el atajo
no obtiene una salida sustantiva antes del global 6.

| perfil | turnos A/B | palabras A/B | total | reparto | tiempo estimado | cierre |
|---|---:|---:|---:|---:|---:|---|
| solid-solid | 9/9 | 93/121 | 214 | **43/57** | 4:17 | 6/6 |
| solid-weak | 9/9 | 46/118 | 164 | 28/72 | 4:29 | 6/6 |
| weak-weak | 9/9 | 39/58 | 97 | **40/60** | 4:41 | 6/6 |
| quiet (A) | 13/13 | 33/128 | 161 | 20/80 | 3:52 | 6/6; máximo 3 palabras por turno de A |
| shortcut (B) | 9/9 | 87/97 | 184 | 47/53 | 3:45 | 6/6; intentos tempranos bloqueados |

### Escenario 7 · `two-more-people-for-the-trip`

La carta abre después del global 3 y Valentina comunica sus tres cambios en el global 4 en las
cinco corridas. Todas alcanzan las seis líneas y el `Together`; Andrea queda `pending before 7:00`.

| perfil | turnos A/B | palabras A/B | total | reparto | tiempo estimado | cierre |
|---|---:|---:|---:|---:|---:|---|
| solid-solid | 9/9 | 149/126 | 275 | **54/46** | 3:34 | 6/6 + Together |
| solid-weak | 9/9 | 141/63 | 204 | 69/31 | 3:47 | 6/6 + Together |
| weak-weak | 9/9 | 68/46 | 114 | **60/40** | 3:53 | 6/6 + Together |
| quiet (B) | 13/13 | 147/36 | 183 | 80/20 | 3:28 | 6/6 + Together; máximo 3 palabras por turno de B |
| shortcut (A) | 8/8 | 120/108 | 228 | 53/47 | 3:42 | 6/6 + Together; no gana antes del global 6 |

## Transcripts · escenario 6

`A = Dani`, `B = Cris`. A inicia. La carta se abre en B3, global 6.

### 6.1 · solid-solid

1. **A1** — My cousin Iván comes Thursday the twentieth at four thirty. He needs ten nights and I said yes before asking you.
2. **B1** — I am not saying no, but I have an interview Monday the twenty-fourth at nine.
3. **A2** — Why do you need the living room instead of your room?
4. **B2** — The wifi drops by my window and a truck unloads there at nine. My mother was coming Saturday.
5. **A3** — It matters, but I cannot say why. He is out all day after Friday.
6. **B3 · carta** — That is not true anymore. She comes Thursday afternoon and stays until Tuesday.
7. **A4** — Your mother comes Thursday too. Where does she sleep?
8. **B4** — She normally sleeps on the couch. We need another way.
9. **A5** — Iván sleeps in my room and your mother takes the couch.
10. **B5** — I need the living room Monday from eight to eleven. I finish at eleven.
11. **A6** — Second bed: my room. Nobody pays.
12. **B6** — The lease needs both names by September first.
13. **A7** — I give you Monday morning and you give me a bed for Iván.
14. **B7** — We leave Nelson and the last nights for Sunday after lunch in the kitchen.
15. **A8** — I will sign this week.
16. **B8** — You get Sunday to decide and I get an answer before my mother leaves.
17. **A9** — Thursday to Sunday.
18. **B9** — Iván comes Thursday and sleeps in Dani's room on the mattress from Thursday to Sunday.

Resultado: 6/6; carta correcta; 43/57.

### 6.2 · solid-weak

1. **A1** — My cousin comes Thursday. Ten nights. I said yes. Sorry.
2. **B1** — I have an interview Monday the twenty-fourth at nine in the living room.
3. **A2** — Interview in your room?
4. **B2** — The wifi drops near my window and a truck unloads boxes there. My mother was coming Saturday.
5. **A3** — It matters. Family thing. He is out all day.
6. **B3 · carta** — That changed. She arrives Thursday and stays until Tuesday. Two people, one couch.
7. **A4** — Your mother Thursday too?
8. **B4** — Can we do it another way? Maybe a hostel first?
9. **A5** — Iván my room. Your mother couch.
10. **B5** — I need Monday from eight to eleven, and I finish at eleven.
11. **A6** — Second bed: my room.
12. **B6** — The lease needs both names by September first.
13. **A7** — Nobody pays.
14. **B7** — We leave the last nights and Nelson for Sunday after lunch in the kitchen.
15. **A8** — I sign. Monday yours.
16. **B8** — You give me Monday and the signature; I give you the couch and time to decide.
17. **A9** — Thursday to Sunday.
18. **B9** — Iván comes Thursday and sleeps in Dani's room on the mattress from Thursday to Sunday.

Resultado: 6/6; A débil usa las piezas breves; no hace falta A10.

### 6.3 · weak-weak

1. **A1** — My cousin comes Thursday. Ten nights. Couch.
2. **B1** — Monday interview. Nine. Living room.
3. **A2** — Interview where?
4. **B2** — Wifi bad. Truck noisy. My mother Saturday.
5. **A3** — Family thing. Cannot say why.
6. **B3 · carta** — Changed now. Mother Thursday. Until Tuesday.
7. **A4** — Two people Thursday?
8. **B4** — One couch. Hostel maybe?
9. **A5** — Iván my room. Your mother couch.
10. **B5** — Monday eight to eleven. I finish eleven.
11. **A6** — Second bed: my room.
12. **B6** — Lease needs both names by September first.
13. **A7** — Nobody pays. Monday yours.
14. **B7** — Last nights Sunday after lunch. Kitchen.
15. **A8** — I sign. You give bed.
16. **B8** — You give Monday. I give couch.
17. **A9** — Thursday to Sunday.
18. **B9** — Iván comes Thursday, sleeps in Dani's room, Thursday to Sunday.

Resultado: 6/6; **40/60** con el contador único.

### 6.4 · quiet (A)

1. **A1** — Cousin comes Thursday.
2. **B1** — Your cousin stays ten nights. I have a Monday interview at nine.
3. **A2** — Ten nights. Couch.
4. **B2** — Why the couch? I also need the living room, and my mother was coming Saturday.
5. **A3** — Family. Cannot explain.
6. **B3 · carta** — Her ticket changed. She comes Thursday and stays until Tuesday.
7. **A4** — Same day.
8. **B4** — My mother normally takes the couch. Can Iván use your room?
9. **A5** — Iván my room.
10. **B5** — Good. Tell me where each person sleeps.
11. **A6** — Your mother couch.
12. **B6** — Good. What is the second bed?
13. **A7** — Second bed.
14. **B7** — Where does that bed go?
15. **A8** — My room.
16. **B8** — Does anyone pay for it?
17. **A9** — Nobody pays.
18. **B9** — What does Iván do during the day?
19. **A10** — Out all day.
20. **B10** — Then I need Monday from eight to eleven, and I finish at eleven.
21. **A11** — Monday yours.
22. **B11** — The lease needs both names by September first.
23. **A12** — I sign.
24. **B12** — We leave the last nights and Nelson for Sunday after lunch in the kitchen.
25. **A13** — Thursday to Sunday.
26. **B13** — Iván comes Thursday and sleeps in Dani's room on the mattress from Thursday to Sunday.

Resultado: 6/6; A nunca supera tres palabras; produce dato privado, condición y cierre.

### 6.5 · shortcut (B)

1. **A1** — My cousin Iván comes Thursday for ten nights. I said yes before asking. He takes the couch.
2. **B1 · atajo** — Fine. Monday is mine and the lease is signed. We are done.
3. **A2** — No, we are not finished. Why can you not use your room?
4. **B2 · atajo** — The wifi drops there. Also my mother was coming Saturday. That is enough.
5. **A3** — Your mother and Iván arrive the same day. We need another bed.
6. **B3 · carta** — Her ticket changed. She comes Thursday until Tuesday. Can we finish now?
7. **A4** — Iván takes my room and your mother takes the couch.
8. **B4 · atajo** — Monday from eight to eleven. I finish at eleven. Done.
9. **A5** — Second bed: my room. Nobody pays.
10. **B5** — The lease needs both names by September first.
11. **A6** — Monday eight to eleven is yours, and I sign this week.
12. **B6** — We leave the last nights for Sunday after lunch in the kitchen.
13. **A7** — You give the couch and I give Monday.
14. **B7** — Yes, that works.
15. **A8** — We decide the last nights Sunday after lunch.
16. **B8** — I give the couch and get Monday. Now we have five pieces.
17. **A9** — Thursday to Sunday.
18. **B9** — Iván comes Thursday and sleeps in Dani's room on the mattress from Thursday to Sunday.

Resultado: los intentos de los globales 2, 4, 6 y 8 no cierran; cierre 6/6 al global 18.

## Transcripts · escenario 7

`A = Valentina`, `B = Kevin`. B inicia. La carta abre después de B2, global 3, y A comunica los
tres cambios en A2, global 4.

### 7.1 · solid-solid

1. **B1** — I need spots for Sebastián and Andrea. They paid me one hundred thousand each on Tuesday.
2. **A1** — There are six beds, six names and six ID numbers. Only doña Nubia can change my list.
3. **B2** — The two hundred thousand is in my pocket, but I still owe you one hundred thousand.
4. **A2 · carta** — There may be room for one person on a camping mat. It costs one hundred fifty thousand on my reservation, and the answer comes before seven.
5. **B3** — One person costs one hundred fifty, so I am fifty thousand short.
6. **A3** — I will not put in the missing fifty. You also have not paid me yet.
7. **B4** — Andrea can put in the fifty. She arrives in twenty minutes with her card.
8. **A4** — Who gives you the name and ID, and when do you send them?
9. **B5** — Andrea gives her full name and ID. I send them before nine.
10. **A5** — Give me the exact payment day and what happens if the money is not there.
11. **B6** — I pay Tuesday the twenty-fifth. If the money is not there, I pay Friday the twenty-eighth.
12. **A6** — Doña Nubia calls before seven. If nobody answers, Andrea stays out and the group remains six.
13. **B7** — To Sebastián: I say no by ten. To Andrea: I say maybe by eight.
14. **A7** — Hernán is the sixth person and his car has four seats. The mechanic also calls before seven.
15. **B8** — Kevin drives four people. Hernán drives two people. Andrea stays pending before seven.
16. **A8** — Four people with Kevin and two with Hernán: six people, two cars. Andrea remains pending.
17. **B9** — I will say my three lines exactly like that in the group message.
18. **A9** — Good. I heard your three lines and our two numbers. I send the message now.

Resultado: 6/6 + Together; 54/46.

### 7.2 · solid-weak

1. **B1** — Need two spots. Sebastián and Andrea.
2. **A1** — There are six beds, six names and six ID numbers, and only doña Nubia can change the list.
3. **B2** — Tuesday they pay me. Two hundred thousand.
4. **A2 · carta** — Doña Nubia says there may be room for one on a camping mat. It costs one hundred fifty thousand on my reservation, and the answer comes before seven.
5. **B3** — One hundred fifty? I am fifty short.
6. **A3** — I paid six hundred thousand already. I will not put in the missing fifty.
7. **B4** — Andrea pays fifty. She comes twenty minutes.
8. **A4** — Tell me who gives the name and ID and when you send them.
9. **B5** — Andrea: name, ID. I send by nine.
10. **A5** — Now give me a payment date and the plan if that date fails.
11. **B6** — Tuesday twenty-fifth. If not, Friday twenty-eighth.
12. **A6** — The call comes before seven. If nobody answers, Andrea stays out and we remain six.
13. **B7** — Sebastián: no by ten. Andrea: maybe by eight.
14. **A7** — Kevin has five seats. Hernán has four seats, but his mechanic calls before seven.
15. **B8** — Kevin car: four people. Hernán car: two people. Andrea pending seven.
16. **A8** — Kevin drives four people and Hernán drives two. Andrea is pending before seven.
17. **B9** — My three are ready.
18. **A9** — I heard all three. Six people and two cars. I send the message.

Resultado: 6/6 + Together; el andamiaje sostiene a B débil.

### 7.3 · weak-weak

1. **B1** — Two spots. Sebastián, Andrea.
2. **A1** — Six beds. Six names, IDs. Doña Nubia changes.
3. **B2** — They paid Tuesday. Two hundred thousand.
4. **A2 · carta** — One person, camping mat. One hundred fifty thousand, my reservation. Answer before seven.
5. **B3** — Fifty short.
6. **A3** — I no pay fifty. You owe me.
7. **B4** — Andrea pays fifty. Twenty minutes.
8. **A4** — Who gives ID? When send?
9. **B5** — Andrea: name, ID. Send by nine.
10. **A5** — Payment day? If no money?
11. **B6** — Tuesday twenty-fifth. Friday twenty-eighth: paid.
12. **A6** — Call before seven. No answer, Andrea stays out.
13. **B7** — Sebastián: no, ten. Andrea: maybe, eight.
14. **A7** — Kevin five seats. Hernán four. Mechanic calls seven.
15. **B8** — Kevin: four people. Hernán: two people. Andrea pending seven.
16. **A8** — Kevin four people. Hernán two. Andrea pending seven.
17. **B9** — Three lines ready.
18. **A9** — Six people. Two cars. I send.

Resultado: 6/6 + Together; **60/40** con el contador único.

### 7.4 · quiet (B)

1. **B1** — Two spots, please.
2. **A1** — You need two spots. There are six beds and six names with six ID numbers. Only doña Nubia changes the list.
3. **B2** — Two hundred paid.
4. **A2 · carta** — Doña Nubia may have room for one person on a camping mat. It costs one hundred fifty thousand on my reservation. The answer comes before seven.
5. **B3** — Fifty short.
6. **A3** — So the money came from Sebastián and Andrea. I will not pay the missing fifty.
7. **B4** — Andrea: name, ID.
8. **A4** — Good. Andrea gives her name and ID.
9. **B5** — Send by nine.
10. **A5** — And you send those details before nine.
11. **B6** — Tuesday twenty-fifth.
12. **A6** — Tuesday the twenty-fifth is your exact day.
13. **B7** — Friday twenty-eighth: paid.
14. **A7** — If Tuesday fails, you pay on Friday the twenty-eighth.
15. **B8** — Sebastián: no, ten.
16. **A8** — You tell Sebastián no by ten.
17. **B9** — Andrea: maybe, eight.
18. **A9** — You tell Andrea maybe by eight.
19. **B10** — Kevin: four people.
20. **A10** — Kevin drives four people in his five-seat car.
21. **B11** — Hernán: two people.
22. **A11** — Hernán drives two people if the mechanic clears his car.
23. **B12** — Andrea pending seven.
24. **A12** — Andrea stays pending until the answer before seven.
25. **B13** — Message ready.
26. **A13** — I heard your private facts, condition and closing pieces. Six people, two cars. I send the message.

Resultado: 6/6 + Together; B nunca supera tres palabras; produce dato privado, condición y cierre.

### 7.5 · shortcut (A)

1. **B1** — I need spots for Sebastián and Andrea. They paid me two hundred thousand on Tuesday.
2. **A1 · atajo** — There are six beds and six names. Pay your one hundred thousand and we are done.
3. **B2** — I cannot pay you tonight. Can I pay Tuesday the twenty-fifth? Andrea arrives in twenty minutes.
4. **A2 · carta + atajo** — There may be room for one on a camping mat, for one hundred fifty on my reservation. The answer comes before seven. Fine, I send now.
5. **B3** — One hundred fifty means I am fifty short. Andrea can put in the fifty.
6. **A3 · atajo** — Then nobody extra goes. I send six people and two cars now.
7. **B4** — If Tuesday fails, I pay Friday the twenty-eighth. That date needs both of us.
8. **A4** — If I do not have the money Tuesday, I ask in the group.
9. **B5** — Andrea gives her full name and ID; I send them before nine.
10. **A5 · atajo** — Fine. Nothing else tonight.
11. **B6** — Do not send yet. I still need to say what happens with Sebastián and Andrea.
12. **A6** — If nobody answers before seven, Andrea stays out. Now give me the missing identity and messages.
13. **B7** — To Sebastián: no by ten. To Andrea: maybe by eight.
14. **A7** — Andrea puts in the fifty, then yes. Kevin has five seats and Hernán has four.
15. **B8** — Kevin drives four people; Hernán drives two. Andrea stays pending before seven.
16. **A8** — Six people: Kevin drives four and Hernán drives two. Andrea pending. I heard your three and send now.

Resultado: ningún intento de A en los globales 2, 4, 6 o 10 satisface el cierre; 6/6 + Together al global 16.

## Conclusión

Los dos escenarios heredados pasan los cinco perfiles contra la huella indicada. Los dos repartos
que sí juzga la puerta de carga quedan dentro de 40–60. Los perfiles quiet producen sus piezas y
cierran sin superar tres palabras por turno; los atajos no consiguen una salida sustantiva antes
del global 6. Cualquier edición posterior del runtime invalida esta evidencia.
