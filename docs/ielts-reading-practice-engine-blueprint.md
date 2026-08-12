# Blueprint — IELTS Reading practice engines

Status: mandatory scaling contract
Reference implementation: `/practica/ielts/reading/tipos-de-preguntas/matching-headings`
Last updated: 2026-08-12

## Product promise

Every Reading question type and subskill must teach a decision, let the learner rehearse it with support, test transfer without answer leakage, and preserve useful progress. A short explanation plus a few questions is not a practice product.

The reusable learning sequence is:

1. **Method:** explain the target, evidence and main distractor.
2. **Worked decision:** model one complete think-aloud before asking the learner to act.
3. **Guided practice:** immediate, specific feedback after a learner decision.
4. **Independent set:** one complete passage with feedback closed until submission.
5. **WeLearn Progress Engine:** varied micro-drills followed by complete-passage transfer.
6. **Review:** error taxonomy, retry target and locally saved progress.

“Mastery” always means mastery of the named WeLearn micro-skill. It is never an IELTS band, exam-readiness score or secure assessment.

## Non-negotiable pedagogical gates

- A worked example must expose the reasoning sequence: identify paragraph/question function, reject the closest distractor and prove whole-answer coverage.
- Guided practice must remove support progressively. It cannot reveal the answer before the learner acts.
- Selecting a radio card is a draft decision, not submission. Correctness, colours and explanations stay hidden until an explicit check action.
- A scanning activity cannot be a sequence of `Reveal evidence` buttons. The learner must first commit to a distinctive search signal and then select an exact evidence span before the answer, trap or explanation opens.
- Scanning evidence options must include nearby true details with a different entity, number, scope or polarity; random unrelated sentences do not test context control.
- Paraphrase practice must compare complete propositions, not synonym pairs. Every decision records the entity, action, quantity/scope, polarity, time/cause and certainty or comparison that must remain stable.
- Paraphrase distractors must alter one material meaning control and the feedback must name that distortion. Repeated vocabulary is not a valid distractor rationale by itself.
- Guided, independent and Progress Engine paraphrase pools must be disjoint. A passage seen in guided practice cannot be presented later as unseen or used to certify independent transfer.
- Inference practice must expose at least two explicit clues and ask for the smallest conclusion that connects them. A plausible statement from outside the passage is always a distractor, never supporting evidence.
- Inference feedback must diagnose outside knowledge, certainty inflation, invented causation, scope overreach, contradiction or failure to connect the clues. “Incorrect” alone does not teach the reasoning repair.
- Inference option order must be varied mechanically. A legacy bank with all keys in one position cannot be used for guided, independent or mastery claims.
- Independent and full-passage sets must preserve the real task rule. For Matching Headings, a heading cannot be reused and extra headings remain unused.
- Feedback must name why the chosen distractor fails: narrow detail, keyword match, wrong function, excessive scope or unsupported claim. Red/green alone is insufficient.
- A progress level cannot be certified from repeated position, length, typography, language, lexical-overlap or other surface shortcuts.
- Skill-label exercises must not invent a no-reuse rule merely to simplify scoring. Real paragraphs can perform similar jobs, so labels are decided from meaning rather than elimination.
- Short drills must vary correct-option position deterministically by question and attempt. The order must remain stable during one attempt and change on a clean retry.
- The automated gate must prove that always choosing the first option cannot pass a level and that correct answers occupy multiple positions across the bank.
- Full-passage content must include plausible competitors and paraphrase the evidence. A high lexical-match success rate is an editorial warning, not proof of mastery.
- Small banks are training evidence only. Statistical fairness, exam stamina and population-level mastery require larger samples and human review.

## Interaction and accessibility contract

- Use native radio inputs for one-of-many card choices. Arrow keys, Tab, Space and screen-reader naming must work without custom emulation.
- Use native selects only where compact comparison across several paragraphs is more usable. Every select needs a unique visible label and name.
- Disabled/used options remain perceivable and are labelled `Used`; the current selection remains available while editing.
- Feedback and progress changes use appropriate live/status semantics without moving focus unexpectedly.
- Every actionable target is at least 44×44 CSS pixels, has visible keyboard focus and works at 320, 390 and 1440 CSS pixels.
- Floating commercial controls must not obscure or intercept an active exercise. On narrow mobile screens, suppress or safely relocate them while practice is present, regardless of whether the browser reports a coarse pointer.
- Destructive restart/reset actions require a second confirmation or an undo path.
- Respect `prefers-reduced-motion`; never make motion necessary to understand state.

## Progress and resilience contract

- Persist active level, in-progress answers, elapsed time, unlocked levels, best scores, error counts and review queue locally when the product promises local progress.
- Version the storage key and migrate the previous version conservatively. Invalid or unavailable storage must not break practice.
- Draft state must survive reload and navigation. Submission clears only that level’s draft; saved history remains.
- A clean retry increments the option-order seed so the learner cannot memorise positions.
- Primary-source links open in a new tab while an attempt is active, with accessible notice.

## Full-stack and security boundary

- Guided Learn mode may deliver answer keys and explanations to the browser only when the UI says so plainly.
- Client-delivered keys cannot be called secure Practice, Exam or proctored assessment. Those modes require server-side attempt generation, scoring and authorization.
- Never infer authorship, factual verification, rights clearance or human review from a visible WeLearn label. Preserve the applicable rights/provenance contract.
- Source URLs must be HTTPS, directly relevant, periodically checked and replaceable when they consistently deny or lose access.
- Production must come from committed `main` in the canonical `idiomaswl` repository.

## Information architecture and visual contract

- Keep the Task 2 family grammar: flat editorial hero, navy hierarchy, red primary action, 6–8px radii, fine dividers and restrained shadows.
- Put a compact in-page journey near the top: `Learn the method`, `See an example`, `Start guided practice`, `Open the full set`, `Go to Progress Engine`.
- Do not hide the engine several screens down without a direct jump.
- The practice surface may be visually distinctive, but the outer shell, spacing, typography and hierarchy must remain recognisably WeLearn.
- English is the learner-facing language for the international hub and lessons. The explicitly marked FAQ may remain Spanish and must use `lang="es"`.

## Content and anti-shortcut audit

Before adding another question type or subskill, record and test:

- exact IDs, answers, distractors, explanations and evidence spans;
- answer-position distribution per level and across the bank;
- duplicated answer text and accidental reuse;
- correct-option length and formatting cues;
- lexical-overlap winner versus stored key, with ties reported honestly;
- prompt/hint leakage before response;
- task-specific rules such as no-reuse, word limits, textual order and grammar fit;
- protected-class representation and irrelevant cultural/knowledge load;
- source availability, factual limitations and human-review status.

No single heuristic certifies fairness. A detected shortcut blocks content certification until it is removed or explicitly contained as guided instruction.

## Required automated and browser evidence

Static/unit gates:

- canonical/index/JSON-LD and English/Spanish language boundaries;
- exact bank cardinality and unique IDs;
- option ordering deterministic within an attempt and varied across attempts/questions;
- task constraints enforced in guided, independent and engine modes;
- storage migration and draft schema;
- native controls, labels and reset confirmation copy;
- blueprint reference present in the implementation/migration record.
- the public route mounts guided practice, an independently held-back passage and the Progress Engine; a shell or language refactor must fail if it silently removes any practice surface.

Real-browser gates:

- desktop 1440 and mobile 390/320 with no horizontal overflow;
- mouse/touch success and wrong-answer paths;
- keyboard-only radio/select flow;
- reused option unavailable where the official task forbids reuse;
- always-first strategy fails the short level;
- draft survives reload; submission and reset behave as documented;
- floating controls do not cover active choices;
- internal links, canonical and primary-source links resolve as expected.
- the production console has no CSP violations from intentionally enabled analytics; allow only reviewed, narrowly scoped script origins, and never open an unversioned package CDN merely to silence a blocked tag.

## Definition of done for scale

A pilot can become a template only after content checks, TypeScript, production build and the real-browser story pass. Any issue found in a final audit becomes a new rule or mutation test here before the next type is cloned. Scaling means reusing these constraints—not copying only the visible component.

## Migration record

- **Skimming:** complete progressive vertical.
- **Scanning:** complete progressive vertical; inherited global validator debt closed.
- **Paraphrase recognition:** progressive vertical implemented with 6 source-backed passages, 30 decisions, held-back independent transfer and 6 local levels. Browser and release gates must pass before this line is used as a production certificate.
- **Inference:** progressive vertical implemented with 6 source-backed passages, 30 evidence bridges, held-back independent transfer and 6 local levels. Browser and release gates must pass before this line is used as a production certificate.
- **Next subskill after release:** Word-limit control. Do not begin it until Inference passes the static, build and real-browser gates above.
