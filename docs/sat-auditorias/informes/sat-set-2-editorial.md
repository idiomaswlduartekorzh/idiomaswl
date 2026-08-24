# Auditoría editorial del SAT Set 2

Fecha: 23 de agosto de 2026. Alcance: 81 ítems originales en M1, M2 estándar y M2
exigente.

## Independencia y límites

La redacción y la segunda pasada editorial fueron realizadas por Codex en la misma línea
de trabajo. No hubo panel humano, subagentes ni un segundo modelo disponible: el intento de
usar un solucionador local terminó porque `ollama` no está instalado. Por tanto, esta
auditoría no se presenta como independiente. La evidencia reproducible es el guardián
mecánico, 18 perfiles automáticos sin pasaje, búsqueda local de n-gramas y búsquedas
literales representativas en la web.

## Resultado por puerta

1. **Clave y opciones:** segunda resolución razonada de los 81 ítems. Se corrigieron antes
   de firmar una doble clave potencial en M2 estándar q20 (el punto y coma también era
   gramatical) y otra en M2 exigente q26 (`As a result` también podía introducir el efecto).
   Resultado final: cero dobles claves detectadas.
2. **Sesgo superficial:** los tres módulos superan reparto por letras, extremos de longitud
   y solape léxico. Panel de 18 heurísticas sin pasaje: M1 23,7 %, M2 estándar 26,1 % y M2
   exigente 23,0 %; ningún ítem fue acertado por al menos 75 % de los perfiles.
3. **Equidad:** todos los datos necesarios aparecen en el estímulo. Las personas, lugares,
   instituciones, estudios y cifras específicos son inventados o se presentan como
   conocimientos científicos generales; ningún ítem exige geografía, ingresos, religión o
   experiencia regional del estudiante colombiano.
4. **Lengua:** enunciados SAT canónicos, cuatro opciones, inglés estadounidense y una sola
   regla nombrable en cada SEC. Los 21 ítems SEC fueron montados con cada opción dentro del
   hueco; se corrigieron duplicaciones de palabra detectadas por el guardián.
5. **Dificultad:** M2 estándar 10/13/4 (media 1,78), M1 7/11/9 (2,07), M2 exigente 5/9/13
   (2,30). Cada rama conserva ítems de las tres bandas y se mantiene la progresión por tipo.
6. **Originalidad:** contenido escrito desde cero. `check:sat-originality-local` no encontró
   ninguna secuencia común de ocho palabras entre seis módulos y 162 ítems, excluyendo el
   encabezado canónico de notas. Doce búsquedas literales representativas no devolvieron
   coincidencias exactas con los estímulos. Esto no equivale a un rastreo exhaustivo de toda
   la web.
7. **Simulación:** solo panel heurístico reproducible; no hubo panel externo. Se deja esa
   limitación en las tres actas y en el estado del subsistema.

## Evidencia mecánica

```text
M1          A7 B7 C6 D7 · larga 18,5 · corta 14,8 · solape 25,9/14,8
M2 estándar A7 B7 C6 D7 · larga 22,2 · corta 14,8 · solape 18,5/33,3
M2 exigente A6 B7 C8 D6 · larga 25,9 · corta 11,1 · solape 25,9/22,2
```

El veredicto editorial es APTO con la limitación declarada de independencia. La
publicabilidad del producto se certifica por separado después de componer el set, ejecutar
el guardián adaptativo, construir la aplicación y recorrer ambos lados del corte en un
navegador real.
