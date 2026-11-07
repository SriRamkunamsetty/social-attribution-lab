import { randomUUID } from "node:crypto";

// Demo adapter. Replace with the Postgres implementation described in db/migrations/001_initial.sql.
// The interface remains the same so application services never depend on a database vendor.
const audit = [];
const jobs = [];

export const store = {
  async appendAudit(event) {
    const row = { id: randomUUID(), createdAt: new Date().toISOString(), ...event };
    audit.unshift(row); return row;
  },
  async listAudit({ projectSlug, tenantId, limit = 50 }) {
    return audit.filter((item) => item.projectSlug === projectSlug && item.tenantId === tenantId).slice(0, Math.min(limit, 100));
  },
  async enqueueReport(job) {
    const row = { id: randomUUID(), status: "queued", createdAt: new Date().toISOString(), ...job };
    jobs.unshift(row); return row;
  },
  async report(id, tenantId) { return jobs.find((job) => job.id === id && job.tenantId === tenantId) ?? null; }
};
