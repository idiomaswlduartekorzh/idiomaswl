/**
 * Original WeLearn discourse scaffolding for the 2026 Listening release.
 *
 * The authored set remains the source of every answer-bearing fact. These
 * insertions add the clarification, hesitation, recap and signposting density
 * found in a full listening paper without changing or replacing source text.
 */

const TARGET_PART_WORDS = 555;

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
  if (setNumber < 4 || setNumber > 20 || !BANKS[part]) return source;
  const bank = BANKS[part][setNumber % BANKS[part].length];
  const labels = dialogueLabels(source);
  const additions: string[] = [];
  let projectedWords = countWords(source);

  for (const candidate of bank) {
    if (projectedWords >= TARGET_PART_WORDS) break;
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
