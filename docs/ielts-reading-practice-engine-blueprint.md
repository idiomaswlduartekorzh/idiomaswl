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
- Word-limit practice must derive the maximum from the displayed instruction for every item. A hard-coded two-word scorer cannot certify tasks that say `ONE WORD ONLY`, `NO MORE THAN TWO WORDS` or `AND/OR A NUMBER`.
- The submitted span must be literal, within the stated maximum and grammatically natural when rebuilt with the words before and after the gap. Being under the limit is not enough when the span is incomplete or duplicates a frame word.
- Guided, independent and Progress Engine word-limit pools must be disjoint. Feedback must distinguish over-limit, duplicated frame word, incomplete span, grammar mismatch, wrong evidence and instruction misread.
- Time-management practice must record the evidence state, time already invested and next search cost. “Go faster” or a decorative countdown is not a pacing method.
- Leaving an item must preserve its paragraph, anchor and unresolved distinction. Final review prioritises located evidence over searches from zero; the flexible 20-minute passage budget must never be described as an official per-passage IELTS rule.
- Guided, independent and Progress Engine time-management pools must be disjoint. Feedback must diagnose over-investment, restart search, abandoned evidence, unsupported rush, poor review priority and equal-time fallacy.
- Multiple Choice practice must begin with the exact stem job: detail, purpose, inference, main idea or vocabulary in context. A familiar topic word is never sufficient evidence.
- Guided, independent and Progress Engine Multiple Choice pools must be disjoint. Feedback must diagnose stem misread, lexical echo, partial truth, scope inflation, wrong relationship or unsupported claim.
- The learner must commit to a native radio option and explicitly check or submit. First click cannot lock the question, reveal the key or turn an editable draft into immediate correction.
- Full Multiple Choice sets keep feedback closed until all questions are submitted. A retry reshuffles option positions while preserving the same four meanings.
- True / False / Not Given practice must operationalise three evidence states: the same exact claim, an incompatible passage claim, or an unresolved claim. FALSE cannot be inferred from a weaker, stronger or merely different statement.
- A TFNG decision must preserve subject, action, quantity, comparison, timing, certainty and polarity. “Some” does not logically contradict “every” unless the passage supplies an exclusion; “little change” does contradict a claimed sharp increase.
- Guided, independent and Progress Engine TFNG pools must be disjoint. Feedback must diagnose missed paraphrase, unproved opposite, misclassified silence, quantifier shift, time or degree shift and outside knowledge.
- Full TFNG sets keep feedback closed until all statements are submitted. Every NOT GIVEN explanation must name the exact missing relationship rather than saying only that the answer is absent.
- Matching Information practice must begin from the statements. The learner builds a distinctive search signal, scans the complete passage map and confirms the full entity-action-relationship detail before choosing a paragraph.
- A broad topic match, nearby true detail or repeated keyword is never sufficient. Feedback must diagnose topic matching, entity confusion, qualifier loss, lexical echo, relationship mismatch or the wrong local detail.
- Guided, independent and Progress Engine Matching Information pools must be disjoint. Full sets keep every paragraph visible, allow paragraph reuse when the instruction permits it and keep feedback closed until all locations are submitted.
- Guided location choices use native clickable radio cards; complete sets use uniquely labelled native selects. A first click remains an editable draft and cannot reveal or lock the key.
- Matching Features practice begins with a feature map. Every decision must preserve the named actor, project, policy or process together with its action, result, timing and limitation; a nearby name is not evidence.
- Guided, independent and Progress Engine Matching Features pools must be disjoint. Feature reuse remains available when the instructions permit it, while feedback stays closed across complete sets until submission.
- Feedback must diagnose nearby-name matching, shared-topic matching, wrong actor, wrong result, qualifier loss or a reversed relationship. The learner must be able to quote the attribution span and reject the closest competing feature.
- Guided feature choices use native clickable radio cards; complete sets use uniquely labelled native selects. First selection is always an editable draft, and answer keys may open only after explicit check or full-set submission.
- Matching Sentence Endings practice must apply two filters in order: grammatical compatibility first, then the exact passage relationship. A natural sentence is not evidence, and repeated vocabulary cannot settle the answer.
- Guided, independent and Progress Engine Matching Sentence Endings pools must be disjoint. Complete sets keep feedback closed until submission, and progressive banks must exclude any legacy item with two reasonable endings or a material passage-information-order defect.
- Feedback must diagnose grammar-only selection, wrong cause/timing/relationship, scope inflation, polarity reversal, lexical echo or the wrong evidence zone. The learner must reject the closest grammatically possible competitor with a quoted passage span.
- Do not invent a no-reuse rule for Matching Sentence Endings when the displayed instructions and reviewed task contract do not state one. Scoring must remain correct if two beginnings genuinely take the same ending.
- Sentence Completion practice must derive its accepted word count from the instruction displayed for each set. A response is valid only when it is a literal passage span, stays within that limit and rebuilds the sentence with natural grammar and unchanged meaning.
- Summary Completion practice must require the learner to read the connected overview before filling individual gaps. Every accepted response must be a literal passage span within the displayed limit, fit the rebuilt sentence and preserve the summary's sequence, reference and logical relationships. A redundant alternative that repeats a supplied frame word must be rejected even when it occurs verbatim in the passage.
- Note Completion practice must treat every group heading as an evidence boundary rather than decorative copy. Each response must belong to the active group, fit the complete bullet, reproduce a literal passage span and remain within the displayed limit.
- Table Completion practice must treat the row and column headers as a single evidence coordinate. Every response must belong at that intersection, fit the complete cell, reproduce a literal passage span and remain within the displayed limit. If two or more exact spans are independently grammatical and supported, the bank must accept them explicitly or remove the cell.
- Flow-chart Completion practice must begin with the whole process. Every response must preserve the active stage type, the relationship with the previous and next boxes, the connector logic, rebuilt grammar, exact passage wording and the displayed limit. A true phrase from another stage is a distractor, not an answer.
- Diagram Labeling practice must begin with the whole visual. Each marker needs an explicit zone and landmark before scanning; the response must fit that position, component function, rebuilt label grammar, exact passage wording and displayed limit. A true phrase for a neighbouring part is a distractor, not an answer. The visual must depict the contextual topology of the passage—layers, flow, components or spatial relationships—and may not be replaced by one generic central shape with letters around it.
- Short Answer practice must classify the requested factual target before scanning: person, place, time, quantity, object, reason, condition or result. Questions follow passage order, but order only narrows the evidence window; it never proves an answer. Every accepted response must be a literal passage span, answer the exact target, use the smallest sufficient wording and stay within the displayed words-and-numbers rule. A nearby true detail that answers a different question is a distractor.
- A canonical lesson is not sufficient when a public rewrite serves a different component. The content guardian and vertical tests must pin guided practice, held-back independent practice and the Progress Engine in both the canonical source page and the actual public rewrite destination.
- Guided, independent and Progress Engine Flow-chart pools must be disjoint. Guided errors reopen for repair; complete flows keep every response editable and all feedback closed until one full submission.
- Mixed-stage Flow-chart drills must keep each source passage, active stage map and response field in one visual unit. Rendering several detached passages before a separate answer list creates a memory-and-scrolling task instead of process reasoning.
- Guided, independent and Progress Engine Sentence Completion pools must be disjoint. Full sets keep feedback closed until every frame is submitted; guided errors must offer a repair path instead of locking a wrong first response.
- Feedback must distinguish wrong evidence, an incomplete span, a grammatical mismatch, repeated frame words, an over-limit response and an instruction misread. A nearby true phrase is not correct when it completes a different relationship.
- Sentence Completion inputs are native text fields with unique names and hidden contextual labels. Live word counts supplement the written instruction; colour alone cannot communicate an excess-word error.
- Yes / No / Not Given must begin with attribution: identify whether a view belongs to the writer, a critic, an institution or an example before comparing its direction, strength and scope.
- NO requires an opposing writer position. Qualification, lower priority, uncertainty or criticism of implementation does not automatically mean total opposition.
- Guided, independent and Progress Engine YNNG pools must be disjoint. Feedback must diagnose attribution shift, stance direction, stance strength, scope or quantifier shift, misclassified silence and outside knowledge.
- Full YNNG sets keep feedback closed until submission. Every NOT GIVEN explanation must name the exact preference, recommendation, comparison, frequency or policy the writer never states.
- Independent and full-passage sets must preserve the real task rule. For Matching Headings, a heading cannot be reused and extra headings remain unused.
- Feedback must name why the chosen distractor fails: narrow detail, keyword match, wrong function, excessive scope or unsupported claim. Red/green alone is insufficient.
- A progress level cannot be certified from repeated position, length, typography, language, lexical-overlap or other surface shortcuts.
- Skill-label exercises must not invent a no-reuse rule merely to simplify scoring. Real paragraphs can perform similar jobs, so labels are decided from meaning rather than elimination.
- Short drills must vary correct-option position deterministically by question and attempt. The order must remain stable during one attempt and change on a clean retry.
- The automated gate must prove that always choosing the first option cannot pass a level and that correct answers occupy multiple positions across the bank.
- Full-passage content must include plausible competitors and paraphrase the evidence. A high lexical-match success rate is an editorial warning, not proof of mastery.
- Small banks are training evidence only. Statistical fairness, exam stamina and population-level mastery require larger samples and human review.

## Interaction and accessibility contract

- A new practice surface cannot claim Task 2 visual parity merely because its JSX names familiar classes. Every referenced layout, engine header, status panel and responsive variant must have a defined style contract and a real-browser visual assertion; undefined CSS-module keys are a release blocker.
- Guided and independent desktop practice keeps the passage and decision workspace in the established split layout. Mobile may stack them, but the active stage, response and repair action must remain adjacent and the document must not overflow at 320 px.

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
- When `next.config` rewrites a public question-type URL, the progressive engine must be mounted and tested in the rewrite destination as well as any route-specific source page. Editing a shadowed page is not a release.
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
- **Inference:** complete progressive vertical; 6 source-backed passages, 30 evidence bridges, held-back independent transfer, 6 local levels and production release gates passed.
- **Word-limit control:** complete progressive vertical; 6 source-backed passages, 30 exact-span decisions, held-back independent transfer, 6 local levels and production release gates passed.
- **Time management:** complete progressive vertical; 6 source-backed passage plans, 30 evidence-cost decisions, held-back independent transfer, 6 local levels and production release gates passed.
- **Multiple Choice:** complete progressive vertical; 6 source-backed passages, 30 one-best-answer decisions, held-back independent transfer, 6 local levels and production release gates passed. The public rewrite destination is pinned by tests so a shadowed route cannot regress silently.
- **True / False / Not Given:** complete progressive vertical; 6 source-backed passages, 30 evidence-state decisions, held-back independent transfer, 6 local levels and production release gates passed. Guided feedback remains explicit, full-set feedback stays closed until submission, drafts survive reload and the 320–390 px browser audit has no horizontal overflow.
- **Yes / No / Not Given:** complete progressive vertical; 6 source-backed editorial passages, 30 writer-view decisions, held-back independent transfer and 6 local levels. The two material legacy ambiguities remain excluded. Static content checks, protected-catalog checks, TypeScript, production build and real-browser desktop/mobile gates passed.
- **Matching Headings:** complete progressive vertical; 6 source-backed passages, 30 paragraph-function decisions, held-back independent transfer and 8 local levels. Guided headings are native clickable radio cards; full-passage sets use labelled selects, prohibit heading reuse and leave two headings unused. Both the canonical source page and its public rewrite destination are pinned so the old Spanish-only lesson cannot replace the real practice surfaces silently. Static content checks and the desktop/mobile real-browser story pass are complete; production release evidence remains the final publication gate.
- **Matching Information:** complete progressive vertical with 6 source-backed passages and 30 exact-detail decisions. Guided radio cards, a held-back independent set, paragraph reuse, closed full-set feedback, deterministic drill order, local drafts and 6 progress levels are pinned in both the canonical source page and public rewrite destination. The 3 legacy passages retain their conservative candidate-source limitations; 3 existing source-backed passages are reused for transfer without creating new factual-verification claims. Static gates, production build, desktop/mobile interaction, reload persistence, internal links and the production release passed.
- **Matching Features:** complete progressive vertical with 6 source-backed or conservatively bounded passages and 30 attribution decisions. Guided and independent pools are held apart from 4 Progress Engine passages; native radios remain editable before checking, full sets use labelled selects, features may repeat, feedback stays closed until submission and local drafts use a versioned storage key. Static gates, production build, desktop/mobile interaction, reload persistence, internal links and the production release passed.
- **Matching Sentence Endings:** complete progressive vertical with 6 source-backed or conservatively bounded passages and 28 retained decisions. One ambiguous legacy item and two passage-order defects are excluded; guided and independent pools are held apart from four Progress Engine passages, grammar remains a filter rather than proof, full-set feedback stays closed and local drafts use a versioned storage key. Static gates, production build, desktop/mobile interaction, reload persistence and production release passed.
- **Sentence Completion:** complete progressive vertical with 6 source-backed or conservatively bounded passages and 30 exact-span decisions. Guided and independent pools are held apart from four Progress Engine passages; each answer is checked against its displayed limit, literal passage wording and rebuilt sentence, while feedback diagnoses six answer-boundary and evidence errors. Static gates, desktop/mobile interaction, reload persistence and production release passed.
- **Summary Completion:** complete progressive vertical with 6 source-backed or conservatively bounded passages and 36 exact-span decisions. Guided and independent pools are held apart from four Progress Engine passages; the learner maps the connected overview before solving gaps, full-set feedback stays closed and local drafts use a versioned storage key. The inherited `the roof` alternative is rejected because its frame would read `the the roof`. Static gates, desktop/mobile interaction, reload persistence and production release passed.
- **Note Completion:** complete progressive vertical with 6 source-backed or conservatively bounded passages and 36 structured-note decisions. Guided and independent pools are held apart from four Progress Engine passages; three visible headings map the evidence zones, full-set feedback stays closed, guided errors reopen for repair and local drafts use a versioned storage key. Static gates, production build, desktop/mobile interaction, reload persistence and production release passed.
- **Table Completion:** complete progressive vertical with 6 source-backed or conservatively bounded passages and 36 coordinate decisions. Guided and independent pools are held apart from four Progress Engine passages; every response uses a visible row and column, full-table feedback stays closed, guided errors reopen for repair and local drafts use a versioned storage key. The inherited cooling ambiguity accepts `prevailing winds`, `direction` and `the direction`. Static gates, production build, desktop/mobile interaction, reload persistence and production release passed.
- **Historical handoff completed — Next question-type vertical:** Flow-chart Completion. This marker remains immutable so later roadmap edits cannot erase the audited transition recorded by earlier verticals.
- **Flow-chart Completion:** complete progressive vertical with 6 source-backed or conservatively bounded passages and 33 process-stage decisions. Guided and independent pools are held apart from four Progress Engine passages; every response uses its stage type plus the previous and next boxes, complete-flow feedback stays closed, guided errors reopen for repair and local drafts use a versioned storage key. Static gates, production build, desktop/mobile interaction, reload persistence and production release passed.
- **Diagram Labeling:** progressive vertical implemented and released with 6 source-backed or conservatively bounded passages and 36 visual-component decisions. Guided and independent pools are held apart from four Progress Engine passages; each response uses a marker, zone and landmark before exact-span retrieval, complete-diagram feedback stays closed, guided errors reopen for repair and local drafts use a versioned storage key. Static gates, production build, desktop/mobile interaction, reload persistence and production release passed.
- **Historical handoff completed — Next question-type vertical:** Short Answer. This marker remains immutable so the audited Diagram-to-Short-Answer transition cannot disappear when the roadmap advances.
- **Short Answer:** progressive vertical implemented with 6 source-backed or conservatively bounded passages and 36 ordered factual-detail decisions. Guided and independent pools are held apart from four Progress Engine passages; each response classifies its target before scanning, rejects nearby true details, uses the smallest exact span and obeys the displayed maximum. Full-set feedback stays closed, guided errors reopen for repair and local drafts use a versioned storage key. Browser, build and production release gates remain required before this line becomes a publication certificate.
- **Next product vertical:** Mixed Practice integration. Combine already-certified question types without weakening their individual task contracts, feedback timing, accessibility or persistence boundaries.
