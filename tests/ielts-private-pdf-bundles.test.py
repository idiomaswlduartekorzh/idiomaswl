#!/usr/bin/env python3
"""Low-cost deterministic tests for the private PDF staging boundary."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts/build-ielts-private-pdf-bundles.py"
spec = importlib.util.spec_from_file_location("ielts_pdf_bundles", SCRIPT)
module = importlib.util.module_from_spec(spec)
assert spec and spec.loader
sys.modules[spec.name] = module
spec.loader.exec_module(module)


candidate_source = {
    "candidateOnlyProjection": {
        "candidateInstructions": {"opening": "Answer Questions 1-2."},
        "questions": [
            {"number": 1, "prompt": "Choose one option.", "options": ["North", "South"]},
            {"number": 2, "prompt": "Write one word."},
        ],
        "scripts": [{"speaker": "Tutor", "text": "PRIVATE TRANSCRIPT CANARY"}],
        "answerKey": [{"number": 1, "canonical": "South"}],
        "nested": {"rationale": "PRIVATE RATIONALE CANARY"},
    },
    "answerKey": [{"number": 1, "canonical": "South"}],
    "scripts": [{"speaker": "Tutor", "text": "PRIVATE TRANSCRIPT CANARY"}],
}

projected = module.project_candidate(candidate_source, "listening")
projected_text = str(projected)
assert "Choose one option" in projected_text
assert "PRIVATE TRANSCRIPT CANARY" not in projected_text
assert "PRIVATE RATIONALE CANARY" not in projected_text
assert module.leak_paths(projected) == []

private = module.private_projection(candidate_source, "listening")
assert private["answerKey"][0]["canonical"] == "South"
assert private["scripts"][0]["text"] == "PRIVATE TRANSCRIPT CANARY"

speaking_source = {
    "candidateProjection": {
        "candidateVisible": {
            "part2CueCard": {
                "title": "Describe a calm person.",
                "bullets": ["who the person was"],
            }
        },
        "examinerDelivered": {
            "part1": {"questions": ["PRIVATE EXAMINER QUESTION CANARY"]}
        },
        "examinerOnlyControls": {
            "part1": {"controllerRule": "PRIVATE CONTROL CANARY"}
        },
    }
}
speaking_candidate = module.project_candidate(speaking_source, "speaking")
assert "Describe a calm person" in str(speaking_candidate)
assert "PRIVATE EXAMINER QUESTION CANARY" not in str(speaking_candidate)
assert "PRIVATE CONTROL CANARY" not in str(speaking_candidate)
speaking_private = module.private_projection(speaking_source, "speaking")
assert "PRIVATE EXAMINER QUESTION CANARY" in str(speaking_private)
assert "PRIVATE CONTROL CANARY" in str(speaking_private)

poisoned = {"questions": [], "helperPayload": {"targetResponse": "PRIVATE"}}
assert module.leak_paths(poisoned) == ["/helperPayload/targetResponse"]

assert module.version_key(Path("set29-reading-content-v1.0.12.json")) > module.version_key(Path("set29-reading-content-v1.0.9.json"))

duplicate_representation = {
    "text": "A First paragraph.\n\nB Second paragraph.",
    "sections": [
        {"label": "A", "text": "First paragraph."},
        {"label": "B", "text": "Second paragraph."},
    ],
}
kind, body = module.canonical_passage_body(duplicate_representation)
assert kind == "sections"
assert body == duplicate_representation["sections"]
assert module.canonical_passage_body({"text": "Only flat text."}) == ("text", "Only flat text.")
assert module.canonical_passage_body({"paragraphs": ["Only paragraph."]}) == (
    "paragraphs", ["Only paragraph."]
)
compact_questions = [
    {"number": number, "prompt": f"Prompt {number}", "options": ["A. One", "B. Two"]}
    for number in range(37, 41)
]
assert module.compact_question_group_can_stay_together(compact_questions)
assert not module.compact_question_group_can_stay_together(compact_questions + [
    {"number": 41, "prompt": "Prompt 41", "options": ["A. One", "B. Two"]}
])

heading = object()
lead = object()
remainder = object()
grouped = module.keep_passage_heading_with_lead(
    heading,
    [lead, remainder],
    lambda flowables: ("KEEP_TOGETHER", flowables),
)
assert grouped == [("KEEP_TOGETHER", [heading, lead]), remainder]
assert module.keep_passage_heading_with_lead(heading, [], lambda value: value) == [heading]

partial_groups = [{"range": "19-22", "assetId": "diagram"}]
partial_questions = [{"number": number, "prompt": f"Question {number}"} for number in range(1, 41)]
projected_partial = module.project_candidate({
    "candidateProjection": {
        "questions": partial_questions,
        "questionGroups": partial_groups,
        "visualAssets": [{"assetId": "must-still-be-stripped"}],
    }
}, "reading")
assert projected_partial["questionGroups"][0]["assetId"] == "diagram"
assert "must-still-be-stripped" not in str(projected_partial)
partial_plan = module.reading_question_group_plan(partial_groups, partial_questions)
assert [unit[0] for unit in partial_plan] == [*range(1, 19), 19, *range(23, 41)]
assert sum(unit[1] == "group" for unit in partial_plan) == 1
assert sum(unit[1] == "question" for unit in partial_plan) == 36
assert module.reading_question_group_plan(partial_groups, partial_questions, {0}) == [
    (number, "question", partial_questions[number - 1]) for number in [*range(1, 19), *range(23, 41)]
]

direct_part1 = {
    "opening": ["What is your full name?"],
    "questions": ["Which brush do you use?", "When do you choose a comb?"],
}
assert module.speaking_part1_direct_questions(direct_part1) == direct_part1["questions"]
assert module.speaking_part1_direct_questions({
    **direct_part1,
    "topicGroups": [{"topic": "Hair care", "questions": direct_part1["questions"]}],
}) == []

assert module.DEFAULT_OUTPUT.parts[-3:] == ("ielts-production", "staging", "pdf-bundles-21-40-v1.0.0")
print("PASS: projection boundary, canary stripping, partial Reading group coverage, Reading group visual binding, passage precedence, semantic versions, Speaking Part 1 schemas, staging-only output")
