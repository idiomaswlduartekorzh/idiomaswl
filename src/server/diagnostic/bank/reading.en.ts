import type { CefrLevel } from '../../../lib/diagnostic/types.ts';
import type { DiagnosticBankRecord } from '../types.ts';

export const ENGLISH_DIAGNOSTIC_READING_CANDIDATE_VERSION = 'en-reading-original-draft-1';
const ENGLISH_DIAGNOSTIC_READING_REVISED_VERSION = 'en-reading-original-draft-2';

type ReadingQuestionSeed = {
  subdomain: 'main-idea' | 'detail' | 'inference' | 'purpose' | 'structure' | 'meaning-in-context';
  prompt: string;
  options: readonly [string, string, string];
  correctIndex: 0 | 1 | 2;
  rationale: string;
  distractorRationales: readonly [string, string];
};

type ReadingTestletSeed = {
  level: Extract<CefrLevel, 'A1' | 'A2' | 'B1' | 'B2'>;
  slug: string;
  title: string;
  text: string;
  questions: readonly [ReadingQuestionSeed, ReadingQuestionSeed];
};

const lowerTestlets: readonly ReadingTestletSeed[] = [
  {
    level: 'A1', slug: 'pool-hours', title: 'Pool notice',
    text: 'RIVER POOL\nOpen Monday, Tuesday, Thursday and Friday: 7:00 a.m.–7:00 p.m.\nSaturday and Sunday: 9:00 a.m.–4:00 p.m.\nClosed on Wednesday. Children under 12 must come with an adult.',
    questions: [
      {
        subdomain: 'detail', prompt: 'Which day is the pool closed?', correctIndex: 1,
        options: ['Tuesday', 'Wednesday', 'Sunday'],
        rationale: 'The notice explicitly says, “Closed on Wednesday.”',
        distractorRationales: ['Tuesday is listed as an open day.', 'Sunday has weekend opening hours.'],
      },
      {
        subdomain: 'detail', prompt: 'Who must come with an adult?', correctIndex: 2,
        options: ['All weekend visitors', 'People over 12', 'Children under 12'],
        rationale: 'The final line requires an adult for children under 12.',
        distractorRationales: ['The rule is based on age, not the day of the visit.', 'The notice says “under 12”, not “over 12”.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'library-message', title: 'A message from Kim',
    text: 'Hi Alex,\nLet’s meet outside the library at 4:30. Please bring your blue notebook. After we study, we can get a sandwich at the café across the street.\nKim',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Why did Kim write this message?', correctIndex: 0,
        options: ['To arrange a study meeting', 'To offer Alex a new job', 'To return a library book'],
        rationale: 'Kim proposes a meeting place and time, asks for a notebook, and says they will study.',
        distractorRationales: ['No job is mentioned or offered.', 'The library is the meeting place; no book return is discussed.'],
      },
      {
        subdomain: 'detail', prompt: 'What should Alex bring?', correctIndex: 1,
        options: ['A sandwich', 'A blue notebook', 'A library card'],
        rationale: 'Kim explicitly asks Alex to bring the blue notebook.',
        distractorRationales: ['They may buy a sandwich later.', 'No library card is requested.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'cafe-special', title: 'Lunch special',
    text: 'GREEN CAFÉ — TODAY’S LUNCH\nTomato soup and a cheese sandwich: $8\nChicken salad: $9\nFruit: $3\nLunch special includes tea or water. Coffee is $2 extra.',
    questions: [
      {
        subdomain: 'detail', prompt: 'How much is the chicken salad?', correctIndex: 2,
        options: ['$3', '$8', '$9'],
        rationale: 'The menu lists chicken salad at nine dollars.',
        distractorRationales: ['Three dollars is the price of fruit.', 'Eight dollars is the soup-and-sandwich price.'],
      },
      {
        subdomain: 'inference', prompt: 'Which drink can come with the lunch special at no extra cost?', correctIndex: 0,
        options: ['Tea', 'Coffee', 'Orange juice'],
        rationale: 'Tea or water is included, while coffee costs extra.',
        distractorRationales: ['Coffee costs two dollars extra.', 'Orange juice is not listed.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'bus-times', title: 'Bus timetable',
    text: 'BUS 18 — CITY CENTRE\nOak Street: 08:10\nMuseum: 08:25\nCentral Station: 08:40\nMarket Square: 08:55\nNo service on public holidays.',
    questions: [
      {
        subdomain: 'detail', prompt: 'What time does the bus reach the museum?', correctIndex: 1,
        options: ['08:10', '08:25', '08:55'],
        rationale: 'The timetable pairs “Museum” with 08:25.',
        distractorRationales: ['08:10 is the Oak Street time.', '08:55 is the Market Square time.'],
      },
      {
        subdomain: 'structure', prompt: 'Where does the bus stop after the museum?', correctIndex: 2,
        options: ['Oak Street', 'Market Square', 'Central Station'],
        rationale: 'Central Station is the next listed stop after the museum.',
        distractorRationales: ['Oak Street comes before the museum.', 'Market Square comes after Central Station.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'weekend-email', title: 'Weekend email',
    text: 'Hello Mia,\nI’m free on Saturday afternoon. Would you like to visit the new park with me? We can take the number 6 bus at two o’clock. It may rain, so bring a jacket.\nSam',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Why did Sam write this email?', correctIndex: 0,
        options: ['To invite Mia to the park', 'To cancel a bus journey', 'To return Mia’s jacket'],
        rationale: 'Sam asks Mia to visit the new park together on Saturday.',
        distractorRationales: ['Sam proposes taking a bus rather than cancelling it.', 'The jacket is advice for possible rain, not an item being returned.'],
      },
      {
        subdomain: 'detail', prompt: 'Why should Mia bring a jacket?', correctIndex: 1,
        options: ['Because the park closes early.', 'Because rain is possible.', 'Because the bus is always cold.'],
        rationale: 'Sam directly connects the jacket with the possibility of rain.',
        distractorRationales: ['No closing time is mentioned.', 'The email says nothing about the bus temperature.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'recycling-sign', title: 'Recycling room sign',
    text: 'PLEASE USE THE CORRECT BIN\nBlue: paper and cardboard\nGreen: glass bottles\nYellow: cans and plastic bottles\nDo not leave bags on the floor. Ask at reception if a bin is full.',
    questions: [
      {
        subdomain: 'detail', prompt: 'Which bin is for glass bottles?', correctIndex: 2,
        options: ['The blue bin', 'The yellow bin', 'The green bin'],
        rationale: 'The sign assigns glass bottles to the green bin.',
        distractorRationales: ['Blue is for paper and cardboard.', 'Yellow is for cans and plastic bottles.'],
      },
      {
        subdomain: 'purpose', prompt: 'What is the main purpose of the sign?', correctIndex: 0,
        options: ['To explain how to sort recycling', 'To advertise bottles for sale', 'To announce new reception hours'],
        rationale: 'The sign matches recyclable materials to bins and gives disposal instructions.',
        distractorRationales: ['Nothing is offered for sale.', 'Reception is mentioned only as a place to ask for help.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'bike-library', title: 'The neighbourhood bike library',
    text: 'People in Westfield can now borrow a bicycle from the neighbourhood bike library. Membership costs ten dollars a year. Members may keep a bicycle for up to three days and can collect one from the community centre. The project started because many residents wanted to cycle but did not have space to store a bicycle at home.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What does the text mainly explain?', correctIndex: 1,
        options: ['How to repair an old bicycle', 'How a local bicycle-lending project works', 'Why cycling is dangerous in Westfield'],
        rationale: 'The text explains membership, borrowing time, collection, and the reason for the bike library.',
        distractorRationales: ['No repair process is described.', 'The text presents a solution for cycling, not a safety warning.'],
      },
      {
        subdomain: 'detail', prompt: 'How long may a member keep a bicycle?', correctIndex: 2,
        options: ['For up to one day', 'For up to one week', 'For up to three days'],
        rationale: 'The borrowing limit is explicitly stated as up to three days.',
        distractorRationales: ['One day is shorter than the stated limit.', 'One week is longer than the stated limit.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'lost-backpack', title: 'Lost backpack email',
    text: 'Dear Sports Centre team,\nI think I left my grey backpack in changing room 2 after the 6 p.m. swimming class on Tuesday. It has a red water bottle in the side pocket and my name, Elena Ruiz, is written inside. Could you let me know if anyone has found it? I can collect it after work tomorrow.\nThank you,\nElena',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Why is Elena writing?', correctIndex: 0,
        options: ['To ask about a missing backpack', 'To change her swimming class', 'To complain about a water bottle'],
        rationale: 'Elena identifies a backpack she left behind and asks whether it has been found.',
        distractorRationales: ['She identifies the class only to locate the bag.', 'The water bottle helps identify the backpack; it is not the complaint.'],
      },
      {
        subdomain: 'detail', prompt: 'Which detail can help identify the backpack?', correctIndex: 1,
        options: ['It is in changing room 6.', 'A red bottle is in a side pocket.', 'The owner’s name is on the outside.'],
        rationale: 'Elena says a red water bottle is in the side pocket.',
        distractorRationales: ['She names changing room 2 and a 6 p.m. class.', 'Her name is written inside, not outside.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'community-garden', title: 'A Saturday in the community garden',
    text: 'Last spring, an empty piece of land beside Park Road became a community garden. At first, only six people volunteered. Now more than thirty neighbours grow vegetables and flowers there. They share tools, and experienced gardeners help beginners. On Saturday mornings, the group sells some vegetables to pay for seeds and gives the rest to a local food bank.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What is the text mainly about?', correctIndex: 2,
        options: ['A company that sells garden tools', 'A park that will close next spring', 'Neighbours developing and sharing a garden'],
        rationale: 'The text follows the growth of a volunteer garden and explains how neighbours work and share its produce.',
        distractorRationales: ['Tools are shared, not sold by a company.', 'No park closure is announced.'],
      },
      {
        subdomain: 'inference', prompt: 'Why does the group sell some vegetables?', correctIndex: 0,
        options: ['To cover part of the garden’s costs', 'To pay every volunteer a salary', 'To buy the empty land'],
        rationale: 'The money pays for seeds, so the sales help cover an operating cost.',
        distractorRationales: ['The members are described as volunteers.', 'Buying the land is not mentioned.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'train-announcement', title: 'Station announcement',
    text: 'Attention, passengers for Lakeside. The 10:15 train from platform 4 is delayed by approximately twenty minutes because of a signalling problem. Please remain in the main waiting area. The platform may change, so check the information screens before boarding. Passengers who need assistance should speak to station staff near the ticket office.',
    questions: [
      {
        subdomain: 'detail', prompt: 'Why is the train delayed?', correctIndex: 1,
        options: ['The driver is absent.', 'There is a signalling problem.', 'The weather has damaged the track.'],
        rationale: 'The announcement directly attributes the delay to a signalling problem.',
        distractorRationales: ['No absent driver is mentioned.', 'No weather or track damage is mentioned.'],
      },
      {
        subdomain: 'inference', prompt: 'Why should passengers check the screens?', correctIndex: 2,
        options: ['The ticket office is closing.', 'The train time is now earlier.', 'The departure platform could be different.'],
        rationale: 'The announcement says the platform may change and then tells passengers to check the screens.',
        distractorRationales: ['The ticket office is only a location for assistance.', 'The train is delayed, not moved earlier.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'book-club', title: 'New readers’ book club',
    text: 'Would you like to read more in English but find long novels difficult? Join our new readers’ book club on the first Thursday of each month. We choose short books and send members a vocabulary guide one week before each meeting. You do not need to finish every page. Come ready to share one idea or question. The first meeting is free.',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Who is the club especially designed for?', correctIndex: 0,
        options: ['People who find long English books difficult', 'Writers preparing their first novel', 'Teachers choosing school textbooks'],
        rationale: 'The opening question directly addresses readers who want more English practice but struggle with long novels.',
        distractorRationales: ['The club reads books; it does not teach novel writing.', 'No textbook-selection task is described.'],
      },
      {
        subdomain: 'detail', prompt: 'When do members receive the vocabulary guide?', correctIndex: 1,
        options: ['At the end of each meeting', 'One week before the meeting', 'On the first day of the year'],
        rationale: 'The notice says the guide is sent one week before each meeting.',
        distractorRationales: ['The guide is preparation, so it comes before, not after.', 'The schedule is tied to each meeting, not the year.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'office-kitchen', title: 'Shared kitchen update',
    text: 'From Monday, the shared kitchen on the third floor will close at 3 p.m. for five days while the sink is replaced. Staff may use the kitchen on the first floor, but its refrigerator is small, so please bring only food that you will eat that day. Cups and drinking water will remain available beside the third-floor meeting rooms.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What is the main reason for this message?', correctIndex: 2,
        options: ['To introduce a new lunch menu', 'To ask staff to buy a refrigerator', 'To explain temporary kitchen arrangements'],
        rationale: 'The message explains a temporary closure and where staff can prepare food and find drinks meanwhile.',
        distractorRationales: ['No menu is introduced.', 'The small refrigerator affects what staff bring but is not a purchase request.'],
      },
      {
        subdomain: 'detail', prompt: 'What will still be available on the third floor?', correctIndex: 0,
        options: ['Cups and drinking water', 'A working kitchen sink', 'A large refrigerator'],
        rationale: 'The final sentence says cups and drinking water will remain beside the meeting rooms.',
        distractorRationales: ['The sink is being replaced.', 'The small refrigerator is on the first floor.'],
      },
    ],
  },
];

const upperTestlets: readonly ReadingTestletSeed[] = [
  {
    level: 'B1', slug: 'cycle-library', title: 'Borrow a bicycle',
    text: 'The town library has added bicycles to the things members can borrow. The scheme began after residents said that buses did not reach several popular walking routes. Adults with a library card may reserve a bicycle online for up to one day. Helmets and basic repair kits are included. The library does not charge a hire fee, but borrowers must pay for damage caused by careless use. During the first month, staff will offer a short safety session every Saturday morning. If demand is high, the library hopes to add children’s bicycles next spring.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What is the text mainly announcing?', correctIndex: 0,
        options: ['A new bicycle-lending service at the library', 'A reduction in local bus routes', 'A weekly course for bicycle mechanics'],
        rationale: 'Most of the text explains who can borrow the new bicycles, under what conditions, and what support is included.',
        distractorRationales: ['Bus access explains the need but no service reduction is announced.', 'The Saturday session concerns safety, not professional repair training.'],
      },
      {
        subdomain: 'detail', prompt: 'When may borrowers attend a safety session during the first month?', correctIndex: 1,
        options: ['Every weekday evening', 'On Saturday mornings', 'Next spring only'],
        rationale: 'The text explicitly schedules the initial safety sessions for every Saturday morning.',
        distractorRationales: ['No weekday evening sessions are mentioned.', 'Next spring refers to possible children’s bicycles.'],
      },
    ],
  },
  {
    level: 'B1', slug: 'repair-cafe', title: 'Why I volunteer at the repair café',
    text: 'When our neighbourhood repair café opened, I expected people to bring broken lamps and leave while someone fixed them. Instead, visitors sit beside a volunteer and learn how to examine the problem themselves. Last week, a teenager repaired a radio with help from a retired engineer; both said they had learned something. Not every object can be saved, and the café never promises success. Still, even an unsuccessful repair can show a visitor why a product failed and how to choose a better replacement. For me, that shared knowledge matters as much as reducing waste.',
    questions: [
      {
        subdomain: 'purpose', prompt: 'What is the writer’s main purpose?', correctIndex: 2,
        options: ['To advertise a paid engineering course', 'To complain that visitors bring unsuitable objects', 'To explain what makes the repair café valuable'],
        rationale: 'The writer describes the café’s collaborative learning and environmental value rather than merely its repair results.',
        distractorRationales: ['The café uses volunteers and no paid course is offered.', 'Unsuccessful repairs are presented as useful learning, not as a complaint.'],
      },
      {
        subdomain: 'inference', prompt: 'What surprised the writer about the café?', correctIndex: 0,
        options: ['Visitors participate in diagnosing and repairing objects.', 'Every damaged object can be repaired.', 'Only professional engineers are allowed to help.'],
        rationale: 'The contrast between the writer’s expectation and “Instead” shows surprise at visitors learning beside volunteers.',
        distractorRationales: ['The text explicitly says not every object can be saved.', 'A retired engineer is one example, but the helpers are described generally as volunteers.'],
      },
    ],
  },
  {
    level: 'B1', slug: 'flexible-shifts', title: 'A four-day scheduling trial',
    text: 'A small design company tested a four-day working week for three months. Employees worked the same total number of hours, so their four days were slightly longer. Managers expected productivity to fall late in the day, but completed projects remained stable and sick leave decreased. Some clients, however, found it difficult to reach the right employee on Fridays. The company has therefore kept the shorter week but introduced a rotating Friday team. Staff can volunteer for that team and take a different day off. The arrangement will be reviewed again after six months.',
    questions: [
      {
        subdomain: 'detail', prompt: 'What problem appeared during the trial?', correctIndex: 1,
        options: ['Employees completed substantially fewer projects during the trial.', 'Some clients could not contact the appropriate person on Fridays.', 'Sick leave increased because the days were longer.'],
        rationale: 'The text identifies Friday contact with the right employee as the difficulty clients experienced.',
        distractorRationales: ['Completed projects remained stable.', 'Sick leave decreased rather than increased.'],
      },
      {
        subdomain: 'inference', prompt: 'Why did the company introduce a rotating Friday team?', correctIndex: 2,
        options: ['To make every employee work five days', 'To reduce the total hours employees work', 'To preserve client access while keeping the four-day option'],
        rationale: 'The rotating team directly addresses Friday availability without ending the shorter-week arrangement.',
        distractorRationales: ['Volunteers take another day off, so not everyone moves to five days.', 'The original and revised arrangements retain the same total hours.'],
      },
    ],
  },
  {
    level: 'B1', slug: 'museum-sensory-hours', title: 'Quieter hours at the museum',
    text: 'Our city museum will trial “quiet hours” on the second Sunday of each month. Between 9 and 11 a.m., visitor numbers will be limited, recorded announcements will be switched off, and lighting in two galleries will be softened. The change was suggested by families whose children find crowded or noisy spaces difficult. All visitors may book these sessions, but the museum asks them to keep phone calls and group conversations brief. A map showing the quietest route will be available at reception. Regular opening conditions will return at 11 a.m.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What change is the museum testing?', correctIndex: 0,
        options: ['A less crowded and less noisy visiting period', 'Free entry for children every Sunday', 'Longer opening hours for two galleries'],
        rationale: 'The announcement combines limited attendance, no recorded announcements, and softer lighting in a designated period.',
        distractorRationales: ['The text does not mention free entry.', 'The galleries change conditions, not their opening duration.'],
      },
      {
        subdomain: 'detail', prompt: 'What does the museum request from people who book a quiet session?', correctIndex: 1,
        options: ['They must follow only one route.', 'They should limit calls and group conversations.', 'They must leave their phones at reception.'],
        rationale: 'Visitors are asked to keep phone calls and group conversations brief.',
        distractorRationales: ['The quiet route is available as guidance, not compulsory.', 'Phones are not collected or prohibited.'],
      },
    ],
  },
  {
    level: 'B1', slug: 'phone-free-walk', title: 'The phone-free walking group',
    text: 'I joined a phone-free walking group because I wanted a break from messages. At the first meeting, the organiser asked us to switch our phones off but explained that one emergency phone would remain available. I initially worried that walking without taking photographs would feel pointless. After a few weeks, however, I noticed that I remembered routes and conversations more clearly. The rule has not made everyone silent or perfectly attentive; people still become distracted. It has simply removed one common interruption and made it easier for strangers to talk to each other.',
    questions: [
      {
        subdomain: 'inference', prompt: 'How did the writer’s attitude change?', correctIndex: 2,
        options: ['The writer decided all phones are dangerous.', 'The writer became disappointed that people still talked.', 'The writer came to value the experience without constant phone use.'],
        rationale: 'The writer moves from concern about missing photographs to noticing clearer memories and easier conversation.',
        distractorRationales: ['The text makes a limited claim about interruption, not danger.', 'Conversation with strangers is presented as a benefit.'],
      },
      {
        subdomain: 'detail', prompt: 'How does the group prepare for an emergency?', correctIndex: 0,
        options: ['It keeps one shared phone available for emergency calls.', 'It ends every walk after a few minutes.', 'It asks each walker to leave a phone switched on.'],
        rationale: 'The organiser keeps one emergency phone available while participants switch theirs off.',
        distractorRationales: ['No unusually short walk is described.', 'Participants are asked to switch their own phones off.'],
      },
    ],
  },
  {
    level: 'B1', slug: 'school-garden', title: 'Learning from the school garden',
    text: 'Our school garden began as a science project, but teachers now use it in several subjects. Mathematics classes measure beds and compare crop growth, while art students sketch changes across the seasons. The garden has also supplied herbs for cooking lessons, although it cannot produce enough food for the whole school. This year, students proposed selling small herb plants to fund new tools. The head teacher approved the idea on condition that students keep clear accounts and explain the project to buyers. The aim is to make the garden more independent, not to turn it into a business.',
    questions: [
      {
        subdomain: 'structure', prompt: 'Why does the writer mention mathematics, art and cooking?', correctIndex: 1,
        options: ['To argue that science should be removed from the timetable', 'To show that the garden supports learning across subjects', 'To list the only classes students enjoy'],
        rationale: 'The examples develop the claim that teachers now use the garden in several subjects.',
        distractorRationales: ['The garden started as science and the subject is not criticised.', 'The text discusses uses of the garden, not student preferences.'],
      },
      {
        subdomain: 'purpose', prompt: 'Why will students sell herb plants?', correctIndex: 2,
        options: ['To provide every meal served at the school', 'To establish a permanent commercial business run by students', 'To raise money for tools and support the garden'],
        rationale: 'The sales are proposed specifically to fund new tools and make the garden more independent.',
        distractorRationales: ['The garden cannot produce enough food for the whole school.', 'The final sentence explicitly rejects turning it into a business.'],
      },
    ],
  },
  {
    level: 'B2', slug: 'algorithmic-schedules', title: 'When software writes the rota',
    text: 'A supermarket chain recently introduced software that predicts customer demand and assigns staff shifts accordingly. Managers welcomed the reduction in time spent preparing rotas, and the company reported fewer periods with too few employees at the tills. Yet staff criticised the system for treating availability as fixed data rather than part of people’s changing lives. A parent who had marked Tuesday as available, for example, could repeatedly receive late shifts even after childcare arrangements changed. In response, the company added a way to rank preferred hours and required managers to review unusually disruptive schedules. The software still proposes the rota, but the revised process recognises that efficiency is not the only relevant measure.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What central tension does the text examine?', correctIndex: 0,
        options: ['Efficient automated scheduling versus employees’ changing needs', 'Online shopping versus visiting physical supermarkets', 'Managers’ salaries versus the cost of new software'],
        rationale: 'The passage contrasts operational gains from automated rotas with the need to account for workers’ real circumstances.',
        distractorRationales: ['Shopping channels are not discussed.', 'Neither management pay nor software price is mentioned.'],
      },
      {
        subdomain: 'inference', prompt: 'What does the revised process imply about the company’s view of the software?', correctIndex: 1,
        options: ['It should be removed because its predictions are useless.', 'It is useful, but its proposals require human oversight.', 'It should make final decisions without employee information.'],
        rationale: 'The company keeps the software while adding preferences and mandatory managerial review.',
        distractorRationales: ['The reported staffing improvements show that the predictions have value.', 'The revision adds employee information and human review rather than removing them.'],
      },
    ],
  },
  {
    level: 'B2', slug: 'urban-tree-targets', title: 'Counting trees is not enough',
    text: 'Many cities announce tree-planting targets as evidence of environmental progress. The numbers are easy to communicate, but they can conceal whether young trees survive long enough to provide shade, habitat or cooler streets. Planting thousands of unsuitable species in compacted soil may produce an impressive first-year total and little lasting benefit. Some urban ecologists therefore recommend reporting canopy growth and survival after five years, alongside the initial planting figure. This approach is slower and less dramatic, and it makes comparison between cities more complicated because climate and available space differ. Nevertheless, it shifts attention from a visible activity to the environmental outcome the activity is supposed to achieve.',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Why does the writer contrast planting totals with five-year survival?', correctIndex: 2,
        options: ['To show that all cities should plant the same species', 'To argue that urban trees create no measurable benefits', 'To distinguish an immediate activity measure from a lasting outcome'],
        rationale: 'The contrast supports the argument that initial counts may not show whether planting achieves environmental benefits.',
        distractorRationales: ['The passage notes that conditions differ, so identical species are not proposed.', 'Shade, habitat and cooling are explicitly named as benefits.'],
      },
      {
        subdomain: 'meaning-in-context', prompt: 'What does “conceal” most nearly mean in this context?', correctIndex: 0,
        options: ['Hide from view or understanding', 'Measure with greater precision', 'Cause to grow more rapidly'],
        rationale: 'The simple planting number can hide the more important question of long-term survival and benefit.',
        distractorRationales: ['Concealment reduces understanding rather than improving measurement.', 'The word describes information, not biological growth.'],
      },
    ],
  },
  {
    level: 'B2', slug: 'community-archive', title: 'Who describes the archive?',
    text: 'A regional museum is digitising photographs donated by local families. At first, curators planned to write every description themselves to ensure consistent dates, names and keywords. Community groups objected that a technically tidy catalogue might still misrepresent events whose meaning was known mainly to participants. The museum now invites donors to record memories alongside the standard catalogue entry. Curators verify factual claims where possible and label personal recollections as such rather than forcing them into a single official account. The result is less uniform, but it lets users distinguish documented facts from remembered experience. The project suggests that accuracy and multiple perspectives need not be rivals if the archive makes the status of each claim visible.',
    questions: [
      {
        subdomain: 'detail', prompt: 'How does the museum handle personal recollections?', correctIndex: 1,
        options: ['It removes them unless every detail can be proven.', 'It labels them separately while retaining them beside catalogue information.', 'It treats them automatically as official historical facts.'],
        rationale: 'The museum records memories but identifies them as personal recollections and verifies factual claims where possible.',
        distractorRationales: ['Unverified memories are labelled, not automatically removed.', 'The text explicitly distinguishes recollection from documented fact.'],
      },
      {
        subdomain: 'inference', prompt: 'Which principle best reflects the project’s final approach?', correctIndex: 2,
        options: ['Consistency matters more than community knowledge.', 'Every account of an event is equally factual.', 'Different kinds of evidence can coexist when their status is transparent.'],
        rationale: 'The conclusion argues that multiple perspectives and accuracy can coexist if claims are clearly identified.',
        distractorRationales: ['The revised design gives community knowledge a meaningful role.', 'The archive distinguishes factual verification from personal memory.'],
      },
    ],
  },
  {
    level: 'B2', slug: 'remote-work-trial', title: 'Evaluating hybrid work',
    text: 'A public agency allowed two departments to choose their office days for six months. An early staff survey showed higher satisfaction, and managers initially described the trial as an obvious success. The evaluation team advised caution. Satisfaction had been measured after only four weeks, when the novelty of greater choice may have influenced responses, and the departments had volunteered for the trial rather than being selected at random. The final review therefore combined later surveys with staff turnover, project delays and interviews with service users. Its conclusion was positive but narrower: flexible attendance worked well for these teams when they agreed shared contact hours. The trial supports expansion, the report said, but not an identical policy for every role.',
    questions: [
      {
        subdomain: 'structure', prompt: 'How is the passage organised?', correctIndex: 0,
        options: ['It presents an early conclusion, questions its evidence, and gives a more qualified finding.', 'It lists several unrelated complaints and then withdraws the trial.', 'It compares the agency with a private company in chronological order.'],
        rationale: 'The passage moves from initial enthusiasm through methodological cautions to a narrower final conclusion.',
        distractorRationales: ['The evidence forms one evaluation and the trial is not withdrawn.', 'No private company is introduced.'],
      },
      {
        subdomain: 'inference', prompt: 'Why was volunteering for the trial a limitation?', correctIndex: 1,
        options: ['Volunteers were unable to complete surveys.', 'The participating departments may not represent all roles or teams.', 'The agency needed more office space for volunteers.'],
        rationale: 'Self-selected departments may be unusually suited to flexible work, limiting generalisation.',
        distractorRationales: ['The text reports survey results, so survey completion was possible.', 'Office capacity is not identified as the methodological concern.'],
      },
    ],
  },
  {
    level: 'B2', slug: 'citizen-river-data', title: 'Can volunteer measurements be trusted?',
    text: 'A river-monitoring project asks volunteers to test water clarity and upload photographs each week. Professional scientists once viewed such observations mainly as a way to engage the public, not as evidence suitable for research. That view changed after the project introduced standard equipment, short certification exercises and automatic checks that flag unusual readings. Volunteer data still contain more variation than measurements taken by a single laboratory team. However, the network covers hundreds of sites that professionals could visit only occasionally. Researchers now use the observations to identify patterns and decide where to conduct precise follow-up tests. The value of the network lies not in replacing laboratories, but in revealing changes that a smaller, more exact system might miss.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What conclusion does the text reach about volunteer data?', correctIndex: 2,
        options: ['They should replace laboratory testing completely.', 'They are useful only for public education.', 'Their broad coverage can complement more precise professional testing.'],
        rationale: 'The final comparison presents volunteer breadth and laboratory precision as complementary strengths.',
        distractorRationales: ['The text explicitly says the network does not replace laboratories.', 'Researchers now use the observations as evidence for patterns and follow-up decisions.'],
      },
      {
        subdomain: 'detail', prompt: 'What happens when the system detects an unusual reading?', correctIndex: 0,
        options: ['An automatic check flags it for attention.', 'The volunteer is permanently removed.', 'The result is silently changed to the average.'],
        rationale: 'The project uses automatic checks that flag unusual readings.',
        distractorRationales: ['No automatic removal of volunteers is described.', 'Flagging preserves the observation for review rather than silently replacing it.'],
      },
    ],
  },
  {
    level: 'B2', slug: 'library-fines', title: 'After late fees',
    text: 'When a library abolished daily late fees, critics predicted that books would stop returning. The first year produced a more complicated picture. Some items stayed out longer, but many former users renewed their memberships after old debts were cleared, and overall borrowing increased. The library did not abandon deadlines: accounts are paused when an item is several weeks overdue, and replacement charges still apply to material declared lost. Staff also send earlier reminders and make renewal easier online. The policy therefore shifts the emphasis from accumulating small penalties to recovering books and keeping readers connected. Whether it succeeds should be judged not by fee income—which was never large—but by access, return rates and the availability of popular items.',
    questions: [
      {
        subdomain: 'meaning-in-context', prompt: 'What does “shifts the emphasis” mean here?', correctIndex: 1,
        options: ['Changes the physical location of returned books', 'Changes which goals receive the most attention', 'Makes all borrowing deadlines optional'],
        rationale: 'The policy moves attention from collecting penalties to recovering items and maintaining access.',
        distractorRationales: ['No physical relocation is described.', 'Deadlines and account pauses remain in place.'],
      },
      {
        subdomain: 'purpose', prompt: 'What does the writer argue should be used to evaluate the policy?', correctIndex: 2,
        options: ['Only the number of days each book is late', 'The amount collected in daily penalties', 'Measures of access, returns and item availability'],
        rationale: 'The final sentence explicitly proposes access, return rates and availability as the relevant outcomes.',
        distractorRationales: ['Delay is one part of the picture, not the sole criterion.', 'The text says fee income was never large and rejects it as the key measure.'],
      },
    ],
  },
];

const testlets: readonly ReadingTestletSeed[] = [...lowerTestlets, ...upperTestlets];

const REVISED_ITEM_CONTENT_VERSIONS = new Map<string, string>([
  ['en-a1-reading-05-q2', 'draft-2'],
  ['en-a2-reading-01-q2', 'draft-2'],
  ['en-b1-reading-03-q1', 'draft-2'],
  ['en-b1-reading-05-q2', 'draft-2'],
  ['en-b1-reading-06-q2', 'draft-2'],
]);

export const ENGLISH_DIAGNOSTIC_READING_CANDIDATES: readonly DiagnosticBankRecord[] = testlets.flatMap((testlet, testletIndex) => {
  const stimulusId = `en-${testlet.level.toLowerCase()}-reading-${String((testletIndex % 6) + 1).padStart(2, '0')}`;
  return testlet.questions.map((question, questionIndex): DiagnosticBankRecord => {
    const id = `${stimulusId}-q${questionIndex + 1}`;
    const contentVersion = REVISED_ITEM_CONTENT_VERSIONS.get(id) ?? 'draft-1';
    const optionIds = question.options.map((_, optionIndex) => `${id}-o${optionIndex + 1}`);
    const distractorIndexes = [0, 1, 2].filter((optionIndex) => optionIndex !== question.correctIndex);
    return {
      publicItem: {
        id,
        contentVersion,
        language: 'en',
        skill: 'reading',
        subdomain: question.subdomain,
        levelCandidate: testlet.level,
        prompt: question.prompt,
        stimulus: { kind: 'text', stimulusId, title: testlet.title, body: testlet.text },
        response: { kind: 'single-choice', optionIds },
        displayOptions: question.options.map((text, optionIndex) => ({ id: optionIds[optionIndex], text })),
      },
      status: 'reserved',
      exposure: 'reserved',
      review: { status: 'draft' },
      scoring: { kind: 'single-choice', optionId: optionIds[question.correctIndex] },
      rationale: {
        key: question.rationale,
        distractors: Object.fromEntries(distractorIndexes.map((optionIndex, rationaleIndex) => [
          optionIds[optionIndex], question.distractorRationales[rationaleIndex],
        ])),
      },
      source: {
        kind: 'welearn-original',
        reference: `${contentVersion === 'draft-1'
          ? ENGLISH_DIAGNOSTIC_READING_CANDIDATE_VERSION
          : ENGLISH_DIAGNOSTIC_READING_REVISED_VERSION}:${testlet.slug}`,
      },
      levelRange: [testlet.level, testlet.level],
      warnings: ['PENDING_INDEPENDENT_LINGUISTIC_REVIEW', 'PENDING_PILOT_CALIBRATION'],
    };
  });
});
