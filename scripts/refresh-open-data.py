#!/usr/bin/env python3
"""
ManosAbiertas — Live Open Data Refresher
Sources (no credentials):
  - World Bank API (employment, demographics)
  - datos.gob.es CKAN API (Spanish open data)
  - Eurostat JSON API (EU stats)
  - REST Countries API (nationality data)
  - OpenStax API (educational resources)

Run: python3 scripts/refresh-open-data.py
Output: open-data/data/*.json + open-data/topics.json
"""

import urllib.request
import urllib.parse
import json
import ssl
import os
from datetime import datetime, timezone

CA_BUNDLE = '/root/.ccr/ca-bundle.crt'
ctx = ssl.create_default_context()
if os.path.exists(CA_BUNDLE):
    ctx.load_verify_locations(CA_BUNDLE)

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'open-data', 'data')
os.makedirs(DATA_DIR, exist_ok=True)

def fetch(url, timeout=20, headers=None):
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'ManosAbiertas/1.0 open-data-bot', **(headers or {})}
    )
    with urllib.request.urlopen(req, context=ctx, timeout=timeout) as r:
        raw = r.read()
    try:
        return json.loads(raw)
    except Exception:
        return {"_raw": raw.decode('utf-8', errors='replace')[:2000]}

def save(topic, records):
    path = os.path.join(DATA_DIR, f'{topic}.json')
    payload = {
        "tema": topic,
        "portal": "manosabiertas",
        "generado_utc": datetime.now(timezone.utc).isoformat(),
        "registros": records
    }
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    kb = os.path.getsize(path) / 1024
    print(f"  ✓  {topic}.json — {len(records)} registros ({kb:.1f} KB)")
    return True

sources_log = []

# ──────────────────────────────────────────────
# 1. EMPLEO Y PARO — World Bank + datos.gob.es
# ──────────────────────────────────────────────
print("\n📊 empleo-y-paro", flush=True)
records = []

# World Bank: unemployment rate for Spain + top origin countries of immigrants
# SL.UEM.TOTL.ZS = Unemployment total (% of labor force)
wb_countries = ['ESP', 'MAR', 'COL', 'VEN', 'ROM', 'ECU', 'CHN', 'PER', 'ARG', 'BOL']
try:
    wb_url = f"https://api.worldbank.org/v2/country/{';'.join(wb_countries)}/indicator/SL.UEM.TOTL.ZS?format=json&mrv=3&per_page=100"
    wb_data = fetch(wb_url)
    entries = wb_data[1] if isinstance(wb_data, list) and len(wb_data) > 1 else []
    for e in entries:
        if e.get('value') is not None:
            records.append({
                "fuente": "World Bank",
                "indicador": "Desempleo (% población activa)",
                "pais": e['country']['value'],
                "iso3": e['countryiso3code'],
                "anio": e['date'],
                "valor": round(e['value'], 2),
                "unidad": "%"
            })
    sources_log.append({"tema": "empleo-y-paro", "fuente": "World Bank", "ok": bool(records)})
    print(f"  World Bank: {len(records)} puntos de dato")
except Exception as ex:
    print(f"  ⚠ World Bank: {ex}")
    sources_log.append({"tema": "empleo-y-paro", "fuente": "World Bank", "ok": False, "error": str(ex)})

# World Bank: employment in services sector for Spain (relevant for immigrants)
try:
    svc_url = "https://api.worldbank.org/v2/country/ESP/indicator/SL.SRV.EMPL.ZS?format=json&mrv=3"
    svc_data = fetch(svc_url)
    for e in (svc_data[1] if isinstance(svc_data, list) and len(svc_data)>1 else []):
        if e.get('value') is not None:
            records.append({
                "fuente": "World Bank",
                "indicador": "Empleo en servicios (% del empleo total)",
                "pais": "España",
                "iso3": "ESP",
                "anio": e['date'],
                "valor": round(e['value'], 2),
                "unidad": "%"
            })
except Exception as ex:
    print(f"  ⚠ World Bank services: {ex}")

# datos.gob.es: SEPE — demandantes de empleo extranjeros
try:
    sepe_url = "https://datos.gob.es/apidata/catalog/dataset?theme=http://datos.gob.es/kos/sector-publico/sector/empleo&_format=json&_pageSize=5"
    sepe_data = fetch(sepe_url)
    items = sepe_data.get('result', {}).get('items', []) if isinstance(sepe_data, dict) else []
    for item in items[:3]:
        records.append({
            "fuente": "datos.gob.es",
            "tipo": "dataset_empleo",
            "titulo": item.get('title', {}).get('_value', item.get('title', '')) if isinstance(item.get('title'), dict) else item.get('title', ''),
            "url": item.get('@id', ''),
            "fecha_modificado": item.get('modified', '')
        })
    sources_log.append({"tema": "empleo-y-paro", "fuente": "datos.gob.es", "ok": bool(items)})
except Exception as ex:
    print(f"  ⚠ datos.gob.es: {ex}")
    sources_log.append({"tema": "empleo-y-paro", "fuente": "datos.gob.es", "ok": False})

save("empleo-y-paro", records)

# ──────────────────────────────────────────────
# 2. EDUCACIÓN Y FORMACIÓN
# ──────────────────────────────────────────────
print("\n📚 educacion-y-formacion", flush=True)
records = []

# World Bank: school enrollment tertiary
try:
    edu_url = "https://api.worldbank.org/v2/country/ESP;MAR;COL;VEN;ROM/indicator/SE.TER.ENRR?format=json&mrv=3&per_page=50"
    edu_data = fetch(edu_url)
    for e in (edu_data[1] if isinstance(edu_data, list) and len(edu_data)>1 else []):
        if e.get('value') is not None:
            records.append({
                "fuente": "World Bank",
                "indicador": "Matrícula bruta educación terciaria (%)",
                "pais": e['country']['value'],
                "iso3": e['countryiso3code'],
                "anio": e['date'],
                "valor": round(e['value'], 2),
                "unidad": "%"
            })
    sources_log.append({"tema": "educacion-y-formacion", "fuente": "World Bank", "ok": True})
except Exception as ex:
    print(f"  ⚠ World Bank edu: {ex}")
    sources_log.append({"tema": "educacion-y-formacion", "fuente": "World Bank", "ok": False})

# OpenStax open textbooks API
try:
    openstax_url = "https://openstax.org/api/v2/pages/?type=books.Book&fields=title,subjects,publish_date,book_state&book_state=live&limit=30&format=json"
    os_data = fetch(openstax_url)
    items = os_data.get('items', []) if isinstance(os_data, dict) else []
    for b in items[:20]:
        records.append({
            "fuente": "OpenStax",
            "tipo": "libro_abierto",
            "titulo": b.get('title', ''),
            "materias": b.get('subjects', []),
            "publicado": b.get('publish_date', ''),
            "url": f"https://openstax.org/details/books/{b.get('meta',{}).get('slug','')}" if isinstance(b.get('meta'), dict) else ""
        })
    sources_log.append({"tema": "educacion-y-formacion", "fuente": "OpenStax", "ok": bool(items)})
    print(f"  OpenStax: {len(items)} libros abiertos")
except Exception as ex:
    print(f"  ⚠ OpenStax: {ex}")
    sources_log.append({"tema": "educacion-y-formacion", "fuente": "OpenStax", "ok": False})

save("educacion-y-formacion", records)

# ──────────────────────────────────────────────
# 3. VIVIENDA Y SERVICIOS — datos.gob.es + World Bank
# ──────────────────────────────────────────────
print("\n🏠 vivienda-y-servicios", flush=True)
records = []

# World Bank: access to electricity, improved water source
for indicator, label in [
    ("EG.ELC.ACCS.ZS", "Acceso a electricidad (% población)"),
    ("SH.H2O.BASW.ZS", "Acceso a agua potable básica (%)")
]:
    try:
        url = f"https://api.worldbank.org/v2/country/ESP;MAR;COL;VEN;ROM/indicator/{indicator}?format=json&mrv=3&per_page=50"
        d = fetch(url)
        for e in (d[1] if isinstance(d, list) and len(d)>1 else []):
            if e.get('value') is not None:
                records.append({
                    "fuente": "World Bank",
                    "indicador": label,
                    "pais": e['country']['value'],
                    "anio": e['date'],
                    "valor": round(e['value'], 2)
                })
    except Exception as ex:
        print(f"  ⚠ {indicator}: {ex}")

# datos.gob.es: vivienda datasets
try:
    hous_url = "https://datos.gob.es/apidata/catalog/dataset?theme=http://datos.gob.es/kos/sector-publico/sector/vivienda&_format=json&_pageSize=5"
    h_data = fetch(hous_url)
    for item in (h_data.get('result', {}).get('items', []) if isinstance(h_data, dict) else [])[:3]:
        records.append({
            "fuente": "datos.gob.es",
            "tipo": "dataset_vivienda",
            "titulo": item.get('title', {}).get('_value', '') if isinstance(item.get('title'), dict) else item.get('title', ''),
            "url": item.get('@id', '')
        })
    sources_log.append({"tema": "vivienda-y-servicios", "fuente": "datos.gob.es", "ok": True})
except Exception as ex:
    sources_log.append({"tema": "vivienda-y-servicios", "fuente": "datos.gob.es", "ok": False})

save("vivienda-y-servicios", records)

# ──────────────────────────────────────────────
# 4. CONTEXTO DEMOGRÁFICO UE — Eurostat
# ──────────────────────────────────────────────
print("\n🌍 contexto-demografico-ue", flush=True)
records = []

# Eurostat: immigration to EU member states (migr_imm1ctz)
# Using Eurostat JSON API (no auth)
try:
    eurostat_url = (
        "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/migr_imm1ctz"
        "?format=JSON&lang=EN&geo=ES&lastTimePeriod=2"
    )
    eu_data = fetch(eurostat_url, timeout=25)
    values = eu_data.get('value', {})
    # Only keep non-zero non-null values (sparse matrix)
    non_zero = {k: v for k, v in values.items() if v}
    records.append({
        "fuente": "Eurostat",
        "dataset": "migr_imm1ctz",
        "descripcion": "Inmigración a España por ciudadanía — valores no nulos de la matriz",
        "total_filas_no_nulas": len(non_zero),
        "suma_total": sum(non_zero.values()),
        "url": "https://ec.europa.eu/eurostat/databrowser/view/migr_imm1ctz/default/table",
        "nota": "Dataset completo disponible en Eurostat API; se incluye resumen para evitar payload excesivo"
    })
    sources_log.append({"tema": "contexto-demografico-ue", "fuente": "Eurostat", "ok": bool(non_zero)})
    print(f"  Eurostat: {len(non_zero)} valores no nulos (suma: {sum(non_zero.values()):,})")
except Exception as ex:
    print(f"  ⚠ Eurostat: {ex}")
    sources_log.append({"tema": "contexto-demografico-ue", "fuente": "Eurostat", "ok": False, "error": str(ex)})

# CountriesNow: population data for top immigrant origin countries in Spain
TARGET_ISO3 = {'MAR', 'COL', 'VEN', 'ROM', 'ECU', 'CHN', 'PER', 'ARG', 'BOL', 'SEN', 'PAK', 'UKR', 'BGD'}
try:
    cn_url = "https://countriesnow.space/api/v0.1/countries/population"
    cn_data = fetch(cn_url, timeout=20)
    pop_items = cn_data.get('data', []) if isinstance(cn_data, dict) else []
    for c in pop_items:
        if c.get('iso3') in TARGET_ISO3:
            counts = c.get('populationCounts', [])
            latest = sorted(counts, key=lambda x: x.get('year', 0))[-1] if counts else {}
            records.append({
                "fuente": "CountriesNow",
                "tipo": "pais_origen_inmigrante",
                "pais": c.get('country', ''),
                "iso3": c.get('iso3', ''),
                "poblacion_reciente": latest.get('value', 0),
                "anio_poblacion": latest.get('year', ''),
            })
    added = sum(1 for r in records if r.get('fuente') == 'CountriesNow')
    sources_log.append({"tema": "contexto-demografico-ue", "fuente": "CountriesNow", "ok": bool(added)})
    print(f"  CountriesNow: {added} países de origen de inmigrantes")
except Exception as ex:
    print(f"  ⚠ CountriesNow: {ex}")
    sources_log.append({"tema": "contexto-demografico-ue", "fuente": "CountriesNow", "ok": False})

save("contexto-demografico-ue", records)

# ──────────────────────────────────────────────
# 5. SALUD PÚBLICA — World Bank + PubMed
# ──────────────────────────────────────────────
print("\n🏥 salud-publica", flush=True)
records = []

# World Bank: health expenditure, life expectancy, physicians per 1000
for indicator, label in [
    ("SH.XPD.CHEX.GD.ZS", "Gasto en salud (% PIB)"),
    ("SP.DYN.LE00.IN", "Esperanza de vida al nacer"),
    ("SH.MED.PHYS.ZS", "Médicos por 1.000 personas")
]:
    try:
        url = f"https://api.worldbank.org/v2/country/ESP;MAR;COL;VEN/indicator/{indicator}?format=json&mrv=3&per_page=40"
        d = fetch(url)
        for e in (d[1] if isinstance(d, list) and len(d)>1 else []):
            if e.get('value') is not None:
                records.append({
                    "fuente": "World Bank",
                    "indicador": label,
                    "pais": e['country']['value'],
                    "anio": e['date'],
                    "valor": round(e['value'], 3)
                })
    except Exception as ex:
        print(f"  ⚠ {indicator}: {ex}")

# PubMed: recent articles on immigrant health in Spain (use E-utilities, no key needed for low volume)
try:
    search_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=immigrant+health+Spain&retmax=10&retmode=json&sort=pub+date"
    search_data = fetch(search_url)
    ids = search_data.get('esearchresult', {}).get('idlist', [])
    if ids:
        id_str = ','.join(ids[:5])
        summary_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id={id_str}&retmode=json"
        summary = fetch(summary_url)
        result_map = summary.get('result', {})
        for pmid in ids[:5]:
            art = result_map.get(str(pmid), {})
            records.append({
                "fuente": "PubMed",
                "tipo": "articulo_cientifico",
                "pmid": pmid,
                "titulo": art.get('title', ''),
                "fecha": art.get('pubdate', ''),
                "url": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"
            })
    sources_log.append({"tema": "salud-publica", "fuente": "PubMed", "ok": bool(ids)})
    print(f"  PubMed: {len(ids)} artículos sobre salud inmigrante España")
except Exception as ex:
    print(f"  ⚠ PubMed: {ex}")
    sources_log.append({"tema": "salud-publica", "fuente": "PubMed", "ok": False})

sources_log.append({"tema": "salud-publica", "fuente": "World Bank", "ok": bool(records)})
save("salud-publica", records)

# ──────────────────────────────────────────────
# 6. DERECHOS Y ASILO — Wikipedia ES + REST Countries
# ──────────────────────────────────────────────
print("\n⚖️  derechos-y-asilo", flush=True)
records = []

# World Bank: refugee population by country of origin + asylum seeker data
try:
    # SM.POP.TOTL.ZS = International migrant stock (% of population)
    # SM.POP.REFG.OR = Refugee population by country of origin (use ESP as destination proxy)
    ref_url = "https://api.worldbank.org/v2/country/ESP/indicator/SM.POP.TOTL.ZS?format=json&mrv=5&per_page=20"
    ref_data = fetch(ref_url)
    for e in (ref_data[1] if isinstance(ref_data, list) and len(ref_data)>1 else []):
        if e.get('value') is not None:
            records.append({
                "fuente": "World Bank",
                "indicador": "Stock de inmigrantes internacionales (% población)",
                "pais": e['country']['value'],
                "anio": e['date'],
                "valor": round(e['value'], 2)
            })
    n_ref = sum(1 for r in records if r.get('fuente') == 'World Bank')
    print(f"  World Bank refugiados: {n_ref} puntos de dato")
    sources_log.append({"tema": "derechos-y-asilo", "fuente": "World Bank", "ok": bool(n_ref)})
except Exception as ex:
    print(f"  ⚠ World Bank refugiados: {ex}")
    sources_log.append({"tema": "derechos-y-asilo", "fuente": "World Bank", "ok": False})

# Wikipedia ES: search API (simpler endpoint, less likely to 404)
try:
    import time; time.sleep(3)
    wiki_url = "https://es.wikipedia.org/api/rest_v1/page/summary/Extranjer%C3%ADa_en_Espa%C3%B1a"
    w_data = fetch(wiki_url)
    if w_data.get('extract'):
        records.append({
            "fuente": "Wikipedia ES",
            "tipo": "resumen_legislacion",
            "titulo": w_data.get('title', ''),
            "resumen": w_data.get('extract', '')[:800],
            "url": w_data.get('content_urls', {}).get('desktop', {}).get('page', ''),
            "actualizado": w_data.get('timestamp', '')
        })
        sources_log.append({"tema": "derechos-y-asilo", "fuente": "Wikipedia ES", "ok": True})
        print("  Wikipedia: extranjería en España ✓")
    else:
        raise ValueError("No extract returned")
except Exception as ex:
    print(f"  ⚠ Wikipedia: {ex}")
    # Fallback: static reference to official sources
    records.append({
        "fuente": "CURIA/BOE",
        "tipo": "referencia_legislacion",
        "titulo": "Marco legal de extranjería en España",
        "ley_principal": "LO 4/2000 — Ley Orgánica sobre derechos y libertades de los extranjeros en España",
        "url_boe": "https://www.boe.es/buscar/act.php?id=BOE-A-2000-544",
        "url_curia": "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32003L0109",
        "nota": "Actualizado según reforma 2022 (Ley 14/2003)"
    })
    sources_log.append({"tema": "derechos-y-asilo", "fuente": "Wikipedia ES", "ok": False})

save("derechos-y-asilo", records)

# ──────────────────────────────────────────────
# Write topics.json manifest
# ──────────────────────────────────────────────
manifest = {
    "portal": "manosabiertas",
    "repo": "belentani7/ManosAbiertas",
    "dominio": "Integracion, derechos y tramites (ES)",
    "generado_utc": datetime.now(timezone.utc).isoformat(),
    "orden_idiomas": ["pt", "es", "en", "ca"],
    "fuentes": sources_log
}
manifest_path = os.path.join(os.path.dirname(__file__), '..', 'open-data', 'topics.json')
with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

ok_count = sum(1 for s in sources_log if s.get('ok'))
print(f"\n✅  Completado: {ok_count}/{len(sources_log)} fuentes OK")
print(f"    Manifest: open-data/topics.json")
