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

export const TOEFL_READING_MODULE2_SET16 = fixedReadingModule2(16, {
  completeWords: {
    id: 't16-r-m2-ctw-v1', objectId: 'object:t16-r-m2-ctw-v1', version: 1,
    title: 'Earthquake Monitoring', instructions: CTW_INSTRUCTIONS,
    template: 'Earthquakes begin when accumulated stress causes rock to slip suddenly along a fault. Sensitive {{1}} record {{2}} motion {{3}} earthquakes {{4}} energy {{5}} faults, {{6}} seismic {{7}} outward {{8}} rock {{9}} many {{10}} stations. Primary waves usually arrive before secondary waves because they travel faster. Comparing arrival times at several stations helps scientists estimate an earthquake’s location. Instruments also record vibrations from traffic, weather, and other sources, so analysts must distinguish earthquake signals from background noise.',
    blanks: fixedCtwBlanks(16, [['instr', 6], ['gro', 3], ['wh', 2], ['rel', 4], ['al', 3], ['sen', 4], ['wa', 3], ['thr', 4], ['tow', 3], ['monit', 5]]),
  },
  dailyLife: [
    passage('t16-r-m2-dl-a', 'Equipment loan renewal', DAILY_INSTRUCTIONS,
      `Cameras borrowed from the Media Center may be renewed once if no other student has reserved them. Request a renewal through your library account before the original due time. Accessories must be renewed with the camera. Overdue equipment cannot be renewed online and must be returned to the service desk. Borrowers remain responsible for checking the new due date after approval.`, [
        fixedReadingItem(16, 'dl1', 'When may a borrowed camera be renewed?', ['Whenever it is already overdue', 'When no other student has reserved it', 'Only after it is returned', 'Whenever its accessories are missing']),
        fixedReadingItem(16, 'dl2', 'What must a borrower do after a renewal is approved?', ['Reserve another camera.', 'Pay at the Media Center.', 'Replace every accessory.', 'Check the new due date.']),
      ]),
    passage('t16-r-m2-dl-b', 'Campus shuttle detour', DAILY_INSTRUCTIONS,
      `From Wednesday through Friday, the Blue shuttle will skip the Science Gate because of road repairs. Riders should use the temporary stop beside North Library, about a four-minute walk away. Departure times at all later stops may be up to six minutes late. The Green route is unchanged. Real-time locations will remain available in the transit app, and normal Blue service is expected Saturday.`, [
        fixedReadingItem(16, 'dl3', 'Where is the temporary Blue shuttle stop?', ['Beside North Library', 'At the Science Gate', 'On the Green route', 'Inside the transit office']),
        fixedReadingItem(16, 'dl4', 'What delay may occur at later stops?', ['Four minutes early', 'Until the following Saturday', 'Up to six minutes', 'No delay at all']),
        fixedReadingItem(16, 'dl5', 'Which service is unchanged?', ['The road-repair schedule', 'The Green route', 'The Science Gate stop', 'The Blue route']),
      ]),
  ],
  academic: passage('t16-r-m2-ap', 'Volcanic Aerosols and Climate', ACADEMIC_INSTRUCTIONS,
    `Explosive volcanic eruptions can affect climate when they inject sulfur dioxide high into the atmosphere. If enough gas reaches the stratosphere, chemical reactions convert it into tiny sulfate aerosols. Volcanic ash is larger and generally falls out sooner, so ash and sulfate aerosols do not have the same atmospheric lifetime or climatic role.

Sulfate aerosols scatter and reflect some incoming sunlight, reducing the solar energy that reaches Earth’s surface. A major eruption can therefore cause temporary surface cooling over broad regions even while the aerosol layer absorbs energy and warms parts of the stratosphere. The effect fades as particles settle and are removed. It differs from the longer influence of greenhouse gases that accumulate in the atmosphere.

Not every eruption changes global climate. The outcome depends on how much sulfur reaches the stratosphere, the altitude and latitude of injection, the season, and the way winds distribute the plume. Scientists use satellites and ground instruments to track aerosols, then compare observations with climate models. This combination helps them separate a volcanic signal from ordinary weather variation and estimate how strongly a particular eruption altered the planet’s energy balance.`, [
      fixedReadingItem(16, 'ap1', 'What must occur for an eruption to have a substantial broad climatic effect?', ['Most ash must land near the volcano.', 'Every cloud must disappear.', 'Enough sulfur dioxide must reach the stratosphere.', 'The eruption must happen beneath the ocean.']),
      fixedReadingItem(16, 'ap2', 'How can sulfate aerosols temporarily cool Earth’s surface?', ['They scatter and reflect some incoming sunlight.', 'They permanently remove greenhouse gases.', 'They increase the size of volcanic ash.', 'They stop atmospheric circulation.']),
      fixedReadingItem(16, 'ap3', 'How does volcanic ash generally differ from sulfate aerosol?', ['It always remains above the stratosphere.', 'It has a stronger effect for centuries.', 'It is made only from water vapor.', 'It is larger and usually falls out sooner.']),
      fixedReadingItem(16, 'ap4', 'Which factor can influence the size of the climatic response?', ['The number of nearby museums', 'The altitude and latitude of sulfur injection', 'The color of the volcano’s rock', 'The local library schedule']),
      fixedReadingItem(16, 'ap5', 'Why do scientists compare observations with climate models?', ['To prevent every future eruption', 'To measure only the ash on the ground', 'To isolate and estimate the volcanic climate signal', 'To make all weather variation identical']),
    ]),
});

export const TOEFL_READING_MODULE2_SET17 = fixedReadingModule2(17, {
  completeWords: {
    id: 't17-r-m2-ctw-v1', objectId: 'object:t17-r-m2-ctw-v1', version: 1,
    title: 'Cloud Formation', instructions: CTW_INSTRUCTIONS,
    template: 'Clouds contain small water droplets, ice crystals, or a mixture of both suspended in air. Rising {{1}} expands {{2}} cools {{3}} water {{4}} condenses {{5}} tiny {{6}}, producing {{7}} droplets {{8}} together {{9}} a {{10}} cloud. Condensation usually occurs on small airborne particles called cloud condensation nuclei. Droplets continually form and evaporate as temperature and humidity change. A cloud persists where condensation supplies droplets at least as quickly as evaporation and air motion remove them.',
    blanks: fixedCtwBlanks(17, [['a', 2], ['a', 2], ['un', 3], ['va', 3], ['aro', 3], ['part', 5], ['coun', 5], ['th', 2], ['bec', 3], ['vis', 4]]),
  },
  dailyLife: [
    passage('t17-r-m2-dl-a', 'Language exchange signup', DAILY_INSTRUCTIONS,
      `Registration for the Friday language exchange closes at noon Thursday. Participants choose one language they can help others practice and one they want to practice. The organizer will email conversation groups Thursday evening. Beginners are welcome, but the event is for speaking practice rather than formal instruction. Anyone who cannot attend should cancel through the same registration form.`, [
        fixedReadingItem(17, 'dl1', 'When will participants receive their conversation groups?', ['Thursday evening', 'Friday at noon', 'Before registration opens', 'After formal instruction']),
        fixedReadingItem(17, 'dl2', 'What is the purpose of the event?', ['To grade beginner courses', 'To provide private tutoring', 'To offer conversation practice', 'To replace language classes']),
      ]),
    passage('t17-r-m2-dl-b', 'Laboratory safety workshop', DAILY_INSTRUCTIONS,
      `Students starting laboratory work this term must attend a safety workshop before receiving card access. Sessions are offered Tuesday at 10:00 a.m. and Wednesday at 3:00 p.m. in Science 204. Complete the online hazard module first and bring its confirmation page. Protective equipment is supplied for demonstrations. Students who completed the workshop last term do not need to repeat it unless their supervisor requests it.`, [
        fixedReadingItem(17, 'dl3', 'What must new laboratory students do before receiving card access?', ['Buy protective equipment.', 'Attend a safety workshop.', 'Ask another student for a card.', 'Complete a full term of laboratory work.']),
        fixedReadingItem(17, 'dl4', 'What should students bring to the workshop?', ['Their hazard-module confirmation page', 'Their own demonstration equipment', 'A supervisor’s access card', 'A laboratory report']),
        fixedReadingItem(17, 'dl5', 'Who normally does not need to repeat the workshop?', ['Students attending Wednesday', 'Students without a supervisor', 'Students who completed it last term', 'Students using supplied equipment']),
      ]),
  ],
  academic: passage('t17-r-m2-ap', 'Tree Rings as Climate Records', ACADEMIC_INSTRUCTIONS,
    `In many temperate regions, a tree adds a layer of wood during each growing season. Researchers can count these annual rings and measure properties such as width, density, and chemical composition. Yet a wide ring does not always mean a warm year. Growth responds most strongly to whichever factor is limiting at a site, which may be temperature, moisture, light, nutrients, or competition.

To assign each ring the correct calendar year, dendrochronologists use cross-dating. They compare distinctive sequences of narrow and wide rings among many trees. A ring that is missing or difficult to see in one sample can then be recognized by its position within the shared pattern. Overlapping wood from living trees, old buildings, and preserved logs can extend a chronology far beyond the age of any single tree.

Scientists calibrate ring measurements against instrumental weather records during their period of overlap. If a stable relationship exists, the chronology may be used to estimate earlier conditions. Reconstructions still contain uncertainty because fires, insects, disease, and local disturbance also affect growth, and the relationship may change. Tree rings therefore do not directly record every aspect of climate. They are most informative when sampling targets climate-sensitive sites and when results are compared with other evidence.`, [
      fixedReadingItem(17, 'ap1', 'Why does a wide ring not always indicate a warm year?', ['Tree rings form only during winter.', 'Growth may be limited by factors other than temperature.', 'All trees receive identical rainfall.', 'Ring width measures only a tree’s age.']),
      fixedReadingItem(17, 'ap2', 'What is cross-dating used to do?', ['Determine the chemical formula of wood', 'Remove narrow rings from a sample', 'Assign rings to the correct calendar years', 'Make every tree grow at the same rate']),
      fixedReadingItem(17, 'ap3', 'How can researchers build a chronology longer than one tree’s life?', ['By overlapping patterns from living and preserved wood', 'By counting only the widest ring', 'By replacing rings with weather forecasts', 'By sampling a single new branch']),
      fixedReadingItem(17, 'ap4', 'Why are ring measurements compared with instrumental weather records?', ['To eliminate all missing rings', 'To determine the age of the instruments', 'To prevent insect damage', 'To calibrate the relationship between growth and climate']),
      fixedReadingItem(17, 'ap5', 'When are tree rings most informative about climate?', ['When every local disturbance is ignored', 'When climate-sensitive sites and other evidence are used', 'When only one tree is measured', 'When no instrumental comparison is available']),
    ]),
});

export const TOEFL_READING_MODULE2_SET18 = fixedReadingModule2(18, {
  completeWords: {
    id: 't18-r-m2-ctw-v1', objectId: 'object:t18-r-m2-ctw-v1', version: 1,
    title: 'Introduced Species', instructions: CTW_INSTRUCTIONS,
    template: 'People intentionally and accidentally move organisms beyond the regions where they evolved. Introduced {{1}} sometimes {{2}} rapidly {{3}} new {{4}} lack {{5}}, competitors, {{6}}, or {{7}} that {{8}} them {{9}} their {{10}} range. Many introduced species do not become invasive, and some provide useful crops or other benefits. Scientists reserve the term invasive for organisms that spread and cause ecological, economic, or health harm. Prevention and early detection are often easier than controlling a species after it becomes widespread.',
    blanks: fixedCtwBlanks(18, [['orga', 5], ['spr', 3], ['wh', 2], ['enviro', 6], ['pred', 5], ['dise', 4], ['cont', 4], ['lim', 4], ['acr', 3], ['orig', 4]]),
  },
  dailyLife: [
    passage('t18-r-m2-dl-a', 'Club room reservation', DAILY_INSTRUCTIONS,
      `Student organizations may request Meeting Room 2 through the activities portal at least two business days in advance. A reservation is not final until a confirmation email arrives. The room holds twenty people and must be vacated by 9:30 p.m. Food is permitted if the group removes all waste. The student named on the booking is responsible for returning the key.`, [
        fixedReadingItem(18, 'dl1', 'When is a room reservation final?', ['When twenty people arrive', 'After the group orders food', 'When a confirmation email arrives', 'At 9:30 p.m.']),
        fixedReadingItem(18, 'dl2', 'Who is responsible for returning the key?', ['The student named on the booking', 'The last person to leave campus', 'A member of the cleaning staff', 'Any food supplier']),
      ]),
    passage('t18-r-m2-dl-b', 'Parcel locker maintenance', DAILY_INSTRUCTIONS,
      `Residence parcel lockers will be offline Tuesday from 8:00 to 11:00 a.m. for a software update. Packages already inside will remain secure but cannot be collected during maintenance. New deliveries will be held at the residence desk, where students must show identification. Locker access codes will work again after service is restored; students do not need to request replacement codes.`, [
        fixedReadingItem(18, 'dl3', 'What will happen to packages already inside the lockers?', ['They will be returned to senders.', 'They will move to another building.', 'They will receive new access codes.', 'They will remain secure but temporarily unavailable.']),
        fixedReadingItem(18, 'dl4', 'Where will new deliveries be held?', ['At the residence desk', 'Inside the offline lockers', 'At the software office', 'Outside the residence']),
        fixedReadingItem(18, 'dl5', 'What must students show to collect a new delivery?', ['A replacement code', 'A maintenance notice', 'Identification', 'A course schedule']),
      ]),
  ],
  academic: passage('t18-r-m2-ap', 'Fire and Ecological Change', ACADEMIC_INSTRUCTIONS,
    `Fire is a recurring ecological process in many landscapes, but its effects depend on frequency, season, intensity, and severity. A surface fire that consumes grasses and leaf litter differs from a severe fire that kills most vegetation. Because fuels and weather vary across a landscape, one event often leaves a mosaic of lightly and heavily burned patches rather than a uniform result.

Species possess different responses to fire. Some plants resprout from protected roots, while others release or establish seeds after burning. Open patches can create habitat and recycle nutrients, but repeated severe fires at intervals shorter than recovery time may reduce seed sources, alter soils, or favor different species. Ecological succession after fire is therefore not a guaranteed return along one fixed path.

Managers may use prescribed fire to reduce accumulated fuels or maintain habitats that developed with frequent burning. Such fires are planned for selected weather and fuel conditions, yet they still require trained crews and clear objectives. Researchers monitor vegetation, soil, wildlife, and later fires to test whether a treatment produced the intended outcome. Historical evidence can guide management, but climate, land use, and introduced species may have changed the conditions under which earlier fire patterns operated.`, [
      fixedReadingItem(18, 'ap1', 'Why can one fire produce a mosaic across a landscape?', ['Fuels and weather vary from place to place.', 'Every species responds identically.', 'Fire severity never changes.', 'All vegetation grows at one rate.']),
      fixedReadingItem(18, 'ap2', 'What can happen when severe fires repeat before recovery is complete?', ['Every soil gains nutrients permanently.', 'The landscape always returns to its earlier state.', 'All introduced species disappear.', 'Seed sources and soils may be altered.']),
      fixedReadingItem(18, 'ap3', 'What does the passage say about succession after fire?', ['It ends immediately after burning.', 'It does not always follow one fixed path back.', 'It depends only on animal movement.', 'It is identical in every landscape.']),
      fixedReadingItem(18, 'ap4', 'Why might managers use prescribed fire?', ['To make weather predictable', 'To eliminate the need for monitoring', 'To reduce fuels or maintain fire-associated habitat', 'To ensure that every patch burns severely']),
      fixedReadingItem(18, 'ap5', 'Why may historical fire evidence be insufficient by itself?', ['Climate, land use, and species may have changed.', 'Historical records contain no observations.', 'Modern vegetation cannot burn.', 'Earlier fires were always prescribed.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET19 = fixedReadingModule2(19, {
  completeWords: {
    id: 't19-r-m2-ctw-v1', objectId: 'object:t19-r-m2-ctw-v1', version: 1,
    title: 'River Deltas', instructions: CTW_INSTRUCTIONS,
    template: 'A river delta forms near a river mouth where transported material accumulates. River {{1}} develop {{2}} flowing {{3}} slows, {{4}} sediment {{5}} branching {{6}}, wetlands, {{7}}, and {{8}} continually {{9}} by {{10}} and waves. Channels divide and shift as deposits redirect the flow. Deltas also change when sediment compacts, land subsides, or sea level rises. Dams and levees can reduce the sediment reaching some delta plains, while restoration projects may reconnect water and sediment to selected wetlands.',
    blanks: fixedCtwBlanks(19, [['del', 3], ['wh', 3], ['wa', 3], ['depos', 5], ['acr', 3], ['chan', 4], ['isl', 4], ['shore', 5], ['resh', 4], ['ti', 3]]),
  },
  dailyLife: [
    passage('t19-r-m2-dl-a', 'Internship document deadline', DAILY_INSTRUCTIONS,
      `Students accepting a summer internship must upload the signed placement form by May 3. The supervisor’s signature may be electronic, but typed names without a verified signature are not accepted. Insurance documents are generated only after the form is approved. Students waiting for a supervisor should email the internship office before the deadline rather than submitting an incomplete form.`, [
        fixedReadingItem(19, 'dl1', 'What must students upload by May 3?', ['An insurance bill', 'A signed placement form', 'A final internship report', 'A supervisor’s résumé']),
        fixedReadingItem(19, 'dl2', 'What should a student waiting for a supervisor do?', ['Submit an incomplete form.', 'Generate insurance documents.', 'Email the internship office before the deadline.', 'Type the supervisor’s name.']),
      ]),
    passage('t19-r-m2-dl-b', 'Fitness class relocation', DAILY_INSTRUCTIONS,
      `Thursday’s 6:00 p.m. fitness class has moved from Studio A to the indoor track because the studio floor is being repaired. Meet the instructor beside Track Entrance 2. The session will use body-weight exercises, so no equipment checkout is needed. Track shoes are required. Participants who prefer to transfer to Saturday’s class may change the booking without a fee before 3:00 p.m. Thursday.`, [
        fixedReadingItem(19, 'dl3', 'Where should participants meet the instructor?', ['Beside Track Entrance 2', 'Inside Studio A', 'At the equipment desk', 'Outside the repair office']),
        fixedReadingItem(19, 'dl4', 'Why is no equipment checkout needed?', ['The equipment desk is closed.', 'Saturday’s class provides equipment.', 'The studio floor holds the equipment.', 'The session uses body-weight exercises.']),
        fixedReadingItem(19, 'dl5', 'When is a free transfer to Saturday available?', ['After Thursday’s class', 'Before 3:00 p.m. Thursday', 'Only at 6:00 p.m.', 'After paying a repair fee']),
      ]),
  ],
  academic: passage('t19-r-m2-ap', 'Maintaining River Deltas', ACADEMIC_INSTRUCTIONS,
    `Deltas develop where rivers enter slower water and deposit sediment. Repeated flooding can spread sand, silt, and organic material across channels and wetlands, building land. Waves and tides redistribute those deposits along the coast. At the same time, buried sediment compacts and the delta surface may subside. Whether land persists depends partly on whether new material can offset subsidence, erosion, and rising water levels.

Human engineering changes this balance. Upstream dams trap sediment, while levees keep rivers inside fixed channels and prevent floodwater from reaching much of the delta plain. These structures can protect communities and support navigation, but wetlands outside the channels may receive less replenishment. The same intervention can therefore provide one benefit while increasing another long-term risk.

Some restoration plans use controlled diversions to send river water and sediment into selected basins. A diversion does not simply recreate an untouched delta. Its outcome depends on sediment supply, location, operating schedule, vegetation, waves, and local subsidence. Freshwater changes can also affect fisheries and communities. Scientists consequently monitor land elevation, water movement, sediment deposition, and ecological responses before and after projects. Decisions must weigh uncertain land-building gains against navigation, flood protection, ecosystems, cost, and the needs of people who live and work in the delta.`, [
      fixedReadingItem(19, 'ap1', 'What helps build land on a delta plain?', ['Only ocean waves', 'The compaction of buried sediment', 'Floodwater spreading sediment across wetlands', 'Permanent separation from the river']),
      fixedReadingItem(19, 'ap2', 'How can levees reduce wetland replenishment?', ['They increase every river’s sediment supply.', 'They keep floodwater inside fixed channels.', 'They stop all coastal waves.', 'They prevent sediment from compacting.']),
      fixedReadingItem(19, 'ap3', 'Why can an engineering structure have mixed effects?', ['It always restores an untouched delta.', 'It changes only ocean temperature.', 'It eliminates the need for navigation.', 'It may protect communities while reducing sediment delivery elsewhere.']),
      fixedReadingItem(19, 'ap4', 'What determines whether a sediment diversion builds land effectively?', ['Several interacting physical, ecological, and operating conditions', 'Only the age of the nearest levee', 'The number of tourists on the coast', 'One identical schedule for every delta']),
      fixedReadingItem(19, 'ap5', 'What approach to delta decisions does the passage support?', ['Ignoring effects on communities', 'Choosing the least monitored project', 'Weighing uncertain gains and multiple tradeoffs', 'Assuming every diversion has the same result']),
    ]),
});

export const TOEFL_READING_MODULE2_SET20 = fixedReadingModule2(20, {
  completeWords: {
    id: 't20-r-m2-ctw-v1', objectId: 'object:t20-r-m2-ctw-v1', version: 1,
    title: 'Electric Grids', instructions: CTW_INSTRUCTIONS,
    template: 'An electric grid connects producers and users through transmission and distribution networks. Electric {{1}} balance {{2}} production {{3}} demand {{4}} moment {{5}} generators, {{6}}, networks, {{7}} flexible {{8}} respond {{9}} changing {{10}} across regions. If supply and demand diverge, system frequency can move away from its target. Operators forecast demand and coordinate many resources. Transmission can share power across areas, while storage and demand response can shift when electricity enters or leaves the system.',
    blanks: fixedCtwBlanks(20, [['gr', 3], ['po', 3], ['wi', 2], ['ev', 3], ['wh', 3], ['sto', 4], ['a', 2], ['us', 3], ['t', 1], ['condi', 5]]),
  },
  dailyLife: [
    passage('t20-r-m2-dl-a', 'Laptop software update', DAILY_INSTRUCTIONS,
      `University-managed laptops will install a security update after 7:00 p.m. Friday. Save open work and connect the laptop to power before leaving campus. Installation may restart the computer twice and usually takes twenty minutes. Devices that are offline will begin the update the next time they connect. Contact the help desk only if the progress screen remains unchanged for more than forty-five minutes.`, [
        fixedReadingItem(20, 'dl1', 'What should users do before leaving campus Friday?', ['Save their work and connect the laptop to power.', 'Disconnect the laptop from all networks.', 'Call the help desk immediately.', 'Remove university software.']),
        fixedReadingItem(20, 'dl2', 'When should a user contact the help desk?', ['After the first restart even if the update immediately continues and the progress screen keeps changing normally', 'Whenever the laptop is offline', 'Before the update begins', 'If progress is unchanged for over forty-five minutes']),
      ]),
    passage('t20-r-m2-dl-b', 'Graduation photo booking', DAILY_INSTRUCTIONS,
      `Graduation portraits will be taken in Alumni Hall from October 21 to 24. Reserve a fifteen-minute appointment through the student events page. Academic gowns are provided, but students should bring any program-specific hood or accessory they want included. A basic digital proof is free. Printed packages are optional and are ordered directly from the photographer after proofs become available.`, [
        fixedReadingItem(20, 'dl3', 'Where should students reserve an appointment?', ['At the photographer’s store', 'Inside Alumni Hall', 'Through the student events page', 'At the gown office']),
        fixedReadingItem(20, 'dl4', 'What should students bring if they want it in the portrait?', ['A program-specific hood or accessory', 'A university-owned camera', 'A printed proof', 'A basic academic gown']),
        fixedReadingItem(20, 'dl5', 'What is included without charge?', ['Every printed package', 'A basic digital proof', 'A second portrait session', 'A program-specific hood']),
      ]),
  ],
  academic: passage('t20-r-m2-ap', 'Energy Storage and the Electric Grid', ACADEMIC_INSTRUCTIONS,
    `Electric system operators continuously balance power production with demand. Large mismatches can disturb frequency and reliability. Wind and solar generation vary with weather and time of day, but demand also changes. Forecasting, flexible generators, transmission between regions, and customers who shift consumption all help operators respond. Energy storage adds another option by absorbing electricity at one time and returning it later.

Storage does not create energy, and some energy is lost during charging and discharging. Technologies also differ in response speed, power, duration, lifetime, location needs, cost, and environmental effects. Batteries can react quickly and may be placed at many scales. Pumped-storage hydropower moves water to a higher reservoir when electricity is available and releases it through turbines later, but it requires suitable sites and substantial infrastructure.

No single technology solves every grid need. A device designed for rapid frequency response may not economically supply power for several days. Conversely, a long-duration system may not be best for every brief fluctuation. Planners therefore evaluate the service required, expected operating pattern, efficiency, safety, transmission constraints, and total cost. Storage is usually considered as part of a portfolio with generation, stronger networks, demand response, and efficiency rather than as a complete replacement for those resources.`, [
      fixedReadingItem(20, 'ap1', 'Why must operators continuously balance production and demand?', ['To make all electricity free', 'To eliminate every transmission line', 'To keep every generator at one output', 'Large mismatches can disturb frequency and reliability.']),
      fixedReadingItem(20, 'ap2', 'What does energy storage do?', ['It absorbs electricity and returns it at another time.', 'It creates energy without losses.', 'It prevents demand from changing.', 'It replaces all power networks.']),
      fixedReadingItem(20, 'ap3', 'How does pumped-storage hydropower store energy?', ['By heating a battery with sunlight', 'By permanently holding river water', 'By moving water to a higher reservoir for later release', 'By reducing the height of every reservoir']),
      fixedReadingItem(20, 'ap4', 'Why is one storage technology not suitable for every service?', ['All technologies have identical costs.', 'Technologies differ in speed, duration, location, and other characteristics.', 'Grid needs never change over time.', 'Storage can provide only one minute of power.']),
      fixedReadingItem(20, 'ap5', 'How should planners generally consider storage?', ['As a complete replacement for all other resources', 'Without considering efficiency or safety', 'Only for solar generation', 'As one resource within a broader portfolio']),
    ]),
});

export const TOEFL_READING_MODULE2_SETS_16_TO_20 = [
  TOEFL_READING_MODULE2_SET16,
  TOEFL_READING_MODULE2_SET17,
  TOEFL_READING_MODULE2_SET18,
  TOEFL_READING_MODULE2_SET19,
  TOEFL_READING_MODULE2_SET20,
] as const;
