#!/usr/bin/env python3
# Contador UNICO de palabras — escenario 7, fase 11.
# Criterio declarado en DECLARACION 2 de fase11-simulacion-7.md.
import re, collections
PATH = "/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/fase11-simulacion-7.md"
FILLERS = {"uh", "ehh", "eh", "mmm", "em"}
def clean(t):
    t = re.sub(r"«[^»]*»", " ", t)
    t = re.sub(r"\*\([^)]*\)\*", " ", t)
    t = re.sub(r"\([^)]*\)", " ", t)
    t = re.sub(r"`?\[[^\]]*\]`?", " ", t)
    return t.replace("`", " ").replace("*", " ")
def words(t):
    return [w for w in re.findall(r"[A-Za-z][A-Za-z'’\-]*", clean(t)) if w.lower() not in FILLERS]
sec = None
counts = collections.defaultdict(collections.Counter)
turns = collections.defaultdict(collections.Counter)
for ln in open(PATH, encoding="utf-8").read().split("\n"):
    if re.match(r"^## 5-bis", ln):
        sec = None; continue
    m = re.match(r"^## (\d)(?![\-\w])", ln)
    if m:
        sec = int(m.group(1)); continue
    t = re.match(r"^\*\*([AB])(\d+)\*\*\s*—\s*(.*)$", ln)
    if t and sec:
        role, _, body = t.groups()
        counts[sec][role] += len(words(body)); turns[sec][role] += 1
for s in sorted(counts):
    a, b = counts[s]["A"], counts[s]["B"]; tot = a + b
    pa = round(100*a/tot); pb = 100 - pa
    print(f"pareja {s}: A={a} ({pa}%) B={b} ({pb}%) total={tot} turnos A{turns[s]['A']}/B{turns[s]['B']}")
