import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 1',
  subtitle: 'Bakelite · What\'s so funny? · Scientific English',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      title: 'Listening — Section 1: Car Tours',
      instructions: 'You will hear a conversation between a tourist and a car tour booking agent. Listen and answer Questions 1–10.',
      transcript: `AGENT: Good morning, Island Car Tours. How can I help you?

CUSTOMER: Oh, hello. I saw your advert in the local paper, and I'm interested in booking one of your self-drive tours of the area.

AGENT: Certainly. Can I take your name?

CUSTOMER: Yes, it's Andrea Brown.

AGENT: Thank you, Ms Brown. And can I take your address?

CUSTOMER: 24 Poppyfield Road.

AGENT: Is that Poppyfield — P-O-P-P-Y-F-I-E-L-D?

CUSTOMER: That's right.

AGENT: And your postcode?

CUSTOMER: BH5 2OP.

AGENT: OK. And a phone number?

CUSTOMER: My mobile is 077 8664 3091.

AGENT: Thank you. Can I ask how you heard about us?

CUSTOMER: I found you on the internet, actually. I was searching for car hire in the area.

AGENT: Great. Now, we have two self-drive tours currently available. Would you like me to describe them?

CUSTOMER: Yes please. I'm travelling with my two children.

AGENT: Trip One takes twelve days and covers Los Angeles, Yosemite Park and the coast. In LA, many families like to visit the national parks with children — there's a lot to do.

CUSTOMER: That sounds good. We'd definitely want to do that.

AGENT: And in Yosemite, would you want to stay in a lodge or would you be happy camping?

CUSTOMER: Oh, definitely a lodge. We wouldn't want to sleep in a tent.

AGENT: Noted. Trip Two is nine days and goes along the coast to Cambria via Santa Monica and San Diego.

CUSTOMER: I remember reading about Cambria. What's the route like?

AGENT: You'd get to see the wildlife on the way there — it's really spectacular. And at Santa Monica there's a lot of shopping, if that interests you.

CUSTOMER: Not particularly, no.

AGENT: That's fine. And at San Diego, most visitors spend time on the beach — it's beautiful.

CUSTOMER: That does sound lovely.

AGENT: Now let me give you some details on pricing. Trip One: twelve days, 1,260 kilometres, £525 per person. That includes accommodation and car hire, and also one meal per day.

CUSTOMER: And Trip Two?

AGENT: Nine days, 980 kilometres, £685 per person. That includes accommodation, car hire, and a map of the area.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Car Tours in the USA',
          example: 'Name:  Andrea Brown',
          template: `Address: 24 {{1}} Road
Postcode: BH5 2OP
Phone: (mobile) 077 8664 3091

Heard about company from: {{2}}

Possible self-drive tours
Trip One:
• Los Angeles: customer wants to visit some {{3}} parks with her children
• Yosemite Park: customer wants to stay in a lodge, not a {{4}}

Trip Two:
• Customer wants to see the {{5}} on the way to Cambria
• At Santa Monica: not interested in shopping
• At San Diego, wants to spend time on the {{6}}`,
          blanks: [
            { num: 1, answers: ['Poppyfield', 'poppyfield'], maxWords: 1 },
            { num: 2, answers: ['internet', 'Internet', 'web', 'website'], maxWords: 1 },
            { num: 3, answers: ['national'], maxWords: 1 },
            { num: 4, answers: ['tent'], maxWords: 1 },
            { num: 5, answers: ['wildlife'], maxWords: 1 },
            { num: 6, answers: ['beach'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Trip', 'Number of days', 'Total distance', 'Price per person', 'Includes'],
          rows: [
            [
              'Trip One',
              '12 days',
              { num: 7, answers: ['1260', '1,260'], maxWords: 1 },
              '£525',
              { num: 8, answers: ['meal', 'meals'], maxWords: 1 },
            ],
            [
              'Trip Two',
              '9 days',
              '980 km',
              { num: 9, answers: ['685', '£685'], maxWords: 1 },
              { num: 10, answers: ['map'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      title: 'Listening — Section 2: Westfield Leisure Club',
      instructions: 'You will hear a talk about joining a leisure club. Listen and answer Questions 11–20.',
      transcript: `Good morning everyone, and welcome to Westfield Leisure Club's open day. I'm delighted to see so many of you here. As you know, we've been making some significant improvements to the club recently, and I'd like to tell you a little about those, as well as explaining what membership involves.

First of all, our recent improvements. Over the past year, we've renovated our gym, which now has the very latest equipment. We also replaced the old outdoor pool with a brand-new heated pool — it's much larger than the previous one and very popular already. The indoor pool remains open throughout the winter, as always. We've also added a new children's activity area, though our sports training for children hasn't changed — we're still offering the same excellent programmes. And the running and cycling tracks are exactly as they were.

Now, regarding membership itself. When you join, every new member has a personal assessment with one of our trainers. During this session, you'll be asked to describe any medical conditions you have — it's very important that our staff know about these before you start exercising. The trainer will then explain the safety procedures you'll need to follow when using the equipment. After that, you'll be given a six-week programme tailored specifically for you.

In terms of the types of membership we offer: all members pay a compulsory £90 registration fee when they join. We have three levels. Silver membership gives you access to the main facilities. Gold membership, in addition to everything Silver offers, gives you free access to all the LP clubs in the country — there are over 50 of those. And our Premier membership gives you priority booking during peak hours. Premier members are also able to bring two guests every month at no extra charge. All members, whatever their level, should always carry their membership card with them at all times — you'll need it to access the facilities.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO facilities at the leisure club have recently been improved?',
          options: [
            { letter: 'A', text: 'the gym' },
            { letter: 'B', text: 'the tracks' },
            { letter: 'C', text: 'the indoor pool' },
            { letter: 'D', text: 'the outdoor pool' },
            { letter: 'E', text: 'the sports training for children' },
          ],
          selectCount: 2,
          answers: ['A', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS for each answer.',
          title: 'Joining the leisure club',
          template: `Personal Assessment

• New members should describe any {{13}}.
• The {{14}} will be explained to you before you use the equipment.
• You will be given a six-week {{15}}.

Types of membership

• There is a compulsory £90 {{16}} fee for members.
• Gold members are given {{17}} to all the LP clubs.
• Premier members are given priority during {{18}} hours.
• Premier members can bring some {{19}} every month.
• Members should always take their {{20}} with them.`,
          blanks: [
            { num: 13, answers: ['medical conditions', 'conditions'], maxWords: 2 },
            { num: 14, answers: ['safety procedures', 'procedures'], maxWords: 2 },
            { num: 15, answers: ['programme', 'program', 'schedule'], maxWords: 1 },
            { num: 16, answers: ['registration'], maxWords: 1 },
            { num: 17, answers: ['free access', 'access'], maxWords: 2 },
            { num: 18, answers: ['peak'], maxWords: 1 },
            { num: 19, answers: ['guests', 'guest', 'friends'], maxWords: 1 },
            { num: 20, answers: ['membership card', 'card'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      title: 'Listening — Section 3: Global Design Competition',
      instructions: 'You will hear two students discussing a design competition entry. Listen and answer Questions 21–30.',
      transcript: `PROFESSOR: Come in, John. Sit down. I've been looking at your design competition entry — the FreshTrack dishwasher.

JOHN: Yes, I'm quite pleased with how it's come together.

PROFESSOR: It's very creative. Now, just to confirm — the competition brief was to develop a new use for current technology, wasn't it?

JOHN: That's right. You could adapt an existing appliance, or design something energy-efficient, but I decided to take existing technology and find a new application for it.

PROFESSOR: And why a dishwasher specifically?

JOHN: Well, dishwashers are pretty common in most homes now, but people don't think of them as particularly stylish. I wanted to make them more appealing — give them a design aesthetic they haven't had before.

PROFESSOR: Right. Tell me about the 'Rockpool' design. There's a stone involved?

JOHN: Yes — the stone is actually used to switch it on. You place the stone in a special depression on the front, and that activates the machine. It's meant to give it an organic feel.

PROFESSOR: Interesting. And the cleaning process uses carbon dioxide?

JOHN: Yes. In the holding chamber, the carbon dioxide changes back from a liquid state into a gas, and it's that gas which does the cleaning — it gets into all the tiny spaces.

PROFESSOR: And at the end of the process?

JOHN: The carbon dioxide is collected and stored, ready to be re-used in the next cycle. There's no waste.

PROFESSOR: Very good. Now, what stage are you at? Do you need help with anything?

JOHN: I'm struggling a bit with the presentation, actually. I've never done one like this before.

PROFESSOR: I'd strongly suggest making a model of the design. A physical model always impresses the judges and helps you explain the technology.

JOHN: That makes sense. My biggest practical problem has been sourcing the materials — I need really high-quality carbon dioxide, and it's been difficult to find a supplier.

PROFESSOR: You should apply for a grant. The university has funding available for exactly this kind of project.

JOHN: I didn't know that. That would be a great help.

PROFESSOR: One more thing — I'll need to check over the technical information in your written report before you submit. Make sure you send it to me in good time.

JOHN: Of course. Thank you very much.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'Students entering the design competition have to',
          options: [
            'produce an energy-efficient design',
            'adapt an existing energy-saving appliance',
            'develop a new use for current technology',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'John chose a dishwasher because he wanted to make dishwashers',
          options: [
            'more appealing',
            'more common',
            'more economical',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'The stone in John\'s \'Rockpool\' design is used',
          options: [
            'for decoration',
            'to switch it on',
            'to stop water escaping',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'In the holding chamber, the carbon dioxide',
          options: [
            'changes back to a gas',
            'dries the dishes',
            'is allowed to cool',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'At the end of the cleaning process, the carbon dioxide',
          options: [
            'is released into the air',
            'is disposed of with the waste',
            'is collected ready to be re-used',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• John needs help preparing for his {{26}}.
• The professor advises John to make a {{27}} of his design.
• John's main problem is getting good quality {{28}}.
• The professor suggests John apply for a {{29}}.
• The professor will check the {{30}} information in John's written report.`,
          blanks: [
            { num: 26, answers: ['presentation'], maxWords: 1 },
            { num: 27, answers: ['model'], maxWords: 1 },
            { num: 28, answers: ['materials', 'material'], maxWords: 1 },
            { num: 29, answers: ['grant'], maxWords: 1 },
            { num: 30, answers: ['technical'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      title: 'Listening — Section 4: The Spirit Bear',
      instructions: 'You will hear a lecture about the Spirit Bear. Listen and answer Questions 31–40.',
      transcript: `Today I want to talk about a remarkable animal — the Spirit Bear, or Kermode Bear, which lives in the coastal rainforests of British Columbia in Canada.

The Spirit Bear is a white-coated black bear. Unlike albino animals, its white colour comes from an uncommon gene — a double recessive gene — that occurs only in black bears in this particular region. It's quite a rare sight.

The bear holds special significance for the local indigenous peoples, who believe that it has unusual powers. Some groups tell of the bear's ability to heal the sick, and others describe it as a spirit that bridges the human and natural worlds. Because of this sacred status, local communities have traditionally protected the bear from hunters, which has helped maintain its population over the centuries.

The bear's relationship with the forest is complex and fascinating. In autumn, the bears feed heavily on salmon from the coastal rivers. As they drag fish from the water and carry them into the forest to eat, nutrients from the salmon are deposited across a wide area. This feeding behaviour actually provides nutrients for the forest vegetation, effectively fertilising the trees. The bears also rely on the trees in another way — the roots of the forest trees prevent erosion along the salmon streams, which helps keep the river banks stable for the bears to fish.

The Spirit Bear is currently found on a small number of islands and in certain mainland areas, but its habitat is shrinking. Deforestation is a serious problem, as is the construction of roads by logging companies, which fragments the habitat and disturbs wildlife. The salmon supply — which the bears depend on entirely — is also being reduced by unrestricted fishing in coastal waters.

Perhaps the most serious long-term threat is the bears' low rate of reproduction. They breed slowly, and their populations can take a long time to recover from any decline.

But there is hope. Interested parties — including the government, conservation groups, and local communities — are working together on a plan. Logging companies are being required to improve their methods of logging so as to reduce habitat damage. And there are ongoing programmes for the maintenance and expansion of the Spirit Bears' protected territory.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE SPIRIT BEAR',
          template: `General facts

• It is a white bear belonging to the black bear family.
• Its colour comes from an uncommon {{31}}.
• Local people believe that it has unusual {{32}}.
• They protect the bear from {{33}}.

Habitat

• The bear's relationship with the forest is complex.
• Tree roots prevent {{34}} along salmon streams.
• The bears' feeding habits provide nutrients for forest vegetation.
• It is currently found on a small number of {{35}}.

Threats

• Habitat is being lost due to deforestation and construction of {{36}} by logging companies.
• Unrestricted {{37}} is affecting the salmon supply.
• The bears' existence is also threatened by their low rate of {{38}}.

Going forward

• Interested parties are working together.
• Logging companies must improve their {{39}} of logging.
• Maintenance and {{40}} of the spirit bears' territory is needed.`,
          blanks: [
            { num: 31, answers: ['gene'], maxWords: 1 },
            { num: 32, answers: ['powers'], maxWords: 1 },
            { num: 33, answers: ['hunters'], maxWords: 1 },
            { num: 34, answers: ['erosion'], maxWords: 1 },
            { num: 35, answers: ['islands'], maxWords: 1 },
            { num: 36, answers: ['roads'], maxWords: 1 },
            { num: 37, answers: ['fishing'], maxWords: 1 },
            { num: 38, answers: ['reproduction'], maxWords: 1 },
            { num: 39, answers: ['methods'], maxWords: 1 },
            { num: 40, answers: ['expansion'], maxWords: 1 },
          ],
        },
      ],
    },

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading Passage 1: Bakelite',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `In 1907, Leo Hendrick Baekeland, a Belgian scientist working in New York, discovered and patented a revolutionary new synthetic material. His invention, which he named 'Bakelite', was of enormous technological importance, and effectively launched the modern plastics industry.

The term 'plastic' comes from the Greek plassein, meaning 'to mould'. Some plastics are derived from natural sources, some are semi-synthetic (the result of chemical action on a natural substance), and some are entirely synthetic, that is, chemically engineered from the constituents of coal or oil. Some are 'thermoplastic', which means that, like candlewax, they melt when heated and can then be reshaped. Others are 'thermosetting': like eggs, they cannot revert to their original viscous state, and their shape is thus fixed forever. Bakelite had the distinction of being the first totally synthetic thermosetting plastic.

The history of today's plastics begins with the discovery of a series of semi-synthetic thermoplastic materials in the mid-nineteenth century. The impetus behind the development of these early plastics was generated by a number of factors — immense technological progress in the domain of chemistry, coupled with wider cultural changes, and the pragmatic need to find acceptable substitutes for dwindling supplies of 'luxury' materials such as tortoiseshell and ivory.

Baekeland's interest in plastics began in 1885 when, as a young chemistry student in Belgium, he embarked on research into phenolic resins, the group of sticky substances produced when phenol (carbolic acid) combines with an aldehyde (a volatile fluid similar to alcohol). He soon abandoned the subject, however, only returning to it some years later. By 1905 he was a wealthy New Yorker, having recently made his fortune with the invention of a new photographic paper.

While Baekeland had been busily amassing dollars, some advances had been made in the development of plastics. The years 1899 and 1900 had seen the patenting of the first semi-synthetic thermosetting material that could be manufactured on an industrial scale. In purely scientific terms, Baekeland's major contribution to the field is not so much the actual discovery of the material to which he gave his name, but rather the method by which a reaction between phenol and formaldehyde could be controlled, thus making possible its preparation on a commercial basis. On 13 July 1907, Baekeland took out his famous patent describing this preparation, the essential features of which are still in use today.

The original patent outlined a three-stage process, in which phenol and formaldehyde (from wood or coal) were initially combined under vacuum inside a large egg-shaped kettle. The result was a resin known as Novalak, which became soluble and malleable when heated. The resin was allowed to cool in shallow trays until it hardened, and then broken up and ground into powder.

Other substances were then introduced: including fillers, such as woodflour, asbestos or cotton, which increase strength and moisture resistance, catalysts (substances to speed up the reaction between two chemicals without joining to either) and hexa, a compound of ammonia and formaldehyde which supplied the additional formaldehyde necessary to form a thermosetting resin. This resin was then left to cool and harden, and ground up a second time. The resulting granular powder was raw Bakelite, ready to be made into a vast range of manufactured objects.

In the last stage, the heated Bakelite was poured into a hollow mould of the required shape and subjected to extreme heat and pressure; thereby 'setting' its form for life.

The design of Bakelite objects, everything from earrings to television sets, was governed to a large extent by the technical requirements of the moulding process. The object could not be designed so that it was locked into the mould and therefore difficult to extract. A common general rule was that objects should taper towards the deepest part of the mould, and if necessary the product was moulded in separate pieces.

Moulds had to be carefully designed so that the molten Bakelite would flow evenly and completely into the mould. Sharp corners proved impractical and were thus avoided, giving rise to the smooth, 'streamlined' style popular in the 1930s. The thickness of the walls of the mould was also crucial: thick walls took longer to cool and harden, a factor which had to be considered by the designer in order to make the most efficient use of machines.

Baekeland's invention, although treated with disdain in its early years, went on to enjoy an unparalleled popularity which lasted throughout the first half of the twentieth century. It became the wonder product of the new world of industrial expansion — 'the material of a thousand uses'. Being both non-porous and heat-resistant, Bakelite kitchen goods were promoted as being germ-free and sterilisable. Electrical manufacturers seized on its insulating properties, and consumers everywhere relished its dazzling array of shades.

It then fell from favour again during the 1950s, and was despised and destroyed in vast quantities. Recently, however, it has been experiencing something of a renaissance, with renewed demand for original Bakelite objects in the collectors' marketplace, and museums, societies and dedicated individuals once again appreciating the style and originality of this innovative material.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-summary',
          part: 5,
          qRange: [1, 3],
          groupLabel: 'Complete the summary.\nChoose ONE WORD ONLY from the passage for each answer.',
          template: `Some plastics behave in a similar way to {{1}} in that they melt under heat and can be moulded into new forms.

Bakelite was unique because it was the first material to be both entirely {{2}} in origin and thermosetting.

There were several reasons for the research into plastics in the nineteenth century, among them the great advances that had been made in the field of {{3}} and the search for alternatives to natural resources like ivory.`,
          blanks: [
            { num: 1, answers: ['candlewax'], maxWords: 1 },
            { num: 2, answers: ['synthetic'], maxWords: 1 },
            { num: 3, answers: ['chemistry'], maxWords: 1 },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-flowchart',
          part: 5,
          qRange: [4, 8],
          imageUrl: '/ielts/images/reading-set-1-bakelite-flowchart.png',
          imageAlt: 'Flow-chart: The Production of Bakelite',
          groupLabel: 'Complete the flow-chart.\nChoose ONE WORD ONLY from the passage for each answer.\n\nThe Production of Bakelite',
          template: `Phenol and formaldehyde combined under {{4}} in a kettle

The resin (Novalak) was allowed to {{5}} in shallow trays until hardened, then ground into powder

Other substances added, including {{6}} (e.g. woodflour, cotton) and catalysts

Resin left to cool and {{7}}, then ground up a second time

Resulting {{8}} powder = raw Bakelite`,
          blanks: [
            { num: 4, answers: ['vacuum'], maxWords: 1 },
            { num: 5, answers: ['cool'], maxWords: 1 },
            { num: 6, answers: ['fillers'], maxWords: 1 },
            { num: 7, answers: ['harden'], maxWords: 1 },
            { num: 8, answers: ['granular'], maxWords: 1 },
          ],
        },
        {
          type: 'multiselect',
          id: 'r1-multi',
          part: 5,
          qRange: [9, 10],
          text: 'Which TWO of the following factors influencing the design of Bakelite objects are mentioned in the text?',
          options: [
            { letter: 'A', text: 'the function which the object would serve' },
            { letter: 'B', text: 'the ease with which the resin could fill the mould' },
            { letter: 'C', text: 'the facility with which the object could be removed from the mould' },
            { letter: 'D', text: 'the limitations of the materials used to manufacture the mould' },
            { letter: 'E', text: 'the fashionable styles of the period' },
          ],
          selectCount: 2,
          answers: ['C', 'E'],
        },
        {
          type: 'mcq',
          id: 'r1q11',
          part: 5,
          text: 'Modern-day plastic preparation is based on the same principles as that patented in 1907.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r1q12',
          part: 5,
          text: 'Bakelite was immediately welcomed as a practical and versatile material.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q13',
          part: 5,
          text: 'Bakelite was only available in a limited range of colours.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 2,
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading Passage 2: What\'s so funny?',
      instructions: 'Read the passage and answer Questions 14–27.',
      passage: `John McCrone reviews recent research on humour

The joke comes over the headphones: 'Which side of a dog has the most hair? The left.' No, not funny. Try again. 'Which side of a dog has the most hair? The outside.' Hah! The punchline is silly yet fitting, tempting a smile, even a laugh. Laughter has always struck people as deeply mysterious, perhaps pointless. The writer Arthur Koestler dubbed it the luxury reflex: 'unique in that it serves no apparent biological purpose'.

Theories about humour have an ancient pedigree. Plato expressed the idea that humour is simply a delighted feeling of superiority over others. Kant and Freud felt that joke-telling relies on building up a psychic tension which is safely punctured by the ludicrousness of the punchline. But most modern humour theorists have settled on some version of Aristotle's belief that jokes are based on a reaction to or resolution of incongruity, when the punchline is either a nonsense or, though appearing silly, has a clever second meaning.

Graeme Ritchie, a computational linguist in Edinburgh, studies the linguistic structure of jokes in order to understand not only humour but language understanding and reasoning in machines. He says that while there is no single format for jokes, many revolve around a sudden and surprising conceptual shift. A comedian will present a situation followed by an unexpected interpretation that is also apt.

So even if a punchline sounds silly, the listener can see there is a clever semantic fit and that sudden mental 'Aha!' is the buzz that makes us laugh. Viewed from this angle, humour is just a form of creative insight, a sudden leap to a new perspective.

However, there is another type of laughter, the laughter of social appeasement and it is important to understand this too. Play is a crucial part of development in most young mammals. Rats produce ultrasonic squeaks to prevent their scuffles turning nasty. Chimpanzees have a 'play-face' — a gaping expression accompanied by a panting 'ah, ah' noise. In humans, these signals have mutated into smiles and laughs. Researchers believe social situations, rather than cognitive events such as jokes, trigger these instinctual markers of play or appeasement.

Both social and cognitive types of laughter tap into the same expressive machinery in our brains, the emotion and motor circuits that produce smiles and excited vocalisations. However, if cognitive laughter is the product of more general thought processes, it should result from more expansive brain activity.

Psychologist Vinod Goel investigated humour using the new technique of 'single event' functional magnetic resonance imaging (FMRI). An MRI scanner uses magnetic fields and radio waves to track the changes in oxygenated blood that accompany mental activity. Until recently, MRI scanners needed several minutes of activity and so could not be used to track rapid thought processes such as comprehending a joke. New developments now allow half-second 'snapshots' of all sorts of reasoning and problem-solving activities.

Although Goel felt being inside a brain scanner was hardly the ideal place for appreciating a joke, he found evidence that understanding a joke involves a widespread mental shift. His scans showed that at the beginning of a joke the listener's prefrontal cortex lit up, particularly the right prefrontal believed to be critical for problem solving. But there was also activity in the temporal lobes at the side of the head (consistent with attempts to rouse stored knowledge) and in many other brain areas. Then when the punchline arrived, a new area sprang to life — the orbital prefrontal cortex. This patch of brain tucked behind the orbits of the eyes is associated with evaluating information.

Making a rapid emotional assessment of the events of the moment is an extremely demanding job for the brain, animal or human. Energy and arousal levels may need to be retuned in the blink of an eye. These abrupt changes will produce either positive or negative feelings. The orbital cortex, the region that becomes active in Goel's experiment, seems the best candidate for the site that feeds such feelings into higher-level thought processes, with its close connections to the brain's sub-cortical arousal apparatus and centres of metabolic control.

All warm-blooded animals make constant tiny adjustments in arousal in response to external events, but humans, who have developed a much more complicated internal life as a result of language, respond emotionally not only to their surroundings, but to their own thoughts. Whenever a sought-for answer snaps into place, there is a shudder of pleased recognition. Creative discovery being pleasurable, humans have learned to find ways of milking this natural response. The fact that jokes tap into our general evaluative machinery explains why the line between funny and disgusting, or funny and frightening, can be so fine. Whether a joke gives pleasure or pain depends on a person's outlook.

Humour may be a luxury, but the mechanism behind it is no evolutionary accident. As Peter Derks, a psychologist at William and Mary College in Virginia, says: 'I like to think of humour as the distorted mirror of the mind. It's creative, perceptual, analytical and lingual. If we can figure out how the mind processes humour, then we'll have a pretty good handle on how it works in general.'`,
      questions: [
        {
          type: 'mcq',
          id: 'r2q14',
          part: 6,
          text: 'Arthur Koestler considered laughter biologically important in several ways.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q15',
          part: 6,
          text: 'Plato believed humour to be a sign of above-average intelligence.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q16',
          part: 6,
          text: 'Kant believed that a successful joke involves the controlled release of nervous energy.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r2q17',
          part: 6,
          text: 'Current thinking on humour has largely ignored Aristotle\'s view on the subject.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q18',
          part: 6,
          text: 'Graeme Ritchie\'s work links jokes to artificial intelligence.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r2q19',
          part: 6,
          text: 'Most comedians use personal situations as a source of humour.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r2q20',
          part: 6,
          text: 'Chimpanzees make particular noises when they are playing.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'formgroup',
          id: 'r2-diagram',
          part: 6,
          qRange: [21, 23],
          imageUrl: '/ielts/images/reading-set-1-brain-diagram.png',
          imageAlt: 'Diagram: Brain areas activated by jokes',
          groupLabel: 'The diagram below shows the areas of the brain activated by jokes.\nLabel the diagram. Choose NO MORE THAN TWO WORDS from the passage for each answer.\n\nBrain areas activated by jokes:',
          template: `Area active at start of joke (problem solving): {{21}}
Area active during retrieval of stored knowledge: {{22}}
Area active when punchline arrives (evaluating information): {{23}}`,
          blanks: [
            { num: 21, answers: ['right prefrontal', 'prefrontal cortex', 'right prefrontal cortex'], maxWords: 3 },
            { num: 22, answers: ['temporal lobes', 'temporal lobe'], maxWords: 2 },
            { num: 23, answers: ['orbital prefrontal', 'orbital prefrontal cortex', 'orbital cortex'], maxWords: 3 },
          ],
        },
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [24, 27],
          groupLabel: 'Complete each sentence with the correct ending A–G below.\nWrite the correct letter, A–G, next to questions 24–27.',
          items: [
            { num: 24, stem: 'One of the brain\'s most difficult tasks is to', answer: 'C' },
            { num: 25, stem: 'Because of the language they have developed, humans', answer: 'A' },
            { num: 26, stem: 'Individual responses to humour', answer: 'F' },
            { num: 27, stem: 'Peter Derks believes that humour', answer: 'D' },
          ],
          endings: [
            { letter: 'A', text: 'react to their own thoughts.' },
            { letter: 'B', text: 'helped create language in humans.' },
            { letter: 'C', text: 'respond instantly to whatever is happening.' },
            { letter: 'D', text: 'may provide valuable information about the operation of the brain.' },
            { letter: 'E', text: 'cope with difficult situations.' },
            { letter: 'F', text: 'relate to a person\'s subjective views.' },
            { letter: 'G', text: 'led our ancestors to smile and then laugh.' },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading Passage 3: The Birth of Scientific English',
      instructions: 'Read the passage and answer Questions 28–40.',
      passage: `World science is dominated today by a small number of languages, including Japanese, German and French, but it is English which is probably the most popular global language of science. This is not just because of the importance of English-speaking countries such as the USA in scientific research; the scientists of many non-English-speaking countries find that they need to write their research papers in English to reach a wide international audience. Given the prominence of scientific English today, it may seem surprising that no one really knew how to write science in English before the 17th century. Before that, Latin was regarded as the lingua franca for European intellectuals.

The European Renaissance (circa 14th-16th century) is sometimes called the 'revival of learning', a time of renewed interest in the 'lost knowledge' of classical times. At the same time, however, scholars also began to test and extend this knowledge. The emergent nation states of Europe developed competitive interests in world exploration and the development of trade. Such expansion, which was to take the English language west to America and east to India, was supported by scientific developments such as the discovery of magnetism (and hence the invention of the compass), improvements in cartography and — perhaps the most important scientific revolution of them all — the new theories of astronomy and the movement of the Earth in relation to the planets and stars, developed by Copernicus (1473-1543).

England was one of the first countries where scientists adopted and publicised Copernican ideas with enthusiasm. Some of these scholars, including two with interests in language — John Wilkins and John Wallis — helped found the Royal Society in 1660 in order to promote empirical scientific research.

Across Europe similar academies and societies arose, creating new national traditions of science. In the initial stages of the scientific revolution, most publications in the national languages were popular works, encyclopaedias, educational textbooks and translations. Original science was not done in English until the second half of the 17th century. For example, Newton published his mathematical treatise, known as the Principia, in Latin, but published his later work on the properties of light — Optics — in English.

There were several reasons why original science continued to be written in Latin. The first was simply a matter of audience. Latin was suitable for an international audience of scholars, whereas English reached a socially wider, but more local, audience. Hence, popular science was written in English.

A second reason for writing in Latin may, perversely, have been a concern for secrecy. Open publication had dangers in putting into the public domain preliminary ideas which had not yet been fully exploited by their 'author'. This growing concern about intellectual property rights was a feature of the period — it reflected both the humanist notion of the individual, rational scientist who invents and discovers through private intellectual labour, and the growing connection between original science and commercial exploitation.

There was something of a social distinction between 'scholars and gentlemen' who understood Latin, and men of trade who lacked a classical education. And in the mid-17th century it was common practice for mathematicians to keep their discoveries and proofs secret, by writing them in cipher, in obscure languages, or in private messages deposited in a sealed box with the Royal Society. Some scientists might have felt more comfortable with Latin precisely because its audience, though international, was socially restricted. Doctors clung the most keenly to Latin as an 'insider language'.

A third reason why the writing of original science in English was delayed may have been to do with the linguistic inadequacy of English in the early modern period. English was not well equipped to deal with scientific argument. First, it lacked the necessary technical vocabulary. Second, it lacked the grammatical resources required to represent the world in an objective and impersonal way, and to discuss the relations, such as cause and effect, that might hold between complex and hypothetical entities.

Fortunately, several members of the Royal Society possessed an interest in language and became engaged in various linguistic projects. Although a proposal in 1664 to establish a committee for improving the English language came to little, the society's members did a great deal to foster the publication of science in English and to encourage the development of a suitable writing style. Many members of the Royal Society also published monographs in English. One of the first was by Robert Hooke, the society's first curator of experiments, who described his experiments with microscopes in Micrographia (1665). This work is largely narrative in style, based on a transcript of oral demonstrations and lectures.

In 1665 a new scientific journal, Philosophical Transactions, was inaugurated. Perhaps the first international English-language scientific journal, it encouraged a new genre of scientific writing, that of short, focused accounts of particular experiments.

The 17th century was thus a formative period in the establishment of scientific English. In the following century much of this momentum was lost as German established itself as the leading European language of science. It is estimated that by the end of the 18th century 401 German scientific journals had been established as opposed to 96 in France and 50 in England. However, in the 19th century scientific English again enjoyed substantial lexical growth as the industrial revolution created the need for new technical vocabulary, and new, specialised, professional societies were instituted to promote and publish in the new disciplines.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r3-summary',
          part: 7,
          qRange: [28, 34],
          groupLabel: 'Complete the summary.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `In Europe modern science emerged at the same time as the nation state. At first, the scientific language of choice remained {{28}}.

It allowed scientists to communicate with other socially privileged thinkers while protecting their work from unwanted exploitation.

Sometimes the desire to protect ideas seems to have been stronger than the desire to communicate them, particularly in the case of mathematicians and {{29}}.

In Britain, moreover, scientists worried that English had neither the {{30}} nor the {{31}} to express their ideas.

This situation only changed after 1660 when scientists associated with the {{32}} set about developing English.

Although English was then overtaken by {{33}}, it developed again in the 19th century as a direct result of the {{34}}.`,
          blanks: [
            { num: 28, answers: ['Latin'], maxWords: 1 },
            { num: 29, answers: ['doctors'], maxWords: 1 },
            { num: 30, answers: ['technical vocabulary', 'vocabulary'], maxWords: 2 },
            { num: 31, answers: ['grammatical resources', 'grammatical'], maxWords: 2 },
            { num: 32, answers: ['Royal Society'], maxWords: 2 },
            { num: 33, answers: ['German'], maxWords: 1 },
            { num: 34, answers: ['industrial revolution'], maxWords: 2 },
          ],
        },
        {
          type: 'mcq',
          id: 'r3q35',
          part: 7,
          text: 'There was strong competition between scientists in Renaissance Europe.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3q36',
          part: 7,
          text: 'The most important scientific development of the Renaissance period was the discovery of magnetism.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q37',
          part: 7,
          text: 'In 17th century Britain, leading thinkers combined their interest in science with an interest in how to express ideas.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'tablegroup',
          id: 'r3-table',
          part: 7,
          qRange: [38, 40],
          groupLabel: 'Complete the table.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          headers: ['', 'Latin', 'English'],
          rows: [
            ['Type of science', 'Original', { num: 38, answers: ['popular'], maxWords: 1 }],
            ['Examples', 'Treatises (e.g. Principia)', { num: 39, answers: ['encyclopaedias', 'Encyclopaedias', 'educational textbooks'], maxWords: 2 }],
            ['Target audience', 'International scholars', { num: 40, answers: ['local'], maxWords: 1 }],
          ],
        },
      ],
    },

    // ─── WRITING ─────────────────────────────────────────────────────────────

    {
      part: 8,
      skill: 'writing',
      title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task.',
      questions: [
        {
          type: 'write',
          id: 'w1',
          part: 8,
          taskNumber: 1,
          stimulusLabel: 'The bar chart below shows the hours per week that teenagers spend doing certain activities in Chester from 2002 to 2007.',
          stimulus: '',
          imageUrl: '/ielts/images/writing-set1-task1-chester.png',
          imageAlt: 'Bar chart: hours per week teenagers in Chester spent on activities 2002–2007',
          text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.',
          minWords: 150,
        },
      ],
    },

    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task.',
      questions: [
        {
          type: 'write',
          id: 'w2',
          part: 9,
          taskNumber: 2,
          stimulus: 'In some countries, many more people are choosing to live alone nowadays than in the past. Do you think this is a positive or negative development?',
          text: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
        },
      ],
    },

    // ─── SPEAKING ────────────────────────────────────────────────────────────

    {
      part: 10,
      skill: 'speaking',
      title: 'Speaking',
      instructions: 'The Speaking test consists of three parts. Prepare and respond to each prompt as clearly as possible.',
      questions: [
        {
          type: 'speak',
          id: 'sp1',
          part: 10,
          partNumber: 1,
          text: 'Part 1 — Personal questions (4–5 minutes). Answer the following questions about yourself.',
          followUp: [
            'Do you work or are you a student?',
            'What do you enjoy most about your work/studies?',
            'Where do you come from? What do you like about your hometown?',
            'Do you enjoy cooking? Why / why not?',
            'What kind of food do you usually eat?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn (3–4 minutes). Read the cue card and prepare for 1 minute, then speak for 1–2 minutes.',
          cueCard: `Describe a time when you visited a friend or family member at their workplace.

You should say:
  - who you visited and where they work
  - why you visited them there
  - what you did during your visit

and explain how you felt about the experience.`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Two-way discussion (4–5 minutes). Discuss the following questions.',
          followUp: [
            'What kinds of jobs do young people find most attractive, and why?',
            'How important is it for people to do work that they enjoy?',
            'Do you think job satisfaction or salary is more important? Why?',
            'How might the world of work change in the future?',
            'Is it good for people to change jobs frequently, or is it better to stay in the same job?',
          ],
        },
      ],
    },

  ],
};

export default mock;
