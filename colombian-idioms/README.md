# Colombian Idiom Dataset

A dataset of Colombian Spanish idioms (`modismos`), built for a future idiom translator. This is **iteration 1**: a wide, accurate dataset — not the translator UI itself, and not yet wired into any application.

**Status:** standalone. Not part of the idiomaswl Next.js app (nothing here is imported from `src/`, and this folder isn't referenced by any route). It's kept decoupled deliberately until there's a decision on where/whether it becomes a product feature.

## Why this exists

Colombia has a huge number of idioms that carry real cultural intent — meaning that a literal or generic translation loses. The explicit goals for this dataset were:

- **Width**: cover traditional modismos, regional variants, and current slang — not just the dozen idioms every "learn Spanish" blog repeats.
- **Accuracy of intent**: every entry captures what the idiom actually *means* when a native speaker uses it (the pragmatic/figurative sense), not just a word-for-word gloss.
- **Honesty about origin**: entries note when something is a distinctly Colombian coinage vs. a pan-Hispanic saying that's simply in heavy daily use in Colombia (see the `refranes_compartidos` category).

## Data file

`data/idioms.json`

```json
{
  "schema_version": "1.0",
  "language_source": "es-CO",
  "language_target": "en",
  "entries": [ { ... } ]
}
```

### Entry schema

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable identifier, `co001`, `co002`, ... in insertion order. Never reuse or renumber an existing id. |
| `idiom` | string | The Colombian Spanish expression, in its canonical/citation form. |
| `literal_translation` | string | Word-for-word English gloss of the literal text (`"n/a"` when there is no meaningful literal reading, e.g. proper-noun-like slang). |
| `meaning_intent` | string | The real, pragmatic meaning — what a native speaker actually communicates by saying it. This is the field that exists specifically to avoid generic/flattened translations. |
| `english_equivalent` | string | The closest natural English idiom or phrase that a native English speaker would actually say in the same situation. |
| `example_es` | string | A natural example sentence in Colombian Spanish. |
| `example_en` | string | A natural English translation of that example (not necessarily literal — it should read like something an English speaker would say). |
| `register` | enum | `informal` \| `vulgar` \| `neutro` |
| `era` | enum | `tradicional` \| `nuevo` (long-established vs. contemporary/internet-era slang) |
| `category` | string | Thematic bucket — see below. |
| `region` | enum | `nacional` \| `paisa` \| `costeno` \| `rolo` \| `valluno` \| `santandereano` \| `llanero`. `nacional` means used broadly across Colombia; the others mark an idiom whose home/strongest association is a specific region (Antioquia/coffee region, Caribbean coast, Bogotá/Cundiboyacá, Valle del Cauca, Santander, Eastern Plains). Regionally-tagged idioms are often heard elsewhere too — the tag marks origin/strongest identity, not exclusivity. |

### Categories currently in use

`riesgo_precaucion`, `dinero_trabajo`, `relaciones_amor`, `fiesta_ocio`, `comida`, `insultos_groserias`, `aprobacion_desaprobacion`, `estados_animo`, `mentiras_enganos`, `pereza`, `clima_transporte_ciudad`, `saludos_interjecciones`, `slang_nuevo`, `refranes_compartidos`, and one `regionalismo_<region>` category per region above.

## Methodology

Entries were compiled from trained knowledge of Colombian Spanish, cross-checked against targeted web research for each region and for contemporary slang (to avoid inventing content or misattributing an idiom's regional home). Where a search couldn't independently confirm a specific expression, it was either dropped or phrased conservatively.

A known limitation: `refranes_compartidos` holds proverbs that are pan-Hispanic in origin but are everyday speech in Colombia (e.g. *"camarón que se duerme, se lo lleva la corriente"*). These are intentionally a small supplement, not the core — the core of the dataset is expressions that are distinctly Colombian or Colombian-regional.

Vulgarity: a handful of entries are tagged `register: "vulgar"` (e.g. `qué chimba`, `gonorrea`, `güevón`) because they are genuinely among the most common idioms in everyday Colombian speech — omitting them would misrepresent how natives actually talk. Their `meaning_intent` notes when a word functions as an insult vs. an affectionate/casual term depending on tone, since that distinction is exactly the kind of "real intent" a generic translation would flatten.

## Extending the dataset

1. Pick the next unused sequential `id` (check the last id in `data/idioms.json`, or run the validator — it prints total count).
2. Fill in every field in the schema table above. Don't add extra fields — the validator rejects unexpected keys.
3. Prefer verifying a new expression against at least one independent source before adding it, especially for region-specific or very recent slang.
4. Run the validator.

## Validating

```
node colombian-idioms/scripts/validate.mjs
```

Plain Node, no dependencies, no build step. Checks: required fields present and non-empty, no unexpected extra fields, unique `id`s, no duplicate `idiom` text, valid `register`/`era`/`region` enum values. Prints a summary of entry counts by category and region. Exits non-zero on any error — safe to wire into CI later if/when this dataset gets integrated into the main app (see `scripts/check-exam-practice-content.mjs` in the repo root for the existing content-check pattern this could plug into).

## Current size

219 entries across 7 regions and 20 categories. Run the validator for the live breakdown.
