#!/usr/bin/env python3
# Contador UNICO de palabras — escenario 7, fase 13.
# Mismo criterio, palabra por palabra, que fase11-scripts/contar-palabras-7.py,
# para que las rondas se puedan restar. Declarado en DECLARACION 2 del informe.
import re, collections
PATH = "/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/fase13-simulacion-7.md"
FILLERS = {"uh", "ehh", "eh", "mmm", "em"}
def clean(t):
    t = re.sub(r"«[^»]*»", " ", t)          # espanol fuera
    t = re.sub(r"\*\([^)]*\)\*", " ", t)     # acotaciones en cursiva
    t = re.sub(r"\([^)]*\)", " ", t)         # acotaciones
    t = re.sub(r"`?\[[^\]]*\]`?", " ", t)    # marcas [F] [D] [K] [L] [C] [X] [ES] [!]
    return t.replace("`", " ").replace("*", " ")
def words(t):
    return [w for w in re.findall(r"[A-Za-z][A-Za-z'’\-]*", clean(t)) if w.lower() not in FILLERS]
sec = None
counts = collections.defaultdict(collections.Counter)
turns  = collections.defaultdict(collections.Counter)
longest = collections.defaultdict(int)
for ln in open(PATH, encoding="utf-8").read().split("\n"):
    m = re.match(r"^## (\d)(?![\-\w])", ln)
    if m:
        sec = int(m.group(1)); continue
    if ln.startswith("## "):
        sec = None; continue
    t = re.match(r"^\*\*([AB])(\d+)\*\*\s*—\s*(.*)$", ln)
    if t and sec:
        role, _, body = t.groups()
        n = len(words(body))
        counts[sec][role] += n; turns[sec][role] += 1
        longest[sec] = max(longest[sec], n)
tot_all = 0
for s in sorted(counts):
    a, b = counts[s]["A"], counts[s]["B"]; tot = a + b; tot_all += tot
    pa = round(100*a/tot); pb = 100 - pa
    print(f"pareja {s}: A={a} ({pa}%) B={b} ({pb}%) total={tot} turnos A{turns[s]['A']}/B{turns[s]['B']} turno-mas-largo={longest[s]}")
print("total set:", tot_all)
