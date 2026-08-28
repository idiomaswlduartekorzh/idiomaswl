/**
 * Original WeLearn discourse scaffolding for the 2026 Listening release.
 *
 * The authored set remains the source of every answer-bearing fact. These
 * insertions add the clarification, hesitation, recap and signposting density
 * found in a full listening paper without changing or replacing source text.
 */

const TARGET_PART_WORDS = 555;
const TIMING_REFERENCE_PART_WORDS = 700;

const BANKS: Readonly<Record<number, readonly (readonly string[])[]>> = {
  1: [
    [
      `{A}: Before we get into the individual details, I should explain how we normally handle an enquiry like this. I will ask about your priorities first, then check the practical arrangements, and finally read everything back. That way, if I have misunderstood something, we can correct it before anything is confirmed.

{B}: That sounds sensible. I have made a few notes, but some of the information I found online seemed to be out of date, so I would rather check it with a person.`,
      `{B}: I am not necessarily looking for the cheapest possibility. What matters more is whether the arrangement will work from week to week, because changing it later would be difficult. I would also prefer to know in advance which features are included and which ones require a separate payment.

{A}: Of course. I will distinguish between the standard service and any optional extras as we go.`,
      `{A}: People sometimes choose the first option they hear and then realise that a different one suited their routine better. I will therefore mention the alternatives, even when one appears more convenient at first. You do not need to decide immediately; ask me to repeat a comparison if it is not clear.

{B}: Thanks. I would like to consider the practical differences rather than just the description.`,
      `{B}: One other thing: my timetable can change at short notice, so I need arrangements that are reasonably predictable. I can plan around a fixed condition, but unexpected changes are harder to manage.

{A}: I understand. I will flag anything that depends on availability and separate it from what we can guarantee today.`,
      `{A}: Let me pause and review what I have entered so far. A verbal recap often catches small errors in names, dates or preferences that are easy to miss on a screen. Once we agree that the record is accurate, I will explain the next step and tell you what confirmation you should receive.

{B}: Good. I will listen carefully and stop you if anything sounds different from what I said.`,
    ],
    [
      `{A}: Just so you know what will happen during the call, I will first build a basic record, then narrow the available choices, and finally check the contact details. Nothing is reserved merely because we discuss it. A booking only becomes active after the final confirmation stage.

{B}: That is helpful. I was worried that asking about an option might commit me to it.`,
      `{B}: I have tried to think about what I genuinely need rather than what would simply be nice to have. Reliability is important, and I would rather avoid an arrangement that looks attractive but creates extra work later. If there is a common mistake people make, please point it out.

{A}: Certainly. I will explain the usual trade-offs as clearly as I can.`,
      `{A}: Some details sound similar when they are given quickly, especially where two choices share part of a name or operate on nearby dates. I will slow down for those and use the full wording. If you hear something that conflicts with your notes, please ask straight away rather than waiting until the end.

{B}: I will. Accuracy matters more to me than finishing the call quickly.`,
      `{B}: I may also need to coordinate this with another commitment, although I do not yet have the final schedule. A clear deadline would help me decide when I need to act.

{A}: No problem. Where a deadline applies, I will say whether it is a firm cut-off or simply the date we recommend.`,
      `{A}: Before we finish, I will summarise the selected arrangement, spell any unusual words and repeat the numbers in separate groups. I will also tell you which details can still be amended. That final check is part of our normal process, so please do not hesitate to correct even a very small point.

{B}: Perfect. I would much rather correct it now than discover a mistake later.`,
    ],
  ],
  2: [
    [
      `Before describing the individual areas, it is worth explaining the overall plan. The information is arranged in the same order that most visitors experience it, beginning with orientation and moving towards the more specialised facilities. You may, of course, explore differently, but knowing the intended sequence will make the later directions easier to follow.`,
      `A few arrangements have changed since the older printed material was produced. Staff have kept the familiar features that regular visitors value, while adjusting circulation and access where queues used to form. For that reason, please follow the signs you see today rather than relying on a map or leaflet from a previous visit.`,
      `As you move around, listen for the distinction between a permanent facility and an activity offered only at certain times. The permanent areas remain available throughout opening hours. Scheduled activities may require you to arrive a little earlier, and capacity can be limited even when participation itself does not cost anything.`,
      `Accessibility has been considered throughout the site. A shorter step-free route reaches the same principal areas, and staff can explain where it differs from the standard path. Families and larger groups should also leave a little more space at narrow points so that everyone can move safely without blocking an entrance or display.`,
      `Finally, do not try to remember every detail at once. The main points will be repeated in context, and staff at the information point can clarify practical matters later. What is most useful now is to understand the layout, the order of the principal activities, and any instruction that affects where or when you should arrive.`,
    ],
    [
      `Let me begin with some background to the way today has been organised. Rather than treating each facility as a separate attraction, the team has designed a connected route. Each stage prepares visitors for the next one, although there are clearly marked places where you can pause, shorten the route or rejoin a group.`,
      `Regular visitors may notice that several names have stayed the same while their functions have changed slightly. This was deliberate: familiar labels make the site easier to recognise, but the services behind them have been updated. Pay attention, therefore, to what is available now rather than assuming that an old name means an unchanged arrangement.`,
      `There is a useful difference between advice and a rule. Recommendations are intended to make the visit more comfortable, particularly at busy periods. Safety instructions, opening limits and staff-only boundaries are rules and apply even when an area appears quiet. Signs use different colours to make that distinction visible on the day.`,
      `Weather and visitor numbers can affect minor details, but the principal programme will continue. If a change becomes necessary, staff will announce the replacement before directing people away from the original location. Please wait for the complete announcement, as the first place mentioned may be the one that is closing rather than the alternative.`,
      `I will conclude this introduction by linking the practical details together. Think about where you begin, which direction you travel, and the point at which you need to make a choice. Once those three things are clear, the rest of the visit is straightforward, and you can concentrate on the experience rather than continually checking directions.`,
    ],
  ],
  3: [
    [
      `{A}: Before we settle on that interpretation, I think we should separate what the evidence actually shows from what we expected it to show. Our first idea may still be useful, but it should not determine how we describe the results.

{B}: Agreed. We can state the original expectation, then explain where the observations supported it and where they did not.`,
      `{B}: We should also be careful about the words we use for cause and association. Two things can change together without one necessarily producing the other, particularly when the sample is small or when participants choose their own groups.

{A}: Yes. If we present that limitation clearly, it strengthens the project rather than making it look weak.`,
      `{A}: Another issue is whether our categories are precise enough for someone else to repeat the procedure. We know what we meant because we designed it, but a reader only has the written definition.

{B}: Then let us include one concrete example and one borderline case. That should show where the category begins and ends.`,
      `{B}: The order of the presentation matters too. If we give every methodological detail before explaining the central question, the audience may lose the thread.

{A}: We could introduce the question first, give only the method needed to understand the finding, and place the remaining technical detail in a later slide or an appendix.`,
      `{A}: Let us finish by assigning a clear next action rather than saying we will both review everything. One person can check the data and references, while the other tests whether the explanation makes sense to somebody unfamiliar with the project.

{B}: Good idea. We can compare notes afterwards and only revise the sections where the two checks identify a problem.`,
    ],
    [
      `{A}: It may help to return to the research question before we discuss individual changes. A polished method is not useful if it measures something slightly different from what we set out to investigate.

{B}: True. We should write the question in one sentence and use it as a test for every decision we make from this point.`,
      `{B}: I am also wondering whether convenience influenced the sample more than we admitted. The people who were easiest to reach may share characteristics that matter to the result.

{A}: We cannot redesign the whole project now, but we can describe the sampling honestly and avoid claiming that the finding applies to everyone.`,
      `{A}: We have several interesting observations, although not all of them belong in the final account. Adding every point could make the main pattern harder to see.

{B}: Let us rank them by relevance to the question. We can keep the strongest evidence in the presentation and mention the secondary points only if someone asks.`,
      `{B}: When we rehearse, we should listen for transitions as well as timing. At the moment each section is understandable on its own, but the reason for moving from one to the next is not always explicit.

{A}: I will add a short linking sentence at each handover so the argument sounds continuous rather than divided between speakers.`,
      `{A}: Our final check should use the assessment criteria, not simply whether we like the finished version. We need evidence for each claim, consistent terminology and a conclusion that answers the question without exaggeration.

{B}: I will make a checklist from those points. Then we can sign off each item and know the revision is actually complete.`,
    ],
  ],
  4: [
    [
      `To place the subject in context, it helps to distinguish the familiar modern form from the longer process that produced it. What now appears stable often emerged through repeated experiments, local adaptations and occasional failures. A simple chronological list can hide those competing paths, so the discussion will focus on why particular changes mattered.`,
      `The evidence does not come from a single source. Researchers compare physical remains, written records, measurements and observations of related systems. Each source answers a different kind of question and carries its own uncertainty. Where two sources agree, confidence increases; where they differ, the disagreement can reveal an assumption that needs to be tested.`,
      `Scale is another important consideration. A process that works for one organism, one community or one small trial may behave differently across a region or over several generations. Throughout the lecture, examples at different scales will be compared so that a striking individual case is not mistaken for a universal rule.`,
      `It is also useful to notice the language of certainty. Some mechanisms are supported by direct observation, while others remain the best explanation available from indirect evidence. Scientific caution does not mean that every idea is equally likely. It means that conclusions should be as strong as the evidence allows, but no stronger.`,
      `At the end, the individual details can be brought back to three broader themes: the conditions that begin a change, the mechanisms that sustain it, and the consequences that appear later. Keeping those themes in mind will make it easier to connect examples that may initially seem separated by place, time or scale.`,
    ],
    [
      `Before examining the main stages, we need a clear definition of the phenomenon itself. Everyday language often combines several related processes under one convenient label. Researchers separate them because they have different causes and leave different kinds of evidence. That distinction will become important when we compare the examples later in the lecture.`,
      `Historical accounts can make development seem smoother than it really was. Successful approaches are documented and repeated, whereas abandoned experiments may leave fewer records. The result is a kind of hindsight bias. Reconstructing the full story requires attention to alternatives that were reasonable at the time, even though they did not become standard.`,
      `Environmental and social conditions also shape what is possible. The same idea may spread rapidly in one setting and remain impractical in another because materials, skills, incentives or physical limits differ. Rather than treating those differences as exceptions, we can use them to identify which conditions are essential and which are merely helpful.`,
      `Measurement presents a further challenge. Early observers often recorded what they could detect with the tools available, not necessarily the variable that later research considered most important. Modern instruments can reveal finer patterns, but comparison with older evidence still requires care so that a change in measurement is not confused with a change in reality.`,
      `The final section will consider why this topic matters beyond its immediate field. Its wider significance lies not in one isolated fact but in a pattern of adaptation, constraint and unintended consequence. That pattern offers a useful way to evaluate present decisions while remaining cautious about predictions that extend too far beyond the available evidence.`,
    ],
  ],
};

/**
 * Set 5 uses topic-specific discourse rather than the reusable density bank.
 * These passages add natural distractors, clarification and academic reasoning
 * without introducing any answer-bearing fact or changing evidence order.
 */
const SET_FIVE_ADDITIONS: Readonly<Record<number, readonly string[]>> = {
  1: [
    `AGENT: Before we compare the two routes, may I check whether anyone in your party has limited mobility? Most of the old town is accessible, but one narrow lane has several uneven steps, so the leader can use a parallel street when necessary.

CUSTOMER: No one needs a step-free route, although my mother prefers a steady pace.

AGENT: That will be fine. The leader pauses regularly to explain the buildings, so it never feels like a continuous hike.`,
    `CUSTOMER: What happens if the weather turns bad? The forecast looks changeable.

AGENT: We only cancel for severe conditions. Light rain is not usually a problem because part of the route passes through covered arcades. If we cancel, you can move the booking to another date or receive a refund. Groups are kept fairly small as well, so people can hear the commentary without crowding the pavement.

CUSTOMER: Good. I was hoping it would be informative rather than rushed.`,
    `AGENT: You may take photographs, but please stay with the group at road crossings. The leader cannot hold up the whole route if one guest falls far behind.

CUSTOMER: That is fair. Is there a place to sit during the walk?

AGENT: There are brief stops in two quiet courtyards. They are useful for anyone who needs a rest, and they give the leader time to answer questions.`,
    `CUSTOMER: I like having some background before I visit a place. Will the commentary assume that everyone already knows the city's history?

AGENT: Not at all. The leader introduces each period in plain language and explains how the streets changed over time. There is enough detail for people who are genuinely interested, but unfamiliar names are never presented as a list to memorise. Guests can ask questions at the longer stopping points, and the leader will distinguish a documented event from a local story.

CUSTOMER: That sounds much more engaging than simply following a route on my phone.

AGENT: That is what we aim for. We also ask guests to keep conversations quiet while an explanation is in progress, so everyone in the group can follow it.`,
    `CUSTOMER: If I need to leave before the end, should I tell the leader at the start?

AGENT: Yes, please. The route crosses several busy streets, so disappearing without a word can cause unnecessary concern. The leader can indicate a safe point where you can separate from the group.`,
  ],
  2: [
    `We organise the rota several weeks ahead, but you are not expected to attend every session. When you offer to help on a particular day, please arrive promptly and sign in before joining your team. This lets us account for everybody if an area has to close unexpectedly. New volunteers normally work beside someone experienced until they are familiar with the routine.`,
    `Please remember that this is a protected site rather than an ordinary public park. Keep to the marked routes, avoid disturbing nesting areas and never handle an animal unless a staff member has asked you to do so. If you are uncertain about a task, pause and ask. We value careful observation much more than completing a job quickly.`,
    `Most sessions begin with a short briefing at the main office. The team leader will explain the aim for the day, show you the area on a site map and check that each pair has the right tools. At the end, return all shared items and sign out, even if another team is still working. Please tell us in advance about any health issue that could affect outdoor work. We can often adapt a role, but we need enough notice to do so safely. You are also welcome to ask why a task is needed; understanding the purpose tends to produce more careful work.`,
    `The reserve keeps a record of what each team completes, but the purpose is to understand the condition of the site rather than to rank individuals by speed. Write down anything unexpected, including a task that could not be finished because the ground was unsuitable or an area was occupied by wildlife. A precise note is more useful than an optimistic guess. Please clean shared equipment before returning it, report damage instead of hiding it, and leave each work area as you found it. These habits allow the next team to begin safely and give staff reliable information when they plan later sessions. Questions are encouraged during the closing discussion, especially if an instruction seemed different in practice from the way it sounded indoors.`,
    `Finally, work at a pace that allows you to notice your surroundings. If conditions change or a boundary is unclear, stop the activity and contact the team leader. Responsible decisions in the field are part of the contribution, not a failure to complete the planned list.`,
  ],
  3: [
    `RYAN: Should we take readings at random points, or use the same distance between sites?

TUTOR: Use fixed intervals. Random sampling sounds attractive, but on a narrow estuary it could place most observations in one habitat by chance. Mark the positions on your map before you go, then take a preliminary reading at the first site to make sure the procedure is practical.

MEG: That should also make it easier to compare our results.`,
    `MEG: Do we all carry out every stage, or should we divide the work?

TUTOR: Work in pairs and rotate roles after each site. One person should operate the meter while the other records the value and checks the location. Rotation reduces the risk that one person's technique creates a pattern in the data.

RYAN: And if a reading looks unusual?

TUTOR: Repeat it once and keep both values. Do not silently replace an inconvenient result.`,
    `MEG: How much detail should go in the final report?

TUTOR: Enough for another group to follow your method. Explain where each site was, when the sample was taken and how the meter was used. Keep raw results separate from your comments.

RYAN: So we describe first and interpret later.

TUTOR: Exactly. That will make your reasoning much easier to check.`,
    `RYAN: Should we decide now what pattern we expect to see along the shore?

TUTOR: You may write a prediction, but keep it separate from the observations. If you expect one direction of change, you can become less attentive to a result that points elsewhere.

MEG: Would a simple table help us keep those stages apart?

TUTOR: Yes. Give the recorded values their own columns, then add brief field comments in a different space. When you return, plot the values before writing the explanation. The shape of the data may suggest a comparison you did not anticipate.

RYAN: And we should discuss an unusual point rather than delete it.

TUTOR: Precisely. Check whether it reflects a recording error, a local condition or genuine variation, and state which explanation the evidence supports.`,
    `MEG: It might be useful to compare our notes immediately after each site.

TUTOR: Do that briefly, but do not make the entries identical. Independent records can reveal a misunderstanding. Resolve any difference while the procedure is still fresh, and document the reason for the correction.`,
  ],
  4: [
    `An important distinction is that supporting honeybees is not automatically the same as supporting every urban pollinator. Many solitary species use different nesting sites and travel over shorter distances. If too many managed colonies are concentrated in one district, competition for forage can increase. Good planning therefore begins with an estimate of what the surrounding habitat can sustain, rather than simply adding as many colonies as space allows.`,
    `Researchers also examine movement between managed and wild populations. A dense network of colonies may allow parasites to spread more easily, particularly when equipment is exchanged between keepers. Regular inspection and careful record-keeping make unusual changes easier to detect. The most successful projects combine colony health data with observations of plant diversity, seasonal conditions and the abundance of other insects.`,
    `There is also a question of scale. A single well-run hive can be a useful teaching tool, yet a rapid rise in hive numbers across a whole city may have effects that no one project can see. Long-term studies compare districts and seasons rather than relying on one successful year. They also distinguish between the amount of honey produced and the health of the wider insect community, since those measures do not always move in the same direction.`,
    `For that reason, evaluation should begin before a new project is installed. Organisers can document the surrounding vegetation, note other insect species and agree how frequently colonies will be inspected. The same observations should continue afterwards, using a consistent method, so that change can be compared rather than remembered informally. Community projects are particularly valuable when their records are shared with researchers, because a network of carefully monitored sites can reveal variation that one location cannot. Even then, interpretation must remain cautious: a difference between districts may reflect weather, land use or management practice. The aim is not to prove that every urban colony is beneficial or harmful, but to identify the conditions under which a project can coexist responsibly with the broader ecosystem.`,
    `This approach also changes how success is communicated. A project should report setbacks and uncertainty alongside positive outcomes, and should revise its management when the observations justify doing so. Transparent records allow residents, keepers and ecologists to discuss the same evidence instead of relying on enthusiasm alone.`,
  ],
};

const CONTEXTS: Readonly<Record<number, readonly [string, string, string, string]>> = {
  1: ['pottery-course booking', 'harbour repair-hub briefing', 'campus-garden research project', 'urban-tree cooling lecture'],
  2: ['sports-facility booking', 'campus orientation talk', 'renewable-energy project', 'coral-reef ecosystems lecture'],
  3: ['library-membership enquiry', 'recycling-programme briefing', 'urban-farming seminar', 'history-of-writing lecture'],
  4: ['student-housing enquiry', 'natural-history museum visit', 'social-media research project', 'bird-migration lecture'],
  5: ['city-walk booking', 'volunteer induction', 'field-trip planning session', 'urban-beekeeping lecture'],
  6: ['bicycle-rental enquiry', 'leisure-centre tour', 'marketing coursework', 'history-of-tea lecture'],
  7: ['evening-course enrolment', 'museum audio tour', 'psychology experiment', 'sleep-science lecture'],
  8: ['lost-property report', 'community-festival briefing', 'business-plan tutorial', 'history-of-clocks lecture'],
  9: ['hotel reservation', 'company induction', 'nutrition study', 'volcano lecture'],
  10: ['job-agency registration', 'library orientation', 'architecture project', 'whale-migration lecture'],
  11: ['photography-workshop booking', 'backstage theatre tour', 'environmental essay', 'Roman-aqueduct lecture'],
  12: ['parking and travel-card enquiry', 'farm open-day talk', 'robotics project', 'colour-vision lecture'],
  13: ['gym registration', 'airport orientation', 'tourism dissertation', 'Antarctic-research lecture'],
  14: ['wedding-venue booking', 'charity fun-run briefing', 'geology fieldwork', 'paper-money lecture'],
  15: ['catering order', 'university clubs fair', 'education survey', 'coral-bleaching lecture'],
  16: ['summer-camp registration', 'recycling-scheme launch', 'engineering prototype', 'bird-navigation lecture'],
  17: ['home-repair booking', 'art-gallery tour', 'sports-science study', 'printing-press lecture'],
  18: ['book-club registration', 'nature-reserve welcome', 'linguistics presentation', 'desert-ecosystem lecture'],
  19: ['language-exchange booking', 'science-museum tour', 'film-studies project', 'energy-storage lecture'],
  20: ['study-room reservation', 'transport-museum guide', 'public-health campaign', 'history-of-chocolate lecture'],
};

function choose(setNumber: number, slot: number, values: readonly string[]) {
  return values[(setNumber * 7 + slot * 11) % values.length];
}

function dialoguePartOne(setNumber: number, context: string) {
  return [
    `{A}: Before we ${choose(setNumber, 1, ['start entering details', 'go through the individual choices', 'move on to the specific arrangements', 'begin the formal record'])}, I should explain how I handle a ${context}. I will ${choose(setNumber, 2, ['confirm your priorities first', 'begin with what matters most to you', 'check the main requirement first', 'establish the essential details first'])}, then compare the practical options, and finally read the record back. That gives us a chance to correct a misunderstanding before anything is confirmed.

{B}: That approach ${choose(setNumber, 3, ['sounds sensible', 'would be helpful', 'works well for me', 'is exactly what I need'])} for the ${context}. I made some notes beforehand, although I was not sure whether every detail I found still applied, so I would rather verify it during this conversation.`,
    `{B}: For this ${context}, I am ${choose(setNumber, 4, ['not simply looking for the cheapest possibility', 'trying to balance cost with convenience', 'more concerned about reliability than an impressive description', 'interested in what will work consistently'])}. I need to understand what the standard arrangement includes and what would count as an optional extra, because changing plans later could be inconvenient.

{A}: Of course. In this ${context}, I will ${choose(setNumber, 5, ['separate firm conditions from optional features', 'make each trade-off explicit as we proceed', 'distinguish what is included from what can be added', 'flag any condition that depends on availability'])}, and you can stop me whenever two alternatives sound too similar.`,
    `{A}: A ${context} can involve names, dates and choices that ${choose(setNumber, 6, ['sound alike when they are given quickly', 'are easy to confuse on a first hearing', 'differ in only one important detail', 'need to be compared rather than heard in isolation'])}. I will therefore use the full wording and repeat any number in a separate group. Please ask immediately if something conflicts with your notes.

{B}: I will. For the ${context}, ${choose(setNumber, 7, ['accuracy matters more than finishing quickly', 'I would prefer to correct a small point now', 'that will help me make a considered decision', 'it is useful to know which details are certain'])}, especially because I may need to coordinate this with another commitment.`,
    `{A}: Let me finish the ${context} by summarising what I have recorded. For this ${context}, I will ${choose(setNumber, 8, ['repeat the selected arrangement', 'review the choices in their final form', 'read back the information in order', 'separate confirmed details from pending ones'])}, spell any unusual word, and explain what happens next. The summary closes the ${context}, so even a minor correction is worth making now.

{B}: Good. During the ${context}, I will listen carefully and ${choose(setNumber, 9, ['interrupt if anything sounds different', 'check it against the notes I brought', 'confirm each point as you read it', 'make sure no assumption has slipped in'])}.`,
    `{B}: Before we close the ${context}, could you tell me how I should raise a question after today? I would prefer not to repeat the whole enquiry if one detail changes.

{A}: Certainly. Keep the reference on the confirmation and quote it when you contact us. A colleague can then see the agreed record, identify the single point that needs attention and explain whether the change affects anything else.`,
  ];
}

function monologuePartTwo(setNumber: number, context: string) {
  return [
    `Before describing the individual features of this ${context}, it is useful to understand the overall sequence. The information for the ${context} follows the order in which most people encounter the site or activity, ${choose(setNumber, 10, ['beginning with orientation and moving towards more specialised areas', 'starting with the shared facilities before turning to optional activities', 'moving from the arrival point to the places that need closer explanation', 'following the main route before considering possible variations'])}. Knowing that sequence will make the later directions and choices in the ${context} easier to follow.`,
    `Some arrangements connected with the ${context} may ${choose(setNumber, 11, ['look familiar while serving a slightly different purpose', 'have changed since older information was prepared', 'depend on the time of day or the number of visitors', 'operate differently during the present programme'])}. During the ${context}, listen for the difference between a permanent feature and something available only at a stated time. Where a condition in the ${context} is fixed, it will be presented as a rule; where there is flexibility, it will be described as a recommendation.`,
    `As the ${context} continues, ${choose(setNumber, 12, ['access and movement need to remain clear for everyone', 'staff may direct different groups along slightly different routes', 'a shorter route may reach the same principal areas', 'busy points may require visitors to leave additional space'])}. Within the ${context}, a change to a minor detail does not necessarily alter the main programme. If an alternative becomes necessary during the ${context}, wait for the full announcement before moving, because the first place mentioned may be the one that is no longer available.`,
    `Do not try to memorise every detail of the ${context} at once. ${choose(setNumber, 13, ['The key locations and decisions will be repeated in context', 'The most important instructions will return when they become relevant', 'Later examples will clarify the distinctions introduced here', 'The route will make more sense once its main stages are connected'])}. For now, concentrate on where the activity begins, which direction or sequence applies, and the point at which you may need to make a choice or ask a member of staff.`,
    `A final way to follow the ${context} is to separate descriptive information from an instruction that requires action. ${choose(setNumber, 22, ['Descriptions help you build a mental map, whereas instructions tell you when to move or decide', 'Background detail explains the setting, while a direct instruction changes what you should do next', 'Examples make the layout memorable, but only stated directions determine the route', 'General advice supports the visit, while a firm instruction must be followed'])}. Keeping those functions separate will prevent an interesting detail from being mistaken for a change to the programme.`,
    `If you become uncertain during the ${context}, pause at the next staffed point rather than following another group without checking. Explain the last location or instruction you clearly remember, and staff can reconnect you with the correct sequence. This is especially important when two activities begin near one another or when a temporary diversion changes only one section of the route. The programme is designed to allow questions, so asking for clarification will not make you miss the main activity.`,
  ];
}

function dialoguePartThree(setNumber: number, context: string) {
  return [
    `{A}: Before we settle on an interpretation for the ${context}, we should separate what the evidence actually shows from what we expected to find. Our first idea may still help organise the work, but it should not decide how we describe the result.

{B}: Agreed. For the ${context}, we can ${choose(setNumber, 14, ['state the initial expectation and then test it against each observation', 'return to the research question before revising the explanation', 'identify which claims are supported and which remain tentative', 'distinguish the central finding from our early assumptions'])}. That will make the argument more credible.`,
    `{B}: We also need to be careful about cause and association in the ${context}. Two patterns can occur together without one necessarily producing the other, particularly when the sample is small, participants select themselves, or an uncontrolled factor affects both.

{A}: Yes. ${choose(setNumber, 15, ['Describing that limitation clearly strengthens the project', 'We should match the strength of each claim to the method', 'A cautious conclusion is better than an unsupported causal claim', 'The audience needs to know what the design can and cannot establish'])}.`,
    `{A}: Another question is whether our categories for the ${context} are precise enough for somebody else to repeat the procedure. We know what we intended because we designed it, but a reader only has the written definition.

{B}: For the ${context}, let us ${choose(setNumber, 16, ['include one clear example and one borderline case', 'test the instructions on somebody outside the group', 'define the variable before presenting the measurement', 'record the decision rule instead of relying on intuition'])}. That should reveal any ambiguity before the final version.`,
    `{B}: The order of the ${context} presentation matters as much as the individual sections. If we give every technical detail before explaining the central question, the audience may lose the thread.

{A}: For the ${context}, we can ${choose(setNumber, 17, ['introduce the question, present only the method needed for the finding, and move secondary detail to an appendix', 'add a linking sentence at each handover and rehearse the transitions', 'rank the evidence by relevance and keep the strongest pattern in the main account', 'use the assessment criteria as a final checklist rather than relying on whether the draft feels polished'])}.`,
    `{A}: Our final review of the ${context} should use the agreed criteria rather than simply whether we like the finished version. We need consistent terminology, evidence for each claim and a conclusion that answers the question without exaggeration.

{B}: I will turn those points into a checklist. Then we can ${choose(setNumber, 23, ['assign one person to verify the data and another to test the explanation', 'sign off each requirement before calling the revision complete', 'compare our independent checks and revise only where they reveal a problem', 'record the remaining action beside the person responsible for it'])}.`,
    `{B}: We should keep a note of any decision we change during the final review of the ${context}, including the reason for it.

{A}: Agreed. That record will stop us from reopening settled points without new evidence, and it will show which revision corrected a real weakness rather than merely changing the wording.`,
  ];
}

function monologuePartFour(setNumber: number, context: string) {
  return [
    `To place the ${context} in perspective, we need to distinguish the familiar modern description from the longer process that produced it. Within the ${context}, what now appears stable often emerged through ${choose(setNumber, 18, ['repeated experiments, local adaptations and occasional failures', 'competing explanations that were tested under different conditions', 'small changes whose significance became visible only later', 'several pathways rather than one smooth sequence'])}. A simple list of events in the ${context} can hide those alternatives, so the discussion will emphasise why particular changes mattered.`,
    `Evidence for the ${context} does not come from a single source. Researchers may compare ${choose(setNumber, 19, ['physical traces, written records, measurements and observations', 'controlled findings with patterns observed outside the laboratory', 'historical material with evidence gathered using modern instruments', 'individual cases with broader samples collected over time'])}. Each source answers a different question and carries its own uncertainty. Agreement can increase confidence, while disagreement often reveals an assumption or a measurement problem that deserves closer examination.`,
    `Scale is especially important when evaluating the ${context}. A process observed in one case, one community or one short trial may behave differently across a region or over several generations. ${choose(setNumber, 20, ['Examples at different scales will therefore be compared', 'The lecture will return to this distinction in each case study', 'No striking individual example should be treated as a universal rule', 'Changes in measurement must not be confused with changes in reality'])}. This comparison helps identify which conditions are essential and which are merely helpful.`,
    `It is also worth noticing the language of certainty used in the ${context}. Some mechanisms are supported by direct observation, while others remain the best explanation available from indirect evidence. ${choose(setNumber, 21, ['Scientific caution does not mean that every account is equally likely', 'A conclusion should be as strong as the evidence allows, but no stronger', 'Uncertainty can be described without abandoning a well-supported explanation', 'The final account should separate established patterns from reasonable inference'])}. Keep that distinction in mind as the examples are brought together.`,
    `The separate examples in the ${context} can finally be organised around three questions: what conditions begin a change, which mechanisms sustain it, and what consequences appear later. For the ${context}, ${choose(setNumber, 24, ['that structure keeps chronology from becoming a list of disconnected facts', 'it also makes similarities visible without pretending that every case is identical', 'returning to those questions will connect evidence gathered at different scales', 'the framework is useful only if exceptions and limits remain visible'])}. The conclusion to the ${context} will use that framework to connect the details without extending them beyond the available evidence.`,
    `A useful final check is to ask what observation would make the present account of the ${context} less convincing. Identifying such evidence keeps the explanation testable and reveals where future research would be most informative. It also prevents a plausible narrative from being treated as complete merely because its separate examples fit together.`,
  ];
}

function additionsFor(setNumber: number, part: number) {
  if (setNumber === 5) return SET_FIVE_ADDITIONS[part] ?? [];
  const context = CONTEXTS[setNumber]?.[part - 1];
  const fallback = BANKS[part];
  if (!context) return fallback?.[setNumber % fallback.length] ?? [];
  if (part === 1) return dialoguePartOne(setNumber, context);
  if (part === 2) return monologuePartTwo(setNumber, context);
  if (part === 3) return dialoguePartThree(setNumber, context);
  return monologuePartFour(setNumber, context);
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function dialogueLabels(transcript: string) {
  const labels = [...transcript.matchAll(/^([A-Z][A-Z -]{1,30}):/gm)].map(match => match[1]);
  const unique = [...new Set(labels)];
  return { A: unique[0], B: unique[1] ?? unique[0] };
}

function fillLabels(value: string, labels: { A: string; B: string }) {
  return value.replaceAll('{A}', labels.A).replaceAll('{B}', labels.B);
}

export function expandIeltsListeningTranscript(setNumber: number, part: number, transcript: string) {
  const source = transcript.trim();
  if (setNumber < 1 || setNumber > 20 || !BANKS[part]) return source;
  const bank = additionsFor(setNumber, part);
  const labels = dialogueLabels(source);
  const additions: string[] = [];
  const targetPartWords = setNumber <= 5 ? TIMING_REFERENCE_PART_WORDS : TARGET_PART_WORDS;
  let projectedWords = countWords(source);

  for (const candidate of bank) {
    if (projectedWords >= targetPartWords) break;
    const addition = part === 1 || part === 3 ? fillLabels(candidate, labels) : candidate;
    additions.push(addition);
    projectedWords += countWords(addition);
  }

  const blocks = source.split(/\n{2,}/).map(value => value.trim()).filter(Boolean);
  const after = new Map<number, string[]>();
  additions.forEach((addition, index) => {
    const position = Math.min(blocks.length - 1, Math.floor((index + 1) * blocks.length / (additions.length + 1)));
    after.set(position, [...(after.get(position) ?? []), addition]);
  });
  return blocks.flatMap((block, index) => [block, ...(after.get(index) ?? [])]).join('\n\n');
}
