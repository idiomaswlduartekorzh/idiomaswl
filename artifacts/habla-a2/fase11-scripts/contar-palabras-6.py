#!/usr/bin/env python3
# Contador UNICO de palabras — escenario 6, fase 11.
# Criterio declarado en DECLARACION 2 de fase11-simulacion-6.md:
#  - cuenta toda palabra hablada EN INGLES, incluidas las leidas ([L]/[C]) y los exponentes
#  - contraccion = 1 palabra; cifras dichas en palabras cuentan una a una
#  - Hmm y OK cuentan (bloque 8 de la caja)
#  - NO cuenta: espanol entre «...», acotaciones *(...)*, marcas [..]/`[..]`,
#    rellenos no lexicos: uh, ehh, eh, mmm, em
import re, sys, collections

PATH = "/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/fase11-simulacion-6.md"
FILLERS = {"uh", "ehh", "eh", "mmm", "em"}

def clean(t):
    t = re.sub(r"«[^»]*»", " ", t)          # espanol
    t = re.sub(r"\*\([^)]*\)\*", " ", t)     # acotacion en cursiva
    t = re.sub(r"\([^)]*\)", " ", t)         # acotacion suelta
    t = re.sub(r"`?\[[^\]]*\]`?", " ", t)    # marcas de turno
    t = t.replace("`", " ").replace("*", " ")
    return t

def words(t):
    toks = re.findall(r"[A-Za-z][A-Za-z'’\-]*", clean(t))
    return [w for w in toks if w.lower() not in FILLERS]

src = open(PATH, encoding="utf-8").read().split("\n")
sec = None
counts = collections.defaultdict(lambda: collections.Counter())
turns = collections.defaultdict(lambda: collections.Counter())
for ln in src:
    m = re.match(r"^## (\d)(?![\-\w])", ln)
    if m:
        sec = int(m.group(1)); continue
    if re.match(r"^## 5-bis", ln):
        sec = None; continue
    t = re.match(r"^\*\*([AB])(\d+)\*\*\s*—\s*(.*)$", ln)
    if t and sec:
        role, _, body = t.groups()
        counts[sec][role] += len(words(body))
        turns[sec][role] += 1

out = {}
for s in sorted(counts):
    a, b = counts[s]["A"], counts[s]["B"]
    tot = a + b
    pa, pb = round(100*a/tot), round(100*b/tot)
    if pa + pb != 100: pb = 100 - pa
    out[s] = (a, b, tot, pa, pb)
    print(f"pareja {s}: A={a} ({pa}%) B={b} ({pb}%) total={tot} turnos A{turns[s]['A']}/B{turns[s]['B']}")
