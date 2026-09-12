import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-18',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 18',
  subtitle: 'Genetic Engineering · Smart Cities · Language Acquisition',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-18.mp3',
      title: 'Listening — Section 1: Joining a Book Club',
      instructions: 'You will hear a telephone conversation between a woman and the organiser of a book club. Listen and answer Questions 1–10.',
      transcript: `ORGANISER: Hello, Riverside Book Club, this is Peter speaking.

CUSTOMER: Hi there. I'd like to join the book club, if there are still places available.

ORGANISER: There certainly are. Let me take a few details from you. What's your name?

CUSTOMER: It's Laura Hammond.

ORGANISER: Could you spell your surname for me?

CUSTOMER: Of course — it's H-A-M-M-O-N-D.

ORGANISER: Thank you, Laura. And where do you live?

CUSTOMER: I'm at 8 Chestnut Close.

ORGANISER: Chestnut Close, lovely. And a contact number?

CUSTOMER: My mobile is 077 2358 4190.

ORGANISER: Great. Can I ask how you heard about us?

CUSTOMER: I saw a poster in the local library, actually.

ORGANISER: Wonderful. Now, what kind of books do you most enjoy reading?

CUSTOMER: I mainly read historical fiction, though I do enjoy the occasional biography.

ORGANISER: We read a real mix — the members vote on the book each month. Now, which evenings tend to suit you? We meet fortnightly.

CUSTOMER: I was going to say Thursdays — actually, no, Wednesdays are better for me. I have a class on Thursdays.

ORGANISER: Wednesdays it is, then. And just so you know, we ask every new member to bring their favourite novel to their first meeting, so they can introduce themselves.

CUSTOMER: That's a lovely idea. And where do you actually meet?

ORGANISER: At the moment we meet in a room above the bookshop on the high street. There's plenty of parking nearby.

CUSTOMER: Perfect.

ORGANISER: Now let me explain the two membership options. Standard membership costs £25 a year. That includes two free books a year and a monthly newsletter with reviews and recommendations.

CUSTOMER: And the premium one?

ORGANISER: Premium membership is £45 a year. You get six free books a year instead of two, and premium members can also attend our free writing workshops.

CUSTOMER: The premium sounds well worth it. I'll take that one.

ORGANISER: Excellent. Welcome to the club, Laura.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Book Club Membership',
          example: 'Name:  Laura Hammond',
          template: `Address: 8 {{1}} Close
Phone: (mobile) 077 2358 4190

Member details
• Heard about the club from a poster in the local {{2}}
• Mainly enjoys reading {{3}} fiction
• Prefers meetings to be held on {{4}}, not Thursdays
• New members bring their favourite {{5}} to the first meeting
• The club meets in a room above the {{6}} on the high street`,
          blanks: [
            { num: 1, answers: ['Chestnut', 'chestnut'], maxWords: 1 },
            { num: 2, answers: ['library'], maxWords: 1 },
            { num: 3, answers: ['historical'], maxWords: 1 },
            { num: 4, answers: ['Wednesdays', 'Wednesday'], maxWords: 1 },
            { num: 5, answers: ['novel'], maxWords: 1 },
            { num: 6, answers: ['bookshop'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Membership', 'Annual fee', 'Free books per year', 'Extra benefit'],
          rows: [
            [
              'Standard',
              { num: 7, answers: ['25', '£25'], maxWords: 1 },
              '2 books',
              { num: 8, answers: ['newsletter'], maxWords: 1 },
            ],
            [
              'Premium',
              '£45',
              { num: 9, answers: ['six', '6'], maxWords: 1 },
              { num: 10, answers: ['workshops', 'workshop'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-18.mp3',
      title: 'Listening — Section 2: Nature Reserve Welcome Talk',
      instructions: 'You will hear a ranger giving a welcome talk to visitors at a nature reserve. Listen and answer Questions 11–20.',
      transcript: `Hello everyone, and welcome to Blackwater Nature Reserve. My name's Sam, and I'm one of the rangers here. I'll just spend a few minutes explaining how the reserve works and what you can see today.

First, a few important rules. We want everyone to enjoy the reserve, but there are a couple of things we don't allow. I'm afraid dogs are not permitted anywhere on the reserve, even on a lead, because they disturb the ground-nesting birds. And although the lake looks inviting, swimming is strictly forbidden — the water is much deeper and colder than it appears. You are very welcome to cycle, but only on the marked trails, not on the narrow footpaths. Photography is positively encouraged, and picnicking is fine in the designated area near the car park.

Now, let me tell you about the reserve itself. Blackwater covers around 200 hectares of wetland and forest. It was established in 1987, originally to protect a single rare species of dragonfly, but today it's home to more than a hundred kinds of bird. The most popular attraction is our bird hide, which overlooks the main lake. From there, in winter, you can often see large flocks of geese that migrate here from Scandinavia.

If you follow the blue trail, it takes you through the ancient woodland, where some of the oak trees are over four hundred years old. The red trail is longer and leads to the observation tower, which gives you a spectacular view across the whole reserve. Do allow about two hours if you want to complete it.

Our visitor centre, just behind me, has a small café and a shop selling maps and guidebooks. There's also an exhibition explaining how the wetland is managed. Entry to the reserve is free, but we rely on donations, so please give generously if you can. Finally, the reserve closes at dusk, so please make sure you've returned to the car park before the gates are locked. Enjoy your visit, and do come and find me if you have any questions.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO activities does the ranger say are not permitted in the reserve?',
          options: [
            { letter: 'A', text: 'cycling on the marked trails' },
            { letter: 'B', text: 'bringing dogs' },
            { letter: 'C', text: 'taking photographs' },
            { letter: 'D', text: 'picnicking near the car park' },
            { letter: 'E', text: 'swimming in the lake' },
          ],
          selectCount: 2,
          answers: ['B', 'E'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Blackwater Nature Reserve',
          template: `About the reserve

• The reserve covers around {{13}} hectares of wetland and forest.
• It was established in {{14}}.
• It was originally created to protect a rare species of {{15}}.

Things to see

• The most popular attraction is the bird {{16}}, overlooking the main lake.
• In winter, visitors can see flocks of {{17}} from Scandinavia.
• The blue trail passes through ancient {{18}}.
• The red trail leads to an observation {{19}}.

Practical information

• Entry is free, but the reserve relies on {{20}} from visitors.`,
          blanks: [
            { num: 13, answers: ['200'], maxWords: 2 },
            { num: 14, answers: ['1987'], maxWords: 2 },
            { num: 15, answers: ['dragonfly'], maxWords: 2 },
            { num: 16, answers: ['hide'], maxWords: 2 },
            { num: 17, answers: ['geese'], maxWords: 2 },
            { num: 18, answers: ['woodland'], maxWords: 2 },
            { num: 19, answers: ['tower'], maxWords: 2 },
            { num: 20, answers: ['donations', 'donation'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-18.mp3',
      title: 'Listening — Section 3: Linguistics Presentation Discussion',
      instructions: 'You will hear a tutor talking to two students about a linguistics presentation. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Right, Maya and Tom, let's talk about your linguistics presentation. Remind me what topic you've chosen.

MAYA: We're looking at why some languages become endangered, and what can be done to keep them alive. We were originally going to compare two languages, but we decided to focus on just one — a language called Manx, from the Isle of Man.

TUTOR: Interesting choice. Why Manx in particular?

TOM: Well, it's a fascinating case because the last native speaker died in the 1970s, but the language has since been revived. There are now children being brought up speaking it again, which is quite unusual.

TUTOR: It certainly is. So how have you organised your research?

MAYA: We started by reading academic articles, but honestly, the most useful material came from interviews with people involved in the revival. Talking to actual speakers gave us insights we couldn't get from books.

TUTOR: I agree — primary sources are invaluable. Now, what's your main argument going to be?

TOM: Our central point is that reviving a language depends less on money than on community enthusiasm. Funding helps, of course, but without a committed community, it simply doesn't work.

TUTOR: That's a strong, clear thesis. Is there anything you're finding difficult?

MAYA: The hardest part is keeping the presentation short enough. We've got so much material that we keep going over the time limit.

TUTOR: That's a common problem. Be ruthless — cut anything that doesn't support your main argument. Now, a few suggestions for improvement. First, I think you should include some audio, so the audience can actually hear what Manx sounds like. That will be far more powerful than just describing it.

TOM: Good idea.

TUTOR: Second, add a map showing where the language is spoken — people find geography helps them remember. And do check your pronunciation of the place names; get a native speaker to record them if you can. Finally, remember to rehearse the timing at least twice before the actual presentation.

MAYA: Thank you, that's really useful.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What change did the students make to their topic?',
          options: [
            'to compare three languages instead of two',
            'to focus on a single language rather than two',
            'to choose a language that is still widely spoken',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Why did the students choose Manx as their example?',
          options: [
            'It has more fluent speakers today than any other surviving Celtic language in Britain.',
            'Its last native speaker is still alive today.',
            'It has been revived after its last native speaker died.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'Which source of information did the students find most useful?',
          options: [
            'academic articles published by university researchers who had documented the revival from a distance',
            'interviews with people involved in the revival',
            'historical documents',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What is the main argument the students will make?',
          options: [
            'Language revival depends mainly on sustained government funding and formal legislation rather than local participation.',
            'Language revival depends more on community enthusiasm than on money.',
            'Language revival is impossible once native speakers have died.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What problem are the students currently having?',
          options: [
            'keeping the presentation within the time limit',
            'finding enough reliable research material to support each section of the presentation',
            'disagreeing about the main argument',
          ],
          answer: 0,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `Suggestions from the tutor

• Include some {{26}} so the audience can hear the language.
• Add a {{27}} showing where the language is spoken.
• Check the {{28}} of the place names.
• Ask a native speaker to {{29}} the place names.
• {{30}} the timing at least twice before presenting.`,
          blanks: [
            { num: 26, answers: ['audio'], maxWords: 1 },
            { num: 27, answers: ['map'], maxWords: 1 },
            { num: 28, answers: ['pronunciation'], maxWords: 1 },
            { num: 29, answers: ['record'], maxWords: 1 },
            { num: 30, answers: ['rehearse', 'practise', 'practice'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-18.mp3',
      title: 'Listening — Section 4: Desert Ecosystems',
      instructions: 'You will hear a lecture about desert ecosystems. Listen and answer Questions 31–40.',
      transcript: `Good morning. Today's lecture is about desert ecosystems — environments that many people imagine to be lifeless, but which are in fact home to a remarkable variety of specially adapted organisms.

First, let's define what we mean by a desert. A desert is usually defined as any region that receives less than 250 millimetres of rainfall a year. By this definition, deserts cover roughly one third of the Earth's land surface. And, surprisingly, not all deserts are hot — the largest desert in the world is actually Antarctica, which is classified as a desert because it is extremely dry.

The central challenge for any desert organism is a shortage of water. Plants have evolved several strategies to cope. Many, such as the cactus, store water in their thick stems and have leaves reduced to spines to limit evaporation. Others have extremely long roots that reach deep underground to find moisture. A third group survives underground and grows rapidly after the rare rains.

Animals face the same challenge and have their own adaptations. Many desert animals are nocturnal, meaning they are active only at night, when temperatures are cooler. The kangaroo rat is a striking example — it can survive its entire life without ever drinking, obtaining all the water it needs from the seeds it eats. Larger animals, such as the camel, can tolerate a significant loss of body water and can go for long periods without drinking at all.

Deserts are also fragile. Because plants grow so slowly, any damage takes a very long time to repair. One of the greatest threats is desertification — the process by which fertile land gradually turns into desert, usually as a result of human activities such as overgrazing by livestock. Climate change is expected to make many existing deserts even drier in the coming decades.

Yet deserts also offer opportunities. They receive intense sunshine, which makes them ideal locations for generating solar energy. And scientists study desert organisms in the hope of discovering compounds that could be used in medicine. Far from being empty wastelands, deserts are dynamic systems that deserve our protection.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'DESERT ECOSYSTEMS',
          template: `Defining a desert

• A desert receives less than 250 millimetres of {{31}} per year.
• Deserts cover roughly one {{32}} of the Earth's land surface.
• The largest desert in the world is {{33}}, because it is extremely dry.

Adaptations of desert plants

• A cactus stores water in its thick {{34}}.
• Some plants have very long {{35}} that reach moisture deep underground.

Adaptations of desert animals

• Many desert animals are {{36}} and are active only at night.
• The kangaroo rat gets all its water from the {{37}} that it eats.

Threats and opportunities

• Fertile land turning into desert is a process called {{38}}.
• This is often caused by overgrazing by {{39}}.
• Deserts are good places to generate {{40}} energy.`,
          blanks: [
            { num: 31, answers: ['rainfall', 'rain'], maxWords: 1 },
            { num: 32, answers: ['third'], maxWords: 1 },
            { num: 33, answers: ['Antarctica'], maxWords: 1 },
            { num: 34, answers: ['stems', 'stem'], maxWords: 1 },
            { num: 35, answers: ['roots', 'root'], maxWords: 1 },
            { num: 36, answers: ['nocturnal'], maxWords: 1 },
            { num: 37, answers: ['seeds', 'seed'], maxWords: 1 },
            { num: 38, answers: ['desertification'], maxWords: 1 },
            { num: 39, answers: ['livestock'], maxWords: 1 },
            { num: 40, answers: ['solar'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: Genetic Engineering and Its Applications',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Genetic Engineering and Its Applications

Genetic engineering—the direct manipulation of an organism's genome—now has applications in medicine, agriculture, and environmental research. Jennifer Doudna and Emmanuelle Charpentier reported a programmable CRISPR-Cas9 editing method in 2012, accelerating the field by making targeted DNA cutting easier and less costly than many earlier tools. Researchers subsequently adapted the system to cells and organisms far beyond the original bacterial context. Accuracy depends on guide design, delivery, cell type, and the repair outcome, so "precise" does not mean error-free or equally practical in every organism. Doudna and Charpentier received the Nobel Prize in Chemistry in 2020 for developing a method for genome editing.

CRISPR-Cas9 operates as a molecular scissors-and-guide system derived from bacterial immune defence. A guide RNA directs the Cas9 protein to a matching genomic sequence, where the enzyme cuts both strands of DNA. The cell's repair machinery may then disrupt the targeted gene, producing a gene knockout, or researchers may supply a template intended for gene insertion or correction. Repair is probabilistic: cells can acquire different small insertions or deletions, template-based correction may be inefficient, and cutting at sufficiently similar unintended sites is possible. Experiments therefore verify the edited sequence and assess off-target changes rather than assuming that every treated cell has the planned result.

In medicine, CRISPR has opened therapeutic possibilities for serious inherited disorders. In 2023, regulators in the United Kingdom and the United States authorised Casgevy, the first approved therapy to use CRISPR-Cas9; the US approval initially covered patients aged twelve or older with sickle cell disease and recurrent vaso-occlusive crises. The treatment edits a patient's blood-forming stem cells outside the body and returns them after conditioning treatment. Strong trial results justify the approval, but the procedure is intensive and long-term follow-up remains important. Researchers are also investigating edited immune cells for cancer, approaches to persistent viral infection, and in-vivo therapies delivered directly to particular tissues.

Agricultural genetic engineering predates CRISPR. Genetically modified crops containing introduced genes—such as Bt maize, which produces a bacterial insecticide—have been grown commercially since the 1990s. CRISPR can make small changes within an organism's own genome without leaving foreign DNA in the final plant, although it can also be used to insert sequences. This distinction has regulatory implications: some jurisdictions classify certain edited crops more leniently than transgenic crops, while others regulate according to technique or trait. Proposed and commercial applications include altered disease resistance, drought response, nutritional profiles, and shelf life; each trait still requires evidence about performance and unintended effects.

Environmental applications present both potential and ethical complexity. Gene drives bias inheritance so that a genetic trait can spread through a population more frequently than ordinary Mendelian inheritance would predict. CRISPR-based drives have been proposed to suppress malaria-carrying mosquitoes or make them less able to transmit pathogens; this is different from self-limiting modified mosquitoes already released in some programmes. By mid-2026, gene-drive organisms had been tested in laboratories and large cages, but no open-environment release had been reported. Proposed field studies follow staged risk assessment and community engagement. Critics emphasise ecological uncertainty, movement across borders, and the difficulty of controlling a self-propagating construct. Researchers are also designing localised, self-limiting, resistant, or reversal systems, but none guarantees that a construct can be recalled after release.

The governance of genetic engineering must distinguish laboratory research, edits to a patient's non-reproductive cells, environmental release, and heritable changes to embryos or reproductive cells. Benefits, risks, consent, and who can be affected differ sharply across those categories. International rules remain uneven, while experiments and medical travel can cross borders. In 2018, He Jiankui announced the birth of twins whose embryos had been edited in an attempt to alter susceptibility to HIV. The intervention lacked adequate oversight, offered disputed medical benefit, and created heritable changes with uncertain unintended effects. He was later imprisoned by Chinese authorities for illegal medical practice. The episode prompted stronger calls for registries, oversight, transparency, and international coordination. It also showed that governance requires enforceable responsibilities, routes for reporting unsafe work, and continuing review as capabilities change, rather than written principles alone.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: CRISPR-Cas9 was announced by Doudna and Charpentier in 2012 and earned them a Nobel Prize in 2020.\n2. {{2}}: The Cas9 protein was originally used by bacteria as a mechanism of immune defence.\n3. {{3}}: Clinical trials for CRISPR treatments of sickle cell disease have so far produced disappointing results.\n4. {{4}}: Some regulatory systems treat CRISPR-edited crops more leniently than traditional GM crops.\n5. {{5}}: Gene drives can spread a genetic trait through a wild population faster than natural inheritance.\n6. {{6}}: He Jiankui's gene-edited baby experiment was approved by all relevant international regulatory bodies.\n7. {{7}}: He Jiankui was subsequently imprisoned for conducting illegal medical practices.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['FALSE'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. In CRISPR-Cas9, a {{8}} RNA directs the Cas9 protein to the correct location in the genome.\n9. When repair disrupts a targeted gene, the result is called a gene {{9}}.\n10. The first CRISPR-based therapy received regulatory approval in 2023 for the treatment of {{10}} disease.\n11. Bt maize produces a {{11}} within the plant.\n12. Gene drives spread traits more frequently than ordinary {{12}} would predict.\n13. Researchers cannot guarantee that a self-propagating gene drive can be {{13}} after release.`,
          blanks: [
            { num: 8, answers: ['guide'] },
            { num: 9, answers: ['knockout'] },
            { num: 10, answers: ['sickle cell'] },
            { num: 11, answers: ['bacterial insecticide'] },
            { num: 12, answers: ['Mendelian inheritance'] },
            { num: 13, answers: ['recalled'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Smart Cities',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Smart Cities

A. The "smart city" has become a prominent idea in urban planning and technology policy. Broadly, it describes the use of sensors, connectivity, data analytics, and artificial intelligence to manage infrastructure and services, improve residents' quality of life, or reduce environmental impacts. Applications include adaptive traffic signals, energy and water monitoring, predictive maintenance, emergency systems, and platforms through which residents report faults or use council services. The label itself does not demonstrate that a project works: cities must define the public problem, compare digital and non-digital options, and measure outcomes rather than treating the installation of connected equipment as success.

B. Singapore launched its Smart Nation initiative in 2014 and is frequently cited as a leading example. Government programmes use sensor platforms, smart water meters, transport data, digital identity, and other shared infrastructure for public services and planning. Different systems have different operators and purposes; describing them as one all-seeing central platform would obscure that institutional detail. Camera analytics and face verification can offer convenience or support security, while also raising questions about necessity, access, retention, oversight, and civil liberties. The benefits therefore depend on governance around a technology as well as its technical capability.

C. European programmes often frame smart-city work through privacy, data governance, and citizen participation, although practice varies within every region. Barcelona's "Superblocks" programme is primarily an urban-design and mobility intervention rather than a sensor project; measurement can still help assess traffic, air quality, walking, cycling, and public-space use. Amsterdam publishes many public datasets and supports projects involving government, researchers, firms, and residents. Open data can support innovation and scrutiny, but privacy, security, licensing, and data quality mean that not every record collected by city infrastructure should or can be released.

D. The economic case for smart-city investment rests on efficiency, avoided failures, and improved service quality. Adaptive traffic systems may reduce delay and fuel use; predictive maintenance can identify equipment before it fails; energy management can expose waste. Yet a technical improvement does not automatically produce a net saving. Procurement, integration with old systems, staff training, cybersecurity, replacement cycles, and vendor fees all create costs, while extra road capacity or easier travel can induce new demand. Consultancies and technology suppliers publish large estimates of global benefits, but they may have a commercial interest in adoption. A credible business case should state the counterfactual, include operating costs, measure distributional effects, and compare the project with simpler alternatives.

E. Cybersecurity is a significant risk. Smart infrastructure depends on networked systems whose interconnection creates attack surfaces for malicious actors and pathways for failures to spread. A 2018 ransomware attack disrupted Atlanta government functions, and Baltimore suffered a major ransomware incident the following year. These municipal attacks did not prove that every connected physical system was compromised, but they demonstrated the operational and recovery costs of losing access to data and services. Traffic management, water treatment, and energy distribution require stronger protection because interference could affect physical safety. Segmentation, access control, tested backups, software maintenance, incident exercises, and manual fallback procedures are therefore part of service design rather than optional additions.

F. Privacy and surveillance concerns are equally significant. Sensor networks, facial recognition, and analytics raise questions about what data is collected, who can access it, how long it is retained, and whether people can contest an error. China's social credit system is often inaccurately described as one national score assigned to every citizen from social media and CCTV. Research instead describes a fragmented collection of financial records, regulatory systems, sectoral lists, court-judgment enforcement, and some local pilots. Certain blacklists can still produce serious restrictions, including limits on particular forms of travel, so correcting the popular account does not remove concerns about due process or state power. Democratic cities also face function creep—the use of data for purposes beyond those originally stated.

G. The future of smart cities will be shaped by governance, values, procurement, and the distribution of benefits. Sensors and analytics in a city with weak institutions or deep inequality may do little to address those conditions and could exacerbate them. Digital-only services can exclude residents without affordable devices, connectivity, accessible design, identification, or confidence using online systems. Long contracts may also lock a city into one vendor or make public scrutiny difficult. Researchers therefore argue that the most important questions are political: who selects the problem, whose data is used and on what terms, who can challenge an automated decision, and who receives the efficiencies created? Public participation and independent evaluation can expose trade-offs before a pilot becomes permanent infrastructure.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A warning that smart city technology cannot compensate for weak governance or deep inequality', answer: 'G' },
            { num: 15, stem: 'An example of a city that publishes many public datasets', answer: 'C' },
            { num: 16, stem: 'A description of municipal government functions disrupted by a ransomware cyberattack', answer: 'E' },
            { num: 17, stem: 'An explanation of how smart city economic projections may be influenced by commercial interests', answer: 'D' },
            { num: 18, stem: 'A correction to the claim that China assigns every citizen one national social credit score', answer: 'F' },
            { num: 19, stem: 'An overview of the broad definition of what a smart city is', answer: 'A' },
            { num: 20, stem: 'A description of Singapore\'s shared digital and sensor infrastructure', answer: 'B' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' },
            { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' },
            { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' },
            { letter: 'F', text: 'Paragraph F' },
            { letter: 'G', text: 'Paragraph G' },
          ],
        },
        {
          type: 'formgroup',
          id: 'r2-sum',
          part: 6,
          qRange: [21, 26],
          groupLabel: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          title: 'Smart Cities: Technology, Risks, and Governance',
          template: `A smart city uses digital technologies including sensors, AI, and {{21}} to improve urban management. Singapore is frequently cited as a leading example, using shared digital systems and {{22}} for public services and planning. European programmes often frame their work through data {{23}} and citizen participation, although practice varies. A key risk is {{24}}, since interconnected digital systems can be targeted by ransomware and other attacks. The use of data beyond its originally stated purpose is known as {{25}} and is a concern in democratic societies too. Researchers argue that the most important smart city questions are {{26}}.`,
          blanks: [
            { num: 21, answers: ['data analytics'] },
            { num: 22, answers: ['sensor platforms'] },
            { num: 23, answers: ['governance'] },
            { num: 24, answers: ['cybersecurity'] },
            { num: 25, answers: ['function creep'] },
            { num: 26, answers: ['political'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: How Children Acquire Language',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `How Children Acquire Language

Human language combines sound or sign, vocabulary, morphology, syntax, meaning, and social use. During childhood, learners acquire much of this complex system through participation and exposure rather than formal grammar lessons. The process can look effortless from outside, but it requires years of attention, practice, interaction, and revision, and its pace varies among children and languages. Spoken language is also only one route: children exposed to accessible sign languages acquire structured natural languages through the visual-manual channel.

One longstanding debate contrasts nativist accounts with usage-based, statistical-learning, and social-interactionist accounts. Nativist theories associated with Noam Chomsky propose an innate biological endowment for language, historically described through terms such as a language acquisition device or universal grammar. The argument from the "poverty of the stimulus" holds that children's input lacks enough direct evidence to explain some grammatical generalisations without language-specific constraints. That is a theoretical argument whose premises and examples are debated, rather than a neutral observation accepted by the whole field. All sides recognise biological capacities and experience; they disagree about which learning biases are language-specific and how much structure the input supplies.

Usage-based and social-interactionist researchers, including Elizabeth Bates and Brian MacWhinney, emphasise statistical patterns in input, general learning, communicative intention, and repeated use. Child-directed speech often contains repetition, altered pitch, short utterances, or cues that may help learners segment words and track meaning, but who addresses children and how often varies across communities. Other children and overheard conversation can also be important sources. Computational models show that some grammatical patterns can be learned from distributional evidence without explicitly encoding a traditional universal grammar. Yet model architecture supplies its own biases, training data may greatly exceed a child's experience, and success on a benchmark does not establish that a network and a child learn by the same mechanism.

Developmental studies identify broad patterns alongside substantial variation. Infants begin tuning perception to frequently heard sound contrasts during the first year, and sensitivity to some unfamiliar contrasts may decline as native categories become more efficient. Many children produce recognisable words around the end of the first year. Vocabulary growth may accelerate between eighteen and twenty-four months, a pattern often called a "vocabulary explosion", but the timing and abruptness are not universal. Gesture, comprehension, production, the structure of the language, and the quantity and quality of interaction all affect what a milestone measure captures. Population ranges are therefore more informative than treating one birthday as a pass-or-fail deadline.

Social interaction is central to many accounts. Michael Tomasello argues that joint attention—the ability to share attention to an object or event and interpret another person's communicative intention—supports word learning and cultural learning. Behaviours such as following gaze, pointing, and checking another person's response emerge gradually during the first year and continue developing. They help narrow the possible referent of a new word, but a single gaze episode does not determine meaning: children integrate repeated situations, grammar, prior knowledge, and feedback. Conversational turns also give a learner a chance to act, receive a contingent response, and repair misunderstanding. This responsiveness differs from merely hearing many words, which is why researchers measure the social organisation as well as the quantity of input.

Multilingual children may acquire languages simultaneously or add one after another. Exposure to multiple languages does not itself cause a language disorder, and code-switching is commonly systematic rather than evidence of confusion. Knowledge can be distributed across languages, so testing only one can underestimate a child's concepts and total communicative resources. Progress in each language depends partly on opportunities to hear and use it. Some studies associate bilingual experience with advantages on particular executive-function tasks, while meta-analyses disagree about the size, consistency, and causes of these effects. Socioeconomic conditions, migration history, proficiency, task choice, and publication bias can influence the comparison.

Language research informs early literacy, additional-language teaching, and support for communication disorders. Developmental language disorder is a persistent difficulty learning, understanding, or using language that is not explained by conditions such as hearing loss or insufficient exposure; the US NIDCD estimates that it affects about one in fourteen kindergarten children. It can affect multilingual and monolingual children and may persist into adulthood. Assessment should examine all languages and distinguish a disorder from normal multilingual development. Timely, targeted intervention can help build skills and participation, although outcomes vary and no single programme suits every child.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What is the main evidence Chomsky and nativists use to support the idea of an innate language capacity?',
          options: [
            'Children learn grammar faster when parents use simplified speech, explicitly correct every error, and teach formal grammatical rules.',
            'The language input children receive is too limited to explain the grammatical knowledge they develop.',
            'Children from different cultures acquire language at very different rates.',
            'Computational models have failed to reproduce human grammatical knowledge.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What do empiricist accounts of language acquisition emphasise?',
          options: [
            'The role of a language-specific brain module in enabling rapid grammar learning.',
            'The importance of formal schooling in developing complex grammatical knowledge.',
            'General learning mechanisms operating on statistical patterns in the language children hear.',
            'The universality of grammatical structures across all human languages.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What role does the passage assign to joint attention in language acquisition?',
          options: [
            'Humans possess an innate universal grammar that other primates lack.',
            'It helps children track another person’s attention and communicative intention when learning words.',
            'The unique ability of human children to imitate sounds with great precision.',
            'The larger brain size of humans, which enables a greater memory for vocabulary.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does the passage say about code-switching in multilingual children?',
          options: [
            'It is evidence of confusion caused by learning two languages simultaneously.',
            'It is commonly systematic rather than evidence that exposure to multiple languages caused confusion.',
            'It always leads to long-term deficits in both languages.',
            'It is unique to children who learn two languages sequentially and does not occur among simultaneous bilinguals.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Nativist theories of language acquisition are currently accepted by all leading researchers in the field.\n32. {{32}}: Child-directed speech can contain repetition and other cues that may help children identify words and meanings.\n33. {{33}}: Infants become better at distinguishing every unfamiliar sound contrast as they grow older.\n34. {{34}}: An acceleration in vocabulary growth is often described between eighteen and twenty-four months, although it is not universal.\n35. {{35}}: Bilingual children consistently show stronger academic performance than monolingual children.\n36. {{36}}: Developmental language disorder affects about one in fourteen kindergarten children and can persist into adulthood.`,
          blanks: [
            { num: 31, answers: ['NO'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NO'] },
            { num: 34, answers: ['YES'] },
            { num: 35, answers: ['NOT GIVEN'] },
            { num: 36, answers: ['YES'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r3-sent',
          part: 7,
          qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Chomsky's proposed innate biological capacity for language is sometimes called {{37}} grammar.\n38. The simplified speech that caregivers direct at young children is referred to as {{38}} speech.\n39. The ability to share attention to an object or event with another person is called {{39}} attention.\n40. A persistent difficulty with language development affecting around seven percent of children is known as developmental {{40}} disorder.`,
          blanks: [
            { num: 37, answers: ['universal'] },
            { num: 38, answers: ['child-directed'] },
            { num: 39, answers: ['joint'] },
            { num: 40, answers: ['language'] },
          ],
        },
      ],
    },

    {
      part: 8,
      skill: 'writing',
      title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [
        {
          type: 'write',
          id: 'w1',
          part: 8,
          taskNumber: 1,
          imageUrl: '/assets/ielts/charts/set18-task1.svg',
          imageAlt: 'Process diagram showing the stages of plastic recycling from collection to new products',
          stimulus: 'The diagram below shows the stages involved in the recycling of plastic waste, from initial collection through to the manufacture of new products.',
          text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
          minWords: 150,
        },
      ],
    },

    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [
        {
          type: 'write',
          id: 'w2',
          part: 9,
          taskNumber: 2,
          stimulus: 'Genetic technologies such as CRISPR gene editing offer the potential to cure inherited diseases, but also raise ethical concerns about how these technologies might be used in the future.',
          text: 'Do the potential benefits of genetic engineering outweigh the risks? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
          minWords: 250,
        },
      ],
    },

    {
      part: 10,
      skill: 'speaking',
      title: 'Speaking',
      instructions: 'Answer the following questions. Part 1 is a short conversation; Part 2 is a 1–2 minute monologue; Part 3 is a discussion.',
      questions: [
        {
          type: 'speak',
          id: 'sp1',
          part: 10,
          partNumber: 1,
          text: 'Part 1 — Personal questions about languages and communication',
          followUp: [
            'How many languages do you speak, and how did you learn them?',
            'Do you think it is important to speak more than one language? Why?',
            'Have you ever experienced difficulties communicating with someone because of a language barrier?',
            'Do you think technology like translation apps will ever replace the need to learn foreign languages?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe an invention or piece of technology that has changed your life significantly.\n\nYou should say:\n• what the invention or technology is\n• how you use it in your daily life\n• how life would be different without it\n• and explain why you consider it so important`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Technology, science, and ethics',
          followUp: [
            'Should there be international limits on how genetic technologies can be used?',
            'Do you think smart city surveillance is an acceptable trade-off for improved safety and efficiency?',
            'Who should have the right to make decisions about new and potentially dangerous technologies?',
            'How can societies ensure that the benefits of scientific advances are shared fairly?',
          ],
        },
      ],
    },
  ],
};

export default mock;
