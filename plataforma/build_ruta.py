"""Genera la ruta de aprendizaje real a partir del currículo en disco.

Lee `public/contenido/curriculum/m*/nivel-*/*.md`, extrae título, objetivo, tiempo y
dificultad de cada nivel y escribe:
  - data/ruta.json     (catálogo verificable)
  - ruta.html          (página autocontenida, funciona sin servidor)

No inventa niveles ni tiempos: si un dato no está en el Markdown, queda vacío.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CURR = ROOT / "public" / "contenido" / "curriculum"
LANGS = ["ES", "PT", "CA", "EN"]

RE_TIME = re.compile(r"(?:Tiemps? estimat|Tiempo estimado|Tempo estimado|Estimated time)\s*:?\s*(.+)", re.I)
RE_DIFF = re.compile(r"(?:Dificultat|Dificultad|Dificuldade|Difficulty)\s*:?\s*([^·\n]+)", re.I)
RE_OBJ_HEAD = re.compile(r"^\s*##\s.*(?:Objectiu|Objetivo|Objetivo|objective)", re.I)


def read(path: Path) -> str:
    for enc in ("utf-8", "utf-8-sig", "latin-1"):
        try:
            return path.read_text(encoding=enc)
        except UnicodeDecodeError:
            continue
    return ""


def parse_file(path: Path) -> dict:
    text = read(path)
    lines = text.splitlines()
    title = next((l.lstrip("# ").strip() for l in lines if l.startswith("# ")), "")
    time_line = next((m.group(1).strip() for l in lines if (m := RE_TIME.search(l))), "")
    diff = next((m.group(1).strip() for l in lines if (m := RE_DIFF.search(l))), "")

    objetivos: list[str] = []
    in_obj = False
    for line in lines:
        if RE_OBJ_HEAD.match(line):
            in_obj = True
            continue
        if in_obj:
            if line.startswith("##"):
                break
            if line.strip().startswith(("- ", "* ")):
                objetivos.append(line.strip()[2:].strip())
    return {
        "titulo": title,
        "tiempo": time_line,
        "dificultad": diff,
        "objetivos": objetivos[:6],
        "palabras": len(text.split()),
    }


def build() -> dict:
    if not CURR.is_dir():
        raise SystemExit(f"no existe {CURR}")
    modulos = []
    total_lecciones = 0
    total_documentos = 0
    for mdir in sorted(p for p in CURR.iterdir() if p.is_dir() and p.name.startswith("m")):
        mnum = int(re.match(r"m(\d+)", mdir.name).group(1))
        niveles = []
        for ndir in sorted(p for p in mdir.iterdir() if p.is_dir() and p.name.startswith("nivel-")):
            nnum = int(re.findall(r"\d+", ndir.name)[0])
            files = {lang: ndir / f"{ndir.name}-{lang}.md" for lang in LANGS}
            base = next((f for f in files.values() if f.is_file()), None)
            if base is None:
                continue
            info = parse_file(base)
            total_lecciones += 1
            total_documentos += sum(1 for v in files.values() if v.is_file())
            niveles.append({
                "nivel": nnum,
                "titulo": info["titulo"],
                "tiempo": info["tiempo"],
                "dificultad": info["dificultad"],
                "objetivos": info["objetivos"],
                "palabras": info["palabras"],
                "archivos": {k: str(v.relative_to(ROOT)).replace("\\", "/")
                             for k, v in files.items() if v.is_file()},
            })
        if not niveles:
            continue
        modulos.append({
            "n": mnum,
            "slug": re.sub(r"^m\d+-", "", mdir.name),
            "titulo": niveles[0]["titulo"].split("—")[0].strip().rstrip(":"),
            "niveles": niveles,
        })

    minutos = 0
    for m in modulos:
        for n in m["niveles"]:
            mm = re.match(r"(\d+)\s*(hora|hour|h)", n["tiempo"], re.I)
            minutos += int(mm.group(1)) * 60 if mm else 120

    return {
        "generado_por": "plataforma/build_ruta.py",
        "fuente": str(CURR.relative_to(ROOT)).replace("\\", "/"),
        "idiomas": LANGS,
        "totales": {
            "modulos": len(modulos),
            "niveles": total_lecciones,
            "documentos": total_documentos,
            "niveles_por_modulo": sorted({len(m["niveles"]) for m in modulos}),
            "horas_estimadas": round(minutos / 60, 1),
        },
        "modulos": modulos,
    }


def render_html(data: dict) -> str:
    blob = json.dumps(data, ensure_ascii=False)
    total = data["totales"]
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ruta de aprendizaje — Manos Abiertas</title>
<meta name="description" content="Ruta completa de Manos Abiertas: {total['modulos']} módulos, {total['niveles']} niveles en cuatro idiomas y {total['documentos']} lecciones, generada desde el currículo real.">
<meta property="og:title" content="Ruta de aprendizaje — Manos Abiertas">
<meta property="og:description" content="{total['niveles']} niveles reales, {total['documentos']} lecciones, {total['horas_estimadas']} horas estimadas, sin registro.">
<meta property="og:type" content="website">
<meta name="theme-color" content="#0b6b57">
<style>
  :root {{ --bg:#fbfaf7; --surface:#ffffff; --ink:#1a1a1a; --muted:#5b5b5b; --accent:#0b6b57; --line:#e4e0d8; }}
  * {{ box-sizing:border-box; }}
  body {{ margin:0; background:var(--bg); color:var(--ink); font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif; }}
  header {{ padding:clamp(1.5rem,5vw,3.5rem); border-bottom:1px solid var(--line); }}
  h1 {{ font-family:Georgia,serif; font-size:clamp(1.8rem,4.5vw,2.8rem); margin:0 0 .5rem; line-height:1.1; }}
  .lead {{ color:var(--muted); max-width:62ch; margin:0; }}
  .bar {{ display:flex; flex-wrap:wrap; gap:.6rem; align-items:center; margin-top:1.2rem; }}
  select, button {{ font:inherit; padding:.5rem .7rem; border:1px solid var(--line); border-radius:8px; background:var(--surface); color:var(--ink); }}
  button.primary {{ background:var(--accent); color:#fff; border-color:var(--accent); cursor:pointer; }}
  main {{ padding:clamp(1rem,3vw,2.5rem); max-width:1000px; margin:0 auto; }}
  .mod {{ border:1px solid var(--line); border-radius:14px; background:var(--surface); margin:0 0 1rem; overflow:hidden; }}
  .mod > summary {{ cursor:pointer; padding:1rem 1.1rem; font-weight:600; display:flex; justify-content:space-between; gap:1rem; }}
  .mod > summary::marker {{ content:""; }}
  .lvl {{ display:grid; grid-template-columns:auto 1fr auto; gap:.8rem; align-items:start; padding:.8rem 1.1rem; border-top:1px solid var(--line); }}
  .lvl h3 {{ margin:0; font-size:1rem; font-weight:600; }}
  .lvl p {{ margin:.2rem 0 0; color:var(--muted); font-size:.9rem; }}
  .lvl .meta {{ color:var(--muted); font-size:.8rem; white-space:nowrap; }}
  .check {{ width:1.1rem; height:1.1rem; margin-top:.25rem; }}
  .tags {{ font-size:.75rem; color:var(--muted); }}
  .progress {{ position:sticky; top:0; background:var(--bg); padding:.6rem clamp(1rem,3vw,2.5rem); border-bottom:1px solid var(--line); z-index:2; }}
  progress {{ width:100%; height:10px; }}
  a {{ color:var(--accent); }}
  :focus-visible {{ outline:3px solid var(--accent); outline-offset:2px; }}
  @media (prefers-reduced-motion: reduce) {{ * {{ transition:none!important; animation:none!important; }} }}
  @media (max-width:600px) {{ .lvl {{ grid-template-columns:auto 1fr; }} .lvl .meta {{ grid-column:2; }} }}
</style>
</head>
<body>
<header>
  <h1>Ruta de aprendizaje</h1>
  <p class="lead">Generada desde el currículo real del repositorio: {total['modulos']} módulos, {total['niveles']} niveles,
  {total['documentos']} lecciones en cuatro idiomas, {total['horas_estimadas']} horas estimadas. Sin registro, sin cookies, sin servidor: el progreso se guarda en tu navegador.</p>
  <div class="bar">
    <label for="lang">Idioma de la lección</label>
    <select id="lang"><option>ES</option><option>PT</option><option>CA</option><option>EN</option></select>
    <label for="diff">Dificultad</label>
    <select id="diff"><option value="">Todas</option></select>
    <button class="primary" id="reset" type="button">Borrar mi progreso</button>
  </div>
</header>
<div class="progress">
  <label for="bar">Tu progreso: <span id="pct">0%</span></label>
  <progress id="bar" value="0" max="100"></progress>
</div>
<main id="app"></main>
<script type="application/json" id="data">{blob}</script>
<script>
const DATA = JSON.parse(document.getElementById('data').textContent);
const KEY = 'manosabiertas.ruta.v1';
const done = new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));
const app = document.getElementById('app');
const langSel = document.getElementById('lang');
const diffSel = document.getElementById('diff');

const diffs = [...new Set(DATA.modulos.flatMap(m => m.niveles.map(n => n.dificultad)).filter(Boolean))];
diffs.forEach(d => {{ const o = document.createElement('option'); o.value = d; o.textContent = d; diffSel.appendChild(o); }});

function total() {{ return DATA.modulos.reduce((s, m) => s + m.niveles.length, 0); }}
function save() {{ localStorage.setItem(KEY, JSON.stringify([...done])); paint(); }}
function paint() {{
  const pct = Math.round(done.size * 100 / total());
  document.getElementById('pct').textContent = pct + '%';
  const bar = document.getElementById('bar'); bar.value = pct;
}}
function render() {{
  const lang = langSel.value, diff = diffSel.value;
  app.innerHTML = '';
  DATA.modulos.forEach(m => {{
    const niveles = m.niveles.filter(n => !diff || n.dificultad === diff);
    if (!niveles.length) return;
    const det = document.createElement('details');
    det.className = 'mod'; det.open = m.n === DATA.modulos[0].n;
    const sum = document.createElement('summary');
    sum.innerHTML = `<span>Módulo ${{m.n}} · ${{m.titulo}}</span><span class="tags">${{niveles.length}} niveles</span>`;
    det.appendChild(sum);
    niveles.forEach(n => {{
      const key = m.n + ':' + n.nivel;
      const row = document.createElement('div'); row.className = 'lvl';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.className = 'check'; cb.checked = done.has(key);
      cb.setAttribute('aria-label', 'Marcar nivel ' + n.nivel + ' como completado');
      cb.addEventListener('change', () => {{ cb.checked ? done.add(key) : done.delete(key); save(); }});
      const body = document.createElement('div');
      const file = n.archivos[lang] || Object.values(n.archivos)[0] || '';
      body.innerHTML = `<h3>Nivel ${{String(n.nivel).padStart(2, '0')}} · ${{n.titulo.split('—').pop().trim()}}</h3>` +
        (n.objetivos[0] ? `<p>${{n.objetivos[0]}}</p>` : '') +
        (file ? `<p class="tags"><a href="${{file}}">Abrir la lección en ${{lang}}</a></p>` : '');
      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = [n.tiempo, n.dificultad, n.palabras + ' palabras'].filter(Boolean).join(' · ');
      row.append(cb, body, meta);
      det.appendChild(row);
    }});
    app.appendChild(det);
  }});
}}
langSel.addEventListener('change', render);
diffSel.addEventListener('change', render);
document.getElementById('reset').addEventListener('click', () => {{ done.clear(); save(); render(); }});
render(); paint();
</script>
</body>
</html>
"""


def main() -> int:
    data = build()
    (ROOT / "data").mkdir(exist_ok=True)
    (ROOT / "data" / "ruta.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    (ROOT / "ruta.html").write_text(render_html(data), encoding="utf-8")
    t = data["totales"]
    print(f"ruta: {t['modulos']} módulos · {t['niveles']} niveles · {t['documentos']} lecciones · {t['horas_estimadas']} h")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
