import { createAdvancedCurriculumTopic as topic, pattern as p, type AdvancedCurriculumSpec } from '../advanced-curriculum-factory.ts'

const base = (value: Omit<AdvancedCurriculumSpec, 'level' | 'color'>, index: number): AdvancedCurriculumSpec => ({ ...value, level: 'C2', color: ['#C8102E', '#3730A3', '#0F766E', '#92400E', '#075985'][index % 5] })

const specs: Array<Omit<AdvancedCurriculumSpec, 'level' | 'color'>> = [
  {
    slug: 'theme-rheme-c2', order: '05', category: 'Information architecture', shortTitle: 'Theme, rheme and information flow',
    description: 'Arrange clause openings and end-focus so given information anchors the message and new information receives appropriate prominence.', purpose: 'guide the reader from an accessible point of departure to the most informative element', register: 'high-level academic, professional and literary discourse', formula: 'theme/given frame + development + rheme/new focus', model: 'What the inquiry ultimately exposed was a failure of institutional oversight.',
    patterns: [
      p('Unmarked theme', 'subject/theme + predicate/new information', 'The revised model produced a markedly different result.', 'a familiar participant used as the point of departure', 'We already know the model; the new information is its result.', 'The revised model', 'Do not place unpredictable dense information in the theme without a discourse reason.'),
      p('Marked theme', 'fronted frame + clause', 'In the final dataset, a different pattern emerged.', 'a setting selected as the interpretive frame', 'A different pattern emerged in the final dataset.', 'In the final dataset', 'Do not front a frame that does not connect to the preceding discourse.'),
      p('End focus', 'given frame + identifying clause + new focus', 'What the inquiry ultimately exposed was a failure of institutional oversight.', 'the key new conclusion reserved for final position', 'The inquiry exposed institutional failure.', 'a failure of institutional oversight', 'Do not bury the intended focus inside a long chain of postmodifiers.'),
    ],
  },
  {
    slug: 'rhetorical-inversion-c2', order: '06', category: 'Information architecture', shortTitle: 'Rhetorical and literary inversion',
    description: 'Use locative, comparative and complement inversion to shape rhythm, scene and rhetorical contrast beyond ordinary negative inversion.', purpose: 'create a motivated marked order that controls scene, cadence or evaluative emphasis', register: 'literary narrative, ceremonial speech and highly crafted prose', formula: 'fronted location/complement + verb + subject | comparative auxiliary inversion', model: 'Across the valley came the sound of distant bells.',
    patterns: [
      p('Locative inversion', 'place phrase + lexical verb + noun subject', 'Across the valley came the sound of distant bells.', 'a scene presented before the arriving participant', 'The sound of bells came across the valley.', 'came the sound', 'Do not normally invert a pronoun subject after a locative opener.'),
      p('Complement inversion', 'subject complement + linking verb + subject', 'Most striking was the absence of any public response.', 'an evaluation foregrounded before the entity it describes', 'The absence of response was most striking.', 'Most striking was', 'Do not use complement inversion when the fronted evaluation lacks a clear subject link.'),
      p('Comparative inversion', 'as/than + auxiliary + subject', 'The northern sample varied more widely than did the southern sample.', 'a formal balanced comparison with a heavy subject', 'The northern sample varied more widely than the southern sample did.', 'than did the southern sample', 'Do not use comparative inversion when it makes a simple comparison unnecessarily stiff.'),
    ],
  },
  {
    slug: 'dislocation-headers-tails-c2', order: '07', category: 'Information architecture', shortTitle: 'Dislocation, headers and tails',
    description: 'Use left and right dislocation to establish, recover or evaluate referents while maintaining a resumptive element inside the clause.', purpose: 'manage real-time topic accessibility and interpersonal stance in advanced spoken discourse', register: 'conversation, interviews, oral storytelling and stylised dialogue', formula: 'dislocated phrase + resumptive clause | complete clause + clarifying tail', model: 'That proposal from the regional team, I cannot see it succeeding.',
    patterns: [
      p('Left dislocation', 'topic phrase + clause with resumptive pronoun', 'That proposal from the regional team, I cannot see it succeeding.', 'a complex referent established before the clause', 'I cannot see the regional proposal succeeding.', 'I cannot see it succeeding', 'Do not omit the resumptive element when the phrase stands outside the clause.'),
      p('Right dislocation', 'complete clause + tail phrase', 'It has become remarkably influential, that early working paper.', 'a referent clarified or highlighted after a complete clause', 'That early paper has become influential.', 'that early working paper', 'Do not mistake a right-dislocated tail for a restrictive modifier.'),
      p('Affective header', 'evaluative phrase + resumptive clause', 'The sheer scale of it, that is what surprised me.', 'an emotionally weighted topic introduced before identification', 'What surprised me was its sheer scale.', 'that is what surprised me', 'Avoid dislocation in formal prose unless reproducing speech or creating a deliberate voice.'),
    ],
  },
  {
    slug: 'existential-presentational-structures-c2', order: '08', category: 'Information architecture', shortTitle: 'Existential and presentational structures',
    description: 'Use there-constructions and presentational clauses to introduce entities, events and discourse developments with controlled agreement and focus.', purpose: 'delay a new or heavy notional subject until the reader has a presentational frame', register: 'formal description, narrative, academic exposition and announcements', formula: 'there + be/seem/arise/remain + notional subject', model: 'There remains a substantial gap between policy and practice.',
    patterns: [
      p('Existential state', 'there + be/remain + noun phrase', 'There remains a substantial gap between policy and practice.', 'a new entity introduced as existing or persisting', 'A substantial gap still exists.', 'There remains', 'Match agreement carefully when the notional subject is complex or coordinated.'),
      p('Emergent event', 'there + arise/emerge/follow + noun phrase', 'There then emerged a second, less predictable pattern.', 'a development introduced as new to the discourse', 'A second pattern then emerged.', 'There then emerged', 'Do not use presentational there with verbs that do not license the construction.'),
      p('Complex existential', 'there + appear/seem + to be + noun phrase', 'There appears to be little support for the stronger claim.', 'a cautiously inferred state introduced in end focus', 'Little support appears to exist.', 'There appears to be', 'Do not treat there as a referential location pronoun in this construction.'),
    ],
  },
  {
    slug: 'advanced-clefts-pseudoclefts-c2', order: '09', category: 'Information architecture', shortTitle: 'Advanced clefts and pseudo-clefts',
    description: 'Manipulate it-clefts, reversed pseudo-clefts and all-clefts to contrast assumptions and create precise focus structures.', purpose: 'identify exactly which constituent corrects, narrows or completes a proposition', register: 'argument, explanation, rhetoric and carefully managed conversation', formula: 'it + be + focus + relative clause | wh-clause + be + focus | focus + be + wh-clause', model: 'What the data cannot establish is why the effect occurred.',
    patterns: [
      p('Contrastive it-cleft', 'it + be + focus + who/that clause', 'It was the timing, not the method, that caused concern.', 'a constituent contrasted against an alternative assumption', 'The timing caused concern, not the method.', 'It was the timing', 'Do not use a cleft when no genuine contrast or correction exists.'),
      p('Pseudo-cleft', 'wh-clause + be + focus', 'What the data cannot establish is why the effect occurred.', 'a gap or issue introduced before its focused completion', 'The data cannot establish the cause of the effect.', 'What the data cannot establish', 'Keep number agreement natural when the wh-clause and focus differ in form.'),
      p('Reversed pseudo-cleft', 'focus + be + wh-clause', 'A complete reassessment is what the situation now requires.', 'the focused answer presented before the identifying clause', 'The situation now requires a complete reassessment.', 'A complete reassessment is what', 'Do not reverse a pseudo-cleft if the resulting theme disrupts discourse flow.'),
    ],
  },
  {
    slug: 'extraposition-postponement-c2', order: '10', category: 'Information architecture', shortTitle: 'Extraposition and postponement',
    description: 'Postpone heavy clauses and modifiers while controlling anticipatory subjects, end weight and attachment.', purpose: 'balance processing load and preserve a clear relationship between postponed material and its grammatical host', register: 'complex academic, legal and professional prose', formula: 'anticipatory it/there + predicate + postponed clause', model: 'It became clear only later that several files had been altered.',
    patterns: [
      p('Subject-clause extraposition', 'it + predicate + that/to-clause', 'It became clear only later that several files had been altered.', 'a heavy subject proposition postponed to end position', 'That files had been altered became clear only later.', 'It became clear', 'Do not leave the anticipatory it without a recoverable postponed clause.'),
      p('Object extraposition', 'verb + it + evaluation + clause', 'We consider it unlikely that the pattern arose by chance.', 'an object proposition postponed after an object complement', 'We consider a chance origin unlikely.', 'consider it unlikely', 'Do not treat it as a concrete object in this anticipatory pattern.'),
      p('Modifier postponement', 'head + predicate + long postmodifier', 'A decision was announced yesterday that surprised even senior advisers.', 'a heavy modifier postponed to protect clause balance', 'A decision that surprised advisers was announced yesterday.', 'that surprised even senior advisers', 'Use postponed modification only when attachment remains unmistakable.'),
    ],
  },
  {
    slug: 'complex-embedding-c2', order: '11', category: 'Embedding and complementation', shortTitle: 'Complex embedding',
    description: 'Build and unpack multiple levels of complement, relative and adverbial embedding without losing clause boundaries or attribution.', purpose: 'represent layered propositions while keeping each source, stance and logical relation identifiable', register: 'research, law, policy analysis and complex narrative', formula: 'matrix clause + embedded complement + embedded modifier', model: 'The review concluded that the safeguards the agency had introduced were insufficient.',
    patterns: [
      p('Complement plus relative', 'matrix verb + that + noun + relative clause + predicate', 'The review concluded that the safeguards the agency had introduced were insufficient.', 'a reported conclusion containing a modified embedded subject', 'The agency introduced safeguards; the review found them insufficient.', 'that the safeguards', 'Do not let a long relative clause obscure the verb of the embedded complement.'),
      p('Nested attribution', 'source + report + second source + proposition', 'The paper notes that several witnesses claim that the warning was ignored.', 'two distinct layers of reporting responsibility', 'The paper reports witness claims about an ignored warning.', 'witnesses claim that', 'Do not blur which source is responsible for each proposition.'),
      p('Embedded interrogative', 'matrix stance + whether/wh + embedded clause', 'It remains unclear whether the changes the panel proposed can be implemented.', 'an unresolved question containing its own modification', 'Implementation of the proposed changes remains uncertain.', 'whether the changes', 'Do not use direct-question inversion inside the embedded interrogative.'),
    ],
  },
  {
    slug: 'stance-complement-clauses-c2', order: '12', category: 'Embedding and complementation', shortTitle: 'Stance complement clauses',
    description: 'Choose that-clauses, wh-clauses, to-infinitives and anticipatory patterns to encode evaluation, evidence and responsibility.', purpose: 'make the source and strength of a stance explicit through complementation choice', register: 'advanced academic, institutional and analytical writing', formula: 'stance noun/adjective/verb + licensed complement clause', model: 'The possibility that the estimate is biased cannot be dismissed.',
    patterns: [
      p('Noun complement', 'stance noun + that-clause', 'The possibility that the estimate is biased cannot be dismissed.', 'a proposition packaged as the content of an abstract noun', 'It is possible that the estimate is biased.', 'possibility that', 'Do not confuse a noun complement with a relative clause describing the noun.'),
      p('Adjective complement', 'adjective + that/to-clause', 'We are reluctant to conclude that the difference is meaningful.', 'the writer’s disposition toward making a conclusion', 'We do not readily conclude that the difference matters.', 'reluctant to conclude', 'Do not let the complement imply a stronger commitment than the stance adjective.'),
      p('Verb complement', 'stance verb + wh/that-clause', 'The analysis demonstrates why the earlier model failed.', 'evidence presented as supporting an embedded explanation', 'The analysis explains the failure of the earlier model.', 'demonstrates why', 'Choose a reporting verb whose evidential strength the data can support.'),
    ],
  },
  {
    slug: 'deontic-epistemic-interplay-c2', order: '13', category: 'Embedding and complementation', shortTitle: 'Deontic and epistemic modality',
    description: 'Distinguish obligation, permission and prediction from inference, and resolve modal ambiguity through context and paraphrase.', purpose: 'show whether a modal concerns how the world is known or how people are required to act', register: 'policy, legal reasoning, analysis and nuanced conversation', formula: 'modal + proposition interpreted through source, time and agency', model: 'The documents must remain confidential, and they must already be in the archive.',
    patterns: [
      p('Deontic necessity', 'must + controllable action', 'The documents must remain confidential.', 'an obligation governing behaviour or state', 'The rules require confidentiality.', 'must remain confidential', 'Do not read every must as a logical deduction.'),
      p('Epistemic necessity', 'must + state/perfect inference', 'The documents must already be in the archive.', 'a strong conclusion based on evidence', 'The evidence strongly indicates the documents are archived.', 'must already be', 'Do not paraphrase epistemic must as an imposed rule.'),
      p('Dynamic potential', 'can + subject capacity/characteristic', 'A minor configuration error can cause a complete shutdown.', 'a general potential arising from circumstances or properties', 'Such an error is capable of causing shutdown.', 'can cause', 'Do not confuse general dynamic possibility with permission.'),
    ],
  },
  {
    slug: 'counterfactual-remoteness-c2', order: '14', category: 'Counterfactuality and viewpoint', shortTitle: 'Counterfactual remoteness',
    description: 'Manipulate modal remoteness to present alternatives as open, unlikely, impossible or rhetorically suspended.', purpose: 'calibrate psychological and logical distance rather than merely selecting a conditional tense', register: 'argument, negotiation, narrative and philosophical discussion', formula: 'remote past form + modal result + contextual distance', model: 'If the assumption were valid, the conclusion would follow; the evidence suggests otherwise.',
    patterns: [
      p('Open remote hypothesis', 'if + remote past, would + base', 'If the assumption were valid, the conclusion would follow.', 'a logically considered but doubtful present hypothesis', 'The conclusion depends on an assumption that is probably invalid.', 'were valid', 'Do not equate remote form automatically with impossible reality.'),
      p('Past counterfactual', 'if + past perfect, modal perfect', 'If the warning had been acted on, the failure might have been prevented.', 'an unreal past alternative with an uncertain imagined result', 'The warning was not acted on; prevention was possible.', 'had been acted on', 'Match the modal result to the intended certainty of the imagined outcome.'),
      p('Counterfactual blend', 'past counterfactual cause + present remote result', 'Had the merger proceeded, the market would look very different today.', 'a past unreal cause linked to a present consequence', 'The merger did not proceed, so today’s market is different.', 'would look very different today', 'Do not force cause and result into the same time frame.'),
    ],
  },
  {
    slug: 'irrealis-without-if-c2', order: '15', category: 'Counterfactuality and viewpoint', shortTitle: 'Irrealis without if',
    description: 'Express unreal conditions through inversion, implied protases, but for, otherwise and counterfactual comparison.', purpose: 'build counterfactual meaning when the condition is distributed across the discourse rather than introduced by if', register: 'formal prose, argument, narrative and concise commentary', formula: 'but for/otherwise/as if/inversion + counterfactual result', model: 'But for the final inspection, the defect would have gone unnoticed.',
    patterns: [
      p('But-for condition', 'but for + noun, modal result', 'But for the final inspection, the defect would have gone unnoticed.', 'the factor that prevented an unreal result', 'If there had been no final inspection, the defect would have been missed.', 'But for the final inspection', 'Do not follow but for directly with a finite clause.'),
      p('Otherwise condition', 'statement; otherwise + modal result', 'The alarm was reset; otherwise, the building would have been evacuated.', 'an implied negative condition recovered from the previous clause', 'If the alarm had not been reset, evacuation would have followed.', 'otherwise', 'Ensure the antecedent of otherwise is explicit enough to reconstruct.'),
      p('Counterfactual comparison', 'as if/as though + remote form', 'He described the proposal as though it had already been approved.', 'a comparison presented as contrary to fact or doubtful', 'He spoke in a way that falsely implied prior approval.', 'as though it had already been approved', 'Use tense to signal remoteness; do not assume as if always marks unreality.'),
    ],
  },
  {
    slug: 'viewpoint-shifts-free-indirect-style-c2', order: '16', category: 'Counterfactuality and viewpoint', shortTitle: 'Viewpoint shifts and free indirect style',
    description: 'Shift temporal and deictic perspective to blend narrator and character viewpoints while preserving interpretive cues.', purpose: 'control whose consciousness or evaluative position shapes a passage without constant reporting frames', register: 'literary narrative, biography and sophisticated reflective prose', formula: 'narrative past + character deixis/evaluation without reporting clause', model: 'Tomorrow, she would finally confront them. Why had she waited so long?',
    patterns: [
      p('Free indirect future', 'past narrative + would + character time adverbial', 'Tomorrow, she would finally confront them.', 'a future seen from a character’s past viewpoint', 'She thought that she would confront them the next day.', 'Tomorrow, she would', 'Do not use present-speaker deixis unless the viewpoint shift is deliberate.'),
      p('Embedded exclamation', 'narrative past + unframed character evaluation', 'What a disastrous decision that had been!', 'a character’s evaluation blended into narration', 'She realised that the decision had been disastrous.', 'What a disastrous decision', 'Provide enough context to distinguish character voice from narrator fact.'),
      p('Unframed question', 'question form inside narrative viewpoint', 'Why had she waited so long?', 'a character’s thought rendered without a reporting clause', 'She wondered why she had waited so long.', 'Why had she waited', 'Do not switch viewpoint repeatedly without lexical or contextual cues.'),
    ],
  },
  {
    slug: 'sequence-tenses-backshift-c2', order: '17', category: 'Counterfactuality and viewpoint', shortTitle: 'Sequence of tenses and selective backshift',
    description: 'Choose whether to backshift based on temporal viewpoint, current validity and rhetorical responsibility rather than applying a mechanical rule.', purpose: 'preserve the intended relationship between original utterance, report time and current truth status', register: 'research reporting, journalism, testimony and complex narrative', formula: 'reporting time + proposition time + current-validity decision', model: 'The report stated that the river is highly vulnerable to flooding.',
    patterns: [
      p('Backshifted report', 'past reporting verb + past/perfect embedded tense', 'The witness said that she had left before midnight.', 'an earlier embedded event viewed from a past report point', 'The witness said, “I left before midnight.”', 'had left', 'Do not backshift beyond what the event sequence requires.'),
      p('Current-validity retention', 'past reporting verb + present tense', 'The report stated that the river is highly vulnerable to flooding.', 'a proposition presented as still valid now', 'The report made a claim that remains current.', 'river is highly vulnerable', 'Do not retain the present merely because the source used it if current validity is disputed.'),
      p('Deliberate distancing', 'backshift to mark reduced commitment', 'The spokesperson claimed that the system was entirely secure.', 'a reported claim from which the writer maintains distance', 'The spokesperson said the system is secure, but the writer does not endorse it.', 'claimed that the system was', 'Do not imply falsity solely through backshift without supporting context.'),
    ],
  },
  {
    slug: 'advanced-passive-agency-c2', order: '18', category: 'Agency and nominal style', shortTitle: 'Advanced passive and agency',
    description: 'Use passive, middle and impersonal patterns to foreground affected entities while making deliberate choices about agent visibility.', purpose: 'control responsibility, process focus and institutional distance without obscuring necessary accountability', register: 'legal, scientific, bureaucratic and critical analytical writing', formula: 'receiver/process + passive or middle + optional accountable agent', model: 'The records were deleted after authorisation was withdrawn.',
    patterns: [
      p('Agentless passive', 'receiver + be + participle', 'The records were deleted after authorisation was withdrawn.', 'the process or affected entity foregrounded while the agent is unknown or irrelevant', 'Someone deleted the records after withdrawing authorisation.', 'were deleted', 'Do not suppress the agent when accountability is central to the claim.'),
      p('Get-passive', 'subject + get + participle', 'Several files got corrupted during the transfer.', 'an event affecting the subject, often unexpected or adverse', 'The transfer corrupted several files.', 'got corrupted', 'Avoid get-passives where a neutral formal process description is required.'),
      p('Middle construction', 'entity + active verb + manner', 'The new material cuts cleanly and stores well.', 'a property of an entity expressed without an overt agent', 'People can cut and store the material easily.', 'cuts cleanly', 'Do not treat a middle construction as an ordinary active event with a hidden specific agent.'),
    ],
  },
  {
    slug: 'nominal-packaging-c2', order: '19', category: 'Agency and nominal style', shortTitle: 'Nominal packaging and grammatical metaphor',
    description: 'Recast processes and qualities as noun groups to build abstraction while monitoring agency, time and logical transparency.', purpose: 'compress complex relations into discourse objects that can be classified, compared and referred to', register: 'advanced academic, policy and technical writing', formula: 'clause process + participants -> nominal group + complements', model: 'The committee’s rejection of the proposal prompted a reassessment.',
    patterns: [
      p('Process nominalisation', 'possessive/of-agent + action noun + of-object', 'The committee’s rejection of the proposal prompted a reassessment.', 'an event packaged as a noun while both participants remain visible', 'The committee rejected the proposal, so the team reassessed it.', 'rejection of the proposal', 'Do not hide the responsible participant when it is analytically important.'),
      p('Quality nominalisation', 'abstract quality noun + complement', 'The instability of the estimate limits its usefulness.', 'a quality treated as an object of evaluation', 'Because the estimate is unstable, it is less useful.', 'instability of the estimate', 'Avoid abstract noun chains that make the logical relationship hard to recover.'),
      p('Condensed relation', 'nominal groups linked by preposition', 'A reduction in staffing led to an increase in processing time.', 'two processes packaged as comparable entities', 'Staffing fell, so processing took longer.', 'reduction in staffing', 'Check that nominal compression has not removed time or causal direction.'),
    ],
  },
  {
    slug: 'apposition-parenthesis-c2', order: '20', category: 'Agency and nominal style', shortTitle: 'Apposition and parenthesis',
    description: 'Use appositive and parenthetical structures to rename, evaluate or qualify information at different levels of integration.', purpose: 'layer commentary around a proposition without confusing what is asserted, identified or merely added', register: 'literary, academic, journalistic and essayistic prose', formula: 'host clause + integrated/supplementary parenthetical unit', model: 'The proposal—an ambitious but fragile compromise—survived the vote.',
    patterns: [
      p('Evaluative apposition', 'noun—appositive phrase—predicate', 'The proposal—an ambitious but fragile compromise—survived the vote.', 'an inserted evaluation that renames the noun', 'The fragile but ambitious proposal survived.', 'an ambitious but fragile compromise', 'Match the appositive referent clearly to the noun it renames.'),
      p('Sentence adverbial parenthesis', 'clause, parenthetical stance, clause', 'The result, it should be noted, was not independently replicated.', 'a comment on how the proposition should be interpreted', 'Importantly, the result lacked independent replication.', 'it should be noted', 'Do not let a parenthetical interrupt a dependency the reader must hold over too much text.'),
      p('Non-restrictive supplement', 'host + supplementary phrase/clause', 'The chair, visibly frustrated by the delay, ended the meeting.', 'additional descriptive information outside the identifying core', 'The frustrated chair ended the meeting.', 'visibly frustrated by the delay', 'Use punctuation to distinguish supplementary from restrictive meaning.'),
    ],
  },
  {
    slug: 'anaphora-cataphora-c2', order: '21', category: 'Reference and cohesion', shortTitle: 'Anaphora and cataphora',
    description: 'Build reference chains that point backward or forward across clauses while preventing competition between possible antecedents.', purpose: 'maintain continuity and suspense with references that remain immediately interpretable', register: 'all extended discourse, especially literary and analytical prose', formula: 'referential item <-> explicit antecedent or postponed referent', model: 'Although it was controversial, the decision passed by a wide margin.',
    patterns: [
      p('Anaphoric reference', 'referential item after antecedent', 'The proposal divided the panel. It nevertheless passed.', 'a later item referring back to an established entity', 'The proposal divided the panel but still passed.', 'It nevertheless passed', 'Do not use a pronoun when two equally plausible antecedents compete.'),
      p('Cataphoric reference', 'referential item before postponed referent', 'Although it was controversial, the decision passed by a wide margin.', 'a reference whose full noun phrase appears later', 'The controversial decision passed by a wide margin.', 'it was controversial', 'Use cataphora only when the postponed referent arrives quickly and clearly.'),
      p('Demonstrative summary', 'this/that + summary noun', 'The evidence was withheld for weeks. This delay compromised the inquiry.', 'a preceding event recategorised as a discourse object', 'Withholding the evidence delayed and damaged the inquiry.', 'This delay', 'Choose a summary noun that accurately characterises the preceding proposition.'),
    ],
  },
  {
    slug: 'given-new-cohesion-c2', order: '22', category: 'Reference and cohesion', shortTitle: 'Given-new cohesion',
    description: 'Sequence lexical repetition, reference, substitution and thematic progression so each sentence grows from accessible information.', purpose: 'create coherent paragraph movement without monotonous repetition or abrupt topic shifts', register: 'advanced exposition, argument and long-form professional writing', formula: 'given anchor -> new contribution -> next given anchor', model: 'The review identified a funding gap. This gap, in turn, affected staffing.',
    patterns: [
      p('Constant theme', 'same theme + changing rheme', 'The programme expanded rapidly. It also attracted new partners.', 'one established topic developed through successive comments', 'The programme is the continuing topic across both sentences.', 'It also attracted', 'Do not rely on pronouns after the topic has ceased to be salient.'),
      p('Linear progression', 'new information becomes next theme', 'The review identified a funding gap. This gap, in turn, affected staffing.', 'a new element recycled as the next sentence’s anchor', 'The funding gap discovered by the review then affected staffing.', 'This gap', 'Do not change the label in a way that distorts the preceding information.'),
      p('Derived themes', 'related subtopics from a shared superordinate topic', 'The reform had two consequences. Costs fell, while access widened.', 'several subthemes organised under one established frame', 'Cost and access are presented as consequences of the reform.', 'Costs fell', 'Make the shared frame explicit before introducing several derived themes.'),
    ],
  },
  {
    slug: 'parallelism-balanced-structures-c2', order: '23', category: 'Reference and cohesion', shortTitle: 'Parallelism and balanced structures',
    description: 'Coordinate equivalent grammatical forms to create clarity, rhythm and rhetorical balance across complex lists and contrasts.', purpose: 'make relationships visible through repeated structure while avoiding false equivalence', register: 'speeches, essays, policy, legal drafting and persuasive prose', formula: 'matched clause/phrase form + matched function', model: 'The policy aims to reduce waste, improve access and strengthen accountability.',
    patterns: [
      p('Series parallelism', 'to/base forms or gerunds matched across list', 'The policy aims to reduce waste, improve access and strengthen accountability.', 'three coordinated goals with identical grammatical status', 'The policy has three goals: less waste, wider access and stronger accountability.', 'reduce waste, improve access', 'Do not mix infinitives, gerunds and finite clauses at the same list level without purpose.'),
      p('Correlative balance', 'not only X but also Y with matched forms', 'The reform not only reduced costs but also improved response times.', 'two outcomes presented with equal grammatical weight', 'The reform reduced costs and improved response times.', 'not only reduced costs', 'Place not only immediately before the element contrasted with but also.'),
      p('Antithetical balance', 'matched clauses with contrasting lexis', 'We need evidence, not reassurance; accountability, not excuses.', 'a contrast sharpened by repeated grammatical shape', 'Evidence and accountability matter more than reassurance and excuses.', 'evidence, not reassurance', 'Do not force parallel form onto ideas that are not logically comparable.'),
    ],
  },
  {
    slug: 'syntactic-ambiguity-control-c2', order: '24', category: 'Reference and cohesion', shortTitle: 'Syntactic ambiguity and control',
    description: 'Diagnose attachment, scope and control ambiguities and revise clause architecture so only the intended interpretation remains available.', purpose: 'prevent advanced compression from creating competing readings about agency, modification or logical scope', register: 'legal, technical, academic and high-stakes professional writing', formula: 'identify competing parses -> expose intended relation -> rewrite', model: 'After reviewing the file, the analyst—not the conclusion—appeared uncertain.',
    patterns: [
      p('Attachment repair', 'move modifier beside its host', 'The analyst reviewed the report with the revised appendix.', 'the appendix clearly attached to the report rather than the reviewing method', 'The analyst used the report that contained the revised appendix.', 'report with the revised appendix', 'Do not leave a final modifier equally able to attach to two constituents.'),
      p('Scope repair', 'repeat or reposition operator', 'The policy does not require all applicants to attend.', 'negation scoped over universal obligation rather than over attendance itself', 'Not every applicant is required to attend.', 'does not require all applicants', 'Test whether not all and all not express the same intended claim.'),
      p('Control repair', 'name the understood subject', 'After reviewing the file, the analyst appeared uncertain.', 'the analyst clearly understood as reviewer', 'The analyst reviewed the file and appeared uncertain.', 'the analyst appeared uncertain', 'Do not attach a non-finite clause to a main subject that cannot perform its action.'),
    ],
  },
  {
    slug: 'advanced-coordination-c2', order: '25', category: 'Clause relations', shortTitle: 'Advanced coordination',
    description: 'Coordinate clauses and phrases with shared material, correlative patterns and deliberate asymmetry while preserving scope and parallel status.', purpose: 'link units of equal discourse status without obscuring which elements are shared or contrasted', register: 'formal argument, literary prose and complex professional writing', formula: 'coordinate 1 + coordinator + coordinate 2 with controlled sharing', model: 'The measure is politically attractive but economically difficult to defend.',
    patterns: [
      p('Shared complement', 'verb/adjective shared across coordinates', 'The measure is politically attractive but economically difficult to defend.', 'two evaluations sharing one subject and linking verb', 'The measure is attractive politically but difficult economically.', 'politically attractive but economically difficult', 'Do not coordinate constituents that do not occupy comparable grammatical roles.'),
      p('Gapping', 'first clause full; second clause with shared verb omitted', 'The northern region gained three seats; the southern region, only one.', 'parallel contrast with a recoverable omitted predicate', 'The north gained three seats and the south gained one.', 'the southern region, only one', 'Use punctuation and strict parallelism to make the gap recoverable.'),
      p('Correlative scope', 'either X or Y / neither X nor Y', 'The evidence supports neither the original claim nor its later revision.', 'two alternatives placed under one negative scope', 'The evidence supports neither version.', 'neither the original claim nor', 'Keep both correlative coordinates grammatically parallel.'),
    ],
  },
  {
    slug: 'advanced-subordination-c2', order: '26', category: 'Clause relations', shortTitle: 'Advanced subordination',
    description: 'Build layered temporal, causal, conditional and concessive relations while making hierarchy and scope explicit.', purpose: 'show which proposition frames, limits, causes or concedes another across multi-clause sentences', register: 'complex argument, policy, law and analytical narrative', formula: 'matrix clause + hierarchically attached subordinate clauses', model: 'Although the measure worked initially, it was withdrawn because costs rose once demand recovered.',
    patterns: [
      p('Layered concession and cause', 'although-clause + matrix + because-clause', 'Although the measure worked initially, it was withdrawn because costs rose.', 'a conceded fact separated from the cause of the main outcome', 'The measure worked, but rising costs caused its withdrawal.', 'Although the measure worked', 'Do not leave the reader unsure which clause a because-clause explains.'),
      p('Nested time condition', 'matrix + when/once + clause containing condition', 'The reserve will activate once demand exceeds capacity for two consecutive days.', 'a trigger defined by a subordinate threshold condition', 'Activation depends on sustained excess demand.', 'once demand exceeds capacity', 'Do not use a future tense inside an ordinary future time clause.'),
      p('Purpose with constraint', 'matrix + so that + clause + without + -ing', 'The data were aggregated so that trends could be compared without exposing individuals.', 'a goal and a limiting safeguard integrated hierarchically', 'Aggregation enabled comparison and protected identities.', 'so that trends could be compared', 'Keep the understood subject of the without-clause clear.'),
    ],
  },
  {
    slug: 'concessive-conditionals-c2', order: '27', category: 'Clause relations', shortTitle: 'Concessive conditionals',
    description: 'Use even if, whether, no matter and wh-ever forms to combine hypothetical range with a result that remains unchanged.', purpose: 'assert that a conclusion survives every relevant condition or degree', register: 'argument, policy, negotiation and emphatic generalisation', formula: 'concessive conditional range + invariant result', model: 'Whatever the final cost may be, the safety work must continue.',
    patterns: [
      p('Unchanged hypothetical result', 'even if + clause, result', 'The review will continue even if the complaint is withdrawn.', 'a result maintained under a possible contrary condition', 'Withdrawal would not stop the review.', 'even if the complaint is withdrawn', 'Do not use even though when the condition is not known to be factual.'),
      p('Free-choice concession', 'whatever/whoever/however + clause', 'Whatever the final cost may be, the safety work must continue.', 'an invariant result across an unrestricted range', 'Every possible cost leads to the same requirement.', 'Whatever the final cost may be', 'Do not add a separate antecedent before a fused free-choice relative.'),
      p('Alternative concession', 'whether X or Y, result', 'Whether approved now or next month, the reform will face opposition.', 'the same result across two alternatives', 'Timing will not remove opposition.', 'Whether approved now or next month', 'Keep the two alternatives structurally parallel.'),
    ],
  },
  {
    slug: 'comparative-clauses-scaling-c2', order: '28', category: 'Clause relations', shortTitle: 'Comparative clauses and scaling',
    description: 'Use elliptical comparative clauses, scalar correlatives and proportional expressions while controlling the comparison standard.', purpose: 'represent fine-grained differences and linked change without ambiguous or illogical comparison', register: 'research, data commentary, criticism and sophisticated description', formula: 'comparative + than/as-clause | the more X, the more Y', model: 'The effect was less pronounced than the preliminary model had predicted.',
    patterns: [
      p('Clausal standard', 'comparative + than + finite clause', 'The effect was less pronounced than the preliminary model had predicted.', 'a degree measured against a full predicted proposition', 'The model predicted a stronger effect.', 'than the preliminary model had predicted', 'Ensure the compared dimensions are logically equivalent.'),
      p('Elliptical comparison', 'as/than + reduced recoverable clause', 'The intervention was more effective in rural areas than in urban ones.', 'a repeated predicate omitted from the comparison standard', 'Effectiveness was higher in rural than urban areas.', 'than in urban ones', 'Do not omit material if the remaining phrase can attach in two ways.'),
      p('Scalar correlation', 'the more/less X, the more/less Y', 'The more precisely the question is framed, the less ambiguous the answer becomes.', 'two degrees that vary together', 'Precision reduces ambiguity proportionally.', 'The more precisely', 'Do not use ordinary article meaning for the in this correlative pattern.'),
    ],
  },
  {
    slug: 'genre-sensitive-grammar-c2', order: '29', category: 'Register and editorial control', shortTitle: 'Genre-sensitive grammar',
    description: 'Adapt clause type, agency, density and stance to the communicative conventions of reports, essays, instructions and conversation.', purpose: 'choose grammar that fulfils a genre’s social purpose rather than merely sounding formal', register: 'cross-genre editing at proficient level', formula: 'stable proposition + genre purpose -> grammar and information design', model: 'Please restart the unit. / The unit should be restarted before further testing.',
    patterns: [
      p('Instructional grammar', 'imperative/clear modal + ordered action', 'Restart the unit before running the diagnostic again.', 'direct action sequence with an explicit actor implied', 'The user should restart the unit before testing.', 'Restart the unit', 'Do not nominalise simple actions until the procedure becomes harder to follow.'),
      p('Report grammar', 'passive/result-first + explicit evidence', 'The unit was restarted before the diagnostic was repeated.', 'a documented process with the sequence and result foregrounded', 'Technicians restarted the unit and repeated the diagnostic.', 'was restarted', 'Do not suppress the agent if responsibility is part of the report question.'),
      p('Analytical grammar', 'stance + abstract relation + evidence boundary', 'The restart appears to have reduced, rather than eliminated, the fault.', 'a calibrated interpretation of evidence', 'The fault improved after restart but did not disappear.', 'appears to have reduced', 'Do not transform a cautious analytical claim into an unqualified fact.'),
    ],
  },
  {
    slug: 'punctuation-grammar-discourse-c2', order: '30', category: 'Register and editorial control', shortTitle: 'Punctuation, grammar and discourse',
    description: 'Use colons, semicolons, dashes and commas to signal clause status, apposition, coordination and rhetorical interruption.', purpose: 'make syntactic and discourse relationships visible rather than treating punctuation as decoration', register: 'all advanced edited writing, especially academic and professional prose', formula: 'grammatical relation -> punctuation boundary -> interpretive effect', model: 'The inquiry reached one conclusion: the safeguards had failed.',
    patterns: [
      p('Colon expansion', 'complete clause: explanation/list/apposition', 'The inquiry reached one conclusion: the safeguards had failed.', 'a complete proposition followed by its specification', 'The conclusion was that the safeguards had failed.', 'one conclusion:', 'Do not place a colon directly between a verb and its ordinary object.'),
      p('Semicolon relation', 'independent clause; related independent clause', 'The evidence was incomplete; the inquiry therefore remained open.', 'two complete clauses linked more closely than separate sentences', 'Because evidence was incomplete, the inquiry stayed open.', 'incomplete;', 'Do not join a dependent fragment to a main clause with a semicolon.'),
      p('Dash interruption', 'host clause—supplementary interruption—host continuation', 'The final witness—previously considered unreliable—provided the decisive record.', 'a strongly marked supplementary insertion', 'The witness previously judged unreliable provided the record.', '—previously considered unreliable—', 'Use paired dashes consistently and do not let the interruption obscure the host grammar.'),
    ],
  },
]

export const c2CurriculumTopics = specs.map((spec, index) => topic(base(spec, index)))
