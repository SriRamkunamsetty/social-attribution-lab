import { getProject } from "./registry.mjs";
import { workspaceFor } from "./features.mjs";

export function projectSummary(slug, actor) {
  const project = getProject(slug);
  return { ...project, governance: { tenantId: actor.tenantId, classification: "internal-demo", retentionDays: 90, freshness: { status: "seeded_demo", lastSuccessfulSync: null }, metricDictionaryVersion: "1.0.0" } };
}

export function dataQuality(project) {
  return { projectSlug: project.slug, score: 92, status: "warning", checks: [
    { name: "Metric completeness", status: "pass", observed: "92%", threshold: "90%" },
    { name: "Freshness", status: "warning", observed: "seeded demo", threshold: "platform sync < 24h" },
    { name: "Duplicate event rate", status: "pass", observed: "0.04%", threshold: "< 0.5%" },
    { name: "Definition version", status: "pass", observed: "1.0.0", threshold: "approved" }
  ] };
}

export function reportPayload(project) {
  return { title: `${project.name}: leadership brief`, status: "queued", sections: ["Executive summary", "Performance against objective", "Evidence and caveats", "Recommended actions", "Metric definitions"], source: { projectSlug: project.slug, metricDictionaryVersion: "1.0.0", dataFreshness: "seeded_demo" } };
}

export function workspace(project) { return { projectSlug: project.slug, workspace: workspaceFor(project.slug), generatedAt: new Date().toISOString() }; }
