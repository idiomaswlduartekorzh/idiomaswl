import { createAdvancedCurriculumTopic as topic, pattern as p, type AdvancedCurriculumSpec } from '../advanced-curriculum-factory.ts'

const base = (value: Omit<AdvancedCurriculumSpec, 'level' | 'color'>, index: number): AdvancedCurriculumSpec => ({ ...value, level: 'C1', color: ['#C8102E', '#4338CA', '#047857', '#A16207', '#0369A1'][index % 5] })

const specs: Array<Omit<AdvancedCurriculumSpec, 'level' | 'color'>> = [
  {
    slug: 'negative-adverbial-inversion-c1', order: '05', category: 'Emphasis and information', shortTitle: 'Negative adverbial inversion',
    description: 'Front negative and restrictive adverbials and invert the auxiliary to create controlled emphasis.', purpose: 'foreground the exceptional, delayed or restricted nature of an event', register: 'formal argument, speeches, journalism and literary narration', formula: 'negative/restrictive opener + auxiliary + subject + main verb', model: 'Rarely have researchers observed such a rapid change.',
    patterns: [
      p('Frequency restriction', 'rarely/seldom/never + auxiliary + subject', 'Rarely have researchers observed such a rapid change.', 'an event presented as highly exceptional', 'Researchers have rarely observed such a rapid change.', 'Rarely have researchers observed', 'Do not keep ordinary subject-verb order after a fronted negative adverbial.'),
      p('Sequence restriction', 'not until/only after + auxiliary + subject', 'Only after the audit did we understand the scale of the loss.', 'understanding delayed until a specific point', 'We understood the scale only after the audit.', 'did we understand', 'Do not invert inside the subordinate time clause.'),
      p('Double emphasis', 'not only + auxiliary + subject + but also', 'Not only did the policy reduce waste, but it also lowered costs.', 'two linked achievements with emphasis on the first', 'The policy reduced waste and lowered costs.', 'Not only did the policy reduce', 'Do not omit the auxiliary after fronted not only.'),
    ],
  },
  {
    slug: 'conditional-inversion-c1', order: '06', category: 'Emphasis and information', shortTitle: 'Inverted conditionals',
    description: 'Replace if with had, were or should inversion in formal hypothetical and conditional clauses.', purpose: 'present conditions compactly and formally while preserving their degree of remoteness', register: 'formal correspondence, policy, academic prose and careful speech', formula: 'had/were/should + subject + complement, result clause', model: 'Had we known earlier, we would have changed course.',
    patterns: [
      p('Past counterfactual', 'had + subject + participle', 'Had we known earlier, we would have changed course.', 'an unreal past condition without if', 'If we had known earlier, we would have changed course.', 'Had we known', 'Do not use did after fronted had.'),
      p('Formal unreal state', 'were + subject + complement', 'Were the evidence stronger, the claim would be persuasive.', 'a remote present condition in formal style', 'If the evidence were stronger, the claim would be persuasive.', 'Were the evidence stronger', 'Do not use was in this formal inverted irrealis pattern.'),
      p('Tentative future', 'should + subject + base verb', 'Should you require assistance, contact the support desk.', 'a possible future condition presented politely or formally', 'If you happen to require assistance, contact support.', 'Should you require', 'Do not add if to an already inverted conditional.'),
    ],
  },
  {
    slug: 'auxiliary-emphasis-fronting-c1', order: '07', category: 'Emphasis and information', shortTitle: 'Auxiliary emphasis and fronting',
    description: 'Use emphatic auxiliaries and selective fronting to correct assumptions, reinforce contrast and control information focus.', purpose: 'mark correction or contrast without changing the underlying time reference', register: 'debate, clarification, persuasive speech and edited prose', formula: 'do/does/did + base | fronted complement + clause', model: 'The first proposal did address the immediate risk.',
    patterns: [
      p('Corrective do', 'do/does/did + base verb', 'The first proposal did address the immediate risk.', 'a correction to an explicit or implied denial', 'The first proposal addressed the risk, contrary to the claim.', 'did address', 'Do not combine emphatic did with a past-tense main verb.'),
      p('Contrastive complement', 'complement + subject + verb', 'Useful the guide may be, but complete it is not.', 'a strong contrast between two evaluated qualities', 'The guide may be useful, but it is not complete.', 'Useful the guide may be', 'Do not front a complement unless the surrounding contrast licenses the marked order.'),
      p('Object topicalisation', 'object + subject + verb', 'This limitation, we cannot ignore.', 'an established topic placed before the comment', 'We cannot ignore this limitation.', 'This limitation', 'Do not add subject-auxiliary inversion after ordinary object fronting.'),
    ],
  },
  {
    slug: 'advanced-probability-modals-c1', order: '08', category: 'Stance and modality', shortTitle: 'Advanced probability and modality',
    description: 'Calibrate probability with may well, would seem, be bound to, be likely to and related modal expressions.', purpose: 'match the strength of a prediction or inference to the quality of evidence', register: 'analysis, forecasting, academic argument and professional advice', formula: 'modal/stance phrase + proposition + evidence boundary', model: 'The revised policy may well reduce short-term demand.',
    patterns: [
      p('Supported possibility', 'may well + base verb', 'The revised policy may well reduce short-term demand.', 'a possibility considered reasonably well supported', 'The policy might reduce demand, and the evidence makes that plausible.', 'may well reduce', 'Do not interpret may well as permission.'),
      p('Distanced inference', 'would seem to + infinitive', 'The discrepancy would seem to result from a coding error.', 'a cautious conclusion presented with analytical distance', 'The evidence suggests a coding error.', 'would seem to result', 'Do not stack would seem with a contradictory certainty marker.'),
      p('Strong expectation', 'be bound to + infinitive', 'A delay of this length is bound to affect costs.', 'an outcome presented as virtually inevitable', 'The delay will almost certainly affect costs.', 'is bound to affect', 'Do not use bound to when substantial uncertainty remains.'),
    ],
  },
  {
    slug: 'evidential-reporting-distance-c1', order: '09', category: 'Stance and modality', shortTitle: 'Evidential distance',
    description: 'Attribute claims with reportedly, according to, appear to and be said to while separating source from certainty.', purpose: 'show whether information is observed, reported or inferred and limit the writer’s commitment', register: 'news, research summaries, investigations and responsible professional writing', formula: 'source marker + proposition | subject + appear/be reported + infinitive', model: 'The device appears to have failed during transport.',
    patterns: [
      p('Observed indication', 'appear/seem + to-infinitive', 'The device appears to have failed during transport.', 'a conclusion based on observable signs rather than direct proof', 'The available signs suggest transport damage.', 'appears to have failed', 'Do not present appears to as confirmed fact.'),
      p('Attributed report', 'subject + be reported/said + to-infinitive', 'The company is reported to be considering a merger.', 'a claim attributed to unnamed or external reporting', 'Reports say the company may consider a merger.', 'is reported to be considering', 'Do not use an unattributed reporting passive to disguise unsupported speculation.'),
      p('Named source', 'according to + source', 'According to the inspection log, the fault began at 03:10.', 'information explicitly assigned to a traceable source', 'The inspection log records a 03:10 start.', 'According to the inspection log', 'Do not use according to me for an ordinary personal opinion.'),
    ],
  },
  {
    slug: 'impersonal-passive-stance-c1', order: '10', category: 'Stance and modality', shortTitle: 'Impersonal passive and stance',
    description: 'Use it-passives and subject-to-infinitive passives to report general beliefs, claims and expectations with controlled distance.', purpose: 'manage attribution and information focus without erasing responsibility', register: 'formal reports, news, academic review and institutional communication', formula: 'it + be + reporting participle + that | subject + be + reporting participle + to-infinitive', model: 'The treatment is believed to reduce recovery time.',
    patterns: [
      p('It-passive', 'it + be + participle + that-clause', 'It is widely believed that the treatment reduces recovery time.', 'a general reported belief with the proposition in focus', 'Many people believe the treatment reduces recovery time.', 'It is widely believed', 'Do not use an impersonal passive when the actual source must remain accountable.'),
      p('Subject raising', 'subject + be + participle + to-infinitive', 'The treatment is believed to reduce recovery time.', 'the reported entity placed in subject position', 'People believe that the treatment reduces recovery time.', 'is believed to reduce', 'Match the infinitive form to the reported time reference.'),
      p('Earlier report', 'subject + be + participle + to have + participle', 'The minister is alleged to have withheld the document.', 'a reported earlier action connected to a current allegation', 'It is alleged that the minister withheld the document.', 'is alleged to have withheld', 'Do not use a simple infinitive when the reported action clearly predates the reporting point.'),
    ],
  },
  {
    slug: 'complex-noun-phrases-c1', order: '11', category: 'Noun phrase architecture', shortTitle: 'Complex noun phrases',
    description: 'Build dense but readable noun phrases with determiners, premodifiers, head nouns and postmodifying phrases or clauses.', purpose: 'package precise information while keeping the head noun and modification hierarchy recoverable', register: 'academic, technical and professional writing', formula: 'determiner + premodifiers + head noun + postmodifier', model: 'The recently revised regional data-protection framework remains controversial.',
    patterns: [
      p('Premodified head', 'adverb + participle/adjective + noun modifiers + head', 'The recently revised regional data-protection framework remains controversial.', 'a compact classification centred on a visible head noun', 'The regional framework on data protection was revised recently.', 'data-protection framework', 'Do not stack modifiers when the reader cannot identify which word each one modifies.'),
      p('Postmodified head', 'head noun + prepositional phrase/relative clause', 'The framework governing cross-border transfers remains controversial.', 'a head noun clarified by information that follows it', 'The framework remains controversial; it governs cross-border transfers.', 'governing cross-border transfers', 'Do not separate the head noun from its essential postmodifier with unnecessary punctuation.'),
      p('Layered phrase', 'determiner + evaluation + class + head + of-phrase', 'A significant long-term reduction in processing time was recorded.', 'evaluation, classification and complement packaged in one phrase', 'Processing time fell significantly over the long term.', 'reduction in processing time', 'Avoid nominal density when a clause would make agency or sequence clearer.'),
    ],
  },
  {
    slug: 'apposition-parenthetical-detail-c1', order: '12', category: 'Noun phrase architecture', shortTitle: 'Apposition and parenthetical detail',
    description: 'Add identifying, renaming or supplementary noun phrases with punctuation that signals their relationship to the head.', purpose: 'define or comment on a referent without creating a separate full clause', register: 'profiles, reports, journalism and explanatory prose', formula: 'noun, appositive noun phrase, clause | defining noun + appositive', model: 'Dr Mensah, the lead investigator, will present the findings.',
    patterns: [
      p('Supplementary apposition', 'noun, appositive noun phrase,', 'Dr Mensah, the lead investigator, will present the findings.', 'extra renaming information about an already identified referent', 'Dr Mensah will present; she is the lead investigator.', 'the lead investigator', 'Do not omit paired commas around supplementary apposition.'),
      p('Defining apposition', 'classifying noun + name/title', 'The economist Amartya Sen reshaped welfare theory.', 'a name that identifies which member of a class is intended', 'Amartya Sen is the economist being identified.', 'The economist Amartya Sen', 'Do not insert commas when the appositive is required for identification.'),
      p('Summative apposition', 'clause: appositive summary', 'The review exposed one central problem: inconsistent supervision.', 'a noun phrase that summarises or labels the preceding claim', 'The central problem was inconsistent supervision.', 'one central problem', 'Do not use a colon when the first part cannot stand as a complete clause.'),
    ],
  },
  {
    slug: 'advanced-participle-clauses-c1', order: '13', category: 'Clause compression', shortTitle: 'Advanced participle clauses',
    description: 'Use perfect, passive and supplementary participle clauses while controlling subject reference and logical relation.', purpose: 'compress sequence, cause, concession or accompanying circumstance without creating a dangling modifier', register: 'formal narrative, reports, academic prose and edited description', formula: 'having + participle | being + participle | past participle + main clause', model: 'Having reviewed the evidence, the panel reopened the case.',
    patterns: [
      p('Perfect participle', 'having + past participle', 'Having reviewed the evidence, the panel reopened the case.', 'an earlier completed action by the subject of the main clause', 'After the panel had reviewed the evidence, it reopened the case.', 'Having reviewed', 'Do not let the understood subject differ from the main-clause subject.'),
      p('Passive participle', 'having been + past participle', 'Having been warned twice, the operator stopped the test.', 'an earlier passive experience that motivates the main action', 'After the operator had been warned twice, the operator stopped.', 'Having been warned', 'Do not omit been from a perfect passive participle clause.'),
      p('Supplementary -ing', 'main clause, verb-ing phrase', 'The storm crossed the coast, damaging several power lines.', 'a result or accompanying event linked to the full clause', 'The storm crossed the coast and damaged power lines.', 'damaging several power lines', 'Do not use the supplementary phrase when its time or causal relation is ambiguous.'),
    ],
  },
  {
    slug: 'reduced-verbless-clauses-c1', order: '14', category: 'Clause compression', shortTitle: 'Reduced and verbless clauses',
    description: 'Use reduced passive, adjective and verbless clauses when the missing subject and verb are recoverable from the main clause.', purpose: 'compress conditional, concessive and temporal relationships without sacrificing clarity', register: 'instructions, formal analysis, notices and concise professional prose', formula: 'when/if/although + adjective/participle | preposition + adjective phrase', model: 'When necessary, additional evidence will be requested.',
    patterns: [
      p('Reduced condition', 'if + adjective/participle', 'If necessary, additional evidence will be requested.', 'a conditional state with omitted subject and be', 'If it is necessary, additional evidence will be requested.', 'If necessary', 'Do not reduce when the omitted subject would not match the main clause or context.'),
      p('Reduced time clause', 'when/while + participle/adjective', 'When viewed from above, the pattern becomes obvious.', 'a temporal or viewpoint frame with recoverable passive meaning', 'When it is viewed from above, the pattern becomes obvious.', 'When viewed from above', 'Do not treat the participle as active when the noun receives the action.'),
      p('Verbless concession', 'although/though + adjective phrase', 'Although difficult to verify, the account remains plausible.', 'a concise concession with omitted subject and be', 'Although the account is difficult to verify, it remains plausible.', 'Although difficult to verify', 'Do not leave the referent of the adjective unclear.'),
    ],
  },
  {
    slug: 'relative-clauses-discourse-c1', order: '15', category: 'Clause compression', shortTitle: 'Relative clauses in discourse',
    description: 'Use sentential which, nominal relatives and complex preposition relatives to connect evaluation and reference across clauses.', purpose: 'comment on a whole proposition or package an unspecified referent as a clause', register: 'analytical writing, narrative commentary and formal explanation', formula: 'clause, which + comment | what/where/how + clause | prep + which/whom', model: 'The deadline was extended, which gave the team time to retest.',
    patterns: [
      p('Sentential relative', 'clause, which + comment', 'The deadline was extended, which gave the team time to retest.', 'a comment on the entire preceding proposition', 'The extension gave the team more time.', 'which gave the team time', 'Do not attach which ambiguously to a nearby noun when it refers to the whole clause.'),
      p('Nominal relative', 'what/where/how + clause', 'What the review revealed was a failure of oversight.', 'an unspecified thing or idea functioning as a noun phrase', 'The review revealed a failure of oversight.', 'What the review revealed', 'Do not add an antecedent before a fused nominal relative with what.'),
      p('Complex preposition relative', 'preposition phrase + which/whom', 'The principles on the basis of which the decision was made remain unclear.', 'a formal relationship expressed by a multiword preposition', 'The decision was based on principles that remain unclear.', 'on the basis of which', 'Do not use that after a fronted complex preposition.'),
    ],
  },
  {
    slug: 'extraposition-anticipatory-it-c1', order: '16', category: 'Clause compression', shortTitle: 'Extraposition and anticipatory it',
    description: 'Move heavy subject clauses to the end and use anticipatory it to create a readable information flow.', purpose: 'delay complex information and place evaluation before the proposition it frames', register: 'academic argument, formal recommendations and analytical reporting', formula: 'it + be + evaluation + to/that-clause | it + verb + that-clause', model: 'It is essential that the records remain accessible.',
    patterns: [
      p('Evaluative extraposition', 'it + be + adjective + that-clause', 'It is essential that the records remain accessible.', 'an evaluation followed by a proposition in end position', 'That the records remain accessible is essential.', 'It is essential that', 'Do not let anticipatory it refer to a concrete noun elsewhere in the sentence.'),
      p('Infinitive extraposition', 'it + be + adjective + to-infinitive', 'It was difficult to reproduce the error consistently.', 'an evaluation of an action placed after the adjective', 'To reproduce the error consistently was difficult.', 'It was difficult to reproduce', 'Do not use a for-subject phrase when the agent is already obvious and unnecessary.'),
      p('Reporting extraposition', 'it + reporting verb + that-clause', 'It appears that the original estimate was too low.', 'a stance marker applied to a following proposition', 'The original estimate appears to have been too low.', 'It appears that', 'Do not confuse anticipatory it with referential it.'),
    ],
  },
  {
    slug: 'advanced-present-forms-c1', order: '17', category: 'Tense and viewpoint', shortTitle: 'Advanced present forms',
    description: 'Use present forms for commentary, narrative immediacy, temporary behaviour, trends and performative acts.', purpose: 'choose a present tense according to discourse viewpoint rather than clock time alone', register: 'narrative, commentary, journalism, instruction and formal interaction', formula: 'present simple/continuous + discourse function', model: 'So I open the message, and it contains the missing attachment.',
    patterns: [
      p('Historic present', 'present simple in past narrative', 'So I open the message, and it contains the missing attachment.', 'past events retold with immediate narrative viewpoint', 'I opened the message and found the attachment.', 'I open the message', 'Do not shift between historic present and past without a clear viewpoint reason.'),
      p('Temporary behaviour', 'be + always/constantly + -ing', 'The new system is constantly generating duplicate alerts.', 'repeated temporary behaviour often evaluated by the speaker', 'The system repeatedly generates unwanted duplicate alerts.', 'is constantly generating', 'Do not assume always plus continuous is a neutral permanent habit.'),
      p('Performative present', 'present simple reporting the act itself', 'I acknowledge receipt of your complaint.', 'an utterance that performs the named formal action', 'By saying this, the writer formally acknowledges receipt.', 'I acknowledge', 'Do not use the continuous for a conventional performative act.'),
    ],
  },
  {
    slug: 'tense-aspect-viewpoint-c1', order: '18', category: 'Tense and viewpoint', shortTitle: 'Tense and aspect viewpoint',
    description: 'Shift between event, process, completion and relevance by combining tense and aspect around a chosen viewpoint.', purpose: 'present the same situation from different temporal perspectives without accidental contradiction', register: 'narrative, analysis, research reporting and retrospective commentary', formula: 'viewpoint time + perfect/non-perfect + progressive/non-progressive', model: 'By the time the review began, the team had been collecting data for months.',
    patterns: [
      p('Event viewpoint', 'simple aspect', 'The committee rejected the proposal in June.', 'a bounded event presented as a whole', 'The rejection is treated as one complete event.', 'rejected the proposal', 'Do not use progressive aspect when completion is the essential claim.'),
      p('Internal viewpoint', 'progressive aspect', 'The committee was considering the proposal when the leak occurred.', 'an event viewed from inside its unfolding process', 'Consideration was in progress at the time of the leak.', 'was considering', 'Do not use the progressive to imply completion.'),
      p('Retrospective viewpoint', 'perfect or perfect progressive', 'The team had been collecting data for months before the review began.', 'duration viewed retrospectively from a later past point', 'Data collection preceded and continued until the review.', 'had been collecting', 'Do not mix the reference point and event time inconsistently.'),
    ],
  },
  {
    slug: 'future-projection-c1', order: '19', category: 'Tense and viewpoint', shortTitle: 'Future projection and scheduling',
    description: 'Combine future perfect continuous, formal scheduling forms and probability expressions to project processes and milestones.', purpose: 'distinguish planned schedule, projected duration and evidence-based expectation', register: 'strategy, forecasting, project management and formal announcements', formula: 'will have been + -ing | be due/set/likely to + infinitive', model: 'By 2030, the programme will have been operating for a decade.',
    patterns: [
      p('Projected duration', 'will have been + -ing', 'By 2030, the programme will have been operating for a decade.', 'duration accumulated up to a future milestone', 'The programme will reach ten years of operation in 2030.', 'will have been operating', 'Do not use the form with a state that resists progressive aspect.'),
      p('Formal schedule', 'be due/set/scheduled to + infinitive', 'The revised standard is due to take effect in January.', 'an officially expected or arranged future event', 'The standard is scheduled for January.', 'is due to take effect', 'Do not confuse be due to meaning scheduled with due to meaning because of.'),
      p('Evidence-based expectation', 'be likely/unlikely to + infinitive', 'Demand is likely to remain stable through the first quarter.', 'a forecast calibrated by current evidence', 'The available evidence supports stable demand.', 'is likely to remain', 'Do not present likely to as certainty.'),
    ],
  },
  {
    slug: 'unreal-past-diplomacy-c1', order: '20', category: 'Tense and viewpoint', shortTitle: 'Unreal past for diplomacy',
    description: 'Use past forms after would rather, it is time, suppose and polite frames to create distance from present reality.', purpose: 'express preference, criticism, suggestion or hypothetical distance with an appropriate interpersonal tone', register: 'negotiation, advice, formal conversation and tactful disagreement', formula: 'would rather + past | it is time + past | suppose + past', model: 'I would rather we discussed the risks before approving the change.',
    patterns: [
      p('Present preference', 'would rather + different subject + past', 'I would rather we discussed the risks before approving the change.', 'a preference about another person’s present or future action', 'My preference is for us to discuss the risks first.', 'would rather we discussed', 'Do not use a present tense after would rather with a different subject in this unreal pattern.'),
      p('Overdue action', 'it is time + subject + past', 'It is time the organisation addressed the underlying cause.', 'a present action presented as overdue', 'The organisation should address the cause now.', 'It is time the organisation addressed', 'Do not interpret the past form as past time here.'),
      p('Hypothetical proposal', 'suppose/supposing + past', 'Suppose the supplier withdrew at short notice: what would we do?', 'a remote present or future scenario opened for discussion', 'Imagine that the supplier withdrew unexpectedly.', 'Suppose the supplier withdrew', 'Do not combine the unreal past with a factual result clause.'),
    ],
  },
  {
    slug: 'subjunctive-formulaic-c1', order: '21', category: 'Verb complementation', shortTitle: 'Subjunctive and formulaic clauses',
    description: 'Use the mandative subjunctive and fixed irrealis forms after recommendations, demands and formal expressions.', purpose: 'state required or recommended action without tense marking inside the subordinate clause', register: 'formal recommendations, policy, legal drafting and institutional English', formula: 'recommend/essential + that + subject + base verb', model: 'The panel recommended that the application be reconsidered.',
    patterns: [
      p('Mandative subjunctive', 'verb + that + subject + base verb', 'The panel recommended that the application be reconsidered.', 'a formal recommendation for an action', 'The panel recommended reconsidering the application.', 'that the application be reconsidered', 'Do not add third-person -s or ordinary past tense to the mandative base form.'),
      p('Adjectival mandate', 'it is essential + that + subject + base verb', 'It is essential that every member remain independent.', 'a requirement framed as essential', 'Every member must remain independent.', 'that every member remain', 'Do not use remains in the formal subjunctive pattern.'),
      p('Fixed irrealis', 'if need be / be that as it may', 'The timetable can be revised, if need be.', 'a conventional formal irrealis expression', 'The timetable can be revised if revision becomes necessary.', 'if need be', 'Do not modernise a fixed formula by adding an ordinary finite verb inside it.'),
    ],
  },
  {
    slug: 'advanced-verb-patterns-c1', order: '22', category: 'Verb complementation', shortTitle: 'Advanced verb complementation',
    description: 'Control complex verb patterns involving objects, infinitives, gerunds, bare infinitives and content clauses.', purpose: 'select the complement licensed by the verb and preserve who performs the embedded action', register: 'formal writing, professional communication and precise narrative', formula: 'matrix verb + licensed complement pattern', model: 'The evidence led investigators to reconsider the timeline.',
    patterns: [
      p('Object to-infinitive', 'verb + object + to-infinitive', 'The evidence led investigators to reconsider the timeline.', 'causation or influence directed at an embedded subject', 'Because of the evidence, investigators reconsidered the timeline.', 'led investigators to reconsider', 'Do not omit the object when it is the understood subject of the infinitive.'),
      p('Gerund complement', 'verb + possessive/object + -ing', 'We appreciated their responding so quickly.', 'an action treated as the object of evaluation', 'We appreciated the fact that they responded quickly.', 'their responding', 'Do not assume every verb accepts both gerund and infinitive without a meaning change.'),
      p('Bare infinitive', 'let/make/have + object + base verb', 'The chair had the secretary circulate the revised agenda.', 'causing or arranging for a person to act', 'The chair arranged for the secretary to circulate the agenda.', 'had the secretary circulate', 'Do not add to after have or make in an active causative pattern.'),
    ],
  },
  {
    slug: 'complex-reporting-verbs-c1', order: '23', category: 'Verb complementation', shortTitle: 'Complex reporting verbs',
    description: 'Report positions with verbs that encode acceptance, denial, accusation, concession and insistence through different complement patterns.', purpose: 'summarise not only what was said but the speaker’s communicative act and stance', register: 'academic synthesis, journalism, minutes and legal or professional reporting', formula: 'reporting verb + that/-ing/object + preposition', model: 'The authors concede that the sample may be too small.',
    patterns: [
      p('Concession', 'concede/acknowledge + that-clause', 'The authors concede that the sample may be too small.', 'acceptance of a limitation within an argument', 'The authors admit the sample may be too small.', 'concede that', 'Do not use a stronger reporting verb than the source justifies.'),
      p('Accusation', 'accuse + object + of + -ing', 'The regulator accused the firm of withholding information.', 'a reported allegation directed at a specific actor', 'The regulator alleged that the firm withheld information.', 'accused the firm of withholding', 'Do not use accuse that; include an object and of.'),
      p('Insistence', 'insist + on + -ing / that-clause', 'The client insisted on receiving a written explanation.', 'a firm demand or maintained position', 'The client firmly demanded a written explanation.', 'insisted on receiving', 'Do not use insist to receiving.'),
    ],
  },
  {
    slug: 'ellipsis-avoiding-repetition-c1', order: '24', category: 'Cohesion and interaction', shortTitle: 'Ellipsis for cohesion',
    description: 'Omit repeated verb phrases and clause material when auxiliaries and discourse context make the missing content recoverable.', purpose: 'create natural economy while preserving a single clear antecedent', register: 'conversation, comparison, coordinated prose and concise responses', formula: 'auxiliary/modal + recoverable gap | coordinated clause ellipsis', model: 'Maya can analyse the data, and Leo can too.',
    patterns: [
      p('Auxiliary ellipsis', 'auxiliary/modal + omitted verb phrase', 'Maya can analyse the data, and Leo can too.', 'a repeated verb phrase recovered after an auxiliary', 'Maya and Leo can both analyse the data.', 'Leo can too', 'Do not omit material if more than one antecedent could fill the gap.'),
      p('Comparative ellipsis', 'than/as + reduced clause', 'The second trial performed better than the first did.', 'a comparison with repeated predicate material omitted', 'The second trial outperformed the first trial.', 'than the first did', 'Do not remove the auxiliary when it is needed to show tense or agreement.'),
      p('Coordinated omission', 'shared element omitted from second coordinate', 'Some participants chose the online option; others, the workshop.', 'a repeated verb omitted in a parallel coordinate', 'Some chose online; others chose the workshop.', 'others, the workshop', 'Use punctuation and parallel structure to keep the omission recoverable.'),
    ],
  },
  {
    slug: 'substitution-so-not-do-so-c1', order: '25', category: 'Cohesion and interaction', shortTitle: 'Substitution with so, not and do so',
    description: 'Replace propositions or verb phrases with so, not, do so and related substitutes instead of repeating full clauses.', purpose: 'maintain cohesion while signalling exactly what kind of constituent is being replaced', register: 'conversation, formal procedure and concise analytical prose', formula: 'think/hope/suppose + so/not | do so = substitute verb phrase', model: 'Will the policy work? I hope so, but the evidence does not prove it will.',
    patterns: [
      p('Positive proposition', 'think/hope/suppose + so', 'Will the policy work? I hope so.', 'a whole positive proposition replaced by so', 'I hope that the policy will work.', 'hope so', 'Do not use so after every verb that takes a content clause.'),
      p('Negative proposition', 'hope/suppose + not', 'Will costs rise again? We hope not.', 'a negative proposition replaced economically', 'We hope that costs will not rise again.', 'hope not', 'Do not form every negative substitute as do not.'),
      p('Verb-phrase substitute', 'do so', 'Applicants must verify their identity before submitting; those unable to do so should contact support.', 'a previously mentioned action replaced in formal discourse', 'Applicants unable to verify their identity should contact support.', 'do so', 'Do not use do so where ordinary auxiliary ellipsis is more natural and required.'),
    ],
  },
  {
    slug: 'advanced-contrast-linking-c1', order: '26', category: 'Cohesion and interaction', shortTitle: 'Advanced contrast linking',
    description: 'Use much as, albeit, notwithstanding and while to express compact or rhetorically weighted concession and contrast.', purpose: 'acknowledge limitations without obscuring the main argumentative relationship', register: 'academic argument, reviews, policy and formal commentary', formula: 'much as + clause | adjective, albeit + complement | notwithstanding + noun', model: 'Much as the proposal appeals to voters, it remains financially risky.',
    patterns: [
      p('Rhetorical concession', 'much as + subject + verb', 'Much as the proposal appeals to voters, it remains financially risky.', 'strong acknowledgement followed by a maintained conclusion', 'Although the proposal is appealing, it is risky.', 'Much as the proposal appeals', 'Do not use much as for a simple quantitative comparison.'),
      p('Compact qualification', 'main statement + albeit + adjective/phrase', 'The intervention was effective, albeit expensive.', 'a concise qualification attached to an evaluation', 'The intervention was effective although it was expensive.', 'albeit expensive', 'Do not follow albeit with an ordinary full finite clause in this compact pattern.'),
      p('Formal counterpoint', 'notwithstanding + noun phrase', 'Notwithstanding the initial delay, the project met its deadline.', 'a formal concession expressed as a noun phrase', 'Despite the initial delay, the project met its deadline.', 'Notwithstanding the initial delay', 'Do not confuse notwithstanding with a causal linker.'),
    ],
  },
  {
    slug: 'condition-concession-clauses-c1', order: '27', category: 'Cohesion and interaction', shortTitle: 'Advanced condition and concession',
    description: 'Use even if, whether or not, however plus adjective and no matter constructions to express robust conditions and concessions.', purpose: 'show that an outcome remains valid across alternatives or despite an extreme circumstance', register: 'argument, policy, negotiation and careful generalisation', formula: 'even if / whether or not + clause | however + adjective/adverb + clause', model: 'Whether or not demand rises, the infrastructure must be upgraded.',
    patterns: [
      p('Robust condition', 'even if + clause', 'The policy will continue even if demand falls.', 'an outcome unchanged by a possible condition', 'Falling demand would not stop the policy.', 'even if demand falls', 'Do not use even though when the condition is hypothetical rather than factual.'),
      p('Exhaustive alternatives', 'whether or not + clause', 'Whether or not demand rises, the infrastructure must be upgraded.', 'the same result across both alternatives', 'The upgrade is required in either demand scenario.', 'Whether or not demand rises', 'Do not repeat or not unnecessarily when whether already introduces an embedded choice unless emphasis requires it.'),
      p('Degree concession', 'however + adjective/adverb + subject + verb', 'However carefully the system is designed, some risk will remain.', 'a conclusion valid at every degree on a scale', 'Even a very careful design cannot remove all risk.', 'However carefully', 'Do not confuse concessive however with the sentence connector however.'),
    ],
  },
  {
    slug: 'spoken-grammar-headers-tails-c1', order: '28', category: 'Cohesion and interaction', shortTitle: 'Headers, tails and spoken grammar',
    description: 'Use headers, tails and discourse-sensitive clause organisation to manage reference and interpersonal meaning in speech.', purpose: 'introduce or clarify a topic in real-time interaction without losing grammatical reference', register: 'natural conversation, interviews and informal presentations', formula: 'header + resumptive clause | clause + tail noun phrase', model: 'That new reporting system, is it working any better now?',
    patterns: [
      p('Header', 'topic phrase + complete clause with pronoun', 'That new reporting system, is it working any better now?', 'a topic introduced before the speaker constructs the clause', 'Is the new reporting system working better?', 'That new reporting system', 'Do not omit the resumptive pronoun when the header stands outside the clause.'),
      p('Tail', 'complete clause + clarifying noun phrase', 'It is surprisingly flexible, that new reporting system.', 'a referent clarified or evaluated after the complete clause', 'That new reporting system is surprisingly flexible.', 'that new reporting system', 'Do not treat a tail as an ordinary appositive inside formal edited prose.'),
      p('Situational ellipsis', 'recoverable subject/auxiliary omitted', 'Seen Maya today?', 'an informal question whose missing material is obvious in context', 'Have you seen Maya today?', 'Seen Maya today', 'Do not transfer situational ellipsis into contexts that require explicit formal grammar.'),
    ],
  },
  {
    slug: 'advanced-question-forms-c1', order: '29', category: 'Cohesion and interaction', shortTitle: 'Advanced question forms',
    description: 'Use negative questions, rhetorical questions, echo questions and embedded questions to manage assumptions and interaction.', purpose: 'ask while signalling surprise, expectation, challenge or interpersonal distance', register: 'conversation, interviews, debate and professional clarification', formula: 'negative auxiliary + subject | statement + question focus | embedded wh + statement order', model: 'Would it not be safer to delay the launch?',
    patterns: [
      p('Negative question', 'negative auxiliary + subject + base', 'Would it not be safer to delay the launch?', 'an expected answer or persuasive assumption presented as a question', 'Delaying the launch would probably be safer.', 'Would it not be safer', 'Do not use a negative question when a neutral information request is intended.'),
      p('Echo question', 'focused wh-word or repeated structure', 'They approved which version?', 'surprise or a request to confirm one part of prior information', 'Which version did they approve?', 'which version', 'Do not apply ordinary wh-inversion mechanically to every echo question.'),
      p('Embedded question', 'introductory frame + wh/if + statement order', 'Could you explain why the figures do not match?', 'a question embedded inside a polite or analytical frame', 'Why do the figures not match?', 'why the figures do not match', 'Do not retain direct-question inversion inside the embedded clause.'),
    ],
  },
  {
    slug: 'notional-agreement-c1', order: '30', category: 'Cohesion and interaction', shortTitle: 'Notional agreement',
    description: 'Choose agreement according to grammatical form, collective meaning, proximity and quantity interpretation in complex subjects.', purpose: 'match the verb and pronoun to whether the subject is viewed as one unit, several members or one quantity', register: 'formal writing, reporting and edited general English', formula: 'grammatical head + notional number + variety convention', model: 'The committee has reached its decision, but the members remain divided.',
    patterns: [
      p('Collective unit', 'collective noun + singular verb/pronoun', 'The committee has reached its decision.', 'a group presented as one institutional unit', 'The committee acted as a single body.', 'committee has reached', 'Do not switch between singular and plural reference without a meaning change.'),
      p('Collective members', 'collective noun + plural verb/pronoun', 'The committee are divided in their opinions.', 'individual members presented as separate actors in varieties allowing plural agreement', 'The members of the committee disagree.', 'committee are divided', 'Check the target variety because collective agreement differs across Englishes.'),
      p('Quantity as unit', 'measure/amount + singular verb', 'Ten kilometres is too far to walk in this heat.', 'a plural-form measure interpreted as one amount', 'The distance of ten kilometres is excessive.', 'Ten kilometres is', 'Do not choose agreement solely from the nearest plural noun.'),
    ],
  },
]

export const c1CurriculumTopics = specs.map((spec, index) => topic(base(spec, index)))
