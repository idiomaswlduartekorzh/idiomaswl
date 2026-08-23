#!/usr/bin/env python3
# Desglose del diagnostico — escenario 7, fase 13.
# NO cambia el contador: importa clean()/words() con el MISMO criterio
# declarado en DECLARACION 2 (identico a fase11-scripts/contar-palabras-7.py).
# Solo anade desglose por turno, marcas, y busquedas literales sobre el texto hablado.
import re, collections, unicodedata

PATH = "/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/fase13-simulacion-7.md"
FILLERS = {"uh", "ehh", "eh", "mmm", "em"}

def clean(t):
    t = re.sub(r"«[^»]*»", " ", t)
    t = re.sub(r"\*\([^)]*\)\*", " ", t)
    t = re.sub(r"\([^)]*\)", " ", t)
    t = re.sub(r"`?\[[^\]]*\]`?", " ", t)
    return t.replace("`", " ").replace("*", " ")

def words(t):
    return [w for w in re.findall(r"[A-Za-z][A-Za-z'’\-]*", clean(t)) if w.lower() not in FILLERS]

MARKS = ["F", "D", "K", "L", "C", "X", "ES", "!"]

sec = None
rows = []          # (pareja, role, idx, nwords, marks, texto_limpio, linea_cruda)
for ln in open(PATH, encoding="utf-8").read().split("\n"):
    m = re.match(r"^## (\d)(?![\-\w])", ln)
    if m:
        sec = int(m.group(1)); continue
    if ln.startswith("## "):
        sec = None; continue
    t = re.match(r"^\*\*([AB])(\d+)\*\*\s*—\s*(.*)$", ln)
    if t and sec:
        role, idx, body = t.group(1), int(t.group(2)), t.group(3)
        marks = re.findall(r"`\[([A-Z!]{1,2})\]`", body)
        rows.append((sec, role, idx, len(words(body)), marks, " ".join(words(body)), body))

print("=== 1 · TURNO A TURNO (palabras con el contador declarado) ===")
for s in sorted({r[0] for r in rows}):
    for role in ("B", "A"):
        seq = [(r[2], r[3]) for r in rows if r[0] == s and r[1] == role]
        seq.sort()
        tot = sum(n for _, n in seq)
        print(f"pareja {s} · {role}: " + " ".join(f"{role}{i}={n}" for i, n in seq) + f"  | total={tot} media={tot/len(seq):.1f}")
    print()

print("=== 2 · ORDEN GLOBAL (arranca Kevin): palabras por turno global ===")
for s in sorted({r[0] for r in rows}):
    d = {(r[1], r[2]): r[3] for r in rows if r[0] == s}
    n = max(i for (ro, i) in d)
    out = []
    g = 1
    for i in range(1, n + 1):
        for ro in ("B", "A"):
            if (ro, i) in d:
                out.append(f"g{g}:{ro}{i}={d[(ro,i)]}")
                g += 1
    print(f"pareja {s}: " + " ".join(out))
print()

print("=== 3 · MARCAS POR ROL Y PAREJA ===")
for s in sorted({r[0] for r in rows}):
    for role in ("A", "B"):
        c = collections.Counter()
        for r in rows:
            if r[0] == s and r[1] == role:
                c.update(r[4])
        print(f"pareja {s} · {role}: " + " ".join(f"{k}={c.get(k,0)}" for k in MARKS))
print()

print("=== 4 · FUGAS AL ESPANOL: turnos con [ES] y el texto en guillemets ===")
for r in rows:
    if "ES" in r[4]:
        esp = re.findall(r"«([^»]*)»", r[6])
        print(f"pareja {r[0]} · {r[1]}{r[2]}: «{' / '.join(esp) if esp else '(sin guillemets)'}»")
print()
print("--- guillemets en turnos SIN marca [ES] (fuga no marcada) ---")
for r in rows:
    if "ES" not in r[4] and "«" in r[6]:
        print(f"pareja {r[0]} · {r[1]}{r[2]}: {re.findall(r'«[^»]*»', r[6])}")
print()

print("=== 5 · LA FILA NUEVA `Payday | Friday the 28th` — donde se dice ===")
pats = {
    "payday": r"\bpayday\b",
    "Friday": r"\bFriday\b",
    "twenty-eight(h)": r"\btwenty-eight(?:h)?\b",
    "28": r"\b28\b",
}
for r in rows:
    hits = [k for k, p in pats.items() if re.search(p, r[5], re.I)]
    if hits:
        print(f"pareja {r[0]} · {r[1]}{r[2]}: {hits}  ->  \"{r[5]}\"")
print()

print("=== 6 · ASENTIMIENTO: turnos que EMPIEZAN por yeah/sure/okay/OK/fine/that works ===")
NOD = r"^(yeah|sure|okay|ok|fine|that works)\b"
for r in rows:
    if re.match(NOD, r[5], re.I):
        print(f"pareja {r[0]} · {r[1]}{r[2]}: palabras={r[3]}  \"{r[5]}\"")
print()
print("--- turnos de <=2 palabras que son SOLO una palabra de la lista ---")
for r in rows:
    if r[3] <= 2 and re.fullmatch(r"(yeah|sure|okay|ok|fine|that works)\.?", r[5], re.I):
        print(f"pareja {r[0]} · {r[1]}{r[2]}: \"{r[5]}\"")
print()

print("=== 7 · LAS DOS CIFRAS DEL MENSAJE (regla 3): 'six people' y 'two cars' ===")
for r in rows:
    for p, lab in ((r"\bsix (people|persons)\b", "six people"),
                   (r"\btwo cars\b", "two cars"),
                   (r"\bfive seats\b", "five seats"),
                   (r"\bfour\b", "four (asientos de Hernan)")):
        if re.search(p, r[5], re.I):
            print(f"pareja {r[0]} · {r[1]}{r[2]}: [{lab}]  \"{r[5]}\"")
print()

print("=== 8 · ARTEFACTO DEL CONTADOR: tokens con tilde partidos en dos ===")
acc = collections.Counter()
for r in rows:
    for w in re.findall(r"[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’\-]*", clean(r[6])):
        if any(unicodedata.combining(c) or ord(c) > 127 for c in unicodedata.normalize("NFD", w)):
            acc[w] += 1
print("  ocurrencias:", dict(acc), " total tokens partidos =", sum(acc.values()))
por_pareja = collections.Counter()
for r in rows:
    for w in re.findall(r"[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’\-]*", clean(r[6])):
        if any(ord(c) > 127 for c in unicodedata.normalize("NFD", w)):
            por_pareja[(r[0], r[1])] += 1
print("  por pareja/rol (cada uno suma +1 palabra falsa):", dict(por_pareja))
