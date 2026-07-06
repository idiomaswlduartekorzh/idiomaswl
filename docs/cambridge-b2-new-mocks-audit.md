# Cambridge B2 First New Mocks Audit

Date: 2026-07-03

Reference structure: Cambridge B2 First has Reading and Use of English with 7 parts and 52 questions, Writing with 2 tasks, Listening with 4 parts and 30 questions, and Speaking with 4 parts.

## Current Status

- Sets audited: `cambridge-b2:set-2` to `cambridge-b2:set-10`.
- Reading and Use of English: implemented with 7 official-style parts and 52 objective items.
- Writing: implemented with Part 1 essay and Part 2 choice task, both 140-190 words.
- Speaking: implemented with 4 parts, Part 2 image support, and response notes saved for review.
- Listening: still pending for sets 2-10 until a matching full audio is provided or verified.

## Fitness Checks

Reading and Use of English now falls in the target range for exam-scale reading material:

- Set 2: 2254 words
- Set 3: 2264 words
- Set 4: 2268 words
- Set 5: 2275 words
- Set 6: 2270 words
- Set 7: 2260 words
- Set 8: 2262 words
- Set 9: 2262 words
- Set 10: 2262 words

Each set has:

- 8 Part 1 multiple-choice cloze questions
- 8 Part 2 open cloze gaps
- 8 Part 3 word formation gaps
- 6 Part 4 key word transformations
- 6 Part 5 multiple-choice reading questions
- 6 Part 6 gapped text items
- 10 Part 7 multiple matching items

## Answer Distribution

Multiple-choice answers are now balanced per set. Each set has 14 MCQ items across Reading and Use of English Parts 1 and 5, distributed approximately as 3-4 correct answers per letter A-D. No set is dominated by only A or B.

## UI Checks

- Speaking Part 2 has generated photographic comparison images.
- Speaking answers are no longer falsely described as audio submissions; the UI saves and displays speaking notes.
- Images are lazy-loaded and async-decoded to reduce page load pressure.
- Result copy distinguishes objective scoring from Writing/Speaking review.
- Mobile section tabs scroll horizontally instead of wrapping into a crowded block.

## Listening File Check

The provided MP4 file is 4 minutes and 3 seconds long. That is too short for a full B2 First Listening paper with 30 questions and 4 parts. It should not be attached to a full Listening mock until its content is verified against the pasted questions.

The pasted Listening question set also needs answer keys before it can be scored safely.
