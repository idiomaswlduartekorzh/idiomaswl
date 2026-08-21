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

export const TOEFL_READING_MODULE2_SET11 = fixedReadingModule2(11, {
  completeWords: {
    id: 't11-r-m2-ctw-v1', objectId: 'object:t11-r-m2-ctw-v1', version: 1,
    title: 'Ocean Tides', instructions: CTW_INSTRUCTIONS,
    template: 'Tides are regular changes in sea level observed along coasts. Ocean {{1}} rise {{2}} fall {{3}} because {{4}} forces {{5}} the {{6}} and {{7}} Sun {{8}} across {{9}} major {{10}} basins. Earth’s rotation and the shape of coastlines influence when high and low water arrive at a particular place. The Sun also affects tides, although the Moon usually has the stronger influence. Local wind and air pressure can raise or lower the water beyond the predicted astronomical tide.',
    blanks: fixedCtwBlanks(11, [['ti', 3], ['a', 2], ['mai', 3], ['gravit', 7], ['fr', 2], ['Mo', 2], ['t', 2], ['a', 2], ['a', 2], ['oc', 3]]),
  },
  dailyLife: [
    passage('t11-r-m2-dl-a', 'Campus bicycle registration', DAILY_INSTRUCTIONS,
      `Students who bring a bicycle to campus must register it online before September 15. Registration is free and provides a numbered sticker linked to the owner's contact details. Attach the sticker below the seat where it remains visible. Campus Security can use the registration number to identify a recovered bicycle. Locks are not provided, so riders should still secure bicycles at an approved rack.`, [
        fixedReadingItem(11, 'dl1', 'How can registration help after a bicycle is recovered?', ['It provides a free replacement lock.', 'It links the numbered sticker to the owner’s details.', 'It pays for repairs.', 'It reserves a rack for the entire year.']),
        fixedReadingItem(11, 'dl2', 'What must riders provide for themselves?', ['A registration fee', 'A bicycle sticker', 'A lock', 'A seat']),
      ]),
    passage('t11-r-m2-dl-b', 'Library study-room relocation', DAILY_INSTRUCTIONS,
      `Study Rooms 3 and 4 will be unavailable on Tuesday while new screens are installed. Reservations for those rooms have been moved to Seminar Rooms A and B on the second floor at the same times. Check in at the main desk before going upstairs. Whiteboards are available in both replacement rooms, but borrowers must request markers at check-in. Anyone who no longer needs the reservation should cancel through the library account page.`, [
        fixedReadingItem(11, 'dl3', 'Where have the affected reservations been moved?', ['To Seminar Rooms A and B', 'To the main desk', 'To Study Rooms 1 and 2', 'To an online meeting']),
        fixedReadingItem(11, 'dl4', 'How can a borrower obtain whiteboard markers?', ['By finding them upstairs', 'By bringing a personal screen', 'By canceling the reservation', 'By requesting them at check-in']),
        fixedReadingItem(11, 'dl5', 'What should someone do if the room is no longer needed?', ['Wait until Tuesday evening.', 'Cancel through the library account page.', 'Move the booking to Study Room 3.', 'Return the screen to the desk.']),
      ]),
  ],
  academic: passage('t11-r-m2-ap', 'How Soils Develop', ACADEMIC_INSTRUCTIONS,
    `Soil is not simply broken rock. It is a changing mixture of mineral particles, organic matter, water, air, and living organisms. Soil begins in parent material, which may be weathered bedrock or sediment carried by water, wind, ice, or gravity. The properties of that material influence the texture and chemistry of the developing soil.

Climate affects how quickly minerals weather and how water moves dissolved substances. Organisms also alter soil. Roots open channels, microorganisms transform nutrients, and decaying leaves add organic matter near the surface. Topography changes drainage and erosion: steep slopes may lose material, while lower positions may receive deposits. All of these processes require time, but age alone does not determine a soil's character.

Scientists examine layers called horizons to interpret soil development. A dark surface horizon may contain abundant organic matter, while deeper horizons may show clay or minerals moved from above. Disturbance can interrupt or redirect this pattern. Floods add fresh sediment, erosion removes existing horizons, and human activity may mix layers. Consequently, two nearby soils can differ even under similar weather and across very short distances.`, [
      fixedReadingItem(11, 'ap1', 'What is parent material?', ['Only solid bedrock beneath every soil', 'The dark organic layer at the surface', 'The material in which a soil begins to develop', 'Water stored between soil particles']),
      fixedReadingItem(11, 'ap2', 'How can organisms contribute to soil formation?', ['Roots make channels and decay adds organic matter.', 'They prevent all mineral weathering.', 'They eliminate differences between slopes.', 'They stop water from entering soil.']),
      fixedReadingItem(11, 'ap3', 'Why may soil on a steep slope be thinner?', ['It always receives more deposits.', 'Its parent material contains no minerals.', 'It is necessarily younger than valley soil.', 'Erosion can remove developing material.']),
      fixedReadingItem(11, 'ap4', 'What can soil horizons help scientists interpret?', ['The exact future weather', 'How a soil has developed and materials have moved', 'Only the age of nearby plants', 'The depth of the ocean']),
      fixedReadingItem(11, 'ap5', 'Why can two nearby soils differ?', ['All soils begin with identical material.', 'Climate has no effect below the surface.', 'Parent material, position, organisms, time, and disturbance can differ.', 'Soil development ends after one flood.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET12 = fixedReadingModule2(12, {
  completeWords: {
    id: 't12-r-m2-ctw-v1', objectId: 'object:t12-r-m2-ctw-v1', version: 1,
    title: 'Groundwater', instructions: CTW_INSTRUCTIONS,
    template: 'Groundwater is water stored beneath the land surface in pores and fractures. Rainwater {{1}} enters {{2}} and {{3}} through {{4}} spaces, {{5}} underground {{6}} that {{7}} wells, {{8}}, rivers, {{9}} wetlands {{10}}. The upper surface of the saturated zone is called the water table, and its depth changes with recharge and withdrawal. Groundwater moves slowly through many materials rather than forming vast open underground lakes. Pollution can persist because cleanup below ground is difficult.',
    blanks: fixedCtwBlanks(12, [['slo', 3], ['so', 2], ['ro', 2], ['sm', 3], ['for', 4], ['rese', 4], ['sup', 3], ['spr', 4], ['a', 2], ['nea', 3]]),
  },
  dailyLife: [
    passage('t12-r-m2-dl-a', 'Course-change deadline', DAILY_INSTRUCTIONS,
      `The deadline to add a fall course is Friday at 5:00 p.m. Students may drop a course through the portal until the same time without a notation on the transcript. After Friday, changes require approval from both the instructor and the academic adviser. A course that appears full may still have a waiting list; joining the list does not guarantee a place. Tuition questions should be sent to Student Accounts.`, [
        fixedReadingItem(12, 'dl1', 'What happens when a course is dropped by Friday at 5:00 p.m.?', ['No notation is added to the transcript.', 'The instructor must approve it.', 'The student automatically joins another course.', 'Student Accounts chooses a replacement.']),
        fixedReadingItem(12, 'dl2', 'What does joining a waiting list guarantee?', ['A lower tuition fee', 'Adviser approval', 'A place after Friday', 'Nothing; a place is not guaranteed.']),
      ]),
    passage('t12-r-m2-dl-b', 'Orchestra rehearsal update', DAILY_INSTRUCTIONS,
      `Wednesday's orchestra rehearsal will start thirty minutes later, at 7:00 p.m., because the auditorium is hosting a lecture. String players should use Practice Room 6 for individual warm-up; wind and brass players may use Room 8. Do not enter the auditorium until the stage manager opens the side doors. The rehearsal will still finish at 9:00 p.m., so the final movement will be reviewed at Saturday's session instead.`, [
        fixedReadingItem(12, 'dl3', 'Why will rehearsal begin later?', ['The conductor is absent.', 'A lecture is using the auditorium.', 'The final movement was canceled.', 'The side doors need repairs.']),
        fixedReadingItem(12, 'dl4', 'Where may wind and brass players warm up?', ['In the auditorium', 'In Practice Room 6', 'In Room 8', 'Outside the side doors']),
        fixedReadingItem(12, 'dl5', 'When will the final movement be reviewed?', ['At Saturday’s session', 'Before Wednesday’s lecture', 'After 9:00 p.m. Wednesday', 'During individual warm-up']),
      ]),
  ],
  academic: passage('t12-r-m2-ap', 'How Glaciers Shape Mountain Valleys', ACADEMIC_INSTRUCTIONS,
    `A mountain glacier forms where snow accumulates faster than it melts and gradually compresses into ice. Under its own weight, the ice moves downhill. Although movement may be slow, the glacier can reshape a valley by plucking loose blocks and by abrasion, in which rock fragments carried in the ice scrape the bedrock.

Streams usually erode narrow channels and tend to produce V-shaped valley profiles. A glacier fills more of a valley and erodes its floor and sides, often leaving a broad U-shaped profile. Smaller tributary glaciers may not cut as deeply as the main glacier. After the ice disappears, their valleys remain above the main floor as hanging valleys, sometimes producing waterfalls.

Glaciers also transport material. Debris carried along the sides or at the end of the ice can remain as ridges called moraines. A terminal moraine may mark a former limit of advance, but it does not by itself reveal every change the glacier experienced. Meltwater can sort sand and gravel beyond the ice, whereas material deposited directly by ice is commonly less sorted. Geologists therefore combine landforms, sediment, dating, and modern measurements when reconstructing glacial history.`, [
      fixedReadingItem(12, 'ap1', 'What is abrasion in a glacial setting?', ['Snow changing directly into vapor', 'Rock fragments in the ice scraping bedrock', 'Meltwater freezing above a valley', 'A river depositing sorted sand']),
      fixedReadingItem(12, 'ap2', 'Why do glaciers often create U-shaped valleys?', ['They stop all erosion on valley sides.', 'They carry only fine sediment.', 'They occupy and erode more of the valley than a stream.', 'They always move uphill.']),
      fixedReadingItem(12, 'ap3', 'How can a hanging valley form?', ['A smaller tributary glacier erodes less deeply than the main glacier.', 'A terminal moraine lifts an entire mountain.', 'A river fills a valley with ice.', 'Snowfall stops permanently.']),
      fixedReadingItem(12, 'ap4', 'What can a terminal moraine indicate?', ['The exact temperature on every past day', 'The source of all valley water', 'The age of every rock fragment', 'A former limit reached by a glacier']),
      fixedReadingItem(12, 'ap5', 'Why do geologists use several kinds of evidence?', ['Every moraine is made by a river.', 'One landform cannot reveal the glacier’s complete history.', 'Modern glaciers never transport debris.', 'Glacial sediment is always perfectly sorted.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET13 = fixedReadingModule2(13, {
  completeWords: {
    id: 't13-r-m2-ctw-v1', objectId: 'object:t13-r-m2-ctw-v1', version: 1,
    title: 'Museum Conservation', instructions: CTW_INSTRUCTIONS,
    template: 'Museum conservation aims to slow damage while preserving information carried by objects. Conservators {{1}} examine {{2}} object {{3}} choosing {{4}} that {{5}} damage {{6}} erasing {{7}} evidence {{8}} its {{9}} history {{10}} use. They document condition, materials, and previous repairs before treatment. Light, humidity, pests, pollutants, and physical handling can affect materials differently. For that reason, preventive measures such as stable storage and careful handling often protect more objects than repeated intervention.',
    blanks: fixedCtwBlanks(13, [['care', 5], ['ea', 2], ['bef', 3], ['met', 4], ['sl', 2], ['wit', 4], ['phys', 4], ['fr', 2], ['lo', 2], ['o', 1]]),
  },
  dailyLife: [
    passage('t13-r-m2-dl-a', 'Official transcript request', DAILY_INSTRUCTIONS,
      `Official transcripts can be ordered through the student portal for electronic delivery or sealed paper delivery. Electronic orders are normally processed within one business day. Paper copies take three to five business days before mailing. Students with an unpaid library replacement charge may view an unofficial record but cannot order an official transcript until the charge is resolved. Delivery times begin after processing, not when the request is submitted.`, [
        fixedReadingItem(13, 'dl1', 'How long does normal electronic processing take?', ['Three to five weeks', 'Until the paper copy arrives', 'Within one business day', 'Only after graduation']),
        fixedReadingItem(13, 'dl2', 'What can a student with an unpaid library charge still do?', ['View an unofficial record', 'Order a sealed paper transcript', 'Receive same-day delivery', 'Remove the charge through the transcript page']),
      ]),
    passage('t13-r-m2-dl-b', 'Museum tour schedule', DAILY_INSTRUCTIONS,
      `The architecture tour begins at 11:15 a.m. beside the information desk and lasts about forty minutes. Tickets are free but limited to twelve visitors and may be collected starting at 10:30. The tour includes two staircases; an elevator route is available if requested before departure. Large bags must remain in the staffed cloakroom. Photography is permitted without flash, except inside the temporary textile exhibition.`, [
        fixedReadingItem(13, 'dl3', 'Where does the architecture tour begin?', ['Inside the textile exhibition', 'At the cloakroom', 'Beside the elevator', 'Beside the information desk']),
        fixedReadingItem(13, 'dl4', 'What should a visitor do to use the elevator route?', ['Pay for another ticket.', 'Request it before departure.', 'Bring a large bag.', 'Arrive after the tour begins.']),
        fixedReadingItem(13, 'dl5', 'Where is photography not permitted?', ['At the information desk', 'On both staircases', 'Inside the temporary textile exhibition', 'Anywhere on the tour']),
      ]),
  ],
  academic: passage('t13-r-m2-ap', 'Preventive Conservation in Museums', ACADEMIC_INSTRUCTIONS,
    `Museums cannot prevent all aging, but they can reduce avoidable damage. Preventive conservation manages the surroundings of a collection rather than repeatedly treating each object. Staff monitor light, temperature, relative humidity, pollutants, pests, water risks, and handling. The relative importance of each factor depends on the material and how the object is used.

Light can fade dyes and accelerate chemical change, and its effects accumulate with exposure. Sensitive works may therefore be displayed under lower light or for shorter periods. Moisture presents a different problem. Many organic materials absorb and release water as relative humidity changes, causing expansion and contraction. Very high humidity can also support mold or corrosion, while very low humidity may make some materials brittle. A single environmental setting is not ideal for every collection.

Storage enclosures provide another layer of protection. Boxes and cabinets reduce dust, light, accidental contact, and rapid environmental fluctuations. They must use compatible materials and still allow safe access. Conservators also document an object's condition before moving or treating it. This record helps distinguish new damage from older marks and preserves evidence about past use. The goal is not to make every object look new, but to preserve both material and information.`, [
      fixedReadingItem(13, 'ap1', 'What does preventive conservation primarily manage?', ['Risks in the collection’s surroundings and use', 'The market price of every object', 'Only the appearance of exhibition labels', 'The construction of new museums']),
      fixedReadingItem(13, 'ap2', 'Why may a sensitive object be shown for a shorter period?', ['Short displays eliminate humidity.', 'The object becomes stronger in darkness.', 'Visitors cannot see faded colors.', 'Light damage accumulates with exposure.']),
      fixedReadingItem(13, 'ap3', 'How can changing relative humidity affect organic materials?', ['It makes every material waterproof.', 'Absorption and release of moisture can cause dimensional change.', 'It removes all earlier repairs.', 'It prevents chemical reactions.']),
      fixedReadingItem(13, 'ap4', 'What is one benefit of a storage enclosure?', ['It guarantees that pests never enter a building.', 'It replaces all monitoring.', 'It can reduce dust, light, contact, and rapid fluctuations.', 'It makes every object safe to handle without training.']),
      fixedReadingItem(13, 'ap5', 'Why is condition documentation important?', ['It helps identify later change and preserves evidence.', 'It makes an old object appear new.', 'It determines one setting for every material.', 'It allows staff to discard original marks.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET14 = fixedReadingModule2(14, {
  completeWords: {
    id: 't14-r-m2-ctw-v1', objectId: 'object:t14-r-m2-ctw-v1', version: 1,
    title: 'Ocean Currents', instructions: CTW_INSTRUCTIONS,
    template: 'Ocean currents are continuous movements of seawater across different distances and depths. Ocean {{1}} move {{2}} and {{3}} water {{4}} connected {{5}}, redistributing {{6}} that {{7}} influences {{8}} and {{9}} climate {{10}}. Surface currents are driven mainly by winds and shaped by Earth’s rotation and continents. Deep circulation also reflects differences in water density related to temperature and salinity. Currents vary over time, so scientists combine ships, drifting instruments, satellites, and long-term moorings to observe them.',
    blanks: fixedCtwBlanks(14, [['curr', 4], ['wa', 2], ['co', 2], ['thr', 4], ['bas', 3], ['he', 2], ['stro', 4], ['wea', 4], ['regi', 4], ['patt', 4]]),
  },
  dailyLife: [
    passage('t14-r-m2-dl-a', 'Residence laundry closure', DAILY_INSTRUCTIONS,
      `The laundry room in Cedar Hall will close from 9:00 a.m. Monday until noon Tuesday while two dryers are replaced. Cedar residents may use the Oak Hall laundry room during the closure by tapping their residence card at the east entrance. Machines there accept the same payment account. Detergent is not sold in Oak Hall, and wet clothing may not be left unattended in the corridor.`, [
        fixedReadingItem(14, 'dl1', 'How can Cedar residents enter Oak Hall during the closure?', ['By paying at the corridor', 'By tapping their residence card at the east entrance', 'By borrowing a dryer key', 'By calling the maintenance office']),
        fixedReadingItem(14, 'dl2', 'What is not available in Oak Hall?', ['Payment accounts', 'Washing machines', 'An east entrance', 'Detergent for sale']),
      ]),
    passage('t14-r-m2-dl-b', 'Conference poster printing', DAILY_INSTRUCTIONS,
      `Poster files for the student research conference must be uploaded as PDF by noon on April 8. Choose either portrait or landscape orientation and use the template dimensions; staff will not resize files. One standard print is covered by the conference fee. A corrected reprint costs $18 unless the original problem was caused by the printer. Authors will receive a collection email and must pick up posters before 4:00 p.m. April 10.`, [
        fixedReadingItem(14, 'dl3', 'Which file format is required?', ['A slide presentation', 'An image folder', 'PDF', 'A word-processing file']),
        fixedReadingItem(14, 'dl4', 'When is a corrected reprint free?', ['When the printer caused the original problem', 'Whenever an author changes the title', 'After the conference', 'When the file uses portrait orientation']),
        fixedReadingItem(14, 'dl5', 'How will authors know their posters are ready?', ['The printer will resize the file.', 'They will receive a collection email.', 'The fee will be refunded.', 'A poster will appear in the portal.']),
      ]),
  ],
  academic: passage('t14-r-m2-ap', 'Ocean Circulation and Climate', ACADEMIC_INSTRUCTIONS,
    `The ocean stores a large amount of heat and moves some of it around the planet. Surface currents are driven largely by winds, but their paths are deflected by Earth's rotation and constrained by continents. These currents can carry warm water away from the tropics and cooler water toward lower latitudes, influencing coastal temperatures and the exchange of heat and moisture with the atmosphere.

Circulation also extends far below the surface. Seawater density changes with temperature and salinity. In some high-latitude regions, surface water becomes cold and sufficiently dense to sink, helping connect surface and deep pathways. Mixing, seafloor topography, and winds contribute as well, so the global system is more complex than a single conveyor belt.

Ocean circulation changes across seasons, years, and longer periods. A shift can alter where heat is stored or released and can influence rainfall and marine ecosystems. Scientists monitor currents using satellites, research ships, floats, and moored instruments. No one method observes every depth and timescale: satellites provide broad surface coverage, while floats and moorings measure conditions within the ocean. Combining records helps researchers distinguish short-lived variation from longer changes and test climate models.`, [
      fixedReadingItem(14, 'ap1', 'What primarily drives many surface currents?', ['Seafloor minerals', 'Only salinity differences', 'Volcanic eruptions', 'Winds']),
      fixedReadingItem(14, 'ap2', 'How can surface currents affect coastal climate?', ['They stop heat exchange with air.', 'They transport warm or cool water between regions.', 'They remove continents.', 'They make every coast the same temperature.']),
      fixedReadingItem(14, 'ap3', 'What can cause surface water to sink in some high-latitude regions?', ['Becoming cold and sufficiently dense', 'Receiving more sunlight than the tropics', 'Losing all dissolved salt', 'Moving above a satellite']),
      fixedReadingItem(14, 'ap4', 'Why is a single conveyor-belt description incomplete?', ['Deep water never moves.', 'Only tides affect the ocean.', 'Mixing, topography, winds, and density create a more complex system.', 'Currents remain constant over time.']),
      fixedReadingItem(14, 'ap5', 'Why do scientists combine several observing methods?', ['Each method gives identical data.', 'Ships can observe every ocean continuously.', 'Satellites measure every deep current directly.', 'Different methods cover different depths, areas, and timescales.']),
    ]),
});

export const TOEFL_READING_MODULE2_SET15 = fixedReadingModule2(15, {
  completeWords: {
    id: 't15-r-m2-ctw-v1', objectId: 'object:t15-r-m2-ctw-v1', version: 1,
    title: 'Animal Pollination', instructions: CTW_INSTRUCTIONS,
    template: 'Pollination moves pollen within or between flowers so plants can reproduce. Flowering {{1}} often {{2}} on {{3}} that {{4}} pollen {{5}} blossoms {{6}} searching {{7}} nectar, {{8}}, shelter, {{9}} mates {{10}}. Bees are important pollinators, but flies, beetles, butterflies, birds, and bats also pollinate some plants. A visit transfers pollen only when the animal contacts the relevant flower structures. Flower shape, timing, weather, and surrounding habitat all influence which visitors are effective.',
    blanks: fixedCtwBlanks(15, [['pla', 3], ['dep', 3], ['ani', 4], ['ca', 3], ['bet', 4], ['wh', 3], ['f', 2], ['oi', 2], ['o', 1], ['nea', 3]]),
  },
  dailyLife: [
    passage('t15-r-m2-dl-a', 'Peer tutoring appointment', DAILY_INSTRUCTIONS,
      `Your mathematics tutoring appointment is confirmed for Thursday at 2:30 p.m. in Learning Center Booth 5. Bring the assignment instructions and one example of work you have already attempted. Tutors can explain strategies and review your reasoning, but they cannot complete graded questions for you. To change the appointment, use the booking link at least three hours beforehand. Two missed appointments may suspend booking access for one week.`, [
        fixedReadingItem(15, 'dl1', 'What should the student bring?', ['The assignment instructions and attempted work', 'A completed answer key', 'Payment for the tutor', 'A new booking link']),
        fixedReadingItem(15, 'dl2', 'What are tutors not allowed to do?', ['Review a student’s reasoning', 'Explain strategies', 'Complete graded questions for the student', 'Meet in Booth 5']),
      ]),
    passage('t15-r-m2-dl-b', 'Community garden watering schedule', DAILY_INSTRUCTIONS,
      `During the July water restrictions, gardeners with plots 1–20 may use the shared hose on Mondays and Thursdays; plots 21–40 may use it on Tuesdays and Fridays. Watering is allowed from 6:00 to 8:00 a.m. Hand-held watering cans filled from the rain tank may be used on any day while water remains. Report a leaking hose connection to the coordinator instead of attempting a permanent repair. Mulch is available beside the tool shed.`, [
        fixedReadingItem(15, 'dl3', 'When may the shared hose be used for plot 25?', ['Monday and Thursday', 'Tuesday and Friday', 'Any day after 8:00 a.m.', 'Only on weekends']),
        fixedReadingItem(15, 'dl4', 'What may gardeners use on any day while water is available?', ['The shared hose', 'A repaired connection', 'Water beside the tool shed', 'A hand-held can filled from the rain tank']),
        fixedReadingItem(15, 'dl5', 'What should a gardener do about a leaking connection?', ['Report it to the coordinator.', 'Make a permanent repair.', 'Move the hose to another plot.', 'Use mulch to seal it.']),
      ]),
  ],
  academic: passage('t15-r-m2-ap', 'Diversity in Crop Pollination', ACADEMIC_INSTRUCTIONS,
    `Many crops benefit when insects move pollen among flowers. Managed honey bees provide important services, but they are not the only visitors. Wild bees, flies, beetles, and other animals can contribute, and their effectiveness varies with crop, location, weather, and flower structure. Counting visits alone is insufficient because different visitors may carry or deposit different amounts of compatible pollen.

A diverse pollinator community can operate across a wider range of conditions. One species may forage early in the day, another at lower temperatures, and another may contact a flower in a particularly effective way. This does not mean diversity automatically guarantees high yield. Water, nutrients, crop variety, pests, and farm management can also limit production, and some crops depend little on animal pollination.

Researchers compare flower visits with fruit or seed production and sometimes exclude insects from selected flowers. These methods help estimate how much pollination contributes under local conditions. Results from one region should not be transferred uncritically to another because pollinator communities and farming systems differ. Habitat near fields can provide nesting sites and food outside the crop's flowering period, but its effects depend on landscape and management. Effective planning therefore combines crop needs, local evidence, and protection of both managed and wild pollinators.`, [
      fixedReadingItem(15, 'ap1', 'Why is counting flower visits alone insufficient?', ['Every visitor is a honey bee.', 'Visitors differ in how much compatible pollen they transfer.', 'Only nighttime visits matter.', 'A visit always guarantees fruit production.']),
      fixedReadingItem(15, 'ap2', 'How can pollinator diversity help?', ['Different species may work under different conditions or contact flowers differently.', 'It removes the need for water and nutrients.', 'It makes every crop dependent on insects.', 'It prevents all pest damage.']),
      fixedReadingItem(15, 'ap3', 'Why does diversity not guarantee high crop yield?', ['Wild insects never carry pollen.', 'Farmers cannot observe flower visits.', 'Other biological and management factors can limit production.', 'All crops use identical varieties.']),
      fixedReadingItem(15, 'ap4', 'What can excluding insects from selected flowers help estimate?', ['The age of the surrounding soil', 'The number of farms in a country', 'Only the temperature at flowering', 'The contribution of animal pollination under local conditions']),
      fixedReadingItem(15, 'ap5', 'What planning approach does the passage support?', ['Using results from one region everywhere', 'Combining crop needs, local evidence, and protection of managed and wild pollinators', 'Replacing all wild pollinators with one species', 'Ignoring habitat outside the flowering period']),
    ]),
});

export const TOEFL_READING_MODULE2_SETS_11_TO_15 = [
  TOEFL_READING_MODULE2_SET11,
  TOEFL_READING_MODULE2_SET12,
  TOEFL_READING_MODULE2_SET13,
  TOEFL_READING_MODULE2_SET14,
  TOEFL_READING_MODULE2_SET15,
] as const;
