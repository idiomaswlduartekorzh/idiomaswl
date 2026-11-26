import type { SpeakingDilemma } from './types'

export const WORK_AND_MEDIA_DILEMMAS: readonly SpeakingDilemma[] = [
  {
    slug: 'hybrid-work-days',
    title: 'Fixed office days or team autonomy?',
    prompt: 'A company wants staff to spend some time in the office. Should everyone come in on the same two days, or should each team choose when to meet based on its work?',
    options: [
      { label: 'Two shared office days', description: 'Make it easy to meet someone from a different team without arranging a special trip. Staff have less control over their weekly travel.' },
      { label: 'Team-chosen office days', description: 'Let teams organise in-person time around projects and individual needs. Teams may miss each other when their schedules differ.' },
    ],
    conditionalPrompt: 'Name a type of work that genuinely benefits from overlap and a sign that a fixed schedule would be excessive.',
    vocabulary: {
      nouns: [
        ['coordination cost', 'the time or effort needed to organise people’s work', 'Finding a shared slot adds a coordination cost.'],
        ['spillover', 'an effect that reaches beyond its original activity or group', 'The workshop had a positive spillover for other teams.'],
        ['commute burden', 'the time, cost or strain of getting to work', 'Two extra trips increase the commute burden.'],
        ['handover', 'the transfer of work or responsibility to someone else', 'We need a clear handover between shifts.'],
      ],
      phrasalVerbs: [
        ['line up schedules', 'arrange schedules so they match', 'It took a week to line up our schedules.'],
        ['draw out concerns', 'encourage people to express concerns', 'The manager drew out concerns in the meeting.'],
        ['catch up on work', 'do work that was delayed', 'She caught up on work at home.'],
        ['settle into a routine', 'get used to a regular pattern', 'The team settled into a new routine.'],
      ],
      adjectives: [
        ['synchronous', 'happening at the same time', 'We schedule one synchronous session each week.'],
        ['dispersed', 'spread across different places', 'The team is geographically dispersed.'],
        ['prescriptive', 'setting detailed rules about how things should be done', 'A prescriptive policy leaves little room to adapt.'],
        ['interdependent', 'relying on each other to get work done', 'The two teams are highly interdependent.'],
      ],
      connectors: [
        ['For a start, …', 'give the first reason for your position', 'For a start, people need a common meeting day.'],
        ['Whereas …', 'compare two situations with different features', 'Whereas design needs workshops, payroll follows a routine.'],
        ['In turn, …', 'introduce the next effect in a chain', 'A faster handover, in turn, reduces delays.'],
        ['All the same, …', 'keep a point despite what you just acknowledged', 'All the same, the commute still takes time.'],
      ],
    },
    models: {
      a: [
        'I’d try shared office days. **For a start**, when teams are **interdependent**, arranging a **handover** for every issue has a **coordination cost**. A common day lets people resolve several small questions in one trip.',
        'I’d ask managers to fill those days with conversations that benefit from being **synchronous**. Sending staff in to sit on separate video calls could waste the chance to **draw out concerns** or solve a problem with someone from another team.',
        '**All the same**, a rule can become too **prescriptive**. I’d allow exceptions where the **commute burden** is substantial and review whether handovers actually get faster. I’d retain the common days if the time saved is visible.',
      ],
      b: [
        'I’d let teams choose. **Whereas** some groups need frequent live workshops, others do most of their work independently. A **prescriptive** schedule adds a **commute burden** even on days when people need quiet time to **catch up on work**.',
        'The risk is that departments **settle into a routine** that suits them individually. The **spillover** from seeing other teams could disappear. I’d have project leads **line up schedules** for shared milestones, rather than leaving cross-team meetings to chance.',
        '**All the same**, I’d still give teams the first decision. If delays start appearing at every **handover**, that would be a reason for a common day. Until then, I’d use the time in person when it has a clear purpose.',
      ],
      conditional: [
        'I’d first look at where work gets stuck. If **interdependent** teams keep waiting for a **handover**, I’d ask them to **line up schedules** on one trial day. Two mandatory days may be more than the problem requires.',
        '**Whereas** some teams are based near the office, a **dispersed** team may lose hours on a single trip. If cross-team work already moves smoothly, I’d let those teams choose the **synchronous** sessions they have a good reason to attend.',
        'I’d compare the **coordination cost** before and after the trial. Shorter delays would support A, especially if they help other teams **in turn**. Little change alongside a heavier **commute burden** would lead me towards B.',
      ],
    },
  },
  {
    slug: 'hiring-first-round',
    title: 'A work sample or an interview first?',
    prompt: 'An employer has time for one first-round assessment per candidate. Should it ask for a short anonymous work sample or conduct a structured interview with the same questions for everyone?',
    options: [
      { label: 'An anonymous work sample', description: 'Give applicants a short task that resembles the job. Assess it using a rubric before seeing their names.' },
      { label: 'A structured interview', description: 'Ask every applicant to explain the same work scenarios and score their answers with a rubric. The interviewer will know who the candidate is.' },
    ],
    conditionalPrompt: 'Choose the most important skill for a role and say which assessment would give you the clearest evidence of it.',
    vocabulary: {
      nouns: [
        ['work sample', 'a piece of work used to demonstrate someone’s ability', 'Each assessor scored the same work sample.'],
        ['shortlisting', 'reducing the number of applicants to a smaller pool', 'The rubric makes shortlisting more consistent.'],
        ['signal', 'a piece of information that indicates something else', 'The sample gives a stronger signal about writing.'],
        ['baseline', 'a starting standard used for comparison', 'The same task gives us a common baseline.'],
      ],
      phrasalVerbs: [
        ['screen out applicants', 'remove applicants who do not meet a requirement', 'A long unpaid task can screen out busy applicants.'],
        ['talk through a decision', 'explain the steps behind a decision out loud', 'She talked through a difficult decision.'],
        ['pick up on a cue', 'notice a small clue or detail', 'The applicant picked up on a hesitation.'],
        ['stack up against a standard', 'compare with a standard in quality or performance', 'The samples stack up against a clear standard.'],
      ],
      adjectives: [
        ['comparable', 'similar enough to be judged against each other', 'A shared prompt makes responses comparable.'],
        ['job-relevant', 'closely related to what a job actually involves', 'Proofreading is a job-relevant skill here.'],
        ['scripted', 'prepared in advance rather than spontaneous', 'The answer sounded scripted.'],
        ['time-intensive', 'requiring a large amount of time', 'A take-home exercise can be time-intensive.'],
      ],
      connectors: [
        ['For the purposes of …', 'limit a claim to a particular activity or goal', 'For the purposes of shortlisting, the task is enough.'],
        ['In other words, …', 'restate a point more clearly', 'In other words, judge the work itself.'],
        ['Admittedly, …', 'acknowledge a weakness or objection', 'Admittedly, a sample takes time to mark.'],
        ['In this respect, …', 'limit a judgement to the point under discussion', 'In this respect, both methods have the same aim.'],
      ],
    },
    models: {
      a: [
        '**For the purposes of** **shortlisting**, I’d use a **work sample**. If I’m hiring someone to edit a newsletter, I want to see how they deal with a paragraph that actually needs editing. A **job-relevant** task gives me a clearer **signal** than an account of how they usually work.',
        '**Admittedly**, a take-home exercise can be **time-intensive** and **screen out** people who have jobs or caring responsibilities. I’d cap it at twenty minutes and let applicants choose when to do it. The same task and rubric would give assessors a common **baseline**.',
        '**In this respect**, anonymity improves the first decision. The employer can ask about how applicants made their choices at a later stage.',
      ],
      b: [
        'I’d begin with a structured interview for a role that involves responding to people. A candidate can **talk through** a decision, and the interviewer can **pick up on** how they react when an assumption changes. That gives a useful **signal** about judgement.',
        '**Admittedly**, a polished answer can sound convincing even when it’s **scripted**. I’d ask the same follow-up of everyone, so answers remain **comparable** and people have an equal chance to clarify their reasoning.',
        '**In other words**, I’m choosing an interview because conversation is part of the job. For a role centred on producing a written or technical output, I’d place more weight on a **work sample**.',
      ],
      conditional: [
        'My choice depends on the skill we need to see. **For the purposes of** finding a copy editor, I’d use an anonymous **work sample** and check how each response **stacks up against** a shared rubric.',
        '**Admittedly**, for a role that involves resolving complaints, the strongest **signal** might come when a candidate has to **talk through** a trade-off and respond to a follow-up. The two tests are **job-relevant** in different settings.',
        '**In this respect**, I’d ask the team to show how the first-round score relates to actual work. I’d choose A for an observable output, B for a role where adapting a conversation is central, and keep either test short enough to be fair.',
      ],
    },
  },
  {
    slug: 'salary-range-transparency',
    title: 'Publish salary bands now or in stages?',
    prompt: 'An organisation has agreed to make pay ranges public. Should it publish the ranges internally and in job adverts now, or share them with staff first and correct inconsistencies before updating adverts three months later?',
    options: [
      { label: 'Publish both at once', description: 'Give employees and applicants the same information immediately. Some salaries may need explaining while the pay review continues.' },
      { label: 'Publish in stages', description: 'Give staff the ranges now and review confirmed inconsistencies before updating job adverts. Applicants receive less information during the three-month transition.' },
    ],
    conditionalPrompt: 'Separate problems simple explanation can resolve from differences that require a pay adjustment.',
    vocabulary: {
      nouns: [
        ['pay band', 'the salary range assigned to a role or level', 'The job advert lists its pay band.'],
        ['pay compression', 'a narrowing of pay differences between workers with different experience', 'Pay compression reduced the gap between recruits and supervisors.'],
        ['disparity', 'a significant or unfair difference', 'The review found a disparity between similar posts.'],
        ['benchmark', 'a reference point used to judge other figures', 'Market rates give the team a benchmark.'],
      ],
      phrasalVerbs: [
        ['iron out inconsistencies', 'resolve small differences or problems', 'The team ironed out inconsistencies before launch.'],
        ['level with employees', 'tell employees the honest facts', 'The director levelled with employees about the budget.'],
        ['hold back information', 'keep information from being released', 'Holding back information made the policy harder to trust.'],
        ['own up to a mistake', 'admit responsibility for a mistake', 'The manager owned up to a mistake in the figures.'],
      ],
      adjectives: [
        ['commensurate with', 'fair or appropriate in relation to something', 'Pay should be commensurate with responsibility.'],
        ['defensible', 'able to be justified with good reasons', 'The difference is defensible if the duties differ.'],
        ['opaque', 'difficult for others to understand or see through', 'The old review process was opaque.'],
        ['remediable', 'able to be improved or corrected', 'The discrepancy is remediable this year.'],
      ],
      connectors: [
        ['At the same time, …', 'introduce another point to weigh alongside the first', 'At the same time, staff need a deadline.'],
        ['In the meantime, …', 'say what happens while something else is pending', 'In the meantime, applicants can ask for a range.'],
        ['By extension, …', 'apply a conclusion to a related situation', 'By extension, applicants need a clear range too.'],
        ['Before that can happen, …', 'introduce something that must happen first', 'Before that can happen, payroll needs to check the figures.'],
      ],
    },
    models: {
      a: [
        'I’d publish now. Staff can’t tell whether their pay is **commensurate with** their duties when the system is **opaque**. **By extension**, applicants need the **pay band** to decide whether an interview is worth their time.',
        '**At the same time**, a public figure can expose real **pay compression** without fixing it. I’d **level with employees** about what the range means and set dates for reviewing differences. Where a band was drawn incorrectly, the organisation should **own up to** it.',
        'I’d choose A because immediate access and a review can happen together. The review would explain which differences are **defensible**, who will get a correction and when staff will hear the result.',
      ],
      b: [
        'I’d take the three months. A **benchmark** can look authoritative even if the roles behind it were classified inconsistently. Before we publish outside the organisation, we should **iron out inconsistencies** that could put a current employee below the newly advertised range.',
        '**In the meantime**, staff would already see the figures and could challenge a **disparity**. I’d give applicants a provisional **pay band** on request. That leaves some **remediable** uncertainty while giving the review team a deadline.',
        '**At the same time**, the risk is that the delay becomes routine. I’d back B only with a public release date and a funded plan for pay corrections. A reason to wait needs to include a concrete change staff will see.',
      ],
      conditional: [
        'I’d start by asking what kinds of gaps exist. If the **pay bands** are already **defensible** and the remaining **disparities** can be explained, I’d publish now and **level with employees** about any unresolved detail.',
        '**Before that can happen**, some organisations may need to **iron out** major errors. If they can correct a **remediable** gap within three months, a staged release is reasonable, provided applicants can still get a realistic range.',
        '**At the same time**, I’d ask whether the review changes anyone’s pay or merely changes the wording. A is better if the delay achieves little. B earns its time when the organisation can show which gaps it will close.',
      ],
    },
  },
  {
    slug: 'community-project-funding',
    title: 'Pay maintainers or train new contributors?',
    prompt: 'A volunteer team maintains a free budgeting tool for small community groups. A grant could pay two experienced maintainers for a year or fund training and support for a larger pool of new contributors. Which should it fund?',
    options: [
      { label: 'Pay experienced maintainers', description: 'Give two people protected time to handle support and improvements. The project could still depend on them when the grant ends.' },
      { label: 'Train new contributors', description: 'Run a structured programme and pair participants with volunteers. It will take time before enough people can share the work.' },
    ],
    conditionalPrompt: 'Decide whether the immediate problem is too much work for the current team or too few people able to take over.',
    vocabulary: {
      nouns: [
        ['maintenance burden', 'the ongoing work needed to keep something running', 'Support requests increased the maintenance burden.'],
        ['succession', 'the process of replacing people in key roles', 'The team made a plan for succession.'],
        ['onboarding', 'helping new people learn how to join and contribute', 'A clear guide improved contributor onboarding.'],
        ['churn', 'the rate at which people leave and are replaced', 'Churn was high after the first workshop.'],
      ],
      phrasalVerbs: [
        ['keep up with requests', 'handle requests at the rate they arrive', 'Volunteers can’t keep up with requests.'],
        ['hand over a task', 'transfer responsibility for a task', 'She handed over the monthly update.'],
        ['pitch in', 'help with shared work', 'Several users pitched in at the workshop.'],
        ['burn out', 'become exhausted from prolonged stress or work', 'The lead volunteer was close to burning out.'],
      ],
      adjectives: [
        ['understaffed', 'having too few people for the work', 'Support is understaffed this month.'],
        ['sustainable', 'able to continue without exhausting resources or people', 'The rota is sustainable with six volunteers.'],
        ['thankless', 'hard work for which people show little appreciation', 'Checking reports can be a thankless job.'],
        ['interchangeable', 'able to replace one another with little loss', 'The support roles are fairly interchangeable.'],
      ],
      connectors: [
        ['As it stands, …', 'describe the situation in its present form', 'As it stands, only one person knows the process.'],
        ['On top of that, …', 'add a further reason or complication', 'On top of that, requests keep arriving.'],
        ['In the longer run, …', 'look beyond the initial effects', 'In the longer run, the team needs more mentors.'],
        ['Unless …', 'identify a condition that would change the outcome', 'Unless someone takes over, support will stop.'],
      ],
    },
    models: {
      a: [
        '**As it stands**, the team can’t **keep up with requests**. I’d pay the maintainers because the **maintenance burden** is already falling on too few people. Experienced people who are close to **burning out** need protected time more than extra duties as trainers.',
        '**On top of that**, a paid year gives them time to write down routines and **hand over** manageable tasks. Paying them would be less **sustainable** if the grant simply buys a year of doing everything themselves.',
        '**In the longer run**, I’d judge the plan by how much responsibility the wider group can take. For now, though, I’d choose A because the tool needs someone who can keep it running while that happens.',
      ],
      b: [
        'I’d fund training. An **understaffed** project can remain fragile even when two people are paid. We need a plan for **succession**, especially if the same people will have to leave or cut their hours when the grant ends.',
        '**As it stands**, new volunteers may be willing to **pitch in** but unsure how. I’d work on **onboarding** by giving each learner a small task with a real user and someone to ask for help. That could reduce **churn** after the workshops.',
        '**In the longer run**, the goal is a **sustainable** rota. I’d protect current volunteers from mentoring too many people at once and check how many participants can take over a routine task unaided.',
      ],
      conditional: [
        'I’d look at whether the current **maintenance burden** threatens the next few months. If people are **burning out** and support is already **understaffed**, I’d pay for immediate capacity and agree which tasks the maintainers will **hand over**.',
        '**In the longer run**, if the tool is stable but only two people can deal with recurring work, training would make **succession** more realistic. I’d look for people who are ready to commit after the course, since one workshop turnout tells us little about **churn**.',
        '**Unless** the group can keep the tool usable during training, I’d choose A. If the current team can manage that transition, B would spread both the work and the knowledge.',
      ],
    },
  },
  {
    slug: 'local-news-funding',
    title: 'Free local news or member-funded reporting?',
    prompt: 'A local newsroom needs a reliable income for council reporting. Should it make its work free using a one-year foundation grant or fund the service through memberships that give paying readers most of the articles?',
    options: [
      { label: 'Free access with a grant', description: 'Leave all reporting open and agree written protections for editorial decisions. The newsroom will need another source of funding after one year.' },
      { label: 'Reader memberships', description: 'Keep key public notices free and put most reporting behind a paywall. Income grows only if enough readers become and remain members.' },
    ],
    conditionalPrompt: 'Say what would convince you that the free option is independent or the paid option remains a public service.',
    vocabulary: {
      nouns: [
        ['paywall', 'a system that restricts content to paying readers', 'The article sits behind a paywall.'],
        ['editorial independence', 'freedom to choose coverage without outside control', 'The contract protects editorial independence.'],
        ['underwriting', 'financial support that covers the cost of an activity', 'Foundation underwriting paid for the new beat.'],
        ['renewal rate', 'the share of members who pay for another period', 'The newsroom tracks its renewal rate.'],
      ],
      phrasalVerbs: [
        ['sign up for a membership', 'register to become a member', 'Two hundred readers signed up in May.'],
        ['pull out of an agreement', 'withdraw from an agreement', 'The funder pulled out before the second year.'],
        ['chip in', 'contribute a share of the money or effort', 'Several readers chipped in to fund a story.'],
        ['top up funding', 'add money to an existing amount', 'Donations topped up the reporting budget.'],
      ],
      adjectives: [
        ['self-sustaining', 'able to continue from its own resources or income', 'The service could become self-sustaining.'],
        ['ring-fenced', 'reserved for a specific purpose', 'The grant is ring-fenced for reporting.'],
        ['precarious', 'uncertain and likely to fail if conditions change', 'A single source leaves the budget precarious.'],
        ['unconditional', 'offered without conditions about what must happen', 'The newsroom asked for unconditional support.'],
      ],
      connectors: [
        ['As a first step, …', 'introduce an initial action', 'As a first step, publish who provides the grant.'],
        ['In return, …', 'state what is given back for something received', 'In return, members get a weekly briefing.'],
        ['Under those circumstances, …', 'base a conclusion on the conditions just described', 'Under those circumstances, I’d keep coverage open.'],
        ['Otherwise, …', 'state what would happen if the condition is not satisfied', 'Otherwise, the service could disappear next year.'],
      ],
    },
    models: {
      a: [
        'I’d take the grant. Putting council coverage behind a **paywall** can keep out the people who most need to know what the council is doing. A **ring-fenced** grant buys a year in which every resident can read the reporting.',
        '**As a first step**, I’d publish the terms and guarantee **editorial independence**, including the right to cover the foundation critically. I’d also ask readers to **chip in** voluntarily while access is still free.',
        'The main weakness is a **precarious** budget after the first year. I’d use the grant to see whether voluntary contributions and other support can **top up funding** over time. **Under those circumstances**, I’d start open and judge the next step against actual reader behaviour.',
      ],
      b: [
        'I’d start with memberships. Foundation **underwriting** can protect access for one year, yet the newsroom may drop its council beat if a funder **pulls out**. A broad base of subscribers is a better route towards **self-sustaining** reporting.',
        '**In return**, members should get useful coverage and a clear account of what their fees support. I’d still publish urgent notices and election information openly. **Otherwise**, the service would mainly inform residents who can afford it.',
        'I’d ask people to **sign up** before committing to the full plan and track the **renewal rate** early. If members don’t stay, B doesn’t solve the income problem either, and the newsroom would need to reconsider.',
      ],
      conditional: [
        'I’d take the grant if it is **unconditional** about individual stories and provides written **editorial independence**. **As a first step**, I’d test whether readers will **chip in** voluntarily while coverage is open.',
        'I’d choose memberships if readers are ready to **sign up**, the expected **renewal rate** is strong and everyone can still get essential public information. That would make a **self-sustaining** service more plausible.',
        '**Under those circumstances**, both options could work. I’d favour A when the grant buys time to build a broad audience. **Otherwise**, if a one-year deal leaves the newsroom **precarious** and enough members are already willing to pay, I’d choose B.',
      ],
    },
  },
  {
    slug: 'returnable-takeaway-containers',
    title: 'Returnable or recyclable takeaway packaging?',
    prompt: 'A group of takeaway shops wants to reduce packaging waste. Should it adopt shared returnable containers with a deposit, or switch to a single recyclable format that customers can put in local collection bins?',
    options: [
      { label: 'Returnable containers', description: 'Charge a refundable deposit and let customers return containers to any shop in the group. Shops share the costs of washing and storing them.' },
      { label: 'Recyclable packaging', description: 'Use one locally accepted packaging material with clear disposal instructions. Customers do not need to bring containers back.' },
    ],
    conditionalPrompt: 'Name the return or recycling evidence that would make one system more credible than the other.',
    vocabulary: {
      nouns: [
        ['return rate', 'the share of items that users bring back', 'The return rate rose after stores joined the scheme.'],
        ['deposit', 'money returned when an item is brought back', 'A small deposit encourages people to return the box.'],
        ['contamination', 'unwanted material that makes a batch harder to process', 'Food residue can cause contamination.'],
        ['overhead', 'ongoing costs of operating a service or business', 'Shared washing kept overhead low.'],
      ],
      phrasalVerbs: [
        ['hand back a container', 'return a container to the person or place that issued it', 'I handed back my container at another branch.'],
        ['rinse out a box', 'clean the inside of a box briefly with water', 'Please rinse out the box before recycling it.'],
        ['switch over to a system', 'stop using one system and begin another', 'The shops switched over to returnable cups.'],
        ['get through supplies', 'use up supplies in a period of time', 'A busy shop gets through hundreds of boxes a week.'],
      ],
      adjectives: [
        ['stackable', 'able to fit neatly on top of similar items', 'The shop ordered stackable containers.'],
        ['single-use', 'designed to be used just once', 'The market still uses single-use boxes.'],
        ['unwieldy', 'awkward to handle or operate', 'The return process became unwieldy at lunchtime.'],
        ['recoverable', 'able to be obtained again or collected for reuse', 'The deposit is recoverable at every branch.'],
      ],
      connectors: [
        ['At the outset, …', 'describe the starting stage of a process', 'At the outset, the scheme needs a washing site.'],
        ['Once …', 'state what happens after a condition is met', 'Once the box comes back, it can be washed.'],
        ['A further consideration is that …', 'add another factor to the decision', 'A further consideration is that staff need storage space.'],
        ['If so, …', 'state what follows if the previous idea is true', 'If so, a smaller pilot would be worthwhile.'],
      ],
    },
    models: {
      a: [
        'I’d try returnables. A busy shop can **get through** large quantities of **single-use** packaging, and the same box could serve many customers if it keeps coming back. The **return rate** matters more than the number of boxes the scheme gives out.',
        '**At the outset**, I’d choose **stackable** containers and make the **deposit** recoverable at every branch. **Once** customers can **hand back** a box without making a special trip, they have a realistic chance of forming a habit.',
        'Washing adds **overhead**, so I’d test the scheme in one small area. I’d expand if most containers come back promptly and the shops can handle washing without turning the lunchtime queue into a problem.',
      ],
      b: [
        'I’d choose a single recyclable format. A shared return system could become **unwieldy** if people buy lunch near work and spend the rest of the week elsewhere. Sorting one material is an easier change for both staff and customers.',
        '**A further consideration is that** recycling only helps if the boxes are accepted and collected. I’d check whether people need to **rinse them out** and ask the collection service to measure **contamination** rather than assuming the label is enough.',
        '**At the outset**, I’d monitor how many **single-use** boxes actually make it into the right bin. I’d choose B for a dispersed customer base, with a return scheme still worth testing in locations where regulars come back often.',
      ],
      conditional: [
        'My first question is whether a high **return rate** is realistic. **Once** all shops accept the same **stackable** boxes, I’d test whether regular customers actually **hand them back**. I’d include the cost of washing every time.',
        'If most visits are one-offs, the process may become **unwieldy**. In that case, I’d **switch over** to one recyclable format and check the **contamination** rate. A printed recycling sign tells us little about what gets collected.',
        '**A further consideration is that** neither plan should be judged on how tidy it looks in the shop. I’d choose A if boxes keep circulating with manageable **overhead**, and B if local collection recovers more of the material people actually use.',
      ],
    },
  },
]
