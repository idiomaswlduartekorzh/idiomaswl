#!/usr/bin/env python3
# Contador UNICO de palabras — escenario 6, fase 13.
# Criterio: DECLARACION 2 de fase13-simulacion-6.md.
#  - cuenta toda palabra hablada EN INGLES, incluidas las leidas ([L]/[C]/[E]) y los exponentes
#  - contraccion = 1 palabra; compuesto con guion = 1 palabra
#  - Hmm y OK cuentan (bloque 8 de la caja)
#  - NO cuenta: espanol entre «...», acotaciones *(...)*, marcas [..]/`[..]`,
#    rellenos no lexicos: uh, ehh, eh, mmm, em
#  - la seccion 5-bis queda fuera: es una sonda, no una conversacion
import re, collections

PATH = "/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/fase13-simulacion-6.md"
FILLERS = {"uh", "ehh", "eh", "mmm", "em"}

def clean(t):
    t = re.sub(r"«[^»]*»", " ", t)
    t = re.sub(r"\*\([^)]*\)\*", " ", t)
    t = re.sub(r"\([^)]*\)", " ", t)
    t = re.sub(r"`?\[[^\]]*\]`?", " ", t)
    return t.replace("`", " ").replace("*", " ")

def words(t):
    return [w for w in re.findall(r"[A-Za-z][A-Za-z'’\-]*", clean(t))
            if w.lower() not in FILLERS]

src = open(PATH, encoding="utf-8").read().split("\n")
sec = None
counts = collections.defaultdict(collections.Counter)
turns = collections.defaultdict(collections.Counter)
for ln in src:
    if re.match(r"^## \d-bis", ln):
        sec = None; continue
    m = re.match(r"^## (\d)(?![-\w])", ln)
    if m:
        sec = int(m.group(1)); continue
    t = re.match(r"^\*\*([AB])(\d+)[^*]*\*\*\s*—\s*(.*)$", ln)
    if t and sec:
        role, _, body = t.groups()
        counts[sec][role] += len(words(body))
        turns[sec][role] += 1

RATE = {1: (68, 68), 2: (38, 68), 3: (68, 68), 4: (68, 68), 5: (68, 85)}
for s in sorted(counts):
    a, b = counts[s]["A"], counts[s]["B"]
    tot = a + b
    pa = round(100 * a / tot); pb = 100 - pa
    ra, rb = RATE[s]
    speak = a / ra + b / rb
    print(f"pareja {s}: A={a} ({pa}%) B={b} ({pb}%) total={tot} "
          f"turnos A{turns[s]['A']}/B{turns[s]['B']} habla={speak*60:.0f}s")
