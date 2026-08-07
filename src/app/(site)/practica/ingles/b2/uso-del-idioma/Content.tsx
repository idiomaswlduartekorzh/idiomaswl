'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#0369a1';
const CG = '#059669';
const CR = '#dc2626';
const CP = '#7c3aed';

interface ClozeQ { opts: string[]; a: number; fb: string; }
interface ClozeSet {
  id: string; title: string; topic: string;
  parts: (string | number)[];
  questions: ClozeQ[];
}
interface WFQ { ctx: string; base: string; opts: string[]; a: number; fb: string; }
interface WFSet { id: string; title: string; topic: string; passage: string; questions: WFQ[]; }

/* ─── Multiple Choice Cloze ─── */
const CLOZE: ClozeSet[] = [
  {
    id: 'repair_cafes',
    title: 'Text A — Repair Cafés',
    topic: 'Connectors: instead of · despite · within · in order to · towards · unless · although',
    parts: [
      'Repair cafés are free community workshops where trained volunteers help people fix broken objects ', 0, ' throwing them away. The movement started in Amsterdam and has grown ', 1, ' word of mouth into a global phenomenon with thousands of venues. ', 2, ' the rise of throwaway consumer culture, these spaces promote a very different attitude to everyday objects. Visitors bring damaged items such as clothing, electronics, and bicycles, and leave ', 3, ' a few hours with them fully restored. ', 4, ' keeping skills alive in the community, volunteers share their expertise with people of all ages. The workshops represent a significant step ', 5, ' a more circular economy. ', 6, ' you visit a repair café, you cannot fully appreciate how satisfying it is to restore something that seemed beyond saving. ', 7, ' no specialist knowledge is needed to attend, these events welcome anyone who is curious about how things work.',
    ],
    questions: [
      { opts: ['apart from', 'instead of', 'rather than', 'other than'], a: 1, fb: '"Instead of throwing them away" = in place of discarding objects. "Instead of" + gerund is the fixed structure for substitution. "Rather than" also fits grammatically, but "instead of" is the natural collocation when expressing replacement.' },
      { opts: ['by', 'with', 'along', 'through'], a: 3, fb: '"Through word of mouth" is a fixed expression meaning information spread informally by people talking. "By word of mouth" also exists, but "through" is more common in formal written texts like this one.' },
      { opts: ['Although', 'Despite', 'Even though', 'Regardless of'], a: 1, fb: '"Despite" + noun/gerund introduces contrast without a subject-verb clause. "Although" and "even though" need a full clause ("although consumer culture has risen..."). "Despite the rise of..." is the correct structure.' },
      { opts: ['after', 'in', 'during', 'within'], a: 3, fb: '"Within a few hours" = before the end of a few hours, setting an upper time limit. "After a few hours" means once the time has fully passed. "Within" is the correct preposition for time limits.' },
      { opts: ['So as to', 'For', 'In order to', 'To'], a: 2, fb: '"In order to" + infinitive expresses purpose formally and emphatically. "To" alone also works, but "in order to" is more typical in FCE-level formal writing. "So as to" is valid but less common.' },
      { opts: ['into', 'along', 'through', 'towards'], a: 3, fb: '"A step towards" = progress in the direction of a goal not yet reached. "Towards" indicates orientation toward something. "Into" would imply already entering that state.' },
      { opts: ['Until', 'If', 'Whether', 'Unless'], a: 3, fb: '"Unless you visit" = if you do not visit. "Unless" introduces a negative condition, equivalent to "if...not". "Until" expresses duration up to a point in time, which does not fit here.' },
      { opts: ['Despite', 'Even if', 'Although', 'Besides'], a: 2, fb: '"Although no specialist knowledge is needed" — "although" introduces a factual contrast with a full subject-verb clause. "Despite" would need a gerund: "despite needing no specialist knowledge". "Even if" introduces a hypothetical, not a fact.' },
    ],
  },
  {
    id: 'conservation',
    title: 'Text B — Wildlife Conservation',
    topic: 'Phrasal verbs: LOOK — after · for · over · out for · up · forward to · back on · up to',
    parts: [
      'Dr Maya Okafor is someone her younger colleagues truly ', 0, ' as a role model in wildlife conservation. Years ago, when she first began to ', 1, ' funding for her research programme, she was often told the project was too ambitious. She refused to give up and now manages a sanctuary where she ', 2, ' over fifty rescued animals. Before any new arrival, Maya and her team ', 3, ' the documentation carefully to ensure all permits are in order. She also trains staff to ', 4, ' any signs of stress or illness in the animals. The sanctuary has begun to ', 5, ' as more donations and volunteers arrive each month. Maya especially ', 6, ' the summer field programmes, when students assist with data collection. When she ', 7, ' her beginnings as a young researcher with almost no resources, she is grateful for every step of the journey.',
    ],
    questions: [
      { opts: ['look down on', 'look up to', 'look around', 'look back at'], a: 1, fb: '"Look up to someone" = admire and respect them. "Look down on" is the opposite — to consider someone inferior. "Look around" = explore a place. "Look back at" = reflect on something from the past.' },
      { opts: ['look into', 'look after', 'look for', 'look out for'], a: 2, fb: '"Look for" = search for something needed. She is searching for funding, not investigating it, so "look for" is correct. "Look into" = investigate a problem. "Look after" = take care of. "Look out for" = be alert to a danger.' },
      { opts: ['looks into', 'looks forward to', 'looks back on', 'looks after'], a: 3, fb: '"Looks after" = takes care of, supervises wellbeing. She manages the animals\' daily care. "Looks into" = investigates; "looks forward to" = anticipates with pleasure; "looks back on" = reflects on the past.' },
      { opts: ['look through', 'look over', 'look at', 'look up'], a: 1, fb: '"Look over a document" = review or check it carefully for completeness. "Look through" also means read through, but "look over" is more standard for checking paperwork. "Look up" = find information in a reference source.' },
      { opts: ['look after', 'look for', 'look out for', 'look into'], a: 2, fb: '"Look out for signs" = be alert to, watch carefully for. It implies ongoing vigilance. "Look for" is a more active one-time search. "Look after" = care for. "Look into" = investigate a specific issue.' },
      { opts: ['look forward', 'look around', 'look up', 'look into'], a: 2, fb: '"Look up" (intransitive) = improve, get better. "Things are looking up" is a fixed expression for an improving situation. "Look forward" is incomplete without "to". "Look around" = explore a space.' },
      { opts: ['looks at', 'looks into', 'looks up to', 'looks forward to'], a: 3, fb: '"Looks forward to" = anticipates with pleasure. It is always followed by a noun or gerund: "looks forward to the programmes". "Looks up to" = admires, but its object must be a person, not a programme.' },
      { opts: ['looks into', 'looks over', 'looks at', 'looks back on'], a: 3, fb: '"Looks back on" = reflects on past experiences. It is followed by a time period or experience: "looks back on her beginnings". "Looks into" = investigates; "looks over" = reviews a document for errors.' },
    ],
  },
  {
    id: 'startup',
    title: 'Text C — A Design Studio',
    topic: 'Phrasal verbs: SET off · up — TAKE on · over · down — TURN out · into — TAKE off',
    parts: [
      'When two young designers decided to ', 0, ' their own creative studio, they knew the first months would be a challenge. They ', 1, ' at dawn to attend a trade fair in another city, hoping to impress potential clients. To everyone\'s surprise, they managed to ', 2, ' several demanding projects that more experienced firms had refused. The studio grew quickly, and within eighteen months a larger competitor attempted to ', 3, ' the business. The partners ', 4, ' the offer and chose instead to enter a prestigious international competition. That decision ', 5, ' to be the turning point in their careers: they won first prize. The recognition helped their small operation gradually ', 6, ' a globally recognised brand. They had finally ', 7, ' in the industry, attracting clients from across three continents.',
    ],
    questions: [
      { opts: ['open up', 'set up', 'start up', 'build up'], a: 1, fb: '"Set up a studio" = establish it from scratch. "Set up" is the standard business collocation. "Open up" is less formal. "Start up" works but is more common with tech companies. "Build up" = develop gradually over time, not from zero.' },
      { opts: ['went off', 'headed off', 'set off', 'moved off'], a: 2, fb: '"Set off" = begin a journey, depart. It specifically marks the moment of leaving. "Went off" suggests an alarm or something going wrong. "Headed off" is informal. "Moved off" is typically used for vehicles.' },
      { opts: ['take over', 'take up', 'take in', 'take on'], a: 3, fb: '"Take on" = accept or undertake work or a challenge. They accepted demanding projects. "Take over" = assume control of a company. "Take up" = start a hobby or occupy space. "Take in" = understand or absorb information.' },
      { opts: ['take up', 'take over', 'take in', 'take out'], a: 1, fb: '"Take over a business" = acquire control of it. The competitor tried to gain ownership. "Take up" = begin an activity. "Take in" = accommodate or understand. "Take out" = remove, or treat someone to a meal.' },
      { opts: ['turned away', 'turned down', 'turned off', 'turned out'], a: 1, fb: '"Turn down an offer" = refuse, reject it. The partners rejected the competitor\'s proposal. "Turn away" = refuse entry to someone. "Turn off" = switch off or repel someone. "Turn out" = prove to be, or attend an event.' },
      { opts: ['turned up', 'turned around', 'turned into', 'turned out'], a: 3, fb: '"Turned out to be" = proved to be. This is a fixed expression showing a result: "it turned out to be a turning point". "Turned into" = transformed into (but is not followed by "to be"). "Turned up" = arrived unexpectedly.' },
      { opts: ['turn into', 'grow into', 'change into', 'develop into'], a: 0, fb: '"Turn into" = transform into, become (a complete change of nature or identity). "Turn into a recognised brand" describes a dramatic transformation. The other options are possible but "turn into" is the specific phrasal verb for this type of change.' },
      { opts: ['taken over', 'taken up', 'taken part', 'taken off'], a: 3, fb: '"Take off" = become successful or popular very quickly (business/career context). "The studio had taken off" = it had started flourishing. "Taken over" = gained control. "Taken up" = started an activity. "Taken part" needs "in": "taken part in".' },
    ],
  },
  {
    id: 'travel_planning',
    title: 'Text D — Travelling Smart',
    topic: 'Connectors: in advance · in addition to · regardless of · instead of · in case of · just in case · despite · upon',
    parts: [
      'Planning a trip abroad requires careful preparation well ', 0, ' of your departure date. ', 1, ' booking flights and accommodation, travellers should research the local customs and entry requirements of their destination. ', 2, ' the length of the journey, it is always wise to carry enough water and snacks. Some travellers prefer staying in hostels ', 3, ' more expensive hotels, as they offer a more social atmosphere. ', 4, ' an emergency, it is essential to have travel insurance and a list of important contacts. Many airlines recommend arriving at the airport at least two hours early, ', 5, ' there are any unexpected queues or delays. ', 6, ' her limited budget, Sara managed to visit five countries in a single summer. ', 7, ' returning home, she immediately began planning her next adventure.',
    ],
    questions: [
      { opts: ['beforehand', 'previously', 'ahead', 'in advance'], a: 3, fb: '"Well in advance of your departure date" = a long time before the date. "In advance" is the fixed expression for doing something before a future event. "Ahead" would need "well ahead of" (possible but less standard). "Beforehand" does not collocate with "of".' },
      { opts: ['Besides', 'As well as', 'In addition to', 'Together with'], a: 2, fb: '"In addition to" + gerund = as well as. All options express addition, but "in addition to" is the most formal and most common in FCE texts. "Besides" is slightly more informal. "As well as" emphasises equal importance. "Together with" suggests accompaniment.' },
      { opts: ['Although', 'Regardless of', 'Despite', 'Even if'], a: 1, fb: '"Regardless of the length" = no matter how long the journey is. "Regardless of" dismisses a variable as irrelevant to the conclusion. "Despite" also works: "despite the length". "Although" needs a full clause: "although the journey is long".' },
      { opts: ['rather than', 'instead of', 'in place of', 'other than'], a: 1, fb: '"Instead of more expensive hotels" = in place of, as a substitute for. "Instead of" is the most natural collocation here. "Rather than" is valid but more literary. "In place of" is more formal and less common in everyday FCE texts.' },
      { opts: ['Just in case', 'If there is', 'In the event of', 'In case of'], a: 3, fb: '"In case of an emergency" = in the event that an emergency occurs. "In case of" + noun is a fixed formal expression. "In the event of" is a synonym but more formal. "Just in case" is followed by a clause, not a bare noun.' },
      { opts: ['in order to', 'so that', 'just in case', 'to prepare'], a: 2, fb: '"Just in case there are any unexpected queues" = as a precaution against that possibility. "Just in case" introduces a precautionary reason. "In order to" expresses purpose aimed at achieving something. "So that" introduces a result or purpose clause.' },
      { opts: ['In spite of', 'Regardless of', 'Although', 'Despite'], a: 3, fb: '"Despite her limited budget" = even though her budget was small. "Despite" + noun/gerund introduces a concessive contrast. "In spite of" is a synonym and also correct. "Although" needs a full clause: "although her budget was limited".' },
      { opts: ['Upon', 'After', 'When', 'On'], a: 0, fb: '"Upon returning home" = immediately on returning. "Upon" + gerund is a formal way of expressing that one action follows another immediately. "On returning" is also correct and common in formal writing. "After returning" is slightly less concise.' },
    ],
  },
  {
    id: 'amazon',
    title: 'Text E — The Amazon Rainforest',
    topic: 'Prepositions of place: across · along · beneath · above · within · among · through · beyond',
    parts: [
      'The Amazon rainforest stretches ', 0, ' nine South American countries and covers more than five million square kilometres. Botanists who venture deep into the jungle, walking ', 1, ' narrow trails for hours, often emerge with specimens of previously unknown plants. Many rare species survive ', 2, ' the forest floor, in conditions of near-total darkness. The great canopy high ', 3, ' creates a unique microclimate that scientists are still working to understand. Communities of indigenous people have lived ', 4, ' these forests for thousands of years, developing extraordinary knowledge of medicinal plants. Some of the most valuable research is conducted ', 5, ' the river systems that cut ', 6, ' the heart of the forest. Protecting the Amazon is a challenge that extends well ', 7, ' the borders of any single nation and requires genuine global cooperation.',
    ],
    questions: [
      { opts: ['across', 'through', 'among', 'along'], a: 0, fb: '"Stretches across nine countries" = extends over the territory of nine countries. "Across" expresses coverage over a wide horizontal space. "Along" suggests following a line. "Through" implies entering and exiting. "Among" is for items within a discrete group.' },
      { opts: ['through', 'across', 'between', 'along'], a: 3, fb: '"Walking along narrow trails" = following the trails, moving on or beside them. "Along" is the correct preposition for movement that follows a linear path. "Through" would suggest moving inside something with obstacles blocking the way.' },
      { opts: ['beneath', 'below', 'under', 'behind'], a: 0, fb: '"Survive beneath the forest floor" = live at a level lower than the forest floor. "Beneath" is more formal than "below" or "under" and is preferred in scientific or literary writing. All three express the same position, but "beneath" is the register-appropriate choice.' },
      { opts: ['above', 'over', 'on top', 'up'], a: 0, fb: '"The canopy high above" = the canopy at a great height over the observer. "Above" is the correct preposition for static vertical position. "Over" often implies movement or coverage. "On top" needs "of". "Up" is directional, not locational.' },
      { opts: ['between', 'among', 'within', 'through'], a: 2, fb: '"Have lived within these forests" = inside the limits or bounds of the forests. "Within" emphasises being contained in a defined geographic space. "Among" suggests being surrounded by many individual items rather than inside a defined territory.' },
      { opts: ['on', 'along', 'across', 'over'], a: 1, fb: '"Conducted along the river systems" = carried out following or beside the rivers. "Along" indicates proximity to a linear geographic feature. "Across" implies crossing from one side to the other. "On" suggests directly on the surface.' },
      { opts: ['across', 'through', 'into', 'beyond'], a: 1, fb: '"Rivers that cut through the heart of the forest" = rivers that pass all the way through the middle. "Cut through" is a fixed collocation meaning to pass through by dividing. "Across" would suggest crossing from one side to the other at a surface level.' },
      { opts: ['past', 'over', 'above', 'beyond'], a: 3, fb: '"Extends beyond the borders" = goes further than, exceeds the limits of. "Beyond" indicates going past a boundary into territory on the other side. "Past" is also possible but "beyond" is more formal and emphatic. "Over" and "above" do not collocate with "extends" in this context.' },
    ],
  },
];

/* ─── Word Formation ─── */
const WORD_FORM: WFSet[] = [
  {
    id: 'repair_movement',
    title: 'Passage 1 — The Repair Movement',
    topic: 'Community & Sustainability',
    passage: 'Repair cafés are (1)_____ [ORGANISE] events where volunteers meet to fix broken household objects together. The movement reflects a growing (2)_____ [AWARE] of how much perfectly usable material modern society wastes. Participants often arrive feeling (3)_____ [HOPE] about a broken item, only to leave with it fully restored. The cafés also serve as a place of (4)_____ [LEARN], where technical skills are shared freely between generations. Many regular visitors describe the experience as deeply (5)_____ [REWARD] not just practically, but socially. The (6)_____ [FOUND] of a repair café in a neighbourhood can transform how residents relate to one another. Events are typically (7)_____ [ACCESS] to all income groups, since there is no entry charge. Beyond fixing objects, these spaces challenge the (8)_____ [ASSUME] that broken always means worthless.',
    questions: [
      { ctx: '(1)_____ events where volunteers meet', base: 'ORGANISE', opts: ['organise', 'organised', 'organisation', 'organising'], a: 1, fb: 'ORGANISE → organised (past participle as adjective). "Organised events" = planned, structured events. An adjective is needed before "events". "Organisation" is a noun; "organise" is a verb; "organising" is a gerund or present participle.' },
      { ctx: 'a growing (2)_____ of how much', base: 'AWARE', opts: ['aware', 'awareness', 'unawareness', 'unaware'], a: 1, fb: 'AWARE → awareness (noun). "A growing ___" requires a noun after the article and adjective. "Awareness" is the noun form. "Aware" is an adjective; "unaware" is also an adjective (negative). "Growing awareness of" is a standard academic collocation.' },
      { ctx: 'often arrive feeling (3)_____', base: 'HOPE', opts: ['hopeful', 'hopefully', 'hopeless', 'hopelessly'], a: 2, fb: 'HOPE → hopeless (adjective + negative suffix -less). The context says they arrive feeling negative ("only to leave with it fully restored" implies they expected failure). "Hopeless" = without hope. "Hopeful" = optimistic, which contradicts the context.' },
      { ctx: 'serve as a place of (4)_____', base: 'LEARN', opts: ['learner', 'learning', 'learned', 'learn'], a: 1, fb: 'LEARN → learning (gerund used as noun). "A place of ___" requires a noun. "Learning" here means the activity or process of gaining knowledge. "Learner" is a person noun, not the activity itself.' },
      { ctx: 'describe the experience as deeply (5)_____', base: 'REWARD', opts: ['reward', 'rewarded', 'rewarding', 'rewardingly'], a: 2, fb: 'REWARD → rewarding (present participle as adjective). "Deeply rewarding" = very fulfilling. After "as", an adjective is needed as a subject complement. "Rewarding" describes something that gives satisfaction. "Rewarded" describes a person who receives a reward.' },
      { ctx: 'the (6)_____ of a repair café', base: 'FOUND', opts: ['founder', 'foundation', 'found', 'founding'], a: 1, fb: 'FOUND → foundation (noun). "The ___ of a repair café" — "the" + noun is needed. "Foundation" = the act of establishing something. "Founder" is a person noun; "founding" is also possible but "foundation" is the standard noun for the act of creating an institution.' },
      { ctx: 'Events are typically (7)_____ to all', base: 'ACCESS', opts: ['access', 'accessibility', 'inaccessible', 'accessible'], a: 3, fb: 'ACCESS → accessible (adjective). "Typically ___ to all" requires an adjective after the linking verb. "Accessible to all" = available to everyone without barriers. "Inaccessible" is the negative opposite. "Accessibility" is a noun; "access" is a noun or verb.' },
      { ctx: 'challenge the (8)_____ that broken', base: 'ASSUME', opts: ['assumption', 'assume', 'assumed', 'assuming'], a: 0, fb: 'ASSUME → assumption (noun). "The ___ that..." requires a noun before the that-clause. "Assumption" = something taken to be true without proof. "Assume" is a verb; "assumed" is a past participle; "assuming" is a gerund or conjunction.' },
    ],
  },
  {
    id: 'safari_tourism',
    title: 'Passage 2 — Safari Tourism',
    topic: 'Nature & Travel',
    passage: 'Going on safari is one of the most (1)_____ [MEMORY] experiences a traveller can have. The (2)_____ [PROTECT] of natural habitats is essential to ensure that future generations can witness wildlife in its natural surroundings. Responsible safari companies make a genuine (3)_____ [COMMIT] to minimising their impact on the environment. Guides are trained to behave (4)_____ [RESPECT] towards all animals, keeping vehicles at a safe distance. Some tourists are initially (5)_____ [APPOINT] by the amount of time spent waiting, only to be rewarded with extraordinary sightings. The economic (6)_____ [CONTRIBUTE] of eco-tourism to local communities can be (7)_____ [SIGNIFY], funding schools and healthcare. Wildlife photography has also grown in (8)_____ [POPULAR], attracting visitors who come specifically to document what they see.',
    questions: [
      { ctx: 'one of the most (1)_____ experiences', base: 'MEMORY', opts: ['memorable', 'memory', 'memorably', 'memorise'], a: 0, fb: 'MEMORY → memorable (adjective). "The most ___" requires a superlative adjective. "Memorable" = worth remembering, unforgettable. The suffix -able creates an adjective from a noun. "Memory" is the base noun; "memorably" is an adverb; "memorise" is a verb.' },
      { ctx: 'the (2)_____ of natural habitats', base: 'PROTECT', opts: ['protective', 'protect', 'protector', 'protection'], a: 3, fb: 'PROTECT → protection (noun). "The ___ of natural habitats" requires a noun after the article. "Protection" is the noun form. "Protective" is an adjective; "protector" is a person noun; "protect" is a verb.' },
      { ctx: 'make a genuine (3)_____', base: 'COMMIT', opts: ['commit', 'committed', 'committing', 'commitment'], a: 3, fb: 'COMMIT → commitment (noun). "A genuine ___" requires a noun. "Make a commitment to" is a fixed collocation. "Committed" is an adjective/participle meaning dedicated; "commit" is a verb; "committing" is a gerund.' },
      { ctx: 'trained to behave (4)_____ towards', base: 'RESPECT', opts: ['respectfully', 'respect', 'respectful', 'respectable'], a: 0, fb: 'RESPECT → respectfully (adverb). "Behave ___" requires an adverb to modify the verb "behave". "Respectfully" = in a respectful manner. "Respectful" is an adjective; "respectable" = deserving respect (about reputation); "respect" is a noun or verb.' },
      { ctx: 'some tourists are initially (5)_____', base: 'APPOINT', opts: ['disappointed', 'appointed', 'disappointing', 'disappointment'], a: 0, fb: 'APPOINT → disappointed (adjective, with prefix dis-). "Are initially ___" requires an adjective after the linking verb. "Disappointed" describes how a person feels. Note the negative prefix dis- + appoint. "Disappointing" describes the thing that causes the feeling, not the person feeling it.' },
      { ctx: 'the economic (6)_____ of eco-tourism', base: 'CONTRIBUTE', opts: ['contributor', 'contribution', 'contributed', 'contributing'], a: 1, fb: 'CONTRIBUTE → contribution (noun). "The ___ of eco-tourism" requires a noun. "Economic contribution" = the financial value provided. "Contributor" is a person noun; "contributed" is a past participle; "contributing" is a present participle.' },
      { ctx: 'can be (7)_____, funding schools', base: 'SIGNIFY', opts: ['significantly', 'significance', 'signify', 'significant'], a: 3, fb: 'SIGNIFY → significant (adjective). "Can be ___" requires a subject complement — an adjective. "Significant" = important, noteworthy. "Significantly" is an adverb; "significance" is a noun; "signify" is a verb.' },
      { ctx: 'has also grown in (8)_____', base: 'POPULAR', opts: ['popularise', 'popularly', 'popularity', 'popular'], a: 2, fb: 'POPULAR → popularity (noun). "Grown in ___" requires a noun. "Grow in popularity" is a fixed collocation meaning to become more popular over time. "Popularly" is an adverb; "popularise" is a verb; "popular" is an adjective.' },
    ],
  },
  {
    id: 'lifelong_learning',
    title: 'Passage 3 — Lifelong Learning',
    topic: 'Education & Personal Development',
    passage: 'Lifelong learning — the idea that (1)_____ [EDUCATE] does not stop after school — is gaining recognition worldwide. Research consistently shows that adults who continue to study new subjects demonstrate greater (2)_____ [ADAPT] in the workplace. Many companies now offer (3)_____ [TRAIN] programmes to help employees develop new competencies. There is growing (4)_____ [AGREE] among experts that curiosity and the (5)_____ [WILL] to learn are as important as formal qualifications. Some individuals face (6)_____ [SIGNIFY] barriers to continuing their education, including time constraints and financial pressures. Online platforms have reduced these (7)_____ [RESTRICT] by offering (8)_____ [FLEX] courses that learners can complete at their own pace.',
    questions: [
      { ctx: 'the idea that (1)_____ does not stop', base: 'EDUCATE', opts: ['education', 'educate', 'educational', 'educator'], a: 0, fb: 'EDUCATE → education (noun). "That ___ does not stop" — the subject of the clause must be a noun. "Education" = the process of receiving or giving instruction. "Educational" is an adjective; "educator" is a person noun; "educate" is a verb.' },
      { ctx: 'demonstrate greater (2)_____ in the workplace', base: 'ADAPT', opts: ['adaptable', 'adaptation', 'adaptability', 'adapt'], a: 2, fb: 'ADAPT → adaptability (noun). "Greater ___" requires a noun after the adjective. "Adaptability" = the quality of being able to adjust to new conditions. "Adaptable" is an adjective; "adaptation" refers to a specific change, not a quality; "adapt" is a verb.' },
      { ctx: 'now offer (3)_____ programmes', base: 'TRAIN', opts: ['trainer', 'training', 'trained', 'trainee'], a: 1, fb: 'TRAIN → training (noun used as modifier). "Training programmes" = programmes that develop skills. "Training" is a noun adjunct before "programmes". "Trainer" is a person; "trained" is an adjective (already trained); "trainee" is someone currently being trained.' },
      { ctx: 'there is growing (4)_____ among experts', base: 'AGREE', opts: ['agreeable', 'agreement', 'disagree', 'agreeing'], a: 1, fb: 'AGREE → agreement (noun). "A growing ___" requires a noun. "There is growing agreement that..." is a standard academic phrase meaning experts are increasingly aligned on a topic. "Agreeable" is an adjective; "disagree" is a verb with the opposite meaning.' },
      { ctx: 'the (5)_____ to learn', base: 'WILL', opts: ['willingness', 'willing', 'unwillingness', 'unwilling'], a: 0, fb: 'WILL → willingness (noun). "The ___ to learn" — "the" + noun + infinitive is a fixed structure. "Willingness" = the quality of being ready and eager to do something. "Willing" is an adjective; "unwillingness" is the negative noun form, which contradicts the positive context.' },
      { ctx: 'face (6)_____ barriers', base: 'SIGNIFY', opts: ['signified', 'significance', 'significant', 'significantly'], a: 2, fb: 'SIGNIFY → significant (adjective). "Face ___ barriers" requires an adjective to modify "barriers". "Significant" = important, considerable. "Significance" is a noun; "significantly" is an adverb; "signified" is a past participle of the verb.' },
      { ctx: 'reduced these (7)_____', base: 'RESTRICT', opts: ['restrict', 'restrictive', 'restrictions', 'restricted'], a: 2, fb: 'RESTRICT → restrictions (plural noun). "These ___" — the demonstrative "these" requires a plural noun to follow. "Restrictions" = limitations or obstacles. "Restrictive" is an adjective; "restricted" is a past participle; "restrict" is a verb.' },
      { ctx: 'by offering (8)_____ courses', base: 'FLEX', opts: ['flex', 'flexible', 'inflexible', 'flexibility'], a: 1, fb: 'FLEX → flexible (adjective). "___ courses" requires an adjective before "courses". "Flexible courses" = courses adaptable to the learner\'s schedule. "Inflexible" is the negative opposite; "flexibility" is a noun; "flex" is a verb or very informal noun.' },
    ],
  },
];

/* ─── Style helpers ─── */
function bsC(done: boolean, correct: boolean, selected: boolean) {
  if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
  if (correct) return { background: 'rgba(5,150,105,0.1)', border: `1px solid ${CG}`, color: CG };
  if (selected) return { background: 'rgba(220,38,38,0.08)', border: `1px solid ${CR}`, color: CR };
  return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
}

function bsWF(done: boolean, correct: boolean, selected: boolean) {
  if (!done) return { background: 'var(--bg-2)', border: `1px solid ${CP}33`, color: 'var(--ink)' };
  if (correct) return { background: 'rgba(124,58,237,0.1)', border: `1px solid ${CP}`, color: CP };
  if (selected) return { background: 'rgba(220,38,38,0.08)', border: `1px solid ${CR}`, color: CR };
  return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
}

/* ─── Main ─── */
export default function UsoDelIdioma() {
  const [tab, setTab] = useState<'cloze' | 'wordform'>('cloze');
  const [clozeIdx, setClozeIdx] = useState(0);
  const [wfIdx, setWfIdx] = useState(0);
  const [clozeAns, setClozeAns] = useState<Record<string, Record<number, number>>>({});
  const [wfAns, setWfAns] = useState<Record<string, Record<number, number>>>({});

  const cs = CLOZE[clozeIdx];
  const ws = WORD_FORM[wfIdx];
  const csAns = clozeAns[cs.id] ?? {};
  const wsAns = wfAns[ws.id] ?? {};

  function setClozeQ(qi: number, oi: number) {
    if (csAns[qi] !== undefined) return;
    setClozeAns(prev => ({ ...prev, [cs.id]: { ...(prev[cs.id] ?? {}), [qi]: oi } }));
  }
  function setWFQ(qi: number, oi: number) {
    if (wsAns[qi] !== undefined) return;
    setWfAns(prev => ({ ...prev, [ws.id]: { ...(prev[ws.id] ?? {}), [qi]: oi } }));
  }

  const csAnswered = cs.questions.filter((_, i) => csAns[i] !== undefined).length;
  const csCorrect = cs.questions.filter((q, i) => csAns[i] === q.a).length;
  const wsAnswered = ws.questions.filter((_, i) => wsAns[i] !== undefined).length;
  const wsCorrect = ws.questions.filter((q, i) => wsAns[i] === q.a).length;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 840 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés</Link>
          <span>/</span>
          <Link href="/practica/ingles/b2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>B2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>Use of English</span>
        </div>

        {/* Header */}
        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Inglés B2 — FCE / uso del idioma</p>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.3rem' }}>Use of English</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.93rem', margin: '0 0 1.75rem', lineHeight: 1.6, maxWidth: 580 }}>
          Dos tipos de ejercicio del FCE B2: cloze de opción múltiple y formación de palabras.
        </p>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button
            onClick={() => setTab('cloze')}
            className={tab === 'cloze' ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
            style={{ fontSize: '0.88rem', ...(tab === 'cloze' ? { background: C, borderColor: C } : {}) }}>
            📖 Multiple Choice Cloze
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.75, marginLeft: '0.35rem' }}>FCE Part 1 · ICFES</span>
          </button>
          <button
            onClick={() => setTab('wordform')}
            className={tab === 'wordform' ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
            style={{ fontSize: '0.88rem', ...(tab === 'wordform' ? { background: CP, borderColor: CP } : {}) }}>
            🔤 Word Formation
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.75, marginLeft: '0.35rem' }}>FCE Part 3</span>
          </button>
        </div>

        {/* ═══════════════════════════════════════
            MULTIPLE CHOICE CLOZE
        ════════════════════════════════════════ */}
        {tab === 'cloze' && (
          <div>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span>📖</span>
              <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Completa el texto</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                {csAnswered}/{cs.questions.length}
                {csAnswered === cs.questions.length && (
                  <span style={{ color: CG, fontWeight: 700, marginLeft: '0.4rem' }}>· {csCorrect} correctas</span>
                )}
              </span>
            </div>

            {/* Instruction */}
            <div style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: `3px solid ${C}`, marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Lee el texto y elige la palabra (A, B, C o D) que mejor completa cada hueco numerado.
            </div>

            {/* Text navigation */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {CLOZE.map((s, i) => {
                const done = (clozeAns[s.id] ?? {});
                const answered = s.questions.filter((_, qi) => done[qi] !== undefined).length;
                const allDone = answered === s.questions.length;
                const correct = s.questions.filter((q, qi) => done[qi] === q.a).length;
                return (
                  <button key={s.id} onClick={() => setClozeIdx(i)}
                    className={clozeIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{ fontSize: '0.78rem', ...(clozeIdx === i ? { background: C, borderColor: C } : {}), position: 'relative' }}>
                    {s.title.split('—')[0].trim()}
                    {allDone && (
                      <span style={{ marginLeft: '0.3rem', fontSize: '0.65rem', fontFamily: 'var(--mono)', color: clozeIdx === i ? '#ffffffcc' : CG }}>
                        {correct}/8
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Passage card */}
            <div style={{ padding: '1.25rem 1.5rem', borderRadius: 16, background: `${C}06`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                {cs.topic}
              </div>
              <h2 style={{ margin: '0 0 0.9rem', fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{cs.title}</h2>
              <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 2, color: 'var(--ink)' }}>
                {cs.parts.map((part, pi) => {
                  if (typeof part === 'string') return <span key={pi}>{part}</span>;
                  const qi = part;
                  const ans = csAns[qi];
                  const done = ans !== undefined;
                  const correct = done && ans === cs.questions[qi].a;
                  return (
                    <span key={pi} style={{
                      display: 'inline-block', minWidth: 88, margin: '0 3px',
                      padding: '0.05rem 0.5rem', borderRadius: 6,
                      fontWeight: 800, fontSize: '0.88rem', textAlign: 'center',
                      background: done ? (correct ? 'rgba(5,150,105,0.12)' : 'rgba(220,38,38,0.1)') : `${C}14`,
                      color: done ? (correct ? CG : CR) : C,
                      border: `1.5px solid ${done ? (correct ? CG : CR) : C}55`,
                    }}>
                      {done ? cs.questions[qi].opts[ans] : `(${qi + 1})`}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Questions */}
            {cs.questions.map((q, qi) => {
              const ans = csAns[qi];
              const done = ans !== undefined;
              return (
                <div key={qi} style={{
                  padding: '0.9rem 1.1rem', borderRadius: 12, marginBottom: '0.65rem',
                  border: `1.5px solid ${done ? (ans === q.a ? '#05966933' : '#dc262633') : 'var(--line-soft)'}`,
                  background: done ? (ans === q.a ? 'rgba(5,150,105,0.025)' : 'rgba(220,38,38,0.025)') : 'var(--bg)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontFamily: 'var(--mono)', fontSize: '0.8rem', color: C, minWidth: 24 }}>({qi + 1})</span>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', flex: 1 }}>
                      {q.opts.map((opt, oi) => (
                        <button key={oi} onClick={() => setClozeQ(qi, oi)} disabled={done}
                          style={{
                            padding: '0.35rem 0.85rem', borderRadius: 8,
                            fontSize: '0.87rem', fontWeight: 700,
                            cursor: done ? 'default' : 'pointer',
                            fontFamily: 'inherit', transition: 'all 0.12s',
                            minWidth: 66,
                            ...bsC(done, oi === q.a, ans === oi),
                          }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', opacity: 0.65, marginRight: '0.25rem' }}>
                            {['A', 'B', 'C', 'D'][oi]}.
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {done && (
                    <div style={{
                      marginTop: '0.45rem', marginLeft: '2.2rem',
                      fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55,
                      padding: '0.3rem 0.55rem', borderRadius: 6,
                      background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)',
                    }}>
                      {ans === q.a ? '✅ ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Score panel */}
            {csAnswered === cs.questions.length && (
              <div style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: 16, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>
                  {csCorrect === 8 ? '🏆' : csCorrect >= 6 ? '⭐' : '📖'}
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>
                  {csCorrect} / {cs.questions.length}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: clozeIdx < CLOZE.length - 1 ? '1rem' : 0 }}>
                  {csCorrect === 8 ? 'Perfect score. Excellent awareness of connectors and collocations.' : csCorrect >= 6 ? 'Good. Review the items you missed above.' : 'Re-read the explanations and pay attention to what follows each connector (noun or full clause?).'}
                </div>
                {clozeIdx < CLOZE.length - 1 && (
                  <button className="btn btn-sm" onClick={() => setClozeIdx(i => i + 1)} style={{ background: C, borderColor: C }}>
                    Siguiente texto →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════
            WORD FORMATION
        ════════════════════════════════════════ */}
        {tab === 'wordform' && (
          <div>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span>🔤</span>
              <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Formación de palabras</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                {wsAnswered}/{ws.questions.length}
                {wsAnswered === ws.questions.length && (
                  <span style={{ color: CP, fontWeight: 700, marginLeft: '0.4rem' }}>· {wsCorrect} correctas</span>
                )}
              </span>
            </div>

            {/* Instruction */}
            <div style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: `3px solid ${CP}`, marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Usa la palabra base entre corchetes para formar la palabra correcta que complete cada hueco.
            </div>

            {/* Passage navigation */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {WORD_FORM.map((s, i) => {
                const done = (wfAns[s.id] ?? {});
                const answered = s.questions.filter((_, qi) => done[qi] !== undefined).length;
                const allDone = answered === s.questions.length;
                const correct = s.questions.filter((q, qi) => done[qi] === q.a).length;
                return (
                  <button key={s.id} onClick={() => setWfIdx(i)}
                    className={wfIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{ fontSize: '0.78rem', ...(wfIdx === i ? { background: CP, borderColor: CP } : {}) }}>
                    Passage {i + 1}
                    {allDone && (
                      <span style={{ marginLeft: '0.3rem', fontSize: '0.65rem', fontFamily: 'var(--mono)', color: wfIdx === i ? '#ffffffcc' : CP }}>
                        {correct}/8
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Passage card */}
            <div style={{ padding: '1.25rem 1.5rem', borderRadius: 16, background: `${CP}06`, border: `1.5px solid ${CP}22`, marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: CP, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                {ws.topic}
              </div>
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{ws.title}</h2>
              <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.9, color: 'var(--ink)' }}>{ws.passage}</p>
            </div>

            {/* Questions */}
            {ws.questions.map((q, qi) => {
              const ans = wsAns[qi];
              const done = ans !== undefined;
              return (
                <div key={qi} style={{
                  padding: '0.9rem 1.1rem', borderRadius: 12, marginBottom: '0.65rem',
                  border: `1.5px solid ${done ? (ans === q.a ? `${CP}44` : '#dc262633') : 'var(--line-soft)'}`,
                  background: done ? (ans === q.a ? `${CP}06` : 'rgba(220,38,38,0.025)') : 'var(--bg)',
                }}>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontFamily: 'var(--mono)', fontSize: '0.8rem', color: CP, minWidth: 24, paddingTop: '0.1rem' }}>({qi + 1})</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.6 }}>&ldquo;{q.ctx}&rdquo;</span>
                      {' '}
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 800, color: CP, background: `${CP}12`, padding: '0.1rem 0.4rem', borderRadius: 5 }}>
                        [{q.base}]
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', paddingLeft: '1.75rem' }}>
                    {q.opts.map((opt, oi) => (
                      <button key={oi} onClick={() => setWFQ(qi, oi)} disabled={done}
                        style={{
                          padding: '0.35rem 0.85rem', borderRadius: 8,
                          fontSize: '0.87rem', fontWeight: 700,
                          cursor: done ? 'default' : 'pointer',
                          fontFamily: 'inherit', transition: 'all 0.12s',
                          ...bsWF(done, oi === q.a, ans === oi),
                        }}>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    ))}
                  </div>
                  {done && (
                    <div style={{
                      marginTop: '0.45rem', marginLeft: '1.75rem',
                      fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55,
                      padding: '0.3rem 0.55rem', borderRadius: 6,
                      background: ans === q.a ? `${CP}08` : 'rgba(220,38,38,0.07)',
                    }}>
                      {ans === q.a ? '✅ ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Score panel */}
            {wsAnswered === ws.questions.length && (
              <div style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: 16, border: `2px solid ${CP}33`, background: `${CP}06`, textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>
                  {wsCorrect === 8 ? '🏆' : wsCorrect >= 6 ? '⭐' : '📖'}
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>
                  {wsCorrect} / {ws.questions.length}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: wfIdx < WORD_FORM.length - 1 ? '1rem' : 0 }}>
                  {wsCorrect === 8 ? 'Excellent! You know your word forms.' : wsCorrect >= 6 ? 'Good. Review the explanations for missed items.' : 'Focus on identifying the required word class (noun? adjective? adverb?) before applying affixes.'}
                </div>
                {wfIdx < WORD_FORM.length - 1 && (
                  <button className="btn btn-sm" onClick={() => setWfIdx(i => i + 1)} style={{ background: CP, borderColor: CP }}>
                    Siguiente pasaje →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer tip */}
        <div style={{ marginTop: '2.5rem', padding: '0.85rem 1.1rem', borderRadius: 12, background: `${C}06`, border: `1px solid ${C}22`, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>FCE Tip:</strong>{' '}
          Para <strong>conectores</strong> (despite, unless, regardless of…), fíjate en la estructura que sigue: sustantivo/gerundio → <em>despite / in spite of / regardless of</em>; cláusula completa → <em>although / even though / unless</em>.
          Para <strong>phrasal verbs</strong>, cada partícula cambia el significado completamente: <em>look after</em> ≠ <em>look into</em> ≠ <em>look out for</em>. Apréndelos como unidad léxica, no palabra por palabra.
        </div>

      </div>
    </section>
  );
}
