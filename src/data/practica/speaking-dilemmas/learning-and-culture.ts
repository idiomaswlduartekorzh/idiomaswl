import type { SpeakingDilemma } from './types'

export const LEARNING_AND_CULTURE_DILEMMAS: readonly SpeakingDilemma[] = [
  {
    slug: 'ai-feedback-in-assessed-writing',
    title: 'Allow AI feedback on assessed writing?',
    prompt: 'A college wants written assignments to show what students can do. Should it allow students to ask an AI tool for feedback on their own drafts and disclose that use, or reserve AI tools for practice outside assessed assignments?',
    options: [
      { label: 'Allow disclosed feedback', description: 'Students write the draft themselves and can ask for comments. They attach the draft and explain which suggestions they used.' },
      { label: 'Keep assessed writing unaided', description: 'Students practise with tools at other times. For graded work, they draft and revise independently under agreed conditions.' },
    ],
    conditionalPrompt: 'Decide what the assignment should measure and what evidence would make the writing process visible.',
    vocabulary: {
      nouns: [
        ['authorship', 'responsibility for creating a piece of work', 'The drafts help establish authorship.'],
        ['attribution', 'giving credit for the source of a contribution', 'Attribution makes outside contributions visible.'],
        ['scaffolding', 'temporary support that helps someone learn a skill', 'The checklist provides scaffolding for revision.'],
        ['overreliance', 'depending on something too much', 'Overreliance on prompts can weaken confidence.'],
      ],
      phrasalVerbs: [
        ['sift through feedback', 'examine feedback carefully and select useful parts', 'She sifted through the comments for recurring issues.'],
        ['hand in a draft', 'submit a draft to the person assessing it', 'They handed in their first drafts on Monday.'],
        ['lean on a tool', 'depend on a tool for support', 'Some learners lean on the tool when they get stuck.'],
        ['spell out a rule', 'explain a rule in full and clear detail', 'The course guide spells out the limits.'],
      ],
      adjectives: [
        ['attributable to', 'able to be linked to a particular cause or person', 'The changes are attributable to her own edits.'],
        ['verifiable', 'able to be checked against evidence', 'The revision log provides verifiable evidence.'],
        ['formulaic', 'following a fixed pattern with little variation', 'The suggested introduction felt formulaic.'],
        ['undisclosed', 'kept hidden from the people who need to know', 'The marker asked about undisclosed assistance.'],
      ],
      connectors: [
        ['On the grounds that …', 'justify a choice by stating the reason for it', 'I’d allow feedback on the grounds that revision is the aim.'],
        ['As a consequence, …', 'indicate a result of what you just described', 'As a consequence, the marker could check the changes.'],
        ['So long as …', 'state a requirement that allows something to continue', 'So long as drafts are saved, the process is visible.'],
        ['In either case, …', 'make a point that applies to both possibilities', 'In either case, students need clear instructions.'],
      ],
    },
    models: {
      a: [
        'I’d allow feedback **on the grounds that** deciding what to revise is part of learning to write. Students can **sift through feedback**, reject **formulaic** suggestions and explain a decision. That can make the tool a form of **scaffolding**.',
        '**So long as** students **hand in a draft** and a short account of two changes, the teacher has something **verifiable** to discuss. I’d **spell out** that the tool can comment on the draft and that the student remains responsible for the wording.',
        'I’d choose A for a task that assesses revision. If a student can’t explain why a change improved the text, I’d ask them to revisit it before treating the polished draft as evidence of their ability.',
      ],
      b: [
        'I’d keep graded assignments unaided when the aim is to establish what students can do independently. If they can **lean on a tool** whenever a paragraph stalls, it’s harder to tell which decisions are **attributable to** them.',
        '**As a consequence**, grades might represent access to support as much as writing ability. **In either case**, the class can practise giving and receiving comments. I’d use that practice to teach **attribution** and ask students to show it really is their own argument when they write alone.',
        'I’d also **spell out** the drafting conditions and allow time to revise. Independent writing should measure **authorship** and control of the language, with enough time for learners to show both.',
      ],
      conditional: [
        'I’d ask what the teacher wants the grade to mean. If it describes independent writing, I’d avoid **undisclosed** differences in support and check **authorship** in a supervised task. I’d **spell out** the conditions before students start.',
        '**On the grounds that** revision is a separate skill, I’d allow feedback on a different assignment. Students would **hand in a draft** and explain how they **sifted through feedback**. That gives the teacher a **verifiable** account of their choices.',
        '**In either case**, learners need time to practise first. My decision would follow the skill being assessed. When I want to see two different skills, I’d give each its own task and tell students what each mark represents.',
      ],
    },
  },
  {
    slug: 'phones-at-school',
    title: 'One school phone rule or classroom discretion?',
    prompt: 'A secondary school is losing lesson time to phones. Should it store phones away for the whole school day, or let teachers decide when to put them away during lessons while allowing access at breaks?',
    options: [
      { label: 'Store phones all day', description: 'Keep phones in secure storage from arrival to departure. Route urgent family messages through the school office and make agreed accessibility exceptions.' },
      { label: 'Let teachers set lesson rules', description: 'Give teachers a common starting rule and let them permit phones for specific tasks. Students can use their own phones during breaks.' },
    ],
    conditionalPrompt: 'Identify where phone use causes the most disruption and what would show that a narrower rule is working.',
    vocabulary: {
      nouns: [
        ['spillover effect', 'an effect that carries from one situation into another', 'The argument at break had a spillover effect in class.'],
        ['enforcement', 'making sure people follow a rule', 'Enforcement takes time away from teaching.'],
        ['discretion', 'freedom to decide how to act in a situation', 'Teachers have discretion to allow a dictionary app.'],
        ['compliance', 'acting in accordance with a rule', 'Clear instructions improved compliance.'],
      ],
      phrasalVerbs: [
        ['crack down on misuse', 'take stronger action to stop misuse', 'The school cracked down on filming during class.'],
        ['tune out a lesson', 'stop paying attention to a lesson', 'The constant alerts made it easier to tune out.'],
        ['put a phone away', 'store a phone out of use or sight', 'He put his phone away before the discussion.'],
        ['work around a rule', 'find a way to act despite a rule', 'Some pupils worked around the rule with spare phones.'],
      ],
      adjectives: [
        ['blanket', 'applying in the same way across all cases', 'A blanket rule is easy to explain.'],
        ['enforceable', 'possible to put into effect consistently', 'The rule needs to be enforceable.'],
        ['intrusive', 'interfering too much with someone’s privacy or choices', 'Frequent checks can feel intrusive.'],
        ['inconsistent', 'not applied in the same way in similar situations', 'Enforcement became inconsistent across classes.'],
      ],
      connectors: [
        ['On the one hand, …', 'introduce the first side of a trade-off', 'On the one hand, one rule is easy to remember.'],
        ['In reality, …', 'point to what happens in practice', 'In reality, teachers apply the rule differently.'],
        ['For fear that …', 'explain that a concern motivates an action', 'Some schools ban phones for fear that they will disrupt class.'],
        ['If nothing else, …', 'identify a minimum benefit you can defend', 'If nothing else, the rule saves reminders.'],
      ],
    },
    models: {
      a: [
        'I’d use one **blanket** rule for the day. It would reduce the amount of **enforcement** teachers do every period. There could also be a **spillover effect** if pupils arrive in class still dealing with something that happened on a device at break.',
        '**In reality**, somebody will try to **work around** any rule. I’d make this one **enforceable** with secure storage and a clear route for urgent calls. I’d agree exceptions with students who use devices to support access.',
        '**If nothing else**, the storage routine would remove one recurring argument at the start of class. I’d review how much lesson time it actually saves and whether students feel able to reach family when necessary.',
      ],
      b: [
        'I’d give teachers **discretion**. The problem in this case is mainly losing lesson time. I’d start by asking pupils to **put phones away** and give teachers a clear way to allow them for a particular task.',
        '**On the one hand**, different classrooms can make **compliance** more confusing. **In reality**, a shared default and a clear signal for exceptions could make rules much less **inconsistent** than they sound. Staff would need time to agree on how to apply them.',
        'I’d choose B because it addresses where the reported problem occurs and keeps the measures less **intrusive**. If it still takes several minutes to start lessons, I’d consider extending the policy.',
      ],
      conditional: [
        'I’d keep the rule as narrow as the evidence allows. If misuse is confined to lessons, I’d ask students to **put their phones away** at the start and let teachers use **discretion** for specific activities. I’d track the time reclaimed rather than the number of phones confiscated.',
        '**In reality**, break-time use can have a **spillover effect** if it draws conflict into class. In that situation, a **blanket** routine might be justified. The school would need to show that it can apply it consistently without **intrusive** checks.',
        '**If nothing else**, I’d observe both busy and quiet parts of the day before deciding. A school-wide problem would justify A. A classroom problem with improving **compliance** would lead me to B.',
      ],
    },
  },
  {
    slug: 'scholarship-depth-or-reach',
    title: 'Full scholarships or smaller awards for more students?',
    prompt: 'A college has enough money for two full-tuition scholarships for students on low incomes. It could instead give eight students a grant covering a quarter of their tuition. Which would do more to make a degree attainable?',
    options: [
      { label: 'Two full scholarships', description: 'Cover all tuition for two students with substantial need. Other eligible applicants would receive no award from this fund.' },
      { label: 'Eight partial grants', description: 'Cover one quarter of tuition for a wider group. Recipients still need a credible way to meet the rest of their costs.' },
    ],
    conditionalPrompt: 'Decide what size of award actually changes whether a student could enrol and stay until graduation.',
    vocabulary: {
      nouns: [
        ['affordability gap', 'the amount by which a cost exceeds what someone can afford', 'The partial grant closed her affordability gap.'],
        ['retention', 'the ability to keep people enrolled or involved', 'The college tracked retention after the first year.'],
        ['unmet need', 'help that is necessary and has not yet been provided', 'The survey showed unmet need among commuters.'],
        ['threshold', 'a level at which an outcome or rule changes', 'The income threshold determines eligibility.'],
      ],
      phrasalVerbs: [
        ['spread funds out', 'distribute money among more people or purposes', 'The college spread funds out across eight awards.'],
        ['make up the difference', 'contribute what is still missing', 'Savings could make up the difference.'],
        ['miss out on a place', 'lose the opportunity to take a place', 'She nearly missed out on a place for financial reasons.'],
        ['see someone through', 'give someone enough support to reach the end of a period', 'The grant saw him through his final year.'],
      ],
      adjectives: [
        ['means-tested', 'based on a check of someone’s financial resources', 'The bursary is means-tested.'],
        ['tokenistic', 'giving an appearance of support with little real effect', 'A tiny award would feel tokenistic.'],
        ['unattainable', 'impossible to obtain with the resources at hand', 'Full fees make the degree unattainable for her.'],
        ['marginal', 'very small in amount or effect', 'The saving made only a marginal difference.'],
      ],
      connectors: [
        ['Above all, …', 'emphasise what matters most', 'Above all, the grant should change who can enrol.'],
        ['By that logic, …', 'apply the reasoning just stated to a related choice', 'By that logic, smaller awards can work for some applicants.'],
        ['In such cases, …', 'make a point about the group of situations just described', 'In such cases, the full award changes the decision.'],
        ['If anything, …', 'say that the evidence points more strongly in one direction', 'If anything, travel makes the gap wider.'],
      ],
    },
    models: {
      a: [
        'I’d fund two full scholarships. **Above all**, the award should change someone’s ability to enrol. If a degree is **unattainable** without major support, an award that only narrows the **affordability gap** might not change who can accept a place.',
        'I’d make the scholarships **means-tested** and check whether they can **see students through** the full degree. Tuition support matters most if recipients also have a plan for living costs. Enrolling and staying enrolled are different challenges.',
        '**In such cases**, funding only two people can still make a difference that shows up in **retention**. I’d track that outcome and use the results to decide whether the college should offer more awards later.',
      ],
      b: [
        'I’d **spread the funds out** if there are eight students with a manageable **affordability gap**. A partial grant can make a real difference when a student has already put together a workable plan and needs a final contribution.',
        '**By that logic**, a small award needs to fill a real gap. I’d ask applicants how they intend to **make up the difference**, without assuming they can take on hours of extra work. A **tokenistic** grant could leave families with the same decision they faced before.',
        '**Above all**, I’d judge B by **retention** and by how many people would otherwise **miss out on a place**. If the college can show that more than two can enrol and stay, I’d choose the wider reach.',
      ],
      conditional: [
        'I’d look at the size of the **unmet need** for each applicant. If full tuition is the only way to make a degree attainable for some, I’d choose A, especially if the scholarship can **see them through** several years.',
        '**In such cases**, a partial grant could be **tokenistic**. **By that logic**, if most applicants need only a quarter of tuition to close the gap, I’d **spread funds out**. I’d check living costs too rather than relying entirely on the income **threshold**.',
        '**Above all**, I’d count how many students can start and keep studying with each proposal. The point is to choose a grant large enough to change the outcome for each person it is meant to help.',
      ],
    },
  },
  {
    slug: 'capstone-portfolio-or-team-project',
    title: 'An individual portfolio or a team project?',
    prompt: 'A college is redesigning its end-of-degree assessment. Should every student submit an individual portfolio or should teams deliver a real project for a local organisation and document what each person contributed?',
    options: [
      { label: 'An individual portfolio', description: 'Each student selects several pieces of work, explains their revisions and defends one choice in a short interview.' },
      { label: 'A team project', description: 'Small groups produce a deliverable for a local partner. Each student records their role and answers individual questions about the work.' },
    ],
    conditionalPrompt: 'Decide where shared work would provide better evidence of ability and how to make individual contributions visible.',
    vocabulary: {
      nouns: [
        ['division of labour', 'how tasks and responsibilities are shared', 'The group agreed on the division of labour.'],
        ['deliverable', 'a result or piece of work that must be provided', 'The final deliverable was an accessible guide.'],
        ['ownership', 'taking responsibility for an outcome or part of the work', 'Each learner had ownership of a separate section.'],
        ['audit trail', 'records that let someone trace what happened', 'The drafts create an audit trail.'],
      ],
      phrasalVerbs: [
        ['take on a task', 'accept responsibility for doing a task', 'He took on the interviews.'],
        ['pull your weight', 'do your fair share of the work', 'Everyone had to pull their weight.'],
        ['piece together a record', 'assemble information from several sources', 'They pieced together a record of the revisions.'],
        ['see a project through', 'stay with a project until it is finished', 'The team saw the project through to launch.'],
      ],
      adjectives: [
        ['traceable', 'able to be followed back to its source', 'Each edit is traceable to its author.'],
        ['uneven', 'varying in quality, amount or effort across people', 'The division of work was uneven.'],
        ['authentic', 'closely reflecting a real situation or activity', 'The brief felt authentic to the students.'],
        ['interdisciplinary', 'combining knowledge from different fields', 'The brief required interdisciplinary work.'],
      ],
      connectors: [
        ['For instance, …', 'introduce a specific case illustrating a point', 'For instance, a design needs several revisions.'],
        ['By comparison, …', 'compare with the case you just described', 'By comparison, a portfolio shows individual progress.'],
        ['From that perspective, …', 'explain a judgement from a particular point of view', 'From that perspective, a shared brief is valuable.'],
        ['In any event, …', 'make a point that holds regardless of the outcome', 'In any event, each student needs a fair mark.'],
      ],
    },
    models: {
      a: [
        'I’d use the portfolio. A student can show **ownership** of a piece and explain what changed from draft to final version. **For instance**, I’d ask them to **piece together** a short **audit trail** showing how they responded to feedback on one difficult section.',
        '**By comparison**, a polished group **deliverable** can conceal **uneven** contributions. Even a detailed account of the **division of labour** may struggle to show who thought through a decision when several people discussed it.',
        '**In any event**, I’d give each student a chance to defend a **traceable** choice in an interview. I’d still include group work in the degree because collaboration is worth practising before the individual assessment.',
      ],
      b: [
        'I’d use a team project. A real client gives students an **authentic** reason to negotiate what a **deliverable** should do. If they can **see the project through**, we learn something about how they adjust when priorities change.',
        '**For instance**, someone might **take on** interviews while another person develops the first design. An explicit **division of labour** gives each student a meaningful role. Individual questions would help show who took **ownership** when the team changed course.',
        '**In any event**, each person needs a fair mark even if the end result is uneven. I’d assess the shared result and the individual reasoning separately. That makes B workable without pretending every contribution looks the same.',
      ],
      conditional: [
        'I’d choose according to what the qualification is meant to certify. If the college needs a **traceable** record of individual judgement, the portfolio gives each student a chance to **piece together** an **audit trail** and defend their own choices.',
        '**By comparison**, if graduates are expected to work on **interdisciplinary** projects, a group brief could be more **authentic**. It would need a clear **division of labour** and a way to see whether everyone **pulled their weight**.',
        '**From that perspective**, I’d choose B if individual contributions can be defended without relying on the team’s overall success. I’d choose A if the available evidence can’t separate the students’ reasoning with enough confidence.',
      ],
    },
  },
  {
    slug: 'conference-working-language',
    title: 'One conference language or several?',
    prompt: 'A regional university conference can use English for every main session or let speakers choose their language and fund interpretation for the main talks. Which would make the event more valuable to its audience?',
    options: [
      { label: 'One working language', description: 'Use English for talks and discussions so everyone needs to follow only one language. Offer time for speakers to rehearse with a colleague.' },
      { label: 'Multilingual main talks', description: 'Let presenters speak the language they are most precise in. Provide interpretation for the main sessions, with more limited coverage in small groups.' },
    ],
    conditionalPrompt: 'Decide whether the bigger barrier affects speakers or audiences, and what would make interpretation workable.',
    vocabulary: {
      nouns: [
        ['working language', 'the language routinely used to carry out an activity', 'English is the conference’s working language.'],
        ['precision', 'the quality of expressing something exactly', 'The speaker wanted precision in the technical terms.'],
        ['interpretation', 'immediate translation of spoken language', 'The organisers provided simultaneous interpretation.'],
        ['audience reach', 'the number or range of people an event can include', 'Online captions extended its audience reach.'],
      ],
      phrasalVerbs: [
        ['get an idea across', 'explain an idea so other people understand it', 'The diagram helped her get the idea across.'],
        ['keep up with a talk', 'follow a talk as it continues', 'I struggled to keep up with the technical talk.'],
        ['boil an argument down', 'reduce an argument to its main point', 'She boiled her argument down to one example.'],
        ['carry a meaning over', 'transfer a meaning into a new context or language', 'The interpreter carried the distinction over into English.'],
      ],
      adjectives: [
        ['idiomatic', 'natural in the way a language is generally used', 'The phrase is idiomatic in Spanish.'],
        ['multilingual', 'using several languages', 'The event has a multilingual programme.'],
        ['nuanced', 'showing subtle differences in meaning or judgement', 'Her answer offered a nuanced distinction.'],
        ['budget-constrained', 'limited by the money available', 'The organisers are budget-constrained.'],
      ],
      connectors: [
        ['For the most part, …', 'say what is true in most cases', 'For the most part, the audience understands English.'],
        ['At the cost of …', 'identify what is sacrificed to achieve something', 'One language simplifies the event at the cost of some precision.'],
        ['With the proviso that …', 'state a condition attached to an agreement', 'I’d choose English, with the proviso that speakers get rehearsal time.'],
        ['To put it another way, …', 'express a point again from a clearer angle', 'To put it another way, access matters on both sides of the room.'],
      ],
    },
    models: {
      a: [
        'I’d use one **working language** if the audience can follow it comfortably. **For the most part**, the value of a conference is in the questions that come straight after a talk. A shared language makes that exchange more direct for everyone in the room.',
        'That may come **at the cost of** some **precision**. I’d ask speakers to **boil their argument down** to a clear set of slides and offer a rehearsal. An argument can be clear without sounding entirely **idiomatic**.',
        'I’d choose A **with the proviso that** the organisers check who can actually **keep up with** a session in English. If an important part of the audience cannot take part, a single language wouldn’t serve the aim.',
      ],
      b: [
        'I’d make the main sessions **multilingual**. If someone can explain their work in a more **nuanced** way in another language, requiring English could narrow the discussion. Good **interpretation** can **carry that meaning over** so others can respond to it.',
        'I’d fund interpretation **with the proviso that** presenters share their slides and a short glossary in advance. **Budget-constrained** organisers can concentrate resources on sessions that draw the widest mix of speakers and listeners.',
        '**To put it another way**, the goal is for the work to travel beyond the people already comfortable in one language. I’d choose B if the supported sessions noticeably improve **audience reach** and participants can ask questions in a supported language.',
      ],
      conditional: [
        'I’d ask attendees which sessions they can already **keep up with** and speakers how confidently they can **get their ideas across**. When almost everyone shares a **working language**, I’d use it and offer rehearsal time.',
        'I’d choose the **multilingual** option when several important speakers or audiences would otherwise lose access. The strongest case is where **interpretation** can cover the whole exchange, including questions, without sacrificing the **precision** of the discussion.',
        '**With the proviso that** the budget covers enough interpreters, I’d favour B when the audience is split across languages. If the split is small and the event is **budget-constrained**, A makes sense with clear materials and support for speakers.',
      ],
    },
  },
  {
    slug: 'museum-return-or-shared-custody',
    title: 'Permanent return or shared custody?',
    prompt: 'A museum and an organisation representing an object’s community of origin have agreed it should return there. Should the museum transfer ownership permanently, or should both organisations consider shared custody with exhibitions in each place?',
    options: [
      { label: 'Permanent return', description: 'Transfer ownership and let the organisation at the place of origin decide how and where the object is shown. Any future loan would be its choice.' },
      { label: 'Shared custody by agreement', description: 'Determine responsibilities jointly and plan exhibitions in both places. The agreement would need clear rules about travel, care and who can end it.' },
    ],
    conditionalPrompt: 'Decide which decisions the community should control and what terms would make collaboration acceptable to both sides.',
    vocabulary: {
      nouns: [
        ['provenance', 'the documented history of where an object came from and who held it', 'The archive helped establish the object’s provenance.'],
        ['custodianship', 'responsibility for looking after something over time', 'The agreement gives both institutions a role in custodianship.'],
        ['restitution', 'returning something to those who have a claim to it', 'The board considered restitution after reviewing the evidence.'],
        ['conservation capacity', 'people, equipment and funding available to preserve objects', 'The partnership could strengthen conservation capacity.'],
      ],
      phrasalVerbs: [
        ['hand back an object', 'return an object to someone with a claim to it', 'The museum handed back the object last spring.'],
        ['trace an object back to its origin', 'follow records to identify where an object came from', 'Researchers traced the object back to its original makers.'],
        ['draw up an agreement', 'prepare a formal agreement', 'Both parties drew up an agreement together.'],
        ['go ahead with a transfer', 'begin carrying out a planned transfer', 'The institutions went ahead with the transfer.'],
      ],
      adjectives: [
        ['binding', 'requiring people to keep to a decision or agreement', 'Both parties wanted a binding agreement.'],
        ['unilateral', 'decided or done by one side alone', 'A unilateral decision would undermine trust.'],
        ['reversible', 'able to be changed back or undone', 'The display change is reversible.'],
        ['contested', 'disputed by people with different claims or views', 'The object’s ownership remained contested.'],
      ],
      connectors: [
        ['In light of …', 'base a judgement on information you now have', 'In light of the records, I’d reconsider ownership.'],
        ['Having said that, …', 'add a qualification to a view you have just expressed', 'Having said that, future loans could still be useful.'],
        ['Where possible, …', 'identify an action to take when circumstances allow', 'Where possible, keep travel to a minimum.'],
        ['On those terms, …', 'state what you would accept under specific conditions', 'On those terms, a partnership could work.'],
      ],
    },
    models: {
      a: [
        '**In light of** the agreement that the object should return, I’d **hand it back** permanently. **Restitution** gives the community control over access, display and interpretation. That matters even if the museum could look after the object carefully.',
        '**Having said that**, shared exhibitions may be valuable. I’d offer help with **conservation capacity** and make future loans possible through a **binding** agreement. The organisation receiving the object would decide when and whether to lend it.',
        'I’d choose A because that order matters. We can **draw up an agreement** about lending once ownership is settled. Then an exhibition can follow from a choice about how to share the object.',
      ],
      b: [
        'I’d consider shared **custodianship** if the organisation at the place of origin wants it and can shape the terms. Shared exhibitions could bring the object’s **provenance** to audiences in both places and let the organisations support each other’s conservation work.',
        '**Having said that**, I wouldn’t **go ahead with** an arrangement the museum could change through a **unilateral** decision. Both sides should **draw up a binding agreement** covering approval of exhibitions, travel limits and how either side can end the arrangement.',
        '**On those terms**, I’d choose B. If there is no shared interest or travel could harm the object, I’d accept permanent return. A partnership only makes sense if both organisations want to keep working together.',
      ],
      conditional: [
        'I’d start with what the community wants the return to achieve. **In light of** that answer, I’d favour **restitution** if control over display and access is the main point. The museum can **hand the object back** and offer support afterwards.',
        'If the organisation at the place of origin proposes active cooperation, I’d be open to shared **custodianship**. It would need **binding** terms about care and the ability to end the arrangement. **Where possible**, I’d keep exhibitions from requiring frequent travel.',
        '**On those terms**, B can serve a real shared purpose. I’d ask whose decision it is when plans conflict. If that question can’t be resolved without a **unilateral** veto by the museum, I’d choose A.',
      ],
    },
  },
]
