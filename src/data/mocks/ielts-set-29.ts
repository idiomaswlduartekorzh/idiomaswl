import type { MockExam } from '@/data/mocks/types';

const mock: MockExam = {
  "id": "set-29",
  "examSlug": "ielts",
  "title": "IELTS Academic Set 29",
  "subtitle": "Why Old Walls Need a Patient Mortar · Can a Museum Keep a Smell? · Citizens’ Juries and the Hard Choices of Infrastructure",
  "timeMinutes": 164,
  "sections": [
    {
      "part": 1,
      "skill": "listening",
      "title": "Listening — Part 1: Everyday social dialogue: booking a household tap-water sample drop-off in Cardiff",
      "instructions": "1-6: Complete the laboratory booking form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.\n7-10: Choose the correct letter, A, B or C.",
      "transcript": "Caspian Dacre: Good morning, Taff Vale Water Analytics. Caspian speaking. How can I help?\nAnwen Pryce: Hello. I want to have the tap water in my flat checked. I collected a sample yesterday, but I think I used the wrong jar.\nCaspian Dacre: For a booked test, the container we supply is a sterile bottle, not a household jar. You can collect it here without charge before sampling.\nAnwen Pryce: That is helpful. Could we make the booking now? My address is Flat Six, Celyn Court. That is Celyn, C E L Y N, on Penarth Road.\nCaspian Dacre: I have Celyn Court. Which outlet are you concerned about: the bathroom basin or the kitchen tap?\nAnwen Pryce: The bathroom sometimes tastes metallic, but it is rarely used. I will take the official sample from the kitchen tap because we use that cold-water outlet every day.\nCaspian Dacre: Good. The booking form needs an approximate collection time. You mentioned seven in your email, but can you be more precise?\nAnwen Pryce: I leave for work just before seven. I can collect it at six forty-five, then bring it straight to you. Please record 6:45, not seven.\nCaspian Dacre: Keep the sealed bottle cool during the journey, but do not freeze it. A small insulated bag is fine; loose ice must not touch the cap.\nAnwen Pryce: Understood: keep it cool. I can deliver it in the morning. Could the report go through the online results portal rather than by post?\nCaspian Dacre: Yes. Select results portal on the form. We will email when the report is ready.\nAnwen Pryce: I also need to choose a day. Sunday would be convenient, though reception may not be open.\nCaspian Dacre: Correct. We are closed on Sunday, and holding the bottle until Monday would make the recorded conditions less useful. Wednesday morning is available.\nAnwen Pryce: Wednesday works. Should I take the first water that comes from the tap? I have heard people call that a first-draw sample.\nCaspian Dacre: Not for the package you are choosing. Run the cold tap for two minutes first. The test is intended to describe the supplied water after flushing, not water that stood overnight.\nAnwen Pryce: All right. I will not collect the first draw. Are there several testing packages?\nCaspian Dacre: Three. The basic screen checks mineral balance only. The metals panel adds lead, copper and several related elements. The full household package also includes microbiology.\nAnwen Pryce: The flat has old internal pipes, so the metals panel sounds most relevant. I considered the full package, but nobody has been ill and I do not need that broader service.\nCaspian Dacre: The standard metals panel is eighty-two pounds. Results take five working days. A faster two-day service exists, but it costs substantially more.\nAnwen Pryce: Five working days is fine. Is payment due when I collect the bottle, or when I bring the sample back?\nCaspian Dacre: When you bring the sample. We can take a card at reception, so there is no need to pay online in advance.\nAnwen Pryce: Before I go, let me check: Celyn Court, kitchen tap, 6:45 on Wednesday, sterile bottle kept cool, and the standard metals panel with portal delivery.\nCaspian Dacre: Label it after filling, keep the cap clean, and arrive by ten. If plans change, call us before you collect the sample. Reception labels every arrival by booking number, preserving the sample custody record.\nAnwen Pryce: Perfect. I will collect the bottle and bring the sample on Wednesday morning. Thank you for explaining the difference between the packages.",
      "audioUrl": "/audio/ielts/ielts-listening-set-29.mp3",
      "mediaId": "ielts-set-29-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "fill",
          "id": "l-q01",
          "part": 1,
          "text": "Container: ______",
          "answers": [
            "sterile bottle"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q02",
          "part": 1,
          "text": "Address: Flat 6, ______",
          "answers": [
            "Celyn Court"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q03",
          "part": 1,
          "text": "Sample outlet: ______",
          "answers": [
            "kitchen tap"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q04",
          "part": 1,
          "text": "Collection time: ______",
          "answers": [
            "6:45",
            "6.45",
            "six forty-five"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q05",
          "part": 1,
          "text": "During transport: keep the bottle ______",
          "answers": [
            "cool"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q06",
          "part": 1,
          "text": "Report delivery: results ______",
          "answers": [
            "portal"
          ],
          "maxWords": 2
        },
        {
          "type": "mcq",
          "id": "l-q07",
          "part": 1,
          "text": "Why does Anwen decide not to collect the sample on Sunday?",
          "options": [
            "The sterile bottles cannot be collected then.",
            "The sample would have to be stored too long.",
            "Sunday testing has an additional fee."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q08",
          "part": 1,
          "text": "Why should Anwen run the tap before filling the bottle?",
          "options": [
            "To wash the outside of the bottle.",
            "To sample supplied water after flushing.",
            "To reach a warmer water temperature."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q09",
          "part": 1,
          "text": "Which testing package does Anwen choose?",
          "options": [
            "the metals panel",
            "the basic mineral screen",
            "the full household package"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q10",
          "part": 1,
          "text": "What does Caspian say about the faster service?",
          "options": [
            "It takes five working days.",
            "It is available only for the full package.",
            "It costs substantially more."
          ],
          "answer": 2
        }
      ]
    },
    {
      "part": 2,
      "skill": "listening",
      "title": "Listening — Part 2: Everyday social monologue: winter orientation at a fictional Canberra arboretum",
      "instructions": "11-16: Label the map. Choose the correct letter, A-H.\n17-20: Choose the correct feature, A-F, for each sector.",
      "transcript": "Keira Mallon: Welcome to the Wattle Ridge Arboretum winter walk. I am Keira Mallon, one of the visitor guides. Please look at the simplified map while I explain today’s route.\nKeira Mallon: North is at the top. You are at the main gate on the southern edge, beside the visitor centre. The blue line marks the step-free winter loop.\nKeira Mallon: The path immediately east of the visitor centre goes beside the central lawn. Ignore the narrow track that cuts across the lawn; it is not surfaced for wheelchairs.\nKeira Mallon: For the conifer walk, follow the winter loop north from the main gate and keep left at the first fork. Pass the lower western bend and continue to the upper bend immediately south of the triangular Young Eucalypts plot.\nKeira Mallon: That triangle contains young eucalypts, not conifers. The mature evergreens begin just below it on the upper curve; the lower curve west of the lawn is an open bed.\nKeira Mallon: Visitors who need a warm break should return to the fork and take the short eastern spur. The warming shelter is the square building immediately south of Lookout Road.\nKeira Mallon: The building on the opposite side of Lookout Road is a tool store. It has a veranda, but it is not open to visitors and has no heating.\nKeira Mallon: The accessible viewing deck is farther east. Pass the rectangular bed beside the central lawn, then take the map’s only short blue dead-end spur towards North Creek. The broad platform at the spur’s end is the deck.\nKeira Mallon: That spur stops immediately south of the creek. Do not use the nearer point beside the lawn or the separate hill steps, which may be icy.\nKeira Mallon: A storm damaged the timber bridge north of the creek. It appears on the map between the platform and the research plots, but barriers close both approaches today.\nKeira Mallon: You can still reach the research plots by staying on the southern bank and following the loop west. Please do not move any of the small numbered markers.\nKeira Mallon: The glasshouse is the oval building at the western end of Lookout Road, just north of the conifer curve. Its public entrance faces east, towards the road.\nKeira Mallon: The long rectangle nearer the main gate is the maintenance shed, not the glasshouse. Vehicles may use its driveway, so walkers should remain on the blue route.\nKeira Mallon: At the end of your visit, the shuttle bus will collect passengers from the bay directly east of the main gate. The ordinary public bus stop is outside the map.\nKeira Mallon: Now I will suggest what to notice in four sectors. In the Alpine sector, low conifers form sheltered shapes that remain easy to examine even when the exposed beds are frosty.\nKeira Mallon: In the Eucalypt sector, winter light makes differences in bark colour particularly clear. Flowers are scarce there in July, despite what an old leaflet suggests.\nKeira Mallon: The Rainforest sector has an indoor interpretation display beside the humid house. Its labels explain leaf structure; the outdoor sound installation is switched off this season.\nKeira Mallon: At the Research plots, staff have left numbered tags beside the winter measurements. You may read them from the path, but they are working labels rather than a public exhibition.\nKeira Mallon: The lake sector is attractive, but it is not included in the guided winter route. Its boardwalk is open only as far as the first bench.\nKeira Mallon: To recap the route, use the surfaced loop for every named destination. The lawn shortcut, hill steps, damaged bridge and maintenance driveway are not part of the accessible circuit.\nKeira Mallon: Staff in green jackets can help with directions. They will not unlock closed paths, even if a group has used that route on a previous summer visit.\nKeira Mallon: Please allow about ninety minutes, return borrowed magnifiers at the visitor centre, and wait at the marked shuttle bay if you booked accessible transport. The final shuttle leaves at four.",
      "audioUrl": "/audio/ielts/ielts-listening-set-29.mp3",
      "mediaId": "ielts-set-29-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "mcq",
          "id": "l-q11",
          "part": 2,
          "text": "Where is the conifer walk?",
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
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q12",
          "part": 2,
          "text": "Where is the warming shelter?",
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
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q13",
          "part": 2,
          "text": "Where is the accessible viewing deck?",
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
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q14",
          "part": 2,
          "text": "Where is the storm-damaged bridge?",
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
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q15",
          "part": 2,
          "text": "Where is the glasshouse?",
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
          "answer": 4,
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q16",
          "part": 2,
          "text": "Where is the shuttle bus bay?",
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
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q17",
          "part": 2,
          "text": "Which feature is highlighted in the Alpine sector?",
          "options": [
            "an indoor display about leaf structure",
            "sheltered forms of low conifers",
            "numbered working labels",
            "contrasts in bark colour",
            "a seasonal flower collection",
            "a sound installation"
          ],
          "answer": 1,
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q18",
          "part": 2,
          "text": "Which feature is highlighted in the Eucalypt sector?",
          "options": [
            "an indoor display about leaf structure",
            "sheltered forms of low conifers",
            "numbered working labels",
            "contrasts in bark colour",
            "a seasonal flower collection",
            "a sound installation"
          ],
          "answer": 3,
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q19",
          "part": 2,
          "text": "Which feature is highlighted in the Rainforest sector?",
          "options": [
            "an indoor display about leaf structure",
            "sheltered forms of low conifers",
            "numbered working labels",
            "contrasts in bark colour",
            "a seasonal flower collection",
            "a sound installation"
          ],
          "answer": 0,
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        },
        {
          "type": "mcq",
          "id": "l-q20",
          "part": 2,
          "text": "Which feature is highlighted in the Research plots?",
          "options": [
            "an indoor display about leaf structure",
            "sheltered forms of low conifers",
            "numbered working labels",
            "contrasts in bark colour",
            "a seasonal flower collection",
            "a sound installation"
          ],
          "answer": 2,
          "imageUrl": "/assets/ielts/listening/set29-part2-map.svg",
          "imageAlt": "High-contrast schematic arboretum map with north at the top, Main Gate and Visitor Centre at the south, Central Lawn, Lookout Road, North Creek, a step-free Winter Loop, a triangular Young Eucalypts plot, a single short blue dead-end spur on the far east and eight candidate locations A to H. H alone is at the spur’s end; G remains on the main loop beside the lawn."
        }
      ]
    },
    {
      "part": 3,
      "skill": "listening",
      "title": "Listening — Part 3: Educational discussion: architecture students revise a classroom daylight-monitoring study in Leeds",
      "instructions": "21-25: Choose the correct letter, A, B or C.\n26-30: Choose the correct revision, A-G, for each problem.",
      "transcript": "Talia Northcott: The pilot readings looked impressive until I placed the two lux meters side by side. One was consistently about twelve percent higher than the other.\nJago Maberly: So the apparent difference between classrooms may partly be an instrument difference. We need one reference check before the main study, not merely fresh batteries.\nTalia Northcott: Agreed. The calibration card gives us a stable reference condition. We can record each meter’s offset and use the same device in the same room afterwards.\nJago Maberly: The clocks caused another problem. My meter logged at ten-minute intervals, but its internal clock was four minutes behind yours.\nTalia Northcott: That is the most serious flaw in the pilot because we compared readings as if they were simultaneous. We should synchronise both clocks before every session.\nJago Maberly: I originally thought the changing cloud cover was the main fault. It mattered, but unsynchronised readings made even a stable period difficult to compare.\nTalia Northcott: Desk position was inconsistent too. A seminar group moved three tables closer to the windows, so our second-day points were not at the marked distances.\nJago Maberly: Let us put removable floor markers under the tripod positions. A floor plan alone will not stop furniture being moved between visits.\nTalia Northcott: What did you think of the occupancy sheet? We asked the lecturer for numbers after class, but estimates such as about twenty were too vague.\nJago Maberly: And several students arrived while we were taking readings. I suggest a simple door count at each measurement, then a brief occupancy log with arrival changes.\nTalia Northcott: That would separate the effect of people blocking light from a change in daylight itself. Names are unnecessary; we only need counts.\nJago Maberly: The blinds were worse. In Room A they were half lowered, while in Room B one was tilted and another fully open. We just wrote blinds adjusted.\nTalia Northcott: A photograph from the doorway plus a simple position code would make that condition repeatable. We should never adjust a blind without recording it.\nJago Maberly: For the room sample, I wanted the largest lecture theatre and the smallest studio to maximise contrast.\nTalia Northcott: That creates too many confounds. Two rooms of similar size and orientation, but with different shading devices, would give a cleaner comparison.\nJago Maberly: Yes, similar rooms is the stronger choice. We can describe the theatre separately as an exploratory observation, not part of the paired dataset.\nTalia Northcott: How often should we sample? Continuous logging sounds ideal, yet we have only two borrowed meters and the course requires observations across three days.\nJago Maberly: Let us take paired readings at fixed morning, midday and afternoon times, with a documented contingency if cloud changes sharply during a pair.\nTalia Northcott: We should define each window narrowly enough for comparison but allow time to move the equipment. Twenty minutes per window seems practical for two nearby rooms.\nJago Maberly: I will add a sky-condition box with simple categories and a comments line. The category supports comparison, while the note can record an unusually fast transition.\nTalia Northcott: We also need a short observer guide. It should specify desk height, horizontal sensor position and when to pause because someone is standing directly over the meter.\nJago Maberly: That will reduce differences between observers. We can test the guide by swapping rooms and checking whether our recorded positions and conditions still agree. A short rehearsal should also show whether both observers interpret the categories in the same way. If their records differ, we can revise the guide before collecting the main dataset and avoid carrying disagreement forward.\nTalia Northcott: That gives consistent windows and a rule for unstable weather. Random times would broaden coverage, but comparisons between rooms would become weaker.\nJago Maberly: All right. Suppose we ran the field session again. Where would you begin, given that the two meters did not agree?\nTalia Northcott: I would check both instruments against the same reference before taking any classroom readings. That should show whether one meter needs recalibration.\nJago Maberly: For tables that have moved, removable floor markers will restore the tripod positions. The floor plan remains useful, but it was not enough by itself.\nTalia Northcott: When occupancy changes during a reading, we will count users at that measurement and note arrivals. We need totals, never names.\nJago Maberly: For inconsistent blind positions, we will photograph the setting and assign it a simple code. That is clearer than writing adjusted.\nTalia Northcott: Finally, if cloud cover changes rapidly, we will repeat the paired readings. We can trial the revised sheet tomorrow before the three-day study begins.",
      "audioUrl": "/audio/ielts/ielts-listening-set-29.mp3",
      "mediaId": "ielts-set-29-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "mcq",
          "id": "l-q21",
          "part": 3,
          "text": "What do the students identify as the most serious flaw in the pilot study?",
          "options": [
            "The rooms were measured on different days.",
            "The meters recorded at different times.",
            "The batteries were not equally new."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q22",
          "part": 3,
          "text": "What was wrong with the original occupancy record?",
          "options": [
            "It included students’ names.",
            "It was completed before each class.",
            "It did not track changes during measurement."
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q23",
          "part": 3,
          "text": "What do they decide to do about blind positions?",
          "options": [
            "record them with photographs and codes",
            "leave every blind fully open",
            "ask the lecturer to adjust them"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q24",
          "part": 3,
          "text": "Which rooms will form the main comparison?",
          "options": [
            "the largest and smallest rooms",
            "two similar rooms with different shading",
            "two rooms with identical windows"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q25",
          "part": 3,
          "text": "Which sampling schedule do they choose?",
          "options": [
            "continuous logging in one room",
            "readings at random times each day",
            "fixed paired times with repeats if needed"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q26",
          "part": 3,
          "text": "Which revision addresses this problem: the meters give different values?",
          "options": [
            "repeat the paired readings",
            "check both instruments against a reference",
            "count users at each measurement",
            "replace both sensor batteries",
            "photograph and code the setting",
            "mark the tripod positions on the floor",
            "exclude the room from the study"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q27",
          "part": 3,
          "text": "Which revision addresses this problem: tables have been moved?",
          "options": [
            "repeat the paired readings",
            "check both instruments against a reference",
            "count users at each measurement",
            "replace both sensor batteries",
            "photograph and code the setting",
            "mark the tripod positions on the floor",
            "exclude the room from the study"
          ],
          "answer": 5
        },
        {
          "type": "mcq",
          "id": "l-q28",
          "part": 3,
          "text": "Which revision addresses this problem: occupancy changes during a reading?",
          "options": [
            "repeat the paired readings",
            "check both instruments against a reference",
            "count users at each measurement",
            "replace both sensor batteries",
            "photograph and code the setting",
            "mark the tripod positions on the floor",
            "exclude the room from the study"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q29",
          "part": 3,
          "text": "Which revision addresses this problem: blind positions are inconsistent?",
          "options": [
            "repeat the paired readings",
            "check both instruments against a reference",
            "count users at each measurement",
            "replace both sensor batteries",
            "photograph and code the setting",
            "mark the tripod positions on the floor",
            "exclude the room from the study"
          ],
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "l-q30",
          "part": 3,
          "text": "Which revision addresses this problem: cloud cover changes rapidly?",
          "options": [
            "repeat the paired readings",
            "check both instruments against a reference",
            "count users at each measurement",
            "replace both sensor batteries",
            "photograph and code the setting",
            "mark the tripod positions on the floor",
            "exclude the room from the study"
          ],
          "answer": 0
        }
      ]
    },
    {
      "part": 4,
      "skill": "listening",
      "title": "Listening — Part 4: Academic monologue: annual lake-sediment layers and chronology in an Edmonton earth-science lecture",
      "instructions": "31-36: Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.\n37-40: Answer the questions. Write NO MORE THAN TWO WORDS for each answer.",
      "transcript": "Lecturer: Today we will examine varves, the repeating sediment layers that can preserve an annual rhythm in some lakes. The crucial phrase is in some lakes, not every lake.\nLecturer: A common pair forms because seasonal processes deliver different material. During spring snowmelt, streams may carry pale silt into the basin in a relatively energetic pulse.\nLecturer: Later, calmer summer conditions can allow darker organic material to settle. Together, the contrasting light and dark layers may represent one year.\nLecturer: That description is a model, not a universal colour rule. Mineral composition, productivity and oxygen conditions vary, so researchers first establish how layers form at the particular lake. They observe modern deposition and test whether the proposed seasonal contrast is repeated consistently.\nLecturer: Sampling must protect the sequence. A gravity corer can recover deeper sediment efficiently, but its entry may disturb the very soft material at the sediment-water boundary.\nLecturer: Where the recent surface is essential, researchers may use a freeze corer. Frozen sediment adheres to the sampling face and can preserve delicate upper layers more clearly.\nLecturer: No device is perfect. Retrieval can compress a core, smear its edge or leave a gap. Field notes therefore record resistance, recovery length and any visible damage.\nLecturer: Back in the laboratory, the core is split, photographed and described. Investigators may count layer pairs under a microscope where boundaries are too fine for the unaided eye. High-resolution images let analysts revisit the same boundary and document why a doubtful line was included or rejected.\nLecturer: Counting begins from a known surface and moves downward. Two analysts often count independently, compare disagreements and return to ambiguous sections rather than averaging them blindly.\nLecturer: A marker horizon provides an external checkpoint. A distinctive volcanic ash layer, for example, may be linked to a dated eruption if its identity is independently established.\nLecturer: A second external checkpoint may come from an independent dating method applied over a suitable interval. Agreement increases confidence; disagreement prompts scientists to inspect missing, duplicated or disturbed layers.\nLecturer: One major disturbance is bioturbation, the mixing of sediment by organisms. Burrowing can blur boundaries, redistribute particles and make an apparently smooth band span more than one season.\nLecturer: Physical events also interrupt the pattern. A flood or slope failure may deposit a thick event bed in hours. Counting that bed as an ordinary annual pair would create an error.\nLecturer: At other points, a weak seasonal layer may be absent or too thin to recognise. The chronology must therefore include uncertainty, not just a neat list of integers. Researchers may publish minimum and maximum counts for an ambiguous interval and explain which interpretation they prefer.\nLecturer: Once a chronology is defensible, properties within layers become environmental indicators. Grain size may reflect transport energy, while biological remains can indicate ecological conditions.\nLecturer: Chemical or optical scanning produces dense measurements along a core, but an instrument signal is a proxy. It requires calibration against sampled material and cannot interpret itself. A bright band may correlate with one material at one site yet require a different explanation elsewhere.\nLecturer: At this stage, the chronology itself needs a test independent of visual counting. Radiometric dating can check an interval against physical decay, so agreement supports the count without simply repeating the analyst’s judgement.\nLecturer: That comparison is meaningful only if sampling has preserved the sequence. Retrieval may stretch, smear or shorten a core, and the recovery notes must distinguish those effects before depths are converted into time.\nLecturer: Core compression is particularly important because it shortens the recovered sequence and changes apparent layer thickness. Smearing mainly obscures boundaries, while a gap removes material altogether; none should be treated as an ordinary annual transition.\nLecturer: Once the depth scale is secure, grain size, biological remains and chemical signals can be interpreted as environmental proxies. Each proxy still requires local calibration; the same bright band can arise from different materials in different basins.\nLecturer: A record from one basin may reflect a local flood, catchment change or sampling disturbance. Researchers therefore look beyond a single core before describing an event as regional.\nLecturer: The stronger spatial test is comparison across multiple lakes. If separately dated records show the same transition, a broader process becomes more plausible, although agreement alone does not explain the mechanism.\nLecturer: Resolution also sets a limit. Annual layers may support year-scale counting, whereas a chemical measurement taken every few millimetres can combine adjacent seasons and should not be described as if it were monthly.\nLecturer: Most importantly, varves establish timing and association more readily than exact causes. A causal claim needs independent environmental evidence, a plausible mechanism and an account of alternatives that the observations do not rule out.\nLecturer: The method is strongest as a chain: seasonal formation, careful recovery, reproducible counting, external checks and cautious comparison. A precise-looking chronology is credible only when uncertainty is retained at each stage and conclusions remain proportional to the archive.",
      "audioUrl": "/audio/ielts/ielts-listening-set-29.mp3",
      "mediaId": "ielts-set-29-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "fill",
          "id": "l-q31",
          "part": 4,
          "text": "Spring inflow may deposit pale ______.",
          "answers": [
            "silt"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q32",
          "part": 4,
          "text": "A darker summer layer may contain ______.",
          "answers": [
            "organic material"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q33",
          "part": 4,
          "text": "A ______ can preserve delicate surface layers.",
          "answers": [
            "freeze corer"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q34",
          "part": 4,
          "text": "Fine layer pairs may be counted using a ______.",
          "answers": [
            "microscope"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q35",
          "part": 4,
          "text": "One possible marker horizon is ______.",
          "answers": [
            "volcanic ash",
            "ash"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q36",
          "part": 4,
          "text": "Mixing by organisms is called ______.",
          "answers": [
            "bioturbation"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q37",
          "part": 4,
          "text": "Which independent method can check a varve chronology?",
          "answers": [
            "radiometric dating"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q38",
          "part": 4,
          "text": "What type of retrieval damage can shorten the recovered sequence?",
          "answers": [
            "core compression",
            "compression"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q39",
          "part": 4,
          "text": "What should researchers compare to separate local and regional patterns?",
          "answers": [
            "multiple lakes"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q40",
          "part": 4,
          "text": "What can varves alone not identify?",
          "answers": [
            "exact causes"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 5,
      "skill": "reading",
      "title": "Academic Reading — Passage 1: Why Old Walls Need a Patient Mortar",
      "passageTitle": "Why Old Walls Need a Patient Mortar",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A When the joints of an old stone wall begin to crumble, replacing them can look like a straightforward filling job. Yet traditional masonry was assembled as a system in which units, mortar and moisture interacted. A very hard modern repair may appear tidy while changing where stresses and water travel. Conservation work therefore begins by asking how the wall was intended to behave, not merely which binder reaches the highest laboratory strength. Lime mortar is often selected because its comparatively accommodating character can suit older, porous materials. That choice is not automatic: exposure, stone type, previous repairs and workmanship still have to be examined.\n\nB Lime begins with limestone heated so that carbon dioxide is driven off, leaving quicklime. Adding water to quicklime, a reaction known as slaking, releases heat and produces hydrated lime. When sufficient water is used and the material is allowed to mature, the workable binder is commonly called lime putty. Sand is then combined with the binder to provide body, control shrinkage and create a pore structure. The proportions and grading must be appropriate to the job; a recipe copied from a different building or climate is not evidence of compatibility. Preparation establishes possibilities, but curing determines whether those possibilities are realised.\n\nC A freshly placed lime mortar does not become sound simply by drying as rapidly as possible. It needs moisture while its particles settle and early reactions proceed, so the surface is protected from strong sun, drying wind and frost. The aim is damp rather than saturated conditions: excessive water can wash out binder, whereas severe drying can interrupt development and cause powdering. Carbonation occurs as carbon dioxide from the air dissolves in moisture and reacts with hydrated lime, gradually forming calcium carbonate. The gas reaches the interior through open pores, which is one reason an excessively dense mix or sealed surface can cure unevenly.\n\nD The pore network continues to matter after curing. Rain can enter a wall through exposed surfaces and small defects, but moisture also has to leave. Within the wall, liquid travels towards an evaporation surface; after evaporation, connected pores permit water vapour to pass outwards. If an impermeable repair blocks that route, moisture may be displaced into the adjacent brick or stone. Salts can then crystallise there, and freezing may intensify damage. Calling lime “breathable” is convenient shorthand, but it should not be treated as magic: detailing, roof drainage, ground moisture and the condition of the masonry remain part of the explanation.\n\nE Mechanical compatibility is equally important. Many traditional walls contain units softer than modern engineering brick and were built to tolerate small seasonal movements. A repair with very high compressive strength can concentrate strain at the edge of a stone rather than within the joint. Conservators often prefer the mortar to act as the sacrificial joint: it should weather first and be replaceable before valuable masonry is lost. This does not mean weak or poorly made mortar is desirable. It means performance is judged relative to the surrounding fabric, expected exposure and the joint's intended role, rather than by strength alone.\n\nF Good repointing consequently starts with diagnosis and careful removal. A worker records the existing joint profile, identifies areas that are genuinely loose and avoids cutting sound arrises with aggressive tools. Failed material is removed to a depth that allows the new mortar to bond, while dust is cleared and very dry masonry is lightly pre-dampened. Mortar is compacted in layers instead of being smeared as a thin surface ribbon. The finished joint is then tended during early curing. These operations are slower than cosmetic covering, but they connect the repair to sound material and reduce abrupt changes in moisture behaviour.\n\nG Lime repair is therefore a process rather than a branded product. The binder, aggregate, joint geometry, weather and aftercare must be considered together. Test panels can reveal differences in colour, texture and workability before a whole elevation is altered. Records of the mix and curing conditions help later teams understand what was done, especially because a wall may respond across seasons rather than days. Where cement-rich pointing has already trapped moisture, selective replacement may be sensible, but wholesale removal can also damage the masonry. The most defensible intervention is proportionate, observable and open to maintenance instead of promising a permanent cure. That distinction remains important in any careful practical interpretation.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q01",
          "part": 5,
          "text": "Paragraph A",
          "options": [
            "The stages that produce a workable lime binder",
            "Practical steps that make replacement durable",
            "Allowing the joint to fail before the masonry",
            "Looking beyond the apparent simplicity of repair",
            "A cautious strategy rather than a universal cure",
            "Routes by which a wall releases moisture",
            "Environmental control while a new joint develops",
            "Why the strongest available mixture is always preferred",
            "Decorative uses of coloured aggregate",
            "The case for sealing every exposed surface"
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q02",
          "part": 5,
          "text": "Paragraph B",
          "options": [
            "The stages that produce a workable lime binder",
            "Practical steps that make replacement durable",
            "Allowing the joint to fail before the masonry",
            "Looking beyond the apparent simplicity of repair",
            "A cautious strategy rather than a universal cure",
            "Routes by which a wall releases moisture",
            "Environmental control while a new joint develops",
            "Why the strongest available mixture is always preferred",
            "Decorative uses of coloured aggregate",
            "The case for sealing every exposed surface"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q03",
          "part": 5,
          "text": "Paragraph C",
          "options": [
            "The stages that produce a workable lime binder",
            "Practical steps that make replacement durable",
            "Allowing the joint to fail before the masonry",
            "Looking beyond the apparent simplicity of repair",
            "A cautious strategy rather than a universal cure",
            "Routes by which a wall releases moisture",
            "Environmental control while a new joint develops",
            "Why the strongest available mixture is always preferred",
            "Decorative uses of coloured aggregate",
            "The case for sealing every exposed surface"
          ],
          "answer": 6
        },
        {
          "type": "mcq",
          "id": "r-q04",
          "part": 5,
          "text": "Paragraph D",
          "options": [
            "The stages that produce a workable lime binder",
            "Practical steps that make replacement durable",
            "Allowing the joint to fail before the masonry",
            "Looking beyond the apparent simplicity of repair",
            "A cautious strategy rather than a universal cure",
            "Routes by which a wall releases moisture",
            "Environmental control while a new joint develops",
            "Why the strongest available mixture is always preferred",
            "Decorative uses of coloured aggregate",
            "The case for sealing every exposed surface"
          ],
          "answer": 5
        },
        {
          "type": "mcq",
          "id": "r-q05",
          "part": 5,
          "text": "Paragraph E",
          "options": [
            "The stages that produce a workable lime binder",
            "Practical steps that make replacement durable",
            "Allowing the joint to fail before the masonry",
            "Looking beyond the apparent simplicity of repair",
            "A cautious strategy rather than a universal cure",
            "Routes by which a wall releases moisture",
            "Environmental control while a new joint develops",
            "Why the strongest available mixture is always preferred",
            "Decorative uses of coloured aggregate",
            "The case for sealing every exposed surface"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q06",
          "part": 5,
          "text": "Paragraph F",
          "options": [
            "The stages that produce a workable lime binder",
            "Practical steps that make replacement durable",
            "Allowing the joint to fail before the masonry",
            "Looking beyond the apparent simplicity of repair",
            "A cautious strategy rather than a universal cure",
            "Routes by which a wall releases moisture",
            "Environmental control while a new joint develops",
            "Why the strongest available mixture is always preferred",
            "Decorative uses of coloured aggregate",
            "The case for sealing every exposed surface"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q07",
          "part": 5,
          "text": "Paragraph G",
          "options": [
            "The stages that produce a workable lime binder",
            "Practical steps that make replacement durable",
            "Allowing the joint to fail before the masonry",
            "Looking beyond the apparent simplicity of repair",
            "A cautious strategy rather than a universal cure",
            "Routes by which a wall releases moisture",
            "Environmental control while a new joint develops",
            "Why the strongest available mixture is always preferred",
            "Decorative uses of coloured aggregate",
            "The case for sealing every exposed surface"
          ],
          "answer": 4
        },
        {
          "type": "fill",
          "id": "r-q08",
          "part": 5,
          "text": "After quicklime has been slaked with enough water and matured, the binder is usually called 8 ____.",
          "answers": [
            "lime putty"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q09",
          "part": 5,
          "text": "During early curing, the preferred condition is 9 ____ rather than fully saturated.",
          "answers": [
            "damp"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q10",
          "part": 5,
          "text": "Carbon dioxide travels into the mortar through 10 ____.",
          "answers": [
            "open pores"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q11",
          "part": 5,
          "text": "After evaporation, connected pores allow 11 ____ to pass outwards.",
          "answers": [
            "water vapour"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q12",
          "part": 5,
          "text": "A repair with excessive 12 ____ may transfer strain to the edge of a stone.",
          "answers": [
            "compressive strength"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q13",
          "part": 5,
          "text": "Ideally, the mortar serves as the 13 ____ and is replaced before historic masonry is lost.",
          "answers": [
            "sacrificial joint"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 6,
      "skill": "reading",
      "title": "Academic Reading — Passage 2: Can a Museum Keep a Smell?",
      "passageTitle": "Can a Museum Keep a Smell?",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A Museums have long built collections around objects that can be seen and touched, while smell was often treated as incidental or troublesome. Yet odours can carry evidence about materials, work and domestic routines. The scent of a wooden interior may include resin, smoke, polish and products of slow decay; remove one source and the perceived history changes. Smell is also unstable. Volatile compounds disperse, react and are replaced by later treatments, so today's odour is neither a sealed message from the past nor meaningless contamination. Preserving olfactory heritage begins with documenting that changing mixture and the context in which people interpret it.\n\nB The first challenge is deciding what, exactly, deserves preservation. A characteristic smell may come from the original material, from use, from age or from conservation treatment. Cleaning can remove compounds that curators later realise were informative, while retaining every residue may accelerate deterioration or expose people to hazards. Placing an object in a closed container can slow the loss of volatiles, but it does not freeze the chemistry. Conservators therefore record condition, known treatments and sensory descriptions before intervening. The record may become more durable than the odour itself and can explain why a later presentation differs from an earlier one. Repeated documentation is useful because both the object and the vocabulary used to describe it can change over time.\n\nC Instrumental analysis offers one kind of record. In headspace sampling, researchers collect vapours in the air around an object or interior without necessarily removing solid material. Analytical equipment can then separate and identify many volatile compounds. The resulting profile is valuable for comparison and for detecting substances that require caution. It is not a photograph of smell, however. Instruments may register chemicals below a person's sensory threshold, while interactions among compounds can change what is perceived. Sampling conditions, temperature and the materials used to trap vapours also influence the profile, so method details belong in any reusable odour archive. Curators can revisit these records when storage conditions change, when an object travels, or when later analysis identifies a compound that earlier equipment could not distinguish reliably.\n\nD Human description supplies information that instruments cannot. A sensory panel may compare intensity, character and change over time, using agreed terms after training and discussion. Memories and cultural associations vary, so a panel does not convert a subjective response into an eternal fact. It can, however, make the conditions of judgement visible and reveal whether several observers notice a similar quality. To reduce suggestion, initial sensory sessions can be conducted without telling panellists which compounds an instrument detected. Chemical and sensory records are then compared, rather than allowing one to dictate the language of the other. A review can then separate physical change in the collection from changes in sampling method or descriptive vocabulary.\n\nE Sometimes the aim is public interpretation rather than storage. A reconstructed odour may combine available materials to evoke a documented environment. Exact chemical duplication is rarely the only goal: an original recipe might contain irritants, protected animal products or ingredients that no longer behave as they did. A safer substitute can preserve a recognisable relationship to the historical account while reducing risk. The reconstruction should therefore be labelled as an interpretation, with its evidence and substitutions stated. Otherwise, visitors may mistake a contemporary design decision for a substance recovered intact from the past. A reconstruction can also be revised when new evidence appears, provided earlier versions and decisions remain traceable.\n\nF Delivery changes the conservation problem again. Pumping scent continuously through a gallery may contaminate nearby objects, exhaust visitors' attention and create an experience that is stronger than the historic setting. Some museums instead use personal scent stations, sealed samples or timed release. These arrangements limit spread and allow equipment to be cleaned, although they also separate the odour from the room or activity that once gave it meaning. The best arrangement depends on purpose, dose, ventilation and context rather than novelty alone. Ventilation and neighbouring displays need attention before any public release begins.\n\nG Ethics connects every stage. Curators need to distinguish an object's material emissions from a commissioned reconstruction, and they should not imply certainty where identification is tentative. Visitors may have asthma, chemical sensitivity, pregnancy-related nausea or simply no wish to participate. Advance warning, an unscented route and a way to stop exposure give them meaningful choice. Consultation can also reveal that a smell celebrated by one group recalls dangerous or degrading work for another. Olfactory heritage is worth preserving precisely because it adds human complexity; treating access, evidence and consent as afterthoughts would flatten that complexity into spectacle. This choice also keeps interpretation accountable when institutions revise a display, its equipment, or the evidence behind it.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q14",
          "part": 6,
          "text": "Historically significant smells can change as volatile substances disperse.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q15",
          "part": 6,
          "text": "Sealing a scented object prevents any further chemical change.",
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
          "text": "Headspace sampling always requires a piece of solid material to be removed from an object.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q17",
          "part": 6,
          "text": "A sensory panel should contain at least twelve trained people.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q18",
          "part": 6,
          "text": "A reconstructed historical smell may use a safer replacement for an original ingredient.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q19",
          "part": 6,
          "text": "Personal scent stations cost less to maintain than timed-release systems.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q20",
          "part": 6,
          "text": "Museums should warn visitors about scent and provide a way to avoid exposure.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q21",
          "part": 6,
          "text": "a warning that a conservation action can erase evidence before its value is recognised",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q22",
          "part": 6,
          "text": "a method for preventing analytical results from influencing people's first descriptions",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q23",
          "part": 6,
          "text": "a reason for replacing a historically documented ingredient",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "r-q24",
          "part": 6,
          "text": "an explanation of why a present-day smell cannot be treated as an unchanged message",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q25",
          "part": 6,
          "text": "a technique that collects material from the air near an item",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q26",
          "part": 6,
          "text": "examples of circumstances in which visitors may prefer not to encounter a smell",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 6
        }
      ]
    },
    {
      "part": 7,
      "skill": "reading",
      "title": "Academic Reading — Passage 3: Citizens’ Juries and the Hard Choices of Infrastructure",
      "passageTitle": "Citizens’ Juries and the Hard Choices of Infrastructure",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A Infrastructure decisions combine technical uncertainty with arguments about who should pay, which places should bear disruption and what future risks deserve priority. Public meetings often reward those able to attend and speak confidently, while opinion surveys reveal preferences without showing how they respond to evidence. A citizens' jury offers a different instrument. A small group of residents is selected, briefed, allowed to question witnesses and asked to deliberate before producing recommendations. Its purpose is not to replace elected authority or professional design. Properly used, it creates a structured test of reasons that conventional consultation can miss.\n\nB Selection is central to that claim. Volunteers alone may reproduce the most organised voices, so organisers commonly recruit from a broad pool and use stratified selection to improve descriptive representation across factors such as age, gender, location and social background. This does not create a miniature population in a statistical sense, nor can it guarantee that every lived experience appears. A panel is too small for that. The stronger argument is comparative: transparent recruitment can produce a group less self-selecting than an open hearing. Participants also need payment and practical support, or selection on paper will not translate into equal ability to attend. It also gives future panels a starting point instead of requiring every group to rediscover the same institutional constraints.\n\nC Information design determines what the jury can actually deliberate. Jurors may receive written summaries, hear advocates with competing positions, question technical specialists and request clarification. A balanced process does not pretend that all claims have identical evidential weight. It makes the basis of disagreement inspectable and gives participants more than one route to challenge it. Witness lists, briefing materials and declared interests should be published. Otherwise, an organiser can shape the apparent consensus by narrowing the evidence before discussion begins, while still presenting the final meeting as citizen-led. A public archive of materials, questions and official replies also lets later communities judge whether the same standards were applied when political priorities or project sponsors changed.\n\nD Facilitation presents a subtler risk. A skilled facilitator protects speaking time, asks participants to explain terms and prevents a confident minority from dominating. The objective is not to make disagreement disappear. Pressure to reach a neat unanimous statement can conceal genuine differences or encourage tired jurors to accept vague language. Reports should preserve minority reasoning where it matters. A larger panel may include more perspectives, yet it can leave less speaking time for each participant; organisers therefore weigh size against the mandate, resources and diversity required. Transparent procedures matter more than the ceremonial label attached to the event. Independent observation can reveal whether formal rules were followed in practice as well as described in advance.\n\nE The recommendation mandate must be settled before recruitment. Officials should state whether the jury will rank options, advise on conditions, identify unacceptable trade-offs or examine a defined question. They should also explain who retains the decision and what response will follow. A jury recommendation is not automatically implemented, and pretending otherwise transfers accountability without legal authority. Conversely, inviting citizens to deliberate and then offering no reasoned reply treats their labour as decoration. A published response can show which recommendations were adopted, modified or rejected and on what grounds. Agencies should retain the evidence pack and response so later reviews can distinguish a changed judgement from a forgotten promise.\n\nF Advocates sometimes answer concerns about expertise too casually. Ordinary citizens do not become engineers after several briefing sessions. Yet that observation does not make their contribution irrelevant. Specialists can estimate capacity, cost and failure probability; citizens can question assumptions about acceptable inconvenience, distribution and precaution. The useful division is not experts versus the public, but distinct forms of judgement brought into a common process. Jurors need enough time and support to interrogate specialists, and decision-makers still need competent technical appraisal after the panel reports.\n\nG Cost and delay are real objections. Recruitment, accessibility support, evidence preparation and facilitation require resources, and a badly timed jury can duplicate statutory consultation. The case is strongest where choices are consequential, contested or difficult to reverse, not for every routine maintenance decision. Evaluation should also extend beyond whether jurors enjoyed the event. It should examine the fairness of recruitment, the quality of reasoning, changes to the eventual decision and the official response. Without that wider view, a polished process can be praised even when it has no influence or entrenches an unrepresentative frame. Trust depends on this institutional memory, especially when construction extends across electoral cycles.\n\nH The long-term question is whether deliberation becomes part of institutional learning. A single jury can help with a particular route, reservoir or energy connection, but repeated panels reveal whether agencies improve evidence, explain constraints and respond consistently. Repetition alone is no guarantee: a formula can harden into theatre. The safeguard is a visible chain from mandate through recruitment and evidence to recommendation and response. Citizens' juries are therefore neither a democratic cure nor an expensive distraction by definition. They are conditional tools whose legitimacy depends on design and on their accountable connection to the decisions they are meant to inform. The distinction matters.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q27",
          "part": 7,
          "text": "Citizens’ juries should take final decision-making power away from elected representatives.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q28",
          "part": 7,
          "text": "Stratified selection can make a jury less self-selecting, although it cannot include every experience.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q29",
          "part": 7,
          "text": "Giving jurors several ways to question evidence can make disagreements more transparent.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q30",
          "part": 7,
          "text": "The writer considers independent observation more effective than published procedures.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q31",
          "part": 7,
          "text": "The writer believes a jury’s recommendations should be binding on officials.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q32",
          "part": 7,
          "text": "Effective facilitation",
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
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q33",
          "part": 7,
          "text": "A clear recommendation mandate",
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
          "answer": 5
        },
        {
          "type": "mcq",
          "id": "r-q34",
          "part": 7,
          "text": "A published official response",
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
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q35",
          "part": 7,
          "text": "The expense of a jury",
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
          "answer": 7
        },
        {
          "type": "mcq",
          "id": "r-q36",
          "part": 7,
          "text": "The repeated use of well-designed panels",
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
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "r-q37",
          "part": 7,
          "text": "What danger does the writer associate with pressure for unanimity?",
          "options": [
            "Witnesses may refuse to attend.",
            "Recruitment will become more expensive.",
            "Officials may disclose confidential budgets.",
            "Real disagreements may be hidden by a tidy statement."
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q38",
          "part": 7,
          "text": "Why does the writer reject the idea that non-specialists have no useful role?",
          "options": [
            "They can master engineering calculations during a short briefing.",
            "They can examine value judgements and question expert assumptions.",
            "They are more accurate than specialists at predicting project costs.",
            "They can remove uncertainty from technical evidence."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q39",
          "part": 7,
          "text": "According to the writer, a proper evaluation should include",
          "options": [
            "only participants’ satisfaction with the event.",
            "the number of technical documents distributed.",
            "the quality of reasoning and effects on the eventual decision.",
            "whether the jury met for longer than the statutory consultation."
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q40",
          "part": 7,
          "text": "Which statement best expresses the writer’s conclusion?",
          "options": [
            "Citizens’ juries can add value when their design and link to authority are accountable.",
            "Citizens’ juries should become legally binding in every infrastructure case.",
            "Citizens’ juries are mainly symbolic and should usually be avoided.",
            "Citizens’ juries work best when experts do not participate."
          ],
          "answer": 0
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
          "stimulus": "The table below shows the percentages of five kinds of fresh food discarded by households in one region when the food was kept under three different storage conditions.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          "text": "The table below shows the percentages of five kinds of fresh food discarded by households in one region when the food was kept under three different storage conditions.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          "minWords": 150,
          "imageUrl": "/assets/ielts/charts/set29-task1.svg",
          "imageAlt": "A table compares the percentages of five fresh foods discarded under refrigerated, countertop and ventilated-box storage."
        },
        {
          "type": "write",
          "id": "w-task-2",
          "part": 8,
          "taskNumber": 2,
          "stimulus": "Employers should be legally required to publish a salary range in every job advertisement.\n\nTo what extent do you agree or disagree?",
          "text": "Employers should be legally required to publish a salary range in every job advertisement.\n\nTo what extent do you agree or disagree?",
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
          "text": "How might you know that a visitor has arrived?\nWould you prefer a knock, a message, or another way of knowing?\nCan being told that a visitor has arrived ever be inconvenient?\nDoes the best way of knowing depend on the situation?\nWhen, if ever, do you take a reusable bag when you go shopping?\nIs it easy or difficult for you to remember to take one?\nWhat might make you choose not to use a reusable bag?\nHas your use of shopping bags changed over time?\nHow common are compliments or kind words in your everyday life, if at all?\nIn what situations, if any, do you notice people using kind words?\nWhen you are with other people, are some kinds of praise easier for you to accept than others?\nWhat can make kind words seem sincere or useful?"
        },
        {
          "type": "speak",
          "id": "s-part-2",
          "part": 9,
          "partNumber": 2,
          "text": "Describe a person who stayed calm in a difficult situation.",
          "cueCard": "Describe a person who stayed calm in a difficult situation.\nYou should say:\n• the person involved and the difficulty they faced\n• what the person did\n• how other people reacted\nand explain why the calm response was effective or memorable.",
          "followUp": [
            "Do you think this person is usually calm?",
            "Would you react in the same way in a similar situation?"
          ]
        },
        {
          "type": "speak",
          "id": "s-part-3",
          "part": 9,
          "partNumber": 3,
          "text": "Why can staying calm influence the quality of a decision?\nHow can people train themselves to respond well under pressure?\nIn what situations might acting quickly matter more than discussing every option?\nWhat should a leader do when a team faces a difficult situation?\nHow much responsibility do organisations have for helping staff make good decisions under pressure?\nHow might future technology support people who must make difficult decisions quickly?"
        }
      ]
    }
  ]
};

export default mock;
