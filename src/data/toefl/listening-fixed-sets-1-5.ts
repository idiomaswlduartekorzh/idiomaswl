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

export const TOEFL_FIXED_LISTENING_SET1 = fixedListeningSet(1, {
  module1ChooseAdditions: [
    fixedListeningChoose(1, 'm1', 6, 'woman', 'Could you remind me where the tutoring center is?', ["The tutoring session lasts an hour.","I went there to study yesterday.","It's across from the main library.","Your tutor called this morning."]),
    fixedListeningChoose(1, 'm1', 7, 'man', 'I am afraid the printer has run out of paper again.', ["The report was printed yesterday.","I'll get more from the supply room.","We pay ten cents for each page.","I finished reading that paper."]),
    fixedListeningChoose(1, 'm1', 8, 'woman', 'Would you mind watching my bag for a minute?', ["Not at all. I'll keep an eye on it.","This bag has a pocket for my watch.","I bought my bag at the station.","The café closes in a few minutes."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(1, 'm2', 1, 'man', 'How long will the chemistry lab stay open tonight?', ["The experiment lasted two hours.","The lab opened at eight today.","We finish chemistry after lunch.","It will close at nine tonight."]),
      fixedListeningChoose(1, 'm2', 2, 'woman', 'I thought Maya was presenting first.', ["Her first slide has the schedule.","They changed the order this morning.","She was first to arrive today.","Her topic was changed yesterday."]),
      fixedListeningChoose(1, 'm2', 3, 'man', 'Why do we not take the earlier train?', ["The train from yesterday was late.","My return ticket is for tomorrow.","Good idea; we'll avoid the rush.","The station clock is ten minutes fast."]),
      fixedListeningChoose(1, 'm2', 4, 'woman', 'Could I exchange this shirt without the receipt?', ["Let me check our exchange policy.","The receipt shows the original price.","The changing room is just over there.","This shirt was made from cotton."]),
      fixedListeningChoose(1, 'm2', 5, 'man', 'The lecture was more interesting than I expected.', ["I wrote the lecture time in my diary.","The example appears on the last slide.","The lecturer arrived a little early.","Me too—the final example was fascinating."]),
      fixedListeningChoose(1, 'm2', 6, 'woman', 'Did you not reserve a study room?', ["We studied in that room last Tuesday.","I did, but the booking was cancelled.","My library card expires next month.","The room was renovated last summer."]),
      fixedListeningChoose(1, 'm2', 7, 'man', 'I am sorry I missed your call.', ["No problem; I emailed you the information.","I keep my phone beside the computer.","The call yesterday lasted ten minutes.","I left the meeting before it finished."]),
      fixedListeningChoose(1, 'm2', 8, 'woman', 'Where should I leave the completed form?', ["Before the office closes this evening.","With your full name on the first page.","In the tray beside the office door.","After your adviser has signed it."]),
    ],
    conversation: fixedListeningStimulus(
      1, 'm2-conversation', 'conversation', 'Borrowing a recording kit', CONVERSATION_INSTRUCTIONS,
      `STUDENT: Hi, I reserved a recording kit for my media assignment, but the confirmation says pickup is tomorrow. I actually need it this afternoon.

STAFF MEMBER: Let me check. The kit assigned to you is still out, but a smaller kit was returned early. It has the same microphone and recorder, though it does not include a tripod.

STUDENT: That is fine. I can borrow a tripod from my classmate.

STAFF MEMBER: Great. I will change the reservation. Please return everything by four tomorrow.`,
      ['student', 'announcer'], [
        item(1, 'm2-cv1', 'Why can the student not collect the originally assigned kit now?', ["The kit was sent away for repairs.","Another borrower still has the kit.","The student missed the collection time.","The reservation lacks a confirmation."]),
        item(1, 'm2-cv2', 'What will the student obtain from a classmate?', ["A microphone","A recorder","A carrying case","A tripod"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      1, 'm2-announcement', 'announcement', 'Pool maintenance notice', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The campus pool will close at six this evening instead of nine because technicians must inspect the ventilation system. The morning schedule tomorrow is unchanged, and the pool will reopen at seven. Tonight’s beginner swimming class has been moved to Thursday at the same time. Registered students will keep their places automatically, so they do not need to enroll again.`,
      ['announcer'], [
        item(1, 'm2-an1', 'Why will the pool close early?', ["To inspect the ventilation system","To prepare the pool for a competition","To repair the equipment used in lessons","To clean the pool before morning classes"]),
        item(1, 'm2-an2', 'What must registered beginners do to attend the rescheduled class?', ["Confirm attendance at the front desk.","Choose another class on the website.","Nothing; their places are reserved.","Bring a new registration form Thursday."]),
      ],
    ),
    academic: fixedListeningStimulus(
      1, 'm2-academic-talk', 'academic-talk', 'Coral and Algae Partnerships', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Reef-building corals may look like rocks or plants, but the coral polyps are animals. Many shallow-water corals live in partnership with microscopic photosynthetic algae inside their tissues. The coral gives the algae a protected place and supplies compounds used in photosynthesis. In return, the algae produce oxygen and energy-rich materials that support coral growth. Because both partners benefit, biologists call this relationship mutualism.

This partnership also helps explain coral bleaching. Heat or another source of stress can disrupt the relationship and cause corals to lose much of their algae. Since the algae contribute color, the pale coral skeleton becomes visible through the animal’s tissue. A bleached coral is not necessarily dead, but it has lost an important energy source. If stressful conditions end soon, algae can return and the coral may recover. If stress is intense or prolonged, starvation and disease become more likely.

Not every coral depends on these algae. Deep-sea corals live without sunlight and obtain energy by capturing plankton and organic particles. So the familiar coral-algae partnership is extremely important in shallow reefs, but it is not a definition that applies to every coral species.`,
      ['professor'], [
        item(1, 'm2-at1', 'What is the talk mainly about?', ["How deep-sea corals reproduce without light","How a coral-algae partnership works","How reef skeletons are formed from algae","Why corals and plankton compete for sunlight"]),
        item(1, 'm2-at2', 'What do the algae provide to the coral?', ["Shelter from strong ocean currents","Compounds used during photosynthesis","Oxygen and energy-rich materials","Plankton and other organic particles"]),
        item(1, 'm2-at3', 'Why does a bleached coral appear pale?', ["It has lost the algae that give it color.","The pale skeleton has dissolved away.","Its tissue has grown much thicker.","Its algae have made new pale pigments."]),
        item(1, 'm2-at4', 'Why does the professor mention deep-sea corals?', ["To show how they adapt to warmer water","To link bleaching to a shortage of plankton","To explain how they use algae without light","To show that the partnership has exceptions"]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET2 = fixedListeningSet(2, {
  module1ChooseAdditions: [
    fixedListeningChoose(2, 'm1', 6, 'man', 'Do you know whether the museum tour is full?', ['There are still a few spaces on the afternoon tour.', 'The museum displays local history.', 'I toured the city last year.', 'The full report is online.']),
    fixedListeningChoose(2, 'm1', 7, 'woman', 'I cannot find the attachment you mentioned.', ['The workshop schedule is attached to the notice outside.', 'I mentioned the missing file after class yesterday.', 'The document you sent contains three large images.', 'I may have forgotten to include it. I will resend the email.']),
    fixedListeningChoose(2, 'm1', 8, 'man', 'Would Tuesday morning work for our meeting?', ['The work was difficult.', 'Tuesday is the second day.', 'Yes, I am free before eleven.', 'The meeting room has a screen.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(2, 'm2', 1, 'woman', 'Who should I ask about changing my meal plan?', ['The dining hall serves lunch.', 'The housing office handles those changes.', 'I changed trains downtown.', 'Your meal looks delicious.']),
      fixedListeningChoose(2, 'm2', 2, 'man', 'I heard the outdoor concert was postponed.', ['Yes, the weather forecast forced them to move it.', 'The musicians played outside.', 'I bought two concert tickets.', 'The forecast is on television.']),
      fixedListeningChoose(2, 'm2', 3, 'woman', 'Could you lower the music while I make this call?', ['The call came from my sister.', 'This song has a slow rhythm.', 'The speaker is on the shelf.', 'Of course. I did not realize it was so loud.']),
      fixedListeningChoose(2, 'm2', 4, 'man', 'How did your interview go this morning?', ['The office is on the third floor.', 'I wore my blue jacket.', 'Better than I expected, thanks.', 'The interviewer called yesterday.']),
      fixedListeningChoose(2, 'm2', 5, 'woman', 'We should bring an umbrella to the picnic.', ['The picnic table is wooden.', 'That is sensible; the forecast mentions showers.', 'I left the basket in the kitchen.', 'The park closes at sunset.']),
      fixedListeningChoose(2, 'm2', 6, 'man', 'I do not think I can finish the report by noon.', ['The transportation report discusses several routes through the city.', 'Noon comes one hour before one o’clock.', 'I finished reading the entire report yesterday evening.', 'Let us ask whether the deadline can be extended.']),
      fixedListeningChoose(2, 'm2', 7, 'woman', 'Is this seat taken?', ['No, you are welcome to sit here.', 'The train takes forty minutes.', 'I took the earlier flight.', 'The seat is made of leather.']),
      fixedListeningChoose(2, 'm2', 8, 'man', 'Where can I recharge my transit card?', ['The bus arrives every hour.', 'My card expired last month.', 'At the machine beside the station entrance.', 'The entrance faces north.']),
    ],
    conversation: fixedListeningStimulus(
      2, 'm2-conversation', 'conversation', 'Changing a workshop session', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I registered for Saturday’s photography workshop, but my work schedule just changed. Is there space in Sunday’s session?

COORDINATOR: Sunday is full, although one person has not confirmed. I can put you first on the waiting list.

STUDENT: Should I cancel Saturday now?

COORDINATOR: Not yet. Keep that place until I contact you Friday afternoon. If Sunday opens, I will move your registration and send a new confirmation.`,
      ['student', 'announcer'], [
        item(2, 'm2-cv1', 'Why does the student want to change sessions?', ['The Saturday workshop was cancelled.', 'Sunday has a different instructor.', 'The student’s work schedule changed.', 'The photography equipment is unavailable.']),
        item(2, 'm2-cv2', 'What does the coordinator advise the student to do now?', ['Keep the Saturday place for the moment.', 'Register for a different workshop.', 'Call the unconfirmed participant.', 'Pay for both sessions.']),
      ],
    ),
    announcement: fixedListeningStimulus(
      2, 'm2-announcement', 'announcement', 'Bookstore pickup change', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Online textbook orders will be collected from the temporary counter in West Hall this week while the bookstore entrance is repaired. Bring your order number and student identification. Orders marked ready before noon can be collected the same day until seven p.m. New orders may take two business days. Returns and exchanges must still be handled at the bookstore’s side entrance.`,
      ['announcer'], [
        item(2, 'm2-an1', 'Where should students collect online textbook orders this week?', ['At the bookstore’s main entrance', 'At the library desk', 'At the campus mailroom', 'At a temporary counter in West Hall']),
        item(2, 'm2-an2', 'What must still be handled at the bookstore’s side entrance?', ['New online orders', 'Returns and exchanges', 'Student identification', 'Same-day pickups']),
      ],
    ),
    academic: fixedListeningStimulus(
      2, 'm2-academic-talk', 'academic-talk', 'Sleep and Memory Consolidation', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Learning does not end when a study session ends. A new memory is initially fragile, and later biological processes can stabilize and reorganize it. Researchers use the term memory consolidation for these continuing changes. Sleep is one period when recently formed memories may be reactivated without a learner consciously reviewing them.

This does not mean that sleep records every experience perfectly. Different kinds of memory involve different brain systems, and sleep can strengthen some information while other details weaken. In experiments, researchers often teach participants a task, allow one group to sleep and another to remain awake for a comparable interval, and then test later performance. The design must control for time of day, fatigue, and additional practice, because any of those factors could otherwise explain a difference.

Scientists also study targeted memory reactivation. A sound or odor is associated with learning and then presented quietly during a suitable stage of sleep. Later improvement can suggest that reactivation influenced consolidation. But the cue does not insert an entirely new memory, and results depend on timing and task. The broader point is that sleep is an active biological state that can shape memory, not simply a period in which the brain stops working.`,
      ['professor'], [
        item(2, 'm2-at1', 'What is memory consolidation?', ['Processes that stabilize and reorganize a new memory', 'A method for preventing all forgetting', 'Conscious review that occurs only while awake', 'The immediate perception of new information']),
        item(2, 'm2-at2', 'Why must sleep studies control for time of day and fatigue?', ['To make every participant dream', 'To prevent participants from learning a task', 'Those factors might otherwise explain performance differences.', 'Those factors determine the content of every memory.']),
        item(2, 'm2-at3', 'What happens in targeted memory reactivation studies?', ['Participants learn only after waking.', 'Researchers erase a selected memory.', 'A cue creates a completely new memory during sleep.', 'A cue linked to earlier learning is presented during sleep.']),
        item(2, 'm2-at4', 'What main point does the professor make about sleep?', ['It stores every experience without change.', 'It is an active state that can influence memory.', 'It matters only for physical fatigue.', 'It replaces the need for practice.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET3 = fixedListeningSet(3, {
  module1ChooseAdditions: [
    fixedListeningChoose(3, 'm1', 6, 'woman', 'I wish the café had more tables near the windows.', ['The windows were cleaned today.', 'The café sells sandwiches.', 'A table costs more than a chair.', 'Maybe we can suggest it in the customer survey.']),
    fixedListeningChoose(3, 'm1', 7, 'man', 'When are you planning to submit the application?', ['The application has four sections.', 'As soon as my adviser checks it tomorrow.', 'I applied for a summer course.', 'The office is near the auditorium.']),
    fixedListeningChoose(3, 'm1', 8, 'woman', 'Could I borrow your notes from Monday?', ['Sure. I will send you a copy tonight.', 'The lecture starts on Monday.', 'I wrote with a black pen.', 'The notes are about economics.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(3, 'm2', 1, 'man', 'Why is the elevator out of service?', ['The service desk is downstairs.', 'It carries twelve people.', 'They are replacing a damaged control panel.', 'I took the stairs this morning.']),
      fixedListeningChoose(3, 'm2', 2, 'woman', 'I thought the assignment was due on Friday.', ['The assignment asks for two examples.', 'Friday is usually quiet.', 'I submitted the previous one online.', 'It was, but the professor moved it to Monday.']),
      fixedListeningChoose(3, 'm2', 3, 'man', 'Would you like me to save you a seat?', ['Yes, please. I may arrive a few minutes late.', 'The seats were recently replaced.', 'I saved the document twice.', 'The lecture lasted an hour.']),
      fixedListeningChoose(3, 'm2', 4, 'woman', 'Where did you put the laboratory keys?', ['The laboratory is locked after six.', 'In the top drawer beside the sink.', 'The keys are made of metal.', 'I put on a clean coat.']),
      fixedListeningChoose(3, 'm2', 5, 'man', 'The package was supposed to arrive yesterday.', ['Let us check the tracking page for an update.', 'Yesterday was a public holiday in several nearby cities.', 'The package on the counter is surprisingly heavy.', 'I arrived at the office shortly before breakfast.']),
      fixedListeningChoose(3, 'm2', 6, 'woman', 'How often does the writing group meet?', ['The group has eight members.', 'We meet in the language center.', 'The writing exercise was useful.', 'Every other Wednesday.']),
      fixedListeningChoose(3, 'm2', 7, 'man', 'I cannot decide which statistics course to take.', ['Statistics uses numerical data.', 'Talk to Professor Chen; she teaches both courses.', 'The course begins in September.', 'I decided to walk home.']),
      fixedListeningChoose(3, 'm2', 8, 'woman', 'Did the technician manage to repair your laptop?', ['The repair shop closes at five.', 'Yes, and it is working normally again.', 'The laptop weighs very little.', 'I manage the student office.']),
    ],
    conversation: fixedListeningStimulus(
      3, 'm2-conversation', 'conversation', 'Joining a research project', CONVERSATION_INSTRUCTIONS,
      `STUDENT: Professor, I saw your notice seeking volunteers for the water-quality project. I am interested, but I have not taken the advanced laboratory course.

PROFESSOR: That course is helpful, not required. New volunteers begin by recording field measurements with an experienced student.

STUDENT: Would the work happen every weekend?

PROFESSOR: Only two Saturdays this month. After that, most data entry can be done online. Send me your timetable, and I will match you with a field team.`,
      ['student', 'professor'], [
        item(3, 'm2-cv1', 'Why is the student uncertain about volunteering?', ['The project meets every weekend.', 'The student has not taken an advanced laboratory course.', 'The notice did not describe water quality.', 'The field teams are already full.']),
        item(3, 'm2-cv2', 'What does the professor ask the student to send?', ['A laboratory report', 'A field measurement', 'A timetable', 'An online data table']),
      ],
    ),
    announcement: fixedListeningStimulus(
      3, 'm2-announcement', 'announcement', 'Film screening relocation', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Tonight’s documentary screening has moved from Lecture Room 4 to the larger Riverside Auditorium because more people registered than expected. The film will still begin at seven thirty, but the doors will open at seven. Please show the digital ticket on your phone; printed tickets are also accepted. The discussion with the director will take place immediately after the film in the same auditorium.`,
      ['announcer'], [
        item(3, 'm2-an1', 'Why was the screening moved?', ['More people registered than the original room could hold.', 'The film will begin earlier.', 'The director requested a smaller room.', 'Printed tickets were cancelled.']),
        item(3, 'm2-an2', 'Where will the discussion with the director occur?', ['In Lecture Room 4', 'At the ticket desk', 'Outside the auditorium', 'In Riverside Auditorium after the film']),
      ],
    ),
    academic: fixedListeningStimulus(
      3, 'm2-academic-talk', 'academic-talk', 'Why Cities Form Heat Islands', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: A heat island occurs when a developed area is warmer than nearby rural land, or when some neighborhoods within a city are hotter than others. Materials such as dark roofs and pavement absorb solar energy during the day and release heat later. Buildings can also reduce airflow, while vehicles and cooling systems add waste heat. The result depends on weather, season, urban design, and the surfaces present; a city is not uniformly warm everywhere.

Vegetation can reduce local temperatures in two main ways. A tree shades a surface, so that surface absorbs less solar energy. Plants also move water from the soil and release water vapor through leaves. Evaporation uses energy and produces cooling, a process called evapotranspiration. Green roofs can provide similar effects where ground space is limited.

These strategies involve tradeoffs. Trees need water, soil volume, maintenance, and species suited to local conditions. Their cooling is strongest near the shaded area, so planting only in already green neighborhoods will not protect residents elsewhere. Researchers therefore map temperature, land cover, and population vulnerability together. The purpose is not merely to lower one citywide average, but to identify where heat exposure and the capacity to respond are most unequal.`,
      ['professor'], [
        item(3, 'm2-at1', 'Which factor contributes to an urban heat island?', ['Only rainfall over rural land', 'The height of every tree', 'Surfaces that absorb and later release solar energy', 'The absence of all buildings']),
        item(3, 'm2-at2', 'How does evapotranspiration cool an area?', ['Plants reflect every sound wave.', 'Evaporation uses energy as plants release water vapor.', 'Roots replace pavement with water.', 'Leaves prevent all sunlight from reaching a city.']),
        item(3, 'm2-at3', 'Why does the professor describe tradeoffs in planting trees?', ['Trees require appropriate space, water, maintenance, and species.', 'Trees always warm nearby buildings.', 'Green roofs cannot contain plants.', 'All neighborhoods already have equal tree cover.']),
        item(3, 'm2-at4', 'Why do researchers combine heat and population maps?', ['To calculate the age of every building', 'To choose one temperature for a whole city', 'To measure only rural rainfall', 'To identify places where exposure and vulnerability overlap']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET4 = fixedListeningSet(4, {
  module1ChooseAdditions: [
    fixedListeningChoose(4, 'm1', 6, 'man', 'Have you finished reserving the equipment for Friday?', ['Friday is the fifth working day of our schedule.', 'Almost. I still need the camera department’s approval.', 'The new recording equipment was expensive to purchase.', 'We finished the previous assignment shortly before lunch.']),
    fixedListeningChoose(4, 'm1', 7, 'woman', 'Why is the north entrance locked?', ['The security office closes late.', 'I entered through the main doors.', 'Construction crews are repairing the steps.', 'The lock uses a metal key.']),
    fixedListeningChoose(4, 'm1', 8, 'man', 'Would you prefer the window seat or the aisle?', ['The window needs cleaning.', 'The aisle is very narrow.', 'I prefer traveling by train.', 'The aisle seat, please.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(4, 'm2', 1, 'woman', 'Can you help me carry these boxes upstairs?', ['Certainly. Let me put my books down first.', 'The stairs are near the elevator.', 'The boxes contain old files.', 'I carried an umbrella yesterday.']),
      fixedListeningChoose(4, 'm2', 2, 'man', 'Where are the tickets for tonight’s performance?', ['The performance received good reviews.', 'In the envelope beside the telephone.', 'The theater is across town.', 'Tonight will be colder.']),
      fixedListeningChoose(4, 'm2', 3, 'woman', 'I am worried that this paragraph is not clear.', ['Ask your classmate to read it and explain what they understand.', 'The paragraph you showed me contains five complete sentences.', 'I cleared the large table in the classroom already.', 'The final version of the essay is due next week.']),
      fixedListeningChoose(4, 'm2', 4, 'man', 'Did you remember to cancel the room booking?', ['The room has twenty chairs.', 'I remember our first class.', 'The booking site is useful.', 'Yes, I received the cancellation email.']),
      fixedListeningChoose(4, 'm2', 5, 'woman', 'How much time should we allow for the transfer?', ['At least twenty minutes, in case the first bus is late.', 'The electronic transfer form is available on the website.', 'We allowed three additional people inside the meeting room.', 'The bus ticket I purchased yesterday was surprisingly inexpensive.']),
      fixedListeningChoose(4, 'm2', 6, 'man', 'I did not expect the library to be this crowded.', ['The library owns old maps.', 'Neither did I. Let us try the quiet floor upstairs.', 'I expected the parcel yesterday.', 'The crowd left after the game.']),
      fixedListeningChoose(4, 'm2', 7, 'woman', 'When will the replacement part arrive?', ['The machine needs a small part.', 'It was replaced last year.', 'The supplier promised delivery on Thursday.', 'I arrived shortly after noon.']),
      fixedListeningChoose(4, 'm2', 8, 'man', 'The forecast says it may freeze tonight.', ['The forecast appears every hour.', 'I froze the extra vegetables.', 'Tonight’s lecture starts at eight.', 'Then we should bring the plants indoors.']),
    ],
    conversation: fixedListeningStimulus(
      4, 'm2-conversation', 'conversation', 'Correcting a student identification card', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My new identification card arrived, but my family name is spelled incorrectly.

STAFF MEMBER: I am sorry about that. I can request a replacement. First, upload a photograph of your passport to the secure form.

STUDENT: Will my current card stop working immediately?

STAFF MEMBER: No. Keep using it until the replacement is ready next week. We will email you, and you can exchange the old card at this desk. There is no replacement fee because the error was ours.`,
      ['student', 'announcer'], [
        item(4, 'm2-cv1', 'What is wrong with the student’s new card?', ['It no longer opens campus doors.', 'It has the wrong photograph.', 'It was sent to another student.', 'The family name is misspelled.']),
        item(4, 'm2-cv2', 'What should the student do with the current card?', ['Continue using it until the replacement is ready.', 'Destroy it immediately.', 'Mail it with a payment.', 'Upload it instead of a passport.']),
      ],
    ),
    announcement: fixedListeningStimulus(
      4, 'm2-announcement', 'announcement', 'Garden volunteer morning', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Volunteers for Saturday’s community garden morning should meet at the south gate at eight thirty. The forecast is dry, so the event will proceed as planned. Gloves and tools are provided, but bring a refillable water bottle and wear closed shoes. New volunteers will receive a short safety briefing before joining a team. If you registered and can no longer attend, cancel online by Friday noon so someone on the waiting list can participate.`,
      ['announcer'], [
        item(4, 'm2-an1', 'What will organizers provide?', ['Water bottles and shoes', 'Gloves and tools', 'Transportation to the garden', 'Breakfast for every volunteer']),
        item(4, 'm2-an2', 'Why should someone cancel by Friday noon?', ['To change the weather forecast', 'To avoid the safety briefing', 'To allow a waiting-list volunteer to participate', 'To move the event to Sunday']),
      ],
    ),
    academic: fixedListeningStimulus(
      4, 'm2-academic-talk', 'academic-talk', 'How Migrating Birds Navigate', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Migration is a regular seasonal journey that usually includes a return, not simply any movement from one place to another. Birds making these journeys must determine direction and position across landscapes that may be unfamiliar. Evidence suggests that many species combine several sources of information instead of relying on one perfect biological compass.

During the day, some birds can use the sun’s position, adjusted for the time of day. At night, star patterns and the rotation of the sky can provide direction. Experiments also show sensitivity to Earth’s magnetic field. Visual landmarks, odors, and even low-frequency sound may contribute in certain species or locations. Young birds sometimes inherit a general direction, while experience can improve a route over repeated journeys.

Using several cues makes navigation more flexible, but each cue can be disrupted. Clouds hide celestial information. Magnetic conditions vary, and artificial night lighting can disorient birds that travel after dark. Researchers test navigation by changing one cue while monitoring release direction or flight paths. A changed response supports a role for that cue, but it does not prove the bird uses nothing else. The emerging picture is a system in which cues can reinforce, calibrate, or sometimes contradict one another.`,
      ['professor'], [
        item(4, 'm2-at1', 'How does the professor define migration?', ['A one-way movement caused by storms', 'Any daily search for food', 'Movement only by birds', 'A regular seasonal journey that usually includes a return']),
        item(4, 'm2-at2', 'What can some birds use to navigate at night?', ['Star patterns and the rotation of the sky', 'Only the temperature of water', 'The color of artificial buildings', 'A route map learned from humans']),
        item(4, 'm2-at3', 'Why is combining several cues useful?', ['It prevents all weather changes.', 'It makes experience unnecessary.', 'One cue may be unavailable or disrupted.', 'Every species uses identical cues.']),
        item(4, 'm2-at4', 'What does a response to one altered cue demonstrate?', ['The cue is the bird’s only source of information.', 'The cue probably contributes, but other cues may also matter.', 'The bird can no longer migrate.', 'The experiment has measured every possible cue.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET5 = fixedListeningSet(5, {
  module1ChooseAdditions: [
    fixedListeningChoose(5, 'm1', 6, 'woman', 'Is there a quieter place where I can take this call?', ['The call begins in ten minutes.', 'The lobby has comfortable chairs.', 'Try the small meeting booth near reception.', 'I called the office yesterday.']),
    fixedListeningChoose(5, 'm1', 7, 'man', 'I am thinking of dropping the evening class.', ['What is making you consider that?', 'The class meets twice a week.', 'Evening comes after afternoon.', 'I dropped my keys outside.']),
    fixedListeningChoose(5, 'm1', 8, 'woman', 'Did the restaurant confirm our reservation?', ['The restaurant serves seafood.', 'Yes, they sent a message this afternoon.', 'We reserved a table for six.', 'The confirmation number is long.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(5, 'm2', 1, 'man', 'When should I return the borrowed projector?', ['The projector displays a bright image.', 'I borrowed it from the media center.', 'The return desk is downstairs.', 'By five o’clock tomorrow.']),
      fixedListeningChoose(5, 'm2', 2, 'woman', 'I expected the repair to cost much more.', ['The repair shop is nearby.', 'So did I. The discount was a pleasant surprise.', 'The receipt is in my pocket.', 'It took much longer yesterday.']),
      fixedListeningChoose(5, 'm2', 3, 'man', 'Could we move our appointment to the afternoon?', ['Yes, I have an opening at three.', 'The appointment is in Building C.', 'I moved the chair already.', 'Afternoon classes are popular.']),
      fixedListeningChoose(5, 'm2', 4, 'woman', 'Where can I find the course reading list?', ['The course lasts twelve weeks.', 'I read the first article.', 'It is posted on the class website.', 'The list includes fifteen names.']),
      fixedListeningChoose(5, 'm2', 5, 'man', 'The train is delayed because of a signal problem.', ['Signals can use different colors.', 'I traveled by train last month.', 'The delay lasted all morning.', 'Then I will tell them we are arriving late.']),
      fixedListeningChoose(5, 'm2', 6, 'woman', 'Why did Elena leave the meeting so early?', ['The meeting room was on the left.', 'She had to meet a client across town.', 'Elena arrived before everyone.', 'The early train was crowded.']),
      fixedListeningChoose(5, 'm2', 7, 'man', 'Would you like a printed copy of the schedule?', ['The printer in the office needs a new ink cartridge.', 'The schedule for the workshop changed twice this week.', 'No, thank you. I can view it on my phone.', 'The extra copy is lying on the table near the door.']),
      fixedListeningChoose(5, 'm2', 8, 'woman', 'I cannot get this cabinet door to close.', ['The cabinet was delivered today.', 'Let me check whether something is blocking it.', 'The door is painted white.', 'I closed the office at six.']),
    ],
    conversation: fixedListeningStimulus(
      5, 'm2-conversation', 'conversation', 'Requesting a course prerequisite review', CONVERSATION_INSTRUCTIONS,
      `STUDENT: The registration system will not let me choose Environmental Modeling because it says I lack the statistics prerequisite. I took a similar course during my exchange semester.

ADVISER: The system cannot recognize external courses automatically. Send me the course description and your transcript.

STUDENT: Registration closes tomorrow. Will the review take too long?

ADVISER: I can place a temporary hold on one seat while the department reviews your documents. That hold lasts three business days, so send them today.`,
      ['student', 'announcer'], [
        item(5, 'm2-cv1', 'Why can the student not register through the system?', ['The system does not recognize the external prerequisite course.', 'Environmental Modeling has been cancelled.', 'The student’s transcript is missing every grade.', 'Registration closed the previous day.']),
        item(5, 'm2-cv2', 'What will the adviser do?', ['Approve the external course personally', 'Extend registration for the whole department', 'Remove the statistics prerequisite', 'Temporarily hold a seat during the review']),
      ],
    ),
    announcement: fixedListeningStimulus(
      5, 'm2-announcement', 'announcement', 'Art studio access', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Beginning Monday, students must tap their identification card to enter the art studio after six p.m. The daytime entrance procedure is unchanged. If your card does not work, do not ask another student to let you in; visit the facilities desk before it closes at five. The new system records entry only. You must still sign out specialized tools from the studio supervisor.`,
      ['announcer'], [
        item(5, 'm2-an1', 'What changes beginning Monday?', ['The art studio closes at five.', 'Students must reserve daytime access.', 'Identification cards are required for evening entry.', 'Specialized tools may leave the building.']),
        item(5, 'm2-an2', 'What should a student do if a card does not work?', ['Ask another student to open the door.', 'Visit the facilities desk before five.', 'Sign out a different identification card.', 'Wait until the studio supervisor leaves.']),
      ],
    ),
    academic: fixedListeningStimulus(
      5, 'm2-academic-talk', 'academic-talk', 'Evidence for Seafloor Spreading', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: At mid-ocean ridges, tectonic plates move apart and molten material rises, cools, and becomes new oceanic crust. This process is called seafloor spreading. If crust is continually created, we should find systematic evidence on both sides of a ridge—and that is exactly what ocean surveys revealed.

First, rocks closest to a ridge crest are generally youngest, while rocks become older with distance. Second, many seafloor rocks contain magnetic minerals. As molten rock cools, those minerals align with Earth’s magnetic field and preserve its polarity. Because Earth’s field has reversed many times, surveys found alternating bands of normal and reversed polarity. The bands form roughly symmetrical patterns on opposite sides of a ridge, as expected if new rock forms at the center and moves outward.

Deep-sea drilling provided another test by recovering rock and sediment at known distances. The measured ages supported the pattern inferred from magnetic stripes. Seafloor spreading does not make Earth continually larger because old oceanic lithosphere is recycled into the mantle at many convergent boundaries. The importance of the evidence lies not in one observation alone, but in the agreement among topography, magnetic patterns, rock ages, earthquakes, and volcanism.`,
      ['professor'], [
        item(5, 'm2-at1', 'Where does new oceanic crust form in seafloor spreading?', ['At the center of continents', 'At mid-ocean ridges where plates move apart', 'Only inside deep ocean trenches', 'At every transform boundary']),
        item(5, 'm2-at2', 'Why do seafloor rocks preserve magnetic polarity?', ['Ocean water reverses the minerals.', 'Sediment paints alternating bands.', 'Drilling changes the direction of the field.', 'Magnetic minerals align as molten rock cools.']),
        item(5, 'm2-at3', 'What pattern supports outward movement from a ridge?', ['Roughly symmetrical magnetic bands on both sides', 'Identical rock ages everywhere in an ocean', 'The absence of earthquakes near ridges', 'The oldest rock at the ridge crest']),
        item(5, 'm2-at4', 'Why does seafloor spreading not make Earth continually larger?', ['New crust immediately evaporates.', 'Ridges stop forming after each reversal.', 'Old oceanic lithosphere is recycled at convergent boundaries.', 'Continents absorb all new crust.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SETS_1_TO_5 = [
  TOEFL_FIXED_LISTENING_SET1,
  TOEFL_FIXED_LISTENING_SET2,
  TOEFL_FIXED_LISTENING_SET3,
  TOEFL_FIXED_LISTENING_SET4,
  TOEFL_FIXED_LISTENING_SET5,
] as const;
