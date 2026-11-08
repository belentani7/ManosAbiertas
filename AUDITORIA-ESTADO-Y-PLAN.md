# Auditoría, situación y plan de elevación — `ManosAbiertas`

Generado 2026-11-03 por el pase de reglas del ecosistema (catálogo `_meta/reglas-oficiales.md`).
Todo lo afirmado aquí sale de datos reales: base de consolidación, gate oficial y git.

- **Categoría:** educacion · **Ruta:** `C:\Users\USER\belentani-ecosystem\educacion\ManosAbiertas`
- **Remoto:** https://github.com/belentani7/ManosAbiertas.git · **Rama:** main · **HEAD:** a476bf0 (docs(auditoria): gobernanza GH-01..10 verificada (GH-09/GH-10 OK) + estado y pla)
- **Lenguajes:** .md:926,.tsx:150,.ts:93,.mjs:71,.html:58,.json:42 · **Commits (git real):** 397 · **Tamaño worktree:** 32.6 MB
- **Visibilidad GitHub:** public · **Homepage:** https://manos-abiertas-rho.vercel.app · **HTTP:** HTTP_200
- **GitHub Pages:** no activo

## 1. Situación actual

- **Consolidación:** familia `proyecto-manosabiertas` · acción survivor (estable).
- **Git:** 47 ficheros sin commitear · 7 commits sin push · 6 commits del pase de reglas (desde 2026-11-02).
- **Reglas web (gate oficial):** 960 HTML · **21 hallazgos** · 3 títulos duplicados.
- **Gobernanza GitHub (protocolo MS):** 11/11 reglas aplicadas · completo.
- **Secretos (triaje):** sin hallazgos.

## 2. Comandos para arreglar y elevar (ejecutar en este orden)

1. **Cumplir reglas web restantes:**
   ```powershell
   python C:\Users\USER\belentani-ecosystem\_meta\fix_web_rules.py --apply --repo ManosAbiertas
   python C:\Users\USER\belentani-ecosystem\_meta\repair_balance.py --apply --repo ManosAbiertas
   python C:\Users\USER\belentani-ecosystem\_meta\check_web_rules.py ManosAbiertas   # esperar issues=0
   ```
2. **Publicar en GitHub Pages** (repo público; la cuenta free solo publica repos públicos):
   ```powershell
   gh api -X POST repos/belentani7/ManosAbiertas/pages -f source[branch]=main -f source[path]=/
   gh api -X POST repos/belentani7/ManosAbiertas/pages/builds/latest -X POST 2>$null   # o dejar que el workflow publique
   ```
3. **Limpiar 47 ficheros sin commitear** (revisar antes; si son del pase de reglas, commitear):
   ```powershell
   git -C "C:\Users\USER\belentani-ecosystem\educacion\ManosAbiertas" status --short
   git -C "C:\Users\USER\belentani-ecosystem\educacion\ManosAbiertas" add -- <solo los ficheros del pase> ; git -C "C:\Users\USER\belentani-ecosystem\educacion\ManosAbiertas" commit -m "fix(web-rules): ..."
   ```
4. **Subir al remoto** (requiere tu confirmación explícita; hoy ningún repo tiene push):
   ```powershell
   git -C "C:\Users\USER\belentani-ecosystem\educacion\ManosAbiertas" push origin main
   ```

## 3. Qué puede alcanzar este repositorio

- **Repositorio público**: puede publicar gratis en GitHub Pages (`https://belentani7.github.io/ManosAbiertas/`) y mantener Vercel; hoy tiene Pages desactivado
- Ya tiene despliegue Vercel vivo: siguiente nivel es dominio propio (`<producto>.belentani.es`) añadiendo CNAME en el registrador.
- Con 960 páginas HTML y el catálogo de reglas cumplido, es candidato a **superviviente/documentado** del ecosistema: README con arranque real, índice navegable y CI que ejecute `check_web_rules.py`.

---
*Evidencia: `_meta/consolidacion/consolidacion.db` · `_meta/specs/2026-11-01-*` · gate `check_web_rules.py` · git log. Regenerable con `python _meta/gen_auditoria_repos.py`.*
