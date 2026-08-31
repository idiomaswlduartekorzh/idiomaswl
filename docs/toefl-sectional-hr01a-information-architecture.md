# HR-01A — Enmienda de arquitectura del hub TOEFL

**Estado:** decisión humana recibida; reemplaza la jerarquía principal del hub descrita en HR-01

## Decisión

`/practica/toefl` no comienza pidiendo al usuario que elija Reading, Listening, Writing o Speaking. Comienza explicando tres productos distintos:

1. **Ejercicios — disponible.** Catálogo de los tipos de ejercicio vigentes del TOEFL 2026, agrupados por sección.
2. **Práctica — próximamente.** Recorridos guiados o práctica seccional. El producto todavía no está construido y la UI debe decirlo sin crear una ruta falsa.
3. **Simulacros — 20 disponibles.** Enlace directo al inventario de mocks completos existente en `/examenes/toefl#simulacros`.

## Rutas resultantes

```text
/practica/toefl
├── /ejercicios                 catálogo indexable de tareas TOEFL 2026
│   ├── Reading                 3 tipos
│   ├── Listening               4 tipos
│   ├── Writing                 3 tipos
│   └── Speaking                2 tipos
├── Práctica                    tarjeta visible “Próximamente”; sin promesa falsa
└── /examenes/toefl#simulacros  20 mocks completos existentes
```

## Catálogo de Ejercicios

### Reading — 3 tipos

- Complete the Words
- Read in Daily Life
- Read an Academic Passage

### Listening — 4 tipos

- Listen and Choose a Response
- Listen to a Conversation
- Listen to an Announcement
- Listen to an Academic Talk

### Writing — 3 tipos

- Build a Sentence
- Write an Email
- Write for an Academic Discussion

### Speaking — 2 tipos

- Listen and Repeat
- Take an Interview

## Estados editoriales

El catálogo muestra todos los tipos para explicar el formato completo, pero diferencia con texto visible:

- **Ejercicio disponible:** existe una página de ejercicio individual.
- **Disponible en simulacros:** el banco existe dentro de los mocks, pero aún no hay ejercicio individual.
- **Próximamente:** todavía no existe un recorrido funcional y no se presenta como enlace activo.

## Implicaciones

- Las cuatro secciones dejan de ser la primera decisión del hub maestro.
- Las páginas seccionales pueden seguir existiendo para SEO y orientación, pero quedan debajo de `Ejercicios` en la navegación de producto.
- Listening continúa como primer slice técnico después de los gates de diseño e interconexión.
- El diseño HR-02 debe tomar como referencia la jerarquía clara, editorial y basada en estados de `/practica/ielts`.
