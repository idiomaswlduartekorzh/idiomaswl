# IELTS guided Listening chronology audit

Audit date: 2026-10-20

This audit separates two different defects: an incorrect evidence alignment is repaired against an exact ASR slice; a correct answer whose natural audio order differs from question numbering keeps its number and is assigned to a chronological practice block. No human release approval is implied.

## Original adjacent-block boundary failures (16)

| Set | Boundary | Previous end | Next start | Resolution |
| --- | --- | ---: | ---: | --- |
| 3 | L1-1 → L1-2 | 261.84 | 258.08 | temporal re-partition |
| 3 | L2-1 → L2-2 | 615.70 | 560.68 | temporal re-partition |
| 3 | L3-1 → L3-2 | 1292.98 | 986.58 | temporal re-partition |
| 5 | L1-1 → L1-2 | 242.54 | 242.54 | temporal re-partition |
| 7 | L3-1 → L3-2 | 1172.36 | 1137.44 | temporal re-partition |
| 9 | L3-1 → L3-2 | 1018.11 | 1009.73 | temporal re-partition |
| 11 | L3-1 → L3-2 | 1190.62 | 1072.36 | temporal re-partition |
| 12 | L3-1 → L3-2 | 1258.56 | 1210.18 | temporal re-partition |
| 13 | L1-2 → L2-1 | 347.08 | 342.20 | Q13 evidence correction (567.88–574.74) |
| 13 | L4-1 → L4-2 | 1443.48 | 1443.48 | temporal re-partition |
| 14 | L2-1 → L2-2 | 604.36 | 598.06 | temporal re-partition |
| 16 | L3-1 → L3-2 | 1220.74 | 1199.94 | temporal re-partition |
| 17 | L3-1 → L3-2 | 1181.00 | 937.90 | Q26 evidence correction plus temporal re-partition |
| 19 | L1-1 → L1-2 | 306.58 | 306.58 | temporal re-partition |
| 20 | L3-1 → L3-2 | 1262.40 | 1239.98 | temporal re-partition |
| 20 | L4-1 → L4-2 | 1651.76 | 1532.952 | temporal re-partition |

## Original within-block question-to-time regressions (7)

| Set | Questions | Resolution |
| --- | --- | --- |
| 2 | Q12 → Q13 | chronological block split; numbering retained |
| 2 | Q22 → Q23 | Q23 corrected to 998.60–1002.28 |
| 3 | Q12 → Q13 | chronological block split; numbering retained |
| 13 | Q12 → Q13 | Q13 corrected to 567.88–574.74 |
| 16 | Q12 → Q13 | chronological block split; numbering retained |
| 19 | Q22 → Q23 | Q23 corrected to 1145.08–1162.84 |
| 20 | Q31 → Q32 | chronological block split; numbering retained |

## Exact ASR corrections

- Set 2: Q21 921.78–937.70; Q23 998.60–1002.28; Q24 1031.02–1040.32.
- Set 13: Q13 567.88–574.74.
- Set 17: Q22 917.92–927.24; Q26 1126.86–1137.66.
- Set 19: Q21 1010.20–1024.76; Q23 1145.08–1162.84.

Each selection correction uses an exact source-ASR slice and declared semantic-focus phrases. Completion corrections use the exact slice containing the accepted answer. Scoring groups remain atomic, question numbering is unchanged, and every Listening part still exposes exactly two non-empty practice blocks. Automated checks enforce chronological, non-overlapping block segments and a maximum segment duration of 60 seconds.
