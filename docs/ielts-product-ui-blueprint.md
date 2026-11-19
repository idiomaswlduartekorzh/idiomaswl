# IELTS product UI blueprint

This contract keeps IELTS Listening, Reading, Writing and Speaking coherent while preserving the interaction patterns each skill needs. Writing Task 2 is the visual reference; the implemented source of truth is the shared `wlp-` system in `src/styles/practica-ui.css`. The editorial content and inventory live in `docs/ielts-explanations-blueprint.md`.

## Shared product language

- Use the `--wlp-shell` (`1180px`) content shell and semantic `--wl-*` canvas, surface, border and text roles. These adapt to light and dark mode.
- Read the Listening, Reading, Writing and Speaking accents from `src/data/practica/skill-accents.ts` on both the skill card and destination page.
- Prefer flat raised surfaces, `--wlp-r` (`6px`) radii and crisp borders. Do not use glass panels, decorative gradients or large shadows as the primary content structure.
- Use one clear hero, a compact fact rail and sections with an eyebrow, heading and explanatory paragraph.
- Keep reading prose near `70–78ch`, with visible paragraph spacing and line height around `1.7–1.85`.
- A lesson or Progress Engine score is practice performance, never an IELTS band prediction.
- Keep official test rules distinct from WeLearn strategies and from estimated Listening/Reading practice bands.

## Listening and Speaking invariants

- The Listening entry explains all four parts, answer-form prediction, corrections, common formats and replay-based review before a learner starts a set. Practice playback controls are labelled as a study affordance; the official recording is played once.
- Guided Listening evidence is a time-bounded approved clip. Its explanation names the actual decision and distractor in that clip; a generic warning about similar words is not sufficient feedback.
- The Speaking entry explains Parts 1–3 and the four official criteria in language a learner can use while listening to a recording.
- Focused Speaking recordings stay in the open session. A transcript or unreviewed synthetic model cannot demonstrate pronunciation or assign a band.
- Generated Speaking model audio remains unavailable until human approval marks it ready. Written reference profiles must retain their pedagogical label.
- Only sets 1–20 expose the guided full-mock route; all 40 expose independent skill practice.

## Reading invariants

### Evidence before decision

Every question must expose its passage, paragraph or authorised extract in the same working area before the learner answers. A Progress Engine must not present a claim and options without the evidence used to resolve it.

### Honest practice scope

Compact training passages must be labelled as compact. The lesson must explain that they isolate one decision pattern and are not full-length IELTS passages or timed simulations. “Full set” may describe question coverage; it must not imply official passage length.

### Exercise layout

- Passage blocks use a readable text measure instead of the full viewport width.
- Question metadata, question text, answer controls, comparison rules and action buttons remain in the main question column.
- Direct children added to a grid must receive an explicit grid column at desktop and mobile breakpoints. Never rely on auto-placement for primary controls.
- Evidence, question and feedback remain distinguishable without depending on colour alone.
- Mixed practice follows individual-format study; the question-type hub does not interrupt the map with an unexplained mode switch.

## Writing invariants

- Task 1 and Task 2 use the same shell, hero, fact rail, section rhythm and card grammar.
- The Academic Writing hub presents Task 1 and Task 2 as 2 equal primary routes. Cross-task tools such as the rubric are supporting routes and must not become an orphan third card in a 2-column grid.
- Clearly distinguish official requirements from WeLearn study strategies.
- Paragraph plans and suggested word ranges are training scaffolds, not official IELTS prescriptions.
- Task pages link architecture, transferable skills and full-task practice instead of presenting disconnected mini-lessons.
- Every canonical Task 1 lesson participates in one shared course map. The map groups response architecture, visual types and transferable/application work; it exposes the active route plus previous, hub and next navigation without replacing the lesson's single H1.
- Do not duplicate breadcrumbs underneath the shared Task 1 course map, and never mount a second `<main>` inside the site's main landmark. Legacy lesson engines may be preserved, but their route shell, focus treatment and responsive width must use the shared product contract.
- Task 1 information pages remain self-canonical and indexable. A direct timed-writing session may remain `noindex, nofollow` when its canonical practice bank is the durable information surface.
- A shared course map may expose an inherited lesson only after its principal learning object uses the current visual contract. Line graphs, bar charts, pie charts and tables use the shared Task 1 visual-analysis panel; adding a new shell around a legacy generic card is not visual migration.

## Interaction and accessibility

- Interactive targets are at least `44px` high where practical.
- Use semantic links, buttons, fieldsets, legends and labels. Preserve keyboard focus with visible `:focus-visible` treatment.
- Dynamic results and saved-state messages use appropriate live regions without announcing unrelated layout changes.
- Do not disable zoom, encode meaning only in colour or use `transition: all`.
- At `320px`, `390px`, tablet and desktop widths, no control text may overflow and no explanatory copy may collapse into a narrow vertical column.

## Release checklist

1. Verify the IELTS root hub, Academic hub, Listening and Speaking guides, Writing Task 1, Writing Task 2 and Reading Question Types share the visual contract.
2. Verify guided, independent and Progress Engine routes at desktop and mobile widths.
3. Confirm every question has visible evidence before answer submission.
4. Confirm compact-passage disclosure and non-band score disclosure.
5. Run the practice-content guardian, practice catalog guardian, TypeScript, relevant tests and production build.
6. Use browser QA for overflow, focus, answer selection, feedback and responsive reading measure.
7. For Task 1, verify all 14 course-map routes return `200`, expose their own canonical, appear in the sitemap and preserve the timed-session `noindex` boundary.
8. When a navigation change makes an older route more prominent, capture that route at desktop and mobile widths. Link coverage alone is not evidence of visual parity.
