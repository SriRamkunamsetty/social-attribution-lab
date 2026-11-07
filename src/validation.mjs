const actionTypes = new Set(["brief_export_requested", "recommendation_assigned", "alert_acknowledged", "creative_test_drafted", "creator_reviewed"]);

export function action(input) {
  if (!input || typeof input !== "object") throw invalid("body_required");
  if (!actionTypes.has(input.type)) throw invalid("invalid_action_type");
  if (typeof input.projectSlug !== "string" || !/^[a-z0-9-]{3,80}$/.test(input.projectSlug)) throw invalid("invalid_project_slug");
  if (input.entityId !== undefined && (typeof input.entityId !== "string" || input.entityId.length > 100)) throw invalid("invalid_entity_id");
  if (input.note !== undefined && (typeof input.note !== "string" || input.note.length > 1_000)) throw invalid("invalid_note");
  return { type: input.type, projectSlug: input.projectSlug, entityId: input.entityId ?? null, note: input.note?.trim() ?? null };
}
function invalid(message) { const error = new Error(message); error.status = 422; return error; }
