import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-2',
  examSlug: 'toefl',
  title: 'TOEFL iBT Set 2',
  subtitle: 'Urban Heat Islands · Gothic Architecture · Behavioral Economics · Campus Conversation · Placebo Effect',
  timeMinutes: 205,
  sections: [

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'reading',
      title: 'Reading Passage 1: Urban Heat Islands',
      instructions: 'Read the passage and answer questions 1–10.',
      passage: `Urban heat islands (UHIs) are metropolitan areas that are significantly warmer than the surrounding rural areas due to human activities. The phenomenon was first systematically described in the early nineteenth century by British chemist Luke Howard, who observed that London was measurably warmer than the countryside surrounding it. Since then, the effect has been documented in cities on every inhabited continent and has become a major concern for urban planners, public health officials, and climate scientists.

The primary driver of urban heat islands is the replacement of natural land cover with impervious surfaces such as asphalt, concrete, and roofing materials. Unlike soil and vegetation, which absorb and release moisture through evapotranspiration—thereby cooling the surrounding air—these engineered surfaces absorb solar radiation and re-emit it as heat. Dark surfaces like asphalt can reach temperatures of 60–70°C on a sunny summer day, compared with vegetated ground at 30–35°C. Buildings also act as heat traps, absorbing solar energy through the day and radiating it at night, which is why UHI effects are often strongest in the hours after sunset.

Anthropogenic heat—the heat released by vehicles, air conditioning systems, industrial machinery, and human metabolism—contributes additional thermal loading to urban environments. In densely populated cities, this source can account for a significant fraction of the overall UHI effect. Air conditioning is particularly paradoxical: units cool interior spaces but exhaust heat outdoors, warming the urban environment and thereby increasing demand for more air conditioning.

The consequences of urban heat islands extend well beyond discomfort. Studies have consistently linked UHI-related heat exposure to increased mortality from cardiovascular and respiratory causes, particularly among the elderly, infants, and people with pre-existing conditions. The 2003 European heat wave, which killed an estimated 70,000 people, was significantly amplified by the UHI effect in cities like Paris, where nighttime temperatures failed to provide the relief necessary for physiological recovery. Energy consumption is also affected: every 1°C increase in temperature raises cooling energy demand by roughly two to four percent.

Several strategies have been developed to mitigate UHIs. Green roofs—vegetated roof surfaces—reduce surface temperatures and provide insulation. Cool roofs use reflective materials to deflect solar radiation. Urban tree canopies shade pavements and provide evaporative cooling. The integration of water features such as fountains, canals, and permeable pavements that allow groundwater recharge can also reduce temperatures. Some cities, notably Singapore and Melbourne, have made urban greening a central element of climate resilience planning, with Singapore mandating greenery replacement ratios when buildings are constructed.

Critics of UHI mitigation strategies point out that while individual measures are effective at the neighborhood scale, city-wide temperature reduction requires transforming the built environment over decades—a process that conflicts with economic pressures, property rights, and the high cost of retrofitting existing infrastructure. There is also the equity dimension: UHI effects are not evenly distributed. Lower-income neighborhoods tend to have less tree cover, more paved surfaces, and fewer resources to adapt, concentrating heat-related health risks among already vulnerable populations.`,
      questions: [
        {
          type: 'mcq',
          id: 't2-r1q1',
          part: 1,
          text: 'According to paragraph 1, what is the significance of Luke Howard\'s observations?',
          options: [
            'He was the first person to propose reducing greenhouse gas emissions in cities.',
            'He provided the first systematic documentation of cities being warmer than surrounding rural areas.',
            'He identified the specific chemicals responsible for urban air pollution.',
            'He argued that urbanization should be slowed to prevent temperature rises.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r1q2',
          part: 1,
          text: 'The word "impervious" in paragraph 2 is closest in meaning to',
          options: ['transparent', 'not allowing water to pass through', 'highly reflective of sunlight', 'smooth and featureless'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r1q3',
          part: 1,
          text: 'According to paragraph 2, why do urban surfaces tend to be hotter than natural ground?',
          options: [
            'Buildings block wind circulation, trapping heat near the ground.',
            'Engineered surfaces absorb and re-emit solar radiation instead of releasing moisture through evapotranspiration.',
            'Cities generate more electricity, which escapes as heat.',
            'Natural ground reflects sunlight while urban surfaces absorb it.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r1q4',
          part: 1,
          text: 'Why does the author describe air conditioning as "paradoxical" in paragraph 3?',
          options: [
            'Because it was invented to solve the very problem it now worsens.',
            'Because it cools indoor spaces while releasing heat that warms the outdoor environment, increasing demand for more cooling.',
            'Because it consumes more energy during winter than summer.',
            'Because it was initially designed as a heating system, not a cooling one.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r1q5',
          part: 1,
          text: 'According to paragraph 4, what does research suggest about the 2003 European heat wave?',
          options: [
            'It would have been equally deadly without the urban heat island effect.',
            'The UHI effect reduced nighttime temperatures, denying bodies time to recover.',
            'The UHI effect prevented rainfall that would have cooled affected cities.',
            'Cities had already implemented mitigation strategies that reduced casualties.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r1q6',
          part: 1,
          text: 'The word "mitigate" in paragraph 5 is closest in meaning to',
          options: ['eliminate entirely', 'measure accurately', 'reduce the severity of', 'understand more fully'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't2-r1q7',
          part: 1,
          text: 'Which of the following is mentioned in paragraph 5 as a strategy for reducing urban heat?',
          options: [
            'Installing underground cooling systems beneath roads',
            'Replacing dark roofing materials with highly reflective surfaces',
            'Banning vehicles from city centers during the hottest months',
            'Increasing building height to reduce ground-level solar radiation',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r1q8',
          part: 1,
          text: 'According to paragraph 6, why do critics consider city-wide UHI mitigation difficult?',
          options: [
            'The technology required does not yet exist.',
            'Most governments prioritize reducing air pollution over heat.',
            'Transforming the built environment requires decades and faces economic and legal barriers.',
            'Green roofs and cool roofs have been shown to be ineffective at large scales.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't2-r1q9',
          part: 1,
          text: 'What does the author imply about the equity dimension of urban heat islands?',
          options: [
            'Wealthier neighborhoods bear the greatest thermal burden because they consume more energy.',
            'The health risks from UHIs fall disproportionately on lower-income communities with fewer resources to adapt.',
            'All city residents are equally affected regardless of income.',
            'Government subsidies have successfully eliminated heat disparities between neighborhoods.',
          ],
          answer: 1,
        },
        {
          type: 'multiselect',
          id: 't2-r1q10',
          part: 1,
          qRange: [10, 10],
          text: 'An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage.\n\n"Urban heat islands are a well-documented phenomenon with serious consequences that cities are working to address."',
          options: [
            { letter: 'A', text: 'Impervious surfaces and anthropogenic heat sources make urban areas significantly warmer than surrounding rural areas, especially at night.' },
            { letter: 'B', text: 'Luke Howard first noticed the UHI effect while conducting unrelated chemical experiments in nineteenth-century London.' },
            { letter: 'C', text: 'UHI effects increase mortality, raise energy demand, and are amplified during extreme weather events such as the 2003 European heat wave.' },
            { letter: 'D', text: 'Cool roofs, green infrastructure, and water features can reduce urban temperatures, though city-wide transformation is slow and costly.' },
            { letter: 'E', text: 'Singapore has the most successful urban greening program in the world, achieving a 100 percent greenery replacement ratio.' },
            { letter: 'F', text: 'The health burden of UHIs is inequitably distributed, falling most heavily on lower-income communities with less green cover.' },
          ],
          selectCount: 3,
          answers: ['A', 'C', 'D'],
        },
      ],
    },

    {
      part: 2,
      skill: 'reading',
      title: 'Reading Passage 2: The Architecture of Gothic Cathedrals',
      instructions: 'Read the passage and answer questions 11–20.',
      passage: `Gothic architecture, which flourished in medieval Europe from roughly the twelfth to the sixteenth centuries, represented a radical departure from the heavy, fortress-like Romanesque style that preceded it. Where Romanesque churches relied on thick walls and small windows to support their weight, Gothic builders devised a structural system that allowed walls to become thinner, ceilings to soar to unprecedented heights, and windows to expand into vast compositions of colored glass. The result was a built environment that its creators and patrons experienced as a physical embodiment of divine light and heavenly aspiration.

The key engineering innovation that made Gothic architecture possible was the pointed arch. Unlike the semicircular arch inherited from Roman construction, a pointed arch directs the weight of the structure more steeply downward rather than outward, reducing the lateral thrust exerted on the walls. This allowed walls to be thinner and, ultimately, to be largely replaced by windows. Equally important was the ribbed vault—a ceiling composed of stone ribs that channeled weight along defined structural paths toward supporting columns, rather than distributing it across a broad surface. Together, the pointed arch and ribbed vault concentrated structural forces in predictable ways that builders could address with targeted reinforcements.

The most visible external feature of Gothic cathedrals is the flying buttress: a free-standing arch or half-arch that projects from the upper wall of the nave and transfers the outward thrust of the vault to a pier some distance from the building. Flying buttresses allowed Gothic builders to neutralize the lateral forces that would otherwise push the walls outward, freeing the interior walls for expansive glazing. Visitors approaching a Gothic cathedral from the outside often note the elaborate forest of buttresses, pinnacles, and spires—elements that were both structural necessities and aesthetic choices expressing verticality and upward movement.

The theological dimension of Gothic architecture was inseparable from its engineering. Church leaders of the twelfth and thirteenth centuries, particularly Abbot Suger of Saint-Denis near Paris—often considered the father of Gothic style—argued that light was a manifestation of the divine, drawing on the mystical theology of the Pseudo-Dionysius. Suger believed that a church suffused with colored light could elevate the worshipper from the material world toward spiritual contemplation. This philosophy directly motivated the structural innovations: the entire engineering project was, in part, a theological one.

As Gothic cathedrals were built increasingly tall—Cologne Cathedral, for instance, was not completed until the nineteenth century, nearly six hundred years after construction began—builders developed a sophisticated empirical understanding of structural limits. They learned through observation and failure: several vaults and towers collapsed, providing engineers of subsequent generations with cautionary lessons. This proto-scientific method, combined with the accumulated knowledge of mason guilds that traveled across regions, produced a building tradition of remarkable consistency and innovation.

The Gothic style eventually gave way to the Renaissance preference for classical forms, but its influence has persisted. The Gothic Revival of the nineteenth century produced iconic structures such as the Houses of Parliament in London and the Cathedral of Learning in Pittsburgh. Modern steel-framed skyscrapers, with their system of concentrated loads carried by a visible skeleton rather than load-bearing walls, owe a conceptual debt to the Gothic structural principle of directing forces along specific paths rather than distributing them broadly.`,
      questions: [
        {
          type: 'mcq',
          id: 't2-r2q11',
          part: 2,
          text: 'According to paragraph 1, what made Gothic architecture different from Romanesque architecture?',
          options: [
            'Gothic buildings were smaller and closer to the ground.',
            'Romanesque buildings used pointed arches while Gothic ones used rounded ones.',
            'Gothic builders developed structures that allowed taller spaces, thinner walls, and much larger windows.',
            'Gothic architecture relied entirely on wooden framing rather than stone.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't2-r2q12',
          part: 2,
          text: 'The word "lateral" in paragraph 2 is closest in meaning to',
          options: ['downward', 'sideways', 'circular', 'internal'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r2q13',
          part: 2,
          text: 'According to paragraph 2, how did the ribbed vault improve upon earlier ceiling designs?',
          options: [
            'It allowed ceilings to be decorated with more intricate carvings.',
            'It reduced the need for buttresses by distributing weight more evenly.',
            'It channeled structural forces along defined paths toward specific supporting columns.',
            'It was lighter than stone, reducing the overall weight of the building.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't2-r2q14',
          part: 2,
          text: 'According to paragraph 3, what was the primary structural function of flying buttresses?',
          options: [
            'To support the weight of the spires above the roofline.',
            'To transfer the outward thrust of interior vaults to external piers.',
            'To reinforce foundations against earthquake damage.',
            'To anchor the cathedral to the ground during windstorms.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r2q15',
          part: 2,
          text: 'The author mentions Abbot Suger in paragraph 4 in order to',
          options: [
            'Contrast his conservative views with those of later reformers.',
            'Explain how the theological goal of filling churches with light motivated the structural innovations of Gothic architecture.',
            'Identify the first architect to design a complete Gothic cathedral.',
            'Show that Gothic architecture was influenced primarily by Islamic building traditions.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r2q16',
          part: 2,
          text: 'The word "suffused" in paragraph 4 is closest in meaning to',
          options: ['enclosed', 'designed', 'filled throughout', 'constructed from'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't2-r2q17',
          part: 2,
          text: 'According to paragraph 5, how did medieval builders develop their structural knowledge?',
          options: [
            'Through formal academic training in Roman engineering texts.',
            'By observing and learning from both successful buildings and structural failures.',
            'By copying designs sent from Constantinople.',
            'Through scientific experiments conducted in dedicated workshops.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r2q18',
          part: 2,
          text: 'What does the author mention about Cologne Cathedral in paragraph 5?',
          options: [
            'It was the tallest building in the world when completed.',
            'It took nearly six hundred years to complete after construction began.',
            'It was the first Gothic cathedral to use flying buttresses.',
            'It was rebuilt after a vault collapsed during construction.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r2q19',
          part: 2,
          text: 'According to paragraph 6, what do modern steel skyscrapers share with Gothic cathedrals?',
          options: [
            'Both use pointed arches as the primary structural element.',
            'Both were designed by architects who studied medieval building techniques.',
            'Both rely on a visible structural skeleton to carry concentrated loads rather than load-bearing walls.',
            'Both were inspired by the theological desire to bring light into interior spaces.',
          ],
          answer: 2,
        },
        {
          type: 'multiselect',
          id: 't2-r2q20',
          part: 2,
          qRange: [20, 20],
          text: 'An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage.\n\n"Gothic architecture combined innovative structural engineering with theological vision to create a new kind of sacred space."',
          options: [
            { letter: 'A', text: 'The pointed arch and ribbed vault concentrated structural forces in predictable ways, allowing walls to become thinner and windows to grow much larger.' },
            { letter: 'B', text: 'Cologne Cathedral was not finished until the nineteenth century, making it the longest construction project in architectural history.' },
            { letter: 'C', text: 'Flying buttresses transferred outward thrust from interior vaults to external piers, enabling the open, light-filled interiors characteristic of Gothic cathedrals.' },
            { letter: 'D', text: 'The theological belief that light embodied the divine, as articulated by Abbot Suger, directly motivated the structural innovations designed to maximize interior light.' },
            { letter: 'E', text: 'The Romanesque style was rejected primarily because it was associated with pagan Roman culture, not because of its structural limitations.' },
            { letter: 'F', text: 'Builders refined their techniques through accumulated experience and knowledge sharing, developing a remarkably consistent tradition across regions.' },
          ],
          selectCount: 3,
          answers: ['A', 'C', 'D'],
        },
      ],
    },

    {
      part: 3,
      skill: 'reading',
      title: 'Reading Passage 3: Behavioral Economics and Decision Making',
      instructions: 'Read the passage and answer questions 21–30.',
      passage: `For most of the twentieth century, mainstream economics assumed that individuals make decisions rationally—gathering available information, calculating expected outcomes, and choosing the option that maximizes their utility. This model, known as the rational agent or homo economicus, was a useful simplification for building mathematical theories of markets. But by the 1970s, psychologists Daniel Kahneman and Amos Tversky had accumulated compelling evidence that human decision-making departs from this ideal in systematic, predictable ways. Their work laid the foundation for behavioral economics, a field that has since reshaped economics, public policy, and our understanding of human choice.

One of the most influential findings from behavioral economics is the concept of loss aversion. Kahneman and Tversky found that the psychological pain of losing something is roughly twice as powerful as the pleasure of gaining an equivalent amount. In experiments, people consistently refused bets that offered a fifty percent chance of gaining $110 if they also faced a fifty percent chance of losing $100—even though the expected value is positive. This asymmetry in how gains and losses are experienced explains a range of real-world phenomena, from investor reluctance to sell losing stocks to the popularity of money-back guarantees in retail.

Closely related to loss aversion is the endowment effect: people place greater value on objects they already own than on identical objects they do not own. In one classic experiment, participants who were randomly given a coffee mug demanded significantly more money to sell it than participants without a mug were willing to pay to buy an identical one. The endowment effect challenges the standard economic assumption that willingness to pay and willingness to accept should be roughly equivalent.

Behavioral economists have also documented the importance of framing—the way in which a choice is presented affects which option people select. In a study of medical decision-making, physicians presented with the same treatment statistics made different recommendations depending on whether the information was expressed in terms of survival rates ("ninety percent of patients survive the first month") or mortality rates ("ten percent of patients die in the first month"), even though the two phrasings convey identical information. Framing effects underscore that people do not simply process information as abstract numbers; they respond to its emotional and contextual presentation.

Perhaps the most practically consequential insight from behavioral economics is the concept of the default option, or "nudge." Because of cognitive inertia—the tendency to stick with whatever option is presented as the default—the way choices are structured has a profound effect on outcomes. When organ donation was made opt-out (citizens are automatically donors unless they choose otherwise) rather than opt-in, donation rates in some countries rose from around fifteen percent to over ninety percent without any change in the underlying law or people's stated attitudes. Governments and institutions worldwide have established "nudge units" to redesign choice environments and improve outcomes in health, savings, and energy consumption.

Critics of behavioral economics raise both methodological and ethical concerns. On the methodological side, some researchers argue that many behavioral findings rely on small laboratory experiments that do not replicate well in large-scale field settings. On the ethical side, critics warn that using nudges to steer behavior, even toward objectively beneficial ends, raises questions about autonomy and paternalism: who decides what constitutes the "right" choice, and how much hidden influence over behavior is acceptable in a democratic society?`,
      questions: [
        {
          type: 'mcq',
          id: 't2-r3q21',
          part: 3,
          text: 'According to paragraph 1, what was the "rational agent" assumption in traditional economics?',
          options: [
            'People behave irrationally in markets but rationally in personal decisions.',
            'Individuals gather information and choose the option that maximizes their utility.',
            'Economic behavior can be modeled without considering individual psychology.',
            'Markets naturally correct for irrational individual decisions through competition.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r3q22',
          part: 3,
          text: 'The word "asymmetry" in paragraph 2 is closest in meaning to',
          options: ['equality', 'unpredictability', 'imbalance', 'complexity'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't2-r3q23',
          part: 3,
          text: 'According to paragraph 2, what did Kahneman and Tversky\'s experiments reveal about losses?',
          options: [
            'People feel losses and gains equally as long as the amounts are large.',
            'The psychological impact of a loss is approximately twice as intense as an equivalent gain.',
            'Loss aversion is stronger in financial decisions than in personal relationships.',
            'People are more rational about large sums than small ones.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r3q24',
          part: 3,
          text: 'According to paragraph 3, what does the endowment effect experiment with coffee mugs demonstrate?',
          options: [
            'People undervalue objects given to them for free.',
            'Willingness to pay and willingness to accept can differ significantly for identical objects.',
            'People make better financial decisions when they own the item being evaluated.',
            'Random gift-giving increases market prices for consumer goods.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r3q25',
          part: 3,
          text: 'In paragraph 4, why does the author use the example of physicians interpreting treatment statistics?',
          options: [
            'To show that medical professionals are less rational than other decision-makers.',
            'To demonstrate that framing—how information is presented—affects decisions even when the underlying facts are identical.',
            'To argue that mortality statistics should not be shared with patients.',
            'To suggest that survival rates should always be used in preference to mortality rates.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r3q26',
          part: 3,
          text: 'The word "inertia" in paragraph 5 is closest in meaning to',
          options: ['motivation', 'confusion', 'tendency to remain unchanged', 'rational preference'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't2-r3q27',
          part: 3,
          text: 'According to paragraph 5, what effect did switching to opt-out organ donation have?',
          options: [
            'It had no measurable effect because people\'s stated attitudes did not change.',
            'Donation rates rose dramatically, from around fifteen to over ninety percent.',
            'It raised legal concerns that led most countries to reverse the policy.',
            'It increased donation rates among younger people but not older ones.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r3q28',
          part: 3,
          text: 'According to paragraph 6, what is one methodological criticism of behavioral economics?',
          options: [
            'Its theories are too abstract to be tested experimentally.',
            'Many of its key findings come from small laboratory studies that may not replicate in real-world settings.',
            'It focuses too heavily on financial behavior and ignores social behavior.',
            'Its experiments have been conducted only in Western countries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-r3q29',
          part: 3,
          text: 'What ethical concern about nudges does the author describe in paragraph 6?',
          options: [
            'That nudges are too expensive for governments to implement at scale.',
            'That nudging people without full transparency raises questions about autonomy and paternalism.',
            'That nudges are ineffective for groups with lower levels of education.',
            'That the use of nudges has been shown to reduce trust in government institutions.',
          ],
          answer: 1,
        },
        {
          type: 'multiselect',
          id: 't2-r3q30',
          part: 3,
          qRange: [30, 30],
          text: 'An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage.\n\n"Behavioral economics has challenged the traditional assumption of rational decision-making by documenting systematic biases in how people choose."',
          options: [
            { letter: 'A', text: 'Loss aversion and the endowment effect show that people value losses and owned objects more intensely than standard economic theory predicts.' },
            { letter: 'B', text: 'Daniel Kahneman and Amos Tversky met as colleagues at Hebrew University of Jerusalem in the early 1970s.' },
            { letter: 'C', text: 'Framing effects demonstrate that the way information is presented can alter decisions even when the underlying facts are unchanged.' },
            { letter: 'D', text: 'Default options exploit cognitive inertia to steer behavior, producing large changes in outcomes such as organ donation rates.' },
            { letter: 'E', text: 'The rational agent model was developed by Adam Smith in the eighteenth century and remained unchallenged until the 1990s.' },
            { letter: 'F', text: 'Critics raise concerns about both the replicability of behavioral findings and the ethical implications of using nudges to influence behavior.' },
          ],
          selectCount: 3,
          answers: ['A', 'C', 'D'],
        },
      ],
    },

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 4,
      skill: 'listening',
      title: 'Listening — Conversation 2: Registration Office',
      instructions: 'Listen to a conversation between a student and a university administrator. Then answer questions 31–35.',
      transcript: `ADMINISTRATOR: Academic Records, how can I help you?

STUDENT: Hi, yes — I'm trying to add a course to my schedule, but the online system is giving me an error saying the class is full. It's PSYC 302 with Dr. Osei.

ADMINISTRATOR: Let me check that for you... okay, yes, the official enrollment cap is set at thirty students and it appears the section is at capacity.

STUDENT: Is there any way I can still get in? I really need it this semester. It's a prerequisite for my senior thesis, and if I can't take it now I'll have to delay the whole thing by a year.

ADMINISTRATOR: The only option in that case would be to get an add code from the instructor directly. Some professors will allow students to add beyond the cap if there's a legitimate academic need.

STUDENT: Okay. Do you know if Dr. Osei typically does that?

ADMINISTRATOR: I really can't speak to individual faculty members' policies — that varies a lot. What I'd recommend is sending a brief, professional email to Dr. Osei explaining your situation — the thesis prerequisite angle is a strong reason. Copy your academic advisor on it so the professor can see there's institutional support for the request.

STUDENT: That's a good idea. And — is there a deadline I need to be aware of? I don't want to miss the add window.

ADMINISTRATOR: The add period closes this Friday at five p.m. So you'd want to contact Dr. Osei as soon as possible, ideally today or tomorrow, to have time to get the add code and process it before the deadline.

STUDENT: Okay, that's really helpful. One more thing — if Dr. Osei says no, are there other sections of the same course?

ADMINISTRATOR: Let me look... there's one other section, PSYC 302 with Professor Kim, but that meets on Thursday evenings from six to nine. Does that work for your schedule?

STUDENT: That might be an issue — I have a lab that runs until eight on Thursdays. But I'll consider it as a backup.

ADMINISTRATOR: You could also reach out to the Psychology department directly and ask if they're planning to open a waitlist. That's something they sometimes do a few days into the semester if students drop.`,
      questions: [
        {
          type: 'mcq',
          id: 't2-l1q31',
          part: 3,
          text: 'Why does the student need to enroll in PSYC 302 this semester?',
          options: [
            'It is the only class available in his field of study.',
            'It is a prerequisite for his senior thesis and delaying would push back his graduation by a year.',
            'His academic advisor has made it a mandatory requirement.',
            'The course is only offered once every two years.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l1q32',
          part: 3,
          text: 'What does the administrator recommend that the student do?',
          options: [
            'File a formal appeal with the academic dean.',
            'Contact Dr. Osei directly by email and copy his academic advisor.',
            'Wait until the first day of class and ask to be added in person.',
            'Register for a different course and petition for an equivalency waiver.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l1q33',
          part: 3,
          text: 'When does the add period close?',
          options: ['Tomorrow morning', 'Friday at 5 p.m.', 'The following Monday', 'The end of the second week of class'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l1q34',
          part: 3,
          text: 'Why might the alternate section with Professor Kim be a problem for the student?',
          options: [
            'It covers different material than the section with Dr. Osei.',
            'He has a lab that runs until 8 p.m. on Thursdays and the class runs from 6 to 9.',
            'Professor Kim\'s section is also at capacity.',
            'The student has already taken a course with Professor Kim.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l1q35',
          part: 3,
          text: 'What additional option does the administrator mention at the end of the conversation?',
          options: [
            'Applying for a late enrollment exception through the dean\'s office',
            'Contacting the Psychology department to ask about a waitlist',
            'Taking an independent study in place of the course',
            'Requesting a course substitution from his academic advisor',
          ],
          answer: 1,
        },
      ],
    },

    {
      part: 5,
      skill: 'listening',
      title: 'Listening — Lecture 2: The Placebo Effect',
      instructions: 'Listen to part of a lecture in a psychology class. Then answer questions 36–42.',
      transcript: `PROFESSOR: Last week we discussed the general principles of experimental design, and today I want to look at a phenomenon that actually gave rise to some of those design principles — the placebo effect. And I want to push back a little against what I think is a common misconception, which is that the placebo effect is just about sugar pills and fooling patients.

The term "placebo" comes from the Latin for "I shall please," and it originally referred to inactive treatments given to patients who were considered to be complaining without genuine physical cause. But as clinical research became more rigorous in the twentieth century, researchers started noticing something puzzling: patients given inert treatments — bread pills, saline injections — were improving in ways that couldn't be explained by the treatment itself. The improvement was real. It showed up in objective measures like blood pressure, hormone levels, and immune markers, not just in patients' self-reports.

So what's actually happening? There are a few mechanisms we think are at work. One is expectation. When patients believe they are receiving an effective treatment, that belief activates real neurobiological responses. There's good evidence that expectation triggers the release of endogenous opioids — your brain's own natural painkillers. Ted Kaptchuk at Harvard has done fascinating work showing that placebo analgesia — pain relief from placebo — involves specific neural pathways that can even be blocked by opioid antagonists. So it's not imaginary. It's a real neurochemical event.

There's also the conditioning component. Think about Pavlov and his dogs — classical conditioning. If you've taken a drug that reliably relieved your headache, your brain begins to associate the act of taking a pill with relief. Over time, even a sugar pill can trigger that conditioned response. Interestingly — and this is something students often find surprising — open-label placebos, where patients are told explicitly that they're taking a placebo, still produce measurable benefits in some conditions. That finding challenges the idea that deception is necessary for the placebo effect to work.

The implications are significant for clinical trial design. The double-blind randomized controlled trial, where neither the patient nor the clinician knows who is getting the real treatment, emerged largely as a way to control for placebo effects. If the placebo group improves substantially, a new drug has to outperform not just nothing, but a powerful psychological response. That's a high bar. Some researchers argue that our current trial designs underestimate the therapeutic potential of placebo effects because the goal is always to subtract them rather than to harness them.

There's also an ethical dimension here. Should doctors be allowed to prescribe placebos? If you know a patient has a condition that responds well to placebo, and you prescribe a placebo, you've improved their health — but you've also potentially deceived them. Open-label placebos sidestep the deception problem, but their effectiveness appears more variable. It's an area where medicine, ethics, and neuroscience intersect in genuinely unresolved ways.`,
      questions: [
        {
          type: 'mcq',
          id: 't2-l2q36',
          part: 5,
          text: 'What misconception about the placebo effect does the professor address at the beginning of the lecture?',
          options: [
            'That the placebo effect only occurs in clinical trials.',
            'That the placebo effect is merely about deceiving patients with sugar pills, rather than a real physiological response.',
            'That placebo effects are stronger in adults than in children.',
            'That the word "placebo" is of Greek rather than Latin origin.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l2q37',
          part: 5,
          text: 'According to the professor, what evidence shows that placebo improvements are genuine rather than imagined?',
          options: [
            'Patients who received placebos reported higher satisfaction than those who received real treatments.',
            'Placebos showed up as effective in objective physiological measures such as blood pressure and hormone levels.',
            'The improvements from placebos lasted longer than those from active treatments.',
            'Researchers found no difference in self-reported pain between placebo and real treatment groups.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l2q38',
          part: 5,
          text: 'According to the professor, what does research on placebo analgesia suggest about endogenous opioids?',
          options: [
            'They are only released when patients know they are receiving real medication.',
            'The expectation of pain relief triggers the brain\'s own natural painkillers, which can be blocked by opioid antagonists.',
            'Endogenous opioids are less effective than synthetic opioids for pain relief.',
            'They are released equally in both placebo and active treatment conditions.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l2q39',
          part: 5,
          text: 'Why does the professor mention classical conditioning?',
          options: [
            'To explain how placebo effects persist even when patients are told the pill is inactive.',
            'To describe the second mechanism by which placebos work: learned associations between taking a pill and experiencing relief.',
            'To argue that the placebo effect is identical to the conditioned response Pavlov observed in dogs.',
            'To suggest that conditioning is a more important mechanism than expectation.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l2q40',
          part: 5,
          text: 'What does the professor find surprising about open-label placebos?',
          options: [
            'They are just as effective as traditional placebos in all conditions.',
            'They produce measurable benefits even when patients are explicitly told they are receiving a placebo.',
            'They are more effective than real treatments for chronic pain.',
            'They require a longer treatment period before showing any effect.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l2q41',
          part: 5,
          text: 'Why does the professor say new drugs face a "high bar" in clinical trials?',
          options: [
            'Regulatory agencies require three separate trials before approval.',
            'They must outperform not just no treatment but also the substantial psychological improvement produced by the placebo group.',
            'The cost of double-blind trials has risen dramatically in recent decades.',
            'Most drugs have similar side-effect profiles, making comparisons difficult.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't2-l2q42',
          part: 5,
          text: 'According to the professor, what ethical problem do open-label placebos help address?',
          options: [
            'The problem of patients not understanding the nature of clinical trials.',
            'The potential deception involved in giving patients an inactive treatment without their knowledge.',
            'The legal liability doctors face if patients suffer side effects from placebos.',
            'The difficulty of recruiting patients who are willing to participate in placebo-controlled trials.',
          ],
          answer: 1,
        },
      ],
    },

    // ─── SPEAKING ─────────────────────────────────────────────────────────────

    {
      part: 6,
      skill: 'speaking',
      title: 'Speaking Tasks',
      instructions: 'Complete all four speaking tasks. You will have preparation time before each response.',
      questions: [
        {
          type: 'speak',
          id: 't2-sp1',
          part: 5,
          partNumber: 1,
          text: 'Task 1 — Independent Speaking (Preparation: 15 sec | Response: 45 sec)\n\nSome people prefer to live in a large city. Others prefer to live in a smaller town or rural area. Which do you prefer and why? Use specific reasons and examples to support your answer.',
        },
        {
          type: 'speak',
          id: 't2-sp2',
          part: 5,
          partNumber: 2,
          cueCard: 'Task 2 — Integrated: Campus Announcement (Preparation: 30 sec | Response: 60 sec)\n\nThe university is considering requiring all first-year students to live in campus dormitories. Read the announcement, then listen to a student\'s opinion, and then summarize the student\'s opinion and the reasons given.',
          text: 'Reading: The university proposes to require all incoming first-year students to live in campus housing. Officials state that dormitory living helps students build social connections, participate in campus life, and access academic support services more conveniently.\n\nStudent opinion (summarize): The student in the conversation supports the proposal. He argues that when he lived off-campus during his first year, he felt isolated and missed many events and study groups. He also points out that the proposal includes a needs-based subsidy option, so cost should not be a barrier. He believes the social and academic benefits outweigh the loss of housing flexibility for most students.',
        },
        {
          type: 'speak',
          id: 't2-sp3',
          part: 5,
          partNumber: 3,
          text: 'Task 3 — Integrated: Academic Reading + Lecture (Preparation: 30 sec | Response: 60 sec)\n\nReading concept: "Confirmation bias" is the tendency to search for, interpret, and recall information in a way that confirms one\'s existing beliefs, while giving disproportionately little weight to information that contradicts those beliefs.\n\nLecture example (summarize): The professor describes a study in which participants who either supported or opposed capital punishment were shown two research reports: one suggesting capital punishment deters crime and one suggesting it does not. Participants of both groups rated the study that supported their prior view as more methodologically rigorous and compelling, even though both studies were of equal quality. After reading both reports, participants emerged with stronger views than before, not weaker ones — a phenomenon the professor calls "attitude polarization," which she explains as a direct consequence of confirmation bias.',
        },
        {
          type: 'speak',
          id: 't2-sp4',
          part: 5,
          partNumber: 3,
          text: 'Task 4 — Integrated: Lecture Summary (Preparation: 20 sec | Response: 60 sec)\n\nLecture summary to respond to: In the lecture, the professor explains the concept of "competitive exclusion," which states that two species competing for the same limited resource cannot stably coexist — one will eventually outcompete and eliminate the other. However, field ecologists have observed that many competing species do coexist in the wild, which seems to contradict this principle. The professor describes two mechanisms that allow coexistence: resource partitioning (species evolve to use slightly different aspects of a shared resource) and the intermediate disturbance hypothesis (moderate environmental disturbances, such as periodic fires or floods, prevent any single species from becoming dominant long enough to exclude others). Using these mechanisms, explain how a diverse rainforest could contain dozens of tree species competing for sunlight without any single species eliminating all the others.',
        },
      ],
    },

    // ─── WRITING ─────────────────────────────────────────────────────────────

    {
      part: 7,
      skill: 'writing',
      title: 'Writing Tasks',
      instructions: 'Complete both writing tasks.',
      questions: [
        {
          type: 'write',
          id: 't2-w1',
          part: 6,
          taskNumber: 1,
          stimulusLabel: 'Integrated Writing Task',
          stimulus: `Reading passage: Three arguments support the widespread adoption of artificial intelligence tutoring systems in K–12 education. First, AI tutors can provide individualized instruction by adapting in real time to each student's learning pace, strengths, and weaknesses in ways that no single teacher managing thirty students can replicate. Second, AI systems are available around the clock, meaning students in underserved communities without access to expensive private tutors can receive extra support. Third, preliminary studies suggest that students who used AI tutoring platforms for mathematics showed measurable improvement in test scores.

Lecture (listen and take notes): The professor challenges all three points. On personalization, she argues that current AI systems optimize for narrow, easily measurable skills — such as solving a specific type of equation — while missing the broader reasoning and communication skills that a human teacher can develop. On equity, she notes that digital access remains uneven, and that lower-income students are less likely to have reliable internet connections at home, potentially widening rather than closing the gap. On test score improvements, she cites researchers who found that the studies were funded by the companies selling the software, introducing potential bias, and that improvements dissipated when students returned to non-AI settings.`,
          text: 'Summarize the points made in the lecture, explaining how they cast doubt on the specific points made in the reading passage. Write approximately 150–225 words.',
          minWords: 150,
        },
        {
          type: 'write',
          id: 't2-w2',
          part: 6,
          taskNumber: 2,
          stimulusLabel: 'Academic Discussion Task',
          stimulus: `Professor's prompt: "Your professor is teaching a class on environmental science. Write a post responding to the following question:\n\nSome countries have proposed implementing a carbon tax — a fee charged to companies and consumers based on the amount of carbon dioxide their activities produce. Do you think a carbon tax is an effective and fair approach to reducing greenhouse gas emissions? Why or why not?"\n\nStudent A (Priya): I think a carbon tax makes a lot of sense economically. When polluting is free, companies have no incentive to reduce emissions. Putting a price on carbon changes the calculation. Countries like Sweden and Canada that have implemented carbon taxes have seen emissions fall without major economic damage.\n\nStudent B (Marcus): I'm skeptical about fairness. A carbon tax on fuel and energy disproportionately hits lower-income households, who spend a larger share of their income on these necessities. Unless the revenue is returned to citizens as a dividend — which not all proposals include — it functions as a regressive tax.`,
          text: 'Write a response of at least 100 words. Contribute your own perspective to the discussion, addressing points raised by your classmates where relevant.',
          minWords: 100,
        },
      ],
    },

  ],
};

export default mock;
