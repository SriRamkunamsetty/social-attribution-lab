import { randomUUID } from "node:crypto";

export function requestId() { return randomUUID(); }

export function response(res, status, payload, requestId, extra = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store",
    "X-Request-Id": requestId, "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()", ...extra
  });
  res.end(JSON.stringify(payload));
}

export async function body(req, limit = 100_000) {
  const chunks = []; let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) { const error = new Error("payload_too_large"); error.status = 413; throw error; }
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { const error = new Error("invalid_json"); error.status = 400; throw error; }
}
