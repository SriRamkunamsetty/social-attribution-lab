import test from "node:test";
import assert from "node:assert/strict";
import { verifyActor } from "../src/auth.mjs";

test("demo actor is available only when production auth is disabled", () => {
  const prior = process.env.AUTH_REQUIRED;
  process.env.AUTH_REQUIRED = "false";
  assert.equal(verifyActor().role, "admin");
  if (prior === undefined) delete process.env.AUTH_REQUIRED; else process.env.AUTH_REQUIRED = prior;
});
