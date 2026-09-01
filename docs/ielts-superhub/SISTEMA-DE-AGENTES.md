# Sistema de agentes — IELTS Practice Superhub

## Principio operativo

Los agentes comparten un objetivo, no una superficie de escritura. Investigación y QA
pueden ejecutarse en paralelo; sólo un agente escritor trabaja sobre una familia de
archivos a la vez. Cada handoff entrega evidencia reproducible y el orquestador no acepta
afirmaciones de “listo” sin el gate correspondiente.

Los contratos ejecutables viven en `config/ielts-superhub-agents.json` y son validados por
`check:ielts:truth`.

## Red

1. **Orchestrator** — ordena fases, asigna paths y mantiene el estado de entrega.
2. **Preservation Guardian** — congela invariantes del hub, mocks y sesiones actuales.
3. **SEO Intelligence** — administra intención, canonical, canibalización y grafo interno.
4. **Content Architect** — convierte clusters en rutas y contratos editoriales.
5. **Assessment Editor** — valida formato, claves, distractores, explicaciones y límites.
6. **Audio QA** — valida archivo, duración, cue points, transcript y accesibilidad.
7. **Implementer** — escribe la vertical slice usando Server Components y fronteras
   cliente mínimas.
8. **Adversarial QA** — intenta romper indexación, scoring, privacidad, móvil y teclado.
9. **Analytics Steward** — define eventos y prueba que la medición no expone respuestas.
10. **Release Guardian** — ejecuta los gates y autoriza el handoff para integración.

## Flujo de handoff

```text
Preservation + SEO (read-only, paralelo)
                 ↓
Content Architect → Assessment Editor → Audio QA
                 ↓
            Implementer
                 ↓
Adversarial QA + Analytics (read-only, paralelo)
                 ↓
          Release Guardian
```

Cada handoff debe contener:

- commit o diff exacto;
- paths modificados;
- intención de búsqueda propietaria;
- fuentes oficiales y fecha de revisión;
- comandos ejecutados y salida;
- deuda o bloqueo restante;
- siguiente agente responsable.

## Locks de escritura

- `hub`: `src/app/(site)/practica/ielts/**`
- `catalog`: catálogos exclusivos IELTS; nunca el catálogo mixto mientras TOEFL esté en
  desarrollo paralelo
- `runner`: extractor/DTO/sesión parcial IELTS
- `media`: `public/audio/ielts/**` y manifests de timing
- `harness`: `config/ielts-superhub-*`, scripts y tests del harness
- `shared-seo`: sitemap y navegación, sólo durante integración coordinada

Un agente no puede adquirir dos locks si otro agente está esperando uno de ellos. Los
cambios en `shared-seo` se hacen al final de una vertical slice ya aprobada.

## Estados editoriales

- `published`: indexable y con todos los gates verdes.
- `pilot`: disponible únicamente para QA. Una candidata puede preparar su sitemap, pero
  CI y `prebuild` deben bloquear cualquier publicación hasta que el estado sea aprobado.
- `blocked`: existe material parcial, pero falta una condición obligatoria.
- `legacy`: se preserva por compatibilidad y no se presenta como formato vigente.

`check:ielts:truth` comprueba que la implementación coincide con estos estados. El gate
estricto rechaza `pilot`, `blocked` o `legacy` cuando se intenta promocionar el recurso.

## Controles fail-closed de una práctica Listening

El Release Guardian no confía en un único manifiesto. Antes de una promoción reconcilia:

- identidad, versión, parte y número entre catálogo, registro, DTO y scorer;
- diez preguntas contiguas y response specs exactos para texto u opciones;
- ausencia de transcript, claves y explicaciones en el DTO previo al submit;
- MP3 físico, bytes, SHA-256, duración, canales, frecuencia y bitrate MPEG;
- source parseado con el AST oficial de TypeScript: un único objeto literal `SOURCE`,
  propiedades estáticas únicas, adaptadores canónicos y cero mutaciones, alias o escapes;
- mapa físico, bytes, SHA-256, autoría, seguridad SVG, `viewBox`, textos accesibles y
  `areaKeys` entre catálogo, source, manifiesto y SVG;
- paridad inversa: ninguna landing, ruta de sitemap, MP3, SVG o marcador de release puede
  existir sin una entrada pública completa en catálogo;
- bloqueo humano de escucha y revisión visual sin autoaprobaciones de agentes.

Las pruebas de mutación demuestran cada rechazo; no basta con que el caso feliz pase.

## Prohibiciones

- No editar rutas, mocks, audio, scripts o tests exclusivos de TOEFL.
- No fusionar la rama antigua `codex/ielts-academic-2026-audit`.
- No copiar hashes, estados editoriales o audios de una auditoría vieja como si fueran
  evidencia actual.
- No exponer `answer` o `answers` en un payload público nuevo.
- No añadir una ruta al sitemap para “reservar” la URL.
- No generar audio publicable con voces del sistema operativo ni con un modelo sin
  MODEL_CARD, licencia compatible y atribución comprobable.
- No reducir umbrales de guardianes para obtener verde.
- No publicar directamente desde el worktree USB.
