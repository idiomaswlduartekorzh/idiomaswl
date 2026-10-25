import { createAdvancedCurriculumTopic as topic, pattern as p, type AdvancedCurriculumSpec } from '../advanced-curriculum-factory.ts'

const base = (value: Omit<AdvancedCurriculumSpec, 'level' | 'color'>, index: number): AdvancedCurriculumSpec => ({
  ...value,
  level: 'B2',
  color: ['#C8102E', '#6D28D9', '#0F766E', '#B45309', '#1D4ED8'][index % 5],
})

const specs: Array<Omit<AdvancedCurriculumSpec, 'level' | 'color'>> = [
  {
    slug: 'third-conditional-b2', order: '05', category: 'Conditionals', shortTitle: 'Third conditional',
    description: 'Build unreal past conditions and their imagined past results with precise past perfect and modal perfect forms.',
    purpose: 'evaluate how a different past cause could have produced a different past result', register: 'reflection, explanation, criticism and counterfactual argument',
    formula: 'if + past perfect | would / could / might + have + past participle', model: 'If we had checked the data, we would have found the error.',
    patterns: [
      p('Unreal result', 'if + had + participle, would have + participle', 'If we had checked the data, we would have found the error.', 'an imagined result of a past action that did not happen', 'We did not check the data, so we did not find the error.', 'had checked', 'Do not place would have inside the ordinary if-clause.'),
      p('Past possibility', 'if + had + participle, could have + participle', 'If Maya had applied, she could have won the grant.', 'a past opportunity that was possible but unrealised', 'Maya did not apply, although winning was possible.', 'could have won', 'Do not use could had; a modal is followed by have plus a participle.'),
      p('Uncertain result', 'if + had + participle, might have + participle', 'If the team had waited, the market might have recovered.', 'an uncertain alternative past result', 'The team did not wait; recovery was possible but not certain.', 'might have recovered', 'Do not present might have as a certain result.'),
    ],
  },
  {
    slug: 'wish-if-only-regrets-b2', order: '06', category: 'Conditionals', shortTitle: 'Wish, if only and regrets',
    description: 'Use unreal past and past perfect forms to express present dissatisfaction, past regret and desired change.',
    purpose: 'separate a present unreal wish, a past regret and a complaint about changeable behaviour', register: 'personal reflection, tactful criticism and narrative commentary',
    formula: 'wish / if only + past simple | past perfect | would', model: 'I wish I had asked more questions.',
    patterns: [
      p('Present wish', 'wish + past simple', 'I wish the office were closer.', 'dissatisfaction with a present situation', 'The office is not close enough.', 'were closer', 'Do not use a present tense after wish for an unreal present situation.'),
      p('Past regret', 'wish + past perfect', 'I wish I had asked more questions.', 'regret about a completed past choice', 'I did not ask enough questions.', 'had asked', 'Do not use would have for your own completed past regret.'),
      p('Desired change', 'wish + would + base verb', 'I wish the printer would stop making that noise.', 'a complaint about behaviour or a situation expected to change', 'The printer keeps making an annoying noise.', 'would stop', 'Avoid wish would for fixed states that are not volitional or changeable.'),
    ],
  },
  {
    slug: 'conditional-alternatives-b2', order: '07', category: 'Conditionals', shortTitle: 'Conditional alternatives',
    description: 'Express conditions with unless, provided that, as long as, otherwise and in case instead of relying only on if.',
    purpose: 'state exceptions, necessary conditions, safeguards and consequences with accurate logical scope', register: 'instructions, agreements, policies and everyday planning',
    formula: 'unless / provided / as long as + clause | otherwise + consequence | in case + precaution', model: 'You may work remotely provided that the data remains secure.',
    patterns: [
      p('Exception', 'unless + affirmative clause', 'We will proceed unless the client objects.', 'the only condition that prevents the result', 'We will proceed if the client does not object.', 'unless', 'Do not add another negative after unless when it already means if not.'),
      p('Strict condition', 'provided that + clause', 'You may work remotely provided that the data remains secure.', 'a necessary condition for permission or agreement', 'Remote work is permitted only if the data stays secure.', 'provided that', 'Do not use provided that when the condition is merely background information.'),
      p('Precaution', 'in case + present clause', 'Save a local copy in case the connection fails.', 'a precaution taken before a possible event', 'Save a copy now because the connection may fail later.', 'in case', 'Do not use will after in case in an ordinary precaution clause.'),
    ],
  },
  {
    slug: 'future-continuous-perfect-b2', order: '08', category: 'Tense and aspect', shortTitle: 'Future continuous and future perfect',
    description: 'Locate an activity in progress at a future point or a completed result before a future deadline.',
    purpose: 'distinguish future process, completion and duration in relation to a reference point', register: 'project planning, predictions, schedules and progress reporting',
    formula: 'will be + -ing | will have + participle | will have been + -ing', model: 'By Friday, we will have completed the first phase.',
    patterns: [
      p('Future process', 'will be + verb-ing', 'At ten tomorrow, we will be presenting the findings.', 'an activity in progress at a specified future time', 'The presentation will be in progress at ten tomorrow.', 'will be presenting', 'Do not use the future perfect when the focus is the activity in progress.'),
      p('Future completion', 'will have + past participle', 'By Friday, we will have completed the first phase.', 'a completed result before a future deadline', 'The first phase will be complete before Friday ends.', 'will have completed', 'Do not omit have in the future perfect.'),
      p('Future duration', 'will have been + verb-ing', 'In June, she will have been teaching here for ten years.', 'the duration of an activity up to a future point', 'Her teaching will reach a ten-year duration in June.', 'will have been teaching', 'Do not use a stative verb mechanically in the continuous form.'),
    ],
  },
  {
    slug: 'narrative-tenses-b2', order: '09', category: 'Tense and aspect', shortTitle: 'Narrative tenses',
    description: 'Coordinate past simple, past continuous and past perfect to organise foreground events, background action and earlier causes.',
    purpose: 'guide the reader through the sequence and viewpoint of a past narrative', register: 'stories, incident reports, biographies and spoken anecdotes',
    formula: 'past perfect = earlier | past continuous = background | past simple = event line', model: 'The alarm was ringing because someone had opened the rear door.',
    patterns: [
      p('Event line', 'past simple', 'The lights went out and the audience became silent.', 'completed events that move the narrative forward', 'The lights failed; then the audience reacted.', 'went out', 'Do not overuse past perfect after the earlier sequence is already clear.'),
      p('Background process', 'past continuous', 'People were leaving when the announcement began.', 'an activity already in progress around a shorter event', 'The leaving was in progress when the announcement started.', 'were leaving', 'Do not use past continuous for every consecutive finished event.'),
      p('Earlier cause', 'past perfect', 'The alarm was ringing because someone had opened the rear door.', 'an event completed before the current past viewpoint', 'The door was opened first; that caused the alarm.', 'had opened', 'Do not use past simple when the earlier relationship would become unclear.'),
    ],
  },
  {
    slug: 'past-perfect-continuous-b2', order: '10', category: 'Tense and aspect', shortTitle: 'Past perfect continuous',
    description: 'Present an activity as ongoing before a past reference point and connect its duration or visible result to that moment.',
    purpose: 'explain past duration, temporary activity and evidence at a later past point', register: 'narration, explanations, investigations and progress reviews',
    formula: 'had been + verb-ing | for / since + duration', model: 'They had been testing the system for hours before it failed.',
    patterns: [
      p('Duration before past', 'had been + -ing + for/since', 'They had been testing the system for hours before it failed.', 'an ongoing activity measured up to a past event', 'Testing continued for hours and then the system failed.', 'had been testing', 'Do not replace a duration-focused activity with the simple past perfect automatically.'),
      p('Past evidence', 'had been + -ing', 'Her hands were covered in paint because she had been decorating.', 'an earlier activity inferred from a past result', 'The paint on her hands showed what she had been doing.', 'had been decorating', 'Do not use the form when the focus is only the completed quantity.'),
      p('Interrupted process', 'had been + -ing + when', 'I had been preparing the report when the priorities changed.', 'an extended earlier process interrupted by a later decision', 'Preparation was in progress until the priorities changed.', 'had been preparing', 'Do not confuse the past perfect continuous with a process merely simultaneous with another event.'),
    ],
  },
  {
    slug: 'present-perfect-simple-continuous-b2', order: '11', category: 'Tense and aspect', shortTitle: 'Present perfect: simple or continuous',
    description: 'Choose between result, quantity and completion on one hand, and duration, repetition or temporary process on the other.',
    purpose: 'frame a past-to-present situation according to whether result or activity is more important', register: 'updates, interviews, work reviews and everyday explanations',
    formula: 'have + participle | have been + verb-ing', model: 'We have reviewed twelve files, and we have been checking the final one all morning.',
    patterns: [
      p('Completed result', 'have + past participle', 'We have reviewed twelve files.', 'a present result or completed quantity', 'Twelve files are now complete.', 'have reviewed', 'Do not use the continuous when a finished quantity is the focus.'),
      p('Ongoing duration', 'have been + -ing + for/since', 'We have been checking the final file all morning.', 'the duration of an activity continuing into the present', 'The checking began earlier and is still relevant now.', 'have been checking', 'Do not use since with a duration or for with a starting point.'),
      p('Recent evidence', 'have been + -ing', 'You have been working in the garden; your shoes are muddy.', 'a recent repeated or temporary activity visible in the present', 'The muddy shoes are evidence of recent gardening.', 'have been working', 'Avoid the continuous with stative verbs unless the meaning becomes active.'),
    ],
  },
  {
    slug: 'future-in-the-past-b2', order: '12', category: 'Tense and aspect', shortTitle: 'Future in the past',
    description: 'Describe plans, predictions and events that were still future from an earlier viewpoint using would, was going to and was about to.',
    purpose: 'keep the future reference anchored inside a past narrative or report', register: 'narratives, reported plans, biographies and retrospective analysis',
    formula: 'would + base | was/were going to + base | was/were about to + base', model: 'We knew the decision would affect the whole team.',
    patterns: [
      p('Past prediction', 'would + base verb', 'We knew the decision would affect the whole team.', 'a future event viewed from a past reporting point', 'At that past moment, the effect was still in the future.', 'would affect', 'Do not use will when the viewpoint remains in the past.'),
      p('Past intention', 'was/were going to + base verb', 'She was going to call, but the meeting ran late.', 'an earlier plan that may or may not have happened', 'Calling was her plan before the meeting delayed her.', 'was going to call', 'Do not imply the intention happened unless the context confirms it.'),
      p('Immediate future', 'was/were about to + base verb', 'The train was about to leave when the signal changed.', 'an event expected immediately after a past moment', 'Departure was imminent at that time.', 'was about to leave', 'Do not use about to for a distant or unscheduled future.'),
    ],
  },
  {
    slug: 'modal-deduction-present-future-b2', order: '13', category: 'Modality', shortTitle: 'Present and future deduction',
    description: 'Use must, might, may, could and cannot to grade conclusions about current situations and future possibilities.',
    purpose: 'match modal strength to the available evidence instead of stating guesses as facts', register: 'problem-solving, prediction, investigation and careful conversation',
    formula: 'must / may / might / could / cannot + base or be + -ing', model: 'The server must be processing a large request.',
    patterns: [
      p('Strong deduction', 'must + base / be + -ing', 'The server must be processing a large request.', 'a conclusion strongly supported by present evidence', 'The delay strongly suggests heavy processing.', 'must be processing', 'Do not use must not as the ordinary negative deduction; use cannot.'),
      p('Open possibility', 'may/might/could + base', 'The update might solve the problem.', 'a possible present or future explanation', 'The update is one plausible solution.', 'might solve', 'Do not treat might as a weak obligation.'),
      p('Impossibility', 'cannot + base / be + -ing', 'That cannot be the final version; two sections are missing.', 'a conclusion ruled out by evidence', 'The missing sections make the final-version claim impossible.', 'cannot be', 'Do not use must not when you mean a logical impossibility.'),
    ],
  },
  {
    slug: 'obligation-permission-necessity-b2', order: '14', category: 'Modality', shortTitle: 'Obligation, permission and necessity',
    description: 'Distinguish internal and external obligation, absence of necessity, prohibition and formal permission across time.',
    purpose: 'state rules and choices without confusing not necessary with not allowed', register: 'workplace policy, instructions, advice and formal communication',
    formula: 'must / have to / need to | do not have to | must not | may', model: 'You do not have to attend, but you must submit the form.',
    patterns: [
      p('Required action', 'must / have to + base', 'All visitors have to show identification.', 'an obligation imposed by a rule or situation', 'The rule requires every visitor to show ID.', 'have to show', 'Do not assume must and have to always carry identical source and tone.'),
      p('No necessity', 'do not have to / need not + base', 'You do not have to attend the optional session.', 'an action that is permitted but not required', 'Attendance is optional.', 'do not have to attend', 'Do not confuse do not have to with must not.'),
      p('Prohibition', 'must not / may not + base', 'Staff must not share customer passwords.', 'an action that is explicitly forbidden', 'Sharing passwords is prohibited.', 'must not share', 'Do not use do not have to when the action is forbidden.'),
    ],
  },
  {
    slug: 'past-ability-achievement-b2', order: '15', category: 'Modality', shortTitle: 'Past ability and achievement',
    description: 'Choose could for general ability and managed to, succeeded in or was able to for a specific successful event.',
    purpose: 'distinguish general capacity from a single achieved or failed outcome', register: 'biography, performance review, incident reports and storytelling',
    formula: 'could + base | managed to / was able to + base | succeeded in + -ing', model: 'Despite the outage, the team managed to recover the files.',
    patterns: [
      p('General ability', 'could + base verb', 'At sixteen, Lena could speak three languages.', 'a repeated or continuing ability in the past', 'Speaking three languages was a general ability.', 'could speak', 'Do not use managed to for a broad continuing ability without a specific achievement.'),
      p('Specific achievement', 'managed to / was able to + base', 'Despite the outage, the team managed to recover the files.', 'success in one difficult past situation', 'The team succeeded in that particular recovery.', 'managed to recover', 'Avoid could for a single affirmative achievement when success is central.'),
      p('Failed attempt', 'could not / was unable to + base', 'The technician was unable to reproduce the fault.', 'failure in a specific past attempt', 'The attempt to reproduce the fault did not succeed.', 'was unable to reproduce', 'Do not use did not manage without to before the verb.'),
    ],
  },
  {
    slug: 'passives-across-tenses-b2', order: '16', category: 'Voice and reporting', shortTitle: 'Passives across tenses',
    description: 'Build passive clauses accurately in continuous, perfect and modal forms while deciding whether the agent matters.',
    purpose: 'shift attention from the actor to the process, result or affected participant', register: 'reports, processes, news, scientific description and formal updates',
    formula: 'tense/modal + be + past participle | optional by-agent', model: 'The new protocol has been tested in three departments.',
    patterns: [
      p('Ongoing passive', 'is/was being + participle', 'The bridge is being inspected this week.', 'a passive process currently in progress', 'Inspectors are examining the bridge this week.', 'is being inspected', 'Do not omit being in a continuous passive.'),
      p('Perfect passive', 'has/had been + participle', 'The new protocol has been tested in three departments.', 'a completed passive result connected to a reference point', 'Three departments have completed tests of the protocol.', 'has been tested', 'Do not use has being in the present perfect passive.'),
      p('Modal passive', 'modal + be + participle', 'All entries must be submitted electronically.', 'a required or possible action with the receiver in focus', 'Everyone must submit entries electronically.', 'must be submitted', 'Do not place to between the modal and be.'),
    ],
  },
  {
    slug: 'causative-have-get-b2', order: '17', category: 'Voice and reporting', shortTitle: 'Causative have and get',
    description: 'Use have or get something done for arranged services and have or get someone to act for personal causation.',
    purpose: 'show that the subject arranges, persuades or experiences an action rather than performing it directly', register: 'services, project coordination, everyday arrangements and incident description',
    formula: 'have/get + object + participle | have + person + base | get + person + to-infinitive', model: 'We had the contract reviewed before signing it.',
    patterns: [
      p('Arranged service', 'have + object + past participle', 'We had the contract reviewed before signing it.', 'an action arranged for another person to perform', 'A specialist reviewed the contract for us.', 'had the contract reviewed', 'Do not use the base verb after the object in the service pattern.'),
      p('Persuaded action', 'get + person + to-infinitive', 'She got the supplier to replace the damaged units.', 'successfully persuading or arranging for a person to act', 'She persuaded the supplier to replace the units.', 'got the supplier to replace', 'Do not omit to after get plus person.'),
      p('Unwanted experience', 'have + object + participle', 'He had his laptop stolen on the train.', 'an event experienced by the subject, often unwillingly', 'Someone stole his laptop while he was on the train.', 'had his laptop stolen', 'Do not assume every causative have sentence describes a voluntary service.'),
    ],
  },
  {
    slug: 'reporting-verb-patterns-b2', order: '18', category: 'Voice and reporting', shortTitle: 'Reporting verb patterns',
    description: 'Control the complementation patterns that follow reporting verbs such as admit, deny, advise, warn, promise and suggest.',
    purpose: 'report speech while preserving whether it was advice, refusal, admission, warning or commitment', register: 'news, minutes, academic summaries and everyday retelling',
    formula: 'verb + -ing | verb + object + to-infinitive | verb + that-clause', model: 'The consultant advised us to delay the launch.',
    patterns: [
      p('Gerund report', 'admit/deny/suggest + -ing', 'The manager admitted overlooking the warning.', 'an admission or report focused on an action', 'The manager said that she had overlooked the warning.', 'admitted overlooking', 'Do not use an object plus to-infinitive after admit or deny.'),
      p('Object plus infinitive', 'advise/warn/remind + object + to-infinitive', 'The consultant advised us to delay the launch.', 'advice or influence directed at a specific person', 'The consultant told us that delaying was advisable.', 'advised us to delay', 'Do not omit the object when the reporting verb requires one.'),
      p('That-clause', 'promise/claim/confirm + that-clause', 'The supplier confirmed that the parts were in stock.', 'a proposition reported as a claim, promise or confirmation', 'The supplier said the parts were available.', 'confirmed that', 'Do not backshift automatically when the information remains current and the context favours no shift.'),
    ],
  },
  {
    slug: 'reduced-relative-clauses-b2', order: '19', category: 'Clause building', shortTitle: 'Reduced relative clauses',
    description: 'Reduce defining relative clauses to present participles, past participles or infinitives when the omitted subject is recoverable.',
    purpose: 'compress noun modification without losing the relationship between the noun and the action', register: 'descriptions, reports, instructions and concise professional writing',
    formula: 'noun + -ing | noun + past participle | noun + to-infinitive', model: 'Applications received after Friday will not be considered.',
    patterns: [
      p('Active reduction', 'noun + verb-ing', 'Students waiting outside should form one line.', 'an active action performed by the modified noun', 'Students who are waiting outside should form one line.', 'waiting outside', 'Do not use an -ing reduction when the noun is not the understood subject.'),
      p('Passive reduction', 'noun + past participle', 'Applications received after Friday will not be considered.', 'a passive action affecting the modified noun', 'Applications that are received after Friday will not be considered.', 'received after Friday', 'Do not reduce when the missing relative clause contains a different subject.'),
      p('Infinitive reduction', 'noun + to-infinitive', 'Mina was the first analyst to identify the pattern.', 'purpose, obligation or ordinal selection linked to a noun', 'Mina was the first analyst who identified the pattern.', 'to identify', 'Do not use the infinitive reduction when the time or agency becomes ambiguous.'),
    ],
  },
  {
    slug: 'advanced-relative-clauses-b2', order: '20', category: 'Clause building', shortTitle: 'Advanced relative clauses',
    description: 'Use non-defining clauses, preposition plus whom or which, whose and quantifier relatives to add precise information.',
    purpose: 'attach essential or supplementary information while keeping reference and punctuation clear', register: 'formal description, profiles, reports and academic explanation',
    formula: 'noun, relative clause, | preposition + whom/which | quantifier + of whom/which', model: 'The proposal, several parts of which remain unclear, needs revision.',
    patterns: [
      p('Supplementary clause', 'noun, who/which + clause,', 'The new director, who joined in May, will lead the review.', 'extra information that does not identify the noun', 'The new director will lead the review; she joined in May.', 'who joined in May', 'Do not omit commas around a non-defining relative clause.'),
      p('Formal preposition', 'preposition + whom/which', 'The committee to which she reported has been dissolved.', 'a formal relative relationship with the preposition fronted', 'She reported to the committee, and it has been dissolved.', 'to which', 'Do not use that immediately after a fronted preposition.'),
      p('Quantifier relative', 'some/most/none + of whom/which', 'The proposal, several parts of which remain unclear, needs revision.', 'a quantified subset of people or things already identified', 'Several parts of the proposal remain unclear.', 'parts of which', 'Do not use of that in a quantifier relative.'),
    ],
  },
  {
    slug: 'reported-questions-commands-b2', order: '21', category: 'Clause building', shortTitle: 'Reported questions and commands',
    description: 'Report questions, requests and commands with statement word order, appropriate backshift and infinitive patterns.',
    purpose: 'retell an interaction without preserving direct-question inversion or quotation form', register: 'interviews, minutes, narratives and customer-service reports',
    formula: 'ask + wh/if + subject + verb | tell/ask + object + to-infinitive', model: 'She asked whether the figures had been verified.',
    patterns: [
      p('Reported wh-question', 'ask + wh-word + subject + verb', 'He asked why the delivery had been delayed.', 'the content of an information question', 'He asked, “Why was the delivery delayed?”', 'why the delivery had been delayed', 'Do not retain subject-auxiliary inversion in a reported question.'),
      p('Reported yes/no question', 'ask + if/whether + subject + verb', 'She asked whether the figures had been verified.', 'the content of a yes-or-no question', 'She asked, “Have the figures been verified?”', 'whether the figures had been verified', 'Do not use that to introduce a reported yes-or-no question.'),
      p('Reported command', 'tell/ask + object + to-infinitive', 'The officer told us to remain outside.', 'an instruction or request directed at a person', 'The officer said, “Remain outside.”', 'told us to remain', 'Do not omit the object after tell in this pattern.'),
    ],
  },
  {
    slug: 'gerunds-infinitives-change-meaning-b2', order: '22', category: 'Verb patterns', shortTitle: 'Gerunds and infinitives: meaning changes',
    description: 'Distinguish stop, remember, regret, try and mean followed by -ing or to-infinitive when the complement changes the interpretation.',
    purpose: 'select the complement that expresses memory, purpose, experiment, interruption or consequence', register: 'everyday explanation, instructions, reflection and problem-solving',
    formula: 'verb + -ing = activity/event | verb + to-infinitive = purpose/next action', model: 'Remember to lock the door, and remember meeting the client there last year.',
    patterns: [
      p('Remembered event', 'remember + verb-ing', 'I remember meeting the client at this conference.', 'a memory of an earlier experience', 'I have a memory of the meeting.', 'remember meeting', 'Do not use the infinitive when referring to a memory of a completed event.'),
      p('Required future action', 'remember + to-infinitive', 'Remember to lock the archive before you leave.', 'not forgetting a necessary later action', 'Do not forget the locking task.', 'remember to lock', 'Do not use -ing when the action still needs to be done.'),
      p('Experimental method', 'try + verb-ing', 'Try restarting the router before replacing it.', 'testing a possible solution', 'Restarting is one method worth testing.', 'try restarting', 'Do not confuse try doing with attempt to do.'),
    ],
  },
  {
    slug: 'dependent-prepositions-b2', order: '23', category: 'Verb patterns', shortTitle: 'Dependent prepositions',
    description: 'Use the prepositions selected by particular verbs, adjectives and nouns and recognise when the following form must be a gerund.',
    purpose: 'build accurate lexical-grammatical patterns rather than translating prepositions directly', register: 'professional writing, discussion, applications and everyday communication',
    formula: 'verb/adjective/noun + fixed preposition + noun or -ing', model: 'The team succeeded in reducing response times.',
    patterns: [
      p('Verb pattern', 'verb + preposition + noun/-ing', 'The team succeeded in reducing response times.', 'a verb whose complement requires a fixed preposition', 'The team successfully reduced response times.', 'succeeded in reducing', 'Do not follow a preposition with a bare infinitive.'),
      p('Adjective pattern', 'adjective + preposition + noun/-ing', 'She is responsible for coordinating the regional offices.', 'an adjective linked to its complement by a fixed preposition', 'Coordinating the regional offices is her responsibility.', 'responsible for coordinating', 'Do not translate the source-language preposition automatically.'),
      p('Noun pattern', 'noun + preposition + noun/-ing', 'There has been a sharp increase in remote applications.', 'a noun that selects a specific prepositional complement', 'Remote applications have increased sharply.', 'increase in', 'Do not switch between in and of when the noun pattern fixes the relationship.'),
    ],
  },
  {
    slug: 'articles-abstract-reference-b2', order: '24', category: 'Nouns and determiners', shortTitle: 'Articles and abstract reference',
    description: 'Choose zero article, a/an or the with institutions, abstract concepts, generic reference and shared specific knowledge.',
    purpose: 'show whether a noun is generic, newly introduced, institutionally used or specifically identifiable', register: 'general, academic and professional English',
    formula: 'zero = general/institutional | a/an = one/new instance | the = identifiable/specific', model: 'Education shapes society, but the education she received was highly specialised.',
    patterns: [
      p('Generic abstraction', 'zero article + abstract/uncountable noun', 'Education shapes social mobility.', 'a concept discussed in general', 'The statement concerns education as a general concept.', 'Education', 'Do not add the merely because an abstract noun sounds important.'),
      p('Specific instance', 'the + noun + identifying context', 'The education she received was highly specialised.', 'an identifiable instance limited by later information', 'Her particular education was specialised.', 'The education', 'Do not omit the when the following clause identifies a specific instance.'),
      p('One manifestation', 'a/an + countable interpretation', 'The reform produced a noticeable improvement in access.', 'one countable example or manifestation of an abstract idea', 'Access improved in one noticeable way.', 'a noticeable improvement', 'Do not use a/an before an abstract noun that has not acquired a countable meaning.'),
    ],
  },
  {
    slug: 'advanced-quantifiers-determiners-b2', order: '25', category: 'Nouns and determiners', shortTitle: 'Advanced quantifiers and determiners',
    description: 'Control few, a few, little, a little, each, every, either, neither and quantifier agreement to express precise scope.',
    purpose: 'show amount, distribution and speaker evaluation without creating agreement errors', register: 'reports, comparisons, instructions and everyday discussion',
    formula: 'quantifier + count/non-count noun | distributive determiner + singular noun', model: 'Few applicants met every requirement, but a few showed strong potential.',
    patterns: [
      p('Negative quantity', 'few/little + noun', 'Few applicants met every requirement.', 'a small amount presented as insufficient or disappointing', 'Only a disappointing number met all requirements.', 'Few applicants', 'Do not use few with uncountable nouns or little with plural count nouns.'),
      p('Positive small amount', 'a few/a little + noun', 'A few candidates showed exceptional potential.', 'a small but useful or positive amount', 'Some candidates provided a positive result.', 'A few candidates', 'Do not remove the article when the intended evaluation is positive.'),
      p('Distribution', 'each/every/either/neither + singular noun', 'Each participant received a separate access code.', 'individual distribution across members of a set', 'Codes were distributed individually to all participants.', 'Each participant', 'Do not use a plural noun directly after each or every.'),
    ],
  },
  {
    slug: 'gradable-nongradable-adjectives-b2', order: '26', category: 'Description and comparison', shortTitle: 'Gradable and non-gradable adjectives',
    description: 'Combine degree adverbs with gradable adjectives and absolute intensifiers with extreme or classifying adjectives.',
    purpose: 'scale descriptions naturally and avoid mismatches such as very impossible or absolutely tired', register: 'reviews, descriptions, evaluation and persuasive writing',
    formula: 'very/fairly + gradable | absolutely/completely + extreme or absolute adjective', model: 'The first draft was fairly good, but the final version was absolutely outstanding.',
    patterns: [
      p('Gradable quality', 'very/fairly/slightly + gradable adjective', 'The initial estimate was slightly inaccurate.', 'a quality placed at a point on a scale', 'The estimate was inaccurate to a small degree.', 'slightly inaccurate', 'Do not use absolutely with every ordinary gradable adjective.'),
      p('Extreme quality', 'absolutely/really + extreme adjective', 'The final performance was absolutely outstanding.', 'an already intensified adjective presented categorically', 'The performance was exceptionally good.', 'absolutely outstanding', 'Avoid very with conventional extreme adjectives when a natural intensifier is expected.'),
      p('Absolute state', 'completely/virtually + absolute adjective', 'The archive is virtually empty.', 'an absolute category modified for completeness or approximation', 'Almost nothing remains in the archive.', 'virtually empty', 'Do not treat an absolute adjective as freely gradable in every context.'),
    ],
  },
  {
    slug: 'advanced-comparison-b2', order: '27', category: 'Description and comparison', shortTitle: 'Advanced comparison',
    description: 'Modify comparatives, express proportional change and compare equivalent degrees with precise scaling expressions.',
    purpose: 'describe the size, pace and relationship of differences rather than making a simple binary comparison', register: 'data commentary, reviews, reports and analytical discussion',
    formula: 'much/far/slightly + comparative | the more..., the more... | as...as', model: 'The revised process is considerably faster and almost as accurate as the original.',
    patterns: [
      p('Modified difference', 'much/far/slightly + comparative', 'The revised process is considerably faster.', 'the degree of difference between two items', 'The process is faster by a considerable margin.', 'considerably faster', 'Do not use very directly before a comparative adjective.'),
      p('Proportional relation', 'the + comparative, the + comparative', 'The longer the delay continues, the more expensive recovery becomes.', 'two changes that develop in relation to each other', 'Cost rises as the delay becomes longer.', 'The longer', 'Do not omit the before either comparative in the proportional pattern.'),
      p('Near equivalence', 'almost/nearly/not quite as + adjective + as', 'The new model is almost as accurate as the original.', 'a comparison close to but not fully equal', 'The accuracy is slightly lower than the original.', 'almost as accurate as', 'Do not use than after an as...as structure.'),
    ],
  },
  {
    slug: 'contrast-concession-b2', order: '28', category: 'Discourse and cohesion', shortTitle: 'Contrast and concession',
    description: 'Link opposing ideas with although, even though, despite, in spite of, whereas and while while controlling clause and noun forms.',
    purpose: 'acknowledge a counterpoint and show whether it changes the main conclusion', register: 'argument, discussion, reviews and formal comparison',
    formula: 'although + clause | despite + noun/-ing | whereas + contrasting clause', model: 'Although the plan is expensive, it may save money in the long term.',
    patterns: [
      p('Clause concession', 'although/even though + subject + verb', 'Although the plan is expensive, it may save money in the long term.', 'a surprising main result despite a full contrasting proposition', 'The plan is expensive, but it may save money later.', 'Although the plan is expensive', 'Do not use but in the main clause after although.'),
      p('Nominal concession', 'despite/in spite of + noun/-ing', 'Despite costing more initially, the system is cheaper to maintain.', 'a concession packaged as a noun phrase or gerund', 'The system costs more initially, yet maintenance is cheaper.', 'Despite costing more', 'Do not follow despite directly with a finite clause unless adding the fact that.'),
      p('Balanced contrast', 'whereas/while + clause', 'The first option reduces cost, whereas the second improves quality.', 'a direct comparison between two different facts', 'Option one affects cost; option two affects quality.', 'whereas', 'Do not use whereas when the relationship is cause rather than contrast.'),
    ],
  },
  {
    slug: 'reason-result-purpose-b2', order: '29', category: 'Discourse and cohesion', shortTitle: 'Reason, result and purpose clauses',
    description: 'Distinguish because and because of, so and so that, therefore and in order to when connecting causes, outcomes and intentions.',
    purpose: 'make the logical relation between two ideas explicit without confusing cause, consequence and intended goal', register: 'explanation, procedure, argument and project communication',
    formula: 'because + clause | because of + noun | so that + clause | therefore + result', model: 'We duplicated the records so that no data would be lost.',
    patterns: [
      p('Reason', 'because + clause / because of + noun', 'The launch was delayed because the final test failed.', 'the cause that explains an event', 'The failed test caused the delay.', 'because the final test failed', 'Do not follow because of with a finite clause.'),
      p('Intended purpose', 'so that + subject + modal', 'We duplicated the records so that no data would be lost.', 'the goal that motivated an action', 'Preventing data loss was the reason for making copies.', 'so that no data would be lost', 'Do not treat so that as a simple result marker when intention is central.'),
      p('Logical result', 'therefore/consequently + clause', 'The evidence was incomplete; therefore, the review remained open.', 'a consequence drawn from the previous proposition', 'Incomplete evidence caused the review to remain open.', 'therefore', 'Do not join independent clauses with therefore without appropriate punctuation.'),
    ],
  },
  {
    slug: 'discourse-markers-cohesion-b2', order: '30', category: 'Discourse and cohesion', shortTitle: 'Discourse markers and cohesion',
    description: 'Organise addition, contrast, sequence, reformulation and conclusion with markers whose position and punctuation fit the discourse.',
    purpose: 'show the reader how one sentence relates to the developing argument or explanation', register: 'essays, presentations, reports and extended conversation',
    formula: 'sentence connector + punctuation | coordinating/subordinating linker inside clause structure', model: 'The method is efficient; however, it requires careful supervision.',
    patterns: [
      p('Sentence contrast', 'sentence; however, sentence', 'The method is efficient; however, it requires careful supervision.', 'a contrast between two independent propositions', 'The method is efficient, but it needs supervision.', 'however', 'Do not use however as if it were a coordinating conjunction after a comma alone.'),
      p('Addition and reinforcement', 'moreover/furthermore + clause', 'The change reduces cost; moreover, it improves response time.', 'an additional point that strengthens the argument', 'The change has two benefits: cost and response time.', 'moreover', 'Do not add moreover when the second point merely repeats the first.'),
      p('Reformulation', 'in other words/that is + clarification', 'The deadline is fixed; in other words, no extension is possible.', 'a restatement that makes the implication explicit', 'The fixed deadline means extensions are impossible.', 'in other words', 'Do not use in other words to introduce unrelated new evidence.'),
    ],
  },
]

export const b2CurriculumTopics = specs.map((spec, index) => topic(base(spec, index)))
