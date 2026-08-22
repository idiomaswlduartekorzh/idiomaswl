#!/usr/bin/env python3
# Contador UNICO de palabras — escenario 8, fase 11.
# Criterio: DECLARACION 2 de fase11-simulacion-8.md.
#  - cuenta toda palabra hablada EN INGLES, incluidas las leidas ([L]/[C]) y los exponentes
#  - contraccion = 1 palabra; cifras dichas en palabras cuentan una a una
#  - Hmm y OK cuentan (bloque 8 de la caja)
#  - NO cuenta: espanol entre «...», acotaciones *(...)* y (...), marcas [..]/`[..]`,
#    rellenos no lexicos: uh, ehh, eh, mmm, em
import re, collections

PATH = "/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/fase11-simulacion-8.md"
FILLERS = {"uh", "ehh", "eh", "mmm", "em"}

def clean(t):
    t = re.sub(r"«[^»]*»", " ", t)
    t = re.sub(r"\*\([^)]*\)\*", " ", t)
    t = re.sub(r"\([^)]*\)", " ", t)
    t = re.sub(r"`?\[[^\]]*\]`?", " ", t)
    return t.replace("`", " ").replace("*", " ").replace('"', " ")

def words(t):
    toks = re.findall(r"[A-Za-z][A-Za-z'’\-]*", clean(t))
    return [w for w in toks if w.lower() not in FILLERS]

sec = None
counts = collections.defaultdict(collections.Counter)
turns = collections.defaultdict(collections.Counter)
for ln in open(PATH, encoding="utf-8").read().split("\n"):
    m = re.match(r"^## (5-bis|6|\d)\s", ln)
    if m:
        sec = m.group(1); continue
    t = re.match(r"^\*\*([AB])(\d+)\*\*\s*—\s*(.*)$", ln)
    if t and sec:
        role, _, body = t.groups()
        counts[sec][role] += len(words(body))
        turns[sec][role] += 1

order = ["1", "2", "3", "4", "5", "5-bis", "6"]
for s in order:
    if s not in counts: continue
    a, b = counts[s]["A"], counts[s]["B"]
    tot = a + b
    pa = round(100 * a / tot); pb = 100 - pa
    print(f"pareja {s}: A={a} ({pa}%) B={b} ({pb}%) total={tot} "
          f"turnos A{turns[s]['A']}/B{turns[s]['B']}={turns[s]['A']+turns[s]['B']}")
pares = [s for s in ("1", "3") if s in counts]
print("--- puerta 5 (solo perfil parejo: 1 y 3) ---")
for s in pares:
    a, b = counts[s]["A"], counts[s]["B"]
    lo = round(100 * min(a, b) / (a + b))
    print(f"  pareja {s}: lado menor = {lo}%  -> {'PASA' if lo >= 40 else 'FALLA'} el 40%")
