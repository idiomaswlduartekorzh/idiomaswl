# Protocolo de arranque cuando el usuario diga «vamos»

Este documento elimina decisiones improvisadas. «Vamos» autoriza la construcción del primer
corte técnico, no la publicación de contenido clínico.

## Corte 1 — gobernanza ejecutable

Objetivo: conectar el consejo preparado sin producir todavía un banco médico real.

1. Confirmar rama limpia, actualizarla contra `origin/main` y volver a ejecutar guardianes.
2. Confirmar proveedor y credencial mediante el flujo seguro de API; nunca guardar claves en Git.
3. Instalar el SDK oficial solo en ese momento y leer la guía de la versión instalada.
4. Implementar un orquestador server-only, sin endpoint público y con concurrencia 1.
5. Añadir canonicalización y SHA-256 del ítem, fuentes, prompts y salidas.
6. Implementar persistencia append-only y autorización administrativa.
7. Ejecutar los 24 casos sintéticos de evaluación; no usar preguntas médicas reales.
8. Entregar coste, latencia, detecciones y trazas antes de autorizar el corte 2.

Puerta de salida: cero falsos `eligible-for-pilot`, 100 % de defectos críticos sembrados
detectados y 100 % de bloqueo sin las dos firmas médicas humanas.

## Corte 2 — prototipo UX sintético

Construir pregunta, explicación, reporte, móvil, teclado y lector de pantalla usando contenido
completamente sintético y rotulado. No se mezcla con el futuro banco clínico ni se sirve como
preparación médica.

Puerta de salida: QA funcional y accesible, sin escritura pública, secretos ni indexación.

## Corte 3 — lote retenido de Caldas

Solo después de aprobar los cortes 1 y 2, preparar un manifiesto de 5 borradores para
Universidad de Caldas 2027 / Medicina Interna. El consejo puede preauditarlos, pero permanecen
en `clinical-review / blocked-human-clinical-signoff`. No se muestran a estudiantes.

## Lo que «vamos» no autoriza

- fingir que un agente es médico o registrar una matrícula inexistente;
- importar preguntas recordadas, filtradas, universitarias o de competidores;
- desplegar, integrar en `main`, habilitar pagos o publicar contenido;
- ejecutar lotes grandes, navegador o modelos locales si una prueba Node pequeña basta;
- saltar la aprobación médica porque los agentes coincidan.

## Decisiones que se medirán antes de escalar

- coste y latencia por ítem y por rol;
- tasa de abstención, desacuerdo y hallazgos críticos;
- porcentaje de caché reutilizable por hashes;
- defectos no detectados en fixtures;
- esfuerzo humano estimado por expediente;
- necesidad real de separar modelos/proveedores para reducir error correlacionado.
