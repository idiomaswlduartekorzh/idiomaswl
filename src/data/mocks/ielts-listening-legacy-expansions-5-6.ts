/**
 * Topic-specific production expansions for legacy IELTS Listening Sets 5 and 6.
 *
 * The source transcript keeps every answer-bearing statement. These additions
 * deepen the same scenario, add natural clarification and create realistic
 * pacing without changing question evidence or its order.
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
    `Throughout each task, work at a pace that allows you to notice your surroundings. If conditions change or a boundary is unclear, stop the activity and contact the team leader. Responsible decisions in the field are part of the contribution, not a failure to complete the planned list.`,
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

const SET_SIX_ADDITIONS: Readonly<Record<number, readonly string[]>> = {
  1: [
    `AGENT: Before you choose, it may help to think about the routes you expect to use. The riverside path is smooth and fairly level, whereas the tracks beyond the old quarry have loose surfaces and some steep bends. A bicycle suited to paved roads can feel quick in town but less stable once the surface changes.

CUSTOMER: I want to explore beyond the town, so stability matters more than speed.

AGENT: In that case, we should also check the frame size carefully before you leave. The adjustment is quick and prevents avoidable strain later.`,
    `CUSTOMER: Can the saddle and handlebars be adjusted? I have sometimes found hire bicycles uncomfortable after an hour or so.

AGENT: Yes. We set both while you are here and ask you to ride around the yard before accepting the bicycle. That short check also gives us time to test the brakes and gears with you. If anything feels awkward, tell us immediately; it is much easier to correct the fit here than halfway along a trail.`,
    `AGENT: We provide a strong lock as part of the rental, and we recommend securing the frame to a fixed stand whenever you stop. The agreement covers ordinary mechanical faults, but it does not cover a bicycle left unsecured or damage caused by using a route that is closed to cyclists.

CUSTOMER: I have downloaded the council's route map, so I can check the permitted tracks.

AGENT: Good. Temporary closures are marked there each evening.`,
    `CUSTOMER: What should I do if the weather becomes too poor to ride safely?

AGENT: Telephone us rather than attempting an unsafe journey. We can advise you about secure storage or arrange collection, and we can usually pause the hire when an official warning closes the trails. Ordinary rain does not qualify, though wet conditions are a good reason to reduce your speed and allow a longer braking distance.

CUSTOMER: That seems reasonable. I will keep the contact number with me.`,
    `AGENT: When the rental ends, a member of staff will inspect the tyres, brakes and lock with you. Normal wear is expected, so a little mud is not a problem, but please mention any fall or mechanical difficulty even if the bicycle still seems usable. That information lets our workshop examine the relevant component before the next rider sets off.

CUSTOMER: Fine. I would rather report a small concern than leave it for somebody else to discover.`,
  ],
  2: [
    `Before we begin walking round, let me explain how the building is organised. The entrance level is intended for quick visits and enquiries, while the exercise areas are grouped beyond the reception gates. Clear sightlines were a priority in the design, so staff can direct visitors without creating a queue across the foyer. If this is your first visit, allow a few minutes to learn the route before an activity begins. This helps everyone start calmly and move safely.`,
    `Access has been planned for people with different mobility needs. A lift reaches every public floor, and adjustable equipment is available in the fitness room. Anyone who would like help adapting an exercise can speak privately to an instructor before taking part. The aim is to make an appropriate adjustment, rather than assuming that everybody needs the same pace or range of movement.`,
    `The changing areas use separate dry and wet routes. If you are heading towards the pool, follow the blue floor markings so outdoor footwear does not cross the clean area. Visitors going to an upstairs activity should use the corridor beside reception. Please keep emergency exits clear, even when the building is quiet, and tell a staff member if you notice water on a walkway.`,
    `Our programme changes during school holidays, when demand is different from the normal weekly pattern. The current timetable is displayed at reception and online, and any late alteration is posted in both places. Reserving a place is advisable for activities with fixed equipment, but the open fitness areas can usually be used without advance notice. Staff can explain which arrangement applies before you make a journey.`,
    `Before we set off, one practical point concerns conduct in shared spaces. Please return small equipment to its marked rack, wipe down anything you have used and keep personal calls outside the exercise rooms. Photography is restricted because other visitors may not wish to appear in an image. These rules make busy periods more comfortable and allow instructors to concentrate on safe movement instead of repeatedly reorganising the room.`,
  ],
  3: [
    `MARK: We have permission to discuss the campaign material, but should we remove the respondents' names from our working file as well as from the final submission?

TUTOR: Yes. Replace each name with an anonymous code before you begin comparing responses. Keep the consent records separately, with access limited to the group. Ethical handling is part of the method, even when the topic itself seems harmless.

SOPHIE: I will make that change before we analyse anything further.`,
    `SOPHIE: Some replies use different words for what seems to be the same idea. Should we combine them immediately?

TUTOR: First write a precise rule for each category, then test it on a small group of replies. If you combine entries simply because they sound similar, you may hide a useful distinction. Ask Mark to apply the rule independently and compare your decisions.

MARK: That should show us where the definition is too vague.`,
    `MARK: We also have a few incomplete replies. I was tempted to remove them all so the totals would be tidy.

TUTOR: Do not make that decision for appearance's sake. Record how much information is missing and whether it affects the comparison you plan to make. You may exclude a response when the required measure cannot be calculated, but state the rule consistently and report how many records it affects.

SOPHIE: So the cleaning process needs an audit trail as well.

TUTOR: Exactly. Keep that record, and then return to the practical question of how you will show the findings.`,
    `SOPHIE: When we discuss the results, how do we stop the strongest pattern from sounding more certain than it is?

TUTOR: Link every claim to the way the evidence was collected. You can describe what occurred among your respondents, then explain the limit on applying it to a wider population. A cautious interpretation is still valuable if the reasoning is clear.

MARK: We will keep observation and interpretation in separate paragraphs, then check that the conclusion answers the original question.`,
    `TUTOR: Rehearse the handover between the methods and findings sections as well. The audience should understand why each measure is being shown before it sees the result.

SOPHIE: We can ask another student to listen without seeing our notes and tell us where the argument becomes difficult to follow.

TUTOR: Exactly. Use that feedback to repair the link, rather than adding more material automatically. Clarity usually comes from selecting and ordering evidence well.`,
  ],
  4: [
    `To understand why tea travelled so successfully, we should consider its practical qualities as well as its taste. Once processed and kept dry, it could survive a long journey better than many fresh products. A small quantity produced many servings, which made storage and transport economical. Its preparation also required heated water, a habit that could reduce some risks associated with unsafe supplies, even though people at the time did not understand the microbiology involved.`,
    `Processing methods created considerable variety from the same basic crop. Producers could alter oxidation, drying and roasting to obtain different aromas and colours. These techniques were shaped by local climate and custom, then adjusted again when merchants wanted a product that would remain consistent during transport. The names used in commerce did not always describe the process accurately, so historians compare business records with surviving equipment and accounts of manufacture.`,
    `Demand also influenced public life. Specialist rooms became places where news, business and political ideas circulated, while domestic tea drinking developed its own conventions. Access was never uniform: price, taxation and social rules determined who could participate and where. When duties became especially high, smuggling expanded and legal sellers pressed for reform. Changes in tax could therefore reshape consumption more quickly than a change in taste.`,
    `The familiar story of a single accidental invention often simplifies a longer development. Containers, serving vessels and heating equipment changed repeatedly as manufacturers responded to different homes and workplaces. An innovation succeeded when it fitted existing routines, could be produced reliably and offered a clear convenience. Less practical designs disappeared from everyday use, although catalogues and advertisements show that inventors explored far more alternatives than the surviving objects suggest.`,
    `Modern research has returned to questions that earlier drinkers approached through experience. Studies compare brewing temperature, time and particle size because each affects which compounds enter the drink. Stronger colour does not always mean a greater concentration of every component, and results from one preparation method cannot automatically be applied to another. This is why scientific accounts specify both the material tested and the way the drink was prepared.`,
  ],
};

const TARGET_WORDS_PER_PART = 680;

const INSERT_AFTER: Readonly<Record<string, readonly number[]>> = {
  '5-1': [9, 14, 16, 18, 20],
  '5-2': [1, 2, 3, 4, 5],
  '5-3': [6, 6, 10, 12, 14],
  '5-4': [1, 2, 3, 4, 4],
  '6-1': [9, 11, 16, 18, 22],
  '6-2': [1, 2, 3, 4, 5],
  '6-3': [3, 4, 8, 9, 9],
  '6-4': [1, 2, 3, 4, 5],
};

function countWords(value: string) {
  return value.trim().split(/\s+/u).filter(Boolean).length;
}

function insertAdditions(setNumber: number, part: number, transcript: string, additions: readonly string[]) {
  const source = transcript.trim();
  const selected: string[] = [];
  let words = countWords(source);
  for (const addition of additions) {
    if (words >= TARGET_WORDS_PER_PART) break;
    selected.push(addition);
    words += countWords(addition);
  }
  if (words < TARGET_WORDS_PER_PART) {
    throw new Error(`Legacy Listening expansion has ${words} words; expected at least ${TARGET_WORDS_PER_PART}`);
  }

  const blocks = source.split(/\n{2,}/u).map(value => value.trim()).filter(Boolean);
  const positions = INSERT_AFTER[`${setNumber}-${part}`];
  if (!positions || positions.length < selected.length) {
    throw new Error(`Missing insertion plan for Set ${setNumber} Part ${part}`);
  }
  const after = new Map<number, string[]>();
  selected.forEach((addition, index) => {
    const position = positions[index];
    if (position < 0 || position >= blocks.length) {
      throw new Error(`Invalid insertion position ${position} for Set ${setNumber} Part ${part}`);
    }
    after.set(position, [...(after.get(position) ?? []), addition]);
  });
  return blocks.flatMap((block, index) => [block, ...(after.get(index) ?? [])]).join('\n\n');
}

export function expandIeltsListeningLegacyTranscript(setNumber: number, part: number, transcript: string) {
  const byPart = setNumber === 5 ? SET_FIVE_ADDITIONS : setNumber === 6 ? SET_SIX_ADDITIONS : null;
  if (!byPart) return transcript.trim();
  const additions = byPart[part];
  if (!additions) throw new Error(`Missing legacy Listening expansion for Set ${setNumber} Part ${part}`);
  return insertAdditions(setNumber, part, transcript, additions);
}
