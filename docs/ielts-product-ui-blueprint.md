# IELTS product UI blueprint

This contract keeps IELTS Reading and Writing coherent while preserving the interaction patterns each skill needs. Writing Task 2 is the visual reference; pages may adapt the system, but they must not return to isolated legacy cards or inline one-off layouts.

## Shared product language

- Use an `1180px` maximum content shell on `#f7f8fc`.
- Use WeLearn navy for hierarchy, teal for method/evidence, red for primary actions and restrained green/purple accents.
- Prefer flat white surfaces, `6–8px` radii and crisp borders. Do not use glass panels, decorative gradients or large shadows as the primary content structure.
- Use one clear hero, a compact fact rail and sections with an eyebrow, heading and explanatory paragraph.
- Keep reading prose near `70–78ch`, with visible paragraph spacing and line height around `1.7–1.85`.
- A lesson or Progress Engine score is practice performance, never an IELTS band prediction.

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
- Clearly distinguish official requirements from WeLearn study strategies.
- Paragraph plans and suggested word ranges are training scaffolds, not official IELTS prescriptions.
- Task pages link architecture, transferable skills and full-task practice instead of presenting disconnected mini-lessons.

## Interaction and accessibility

- Interactive targets are at least `44px` high where practical.
- Use semantic links, buttons, fieldsets, legends and labels. Preserve keyboard focus with visible `:focus-visible` treatment.
- Dynamic results and saved-state messages use appropriate live regions without announcing unrelated layout changes.
- Do not disable zoom, encode meaning only in colour or use `transition: all`.
- At `320px`, `390px`, tablet and desktop widths, no control text may overflow and no explanatory copy may collapse into a narrow vertical column.

## Release checklist

1. Verify the IELTS root hub, Writing Task 1, Writing Task 2 and Reading Question Types share the visual contract.
2. Verify guided, independent and Progress Engine routes at desktop and mobile widths.
3. Confirm every question has visible evidence before answer submission.
4. Confirm compact-passage disclosure and non-band score disclosure.
5. Run the practice-content guardian, practice catalog guardian, TypeScript, relevant tests and production build.
6. Use browser QA for overflow, focus, answer selection, feedback and responsive reading measure.
