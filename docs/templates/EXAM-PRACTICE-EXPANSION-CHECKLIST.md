# Checklist de expansión de prácticas de examen

Copiar este archivo para cada expansión. El contrato que explica cada campo está en
[EXAM-PRACTICE-EXPANSION-BLUEPRINT.md](../EXAM-PRACTICE-EXPANSION-BLUEPRINT.md).

## Identidad

- [ ] Trabajo:
- [ ] Responsable:
- [ ] Fecha:
- [ ] Rama:
- [ ] Commit base:
- [ ] Producto:
- [ ] Sección:
- [ ] Familia:
- [ ] Tipo: set nuevo / familia nueva / examen nuevo / idioma nuevo

## Objetivo y alcance

- [ ] Necesidad del estudiante:
- [ ] Resultado observable:
- [ ] Rutas nuevas:
- [ ] Rutas afectadas:
- [ ] Fuera de alcance:

## Contrato académico

- [ ] Fuente y versión:
- [ ] IDs de claims:
- [ ] Idioma de interfaz:
- [ ] Idioma de contenido:
- [ ] Cantidad de sets:
- [ ] Cantidad de ítems:
- [ ] Originalidad o licencia verificada:
- [ ] Revisor académico:
- [ ] Hash o versión aprobada:
- [ ] Fecha de aprobación:
- [ ] Observaciones o excepciones:

## Contrato de familia

- [ ] Blueprint especializado de referencia:
- [ ] `familyId`:
- [ ] `engineId`:
- [ ] Justificación si requiere motor nuevo:
- [ ] Forma de entrada:
- [ ] Forma de respuesta:
- [ ] Tipo de scoring:
- [ ] Alcance de persistencia:
- [ ] Métrica visible:

## Política de experiencia

- [ ] Modo: practice / simulation
- [ ] Navegación: free / sequential
- [ ] ¿Exige respuesta para continuar?:
- [ ] Reproducción de audio: unlimited / limited / not-applicable
- [ ] Temporizador: none / informational / enforced
- [ ] Comportamiento al recargar:
- [ ] Salida visible hacia el catálogo:

Para `practice`, confirmar:

- [ ] Puede avanzar sin responder.
- [ ] Puede volver a cualquier ítem disponible.
- [ ] Puede reproducir, pausar y repetir el audio sin límite.
- [ ] El cursor y los estilos no comunican un bloqueo inexistente.

## Datos e IDs

- [ ] Manifiesto del producto:
- [ ] Catálogo de familias:
- [ ] Registro de sets:
- [ ] Convención de `setId`:
- [ ] Convención de `itemId`:
- [ ] `contentVersion`:
- [ ] IDs únicos y referencias válidas:
- [ ] Orden público declarado explícitamente:

## Medios

- [ ] ID del manifiesto:
- [ ] Cantidad de audios:
- [ ] Cantidad de imágenes:
- [ ] Cantidad de videos:
- [ ] Duración obtenida de los archivos finales:
- [ ] Hashes registrados:
- [ ] Paridad entre guion y archivo:
- [ ] Revisión auditiva o visual registrada:
- [ ] No existen controles activos para medios faltantes:

## Interfaz y rutas

- [ ] Usa `PracticeRouteShell`.
- [ ] Usa `PracticeSetCatalog` cuando hay varios sets.
- [ ] Usa `PracticeSessionHeader` en la sesión.
- [ ] El motor aparece debajo de la estructura compartida.
- [ ] Color de sección declarado:
- [ ] Navegación histórica preservada o migrada explícitamente:
- [ ] `setId` inválido produce 404 o explicación visible.
- [ ] Vista móvil verificada.
- [ ] Teclado, foco, labels y contraste verificados.
- [ ] Diccionario de interfaz actualizado si cambia el locale.

## Controles de calidad

- [ ] IDs, conteos y versiones coherentes.
- [ ] Claves privadas ausentes del bundle del cliente.
- [ ] Distribución de respuestas revisada.
- [ ] Sesgo de longitud de opciones revisado.
- [ ] Distractores duplicados o triviales revisados.
- [ ] Mezcla accidental de idiomas revisada.
- [ ] Persistencia y restauración verificadas.
- [ ] Navegación libre verificada en práctica.
- [ ] Reproducción ilimitada verificada en práctica.
- [ ] Feedback y tipo de scoring se comunican con precisión.

## Comandos obligatorios

- [ ] Validador de catálogo/manifiestos:
- [ ] TypeScript:
- [ ] Lint relevante:
- [ ] Guardianes del producto:
- [ ] Pruebas de comportamiento relevantes:
- [ ] `prebuild`:
- [ ] `build`:

Registrar comando y resultado, no solo marcar la casilla.

## Evidencia de revisión

- [ ] Escritorio:
- [ ] Móvil:
- [ ] Teclado y accesibilidad:
- [ ] Audio:
- [ ] Scoring o feedback:
- [ ] Persistencia:
- [ ] Consola del navegador sin errores:
- [ ] Aprobación académica:

## Publicación

- [ ] Decisión de publicación aprobada:
- [ ] Commit funcional:
- [ ] Commit en `main`:
- [ ] Deployment:
- [ ] Estado del deployment:
- [ ] Smoke del hub:
- [ ] Smoke de la familia:
- [ ] Smoke de una sesión:
- [ ] Plan de rollback:

## Pendientes

- [ ] Bloqueadores:
- [ ] Riesgos aceptados:
- [ ] Próxima acción exacta:
