import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { projects } from "./registry.mjs";
import { requestId, response, body } from "./http.mjs";
import { verifyActor, requireRole } from "./auth.mjs";
import { action as validateAction } from "./validation.mjs";
import { store } from "./store.mjs";
import { projectSummary, dataQuality, reportPayload, workspace } from "./services.mjs";

const root = process.cwd();
const publicRoot = join(root, "public");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "127.0.0.1";
const repositoryProject = existsSync(join(root, "project.config.json")) ? JSON.parse(readFileSync(join(root, "project.config.json"), "utf8")).projectSlug : undefined;
const requestedProject = process.argv.find((arg) => arg.startsWith("--project="))?.slice("--project=".length) ?? process.env.PROJECT_SLUG ?? repositoryProject;
const activeProjects = requestedProject ? projects.filter((project) => project.slug === requestedProject) : projects;
if (!activeProjects.length) throw new Error(`Unknown project slug: ${requestedProject}`);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8" };
const windows = new Map();

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY", "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
  });
  res.end(body);
}

function rateLimit(ip) {
  const now = Date.now(); const item = windows.get(ip) ?? { start: now, count: 0 };
  if (now - item.start > 60_000) { item.start = now; item.count = 0; }
  item.count += 1; windows.set(ip, item); return item.count <= 120;
}

async function staticFile(pathname, res) {
  const requested = pathname === "/" || pathname.startsWith("/apps/") ? "/index.html" : pathname;
  const safe = normalize(requested).replace(/^([/\\])+/, "");
  const location = join(publicRoot, safe);
  if (!location.startsWith(publicRoot)) return send(res, 403, JSON.stringify({ error: "forbidden" }));
  try { const contents = await readFile(location); send(res, 200, contents, types[extname(location)] ?? "application/octet-stream"); }
  catch { send(res, 404, JSON.stringify({ error: "not_found" })); }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? host}`);
  const ip = req.socket.remoteAddress ?? "unknown";
  const id = requestId();
  try {
    if (!rateLimit(ip)) return response(res, 429, { error: "rate_limited", requestId: id, retryAfterSeconds: 60 }, id, { "Retry-After": "60" });
    if (url.pathname === "/health") return response(res, 200, { status: "ok", service: "social-analytics-portfolio", timestamp: new Date().toISOString() }, id);
    if (url.pathname === "/ready") return response(res, 200, { status: "ready", dependencies: { database: "demo-store", queue: "demo-store" } }, id);
    if (url.pathname.startsWith("/api/")) {
      const actor = verifyActor(req.headers.authorization);
      const apiPath = url.pathname.replace(/^\/api\/v1/, "/api");
      if (req.method === "GET" && (apiPath === "/api/projects" || url.pathname === "/api/projects")) return response(res, 200, { data: activeProjects.map(({ table, chart, ...safe }) => safe), meta: { count: activeProjects.length, requestId: id } }, id);
      if (req.method === "GET" && (apiPath.startsWith("/api/projects/") || url.pathname.startsWith("/api/projects/")) && !apiPath.endsWith("/quality") && !apiPath.endsWith("/audit-events") && !apiPath.endsWith("/workspace")) {
        const slug = decodeURIComponent((apiPath.startsWith("/api/projects/") ? apiPath : url.pathname).split("/").at(-1));
        const found = activeProjects.find((x) => x.slug === slug);
        return found ? response(res, 200, { data: projectSummary(slug, actor), meta: { requestId: id } }, id) : response(res, 404, { error: "project_not_found", requestId: id }, id);
      }
      if (req.method === "GET" && apiPath.startsWith("/api/projects/") && apiPath.endsWith("/quality")) {
        const slug = apiPath.split("/")[3]; const found = activeProjects.find((x) => x.slug === slug);
        return found ? response(res, 200, { data: dataQuality(found), meta: { requestId: id } }, id) : response(res, 404, { error: "project_not_found", requestId: id }, id);
      }
      if (req.method === "GET" && apiPath.startsWith("/api/projects/") && apiPath.endsWith("/workspace")) {
        const slug = apiPath.split("/")[3]; const found = activeProjects.find((x) => x.slug === slug);
        return found ? response(res, 200, { data: workspace(found), meta: { requestId: id } }, id) : response(res, 404, { error: "project_not_found", requestId: id }, id);
      }
      if (req.method === "POST" && apiPath === "/api/actions") {
        requireRole(actor, "analyst"); const input = validateAction(await body(req));
        if (!activeProjects.some((project) => project.slug === input.projectSlug)) return response(res, 404, { error: "project_not_found", requestId: id }, id);
        const event = await store.appendAudit({ tenantId: actor.tenantId, actorId: actor.id, projectSlug: input.projectSlug, eventType: input.type, entityId: input.entityId, payload: { note: input.note }, requestId: id });
        return response(res, 201, { data: event, meta: { requestId: id } }, id);
      }
      if (req.method === "GET" && apiPath.startsWith("/api/projects/") && apiPath.endsWith("/audit-events")) {
        const slug = apiPath.split("/")[3]; return response(res, 200, { data: await store.listAudit({ projectSlug: slug, tenantId: actor.tenantId }), meta: { requestId: id } }, id);
      }
      if (req.method === "POST" && apiPath === "/api/reports") {
        requireRole(actor, "editor"); const input = await body(req); const found = activeProjects.find((project) => project.slug === input.projectSlug);
        if (!found) return response(res, 404, { error: "project_not_found", requestId: id }, id);
        const job = await store.enqueueReport({ tenantId: actor.tenantId, actorId: actor.id, projectSlug: found.slug, payload: reportPayload(found) });
        return response(res, 202, { data: job, meta: { requestId: id } }, id);
      }
      return response(res, 405, { error: "method_or_route_not_allowed", requestId: id }, id, { Allow: "GET, POST" });
    }
    if (req.method !== "GET") return response(res, 405, { error: "method_not_allowed", requestId: id }, id, { Allow: "GET" });
    return staticFile(url.pathname, res);
  } catch (error) {
    const status = error.status ?? 500;
    return response(res, status, { error: status === 500 ? "internal_error" : error.message, requestId: id }, id);
  }
});

server.listen(port, host, () => console.log(`Social analytics portfolio ready at http://${host}:${port}`));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
