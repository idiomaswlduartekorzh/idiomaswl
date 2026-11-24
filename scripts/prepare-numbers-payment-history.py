#!/usr/bin/env python3
"""Prepare the annual cash register in General.numbers for owner-only import."""

import argparse
import json
import os
import re
from collections import Counter
from datetime import date, datetime
from decimal import Decimal, InvalidOperation
from pathlib import Path

from numbers_parser import Document

MONTHS = (
    {"january", "enero"}, {"february", "febrero"}, {"march", "marzo"},
    {"april", "abril"}, {"may", "mayo"}, {"june", "junio"}, {"july", "julio"},
    {"august", "agosto"}, {"september", "septiembre"}, {"october", "octubre"},
    {"november", "noviembre"}, {"december", "diciembre"},
)


def cell_text(value):
    if isinstance(value, str):
        return " ".join(value.split())
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return format(value, "g")
    return ""


def sheet_columns(year, header, start, end):
    if year == 2017:
        fields = tuple(cell_text(value).lower() for value in header[start:end])

        def locate(*labels):
            return next(start + i for i, field in enumerate(fields) if field in labels)

        quantity = next((start + i for i, field in enumerate(fields) if field == "hours"), None)
        return (
            locate("name", "nombre"), locate("amount", "monto"),
            locate("concept", "concepto", "language"), locate("date", "fecha"), quantity,
        )
    if year == 2016:
        return start + 1, start + 2, start + 3, start + 4, None
    if year == 2018:
        return start + 2, start + 3, start + 4, start + 5, None
    return start + 2, start + 3, start + 4, start + 6, start + 5


def cell_address(column, row):
    letters = ""
    while column:
        column, digit = divmod(column - 1, 26)
        letters = chr(65 + digit) + letters
    return f"{letters}{row}"


def payment_date(value):
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    if not isinstance(value, str):
        return None
    token = value.strip()
    try:
        return date.fromisoformat(token)
    except ValueError:
        pass
    match = re.fullmatch(r"(\d{1,2})\s*[-/.]\s*(\d{1,2})\s*[-/.]\s*(\d{2}|20\d{2})", token)
    if not match:
        return None
    day, month, year = map(int, match.groups())
    try:
        return date(year + 2000 if year < 100 else year, month, day)
    except ValueError:
        return None


def amount_cents(value):
    if type(value) not in (int, float):
        return None
    try:
        cents = Decimal(str(value)) * 100
        if cents == cents.to_integral_value() and 1 <= cents <= 100_000_000_000:
            return int(cents)
    except InvalidOperation:
        pass
    return None


def read_history(document):
    payments, review = [], []
    seen = set()
    for sheet in document.sheets:
        if sheet.name not in {str(year) for year in range(2016, 2025)}:
            continue
        year = int(sheet.name)
        if len(sheet.tables) != 1:
            raise ValueError(f"Estructura inesperada en la hoja {year}.")
        rows = list(sheet.tables[0].rows(values_only=True))
        starts = [i for i, value in enumerate(rows[0]) if cell_text(value).lower() in set.union(*MONTHS)]
        if len(starts) != 12 or any(cell_text(rows[0][start]).lower() not in month for start, month in zip(starts, MONTHS)):
            raise ValueError(f"Los doce bloques mensuales no coinciden en la hoja {year}.")

        for month, (start, end) in enumerate(zip(starts, starts[1:] + [len(rows[0])]), 1):
            name_col, amount_col, concept_col, date_col, quantity_col = sheet_columns(year, rows[1], start, end)
            period = f"{year}-{month:02d}"
            for index, row in enumerate(rows[2:], 3):
                ordinal = row[start]
                if type(ordinal) not in (int, float) or not 1 <= ordinal <= 46:
                    continue
                name = cell_text(row[name_col])
                raw_amount = row[amount_col]
                if not isinstance(row[name_col], str) or name in {"", "-", "--", "—"}:
                    if raw_amount in (None, "", 0):
                        continue
                elif raw_amount in (None, "", 0) and row[date_col] is None:
                    continue

                reference = f"NUMBERS-{period}-{cell_address(amount_col + 1, index)}"
                paid_on = payment_date(row[date_col])
                cents = amount_cents(raw_amount)
                concept = cell_text(row[concept_col]) or "Pago histórico"
                quantity = cell_text(row[quantity_col]) if quantity_col is not None else ""
                description = f"{concept} · Cantidad original {quantity}" if quantity else concept
                fingerprint = (name.casefold(), cents, paid_on, description.casefold())
                reason = None
                if ordinal != index - 2:
                    reason = "numeracion_irregular_o_segundo_bloque"
                elif not isinstance(row[name_col], str) or name in {"", "-", "--", "—"} or len(name) > 150:
                    reason = "nombre_por_verificar"
                elif not cents or len(description) > 300:
                    reason = "valor_o_concepto_por_verificar"
                elif not paid_on:
                    reason = "fecha_ausente_o_no_interpretable"
                elif (paid_on.year, paid_on.month) != (year, month):
                    reason = "fecha_fuera_del_mes"
                elif fingerprint in seen:
                    reason = "posible_duplicado"

                if reason:
                    review.append({"id": reference, "motivo": reason})
                    continue
                seen.add(fingerprint)
                payments.append({
                    "id": reference, "paid_on": paid_on.isoformat(), "amount_in_cents": cents,
                    "customer_name": name, "description": description,
                })
    return payments, review


def write_private(path, content):
    with os.fdopen(os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), "w", encoding="utf-8") as target:
        json.dump(content, target, ensure_ascii=False, indent=2)
        target.write("\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("numbers", type=Path)
    parser.add_argument("output_directory", type=Path)
    args = parser.parse_args()
    args.output_directory.mkdir(mode=0o700, parents=True, exist_ok=True)
    if args.output_directory.stat().st_mode & 0o077:
        parser.error("El directorio de salida debe tener permisos privados (700).")
    payments, review = read_history(Document(args.numbers))
    write_private(args.output_directory / "historial-importable.json", payments)
    write_private(args.output_directory / "filas-por-revisar.json", review)
    print("Candidatos por año:", dict(sorted(Counter(p["paid_on"][:4] for p in payments).items())))
    print("Filas por revisar:", dict(Counter(p["motivo"] for p in review)))


if __name__ == "__main__":
    main()
