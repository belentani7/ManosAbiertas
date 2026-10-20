import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ARRAIGO_GUIDES, compareArraigoTwoYearMilestone,
} from "../../src/lib/immigration-reference.ts";

test("two verified 2026 arraigo routes use two calendar years, never three", () => {
  assert.deepEqual(ARRAIGO_GUIDES.map(x => x.id), ["social", "sociolaboral"]);
  assert.ok(ARRAIGO_GUIDES.every(x => x.years === 2 && x.source.startsWith("https://www.inclusion.gob.es/")));
  const result = compareArraigoTwoYearMilestone("social", "2024-04-15", "2026-04-15");
  assert.equal(result.referenceDate, "2026-04-15");
  assert.equal(result.remainingDays, 0);
  assert.equal(result.referenceDateReached, true);
  assert.equal(compareArraigoTwoYearMilestone("sociolaboral", "2025-10-20", "2026-10-20").remainingDays, 365);
});

test("rejects impossible dates and future arrivals; UI never declares eligibility", () => {
  assert.throws(() => compareArraigoTwoYearMilestone("social", "2026-02-30", "2026-10-20"), /invalid_date/);
  assert.throws(() => compareArraigoTwoYearMilestone("social", "2026-10-21", "2026-10-20"), /future_start/);
  const ui = readFileSync(new URL("../../src/components/manos-abiertas/PlazosCalculator.tsx",import.meta.url),"utf8");
  assert.doesNotMatch(ui,/1095|¡Ya cumples el requisito de tiempo!|Puedes iniciar el trámite/);
  assert.match(ui,/no verifica la permanencia legalmente computable ni confirma el derecho a solicitar una autorización/i);
  assert.match(ui,/Nacionalidad española por residencia/);
});
