#!/usr/bin/env python3
"""Materialise and visually normalise IELTS Sets 21-40 SVG assets.

The source files remain immutable. This script copies their exact semantic
geometry into the web staging tree, applies one WeLearn presentation system,
and replaces the Set 40 ropes-course plan with a purpose-built vector redraw.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import xml.etree.ElementTree as ET
from pathlib import Path


SVG_NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG_NS)


def local_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def parse_viewbox(root: ET.Element) -> tuple[float, float]:
    values = [float(value) for value in root.attrib.get("viewBox", "0 0 1600 1000").split()]
    return values[2], values[3]


def normalise_svg(source: Path, target: Path) -> None:
    tree = ET.parse(source)
    root = tree.getroot()
    width, height = parse_viewbox(root)
    root.set("width", "1600")
    root.set("height", "1000")

    background: ET.Element | None = None
    for node in root.iter():
        tag = local_name(node.tag)
        if tag == "style" and node.text:
            node.text = re.sub(r"font-family:[^;}]+", "font-family:'Helvetica Neue',Arial,sans-serif", node.text)
            node.text = node.text.replace("#132f47", "#14215c").replace("#172a3a", "#14215c")
        if tag == "rect" and node.attrib.get("width") in {str(int(width)), str(width)} and node.attrib.get("height") in {str(int(height)), str(height)}:
            node.set("fill", "#fbfcff")
            if node in list(root):
                background = node
        if tag == "text":
            node.set("font-family", "Helvetica Neue, Arial, sans-serif")
            current = node.attrib.get("fill", "")
            if current in {"", "#132f47", "#172a3a", "#20354a"}:
                node.set("fill", "#14215c")
        label = node.attrib.get("aria-label", "")
        if tag == "g" and re.match(r"(?:Option|Location) [A-H]", label):
            circle = next((child for child in node if local_name(child.tag) == "circle"), None)
            text = next((child for child in node if local_name(child.tag) == "text"), None)
            if circle is not None:
                circle.set("fill", "#ffffff")
                circle.set("stroke", "#14215c")
                circle.set("stroke-width", "4")
            if text is not None:
                text.set("fill", "#14215c")
                text.set("font-weight", "700")

    # Keep the band above a full-canvas background rather than hidden below it.
    children = list(root)
    if background is not None:
        band_index = children.index(background) + 1
    else:
        band_index = next((i for i, node in enumerate(children) if local_name(node.tag) not in {"title", "desc", "style", "defs"}), 0)
    band = ET.Element(f"{{{SVG_NS}}}rect", {
        "x": "22", "y": "18", "width": str(width - 44), "height": "60", "rx": "14",
        "fill": "#eef3fb", "stroke": "#d3dbea", "stroke-width": "2",
    })
    root.insert(band_index, band)

    # A quiet print-safe frame unifies maps created by different authoring waves.
    frame = ET.Element(f"{{{SVG_NS}}}rect", {
        "x": "12", "y": "12", "width": str(width - 24), "height": str(height - 24), "rx": "18",
        "fill": "none", "stroke": "#14215c", "stroke-width": "3",
    })
    root.append(frame)
    target.parent.mkdir(parents=True, exist_ok=True)
    tree.write(target, encoding="utf-8", xml_declaration=True)


SET40_SVG = """<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1200 760" role="img" aria-labelledby="title desc">
<title id="title">Woodland ropes-course briefing candidate map</title>
<desc id="desc">North is at the top. A south gate leads to check-in and a central clearing. The junior loop runs through western woodland; bridge platforms span the northern hollow; the return path leads east to an open assembly lawn. Options A to H are unnamed.</desc>
<defs><pattern id="trees" width="42" height="42" patternUnits="userSpaceOnUse"><circle cx="11" cy="12" r="5" fill="#9fc39b"/><circle cx="30" cy="26" r="7" fill="#bad5b4"/></pattern><filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#14215c" flood-opacity=".12"/></filter></defs>
<rect width="1200" height="760" fill="#fbfcff"/><rect x="18" y="18" width="1164" height="724" rx="22" fill="none" stroke="#14215c" stroke-width="3"/>
<rect x="38" y="36" width="1124" height="72" rx="15" fill="#eef3fb"/><rect x="38" y="36" width="14" height="72" rx="7" fill="#c8202e"/>
<g font-family="Helvetica Neue,Arial,sans-serif" fill="#14215c"><text x="76" y="70" font-size="30" font-weight="700">WOODLAND ROPES-COURSE</text><text x="76" y="94" font-size="15" fill="#5c6680">Candidate plan · choose from options A–H</text>
<g transform="translate(1080 56)"><text x="0" y="0" text-anchor="middle" font-size="14" font-weight="700">N</text><path d="M0 12V45M0 12l-8 13M0 12l8 13" fill="none" stroke="#14215c" stroke-width="3"/></g></g>
<!-- terrain -->
<path d="M80 150C175 118 290 120 358 190C405 239 393 327 336 373C270 427 166 420 90 368C52 315 47 213 80 150Z" fill="url(#trees)" stroke="#5f8759" stroke-width="4"/>
<path d="M670 136C796 104 1012 124 1090 218C1124 260 1109 330 1058 354C965 394 847 347 758 367C700 344 649 285 641 224C636 186 646 155 670 136Z" fill="url(#trees)" stroke="#5f8759" stroke-width="4"/>
<path d="M675 152Q826 102 990 160" fill="none" stroke="#8e9caf" stroke-width="3" stroke-dasharray="11 9"/><text x="830" y="134" text-anchor="middle" font-family="Helvetica Neue,Arial,sans-serif" font-size="15" fill="#5c6680">NORTHERN HOLLOW</text>
<!-- route network -->
<path d="M585 702V604C585 570 560 548 528 525" fill="none" stroke="#e4d6bd" stroke-width="34" stroke-linecap="round"/><path d="M585 702V604C585 570 560 548 528 525" fill="none" stroke="#8b6b4a" stroke-width="6" stroke-linecap="round"/>
<path d="M514 515C424 488 344 442 296 375C260 325 275 252 331 215" fill="none" stroke="#e4d6bd" stroke-width="30" stroke-linecap="round"/><path d="M514 515C424 488 344 442 296 375C260 325 275 252 331 215" fill="none" stroke="#8b6b4a" stroke-width="5"/>
<path d="M617 465C678 373 730 302 788 235" fill="none" stroke="#e4d6bd" stroke-width="30" stroke-linecap="round"/><path d="M617 465C678 373 730 302 788 235" fill="none" stroke="#8b6b4a" stroke-width="5"/>
<path d="M661 500C773 486 875 443 967 374" fill="none" stroke="#e4d6bd" stroke-width="30" stroke-linecap="round"/><path d="M661 500C773 486 875 443 967 374" fill="none" stroke="#8b6b4a" stroke-width="5"/>
<path d="M653 542C750 610 844 624 980 600" fill="none" stroke="#e4d6bd" stroke-width="30" stroke-linecap="round"/><path d="M653 542C750 610 844 624 980 600" fill="none" stroke="#8b6b4a" stroke-width="5"/>
<!-- facilities -->
<ellipse cx="585" cy="500" rx="122" ry="91" fill="#fff8e7" stroke="#aa8d5d" stroke-width="4" filter="url(#shadow)"/><text x="585" y="454" text-anchor="middle" font-family="Helvetica Neue,Arial,sans-serif" font-size="16" fill="#5c6680">CENTRAL CLEARING</text>
<rect x="526" y="577" width="112" height="72" rx="10" fill="#f2e9d6" stroke="#725d42" stroke-width="4"/><rect x="684" y="574" width="132" height="76" rx="10" fill="#edf1f7" stroke="#53687f" stroke-width="4"/>
<rect x="923" y="474" width="190" height="136" rx="28" fill="#e3f0dc" stroke="#5f8759" stroke-width="4"/><text x="1018" y="460" text-anchor="middle" font-family="Helvetica Neue,Arial,sans-serif" font-size="16" fill="#5c6680">OPEN LAWN</text>
<rect x="552" y="470" width="74" height="36" rx="6" fill="#fff" stroke="#8b6b4a" stroke-width="3"/><text x="589" y="493" text-anchor="middle" font-family="Helvetica Neue,Arial,sans-serif" font-size="12" fill="#5c6680">BOARD</text>
<g stroke="#645641" stroke-width="6" fill="#8b6b4a"><circle cx="788" cy="235" r="18"/><circle cx="925" cy="212" r="18"/><path d="M788 235Q855 150 925 212" fill="none" stroke-width="11"/></g><text x="861" y="180" text-anchor="middle" font-family="Helvetica Neue,Arial,sans-serif" font-size="15" fill="#5c6680">BRIDGE PLATFORMS</text>
<g font-family="Helvetica Neue,Arial,sans-serif" font-size="14" fill="#5c6680"><text x="255" y="442">WESTERN TREE LOOP</text><text x="628" y="710">SOUTH GATE</text><text x="662" y="690">CHECK-IN PATH</text><text x="915" y="416">RETURN PATH</text></g>
<!-- candidate markers -->
<g font-family="Helvetica Neue,Arial,sans-serif" font-size="22" font-weight="700" text-anchor="middle" fill="#14215c">
<g aria-label="Option A"><circle cx="218" cy="264" r="25" fill="#fff" stroke="#14215c" stroke-width="4"/><text x="218" y="272">A</text></g>
<g aria-label="Option B"><circle cx="750" cy="612" r="25" fill="#fff" stroke="#14215c" stroke-width="4"/><text x="750" y="620">B</text></g>
<g aria-label="Option C"><circle cx="1017" cy="545" r="25" fill="#fff" stroke="#14215c" stroke-width="4"/><text x="1017" y="553">C</text></g>
<g aria-label="Option D"><circle cx="582" cy="612" r="25" fill="#fff" stroke="#14215c" stroke-width="4"/><text x="582" y="620">D</text></g>
<g aria-label="Option E"><circle cx="417" cy="450" r="25" fill="#fff" stroke="#14215c" stroke-width="4"/><text x="417" y="458">E</text></g>
<g aria-label="Option F"><circle cx="856" cy="207" r="25" fill="#fff" stroke="#14215c" stroke-width="4"/><text x="856" y="215">F</text></g>
<g aria-label="Option G"><circle cx="1004" cy="330" r="25" fill="#fff" stroke="#14215c" stroke-width="4"/><text x="1004" y="338">G</text></g>
<g aria-label="Option H"><circle cx="585" cy="518" r="25" fill="#fff" stroke="#14215c" stroke-width="4"/><text x="585" y="526">H</text></g></g>
<text x="1140" y="724" text-anchor="end" font-family="Helvetica Neue,Arial,sans-serif" font-size="13" font-weight="700" fill="#c8202e">WELEARN ORIGINAL PRACTICE</text>
</svg>"""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--public-root", type=Path, required=True)
    args = parser.parse_args()
    report = json.loads(args.report.read_text(encoding="utf-8"))
    copied = 0
    for item in report["sets"]:
        for asset in item.get("assets", []):
            source = Path(asset["sourcePath"])
            target = args.public_root / asset["publicPath"].lstrip("/")
            target.parent.mkdir(parents=True, exist_ok=True)
            if asset["role"] == "listening-part2-visual":
                normalise_svg(source, target)
            else:
                shutil.copy2(source, target)
            copied += 1
    bespoke_root = Path(__file__).parent / "ielts-bespoke-assets"
    for filename in ("set31-part2-map.svg", "set32-part2-map.svg"):
        shutil.copy2(
            bespoke_root / filename,
            args.public_root / "assets/ielts/listening" / filename,
        )
    set40 = args.public_root / "assets/ielts/listening/set40-part2-map.svg"
    set40.write_text(SET40_SVG, encoding="utf-8")
    print(
        f"Materialised {copied} SVG assets; Sets 31, 32 and 40 received "
        "bespoke vector redraws."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
