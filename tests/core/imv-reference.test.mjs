import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import {
  compareImvReference2026, IMV_2026_HOUSEHOLDS,
  IMV_OFFICIAL_INFORMATION_URL,
} from "../../src/lib/imv-reference.ts";
import { PROJECT_ROOT } from "../../scripts/test-core.mjs";

test("IMV 2026 references match official household table, including monoparental distinction", () => {
  assert.equal(IMV_2026_HOUSEHOLDS.length, 18);
  assert.equal(compareImvReference2026("one-adult", 0).monthlyReference, 733.6);
  assert.equal(compareImvReference2026("two-adults", 0).monthlyReference, 953.68);
  assert.equal(compareImvReference2026("two-adults-two-children", 0).monthlyReference, 1393.84);
  assert.equal(compareImvReference2026("one-adult-single-parent-one-child", 0).monthlyReference, 1115.07);
  assert.equal(compareImvReference2026("one-adult-single-parent-two-children", 0).monthlyReference, 1335.15);
  // Values cross-checked against the 2026 official Seguridad Social table.
  assert.equal(compareImvReference2026("one-adult-three-children", 0).monthlyReference, 1393.84);
  assert.equal(compareImvReference2026("one-adult-four-plus-children", 0).monthlyReference, 1613.92);
  assert.equal(compareImvReference2026("two-adults-three-plus-children", 0).monthlyReference, 1613.92);
  assert.equal(compareImvReference2026("three-adults", 0).monthlyReference, 1173.76);
  assert.equal(compareImvReference2026("three-adults-one-child", 0).monthlyReference, 1393.84);
  assert.equal(compareImvReference2026("three-adults-two-plus-children", 0).monthlyReference, 1613.92);
  assert.equal(compareImvReference2026("four-adults", 0).monthlyReference, 1393.84);
  assert.equal(compareImvReference2026("four-adults-one-child", 0).monthlyReference, 1613.92);
  assert.equal(compareImvReference2026("one-adult-single-parent-three-children", 0).monthlyReference, 1555.23);
  assert.equal(compareImvReference2026("one-adult-single-parent-four-plus-children", 0).monthlyReference, 1775.31);
  assert.equal(new Set(IMV_2026_HOUSEHOLDS.map(group => group.id)).size, IMV_2026_HOUSEHOLDS.length);
  assert.ok(IMV_OFFICIAL_INFORMATION_URL.startsWith("https://www.seg-social.es/"));
});

test("IMV checker never treats invalid inputs as zero or decides entitlement", () => {
  for (const value of [-1, Infinity, NaN, 100_000_001]) {
    assert.throws(() => compareImvReference2026("one-adult", value), /invalid_annual_income/);
  }
  assert.throws(() => compareImvReference2026("unknown", 1000), /unknown_household/);
  assert.equal(compareImvReference2026("one-adult", 12_000).position, "above");
  assert.equal(compareImvReference2026("one-adult", 5_000).position, "below");
  assert.equal(compareImvReference2026("one-adult", 8_803.2).position, "equal");
  const component = readFileSync(new URL("../../src/components/manos-abiertas/IMVCalculator.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(component, /Cumples los requisitos|Fórmula oficial IMV 2024|IPREM_2024/);
  assert.match(component, /no verifica requisitos, no calcula una prestación/);
  assert.match(component, /imv-annual-income/);
});
