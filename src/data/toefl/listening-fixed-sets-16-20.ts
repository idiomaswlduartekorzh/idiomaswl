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
    fixedListeningChoose(16, 'm1', 6, 'woman', 'When should the borrowed microphone be returned?', ["The microphone records very clearly indoors.","I borrowed the equipment last Tuesday afternoon.","By noon on the day after the event.","The return desk is near the recording studio."]),
    fixedListeningChoose(16, 'm1', 7, 'man', 'I am having trouble opening the shared document.', ["The document contains five clearly labeled sections.","I opened the window early this morning.","The shared office is downstairs near reception.","I will check whether you have editing access."]),
    fixedListeningChoose(16, 'm1', 8, 'woman', 'Would you like to join us for lunch after class?', ["Thanks, I would. Where are you going?","The class ends at twelve in the main hall.","Lunch is my favorite meal of the day.","I joined the course at the start of last week."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(16, 'm2', 1, 'man', 'Who is organizing the neighborhood clean-up?', ["The neighborhood includes a small riverside park.","The environmental club is coordinating it.","I organized my study desk yesterday afternoon.","Clean-up supplies are stored inside the garage."]),
      fixedListeningChoose(16, 'm2', 2, 'woman', 'This graph is difficult to read on the projector.', ["Let us increase the contrast and font size.","The graph compares results from two recent years.","I read the complete report late last night.","The projector hangs securely from the classroom ceiling."]),
      fixedListeningChoose(16, 'm2', 3, 'man', 'Did you remember to cancel the original reservation?', ["The original painting is displayed in the gallery.","I remember attending the first workshop last month.","Yes, the cancellation email arrived this morning.","The reservation is scheduled for Saturday evening."]),
      fixedListeningChoose(16, 'm2', 4, 'woman', 'Where can I charge my phone in this building?', ["The building closes at eight every weekday.","My phone battery is almost completely empty.","I was charged for two additional tickets.","There are outlets beside the information desk."]),
      fixedListeningChoose(16, 'm2', 5, 'man', 'Why is the rehearsal ending early today?', ["The rehearsal includes three recently composed songs.","The pianist must leave for another performance.","Today's weather is unusually cold and windy.","The performance begins early next month."]),
      fixedListeningChoose(16, 'm2', 6, 'woman', 'I think the package was delivered to the wrong office.', ["The package contains fragile laboratory glassware.","The delivery van is parked just outside.","My office moved to another floor last month.","Let us check the room number on the label."]),
      fixedListeningChoose(16, 'm2', 7, 'man', 'Could you explain how to reserve a practice booth?', ["Use the music center's online calendar.","The practice booth contains an upright piano.","I practiced for the concert yesterday evening.","The music center is located across campus."]),
      fixedListeningChoose(16, 'm2', 8, 'woman', 'How was the train ride from the coast?', ["The coast has several popular public beaches.","The train arrived at platform four on time.","Smooth, except for a short delay near the city.","I rode my bicycle directly to the station."]),
    ],
    conversation: fixedListeningStimulus(
      16, 'm2-conversation', 'conversation', 'Borrowing field research equipment', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I need a soil moisture sensor for Saturday’s field trip, but the equipment page shows none available.

TECHNICIAN: One kit is reserved for a class that may be cancelled because of weather. I cannot release it yet.

STUDENT: Is there another way to collect the measurement?

TECHNICIAN: You can borrow two manual probes today. They take longer to read but provide the same type of measurement. If the electronic kit becomes free Friday morning, I will email you and exchange it before the center closes.`,
      ['student', 'announcer'], [
        item(16, 'm2-cv1', 'Why can the technician not release the electronic kit now?', ["The sensor was damaged during an earlier field trip","It remains reserved for a class that may be cancelled","The student has not completed the required safety training","The equipment center has already closed for the weekend"]),
        item(16, 'm2-cv2', 'What can the student borrow today?', ["A portable station for measuring local weather","The electronic soil sensor reserved for another class","Two manual probes that provide the same measurement","A complete equipment kit from a different course"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      16, 'm2-announcement', 'announcement', 'Café renovation and service point', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The ground-floor café will close after lunch today and remain closed for renovation until September. During the work, coffee, sandwiches, and meal-plan purchases will be available from a temporary counter in the east lobby on weekdays from eight until four. The counter will not accept cash. The nearest evening food service is in North Hall, which remains open until nine.`,
      ['announcer'], [
        item(16, 'm2-an1', 'Where will daytime café items be sold during renovation?', ["At a temporary counter in the east lobby","Outside the entrance to the closed ground-floor café","Inside the nearby campus equipment center","At the main entrance of North Hall"]),
        item(16, 'm2-an2', 'What restriction applies at the temporary counter?', ["It stops providing service before the lunch period.","It sells beverages but does not offer sandwiches.","It cannot process purchases made with meal plans.","It will not accept payments made in cash."]),
      ],
    ),
    academic: fixedListeningStimulus(
      16, 'm2-academic-talk', 'academic-talk', 'Measuring Glacier Mass Balance', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: A glacier gains mass through snowfall and loses it through melting, sublimation, and breaking ice. The difference over a period is its mass balance. A positive balance means the glacier gained more ice than it lost; a negative balance means a net loss. One year alone does not define a trend.

Researchers measure mass balance in several ways. Stakes placed in the ice reveal surface lowering or accumulation at specific locations. Snow pits help estimate how much snow accumulated and how dense it is. Because a few field points cannot describe every part of a large glacier, scientists combine them with aerial or satellite measurements of elevation, area, and gravity-related mass change. Each method has different spatial coverage and uncertainty.

Losing grounded glacier ice adds water to the ocean and contributes to sea-level rise. Floating ice already displaces water, so its direct effect differs, although ice shelves can restrain grounded ice behind them. Glacier retreat also changes seasonal water supply in some regions. Scientists therefore distinguish mass from length: a glacier front can advance because ice flows forward even while the glacier has a negative mass balance. Reliable assessment uses repeated measurements and multiple lines of evidence.`,
      ['professor'], [
        item(16, 'm2-at1', 'What does negative glacier mass balance mean?', ["The glacier moved farther downhill during a single day.","The accumulated snow became less dense than solid ice.","The glacier lost more mass than it gained.","Every section of the glacier melted away completely."]),
        item(16, 'm2-at2', 'Why do scientists combine field and satellite measurements?', ["A single field stake represents an entire ice sheet accurately.","The methods contribute different spatial coverage and evidence.","Satellites directly measure every individual snow crystal.","Field instruments cannot detect the depth of accumulated snow."]),
        item(16, 'm2-at3', 'Why does the professor distinguish floating from grounded ice?', ["Floating ice maintains exactly the same shape over time.","Grounded ice is unable to move toward the open sea.","Only floating ice consists primarily of frozen water.","Their direct contributions to sea-level change are different."]),
        item(16, 'm2-at4', 'Why can glacier length alone be misleading?', ["A glacier front may advance despite a net loss of mass.","Glaciers accumulate additional mass only at their fronts.","Length measurements determine the exact density of snow.","Every forward advance proves a positive long-term balance."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET17 = fixedListeningSet(17, {
  module1ChooseAdditions: [
    fixedListeningChoose(17, 'm1', 6, 'man', 'Why did the editor return your article?', ["The editor usually works from a home office.","I need to add sources for two claims.","The article was published late last year.","I returned the library book this morning."]),
    fixedListeningChoose(17, 'm1', 7, 'woman', 'Could we sit somewhere closer to the stage?', ["There are two empty seats in the front row.","The stage was built during the previous month.","I sat near the entrance door yesterday.","The evening performance starts promptly at seven."]),
    fixedListeningChoose(17, 'm1', 8, 'man', 'I thought Marina was bringing the survey materials.', ["The survey asks several questions about transportation.","Marina brought her laptop to the meeting.","The printed materials are in a blue folder.","She was, but her train has been delayed."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(17, 'm2', 1, 'woman', 'How often is the campus newsletter published?', ["The newsletter includes announcements from student clubs.","I published an article during the month of June.","Every second Monday during the semester.","The campus has several electronic news screens."]),
      fixedListeningChoose(17, 'm2', 2, 'man', 'The workshop room does not have enough chairs.', ["The workshop covers practical interview skills.","I sat in the first chair near the window.","The assigned room is beside the elevator.","I will ask facilities to bring more."]),
      fixedListeningChoose(17, 'm2', 3, 'woman', 'Where did you upload the revised photograph?', ["The photograph was taken outdoors last weekend.","To the shared folder under Final Images.","I revised the photograph's caption twice.","The shared folder contains ten image files."]),
      fixedListeningChoose(17, 'm2', 4, 'man', 'Would Friday afternoon be too late for your response?', ["No, that still gives me enough time.","Friday is the final weekday of the schedule.","The written response contains three short paragraphs.","I arrived late to class yesterday morning."]),
      fixedListeningChoose(17, 'm2', 5, 'woman', 'I cannot decide between the morning and evening sections.', ["The morning section begins promptly at eight.","I decided to walk home this evening.","Compare them with your current work schedule.","The course offers four different sections."]),
      fixedListeningChoose(17, 'm2', 6, 'man', 'Who can help me replace a lost transit pass?', ["The transportation office handles replacements.","The pass remains valid for one complete month.","I lost my umbrella while riding the bus.","The office replaced the damaged entrance sign."]),
      fixedListeningChoose(17, 'm2', 7, 'woman', 'Did you notice that the room number changed?', ["The classroom contains several pieces of new furniture.","I noticed a factual mistake in the report.","The assigned room number contains three digits.","Yes, the class now meets in 318."]),
      fixedListeningChoose(17, 'm2', 8, 'man', 'The printer produced another blank page.', ["The blank page belongs to the printed report.","Check whether the ink cartridge is empty.","Another working printer is available in the library.","I printed the complete schedule yesterday afternoon."]),
    ],
    conversation: fixedListeningStimulus(
      17, 'm2-conversation', 'conversation', 'Requesting a transcript for an application', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My graduate application requires an official transcript, and the deadline is next Monday. Can I collect one today?

REGISTRAR: Official transcripts are sent electronically or by sealed mail; we do not print them at this desk. Electronic delivery usually takes one business day.

STUDENT: The application portal asks for a document now.

REGISTRAR: Upload the unofficial copy from your student account for the initial review, then order the official version directly to the university. Confirm that institution’s address before paying, because an official order cannot be redirected after processing begins.`,
      ['student', 'announcer'], [
        item(17, 'm2-cv1', 'Why can the student not collect an official transcript at the desk?', ["The graduate application deadline has already passed","The student's online university account is currently inactive","The registrar cannot locate any record of the transcript","Official copies are delivered electronically or in sealed mail"]),
        item(17, 'm2-cv2', 'What should the student upload for the initial review?', ["An unofficial transcript downloaded from the student account","A photograph showing the sealed official transcript envelope","A receipt confirming payment of the graduate application","The complete postal address of the registrar's office"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      17, 'm2-announcement', 'announcement', 'Indoor track closure', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The indoor running track will close from noon Thursday until eight a.m. Saturday while crews replace damaged flooring. The fitness room and swimming pool will remain open. Track reservations during the closure have been cancelled automatically, and users will receive account credits. Friday’s running club will meet outside at the south entrance if weather permits; a cancellation notice will be posted by four p.m. Thursday.`,
      ['announcer'], [
        item(17, 'm2-an1', 'What will remain open during the track closure?', ["Only the outdoor running path near the building","The equipment repair office beside the main gym","The fitness room and the campus swimming pool","The damaged section of the indoor running track"]),
        item(17, 'm2-an2', 'How will users be compensated for cancelled reservations?', ["They may enter the track before Thursday at noon.","They will receive credits in their accounts.","They can use the indoor track throughout Friday.","They will receive a complimentary pair of running shoes."]),
      ],
    ),
    academic: fixedListeningStimulus(
      17, 'm2-academic-talk', 'academic-talk', 'How Bats Use Echolocation', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Many bats navigate and hunt by producing high-frequency calls and listening for echoes. Much of this sound is ultrasonic, above human hearing. The delay between a call and its echo provides information about distance. Differences in intensity, timing at the two ears, and spectral structure can indicate direction, size, surface, or motion.

Calls are not all identical. A bat searching open space may use signals suited to detecting objects at a distance. As it approaches an insect, it often sends calls more rapidly, producing a feeding buzz that updates the target’s location quickly. Species and environments differ, so one call pattern should not be treated as universal.

Echolocation also has constraints. Producing calls uses energy, echoes can overlap with other bats, and vegetation creates complex reflections. Some prey hear bat calls and may take evasive action. Bats are not blind; many also use vision, smell, memory, and other cues. Scientists record calls with specialized microphones and display them as spectrograms. Recordings can help identify activity or sometimes species, but call overlap and variation require care. Echolocation is a flexible sensory system, not a simple replacement for eyesight.`,
      ['professor'], [
        item(17, 'm2-at1', 'What can the delay before an echo returns indicate?', ["The distance between the bat and an object","The approximate age of the bat producing calls","The surrounding air temperature immediately after sunset","The visible color of a nearby flying insect"]),
        item(17, 'm2-at2', 'What happens as a bat approaches insect prey?', ["It completely stops producing high-frequency sounds.","It converts every hunting call into a social signal.","It begins relying exclusively on its eyesight.","It usually sends calls at a faster rate."]),
        item(17, 'm2-at3', 'Why does the professor mention vision and smell?', ["To claim that bats cannot perceive ultrasonic frequencies","To show that bats use other cues alongside echolocation","To explain why every species of bat is completely blind","To define how a spectrogram records visible light"]),
        item(17, 'm2-at4', 'What limitation applies to acoustic species identification?', ["Every bat species consistently produces one identical call.","Bat calls cannot be captured with electronic equipment.","Call patterns may overlap and vary considerably.","Only calls audible to humans appear in recordings."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET18 = fixedListeningSet(18, {
  module1ChooseAdditions: [
    fixedListeningChoose(18, 'm1', 6, 'woman', 'Do you know why the bookstore line is so long?', ["The bookstore sells several kinds of art supplies.","The line begins beside the main entrance.","I bought the required textbook online yesterday.","A new course packet was released today."]),
    fixedListeningChoose(18, 'm1', 7, 'man', 'Could I leave these boxes here until this afternoon?', ["The boxes contain several folders of old files.","I left my winter coat upstairs this morning.","Yes, as long as they do not block the doorway.","This afternoon's scheduled meeting was cancelled."]),
    fixedListeningChoose(18, 'm1', 8, 'woman', 'I expected the repair estimate to arrive yesterday.', ["The repair requires one expensive specialized tool.","Call the shop and ask for an update.","Yesterday was the first day of May.","The estimate lists all expected labor costs."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(18, 'm2', 1, 'man', 'Where should I meet the hiking group?', ["At the north gate beside the trail map.","The hike covers approximately eight kilometers.","I met the hiking group early last spring.","The map is printed on durable waterproof paper."]),
      fixedListeningChoose(18, 'm2', 2, 'woman', 'I am unsure whether the conclusion follows from the data.', ["The conclusion is approximately one paragraph long.","Let us examine the evidence together.","The data table displays several percentages.","I followed the narrow path toward the river."]),
      fixedListeningChoose(18, 'm2', 3, 'man', 'When is the replacement instructor arriving?', ["The replacement instructor teaches mathematics.","A new replacement window was recently ordered.","I arrived before the class began this morning.","Her train is due at two fifteen."]),
      fixedListeningChoose(18, 'm2', 4, 'woman', 'Would you mind moving your bicycle away from the ramp?', ["The bicycle has a large basket in front.","I moved into this neighborhood last September.","Certainly. I did not realize it was blocking access.","The ramp leads directly to the side entrance."]),
      fixedListeningChoose(18, 'm2', 5, 'man', 'How did the audience react to the final scene?', ["Most people remained completely silent.","The final scene was filmed late at night.","I reacted to the published article online.","The audience entered through two separate doors."]),
      fixedListeningChoose(18, 'm2', 6, 'woman', 'The meeting agenda is missing the budget discussion.', ["The meeting is scheduled in Conference Room B.","I discussed the proposed budget with Alex.","I will add it before sending the final version.","The previously missing folder was finally found."]),
      fixedListeningChoose(18, 'm2', 7, 'man', 'Why did you choose the earlier laboratory section?', ["The laboratory contains twelve modern workstations.","It fits better with my afternoon job.","I chose the blue folder from the shelf.","The earlier morning train was unexpectedly delayed."]),
      fixedListeningChoose(18, 'm2', 8, 'woman', 'Could you tell me how to reach the botanical garden?', ["The botanical garden grows many native plants.","I reached the railway station around noon.","The introductory botanical course is already full.","Take the path behind the greenhouse."]),
    ],
    conversation: fixedListeningStimulus(
      18, 'm2-conversation', 'conversation', 'Arranging an accessible event seat', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I bought a ticket for the lecture, but I recently injured my leg and cannot use the stairs to the balcony.

BOX OFFICE STAFF: We can move you to an accessible seat on the main floor at no extra charge.

STUDENT: May my friend sit beside me?

BOX OFFICE STAFF: Yes. The companion seat is included in the accessible area, but I need both ticket numbers to change the reservation. Send them through the box office form today, and we will email two replacement tickets.`,
      ['student', 'announcer'], [
        item(18, 'm2-cv1', 'What does the staff member offer to do?', ["Move the student to an accessible seat on the main floor","Install a permanent elevator leading directly to the balcony","Refund the admission price of every ticket for the lecture","Postpone the lecture until the student's leg has recovered"]),
        item(18, 'm2-cv2', 'What information must the student provide?', ["A detailed report describing the recent leg injury","The ticket numbers for the student and companion","The lecturer's current institutional email address","A payment covering the cost of the companion seat"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      18, 'm2-announcement', 'announcement', 'Museum photography policy', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Personal photography is permitted in the museum’s permanent galleries beginning today, but flashes, tripods, and selfie sticks remain prohibited. Some borrowed exhibitions do not allow any photography; signs at their entrances identify those restrictions. Images may be used for personal, noncommercial purposes. News or commercial crews must arrange permission in advance through the communications office. Please keep aisles and emergency exits clear while taking photographs.`,
      ['announcer'], [
        item(18, 'm2-an1', 'Which item remains prohibited in the permanent galleries?', ["A personal camera without any additional equipment","A printed guide provided by the museum entrance","A mobile phone used only for personal photographs","A tripod used to support photographic equipment"]),
        item(18, 'm2-an2', 'Who must arrange permission in advance?', ["Visitors photographing displays in the permanent galleries","Students who carry mobile phones through the museum","News organizations or crews taking commercial photographs","People viewing exhibitions temporarily borrowed from elsewhere"]),
      ],
    ),
    academic: fixedListeningStimulus(
      18, 'm2-academic-talk', 'academic-talk', 'Biological Nitrogen Fixation', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Nitrogen gas makes up most of Earth’s atmosphere, yet most plants cannot use it directly. Nitrogen is essential in proteins and nucleic acids, so plants need accessible compounds from soil. Biological nitrogen fixation supplies some through microorganisms that convert atmospheric nitrogen gas into ammonia or related forms.

An important agricultural example involves rhizobia bacteria and legumes such as beans, peas, and soybeans. The bacteria live in structures on the roots called nodules. The plant supplies energy-rich carbon compounds and a protected environment; the bacteria provide fixed nitrogen that can be incorporated into plant molecules. This is a mutual relationship, but an effective partnership depends on compatible organisms and suitable conditions.

Nitrogen fixation is not the entire nitrogen cycle. Other microorganisms transform ammonium into nitrate, decompose organic matter, or return nitrogen gas to the atmosphere. Farmers may use legumes in rotations to add biologically fixed nitrogen, but the amount available to a later crop varies. Some nitrogen remains in harvested material, and soil processes can move nitrogen into water or the atmosphere. Fixation also requires considerable energy from the organism performing it. The useful lesson is that atmospheric abundance does not equal biological availability; microorganisms perform chemical transformations that connect the two.`,
      ['professor'], [
        item(18, 'm2-at1', 'Why can most plants not use atmospheric nitrogen directly?', ["Nitrogen exists exclusively within the tissues of animals.","Plants need nitrogen converted into accessible chemical compounds.","Plant roots contain neither proteins nor nucleic acids.","Atmospheric nitrogen immediately transforms itself into nitrate."]),
        item(18, 'm2-at2', 'What do rhizobia receive from a legume?', ["Energy-rich carbon compounds and a protected environment","A permanent source of oxygen taken from the atmosphere","Nitrate created by every other microorganism in the soil","Seeds produced by a completely unrelated plant species"]),
        item(18, 'm2-at3', 'Why does the professor mention other microorganisms?', ["To claim that legumes perform every nitrogen transformation","To argue that biological fixation never occurs within soil","To place nitrogen fixation within the broader nitrogen cycle","To prove that all nitrogen in soil remains biologically available"]),
        item(18, 'm2-at4', 'What is the main point of the talk?', ["Harvested crops return their entire nitrogen content to soil.","Plants absorb atmospheric nitrogen gas without any transformation.","Fertilizers and fixation always supply exactly equal quantities.","Microorganisms convert atmospheric nitrogen into biologically available forms."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET19 = fixedListeningSet(19, {
  module1ChooseAdditions: [
    fixedListeningChoose(19, 'm1', 6, 'man', 'Where can I find the updated safety instructions?', ["They are posted beside the laboratory entrance.","The latest update was completed yesterday afternoon.","I found my notebook underneath the laboratory bench.","The entrance requires a valid identification card."]),
    fixedListeningChoose(19, 'm1', 7, 'woman', 'Would tomorrow morning be convenient for the interview?', ["The interview focuses on several aspects of local history.","Tomorrow's weather forecast includes periods of heavy rain.","The morning bus is scheduled to arrive at eight.","Yes, any time after ten works for me."]),
    fixedListeningChoose(19, 'm1', 8, 'man', 'I cannot believe the café has sold out of soup again.', ["The café opened during the previous summer.","I brought a sandwich from home for lunch.","We should come earlier next time.","The soup contains tomatoes and fresh herbs."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(19, 'm2', 1, 'woman', 'Who is responsible for checking the citations?', ["The article cites several recently published studies.","Our copy editor will verify them.","I checked the complete schedule online yesterday.","The editor's office is located nearby."]),
      fixedListeningChoose(19, 'm2', 2, 'man', 'The reservation system shows two different room numbers.', ["The two rooms are located on separate floors.","I reserved the larger table for our group.","Call the events office to confirm the correct one.","The number two appears twice on the form."]),
      fixedListeningChoose(19, 'm2', 3, 'woman', 'Could I exchange this ticket for the evening performance?', ["Yes, if seats are still available.","The evening performance lasts approximately two hours.","I exchanged some money at the airport yesterday.","The original ticket was printed yesterday afternoon."]),
      fixedListeningChoose(19, 'm2', 4, 'man', 'Why are you carrying all those reference books?', ["The reference desk closes every evening at six.","I referred to the earlier email during class.","The books are unusually heavy to carry.","I am preparing a literature review."]),
      fixedListeningChoose(19, 'm2', 5, 'woman', 'How long does the computer update usually take?', ["The computer has a particularly large screen.","About fifteen minutes, unless the network is slow.","I updated the complete spreadsheet yesterday morning.","The network connects every office in the building."]),
      fixedListeningChoose(19, 'm2', 6, 'man', 'I thought the equipment demonstration was optional.', ["It is required before you borrow the camera.","The camera includes two rechargeable batteries.","I demonstrated the complete technique during class.","Optional courses appear in blue on the website."]),
      fixedListeningChoose(19, 'm2', 7, 'woman', 'Did Ravi mention why he missed the appointment?', ["The scheduled appointment was at noon today.","Ravi mentioned a new restaurant near campus.","He missed the first question on the test.","His earlier meeting ran longer than expected."]),
      fixedListeningChoose(19, 'm2', 8, 'man', 'Would you mind checking the oven before we leave?', ["The oven is located beside the refrigerator.","I checked my email before eating lunch.","Certainly. I will make sure it is off.","We left the building around five yesterday."]),
    ],
    conversation: fixedListeningStimulus(
      19, 'm2-conversation', 'conversation', 'Correcting a payroll record', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My campus job payment is short by four hours. The online record shows that I left early last Thursday, but I worked the full shift.

SUPERVISOR: I see the problem. The time clock stopped recording after the network interruption.

STUDENT: Can the missing hours be added to this week’s payment?

SUPERVISOR: Payroll for this week has already closed. I will submit a correction today, and the amount will appear as a separate adjustment next Friday. Keep this confirmation number in case the change does not appear.`,
      ['student', 'announcer'], [
        item(19, 'm2-cv1', 'What caused the incorrect work record?', ["The student arrived four hours after the shift began","The supervisor entered an incorrect date in the system","The time clock stopped recording after a network interruption","The student failed to remember the assigned work schedule"]),
        item(19, 'm2-cv2', 'When should the missing payment appear?', ["Immediately following the conversation with the supervisor","At the conclusion of the current academic semester","As part of the regular payment issued this week","As a separate adjustment paid the following Friday"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      19, 'm2-announcement', 'announcement', 'Public lecture overflow room', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: All seats in the auditorium for tonight’s public lecture have been assigned. Additional guests may watch a live video in Room 204, where doors open at six forty-five. No separate ticket is needed for the overflow room. Questions submitted from either location through the event application will be considered during the final discussion. A recording will be posted next week, but the speaker’s slides will not be distributed.`,
      ['announcer'], [
        item(19, 'm2-an1', 'What can additional guests do?', ["Watch a live video of the lecture in Room 204","Stand behind the assigned seats inside the auditorium","Collect additional admission tickets directly from the speaker","Enter the main auditorium only during the final discussion"]),
        item(19, 'm2-an2', 'What will be posted next week?', ["A complete copy of the speaker's presentation slides","A recording of the public lecture","A list showing every assigned auditorium seat","All questions submitted through the event application"]),
      ],
    ),
    academic: fixedListeningStimulus(
      19, 'm2-academic-talk', 'academic-talk', 'Tree Rings as Climate Proxies', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: In regions with a distinct growing season, many trees add one growth ring each year. Ring width, density, and chemistry can respond to environmental conditions. Scientists use these measurements as proxy data—indirect evidence extending climate information before modern instruments.

A wide ring does not universally mean a warm or wet year. Growth may be limited mainly by moisture in one dry location, by temperature near a high-elevation tree line, or by nonclimatic factors such as insects, competition, fire, or age. Researchers first compare ring measurements with local instrumental weather records during their period of overlap. A stable statistical relationship can then support a reconstruction of earlier conditions.

Dating is equally important. Crossdating matches distinctive sequences among living trees, dead wood, and wooden objects. The shared pattern assigns calendar years and can reveal a missing ring. Scientists sample many trees rather than treating one trunk as a regional record. They also compare reconstructions with other proxies and historical evidence. Tree rings can provide annual records spanning centuries or longer, but their climate signal must be calibrated for a place, species, and limiting condition. A proxy is evidence to interpret, not a thermometer hidden inside wood.`,
      ['professor'], [
        item(19, 'm2-at1', 'Why are tree rings called proxy data?', ["They directly reproduce readings from modern thermometers.","They cause every tree to grow at an identical rate.","They eliminate the need to assign dates to growth rings.","They offer indirect evidence about past environmental conditions."]),
        item(19, 'm2-at2', 'Why does a wide ring not have one universal meaning?', ["Trees do not respond measurably to any climate variable.","Each individual growth ring forms across several decades.","Different environmental factors limit growth in different settings.","Ring width reveals only the biological age of a tree."]),
        item(19, 'm2-at3', 'What is the purpose of crossdating?', ["To match ring patterns and assign them to calendar years","To eliminate every narrow ring found within a sample","To compare the height of trees with ocean temperatures","To make previously dead wood begin growing once again"]),
        item(19, 'm2-at4', 'Why do scientists sample many trees?', ["One tree can provide a complete record of global climate.","Multiple trees separate shared signals from individual effects.","Collecting many samples prevents weather from influencing growth.","Every tree species responds identically to changing climate."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET20 = fixedListeningSet(20, {
  module1ChooseAdditions: [
    fixedListeningChoose(20, 'm1', 6, 'woman', 'Did the conference organizer confirm your presentation time?', ["The presentation contains twelve detailed slides.","The organizer works in a different city.","Yes, I am scheduled for eleven twenty.","The conference continues for three full days."]),
    fixedListeningChoose(20, 'm1', 7, 'man', 'Why is the side entrance locked already?', ["The side entrance faces the main parking lot.","The building switched to evening access at six.","I locked my bicycle outside before the lecture.","The evening lecture is scheduled to start soon."]),
    fixedListeningChoose(20, 'm1', 8, 'woman', 'Could you save me a copy of the handout?', ["Of course. I will put one on your desk.","The handout includes a particularly useful diagram.","I saved the original file on my computer.","The copy room is located downstairs."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(20, 'm2', 1, 'man', 'When can students begin using the new studio?', ["The new studio contains professional recording equipment.","Students designed the colorful display on the wall.","The new campus building officially opens in June.","As soon as the safety inspection is complete."]),
      fixedListeningChoose(20, 'm2', 2, 'woman', 'I think the first paragraph repeats the introduction.', ["You could replace it with the specific example.","The introduction appears on the first page.","I repeated the same measurement twice yesterday.","The paragraph contains four complete sentences."]),
      fixedListeningChoose(20, 'm2', 3, 'man', 'Where did the department post the internship results?', ["The internship program lasts for six weeks.","I posted the package early this morning.","On the notice board beside the main office.","The department's results improved during this year."]),
      fixedListeningChoose(20, 'm2', 4, 'woman', 'Which seat would you rather have, by the window or on the aisle?', ["The nearby window is slightly open.","The aisle seat, if it is still available.","I generally prefer tea instead of coffee.","The seats were thoroughly cleaned yesterday."]),
      fixedListeningChoose(20, 'm2', 5, 'man', 'Why has the field trip departure been delayed?', ["The scheduled field site is near the coast.","We departed early on last year's trip.","The bus driver is checking a warning light.","The trip includes a guided walk outdoors."]),
      fixedListeningChoose(20, 'm2', 6, 'woman', 'The table in our report is missing two values.', ["The completed report was submitted last week.","Two additional tables appear in the appendix.","I value your professional opinion very highly.","I will retrieve them from the original data file."]),
      fixedListeningChoose(20, 'm2', 7, 'man', 'Could you tell me who approved this purchase?', ["The finance director signed the request.","The approved purchase arrived on Monday morning.","I approved of the proposed new design.","The director's signature is difficult to read."]),
      fixedListeningChoose(20, 'm2', 8, 'woman', 'How was the accommodation near the research station?', ["The research station is far from town.","Basic, but clean and surprisingly quiet.","The research project lasted three full weeks.","I accommodated another visitor in my room."]),
    ],
    conversation: fixedListeningStimulus(
      20, 'm2-conversation', 'conversation', 'Moving a presentation to a larger room', CONVERSATION_INSTRUCTIONS,
      `STUDENT: Forty people registered for our project presentation, but the room I booked has only thirty seats.

EVENTS COORDINATOR: Room 205 holds fifty and is free at the same time. I can transfer the reservation.

STUDENT: Will the registration page update automatically?

EVENTS COORDINATOR: The room listing will update, but people already registered will not receive a new notice unless you send one. I will confirm Room 205 now. Then use the attendee list to email the change and replace the room number on your poster.`,
      ['student', 'announcer'], [
        item(20, 'm2-cv1', 'Why does the presentation need a different room?', ["Room 205 lacks the projector required for the presentation","More people registered than the original room can accommodate","The scheduled time for the presentation was unexpectedly cancelled","The events coordinator reserved an incorrect date for the room"]),
        item(20, 'm2-cv2', 'What must the student do after the room is changed?', ["Pay the venue for fifty additional audience seats","Create another registration page for Room 205","Move the entire presentation to a different day","Notify existing attendees about the new room"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      20, 'm2-announcement', 'announcement', 'Elevator inspection schedule', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The east elevator in the administration building will be unavailable Tuesday from nine a.m. until approximately one p.m. for its annual safety inspection. The west elevator and all stairways will remain open. Anyone needing step-free access to offices on floors two through five should enter through the west lobby. Deliveries larger than the west elevator can carry must be scheduled for another day.`,
      ['announcer'], [
        item(20, 'm2-an1', 'Why will the east elevator be unavailable?', ["It will undergo its annual safety inspection.","A large scheduled delivery is currently blocking it.","The building's west lobby is being completely rebuilt.","The administration building is closing for the day."]),
        item(20, 'm2-an2', 'Where should people needing step-free access enter?', ["Through the stairway on the building's east side","At the entrance reserved for large deliveries","Through the administration building's west lobby","On the fifth floor beside the closed elevator"]),
      ],
    ),
    academic: fixedListeningStimulus(
      20, 'm2-academic-talk', 'academic-talk', 'Why Auroras Glow', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: The Sun releases charged particles called the solar wind. Earth’s magnetic field deflects much of this flow and forms a magnetosphere. Under suitable conditions, solar-wind energy disturbs that system, and energetic particles follow magnetic field lines toward the upper atmosphere, especially at high latitudes.

When those particles collide with atoms and molecules, they transfer energy to them. The energized gases later release light as they return toward lower-energy states. Color depends partly on which gas emits the light, the altitude, and the energy involved. Oxygen commonly contributes green or red emissions, while nitrogen can contribute blue or purple. The process is more specific than saying sunlight simply reflects from polar air.

Auroras often form ovals around the magnetic rather than geographic poles. During stronger disturbances, the oval can expand and auroras may appear at lower latitudes. Visibility still depends on cloud cover, darkness, and geometry. Scientists combine solar observations, spacecraft measurements, magnetometers, radar, and cameras. Forecasts describe probabilities because the timing and magnetic orientation of arriving solar material affect how strongly it couples with Earth’s magnetosphere. An aurora is visible evidence of interactions across the Sun–Earth system.`,
      ['professor'], [
        item(20, 'm2-at1', 'What role does Earth’s magnetic field play in auroras?', ["It creates every charged particle found within the atmosphere.","It guides energetic particles toward regions at high latitudes.","It converts reflected sunlight directly into bright green color.","It prevents every solar particle from entering Earth's system."]),
        item(20, 'm2-at2', 'Why do atmospheric gases emit auroral light?', ["The gases freeze rapidly after the Sun has set.","They reflect artificial city lights coming from the ground.","The gases lose all their atoms during a solar storm.","They release energy after incoming particles excite them."]),
        item(20, 'm2-at3', 'Why may auroras appear at lower latitudes during a strong disturbance?', ["The auroral oval can expand toward lower latitudes.","The geographic poles move gradually toward the equator.","Cloud formations push charged particles farther southward.","The upper atmosphere temporarily stops containing oxygen."]),
        item(20, 'm2-at4', 'Why are aurora forecasts probabilistic?', ["The solar wind cannot be measured by scientific instruments.","Auroras reach exactly the same brightness every night.","Coupling varies with the timing and magnetic conditions.","Only optical cameras provide useful evidence about auroras."]),
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
