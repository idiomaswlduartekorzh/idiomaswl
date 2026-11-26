import type { SpeakingDilemma } from './types'

const CONNECTORS: SpeakingDilemma['vocabulary']['connectors'] = [
  ['even so', 'maintains a point after acknowledging a difficulty', 'The bus is slow. Even so, it is useful after midnight.'],
  ['in particular', 'highlights the case that matters most', 'In particular, students with long journeys may benefit.'],
  ['provided that', 'introduces a requirement for a plan to work', 'I’d support the plan provided that people can opt out.'],
  ['by contrast', 'introduces a clearly different case', 'By contrast, the smaller event is easy to organise.'],
]

export const B2_DILEMMAS: readonly SpeakingDilemma[] = [
  {
    slug: 'later-school-start',
    title: 'Should school start and finish later?',
    prompt: 'A secondary school could move its start and finish times forty-five minutes later. Would the change improve the school day enough to justify changing transport and after-school schedules?',
    options: [
      { label: 'Move the day later', description: 'Give students more time in the morning and finish later in the afternoon.' },
      { label: 'Keep the current timetable', description: 'Keep transport and activities as they are and experiment with how the first lesson works.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['attendance', 'how often people arrive and take part', 'First-period attendance improved last month.'],
        ['knock-on effect', 'a further change caused by an earlier one', 'A later finish has a knock-on effect on clubs.'],
        ['alertness', 'the ability to notice and respond quickly', 'Morning alertness varies across the class.'],
        ['time slot', 'a scheduled period for an activity', 'The hall has a free time slot.'],
      ],
      phrasalVerbs: [
        ['push back', 'move something to a later time', 'They pushed back the first lesson.'],
        ['build in', 'include something in a plan from the start', 'Build in time for the bus transfer.'],
        ['fall behind', 'make less progress than is needed', 'Some students fell behind after missing class.'],
        ['stick with', 'continue using an existing plan', 'We stuck with last term’s timetable.'],
      ],
      adjectives: [
        ['disruptive', 'likely to interrupt the way things usually happen', 'Changing every bus route would be disruptive.'],
        ['measurable', 'able to be shown using figures', 'The trial needs a measurable result.'],
        ['feasible', 'possible to do successfully', 'A one-term trial looks feasible.'],
        ['overstretched', 'being asked to do more than resources allow', 'The transport service is already overstretched.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **push back** the start for one term. If **alertness** and first-period **attendance** are low, extra time could improve lessons students already have to attend.',
        '**Even so**, the **knock-on effect** on transport and clubs could be **disruptive**. I’d **build in** a short break before afternoon activities and speak to families who depend on the existing buses.',
        'I’d keep the change only if it produces a **measurable** improvement.',
      ],
      b: [
        'I’d **stick with** the current timetable. **In particular**, families who collect younger children may have no other **time slot**, and the bus service is already **overstretched**.',
        'The school could put a short review at the start of the day and check whether fewer students **fall behind**.',
        'I’d reconsider a later start if the morning problem is still **measurable** after these smaller changes.',
      ],
      conditional: [
        'I’d try a later day **provided that** transport is **feasible** and **attendance** can be compared fairly across terms. I’d record the effects on afternoon activities as well.',
        '**By contrast**, if the **knock-on effect** is large and only one group struggles in the morning, I’d **stick with** the timetable and target the first lesson.',
        'The change should solve more of the problem than it creates.',
      ],
    },
  },
  {
    slug: 'school-volunteering-requirement',
    title: 'Require volunteering or keep it optional?',
    prompt: 'A school wants more students to contribute to its community. Should twenty hours of volunteering be required for graduation or should volunteering remain optional with staff support?',
    options: [
      { label: 'Set a requirement', description: 'Ask everyone to complete twenty hours and provide choices they can do during school time.' },
      { label: 'Keep it optional', description: 'Give interested students guidance and recognition. Let them decide whether and how much to do.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['commitment', 'time or effort you agree to give', 'A weekly session is a commitment.'],
        ['placement', 'a short period working in a real setting', 'I chose a placement at the library.'],
        ['motivation', 'the reason or energy behind an action', 'The project increased her motivation.'],
        ['participation', 'the act of taking part', 'We measured participation across the year.'],
      ],
      phrasalVerbs: [
        ['carry out', 'do or complete a planned task', 'Students carried out the work in teams.'],
        ['follow through', 'complete what you started or promised', 'He followed through on his promise.'],
        ['opt out', 'choose not to take part', 'Students can opt out of the event.'],
        ['sign off on', 'formally approve a plan or record', 'The teacher signed off on her hours.'],
      ],
      adjectives: [
        ['compulsory', 'required by a rule', 'The session is compulsory.'],
        ['meaningful', 'having a clear value or purpose', 'The tasks felt meaningful.'],
        ['flexible', 'able to change for different needs', 'The arrangement is flexible.'],
        ['uneven', 'different in amount or effect across a group', 'Participation was uneven.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d make it **compulsory** if the school can offer **flexible** **placements** during the day. That gives everyone a first experience, including students who might not find opportunities alone.',
        '**Even so**, a target can encourage people to count hours rather than **follow through** on **meaningful** work.',
        'I’d ask partners to **sign off on** one finished contribution as well as hours, so the experience is judged on what students actually do.',
      ],
      b: [
        'I’d keep volunteering optional. **In particular**, a genuine **commitment** is easier to sustain when the student chose the work.',
        '**Uneven** **participation** is a drawback, so I’d ask staff to offer several projects with clear start and finish dates. A student could **opt out** of a poor fit and join another project.',
        'I’d put effort into removing barriers before making the activity **compulsory**.',
      ],
      conditional: [
        'A requirement could work **provided that** the school offers a **flexible** **placement** to anyone who needs one. I’d also check whether students **carry out** useful work rather than just attend.',
        '**By contrast**, if organisations cannot offer **meaningful** tasks at that scale, I’d keep it optional.',
        'The quality of the experience would matter more to me than a higher **participation** figure.',
      ],
    },
  },
  {
    slug: 'night-buses-or-daytime-frequency',
    title: 'Late buses or more frequent daytime buses?',
    prompt: 'A town can fund the same number of extra bus trips either late at night or during busy daytime hours. Where would those trips make the biggest difference?',
    options: [
      { label: 'Extend evening service', description: 'Run buses for two extra hours on the busiest routes.' },
      { label: 'Increase daytime frequency', description: 'Reduce the waiting time on routes that fill up during the day.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['frequency', 'how often a service runs', 'The frequency drops after six.'],
        ['shift worker', 'someone whose work is scheduled in blocks at different times', 'A night bus would help shift workers.'],
        ['capacity', 'the maximum number that can be carried', 'The morning bus is at capacity.'],
        ['coverage', 'the area or range a service reaches', 'Bus coverage is limited after dark.'],
      ],
      phrasalVerbs: [
        ['get by on', 'manage with a limited amount of something', 'We get by on two buses an hour.'],
        ['cut down on', 'reduce the amount of something', 'More buses could cut down on waiting.'],
        ['fill up', 'become full', 'The first bus fills up outside the station.'],
        ['spread out', 'distribute across a wider time or space', 'Trips were spread out over the evening.'],
      ],
      adjectives: [
        ['stranded', 'left somewhere without a way to leave', 'Two passengers were stranded after midnight.'],
        ['overcrowded', 'containing too many people', 'The bus was overcrowded.'],
        ['patchy', 'working in some places or times but not others', 'Evening service is patchy.'],
        ['essential', 'needed rather than optional', 'The morning journey is essential.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d extend evening **coverage**. A person who finishes after the last bus may get **stranded**, especially a **shift worker** without another way home.',
        '**Even so**, running a late bus everywhere would **spread out** the available trips too thinly. I’d concentrate them on routes that connect major workplaces and transfer points.',
        'I’d assess whether people who currently cannot get home actually start using the service, regardless of the average passenger count.',
      ],
      b: [
        'I’d increase **frequency** at busy times. **In particular**, buses that **fill up** before the last stop leave people waiting every day.',
        'Extra **capacity** is useful where the service is **overcrowded** rather than simply slow. I’d aim to **cut down on** missed boardings first.',
        'An evening service would still be worth considering if the town can assign a few runs to a route that presently leaves people **stranded**.',
      ],
      conditional: [
        'I’d choose later buses if **coverage** is **patchy** where **shift workers** need an **essential** link. Daytime riders may **get by on** fewer services, but others could have no bus home.',
        '**By contrast**, if riders regularly cannot board because buses **fill up**, I’d add daytime **capacity**.',
        'I’d compare the number of people left without a viable journey under each option.',
      ],
    },
  },
  {
    slug: 'station-bike-lockers-or-rental',
    title: 'Bike lockers or a shared bike service?',
    prompt: 'A station wants to help people travel the last part of their journey by bike. Should it install secure lockers for passengers’ bikes or provide shared bikes people can borrow?',
    options: [
      { label: 'Install lockers', description: 'Give regular passengers somewhere secure to leave their own bikes.' },
      { label: 'Provide shared bikes', description: 'Let people borrow a bike when they arrive and return it to a nearby point.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['theft', 'taking someone’s property without permission', 'Theft fell after lockers were installed.'],
        ['dock', 'a place where a shared bike is collected and returned', 'There is a dock near the library.'],
        ['upkeep', 'work and expense needed to keep something usable', 'The council pays for upkeep.'],
        ['passenger', 'a person travelling in a vehicle', 'Passengers wanted a safer way to cycle home.'],
      ],
      phrasalVerbs: [
        ['lock up', 'secure something with a lock', 'I locked up my bike at the station.'],
        ['pick up', 'collect something', 'You can pick up a bike outside.'],
        ['drop off', 'return something to a particular place', 'I dropped off the bike near work.'],
        ['wear out', 'become unusable after repeated use', 'The brakes wore out quickly.'],
      ],
      adjectives: [
        ['cost-effective', 'giving a good result for the money spent', 'The lockers look cost-effective.'],
        ['accessible', 'possible for different people to reach or use', 'The dock is accessible from the platform.'],
        ['scarce', 'available in small quantities', 'Secure cycle space is scarce.'],
        ['dependable', 'able to work when needed', 'The return system should be dependable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d install lockers. Existing **passengers** already know how to use their own bikes, but space to **lock up** is **scarce** and **theft** can put them off.',
        '**Even so**, lockers mainly serve people who already own a bike. I’d make a few available for occasional users and avoid a long membership agreement.',
        'I’d choose A if the lockers are a **cost-effective** way to support repeated trips without adding much **upkeep**.',
      ],
      b: [
        'I’d choose shared bikes. **In particular**, visitors who arrive by train could **pick up** a bike and **drop it off** near their destination.',
        'A **dependable** network needs enough **docks** and funds for **upkeep**, especially if components **wear out**.',
        'I’d start with a small **accessible** route between the station and areas with steady demand rather than trying to serve the whole town immediately.',
      ],
      conditional: [
        'I’d choose lockers if people already bring bikes and need somewhere **dependable** to **lock them up**. Rising **theft** or a long waiting list would support that case.',
        '**By contrast**, if many infrequent visitors would **pick up** a bike and several destinations can host a **dock**, sharing could have wider reach.',
        'I’d test which plan removes a real barrier for **passengers** before choosing.',
      ],
    },
  },
  {
    slug: 'pool-lanes-or-family-lessons',
    title: 'More swimming lanes or family lessons?',
    prompt: 'A public pool has one spare hour each weekend. Should it use it for individual lane swimming or family lessons for beginners?',
    options: [
      { label: 'Lane swimming', description: 'Open the hour to swimmers who want regular exercise.' },
      { label: 'Family lessons', description: 'Offer a structured lesson for adults and children who are new to swimming.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['allocation', 'the way an amount or period is divided', 'The pool reviews its weekly allocation.'],
        ['confidence', 'belief that you can do something', 'The lessons built her confidence.'],
        ['waiting list', 'a list of people waiting for a place', 'There is a waiting list for both sessions.'],
        ['capacity', 'the number of people a place can hold', 'The lesson reached capacity.'],
      ],
      phrasalVerbs: [
        ['free up', 'make something available', 'They freed up another lane.'],
        ['turn away', 'refuse to let someone enter', 'Staff turned away three swimmers.'],
        ['sign up for', 'register for an activity', 'Families signed up for a lesson.'],
        ['build up', 'increase gradually', 'He built up confidence in the shallow end.'],
      ],
      adjectives: [
        ['oversubscribed', 'having more applicants than places', 'The beginners’ course is oversubscribed.'],
        ['regular', 'happening often or on a fixed schedule', 'I need a regular swimming slot.'],
        ['structured', 'organised in a clear way', 'The lesson is structured.'],
        ['flexible', 'able to adapt to different needs', 'A flexible membership helps shift workers.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **free up** time for lane swimming. **In particular**, people who rely on the pool for **regular** exercise may have no other slot at weekends.',
        'The hour can have more **capacity** when swimmers arrive at different times. I’d track how often staff **turn people away**.',
        'I’d choose A if the current sessions are full and another lesson slot could be found at a less crowded time.',
      ],
      b: [
        'I’d give the hour to a **structured** beginners’ session. Someone can **sign up for** a course and **build up** **confidence** over several weeks.',
        '**Even so**, giving lessons the slot limits other swimmers’ choices. I’d check whether the family **waiting list** is long enough to fill each session.',
        'I’d choose B if beginner sessions are **oversubscribed** and can’t regularly attend at another time.',
      ],
      conditional: [
        'I’d choose lessons **provided that** a long **waiting list** shows families cannot **sign up for** them elsewhere. The pool can review that **allocation** when demand changes.',
        '**By contrast**, if the lesson is already well served and **regular** lane sessions are at **capacity** most weekends, I’d **free up** a weekend lane.',
        'I’d count people who cannot use the service rather than total visits.',
      ],
    },
  },
  {
    slug: 'postgraduate-now-or-work-first',
    title: 'Start postgraduate study now or work first?',
    prompt: 'You can start a postgraduate course this year or take a related job and consider further study in two years. Which would you choose?',
    options: [
      { label: 'Study now', description: 'Continue studying while your academic skills are fresh and specialise earlier.' },
      { label: 'Work first', description: 'Gain experience and earn a salary before choosing whether to study again.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['specialism', 'a subject someone knows or studies in depth', 'The course offers a specialism in design.'],
        ['workload', 'the amount of work a person must do', 'The first term has a heavy workload.'],
        ['insight', 'a clearer understanding of something', 'The job gave me insight into the sector.'],
        ['opportunity cost', 'the value of what you give up by choosing something', 'The opportunity cost of studying was two years of income.'],
      ],
      phrasalVerbs: [
        ['build on', 'use something as a starting point for further work', 'The course builds on my degree.'],
        ['rule out', 'decide not to consider something', 'I haven’t ruled out studying later.'],
        ['settle on', 'decide after looking at alternatives', 'I settled on a course after a year at work.'],
        ['take on', 'accept work or responsibility', 'I took on a placement in the summer.'],
      ],
      adjectives: [
        ['specialised', 'focused on a particular area', 'The training is highly specialised.'],
        ['transferable', 'useful in a different job or setting', 'The role builds transferable skills.'],
        ['demanding', 'requiring a great deal of time or effort', 'The course is demanding.'],
        ['premature', 'happening before the time is right', 'The decision felt premature.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d study now if I can **build on** a clear **specialism**. **In particular**, a **specialised** course can give me supervised practice with work I already know I enjoy.',
        'I’d check the **workload** and calculate the **opportunity cost**, including income I would give up.',
        'I’d choose A if the qualification is a genuine step towards the role, rather than a way to put off applying for work.',
      ],
      b: [
        'I’d **take on** the job first. It could give me **insight** into the field and enough **transferable** skills to keep my options open.',
        '**Even so**, going back to study could be more **demanding** once I have regular expenses. I’d **settle on** a review date and save some of my earnings.',
        'Working first would help me avoid a **premature** choice of course.',
      ],
      conditional: [
        'I’d start now **provided that** the course **builds on** a **specialism** I want and is necessary for the next step. I wouldn’t ignore the **opportunity cost**.',
        '**By contrast**, if my plans are still broad, a related job can offer more **transferable** experience and **insight**.',
        'I’d change my decision if I discover that the roles I want actually require a particular qualification.',
      ],
    },
  },
  {
    slug: 'mentoring-or-training-budget',
    title: 'Offer staff a mentor or a course budget?',
    prompt: 'A company has money to help new staff develop. Should it give them time with an internal mentor or let them spend the same amount on a course of their choice?',
    options: [
      { label: 'Internal mentoring', description: 'Meet an experienced colleague regularly and watch how they handle practical tasks.' },
      { label: 'Individual course budget', description: 'Pick training linked to a personal development goal.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['mentoring', 'ongoing advice from someone with more experience', 'Mentoring helped her settle into the role.'],
        ['transfer', 'using a skill learned in a different situation', 'The manager checked for transfer to real tasks.'],
        ['blind spot', 'something important that is not easy for you to notice', 'A mentor can point out a blind spot.'],
        ['uptake', 'the rate at which people use an opportunity', 'Uptake of the course was low at first.'],
      ],
      phrasalVerbs: [
        ['pass on', 'share something you know with others', 'The mentor passed on useful advice.'],
        ['follow up', 'check what happened after an earlier action', 'We followed up after the course.'],
        ['branch out', 'begin doing something outside your usual area', 'She branched out into research.'],
        ['fit around', 'arrange around another commitment', 'The sessions fit around our shifts.'],
      ],
      adjectives: [
        ['tailored', 'designed for a particular person or purpose', 'The advice was tailored to my role.'],
        ['portable', 'useful in other jobs or places', 'The qualification is portable.'],
        ['uneven', 'not equally good across situations', 'Mentoring quality was uneven.'],
        ['actionable', 'clear enough to use or act on', 'The feedback was actionable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d choose **mentoring**. An experienced colleague can **pass on** **actionable** advice and notice a **blind spot** in a real piece of work.',
        '**Even so**, mentoring can be **uneven**, especially if the programme relies on goodwill. I’d give mentors time and set a goal the pair can **follow up** on.',
        'I’d choose A for new staff who need support **tailored** to problems they meet every day.',
      ],
      b: [
        'I’d offer a course budget. **In particular**, people may want to **branch out** into an area where there is no suitable internal mentor.',
        'A **portable** skill can also help the employee beyond the current role. The drawback is low **uptake** if the training cannot **fit around** work.',
        'I’d give staff protected time and ask them to share one example of **transfer** afterwards.',
      ],
      conditional: [
        'I’d use **mentoring** for an urgent **blind spot** that can be addressed with **tailored** feedback. The mentor should be able to **follow up** on progress.',
        '**By contrast**, a course makes sense when the skill is **portable** and staff can **fit it around** their workload.',
        'I’d check which option changes how people work rather than how many sessions they attend.',
      ],
    },
  },
  {
    slug: 'daily-call-or-written-update',
    title: 'A short daily call or written updates?',
    prompt: 'A team needs to know when work is blocked. Should it meet for ten minutes every morning or ask everyone to post a brief written update?',
    options: [
      { label: 'A daily call', description: 'Meet at the same time and solve small problems together.' },
      { label: 'Written updates', description: 'Read other updates when convenient and arrange a call only when needed.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['bottleneck', 'a point that slows other work down', 'A missing decision is the bottleneck.'],
        ['handover', 'passing information or work to someone taking over', 'The written handover was clear.'],
        ['visibility', 'how easy something is for others to notice', 'The board gives visibility into delays.'],
        ['interruption', 'a break in something that is happening', 'An extra call creates an interruption.'],
      ],
      phrasalVerbs: [
        ['flag up', 'draw attention to something important', 'She flagged up a delay.'],
        ['follow up on', 'deal with something after it has been raised', 'We followed up on the problem.'],
        ['catch up on', 'read or do things you missed earlier', 'I caught up on the messages later.'],
        ['talk through', 'discuss a problem step by step', 'We talked through the options.'],
      ],
      adjectives: [
        ['synchronous', 'happening for everyone at the same time', 'The call is synchronous.'],
        ['concise', 'short and giving the needed information', 'Keep the update concise.'],
        ['scattered', 'spread out across different places or time zones', 'Our team is scattered across cities.'],
        ['time-sensitive', 'needing attention soon', 'That decision is time-sensitive.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d take a short **synchronous** call. **In particular**, a **time-sensitive** **bottleneck** may need two people to **talk through** a solution together.',
        'The risk is a daily **interruption** that becomes longer than necessary. I’d ask people to **flag up** obstacles and save other topics for later.',
        'I’d choose A if it regularly prevents delays the written board would reveal too late.',
      ],
      b: [
        'I’d use **concise** written updates for a **scattered** team. They give everyone **visibility** without asking people to stop work at the same time.',
        '**Even so**, a message can be ignored when explaining a problem takes effort. I’d agree who will **follow up on** a **bottleneck** and arrange a call if needed.',
        'Someone who starts later can **catch up on** the whole **handover**.',
      ],
      conditional: [
        'I’d choose calls when the work is **time-sensitive** and several people need to **talk through** dependencies. I’d keep each one short enough to avoid a large **interruption**.',
        '**By contrast**, for a **scattered** team with predictable tasks, a written **handover** gives better **visibility** across the day.',
        'I’d look at how long it takes to resolve a **bottleneck** under each system.',
      ],
    },
  },
  {
    slug: 'promotion-service-or-performance',
    title: 'Should promotion reward service or recent performance?',
    prompt: 'Two candidates meet the requirements for a promotion. One has worked for the company much longer. The other has stronger recent results. Which should count more?',
    options: [
      { label: 'Length of service', description: 'Give extra weight to years of experience and knowledge of the organisation.' },
      { label: 'Demonstrated performance', description: 'Give extra weight to recent results and evidence of skills for the role.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['seniority', 'position gained through longer service', 'Seniority affects the order of promotion.'],
        ['track record', 'evidence of what someone has achieved before', 'She has a strong track record.'],
        ['institutional knowledge', 'understanding gained by working inside an organisation', 'The team relies on his institutional knowledge.'],
        ['benchmark', 'a standard used to compare results', 'We agreed on a fair benchmark.'],
      ],
      phrasalVerbs: [
        ['live up to', 'achieve the standard people expect', 'The candidate lived up to expectations.'],
        ['step up', 'take more responsibility when it is needed', 'She stepped up during the project.'],
        ['weigh up', 'compare the value of different choices', 'We weighed up both records.'],
        ['back up', 'give evidence to support a statement', 'He backed up his claim with results.'],
      ],
      adjectives: [
        ['relevant', 'connected to what is needed', 'Her experience is relevant to the role.'],
        ['consistent', 'showing similar quality over time', 'His performance has been consistent.'],
        ['transparent', 'open and easy to understand', 'The process should be transparent.'],
        ['short-lived', 'lasting only a short time', 'The sales increase was short-lived.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d give more weight to **seniority** if it comes with **relevant** **institutional knowledge**. **In particular**, someone who has dealt with several difficult periods may know how to **step up** when plans fail.',
        'A recent **track record** still matters, since years alone tell us little about the new duties.',
        'I’d pick A if the longer service is backed up by **consistent** results and evidence of good decisions.',
      ],
      b: [
        'I’d choose demonstrated performance. A **transparent** **benchmark** lets both candidates **back up** their claims with examples that matter to the role.',
        '**Even so**, a single strong quarter might be **short-lived** or depend on circumstances outside the candidate’s control. I’d check how they **lived up to** expectations across more than one project.',
        'I’d choose B if the results and the reasoning behind them are convincing.',
      ],
      conditional: [
        'I’d **weigh up** what the new role requires. If **institutional knowledge** is essential and both candidates have **consistent** results, longer service may matter more.',
        '**By contrast**, if the role requires a skill one candidate has already shown, I’d favour that **track record**, even if their service is shorter.',
        'The interview should use a **transparent** standard and let both candidates **back up** their examples.',
      ],
    },
  },
  {
    slug: 'anonymous-survey-or-open-workshop',
    title: 'Anonymous staff survey or an open workshop?',
    prompt: 'Managers want to understand why staff are leaving. Should they run an anonymous survey or hold a facilitated workshop where people can discuss examples?',
    options: [
      { label: 'Anonymous survey', description: 'Let people submit feedback without names and review patterns in the responses.' },
      { label: 'Facilitated workshop', description: 'Give staff space to explain what happened and discuss possible changes together.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['anonymity', 'the state of being unknown by name', 'Anonymity helped people answer honestly.'],
        ['response rate', 'the percentage of people who respond', 'The response rate was higher than last year.'],
        ['pattern', 'a repeated way in which something happens', 'We noticed a pattern in the comments.'],
        ['follow-up', 'an action taken after an earlier one', 'The survey needs a visible follow-up.'],
      ],
      phrasalVerbs: [
        ['speak up', 'say what you think or need', 'Some people felt unable to speak up.'],
        ['draw out', 'encourage someone to explain something', 'The facilitator drew out useful examples.'],
        ['sum up', 'express the main points briefly', 'We summed up the main concerns.'],
        ['act on', 'do something in response to information', 'The manager acted on the feedback.'],
      ],
      adjectives: [
        ['candid', 'honest even when the subject is difficult', 'The comments were candid.'],
        ['representative', 'reflecting the range of people in a group', 'We need a representative sample.'],
        ['defensive', 'quick to protect yourself against criticism', 'The manager sounded defensive.'],
        ['specific', 'clear about particular details', 'The workshop produced specific suggestions.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d start with **anonymity**. **In particular**, staff may be more **candid** when the people making decisions cannot identify who raised a complaint.',
        'A survey needs a **representative** **response rate**, otherwise the loudest problem may belong to one small group. I’d **sum up** repeated concerns and publish a **follow-up**.',
        'If managers do not **act on** clear findings, the survey will make people less willing to respond next time.',
      ],
      b: [
        'I’d hold a workshop if someone independent can run it. The facilitator can **draw out** **specific** examples and check whether a **pattern** is shared by others.',
        '**Even so**, managers can sound **defensive**, and some people may not feel able to **speak up**. I’d make attendance optional and allow written comments after the session.',
        'A workshop helps most when the question needs clarification rather than a count.',
      ],
      conditional: [
        'I’d start with a survey if **anonymity** would make answers more **candid**. I’d look for a clear **pattern** before asking people to discuss causes.',
        '**By contrast**, where trust is high and examples remain vague, a workshop can **draw out** useful detail.',
        'I’d choose the approach that makes the first **follow-up** possible, then **act on** one issue soon enough for staff to see a change.',
      ],
    },
  },
  {
    slug: 'rail-vouchers-or-new-connections',
    title: 'Cheaper rail tickets or better connections?',
    prompt: 'A region has a grant to make weekend rail travel easier. Should it give residents discounted tickets or pay for one additional connecting service to towns that are hard to reach?',
    options: [
      { label: 'Weekend ticket discounts', description: 'Lower the price of journeys that already run and review demand.' },
      { label: 'A new connection', description: 'Give smaller towns a better link to the main rail line.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['fare', 'the price of a journey', 'The weekend fare went down.'],
        ['connection', 'a service you take after another part of a journey', 'We missed the last connection.'],
        ['ridership', 'the number of people using a transport service', 'Weekend ridership rose.'],
        ['coverage', 'the places a service reaches', 'The current network has gaps in coverage.'],
      ],
      phrasalVerbs: [
        ['bring down', 'make a price or amount lower', 'The discount brought down the fare.'],
        ['link up', 'connect separate parts of a system', 'The service links up two towns.'],
        ['take up', 'choose to use an offer', 'Few families took up the discount.'],
        ['run into', 'meet a problem unexpectedly', 'We ran into delays at the interchange.'],
      ],
      adjectives: [
        ['affordable', 'possible to pay for without difficulty', 'Tickets should be affordable.'],
        ['underserved', 'having fewer services than needed', 'Several towns are underserved.'],
        ['direct', 'with no change or stop needed for the main connection', 'A direct service would save time.'],
        ['viable', 'able to work in practice', 'The new route looks viable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **bring down** the **fare** on routes that people can already use at weekends. **In particular**, a family may travel by car simply because four train tickets are not **affordable**.',
        'I’d check how many people **take up** the discount who would otherwise drive.',
        'Discounting is less useful where a **connection** is missing, so I’d focus on routes with empty seats and room to grow **ridership**.',
      ],
      b: [
        'I’d add the **connection**. A lower **fare** achieves little for a town that is **underserved**.',
        '**Even so**, it might be difficult to make one extra journey **viable**. I’d time it to **link up** with the most useful trains rather than measure success by the number of places on the map.',
        'Better **coverage** matters if people can actually get home without a long wait.',
      ],
      conditional: [
        'I’d choose discounts **provided that** **coverage** is already good and evidence shows the main barrier is price. I’d see who **takes up** the offer.',
        '**By contrast**, if people **run into** a missing or badly timed **connection**, I’d pay to **link up** existing routes.',
        'The test would be whether the change creates an **affordable** journey someone can actually complete.',
      ],
    },
  },
  {
    slug: 'vouchers-or-shop-rent-support',
    title: 'Shopping vouchers or rent support for local shops?',
    prompt: 'A town has money to help small independent shops. Should it offer residents vouchers to spend locally or give shops short-term help with rent?',
    options: [
      { label: 'Give shopping vouchers', description: 'Encourage residents to visit participating shops and decide where to spend the support.' },
      { label: 'Help shops pay rent', description: 'Target the shops closest to closing and cover part of their fixed costs.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['footfall', 'the number of people visiting or passing a place', 'Saturday footfall went up.'],
        ['overhead', 'ongoing running costs for a business', 'Rent is our largest overhead.'],
        ['voucher', 'a document or code that pays part of a cost', 'I used a voucher at the bookshop.'],
        ['margin', 'the difference between what something costs and what a shop earns from selling it', 'The shop has a small margin on books.'],
      ],
      phrasalVerbs: [
        ['draw in', 'attract people to a place or activity', 'The offer drew in new customers.'],
        ['tide over', 'help someone through a temporary difficulty', 'The grant tided the shop over in winter.'],
        ['pass on', 'give a cost or benefit to someone else', 'The seller passed on the discount.'],
        ['tail off', 'slowly become less', 'Footfall tailed off after the launch.'],
      ],
      adjectives: [
        ['targeted', 'aimed at a particular group or problem', 'The fund is targeted at small shops.'],
        ['short-lived', 'lasting only a short time', 'The sales rise was short-lived.'],
        ['eligible', 'meeting the requirements for support', 'The café is eligible.'],
        ['fragile', 'easily damaged or likely to fail', 'The business is still fragile.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d try **vouchers** to **draw in** people who rarely visit the high street. **In particular**, an **eligible** shop could gain future regular customers, which makes the money do more than pay for one week’s sales.',
        'A **short-lived** rise in **footfall** is still possible. I’d check whether visitors return after the offer ends.',
        'I’d choose vouchers if shops mainly lack customers rather than face fixed costs they can’t cover.',
      ],
      b: [
        'I’d offer **targeted** rent support. If a shop is already **fragile**, a small jump in **footfall** might not cover its **overhead** quickly enough.',
        '**Even so**, rent help only **tides a business over** when demand is weak. I’d make the grant short and ask owners how they plan to become more stable.',
        'I’d give priority to shops that can stay open with a realistic amount of help.',
      ],
      conditional: [
        'I’d use **vouchers** if there is spare capacity and shops can **draw in** people likely to return. I’d monitor whether demand **tails off** once the voucher ends.',
        '**By contrast**, if some viable shops close because of an immediate **overhead**, I’d offer **targeted** rent support.',
        'I’d distinguish between a temporary cash problem and a longer fall in demand before spending the grant.',
      ],
    },
  },
  {
    slug: 'imperfect-produce-discount-or-donation',
    title: 'Discount imperfect produce or donate it?',
    prompt: 'A grocery shop has fruit and vegetables that look unusual but are still good to eat. Should it sell them at a discount or donate them to a community kitchen?',
    options: [
      { label: 'Discounted sales', description: 'Sell the produce cheaply and use the money to cover sorting costs.' },
      { label: 'Regular donation', description: 'Send usable produce to a kitchen that can turn it into meals.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['surplus', 'more of something than is needed or sold', 'The shop has a surplus of carrots.'],
        ['turnover', 'how quickly goods are sold and replaced', 'The produce has a fast turnover.'],
        ['shelf life', 'the time an item remains suitable to use', 'The berries have a short shelf life.'],
        ['collection', 'the act of picking up and taking something away', 'Collection is every Thursday.'],
      ],
      phrasalVerbs: [
        ['sort through', 'check a group and separate what can be used', 'We sorted through the fruit.'],
        ['mark down', 'reduce the selling price', 'The shop marked down the apples.'],
        ['use up', 'use all of something before it goes to waste', 'The kitchen used up the ripe pears.'],
        ['take on', 'accept a new task or responsibility', 'Can the kitchen take on another delivery?'],
      ],
      adjectives: [
        ['perishable', 'likely to spoil quickly', 'Salad is highly perishable.'],
        ['irregular', 'different from the usual pattern or shape', 'The carrots are irregular in shape.'],
        ['predictable', 'easy to expect or plan for', 'The weekly supply is predictable.'],
        ['workable', 'likely to work in practice', 'A smaller delivery is more workable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **mark down** the **irregular** fruit so customers know it costs less and can choose it. That keeps the shop responsible for most of its own **surplus**.',
        '**Even so**, the discount is useful only if **turnover** is fast enough for **perishable** stock. I’d measure how much is sold while there is still time to eat it.',
        'I’d donate what kitchen staff can use if sales are slower than expected.',
      ],
      b: [
        'I’d organise a regular donation. **In particular**, a kitchen can **use up** a larger **surplus** when it knows what is coming.',
        'I’d agree on a **predictable** **collection** slot and check whether the kitchen can **take on** extra produce without losing space for its usual meals.',
        'Donation makes sense if the food’s **shelf life** is long enough to prepare it safely after delivery.',
      ],
      conditional: [
        'I’d **mark down** produce with a reasonable **shelf life**, **provided that** customers will buy it in time.',
        '**By contrast**, for a large **surplus** that a kitchen can **use up** on the same day, I’d arrange a **workable** **collection**.',
        'I’d choose based on how much food is actually eaten under each option, not just how much leaves the shop.',
      ],
    },
  },
  {
    slug: 'compost-pickup-or-drop-off',
    title: 'Collect food scraps at home or use drop-off points?',
    prompt: 'An apartment district wants to offer food-scrap collection. Should it collect small bins from each building or ask residents to bring scraps to staffed drop-off points?',
    options: [
      { label: 'Building collection', description: 'Give each building a bin and collect it once a week.' },
      { label: 'Staffed drop-off points', description: 'Let residents bring scraps when they go past a central point.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['participation', 'the number or share of people taking part', 'Participation rose after more bins arrived.'],
        ['contamination', 'the presence of materials that should not be in a collection', 'Plastic bags cause contamination.'],
        ['handling', 'the work of moving or dealing with materials', 'Staff needed time for handling.'],
        ['maintenance', 'work needed to keep equipment usable', 'The bins require regular maintenance.'],
      ],
      phrasalVerbs: [
        ['take out', 'carry things from inside to the place they go', 'I take out our scraps at night.'],
        ['drop off', 'leave something at a place', 'Residents dropped off small bags.'],
        ['sort out', 'deal with or separate a problem', 'The team sorted out rejected material.'],
        ['build up', 'increase gradually', 'Scraps built up during the holiday.'],
      ],
      adjectives: [
        ['convenient', 'easy to use or reach', 'The drop-off is convenient on market days.'],
        ['hygienic', 'kept clean in a way that protects people from germs', 'The bin needs a hygienic lid.'],
        ['manageable', 'possible to handle without too much difficulty', 'Weekly cleaning looks manageable.'],
        ['underused', 'used less than expected or possible', 'The farthest site was underused.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d offer building collection to increase **participation**. People can **take out** scraps when they already go downstairs, so it is **convenient** rather than another trip.',
        '**Even so**, food can **build up** and the bins need **hygienic** storage. I’d put **maintenance** in the budget and give clear instructions about what belongs in each bin.',
        'I’d choose A if the buildings have space and someone can help residents use the service properly.',
      ],
      b: [
        'I’d use staffed locations. **In particular**, staff can explain what to **drop off** and **sort out** common **contamination** problems before they spread.',
        'The site should be **convenient**, such as somewhere residents already visit, or it could remain **underused**.',
        'I’d choose B if staffing and **handling** are **manageable**, and make the opening hours match when people actually pass through.',
      ],
      conditional: [
        'I’d choose building collection **provided that** **maintenance** and storage are **manageable**. A collection point can still help buildings without space.',
        '**By contrast**, if contaminated material often **builds up**, staffed drop-off could improve the quality of the collection.',
        'I’d compare **participation** and how much accepted material residents actually **drop off** or put in the bins.',
      ],
    },
  },
  {
    slug: 'practical-skills-or-more-electives',
    title: 'Require one practical skills class or protect electives?',
    prompt: 'A school has room for one extra weekly lesson. Should it require a class on basic household and money skills, or use the time for an elective chosen by each student?',
    options: [
      { label: 'Required practical skills', description: 'Teach everyone the same basic tasks and use examples from everyday life.' },
      { label: 'A student elective', description: 'Let each student choose an interest they could pursue in depth.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['curriculum', 'the subjects and skills taught in a course or school', 'The curriculum leaves little free time.'],
        ['elective', 'a class a student can choose', 'I took art as an elective.'],
        ['foundation', 'basic knowledge or support for further learning', 'The class gives a good foundation.'],
        ['choice', 'the ability to decide between alternatives', 'Students asked for more choice.'],
      ],
      phrasalVerbs: [
        ['pick up', 'learn through doing or experience', 'I picked up useful skills on the course.'],
        ['build on', 'develop something further from a starting point', 'The elective builds on our interests.'],
        ['fit in', 'find time or space for something', 'We fitted in one more class.'],
        ['go without', 'manage while lacking something useful', 'Some students go without help at home.'],
      ],
      adjectives: [
        ['compulsory', 'required for everyone', 'The lesson is compulsory.'],
        ['practical', 'connected to everyday use', 'The exercises are practical.'],
        ['in-depth', 'covering a subject in detail', 'The elective offers in-depth work.'],
        ['unequal', 'different in a way that may be unfair', 'Access to advice is unequal.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d make the **practical** lesson **compulsory**. **In particular**, students who **go without** reliable advice at home would get a common **foundation**.',
        'To **fit it in**, the school would have to give up time for an **elective**. I’d therefore keep the course focused on tasks learners can actually demonstrate.',
        'I’d support A if the **curriculum** currently assumes families teach these skills themselves.',
      ],
      b: [
        'I’d keep the **elective**. Giving students a genuine **choice** can help them **build on** something they are already interested in and do more **in-depth** work.',
        '**Even so**, access to **practical** skills is **unequal**. I’d put some of those skills inside existing classes rather than add a separate requirement.',
        'I’d support B if the school can show where everyone will still **pick up** the essentials.',
      ],
      conditional: [
        'I’d add compulsory lessons **provided that** an audit shows students lack a basic **foundation** and there is no good way to **fit it in** elsewhere.',
        '**By contrast**, if existing subjects already teach those skills in a **practical** way, I’d protect the **elective**.',
        'I’d ask students to complete an example task before judging which part of the **curriculum** needs the time.',
      ],
    },
  },
  {
    slug: 'language-classes-mixed-or-grouped',
    title: 'Group language students by level or mix them?',
    prompt: 'A language school can separate learners by a speaking assessment or use mixed groups with tasks that have easier and harder roles. Which approach would you choose?',
    options: [
      { label: 'Similar levels together', description: 'Group learners with similar speaking needs and review places each term.' },
      { label: 'Mixed groups', description: 'Give learners a common topic with roles and support matched to their needs.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['placement', 'assignment to a course or group', 'The placement is reviewed after a month.'],
        ['pace', 'the speed at which progress happens', 'The class moved at a steady pace.'],
        ['peer support', 'help from other learners at a similar stage', 'Peer support made speaking less stressful.'],
        ['progression', 'movement towards a higher level of skill', 'We look for progression across the term.'],
      ],
      phrasalVerbs: [
        ['keep up with', 'continue at the same pace as others', 'I kept up with the faster group.'],
        ['bring out', 'help a quality or ability appear', 'The task brought out her confidence.'],
        ['hold back', 'stop progress from happening as fast as it could', 'An easy task can hold advanced students back.'],
        ['move up', 'change to a higher group', 'He moved up after the review.'],
      ],
      adjectives: [
        ['mixed-ability', 'including people with different skill levels', 'This is a mixed-ability class.'],
        ['challenging', 'requiring effort to do well', 'The role is challenging enough.'],
        ['adaptable', 'able to change for different needs', 'The tasks are adaptable.'],
        ['demotivating', 'making people lose the desire to try', 'Repeated failure can be demotivating.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d start with similar groups. **In particular**, learners who regularly cannot **keep up with** the **pace** may find speaking **demotivating**.',
        'A **placement** is only helpful if it can change. I’d offer an early review so learners can **move up** and nobody gets **held back**.',
        'I’d choose this approach if the school can identify speaking needs reliably and has enough places to make the groups workable.',
      ],
      b: [
        'I’d use **mixed-ability** groups with **adaptable** tasks. Good **peer support** can **bring out** ideas that a learner might not express on their own.',
        '**Even so**, one person can end up doing most of the talking if roles are unclear. I’d give each learner an individually **challenging** goal.',
        'I’d check **progression** through short individual speaking tasks so the group’s success does not hide anyone’s progress.',
      ],
      conditional: [
        'I’d use similar groups **provided that** **placement** is reviewed and learners can **move up** when they need a faster **pace**.',
        '**By contrast**, if teachers have **adaptable** activities and can **bring out** contributions from everyone, mixed groups can work with stronger **peer support**.',
        'I’d watch who speaks and improves, rather than decide from the group labels alone.',
      ],
    },
  },
  {
    slug: 'article-comments-open-or-reviewed',
    title: 'Publish article comments immediately or review them first?',
    prompt: 'A magazine wants to open comments on its website with one part-time moderator. Should comments appear immediately with a reporting system or appear only after review?',
    options: [
      { label: 'Publish immediately', description: 'Let readers join the discussion and report comments that break clear rules.' },
      { label: 'Review first', description: 'Check comments before publication, even if the conversation moves more slowly.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['moderation', 'checking whether public content follows rules', 'Moderation takes more time on busy days.'],
        ['backlog', 'work that has built up unfinished', 'The moderator clears the backlog each morning.'],
        ['participation', 'the act of joining a discussion', 'The change increased participation.'],
        ['guideline', 'a rule or piece of advice about what is allowed', 'The first guideline asks readers to address the idea.'],
      ],
      phrasalVerbs: [
        ['flag up', 'draw attention to a problem', 'Readers flagged up personal attacks.'],
        ['take down', 'remove something that is public', 'The editor took down the comment.'],
        ['cut off', 'stop a process or conversation from continuing', 'A long delay can cut off a discussion.'],
        ['set out', 'explain something clearly and in order', 'We set out the rules at the top.'],
      ],
      adjectives: [
        ['constructive', 'helping to improve thinking or action', 'The discussion was constructive.'],
        ['abusive', 'using insulting or harmful language', 'The moderator removed abusive comments.'],
        ['responsive', 'quick to react to what is needed', 'The team is responsive during opening hours.'],
        ['proportionate', 'appropriate in size or strength for a problem', 'The rule is proportionate to the risk.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d let comments appear immediately. **In particular**, readers can have a **constructive** exchange while the story is still fresh, which supports **participation**.',
        'I’d **set out** simple **guidelines** and make it easy to **flag up** **abusive** messages. A part-time team can still be **responsive** if it concentrates on busy hours.',
        'I’d review that choice if harmful comments remain visible long enough to drive others out of the discussion.',
      ],
      b: [
        'I’d review first on articles that are likely to attract abuse. It protects people who want to contribute without having to read material the team will soon **take down**.',
        '**Even so**, a large **backlog** can **cut off** a useful discussion. I’d show when **moderation** takes place and keep the rules **proportionate**.',
        'I’d choose B if the magazine cannot respond quickly enough after publication.',
      ],
      conditional: [
        'I’d publish immediately **provided that** the team can **take down** **abusive** comments promptly and readers know what to **flag up**.',
        '**By contrast**, pre-review makes sense where harm is likely and keeping a thread open would overwhelm **moderation**.',
        'I’d measure response time and **participation**, then use the least restrictive rule that produces a **constructive** discussion.',
      ],
    },
  },
  {
    slug: 'audience-vote-or-arts-panel',
    title: 'A public vote or a panel for an arts prize?',
    prompt: 'A local gallery can award one grant to an emerging artist. Should visitors vote for the winner or should a panel assess the work using published criteria?',
    options: [
      { label: 'A visitor vote', description: 'Let each visitor vote after seeing the shortlist.' },
      { label: 'A judging panel', description: 'Ask several judges to score the same published criteria and explain their decision.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['criterion', 'a standard used to judge something', 'Originality is one criterion.'],
        ['shortlist', 'a small group selected from more candidates', 'The shortlist includes five artists.'],
        ['recognition', 'public appreciation of work or achievement', 'The prize brings recognition.'],
        ['bias', 'a tendency to favour one person or group unfairly', 'The organisers reviewed the vote for bias.'],
      ],
      phrasalVerbs: [
        ['weigh up', 'compare different aspects before deciding', 'The panel weighed up each piece.'],
        ['stand out', 'be easier to notice than others', 'The final work stood out.'],
        ['win over', 'persuade someone to support you', 'Her explanation won over visitors.'],
        ['draw on', 'use knowledge or experience you already have', 'The judges draw on different backgrounds.'],
      ],
      adjectives: [
        ['subjective', 'influenced by personal taste or opinion', 'Art judgement is partly subjective.'],
        ['transparent', 'clear enough for others to understand and check', 'The criteria should be transparent.'],
        ['accessible', 'easy to approach or understand', 'The work was accessible to new visitors.'],
        ['experimental', 'trying new methods or ideas', 'The piece is experimental.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d use a public vote. **In particular**, **recognition** from visitors may be valuable to an artist who wants to reach a wider audience. An **accessible** piece can **win people over** without an expert explanation.',
        'I’d publish the **shortlist** in advance and give every piece the same space.',
        'The vote is **subjective**, so I’d be careful to call it a public choice rather than an overall measure of quality.',
      ],
      b: [
        'I’d choose a panel. Judges with different backgrounds can **draw on** their experience and **weigh up** **experimental** work that might take time to understand.',
        '**Even so**, a panel can bring its own **bias**. Every **criterion** should be **transparent**, and judges should explain how they used it.',
        'I’d choose B when the grant is meant to support an artist’s development, not simply recognise the work that attracts the most visitors.',
      ],
      conditional: [
        'I’d choose a vote **provided that** the goal is public **recognition** and every artist can **stand out** on similar terms.',
        '**By contrast**, if the aim is to support promising **experimental** work, I’d choose a panel with a **transparent** **criterion** for potential.',
        'I’d decide what the award is for first, because a popularity measure and a development grant can reasonably produce different winners.',
      ],
    },
  },
  {
    slug: 'orchestra-rehearsals-or-school-visits',
    title: 'Open rehearsals or workshops in schools?',
    prompt: 'A local orchestra can fund either free public rehearsals or workshops designed with teachers at several schools. Which is the stronger way to reach new listeners?',
    options: [
      { label: 'Open rehearsals', description: 'Let anyone attend part of a rehearsal and ask questions afterwards.' },
      { label: 'School workshops', description: 'Send musicians to schools for guided sessions linked to class projects.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['outreach', 'efforts to involve people who rarely use an activity', 'Outreach introduced new families to the orchestra.'],
        ['rehearsal', 'a practice session before a performance', 'The rehearsal lasted an hour.'],
        ['exposure', 'a chance to experience something new', 'The project gave students early exposure to live music.'],
        ['participation', 'taking part in an activity', 'The workshop encouraged participation.'],
      ],
      phrasalVerbs: [
        ['open up', 'make something available to more people', 'The orchestra opened up a rehearsal.'],
        ['reach out to', 'make contact with people who may not come on their own', 'We reached out to three schools.'],
        ['bring in', 'involve new people', 'The event brought in young listeners.'],
        ['follow up', 'make contact or take an action later', 'Teachers followed up with a new activity.'],
      ],
      adjectives: [
        ['hands-on', 'including direct practical activity', 'The music session was hands-on.'],
        ['approachable', 'easy to understand or feel comfortable with', 'The musicians made the event approachable.'],
        ['repeatable', 'able to be done again in a similar way', 'The lesson is repeatable in other classes.'],
        ['inclusive', 'open to a range of people', 'The project aims to be inclusive.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **open up** **rehearsals**. **In particular**, adults and families who are curious could see how musicians work without paying for a full concert.',
        'I’d make the first half **approachable** by explaining what the conductor is changing. The risk is that the event only **brings in** people who already like orchestral music.',
        'I’d use **outreach** through community groups and compare new visitors with existing members.',
      ],
      b: [
        'I’d choose **hands-on** school workshops. They can **reach out to** children who may never be taken to a concert and give them **exposure** to music while they try something themselves.',
        '**Even so**, a single session is easy to forget. I’d ask teachers to **follow up** with an activity that is **repeatable** in the classroom.',
        'I’d support B if the schools have time and want to keep the project going.',
      ],
      conditional: [
        'I’d choose an open **rehearsal** **provided that** the outreach can **bring in** people who do not already attend concerts. The event should be **approachable** to someone new.',
        '**By contrast**, if access depends on families already having time and transport, I’d choose school workshops to broaden **participation**.',
        'I’d check who actually comes back or takes part again, rather than counting the number of seats filled once.',
      ],
    },
  },
  {
    slug: 'stars-or-written-reviews',
    title: 'Show star ratings first or highlight written reviews?',
    prompt: 'A shop wants to help customers choose between similar products. Should its website put the average star rating first or show several written reviews with the reasons people liked or disliked the item?',
    options: [
      { label: 'Put the stars first', description: 'Show a quick score and let people read details if they want.' },
      { label: 'Highlight written reviews', description: 'Show several short reviews about different features before the average rating.' },
    ],
    conditionalPrompt: 'Identify what would make each option stronger and what would change your decision.',
    vocabulary: {
      nouns: [
        ['average', 'a number calculated from several values', 'The average was four stars.'],
        ['sample', 'a small group drawn from a larger set', 'The editor chose a varied sample of reviews.'],
        ['context', 'the details that help you understand something', 'The review gives useful context.'],
        ['bias', 'a tendency that can make a judgement unfair', 'The selection could show bias.'],
      ],
      phrasalVerbs: [
        ['sum up', 'give the overall idea briefly', 'The score sums up many experiences.'],
        ['pick out', 'choose a specific item from several', 'We picked out three reviews.'],
        ['look past', 'consider more than the obvious first feature', 'Look past the headline score.'],
        ['leave out', 'not include something', 'The review left out the price.'],
      ],
      adjectives: [
        ['comparable', 'able to be compared usefully', 'The scores are comparable across similar products.'],
        ['misleading', 'giving the wrong idea', 'A five-star average can be misleading.'],
        ['balanced', 'showing more than one point of view fairly', 'The sample is balanced.'],
        ['relevant', 'connected to the decision you need to make', 'The size comment is relevant to me.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d put stars first when the products are **comparable** and a large **sample** of buyers has rated them. The score can **sum up** a lot of information for someone short on time.',
        '**Even so**, an **average** based on three people can be **misleading**. I’d show the number of reviews beside it and make it easy to **look past** the score.',
        'A quick signal is useful when its limits are visible.',
      ],
      b: [
        'I’d **pick out** several **balanced** reviews. **In particular**, one person might care about durability and another about size, which an **average** cannot explain.',
        'The shop should say how it selects the **sample** so it does not quietly **leave out** criticism.',
        'I’d choose B when the products fit different needs and a small amount of **context** can help someone ask the right question.',
      ],
      conditional: [
        'I’d use ratings first **provided that** the **sample** is large and the products are **comparable**. I’d still let people **look past** the score quickly.',
        '**By contrast**, if buyers value different features or reviews are few, a **balanced** set of comments gives more **context**.',
        'I’d test which display helps customers choose something that suits them rather than which one makes them buy fastest.',
      ],
    },
  },
]
