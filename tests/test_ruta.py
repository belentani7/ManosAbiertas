"""Pruebas de la ruta de aprendizaje: que el catálogo diga la verdad del currículo."""
from __future__ import annotations

import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RUTA = ROOT / "data" / "ruta.json"
CURR = ROOT / "public" / "contenido" / "curriculum"


class TestRuta(unittest.TestCase):
    def setUp(self):
        self.assertTrue(RUTA.is_file(), "falta data/ruta.json")
        self.data = json.loads(RUTA.read_text(encoding="utf-8"))

    def test_ocho_modulos(self):
        self.assertEqual(self.data["totales"]["modulos"], 8)

    def test_veintiseis_niveles_por_modulo(self):
        for m in self.data["modulos"]:
            self.assertEqual(len(m["niveles"]), 26, f"módulo {m['n']}")

    def test_total_documentos_coincide_con_disco(self):
        en_disco = len(list(CURR.rglob("nivel-*.md")))
        self.assertEqual(self.data["totales"]["documentos"], en_disco,
                         f"catálogo={self.data['totales']['documentos']} disco={en_disco}")

    def test_todos_los_archivos_existen(self):
        faltan = []
        for m in self.data["modulos"]:
            for n in m["niveles"]:
                for lang, rel in n["archivos"].items():
                    if not (ROOT / rel).is_file():
                        faltan.append(f"{rel} ({lang})")
        self.assertEqual(faltan, [])

    def test_cuatro_idiomas_por_nivel(self):
        for m in self.data["modulos"]:
            for n in m["niveles"]:
                self.assertEqual(sorted(n["archivos"]), ["CA", "EN", "ES", "PT"], f"m{m['n']} n{n['nivel']}")

    def test_hay_objetivos_reales(self):
        con_objetivo = sum(1 for m in self.data["modulos"] for n in m["niveles"] if n["objetivos"])
        self.assertGreater(con_objetivo, 150, f"solo {con_objetivo} niveles con objetivo extraído")

    def test_horas_razonables(self):
        self.assertGreater(self.data["totales"]["horas_estimadas"], 100)


if __name__ == "__main__":
    unittest.main()
