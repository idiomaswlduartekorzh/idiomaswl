import type { SpeakingDilemma } from './types'

export const C2_DILEMMAS: readonly SpeakingDilemma[] = [
  {
    slug: 'coastal-adaptation-protection-or-relocation',
    title: 'Defend a coastal settlement or plan its retreat?',
    prompt: 'A coastal authority can fund years of protection for an exposed neighbourhood or buy homes voluntarily and relocate services to safer ground. Which is the more defensible use of a limited fund?',
    options: [
      { label: 'Protect the settlement', description: 'Preserve homes and the local economy with a defence designed for a defined period.' },
      { label: 'Plan a voluntary retreat', description: 'Offer support to move and invest in receiving neighbourhoods. Some residents may want to stay.' },
    ],
    conditionalPrompt: 'Define when continued protection is justifiable and who bears the consequences if it fails.',
    vocabulary: {
      nouns: [
        ['liability', 'responsibility for a cost, risk or harm', 'Future maintenance remains a public liability.'],
        ['threshold', 'a point at which a decision or condition changes', 'The board published an acceptable-risk threshold.'],
        ['displacement', 'being forced or pressured to leave a place', 'The scheme must account for displacement.'],
        ['lock-in', 'difficulty changing course once an investment has been made', 'The first barrier created decades of lock-in.'],
      ],
      phrasalVerbs: [
        ['wall off', 'separate or protect an area with a barrier', 'The plan would wall off the lowest streets.'],
        ['move away from', 'gradually stop relying on an approach', 'The authority moved away from permanent defence.'],
        ['write off', 'treat something as having no further value or prospect', 'No neighbourhood should be written off casually.'],
        ['build in', 'make a protection or condition part of an initial plan', 'The policy builds in a right to review.'],
      ],
      adjectives: [
        ['irreversible', 'unable to be undone', 'The loss of the site would be irreversible.'],
        ['contingent on', 'dependent on a specified condition', 'Support is contingent on alternative housing.'],
        ['indefensible', 'impossible to justify convincingly', 'That transfer of risk is indefensible.'],
        ['time-limited', 'valid for a fixed period', 'The protection is deliberately time-limited.'],
      ],
      connectors: [
        ['all else being equal', 'makes a preference conditional on other factors staying the same', 'All else being equal, I would prefer the shorter contract.'],
        ['be that as it may', 'concedes a point without abandoning the main judgement', 'Be that as it may, the underlying problem persists.'],
        ['subject to', 'states a requirement that limits or governs an action', 'The policy can proceed subject to an independent review.'],
        ['conversely', 'introduces an inverse or contrasting case', 'Conversely, a slower process can reduce reversals.'],
      ],
    },
    models: {
      a: [
        'I’d fund **time-limited** protection **subject to** a credible exit plan. A defence buys time for people whose livelihoods and care networks are tied to the place. It need not imply a promise to **wall off** every street indefinitely.',
        '**Be that as it may**, the spending creates **lock-in** if it encourages new building behind the defence. I’d publish a **threshold** for withdrawal, restrict further exposure and **build in** review dates when the assumptions can be tested publicly.',
        'The relevant question is who carries the **liability** when the protection expires. If the promise becomes an open-ended subsidy for avoidable risk, the argument for A falls away. I would also distinguish households with no feasible alternative from owners whose investment depends on the public absorbing losses they could reasonably avoid.',
      ],
      b: [
        'I’d **move away from** defending the site if the proposed barrier merely postpones an **irreversible** problem. Starting while people still have choices can make **displacement** less disruptive and give the receiving areas time to prepare.',
        '**Conversely**, the authority would be wrong to **write off** homes on the strength of a single forecast. Voluntary support has to be adequate, and the timetable should be **contingent on** suitable housing and continuity of services.',
        'I’d ring-fence money for people who cannot move promptly. B is preferable only if the public budget covers those remaining risks as well as the cost of buying properties. That distinction matters because a scheme judged solely by the number of purchases could count a move as successful even when daily life becomes harder.',
      ],
      conditional: [
        'I’d set the **threshold** before choosing the engineering. **All else being equal**, a **time-limited** defence makes sense where residents can keep using services and the evidence shows it buys a meaningful transition.',
        '**Conversely**, where the defence imposes a long **liability** without materially reducing exposure, I’d **move away from** it. That choice is **subject to** credible alternatives for residents and a plan for the period when some will stay.',
        'Any decision should record the conditions that would reopen it. Otherwise, what starts as a response to uncertainty can become an **indefensible** promise that nobody has the authority to reconsider. A family’s ability to move should never be inferred from the market price of its home, so I’d review those two measures separately.',
      ],
    },
  },
  {
    slug: 'urgent-public-notices-translation',
    title: 'Publish provisional translations or wait for review?',
    prompt: 'A public agency needs to publish transport disruption notices in several languages within the hour. Should it publish machine-assisted drafts with visible limits and update them later, or release translations only after review by qualified speakers?',
    options: [
      { label: 'Publish provisional translations', description: 'Release a short, clearly labelled draft and replace it after review.' },
      { label: 'Publish only reviewed translations', description: 'Release the original immediately and add other languages as soon as people verify them.' },
    ],
    conditionalPrompt: 'State which kinds of misunderstanding are tolerable and what should happen when reviewers are not available.',
    vocabulary: {
      nouns: [
        ['asymmetry', 'a difference in how risks or benefits fall on different people', 'There is an asymmetry between early and late access.'],
        ['triage', 'deciding what needs attention first', 'Triage puts route changes before background detail.'],
        ['semantic drift', 'a shift away from an expression’s original meaning', 'Review caught semantic drift in the warning.'],
        ['fallback', 'an alternative used when the preferred plan fails', 'An illustrated map is a useful fallback.'],
      ],
      phrasalVerbs: [
        ['flag up', 'draw attention to a problem or uncertainty', 'We flagged up two uncertain terms.'],
        ['get across', 'communicate something successfully', 'The notice gets the main change across.'],
        ['strip out', 'remove an element from something', 'The editor stripped out optional background.'],
        ['hold back', 'delay or prevent something from being released', 'They held back the final translation.'],
      ],
      adjectives: [
        ['time-critical', 'needing action by a particular short deadline', 'The platform change is time-critical.'],
        ['ambiguous', 'open to more than one interpretation', 'The first notice was ambiguous.'],
        ['provisional', 'intended to be revised or confirmed later', 'Use the provisional label until the text is checked.'],
        ['actionable', 'clear enough for someone to act on', 'The alternative route was actionable.'],
      ],
      connectors: [
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['failing that', 'introduces a fallback if the first condition cannot be met', 'Failing that, I would extend the trial.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
        ['to put the point more sharply', 'recasts an argument with greater precision or force', 'To put the point more sharply, consent and convenience are different tests.'],
      ],
    },
    models: {
      a: [
        'I’d publish something **provisional** where the agency can **strip out** detail and check the core facts against a route map. There is an **asymmetry** when some readers get an **actionable** notice while others get nothing.',
        '**Even granting that** a rough draft can introduce **semantic drift**, the risks vary by detail. I’d **flag up** unresolved wording and avoid publishing an **ambiguous** instruction about which platform to use.',
        '**To put the point more sharply**, the choice is how much of the same information can be made useful now. A short confirmed map and a clearly labelled translation may be enough. If a translation is replaced, the agency should show the update clearly enough that a passenger does not rely on the first version by mistake.',
      ],
      b: [
        'I’d **hold back** translations that change the steps people must take. A text can sound fluent yet contain **semantic drift** at exactly the place that is **time-critical**. A provisional label does little if someone is already in the wrong part of the station.',
        'A review policy still needs **triage**. Verify destination names and times first, and publish those before the background. **Failing that**, use an **actionable** diagram as a **fallback**.',
        'I’d choose B **insofar as** the wait can be kept short and the agency has a realistic plan for readers who cannot use the original. The agency should measure time to usable information for each language, since an acceptable average could conceal a much longer wait for some readers.',
      ],
      conditional: [
        'I’d separate facts a reader must act on from background. I’d release a **provisional** notice if it can **get across** the main change without an **ambiguous** instruction.',
        'For directions or deadlines, I’d review the operative words first. **Failing that**, I’d use a visual **fallback** or a tested short phrase rather than **hold back** all communication.',
        'The deciding factor is the cost of being wrong compared with the cost of being late. **Even granting that** both are serious, the agency can reduce the **asymmetry** by publishing different amounts of information in stages. I would also plan for the case where an old notice has already circulated, because replacing the official version will not reach every reader.',
      ],
    },
  },
  {
    slug: 'citizen-panel-selection',
    title: 'Select a citizens’ panel by lot or by nomination?',
    prompt: 'A council wants an advisory panel to scrutinise a major redevelopment. Should places be assigned by a stratified lottery or filled by nominations from recognised local organisations?',
    options: [
      { label: 'A stratified lottery', description: 'Invite residents at random and reserve places to reflect the area’s mix of neighbourhoods and age groups.' },
      { label: 'Organisational nominations', description: 'Ask local groups to nominate people with practical knowledge and a visible link to those they represent.' },
    ],
    conditionalPrompt: 'Distinguish fair selection from useful participation, then decide what would make the panel’s advice credible.',
    vocabulary: {
      nouns: [
        ['legitimacy', 'acceptance that a body has the right to exercise its role', 'The process matters for the panel’s legitimacy.'],
        ['constituency', 'the group whose views a person represents', 'Each nominee answers to a constituency.'],
        ['selection bias', 'a systematic distortion caused by who is included', 'Non-response introduced selection bias.'],
        ['remit', 'the area of responsibility given to a body', 'Scrutiny is within the panel’s remit.'],
      ],
      phrasalVerbs: [
        ['draw in', 'attract people who might otherwise stay away', 'Travel support drew in more residents.'],
        ['speak for', 'represent somebody’s views or interests', 'No one member can speak for every household.'],
        ['screen out', 'exclude people from consideration', 'The application screened out people with less time.'],
        ['account for', 'take something into consideration or explain it', 'The panel must account for missing voices.'],
      ],
      adjectives: [
        ['representative', 'reflecting the wider group fairly', 'The first group was not representative.'],
        ['self-selecting', 'involving people who choose to put themselves forward', 'The consultation was largely self-selecting.'],
        ['answerable', 'expected to explain decisions to someone', 'The delegates are answerable to their members.'],
        ['deliberative', 'involving careful consideration and discussion', 'The panel uses a deliberative process.'],
      ],
      connectors: [
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['by the same token', 'extends the same logic to another case', 'By the same token, the rule should apply to bigger suppliers.'],
        ['for all its appeal', 'concedes the attractiveness of an idea before examining a limitation', 'For all its appeal, the proposal relies on one supplier.'],
        ['on that reading', 'draws a conclusion from a particular interpretation', 'On that reading, the exception has a narrow scope.'],
      ],
    },
    models: {
      a: [
        'I’d use a lottery **insofar as** the panel’s **legitimacy** comes from hearing beyond the usual participants. Broad invitations can **draw in** people who have never joined an association but will live with the redevelopment.',
        '**For all its appeal**, a lottery becomes **self-selecting** if only people with spare time accept. I’d pay expenses, provide care and translation support, and report who declined. That would make the working group more **representative**.',
        'No panel captures every experience. I’d give it a clear **remit** to examine the proposals and publish dissent, without treating the outcome as a vote of the whole community. In particular, I would preserve differences in testimony rather than require the group to agree on one account of a problem that affects people unevenly.',
      ],
      b: [
        'I’d use nominations if the panel needs sustained, informed input. A delegate with a **constituency** is **answerable** to people outside the room and can take proposals back for discussion. That is a strength for a **deliberative** group that cannot settle everything in one meeting.',
        '**By the same token**, existing bodies may **screen out** residents who never joined them. I’d invite nominations from several kinds of groups, require delegates to explain who they **speak for**, and fund open sessions.',
        '**On that reading**, B works as structured testimony, with **legitimacy** coming from visible methods and a willingness to hear from others. A group’s familiarity with the subject is useful only if it has ways of checking what its members think instead of relying on one spokesperson.',
      ],
      conditional: [
        'I’d settle the **remit** first. A lottery is stronger if the goal is to **draw in** people whom normal meetings miss and support can keep the panel **representative**. For sustained consultation with affected groups, nominations may give clearer lines of responsibility to each **constituency**.',
        '**For all its appeal**, either design can hide **selection bias**. I’d ask it to **account for** absent groups and allow a recorded minority view.',
        '**By the same token**, neither process is enough on its own to settle the plan. What matters is whether the council can explain how the evidence affected its decision. The council should publish reasons for rejecting inconvenient evidence as carefully as it publishes the reasons it gives for accepting advice it already favours.',
      ],
    },
  },
  {
    slug: 'policy-forecast-uncertainty',
    title: 'Present one forecast or competing scenarios?',
    prompt: 'A public budget office must explain the possible cost of a new policy. Should it lead with one reference figure and put uncertainty in an appendix, or present several plausible scenarios without choosing a headline figure?',
    options: [
      { label: 'One reference figure', description: 'Give decision-makers a common planning number and explain other possibilities in the technical notes.' },
      { label: 'Several scenarios', description: 'Show how assumptions change the cost and ask the audience to consider the range.' },
    ],
    conditionalPrompt: 'Explain how you would communicate uncertainty without making the public unable to use the estimate.',
    vocabulary: {
      nouns: [
        ['sensitivity', 'how much a result changes when an assumption changes', 'The model shows sensitivity to the uptake rate.'],
        ['baseline', 'a reference used for comparison', 'The old estimate is our baseline.'],
        ['salience', 'how much something stands out or attracts attention', 'The headline gives one number extra salience.'],
        ['assumption', 'something accepted as true for the purpose of an estimate', 'That assumption affects the projected cost.'],
      ],
      phrasalVerbs: [
        ['pin down', 'identify or establish something precisely', 'It is hard to pin down future demand.'],
        ['build into', 'include as part of a system or calculation', 'They built staffing costs into the forecast.'],
        ['gloss over', 'avoid explaining something difficult or important', 'The summary glossed over the uncertainty.'],
        ['tease apart', 'separate factors that are difficult to distinguish', 'The analysts teased apart price and demand.'],
      ],
      adjectives: [
        ['tractable', 'possible to deal with or understand', 'The model makes the problem more tractable.'],
        ['contentious', 'likely to cause disagreement', 'The assumed savings are contentious.'],
        ['contingent on', 'dependent on another factor', 'The result is contingent on participation.'],
        ['spurious', 'seeming valid while lacking real justification', 'The extra decimal places give spurious precision.'],
      ],
      connectors: [
        ['before we draw that inference', 'introduces a check before accepting a conclusion', 'Before we draw that inference, we should compare other explanations.'],
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['for all its appeal', 'concedes the attractiveness of an idea before examining a limitation', 'For all its appeal, the proposal relies on one supplier.'],
        ['that consideration aside', 'sets one factor aside temporarily', 'That consideration aside, the two projects are comparable.'],
      ],
    },
    models: {
      a: [
        'I’d lead with a **baseline** because committees need a shared planning figure. Putting several plausible totals on the same footing can make it harder to coordinate a budget.',
        '**For all its appeal**, one number can acquire **salience** out of proportion to its quality. I’d make the largest **sensitivity** visible beside it and explain the **contentious** **assumptions** that are **built into** it.',
        '**Insofar as** the figure remains a reference rather than a promise, a single headline is **tractable**. I’d update it when a material assumption changes and keep the earlier estimate accessible for comparison. A reader should be able to tell whether a revision reflects newly observed costs or a change in the office’s preferred assumptions about the policy.',
      ],
      b: [
        'I’d show scenarios when the result is strongly **contingent on** uncertain demand. I’d **tease apart** what changes in each case so the audience can see why one number cannot settle the policy.',
        '**Before we draw that inference**, though, I’d check whether the plausible range is wide enough to matter. Multiple figures can create **spurious** complexity when the decision is the same at both ends.',
        'I’d choose B if different outcomes would lead to different safeguards. In that case, making the **sensitivity** visible is part of explaining the decision, and the office would be wrong to **gloss over** it. I’d keep a common definition of cost across scenarios so the reader can compare genuine uncertainties rather than differences in what has been counted.',
      ],
      conditional: [
        'I’d show one **baseline** if **sensitivity** is low or all reasonable cases lead to the same decision. **That consideration aside**, I’d attach a clear statement of which costs are still hard to **pin down**.',
        'If the decision changes at a plausible threshold, I’d present scenarios and **tease apart** the effect of a **contentious** assumption. That gives the reader a usable reason to compare the figures.',
        '**Insofar as** the presentation is meant to support a choice, I’d ask decision-makers to say what they would actually do under both ends of the range. If nobody can point to a practical consequence of the difference, I’d still show it somewhere convenient without treating it as the centre of the argument.',
      ],
    },
  },
  {
    slug: 'adaptation-investment-equity-test',
    title: 'Rank adaptation projects by return or by vulnerability?',
    prompt: 'A region cannot fund every project to reduce disruption from extreme weather. Should it rank projects by benefits per unit of spending or give priority to communities where residents have the fewest alternatives?',
    options: [
      { label: 'Rank expected return', description: 'Fund projects with the highest estimated reduction in damage for the money available.' },
      { label: 'Prioritise vulnerability', description: 'Fund projects for communities with limited resources or options. Apply a minimum test of practical effectiveness.' },
    ],
    conditionalPrompt: 'Decide how to compare widespread modest gains with concentrated losses and where a threshold would change the priority.',
    vocabulary: {
      nouns: [
        ['distributional effect', 'the way benefits and costs fall across different groups', 'The report shows the distributional effect of the levy.'],
        ['opportunity cost', 'the benefit forgone when another choice is made', 'There is an opportunity cost to funding a small project.'],
        ['marginal gain', 'a small extra benefit from an additional effort or expense', 'The final upgrade offered a marginal gain.'],
        ['vulnerability', 'likelihood of harm combined with limited ability to respond', 'Low savings can increase vulnerability.'],
      ],
      phrasalVerbs: [
        ['bake into', 'include something so it becomes part of a system', 'The rules bake local needs into the score.'],
        ['weigh against', 'consider a gain alongside an opposing cost or value', 'We weighed the saving against lost access.'],
        ['rule out', 'exclude something from consideration', 'The test ruled out two proposals.'],
        ['fall through', 'fail to happen as planned', 'The smaller grant fell through last year.'],
      ],
      adjectives: [
        ['commensurable', 'able to be compared on the same scale', 'The two outcomes are not fully commensurable.'],
        ['distributive', 'relating to how costs or benefits are shared', 'The grant has a distributive purpose.'],
        ['prohibitive', 'so high that it prevents a course of action', 'The relocation cost is prohibitive.'],
        ['equitable', 'taking relevant differences into account to achieve fairness', 'They wanted an equitable allocation.'],
      ],
      connectors: [
        ['at the margin', 'limits a point to cases where a small difference can change a decision', 'At the margin, a small grant can change the outcome.'],
        ['by the same token', 'extends the same logic to another case', 'By the same token, the rule should apply to bigger suppliers.'],
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
      ],
    },
    models: {
      a: [
        'I’d start with expected return **insofar as** a small fund has real **opportunity costs**. Paying a **prohibitive** price for one **marginal gain** can mean losing a project that would prevent repeated losses in another place.',
        '**Even granting that** a common scale is useful, some outcomes are not fully **commensurable**. I’d **bake into** the estimate an explicit account of who benefits, rather than relying only on the price of damaged property.',
        '**At the margin**, I’d prefer the better return when both projects protect people with similar alternatives. I’d publish the **distributional effect** to show where that assumption does not hold. That approach is strongest when the same amount of money can plausibly address the different projects and uncertainty is reported using a similar standard.',
      ],
      b: [
        'I’d prioritise **vulnerability**. An **equitable** decision has to consider who can recover after a service fails. A modest saving for many households is different from keeping the only access route open for people with nowhere else to go.',
        '**By the same token**, labelling a neighbourhood vulnerable should not exempt a project from scrutiny. I’d **rule out** plans that deliver little protection and **weigh large extra costs against** the practical benefit.',
        'The point is a **distributive** minimum, with expected return still relevant among projects that meet it. That keeps attention on what public money can actually change. I would also ask whether the people identified as vulnerable can actually use the proposed service once it opens, since access can change its practical value.',
      ],
      conditional: [
        'I’d define an **equitable** minimum and apply it to all areas before ranking projects. If people would otherwise lose an essential service with no alternative, I’d address that **vulnerability** first **insofar as** a feasible project can change it.',
        '**At the margin**, I’d compare **commensurable** losses across proposals that clear the minimum, and publish the **opportunity cost** of the priority rule.',
        'That would **bake fairness into** the first choice while leaving room for cost-effectiveness. If there is no affordable way to meet the minimum, I’d ask what other help can reach the same people. I’d test one borderline case publicly, because that is where officials and applicants can most clearly see how the stated minimum affects the final order.',
      ],
    },
  },
  {
    slug: 'ecological-composite-or-minimum-targets',
    title: 'Use an overall nature score or separate minimum targets?',
    prompt: 'A regional plan must track the condition of rivers, woodland and urban habitats. Should it use an overall score that can rise when gains exceed losses, or keep separate minimum targets for each habitat?',
    options: [
      { label: 'Use one composite score', description: 'Combine measures with published weights and display an overall trend.' },
      { label: 'Keep separate minimums', description: 'Set thresholds for each habitat and show which fall below them.' },
    ],
    conditionalPrompt: 'Decide where gains could legitimately offset losses and where comparison breaks down.',
    vocabulary: {
      nouns: [
        ['aggregation', 'combining several measures into one figure', 'Aggregation can hide opposing trends.'],
        ['substitutability', 'how far one thing can replace another', 'The plan assumes substitutability across sites.'],
        ['threshold', 'the level that triggers a decision', 'The river fell below its threshold.'],
        ['indicator', 'a measure used as a sign of a wider condition', 'Water clarity is one indicator.'],
      ],
      phrasalVerbs: [
        ['roll up', 'combine smaller measures into a larger total', 'The dashboard rolls up several indicators.'],
        ['net out', 'cancel when gains and losses are combined', 'The two changes netted out in the total.'],
        ['zero in on', 'focus attention closely on something', 'The team zeroed in on river quality.'],
        ['iron out', 'smooth differences or irregularities', 'Averages can iron out important variation.'],
      ],
      adjectives: [
        ['fungible', 'able to be exchanged or replaced without changing the result', 'The habitats are not necessarily fungible.'],
        ['non-negotiable', 'not available for compromise or change', 'A minimum flow is non-negotiable.'],
        ['heterogeneous', 'made up of parts that differ from one another', 'The measures capture heterogeneous conditions.'],
        ['diagnostic', 'helpful for identifying a problem or its cause', 'The separate data are more diagnostic.'],
      ],
      connectors: [
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
        ['on that reading', 'draws a conclusion from a particular interpretation', 'On that reading, the exception has a narrow scope.'],
        ['conversely', 'introduces an inverse or contrasting case', 'Conversely, a slower process can reduce reversals.'],
        ['before we draw that inference', 'introduces a check before accepting a conclusion', 'Before we draw that inference, we should compare other explanations.'],
      ],
    },
    models: {
      a: [
        'I’d use a headline score to show direction, provided readers can see the **indicators** behind it. Without some **aggregation**, twenty separate lines can make it hard to tell whether most measures are moving together.',
        '**Even granting that** habitats are **heterogeneous**, a composite can help describe progress. I’d **roll up** trends only alongside a list of breached **thresholds**. I would never use the headline alone to approve degradation at a particular site.',
        '**On that reading**, A gives readers a navigation tool. If increases in one place conceal serious losses elsewhere, the component trends should take priority over the headline. I’d put a clear explanation next to any sharp divergence so the reader can distinguish a short-term change from evidence of lasting damage.',
      ],
      b: [
        'I’d keep separate targets. Gains in park tree cover need not compensate for declining river habitat, since these benefits are not fully **fungible**. A score can **net out** the two changes while concealing the **threshold** that matters most for the river.',
        '**Conversely**, a long list of **indicators** can make a report hard to read. I’d group them clearly and **zero in on** measures that are **diagnostic** of serious damage.',
        'I’d choose B because the plan’s promise is a **non-negotiable** minimum in each habitat, with visible responsibility when it falls short. Before adding a new target, I’d check whether it can be observed consistently and whether anyone has responsibility for acting on a breach.',
      ],
      conditional: [
        'I’d decide which measures have defensible **substitutability**. Where two indicators describe similar services, it can be reasonable to **roll them up**. **Before we draw that inference**, we should show why the outcomes are genuinely comparable.',
        'Where habitats have different functions or a **non-negotiable** **threshold**, I’d keep their results separate. A **diagnostic** view should show what changed before **aggregation** is used to summarise it.',
        '**On that reading**, a single number could help orient the public, but the decision rule would treat certain losses as failures even if the overall score rises. If a gain is reported as an offset, the public should be able to see exactly what was lost and why the trade was accepted.',
      ],
    },
  },
  {
    slug: 'public-contract-low-bid-or-life-cycle',
    title: 'Award a public contract on price or whole-life value?',
    prompt: 'A public body is buying equipment it will use for ten years. Should it select the lowest qualifying bid or include repair, downtime and replacement costs in a published scoring model?',
    options: [
      { label: 'Lowest qualifying price', description: 'Set minimum quality standards and choose the least expensive bid that meets them.' },
      { label: 'Whole-life value', description: 'Score purchase cost alongside evidence of expected repairs, availability and replacement.' },
    ],
    conditionalPrompt: 'Decide what evidence can support a long-term estimate and what happens when bidders are difficult to compare.',
    vocabulary: {
      nouns: [
        ['life-cycle cost', 'the total cost of owning and using something over time', 'Energy use is part of the life-cycle cost.'],
        ['bid', 'an offer to do work or supply something at a price', 'The lowest bid met the minimum standards.'],
        ['downtime', 'a period when something cannot be used', 'Unplanned downtime disrupted the service.'],
        ['discretion', 'room to exercise judgement within a rule', 'The scoring system gives the panel some discretion.'],
      ],
      phrasalVerbs: [
        ['price in', 'include an expected cost in a figure', 'We priced in parts and labour.'],
        ['lock into', 'make it difficult to leave an arrangement later', 'The supply agreement locks us into one provider.'],
        ['stand up to', 'remain convincing when it is examined', 'The forecast stood up to an audit.'],
        ['rule out', 'exclude an option', 'The test ruled out several bids.'],
      ],
      adjectives: [
        ['auditable', 'able to be checked against clear records', 'The final score is auditable.'],
        ['speculative', 'based on guesses rather than strong evidence', 'The ten-year savings are speculative.'],
        ['material', 'important enough to affect a decision', 'The replacement risk is material.'],
        ['contestable', 'able to be questioned or challenged', 'The repair assumption is contestable.'],
      ],
      connectors: [
        ['subject to', 'states a requirement that limits or governs an action', 'The policy can proceed subject to an independent review.'],
        ['before we draw that inference', 'introduces a check before accepting a conclusion', 'Before we draw that inference, we should compare other explanations.'],
        ['be that as it may', 'concedes a point without abandoning the main judgement', 'Be that as it may, the underlying problem persists.'],
        ['failing that', 'introduces a fallback if the first condition cannot be met', 'Failing that, I would extend the trial.'],
      ],
    },
    models: {
      a: [
        'I’d take the lowest **bid** **subject to** demanding minimum standards on service and repair. A rule like that limits **discretion** and lets suppliers see what they must provide rather than guess how a panel weights different claims.',
        '**Be that as it may**, an apparently cheap purchase can **lock the body into** a poor service arrangement. I’d require **auditable** evidence of parts availability and treat excessive **downtime** as a possible reason to **rule out** an offer.',
        'A serves the public best when quality is measurable at the point of purchase and estimates of different future costs are too **speculative** to rank confidently. I’d also check whether the lowest qualifying prices are genuinely comparable once each supplier’s service commitments and responsibilities are read alongside the headline amount.',
      ],
      b: [
        'I’d **price in** **life-cycle cost** if the equipment is likely to remain in use for a decade. It is easy to compare upfront bids, but saving at the start matters little if **downtime** later becomes **material**.',
        '**Before we draw that inference**, I’d require suppliers to justify maintenance assumptions and let independent staff test whether they **stand up to** scrutiny. I’d publish the weights and any areas of **discretion**.',
        'I’d use B when the long-term estimates are **auditable**. Otherwise a model might simply give optimistic bidders an advantage for making the strongest promises. The process would have more legitimacy if a losing bidder could reconstruct its score from the published criteria and ask for an explanation of a disputed estimate.',
      ],
      conditional: [
        'I’d use whole-life scoring **subject to** common, **auditable** information. If suppliers can demonstrate the parts they provide and make **downtime** commitments, I’d **price in** those effects.',
        '**Failing that**, I’d use the lowest **bid** that clears minimum quality and service requirements, then collect data through a short pilot.',
        'The key is to separate uncertain claims from real differences. Where a **material** risk might **lock us into** extra costs, I’d either test it before award or make the contract easy to reopen. For example, a short contract with a genuine exit can be sensible when the claimed savings are uncertain and replacement is not prohibitively difficult.',
      ],
    },
  },
  {
    slug: 'centralise-public-service-or-local-offices',
    title: 'A regional service centre or several local offices?',
    prompt: 'Several towns share a public advice service. Should they pool specialist staff in a regional centre or keep small local offices that can handle routine cases and refer difficult ones?',
    options: [
      { label: 'A regional centre', description: 'Pool specialist staff and use phone or video contact for towns without a nearby office.' },
      { label: 'Local offices', description: 'Keep face-to-face access and a smaller local team. Send complex cases to an expert team when needed.' },
    ],
    conditionalPrompt: 'Decide where economies of scale matter and where some decisions require local knowledge or access.',
    vocabulary: {
      nouns: [
        ['economies of scale', 'lower costs per case when an activity is done in larger volume', 'The shared centre may offer economies of scale.'],
        ['referral', 'sending a case to another person or service', 'The local worker made a referral.'],
        ['discretion', 'freedom to use judgement within a role', 'Frontline staff need some discretion.'],
        ['fragmentation', 'being split into parts that do not work together well', 'The merger could reduce fragmentation.'],
      ],
      phrasalVerbs: [
        ['pull together', 'bring people or resources together for a purpose', 'The towns pulled together a shared team.'],
        ['scale back', 'reduce the size or reach of something', 'They scaled back the pilot.'],
        ['fall between the cracks', 'be missed when several people or systems share responsibility', 'Some cases fell between the cracks.'],
        ['pass on', 'transfer a message or case to someone else', 'Please pass on the case notes.'],
      ],
      adjectives: [
        ['centralised', 'controlled or provided from a single place', 'A centralised system holds the records.'],
        ['piecemeal', 'done in scattered parts without an overall plan', 'Piecemeal changes confused users.'],
        ['locally informed', 'using knowledge from people in a particular place', 'The advice is locally informed.'],
        ['responsive', 'able to meet needs or changes quickly', 'The local office is responsive.'],
      ],
      connectors: [
        ['at the margin', 'limits a point to cases where a small difference can change a decision', 'At the margin, a small grant can change the outcome.'],
        ['for all its appeal', 'concedes the attractiveness of an idea before examining a limitation', 'For all its appeal, the proposal relies on one supplier.'],
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['conversely', 'introduces an inverse or contrasting case', 'Conversely, a slower process can reduce reversals.'],
      ],
    },
    models: {
      a: [
        'I’d **pull together** a specialist team where they deal with cases that no individual office sees often. The **economies of scale** can include better judgement as well as lower cost, because specialists share knowledge and approach similar cases consistently.',
        '**For all its appeal**, a **centralised** service can make simple questions harder for someone without suitable internet or privacy. I’d fund access points that can **pass on** a case rather than sending people from one number to another.',
        'I’d choose A **insofar as** it reduces **fragmentation** and protects that first step into the service. I would retain a point of contact for people whose problem is difficult to describe remotely, because a clear referral depends on identifying the problem first.',
      ],
      b: [
        'I’d keep services **responsive** to local needs. An adviser with some **discretion** and **locally informed** judgement may help people solve a problem before a formal **referral** is needed.',
        '**Conversely**, a **piecemeal** system can leave complex cases to **fall between the cracks**. I’d use a shared record and assign one person ownership when the case moves.',
        'I’d choose B if the towns can show which tasks require a local presence and what the specialists will do across the whole network. Keeping offices open should come with a genuine route to expertise. The local team should know what happened after referral, since feedback is one way to build the judgement that prevents unnecessary referrals in future.',
      ],
      conditional: [
        'I’d **pull together** specialist staff for rare, technically difficult cases. **At the margin**, that is where the **economies of scale** justify less local control. I’d retain advisers in places where a **referral** can begin only if someone knows the context.',
        '**Conversely**, if remote advice is already **responsive** and travel is largely avoidable, I’d **scale back** offices with low demand.',
        'The test is who would **fall between the cracks** after the change. Where a **locally informed** first conversation prevents that, the funding case for the office is stronger. A combined cost figure would miss the point if savings at the centre are purchased by repeated extra journeys for people least able to make them.',
      ],
    },
  },
  {
    slug: 'minority-language-archive-access',
    title: 'Open a language archive or let contributors control access?',
    prompt: 'A language archive has recordings contributed by speakers who gave different reasons for sharing them. Should it make all eligible recordings public by default, or let contributors and community organisations set the access terms for each set?',
    options: [
      { label: 'Open by default', description: 'Make shareable material easy to find for learners and researchers, with a process for objections.' },
      { label: 'Community-controlled access', description: 'Keep access decisions with contributors and designated stewards, while opening collections that invite wider use.' },
    ],
    conditionalPrompt: 'Explain which permissions should travel with the recordings and which should need fresh consent.',
    vocabulary: {
      nouns: [
        ['stewardship', 'long-term responsibility for looking after something', 'Community stewardship shaped the archive.'],
        ['provenance', 'the recorded origin and ownership history of material', 'Every recording includes its provenance.'],
        ['revocation', 'the formal removal of a permission already given', 'The system handles revocation of consent.'],
        ['circulation', 'the sharing or movement of material among users', 'The recording was intended for limited circulation.'],
      ],
      phrasalVerbs: [
        ['open up', 'make something available to more people', 'The stewards opened up one set for schools.'],
        ['take down', 'remove something from public access', 'They took down the public copy.'],
        ['hand over', 'transfer control or responsibility', 'The team handed over access decisions to stewards.'],
        ['carry over', 'continue to apply in a new context', 'The original conditions carry over when the file is copied.'],
      ],
      adjectives: [
        ['revocable', 'able to be withdrawn later', 'The permission is revocable.'],
        ['unrestricted', 'without limits on use or access', 'The archive allows unrestricted access to some songs.'],
        ['context-bound', 'requiring a particular setting or context to be understood or used', 'The account is deeply context-bound.'],
        ['derivative', 'made from or based on material that already exists', 'The translation is a derivative use.'],
      ],
      connectors: [
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['at the margin', 'limits a point to cases where a small difference can change a decision', 'At the margin, a small grant can change the outcome.'],
        ['subject to', 'states a requirement that limits or governs an action', 'The policy can proceed subject to an independent review.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
      ],
    },
    models: {
      a: [
        'I’d make clearly shareable recordings openly available **insofar as** permission supports wider **circulation**. Learners who live far away may otherwise be unable to hear material that contributors intended them to use.',
        '**Even granting that** the archive can **take down** a file, copies may stay in circulation. I’d publish only where consent is explicit about copying and **derivative** use, and keep the **provenance** attached.',
        'A is defensible **subject to** those limits. A blanket default would have little value if it ignores how the speakers thought people would encounter their voices. I’d ask for new permission when an existing agreement refers to listening but a later project proposes a materially different use of the same recording.',
      ],
      b: [
        'I’d **hand over** access decisions to those responsible for **stewardship**. A recording may be **context-bound**, and sharing it with a researcher need not imply permission for **unrestricted** circulation.',
        '**At the margin**, I’d prevent the system from becoming a gate through which every teacher needs a separate favour. The stewards could permit educational use of whole collections and publish clear rules about **revocation**.',
        '**Insofar as** the aim is both preservation and learning, it matters that commitments **carry over** when files leave the archive. B gives contributors a workable role in setting those commitments. The archive should set a reasonable review period so that a contributor’s ability to control use does not depend on a relationship with one individual.',
      ],
      conditional: [
        'I’d separate access for listening from permission to copy or adapt. I’d **open up** a collection to anyone **subject to** explicit **provenance** and clear terms for **derivative** use.',
        '**Even granting that** revocation can be supported on the original site, it may not reverse past copying. I’d keep **context-bound** recordings under stricter **stewardship** when that risk matters.',
        'The evidence I’d ask for is which permissions contributors understood and wanted to **carry over**. Where those answers are uncertain, I’d reopen the conversation before widening **circulation**. A permission that travels with the recording should be understandable to the later user without access to the private conversation in which it was agreed.',
      ],
    },
  },
  {
    slug: 'qualitative-research-data-sharing',
    title: 'Share interview records openly or require controlled access?',
    prompt: 'A research team has interview transcripts gathered for a study of long-term unemployment. It has permission to share de-identified extracts under some conditions. Should it publish a large carefully de-identified set or give approved reviewers access in a controlled setting?',
    options: [
      { label: 'Publish de-identified extracts', description: 'Make enough of the evidence visible for wider readers to test the team’s interpretation.' },
      { label: 'Provide controlled access', description: 'Let approved reviewers examine fuller records under restrictions on copying and use.' },
    ],
    conditionalPrompt: 'Distinguish checking an interpretation from exposing a person’s story, and set a standard for acceptable review.',
    vocabulary: {
      nouns: [
        ['traceability', 'how easily a record can be followed back to its source', 'A detailed timeline increases traceability.'],
        ['secondary use', 'reuse of material in a new activity beyond the original purpose', 'The consent form discussed secondary use.'],
        ['scrutiny', 'careful and critical examination', 'Outside scrutiny improved the analysis.'],
        ['identifiability', 'the possibility of recognising who a person is', 'The combination of details increased identifiability.'],
      ],
      phrasalVerbs: [
        ['strip out', 'remove elements from something', 'The team stripped out addresses and employers.'],
        ['piece together', 'combine separate clues or sources into a coherent account', 'Someone may piece together the events from public records.'],
        ['open up', 'make available to more people', 'The archive opened up selected extracts.'],
        ['follow through on', 'carry out a commitment through to completion', 'The team followed through on its promise.'],
      ],
      adjectives: [
        ['de-identified', 'changed to remove information that directly identifies someone', 'The release is carefully de-identified.'],
        ['granular', 'expressed or stored with a high level of detail', 'The interview contains granular descriptions.'],
        ['proportionate', 'appropriate in level or size to the goal', 'The access restriction is proportionate.'],
        ['residual', 'remaining after other parts have been removed or resolved', 'There is residual risk of identification.'],
      ],
      connectors: [
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['subject to', 'states a requirement that limits or governs an action', 'The policy can proceed subject to an independent review.'],
        ['for all its appeal', 'concedes the attractiveness of an idea before examining a limitation', 'For all its appeal, the proposal relies on one supplier.'],
        ['failing that', 'introduces a fallback if the first condition cannot be met', 'Failing that, I would extend the trial.'],
      ],
    },
    models: {
      a: [
        'I’d **open up** selected **de-identified** material **insofar as** it helps readers assess what the article claims. Some **scrutiny** should be possible without having to secure a formal connection to the research team.',
        '**For all its appeal**, simply saying names were removed overlooks **residual** **identifiability**. I’d **strip out** details unrelated to the argument and test whether a combination of incidents still points to a person in a small place.',
        'If extracts remain useful after removing the details that create the risk, I’d release that limited set. The purpose is to make reasoning visible, while meeting the commitments made to participants. I would also explain how the extracts were selected, because an apparently representative release can still conceal a question that several participants answered very differently.',
      ],
      b: [
        'I’d provide controlled access because **granular** sequences may be essential to meaningful **scrutiny**. Removing them can change how a reader understands someone’s story. In a secure arrangement, reviewers can inspect a fuller account while limits reduce **secondary use**.',
        '**Subject to** independent approval, I’d let people challenge the interpretation and publish their findings without publishing the underlying voices. The access rules must be **proportionate** and reviewed, so inconvenient criticism is not screened out.',
        'B makes sense where unrelated details let others **piece together** an identity even after obvious identifiers are removed. It also protects the promise the team needs to **follow through on**. My support depends on a workable route for critics without institutional connections, so controlled access does not become a privilege that protects the authors from disagreement.',
      ],
      conditional: [
        'I’d ask what level of evidence someone needs to test a particular claim. Some claims can be assessed from **de-identified** extracts with low **traceability**. I’d **open up** those first, **subject to** the conditions participants actually accepted.',
        '**Failing that**, if cutting **granular** passages changes the meaning of an exchange, I’d offer controlled review instead. The reviewer should have enough evidence to challenge the conclusion and report how the process constrained them.',
        'I’d judge the policy by the **scrutiny** it permits relative to the **residual** risk it creates. An unrestricted archive and opaque access gate can each fail that test. If an independent person cannot check even the weakest version of a claim, the team may have to narrow the claim rather than widen the release.',
      ],
    },
  },
  {
    slug: 'recognition-original-or-replication',
    title: 'Reward a first discovery or independent confirmation?',
    prompt: 'A research association can give one award. One group produced a surprising finding; another independently confirmed it and clarified where it stops holding. Which contribution should the award recognise?',
    options: [
      { label: 'Reward the original finding', description: 'Give priority to the group that identified an important possibility before anyone else tested it.' },
      { label: 'Reward independent confirmation', description: 'Recognise the group that tested the claim and established more precisely what it means.' },
    ],
    conditionalPrompt: 'Separate credit for opening a line of enquiry from credit for making its results dependable.',
    vocabulary: {
      nouns: [
        ['priority', 'being first to do or identify something', 'The archive establishes priority for the finding.'],
        ['corroboration', 'independent evidence supporting an earlier claim', 'The team looked for corroboration.'],
        ['boundary condition', 'a limit to the situation in which a result holds', 'The follow-up found a boundary condition.'],
        ['incentive', 'something that makes people more likely to act a certain way', 'The award creates an incentive to share data.'],
      ],
      phrasalVerbs: [
        ['open up', 'make a possibility or area of work available', 'The finding opened up a new question.'],
        ['bear out', 'support or confirm a claim', 'The second set of results bore out the claim.'],
        ['build on', 'use existing work as a basis for something further', 'The team built on a small original result.'],
        ['pare back', 'reduce something to a more limited form', 'The new evidence pared back the original claim.'],
      ],
      adjectives: [
        ['generative', 'able to lead to further work or ideas', 'The first paper was highly generative.'],
        ['robust', 'remaining convincing under different tests', 'The effect was robust across settings.'],
        ['qualified', 'limited by an important condition', 'The team reached a qualified conclusion.'],
        ['overstated', 'described as stronger or broader than the evidence supports', 'The original claim was overstated.'],
      ],
      connectors: [
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['by the same token', 'extends the same logic to another case', 'By the same token, the rule should apply to bigger suppliers.'],
        ['conversely', 'introduces an inverse or contrasting case', 'Conversely, a slower process can reduce reversals.'],
        ['on that reading', 'draws a conclusion from a particular interpretation', 'On that reading, the exception has a narrow scope.'],
      ],
    },
    models: {
      a: [
        'I’d reward the first group **insofar as** identifying a neglected possibility is the hardest step. The claim was **generative** because it **opened up** a question others could test, regardless of whether every detail survives.',
        '**Conversely**, credit for **priority** can create an **incentive** to publish too soon. I’d manage that risk by asking whether the finding led to productive work.',
        '**On that reading**, the award recognises the act of changing what people thought worth investigating. I’d still require enough **corroboration** to show the idea was more than a lucky suggestion. To justify the award, I would point to a distinct research question that was made possible by the original insight and could not easily have arisen otherwise.',
      ],
      b: [
        'I’d favour confirmation. The independent group did more than **bear out** the finding. It identified a **boundary condition** that tells us where the result is **robust** and where a **qualified** conclusion is needed.',
        'Rewarding first results alone can create an **incentive** to make **overstated** claims. **By the same token**, replication should earn weight only if it adds independent evidence or **pares back** the claim in an informative way.',
        'I’d choose B if the confirmation materially changes how other researchers can **build on** the result. Reliable scope is an achievement in its own right. I would distinguish that achievement from conducting a repetition whose only new feature is a larger sample and whose result changes no practical or theoretical judgement.',
      ],
      conditional: [
        'I’d ask what the award is meant to encourage. A deserves **priority** if the first finding is unusually **generative** and evidence has since **borne it out** without substantially changing its meaning.',
        '**Conversely**, a confirmation that **pares back** an **overstated** claim can produce more useful knowledge by identifying the **boundary condition**. I’d value that more if people were already applying the original result too broadly.',
        '**On that reading**, I’d choose based on the difference each contribution made. If independent confirmation merely repeated the same test, the case for B would be weaker. The committee could explain the counterfactual in plain terms by asking what the field would be unable to say without each of the two contributions.',
      ],
    },
  },
  {
    slug: 'preregister-all-or-separate-analysis-tracks',
    title: 'Require advance plans for all analysis or distinguish two tracks?',
    prompt: 'A research journal wants readers to know which findings were predicted before the data were analysed. Should it require every analysis to be planned in advance or publish exploratory work under a separately labelled track?',
    options: [
      { label: 'Require advance plans', description: 'Ask authors to record their questions and analysis steps before seeing the results.' },
      { label: 'Distinguish two tracks', description: 'Publish both advance-planned and exploratory work. Require authors to identify which claims belong where.' },
    ],
    conditionalPrompt: 'Explain how a journal could welcome discovery while preventing a new explanation from being presented as a successful prediction.',
    vocabulary: {
      nouns: [
        ['hindsight', 'understanding something after knowing how it turned out', 'Hindsight can make a pattern look predictable.'],
        ['credibility', 'the quality of being believable and trustworthy', 'The policy aims to strengthen credibility.'],
        ['exploration', 'the search for possible patterns or explanations', 'Exploration can lead to a new hypothesis.'],
        ['confirmation', 'a test to see whether an earlier claim is supported', 'The journal separates exploration from confirmation.'],
      ],
      phrasalVerbs: [
        ['spell out', 'state something fully and clearly', 'The authors spelled out the original plan.'],
        ['rule in', 'treat something as a supported possibility', 'The evidence was enough to rule in one possible explanation.'],
        ['go beyond', 'do more than a plan or rule originally covered', 'The paper went beyond the planned analysis.'],
        ['hold up under', 'remain convincing when tested in a particular way', 'The claim held up under independent review.'],
      ],
      adjectives: [
        ['post hoc', 'made or explained after the event', 'The account was clearly post hoc.'],
        ['tentative', 'not final or fully certain', 'The headline should call the result tentative.'],
        ['corroborative', 'providing independent evidence in support of something', 'They found corroborative evidence in another dataset.'],
        ['prescriptive', 'setting strict rules about how something must be done', 'The policy may be too prescriptive.'],
      ],
      connectors: [
        ['to put the point more sharply', 'recasts an argument with greater precision or force', 'To put the point more sharply, consent and convenience are different tests.'],
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
        ['subject to', 'states a requirement that limits or governs an action', 'The policy can proceed subject to an independent review.'],
      ],
    },
    models: {
      a: [
        'I’d ask authors to **spell out** plans before doing analyses they intend readers to treat as **confirmation**. **Hindsight** can make an unexpected pattern feel as if it was obvious all along. That is precisely where the evidence may be less convincing than the story.',
        '**Even granting that** a strict rule is **prescriptive**, the journal can still publish work that motivates further questions, provided it is labelled **tentative**.',
        '**To put the point more sharply**, the restriction applies to what can be claimed from the exercise. A result should not be presented as a successful prediction unless there is evidence it was predicted. If authors need to depart from a plan for good reasons, I’d let them record the reasons promptly and identify which conclusions those changes affect.',
      ],
      b: [
        'I’d publish both tracks, **subject to** a clear record of what was **post hoc**. **Exploration** is how teams notice patterns they were not looking for, and forcing every report to follow an initial plan can discourage useful discoveries.',
        '**Insofar as** an explanation **goes beyond** the plan, it should not receive the same language of **confirmation**. I’d ask authors to describe it as **tentative** and say what evidence would cause them to abandon it.',
        'The distinction matters when readers use a result. A finding described as exploratory should carry less weight until it **holds up under** an independent test. Both tracks should be held to appropriate standards of evidence, so the exploratory category does not become a place to avoid answering difficult questions about method.',
      ],
      conditional: [
        'I’d use advance plans for claims of **confirmation** and let authors **go beyond** them in a separate section. **To put the point more sharply**, a **post hoc** explanation can be valuable while lacking the force of a prediction that survived a test.',
        'I’d ask the author to **spell out** what new work would make it **corroborative**. Where an article cannot show which question came first, I’d present all the results as **tentative**.',
        '**Subject to** those limits, both tracks belong in the same journal. The label should follow how the conclusion was reached, not how interesting it sounds. A clear label should survive into the abstract and any press summary, because many readers will never reach the section that explains where an idea came from.',
      ],
    },
  },
  {
    slug: 'university-composite-or-dashboard',
    title: 'Rank universities overall or show a comparison dashboard?',
    prompt: 'An information service for prospective university students must decide whether to publish a single ranking or a dashboard of separate indicators. Which would better support a real decision about where to study?',
    options: [
      { label: 'One published ranking', description: 'Combine measures into a score with visible weights and publish the order.' },
      { label: 'A dashboard', description: 'Show several dimensions separately and let students choose what to compare.' },
    ],
    conditionalPrompt: 'Say when simplification helps and which assumptions should stay visible if a score is used.',
    vocabulary: {
      nouns: [
        ['weighting', 'the importance assigned to one measure compared with others', 'The weighting puts more emphasis on graduate outcomes.'],
        ['proxy', 'an indirect measure used when something cannot be observed directly', 'Salary is a limited proxy for student satisfaction.'],
        ['granularity', 'the amount of detail used to distinguish parts of something', 'The dashboard needs enough granularity to compare courses.'],
        ['salience', 'the quality of standing out or drawing attention', 'The top rank has high salience.'],
      ],
      phrasalVerbs: [
        ['boil down', 'reduce something to its main parts or simplest form', 'The score boils down four measures.'],
        ['crowd out', 'leave less room for competing information or activity', 'A headline can crowd out other evidence.'],
        ['factor in', 'include a relevant consideration', 'Students should factor in living costs.'],
        ['drill down into', 'look at information in more detail', 'The tool lets users drill down into course results.'],
      ],
      adjectives: [
        ['commensurable', 'comparable on a common scale', 'Research output and support are not obviously commensurable.'],
        ['opaque', 'hard to understand or examine', 'The original score was opaque.'],
        ['ordinal', 'showing position in an order rather than the size of a difference', 'The table gives only an ordinal ranking.'],
        ['decision-relevant', 'directly affecting a choice', 'Programme cost is decision-relevant for most applicants.'],
      ],
      connectors: [
        ['before we draw that inference', 'introduces a check before accepting a conclusion', 'Before we draw that inference, we should compare other explanations.'],
        ['for all its appeal', 'concedes the attractiveness of an idea before examining a limitation', 'For all its appeal, the proposal relies on one supplier.'],
        ['on that reading', 'draws a conclusion from a particular interpretation', 'On that reading, the exception has a narrow scope.'],
        ['at the margin', 'limits a point to cases where a small difference can change a decision', 'At the margin, a small grant can change the outcome.'],
      ],
    },
    models: {
      a: [
        'I’d use one ranking to give students an initial shortlist. It can **boil down** a long table to an approachable view, especially for someone beginning with dozens of options.',
        '**For all its appeal**, an **ordinal** result tells us little about the true gap between tenth and eleventh. I’d disclose each **weighting** and identify where an **opaque** **proxy** shapes the result.',
        '**On that reading**, A is a way into a decision, and applicants should still be able to **drill down into** teaching and cost before they apply. The list should never be the only way to explore the data. I’d also show how often institutions change places when the weights move a little, since small differences can create a deceptively firm-looking order.',
      ],
      b: [
        'I’d show a dashboard because students may reasonably disagree about what is **decision-relevant**. A higher research profile and a shorter commute need not be **commensurable**, and a headline can **crowd out** what matters to someone with a fixed budget.',
        '**Before we draw that inference**, I’d test whether the audience can use the additional **granularity** without getting lost. I’d offer a few guided examples, for instance for students who need to **factor in** travel.',
        'I’d choose B if visitors can explain why their shortlist suits them after using it. That is a better test than time spent on the page. I would test the dashboard with applicants facing unfamiliar choices, because existing users may already know which comparisons to make and make the tool look easier.',
      ],
      conditional: [
        'I’d keep the dashboard and add a starting view for typical needs. **At the margin**, it may help to **boil down** indicators when they track similar goals, such as several measures of course completion.',
        '**For all its appeal**, a general score creates too much **salience** around someone else’s preferences. I’d show how a **weighting** changes the **ordinal** result.',
        '**On that reading**, either choice is defensible only where learners can **drill down into** the **decision-relevant** dimensions. I’d avoid combining measures that are not genuinely **commensurable**. If a single summary offers real help, it should remain possible to choose different weights without treating the default as everyone else’s decision made for them.',
      ],
    },
  },
  {
    slug: 'streaming-royalties-pool-or-listener',
    title: 'Pool music royalties or allocate them by listener?',
    prompt: 'A music platform is revising how it distributes part of its subscription revenue. Should artists be paid from a single pool based on their share of listening, or should each subscriber’s contribution be divided among the artists that person played?',
    options: [
      { label: 'Use a single pool', description: 'Allocate revenue according to each artist’s share of listening across the whole platform.' },
      { label: 'Allocate by subscriber', description: 'Divide each listener’s contribution among the artists that listener actually played.' },
    ],
    conditionalPrompt: 'Decide whose contribution the fee represents and which distortions matter most when implementing a rule.',
    vocabulary: {
      nouns: [
        ['attribution', 'assigning a contribution to its source', 'Subscriber-based attribution changes who gets paid.'],
        ['redistribution', 'a change in how resources are shared across people or groups', 'The rule creates some redistribution.'],
        ['denominator', 'the total used when calculating a share', 'All listening minutes form the denominator.'],
        ['concentration', 'a large share of something held by relatively few people', 'The data show concentration at the top.'],
      ],
      phrasalVerbs: [
        ['pool together', 'combine separate sums into one shared amount', 'The service pooled the fees together.'],
        ['skew towards', 'give an uneven advantage in one direction', 'The rule skews towards heavy users.'],
        ['filter out', 'remove particular cases from a set', 'The platform filters out invalid plays.'],
        ['pass on', 'transfer a benefit or cost to somebody else', 'The service passed on the saving to users.'],
      ],
      adjectives: [
        ['attributable', 'able to be linked to a person or cause', 'Each payment is attributable to one listener.'],
        ['disproportionate', 'too large in relation to what produced it', 'A small group can have disproportionate influence.'],
        ['auditable', 'possible to check from a clear record', 'The payment trail should be auditable.'],
        ['revenue-neutral', 'not changing the total amount of revenue involved', 'The change is revenue-neutral overall.'],
      ],
      connectors: [
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['at the margin', 'limits a point to cases where a small difference can change a decision', 'At the margin, a small grant can change the outcome.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
        ['by the same token', 'extends the same logic to another case', 'By the same token, the rule should apply to bigger suppliers.'],
      ],
    },
    models: {
      a: [
        'I’d keep one pool **insofar as** the subscription gives access to a shared catalogue. A common **denominator** makes the amount due to a given artist easier to explain, particularly if the platform publishes which plays it **filters out**.',
        '**Even granting that** intense use can give some listeners **disproportionate** influence, a different distribution rule would change who receives money without increasing the overall amount.',
        'I’d keep A if the current system is **auditable** and most **redistribution** benefits audiences or artists in ways the platform can justify, rather than relying on the apparent simplicity of the percentage. I would also ask whether distributing a larger amount through the pool actually serves the catalogue’s breadth, since the size of the catalogue alone tells us little.',
      ],
      b: [
        'I’d divide the relevant part of each subscription among the artists that person played. When individual fees are pooled, the result can **skew towards** what very frequent listeners choose. Direct **attribution** gives a low-volume subscriber a visible share too.',
        '**At the margin**, that may help artists whose supporters listen to less music overall. But it is a **revenue-neutral** change, so a shift of payment to one group is a loss to another.',
        '**By the same token**, B needs an **auditable** definition of valid listening. I’d ask for a detailed comparison before deciding whether its distribution is more defensible. A comparison should distinguish between a shift caused by listening behaviour and one caused by the platform quietly changing the percentage of fees available for distribution.',
      ],
      conditional: [
        'I’d choose based on what the platform promises to subscribers. If their fee is meant to be **attributable** to their own listening, I’d favour B and **filter out** invalid plays before allocating it.',
        '**Insofar as** users are paying to support a common catalogue, a shared **denominator** is defensible. I’d **pool the fees together** if that is the explicit purpose and explain any **disproportionate** effects.',
        '**At the margin**, I’d run both calculations on the same period and show the likely **redistribution**. I’d choose B if it advances the stated purpose without creating a new distortion larger than the one it corrects. I would publish the rationale in terms a subscriber can check, with an example where a low-volume listener and a frequent listener play the same artist.',
      ],
    },
  },
  {
    slug: 'online-article-corrections-versioning',
    title: 'Correct an article in place or preserve the original with a note?',
    prompt: 'An online newspaper discovers that a central detail in a widely shared article is wrong. Should it correct the published text and show what changed or preserve the original wording with a prominent correction attached?',
    options: [
      { label: 'Correct the text', description: 'Give current readers the accurate version and disclose the change with a time and reason.' },
      { label: 'Preserve the original with a note', description: 'Keep the wording that actually appeared and place the correction prominently alongside it.' },
    ],
    conditionalPrompt: 'Decide which versions need to remain accessible and how to stop an old error from travelling without its correction.',
    vocabulary: {
      nouns: [
        ['version history', 'a record of what changed and when', 'The editor added the change to the version history.'],
        ['traceability', 'the ability to follow a change back to its source', 'The timestamp improves traceability.'],
        ['rectification', 'the act of making an error right', 'The article needed prompt rectification.'],
        ['persistence', 'continuing to exist even after people try to change it', 'The persistence of old screenshots complicated the correction.'],
      ],
      phrasalVerbs: [
        ['set right', 'correct something that was wrong', 'The editor set the record right.'],
        ['carry forward', 'keep using or showing something in a later version', 'The mistake was carried forward into the summary.'],
        ['flag up', 'draw attention to something important', 'The note flags up which figure changed.'],
        ['wipe out', 'remove something entirely', 'A silent edit can wipe out the record.'],
      ],
      adjectives: [
        ['conspicuous', 'easy to see or notice', 'The correction is conspicuous on the page.'],
        ['material', 'important enough to affect the overall meaning', 'The error was material to the story.'],
        ['retrospective', 'relating to an earlier time or decision', 'The editor published a retrospective account.'],
        ['recoverable', 'possible to find or obtain again', 'The earlier version is recoverable.'],
      ],
      connectors: [
        ['be that as it may', 'concedes a point without abandoning the main judgement', 'Be that as it may, the underlying problem persists.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
        ['failing that', 'introduces a fallback if the first condition cannot be met', 'Failing that, I would extend the trial.'],
        ['to put the point more sharply', 'recasts an argument with greater precision or force', 'To put the point more sharply, consent and convenience are different tests.'],
      ],
    },
    models: {
      a: [
        'I’d **set the record right** where most readers encounter the article. A **material** error left in the main text can be quoted without its note. **Rectification** has to reach readers at the point where they might repeat the claim.',
        '**Even granting that** silent edits would weaken **traceability**, a **conspicuous** correction and a reliable **version history** preserve the evidence of what happened.',
        '**To put the point more sharply**, the current text should answer what readers ought to believe now, and the archive should answer what the newspaper originally published. I’d expose both clearly. The notice should travel with the version most people are likely to share, since an archive can be technically complete and still leave the false claim circulating.',
      ],
      b: [
        'I’d keep the original accessible because readers may need to establish what a paper published at a particular time. If it simply **wipes out** the earlier version of a **material** assertion, a later **retrospective** account can give an incomplete picture of the mistake.',
        '**Be that as it may**, a note at the bottom would be inadequate. The correction should appear first, **flag up** the disputed claim, and remain attached when the original is displayed.',
        'B is defensible only if the original is **recoverable** without making the wrong version easier to share than the correction. If that fails, the publisher should change which version it shows by default. That **traceability** is particularly valuable if the original wording affected a real decision and a reader later needs a reliable account of what they saw.',
      ],
      conditional: [
        'I’d make the corrected version the default for a **material** error and **flag up** what changed in a **conspicuous** notice. A **version history** should make the original **recoverable** for anyone checking how the claim spread.',
        '**Failing that**, if the publishing system cannot preserve both safely, I’d keep the original in a separate archive with an explicit correction attached.',
        '**To put the point more sharply**, the duty is to prevent error from being **carried forward** and preserve the evidence needed to hold the publisher accountable. Any arrangement should be tested against both goals. I’d check the preview and citation formats as well as the article itself, because some readers will meet the correction through someone else’s link.',
      ],
    },
  },
  {
    slug: 'official-place-names-one-or-parallel',
    title: 'Standardise place names or show parallel local names?',
    prompt: 'A transit authority is updating maps in an area where many stops have both widely used official names and names used by a local language community. Should it use one standard label or display both names wherever space allows?',
    options: [
      { label: 'Standardise on one label', description: 'Use one reference name across signs, maps and audio. Include other names in a searchable directory.' },
      { label: 'Show parallel names', description: 'Display both names when possible and programme announcements to reflect the change.' },
    ],
    conditionalPrompt: 'Decide where consistency matters and where excluding a name would make a public service less recognisable.',
    vocabulary: {
      nouns: [
        ['recognisability', 'the ease with which something is recognised', 'The shorter name has high recognisability.'],
        ['coexistence', 'the state of different things being present together', 'The map reflects the coexistence of two naming traditions.'],
        ['precedence', 'being treated as more important than something else', 'The layout gives operational information precedence.'],
        ['legibility', 'the quality of being easy to read', 'The redesign improved legibility.'],
      ],
      phrasalVerbs: [
        ['pair up', 'put two things together in corresponding pairs', 'The database pairs up the two names.'],
        ['phase in', 'introduce something gradually', 'The authority phased in the new labels.'],
        ['strip away', 'remove a layer or feature', 'The new map stripped away an older name.'],
        ['hold on to', 'keep something rather than giving it up', 'Residents held on to the original names.'],
      ],
      adjectives: [
        ['unambiguous', 'having only one clear interpretation', 'An unambiguous identifier helps passengers change routes.'],
        ['redundant', 'unnecessary because another element already serves the purpose', 'The repeated number was redundant.'],
        ['legible', 'easy to read', 'The two lines are legible at a distance.'],
        ['asymmetrical', 'having unequal roles or effects on two sides', 'Recognition remains asymmetrical across communities.'],
      ],
      connectors: [
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['subject to', 'states a requirement that limits or governs an action', 'The policy can proceed subject to an independent review.'],
        ['by the same token', 'extends the same logic to another case', 'By the same token, the rule should apply to bigger suppliers.'],
        ['for all its appeal', 'concedes the attractiveness of an idea before examining a limitation', 'For all its appeal, the proposal relies on one supplier.'],
      ],
    },
    models: {
      a: [
        'I’d use one short label at decision points **insofar as** people need an **unambiguous** match between a map and a sign. **Recognisability** depends on seeing the same clue at a moment when there is little time to think.',
        '**For all its appeal**, a single official name can **strip away** another recognised identifier. I’d **pair up** both names in searchable maps and provide the local name where it remains **legible**.',
        'I’d give the time-critical instruction **precedence** while keeping both systems connected. That is more defensible than making the lesser-used name impossible to find. I’d check results with visitors as well as residents, since familiarity with the old design can make a confusing change appear easier than it is.',
      ],
      b: [
        'I’d show both names **subject to** tests of **legibility**. A label considered **redundant** by the authority may be the one that residents already use to give directions. Parallel labels can make their **coexistence** clear to everyone.',
        '**By the same token**, different recordings and maps should still **pair up** the names consistently. I’d **phase in** longer labels with tested visual proportions and accessible announcements.',
        'I’d choose B if a one-line abbreviation or an extra line gives **unambiguous** guidance without making one name look like incidental decoration. A new label should remain distinct in a spoken announcement too, so the written design does not improve access while leaving a different group confused.',
      ],
      conditional: [
        'I’d show both names **insofar as** signs remain **legible** at the distance and speed of use. I’d **pair up** matching names in every searchable source, whether or not physical space permits both.',
        'Where room is limited, I’d use a short shared identifier for the movement instruction and let local names take **precedence** in place information.',
        '**For all its appeal**, full symmetry can produce an **asymmetrical** result if only one set of passengers can read the labels in time. I’d test actual wayfinding and **phase in** the format that people can use. I’d also give journey planners clear equivalent search results so that a naming decision on a small physical sign does not limit access to the whole network.',
      ],
    },
  },
  {
    slug: 'modular-repairable-or-cheaper-product',
    title: 'Design for repair or keep the purchase price lower?',
    prompt: 'An appliance maker can redesign a basic product with easily replaceable parts at a higher price. Alternatively it can keep the lower-priced design and strengthen its replacement and take-back scheme. Which route would serve households better?',
    options: [
      { label: 'Design for repair', description: 'Use standard replaceable components and offer parts for a defined period.' },
      { label: 'Keep the purchase price lower', description: 'Keep the cheaper design and improve the process for exchanging failures and collecting old products.' },
    ],
    conditionalPrompt: 'Compare who can afford each product and what evidence would make the long-term savings credible.',
    vocabulary: {
      nouns: [
        ['serviceability', 'how easily a product can be maintained or repaired', 'The new case improves serviceability.'],
        ['attrition', 'losses that happen gradually over time', 'Parts suppliers can disappear through attrition.'],
        ['upfront cost', 'money that must be paid before the benefits begin', 'The upfront cost is higher.'],
        ['lifetime value', 'the total benefit an item gives across the time it is used', 'Repairs can improve lifetime value.'],
      ],
      phrasalVerbs: [
        ['wear out', 'become unusable after repeated use', 'The latch wears out first.'],
        ['swap out', 'replace one component with another', 'The shop can swap out the motor.'],
        ['lock in', 'make a choice difficult to reverse later', 'A closed design locks in the manufacturer’s parts.'],
        ['price out', 'make it unaffordable for some buyers', 'The higher price could price some households out.'],
      ],
      adjectives: [
        ['interoperable', 'able to work with parts or products from different sources', 'The spare components are interoperable.'],
        ['proprietary', 'owned or controlled by one supplier', 'The fitting is proprietary.'],
        ['economical', 'providing useful results without unnecessary cost', 'The repair may be economical.'],
        ['credible', 'convincing enough to be believed', 'Consumers need a credible supply promise.'],
      ],
      connectors: [
        ['at the margin', 'limits a point to cases where a small difference can change a decision', 'At the margin, a small grant can change the outcome.'],
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
        ['failing that', 'introduces a fallback if the first condition cannot be met', 'Failing that, I would extend the trial.'],
      ],
    },
    models: {
      a: [
        'I’d choose **serviceability** if households can **swap out** the parts that usually **wear out**. The **upfront cost** can be justified if the placement and availability of parts make repairs practical, and not only possible in theory.',
        '**Even granting that** a repairable design costs more, choosing **interoperable** components would help consumers avoid being **locked in** to one supplier.',
        'I’d support A **insofar as** the parts promise is **credible** and customers can compare likely **lifetime value**. If an expensive repair still requires replacing most of the unit, the design has not delivered what it promises. Evidence about repairs should include cases outside the manufacturer’s busiest markets, since fast access to parts in one city can disguise an impractical product elsewhere.',
      ],
      b: [
        'I’d keep the lower price in this market. A higher **upfront cost** can **price households out** of a product even when it would be more **economical** in the long run.',
        '**At the margin**, a well-run return scheme can still prevent some working components from becoming waste. I’d require a **credible** exchange process and stop the company from using **proprietary** parts as a reason to deny ordinary repairs.',
        '**Failing that**, B would simply transfer costs to buyers when the smallest component fails. I’d choose it only where access to the lower price makes a material difference. I’d require the company to publish how long an exchange takes and distinguish products actually put back into use from products merely taken away.',
      ],
      conditional: [
        'I’d compare how often parts **wear out**, whether replacements are **interoperable** and what they cost. **Insofar as** these differences can increase **lifetime value**, I’d choose repairability and ask how the manufacturer can keep the **upfront cost** within reach.',
        '**Failing that**, the lower price may justify a stronger exchange scheme, particularly if many buyers would otherwise be **priced out**.',
        'I’d require evidence of what happens to returned units. A claim of **serviceability** and a promise of take-back are both weak until consumers can use the alternative when a product fails. If the price premium is substantial, I’d ask for an estimate of typical repair savings under conditions where those savings are genuinely achievable without specialist access.',
      ],
    },
  },
  {
    slug: 'in-house-capability-or-specialist-contract',
    title: 'Build expertise in-house or contract a specialist?',
    prompt: 'A public institution needs a recurring service that is currently hard to staff. Should it develop an internal team over two years or contract a specialist organisation to deliver it immediately?',
    options: [
      { label: 'Build internal capability', description: 'Train a permanent team and accept a slower start while knowledge develops.' },
      { label: 'Contract a specialist', description: 'Start sooner using an experienced provider and negotiate how the contract will end.' },
    ],
    conditionalPrompt: 'Distinguish the risk of starting too slowly from the risk of losing the ability to oversee the work.',
    vocabulary: {
      nouns: [
        ['dependency', 'relying on something or someone to continue', 'The contract creates dependency on one firm.'],
        ['institutional memory', 'knowledge from past experience that stays within an organisation', 'Frequent turnover can erase institutional memory.'],
        ['handover', 'the transfer of responsibility and knowledge', 'The handover needs a clear plan.'],
        ['fallback', 'another option if the first one fails', 'The tender includes a fallback.'],
      ],
      phrasalVerbs: [
        ['build up', 'develop gradually over time', 'They built up an experienced internal team.'],
        ['buy in', 'obtain expertise or services from outside', 'The department bought in expert support.'],
        ['hand over', 'transfer control or responsibility', 'The contractor handed over the records.'],
        ['wind down', 'reduce an activity until it stops', 'The agency wound down the old service.'],
      ],
      adjectives: [
        ['embedded', 'deeply established as part of a system', 'The knowledge should be embedded in the organisation.'],
        ['contingent', 'dependent on another factor', 'The service is contingent on renewal.'],
        ['transferable', 'able to be passed on or used somewhere else', 'The new skills are transferable.'],
        ['recurrent', 'happening repeatedly', 'This is a recurrent staffing need.'],
      ],
      connectors: [
        ['by the same token', 'extends the same logic to another case', 'By the same token, the rule should apply to bigger suppliers.'],
        ['subject to', 'states a requirement that limits or governs an action', 'The policy can proceed subject to an independent review.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
        ['at the margin', 'limits a point to cases where a small difference can change a decision', 'At the margin, a small grant can change the outcome.'],
      ],
    },
    models: {
      a: [
        'I’d **build up** expertise internally if the work is **recurrent** and staff need to make judgements based on **institutional memory**. A slower start can be justified when the alternative creates permanent **dependency**.',
        '**Even granting that** recruitment might take longer, I’d bring in short-term support to train the team rather than **hand over** the entire responsibility.',
        '**At the margin**, the question is what must become **embedded** for the organisation to supervise itself. Where that work cannot be fully specified in a contract, I’d prioritise the knowledge and test it on a smaller service first. I’d revisit the choice if the service can be defined and monitored well enough that buying it externally would still leave the institution able to change course.',
      ],
      b: [
        'I’d **buy in** help if the institution cannot meet a real commitment while training an internal team. The delay could harm the service before the staff gain the expertise, and a specialist may already have a **transferable** method.',
        '**Subject to** a detailed **handover**, I’d choose B for a limited period. We should be able to **wind down** the contract or switch providers without losing access to records or relying entirely on the provider’s judgement.',
        '**By the same token**, the institution still needs enough expertise to recognise good performance. A purchase of service does not remove that duty. I would make payments dependent on delivery and transfer of working knowledge, because a handover described on paper may leave staff unable to take over in practice.',
      ],
      conditional: [
        'I’d separate urgent delivery from lasting **dependency**. If the shortage is temporary, I’d **buy in** a specialist **subject to** a credible **handover**. The institution can **build up** just enough **embedded** expertise to oversee the provider.',
        'If the work is **recurrent** and relies on context only an internal team can acquire, I’d develop it in-house. **Even granting that** a contractor can start earlier, I’d want a **fallback** before becoming dependent.',
        'I’d choose based on how long the need will last and how difficult it would be to recover the capacity later. A timetable that tries to do both can be defensible, provided the institution knows which internal capability it is expected to have at each stage.',
      ],
    },
  },
  {
    slug: 'school-library-guidance-or-open-access',
    title: 'Use age guidance or give all older pupils the same library access?',
    prompt: 'A secondary school must decide how to handle books with demanding themes that many older pupils want to read. Should it use age guidance with individual access discussions or let all pupils in the upper school borrow from the same catalogue?',
    options: [
      { label: 'Use guidance with flexible access', description: 'Publish age guidance and let pupils request a discussion when they want a book above the suggested age.' },
      { label: 'Allow the same catalogue access', description: 'Let upper-school pupils make their own choice and provide optional content information and librarian support.' },
    ],
    conditionalPrompt: 'Specify when guidance helps someone choose and when it becomes a barrier that is hard to challenge.',
    vocabulary: {
      nouns: [
        ['discretion', 'freedom to use judgement within rules', 'Librarians need carefully defined discretion.'],
        ['gatekeeping', 'control over who gains access to something', 'The appeal process limits gatekeeping.'],
        ['maturity', 'the ability to think and act with developed judgement', 'Age is an imperfect measure of maturity.'],
        ['recourse', 'a route to challenge or fix a decision', 'Students need recourse if access is refused.'],
      ],
      phrasalVerbs: [
        ['steer towards', 'gently direct somebody to an option', 'The librarian steered her towards another novel.'],
        ['opt out of', 'choose not to join or use something', 'Readers can opt out of a suggested list.'],
        ['set out', 'explain a policy in an organised way', 'The school set out its borrowing policy.'],
        ['shut off', 'cut access to something', 'A broad label can shut off access.'],
      ],
      adjectives: [
        ['discretionary', 'left to someone’s judgement rather than automatic', 'An exception should be discretionary and reviewable.'],
        ['prescriptive', 'telling people what to do in a strict way', 'The guide became too prescriptive.'],
        ['contestable', 'open to challenge or disagreement', 'The age label is contestable.'],
        ['proportionate', 'no more restrictive than the situation requires', 'The decision needs a proportionate response.'],
      ],
      connectors: [
        ['insofar as', 'limits a claim to the extent it holds', 'The projections are useful insofar as the assumptions are visible.'],
        ['for all its appeal', 'concedes the attractiveness of an idea before examining a limitation', 'For all its appeal, the proposal relies on one supplier.'],
        ['even granting that', 'concedes a premise while disputing its consequences', 'Even granting that the process is slow, the safeguard matters.'],
        ['to put the point more sharply', 'recasts an argument with greater precision or force', 'To put the point more sharply, consent and convenience are different tests.'],
      ],
    },
    models: {
      a: [
        'I’d use guidance **insofar as** it helps a pupil decide what they want to encounter. A librarian can **steer a reader towards** useful information without assuming that every pupil of a certain age has the same **maturity**.',
        '**For all its appeal**, a discussion creates **gatekeeping** if staff can refuse without giving reasons. I’d **set out** which decisions are **discretionary** and give pupils quick **recourse**.',
        'I’d choose A only if the guidance is genuinely advisory in normal cases and an exception process can be used without making a public statement about what someone wants to read. I’d ask pupils whether the guidance helps them decide, since an adult’s sense of a reassuring process may not reflect what a reader experiences while using it.',
      ],
      b: [
        'I’d let older pupils use the same catalogue. A **prescriptive** age label can **shut off** information precisely when someone wants to explore it privately. Opt-in information and staff support preserve choice without assuming the decision for the reader.',
        '**Even granting that** staff should guide pupils towards material they are ready for, age is a **contestable** proxy for interest and **maturity**.',
        '**To put the point more sharply**, a warning can support an informed choice without becoming a requirement to justify the interest. I’d choose B if guidance remains easy to find and the school explains how concerns can be raised. A school should also check whether pupils can find that advice without publicly identifying a private concern, which is one way support can become inaccessible.',
      ],
      conditional: [
        'I’d **set out** the difference between meaningful advice and a restriction. **Insofar as** a content note helps a reader choose and can be ignored privately, it is a **proportionate** use of guidance.',
        'When permission is required, the policy needs **recourse** and limits on **discretion**. **Even granting that** some situations justify a conversation, it should be quick and clearly **contestable**.',
        'I’d choose B wherever guidance works without a gate. I’d allow a carefully justified exception rather than **shut off** access to whole groups of books. If a restriction cannot be defended to the people it affects in terms they can check, I’d replace it with guidance and review the outcome.',
      ],
    },
  },
  {
    slug: 'permanent-monument-or-rotating-memorial',
    title: 'Commission a permanent monument or rotating installations?',
    prompt: 'A city has a prominent civic site and money to remember an event that affected many groups in different ways. Should it commission a permanent monument with agreed wording or fund a series of temporary installations with different contributors?',
    options: [
      { label: 'Permanent monument', description: 'Create a durable public point of remembrance after consultation and provide supporting information.' },
      { label: 'Rotating installations', description: 'Give different contributors time at the site and preserve a record of each installation.' },
    ],
    conditionalPrompt: 'Decide what should remain stable over time and where the city should leave room for a different account.',
    vocabulary: {
      nouns: [
        ['commemoration', 'public remembrance of a person or event', 'The ceremony is part of the commemoration.'],
        ['continuity', 'something remaining available or recognisable over time', 'The monument provides continuity.'],
        ['contestation', 'ongoing disagreement about meaning or authority', 'The archive records the contestation over the event.'],
        ['custodianship', 'responsibility for caring for a place or object', 'The museum took on custodianship.'],
      ],
      phrasalVerbs: [
        ['hand down', 'pass a story or practice to a later generation', 'Families handed down the account.'],
        ['make room for', 'create space or opportunity for something else', 'The programme makes room for new accounts.'],
        ['freeze in place', 'keep a position or interpretation from changing', 'The design froze one interpretation in place.'],
        ['bring out', 'make a detail or quality easier to notice', 'The exhibition brought out differences between the accounts.'],
      ],
      adjectives: [
        ['enduring', 'continuing to exist or matter for a long time', 'The inscription is intended as an enduring mark.'],
        ['plural', 'involving several views or elements', 'The site allows a plural account of the event.'],
        ['revisable', 'possible to reconsider and change', 'The supporting text is revisable.'],
        ['tokenistic', 'appearing to include people without giving them meaningful influence', 'A single consultation can be tokenistic.'],
      ],
      connectors: [
        ['for all its appeal', 'concedes the attractiveness of an idea before examining a limitation', 'For all its appeal, the proposal relies on one supplier.'],
        ['by the same token', 'extends the same logic to another case', 'By the same token, the rule should apply to bigger suppliers.'],
        ['subject to', 'states a requirement that limits or governs an action', 'The policy can proceed subject to an independent review.'],
        ['on that reading', 'draws a conclusion from a particular interpretation', 'On that reading, the exception has a narrow scope.'],
      ],
    },
    models: {
      a: [
        'I’d commission an **enduring** monument to give the public a place to return to. **Continuity** matters when people **hand down** a practice of remembrance, even if later generations interpret the event differently.',
        '**For all its appeal**, a permanent inscription can **freeze one account in place**. I’d keep its wording limited to points the city can defend and make the supporting material **revisable**.',
        '**On that reading**, A anchors a **commemoration** rather than settling the meaning once and for all. I’d give contributors a visible route to add an account without always needing to redesign the site. I’d also write down the authority responsible for future changes, since an apparently flexible arrangement is hard to use if nobody can approve a revision.',
      ],
      b: [
        'I’d choose rotating installations because serious **contestation** cannot always be resolved in time to engrave a single text. An explicitly **plural** programme can **make room for** accounts that a common inscription would have to compress.',
        '**By the same token**, repeated change can turn remembrance into a sequence of events with little **continuity**. I’d name a body responsible for **custodianship** and keep a visible record of earlier work.',
        '**Subject to** an inclusive process for new contributions, B makes differences understandable. It is weaker if the changes merely rotate which group receives a brief but **tokenistic** slot. I would give contributors enough time at the site for the work to be encountered repeatedly, instead of measuring inclusion by how many changes happen each year.',
      ],
      conditional: [
        'I’d give the site a stable purpose and make its interpretation **revisable**. A permanent point of **commemoration** makes sense if it can **hand down** the core facts without presenting one voice as the whole story.',
        '**By the same token**, where the most important issue is **contestation** over those facts or their meaning, I’d use a **plural** programme to **bring out** different accounts.',
        '**On that reading**, the dividing line is what a later contributor can genuinely change. I’d choose the scheme whose **custodianship** makes room for that change without losing the record of what came before. The decision would also have to specify what can be archived when an exhibit comes down, so later disagreement has a record rather than just competing memories.',
      ],
    },
  },
]
