import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-13',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 13',
  subtitle: 'Human Migration · Quantum Computing · The Placebo Effect',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-13.mp3',
      title: 'Listening — Section 1: Signing up for a gym',
      instructions: 'You will hear a conversation between a gym receptionist and a new customer. Listen and answer Questions 1–10.',
      transcript: `STAFF: Good afternoon, and welcome to Riverside Gym. How can I help you today?

CUSTOMER: Hello. I'd like to sign up for a membership, please.

STAFF: Wonderful. Let me take a few details. Can I start with your name?

CUSTOMER: Yes, it's Diana Dalton.

STAFF: Could you spell your surname for me?

CUSTOMER: Of course — it's D-A-L-T-O-N.

STAFF: Thank you, Diana. And the best contact number for you?

CUSTOMER: My mobile is 077 3352 9041.

STAFF: Let me read that back to be sure — 077 3352 9041. Lovely. And your home address?

CUSTOMER: I live at 14 Hazelwood Street.

STAFF: Great. Now, it helps us if we know your main fitness goal. What are you hoping to achieve?

CUSTOMER: Well, at first I thought about weight loss, but what I really want is to improve my stamina.

STAFF: Perfect — we can build a programme around that. And how did you hear about us?

CUSTOMER: A friend recommended you, actually.

STAFF: That's always nice to hear. Is there anything our trainers should know — any injuries, for example?

CUSTOMER: Just my knee. I hurt it last year, so nothing too high-impact.

STAFF: Noted — we'll keep your sessions gentle on the knee. And when would you like to begin?

CUSTOMER: Could I start on Monday?

STAFF: Monday's fine. Now let me tell you about our two membership plans. The Standard plan runs on a 12-month contract at £29 a month, and it includes free use of the sauna.

CUSTOMER: And the other one?

STAFF: The Premium plan is more flexible — it's a shorter, 6-month contract, but it costs £45 a month. With Premium you also get a free towel service and two guest passes every month.

CUSTOMER: I think the Premium plan sounds better for me.

STAFF: A great choice. I'll get the paperwork ready for you now.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Riverside Gym — Membership Application',
          example: 'Enquiry:  gym membership',
          template: `Name: Diana {{1}}
Telephone (mobile): 077 3352 9041
Home address: 14 {{2}} Street

Main fitness goal: to improve {{3}}
Heard about gym from: a {{4}}
Existing injury: problem with one {{5}}
Preferred start day: {{6}}`,
          blanks: [
            { num: 1, answers: ['Dalton', 'dalton'], maxWords: 1 },
            { num: 2, answers: ['Hazelwood', 'hazelwood'], maxWords: 1 },
            { num: 3, answers: ['stamina'], maxWords: 1 },
            { num: 4, answers: ['friend'], maxWords: 1 },
            { num: 5, answers: ['knee'], maxWords: 1 },
            { num: 6, answers: ['Monday', 'monday'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Plan', 'Contract length (months)', 'Monthly fee', 'Extra included'],
          rows: [
            [
              'Standard',
              { num: 7, answers: ['12'], maxWords: 1 },
              '£29',
              { num: 8, answers: ['sauna'], maxWords: 1 },
            ],
            [
              'Premium',
              '6',
              { num: 9, answers: ['45', '£45'], maxWords: 1 },
              { num: 10, answers: ['towel'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-13.mp3',
      title: 'Listening — Section 2: Airport orientation announcement',
      instructions: 'You will hear an orientation announcement for passengers at an airport. Listen and answer Questions 11–20.',
      transcript: `Good morning, passengers, and welcome to Kingsford International Airport. My name is Rachel, and I'm one of the terminal's passenger-service officers. Before you continue to the departure gates, I'd like to take a few minutes to explain the facilities and procedures here in the new Terminal Three.

Let me start with what is available free of charge. Throughout the terminal you'll find high-speed wireless internet, which is completely free and needs no password. We also run a free shuttle bus between the terminal and the long-stay car park, leaving every ten minutes from Exit B. Please note that our luggage trolleys now require a two-pound refundable deposit, the shower rooms in the lounge cost eight pounds, and left-luggage storage is charged by the hour — so those three are not free.

Now, some important information about check-in. The check-in desks for international flights are on level two, and they open exactly three hours before departure. If you're travelling with hand luggage only, you can skip the desks entirely and go straight to security. At security, remember to take any liquids out of your bag — each container must hold no more than 100 millilitres, and all of them must fit inside a single clear plastic bag.

Once you're through, you'll enter the departure lounge. Boarding information is shown on the large screens, but please don't rely on hearing your name, as we no longer call passengers individually. Your gate number appears roughly 40 minutes before boarding. If you have time, the duty-free shops are on your left, and a quiet rest area with reclining seats is on the upper floor, right next to the pharmacy.

Finally, a word about connections. If you're transferring to another flight, follow the purple signs to the transfer desk, where staff will reprint your boarding pass. Passengers with less than one hour between flights should speak to a member of staff at once. Thank you, and enjoy your journey.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO services does the announcement say are free of charge?',
          options: [
            { letter: 'A', text: 'the wireless internet' },
            { letter: 'B', text: 'the luggage trolleys' },
            { letter: 'C', text: 'the shower rooms' },
            { letter: 'D', text: 'the shuttle bus' },
            { letter: 'E', text: 'the left-luggage storage' },
          ],
          selectCount: 2,
          answers: ['A', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Terminal Three — passenger information',
          template: `Check-in and security

• Check-in desks for international flights are on level {{13}}.
• The desks open {{14}} before departure.
• Passengers with hand luggage only can go straight to {{15}}.
• Each liquid container must hold no more than {{16}}.
• All liquids must fit inside a single clear {{17}} bag.

In the departure lounge

• Your gate number appears about {{18}} before boarding.
• A quiet rest area is on the upper floor, next to the {{19}}.
• Transferring passengers should follow the {{20}} signs to the transfer desk.`,
          blanks: [
            { num: 13, answers: ['two', '2'], maxWords: 1 },
            { num: 14, answers: ['three hours', '3 hours'], maxWords: 2 },
            { num: 15, answers: ['security'], maxWords: 1 },
            { num: 16, answers: ['100 millilitres', '100 ml', '100ml'], maxWords: 2 },
            { num: 17, answers: ['plastic'], maxWords: 1 },
            { num: 18, answers: ['40 minutes', 'forty minutes'], maxWords: 2 },
            { num: 19, answers: ['pharmacy'], maxWords: 1 },
            { num: 20, answers: ['purple'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-13.mp3',
      title: 'Listening — Section 3: Tourism dissertation discussion',
      instructions: 'You will hear a tutor and a student discussing the student\'s tourism dissertation. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Hi Maya, come in. So, let's talk about your tourism dissertation. Remind me of your main focus.

MAYA: Well, originally I wanted to look at the economic impact of tourism, but after doing the reading I decided to focus on how local residents feel about tourism in their town — their attitudes, really.

TUTOR: Good — residents' attitudes is a rich area. And why did you choose Whitby as your case study?

MAYA: Partly because it's beautiful, but mainly because visitor numbers there have grown so fast in the last five years. That rapid growth makes the tensions much easier to see.

TUTOR: That makes sense. So how are you collecting your data?

MAYA: I did think about interviews, but in the end I'm mainly using a questionnaire, because I wanted responses from a large number of people.

TUTOR: A survey is sensible for that. Did you run into any difficulties?

MAYA: The biggest problem was the response rate — a lot of people simply didn't return the form. In the end I only got about a hundred and twenty completed questionnaires.

TUTOR: That's still a workable sample. What did the results show?

MAYA: The clearest finding was that attitudes depend a lot on age. Younger residents were far more positive, while older ones worried about noise and crowding.

TUTOR: Interesting. Now, one suggestion — have you thought about comparing your town with a second location?

MAYA: I hadn't, but that's a good idea.

TUTOR: A comparison would really strengthen the analysis. I'd also make sure your literature review covers the idea of 'carrying capacity' — it's central to this debate. And when you write up, keep your methodology chapter detailed, so the whole study could be repeated by someone else.

MAYA: Right. And should I include the raw data?

TUTOR: Put the full questionnaire in an appendix, and just summarise the key figures in the main text. Oh, and do get the whole thing proofread before you submit — small errors cost marks.

MAYA: Great, that's really helpful. Thank you.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'The main focus of Maya\'s dissertation is',
          options: [
            'the economic impact of tourism',
            'the environmental impact of tourism',
            'residents\' attitudes to tourism',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Maya chose Whitby as her case study mainly because',
          options: [
            'it is a very beautiful place',
            'its visitor numbers have grown rapidly',
            'it is easy for her to travel to',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'To collect her data, Maya is mainly using',
          options: [
            'face-to-face interviews',
            'a questionnaire',
            'official statistics',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'The main difficulty Maya had was',
          options: [
            'the low response rate',
            'the cost of the survey',
            'finding a suitable case study',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'The tutor suggests that Maya should',
          options: [
            'reduce the size of her sample',
            'compare her town with a second location',
            'change her research topic',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• The literature review should cover the idea of {{26}} capacity.
• The methodology chapter must be detailed enough for the study to be {{27}}.
• The full questionnaire should be placed in an {{28}}.
• Only the key {{29}} should be summarised in the main text.
• Maya should get the dissertation {{30}} before submitting it.`,
          blanks: [
            { num: 26, answers: ['carrying'], maxWords: 1 },
            { num: 27, answers: ['repeated'], maxWords: 1 },
            { num: 28, answers: ['appendix'], maxWords: 1 },
            { num: 29, answers: ['figures', 'figure'], maxWords: 1 },
            { num: 30, answers: ['proofread'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-13.mp3',
      title: 'Listening — Section 4: Antarctic research',
      instructions: 'You will hear a lecture about scientific research in Antarctica. Listen and answer Questions 31–40.',
      transcript: `Good morning. Today's lecture is about scientific research in Antarctica, the coldest, windiest and driest continent on Earth. Although it has no permanent human population, at any one time during the summer season around 5,000 scientists and support staff live and work there.

Let me begin with why Antarctica matters to science. First, it is the finest place on the planet to study the history of our climate. Deep in the ice sheet, layers of compressed snow have trapped tiny bubbles of ancient air. By drilling out long cylinders of ice, called cores, researchers can measure the make-up of the atmosphere going back almost a million years. This makes the ice a unique climate archive.

Antarctica is also central to studying the oceans. The cold, dense water that forms around the continent sinks and drives the global system of ocean currents, a process that helps to regulate temperatures worldwide. And the surrounding Southern Ocean is extraordinarily rich in a small, shrimp-like creature called krill, which sits at the very base of the food chain.

The continent is important for space science too. The thin, dry, stable air makes it an excellent site for telescopes, and the deep ice is even used to detect particles arriving from distant galaxies. Meteorites are also far easier to find here, because dark rocks stand out so clearly against the white surface.

Of course, working in Antarctica is difficult. The extreme cold is an obvious hazard, but the biggest practical problem for researchers is often the isolation, especially through the long, dark winter. Supplies must arrive before the sea freezes, and once winter begins, no aircraft can land.

Finally, a word about protection. Since 1959, the continent has been governed by an international treaty that sets the whole area aside for peaceful, scientific use. Scientists today are particularly worried about the stability of the ice, because its melting would raise global sea levels dramatically. Continued monitoring, therefore, remains absolutely essential.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'SCIENTIFIC RESEARCH IN ANTARCTICA',
          template: `General facts

• Antarctica has no permanent population.
• In summer, about 5,000 {{31}} and support staff work there.

Studying the climate and oceans

• Ancient bubbles of {{32}} are trapped in the ice.
• Cylinders of ice drilled out by researchers are called {{33}}.
• The ice works as a unique climate {{34}}.
• Cold, dense water drives the global system of ocean {{35}}.
• The Southern Ocean is rich in {{36}}, at the base of the food chain.

Space science and challenges

• The stable air makes Antarctica a good site for {{37}}.
• {{38}} are easy to find because they stand out against the ice.
• The biggest practical problem for researchers is the {{39}}.
• Melting ice would raise global sea {{40}}.`,
          blanks: [
            { num: 31, answers: ['scientists', 'scientist'], maxWords: 1 },
            { num: 32, answers: ['air'], maxWords: 1 },
            { num: 33, answers: ['cores', 'core'], maxWords: 1 },
            { num: 34, answers: ['archive'], maxWords: 1 },
            { num: 35, answers: ['currents', 'current'], maxWords: 1 },
            { num: 36, answers: ['krill'], maxWords: 1 },
            { num: 37, answers: ['telescopes', 'telescope'], maxWords: 1 },
            { num: 38, answers: ['meteorites', 'meteorite'], maxWords: 1 },
            { num: 39, answers: ['isolation'], maxWords: 1 },
            { num: 40, answers: ['levels', 'level'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Patterns of Human Migration',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Patterns of Human Migration

Migration—the movement of people from one place to another—is among the most powerful forces shaping human societies. It is also one of the most ancient: Homo sapiens emerged in Africa approximately three hundred thousand years ago and, over tens of thousands of years, dispersed across every continent except Antarctica. The story of modern migration is continuous with this prehistoric movement, driven by the same fundamental forces: the search for safety, sustenance, and opportunity.

Contemporary migration takes many forms. Labour migration refers to the movement of workers, often from lower-income to higher-income countries, in search of better employment opportunities. This flow is substantial: the International Organisation for Migration estimated in 2022 that there were approximately 281 million international migrants worldwide, representing about 3.6 percent of the global population. Remittances—money sent home by migrants—totalled over $800 billion in the same year, far exceeding official development aid and constituting a vital economic lifeline for many lower-income nations.

Forced migration, by contrast, involves movement driven by persecution, conflict, or environmental disaster rather than economic calculation. The United Nations High Commissioner for Refugees reported that by the end of 2023, over 117 million people were forcibly displaced—the highest figure ever recorded. Of these, approximately 37 million were classified as refugees, meaning they had crossed an international border; the remainder were internally displaced within their own countries. The largest numbers of refugees originated from Syria, Afghanistan, and Ukraine, with the Ukrainian crisis following Russia's 2022 invasion producing one of the fastest displacement events in modern history.

Environmental migration—displacement caused by climate change, sea-level rise, and extreme weather events—is an increasingly significant category that existing international legal frameworks were not designed to address. People displaced by environmental factors do not qualify as refugees under the 1951 Refugee Convention, which was drafted at a time when climate displacement was not foreseen. This legal gap has left many environmental migrants in a precarious position, lacking the protections accorded to conflict refugees.

The social and economic effects of migration on receiving countries are complex and contested. Research consistently shows that, in aggregate, migration tends to increase the economic output of receiving countries: migrants fill labour shortages, bring skills and entrepreneurship, and contribute to fiscal revenues through taxation. A 2020 study by the National Bureau of Economic Research in the United States found that immigrants had founded more than forty percent of Fortune 500 companies and accounted for a disproportionately high share of patents and innovation. However, these aggregate benefits can mask significant distributional effects: while employers and consumers generally gain, workers in direct competition with migrants for jobs may face wage pressure.

Public attitudes toward migration often diverge sharply from the economic evidence. Research on perception finds that people in many countries consistently overestimate the number of migrants in their society—sometimes by a factor of three or four—and attribute to migrants higher rates of criminality and welfare dependency than empirical data support. These misperceptions have political consequences, fuelling support for restrictive immigration policies that may not align with national economic interests. Understanding and communicating the evidence on migration more effectively remains one of the significant challenges for both researchers and policymakers.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Homo sapiens originated in Africa and eventually spread to every continent including Antarctica.\n2. {{2}}: In 2022, remittances sent by migrants exceeded the total value of official development aid.\n3. {{3}}: By the end of 2023, more than half of all forcibly displaced people had crossed an international border.\n4. {{4}}: People displaced by climate change are fully protected under the 1951 Refugee Convention.\n5. {{5}}: Research shows that migrants have founded a large proportion of major US companies.\n6. {{6}}: Workers competing directly with migrants for jobs always experience wage increases.\n7. {{7}}: Studies show that many people overestimate the number of migrants living in their country.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['FALSE'] },
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
          template: `8. Money sent back to their home countries by migrants is known as {{8}}.\n9. People who are displaced within their own national borders are referred to as {{9}} displaced persons.\n10. The legal framework for refugee protection, the 1951 Refugee Convention, did not anticipate {{10}} displacement.\n11. A 2020 study found that immigrants accounted for a disproportionately large share of {{11}} and innovation in the United States.\n12. Public attitudes toward migration are often shaped by {{12}}, such as overestimating the number of migrants.\n13. The failure to communicate evidence on migration effectively remains a challenge for both researchers and {{13}}.`,
          blanks: [
            { num: 8, answers: ['remittances'] },
            { num: 9, answers: ['internally'] },
            { num: 10, answers: ['environmental', 'climate'] },
            { num: 11, answers: ['patents'] },
            { num: 12, answers: ['misperceptions'] },
            { num: 13, answers: ['policymakers'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Quantum Computing — Promise and Reality',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Quantum Computing — Promise and Reality

A. Classical computers—the devices that underpin virtually every aspect of modern life—process information as sequences of bits: units that represent either a zero or a one. Quantum computers operate on fundamentally different principles. They use quantum bits, or qubits, which exploit the quantum mechanical properties of superposition and entanglement to process information in ways that are impossible for classical machines. A qubit can exist as a zero, a one, or any combination of both simultaneously—a state that collapses into a definite value only when measured. This property allows quantum computers to explore multiple computational pathways at once, offering in principle an exponential advantage over classical systems for certain categories of problem.

B. The theoretical foundations of quantum computing were laid in the 1980s, primarily by the physicist Richard Feynman, who proposed that a computer built on quantum mechanical principles could simulate quantum physical systems far more efficiently than any classical machine. The mathematician Peter Shor subsequently developed an algorithm in 1994 that would allow a sufficiently powerful quantum computer to factorise large integers exponentially faster than the best known classical algorithms—a result with profound implications for cryptography, since most internet encryption relies on the computational difficulty of this task.

C. Building a practical quantum computer has proved enormously challenging. Qubits are extraordinarily sensitive to their environment: any interaction with external factors—heat, electromagnetic radiation, even vibration—causes decoherence, a process in which the quantum state collapses prematurely. Maintaining qubits in a coherent state requires cooling them to temperatures near absolute zero, isolating them from all external interference, and correcting errors that arise continuously during computation. The engineering challenges involved have kept practical quantum computing elusive for decades.

D. In recent years, the technology has advanced significantly. Google claimed in 2019 to have achieved "quantum supremacy"—demonstrating that its 53-qubit Sycamore processor had solved a specific problem in 200 seconds that would have taken the world's most powerful classical supercomputer approximately 10,000 years. IBM disputed the claim, arguing the task could be completed by a classical machine in 2.5 days with different techniques. The episode illustrated both the genuine progress being made and the difficulty of making fair comparisons between quantum and classical systems.

E. The most promising near-term applications of quantum computing lie in areas where the advantage over classical computers is most pronounced. Quantum simulation could revolutionise drug discovery by modelling the behaviour of molecules at quantum scales—something that is computationally intractable for classical systems at any useful level of precision. Optimisation problems—finding the best solution among an enormous number of possibilities—appear in logistics, finance, and materials science, and quantum algorithms may offer meaningful speed-ups in these areas. Quantum cryptography, which uses quantum mechanical principles to create theoretically unbreakable communication channels, is already in limited commercial use.

F. The timeline for commercially viable, general-purpose quantum computing remains deeply uncertain. Most experts believe that "fault-tolerant" quantum computing—the point at which a machine can run any algorithm reliably without errors overwhelming the computation—remains at least a decade away. Current machines, often described as NISQ (Noisy Intermediate-Scale Quantum) devices, are too error-prone to outperform classical computers at most real-world tasks. Investment in the field, however, is accelerating: governments, technology companies, and venture capital have collectively committed hundreds of billions of dollars to quantum computing research and development.

G. The social implications of a fully capable quantum computer would be profound. Shor's algorithm, if run at scale, would render most existing public-key cryptography obsolete, threatening the security of global financial systems, government communications, and personal data. Anticipating this risk, cryptographers have been developing "post-quantum cryptography"—encryption schemes designed to resist attack by quantum computers. The US National Institute of Standards and Technology published its first post-quantum cryptographic standards in 2024, an important step in preparing global digital infrastructure for the quantum era.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of why qubits are difficult to keep stable', answer: 'C' },
            { num: 15, stem: 'An account of a disputed claim about quantum computers outperforming classical ones', answer: 'D' },
            { num: 16, stem: 'An explanation of how qubits differ from classical computer bits', answer: 'A' },
            { num: 17, stem: 'Information about international standards designed to protect data from quantum attacks', answer: 'G' },
            { num: 18, stem: 'An account of an early mathematical discovery that had implications for internet security', answer: 'B' },
            { num: 19, stem: 'An explanation of what NISQ devices are and their current limitations', answer: 'F' },
            { num: 20, stem: 'A mention of an existing commercial use of quantum technology', answer: 'E' },
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
          title: 'Quantum Computing: Principles and Progress',
          template: `Unlike classical computers, quantum computers use {{21}} which can exist as zero, one, or a combination of both simultaneously. The theoretical basis for quantum computing was partly established by Richard Feynman, while Peter Shor developed an algorithm to {{22}} large numbers exponentially faster than classical computers. The main engineering obstacle is {{23}}, which causes qubits to lose their quantum state due to environmental interference. In 2019, Google claimed its Sycamore processor had achieved {{24}}, though this was disputed by IBM. Near-term quantum applications include {{25}}, which could transform drug development by modelling molecular behaviour. To protect future communications, cryptographers are already developing {{26}} cryptographic schemes resistant to quantum attack.`,
          blanks: [
            { num: 21, answers: ['qubits'] },
            { num: 22, answers: ['factorise'] },
            { num: 23, answers: ['decoherence'] },
            { num: 24, answers: ['quantum supremacy'] },
            { num: 25, answers: ['quantum simulation'] },
            { num: 26, answers: ['post-quantum'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The Placebo Effect',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Placebo Effect

In clinical medicine, a placebo is an inert treatment—a sugar pill, a saline injection, or a sham procedure—that contains no active pharmacological ingredient. The placebo effect refers to the measurable, sometimes substantial improvement in health outcomes that occurs when patients receive such a treatment while believing it to be genuinely therapeutic. For most of the twentieth century, the placebo effect was regarded primarily as a nuisance variable in clinical trials—something to be subtracted out of the results in order to identify the true effect of an active drug. More recent research has revealed it to be a genuinely fascinating and clinically significant phenomenon in its own right.

The magnitude of the placebo effect varies considerably depending on the condition, the context, and the manner in which the treatment is administered. In trials of antidepressants, placebo response rates are frequently between thirty and forty-five percent—high enough that some researchers have questioned whether the active benefit of many widely prescribed medications, over and above placebo, is clinically meaningful for mild to moderate depression. For pain conditions, placebo analgesia is well documented: patients receiving an inert injection have shown measurable reductions in subjective pain scores, and brain imaging studies have demonstrated that placebos activate the same endogenous opioid pathways as actual analgesic drugs. The brain, it appears, can produce its own pain-relieving chemicals in response to the expectation of relief.

The expectation of benefit is widely considered the core mechanism of the placebo effect, but it is not the only one. Classical conditioning also plays a role: if a patient has previously responded well to a treatment, the ritual of receiving any similar treatment—the clinical environment, the manner of the prescriber, the act of swallowing a pill—can trigger a conditioned therapeutic response. Research by Ted Kaptchuk at Harvard Medical School has produced the counterintuitive finding that placebos can be effective even when patients are told explicitly that they are receiving an inert treatment, a phenomenon known as "open-label placebo" or OLP. Participants in several OLP trials reported significant improvements in conditions including irritable bowel syndrome and chronic lower back pain, apparently because the ritual of receiving treatment retained some therapeutic power independent of belief.

The context in which treatment is given—what researchers call the "therapeutic encounter"—matters enormously. Studies have shown that the same placebo produces larger effects when administered by a warm, attentive, and confident clinician compared with a detached or dismissive one. The colour, size, and number of pills influences the response: red and orange capsules tend to have greater stimulant effects, while blue and green ones are more often associated with calming. Brand-name pills are perceived as more effective than generics, even when chemically identical, and expensive treatments are judged more effective than cheap ones. These findings reveal how thoroughly patient outcomes are shaped by the meaning they attach to treatment.

The ethical implications of the placebo effect are significant. Traditional medical ethics holds that deception of patients is impermissible, and deliberately prescribing an inert treatment while telling the patient it is active has long been considered unethical. The emergence of OLP research complicates this picture: if placebos work without deception, a door opens to their ethical clinical use. Some researchers have proposed that placebos could be used as first-line treatments for conditions with high placebo response rates and limited active-drug benefits, reducing exposure to side effects and healthcare costs. Critics, however, argue that OLP findings are not yet replicated at sufficient scale and that broader use of placebos risks undermining patient trust in evidence-based medicine.

Research on the nocebo effect—the counterpart to the placebo effect, in which negative expectations produce adverse outcomes—adds further complexity. Patients who are warned about the side effects of a drug are more likely to experience them, even when given a placebo instead of the drug. In one notable study, patients randomised to a placebo arm in a cardiac trial who believed they might be receiving a beta-blocker were significantly more likely to report fatigue—the key side effect of beta-blockers—than placebo patients who did not hold this belief. The nocebo effect has practical implications for informed consent: detailed disclosure of side effects may not only inform patients but, paradoxically, cause the very symptoms it describes.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'How was the placebo effect primarily viewed during most of the twentieth century?',
          options: [
            'As a powerful and useful therapeutic tool in clinical practice.',
            'As an unwanted confounding factor in clinical trials.',
            'As a psychological phenomenon with no measurable physiological basis.',
            'As the primary mechanism behind most drug treatments.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What did brain imaging studies show about placebo analgesia?',
          options: [
            'Placebos blocked pain signals before they reached the brain.',
            'Placebos activated the same opioid pathways as real analgesic drugs.',
            'Placebo pain relief was entirely explained by distraction effects.',
            'The brain could not distinguish between placebos and active pain medication.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What is the key finding of "open-label placebo" research?',
          options: [
            'Placebos only work when patients are completely unaware they are receiving them.',
            'Informing patients they are taking a placebo makes the treatment entirely ineffective.',
            'Placebos can produce measurable benefits even when patients know they are inert.',
            'Open-label placebos are more effective than blinded placebos in all conditions.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does the nocebo effect demonstrate, according to the passage?',
          options: [
            'Patients should not be told about potential side effects of their treatment.',
            'Negative expectations can produce adverse physical symptoms.',
            'Informed consent procedures are unnecessary for placebo treatments.',
            'The nocebo effect is stronger than the placebo effect in most studies.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Placebo response rates in antidepressant trials are high enough to question the clinical benefit of active medication for mild depression.\n32. {{32}}: Classical conditioning plays no role in the placebo effect.\n33. {{33}}: Ted Kaptchuk's research showed that open-label placebos were ineffective for chronic pain.\n34. {{34}}: The colour and perceived cost of a treatment can influence how effective patients find it.\n35. {{35}}: Most researchers now agree that open-label placebos should be used as a standard clinical treatment.\n36. {{36}}: Warning patients about side effects can sometimes cause them to experience those symptoms.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['NO'] },
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
          template: `37. The core mechanism of the placebo effect is widely considered to be the {{37}} of benefit on the part of the patient.\n38. The clinical setting in which treatment is given, including the behaviour of the clinician, is referred to by researchers as the {{38}}.\n39. The {{39}} effect describes how negative expectations can produce harmful physical outcomes in patients.\n40. The passage argues that detailed disclosure of side effects may {{40}} cause the symptoms described, creating a dilemma for informed consent.`,
          blanks: [
            { num: 37, answers: ['expectation'] },
            { num: 38, answers: ['therapeutic encounter'] },
            { num: 39, answers: ['nocebo'] },
            { num: 40, answers: ['paradoxically'] },
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
          imageUrl: '/assets/ielts/charts/set13-task1.svg',
          imageAlt: 'Bar chart comparing international tourist arrivals by world region in 2010 and 2023',
          stimulus: 'The bar chart below shows the number of international tourist arrivals (in millions) by world region in 2010 and 2023.',
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
          stimulus: 'Some people argue that immigration has a largely positive effect on the economies and societies of the countries that receive migrants. Others feel that the negative effects outweigh the positive ones.',
          text: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about travel and different cultures',
          followUp: [
            'Have you ever lived or studied in a different country? What was that like?',
            'Do you enjoy meeting people from different cultural backgrounds? Why?',
            'What aspects of your own culture are you most proud of?',
            'How easy do you think it is to adapt to living in a foreign country?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe an experience you had that changed your perspective on something important.\n\nYou should say:\n• what the experience was\n• where and when it happened\n• how it affected the way you think\n• and explain why this change in perspective was significant to you`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Globalisation and cultural identity',
          followUp: [
            'Do you think globalisation threatens local cultures and traditions? Why or why not?',
            'What are the main challenges that migrants face when adapting to a new country?',
            'Should host countries do more to help migrants integrate into society? What could they do?',
            'How might future changes in climate or technology affect patterns of migration?',
          ],
        },
      ],
    },
  ],
};

export default mock;
