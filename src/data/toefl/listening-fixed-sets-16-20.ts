import {
  fixedListeningChoose,
  fixedListeningItem,
  fixedListeningSet,
  fixedListeningStimulus,
} from './listening-fixed-types.ts';

const CONVERSATION_INSTRUCTIONS = 'Listen to a short conversation. Then answer questions 1–2. The audio plays once.';
const ANNOUNCEMENT_INSTRUCTIONS = 'Listen to an announcement. Then answer questions 1–2. The audio plays once.';
const ACADEMIC_INSTRUCTIONS = 'Listen to an academic talk. Then answer questions 1–4. The audio plays once.';

const item = (setNumber: number, code: string, prompt: string, options: readonly string[]) =>
  fixedListeningItem(setNumber, code, prompt, options);

export const TOEFL_FIXED_LISTENING_SET16 = fixedListeningSet(16, {
  module1ChooseAdditions: [
    fixedListeningChoose(16, 'm1', 6, 'woman', 'When should the borrowed microphone be returned?', ['The microphone records clearly.', 'I borrowed it on Tuesday.', 'By noon on the day after the event.', 'The return desk is near the studio.']),
    fixedListeningChoose(16, 'm1', 7, 'man', 'I am having trouble opening the shared document.', ['The document contains five sections.', 'I opened the window this morning.', 'The shared office is downstairs.', 'I will check whether you have editing access.']),
    fixedListeningChoose(16, 'm1', 8, 'woman', 'Would you like to join us for lunch after class?', ['Thanks, I would. Where are you going?', 'The class ends at twelve.', 'Lunch is my favorite meal.', 'I joined the course last week.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(16, 'm2', 1, 'man', 'Who is organizing the neighborhood clean-up?', ['The neighborhood has a small park.', 'The environmental club is coordinating it.', 'I organized my desk yesterday.', 'Clean-up supplies are in the garage.']),
      fixedListeningChoose(16, 'm2', 2, 'woman', 'This graph is difficult to read on the projector.', ['Let us increase the contrast and font size.', 'The graph compares two years.', 'I read the report last night.', 'The projector hangs from the ceiling.']),
      fixedListeningChoose(16, 'm2', 3, 'man', 'Did you remember to cancel the original reservation?', ['The original painting is in the gallery.', 'I remember the first workshop.', 'Yes, the cancellation email arrived this morning.', 'The reservation is for Saturday.']),
      fixedListeningChoose(16, 'm2', 4, 'woman', 'Where can I charge my phone in this building?', ['The building closes at eight.', 'My phone battery is almost empty.', 'I was charged for two tickets.', 'There are outlets beside the information desk.']),
      fixedListeningChoose(16, 'm2', 5, 'man', 'Why is the rehearsal ending early today?', ['The rehearsal includes three songs.', 'The pianist must leave for another performance.', 'Today’s weather is unusually cold.', 'The performance begins next month.']),
      fixedListeningChoose(16, 'm2', 6, 'woman', 'I think the package was delivered to the wrong office.', ['The package contains laboratory glassware.', 'The delivery van is parked outside.', 'My office moved to another floor.', 'Let us check the room number on the label.']),
      fixedListeningChoose(16, 'm2', 7, 'man', 'Could you explain how to reserve a practice booth?', ['Use the music center’s online calendar.', 'The booth contains a piano.', 'I practiced for the concert yesterday.', 'The music center is across campus.']),
      fixedListeningChoose(16, 'm2', 8, 'woman', 'How was the train ride from the coast?', ['The coast has several beaches.', 'The train arrived at platform four.', 'Smooth, except for a short delay near the city.', 'I rode my bicycle to the station.']),
    ],
    conversation: fixedListeningStimulus(
      16, 'm2-conversation', 'conversation', 'Borrowing field research equipment', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I need a soil moisture sensor for Saturday’s field trip, but the equipment page shows none available.

TECHNICIAN: One kit is reserved for a class that may be cancelled because of weather. I cannot release it yet.

STUDENT: Is there another way to collect the measurement?

TECHNICIAN: You can borrow two manual probes today. They take longer to read but provide the same type of measurement. If the electronic kit becomes free Friday morning, I will email you and exchange it before the center closes.`,
      ['student', 'announcer'], [
        item(16, 'm2-cv1', 'Why can the technician not release the electronic kit now?', ['The sensor was damaged on a field trip.', 'It is still reserved for another class.', 'The student has not completed a safety course.', 'The equipment center is already closed.']),
        item(16, 'm2-cv2', 'What can the student borrow today?', ['A weather station', 'An electronic kit', 'Two manual probes', 'A different class’s equipment']),
      ],
    ),
    announcement: fixedListeningStimulus(
      16, 'm2-announcement', 'announcement', 'Café renovation and service point', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The ground-floor café will close after lunch today and remain closed for renovation until September. During the work, coffee, sandwiches, and meal-plan purchases will be available from a temporary counter in the east lobby on weekdays from eight until four. The counter will not accept cash. The nearest evening food service is in North Hall, which remains open until nine.`,
      ['announcer'], [
        item(16, 'm2-an1', 'Where will daytime café items be sold during renovation?', ['At a temporary counter in the east lobby', 'Outside the ground-floor café', 'In the equipment center', 'At the North Hall entrance']),
        item(16, 'm2-an2', 'What restriction applies at the temporary counter?', ['It closes before lunch.', 'It sells only beverages.', 'It does not accept meal plans.', 'It will not accept cash.']),
      ],
    ),
    academic: fixedListeningStimulus(
      16, 'm2-academic-talk', 'academic-talk', 'Measuring Glacier Mass Balance', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: A glacier gains mass through snowfall and loses it through melting, sublimation, and breaking ice. The difference over a period is its mass balance. A positive balance means the glacier gained more ice than it lost; a negative balance means a net loss. One year alone does not define a trend.

Researchers measure mass balance in several ways. Stakes placed in the ice reveal surface lowering or accumulation at specific locations. Snow pits help estimate how much snow accumulated and how dense it is. Because a few field points cannot describe every part of a large glacier, scientists combine them with aerial or satellite measurements of elevation, area, and gravity-related mass change. Each method has different spatial coverage and uncertainty.

Losing grounded glacier ice adds water to the ocean and contributes to sea-level rise. Floating ice already displaces water, so its direct effect differs, although ice shelves can restrain grounded ice behind them. Glacier retreat also changes seasonal water supply in some regions. Scientists therefore distinguish mass from length: a glacier front can advance because ice flows forward even while the glacier has a negative mass balance. Reliable assessment uses repeated measurements and multiple lines of evidence.`,
      ['professor'], [
        item(16, 'm2-at1', 'What does negative glacier mass balance mean?', ['The glacier moved downhill during one day.', 'Snow became less dense than ice.', 'The glacier lost more mass than it gained.', 'Every part of the glacier melted completely.']),
        item(16, 'm2-at2', 'Why do scientists combine field and satellite measurements?', ['One stake describes an entire ice sheet perfectly.', 'The methods provide different coverage and evidence.', 'Satellites directly measure every snow crystal.', 'Field measurements cannot detect snow depth.']),
        item(16, 'm2-at3', 'Why does the professor distinguish floating from grounded ice?', ['Floating ice never changes shape.', 'Grounded ice cannot flow toward the sea.', 'Only floating ice contains frozen water.', 'Their direct effects on sea level differ.']),
        item(16, 'm2-at4', 'Why can glacier length alone be misleading?', ['The front can advance even during net mass loss.', 'Glaciers gain mass only at their fronts.', 'Length measurements reveal exact snow density.', 'Every advance proves a positive long-term balance.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET17 = fixedListeningSet(17, {
  module1ChooseAdditions: [
    fixedListeningChoose(17, 'm1', 6, 'man', 'Why did the editor return your article?', ['The editor works from home.', 'I need to add sources for two claims.', 'The article was published last year.', 'I returned the book this morning.']),
    fixedListeningChoose(17, 'm1', 7, 'woman', 'Could we sit somewhere closer to the stage?', ['There are two empty seats in the front row.', 'The stage was built last month.', 'I sat near the door yesterday.', 'The performance starts at seven.']),
    fixedListeningChoose(17, 'm1', 8, 'man', 'I thought Marina was bringing the survey materials.', ['The survey asks about transportation.', 'Marina brought her laptop.', 'The materials are in a blue folder.', 'She was, but her train has been delayed.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(17, 'm2', 1, 'woman', 'How often is the campus newsletter published?', ['The newsletter includes club announcements.', 'I published an article in June.', 'Every second Monday during the semester.', 'The campus has several news screens.']),
      fixedListeningChoose(17, 'm2', 2, 'man', 'The workshop room does not have enough chairs.', ['The workshop covers interview skills.', 'I sat in the first chair.', 'The room is beside the elevator.', 'I will ask facilities to bring more.']),
      fixedListeningChoose(17, 'm2', 3, 'woman', 'Where did you upload the revised photograph?', ['The photograph was taken outdoors.', 'To the shared folder under Final Images.', 'I revised the caption twice.', 'The folder contains ten files.']),
      fixedListeningChoose(17, 'm2', 4, 'man', 'Would Friday afternoon be too late for your response?', ['No, that still gives me enough time.', 'Friday is the final weekday.', 'The response has three paragraphs.', 'I was late to class yesterday.']),
      fixedListeningChoose(17, 'm2', 5, 'woman', 'I cannot decide between the morning and evening sections.', ['The morning section begins at eight.', 'I decided to walk this evening.', 'Compare them with your work schedule.', 'The course has four sections.']),
      fixedListeningChoose(17, 'm2', 6, 'man', 'Who can help me replace a lost transit pass?', ['The transportation office handles replacements.', 'The pass is valid for one month.', 'I lost my umbrella on the bus.', 'The office replaced the sign.']),
      fixedListeningChoose(17, 'm2', 7, 'woman', 'Did you notice that the room number changed?', ['The room contains new furniture.', 'I noticed a mistake in the report.', 'The number has three digits.', 'Yes, the class now meets in 318.']),
      fixedListeningChoose(17, 'm2', 8, 'man', 'The printer produced another blank page.', ['The page is part of the report.', 'Check whether the ink cartridge is empty.', 'Another printer is in the library.', 'I printed the schedule yesterday.']),
    ],
    conversation: fixedListeningStimulus(
      17, 'm2-conversation', 'conversation', 'Requesting a transcript for an application', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My graduate application requires an official transcript, and the deadline is next Monday. Can I collect one today?

REGISTRAR: Official transcripts are sent electronically or by sealed mail; we do not print them at this desk. Electronic delivery usually takes one business day.

STUDENT: The application portal asks for a document now.

REGISTRAR: Upload the unofficial copy from your student account for the initial review, then order the official version directly to the university. Confirm that institution’s address before paying, because an official order cannot be redirected after processing begins.`,
      ['student', 'announcer'], [
        item(17, 'm2-cv1', 'Why can the student not collect an official transcript at the desk?', ['The application deadline has passed.', 'The student’s account is inactive.', 'The registrar has no transcript record.', 'Official copies are sent electronically or by sealed mail.']),
        item(17, 'm2-cv2', 'What should the student upload for the initial review?', ['An unofficial transcript from the student account', 'A photograph of a sealed envelope', 'A receipt for the graduate application', 'The registrar’s mailing address']),
      ],
    ),
    announcement: fixedListeningStimulus(
      17, 'm2-announcement', 'announcement', 'Indoor track closure', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The indoor running track will close from noon Thursday until eight a.m. Saturday while crews replace damaged flooring. The fitness room and swimming pool will remain open. Track reservations during the closure have been cancelled automatically, and users will receive account credits. Friday’s running club will meet outside at the south entrance if weather permits; a cancellation notice will be posted by four p.m. Thursday.`,
      ['announcer'], [
        item(17, 'm2-an1', 'What will remain open during the track closure?', ['Only the outdoor running path', 'The equipment repair office', 'The fitness room and swimming pool', 'The damaged section of track']),
        item(17, 'm2-an2', 'How will users be compensated for cancelled reservations?', ['They may enter before noon.', 'They will receive account credits.', 'They can use the track Friday.', 'They will receive new running shoes.']),
      ],
    ),
    academic: fixedListeningStimulus(
      17, 'm2-academic-talk', 'academic-talk', 'How Bats Use Echolocation', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Many bats navigate and hunt by producing high-frequency calls and listening for echoes. Much of this sound is ultrasonic, above human hearing. The delay between a call and its echo provides information about distance. Differences in intensity, timing at the two ears, and spectral structure can indicate direction, size, surface, or motion.

Calls are not all identical. A bat searching open space may use signals suited to detecting objects at a distance. As it approaches an insect, it often sends calls more rapidly, producing a feeding buzz that updates the target’s location quickly. Species and environments differ, so one call pattern should not be treated as universal.

Echolocation also has constraints. Producing calls uses energy, echoes can overlap with other bats, and vegetation creates complex reflections. Some prey hear bat calls and may take evasive action. Bats are not blind; many also use vision, smell, memory, and other cues. Scientists record calls with specialized microphones and display them as spectrograms. Recordings can help identify activity or sometimes species, but call overlap and variation require care. Echolocation is a flexible sensory system, not a simple replacement for eyesight.`,
      ['professor'], [
        item(17, 'm2-at1', 'What can the delay before an echo returns indicate?', ['The distance to an object', 'The age of the bat', 'The air temperature at sunset', 'The color of an insect']),
        item(17, 'm2-at2', 'What happens as a bat approaches insect prey?', ['It stops producing sound entirely.', 'It changes every call into a social signal.', 'It relies only on eyesight.', 'It often sends calls more rapidly.']),
        item(17, 'm2-at3', 'Why does the professor mention vision and smell?', ['To argue that bats cannot hear ultrasound', 'To show bats use cues in addition to echolocation', 'To explain why every bat is blind', 'To define how a spectrogram records light']),
        item(17, 'm2-at4', 'What limitation applies to acoustic species identification?', ['Every species always has one identical call.', 'Calls cannot be recorded electronically.', 'Call patterns can overlap and vary.', 'Only human-audible calls appear in recordings.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET18 = fixedListeningSet(18, {
  module1ChooseAdditions: [
    fixedListeningChoose(18, 'm1', 6, 'woman', 'Do you know why the bookstore line is so long?', ['The bookstore sells art supplies.', 'The line begins near the entrance.', 'I bought the textbook online.', 'A new course packet was released today.']),
    fixedListeningChoose(18, 'm1', 7, 'man', 'Could I leave these boxes here until this afternoon?', ['The boxes contain old files.', 'I left my coat upstairs.', 'Yes, as long as they do not block the doorway.', 'This afternoon’s meeting was cancelled.']),
    fixedListeningChoose(18, 'm1', 8, 'woman', 'I expected the repair estimate to arrive yesterday.', ['The repair requires a special tool.', 'Call the shop and ask for an update.', 'Yesterday was the first of May.', 'The estimate lists labor costs.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(18, 'm2', 1, 'man', 'Where should I meet the hiking group?', ['At the north gate beside the trail map.', 'The hike covers eight kilometers.', 'I met the group last spring.', 'The map is printed on waterproof paper.']),
      fixedListeningChoose(18, 'm2', 2, 'woman', 'I am unsure whether the conclusion follows from the data.', ['The conclusion is one paragraph long.', 'Let us examine the evidence together.', 'The data table uses percentages.', 'I followed the path to the river.']),
      fixedListeningChoose(18, 'm2', 3, 'man', 'When is the replacement instructor arriving?', ['The instructor teaches mathematics.', 'A replacement window was ordered.', 'I arrived before the class started.', 'Her train is due at two fifteen.']),
      fixedListeningChoose(18, 'm2', 4, 'woman', 'Would you mind moving your bicycle away from the ramp?', ['The bicycle has a front basket.', 'I moved here last September.', 'Certainly. I did not realize it was blocking access.', 'The ramp leads to the side entrance.']),
      fixedListeningChoose(18, 'm2', 5, 'man', 'How did the audience react to the final scene?', ['Most people remained completely silent.', 'The scene was filmed at night.', 'I reacted to the article online.', 'The audience entered through two doors.']),
      fixedListeningChoose(18, 'm2', 6, 'woman', 'The meeting agenda is missing the budget discussion.', ['The meeting is in Conference Room B.', 'I discussed the budget with Alex.', 'I will add it before sending the final version.', 'The missing folder was found.']),
      fixedListeningChoose(18, 'm2', 7, 'man', 'Why did you choose the earlier laboratory section?', ['The laboratory has twelve workstations.', 'It fits better with my afternoon job.', 'I chose the blue folder.', 'The earlier train was delayed.']),
      fixedListeningChoose(18, 'm2', 8, 'woman', 'Could you tell me how to reach the botanical garden?', ['The garden grows native plants.', 'I reached the station at noon.', 'The botanical course is full.', 'Take the path behind the greenhouse.']),
    ],
    conversation: fixedListeningStimulus(
      18, 'm2-conversation', 'conversation', 'Arranging an accessible event seat', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I bought a ticket for the lecture, but I recently injured my leg and cannot use the stairs to the balcony.

BOX OFFICE STAFF: We can move you to an accessible seat on the main floor at no extra charge.

STUDENT: May my friend sit beside me?

BOX OFFICE STAFF: Yes. The companion seat is included in the accessible area, but I need both ticket numbers to change the reservation. Send them through the box office form today, and we will email two replacement tickets.`,
      ['student', 'announcer'], [
        item(18, 'm2-cv1', 'What does the staff member offer to do?', ['Move the student to an accessible main-floor seat', 'Install a lift to the balcony', 'Refund every lecture ticket', 'Delay the lecture until the student recovers']),
        item(18, 'm2-cv2', 'What information must the student provide?', ['A medical report', 'Both ticket numbers', 'The lecturer’s email address', 'A payment for the companion seat']),
      ],
    ),
    announcement: fixedListeningStimulus(
      18, 'm2-announcement', 'announcement', 'Museum photography policy', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Personal photography is permitted in the museum’s permanent galleries beginning today, but flashes, tripods, and selfie sticks remain prohibited. Some borrowed exhibitions do not allow any photography; signs at their entrances identify those restrictions. Images may be used for personal, noncommercial purposes. News or commercial crews must arrange permission in advance through the communications office. Please keep aisles and emergency exits clear while taking photographs.`,
      ['announcer'], [
        item(18, 'm2-an1', 'Which item remains prohibited in the permanent galleries?', ['A personal camera', 'A museum guide', 'A mobile phone', 'A tripod']),
        item(18, 'm2-an2', 'Who must arrange permission in advance?', ['Visitors photographing permanent displays', 'Students carrying mobile phones', 'News or commercial crews', 'People viewing borrowed exhibitions']),
      ],
    ),
    academic: fixedListeningStimulus(
      18, 'm2-academic-talk', 'academic-talk', 'Biological Nitrogen Fixation', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Nitrogen gas makes up most of Earth’s atmosphere, yet most plants cannot use it directly. Nitrogen is essential in proteins and nucleic acids, so plants need accessible compounds from soil. Biological nitrogen fixation supplies some through microorganisms that convert atmospheric nitrogen gas into ammonia or related forms.

An important agricultural example involves rhizobia bacteria and legumes such as beans, peas, and soybeans. The bacteria live in structures on the roots called nodules. The plant supplies energy-rich carbon compounds and a protected environment; the bacteria provide fixed nitrogen that can be incorporated into plant molecules. This is a mutual relationship, but an effective partnership depends on compatible organisms and suitable conditions.

Nitrogen fixation is not the entire nitrogen cycle. Other microorganisms transform ammonium into nitrate, decompose organic matter, or return nitrogen gas to the atmosphere. Farmers may use legumes in rotations to add biologically fixed nitrogen, but the amount available to a later crop varies. Some nitrogen remains in harvested material, and soil processes can move nitrogen into water or the atmosphere. Fixation also requires considerable energy from the organism performing it. The useful lesson is that atmospheric abundance does not equal biological availability; microorganisms perform chemical transformations that connect the two.`,
      ['professor'], [
        item(18, 'm2-at1', 'Why can most plants not use atmospheric nitrogen directly?', ['Nitrogen exists only inside animal tissue.', 'They require nitrogen in accessible chemical compounds.', 'Their roots contain no proteins.', 'Atmospheric nitrogen immediately becomes nitrate.']),
        item(18, 'm2-at2', 'What do rhizobia receive from a legume?', ['Energy-rich compounds and a protected environment', 'A permanent supply of atmospheric oxygen', 'Nitrate produced by every other microorganism', 'Seeds from an unrelated plant species']),
        item(18, 'm2-at3', 'Why does the professor mention other microorganisms?', ['To show that legumes perform every nitrogen transformation', 'To argue that fixation never occurs in soil', 'To place fixation within a larger nitrogen cycle', 'To prove that all soil nitrogen remains available']),
        item(18, 'm2-at4', 'What is the main point of the talk?', ['Harvested crops return all nitrogen to soil.', 'Plants can use nitrogen gas without any transformation.', 'Fertilizer and fixation always supply equal amounts.', 'Microorganisms make atmospheric nitrogen biologically available.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET19 = fixedListeningSet(19, {
  module1ChooseAdditions: [
    fixedListeningChoose(19, 'm1', 6, 'man', 'Where can I find the updated safety instructions?', ['They are posted beside the laboratory entrance.', 'The update was completed yesterday.', 'I found my notebook under the bench.', 'The entrance requires an identification card.']),
    fixedListeningChoose(19, 'm1', 7, 'woman', 'Would tomorrow morning be convenient for the interview?', ['The interview asks about local history.', 'Tomorrow’s forecast includes rain.', 'The morning bus arrives at eight.', 'Yes, any time after ten works for me.']),
    fixedListeningChoose(19, 'm1', 8, 'man', 'I cannot believe the café has sold out of soup again.', ['The café opened last summer.', 'I brought a sandwich from home.', 'We should come earlier next time.', 'The soup contains tomatoes.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(19, 'm2', 1, 'woman', 'Who is responsible for checking the citations?', ['The article cites several studies.', 'Our copy editor will verify them.', 'I checked the schedule online.', 'The editor’s office is nearby.']),
      fixedListeningChoose(19, 'm2', 2, 'man', 'The reservation system shows two different room numbers.', ['The rooms are on separate floors.', 'I reserved the larger table.', 'Call the events office to confirm the correct one.', 'The number two appears twice.']),
      fixedListeningChoose(19, 'm2', 3, 'woman', 'Could I exchange this ticket for the evening performance?', ['Yes, if seats are still available.', 'The performance lasts two hours.', 'I exchanged some money at the airport.', 'The ticket was printed yesterday.']),
      fixedListeningChoose(19, 'm2', 4, 'man', 'Why are you carrying all those reference books?', ['The reference desk closes at six.', 'I referred to the email earlier.', 'The books are heavy.', 'I am preparing a literature review.']),
      fixedListeningChoose(19, 'm2', 5, 'woman', 'How long does the computer update usually take?', ['The computer has a large screen.', 'About fifteen minutes, unless the network is slow.', 'I updated the spreadsheet yesterday.', 'The network connects every office.']),
      fixedListeningChoose(19, 'm2', 6, 'man', 'I thought the equipment demonstration was optional.', ['It is required before you borrow the camera.', 'The camera includes two batteries.', 'I demonstrated the technique in class.', 'Optional courses appear in blue.']),
      fixedListeningChoose(19, 'm2', 7, 'woman', 'Did Ravi mention why he missed the appointment?', ['The appointment was at noon.', 'Ravi mentioned a new restaurant.', 'He missed the first question.', 'His earlier meeting ran longer than expected.']),
      fixedListeningChoose(19, 'm2', 8, 'man', 'Would you mind checking the oven before we leave?', ['The oven is beside the refrigerator.', 'I checked my email before lunch.', 'Certainly. I will make sure it is off.', 'We left the building at five.']),
    ],
    conversation: fixedListeningStimulus(
      19, 'm2-conversation', 'conversation', 'Correcting a payroll record', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My campus job payment is short by four hours. The online record shows that I left early last Thursday, but I worked the full shift.

SUPERVISOR: I see the problem. The time clock stopped recording after the network interruption.

STUDENT: Can the missing hours be added to this week’s payment?

SUPERVISOR: Payroll for this week has already closed. I will submit a correction today, and the amount will appear as a separate adjustment next Friday. Keep this confirmation number in case the change does not appear.`,
      ['student', 'announcer'], [
        item(19, 'm2-cv1', 'What caused the incorrect work record?', ['The student arrived four hours late.', 'The supervisor entered the wrong date.', 'The time clock stopped after a network interruption.', 'The student forgot the work schedule.']),
        item(19, 'm2-cv2', 'When should the missing payment appear?', ['Immediately after the conversation', 'At the end of the semester', 'In this week’s regular payment', 'As a separate adjustment next Friday']),
      ],
    ),
    announcement: fixedListeningStimulus(
      19, 'm2-announcement', 'announcement', 'Public lecture overflow room', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: All seats in the auditorium for tonight’s public lecture have been assigned. Additional guests may watch a live video in Room 204, where doors open at six forty-five. No separate ticket is needed for the overflow room. Questions submitted from either location through the event application will be considered during the final discussion. A recording will be posted next week, but the speaker’s slides will not be distributed.`,
      ['announcer'], [
        item(19, 'm2-an1', 'What can additional guests do?', ['Watch a live video in Room 204', 'Stand at the back of the auditorium', 'Collect tickets from the speaker', 'Enter only during the final discussion']),
        item(19, 'm2-an2', 'What will be posted next week?', ['The speaker’s slides', 'A recording of the lecture', 'A list of assigned seats', 'Questions from the application']),
      ],
    ),
    academic: fixedListeningStimulus(
      19, 'm2-academic-talk', 'academic-talk', 'Tree Rings as Climate Proxies', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: In regions with a distinct growing season, many trees add one growth ring each year. Ring width, density, and chemistry can respond to environmental conditions. Scientists use these measurements as proxy data—indirect evidence extending climate information before modern instruments.

A wide ring does not universally mean a warm or wet year. Growth may be limited mainly by moisture in one dry location, by temperature near a high-elevation tree line, or by nonclimatic factors such as insects, competition, fire, or age. Researchers first compare ring measurements with local instrumental weather records during their period of overlap. A stable statistical relationship can then support a reconstruction of earlier conditions.

Dating is equally important. Crossdating matches distinctive sequences among living trees, dead wood, and wooden objects. The shared pattern assigns calendar years and can reveal a missing ring. Scientists sample many trees rather than treating one trunk as a regional record. They also compare reconstructions with other proxies and historical evidence. Tree rings can provide annual records spanning centuries or longer, but their climate signal must be calibrated for a place, species, and limiting condition. A proxy is evidence to interpret, not a thermometer hidden inside wood.`,
      ['professor'], [
        item(19, 'm2-at1', 'Why are tree rings called proxy data?', ['They directly record modern thermometer readings.', 'They make every tree grow at the same rate.', 'They replace the need for calendar dating.', 'They provide indirect evidence of past conditions.']),
        item(19, 'm2-at2', 'Why does a wide ring not have one universal meaning?', ['Trees never respond to climate.', 'Every ring forms over several decades.', 'Different factors limit growth in different settings.', 'Ring width measures only the age of a tree.']),
        item(19, 'm2-at3', 'What is the purpose of crossdating?', ['To match patterns and assign rings to calendar years', 'To remove all narrow rings from a sample', 'To compare tree height with ocean temperature', 'To make dead wood begin growing again']),
        item(19, 'm2-at4', 'Why do scientists sample many trees?', ['A single tree provides a complete global record.', 'Multiple samples help separate shared signals from individual effects.', 'Sampling prevents weather from affecting growth.', 'Every species has an identical climate response.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET20 = fixedListeningSet(20, {
  module1ChooseAdditions: [
    fixedListeningChoose(20, 'm1', 6, 'woman', 'Did the conference organizer confirm your presentation time?', ['The presentation has twelve slides.', 'The organizer works in another city.', 'Yes, I am scheduled for eleven twenty.', 'The conference lasts three days.']),
    fixedListeningChoose(20, 'm1', 7, 'man', 'Why is the side entrance locked already?', ['The entrance faces the parking lot.', 'The building switched to evening access at six.', 'I locked my bicycle outside.', 'The evening lecture starts soon.']),
    fixedListeningChoose(20, 'm1', 8, 'woman', 'Could you save me a copy of the handout?', ['Of course. I will put one on your desk.', 'The handout has a useful diagram.', 'I saved the file on my computer.', 'The copy room is downstairs.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(20, 'm2', 1, 'man', 'When can students begin using the new studio?', ['The studio contains recording equipment.', 'Students designed the wall display.', 'The new building opens in June.', 'As soon as the safety inspection is complete.']),
      fixedListeningChoose(20, 'm2', 2, 'woman', 'I think the first paragraph repeats the introduction.', ['You could replace it with the specific example.', 'The introduction is on page one.', 'I repeated the measurement twice.', 'The paragraph contains four sentences.']),
      fixedListeningChoose(20, 'm2', 3, 'man', 'Where did the department post the internship results?', ['The internship lasts six weeks.', 'I posted the package this morning.', 'On the notice board beside the main office.', 'The department results improved this year.']),
      fixedListeningChoose(20, 'm2', 4, 'woman', 'Which seat would you rather have, by the window or on the aisle?', ['The window is slightly open.', 'The aisle seat, if it is still available.', 'I prefer tea to coffee.', 'The seats were recently cleaned.']),
      fixedListeningChoose(20, 'm2', 5, 'man', 'Why has the field trip departure been delayed?', ['The field site is near the coast.', 'We departed early last year.', 'The bus driver is checking a warning light.', 'The trip includes a guided walk.']),
      fixedListeningChoose(20, 'm2', 6, 'woman', 'The table in our report is missing two values.', ['The report was submitted last week.', 'Two tables are in the appendix.', 'I value your opinion.', 'I will retrieve them from the original data file.']),
      fixedListeningChoose(20, 'm2', 7, 'man', 'Could you tell me who approved this purchase?', ['The finance director signed the request.', 'The purchase arrived on Monday.', 'I approved of the new design.', 'The director’s signature is difficult to read.']),
      fixedListeningChoose(20, 'm2', 8, 'woman', 'How was the accommodation near the research station?', ['The station is far from town.', 'Basic, but clean and surprisingly quiet.', 'The research lasted three weeks.', 'I accommodated another visitor.']),
    ],
    conversation: fixedListeningStimulus(
      20, 'm2-conversation', 'conversation', 'Moving a presentation to a larger room', CONVERSATION_INSTRUCTIONS,
      `STUDENT: Forty people registered for our project presentation, but the room I booked has only thirty seats.

EVENTS COORDINATOR: Room 205 holds fifty and is free at the same time. I can transfer the reservation.

STUDENT: Will the registration page update automatically?

EVENTS COORDINATOR: The room listing will update, but people already registered will not receive a new notice unless you send one. I will confirm Room 205 now. Then use the attendee list to email the change and replace the room number on your poster.`,
      ['student', 'announcer'], [
        item(20, 'm2-cv1', 'Why does the presentation need a different room?', ['Room 205 has no projector.', 'More people registered than the original room can hold.', 'The presentation time was cancelled.', 'The coordinator reserved the wrong date.']),
        item(20, 'm2-cv2', 'What must the student do after the room is changed?', ['Pay for fifty additional seats', 'Create a second registration page', 'Move the presentation to another day', 'Notify existing attendees of the new room']),
      ],
    ),
    announcement: fixedListeningStimulus(
      20, 'm2-announcement', 'announcement', 'Elevator inspection schedule', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The east elevator in the administration building will be unavailable Tuesday from nine a.m. until approximately one p.m. for its annual safety inspection. The west elevator and all stairways will remain open. Anyone needing step-free access to offices on floors two through five should enter through the west lobby. Deliveries larger than the west elevator can carry must be scheduled for another day.`,
      ['announcer'], [
        item(20, 'm2-an1', 'Why will the east elevator be unavailable?', ['It will undergo its annual safety inspection.', 'A large delivery is blocking it.', 'The west lobby is being rebuilt.', 'The building is closing for the day.']),
        item(20, 'm2-an2', 'Where should people needing step-free access enter?', ['Through the east stairway', 'At the delivery entrance', 'Through the west lobby', 'On the fifth floor']),
      ],
    ),
    academic: fixedListeningStimulus(
      20, 'm2-academic-talk', 'academic-talk', 'Why Auroras Glow', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: The Sun releases charged particles called the solar wind. Earth’s magnetic field deflects much of this flow and forms a magnetosphere. Under suitable conditions, solar-wind energy disturbs that system, and energetic particles follow magnetic field lines toward the upper atmosphere, especially at high latitudes.

When those particles collide with atoms and molecules, they transfer energy to them. The energized gases later release light as they return toward lower-energy states. Color depends partly on which gas emits the light, the altitude, and the energy involved. Oxygen commonly contributes green or red emissions, while nitrogen can contribute blue or purple. The process is more specific than saying sunlight simply reflects from polar air.

Auroras often form ovals around the magnetic rather than geographic poles. During stronger disturbances, the oval can expand and auroras may appear at lower latitudes. Visibility still depends on cloud cover, darkness, and geometry. Scientists combine solar observations, spacecraft measurements, magnetometers, radar, and cameras. Forecasts describe probabilities because the timing and magnetic orientation of arriving solar material affect how strongly it couples with Earth’s magnetosphere. An aurora is visible evidence of interactions across the Sun–Earth system.`,
      ['professor'], [
        item(20, 'm2-at1', 'What role does Earth’s magnetic field play in auroras?', ['It creates all charged particles inside the atmosphere.', 'It helps guide energetic particles toward high latitudes.', 'It turns sunlight directly into green paint.', 'It prevents every solar particle from entering the system.']),
        item(20, 'm2-at2', 'Why do atmospheric gases emit auroral light?', ['They freeze after sunset.', 'They reflect city lights from the ground.', 'They lose all their atoms during a storm.', 'They release energy after particle collisions excite them.']),
        item(20, 'm2-at3', 'Why may auroras appear at lower latitudes during a strong disturbance?', ['The auroral oval can expand.', 'The geographic poles move toward the equator.', 'Clouds push charged particles southward.', 'The atmosphere stops containing oxygen.']),
        item(20, 'm2-at4', 'Why are aurora forecasts probabilistic?', ['Solar wind can never be measured.', 'Auroras occur at the same brightness every night.', 'Coupling depends on timing and magnetic conditions.', 'Only optical cameras provide useful evidence.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SETS_16_TO_20 = [
  TOEFL_FIXED_LISTENING_SET16,
  TOEFL_FIXED_LISTENING_SET17,
  TOEFL_FIXED_LISTENING_SET18,
  TOEFL_FIXED_LISTENING_SET19,
  TOEFL_FIXED_LISTENING_SET20,
] as const;
