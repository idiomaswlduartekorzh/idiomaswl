#!/usr/bin/env python3
"""
Convierte los escaneos de certificados de examen en piezas publicables.

Por cada hoja produce dos cosas:
  hoja/     la pagina completa, en duotono y con los datos personales tapados
            con bloques solidos. Es lo que se ve en el abanico, a 280 px.
  puntaje/  el recorte del recuadro de resultados, a buena resolucion. Es lo
            que se ve al acercar el cursor.

Los bloques se queman en el pixel. No son una capa de CSS ni un desenfoque:
un desenfoque se puede revertir, un bloque solido no.

La entrada tiene que ser el PDF de CamScanner ya extraido a
work/certificados-escaneados/. Con las fotos sueltas del principio esto no
funcionaba: hoja blanca dentro de mica brillante sobre carpeta blanca, sin
borde detectable. Se probaron caja por brillo, perfiles de fila y columna con
cierre morfologico, Canny, Canny automatico, contornos Otsu y umbral
adaptativo con correccion de perspectiva por homografia; todos agarraban el
marco entero de la foto o un sub-rectangulo al azar. El escaneo resuelve de
entrada lo que el codigo no podia resolver despues.

Uso:
    python3 scripts/certificados.py preview pag-01.jpg   # dibuja las guias
    python3 scripts/certificados.py build pag-01.jpg     # exporta
    python3 scripts/certificados.py build --all
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass, field
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
FUENTE = RAIZ / "work" / "certificados-escaneados"
TRABAJO = RAIZ / "work" / "certificados-trabajo"
SALIDA = RAIZ / "public" / "images" / "resultados"
CONFIG = RAIZ / "work" / "certificados-config.json"

# El mundo visual de la home: papel crema, tinta casi negra, rojo de acento.
CREMA = (243, 238, 228)
TINTA = (28, 26, 24)
ROJO = (214, 40, 30)

# Se normaliza por ANCHO, no por alto. El formulario impreso siempre tiene el
# mismo ancho, pero el alto del escaneo varia: en unas hojas CamScanner cortó
# el pie con los logos y en otras no. Normalizando por alto, esa diferencia
# corre todas las coordenadas y el recuadro del puntaje cae sobre otra fila.
# Por eso las coordenadas de las plantillas son fracciones del ANCHO en los
# dos ejes, medidas desde el borde superior.
ANCHO_BASE = 1200  # px de ancho con que se trabaja antes de exportar
# Dos anchos para srcset. El grande es el que se ve en el relevo, cuando la
# hoja ocupa el rectangulo del documento; el chico es para el abanico ya
# abierto y para movil. Ojo: los 280 px de antes eran una red de seguridad, a
# ese tamano un bloque de tachado corrido no dejaba nada legible. A 640 eso
# deja de ser cierto, asi que cada hoja hay que mirarla a tamano completo.
ANCHOS_ABANICO = (320, 640)
ANCHO_PUNTAJE = 1000  # el recuadro si se lee

# CamScanner estampa su marca en la franja inferior. Se descarta antes de
# medir el contenido; si no, la caja se estira hasta el pie de la pagina.
FRANJA_MARCA = 0.055


@dataclass
class Plantilla:
    """Zonas de una hoja, en fracciones del area impresa (no del papel)."""

    nombre: str
    tapar: list[tuple[float, float, float, float]] = field(default_factory=list)
    puntaje: tuple[float, float, float, float] = (0.0, 0.0, 1.0, 1.0)


# Se afinan con `preview`, que dibuja en rojo lo que se tapa y en verde lo que
# se recorta. Cada familia de reporte tiene su maquetado y no se mezclan.
PLANTILLAS: dict[str, Plantilla] = {
    # Un bloque grande en vez de siete ajustados. Con recuadros por campo, a
    # 640 px se escapaban los ultimos digitos del registro, trozos de la
    # direccion, y en una hoja el "ID No." entero porque el bloque cayo una
    # fila mas arriba. Tapar tambien la fecha del examen no cuesta nada: en el
    # abanico la hoja es decorativa, y el dato que se lee es el recuadro del
    # puntaje, que va aparte.
    # Ojo: la foto del examinando queda pegada al recuadro de puntajes, asi que
    # su bloque no puede crecer hacia abajo sin morder el titulo.
    "toefl-2015": Plantilla(
        nombre="TOEFL iBT cabecera verde (2015-2019)",
        tapar=[
            (0.018, 0.112, 0.645, 0.358),  # Nombre, correo, sexo, nacimiento,
                                           # registro y direccion, todo junto
            (0.688, 0.098, 1.000, 0.334),  # Foto de la cara
            (0.135, 0.548, 0.545, 0.615),  # Fila de Security Identification
        ],
        puntaje=(0.698, 0.336, 0.998, 0.542),
    ),
    "toefl-mybest": Plantilla(
        nombre="TOEFL iBT MyBest naranja (2019-2023)",
    ),
    "toefl-2023": Plantilla(
        nombre="TOEFL iBT cabecera azul (2023+)",
    ),
    # Medida sobre pag-13, que es la hoja mas completa del lote. Los bloques
    # van holgados a proposito: el encuadre varia hasta un 3% entre escaneos y
    # tapar papel en blanco de mas no se nota, quedarse corto destapa un dato.
    "ielts": Plantilla(
        nombre="IELTS Test Report Form",
        tapar=[
            # Un solo bloque para Candidate Details. Con un recuadro por campo
            # la fecha de nacimiento se escapaba en dos hojas: su fila cae 2 o
            # 3% mas abajo segun el escaneo. De paso tapa Sex y Scheme Code,
            # que tampoco hacen falta.
            (0.118, 0.295, 0.800, 0.625),  # Nombre, apellido, ID y nacimiento
            (0.725, 0.250, 1.000, 0.525),  # Foto de la cara
            (0.795, 0.190, 1.000, 0.265),  # Candidate Number
            # El numero de TRF lleva las iniciales del apellido adentro
            # (18CO003945PARS001A -> PARra Silvia) y con centro y fecha permite
            # verificar el resultado online. Va junto con la firma.
            (0.618, 1.042, 1.000, 1.312),  # Firma del administrador + TRF Number
        ],
        puntaje=(0.004, 0.798, 0.998, 0.928),
    ),
    "goethe-a1": Plantilla(
        nombre="Goethe-Zertifikat A1/A2 (Start Deutsch)",
    ),
    "goethe-b1": Plantilla(
        nombre="Goethe-Zertifikat B1 (Zeugnis)",
    ),
    "celpe-bras": Plantilla(
        nombre="Celpe-Bras (INEP)",
    ),
}


def cargar_config() -> dict:
    return json.loads(CONFIG.read_text()) if CONFIG.exists() else {}


def _rango_por_masa(perfil: Image.Image, fraccion: float = 0.004) -> tuple[int, int]:
    """Extremos del perfil descartando una fraccion de la tinta en cada punta.

    Medir por el minimo y el maximo absolutos es fragil: una mota del escaner,
    o la marca de agua grande que CamScanner deja a media pagina en algunas
    hojas, estiran la caja y desplazan todas las coordenadas de la plantilla.
    Por masa acumulada, una marca aislada pesa poco y queda fuera.
    """
    valores = list(perfil.getdata())
    total = sum(valores)
    if total <= 0:
        return 0, len(valores)

    objetivo = total * fraccion
    inicio, acumulado = 0, 0
    for i, v in enumerate(valores):
        acumulado += v
        if acumulado >= objetivo:
            inicio = i
            break

    fin, acumulado = len(valores), 0
    for i in range(len(valores) - 1, -1, -1):
        acumulado += valores[i]
        if acumulado >= objetivo:
            fin = i + 1
            break

    return (inicio, fin) if fin > inicio else (0, len(valores))


def recortar_contenido(im: Image.Image) -> Image.Image:
    """Recorta al area impresa y la lleva a una altura fija.

    Encuadrar por el area impresa y no por el borde del papel es lo que hace
    que una plantilla sirva para todas las hojas de un mismo formato: el papel
    puede traer mas o menos margen segun el escaneo, pero el formulario
    impreso siempre ocupa lo mismo.
    """
    util = im.crop((0, 0, im.width, int(im.height * (1 - FRANJA_MARCA))))
    gris = ImageOps.grayscale(util)
    tinta = gris.point(lambda p: 255 if p < 205 else 0)
    tinta = tinta.filter(ImageFilter.MinFilter(3))  # motas sueltas del escaner

    ancho_t, alto_t = tinta.size
    y0, y1 = _rango_por_masa(tinta.resize((1, alto_t), Image.BOX))
    x0, x1 = _rango_por_masa(tinta.resize((ancho_t, 1), Image.BOX))

    margen = int(min(util.size) * 0.008)
    util = util.crop(
        (
            max(0, x0 - margen),
            max(0, y0 - margen),
            min(util.width, x1 + margen),
            min(util.height, y1 + margen),
        )
    )

    alto = max(1, int(util.height * ANCHO_BASE / util.width))
    return util.resize((ANCHO_BASE, alto), Image.LANCZOS)


def limpiar(im: Image.Image) -> Image.Image:
    """Lleva la hoja al papel crema con tinta oscura de la home."""
    gris = ImageOps.grayscale(im)
    gris = ImageOps.autocontrast(gris, cutoff=(0, 4))
    return ImageOps.colorize(gris, black=TINTA, white=CREMA)


def preparar(nombre: str, cfg_hoja: dict) -> Image.Image:
    im = ImageOps.exif_transpose(Image.open(FUENTE / nombre))
    giro = cfg_hoja.get("girar", 0)
    if giro:
        im = im.rotate(giro, resample=Image.BICUBIC, expand=True, fillcolor="white")
    return recortar_contenido(im)


def abs_rect(
    rel: tuple[float, float, float, float],
    im: Image.Image,
    ajuste: tuple[float, float] = (0.0, 0.0),
):
    """Los dos ejes escalan con el ancho: ver la nota de ANCHO_BASE.

    El ajuste corre la plantilla entera en esa hoja. Normalizar por ancho
    arregla la escala, pero no el margen superior: hay escaneos con mas aire
    sobre el logo que otros. En vez de inventar un detector de encabezado
    para 16 hojas que igual hay que mirar una por una, se corrige con dos
    numeros en el config.
    """
    dx, dy = ajuste
    x0, y0, x1, y1 = rel
    escala = im.width
    return (
        int((x0 + dx) * escala),
        int((y0 + dy) * escala),
        int((x1 + dx) * escala),
        int((y1 + dy) * escala),
    )


def tapar(
    im: Image.Image, plantilla: Plantilla, ajuste: tuple[float, float] = (0.0, 0.0)
) -> Image.Image:
    salida = im.copy()
    dibujo = ImageDraw.Draw(salida)
    for rel in plantilla.tapar:
        dibujo.rectangle(abs_rect(rel, salida, ajuste), fill=TINTA)
    return salida


def comando_preview(archivos: list[str], cfg: dict) -> None:
    TRABAJO.mkdir(parents=True, exist_ok=True)
    for nombre in archivos:
        hoja = cfg.get(nombre, {})
        clave = hoja.get("plantilla")
        if not clave:
            print(f"  {nombre}: sin plantilla asignada, se salta")
            continue

        plantilla = PLANTILLAS[clave]
        ajuste = tuple(hoja.get("ajuste", (0.0, 0.0)))
        vista = preparar(nombre, hoja).convert("RGB")
        dibujo = ImageDraw.Draw(vista, "RGBA")
        for rel in plantilla.tapar:
            dibujo.rectangle(
                abs_rect(rel, vista, ajuste),
                fill=(214, 40, 30, 110),
                outline=ROJO,
                width=3,
            )
        dibujo.rectangle(
            abs_rect(plantilla.puntaje, vista, ajuste), outline=(20, 120, 90), width=6
        )

        destino = TRABAJO / f"preview-{Path(nombre).stem}.jpg"
        vista.save(destino, quality=88)
        print(f"  {nombre} [{clave}] {vista.size} -> {destino.name}")


def comando_build(archivos: list[str], cfg: dict) -> None:
    (SALIDA / "hoja").mkdir(parents=True, exist_ok=True)
    (SALIDA / "puntaje").mkdir(parents=True, exist_ok=True)

    for nombre in archivos:
        hoja = cfg.get(nombre, {})
        clave = hoja.get("plantilla")
        if not clave:
            print(f"  {nombre}: sin plantilla asignada, se salta")
            continue

        slug = hoja.get("slug") or Path(nombre).stem
        plantilla = PLANTILLAS[clave]

        # Seguro duro. Una plantilla sin zonas de tachado exportaria la hoja
        # con el nombre, la foto y el documento a la vista. Ya paso una vez:
        # `build --all` corrio sobre familias todavia sin calibrar y dejo
        # cinco hojas sin tapar en public/. No puede volver a pasar.
        if not plantilla.tapar:
            print(f"  {nombre}: plantilla '{clave}' SIN ZONAS DE TACHADO, se salta")
            continue

        ajuste = tuple(hoja.get("ajuste", (0.0, 0.0)))
        pagina = tapar(limpiar(preparar(nombre, hoja)), plantilla, ajuste)
        recorte = pagina.crop(abs_rect(plantilla.puntaje, pagina, ajuste))

        salidas = [("puntaje", recorte, ANCHO_PUNTAJE, "")]
        for ancho in ANCHOS_ABANICO:
            sufijo = "" if ancho == max(ANCHOS_ABANICO) else f"-{ancho}"
            salidas.append(("hoja", pagina, ancho, sufijo))

        for etiqueta, imagen, ancho, sufijo in salidas:
            chica = imagen
            if chica.width > ancho:
                chica = chica.resize(
                    (ancho, max(1, int(chica.height * ancho / chica.width))),
                    Image.LANCZOS,
                )
            for ext, opciones in (
                ("webp", {"quality": 82, "method": 6}),
                ("avif", {"quality": 62}),
            ):
                chica.save(SALIDA / etiqueta / f"{slug}{sufijo}.{ext}", **opciones)

        print(f"  {nombre} [{clave}] -> resultados/{{hoja,puntaje}}/{slug}")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("comando", choices=("preview", "build"))
    ap.add_argument("archivos", nargs="*")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()

    cfg = cargar_config()
    archivos = args.archivos
    if args.all or not archivos:
        archivos = sorted(k for k, v in cfg.items() if v.get("plantilla"))
    if not archivos:
        print("No hay hojas con plantilla asignada en work/certificados-config.json")
        return 1

    print(f"{args.comando}: {len(archivos)} hoja(s)")
    if args.comando == "preview":
        comando_preview(archivos, cfg)
    else:
        comando_build(archivos, cfg)
    return 0


if __name__ == "__main__":
    sys.exit(main())
