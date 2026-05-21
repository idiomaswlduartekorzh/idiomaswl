import type { MockExam } from './types';

const PART5_TEXT = `Social Media Algorithms and the Attention Economy

When you scroll through your social media feed, the content you see is not random. Every post, video, and advertisement has been selected by a sophisticated algorithm designed to keep you engaged for as long as possible. Understanding how these systems work — and who benefits from them — has become one of the central questions of the digital age.

Social media platforms earn revenue through advertising, and advertisers pay more for users who spend more time on the platform. As a result, algorithms are optimized not for user wellbeing, but for engagement metrics: likes, shares, comments, and above all, time spent on screen. Research published in the journal Nature Human Behaviour found that content triggering strong emotions — particularly outrage and anxiety — spreads significantly faster than neutral content.

This creates a perverse incentive. Platforms profit when users are emotionally activated, even when that activation is negative. Critics argue that this architecture has contributed to rising rates of anxiety among teenagers, increased political polarization, and the rapid spread of misinformation. Studies suggest that false news travels six times faster on social media than accurate reporting.

Defenders of the algorithm model point out that users ultimately choose what to engage with, and that platforms have introduced features allowing users to customize their feeds. Some researchers also note that social media has enabled marginalized communities to organize, share stories, and demand accountability in ways that were previously impossible.

The debate is unlikely to be resolved soon. However, one thing is clear: the choices made by a handful of engineers designing recommendation systems now shape the information environment of billions of people worldwide.`;

const PART6_TEXT = `Artificial Intelligence in Healthcare: Promise and Peril

The integration of artificial intelligence into medical practice represents one of the most consequential technological shifts of the twenty-first century. Proponents argue that AI will democratize access to expertise, reduce diagnostic errors, and accelerate drug discovery at a pace no human team could match. Skeptics, meanwhile, warn of hidden biases, liability gaps, and the risk of eroding the human connection that lies at the heart of medicine.

AI diagnostic tools have already demonstrated remarkable capabilities. In 2019, a study published in The Lancet Digital Health showed that a deep learning algorithm could identify diabetic retinopathy — a leading cause of blindness — from retinal scans with an accuracy exceeding that of trained ophthalmologists. Similar results have been reported for detecting breast cancer in mammograms and predicting sepsis in intensive care patients. In resource-limited settings, where specialist physicians are scarce, such tools could prove lifesaving.

Yet the technology is not without serious limitations. AI systems learn from historical data, and medical data has historically reflected systemic inequalities. A landmark 2019 study in Science revealed that a widely used algorithm for allocating healthcare resources assigned lower risk scores to Black patients than to equally ill White patients — not because of deliberate programming, but because it used healthcare spending as a proxy for illness, and Black patients had historically received less care. The algorithm perpetuated inequality rather than correcting it.

Questions of accountability also remain unresolved. When an AI-assisted diagnosis proves incorrect and a patient is harmed, who is responsible — the physician who relied on the tool, the hospital that deployed it, or the company that built it? Existing legal frameworks were not designed with such scenarios in mind.

Ultimately, the question is not whether AI will transform healthcare — it already is. The more pressing question is whether the institutions governing medicine can develop the regulatory frameworks, ethical standards, and technical safeguards needed to ensure that transformation benefits everyone, rather than amplifying the inequalities that already exist within the system.`;

const PART7_TEXT = `The Case for Strong Digital Privacy Regulations

We are living in an era of unprecedented surveillance. Every search query, every purchase, every location check-in, and every message we send is collected, stored, and analyzed by corporations whose business models depend on knowing as much about us as possible. The data economy is worth trillions of dollars, and the raw material — our personal information — is extracted largely without our meaningful consent.

Some argue that this arrangement is acceptable because users receive free services in return. But this framing fundamentally misunderstands the nature of the exchange. Users are not receiving services for free — they are paying with something far more valuable than money: their behavioral data, their psychological profiles, their private communications. The asymmetry of this transaction is staggering. A user spends a few minutes on a platform; the platform retains insights about that user for years, sells those insights to third parties, and uses them to manipulate future behavior.

Regulation is not the enemy of innovation. The European Union's General Data Protection Regulation (GDPR), often cited as an overreaction by industry lobbyists, has in practice strengthened public trust in digital services, increased transparency about data use, and forced companies to build privacy into their systems from the ground up. Research shows that GDPR-compliant firms have not suffered the competitive disadvantages that industry predicted; many have become more trusted by consumers as a result.

Critics of regulation argue that it stifles innovation and that users already have sufficient control through opt-out mechanisms. However, research consistently shows that default settings determine behavior: the vast majority of users never change privacy settings, making the default — usually maximum data collection — the de facto standard. True consent requires meaningful choices, not buried checkboxes.

The digital economy will not regulate itself. History shows that industries left to self-regulate consistently prioritize profit over public interest. Strong, enforceable privacy laws are not a restriction on freedom — they are its precondition. Without them, the freedom to communicate, to associate, and to think privately erodes one data point at a time.`;

const mock: MockExam = {
  id: 'mock-11',
  examSlug: 'icfes',
  title: 'Mock 11 · Technology & Digital Life',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    // ── Part 1 — Vocabulary (5 questions) ────────────────────────────────────
    // Answers: 2, 0, 3, 1, 2   → 0×1, 1×1, 2×2, 3×1
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Choose the word that best matches each definition.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'A set of rules or instructions that a computer follows to solve a problem or complete a task.',
          options: ['bandwidth', 'firewall', 'algorithm', 'database'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'Harmful software designed to damage, disrupt, or gain unauthorized access to a computer system.',
          options: ['malware', 'firmware', 'shareware', 'middleware'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'The maximum amount of data that can be transmitted over a network connection in a given time.',
          options: ['latency', 'resolution', 'cache', 'bandwidth'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'To verify the identity of a user, device, or system before granting access to a resource.',
          options: ['navigate', 'authenticate', 'synchronize', 'calibrate'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'An early version of a product built to test a concept or design before full production begins.',
          options: ['replica', 'prototype', 'blueprint', 'template'],
          answer: 1,
        },
      ],
    },

    // ── Part 2 — Diálogos (9 questions) ──────────────────────────────────────
    // Answers: 0, 3, 1, 2, 0, 3, 2, 1, 3   → 0×2, 1×2, 2×2, 3×3
    {
      part: 2,
      title: 'Parte 2 — Diálogos',
      instructions: 'Read each dialogue and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p2q1',
          part: 2,
          stimulus: 'Tech support: "Have you tried restarting the device?"\nUser: "Yes, twice. It\'s still showing the same error."\nTech support: _______',
          text: 'What is the most appropriate next step from tech support?',
          options: [
            '"In that case, let\'s check whether the software is up to date."',
            '"Then there is nothing we can do remotely."',
            '"Please restart it one more time."',
            '"You should buy a new device."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Student A: "Did you read the article about facial recognition software?"\nStudent B: "I did. I think the privacy concerns are overblown."\nStudent A: _______',
          text: 'Which response best continues a balanced academic discussion?',
          options: [
            '"You are completely right. There is nothing to worry about."',
            '"I disagree. Privacy concerns are not relevant to technology."',
            '"Maybe, but some researchers argue the risks are actually underreported."',
            '"I would rather not discuss technology topics in school."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Manager: "Our new app has been downloaded over a million times, but user retention is only 20%."\nDeveloper: _______',
          text: 'Which response shows the most relevant professional insight?',
          options: [
            '"That is not bad for a new app."',
            '"We should look at the onboarding experience — most users probably drop off in the first session."',
            '"Downloads are the only metric that matters."',
            '"We need a bigger marketing budget."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Parent: "My daughter spends six hours a day on social media. Should I be worried?"\nCounselor: "That is quite a lot of screen time. Has her sleep or schoolwork been affected?"\nParent: "She does seem more anxious and her grades have dropped."\nCounselor: _______',
          text: 'What is the most professionally appropriate response from the counselor?',
          options: [
            '"Those symptoms are unrelated to screen time."',
            '"You should take her phone away permanently."',
            '"That is normal for teenagers today."',
            '"Those changes are worth addressing. Setting time limits and having an open conversation with her would be good first steps."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Colleague A: "I forgot my password again and I\'m locked out of the system."\nColleague B: _______',
          text: 'Which response is the most helpful and appropriate?',
          options: [
            '"You should contact IT to reset your credentials — they can verify your identity and unlock the account."',
            '"Just use someone else\'s login for now."',
            '"You should write your password on a sticky note next time."',
            '"That is not a problem I can help with."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Journalist: "Do you think AI will replace most jobs in the next decade?"\nEconomist: "It is unlikely to be that simple. History shows that technology tends to eliminate certain tasks while creating new categories of work."\nJournalist: _______',
          text: 'What is the most logical follow-up from the journalist?',
          options: [
            '"So you think job losses are not real?"',
            '"In other words, the impact will depend on how quickly workers can adapt to new roles?"',
            '"Then AI is not something we need to worry about at all."',
            '"Can you give an example of technology that destroyed all existing jobs?"',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Student: "I don\'t understand why my code keeps crashing."\nTeacher: "Show me the error message."\nStudent: "It says \'null pointer exception\'."\nTeacher: _______',
          text: 'What is the most useful response from the teacher?',
          options: [
            '"That error message means very little without more context."',
            '"Restart your computer and try again."',
            '"That usually means your code is trying to use a variable that hasn\'t been assigned a value yet. Check where you initialize that object."',
            '"You should choose a different programming language."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Customer: "I read your privacy policy, but I\'m not sure what data you actually collect."\nCompany representative: _______',
          text: 'What is the most transparent and appropriate response?',
          options: [
            '"Our privacy policy is publicly available and covers everything."',
            '"We collect usage data, device information, and location if you grant permission. You can review and delete your data in account settings."',
            '"We do not share your data with anyone, so there is nothing to worry about."',
            '"Our data practices are standard for the industry."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Friend A: "I got a message saying I won a prize and they need my bank details to send it."\nFriend B: _______',
          text: 'What is the most appropriate warning from Friend B?',
          options: [
            '"That sounds exciting! Send your details quickly before the offer expires."',
            '"Make sure you use a secure connection when submitting your information."',
            '"Ask them to mail the prize instead."',
            '"Do not respond to that — it is almost certainly a phishing scam designed to steal your financial information."',
          ],
          answer: 3,
        },
      ],
    },

    // ── Part 3 — Completar texto (9 questions) ────────────────────────────────
    // Cloze passage about smartphones changing communication
    // Answers: 0, 3, 2, 1, 0, 3, 2, 0, 1   → 0×3, 1×2, 2×2, 3×2
    {
      part: 3,
      title: 'Parte 3 — Completar texto',
      instructions: 'Read the passage and choose the best option for each numbered blank.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (1).',
          text: 'Blank (1): "Smartphones have fundamentally _______ the way human beings communicate..."',
          options: ['transformed', 'transform', 'transforming', 'will transform'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (2).',
          text: 'Blank (2): "...constant connectivity has become the norm, _______ it easier than ever..."',
          options: ['made', 'make', 'makes', 'making'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (3).',
          text: 'Blank (3): "...professionals can collaborate _______ their physical location."',
          options: ['because of', 'due to', 'regardless of', 'in spite'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (4).',
          text: 'Blank (4): "...the quality of communication has _______ declined in certain respects."',
          options: ['noticeably', 'notice', 'noticeable', 'noticing'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (5).',
          text: 'Blank (5): "...many younger people _______ developing the patience required for longer forms of communication."',
          options: ['are struggling with', 'struggle at', 'are struggling to', 'have struggled for'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (6).',
          text: 'Blank (6): "Research _______ that heavy smartphone users report higher levels of stress..."',
          options: ['is indicating', 'indicated', 'has indicated', 'will indicate'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (7).',
          text: 'Blank (7): "_______ these drawbacks, few would argue that the smartphone should be abandoned altogether."',
          options: ['Therefore', 'Although', 'Despite', 'Unless'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (8).',
          text: 'Blank (8): "_______, the challenge facing individuals and societies is to establish healthier boundaries..."',
          options: ['Rather', 'Moreover', 'However', 'For instance'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (9).',
          text: 'Blank (9): "...to use these powerful tools _______ allowing them to dominate every aspect of daily life."',
          options: ['so that', 'unless', 'without', 'despite'],
          answer: 2,
        },
      ],
    },

    // ── Part 4 — Comprensión visual (9 questions) ─────────────────────────────
    // Answers: 3, 1, 0, 2, 3, 0, 1, 3, 2
    {
      part: 4,
      title: 'Parte 4 — Comprensión visual',
      instructions: 'Read each notice or sign carefully and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: 'NEXTECH CAMPUS — VISITOR POLICY\n——————————————\nAll visitors must:\n• Register at Reception and receive a visitor badge\n• Be accompanied by a staff member at all times\n• Not enter server rooms or R&D areas under any circumstances\n• Hand in badge upon departure\n\nUnregistered visitors may be escorted from the premises.\nFor appointments: reception@nextech.io',
          stimulusLabel: 'Read the company notice.',
          text: 'According to the notice, which area is strictly off-limits to visitors?',
          options: [
            'The reception area.',
            'Meeting rooms.',
            'The car park.',
            'Server rooms and R&D areas.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: 'NEXTECH CAMPUS — VISITOR POLICY\n——————————————\nAll visitors must:\n• Register at Reception and receive a visitor badge\n• Be accompanied by a staff member at all times\n• Not enter server rooms or R&D areas under any circumstances\n• Hand in badge upon departure\n\nUnregistered visitors may be escorted from the premises.\nFor appointments: reception@nextech.io',
          stimulusLabel: 'Read the company notice.',
          text: 'What happens to visitors who arrive without registering?',
          options: [
            'They may be asked to leave the building.',
            'They receive a temporary pass at the door.',
            'They must wait in the car park until a staff member arrives.',
            'They are directed to the R&D area.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'CENTRAL PUBLIC LIBRARY — DIGITAL SERVICES\n——————————————\nLibrary card holders can now access:\n• E-books and audiobooks (up to 5 loans at a time)\n• Online newspaper and magazine archive (30+ publications)\n• Language learning platforms (unlimited sessions)\n• Digital film collection (streaming only — no download)\n\nNote: Some services require in-library login for first-time activation.\nVisit the Help Desk or go to: library.digital/help',
          stimulusLabel: 'Read the library digital services notice.',
          text: 'Which digital service does NOT allow users to download content?',
          options: [
            'E-books.',
            'Audiobooks.',
            'Language learning platforms.',
            'The digital film collection.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'CENTRAL PUBLIC LIBRARY — DIGITAL SERVICES\n——————————————\nLibrary card holders can now access:\n• E-books and audiobooks (up to 5 loans at a time)\n• Online newspaper and magazine archive (30+ publications)\n• Language learning platforms (unlimited sessions)\n• Digital film collection (streaming only — no download)\n\nNote: Some services require in-library login for first-time activation.\nVisit the Help Desk or go to: library.digital/help',
          stimulusLabel: 'Read the library digital services notice.',
          text: 'A user who wishes to begin using these services for the first time should most likely:',
          options: [
            'Download all services before visiting the library.',
            'Contact library.digital/help by telephone.',
            'Visit the library in person for initial activation if required.',
            'Apply for a new library card at the Help Desk.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'SOFTWARE END-USER LICENSE AGREEMENT (EULA) — SUMMARY\n——————————————\nBy installing this software you agree to the following:\n• This license is non-transferable and for personal use only.\n• You may install the software on up to 3 devices registered to your account.\n• Reverse engineering or redistribution of this software is prohibited.\n• The developer is not liable for data loss resulting from software use.\n• This agreement is governed by the laws of the State of California, USA.\n\nFull terms: legal.softwarecorp.com/eula',
          stimulusLabel: 'Read the software license summary.',
          text: 'According to the license, what does the developer NOT accept responsibility for?',
          options: [
            'Providing updates to the software.',
            'Restricting installation to personal use.',
            'Data loss caused by using the software.',
            'Governing the agreement under California law.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'SOFTWARE END-USER LICENSE AGREEMENT (EULA) — SUMMARY\n——————————————\nBy installing this software you agree to the following:\n• This license is non-transferable and for personal use only.\n• You may install the software on up to 3 devices registered to your account.\n• Reverse engineering or redistribution of this software is prohibited.\n• The developer is not liable for data loss resulting from software use.\n• This agreement is governed by the laws of the State of California, USA.\n\nFull terms: legal.softwarecorp.com/eula',
          stimulusLabel: 'Read the software license summary.',
          text: 'Which of the following actions would violate this license agreement?',
          options: [
            'Installing the software on a second personal computer.',
            'Reading the full terms at the developer\'s website.',
            'Sharing the software with a friend on their device.',
            'Using the software on a device registered to your account.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'COMPUTER LABORATORY — RULES FOR STUDENTS\n——————————————\n• Log in using your student ID only. Shared logins are NOT permitted.\n• Save work to your personal cloud folder — local drives are wiped daily.\n• Food, drink, and mobile phones are not permitted at workstations.\n• Printing is limited to 20 pages per session. Report malfunctions to staff.\n• Do not install software. Report any unauthorized programs found.\n• Lab closes at 8:00 PM. Unsaved work will be lost.',
          stimulusLabel: 'Read the computer lab rules.',
          text: 'Why is it particularly important to save work to the cloud folder rather than locally?',
          options: [
            'The lab computers do not have local storage.',
            'Local drives are cleared every day, so files saved there will be lost.',
            'Cloud folders have a larger storage capacity than local drives.',
            'The cloud folder is required for printing documents.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'COMPUTER LABORATORY — RULES FOR STUDENTS\n——————————————\n• Log in using your student ID only. Shared logins are NOT permitted.\n• Save work to your personal cloud folder — local drives are wiped daily.\n• Food, drink, and mobile phones are not permitted at workstations.\n• Printing is limited to 20 pages per session. Report malfunctions to staff.\n• Do not install software. Report any unauthorized programs found.\n• Lab closes at 8:00 PM. Unsaved work will be lost.',
          stimulusLabel: 'Read the computer lab rules.',
          text: 'Which of the following is NOT explicitly mentioned in the lab rules?',
          options: [
            'The time the lab closes.',
            'The limit on the number of pages that can be printed.',
            'The procedure for reporting unauthorized software.',
            'The cost of printing per page.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'TECHFAIR 2026 — REGISTRATION OPEN\n——————————————\nJoin us for the region\'s largest student technology expo!\nDate: March 14–15, 2026 | Venue: City Convention Centre\nOpen to: Secondary and university students\nActivities: Robotics competition, AI demos, startup pitches, coding workshops\nEarly registration discount: 30% off before February 1st\nRegister: techfair2026.edu/register\n\nNote: Group registrations (5+ students) receive an additional 10% discount.',
          stimulusLabel: 'Read the event notice.',
          text: 'A group of six university students who register before February 1st would receive a total discount of:',
          options: [
            '10% only, since the early discount applies only to individuals.',
            '30% only, since group discounts and early registration discounts cannot be combined.',
            'An unspecified amount determined at the door.',
            '40%, combining the early registration and group discounts.',
          ],
          answer: 3,
        },
      ],
    },

    // ── Part 5 — Texto corto (9 questions) ────────────────────────────────────
    // Answers: 1, 3, 0, 2, 1, 0, 3, 2, 1
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the article and answer the questions.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the primary purpose of social media algorithms according to the text?',
          options: [
            'To show users the most accurate and balanced news.',
            'To maximize the time users spend on the platform.',
            'To connect users with people who share their interests.',
            'To filter out harmful and misleading content.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to the research cited, what type of content spreads most rapidly on social media?',
          options: [
            'Educational and informative content.',
            'Content that receives the most likes.',
            'Content posted by verified accounts.',
            'Content that triggers strong emotional reactions.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The text states that false news travels how many times faster than accurate reporting on social media?',
          options: ['Six times faster.', 'Three times faster.', 'Ten times faster.', 'Twice as fast.'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The word "perverse" as used in the third paragraph most closely means:',
          options: [
            'Financially profitable.',
            'Difficult to understand.',
            'Wrong in a way that goes against what is expected or acceptable.',
            'Technically complex.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'Which of the following best describes a view that SUPPORTS social media algorithms, according to the text?',
          options: [
            'Platforms have actively suppressed emotional content to protect users.',
            'Users retain some agency over their experience through feed customization features.',
            'Algorithms have been proven not to affect political polarization.',
            'Social media companies do not benefit financially from increased engagement.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What ability has social media given to marginalized communities, according to the defenders mentioned in the text?',
          options: [
            'The ability to create and sell their own algorithms.',
            'Access to premium advertising tools at no cost.',
            'A direct channel to lobby government officials.',
            'The ability to organize, share stories, and demand accountability.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What does the author imply by saying that recommendation systems "shape the information environment of billions of people"?',
          options: [
            'People are satisfied with the information they receive online.',
            'Social media companies share responsibility for what people believe and discuss.',
            'Governments control what information appears in social media feeds.',
            'The number of social media users is growing exponentially.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The phrase "attention economy" in the title most likely refers to:',
          options: [
            'A financial system based on academic attention.',
            'The study of how people focus in school environments.',
            'A model in which user attention is treated as a valuable commercial resource.',
            'Government investment in digital infrastructure.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred from the final paragraph about the author\'s overall stance?',
          options: [
            'The author believes social media companies will voluntarily improve their algorithms.',
            'The author suggests that the power of algorithm designers requires critical societal attention.',
            'The author argues that social media should be banned immediately.',
            'The author is optimistic that the debate will be resolved quickly.',
          ],
          answer: 1,
        },
      ],
    },

    // ── Part 6 — Texto largo: inferencia (7 questions) ────────────────────────
    // Answers: 0, 3, 1, 2, 0, 3, 2
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the article carefully and answer the questions. Focus on implied meaning, author attitude, and text structure.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the main idea of the article?',
          options: [
            'AI in healthcare offers significant promise but requires careful oversight to avoid reinforcing inequalities.',
            'AI will replace human doctors within the next decade.',
            'Medical data is too biased for AI to be useful in healthcare.',
            'Legal frameworks are the most pressing challenge for AI adoption in medicine.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to the article, why could AI diagnostic tools be particularly valuable in resource-limited settings?',
          options: [
            'They are cheaper to operate than traditional medical equipment.',
            'They eliminate the need for any medical infrastructure.',
            'They can process patient data faster than manual record systems.',
            'They can perform the role of specialist physicians who are not available locally.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The algorithm described in the 2019 Science study assigned lower risk scores to Black patients because it:',
          options: [
            'Was programmed with deliberately biased rules.',
            'Used healthcare spending as a measure of illness, reflecting historical inequalities in care received.',
            'Relied on genetic data that varies between populations.',
            'Was tested exclusively on White patient populations.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The word "perpetuated" in the third paragraph most likely means:',
          options: [
            'Eliminated through technological correction.',
            'Detected and reported to regulators.',
            'Made to continue without correction.',
            'Gradually reduced over time.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What unresolved question does the author raise in the fourth paragraph?',
          options: [
            'Who bears responsibility when an AI-assisted diagnosis causes patient harm.',
            'Whether AI algorithms can be made fully accurate.',
            'How much AI diagnostic tools cost to develop.',
            'Whether patients should be informed when AI is used in their diagnosis.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'Which of the following statements would the author most likely AGREE with?',
          options: [
            'AI should be banned from clinical settings until all biases are eliminated.',
            'The benefits of AI in healthcare are so clear that regulation is unnecessary.',
            'Existing legal frameworks are well-prepared to handle AI-related medical disputes.',
            'The governance of AI in medicine must evolve alongside the technology to ensure equitable benefits.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The structure of the article can best be described as:',
          options: [
            'A chronological account of AI development in medicine.',
            'A problem-only analysis that offers no potential solutions.',
            'A balanced examination of AI\'s potential benefits and significant risks in healthcare.',
            'A defense of AI technology against uninformed critics.',
          ],
          answer: 2,
        },
      ],
    },

    // ── Part 7 — Texto de opinión (6 questions) ───────────────────────────────
    // Answers: 0, 1, 3, 2, 0, 3
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      instructions: "Read the opinion piece and answer the questions about the author's argument, rhetorical choices, and implied meaning.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s central argument?',
          options: [
            'Digital privacy regulations are necessary to protect individuals from corporate exploitation of their personal data.',
            'The data economy benefits users more than it harms them.',
            'Users should simply avoid social media platforms to protect their privacy.',
            'The GDPR has failed to improve digital privacy standards.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author counter the argument that users "receive free services in return" for their data?',
          options: [
            'By arguing that digital services are not actually useful.',
            'By pointing out that users pay with behavioral data and psychological profiles, which are worth far more than the services received.',
            'By claiming that all digital services should charge subscription fees.',
            'By showing that free services lead to lower-quality content.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, how has the GDPR affected companies subject to it?',
          options: [
            'It has driven most companies out of the European market.',
            'It has significantly increased the cost of doing business.',
            'It has had no measurable effect on data practices.',
            'It has increased transparency and consumer trust without causing the competitive harm the industry predicted.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'The author argues that "true consent requires meaningful choices, not buried checkboxes." This implies that:',
          options: [
            'Checkboxes are an effective way to communicate privacy options to users.',
            'Companies already provide adequate privacy controls.',
            'Meaningful consent means users are actively encouraged to opt out of data collection.',
            'Current opt-out mechanisms are insufficient because most users never engage with them.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'What rhetorical strategy does the author use in the final paragraph when referring to historical industry behavior?',
          options: [
            'An appeal to historical precedent to argue that industries require external regulation to act in the public interest.',
            'A personal anecdote to make the argument more relatable.',
            'A statistical comparison between regulated and unregulated industries.',
            'A concession that self-regulation has worked in some sectors.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'The phrase "erodes one data point at a time" at the end of the article is an example of:',
          options: [
            'A factual claim backed by research data.',
            'An admission that the erosion of privacy is too slow to matter.',
            'A concession to the opposing view.',
            'A metaphor suggesting that privacy loss is gradual but cumulative and significant.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which of the following statements would the author most likely AGREE with?',
          options: [
            'Technology companies have consistently acted in users\' best interests without government intervention.',
            'Voluntary industry codes are a reliable substitute for enforceable privacy legislation.',
            'Strong privacy regulation is necessary precisely because market incentives alone will not protect users.',
            'The economic cost of privacy regulation is too high to justify its social benefits.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
