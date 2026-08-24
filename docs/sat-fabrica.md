# Fábrica SAT — escala controlada de 2 a 20 sets

Actualizado el **24 de agosto de 2026**. Este documento es la receta operativa que faltaba
en la fase C0. No sustituye las especificaciones de `docs/sat-ingles-blueprint.md`: las
convierte en una cadena de producción repetible.

## Objetivo y capacidad

La meta son **20 simulacros adaptativos completos** de Reading and Writing. Cada set exige
81 preguntas originales: 27 de M1, 27 de M2 estándar y 27 de M2 exigente. El estudiante
recibe M1 y una sola rama de M2, por lo que responde 54 preguntas en 64 minutos.

| Estado | Sets | Módulos | Preguntas autoradas | Preguntas servidas por intento |
| --- | ---: | ---: | ---: | ---: |
| Publicado al abrir este loop | 2 | 6 | 162 | 54 por set |
| Publicado actual | 3 | 9 | 243 | 54 por set |
| Trabajo restante | 17 | 51 | 1.377 | 54 por set |
| Meta | 20 | 60 | 1.620 | 54 por set |

La primera producción midió aproximadamente **25 minutos por bloque de ocho ítems** para
plan, textos, ítems y primera auditoría, sin contar correcciones. Un módulo requiere cuatro
bloques operativos; los 51 módulos restantes tienen por tanto un piso optimista de unas
85 horas antes de QA de producto. Esta cifra sirve para capacidad, no para saltarse pasos.

## Regla de flujo

Solo hay **un set activo**. Dentro de ese set solo hay **un módulo en escritura** y dentro
del módulo solo hay **un bloque abierto**. El orden es siempre:

1. Craft and Structure: 8 ítems.
2. Information and Ideas: 7 ítems.
3. Standard English Conventions: 7 ítems.
4. Expression of Ideas: 5 ítems.

Un bloque no se considera cerrado porque tenga 27 campos rellenados. Está cerrado cuando
sus claves son únicas, cada distractor representa un error plausible, la forma de las
cuatro opciones no delata la respuesta y las comprobaciones mecánicas aplicables pasan.

Los sets se producen y publican de uno en uno. Las tandas de tres —3 a 5, 6 a 8, etc.— son
solo puntos de revisión de capacidad y rendimiento; nunca una autorización para abrir
tres borradores a la vez.

## Máquina de estados de un set

### 0. Sincronizar y reservar

- Partir de `origin/main` actualizado en un worktree aislado.
- Confirmar que el árbol está limpio y que no se mezclan cambios de otras sesiones.
- Ejecutar `npm run scaffold:sat -- --set N --dry-run` y luego, si pasa,
  `npm run scaffold:sat -- --set N`.
- El catálogo debe quedar con `status: draft`, `publishable: false`; el hub y el registro
  público deben seguir sin conocer el set.

### 1. Matriz editorial

Antes de escribir prosa se asignan a los 81 slots:

- tipo de pregunta y dominio fijados por el scaffold;
- dificultad 1, 2 o 3, con curva creciente dentro de cada grupo;
- materia: ciencia, historia/estudios sociales, humanidades o literatura;
- tema concreto y hecho verificable, sin repetir el objeto central de Sets 1–2;
- letra de respuesta prevista, balanceada al 20–30 % y sin tres iguales seguidas;
- clase de error que representará cada distractor.

Ninguna materia puede superar el 40 % del módulo. M2 estándar debe resultar más fácil que
M1 y M2 exigente más difícil, pero ambas ramas conservan ítems fáciles.

### 2. Escritura por bloque

Para cada bloque se trabaja en este orden:

1. Diseñar cuatro opciones de forma, alcance, régimen y longitud comparables.
2. Decidir después cuál queda sostenida por el texto; nunca escribir primero la clave.
3. Escribir un estímulo original de 25–150 palabras de seis caracteres.
4. Registrar fuente del hecho, explicación y razón de error A–D.
5. Pasar auditoría de clave única y corregir el bloque antes de abrir el siguiente.

Un ítem corregido vuelve a revisión completa. No se revisa únicamente la línea cambiada.

### 3. Puertas mecánicas del módulo

El módulo debe tener 27 preguntas y superar, sin bajar umbrales:

- cada letra correcta entre 20 y 30 %, sin tres claves iguales consecutivas;
- clave más larga en no más del 30 %;
- clave con mayor o menor solape léxico en no más del 40 %;
- cuatro opciones distintas y explicación para cada distractor;
- longitud oficial, reparto 8/7/7/5, curva y variedad temática;
- ids y metadatos emparejados.

Se valida como candidato; un borrador no recibe un acta pública por conveniencia.

### 4. Puertas editoriales del módulo

Las puertas que exigen criterio se documentan en `docs/sat-auditorias/`:

- clave única;
- sesgo y prueba a ciegas;
- equidad;
- lengua;
- dificultad;
- originalidad;
- simulación de estudiante.

La prueba a ciegas se ejecuta sin estímulos. La media no puede superar 35 % y se revisa el
desglose por ítem. **Cada ronda de correcciones se vuelve a medir antes de empezar otra**;
no se encadenan cambios que impidan saber cuál mejoró o empeoró el resultado.

La originalidad tiene dos niveles: búsqueda y revisión de las fuentes externas usadas, y
`npm run check:sat-originality-local` para impedir secuencias repetidas de ocho palabras
entre cualquier set publicado o borrador. El control local no sustituye el externo.

### 5. Composición y producto

Con tres módulos editoriales cerrados:

- mover las fuentes ejecutables a `src/data/mocks/sat/sat-set-N-*.ts`;
- componer `sat-set-N.ts` con `buildSatMock()`;
- auditar el candidato con los 28 resultados posibles de M1;
- comprobar que se sirven exactamente M1 y una rama de M2;
- verificar que no se vuelve a M1, que el reloj reinicia en 32:00 y que los ids no chocan;
- recorrer en navegador las rutas estándar y exigente, una de ellas a 390 px;
- comprobar 54 revisiones, cuatro dominios, transparencia de puntaje y ausencia de errores.

No se escriben leads falsos en producción durante QA. Si se intercepta persistencia, se
declara esa limitación en el informe.

### 6. Promoción

Solo después de cerrar contenido y producto:

- las tres actas pasan a `publicable: true`;
- el manifiesto pasa a `published` y `productGate: PASS`;
- el catálogo declara fuente, exportación, tres módulos y tarjeta;
- `npm run generate:sat-catalog` actualiza los archivos derivados;
- pasan `check:practica-catalog`, TypeScript, prebuild y build;
- la rama se actualiza otra vez con `origin/main` antes de integrar;
- producción sale exclusivamente del commit de `main` y se verifica por URL.

## Comandos de cierre

```bash
npm run check:sat-catalog
npm run test:sat-factory
npm run check:sat-originality-local
npm run check:sat
npm run check:sat-adaptive
npm run check:sat-superhub
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Los comandos se ejecutan en serie. No se abre servidor, navegador y build al mismo tiempo.
Si falta espacio o memoria, se conserva el checkpoint, se borra únicamente caché
regenerable del worktree y el build se deja a CI/Vercel; no se reintenta en bucle.

## Puntos de control al crecer

Después de Sets 5, 10 y 15 se mide:

- duración de los guardianes y del build;
- tamaño de las páginas y del registro generado;
- tasa de ítems devueltos por doble clave, fuga ciega, equidad y originalidad;
- temas repetidos y cobertura de materias;
- errores y abandono por módulo en producto.

El registro generado importa hoy todos los sets publicados. Antes de que su coste afecte
las páginas se cambia a carga por set; no se espera a que el Set 20 haga visible el problema.

## Siguiente unidad de trabajo

`set-4` está reservado como borrador. Su próxima tarea es cerrar la matriz editorial de M1
—dificultad, materia, tema y letras previstas— y después Craft and Structure q01–q08.
Hasta entonces no tiene contenido publicable y no debe aparecer en el hub.
