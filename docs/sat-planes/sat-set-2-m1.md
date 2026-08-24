# Plan editorial — `sat-set-2-m1`

Módulo de enrutamiento del segundo simulacro SAT. Contiene 27 ítems originales y permanece
como borrador no registrado hasta completar auditorías de clave única, sesgo/prueba a
ciegas, equidad, lengua, dificultad, originalidad y simulación.

## Matriz cerrada

| Rango | Dominio | Tipos | Dificultad | Claves |
|---|---|---|---|---|
| q01–q08 | Craft and Structure (8) | WIC 3 · estructura 3 · cruce 2 | 1,2,3 · 1,2,3 · 2,3 | A C B D B A C D |
| q09–q15 | Information and Ideas (7) | idea 2 · evidencia textual 2 · cuantitativa 1 · inferencia 2 | 1,2 · 2,3 · 2 · 2,3 | D B C A D B A |
| q16–q22 | Standard English Conventions (7) | boundaries 4 · form/structure/sense 3 | 1,1,2,2,2,3,3 | C D B A C D B |
| q23–q27 | Expression of Ideas (5) | síntesis 3 · transiciones 2 | 1,2,3 · 1,3 | A C D A B |

Reparto global de claves: A 7 · B 7 · C 6 · D 7. No hay tres letras iguales seguidas y
cada dominio contiene las cuatro letras. Temas: ciencia 10 · humanidades 7 · historia 6 ·
literatura 4. Dificultad: 7 fáciles · 11 medios · 9 difíciles; media 2,07.

## Evidencia mecánica

Comando:

```bash
node scripts/check-sat-exam.mjs --draft \
  --file src/data/mocks/sat/drafts/set-2/sat-set-2-m1.ts --verbose
```

Resultado del primer cierre editorial:

- Estructura: 27 ítems y 27 metadatos emparejados.
- Dominios: CS 8 · II 7 · SEC 7 · EOI 5.
- Clave más larga: 18,5 %; clave más corta: 14,8 %.
- Solape léxico alto: 25,9 %; solape léxico bajo: 14,8 %.
- Longitud de los 27 estímulos dentro de 25–150 palabras-SAT.
- Orden por dominio, tipo y dificultad válido.
- Panel reproducible de 18 heurísticas sin pasaje: media 23,7 %; ningún ítem acertado por
  ≥75 % de los perfiles. No sustituye el panel editorial.

Esto acredita únicamente puertas mecánicas. No sustituye revisión humana o editorial y no
autoriza promoción ni publicación.

## Pendiente antes de promover M1

1. Revisión de clave única y lenguaje por ítem.
2. Prueba a ciegas con panel y resultado máximo de 35 %.
3. Revisión de equidad y hechos.
4. Búsqueda de originalidad sobre estímulos y opciones.
5. Calibración de dificultad y simulación completa.
6. Acta `docs/sat-auditorias/sat-set-2-m1.json` con huellas del contenido aprobado.

El set completo seguirá sin ser publicable incluso después de aprobar M1: faltarán las dos
ramas de M2 y sus actas.
