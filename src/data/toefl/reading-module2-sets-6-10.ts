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

export const TOEFL_READING_MODULE2_SET6 = fixedReadingModule2(6, {
  completeWords: {
    id: 't6-r-m2-ctw-v1', objectId: 'object:t6-r-m2-ctw-v1', version: 1,
    title: 'Bioluminescence', instructions: CTW_INSTRUCTIONS,
    template: 'Bioluminescence is light produced by living organisms through chemical processes. Some {{1}} create {{2}} through {{3}} reactions {{4}} special {{5}}, while {{6}} host {{7}} bacteria {{8}} produce {{9}} for {{10}}. The glow can attract mates, confuse predators, lure prey, or help animals communicate in dark water. Producing light efficiently is especially useful in the deep ocean, where sunlight cannot reach. Different species emit different colors and patterns. The emitted light most often appears blue.',
    blanks: fixedCtwBlanks(6, [['orga', 5], ['li', 3], ['chem', 4], ['ins', 3], ['ce', 3], ['oth', 3], ['glo', 4], ['th', 2], ['li', 3], ['th', 2]]),
  },
  dailyLife: [
    passage('t6-r-m2-dl-a', 'Student identification replacement', DAILY_INSTRUCTIONS,
      `LOST STUDENT ID\n\nReport a lost card immediately through the campus portal so it can be deactivated. A replacement costs $12 and is normally ready at the Security Desk within one business day. Bring a passport or driver's license when collecting it. If your original card is found after a replacement has been issued, do not use it; the old card will remain inactive.`, [
        fixedReadingItem(6, 'dl1', 'Why should a lost card be reported immediately?', ['To reserve a parking place', 'So the card can be deactivated', 'To change the student’s courses', 'So the library can extend every loan']),
        fixedReadingItem(6, 'dl2', 'What must a student bring when collecting a replacement?', ['A recent photograph only', 'The original lost card', 'A course textbook', 'A passport or driver’s license']),
      ]),
    passage('t6-r-m2-dl-b', 'Photography club meeting change', DAILY_INSTRUCTIONS,
      `Subject: Thursday photography meeting\n\nBecause the arts building closes early this Thursday, our meeting will begin at 5:30 p.m. in Library Room 12 instead of Studio 4. Bring one photograph for the group critique, either printed or on a laptop. The outdoor night-photography activity has moved to next week. New members are welcome and do not need to submit a photograph at their first meeting.`, [
        fixedReadingItem(6, 'dl3', 'Why has the meeting location changed?', ['The arts building will close early.', 'Studio 4 has new equipment.', 'The library requested a critique.', 'The club is meeting outdoors.']),
        fixedReadingItem(6, 'dl4', 'What happened to the night-photography activity?', ['It was canceled permanently.', 'It will happen before the meeting.', 'It moved to next week.', 'It moved to Studio 4.']),
        fixedReadingItem(6, 'dl5', 'Who does not need to bring a photograph?', ['Club officers', 'New members attending for the first time', 'Anyone using a laptop', 'Students arriving at 5:30']),
      ]),
  ],
  academic: passage('t6-r-m2-ap', 'Photosynthesis and Plant Growth', ACADEMIC_INSTRUCTIONS,
    `Photosynthesis allows plants, algae, and some microorganisms to store energy from light in chemical form. In plants, much of the process occurs in chloroplasts, structures containing pigments such as chlorophyll. These pigments absorb certain wavelengths of visible light and transfer energy into a chain of chemical reactions.\n\nThe reactions use water and carbon dioxide to produce energy-rich sugars, releasing oxygen as a by-product. The simple summary can be misleading, however, because photosynthesis is not a single reaction. Light-dependent reactions capture energy and generate short-lived chemical carriers. Other reactions use those carriers to incorporate carbon dioxide into organic molecules. Plants then use the resulting compounds for respiration, growth, storage, and building tissues.\n\nMore light does not always produce faster growth. Once the photosynthetic machinery is operating near capacity, another factor may become limiting. A plant may lack water, carbon dioxide, suitable temperature, or mineral nutrients. Excessive light can also damage photosynthetic systems, so plants have mechanisms that dissipate surplus energy. Agricultural researchers study these interacting limits rather than treating sunlight as the only control on overall productivity.`, [
      fixedReadingItem(6, 'ap1', 'Where does much plant photosynthesis occur?', ['In chloroplasts', 'Only in roots', 'In the surrounding soil', 'Inside mineral crystals']),
      fixedReadingItem(6, 'ap2', 'What is released as a by-product when water and carbon dioxide are used?', ['Nitrogen', 'Salt', 'Oxygen', 'Chlorophyll']),
      fixedReadingItem(6, 'ap3', 'Why is the simple summary of photosynthesis incomplete?', ['It applies only at night.', 'Plants never use carbon dioxide.', 'Light has no role in the process.', 'Photosynthesis consists of linked sets of reactions, not one reaction.']),
      fixedReadingItem(6, 'ap4', 'What can happen after the photosynthetic machinery approaches capacity?', ['Every plant stops growing permanently.', 'Another resource or condition can limit growth.', 'Sunlight becomes a mineral nutrient.', 'The plant no longer needs water.']),
      fixedReadingItem(6, 'ap5', 'How can plants respond to excessive light?', ['They can dissipate surplus energy.', 'They convert all leaves into roots.', 'They stop using pigments forever.', 'They release carbon dioxide instead of oxygen in every reaction.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET7 = fixedReadingModule2(7, {
  completeWords: {
    id: 't7-r-m2-ctw-v1', objectId: 'object:t7-r-m2-ctw-v1', version: 1,
    title: 'Wetlands', instructions: CTW_INSTRUCTIONS,
    template: 'Wetlands are places where water covers the soil or remains near its surface. These {{1}} slow {{2}}, store {{3}}, trap {{4}}, and {{5}} habitat {{6}} plants, {{7}}, and {{8}} animals {{9}} need {{10}} conditions. Some wetlands hold water year-round, while others appear only during certain seasons. Their ability to reduce flooding or improve water quality depends on location, size, vegetation, and connection to surrounding land and waterways. Not every wetland performs equally.',
    blanks: fixedCtwBlanks(7, [['ecosy', 5], ['wa', 3], ['car', 3], ['sedi', 4], ['pro', 4], ['f', 2], ['bi', 3], ['ot', 3], ['th', 2], ['w', 2]]),
  },
  dailyLife: [
    passage('t7-r-m2-dl-a', 'Package pickup notice', DAILY_INSTRUCTIONS,
      `A package for Maya Chen is ready at the residence desk. It arrived on Monday and will be held until 8:00 p.m. Friday. Bring your residence card or another photo ID. Packages cannot be collected by friends unless Maya first submits an authorization form online. Oversized packages must be taken through the side entrance, which closes at 6:00 p.m.`, [
        fixedReadingItem(7, 'dl1', 'What must Maya do if a friend will collect the package?', ['Submit an online authorization form first', 'Pay an oversized-package fee', 'Call the delivery company after Friday', 'Leave her residence card at the desk']),
        fixedReadingItem(7, 'dl2', 'What special restriction applies to an oversized package?', ['It can be collected only on Monday.', 'It requires two forms of identification.', 'It must leave through an entrance that closes at 6:00 p.m.', 'It cannot be collected by the recipient.']),
      ]),
    passage('t7-r-m2-dl-b', 'Pool maintenance schedule', DAILY_INSTRUCTIONS,
      `The west campus pool will be closed from June 2 through June 6 for annual maintenance. Swimming lessons scheduled during that period will take place at the east campus pool at their usual times. The fitness room beside the west pool remains open, but its changing rooms will be unavailable. Members may use the lockers near the main gym entrance. Regular pool hours resume Saturday, June 7.`, [
        fixedReadingItem(7, 'dl3', 'Where will swimming lessons be held during the closure?', ['At the main gym', 'At the east campus pool', 'In the west fitness room', 'They will not be held.']),
        fixedReadingItem(7, 'dl4', 'What remains open beside the west pool?', ['The changing rooms', 'The pool café', 'The equipment shop', 'The fitness room']),
        fixedReadingItem(7, 'dl5', 'When do regular west pool hours resume?', ['June 2', 'June 6', 'June 7', 'The notice does not say.']),
      ]),
  ],
  academic: passage('t7-r-m2-ap', 'Why Some Roman Concrete Endured', ACADEMIC_INSTRUCTIONS,
    `Ancient Roman builders used several concrete recipes rather than one universal formula. Many mixtures combined lime with volcanic ash or crushed volcanic rock. In harbors, builders placed some of this material in contact with seawater. Chemical reactions among the lime, ash, water, and rock produced binding compounds that could continue changing long after construction.\n\nStudies of surviving marine structures have identified minerals that formed gradually within cracks and pores. Some of this later mineral growth may strengthen the material or limit the spread of cracks. Researchers have also examined bright lime-rich fragments found in certain Roman concretes. Under some conditions, water entering a crack can react with these fragments and deposit new calcium-rich material, partially sealing the opening.\n\nThese findings do not mean that every Roman structure was stronger than every modern one. Modern concrete is designed for many loads, environments, construction speeds, and reinforcement systems unknown to Roman builders. The research instead shows that manufacturing choices influence how a material changes over time. Engineers are testing whether selected ancient principles can reduce maintenance or environmental impact without simply copying historical recipes.`, [
      fixedReadingItem(7, 'ap1', 'What did many Roman concrete mixtures combine with lime?', ['Only sea salt', 'Volcanic ash or crushed volcanic rock', 'Steel reinforcement', 'Plastic fibers']),
      fixedReadingItem(7, 'ap2', 'What have studies found inside some surviving marine concrete?', ['Minerals that formed gradually in cracks and pores', 'Wood that never decayed', 'Completely empty pores', 'Modern repair chemicals']),
      fixedReadingItem(7, 'ap3', 'How might lime-rich fragments affect a crack?', ['They always make it wider.', 'They remove all water from a harbor.', 'They turn concrete into steel.', 'They can react with water and help deposit material that partly seals it.']),
      fixedReadingItem(7, 'ap4', 'Why does the passage compare Roman and modern concrete cautiously?', ['No Roman concrete survives.', 'Modern concrete serves varied purposes and uses different systems.', 'Roman builders used only one recipe.', 'Modern engineers cannot analyze minerals.']),
      fixedReadingItem(7, 'ap5', 'What are engineers testing?', ['Whether selected old principles can improve modern materials', 'Whether all buildings should use untreated ash', 'Whether construction can avoid every environmental effect', 'Whether seawater should replace all fresh water']),
    ]),
});

export const TOEFL_READING_MODULE2_SET8 = fixedReadingModule2(8, {
  completeWords: {
    id: 't8-r-m2-ctw-v1', objectId: 'object:t8-r-m2-ctw-v1', version: 1,
    title: 'Artificial Satellites', instructions: CTW_INSTRUCTIONS,
    template: 'Artificial satellites are machines placed in orbit for scientific or practical work. They {{1}} Earth {{2}} collecting {{3}}, relaying {{4}}, measuring {{5}}, or {{6}} navigation {{7}}. Different {{8}} suit {{9}} purposes {{10}} altitudes. A low orbit can provide detailed observations but requires rapid movement around Earth. A geostationary satellite remains above the same general region by orbiting at a particular altitude and rate. Engineers must also plan for radiation, limited fuel, and eventual disposal.',
    blanks: fixedCtwBlanks(8, [['or', 3], ['wh', 3], ['ima', 3], ['sig', 4], ['wea', 4], ['suppo', 5], ['sys', 4], ['orb', 3], ['parti', 5], ['a', 2]]),
  },
  dailyLife: [
    passage('t8-r-m2-dl-a', 'Scholarship application workshop', DAILY_INSTRUCTIONS,
      `The Financial Aid Office will offer a scholarship workshop on Wednesday from 4:00 to 5:15 p.m. in Room 204. Staff will demonstrate how to search the scholarship database and prepare a personal statement. Bring a laptop if possible; six loan laptops are available by advance reservation. The session will not review individual applications, but fifteen-minute appointments can be booked afterward.`, [
        fixedReadingItem(8, 'dl1', 'What will staff demonstrate during the workshop?', ['How to search for scholarships and prepare a personal statement', 'How to appeal a course grade', 'How to repair a laptop', 'How to conduct a job interview']),
        fixedReadingItem(8, 'dl2', 'What must someone do to use one of the six loan laptops?', ['Pay a deposit at the door.', 'Reserve it in advance.', 'Submit a scholarship application first.', 'Stay for an individual review.']),
      ]),
    passage('t8-r-m2-dl-b', 'Parking permit renewal', DAILY_INSTRUCTIONS,
      `Employee parking permits expire August 31. Renew online by August 20 to have the new permit mailed to your home address. Applications received later must be collected from Transportation Services. Before renewing, verify your vehicle registration number and address in the employee portal. The fee has not changed, but permits for the North Garage now require a separate access card available at no additional cost.`, [
        fixedReadingItem(8, 'dl3', 'What benefit comes from renewing by August 20?', ['The fee is reduced.', 'The permit lasts two years.', 'The permit can be mailed to the employee.', 'A vehicle registration is no longer needed.']),
        fixedReadingItem(8, 'dl4', 'What should employees verify before renewing?', ['Their work schedule', 'Their vehicle registration number and address', 'The garage opening time', 'Their supervisor’s address']),
        fixedReadingItem(8, 'dl5', 'What is required for the North Garage?', ['A more expensive permit', 'A second vehicle', 'An appointment with Transportation Services', 'A separate access card']),
      ]),
  ],
  academic: passage('t8-r-m2-ap', 'The Urban Heat Island Effect', ACADEMIC_INSTRUCTIONS,
    `Cities are often warmer than nearby rural areas, especially after sunset. This pattern is called the urban heat island effect. Dark roofs and pavement absorb solar energy during the day and release heat later. Buildings can also reduce airflow, while vehicles, air conditioners, and other equipment add waste heat. Rural surroundings generally contain more vegetation and moist soil, which use incoming energy for evaporation rather than heating surfaces.\n\nThe effect is not uniform across a city. Neighborhoods differ in tree cover, building density, surface materials, and access to parks. Weather matters as well: clear, calm conditions often make temperature differences more noticeable than windy or cloudy conditions. Consequently, a single measurement cannot describe every resident's exposure.\n\nCities use several responses. Trees and shade structures reduce direct solar heating, while reflective roofs absorb less energy. Replacing some pavement with vegetation or permeable surfaces can support cooling when water is available. Each measure has limits involving cost, maintenance, climate, and available space. Planners therefore combine temperature maps with social and health data to direct interventions toward places where heat risk is greatest.`, [
      fixedReadingItem(8, 'ap1', 'Why can dark roofs make cities warmer after sunset?', ['They store daytime solar energy and release heat later.', 'They produce wind between buildings.', 'They increase rural vegetation.', 'They prevent vehicles from operating.']),
      fixedReadingItem(8, 'ap2', 'How does evaporation affect rural surface temperatures?', ['It turns all soil into pavement.', 'It uses some incoming energy that would otherwise heat surfaces.', 'It blocks every cloud.', 'It adds waste heat from equipment.']),
      fixedReadingItem(8, 'ap3', 'Why can one city temperature measurement be inadequate?', ['Urban surfaces never change temperature.', 'Every neighborhood has identical buildings.', 'Heat exposure varies with local cover, materials, and weather.', 'Only rural temperatures can be measured.']),
      fixedReadingItem(8, 'ap4', 'What is one function of a reflective roof?', ['It increases building density.', 'It creates moist soil.', 'It requires more dark pavement.', 'It absorbs less solar energy.']),
      fixedReadingItem(8, 'ap5', 'Why do planners combine heat maps with social and health data?', ['To target measures where heat risk is greatest', 'To guarantee one solution works everywhere', 'To remove all maintenance costs', 'To replace weather observations']),
    ]),
});

export const TOEFL_READING_MODULE2_SET9 = fixedReadingModule2(9, {
  completeWords: {
    id: 't9-r-m2-ctw-v1', objectId: 'object:t9-r-m2-ctw-v1', version: 1,
    title: 'Composting', instructions: CTW_INSTRUCTIONS,
    template: 'Composting turns organic waste into a soil-like material through controlled decomposition. Microorganisms {{1}} food {{2}} and {{3}} material, {{4}} oxygen, {{5}}, and {{6}}. Turning {{7}} pile {{8}} air, {{9}} moisture {{10}} activity. A balanced mixture of moist, nitrogen-rich scraps and dry, carbon-rich material usually decomposes more effectively than either type alone. Finished compost can improve soil structure, but it is not identical to fertilizer and should be used appropriately.',
    blanks: fixedCtwBlanks(9, [['br', 3], ['scr', 3], ['ya', 2], ['us', 3], ['mois', 4], ['war', 3], ['t', 2], ['ad', 2], ['wh', 3], ['supp', 4]]),
  },
  dailyLife: [
    passage('t9-r-m2-dl-a', 'Language laboratory booking', DAILY_INSTRUCTIONS,
      `The language laboratory may be reserved by students for recording assignments. Bookings are limited to one 60-minute session per day and must be made at least two hours in advance. Headsets are provided, but students should bring any script or presentation slides they need. Cancel through the booking system if you cannot attend; reservations are released after a ten-minute absence.`, [
        fixedReadingItem(9, 'dl1', 'How far in advance must a laboratory booking be made?', ['At least two hours', 'Exactly one day', 'Ten minutes', 'One week']),
        fixedReadingItem(9, 'dl2', 'What happens after a student is absent for ten minutes?', ['The recording is submitted automatically.', 'The reservation is released.', 'A second headset is provided.', 'The session is extended.']),
      ]),
    passage('t9-r-m2-dl-b', 'Bookstore return policy', DAILY_INSTRUCTIONS,
      `Textbooks bought for the fall term may be returned within fourteen days of purchase with the original receipt. New books must be unmarked and include any access code unopened. Used books may show ordinary wear but cannot have missing pages. Digital materials are refundable only if the access link has not been activated. Defective items may be exchanged after the fourteen-day period following inspection by staff.`, [
        fixedReadingItem(9, 'dl3', 'What is required for a standard textbook return?', ['A letter from an instructor', 'A replacement access code', 'The original receipt', 'An inspection after fourteen days']),
        fixedReadingItem(9, 'dl4', 'When can digital material be refunded?', ['Only when the access link has not been activated', 'After all lessons are completed', 'Whenever a student changes courses', 'Only without a receipt']),
        fixedReadingItem(9, 'dl5', 'What may happen to a defective item after the normal return period?', ['It must be donated.', 'It can never be returned.', 'It becomes a used book.', 'It may be exchanged after staff inspect it.']),
      ]),
  ],
  academic: passage('t9-r-m2-ap', 'Life at Hydrothermal Vents', ACADEMIC_INSTRUCTIONS,
    `Hydrothermal vents occur where seawater enters cracks in the ocean crust, is heated by nearby magma, and returns carrying dissolved minerals. When the hot fluid meets cold seawater, minerals precipitate and can build chimney-like structures. Vent fluid may be extremely hot, but mixing creates a range of temperatures around a vent field.\n\nSunlight does not reach these deep environments, so the food web cannot depend directly on photosynthesis. Instead, certain microorganisms obtain energy by oxidizing chemicals such as hydrogen sulfide. This process, chemosynthesis, provides organic matter used by other organisms. Some tubeworms lack a digestive system as adults and depend on symbiotic bacteria housed inside their bodies. Other vent animals graze on microbial films or consume one another.\n\nVent communities are productive but temporary. Mineral deposits can block a vent, and volcanic or tectonic activity can shift fluid flow. Animals must therefore colonize new sites, often across large distances of unsuitable seafloor. Researchers study larval movement and genetic connections among vent fields to understand how communities recover after natural disturbance or decline. Connectivity supports recovery between separate vent fields.`, [
      fixedReadingItem(9, 'ap1', 'What happens when hot vent fluid meets cold seawater?', ['Sunlight reaches the seafloor.', 'The ocean crust stops moving.', 'Minerals can precipitate and build chimneys.', 'All dissolved chemicals disappear.']),
      fixedReadingItem(9, 'ap2', 'What supplies energy at the base of many vent food webs?', ['Chemical oxidation by microorganisms', 'Direct photosynthesis', 'Leaves falling from coastal trees', 'Heat alone without chemical reactions']),
      fixedReadingItem(9, 'ap3', 'How do adult tubeworms described in the passage obtain nutrition?', ['They grow leaves.', 'They filter sunlight.', 'They digest rocks directly.', 'They depend on symbiotic bacteria.']),
      fixedReadingItem(9, 'ap4', 'Why are individual vent communities temporary?', ['Deep water always freezes.', 'Fluid pathways can become blocked or shift.', 'Microorganisms cannot reproduce.', 'Vent animals remain at one site forever.']),
      fixedReadingItem(9, 'ap5', 'Why do researchers examine genetic links among vent fields?', ['To understand dispersal and recovery between separated sites', 'To prove every field has identical species', 'To measure sunlight at the seafloor', 'To stop mineral precipitation']),
    ]),
});

export const TOEFL_READING_MODULE2_SET10 = fixedReadingModule2(10, {
  completeWords: {
    id: 't10-r-m2-ctw-v1', objectId: 'object:t10-r-m2-ctw-v1', version: 1,
    title: 'Managing Sound', instructions: CTW_INSTRUCTIONS,
    template: 'Sound waves carry energy through air, water, and solid materials. Soft {{1}} porous {{2}} can {{3}} some {{4}} energy, {{5}} reducing {{6}}, while {{7}} heavy {{8}} can {{9}} sound {{10}} rooms. Designers combine absorption, blocking, and careful placement rather than relying on one material. A concert hall may need useful reflections for music, while a recording studio often needs tighter control. Gaps around doors and windows can weaken otherwise effective barriers.',
    blanks: fixedCtwBlanks(10, [['a', 2], ['mate', 5], ['abs', 3], ['so', 3], ['th', 2], ['ech', 3], ['de', 3], ['barr', 4], ['bl', 3], ['bet', 4]]),
  },
  dailyLife: [
    passage('t10-r-m2-dl-a', 'Volunteer shift reminder', DAILY_INSTRUCTIONS,
      `Thank you for volunteering at Saturday's food distribution. Your shift begins at 8:30 a.m. at the south entrance of Community Hall. Wear closed-toe shoes and clothing suitable for lifting boxes. A short safety briefing starts at 8:20, so arrive ten minutes early. If you can no longer attend, notify the coordinator by Friday noon so another volunteer can be scheduled.`, [
        fixedReadingItem(10, 'dl1', 'Why should the volunteer arrive before 8:30?', ['To attend the safety briefing', 'To collect food for personal use', 'To choose the distribution date', 'To unlock the north entrance']),
        fixedReadingItem(10, 'dl2', 'When should a cancellation be reported?', ['After the shift', 'By Friday noon', 'At 8:20 Saturday', 'One week afterward']),
      ]),
    passage('t10-r-m2-dl-b', 'Airport shuttle update', DAILY_INSTRUCTIONS,
      `From September 1, the university airport shuttle will leave from the east gate instead of the student center. Departures remain at 6:00 a.m., 10:00 a.m., and 3:00 p.m. Reservations are required by 4:00 p.m. the previous day. Each passenger may bring one large suitcase and one small bag. Additional luggage must be registered when booking and may incur a fee.`, [
        fixedReadingItem(10, 'dl3', 'What changes on September 1?', ['The shuttle fares', 'The number of daily departures', 'The departure location', 'The airport served']),
        fixedReadingItem(10, 'dl4', 'When is the reservation deadline?', ['At 4:00 p.m. on the previous day', 'At the moment of departure', 'One week before travel', 'At 6:00 a.m. every day']),
        fixedReadingItem(10, 'dl5', 'What should a passenger do with additional luggage?', ['Leave it at the student center.', 'Register it when booking.', 'Take a different shuttle without reserving.', 'Replace it with a small bag at the gate.']),
      ]),
  ],
  academic: passage('t10-r-m2-ap', 'Sleep and Memory Consolidation', ACADEMIC_INSTRUCTIONS,
    `Learning does not end when practice stops. New memories remain vulnerable and can be strengthened, reorganized, or weakened over time. Researchers use the term consolidation for processes that make a memory more stable after it is first formed. Sleep is one period during which several of these processes occur.\n\nDifferent sleep stages contain distinct patterns of brain activity. Experiments show that sleep after learning can improve later performance on some factual, spatial, and motor tasks compared with an equivalent period awake. Brain recordings also reveal reactivation of activity patterns associated with recent experience. Researchers think this reactivation can help integrate new information with existing networks, but its exact role varies by task and is still under investigation.\n\nSleep is not a recording that preserves every event. Attention during learning, emotional significance, prior knowledge, and later interference all influence what remains. Nor does one poor night erase all learning. The evidence supports a more limited conclusion: adequate sleep is one important condition that supports memory, alongside effective study, health, and repeated retrieval. Researchers compare conditions instead of relying on one night.`, [
      fixedReadingItem(10, 'ap1', 'What does memory consolidation refer to?', ['Processes that make a new memory more stable', 'A method for preventing all forgetting', 'A type of visual pigment', 'The first moment a sound reaches the ear']),
      fixedReadingItem(10, 'ap2', 'What have some experiments found about sleep after learning?', ['It prevents all brain activity.', 'It can improve later performance on certain tasks.', 'It affects only emotional memories.', 'It makes practice unnecessary.']),
      fixedReadingItem(10, 'ap3', 'What is reactivation?', ['The complete erasure of prior knowledge', 'A change in room temperature', 'The recurrence of brain-activity patterns linked to recent experience', 'A guarantee that every detail will be stored']),
      fixedReadingItem(10, 'ap4', 'Why does the passage say sleep is not a recording?', ['Sleep occurs only after factual tasks.', 'Researchers cannot measure brain activity.', 'All memories disappear during sleep.', 'Many factors besides sleep influence what is retained.']),
      fixedReadingItem(10, 'ap5', 'What conclusion does the passage support?', ['Adequate sleep supports memory but works alongside other factors.', 'One poor night erases all learning.', 'Repeated retrieval harms memory.', 'Sleep can replace effective study.']),
    ]),
});

export const TOEFL_READING_MODULE2_SETS_6_TO_10 = [
  TOEFL_READING_MODULE2_SET6,
  TOEFL_READING_MODULE2_SET7,
  TOEFL_READING_MODULE2_SET8,
  TOEFL_READING_MODULE2_SET9,
  TOEFL_READING_MODULE2_SET10,
] as const;
