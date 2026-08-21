import {
  fixedCtwBlanks,
  fixedReadingItem,
  fixedReadingModule2,
  type ToeflFixedReadingPassage,
} from './reading-module2-types.ts';

const CTW_INSTRUCTIONS = 'Complete each word with the missing letters. Write only the letters that are not shown.';
const DAILY_INSTRUCTIONS = 'Read the everyday text and choose one answer for each question.';
const ACADEMIC_INSTRUCTIONS = 'Read the academic passage and choose one answer for questions 1–5.';

function passage(
  id: string,
  title: string,
  instructions: string,
  text: string,
  items: ToeflFixedReadingPassage['items'],
): ToeflFixedReadingPassage {
  return { id, title, instructions, text, items };
}

export const TOEFL_READING_MODULE2_SET1 = fixedReadingModule2(1, {
  completeWords: {
    id: 't1-r-m2-ctw-v1', objectId: 'object:t1-r-m2-ctw-v1', version: 1,
    title: 'Kelp Forests', instructions: CTW_INSTRUCTIONS,
    template: 'Kelp forests grow along cool, shallow coastlines where sunlight reaches the seafloor. They {{1}} food {{2}} shelter {{3}} many {{4}} species, {{5}} holdfasts {{6}} each {{7}} to {{8}} beneath {{9}} moving {{10}}. Flexible stems bend with waves instead of breaking. Sea otters can indirectly protect some kelp forests by eating sea urchins that would otherwise consume large amounts of kelp. Storms, warming water, and changes in grazing animals can all alter these productive underwater habitats. Kelp growth also stores carbon in fast-growing marine tissue.',
    blanks: fixedCtwBlanks(1, [['pro', 4], ['a', 2], ['f', 2], ['mar', 3], ['wh', 3], ['att', 3], ['pl', 3], ['ro', 3], ['t', 2], ['wa', 3]]),
  },
  dailyLife: [
    passage('t1-r-m2-dl-a', 'Campus bicycle repair station', DAILY_INSTRUCTIONS,
      `CAMPUS BICYCLE REPAIR STATION\n\nThe self-service repair station beside North Hall will be unavailable on Tuesday, April 8, while new tools are installed. Cyclists may use the station behind the recreation center instead. That station has pumps and basic tools but does not sell replacement parts. For urgent repairs requiring parts, present a student card at Green Street Cycles to receive a 10 percent discount.`, [
        fixedReadingItem(1, 'dl1', 'Why will the North Hall repair station be unavailable?', ['A cycling event will use the area.', 'New tools are being installed.', 'The station is moving permanently.', 'The recreation center is closing.']),
        fixedReadingItem(1, 'dl2', 'What should a student do if an urgent repair requires replacement parts?', ['Wait until the following month.', 'Borrow parts from North Hall.', 'Show a student card at Green Street Cycles for a discount.', 'Use the pump behind the recreation center.']),
      ]),
    passage('t1-r-m2-dl-b', 'Study-room reservation confirmation', DAILY_INSTRUCTIONS,
      `From: University Library\nSubject: Group room reservation\n\nYour reservation for Room 3B is confirmed for Thursday from 2:00 to 3:30 p.m. The room is on the third floor and seats six people. Check in at the touchscreen outside the room within ten minutes of the start time; otherwise, the booking will be released. Food is not permitted, but drinks in covered containers are allowed. To cancel, use the link in your original confirmation email.`, [
        fixedReadingItem(1, 'dl3', 'What must the group do to keep the reservation?', ['Arrive before the library opens.', 'Call the front desk on Thursday morning.', 'Check in at the touchscreen by 2:10 p.m.', 'Bring at least six people.']),
        fixedReadingItem(1, 'dl4', 'Which item is allowed in Room 3B?', ['A sandwich', 'Coffee in a cup with a lid', 'Hot food', 'An uncovered glass of juice']),
        fixedReadingItem(1, 'dl5', 'How can the reservation be canceled?', ['At the touchscreen only', 'By replying to the message', 'By visiting the third floor', 'By using the link in the original confirmation email']),
      ]),
  ],
  academic: passage('t1-r-m2-ap', 'Mangrove Forests', ACADEMIC_INSTRUCTIONS,
    `Mangroves are salt-tolerant trees and shrubs that grow along sheltered tropical and subtropical coasts. Living at the boundary between land and sea exposes them to changing tides, soft sediment, and water that may contain more salt than most plants can tolerate. Different mangrove species cope by excluding salt at their roots, removing it through leaves, or storing it in tissues that are later shed.\n\nTheir tangled roots change the surrounding environment. The roots slow moving water and trap suspended sediment, which can help stabilize shorelines. They also create protected spaces where juvenile fish and other animals find food and avoid larger predators. During some storms, wide mangrove belts can reduce wave energy before it reaches inland areas, although the protection varies with the storm and the structure of the forest.\n\nMangroves have been cleared for coastal construction, timber, and aquaculture. Restoration is not simply a matter of planting large numbers of seedlings. Projects are more likely to succeed when they first restore suitable water flow and elevation, then use species matched to local conditions. Long-term monitoring shows whether water flow, sediment, and young trees remain suitable after planting.`, [
      fixedReadingItem(1, 'ap1', 'What challenge of coastal life is mentioned in the first paragraph?', ['A complete lack of sunlight', 'Water that may be unusually salty', 'Permanent frozen soil', 'An absence of tides']),
      fixedReadingItem(1, 'ap2', 'How can mangrove roots help stabilize a shoreline?', ['They heat the surrounding water.', 'They dissolve rock beneath the coast.', 'They slow water and trap suspended sediment.', 'They prevent all storms from reaching land.']),
      fixedReadingItem(1, 'ap3', 'Why do juvenile fish use mangrove roots?', ['The roots provide protected spaces with food.', 'The roots make seawater completely fresh.', 'The roots eliminate all predators.', 'The roots produce artificial light.']),
      fixedReadingItem(1, 'ap4', 'What does the passage say about storm protection from mangroves?', ['It occurs only in cold climates.', 'It is identical for every storm.', 'It depends only on tree height.', 'It varies with the storm and forest structure.']),
      fixedReadingItem(1, 'ap5', 'According to the final paragraph, what should restoration projects do before planting?', ['Remove all tidal water.', 'Restore suitable hydrology and elevation.', 'Use a single species everywhere.', 'Replace sediment with concrete.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET2 = fixedReadingModule2(2, {
  completeWords: {
    id: 't2-r-m2-ctw-v1', objectId: 'object:t2-r-m2-ctw-v1', version: 1,
    title: 'Snowflakes', instructions: CTW_INSTRUCTIONS,
    template: 'Snowflakes form when water vapor freezes around tiny particles inside a cold cloud. Each {{1}} begins {{2}} water {{3}} freezes {{4}} a {{5}} particle, {{6}} temperature {{7}} humidity {{8}} its {{9}} as {{10}} grows. The six-sided symmetry comes from the molecular arrangement of water in ice. Because every crystal follows a different path through changing air, two large snowflakes are unlikely to develop exactly the same detailed pattern. Small crystals may also collide and join while falling toward Earth.',
    blanks: fixedCtwBlanks(2, [['cry', 4], ['wh', 2], ['va', 3], ['aro', 3], ['ti', 2], ['a', 2], ['a', 2], ['infl', 5], ['sh', 3], ['i', 1]]),
  },
  dailyLife: [
    passage('t2-r-m2-dl-a', 'Museum printmaking workshop', DAILY_INSTRUCTIONS,
      `SATURDAY PRINTMAKING WORKSHOP\n\nLearn to create a two-color print with artist Lena Ortiz. The workshop runs from 10:00 a.m. to 1:00 p.m. and is suitable for beginners aged 16 and over. The $18 fee includes ink and paper. Participants should bring an apron or old shirt. Space is limited to twelve people, and registration closes Thursday at noon unless all places are filled earlier.`, [
        fixedReadingItem(2, 'dl1', 'What is included in the workshop fee?', ['An apron', 'Lunch', 'Ink and paper', 'A framed print']),
        fixedReadingItem(2, 'dl2', 'Why might registration close before Thursday at noon?', ['The artist may cancel.', 'All twelve places may be filled.', 'The museum closes on Thursday.', 'Only experienced artists may attend.']),
      ]),
    passage('t2-r-m2-dl-b', 'Apartment water interruption', DAILY_INSTRUCTIONS,
      `NOTICE TO RESIDENTS\n\nWater will be turned off in Buildings A and B on Wednesday from 9:00 a.m. until approximately 1:00 p.m. so a damaged valve can be replaced. Please store enough water in advance for essential use. The laundry room will remain locked until service is restored. If water appears cloudy afterward, let the cold tap run for two minutes. Contact the management office if it does not clear.`, [
        fixedReadingItem(2, 'dl3', 'Why will the water be turned off?', ['The building is being painted.', 'A damaged valve must be replaced.', 'The laundry room is moving.', 'Residents used too much water.']),
        fixedReadingItem(2, 'dl4', 'When can residents use the laundry room again?', ['As soon as the water service is restored', 'Before 9:00 a.m. only', 'The following week', 'While the valve is being replaced']),
        fixedReadingItem(2, 'dl5', 'What should a resident do first if the water looks cloudy afterward?', ['Drink it immediately.', 'Call the fire department.', 'Run the cold tap for two minutes.', 'Use the hot tap for ten minutes.']),
      ]),
  ],
  academic: passage('t2-r-m2-ap', 'The Honeybee Waggle Dance', ACADEMIC_INSTRUCTIONS,
    `A honeybee that discovers a rich food source can recruit nestmates through a patterned movement called the waggle dance. On a vertical comb inside the dark hive, the returning forager repeatedly walks through a straight “waggle run” and then circles back. Other bees follow closely and detect the dancer's movements.\n\nThe dance conveys both direction and distance. The angle of the waggle run relative to vertical represents the angle of the food source relative to the Sun. A longer waggle phase generally indicates a greater distance. Because the Sun moves across the sky, bees adjust the dance over time. Recruits also use floral odor carried by the forager and odors near the hive to help identify the advertised resource.\n\nThe system is informative rather than perfectly precise. Wind, terrain, and the quality of the food can affect a forager's movements and the recruits' search. Even so, experiments in which researchers changed visual landmarks or shifted the apparent position of the Sun showed that bees respond systematically to the directional information in the dance. Individual recruits may still explore nearby before locating the exact patch.`, [
      fixedReadingItem(2, 'ap1', 'Where does the waggle dance described in the passage occur?', ['On flowers outside the hive', 'In open water', 'On a vertical comb inside the hive', 'Only during flight']),
      fixedReadingItem(2, 'ap2', 'What does the angle of the waggle run communicate?', ['The direction of the food relative to the Sun', 'The age of the dancing bee', 'The number of bees in the hive', 'The temperature outside']),
      fixedReadingItem(2, 'ap3', 'What generally indicates that a food source is farther away?', ['A quieter hive', 'A smaller circle', 'A shorter waggle phase', 'A longer waggle phase']),
      fixedReadingItem(2, 'ap4', 'Besides the dance, what can help recruits identify the food source?', ['The color of the comb', 'Floral odor carried by the forager', 'The size of the queen', 'The temperature of stored honey']),
      fixedReadingItem(2, 'ap5', 'What did experiments that altered landmarks or apparent Sun position demonstrate?', ['Bees ignore directional information.', 'Only young bees can dance.', 'Bees respond systematically to directional information in the dance.', 'Every recruit flies along exactly the same path.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET3 = fixedReadingModule2(3, {
  completeWords: {
    id: 't3-r-m2-ctw-v1', objectId: 'object:t3-r-m2-ctw-v1', version: 1,
    title: 'Cave Formation', instructions: CTW_INSTRUCTIONS,
    template: 'Many limestone caves form as slightly acidic groundwater moves through cracks in rock. Rainwater {{1}} carbon {{2}} from {{3}} air {{4}} soil, {{5}} a {{6}} acid {{7}} gradually {{8}} limestone {{9}} existing {{10}}. Over long periods, flowing water enlarges narrow openings into passages and chambers. Mineral-rich drops can later build deposits such as stalactites on ceilings and stalagmites on floors. These formations grow slowly and can preserve clues about past environmental conditions. Cave ecosystems often support organisms adapted to darkness.',
    blanks: fixedCtwBlanks(3, [['abs', 4], ['dio', 4], ['t', 2], ['a', 2], ['crea', 4], ['we', 2], ['th', 2], ['diss', 5], ['al', 3], ['cra', 3]]),
  },
  dailyLife: [
    passage('t3-r-m2-dl-a', 'New employee safety training', DAILY_INSTRUCTIONS,
      `WELCOME TO HARBOR FOODS\n\nAll new employees must complete the online safety course before their first scheduled shift. The course takes about 45 minutes and can be accessed from home. After finishing it, save the completion certificate and email it to training@harborfoods.example. Employees who do not submit the certificate will attend an in-person session on Friday at 8:00 a.m.`, [
        fixedReadingItem(3, 'dl1', 'When must a new employee finish the online course?', ['Before the first scheduled shift', 'Within a month of starting', 'After the Friday session', 'Only after receiving a uniform']),
        fixedReadingItem(3, 'dl2', 'Who must attend the Friday session?', ['Every employee', 'Employees working from home', 'Employees who did not submit a completion certificate', 'Only store managers']),
      ]),
    passage('t3-r-m2-dl-b', 'Train delay message', DAILY_INSTRUCTIONS,
      `Travel alert: The 6:40 p.m. train from Lakeside to Central is delayed by approximately 25 minutes because of a signal problem. Passengers for Airport Terminal should remain on this train; the connecting airport service will wait at Central. Passengers for East Market may take Bus 14 from the stop outside Lakeside Station at no extra cost by showing their rail ticket.`, [
        fixedReadingItem(3, 'dl3', 'What caused the train delay?', ['A signal problem', 'Severe weather', 'A shortage of buses', 'An airport closure']),
        fixedReadingItem(3, 'dl4', 'What should passengers for Airport Terminal do?', ['Take Bus 14.', 'Request a refund.', 'Leave the station.', 'Remain on the delayed train.']),
        fixedReadingItem(3, 'dl5', 'How can a passenger ride Bus 14 at no extra cost?', ['By buying an airport ticket', 'By showing a rail ticket', 'By calling Central Station', 'By traveling after 7:00 p.m.']),
      ]),
  ],
  academic: passage('t3-r-m2-ap', 'Moving Plates', ACADEMIC_INSTRUCTIONS,
    `Earth's outer shell is divided into rigid tectonic plates. These plates include the crust and the uppermost mantle, together called the lithosphere. They move slowly over a hotter, mechanically weaker layer below. The movement is usually measured in centimeters per year, but over millions of years it rearranges oceans and continents.\n\nPlate boundaries have different effects. At divergent boundaries, plates move apart and new oceanic crust can form as molten material rises and cools. At convergent boundaries, plates move together; one plate may descend beneath another, or two continents may collide and build mountains. At transform boundaries, plates slide horizontally past each other, often producing earthquakes.\n\nSeveral lines of evidence helped establish plate tectonics. Matching fossils and rock formations occur on continents now separated by oceans. Maps of the seafloor revealed long ridges and symmetrical patterns of magnetic minerals on either side of them. Those patterns record repeated reversals of Earth's magnetic field as new crust formed and moved away from the ridges. Modern satellite measurements can detect plate motion directly, confirming that the slow process continues today across the planet.`, [
      fixedReadingItem(3, 'ap1', 'What is the lithosphere?', ['Only the liquid outer core', 'The atmosphere and oceans', 'The weak layer below the plates', 'The crust and uppermost mantle that form rigid plates']),
      fixedReadingItem(3, 'ap2', 'What can happen at a divergent boundary?', ['Old crust always becomes a mountain.', 'New oceanic crust can form.', 'Two continents stop moving.', 'The magnetic field disappears.']),
      fixedReadingItem(3, 'ap3', 'Which movement describes a transform boundary?', ['Plates rise vertically together.', 'One plate melts without moving.', 'Plates slide horizontally past each other.', 'Plates move apart and never cause earthquakes.']),
      fixedReadingItem(3, 'ap4', 'Why are matching fossils on separated continents important?', ['They support the idea that continents were once connected.', 'They prove every fossil formed in the ocean.', 'They show that plates move meters each day.', 'They explain magnetic reversals.']),
      fixedReadingItem(3, 'ap5', 'What do symmetrical magnetic patterns beside ocean ridges record?', ['Changes in ocean temperature', 'The age of continental fossils', 'Daily tides', 'Magnetic reversals recorded as new crust formed and spread']),
    ]),
});

export const TOEFL_READING_MODULE2_SET4 = fixedReadingModule2(4, {
  completeWords: {
    id: 't4-r-m2-ctw-v1', objectId: 'object:t4-r-m2-ctw-v1', version: 1,
    title: 'Seed Dispersal', instructions: CTW_INSTRUCTIONS,
    template: 'Plants use several methods to move seeds away from the parent plant. Wind {{1}} light {{2}}, while {{3}} moves {{4}} that {{5}} float; {{6}} fruits {{7}} animals {{8}} carry {{9}} elsewhere {{10}}. Other plants produce hooks that cling to fur or clothing, and some pods throw seeds when they split open. Dispersal can reduce competition for light, water, and nutrients. It can also help a species colonize suitable habitat beyond the shadow of the parent. Reaching a new place does not guarantee successful germination.',
    blanks: fixedCtwBlanks(4, [['car', 4], ['se', 3], ['wa', 3], ['th', 3], ['c', 2], ['a', 2], ['att', 4], ['th', 2], ['se', 3], ['la', 3]]),
  },
  dailyLife: [
    passage('t4-r-m2-dl-a', 'Clinic appointment reminder', DAILY_INSTRUCTIONS,
      `Appointment reminder for Jordan Lee: Tuesday, May 12, at 3:20 p.m., River Health Clinic, second floor. Please arrive 15 minutes early and bring photo identification and your current medication list. If you have fever or respiratory symptoms, call before entering the building. Cancellations made less than 24 hours in advance may result in a fee.`, [
        fixedReadingItem(4, 'dl1', 'What should Jordan bring to the appointment?', ['Photo identification and a current medication list', 'A completed job application', 'Food for the waiting room', 'A printed bus schedule']),
        fixedReadingItem(4, 'dl2', 'What should Jordan do after developing a fever?', ['Arrive thirty minutes late.', 'Cancel online without explanation.', 'Go directly to the second floor.', 'Call the clinic before entering.']),
      ]),
    passage('t4-r-m2-dl-b', 'Community garden orientation', DAILY_INSTRUCTIONS,
      `Welcome, new garden members! Orientation is Saturday at 9:30 a.m. at the tool shed and will continue even if there is light rain. We will explain compost rules, water access, and shared-tool storage. Bring gardening gloves if you have them; all other equipment will be provided. Members who cannot attend must watch the orientation video before receiving the gate code.`, [
        fixedReadingItem(4, 'dl3', 'Where will the orientation begin?', ['At the parking entrance', 'At the tool shed', 'Inside the greenhouse', 'At the city library']),
        fixedReadingItem(4, 'dl4', 'What should participants bring if they have it?', ['Their own water pump', 'A gate lock', 'Gardening gloves', 'Compost from home']),
        fixedReadingItem(4, 'dl5', 'How can an absent member qualify to receive the gate code?', ['Pay an additional fee.', 'Attend during heavy rain.', 'Borrow another member’s code.', 'Watch the orientation video.']),
      ]),
  ],
  academic: passage('t4-r-m2-ap', 'Coral Bleaching', ACADEMIC_INSTRUCTIONS,
    `Many reef-building corals live in partnership with microscopic algae inside their tissues. The algae use sunlight to produce energy-rich compounds, and much of that energy becomes available to the coral. The algae also contribute to the colors seen in healthy coral colonies.\n\nWhen corals experience stress, especially unusually warm water, this partnership can break down. The coral expels many of the algae, revealing the pale skeleton beneath its transparent tissue. This response is called bleaching. A bleached coral is not necessarily dead, but it has lost an important energy source and is more vulnerable to disease and starvation. If temperatures return to normal soon enough, algae may repopulate the tissue and the coral can recover. Prolonged or repeated heat stress greatly increases mortality.\n\nReducing local pressures such as pollution and destructive fishing can improve a reef's ability to recover, but local action cannot by itself prevent marine heat waves. Scientists therefore combine reef monitoring and restoration experiments with efforts to limit the broader warming that drives frequent mass-bleaching events. Recovery can take years and differs among coral species and locations.`, [
      fixedReadingItem(4, 'ap1', 'What do the microscopic algae provide to reef-building corals?', ['Energy-rich compounds produced through photosynthesis', 'A hard external shell', 'Protection from every disease', 'Cold water from the deep ocean']),
      fixedReadingItem(4, 'ap2', 'Why does a stressed coral look pale during bleaching?', ['It produces more skeleton.', 'Its tissue becomes thicker.', 'It expels algae that contribute color.', 'It moves into deeper water.']),
      fixedReadingItem(4, 'ap3', 'What is true of a bleached coral?', ['It is always already dead.', 'It may recover if suitable conditions return soon enough.', 'It no longer has living tissue.', 'It can survive indefinitely without energy.']),
      fixedReadingItem(4, 'ap4', 'What increases the likelihood that bleached coral will die?', ['Brief shade from clouds', 'A single cool night', 'Reduced local pollution', 'Prolonged or repeated heat stress']),
      fixedReadingItem(4, 'ap5', 'Why is local reef management insufficient by itself?', ['It cannot prevent the broader warming that causes marine heat waves.', 'It always increases fishing pressure.', 'It removes all algae from coral.', 'It prevents scientists from monitoring reefs.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET5 = fixedReadingModule2(5, {
  completeWords: {
    id: 't5-r-m2-ctw-v1', objectId: 'object:t5-r-m2-ctw-v1', version: 1,
    title: 'Urban Trees', instructions: CTW_INSTRUCTIONS,
    template: 'Urban trees can moderate heat and provide useful green space in crowded neighborhoods. Their {{1}} provide {{2}}, and {{3}} from {{4}} can {{5}} nearby {{6}}; roots {{7}} rainwater, {{8}} branches {{9}} habitat {{10}} wildlife. Trees also store carbon as they grow. However, cities must choose species carefully, provide enough soil, and maintain young trees. Poor placement can damage sidewalks or utilities, while drought and compacted soil can limit survival and reduce long-term benefits. Diverse plantings can also reduce vulnerability to a single pest.',
    blanks: fixedCtwBlanks(5, [['lea', 3], ['sh', 3], ['evapo', 6], ['fol', 4], ['co', 2], ['a', 2], ['abs', 3], ['wh', 3], ['of', 3], ['f', 2]]),
  },
  dailyLife: [
    passage('t5-r-m2-dl-a', 'Course waitlist update', DAILY_INSTRUCTIONS,
      `Subject: Your place in Introduction to Design\n\nA seat is now available for you. To accept it, log in to the student portal and register by 5:00 p.m. tomorrow. If you take no action, the offer will expire and the next person on the waitlist will be contacted. Registering for this course may create a time conflict with History 204, so review your schedule before accepting.`, [
        fixedReadingItem(5, 'dl1', 'What must the student do to accept the seat?', ['Visit the design office next week.', 'Reply to the email.', 'Register through the portal by the deadline.', 'Contact the next person on the waitlist.']),
        fixedReadingItem(5, 'dl2', 'What should the student check before accepting?', ['Whether the course conflicts with History 204', 'Whether the design building is open', 'Whether the waitlist is alphabetical', 'Whether tomorrow is a holiday']),
      ]),
    passage('t5-r-m2-dl-b', 'Outdoor film cancellation', DAILY_INSTRUCTIONS,
      `Tonight's outdoor film in Miller Park has been canceled because thunderstorms are expected. Ticket holders may use the same ticket for the rescheduled screening next Friday at 8:30 p.m. or request a refund through the ticket website by Monday. Food vouchers purchased for tonight will remain valid next Friday but cannot be refunded separately. The indoor café will close at its normal time, 7:00 p.m.`, [
        fixedReadingItem(5, 'dl3', 'Why was the film canceled?', ['The projector was damaged.', 'Too few tickets were sold.', 'The café closed early.', 'Thunderstorms are expected.']),
        fixedReadingItem(5, 'dl4', 'By when must a ticket holder request a refund?', ['By Monday', 'Before 7:00 tonight', 'Next Friday after the film', 'Within one month']),
        fixedReadingItem(5, 'dl5', 'What does the notice say about food vouchers?', ['They can be refunded at the café.', 'They expire tonight.', 'They remain valid for the rescheduled screening.', 'They can be exchanged for film tickets.']),
      ]),
  ],
  academic: passage('t5-r-m2-ap', 'How Migrating Birds Navigate', ACADEMIC_INSTRUCTIONS,
    `Migratory birds often travel between breeding and wintering areas separated by thousands of kilometers. No single navigation system explains every journey. Depending on the species and conditions, birds may use the Sun, stars, Earth's magnetic field, odors, and visible landmarks. These sources can complement one another when clouds or unfamiliar terrain make one cue unreliable.\n\nSome directional tendencies are inherited. Young birds of certain species can begin their first migration without following experienced adults. Nevertheless, learning also matters. Older birds may improve routes through experience, and species that travel in social groups can transmit information between generations. Experiments in which researchers temporarily displaced birds show this difference: experienced individuals are often better than juveniles at correcting their course toward a familiar destination.\n\nHuman activity can interfere with navigation. Artificial light at night attracts or disorients many nocturnal migrants, particularly around tall illuminated structures. Habitat loss can also remove familiar resting and feeding sites. Conservation measures therefore include reducing unnecessary nighttime lighting during migration seasons and protecting networks of stopover habitat along major routes. Radar observations help researchers identify when large movements are occurring.`, [
      fixedReadingItem(5, 'ap1', 'What does the passage say about navigation cues?', ['Birds use only Earth’s magnetic field.', 'Several cues can complement one another.', 'Every species uses the same single cue.', 'Landmarks are useful only at night.']),
      fixedReadingItem(5, 'ap2', 'What suggests that part of migration behavior is inherited?', ['All birds migrate in family groups.', 'Older birds never change routes.', 'Birds cannot navigate under clouds.', 'Some young birds begin a first migration without experienced guides.']),
      fixedReadingItem(5, 'ap3', 'What have displacement experiments often found?', ['Experienced birds correct their course better than juveniles.', 'Juveniles always fly faster than adults.', 'Birds cannot return to familiar destinations.', 'Only odors influence a displaced bird.']),
      fixedReadingItem(5, 'ap4', 'How can artificial light affect nocturnal migrants?', ['It increases their food supply.', 'It teaches them a new route.', 'It can attract or disorient them.', 'It prevents clouds from forming.']),
      fixedReadingItem(5, 'ap5', 'Which conservation measure is recommended?', ['Illuminating every tall structure', 'Protecting stopover habitats along migration routes', 'Moving all birds by vehicle', 'Removing coastal landmarks']),
    ]),
});

export const TOEFL_READING_MODULE2_SETS_1_TO_5 = [
  TOEFL_READING_MODULE2_SET1,
  TOEFL_READING_MODULE2_SET2,
  TOEFL_READING_MODULE2_SET3,
  TOEFL_READING_MODULE2_SET4,
  TOEFL_READING_MODULE2_SET5,
] as const;
