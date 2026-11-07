import { createHmac, timingSafeEqual } from "node:crypto";

const roles = new Set(["viewer", "analyst", "editor", "admin"]);
const rank = { viewer: 0, analyst: 1, editor: 2, admin: 3 };

function decode(value) { return JSON.parse(Buffer.from(value, "base64url").toString("utf8")); }
function sign(value, secret) { return createHmac("sha256", secret).update(value).digest("base64url"); }

export function verifyActor(header) {
  if (process.env.AUTH_REQUIRED !== "true") return { id: "demo-analyst", role: "admin", tenantId: "demo-entertainment", displayName: "Demo analyst" };
  const token = header?.replace(/^Bearer\s+/i, "");
  if (!token || !process.env.AUTH_SECRET) { const error = new Error("unauthorized"); error.status = 401; throw error; }
  const [encoded, signature] = token.split("."); const expected = sign(encoded, process.env.AUTH_SECRET);
  const supplied = Buffer.from(signature ?? ""); const expectedBuffer = Buffer.from(expected);
  if (!encoded || !signature || supplied.length !== expectedBuffer.length || !timingSafeEqual(supplied, expectedBuffer)) { const error = new Error("unauthorized"); error.status = 401; throw error; }
  const actor = decode(encoded);
  if (!actor.id || !roles.has(actor.role) || !actor.tenantId || (actor.exp && actor.exp < Math.floor(Date.now() / 1000))) { const error = new Error("unauthorized"); error.status = 401; throw error; }
  return actor;
}

export function requireRole(actor, minimum) {
  if (rank[actor.role] < rank[minimum]) { const error = new Error("forbidden"); error.status = 403; throw error; }
}
