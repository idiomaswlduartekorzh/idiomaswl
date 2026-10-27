#!/bin/zsh
set -euo pipefail

root="/Users/ddev/Documents/Codex/2026-10-02/pu"
node_bin="/Users/ddev/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
generator="$root/worktrees/ielts-visual-system-21-40/scripts/generate-ielts-eleven-v4-full-set.mjs"
qa="$root/worktrees/ielts-visual-system-21-40/scripts/qa-ielts-eleven-v4.py"
first_set="${1:-36}"
last_set="${2:-23}"

if (( first_set < last_set )); then
  print -u2 "first set must be greater than or equal to last set"
  exit 2
fi

cd "$root"

set_number="$first_set"
while (( set_number >= last_set )); do
  output_dir="$root/outputs/ielts-production/set-$set_number/listening/elevenlabs-v4"
  qa_path="$output_dir/set${set_number}-eleven-v4-qa.json"
  if [[ -f "$qa_path" ]] && jq -e '.gates.technicalQa == "PASS" and .gates.asr == "PASS" and .asr.focalAnswerEvidence.passed == 40' "$qa_path" >/dev/null; then
    print "SET $set_number ALREADY_PASS"
    (( set_number-- ))
    continue
  fi

  print "SET $set_number PLAN"
  "$node_bin" "$generator" --set "$set_number" --plan
  manifest="$output_dir/set${set_number}-eleven-v4-manifest.json"
  manifest_sha="$(shasum -a 256 "$manifest" | awk '{print $1}')"

  print "SET $set_number GENERATE"
  "$node_bin" "$generator" --set "$set_number" --generate --approve-manifest "$manifest_sha"

  print "SET $set_number QA"
  PATH="/tmp:$PATH" /usr/bin/python3 "$qa" --set "$set_number" --output "$qa_path"
  jq -e '.gates.technicalQa == "PASS" and .gates.asr == "PASS" and .asr.focalAnswerEvidence.passed == 40' "$qa_path" >/dev/null
  print "SET $set_number PASS"
  (( set_number-- ))
done

print "BATCH PASS $first_set..$last_set"
