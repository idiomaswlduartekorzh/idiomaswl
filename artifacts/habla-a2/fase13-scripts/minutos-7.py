#!/usr/bin/env python3
# Minutos estimados — escenario 7, fase 13. DOS modelos, los dos declarados en el informe.
#   (a) BUCKETS: el modelo que declara el propio archivo en «Modelo de minutos»
#       (punto medio de cada banda), un bucket por turno.
#   (b) RITMO: habla = palabras / ritmo del perfil, MAS el tiempo muerto que las
#       propias acotaciones escriben (segundos anotados, pausas) y los adders de
#       consulta a la pantalla de cierre y de fuga al espanol.
# El contador de palabras es el MISMO de DECLARACION 2, sin tocar.
import re

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

def tiempo_muerto(body):
    """Segundos escritos por las propias acotaciones del turno."""
    s = 0.0
    for d in re.findall(r"\*\(([^)]*)\)\*", body):
        nums = [int(x) for x in re.findall(r"(\d+)\s*s\b", d)]
        if nums:
            s += sum(nums)               # la acotacion trae su cifra: manda ella
        elif "pausa larga" in d:
            s += 7.0
        elif "pausa" in d:
            s += 4.0
        elif "global" in d:
            s += 0.0                     # marca de numeracion, no es tiempo
        else:
            s += 2.0                     # gesto («coge la maleta», «mira el vocabulario»)
    return s

PERF = {
    (1, "A"): "sol", (1, "B"): "sol",
    (2, "A"): "sol", (2, "B"): "flo",
    (3, "A"): "flo", (3, "B"): "flo",
    (4, "A"): "sol", (4, "B"): "mono",
    (5, "A"): "sol", (5, "B"): "sol",
}
BUCKET = {"sol": 11.0, "flo": 24.0, "mono": 3.5}    # punto medio de las bandas del archivo
WPM    = {"sol": 110.0, "flo": 75.0, "mono": 60.0}  # ritmo A2 hablado

sec, rows = None, []
for ln in open(PATH, encoding="utf-8").read().split("\n"):
    m = re.match(r"^## (\d)(?![\-\w])", ln)
    if m:
        sec = int(m.group(1)); continue
    if ln.startswith("## "):
        sec = None; continue
    t = re.match(r"^\*\*([AB])(\d+)\*\*\s*—\s*(.*)$", ln)
    if t and sec:
        role, idx, body = t.group(1), int(t.group(2)), t.group(3)
        marks = set(re.findall(r"`\[([A-Z!]{1,2})\]`", body))
        muerto = tiempo_muerto(body)
        extra = 0.0
        if "K" in marks and not re.search(r"pantalla de cierre,\s*\d+\s*s", body): extra += 11.0
        if "ES" in marks: extra += 12.0
        if "C" in marks and muerto == 0: extra += 6.0
        rows.append((sec, role, idx, len(words(body)), muerto + extra))

print(f"{'pareja':>6} {'buckets':>9} {'ritmo':>9}    (previsto por la ficha: 7:00, 18 turnos)")
for s in sorted({r[0] for r in rows}):
    b = sum(BUCKET[PERF[(r[0], r[1])]] + r[4] for r in rows if r[0] == s)
    w = sum(max(r[3] / WPM[PERF[(r[0], r[1])]] * 60, 2.0) + r[4] for r in rows if r[0] == s)
    print(f"{s:>6} {int(b)//60}:{int(b)%60:02d}{'':>4} {int(w)//60}:{int(w)%60:02d}{'':>4} ({b:.0f} s / {w:.0f} s)")
print()
print("desglose del modelo de ritmo — habla pura vs. tiempo muerto escrito")
for s in sorted({r[0] for r in rows}):
    habla = sum(max(r[3] / WPM[PERF[(r[0], r[1])]] * 60, 2.0) for r in rows if r[0] == s)
    muerto = sum(r[4] for r in rows if r[0] == s)
    print(f"  pareja {s}: habla {habla:.0f} s · muerto {muerto:.0f} s = {100*muerto/(habla+muerto):.0f} % del reloj")
print()
print("turno mas caro de cada pareja (modelo de ritmo)")
for s in sorted({r[0] for r in rows}):
    w = max(((max(r[3] / WPM[PERF[(r[0], r[1])]] * 60, 2.0) + r[4]), f"{r[1]}{r[2]}", r[3])
            for r in rows if r[0] == s)
    print(f"  pareja {s}: {w[1]} = {w[0]:.0f} s ({w[2]} palabras)")
