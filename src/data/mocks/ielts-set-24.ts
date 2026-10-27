import type { MockExam } from '@/data/mocks/types';

const mock: MockExam = {
  "id": "set-24",
  "examSlug": "ielts",
  "title": "IELTS Academic Set 24",
  "subtitle": "The Ground Beneath a Street Tree · From Raised Letters to a Six-Dot Cell · A Surface That Cools Under the Sun",
  "timeMinutes": 164,
  "sections": [
    {
      "part": 1,
      "skill": "listening",
      "title": "Listening — Part 1: A Dublin resident phones a community veterinary clinic to register her dog and arrange a vaccination appointment.",
      "instructions": "1-6: Complete the registration form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.\n7-10: Choose the correct answer, A, B or C.",
      "transcript": "SEÁN: Good morning, Harbour Community Veterinary Clinic. Seán speaking. How can I help?\nNIAMH: Hi. I'm calling about the low-cost vaccination clinic. We moved across Dublin last month, and I'd like to register my dog before I book a time. I have the rescue paperwork here, although one page is only a photocopy.\nSEÁN: That's fine. I'll enter the basic details first, then we'll look at locations and times. If anything clinical is unclear, the nurse can check it when you arrive. What's your dog's name?\nNIAMH: His name is Bramble — B R A M B L E. The receptionist at our old clinic once wrote Brandon, so I always spell it now.\nSEÁN: Bramble. Got it. And what breed should I put on the form? We use the description from the animal's records, rather than guessing from appearance.\nNIAMH: They wondered whether he had some collie in him, but every official page says lurcher. So please put lurcher.\nSEÁN: Certainly. How old is he now? An approximate age is acceptable for a rescue dog if that is all you were given.\nNIAMH: We do know it. He turned three in January. His adoption form still says two, but that was completed before his birthday.\nSEÁN: Thanks. Next I need the final four digits of the microchip number. They should be below the barcode on the original certificate.\nNIAMH: I've found it. The photocopy ends four, two, eight, seven, but someone switched the middle digits. The original certificate ends four, eight, two, seven — that's 4827 on the form.\nSEÁN: Right, I've recorded that. Do you know the month of his last annual vaccination? I only need the month today; we'll verify the full date from the booklet.\nNIAMH: Yes, it was in March. We adopted him in February, then the rescue centre arranged the vaccination the following month.\nSEÁN: One last registration detail: how should we confirm the appointment? We can call, email, or send a short message to your mobile. The confirmation will include the location, arrival instructions, and our cancellation number.\nNIAMH: A text message would be best. I rarely hear my phone while I'm working, and clinic emails sometimes disappear into the junk folder, but I check texts at lunch.\nSEÁN: That's the registration done. Let's find an appointment that fits your journey and Bramble's routine. The main surgery on O'Connell Street has indoor slots, and on Wednesdays our mobile clinic parks beside the library in Rathmines. There's also a Saturday van at the school car park.\nNIAMH: I'll choose the mobile clinic beside the library. Parking near the main surgery is difficult, and the school is across the city. The library is a short walk from my office, so I can bring Bramble over after work.\nSEÁN: Let me check next Wednesday. I can offer nine-fifteen, a cancellation at twelve-thirty, or the final appointment at four-forty-five. Each slot lasts twenty minutes, and the van closes immediately after the last patient has been seen that evening.\nNIAMH: Bramble is fine in the morning, and transport isn't the issue. I have a work meeting that runs until three, so the two earlier times are impossible. Four-forty-five is the one I can manage.\nSEÁN: I've booked that. Please arrive ten minutes early and bring his vaccination record, even though some entries came from the rescue centre. We can scan the chip at the van, so the chip certificate is optional, and we don't need proof of address.\nNIAMH: Just the vaccination record, then. That's easier than carrying the whole adoption file. I'll put the booklet beside his lead this evening so it comes with us.\nSEÁN: Good. Payment is taken at the van, and you can pay by card when you arrive. The link on our website is only for donations; it won't accept clinic fees. We no longer take cash at the mobile service.\nNIAMH: Card on arrival is perfect. Is there anything about the queue I should know?\nSEÁN: Keep him on a short lead and wait beside the blue sign until the nurse calls you. If he seems unwell that day, phone first rather than bringing him into the queue.\nNIAMH: Understood. I'll watch for the confirmation message. Thanks for your help.\nSEÁN: You're welcome. The text should arrive this afternoon. Goodbye.",
      "audioUrl": "/audio/ielts/ielts-listening-set-24.mp3",
      "mediaId": "ielts-set-24-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "fill",
          "id": "l-q01",
          "part": 1,
          "text": "Dog’s name: ______",
          "answers": [
            "Bramble",
            "bramble"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q02",
          "part": 1,
          "text": "Breed: ______",
          "answers": [
            "lurcher"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q03",
          "part": 1,
          "text": "Age: ______ years",
          "answers": [
            "3",
            "three"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q04",
          "part": 1,
          "text": "Final four microchip digits: ______",
          "answers": [
            "4827"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q05",
          "part": 1,
          "text": "Previous vaccination month: ______",
          "answers": [
            "March",
            "march"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q06",
          "part": 1,
          "text": "Preferred confirmation method: ______",
          "answers": [
            "text message",
            "text"
          ],
          "maxWords": 2
        },
        {
          "type": "mcq",
          "id": "l-q07",
          "part": 1,
          "text": "Which clinic location does Niamh choose?",
          "options": [
            "the mobile clinic beside the library",
            "the main surgery on O’Connell Street",
            "the van at the school car park"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q08",
          "part": 1,
          "text": "Why does Niamh reject the earlier appointments?",
          "options": [
            "Bramble is nervous in the morning",
            "public transport is unavailable",
            "she has a work meeting"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q09",
          "part": 1,
          "text": "What must Niamh bring to the appointment?",
          "options": [
            "the microchip certificate",
            "the vaccination record",
            "proof of address"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q10",
          "part": 1,
          "text": "How will Niamh pay the clinic fee?",
          "options": [
            "by card on arrival",
            "online before the visit",
            "in cash after the appointment"
          ],
          "answer": 0
        }
      ]
    },
    {
      "part": 2,
      "skill": "listening",
      "title": "Listening — Part 2: A ranger gives winter safety directions for a fictional coastal trail in County Donegal.",
      "instructions": "11-16: Label the map. Choose the correct letter, A-H, for Questions 11-16.\n17-20: Answer the questions. Write NO MORE THAN TWO WORDS for each answer.",
      "transcript": "AOIFE: Welcome to the winter briefing for the Carrick Bay coastal trail. I'm Aoife Gallagher, one of the rangers. The cliff section is closed today, so everyone must use the signed inland diversion shown on your map. I'll describe the route in walking order, then explain four safety decisions. Keep the map facing north: several tracks look alike where they leave the bay, especially when low cloud hides the headland.\nAOIFE: Begin in the car park in the south-west corner. Before you join the trail, look to the right, along the north edge of the parking area. The information board is there, beside the water tap. Do not confuse it with the small notice fixed to the toilets opposite. The main board carries today's closure, the ranger telephone number, and the route-check time, so each group should stop there.\nAOIFE: From the board, take the pale gravel path north-east. It reaches a low stone bridge over the stream. Cross the bridge but do not turn beside it; the narrow track following the bank serves the fields. Continue until the gravel becomes dark compacted earth at a wooden barrier on the coast. That barrier is the tide gate. You may hear the sea before you see it, but stay on the maintained surface until you reach the gate.\nAOIFE: In summer the usual trail passes through that barrier and follows the shore. In winter, waves can cut off the beach with very little warning. The start of the winter diversion lies just before the gate, on its eastern side. Choose the narrower path bending inland, marked by two orange arrows. The broad track continuing north looks easier, but it leads towards the closed shore and must not be used.\nAOIFE: The diversion climbs gradually between two fields. First you pass emergency marker two beside a dry-stone wall. That is not the point you need to label. Continue to the next bend, where a line of wind-shaped pine trees crosses your view. Immediately beyond the trees stands emergency marker three. The number is printed on both faces of the yellow post, so you can identify it when walking in either direction.\nAOIFE: After marker three, the path descends towards two buildings near the service road. The larger grey building is the ranger store, which is locked to visitors. The warming shelter is the smaller building west of it, directly beside the walking path. It has a green roof and a covered doorway. If you reach the vehicle barrier by the store, you have gone too far east and should return to the path.\nAOIFE: Beyond the shelter, continue north and ignore the right-hand track dropping to the beach steps; those steps are closed. The safe trail curves left around the headland. It finishes at the lookout point, just south of the north arrow on your map. A rope barrier marks the end. There is no second exit beyond it, so anyone who is already tired should turn around at the shelter rather than attempt the final exposed section.\nAOIFE: To recap the map: you leave the car park by the information board, cross the stone bridge, and reach the tide gate. The winter path then turns inland past marker three and the warming shelter before ending at the lookout. The bridge, marker two, ranger store, and beach steps are useful landmarks, but they are not the six locations you are being asked to identify.\nAOIFE: Now, the safety details. Conditions on the headland can differ sharply from those in the nearest town, and clear sky above the car park tells you nothing about mist moving in from the water. Before leaving home, check the weather forecast specifically for this coast. If the warning is amber or red, postpone the walk rather than hoping it will improve.\nAOIFE: Some older online photographs show red emergency posts, and a few faded red bases remain beside the path. Those markers were replaced two years ago: every current marker is yellow. In an emergency, quote the number on the nearest yellow post so the rescue team knows which approach to use.\nAOIFE: Carry drinking water and an extra warm layer, even for a short walk. A paper map is useful when reception is weak, but it cannot be used to call for help. Put a charged phone in a waterproof bag and check its battery before leaving. The rescue team asks you to protect that phone from spray because it provides both contact and a location reading.\nAOIFE: At the tide gate, inspect the striped depth post before taking the inland turn. If water already covers the lower white band, turn back. Do not wait beside the gate for the level to drop, since the next surge may be higher, and never try to reach the diversion by stepping across wet rocks. The safe decision applies even when other walkers appear to be continuing.\nAOIFE: Children should stay on the inland side of the path, and dogs must remain on a lead. The warming shelter has blankets, a first-aid box, and an emergency radio, but no café or drinking water. It is for short emergency stops, not planned lunch breaks, so carry your own supplies.\nAOIFE: If mist closes in after marker three, return to the shelter rather than pressing on. The final section becomes confusing when the barrier and coastline disappear. Rangers inspect the route at closing time, but that does not replace turning around promptly.\nAOIFE: Finally, copy the ranger number before setting off and tell someone when you expect to return. Allow extra time for the inland climb, follow the diversion signs, and let the conditions decide how far you go.",
      "audioUrl": "/audio/ielts/ielts-listening-set-24.mp3",
      "mediaId": "ielts-set-24-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "mcq",
          "id": "l-q11",
          "part": 2,
          "text": "information board",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H"
          ],
          "answer": 2,
          "imageUrl": "/assets/ielts/listening/set24-part2-map.svg",
          "imageAlt": "Map of Carrick Bay with north at the top. A solid route starts at the car park in the south-west, goes north-east past the stone bridge, bends east and then north-east, and ends near the upper-right rope barrier. The toilets are west of the lower route; marker 2 is near the centre; the ranger store is east of the upper-middle route; the beach steps are on the far eastern side. A dashed summer shore path branches from the central junction to the closed beach steps. Option C is on the first route point north-east of the car park; F is at the central junction beyond the bridge; A is just south-east of F; H is east of marker 2; D is west of the ranger store; B is at the northern end of the route; E is at the bend beside the ranger store; G is beside the beach steps. The option letters are possible locations and are not associated with the listed features in this description."
        },
        {
          "type": "mcq",
          "id": "l-q12",
          "part": 2,
          "text": "tide gate",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H"
          ],
          "answer": 5,
          "imageUrl": "/assets/ielts/listening/set24-part2-map.svg",
          "imageAlt": "Map of Carrick Bay with north at the top. A solid route starts at the car park in the south-west, goes north-east past the stone bridge, bends east and then north-east, and ends near the upper-right rope barrier. The toilets are west of the lower route; marker 2 is near the centre; the ranger store is east of the upper-middle route; the beach steps are on the far eastern side. A dashed summer shore path branches from the central junction to the closed beach steps. Option C is on the first route point north-east of the car park; F is at the central junction beyond the bridge; A is just south-east of F; H is east of marker 2; D is west of the ranger store; B is at the northern end of the route; E is at the bend beside the ranger store; G is beside the beach steps. The option letters are possible locations and are not associated with the listed features in this description."
        },
        {
          "type": "mcq",
          "id": "l-q13",
          "part": 2,
          "text": "start of winter diversion",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H"
          ],
          "answer": 0,
          "imageUrl": "/assets/ielts/listening/set24-part2-map.svg",
          "imageAlt": "Map of Carrick Bay with north at the top. A solid route starts at the car park in the south-west, goes north-east past the stone bridge, bends east and then north-east, and ends near the upper-right rope barrier. The toilets are west of the lower route; marker 2 is near the centre; the ranger store is east of the upper-middle route; the beach steps are on the far eastern side. A dashed summer shore path branches from the central junction to the closed beach steps. Option C is on the first route point north-east of the car park; F is at the central junction beyond the bridge; A is just south-east of F; H is east of marker 2; D is west of the ranger store; B is at the northern end of the route; E is at the bend beside the ranger store; G is beside the beach steps. The option letters are possible locations and are not associated with the listed features in this description."
        },
        {
          "type": "mcq",
          "id": "l-q14",
          "part": 2,
          "text": "emergency marker 3",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H"
          ],
          "answer": 7,
          "imageUrl": "/assets/ielts/listening/set24-part2-map.svg",
          "imageAlt": "Map of Carrick Bay with north at the top. A solid route starts at the car park in the south-west, goes north-east past the stone bridge, bends east and then north-east, and ends near the upper-right rope barrier. The toilets are west of the lower route; marker 2 is near the centre; the ranger store is east of the upper-middle route; the beach steps are on the far eastern side. A dashed summer shore path branches from the central junction to the closed beach steps. Option C is on the first route point north-east of the car park; F is at the central junction beyond the bridge; A is just south-east of F; H is east of marker 2; D is west of the ranger store; B is at the northern end of the route; E is at the bend beside the ranger store; G is beside the beach steps. The option letters are possible locations and are not associated with the listed features in this description."
        },
        {
          "type": "mcq",
          "id": "l-q15",
          "part": 2,
          "text": "warming shelter",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H"
          ],
          "answer": 3,
          "imageUrl": "/assets/ielts/listening/set24-part2-map.svg",
          "imageAlt": "Map of Carrick Bay with north at the top. A solid route starts at the car park in the south-west, goes north-east past the stone bridge, bends east and then north-east, and ends near the upper-right rope barrier. The toilets are west of the lower route; marker 2 is near the centre; the ranger store is east of the upper-middle route; the beach steps are on the far eastern side. A dashed summer shore path branches from the central junction to the closed beach steps. Option C is on the first route point north-east of the car park; F is at the central junction beyond the bridge; A is just south-east of F; H is east of marker 2; D is west of the ranger store; B is at the northern end of the route; E is at the bend beside the ranger store; G is beside the beach steps. The option letters are possible locations and are not associated with the listed features in this description."
        },
        {
          "type": "mcq",
          "id": "l-q16",
          "part": 2,
          "text": "lookout point",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H"
          ],
          "answer": 1,
          "imageUrl": "/assets/ielts/listening/set24-part2-map.svg",
          "imageAlt": "Map of Carrick Bay with north at the top. A solid route starts at the car park in the south-west, goes north-east past the stone bridge, bends east and then north-east, and ends near the upper-right rope barrier. The toilets are west of the lower route; marker 2 is near the centre; the ranger store is east of the upper-middle route; the beach steps are on the far eastern side. A dashed summer shore path branches from the central junction to the closed beach steps. Option C is on the first route point north-east of the car park; F is at the central junction beyond the bridge; A is just south-east of F; H is east of marker 2; D is west of the ranger store; B is at the northern end of the route; E is at the bend beside the ranger store; G is beside the beach steps. The option letters are possible locations and are not associated with the listed features in this description."
        },
        {
          "type": "fill",
          "id": "l-q17",
          "part": 2,
          "text": "What should walkers check before leaving home?",
          "answers": [
            "weather forecast",
            "forecast"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q18",
          "part": 2,
          "text": "What colour are the emergency markers?",
          "answers": [
            "yellow"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q19",
          "part": 2,
          "text": "What should walkers keep in a waterproof bag?",
          "answers": [
            "charged phone",
            "phone"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q20",
          "part": 2,
          "text": "What should walkers do if water covers the lower band at the tide gate?",
          "answers": [
            "turn back"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 3,
      "skill": "listening",
      "title": "Listening — Part 3: Two conservation students and their tutor refine a controlled light-exposure study of dyed textile replicas in Melbourne.",
      "instructions": "21-26: Choose the correct answer, A, B or C.\n27-30: Who is responsible for each decision? Choose A, B or C. You may use any letter more than once.",
      "transcript": "OLIVIA: Let's go through the light-exposure proposal before you submit it. Fading in dyed textiles is a suitable conservation topic, but your research question still needs to be precise enough for a six-week study. I also want the method to explain each control, not simply list equipment.\nMEI: Our first idea was to borrow tiny nineteenth-century fragments from the teaching collection. They're already damaged and rarely displayed, so we assumed a little additional exposure would be acceptable. We would have returned them after every weekly reading.\nOLIVIA: That would still cause irreversible change to original material. When the same question can be answered with a replica, there is no ethical reason to consume a collection object. Use newly dyed wool swatches instead. You can make enough pieces for repetition, and their known recipes will help you interpret unexpected fading.\nLACHLAN: That solves the sample-size problem too. I can cut all the swatches from one bolt and distribute pieces from different areas across the treatments. Otherwise, a slightly tighter section of weave might make one lamp group look more stable than the other.\nMEI: For the research question, could we simply compare a bright display case with a dim one? It would be easy to explain to visitors, and the visual difference should appear quickly.\nOLIVIA: It would appear quickly because the result is almost built into the design. Your better proposal compares two LED spectra at equal cumulative exposure. That tests spectral composition instead of merely confirming that more light causes more damage. Measure each lamp's output; its colour label is not precise enough.\nLACHLAN: For colour change, I planned to photograph the swatches every Friday with the camera fixed to a stand. I could include a grey card and keep the room lights off, which should make the images fairly consistent.\nOLIVIA: Keep the photographs as a visual record, but don't make them the main data. Camera settings, processing, and screens can alter appearance. Take baseline and weekly colorimeter readings for repeatable numerical measurements. Average several points on each swatch so one dark fibre does not control the result.\nMEI: If the blue-rich lamp appears brighter, should both sets still stay under their lamps for the same number of hours? Changing the schedule might look like we're treating the samples differently.\nOLIVIA: Equal hours are not necessarily equal exposure; one lamp may deliver more energy per hour. Adjust the duration so both groups receive the same total light dose. Then spectrum remains the independent variable. Include the calculation so another researcher can reproduce the schedule with lamps of different power.\nLACHLAN: We also planned to keep a third set in a cupboard. I described those swatches as spares in case one of the exposed pieces is dropped or stained. Is that sufficient?\nOLIVIA: No, the dark set has an analytical purpose. It reveals colour changes caused by reasons other than light, such as handling or dye instability. Keep it in the same room for comparable temperature and humidity, open it only for measurements, and handle it exactly like the illuminated swatches.\nMEI: There is one awkward feature of the exposure shelf: the corner near the power unit is slightly warmer. We could record that temperature and leave every swatch in one fixed position, then discuss any unusual result from that corner.\nOLIVIA: Recording temperature is useful, but fixed samples would make location a hidden variable. Randomise the swatch positions each week, spreading shelf differences across treatments instead of confusing them with one lamp. Prepare the sequence in advance and retain it in the laboratory log.\nLACHLAN: When we interpret the results, could we say that the stronger exposure represents twenty years in a gallery? That would give the museum a practical number for planning displays.\nOLIVIA: You can compare treatments, but don't make that conversion. Short, intense exposure may not reproduce slow ageing under gallery conditions; reactions can change with intensity, temperature, and rest periods. State that as the main limitation and recommend longer observation before translating results into display years.\nMEI: So the revised design uses replica wool, two spectra at an equal dose, instrument measurements, a dark control, and weekly randomisation. The result will compare treatments, not predict an exact lifetime.\nOLIVIA: Exactly. Now let's allocate the four remaining decisions before we finish. Each line in the responsibility table needs one named lead and a short note about the evidence that person will retain. You may assist one another in the laboratory, but a reader should be able to see who maintains the record or has authority to approve a limit.\nMEI: I've already tested the dye recipes, so I can maintain the preparation log. I'll enter fibre weight, dye concentration, bath temperature, and every batch number as the swatches are made. That will be more reliable than trying to reconstruct a batch from labels on the drying trays.\nLACHLAN: Then I'll handle the colorimeter calibration. I used the same model during my placement. Before every weekly session I'll run the white-tile check, record the result, and repeat it if the instrument has drifted beyond the manufacturer's tolerance.\nOLIVIA: Good. The maximum exposure ceiling must be approved by me. It affects laboratory safety and sets the point beyond which the accelerated treatment would no longer be ethically or scientifically defensible. You can calculate the proposed dose, but place my name in the approval column.\nMEI: That leaves the replica cloth. I met the textile workshop manager last term, so I'll contact the workshop and confirm the fibre specification, weave, quantity, and delivery date. I'll copy Lachlan into the message because he needs the cloth dimensions for the cutting plan.\nLACHLAN: I can help label the swatches once they arrive, and Mei can observe the first calibration. Those shared activities won't change the four named leads, will they?\nOLIVIA: No. Distinguish routine assistance from responsibility for a conservation decision or its formal record. In the report, state the lead first and then note any supporting work. That makes the method auditable without pretending the project was completed by four isolated individuals.\nMEI: We'll revise the responsibility table this afternoon, attach the dose calculation, and add the randomisation schedule as an appendix.\nOLIVIA: Send me that version before Friday. If the exposure ceiling, calibration record, and replica specification are clear, you can begin preparing the swatches next week. Keep the photographs in the plan, but remember they support the instrument data rather than replace it.",
      "audioUrl": "/audio/ielts/ielts-listening-set-24.mp3",
      "mediaId": "ielts-set-24-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "mcq",
          "id": "l-q21",
          "part": 3,
          "text": "Why do the group decide to use replica swatches?",
          "options": [
            "They fade more quickly.",
            "They avoid risk to collection objects.",
            "They are easier to photograph."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q22",
          "part": 3,
          "text": "What will provide the main colour measurements?",
          "options": [
            "weekly photographs",
            "a visual rating scale",
            "colorimeter readings"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q23",
          "part": 3,
          "text": "What will be kept equal between the two lamp groups?",
          "options": [
            "the exposure time",
            "the total light dose",
            "the apparent brightness"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q24",
          "part": 3,
          "text": "What is the purpose of the dark control?",
          "options": [
            "to detect colour change not caused by light",
            "to provide spare swatches",
            "to measure humidity inside a cupboard"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q25",
          "part": 3,
          "text": "How will the students reduce the effect of shelf position?",
          "options": [
            "record the temperature once",
            "use only the centre of the shelf",
            "randomise positions each week"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q26",
          "part": 3,
          "text": "What main limitation will the report acknowledge?",
          "options": [
            "Replica dyes cannot be measured accurately.",
            "Accelerated exposure may differ from slow gallery ageing.",
            "LED spectra cannot be compared at equal dose."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q27",
          "part": 3,
          "text": "maintaining the dye preparation log",
          "options": [
            "Mei Tan",
            "Lachlan Price",
            "Olivia Mercer"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q28",
          "part": 3,
          "text": "calibrating the colorimeter",
          "options": [
            "Mei Tan",
            "Lachlan Price",
            "Olivia Mercer"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q29",
          "part": 3,
          "text": "approving the maximum exposure ceiling",
          "options": [
            "Mei Tan",
            "Lachlan Price",
            "Olivia Mercer"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q30",
          "part": 3,
          "text": "contacting the textile workshop",
          "options": [
            "Mei Tan",
            "Lachlan Price",
            "Olivia Mercer"
          ],
          "answer": 0
        }
      ]
    },
    {
      "part": 4,
      "skill": "listening",
      "title": "Listening — Part 4: A New Zealand university lecture explains mechanisms and limitations of ocean-drift seed dispersal to islands.",
      "instructions": "31-36: Complete the notes. Write NO MORE THAN TWO WORDS for each answer.\n37-40: Complete the sentences. Write ONE WORD ONLY for each answer.",
      "transcript": "LECTURER: Today we're examining ocean-drift dispersal: the possibility that seeds cross salt water and establish on islands without deliberate human transport. The familiar image is simple — a seed floats, reaches a beach, and grows — but those are separate biological filters. Researchers therefore distinguish transport, arrival, germination, and establishment. Evidence that a seed passes one filter cannot be treated as proof that it will pass the next, and the probability of success narrows at every stage.\nLECTURER: The first transport filter is buoyancy. Size alone is a poor guide: a large seed whose tissues fill with water may sink, while a smaller one with persistent internal cavities can float. The crucial feature is air spaces within the outer tissue, which reduce overall density and keep the seed near the surface. Experiments use several intact samples because one cracked coat or unusually dense individual may behave differently.\nLECTURER: A second useful feature protects the embryo from immediate salt exposure. Abrasion and pre-existing cracks reduce that protection, and microscopic wear increases permeability during a long voyage. The barrier is a waxy coat, which slows the entry of sea water but never makes the seed permanently waterproof. Its value therefore depends on both its condition and the journey's length.\nLECTURER: Once afloat, a seed may move along a coast, enter open water, and approach another island. The main driver is ocean currents, not the wind direction observed on one day. Multi-year drifter records reveal recurring pathways, but they still express probabilities. Storms can push an individual away from the average route or hold it in circulating water much longer.\nLECTURER: Arrival creates another filter. Waves may throw seeds onto bare rock, where they dry or wash back immediately. Storm debris offers a better chance when it catches a seed at the tide line, above ordinary waves. Leaves and wood can provide shade and reduce movement, though heavy debris may bury the seed too deeply. A favourable feature at one stage can therefore create a later problem.\nLECTURER: A stranded seed remains surrounded by salt. Repeated rain gradually lowers the concentration around the embryo and allows early metabolism to begin. The rain supplies fresh water, which drains through the upper beach and flushes the coat and sand. Tests that replace salt water instantly may exaggerate the benefit, because natural flushing is intermittent and depends on grain size and drainage.\nLECTURER: A viable, desalted seed still cannot establish on ground that shifts with every wave. The emerging root needs stable soil for anchorage, while organic matter retains moisture. The balance matters: saturated ground may lack oxygen, whereas rapidly draining sand leaves seedlings dry. Establishment also requires light and a period without renewed storm disturbance.\nLECTURER: We can now summarise six linked opportunities: flotation supported by air spaces; slower water entry through a waxy coat; movement by ocean currents; capture at the tide line; salt removal by fresh water; and anchorage in stable soil. This is not a recipe that guarantees colonisation. Failure at any point ends that individual's journey, and real coastlines may impose additional filters, including predators, unsuitable seasons, or the absence of compatible soil organisms.\nLECTURER: The second half of the problem concerns evidence and its limits. A flotation trial demonstrates buoyancy, but buoyancy alone does not establish viability. A seed may remain on the surface for months while its embryo loses the ability to germinate. A stronger experiment tests germination after different periods in salt water and compares the result with an unexposed control, although even that design still simplifies the voyage.\nLECTURER: Laboratory tanks are valuable because temperature, salinity, and duration can be repeated. Their weakness is that they simplify coastal turbulence. Real shores subject seeds to breaking waves, abrasion, burial, and repeated sinking and resurfacing. Wave simulators improve realism, but regular mechanical motion still lacks the unpredictable sequence of calm periods and storms.\nLECTURER: Field collections have a different weakness. Researchers often recover only a few stranded seeds, so sampling can bias the apparent success rate. One storm may deposit many seeds on a monitored beach while a nearby shore receives none. Surveys should cover several sites and seasons, though large, recognisable seeds may still be reported more often than damaged specimens.\nLECTURER: Finally, arrival and germination do not equal permanent colonisation. Existing plants may already occupy the available light, nutrients, water, and root space. In other words, competition can eliminate a young plant after every dispersal stage has apparently succeeded. Herbivory, disease, or the absence of pollinators may create further barriers, but competition is often the first ecological explanation tested when seedlings emerge and then disappear.\nLECTURER: Genetic evidence can support ocean drift when island plants are closely related to a plausible source population. Similarity, however, does not reveal the route, date, or number of arrivals. Human transport must also be considered for species linked to settlement, gardens, or traded goods.\nLECTURER: Researchers therefore combine flotation and germination tests, current models, shoreline surveys, ecology, and genetics. No method reconstructs the whole journey. Ocean dispersal becomes plausible when independent evidence agrees and human movement is less convincing.\nLECTURER: In your seminar, separate mechanism from limitation. Explain what permits transport and establishment, then state what each method leaves uncertain. A flotation result is not proof of colonisation, and genetic similarity is not a known route. Rare long-distance events can shape island flora even though most seeds fail.",
      "audioUrl": "/audio/ielts/ielts-listening-set-24.mp3",
      "mediaId": "ielts-set-24-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "fill",
          "id": "l-q31",
          "part": 4,
          "text": "Buoyancy is aided by ______ within the outer tissue.",
          "answers": [
            "air spaces"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q32",
          "part": 4,
          "text": "A ______ slows the entry of sea water.",
          "answers": [
            "waxy coat"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q33",
          "part": 4,
          "text": "Seeds may be transported by ______.",
          "answers": [
            "ocean currents",
            "currents"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q34",
          "part": 4,
          "text": "Storm debris can trap seeds at the ______.",
          "answers": [
            "tide line",
            "tideline"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q35",
          "part": 4,
          "text": "Rain supplies ______ that removes salt.",
          "answers": [
            "fresh water"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q36",
          "part": 4,
          "text": "The emerging root needs ______ for anchorage.",
          "answers": [
            "stable soil"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q37",
          "part": 4,
          "text": "A flotation trial does not establish seed ______.",
          "answers": [
            "viability"
          ]
        },
        {
          "type": "fill",
          "id": "l-q38",
          "part": 4,
          "text": "Laboratory tanks simplify coastal ______.",
          "answers": [
            "turbulence"
          ]
        },
        {
          "type": "fill",
          "id": "l-q39",
          "part": 4,
          "text": "Small field collections may introduce ______ bias.",
          "answers": [
            "sampling"
          ]
        },
        {
          "type": "fill",
          "id": "l-q40",
          "part": 4,
          "text": "After germination, ______ may prevent permanent colonisation.",
          "answers": [
            "competition"
          ]
        }
      ]
    },
    {
      "part": 5,
      "skill": "reading",
      "title": "Academic Reading — Passage 1: The Ground Beneath a Street Tree",
      "passageTitle": "The Ground Beneath a Street Tree",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A A newly planted street tree may appear to occupy an open square of soil, yet most of the space on which its future depends is hidden. Roots need a connected volume containing air, water and mineral nutrients. In a forest, pores are renewed by organisms, fallen material and changing moisture. Beside a road, the same ground is expected to carry pedestrians, parked vehicles and paving. Engineers commonly compact it so that the surface will not sink. This creates a conflict: the density that protects pavement can remove the larger pores through which roots extend and oxygen moves.\n\nB Compaction affects more than the mechanical effort required for a root tip to advance. Closely packed particles slow drainage after heavy rain, but they may also hold too little plant-available water during a dry spell. Gas exchange declines, and roots remain shallow where conditions are less hostile. Shallow roots are then vulnerable to heat and physical disturbance, while a small underground network limits the crown that can be supported. Designers must consequently treat soil volume, continuity and connection to water as parts of one system.\n\nC One response is structural soil. Large angular stones form a load-bearing skeleton, and a measured soil mixture occupies spaces between them. When properly specified, the stones transfer pressure from the pavement while the soil in their voids offers routes for fine roots. The approach can extend a rooting medium beneath areas that must remain firm. However, the usable soil fraction is smaller than the total excavated volume because stone takes up much of that volume. Structural soil is not ordinary topsoil with rubble added; stone size, proportion and installation determine whether it carries loads without closing root passages.\n\nD A different approach uses soil cells: modular frames installed below paving. Their columns and decks support the surface, leaving large compartments of lightly compacted soil inside. Cells can provide more actual soil per cubic metre of excavation than a stone skeleton, and linked units can create a continuous root zone along a street. They require careful engineering around utility lines, inspection points and drainage outlets. They also cost more initially and need sufficient excavation depth. The advantage is not predictable roots, but separating the load-bearing job from the biological job.\n\nE Soil structure is only part of the underground partnership. Many tree roots associate with mycorrhizal fungi. Fine fungal threads called hyphae spread beyond the root surface and explore pores too small for roots themselves. In exchange for carbon produced by the tree, the fungi can help obtain water and mineral nutrients. This relationship is not a universal product for every planting pit. Fungal communities depend on host species, soil chemistry, moisture and disturbance. Suitable fungi may already be present, whereas an introduced strain may fail. The practical lesson is to protect living soil rather than assume that an inoculant will repair a badly designed root environment.\n\nF Water management links the engineered and biological elements. Runoff from a pavement can be directed into the rooting system, reducing demand on drains and helping a tree through dry periods. Yet an inlet without an overflow may leave roots waterlogged, and dirty runoff may carry salt or other contaminants. Air vents, permeable surfaces and inspection access can be useful, but each component must fit the site. A narrow street with frequent excavation for utilities presents different risks from a broad pedestrian plaza. Maintenance crews also need to know where water enters and how blockages can be cleared. A design that performs well at installation can decline if these operational details are treated as someone else's responsibility.\n\nG Comparisons among planting systems are difficult because tree species, climates and monitoring periods vary. Rapid root extension in one trial does not by itself prove better long-term survival, and laboratory measures cannot reproduce every street disturbance. Even so, research supports a consistent principle: roots benefit when load support is achieved without eliminating connected, aerated soil. Structural soil and soil cells solve that problem differently, while fungal partners work within the environment those systems provide. The best choice may combine methods or use neither if adequate open ground already exists. Rather than buying a named technology first, planners should define the required soil volume, water route, pavement load and maintenance access, then select a construction that meets those site conditions. This planning keeps technical and biological priorities clearly visible.",
      "questions": [
        {
          "type": "fill",
          "id": "r-q01",
          "part": 5,
          "text": "Street trees need an underground system, not merely an opening around the trunk. Their roots require a connected 1 ____ containing air, water and mineral nutrients. In one engineered method, large stones create a load-bearing 2 ____, while soil fills spaces among them. Another method uses soil 3 ____: modular frames that support paving separately. Fungi may extend the area explored by roots through fine threads called 4 ____. Water from paved areas can be directed underground, but a design also needs an 5 ____ to prevent saturation. Because trials differ in species and climate, fast 6 ____ alone cannot demonstrate long-term survival. Planners should define the requirements, then select construction that meets site 7 ____.",
          "answers": [
            "volume"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q02",
          "part": 5,
          "text": "Street trees need an underground system, not merely an opening around the trunk. Their roots require a connected 1 ____ containing air, water and mineral nutrients. In one engineered method, large stones create a load-bearing 2 ____, while soil fills spaces among them. Another method uses soil 3 ____: modular frames that support paving separately. Fungi may extend the area explored by roots through fine threads called 4 ____. Water from paved areas can be directed underground, but a design also needs an 5 ____ to prevent saturation. Because trials differ in species and climate, fast 6 ____ alone cannot demonstrate long-term survival. Planners should define the requirements, then select construction that meets site 7 ____.",
          "answers": [
            "skeleton"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q03",
          "part": 5,
          "text": "Street trees need an underground system, not merely an opening around the trunk. Their roots require a connected 1 ____ containing air, water and mineral nutrients. In one engineered method, large stones create a load-bearing 2 ____, while soil fills spaces among them. Another method uses soil 3 ____: modular frames that support paving separately. Fungi may extend the area explored by roots through fine threads called 4 ____. Water from paved areas can be directed underground, but a design also needs an 5 ____ to prevent saturation. Because trials differ in species and climate, fast 6 ____ alone cannot demonstrate long-term survival. Planners should define the requirements, then select construction that meets site 7 ____.",
          "answers": [
            "cells"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q04",
          "part": 5,
          "text": "Street trees need an underground system, not merely an opening around the trunk. Their roots require a connected 1 ____ containing air, water and mineral nutrients. In one engineered method, large stones create a load-bearing 2 ____, while soil fills spaces among them. Another method uses soil 3 ____: modular frames that support paving separately. Fungi may extend the area explored by roots through fine threads called 4 ____. Water from paved areas can be directed underground, but a design also needs an 5 ____ to prevent saturation. Because trials differ in species and climate, fast 6 ____ alone cannot demonstrate long-term survival. Planners should define the requirements, then select construction that meets site 7 ____.",
          "answers": [
            "hyphae"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q05",
          "part": 5,
          "text": "Street trees need an underground system, not merely an opening around the trunk. Their roots require a connected 1 ____ containing air, water and mineral nutrients. In one engineered method, large stones create a load-bearing 2 ____, while soil fills spaces among them. Another method uses soil 3 ____: modular frames that support paving separately. Fungi may extend the area explored by roots through fine threads called 4 ____. Water from paved areas can be directed underground, but a design also needs an 5 ____ to prevent saturation. Because trials differ in species and climate, fast 6 ____ alone cannot demonstrate long-term survival. Planners should define the requirements, then select construction that meets site 7 ____.",
          "answers": [
            "overflow"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q06",
          "part": 5,
          "text": "Street trees need an underground system, not merely an opening around the trunk. Their roots require a connected 1 ____ containing air, water and mineral nutrients. In one engineered method, large stones create a load-bearing 2 ____, while soil fills spaces among them. Another method uses soil 3 ____: modular frames that support paving separately. Fungi may extend the area explored by roots through fine threads called 4 ____. Water from paved areas can be directed underground, but a design also needs an 5 ____ to prevent saturation. Because trials differ in species and climate, fast 6 ____ alone cannot demonstrate long-term survival. Planners should define the requirements, then select construction that meets site 7 ____.",
          "answers": [
            "root extension"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q07",
          "part": 5,
          "text": "Street trees need an underground system, not merely an opening around the trunk. Their roots require a connected 1 ____ containing air, water and mineral nutrients. In one engineered method, large stones create a load-bearing 2 ____, while soil fills spaces among them. Another method uses soil 3 ____: modular frames that support paving separately. Fungi may extend the area explored by roots through fine threads called 4 ____. Water from paved areas can be directed underground, but a design also needs an 5 ____ to prevent saturation. Because trials differ in species and climate, fast 6 ____ alone cannot demonstrate long-term survival. Planners should define the requirements, then select construction that meets site 7 ____.",
          "answers": [
            "conditions"
          ],
          "maxWords": 2
        },
        {
          "type": "mcq",
          "id": "r-q08",
          "part": 5,
          "text": "Its useful soil quantity is less than the excavated volume suggests.",
          "options": [
            "compacted conventional soil",
            "structural soil",
            "soil cells",
            "mycorrhizal fungi"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q09",
          "part": 5,
          "text": "It may already occur naturally at a planting site.",
          "options": [
            "compacted conventional soil",
            "structural soil",
            "soil cells",
            "mycorrhizal fungi"
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q10",
          "part": 5,
          "text": "It can leave roots close to the hottest and most disturbed ground.",
          "options": [
            "compacted conventional soil",
            "structural soil",
            "soil cells",
            "mycorrhizal fungi"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q11",
          "part": 5,
          "text": "It requires routes to be planned around buried services.",
          "options": [
            "compacted conventional soil",
            "structural soil",
            "soil cells",
            "mycorrhizal fungi"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q12",
          "part": 5,
          "text": "Its performance depends on the proportions and installation of stone and soil.",
          "options": [
            "compacted conventional soil",
            "structural soil",
            "soil cells",
            "mycorrhizal fungi"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q13",
          "part": 5,
          "text": "It explores spaces that tree roots cannot enter.",
          "options": [
            "compacted conventional soil",
            "structural soil",
            "soil cells",
            "mycorrhizal fungi"
          ],
          "answer": 3
        }
      ]
    },
    {
      "part": 6,
      "skill": "reading",
      "title": "Academic Reading — Passage 2: From Raised Letters to a Six-Dot Cell",
      "passageTitle": "From Raised Letters to a Six-Dot Cell",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A For readers who use touch, a writing system must solve two related problems. Marks must be distinct enough for a fingertip to recognise, and they must be compact enough to scan without repeatedly moving the hand. Early educators often began with familiar printed letters raised above the page. This made sense to sighted teachers because the shapes already represented literacy to them. For learners, however, a curved or elaborate outline could require slow tracing. The books were large, production was expensive, and the method mainly supported reading. A pupil could identify prepared type but had no equally convenient way to compose a private note or complete an exercise independently.\n\nB In nineteenth-century France, experiments therefore shifted from copying visual shapes to arranging simple raised points. A military code proposed by Charles Barbier used patterns of dots that could be read without light. It demonstrated that touch did not need to imitate ink, but its cells were relatively tall and contained more positions than a finger could grasp at once. Users had to move along a pattern to interpret it. The code had been designed for messages rather than for the grammar, punctuation and varied texts of everyday literacy. Its importance lay less in becoming a finished school system than in showing that a small set of embossed points could carry information.\n\nC Louis Braille encountered such ideas while studying at the Royal Institute for Blind Youth in Paris. Blind after a childhood injury, he understood the classroom problem as a reader and writer rather than only as a designer. By the age of fifteen he had developed an initial tactile system. Its basic unit was a six-dot cell arranged in two columns. Because the whole cell fitted beneath a fingertip, a reader could recognise a configuration without tracing a large outline. Sixty-four possible combinations, including the blank cell, supplied a compact code for letters, punctuation and other signs. Economy of space also meant that lines and pages could carry more information than many raised-letter books.\n\nD The cell addressed writing as well as reading. A slate held paper in position while openings guided a stylus that pressed dots into it. Since the dots were embossed from the reverse side, the writer worked in a direction that initially required practice before turning the sheet over to read. The tools were portable and did not depend on a printing workshop. This changed the learner's role: instead of receiving only books made by others, a student could take notes, answer questions and exchange messages. The physical simplicity of six positions also allowed later mechanical devices to assign one key to each dot, so combinations could be pressed together.\n\nE Adoption was not immediate. Institutions had invested in competing raised systems, teachers differed over methods, and authorities did not automatically accept a code created by a young blind student. Braille continued refining the system and extended it for music and mathematics. He died in 1852 without seeing the full international reach of his work. Over time, practical use by readers and writers supplied an argument that official preference could not easily dismiss. The system spread through schools and libraries, although languages developed their own conventions. Its success was therefore not a single moment of invention followed by instant agreement; it was a process of testing, teaching, adaptation and institutional change.\n\nF The same design principle survived changes in production. A mechanical braillewriter uses six main keys corresponding to the cell's dots. Embossers can produce pages from digital files, while refreshable displays raise and lower pins so that electronic text can be read line by line. These devices alter speed, storage and distribution, but they do not make the tactile code obsolete. A digital document still needs rules that tell a display which dot pattern represents a character or symbol. Nor has technology removed every constraint: embossed volumes occupy substantial space, refreshable equipment can be costly, and transcription must represent layouts, mathematics and music accurately rather than convert ordinary print mechanically.\n\nG The history also warns against measuring an accessible system only by resemblance to the dominant one. Raised print preserved the appearance of letters but imposed a heavy perceptual burden on touch. The dot cell changed the design question from 'How can print be felt?' to 'What can a fingertip distinguish quickly and what can a writer produce directly?' That shift joined finger span, page economy and independent composition in one solution. Modern audio and speech tools offer valuable additional access, yet they serve different purposes from spelling, punctuation and close textual study. The continuing use of braille reflects not resistance to new technology but the value of a code designed around active literacy rather than passive receipt. It endures.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q14",
          "part": 6,
          "text": "Raised-letter books allowed pupils to write exercises using the same method.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q15",
          "part": 6,
          "text": "Barbier's code was originally intended for schoolchildren.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q16",
          "part": 6,
          "text": "The size of Barbier's cells made them difficult to perceive in one touch.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q17",
          "part": 6,
          "text": "Louis Braille had lost his sight before attending the Paris institute.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q18",
          "part": 6,
          "text": "The six-dot cell offered fewer than fifty possible patterns.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q19",
          "part": 6,
          "text": "Education authorities adopted Braille's system immediately.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q20",
          "part": 6,
          "text": "The passage states that one language now uses more braille symbols than all others.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "fill",
          "id": "r-q21",
          "part": 6,
          "text": "What held the paper steady while a stylus was used?",
          "answers": [
            "a slate",
            "slate"
          ],
          "maxWords": 3
        },
        {
          "type": "fill",
          "id": "r-q22",
          "part": 6,
          "text": "What could students make during lessons once they could write for themselves?",
          "answers": [
            "notes"
          ],
          "maxWords": 3
        },
        {
          "type": "fill",
          "id": "r-q23",
          "part": 6,
          "text": "For which two specialised subjects did Braille extend his system?",
          "answers": [
            "music and mathematics",
            "mathematics and music"
          ],
          "maxWords": 3
        },
        {
          "type": "fill",
          "id": "r-q24",
          "part": 6,
          "text": "Which places helped the system spread over time?",
          "answers": [
            "schools and libraries",
            "libraries and schools"
          ],
          "maxWords": 3
        },
        {
          "type": "fill",
          "id": "r-q25",
          "part": 6,
          "text": "What rises and falls in a refreshable display?",
          "answers": [
            "pins"
          ],
          "maxWords": 3
        },
        {
          "type": "fill",
          "id": "r-q26",
          "part": 6,
          "text": "What kind of study does the final paragraph contrast with listening to speech tools?",
          "answers": [
            "close textual study"
          ],
          "maxWords": 3
        }
      ]
    },
    {
      "part": 7,
      "skill": "reading",
      "title": "Academic Reading — Passage 3: A Surface That Cools Under the Sun",
      "passageTitle": "A Surface That Cools Under the Sun",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A A roof under a clear sky participates in two energy exchanges that are easy to confuse. Sunlight arrives mainly at short wavelengths and can heat the surface if absorbed. The warm surface also emits energy at longer, thermal-infrared wavelengths. Ordinary materials may lose some heat by this second route at night, when solar input has disappeared. Achieving cooling in daytime is harder because even modest absorption of intense sunlight can exceed the infrared loss. A successful passive cooling surface must therefore perform two apparently separate optical tasks: reject most incoming solar energy and emit thermal radiation strongly in the wavelengths through which that radiation can escape.\n\nB The escape route is not equally open across the infrared spectrum. Gases in the atmosphere absorb many wavelengths and return part of the energy towards the ground. In a band commonly called the atmospheric window, however, the air is relatively transparent under suitable conditions. Radiation emitted in this band can travel towards the cold upper atmosphere and space. The surface is not producing cold; it is losing energy by radiation faster than it gains energy from its surroundings. This distinction matters because a material described simply as a strong infrared emitter may radiate strongly where the atmosphere is opaque. Its measured total emission can look impressive while the useful outward pathway remains limited.\n\nC Designers use different structures to combine solar reflection with selective or broad thermal emission. A pale top layer may scatter visible and near-infrared sunlight, while particles, pores or molecular vibrations provide emission in the mid-infrared. Beneath it, a metallic reflector can return radiation that would otherwise be absorbed by the building. Some experimental coatings use carefully chosen particle sizes; others use layered films or porous polymers. The relevant result is the spectrum of the complete assembly, not the reputation of one ingredient. A white surface can still absorb a troublesome band of sunlight, and a highly reflective metal can be a poor thermal emitter unless another layer supplies that function.\n\nD Laboratory tests often report solar reflectance and infrared emittance as material properties. Those measurements are necessary, but they do not directly state how much a room will cool. Heat also reaches the surface through warm air, contact with the roof below and moisture. Wind can either remove accumulated heat or bring heat to a surface that has fallen below air temperature. Insulation limits conductive exchange with the interior, so the same coating may produce a large surface-temperature change but a smaller change indoors. Conversely, reducing heat flow through a poorly insulated roof may matter greatly to occupants even if the coating never becomes colder than the surrounding air.\n\nE Weather narrows the theoretical pathway. Water vapour absorbs infrared radiation, so humid air can partly close the atmospheric window. Clouds are stronger emitters than a clear upper sky and can send thermal radiation downward. The angle at which a surface views the sky also matters: nearby walls, trees and roof equipment may replace part of that cold view with warmer objects. A horizontal sample on an open test platform therefore has an advantage that a vertical facade in a dense street may not share. Dust, ageing and rain alter optical properties over time. Performance claims based on a clean new specimen and a few clear days cannot automatically be transferred to every climate or orientation.\n\nF Researchers quantify the balance with a net cooling power. Outgoing thermal radiation is counted as a gain for cooling; absorbed sunlight, downward atmospheric radiation and non-radiative heat transfer count against it. Each term changes with surface temperature and conditions, so a single efficiency percentage can conceal important assumptions. A test conducted at night removes the largest solar term and is useful for studying emission, but it cannot establish daytime performance by itself. Likewise, reporting only a surface temperature without a reference surface makes weather effects difficult to separate. Strong evidence clearly combines spectral measurements, an energy-balance model and outdoor comparisons.\n\nG The path from sample to building adds another scale. Electricity savings depend on how a building is operated. The roof deck and insulation determine how much of the altered surface balance reaches the interior. In an unconditioned structure, the valued outcome may instead be fewer hours above a dangerous indoor temperature. Thus a claim that a film reflects a certain fraction of sunlight is a statement about the material, not yet a statement about energy bills, comfort or public-health benefit.\n\nH This layered reasoning explains both the promise and the caution surrounding radiative cooling. The physical mechanism is real: a surface can send heat through a spectral opening while resisting solar gain. Yet the magnitude of that effect moves through a chain—from optical spectrum, to surface energy balance, to roof construction, to indoor conditions, and finally to human or energy outcomes. A useful diagram should keep these levels distinct. It should show incoming sunlight meeting a reflective layer, thermal emission leaving the surface through the atmospheric window, and conductive exchange moderated by insulation above the roof deck. It should not imply that every emitted ray reaches space or that a cooler coating guarantees an equally large reduction inside.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q27",
          "part": 7,
          "text": "Question 27",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I",
            "Location J"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q28",
          "part": 7,
          "text": "Question 28",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I",
            "Location J"
          ],
          "answer": 6
        },
        {
          "type": "mcq",
          "id": "r-q29",
          "part": 7,
          "text": "Question 29",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I",
            "Location J"
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q30",
          "part": 7,
          "text": "Question 30",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I",
            "Location J"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q31",
          "part": 7,
          "text": "Question 31",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I",
            "Location J"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q32",
          "part": 7,
          "text": "Question 32",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I",
            "Location J"
          ],
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "r-q33",
          "part": 7,
          "text": "Question 33",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I",
            "Location J"
          ],
          "answer": 8
        },
        {
          "type": "fill",
          "id": "r-q34",
          "part": 7,
          "text": "Question 34",
          "answers": [
            "sunlight"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q35",
          "part": 7,
          "text": "Question 35",
          "answers": [
            "top layer"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q36",
          "part": 7,
          "text": "Question 36",
          "answers": [
            "metallic reflector"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q37",
          "part": 7,
          "text": "Question 37",
          "answers": [
            "thermal emission",
            "thermal radiation"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q38",
          "part": 7,
          "text": "Question 38",
          "answers": [
            "atmospheric window"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q39",
          "part": 7,
          "text": "Question 39",
          "answers": [
            "insulation"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q40",
          "part": 7,
          "text": "Question 40",
          "answers": [
            "roof deck"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 8,
      "skill": "writing",
      "title": "Academic Writing",
      "instructions": "You should spend about 60 minutes on both tasks. Task 2 contributes twice as much as Task 1 to the Writing score.",
      "questions": [
        {
          "type": "write",
          "id": "w-task-1",
          "part": 8,
          "taskNumber": 1,
          "stimulus": "The diagram below shows how used wool insulation is remanufactured into new panels.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          "text": "The diagram below shows how used wool insulation is remanufactured into new panels.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          "minWords": 150,
          "imageUrl": "/assets/ielts/charts/set24-task1.svg",
          "imageAlt": "A ten-stage process turns used wool insulation into new panels. Contaminants leave after manual sorting, while panels that fail quality control return to carding; panels that pass are dispatched."
        },
        {
          "type": "write",
          "id": "w-task-2",
          "part": 8,
          "taskNumber": 2,
          "stimulus": "Some people think that schools should shorten the long summer holiday and distribute the same total amount of holiday time more evenly throughout the school year. Others believe that a long summer holiday should be kept.\n\nDiscuss both views and give your own opinion.\n\nAssume that the total amount of compulsory teaching time over the year remains unchanged.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
          "text": "Some people think that schools should shorten the long summer holiday and distribute the same total amount of holiday time more evenly throughout the school year. Others believe that a long summer holiday should be kept.\n\nDiscuss both views and give your own opinion.\n\nAssume that the total amount of compulsory teaching time over the year remains unchanged.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
          "minWords": 250
        }
      ]
    },
    {
      "part": 9,
      "skill": "speaking",
      "title": "Speaking",
      "instructions": "Complete Parts 1, 2 and 3 in order. Part 2 includes one minute of preparation and a one-to-two-minute long turn.",
      "questions": [
        {
          "type": "speak",
          "id": "s-part-1",
          "part": 9,
          "partNumber": 1,
          "text": "When do you usually write things by hand?\nHow easy is it for other people to read your handwriting?\nDo you prefer writing by hand or typing on a keyboard? Why?\nHas the amount you write by hand changed in recent years?\nWhen do you usually check the weather forecast?\nWhere do you prefer to get weather forecasts?\nHow accurate do weather forecasts usually seem where you live?\nHave you ever changed your plans because of a weather forecast?\nWhat kind of footwear do you wear most often?\nWhen choosing footwear, is comfort more important to you than appearance?\nHow do you usually decide when to buy new footwear?\nDo you wear different kinds of footwear for different occasions?"
        },
        {
          "type": "speak",
          "id": "s-part-2",
          "part": 9,
          "partNumber": 2,
          "text": "Describe a traditional craft that an older person taught you or showed you.",
          "cueCard": "Describe a traditional craft that an older person taught you or showed you.\nYou should say:\n• what the craft was and who the person was\n• how the person demonstrated the craft\n• what you tried to do or learned\nand explain why you think this knowledge was worth preserving.",
          "followUp": [
            "Would you like to practise this craft again in the future?",
            "Is it easy for younger people to learn this craft where you live?"
          ]
        },
        {
          "type": "speak",
          "id": "s-part-3",
          "part": 9,
          "partNumber": 3,
          "text": "Why can watching an experienced person be more useful than reading instructions when learning a craft?\nHow well can videos and digital records preserve skills that are usually passed from person to person?\nHow do pay and social status affect whether people choose craft work as a career?\nShould schools teach traditional crafts, or are apprenticeships a better way to learn them?\nWhen a traditional craft is changed for modern markets, what might be gained or lost?\nWhich traditional crafts are most likely to survive in the future, and why?"
        }
      ]
    }
  ]
};

export default mock;
