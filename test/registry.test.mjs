import test from "node:test";
import assert from "node:assert/strict";
import { projects, getProject } from "../src/registry.mjs";

test("ten portfolio products have unique routes and complete display data", () => {
  assert.equal(projects.length, 10);
  assert.equal(new Set(projects.map((item) => item.slug)).size, 10);
  for (const item of projects) {
    assert.equal(item.kpis.length, 4);
    assert.equal(item.chart.length, 12);
    assert.equal(item.table.length, 4);
    assert.ok(item.insight.length > 80);
  }
});

test("unknown project safely defaults to flagship", () => assert.equal(getProject("unknown").slug, "campaign-command-center"));
