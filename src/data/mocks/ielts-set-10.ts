import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-10',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 10',
  subtitle: 'Microplastics · The Sharing Economy · Memory and Identity',
  timeMinutes: 164,
  sections: [
    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-10.mp3',
      title: 'Listening — Section 1: Job-Agency Registration',
      instructions: 'You will hear a conversation between a recruitment consultant and a job seeker. Listen and answer Questions 1–10.',
      transcript: `CONSULTANT: Good morning, Citywide Recruitment. How can I help?

JOBSEEKER: Hi, I'd like to register with your agency to look for work.

CONSULTANT: Certainly, I can take your details now. Can I start with your name?

JOBSEEKER: Yes, my first name is Daniel, and my surname is Farrelly.

CONSULTANT: Could you spell the surname?

JOBSEEKER: Of course — F-A-R-R-E-L-L-Y.

CONSULTANT: Thank you. And the best number to reach you on?

JOBSEEKER: It's my mobile — 07816 445230.

CONSULTANT: Let me just check — 07816 445230. Great. Now, what kind of work are you looking for?

JOBSEEKER: I was thinking warehouse work — actually, no, I'd really prefer office administration. That's where my strengths are.

CONSULTANT: Administration, good. And when would you be available to start?

JOBSEEKER: I'm free immediately — I finished my last contract a fortnight ago.

CONSULTANT: Excellent, employers love that. Do you have relevant experience?

JOBSEEKER: Most of my background is in retail — I managed a small shop for three years, so I'm used to dealing with customers and paperwork.

CONSULTANT: That's useful. And your highest qualification?

JOBSEEKER: I have a diploma in business studies.

CONSULTANT: Noted. One more thing — do you speak any other languages? Some of our clients value that.

JOBSEEKER: Yes, I speak French fairly fluently.

CONSULTANT: Wonderful. Now, let me tell you about a few vacancies we have. First, there's a Receptionist role in the city centre, full-time, paying £11.50 an hour. Then we have an Office Assistant position — that one's out at Riverside, it's part-time, and it pays £12 an hour. And finally, a Data Clerk job, also in the city centre, but the hours are evenings only, at £13 an hour.

JOBSEEKER: The Office Assistant one sounds ideal, actually.

CONSULTANT: Great — I'll put you forward for it. I'll email you the full description this afternoon, and we'll arrange an interview.

JOBSEEKER: Thank you so much for your help.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Job-Agency Registration',
          example: 'First name:  Daniel',
          template: `Surname: {{1}}
Contact number: 07816 445230
Type of work wanted: {{2}}
Available to start: {{3}}
Previous experience in: {{4}}
Highest qualification: {{5}}
Other languages: {{6}}`,
          blanks: [
            { num: 1, answers: ['Farrelly'], maxWords: 1 },
            { num: 2, answers: ['administration', 'admin'], maxWords: 1 },
            { num: 3, answers: ['immediately'], maxWords: 1 },
            { num: 4, answers: ['retail'], maxWords: 1 },
            { num: 5, answers: ['diploma'], maxWords: 1 },
            { num: 6, answers: ['French'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Job', 'Location', 'Hours', 'Pay per hour'],
          rows: [
            [
              'Receptionist',
              'city centre',
              'full-time',
              { num: 7, answers: ['11.50', '£11.50'], maxWords: 1 },
            ],
            [
              'Office Assistant',
              { num: 8, answers: ['Riverside'], maxWords: 1 },
              'part-time',
              '£12',
            ],
            [
              'Data Clerk',
              'city centre',
              { num: 9, answers: ['evenings', 'evening'], maxWords: 1 },
              { num: 10, answers: ['13', '£13'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-10.mp3',
      title: 'Listening — Section 2: Library Services',
      instructions: 'You will hear a talk about the services offered by a local library. Listen and answer Questions 11–20.',
      transcript: `Hello everyone, and thank you for coming to this short talk about your local library and the services we offer. I'm the head librarian here, and I'd like to run through what's available, including some exciting additions.

Let me start with what's new this year. We've just launched an e-book lending service, so you can now borrow digital titles and read them on your phone or tablet at home. We've also opened a set of bookable study rooms on the upper floor, which have been in great demand from students. Now, some of you will ask about the café and the free wifi — those aren't new, they've been with us for several years. And our children's area is currently being renovated, so please bear with us there.

Now, on to membership and borrowing. Joining the library is completely free for local residents. Once you're a member, you can borrow up to twelve items at any one time — books, audiobooks, or DVDs. The standard loan period is three weeks, and you can renew online if no one else has reserved the item. If you do return something late, there's a small fine for each day it's overdue, so do keep an eye on your due dates.

We also provide some services you might not know about. Members get free access to a wide range of online newspapers, which is perfect if you like to keep up with the news from around the world. For families, we run a story session for young children every Saturday morning — it's very popular, so arrive early. And if you need to use a computer, our computer suite is on the first floor, with printing and scanning available.

Finally, if you'd like to join today, it couldn't be simpler. Just come to the main desk and bring proof of your address — a utility bill or a bank statement is fine — and we'll issue your card on the spot.

Thank you for listening, and please do explore everything the library has to offer.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO services does the speaker say are new this year?',
          options: [
            { letter: 'A', text: 'an e-book lending service' },
            { letter: 'B', text: 'the café' },
            { letter: 'C', text: 'bookable study rooms' },
            { letter: 'D', text: 'the children\'s area' },
            { letter: 'E', text: 'the free wifi' },
          ],
          selectCount: 2,
          answers: ['A', 'C'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Library Services',
          template: `Membership and borrowing
• Membership is free for local {{13}}.
• Members can borrow up to {{14}} items at once.
• The standard loan period is {{15}}.
• Late returns are charged a small {{16}} per day.

Other services
• Free access to a range of online {{17}}.
• A {{18}} for young children every Saturday morning.
• The computer suite is on the {{19}} floor.

Joining today
• Bring proof of your {{20}} to the main desk.`,
          blanks: [
            { num: 13, answers: ['residents', 'resident'], maxWords: 2 },
            { num: 14, answers: ['12', 'twelve'], maxWords: 2 },
            { num: 15, answers: ['three weeks', '3 weeks'], maxWords: 2 },
            { num: 16, answers: ['fine'], maxWords: 2 },
            { num: 17, answers: ['newspapers', 'newspaper'], maxWords: 2 },
            { num: 18, answers: ['story session', 'storytime'], maxWords: 2 },
            { num: 19, answers: ['first', 'first floor'], maxWords: 2 },
            { num: 20, answers: ['address'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-10.mp3',
      title: 'Listening — Section 3: Architecture Project',
      instructions: 'You will hear two architecture students discussing a project with their tutor. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Right, Maya, Josh — let's review your architecture project before your presentation. Tell me about the building you designed.

MAYA: We designed a community library. We wanted a public space that would bring people of all ages together, not just a place to borrow books.

TUTOR: A lovely idea. Where did the inspiration come from? I remember you mentioned a historic building at one point.

JOSH: We did look at an old town hall for ideas, but in the end the main inspiration was the natural landscape around the site — the way the hills curve. The roofline actually echoes those hills.

TUTOR: That's a strong concept. And what did you build the main structure from?

MAYA: We debated using concrete, because it's cheap and durable, but we finally chose timber. It's far more sustainable, and it gives the interior a really warm feel.

TUTOR: Good choice. Was there a particular difficulty you had to overcome?

JOSH: Definitely. The hardest thing wasn't the budget or accessibility — it was the limited size of the site. It's quite a narrow plot, so fitting everything in without it feeling cramped took a lot of reworking.

TUTOR: You've handled that well. Now, I looked at your scale model. It's beautifully made, but I have to say the scale isn't obvious — someone looking at it can't easily tell how big the building actually is. You might add a small human figure for reference.

MAYA: That's a good point. We'll fix that.

TUTOR: Now, for the presentation itself. Start with a clear introduction that sets out your aims — don't dive straight into the details. Then make sure you explain your choice of materials, because that's one of the strongest parts of your project. I'd also add a diagram showing the internal layout, so the audience can follow the flow of the spaces. And do rehearse beforehand to get your timing right; you've only got ten minutes. Practise once in front of me, and I'll give you some feedback afterwards.

JOSH: That's really helpful — thank you.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What type of building did the students design?',
          options: [
            'a community library',
            'a sports centre',
            'a railway station',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'What was the main inspiration for their design?',
          options: [
            'a historic town hall',
            'the natural landscape',
            'a building they had seen abroad',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'Which material did they choose for the main structure?',
          options: [
            'steel',
            'concrete',
            'timber',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What was the biggest challenge they faced?',
          options: [
            'staying within budget',
            'meeting accessibility rules',
            'the limited size of the site',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What did the tutor say about their scale model?',
          options: [
            'It contained too much detail.',
            'The scale was not clear.',
            'It needed brighter colours.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• The presentation should begin with a clear {{26}}.
• They should explain their choice of {{27}}.
• The tutor suggests adding a {{28}} of the internal layout.
• They should rehearse to get their {{29}} right.
• The tutor will give them {{30}} after the practice run.`,
          blanks: [
            { num: 26, answers: ['introduction'], maxWords: 1 },
            { num: 27, answers: ['materials', 'material'], maxWords: 1 },
            { num: 28, answers: ['diagram'], maxWords: 1 },
            { num: 29, answers: ['timing'], maxWords: 1 },
            { num: 30, answers: ['feedback'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-10.mp3',
      title: 'Listening — Section 4: The Migration of Whales',
      instructions: 'You will hear part of a lecture about the migration of whales. Listen and answer Questions 31–40.',
      transcript: `Good afternoon. Today's lecture is about one of the great spectacles of the natural world — the migration of whales, some of which travel thousands of kilometres every year.

Let's begin with why they migrate at all. Most large whales divide their year between two very different regions. In the cooler months they head towards the tropics, and the main reason is reproduction: they travel to warm breeding grounds, where their young have a better chance of surviving. In summer, by contrast, they return to the poles to feed, where the cold, nutrient-rich water is full of the tiny shrimp-like creatures called krill that form the bulk of their diet. During this feeding season a whale eats almost constantly, storing the energy as a thick layer of blubber that will sustain it through the long journey ahead.

Now, the distances involved are extraordinary. Grey whales, for example, make some of the longest journeys of any mammal on Earth, swimming from the Arctic all the way to the coast of Mexico. There, the females give birth in warm, shallow lagoons near the shore, which offer their calves protection from predators.

How do whales find their way across such vast stretches of open ocean? Scientists believe they may be able to detect the Earth's magnetic field, using it rather like a compass. They also rely heavily on sound, and some species produce long, complex songs that carry for many kilometres underwater and help them stay in contact.

Sadly, whales today face a number of serious threats. One of the most immediate is collision with ships along busy coastal routes, which kills or injures many animals every year. In addition, the growing noise from shipping and industry interferes with their communication, making it harder for them to find one another and to navigate. And in the longer term, rising sea temperatures are altering ocean currents and shifting the location of their food, forcing whales to change patterns of migration that have remained stable for thousands of years.

Protecting these remarkable animals will require international cooperation — but understanding their journeys is the essential first step.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE MIGRATION OF WHALES',
          template: `Why whales migrate
• They travel to warm {{31}} grounds so their young can survive.
• At the poles they feed on tiny creatures called {{32}}.
• They store energy as a thick layer of {{33}}.

Routes and navigation
• Grey whales make some of the longest {{34}} of any mammal.
• Females give birth in warm, shallow {{35}} near the shore.
• Whales may detect the Earth's magnetic {{36}} to navigate.
• They also communicate using long, complex {{37}}.

Threats
• Many are killed by collisions with {{38}}.
• Underwater noise interferes with their {{39}}.
• Rising sea temperatures are shifting the location of their {{40}}.`,
          blanks: [
            { num: 31, answers: ['breeding'], maxWords: 1 },
            { num: 32, answers: ['krill'], maxWords: 1 },
            { num: 33, answers: ['blubber', 'fat'], maxWords: 1 },
            { num: 34, answers: ['journeys', 'journey', 'migrations'], maxWords: 1 },
            { num: 35, answers: ['lagoons', 'lagoon'], maxWords: 1 },
            { num: 36, answers: ['field'], maxWords: 1 },
            { num: 37, answers: ['songs', 'song'], maxWords: 1 },
            { num: 38, answers: ['ships', 'ship'], maxWords: 1 },
            { num: 39, answers: ['communication'], maxWords: 1 },
            { num: 40, answers: ['food'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5, skill: 'reading',
      title: 'Reading — Passage 1: Microplastics in the Ocean',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Microplastics in the Ocean

Plastic pollution has become one of the most visible and alarming symptoms of humanity's impact on the natural environment. Millions of tonnes of plastic enter the world's oceans each year, where it persists indefinitely—plastic does not biodegrade but rather breaks down into progressively smaller fragments. Particles smaller than five millimetres in diameter are classified as microplastics, and their presence now pervades every marine environment on Earth, from the surface of the Arctic Ocean to the sediments of the deepest ocean trenches.

The sources of microplastics are numerous and varied. Primary microplastics are manufactured at microscopic size for specific industrial or consumer purposes: microbeads used in cosmetic exfoliants and toothpastes, and pellets known as nurdles that are the raw material from which larger plastic products are moulded. Secondary microplastics result from the gradual fragmentation of larger plastic items—bottles, bags, fishing gear, synthetic clothing—under the combined action of ultraviolet radiation, wave action, and mechanical abrasion. A single washing-machine cycle involving synthetic garments can release hundreds of thousands of microfibre particles into wastewater.

Marine organisms interact with microplastics at multiple levels of the food web. Filter feeders such as mussels and oysters ingest particles indiscriminately alongside their normal food. Fish and seabirds confuse floating microplastic fragments for food items, with serious consequences: laboratory studies have shown that fish exposed to microplastics exhibit reduced feeding behaviour, impaired reproduction, and liver stress. Chemical concerns compound the physical ones: microplastics are highly effective scavengers of persistent organic pollutants (POPs) in seawater, concentrating toxic chemicals that then enter the food chain when the plastic is ingested.

Human exposure to microplastics is now effectively universal. Studies have detected microplastics in human blood, lung tissue, placental tissue, and breast milk. The health consequences of this exposure are not yet fully characterised, but laboratory studies have identified potential mechanisms of harm: microplastic particles have been shown to cause inflammatory responses in human cell cultures, and certain plastic additives—plasticisers and stabilisers—are established endocrine disruptors that interfere with hormonal regulation.

The regulatory response to microplastic pollution has been partial and slow. Several countries including the United States, the United Kingdom, and France have banned the use of microbeads in cosmetics. However, these measures address only a fraction of the problem: microbeads account for a small proportion of total microplastic input compared to secondary microplastics from larger items. More comprehensive solutions require addressing plastic production and waste management at the source—reducing the volume of plastic manufactured, improving recycling infrastructure, and developing materials that degrade safely in the environment. In 2022, United Nations member states agreed to negotiate a legally binding international treaty on plastic pollution, widely described as the most significant environmental agreement since the Paris Climate Accord.`,
      questions: [
        {
          type: 'formgroup', id: 'r1-tfng', part: 5, qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Microplastics are defined as plastic particles smaller than five millimetres in diameter.\n2. {{2}}: Nurdles are primary microplastics used as raw material to make larger plastic products.\n3. {{3}}: Synthetic clothing is the main source of microplastic pollution worldwide.\n4. {{4}}: Laboratory studies have shown fish exposed to microplastics experience reduced feeding behaviour.\n5. {{5}}: Microplastics have been detected in human blood and placental tissue.\n6. {{6}}: The United States has banned microbeads in all consumer products, not just cosmetics.\n7. {{7}}: United Nations member states agreed to negotiate a plastic pollution treaty in 2022.`,
          blanks: [
            { num: 1, answers: ['TRUE'] }, { num: 2, answers: ['TRUE'] }, { num: 3, answers: ['NOT GIVEN'] },
            { num: 4, answers: ['TRUE'] }, { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['NOT GIVEN'] }, { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup', id: 'r1-sent', part: 5, qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `8. Plastic does not {{8}} but instead breaks into progressively smaller fragments.\n9. Fragmentation of larger plastics occurs through ultraviolet radiation, wave action, and {{9}}.\n10. Microplastics scavenge {{10}} from seawater, concentrating toxins that enter the food chain.\n11. Certain plastic additives are known {{11}} that interfere with hormonal regulation.\n12. Microbead bans address only a small proportion of microplastic input compared to {{12}} microplastics.\n13. The 2022 plastic pollution treaty was described as the most significant environmental agreement since the {{13}}.`,
          blanks: [
            { num: 8, answers: ['biodegrade'] }, { num: 9, answers: ['mechanical abrasion'] },
            { num: 10, answers: ['persistent organic pollutants', 'POPs'] },
            { num: 11, answers: ['endocrine disruptors'] }, { num: 12, answers: ['secondary'] },
            { num: 13, answers: ['Paris Climate Accord'] },
          ],
        },
      ],
    },

    {
      part: 6, skill: 'reading',
      title: 'Reading — Passage 2: The Sharing Economy',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `The Sharing Economy

A. The term "sharing economy" describes a model of economic activity in which individuals share access to goods, services, or skills, typically mediated by digital platforms. Ride-sharing, home-sharing, tool libraries, peer-to-peer lending, and skill-exchange platforms all fall under this broad category. Proponents describe it as a more efficient, sustainable, and community-oriented alternative to traditional consumption; critics argue that many so-called sharing platforms are simply new mechanisms for commercial transaction, with the environmental and social benefits frequently overstated.

B. The sharing economy's growth has been dramatic. Airbnb, founded in 2008, now lists more rooms than the world's five largest hotel chains combined. Uber operates in over 70 countries and has fundamentally disrupted the taxi industry in dozens of cities. Beyond these headline platforms, thousands of smaller services facilitate the rental of cars, bicycles, formal wear, power tools, and storage space. The aggregate value of transactions flowing through sharing economy platforms reached an estimated 335 billion US dollars globally in 2025, up from virtually zero in 2010.

C. Environmental claims for the sharing economy are mixed. In theory, sharing reduces the total number of assets that need to be produced: a shared car replaces multiple privately owned vehicles, reducing manufacturing, raw material consumption, and parking infrastructure demand. In practice, however, research has found that ride-sharing services increase the total vehicle kilometres travelled in cities rather than reducing them, because they attract passengers from walking, cycling, and public transport rather than from car ownership. Similarly, home-sharing has been shown in some markets to increase accommodation demand and tourism-related travel, potentially generating more carbon emissions than traditional hotel use.

D. The disruption of regulated industries is a persistent source of controversy. The hotel industry argues that home-sharing platforms operate at a competitive advantage by avoiding hotel taxes, fire safety regulations, and disability access requirements. Taxi industries have lobbied strenuously against ride-sharing platforms that they claim circumvent licensing and insurance requirements designed to protect consumers. Regulators have responded inconsistently: some cities have embraced platforms while negotiating new forms of compliance, while others have sought outright bans. Amsterdam, Barcelona, and New York City have all introduced restrictions on short-term rentals following evidence that home-sharing had contributed to housing shortages and rising rents for permanent residents.

E. Workers in the sharing economy—already discussed in relation to the gig economy—face significant vulnerabilities. While platform companies emphasise the freedom and autonomy they offer, the absence of employment protections means that a platform's algorithmic decisions—about pricing, job allocation, and account termination—can have immediate and severe consequences for a worker's livelihood. Research has documented cases in which workers were deactivated from platforms without explanation or recourse, losing their primary income with no entitlement to notice pay or appeal.

F. Despite these critiques, genuine sharing—distinct from commercial platform activity—does deliver social and economic value. Community sharing libraries, tool exchanges, community-supported agriculture schemes, and informal skill-swap networks provide goods and services in ways that build social capital, reduce waste, and strengthen local communities. Whether these forms of sharing can be scaled or whether they remain inherently small-scale is an unresolved question. Some researchers argue that the true potential of the sharing economy lies not in billion-dollar platforms but in the revival of pre-market forms of mutual aid—reimagined for a networked, urban world.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'Specific cities that have restricted short-term rental platforms', answer: 'D' },
            { num: 15, stem: 'A description of the potential benefits of community-based, non-commercial sharing', answer: 'F' },
            { num: 16, stem: 'Evidence that ride-sharing may increase rather than decrease vehicle use in cities', answer: 'C' },
            { num: 17, stem: 'Global financial data illustrating the rapid growth of sharing economy platforms', answer: 'B' },
            { num: 18, stem: 'An example of a worker losing income due to an automated platform decision', answer: 'E' },
            { num: 19, stem: 'A broad definition of the sharing economy and a summary of debates about its nature', answer: 'A' },
            { num: 20, stem: 'Arguments made by the traditional taxi industry against ride-sharing services', answer: 'D' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' }, { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' }, { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' }, { letter: 'F', text: 'Paragraph F' },
          ],
        },
        {
          type: 'formgroup', id: 'r2-sent', part: 6, qRange: [21, 26],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `21. Airbnb now lists more rooms than the world's {{21}} largest hotel chains combined.\n22. Research found that ride-sharing attracts passengers from {{22}}, cycling, and public transport.\n23. The hotel industry argues that home-sharing platforms avoid hotel taxes and {{23}} regulations.\n24. Some cities have introduced {{24}} on short-term rentals because of rising rents for permanent residents.\n25. Platform companies emphasise the {{25}} and autonomy that gig workers enjoy.\n26. Community sharing schemes build {{26}}, reduce waste, and strengthen local communities.`,
          blanks: [
            { num: 21, answers: ['five'] }, { num: 22, answers: ['walking'] },
            { num: 23, answers: ['fire safety'] }, { num: 24, answers: ['restrictions'] },
            { num: 25, answers: ['freedom'] }, { num: 26, answers: ['social capital'] },
          ],
        },
      ],
    },

    {
      part: 7, skill: 'reading',
      title: 'Reading — Passage 3: Memory and Identity',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Memory and Identity

Memory is foundational to personal identity. The philosopher John Locke argued in the seventeenth century that personal identity consists in continuity of consciousness—specifically, in the ability to remember past experiences as one's own. On this account, you are the same person who woke up this morning because you remember waking up; you are the same person who attended school as a child because you can recall the experience. Memory, in Locke's framework, is not merely a record of the past but the very substance of the self.

This philosophical intuition is supported, in a qualified way, by neuroscience. The hippocampus—a structure deep in the medial temporal lobe—plays a critical role in the formation of episodic memories: memories of specific events tied to particular times and places. When the hippocampus is damaged, as in the celebrated case of patient H.M., who had large portions of both hippocampi removed in 1953 to control severe epilepsy, the ability to form new long-term memories is profoundly impaired. H.M. could remember his life before the surgery in broad outline but was unable to form lasting memories of anything that happened afterwards. He met his doctors daily for decades but greeted them each time as strangers. His case revealed that memory is not a single, unified faculty but a collection of distinct systems, each supported by different neural structures.

Not all memory is explicit and declarative. Procedural memory—the memory of skills and habits—operates largely independently of the hippocampus and remains intact even in patients with severe amnesia. H.M. was able to learn new motor skills, such as tracing a star shape while viewing his hand in a mirror, even though he had no conscious recollection of having practised the task. This dissociation between knowing how and knowing that reveals that human identity is not constituted solely by the narrative memory championed by Locke, but by a deeper layer of embodied, non-narrative competence.

Memory is also far more malleable than the metaphor of a "recording" implies. Memories are not stored like files on a computer but are reconstructed each time they are recalled, incorporating new information, subsequent experience, and current emotional states. The psychologist Elizabeth Loftus conducted landmark research demonstrating that people can be induced to form detailed and confident false memories through suggestive questioning. In one celebrated paradigm, subjects who were told that they had been lost in a shopping mall as children subsequently developed elaborate false memories of the event, complete with sensory details. This malleability has profound implications for the reliability of eyewitness testimony in legal contexts—an area where research has driven significant reforms in many jurisdictions.

The social dimension of memory is equally important. Psychologists distinguish between individual memory and collective or social memory: the shared narratives through which communities, nations, and cultures make sense of their past. Social memory is maintained through rituals, monuments, commemorations, and storytelling. It is also subject to political contestation: which events are remembered, how they are framed, and whose experiences are centred are never neutral questions. The ongoing debates in many countries about how history is taught in schools, and which historical figures deserve public commemoration, reflect the deep connection between collective memory and contemporary identity politics.

The question of how memory should be understood in an age of digital documentation adds further complexity. Photographs, videos, social media posts, and search histories now record experiences in unprecedented detail. Some researchers argue that digital memory supplements biological memory productively, freeing cognitive resources for higher-order thinking. Others warn that the outsourcing of memory to devices impairs the development of the neural networks that underpin deep comprehension and wisdom. The relationship between remembering and understanding, these researchers suggest, is more intimate than the simple storage metaphor implies.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'What does Locke\'s theory of personal identity, as described in the passage, claim?',
          options: [
            'Personal identity is constituted by physical continuity of the body over time.',
            'Personal identity consists in the continuity of consciousness through memory.',
            'Personal identity is a philosophical illusion with no neurological basis.',
            'Personal identity depends on social recognition rather than individual memory.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'What does the case of patient H.M. primarily demonstrate about memory?',
          options: [
            'That the hippocampus is responsible for all types of human memory.',
            'That memory is a single unified system located in one brain region.',
            'That memory consists of distinct systems supported by different neural structures.',
            'That procedural memory is more important than episodic memory for personal identity.',
          ],
          answer: 2,
        },
        {
          type: 'mcq', id: 'r3-q29', part: 7,
          text: 'What did Elizabeth Loftus\'s research demonstrate?',
          options: [
            'That memories are stored permanently and cannot be altered once formed.',
            'That people can develop detailed false memories through suggestive questioning.',
            'That eyewitness testimony is generally more reliable than previously thought.',
            'That children are better at forming false memories than adults.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q30', part: 7,
          text: 'What concern do some researchers express about digital memory tools?',
          options: [
            'That they store too little information to be genuinely useful.',
            'That they may impair the development of neural networks underlying comprehension.',
            'That they make memories too accurate, preventing the normal process of forgetting.',
            'That they cause people to share private memories inappropriately.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup', id: 'r3-ynng', part: 7, qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: H.M.'s surgery successfully controlled his epilepsy.\n32. {{32}}: H.M. was unable to learn new motor skills after his surgery.\n33. {{33}}: Procedural memory is primarily supported by the hippocampus.\n34. {{34}}: Research on false memories has led to reforms in how eyewitness testimony is used in legal proceedings.\n35. {{35}}: Social memory is always an accurate record of historical events.\n36. {{36}}: The writer argues that digital tools are ultimately beneficial for human memory.`,
          blanks: [
            { num: 31, answers: ['NOT GIVEN'] }, { num: 32, answers: ['NO'] }, { num: 33, answers: ['NO'] },
            { num: 34, answers: ['YES'] }, { num: 35, answers: ['NO'] }, { num: 36, answers: ['NOT GIVEN'] },
          ],
        },
        {
          type: 'formgroup', id: 'r3-sent', part: 7, qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. The hippocampus plays a critical role in forming {{37}} memories tied to specific times and places.\n38. H.M.'s ability to learn motor skills despite amnesia shows a distinction between knowing {{38}} and knowing that.\n39. Memories are not stored like files but are {{39}} each time they are recalled.\n40. Social memory is maintained through rituals, monuments, and {{40}}.`,
          blanks: [
            { num: 37, answers: ['episodic'] }, { num: 38, answers: ['how'] },
            { num: 39, answers: ['reconstructed'] }, { num: 40, answers: ['storytelling'] },
          ],
        },
      ],
    },

    {
      part: 8, skill: 'writing', title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [{
        type: 'write', id: 'w1', part: 8, taskNumber: 1,
        imageUrl: '/assets/ielts/charts/set10-task1.svg',
        imageAlt: 'Line graph showing unemployment rates in three countries from 2008 to 2022',
        stimulus: 'The line graph below shows the unemployment rate (as a percentage of the labour force) in three countries between 2008 and 2022.',
        text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'In many countries, people are moving away from rural areas and into cities. This trend is likely to continue in the future.',
        text: 'What are the main causes of this trend? What are its effects on both urban and rural areas? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
      }],
    },
    {
      part: 10, skill: 'speaking', title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak', id: 'sp1', part: 10, partNumber: 1,
          text: 'Part 1 — Personal questions about the environment',
          followUp: [
            'How concerned are you about environmental issues such as climate change?',
            'What do you do in your daily life to reduce your impact on the environment?',
            'Do you think individuals or governments bear more responsibility for protecting the environment?',
            'Has environmental awareness changed in your country in recent years?',
          ],
        },
        {
          type: 'speak', id: 'sp2', part: 10, partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a place in nature that you have visited and found particularly impressive or memorable.\n\nYou should say:\n• where the place is and how you got there\n• what the natural environment was like\n• what you did or saw there\n• and explain why this place had such an impact on you`,
        },
        {
          type: 'speak', id: 'sp3', part: 10, partNumber: 3,
          text: 'Part 3 — Discussion: Environment and sustainability',
          followUp: [
            'Do you think economic development and environmental protection can coexist? How?',
            'What role should international organisations play in addressing global environmental problems?',
            'Are there any environmental policies in your country that you think are particularly effective or ineffective?',
            'How might climate change affect daily life in your country in the next 30 years?',
          ],
        },
      ],
    },
  ],
};

export default mock;
